# Glitz — app mobile

App Expo (iOS, Android, web) del Glitz Club, importata dal branch `conflict_240926_1300` con la sua cronologia.
Contiene sia le funzioni dell'app (serata, biglietti con QR, ordina al tavolo, A.I. live show, amici, aiuto) sia tutte quelle del sito web.

- `frontend/`: app Expo Router.
- `backend/`: FastAPI dell'app (auth, A.I., biglietti, ordini al tavolo, gruppi, aiuto) + ponte verso il sito (`site_bridge.py`).

## Navigazione

Barra in basso: **Home · Eventi · A.I. · Ordina · Altro**.

- **Home**: prossima serata con countdown, biglietti e tavolo; pass QR; azioni rapide (Eventi, Tavoli, Biglietti, Shop, Amici, Aiuto, Gallery, Il Club); caroselli eventi, shop e ambienti; news, gallery, FAQ, newsletter, social.
- **Eventi**: calendario 2027 del sito, raggruppato per mese, con eventi passati.
- **Scheda evento**: poster, countdown, line-up, biglietti (TicketSms), biglietto con QR nell'app quando la serata ha formule, piantina tavoli 2D ufficiale (40 tavoli, zone, prezzi, bottiglie, schermo intero) e club in 3D sul telefono.
- **Altro**: biglietti, tavoli, amici, aiuto, club, gallery, news, eventi passati, FAQ, shop, carrello, eventi privati, contatti, profilo con lo storico delle richieste, area staff (admin del sito nel browser).

## Funzioni del sito nell'app

| Sito | App |
| --- | --- |
| Home, FAQ, Instagram/TikTok, newsletter | Home, `faq`, newsletter nella Home |
| Eventi, scheda evento, eventi passati | tab Eventi, `event/[id]`, `eventi-passati` |
| Piantina 2D/3D e richiesta tavolo | `table-picker`, `glitz-plan`, `plan-3d`, `booking-sheet`, `prenota` |
| Shop, prodotto, carrello, Stripe | `shop`, `shop/[slug]`, `carrello` |
| News, Gallery, Il Club | `news`, `news/[slug]`, `gallery`, `club` |
| Contatti, eventi privati | `contatti`, `eventi-privati` |
| Account (prenotazioni e ordini) | `profile` → "Le mie richieste" |

L'area admin resta sul sito: l'app la apre nel browser.

## Collegamento al sito

L'app parla solo con il proprio backend. Le route `/api/site/*` inoltrano al backend del sito (stessi dati e stesso pannello admin) e salvano una copia per utente delle richieste inviate dall'app (`site_requests`).
Le richieste inoltrano l'IP del cliente, così i limiti anti-abuso del sito restano per persona.

Variabili:

- backend `SITE_URL` (default `https://glitz-nightclub.preview.emergentagent.com`): indirizzo del sito.
- frontend `EXPO_PUBLIC_SITE_URL` (stesso default): usato per la mappa 3D, il ritorno da Stripe e l'area staff.

Il pagamento con carta apre Stripe Checkout del sito; al termine l'app verifica lo stato del pagamento.
I biglietti con QR restano quelli dell'app: compaiono sulle serate del sito che hanno la stessa data di un evento dell'app con formule.

## Verifiche

- `backend/tests/test_site_bridge.py`: test offline del ponte (sito simulato con respx, Mongo con mongomock-motor).
- TypeScript e ESLint sui file nuovi senza errori.
- Build web (`npx expo export --platform web`) provata in Chromium, viewport telefono, con il backend dell'app reale e un sito simulato dai dati del repository: login, Home, eventi, piantina e prenotazione tavolo, biglietto QR, shop e carrello, club, gallery, news, contatti, eventi privati, FAQ, Ordina, profilo.
- Non provato: app nativa su iPhone/Android fisici, mappa 3D nel WebView, pagamento Stripe reale, collegamento al sito in produzione.
