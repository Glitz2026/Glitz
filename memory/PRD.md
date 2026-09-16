# Glitz Club — PRD

## Original Problem Statement
Premium cinematic web app per Glitz Club (glitzclub.it), club all'aperto 2000 posti. Include: eventi, blog/magazine, FAQ, admin dashboard, floorplan interattivo 2D per prenotazione tavoli, e-commerce Stripe, eventi privati, Google Auth Emergent, poster dinamici, email automatiche Resend.

**Lingua**: Italiano.

## Stack
- FE: React CRA + Tailwind + Framer Motion
- BE: FastAPI + MongoDB (Motor)
- Auth: Emergent-managed Google Sign-In (JWT cookie) + Admin email/password
- Payments: Stripe Checkout + Webhook
- Email: Resend (cron reminders)

## Completed
- 2D floorplan interattivo su immagine ufficiale invertita
- Shop Stripe + fallback WhatsApp
- Google Auth Emergent (admin auto-promoted: `jalucas@hotmail.it`)
- Admin email/password (seed automatico allo startup dal .env)
- `PosterFrame.jsx` dinamico
- 10 eventi Estate 2027 seeded
- Booking eventi privati + tab admin
- Brand rosso `#E10600`, Cormorant Garamond Light
- **[16 Feb 2026]** Tasto "Accedi" spostato dentro il menu; link "AREA ADMIN" visibile
- **[16 Feb 2026]** Rimosso `overline-tag` dall'hero Home
- **[16 Feb 2026]** Tab **Contenuti** in admin: 11 campi editabili per Home
- **[16 Feb 2026]** Dashboard Statistiche: 4 KPI
- **[16 Feb 2026]** Pagina **/il-club** dinamica: settings.about_* + about_zones (5 ambienti)
- **[16 Feb 2026]** Fix startup patcher backfilla nuovi campi settings → risolto bug "logo sparito / backend rotto"
- **[16 Feb 2026]** Logo ufficiale "GLITZ CLUB" (PDF fornito dall'utente) convertito in PNG trasparente 1200x567 e impostato come logo_url + logo_dark_url

## Pending / In Progress
- **P0** UI editor "Il Club" nel tab Contenuti dell'admin
- **P0** Upload `artist_photo_url` in Admin Events → risolve doppio testo poster
- **P1 [Refactor]** Breakdown `server.py` (>1500 righe)

## Backlog
- **P2** Mobile app / i18n / WhatsApp Business API / Ticketing interno Stripe
- **P2** Version stamp su settings + validation stricta su PUT

## API Endpoints
- `GET /api/settings` — public, include `home_*` e `about_*`
- `PUT /api/admin/settings` — admin
- `GET /api/admin/stats` — admin KPI
- `POST /api/admin/media` — upload asset (multipart)

## Admin Test Credentials
Vedi `/app/memory/test_credentials.md`
