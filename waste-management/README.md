# Waste Management · Catalogo e selezione personalizzata

Due brochure A4 in stile minimal, con i colori del marchio (navy `#0a2a39`, verde `#73b18d`) e il carattere Jost.

| File | Contenuto |
|---|---|
| `output/Waste-Management-Catalogo-2026.pdf` | Catalogo generale (58 pagine): 45 linee di packaging personalizzabile (138 formati, con scaglioni d'ordine) e 59 modelli di shopper (97 colori con codice Ref., formati, pezzi per scatola, grammatura). Ogni prodotto è un render 3D con il marchio Waste Management, stessa luce e stesso fondo: nessuna foto del fornitore. |
| `output/Waste-Management-Best-Seller-Personalizzati-2026.pdf` | Selezione (18 pagine): 14 best seller mostrati in mockup 3D con il marchio Waste Management. |
| `output/mockup/` | Tutti i render 3D in PNG trasparente: `pack-*` packaging, `bag-*` shopper, `sel-*` e `hero*` composizioni (social, sito, presentazioni). |
| `output/interno/codici-wm-riferimenti-fornitore.csv` | **Solo uso interno**: collega i codici `WM-…` del catalogo ai riferimenti e alle pagine dei cataloghi fornitore. |
| `assets/` | Simbolo del logo in vettoriale (SVG a gradiente, navy, bianco, verde) e logo completo in PNG trasparente. |

## Scelte
- Stile unico: tutte le immagini sono render 3D generati dagli script (`mockups/`), con gli stessi kit grafici (bianco, avana, blu notte, menta) e lo stesso studio luci.
- Le shopper usano i colori reali campionati dai riquadri "Ref." del listino (codici letti con OCR).
- Nessun prezzo e nessun nome di fornitore nel materiale per i clienti: ogni articolo ha un codice `WM-…` proprio.
- Il simbolo senza scritta viene usato come elemento grafico (intestazioni, elenchi, stampa diffusa); il logo completo resta in copertina e sul retro.
- Recapiti: sul retro ci sono il QR del profilo Instagram e tre campi vuoti (referente, telefono, e-mail) da completare.

## Rigenerare
```bash
npm install
python3 scripts/extract.py /percorso/cartella-con-i-pdf-fornitore   # dati e colori → build/
npm run build                                                   # render 3D → HTML → PDF in output/
```
Serve Python 3 con `pymupdf` e `pillow`, più `tesseract-ocr` per leggere i codici Ref. dei colori. I testi delle pagine sono in `scripts/build.py`, lo stile in `scripts/style.css`, i modelli 3D in `mockups/` (`lib.js` materiali e forme, `products.js` un modello per prodotto, `bags.js` shopper parametriche).
