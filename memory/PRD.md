# Glitz Club — PRD

## Problem Statement (original, IT)
Sito vetrina premium per Glitz, club all'aperto da 2000 posti a San Nicola Arcella (CS). Dominio glitzclub.it. Direzione cinematografica ispirata a Pacha / Ushuaïa / Hï Ibiza / UNVRS. Web app (mobile app rimandata).

## Stack & Integrazioni
- Frontend: React (CRA) + JS, TailwindCSS, Framer Motion, react-router, sonner (toast), Radix/shadcn
- Backend: FastAPI + Motor (MongoDB async), JWT (pyjwt) + bcrypt
- DB: MongoDB (collections: admins, events, posts, faqs, media, newsletter)
- Storage: Emergent Object Storage (INTEGRATION_PROXY_URL)
- Email: Emergent Resend (managed) per newsletter di benvenuto
- Auth: JWT custom, unico admin (jalucas@hotmail.it)

## User Personas
- Utente pubblico: cerca eventi, biglietti, prenota tavolo via WhatsApp
- VIP / gruppi: prenota tavolo via WhatsApp
- Motori AI (ChatGPT / Perplexity): indicizzano via FAQ + schema.org
- Staff admin: gestisce eventi, blog, FAQ, media da dashboard

## Core Requirements (statici)
1. Homepage cinematografica con hero, prossimo evento + countdown, FAQ accordion
2. Pagina Eventi + dettaglio con countdown, TicketSms CTA, WhatsApp CTA
3. Blog (lista + dettaglio, markdown minimale)
4. Gallery masonry con lightbox
5. About / Il Club
6. Contatti (mappa, WhatsApp, email, social)
7. Newsletter footer (Resend managed)
8. Dashboard admin (JWT) — CRUD eventi, blog, FAQ, upload media
9. Schema.org: NightClub, FAQPage, Event, Article

## Implemented (Fase 1 — 14 Feb 2026)
- ✅ Backend completo: auth JWT, seed automatico (admin+10 FAQ+3 eventi+3 post+9 media), CRUD admin protetto, upload media su Emergent Object Storage, newsletter con email di benvenuto
- ✅ Frontend: routing 10+ pagine, Home cinematografica con hero+countdown+FAQ+eventi+blog, Events list+detail con countdown live, Blog list+detail con markdown, Gallery masonry+lightbox, About, Contatti con mappa Google embed, footer newsletter, AdminLogin, AdminDashboard con 4 tab (Eventi/Blog/FAQ/Media) e CRUD completo
- ✅ Design cinematico: palette obsidian/lava/sunset, font Outfit + Plus Jakarta Sans, laser sweep animation, glass-morphism, grain overlay
- ✅ SEO: schema.org NightClub, FAQPage, Event, Article; meta description dinamica per pagina
- ✅ i18n: solo italiano
- ✅ Testing: 100% backend, ~98% frontend

## Test Credentials
Vedi `/app/memory/test_credentials.md`

## Backlog (prossime fasi)
### P1 (post-MVP)
- Video hero autoplay (aftermovie MP4) — quando cliente fornisce file
- Sitemap XML dinamica + robots.txt (route FastAPI)
- Open Graph tags per singola pagina (server-side o meta helmet)
- Editor markdown WYSIWYG per blog (attuale è textarea)

### P2 (Fase 2 post-lancio)
- Piantina interattiva tavoli (toggle già presente in modello evento `floorplan_enabled`)
- Traduzione inglese
- Integrazione WhatsApp Business API
- Cashless / ticketing interno con Stripe

## Assunzioni
- Redirect esterno TicketSms (nessuna gestione ordini interna)
- Prenotazioni tavoli via wa.me deep link (nessuna API WhatsApp)
- Un solo ruolo admin
- Contenuti media caricabili dopo lancio via dashboard
