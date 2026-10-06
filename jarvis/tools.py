"""Strumenti che Jarvis può usare: memoria, promemoria e note."""

import json
from collections.abc import Callable
from datetime import datetime, timedelta

from pydantic import BaseModel, ConfigDict, Field, ValidationError

from config import Settings
from store import Store

GIORNI = ["lunedì", "martedì", "mercoledì", "giovedì", "venerdì", "sabato", "domenica"]
MESI = ["gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno", "luglio",
        "agosto", "settembre", "ottobre", "novembre", "dicembre"]


def format_date_it(dt: datetime) -> str:
    return f"{GIORNI[dt.weekday()]} {dt.day} {MESI[dt.month - 1]} {dt.year}"


def format_datetime_it(dt: datetime) -> str:
    return f"{format_date_it(dt)}, ore {dt:%H:%M}"


class ToolError(Exception):
    """Errore da riportare a Claude come risultato dello strumento."""


class _Input(BaseModel):
    model_config = ConfigDict(extra="forbid")


class RememberInput(_Input):
    fact: str = Field(min_length=1, max_length=1000,
                      description="The fact to remember, written as a short self-contained sentence in Italian.")


class ForgetInput(_Input):
    memory_id: str = Field(description="Id of the memory to delete, as listed in the system prompt (e.g. m_1a2b3c4d).")


class CreateReminderInput(_Input):
    text: str = Field(min_length=1, max_length=500, description="What to remind the user about, in Italian.")
    due_at: str = Field(description="When to fire, as ISO 8601 local date and time, e.g. 2026-10-07T18:30.")


class ListRemindersInput(_Input):
    pass


class DeleteReminderInput(_Input):
    reminder_id: str = Field(description="Id of the reminder to delete (e.g. r_1a2b3c4d).")


class SaveNoteInput(_Input):
    title: str = Field(min_length=1, max_length=200, description="Short title. Saving with an existing title replaces that note.")
    content: str = Field(min_length=1, max_length=20000, description="Full text of the note.")


class SearchNotesInput(_Input):
    query: str = Field(default="", max_length=200,
                       description="Words to look for in titles and text. Empty returns every note.")


class DeleteNoteInput(_Input):
    note_id: str = Field(description="Id of the note to delete (e.g. n_1a2b3c4d).")


def _remember(args: RememberInput, store: Store, settings: Settings) -> dict:
    memory = store.add_memory(args.fact.strip())
    return {"saved": True, "memory_id": memory["id"]}


def _forget(args: ForgetInput, store: Store, settings: Settings) -> dict:
    if not store.delete_memory(args.memory_id):
        raise ToolError(f"Nessun ricordo con id {args.memory_id}.")
    return {"deleted": True}


def _create_reminder(args: CreateReminderInput, store: Store, settings: Settings) -> dict:
    try:
        due = datetime.fromisoformat(args.due_at.strip().replace("Z", "+00:00"))
    except ValueError:
        raise ToolError(f"Data non valida: {args.due_at!r}. Usa il formato 2026-10-07T18:30.") from None
    due = due.replace(tzinfo=settings.tz) if due.tzinfo is None else due.astimezone(settings.tz)
    now = datetime.now(settings.tz)
    if due < now - timedelta(minutes=1):
        raise ToolError(f"La data {format_datetime_it(due)} è già passata (adesso è {format_datetime_it(now)}).")
    reminder = store.add_reminder(args.text.strip(), due)
    return {"created": True, "reminder_id": reminder["id"], "due": format_datetime_it(due)}


def _list_reminders(args: ListRemindersInput, store: Store, settings: Settings) -> dict:
    return {"pending": [
        {"id": r["id"], "text": r["text"], "due": format_datetime_it(datetime.fromisoformat(r["due_at"]))}
        for r in store.reminders()
    ]}


def _delete_reminder(args: DeleteReminderInput, store: Store, settings: Settings) -> dict:
    if not store.delete_reminder(args.reminder_id):
        raise ToolError(f"Nessun promemoria con id {args.reminder_id}.")
    return {"deleted": True}


def _save_note(args: SaveNoteInput, store: Store, settings: Settings) -> dict:
    note, created = store.save_note(args.title.strip(), args.content)
    return {"note_id": note["id"], "created": created, "replaced_existing": not created}


def _search_notes(args: SearchNotesInput, store: Store, settings: Settings) -> dict:
    notes = store.search_notes(args.query)
    return {"notes": [{"id": n["id"], "title": n["title"], "content": n["content"]} for n in notes[:20]],
            "total": len(notes)}


def _delete_note(args: DeleteNoteInput, store: Store, settings: Settings) -> dict:
    if not store.delete_note(args.note_id):
        raise ToolError(f"Nessuna nota con id {args.note_id}.")
    return {"deleted": True}


class Tool:
    def __init__(self, name: str, description: str, input_model: type[_Input],
                 run: Callable, label: str, changes: str | None):
        self.name = name
        self.description = description
        self.input_model = input_model
        self.run = run
        self.label = label  # stato mostrato nell'interfaccia mentre lo strumento lavora
        self.changes = changes  # pannello dell'interfaccia da aggiornare dopo l'uso


TOOLS = {tool.name: tool for tool in [
    Tool("remember", "Save a lasting fact about the user to long-term memory (preferences, people, "
         "important dates, habits) or something the user explicitly asks you to remember.",
         RememberInput, _remember, "Memorizzo", "memories"),
    Tool("forget", "Delete a fact from long-term memory.", ForgetInput, _forget, "Dimentico", "memories"),
    Tool("create_reminder", "Schedule a reminder. The user is notified in the Jarvis app at the given time.",
         CreateReminderInput, _create_reminder, "Imposto il promemoria", "reminders"),
    Tool("list_reminders", "List the reminders that have not fired yet.",
         ListRemindersInput, _list_reminders, "Controllo i promemoria", None),
    Tool("delete_reminder", "Delete a reminder.", DeleteReminderInput, _delete_reminder,
         "Elimino il promemoria", "reminders"),
    Tool("save_note", "Save a note (list, idea, text to keep).", SaveNoteInput, _save_note,
         "Salvo la nota", "notes"),
    Tool("search_notes", "Search the user's notes.", SearchNotesInput, _search_notes,
         "Cerco nelle note", None),
    Tool("delete_note", "Delete a note.", DeleteNoteInput, _delete_note, "Elimino la nota", "notes"),
]}


def _strip_titles(schema: dict) -> dict:
    """Toglie i "title" generati da pydantic, lasciando le proprietà che si chiamano title."""
    return {key: (_strip_titles(value) if isinstance(value, dict) else value)
            for key, value in schema.items() if not (key == "title" and isinstance(value, str))}


def tool_definitions() -> list[dict]:
    return [
        {
            "name": tool.name,
            "description": tool.description,
            "input_schema": _strip_titles(tool.input_model.model_json_schema()),
            "eager_input_streaming": True,
        }
        for tool in TOOLS.values()
    ]


def run_tool(tool_use: dict, store: Store, settings: Settings) -> tuple[dict, str | None]:
    """Esegue il blocco tool_use e restituisce il tool_result e il pannello da aggiornare."""
    result_block = {"type": "tool_result", "tool_use_id": tool_use["id"]}
    tool = TOOLS.get(tool_use["name"])
    if tool is None:
        return {**result_block, "is_error": True, "content": f"Strumento sconosciuto: {tool_use['name']}"}, None
    try:
        # Con eager_input_streaming l'input non è validato dall'API: lo validiamo qui.
        args = tool.input_model.model_validate(tool_use["input"])
        result = tool.run(args, store, settings)
    except ValidationError as exc:
        return {**result_block, "is_error": True,
                "content": f"Input non valido: {exc.errors(include_url=False, include_context=False)}"}, None
    except ToolError as exc:
        return {**result_block, "is_error": True, "content": str(exc)}, None
    return {**result_block, "content": json.dumps(result, ensure_ascii=False)}, tool.changes
