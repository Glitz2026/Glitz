"""Impostazioni di Jarvis, lette dalle variabili d'ambiente (e dal file .env)."""

import os
from dataclasses import dataclass
from pathlib import Path
from zoneinfo import ZoneInfo, ZoneInfoNotFoundError

from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent

EFFORT_LEVELS = ("low", "medium", "high", "xhigh", "max")


@dataclass(frozen=True)
class Settings:
    api_key_configured: bool
    model: str
    effort: str
    max_tokens: int
    timezone: str
    city: str | None
    country: str | None
    web: bool
    user_name: str | None
    password: str | None
    data_dir: Path

    @property
    def tz(self) -> ZoneInfo:
        return ZoneInfo(self.timezone)


def _optional(name: str) -> str | None:
    value = os.environ.get(name, "").strip()
    return value or None


def load_settings() -> Settings:
    load_dotenv(BASE_DIR / ".env")

    timezone = _optional("JARVIS_TIMEZONE") or "Europe/Rome"
    try:
        ZoneInfo(timezone)
    except (ZoneInfoNotFoundError, ValueError) as exc:
        raise SystemExit(f"JARVIS_TIMEZONE non valido: {timezone!r}") from exc

    effort = (_optional("JARVIS_EFFORT") or "low").lower()
    if effort not in EFFORT_LEVELS:
        raise SystemExit(f"JARVIS_EFFORT deve essere uno tra {', '.join(EFFORT_LEVELS)}")

    data_dir = Path(_optional("JARVIS_DATA_DIR") or "data")
    if not data_dir.is_absolute():
        data_dir = BASE_DIR / data_dir

    return Settings(
        api_key_configured=bool(_optional("ANTHROPIC_API_KEY") or _optional("ANTHROPIC_AUTH_TOKEN")),
        model=_optional("JARVIS_MODEL") or "claude-opus-5-5",
        effort=effort,
        max_tokens=int(_optional("JARVIS_MAX_TOKENS") or 32000),
        timezone=timezone,
        city=_optional("JARVIS_CITY"),
        country=_optional("JARVIS_COUNTRY") or "IT",
        web=(_optional("JARVIS_WEB") or "1") not in ("0", "false", "no"),
        user_name=_optional("JARVIS_USER_NAME"),
        password=_optional("JARVIS_PASSWORD"),
        data_dir=data_dir,
    )
