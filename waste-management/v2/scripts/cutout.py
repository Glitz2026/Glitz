"""Scontorna tutte le immagini sorgente e misura la qualità.

- PNG con maschera alfa (smask): usa la maschera originale.
- JPEG su fondo nero: maschera = pixel non neri collegati all'oggetto (più precisa del modello).
- Altre: rembg (isnet-general-use), poi rifinitura dei bordi bianchi.
Output: build/cut/<hash>.png (RGBA ritagliato) + build/cut/index.json
"""
import json
import sys
from pathlib import Path

import cv2
import numpy as np
from PIL import Image
from rembg import new_session, remove

ROOT = Path(__file__).resolve().parent.parent
B = ROOT / 'build'
OUT = B / 'cut'
OUT.mkdir(exist_ok=True)
IDX = json.load(open(B / 'images_index.json'))
sess = new_session('isnet-general-use')
res = json.load(open(OUT / 'index.json')) if (OUT / 'index.json').exists() else {}


def trim(rgba, pad=0.03):
    a = np.array(rgba.getchannel('A'))
    ys, xs = np.where(a > 8)
    if not len(xs):
        return rgba
    x0, x1, y0, y1 = xs.min(), xs.max(), ys.min(), ys.max()
    p = int(max(x1 - x0, y1 - y0) * pad)
    return rgba.crop((max(0, x0 - p), max(0, y0 - p), min(rgba.width, x1 + p + 1), min(rgba.height, y1 + p + 1)))


def sharpness(rgb, alpha):
    g = cv2.cvtColor(np.array(rgb), cv2.COLOR_RGB2GRAY).astype(np.float32)
    lap = cv2.Laplacian(g, cv2.CV_32F)
    m = np.array(alpha) > 128
    m = cv2.erode(m.astype(np.uint8), np.ones((5, 5), np.uint8)) > 0
    return float(lap[m].var()) if m.sum() > 100 else 0.0


for fn, r in IDX.items():
    if fn in res and (OUT / res[fn]['cut']).exists():
        continue
    src = Image.open(B / 'src' / fn)
    rgb = src.convert('RGB')
    w, h = rgb.size
    method = 'rembg'
    if r.get('mask'):
        m = Image.open(B / 'src' / r['mask']).convert('L').resize((w, h), Image.LANCZOS)
        rgba = rgb.copy(); rgba.putalpha(m); method = 'smask'
    elif r.get('edge', 255) < 40:
        arr = np.array(rgb).astype(np.int16)
        nonblack = (arr.max(axis=2) > 22).astype(np.uint8)
        nonblack = cv2.morphologyEx(nonblack, cv2.MORPH_CLOSE, np.ones((5, 5), np.uint8))
        n, lab, stats, _ = cv2.connectedComponentsWithStats(nonblack)
        keep = np.zeros_like(nonblack)
        for i in range(1, n):
            if stats[i, cv2.CC_STAT_AREA] > 0.002 * w * h:
                keep[lab == i] = 1
        alpha = cv2.GaussianBlur(keep.astype(np.float32) * 255, (3, 3), 0).astype(np.uint8)
        rgba = rgb.copy(); rgba.putalpha(Image.fromarray(alpha)); method = 'black-key'
    else:
        rgba = remove(rgb, session=sess, post_process_mask=True)
        # rifinitura: pixel quasi bianchi e semitrasparenti -> trasparenti (aloni del fondo)
        arr = np.array(rgba).astype(np.int16)
        white = (arr[..., :3].min(axis=2) > 243) & (arr[..., 3] < 200)
        arr[white, 3] = 0
        rgba = Image.fromarray(arr.astype(np.uint8), 'RGBA')
    cut = trim(rgba)
    a = cut.getchannel('A')
    cover = float((np.array(a) > 128).mean())
    out_name = Path(fn).stem + '.png'
    cut.save(OUT / out_name, optimize=True)
    res[fn] = dict(cut=out_name, method=method, w=cut.width, h=cut.height, long=max(cut.size), cover=round(cover, 3),
                   sharp=round(sharpness(cut.convert('RGB'), a), 1), edge=r.get('edge'), uses=r['uses'][:4])
    print(len(res), fn, method, cut.size, res[fn]['sharp'], flush=True)
    if len(res) % 20 == 0:
        json.dump(res, open(OUT / 'index.json', 'w'), indent=1)
json.dump(res, open(OUT / 'index.json', 'w'), indent=1)
print('fatto', len(res))
