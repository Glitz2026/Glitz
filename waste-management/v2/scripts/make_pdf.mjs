// build/catalogo.html → PDF digitale, PDF stampa (abbondanza 3 mm) o anteprime PNG per il controllo pagina per pagina.
// Uso: node make_pdf.mjs digital|print|preview [pagine es. 1-12]
import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { serve } from '../../scripts/render-mockups.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const V2 = join(ROOT, 'v2');
const mode = process.argv[2] || 'digital';
const range = process.argv[3];
const bleed = mode === 'print' ? 3 : 0;

const srv = await serve(ROOT);
const port = srv.address().port;
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 900, height: 1200 }, deviceScaleFactor: mode === 'preview' ? 1.25 : 1 });
page.on('pageerror', e => console.error('errore pagina:', e.message));
page.on('requestfailed', r => console.error('risorsa mancante:', r.url()));
await page.goto(`http://127.0.0.1:${port}/v2/build/catalogo.html`, { waitUntil: 'networkidle', timeout: 600000 });
await page.addStyleTag({ content: `:root{--b:${bleed}mm} @page{size:${210 + 2 * bleed + (bleed ? 0.2 : 0)}mm ${297 + 2 * bleed + (bleed ? 0.1 : 0)}mm;margin:0} body{background:#fff}` });
await page.evaluate(() => document.fonts.ready);

if (mode === 'preview') {
  const dir = join(V2, 'build', 'preview');
  await mkdir(dir, { recursive: true });
  const sheets = await page.$$('section.sheet');
  let [a, b] = range ? range.split('-').map(Number) : [1, sheets.length];
  b = b || a;
  for (let i = a; i <= Math.min(b, sheets.length); i++) {
    await sheets[i - 1].screenshot({ path: join(dir, `p${String(i).padStart(3, '0')}.png`) });
  }
  console.log('anteprime', a, '-', Math.min(b, sheets.length));
} else {
  const out = join(V2, 'build', mode === 'print' ? 'catalogo-stampa-raw.pdf' : 'catalogo-digitale-raw.pdf');
  await page.pdf({ path: out, preferCSSPageSize: true, printBackground: true, tagged: false, outline: false, timeout: 0 });
  console.log('scritto', out);
}
await browser.close();
srv.close();
