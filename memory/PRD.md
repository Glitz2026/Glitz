# Glitz Club — PRD

## Original Problem Statement
Premium cinematic web app per Glitz Club (glitzclub.it), club all'aperto 2000 posti. Include: eventi, blog/magazine, FAQ, admin dashboard, floorplan interattivo 2D per prenotazione tavoli, e-commerce Stripe, eventi privati, Google Auth Emergent, poster dinamici, email automatiche Resend.

**Lingua**: Italiano.

## Stack
- FE: React CRA + Tailwind + Framer Motion
- BE: FastAPI + MongoDB (Motor)
- Auth: Emergent-managed Google Sign-In (JWT cookie) + Admin email/password (JWT localStorage)
- Payments: Stripe Checkout + Webhook
- Email: Resend (cron reminders)

## Completed
- 2D floorplan interattivo su immagine ufficiale invertita
- Shop Stripe + fallback WhatsApp
- Google Auth Emergent (admin auto-promoted: `jalucas@hotmail.it`)
- Admin email/password (seed automatico allo startup dal .env)
- Componente `PosterFrame.jsx`
- 10 eventi Estate 2027 seeded
- Booking eventi privati + tab admin
- Brand color rosso `#E10600`, Cormorant Garamond Light
- About page: ordine ambienti + foto corrette
- **[16 Feb 2026]** Tasto "Accedi" spostato dentro il menu (sezione separata con divisore) su desktop e mobile. Utente loggato: nome + Esci
- **[16 Feb 2026]** Rimosso `overline-tag` dall'hero Home
- **[16 Feb 2026]** Link visibile "AREA ADMIN" nel menu + scorciatoia "Dashboard Admin" se Google user è admin. Rimosso link ridondante footer. Testato 100%.
- **[16 Feb 2026]** Tab **"Contenuti"** in admin: 11 campi editabili per titoli/slogan Homepage (hero, eventi, location, FAQ). Backend `SettingsIn` esteso con `home_*`. Home.jsx legge da `/api/settings` con fallback. Testato 100%.
- **[16 Feb 2026]** **Dashboard Statistiche**: 4 KPI in alto al pannello admin — Ricavi totali/settimana (aggregati da Stripe payment_transactions), Prenotazioni settimana + pending, Eventi privati nuovi/totali, Prossimo evento con ospiti attesi e tavoli riservati. Nuovo endpoint `GET /api/admin/stats`. Testato 100%.

## Pending / Backlog
- **P0 [In progress]** Upload `artist_photo_url` in Admin Events → risolve doppio testo poster
- **P0 [Refactor]** Breakdown `server.py` (>1400 righe ora) in routes/models modulari
- **P2** Mobile app (DJ requests, live feed, cashless)
- **P2** i18n Inglese
- **P2** WhatsApp Business API ufficiale
- **P2** Ticketing interno via Stripe

## Known Issues
- Doppio testo sui poster eventi (blocked su upload `artist_photo_url`)

## API Endpoints (aggiornati)
- `GET /api/settings` — public, ora include `home_*` keys
- `PUT /api/admin/settings` — admin, salva tutte le settings + copy Home
- `GET /api/admin/stats` — admin, KPI dashboard

## Admin Test Credentials
Vedi `/app/memory/test_credentials.md`
