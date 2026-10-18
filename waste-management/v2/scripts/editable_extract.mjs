// Estrae dall'impaginato ogni pagina come oggetti separati (testi con stili, immagini, tabelle, fondi)
// per la versione modificabile: v2/build/editable.json + v2/build/editable_media/*.png (icone vettoriali rasterizzate).
import { chromium } from 'playwright';
import { writeFile, mkdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { serve } from '../../scripts/render-mockups.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const OUT = join(ROOT, 'v2', 'build');
await mkdir(join(OUT, 'editable_media'), { recursive: true });
const srv = await serve(ROOT);
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 900, height: 1200 } });
await page.goto(`http://127.0.0.1:${srv.address().port}/v2/build/catalogo.html`, { waitUntil: 'networkidle', timeout: 600000 });
await page.addStyleTag({ content: ':root{--b:0mm} body{background:#fff}' });
await page.evaluate(() => document.fonts.ready);

const pages = await page.evaluate(async () => {
  const PX = 25.4 / 96;                      // px → mm
  const sheets = [...document.querySelectorAll('section.sheet')];
  const anchorPage = id => { const el = document.getElementById(id); const s = el && el.closest('section.sheet'); return s ? sheets.indexOf(s) + 1 : null; };
  const color = c => { const m = c.match(/rgba?\(([^)]+)\)/); if (!m) return null; const [r, g, b, a = 1] = m[1].split(',').map(Number); return a < 0.02 ? null : { hex: '#' + [r, g, b].map(v => Math.round(v).toString(16).padStart(2, '0')).join(''), a }; };
  const rasterSvg = async (svgText, wpx, hpx) => {
    const img = new Image(); const url = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgText);
    await new Promise((ok, ko) => { img.onload = ok; img.onerror = ko; img.src = url; });
    const k = 6, c = document.createElement('canvas'); c.width = Math.max(4, Math.round(wpx * k)); c.height = Math.max(4, Math.round(hpx * k));
    c.getContext('2d').drawImage(img, 0, 0, c.width, c.height); return c.toDataURL('image/png');
  };
  const out = [];
  for (const [si, sh] of sheets.entries()) {
    const base = sh.querySelector('.page').getBoundingClientRect();
    const box = r => ({ x: (r.left - base.left) * PX, y: (r.top - base.top) * PX, w: r.width * PX, h: r.height * PX });
    const inPage = r => r.width > 0.5 && r.height > 0.5 && r.right > base.left - 2 && r.left < base.right + 2 && r.bottom > base.top - 2 && r.top < base.bottom + 2;
    const items = [];
    const consumed = new Set();
    const link = el => { const a = el.closest('a[href]'); if (!a) return null; const h = a.getAttribute('href'); return h.startsWith('#') ? { page: anchorPage(h.slice(1)) } : { url: h }; };
    const els = [...sh.querySelectorAll('.page *')];
    for (const el of els) {
      if ([...consumed].some(c => c.contains(el))) continue;
      const cs = getComputedStyle(el);
      if (cs.display === 'none' || cs.visibility === 'hidden') continue;
      const r = el.getBoundingClientRect(); if (!inPage(r)) continue;
      const bg = color(cs.backgroundColor);
      if (bg && el.tagName !== 'TABLE') items.push({ t: 'rect', ...box(r), fill: bg.hex, alpha: bg.a, radius: parseFloat(cs.borderTopLeftRadius) * PX || 0, link: link(el) });
      const bgi = cs.backgroundImage.match(/url\("?([^")]+)"?\)/);
      if (bgi) items.push({ t: 'img', src: new URL(bgi[1], location.href).pathname, ...box(r), fit: 'cover', pos: cs.backgroundPosition });
      if (el.tagName === 'IMG') {
        const src = new URL(el.getAttribute('src'), location.href).pathname;
        let it = { t: 'img', src, ...box(r), fit: cs.objectFit, nw: el.naturalWidth, nh: el.naturalHeight, link: link(el) };
        if (src.endsWith('.svg')) { const txt = await (await fetch(src)).text(); it = { ...it, src: null, data: await rasterSvg(txt, r.width, r.height), fit: 'fill' }; }
        else if (cs.objectFit === 'contain' && el.naturalWidth) { // area realmente occupata dall'immagine
          const s = Math.min(r.width / el.naturalWidth, r.height / el.naturalHeight), w = el.naturalWidth * s, h = el.naturalHeight * s;
          Object.assign(it, box({ left: r.left + (r.width - w) / 2, top: r.top + (r.height - h) / 2, width: w, height: h })); it.fit = 'fill';
        }
        items.push(it);
      }
      if (el.tagName.toLowerCase() === 'svg') {
        const clone = el.cloneNode(true); clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        clone.setAttribute('width', r.width); clone.setAttribute('height', r.height);
        const txt = clone.outerHTML.replaceAll('currentColor', cs.color);
        items.push({ t: 'img', data: await rasterSvg(txt, r.width, r.height), ...box(r), fit: 'fill', link: link(el) });
        consumed.add(el); continue;
      }
      if (el.tagName === 'TABLE') {
        const rows = [...el.rows].map(tr => [...tr.cells].map(td => { const c = getComputedStyle(td); return { text: td.innerText.trim(), size: parseFloat(c.fontSize) * 0.75, weight: +c.fontWeight, color: color(c.color).hex, upper: c.textTransform === 'uppercase', ls: parseFloat(c.letterSpacing) || 0, h: td.getBoundingClientRect().height * PX }; }));
        const widths = [...el.rows[0].cells].map(c => c.getBoundingClientRect().width * PX);
        const rowH = [...el.rows].map(tr => tr.getBoundingClientRect().height * PX);
        items.push({ t: 'table', ...box(r), rows, widths, rowH, line: '#0a2a39', rule: '#dde3e5' });
        consumed.add(el); continue;
      }
    }
    // testi: nodi di testo raggruppati per blocco
    const blocks = new Map();
    const tw = document.createTreeWalker(sh.querySelector('.page'), NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT);
    let n;
    const blockOf = node => { let e = node.nodeType === 3 ? node.parentElement : node; while (e && getComputedStyle(e).display === 'inline') e = e.parentElement; return e; };
    while ((n = tw.nextNode())) {
      if ([...consumed].some(c => c.contains(n))) continue;
      if (n.nodeType === 1) { if (n.tagName === 'BR') { const b = blockOf(n); if (blocks.has(b)) blocks.get(b).runs.push({ br: true }); } continue; }
      const txt = n.textContent.replace(/\s+/g, ' ');
      if (!txt.trim()) continue;
      const p = n.parentElement, cs = getComputedStyle(p);
      if (cs.display === 'none' || cs.visibility === 'hidden') continue;
      const rg = document.createRange(); rg.selectNodeContents(n); const rr = rg.getBoundingClientRect(); if (!inPage(rr)) continue;
      const b = blockOf(n);
      if (!blocks.has(b)) {
        blocks.set(b, { runs: [], rects: [] });
        for (const e of [p, b]) { // contenuto generato via CSS (es. freccia prima di «Indice»)
          const bc = getComputedStyle(e, '::before').content;
          if (bc && bc !== 'none' && bc !== 'normal' && bc.startsWith('"')) { const ecs = getComputedStyle(e); blocks.get(b).runs.push({ text: JSON.parse(bc), size: parseFloat(ecs.fontSize) * 0.75, weight: +ecs.fontWeight, color: color(ecs.color)?.hex || '#000000', ls: parseFloat(ecs.letterSpacing) || 0 }); break; }
        }
      }
      const B = blocks.get(b);
      B.runs.push({ text: cs.textTransform === 'uppercase' ? txt.toUpperCase() : txt, size: parseFloat(cs.fontSize) * 0.75, weight: +cs.fontWeight, color: color(cs.color)?.hex || '#000000', ls: parseFloat(cs.letterSpacing) || 0, link: link(p) });
      B.rects.push(rr);
    }
    for (const [b, B] of blocks) {
      const L = Math.min(...B.rects.map(r => r.left)), T = Math.min(...B.rects.map(r => r.top)), R = Math.max(...B.rects.map(r => r.right)), Bo = Math.max(...B.rects.map(r => r.bottom));
      const cs = getComputedStyle(b);
      // prima/ultima riga: si tolgono gli spazi iniziali e finali
      while (B.runs.length && B.runs[0].text !== undefined && !B.runs[0].text.trim()) B.runs.shift();
      if (B.runs[0]?.text) B.runs[0].text = B.runs[0].text.trimStart();
      const last = [...B.runs].reverse().find(x => x.text); if (last) last.text = last.text.trimEnd();
      items.push({ t: 'text', ...box({ left: L, top: T, width: R - L, height: Bo - T }), runs: B.runs, align: cs.textAlign, lh: parseFloat(cs.lineHeight) / parseFloat(cs.fontSize) || 1.3, order: els.indexOf(b) });
    }
    out.push({ n: si + 1, dark: sh.classList.contains('dark'), bg: color(getComputedStyle(sh).backgroundColor)?.hex || '#ffffff', items });
  }
  return out;
});
// le immagini rasterizzate vanno su file
let k = 0;
for (const pg of pages) for (const it of pg.items) if (it.data) { const f = `svg-${String(++k).padStart(4, '0')}.png`; await writeFile(join(OUT, 'editable_media', f), Buffer.from(it.data.split(',')[1], 'base64')); it.file = f; delete it.data; }
await writeFile(join(OUT, 'editable.json'), JSON.stringify(pages));
console.log('pagine', pages.length, 'oggetti', pages.reduce((a, p) => a + p.items.length, 0), 'icone', k);
await browser.close(); srv.close();
