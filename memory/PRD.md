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
- **[16 Set 2026] Piantina pixel-perfect** — usa `/floorplan-official.png` come sfondo con 40 hotspot cliccabili trasparenti nelle posizioni esatte (rilevate via image analysis 1254×1254). Hover mostra tooltip con nome tavolo e zona, tavoli prenotati mostrano X rossa.
- Booking modal → salva DB + WhatsApp deep-link
- Cron Emergent `/api/cron/reminders` → Resend email 3h prima
- Pagina "Il Club" con 5 ambienti
- Shop `/shop` + `/shop/:id` con 6 prodotti + gallery 4 foto + Stripe checkout + WhatsApp fallback + pagine success/cancel
- Gift Card usa logo Glitz nero come immagine

## Backlog / Future
- Admin CRUD prodotti shop — P1
- Upload immagini prodotti da backoffice — P1
- Mobile app Phase 2 — P2
- Localizzazione EN (i18n) — P2

## Info critica
- Cron via `.emergent/crons.yml`
- Auth JWT — credenziali in `/app/memory/test_credentials.md`
- Stripe sandbox: `acct_1UFtZvEu0vFfkg7R`
- Setup catalogo: `python3 /app/backend/setup_stripe.py`
- Piantina background: `/app/frontend/public/floorplan-official.png` (immagine ufficiale utente)
