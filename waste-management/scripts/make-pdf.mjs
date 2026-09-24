// Converte build/catalogo.html e build/selezione.html in PDF A4 (cartella output/)
import { chromium } from 'playwright';
import QRCode from 'qrcode';
import { writeFile, mkdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { serve } from './render-mockups.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const IG_URL = 'https://www.instagram.com/osso_vincenzo';

await writeFile(join(ROOT, 'build', 'qr-instagram.svg'),
  await QRCode.toString(IG_URL, { type: 'svg', margin: 0, color: { dark: '#0a2a39', light: '#ffffff' }, errorCorrectionLevel: 'M' }));
await mkdir(join(ROOT, 'output'), { recursive: true });

const srv = await serve(ROOT);
const port = srv.address().port;
const browser = await chromium.launch();
const docs = [
  ['catalogo.html', 'Waste-Management-Catalogo-2026.pdf', 'Waste Management · Catalogo 2026'],
  ['selezione.html', 'Waste-Management-Best-Seller-Personalizzati-2026.pdf', 'Waste Management · Best seller personalizzati'],
];
for (const [src, out, title] of docs) {
  const page = await browser.newPage();
  await page.goto(`http://127.0.0.1:${port}/build/${src}`, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.pdf({ path: join(ROOT, 'output', out), preferCSSPageSize: true, printBackground: true, tagged: true, outline: false });
  console.log('scritto', out, '-', title);
  await page.close();
}
await browser.close();
srv.close();
