(function () {
  'use strict';
  // GLITZ Festival — Campo sportivo di Scalea, via Gaetano Scirea
  // Mappa 3D di concept in WebGL2 puro (nessuna libreria), dal motore del modello del Campovolo.
  // Assi: +x = est (via Scirea), -x = ovest (SS18, pineta, mare), +z = sud (ingresso), -z = nord (fascia nord, P1).
  // Unità: metri. Fronte palco a z = 0, rivolto a sud.

  // ---------- piccola matematica ----------
  const V = {
    sub: (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]],
    add: (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]],
    mul: (a, s) => [a[0] * s, a[1] * s, a[2] * s],
    dot: (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2],
    cross: (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]],
    len: (a) => Math.hypot(a[0], a[1], a[2]),
    norm: (a) => { const l = Math.hypot(a[0], a[1], a[2]) || 1; return [a[0] / l, a[1] / l, a[2] / l]; },
    lerp: (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t]
  };
  function perspective(fovy, aspect, near, far) {
    const f = 1 / Math.tan(fovy / 2), nf = 1 / (near - far);
    return [f / aspect, 0, 0, 0, 0, f, 0, 0, 0, 0, (far + near) * nf, -1, 0, 0, 2 * far * near * nf, 0];
  }
  function lookAt(eye, target, up) {
    const z = V.norm(V.sub(eye, target));
    const x = V.norm(V.cross(up, z));
    const y = V.cross(z, x);
    return [x[0], y[0], z[0], 0, x[1], y[1], z[1], 0, x[2], y[2], z[2], 0,
      -V.dot(x, eye), -V.dot(y, eye), -V.dot(z, eye), 1];
  }
  function mmul(a, b) {
    const o = new Array(16);
    for (let c = 0; c < 4; c++) for (let r = 0; r < 4; r++) {
      o[c * 4 + r] = a[r] * b[c * 4] + a[4 + r] * b[c * 4 + 1] + a[8 + r] * b[c * 4 + 2] + a[12 + r] * b[c * 4 + 3];
    }
    return o;
  }
  function hex(h) { const n = parseInt(h.slice(1), 16); return [(n >> 16 & 255) / 255, (n >> 8 & 255) / 255, (n & 255) / 255]; }

  // rumore deterministico
  let seed = 7;
  function rnd() { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }
  function hash2(x, z) { const s = Math.sin(x * 127.1 + z * 311.7) * 43758.5453; return s - Math.floor(s); }
  function vnoise(x, z) {
    const xi = Math.floor(x), zi = Math.floor(z), xf = x - xi, zf = z - zi;
    const u = xf * xf * (3 - 2 * xf), v = zf * zf * (3 - 2 * zf);
    const a = hash2(xi, zi), b = hash2(xi + 1, zi), c = hash2(xi, zi + 1), d = hash2(xi + 1, zi + 1);
    return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
  }
  function fbm(x, z) { let s = 0, a = 0.5, f = 1; for (let i = 0; i < 5; i++) { s += a * vnoise(x * f, z * f); f *= 2.03; a *= 0.5; } return s; }

  // ---------- costruttore di geometria ----------
  // kind: 0 illuminato · 1 emissivo · 2 schermo LED (texture) · 3 pubblico (salta) · 4 acqua · 5 LED a scorrimento
  //       6 finestre · 7 emissivo solo di notte · 8 insegne chioschi (atlante) · 9 alone di luce a terra (solo di notte)
  // buffer tipizzati che crescono raddoppiando: il modello supera il milione di triangoli
  let cap = 1 << 18, vn = 0;
  let P = new Float32Array(cap * 3), N = new Float32Array(cap * 3), C = new Float32Array(cap * 3), K = new Float32Array(cap), U = new Float32Array(cap * 2);
  function grow() {
    cap *= 2;
    const g = (a, k) => { const b = new Float32Array(cap * k); b.set(a); return b; };
    P = g(P, 3); N = g(N, 3); C = g(C, 3); K = g(K, 1); U = g(U, 2);
  }
  function resetGeometry() { vn = 0; }
  function tri(a, b, c, col, kind, ua, ub, uc) {
    if (vn + 3 > cap) grow();
    const e1x = b[0] - a[0], e1y = b[1] - a[1], e1z = b[2] - a[2], e2x = c[0] - a[0], e2y = c[1] - a[1], e2z = c[2] - a[2];
    let nx = e1y * e2z - e1z * e2y, ny = e1z * e2x - e1x * e2z, nz = e1x * e2y - e1y * e2x;
    const l = Math.hypot(nx, ny, nz) || 1; nx /= l; ny /= l; nz /= l;
    ua = ua || [0, 0]; ub = ub || ua; uc = uc || ua;
    const pts = [a, b, c], uvs = [ua, ub, uc];
    for (let i = 0; i < 3; i++, vn++) {
      const o3 = vn * 3, o2 = vn * 2, p = pts[i];
      P[o3] = p[0]; P[o3 + 1] = p[1]; P[o3 + 2] = p[2];
      N[o3] = nx; N[o3 + 1] = ny; N[o3 + 2] = nz;
      C[o3] = col[0]; C[o3 + 1] = col[1]; C[o3 + 2] = col[2];
      K[vn] = kind || 0; U[o2] = uvs[i][0]; U[o2 + 1] = uvs[i][1];
    }
  }
  function quad(a, b, c, d, col, kind, uvs) {
    uvs = uvs || [[0, 0], [0, 0], [0, 0], [0, 0]];
    tri(a, b, c, col, kind, uvs[0], uvs[1], uvs[2]);
    tri(a, c, d, col, kind, uvs[0], uvs[2], uvs[3]);
  }
  // box: centro in pianta (cx, cz), base a y0, dimensioni sx, sy, sz, rotazione ry
  function box(cx, y0, cz, sx, sy, sz, col, kind, ry, uv) {
    kind = kind || 0; ry = ry || 0;
    const c = Math.cos(ry), s = Math.sin(ry), hx = sx / 2, hz = sz / 2;
    const pt = (x, y, z) => [cx + x * c + z * s, y0 + y, cz - x * s + z * c];
    const p = [pt(-hx, 0, -hz), pt(hx, 0, -hz), pt(hx, 0, hz), pt(-hx, 0, hz), pt(-hx, sy, -hz), pt(hx, sy, -hz), pt(hx, sy, hz), pt(-hx, sy, hz)];
    const u = uv ? [uv, uv, uv, uv] : null;
    const top = col.map((v) => Math.min(1, v * 1.08));
    quad(p[4], p[5], p[6], p[7], top, kind, u);
    quad(p[0], p[1], p[5], p[4], col, kind, u);
    quad(p[1], p[2], p[6], p[5], col, kind, u);
    quad(p[2], p[3], p[7], p[6], col, kind, u);
    quad(p[3], p[0], p[4], p[7], col, kind, u);
  }
  function cyl(a, b, r, seg, col, kind, uv) {
    const d = V.norm(V.sub(b, a));
    const ref = Math.abs(d[1]) < 0.9 ? [0, 1, 0] : [1, 0, 0];
    const e1 = V.norm(V.cross(d, ref)), e2 = V.cross(d, e1);
    const u = uv ? [uv, uv, uv, uv] : null;
    for (let i = 0; i < seg; i++) {
      const t0 = i / seg * Math.PI * 2, t1 = (i + 1) / seg * Math.PI * 2;
      const o0 = V.add(V.mul(e1, Math.cos(t0) * r), V.mul(e2, Math.sin(t0) * r));
      const o1 = V.add(V.mul(e1, Math.cos(t1) * r), V.mul(e2, Math.sin(t1) * r));
      quad(V.add(a, o0), V.add(a, o1), V.add(b, o1), V.add(b, o0), col, kind || 0, u);
    }
  }
  function cone(x, y0, z, r, h, seg, col) {
    const apex = [x, y0 + h, z];
    for (let i = 0; i < seg; i++) {
      const t0 = i / seg * Math.PI * 2, t1 = (i + 1) / seg * Math.PI * 2;
      tri([x + Math.cos(t0) * r, y0, z + Math.sin(t0) * r], [x + Math.cos(t1) * r, y0, z + Math.sin(t1) * r], apex, col, 0);
    }
  }
  function flat(x0, z0, x1, z1, y, col, kind, uvs) {
    quad([x0, y, z0], [x1, y, z0], [x1, y, z1], [x0, y, z1], col, kind || 0, uvs);
  }
  function tree(x, z, h) {
    box(x, 0, z, 0.35, h * 0.35, 0.35, hex('#5a4632'));
    const g = hash2(x, z);
    const col = g > 0.5 ? hex('#3e5a32') : hex('#4f6a3a');
    if (g > 0.3) cone(x, h * 0.25, z, h * 0.32, h * 0.8, 6, col);
    else { cone(x, h * 0.3, z, h * 0.42, h * 0.55, 7, hex('#56703c')); }
  }

