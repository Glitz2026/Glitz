  // ---------- IL PALCO AD ARCO (versione compatta) ----------
  // arco: semiellisse a = 18,5 (mezza luce), b = 16 (altezza) — luce 37 m
  const ARCH = { a: 18.5, b: 16, zf: -1.0, zb: -3.4 };
  const DECK = { w: 34, d: 27, h: 2 };
  function archPt(a, b, t, z, yb) { return [a * Math.cos(t), (yb || 0) + b * Math.sin(t), z]; }
  function buildStage() {
    // piano palco 34 x 27 m a +2,0 m
    box(0, 0, -DECK.d / 2, DECK.w, DECK.h, DECK.d, COL.deck);
    box(0, 0.25, 0.02, DECK.w, 0.12, 0.08, COL.goldLed, 5, 0, [0.0, 1]);
    // console DJ al centro, verso il pubblico
    box(0, 2, -5, 6, 0.5, 3.2, COL.black);
    box(0, 2.5, -5, 5, 1.1, 1.6, COL.black); box(0, 3.6, -5, 4.7, 0.06, 1.3, COL.goldLed, 7);
    // ARCO STRUTTURALE, più leggero: una sola faccia di truss a doppia corda
    const segs = 56;
    for (let i = 0; i < segs; i++) {
      const t0 = i / segs * Math.PI, t1 = (i + 1) / segs * Math.PI;
      for (const z of [ARCH.zf, ARCH.zb]) for (const off of [0, 0.9]) {
        cyl(archPt(ARCH.a - off, ARCH.b - off, t0, z), archPt(ARCH.a - off, ARCH.b - off, t1, z), 0.16, 5, COL.truss);
      }
      const f0 = archPt(ARCH.a, ARCH.b, t0, ARCH.zf), b0 = archPt(ARCH.a, ARCH.b, t0, ARCH.zb);
      cyl(f0, b0, 0.08, 4, COL.steel);
      cyl(f0, archPt(ARCH.a - 0.9, ARCH.b - 0.9, t0, ARCH.zf), 0.08, 4, COL.steel);
      if (i % 2 === 0) cyl(f0, archPt(ARCH.a - 0.9, ARCH.b - 0.9, t1, ARCH.zb), 0.06, 4, COL.steel);
      const l0 = archPt(ARCH.a + 0.25, ARCH.b + 0.25, t0, ARCH.zf + 0.15), l1 = archPt(ARCH.a + 0.25, ARCH.b + 0.25, t1, ARCH.zf + 0.15);
      cyl(l0, l1, 0.13, 4, COL.goldLed, 5, [i / segs, 0]);
      // nastro LED interno
      const a0 = archPt(15.6, 13.4, t0, -4.2), a1 = archPt(15.6, 13.4, t1, -4.2);
      const w0 = archPt(14.9, 12.7, t0, -4.2), w1 = archPt(14.9, 12.7, t1, -4.2);
      quad(a0, a1, w1, w0, COL.goldLed, 5, [[i / segs, 1], [(i + 1) / segs, 1], [(i + 1) / segs, 1], [i / segs, 1]]);
      // copertura: telo teso fino all'arco posteriore (h 13) a -27
      const r0 = archPt(19, 13.5, t0, -27), r1 = archPt(19, 13.5, t1, -27);
      quad(archPt(15.6, 13.6, t0, -4.4), archPt(15.6, 13.6, t1, -4.4), r1, r0, COL.fabric, 0);
      quad([r0[0], 2, -27], [r1[0], 2, -27], r1, r0, COL.black, 0);
    }
    for (const s of [-1, 1]) {
      box(s * 18.5, 0, (ARCH.zf + ARCH.zb) / 2, 3, 1.2, 3.8, COL.steel);
      // pilastri posteriori della copertura
      cyl([s * 18.6, 0, -27], [s * 18.6, 3.2, -27], 0.3, 6, COL.truss);
    }
    // SCHERMO sul fondale, sopra il privé C
    const sw = 12, yb = 7.2, ytop = (x) => 7.2 + 5.2 * Math.sqrt(Math.max(0, 1 - (x / 14.2) * (x / 14.2)));
    const nx = 40, ny = 12, zs = -26.4;
    for (let i = 0; i < nx; i++) {
      const xa = -sw + 2 * sw * i / nx, xb = -sw + 2 * sw * (i + 1) / nx;
      for (let j = 0; j < ny; j++) {
        const ya0 = yb + (ytop(xa) - yb) * j / ny, ya1 = yb + (ytop(xa) - yb) * (j + 1) / ny;
        const yb0 = yb + (ytop(xb) - yb) * j / ny, yb1 = yb + (ytop(xb) - yb) * (j + 1) / ny;
        const uv = (x, y) => [(x + sw) / (2 * sw), (y - yb) / 5.2];
        quad([xa, ya0, zs], [xb, yb0, zs], [xb, yb1, zs], [xa, ya1, zs], COL.white, 2, [uv(xa, ya0), uv(xb, yb0), uv(xb, yb1), uv(xa, ya1)]);
      }
      cyl([xa, ytop(xa) + 0.15, zs], [xb, ytop(xb) + 0.15, zs], 0.12, 4, COL.truss);
    }
    // PRIVÉ C: pedana rialzata +0,8 m dietro la console, 24 x 14 m
    const pc = { y: DECK.h, h: 0.8, z0: -24.5, z1: -10.5 };
    box(0, pc.y, (pc.z0 + pc.z1) / 2, 24, pc.h, 14, hex('#2b272e'));
    box(0, pc.y + pc.h - 0.05, pc.z1 + 0.05, 24, 0.1, 0.1, COL.goldLed, 5, 0, [0.3, 1]);
    box(0, pc.y + pc.h, pc.z1, 24, 1.05, 0.08, hex('#b9c7c9'));
    for (const s of [-1, 1]) box(s * 12, pc.y + pc.h, (pc.z0 + pc.z1) / 2, 0.08, 1.05, 14, hex('#b9c7c9'));
    for (let r = 0; r < 2; r++) for (let q = 0; q < 4; q++) {
      const x = -9 + q * 6, z = -21.5 + r * 5;
      box(x, pc.y + pc.h, z, 3.2, 0.5, 1, COL.lounge); box(x, pc.y + pc.h, z + 1.5, 1.3, 0.65, 0.9, COL.wood);
    }
    box(0, pc.y + pc.h, -24, 8, 1.15, 1.1, COL.black); box(0, pc.y + pc.h + 1.1, -24, 8.2, 0.12, 1.3, COL.goldLed, 7);
    for (let k = 0; k < 5; k++) box(10, 0, -25.5 - k * 0.4, 3, 2.8 - k * 0.5, 0.4, COL.steel); // scala dal retro
    // PA appesa all'arco e sub a terra
    for (const s of [-1, 1]) {
      const x = s * 13.6;
      cyl([x, 11.8, -1.6], [x, 10.4, -1.6], 0.03, 3, COL.steel);
      for (let k = 0; k < 10; k++) box(x, 10 - k * 0.5, -1.6 - k * 0.04, 1.2, 0.46, 0.95, COL.black);
    }
    for (let k = -7; k <= 7; k++) if (Math.abs(k) > 1) box(k * 2.2, 0, 1.3, 1.1, 0.7, 1.2, COL.black);
    // PASSERELLA: 3 x 28 m a +2,00 m, dal centro del palco fino alla pedana circolare (B-stage)
    box(0, 0, 14, 3, 2, 28, COL.deck);
    box(0, 2, 14, 2.8, 0.03, 28, hex('#2b272e'));
    for (const sx of [-1.52, 1.52]) box(sx, 1.85, 14, 0.06, 0.12, 28, COL.goldLed, 5, 0, [0.5, 1]);
    // B-stage circolare, diametro 10 m
    const bc = [0, 33], br = 5, bs = 32;
    for (let i = 0; i < bs; i++) {
      const a0 = i / bs * Math.PI * 2, a1 = (i + 1) / bs * Math.PI * 2;
      const p0 = [bc[0] + Math.cos(a0) * br, 2, bc[1] + Math.sin(a0) * br], p1 = [bc[0] + Math.cos(a1) * br, 2, bc[1] + Math.sin(a1) * br];
      tri([bc[0], 2.02, bc[1]], [p1[0], 2.02, p1[2]], [p0[0], 2.02, p0[2]], hex('#2b272e'), 0);
      quad([p0[0], 0, p0[2]], [p1[0], 0, p1[2]], p1, p0, COL.deck, 0);
      cyl([p0[0], 1.9, p0[2]], [p1[0], 1.9, p1[2]], 0.07, 4, COL.goldLed, 5, [i / bs, 0]);
    }
    label('Passerella 28 m · B-stage Ø 10 m', [0, 6.5, 30], 'stage');
    // torri luci e laser ai lati del palco
    for (const s of [-1, 1]) {
      const x = s * 21.5;
      for (const [dx, dz] of [[-0.6, -0.6], [0.6, -0.6], [0.6, 0.6], [-0.6, 0.6]]) cyl([x + dx, 0, -2 + dz], [x + dx, 15, -2 + dz], 0.07, 4, COL.truss);
      for (let k = 0; k < 5; k++) box(x, 3 + k * 2.6, -1.3, 0.55, 0.55, 0.55, COL.black);
      box(x, 15, -2, 1.6, 0.6, 1.6, COL.black);
    }
    label('Palco ad arco · luce 37 m · h 16 m', [0, 19.5, -2], 'stage');
    label('Area ospiti sul palco · da verificare', [0, 6.5, -17], 'prive');
    label('Torri luci e laser', [21.5, 17.5, -2], 'stage');
  }

  // privé A e B ai due lati della passerella: 20 x 24 m a +0,60 m, bassi per non togliere la vista
  function buildPrive() {
    for (const s of [-1, 1]) {
      const cx = s * 15, cz = 15, W = 20, D = 24, H = 0.6;
      box(cx, 0, cz, W, H, D, COL.deck);
      box(cx, H, cz, W - 0.4, 0.04, D - 0.4, hex('#3a3437'));
      box(cx, H - 0.1, cz + D / 2 + 0.05, W, 0.1, 0.1, COL.goldLed, 5, 0, [0.5, 1]);
      box(cx - s * (W / 2 - 0.05), H - 0.1, cz, 0.1, 0.1, D, COL.goldLed, 5, 0, [0.2, 1]);
      box(cx, H, cz + D / 2 - 0.1, W, 1.1, 0.08, hex('#b9c7c9'));
      box(cx + s * (W / 2 - 0.05), H, cz, 0.08, 1.1, D, hex('#b9c7c9'));
      box(cx - s * (W / 2 - 0.05), H, cz, 0.08, 1.1, D, hex('#b9c7c9'));
      // tavoli alti
      for (let r = 0; r < 4; r++) for (let q = 0; q < 3; q++) {
        const x = cx - 6 + q * 6, z = cz - 7.5 + r * 5.5;
        cyl([x, H, z], [x, H + 1.1, z], 0.07, 5, COL.steel); cyl([x, H + 1.1, z], [x, H + 1.15, z], 0.45, 10, COL.wood);
      }
      // bar sul lato esterno, vicino al palco
      box(cx + s * 7.5, H, cz - 9.5, 4, 1.15, 1.2, COL.black);
      box(cx + s * 7.5, H + 1.1, cz - 9.5, 4.2, 0.12, 1.4, COL.goldLed, 7);
      // accesso dal corridoio laterale
      for (let k = 0; k < 3; k++) box(cx + s * (W / 2 + 0.6 + k * 0.35), 0, cz - 9, 0.35, H - k * 0.2, 3, COL.steel);
    }
    label('Privé A · open air', [-15, 5, 15], 'prive');
    label('Privé B · open air', [15, 5, 15], 'prive');
  }

