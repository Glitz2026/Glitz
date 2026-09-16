# Glitz Club — PRD

## Cosa è già stato implementato
- MVP completo, Piantina pixel-perfect, Booking, Shop Stripe (6 prodotti + gift card)
- Programmazione 2027: 10 eventi con AI posters (silhouette artisti + arco reale)
- Hero: BEYOND THE NIGHT (Cormorant Garamond 300 gradient rosso→magenta)
- Palette: rosso Italian editorial #E10600 (era arancione #FF3300)
- **[16 Set 2026] Google Auth Emergent-managed**:
  - Header: "ACCEDI" button (public) / user avatar dropdown (loggato)
  - Cookie `session_token` httpOnly 7gg via `POST /api/auth/google/session`
  - `jalucas@hotmail.it` auto-promosso admin
  - Pagina `/account` con "Le tue prenotazioni" + "I tuoi ordini shop"
  - Endpoints: `/auth/user`, `/auth/logout`, `/auth/my/bookings`, `/auth/my/orders`
- **[16 Set 2026] PosterFrame template**:
  - `/app/frontend/src/components/PosterFrame.jsx`
  - Stile Glitz ufficiale: logo top, data SABATO/gg/mese, mirror ghost laterali, nome artista stampatello, opening lineup, sponsor bar
  - Toggle "Vista Template" in `/eventi` per switch AI ↔ Template
  - Nota: le AI posters attuali hanno testo bruciato dentro → il template va sovrapposto solo su foto artista pulite

## Backlog / Future
- Foto artista pulite (portrait no testo) da caricare via admin — P1
- Field `artist_photo_url` in EventIn/EventOut backend — P1
- Admin CRUD prodotti shop — P1
- Countdown Opening DAMANTE maxi in homepage — P1
- Localizzazione EN — P2
- Instagram auto-post — P2
