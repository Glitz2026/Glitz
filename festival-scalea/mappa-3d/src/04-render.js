  // ---------- SHADER ----------
  const VS = `#version 300 es
  precision highp float;
  in vec3 aPos; in vec3 aNor; in vec3 aCol; in float aKind; in vec2 aUV;
  uniform mat4 uVP; uniform mat4 uLVP; uniform float uTime; uniform float uNight; uniform float uMotion;
  out vec3 vPos; out vec3 vNor; out vec3 vCol; out float vKind; out vec2 vUV; out vec4 vL;
  void main(){
    vec3 p = aPos;
    if (aKind > 2.5 && aKind < 3.5) { p.y += uNight * uMotion * 0.2 * max(0.0, sin(uTime * 7.0 + aUV.x)); }
    vPos = p; vNor = aNor; vCol = aCol; vKind = aKind; vUV = aUV;
    vL = uLVP * vec4(aPos, 1.0);
    gl_Position = uVP * vec4(p, 1.0);
  }`;
  const FS = `#version 300 es
  precision highp float;
  precision highp sampler2DShadow;
  in vec3 vPos; in vec3 vNor; in vec3 vCol; in float vKind; in vec2 vUV; in vec4 vL;
  uniform vec3 uCam; uniform vec3 uSunDir; uniform vec3 uSunCol; uniform vec3 uSkyAmb; uniform vec3 uGndAmb;
  uniform vec3 uFogCol; uniform float uFogDen; uniform float uNight; uniform float uStage; uniform float uTime;
  uniform sampler2D uTex; uniform sampler2D uAtlas; uniform sampler2DShadow uShadow; uniform float uShadowOn; uniform float uTexel;
  out vec4 o;
  float h21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float vn(vec2 p){ vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
    return mix(mix(h21(i), h21(i + vec2(1, 0)), f.x), mix(h21(i + vec2(0, 1)), h21(i + vec2(1, 1)), f.x), f.y); }
  float shadowAt(vec3 n){
    if (uShadowOn < 0.5) return 1.0;
    vec3 lp = vL.xyz / vL.w * 0.5 + 0.5;
    if (lp.x <= 0.0 || lp.x >= 1.0 || lp.y <= 0.0 || lp.y >= 1.0 || lp.z >= 1.0) return 1.0;
    float bias = 0.0008 + 0.0025 * (1.0 - clamp(dot(n, uSunDir), 0.0, 1.0));
    float s = 0.0;
    for (int i = -1; i <= 1; i++) for (int j = -1; j <= 1; j++)
      s += texture(uShadow, vec3(lp.xy + vec2(float(i), float(j)) * uTexel, lp.z - bias));
    return s / 9.0;
  }
  void main(){
    vec3 n = normalize(vNor);
    vec3 v = normalize(uCam - vPos);
    if (dot(n, v) < 0.0) n = -n;
    vec3 c;
    int k = int(vKind + 0.5);
    vec3 sp = vec3(0.0, 12.0, -6.0);
    vec3 L = sp - vPos; float d = length(L);
    float pulse = 0.75 + 0.25 * sin(uTime * 1.3);
    vec3 stageCol = mix(vec3(1.0, 0.72, 0.42), vec3(0.5, 0.78, 1.0), 0.5 + 0.5 * sin(uTime * 0.37));
    vec3 stageLight = stageCol * uStage * pulse * max(0.0, dot(n, L / d)) * 2.4 / (1.0 + (d * d) / 1600.0);
    float sh = shadowAt(n);
    float hemi = 0.5 + 0.5 * n.y;
    vec3 amb = mix(uGndAmb, uSkyAmb, hemi);
    // illuminazione di servizio dell'arena, di notte
    float ar = length((vPos.xz - vec2(0.0, 82.0)) / vec2(74.0, 112.0));
    vec3 flood = vec3(1.0, 0.82, 0.6) * uNight * 0.42 * (1.0 - smoothstep(0.72, 1.08, ar)) * (0.55 + 0.45 * max(n.y, 0.0));
    if (k == 1) {
      c = vCol * (1.0 + uNight * 0.8);
    } else if (k == 2) {
      c = texture(uTex, vec2(vUV.x, 1.0 - vUV.y)).rgb * (0.95 + uNight * 0.6);
    } else if (k == 5) {
      float chase = 0.35 + 0.65 * smoothstep(0.55, 1.0, sin((vUV.x * 26.0 - uTime * 1.6) * 3.14159));
      c = vCol * mix(0.6, chase * 1.15 + 0.2, uNight);
    } else if (k == 7) {
      c = mix(vCol * 0.6, vCol * 1.3, uNight);
    } else if (k == 8) {
      vec3 t = texture(uAtlas, vUV).rgb;
      c = t * (amb + uSunCol * max(0.0, dot(n, uSunDir)) * sh * 0.8 + 0.15) + t * uNight * 1.1;
    } else {
      float ao = 1.0;
      bool ground = n.y > 0.95 && vPos.y < 0.3;
      vec3 base = vCol;
      if (k == 10) {
        // tappeto di folla: visto dall'alto rende la densità che le figure da sole non coprono
        vec2 cell = floor(vPos.xz / 0.55);
        float r1 = h21(cell), r2 = h21(cell + 17.3), r3 = h21(cell + 41.7);
        float dens = 0.5 + 0.5 * exp(-(vPos.z - 4.0) / 70.0) * (1.0 - 0.25 * abs(vPos.x) / 44.0);
        if (abs(vPos.x) < 26.5 && vPos.z < 31.5) dens = 0.0;
        if (length(vPos.xz - vec2(0.0, 34.0)) < 9.6) dens = 0.0;
        vec3 cloth = mix(vec3(0.08, 0.075, 0.085), vec3(0.78, 0.74, 0.7), r2 * r2);
        if (r3 > 0.72) cloth = r3 > 0.9 ? vec3(0.62, 0.24, 0.18) : (r3 > 0.81 ? vec3(0.17, 0.3, 0.46) : vec3(0.82, 0.62, 0.3));
        base = mix(vCol * vec3(0.78, 0.72, 0.6), cloth, step(r1, dens * 0.94));
      }
      if (ground) {
        float g = vn(vPos.xz * 0.45) * 0.55 + vn(vPos.xz * 0.06) * 0.45;
        base *= 0.9 + 0.17 * g;
      } else {
        ao = mix(0.62, 1.0, smoothstep(0.0, 1.4, vPos.y - (k == 3 ? 0.0 : 0.0)));
        if (vPos.y > 1.6) ao = 1.0;
      }
      vec3 lit = amb * ao + uSunCol * max(0.0, dot(n, uSunDir)) * sh + stageLight + flood;
      c = base * lit;
      if (k == 9) {
        float rr = length(vUV);
        c += vec3(1.0, 0.74, 0.42) * uNight * 0.55 * (1.0 - smoothstep(0.05, 1.0, rr));
      }
      if (k == 4) {
        vec3 r = reflect(-v, vec3(0.0, 1.0, 0.0));
        float wv = 0.5 + 0.5 * sin(vPos.x * 0.07 + uTime * 0.8) * sin(vPos.z * 0.05 - uTime * 0.6);
        float fr = pow(1.0 - max(0.0, dot(v, vec3(0.0, 1.0, 0.0))), 4.0);
        c = vCol * (amb * 1.3 + 0.06) * (0.92 + 0.08 * wv);
        c = mix(c, uFogCol * 0.9, fr * 0.55);
        c += uSunCol * pow(max(0.0, dot(r, uSunDir)), 80.0) * 0.8;
      }
      if (k == 6) {
        float w = step(0.55, fract(vUV.x * 7.0 + floor(vPos.y * 0.33) * 0.37));
        c += vec3(1.0, 0.78, 0.45) * w * uNight * 0.55 * step(0.25, vUV.x);
      }
    }
    float f = 1.0 - exp(-pow(length(uCam - vPos) * uFogDen, 1.35));
    c = mix(c, uFogCol, clamp(f, 0.0, 1.0));
    o = vec4(c, 1.0);
  }`;
  const DEPTH_VS = `#version 300 es
  in vec3 aPos; uniform mat4 uLVP; void main(){ gl_Position = uLVP * vec4(aPos, 1.0); }`;
  const DEPTH_FS = `#version 300 es
  precision mediump float; out vec4 o; void main(){ o = vec4(1.0); }`;
  const SKY_VS = `#version 300 es
  in vec2 aP; out vec2 vP; void main(){ vP = aP; gl_Position = vec4(aP, 0.9999, 1.0); }`;
  const SKY_FS = `#version 300 es
  precision highp float;
  in vec2 vP; uniform vec3 uR; uniform vec3 uU; uniform vec3 uF; uniform float uTanX; uniform float uTanY;
  uniform vec3 uTop; uniform vec3 uHor; uniform vec3 uSunDir; uniform vec3 uSunCol; uniform float uNight; uniform vec3 uGlow;
  out vec4 o;
  float h(vec3 p){ return fract(sin(dot(p, vec3(12.9898, 78.233, 37.719))) * 43758.5453); }
  void main(){
    vec3 d = normalize(uF + vP.x * uTanX * uR + vP.y * uTanY * uU);
    float y = max(d.y, 0.0);
    vec3 c = mix(uHor, uTop, pow(y, 0.5));
    float s = max(0.0, dot(d, uSunDir));
    c += uGlow * pow(s, 8.0) * 0.7 + uSunCol * smoothstep(0.9993, 0.9996, s) * 1.6;
    if (uNight > 0.5) {
      vec3 q = floor(d * 420.0);
      float st = step(0.9968, h(q)) * smoothstep(0.02, 0.25, d.y);
      c += vec3(st) * (0.5 + 0.5 * h(q + 1.0)) * (uNight - 0.5) * 2.0;
    }
    if (d.y < 0.0) c = uHor;
    o = vec4(c, 1.0);
  }`;
  const BEAM_VS = `#version 300 es
  in vec3 aP; uniform mat4 uVP; uniform vec3 uO; uniform vec3 uDir; uniform vec3 uE1; uniform vec3 uE2; uniform float uLen; uniform float uRad; uniform float uBase;
  out float vT; out float vR;
  void main(){
    float t = aP.z; vT = t; vR = length(aP.xy);
    vec3 w = uO + uDir * (t * uLen) + (uE1 * aP.x + uE2 * aP.y) * (uBase + t * uRad);
    gl_Position = uVP * vec4(w, 1.0);
  }`;
  const BEAM_FS = `#version 300 es
  precision highp float;
  in float vT; in float vR; uniform vec3 uCol; uniform float uAmt; uniform float uLaser; out vec4 o;
  void main(){ float a = pow(1.0 - vT, uLaser > 0.5 ? 0.6 : 1.8) * uAmt; o = vec4(uCol * a, 1.0); }`;
  // post-produzione: bloom + tono + vignetta
  const FSQ_VS = `#version 300 es
  in vec2 aP; out vec2 vUv; void main(){ vUv = aP * 0.5 + 0.5; gl_Position = vec4(aP, 0.0, 1.0); }`;
  const BRIGHT_FS = `#version 300 es
  precision highp float; in vec2 vUv; uniform sampler2D uSrc; uniform vec2 uPx; uniform float uThr; out vec4 o;
  void main(){
    vec3 c = (texture(uSrc, vUv + uPx * vec2(-1.0, -1.0)).rgb + texture(uSrc, vUv + uPx * vec2(1.0, -1.0)).rgb +
              texture(uSrc, vUv + uPx * vec2(-1.0, 1.0)).rgb + texture(uSrc, vUv + uPx * vec2(1.0, 1.0)).rgb) * 0.25;
    float l = max(c.r, max(c.g, c.b));
    o = vec4(c * smoothstep(uThr, 1.0, l), 1.0);
  }`;
  const BLUR_FS = `#version 300 es
  precision highp float; in vec2 vUv; uniform sampler2D uSrc; uniform vec2 uDir; out vec4 o;
  void main(){
    vec3 c = texture(uSrc, vUv).rgb * 0.227;
    c += (texture(uSrc, vUv + uDir * 1.385).rgb + texture(uSrc, vUv - uDir * 1.385).rgb) * 0.316;
    c += (texture(uSrc, vUv + uDir * 3.231).rgb + texture(uSrc, vUv - uDir * 3.231).rgb) * 0.07;
    o = vec4(c, 1.0);
  }`;
  const COMP_FS = `#version 300 es
  precision highp float; in vec2 vUv; uniform sampler2D uBase; uniform sampler2D uBloom; uniform float uBloomAmt; out vec4 o;
  void main(){
    vec3 c = texture(uBase, vUv).rgb + texture(uBloom, vUv).rgb * uBloomAmt;
    c = c / (1.0 + max(0.0, max(c.r, max(c.g, c.b)) - 1.0) * 0.5);
    vec3 s = c * c * (3.0 - 2.0 * c);
    c = mix(c, s, 0.22);
    float l = dot(c, vec3(0.299, 0.587, 0.114));
    c = mix(vec3(l), c, 1.06);
    float vg = smoothstep(0.35, 1.05, length((vUv - 0.5) * vec2(1.25, 1.0)) * 1.25);
    c *= 1.0 - vg * 0.32;
    o = vec4(clamp(c, 0.0, 1.0), 1.0);
  }`;

  // ---------- ATMOSFERE ----------
  const MOODS = {
    giorno: {
      sun: V.norm([-0.38, 0.74, 0.52]), sunCol: [0.95, 0.9, 0.8], sky: [0.46, 0.55, 0.68], gnd: [0.3, 0.27, 0.22],
      top: hex('#3a74b8'), hor: hex('#c9dbe7'), glow: [0.25, 0.2, 0.1], fog: hex('#c3d3de'), fogDen: 0.00016, night: 0, stage: 0.05, beams: 0, bloom: 0.25, thr: 0.86
    },
    tramonto: {
      sun: V.norm([-1.0, 0.2, 0.16]), sunCol: [1.0, 0.6, 0.34], sky: [0.5, 0.42, 0.54], gnd: [0.3, 0.24, 0.22],
      top: hex('#27305e'), hor: hex('#f09a5e'), glow: [0.95, 0.45, 0.2], fog: hex('#c98a6c'), fogDen: 0.00022, night: 0.55, stage: 0.6, beams: 0.5, bloom: 0.7, thr: 0.72
    },
    notte: {
      sun: V.norm([-0.45, 0.6, -0.35]), sunCol: [0.22, 0.27, 0.4], sky: [0.15, 0.18, 0.28], gnd: [0.07, 0.07, 0.09],
      top: hex('#03040a'), hor: hex('#141a30'), glow: [0.05, 0.06, 0.12], fog: hex('#0e1222'), fogDen: 0.0003, night: 1, stage: 1, beams: 1, bloom: 0.85, thr: 0.62
    }
  };

  // ---------- VISTE ----------
  const VIEWS = {
    pianta: { eye: [-60, 600, 8.01], target: [-60, 0, 8], fov: 0.85 },
    arena: { eye: [2, 300, 52.01], target: [2, 0, 52], fov: 0.85 },
    drone: { eye: [300, 250, 400], target: [-14, 0, 40] },
    entroterra: { eye: [470, 175, 210], target: [-90, 0, 30] },
    mare: { eye: [-560, 170, 250], target: [10, 0, 30] },
    nord: { eye: [150, 230, -470], target: [0, 0, 40] },
    ingresso: { eye: [34, 24, 262], target: [0, 3, 172] },
    arco: { eye: [-36, 11, 44], target: [0, 9, -8] },
    pubblico: { eye: [15, 3.4, 52], target: [0, 8, -6] },
    palco: { eye: [2, 9, -6], target: [0, -6, 240] },
    prive: { eye: [40, 9, 52], target: [2, 2, 12] },
    passerella: { eye: [0.5, 4.1, 36.5], target: [0, 1, 150] },
    food: { eye: [-24, 6, 90], target: [-50, 2, 52] },
    cover: { eye: [-27, 5, 33], target: [-3, 12, -8] }
  };

  // insegne dei chioschi: specialità calabresi e della Riviera dei Cedri
  const KIOSKS = [
    ['Cedro', 'di Santa Maria del Cedro'], ['’Nduja', '& salumi calabresi'], ['Pitta', '& street food'], ['Frittura', 'del Tirreno'],
    ['Cipolla rossa', 'di Tropea · panini'], ['Caciocavallo', 'silano'], ['Peperoncino', 'di Diamante'], ['Tartufo', 'di Pizzo · gelati'],
    ['Liquirizia', 'di Calabria'], ['Bergamotto', 'drink & soda'], ['Vini', 'di Calabria'], ['Birre', 'artigianali calabresi'],
    ['Bar', 'birra & soft drink'], ['Crispelle', '& fritti dolci'], ['Pizza', 'napoletana a Scalea'], ['Cocktail bar', 'amari calabresi'],
    ['Bar', 'acqua & bibite'], ['Panino', 'col pesce spada'], ['Bar', 'birra & soft drink'], ['Granite', 'al cedro & gelsi'],
    ['Cocktail bar', 'bergamotto spritz'], ['Bar', 'acqua & bibite'], ['Mostaccioli', '& dolci di Soriano'], ['Caffè', 'torrefazione calabrese']
  ];

  // ---------- AVVIO ----------
  function init(canvas, opts) {
    opts = opts || {};
    const gl = canvas.getContext('webgl2', { antialias: false, preserveDrawingBuffer: !!opts.preserve });
    if (!gl) return null;
    resetGeometry(); LABELS.length = BEAMS.length = 0;
    buildAll(opts);

    function compile(vs, fs) {
      const p = gl.createProgram();
      for (const [t, src] of [[gl.VERTEX_SHADER, vs], [gl.FRAGMENT_SHADER, fs]]) {
        const s = gl.createShader(t); gl.shaderSource(s, src); gl.compileShader(s);
        if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s));
        gl.attachShader(p, s);
      }
      gl.linkProgram(p);
      if (!gl.getProgramParameter(p, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(p));
      return p;
    }
    const prog = compile(VS, FS), depthP = compile(DEPTH_VS, DEPTH_FS), sky = compile(SKY_VS, SKY_FS), beamP = compile(BEAM_VS, BEAM_FS);
    const brightP = compile(FSQ_VS, BRIGHT_FS), blurP = compile(FSQ_VS, BLUR_FS), compP = compile(FSQ_VS, COMP_FS);
    const ucache = new Map();
    const u = (p, n) => { let m = ucache.get(p); if (!m) { m = {}; ucache.set(p, m); } if (!(n in m)) m[n] = gl.getUniformLocation(p, n); return m[n]; };

    // geometria della scena (un solo VAO, usato anche per le ombre)
    const vao = gl.createVertexArray(); gl.bindVertexArray(vao);
    const attr = (name, data, size) => {
      const b = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, b);
      gl.bufferData(gl.ARRAY_BUFFER, data.subarray(0, vn * size), gl.STATIC_DRAW);
      const loc = gl.getAttribLocation(prog, name); gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, size, gl.FLOAT, false, 0, 0);
      return b;
    };
    const posBuf = attr('aPos', P, 3); attr('aNor', N, 3); attr('aCol', C, 3); attr('aKind', K, 1); attr('aUV', U, 2);
    const vcount = vn, triCount = vcount / 3;
    const dvao = gl.createVertexArray(); gl.bindVertexArray(dvao);
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuf);
    const dl = gl.getAttribLocation(depthP, 'aPos'); gl.enableVertexAttribArray(dl); gl.vertexAttribPointer(dl, 3, gl.FLOAT, false, 0, 0);

    // triangolo a schermo intero
    const fsVao = gl.createVertexArray(); gl.bindVertexArray(fsVao);
    const fb = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, fb);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    for (const p of [sky, brightP, blurP, compP]) { const l = gl.getAttribLocation(p, 'aP'); if (l >= 0) { gl.enableVertexAttribArray(l); gl.vertexAttribPointer(l, 2, gl.FLOAT, false, 0, 0); } }

    // coni dei fasci
    const beamVao = gl.createVertexArray(); gl.bindVertexArray(beamVao);
    const bv = [], SEG = 12;
    for (let i = 0; i < SEG; i++) {
      const a0 = i / SEG * 6.2832, a1 = (i + 1) / SEG * 6.2832;
      const p = (a, t) => [Math.cos(a), Math.sin(a), t];
      bv.push(...p(a0, 0), ...p(a1, 0), ...p(a1, 1), ...p(a0, 0), ...p(a1, 1), ...p(a0, 1));
    }
    const bb = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, bb);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(bv), gl.STATIC_DRAW);
    const bl = gl.getAttribLocation(beamP, 'aP'); gl.enableVertexAttribArray(bl); gl.vertexAttribPointer(bl, 3, gl.FLOAT, false, 0, 0);
    gl.bindVertexArray(null);

    function mkTex(w, h, filter) {
      const t = gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D, t);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filter || gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filter || gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      if (w) gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA8, w, h, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
      return t;
    }

    // schermo LED (canvas 2D)
    const sc = document.createElement('canvas'); sc.width = 1024; sc.height = 240;
    const sx = sc.getContext('2d');
    const tex = mkTex();
    function drawScreen(t) {
      const W = sc.width, H = sc.height;
      const g = sx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#120d16'); g.addColorStop(1, '#2a1a12');
      sx.fillStyle = g; sx.fillRect(0, 0, W, H);
      for (let i = 0; i < 9; i++) {
        const x = ((i / 9 + t * 0.03) % 1) * W * 1.4 - W * 0.2;
        const rg = sx.createRadialGradient(x, H * (0.3 + 0.4 * Math.sin(t * 0.5 + i)), 0, x, H * 0.5, H * 1.2);
        rg.addColorStop(0, i % 2 ? 'rgba(217,168,87,0.55)' : 'rgba(70,179,196,0.35)'); rg.addColorStop(1, 'rgba(0,0,0,0)');
        sx.fillStyle = rg; sx.fillRect(0, 0, W, H);
      }
      sx.textAlign = 'center'; sx.shadowColor = 'rgba(255,230,190,0.9)'; sx.shadowBlur = 22; sx.fillStyle = '#fff8ec';
      sx.font = '400 128px "Bodoni Moda", "Didot", "Bodoni 72", Georgia, serif';
      sx.fillText('GLITZ', W / 2, H * 0.66);
      sx.shadowBlur = 8; sx.font = '600 24px "Archivo", "Helvetica Neue", Arial, sans-serif';
      if ('letterSpacing' in sx) sx.letterSpacing = '12px';
      sx.fillText('FESTIVAL · SCALEA', W / 2 + 6, H * 0.9);
      if ('letterSpacing' in sx) sx.letterSpacing = '0px';
      sx.shadowBlur = 0;
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, sc);
    }
    drawScreen(0);

    // atlante delle insegne dei chioschi
    const ac = document.createElement('canvas'); ac.width = 2304; ac.height = 1024;
    const ax = ac.getContext('2d');
    const atlas = mkTex();
    function drawAtlas() {
      const cw = ac.width / 6, ch = ac.height / 4;
      KIOSKS.forEach(([a, b], i) => {
        const x = (i % 6) * cw, y = Math.floor(i / 6) * ch;
        const bar = a === 'Bar' || a === 'Cocktail bar' || a === 'Caffè';
        ax.fillStyle = bar ? '#1a2a30' : '#1b1512'; ax.fillRect(x, y, cw, ch);
        ax.strokeStyle = bar ? '#46b3c4' : '#d9a857'; ax.lineWidth = 6; ax.strokeRect(x + 12, y + 12, cw - 24, ch - 24);
        ax.fillStyle = '#fbf3e4'; ax.textAlign = 'center';
        let fs = 74; ax.font = `500 ${fs}px "Bodoni Moda", Georgia, serif`;
        while (ax.measureText(a).width > cw - 60 && fs > 30) { fs -= 4; ax.font = `500 ${fs}px "Bodoni Moda", Georgia, serif`; }
        ax.fillText(a, x + cw / 2, y + ch * 0.52);
        ax.fillStyle = bar ? '#9fdbe4' : '#e8c68a';
        let f2 = 30; ax.font = `600 ${f2}px "Archivo", Arial, sans-serif`;
        const b2 = b.toUpperCase();
        while (ax.measureText(b2).width > cw - 50 && f2 > 16) { f2 -= 2; ax.font = `600 ${f2}px "Archivo", Arial, sans-serif`; }
        ax.fillText(b2, x + cw / 2, y + ch * 0.8);
      });
      gl.bindTexture(gl.TEXTURE_2D, atlas);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, ac);
      gl.generateMipmap(gl.TEXTURE_2D);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
    }
    drawAtlas();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(drawAtlas);

    // mappa d'ombra
    const SH = opts.shadowSize || 4096;
    const shTex = gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D, shTex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.DEPTH_COMPONENT24, SH, SH, 0, gl.DEPTH_COMPONENT, gl.UNSIGNED_INT, null);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_COMPARE_MODE, gl.COMPARE_REF_TO_TEXTURE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_COMPARE_FUNC, gl.LEQUAL);
    const shFbo = gl.createFramebuffer(); gl.bindFramebuffer(gl.FRAMEBUFFER, shFbo);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.TEXTURE_2D, shTex, 0);
    gl.drawBuffers([gl.NONE]); gl.readBuffer(gl.NONE);
    const shadowOK = gl.checkFramebufferStatus(gl.FRAMEBUFFER) === gl.FRAMEBUFFER_COMPLETE;
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    let lightVP = null, shadowMood = null;
    function ortho(l, r, b, t, n, f) { return [2 / (r - l), 0, 0, 0, 0, 2 / (t - b), 0, 0, 0, 0, -2 / (f - n), 0, -(r + l) / (r - l), -(t + b) / (t - b), -(f + n) / (f - n), 1]; }
    function renderShadow(mood) {
      const c = [-40, 0, 0], R = 340;
      const eye = V.add(c, V.mul(mood.sun, 900));
      const up = Math.abs(mood.sun[1]) > 0.95 ? [1, 0, 0] : [0, 1, 0];
      lightVP = mmul(ortho(-R, R, -R, R, 400, 1500), lookAt(eye, c, up));
      if (!shadowOK) return;
      gl.bindFramebuffer(gl.FRAMEBUFFER, shFbo); gl.viewport(0, 0, SH, SH);
      gl.clear(gl.DEPTH_BUFFER_BIT); gl.enable(gl.DEPTH_TEST); gl.disable(gl.BLEND);
      gl.useProgram(depthP); gl.bindVertexArray(dvao);
      gl.uniformMatrix4fv(u(depthP, 'uLVP'), false, lightVP);
      gl.enable(gl.POLYGON_OFFSET_FILL); gl.polygonOffset(1.5, 3.0);
      gl.drawArrays(gl.TRIANGLES, 0, vcount);
      gl.disable(gl.POLYGON_OFFSET_FILL);
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    }

    // buffer di post-produzione
    const maxS = gl.getParameter(gl.MAX_SAMPLES) || 0;
    const samples = Math.min(4, maxS);
    let msFbo, msColor, msDepth, rsFbo, rsTex, bA, bB, fA, fB, PW = 0, PH = 0, BW = 0, BH = 0;
    function allocPost(w, h) {
      if (w === PW && h === PH) return;
      PW = w; PH = h;
      [msFbo, rsFbo, fA, fB].forEach((f) => f && gl.deleteFramebuffer(f));
      [msColor, msDepth].forEach((r) => r && gl.deleteRenderbuffer(r));
      [rsTex, bA, bB].forEach((t) => t && gl.deleteTexture(t));
      rsTex = mkTex(w, h);
      rsFbo = gl.createFramebuffer(); gl.bindFramebuffer(gl.FRAMEBUFFER, rsFbo);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, rsTex, 0);
      msDepth = gl.createRenderbuffer(); gl.bindRenderbuffer(gl.RENDERBUFFER, msDepth);
      if (samples > 1) {
        gl.renderbufferStorageMultisample(gl.RENDERBUFFER, samples, gl.DEPTH_COMPONENT24, w, h);
        msColor = gl.createRenderbuffer(); gl.bindRenderbuffer(gl.RENDERBUFFER, msColor);
        gl.renderbufferStorageMultisample(gl.RENDERBUFFER, samples, gl.RGBA8, w, h);
        msFbo = gl.createFramebuffer(); gl.bindFramebuffer(gl.FRAMEBUFFER, msFbo);
        gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.RENDERBUFFER, msColor);
        gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, msDepth);
      } else {
        gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT24, w, h);
        gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, msDepth);
        msFbo = rsFbo; msColor = null;
      }
      BW = Math.max(1, w >> 2); BH = Math.max(1, h >> 2);
      bA = mkTex(BW, BH); bB = mkTex(BW, BH);
      fA = gl.createFramebuffer(); gl.bindFramebuffer(gl.FRAMEBUFFER, fA); gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, bA, 0);
      fB = gl.createFramebuffer(); gl.bindFramebuffer(gl.FRAMEBUFFER, fB); gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, bB, 0);
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    }

    // ---------- camera orbitale ----------
    const cam = { target: [0, 4, 40], dist: 400, yaw: 0.6, pitch: 0.4, fov: 0.85 };
    function setEyeTarget(eye, target) {
      const d = V.sub(eye, target), dist = V.len(d);
      cam.target = target.slice(); cam.dist = dist;
      cam.pitch = Math.asin(d[1] / dist); cam.yaw = Math.atan2(d[0], d[2]);
    }
    function eyePos() {
      const cp = Math.cos(cam.pitch);
      return [cam.target[0] + cam.dist * cp * Math.sin(cam.yaw), cam.target[1] + cam.dist * Math.sin(cam.pitch), cam.target[2] + cam.dist * cp * Math.cos(cam.yaw)];
    }
    let anim = null;
    function goView(name, instant) {
      const v = VIEWS[name]; if (!v) return;
      const from = { target: cam.target.slice(), dist: cam.dist, yaw: cam.yaw, pitch: cam.pitch, fov: cam.fov };
      setEyeTarget(v.eye, v.target);
      const to = { target: cam.target.slice(), dist: cam.dist, yaw: cam.yaw, pitch: cam.pitch, fov: v.fov || 0.85 };
      if (instant) { anim = null; cam.fov = to.fov; return; }
      let dy = to.yaw - from.yaw; while (dy > Math.PI) dy -= 2 * Math.PI; while (dy < -Math.PI) dy += 2 * Math.PI;
      Object.assign(cam, from);
      anim = { from, to, dy, t0: performance.now(), dur: 1400 };
    }
    function stepAnim(now) {
      if (!anim) return;
      const t = Math.min(1, (now - anim.t0) / anim.dur), e = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      cam.target = V.lerp(anim.from.target, anim.to.target, e);
      cam.dist = Math.exp(Math.log(anim.from.dist) + (Math.log(anim.to.dist) - Math.log(anim.from.dist)) * e);
      cam.yaw = anim.from.yaw + anim.dy * e; cam.pitch = anim.from.pitch + (anim.to.pitch - anim.from.pitch) * e;
      cam.fov = anim.from.fov + (anim.to.fov - anim.from.fov) * e;
      if (t >= 1) anim = null;
    }
    const ptrs = new Map(); let lastPinch = 0;
    canvas.addEventListener('pointerdown', (e) => { canvas.setPointerCapture(e.pointerId); ptrs.set(e.pointerId, { x: e.clientX, y: e.clientY, b: e.button, sh: e.shiftKey }); anim = null; });
    const endPtr = (e) => { ptrs.delete(e.pointerId); lastPinch = 0; };
    canvas.addEventListener('pointerup', endPtr); canvas.addEventListener('pointercancel', endPtr);
    canvas.addEventListener('contextmenu', (e) => e.preventDefault());
    function pan(dx, dy) {
      const s = cam.dist * 0.0016;
      const r = [Math.cos(cam.yaw), 0, -Math.sin(cam.yaw)], f = [-Math.sin(cam.yaw), 0, -Math.cos(cam.yaw)];
      cam.target = V.add(cam.target, V.add(V.mul(r, -dx * s), V.mul(f, dy * s)));
      cam.target[0] = Math.max(-900, Math.min(900, cam.target[0])); cam.target[2] = Math.max(-900, Math.min(900, cam.target[2]));
    }
    canvas.addEventListener('pointermove', (e) => {
      const p = ptrs.get(e.pointerId); if (!p) return;
      const dx = e.clientX - p.x, dy = e.clientY - p.y; p.x = e.clientX; p.y = e.clientY;
      if (ptrs.size === 2) {
        const [a, b] = [...ptrs.values()]; const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (lastPinch) cam.dist = Math.max(4, Math.min(1800, cam.dist * lastPinch / d));
        lastPinch = d; pan(dx * 0.5, dy * 0.5); return;
      }
      if (p.b === 2 || p.sh || e.shiftKey) pan(dx, dy);
      else { cam.yaw -= dx * 0.005; cam.pitch = Math.max(0.03, Math.min(1.5707, cam.pitch + dy * 0.004)); }
    });
    canvas.addEventListener('wheel', (e) => { e.preventDefault(); anim = null; cam.dist = Math.max(4, Math.min(1800, cam.dist * Math.exp(e.deltaY * 0.0012))); }, { passive: false });

    // ---------- render ----------
    let mood = MOODS.notte, moodName = 'notte', motion = opts.reduced ? 0 : 1;
    function setMood(n) { if (MOODS[n]) { mood = MOODS[n]; moodName = n; } }
    let W = 0, H = 0, lastVP = null, frame = 0;
    const quality = opts.quality || 1;
    function resize(w, h) {
      const dpr = opts.dpr || Math.min(window.devicePixelRatio || 1, 2);
      w = w || canvas.clientWidth; h = h || canvas.clientHeight;
      const pw = Math.max(1, Math.round(w * dpr * quality)), ph = Math.max(1, Math.round(h * dpr * quality));
      if (pw !== canvas.width || ph !== canvas.height) { canvas.width = pw; canvas.height = ph; }
      W = pw; H = ph;
    }
    function fsq(p) { gl.useProgram(p); gl.bindVertexArray(fsVao); gl.drawArrays(gl.TRIANGLES, 0, 3); }
    function render(timeMs) {
      const t = motion ? (timeMs || 0) / 1000 : 12.0;
      stepAnim(timeMs || 0);
      if (frame++ % 3 === 0) drawScreen(t);
      if (shadowMood !== moodName) { renderShadow(mood); shadowMood = moodName; }
      allocPost(W, H);
      gl.bindFramebuffer(gl.FRAMEBUFFER, msFbo);
      gl.viewport(0, 0, W, H);
      gl.clearColor(0, 0, 0, 1); gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      const eye = eyePos(); if (eye[1] < 1.2) eye[1] = 1.2;
      const aspect = W / H, near = Math.max(0.3, Math.min(8, cam.dist * 0.01));
      const vp = mmul(perspective(cam.fov, aspect, near, 14000), lookAt(eye, cam.target, [0, 1, 0])); lastVP = vp;
      const f = V.norm(V.sub(cam.target, eye)), r = V.norm(V.cross(f, [0, 1, 0])), up = V.cross(r, f);
      // cielo
      gl.disable(gl.DEPTH_TEST); gl.useProgram(sky); gl.bindVertexArray(fsVao);
      gl.uniform3fv(u(sky, 'uR'), r); gl.uniform3fv(u(sky, 'uU'), up); gl.uniform3fv(u(sky, 'uF'), f);
      gl.uniform1f(u(sky, 'uTanY'), Math.tan(cam.fov / 2)); gl.uniform1f(u(sky, 'uTanX'), Math.tan(cam.fov / 2) * aspect);
      gl.uniform3fv(u(sky, 'uTop'), mood.top); gl.uniform3fv(u(sky, 'uHor'), mood.hor);
      gl.uniform3fv(u(sky, 'uSunDir'), mood.sun); gl.uniform3fv(u(sky, 'uSunCol'), moodName === 'notte' ? [0.5, 0.55, 0.7] : mood.sunCol);
      gl.uniform3fv(u(sky, 'uGlow'), mood.glow); gl.uniform1f(u(sky, 'uNight'), mood.night);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      // scena
      gl.enable(gl.DEPTH_TEST); gl.depthMask(true); gl.disable(gl.BLEND);
      gl.useProgram(prog); gl.bindVertexArray(vao);
      gl.uniformMatrix4fv(u(prog, 'uVP'), false, vp); gl.uniformMatrix4fv(u(prog, 'uLVP'), false, lightVP);
      gl.uniform3fv(u(prog, 'uCam'), eye); gl.uniform1f(u(prog, 'uTime'), t); gl.uniform1f(u(prog, 'uMotion'), motion);
      gl.uniform3fv(u(prog, 'uSunDir'), mood.sun); gl.uniform3fv(u(prog, 'uSunCol'), mood.sunCol);
      gl.uniform3fv(u(prog, 'uSkyAmb'), mood.sky); gl.uniform3fv(u(prog, 'uGndAmb'), mood.gnd);
      gl.uniform3fv(u(prog, 'uFogCol'), mood.fog); gl.uniform1f(u(prog, 'uFogDen'), mood.fogDen);
      gl.uniform1f(u(prog, 'uNight'), mood.night); gl.uniform1f(u(prog, 'uStage'), mood.stage);
      gl.uniform1f(u(prog, 'uShadowOn'), shadowOK ? 1 : 0); gl.uniform1f(u(prog, 'uTexel'), 1 / SH);
      gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, tex); gl.uniform1i(u(prog, 'uTex'), 0);
      gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D, atlas); gl.uniform1i(u(prog, 'uAtlas'), 1);
      gl.activeTexture(gl.TEXTURE2); gl.bindTexture(gl.TEXTURE_2D, shTex); gl.uniform1i(u(prog, 'uShadow'), 2);
      gl.drawArrays(gl.TRIANGLES, 0, vcount);
      // fasci e laser
      if (mood.beams > 0) {
        gl.enable(gl.BLEND); gl.blendFunc(gl.ONE, gl.ONE); gl.depthMask(false);
        gl.useProgram(beamP); gl.bindVertexArray(beamVao);
        gl.uniformMatrix4fv(u(beamP, 'uVP'), false, vp);
        for (const b of BEAMS) {
          let pan, tilt;
          if (b.laser) {
            pan = b.pan + 0.22 * Math.sin(t * 0.9 + b.ph * 0.3) * motion + (motion ? 0 : 0.1 * Math.sin(b.ph));
            tilt = b.tilt + 0.05 * Math.sin(t * 1.3 + b.ph) * motion;
          } else {
            pan = b.pan + 0.35 * Math.sin(t * 0.45 + b.ph) * motion + (motion ? 0 : 0.2 * Math.sin(b.ph));
            tilt = b.tilt + 0.18 * Math.sin(t * 0.31 + b.ph * 1.7) * motion;
          }
          const dir = V.norm([Math.sin(pan) * Math.cos(tilt), Math.sin(tilt), Math.cos(pan) * Math.cos(tilt)]);
          const ref = Math.abs(dir[1]) < 0.95 ? [0, 1, 0] : [1, 0, 0];
          const e1 = V.norm(V.cross(dir, ref)), e2 = V.cross(dir, e1);
          gl.uniform3fv(u(beamP, 'uO'), b.o); gl.uniform3fv(u(beamP, 'uDir'), dir);
          gl.uniform3fv(u(beamP, 'uE1'), e1); gl.uniform3fv(u(beamP, 'uE2'), e2);
          gl.uniform1f(u(beamP, 'uLen'), b.len); gl.uniform1f(u(beamP, 'uRad'), b.rad); gl.uniform1f(u(beamP, 'uBase'), b.base || 0.15);
          gl.uniform1f(u(beamP, 'uLaser'), b.laser ? 1 : 0);
          gl.uniform3fv(u(beamP, 'uCol'), b.col); gl.uniform1f(u(beamP, 'uAmt'), b.amt * mood.beams * (b.laser && moodName !== 'notte' ? 0.6 : 1));
          gl.drawArrays(gl.TRIANGLES, 0, SEG * 6);
        }
        gl.depthMask(true); gl.disable(gl.BLEND);
      }
      // risoluzione MSAA
      if (msFbo !== rsFbo) {
        gl.bindFramebuffer(gl.READ_FRAMEBUFFER, msFbo); gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER, rsFbo);
        gl.blitFramebuffer(0, 0, W, H, 0, 0, W, H, gl.COLOR_BUFFER_BIT, gl.NEAREST);
      }
      gl.disable(gl.DEPTH_TEST);
      // bloom
      gl.bindFramebuffer(gl.FRAMEBUFFER, fA); gl.viewport(0, 0, BW, BH);
      gl.useProgram(brightP); gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, rsTex);
      gl.uniform1i(u(brightP, 'uSrc'), 0); gl.uniform2f(u(brightP, 'uPx'), 1 / W, 1 / H); gl.uniform1f(u(brightP, 'uThr'), mood.thr);
      fsq(brightP);
      for (let pass = 0; pass < 2; pass++) {
        const sp = 1 + pass * 1.5;
        gl.bindFramebuffer(gl.FRAMEBUFFER, fB); gl.useProgram(blurP); gl.bindTexture(gl.TEXTURE_2D, bA);
        gl.uniform1i(u(blurP, 'uSrc'), 0); gl.uniform2f(u(blurP, 'uDir'), sp / BW, 0); fsq(blurP);
        gl.bindFramebuffer(gl.FRAMEBUFFER, fA); gl.bindTexture(gl.TEXTURE_2D, bB);
        gl.uniform2f(u(blurP, 'uDir'), 0, sp / BH); fsq(blurP);
      }
      // composizione finale
      gl.bindFramebuffer(gl.FRAMEBUFFER, null); gl.viewport(0, 0, W, H);
      gl.useProgram(compP);
      gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, rsTex); gl.uniform1i(u(compP, 'uBase'), 0);
      gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D, bA); gl.uniform1i(u(compP, 'uBloom'), 1);
      gl.uniform1f(u(compP, 'uBloomAmt'), mood.bloom);
      fsq(compP);
      gl.activeTexture(gl.TEXTURE0);
    }
    function project(p) {
      const m = lastVP; if (!m) return null;
      const x = m[0] * p[0] + m[4] * p[1] + m[8] * p[2] + m[12];
      const y = m[1] * p[0] + m[5] * p[1] + m[9] * p[2] + m[13];
      const w = m[3] * p[0] + m[7] * p[1] + m[11] * p[2] + m[15];
      if (w <= 0.1) return null;
      return [(x / w * 0.5 + 0.5), (1 - (y / w * 0.5 + 0.5))];
    }
    goView(opts.view || 'drone', true);
    return {
      gl, render, resize, goView, setMood, project, labels: LABELS, cam,
      eye: () => eyePos(), redrawSigns: drawAtlas,
      setMotion: (m) => { motion = m ? 1 : 0; },
      stats: { triangles: triCount, crowd: CROWD_COUNT, beams: BEAMS.length, samples, shadow: shadowOK, lite: LITE.on }
    };
  }

  window.GlitzScene = { init, VIEWS, MOODS, KIOSKS };
})();
