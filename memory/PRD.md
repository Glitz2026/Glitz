# Glitz Club — PRD

## Original Problem Statement
Premium cinematic web app per Glitz Club, club all'aperto 2000 posti. Include: eventi, blog/magazine, FAQ, admin dashboard, floorplan 2D interattivo, shop Stripe, eventi privati, Google Auth Emergent, poster dinamici, email automatiche Resend. **Lingua: Italiano.**

## Stack
- FE: React CRA + Tailwind + Framer Motion
- BE: FastAPI + MongoDB (Motor)
- Auth: Emergent Google Sign-In + Admin email/password (JWT)
- Payments: Stripe Checkout + Webhook
- Email: Resend (cron)

## Completed
- 2D floorplan interattivo, Shop Stripe, Google + Admin email/password auth
- 10 eventi 2027, Booking eventi privati, `#E10600`, Cormorant
- Menu con "Accedi" + "Area Admin"
- Tab **Contenuti** admin: Home + Il Club + Contatti + **Floorplan (Prezzi & Bottiglie)**
- Dashboard 4 KPI stats
- Pagina /il-club: 5 ambienti + gallery a 3 tab
- Home: no Magazine + preview Club + preview Gallery + preview Shop
- Logo ufficiale + favicon + PWA icons
- **[16 Feb 2026]** Upload foto artista + copertina per evento
- **[16 Feb 2026]** Media tab: filtro + riordino ↑↓ + cambio categoria
- **[16 Feb 2026]** Piantina "Scegli il tuo tavolo" **breakout** al max (-mx-16 xl:-mx-32, max-w-[1600px]). Card zone con prezzi + bottiglie sopra la mappa
- **[16 Feb 2026]** BookingModal mostra prezzo + bottiglie + descrizione della zona
- **[16 Feb 2026]** Admin Contenuti > "Piantina — Prezzi & Bottiglie": editor per zona (label/color/price/min/bottles/desc)

## Pending / In Progress
- **Deploy in produzione** — attesa risposta utente (ask_human aperto)

## Backlog
- **P1** Breakdown `server.py` (>1600 righe)
- **P2** Mobile app / i18n / WhatsApp Business API / Ticketing Stripe interno

## API Endpoints
- `GET /api/settings` — public, home_/about_/contact_/floorplan_ keys
- `PUT /api/admin/settings` — admin, partial update
- `GET /api/media?category=...` — sorted by order asc / created_at desc
- `POST /api/admin/media/reorder` — admin
- `PATCH /api/admin/media/{id}` — admin
- `GET /api/admin/stats` — admin KPI

## Admin Test Credentials
Vedi `/app/memory/test_credentials.md`
