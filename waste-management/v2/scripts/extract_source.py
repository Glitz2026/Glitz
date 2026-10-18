"""Estrae famiglie, varianti, codici e immagini dal catalogo Waste Management (parte 1 e 2).

Output: build/source.json + build/src/<hash>.<ext> (immagini originali a piena risoluzione)
"""
import hashlib
import json
import re
import sys
from pathlib import Path

import pymupdf as fitz

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / 'build'
SRC = OUT / 'src'
SRC.mkdir(parents=True, exist_ok=True)
FILES = sys.argv[1:] or [
    '/root/.claude/uploads/2f722ded-53f3-5297-943d-80eada1679fd/d7fba955-waste_1.pdf',
    '/root/.claude/uploads/2f722ded-53f3-5297-943d-80eada1679fd/7377e650-Waste_Management_Catalogo_Parte_2.pdf',
]
GENERIC = {
    'Formati e varianti riuniti per utilizzo.', 'Varianti di formato e finitura raccolte nella stessa famiglia.',
    'Formati e varianti riuniti per utilizzo', 'Codici originali e varianti di formato.', 'La selezione Waste Management Group.',
}


def spans_of(page):
    out = []
    for b in page.get_text('dict')['blocks']:
        if b['type'] != 0:
            continue
        for l in b['lines']:
            for s in l['spans']:
                t = s['text'].strip()
                if t:
                    out.append(dict(x=s['bbox'][0], y=s['bbox'][1], x1=s['bbox'][2], y1=s['bbox'][3], size=round(s['size'], 1), t=t, c=s['color']))
    return out


_saved = {}


def save_image(doc, xref):
    if xref in _saved.get(id(doc), {}):
        return _saved[id(doc)][xref]
    info = doc.extract_image(xref)
    data = info['image']
    h = hashlib.sha1(data).hexdigest()[:16]
    ext = info['ext']
    smask = info.get('smask') or 0
    fn = f'{h}.{ext}'
    if not (SRC / fn).exists():
        (SRC / fn).write_bytes(data)
    rec = dict(file=fn, w=info['width'], h=info['height'], smask=bool(smask))
    if smask:  # salva anche la maschera alfa
        m = doc.extract_image(smask)
        (SRC / f'{h}-mask.{m["ext"]}').write_bytes(m['image'])
        rec['mask'] = f'{h}-mask.{m["ext"]}'
    _saved.setdefault(id(doc), {})[xref] = rec
    return rec


def parse():
    pages = []
    pno = 0
    for f in FILES:
        doc = fitz.open(f)
        for page in doc:
            pno += 1
            sp = spans_of(page)
            body = [s for s in sp if 60 < s['y'] < 790]
            foot = [s for s in sp if s['y'] >= 790]
            imgs = []
            for info in page.get_image_info(xrefs=True):
                if info['xref'] and (info['bbox'][2] - info['bbox'][0]) > 4:
                    rec = save_image(doc, info['xref'])
                    imgs.append(dict(bbox=[round(v, 1) for v in info['bbox']], **rec))
            title = ' '.join(s['t'] for s in body if s['size'] >= 24)
            section = next((s['t'] for s in foot if s['size'] < 9 and not s['t'].isdigit()), '')
            fams = []
            starts = sorted([s for s in body if s['size'] == 16.3], key=lambda s: s['y'])
            # unisci nomi famiglia su più righe consecutive
            groups = []
            for s in starts:
                if groups and abs(s['y'] - groups[-1][-1]['y']) < 24 and abs(s['x'] - groups[-1][-1]['x']) < 2:
                    groups[-1].append(s)
                else:
                    groups.append([s])
            ys = [g[0]['y'] for g in groups] + [790]
            for gi, g in enumerate(groups):
                y0, y1 = g[0]['y'] - 2, ys[gi + 1] - 2
                blk = [s for s in body if y0 <= s['y'] < y1 and s not in g]
                name = ' '.join(s['t'] for s in g)
                desc = ' '.join(s['t'] for s in blk if s['size'] == 10.0)
                material = ' '.join(s['t'] for s in blk if s['size'] == 8.5)
                notes = ' '.join(s['t'] for s in blk if s['size'] == 8.1)
                tags = [s['t'] for s in blk if s['size'] == 7.2]
                heads = sorted([s for s in blk if s['size'] == 7.1], key=lambda s: s['x'])
                hy = heads[0]['y'] if heads else None
                heads = [h for h in heads if hy is not None and abs(h['y'] - hy) < 2]
                rows = []
                cells = sorted([s for s in blk if s['size'] == 8.2], key=lambda s: (round(s['y']), s['x']))
                cur_y, cur = None, None
                for s in cells:
                    if cur_y is None or abs(s['y'] - cur_y) > 3:
                        if cur:
                            rows.append(cur)
                        cur, cur_y = {}, s['y']
                    col = min(heads, key=lambda h: abs(h['x'] - s['x']))['t'] if heads else 'VAL'
                    cur[col] = (cur.get(col, '') + ' ' + s['t']).strip()
                if cur:
                    rows.append(cur)
                fimgs = []
                for im in imgs:
                    cx, cy = (im['bbox'][0] + im['bbox'][2]) / 2, (im['bbox'][1] + im['bbox'][3]) / 2
                    if y0 - 10 <= cy < y1:
                        cap = [s for s in blk if s['size'] == 6.6 and im['bbox'][0] - 6 <= s['x'] <= im['bbox'][2] and im['bbox'][3] <= s['y'] <= im['bbox'][3] + 80]
                        cap = min(cap, key=lambda s: s['y'] - im['bbox'][3]) if cap else None
                        fimgs.append(dict(im, caption=cap['t'] if cap else None, disp_w_pt=round(im['bbox'][2] - im['bbox'][0], 1)))
                fams.append(dict(name=name, desc='' if desc in GENERIC else desc, material=material, notes=notes, tags=tags,
                                 columns=[h['t'] for h in heads], rows=rows, images=fimgs))
            kind = 'product' if fams else 'other'
            pages.append(dict(page=pno, kind=kind, title=title, section=section, families=fams,
                              text=page.get_text() if kind == 'other' else '', images=imgs if kind == 'other' else []))
    return pages


if __name__ == '__main__':
    pages = parse()
    json.dump(pages, open(OUT / 'source.json', 'w'), ensure_ascii=False, indent=1)
    fams = [f for p in pages for f in p['families']]
    print('pagine', len(pages), 'prodotto', sum(p['kind'] == 'product' for p in pages), 'famiglie', len(fams),
          'righe', sum(len(f['rows']) for f in fams), 'immagini', len(list(SRC.glob('*'))))
