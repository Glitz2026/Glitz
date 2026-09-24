// Libreria 3D per i mockup Waste Management: carta, stampe, forme base.
// Unità: centimetri. Ogni builder restituisce un THREE.Group appoggiato su y = 0.
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

// ------------------------------------------------------------------ brand
export const NAVY = '#0a2a39', GREEN = '#73b18d', MINT = '#e8f3ec', WHITE = '#f7f6f1', KRAFT = '#b39574', INK_LIGHT = '#eef5f1';
const SYM_W = 195.9, SYM_H = 196.9;
let SYM;
export async function init() {
  const t = await (await fetch('../assets/symbol_path.txt')).text();
  SYM = new Path2D(t.split('\n')[1]);
  await document.fonts.load('500 40px Jost'); await document.fonts.load('400 40px Jost'); await document.fonts.load('300 40px Jost');
}
export const PX = 56; // pixel per cm nelle texture

// ------------------------------------------------------------------ canvas
export function cnv(w, h) { const c = document.createElement('canvas'); c.width = Math.max(4, Math.round(w)); c.height = Math.max(4, Math.round(h)); return [c, c.getContext('2d')]; }
let seed = 7; const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
export const reseed = (s) => { seed = s; };

export function lum(hex) { const c = new THREE.Color(hex); return 0.2126 * c.r + 0.7152 * c.g + 0.0722 * c.b; }
export const inkFor = (bg) => (lum(bg) < 0.3 ? INK_LIGHT : NAVY);

// fondo carta con grana; fibers > 0 per la carta avana
export function paperFill(ctx, w, h, base, { grain = 7, fibers = 0 } = {}) {
  ctx.fillStyle = base; ctx.fillRect(0, 0, w, h);
  const img = ctx.getImageData(0, 0, w, h), d = img.data;
  for (let i = 0; i < d.length; i += 4) { const n = (rnd() - 0.5) * grain; d[i] += n; d[i + 1] += n; d[i + 2] += n; }
  ctx.putImageData(img, 0, 0);
  if (fibers) {
    ctx.globalAlpha = 0.07;
    for (let i = 0; i < fibers; i++) {
      const x = rnd() * w, y = rnd() * h, l = 5 + rnd() * 20, a = rnd() * Math.PI;
      ctx.strokeStyle = rnd() > 0.5 ? '#4a2c10' : '#fff2dc'; ctx.lineWidth = 0.5 + rnd();
      ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(a) * l, y + Math.sin(a) * l); ctx.stroke();
    }
    ctx.globalAlpha = 1;
  }
}
export const PAPERS = {
  white: (x, w, h) => paperFill(x, w, h, WHITE, { grain: 5 }),
  kraft: (x, w, h) => paperFill(x, w, h, KRAFT, { grain: 16, fibers: (w * h) / 700 }),
  navy: (x, w, h) => paperFill(x, w, h, NAVY, { grain: 5 }),
  mint: (x, w, h) => paperFill(x, w, h, MINT, { grain: 4 }),
  green: (x, w, h) => paperFill(x, w, h, GREEN, { grain: 5 }),
};
export const solid = (hex, kraftLike = false) => (x, w, h) => paperFill(x, w, h, hex, kraftLike ? { grain: 14, fibers: (w * h) / 900 } : { grain: 5 });

// ------------------------------------------------------------------ marchio
export function symbol(ctx, cx, cy, h, fill) {
  const s = h / SYM_H, w = SYM_W * s;
  ctx.save(); ctx.translate(cx - w / 2, cy - h / 2); ctx.scale(s, s);
  if (fill === 'gradient') { const g = ctx.createLinearGradient(0, 0, SYM_W, 0); g.addColorStop(0, GREEN); g.addColorStop(1, '#fdfefd'); ctx.fillStyle = g; }
  else if (fill === 'gradient-dark') { const g = ctx.createLinearGradient(0, 0, SYM_W, 0); g.addColorStop(0, GREEN); g.addColorStop(1, NAVY); ctx.fillStyle = g; }
  else ctx.fillStyle = fill;
  ctx.fill(SYM); ctx.restore();
}
export function spaced(ctx, text, cx, y, size, color, weight = 500, spacing = 0.3) {
  ctx.font = `${weight} ${size}px Jost`; ctx.fillStyle = color; ctx.textBaseline = 'alphabetic';
  const chars = [...text], sp = size * spacing;
  const total = chars.reduce((a, c) => a + ctx.measureText(c).width, 0) + sp * (chars.length - 1);
  let x = cx - total / 2;
  for (const c of chars) { ctx.fillText(c, x, y); x += ctx.measureText(c).width + sp; }
  return total;
}
// simbolo + WASTE MANAGEMENT + group; width = larghezza della scritta
export function lockup(ctx, cx, cy, width, color, symFill, { group = true } = {}) {
  const size = width / 13.2;
  const symH = width * 0.34;
  symbol(ctx, cx, cy - width * 0.12, symH, symFill || color);
  const tw = spaced(ctx, 'WASTE MANAGEMENT', cx, cy + width * 0.17, size, color, 450, 0.3);
  if (group) { ctx.font = `400 ${size * 0.82}px Jost`; ctx.textAlign = 'right'; ctx.fillStyle = color; ctx.fillText('group', cx + tw / 2, cy + width * 0.17 + size * 1.05); ctx.textAlign = 'left'; }
}
export function pattern(ctx, W, H, color, step, h, alpha = 1, rot = 0) {
  ctx.save(); ctx.globalAlpha = alpha;
  for (let j = 0, y = step / 2; y < H + step; y += step * 0.8, j++)
    for (let xx = (j % 2) * step / 2; xx < W + step; xx += step) {
      if (rot) { ctx.save(); ctx.translate(xx, y); ctx.rotate(rot); symbol(ctx, 0, 0, h, color); ctx.restore(); } else symbol(ctx, xx, y, h, color);
    }
  ctx.restore();
}
// piccolo marchio "sigillo" (simbolo + WASTE) per superfici strette
export function badge(ctx, cx, cy, h, ink, symFill) {
  symbol(ctx, cx, cy - h * 0.12, h * 0.62, symFill || ink);
  spaced(ctx, 'WASTE', cx, cy + h * 0.46, h * 0.16, ink, 500, 0.45);
}

// ------------------------------------------------------------------ texture e materiali
export function tex(c, rx = 1, ry = 1) {
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8;
  if (rx !== 1 || ry !== 1) { t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(rx, ry); }
  return t;
}
// normal map di rumore (grana della carta), condivisa
const NORMALS = {};
function noiseNormal(kind) {
  if (NORMALS[kind]) return NORMALS[kind];
  const N = 512, [c, x] = cnv(N, N); const img = x.createImageData(N, N), d = img.data;
  const hgt = new Float32Array(N * N);
  const amp = kind === 'kraft' ? 1 : kind === 'crumple' ? 1.4 : 0.45;
  for (let i = 0; i < N * N; i++) hgt[i] = rnd();
  if (kind === 'crumple') { // pieghe larghe
    for (let k = 0; k < 18; k++) { const a = rnd() * Math.PI, ox = rnd() * N, oy = rnd() * N; for (let y = 0; y < N; y++) for (let xx = 0; xx < N; xx++) { const dd = (xx - ox) * Math.cos(a) + (y - oy) * Math.sin(a); hgt[y * N + xx] += 1.2 * Math.exp(-dd * dd / 200); } }
  }
  for (let y = 0; y < N; y++) for (let xx = 0; xx < N; xx++) {
    const i = y * N + xx, dx = hgt[y * N + ((xx + 1) % N)] - hgt[i], dy = hgt[((y + 1) % N) * N + xx] - hgt[i];
    const v = new THREE.Vector3(-dx * amp, -dy * amp, 1).normalize();
    d[i * 4] = (v.x * 0.5 + 0.5) * 255; d[i * 4 + 1] = (v.y * 0.5 + 0.5) * 255; d[i * 4 + 2] = (v.z * 0.5 + 0.5) * 255; d[i * 4 + 3] = 255;
  }
  x.putImageData(img, 0, 0);
  const t = new THREE.CanvasTexture(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(3, 3);
  return (NORMALS[kind] = t);
}
export function paperMat(map, { kind = 'white', rough = 0.78, side = THREE.FrontSide, metal = 0, color } = {}) {
  const m = new THREE.MeshStandardMaterial({ map, roughness: rough, metalness: metal, side, normalMap: noiseNormal(kind), normalScale: new THREE.Vector2(kind === 'crumple' ? 0.22 : 0.35, kind === 'crumple' ? 0.22 : 0.35) });
  if (color) m.color = new THREE.Color(color);
  return m;
}
export function plainMat(color, opt = {}) { return new THREE.MeshStandardMaterial({ color, roughness: 0.85, ...opt }); }

// disegna una faccia: paperFn di fondo + draw
export function faceTex(W, H, paperFn, draw, opt = {}) {
  const [c, x] = cnv(W * PX, H * PX); paperFn(x, c.width, c.height); draw && draw(x, c.width, c.height);
  if (opt.edges !== false) { // leggero scurimento ai bordi (piega del cartone)
    const g = 6; x.fillStyle = 'rgba(0,0,0,0.05)'; x.fillRect(0, 0, c.width, g); x.fillRect(0, c.height - g, c.width, g); x.fillRect(0, 0, g, c.height); x.fillRect(c.width - g, 0, g, c.height);
  }
  return tex(c);
}

// UV normalizzate sul bounding box (per ShapeGeometry)
export function normUV(geo) {
  geo.computeBoundingBox(); const b = geo.boundingBox, p = geo.attributes.position, uv = geo.attributes.uv;
  for (let i = 0; i < p.count; i++) uv.setXY(i, (p.getX(i) - b.min.x) / (b.max.x - b.min.x), (p.getY(i) - b.min.y) / (b.max.y - b.min.y));
  uv.needsUpdate = true; return geo;
}

export function shadowAll(o) { o.traverse(m => { if (m.isMesh) { m.castShadow = !m.userData.noShadow; m.receiveShadow = true; } }); return o; }

// ------------------------------------------------------------------ primitive di cartotecnica
// Pannello sottile a due facce (esterno stampato, interno tinta/texture)
export function sheet(w, h, outer, inner, t = 0.06) {
  const g = new THREE.Group();
  const a = new THREE.Mesh(new THREE.PlaneGeometry(w, h), outer);
  const b = new THREE.Mesh(new THREE.PlaneGeometry(w, h), inner); b.rotation.y = Math.PI; b.position.z = -t;
  g.add(a, b); return g;
}
function shapeSheet(shape, outer, inner, t = 0.06) {
  const g = new THREE.Group();
  const geo = normUV(new THREE.ShapeGeometry(shape, 24));
  const a = new THREE.Mesh(geo, outer), b = new THREE.Mesh(geo, inner); b.material = inner.clone(); b.material.side = THREE.BackSide; b.position.z = -t;
  g.add(a, b); return g;
}

// Scatola chiusa arrotondata. faces: {front, back, left, right, top, bottom}: funzioni (ctx,W,H)
export function box(w, h, d, { paper = PAPERS.white, kind = 'white', faces = {}, radius = 0.12, rough = 0.7, lidLine } = {}) {
  const mk = (W, H, draw, isSide) => paperMat(faceTex(W, H, paper, (x, cw, ch) => {
    draw && draw(x, cw, ch);
    if (lidLine && isSide) { x.fillStyle = 'rgba(0,0,0,0.22)'; x.fillRect(0, ch * lidLine, cw, 2); x.fillStyle = 'rgba(255,255,255,0.18)'; x.fillRect(0, ch * lidLine + 2, cw, 2); }
  }), { kind, rough });
  const mats = [mk(d, h, faces.right, 1), mk(d, h, faces.left, 1), mk(w, d, faces.top), mk(w, d, faces.bottom), mk(w, h, faces.front, 1), mk(w, h, faces.back, 1)];
  const m = new THREE.Mesh(new RoundedBoxGeometry(w, h, d, 3, radius), mats); m.position.y = h / 2;
  return shadowAll(new THREE.Group().add(m));
}

// Vassoio aperto: pareti + fondo. walls = {front, back, left, right, inner, bottom}
// wallShape(side) opzionale: THREE.Shape per pareti sagomate (in coordinate x∈[-W/2,W/2], y∈[0,H])
export function tray(w, h, d, { paper = PAPERS.white, kind = 'white', inner = PAPERS.white, faces = {}, heights = {}, shapes = {} } = {}) {
  const g = new THREE.Group();
  const innerMat = (W, H) => paperMat(faceTex(W, H, inner, null), { kind, rough: 0.9 });
  const defs = [
    ['front', w, 0, d / 2, 0], ['back', w, 0, -d / 2, Math.PI], ['right', d, w / 2, 0, Math.PI / 2], ['left', d, -w / 2, 0, -Math.PI / 2],
  ];
  for (const [k, W, x, z, ry] of defs) {
    const H = heights[k] ?? h;
    const outer = paperMat(faceTex(W, H, paper, faces[k]), { kind });
    let p;
    if (shapes[k]) p = shapeSheet(shapes[k](W, H), outer, innerMat(W, H));
    else { p = sheet(W, H, outer, innerMat(W, H)); p.position.y = H / 2; }
    p.position.x = x; p.position.z = z; p.rotation.y = ry; g.add(p);
  }
  const bottom = new THREE.Mesh(new THREE.PlaneGeometry(w, d), paperMat(faceTex(w, d, inner, faces.bottomIn), { kind, rough: 0.9 }));
  bottom.rotation.x = -Math.PI / 2; bottom.position.y = 0.04; g.add(bottom);
  const under = new THREE.Mesh(new THREE.PlaneGeometry(w, d), plainMat('#ccc')); under.rotation.x = Math.PI / 2; under.position.y = 0.01; g.add(under);
  return shadowAll(g);
}

// Coperchio a cerniera sul lato posteriore (vassoio rovesciato), angle in gradi (0 = chiuso)
export function hingedLid(w, hL, d, angle, { paper = PAPERS.white, kind = 'white', inner = PAPERS.white, top, sides = {}, lip = 0.12 } = {}) {
  const W = w + lip, D = d + lip;
  const pivot = new THREE.Group();
  const lid = new THREE.Group();
  const topMesh = sheet(W, D, paperMat(faceTex(W, D, paper, top), { kind }), paperMat(faceTex(W, D, inner, null), { kind, rough: 0.9 }));
  topMesh.rotation.x = -Math.PI / 2; topMesh.position.set(0, 0, D / 2); lid.add(topMesh);
  const walls = [['front', W, 0, D, 0], ['right', D, W / 2, D / 2, Math.PI / 2], ['left', D, -W / 2, D / 2, -Math.PI / 2], ['back', W, 0, 0, Math.PI]];
  for (const [k, L, x, z, ry] of walls) {
    const p = sheet(L, hL, paperMat(faceTex(L, hL, paper, sides[k]), { kind }), paperMat(faceTex(L, hL, inner, null), { kind, rough: 0.9 }));
    p.position.set(x, -hL / 2, z); p.rotation.y = ry; lid.add(p);
  }
  pivot.add(lid); pivot.rotation.x = -THREE.MathUtils.degToRad(angle);
  return shadowAll(pivot);
}

// Tronco di piramide a base rettangolare (aperto sopra) — porta pollo, noodle, food box
export function frustum(wb, db, wt, dt, h, { paper = PAPERS.white, kind = 'white', inner = PAPERS.white, faces = {}, closedTop = false } = {}) {
  const g = new THREE.Group();
  const quad = (a, b, c, dd, mat) => { // quadrilatero suddiviso: niente distorsione della grafica sui trapezi
    const geo = new THREE.PlaneGeometry(1, 1, 16, 16), p = geo.attributes.position, uv = geo.attributes.uv;
    for (let i = 0; i < p.count; i++) {
      const u = uv.getX(i), v = uv.getY(i);
      for (let k = 0; k < 3; k++) p.setComponent(i, k, (a[k] * (1 - u) + b[k] * u) * (1 - v) + (dd[k] * (1 - u) + c[k] * u) * v);
    }
    geo.computeVertexNormals(); return new THREE.Mesh(geo, mat);
  };
  const B = [[-wb / 2, 0, db / 2], [wb / 2, 0, db / 2], [wb / 2, 0, -db / 2], [-wb / 2, 0, -db / 2]];
  const T = [[-wt / 2, h, dt / 2], [wt / 2, h, dt / 2], [wt / 2, h, -dt / 2], [-wt / 2, h, -dt / 2]];
  const sides = [['front', 0, 1, (wb + wt) / 2], ['right', 1, 2, (db + dt) / 2], ['back', 2, 3, (wb + wt) / 2], ['left', 3, 0, (db + dt) / 2]];
  for (const [k, i, j, W] of sides) {
    const outer = paperMat(faceTex(W, h, paper, faces[k]), { kind }); outer.side = THREE.FrontSide;
    const innerM = paperMat(faceTex(W, h, inner, null), { kind, rough: 0.9 }); innerM.side = THREE.BackSide;
    g.add(quad(B[i], B[j], T[j], T[i], outer), quad(B[i], B[j], T[j], T[i], innerM));
  }
  const bottom = new THREE.Mesh(new THREE.PlaneGeometry(wb, db), paperMat(faceTex(wb, db, inner, null), { kind })); bottom.rotation.x = -Math.PI / 2; bottom.position.y = 0.04; g.add(bottom);
  if (closedTop) { const top = new THREE.Mesh(new THREE.PlaneGeometry(wt, dt), paperMat(faceTex(wt, dt, paper, faces.top), { kind })); top.rotation.x = -Math.PI / 2; top.position.y = h; g.add(top); }
  return shadowAll(g);
}

// Bauletto: base + falde a tetto + pannello maniglia con asola
export function gable(w, h, d, roof, handleH, { paper = PAPERS.white, kind = 'white', faces = {}, handleDraw, gableDraw } = {}) {
  const g = box(w, h, d, { paper, kind, faces: { ...faces, top: null }, radius: 0.08 });
  const L = Math.hypot(roof, d / 2 - 0.25);
  const ang = Math.atan2(roof, d / 2 - 0.25);
  for (const s of [1, -1]) {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, L), paperMat(faceTex(w, L, paper, s > 0 ? faces.roofFront : faces.roofBack), { kind, side: THREE.DoubleSide }));
    m.rotation.order = 'YXZ'; m.rotation.y = s > 0 ? 0 : Math.PI; m.rotation.x = -(Math.PI / 2 - ang);
    m.position.set(0, h + roof / 2, s * (d / 2 - 0.25) / 2 + s * 0.12); g.add(m);
  }
  // timpani laterali
  for (const s of [1, -1]) {
    const sh = new THREE.Shape([new THREE.Vector2(-d / 2, 0), new THREE.Vector2(d / 2, 0), new THREE.Vector2(0.25, roof), new THREE.Vector2(-0.25, roof)]);
    const geo = normUV(new THREE.ShapeGeometry(sh));
    const m = new THREE.Mesh(geo, paperMat(faceTex(d, roof, paper, gableDraw), { kind, side: THREE.DoubleSide }));
    m.rotation.y = s * Math.PI / 2; m.position.set(s * w / 2, h, 0); g.add(m);
  }
  // pannello maniglia (doppio strato) con asola
  const hw = w, hh = roof + handleH;
  const shape = new THREE.Shape();
  const r = Math.min(2.2, handleH * 0.6);
  shape.moveTo(-hw / 2, 0); shape.lineTo(hw / 2, 0); shape.lineTo(hw / 2, hh - r); shape.quadraticCurveTo(hw / 2, hh, hw / 2 - r, hh);
  shape.lineTo(-hw / 2 + r, hh); shape.quadraticCurveTo(-hw / 2, hh, -hw / 2, hh - r); shape.closePath();
  const hole = new THREE.Path(); const ow = Math.min(hw * 0.32, 5.5), oh = Math.min(handleH * 0.42, 1.6), oy = roof + handleH * 0.5;
  hole.absellipse(0, oy, ow / 2, oh / 2, 0, Math.PI * 2, false); shape.holes.push(hole);
  const geo = normUV(new THREE.ShapeGeometry(shape, 32));
  const mat = paperMat(faceTex(hw, hh, paper, handleDraw), { kind, side: THREE.DoubleSide });
  for (const z of [0.12, -0.12]) { const m = new THREE.Mesh(geo, mat); m.position.set(0, h, z); g.add(m); }
  return shadowAll(g);
}

// Fascia scorrevole (sleeve) attorno a una scatola: 4 lati, aperta ai lati x
export function sleeve(w, h, d, { paper = PAPERS.navy, kind = 'white', faces = {} } = {}) {
  const g = new THREE.Group(); const t = 0.08;
  const top = new THREE.Mesh(new THREE.PlaneGeometry(w, d + t * 2), paperMat(faceTex(w, d, paper, faces.top), { kind })); top.rotation.x = -Math.PI / 2; top.position.y = h + t; g.add(top);
  const bot = new THREE.Mesh(new THREE.PlaneGeometry(w, d + t * 2), paperMat(faceTex(w, d, paper, null), { kind })); bot.rotation.x = Math.PI / 2; bot.position.y = -0.0; g.add(bot);
  for (const s of [1, -1]) { const f = new THREE.Mesh(new THREE.PlaneGeometry(w, h + t), paperMat(faceTex(w, h, paper, s > 0 ? faces.front : faces.back), { kind })); f.position.set(0, (h + t) / 2, s * (d / 2 + t)); if (s < 0) f.rotation.y = Math.PI; g.add(f); }
  return shadowAll(g);
}

// ------------------------------------------------------------------ bicchiere, bowl, cono
export function cup({ rTop = 4, rBot = 2.7, h = 9.4, print, lid = true, lidColor = '#f2f2ef', turn = -0.8 }) {
  const g = new THREE.Group();
  const [c, x] = cnv(Math.PI * 2 * rTop * PX, h * PX); print(x, c.width, c.height);
  const side = new THREE.Mesh(new THREE.CylinderGeometry(rTop, rBot, h, 96, 1, true), paperMat(tex(c), { kind: 'white', rough: 0.5 })); side.position.y = h / 2; side.rotation.y = turn; g.add(side);
  const inner = new THREE.Mesh(new THREE.CylinderGeometry(rTop - 0.02, rBot - 0.02, h, 64, 1, true), plainMat('#efece5', { side: THREE.BackSide })); inner.position.y = h / 2; g.add(inner);
  const bottom = new THREE.Mesh(new THREE.CircleGeometry(rBot, 48), plainMat('#e6e2da')); bottom.rotation.x = -Math.PI / 2; bottom.position.y = 0.5; g.add(bottom);
  const rim = new THREE.Mesh(new THREE.TorusGeometry(rTop, 0.13, 12, 96), plainMat('#f5f4f0', { roughness: 0.5 })); rim.rotation.x = Math.PI / 2; rim.position.y = h; g.add(rim);
  if (lid) {
    const prof = [[0, 0.95], [rTop * 0.5, 0.95], [rTop * 0.58, 0.62], [rTop * 0.88, 0.56], [rTop + 0.14, 0.4], [rTop + 0.26, 0.08], [rTop + 0.22, -0.5], [rTop + 0.02, -0.56]].map(([r, y]) => new THREE.Vector2(r, y));
    const l = new THREE.Mesh(new THREE.LatheGeometry(prof, 96), new THREE.MeshPhysicalMaterial({ color: lidColor, roughness: 0.32, clearcoat: 0.5, side: THREE.DoubleSide }));
    l.position.y = h + 0.1; g.add(l);
    const hole = new THREE.Mesh(new THREE.CapsuleGeometry(0.32, 0.9, 6, 12), plainMat('#1a1a1a')); hole.rotation.z = Math.PI / 2; hole.scale.set(1, 1, 0.3); hole.position.set(rTop * 0.72, h + 0.66, 0); g.add(hole);
  }
  return shadowAll(g);
}

export function bowl({ rTop = 7.8, rBot = 5.6, h = 6.2, print, food = true, lid = true, turn = -0.6 }) {
  const g = new THREE.Group();
  const [c, x] = cnv(Math.PI * 2 * rTop * PX, h * PX); print(x, c.width, c.height);
  const side = new THREE.Mesh(new THREE.CylinderGeometry(rTop, rBot, h, 96, 1, true), paperMat(tex(c), { kind: 'kraft', rough: 0.8 })); side.position.y = h / 2; side.rotation.y = turn; g.add(side);
  const inn = new THREE.Mesh(new THREE.CylinderGeometry(rTop - .03, rBot - .03, h, 64, 1, true), plainMat('#b48a5f', { side: THREE.BackSide })); inn.position.y = h / 2; g.add(inn);
  const rim = new THREE.Mesh(new THREE.TorusGeometry(rTop, 0.12, 10, 96), plainMat('#c09468')); rim.rotation.x = Math.PI / 2; rim.position.y = h; g.add(rim);
  if (food) g.add(salad(rTop - 0.5, h - 1.2));
  if (lid) {
    const cover = new THREE.Mesh(new THREE.SphereGeometry(rTop + 0.15, 96, 24, 0, Math.PI * 2, 0, Math.PI / 2),
      new THREE.MeshPhysicalMaterial({ color: 0xffffff, transmission: 1, roughness: 0.03, thickness: 0.15, ior: 1.45, transparent: true, opacity: 0.32, clearcoat: 1, specularIntensity: 1 }));
    cover.scale.y = 0.3; cover.position.y = h; cover.userData.noShadow = true; g.add(cover);
    const ring = new THREE.Mesh(new THREE.TorusGeometry(rTop + 0.12, 0.2, 12, 96), new THREE.MeshPhysicalMaterial({ color: 0xffffff, transmission: 1, roughness: 0.08, transparent: true, opacity: 0.45 }));
    ring.rotation.x = Math.PI / 2; ring.position.y = h; ring.userData.noShadow = true; g.add(ring);
  }
  return shadowAll(g);
}

// ------------------------------------------------------------------ cibo (contenuti)
const food = (c, r = 0.6) => new THREE.MeshStandardMaterial({ color: c, roughness: r });
export function fries(w, d, n = 38, hMin = 5, hMax = 9, spread = 1) {
  const g = new THREE.Group();
  for (let i = 0; i < n; i++) {
    const h = hMin + rnd() * (hMax - hMin);
    const m = new THREE.Mesh(new THREE.BoxGeometry(0.75, h, 0.75), food(new THREE.Color().setHSL(0.105 + rnd() * 0.02, 0.85, 0.5 + rnd() * 0.08), 0.5));
    m.position.set((rnd() - 0.5) * w * spread, h / 2 - 0.5, (rnd() - 0.5) * d * spread); m.rotation.set((rnd() - 0.5) * 0.5, rnd() * 3, (rnd() - 0.5) * 0.5); g.add(m);
  }
  return shadowAll(g);
}
export function nuggets(w, d, n = 10, y = 0) {
  const g = new THREE.Group();
  for (let i = 0; i < n; i++) {
    const m = new THREE.Mesh(new THREE.DodecahedronGeometry(1.2 + rnd() * 0.5, 1), food(new THREE.Color().setHSL(0.075 + rnd() * 0.02, 0.72, 0.38 + rnd() * 0.07), 0.85));
    m.scale.set(1.2, 0.7, 1); m.position.set((rnd() - 0.5) * w, y + rnd() * 1.4, (rnd() - 0.5) * d); m.rotation.set(rnd() * 3, rnd() * 3, rnd() * 3); g.add(m);
  }
  return shadowAll(g);
}
export function burger(r = 5) {
  const g = new THREE.Group(); let y = 0;
  const layer = (geo, mat, h) => { const m = new THREE.Mesh(geo, mat); m.position.y = y + h / 2; g.add(m); y += h; return m; };
  layer(new THREE.CylinderGeometry(r, r * 0.95, 1.4, 48), food('#c98a45', 0.7), 1.4);
  layer(new THREE.CylinderGeometry(r * 1.03, r * 1.03, 1.3, 48), food('#4a2a1a', 0.9), 1.3);
  const ch = layer(new THREE.BoxGeometry(r * 1.9, 0.18, r * 1.9), food('#f2b632', 0.5), 0.18); ch.rotation.y = 0.5;
  const let_ = layer(new THREE.CylinderGeometry(r * 1.08, r * 1.08, 0.35, 20), food('#6aa336', 0.7), 0.35);
  layer(new THREE.CylinderGeometry(r * 0.98, r * 0.98, 0.45, 32), food('#c9362c', 0.6), 0.45);
  const top = new THREE.Mesh(new THREE.SphereGeometry(r, 48, 24, 0, Math.PI * 2, 0, Math.PI / 2), food('#c47a35', 0.55)); top.scale.y = 0.62; top.position.y = y; g.add(top);
  for (let i = 0; i < 28; i++) { const a = rnd() * Math.PI * 2, rr = rnd() * r * 0.8; const s = new THREE.Mesh(new THREE.SphereGeometry(0.14, 6, 4), food('#f3e2b8')); s.scale.set(1.6, 0.6, 1); const yy = y + Math.sqrt(Math.max(0, r * r - rr * rr)) * 0.62; s.position.set(Math.cos(a) * rr, yy, Math.sin(a) * rr); g.add(s); }
  return shadowAll(g);
}
export function hotdog(len = 16) {
  const g = new THREE.Group();
  for (const s of [1, -1]) { const b = new THREE.Mesh(new THREE.CapsuleGeometry(1.35, len - 2.7, 8, 24), food('#d09250', 0.7)); b.rotation.z = Math.PI / 2; b.scale.set(1, 1, 0.9); b.position.set(0, 1.35, s * 1.0); g.add(b); }
  const w = new THREE.Mesh(new THREE.CapsuleGeometry(0.95, len - 0.4, 8, 24), food('#9b3a22', 0.45)); w.rotation.z = Math.PI / 2; w.position.set(0, 2.1, 0); g.add(w);
  const mus = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(Array.from({ length: 14 }, (_, i) => new THREE.Vector3(-len / 2 + 1.5 + i * (len - 3) / 13, 3.0, Math.sin(i * 1.3) * 0.5))), 80, 0.22, 8), food('#f2c230', 0.4)); g.add(mus);
  return shadowAll(g);
}
export function pastries(w, d, rows = 3, cols = 4, y = 0) {
  const g = new THREE.Group(); const cols_ = ['#f2d7b6', '#6b3b24', '#e8a0a8', '#f5efe4', '#c98a45', '#f0c64a'];
  for (let i = 0; i < rows; i++) for (let j = 0; j < cols; j++) {
    const px = -w / 2 + w / cols * (j + 0.5), pz = -d / 2 + d / rows * (i + 0.5);
    const base = new THREE.Mesh(new THREE.CylinderGeometry(w / cols * 0.36, w / cols * 0.4, 1.4, 24), food('#d8a560', 0.8)); base.position.set(px, y + 0.7, pz); g.add(base);
    const top = new THREE.Mesh(new THREE.SphereGeometry(w / cols * 0.34, 20, 12, 0, Math.PI * 2, 0, Math.PI / 2), food(cols_[(i * cols + j) % cols_.length], 0.45)); top.scale.y = 0.7; top.position.set(px, y + 1.4, pz); g.add(top);
    if ((i + j) % 2 === 0) { const b = new THREE.Mesh(new THREE.SphereGeometry(0.35, 12, 8), food('#c0182d', 0.3)); b.position.set(px, y + 1.4 + w / cols * 0.24, pz); g.add(b); }
  }
  return shadowAll(g);
}
export function sushi(w, d, rows = 2, cols = 4, y = 0) {
  const g = new THREE.Group();
  for (let i = 0; i < rows; i++) for (let j = 0; j < cols; j++) {
    const px = -w / 2 + w / cols * (j + 0.5), pz = -d / 2 + d / rows * (i + 0.5), r = Math.min(w / cols, d / rows) * 0.4;
    const nori = new THREE.Mesh(new THREE.CylinderGeometry(r, r, 2.2, 32), food('#1d2a22', 0.5)); nori.position.set(px, y + 1.1, pz); g.add(nori);
    const rice = new THREE.Mesh(new THREE.CylinderGeometry(r * 0.86, r * 0.86, 0.05, 32), food('#f7f4ec', 0.9)); rice.position.set(px, y + 2.21, pz); g.add(rice);
    const fish = new THREE.Mesh(new THREE.CylinderGeometry(r * 0.4, r * 0.4, 0.08, 20), food((i + j) % 2 ? '#f07a4a' : '#6db36b', 0.4)); fish.position.set(px, y + 2.24, pz); g.add(fish);
  }
  return shadowAll(g);
}
export function salad(r, y) {
  const [fc, fx] = cnv(1024, 1024); fx.fillStyle = '#6f9a3a'; fx.fillRect(0, 0, 1024, 1024);
  const cols = ['#8fbf4a', '#5c8a2c', '#b7d86a', '#d94a3a', '#f2c14e', '#f6efe0', '#3f6b22', '#e8793a'];
  for (let i = 0; i < 1400; i++) { fx.fillStyle = cols[i % cols.length]; fx.beginPath(); fx.ellipse(rnd() * 1024, rnd() * 1024, 10 + rnd() * 38, 8 + rnd() * 24, rnd() * 3, 0, 7); fx.fill(); }
  const m = new THREE.Mesh(new THREE.SphereGeometry(r, 64, 24, 0, Math.PI * 2, 0, Math.PI / 2), new THREE.MeshStandardMaterial({ map: tex(fc), roughness: 0.6 }));
  m.scale.y = 0.2; m.position.y = y; return m;
}
export function bottle(h = 32, r = 3.6, color = '#27402d') {
  const prof = [[0, 0], [r, 0], [r, h * 0.62], [r * 0.95, h * 0.68], [r * 0.4, h * 0.8], [r * 0.36, h * 0.97], [r * 0.4, h], [0, h]].map(([a, b]) => new THREE.Vector2(a, b));
  const m = new THREE.Mesh(new THREE.LatheGeometry(prof, 48), new THREE.MeshPhysicalMaterial({ color, roughness: 0.15, clearcoat: 1, metalness: 0.1 }));
  return shadowAll(new THREE.Group().add(m));
}
