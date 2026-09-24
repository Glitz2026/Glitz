// Un modello 3D per ogni linea di packaging del catalogo, con il marchio Waste Management.
import * as THREE from 'three';
import * as L from './lib.js';
const { NAVY, GREEN, MINT, WHITE, INK_LIGHT, PAPERS, lockup, symbol, badge, spaced, pattern } = L;

// ------------------------------------------------------------------ kit grafici (sempre gli stessi)
export const KIT = {
  white: { paper: PAPERS.white, kind: 'white', ink: NAVY, sym: NAVY, accent: GREEN, inner: PAPERS.white },
  kraft: { paper: PAPERS.kraft, kind: 'kraft', ink: NAVY, sym: NAVY, accent: NAVY, inner: PAPERS.kraft },
  navy: { paper: PAPERS.navy, kind: 'white', ink: INK_LIGHT, sym: 'gradient', accent: GREEN, inner: PAPERS.white },
  mint: { paper: PAPERS.mint, kind: 'white', ink: NAVY, sym: NAVY, accent: GREEN, inner: PAPERS.white },
};
// decorazioni riutilizzabili
const D = {
  lock: (k, s = 0.62, dy = 0) => (x, W, H) => lockup(x, W / 2, H * (0.5 + dy), Math.min(W * s, H * s * 1.5), k.ink, k.sym),
  sym: (k, s = 0.5, dy = 0) => (x, W, H) => symbol(x, W / 2, H * (0.5 + dy), Math.min(W, H) * s, k.sym === 'gradient' ? 'gradient' : k.ink),
  badge: (k, s = 0.6) => (x, W, H) => badge(x, W / 2, H / 2, Math.min(W, H) * s, k.ink, k.sym),
  band: (k, frac = 0.3, text = 'WASTE MANAGEMENT') => (x, W, H) => { x.fillStyle = k === KIT.navy ? GREEN : NAVY; x.fillRect(0, H * (1 - frac), W, H * frac); spaced(x, text, W / 2, H * (1 - frac / 2) + H * 0.035, Math.min(H * frac * 0.28, W * 0.05), k === KIT.navy ? NAVY : INK_LIGHT, 500, 0.32); },
  diffuse: (k, step = 120, h = 36, a = 0.9) => (x, W, H) => pattern(x, W, H, k === KIT.navy ? GREEN : k === KIT.kraft ? NAVY : GREEN, step, h, a),
  line: (k, y = 0.25) => (x, W, H) => { x.fillStyle = k.accent; x.fillRect(0, H * y, W, 5); },
  both: (...fs) => (x, W, H) => fs.forEach(f => f && f(x, W, H)),
  lockOnDiffuse: (k, s = 0.36) => (x, W, H) => { pattern(x, W, H, GREEN, 150, 44, 0.85); const pw = Math.min(W, H) * s * 1.9; x.fillStyle = k === KIT.navy ? '#0a2a39' : WHITE; x.fillRect(W / 2 - pw / 2, H / 2 - pw * 0.34, pw, pw * 0.68); lockup(x, W / 2, H / 2, pw * 0.8, k.ink, k.sym); },
};

function faces(k, { top, front, back, left, right } = {}) { return { top, front, back: back ?? front, left, right: right ?? left }; }
const G = () => new THREE.Group();
const at = (o, x = 0, y = 0, z = 0, ry = 0) => { o.position.set(x, y, z); o.rotation.y = ry; return o; };

// scatola chiusa con coperchio a filo
function lidBox(w, h, d, k, deco = {}, lidFrac = 0.28) {
  return L.box(w, h, d, { paper: k.paper, kind: k.kind, faces: faces(k, deco), lidLine: lidFrac, radius: 0.12 });
}
// vassoio + coperchio a cerniera
function clam(w, h, d, hL, angle, k, { top, sides, frontLow = 0, inside, innerK } = {}) {
  const g = G();
  const t = L.tray(w, h, d, { paper: k.paper, kind: k.kind, inner: (innerK || k).inner, faces: { front: sides, left: sides, right: sides, back: sides } });
  g.add(t);
  const lid = L.hingedLid(w, hL, d, angle, { paper: k.paper, kind: k.kind, inner: (innerK || k).inner, top, sides: { front: sides, left: sides, right: sides } });
  lid.position.set(0, h, -d / 2 - 0.06); g.add(lid);
  if (inside) g.add(inside);
  return g;
}
// parete sagomata con punta (porta panino a fiore)
const petal = (W, H) => { const s = new THREE.Shape(); s.moveTo(-W / 2, 0); s.lineTo(W / 2, 0); s.lineTo(W / 2, H * 0.62); s.lineTo(0, H); s.lineTo(-W / 2, H * 0.62); s.closePath(); return s; };
// parete frontale bassa con scollo curvo (porta fritti / patatine)
const scoopFront = (low) => (W, H) => { const s = new THREE.Shape(); s.moveTo(-W / 2, 0); s.lineTo(W / 2, 0); s.lineTo(W / 2, H); s.quadraticCurveTo(0, H * low, -W / 2, H); s.closePath(); return s; };
const slopeSide = (fr) => (W, H) => { const s = new THREE.Shape(); s.moveTo(-W / 2, 0); s.lineTo(W / 2, 0); s.lineTo(W / 2, H * fr); s.lineTo(-W / 2, H); s.closePath(); return s; };

// cono (porta fritti / crêpes) sdraiato
function cone(len, wTop, k, deco, contents) {
  const g = G();
  const [c, x] = L.cnv(Math.PI * wTop * L.PX, len * L.PX); k.paper(x, c.width, c.height); deco && deco(x, c.width, c.height);
  const geo = new THREE.CylinderGeometry(wTop / 2, 0.25, len, 64, 1, true);
  const m = new THREE.Mesh(geo, L.paperMat(L.tex(c), { kind: k.kind, side: THREE.DoubleSide }));
  m.scale.z = 0.42; const inner = G().add(m); if (contents) { contents.position.y = len / 2 - 3; inner.add(contents); }
  inner.rotation.z = Math.PI / 2 - 0.12; inner.position.set(0, wTop * 0.21 + 0.1, 0);
  g.add(inner); return L.shadowAll(g);
}
// maniglia metallica (noodle)
function wire(w, y, hh) {
  const c = new THREE.CatmullRomCurve3([new THREE.Vector3(-w / 2 - .05, y - 1, 0), new THREE.Vector3(-w / 2.3, y + hh * 0.66, 0), new THREE.Vector3(0, y + hh, 0), new THREE.Vector3(w / 2.3, y + hh * 0.66, 0), new THREE.Vector3(w / 2 + .05, y - 1, 0)]);
  return new THREE.Mesh(new THREE.TubeGeometry(c, 80, 0.09, 8), new THREE.MeshStandardMaterial({ color: '#c9ccd0', metalness: 1, roughness: 0.25 }));
}
// scatola a tronco con falde chiuse (noodle, food box)
function pail(wb, db, wt, dt, h, k, deco) {
  const g = L.frustum(wb, db, wt, dt, h, { paper: k.paper, kind: k.kind, inner: k.inner, faces: { front: deco, back: deco, left: deco, right: deco } });
  for (const s of [1, -1]) {
    const f = new THREE.Mesh(new THREE.PlaneGeometry(wt, dt * 0.62), L.paperMat(L.faceTex(wt, dt * 0.62, k.paper, null), { kind: k.kind, side: THREE.DoubleSide }));
    f.position.set(0, h + dt * 0.2, s * dt * 0.17); f.rotation.x = -s * 1.0; g.add(f);
  }
  return L.shadowAll(g);
}
// scatola con finestra sul coperchio
function windowBox(w, h, d, k, inside, deco) {
  const g = G();
  g.add(L.tray(w, h, d, { paper: k.paper, kind: k.kind, inner: k.inner, faces: { front: deco, back: deco, left: deco, right: deco } }));
  const sh = new THREE.Shape([new THREE.Vector2(-w / 2, -d / 2), new THREE.Vector2(w / 2, -d / 2), new THREE.Vector2(w / 2, d / 2), new THREE.Vector2(-w / 2, d / 2)]);
  const hole = new THREE.Path(); hole.moveTo(-w * 0.3, -d * 0.3); hole.lineTo(w * 0.3, -d * 0.3); hole.lineTo(w * 0.3, d * 0.3); hole.lineTo(-w * 0.3, d * 0.3); hole.closePath(); sh.holes.push(hole);
  const geo = L.normUV(new THREE.ShapeGeometry(sh));
  const top = new THREE.Mesh(geo, L.paperMat(L.faceTex(w, d, k.paper, (x, W, H) => { symbol(x, W / 2, H * 0.91, H * 0.07, k.sym === 'gradient' ? 'gradient' : k.ink); spaced(x, 'WASTE MANAGEMENT', W / 2, H * 0.12, H * 0.035, k.ink, 500, 0.3); }), { kind: k.kind, side: THREE.DoubleSide }));
  top.rotation.x = -Math.PI / 2; top.position.y = h; g.add(top);
  const film = new THREE.Mesh(new THREE.PlaneGeometry(w * 0.62, d * 0.62), new THREE.MeshPhysicalMaterial({ transmission: 1, roughness: 0.05, transparent: true, opacity: 0.25, clearcoat: 1 }));
  film.rotation.x = -Math.PI / 2; film.position.y = h - 0.02; film.userData.noShadow = true; g.add(film);
  if (inside) g.add(inside);
  return L.shadowAll(g);
}
function taco() {
  const half = (r) => { const sh = new THREE.Shape(); sh.moveTo(-r, 0); sh.absarc(0, 0, r, Math.PI, 2 * Math.PI, false); sh.lineTo(-r, 0); return sh; };
  const shell = new THREE.Mesh(new THREE.ExtrudeGeometry(half(3.3), { depth: 1.8, bevelEnabled: true, bevelSize: 0.1, bevelThickness: 0.1 }), new THREE.MeshStandardMaterial({ color: '#e2ad45', roughness: 0.75 }));
  const fill = new THREE.Mesh(new THREE.ExtrudeGeometry(half(2.9), { depth: 1.2, bevelEnabled: false }), new THREE.MeshStandardMaterial({ color: '#7a9a3a', roughness: 0.8 }));
  fill.position.set(0, 0.45, 0.3);
  const red = new THREE.Mesh(new THREE.BoxGeometry(4.6, 0.4, 1.0), new THREE.MeshStandardMaterial({ color: '#c9362c', roughness: 0.6 })); red.position.set(0, 0.35, 0.9);
  const g = G().add(shell, fill, red); g.position.y = 3.4; g.children.forEach(c => { c.position.z -= 0.9; });
  return L.shadowAll(G().add(g));
}
function wrap(h = 14) {
  const m = new THREE.Mesh(new THREE.CylinderGeometry(3.1, 3.1, h, 32), new THREE.MeshStandardMaterial({ color: '#ecd3a0', roughness: 0.85 }));
  m.scale.z = 0.7; m.position.y = h / 2;
  const f = new THREE.Mesh(new THREE.SphereGeometry(3.0, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2), new THREE.MeshStandardMaterial({ color: '#6f9a3a', roughness: 0.8 })); f.scale.set(1, 0.4, 0.7); f.position.y = h;
  return L.shadowAll(G().add(m, f));
}
function cakeSlice() {
  const sh = new THREE.Shape([new THREE.Vector2(0, 0), new THREE.Vector2(6, 2.2), new THREE.Vector2(6, -2.2)]);
  const m = new THREE.Mesh(new THREE.ExtrudeGeometry(sh, { depth: 3.6, bevelEnabled: false }), new THREE.MeshStandardMaterial({ color: '#f2e2c4', roughness: 0.8 }));
  m.rotation.x = -Math.PI / 2; return m;
}
function prism(len, base, h, k, deco) { // porta fetta di torta
  const g = G();
  const sh = new THREE.Shape([new THREE.Vector2(0, -base / 2), new THREE.Vector2(len, 0), new THREE.Vector2(0, base / 2)]);
  const geo = new THREE.ExtrudeGeometry(sh, { depth: h, bevelEnabled: true, bevelThickness: 0.08, bevelSize: 0.08, bevelSegments: 2 });
  const [c, x] = L.cnv(len * L.PX * 2, len * L.PX * 2); k.paper(x, c.width, c.height); deco && deco(x, c.width, c.height);
  const t = L.tex(c); t.repeat.set(1 / (len * 1.05), 1 / (len * 1.05)); t.offset.set(0.02, 0.5);
  const m = new THREE.Mesh(geo, [L.paperMat(t, { kind: k.kind }), L.paperMat(L.faceTex(4, 4, k.paper, null), { kind: k.kind })]);
  m.rotation.x = -Math.PI / 2; g.add(m); return L.shadowAll(g);
}

// tazze per il porta bicchieri
const cupPrint = (k) => (x, W, H) => { PAPERS.white(x, W, H); x.fillStyle = NAVY; x.fillRect(0, H * 0.64, W, H * 0.36); x.fillStyle = GREEN; x.fillRect(0, H * 0.64, W, 7); for (const q of [0.25, 0.75]) { symbol(x, W * q, H * 0.36, H * 0.26, NAVY); spaced(x, 'WASTE', W * q, H * 0.85, H * 0.075, INK_LIGHT, 500, 0.4); } };
const cupMint = (x, W, H) => { PAPERS.mint(x, W, H); pattern(x, W, H, GREEN, 150, 46, 0.9); };
const bowlPrint = (x, W, H) => { PAPERS.kraft(x, W, H); for (const q of [0.25, 0.75]) { symbol(x, W * q, H * 0.42, H * 0.44, NAVY); spaced(x, 'WASTE MANAGEMENT', W * q, H * 0.86, H * 0.075, NAVY, 500, 0.3); } };

// ------------------------------------------------------------------ catalogo prodotti (id → [builder, camera])
const k = KIT;
export const PRODUCTS = {
  // Porta panini
  PP01: [() => clam(13, 3.6, 13, 3.8, 32, k.navy, { top: D.lock(k.navy, 0.55), sides: D.line(k.navy, 0.3), innerK: k.white, inside: at(L.burger(4.6), 0, 0.05, 0.6) }), 'az=26&el=30'],
  PP02: [() => { const g = L.tray(15, 9.5, 15, { paper: k.white.paper, inner: k.white.inner, faces: { front: D.both(D.sym(k.white, 0.36, 0.1)), back: D.sym(k.white, 0.36, 0.1), left: D.sym(k.white, 0.36, 0.1), right: D.sym(k.white, 0.36, 0.1) }, shapes: { front: petal, back: petal, left: petal, right: petal } }); g.add(at(L.burger(5.4), 0, 0.3, 0)); return g; }, 'az=30&el=30'],
  PP03: [() => { const g = lidBox(15, 10, 15, k.kraft, { top: D.lock(k.kraft, 0.6), front: (x, W, H) => spaced(x, 'WASTE MANAGEMENT', W / 2, H * 0.7, H * 0.07, NAVY, 500, 0.3), left: D.sym(k.kraft, 0.36, 0.1) }, 0.3); const tab = new THREE.Mesh(new THREE.CylinderGeometry(1.4, 1.4, 0.06, 32, 1, false, 0, Math.PI), L.plainMat('#a47a4f')); tab.rotation.set(Math.PI / 2, 0, 0); tab.position.set(0, 7, 7.53); g.add(tab); return g; }, 'az=28&el=30'],
  PP04: [() => { const g = L.tray(10, 8, 5.5, { paper: k.navy.paper, inner: k.white.inner, faces: { front: D.sym(k.navy, 0.42, 0.12), back: D.sym(k.navy, 0.42, 0.1) }, shapes: { front: scoopFront(0.35), left: slopeSide(0.45), right: slopeSide(0.45) }, heights: {} }); const b = L.burger(3.3); b.position.set(0, 2.6, 0); b.rotation.x = 0.35; g.add(b); return g; }, 'az=24&el=22'],
  // Porta fritti & street food
  SF01: [() => clam(14.5, 3.4, 14.5, 3.2, 62, k.white, { top: D.lock(k.white, 0.55), sides: D.band(k.white, 0.45, 'WASTE'), inside: L.nuggets(10, 10, 12, 0.6) }), 'az=24&el=34'],
  SF02: [() => { const g = L.tray(14.5, 4.5, 8.5, { paper: k.navy.paper, inner: k.white.inner, faces: { front: D.lock(k.navy, 0.5), back: D.sym(k.navy, 0.4), left: D.sym(k.navy, 0.4), right: D.sym(k.navy, 0.4) } }); g.add(L.fries(12, 6.5, 34, 3, 6, 1)); return g; }, 'az=22&el=32'],
  SF03: [() => pail(8.2, 6.3, 12.5, 9, 6.5, k.white, D.both(D.sym(k.white, 0.4, -0.02), D.line(k.white, 0.86))), 'az=24&el=24'],
  SF04: [() => L.gable(12.5, 7, 12.5, 3, 2.6, { paper: k.kraft.paper, kind: 'kraft', faces: { front: D.lock(k.kraft, 0.62, 0.02), back: D.lock(k.kraft, 0.62), left: D.sym(k.kraft, 0.4), right: D.sym(k.kraft, 0.4) } }), 'az=26&el=22'],
  SF05: [() => { const g = L.frustum(6.2, 6.2, 8.8, 8.8, 13.5, { paper: k.white.paper, inner: k.white.inner, faces: { front: D.both(D.badge(k.white, 0.55), D.line(k.white, 0.9)), back: D.badge(k.white, 0.55), left: D.line(k.white, 0.9), right: D.line(k.white, 0.9) } }); g.add(at(L.nuggets(6, 6, 10, 12.3))); return g; }, 'az=24&el=22'],
  SF06: [() => clam(20, 2.6, 14, 2.4, 70, k.navy, { top: D.lock(k.navy, 0.5), sides: D.line(k.navy, 0.3), innerK: k.white, inside: L.nuggets(15, 9, 14, 0.5) }), 'az=22&el=38'],
  SF07: [() => cone(26, 17, k.white, (x, W, H) => { pattern(x, W, H, GREEN, 150, 40, 0.8); symbol(x, W * 0.5, H * 0.3, W * 0.14, NAVY); }, L.fries(8, 3, 24, 7, 12, 0.8)), 'az=12&el=30'],
  SF08: [() => { const g = L.tray(9.2, 11, 4.4, { paper: k.navy.paper, inner: k.white.inner, faces: { front: D.sym(k.navy, 0.36, 0.26), back: D.badge(k.navy, 0.6) }, shapes: { front: scoopFront(0.45), left: slopeSide(0.55), right: slopeSide(0.55) } }); g.add(L.fries(7.5, 3.2, 30, 11, 16, 1)); return g; }, 'az=22&el=20'],
  SF09: [() => { const g = L.tray(18, 5, 7, { paper: k.white.paper, inner: k.white.inner, faces: { front: D.band(k.white, 0.45), back: D.band(k.white, 0.45), left: D.sym(k.white, 0.4), right: D.sym(k.white, 0.4) } }); g.add(at(L.hotdog(16.5), 0, 0.4, 0)); return g; }, 'az=20&el=30'],
  SF10: [() => clam(22, 3.6, 7, 3.4, 72, k.navy, { top: D.lock(k.navy, 0.44), sides: D.line(k.navy, 0.3), innerK: k.white, inside: at(L.hotdog(20), 0, 0.3, 0) }), 'az=20&el=32'],
  // Accessori
  AC01: [() => { const g = G(); const [c, x] = L.cnv(40 * L.PX, 30 * L.PX); const W = c.width, H = c.height; PAPERS.white(x, W, H); pattern(x, W, H, GREEN, 170, 52, 0.35); x.fillStyle = NAVY; x.fillRect(0, 0, W, 90); x.fillRect(0, H - 90, W, 90); x.fillStyle = WHITE; x.fillRect(W * 0.05, H * 0.14, W * 0.34, H * 0.34); lockup(x, W * 0.22, H * 0.31, W * 0.28, NAVY, NAVY); spaced(x, 'BUON APPETITO', W / 2, H - 30, 44, INK_LIGHT, 400, 0.5);
    const m = new THREE.Mesh(new THREE.PlaneGeometry(40, 30), L.paperMat(L.tex(c), { kind: 'white', rough: 0.9 })); m.rotation.x = -Math.PI / 2; m.position.y = 0.03; m.receiveShadow = true; g.add(m);
    g.add(at(PRODUCTS.PP01[0](), 3, 0, 2, 0.25), at(L.cup({ print: cupPrint() }), 15, 0, 7)); return g; }, 'az=0&el=52'],
  AC02: [() => { const g = G(); const t = L.tray(19, 3.2, 19, { paper: k.kraft.paper, kind: 'kraft', inner: k.kraft.inner, faces: { front: D.lock(k.kraft, 0.55), back: D.lock(k.kraft, 0.55), left: D.sym(k.kraft, 0.4), right: D.sym(k.kraft, 0.4) } }); g.add(t);
    const sh = new THREE.Shape(); sh.moveTo(-9.5, 0); sh.lineTo(9.5, 0); sh.lineTo(9.5, 9); sh.quadraticCurveTo(9.5, 11, 7.5, 11); sh.lineTo(-7.5, 11); sh.quadraticCurveTo(-9.5, 11, -9.5, 9); sh.closePath(); const ho = new THREE.Path(); ho.absellipse(0, 8.6, 3, 0.9, 0, 7, false); sh.holes.push(ho);
    const panel = new THREE.Mesh(L.normUV(new THREE.ShapeGeometry(sh, 24)), L.paperMat(L.faceTex(19, 11, PAPERS.kraft, (x, W, H) => spaced(x, 'WASTE MANAGEMENT', W / 2, H * 0.62, H * 0.06, NAVY, 500, 0.3)), { kind: 'kraft', side: THREE.DoubleSide })); g.add(panel);
    for (const [cx, cz] of [[-4.8, -4.8], [4.8, -4.8], [-4.8, 4.8], [4.8, 4.8]]) g.add(at(L.cup({ print: cupPrint(), rTop: 4, rBot: 2.7, h: 9.4 }), cx, 0.2, cz)); return g; }, 'az=26&el=30'],
  AC03: [() => L.gable(35.8, 15, 25.8, 4.5, 4.5, { paper: k.white.paper, faces: { front: D.lock(k.white, 0.5, 0.04), back: D.lock(k.white, 0.5), left: D.sym(k.white, 0.4), right: D.sym(k.white, 0.4), roofFront: D.diffuse(k.white, 110, 34, 0.8), roofBack: D.diffuse(k.white, 110, 34, 0.8) } }), 'az=26&el=24'],
  AC04: [() => { const g = G(); g.add(L.box(30, 10, 30, { paper: PAPERS.white, faces: { top: D.diffuse(k.white, 150, 44, 0.8) } })); const s = L.sleeve(14, 10.02, 30.04, { paper: PAPERS.navy, faces: { top: D.lock(k.navy, 0.8), front: D.band(k.navy, 0.3, 'WASTE') } }); s.position.x = 5; g.add(s); return g; }, 'az=28&el=36'],
  AC05: [() => L.gable(21, 9, 12.5, 4.5, 3.5, { paper: PAPERS.mint, faces: { front: D.lock(k.mint, 0.6, 0.02), back: D.lock(k.mint, 0.6), left: D.sym(k.mint, 0.4), right: D.sym(k.mint, 0.4), roofFront: D.diffuse(k.mint, 90, 28, 0.9), roofBack: D.diffuse(k.mint, 90, 28, 0.9) } }), 'az=26&el=22'],
  // Box cucina etnica
  CE01: [() => { const g = L.tray(28, 5.5, 18, { paper: k.white.paper, inner: k.white.inner, faces: { front: D.band(k.white, 0.4), back: D.band(k.white, 0.4), left: D.sym(k.white, 0.4), right: D.sym(k.white, 0.4) } });
    for (const xx of [-4.6, 4.6]) { const dv = L.sheet(18, 4.6, L.plainMat('#f3f1ea'), L.plainMat('#f3f1ea')); dv.rotation.y = Math.PI / 2; dv.position.set(xx, 2.3, 0); g.add(dv); }
    for (const xx of [-9.3, 0, 9.3]) g.add(at(L.sushi(8, 16, 3, 2, 0.1), xx, 0, 0)); return g; }, 'az=18&el=44'],
  CE02: [() => { const g = G(); g.add(L.box(20, 5, 14, { paper: PAPERS.white, faces: { top: D.diffuse(k.white, 120, 40, 0.5) } })); const s = L.sleeve(9, 5.04, 14.06, { paper: PAPERS.navy, faces: { top: D.lock(k.navy, 0.72), front: D.line(k.navy, 0.45) } }); s.position.x = 2.5; g.add(s); return g; }, 'az=30&el=32'],
  CE03: [() => { const g = pail(7.4, 7.4, 9.2, 9.2, 8.5, k.white, (x, W, H) => symbol(x, W / 2, H * 0.48, H * 0.42, NAVY)); g.add(wire(9.2, 8.5, 5.3)); return g; }, 'az=22&el=20'],
  CE04: [() => { const g = L.tray(12, 6.5, 9, { paper: k.kraft.paper, kind: 'kraft', inner: k.kraft.inner, faces: { front: D.lock(k.kraft, 0.62), back: D.sym(k.kraft, 0.4), left: D.sym(k.kraft, 0.4), right: D.sym(k.kraft, 0.4) } });
    const dv = L.sheet(9, 5, L.plainMat('#b28a5e'), L.plainMat('#b28a5e')); dv.rotation.y = Math.PI / 2; dv.position.set(0, 2.5, 0); g.add(dv); g.add(at(taco(), -3, 0.1, 0, Math.PI / 2), at(taco(), 3, 0.1, 0, Math.PI / 2)); return g; }, 'az=24&el=30'],
  CE05: [() => { const g = G(); const t = L.tray(9, 21, 6.5, { paper: k.navy.paper, inner: k.white.inner, faces: { front: D.both(D.lock(k.navy, 0.8, 0.12), (x, W, H) => { x.setLineDash([10, 8]); x.strokeStyle = 'rgba(255,255,255,0.5)'; x.lineWidth = 3; x.beginPath(); x.moveTo(0, H * 0.18); x.lineTo(W, H * 0.24); x.stroke(); }), back: D.sym(k.navy, 0.44) } }); g.add(t); g.add(at(wrap(22.5), 0, 0.2, 0)); return g; }, 'az=24&el=18'],
  // Pasticceria
  PA01: [() => clam(21, 5, 29, 1.6, 78, k.white, { top: D.lockOnDiffuse(k.white), sides: D.line(k.white, 0.35), inside: L.pastries(19, 27, 4, 3, 0.1) }), 'az=16&el=40'],
  PA02: [() => clam(21, 5, 29, 1.6, 78, k.navy, { top: D.lockOnDiffuse(k.navy), sides: D.line(k.navy, 0.35), innerK: k.white, inside: L.pastries(19, 27, 4, 3, 0.1) }), 'az=16&el=40'],
  PA03: [() => { const g = G(); const geo = new THREE.CylinderGeometry(15.6, 15.6, 9, 8); const [c, x] = L.cnv(26 * L.PX, 26 * L.PX); PAPERS.white(x, c.width, c.height); pattern(x, c.width, c.height, GREEN, 140, 40, 0.8); x.fillStyle = WHITE; x.beginPath(); x.arc(c.width / 2, c.height / 2, c.width * 0.3, 0, 7); x.fill(); x.save(); x.translate(c.width / 2, c.height / 2); x.rotate(-Math.PI / 2); lockup(x, 0, 0, c.width * 0.44, NAVY, NAVY); x.restore();
    const [c2, x2] = L.cnv(80 * L.PX, 9 * L.PX); PAPERS.white(x2, c2.width, c2.height); x2.fillStyle = GREEN; x2.fillRect(0, c2.height * 0.3, c2.width, 5);
    const m = new THREE.Mesh(geo, [L.paperMat(L.tex(c2)), L.paperMat(L.tex(c)), L.paperMat(L.tex(c))]); m.rotation.y = Math.PI / 8; m.position.y = 4.5; g.add(m); return L.shadowAll(g); }, 'az=24&el=34'],
  PA04: [() => lidBox(30, 7, 30, k.white, { top: D.lockOnDiffuse(k.white), front: D.line(k.white, 0.3), left: D.line(k.white, 0.3) }, 0.55), 'az=26&el=38'],
  PA05: [() => lidBox(25, 9, 25, k.kraft, { top: D.lock(k.kraft, 0.55), front: D.badge(k.kraft, 0.6), left: D.sym(k.kraft, 0.4) }, 0.5), 'az=26&el=36'],
  PA06: [() => lidBox(40, 10, 50, k.navy, { top: D.lock(k.navy, 0.5), front: D.line(k.navy, 0.3), left: D.line(k.navy, 0.3) }, 0.5), 'az=26&el=38'],
  PA07: [() => windowBox(12, 9, 12, k.white, L.pastries(10, 10, 1, 1, 0.1), D.both(D.sym(k.white, 0.4, 0.05), D.line(k.white, 0.85))), 'az=26&el=38'],
  PA08: [() => L.box(30, 30, 30, { paper: PAPERS.navy, radius: 0.15, faces: { front: D.lock(k.navy, 0.62), right: D.sym(k.navy, 0.4), left: D.sym(k.navy, 0.4), top: (x, W, H) => { symbol(x, W / 2, H / 2, H * 0.3, GREEN); x.strokeStyle = 'rgba(255,255,255,0.14)'; x.lineWidth = 3; x.strokeRect(W * 0.06, H * 0.06, W * 0.88, H * 0.88); } } }), 'az=32&el=26'],
  PA09: [() => { const g = G(); g.add(at(lidBox(26.5, 6.5, 26.5, k.white, { top: D.lockOnDiffuse(k.white), front: D.line(k.white, 0.3), left: D.line(k.white, 0.3) }, 0.5), -8, 0, 4, 0.2));
    g.add(at(windowBox(35, 16, 17, k.navy, null, D.line(k.navy, 0.8)), 14, 0, -12, -0.3)); return g; }, 'az=18&el=32'],
  PA10: [() => L.gable(25, 12, 25, 5, 4, { paper: PAPERS.white, faces: { front: D.lock(k.white, 0.6, 0.02), back: D.lock(k.white, 0.6), left: D.sym(k.white, 0.4), right: D.sym(k.white, 0.4), roofFront: D.diffuse(k.white, 110, 34, 0.8), roofBack: D.diffuse(k.white, 110, 34, 0.8) } }), 'az=26&el=24'],
  PA11: [() => { const g = G(); for (let i = 0; i < 3; i++) { const p = prism(11, 7, 4.6, i === 1 ? k.navy : k.white, (x, W, H) => { if (i === 1) symbol(x, W * 0.18, H * 0.5, H * 0.09, 'gradient'); else symbol(x, W * 0.18, H * 0.5, H * 0.09, NAVY); }); p.position.set(-4 + i * 1.5, 0, -6 + i * 7); p.rotation.y = -0.4 + i * 0.35; g.add(p); } return g; }, 'az=18&el=40'],
  PA12: [() => cone(13, 8, k.white, (x, W, H) => { pattern(x, W, H, GREEN, 110, 32, 0.8); }, null), 'az=14&el=30'],
  // Box regalo
  BR01: [() => { const g = G(); g.add(at(L.gable(9, 34, 9, 2.2, 3.5, { paper: PAPERS.kraft, kind: 'kraft', faces: { front: D.both(D.band(k.kraft, 0.62, 'WASTE'), D.sym(k.navy, 0.5, 0.18)), left: D.band(k.kraft, 0.62, ''), right: D.band(k.kraft, 0.62, '') }, handleDraw: null }), -12, 0, 0, 0.3));
    g.add(at(L.gable(29, 34, 9, 2.2, 3.5, { paper: PAPERS.navy, faces: { front: D.lock(k.navy, 0.62, 0.05), back: D.lock(k.navy, 0.62), left: D.sym(k.navy, 0.5), right: D.sym(k.navy, 0.5) } }), 10, 0, -4, -0.25)); return g; }, 'az=16&el=16'],
  BR02: [() => { const g = G(); g.add(lidBox(52, 9, 32.5, k.kraft, { top: D.lock(k.kraft, 0.5), front: D.band(k.kraft, 0.3, 'WASTE MANAGEMENT'), left: D.sym(k.kraft, 0.4) }, 0.45)); return g; }, 'az=24&el=36'],
  BR03: [() => L.gable(40, 9, 45, 4, 3.5, { paper: PAPERS.navy, faces: { front: D.lock(k.navy, 0.5, 0.05), back: D.lock(k.navy, 0.5), left: D.sym(k.navy, 0.4), right: D.sym(k.navy, 0.4), roofFront: D.diffuse(k.navy, 140, 40, 0.5), roofBack: D.diffuse(k.navy, 140, 40, 0.5) } }), 'az=26&el=30'],
  BR04: [() => L.gable(30, 24, 18, 4, 4, { paper: PAPERS.kraft, kind: 'kraft', faces: { front: D.lock(k.kraft, 0.6, 0.04), back: D.lock(k.kraft, 0.6), left: D.sym(k.kraft, 0.4), right: D.sym(k.kraft, 0.4) } }), 'az=26&el=20'],
  BR05: [() => { const g = lidBox(35, 34, 28, k.white, { top: (x, W, H) => { x.fillStyle = 'rgba(0,0,0,0.55)'; for (const q of [0.3, 0.7]) { x.beginPath(); x.ellipse(W * q, H / 2, W * 0.09, H * 0.035, 0, 0, 7); x.fill(); } }, front: D.lock(k.white, 0.62, -0.04), left: D.both(D.diffuse(k.white, 120, 36, 0.8)) }, 0.18); return g; }, 'az=28&el=24'],
  // E-commerce
  EC01: [() => L.box(35, 10, 26, { paper: PAPERS.kraft, kind: 'kraft', radius: 0.2, faces: { top: (x, W, H) => { lockup(x, W / 2, H / 2, W * 0.36, NAVY, NAVY); x.strokeStyle = 'rgba(60,35,10,0.35)'; x.lineWidth = 3; x.beginPath(); x.moveTo(0, H - 30); x.lineTo(W, H - 30); x.stroke(); }, front: (x, W, H) => { spaced(x, 'IL TUO BRAND, OVUNQUE.', W / 2, H * 0.62, H * 0.16, NAVY, 400, 0.25); x.fillStyle = 'rgba(60,35,10,0.35)'; x.beginPath(); x.ellipse(W / 2, 2, 60, 26, 0, 0, Math.PI); x.fill(); }, right: D.sym(k.kraft, 0.5), left: D.sym(k.kraft, 0.5) } }), 'az=24&el=42'],
  EC02: [() => { const g = clam(30, 7.5, 23, 7.5, 100, k.kraft, { top: D.lock(k.kraft, 0.5), sides: D.sym(k.kraft, 0.4), innerK: { inner: (x, W, H) => { PAPERS.navy(x, W, H); pattern(x, W, H, GREEN, 150, 44, 0.5); } } });
    const tissue = new THREE.Mesh(new THREE.PlaneGeometry(28, 21, 16, 16), new THREE.MeshStandardMaterial({ color: '#f6f3ee', roughness: 0.95 })); const p = tissue.geometry.attributes.position; for (let i = 0; i < p.count; i++) p.setZ(i, Math.sin(p.getX(i) * 0.8) * 0.25 + Math.cos(p.getY(i) * 0.6) * 0.2); tissue.geometry.computeVertexNormals(); tissue.rotation.x = -Math.PI / 2; tissue.position.y = 5.5; g.add(tissue);
    const st = new THREE.Mesh(new THREE.CircleGeometry(2.4, 48), new THREE.MeshStandardMaterial({ map: L.tex((() => { const [c, x] = L.cnv(256, 256); x.fillStyle = NAVY; x.beginPath(); x.arc(128, 128, 128, 0, 7); x.fill(); symbol(x, 128, 128, 120, 'gradient'); return c; })()), roughness: 0.5 })); st.rotation.x = -Math.PI / 2; st.position.set(0, 5.9, 2); g.add(st); return L.shadowAll(g); }, 'az=20&el=38'],
  // Bicchieri e bowl
  BB01: [() => { const g = G(); g.add(at(L.cup({ print: cupPrint(), lidColor: '#0f3140' }), -3, 0, 0), at(L.cup({ rTop: 3.6, rBot: 2.5, h: 8.2, print: cupMint, lidColor: '#f2f2ef' }), 6, 0, 4), at(L.cup({ rTop: 2.9, rBot: 2.1, h: 5.8, print: cupPrint(), lid: false }), -9, 0, 6)); return g; }, 'az=16&el=18'],
  BB02: [() => L.bowl({ print: bowlPrint }), 'az=20&el=26'],
};

// ------------------------------------------------------------------ scene composte (selezione e aperture di sezione)
export const EXTRA = {
  'cup': [() => L.cup({ print: cupPrint(), lidColor: '#0f3140' }), 'az=20&el=16'],
  'cup-mint': [() => L.cup({ rTop: 3.6, rBot: 2.5, h: 8.2, print: cupMint }), 'az=20&el=16'],
};
