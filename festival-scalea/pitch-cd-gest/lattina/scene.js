import * as THREE from 'three'
import { Reflector } from 'three/addons/objects/Reflector.js'
import { drawLabel } from './label.js'

// Misure di una lattina standard da 33 cl, in millimetri.
const R = 33, WALL0 = 6.5, WALL1 = 99.5

function loadImage(src) {
  return new Promise((ok, ko) => { const i = new Image(); i.onload = () => ok(i); i.onerror = ko; i.src = src })
}

function canvasTexture(canvas, srgb = true) {
  const t = new THREE.CanvasTexture(canvas)
  if (srgb) t.colorSpace = THREE.SRGBColorSpace
  t.anisotropy = 16
  t.wrapS = THREE.RepeatWrapping
  return t
}

function lathe(points, segs = 160) {
  return new THREE.LatheGeometry(points.map(([r, y]) => new THREE.Vector2(r, y)), segs)
}

// Ambiente per i riflessi: una sala buia con un softbox, una striscia calda e un controluce viola.
function environment(renderer) {
  const env = new THREE.Scene()
  env.background = new THREE.Color('#040407')
  const panel = (w, h, color, intensity, pos, look) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: new THREE.Color(color).multiplyScalar(intensity), side: THREE.DoubleSide }))
    m.position.set(...pos); m.lookAt(...look); env.add(m)
  }
  panel(6, 4, '#ffffff', 6, [-6, 5, 7], [0, 0, 0])       // softbox principale
  panel(1.2, 9, '#ffb04a', 7, [8, 2, 1], [0, 0, 0])       // striscia calda a destra
  panel(1.0, 8, '#ffcf7a', 3, [-8, 2, -2], [0, 0, 0])     // striscia tenue a sinistra
  panel(5, 3, '#6d4dff', 4, [-2, 4, -9], [0, 0, 0])       // controluce viola
  panel(14, 14, '#16121c', 1, [0, -6, 0], [0, 0, 0])      // pavimento
  const pm = new THREE.PMREMGenerator(renderer)
  const tex = pm.fromScene(env, 0.02).texture
  pm.dispose()
  return tex
}

function bokehTexture() {
  const cv = document.createElement('canvas'); cv.width = 2400; cv.height = 1350
  const x = cv.getContext('2d')
  const g = x.createLinearGradient(0, 0, 0, cv.height)
  g.addColorStop(0, '#0d0b12'); g.addColorStop(0.55, '#0a090e'); g.addColorStop(1, '#060508')
  x.fillStyle = g; x.fillRect(0, 0, cv.width, cv.height)
  // alone del palco in alto
  const glow = x.createRadialGradient(cv.width * 0.62, -120, 40, cv.width * 0.62, -120, 1100)
  glow.addColorStop(0, 'rgba(217,168,87,0.30)'); glow.addColorStop(1, 'rgba(217,168,87,0)')
  x.fillStyle = glow; x.fillRect(0, 0, cv.width, cv.height)
  const cols = ['217,168,87', '255,170,90', '255,214,150', '140,110,255', '255,120,170']
  let s = 4242
  const rnd = () => (s = (s * 16807) % 2147483647) / 2147483647
  x.filter = 'blur(5px)'
  for (let i = 0; i < 90; i++) {
    const px = rnd() * cv.width, py = rnd() * cv.height * 0.72
    const r = 18 + rnd() * 70, col = cols[Math.floor(rnd() * (rnd() < 0.75 ? 3 : 5))]
    const a = 0.05 + rnd() * 0.22
    const rg = x.createRadialGradient(px, py, r * 0.2, px, py, r)
    rg.addColorStop(0, `rgba(${col},${a})`); rg.addColorStop(0.8, `rgba(${col},${a * 0.8})`); rg.addColorStop(1, `rgba(${col},0)`)
    x.fillStyle = rg; x.beginPath(); x.arc(px, py, r, 0, 7); x.fill()
  }
  x.filter = 'none'
  const t = new THREE.CanvasTexture(cv); t.colorSpace = THREE.SRGBColorSpace
  return t
}

function radialAlpha(inner, outer, color = '0,0,0', maxA = 1) {
  const cv = document.createElement('canvas'); cv.width = cv.height = 512
  const x = cv.getContext('2d')
  const g = x.createRadialGradient(256, 256, 256 * inner, 256, 256, 256 * outer)
  g.addColorStop(0, `rgba(${color},${maxA})`); g.addColorStop(1, `rgba(${color},0)`)
  x.fillStyle = g; x.fillRect(0, 0, 512, 512)
  return new THREE.CanvasTexture(cv)
}

function fadeTexture() {
  // pavimento: trasparente vicino alle lattine, scuro verso l'orizzonte
  const cv = document.createElement('canvas'); cv.width = cv.height = 1024
  const x = cv.getContext('2d')
  const g = x.createRadialGradient(512, 560, 60, 512, 560, 520)
  g.addColorStop(0, 'rgba(8,7,11,0.0)'); g.addColorStop(0.35, 'rgba(8,7,11,0.25)'); g.addColorStop(1, 'rgba(8,7,11,1)')
  x.fillStyle = g; x.fillRect(0, 0, 1024, 1024)
  return new THREE.CanvasTexture(cv)
}

function pullTab(alu) {
  const g = new THREE.Group()
  const shape = new THREE.Shape()
  const w = 11, l = 21, rr = 5
  shape.moveTo(-w / 2 + rr, -6)
  shape.lineTo(w / 2 - rr, -6); shape.quadraticCurveTo(w / 2, -6, w / 2, -6 + rr)
  shape.lineTo(w / 2, l - 6 - rr); shape.quadraticCurveTo(w / 2, l - 6, w / 2 - rr, l - 6)
  shape.lineTo(-w / 2 + rr, l - 6); shape.quadraticCurveTo(-w / 2, l - 6, -w / 2, l - 6 - rr)
  shape.lineTo(-w / 2, -6 + rr); shape.quadraticCurveTo(-w / 2, -6, -w / 2 + rr, -6)
  const hole = new THREE.Path()
  hole.absellipse(0, 8.5, 3.2, 4.2, 0, Math.PI * 2, true)
  shape.holes.push(hole)
  const geo = new THREE.ExtrudeGeometry(shape, { depth: 0.6, bevelEnabled: true, bevelThickness: 0.25, bevelSize: 0.35, bevelSegments: 3, curveSegments: 24 })
  const tab = new THREE.Mesh(geo, alu)
  tab.rotation.x = -Math.PI / 2
  g.add(tab)
  const rivet = new THREE.Mesh(new THREE.CylinderGeometry(1.9, 2.1, 0.9, 32), alu)
  rivet.position.set(0, 0.6, 0)
  g.add(rivet)
  return g
}

function scoreLine(darkAlu) {
  // incisione dell'apertura
  const shape = new THREE.Shape()
  shape.absellipse(0, 0, 8.6, 6.4, 0, Math.PI * 2, false)
  const inner = new THREE.Path(); inner.absellipse(0, 0, 8.1, 5.9, 0, Math.PI * 2, true)
  shape.holes.push(inner)
  const m = new THREE.Mesh(new THREE.ShapeGeometry(shape, 48), darkAlu)
  m.rotation.x = -Math.PI / 2
  return m
}

export function buildCan(labelMat) {
  const can = new THREE.Group()
  const alu = new THREE.MeshPhysicalMaterial({ color: '#d4d7dc', metalness: 1, roughness: 0.26, clearcoat: 0.3 })
  const darkAlu = new THREE.MeshStandardMaterial({ color: '#7c7f86', metalness: 1, roughness: 0.45 })
  const ink = new THREE.MeshPhysicalMaterial({ color: '#141119', metalness: 0.55, roughness: 0.3, clearcoat: 1, clearcoatRoughness: 0.1 })

  const bottom = new THREE.Mesh(lathe([[0, 4.2], [17, 2.4], [24, 0.6], [25.4, 0], [26.6, 0.4], [29, 2.0], [31.6, 4.3], [32.8, 5.8], [R, WALL0]]), alu)
  can.add(bottom)
  const wall = new THREE.Mesh(new THREE.CylinderGeometry(R, R, WALL1 - WALL0, 220, 1, true, Math.PI, Math.PI * 2), labelMat)
  wall.position.y = (WALL0 + WALL1) / 2
  can.add(wall)
  const neck = new THREE.Mesh(lathe([[R, WALL1], [32.7, 101.5], [31.4, 104.6], [29.2, 108], [27.6, 110.8], [27.1, 112.2]]), ink)
  can.add(neck)
  const lid = new THREE.Mesh(lathe([[27.1, 112.2], [27.6, 113.4], [27.7, 114.6], [27.2, 115.3], [26.4, 115.4], [25.7, 114.9], [25.5, 113.4], [24.9, 110.6], [24.2, 109.9], [0, 109.9]]), alu)
  can.add(lid)
  const tab = pullTab(alu)
  tab.position.set(0, 110.0, 0)
  can.add(tab)
  const score = scoreLine(darkAlu)
  score.position.set(0, 109.95, 13.5)
  can.add(score)
  can.traverse(o => { if (o.isMesh) { o.castShadow = true } })
  return can
}

export async function setup(opts) {
  const { width, height } = opts
  const canvas = document.getElementById('c')
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, preserveDrawingBuffer: true })
  renderer.setPixelRatio(1)
  renderer.setSize(width, height, false)
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.0
  renderer.outputColorSpace = THREE.SRGBColorSpace

  const logo = await loadImage('./assets/glitz-logo.png')
  const labelCanvas = drawLabel(document.createElement('canvas'), 'color', logo)
  const metalCanvas = drawLabel(document.createElement('canvas'), 'metal', logo)
  window.__label = labelCanvas
  const labelMat = new THREE.MeshPhysicalMaterial({
    map: canvasTexture(labelCanvas), metalnessMap: canvasTexture(metalCanvas, false),
    metalness: 1, roughness: 0.3, clearcoat: 1, clearcoatRoughness: 0.08,
  })

  const scene = new THREE.Scene()
  scene.environment = environment(renderer)
  scene.environmentIntensity = 1.0

  const bg = new THREE.Mesh(new THREE.PlaneGeometry(2400, 1350), new THREE.MeshBasicMaterial({ map: bokehTexture(), toneMapped: false }))
  bg.position.set(0, 330, -900)
  scene.add(bg)

  const key = new THREE.DirectionalLight('#fff3e0', 1.6); key.position.set(-300, 400, 500); scene.add(key)
  const rim = new THREE.DirectionalLight('#ffb35c', 1.4); rim.position.set(500, 200, -300); scene.add(rim)

  const mirror = new Reflector(new THREE.PlaneGeometry(4000, 4000), { textureWidth: width, textureHeight: height, color: 0x4a4650, clipBias: 0.003 })
  mirror.rotation.x = -Math.PI / 2
  scene.add(mirror)
  const fade = new THREE.Mesh(new THREE.PlaneGeometry(2600, 2600), new THREE.MeshBasicMaterial({ map: fadeTexture(), transparent: true, depthWrite: false, toneMapped: false }))
  fade.rotation.x = -Math.PI / 2; fade.position.y = 0.05
  scene.add(fade)
  const far = new THREE.Mesh(new THREE.PlaneGeometry(6000, 6000), new THREE.MeshBasicMaterial({ color: '#08070b', toneMapped: false }))
  far.rotation.x = -Math.PI / 2; far.position.y = -0.2
  // il piano lontano copre l'orizzonte del riflettore oltre la dissolvenza
  far.material.transparent = true
  scene.add(far)
  far.visible = false

  const shadowTex = radialAlpha(0.05, 1, '0,0,0', 0.85)
  const cans = []
  for (const c of opts.cans) {
    const can = buildCan(labelMat)
    can.position.set(c.x, 0, c.z)
    can.rotation.y = c.ry
    if (c.tilt) can.rotation.z = c.tilt
    scene.add(can)
    const sh = new THREE.Mesh(new THREE.PlaneGeometry(110, 110), new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, depthWrite: false }))
    sh.rotation.x = -Math.PI / 2; sh.position.set(c.x, 0.1, c.z)
    scene.add(sh)
    cans.push(can)
  }

  const cam = new THREE.PerspectiveCamera(opts.fov, width / height, 5, 5000)
  cam.position.set(...opts.cam)
  cam.lookAt(...opts.look)
  if (opts.offset) cam.setViewOffset(width, height, opts.offset[0], opts.offset[1], width, height)

  renderer.render(scene, cam)
  return canvas
}
