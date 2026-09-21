# Piantina 3D nel sito Emergent

La pagina evento mostra la vista 3D e mantiene la piantina 2D come alternativa. Il pulsante Prenota Tavolo porta alla piantina quando questa è attiva per l'evento.

Il modello usa gli stessi codici B0–B15, R1–R16 e G1–G8. Floorplan passa al 3D le condizioni già risolte dalle impostazioni delle zone e dagli override dei tavoli. Il testo del prezzo viene mantenuto: un prezzo “Da” non viene trasformato in un minimo di spesa. Le capienze non vengono inventate.

La vista incorporata parte con tutti i tavoli disabilitati. Floorplan3D legge l'evento, aggiorna lo stato ogni 30 secondi e al ritorno sulla finestra, e ricontrolla la disponibilità prima di aprire BookingModal. Tavoli eliminati, spostati in zone non corrispondenti al modello o con stato sconosciuto vengono disabilitati. Nuovi tavoli o disposizioni personalizzate restano disponibili nella piantina 2D finché il modello non viene aggiornato.

La comunicazione usa GlitzMap nello stesso dominio, senza postMessage o passaggio di dati personali all'iframe. setBookingHandler apre il modulo esistente: non scarica il riepilogo JSON della versione autonoma. Il backend, WhatsApp e il flusso di invio esistenti non sono modificati. Si tratta di una richiesta da confermare dallo staff, non di un acquisto o di una prenotazione definitivamente confermata.

## Verifica eseguita

- Build del modello con esbuild riuscita.
- Compilazione sintattica JSX di Floorplan, Floorplan3D e EventDetail riuscita.
- Quattro test Node su disponibilità, condizioni, tavoli rimossi, cambio zona e aggiornamento degli stati: `node --test tests/floorplan-bridge.test.mjs`.
- Nessuna prenotazione, email, messaggio o pagamento creato durante i controlli.

## Verifica dopo la sincronizzazione Emergent

1. Aprire un evento con piantina abilitata. Verificare il caricamento 3D e il passaggio alla vista 2D su desktop e telefono.
2. Selezionare B0, R1 e G1: confrontare zona e condizioni con la piantina 2D, poi aprire il modulo senza inviarlo.
3. In un evento di prova, segnare un tavolo come reserved/booked e verificare che non sia selezionabile nel 3D.
4. Verificare il ripiego 2D su un dispositivo senza WebGL.

La build completa React/CRACO e la verifica visiva dell'integrazione nel sito Emergent restano da eseguire dopo il merge e la sincronizzazione. Il file statico è già incluso in frontend/public: non serve installare Three.js nel frontend.

## Limite preesistente del backend

POST /bookings salva la richiesta e aggiorna reserved_tables senza un controllo atomico della disponibilità. Il controllo frontend riduce gli errori ma non può impedire due invii contemporanei. Prima di offrire conferme automatiche o pagamenti per un tavolo serve una prenotazione atomica sul server e una gestione coerente di annullamenti e rilascio del tavolo.

## File del modello

app.js e template.html restano le sorgenti del modello alla radice. npm run build rigenera app.bundle.js e glitz-interattivo.html; quando frontend/public esiste aggiorna anche la copia servita dal sito. La geometria, il GLB e il kit ZIP v5 non cambiano con questa integrazione.
