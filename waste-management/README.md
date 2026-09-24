# Waste Management · Catalogo e selezione personalizzata

Due brochure A4 in stile minimal, con i colori del marchio (navy `#0a2a39`, verde `#73b18d`) e il carattere Jost.

| File | Contenuto |
|---|---|
| `output/Waste-Management-Catalogo-2026.pdf` | Catalogo generale (53 pagine): 45 linee di packaging personalizzabile (138 formati) in 8 sezioni, più 59 modelli di shopper in carta, tecniche di stampa, guida ai file e retro con QR Instagram. |
| `output/Waste-Management-Best-Seller-Personalizzati-2026.pdf` | Selezione (18 pagine): 14 best seller mostrati in mockup 3D con il marchio Waste Management. |
| `output/mockup/` | I render 3D in PNG trasparente (social, sito, presentazioni). |
| `output/interno/codici-wm-riferimenti-fornitore.csv` | **Solo uso interno**: collega i codici `WM-…` del catalogo ai riferimenti e alle pagine dei cataloghi fornitore. |
| `assets/` | Simbolo del logo in vettoriale (SVG a gradiente, navy, bianco, verde) e logo completo in PNG trasparente. |

## Scelte
- Nessun prezzo e nessun nome di fornitore nel materiale per i clienti: ogni articolo ha un codice `WM-…` proprio.
- Il simbolo senza scritta viene usato come elemento grafico (intestazioni, elenchi, stampa diffusa); il logo completo resta in copertina e sul retro.
- Recapiti: sul retro ci sono il QR del profilo Instagram e tre campi vuoti (referente, telefono, e-mail) da completare.

## Rigenerare
```bash
npm install
python3 scripts/extract.py /percorso/cartella-con-i-pdf-fornitore   # dati + foto → build/
npm run build                                                   # render 3D → HTML → PDF in output/
```
Serve Python 3 con `pymupdf` e `pillow`. I testi delle pagine sono in `scripts/build.py`, lo stile in `scripts/style.css`, i modelli 3D in `mockups/render.html`.
