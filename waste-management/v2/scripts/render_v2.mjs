// Render dei nuovi articoli, coordinati e dettagli per il catalogo definitivo -> v2/build/renders/*.png
import { chromium } from 'playwright';
import { writeFile, mkdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { serve } from '../../scripts/render-mockups.mjs';
const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const OUT = join(ROOT, 'v2', 'build', 'renders');
export const JOBS = {
  ...Object.fromEntries(Array.from({ length: 59 }, (_, i) => [`bag-${String(i).padStart(2, '0')}`, `scene=bag:${i}&plain=1&size=1300`])),
  'item-napkin-softtouch': 'scene=item:napkin-softtouch', 'item-tnt-tablecloths': 'scene=item:tnt-tablecloths', 'item-tnt-runner': 'scene=item:tnt-runner',
  'item-tnt-placemat': 'scene=item:tnt-placemat', 'item-softtouch-set': 'scene=item:softtouch-set', 'item-paper-ashtray': 'scene=item:paper-ashtray',
  'item-rpet-cups': 'scene=item:rpet-cups', 'item-paper-stack': 'scene=item:paper-stack', 'item-piping-bag': 'scene=item:piping-bag',
  'item-napkin-counter': 'scene=item:napkin-counter',
  'item-napkin-ovatta': 'scene=item:napkin-ovatta',
  'item-napkin-ovatta-large': 'scene=item:napkin-ovatta-large',
  'item-placemat-paper': 'scene=item:placemat-paper',
  'item-placemat-straw': 'scene=item:placemat-straw',
  'item-straw-sheets': 'scene=item:straw-sheets',
  'item-kebab-pocket': 'scene=item:kebab-pocket',
  'item-food-filter': 'scene=item:food-filter',
  'item-gloves': 'scene=item:gloves&size=2600',
  'item-baking-paper': 'scene=item:baking-paper&size=2600',
  'item-baking-perforated': 'scene=item:baking-perforated',
  'item-airfryer-liners': 'scene=item:airfryer-liners',
  'item-vacuum-bags': 'scene=item:vacuum-bags&size=2600',
  'item-microfiber': 'scene=item:microfiber&size=2600',
  'item-floor-cloth': 'scene=item:floor-cloth',
  'item-heavy-cloth': 'scene=item:heavy-cloth',
  'item-pva-cloth': 'scene=item:pva-cloth',
  'item-multi-cloth': 'scene=item:multi-cloth',
  'item-sponge-cloth': 'scene=item:sponge-cloth',
  'item-dust-cloth': 'scene=item:dust-cloth',
  'item-service-wipes': 'scene=item:service-wipes',
  'item-duster': 'scene=item:duster',
  'item-eraser-sponge': 'scene=item:eraser-sponge&size=2600',
  'item-wood-cutlery': 'scene=item:wood-cutlery&size=2600',
  'item-doilies': 'scene=item:doilies',
  'item-doilies-straw': 'scene=item:doilies-straw',
  'item-pp-sheets': 'scene=item:pp-sheets',
  'item-paper-vegetale': 'scene=item:paper-vegetale',
  'item-paper-kraft-white': 'scene=item:paper-kraft-white',
  'item-paper-velina': 'scene=item:paper-velina',
  'item-paper-pelleaglio': 'scene=item:paper-pelleaglio',
  'item-pet-rect': 'scene=item:pet-rect',
  'item-piping-bag2': 'scene=item:piping-bag2&size=2600',
  'item-pulp-bowl': 'scene=item:pulp-bowl', 'item-wood-small': 'scene=item:wood-small',
  'item-paper-assortment': 'scene=item:paper-assortment',
  'coord-waste': 'scene=coord:waste&az=12&el=24&aspect=1.4&size=2600', 'coord-mint': 'scene=coord:mint&az=-14&el=24&aspect=1.4&size=2600',
  'detail-rope': 'scene=detail:rope&az=20&el=10&tx=0&ty=44&tz=7&dist=34&size=1600', 'detail-flat': 'scene=detail:flat&az=18&el=16&tx=0&ty=31&tz=11&dist=40&size=1600',
  'detail-cotton': 'scene=detail:cotton&az=-24&el=12&tx=0&ty=37&tz=6&dist=34&size=1600', 'detail-closure': 'scene=detail:closure&az=10&el=18&tx=0&ty=6.5&tz=7.5&dist=26&size=1600',
  'detail-lid': 'scene=detail:lid&az=20&el=36&tx=0&ty=10&tz=0&dist=26&size=1600', 'detail-diffuse': 'scene=detail:diffuse&az=10&el=50&tx=4&ty=7&tz=4&dist=34&size=1600',
};
if (import.meta.url === `file://${process.argv[1]}`) {
  await mkdir(OUT, { recursive: true });
  const srv = await serve(ROOT); const port = srv.address().port;
  const browser = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
  const only = process.argv.slice(2);
  const todo = Object.entries(JOBS).filter(([n]) => !only.length || only.some(o => n.startsWith(o)));
  let i = 0;
  const worker = async () => { while (i < todo.length) { const [name, q] = todo[i++]; const page = await browser.newPage(); page.on('pageerror', e => console.error(name, e.message));
    try { await page.goto(`http://127.0.0.1:${port}/mockups/render.html?${q}${q.includes('size=') ? '' : '&size=1800'}`); await page.waitForFunction(() => window.__done === true, null, { timeout: 300000 });
      const b64 = await page.evaluate(() => document.querySelector('canvas').toDataURL('image/png').split(',')[1]); await writeFile(join(OUT, name + '.png'), Buffer.from(b64, 'base64')); console.log('ok', name); }
    catch (e) { console.error('ERRORE', name, e.message.split('\n')[0]); } await page.close(); } };
  await Promise.all([worker(), worker(), worker()]); await browser.close(); srv.close();
}
