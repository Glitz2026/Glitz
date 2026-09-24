// Shopper in carta, parametriche: formato, carta, colori (dai campioni Ref.), maniglie, fantasie.
import * as THREE from 'three';
import { cnv, tex, paperFill, paperMat, plainMat, lockup, symbol, badge, inkFor, lum, shadowAll, normUV, PX, NAVY, GREEN, WHITE, KRAFT, reseed } from './lib.js';

const WHITE_P = '#f3f1ea', KRAFT_P = '#b99a78', SEAL_P = '#ad8e6c';

// ------------------------------------------------------------------ fantasie
function star(x, cx, cy, r, fill) { x.fillStyle = fill; x.beginPath(); for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * 0.42 : r; x.lineTo(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr); } x.closePath(); x.fill(); }
function flake(x, cx, cy, r, c) { x.strokeStyle = c; x.lineWidth = r * 0.12; x.lineCap = 'round'; for (let i = 0; i < 6; i++) { const a = i * Math.PI / 3; x.beginPath(); x.moveTo(cx, cy); x.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r); x.stroke(); } }
function flower(x, cx, cy, r, c1, c2) { x.fillStyle = c1; for (let i = 0; i < 5; i++) { const a = i * Math.PI * 2 / 5; x.beginPath(); x.ellipse(cx + Math.cos(a) * r * 0.55, cy + Math.sin(a) * r * 0.55, r * 0.5, r * 0.3, a, 0, 7); x.fill(); } x.fillStyle = c2; x.beginPath(); x.arc(cx, cy, r * 0.25, 0, 7); x.fill(); }
function leaf(x, cx, cy, r, c, a) { x.fillStyle = c; x.beginPath(); x.ellipse(cx, cy, r, r * 0.35, a, 0, 7); x.fill(); }
function tree(x, cx, by, h, c) { x.fillStyle = c; for (let k = 0; k < 3; k++) { const w = h * (0.6 - k * 0.14), y = by - k * h * 0.28; x.beginPath(); x.moveTo(cx - w / 2, y); x.lineTo(cx + w / 2, y); x.lineTo(cx, y - h * 0.42); x.closePath(); x.fill(); } }

export const MOTIF = {
  'Fascia cammeo blu': 'cameo', 'Atene': 'greek', 'Flores': 'wreath', 'Summer': 'wreath', 'Garden': 'floral', 'Rosette': 'roses', 'Fiji': 'floral', 'Blumen': 'floral',
  'Duo Italy': 'duo', 'Argento e oro': 'metal', 'Bronzo e platino bordo risvoltato': 'metal', 'Bicolor bordo risvoltato': 'bicolor', 'Take away bicolor': 'duo',
  'Santa Klaus': 'ribbon', 'Merry Christmas': 'ribbon', 'Xmas Village': 'village', 'Sestriere': 'snow', 'Stars': 'stars', 'Bianco Natale': 'snow',
  'Dolomiti': 'trees', 'Cortina rosso': 'snow', 'Christmas bordo risvoltato': 'stars', 'Xmas bordo risvoltato': 'stars',
  'Porta bottiglie argento e oro': 'metal', 'Porta bottiglie Black Lux': 'stars',
};

function drawMotif(x, W, H, motif, pal, base, rnd) {
  const P = (i) => pal[i % pal.length] || '#888';
  const acc = pal.filter(c => Math.abs(lum(c) - lum(base)) > 0.18);
  const A = (i) => acc.length ? acc[i % acc.length] : P(i + 1);
  const u = W / 30; // unità ~ 1/30 della larghezza
  switch (motif) {
    case 'wreath': case 'floral': case 'roses': {
      const n = motif === 'wreath' ? 90 : 70;
      for (let i = 0; i < n; i++) {
        let px, py;
        if (motif === 'wreath') { const e = rnd() * 4 | 0, t = rnd(); px = e < 2 ? t * W : (e === 2 ? rnd() * W * 0.14 : W - rnd() * W * 0.14); py = e === 0 ? rnd() * H * 0.1 : e === 1 ? H - rnd() * H * 0.12 : t * H; }
        else { px = rnd() * W; py = rnd() * H; }
        leaf(x, px + u, py + u * 0.4, u * (1 + rnd()), rnd() > .5 ? '#5e8c52' : '#3f6b44', rnd() * 3);
        if (rnd() > 0.35) flower(x, px, py, u * (motif === 'roses' ? 2.4 : 1.2 + rnd()), A(i), P(i + 2));
      }
      break;
    }
    case 'greek': {
      const bh = H * 0.07, gold = A(0);
      for (const y0 of [H * 0.06, H * 0.87]) { x.strokeStyle = gold; x.lineWidth = bh * 0.16; const s = bh; for (let px = 0; px < W; px += s * 1.6) { x.beginPath(); x.moveTo(px, y0 + s); x.lineTo(px, y0); x.lineTo(px + s, y0); x.lineTo(px + s, y0 + s * 0.65); x.lineTo(px + s * 0.4, y0 + s * 0.65); x.lineTo(px + s * 0.4, y0 + s * 0.3); x.stroke(); } x.fillStyle = gold; x.fillRect(0, y0 - bh * 0.35, W, bh * 0.12); x.fillRect(0, y0 + s + bh * 0.25, W, bh * 0.12); }
      break;
    }
    case 'cameo': {
      x.fillStyle = '#2d4f8e'; x.fillRect(0, H * 0.38, W, H * 0.24);
      for (let px = W * 0.1; px < W; px += W * 0.2) { x.fillStyle = '#e9e3d4'; x.beginPath(); x.ellipse(px, H * 0.5, W * 0.055, H * 0.085, 0, 0, 7); x.fill(); x.strokeStyle = '#c9b27a'; x.lineWidth = 3; x.stroke(); }
      break;
    }
    case 'stars': for (let i = 0; i < 38; i++) star(x, rnd() * W, rnd() * H, u * (0.6 + rnd() * 1.6), i % 3 ? A(i) : '#e4c56a'); break;
    case 'snow': for (let i = 0; i < 46; i++) flake(x, rnd() * W, rnd() * H, u * (0.5 + rnd() * 1.4), i % 2 ? A(i) : 'rgba(255,255,255,0.85)'); break;
    case 'trees': for (let i = 0; i < 9; i++) tree(x, (i + 0.5) * W / 9 + (rnd() - .5) * u, H * (0.94 - rnd() * 0.05), H * (0.18 + rnd() * 0.12), i % 2 ? '#2f5a3a' : A(i)); for (let i = 0; i < 26; i++) flake(x, rnd() * W, rnd() * H * 0.6, u * 0.7, 'rgba(255,255,255,0.8)'); break;
    case 'ribbon': {
      const c = A(0); x.fillStyle = c; x.fillRect(W * 0.42, 0, W * 0.16, H); x.fillRect(0, H * 0.42, W, H * 0.1);
      x.beginPath(); x.ellipse(W * 0.4, H * 0.4, W * 0.12, H * 0.05, -0.5, 0, 7); x.ellipse(W * 0.6, H * 0.4, W * 0.12, H * 0.05, 0.5, 0, 7); x.fill();
      for (let i = 0; i < 20; i++) star(x, rnd() * W, rnd() * H, u * 0.8, '#e4c56a');
      break;
    }
    case 'village': { for (let i = 0; i < 7; i++) { const bw = W / 7, bh = H * (0.16 + rnd() * 0.14); x.fillStyle = i % 2 ? '#f4efe6' : A(i); x.fillRect(i * bw + 4, H - bh, bw - 8, bh); x.beginPath(); x.moveTo(i * bw, H - bh); x.lineTo(i * bw + bw / 2, H - bh - bw * 0.5); x.lineTo(i * bw + bw, H - bh); x.fill(); } for (let i = 0; i < 30; i++) flake(x, rnd() * W, rnd() * H * 0.6, u * 0.8, 'rgba(255,255,255,0.9)'); break; }
    default: break;
  }
}

// ------------------------------------------------------------------ carta e colori dal blocco
function paperOf(desc) {
  const d = desc.toLowerCase();
  if (d.includes('sealing')) return { inner: SEAL_P, kraft: true };
  if (d.includes('avana e bianca') || d.includes('bianca e avana')) return { inner: null, kraft: null };
  if (d.includes('avana')) return { inner: KRAFT_P, kraft: true };
  return { inner: WHITE_P, kraft: false };
}
function handleOf(desc) {
  const d = desc.toLowerCase();
  const type = d.includes('senza maniglia') ? 'none' : d.includes('fagiolo') ? 'die' : d.includes('cotone') ? 'cotton' : d.includes('piatta') ? 'flat' : 'rope';
  const m = d.match(/maniglia (?:piatta|ritorta|rivestita in cotone)\s+(\w+)/);
  const NAMED = { bianca: '#f2f0ea', avana: '#c9a57a', nera: '#1d1b1a', blu: '#23406b', rossa: '#b8232b', oro: '#c8a55a', vaniglia: '#efe3c4', colorata: null };
  const color = m && m[1] in NAMED ? NAMED[m[1]] : undefined;
  return { type, color };
}
export function parseFormat(f) { // "18+8 × 24" / "19+9 × 25+6"
  const n = f.replace(/\s/g, '').replace(/,/g, '.').match(/([\d.]+)\+([\d.]+)×([\d.]+)(?:\+([\d.]+))?/);
  return n ? { w: +n[1], d: +n[2], h: +n[3], fold: +(n[4] || 0) } : { w: 22, d: 10, h: 29, fold: 0 };
}

// ------------------------------------------------------------------ singola shopper
export function bag(o) {
  const { w, h, d, body = WHITE_P, inner = WHITE_P, gusset, kraft = false, metal = false, handle = 'rope', handleColor = '#d8c3a0',
    fold = 0, motif, palette = [], brand = true, seedN = 1, style = 'standard' } = o;
  reseed(seedN * 97 + 13);
  let r = 13 + seedN; const rnd = () => ((r = (r * 16807) % 2147483647) / 2147483647);
  const g = new THREE.Group();
  const kind = kraft ? 'crumple' : 'white';
  const baseFill = (x, W, H, col) => paperFill(x, W, H, col, kraft && lum(col) > 0.3 ? { grain: 14, fibers: (W * H) / 900 } : { grain: 5 });
  const topBand = Math.min(3.5, h * 0.12);

  const faceDraw = (W, H, isSide, col) => {
    const [c, x] = cnv(W * PX, H * PX); const cw = c.width, ch = c.height;
    baseFill(x, cw, ch, col);
    if (motif && motif !== 'metal' && motif !== 'duo' && motif !== 'bicolor') { reseed(seedN * 31 + (isSide ? 7 : 3)); drawMotif(x, cw, ch, motif, palette, col, rnd); }
    if (fold) { x.fillStyle = 'rgba(0,0,0,0.10)'; x.fillRect(0, ch * (fold / H) - 3, cw, 3); x.fillStyle = 'rgba(255,255,255,0.10)'; x.fillRect(0, ch * (fold / H), cw, 2); }
    if (!isSide) { // pieghe del fondo
      x.fillStyle = 'rgba(0,0,0,0.045)'; x.fillRect(0, ch - (d / 2) * PX, cw, (d / 2) * PX);
      if (brand) { const ink = inkFor(col); const lw = Math.min(cw * 0.52, ch * 0.5); lockup(x, cw / 2, ch * (style === 'takeaway' ? 0.42 : 0.44), lw, ink, ink === NAVY ? NAVY : 'gradient'); }
    } else {
      const gr = x.createLinearGradient(0, 0, cw, 0);
      gr.addColorStop(0, 'rgba(0,0,0,0.10)'); gr.addColorStop(0.49, 'rgba(0,0,0,0.0)'); gr.addColorStop(0.5, 'rgba(0,0,0,0.14)'); gr.addColorStop(1, 'rgba(0,0,0,0.03)');
      x.fillStyle = gr; x.fillRect(0, 0, cw, ch);
      x.strokeStyle = 'rgba(0,0,0,0.16)'; x.lineWidth = 2; x.beginPath(); x.moveTo(cw / 2, 0); x.lineTo(cw / 2, ch - cw / 2); x.lineTo(0, ch); x.moveTo(cw / 2, ch - cw / 2); x.lineTo(cw, ch); x.stroke();
      if (brand && W > 5) symbol(x, cw / 2, ch * 0.3, Math.min(cw * 0.34, ch * 0.12), inkFor(col) === NAVY ? NAVY : GREEN);
    }
    return tex(c);
  };
  const innerDraw = (W, H) => {
    const [c, x] = cnv(W * PX, H * PX); baseFill(x, c.width, c.height, inner);
    x.fillStyle = body; x.fillRect(0, 0, c.width, topBand * PX); // risvolto interno
    x.fillStyle = 'rgba(0,0,0,0.12)'; x.fillRect(0, topBand * PX, c.width, 3);
    x.fillStyle = 'rgba(0,0,0,0.25)'; x.fillRect(0, 0, c.width, c.height); // interno in ombra
    return tex(c);
  };
  const mat = (t, isInner) => { const m = paperMat(t, { kind, rough: metal && !isInner ? 0.32 : 0.82, metal: metal && !isInner ? 0.55 : 0 }); if (isInner) m.side = THREE.BackSide; return m; };
  const frontT = faceDraw(w, h, false, body), sideT = faceDraw(d, h, true, gusset || body);
  const innerF = innerDraw(w, h), innerS = innerDraw(d, h);

  const addPanel = (W, H, outerT, innerT, pos, ry, holes) => {
    let geo;
    if (holes) { const sh = new THREE.Shape([new THREE.Vector2(-W / 2, -H / 2), new THREE.Vector2(W / 2, -H / 2), new THREE.Vector2(W / 2, H / 2), new THREE.Vector2(-W / 2, H / 2)]); sh.holes.push(holes); geo = normUV(new THREE.ShapeGeometry(sh, 32)); }
    else geo = new THREE.PlaneGeometry(W, H);
    const a = new THREE.Mesh(geo, mat(outerT)), b = new THREE.Mesh(geo, mat(innerT, true));
    const p = new THREE.Group().add(a, b); p.position.copy(pos); p.rotation.y = ry; g.add(p);
  };
  let hole = null;
  if (handle === 'die') { hole = new THREE.Path(); hole.absellipse(0, h / 2 - 4.2, Math.min(4.5, w * 0.14), 1.5, 0, Math.PI * 2, false); }
  addPanel(w, h, frontT, innerF, new THREE.Vector3(0, h / 2, d / 2), 0, hole);
  addPanel(w, h, frontT, innerF, new THREE.Vector3(0, h / 2, -d / 2), Math.PI, hole);
  // soffietti con piega centrale leggermente rientrante
  const tuck = Math.min(0.7, d * 0.06), half = Math.hypot(d / 2, tuck), ang = Math.atan2(tuck, d / 2);
  for (const sd of [1, -1]) for (const hz of [1, -1]) {
    const off = (sd > 0) === (hz > 0) ? 0 : 0.5;
    const t = sideT.clone(); t.needsUpdate = true; t.repeat.set(0.5, 1); t.offset.set(off, 0);
    const ti = innerS.clone(); ti.needsUpdate = true; ti.repeat.set(0.5, 1); ti.offset.set(off, 0);
    const geo = new THREE.PlaneGeometry(half, h);
    const p = new THREE.Group().add(new THREE.Mesh(geo, mat(t)), new THREE.Mesh(geo, mat(ti, true)));
    p.position.set(sd * (w / 2 - tuck / 2), h / 2, hz * d / 4);
    p.rotation.y = sd * Math.PI / 2 + sd * hz * ang;
    g.add(p);
  }
  const bottom = new THREE.Mesh(new THREE.PlaneGeometry(w, d), plainMat(inner, { side: THREE.DoubleSide })); bottom.rotation.x = -Math.PI / 2; bottom.position.y = 0.05; g.add(bottom);

  // maniglie
  const hc = handleColor;
  if (handle === 'rope' || handle === 'cotton' || handle === 'flat') {
    const hw = Math.min(w * 0.24, 6.5), hh = handle === 'flat' ? Math.min(w * 0.22, 8) : Math.min(w * 0.36, 10.5);
    for (const s of [1, -1]) {
      const z = s * (d / 2 + (handle === 'flat' ? -0.1 : 0.22));
      const pts = handle === 'flat'
        ? [[-hw, h - 3.4], [-hw, h + 0.2], [-hw * 0.82, h + hh * 0.78], [0, h + hh], [hw * 0.82, h + hh * 0.78], [hw, h + 0.2], [hw, h - 3.4]]
        : [[-hw, h - 2.4], [-hw * 1.03, h + hh * 0.45], [-hw * 0.7, h + hh * 0.9], [0, h + hh], [hw * 0.7, h + hh * 0.9], [hw * 1.03, h + hh * 0.45], [hw, h - 2.4]];
      const curve = new THREE.CatmullRomCurve3(pts.map(([px, py], i) => new THREE.Vector3(px, py, z + s * Math.sin(i / 6 * Math.PI) * (handle === 'flat' ? 0.35 : 1.3))));
      let m;
      if (handle === 'flat') {
        const pos = [], idx = [], uv = [], N = 80;
        for (let i = 0; i <= N; i++) { const t = i / N, p = curve.getPoint(t), tg = curve.getTangent(t); const n = new THREE.Vector3(-tg.y, tg.x, 0).normalize().multiplyScalar(1.1); pos.push(p.x + n.x, p.y + n.y, p.z, p.x - n.x, p.y - n.y, p.z); uv.push(t, 0, t, 1); if (i < N) { const a = i * 2; idx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2); } }
        const geo = new THREE.BufferGeometry(); geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); geo.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2)); geo.setIndex(idx); geo.computeVertexNormals();
        m = new THREE.Mesh(geo, paperMat(null, { kind, rough: 0.85, side: THREE.DoubleSide, color: hc }));
        m.material.map = null;
      } else {
        const [c, x] = cnv(256, 64); x.fillStyle = hc; x.fillRect(0, 0, 256, 64);
        if (handle === 'rope') { x.strokeStyle = 'rgba(0,0,0,0.25)'; x.lineWidth = 7; for (let i = -64; i < 320; i += 22) { x.beginPath(); x.moveTo(i, 0); x.lineTo(i + 40, 64); x.stroke(); } x.strokeStyle = 'rgba(255,255,255,0.18)'; x.lineWidth = 3; for (let i = -64; i < 320; i += 22) { x.beginPath(); x.moveTo(i + 8, 0); x.lineTo(i + 48, 64); x.stroke(); } }
        else { x.fillStyle = 'rgba(0,0,0,0.06)'; for (let i = 0; i < 256; i += 6) x.fillRect(i, 0, 2, 64); }
        const t = tex(c, handle === 'rope' ? 12 : 30, 1);
        m = new THREE.Mesh(new THREE.TubeGeometry(curve, 120, handle === 'cotton' ? 0.5 : 0.32, 12), new THREE.MeshStandardMaterial({ map: t, roughness: 0.9 }));
        for (const hx of [-hw, hw]) { const k = new THREE.Mesh(new THREE.SphereGeometry(handle === 'cotton' ? 0.62 : 0.42, 16, 12), plainMat(hc)); k.position.set(hx, h - 2.4, z - s * 0.22); g.add(k); }
      }
      m.userData.noShadow = true; g.add(m);
      // toppa di rinforzo interna
      const patch = new THREE.Mesh(new THREE.PlaneGeometry(hw * 2 + 3, 3.6), plainMat(inner, { roughness: 0.9 })); patch.position.set(0, h - 2.6, s * (d / 2 - 0.08)); patch.rotation.y = s > 0 ? Math.PI : 0; g.add(patch);
    }
  }
  return shadowAll(g);
}

// ------------------------------------------------------------------ composizione per modello di catalogo
function bagsFor(block) {
  const title = block.title, desc = block.desc, low = desc.toLowerCase();
  const paper = paperOf(desc), hnd = handleOf(desc);
  const motif = MOTIF[title];
  let sw = block.swatches.filter(s => !s.pattern || motif);
  if (!sw.length) sw = block.swatches.length ? block.swatches : [{ hex: WHITE_P, palette: [] }];
  const fmts = block.formats.map(parseFormat);
  let style = 'standard';
  if (/take away/i.test(title)) style = 'takeaway';
  if (/porta bottiglie/i.test(title)) style = 'bottle';
  if (/mini bag/i.test(title)) style = 'mini';
  if (/box pizza/i.test(title)) style = 'pizza';
  if (/e-commerce/i.test(title)) style = 'envelope';
  // formati rappresentati: piccolo, medio, grande (massimo tre, distinti)
  let pick = fmts.length >= 3 ? [fmts[0], fmts[Math.floor(fmts.length / 2)], fmts[fmts.length - 1]] : fmts.slice();
  if (fmts.length > 4) pick = [fmts[1], fmts[Math.floor(fmts.length / 2)], fmts[fmts.length - 2]];
  // colori: se più campioni, uno per shopper; carta "avana e bianca": alterna
  let colors;
  if (paper.kraft === null && !low.includes('fondo')) colors = [KRAFT_P, WHITE_P, KRAFT_P];
  else colors = sw.map(s => (motif && s.pattern ? pickBase(s, motif) : s.hex));
  const n = Math.max(style === 'bottle' || style === 'mini' ? Math.min(3, Math.max(colors.length, 2)) : Math.min(3, Math.max(pick.length, colors.length)), 1);
  const out = [];
  for (let i = 0; i < n; i++) {
    const f = pick[Math.min(i, pick.length - 1)] || fmts[0];
    const col = colors[i % colors.length];
    const kraftBody = paper.kraft === true && !low.includes('fondo') ? true : (paper.kraft === null && col === KRAFT_P);
    const inner = paper.inner || (col === KRAFT_P ? KRAFT_P : WHITE_P);
    const s = block.swatches[i % Math.max(1, block.swatches.length)] || {};
    let gusset;
    if (motif === 'duo') gusset = /neri/.test(low) ? '#1f1d1d' : /grigio scuro/.test(low) ? '#4b4c4f' : /cioccolato/.test(low) ? '#4a2c1c' : undefined;
    if (motif === 'bicolor') gusset = shade(col, -0.35);
    const hcol = hnd.color || (hnd.type === 'rope' || hnd.type === 'cotton' ? (lum(col) < 0.35 ? shade(col, 0.1) : col === WHITE_P ? '#efece4' : shade(col, -0.08)) : (lum(col) < 0.35 ? col : '#e9e2d4'));
    out.push({ w: f.w, h: f.h, d: f.d, fold: f.fold, body: col, inner, kraft: kraftBody || /sealing|avana/.test(low) && !low.includes('bianca'), metal: motif === 'metal', gusset,
      handle: style === 'mini' ? 'none' : hnd.type, handleColor: hcol, motif: motif === 'metal' ? null : motif, palette: s.palette && s.palette.length ? s.palette : [col], style, seedN: i + 1 });
  }
  return out;
}
function pickBase(s, motif) { // colore di fondo di una fantasia: il più chiaro per floreali, il dominante per le altre
  if (['wreath', 'floral', 'roses', 'snow', 'village'].includes(motif)) return s.palette.slice().sort((a, b) => lum(b) - lum(a))[0] || s.hex;
  return s.palette[0] || s.hex;
}
function shade(hex, k) { const c = new THREE.Color(hex); const hsl = {}; c.getHSL(hsl); c.setHSL(hsl.h, hsl.s, Math.max(0, Math.min(1, hsl.l + k))); return '#' + c.getHexString(); }

function envelope(block) {
  const g = new THREE.Group();
  const [c, x] = cnv(30 * PX, 48 * PX); paperFill(x, c.width, c.height, KRAFT_P, { grain: 14, fibers: 1400 });
  x.fillStyle = 'rgba(0,0,0,0.12)'; x.fillRect(0, 8 * PX, c.width, 3); x.fillStyle = '#e9e1d2'; x.fillRect(0, 3 * PX, c.width, 1.6 * PX);
  lockup(x, c.width / 2, c.height * 0.55, c.width * 0.5, NAVY, NAVY);
  const m = new THREE.Mesh(new THREE.BoxGeometry(30, 48, 2.2), [plainMat(KRAFT_P), plainMat(KRAFT_P), plainMat(KRAFT_P), plainMat(KRAFT_P), paperMat(tex(c), { kind: 'crumple' }), plainMat(KRAFT_P)]);
  m.rotation.x = -0.18; m.position.set(0, 23.7, 0); g.add(m);
  return shadowAll(g);
}
export function bagScene(block) {
  if (/e-commerce/i.test(block.title)) return envelope(block);
  const specs = bagsFor(block);
  const g = new THREE.Group();
  // disposizione: la più grande dietro a sinistra, le altre davanti
  const order = specs.map((s, i) => [s, i]).sort((a, b) => b[0].w * b[0].h - a[0].w * a[0].h);
  const placed = [];
  order.forEach(([s], k) => {
    const b = bag(s);
    const rot = [0.34, -0.3, 0.12][k % 3];
    const pos = k === 0 ? [0, 0, -2] : k === 1 ? [order[0][0].w * 0.5 + s.w * 0.45 + 1.5, 0, 3] : [-order[0][0].w * 0.35 - s.w * 0.2, 0, order[0][0].d * 0.5 + s.d * 0.7 + 3];
    b.position.set(...pos); b.rotation.y = rot; g.add(b); placed.push(b);
  });
  return g;
}
