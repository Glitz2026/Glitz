# GLITZ Festival · Campo sportivo di Scalea

Materiali per la proposta al Comune di Scalea (ottobre 2026): il festival di 8 ore nel campo sportivo di via Gaetano Scirea.

## Contenuto

- **Presentazione al Comune** (16 slide, pitch senza dati economici): [artifact](https://claude.ai/artifact/6yxNPChHqLCWi899TWu2Ux). Dalla pagina si scarica in PDF o PowerPoint. I sorgenti delle slide sono in `presentazione-comune/`; le immagini sono archiviate nell'artifact.
- **Mappa 3D** del sito: `glitz-mappa-3d.html`, file autonomo da aprire nel browser (WebGL 2, nessuna libreria esterna). Pubblicata anche come [artifact](https://claude.ai/artifact/TKsZHS6uXCKQk82fhs2Urv).
- `render/`: viste ricavate dal modello 3D (pianta di giorno e di notte, arena, drone, entroterra, ingresso, arco, privé).
- `mappa-3d/`: sorgenti della scena e strumenti di build e render.
- **Pitch per C.d. Gest Srl** (13 slide, Birra Cala birra ufficiale e C.d. Gest fornitore unico): [artifact](https://claude.ai/artifact/HHdudrtrbMT7REdEEyiq9t). Sorgenti in `pitch-cd-gest/`:
  - `pitch-cd-gest/slides/` e `deck.json`: le slide;
  - `pitch-cd-gest/lattina/`: mockup 3D della lattina Birra Cala × GLITZ (three.js), con i render in `lattina/render/`;
  - `pitch-cd-gest/modello/`: modello dei consumi e degli ordini (20.000, 25.000 e 30.000 paganti, 6 e 8 ore).

Gli artifact sono privati finché non vengono condivisi dal menu Condividi della pagina.

## La mappa 3D

Ricostruisce il layout del PDF di progetto del 9 ottobre 2026 con il motore WebGL del modello del Campovolo (ombre, bloom, fari e laser):

- arena nell'ovale del campo, palco ad arco a nord rivolto a sud, passerella e B-stage, privé A e B open air;
- quattro torri audio con schermi LED, regia FOH, food street di 20 postazioni sulla pista, 120 bagni a pieno regime;
- ingresso controllato a sud con code dentro il perimetro, presidio sanitario 118, corsia di soccorso separata, uscite di emergenza, torri faro;
- sosta P1 nella fascia nord, P2 negli spazi residui (con posti accessibili vicino all'ingresso), P3 su un lato di via Scirea, punto navette sulla strada sud;
- intorno: SS18, pineta, spiaggia con i lidi, mare, campi e case a est, via del Mare e via Po.

Assi della scena: +x est, +z sud, unità in metri, fronte palco a z = 0. La pista è modellata come un ovale di 172 × 104 m: le dimensioni dell'area, i posti auto e le capienze sono indicativi e vanno verificati sul rilievo.

Comandi: trascinare per ruotare, rotella o pizzico per lo zoom, Maiusc + trascina (o tasto destro) per spostarsi. Viste dall'alto e a terra, luce di giorno, al tramonto e di notte, legenda filtrabile. Un indirizzo che termina con `#pianta`, `#arena`, `#drone` o un'altra vista apre direttamente quella vista. Su telefono si avvia una versione più leggera.

### Ricostruire

```sh
cd festival-scalea/mappa-3d
node tools/build-page.mjs        # crea ../glitz-mappa-3d.html e dist/artifact.html
```

Render con Chromium headless (serve `playwright-core`, non incluso):

```sh
PLAYWRIGHT=/percorso/node_modules/playwright-core/index.mjs CHROMIUM=/percorso/chrome \
  node tools/render.mjs /tmp/render pianta:giorno:1920:1080 drone:tramonto:1920:1080
```

Sorgenti in `src/`, concatenati in quest'ordine: `01-base.js` (matematica e geometria), `02-sito.js` (territorio, strade, arena, servizi, sosta), `03-palco.js` (palco ad arco e privé), `03b-pubblico.js` (pubblico, fari, laser), `04-render.js` (shader, ombre, bloom, viste, comandi).

## Fonti dei dati della presentazione

- PDF *Glitz Festival · Progetto Scalea* (proposta al Comune, 9 ottobre 2026): area, capienze, sosta, mobilità, enti, cronoprogramma, richieste.
- Business plan del 20 settembre 2026: personale e servizi per scenario (addetti, antincendio, biglietteria, accoglienza, bagni, postazioni food), programma delle 8 ore, enti competenti.
- Le quantità di personale sono stime del piano operativo, da validare nel piano di sicurezza.
- Sezione «Le intenzioni» (slide 03–07), dati pubblici citati a piè di slide:
  - Università di Pisa per AssoConcerti (2025): pubblico da fuori regione e permanenza media a La Prima Estate, Lucca Summer Festival e Taylor Swift a San Siro (2024).
  - Federturismo Confindustria (2026): pernottamenti generati dalla musica dal vivo nel 2025, prime stime.
  - ISTAT: abitanti di Scalea e residenti di Calabria, Campania, Basilicata e Puglia; posti letto e utilizzo medio a Scalea (elaborazione DatiTuristici, 2025).
  - Eurostat (2024): stagionalità delle notti turistiche in Calabria.
  - SACAL e Assaeroporti (2025): passeggeri di Lamezia Terme e Napoli; Trainline e Rome2Rio (2026): tempi di viaggio.
  - Sky TG24 (2025), Billboard (2010), EXIT Festival e TIM Centar (2024): Ypsigrock a Castelbuono, FIB a Benicàssim, EXIT a Novi Sad.

## Pitch per C.d. Gest: ipotesi e fonti

- Listino del festival indicato da GLITZ: Birra Cala 8 €, cocktail 10 €, premium 15 €, Coca-Cola 5 €, acqua 3 €, panino 8 €, completo 10 €.
- Consumi a testa in 8 ore per tre fasce di pubblico (leggeri 40%, regolari 45%, forti consumatori 15%); con 6 ore le bevande scalano di un quarto. Riferimento interno: circa 2 cocktail a testa nelle serate GLITZ di 2–3 ore.
- Ordini a C.d. Gest stimati al 32% delle vendite al netto dell'IVA al 10% (ipotesi del piano economico GLITZ). Giornata media calcolata sul fatturato 2024 di C.d. Gest (58,9 milioni di euro, fatturatoitalia.it).
- Artisti (esempio di line-up da confermare): Chartmetric e kworb (settembre–ottobre 2026), DJ Mag, FIMI, Il Giorno.
- Visibilità: Live Nation Living for Live (2025), The Brand Fans (Irlanda, 2026), EventTrack (2025), report Kappa FuturFestival 2024.
- Concentrazione dei consumi: National Alcohol Survey USA (pubblicato nel 2007).
- Birra Cala: Passione Lager, oro e Country Winner Italia ai World Beer Awards 2025.
- Partnership di lungo periodo: Tuborg e Roskilde Festival, Heineken e Nameless Festival.
