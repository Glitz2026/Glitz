// Render di una pagina three.js in PNG: node shot.mjs <url-relativo> <output.png>
import { chromium } from 'playwright';
import { writeFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { serve } from '../../scripts/render-mockups.mjs';
const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const srv = await serve(ROOT); const port = srv.address().port;
const browser = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const jobs = process.argv.slice(2);
for (let i = 0; i < jobs.length; i += 2) {
  const page = await browser.newPage(); page.on('pageerror', e => console.error(e.message));
  await page.goto(`http://127.0.0.1:${port}/${jobs[i]}`);
  await page.waitForFunction(() => window.__done === true, null, { timeout: 300000 });
  const b64 = await page.evaluate(() => document.querySelector('canvas').toDataURL('image/png').split(',')[1]);
  await writeFile(jobs[i + 1], Buffer.from(b64, 'base64')); console.log('ok', jobs[i + 1]); await page.close();
}
await browser.close(); srv.close();
