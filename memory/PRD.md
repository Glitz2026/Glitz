# Glitz Club — PRD

## Original Problem Statement
Premium cinematic web app per Glitz Club, club all'aperto 2000 posti. Include: eventi, blog/magazine, FAQ, admin dashboard, floorplan 2D, shop Stripe, eventi privati, Google Auth Emergent, poster dinamici, email automatiche Resend. **Lingua: Italiano.**

## Stack
- FE: React CRA + Tailwind + Framer Motion
- BE: FastAPI + MongoDB (Motor)
- Auth: Emergent Google Sign-In + Admin email/password (JWT)
- Payments: Stripe Checkout + Webhook
- Email: Resend (cron)

## Completed (recap)
- Floorplan 2D interattivo, Shop Stripe, Google Auth + Admin email/password
- 10 eventi 2027, Booking eventi privati, brand `#E10600`, Cormorant
- Menu con "Accedi" + "Area Admin"
- Tab **Contenuti** admin: editor Home + Il Club (5 ambienti ordinabili+add) + Contatti
- Dashboard 4 KPI stats
- Pagina /il-club: 5 ambienti + gallery a **3 tab a pillola** (Eventi/Location/Dettagli)
- Logo ufficiale + favicon + apple-touch + PWA icons
- Home ristrutturata: rimossa Magazine + preview Club + preview Shop
- Fix mobile Home: freccia centrata + gap ridotto
- **[16 Feb 2026]** Home: anteprima gallery (4 foto della prima sottosezione con CTA "Scopri il Club")
- **[16 Feb 2026]** Backend PUT /api/admin/settings → **partial update** (`$set` solo dei campi inviati). Previene wipe accidentale di zones/gallery_groups quando l'admin salva la Contenuti tab
- **[16 Feb 2026]** Media collection reseeded: 13 gallery-eventi + 4 gallery-location + 3 gallery-dettagli
- **[16 Feb 2026]** Zone editor già presente da precedenti iterazioni: add-zone-btn / up-down-del / upload foto per ambiente / textarea highlights

## Pending / In Progress
- **P0** Upload `artist_photo_url` in Admin Events → doppio testo poster
- **P1** 401 console noise su route pubbliche

## Backlog
- **P1** Breakdown `server.py` (>1500 righe)
- **P2** Mobile app / i18n / WhatsApp Business API / Ticketing Stripe interno

## API Endpoints
- `GET /api/settings` — public, home_/about_/contact_ keys
- `GET /api/media?category=...` — filter per categoria
- `PUT /api/admin/settings` — admin, **partial update**
- `GET /api/admin/stats` — admin KPI
- `POST /api/admin/media` — upload asset

## Admin Test Credentials
Vedi `/app/memory/test_credentials.md`
