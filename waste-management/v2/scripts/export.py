"""PDF definitivi dal rendering di Chromium:
- digitale: collegamenti interni, segnalibri, metadati;
- stampa: A4 con abbondanza di 3 mm per lato (TrimBox/BleedBox impostati);
- parti numerate, ciascuna sotto i 30 MB, divise alle aperture di sezione.
Uso: python3 scripts/export.py  (dopo node scripts/make_pdf.mjs digital && node scripts/make_pdf.mjs print)"""
import json
import shutil
from pathlib import Path

import pymupdf

ROOT = Path(__file__).resolve().parent.parent
B = ROOT / 'build'
OUT = ROOT.parent / 'output' / 'definitivo'
NAME = 'Waste-Management-Group-Catalogo'
LIMIT = 28 * 1024 * 1024          # margine sotto i 30 MB richiesti
MM = 72 / 25.4
REP = json.load(open(B / 'layout_report.json'))
TOC = REP['toc']
META = dict(title='Waste Management Group · Catalogo prodotti', author='Waste Management Group',
            subject='Monouso in carta e plastica, packaging, articoli personalizzati e detergenza professionale',
            keywords='monouso, packaging, personalizzazione, detergenza professionale, Scalea', creator='Waste Management Group', producer='')


def finish(doc, path, toc=TOC):
    doc.set_metadata(META)
    doc.set_toc(toc)
    doc.save(path, garbage=4, deflate=True, clean=True)
    return path.stat().st_size


def sections():
    """Pagine di inizio dei blocchi: apparato iniziale, sette sezioni, indice dei codici e chiusura."""
    starts = [1] + [p for lvl, t, p in TOC if lvl == 1 and t[:2].isdigit()] + [next(p for lvl, t, p in TOC if t == 'Indice dei codici')]
    return sorted(set(starts))


def split(src, n_pages, min_parts=3):
    """Parti alle aperture di sezione, di lunghezza simile, ciascuna sotto LIMIT."""
    starts = sections() + [n_pages + 1]
    blocks = [(starts[i], starts[i + 1] - 1) for i in range(len(starts) - 1)]
    tmp = B / 'part-tmp.pdf'

    def size_of(a, b):
        d = pymupdf.open(); d.insert_pdf(src, from_page=a - 1, to_page=b - 1); d.save(tmp, garbage=4, deflate=True); d.close()
        return tmp.stat().st_size
    total = (OUT / f'{NAME}-digitale.pdf').stat().st_size
    k = max(min_parts, -(-total // LIMIT))
    while True:
        target = n_pages / k
        parts, cur = [], None
        for a, b in blocks:
            if cur is None:
                cur = [a, b]
            elif (b - cur[0] + 1) <= target * 1.15:
                cur[1] = b
            else:
                parts.append(tuple(cur)); cur = [a, b]
        parts.append(tuple(cur))
        if all(size_of(a, b) <= LIMIT for a, b in parts):
            break
        k += 1
    tmp.unlink(missing_ok=True)
    return parts


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    for old in OUT.glob(f'{NAME}*.pdf'):
        old.unlink()
    # digitale
    dig = pymupdf.open(B / 'catalogo-digitale-raw.pdf')
    n = dig.page_count
    size = finish(dig, OUT / f'{NAME}-digitale.pdf')
    print('digitale', n, 'pagine', round(size / 1e6, 1), 'MB')
    # stampa: abbondanza 3 mm, rifilo A4
    st = pymupdf.open(B / 'catalogo-stampa-raw.pdf')
    for pg in st:
        r = pg.mediabox
        # il contenuto è impaginato con 3 mm di abbondanza: il rifilo A4 parte a 3 mm dal bordo
        pg.set_bleedbox(pymupdf.Rect(0, 0, min(r.x1, 216 * MM), min(r.y1, 303 * MM)))
        pg.set_trimbox(pymupdf.Rect(3 * MM, 3 * MM, 213 * MM, 300 * MM))
    size_s = finish(st, OUT / f'{NAME}-stampa-A4-abbondanza-3mm.pdf')
    w, h = st[0].mediabox.width / MM, st[0].mediabox.height / MM
    print('stampa', st.page_count, 'pagine', f'{w:.1f}×{h:.1f} mm', round(size_s / 1e6, 1), 'MB')
    # parti numerate dal PDF digitale
    src = pymupdf.open(OUT / f'{NAME}-digitale.pdf')
    parts = split(src, n)
    info = []
    for i, (a, b) in enumerate(parts, 1):
        d = pymupdf.open(); d.insert_pdf(src, from_page=a - 1, to_page=b - 1)
        toc = [[lvl, t, p - a + 1] for lvl, t, p in TOC if a <= p <= b]
        if toc and toc[0][0] != 1:
            toc[0][0] = 1
            for k in range(1, len(toc)):
                toc[k][0] = min(toc[k][0], toc[k - 1][0] + 1)
        path = OUT / f'{NAME}-parte-{i}-di-{len(parts)}.pdf'
        sz = finish(d, path, toc)
        info.append(dict(file=path.name, pages=f'{a}–{b}', mb=round(sz / 1e6, 1)))
        print(path.name, f'pagine {a}-{b}', round(sz / 1e6, 1), 'MB')
    json.dump(dict(digital_mb=round(size / 1e6, 1), print_mb=round(size_s / 1e6, 1), pages=n, parts=info), open(OUT / 'export.json', 'w'), indent=1, ensure_ascii=False)


if __name__ == '__main__':
    main()
