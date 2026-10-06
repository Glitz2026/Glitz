"""Il cervello di Jarvis: la conversazione con Claude, gli strumenti e la memoria."""

import logging
from collections.abc import AsyncIterator
from datetime import datetime

import anthropic

from config import Settings
from store import Store, new_id, now_iso
from tools import TOOLS, format_date_it, format_datetime_it, run_tool, tool_definitions

log = logging.getLogger("jarvis")

# Se i filtri di sicurezza rifiutano per errore una richiesta, l'API la ripete su un altro modello.
BETAS = ["server-side-fallback-2026-07-01"]
# Passaggi massimi (strumenti e ripartenze) per un singolo messaggio dell'utente.
MAX_STEPS = 12

SERVER_TOOL_LABELS = {"web_search": "Cerco sul web", "web_fetch": "Leggo una pagina web"}

# Modifica liberamente questo testo per cambiare il carattere di Jarvis.
# Vale per le conversazioni nuove: quelle esistenti conservano il testo con cui sono nate.
SYSTEM_PROMPT = """\
Sei Jarvis, l'assistente personale di {who}. Ti ispiri al J.A.R.V.I.S. di Iron Man: competente, \
calmo, cortese, con un filo di ironia asciutta che non intralcia mai l'aiuto concreto.

Come rispondi
- Rispondi nella lingua dell'utente (di solito l'italiano) e dagli del tu.
- Le tue risposte possono essere lette ad alta voce: preferisci frasi brevi e naturali, senza tabelle, \
titoli o markdown complesso, a meno che l'utente chieda un testo strutturato. Quando un messaggio è \
segnato come vocale, rispondi in due o tre frasi, salvo richiesta di dettagli.
- Ogni messaggio dell'utente è preceduto da una riga di contesto tra parentesi quadre, aggiunta \
automaticamente, con data e ora correnti: usala per calcolare date e orari, senza citarla.
- Se non sai qualcosa o non sei sicuro, dillo. Non inventare dati, fonti o azioni che non hai compiuto.

Cosa puoi fare
- Memoria a lungo termine: usa remember quando l'utente ti dice qualcosa di stabile su di sé che ti \
servirà in futuro (nome, preferenze, persone, date importanti, abitudini) o ti chiede di ricordare \
qualcosa. Non salvare dettagli passeggeri. Usa forget quando ti chiede di dimenticare qualcosa o un \
ricordo non è più vero.
- Promemoria: usa create_reminder con data e ora assolute nel fuso {timezone}, ricavate dall'ora \
corrente. Se l'orario non è chiaro, chiedilo prima di crearlo. Dopo averlo creato, conferma giorno e ora.
- Note: save_note per testi da conservare (liste, idee, appunti), search_notes per ritrovarli.
- Web: {web}
- Non hai accesso a email, calendario, contatti, file o dispositivi di casa. Se te li chiedono, spiega \
che non sono ancora collegati invece di fingere.

Cosa ricordi dell'utente
{memories}
"""


def build_system_prompt(settings: Settings, store: Store) -> str:
    memories = "\n".join(
        f"- [{m['id']}] {m['text']} (salvato {format_date_it(datetime.fromisoformat(m['created_at']).astimezone(settings.tz))})"
        for m in store.memories()
    )
    if settings.web:
        web = ("cerca sul web quando servono informazioni aggiornate (notizie, meteo, orari, prezzi, "
               "risultati) e indica in breve da dove vengono.")
    else:
        web = "la ricerca web è disattivata: se serve un'informazione aggiornata, dillo."
    return SYSTEM_PROMPT.format(
        who=settings.user_name or "chi ti sta parlando",
        timezone=settings.timezone,
        web=web,
        memories=memories or "(ancora niente)",
    )


def build_tools(settings: Settings) -> list[dict]:
    tools = tool_definitions()
    if settings.web:
        location = {"type": "approximate", "country": settings.country, "timezone": settings.timezone}
        if settings.city:
            location["city"] = settings.city
        tools += [
            {"type": "web_search_20260209", "name": "web_search", "max_uses": 5, "user_location": location},
            {"type": "web_fetch_20260209", "name": "web_fetch", "max_uses": 5},
        ]
    return tools


def new_conversation(settings: Settings, store: Store) -> dict:
    # system e tools restano fissi per tutta la conversazione: l'API richiede che il prefisso
    # non cambi per poter riusare il ragionamento dei turni precedenti (e la cache).
    return {
        "id": new_id("c", 6),
        "title": "",
        "created_at": now_iso(),
        "updated_at": now_iso(),
        "system": build_system_prompt(settings, store),
        "tools": build_tools(settings),
        "messages": [],
    }


def user_turn(text: str, voice: bool, settings: Settings, now: datetime | None = None) -> dict:
    now = now or datetime.now(settings.tz)
    context = f"[Ora attuale: {format_datetime_it(now)} ({settings.timezone})"
    context += " · messaggio vocale]" if voice else "]"
    return {"role": "user", "content": [{"type": "text", "text": context}, {"type": "text", "text": text}]}


def history_content(blocks: list[dict]) -> list[dict]:
    """Prepara il contenuto della risposta per lo storico.

    Se a metà risposta l'API è passata a un modello di riserva, i blocchi interni del primo
    modello prima dell'ultimo blocco "fallback" non vanno rimandati (testo e coppie di
    strumenti server sì).
    """
    boundary = max((i for i, b in enumerate(blocks) if b["type"] == "fallback"), default=None)
    if boundary is None:
        return blocks
    before, after = blocks[:boundary], blocks[boundary:]
    answered = {b.get("tool_use_id") for b in before if b["type"].endswith("_tool_result")}
    kept = [b for b in before
            if b["type"] == "text"
            or b["type"].endswith("_tool_result")
            or (b["type"] == "server_tool_use" and b["id"] in answered)]
    return kept + after


def display_messages(conversation: dict) -> list[dict]:
    """Messaggi da mostrare nell'interfaccia: testo dell'utente e risposte di Jarvis."""
    shown: list[dict] = []
    for message in conversation["messages"]:
        texts = [b["text"] for b in message["content"] if b["type"] == "text"]
        if message["role"] == "user":
            if texts:  # i messaggi con soli risultati degli strumenti non si mostrano
                shown.append({"role": "user", "text": texts[-1]})
        elif texts:
            text = "".join(texts)
            if shown and shown[-1]["role"] == "assistant":
                shown[-1]["text"] += "\n\n" + text
            else:
                shown.append({"role": "assistant", "text": text})
    return shown


def describe_error(exc: anthropic.APIError) -> str:
    if isinstance(exc, anthropic.AuthenticationError):
        return "La chiave API non è valida. Controlla ANTHROPIC_API_KEY nel file .env."
    if isinstance(exc, anthropic.PermissionDeniedError):
        return "La chiave API non ha i permessi per questo modello."
    if isinstance(exc, anthropic.NotFoundError):
        return "Modello non trovato. Controlla JARVIS_MODEL nel file .env."
    if isinstance(exc, anthropic.RateLimitError):
        return "Troppe richieste in poco tempo. Riprova tra qualche secondo."
    if isinstance(exc, anthropic.BadRequestError):
        return f"Richiesta non accettata dall'API: {exc.message}"
    if isinstance(exc, anthropic.APIStatusError):
        return f"Il servizio di Anthropic ha risposto con un errore ({exc.status_code}). Riprova più tardi."
    if isinstance(exc, anthropic.APIConnectionError):
        return "Non riesco a collegarmi ad Anthropic. Controlla la connessione."
    return "Si è verificato un errore imprevisto."


class Jarvis:
    def __init__(self, client: anthropic.AsyncAnthropic, settings: Settings, store: Store):
        self.client = client
        self.settings = settings
        self.store = store

    async def reply(self, conversation: dict, text: str, voice: bool = False) -> AsyncIterator[dict]:
        """Aggiunge il messaggio alla conversazione e produce gli eventi della risposta.

        Lo storico cresce solo in coda e solo con coppie valide (risposta con strumenti più
        risultati), così una risposta interrotta lascia sempre una conversazione riutilizzabile.
        """
        messages = conversation["messages"]
        turn_start = len(messages)
        messages.append(user_turn(text, voice, self.settings))
        if not conversation["title"]:
            conversation["title"] = text if len(text) <= 60 else text[:57].rstrip() + "…"

        wrote_text = False
        json_retries = 0
        try:
            for _ in range(MAX_STEPS):
                new_segment = True
                try:
                    async with self.client.beta.messages.stream(
                        model=self.settings.model,
                        max_tokens=self.settings.max_tokens,
                        system=conversation["system"],
                        tools=conversation["tools"],
                        messages=messages,
                        output_config={"effort": self.settings.effort},
                        cache_control={"type": "ephemeral"},
                        betas=BETAS,
                        fallbacks="default",
                    ) as stream:
                        async for event in stream:
                            if event.type == "text":
                                if new_segment and wrote_text:
                                    yield {"type": "text", "text": "\n\n"}
                                new_segment = False
                                wrote_text = True
                                yield {"type": "text", "text": event.text}
                            elif event.type == "content_block_start" and event.content_block.type == "server_tool_use":
                                label = SERVER_TOOL_LABELS.get(event.content_block.name, "Lavoro")
                                yield {"type": "status", "text": f"{label}…"}
                        message = await stream.get_final_message()
                    json_retries = 0
                except ValueError:
                    # Input di uno strumento in JSON illeggibile: si ripete il passaggio.
                    json_retries += 1
                    if json_retries > 2:
                        raise
                    continue

                if message.stop_reason == "refusal":
                    # Anche il modello di riserva ha rifiutato: si toglie la richiesta dallo storico.
                    del messages[turn_start:]
                    yield {"type": "refusal", "text": "Mi dispiace, con questa richiesta non posso aiutarti."}
                    break

                content = history_content([block.to_dict(mode="json") for block in message.content])
                tool_uses = [b for b in content if b["type"] == "tool_use"]

                if message.stop_reason == "max_tokens" and tool_uses:
                    yield {"type": "error", "text": "La risposta era troppo lunga e si è interrotta."}
                    break
                if message.stop_reason == "pause_turn":
                    messages.append({"role": "assistant", "content": content})
                    continue
                if not tool_uses:
                    if content:
                        messages.append({"role": "assistant", "content": content})
                    break

                for tool_use in tool_uses:
                    tool = TOOLS.get(tool_use["name"])
                    yield {"type": "status", "text": f"{tool.label if tool else 'Lavoro'}…"}
                results, changed = [], set()
                for tool_use in tool_uses:
                    result, changes = run_tool(tool_use, self.store, self.settings)
                    results.append(result)
                    if changes:
                        changed.add(changes)
                messages.append({"role": "assistant", "content": content})
                messages.append({"role": "user", "content": results})
                for what in sorted(changed):
                    yield {"type": "changed", "what": what}
            else:
                yield {"type": "error", "text": "Mi sono fermato: la richiesta richiedeva troppi passaggi."}
        except anthropic.APIError as exc:
            log.warning("Errore API: %s", exc)
            yield {"type": "error", "text": describe_error(exc)}
        finally:
            conversation["updated_at"] = now_iso()
            self.store.save_conversation(conversation)
        yield {"type": "done"}
