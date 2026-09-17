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

## Pending
- **Deploy in produzione** — utente ancora indeciso (ask_human aperto)

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
