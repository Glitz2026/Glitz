# Glitz Club — sito Emergent e piantina 3D

Questa repository riunisce il sito creato su Emergent e la piantina interattiva 3D.

## Dove si trova il codice

- `frontend/`: sito React esistente di Emergent (eventi, account, amministrazione, shop e schermate pagamento).
- `mobile/`: app Expo del Glitz (iOS, Android, web) con tutte le funzioni del sito e Home in stile app; vedi `mobile/README.md`.
- `backend/`: backend esistente di Emergent.
- `glitz-interattivo.html`: piantina 3D autonoma, da scaricare e aprire nel browser.
- `frontend/public/glitz-interattivo.html`: stessa piantina, disponibile all'indirizzo `/glitz-interattivo.html` quando il frontend viene avviato o pubblicato e serve i file statici.
- `glitz-3d-kit.zip`: kit originale v5, contenente anche il modello GLB.
- `README-MAPPA.md` e `LEGGIMI.md`: istruzioni originali della mappa.
- `README-EMERGENT.md`: README originale del progetto Emergent.

## Unione dei progetti

Sito importato dal commit `92d4a9c1018c4b109d6938576cb1b82a923a0f55` del branch `conflict_210926_1434`.
Mappa conservata dal commit `50f80455bf9667915a161bd11bdaa2c61694d3e0` di `main`.
I file applicativi del sito sono conservati senza modifiche. Entrambe le cronologie sono mantenute nei genitori del commit di integrazione.

## Lavorare sul sito

Usare la cartella `frontend/` per i comandi del sito. Il progetto dichiara Yarn 1.22.22 e gli script `start`, `build`, `test`.
Il `package.json` nella radice appartiene invece alla piantina Three.js: non avvia il sito Emergent.
Le dipendenze Python del backend sono in `backend/requirements.txt`.

## Stato e prossimi passi

Questa modifica unisce i file e rende disponibile l'anteprima 3D come pagina statica. Non collega ancora la selezione dei tavoli al backend delle prenotazioni.
La mappa continua a usare prezzi e disponibilità non configurati; nessuna selezione blocca un tavolo.
Credenziali, database, pagamenti e pubblicazione rimangono quelli da verificare nel progetto Emergent; questa unione non attiva un nuovo deployment.

Dopo il merge, verificare in Emergent il branch utilizzato e sincronizzare `main` prima di continuare lo sviluppo.
Prima di pubblicare: compilare il frontend nell'ambiente Emergent, verificare login e prenotazioni in prova e controllare la pagina statica della mappa.
Il codice del sito non è stato eseguito in questa verifica: sono stati confrontati gli hash di tutti i file importati e della mappa.
