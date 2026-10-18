// Controllo automatico dell'impaginato: contenuti che escono dal blocco o invadono il piede, immagini mancanti.
import { chromium } from 'playwright';
import { writeFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { serve } from '../../scripts/render-mockups.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const srv = await serve(ROOT);
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 900, height: 1200 } });
await page.goto(`http://127.0.0.1:${srv.address().port}/v2/build/catalogo.html`, { waitUntil: 'networkidle', timeout: 600000 });
await page.evaluate(() => document.fonts.ready);
const issues = await page.evaluate(() => {
  const mm = v => v * 96 / 25.4;
  const out = [];
  document.querySelectorAll('section.sheet').forEach((sh, i) => {
    const n = i + 1, pg = sh.querySelector('.page').getBoundingClientRect();
    const limit = pg.top + mm(282);
    const skip = el => el.closest('.ft, .tabs, .full, .hero-stage, .op-panel, .hd');
    sh.querySelectorAll('.page *').forEach(el => {
      if (skip(el) || !el.getClientRects().length) return;
      const r = el.getBoundingClientRect();
      if (r.height > 0 && r.bottom > limit + 1 && (el.matches('td, p, h1, h2, h3, h4, span, img, a, table') )) out.push([n, 'piede', el.tagName + '.' + el.className, (el.textContent || el.getAttribute('src') || '').slice(0, 40), Math.round((r.bottom - limit) / mm(1))]);
    });
    sh.querySelectorAll('.flow > .row, .grid4 > .card, .grid6 > .card, .pair > .cardf').forEach(box => {
      const b = box.getBoundingClientRect();
      box.querySelectorAll('td, p, h3, h4, img, .thumbs').forEach(el => {
        const r = el.getBoundingClientRect();
        if (r.bottom > b.bottom + 2) out.push([n, 'blocco', el.tagName + '.' + el.className, (el.textContent || '').slice(0, 40), Math.round((r.bottom - b.bottom) / mm(1))]);
      });
    });
    sh.querySelectorAll('.stage img, .hero-img img, .op-art img').forEach(im => { if (!im.complete || !im.naturalWidth) out.push([n, 'immagine', im.getAttribute('src')]); });
  });
  return out;
});
const byPage = {};
for (const [n, kind, ...rest] of issues) (byPage[n] ||= new Set()).add(kind + ' ' + rest.join(' | '));
const summary = Object.entries(byPage).map(([n, s]) => `p${n}: ${[...s].slice(0, 3).join(' ;; ')}${s.size > 3 ? ` (+${s.size - 3})` : ''}`);
await writeFile(join(ROOT, 'v2', 'build', 'qa.txt'), summary.join('\n'));
console.log(summary.length ? summary.join('\n') : 'nessun problema');
await browser.close(); srv.close();
