"""Impaginato del catalogo definitivo Waste Management Group → build/catalogo.html

Uso: python3 scripts/layout.py
"""
import html
import json
import re
import subprocess
from collections import OrderedDict
from pathlib import Path

from icons import icon
import images as IM

ROOT = Path(__file__).resolve().parent.parent
B = ROOT / 'build'
V1 = ROOT.parent / 'build'
CAT = json.load(open(B / 'catalog.json'))
CUT = json.load(open(B / 'cut' / 'index.json'))
SRC = json.load(open(B / 'source.json'))
E = html.escape
# famiglie equivalenti presentate in un'unica scheda: i codici originali restano sulle singole righe
MERGES = [
    ('Guanti monouso', 'Guanti monouso per la manipolazione degli alimenti in cucina.',
     [('Guanti Chef 4', 'Chef 4'), ('Guanti Chef 5', 'Chef 5'), ('Guanti Chef 7', 'Chef 7'), ('Guanti per sushi', 'Sushi')]),
    ('Sac à poche', 'Per farcire, decorare e dosare impasti e creme.',
     [('Sac à poche di precisione', 'Precisione'), ('Sac à poche Max', 'Max'), ('Sac à poche resistenti', ''), ('Sac à poche classiche', 'Classica')]),
    ('Tovaglioli in ovatta', 'Tovaglioli in ovatta per il servizio a tavola, anche personalizzati.',
     [('Tovaglioli in ovatta', '2 veli'), ('Tovaglioli grandi in ovatta', '3 veli'), ('Tovaglioli decorati', '')]),
    ('Carte da incarto', 'Carte in fogli per incartare, confezionare e presentare gli alimenti.',
     [('Carta vegetale antigrasso', 'Vegetale antigrasso'), ('Carta kraft bianca', 'Kraft bianca'), ('Carta velina', 'Velina'), ('Carta pelleaglio', 'Pelleaglio')]),
    ('Carta forno in fogli, rotoli e dischi', 'Carta forno per la cottura e la preparazione.',
     [('Carta forno in fogli e rotoli', ''), ('Dischi carta forno', '')]),
]
MERGED_INTO = {}


def apply_merges(fams):
    byname = {F['name']: F for F in fams}
    for target, fn, parts in MERGES:
        srcs = [(byname[n], pre) for n, pre in parts if n in byname]
        if not srcs:
            continue
        base = dict(srcs[0][0])
        rows, mats, notes = [], [], []
        for F, pre in srcs:
            for r in F['rows']:
                v = re.sub(r'^Sac à Poche\s+', '', r['variant'] or '')
                rows.append(dict(r, variant=(f'{pre} · {v}' if pre and v else (pre or v))))
            if F.get('material') and F['material'] not in mats:
                mats.append(F['material'])
            notes += [n for n in F.get('notes', []) if n not in notes]
            MERGED_INTO[F['name']] = target
        base.update(name=target, function=fn, rows=rows, material=' · '.join(mats[:3]), notes=notes,
                    custom=any(F.get('custom') for F, _ in srcs), images=[], representative=True,
                    id=slug(target), source_pages=sorted({p for F, _ in srcs for p in F.get('source_pages', [])}))
        first = fams.index(srcs[0][0])
        for F, _ in srcs:
            fams.remove(F)
        fams.insert(first, base)
    return fams


SECS = CAT['sections']
SEC = {s['id']: (i + 1, s) for i, s in enumerate(SECS)}
PHONE, PHONE_TEL = '334 712 4042', '+393347124042'
IG, IG_URL = '@wastemanagementgroup', 'https://www.instagram.com/wastemanagementgroup/'
ADDRESS = 'Zona Industriale · C.da La Bruca · Scalea (CS)'
REND = B / 'renders'

# articoli per cui la foto sorgente è sostituita da una ricostruzione 3D fedele (immagine rappresentativa)
RENDER_OVERRIDE = {
    'Tovagliolo soft touch': 'item-napkin-softtouch', 'Tovaglie in TNT': 'item-tnt-tablecloths', 'Runner in TNT': 'item-tnt-runner',
    'Tovaglietta in TNT': 'item-tnt-placemat', 'Coordinato soft touch': 'item-softtouch-set', 'Posacenere in carta': 'item-paper-ashtray',
    'Bicchieri trasparenti': 'item-rpet-cups', 'Carta politenata': 'item-paper-stack',
    'Sac à poche di precisione': 'item-piping-bag2', 'Sac à poche Max': 'item-piping-bag2', 'Sac à poche resistenti': 'item-piping-bag2', 'Sac à poche classiche': 'item-piping-bag2',
    # sostituiscono le illustrazioni schematiche del materiale sorgente
    'Tovagliolo da banco': 'item-napkin-counter', 'Tovaglioli in ovatta': 'item-napkin-ovatta', 'Tovaglioli grandi in ovatta': 'item-napkin-ovatta-large',
    'Tovaglioli decorati': 'item-napkin-ovatta', 'Tovagliette in carta': 'item-placemat-paper', 'Tovagliette carta paglia': 'item-placemat-straw',
    'Sottofritti in carta paglia': 'item-straw-sheets', 'Portakebab': 'item-kebab-pocket', 'Filtri alimentari': 'item-food-filter',
    'Guanti Chef 4': 'item-gloves', 'Guanti Chef 5': 'item-gloves', 'Guanti Chef 7': 'item-gloves', 'Guanti per sushi': 'item-gloves',
    'Dischi carta forno': 'item-baking-paper', 'Carta forno perforata': 'item-baking-perforated', 'Carta forno in fogli e rotoli': 'item-baking-paper',
    'Contenitori per friggitrice ad aria': 'item-airfryer-liners', 'Buste e rotoli sottovuoto': 'item-vacuum-bags',
    'Panni in microfibra': 'item-microfiber', 'Panni per pavimenti': 'item-floor-cloth', 'Panni PVA': 'item-pva-cloth',
    'Panni multiuso e scamosciati': 'item-multi-cloth', 'Panni spugna e tappetini': 'item-sponge-cloth', 'Panni per pulizia intensa': 'item-heavy-cloth',
    'Panni catturapolvere': 'item-dust-cloth', 'Piumini catturapolvere': 'item-duster', 'Salviette di servizio': 'item-service-wipes',
    'Guanti monouso': 'item-gloves', 'Sac à poche': 'item-piping-bag2', 'Carte da incarto': 'item-paper-assortment',
    'Carta forno in fogli, rotoli e dischi': 'item-baking-paper',
    'Spugna cancellina': 'item-eraser-sponge', 'Posate in legno': 'item-wood-cutlery', 'Palettine e forchettine legno': 'item-wood-small',
    'Pizzi in carta 40 g': 'item-doilies', 'Pizzi in carta paglia': 'item-doilies-straw', 'Fogli da incarto in PP': 'item-pp-sheets',
    'Carta vegetale antigrasso': 'item-paper-vegetale', 'Carta kraft bianca': 'item-paper-kraft-white', 'Carta velina': 'item-paper-velina',
    'Carta pelleaglio': 'item-paper-pelleaglio', 'Insalatiere rettangolari': 'item-pet-rect', 'Contenitori Hot': 'item-pulp-bowl',
}
# avvertenze specifiche quando l'immagine non mostra una caratteristica dell'articolo
IMAGE_NOTE = {
    'Tovaglioli in ovatta': 'I decori Natale e Vietri non sono raffigurati.',
    'Guanti monouso': 'Colore raffigurato indicativo.',
    'Piatti in carta decorata': 'I decori Natale e Vietri non sono raffigurati.',
    'Coppette decorate': 'Il decoro Vietri non è raffigurato.',
    'Guanti Chef 4': 'Colore raffigurato indicativo.', 'Guanti Chef 5': 'Colore raffigurato indicativo.',
    'Guanti Chef 7': 'Colore raffigurato indicativo.', 'Guanti per sushi': 'Colore raffigurato indicativo.',
}
DET_ICON = {'pavimenti': 'pavimenti', 'vetri': 'vetri', 'cucina': 'cucina', 'incrostazioni': 'incrostazioni', 'stoviglie': 'stoviglie',
            'bagno': 'bagno', 'lavanderia': 'lavanderia', 'lavamani': 'lavamani', 'ambienti': 'ambienti'}
DET_TITLE = {g['id']: g['title'] for g in CAT['det_groups']}


def slug(s):
    return re.sub(r'[^a-z0-9]+', '-', s.lower()).strip('-')


CAT['families'] = apply_merges(CAT['families'])


# ---------------------------------------------------------------- immagini delle famiglie
SR = json.load(open(B / 'cut_sr' / 'index.json')) if (B / 'cut_sr' / 'index.json').exists() else {}


def cut_path(fn):
    """Ritaglio da usare: la versione in super-risoluzione quando esiste, altrimenti lo scontorno originale."""
    r = CUT.get(fn)
    if not r or r.get('exclude'):
        return None
    if fn in SR and (B / 'cut_sr' / SR[fn]['cut']).exists():
        return B / 'cut_sr' / SR[fn]['cut'], dict(r, long=SR[fn]['long'], sr=True)
    return B / 'cut' / r['cut'], r


def family_media(F):
    """(hero: (path, kind, caption) | None, thumbs: [(path, code)], representative: bool)"""
    if F['kind'] == 'bag':      # shopper come in vendita, senza marchio stampato
        p = REND / f"{F['render']}.png"
        return (p if p.exists() else V1 / 'mockups' / f"{F['render']}.png", 'render', None), [], False
    if F['kind'] == 'printed':
        return (V1 / 'mockups' / f"{F['render']}.png", 'render', None), [], False
    ov = RENDER_OVERRIDE.get(F['name'])
    if ov:
        return (REND / f'{ov}.png', 'render', None), [], True
    imgs = []
    for im in F['images']:
        cp = cut_path(im['file'])
        if cp:
            imgs.append((cp[0], cp[1], im.get('code')))
    if not imgs:
        return None, [], False
    thumbs, seen = [], set()
    for p, r, code in imgs:
        if code and code not in seen:
            thumbs.append((p, code)); seen.add(code)
    uncaptioned = [x for x in imgs if not x[2]]
    if uncaptioned:
        p, r, code = max(uncaptioned, key=lambda x: x[1]['long'] * (1.0 if x[1]['method'] != 'black-key' else 0.9))
    else:   # tutte con codice: l'articolo principale (prime righe, non un coperchio), poi la risoluzione
        order = {}
        for k, row in enumerate(F['rows']):
            for c in re.split(r'\s*/\s*', row['code'] or ''):
                order.setdefault(c, ((row['variant'] or '').lower().startswith('coperch'), k))
        def rank(x):
            lid, k = order.get(x[2].split(' / ')[0], (False, 99))
            return (lid, k > 2, -x[1]['long'])
        p, r, code = min(imgs, key=rank)
    rep = F.get('representative', False) or (not code and len(F['rows']) > 1)
    if len(thumbs) > 4 and code:
        thumbs = [t for t in thumbs if t[1] != code]
    return (p, 'photo', code), (thumbs if len(thumbs) >= 2 else []), rep


# ---------------------------------------------------------------- stima degli ingombri del testo (mm)
PT = 0.3528


def nlines(s, width_mm, pt, k=0.52):
    if not s:
        return 0
    cpl = max(6, width_mm / (pt * PT * k))
    words, n, cur = s.split(), 1, 0
    for w in words:
        if cur and cur + 1 + len(w) > cpl:
            n += 1; cur = len(w)
        else:
            cur += (1 if cur else 0) + len(w)
    return n


def table_cols(F, width_mm, max_h=None):
    cols = 1
    if max_h:
        while cols < 3 and table_h(F, width_mm, cols) > max_h and width_mm / (cols + 1) >= 52:
            cols += 1
    return cols


def table_h(F, width_mm, cols=1):
    rows = F['rows']
    if not rows:
        return 0
    has_code = F['kind'] != 'bag'
    colw = (width_mm - (cols - 1) * 5) / cols
    code_w = (max(len(r['code'] or '—') for r in rows) * 1.6 + 2) if has_code else 0
    var_w = max(14, colw - code_w - 2)
    per = -(-len(rows) // cols)
    chunks = [rows[i:i + per] for i in range(0, len(rows), per)]
    return 6 + max(sum(nlines(r['variant'] or '—', var_w, 7.4) * 3.27 + 2.25 for r in ch) for ch in chunks)


def head_h(F, width_mm, title_pt, rep=False, label=True):
    h = (3.4 if label else 0) + nlines(F['name'], width_mm, title_pt, 0.5) * title_pt * PT * 1.08 + 2.2
    h += nlines(F['function'], width_mm, 9.2) * 9.2 * PT * 1.45 + 2.2
    h += 4.4 if F.get('material') else 0
    h += 4.4 if F['kind'] == 'printed' else 0
    h += 5.2 if (F.get('custom') or F['kind'] == 'printed') else 0
    return h


def notes_h(F, rep, width_mm):
    ns = clean_notes(F) + (['Immagine rappresentativa della famiglia: i codici in tabella identificano gli articoli.'] if rep else []) + ([IMAGE_NOTE[F['name']]] if F['name'] in IMAGE_NOTE else [])
    return sum(nlines(n, width_mm, 6.9) * 6.9 * PT * 1.4 + 1.2 for n in ns)


# ---------------------------------------------------------------- componenti
def hd(section='', group=''):
    sec = f'{E(section)}' + (f' · {E(group)}' if group else '')
    return (f'<div class="hd"><img src="../../assets/wm-simbolo-navy.svg" alt=""><span>Waste Management Group</span>'
            f'<span class="sp"></span><span class="sec">{sec}</span></div>')


def hd_dark(section=''):
    return (f'<div class="hd"><img src="../../assets/wm-simbolo.svg" alt=""><span>Waste Management Group</span>'
            f'<span class="sp"></span><span class="sec">{E(section)}</span></div>')


def ft(n):
    return (f'<div class="ft"><span class="n">{n}</span><a class="idx" href="#indice">Indice</a><span class="sp"></span>'
            f'<a href="tel:{PHONE_TEL}">{PHONE}</a><span>·</span><a href="{IG_URL}">{IG}</a></div>')


def tabs(active=None):
    out = []
    for i, s in enumerate(SECS, 1):
        out.append(f'<a href="#s-{s["id"]}" class="{"on" if s["id"] == active else ""}">{i:02d}</a>')
    return f'<nav class="tabs">{"".join(out)}</nav>'


def badge_custom():
    return f'<span class="badge"><img src="../../assets/wm-simbolo-bianco.svg" alt="">Personalizzabile</span>'


def table(F, cols=1, compact=False):
    rows = F['rows']
    head_code = 'Bianco / avana' if F.get('codecol', '').startswith('BIANCO') else 'Codice'
    head_var = 'Formato e variante' if F['kind'] != 'bag' else 'Formato'
    if F['kind'] == 'bag':
        head_code = None
    has_code = any(r['code'] not in ('—', '') for r in rows)

    def one(chunk):
        h = (f'<th>{head_code}</th>' if head_code else '') + f'<th>{head_var}</th>'
        body = []
        for r in chunk:
            c = E(r['code']) if r['code'] not in ('', None) else '—'
            body.append((f'<td class="c">{c}</td>' if head_code else '') + f'<td>{E(r["variant"] or "—")}</td>')
        return f'<table class="v"><tr>{h}</tr>' + ''.join(f'<tr>{b}</tr>' for b in body) + '</table>'
    if cols <= 1:
        return one(rows)
    n = -(-len(rows) // cols)
    parts = [one(rows[i:i + n]) for i in range(0, len(rows), n)]
    return f'<div class="tcols" style="grid-template-columns:repeat({cols},1fr)">{"".join(parts)}</div>'


def clean_notes(F):
    """Note della famiglia senza le frasi sull'immagine (sostituite dall'avvertenza uniforme)."""
    out = []
    for n in F.get('notes', []):
        keep = ' '.join(p for p in re.split(r'(?<=\.)\s+', n) if not p.startswith('Immagine'))
        if keep:
            out.append(keep)
    return out


def notes_html(F, rep):
    out = [E(n) for n in clean_notes(F)]
    if F['name'] in IMAGE_NOTE:
        out.append(E(IMAGE_NOTE[F['name']]))
    if rep:
        out.append('Immagine rappresentativa della famiglia: i codici in tabella identificano gli articoli.')
    return ''.join(f'<p class="note">{n}</p>' for n in out)


def meta_html(F):
    bits = []
    if F.get('material'):
        bits.append(f'<span class="mat"><b>Materiale</b> · {E(F["material"])}</span>')
    if F['kind'] == 'printed':
        bits.append(f'<span class="mat"><b>Stampa</b> · {E(" · ".join(F.get("techniques", [])))}</span>')
    return '<div>' + '<br>'.join(bits) + '</div>' if bits else ''


def badges(F):
    b = []
    if F.get('custom'):
        b.append(badge_custom())
    if F['kind'] == 'printed':
        b.append('<span class="badge soft">Stampa su misura</span>')
    return f'<div class="chips">{"".join(b)}</div>' if b else ''


def stage_img(media, box, bg='stage', use='', cap=True):
    if not media:
        return ''
    path, kind, code = media
    rel, w, h, dpi = IM.prep(path, bg=bg, box_mm=box, kind=kind, use=use)
    return f'<img src="{rel}" style="width:{w}mm;height:{h}mm" alt="">' + (f'<span class="cap">{E(code)}</span>' if cap and code else '')


def thumbs_html(thumbs, size_mm, cols=None, use=''):
    if not thumbs:
        return ''
    cols = cols or len(thumbs)
    cells = []
    for p, code in thumbs:
        rel, w, h, dpi = IM.prep(p, bg='stage', box_mm=(size_mm - 3, size_mm - 7), kind='photo', use=use + ' (miniatura)')
        cells.append(f'<div class="thumb" style="height:{size_mm}mm"><img src="{rel}" style="max-width:{w}mm;max-height:{h}mm" alt=""><span>{E(code)}</span></div>')
    return f'<div class="thumbs" style="grid-template-columns:repeat({cols},1fr)">{"".join(cells)}</div>'


# ---------------------------------------------------------------- pagine
PAGES = []      # dict(kind, html_fn(n), anchors)


def add(fn, anchors=(), dark=False, cls=''):
    PAGES.append(dict(fn=fn, anchors=list(anchors), dark=dark, cls=cls))
    return len(PAGES)


def page_no(anchor):
    for i, p in enumerate(PAGES, 1):
        if anchor in p['anchors']:
            return i
    return None


def sheet(n, inner, dark=False, cls='', anchors=()):
    ids = ''.join(f'<a id="{a}"></a>' for a in anchors)
    return f'<section class="sheet {"dark" if dark else ""} {cls}"><div class="page">{ids}{inner}</div></section>'


# ---------------- geometria della pagina prodotto (mm)
CW = 174            # larghezza utile
ROW_H = 126         # altezza di una riga su pagina a due righe
TALL_H = 260        # altezza della riga unica
CARD_W = 83.5
M_STAGE = 92
M_INFO = CW - M_STAGE - 6


def card_text_h(F, rep):
    return head_h(F, CARD_W, 14) + table_h(F, CARD_W) + notes_h(F, rep, CARD_W) + 9


def m_cols(F, rep, thumbs):
    fixed = head_h(F, M_INFO, 17) + notes_h(F, rep, M_INFO) + (24 if thumbs else 0) + 8
    return table_cols(F, M_INFO, ROW_H - fixed)


def m_text_h(F, rep, thumbs):
    return head_h(F, M_INFO, 17) + table_h(F, M_INFO, m_cols(F, rep, thumbs)) + notes_h(F, rep, M_INFO) + (24 if thumbs else 0) + 8


def classify(F):
    media, thumbs, rep = family_media(F)
    if len(thumbs) >= 5:
        return 'H'
    if not thumbs and ROW_H - card_text_h(F, rep) >= 56:
        return 'C'
    if m_text_h(F, rep, thumbs) <= ROW_H:
        return 'M'
    return 'H'


def cap_html(media):
    return f'<span class="cap">{E(media[2])}</span>' if media and media[2] else ''


# ---------------- pagina eroe: il fondale cresce quando la tabella è corta
def hero_page(F, sec_id):
    media, thumbs, rep = family_media(F)
    group = F.get('group', '')
    _, s = SEC[sec_id]
    r = len(F['rows'])
    wide = r > 16
    if wide:
        cols = 3 if r > 30 else 2
        head = max(3.4 + nlines(F['name'], 80, 25, .5) * 25 * PT * 1.08, head_h(F, 80, 9, label=False) + notes_h(F, rep, 80))
        body_h = head + 5 + table_h(F, CW, cols)
    else:
        cols = table_cols(F, 106, 999) if r <= 10 else 2
        body_h = max(head_h(F, 60, 25) + notes_h(F, rep, 60), table_h(F, 106, cols))
    stage_h = max(110, min(205, 280 - 8 - body_h))

    def render(n):
        has_th = len(thumbs) >= 2
        img_h = stage_h - 20 - 10
        th = ''
        if has_th:
            k = min(len(thumbs), 8)
            rows_th = -(-k // 2)
            size = max(22, min(36, (img_h - 2 * (rows_th - 1)) / rows_th))
            th = (f'<div style="position:absolute;right:0;top:0;width:{2 * size + 2}mm">'
                  f'{thumbs_html(thumbs[:k], size, cols=2, use=F["name"])}</div>')
            img_w = CW - (2 * size + 2) - 8
        else:
            img_w = CW
        img = stage_img(media, (img_w, img_h), use=F['name'], cap=False)
        imgbox = (f'<div class="hero-img" style="height:{img_h}mm;{"right:auto;width:" + str(img_w) + "mm" if has_th else ""}">{img}</div>'
                  f'<div style="position:absolute;right:21mm;top:20mm;height:{img_h}mm;width:{CW - img_w - 8 if has_th else 0}mm">{th}</div>')
        tags = (f'<span class="hero-rep" style="top:{stage_h - 6}mm">Immagine rappresentativa</span>' if rep else '') + \
               (f'<span class="hero-rep" style="top:{stage_h - 6}mm;left:auto;right:{21 + (CW - img_w if has_th else 0)}mm">{E(media[2])}</span>' if media and media[2] else '')
        head = (f'<div class="head"><div><span class="label">{E(group)}</span><h2 style="margin-top:1.5mm">{E(F["name"])}</h2></div>'
                f'<div style="display:flex;flex-direction:column;gap:2.2mm"><p class="fn">{E(F["function"])}</p>{meta_html(F)}{badges(F)}{notes_html(F, rep)}</div></div>')
        body = f'<div class="hero-body {"wide" if wide else ""}" style="top:{stage_h + 8}mm">{head}<div>{table(F, cols)}</div></div>'
        return (f'<div class="hero-stage" style="height:calc({stage_h}mm + var(--b))"></div>{hd(s["title"], group)}{imgbox}{tags}{body}' + tabs(sec_id) + ft(n))
    return render


# ---------------- riga M: fondale a sinistra, scheda a destra
def row_m(F, row_h=ROW_H):
    media, thumbs, rep = family_media(F)
    cols = m_cols(F, rep, thumbs)
    img = stage_img(media, (M_STAGE - 6, row_h - 14), use=F['name'])
    th = thumbs_html(thumbs[:4], 21, cols=4, use=F['name']) if thumbs else ''
    rep_html = '<span class="rep">Immagine rappresentativa</span>' if rep else ''
    return (f'<article class="row blk m" id="f-{F["id"]}" style="grid-template-columns:{M_STAGE}mm 1fr"><div class="stage" style="padding-bottom:6mm">{img}{rep_html}</div>'
            f'<div class="info"><span class="label">{E(F.get("group", ""))}</span><h3>{E(F["name"])}</h3><p class="fn">{E(F["function"])}</p>'
            f'{meta_html(F)}{badges(F)}<div class="grow">{table(F, cols)}</div>{th}{notes_html(F, rep)}</div></article>')


# ---------------- scheda C: immagine grande sopra, dati sotto (due per riga)
def card_c(F, row_h=ROW_H):
    media, _, rep = family_media(F)
    sh = max(52, row_h - card_text_h(F, rep))
    img = stage_img(media, (CARD_W - 6, sh - 12), use=F['name'])
    rep_html = '<span class="rep">Immagine rappresentativa</span>' if rep else ''
    return (f'<article class="cardf" id="f-{F["id"]}"><div class="stage" style="height:{sh}mm;padding-bottom:6mm">{img}{rep_html}</div>'
            f'<div class="txt"><span class="label">{E(F.get("group", ""))}</span><h3>{E(F["name"])}</h3><p class="fn">{E(F["function"])}</p>'
            f'{meta_html(F)}{badges(F)}{table(F)}{notes_html(F, rep)}</div></article>')


def row_html(row, tall=False):
    h = TALL_H if tall else ROW_H
    if row[0] == 'M':
        return row_m(row[1], h)
    return f'<div class="row pair">{card_c(row[1], h)}{card_c(row[2], h)}</div>'


def row_fams(row):
    return [x for x in row[1:] if x]


def rows_page(rows, sec_id):
    _, s = SEC[sec_id]
    fams = [F for r in rows for F in row_fams(r)]
    groups = list(OrderedDict((F.get('group', ''), 1) for F in fams))

    def render(n):
        body = ''.join(row_html(r, tall=len(rows) == 1) for r in rows)
        return hd(s['title'], ' · '.join(g for g in groups if g)) + f'<div class="flow">{body}</div>' + tabs(sec_id) + ft(n)
    return render


def anchors_for(fams, sid):
    return ['f-' + F['id'] for F in fams] + [f'g-{sid}-{slug(F.get("group", ""))}' for F in fams]


def pack(fams, sid):
    """Impagina le famiglie nell'ordine dato: eroi a pagina intera, righe M e coppie di schede C, due righe per pagina."""
    seq = []
    open_pair = None
    for F in fams:
        c = classify(F)
        if c == 'C':
            if open_pair is not None:
                open_pair[2] = F; open_pair = None
            else:
                open_pair = ['CC', F, None]; seq.append(open_pair)
        else:
            seq.append([c, F])
    for it in seq:      # scheda rimasta sola: diventa una riga M
        if it[0] == 'CC' and it[2] is None:
            it[:] = ['M', it[1]]
    page, deferred = [], []

    def close():
        nonlocal page
        if len(page) == 1 and page[0][0] == 'M':
            F = page[0][1]
            add(hero_page(F, sid), anchors=anchors_for([F], sid))
        elif page:
            add(rows_page(page, sid), anchors=anchors_for([F for r in page for F in row_fams(r)], sid))
        page = []
        for F in deferred:
            add(hero_page(F, sid), anchors=anchors_for([F], sid))
        deferred.clear()
    for it in seq:
        if it[0] == 'H':
            if page:
                deferred.append(it[1])
            else:
                add(hero_page(it[1], sid), anchors=anchors_for([it[1]], sid))
            continue
        page.append(it)
        if len(page) == 2:
            close()
    close()


# ---------------- schede detergenza (griglia 2×2)
def det_card(F):
    media, _, rep = family_media(F)
    img = stage_img(media, (80, 70), use=F['name'])
    dest = F.get('dest')
    ic = icon(DET_ICON.get(dest, 'accessori'))
    rows = ''.join(f'<tr><td class="c">{E(r["code"])}</td><td>{E(r["variant"])}</td></tr>' for r in F['rows'])
    return (f'<article class="card" id="f-{F["id"]}"><div class="stage">{img}</div>'
            f'<span class="dest">{ic}{E(DET_TITLE.get(dest, ""))}</span><h4>{E(F["name"])}</h4><p class="fn" style="font-size:8.2pt">{E(F["function"])}</p>'
            f'<table class="v"><tr><th>Codice</th><th>Formato</th></tr>{rows}</table></article>')


def det_page(fams):
    def render(n):
        return hd(SEC['detergenza'][1]['title'], 'Detergenti professionali') + f'<div class="grid4">{"".join(det_card(F) for F in fams)}</div>' + tabs('detergenza') + ft(n)
    return render


# ---------------- collezione shopper (griglia 2×3)
def bag_card(F):
    media, _, _ = family_media(F)
    img = stage_img(media, (82, 46), use=F['name'])
    sws = ''.join(f'<span class="sw"><i style="background:{sw["hex"] if not (sw.get("pattern") and sw.get("palette")) else "linear-gradient(135deg," + ",".join(sw["palette"][:4]) + ")"}"></i>{("Ref. " + sw["ref"]) if sw.get("ref") else ""}</span>' for sw in F.get('swatches', []))
    fm = ''.join(f'<span class="fmt">{E(r["variant"])}</span>' for r in F['rows'])
    return (f'<article class="card" id="f-{F["id"]}"><div class="stage">{img}</div><span class="label">{E(F.get("collection", ""))}</span>'
            f'<h4 style="font-size:11.5pt">{E(F["name"])}</h4><p class="note" style="color:var(--ink)">{E(F["function"])}</p>'
            f'<div class="sws">{sws}</div><div class="fmts">{fm}</div></article>')


def bag_page(fams):
    def render(n):
        return hd(SEC['carta'][1]['title'], 'Collezione shopper colori e fantasie') + f'<div class="grid6">{"".join(bag_card(F) for F in fams)}</div>' + tabs('carta') + ft(n)
    return render


# ---------------------------------------------------------------- famiglie per sezione, in ordine di gruppo
FAMS = [F for F in CAT['families']]
GROUP_ORDER = {}
for sid, groups in [('tavola', ['Tovagliati e tovaglioli', 'Piatti e vassoi', 'Posate e accessori']),
                    ('bevande', ['Bicchieri e coperchi', 'Cannucce e palettine', 'Gelato e dessert']),
                    ('asporto', ['Contenitori e insalatiere', 'Pasticceria', 'Packaging stampato su misura']),
                    ('carta', ['Carte da incarto', 'Sacchetti e buste', 'Shopper', 'Collezione shopper colori e fantasie']),
                    ('cucina', ['Preparazione', 'Cottura e conservazione', 'Protezione e abbigliamento']),
                    ('detergenza', [g['title'] for g in CAT['det_groups']] + ['Accessori per la pulizia'])]:
    for i, g in enumerate(groups):
        GROUP_ORDER[(sid, g)] = i
for i, F in enumerate(FAMS):
    F['_ord'] = (GROUP_ORDER.get((F['section'], F.get('group', '')), 99), i)


def section_fams(sid):
    return sorted([F for F in FAMS if F['section'] == sid], key=lambda F: F['_ord'])


# ---------------------------------------------------------------- aperture di sezione
def cut_of(name, k=0):
    for F in FAMS:
        if F['name'] == name:
            got = [cut_path(im['file']) for im in F['images']]
            got = [g[0] for g in got if g]
            if got:
                return got[min(k, len(got) - 1)]
    return None


# composizioni di apertura: (articolo, tipo, altezza in mm, centro x 0-1, base dal basso 0-1), dal fondo al primo piano
OP_ART = {
    'tavola': [('R:item-tnt-tablecloths', 'render', 46, 0.40, 0.40), ('R:item-napkin-softtouch', 'render', 34, 0.80, 0.46),
               ('Pocket portaposate', 'photo', 72, 0.12, 0.03), ('Piatti Bordofino', 'photo', 30, 0.47, 0.05), ('R:item-wood-cutlery', 'render', 36, 0.78, 0.04)],
    'bevande': [('Cannucce in carta', 'photo', 92, 0.07, 0.04), ('Bicchieri in cartoncino', 'photo', 64, 0.27, 0.03),
                ('R:item-rpet-cups', 'render', 64, 0.60, 0.03), ('Barattoli gelato con coperchio', 'photo', 30, 0.88, 0.03)],
    'asporto': [('V:hero-food', 'render', 112, 0.5, 0.02)],
    'carta': [('V:hero-bags', 'render', 112, 0.5, 0.02)],
    'cucina': [('R:item-baking-paper', 'render', 44, 0.55, 0.36), ('Cappelli da cucina', 'photo', 64, 0.17, 0.04), ('R:item-piping-bag2', 'render', 32, 0.52, 0.03),
               ('R:item-gloves', 'render', 27, 0.85, 0.05)],
    'detergenza': [('VERDELLO', 'photo', 70, 0.40, 0.10), ('BLU OCEAN', 'photo', 64, 0.78, 0.10), ('MULTIGLAX', 'photo', 62, 0.16, 0.02),
                   ('SANIGLAM', 'photo', 52, 0.60, 0.02), ('R:item-microfiber', 'render', 18, 0.90, 0.01)],
    'personalizzazioni': [('V:hero-gift', 'render', 110, 0.5, 0.02)],
}


_OP = {}


def op_art(sid):
    if sid in _OP:
        return _OP[sid]
    items = []
    for name, kind, h, cx, base in OP_ART[sid]:
        if name.startswith('R:'):
            p = REND / f'{name[2:]}.png'
        elif name.startswith('V:'):
            p = V1 / 'mockups' / f'{name[2:]}.png'
        else:
            p = cut_of(name)
        if p:
            items.append((p, kind, h, cx, base))
    _OP[sid] = IM.still_life(items, (CW, 120), bg='stage', name=f'op-{sid}')
    return _OP[sid]


def opener(sid):
    i, s = SEC[sid]

    def render(n):
        rel = op_art(sid)
        gl = OrderedDict()
        for F in section_fams(sid):
            g = F.get('group') or s['title']
            gl.setdefault(g, page_no('f-' + F['id']))
        if sid == 'detergenza':
            gl = OrderedDict([('Guida per destinazione d’uso', page_no('det-guida'))] + list(gl.items()))
        if sid == 'personalizzazioni':
            gl = OrderedDict([('Supporti personalizzabili', page_no('p-supporti')), ('Tecniche e finiture', page_no('p-tecniche')),
                              ('Coordinati', page_no('p-coordinati')), ('Le nostre realizzazioni', page_no('p-realizzazioni')),
                              ('Dettagli', page_no('p-dettagli')), ('Come lavoriamo', page_no('p-processo'))])
        lst = ''.join(f'<a href="#p{p}"><span>{E(g)}</span><span>{p or ""}</span></a>' for g, p in gl.items())
        return (hd_dark(s['title']) +
                f'<div class="op-top"><div class="op-num">{i:02d}</div><h1 class="op-title">{E(s["title"])}</h1>'
                f'<div class="op-cols"><div><p class="op-claim">{E(s["claim"])}</p><p class="op-text">{E(s["text"])}</p></div>'
                f'<div class="op-list">{lst}</div></div></div>'
                f'<div class="op-panel"></div><div class="op-art"><img src="{rel}" style="width:{CW}mm" alt=""></div>' + tabs(sid) + ft(n))
    return render


# ---------------------------------------------------------------- impaginazione delle sezioni prodotto
def layout_section(sid):
    add(opener(sid), anchors=[f's-{sid}'], dark=True, cls='op')
    fams = section_fams(sid)
    if sid == 'detergenza':
        dets = [F for F in fams if F['kind'] == 'detergent']
        rest = [F for F in fams if F['kind'] != 'detergent']
        add(det_guide(dets), anchors=['det-guida'])
        for k in range(0, len(dets), 4):
            chunk = dets[k:k + 4]
            add(det_page(chunk), anchors=anchors_for(chunk, sid))
        fams = rest
    bags = []
    if sid == 'carta':
        bags = [F for F in fams if F['kind'] == 'bag']
        fams = [F for F in fams if F['kind'] != 'bag']
    pack(fams, sid)
    for k in range(0, len(bags), 6):
        chunk = bags[k:k + 6]
        add(bag_page(chunk), anchors=anchors_for(chunk, sid))


# ---------------------------------------------------------------- detergenza: guida per destinazione d'uso
def det_guide(dets):
    def render(n):
        tiles = []
        for g in CAT['det_groups']:
            items = [F for F in dets if F.get('dest') == g['id']]
            if not items:
                continue
            links = ''.join(f'<a href="#f-{F["id"]}"><b>{E(F["name"])}</b> <span class="muted">{page_no("f-" + F["id"])}</span></a>' for F in items)
            fn = items[0]['function'] if len(items) == 1 else ''
            tiles.append(f'<div class="rule" style="display:grid;grid-template-columns:11mm 1fr;gap:0 3mm"><div class="ico" style="width:9mm;height:9mm">{icon(DET_ICON[g["id"]])}</div>'
                         f'<div><h4 style="font-size:12pt;font-weight:400">{E(g["title"])}</h4><div class="links" style="display:flex;flex-wrap:wrap;gap:1mm 3mm;margin-top:1.2mm;font-size:7.6pt">{links}</div></div></div>')
        acc = page_no('g-detergenza-accessori-per-la-pulizia')
        return (hd(SEC['detergenza'][1]['title'], 'Guida rapida') + '<div class="inner"><span class="label">Guida per destinazione d’uso</span>'
                '<h2 class="t-l" style="margin:2mm 0 4mm">Trova il prodotto giusto<br><span class="em">per ogni superficie.</span></h2>'
                '<p class="lead" style="max-width:150mm">I detergenti sono raggruppati in base a dove si usano. Tocca il nome per andare alla scheda: per ogni prodotto trovi funzione, formati e codici. Per l’uso corretto fai sempre riferimento all’etichetta e alla scheda tecnica del prodotto.</p>'
                f'<div class="cols2" style="margin-top:8mm;gap:5mm 9mm">{"".join(tiles)}</div>'
                f'<p class="note" style="margin-top:7mm">Accessori per la pulizia — panni, piumini, salviette e spugne — a pagina {acc}.</p></div>' + tabs('detergenza') + ft(n))
    return render


# ---------------------------------------------------------------- pagine iniziali
def logo_wordmark():
    """Dal logo completo: solo la scritta «WASTE MANAGEMENT group», senza simbolo né riga descrittiva."""
    from PIL import Image
    import numpy as np
    out = B / 'img' / 'wordmark.png'
    if not out.exists():
        im = Image.open(ROOT.parent / 'assets' / 'wm-logo-completo.png').convert('RGBA')
        a = np.array(im.getchannel('A'))
        on = a.max(axis=1) > 20
        segs, st = [], None
        for y, v in enumerate(on):
            if v and st is None:
                st = y
            if not v and st is not None:
                segs.append((st, y)); st = None
        if st is not None:
            segs.append((st, len(on)))
        y0, y1 = segs[1][0], segs[2][1]          # simbolo | WASTE MANAGEMENT | group | riga descrittiva
        w = im.crop((0, y0, im.width, y1))
        w.crop(w.getbbox()).save(out)
    return 'img/wordmark.png'


def cover():
    def render(n):
        emb = IM.to_jpeg(B / 'art' / 'emboss-cover.png', 'cover-emboss', quality=90)
        wm = logo_wordmark()
        return (f'<div class="full" style="top:calc(-1*var(--b));bottom:calc(-1*var(--b));background:url({emb}) center/cover no-repeat"></div>'
                f'<div style="position:absolute;left:0;right:0;top:204mm;display:flex;justify-content:center"><img src="{wm}" style="width:112mm" alt="Waste Management group"></div>'
                '<div style="position:absolute;left:20mm;right:20mm;top:236mm;text-align:center">'
                '<p class="label" style="color:var(--mint)">Catalogo prodotti</p>'
                '<p style="font-size:13pt;color:#fff;margin-top:3mm;font-weight:300;line-height:1.45">Monouso in carta e plastica · Packaging<br>Articoli personalizzati · Detergenza professionale</p></div>'
                f'<div style="position:absolute;left:15mm;right:15mm;bottom:12mm;display:flex;justify-content:space-between;font-size:7pt;letter-spacing:.2em;text-transform:uppercase;color:#8fb0a0;border-top:.5pt solid rgba(255,255,255,.14);padding-top:3mm">'
                f'<span>{PHONE}</span><span>{IG}</span><span>Scalea (CS)</span></div>')
    return render


def presentazione():
    sede = [im for p in SRC if p['page'] == 3 for im in p['images']]
    def render(n):
        big = IM.photo(B / 'src' / sede[0]['file'], (210, 118), use='sede')[0] if sede else ''
        small = IM.photo(B / 'src' / sede[1]['file'], (64, 64), use='sede')[0] if len(sede) > 1 else ''
        pillars = [('cup', 'Monouso in carta e plastica', 'Tavola, bevande e asporto: piatti, bicchieri, posate, contenitori e accessori.', 's-tavola'),
                   ('box', 'Packaging', 'Contenitori, carte da incarto, sacchetti e shopper per la ristorazione e il commercio.', 's-asporto'),
                   ('brush', 'Articoli personalizzati', 'Il tuo marchio su tovaglioli, bicchieri, shopper e confezioni.', 's-personalizzazioni'),
                   ('vetri', 'Detergenza professionale', 'Detergenti per destinazione d’uso e accessori per la pulizia.', 's-detergenza')]
        pl = ''.join(f'<a href="#{a}" class="rule" style="display:block"><div class="ico">{icon(ic)}</div><h4 style="font-size:11pt;font-weight:400;margin:2mm 0 1mm">{E(t)}</h4><p class="note" style="color:var(--ink)">{E(d)}</p><p class="label" style="margin-top:1.5mm">Pagina {page_no(a)}</p></a>' for ic, t, d, a in pillars)
        return (f'<div class="full" style="top:calc(-1*var(--b));height:calc(118mm + var(--b));background:url({big}) center/cover"></div>' + hd('Chi siamo') +
                '<div class="inner" style="top:128mm"><span class="label">Waste Management Group</span>'
                '<h2 class="t-l" style="margin:2mm 0 4mm">Il tuo punto di riferimento<br><span class="em">per il monouso e la detergenza.</span></h2>'
                '<div style="display:grid;grid-template-columns:1fr 64mm;gap:9mm">'
                '<div><p class="lead">Distribuiamo prodotti monouso in carta e plastica, packaging, articoli personalizzati e detergenza professionale. '
                'Riuniamo in un unico interlocutore ciò che serve ogni giorno a ristoranti, bar, hotel, negozi e imprese: scegli i prodotti, coordinali con il tuo marchio e ricevi tutto da un solo fornitore.</p>'
                f'<p class="lead" style="margin-top:3mm">Siamo a Scalea, in provincia di Cosenza: {E(ADDRESS)}.</p></div>'
                f'<div class="photo" style="height:52mm"><img src="{small}" alt=""></div></div>'
                f'<div class="cols4" style="margin-top:8mm">{pl}</div></div>' + ft(n))
    return render


def indice():
    def render(n):
        rows = []
        for i, s in enumerate(SECS, 1):
            sid = s['id']
            subs = OrderedDict()
            if sid == 'personalizzazioni':
                for t, a in [('Supporti', 'p-supporti'), ('Tecniche', 'p-tecniche'), ('Coordinati', 'p-coordinati'), ('Realizzazioni', 'p-realizzazioni'), ('Dettagli', 'p-dettagli'), ('Come lavoriamo', 'p-processo')]:
                    subs[t] = page_no(a)
            else:
                for F in section_fams(sid):
                    g = F.get('group') or ''
                    subs.setdefault(g, page_no('f-' + F['id']))
                if sid == 'detergenza':
                    subs = OrderedDict([('Guida per destinazione', page_no('det-guida'))] + list(subs.items()))
            sub = ''.join(f'<a href="#p{p}"><b>{E(g)}</b> {p}</a>' for g, p in subs.items() if g)
            rows.append(f'<a href="#s-{sid}"><span class="n">{i:02d}</span><span class="t">{E(s["title"])}</span><span class="p">{page_no("s-" + sid)}</span></a><div class="sub" style="display:grid;grid-template-columns:10mm 1fr;padding-bottom:1.5mm"><span></span><span style="display:flex;flex-wrap:wrap;gap:.6mm 4mm">{sub}</span></div>')
        extra = [('Soluzioni per la tua attività', 'p-soluzioni'), ('Come leggere le schede', 'p-legenda'), ('Indice dei codici', 'p-codici'), ('Contatti', 'p-contatti')]
        ex = ''.join(f'<a href="#{a}" style="display:flex;justify-content:space-between;padding:1.8mm 0;border-top:.5pt solid var(--line)"><span>{E(t)}</span><b style="font-weight:500">{page_no(a)}</b></a>' for t, a in extra)
        return (hd('Indice') + '<div class="inner"><span class="label">Indice</span><h2 class="t-l" style="margin:2mm 0 6mm">Cosa trovi<br><span class="em">in questo catalogo.</span></h2>'
                f'<div style="display:grid;grid-template-columns:1fr 46mm;gap:10mm"><div class="toc">{"".join(rows)}</div>'
                f'<div><span class="label">Consultazione</span><div style="margin-top:2mm;font-size:8.4pt">{ex}</div>'
                '<p class="note" style="margin-top:5mm">Tocca un titolo o un numero di pagina per raggiungerlo. Le linguette sul bordo destro portano alle sezioni; «Indice» nel piede riporta qui.</p></div></div></div>' + tabs() + ft(n))
    return render


BUSINESS = [
    ('ristorazione', 'Ristorazione e pizzerie', 'Tavola, asporto, incarti e cucina.', ['Tovaglie in TNT', 'Tovaglioli in ovatta', 'Piatti Bordofino', 'Posate CPLA', 'Box pieghevoli', 'Carta forno in fogli e rotoli']),
    ('bar', 'Bar e caffetterie', 'Bicchieri, coperchi e accessori da banco.', ['Bicchieri caffè', 'Bicchieri in cartoncino', 'Coperchi per bicchieri', 'Cannucce in carta', 'Tovagliolo da banco', 'LAWASH BAR']),
    ('gelaterie', 'Gelaterie e pasticcerie', 'Coppe, barattoli, palette e vassoi.', ['Coppe gelato in cartoncino', 'Barattoli gelato con coperchio', 'Palette gelato', 'Coppette dessert', 'Vassoi pasticceria oro', 'Pizzi in carta 40 g']),
    ('hotel', 'Hotel e strutture ricettive', 'Tovagliati, lavanderia e servizi.', ['Tovagliolo soft touch', 'Coordinato soft touch', 'Sacchi lavanderia', 'TEXY', 'MORBYD', 'Salviettine rinfrescanti']),
    ('balneari', 'Stabilimenti balneari', 'Servizio, take away e personalizzazione.', ['Bicchieri trasparenti', 'Insalatiere kraft', 'Coni per fritti', 'Tovagliette in carta', 'Salviettine rinfrescanti', 'Shopper in carta']),
    ('negozi', 'Negozi e attività alimentari', 'Shopper, sacchetti e carta da incarto.', ['Shopper in carta', 'Sacchetti SOS avana', 'Carta politenata', 'Carta velina', 'Box e-commerce in teso', 'Sacchetti trasparenti']),
    ('pulizia', 'Imprese di pulizia', 'Pavimenti, superfici e trattamenti specifici.', ['AUREO', 'KORL', 'MULTIGLAX', 'DETON', 'Panni in microfibra', 'Piumini catturapolvere']),
    ('estetici', 'Centri estetici', 'Pulizia degli ambienti e materiali di servizio.', ['BACTIVE', 'SANIGLAM', 'DEODEO', 'Panni multiuso e scamosciati', 'Salviette di servizio']),
    ('medici', 'Studi medici', 'Detergenza ambientale e accessori di servizio.', ['RTU PLUS', 'BACTOSAN', 'GLAM', 'BAGNO RAPID', 'Panni in microfibra']),
    ('officine', 'Officine e carrozzerie', 'Pulizia dei pavimenti e delle superfici lavabili.', ['DETON', 'SGRASSO', 'KORL', 'GLAM', 'Panni per pulizia intensa']),
]


def soluzioni():
    byname = {}
    for F in FAMS:
        byname.setdefault(F['name'], F)

    def render(n):
        tiles = []
        for ic, t, d, names in BUSINESS:
            seen, links = set(), ''
            for x in names:
                x = MERGED_INTO.get(x, x)
                if x in byname and x not in seen:
                    seen.add(x)
                    links += f'<a href="#f-{byname[x]["id"]}">{E(x if not x.isupper() else x.title())} · {page_no("f-" + byname[x]["id"])}</a>'
            tiles.append(f'<div><div class="ico" style="width:9mm;height:9mm">{icon(ic)}</div><div><h4>{E(t)}</h4><p>{E(d)}</p></div><div class="links">{links}</div></div>')
        return (hd('Soluzioni per la tua attività') + '<div class="inner"><span class="label">Soluzioni per la tua attività</span>'
                '<h2 class="t-l" style="margin:2mm 0 3mm">Parti dal tuo lavoro,<br><span class="em">trova i prodotti.</span></h2>'
                '<p class="lead" style="max-width:150mm">Una selezione di punti di partenza per ogni tipo di attività. Ogni voce porta direttamente alla scheda: da lì puoi scoprire formati, varianti e articoli della stessa famiglia.</p>'
                f'<div class="biz" style="margin-top:7mm">{"".join(tiles)}</div></div>' + tabs() + ft(n))
    return render


def legenda():
    def render(n):
        sample = next(F for F in FAMS if F['name'] == 'Bicchieri in cartoncino')
        media, _, _ = family_media(sample)
        img = stage_img(media, (60, 60), use='legenda')
        icons = ''.join(f'<div style="display:flex;align-items:center;gap:2mm;font-size:7.6pt"><span class="ico" style="width:6mm;height:6mm">{icon(DET_ICON[g["id"]])}</span>{E(g["title"])}</div>' for g in CAT['det_groups'])
        tiles = ''.join(f'<a href="#s-{x["id"]}" style="display:block"><div class="photo" style="height:24mm"><img src="{op_art(x["id"])}" alt=""></div>'
                        f'<div style="display:flex;gap:2mm;margin-top:1.4mm;font-size:7.6pt;line-height:1.25"><b style="font-weight:500;color:var(--mint-d)">{k:02d}</b><span>{E(x["title"])}</span><b style="margin-left:auto;font-weight:500">{page_no("s-" + x["id"])}</b></div></a>'
                        for k, x in enumerate(SECS, 1))
        return (hd('Come leggere le schede') + '<div class="inner"><span class="label">Come leggere le schede</span>'
                '<h2 class="t-l" style="margin:2mm 0 6mm">Tutto quello che serve<br><span class="em">per scegliere e ordinare.</span></h2>'
                '<div style="display:grid;grid-template-columns:70mm 1fr;gap:9mm;align-items:start">'
                f'<div class="stage" style="height:70mm">{img}</div>'
                '<div style="display:flex;flex-direction:column;gap:3mm">'
                '<div class="rule"><b style="font-weight:500">Nome e funzione</b><p class="note" style="color:var(--ink)">Il nome della famiglia e a cosa serve.</p></div>'
                '<div class="rule"><b style="font-weight:500">Materiale e caratteristiche</b><p class="note" style="color:var(--ink)">Riportati solo quando documentati.</p></div>'
                '<div class="rule"><b style="font-weight:500">Tabella formati</b><p class="note" style="color:var(--ink)">Codice originale dell’articolo e formato, capacità o misura. Le varianti equivalenti sono riunite nella stessa scheda. Il trattino indica che l’articolo non ha un codice nel materiale di origine: identificalo dal formato.</p></div>'
                f'<div class="rule"><div class="chips">{badge_custom()}</div><p class="note" style="color:var(--ink);margin-top:1.5mm">Articolo che può riportare il tuo marchio: vedi la sezione Personalizzazioni.</p></div>'
                '<div class="rule"><b style="font-weight:500">Immagine rappresentativa</b><p class="note" style="color:var(--ink)">Quando un’immagine mostra la famiglia e non un singolo articolo lo segnaliamo. Le miniature con codice mostrano l’articolo esatto.</p></div>'
                '</div></div>'
                '<span class="label" style="display:block;margin-top:10mm">Detergenza: destinazione d’uso</span>'
                f'<div class="cols3" style="margin-top:3mm;gap:3mm 6mm">{icons}</div>'
                '<span class="label" style="display:block;margin-top:9mm">Navigazione</span>'
                '<p class="note" style="color:var(--ink);margin-top:1.5mm;max-width:150mm">Le linguette numerate sul bordo destro corrispondono alle sette sezioni e portano alla loro apertura. Nel piede di ogni pagina trovi il collegamento all’indice e i nostri contatti.</p>'
                f'<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:4mm;margin-top:7mm">{tiles}</div>'
                '</div>' + tabs() + ft(n))
    return render


# ---------------------------------------------------------------- personalizzazioni
def p_supporti():
    custom = [F for F in FAMS if F.get('custom') and F['kind'] in ('product',)]

    def render(n):
        cells = []
        for F in custom[:20]:
            media, _, _ = family_media(F)
            img = stage_img(media, (34, 26), use='supporti') if media else ''
            cells.append(f'<a href="#f-{F["id"]}" style="display:grid;grid-template-rows:30mm auto;gap:1.2mm"><div class="stage">{img}</div><span style="font-size:7.6pt;line-height:1.25">{E(F["name"])}<br><span class="muted">pagina {page_no("f-" + F["id"])}</span></span></a>')
        wp = page_no('g-asporto-packaging-stampato-su-misura')
        sh = page_no('g-carta-collezione-shopper-colori-e-fantasie')
        return (hd('Personalizzazioni', 'Supporti') + '<div class="inner"><span class="label">Supporti personalizzabili</span>'
                '<h2 class="t-l" style="margin:2mm 0 3mm">Il tuo marchio,<br><span class="em">su ogni supporto.</span></h2>'
                f'<p class="lead" style="max-width:150mm">Questi articoli possono riportare il tuo logo. A essi si aggiungono il packaging stampato su misura (pagina {wp}) e la collezione di shopper in colori e fantasie (pagina {sh}).</p>'
                f'<div style="display:grid;grid-template-columns:repeat(5,1fr);gap:4mm 4mm;margin-top:6mm">{"".join(cells)}</div></div>' + tabs('personalizzazioni') + ft(n))
    return render


def p_tecniche():
    def render(n):
        col = lambda t, items: f'<div><span class="label">{E(t)}</span>' + ''.join(f'<div class="rule" style="margin-top:2.5mm"><h4 style="font-size:11pt;font-weight:400">{E(a)}</h4><p class="note" style="color:var(--ink);margin-top:.8mm">{E(b)}</p></div>' for a, b in items) + '</div>'
        pack = [('Offset in quadricromia', 'Stampa ad alta definizione per fotografie, sfumature e grafiche complesse; disponibile anche in tinte Pantone.'),
                ('Stampa diffusa da 1 a 3 colori', 'Il marchio ripetuto su tutta la superficie, per le linee pasticceria.'),
                ('Inchiostri ad acqua per alimenti', 'Inchiostri certificati per il contatto con gli alimenti.'),
                ('Stampa a caldo oro e argento', 'Una finitura metallica che dà luce al marchio.'),
                ('Stampa UV', 'Brillantezza e profondità su dettagli selezionati.'),
                ('Fustelle su misura', 'Forme e dimensioni progettate sul tuo prodotto.')]
        bags = [('Serigrafia', 'Colori pieni e coprenti, anche oro e argento, su carta bianca, avana e fondi colorati.'),
                ('Flessografia', 'Inchiostri opachi ad acqua, dalla resa naturale.'),
                ('Stampa a caldo', 'Foil metallici o colorati, ideali sui fondi scuri.'),
                ('Stampa digitale', 'Nessun impianto: adatta a grafiche a più colori.')]
        tav = [('Tovaglioli e tovagliati', 'Tovagliolo e coordinato soft touch: personalizzazione su bianco e tinte unite.'),
               ('Bicchieri e gelato', 'Bicchieri in cartoncino, bicchieri trasparenti, coppe e barattoli gelato in versione personalizzata.'),
               ('Carte e shopper', 'Carta politenata, carta vegetale antigrasso e shopper in carta: stampa del marchio su bianco e avana.')]
        return (hd('Personalizzazioni', 'Tecniche e finiture') + '<div class="inner"><span class="label">Tecniche e finiture</span>'
                '<h2 class="t-l" style="margin:2mm 0 3mm">Ogni supporto,<br><span class="em">la sua stampa.</span></h2>'
                '<p class="lead" style="max-width:150mm">Le tecniche disponibili dipendono dal supporto. Qui trovi quelle indicate per ciascuna linea: il nostro staff ti aiuta a scegliere la più adatta al tuo marchio.</p>'
                f'<div class="cols3" style="margin-top:7mm;gap:8mm">{col("Packaging stampato", pack)}{col("Shopper", bags)}{col("Tavola, bevande e carta", tav)}</div></div>' + tabs('personalizzazioni') + ft(n))
    return render


def p_coordinati():
    def render(n):
        a = IM.prep(REND / 'coord-waste.png', bg='stage', box_mm=(160, 82), kind="render", use="coordinato 1")
        b = IM.prep(REND / 'coord-mint.png', bg='stage', box_mm=(160, 82), kind="render", use="coordinato 2")
        panel = lambda im, t, d: (f'<figure><div class="stage" style="height:88mm"><img src="{im[0]}" style="width:{im[1]}mm;height:{im[2]}mm" alt=""></div>'
                                  f'<figcaption style="margin-top:2mm;display:flex;gap:4mm;align-items:baseline"><b style="font-weight:500">{E(t)}</b><span class="note">{E(d)}</span></figcaption></figure>')
        return (hd('Personalizzazioni', 'Coordinati') + '<div class="inner"><span class="label">Coordinati</span>'
                '<h2 class="t-l" style="margin:2mm 0 3mm">Una sola identità,<br><span class="em">dal bancone alla porta.</span></h2>'
                '<p class="lead" style="max-width:150mm">Bicchiere, tovagliolo, shopper e confezione con la stessa grafica: il cliente riconosce il tuo locale da ogni dettaglio.</p>'
                f'<div style="display:flex;flex-direction:column;gap:5mm;margin-top:6mm">'
                f'{panel(a, "Identità petrolio", "Shopper con maniglia ritorta, porta panino, bicchiere con coperchio e tovagliolo stampato.")}'
                f'{panel(b, "Identità menta", "Gli stessi supporti in una variante chiara, con il simbolo in verde.")}</div>'
                '<p class="note" style="margin-top:3mm">Immagini dimostrative realizzate con il marchio Waste Management: i supporti corrispondono agli articoli personalizzabili del catalogo.</p></div>'
                + tabs('personalizzazioni') + ft(n))
    return render


REAL = []
for p in SRC:
    if p['page'] in (175, 176, 177, 178):
        caps = [l for l in p['text'].split('\n') if l.strip()]
        # le didascalie seguono il numero di pagina: cliente, supporto, cliente, supporto
        idx = next((i for i, l in enumerate(caps) if l.strip() == str(p['page'])), None)
        c = caps[idx + 1:idx + 5] if idx is not None else []
        for k, im in enumerate(sorted(p['images'], key=lambda im: im['bbox'][0])):
            REAL.append((im['file'], c[2 * k] if len(c) > 2 * k else '', c[2 * k + 1] if len(c) > 2 * k + 1 else ''))


def p_realizzazioni(chunk, first):
    def render(n):
        cells = []
        for fn, client, what in chunk:
            rel, dpi = IM.photo(B / 'src' / fn, (85, 102), use='realizzazione ' + client)
            cells.append(f'<figure><div class="photo" style="height:102mm"><img src="{rel}" alt=""></div><figcaption style="margin-top:2mm"><b style="font-weight:500;font-size:9.5pt">{E(client)}</b><br><span class="note">{E(what)}</span></figcaption></figure>')
        title = ('<span class="label">Le nostre realizzazioni</span><h2 class="t-m" style="margin:2mm 0 5mm">Progetti veri, <span class="em">clienti veri.</span></h2>' if first
                 else '<span class="label">Le nostre realizzazioni</span><div style="height:5mm"></div>')
        return hd('Personalizzazioni', 'Realizzazioni') + f'<div class="inner">{title}<div class="cols2" style="gap:6mm 8mm">{"".join(cells)}</div></div>' + tabs('personalizzazioni') + ft(n)
    return render


def p_dettagli():
    def render(n):
        tiles = [(REND / 'detail-rope.png', 'render', 'Maniglia ritorta', 'Shopper in carta avana: maniglia ritorta e rinforzo interno.'),
                 (REND / 'detail-closure.png', 'render', 'Chiusura a scatto', 'Porta panino in cartoncino avana con linguetta di chiusura.'),
                 (REND / 'detail-lid.png', 'render', 'Coperchio', 'Coperchio con apertura per bere, abbinato al bicchiere in carta.'),
                 (REND / 'detail-diffuse.png', 'render', 'Stampa diffusa', 'Il marchio ripetuto su tutta la superficie del porta torta.')]
        gourmet = next((B / 'cut' / CUT[im['file']]['cut'] for F in FAMS if F['name'] == 'Shopper Gourmet' for im in F['images'] if im['file'] in CUT), None)
        wood = next((B / 'cut' / CUT[im['file']]['cut'] for F in FAMS if F['name'] == 'Barchette in legno' for im in F['images'] if im['file'] in CUT), None)
        if gourmet:
            tiles.append((gourmet, 'photo', 'Cordino e kraft', 'Shopper Gourmet in kraft con manico a cordino.'))
        if wood:
            tiles.append((wood, 'photo', 'Venatura del legno', 'Barchette in legno: la finitura naturale del materiale.'))
        cells = []
        for path, kind, t, d in tiles[:6]:
            rel, w, h, dpi = IM.prep(path, bg='stage', box_mm=(54, 62), kind=kind, use='dettaglio ' + t)
            cells.append(f'<figure><div class="stage" style="height:66mm"><img src="{rel}" style="width:{w}mm;height:{h}mm" alt=""></div><figcaption style="margin-top:1.8mm"><b style="font-weight:500">{E(t)}</b><br><span class="note">{E(d)}</span></figcaption></figure>')
        return (hd('Personalizzazioni', 'Dettagli') + '<div class="inner"><span class="label">Dettagli</span>'
                '<h2 class="t-m" style="margin:2mm 0 5mm">Texture, chiusure, manici <span class="em">e finiture.</span></h2>'
                f'<div class="cols3" style="gap:6mm 6mm">{"".join(cells)}</div></div>' + tabs('personalizzazioni') + ft(n))
    return render


def hero_band():
    return IM.still_life([(V1 / 'mockups' / 'hero.png', 'render', 86, 0.5, 0.02)], (CW, 90), bg='stage', name='band-processo')


def p_processo():
    def render(n):
        steps = [('01', 'Raccontaci la tua attività', 'Quali prodotti usi, dove e con quale identità visiva.'),
                 ('02', 'Scegli supporti e formati', 'Partiamo dai codici di questo catalogo.'),
                 ('03', 'Inviaci il marchio', 'Meglio un file vettoriale; in alternativa una scansione o una foto nitida del logo.'),
                 ('04', 'Approva la bozza', 'Ricevi il progetto grafico prima della produzione.')]
        st = ''.join(f'<div class="rule" style="border-top:1.2pt solid var(--petrol)"><span class="label">{a}</span><h4 style="font-size:11.5pt;font-weight:400;margin:1.5mm 0 1mm">{E(b)}</h4><p class="note" style="color:var(--ink)">{E(c)}</p></div>' for a, b, c in steps)
        spec = [('.PDF', 'Esportato da Illustrator, Corel Draw o Acrobat con impostazioni di prestampa.'),
                ('.AI · .CDR', 'Pacchetto completo con immagini e font inclusi.'),
                ('Colore', 'Profilo CMYK; tinte piatte come colori Pantone.'),
                ('Testi', 'Font allegati oppure convertiti in tracciati.'),
                ('Immagini', '300 dpi, in CMYK.'),
                ('Abbondanza', 'Almeno 3 mm per lato; il tracciato di fustella fornito non va modificato.')]
        sp = ''.join(f'<div class="rule" style="display:grid;grid-template-columns:24mm 1fr;gap:3mm"><b style="font-weight:500">{E(a)}</b><span>{E(b)}</span></div>' for a, b in spec)
        return (hd('Personalizzazioni', 'Come lavoriamo') + '<div class="inner"><span class="label">Come lavoriamo</span>'
                '<h2 class="t-l" style="margin:2mm 0 6mm">Dal logo al prodotto,<br><span class="em">passo dopo passo.</span></h2>'
                f'<div class="cols4">{st}</div>'
                '<span class="label" style="display:block;margin-top:12mm">Preparare i file</span>'
                f'<div class="cols2" style="margin-top:3mm;gap:2mm 9mm;font-size:8.4pt">{sp}</div>'
                '<div class="box" style="margin-top:9mm;font-size:8.4pt">Non sono utilizzabili file Xpress, Word, Excel, PowerPoint o Publisher, né file in RGB o RAL. Se non hai un grafico, partiamo anche da una foto del tuo marchio.</div>'
                '</div>' + f'<div class="op-panel" style="top:auto;height:calc(96mm + var(--b))"></div><div style="position:absolute;left:15mm;width:{CW}mm;bottom:17mm;height:90mm"><img src="{hero_band()}" style="width:{CW}mm" alt=""></div>'
                + tabs('personalizzazioni') + ft(n))
    return render


# ---------------------------------------------------------------- indice dei codici, contatti, retro
def code_pages():
    entries = []
    for F in FAMS:
        for r in F['rows']:
            for c in re.split(r'\s*/\s*', r['code']):
                c = c.strip()
                if c and c != '—':
                    entries.append((c, F['name'], 'f-' + F['id']))
    seen = set(); uniq = []
    for e in sorted(entries, key=lambda e: [(0, int(t), '') if t.isdigit() else (1, 0, t) for t in re.findall(r'\d+|\D+', e[0].upper())]):
        if (e[0], e[2]) not in seen:
            seen.add((e[0], e[2])); uniq.append(e)
    cap, first = 210, 192          # righe per pagina (la prima ospita il titolo)
    npages = 1 + max(0, -(-(len(uniq) - first) // cap))
    per = -(-(len(uniq) - first) // max(1, npages - 1)) if npages > 1 else first
    k0 = min(first, -(-len(uniq) // npages) if npages > 1 else len(uniq))
    chunks = [uniq[:k0]] + [uniq[i:i + per] for i in range(k0, len(uniq), per)]
    out = []
    for k, ch in enumerate(chunks):
        def render(n, ch=ch, k=k):
            items = ''.join(f'<a href="#{a}"><b>{E(c)}</b><span>{E(name if len(name) <= 30 else name[:29] + "…")}</span><b>{page_no(a)}</b></a>' for c, name, a in ch)
            title = ('<span class="label">Indice dei codici</span><h2 class="t-m" style="margin:2mm 0 4mm">Hai già il codice? <span class="em">Trova la pagina.</span></h2>' if k == 0
                     else '<span class="label">Indice dei codici</span><div style="height:4mm"></div>')
            return hd('Indice dei codici') + f'<div class="inner">{title}<div class="codes">{items}</div></div>' + tabs() + ft(n)
        out.append(render)
    return out, len(uniq)


def qr_svg(data, name):
    out = B / 'img' / f'qr-{name}.svg'
    subprocess.run(['node', '-e', f'require("qrcode").toString({json.dumps(data)},{{type:"svg",margin:0,color:{{dark:"#0a2a39",light:"#ffffff"}},errorCorrectionLevel:"M"}}).then(s=>require("fs").writeFileSync({json.dumps(str(out))},s))'],
                   check=True, cwd=ROOT.parent)
    return f'img/qr-{name}.svg'


def contact_band():
    return IM.still_life([(REND / 'coord-mint.png', 'render', 88, 0.5, 0.02)], (CW, 92), bg='stage', name='band-contatti')


def contatti():
    def render(n):
        q1 = qr_svg(IG_URL, 'instagram'); q2 = qr_svg('tel:' + PHONE_TEL, 'telefono')
        return (hd('Contatti') + '<div class="inner"><span class="label">Contatti</span>'
                '<h2 class="t-xl" style="margin:3mm 0 6mm">Parliamo della<br><span class="em">tua attività.</span></h2>'
                '<p class="lead" style="max-width:140mm">Raccontaci come lavori e quali prodotti utilizzi: ti aiutiamo a scegliere famiglie e formati e a coordinarli con il tuo marchio. Per un ordine indica i codici di questo catalogo.</p>'
                '<div class="cols3" style="margin-top:12mm;gap:8mm">'
                f'<a href="tel:{PHONE_TEL}" class="rule" style="display:block"><div class="ico">{icon("phone")}</div><span class="label" style="display:block;margin-top:2mm">Telefono</span><p style="font-size:17pt;margin-top:1mm">{PHONE}</p></a>'
                f'<a href="{IG_URL}" class="rule" style="display:block"><div class="ico">{icon("insta")}</div><span class="label" style="display:block;margin-top:2mm">Instagram</span><p style="font-size:14pt;margin-top:1mm">{IG}</p><p class="note">Le nostre realizzazioni, aggiornate.</p></a>'
                f'<div class="rule"><div class="ico">{icon("pin")}</div><span class="label" style="display:block;margin-top:2mm">Sede</span><p style="font-size:11pt;margin-top:1mm">Zona Industriale<br>C.da La Bruca<br>Scalea (CS)</p></div></div>'
                '<div style="display:flex;gap:12mm;margin-top:14mm;align-items:center">'
                f'<div style="text-align:center"><div class="qr" style="background:var(--mint-xl)"><img src="{q1}" alt="QR Instagram"></div><p class="note" style="margin-top:1.5mm">Instagram</p></div>'
                f'<div style="text-align:center"><div class="qr" style="background:var(--mint-xl)"><img src="{q2}" alt="QR telefono"></div><p class="note" style="margin-top:1.5mm">Chiama</p></div>'
                '<p class="note" style="max-width:70mm">Inquadra i codici con la fotocamera dello smartphone per aprire il profilo Instagram o avviare la chiamata.</p></div>'
                '</div>' + f'<div class="op-panel" style="top:auto;height:calc(100mm + var(--b))"></div><div style="position:absolute;left:15mm;width:{CW}mm;bottom:17mm;height:92mm"><img src="{contact_band()}" style="width:{CW}mm" alt=""></div>'
                + tabs() + ft(n))
    return render


def retro():
    def render(n):
        emb = IM.to_jpeg(B / 'art' / 'emboss-tone.png', 'retro-emboss', quality=88)
        wm = logo_wordmark()
        return (f'<div class="full" style="top:calc(-1*var(--b));bottom:calc(-1*var(--b));background:url({emb}) center/cover no-repeat"></div>'
                f'<div style="position:absolute;left:0;right:0;top:196mm;display:flex;justify-content:center"><img src="{wm}" style="width:92mm" alt=""></div>'
                f'<p style="position:absolute;left:0;right:0;top:226mm;text-align:center;font-size:15pt;color:#fff">La tua attività. <span style="color:var(--mint)">Il tuo stile.</span></p>'
                f'<p style="position:absolute;left:0;right:0;top:244mm;text-align:center;font-size:8pt;letter-spacing:.22em;text-transform:uppercase;color:#9cbcad">{PHONE} · {IG} · Scalea (CS)</p>')
    return render


# ---------------------------------------------------------------- assemblaggio
add(cover(), dark=True)
add(presentazione(), anchors=['chi-siamo'])
add(indice(), anchors=['indice'])
add(soluzioni(), anchors=['p-soluzioni'])
add(legenda(), anchors=['p-legenda'])
for s in SECS:
    if s['id'] == 'personalizzazioni':
        add(opener('personalizzazioni'), anchors=['s-personalizzazioni'], dark=True, cls='op')
        add(p_supporti(), anchors=['p-supporti'])
        add(p_tecniche(), anchors=['p-tecniche'])
        add(p_coordinati(), anchors=['p-coordinati'])
        for k in range(0, len(REAL), 4):
            add(p_realizzazioni(REAL[k:k + 4], k == 0), anchors=['p-realizzazioni'] if k == 0 else [])
        add(p_dettagli(), anchors=['p-dettagli'])
        add(p_processo(), anchors=['p-processo'])
    else:
        layout_section(s['id'])
cps, ncodes = code_pages()
for k, fn in enumerate(cps):
    add(fn, anchors=['p-codici'] if k == 0 else [])
add(contatti(), anchors=['p-contatti'])
add(retro(), dark=True)

# collegamenti "#pN" verso pagine numerate
html_pages = []
for n, p in enumerate(PAGES, 1):
    inner = p['fn'](n)
    html_pages.append(sheet(n, inner, dark=p['dark'], cls=p['cls'], anchors=p['anchors'] + [f'p{n}']))
doc = ('<!doctype html><html lang="it"><head><meta charset="utf-8"><title>Waste Management Group · Catalogo prodotti</title>'
       '<link rel="stylesheet" href="../scripts/v2.css"></head><body>' + ''.join(html_pages) + '</body></html>')
(B / 'catalogo.html').write_text(doc)
# segnalibri del PDF: livello, titolo, pagina
TOC = [[1, 'Copertina', 1], [1, 'Chi siamo', page_no('chi-siamo')], [1, 'Indice', page_no('indice')],
       [1, 'Soluzioni per la tua attività', page_no('p-soluzioni')], [1, 'Come leggere le schede', page_no('p-legenda')]]
for k, sec in enumerate(SECS, 1):
    TOC.append([1, f'{k:02d} · {sec["title"]}', page_no('s-' + sec['id'])])
    if sec['id'] == 'personalizzazioni':
        for t, a in [('Supporti personalizzabili', 'p-supporti'), ('Tecniche e finiture', 'p-tecniche'), ('Coordinati', 'p-coordinati'),
                     ('Le nostre realizzazioni', 'p-realizzazioni'), ('Dettagli', 'p-dettagli'), ('Come lavoriamo', 'p-processo')]:
            TOC.append([2, t, page_no(a)])
        continue
    if sec['id'] == 'detergenza':
        TOC.append([2, 'Guida per destinazione d’uso', page_no('det-guida')])
    last = None
    for F in section_fams(sec['id']):
        g = F.get('group') or sec['title']
        if g != last:
            TOC.append([2, g, page_no('f-' + F['id'])]); last = g
        TOC.append([3, F['name'] if not F['name'].isupper() else F['name'].title(), page_no('f-' + F['id'])])
TOC += [[1, 'Indice dei codici', page_no('p-codici')], [1, 'Contatti', page_no('p-contatti')]]
low = sorted({(f, u, d) for f, u, d in IM.REPORT if d < 220}, key=lambda x: x[2])
PRODUCTS = []
for sec in SECS:
    for F in section_fams(sec['id']):
        media, _, rep = family_media(F)
        for r in F['rows']:
            PRODUCTS.append(dict(sezione=sec['title'], gruppo=F.get('group', ''), famiglia=F['name'], codice=r['code'] or '', variante=r['variant'] or '',
                                 materiale=F.get('material', ''), personalizzabile='sì' if (F.get('custom') or F['kind'] == 'printed') else '',
                                 pagina=page_no('f-' + F['id']), immagine='rappresentativa' if rep else ''))
json.dump(PRODUCTS, open(B / 'products.json', 'w'), ensure_ascii=False, indent=0)
json.dump(dict(pages=len(PAGES), codes=ncodes, low_dpi=low, toc=TOC), open(B / 'layout_report.json', 'w'), ensure_ascii=False, indent=1)
print('pagine', len(PAGES), 'codici indicizzati', ncodes, 'immagini sotto 220 dpi', len(low))
