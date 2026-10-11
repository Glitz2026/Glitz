  // ---------- colori di scena ----------
  const COL = {
    farm: hex('#77744a'), farm2: hex('#8a8250'), farm3: hex('#6b7446'), plow: hex('#8b6f50'), crop: hex('#7a9a48'), dry: hex('#ab9f68'),
    garden: hex('#6d8148'), lane: hex('#a59779'), macchia: hex('#8b875a'), earth: hex('#a8987a'), paved: hex('#bdb6a8'),
    track: hex('#a9513f'), infield: hex('#6f8c45'), line: hex('#ece6da'),
    gravel: hex('#8f877a'), asphalt: hex('#3b3a3c'), asphalt2: hex('#4a4846'), sand: hex('#dccba5'), foam: hex('#d9e4e2'),
    sea: hex('#1d5a6e'), pool: hex('#3aa0b8'), pineFloor: hex('#5b6140'), rescue: hex('#7a4a3f'),
    truss: hex('#2a2a2e'), steel: hex('#6d6e74'), black: hex('#161518'), deck: hex('#232126'), fabric: hex('#d9d6d0'),
    gold: hex('#d9a857'), goldLed: hex('#ffcf7a'), ivory: hex('#efe6d6'), white: hex('#f4f2ee'), teal: hex('#46b3c4'),
    fence: hex('#c9c6be'), container: hex('#6f7b83'), truck: hex('#d8d8d4'), red: hex('#c8453a'), green: hex('#3fc07a'),
    wood: hex('#8a6a48'), lounge: hex('#e8dcc4'), wall: hex('#e8dfcf'), wall2: hex('#dccbab'), roof: hex('#b4553a'),
    pine: hex('#3c5530'), olive: hex('#76804f'), oak: hex('#4d6234'), toilet: hex('#3f6f8f'), blueBay: hex('#2f5d9a')
  };
  const CAR_COLS = ['#e9e9e6', '#1d1d20', '#8d9197', '#9a2f2a', '#2f4a6b', '#c9c3b5', '#5b6a5c', '#b9bcc0'].map(hex);

  // ---------- IL SITO: campo sportivo di Scalea, via Gaetano Scirea ----------
  const LABELS = [];
  function label(name, pos, key) { LABELS.push({ name, pos, key: key || '' }); }

  // pista: due semicerchi (centri z 34 e z 102) raccordati da rettilinei; raggio esterno 52 m, interno 44 m
  const OV = { zN: 34, zS: 102, R: 52, r: 44 };
  const SHORE = (z) => -330 + 6 * Math.sin(z / 90) + 3 * Math.sin(z / 37 + 1);
  // recinzione dell'arena (poligono convesso): il palco chiude il lato nord
  const FENCE = [[-24, -4], [-64, -4], [-64, 150], [-40, 180], [40, 180], [64, 150], [64, -4], [24, -4]];
  const LITE = { on: false };

  function stadium(r, seg) {
    const pts = [];
    for (let i = 0; i <= seg; i++) { const t = Math.PI - Math.PI * i / seg; pts.push([r * Math.cos(t), OV.zN - r * Math.sin(t)]); }
    for (let i = 0; i <= seg; i++) { const t = -Math.PI * i / seg; pts.push([r * Math.cos(t), OV.zS - r * Math.sin(t)]); }
    pts.push(pts[0]);
    return pts;
  }
  function insideStad(x, z, r) {
    if (z >= OV.zN && z <= OV.zS) return Math.abs(x) < r;
    return Math.hypot(x, z - (z < OV.zN ? OV.zN : OV.zS)) < r;
  }
  function fan(pts, y, col, kind) {
    let cx = 0, cz = 0; pts.forEach((p) => { cx += p[0]; cz += p[1]; }); cx /= pts.length; cz /= pts.length;
    for (let i = 0; i < pts.length; i++) { const a = pts[i], b = pts[(i + 1) % pts.length]; tri([cx, y, cz], [a[0], y, a[1]], [b[0], y, b[1]], col, kind || 0); }
  }
  function band(p0, p1, y, col, kind) {
    for (let i = 0; i < p0.length - 1; i++) quad([p0[i][0], y, p0[i][1]], [p0[i + 1][0], y, p0[i + 1][1]], [p1[i + 1][0], y, p1[i + 1][1]], [p1[i][0], y, p1[i][1]], col, kind || 0);
  }
  // nastro di larghezza w lungo una polilinea
  function strip(pts, w, y, col, kind) {
    for (let i = 0; i < pts.length - 1; i++) {
      const a = pts[i], b = pts[i + 1], dx = b[0] - a[0], dz = b[1] - a[1], l = Math.hypot(dx, dz) || 1, nx = -dz / l * w / 2, nz = dx / l * w / 2;
      quad([a[0] + nx, y, a[1] + nz], [b[0] + nx, y, b[1] + nz], [b[0] - nx, y, b[1] - nz], [a[0] - nx, y, a[1] - nz], col, kind || 0);
    }
  }
  // tratteggio lungo un segmento
  function dashes(a, b, w, on, off, y, col, kind) {
    const dx = b[0] - a[0], dz = b[1] - a[1], l = Math.hypot(dx, dz), ux = dx / l, uz = dz / l;
    for (let s = 0; s < l - on; s += on + off) strip([[a[0] + ux * s, a[1] + uz * s], [a[0] + ux * (s + on), a[1] + uz * (s + on)]], w, y, typeof col === 'function' ? col(s) : col, kind);
  }
  // alone di luce a terra, visibile solo di notte (kind 9)
  // ellittico (rx, rz) per restare sulla carreggiata
  function pool(x, z, rx, rz, y, ground) {
    const seg = 12;
    for (let i = 0; i < seg; i++) {
      const t0 = i / seg * 6.2832, t1 = (i + 1) / seg * 6.2832;
      tri([x, y, z], [x + Math.cos(t0) * rx, y, z + Math.sin(t0) * rz], [x + Math.cos(t1) * rx, y, z + Math.sin(t1) * rz], ground, 9, [0, 0], [Math.cos(t0), Math.sin(t0)], [Math.cos(t1), Math.sin(t1)]);
    }
  }
  // chioma arrotondata a tre anelli
  function dome(x, y0, z, r, h, seg, col, kind) {
    const rings = [[0.6, 0], [1, 0.35], [0.72, 0.78]], top = [x, y0 + h, z];
    const shade = [col.map((v) => v * 0.72), col, col.map((v) => Math.min(1, v * 1.1))];
    const P0 = (k, t) => [x + Math.cos(t) * r * rings[k][0], y0 + h * rings[k][1], z + Math.sin(t) * r * rings[k][0]];
    for (let i = 0; i < seg; i++) {
      const t0 = i / seg * 6.2832 + x, t1 = (i + 1) / seg * 6.2832 + x;
      quad(P0(0, t0), P0(0, t1), P0(1, t1), P0(1, t0), shade[0], kind || 0);
      quad(P0(1, t0), P0(1, t1), P0(2, t1), P0(2, t0), shade[1], kind || 0);
      tri(P0(2, t0), P0(2, t1), top, shade[2], kind || 0);
    }
  }
  function pine(x, z, h, r) {
    if (!LITE.on) cyl([x, 0, z], [x, h - 1.2, z], 0.28, 4, hex('#5a4632'));
    dome(x, h - 2.2, z, r, 2.6, 7, hash2(x, z) > 0.5 ? COL.pine : hex('#46603a'));
  }
  function roundTree(x, z, s, col) {
    box(x, 0, z, 0.35, 1.4 * s, 0.35, hex('#5a4632'));
    dome(x, 1.0 * s, z, 2.2 * s, 3 * s, 6, col || COL.oak);
  }
  function olive(x, z, s) {
    dome(x, 0.4, z, 1.9 * s, 2.6 * s, 6, hash2(x, z) > 0.5 ? COL.olive : hex('#6a7a46'));
  }
  // tetto a padiglione (coppi)
  function hipRoof(cx, y0, cz, w, d, h, ry, col) {
    if (w < d) { const t = w; w = d; d = t; ry += Math.PI / 2; }
    const c = Math.cos(ry), s = Math.sin(ry), rh = (w - d) / 2;
    const pt = (x, y, z) => [cx + x * c + z * s, y0 + y, cz - x * s + z * c];
    const a = pt(-w / 2, 0, d / 2), b = pt(w / 2, 0, d / 2), e = pt(w / 2, 0, -d / 2), f = pt(-w / 2, 0, -d / 2);
    const r0 = pt(-rh, h, 0), r1 = pt(rh, h, 0);
    const c2 = col.map((v) => v * 0.9);
    quad(a, b, r1, r0, col); quad(e, f, r0, r1, c2); tri(f, a, r0, c2); tri(b, e, r1, col);
  }
  function house(x, z, w, d, ry, floors) {
    const h = 3.1 * floors, wc = rnd() > 0.4 ? COL.wall : COL.wall2;
    box(x, 0, z, w, h, d, wc, 6, ry, [rnd(), 0]);
    const rc = COL.roof.map((v, i) => v * (0.88 + 0.22 * rnd()) + (i === 1 ? 0.02 * rnd() : 0));
    hipRoof(x, h, z, w + 0.8, d + 0.8, 1.7 + rnd() * 0.6, ry, rc);
  }
  function car(x, z, ry, col) {
    col = col || CAR_COLS[Math.floor(rnd() * CAR_COLS.length)];
    box(x, 0, z, 1.8, 1.05, 4.3, col, 0, ry);
    const c = Math.cos(ry), s = Math.sin(ry);
    box(x - s * 0.2, 1.05, z - c * 0.2, 1.6, 0.45, 2.3, col.map((v) => v * 0.62), 0, ry);
  }
  function lampPost(x, z, armDx, armDz, h) {
    h = h || 9;
    cyl([x, 0, z], [x, h, z], 0.12, 5, COL.steel);
    cyl([x, h, z], [x + armDx, h + 0.3, z + armDz], 0.07, 4, COL.steel);
    box(x + armDx, h, z + armDz, 0.9, 0.22, 0.5, COL.goldLed, 7, Math.atan2(armDx, armDz));
  }

  // zone già occupate (niente alberi o case)
  const EXCL = [];
  function excl(x0, z0, x1, z1) { EXCL.push([x0, z0, x1, z1]); }
  function isFree(x, z, m) { m = m || 0; return !EXCL.some((r) => x > r[0] - m && x < r[2] + m && z > r[1] - m && z < r[3] + m); }

  function buildTerrain() {
    // base agricola e prati
    flat(-330, -9000, 1600, 9000, -0.02, COL.farm3);
    flat(1600, -9000, 9000, 9000, -0.02, COL.farm3);
    // macchia e incolti tra la SS18 e via Scirea
    for (let x = -118; x < 89.5; x += 20.7) for (let z = -436; z < 211; z += 21.6) {
      const h = hash2(x * 0.03, z * 0.03);
      flat(x, z, Math.min(x + 20.7, 89.5), Math.min(z + 21.6, 211), 0, h > 0.5 ? COL.macchia : COL.macchia.map((v) => v * (0.92 + 0.08 * h)));
    }
    // pineta, spiaggia, mare
    flat(-243, -3000, -136, 3000, 0, COL.pineFloor);
    for (let z = -3000; z < 3000; z += 25) {
      const s0 = SHORE(z), s1 = SHORE(z + 25);
      quad([s0, 0.02, z], [-243, 0.02, z], [-243, 0.02, z + 25], [s1, 0.02, z + 25], COL.sand);
      quad([s0 - 3.5, -0.12, z], [s0, -0.12, z], [s1, -0.12, z + 25], [s1 - 3.5, -0.12, z + 25], COL.foam);
    }
    flat(-9000, -9000, -300, 9000, -0.2, COL.sea, 4);
    label('Mar Tirreno', [-720, 2, 40], 'geo');
    label('Spiaggia e lidi', [-292, 4, -60], 'geo');
    label('Pineta', [-190, 16, 150], 'geo');

    // monti a est (heightfield)
    const x0 = 1500, x1 = 8500, z0 = -7000, z1 = 7000, nx = 70, nz = 110;
    const H = (x, z) => {
      const d = Math.max(0, x - 1600) / 6700;
      const ridge = Math.pow(Math.min(1, d * 1.6), 1.15);
      return ridge * (420 + 1250 * fbm(z * 0.00045 + 3, x * 0.00045)) - 6;
    };
    const colAt = (h) => h < 120 ? hex('#5d6b3e') : h < 500 ? hex('#4a5a36') : h < 900 ? hex('#5b5f4a') : hex('#7b7868');
    for (let i = 0; i < nx; i++) for (let j = 0; j < nz; j++) {
      const xa = x0 + (x1 - x0) * i / nx, xb = x0 + (x1 - x0) * (i + 1) / nx;
      const za = z0 + (z1 - z0) * j / nz, zb = z0 + (z1 - z0) * (j + 1) / nz;
      const a = [xa, H(xa, za), za], b = [xb, H(xb, za), za], c = [xb, H(xb, zb), zb], d = [xa, H(xa, zb), zb];
      quad(a, b, c, d, colAt((a[1] + c[1]) / 2), 0);
    }
  }

  // campi, uliveti, serre e case a est di via Scirea; abitato a sud
  function buildCountryside() {
    seed = 404;
    const LN = 3, xs = [], zs = [];
    for (let x = 101; x < 1500;) { const w = 48 + Math.floor(hash2(x, 3.1) * 34); xs.push([x, x + w]); x += w + LN; }
    for (let z = -1400; z < 1400;) { const d = 56 + Math.floor(hash2(7.7, z) * 44); zs.push([z, z + d]); z += d + LN; }
    for (const [x, xe] of xs) for (const [z, ze] of zs) {
      if (z < -425 && ze > -440) continue;
      const near = x < 900 && z > -440 && z < 900, mid = x < 1200;
      const t = hash2(x * 0.013 + 1, z * 0.017);
      flat(x - LN, z - LN, xe, z, 0.008, COL.lane);
      flat(x - LN, z, x, ze, 0.008, COL.lane);
      const roadCut = (zz0, zz1) => !(ze < zz0 || z > zz1);
      if (roadCut(-438, -425) || roadCut(209, 221) || roadCut(328, 341) || (x < 337 && xe > 329)) { flat(x, z, xe, ze, 0.01, COL.dry); continue; }
      if (z < -440) {
        // Scalea: abitato a nord di via Po
        flat(x, z, xe, ze, 0.01, hex('#b7ad9c'));
        if (x < 1100) for (let k = 0; k < 6; k++) {
          const bx = x + 6 + rnd() * (xe - x - 12), bz = z + 6 + rnd() * (ze - z - 12), w = 9 + rnd() * 12, d = 9 + rnd() * 12;
          if (rnd() > 0.5) house(bx, bz, w, d, (rnd() - 0.5) * 0.15, 2 + Math.floor(rnd() * 2));
          else box(bx, 0, bz, w, 6 + rnd() * rnd() * 16, d, rnd() > 0.35 ? hex('#e6e0d4') : hex('#d8b98a'), 6, (rnd() - 0.5) * 0.2, [rnd(), 0]);
        }
        continue;
      }
      const W = xe - x, D = ze - z;
      const nearRoad = Math.abs(z - 215) < 140 || Math.abs(z - 334) < 120 || x < 200;
      const pHouse = nearRoad ? 0.42 : 0.26;
      if (t < pHouse) {
        // lotto con casa, giardino e alberi
        flat(x, z, xe, ze, 0.01, rnd() > 0.5 ? COL.garden : hex('#7c8650'));
        if (mid) {
          const n = near ? 1 + Math.floor(rnd() * 3) : 1;
          for (let k = 0; k < n; k++) {
            const hx = x + 9 + rnd() * (W - 18), hz = z + 9 + rnd() * (D - 18);
            house(hx, hz, 9 + rnd() * 7, 7 + rnd() * 5, (rnd() > 0.5 ? 0 : Math.PI / 2) + (rnd() - 0.5) * 0.08, rnd() > 0.55 ? 2 : 1);
            if (near && rnd() > 0.72) flat(hx + 8, hz - 3, hx + 15, hz + 1.5, 0.03, COL.pool, 4);
          }
          if (near) for (let k = 0; k < 7; k++) roundTree(x + 3 + rnd() * (W - 6), z + 3 + rnd() * (D - 6), 0.7 + rnd() * 0.5, rnd() > 0.5 ? COL.olive : COL.oak);
        }
      } else if (t < pHouse + 0.3) {
        flat(x, z, xe, ze, 0.01, hex('#8a8458'));
        if (near) for (let ox = x + 3; ox < xe - 2; ox += 6.5) for (let oz = z + 3; oz < ze - 2; oz += 6.5) olive(ox + rnd(), oz + rnd(), 0.85 + rnd() * 0.3);
      } else if (t < pHouse + 0.4) {
        flat(x, z, xe, ze, 0.01, COL.plow);
        if (near) for (let ox = x + 2; ox < xe; ox += 3.2) flat(ox, z + 1, ox + 1.1, ze - 1, 0.014, COL.plow.map((v) => v * 0.86));
      } else if (t < pHouse + 0.5) {
        flat(x, z, xe, ze, 0.01, COL.crop);
        if (near) for (let oz = z + 2; oz < ze; oz += 2.6) flat(x + 1, oz, xe - 1, oz + 0.9, 0.014, COL.crop.map((v) => v * 0.82));
      } else if (t < pHouse + 0.53) {
        flat(x, z, xe, ze, 0.01, COL.dry);
        if (near) for (let k = 0; k < 2; k++) box(x + 10 + k * 14, 0, z + D / 2, 10, 3.4, D - 12, hex('#eef0ee'), 0);
      } else if (t < pHouse + 0.62) {
        flat(x, z, xe, ze, 0.01, hex('#6c7f45'));
        if (near) for (let ox = x + 3; ox < xe - 2; ox += 5) for (let oz = z + 3; oz < ze - 2; oz += 5) roundTree(ox, oz, 0.55, hex('#46602f'));
      } else {
        flat(x, z, xe, ze, 0.01, t > 0.9 ? COL.dry : hex('#93905c'));
        if (near) for (let k = 0; k < 10; k++) olive(x + 3 + rnd() * (W - 6), z + 3 + rnd() * (D - 6), 0.9 + rnd() * 0.5);
      }
      // siepi e filari lungo le capezzagne
      if (near && hash2(x, z) > 0.55) for (let ox = x + 2; ox < xe; ox += 5.5) roundTree(ox, z - 1.5, 0.6 + rnd() * 0.3, COL.oak);
    }
    // abitato tra la strada a sud del campo e via del Mare, e oltre
    seed = 515;
    for (let x = -112; x < 60; x += 28) for (let z = 228; z < 760; z += 26) {
      if (z > 316 && z < 354) continue;
      if (x > -50 && x < 60 && z < 240) continue;
      flat(x, z, x + 27, z + 25, 0.01, rnd() > 0.5 ? COL.garden : hex('#7c8650'));
      if (rnd() > 0.15) house(x + 13.5 + (rnd() - 0.5) * 8, z + 12.5 + (rnd() - 0.5) * 6, 9 + rnd() * 6, 8 + rnd() * 4, (rnd() > 0.5 ? 0 : Math.PI / 2) + (rnd() - 0.5) * 0.1, rnd() > 0.6 ? 2 : 1);
      if (rnd() > 0.78) flat(x + 2, z + 2, x + 9, z + 6, 0.03, COL.pool, 4);
      for (let k = 0; k < 3; k++) if (rnd() > 0.35) roundTree(x + 2 + rnd() * 23, z + (rnd() > 0.5 ? 2 : 22) + rnd() * 2, 0.7 + rnd() * 0.4, rnd() > 0.5 ? COL.oak : COL.olive);
    }
    // campeggi e case tra SS18 e la pineta, a nord
    seed = 616;
    for (let z = -1400; z < -470; z += 26) for (let x = -232; x < -142; x += 22) {
      if (rnd() > 0.55) house(x + 11, z + 13, 8 + rnd() * 4, 6 + rnd() * 3, Math.PI / 2, 1);
      else pine(x + 11, z + 13, 11 + rnd() * 3, 4 + rnd());
    }
  }

  function buildCoast() {
    // pineta litoranea tra SS18 e spiaggia
    seed = 77;
    const accesses = [-431, -250, 120, 334.5, 520];
    const step = LITE.on ? 11 : 8.4;
    for (let z = -470; z < 1300; z += step) for (let x = -240; x < -140; x += step) {
      const px = x + (rnd() - 0.5) * 5, pz = z + (rnd() - 0.5) * 5;
      if (accesses.some((a) => Math.abs(pz - a) < 7)) continue;
      if (rnd() < 0.08) continue;
      pine(px, pz, 12 + rnd() * 5, 4 + rnd() * 1.6);
    }
    // accessi al mare
    for (const a of accesses) { flat(-243, a - 2.5, -136, a + 2.5, 0.05, a === -431 || a === 334.5 ? COL.asphalt : COL.lane); }
    // lidi: chiosco, passerella in legno e file di ombrelloni
    seed = 31;
    const tints = ['#f2efe8', '#e8a23a', '#2f6f9a', '#d9c39a', '#c4553e', '#3e8a8f', '#ffffff'].map(hex);
    for (let zc = -880; zc < 1000; zc += 118 + rnd() * 30) {
      if (accesses.some((a) => Math.abs(zc - a) < 30)) continue;
      const tint = tints[Math.floor(rnd() * tints.length)], roofC = rnd() > 0.5 ? COL.roof : hex('#e9e6df');
      box(-250, 0, zc, 7, 3.4, 16, COL.white, 6, 0, [rnd(), 0]);
      box(-250, 3.4, zc, 8, 0.4, 17, roofC);
      box(-246.4, 2.6, zc, 0.15, 0.25, 15, COL.goldLed, 7);
      flat(-246, zc - 7, -240, zc + 7, 0.04, COL.wood);
      const s = SHORE(zc);
      strip([[-246, zc], [s + 16, zc]], 1.6, 0.05, COL.wood);
      for (let ux = -258; ux > s + 17; ux -= 5.4) for (let uz = zc - 26; uz <= zc + 26; uz += 4.6) {
        if (Math.abs(uz - zc) < 1.5) continue;
        cyl([ux, 0, uz], [ux, 2.2, uz], 0.04, 3, COL.steel);
        cone(ux, 1.9, uz, 1.15, 0.55, 8, tint);
      }
    }
  }

  function buildRoads() {
    // SS18 · Corso Mediterraneo: due carreggiate e spartitraffico
    const ss = (z0, z1) => {
      flat(-136, z0, -128, z1, 0.06, COL.asphalt); flat(-126, z0, -118, z1, 0.06, COL.asphalt);
      flat(-128, z0, -126, z1, 0.07, hex('#6d7a4a'));
      dashes([-132, z0], [-132, z1], 0.18, 4, 6, 0.075, COL.line); dashes([-122, z0], [-122, z1], 0.18, 4, 6, 0.075, COL.line);
    };
    ss(-3000, 315); ss(354, 3000);
    for (let z = -1400; z < 1400; z += 36) {
      if (Math.abs(z - 334.5) < 26) continue;
      cyl([-127, 0, z], [-127, 10, z], 0.14, 5, COL.steel);
      for (const s of [-1, 1]) { cyl([-127, 10, z], [-127 + s * 2.6, 10.2, z], 0.06, 4, COL.steel); box(-127 + s * 2.7, 9.9, z, 0.9, 0.22, 0.5, COL.goldLed, 7); }
      if (z > -700 && z < 900) { pool(-132, z, 3.8, 9, 0.065, COL.asphalt); pool(-122, z, 3.8, 9, 0.065, COL.asphalt); }
    }
    label('SS18 · Corso Mediterraneo', [-127, 4, -60], 'mob');
    // rotatoria su via del Mare
    const rc = [-127, 334.5];
    const ring = (r) => { const p = []; for (let i = 0; i <= 40; i++) { const t = i / 40 * 6.2832; p.push([rc[0] + Math.cos(t) * r, rc[1] + Math.sin(t) * r]); } return p; };
    band(ring(19), ring(10), 0.06, COL.asphalt); fan(ring(10).slice(0, 40), 0.07, hex('#6d8148'));
    roundTree(rc[0], rc[1], 1.1, COL.oak);
    // via del Mare (verso est) e accesso al mare (verso ovest)
    flat(-108.5, 330, 1600, 339, 0.06, COL.asphalt); dashes([-108, 334.5], [1600, 334.5], 0.16, 4, 6, 0.075, COL.line);
    flat(-243, 331, -146, 338, 0.06, COL.asphalt);
    for (let x = -96; x < 900; x += 30) { lampPost(x, 340.6, 0, -1.6); if (x < 400) pool(x, 334.5, 9, 4.3, 0.065, COL.asphalt); }
    label('Via del Mare', [60, 3, 334.5], 'mob');
    // via Gaetano Scirea
    flat(89.5, -3000, 97, 3000, 0.06, COL.asphalt);
    dashes([93.25, -1400], [93.25, 1400], 0.15, 3, 5, 0.075, COL.line);
    for (let z = -700; z < 900; z += 30) { lampPost(98.6, z, -1.8, 0); if (z > -450 && z < 400) pool(93.25, z, 3.6, 9, 0.065, COL.asphalt); }
    label('Via Gaetano Scirea', [93, 3, -300], 'mob');
    // strada a sud del campo (accesso principale)
    flat(-118, 211, 89.5, 219, 0.06, COL.asphalt); dashes([-118, 215], [89.5, 215], 0.15, 3, 5, 0.075, COL.line);
    flat(97, 212.5, 900, 217.5, 0.06, COL.asphalt2);
    for (let x = -108; x < 88; x += 28) { lampPost(x, 209.6, 0, 1.8); pool(x, 215, 9, 3.8, 0.065, COL.asphalt); }
    // via Po a nord e via Fiume Lao a est
    flat(-118, -436, 1600, -427, 0.06, COL.asphalt); dashes([-118, -431.5], [1600, -431.5], 0.15, 3, 5, 0.075, COL.line);
    flat(-243, -434, -136, -428, 0.06, COL.asphalt);
    label('Via Po', [200, 3, -431], 'mob');
    flat(330, -427, 336, 330, 0.06, COL.asphalt2);
    // traffico
    seed = 909;
    for (let i = 0; i < (LITE.on ? 60 : 130); i++) {
      const z = -900 + rnd() * 1800; if (Math.abs(z - 334.5) < 30) continue;
      const lane = [-134, -130, -124, -120][Math.floor(rnd() * 4)];
      car(lane, z, lane < -127 ? Math.PI : 0);
    }
    for (let i = 0; i < 26; i++) { const z = -600 + rnd() * 1300; car(rnd() > 0.5 ? 91.4 : 95.1, z, rnd() > 0.5 ? 0 : Math.PI); }
    for (let i = 0; i < 18; i++) car(-90 + rnd() * 170, rnd() > 0.5 ? 213 : 217, Math.PI / 2);
    for (let i = 0; i < 30; i++) car(-100 + rnd() * 900, rnd() > 0.5 ? 332.3 : 336.7, Math.PI / 2);
  }

  function buildArena() {
    // fondo dell'area recintata e dell'area tecnica
    fan(FENCE, 0.02, COL.earth);
    flat(-64, -105, 64, -4, 0.02, COL.gravel);
    excl(-80, -112, 80, 205); excl(84, -112, 98, 205);
    // pista d'atletica, corsie e prato
    const seg = 36;
    band(stadium(OV.R, seg), stadium(OV.r, seg), 0.045, COL.track);
    for (let k = 1; k < 6; k++) { const r = OV.r + k * (OV.R - OV.r) / 6; band(stadium(r + 0.06, seg), stadium(r - 0.06, seg), 0.052, COL.line); }
    band(stadium(OV.r + 0.2, seg), stadium(OV.r - 0.2, seg), 0.054, COL.white);
    band(stadium(OV.R + 0.2, seg), stadium(OV.R - 0.1, seg), 0.054, COL.white);
    fan(stadium(OV.r, seg).slice(0, -1), 0.035, COL.infield);
    fan(stadium(43.6, seg).slice(0, -1), 0.04, COL.infield, 10);
    // segnature del campo di calcio (100 x 62)
    const pl = [[-31, 18], [31, 18], [31, 118], [-31, 118], [-31, 18]];
    strip(pl, 0.14, 0.04, COL.line); strip([[-31, 68], [31, 68]], 0.14, 0.04, COL.line);
    const cc = []; for (let i = 0; i <= 32; i++) { const t = i / 32 * 6.2832; cc.push([Math.cos(t) * 9.15, 68 + Math.sin(t) * 9.15]); }
    strip(cc, 0.14, 0.04, COL.line);
    label('Campo sportivo · pista e prato', [0, 2, 132], 'site');

    // recinzione con varchi e uscite di emergenza
    const segs = [
      [FENCE[0], FENCE[1], []], [FENCE[1], FENCE[2], [[40, 46], [96, 102], [128, 134]].map(([a, b]) => [(a + 4) / 154, (b + 4) / 154])],
      [FENCE[2], FENCE[3], []], [FENCE[3], FENCE[4], [[14 / 80, 66 / 80]]], [FENCE[4], FENCE[5], []],
      [FENCE[5], FENCE[6], [[128, 134], [96, 102], [40, 46]].map(([a, b]) => [(150 - b) / 154, (150 - a) / 154])], [FENCE[6], FENCE[7], []]
    ];
    segs.forEach(([a, b, gaps], si) => {
      const dx = b[0] - a[0], dz = b[1] - a[1], l = Math.hypot(dx, dz), ry = Math.atan2(dx, dz), n = Math.ceil(l / 3);
      for (let i = 0; i < n; i++) {
        const t = (i + 0.5) / n;
        if (gaps.some(([g0, g1]) => t > g0 && t < g1)) continue;
        box(a[0] + dx * t, 0, a[1] + dz * t, 0.25, 2.2, l / n, COL.fence, 0, ry);
      }
      if (si !== 3) gaps.forEach(([g0, g1]) => {
        const t = (g0 + g1) / 2;
        box(a[0] + dx * t, 2.5, a[1] + dz * t, 0.25, 0.8, (g1 - g0) * l, COL.green, 1, ry);
      });
    });
    label('Uscite di emergenza', [-68, 6, 99], 'safety');
    label('Uscite di emergenza', [68, 6, 99], 'safety');
    // area tecnica dietro il palco
    const bf = [[[-64, -4], [-64, -105]], [[-64, -105], [-12, -105]], [[12, -105], [64, -105]], [[64, -105], [64, -4]]];
    bf.forEach(([a, b]) => {
      const dx = b[0] - a[0], dz = b[1] - a[1], l = Math.hypot(dx, dz), ry = Math.atan2(dx, dz), n = Math.ceil(l / 3);
      for (let i = 0; i < n; i++) { const t = (i + 0.5) / n; box(a[0] + dx * t, 0, a[1] + dz * t, 0.2, 2.2, l / n, hex('#9aa0a2'), 0, ry); }
    });

    // transenne: privé, passerella e fronte palco
    for (let z = 2; z < 31; z += 2) for (const sx of [-26, 26]) box(sx, 0, z + 1, 0.5, 1.2, 2, COL.steel);
    for (let x = 7; x < 26; x += 2) for (const sg of [-1, 1]) box(sg * (x + 1), 0, 31, 2, 1.2, 0.5, COL.steel);
    for (let i = 0; i < 26; i++) { const a = Math.PI * (0.05 + 0.9 * i / 25); box(Math.cos(a) * 8.6, 0, 34 + Math.sin(a) * 8.6, 2, 1.2, 0.5, COL.steel, -a + Math.PI / 2); }
    for (let x = 26; x < 40; x += 2) for (const sg of [-1, 1]) box(sg * (x + 1), 0, 2.4, 2, 1.2, 0.5, COL.steel);
    // regia FOH
    box(0, 0, 62, 12, 0.6, 9, COL.deck);
    box(0, 0.6, 62, 10, 1.1, 1.2, COL.black);
    for (const sx of [-5.6, 5.6]) for (const sz of [58, 66]) cyl([sx, 0.6, sz], [sx, 4.6, sz], 0.1, 5, COL.steel);
    quad([-6.4, 4.6, 57.4], [6.4, 4.6, 57.4], [6.4, 5.8, 62], [-6.4, 5.8, 62], COL.fabric, 0);
    quad([-6.4, 5.8, 62], [6.4, 5.8, 62], [6.4, 4.6, 66.6], [-6.4, 4.6, 66.6], COL.fabric, 0);
    box(0, 1.7, 62.8, 6, 0.1, 1, COL.goldLed, 7);
    label('Regia FOH', [0, 9, 62], 'stage');
    // torri audio di ritardo con schermi LED verso il pubblico lontano
    for (const [sx, sz] of [[-26, 75], [26, 75], [-26, 118], [26, 118]]) {
      for (const [dx, dz] of [[-1, -1], [1, -1], [1, 1], [-1, 1]]) cyl([sx + dx, 0, sz + dz], [sx + dx, 12.5, sz + dz], 0.09, 4, COL.steel);
      box(sx, 12.5, sz, 2.6, 0.3, 2.6, COL.truss);
      box(sx, 6.6, sz - 0.7, 1.3, 4.4, 1.1, COL.black);
      box(sx, 7.6, sz + 1.25, 6.4, 3.9, 0.3, COL.black);
      const yb = 7.85, yt = 11.25, xl = sx - 3, xr = sx + 3, zf = sz + 1.42;
      quad([xl, yb, zf], [xr, yb, zf], [xr, yt, zf], [xl, yt, zf], COL.white, 2, [[0.15, 0], [0.85, 0], [0.85, 1], [0.15, 1]]);
    }
    label('Torri audio e schermi LED', [26, 15, 96], 'stage');
    // torri faro per l'illuminazione di sicurezza
    for (const [x, z] of [[-60, 2], [60, 2], [-60, 75], [60, 75], [-58, 146], [58, 146], [-34, 176], [34, 176]]) {
      cyl([x, 0, z], [x, 9.5, z], 0.16, 5, COL.steel);
      box(x, 0, z, 1.6, 0.9, 2.6, hex('#e2b33f'));
      box(x, 9.5, z, 2.6, 0.5, 0.6, COL.goldLed, 7, Math.atan2(-x, 75 - z));
    }
  }

  // food street sulla pista: 10 postazioni per lato
  function buildFoodStreet() {
    let kid = 0;
    const kiosk = (x, z, ry) => {
      const idx = kid++;
      box(x, 0, z, 6, 2.8, 3.2, COL.ivory, 0, ry);
      box(x, 2.8, z, 6.6, 0.3, 3.8, COL.white, 0, ry);
      const c = Math.cos(ry), s = Math.sin(ry);
      const W = (lx, y, lz) => [x + lx * c + lz * s, y, z - lx * s + lz * c];
      box(x + s * 1.95, 2.75, z + c * 1.95, 6.6, 0.12, 0.1, COL.goldLed, 7, ry);
      box(x + s * 1.62, 1.0, z + c * 1.62, 5.4, 0.18, 0.12, COL.goldLed, 7, ry);
      box(x + s * 2.4, 0, z + c * 2.4, 5.6, 1.05, 0.5, COL.white, 0, ry);
      box(x + s * 1.7, 3.1, z + c * 1.7, 5.9, 1.3, 0.14, COL.black, 0, ry);
      const col = idx % 6, row = Math.floor(idx / 6), u0 = col / 6, u1 = (col + 1) / 6, v0 = row / 4, v1 = (row + 1) / 4;
      quad(W(-2.85, 3.13, 1.79), W(2.85, 3.13, 1.79), W(2.85, 4.37, 1.79), W(-2.85, 4.37, 1.79), COL.white, 8,
        [[u0, v1], [u1, v1], [u1, v0], [u0, v0]]);
      for (const d of [-2, 2]) { const p = W(d, 0, 5.2); cyl(p, [p[0], 1.1, p[2]], 0.06, 5, COL.steel); cyl([p[0], 1.1, p[2]], [p[0], 1.14, p[2]], 0.4, 8, COL.white); }
    };
    const R = 49.5;
    for (const side of [-1, 1]) {
      const spots = [];
      const ang = (cz, phi, south) => [side * R * Math.cos(phi), south ? cz + R * Math.sin(phi) : cz - R * Math.sin(phi)];
      spots.push(ang(OV.zN, 0.215, false));
      for (let i = 0; i < 7; i++) spots.push([side * R, 37 + i * 10.6]);
      spots.push(ang(OV.zS, 0.215, true)); spots.push(ang(OV.zS, 0.43, true));
      for (const [x, z] of spots) {
        const cz = z < OV.zN ? OV.zN : z > OV.zS ? OV.zS : z;
        kiosk(x, z, Math.atan2(-x, cz - z));
      }
    }
    label('Food street · 20 postazioni', [-49, 7, 70], 'services');
    // servizi igienici: 2 blocchi da 60 cabine (configurazione a 20.000 presenze)
    for (const s of [-1, 1]) for (let r = 0; r < 3; r++) for (let k = 0; k < 20; k++) {
      box(s * (61.6 - r * 2.7), 0, 108 + k * 1.3, 1.2, 2.3, 1.15, r % 2 ? COL.toilet : hex('#4c7f9c'));
    }
    label('Servizi igienici', [-57, 6, 121], 'services');
    label('Servizi igienici', [57, 6, 121], 'services');
    for (const s of [-1, 1]) { box(s * 57, 0, 100, 3.4, 1.1, 1.2, hex('#5aa6c9')); box(s * 57, 1.1, 100, 3.6, 0.12, 1.4, hex('#9fd6ea'), 1); }
    label('Punti acqua', [57, 4, 100], 'services');
    // punto di assistenza interno
    box(-58, 0, 24, 6, 2.8, 4.5, COL.white);
    box(-58, 2.8, 24, 6.4, 0.4, 4.9, COL.red, 1);
    label('Punto di assistenza', [-58, 6, 24], 'safety');
  }

  // ingresso, code, presidio sanitario, navette
  function buildEntrance() {
    flat(-40, 180, 40, 211, 0.03, COL.paved);
    // corsie di attesa dentro il perimetro
    for (let x = -24; x <= 24; x += 6) for (let z = 184; z < 204; z += 2) box(x, 0, z + 1, 0.12, 1.05, 2, COL.steel);
    for (let x = -36; x < 36; x += 2) if (Math.abs(x) > 28 || Math.abs(x % 12) > 3) box(x + 1, 0, 205, 2, 1.05, 0.12, COL.steel);
    // varchi con lettori e conteggio
    for (let i = 0; i < 8; i++) {
      const x = -21 + i * 6;
      box(x, 0, 181, 1.6, 2.3, 1.4, COL.white); box(x, 2.3, 181, 1.8, 0.12, 1.6, COL.goldLed, 7);
    }
    // portale GLITZ
    for (const s of [-1, 1]) for (const [dx, dz] of [[-0.4, -0.4], [0.4, -0.4], [0.4, 0.4], [-0.4, 0.4]]) cyl([s * 26 + dx, 0, 180 + dz], [s * 26 + dx, 7.5, 180 + dz], 0.06, 4, COL.truss);
    box(0, 7.1, 180, 53, 0.8, 0.8, COL.truss);
    box(0, 7.9, 180, 22, 3.2, 0.3, COL.white);
    box(0, 7.9, 180.2, 22, 0.14, 0.1, COL.goldLed, 7);
    label('Ingresso controllato · varchi e conteggio', [0, 12, 182], 'safety');
    label('Code dentro il perimetro', [-30, 3, 196], 'safety');
    // presidio sanitario con accesso diretto dalla corsia di soccorso
    box(-58, 0, 194, 10, 3, 8, COL.white);
    box(-58, 3, 194, 10.4, 0.5, 8.4, COL.red, 1);
    box(-58, 3.5, 194, 1.2, 0.08, 5, COL.white, 1); box(-58, 3.5, 194, 5, 0.08, 1.2, COL.white, 1);
    box(-74, 0, 198, 2.3, 2.6, 6.2, COL.white); box(-74, 2.6, 198, 2.3, 0.1, 6.2, COL.red, 1); box(-74, 2.7, 196, 1.6, 0.2, 0.5, hex('#4aa3ff'), 1);
    label('Presidio sanitario · 118', [-58, 7, 194], 'safety');
    // punto navette sul lato sud della strada
    flat(-12, 219, 52, 225, 0.06, COL.asphalt2);
    for (const bx of [2, 22]) { box(bx, 0, 222, 12, 3.1, 2.6, COL.white, 0, Math.PI / 2); box(bx - 5.2, 1.9, 222, 1, 0.9, 2.4, hex('#2c3440'), 0, Math.PI / 2); }
    box(40, 0, 227, 10, 2.6, 0.12, hex('#9aa0a2')); box(40, 2.6, 226.2, 10.6, 0.15, 2, COL.white);
    label('Punto navette', [22, 7, 222], 'mob');
  }

  // corsia di soccorso separata: dalla strada sud al retro del palco e a via Scirea
  function buildRescueLane() {
    const pts = [[-74, 211], [-74, -110], [89.5, -110]];
    strip(pts, 6, 0.04, COL.rescue);
    excl(-78, -114, -70, 211); excl(-78, -114, 89.5, -106);
    for (const off of [-3.1, 3.1]) {
      dashes([-74 + off, 208], [-74 + off, -110 + off], 0.5, 2, 2, 0.05, (s) => (Math.floor(s / 4) % 2 ? COL.red : COL.white));
      dashes([-74 - off, -110 + off], [88, -110 + off], 0.5, 2, 2, 0.05, (s) => (Math.floor(s / 4) % 2 ? COL.red : COL.white));
    }
    for (let z = -100; z < 205; z += 15) { box(-77.6, 0, z, 0.25, 0.9, 0.25, hex('#ff6a4a'), 7); box(-70.4, 0, z, 0.25, 0.9, 0.25, hex('#ff6a4a'), 7); }
    label('Corsia di soccorso separata', [-74, 4, 40], 'safety');
  }

  // area tecnica: mezzi, container, tende artisti, generatori
  function buildBackstage() {
    for (let i = 0; i < 5; i++) box(-50 + i * 7, 0, -46, 6, 2.6, 2.4, COL.container, 0, Math.PI / 2);
    for (let i = 0; i < 3; i++) box(-50 + i * 7, 2.6, -46, 6, 2.6, 2.4, hex('#7e8a90'), 0, Math.PI / 2);
    for (let i = 0; i < 4; i++) {
      const x = 30 + (i % 2) * 14, z = -44 - Math.floor(i / 2) * 14;
      box(x, 0, z, 9, 2.6, 9, COL.white); hipRoof(x, 2.6, z, 9.2, 9.2, 2.2, 0, COL.white);
    }
    for (let i = 0; i < 4; i++) { box(-14 + i * 6, 0, -62, 2.5, 3.8, 13.6, COL.truck); box(-14 + i * 6, 0, -70.5, 2.5, 3, 3, hex('#2e2f33')); }
    box(-40, 0, -82, 16, 3, 9, COL.white); box(-40, 3, -82, 16.4, 0.3, 9.4, COL.ivory);
    for (let i = 0; i < 2; i++) { box(52, 0, -66 - i * 10, 3, 2.6, 7, hex('#e2b33f')); cyl([52, 2.6, -63.5 - i * 10], [52, 4.2, -63.5 - i * 10], 0.2, 6, COL.black); }
    for (let i = 0; i < 6; i++) car(-58 + i * 3.2, -96, 0, hex('#e9e9e6'));
    for (let i = 0; i < 3; i++) { box(14 + i * 6, 0, -88, 2.4, 3.6, 12, COL.truck); box(14 + i * 6, 0, -96, 2.4, 2.9, 3, hex('#2e2f33')); }
    for (let i = 0; i < 6; i++) box(-58 + i * 4, 0, -30, 2.4, 2.5, 3.4, hex('#e8e6e1'));
    box(40, 0, -92, 12, 2.8, 6, COL.white); hipRoof(40, 2.8, -92, 12.2, 6.2, 1.6, 0, COL.white);
    label('Area tecnica e camerini', [-30, 7, -60], 'services');
    label('Generatori', [52, 7, -71], 'services');
    // rampa di carico sul retro del palco
    quad([22, 0.05, -35], [30, 0.05, -35], [30, 2, -27], [22, 2, -27], COL.steel, 0);
  }

  // sosta: P1 fascia nord, P2 spazi residui, P3 via Scirea
  function lot(x0, z0, x1, z1) { flat(x0, z0, x1, z1, 0.03, COL.gravel); excl(x0, z0, x1, z1); }
  function buildParking() {
    seed = 99;
    // P1: fascia nord, file nord-sud con auto disposte est-ovest
    lot(-20, -205, 70, -122);
    let p1 = 0;
    for (let bx = -14; bx < 66; bx += 16) for (const side of [0, 1]) {
      const cx = bx + side * 5.2;
      for (let z = -198; z < -128; z += 2.6) {
        flat(cx - 2.5, z - 0.04, cx + 2.5, z + 0.04, 0.04, COL.line);
        if (rnd() < 0.16) continue;
        car(cx + (side ? 0.2 : -0.2), z + 1.3, Math.PI / 2); p1++;
      }
    }
    flat(70, -168, 89.5, -160, 0.03, COL.gravel);
    for (let x = -10; x < 66; x += 24) { lampPost(x, -125, 0, -1.6, 8); pool(x, -129, 6, 6, 0.045, COL.gravel); }
    label('P1 · fascia nord · 180–240 posti', [25, 5, -164], 'mob');
    // P2 a: posti riservati e accessibili accanto all'ingresso
    lot(67, 128, 86, 178);
    for (let z = 130; z < 176; z += 2.6) {
      const acc = z > 160;
      for (const cx of [70.5, 82.5]) {
        flat(cx - 2.3, z, cx + 2.3, z + 2.4, 0.035, acc ? COL.blueBay : COL.gravel);
        if (rnd() < 0.25) continue;
        car(cx, z + 1.3, Math.PI / 2);
      }
    }
    flat(86, 172, 89.5, 178, 0.03, COL.gravel);
    // P2 b: servizio e operatori, a ovest della fascia nord
    lot(-62, -205, -28, -160);
    for (const cx of [-58, -52.6, -38, -32.6]) for (let z = -202; z < -163; z += 2.6) { if (rnd() < 0.3) continue; car(cx, z + 1.3, Math.PI / 2); }
    label('P2 · spazi residui · 60–100 posti', [76, 5, 150], 'mob');
    label('P2 · servizio', [-45, 5, -182], 'mob');
    // P3: sosta su un lato di via Scirea, corsia libera
    flat(86.6, -110, 89.5, 205, 0.055, COL.asphalt2);
    for (let z = -104; z < 200; z += 5.9) { if (rnd() < 0.08) continue; car(88.05, z, 0); }
    label('P3 · via Scirea · 40–60 posti', [88, 5, 40], 'mob');
  }

  // edificio esistente e vegetazione di bordo
  function buildSurroundings() {
    excl(-112, -168, -80, -132);
    box(-96, 0, -152, 26, 6.5, 14, hex('#d8cfbf'), 6, 0, [0.6, 0]); box(-96, 6.5, -152, 26.4, 0.4, 14.4, hex('#bdb3a2'));
    flat(-104, -137, -88, -133, 0.03, hex('#9fb7b8'));
    excl(-40, 180, 40, 228); excl(-12, 219, 52, 228); excl(-66, 186, -50, 202);
    seed = 4242;
    // alberature lungo la SS18 e la strada sud
    for (let z = -430; z < 205; z += 9) if (isFree(-113, z, 2)) roundTree(-113 + rnd() * 2, z, 0.9 + rnd() * 0.3, COL.oak);
    for (let x = -108; x < 86; x += 8) if (isFree(x, 207, 1)) roundTree(x, 207 - rnd(), 0.75, COL.oak);
    // macchia sparsa tra i lotti
    for (let i = 0; i < (LITE.on ? 260 : 520); i++) {
      const x = -110 + rnd() * 195, z = -420 + rnd() * 620;
      if (!isFree(x, z, 4)) continue;
      if (rnd() < 0.35) pine(x, z, 10 + rnd() * 4, 3.5 + rnd()); else roundTree(x, z, 0.7 + rnd() * 0.6, rnd() > 0.5 ? COL.oak : COL.olive);
    }
  }
