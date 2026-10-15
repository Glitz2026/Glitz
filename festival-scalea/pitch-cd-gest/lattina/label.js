// Etichetta della lattina Birra Cala × GLITZ Festival.
// Il canvas copre tutta la circonferenza: il fronte è al centro (x = W/2),
// il retro è sulla giunta (x = 0 e x = W). Altezza = parete stampata.
export const W = 4480, H = 2048

const COLORS = {
  color: { gold: '#D9A857', goldSoft: 'rgba(217,168,87,', ivory: '#F2EDE4', grey: '#B9B2A7' },
  metal: { gold: '#ffffff', goldSoft: 'rgba(255,255,255,', ivory: '#000000', grey: '#000000' },
}

function background(ctx, mode) {
  if (mode === 'metal') { ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H); return }
  const g = ctx.createLinearGradient(0, 0, 0, H)
  g.addColorStop(0, '#1C1724')
  g.addColorStop(0.45, '#100E15')
  g.addColorStop(1, '#0B0A10')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, W, H)
  // grana leggera della stampa
  const img = ctx.getImageData(0, 0, W, H), d = img.data
  let s = 1234567
  for (let i = 0; i < d.length; i += 4) {
    s = (s * 1103515245 + 12345) & 0x7fffffff
    const n = ((s >> 8) % 9) - 4
    d[i] += n; d[i + 1] += n; d[i + 2] += n
  }
  ctx.putImageData(img, 0, 0)
}

function rays(ctx, c, cx) {
  // raggi dal palco, stile art déco
  const oy = H + 260
  ctx.save()
  ctx.beginPath(); ctx.rect(cx - 900, 300, 1800, H - 300); ctx.clip()
  for (let i = -12; i <= 12; i++) {
    const a = -Math.PI / 2 + i * 0.032
    const len = 2050
    const w = i % 3 === 0 ? 7 : 3
    const alpha = (i % 3 === 0 ? 0.30 : 0.16) * (1 - Math.abs(i) / 15)
    const grad = ctx.createLinearGradient(cx, oy, cx + Math.cos(a) * len, oy + Math.sin(a) * len)
    grad.addColorStop(0, c.goldSoft + (alpha * 1.4) + ')')
    grad.addColorStop(0.75, c.goldSoft + (alpha * 0.5) + ')')
    grad.addColorStop(1, c.goldSoft + '0)')
    ctx.strokeStyle = grad
    ctx.lineWidth = w
    ctx.beginPath(); ctx.moveTo(cx, oy); ctx.lineTo(cx + Math.cos(a) * len, oy + Math.sin(a) * len); ctx.stroke()
  }
  ctx.restore()
}

function arches(ctx, c, cx) {
  // l'arco del palco del festival
  ctx.save()
  ctx.strokeStyle = c.gold
  for (const [r, w] of [[250, 10], [300, 5], [345, 3]]) {
    ctx.lineWidth = w
    ctx.beginPath(); ctx.arc(cx, 1890, r, Math.PI, 2 * Math.PI); ctx.stroke()
  }
  ctx.restore()
}

function spaced(ctx, text, x, y, font, color, spacing, align = 'center') {
  ctx.save()
  ctx.font = font
  ctx.fillStyle = color
  ctx.letterSpacing = spacing + 'px'
  ctx.textAlign = align
  ctx.textBaseline = 'alphabetic'
  // il letterSpacing aggiunge spazio anche dopo l'ultima lettera: compenso
  const dx = align === 'center' ? spacing / 2 : 0
  ctx.fillText(text, x + dx, y)
  ctx.restore()
}

function diamond(ctx, x, y, r, color) {
  ctx.save(); ctx.fillStyle = color
  ctx.beginPath(); ctx.moveTo(x, y - r); ctx.lineTo(x + r, y); ctx.lineTo(x, y + r); ctx.lineTo(x - r, y); ctx.closePath(); ctx.fill()
  ctx.restore()
}

function bands(ctx, c) {
  ctx.fillStyle = c.gold
  ctx.fillRect(0, 96, W, 6)
  ctx.fillRect(0, 262, W, 3)
  ctx.fillRect(0, H - 150, W, 3)
  ctx.fillRect(0, H - 22, W, 6)
  // testo che gira intorno alla lattina
  const unit = 'GLITZ FESTIVAL   ✦   SCALEA   ✦   EDIZIONE LIMITATA   ✦   '
  ctx.save()
  ctx.font = '600 62px Archivo'
  ctx.letterSpacing = '16px'
  ctx.fillStyle = c.gold
  ctx.textBaseline = 'middle'
  const uw = ctx.measureText(unit).width
  const n = Math.max(1, Math.round(W / uw))
  const scale = W / (uw * n) // ripetizioni intere, nessuna giunta visibile
  ctx.translate(0, 182)
  ctx.scale(scale, 1)
  for (let i = 0; i < n; i++) ctx.fillText(unit, i * uw, 0)
  ctx.restore()
  // fascia bassa
  ctx.save()
  ctx.font = '600 50px Archivo'
  ctx.letterSpacing = '22px'
  ctx.fillStyle = c.gold
  ctx.textBaseline = 'middle'
  const low = 'SCALEA   ·   RIVIERA DEI CEDRI   ·   CALABRIA   ·   '
  const lw = ctx.measureText(low).width
  const m = Math.max(1, Math.round(W / lw))
  ctx.translate(0, H - 86)
  ctx.scale(W / (lw * m), 1)
  for (let i = 0; i < m; i++) ctx.fillText(low, i * lw, 0)
  ctx.restore()
}

function front(ctx, c) {
  const cx = W / 2
  rays(ctx, c, cx)
  arches(ctx, c, cx)
  spaced(ctx, 'BIRRA', cx, 560, '600 118px Archivo', c.gold, 64)
  // wordmark
  ctx.save()
  ctx.font = 'italic 500 600px "Bodoni Moda"'
  const w = ctx.measureText('Cala').width
  const maxW = 1180
  const k = Math.min(1, maxW / w)
  ctx.translate(cx, 1150)
  ctx.scale(k, k)
  ctx.textAlign = 'center'
  ctx.fillStyle = c.ivory
  ctx.fillText('Cala', 0, 0)
  ctx.restore()
  ctx.fillStyle = c.gold
  ctx.fillRect(cx - 300, 1262, 240, 4)
  ctx.fillRect(cx + 60, 1262, 240, 4)
  diamond(ctx, cx, 1264, 16, c.gold)
  spaced(ctx, 'PASSIONE · LAGER', cx, 1380, '600 64px Archivo', c.ivory, 18)
  spaced(ctx, 'Edizione GLITZ Festival', cx, 1500, 'italic 400 72px "Bodoni Moda"', c.gold, 0)
}

function glitzSide(ctx, c, cx, logo) {
  if (logo) {
    const lw = 820, lh = lw * logo.height / logo.width
    ctx.drawImage(tint(logo, c.gold), cx - lw / 2, 560, lw, lh)
  }
  spaced(ctx, 'FESTIVAL', cx, 1090, '600 92px Archivo', c.gold, 48)
  ctx.fillStyle = c.gold
  ctx.fillRect(cx - 220, 1170, 440, 3)
  spaced(ctx, 'Musica internazionale', cx, 1320, 'italic 400 84px "Bodoni Moda"', c.ivory, 0)
  spaced(ctx, 'sul mare di Scalea', cx, 1430, 'italic 400 84px "Bodoni Moda"', c.ivory, 0)
}

function cedro(ctx, c, cx, cy, s) {
  ctx.save()
  ctx.translate(cx, cy); ctx.scale(s, s); ctx.rotate(-0.35)
  ctx.strokeStyle = c.gold; ctx.lineWidth = 5; ctx.lineJoin = 'round'; ctx.lineCap = 'round'
  // frutto: ovale bitorzoluto del cedro
  ctx.beginPath()
  ctx.moveTo(0, -150)
  ctx.bezierCurveTo(70, -150, 112, -92, 108, -20)
  ctx.bezierCurveTo(118, 50, 92, 128, 30, 150)
  ctx.bezierCurveTo(8, 160, -8, 160, -30, 150)
  ctx.bezierCurveTo(-96, 124, -116, 48, -106, -24)
  ctx.bezierCurveTo(-110, -96, -66, -150, 0, -150)
  ctx.stroke()
  ctx.fillStyle = c.gold
  let s2 = 99
  for (let i = 0; i < 26; i++) {
    s2 = (s2 * 16807) % 2147483647
    const a = (s2 % 628) / 100, r = 30 + (s2 % 60)
    ctx.beginPath(); ctx.arc(Math.cos(a) * r * 0.85, Math.sin(a) * r * 1.2, 3.2, 0, 7); ctx.fill()
  }
  ctx.beginPath(); ctx.moveTo(0, -150); ctx.quadraticCurveTo(6, -178, 22, -196); ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(22, -196)
  ctx.bezierCurveTo(70, -250, 160, -262, 220, -232)
  ctx.bezierCurveTo(170, -176, 90, -164, 22, -196)
  ctx.stroke()
  ctx.beginPath(); ctx.moveTo(30, -198); ctx.quadraticCurveTo(120, -222, 210, -230); ctx.stroke()
  ctx.restore()
}

function infoSide(ctx, c, cx) {
  cedro(ctx, c, cx - 10, 600, 0.9)
  spaced(ctx, 'Carattere Calabro', cx, 960, 'italic 400 92px "Bodoni Moda"', c.ivory, 0)
  spaced(ctx, 'PRODOTTA A SCALEA', cx, 1070, '600 54px Archivo', c.gold, 16)
  spaced(ctx, 'Lager · 4,8% vol · 33 cl', cx, 1230, '600 64px Archivo', c.ivory, 4)
  spaced(ctx, 'Premiata ai World Beer Awards 2025', cx, 1340, 'italic 400 64px "Bodoni Moda"', c.gold, 0)
  spaced(ctx, 'Vietata la vendita ai minori di 18 anni', cx, 1560, '400 42px Archivo', c.grey, 0)
  spaced(ctx, 'Bevi responsabilmente', cx, 1622, '400 42px Archivo', c.grey, 0)
}

function tint(img, color) {
  const cv = new OffscreenCanvas(img.width, img.height)
  const x = cv.getContext('2d')
  x.drawImage(img, 0, 0)
  // tolgo l'alone del PNG: tengo solo il tratto pieno delle lettere
  const id = x.getImageData(0, 0, img.width, img.height), d = id.data
  for (let i = 3; i < d.length; i += 4) d[i] = d[i] > 150 ? 255 : d[i] > 110 ? (d[i] - 110) * 6 : 0
  x.putImageData(id, 0, 0)
  x.globalCompositeOperation = 'source-in'
  x.fillStyle = color
  x.fillRect(0, 0, img.width, img.height)
  return cv
}

export function drawLabel(canvas, mode, logo) {
  canvas.width = W; canvas.height = H
  const ctx = canvas.getContext('2d')
  const c = COLORS[mode]
  background(ctx, mode)
  bands(ctx, c)
  // tre pannelli a 120 gradi: fronte al centro, GLITZ a destra, informazioni a sinistra
  front(ctx, c)
  glitzSide(ctx, c, W / 2 + W / 3, logo)
  infoSide(ctx, c, W / 2 - W / 3)
  return canvas
}
