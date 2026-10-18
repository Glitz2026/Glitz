// Seconda serie di articoli ricostruiti in 3D: sostituiscono le illustrazioni schematiche del materiale sorgente.
// Misure in cm dai formati documentati; colori solo quando indicati nel catalogo, altrimenti tinte neutre del materiale.
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import * as L from './lib.js';
const G = () => new THREE.Group();
const at = (o, x = 0, y = 0, z = 0, ry = 0) => { o.position.set(x, y, z); o.rotation.y = ry; return o; };
const rnd = (() => { let s = 11; return () => ((s = (s * 16807) % 2147483647) / 2147483647); })();

// ------------------------------------------------------------------ texture
function canvasTex(W, H, draw, rx = 1, ry = 1) { const [c, x] = L.cnv(W, H); draw(x, W, H); return L.tex(c, rx, ry); }
// carta tissue (ovatta): colore + rilievo (goffratura a puntini sul bordo, crespatura)
function tissueMat(color, size = 20, { emboss = true } = {}) {
  const W = size * L.PX;
  const map = canvasTex(W, W, (x) => { L.paperFill(x, W, W, color, { grain: 5 }); });
  const bump = canvasTex(W, W, (x) => {
    x.fillStyle = '#808080'; x.fillRect(0, 0, W, W);
    x.globalAlpha = 0.25; for (let i = 0; i < W; i += 4) { x.fillStyle = i % 8 ? '#000' : '#fff'; x.fillRect(0, i, W, 2); }
    x.globalAlpha = 1;
    if (emboss) {
      const m = W * 0.075; x.fillStyle = '#fff';
      for (let k = m * 0.4; k < W - m * 0.3; k += W * 0.02) for (const [px, py] of [[k, m * 0.5], [m * 0.5, k], [k, W - m * 0.5], [W - m * 0.5, k]]) { x.beginPath(); x.arc(px, py, W * 0.006, 0, 7); x.fill(); }
      x.strokeStyle = '#fff'; x.lineWidth = W * 0.004; x.strokeRect(m, m, W - 2 * m, W - 2 * m);
      // motivo goffrato al centro
      x.lineWidth = W * 0.003; for (let a = 0; a < 8; a++) { x.beginPath(); x.ellipse(W / 2 + Math.cos(a * Math.PI / 4) * W * 0.06, W / 2 + Math.sin(a * Math.PI / 4) * W * 0.06, W * 0.05, W * 0.022, a * Math.PI / 4, 0, 7); x.stroke(); }
    }
  });
  bump.colorSpace = THREE.NoColorSpace;
  return new THREE.MeshStandardMaterial({ map, bumpMap: bump, bumpScale: 2.2, roughness: 0.92 });
}
// tessuti per la pulizia
function clothTex(color, kind, size = 512) {
  return canvasTex(size, size, (x, W, H) => {
    L.paperFill(x, W, H, color, { grain: kind === 'micro' ? 6 : 10 });
    if (kind === 'waffle') { x.globalAlpha = 0.16; const s = W / 26; for (let i = 0; i < W; i += s) for (let j = 0; j < H; j += s) { x.fillStyle = '#000'; x.fillRect(i + s * 0.12, j + s * 0.12, s * 0.76, s * 0.76); x.fillStyle = '#fff'; x.fillRect(i + s * 0.12, j + s * 0.12, s * 0.76, s * 0.12); } }
    if (kind === 'perforated') { x.globalAlpha = 0.18; x.fillStyle = '#000'; const s = W / 30; for (let i = 0; i < W; i += s) for (let j = 0; j < H; j += s) { x.beginPath(); x.arc(i + ((j / s) % 2) * s / 2, j, s * 0.14, 0, 7); x.fill(); } }
    if (kind === 'sponge') { for (let i = 0; i < 2600; i++) { x.globalAlpha = 0.12 + rnd() * 0.2; x.fillStyle = rnd() > 0.5 ? '#000' : '#fff'; x.beginPath(); x.ellipse(rnd() * W, rnd() * H, 1 + rnd() * 4, 1 + rnd() * 3, rnd() * 3, 0, 7); x.fill(); } }
    if (kind === 'micro') { x.globalAlpha = 0.05; for (let i = 0; i < 900; i++) { x.strokeStyle = rnd() > 0.5 ? '#000' : '#fff'; x.beginPath(); const px = rnd() * W, py = rnd() * H; x.moveTo(px, py); x.lineTo(px + rnd() * 6, py + rnd() * 6); x.stroke(); } }
    if (kind === 'chamois') { x.globalAlpha = 0.06; for (let i = 0; i < 300; i++) { x.fillStyle = rnd() > 0.5 ? '#000' : '#fff'; x.beginPath(); x.ellipse(rnd() * W, rnd() * H, 4 + rnd() * 18, 2 + rnd() * 8, rnd() * 3, 0, 7); x.fill(); } }
    if (kind === 'tnt') { x.globalAlpha = 0.06; for (let i = 0; i < 2000; i++) { x.strokeStyle = rnd() > 0.5 ? '#000' : '#fff'; x.lineWidth = 0.8; const px = rnd() * W, py = rnd() * H, a = rnd() * 6.28, l = 6 + rnd() * 14; x.beginPath(); x.moveTo(px, py); x.quadraticCurveTo(px + Math.cos(a + 1) * l, py + Math.sin(a + 1) * l, px + Math.cos(a) * l * 1.6, py + Math.sin(a) * l * 1.6); x.stroke(); } }
    x.globalAlpha = 1;
  }, 2, 2);
}
// pizzo di carta: alfa traforato
function laceTex(round = true, size = 1024) {
  return canvasTex(size, size, (x, W, H) => {
    x.fillStyle = '#fff'; const cx = W / 2, cy = H / 2, R = W * 0.49;
    if (round) {
      x.beginPath(); for (let a = 0; a <= Math.PI * 2 + 0.01; a += Math.PI / 720) { const r = R * (0.965 + 0.035 * Math.cos(a * 48)); x.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r); } x.fill();
      x.globalCompositeOperation = 'destination-out';
      for (const [rr, n, s] of [[0.86, 48, 0.035], [0.76, 40, 0.028], [0.66, 32, 0.022], [0.5, 24, 0.02]]) for (let k = 0; k < n; k++) { const a = k / n * Math.PI * 2; x.beginPath(); x.ellipse(cx + Math.cos(a) * R * rr, cy + Math.sin(a) * R * rr, W * s, W * s * 0.55, a, 0, 7); x.fill(); }
      for (let k = 0; k < 16; k++) { const a = k / 16 * Math.PI * 2; x.beginPath(); x.ellipse(cx + Math.cos(a) * R * 0.58, cy + Math.sin(a) * R * 0.58, W * 0.012, W * 0.03, a, 0, 7); x.fill(); }
    } else {
      const m = W * 0.02, sc = W * 0.025; x.beginPath(); x.rect(m + sc, m + sc, W - 2 * (m + sc), H - 2 * (m + sc)); x.fill();
      for (let k = m + sc; k < W - m - sc; k += sc * 1.6) for (const [px, py] of [[k, m + sc], [k, H - m - sc], [m + sc, k], [W - m - sc, k]]) { x.beginPath(); x.arc(px, py, sc, 0, 7); x.fill(); }
      x.globalCompositeOperation = 'destination-out';
      for (const f of [0.1, 0.17]) for (let k = W * f; k < W * (1 - f); k += W * 0.035) for (const [px, py] of [[k, H * f], [k, H * (1 - f)], [W * f, k], [W * (1 - f), k]]) { x.beginPath(); x.ellipse(px, py, W * 0.01, W * 0.006, 0, 0, 7); x.fill(); }
    }
    x.globalCompositeOperation = 'source-over';
  });
}
function woodTex(base = '#d9b98c', size = 512) {
  return canvasTex(size, size, (x, W, H) => {
    L.paperFill(x, W, H, base, { grain: 6 });
    for (let i = 0; i < 70; i++) { const y0 = rnd() * H; x.strokeStyle = `rgba(120,80,40,${0.05 + rnd() * 0.08})`; x.lineWidth = 0.6 + rnd() * 1.6; x.beginPath(); x.moveTo(0, y0); for (let xx = 0; xx <= W; xx += 16) x.lineTo(xx, y0 + Math.sin(xx / 70 + i) * 3); x.stroke(); }
  });
}
// goffratura a canali per le buste sottovuoto (normal map)
function channelNormal(size = 256) {
  const [c, x] = L.cnv(size, size); const img = x.createImageData(size, size), d = img.data;
  for (let y = 0; y < size; y++) for (let xx = 0; xx < size; xx++) {
    const v = Math.sin((xx + y) / size * Math.PI * 24) * 0.5, w = Math.sin((xx - y) / size * Math.PI * 24) * 0.5;
    const n = new THREE.Vector3(-(v + w) * 0.4, -(v - w) * 0.4, 1).normalize(); const i = (y * size + xx) * 4;
    d[i] = (n.x * 0.5 + 0.5) * 255; d[i + 1] = (n.y * 0.5 + 0.5) * 255; d[i + 2] = (n.z * 0.5 + 0.5) * 255; d[i + 3] = 255;
  }
  x.putImageData(img, 0, 0); const t = new THREE.CanvasTexture(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(4, 4); return t;
}

// ------------------------------------------------------------------ primitive
const mat = (map, rough = 0.9, opt = {}) => new THREE.MeshStandardMaterial({ map, roughness: rough, ...opt });
// pannello morbido: bordi arrotondati e leggera ondulazione
function soft(w, d, t, material, { wave = 0, seg = 24 } = {}) {
  const geo = new RoundedBoxGeometry(w, t, d, 3, Math.min(t * 0.48, 0.6));
  if (wave) { const p = geo.attributes.position; for (let i = 0; i < p.count; i++) { const xx = p.getX(i), zz = p.getZ(i); p.setY(i, p.getY(i) + wave * (Math.sin(xx * 0.45) * Math.cos(zz * 0.38) + 0.5 * Math.sin(xx * 0.9 + zz * 0.7))); } geo.computeVertexNormals(); }
  const m = new THREE.Mesh(geo, material); m.position.y = t / 2; return m;
}
function softDense(w, d, t, material, wave) { // pannello suddiviso per ondulazioni morbide
  const geo = new THREE.BoxGeometry(w, t, d, 40, 1, 40); const p = geo.attributes.position;
  for (let i = 0; i < p.count; i++) { const xx = p.getX(i), zz = p.getZ(i); p.setY(i, p.getY(i) + wave * (Math.sin(xx * 0.35 + 1) * Math.cos(zz * 0.31) + 0.4 * Math.sin(xx * 0.8 + zz * 0.6)) + wave * 0.6); }
  geo.computeVertexNormals(); const m = new THREE.Mesh(geo, material); m.position.y = t / 2; return m;
}
function fan(make, n, dx, dz, dr, dy) { const g = G(); for (let i = 0; i < n; i++) { const o = make(i); o.position.set((i - (n - 1) / 2) * dx, i * dy, (i - (n - 1) / 2) * dz); o.rotation.y = (i - (n - 1) / 2) * dr; g.add(o); } return g; }
// risma di fogli (carta, plastica, carta forno)
function sheets(w, d, n, { color = '#f7f6f1', rough = 0.8, opacity = 1, map, t = 0.03, curl = 0, fibers = 0, physical } = {}) {
  const g = G();
  const m = physical ? new THREE.MeshPhysicalMaterial({ color, roughness: rough, transparent: opacity < 1, opacity, side: THREE.DoubleSide, ...physical })
    : mat(map || canvasTex(256, 256, (x, W, H) => L.paperFill(x, W, H, color, { grain: 6, fibers })), rough, { transparent: opacity < 1, opacity, side: THREE.DoubleSide });
  const body = new THREE.Mesh(new THREE.BoxGeometry(w, n * t, d), m); body.position.y = n * t / 2; g.add(body);
  if (curl) {
    const top = new THREE.PlaneGeometry(w, d, 24, 24); const p = top.attributes.position;
    for (let i = 0; i < p.count; i++) { const xx = p.getX(i) + w / 2, yy = p.getY(i) + d / 2; const k = Math.max(0, 1 - (xx + (d - yy)) / (Math.min(w, d) * 0.55)); p.setZ(i, k * k * curl); }
    top.computeVertexNormals(); const s = new THREE.Mesh(top, m); s.rotation.x = -Math.PI / 2; s.position.y = n * t + 0.02; g.add(s);
  }
  return L.shadowAll(g);
}
// guanto monouso appoggiato in piano: sagoma unica (palmo, dita, pollice, polsino) estrusa e smussata
function glove(color, left = false) {
  const sh = new THREE.Shape();
  // contorno antiorario, cm (polsino in basso, dita in alto); dita separate da incavi
  sh.moveTo(-3.9, 0); sh.lineTo(3.9, 0); sh.lineTo(4.25, 7); sh.quadraticCurveTo(4.55, 10, 4.4, 13.2);
  const F = [[2.675, 4.4, 19.4], [0.45, 2.175, 21.9], [-1.775, -0.05, 22.6], [-4.0, -2.275, 21.3]];
  F.forEach(([x0, x1, top], k) => {
    const r = (x1 - x0) / 2; sh.lineTo(x1, top - r); sh.absarc(x0 + r, top - r, r, 0, Math.PI, false); sh.lineTo(x0, 15.3);
    if (k < 3) sh.quadraticCurveTo(x0 - 0.25, 14.8, F[k + 1][1], 15.3);
  });
  sh.lineTo(-4.0, 12.8); sh.quadraticCurveTo(-5.0, 12.4, -6.6, 14.6);   // pollice
  sh.absarc(-7.35, 13.95, 1.0, 0.72, 0.72 + Math.PI, false);
  sh.quadraticCurveTo(-6.3, 9.6, -4.35, 7.2); sh.lineTo(-3.9, 0);
  const geo = new THREE.ExtrudeGeometry(sh, { depth: 0.35, bevelEnabled: true, bevelThickness: 0.5, bevelSize: 0.28, bevelSegments: 8, curveSegments: 36 });
  const m = new THREE.Mesh(geo, new THREE.MeshPhysicalMaterial({ color, roughness: 0.45, clearcoat: 0.3, clearcoatRoughness: 0.55, sheen: 0.5, sheenColor: new THREE.Color('#5a6066') }));
  m.rotation.x = -Math.PI / 2; m.position.y = 0.55;
  const cuff = new THREE.Mesh(new THREE.TorusGeometry(1, 0.12, 8, 64), m.material); cuff.scale.set(4.3, 0.55, 1); cuff.rotation.x = 0; cuff.position.set(0, 0.6, 0.05);
  const g = G().add(m); if (left) g.scale.x = -1;
  return L.shadowAll(g);
}
// rotolo
function roll(len, r, color, { core = '#b8a585', unrolled = 0, map } = {}) {
  const g = G(); const m = map ? mat(map, 0.7) : new THREE.MeshStandardMaterial({ color, roughness: 0.6 });
  const c = new THREE.Mesh(new THREE.CylinderGeometry(r, r, len, 64), [m, new THREE.MeshStandardMaterial({ color, roughness: 0.8 }), new THREE.MeshStandardMaterial({ color, roughness: 0.8 })]);
  c.rotation.z = Math.PI / 2; c.position.y = r; g.add(c);
  for (const s of [-1, 1]) { const cc = new THREE.Mesh(new THREE.CylinderGeometry(r * 0.38, r * 0.38, 0.05, 48), new THREE.MeshStandardMaterial({ color: core, roughness: 0.9 })); cc.rotation.z = Math.PI / 2; cc.position.set(s * (len / 2 + 0.02), r, 0); g.add(cc);
    const hole = new THREE.Mesh(new THREE.CylinderGeometry(r * 0.3, r * 0.3, 0.06, 48), new THREE.MeshStandardMaterial({ color: '#5b5040', roughness: 1 })); hole.rotation.z = Math.PI / 2; hole.position.set(s * (len / 2 + 0.03), r, 0); g.add(hole); }
  if (unrolled) { const sh = new THREE.Mesh(new THREE.BoxGeometry(len * 0.995, 0.03, unrolled), m); sh.position.set(0, 0.015, r + unrolled / 2 - 0.2); g.add(sh); }
  return L.shadowAll(g);
}

// ------------------------------------------------------------------ articoli
export const ITEMS2 = {
  // Tovagliolo da banco 17 × 17: bianco e avana (colori documentati)
  'napkin-counter': [() => G().add(
    at(fan(() => soft(17, 17, 0.5, tissueMat('#f6f5f0', 17, { emboss: false })), 3, 0.5, 0.4, 0.06, 0.48), -9.5, 0, 0, 0.1),
    at(fan(() => soft(17, 17, 0.5, tissueMat('#c9b89c', 17, { emboss: false })), 3, 0.5, 0.4, 0.06, 0.48), 9.5, 0, 2, -0.12)), 'az=20&el=34'],
  // Tovaglioli in ovatta bianchi, piegati in quattro, con goffratura
  'napkin-ovatta': [() => fan(() => soft(16.5, 16.5, 0.6, tissueMat('#f7f6f1', 16.5)), 5, 1.2, 0.8, 0.07, 0.58), 'az=22&el=34'],
  // Tovaglioli grandi 48 × 48, tre veli: più spessi
  'napkin-ovatta-large': [() => fan(() => soft(24, 24, 1.0, tissueMat('#f7f6f1', 24)), 4, 1.5, 1.0, 0.06, 0.96), 'az=22&el=32'],
  // Tovagliette in carta 30 × 40: bianca e kraft
  'placemat-paper': [() => G().add(
    at(sheets(40, 30, 12, { color: '#f7f6f1', curl: 4 }), -5, 0.32, -4, 0.12),
    at(sheets(40, 30, 10, { color: '#a8916f', fibers: 260 }), 9, 0, 9, -0.1)), 'az=10&el=44'],
  // Tovagliette in carta paglia 30 × 40
  'placemat-straw': [() => G().add(at(sheets(40, 30, 14, { color: '#d8c792', fibers: 400 }), 0, 0, 0, 0.1), at(sheets(40, 30, 1, { color: '#d8c792', fibers: 400, curl: 3 }), 7, 0.45, 8, -0.2)), 'az=12&el=44'],
  // Sottofritti in carta paglia
  'straw-sheets': [() => G().add(at(sheets(25, 35, 10, { color: '#d8c792', fibers: 400, curl: 4 }), 0, 0, 0, 0.1)), 'az=16&el=46'],
  // Portakebab in carta bianca e avana: busta aperta su un lato con incavo
  'kebab-pocket': [() => {
    const g = G();
    const pocket = (w, h, color, fibers) => {
      const tx = canvasTex(512, 512, (x, W, H) => { L.paperFill(x, W, H, color, { grain: 8, fibers }); });
      const panel = (notch, dy, shade) => {
        const s = new THREE.Shape(); s.moveTo(-w / 2, 0); s.lineTo(w / 2, 0); s.lineTo(w / 2, h + dy);
        if (notch) { s.lineTo(w * 0.15, h); s.absarc(0, h, w * 0.15, 0, Math.PI, true); } s.lineTo(-w / 2, h + dy); s.lineTo(-w / 2, 0);
        const geo = new THREE.ExtrudeGeometry(s, { depth: 0.08, bevelEnabled: true, bevelThickness: 0.03, bevelSize: 0.04, bevelSegments: 2, curveSegments: 32 }); L.normUV(geo);
        const m = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ map: tx, roughness: 0.85, color: shade })); m.rotation.x = -Math.PI / 2; return m;
      };
      const back = panel(false, 0.6, '#e2ddd3'); back.position.y = 0.02;
      const front = panel(true, 0, '#ffffff'); front.position.y = 0.2;
      const seam = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.05, h), new THREE.MeshStandardMaterial({ map: tx, roughness: 0.85, color: '#ece7dd' })); seam.position.set(w / 2 - 0.25, 0.32, -h / 2);
      return L.shadowAll(G().add(back, front, seam));
    };
    g.add(at(pocket(15, 21, '#f6f5f0', 0), -5, 0, 2, 0.15), at(pocket(15, 15, '#c4b293', 300), 8, 0.2, 5, -0.18));
    return g;
  }, 'az=6&el=56'],
  // Filtri alimentari: fogli filtranti piegati
  'food-filter': [() => fan(() => soft(25, 25, 0.5, mat(clothTex('#f4f3ee', 'tnt'), 0.95), { wave: 0.08 }), 3, 2.0, 1.4, 0.08, 0.45), 'az=22&el=36'],
  // Guanti monouso (tinta scura della foto sorgente), coppia in piano
  'gloves': [() => G().add(at(glove('#24282c'), -7, 0, 2, 0.22), at(glove('#24282c', true), 7, 1.2, -1, -0.3)), 'az=0&el=58'],
  // Carta forno: rotolo, fogli e dischi
  'baking-paper': [() => {
    const g = G(); const col = '#efe7d9';
    g.add(at(roll(40, 2.6, col, { unrolled: 14 }), 0, 0, -16, 0));
    g.add(at(sheets(30, 40, 6, { color: col, rough: 0.55, curl: 3 }), -4, 0, 12, 0.12));
    const disc = new THREE.Mesh(new THREE.CylinderGeometry(7.5, 7.5, 0.3, 96), mat(canvasTex(256, 256, (x, W, H) => L.paperFill(x, W, H, col, { grain: 6 })), 0.55)); disc.position.set(19, 0.15, 14); g.add(L.shadowAll(disc));
    return g;
  }, 'az=18&el=40'],
  // Carta forno perforata 19 × 19 e Ø 22
  'baking-perforated': [() => {
    const g = G(); const col = '#efe7d9';
    const holes = (round) => canvasTex(1024, 1024, (x, W, H) => { L.paperFill(x, W, H, col, { grain: 6 }); x.globalCompositeOperation = 'destination-out'; const s = W / 26; for (let i = s; i < W - s / 2; i += s) for (let j = s; j < H - s / 2; j += s) { if (round && Math.hypot(i - W / 2, j - H / 2) > W * 0.46) continue; x.beginPath(); x.arc(i, j, s * 0.18, 0, 7); x.fill(); } x.globalCompositeOperation = 'source-over'; });
    const sq = new THREE.Mesh(new THREE.BoxGeometry(19, 0.4, 19), [mat(null), mat(null), new THREE.MeshStandardMaterial({ map: holes(false), roughness: 0.55, alphaTest: 0.5 }), mat(null), mat(null), mat(null)].map((m, i) => { if (i !== 2) { m.color = new THREE.Color(col); m.roughness = 0.6; } return m; }));
    sq.position.set(-7, 0.2, 0); sq.rotation.y = 0.12; g.add(sq);
    const top = new THREE.Mesh(new THREE.CircleGeometry(11, 128), new THREE.MeshStandardMaterial({ map: holes(true), roughness: 0.55, alphaTest: 0.5, side: THREE.DoubleSide })); top.rotation.x = -Math.PI / 2; top.position.set(10, 0.5, 6); g.add(top);
    const rim = new THREE.Mesh(new THREE.CylinderGeometry(11, 11, 0.45, 128, 1, true), new THREE.MeshStandardMaterial({ color: col, roughness: 0.6 })); rim.position.set(10, 0.25, 6); g.add(rim);
    return L.shadowAll(g);
  }, 'az=10&el=58'],
  // Contenitori in carta forno per friggitrice ad aria: quadrato e tondo, pareti plissettate
  'airfryer-liners': [() => {
    const g = G(); const col = '#efe6d4';
    const roundCup = (r, h) => { const pts = []; for (let i = 0; i <= 12; i++) { const t = i / 12; pts.push(new THREE.Vector2(t < 0.35 ? r * t / 0.35 : r + (t - 0.35) / 0.65 * 1.2, t < 0.35 ? 0 : (t - 0.35) / 0.65 * h)); }
      const geo = new THREE.LatheGeometry(pts, 240); const p = geo.attributes.position;
      for (let i = 0; i < p.count; i++) { const x = p.getX(i), z = p.getZ(i), y = p.getY(i); const a = Math.atan2(z, x), rr = Math.hypot(x, z); if (y > 0.05) { const k = 1 + 0.025 * Math.sin(a * 60); p.setX(i, Math.cos(a) * rr * k); p.setZ(i, Math.sin(a) * rr * k); } }
      geo.computeVertexNormals(); return new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color: col, roughness: 0.6, side: THREE.DoubleSide })); };
    const sqCup = (w, h) => { const geo = new THREE.CylinderGeometry(w * 0.74, w * 0.68, h, 4, 8, true); geo.rotateY(Math.PI / 4); const p = geo.attributes.position;
      const shp = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color: col, roughness: 0.6, side: THREE.DoubleSide, map: canvasTex(512, 128, (x, W, H) => { L.paperFill(x, W, H, col, { grain: 5 }); x.fillStyle = 'rgba(0,0,0,0.08)'; for (let i = 0; i < W; i += 8) x.fillRect(i, 0, 2, H); }) }));
      shp.position.y = h / 2; const base = new THREE.Mesh(new THREE.BoxGeometry(w * 0.96, 0.05, w * 0.96), new THREE.MeshStandardMaterial({ color: col, roughness: 0.6 })); base.position.y = 0.03; return G().add(shp, base); };
    g.add(at(sqCup(16, 4.5), -9, 0, 0, 0.2), at(G().add(roundCup(8.5, 4.5)), 10, 0, 3));
    return L.shadowAll(g);
  }, 'az=16&el=40'],
  // Buste goffrate per sottovuoto e rotolo
  'vacuum-bags': [() => {
    const g = G(); const nm = channelNormal();
    const film = () => new THREE.MeshPhysicalMaterial({ color: '#ffffff', roughness: 0.18, transmission: 0.85, thickness: 0.05, transparent: true, opacity: 0.6, normalMap: nm, normalScale: new THREE.Vector2(0.6, 0.6), side: THREE.DoubleSide, clearcoat: 0.6 });
    const bag = (w, d) => { const b = new THREE.Mesh(new RoundedBoxGeometry(w, 0.25, d, 2, 0.1), film()); b.position.y = 0.13; const seal = new THREE.Mesh(new THREE.BoxGeometry(w, 0.27, 1.2), new THREE.MeshPhysicalMaterial({ color: '#f2f6f8', roughness: 0.3, transparent: true, opacity: 0.75 })); seal.position.set(0, 0.14, -d / 2 + 0.6); return G().add(b, seal); };
    g.add(at(bag(20, 30), -6, 0, 2, 0.15), at(bag(15, 30), 7, 0.3, 6, -0.12));
    const r = roll(30, 3.2, '#e9eef0', { unrolled: 0, core: '#d8d2c4' }); r.traverse(n => { if (n.isMesh && n.material && !Array.isArray(n.material)) n.material.transparent = false; }); g.add(at(r, 0, 0, -20, 0));
    return L.shadowAll(g);
  }, 'az=18&el=42'],
  // Panni in microfibra: blu e rosso (colori documentati), piegati
  'microfiber': [() => G().add(
    at(fan(i => soft(20, 20, 1.2, mat(clothTex(['#2d5fa8', '#c63a3a', '#2d5fa8'][i], 'micro'), 0.98, { sheen: 1 }), { wave: 0.1 }), 3, 2.6, 1.6, 0.12, 1.15), 0, 0, 0)), 'az=20&el=36'],
  // Panni per pavimenti in cotone: trama a nido d'ape
  'floor-cloth': [() => fan(() => soft(25, 18, 2.0, mat(clothTex('#eceae3', 'waffle'), 0.98), { wave: 0.12 }), 3, 1.8, 1.4, 0.06, 1.9), 'az=22&el=36'],
  // Panni per pulizia intensa: azzurro e verde (colori documentati)
  'heavy-cloth': [() => G().add(at(soft(24, 16, 1.6, mat(clothTex('#7fb4dc', 'waffle'), 0.98), { wave: 0.1 }), -6, 0, 0, 0.12), at(soft(24, 16, 1.6, mat(clothTex('#6fae7c', 'waffle'), 0.98), { wave: 0.1 }), 7, 0, 6, -0.12)), 'az=20&el=38'],
  // Panni in PVA (tinta neutra)
  'pva-cloth': [() => G().add(at(soft(15, 15, 0.5, mat(clothTex('#e8d27a', 'chamois'), 0.55, { sheen: 0.3 }), { wave: 0.05 }), -4, 0, 0, 0.1),
    at(new THREE.Mesh(new RoundedBoxGeometry(15, 3, 7, 4, 0.8), mat(clothTex('#e8d27a', 'sponge'), 0.85)), 9, 1.5, 8, -0.25)), 'az=20&el=36'],
  // Panni multiuso forati e scamosciati, colori assortiti
  'multi-cloth': [() => fan(i => soft(19, 19, 0.35, mat(clothTex(['#e3d07a', '#86a9cc', '#9dbf95'][i], 'perforated'), 0.95), { wave: 0.06 }), 3, 2.4, 1.6, 0.12, 0.34), 'az=20&el=40'],
  // Panni spugna
  'sponge-cloth': [() => fan(i => soft(18, 20, 0.45, mat(clothTex(['#e3d07a', '#86a9cc', '#d39a90'][i], 'sponge'), 0.95), { wave: 0.05 }), 3, 2.2, 1.6, 0.1, 0.44), 'az=20&el=40'],
  // Panni catturapolvere 21 × 29 in tessuto non tessuto
  'dust-cloth': [() => fan(() => soft(21, 29, 0.3, mat(clothTex('#f5f4ef', 'tnt'), 0.95), { wave: 0.05 }), 4, 0.9, 0.7, 0.05, 0.29), 'az=20&el=40'],
  // Salviette catturapolvere colorate e salviette per occhiali
  'service-wipes': [() => fan(i => soft(14, 14, 0.4, mat(clothTex(['#86a9cc', '#e3d07a', '#d39a90', '#9dbf95'][i], 'micro'), 0.95), { wave: 0.04 }), 4, 1.6, 1.1, 0.12, 0.39), 'az=22&el=40'],
  // Piumino catturapolvere con manico
  'duster': [() => {
    const g = G(); const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.6, 16, 32), new THREE.MeshStandardMaterial({ color: '#2f6fb1', roughness: 0.4 })); handle.rotation.z = Math.PI / 2; handle.position.set(-10, 1.6, 0); g.add(handle);
    const fib = new THREE.MeshStandardMaterial({ color: '#f1f1ee', roughness: 1 });
    const head = new THREE.Mesh(new THREE.SphereGeometry(1, 48, 32), fib); head.scale.set(9, 2.6, 3.4); head.position.set(6, 2.8, 0); g.add(head);
    const N = 900, geo = new THREE.CylinderGeometry(0.06, 0.02, 1.6, 4); const inst = new THREE.InstancedMesh(geo, fib, N); const dm = new THREE.Object3D();
    for (let i = 0; i < N; i++) { const u = rnd() * Math.PI * 2, v = Math.acos(2 * rnd() - 1); const nx = Math.sin(v) * Math.cos(u), ny = Math.cos(v), nz = Math.sin(v) * Math.sin(u); dm.position.set(6 + nx * 9, 2.8 + ny * 2.6, nz * 3.4); dm.lookAt(6 + nx * 20, 2.8 + ny * 20, nz * 20); dm.rotateX(Math.PI / 2); dm.updateMatrix(); inst.setMatrixAt(i, dm.matrix); }
    g.add(inst); return L.shadowAll(g);
  }, 'az=18&el=34'],
  // Spugna cancellina in melammina
  'eraser-sponge': [() => G().add(at(new THREE.Mesh(new RoundedBoxGeometry(11, 3.5, 7, 3, 0.25), mat(clothTex('#fbfbf8', 'sponge'), 1)), 0, 1.75, 0, 0.3), at(new THREE.Mesh(new RoundedBoxGeometry(11, 3.5, 7, 3, 0.25), mat(clothTex('#fbfbf8', 'sponge'), 1)), 9, 1.75, 8, -0.2)), 'az=24&el=34'],
  // Posate in legno: forchetta, coltello, cucchiaio
  'wood-cutlery': [() => {
    const g = G(); const wm = mat(woodTex(), 0.7);
    const piece = (shape, ry, x, z) => { const geo = new THREE.ExtrudeGeometry(shape, { depth: 0.2, bevelEnabled: true, bevelThickness: 0.06, bevelSize: 0.06, bevelSegments: 3, curveSegments: 24 }); L.normUV(geo); const m = new THREE.Mesh(geo, wm); m.rotation.x = -Math.PI / 2; m.position.set(x, 0.1, z); m.rotation.z = ry; return m; };
    const handle = (s, w0, w1, len) => { s.moveTo(-w0 / 2, 0); s.lineTo(-w1 / 2, len); };
    const fork = new THREE.Shape(); fork.moveTo(-0.55, 0); fork.quadraticCurveTo(-0.65, 5, -0.45, 9); fork.quadraticCurveTo(-1.3, 10.5, -1.3, 12.2); fork.lineTo(-1.3, 16); fork.lineTo(-0.95, 16); fork.lineTo(-0.95, 13); fork.lineTo(-0.6, 13); fork.lineTo(-0.6, 16); fork.lineTo(-0.2, 16); fork.lineTo(-0.2, 13); fork.lineTo(0.2, 13); fork.lineTo(0.2, 16); fork.lineTo(0.6, 16); fork.lineTo(0.6, 13); fork.lineTo(0.95, 13); fork.lineTo(0.95, 16); fork.lineTo(1.3, 16); fork.lineTo(1.3, 12.2); fork.quadraticCurveTo(1.3, 10.5, 0.45, 9); fork.quadraticCurveTo(0.65, 5, 0.55, 0); fork.quadraticCurveTo(0, -0.4, -0.55, 0);
    const knife = new THREE.Shape(); knife.moveTo(-0.6, 0); knife.lineTo(-0.5, 8.5); knife.lineTo(-0.9, 9.2); knife.lineTo(-0.9, 16.2); knife.quadraticCurveTo(0.9, 15.6, 0.9, 13.5); knife.lineTo(0.9, 9); knife.lineTo(0.5, 8.5); knife.lineTo(0.6, 0); knife.quadraticCurveTo(0, -0.4, -0.6, 0);
    const spoon = new THREE.Shape(); spoon.moveTo(-0.55, 0); spoon.quadraticCurveTo(-0.6, 6, -0.45, 9.4); spoon.bezierCurveTo(-2.2, 10, -2.2, 16, 0, 16.2); spoon.bezierCurveTo(2.2, 16, 2.2, 10, 0.45, 9.4); spoon.quadraticCurveTo(0.6, 6, 0.55, 0); spoon.quadraticCurveTo(0, -0.4, -0.55, 0);
    g.add(piece(fork, 0.05, -5, 8), piece(knife, 0.02, 0, 8.3), piece(spoon, -0.04, 5.5, 8));
    return L.shadowAll(g);
  }, 'az=0&el=70'],
  // Pizzi di carta bianchi: tondo e rettangolare
  'doilies': [() => {
    const g = G();
    const disc = (r, round, color, y) => { const m = new THREE.Mesh(round ? new THREE.CircleGeometry(r, 128) : new THREE.PlaneGeometry(r * 2, r * 1.45), new THREE.MeshStandardMaterial({ color, alphaMap: laceTex(round), alphaTest: 0.5, roughness: 0.85, side: THREE.DoubleSide })); m.rotation.x = -Math.PI / 2; m.position.y = y; m.castShadow = true; return m; };
    g.add(at(disc(13, true, '#fbfbf8', 0.06), -8, 0, 0), at(disc(12, false, '#fbfbf8', 0.08), 15, 0, 4, -0.15), at(disc(9, true, '#fbfbf8', 0.1), -4, 0, 9));
    g.userData.noContact = true; return g;
  }, 'az=0&el=64'],
  // Pizzi in carta paglia 90 g
  'doilies-straw': [() => {
    const g = G(); const tx = canvasTex(256, 256, (x, W, H) => L.paperFill(x, W, H, '#d8c792', { grain: 10, fibers: 200 }));
    const disc = (r, round, y) => { const m = new THREE.Mesh(round ? new THREE.CircleGeometry(r, 128) : new THREE.PlaneGeometry(r * 2, r * 1.45), new THREE.MeshStandardMaterial({ map: tx, alphaMap: laceTex(round), alphaTest: 0.5, roughness: 0.85, side: THREE.DoubleSide })); m.rotation.x = -Math.PI / 2; m.position.y = y; m.castShadow = true; return m; };
    g.add(at(disc(12, true, 0.06), -8, 0, 0), at(disc(11, false, 0.08), 14, 0, 4, -0.15));
    g.userData.noContact = true; return g;
  }, 'az=0&el=64'],
  // Fogli in polipropilene trasparente
  'pp-sheets': [() => {
    const g = G();
    for (let i = 0; i < 3; i++) {
      const sh = sheets(37.5, 25, 2, { color: '#dfeef5', rough: 0.06, opacity: 0.42, physical: { clearcoat: 1, clearcoatRoughness: 0.05, metalness: 0.0, specularIntensity: 1 }, t: 0.08, curl: i === 2 ? 5 : 0 });
      const e = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(37.5, 0.16, 25)), new THREE.LineBasicMaterial({ color: '#ffffff', transparent: true, opacity: 0.9 })); e.position.y = 0.08; sh.add(e);
      g.add(at(sh, i * 3.2 - 3, i * 0.2, i * 2.4 - 2, 0.1 - i * 0.07));
    }
    return g;
  }, 'az=16&el=40'],
  // Carte da incarto: varianti per tinta e trasparenza
  'paper-vegetale': [() => G().add(at(sheets(25, 37, 14, { color: '#f3f3ee', rough: 0.35, opacity: 0.88, curl: 4.5 }), 0, 0, 0, 0.1)), 'az=18&el=40'],
  'paper-kraft-white': [() => G().add(at(sheets(25, 37, 16, { color: '#f2efe6', fibers: 260, curl: 4.5 }), 0, 0, 0, 0.1)), 'az=18&el=40'],
  'paper-velina': [() => G().add(at(sheets(25, 37, 18, { color: '#fafaf7', rough: 0.9, opacity: 0.92, t: 0.02, curl: 5 }), 0, 0, 0, 0.1)), 'az=18&el=40'],
  'paper-pelleaglio': [() => G().add(at(sheets(25, 37, 14, { color: '#f6f3ea', rough: 0.4, opacity: 0.8, t: 0.02, curl: 4.5 }), 0, 0, 0, 0.1)), 'az=18&el=40'],
  // Insalatiera rettangolare in PET con coperchio
  'pet-rect': [() => {
    const g = G(); const pet = () => new THREE.MeshPhysicalMaterial({ color: '#ffffff', roughness: 0.05, transmission: 0.95, thickness: 0.15, transparent: true, opacity: 0.45, side: THREE.DoubleSide, clearcoat: 1 });
    const tub = (w, d, h) => { const geo = new THREE.CylinderGeometry(Math.hypot(w, d) / 2, Math.hypot(w, d) / 2 * 0.86, h, 4, 1, true); geo.rotateY(Math.PI / 4); geo.scale(1, 1, d / w); const m = new THREE.Mesh(geo, pet()); m.position.y = h / 2;
      const base = new THREE.Mesh(new THREE.BoxGeometry(w * 0.86 / Math.SQRT2 * 1.41, 0.06, d * 0.86), pet()); base.position.y = 0.03; const lip = new THREE.Mesh(new RoundedBoxGeometry(w * 1.04, 0.25, d * 1.04, 2, 0.1), pet()); lip.position.y = h; return G().add(m, base, lip); };
    g.add(at(tub(17, 12, 6), -9, 0, 0, 0.1));
    const lid = new THREE.Mesh(new RoundedBoxGeometry(17.6, 1.4, 12.6, 3, 0.5), pet()); lid.position.set(10, 0.7, 6); lid.rotation.y = -0.15; g.add(lid);
    g.traverse(n => { if (n.isMesh) n.castShadow = true; }); return g;
  }, 'az=14&el=30'],
  // Sac à poche: due sacche in PE, una trasparente e una azzurra, con punta tagliata
  'piping-bag2': [() => {
    const g = G();
    const bag = (color, opacity, len, wTop) => {
      const geo = new THREE.CylinderGeometry(wTop, 0.55, len, 96, 24, true); const p = geo.attributes.position;
      for (let i = 0; i < p.count; i++) { const y = p.getY(i), t = (y + len / 2) / len; p.setZ(i, p.getZ(i) * (0.16 + 0.1 * t)); p.setX(i, p.getX(i) * (1 + 0.04 * Math.sin(t * 9))); }
      geo.computeVertexNormals();
      const m = new THREE.Mesh(geo, new THREE.MeshPhysicalMaterial({ color, roughness: 0.32, transmission: opacity < 1 ? 0.6 : 0, transparent: opacity < 1, opacity, clearcoat: 0.8, side: THREE.DoubleSide, thickness: 0.05 }));
      m.rotation.z = Math.PI / 2; m.position.y = wTop * 0.18 + 0.2; return G().add(m);
    };
    g.add(at(bag('#3d8fd1', 1, 46, 11), 0, 0, -6, 0.12), at(bag('#f3f7f8', 0.7, 40, 9.5), 3, 0.3, 7, -0.16));
    L.shadowAll(g); return g;
  }, 'az=6&el=46'],
  // Contenitori Hot in polpa di cellulosa: ciotola e coperchio
  'pulp-bowl': [() => {
    const g = G(); const pulp = new THREE.MeshStandardMaterial({ color: '#f1efe8', roughness: 0.92, map: canvasTex(256, 256, (x, W, H) => L.paperFill(x, W, H, '#f1efe8', { grain: 9 }), 3, 3), side: THREE.DoubleSide });
    const prof = [[0, 0], [5.6, 0], [6.2, 0.4], [8.1, 6.6], [8.9, 6.9], [9.0, 7.2], [8.75, 7.25], [7.9, 6.95], [5.9, 0.75], [0, 0.75]].map(([a, b]) => new THREE.Vector2(a, b));
    const bowl = new THREE.Mesh(new THREE.LatheGeometry(prof, 128), pulp); g.add(at(bowl, -7, 0, 0));
    const lp = [[0, 1.0], [6.5, 1.0], [7.2, 0.9], [8.6, 0.25], [9.2, 0.2], [9.25, 0], [8.9, 0], [8.4, 0.12], [7.1, 0.65], [0, 0.75]].map(([a, b]) => new THREE.Vector2(a, b));
    const lid = new THREE.Mesh(new THREE.LatheGeometry(lp, 128), pulp); g.add(at(lid, 11, 0, 5));
    return L.shadowAll(g);
  }, 'az=14&el=30'],
  // Palette, forchettine e palettine in legno (formati piccoli)
  'wood-small': [() => {
    const g = G(); const wm = mat(woodTex('#dcc099'), 0.7);
    const piece = (shape, x, z, ry) => { const geo = new THREE.ExtrudeGeometry(shape, { depth: 0.12, bevelEnabled: true, bevelThickness: 0.04, bevelSize: 0.04, bevelSegments: 2, curveSegments: 24 }); L.normUV(geo); const m = new THREE.Mesh(geo, wm); m.rotation.x = -Math.PI / 2; m.rotation.z = ry; m.position.set(x, 0.08, z); return m; };
    const stick = new THREE.Shape(); stick.moveTo(-0.3, 0.3); stick.absarc(0, 0.3, 0.3, Math.PI, 0, false); stick.lineTo(0.3, 8.7); stick.absarc(0, 8.7, 0.3, 0, Math.PI, false); stick.lineTo(-0.3, 0.3);
    const paddle = new THREE.Shape(); paddle.moveTo(-0.35, 0); paddle.lineTo(0.35, 0); paddle.lineTo(0.35, 6); paddle.quadraticCurveTo(1.1, 6.4, 1.1, 8.2); paddle.quadraticCurveTo(1.1, 9.5, 0, 9.5); paddle.quadraticCurveTo(-1.1, 9.5, -1.1, 8.2); paddle.quadraticCurveTo(-1.1, 6.4, -0.35, 6); paddle.lineTo(-0.35, 0);
    const fork = new THREE.Shape(); fork.moveTo(-0.3, 0); fork.lineTo(0.3, 0); fork.lineTo(0.3, 5.6); fork.lineTo(0.75, 6.4); fork.lineTo(0.75, 8.5); fork.lineTo(0.2, 8.5); fork.lineTo(0.2, 7.2); fork.lineTo(-0.2, 7.2); fork.lineTo(-0.2, 8.5); fork.lineTo(-0.75, 8.5); fork.lineTo(-0.75, 6.4); fork.lineTo(-0.3, 5.6); fork.lineTo(-0.3, 0);
    [[stick, -6, 0.1], [stick, -4.6, 0.04], [paddle, -1.6, -0.03], [paddle, 1.5, 0.05], [fork, 4.8, -0.02], [fork, 7.6, 0.06]].forEach(([sh, x, r]) => g.add(piece(sh, x, 4.5, r)));
    return L.shadowAll(g);
  }, 'az=0&el=70'],
  // Carte da incarto assortite: vegetale, kraft bianca, velina, pelleaglio
  'paper-assortment': [() => {
    const g = G();
    const specs = [{ color: '#f3f3ee', rough: 0.35, opacity: 0.9 }, { color: '#efe9dc', fibers: 260 }, { color: '#fafaf7', rough: 0.9, opacity: 0.94, t: 0.02 }, { color: '#f4efe2', rough: 0.4, opacity: 0.85, t: 0.02 }];
    specs.forEach((sp, i) => g.add(at(sheets(25, 37, 10, { ...sp, curl: i === 3 ? 4 : 0 }), (i - 1.5) * 7, i * 0.35, (i - 1.5) * -2.5, 0.25 - i * 0.12)));
    return g;
  }, 'az=14&el=44'],
};
