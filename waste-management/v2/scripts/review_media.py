"""Foglio di controllo: per ogni famiglia l'immagine principale e le miniature, con nome e prime varianti."""
import sys
sys.argv = ['layout']  # evita l'esecuzione dell'assemblaggio
import json
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
ROOT = Path(__file__).resolve().parent.parent
src = open(ROOT / 'scripts' / 'layout.py').read().split('# ---------------------------------------------------------------- componenti')[0]
g = {'__file__': str(ROOT / 'scripts' / 'layout.py')}
exec(compile(src, 'layout_head', 'exec'), g)
fams = [F for F in g['CAT']['families'] if F['kind'] in ('product', 'accessory', 'detergent')]
font = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf', 13) if Path('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf').exists() else ImageFont.load_default()
W, H, cols = 300, 330, 6
out = ROOT / 'build' / 'review'
out.mkdir(exist_ok=True)
for k in range(0, len(fams), 36):
    chunk = fams[k:k + 36]
    S = Image.new('RGB', (cols * W, -(-len(chunk) // cols) * H), 'white')
    d = ImageDraw.Draw(S)
    for i, F in enumerate(chunk):
        x, y = (i % cols) * W, (i // cols) * H
        media, thumbs, rep = g['family_media'](F)
        if media:
            im = Image.open(media[0]).convert('RGBA'); im.thumbnail((W - 20, 200))
            bg = Image.new('RGBA', im.size, (238, 244, 240, 255)); bg.alpha_composite(im)
            S.paste(bg.convert('RGB'), (x + 10, y + 5))
        for j, (p, code) in enumerate(thumbs[:5]):
            t = Image.open(p).convert('RGBA'); t.thumbnail((52, 52))
            bg = Image.new('RGBA', t.size, (238, 244, 240, 255)); bg.alpha_composite(t)
            S.paste(bg.convert('RGB'), (x + 10 + j * 56, y + 208))
        d.text((x + 10, y + 264), f"{k + i}. {F['name'][:34]}", fill='black', font=font)
        d.text((x + 10, y + 280), (F['rows'][0]['variant'] if F['rows'] else '')[:38], fill=(90, 90, 90), font=font)
        d.text((x + 10, y + 296), f"{'REP ' if rep else ''}{media[2] or '' if media else 'NESSUNA'}", fill=(150, 30, 30), font=font)
    S.save(out / f'media{k // 36 + 1}.png')
print(len(fams))
