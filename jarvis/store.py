"""Archivio locale di Jarvis: memoria, promemoria, note e conversazioni in file JSON."""

import json
import os
import re
import secrets
import threading
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

CONVERSATION_ID = re.compile(r"^c_[0-9a-f]{12}$")


def new_id(prefix: str, size: int = 4) -> str:
    return f"{prefix}_{secrets.token_hex(size)}"


def now_iso() -> str:
    return datetime.now(timezone.utc).isoformat(timespec="seconds")


def _write_json(path: Path, data: Any) -> None:
    tmp = path.with_name(path.name + ".tmp")
    tmp.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
    os.replace(tmp, path)


class Store:
    def __init__(self, data_dir: Path):
        self.conversations_dir = data_dir / "conversations"
        self.conversations_dir.mkdir(parents=True, exist_ok=True)
        self._path = data_dir / "jarvis.json"
        self._lock = threading.Lock()
        self._data: dict[str, list[dict]] = {"memories": [], "reminders": [], "notes": []}
        if self._path.exists():
            saved = json.loads(self._path.read_text(encoding="utf-8"))
            for key in self._data:
                self._data[key] = saved.get(key, [])

    def _save(self) -> None:
        _write_json(self._path, self._data)

    def _delete(self, key: str, item_id: str) -> bool:
        with self._lock:
            items = self._data[key]
            kept = [item for item in items if item["id"] != item_id]
            if len(kept) == len(items):
                return False
            self._data[key] = kept
            self._save()
            return True

    # Memoria a lungo termine

    def memories(self) -> list[dict]:
        return list(self._data["memories"])

    def add_memory(self, text: str) -> dict:
        memory = {"id": new_id("m"), "text": text, "created_at": now_iso()}
        with self._lock:
            self._data["memories"].append(memory)
            self._save()
        return memory

    def delete_memory(self, memory_id: str) -> bool:
        return self._delete("memories", memory_id)

    # Promemoria

    def reminders(self, include_done: bool = False) -> list[dict]:
        items = [r for r in self._data["reminders"] if include_done or not r["notified"]]
        return sorted(items, key=lambda r: r["due_at"])

    def add_reminder(self, text: str, due_at: datetime) -> dict:
        reminder = {
            "id": new_id("r"),
            "text": text,
            "due_at": due_at.isoformat(timespec="minutes"),
            "created_at": now_iso(),
            "notified": False,
        }
        with self._lock:
            self._data["reminders"].append(reminder)
            self._save()
        return reminder

    def delete_reminder(self, reminder_id: str) -> bool:
        return self._delete("reminders", reminder_id)

    def pop_due_reminders(self, now: datetime) -> list[dict]:
        """Restituisce i promemoria scaduti non ancora notificati e li segna come notificati."""
        due = []
        with self._lock:
            for reminder in self._data["reminders"]:
                if not reminder["notified"] and datetime.fromisoformat(reminder["due_at"]) <= now:
                    reminder["notified"] = True
                    due.append(dict(reminder))
            if due:
                self._save()
        return sorted(due, key=lambda r: r["due_at"])

    # Note

    def notes(self) -> list[dict]:
        return sorted(self._data["notes"], key=lambda n: n["updated_at"], reverse=True)

    def save_note(self, title: str, content: str) -> tuple[dict, bool]:
        """Crea una nota o sostituisce il testo di quella con lo stesso titolo."""
        with self._lock:
            for note in self._data["notes"]:
                if note["title"].casefold() == title.casefold():
                    note.update(content=content, updated_at=now_iso())
                    self._save()
                    return dict(note), False
            note = {"id": new_id("n"), "title": title, "content": content,
                    "created_at": now_iso(), "updated_at": now_iso()}
            self._data["notes"].append(note)
            self._save()
            return dict(note), True

    def search_notes(self, query: str) -> list[dict]:
        words = query.casefold().split()
        return [n for n in self.notes()
                if all(w in f"{n['title']} {n['content']}".casefold() for w in words)]

    def delete_note(self, note_id: str) -> bool:
        return self._delete("notes", note_id)

    # Conversazioni

    def _conversation_path(self, conversation_id: str) -> Path | None:
        if not CONVERSATION_ID.match(conversation_id):
            return None
        return self.conversations_dir / f"{conversation_id}.json"

    def list_conversations(self) -> list[dict]:
        items = []
        for path in self.conversations_dir.glob("c_*.json"):
            conversation = json.loads(path.read_text(encoding="utf-8"))
            if conversation["messages"]:
                items.append({key: conversation[key] for key in ("id", "title", "updated_at")})
        return sorted(items, key=lambda c: c["updated_at"], reverse=True)

    def load_conversation(self, conversation_id: str) -> dict | None:
        path = self._conversation_path(conversation_id)
        if path is None or not path.exists():
            return None
        return json.loads(path.read_text(encoding="utf-8"))

    def save_conversation(self, conversation: dict) -> None:
        _write_json(self._conversation_path(conversation["id"]), conversation)

    def delete_conversation(self, conversation_id: str) -> bool:
        path = self._conversation_path(conversation_id)
        if path is None or not path.exists():
            return False
        path.unlink()
        return True
