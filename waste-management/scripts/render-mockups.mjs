// Renderizza i mockup 3D (mockups/render.html) in PNG trasparenti dentro build/mockups/
// Uso: node scripts/render-mockups.mjs [scena ...]
import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFile, mkdir } from 'node:fs/promises';
import { extname, join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'build', 'mockups');
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.woff2': 'font/woff2', '.txt': 'text/plain', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.css': 'text/css', '.json': 'application/json' };

// scena -> parametri camera
export const SCENES = {
  'shopper-kraft': 'az=24&el=14',
  'shopper-navy': 'az=-26&el=14',
  'shopper-white': 'az=22&el=16',
  'shopper-green': 'az=20&el=14',
  'burger-box': 'az=30&el=40',
  'cup': 'az=20&el=16',
  'bowl': 'az=20&el=24',
  'pastry-box': 'az=24&el=44',
  'cake-box': 'az=32&el=26',
  'mailer': 'az=24&el=42',
  'bottle': 'az=34&el=14',
  'sushi': 'az=30&el=30',
  'noodle': 'az=22&el=18',
  'placemat': 'az=0&el=52',
  'hero': 'az=8&el=20&aspect=1.5&size=2400',
  'hero-food': 'az=10&el=26&aspect=1.5&size=2400',
  'hero-bags': 'az=10&el=14&aspect=1.3&size=2200',
  'hero-pastry': 'az=12&el=24&aspect=1.3&size=2200',
};

export function serve(root, port = 0) {
  const srv = createServer(async (req, res) => {
    try {
      const p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
      const data = await readFile(join(root, p));
      res.writeHead(200, { 'content-type': TYPES[extname(p)] || 'application/octet-stream' });
      res.end(data);
    } catch { res.writeHead(404); res.end(); }
  });
  return new Promise(r => srv.listen(port, '127.0.0.1', () => r(srv)));
}

if (import.meta.url === `file://${process.argv[1]}`) {
  await mkdir(OUT, { recursive: true });
  const srv = await serve(ROOT);
  const port = srv.address().port;
  const browser = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
  const only = process.argv.slice(2);
  for (const [name, q] of Object.entries(SCENES)) {
    if (only.length && !only.includes(name)) continue;
    const page = await browser.newPage();
    page.on('pageerror', e => console.error(name, e.message));
    page.on('console', m => m.type() === 'error' && console.error(name, m.text()));
    const t = Date.now();
    await page.goto(`http://127.0.0.1:${port}/mockups/render.html?scene=${name}&${q}`);
    await page.waitForFunction(() => window.__done === true, null, { timeout: 180000 });
    const b64 = await page.evaluate(() => document.querySelector('canvas').toDataURL('image/png').split(',')[1]);
    const { writeFile } = await import('node:fs/promises');
    await writeFile(join(OUT, `${name}.png`), Buffer.from(b64, 'base64'));
    console.log(name, ((Date.now() - t) / 1000).toFixed(1) + 's');
    await page.close();
  }
  await browser.close();
  srv.close();
}
