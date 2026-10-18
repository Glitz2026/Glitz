"""Fogli di controllo dei ritagli: python3 review_sheet.py <start> <n> <out.png>"""
import json, sys
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
ROOT = Path(__file__).resolve().parent.parent
idx = json.load(open(ROOT / 'build/cut/index.json'))
items = sorted(idx.items(), key=lambda kv: (kv[1]['uses'][0][0] if kv[1]['uses'] else 999))
start, n, out = int(sys.argv[1]), int(sys.argv[2]), sys.argv[3]
T = 300; cols = 8
sel = items[start:start + n]
rows = (len(sel) + cols - 1) // cols
sheet = Image.new('RGB', (cols * T, rows * (T + 34)), '#cfd8d3')
d = ImageDraw.Draw(sheet)
f = ImageFont.load_default()
for i, (fn, r) in enumerate(sel):
    im = Image.open(ROOT / 'build/cut' / r['cut'])
    im.thumbnail((T - 12, T - 12))
    x, y = (i % cols) * T, (i // cols) * (T + 34)
    tile = Image.new('RGB', (T - 4, T - 4), '#eef3f0'); tile.paste(im, ((T - 4 - im.width) // 2, (T - 4 - im.height) // 2), im)
    sheet.paste(tile, (x + 2, y + 2))
    u = r['uses'][0] if r['uses'] else ('?', '?')
    d.text((x + 4, y + T), f"{start+i} p{u[0]} {str(u[1])[:22]}", fill='black', font=f)
    d.text((x + 4, y + T + 12), f"{r['method']} {r['long']}px s{int(r['sharp'])} c{r['cover']}", fill='#333', font=f)
sheet.save(out)
