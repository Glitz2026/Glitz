# Revisione del modello 3D - annotazioni del 21 settembre 2026

Applicazione nell'ordine indicato dal proprietario.

1. Riva Deck: scala anteriore allineata al bordo; scala posteriore invertita; rampa dal tratto curvo fino al prato; completamento della ringhiera posteriore senza chiudere il passaggio della scala anteriore; rotazione dei gruppi divano/pouf di 180 gradi verso l'arco, mantenendo gli ID; scala della pista estesa alla larghezza dei muri e ringhiera di raccordo.
2. Glitz Bar: archetto floreale spostato presso l'ingresso e collegato allo schienale; vasi riposizionati e pianta dopo il secondo vaso; quota del prato davanti all'ingresso portata alla quota del pianerottolo; raccordo con il percorso d'ingresso.
3. Back the Stage: B0-B4 a quota 0,90 m, due gradini verso il calpestio continuo a quota 0,60 m di B5-B15. Queste quote sono una ricostruzione relativa, non un rilievo. Schermo ampliato fino alla truss posteriore; arco parallelo al muro frontale del palco; completamento delle ringhiere e scala angolare di quattro gradini dietro B0. Logo vettoriale originale sullo schermo e all'esterno dell'arco, lato LED; rimossi i segmenti LED in corrispondenza della scritta.
4. Bar a fine pista: rotazione di 180 gradi dell'intero gruppo, incluse le attrezzature.
5. Ingresso: due banconi con doghe bianche, top superiore in legno e piano operatori bianco, senza frigoriferi, lavelli o bottiglie; tre sgabelli per bancone. Rampa tra due prati, eliminazione del deposito e della scala dietro Glitz Bar. Vegetazione spostata fuori dal passaggio.

## Fonti e misure

Logo: contorni vettoriali estratti direttamente da assets/glitz-logo-originale.pdf, senza sostituirli con un font simile. logo-paths.json contiene i tracciati, logo.js li estrude in Three.js.

Arco: larghezza 9 m, sommità 5 m sopra la pista e 4 m sopra gli appoggi, come confermato dal proprietario. Le altre nuove misure e quote sono stimate dalle foto e dalla planimetria; non costituiscono un rilievo metrico. Il verde resta una ricostruzione procedurale.

## Verifiche

Build HTML riuscita. Controllati 40 codici tavolo univoci, 16 gruppi Riva ruotati, sei sgabelli, due piani operatori, due loghi originali, due/quattro gradini nei raccordi richiesti, misure dell'arco e assenza di coordinate non finite. Il file VERIFICHE-v6.json contiene i risultati numerici.

Le viste in previews sono proiezioni tecniche raster delle geometrie effettive con profondità, senza ombre WebGL. Sono servite a controllare ingombri e raccordi; non sono screenshot del sito. Il browser ha bloccato la navigazione al file locale, quindi la verifica interattiva della versione aggiornata su Emergent resta da completare dopo la sincronizzazione.

Il GLB aggiornato è incluso in glitz-3d-kit.zip. Le copie HTML alla radice e in frontend/public sono identiche. Il codice delle prenotazioni e la palette del sito rimangono quelli già integrati.
