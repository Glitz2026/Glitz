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
- **[16 Feb 2026]** Dashboard Statistiche: 4 KPI (ricavi, prenotazioni, eventi privati, prossimo evento)
- **[16 Feb 2026]** Pagina **/il-club** ora dinamica: legge da settings tutti i testi (hero, stats, zones, location, gallery) con fallback ai default. Backend `SettingsIn` esteso con 16+ campi `about_*` incluso `about_zones` (lista 5 ambienti).
- **[16 Feb 2026]** Fix startup patcher: backfilla automaticamente qualsiasi nuovo campo `home_*`/`about_*` mancante nel doc settings → risolto bug segnalato dall'utente ("logo sparito", "backend non funziona"). Verifica 100% testing agent: logo file 200 OK, admin event CRUD funzionante, /il-club renderizza 5 zone.

## Pending / In Progress
- **P0** UI editor "Il Club" nel tab Contenuti dell'admin: campi testo + editor ordinabile dei 5 ambienti (backend e frontend pubblico già pronti; manca solo l'admin UI)
- **P0** Upload `artist_photo_url` in Admin Events → risolve doppio testo poster
- **P1 [Refactor]** Breakdown `server.py` (>1500 righe) in routes/models modulari

## Backlog
- **P2** Mobile app (DJ requests, live feed, cashless)
- **P2** i18n Inglese
- **P2** WhatsApp Business API ufficiale
- **P2** Ticketing interno via Stripe
- **P2** Version stamp su settings doc + validation stricta su PUT (raccomandazione testing agent)

## Known Issues
- Doppio testo sui poster eventi (blocked su upload `artist_photo_url`)
- Il file logo caricato appare come un quadrato quasi bianco su sfondo scuro: verificare visivamente se il PNG uploadato è il logo giusto o solo un placeholder

## API Endpoints
- `GET /api/settings` — public, include `home_*` e `about_*` keys
- `PUT /api/admin/settings` — admin, salva tutte le settings + copy Home/About
- `GET /api/admin/stats` — admin KPI dashboard

## Admin Test Credentials
Vedi `/app/memory/test_credentials.md`
