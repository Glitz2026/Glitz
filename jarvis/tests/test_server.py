import json
from datetime import datetime, timedelta

from fastapi.testclient import TestClient

from fakes import FakeClient, make_settings, message
from server import create_app
from store import Store


def sse_events(response):
    return [json.loads(line[6:]) for line in response.text.splitlines() if line.startswith("data: ")]


def test_interface_and_status_without_api_key(tmp_path):
    client = TestClient(create_app(make_settings(tmp_path, api_key_configured=False)))
    assert client.get("/").status_code == 200
    assert "J.A.R.V.I.S." in client.get("/").text
    assert client.get("/static/app.js").status_code == 200
    assert client.get("/manifest.webmanifest").json()["name"] == "Jarvis"
    assert client.get("/api/status").json() == {"ready": False, "password_required": False, "web": True}
    assert client.get("/api/check").json() == {"ok": True, "user_name": "Tony"}
    response = client.post("/api/chat", json={"message": "Ciao"})
    assert response.status_code == 503


def test_password_protects_the_api(tmp_path):
    client = TestClient(create_app(make_settings(tmp_path, password="stark"), FakeClient([])))
    assert client.get("/api/status").json()["password_required"] is True
    assert client.get("/api/memories").status_code == 401
    assert client.get("/api/memories", headers={"Authorization": "Bearer sbagliata"}).status_code == 401
    assert client.get("/api/memories", headers={"Authorization": "Bearer stark"}).status_code == 200
    assert "user_name" not in client.get("/api/status").json()
    assert client.get("/api/check").status_code == 401
    assert client.get("/").status_code == 200


def test_chat_streams_events_and_saves_the_conversation(tmp_path):
    fake = FakeClient([
        message([{"type": "tool_use", "id": "toolu_1", "name": "remember", "input": {"fact": "Ama gli hamburger"}}], "tool_use"),
        message([{"type": "text", "text": "Me lo ricorderò."}]),
        message([{"type": "text", "text": "Ti piacciono gli hamburger."}]),
    ])
    client = TestClient(create_app(make_settings(tmp_path), fake))

    response = client.post("/api/chat", json={"message": "Ricorda che amo gli hamburger", "voice": True})
    assert response.status_code == 200
    assert response.headers["content-type"].startswith("text/event-stream")
    events = sse_events(response)
    conversation_id = events[0]["id"]
    assert [e["type"] for e in events] == ["conversation", "status", "changed", "text", "done"]
    assert "messaggio vocale" in fake.calls[0]["messages"][0]["content"][0]["text"]

    assert [m["text"] for m in client.get("/api/memories").json()] == ["Ama gli hamburger"]
    chats = client.get("/api/conversations").json()
    assert [c["id"] for c in chats] == [conversation_id]

    response = client.post("/api/chat", json={"message": "Cosa mi piace?", "conversation_id": conversation_id})
    assert sse_events(response)[1] == {"type": "text", "text": "Ti piacciono gli hamburger."}

    shown = client.get(f"/api/conversations/{conversation_id}").json()["messages"]
    assert shown == [
        {"role": "user", "text": "Ricorda che amo gli hamburger"},
        {"role": "assistant", "text": "Me lo ricorderò."},
        {"role": "user", "text": "Cosa mi piace?"},
        {"role": "assistant", "text": "Ti piacciono gli hamburger."},
    ]

    assert client.delete(f"/api/conversations/{conversation_id}").json() == {"deleted": True}
    assert client.get(f"/api/conversations/{conversation_id}").status_code == 404
    assert client.post("/api/chat", json={"message": "x", "conversation_id": conversation_id}).status_code == 404


def test_due_reminders_endpoint(tmp_path):
    settings = make_settings(tmp_path)
    Store(settings.data_dir).add_reminder("Bere acqua", datetime.now(settings.tz) - timedelta(minutes=1))
    client = TestClient(create_app(settings, FakeClient([])))

    due = client.get("/api/reminders/due").json()
    assert [r["text"] for r in due] == ["Bere acqua"]
    assert due[0]["due_label"]
    assert client.get("/api/reminders/due").json() == []
    assert client.get("/api/reminders").json()[0]["notified"] is True
    reminder_id = due[0]["id"]
    assert client.delete(f"/api/reminders/{reminder_id}").status_code == 200
    assert client.delete(f"/api/reminders/{reminder_id}").status_code == 404
