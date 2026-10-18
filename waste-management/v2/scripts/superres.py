"""Super-risoluzione (EDSR ×4) dei ritagli più deboli: ricostruzione dei dettagli, non semplice ingrandimento.
Uso: python3 scripts/superres.py [soglia_px=700]  → build/cut_sr/<stem>.png, build/cut_sr/index.json"""
import json
import sys
import time
from pathlib import Path

import cv2
import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
B = ROOT / 'build'
OUT = B / 'cut_sr'
OUT.mkdir(exist_ok=True)
MODEL = Path('/home/user/saafke/edsr_tensorflow/models/EDSR_x4.pb')
STAGE = (238, 244, 240)


def upscale(sr, path):
    im = Image.open(path).convert('RGBA')
    a = im.getchannel('A')
    flat = Image.new('RGB', im.size, STAGE)
    flat.paste(im, (0, 0), im)
    bgr = cv2.cvtColor(np.array(flat), cv2.COLOR_RGB2BGR)
    up = cv2.cvtColor(sr.upsample(bgr), cv2.COLOR_BGR2RGB)
    big = Image.fromarray(up).convert('RGBA')
    alpha = a.resize(big.size, Image.LANCZOS)
    big.putalpha(alpha)
    return big


if __name__ == '__main__':
    limit = int(sys.argv[1]) if len(sys.argv) > 1 else 700
    only = set(sys.argv[2:])
    idx = json.load(open(B / 'cut' / 'index.json'))
    done = json.load(open(OUT / 'index.json')) if (OUT / 'index.json').exists() else {}
    sr = cv2.dnn_superres.DnnSuperResImpl_create()
    sr.readModel(str(MODEL)); sr.setModel('edsr', 4)
    todo = [(k, r) for k, r in idx.items() if not r.get('exclude') and r['long'] < limit and k not in done and (not only or k[:8] in only)]
    print('da elaborare', len(todo), flush=True)
    for i, (k, r) in enumerate(todo):
        t = time.time()
        big = upscale(sr, B / 'cut' / r['cut'])
        name = Path(r['cut']).stem + '.png'
        big.save(OUT / name, optimize=False, compress_level=3)
        done[k] = dict(cut=name, long=max(big.size))
        json.dump(done, open(OUT / 'index.json', 'w'))
        print(i + 1, len(todo), r['cut'], big.size, f'{time.time() - t:.1f}s', flush=True)
