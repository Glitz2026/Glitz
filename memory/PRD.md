# PRD — A.I. ATTENZIONE INSTABILE · Glitz companion app

## Original problem statement
Full club-companion app for the Glitz. A.I. (the interactive live show) is ONE feature inside a
broader app that follows the guest from choosing the night to getting home. Five sections:
La mia serata · Ordina · A.I. · Amici · Aiuto. Big buttons, night-legible, elegant total-black.

## User choices
- Access section in front of everything: Email/password + Google (Emergent) now; phone OTP (Twilio) later.
- Profile: name + email + optional photo + date of birth + optional Instagram (proceed without photo).
- A.I. lives inside the "A.I." tab behind "ENTRA IN A.I."; stays always-active.
- Build the whole "Prima Versione" of services at MVP depth.
- Style: total black + neon red (#FF0033) + silver.

## Architecture
- **Backend** FastAPI + MongoDB. Modules: `core.py` (mongo, JWT, bcrypt, object storage, get_current_user),
  `auth.py` (email/password + Google session exchange + guarded phone OTP + profile),
  `club.py` (events/tickets/tables/menu/groups/help/my-night + media upload), `server.py` (A.I. show engine + wiring).
  Unified auth: all methods return our own JWT bearer; validated on every `/api/*` app endpoint.
  AI lines via Gemini 3 Flash (Emergent key); profile photos via Emergent Object Storage.
- **Frontend** Expo Router. Root Stack + AuthGate (redirects welcome↔tabs). Groups `(auth)` and `(tabs)`.
  `AuthProvider` (token in secure storage), `ShowProvider` (A.I. realtime), react-query for server data.

## Implemented
### 2026-06 (turn 1)
- A.I. live show: onboarding + realtime stage (voto musicale, NON PREMERE, IL POTERE, messaggio dalla pista), WebSocket.
### 2026-06 (turn 2)
- Access section: welcome, register (name/email/password + optional photo/DOB/Instagram), login, Google login, phone (in arrivo).
- 5-tab app: Serata (my-night hero, quick actions, events carousel, QR tickets), Ordina (menu), A.I. (hub → ENTRA IN A.I.), Amici (create/join groups), Aiuto (SOS types + zone + requests, safety info).
- Events calendar + event detail + buy ticket (QR). Tables: zone list + request. Profile: edit + photo upload + logout.
- Tested: backend 35/35, all frontend flows pass.
### 2026-06 (turn 3)
- Ordina tab is now a full table-service screen: "Chiama il cameriere" (acqua/ghiaccio/mixer/nuovo ordine/pulizia/assistenza) with live status (inviata → presa in carico); cart with quantity steppers over the full menu incl. an expanded BOTTIGLIE section; "Ordina" submits and orders track live status (ricevuto → in preparazione → pronto, time-based).
- Brand: app icon / splash / favicon and in-app wordmark rebuilt from the client's logo showing only "GLITZ" (CLUB removed).
- Tested: backend 11/11, frontend flow pass.

## Personas
- Guest (primary): organises the night, buys ticket, meets friends, plays with A.I., asks for help.

## Backlog (prioritized)
- P1: Twilio phone OTP (needs TWILIO_ACCOUNT_SID / AUTH_TOKEN / VERIFY_SERVICE_SID).
- P1: Bar "ordina e ritira" flow with order status + table service call routing to staff.
- P1: Table service depth (call waiter with reason, shared tab, split payments) + Stripe/Razorpay for tickets/tables.
- P2: Instagram OAuth linking (currently a text field), friend meetups + flirt mode with mutual interest.
- P2: DJ/regia console + table-vs-table music duel; end-of-night (transport, lost & found, photos); Glitz Pass loyalty.
