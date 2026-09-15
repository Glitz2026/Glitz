# Glitz Club — PRD

## Problema
Sito cinematografico per Glitz Club (glitzclub.it) — open-air 2000 posti a Praia a Mare.
- Frontend React + Backend FastAPI + MongoDB
- Hero Vimeo autoplay muted, countdown Opening 2027, FAQ AI-optimized, blog/magazine
- Piantina interattiva con 40 tavoli (3 zone) + booking → WhatsApp + DB
- Shop merchandise con checkout WhatsApp
- Admin JWT (Eventi, Blog, Media, Bookings, Settings)
- Reminder email 3h prima via Resend (cron Emergent)

## Lingua utente
Italiano. Rispondi sempre in italiano.

## Cosa è già stato implementato
- MVP completo (hero, countdown, FAQ, eventi, blog, gallery, mappa, contatti)
- Admin dashboard con JWT + CRUD eventi/blog/settings + upload media
- Piantina 40 tavoli B0-B15 / R1-R16 / G1-G8 in 3 zone (Back the Stage, Riva Deck, Glitz Bar)
- **[15 Set 2026] Piantina 2D schema pulito**: perimetri ricalcati sui PDF ufficiali + tavoli disposti simmetricamente (Back the Stage 4×4 sopra/sotto palco, Glitz Bar 2×4, Riva Deck 4×4)
- Booking modal → salva DB + WhatsApp deep-link
- Cron Emergent `/api/cron/reminders` ogni 15m → Resend email 3h prima
- Hero Vimeo player con parametri background/autoplay/muted/loop
- Pagina "Il Club" con 5 ambienti (Back the Stage, Arco Iconico, Terrazza Tavoli, Sea View, Pool & Chill)
- **[15 Set 2026] Shop merchandise `/shop`**: 5 prodotti (Beach Towel €45, Ventaglio €15, Lip Balm €12, T-Shirt Vibes Only €55 con taglie XS-XXL, Beach Bag €65). Grid responsive, modal dettaglio con qty/taglia/spedizione o ritiro, checkout via WhatsApp precompilato. Link "Shop" in nav.

## Backlog / Future
- Mobile app Phase 2 (song request, live photo feed, cashless) — P2
- Localizzazione EN (i18n) — P2
- WhatsApp Business API centralizzata — P2
- Ticketing interno con Stripe — P2
- Shop admin CRUD + upload immagini prodotti — P2
- Shop pagamento diretto (Stripe) invece di WhatsApp — P2

## Info critica
- Cron via `.emergent/crons.yml` (mai APScheduler)
- Auth JWT — credenziali in `/app/memory/test_credentials.md`
- Vimeo pubblico richiesto ("Anywhere" nelle privacy)
- Prodotti shop: hardcoded in `/app/frontend/src/pages/Shop.jsx` per ora (no backend CRUD ancora)
