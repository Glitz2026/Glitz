# GLITZ Festival · Campo sportivo di Scalea

Materiali per la proposta al Comune di Scalea (ottobre 2026): il festival di 8 ore nel campo sportivo di via Gaetano Scirea.

## Contenuto

- **Presentazione al Comune** (16 slide, pitch senza dati economici): [artifact](https://claude.ai/artifact/6yxNPChHqLCWi899TWu2Ux). Dalla pagina si scarica in PDF o PowerPoint. I sorgenti delle slide sono in `presentazione-comune/`; le immagini sono archiviate nell'artifact.
- **Mappa 3D** del sito: `glitz-mappa-3d.html`, file autonomo da aprire nel browser (WebGL 2, nessuna libreria esterna). Pubblicata anche come [artifact](https://claude.ai/artifact/TKsZHS6uXCKQk82fhs2Urv).
- `render/`: viste ricavate dal modello 3D (pianta di giorno e di notte, arena, drone, entroterra, ingresso, arco, privé).
- `mappa-3d/`: sorgenti della scena e strumenti di build e render.
- **Pitch per C.D. Gest Srl** (13 slide, Birra Cala birra ufficiale e C.D. Gest fornitore unico): [artifact](https://claude.ai/artifact/HHdudrtrbMT7REdEEyiq9t). Sorgenti in `pitch-cd-gest/`:
  - `pitch-cd-gest/slides/` e `deck.json`: le slide;
  - `pitch-cd-gest/lattina/`: mockup 3D della lattina Birra Cala × GLITZ (three.js), con i render in `lattina/render/`;
  - `pitch-cd-gest/modello/`: modello dei consumi e degli ordini (20.000, 25.000 e 30.000 paganti, 6 e 8 ore).
- **Proposta di società a C.D. Gest** (13 slide, società nuova al 50% tra Villa Sandra Srl e C.D. Gest Srl, con costi completi e utili prima e dopo le imposte): [artifact](https://claude.ai/artifact/QXXJv6nxiNr1Lg5brD5ToX). Sorgenti in `societa-cd-gest/`; il conto economico è `societa-cd-gest/modello/economia.py`.

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

## Pitch per C.D. Gest: ipotesi e fonti

- Listino del festival indicato da GLITZ: Birra Cala 8 €, cocktail 10 €, premium 15 €, Coca-Cola 5 €, acqua 3 €, panino 8 €, completo 10 €.
- Consumi a testa in 8 ore di permanenza per quattro fasce di pubblico (senza alcol 15%, leggeri 30%, regolari 40%, alto spendenti 15%); con 6 ore le bevande scalano di un quarto. Riferimento interno: circa 2 cocktail a testa nelle serate GLITZ di 2–3 ore.
- Ordini a C.D. Gest = pezzi venduti × prezzo indicativo che chioschi e bar pagano a C.D. Gest, IVA esclusa (Birra Cala 2,00 €, ingredienti di un cocktail 1,60 €, premium 2,80 €, Coca-Cola 0,60 €, acqua 0,25 €, panino 2,00–2,80 €), da rifare con i listini di C.D. Gest. Giornata media: fatturato 2024 di C.D. Gest (58,9 milioni di euro, fatturatoitalia.it) diviso 365.
- Artisti (line-up di esempio, non contrattualizzata): Chartmetric e kworb (settembre–ottobre 2026), DJ Mag, UEFA, FIMI, GQ Italia.
- Visibilità: Live Nation Living for Live (2025), The Brand Fans (Irlanda, 2026, indicativo), EventTrack (2025), Kappa FuturFestival 2024 (reach mediatica dichiarata dagli organizzatori, 80–90 milioni di contatti secondo le fonti).
- Privé (circa 500 posti) e fasce di spesa: piano operativo GLITZ.
- Birra Cala: Passione Lager, Country Winner per l'Italia ai World Beer Awards 2025.
- Partnership di lungo periodo: Tuborg e Roskilde Festival, Heineken e Nameless Festival.

## Proposta di società: ipotesi del conto economico

- Biglietto medio 69 € solo ingresso; imposte come nel piano GLITZ (IVA 22% e ISI 16% sulla stessa base, 50 € netti), con il confronto concerto (IVA 10% senza ISI, 62,73 € netti), valido solo con musica dal vivo per almeno metà dell'orario e senza trattenimento danzante.
- Artisti 300.000 € come tetto lordo tutto compreso (sensibilità a 250.000 €). Sponsor: obiettivo 100.000 € non firmato, senza la categoria birra (sensibilità senza sponsor).
- Produzione 180.000 € a 20.000 paganti (palco ad arco, audio con torri di ritardo, luci e laser, LED, tecnici, rider); produzione e area +10% ogni 5.000 paganti di allestimento oltre i 20.000. Area 72.000 € più 50.000 € per protezione e ripristino del campo.
- Sicurezza e servizi: base 77.600 € più un modulo da 18.500 € ogni 2.500 paganti oltre i 10.000. Progetto e gestione 37.400 € più 3.000 € ogni 5.000 paganti.
- Pubblicità 5% dei biglietti lordi più 53.000 € fissi per contenuti e assicurazioni (compresa la polizza annullamento e maltempo); diritti musicali 10% dei biglietti lordi più 15.000 €; fee di biglietteria 3%; promoter 5 € sul 30% dei biglietti; riserva imprevisti 10% dei costi operativi; attivazioni sponsor 8%; fondo fiscale 16% su sponsor e quota chioschi.
- I costi fissi seguono l'allestimento ordinato, non i paganti: il pareggio (19.050 paganti nel caso base) è calcolato con l'allestimento per almeno 20.000; il caso «impegnato» misura la perdita se si allestisce per 25.000 e si vende meno (circa −290.000 € a 15.000 paganti).
- Chioschi: incasso e forniture C.D. Gest dal modello dei consumi (spesa 51 € a testa in 8 ore, forniture al 21% del netto); costi dei gestori 16% personale, 7% attrezzature, 5% cali sul netto IVA; utile diviso a metà tra società e gestori. Con le ipotesi del piano GLITZ (25 € a testa, forniture al 32%) la quota della società scende a circa 114.000 € a 25.000 paganti.
- Capitale prima dell'evento con il criterio del piano: 80% dei costi operativi, riserva, anticipo diritti 30.000 €, ponte IVA, cauzioni e attivazioni, meno il 75% degli sponsor; nessun anticipo dalla biglietteria.
- Utili prima e dopo le imposte sul reddito (IRES 24% e IRAP 4,82%, stimate sull'utile). Costi pubblici (area, ordine pubblico) a zero secondo l'accordo con il Comune, da formalizzare nella convenzione. Nessun compenso a Villa Sandra per il contratto di servizio: se previsto, va aggiunto ai costi.
- Sensibilità a 25.000 paganti, una variabile alla volta (utile prima delle imposte): base 205.000 €; formato concerto 524.000 €; artisti a 250.000 € 260.000 €; permanenza 6 ore 152.000 €; spesa ai banchi 35 € 125.000 €; senza sponsor 129.000 €.
