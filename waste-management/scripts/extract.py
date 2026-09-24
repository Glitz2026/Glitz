"""Estrae dati prodotto e fotografie dai cataloghi fornitore.

Output:
  build/data/packaging.json  - prodotti packaging personalizzabile
  build/data/shopper.json    - collezioni shopper in carta
  (i colori delle shopper sono campionati dai riquadri 'Ref.' e letti con OCR: serve tesseract)
"""
import json
import re
import subprocess
import sys
from pathlib import Path

import pymupdf as fitz
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = Path(sys.argv[1]) if len(sys.argv) > 1 else Path('/root/.claude/uploads/2f722ded-53f3-5297-943d-80eada1679fd')
PACK_PDF = next(SRC.glob('*CUSTOM_PACKAGING*.pdf'))
BAG_PDF = next(SRC.glob('*Buste*.pdf'))
OUT = ROOT / 'build'
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
            tiers = [moq]
            for k in (3, 4):
                if i + k < len(toks) and re.fullmatch(r'[\d.]+ pz', toks[i + k]):
                    tiers.append(toks[i + k].replace('pz', '').strip())
                else:
                    break
            offset = None
            if 'min.' in q and i + 3 < len(toks) and 'pz' in toks[i + 3]:
                offset = toks[i + 3].split('(')[0].replace('pz', '').strip()
            dim = dim.replace(' X ', ' x ').replace('x ', 'x ').replace('  ', ' ')
            dim = re.sub(r'(\d)x', r'\1 x', dim)
            dim = re.sub(r'x(\d)', r'x \1', dim)
            rows.append(dict(ref=code, dim=clean(dim), moq=moq, tiers=tiers, moq_offset=offset,
                             label=ROW_LABEL.get(code, '')))
    return rows


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
        counters[cat] = counters.get(cat, 0) + 1
        pid = f"{prefix[cat]}{counters[cat]:02d}"
        # codici Waste Management: WM-<famiglia><n>-<riga>
        for r_i, r in enumerate(rows, 1):
            r['code'] = f'WM-{pid}.{r_i}'
        products.append(dict(id=pid, cat=cat, name=name, sub=sub, rows=rows, days=days, source_page=pno,
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
# (pagina, metà) di ogni blocco, nello stesso ordine di TITLES
BLOCK_AT = [(3, 0), (3, 1), (4, 0), (4, 1), (5, 0), (5, 1), (6, 0), (6, 1), (8, 0), (8, 1), (9, 0), (9, 1), (10, 0), (10, 1), (11, 0), (11, 1), (12, 0), (12, 1), (13, 0), (13, 1), (15, 0), (15, 1), (16, 0), (16, 1), (18, 0), (18, 1), (19, 0), (19, 1), (20, 0), (20, 1), (21, 0), (21, 1), (22, 0), (22, 1), (23, 0), (23, 1), (24, 0), (26, 0), (26, 1), (27, 0), (27, 1), (28, 0), (28, 1), (29, 0), (29, 1), (30, 0), (30, 1), (32, 0), (32, 1), (33, 0), (33, 1), (34, 0), (34, 1), (35, 0), (35, 1), (36, 0), (37, 0), (37, 1)]
FMT = re.compile(r'\d+\+\d+(,\d+)?x\d+(,\d+)?(\+\d+)?')


def ocr_ref(page, bbox):
    """Legge l'etichetta 'Ref. NNN' sotto un campione colore (testo vettoriale, serve l'OCR)."""
    x0, y0, x1, y1 = bbox
    for dy in (4, 2, 0, 6):
        pm = page.get_pixmap(dpi=400, clip=fitz.Rect(x0 - 12, y1 + dy, x1 + 12, y1 + dy + 14))
        tmp = OUT / 'ocr.png'
        pm.save(tmp)
        t = subprocess.run(['tesseract', str(tmp), '-', '--psm', '7', '-c', 'tessedit_char_whitelist=Ref.0123456789 '],
                           capture_output=True, text=True).stdout
        m = re.search(r'R?e?f\.?\s*(\d{2,3})', t)
        if m:
            return m.group(1)
    return None


def swatch(page, bbox):
    """Colore medio (campione pieno) oppure palette (campione con fantasia)."""
    pm = page.get_pixmap(dpi=150, clip=fitz.Rect(bbox))
    im = Image.frombytes('RGB', (pm.width, pm.height), pm.samples)
    w, h = im.size
    core = im.crop((int(w * .2), int(h * .2), int(w * .8), int(h * .8)))
    px = list(core.convert('RGB').tobytes())
    px = [tuple(px[i:i + 3]) for i in range(0, len(px), 3)]
    avg = tuple(sum(c[i] for c in px) // len(px) for i in range(3))
    spread = sum(max(c[i] for c in px) - min(c[i] for c in px) for i in range(3))
    q = im.quantize(colors=5, method=Image.Quantize.MEDIANCUT)
    pal = q.getpalette()[:15]
    counts = sorted(q.getcolors(), reverse=True)
    palette = ['#%02x%02x%02x' % tuple(pal[i * 3:i * 3 + 3]) for _, i in counts]
    tall = (bbox[3] - bbox[1]) > (bbox[2] - bbox[0]) * 1.5
    return dict(hex='#%02x%02x%02x' % avg, palette=palette, pattern=tall or spread > 260)


NAMED = {'bianca': '#f3f1ea', 'avana': '#cda37a', 'fucsia': '#d6307f', 'nero': '#1f1d1d', 'rosso': '#c8202a',
         'blu': '#22426a', 'verde': '#1d5a3a', 'oro': '#b69962', 'argento': '#a3a3a5'}
PRINT_COLS = ['serigrafia', 'flessografia', 'stampa a caldo', 'digitale']


def extract_shopper():
    doc = fitz.open(BAG_PDF)
    H = doc[0].rect.height
    blocks = []
    for pno in range(1, len(doc) + 1):
        page = doc[pno - 1]
        section = next((s for a, b, s in SECTIONS if a <= pno <= b), None)
        if not section:
            continue
        lines = []
        for bl in page.get_text('dict')['blocks']:
            for ln in bl.get('lines', []):
                lines.append((ln['bbox'], clean(' '.join(sp['text'] for sp in ln['spans']))))
        tables = page.find_tables().tables
        for half in (0, 1):
            y0, y1 = half * H / 2, (half + 1) * H / 2
            rows = []
            for t in tables:
                if not (y0 <= t.bbox[1] < y1):
                    continue
                for r in t.extract():
                    if r and r[0] and FMT.fullmatch(r[0].replace(' ', '').replace('/1', '')):
                        rows.append(r)
            if (pno, half) not in BLOCK_AT:
                continue
            if not rows:  # tabella non riconosciuta: ripiego sulle parole della pagina
                seen = []
                for w in sorted([w for w in page.get_text('words') if y0 <= w[1] < y1], key=lambda w: (round(w[1]), w[0])):
                    if FMT.fullmatch(w[4]) and w[4] not in seen:
                        seen.append(w[4])
                rows = [[f, None, '', ''] + [''] * 4 for f in seen]
            desc = [t for b, t in lines if y0 <= b[1] < y1 and t.lower().startswith('carta')]
            idx = BLOCK_AT.index((pno, half))
            d = desc[0] if desc else ''
            d = d.replace('ava.', 'avana').replace('sc.,', 'scuro,').replace('ﬀ', 'ff').replace('ﬃ', 'ffi').replace(' SU ORDINAZIONE', '')
            fmts = []
            for r in rows:
                f = r[0].replace(' ', '').replace('/1', '')
                prints = [PRINT_COLS[k] for k, v in enumerate(r[4:8]) if v and v.strip() not in ('', '-', '–')] or list(PRINT_COLS)
                fmts.append(dict(f=f.replace('x', ' × '), pcs=(r[2] or '').replace(' ', ''), gsm=(r[3] or '').strip(), prints=prints))
            sw = []
            for i in page.get_image_info():
                x0, yy0, x1, yy1 = i['bbox']
                if y0 <= yy0 < y1 and x1 - x0 < 60 and yy1 - yy0 < 80 and x0 < 390:
                    sw.append(dict(ref=ocr_ref(page, i['bbox']), x=x0, **swatch(page, i['bbox'])))
            sw.sort(key=lambda s: s['x'])
            if not sw:  # campione non presente: colori dal testo
                names = re.findall(r'fondo ([^-]+)', d)
                names = [n.strip() for n in names[0].split(',')] if names else ['avana' if 'avana' in d.lower() else 'bianca']
                sw = [dict(ref=None, x=0, hex=NAMED.get(n.split()[0], '#f4f2ec'), palette=[], pattern=False) for n in names]
            for s_ in sw:
                s_.pop('x')
            blocks.append(dict(section=section, title=TITLES[idx], desc=d[0].upper() + d[1:],
                               formats=[x['f'] for x in fmts], rows=fmts, swatches=sw, source_page=pno))
    # busta e-commerce: tabella non standard
    page = doc[35]
    txt = clean(page.get_textbox(fitz.Rect(390, H / 2, 841, H)))
    fm = [f.replace('/1', '') for f in re.findall(r'\d+\+\d+x\d+\+\d+/1', txt)]
    blocks.append(dict(section='Speciali', title='Busta e-commerce',
                       desc='Carta avana con vernice impermeabile, due bande adesive e apertura facilitata',
                       formats=[f.replace('x', ' × ') for f in fm],
                       rows=[dict(f=f.replace('x', ' × '), pcs=p, gsm='100', prints=PRINT_COLS[:2] + PRINT_COLS[2:3]) for f, p in zip(fm, ('400', '250'))],
                       swatches=[dict(ref=None, hex='#b98d5f', palette=[], pattern=False)], source_page=36))
    (OUT / 'ocr.png').unlink(missing_ok=True)
    json.dump(blocks, open(OUT / 'data/shopper.json', 'w'), ensure_ascii=False, indent=1)
    print('shopper:', len(blocks), 'modelli,', sum(len(b['swatches']) for b in blocks), 'colori')


if __name__ == '__main__':
    extract_packaging()
    extract_shopper()
