"""Pacchetto modificabile: sorgente HTML autonomo, dati di prodotti e codici (CSV/XLSX), font.
Uso: python3 scripts/package.py (dopo layout.py ed editable_build.py)"""
import csv
import json
import re
import shutil
from pathlib import Path

from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill
from openpyxl.utils import get_column_letter

ROOT = Path(__file__).resolve().parent.parent
B = ROOT / 'build'
OUT = ROOT.parent / 'output' / 'definitivo' / 'modificabile'


def html_source():
    dst = OUT / 'sorgente-html'
    if dst.exists():
        shutil.rmtree(dst)
    for d in ('css', 'fonts', 'img', 'assets'):
        (dst / d).mkdir(parents=True)
    html = (B / 'catalogo.html').read_text()
    refs = set(re.findall(r'(?:src="|url\()(img/[^")]+)', html))
    for r in refs:
        shutil.copy(B / r, dst / r)
    for a in set(re.findall(r'\.\./\.\./assets/([^"]+)', html)):
        shutil.copy(ROOT.parent / 'assets' / a, dst / 'assets' / a)
    html = html.replace('../../assets/', 'assets/').replace('../scripts/v2.css', 'css/v2.css')
    (dst / 'catalogo.html').write_text(html)
    css = (ROOT / 'scripts' / 'v2.css').read_text()
    (dst / 'css' / 'v2.css').write_text(css)
    for f in (ROOT / 'fonts').glob('*.woff2'):
        shutil.copy(f, dst / 'fonts' / f.name)
    (dst / 'LEGGIMI.txt').write_text(
        'Sorgente dell\'impaginato: apri catalogo.html in Chrome o Edge e stampa in PDF (A4, margini nessuno, grafica di sfondo attiva).\n'
        'Testi e tabelle sono nel file HTML, lo stile in css/v2.css, le immagini in img/ e il marchio in assets/.\n'
        'Per la versione con abbondanza imposta in css/v2.css la variabile --b: 3mm e il formato pagina 216 × 303 mm.\n')
    return len(refs)


def data():
    rows = json.load(open(B / 'products.json'))
    cols = ['sezione', 'gruppo', 'famiglia', 'codice', 'variante', 'materiale', 'personalizzabile', 'pagina', 'immagine']
    d = OUT / 'dati'
    d.mkdir(exist_ok=True)
    with open(d / 'prodotti-e-codici.csv', 'w', newline='', encoding='utf-8-sig') as f:
        w = csv.DictWriter(f, fieldnames=cols, delimiter=';'); w.writeheader(); w.writerows(rows)
    wb = Workbook(); ws = wb.active; ws.title = 'Prodotti e codici'
    ws.append([c.capitalize() for c in cols])
    for r in rows:
        ws.append([r[c] for c in cols])
    for c in ws[1]:
        c.font = Font(bold=True, color='FFFFFF'); c.fill = PatternFill('solid', fgColor='0A2A39')
    for i, wdt in enumerate([28, 30, 34, 16, 46, 30, 16, 8, 16], 1):
        ws.column_dimensions[get_column_letter(i)].width = wdt
    ws.freeze_panes = 'A2'; ws.auto_filter.ref = ws.dimensions
    wb.save(d / 'prodotti-e-codici.xlsx')
    return len(rows)


if __name__ == '__main__':
    OUT.mkdir(parents=True, exist_ok=True)
    print('immagini sorgente', html_source(), '· righe prodotto', data())
