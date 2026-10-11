// Render delle viste con Chromium headless (WebGL via SwiftShader).
// Uso: PLAYWRIGHT=/percorso/playwright-core/index.mjs CHROMIUM=/percorso/chrome node tools/render.mjs out-dir vista:atmosfera:larghezza:altezza ...
const { chromium } = await import(process.env.PLAYWRIGHT || 'playwright-core');
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const [outDir, ...jobs] = process.argv.slice(2);
mkdirSync(outDir, { recursive: true });
const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM,
  args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist']
});
const page = await browser.newPage({ viewport: { width: 2000, height: 1300 } });
const errors = [];
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
page.on('pageerror', (e) => errors.push(String(e)));
await page.goto('file://' + resolve(here, 'shot.html'));
const stats = await page.evaluate(() => window.boot(false));
console.log('scena', JSON.stringify(stats));
const allLabels = {};
for (const job of jobs) {
  const [view, mood, w, h, dpr] = job.split(':');
  const t0 = Date.now();
  const r = await page.evaluate(([v, m, ww, hh, d]) => window.shot(v, m, +ww, +hh, +(d || 1)), [view, mood, w, h, dpr]);
  const name = `${view}-${mood}`;
  writeFileSync(join(outDir, name + '.png'), Buffer.from(r.img.split(',')[1], 'base64'));
  allLabels[name] = r.labels;
  console.log(name, ((Date.now() - t0) / 1000).toFixed(1) + 's');
}
writeFileSync(join(outDir, 'labels.json'), JSON.stringify(allLabels, null, 1));
if (errors.length) console.log('errori:', errors.join('\n'));
await browser.close();
