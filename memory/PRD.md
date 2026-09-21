# Glitz Club — PRD

## Original Problem Statement
Premium cinematic web app per Glitz Club, club all'aperto 2000 posti. **Lingua: Italiano.**

## Stack
- FE: React CRA + Tailwind + Framer Motion
- BE: FastAPI + MongoDB (Motor)
- Auth: Emergent Google + Admin email/password (JWT)
- Payments: Stripe Checkout + Webhook
- Email: Resend (cron)

## Completed (recap)
- Floorplan 2D interattivo + Shop Stripe + Google/Admin auth + 10 eventi 2027
- Booking eventi privati, brand `#E10600`, Cormorant Garamond Light
- Menu con Accedi + Area Admin
- Tab **Contenuti** admin: Home + Il Club (5 ambienti ordinabili+add) + Contatti + **Floorplan (Prezzi & Bottiglie + preview live + save-zone + prezzi per tavolo Riva)**
- Dashboard 4 KPI stats
- /il-club: 5 ambienti + gallery a 3 tab
- Home: preview Club + preview Gallery + preview Shop
- Logo ufficiale + favicon + PWA icons
- Upload foto artista + copertina per evento
- Media tab: filtro + riordino ↑↓ + cambio categoria
- Piantina "Scegli il tuo tavolo" **breakout** max-w-[1600px]
- BookingModal con prezzo + bottiglie + descrizione zona
- **[16 Feb 2026]** Logo v3 ricaricato HQ (1600×756, bianco su trasparente)
- **[16 Feb 2026]** Footer: TikTok cliccabile come icona (senza username), Instagram solo icona, spacing logo↔newsletter aumentato
- **[16 Feb 2026]** Contatti: titolo centrato + grid max-w-5xl centrato
- **[16 Feb 2026]** Admin Contenuti > Floorplan: **preview live** (mini SVG con box zone colorati che si aggiornano al volo), **tasto "Salva zona"** per ogni riga (STAGE/RIVA/BAR), **prezzi per singolo tavolo Riva Deck** (16 tavoli con price+bottles override)
- **[16 Feb 2026]** Backend: `floorplan_table_overrides: dict` in SettingsIn
- **[16 Feb 2026]** Floorplan.jsx: usa override quando presente, altrimenti prezzo di zona
- **[16 Feb 2026]** Mobile: tasto rosso "VEDI A SCHERMO INTERO" (lg:hidden) apre overlay fullscreen con SVG a 150vw (scroll orizzontale) e hitbox tavolo ingrandita. Testing 100%.
- **[17 Feb 2026]** Floorplan: 3 card privé (STAGE/RIVA/BAR) rese cliccabili → evidenziano i tavoli della zona con colore. Rimosse scritte originali della PNG (BACK THE STAGE, RIVA DECK, GLITZ BAR) via rect di copertura #0a0a0a tra B8-B15, R10-R11, G4-G8. Aggiunti label SVG cliccabili (ZONE_ANCHORS con coord estratte via connected-components) che replicano il toggle della card. Funziona anche in fullscreen mobile.
- **[17 Feb 2026]** Floorplan v2: contorno tavoli ridotto a `LABEL_W×LABEL_H` (46×42) coincidente col quadratino della PNG; rimosso il fill colorato → solo bordo + overlay `<text>` colorato che "illumina" numero/lettera del tavolo. Hit-box invisibile 54×40 (52×58 fullscreen) mantenuta per tap facile. Stesso comportamento in fullscreen.
- **[17 Feb 2026]** Home hero: bottone "Prenota Tavolo" → ora è un `<Link>` che punta a `/eventi/{upcoming.id}#floorplan`. EventDetail.jsx legge `location.hash` e scrolla automaticamente alla sezione Floorplan con `scrollIntoView`. Fallback: se non c'è upcoming, apre BookingModal come prima.
- **[17 Feb 2026]** Events page: H1 "Eventi & Serate" → "EVENTI 2027". Rimosso toggle Vista AI/Template + state `useTemplate` + import `PosterFrame` non più usato.
- **[17 Feb 2026]** Admin Contenuti: aggiunta sticky sub-nav a pillole con 10 bottoni (Home, Il Club, Contatti, Piantina, Menu, Footer, Shop, Eventi Privati, Titoli sezioni, Poster & SEO) che scrollano direttamente alla sezione corrispondente. `scroll-mt-28` per evitare che l'header sticky copra il target. Tutte le `<details>` aprono di default. Il tab menu principale resta compatto (10 tab).
- **[17 Feb 2026]** Piantina per Evento: campo `floorplan_image_url` aggiunto a `EventIn`. `Floorplan.jsx` accetta prop `customImageUrl` che sovrascrive la PNG di default quando presente. `EventDetail.jsx` passa `ev.floorplan_image_url`. Admin: upload/URL di piantina custom visibile solo quando la piantina interattiva è attiva.
- **[17 Feb 2026]** Anteprima Live Contenuti: componente riutilizzabile `SectionPreview` (con badge verde pulsante "Anteprima live" + link "Apri pagina") inserito in ogni sezione del tab Contenuti (Menu = navbar reale, Footer, Shop, Eventi Privati con chip aree, Titoli sezioni con 4 preview parallele, Poster + SEO SERP-like). Aggiornamento in real-time mentre si digita, prima del salvataggio.
- **[17 Feb 2026]** Floorplan v8 (drag & drop tavoli + label):
  - Aggiunto `previewSvgRef` + helper `clientToSvg()` che converte coordinate del puntatore in coord SVG via `getScreenCTM().inverse()`
  - State `dragTarget: { type: "table"|"label", id }` centralizzato
  - Handler `onPointerDown` su ogni `<g>` di tavolo/label con `setPointerCapture(pointerId)` per drag continuo
  - `onPointerMove` sull'SVG: se sto trascinando un tavolo → aggiorna `settings.floorplan_tables[i].x/y`; se sto trascinando una label → sposta `label_x/y` E applica lo stesso delta a `cover_x/y` per mantenere il testo centrato nel rettangolo
  - Feedback visuale: durante il drag, contorno tavolo/label diventa spesso 4px e riempie di colore semitrasparente
  - Se `floorplan_tables` è vuoto e l'utente trascina un tavolo default, la lista viene popolata automaticamente
  - BACK THE STAGE ricentrato in modo definitivo — cover_x=85 cover_y=660 cover_w=210 cover_h=40 label_x=190 label_y=686 font_size=18 → label posizionata sopra B11 senza sovrapposizioni con nessun tavolo circostante (B8/B9/B10/B11/B15)
  - Preview Live SVG nel Admin → Contenuti → Piantina: rende la floorplan-official.png completa con tutti i 40 tavoli e le 3+ label pulsante che seguono le coordinate correnti (settings) in real-time. Aggiunto `xmlns` esplicito su `<svg>` e `<image>` con `xlinkHref` per compatibilità cross-browser. Aspect ratio 1:1 forzato.
  - Animazione contorno invertita: quando una zona è attiva, i tavoli hanno stroke normale (2px). SOLO il tavolo cliccato entra in `isPulsing` → stroke raddoppia (5px) + `<animate>` che raddoppia le dimensioni per 380ms
  - Ricentrata `BACK THE STAGE`: label_x=202 (centro tra B8-B10-B11-B15), cover_w=275 per non tagliare il testo
  - Nuovo formato anchor: `cover_x/y/w/h + label_x/y + font_size` (flat) al posto di annidati
  - Backend: `SettingsIn` estesa con `floorplan_anchors` (dict), `floorplan_tables` (list), `floorplan_extra_zones` (list)
  - Floorplan.jsx: legge questi settings con fallback ai default, supporta un numero arbitrario di zone e tavoli extra
  - Admin: nuovo blocco "Etichette privé & Tavoli" nel tab Contenuti → Piantina, con editor coordinate label (per ogni zona), aggiungi zona extra (id/label/color), lista tavoli editabile (importa default → sposta x/y/zona → aggiungi/rimuovi). Salvataggio dedicato via bottone "Salva".
  - Rimosso il polygon glow esterno delle zone: quando una zona è attiva, si illuminano SOLO i contorni dei tavoli (`strokeWidth` raddoppiato: 2 → 5 desktop, 3 → 6 fullscreen) così restano ben visibili
  - Rimossa `strokeDasharray` dai label privé: contorno ora continuo sia in stato attivo che passivo
  - Etichette ricentrate: `BACK THE STAGE` a x=175 (tra wall e B11), `RIVA DECK` a x=924 (tra R10 e R11), `GLITZ BAR` a (278, 967) (tra G4 e G8)
  - Rimossa illuminazione del testo tavoli — solo contorno colorato al quadratino
  - Nuova illuminazione ZONA attiva: cornice pulsante intorno all'intera area della zona (`ZONE_AREAS` con bounding box per STAGE/RIVA/BAR) usando SVG `<animate>` per stroke-width + opacity + dashoffset
  - Animazione pulse su click tavolo: `pulseId` state + `<animate>` che raddoppia dimensioni e stroke per 380ms prima di aprire il modale. Stesso comportamento in fullscreen.
- **[17 Feb 2026]** Admin Prodotti: aggiunto upload diretto dell'immagine principale + gallery (multi-file) con thumbnail preview + rimozione singola foto. Usa endpoint `/admin/media` con categoria `products`. URL manuale rimane come fallback.
  - Backend: `SettingsIn` esteso con 41 nuovi campi (nav_items, footer_*, shop_*, private_*, blog_/gallery_/past_/events_titles, poster_*, seo_*). Aggiunto model `Product` con endpoints `GET /api/products`, `GET /api/products/{slug}`, `POST|PUT|DELETE /api/admin/products/*` + seed di 6 prodotti iniziali. Aggiunto `GET /api/admin/newsletter/subscribers` per viewer iscritti. Startup patcher esteso con tutti i nuovi prefissi.
  - Frontend consumers: `Layout` legge nav_items+footer da settings, `Shop` fetch da API+usa shop_*, `ProductDetail` fetch `/products/{slug}` (rimosso import PRODUCTS statico), `PrivateEvents` usa private_areas/occasions/why_us/testi, `Blog/Gallery/PastEvents/Events` usano rispettivi kicker/title/description da settings. `Home.jsx` fetch prodotti API per anteprima.
  - Admin: 2 nuovi tab `Prodotti` (CRUD completo con modal edit) e `Newsletter` (tabella iscritti + export CSV). Contenuti tab: 6 nuovi accordion (Menu di navigazione con rename/hide/riordino, Footer, Pagina Shop, Pagina Eventi Privati con lista aree/occasions/why_us editabile, Titoli sezioni, Poster & SEO).

- **[Feb 2026]** Admin Floorplan Editor: **Snap-to-Grid** con toggle on/off e size selezionabile (5/10/20/25/50 px). Overlay griglia verde visibile in preview, snap applicato durante drag di tavoli ed etichette. `clientToSvg` applica arrotondamento a multipli di `gridSize`.
- **[Feb 2026]** Nuovo componente `EventsGalleryStrip.jsx` (8 foto categoria `gallery`) montato in fondo a `/eventi` e `/eventi/passati`. Backend `SettingsIn` esteso con `events_gallery_{kicker,title,description}` e `past_gallery_{kicker,title,description}`. Admin Contenuti > Titoli sezioni: 2 blocchi editabili "Gallery strip Eventi Prossimi/Passati".
- **[Feb 2026]** Home: **anteprima Ambienti ridotta da 4 a 2** (grid `md:grid-cols-2`, testo "Due Ambienti / Una Sola Notte"). **Anteprima Shop ridotta da 3 a 1 prodotto** con card centrata (`max-w-md mx-auto`).
- **[Feb 2026]** Admin > Contenuti > Home: sezione **"Titolo Hero — BEYOND / THE NIGHT"** rinominata con label esplicite (Riga 1 bianca / Riga 2 rossa lava) per rendere trovabile la modifica del testo hero.
- **[Feb 2026]** **Aggiornamento Piantina 3D v13** dal repo GitHub `glitz/main` (commit `a97a96b`). Nuove zone **SEAVIEW** (SV1-11) e **PRATO_BACK** (PB1-10) aggiunte a `DEFAULT_ZONES` in `Floorplan.jsx`, importate `LAWN_TABLES` da `floorplanBridge.js` (21 tavoli extra prato). Zone cards estese da 3 a 5. Modello 3D rigenerato: DJ booth allineato all'arco, 4 CDJ-3000X, salottini panoramici SV, prato v13, albero spostato dietro PB7, R16 rimosso dal Riva Deck. HTML viewer aggiornato (1.6MB, cache-busted `?v=14`).

## Pending
- **Deploy in produzione** — utente ancora indeciso (ask_human aperto)
- **Wait-list Tavoli** (P1) — mai implementato
- **Split server.py** (P0 refactoring) — >1900 righe

## Backlog
- **P1** Breakdown `server.py` (>1600 righe)
- **P2** Mobile app / i18n / WhatsApp Business API / Ticketing interno

## API Endpoints
- `GET /api/settings` — public
- `PUT /api/admin/settings` — admin, partial update
- `GET /api/admin/stats` — admin KPI
- `POST /api/admin/media` / `POST /api/admin/media/reorder` / `PATCH /api/admin/media/{id}` — admin

## Admin Test Credentials
Vedi `/app/memory/test_credentials.md`
