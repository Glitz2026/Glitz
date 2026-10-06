from datetime import datetime, timedelta, timezone

import pytest

from fakes import make_settings
from store import Store
from tools import TOOLS, format_datetime_it, run_tool, tool_definitions


@pytest.fixture
def settings(tmp_path):
    return make_settings(tmp_path)


@pytest.fixture
def store(settings):
    return Store(settings.data_dir)


def use(name, tool_input, store, settings):
    return run_tool({"id": "toolu_1", "name": name, "input": tool_input}, store, settings)


def test_memories_survive_restart(settings, store):
    memory = store.add_memory("Preferisce il caffè senza zucchero")
    assert Store(settings.data_dir).memories() == [memory]
    assert store.delete_memory(memory["id"])
    assert not store.delete_memory(memory["id"])
    assert Store(settings.data_dir).memories() == []


def test_due_reminders_are_returned_once(settings, store):
    now = datetime.now(settings.tz)
    past = store.add_reminder("chiamare Pepper", now - timedelta(minutes=5))
    store.add_reminder("riunione", now + timedelta(hours=2))

    due = store.pop_due_reminders(now)
    assert [r["id"] for r in due] == [past["id"]]
    assert store.pop_due_reminders(now) == []
    assert [r["text"] for r in store.reminders()] == ["riunione"]
    assert len(store.reminders(include_done=True)) == 2


def test_note_with_same_title_is_replaced(store):
    first, created = store.save_note("Spesa", "latte")
    second, created_again = store.save_note("spesa", "latte, uova")
    assert created and not created_again
    assert first["id"] == second["id"]
    assert [n["content"] for n in store.notes()] == ["latte, uova"]
    assert store.search_notes("UOVA")[0]["title"] == "Spesa"
    assert store.search_notes("pane") == []


def test_conversation_ids_cannot_escape_the_data_folder(store):
    assert store.load_conversation("../jarvis") is None
    assert store.load_conversation("c_../../x") is None
    assert not store.delete_conversation("../jarvis")


def test_create_reminder_uses_local_timezone(settings, store):
    due = (datetime.now(settings.tz) + timedelta(days=1)).replace(hour=18, minute=30, second=0, microsecond=0)
    result, changes = use("create_reminder", {"text": "Palestra", "due_at": due.strftime("%Y-%m-%dT%H:%M")}, store, settings)

    assert changes == "reminders"
    assert "is_error" not in result
    assert format_datetime_it(due) in result["content"]
    saved = store.reminders()[0]
    assert datetime.fromisoformat(saved["due_at"]) == due


def test_create_reminder_rejects_past_and_invalid_dates(settings, store):
    past = (datetime.now(settings.tz) - timedelta(hours=1)).strftime("%Y-%m-%dT%H:%M")
    result, _ = use("create_reminder", {"text": "x", "due_at": past}, store, settings)
    assert result["is_error"] and "già passata" in result["content"]

    utc = (datetime.now(settings.tz) + timedelta(hours=3)).astimezone(timezone.utc).strftime("%Y-%m-%dT%H:%M:00Z")
    result, _ = use("create_reminder", {"text": "utc", "due_at": utc}, store, settings)
    assert "is_error" not in result
    store.delete_reminder(store.reminders()[0]["id"])

    result, _ = use("create_reminder", {"text": "x", "due_at": "domani alle 5"}, store, settings)
    assert result["is_error"] and "Data non valida" in result["content"]
    assert store.reminders() == []


def test_invalid_or_unknown_tool_input_is_reported_to_claude(settings, store):
    result, changes = use("create_reminder", {"text": "manca la data"}, store, settings)
    assert result["is_error"] and result["tool_use_id"] == "toolu_1" and changes is None

    result, _ = use("remember", {"fact": "x", "extra": 1}, store, settings)
    assert result["is_error"]

    result, _ = use("launch_missiles", {}, store, settings)
    assert result["is_error"] and "sconosciuto" in result["content"]


def test_forget_and_notes_tools(settings, store):
    result, changes = use("remember", {"fact": "Il suo cane si chiama Dum-E"}, store, settings)
    memory_id = store.memories()[0]["id"]
    assert changes == "memories" and memory_id in result["content"]

    result, _ = use("forget", {"memory_id": memory_id}, store, settings)
    assert "is_error" not in result and store.memories() == []

    use("save_note", {"title": "Idee", "content": "armatura rossa e oro"}, store, settings)
    result, _ = use("search_notes", {"query": "armatura"}, store, settings)
    assert "armatura rossa e oro" in result["content"]


def test_tool_definitions_keep_property_names_and_stream_inputs():
    definitions = {d["name"]: d for d in tool_definitions()}
    assert set(definitions) == set(TOOLS)
    note_schema = definitions["save_note"]["input_schema"]
    assert set(note_schema["properties"]) == {"title", "content"}
    assert note_schema["required"] == ["title", "content"]
    assert note_schema["additionalProperties"] is False
    assert "title" not in note_schema  # solo l'etichetta generata da pydantic viene tolta
    assert all(d["eager_input_streaming"] for d in definitions.values())
