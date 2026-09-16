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
- **[16 Feb 2026]** Aggiunto link visibile **"AREA ADMIN"** nel menu (desktop nav + mobile hamburger) accanto ad Accedi → risolve la non-scopribilità del pannello. Se l'utente Google è admin (`is_admin`), il menu mostra scorciatoia "Dashboard Admin". Rimosso link ridondante "Area Riservata" dal footer. Testato al 100% dal testing agent (backend+frontend).

## Pending / Backlog
- **P0 [In progress]** Upload `artist_photo_url` in Admin Events → risolve doppio testo poster
- **P0 [Refactor]** Breakdown `server.py` (>1200 righe) in routes/models modulari
- **P2** Mobile app (DJ requests, live feed, cashless)
- **P2** i18n Inglese
- **P2** WhatsApp Business API ufficiale
- **P2** Ticketing interno via Stripe

## Known Issues
- Doppio testo sui poster eventi (blocked su upload `artist_photo_url`)

## Admin Test Credentials
Vedi `/app/memory/test_credentials.md`
