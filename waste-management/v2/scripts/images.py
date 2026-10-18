"""Preparazione immagini per l'impaginato: fondo uniforme, ombra di contatto, risoluzione alla misura di stampa."""
import hashlib
import json
from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
B = ROOT / 'build'
OUT = B / 'img'
OUT.mkdir(parents=True, exist_ok=True)
BG = {'stage': (238, 244, 240), 'petrol': (10, 42, 57), 'white': (255, 255, 255), 'mint': (241, 246, 243)}
MIN_DPI = 180      # sotto questa soglia l'immagine viene mostrata più piccola, mai ingrandita oltre
TARGET_DPI = 300
REPORT = []        # (file, uso, dpi effettivi)


def _shadow(rgba, dark=False):
    """Ombra morbida coerente con i render: ellisse sotto l'oggetto + leggera ombra portata."""
    w, h = rgba.size
    a = np.array(rgba.getchannel('A')).astype(np.float32) / 255
    pad = int(max(w, h) * 0.06)
    canvas = Image.new('L', (w + 2 * pad, h + 2 * pad), 0)
    # ombra portata (sagoma spostata e sfocata)
    sil = Image.fromarray((a * 255).astype(np.uint8))
    canvas.paste(sil, (pad + int(w * 0.012), pad + int(h * 0.018)))
    canvas = canvas.filter(ImageFilter.GaussianBlur(max(2, int(max(w, h) * 0.012))))
    drop = np.array(canvas).astype(np.float32) * (0.16 if not dark else 0.35)
    # ellisse di appoggio
    ys = np.where(a.max(axis=1) > 0.3)[0]
    xs = np.where(a.max(axis=0) > 0.3)[0]
    ell = Image.new('L', canvas.size, 0)
    if len(xs) and len(ys):
        from PIL import ImageDraw
        d = ImageDraw.Draw(ell)
        bw = (xs[-1] - xs[0]) * 0.86
        cx = pad + (xs[0] + xs[-1]) / 2
        by = pad + ys[-1]
        eh = max(4, (xs[-1] - xs[0]) * 0.045)
        d.ellipse([cx - bw / 2, by - eh * 0.6, cx + bw / 2, by + eh * 0.9], fill=255)
        ell = ell.filter(ImageFilter.GaussianBlur(max(3, int(eh * 1.1))))
    shadow = np.maximum(drop, np.array(ell).astype(np.float32) * (0.22 if not dark else 0.45))
    return shadow, pad


def prep(src, bg='stage', box_mm=(80, 80), kind='photo', use='', min_dpi=MIN_DPI):
    """Restituisce (percorso relativo a build/, larghezza mm, altezza mm, dpi)."""
    src = Path(src)
    key = hashlib.sha1(f'{src}|{src.stat().st_mtime_ns}|{bg}|{box_mm}|{kind}'.encode()).hexdigest()[:14]
    out = OUT / f'{key}.jpg'
    meta = OUT / f'{key}.json'
    if out.exists() and meta.exists():
        m = json.load(open(meta))
        REPORT.append((src.name, use, m['dpi']))
        return m['rel'], m['w'], m['h'], m['dpi']
    im = Image.open(src).convert('RGBA')
    # rifila l'alfa quasi nullo (velo del piano d'ombra dei render)
    a = np.array(im.getchannel('A'))
    if kind == 'render':
        a = np.where(a < 16, 0, ((a.astype(np.int32) - 16) * 255 // 239)).astype(np.uint8)
        im.putalpha(Image.fromarray(a))
    bb = Image.fromarray((a > 6).astype(np.uint8) * 255).getbbox()
    if bb:
        m = int(max(im.size) * 0.01)
        im = im.crop((max(0, bb[0] - m), max(0, bb[1] - m), min(im.width, bb[2] + m), min(im.height, bb[3] + m)))
    dark = bg == 'petrol'
    if kind == 'photo':
        sh, pad = _shadow(im, dark)
        W, H = im.width + 2 * pad, im.height + 2 * pad
        base = Image.new('RGBA', (W, H), BG[bg] + (255,))
        shade = Image.new('RGBA', (W, H), (0, 0, 0, 0))
        shade.putalpha(Image.fromarray(np.clip(sh, 0, 255).astype(np.uint8)))
        base = Image.alpha_composite(base, shade)
        base.alpha_composite(im, (pad, pad))
        flat = base.convert('RGB')
    else:
        flat = Image.new('RGB', im.size, BG[bg]); flat.paste(im, (0, 0), im)
    # misura di stampa: adatta al riquadro, senza superare la risoluzione disponibile
    bw, bh = box_mm
    ar = flat.width / flat.height
    w_mm, h_mm = (bw, bw / ar) if bw / ar <= bh else (bh * ar, bh)
    dpi = flat.width / (w_mm / 25.4)
    if dpi < min_dpi:  # immagine debole: la mostriamo più piccola invece di ingrandirla
        w_mm = flat.width / min_dpi * 25.4; h_mm = w_mm / ar; dpi = min_dpi
    need = int(round(w_mm / 25.4 * TARGET_DPI))
    if flat.width > need:
        flat = flat.resize((need, max(1, int(need / ar))), Image.LANCZOS)
        dpi = TARGET_DPI
    flat.save(out, 'JPEG', quality=88, optimize=True, progressive=True)
    m = dict(rel=f'img/{out.name}', w=round(w_mm, 2), h=round(h_mm, 2), dpi=round(dpi))
    json.dump(m, open(meta, 'w'))
    REPORT.append((src.name, use, m['dpi']))
    return m['rel'], m['w'], m['h'], m['dpi']


def photo(src, box_mm, use='', bg='white'):
    """Fotografia rettangolare (sede, realizzazioni): ritaglio a riempimento del riquadro."""
    src = Path(src)
    key = hashlib.sha1(f'{src}|{src.stat().st_mtime_ns}|photo|{box_mm}'.encode()).hexdigest()[:14]
    out = OUT / f'{key}.jpg'
    im = Image.open(src).convert('RGB')
    bw, bh = box_mm
    ar_box = bw / bh
    ar = im.width / im.height
    if ar > ar_box:
        nw = int(im.height * ar_box); x0 = (im.width - nw) // 2; im = im.crop((x0, 0, x0 + nw, im.height))
    else:
        nh = int(im.width / ar_box); y0 = (im.height - nh) // 3; im = im.crop((0, y0, im.width, y0 + nh))
    dpi = im.width / (bw / 25.4)
    need = int(bw / 25.4 * TARGET_DPI)
    if im.width > need:
        im = im.resize((need, int(need / ar_box)), Image.LANCZOS); dpi = TARGET_DPI
    if not out.exists():
        im.save(out, 'JPEG', quality=88, optimize=True, progressive=True)
    REPORT.append((src.name, use, round(dpi)))
    return f'img/{out.name}', round(dpi)


def collage(items, height_mm, bg='petrol', gap=-0.06, name='collage'):
    """Composizione di più ritagli affiancati su una linea di appoggio comune."""
    px_mm = TARGET_DPI / 25.4
    H = int(height_mm * px_mm)
    parts = []
    for path, h_rel, kind in items:
        im = Image.open(path).convert('RGBA')
        a = np.array(im.getchannel('A'))
        if kind == 'render':
            a = np.where(a < 16, 0, a).astype(np.uint8); im.putalpha(Image.fromarray(a))
        bb = im.getchannel('A').point(lambda v: 255 if v > 6 else 0).getbbox()
        im = im.crop(bb)
        th = int(H * h_rel)
        im = im.resize((max(1, int(im.width * th / im.height)), th), Image.LANCZOS)
        parts.append((im, kind))
    total = sum(p.width for p, _ in parts) + int(sum(p.width for p, _ in parts[:-1]) * gap)
    W = total + int(H * 0.2)
    canvas = Image.new('RGBA', (W, H), BG[bg] + (255,))
    x = int(H * 0.1)
    for im, kind in parts:
        y = H - im.height - int(H * 0.04)
        if kind == 'photo':
            sh, pad = _shadow(im, bg == 'petrol')
            shade = Image.new('RGBA', (im.width + 2 * pad, im.height + 2 * pad), (0, 0, 0, 0))
            shade.putalpha(Image.fromarray(np.clip(sh, 0, 255).astype(np.uint8)))
            canvas.alpha_composite(shade, (max(0, x - pad), max(0, min(H - shade.height, y - pad))))
        canvas.alpha_composite(im, (x, y))
        x += int(im.width * (1 + gap))
    out = OUT / f'{name}-{bg}.jpg'
    canvas.convert('RGB').save(out, 'JPEG', quality=88, optimize=True, progressive=True)
    return f'img/{out.name}'


def compose(items, box_mm, bg='stage', name='comp', overlap=0.05, base_mm=4):
    """Composizione di aperture: ritagli e render con altezze reali relative (mm), appoggiati su una linea comune,
    scalati insieme per riempire il riquadro. items = [(percorso, 'photo'|'render', altezza_mm)]."""
    px = TARGET_DPI / 25.4
    parts = []
    for path, kind, h_mm in items:
        im = Image.open(path).convert('RGBA')
        a = np.array(im.getchannel('A'))
        if kind == 'render':
            a = np.where(a < 16, 0, a).astype(np.uint8); im.putalpha(Image.fromarray(a))
        im = im.crop(Image.fromarray((a > 6).astype(np.uint8) * 255).getbbox())
        th = int(h_mm * px)
        im = im.resize((max(1, int(im.width * th / im.height)), th), Image.LANCZOS)
        pad = 0
        if kind == 'photo':
            sh, pad = _shadow(im, bg == 'petrol')
            lay = Image.new('RGBA', (im.width + 2 * pad, im.height + 2 * pad), (0, 0, 0, 0))
            lay.putalpha(Image.fromarray(np.clip(sh, 0, 255).astype(np.uint8)))
            lay.alpha_composite(im, (pad, pad))
            im = lay
        parts.append((im, pad))
    widths = [im.width - 2 * pad for im, pad in parts]
    total = sum(widths) - overlap * sum(widths[:-1])
    tall = max(im.height - 2 * pad for im, pad in parts)
    W, H = int(box_mm[0] * px), int(box_mm[1] * px)
    base = int(base_mm * px)
    s = min(1.0, W * 0.96 / total, (H - base) * 0.98 / tall)
    canvas = Image.new('RGBA', (W, H), BG[bg] + (255,))
    x = (W - total * s) / 2
    for (im, pad), w in zip(parts, widths):
        im = im.resize((max(1, int(im.width * s)), max(1, int(im.height * s))), Image.LANCZOS)
        p = int(pad * s)
        canvas.alpha_composite(im, (int(x) - p, max(0, H - base - (im.height - p))))
        x += w * s * (1 - overlap)
    out = OUT / f'{name}-{bg}.jpg'
    canvas.convert('RGB').save(out, 'JPEG', quality=88, optimize=True, progressive=True)
    return f'img/{out.name}'


def to_jpeg(src, name, max_w=None, quality=88):
    """Immagine piena (copertina, retro) in JPEG per contenere il peso del PDF."""
    out = OUT / f'{name}.jpg'
    im = Image.open(src).convert('RGB')
    if max_w and im.width > max_w:
        im = im.resize((max_w, int(im.height * max_w / im.width)), Image.LANCZOS)
    im.save(out, 'JPEG', quality=quality, optimize=True, progressive=True)
    return f'img/{out.name}'


def still_life(items, box_mm, bg='stage', name='scene'):
    """Composizione art-diretta: items = [(percorso, tipo, altezza_mm, centro_x 0-1, base 0-1 dal basso)], disegnati in ordine (dal fondo)."""
    px = TARGET_DPI / 25.4
    W, H = int(box_mm[0] * px), int(box_mm[1] * px)
    canvas = Image.new('RGBA', (W, H), BG[bg] + (255,))
    for path, kind, h_mm, cx, base in items:
        im = Image.open(path).convert('RGBA')
        a = np.array(im.getchannel('A'))
        if kind == 'render':
            a = np.where(a < 16, 0, a).astype(np.uint8); im.putalpha(Image.fromarray(a))
        im = im.crop(Image.fromarray((a > 6).astype(np.uint8) * 255).getbbox())
        th = int(h_mm * px)
        tw = int(im.width * th / im.height)
        if tw > W * 0.97:   # mai oltre la larghezza del riquadro
            th = int(th * W * 0.97 / tw); tw = int(W * 0.97)
        im = im.resize((max(1, tw), max(1, th)), Image.LANCZOS)
        pad = 0
        if kind == 'photo':
            sh, pad = _shadow(im, bg == 'petrol')
            lay = Image.new('RGBA', (im.width + 2 * pad, im.height + 2 * pad), (0, 0, 0, 0))
            lay.putalpha(Image.fromarray(np.clip(sh, 0, 255).astype(np.uint8)))
            lay.alpha_composite(im, (pad, pad))
            im = lay
        x = int(min(max(cx * W - im.width / 2, -pad), W - im.width + pad))
        y = int(H - base * H - (im.height - pad))
        canvas.alpha_composite(im, (x, y)) if 0 <= x and x + im.width <= W and 0 <= y and y + im.height <= H else canvas.paste(im, (x, y), im)
    out = OUT / f'{name}-{bg}.jpg'
    canvas.convert('RGB').save(out, 'JPEG', quality=88, optimize=True, progressive=True)
    return f'img/{out.name}'
