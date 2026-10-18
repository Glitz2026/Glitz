"""Correzioni puntuali dello scontorno (metodo diverso o esclusione)."""
import json
from pathlib import Path
import cv2, numpy as np
from PIL import Image
from rembg import new_session, remove
ROOT = Path(__file__).resolve().parent.parent
C = ROOT / 'build/cut'
idx = json.load(open(C / 'index.json'))
FIX = {
    '4352eca607221bea.jpeg': 'rect', 'ef156294347ac537.jpeg': 'floodwhite', '9159d1c052f26f18.jpeg': 'rembg',
    '5db2f9238513fba8.jpeg': 'black-key', 'ada2734742580db9.jpeg': 'black-key',
    'd0a1fe085218f1be.jpeg': 'rembg', 'abe3371217a89a23.jpeg': 'rembg',
    'f69817ac1eac83f9.jpeg': 'rembg-top',   # vassoio in polpa: solo il vassoio superiore, il secondo è tagliato male dal fondo scuro
}
EXCLUDE = ['3dd69d33c4682909.jpeg', 'd62608d82cee09f7.jpeg', 'e2ee96743ca3fb92.jpeg', '09f65c057ce70aa3.jpeg', '79403e2a305f0e14.jpeg',
           '88181cab30ee0e29.jpeg', '9e9f1c4fc082173e.jpeg', '19d23efbfff36687.jpeg', 'e3c02e012d74e7ca.jpeg', '97cf58fec3575ab2.jpeg',
           '27b38f117c1efe72.jpeg', '641354f7d4ac4cf3.jpeg', '89f8362e8c8c2592.jpeg', 'c9204bf7ec281638.jpeg',
           '7ba0efed1e9ac758.jpeg', '6e9badb9b1d77ff4.jpeg', 'a2177118f8255269.jpeg', '785267fadad712da.jpeg', '32c4caae18cfe9ca.jpeg']
sess = None


def trim(rgba, pad=0.03):
    a = np.array(rgba.getchannel('A')); ys, xs = np.where(a > 8)
    x0, x1, y0, y1 = xs.min(), xs.max(), ys.min(), ys.max(); p = int(max(x1 - x0, y1 - y0) * pad)
    return rgba.crop((max(0, x0 - p), max(0, y0 - p), min(rgba.width, x1 + p + 1), min(rgba.height, y1 + p + 1)))


for fn, how in FIX.items():
    rgb = Image.open(ROOT / 'build/src' / fn).convert('RGB'); arr = np.array(rgb).astype(np.int16); h, w = arr.shape[:2]
    if how == 'rect':
        m = (arr.min(axis=2) < 245).astype(np.uint8); ys, xs = np.where(m)
        a = np.zeros((h, w), np.uint8); a[ys.min():ys.max() + 1, xs.min():xs.max() + 1] = 255
    elif how == 'floodwhite':
        bg = (arr.min(axis=2) > 246).astype(np.uint8)
        n, lab = cv2.connectedComponents(bg)
        border = set(np.unique(np.concatenate([lab[0], lab[-1], lab[:, 0], lab[:, -1]])))
        a = np.where(np.isin(lab, list(border - {0})) & (bg > 0), 0, 255).astype(np.uint8)
        a = cv2.morphologyEx(a, cv2.MORPH_OPEN, np.ones((5, 5), np.uint8))
    elif how == 'black-key':
        nb = (arr.max(axis=2) > 22).astype(np.uint8); nb = cv2.morphologyEx(nb, cv2.MORPH_CLOSE, np.ones((5, 5), np.uint8))
        a = cv2.GaussianBlur(nb.astype(np.float32) * 255, (3, 3), 0).astype(np.uint8)
    elif how == 'rembg-top':
        rgb = rgb.crop((0, 0, w, int(h * 0.5))); sess = sess or new_session('isnet-general-use')
        a = np.array(remove(rgb, session=sess, only_mask=True, post_process_mask=True))
    else:
        sess = sess or new_session('isnet-general-use')
        a = np.array(remove(rgb, session=sess, only_mask=True, post_process_mask=True))
    rgba = rgb.copy(); rgba.putalpha(Image.fromarray(a)); cut = trim(rgba)
    cut.save(C / idx[fn]['cut']); idx[fn].update(method=how, w=cut.width, h=cut.height, long=max(cut.size))
    print('fix', fn, how, cut.size)
for fn in EXCLUDE:
    idx[fn]['exclude'] = True
json.dump(idx, open(C / 'index.json', 'w'), indent=1)
print('esclusi', len(EXCLUDE))
