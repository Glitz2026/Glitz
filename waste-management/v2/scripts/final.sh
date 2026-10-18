#!/bin/sh
# Ricostruzione completa del catalogo definitivo e di tutti i file di consegna.
set -e
cd "$(dirname "$0")/.."
python3 scripts/layout.py
node scripts/qa.mjs
node scripts/make_pdf.mjs digital
node scripts/make_pdf.mjs print
python3 scripts/export.py
node scripts/editable_extract.mjs
python3 scripts/editable_build.py
python3 scripts/package.py
