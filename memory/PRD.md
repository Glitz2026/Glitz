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

## Completed
- 2D floorplan interattivo su immagine ufficiale
- Shop Stripe + fallback WhatsApp
- Google Auth (admin: `jalucas@hotmail.it`) + Admin email/password
- `PosterFrame.jsx`, 10 eventi Estate 2027 seeded
- Booking eventi privati + tab admin
- Brand rosso `#E10600`, Cormorant Garamond Light
- **[16 Feb 2026]** Tasto "Accedi" + "AREA ADMIN" nel menu
- **[16 Feb 2026]** Tab **Contenuti** in admin: 11 campi Home
- **[16 Feb 2026]** Dashboard Statistiche: 4 KPI
- **[16 Feb 2026]** Pagina /il-club dinamica (settings.about_* + 5 zones)
- **[16 Feb 2026]** Fix startup patcher backfilla nuovi campi
- **[16 Feb 2026]** Logo ufficiale "GLITZ CLUB" bianco su trasparente + favicon.ico + apple-touch-icon + PWA icons 192/512 generati dal PDF
- **[16 Feb 2026]** Editor "Il Club" completo nel tab Contenuti: hero, 3 stats, 5 ambienti ordinabili (up/down/delete/add) con upload foto per ambiente, location, gallery
- **[16 Feb 2026]** Home: rimossa sezione "Dal Magazine"; aggiunte "Il Club" (anteprima 4 ambienti) e "Shop" (anteprima 3 prodotti)
- **[16 Feb 2026]** Fix mobile Home: freccia scroll centrata (flex full-width) + hero-section min-h 85vh su mobile + events section padding ridotto → gap arrow→events da ~200px a ~23px. Verificato testing agent 100%.

## Pending / In Progress
- **P0** Upload `artist_photo_url` in Admin Events → risolve doppio testo poster
- **P1** 401 rumorosi su route pubbliche (probe /auth/me) — pulire

## Backlog
- **P1** Breakdown `server.py` (>1500 righe)
- **P2** Mobile app / i18n / WhatsApp Business API / Ticketing Stripe interno
- **P2** Version stamp settings + strict validation PUT

## API Endpoints
- `GET /api/settings` — public, home_* + about_*
- `PUT /api/admin/settings` — admin
- `GET /api/admin/stats` — admin KPI
- `POST /api/admin/media` — upload asset

## Admin Test Credentials
Vedi `/app/memory/test_credentials.md`
