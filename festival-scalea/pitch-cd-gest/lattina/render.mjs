// Render del mockup della lattina con Chromium headless (WebGL via SwiftShader).
// Uso, dalla cartella lattina/ dopo npm install:
//   PLAYWRIGHT=/percorso/playwright-core/index.mjs CHROMIUM=/percorso/chrome node render.mjs shots.json [nome,...]
// Scrive render/<nome>.png e render/etichetta.png (l'etichetta piatta).
import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
const { chromium } = await import(process.env.PLAYWRIGHT || 'playwright-core')

const root = path.dirname(fileURLToPath(import.meta.url))
const types = { '.html': 'text/html', '.js': 'text/javascript', '.png': 'image/png', '.woff2': 'font/woff2' }
const srv = http.createServer((q, s) => {
  const p = path.join(root, decodeURIComponent(q.url.split('?')[0]))
  if (!p.startsWith(root) || !fs.existsSync(p) || fs.statSync(p).isDirectory()) { s.writeHead(404); return s.end() }
  s.writeHead(200, { 'content-type': types[path.extname(p)] || 'application/octet-stream' })
  fs.createReadStream(p).pipe(s)
}).listen(0)
const port = srv.address().port
const shots = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'))
const only = process.argv[3] ? process.argv[3].split(',') : null
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM, args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] })
const page = await browser.newPage()
page.on('pageerror', (e) => console.log('[errore]', e.message))
fs.mkdirSync(path.join(root, 'render'), { recursive: true })
let label = false
for (const [name, opts] of Object.entries(shots)) {
  if (only && !only.includes(name)) continue
  await page.goto(`http://127.0.0.1:${port}/index.html`)
  const t0 = Date.now()
  const url = await page.evaluate((o) => window.shoot(o), opts)
  fs.writeFileSync(path.join(root, 'render', `${name}.png`), Buffer.from(url.split(',')[1], 'base64'))
  console.log(name, ((Date.now() - t0) / 1000).toFixed(1) + ' s')
  if (!label) {
    const l = await page.evaluate(() => window.labelPng())
    fs.writeFileSync(path.join(root, 'render', 'etichetta.png'), Buffer.from(l.split(',')[1], 'base64'))
    label = true
  }
}
await browser.close()
srv.close()
