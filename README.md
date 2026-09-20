# Glitz Club — piantina interattiva 3D

Versione finale 5, ricostruita dalla planimetria e dalle fotografie del club.

## Aprire il modello

Scaricare `glitz-interattivo.html` e aprirlo nel browser. Il file include il codice e la piantina e funziona senza CDN. Su GitHub il file viene mostrato come codice: scaricarlo per usarlo.

- `glitz-club.glb`: modello 3D esportato.
- `glitz-3d-kit.zip`: pacchetto completo scaricabile.
- `glitz-anteprima.png`, `glitz-arco.png`, `glitz-bar-dettaglio.png`: anteprime del modello.
- `LEGGIMI.md`: dettagli, integrazione e limiti della ricostruzione.
- `VERIFICHE.json`: verifiche eseguite.

## Sviluppo

```sh
npm install
npm run build
npm run preview
```

Il server locale risponde su http://localhost:8080. Aprire `/glitz-interattivo.html`.

La mappa comprende 40 tavoli: RIVA DECK R1–R16, BACK THE STAGE B0–B15 e GLITZ BAR G1–G8. Prezzi, disponibilità e prenotazioni richiedono un backend; la selezione nel prototipo non costituisce una prenotazione.

L'arco misura 9 m di larghezza, con sommità a 4 m dal piano di appoggio e 5 m dalla pista. Gli altri dettagli non quotati sono stimati. Il lettering è ricostruito dalle foto: il logo originale deve ancora essere fornito.
