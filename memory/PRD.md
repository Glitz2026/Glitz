# Glitz Club — PRD

## Problema
Sito cinematografico per Glitz Club (glitzclub.it) — open-air 2000 posti a Praia a Mare.

## Lingua utente
Italiano.

## Cosa è già stato implementato
- MVP completo (hero, countdown, FAQ, eventi, blog, gallery, mappa, contatti)
- Admin dashboard con JWT + CRUD eventi/blog/settings + upload media
- Piantina pixel-perfect (immagine invertita bianco su nero, 40 hotspot cliccabili)
- Booking modal → salva DB + WhatsApp deep-link
- Cron Emergent `/api/cron/reminders` → Resend email 3h prima
- Pagina "Il Club" con 5 ambienti
- Shop `/shop` + `/shop/:id` con 6 prodotti + gallery + Stripe checkout + WhatsApp fallback
- **[16 Set 2026] Programmazione 2027 completa** — 10 eventi con locandine AI Nano Banana:
  - Silhouette artisti + arco Glitz reale (estratto da `refs/arch_ref.jpg`)
  - 26 Giu: DAMANTE (Opening) · 3 Lug: GIADA BRINCE · 10 Lug: RAUL DUMITRAS · 17 Lug: **A.I. — Attenzione Instabile** · 24 Lug: MAMACITA · 6 Ago: LUDWIG · 14 Ago (Ferragosto): PAGANTE · 21 Ago: **BOB SINCLAR** (internazionale) · 27 Ago: GUÈ (concerto) · 28 Ago: MAMACITA CLOSING
  - Ogni evento ha lineup, descrizione dettagliata IT, ticket TicketSMS, piantina attivata

## Backlog / Future
- Admin CRUD prodotti shop — P1
- Countdown Opening DAMANTE (26 Giu 2027) in homepage — P1
- Prezzi Tavoli nel tooltip piantina — P2
- Localizzazione EN (i18n) — P2

## Info critica
- Cron via `.emergent/crons.yml`
- Auth JWT — credenziali in `/app/memory/test_credentials.md`
- Stripe sandbox: `acct_1UFtZvEu0vFfkg7R`
- Poster generation: `python3 /app/backend/generate_posters.py` (usa Nano Banana + `refs/arch_ref.jpg`)
- Seed eventi: `python3 /app/backend/seed_events_2027.py` (idempotente: cancella tutti e reinserisce)
- Locandine salvate in `/app/frontend/public/events/{slug}.png`
