import asyncio
from datetime import datetime, timedelta

import anthropic
import httpx2
import pytest

from agent import Jarvis, display_messages, history_content, new_conversation, user_turn
from fakes import FakeClient, make_settings, message
from store import Store


@pytest.fixture
def settings(tmp_path):
    return make_settings(tmp_path)


@pytest.fixture
def store(settings):
    return Store(settings.data_dir)


def run(jarvis, conversation, text, voice=False):
    async def collect():
        return [event async for event in jarvis.reply(conversation, text, voice)]
    return asyncio.run(collect())


def test_tool_loop_runs_tools_and_keeps_history_append_only(settings, store):
    due = (datetime.now(settings.tz) + timedelta(days=1)).strftime("%Y-%m-%dT09:00")
    thinking = {"type": "thinking", "thinking": "", "signature": "sig_1"}
    tool_use = {"type": "tool_use", "id": "toolu_1", "name": "create_reminder",
                "input": {"text": "Chiamare il commercialista", "due_at": due}}
    client = FakeClient([
        message([thinking, tool_use], "tool_use"),
        message([{"type": "text", "text": "Fatto, te lo ricordo domani alle 9."}]),
    ])
    conversation = new_conversation(settings, store)
    events = run(Jarvis(client, settings, store), conversation, "Ricordami domani alle 9 di chiamare il commercialista")

    assert [e["type"] for e in events] == ["status", "changed", "text", "done"]
    assert events[0]["text"] == "Imposto il promemoria…"
    assert events[1]["what"] == "reminders"
    assert store.reminders()[0]["text"] == "Chiamare il commercialista"

    roles = [m["role"] for m in conversation["messages"]]
    assert roles == ["user", "assistant", "user", "assistant"]
    assert conversation["messages"][1]["content"] == [thinking, tool_use]
    assert conversation["messages"][2]["content"][0]["tool_use_id"] == "toolu_1"

    first, second = client.calls
    # Il secondo passaggio rimanda la prima risposta (ragionamento compreso) senza modificarla.
    assert second["messages"][:1] == first["messages"]
    assert second["messages"][1] == {"role": "assistant", "content": [thinking, tool_use]}
    for call in client.calls:
        assert call["model"] == "claude-opus-5-5"
        assert call["system"] == conversation["system"]
        assert call["tools"] == conversation["tools"]
        assert call["fallbacks"] == "default"
        assert call["betas"] == ["server-side-fallback-2026-07-01"]
        assert call["output_config"] == {"effort": "low"}
        assert "thinking" not in call and "tool_choice" not in call

    saved = store.load_conversation(conversation["id"])
    assert saved["messages"] == conversation["messages"]
    assert saved["title"].startswith("Ricordami domani")


def test_text_from_several_steps_is_separated(settings, store):
    client = FakeClient([
        message([{"type": "text", "text": "Controllo."},
                 {"type": "tool_use", "id": "toolu_1", "name": "list_reminders", "input": {}}], "tool_use"),
        message([{"type": "text", "text": "Non hai promemoria."}]),
    ])
    conversation = new_conversation(settings, store)
    events = run(Jarvis(client, settings, store), conversation, "Che promemoria ho?")
    text = "".join(e["text"] for e in events if e["type"] == "text")
    assert text == "Controllo.\n\nNon hai promemoria."
    assert display_messages(conversation) == [
        {"role": "user", "text": "Che promemoria ho?"},
        {"role": "assistant", "text": "Controllo.\n\nNon hai promemoria."},
    ]


def test_pause_turn_is_resumed(settings, store):
    search = [
        {"type": "server_tool_use", "id": "srvtoolu_1", "name": "web_search", "input": {"query": "meteo Roma"}},
        {"type": "web_search_tool_result", "tool_use_id": "srvtoolu_1", "content": []},
    ]
    client = FakeClient([message(search, "pause_turn"), message([{"type": "text", "text": "Domani sole."}])])
    conversation = new_conversation(settings, store)
    events = run(Jarvis(client, settings, store), conversation, "Che tempo fa domani a Roma?")

    assert {"type": "status", "text": "Cerco sul web…"} in events
    assert client.calls[1]["messages"][-1] == {"role": "assistant", "content": search}
    assert [m["role"] for m in conversation["messages"]] == ["user", "assistant", "assistant"]


def test_refusal_removes_the_request_from_history(settings, store):
    client = FakeClient([message([{"type": "text", "text": "Ok"}]), message([], "refusal")])
    conversation = new_conversation(settings, store)
    jarvis = Jarvis(client, settings, store)
    run(jarvis, conversation, "Ciao")
    before = list(conversation["messages"])

    events = run(jarvis, conversation, "Richiesta rifiutata")
    assert events[0]["type"] == "refusal"
    assert conversation["messages"] == before


def test_api_error_leaves_a_valid_conversation(settings, store):
    error = anthropic.APIConnectionError(request=httpx2.Request("POST", "https://api.anthropic.com/v1/messages"))
    client = FakeClient([error, message([{"type": "text", "text": "Eccomi."}])])
    conversation = new_conversation(settings, store)
    jarvis = Jarvis(client, settings, store)

    events = run(jarvis, conversation, "Ci sei?")
    assert events[0] == {"type": "error", "text": "Non riesco a collegarmi ad Anthropic. Controlla la connessione."}
    assert [m["role"] for m in store.load_conversation(conversation["id"])["messages"]] == ["user"]

    run(jarvis, conversation, "Riprovo")
    assert [m["role"] for m in conversation["messages"]] == ["user", "user", "assistant"]


def test_max_tokens_with_tool_call_is_not_executed(settings, store):
    truncated = {"type": "tool_use", "id": "toolu_1", "name": "save_note", "input": {"title": "Lista"}}
    client = FakeClient([message([truncated], "max_tokens")])
    conversation = new_conversation(settings, store)
    events = run(Jarvis(client, settings, store), conversation, "Scrivi una nota lunghissima")
    assert events[0]["type"] == "error"
    assert store.notes() == []
    assert [m["role"] for m in conversation["messages"]] == ["user"]


def test_history_after_fallback_drops_the_first_model_internals():
    blocks = [
        {"type": "thinking", "thinking": "", "signature": "a"},
        {"type": "text", "text": "Inizio"},
        {"type": "tool_use", "id": "toolu_x", "name": "remember", "input": {}},
        {"type": "server_tool_use", "id": "srvtoolu_1", "name": "web_search", "input": {}},
        {"type": "web_search_tool_result", "tool_use_id": "srvtoolu_1", "content": []},
        {"type": "server_tool_use", "id": "srvtoolu_2", "name": "web_search", "input": {}},
        {"type": "fallback", "from": {"model": "claude-opus-5-5"}, "to": {"model": "claude-opus-4-8"},
         "trigger": {"type": "refusal"}},
        {"type": "thinking", "thinking": "", "signature": "b"},
        {"type": "text", "text": "Fine"},
    ]
    assert [b["type"] for b in history_content(blocks)] == [
        "text", "server_tool_use", "web_search_tool_result", "fallback", "thinking", "text",
    ]
    no_fallback = blocks[:3]
    assert history_content(no_fallback) == no_fallback


def test_system_prompt_lists_memories_and_conversation_freezes_it(settings, store):
    store.add_memory("Vive a Malibu")
    conversation = new_conversation(settings, store)
    assert "Vive a Malibu" in conversation["system"]
    assert "Tony" in conversation["system"]
    store.add_memory("Ha un'armatura nuova")
    assert "armatura" not in conversation["system"]
    assert "armatura" in new_conversation(settings, store)["system"]


def test_web_tools_follow_settings(tmp_path):
    store = Store(tmp_path)
    with_web = new_conversation(make_settings(tmp_path, city="Milano"), store)
    names = [t["name"] for t in with_web["tools"]]
    assert names[-2:] == ["web_search", "web_fetch"]
    assert with_web["tools"][-2]["user_location"]["city"] == "Milano"

    without_web = new_conversation(make_settings(tmp_path, web=False), store)
    assert "web_search" not in [t["name"] for t in without_web["tools"]]
    assert "ricerca web è disattivata" in without_web["system"]


def test_user_turn_carries_time_and_voice_context(settings):
    now = datetime(2026, 10, 6, 17, 42, tzinfo=settings.tz)
    turn = user_turn("Ciao", True, settings, now)
    assert turn["content"][0]["text"] == "[Ora attuale: martedì 6 ottobre 2026, ore 17:42 (Europe/Rome) · messaggio vocale]"
    assert turn["content"][1]["text"] == "Ciao"
