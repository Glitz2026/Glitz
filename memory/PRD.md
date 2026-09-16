# Glitz Club — PRD

## Feature completate (16 Set 2026)
- MVP + Piantina pixel-perfect + Booking + Shop Stripe (6 prodotti) + Programmazione 2027 (10 eventi AI)
- Hero: BEYOND THE NIGHT (Cormorant Garamond)
- Palette: rosso #E10600 (Italian editorial red)
- Google Auth Emergent-managed (jalucas@hotmail.it auto-admin)
- Account page `/account` (prenotazioni + ordini)
- PosterFrame template Glitz (`/app/frontend/src/components/PosterFrame.jsx`)
- **Eventi Privati `/prenota-evento`**:
  - Form: area (5 zone), nome, email, telefono, data, ospiti (1-2500), occasione, budget, messaggio
  - Backend `POST /api/private-events` + email notifica admin via Resend
  - Admin listing `GET /api/private-events` (JWT protected)
  - Link "EVENTI PRIVATI" in nav

## Backlog / Future
- Admin UI per gestire richieste eventi privati (contattare/archiviare) — P1
- Field `artist_photo_url` in EventIn/EventOut + admin upload — P1
- Countdown Opening DAMANTE maxi homepage — P1
- Foto reali artisti da management (Damante info.damantecrew@gmail.com, Bob Sinclar press@yellowprod.fr) — P1
- Instagram auto-post 7gg prima evento — P2
- Localizzazione EN — P2
