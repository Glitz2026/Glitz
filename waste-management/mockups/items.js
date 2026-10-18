// Articoli ricostruiti in 3D quando la foto sorgente non è utilizzabile (ambientata o non scontornabile).
// Forme, colori e proporzioni seguono i dati del catalogo (formati e colori documentati).
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import * as L from './lib.js';
const { NAVY, GREEN, WHITE, INK_LIGHT, PAPERS, symbol, spaced, lockup, pattern } = L;
const G = () => new THREE.Group();
const at = (o, x = 0, y = 0, z = 0, ry = 0) => { o.position.set(x, y, z); o.rotation.y = ry; return o; };

// texture tessuto: spunlace (effetto lino) o TNT (fibre)
function fabricTex(color, kind = 'linen', size = 512) {
  const [c, x] = L.cnv(size, size); L.paperFill(x, size, size, color, { grain: kind === 'tnt' ? 10 : 6 });
  x.globalAlpha = kind === 'tnt' ? 0.05 : 0.07;
  if (kind === 'linen') {
    for (let i = 0; i < size; i += 3) { x.fillStyle = i % 6 ? '#000' : '#fff'; x.fillRect(0, i, size, 1); x.fillRect(i, 0, 1, size); }
  } else {
    for (let i = 0; i < 2200; i++) { x.strokeStyle = Math.random() > .5 ? '#000' : '#fff'; x.lineWidth = 0.8; const px = Math.random() * size, py = Math.random() * size, a = Math.random() * 6.28, l = 6 + Math.random() * 14; x.beginPath(); x.moveTo(px, py); x.quadraticCurveTo(px + Math.cos(a + 1) * l, py + Math.sin(a + 1) * l, px + Math.cos(a) * l * 1.6, py + Math.sin(a) * l * 1.6); x.stroke(); }
  }
  x.globalAlpha = 1;
  const t = L.tex(c, 2, 2); t.anisotropy = 16; return t;
}
const fabricMat = (color, kind) => new THREE.MeshStandardMaterial({ map: fabricTex(color, kind), roughness: 0.95, sheen: 1 });

// tessuto piegato: pannello con bordi arrotondati, eventuale lembo sollevato
function folded(w, d, t, color, kind = 'linen', { corner = false } = {}) {
  const g = G();
  const m = new THREE.Mesh(new RoundedBoxGeometry(w, t, d, 4, t * 0.48), fabricMat(color, kind));
  m.position.y = t / 2; g.add(m);
  if (corner) { // angolo sollevato per mostrare la morbidezza
    const sh = new THREE.Shape([new THREE.Vector2(0, 0), new THREE.Vector2(w * 0.32, 0), new THREE.Vector2(0, d * 0.32)]);
    const f = new THREE.Mesh(new THREE.ShapeGeometry(sh), new THREE.MeshStandardMaterial({ map: fabricTex(color, kind), roughness: 0.95, side: THREE.DoubleSide }));
    f.rotation.x = -Math.PI / 2 + 0.5; f.position.set(-w / 2 + 0.2, t + 0.05, d / 2 - 0.2); f.rotation.z = 0; g.add(f);
  }
  return L.shadowAll(g);
}
function stack(items, w, d, t, kind, fan = 0.22) {
  const g = G(); let y = 0;
  items.forEach((col, i) => { const f = folded(w, d, t, col, kind); f.position.set((i - items.length / 2) * fan * 2, y, (i - items.length / 2) * -fan); f.rotation.y = (i - items.length / 2) * 0.05; g.add(f); y += t * 0.96; });
  return g;
}

// ------------------------------------------------------------------ articoli
export const ITEMS = {
  // Tovagliolo soft touch 40 × 40 piegato in quattro: bianco e tonalità effetto lino documentate
  'napkin-softtouch': [() => stack(['#f4f2ec', '#9fb7c9', '#a9a9a6', '#8a6a52', '#7b2f37', '#b7a99a', '#8fa486'], 20, 20, 0.55, 'linen', 0.9), 'az=24&el=30'],
  // Tovaglie in TNT piegate, colori della gamma
  'tnt-tablecloths': [() => stack(['#f4f2ec', '#e9dfc8', '#c8102e', '#7b2335', '#1f3f8f', '#7fb1d9', '#f2c230', '#3d6b3a', '#1d1d1d'], 28, 21, 0.7, 'tnt', 1.0), 'az=22&el=30'],
  // Runner in TNT 40 × 120: due rotoli parzialmente svolti
  'tnt-runner': [() => {
    const g = G();
    [['#c8102e', -6], ['#1f3f8f', 7]].forEach(([col, z]) => {
      const strip = folded(22, 40, 0.18, col, 'tnt'); strip.position.set(0, 0, z * 2.2); g.add(strip);
      const roll = new THREE.Mesh(new THREE.CylinderGeometry(2.4, 2.4, 22, 48), fabricMat(col, 'tnt')); roll.rotation.z = Math.PI / 2; roll.position.set(0, 2.4, z * 2.2 - 20 - 2.2); roll.castShadow = true; g.add(roll);
    });
    return L.shadowAll(g);
  }, 'az=28&el=34'],
  // Tovaglietta in TNT 30 × 40 con piatto e posate di servizio
  'tnt-placemat': [() => {
    const g = G();
    [['#1f3f8f', -3, 0.15, 0], ['#c8102e', 6, -0.12, 0.16]].forEach(([col, x, r, y]) => { const p = folded(40, 30, 0.12, col, 'tnt'); p.position.set(x, y, x * 0.6); p.rotation.y = r; g.add(p); });
    return g;
  }, 'az=8&el=52'],
  // Coordinato soft touch: tovaglia piegata + tovaglioli in tinta
  'softtouch-set': [() => {
    const g = G();
    g.add(at(stack(['#f4f2ec', '#f4f2ec', '#f4f2ec'], 30, 22, 0.8, 'linen', 0.3), -6, 0, 0));
    g.add(at(stack(['#9fb7c9', '#9fb7c9'], 20, 20, 0.55, 'linen', 0.4), 14, 0, 8, -0.3));
    return g;
  }, 'az=22&el=32'],
  // Posacenere in carta Ø 9,5 cm
  'paper-ashtray': [() => {
    const g = G(), r = 4.75, h = 3.2;
    const side = new THREE.Mesh(new THREE.CylinderGeometry(r, r * 0.97, h, 64, 1, true), L.paperMat(L.faceTex(30, 3.2, PAPERS.white, null, { edges: false }), { kind: 'white' })); side.position.y = h / 2; g.add(side);
    const inner = new THREE.Mesh(new THREE.CylinderGeometry(r - 0.08, r * 0.97 - 0.08, h, 64, 1, true), L.plainMat('#f6f6f2', { side: THREE.BackSide })); inner.position.y = h / 2; g.add(inner);
    const base = new THREE.Mesh(new THREE.CircleGeometry(r - 0.2, 64), L.plainMat('#3e9fd6', { roughness: 0.9 })); base.rotation.x = -Math.PI / 2; base.position.y = 0.6; g.add(base);
    for (let i = 0; i < 3; i++) { const a = i * Math.PI * 2 / 3; const n = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.9, 0.5), L.plainMat('#ecebe6')); n.position.set(Math.cos(a) * r, h - 0.3, Math.sin(a) * r); n.rotation.y = -a; g.add(n); }
    const rim = new THREE.Mesh(new THREE.TorusGeometry(r, 0.07, 8, 64), L.plainMat('#f3f2ee')); rim.rotation.x = Math.PI / 2; rim.position.y = h; g.add(rim);
    return L.shadowAll(g);
  }, 'az=20&el=34'],
  // Bicchieri trasparenti in rPET (formato basso e alto)
  'rpet-cups': [() => {
    const g = G();
    const cup = (rTop, rBot, h) => {
      const prof = [[rBot * 0.2, 0], [rBot, 0], [rBot + 0.02, 0.3], [rTop, h], [rTop + 0.18, h + 0.05], [rTop + 0.18, h + 0.22], [rTop - 0.04, h + 0.22]].map(([a, b]) => new THREE.Vector2(a, b));
      const m = new THREE.Mesh(new THREE.LatheGeometry(prof, 96), new THREE.MeshPhysicalMaterial({ color: 0xffffff, transmission: 1, roughness: 0.04, thickness: 0.2, ior: 1.5, transparent: true, opacity: 0.55, side: THREE.DoubleSide, clearcoat: 1 }));
      const o = G().add(m);
      for (let k = 1; k < 6; k++) { const ring = new THREE.Mesh(new THREE.TorusGeometry(rBot + (rTop - rBot) * (k / 6), 0.02, 6, 96), new THREE.MeshPhysicalMaterial({ color: 0xffffff, transparent: true, opacity: 0.35, roughness: 0.1 })); ring.rotation.x = Math.PI / 2; ring.position.y = h * k / 6; o.add(ring); }
      o.traverse(n => { if (n.isMesh) n.userData.noShadow = false; });
      return o;
    };
    g.add(at(cup(4.7, 3.0, 12.5), -5.5, 0, 0), at(cup(4.7, 3.0, 15.5), 5.5, 0, -3));
    g.traverse(n => { if (n.isMesh) { n.castShadow = true; } });
    return g;
  }, 'az=12&el=12'],
  // Carta politenata: risma di fogli con angolo sollevato
  'paper-stack': [() => {
    const g = G();
    const sheet = new THREE.Mesh(new RoundedBoxGeometry(25, 1.4, 37, 2, 0.1), L.paperMat(L.faceTex(25, 37, PAPERS.white, (x, W, H) => { x.fillStyle = 'rgba(255,255,255,0.35)'; x.fillRect(0, 0, W, H); }, { edges: false }), { kind: 'white', rough: 0.45 }));
    sheet.position.y = 0.7; g.add(sheet);
    const top = new THREE.PlaneGeometry(25, 37, 20, 20); const p = top.attributes.position;
    for (let i = 0; i < p.count; i++) { const xx = p.getX(i) + 12.5, yy = p.getY(i) + 18.5; const d = Math.max(0, 1 - (xx + (37 - yy)) / 16); p.setZ(i, d * d * 4.5); }
    top.computeVertexNormals();
    const s2 = new THREE.Mesh(top, new THREE.MeshPhysicalMaterial({ color: '#fbfbf8', roughness: 0.3, clearcoat: 0.6, side: THREE.DoubleSide })); s2.rotation.x = -Math.PI / 2; s2.position.y = 1.45; g.add(s2);
    return L.shadowAll(g);
  }, 'az=18&el=40'],
  // Sac à poche: cono in PE semitrasparente
  'piping-bag': [() => {
    const g = G();
    const bag = (col, len) => {
      const geo = new THREE.ConeGeometry(6.5, len, 96, 1, true); const p = geo.attributes.position;
      for (let i = 0; i < p.count; i++) p.setZ(i, p.getZ(i) * 0.5);
      geo.computeVertexNormals();
      const m = new THREE.Mesh(geo, new THREE.MeshPhysicalMaterial({ color: col, roughness: 0.45, side: THREE.DoubleSide, clearcoat: 0.5, sheen: 0.3 }));
      m.rotation.z = Math.PI / 2 + 0.08; m.position.y = 3.8; return G().add(m);
    };
    g.add(at(bag('#2f8fd6', 46), 0, 0, -4, 0.15), at(bag('#e6f0f5', 40), 2, 0, 6, -0.2));
    L.shadowAll(g); g.traverse(n => { if (n.isMesh) n.receiveShadow = false; });
    return g;
  }, 'az=8&el=40'],
};

// ------------------------------------------------------------------ coordinati (stessa identità su più supporti)
function napkinPrinted(identity) {
  const [c, x] = L.cnv(20 * L.PX, 20 * L.PX); L.paperFill(x, c.width, c.height, identity.paper, { grain: 4 });
  x.globalAlpha = 0.1; for (let i = 0; i < c.width; i += 7) { x.fillStyle = '#000'; x.fillRect(i, 0, 1, c.height); } x.globalAlpha = 1;
  identity.mark(x, c.width * 0.72, c.height * 0.72, c.width * 0.22);
  const m = new THREE.Mesh(new RoundedBoxGeometry(20, 0.9, 20, 4, 0.4), [L.plainMat(identity.paper), L.plainMat(identity.paper), new THREE.MeshStandardMaterial({ map: L.tex(c), roughness: 0.9 }), L.plainMat(identity.paper), L.plainMat(identity.paper), L.plainMat(identity.paper)]);
  m.position.y = 0.45; return L.shadowAll(G().add(m));
}
export const IDENTITIES = {
  waste: { paper: '#f6f5f0', ink: NAVY, accent: GREEN, mark: (x, cx, cy, s) => symbol(x, cx, cy, s, NAVY) },
  mint: { paper: '#e3efe8', ink: NAVY, accent: NAVY, mark: (x, cx, cy, s) => symbol(x, cx, cy, s, GREEN) },
};
export { napkinPrinted };
