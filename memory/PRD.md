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

## Implemented (Fase 5 — 15 Feb 2026)
- ✅ Piantina definitiva unificata: SVG pulito stile PDF ufficiali con contorno club, arco Glitz, DJ booth, Dance Floor semi-circolare, e 4 zone etichettate (Back the Stage / Tavoli a Consumo / Glitz Bar / Riva Deck) + label Mare Tirreno-Isola di Dino
- ✅ 62 tavoli-quadrati cliccabili distribuiti sulle 4 zone (S1-S8 stage, T1-T28 consumo, B1-B12 bar, R1-R14 riva) — il proprietario può rimuovere quelli non utilizzati via editor
- ✅ **Piantina Reattiva**: nuovo campo `reserved_tables: dict` in event model. Alla creazione di una booking con event_id + table_number, il tavolo passa a status "reserved" per quella serata. In piantina i tavoli prenotati appaiono grigi e non cliccabili
- ✅ Endpoint POST /api/bookings aggiornato per aggiornare `events.reserved_tables[table_number]="reserved"` con dot-notation MongoDB

## Implemented (Fase 4 — 15 Feb 2026)
- ✅ Loghi Glitz ufficiali (bianco su trasparente, PDF → PNG rifilato) attivi in header (h-24 sm:h-32, tripla dimensione) e footer
- ✅ Planimetria ufficiale del club (PDF scala 1:200 → PNG) come background della piantina tavoli
- ✅ Piantina interattiva completamente rifatta: 28 hotspot cliccabili sovrapposti alla planimetria reale, divisi in 5 zone (Privé Stage / Centrale / Garden + Main Bar + Gin XP-Pool) con codice colore
- ✅ Sistema Booking completo: POST /api/bookings salva in DB (collection `bookings`), invia email di conferma via Resend se fornita, GET /api/admin/bookings per staff, PATCH /admin/bookings/{id}?status=... per conferma/rifiuto
- ✅ Componente BookingModal con form nome/telefono/email/ospiti/note; alla submit salva su DB + apre WhatsApp precompilato
- ✅ Modal Booking attivo su: hero Home "Prenota Tavolo", EventDetail "Prenota Tavolo", e su ogni tavolo cliccato in piantina (con # e zona precompilati)
- ✅ Tab Admin "Prenotazioni" con lista completa + azioni conferma/rifiuta + tab "Config" con planimetria_url settabile
- ✅ Hero video: supporto Vimeo automatico (iframe `background=1&autoplay=1&muted=1&loop=1`) — impostato al video utente
- ✅ Foto aggiuntive del cliente integrate

## Implemented (Fase 2 — 15 Feb 2026 — pt.1)
- ✅ Video Hero: campo `hero_video_url` in settings; se impostato, la home mostra `<video autoplay muted loop playsInline>` come background al posto dell'immagine
- ✅ Piantina Tavoli: componente `Floorplan.jsx` con SVG (19 tavoli su 3 zone: VIP Stage/Premium/Sea View), arco stage e dance floor, tavoli cliccabili → modal → deep link WhatsApp con numero tavolo, zona e posti pre-compilato. Mostrato solo se evento ha `floorplan_enabled=true` (toggle admin già presente)
- ✅ Sitemap Dinamica: `GET /api/sitemap.xml` genera XML con home + tutte le pagine statiche + tutti gli eventi + tutti i post pubblicati. `GET /api/robots.txt` restituisce robots policy con Sitemap
- ✅ Instagram Feed: sezione home con 6 post cliccabili (URL editabili in admin) + CTA "Segui su Instagram"
- ✅ Date aggiornate al 2027: eventi seed rifatti con date 19/06/2027, 17/07/2027, 14/08/2027. Countdown funzionante
- ✅ Nuovo tab "Impostazioni" in admin dashboard: gestione hero_video_url, hero_image_url, logo_url, Instagram profile URL + 6 post. Upload diretto video/immagine/logo su Object Storage con auto-fill URL
- ✅ Nuova collection `table_requests` (endpoint pubblico + admin GET)
- ✅ Header e footer usano `logo_url` da settings quando impostato (fallback al lettering testuale GLITZ)

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
