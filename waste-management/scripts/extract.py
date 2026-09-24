"""Estrae dati prodotto e fotografie dai cataloghi fornitore.

Output:
  build/data/packaging.json  - prodotti packaging personalizzabile
  build/data/shopper.json    - collezioni shopper in carta
  build/img/...              - foto ritagliate dalle pagine
"""
import json
import re
import sys
from pathlib import Path

import pymupdf as fitz
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = Path(sys.argv[1]) if len(sys.argv) > 1 else Path('/root/.claude/uploads/2f722ded-53f3-5297-943d-80eada1679fd')
PACK_PDF = next(SRC.glob('*CUSTOM_PACKAGING*.pdf'))
BAG_PDF = next(SRC.glob('*Buste*.pdf'))
OUT = ROOT / 'build'
(OUT / 'img').mkdir(parents=True, exist_ok=True)
(OUT / 'data').mkdir(parents=True, exist_ok=True)

# ---------------------------------------------------------------- packaging
# pagina -> (categoria, nome, sottotitolo)
PACK = [
    (9, 'panini', 'Porta panino a conchiglia', ''),
    (10, 'panini', 'Porta panino a fiore', ''),
    (11, 'panini', 'Porta panino a scatto', ''),
    (12, 'panini', 'Porta panino a vaschetta', ''),
    (14, 'fritti', 'Porta fritti', 'Small · Medium · Large'),
    (15, 'fritti', 'Vaschetta porta fritti', 'Small · Medium · Large'),
    (16, 'fritti', 'Food box', '750 ml · 1200 ml'),
    (17, 'fritti', 'Lunchbox', 'Small · Medium · Medium quadrato · Large'),
    (18, 'fritti', 'Porta pollo', 'Small · Medium · Large'),
    (19, 'fritti', 'Box porta pollo', ''),
    (20, 'fritti', 'Cono', 'Small · Large'),
    (21, 'fritti', 'Porta patatine', ''),
    (22, 'fritti', 'Porta hot dog', ''),
    (23, 'fritti', 'Porta hot dog con coperchio', ''),
    (25, 'accessori', 'Tovagliette', ''),
    (26, 'accessori', 'Porta bicchieri', 'Da 2 e 4 fori'),
    (27, 'accessori', 'Bauletto colazione', ''),
    (28, 'accessori', 'Box colazione a scorrimento', ''),
    (29, 'accessori', 'Bauletto Happy Meal', ''),
    (31, 'etnica', 'Box sushi con divisorio', 'Small · Medium · Large'),
    (32, 'etnica', 'Box sushi a scorrimento', ''),
    (33, 'etnica', 'Noodle box', '500 ml'),
    (34, 'etnica', 'Box porta tacos', 'Con divisorio'),
    (35, 'etnica', 'Box porta piadina', 'Con strappo'),
    (38, 'pasticceria', 'Porta paste classico', 'Da 350 a 1000 gr'),
    (39, 'pasticceria', 'Porta paste 6 angoli', 'Da 350 a 1500 gr'),
    (40, 'pasticceria', 'Porta torta 6 angoli', ''),
    (41, 'pasticceria', 'Porta torta classico incollato', ''),
    (42, 'pasticceria', 'Porta torta classico scollato', ''),
    (43, 'pasticceria', 'Porta torta classico paperino', ''),
    (44, 'pasticceria', 'Monoporzione', ''),
    (45, 'pasticceria', 'Cake box', 'Small · Medium · Large'),
    (46, 'pasticceria', 'Porta pastiera e porta tronchetto', ''),
    (47, 'pasticceria', 'Porta babà', ''),
    (48, 'pasticceria', 'Porta fetta di torta', ''),
    (49, 'pasticceria', 'Porta crêpes', ''),
    (51, 'regalo', 'Porta bottiglie', 'Singolo · Doppio · Triplo'),
    (52, 'regalo', 'Porta bottiglie da 6', 'Con divisorio · Stese'),
    (53, 'regalo', 'Bauletto big', ''),
    (54, 'regalo', 'Bauletto con manico', ''),
    (55, 'regalo', 'Porta vivande', 'Con manico a scomparsa'),
    (57, 'ecommerce', 'Box e-commerce in teso', ''),
    (58, 'ecommerce', 'Box e-commerce accoppiato', ''),
    (60, 'bicchieri', 'Bicchieri in carta', '3 · 7 · 8 oz + coperchio in carta'),
    (61, 'bicchieri', 'Bowl', '500 → 1300 ml + coperchio in R-PET'),
]
# righe con etichetta interna (tabelle doppie)
ROW_LABEL = {
    'DIV13': 'Divisorio', 'DIV18': 'Divisorio', 'DIV30': 'Divisorio',
    'COP3OZ': 'Coperchio', 'COP7OZ': 'Coperchio', 'COP8OZ': 'Coperchio',
    'COP500': 'Coperchio', 'COP750': 'Coperchio', 'COP1000': 'Coperchio',
    'COP1100': 'Coperchio', 'COP1300': 'Coperchio',
    '42-173': 'Stese', '42-154 A/B': 'Con divisorio',
    '42-129': 'Pastiera', '680-90': 'Tronchetto',
}
SIZE_WORDS = re.compile(r'(x|X|oz|ml|FORI)')


def clean(t):
    return re.sub(r'\s+', ' ', t).strip()


def parse_rows(text):
    toks = [clean(t) for t in text.split('\n') if clean(t)]
    rows = []
    for i in range(len(toks) - 2):
        code, dim, q = toks[i], toks[i + 1], toks[i + 2]
        if (re.fullmatch(r'[A-Z0-9][A-Za-z0-9\-/ ]{2,11}', code) and SIZE_WORDS.search(dim)
                and 'pz' in q and 'pz' not in dim and 'x' not in code.lower()):
            moq = q.split('(')[0].replace('pz', '').strip()
            offset = None
            if 'min.' in q and i + 3 < len(toks) and 'pz' in toks[i + 3]:
                offset = toks[i + 3].split('(')[0].replace('pz', '').strip()
            dim = dim.replace(' X ', ' x ').replace('x ', 'x ').replace('  ', ' ')
            dim = re.sub(r'(\d)x', r'\1 x', dim)
            dim = re.sub(r'x(\d)', r'x \1', dim)
            rows.append(dict(ref=code, dim=clean(dim), moq=moq, moq_offset=offset,
                             label=ROW_LABEL.get(code, '')))
    return rows


def save_clip(page, rect, path, max_px=1500):
    zoom = 3.0
    pm = page.get_pixmap(matrix=fitz.Matrix(zoom, zoom), clip=rect)
    im = Image.frombytes('RGB', (pm.width, pm.height), pm.samples)
    im.thumbnail((max_px, max_px), Image.LANCZOS)
    im.save(path, 'JPEG', quality=84, optimize=True, progressive=True)
    return im.size


def extract_packaging():
    doc = fitz.open(PACK_PDF)
    products = []
    counters = {}
    prefix = dict(panini='PP', fritti='SF', accessori='AC', etnica='CE', pasticceria='PA',
                  regalo='BR', ecommerce='EC', bicchieri='BB')
    for pno, cat, name, sub in PACK:
        page = doc[pno - 1]
        rows = parse_rows(page.get_text())
        text = page.get_text()
        days = 60 if '60 GIORNI' in text else 40
        imgs = [i for i in page.get_image_info() if (i['bbox'][2] - i['bbox'][0]) > 60]
        imgs.sort(key=lambda i: -(i['bbox'][2] - i['bbox'][0]) * (i['bbox'][3] - i['bbox'][1]))
        counters[cat] = counters.get(cat, 0) + 1
        pid = f"{prefix[cat]}{counters[cat]:02d}"
        files = []
        for k, info in enumerate(imgs[:3]):
            fn = f'img/pack-{pid}-{k}.jpg'
            w, h = save_clip(page, fitz.Rect(info['bbox']), OUT / fn)
            files.append(dict(src=fn, w=w, h=h))
        # codici Waste Management: WM-<famiglia><n>-<riga>
        for r_i, r in enumerate(rows, 1):
            r['code'] = f'WM-{pid}.{r_i}'
        products.append(dict(id=pid, cat=cat, name=name, sub=sub, rows=rows, days=days,
                             images=files, source_page=pno,
                             pasticceria=any(r['moq_offset'] for r in rows)))
        if not rows:
            print('ATTENZIONE: nessuna riga su pagina', pno, file=sys.stderr)
    json.dump(products, open(OUT / 'data/packaging.json', 'w'), ensure_ascii=False, indent=1)
    print('packaging:', len(products), 'prodotti,', sum(len(p['rows']) for p in products), 'referenze')


# ---------------------------------------------------------------- shopper
SECTIONS = [  # (da pagina, a pagina, sezione)
    (3, 6, 'Anonime'), (8, 13, 'Colorate'), (15, 16, 'Take away'),
    (18, 24, 'Fantasia'), (26, 30, 'Natale'), (32, 37, 'Speciali'),
]
TITLES = [
    'Senza stampa', 'Senza stampa', 'Senza stampa', 'Senza stampa',
    'Senza stampa Italy', 'Senza stampa Italy',
    'Senza stampa bordo risvoltato', 'Senza stampa bordo risvoltato',
    'Colorati su avana', 'Colorati', 'Colorati', 'Colorati naturali',
    'Colorati pastello', 'Colorati pastello', 'Colorati pastello', 'Colorati pastello',
    'Colorati sealing', 'Colorati sealing',
    'Colorati bordo risvoltato', 'Colorati bordo risvoltato',
    'Take away senza stampa', 'Take away colorati', 'Take away bicolor', 'Take away',
    'Fascia cammeo blu', 'Atene', 'Flores', 'Summer', 'Garden', 'Rosette', 'Fiji', 'Blumen',
    'Duo Italy', 'Duo Italy', 'Argento e oro', 'Bronzo e platino bordo risvoltato',
    'Bicolor bordo risvoltato',
    'Santa Klaus', 'Merry Christmas', 'Xmas Village', 'Sestriere', 'Stars', 'Bianco Natale',
    'Dolomiti', 'Cortina rosso', 'Christmas bordo risvoltato', 'Xmas bordo risvoltato',
    'Porta bottiglie', 'Porta bottiglie argento e oro', 'Porta bottiglie Black Lux', 'D-Bag',
    'B-Bags', 'B-Bags', 'B-Bags colorati', 'Mini bag', 'Mini bag colorati',
    'Shopper box pizza', 'Porta bottiglie 2 posti',
]
FMT = re.compile(r'\d+\+\d+(,\d+)?x\d+(,\d+)?(\+\d+)?')


def extract_shopper():
    doc = fitz.open(BAG_PDF)
    H = doc[0].rect.height
    blocks = []
    for pno in range(1, len(doc) + 1):
        page = doc[pno - 1]
        section = next((s for a, b, s in SECTIONS if a <= pno <= b), None)
        if not section:
            continue
        words = page.get_text('words')
        lines = []
        for bl in page.get_text('dict')['blocks']:
            for ln in bl.get('lines', []):
                t = clean(' '.join(s['text'] for s in ln['spans']))
                lines.append((ln['bbox'], t))
        for half in (0, 1):
            y0, y1 = half * H / 2, (half + 1) * H / 2
            fm = []
            for w in sorted([w for w in words if y0 <= w[1] < y1], key=lambda w: (round(w[1]), w[0])):
                if FMT.fullmatch(w[4]) and w[4] not in fm:
                    fm.append(w[4])
            desc = [t for b, t in lines if y0 <= b[1] < y1 and t.lower().startswith('carta')]
            if not fm:
                continue
            imgs = [i for i in page.get_image_info() if y0 <= i['bbox'][1] < y1
                    and (i['bbox'][2] - i['bbox'][0]) > 50]
            imgs.sort(key=lambda i: -(i['bbox'][2] - i['bbox'][0]) * (i['bbox'][3] - i['bbox'][1]))
            idx = len(blocks)
            fn = f'img/bag-{idx:02d}.jpg'
            size = save_clip(page, fitz.Rect(imgs[0]['bbox']), OUT / fn, 1100) if imgs else None
            d = desc[0] if desc else ''
            d = d.replace('ava.', 'avana').replace('sc.,', 'scuro,').replace('ﬀ', 'ff').replace('ﬃ', 'ffi')
            su_ord = 'SU ORDINAZIONE' in ' '.join(t for b, t in lines if y0 <= b[1] < y1)
            d = d.replace(' SU ORDINAZIONE', '')
            blocks.append(dict(section=section, title=TITLES[idx], desc=d[0].upper() + d[1:],
                               formats=[f.replace('x', ' × ') for f in fm], image=fn,
                               size=size, on_order=su_ord, source_page=pno))
    # E-commerce (formato non standard, aggiunto a mano)
    page = doc[35]
    imgs = [i for i in page.get_image_info() if i['bbox'][1] >= H / 2 and (i['bbox'][2] - i['bbox'][0]) > 60]
    imgs.sort(key=lambda i: -(i['bbox'][2] - i['bbox'][0]) * (i['bbox'][3] - i['bbox'][1]))
    if imgs:
        fn = 'img/bag-ecommerce.jpg'
        save_clip(page, fitz.Rect(imgs[0]['bbox']), OUT / fn, 1100)
        txt = clean(page.get_textbox(fitz.Rect(390, H / 2, 841, H)))
        fm = [f.replace('/1', '') for f in re.findall(r'\d+\+\d+x\d+\+\d+/1', txt)]
        blocks.append(dict(section='Speciali', title='Busta e-commerce',
                           desc='Carta avana con vernice impermeabile, due bande adesive e apertura facilitata',
                           formats=[f.replace('x', ' × ') for f in fm], image=fn, size=None,
                           on_order=False, source_page=36))
    json.dump(blocks, open(OUT / 'data/shopper.json', 'w'), ensure_ascii=False, indent=1)
    print('shopper:', len(blocks), 'modelli')


if __name__ == '__main__':
    extract_packaging()
    extract_shopper()
