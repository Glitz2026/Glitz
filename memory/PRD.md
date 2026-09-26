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
### 2026-06 (turn 4)
- Imported real data from the Glitz main site (glitz-nightclub): 3 real 2027 events (DAMANTE opening, GIADA BRINCE, RAUL DUMITRAS) with real covers; club info (Beyond the Night, San Nicola Arcella, Isola di Dino, Instagram); 5 real ambienti mapped to 8 tables.
- Ordina now shows an interactive floor-plan (piantina tavoli): Consolle·Arco on top, Mare·Isola di Dino at the bottom; tap your table to tell the waiter where you are — table selection gates waiter calls and orders and is stamped on every order.
- Centered GLITZ logo header on Serata and Ordina.
- Backend image proxy `/api/img?u=` so cross-origin (CORP) site covers load on web.
- Tested: backend 13/13, frontend flows pass; covers verified rendering after the proxy fix.

### 2026-09 (turn 5)
- Moved into the website repo under `mobile/`. All website features now live in the app through the backend bridge `/api/site/*` (`site_bridge.py`): events 2027, event detail with the official 40-table piantina (2D + 3D WebView) and table requests, shop + cart + Stripe checkout, news, gallery, Il Club, contacts, private events, newsletter, past events, FAQ.
- New app-style Home and tabs Home · Eventi · A.I. · Ordina · Altro; Amici and Aiuto moved to stack screens; ticket wallet `biglietti`; profile lists the requests sent from the app.
- Ordina uses the official piantina (tables B0–B15, R1–R16, G1–G8) instead of the 8 placeholder tables.

### 2026-06 (turn 6) — Pannello Staff + Bar "Ordina e ritira"
- **Roles/departments**: users gained `role` (guest|staff) + `department` (cambusa, barman, camerieri, runner, cassieri, direzione). `require_staff`/`require_direzione` deps in `core.py`. Idempotent seed of the 19 real Glitz employees (from the client's task PDFs + tabella riassuntiva) with phones, plus a Direzione admin. Staff log in via the same JWT (`/api/auth/login`); welcome screen shows "Accesso Staff" → `/(auth)/staff-login`; staff land on `/staff`.
- **Order routing (`staff.py`)**: every guest order / waiter call / SOS spawns a `staff_ticket` with a `route` pipeline. Bottle→table = Cambusa→Camerieri→Cassa; drink→table = Barman→Camerieri→Cassa; bar pickup = Barman→Cassa; waiter acqua/ghiaccio/mixer/pulizia→Runner, else→Camerieri; SOS→Direzione (shown on every board). Each `complete` advances to the next department; guest order status derives from the ticket stage.
- **Staff panel (`app/staff/*`)**: live board (react-query poll 3s + web beep / native haptic on new ticket), take/complete actions, per-department task checklist (real tasks from the docs, toggle persisted per day), Direzione team CRUD (add/move dept/reset pw/activate/delete), self change-password, payslips (Direzione assigns per employee via PDF upload to object storage; each employee sees only their own; 3 monthly combined docs for Direzione).
- **Bar "Ordina e ritira"**: Ordina tab has a mode toggle (Al tavolo / Ritira al bancone); pickup hides the piantina and shows a bar picker; order routes to the barman board with live "PRONTO · RITIRA AL BANCONE" status.
- Tested: backend 19/19 (RBAC, full routing pipeline, CRUD, tasks, payslips), all frontend flows pass.
- Deferred (per user, "b"): native push notifications to be configured after the app is published/built. Twilio phone OTP still parked.

## Personas
- Guest (primary): organises the night, buys ticket, meets friends, plays with A.I., asks for help.

## Backlog (prioritized)
- P1: Twilio phone OTP (needs TWILIO_ACCOUNT_SID / AUTH_TOKEN / VERIFY_SERVICE_SID).
- P1: Bar "ordina e ritira" flow with order status + table service call routing to staff.
- P1: Table service depth (call waiter with reason, shared tab, split payments) + Stripe/Razorpay for tickets/tables.
- P2: Instagram OAuth linking (currently a text field), friend meetups + flirt mode with mutual interest.
- P2: DJ/regia console + table-vs-table music duel; end-of-night (transport, lost & found, photos); Glitz Pass loyalty.
