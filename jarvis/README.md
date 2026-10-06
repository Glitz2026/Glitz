# Jarvis, il tuo assistente personale

Jarvis è un assistente personale ispirato al J.A.R.V.I.S. di Iron Man. Gli parli a voce o per iscritto dal browser e ti risponde a voce. Ricorda quello che gli dici, imposta promemoria, prende note e cerca informazioni aggiornate sul web. Il "cervello" è Claude di Anthropic.

È separato dal sito del Glitz: non legge e non modifica i dati del club.

## Cosa sa fare

- **Voce**: premi il microfono (o il cerchio luminoso) e parla. Jarvis risponde a voce.
- **«Ehi Jarvis»**: attiva il pulsante in alto e Jarvis resta in ascolto. Di' «Jarvis, …» seguito dalla richiesta, oppure solo «Jarvis» e aspetta il segnale.
- **Memoria**: «Ricorda che il mio vino preferito è il Barolo». Lo ricorderà nelle conversazioni successive. Puoi vedere ed eliminare i ricordi nel pannello *Memoria*.
- **Promemoria**: «Ricordami domani alle 9 di chiamare Marco». All'ora giusta suona, mostra un avviso e lo legge. Se attivi le notifiche, ne invia anche una. Jarvis deve essere aperto in una scheda del browser.
- **Note**: «Salva una nota con la lista della spesa: latte, uova, pane», poi «Cosa c'è nella lista della spesa?».
- **Web**: meteo, notizie, orari, risultati, prezzi.
- **Conversazioni salvate**: le trovi nel pannello *Chat*.

## Installazione (una sola volta)

Servono Python 3.10 o successivo e una chiave API di Anthropic: creala su [console.anthropic.com](https://console.anthropic.com/settings/keys) (l'account deve avere credito).

```bash
cd jarvis
python3 -m venv .venv
source .venv/bin/activate        # su Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env             # su Windows: copy .env.example .env
```

Apri `.env` e incolla la chiave dopo `ANTHROPIC_API_KEY=`. Se vuoi, compila anche `JARVIS_USER_NAME` (come deve chiamarti) e `JARVIS_CITY` (per meteo e ricerche locali).

## Avvio

```bash
cd jarvis
source .venv/bin/activate        # su Windows: .venv\Scripts\activate
python server.py
```

Apri **http://localhost:8765** in Chrome o Edge. La prima volta il browser chiede il permesso di usare il microfono.

## Browser e voce

- Il riconoscimento vocale funziona in Chrome ed Edge su computer, Chrome su Android e Safari su iPhone e Mac. Firefox non lo supporta: lì puoi solo scrivere.
- Il microfono funziona solo su `localhost` o su un indirizzo `https://`.
- Jarvis usa le voci installate nel sistema. Scegli voce e velocità in *Impostazioni*. Di solito le più naturali sono «Microsoft Giuseppe/Diego Online (Natural)» in Edge su Windows, «Luca» su Mac e «Google italiano» in Chrome.
- «Ehi Jarvis» funziona meglio da computer. Su telefono conviene il pulsante del microfono.

## Usarlo dal telefono

Per il microfono serve `https`. Due strade:

1. **Rete privata con Tailscale**: installa Tailscale su computer e telefono e usa la funzione *Serve* per pubblicare la porta 8765 in https, visibile solo ai tuoi dispositivi.
2. **Pubblicarlo online** su un servizio con https (Render, Railway, Fly.io o un tuo server). Imposta le stesse variabili del file `.env` e usa un disco persistente per la cartella `data`.

In entrambi i casi imposta `JARVIS_PASSWORD` nel file `.env`. Per accettare connessioni da altri dispositivi aggiungi `JARVIS_HOST=0.0.0.0`: senza password Jarvis si rifiuta di partire. Dal telefono puoi poi usare «Aggiungi a schermata Home» per averlo come un'app.

## Privacy e costi

- Conversazioni, memoria, note e promemoria restano sul tuo computer, nella cartella `jarvis/data/`, che non viene salvata su git.
- I messaggi vengono inviati ad Anthropic per generare le risposte.
- Il riconoscimento vocale del browser invia l'audio al servizio del browser stesso: Google per Chrome, Apple per Safari, Microsoft per Edge.
- Ogni messaggio consuma crediti API e le ricerche web hanno un costo aggiuntivo. Nella console Anthropic puoi controllare la spesa e impostare un limite mensile.

## Personalizzare

- **Carattere e regole**: modifica `SYSTEM_PROMPT` in `agent.py`. Vale per le conversazioni nuove.
- **Rapidità o precisione**: `JARVIS_EFFORT=low` (predefinito) dà risposte rapide, adatte alla voce. Con `medium` o `high` le risposte sono più ragionate, ma più lente e costose.
- **Ricerca web**: `JARVIS_WEB=0` la disattiva.

## Come è fatto

- `server.py`: server web (FastAPI) e API.
- `agent.py`: dialogo con Claude (`claude-opus-5-5`), con risposte in streaming, strumenti e ricerca web. Se i filtri di sicurezza rifiutano per errore una richiesta, l'API la ripete su un modello di riserva.
- `tools.py`: memoria, promemoria e note.
- `store.py`: salvataggio su file JSON.
- `static/`: interfaccia in HTML, CSS e JavaScript, senza librerie esterne. Usa le Web Speech API del browser per ascoltare e parlare.
- `tests/`: test automatici. Per eseguirli: `pip install -r requirements-dev.txt`, poi `pytest`.

## Idee per i prossimi passi

- Calendario ed email (Google Calendar, Gmail).
- Casa intelligente con Home Assistant: luci, termostato, tapparelle.
- Un bot Telegram o WhatsApp per parlargli anche fuori casa.
- Promemoria anche ad app chiusa, con notifiche push o Telegram.
- Una voce più naturale con un servizio di sintesi vocale dedicato.
