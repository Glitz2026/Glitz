// Renderizza i mockup 3D (mockups/render.html) in PNG trasparenti dentro build/mockups/
// Uso: node scripts/render-mockups.mjs [filtro ...]   es. "pack:PP01" "bag:" "hero"
import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { extname, join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'build', 'mockups');
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.woff2': 'font/woff2', '.txt': 'text/plain', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.css': 'text/css', '.json': 'application/json' };

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

// elenco scene: nome file -> query
export async function scenes() {
  const pack = JSON.parse(await readFile(join(ROOT, 'build/data/packaging.json'), 'utf8'));
  const bags = JSON.parse(await readFile(join(ROOT, 'build/data/shopper.json'), 'utf8'));
  const s = {};
  for (const p of pack) s[`pack-${p.id}`] = `scene=pack:${p.id}`;
  bags.forEach((_, i) => { s[`bag-${String(i).padStart(2, '0')}`] = `scene=bag:${i}`; });
  for (const n of ['shopper-kraft', 'shopper-navy', 'shopper-white', 'shopper-green', 'cup', 'cup-mint']) s[`sel-${n}`] = `scene=sel:${n}&az=${n.includes('navy') ? -26 : 22}&el=${n.startsWith('cup') ? 16 : 14}`;
  Object.assign(s, {
    'hero': 'scene=hero&az=8&el=20&aspect=1.5&size=2600',
    'hero-food': 'scene=hero-food&az=10&el=26&aspect=1.5&size=2600',
    'hero-bags': 'scene=hero-bags&az=10&el=14&aspect=1.3&size=2400',
    'hero-pastry': 'scene=hero-pastry&az=12&el=26&aspect=1.3&size=2400',
    'hero-gift': 'scene=hero-gift&az=12&el=22&aspect=1.4&size=2400',
  });
  return s;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  await mkdir(OUT, { recursive: true });
  const srv = await serve(ROOT); const port = srv.address().port;
  const browser = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
  const filters = process.argv.slice(2);
  const todo = Object.entries(await scenes()).filter(([n, q]) => !filters.length || filters.some(f => n.startsWith(f) || q.includes(f)));
  let i = 0, errors = 0;
  async function worker() {
    while (i < todo.length) {
      const [name, q] = todo[i++];
      const page = await browser.newPage(); const t = Date.now();
      page.on('pageerror', e => { errors++; console.error(name, e.message); });
      try {
        await page.goto(`http://127.0.0.1:${port}/mockups/render.html?${q}${q.includes('size=') ? '' : '&size=1800'}`);
        await page.waitForFunction(() => window.__done === true, null, { timeout: 240000 });
        const b64 = await page.evaluate(() => document.querySelector('canvas').toDataURL('image/png').split(',')[1]);
        await writeFile(join(OUT, `${name}.png`), Buffer.from(b64, 'base64'));
        console.log(name, ((Date.now() - t) / 1000).toFixed(1) + 's');
      } catch (e) { errors++; console.error('ERRORE', name, e.message.split('\n')[0]); }
      await page.close();
    }
  }
  await Promise.all([worker(), worker(), worker()]);
  await browser.close(); srv.close();
  if (errors) { console.error(errors, 'errori'); process.exitCode = 1; }
}
