# Glitz Club — PRD

## Problema
Sito cinematografico per Glitz Club (glitzclub.it) — open-air 2000 posti a Praia a Mare.
- Frontend React + Backend FastAPI + MongoDB
- Hero Vimeo autoplay muted, countdown Opening 2027, FAQ AI-optimized, blog/magazine
- Piantina interattiva con 40 tavoli (4 zone) + booking → WhatsApp + DB
- Admin JWT (Eventi, Blog, Media, Bookings, Settings)
- Reminder email 3h prima via Resend (cron Emergent)

## Lingua utente
Italiano. Rispondi sempre in italiano.

## Cosa è già stato implementato
- MVP completo (hero, countdown, FAQ, eventi, blog, gallery, mappa, contatti)
- Admin dashboard con JWT + CRUD eventi/blog/settings + upload media
- Piantina 40 tavoli B0-B15 / R1-R16 / G1-G8 in 3 zone (Back the Stage, Riva Deck, Glitz Bar)
- Vista 3D isometrica + reveal cinematografico al primo scroll
- Booking modal → salva DB + WhatsApp deep-link
- Cron Emergent `/api/cron/reminders` ogni 15m → Resend email 3h prima
- Hero Vimeo player con parametri background/autoplay/muted/loop
- **[15 Set 2026] Piantina ristilizzata**: rimosso PNG di sfondo, sostituito con linee SVG pulite dei perimetri privé + arco Glitz + DJ booth (stile Fase 6)

## Backlog / Future
- Mobile app Phase 2 (song request, live photo feed, cashless) — P2
- Localizzazione EN (i18n) — P2
- WhatsApp Business API centralizzata — P2
- Ticketing interno con Stripe — P2

## Info critica
- Cron via `.emergent/crons.yml` (mai APScheduler)
- Auth JWT — credenziali in `/app/memory/test_credentials.md`
- Vimeo pubblico richiesto ("Anywhere" nelle privacy)
