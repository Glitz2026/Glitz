# Glitz Club — PRD

## Original Problem Statement
Premium cinematic web app per Glitz Club (glitzclub.it), club all'aperto 2000 posti. Include: eventi, blog/magazine, FAQ, admin dashboard, floorplan interattivo 2D, e-commerce Stripe, eventi privati, Google Auth Emergent, poster dinamici, email automatiche Resend.

**Lingua**: Italiano.

## Stack
- FE: React CRA + Tailwind + Framer Motion
- BE: FastAPI + MongoDB (Motor)
- Auth: Emergent Google Sign-In + Admin email/password (JWT)
- Payments: Stripe Checkout + Webhook
- Email: Resend (cron)

## Completed (recap)
- 2D floorplan interattivo, Shop Stripe, Google Auth + Admin email/password
- `PosterFrame.jsx`, 10 eventi 2027, Booking eventi privati, `#E10600`, Cormorant
- Menu con "Accedi" + "Area Admin"
- Tab **Contenuti** admin: Home + Il Club + Contatti (editabili)
- Dashboard 4 KPI stats
- Pagina /il-club dinamica con 5 ambienti ordinabili
- Fix startup patcher backfilla campi settings
- Logo ufficiale + favicon + apple-touch-icon + PWA icons
- Home ristrutturata: no Magazine, aggiunto Club preview + Shop preview
- Fix mobile Home: freccia centrata + gap ridotto
- Contact editor con orari + mappa Google editabile
- **[16 Feb 2026]** Gallery /il-club convertita in **3 tab a pillola sulla stessa riga** (Eventi & Pubblico, Location, Dettagli). Cliccando la tab cambia il grid sottostante con transizione smooth. 19 foto redistribuite: eventi=12, location=4, dettagli=3, i logo spostati in `assets`. Testing 100%.
- **[16 Feb 2026]** Rimosso paragrafo marketing dal footer (Layout.jsx)

## Pending / In Progress
- **P0** Upload `artist_photo_url` in Admin Events → risolve doppio testo poster
- **P1** 401 console noise su route pubbliche (~18 chiamate)

## Backlog
- **P1** Breakdown `server.py` (>1500 righe)
- **P2** Mobile app / i18n / WhatsApp Business API / Ticketing Stripe interno

## API Endpoints
- `GET /api/settings` — public, include home_/about_/contact_ keys
- `GET /api/media?category=...` — filter media by category slug
- `PUT /api/admin/settings` — admin
- `GET /api/admin/stats` — admin KPI
- `POST /api/admin/media` — upload asset

## Admin Test Credentials
Vedi `/app/memory/test_credentials.md`
