"""Genera le pagine HTML delle due brochure Waste Management.

  build/catalogo.html   - Catalogo generale packaging personalizzato + shopper
  build/selezione.html  - Selezione best seller con il marchio Waste Management (mockup 3D)

Prerequisiti: scripts/extract.py (dati + foto) e scripts/render-mockups.mjs (render 3D).
"""
import csv
import html
import json
import re
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
B = ROOT / 'build'
PACK = json.load(open(B / 'data/packaging.json'))
BAGS = json.load(open(B / 'data/shopper.json'))
E = html.escape
YEAR = '2026'
IG_URL = 'https://www.instagram.com/osso_vincenzo'
IG = '@osso_vincenzo'

# ---------------------------------------------------------------- mockup: ritaglio e fondo pieno (JPEG leggeri)
BG = {'stage': (238, 244, 240), 'navy': (10, 42, 57), 'white': (255, 255, 255)}
_made = set()


def mk(name, bg='stage'):
    """Ritaglia il render sull'alfa, lo appoggia sul colore di fondo della pagina e lo salva in JPEG."""
    out = B / 'mockups-c' / f'{name}-{bg}.jpg'
    if out not in _made:
        out.parent.mkdir(exist_ok=True)
        im = Image.open(B / 'mockups' / f'{name}.png').convert('RGBA')
        # elimina il velo quasi trasparente del piano d'ombra (evita il "riquadro" sullo sfondo)
        a = im.getchannel('A').point(lambda v: 0 if v < 16 else min(255, int((v - 16) * 255 / 239)))
        im.putalpha(a)
        bb = a.point(lambda v: 255 if v > 0 else 0).getbbox()
        m = int(max(im.size) * 0.02)
        im = im.crop((max(bb[0] - m, 0), max(bb[1] - m, 0), min(bb[2] + m, im.width), min(bb[3] + m, im.height)))
        im.thumbnail((2000, 2000) if name.startswith('hero') else (1150, 1150), Image.LANCZOS)
        flat = Image.new('RGB', im.size, BG[bg]); flat.paste(im, (0, 0), im)
        flat.save(out, 'JPEG', quality=86, optimize=True, progressive=True)
        _made.add(out)
    return f'mockups-c/{out.name}'


# ---------------------------------------------------------------- sezioni
SECTIONS = [
    ('panini', 'Porta panini', 'pack-PP01',
     'Conchiglia, fiore, scatto o vaschetta: il panino arriva caldo e intatto, e il tuo marchio si vede prima ancora del primo morso.'),
    ('fritti', 'Porta fritti & street food', 'hero-food',
     'Vaschette, coni, lunchbox e porta hot dog pensati per il take away. Superfici ampie, ideali per logo, colori e messaggi del tuo locale.'),
    ('accessori', 'Accessori', 'pack-AC01',
     'Tovagliette, porta bicchieri e bauletti: i dettagli che completano il servizio e rendono coerente tutta l’esperienza del cliente.'),
    ('etnica', 'Box cucina etnica', 'pack-CE01',
     'Sushi, noodle, tacos e piadine: confezioni studiate per ogni formato, con divisori e aperture a scorrimento o a strappo.'),
    ('pasticceria', 'Pasticceria', 'hero-pastry',
     'Porta paste, porta torte, cake box e monoporzioni. Ordine componibile scegliendo tra più misure: bastano 300 pezzi per formato.'),
    ('regalo', 'Box regalo', 'hero-gift',
     'Porta bottiglie, bauletti e porta vivande per ricorrenze, cantine e gastronomie. Il regalo diventa un biglietto da visita.'),
    ('ecommerce', 'Box e-commerce', 'pack-EC02',
     'Scatole in teso e accoppiate per spedire con cura: l’unboxing è il primo contatto fisico del cliente con il tuo brand.'),
    ('bicchieri', 'Bicchieri e bowl', 'pack-BB01',
     'Bicchieri in carta con coperchio e bowl con coperchio in R-PET: dal caffè alla poke, sempre con il tuo marchio in mano al cliente.'),
    ('shopper', 'Shopper in carta', 'hero-bags',
     'Più di cinquanta modelli pronti a magazzino: anonimi, colorati, take away, fantasia, Natale e speciali. Tutti personalizzabili, anche in piccole quantità.'),
]
SEC = {k: (i + 1, t, r, d) for i, (k, t, r, d) in enumerate(SECTIONS)}


def fmt_dim(d):
    d = d.replace(' x ', ' × ').replace(' X ', ' × ')
    d = re.sub(r'(\d)\s*H\b', r'\1 h', d)
    d = d.replace(' - ', ' · ').replace('*', '')
    return d


# ---------------------------------------------------------------- componenti HTML
def head(section=''):
    return (f'<div class="pg-head"><img src="../assets/wm-simbolo-navy.svg" alt=""><span>Waste Management</span>'
            f'<span class="sp"></span><span class="sec">{E(section)}</span></div>')


def head_dark(section=''):
    return (f'<div class="pg-head"><img src="../assets/wm-simbolo.svg" alt=""><span>Waste Management</span>'
            f'<span class="sp"></span><span class="sec">{E(section)}</span></div>')


def foot(n, doc='Catalogo'):
    return (f'<div class="pg-foot"><span>{doc} {YEAR}</span><span class="sp"></span>'
            f'<span>Ogni articolo è personalizzabile con il tuo marchio</span><span class="sp"></span><b>{n:02d}</b></div>')


def chips(p):
    out = ['<span class="chip navy logo">Il tuo logo</span>']
    if p['pasticceria']:
        out.append('<span class="chip">Stampa diffusa 1–3 colori</span><span class="chip">Offset 4 colori</span>')
    elif p['id'] == 'PA08':
        out.append('<span class="chip">Offset 4 colori</span>')
    out.append(f'<span class="chip">Lavorazione {p["days"]} giorni</span>')
    return ''.join(out)


def table(p):
    rows = p['rows']
    offset_only = p['id'] == 'PA08'
    if p['pasticceria']:
        h = '<tr><th>Codice</th><th>Formato (cm)</th><th class="r">Diffusa</th><th class="r">Offset</th></tr>'
    else:
        h = f'<tr><th>Codice</th><th>{"Tipologia" if p["id"] == "AC02" else "Formato (cm)"}</th><th class="r">{"Offset" if offset_only else "Minimo"}</th></tr>'
    body, last = [], None
    for r in rows:
        if r['label'] != last and (r['label'] or last):
            span = 4 if p['pasticceria'] else 3
            body.append(f'<tr class="grp"><td colspan="{span}">{E(r["label"] or p["name"])}</td></tr>')
            last = r['label']
        dim = fmt_dim(r['dim'])
        if p['id'] == 'AC02':
            dim = dim.title()
        if p['id'] == 'AC01':
            dim = dim.replace(' h', '')
        if p['pasticceria']:
            body.append(f'<tr><td class="c">{r["code"]}</td><td>{E(dim)}</td><td class="r">{r["moq"]} pz</td><td class="r">{r["moq_offset"]} pz</td></tr>')
        else:
            body.append(f'<tr><td class="c">{r["code"]}</td><td>{E(dim)}</td><td class="r">{r["moq"]} pz</td></tr>')
    note = ''
    if p['pasticceria']:
        note = '<p class="note">Minimo per formato: stampa diffusa 300 pz scegliendo almeno 5 misure (oppure 1.500 pz), offset 500 pz scegliendo almeno 2 misure. Ordine componibile in tutta la sezione pasticceria.</p>'
    elif any('*' in r['dim'] for r in rows):
        note = '<p class="note">7 oz disponibile anche imbustato singolarmente, neutro o personalizzato.</p>'
    elif p['id'] == 'BB02':
        note = '<p class="note">Coperchio trasparente in R-PET, adatto al contatto con alimenti.</p>'
    tiers = rows[0].get('tiers') or []
    if len(tiers) > 1 and not p['pasticceria']:
        note = f'<p class="note"><b>Scaglioni d’ordine</b> · {" · ".join(tiers)} pz</p>' + note
    return f'<table class="t">{h}{"".join(body)}</table>{note}'


def stage(p):
    return f'<div class="stage3d"><img src="{mk("pack-" + p["id"])}" alt=""><span class="wm">Mockup · marchio Waste Management</span></div>'


def product_block(p, full=False):
    cat = SEC[p['cat']][1]
    sub = f'<p class="sub">{E(p["sub"])}</p>' if p['sub'] else ''
    cta = ('<p class="cta-line"><img src="../assets/wm-simbolo-verde.svg" alt="">'
           'Inviaci il tuo logo: ricevi la bozza grafica prima della produzione.</p>')
    if full:
        return (f'<section class="prod full">{stage(p)}<div class="info"><div class="left">'
                f'<span class="label">{E(cat)}</span><h3>{E(p["name"])}</h3>{sub}<div class="chips">{chips(p)}</div>{cta}</div>'
                f'<div>{table(p)}</div></div></section>')
    return (f'<section class="prod">{stage(p)}<div class="info"><span class="label">{E(cat)}</span>'
            f'<h3>{E(p["name"])}</h3>{sub}<div class="chips">{chips(p)}</div>{table(p)}{cta}</div></section>')


# ---------------------------------------------------------------- pagine del catalogo
def page(cls, inner):
    return f'<div class="page {cls}">{inner}</div>'


def p_cover():
    return page('dark cover', f'''
<img class="sym-bg" src="../assets/wm-simbolo-bianco.svg" alt="">
<img class="logo" src="../assets/wm-logo-completo.png" alt="Waste Management group">
<div class="ed"><span class="label light">Catalogo {YEAR}</span></div>
<h1>Il tuo marchio,<br><em>su ogni confezione.</em></h1>
<p class="lead">Packaging personalizzato per il food, la pasticceria, il regalo e l’e-commerce, e oltre cinquanta modelli di shopper in carta. Tutto con il tuo logo.</p>
<div class="hero"><img src="{mk('hero', 'navy')}" alt=""></div>
<div class="band"><span>Prodotti monouso</span><span>Imballaggi</span><span>Detergenza professionale</span></div>''')


def p_intro(n):
    return page('', head('Personalizzazione') + f'''
<div class="inner">
  <span class="label">Perché personalizzare</span>
  <h2 class="big-title">Ogni confezione che esce dal tuo locale<br>è <em>pubblicità che cammina.</em></h2>
  <p class="lead-p">Un sacchetto, una scatola, un bicchiere passano per decine di mani prima di essere buttati. Con il tuo logo stampato sopra, diventano un mezzo di comunicazione che il cliente porta in giro per te, a costo quasi zero. Waste Management ti segue dalla scelta del prodotto alla bozza grafica fino alla consegna.</p>
  <div class="cols-4" style="margin-top:12mm">
    <div class="stat"><div class="n">{len(PACK)}</div><div class="t">linee di packaging personalizzabile, {sum(len(p["rows"]) for p in PACK)} formati</div></div>
    <div class="stat"><div class="n">{len(BAGS)}</div><div class="t">modelli di shopper in carta pronti a magazzino</div></div>
    <div class="stat"><div class="n">300</div><div class="t">pezzi il minimo per formato in pasticceria</div></div>
    <div class="stat"><div class="n">40</div><div class="t">giorni di lavorazione per il packaging stampato</div></div>
  </div>
  <div class="cols-3" style="margin-top:14mm">
    <div class="svc"><img class="ico" src="../assets/wm-simbolo-verde.svg" alt=""><h4>Consulenza e grafica</h4><p>Trasformiamo il tuo logo in un progetto di stampa. Se non hai un grafico, basta anche una foto nitida del marchio.</p></div>
    <div class="svc"><img class="ico" src="../assets/wm-simbolo-verde.svg" alt=""><h4>Fustelle su misura</h4><p>Progettazione tecnica di fustelle personalizzate per forme e dimensioni fuori standard.</p></div>
    <div class="svc"><img class="ico" src="../assets/wm-simbolo-verde.svg" alt=""><h4>Nobilitazioni</h4><p>Stampa a caldo oro e argento, stampa UV lucida: per un packaging che si fa notare sul banco.</p></div>
  </div>
  <div style="position:absolute;left:0;right:0;bottom:0;height:70mm;display:flex;align-items:flex-end;justify-content:center">
    <img src="{mk('hero-bags', 'white')}" style="max-height:70mm" alt="">
  </div>
</div>''' + foot(n))


def p_how(n):
    return page('', head('Come funziona') + f'''
<div class="inner">
  <span class="label">Dal logo al prodotto finito</span>
  <h2 class="big-title">Quattro passaggi,<br><em>zero pensieri.</em></h2>
  <div class="cols-4" style="margin-top:10mm">
    <div class="step"><div class="n">01</div><h4>Scegli</h4><p>Individua in catalogo prodotti e formati. Ogni articolo ha un codice WM da citare nella richiesta.</p></div>
    <div class="step"><div class="n">02</div><h4>Invia il logo</h4><p>Meglio se vettoriale (PDF, AI, EPS). In alternativa una scansione o una foto ben dritta e a fuoco.</p></div>
    <div class="step"><div class="n">03</div><h4>Approva la bozza</h4><p>Ricevi il progetto grafico in 2–7 giorni lavorativi. Nessuna produzione parte senza il tuo ok.</p></div>
    <div class="step"><div class="n">04</div><h4>Ricevi</h4><p>Produzione in circa 40 giorni per il packaging stampato; shopper personalizzabili anche in piccole quantità.</p></div>
  </div>
  <span class="label" style="display:block;margin-top:16mm">Tecniche di stampa</span>
  <div class="tech">
    <div><span class="k">Packaging · shopper</span><h4>Offset 4 colori</h4><p>Quadricromia ad alta definizione per fotografie, sfumature e grafiche complesse.</p></div>
    <div><span class="k">Pasticceria</span><h4>Stampa diffusa 1–3 colori</h4><p>Il logo ripetuto su tutta la superficie: elegante, riconoscibile, economico anche su piccoli lotti.</p></div>
    <div><span class="k">Shopper</span><h4>Serigrafia</h4><p>Colori pieni e coprenti, anche oro e argento, su carta bianca, avana e fondi colorati.</p></div>
    <div><span class="k">Shopper</span><h4>Flessografia</h4><p>Inchiostri opachi ad acqua: resa naturale, ideale su carta avana e tirature medio-alte.</p></div>
    <div><span class="k">Shopper · packaging</span><h4>Stampa a caldo</h4><p>Foil metallizzati o colorati per un effetto premium, perfetto sui fondi scuri.</p></div>
    <div><span class="k">Shopper</span><h4>Stampa digitale</h4><p>Nessun impianto: la soluzione per tirature brevi, prove e grafiche a molti colori.</p></div>
  </div>
  <p class="note" style="margin-top:8mm">Inchiostri ad acqua certificati per il contatto con alimenti; l’eventuale plastificazione è in R-PET. Colori Pantone disponibili su richiesta.</p>
</div>''' + foot(n))


def p_toc(n, entries):
    rows = ''.join(f'<a><span class="n">{i:02d}</span><span class="t">{E(t)}<small>{E(sub)}</small></span><span class="p">{p:02d}</span></a>'
                   for i, t, sub, p in entries)
    return page('', head('Indice') + f'''
<div class="inner"><span class="label">Indice</span><h2 class="big-title">Il catalogo</h2><div class="toc">{rows}</div></div>''' + foot(n))


def p_opener(n, key, items):
    i, title, render, text = SEC[key]
    lst = ''.join(f'<div><span>{E(a)}</span><span>{b:02d}</span></div>' for a, b in items[:14])
    return page('dark opener', head_dark(title) + f'''
<div class="num">{i:02d}</div>
<h2>{E(title)}</h2>
<p class="txt">{E(text)}</p>
<div class="list">{lst}</div>
<div class="render"><img src="{mk(render, 'navy')}" alt=""><span class="pill">Mockup con marchio Waste Management</span></div>''' + foot(n))


def p_products(n, key, blocks):
    title = SEC[key][1]
    inner = ''.join(product_block(p, full) for p, full in blocks)
    return page('', head(title) + f'<div class="prod-area">{inner}</div>' + foot(n))


def swatch_row(b):
    out = []
    for sw in b['swatches']:
        if sw.get('pattern') and sw.get('palette'):
            bg = 'linear-gradient(135deg,' + ','.join(sw['palette'][:4]) + ')'
        else:
            bg = sw['hex']
        ref = f'Ref. {sw["ref"]}' if sw.get('ref') else ''
        out.append(f'<span class="sw"><i style="background:{bg}"></i>{ref}</span>')
    return ''.join(out)


def bag_table(b):
    rows = ''.join(f'<tr><td>{E(r["f"])}</td><td class="r">{E(r["pcs"])}</td><td class="r">{E(r["gsm"])}</td></tr>' for r in b['rows'])
    return f'<table class="t bt"><tr><th>Formato (cm)</th><th class="r">Pz/scatola</th><th class="r">g/m²</th></tr>{rows}</table>'


def p_bags(n, cards):
    out = []
    for b in cards:
        out.append(f'''<article class="bag"><div class="stage3d"><span class="label grp">{E(b["section"])}</span><span class="code">{b["code"]}</span><img src="{mk(b["render"])}" alt=""></div>
<div class="bi"><h4>{E(b["title"])}</h4><p class="d">{E(b["desc"])}</p><div class="sws">{swatch_row(b)}</div>{bag_table(b)}</div></article>''')
    return page('', head('Shopper in carta · base + soffietto × altezza') + f'<div class="bag-grid">{"".join(out)}</div>' + foot(n))


def p_files(n):
    return page('', head('File per la stampa') + '''
<div class="inner">
  <span class="label">Prepara i tuoi file</span>
  <h2 class="big-title">Un file corretto,<br><em>una stampa perfetta.</em></h2>
  <p class="lead-p">Se hai un grafico, giragli questa pagina. Se non ce l’hai, nessun problema: ci pensiamo noi, partendo anche da una foto del tuo logo.</p>
  <table class="spec" style="margin-top:8mm">
    <tr><th>File</th><th>Programma</th><th>Come salvarlo</th></tr>
    <tr><td>.PDF</td><td>Adobe Acrobat / Illustrator / Corel Draw</td><td>Preset “prestampa”, “stampa alta qualità” o “stampa offset”</td></tr>
    <tr><td>.AI · .CDR</td><td>Adobe Illustrator · Corel Draw</td><td>Pacchetto completo con immagini e font inclusi</td></tr>
    <tr><td>.PSD</td><td>Adobe Photoshop</td><td>Livelli separati ed editabili, solo per immagini</td></tr>
  </table>
  <div class="cols-2" style="margin-top:8mm">
    <div class="tech" style="grid-template-columns:1fr;margin-top:0">
      <div><h4>Colore</h4><p>Profilo CMYK. Le tinte piatte vanno salvate come Pantone e rinominate con il colore richiesto.</p></div>
      <div><h4>Testi</h4><p>Font allegati oppure convertiti in tracciati, così il testo resta identico al progetto.</p></div>
    </div>
    <div class="tech" style="grid-template-columns:1fr;margin-top:0">
      <div><h4>Immagini</h4><p>300 dpi (minimo 250), in CMYK, nei formati .tif .psd .eps .jpg.</p></div>
      <div><h4>Abbondanza</h4><p>Almeno 3–4 mm per lato. Il tracciato fustella che ti inviamo non va modificato.</p></div>
    </div>
  </div>
  <div class="nope"><b>Non accettiamo</b> file Xpress, Word, Excel, PowerPoint o Publisher, né file in RGB, RAL o altre tavolozze.</div>
  <span class="label" style="display:block;margin-top:12mm">Informazioni utili</span>
  <div class="tech" style="margin-top:3mm">
    <div><h4>Quantità</h4><p>Le quantità prodotte possono variare del ±20% rispetto all’ordinato.</p></div>
    <div><h4>Colori</h4><p>Possibile variazione di tonalità fino al 20% sulla stampa offset; su carta avana e fondi colorati le tinte cambiano resa. Le foto sono indicative.</p></div>
    <div><h4>Impianti</h4><p>Gli impianti di stampa si pagano una sola volta e restano validi per le ristampe, salvo modifiche.</p></div>
    <div><h4>Consegne</h4><p>Le date di consegna possono subire variazioni nei periodi di picco. Prezzi e disponibilità su richiesta.</p></div>
  </div>
</div>''' + foot(n))


def p_back(doc='Catalogo'):
    return page('dark back', f'''
<img class="logo" src="../assets/wm-logo-completo.png" alt="Waste Management group">
<p class="claim">Scegli il prodotto.<br>Al tuo marchio <em>pensiamo noi.</em></p>
<div class="contact"><div class="qr"><img src="qr-instagram.svg" alt="QR Instagram"></div>
<div class="ct"><b>Richiedi il tuo preventivo</b>Scrivici su Instagram<br><a href="{IG_URL}">{IG}</a><br>Indica codici WM e quantità.</div></div>
<div class="fields"><div>Referente<span></span></div><div>Telefono<span></span></div><div>E-mail<span></span></div></div>''')


def build_catalogo():
    # codici WM shopper
    for i, b in enumerate(BAGS, 1):
        b['code'] = f'WM-SH{i:02d}'
        b['render'] = f'bag-{i - 1:02d}'
    specs = [('cover',), ('intro',), ('how',), ('toc',)]
    sec_start = {}
    sec_items = {}
    for key, *_ in SECTIONS:
        sec_start[key] = len(specs) + 1
        specs.append(('opener', key))
        items = []
        if key == 'shopper':
            groups = {}
            for k in range(0, len(BAGS), 4):
                specs.append(('bags', BAGS[k:k + 4]))
                for b in BAGS[k:k + 4]:
                    groups.setdefault(b['section'], len(specs))
            items = list(groups.items())
        else:
            prods = [p for p in PACK if p['cat'] == key]
            pend = []
            for p in prods:
                if len(p['rows']) > 6:
                    if pend:
                        specs.append(('prod', key, [(pend[0], True)])); items.append((pend[0]['name'], len(specs))); pend = []
                    specs.append(('prod', key, [(p, True)])); items.append((p['name'], len(specs)))
                else:
                    pend.append(p)
                    if len(pend) == 2:
                        specs.append(('prod', key, [(x, False) for x in pend]))
                        items += [(x['name'], len(specs)) for x in pend]
                        pend = []
            if pend:
                specs.append(('prod', key, [(pend[0], True)])); items.append((pend[0]['name'], len(specs)))
        sec_items[key] = items
    specs.append(('files',))
    specs.append(('back',))
    toc = [(SEC[k][0], SEC[k][1], f'{len([p for p in PACK if p["cat"] == k]) or len(BAGS)} {"linee" if k != "shopper" else "modelli"}', sec_start[k]) for k, *_ in SECTIONS]
    toc.append((len(SECTIONS) + 1, 'File e informazioni utili', 'prepara la tua grafica', len(specs) - 1))
    pages = []
    for n, s in enumerate(specs, 1):
        t = s[0]
        if t == 'cover': pages.append(p_cover())
        elif t == 'intro': pages.append(p_intro(n))
        elif t == 'how': pages.append(p_how(n))
        elif t == 'toc': pages.append(p_toc(n, toc))
        elif t == 'opener': pages.append(p_opener(n, s[1], sec_items[s[1]]))
        elif t == 'prod': pages.append(p_products(n, s[1], s[2]))
        elif t == 'bags': pages.append(p_bags(n, s[1]))
        elif t == 'files': pages.append(p_files(n))
        elif t == 'back': pages.append(p_back())
    write('catalogo.html', 'Waste Management · Catalogo ' + YEAR, pages)
    # tabella interna codici WM -> riferimenti fornitore (NON da distribuire ai clienti)
    with open(B / 'codici-wm-riferimenti-fornitore.csv', 'w', newline='') as f:
        w = csv.writer(f, delimiter=';')
        w.writerow(['codice_wm', 'prodotto', 'formato', 'minimo', 'catalogo_fornitore', 'rif_fornitore', 'pagina_fornitore'])
        for p in PACK:
            for r in p['rows']:
                w.writerow([r['code'], p['name'] + (f' – {r["label"]}' if r['label'] else ''), fmt_dim(r['dim']), r['moq'], 'Custom packaging grossisti', r['ref'], p['source_page']])
        for b in BAGS:
            w.writerow([b['code'], b['title'], ' | '.join(b['formats']), '', 'Shoppers pronto magazzino 2025', b['desc'], b['source_page']])
    return len(pages)


# ---------------------------------------------------------------- selezione best seller
def bag_by(title, desc_part):
    return next(b for b in BAGS if b['title'] == title and desc_part in b['desc'])


def pk(pid):
    return next(p for p in PACK if p['id'] == pid)


def dims(p, n=4, skip_labels=True):
    rows = [r for r in p['rows'] if not (skip_labels and r['label'] in ('Coperchio', 'Divisorio'))]
    s = [fmt_dim(r['dim']).replace(' h', ' h') if p['id'] != 'AC01' else fmt_dim(r['dim']).replace(' h', '') for r in rows]
    return ' · '.join(s[:n]) + (' …' if len(s) > n else '')


SHOP_TECH = 'Serigrafia, flessografia, stampa a caldo, digitale'


def selection():
    kraft = bag_by('Senza stampa', 'avana e bianca - maniglia ritorta')
    navy = bag_by('Colorati bordo risvoltato', 'rosso, blu')
    take = bag_by('Take away senza stampa', 'avana e bianca')
    green = bag_by('Colorati pastello', 'arancio, verde chiaro')
    return [
        dict(r='sel-shopper-kraft', cat='Shopper', name='Shopper avana con maniglia ritorta',
             why='Il grande classico che non passa mai di moda: carta avana naturale, maniglia ritorta resistente e il tuo logo in un solo colore. Il modo più semplice per dare identità a ogni vendita.',
             pts=['Disponibile anche in carta bianca', 'Personalizzabile anche in piccole quantità', 'Resa naturale con inchiostri ad acqua'],
             spec=[('Formati', ' · '.join(kraft['formats'][2:7]) + ' …'), ('Carta', 'Avana o bianca, maniglia ritorta'), ('Stampa', SHOP_TECH), ('Codice', kraft['code'])]),
        dict(r='sel-shopper-navy', cat='Shopper', name='Shopper colorata bordo risvoltato', dark=True,
             why='Fondo pieno, bordo superiore risvoltato e maniglia rivestita in cotone: la shopper da boutique che trasforma un acquisto in un regalo.',
             pts=['Fondi colorati pieni, anche blu e nero', 'Logo in stampa a caldo oro, argento o bianco', 'Maniglia in cotone coordinata'],
             spec=[('Formati', ' · '.join(navy['formats'][:4]) + ' …'), ('Carta', 'Bianca con fondo colorato'), ('Stampa', 'Stampa a caldo (foil), serigrafia'), ('Codice', navy['code'])]),
        dict(r='sel-shopper-white', cat='Shopper', name='Shopper take away',
             why='Fondo largo e maniglia piatta: tiene dritti vassoi, box e bicchieri. È la shopper che il delivery e l’asporto portano in giro per la città.',
             pts=['Soffietto ampio per contenitori alimentari', 'Carta bianca o avana', 'Superficie frontale ideale per il logo'],
             spec=[('Formati', ' · '.join(take['formats'])), ('Carta', 'Avana o bianca, maniglia piatta'), ('Stampa', SHOP_TECH), ('Codice', take['code'])]),
        dict(r='sel-shopper-green', cat='Shopper', name='Shopper colorata pastello',
             why='Colori tenui e maniglia ritorta a contrasto: una shopper fresca e riconoscibile, perfetta per negozi, profumerie e concept store.',
             pts=['Palette di tinte pastello a scelta', 'Maniglia ritorta colorata', 'Logo in bianco o a caldo'],
             spec=[('Formati', ' · '.join(green['formats'][:5]) + ' …'), ('Carta', 'Bianca con fondo colorato'), ('Stampa', SHOP_TECH), ('Codice', green['code'])]),
        dict(r='pack-PP01', cat='Porta panini', name='Porta panino a conchiglia', p=pk('PP01'),
             why='Il burger box che si chiude a scatto e protegge il panino fino all’ultimo morso. Il coperchio è una piccola insegna: stampaci sopra il tuo simbolo.',
             pts=['Tre misure, da 12 a 16,5 cm', 'Coperchio stampabile a tutta superficie', 'Perfetto per burger e panini gourmet']),
        dict(r='sel-cup', cat='Bicchieri', name='Bicchiere in carta con coperchio', p=pk('BB01'),
             why='Il bicchiere viaggia con il cliente: in ufficio, in strada, sui social. Ogni caffè da asporto diventa una vetrina del tuo marchio.',
             pts=['3, 7 e 8 oz con coperchio coordinato', '7 oz anche imbustato singolarmente', 'Grafica a 360° sul corpo del bicchiere']),
        dict(r='pack-BB02', cat='Bowl', name='Bowl con coperchio in R-PET', p=pk('BB02'),
             why='Poke, insalate, primi da asporto: la bowl in carta con coperchio trasparente mostra il piatto e il tuo marchio insieme.',
             pts=['Da 500 a 1300 ml', 'Coperchio trasparente in R-PET', 'Lavorazione 60 giorni']),
        dict(r='pack-CE03', cat='Cucina etnica', name='Noodle box', p=pk('CE03'),
             why='Iconica, pratica, instagrammabile. La noodle box è il contenitore simbolo dello street food asiatico, e con il tuo logo diventa un oggetto da collezione.',
             pts=['Capacità 500 ml', 'Chiusura a falde', 'Stampa su tutte le facce']),
        dict(r='pack-CE02', cat='Cucina etnica', name='Box sushi a scorrimento', p=pk('CE02'),
             why='Vassoio e fascia scorrevole: la confezione si apre come un piccolo regalo. La fascia è lo spazio ideale per il marchio del ristorante.',
             pts=['Apertura a scorrimento', 'Disponibile anche con divisorio (S · M · L)', 'Interno bianco, fascia personalizzata']),
        dict(r='pack-PA01', cat='Pasticceria', name='Porta paste classico', p=pk('PA01'),
             why='Il vassoio della domenica. Con la stampa diffusa il tuo simbolo si ripete su tutta la superficie, elegante e riconoscibile anche da lontano.',
             pts=['Da 350 a 1000 gr', 'Stampa diffusa 1–3 colori o offset 4 colori', 'Ordine componibile: da 300 pz per formato']),
        dict(r='pack-PA08', cat='Pasticceria', name='Cake box', p=pk('PA08'), dark=True,
             why='Per torte a piani, cake design e ricorrenze importanti. Un cubo pieno di colore che fa scena prima ancora di essere aperto.',
             pts=['Small, medium e large: da 30 a 50 cm', 'Stampa offset in quadricromia', 'Da 300 pezzi']),
        dict(r='pack-EC01', cat='E-commerce', name='Box e-commerce', p=pk('EC01'),
             why='L’unboxing è il primo contatto fisico con il tuo negozio online. Una scatola avana con il marchio stampato vale più di mille recensioni.',
             pts=['Quattro formati in teso, dieci accoppiati', 'Chiusura a incastro, senza nastro', 'Da 500 pezzi']),
        dict(r='pack-BR01', cat='Box regalo', name='Porta bottiglie', p=pk('BR01'),
             why='Per cantine, enoteche e gastronomie: il porta bottiglie con il tuo marchio trasforma una bottiglia in un regalo pronto da consegnare.',
             pts=['Singolo, doppio e triplo', 'Maniglia integrata', 'Da 500 pezzi']),
        dict(r='pack-AC01', cat='Accessori', name='Tovagliette personalizzate', p=pk('AC01'),
             why='La tovaglietta è il biglietto da visita del tavolo: il cliente la guarda per tutto il pasto. Logo, menu, social e promozioni in un unico foglio.',
             pts=['Formato 30 × 40 cm', 'Stampa a tutta superficie', 'Coordinabile con box e bicchieri']),
    ]


def p_sel_cover():
    return page('dark cover', f'''
<img class="sym-bg" src="../assets/wm-simbolo-bianco.svg" alt="">
<img class="logo" src="../assets/wm-logo-completo.png" alt="Waste Management group">
<div class="ed"><span class="label light">Selezione {YEAR}</span></div>
<h1>Best seller<br><em>personalizzati.</em></h1>
<p class="lead">I prodotti più richiesti, vestiti con il marchio Waste Management. Immagina il tuo logo al posto del nostro.</p>
<div class="hero"><img src="{mk('hero-bags', 'navy')}" alt=""></div>
<div class="band"><span>Shopper</span><span>Food packaging</span><span>Pasticceria</span><span>E-commerce</span></div>''')


def p_sel_intro(n):
    return page('', head('Selezione best seller') + f'''
<div class="inner">
  <span class="label">Prova a immaginarlo</span>
  <h2 class="big-title">Stesso prodotto,<br><em>tutta un’altra percezione.</em></h2>
  <p class="lead-p">In queste pagine abbiamo applicato il nostro marchio ai prodotti che i clienti scelgono di più. Non sono fotografie di magazzino: sono l’anteprima di come apparirebbe il tuo packaging. Sostituisci il simbolo con il tuo logo, scegli colori e tecnica di stampa, al resto pensiamo noi.</p>
  <div style="margin-top:10mm;height:120mm;display:flex;align-items:center;justify-content:center"><img src="{mk('hero-food', 'white')}" style="max-width:100%;max-height:120mm" alt=""></div>
  <div class="cols-3" style="margin-top:8mm">
    <div class="step"><div class="n">01</div><h4>Scegli il prodotto</h4><p>Ogni scheda riporta formati, minimi e tecniche consigliate.</p></div>
    <div class="step"><div class="n">02</div><h4>Inviaci il logo</h4><p>Anche solo una foto: prepariamo noi la bozza, in 2–7 giorni.</p></div>
    <div class="step"><div class="n">03</div><h4>Approva e ricevi</h4><p>Produzione dopo il tuo ok. Tempi e prezzi su richiesta.</p></div>
  </div>
</div>''' + foot(n, 'Selezione'))


def p_sel_product(n, i, s):
    p = s.get('p')
    spec = s.get('spec')
    if p:
        moq = p['rows'][0]['moq']
        spec = [('Formati', dims(p)), ('Minimo', f'da {moq} pz' + (' per formato' if p['cat'] == 'pasticceria' else '')),
                ('Lavorazione', f'{p["days"]} giorni'), ('Codici', f'{p["rows"][0]["code"]} → {p["rows"][-1]["code"]}' if len(p['rows']) > 1 else p['rows'][0]['code'])]
    specs = ''.join(f'<div><span>{E(a)}</span><span>{E(b)}</span></div>' for a, b in spec)
    pts = ''.join(f'<li>{E(x)}</li>' for x in s['pts'])
    stage = 'stage navy' if s.get('dark') else 'stage'
    return page('sel', f'''
<div class="{stage}"><div class="idx">{i:02d}</div><span class="pill tag" style="color:{'#73b18d' if s.get('dark') else '#4f8f6b'}">Mockup · marchio Waste Management</span><img src="{mk(s['r'], 'navy' if s.get('dark') else 'stage')}" alt=""></div>
<div class="body">
  <div><span class="label">{E(s['cat'])}</span><h2>{E(s['name'])}</h2><p class="why">{E(s['why'])}</p><ul>{pts}</ul></div>
  <div class="specs"><span class="label" style="display:block;margin:2mm 0 3mm">Scheda</span>{specs}
  <p class="ref">Trovi l’articolo completo nel Catalogo {YEAR}.</p></div>
</div>''' + foot(n, 'Selezione'))


def p_sel_line(n):
    return page('', head('Una linea coordinata') + f'''
<div class="inner">
  <span class="label">Coordina tutto</span>
  <h2 class="big-title">Un marchio,<br><em>una linea completa.</em></h2>
  <p class="lead-p">Shopper, box, bicchieri e vassoi con la stessa grafica: il cliente riconosce il tuo locale da ogni singolo pezzo. Ti aiutiamo a costruire la linea partendo dai prodotti che usi davvero.</p>
  <div style="margin-top:8mm;height:95mm;display:flex;justify-content:center"><img src="{mk('hero', 'white')}" style="max-height:95mm;max-width:100%" alt=""></div>
  <div style="margin-top:6mm;height:85mm;display:flex;justify-content:center"><img src="{mk('hero-pastry', 'white')}" style="max-height:85mm;max-width:100%" alt=""></div>
</div>''' + foot(n, 'Selezione'))


def build_selezione():
    items = selection()
    pages = [p_sel_cover(), p_sel_intro(2)]
    for i, s in enumerate(items, 1):
        pages.append(p_sel_product(len(pages) + 1, i, s))
    pages.append(p_sel_line(len(pages) + 1))
    pages.append(p_back('Selezione'))
    write('selezione.html', 'Waste Management · Best seller personalizzati', pages)
    return len(pages)


def write(name, title, pages):
    doc = (f'<!doctype html><html lang="it"><head><meta charset="utf-8"><title>{E(title)}</title>'
           f'<link rel="stylesheet" href="../scripts/style.css"></head><body>{"".join(pages)}</body></html>')
    (B / name).write_text(doc)


if __name__ == '__main__':
    import shutil
    shutil.rmtree(B / 'mockups-c', ignore_errors=True)
    print('catalogo:', build_catalogo(), 'pagine')
    print('selezione:', build_selezione(), 'pagine')
