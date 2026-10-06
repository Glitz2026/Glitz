"""Server web di Jarvis: interfaccia e API.

Avvio: python server.py  (poi apri http://localhost:8765)
"""

import asyncio
import ipaddress
import json
import logging
import os
import secrets
from datetime import datetime

import anthropic
from fastapi import APIRouter, Depends, FastAPI, HTTPException, Request
from fastapi.responses import FileResponse, StreamingResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, Field

from agent import Jarvis, display_messages, new_conversation
from config import BASE_DIR, Settings, load_settings
from store import Store
from tools import format_datetime_it

STATIC_DIR = BASE_DIR / "static"


class ChatIn(BaseModel):
    message: str = Field(min_length=1, max_length=20000)
    conversation_id: str | None = None
    voice: bool = False


def _sse(event: dict) -> str:
    return f"data: {json.dumps(event, ensure_ascii=False)}\n\n"


def create_app(settings: Settings | None = None, client: anthropic.AsyncAnthropic | None = None) -> FastAPI:
    settings = settings or load_settings()
    store = Store(settings.data_dir)
    if client is None and settings.api_key_configured:
        client = anthropic.AsyncAnthropic()
    jarvis = Jarvis(client, settings, store) if client else None
    locks: dict[str, asyncio.Lock] = {}

    def require_password(request: Request) -> None:
        if not settings.password:
            return
        given = request.headers.get("authorization", "").removeprefix("Bearer ").strip()
        if not secrets.compare_digest(given.encode(), settings.password.encode()):
            raise HTTPException(401, "Password mancante o errata.")

    app = FastAPI(title="Jarvis", docs_url=None, redoc_url=None, openapi_url=None)
    api = APIRouter(prefix="/api", dependencies=[Depends(require_password)])

    @app.get("/api/status")
    def status() -> dict:
        return {
            "ready": jarvis is not None,
            "password_required": bool(settings.password),
            "web": settings.web,
        }

    @api.get("/check")
    def check() -> dict:
        return {"ok": True, "user_name": settings.user_name}

    @api.post("/chat")
    async def chat(body: ChatIn) -> StreamingResponse:
        if jarvis is None:
            raise HTTPException(503, "Manca ANTHROPIC_API_KEY nel file .env.")
        if body.conversation_id:
            if store.load_conversation(body.conversation_id) is None:
                raise HTTPException(404, "Conversazione non trovata.")
            conversation_id = body.conversation_id
        else:
            conversation = new_conversation(settings, store)
            store.save_conversation(conversation)
            conversation_id = conversation["id"]

        async def events():
            lock = locks.setdefault(conversation_id, asyncio.Lock())
            async with lock:
                conversation = store.load_conversation(conversation_id)
                yield _sse({"type": "conversation", "id": conversation_id})
                async for event in jarvis.reply(conversation, body.message.strip(), body.voice):
                    yield _sse(event)

        return StreamingResponse(events(), media_type="text/event-stream",
                                 headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"})

    @api.get("/conversations")
    def conversations() -> list[dict]:
        return store.list_conversations()

    @api.get("/conversations/{conversation_id}")
    def conversation(conversation_id: str) -> dict:
        found = store.load_conversation(conversation_id)
        if found is None:
            raise HTTPException(404, "Conversazione non trovata.")
        return {"id": found["id"], "title": found["title"], "messages": display_messages(found)}

    @api.delete("/conversations/{conversation_id}")
    def delete_conversation(conversation_id: str) -> dict:
        if not store.delete_conversation(conversation_id):
            raise HTTPException(404, "Conversazione non trovata.")
        return {"deleted": True}

    @api.get("/memories")
    def memories() -> list[dict]:
        return store.memories()

    @api.delete("/memories/{memory_id}")
    def delete_memory(memory_id: str) -> dict:
        if not store.delete_memory(memory_id):
            raise HTTPException(404, "Ricordo non trovato.")
        return {"deleted": True}

    def _reminder_out(reminder: dict) -> dict:
        due = datetime.fromisoformat(reminder["due_at"]).astimezone(settings.tz)
        return {**reminder, "due_label": format_datetime_it(due)}

    @api.get("/reminders")
    def reminders() -> list[dict]:
        return [_reminder_out(r) for r in store.reminders(include_done=True)]

    @api.get("/reminders/due")
    def due_reminders() -> list[dict]:
        return [_reminder_out(r) for r in store.pop_due_reminders(datetime.now(settings.tz))]

    @api.delete("/reminders/{reminder_id}")
    def delete_reminder(reminder_id: str) -> dict:
        if not store.delete_reminder(reminder_id):
            raise HTTPException(404, "Promemoria non trovato.")
        return {"deleted": True}

    @api.get("/notes")
    def notes() -> list[dict]:
        return store.notes()

    @api.delete("/notes/{note_id}")
    def delete_note(note_id: str) -> dict:
        if not store.delete_note(note_id):
            raise HTTPException(404, "Nota non trovata.")
        return {"deleted": True}

    app.include_router(api)
    app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")

    @app.get("/", include_in_schema=False)
    def index() -> FileResponse:
        return FileResponse(STATIC_DIR / "index.html", headers={"Cache-Control": "no-cache"})

    @app.get("/manifest.webmanifest", include_in_schema=False)
    def manifest() -> FileResponse:
        return FileResponse(STATIC_DIR / "manifest.webmanifest", media_type="application/manifest+json")

    return app


def _is_loopback(host: str) -> bool:
    if host == "localhost":
        return True
    try:
        return ipaddress.ip_address(host).is_loopback
    except ValueError:
        return False


def main() -> None:
    import uvicorn

    logging.basicConfig(level=logging.INFO, format="%(levelname)s %(name)s: %(message)s")
    settings = load_settings()
    host = os.environ.get("JARVIS_HOST", "127.0.0.1")
    port = int(os.environ.get("JARVIS_PORT", "8765"))
    if not _is_loopback(host) and not settings.password:
        raise SystemExit("Per rendere Jarvis raggiungibile da altri dispositivi imposta JARVIS_PASSWORD nel file .env.")
    if not settings.api_key_configured:
        logging.warning("ANTHROPIC_API_KEY non impostata: l'interfaccia si apre ma Jarvis non può rispondere.")
    print(f"\n  Jarvis è pronto su http://{'localhost' if _is_loopback(host) else host}:{port}\n")
    uvicorn.run(create_app(settings), host=host, port=port, log_level="warning")


if __name__ == "__main__":
    main()
