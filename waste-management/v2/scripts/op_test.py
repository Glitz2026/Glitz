"""Prova delle composizioni di apertura: python3 scripts/op_test.py → scratchpad/op.png"""
import sys
from pathlib import Path
from PIL import Image
sys.path.insert(0, str(Path(__file__).parent))
src = open(Path(__file__).parent / 'layout.py').read().split('# ---------------------------------------------------------------- assemblaggio')[0]
g = {'__file__': str(Path(__file__).parent / 'layout.py'), '__name__': 'op_test'}
exec(compile(src, 'layout', 'exec'), g)
ims = []
for sid in [s['id'] for s in g['SECS']]:
    rel = g['op_art'](sid); ims.append(Image.open(g['B'] / rel))
W = 700; h = int(W * ims[0].height / ims[0].width)
S = Image.new('RGB', (2 * W + 10, 4 * (h + 10)), 'white')
for i, im in enumerate(ims):
    S.paste(im.resize((W, h)), ((i % 2) * (W + 10), (i // 2) * (h + 10)))
S.save(sys.argv[1] if len(sys.argv) > 1 else '/tmp/op.png')
