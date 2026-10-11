  const SKIN = ['#e0b896', '#c8997a', '#a5765a', '#7a5540', '#f0cfb2'].map(hex);
  const PANTS = ['#1f2430', '#2c3a52', '#3b3a36', '#6b6255', '#d9d2c3', '#141418'].map(hex);
  function person(x, y, z, cloth, ry) {
    const s = 0.92 + rnd() * 0.18, ph = rnd() * 6.28, uv = [ph, 0];
    const top = cloth[Math.floor(rnd() * cloth.length)], leg = PANTS[Math.floor(rnd() * PANTS.length)], skin = SKIN[Math.floor(rnd() * SKIN.length)];
    const c = Math.cos(ry), sn = Math.sin(ry);
    for (const d of [-0.11, 0.11]) box(x + d * c, y, z - d * sn, 0.17, 0.82 * s, 0.2, leg, 3, ry, uv);
    box(x, y + 0.82 * s, z, 0.46, 0.62 * s, 0.26, top, 3, ry, uv);
    for (const d of [-0.29, 0.29]) box(x + d * c, y + 0.86 * s, z - d * sn, 0.11, 0.55 * s, 0.13, top.map((v) => v * 0.9), 3, ry, uv);
    box(x, y + 1.44 * s, z, 0.1, 0.07, 0.1, skin, 3, ry, uv);
    box(x, y + 1.5 * s, z, 0.22, 0.25, 0.23, skin, 3, ry, uv);
    if (rnd() < 0.5) box(x, y + 1.72 * s, z - 0.01, 0.24, 0.06, 0.25, rnd() < 0.5 ? hex('#2a1d15') : hex('#8a6a3e'), 3, ry, uv);
  }
  // figura semplificata per il pubblico lontano (busto e testa)
  function figure(x, y, z, cloth, ry) {
    const s = 0.92 + rnd() * 0.18, uv = [rnd() * 6.28, 0];
    const top = cloth[Math.floor(rnd() * cloth.length)], skin = SKIN[Math.floor(rnd() * SKIN.length)];
    box(x, y, z, 0.44, 1.42 * s, 0.27, top, 3, ry, uv);
    box(x, y + 1.42 * s, z, 0.23, 0.27, 0.24, rnd() < 0.5 ? skin : hex('#2a1d15'), 3, ry, uv);
  }
  let CROWD_COUNT = 0;
  function buildCrowd(nFull, nFar) {
    seed = 1234;
    const cloth = ['#f1efe9', '#1f1f23', '#2e4d74', '#b5452f', '#d7c49a', '#6d7f5a', '#e3a33b', '#8b3f63', '#3e8a8f', '#cfd4da'].map(hex);
    const blocked = (x, z) => (Math.abs(x) < 27 && z < 32) || Math.hypot(x, z - 34) < 9.3 ||
      (Math.abs(x) < 8 && z > 55 && z < 69) ||
      (Math.abs(Math.abs(x) - 26) < 3.5 && (Math.abs(z - 75) < 3 || Math.abs(z - 118) < 3)) || z < 1.5;
    let placed = 0, guard = 0;
    const total = nFull + nFar;
    while (placed < total && guard < total * 30) {
      guard++;
      const x = (rnd() * 2 - 1) * 43.5, z = 1.5 + rnd() * 143;
      if (!insideStad(x, z, 43.3) || blocked(x, z)) continue;
      const dens = 0.18 + 0.82 * Math.exp(-(z - 4) / 85) * (1 - 0.3 * Math.abs(x) / 44);
      if (rnd() > dens) continue;
      if (z < 92 && placed < nFull * 1.2) person(x, 0, z, cloth, rnd() * 3); else figure(x, 0, z, cloth, rnd() * 3);
      placed++;
    }
    // davanti ai chioschi, nell'anello e in coda all'ingresso
    for (let i = 0; i < 520; i++) {
      const side = rnd() > 0.5 ? 1 : -1, z = 30 + rnd() * 90;
      const r = 44.5 + rnd() * 2.6;
      const cz = z < OV.zN ? OV.zN : z > OV.zS ? OV.zS : z;
      figure(side * r, 0, z, cloth, rnd() * 3);
    }
    for (let i = 0; i < 240; i++) { const s = rnd() > 0.5 ? 1 : -1; figure(s * (53 + rnd() * 9), 0, 10 + rnd() * 95, cloth, rnd() * 3); }
    for (let i = 0; i < 420; i++) { const lane = Math.floor(rnd() * 8); figure(-21 + lane * 6 + (rnd() - 0.5) * 3.6, 0, 184 + rnd() * 20, cloth, Math.PI); }
    for (let i = 0; i < 90; i++) figure(-36 + rnd() * 72, 0, 206 + rnd() * 4, cloth, rnd() * 3);
    for (let i = 0; i < 40; i++) figure(-4 + rnd() * 50, 0, 225.5 + rnd() * 2.5, cloth, rnd() * 3);
    const guest = (x, y, z) => person(x, y, z, cloth, rnd() * 3);
    for (const s of [-1, 1]) for (let i = 0; i < 150; i++) guest(s * 15 + (rnd() * 2 - 1) * 9, 0.6, 4.5 + rnd() * 21);
    guest(0.4, 2, 32.5);
    for (let i = 0; i < 70; i++) guest((rnd() * 2 - 1) * 11, 2.8, -23 + rnd() * 12);
    CROWD_COUNT = placed + 520 + 240 + 420 + 90 + 40 + 371;
  }

  // fari motorizzati e laser
  const BEAMS = [];
  function buildBeams() {
    const cols = [[1.0, 0.78, 0.45], [0.95, 0.95, 1.0], [0.35, 0.82, 0.92]];
    for (let i = 0; i < 18; i++) {
      const t = 0.1 + i / 17 * (Math.PI - 0.2);
      const p = archPt(ARCH.a - 0.5, ARCH.b - 0.5, t, ARCH.zf + 0.5);
      BEAMS.push({ o: p, pan: (i - 8.5) * 0.08, tilt: -0.2 - 0.25 * Math.sin(t), ph: i * 0.7, col: cols[i % 3], len: 130, rad: 3.0, amt: 0.08 });
      box(p[0], p[1] - 0.5, p[2], 0.45, 0.45, 0.45, COL.black);
    }
    for (let i = 0; i < 14; i++) {
      const x = -15.6 + i * 2.4;
      BEAMS.push({ o: [x, 2.3, -0.7], pan: (x / 16) * 0.45, tilt: 1.0, ph: i * 1.3 + 2, col: cols[(i + 1) % 3], len: 150, rad: 3.0, amt: 0.08 });
    }
    for (const s of [-1, 1]) for (let k = 0; k < 5; k++) {
      BEAMS.push({ o: [s * 21.5, 3.3 + k * 2.6, -0.9], pan: -s * 0.25, tilt: 0.15 + k * 0.12, ph: k * 0.9 + (s > 0 ? 1 : 0), col: cols[k % 3], len: 140, rad: 2.6, amt: 0.08 });
    }
    for (let k = 0; k < 6; k++) { const a = k / 6 * Math.PI * 2; BEAMS.push({ o: [Math.cos(a) * 4.4, 2.2, 33 + Math.sin(a) * 4.4], pan: Math.cos(a) * 0.3, tilt: 1.25, ph: k * 1.1, col: cols[k % 3], len: 110, rad: 2.2, amt: 0.07 }); }
    // LASER: tre sorgenti, ventagli sopra il pubblico
    const lcol = [[0.25, 1.0, 0.45], [0.3, 0.9, 1.0], [1.0, 0.95, 0.85]];
    const sources = [[0, 4.2, -3.2], [-21.5, 15.6, -2], [21.5, 15.6, -2]];
    sources.forEach((o, si) => {
      for (let k = 0; k < 12; k++) {
        const base = si === 0 ? -0.55 + k * 0.1 : (si === 1 ? 0.05 + k * 0.06 : -0.05 - k * 0.06);
        BEAMS.push({ o, pan: base, tilt: si === 0 ? 0.09 : -0.02 + 0.015 * k, ph: k * 0.4 + si, col: lcol[si], len: 200, rad: 0.1, base: 0.04, amt: 0.45, laser: true });
      }
    });
  }


  function buildAll(opts) {
    LITE.on = !!opts.lite;
    EXCL.length = 0;
    buildTerrain();
    buildRoads();
    buildArena();
    buildRescueLane();
    buildEntrance();
    buildParking();
    buildBackstage();
    buildSurroundings();
    buildCoast();
    buildCountryside();
    buildFoodStreet();
    buildStage();
    buildPrive();
    if (LITE.on) buildCrowd(2000, 2800); else buildCrowd(4400, 5400);
    buildBeams();
  }
