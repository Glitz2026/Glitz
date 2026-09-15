# Glitz Club — PRD

## Problema
Sito cinematografico per Glitz Club (glitzclub.it) — open-air 2000 posti a Praia a Mare.
- Frontend React + Backend FastAPI + MongoDB
- Piantina 40 tavoli (3 zone) + booking → WhatsApp + DB
- Shop merchandise con Stripe checkout + WhatsApp fallback
- Admin JWT
- Reminder email 3h prima via Resend (cron Emergent)

## Lingua utente
Italiano.

## Cosa è già stato implementato
- MVP completo (hero, countdown, FAQ, eventi, blog, gallery, mappa, contatti)
- Admin dashboard con JWT + CRUD eventi/blog/settings + upload media
- Piantina 2D con perimetri PDF ufficiali + tavoli simmetrici (Back the Stage 4×4, Glitz Bar 2×4, Riva Deck 4×4)
- Booking modal → salva DB + WhatsApp deep-link
- Cron Emergent `/api/cron/reminders` → Resend email 3h prima
- Pagina "Il Club" con 5 ambienti
- **[15 Set 2026] Shop merchandise `/shop` + `/shop/:id`**:
  - 6 prodotti (Beach Towel €45, Ventaglio €15, Lip Balm €12, T-Shirt Vibes Only €55 taglie XS-XXL, Beach Bag €65, Gift Card €50)
  - Pagine prodotto singole con gallery 4 foto ciascuna
  - **Stripe checkout** con sandbox Emergent (`acct_1UFtZvEu0vFfkg7R`)
  - Tax mode: "calc_only" (Stripe Tax attivo, calcolo automatico)
  - Backend: `POST /api/payments/checkout`, `GET /api/payments/status/{id}`, webhook `/api/stripe/webhook`
  - Pagine `/payment/success` con polling + `/payment/cancel`
  - Fallback WhatsApp precompilato

## Backlog / Future
- Admin CRUD prodotti shop (ora hardcoded in Shop.jsx) — P1
- Upload immagini prodotti da backoffice — P1
- Mobile app Phase 2 — P2
- Localizzazione EN (i18n) — P2
- WhatsApp Business API centralizzata — P2

## Info critica
- Cron via `.emergent/crons.yml`
- Auth JWT — credenziali in `/app/memory/test_credentials.md`
- Stripe sandbox: `acct_1UFtZvEu0vFfkg7R` (claim tramite Dashboard → onboarding link)
- Setup catalogo: `python3 /app/backend/setup_stripe.py` (idempotente)
- Test card: 4242 4242 4242 4242, qualsiasi CVC/scadenza futura
