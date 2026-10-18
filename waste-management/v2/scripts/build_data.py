"""Costruisce il modello dati del catalogo definitivo (build/catalog.json).

Fonti:
  - build/source.json            catalogo Waste Management Group (parte 1 e 2)
  - ../build/data/packaging.json  packaging stampato su misura (catalogo personalizzazione)
  - ../build/data/shopper.json    collezione shopper colori e fantasie
Regole: nessun prezzo, anno, quantità di confezione o minimo; codici originali invariati.
"""
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
B = ROOT / 'build'
V1 = ROOT.parent / 'build' / 'data'
SRC = json.load(open(B / 'source.json'))

SECTIONS = [
    ('tavola', 'Tavola e tovagliati', 'Il primo dettaglio dell’accoglienza.',
     'Tovaglie, tovaglioli, piatti, posate e accessori per apparecchiare con ordine e carattere.'),
    ('bevande', 'Bicchieri, bevande e gelato', 'Ogni pausa ha il suo formato.',
     'Bicchieri, coperchi, cannucce, coppette e accessori per il banco bar e la gelateria.'),
    ('asporto', 'Asporto e packaging alimentare', 'Il gusto si porta con sé.',
     'Contenitori, insalatiere, box e vaschette per il take away, più il packaging stampato con il tuo marchio.'),
    ('carta', 'Carta, sacchetti e shopper', 'La cura continua anche fuori dal locale.',
     'Carte da incarto, sacchetti, buste e shopper: dalla gastronomia al negozio.'),
    ('cucina', 'Cucina, preparazione e protezione', 'Preparare. Proteggere. Servire.',
     'Spiedini, sac à poche, carta forno, sottovuoto e abbigliamento monouso per chi lavora in cucina.'),
    ('detergenza', 'Detergenza professionale', 'Ogni ambiente, la sua cura.',
     'Detergenti professionali organizzati per destinazione d’uso e accessori per la pulizia.'),
    ('personalizzazioni', 'Personalizzazioni e realizzazioni', 'Il tuo marchio, nei gesti quotidiani.',
     'Supporti, tecniche e realizzazioni per costruire un coordinato riconoscibile.'),
]
SRC_SECTION = {'TAVOLA': 'tavola', 'BEVANDE E GELATO': 'bevande', 'ASPORTO E PACKAGING': 'asporto',
               'CARTA E SHOPPER': 'carta', 'CUCINA E PROTEZIONE': 'cucina', 'DETERGENZA': 'detergenza'}

# ---------------------------------------------------------------- gruppi interni alle sezioni
GROUPS = {
    'tavola': [('Tovagliati e tovaglioli', r'tovagli|runner|pocket|coordinato|portatovaglioli|buste portaposate|sottotazza|bavagli|salviettine'),
               ('Piatti e vassoi', r'piatti|vassoi'),
               ('Posate e accessori', r'posate|bacchette|spiedini decorativi|stuzzicadenti|finger|posacenere|palettine')],
    'bevande': [('Bicchieri e coperchi', r'bicchier|coperchi'),
                ('Cannucce e palettine', r'cannucce|palettine|forchettine'),
                ('Gelato e dessert', r'gelato|coppe|coppette|barattoli|palette')],
    'asporto': [('Contenitori e insalatiere', r'insalatier|ciotol|contenitori|box|vaschette|portafritti|coni|barchette|supporti per coni|vassoio sushi|portakebab|portabicchieri|portacr|scatole pizza|finger'),
                ('Pasticceria', r'pasticceria|sottotorta|copripaste'),
                ('Packaging stampato su misura', r'^WP:')],
    'carta': [('Carte da incarto', r'carta|sottofritti|fogli|pelleaglio'),
              ('Sacchetti e buste', r'sacchett|sacchi'),
              ('Shopper', r'shopper'),
              ('Collezione shopper colori e fantasie', r'^SH:')],
    'cucina': [('Preparazione', r'spiedini|pizzi|sac à poche|filtri'),
               ('Cottura e conservazione', r'carta forno|friggitrice|sottovuoto|dischi carta'),
               ('Protezione e abbigliamento', r'guanti|cappelli|berretti|copricapi|grembiuli')],
}
DET_GROUPS = [
    ('pavimenti', 'Pavimenti', ['AUREO', 'DETON', 'KORL', 'PARX', 'METAL C', 'MOCHITEX', 'BLU OCEAN', 'FLOREAL', 'ROSE PATCH']),
    ('vetri', 'Vetri, acciaio e superfici', ['MULTIGLAX', 'INOLUX', 'BYROX', 'BACTIVE', 'BACTOSAN', 'OXIMAX', 'REFLEX OXY', 'REFLEX CLOR', 'CLORACTIVE', 'CLORACTAB', 'RTU PLUS']),
    ('cucina', 'Cucina e sgrassatura', ['SGRASSO', 'SGRASSO LEMON', 'OVENGRILL', 'MATIC FORN']),
    ('incrostazioni', 'Incrostazioni e calcare', ['SKRUST', 'ACIDO 100']),
    ('stoviglie', 'Lavaggio stoviglie', ['VERDELLO', 'LAWASH PLUS', 'LAWASH MATIC', 'LAWASH HD', 'LAWASH BAR', 'BRILL PLUS', 'BRILLCARE']),
    ('bagno', 'Bagno', ['BAGNO RAPID', 'ANTICALC', 'DEONET WC']),
    ('lavanderia', 'Lavanderia', ['TEXY', 'HARRY', 'MORBYD']),
    ('lavamani', 'Lavamani', ['SANIGLAM', 'GLAM']),
    ('ambienti', 'Ambienti', ['DEODEO']),
]

GENERIC_NOTES = ['Varianti equivalenti accorpate. Le immagini rappresentano la famiglia; i codici distinguono gli articoli.',
                 'Immagine rappresentativa della famiglia; finiture e varianti in tabella.', 'Immagine illustrativa della famiglia.']

# funzione del prodotto quando il catalogo sorgente non la riporta (descrizioni generiche, nessun dato tecnico)
FUNCTION_RULES = [
    (r'piatti fondi|ciotole', 'Per primi piatti, zuppe e porzioni con fondo.'),
    (r'piatti a scomparti', 'Per servire più portate separate nello stesso piatto.'),
    (r'piatti pizza', 'Piatto ampio per pizza e preparazioni al taglio.'),
    (r'piatti', 'Piatti monouso per il servizio a tavola, il catering e l’asporto.'),
    (r'vassoi', 'Per presentare e trasportare preparazioni e porzioni.'),
    (r'finger food', 'Monoporzioni per aperitivi, buffet e catering.'),
    (r'posate|set posate', 'Posate monouso per il servizio a tavola e il take away.'),
    (r'bacchette', 'Per la cucina orientale e il servizio al banco.'),
    (r'spiedini decorativi|stuzzicadenti', 'Per finger food, aperitivi e decorazioni.'),
    (r'bavagli', 'Protezione monouso per il servizio a tavola.'),
    (r'coppette dessert', 'Per dessert, gelato e porzioni al cucchiaio.'),
    (r'palette gelato|palettine', 'Per gelato, dessert e bevande calde.'),
    (r'bicchieri caff', 'Per caffè, espresso e bevande calde al banco.'),
    (r'bicchieri', 'Per bevande calde e fredde, al banco e da asporto.'),
    (r'coperchi', 'Chiusure abbinate ai formati dei bicchieri.'),
    (r'cannucce', 'Per bevande fredde, cocktail e frullati.'),
    (r'coppette decorate', 'Coppette decorate per dessert e gelato.'),
    (r'insalatiere', 'Per insalate, poke e piatti freddi da asporto.'),
    (r'box|contenitori', 'Contenitori per il take away e la consegna a domicilio.'),
    (r'portafritti', 'Per fritti e street food.'),
    (r'vaschette', 'Per porzioni da asporto e gastronomia.'),
    (r'barchette', 'Per finger food, fritti e assaggi.'),
    (r'coni', 'Per fritti, finger food e street food.'),
    (r'supporti per coni', 'Espositore per servire i coni al tavolo e al banco.'),
    (r'spiedini da cucina', 'Spiedini per la preparazione di carne, pesce e verdure.'),
    (r'pizzi', 'Per presentare dolci e preparazioni da banco.'),
    (r'sac à poche', 'Per farcire, decorare e dosare impasti e creme.'),
    (r'filtri', 'Per filtrare liquidi e preparazioni in cucina.'),
    (r'guanti', 'Guanti monouso per la manipolazione degli alimenti in cucina.'),
    (r'cappelli|berretti|copricapi', 'Copricapi monouso per cucina e laboratori alimentari.'),
    (r'grembiuli', 'Protezione per l’abbigliamento in cucina e al banco.'),
    (r'carta forno|dischi carta', 'Carta forno per la cottura e la preparazione.'),
    (r'friggitrice', 'Contenitori in carta forno per la friggitrice ad aria.'),
    (r'sottovuoto', 'Buste e rotoli per il confezionamento sottovuoto.'),
    (r'panni in microfibra', 'Panni in microfibra per la pulizia di superfici e pavimenti.'),
    (r'panni per pavimenti', 'Panni per il lavaggio dei pavimenti.'),
    (r'panni pva', 'Panni assorbenti in PVA per asciugare e pulire.'),
    (r'panni multiuso', 'Panni multiuso e scamosciati per superfici e vetri.'),
    (r'panni spugna', 'Panni spugna e tappetini per la cucina e il bagno.'),
    (r'pulizia intensa', 'Panni per la pulizia intensa di pavimenti e superfici.'),
    (r'catturapolvere', 'Per spolverare superfici e arredi.'),
    (r'salviette di servizio', 'Salviette per la pulizia di superfici e occhiali.'),
    (r'spugna', 'Per rimuovere segni e macchie dalle superfici.'),
]

ACRONYMS = {'CPLA', 'PLA', 'PP', 'PS', 'PE', 'PVA', 'PVC', 'TNT', 'RPET', 'PET', 'HD', 'WC', 'XL', 'XXL', 'S', 'M', 'L', 'SM', 'ML', '3D'}
EXPAND = {
    'COMPOST': 'compostabile', 'COMPOSTA': 'compostabile', 'COMPOS': 'compostabile', 'COMPO': 'compostabile', 'COMP': 'compostabile',
    'BIANC': 'bianco', 'BIAC': 'bianco', 'BI': 'bianco', 'BIAN.': 'bianche', 'INCARTAT': 'incartato', 'INCART.': 'incartate', 'INCA': 'incartato',
    'INCARTA': 'incartata', 'MICROFIB': 'microfibra', 'MICROF': 'microfibra', 'MICRO': 'microfibra', 'PAVIMEN': 'pavimenti',
    'CART': 'carta', 'CELEST': 'celeste', 'RIUTILIZ.': 'riutilizzabile', 'RIUTILIZ': 'riutilizzabile', 'RIUTIL': 'riutilizzabile', 'RIUTIL.': 'riutilizzabile',
    'CAPPUC.': 'cappuccino', 'CATT.': 'catturapolvere', 'CATT': 'catturapolvere', 'CATTURAPO': 'catturapolvere', 'POLV': 'polvere',
    'PI': 'panno', 'SPZ': '', 'FOR+COLTEL+TOVAG': 'forchetta + coltello + tovagliolo', 'FOR+CUCCH+COLT+TOV': 'forchetta + cucchiaio + coltello + tovagliolo',
    'TOV': 'tovagliolo', 'FORCH-CUCCH': 'forchetta-cucchiaio', 'QUAD': 'quadrato', 'RETT.SUSHI': 'rettangolare sushi', 'N': 'nere',
    'BAMB': 'bambù', 'BA': 'bambù', 'AZZU': 'azzurro', 'VERD': 'verde', 'INCAR': 'incartati', 'INCART': 'incartati', 'INCAR.': 'incartate',
    'PIG': 'pieghevoli', 'PIEGHEVOL': 'pieghevoli', 'BIODEGR': 'biodegradabili', 'BIODEG': 'biodegradabili', 'BARATT': 'barattolo',
    'PO': 'polpa', 'FORA': 'forato', 'PESA': 'pesante', 'VIET': 'Vietri', 'VIETR': 'Vietri', 'VIETRI': 'Vietri', 'LAVELL': 'lavello',
    'INSAL': '', 'INSAL.': '', 'COPER.': 'coperchio', 'CAFFE’': 'caffè', 'CAFFE': 'caffè', 'BIAN.20': 'bianche 20', 'P': '', 'C': '', 'Z': '', 'TU': '', 'PEL': '',
    'FORCH+COLT+TOVAG': 'forchetta + coltello + tovagliolo', 'FOR-CUC-COLT-TOV': 'forchetta + cucchiaio + coltello + tovagliolo',
    'NATALE': 'Natale', 'ASIA': 'Asia', 'CATT.POLV': 'catturapolvere', 'CATT.COLORI': 'catturapolvere colori', 'SOMT': '50 m',
    'FORCHETTINACM9': 'forchettina 9 cm', 'FOGLI40': 'fogli 40', 'CUCCHTIA': 'cucchiaio',
}


def clean_text(s):
    s = re.sub(r'\s+', ' ', s).strip()
    s = s.replace('XX', '×').replace("'", '’')
    if not s:
        return s
    letters = [c for c in s if c.isalpha()]
    caps = letters and sum(c.isupper() for c in letters) / len(letters) > 0.8
    if not caps:
        return s
    words = []
    for w in s.split(' '):
        if w in EXPAND:
            w = EXPAND[w]
            if w:
                words.append(w)
            continue
        m = re.fullmatch(r'(CM|ML|MT|GR|MM|D)\.?([\d.,]+.*)?', w)
        if m:
            unit = {'CM': 'cm', 'ML': 'ml', 'MT': 'm', 'GR': 'g', 'MM': 'mm', 'D': 'Ø'}[m.group(1)]
            words.append((unit + ' ' + (m.group(2) or '')).strip() if unit != 'Ø' else 'Ø ' + (m.group(2) or ''))
            continue
        m = re.fullmatch(r'([\d.,]+)(MM|ML|MT|CM|GR|H)([\d.,]*)', w)
        if m:
            unit = {'MM': ' mm', 'ML': ' ml', 'MT': ' m', 'CM': ' cm', 'GR': ' g', 'H': ' h'}[m.group(2)]
            words.append(m.group(1) + unit + (' ' + m.group(3) if m.group(3) else ''))
            continue
        core = w.strip('.,')
        if core.upper() in ACRONYMS or re.fullmatch(r'[\d×.,/+°\-]+', core) or re.search(r'\d', core):
            words.append(w.replace('X', '×') if re.fullmatch(r'\d+X\d+.*', w) else w)
        else:
            words.append(w.lower())
    out = ' '.join(words)
    out = re.sub(r'\bcm\.\s*', 'cm ', out)
    out = re.sub(r'\s+', ' ', out).strip()
    return out[:1].upper() + out[1:]


ALLOW = set('cm mm ml kg g l m µm h small large medium per con e da di in blu oro set eco bis tris nere nera neri rosa rosso gold maxi spada tondo foglia piano fondo pizza frutta ovale lusso panno panni set kit asta bianco bianca bianche bianchi verde giallo nero grigio avana scopa cuffia morbido elastico cotone magico pelle umido multiuso spugna rotolo forchetta forchette coltello cucchiaio cucchiaino cucchiaini ciotola ciotolina salse poke coperchio sushi panino'.split())


def tidy(v, family=''):
    # normalizzazione tipografica: × tra misure, spazio prima delle unità, virgola decimale, separatori
    v = re.sub(r'(?<=\d)\s*[xX×]\s*(?=[\dØ])', ' × ', v)
    v = re.sub(r'(?<=\d)\.(?=\d{1,2}(?!\d))', ',', v)
    v = re.sub(r'(?<=\d)(cm|mm|ml|kg|g|L|m)\b', r' \1', v)
    v = re.sub(r'\bh\s*(?=\d)', 'h ', v)
    v = re.sub(r'Ø\s*(?=\d)', 'Ø ', v)
    v = v.replace(' - ', ' · ').replace(' -Ø', ' · Ø')
    # togli parole che ripetono il nome della famiglia all'inizio
    first = re.findall(r'[a-zà-ù]{4,}', family.lower())
    fam = {first[0][:5]} if first else set()
    if family.lower().startswith('carta forno'):
        fam |= {'carta', 'forno'}
    toks = v.split(' ')
    while len(toks) > 1 and re.fullmatch(r'[A-Za-zà-ù.]+', toks[0]) and toks[0].lower()[:5].rstrip('.') in {f[:len(toks[0].rstrip('.'))] for f in fam} | fam:
        toks = toks[1:]
    # frammenti troncati non interpretabili in coda
    while len(toks) > 1 and re.fullmatch(r'[a-zà-ù]{1,4}\.?', toks[-1]) and toks[-1].rstrip('.') not in ALLOW:
        toks = toks[:-1]
    v = ' '.join(t for t in toks if t)
    v = re.sub(r'\s+', ' ', v).strip(' ·')
    return v[:1].upper() + v[1:] if v else v


def merge_rows(f):
    rows = []
    cols = f['columns'] or ['CODICE', 'FORMATO']
    codecol = cols[0]
    for r in f['rows']:
        if codecol not in r and rows:  # riga di continuazione
            for k, v in r.items():
                rows[-1][k] = (rows[-1].get(k, '') + ' ' + v).strip()
        else:
            rows.append(dict(r))
    out = []
    for r in rows:
        code = r.get(codecol, '—').strip()
        fmt = r.get('FORMATO', '').strip()
        if code and code != '—':
            fmt = re.sub(r'^' + re.escape(code) + r'\s+', '', fmt)
        out.append(dict(code=code, variant=tidy(clean_text(fmt), f['name']), raw=r.get('FORMATO', '')))
    return out, codecol


def function_for(name, desc):
    if desc:
        return desc
    low = name.lower()
    for pat, txt in FUNCTION_RULES:
        if re.search(pat, low):
            return txt
    return ''


MATERIAL_HINTS = [(r'polpa', 'Polpa di cellulosa'), (r'cpla', 'CPLA'), (r'\bpla\b', 'PLA'), (r'legno', 'Legno'), (r'kraft', 'Cartoncino kraft'),
                  (r'cartoncino', 'Cartoncino'), (r'\bpp\b', 'Polipropilene'), (r'tnt', 'Tessuto non tessuto'), (r'in carta|carta ', 'Carta')]


def material_for(name, mat):
    if mat and mat != 'Detergenza professionale':
        return mat
    for pat, m in MATERIAL_HINTS:
        if re.search(pat, name.lower()):
            return m
    return ''


def slug(s):
    return re.sub(r'[^a-z0-9]+', '-', s.lower()).strip('-')


# ---------------------------------------------------------------- famiglie dal catalogo sorgente (accorpate)
fams = {}
order = []
for p in SRC:
    sec = SRC_SECTION.get(p['section'])
    if not sec:
        continue
    for f in p['families']:
        key = (sec, f['name'].strip().lower())
        rows, codecol = merge_rows(f)
        notes = [n for n in [f['notes']] if n and n not in GENERIC_NOTES]
        rep = any(g in (f['notes'] or '') for g in GENERIC_NOTES)
        if key not in fams:
            fams[key] = dict(id=slug(f['name']) + '-' + sec, section=sec, name=f['name'].strip(), desc=f['desc'], material=f['material'],
                             notes=[], tags=set(), rows=[], images=[], codecol=codecol, representative=False, source_pages=[])
            order.append(key)
        F = fams[key]
        F['desc'] = F['desc'] or f['desc']
        F['material'] = F['material'] if F['material'] and F['material'] != 'Detergenza professionale' else f['material']
        F['notes'] += [n for n in notes if n not in F['notes']]
        F['tags'] |= set(f['tags'])
        seen = {(r['code'], r['variant']) for r in F['rows']}
        F['rows'] += [r for r in rows if (r['code'], r['variant']) not in seen]
        F['representative'] |= rep
        F['source_pages'].append(p['page'])
        have = {i['file'] for i in F['images']}
        for im in f['images']:
            if im['file'] not in have:
                F['images'].append(dict(file=im['file'], code=im['caption'], w=im['w'], h=im['h']))
                have.add(im['file'])
        if codecol != 'CODICE':
            F['codecol'] = codecol

families = []
for key in order:
    F = fams[key]
    F['tags'] = sorted(F['tags'])
    F['custom'] = 'PERSONALIZZABILE' in F['tags']
    F['function'] = function_for(F['name'], F['desc'])
    F['material'] = material_for(F['name'], F['material'])
    if F['section'] == 'detergenza' and F['name'].isupper():
        F['kind'] = 'detergent'
        F['dest'] = next((g for g, _, names in DET_GROUPS if F['name'] in names), 'vetri')
        F['material'] = ''
    elif F['section'] == 'detergenza':
        F['kind'] = 'accessory'
    else:
        F['kind'] = 'product'
    families.append(F)

# ---------------------------------------------------------------- packaging stampato su misura
PACK = json.load(open(V1 / 'packaging.json'))
WP_SUB = {'panini': 'Porta panini', 'fritti': 'Porta fritti e street food', 'accessori': 'Accessori', 'etnica': 'Cucina etnica',
          'pasticceria': 'Pasticceria', 'regalo': 'Box regalo', 'ecommerce': 'E-commerce', 'bicchieri': 'Bicchieri e bowl'}
for p in PACK:
    rows = []
    for r in p['rows']:
        v = r['dim'].replace(' x ', ' × ').replace(' X ', ' × ')
        v = re.sub(r'(\d)\s*H\b', r'\1 h', v).replace(' - ', ' · ').replace('*', '')
        if r.get('label'):
            v = f"{r['label']} · {v}"
        rows.append(dict(code=r['ref'], variant=v, raw=r['dim']))
    sec = 'tavola' if p['id'] == 'AC01' else ('bevande' if p['cat'] == 'bicchieri' else 'asporto')
    name = p['name'] if p['id'] != 'AC01' else 'Tovagliette stampate su misura'
    techniques = ['Stampa diffusa 1–3 colori', 'Offset 4 colori'] if p['pasticceria'] else (['Offset 4 colori'] if p['id'] == 'PA08' else ['Stampa del marchio su misura'])
    families.append(dict(id='wp-' + p['id'].lower(), section=sec, name=name, desc='', function=WP_SUB[p['cat']] + (' · ' + p['sub'] if p['sub'] else ''),
                         material='', notes=[], tags=['PERSONALIZZABILE'], custom=True, rows=rows, images=[], codecol='CODICE',
                         representative=False, kind='printed', render=f'pack-{p["id"]}', techniques=techniques, wp_cat=p['cat'],
                         group_key='WP:' + p['cat'], source_pages=[]))

# ---------------------------------------------------------------- collezione shopper
BAGS = json.load(open(V1 / 'shopper.json'))
for i, b in enumerate(BAGS):
    rows = [dict(code='—', variant=r['f'] + (f" · {r['gsm']} g/m²" if r.get('gsm') else ''), raw=r['f']) for r in b['rows']]
    families.append(dict(id=f'sh-{i:02d}', section='carta', name=b['title'], desc='', function=b['desc'], material='',
                         notes=[], tags=['PERSONALIZZABILE'], custom=True, rows=rows, images=[], codecol='FORMATO',
                         representative=False, kind='bag', render=f'bag-{i:02d}', swatches=b['swatches'], collection=b['section'],
                         group_key='SH:' + b['section'], source_pages=[]))

# ---------------------------------------------------------------- assegnazione ai gruppi
for F in families:
    if F['section'] == 'detergenza':
        F['group'] = dict((g, t) for g, t, _ in DET_GROUPS).get(F.get('dest'), 'Accessori per la pulizia') if F['kind'] == 'detergent' else 'Accessori per la pulizia'
        continue
    probe = F.get('group_key') or F['name'].lower()
    F['group'] = next((t for t, pat in GROUPS.get(F['section'], []) if re.search(pat, probe, re.I)), GROUPS[F['section']][0][0] if F['section'] in GROUPS else '')

out = dict(sections=[dict(id=s, title=t, claim=c, text=x) for s, t, c, x in SECTIONS], det_groups=[dict(id=g, title=t) for g, t, _ in DET_GROUPS],
           families=families)
json.dump(out, open(B / 'catalog.json', 'w'), ensure_ascii=False, indent=1, default=list)
from collections import Counter
print('famiglie', len(families), Counter(f['section'] for f in families))
print('varianti', sum(len(f['rows']) for f in families), 'codici', sum(1 for f in families for r in f['rows'] if r['code'] not in ('—', '')))
print(Counter((f['section'], f['group']) for f in families))
