# GLITZ — versione 5: panche continue e truss completa

## Arco: misure fornite dal gestore
- Larghezza strutturale esterna: 9,00 m.
- Centro dell’arco: 4,00 m sopra il piano di appoggio.
- Centro dell’arco: 5,00 m sopra la pista.
- Piano di appoggio: 1,00 m sopra la pista.

La quota di 4/5 m si riferisce alla sommità del traliccio al centro: la scritta e i proiettori montati sopra sono oggetti separati e la oltrepassano, come nelle fotografie. Larghezza interpretata come ingombro esterno del traliccio. Le curve del modello sono discretizzate con un errore di ingombro inferiore a 3 mm rispetto ai valori nominali; ciò non costituisce precisione di rilievo sulle parti stimate.

La sagoma è semiellittica. Il traliccio ha quattro correnti, diagonali e traversi; le barre LED sono segmentate, le teste mobili hanno forcella e lente, i diffusori sono sospesi in moduli. Le lettere GLITZ sono geometrie estruse. Il LED wall rimane separato dietro. Spessori del traliccio, profondità, dimensioni di luci, scritta e diffusori sono ricavati visivamente e non misurati. I piccoli appoggi sono una soluzione di rappresentazione per raccordare il livello confermato con la pianta precedente: la loro forma costruttiva non è confermata.

Premere **Arco** nel prototipo per aprire la vista ravvicinata. `arch.js` contiene parametri e componenti separati, mantenuti anche nel GLB.

## Vegetazione e banconi
Chiome irregolari con ramificazioni, siepi, palme con fronde pennate, vasi e rampicante fiorito sostituiscono gli elementi più schematici. La distribuzione segue le aree leggibili nelle foto e nella pianta; dimensioni e fogliame rimangono rappresentazioni visive.

I banconi sono stati dettagliati con fronte a doghe, piani, elementi di servizio, lavello e bottiglie. Le impronte restano derivate dalla planimetria nominale: Main Bar circa 5,25 × 2,35 m nel modello. Altezza, profondità dei piani e disposizione delle attrezzature non sono misurate e non vengono presentate come dati reali confermati.

## Risultato
40 tavoli, esattamente con i codici della piantina ricevuta:
- RIVA DECK: R1–R16 (16).
- BACK THE STAGE: B0–B15 (16; include B0).
- GLITZ BAR: G1–G8 (8).

La disposizione commerciale della nuova piantina prevale sulle precedenti ipotesi e sulla disposizione visibile nelle fotografie. I cinque nomi provvisori e i vecchi ID sono stati sostituiti. I tavoli esterni sul prato non fanno parte della nuova piantina e non sono più presentati come zona prenotabile.

## Fonti e metodo
La piantina monocromatica determina nomi, numerazione, ordinamento e posizioni relative. La planimetria PDF precedente fornisce sagome architettoniche, scala nominale e quote. La piantina commerciale è schematica, quindi è stata registrata sulle tre aree del modello con trasformazioni locali: non è una nuova fonte di misure certificate. `layout.json` conserva sia le coordinate nella piantina originale sia quelle riportate sulla planimetria.

RIVA DECK riprende DSC09561: divani imbottiti bianchi, schienali alti, cuscini, fascia in legno, telaio e piedini bianchi, pouf rettangolari e tavoli quadrati in legno su gambe bianche. R1–R4 usano un allestimento compatto nella fascia stretta, R5–R16 un divano con pouf.

BACK THE STAGE riprende DSC09576: poltrone morbide color sabbia, volumi arrotondati, schienali inclinati, cuciture e tavolini circolari bianchi con gambe inclinate. Il privé comprende due livelli fisici e conserva un unico nome commerciale.

GLITZ BAR riprende DSC09484 e DSC09501: panche bianche in muratura, cuscini chiari e scuri, tavoli rettangolari in legno con gambe in legno, sedie pieghevoli con telaio incrociato bianco, seduta/schienale in tela e braccioli in legno.

Le immagini IMG_9863–IMG_9866 sono render di riferimento e sono state confrontate con le fotografie. Per le forme degli arredi attuali prevalgono le fotografie DSC. Orientamenti, numero di sedute per tavolo, dimensioni degli arredi e dettagli non misurabili rimangono interpretazioni: non equivalgono a capienze confermate.

## File e utilizzo
- `glitz-interattivo.html`: mappa autonoma WebGL 2, senza CDN. Si può aprire in un browser desktop o servire via HTTPS per app e mobile. L'anteprima File di iOS potrebbe non eseguire il contenuto interattivo.
- Pulsante **Pianta**: mostra la piantina originale, con tutti i 40 codici cliccabili. **Torna al 3D** torna alla ricostruzione.
- `glitz-club.glb`: modello 3D in metri nominali, asse verticale Y, texture del LED wall inclusa. Ogni tavolo mantiene `extras.tableId` e `extras.zoneId`.
- `tavoli.json`: inventario iniziale. Prezzi, posti e disponibilità non configurati.
- `layout.json`: coordinate dei 40 codici e famiglie di arredi.
- `model.js`, `arch.js`, `landscape.js`, `furniture.js`, `app.js`, `optimize.js`: sorgenti modificabili; `template.html` contiene l'interfaccia.
- `glitz-anteprima.png`, `glitz-arco.png`, `glitz-mobile.png`: screenshot effettivi del browser.

Per ricompilare: `npm install`, poi `npm run build`. Per anteprima locale: `npm run preview` (localhost:8080).

## API di integrazione
```js
GlitzMap.selectZone('riva'); // oppure back, glitzbar
GlitzMap.selectTable('R5');
GlitzMap.getTables();
GlitzMap.getSelection();
GlitzMap.reset();
// Esempio di dati da sostituire con quelli ricevuti dal backend:
GlitzMap.setInventory([{id:'R5',status:'available',capacity:8,minSpend:400}]);
window.addEventListener('glitz:table-selected', ({detail}) => console.log(detail));
window.addEventListener('glitz:selection-confirmed', ({detail}) => console.log(detail));
const glb = await GlitzMap.exportGLB();
```
Gli stati supportati sono unconfigured, available, soldout, unavailable. `minSpend` è la spesa minima totale del tavolo in euro. Il prototipo non effettua prenotazioni, pagamenti o blocchi tavoli: salva un riepilogo JSON. Il backend deve verificare disponibilità, capienza, importi e conferme. Per iframe cross-origin serve un bridge con verifica delle origini.

## Limiti
I codici e i nomi non sono più inventati: provengono dalla piantina fornita. Restano da configurare i dati commerciali e da confermare le misure degli arredi. La scena non è un rilievo, un progetto tecnico o una verifica delle vie d'esodo. I test mobili usano emulazione Chromium e non un iPhone fisico/Safari.


## Aggiornamento dalle sette foto del 19 settembre

- Panche del Glitz Bar ricostruite come muratura continua, con tratti longitudinali, due ritorni e L opposta tracciati sulla planimetria A3. Tavoli e sedie rimangono oggetti selezionabili separati. I centri G4, G7, G8 sono raccordati alle panche mantenendo la disposizione relativa e tutti gli ID della piantina.
- Portale dietro lo schermo con angoli superiori curvi, quattro correnti e diagonali; truss longitudinale dal portale al centro dell’arco. Due moduli audio per lato, giunti e barre LED. Posizione dell’arco corretta visivamente sul fronte palco; distanza dagli altri elementi non misurata.
- Bancone mare rettilineo con doghe verticali bianche, piano legno, lanterne e lastre sul prato. Dimensioni in pianta dalla scala nominale; altezza stimata.
- Recinzione scura sul mare, rampicanti, alberi con foglie singole e ramificazioni, cespugli come in pianta, giardino centrale e aiuole. Vegetazione procedurale, non fotogrammetrica.
- Rampa laterale di accesso e raccordo al Glitz Bar: percorso e quote interpretati dalla planimetria, pendenze non rilevate.
- Fabbricati di servizio con rivestimento a tavole, porte e piccoli gradini dalle foto.
- Scritta dello schermo e intestazione ridisegnate con tracciati sottili dalla foto DSC09650. Il file originale del logo/font non è disponibile: il lettering fornito è una ricostruzione, non il marchio vettoriale originale. Sostituire con SVG/AI/PDF originale quando disponibile.

Per confrontare: aprire HTML, scegliere GLITZ BAR oppure il pulsante Arco. Le immagini PNG sono catture del modello effettivo. I dati di prenotazione restano da collegare; nessun prezzo o posto reale è inventato.
