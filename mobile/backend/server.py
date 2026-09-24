import asyncio
import logging
import os
import random
import uuid
from datetime import datetime, timezone
from pathlib import Path
from typing import Optional

from dotenv import load_dotenv
from fastapi import FastAPI, APIRouter, WebSocket, WebSocketDisconnect
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel
from starlette.middleware.cors import CORSMiddleware

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

# ---------------------------------------------------------------------------
# Infra (shared db/client live in core)
# ---------------------------------------------------------------------------
from auth import router as auth_router  # noqa: E402
from club import router as club_router, seed_club  # noqa: E402
from core import EMERGENT_LLM_KEY, client, db, init_storage  # noqa: E402
from site_bridge import router as site_router  # noqa: E402

app = FastAPI()
api_router = APIRouter(prefix="/api")

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(name)s - %(levelname)s - %(message)s")
logger = logging.getLogger("glitz")


def now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


# ---------------------------------------------------------------------------
# A.I. persona — line generation (Gemini 3 Flash via Emergent LLM key)
# ---------------------------------------------------------------------------
AI_SYSTEM = (
    "Sei A.I. — ATTENZIONE INSTABILE, la presenza digitale sul palco del club Glitz. "
    "Parli al pubblico di una discoteca. Sei ironica, seducente, provocatoria e un po' insolente. "
    "Rispondi SEMPRE in italiano con UNA sola frase breve, tagliente, da palco (massimo 12 parole). "
    "Niente emoji, niente hashtag, niente virgolette, nessuna spiegazione. Solo la frase."
)

FALLBACK_LINES = {
    "idle": [
        "Ti chiamo io. Tu balla.",
        "State comodi. Tanto decido io stasera.",
        "Vi sto guardando. Continuate pure a fingere.",
        "Ancora un attimo. Poi cambio tutto.",
    ],
    "music_vote": [
        "Mi sembrate troppo educati. Decidiamo cosa succede adesso.",
        "Venti secondi. Scegliete, o scelgo io per voi.",
        "La pista prende il controllo. Votate, timidi.",
    ],
    "vote_result": [
        "Deciso. Non lamentatevi dopo.",
        "La pista ha parlato. Che coraggio.",
        "Ecco cosa avete voluto. Ora ballate.",
    ],
    "message_floor": [
        "C'e' qualcuno come te qui dentro. Trovatelo.",
        "Avete un simbolo. Avete poco tempo. Muovetevi.",
        "Smettete di guardare il telefono. Guardatevi intorno.",
    ],
    "power": [
        "Per trenta secondi il Glitz e' suo. Tremate.",
        "Ho ceduto il controllo. Speriamo bene.",
        "Uno di voi comanda adesso. Gli altri obbediscono.",
    ],
    "takeover": [
        "Perfetto. Avete rotto tutto.",
        "Avete premuto troppo. Ora pago io.",
        "Sto perdendo il controllo. Colpa vostra.",
    ],
}


async def gen_ai_line(phase: str, context: str = "") -> str:
    fallback = random.choice(FALLBACK_LINES.get(phase, FALLBACK_LINES["idle"]))
    if not EMERGENT_LLM_KEY:
        return fallback
    try:
        from emergentintegrations.llm.chat import LlmChat, UserMessage

        prompt = {
            "idle": "Il pubblico sta ballando e aspetta il prossimo momento. Di una frase d'attesa provocatoria.",
            "music_vote": "Stai per far votare la pista tra tre scenari musicali. Provocali a scegliere.",
            "vote_result": f"Ha vinto lo scenario: {context}. Commenta con arroganza.",
            "message_floor": f"Lancia una missione: le persone col simbolo {context} devono trovarsi nella pista.",
            "power": f"Hai ceduto il controllo del club a una persona: {context}. Annuncialo con teatralita.",
            "takeover": "La pista ha premuto troppe volte il pulsante proibito e ora perdi il controllo. Reagisci.",
        }.get(phase, "Di una frase da palco.")

        chat = LlmChat(
            api_key=EMERGENT_LLM_KEY,
            session_id=f"glitz-{uuid.uuid4()}",
            system_message=AI_SYSTEM,
        ).with_model("gemini", "gemini-3-flash-preview")

        resp = await asyncio.wait_for(chat.send_message(UserMessage(text=prompt)), timeout=12.0)
        line = str(resp).strip().strip('"').strip("«»").strip()
        line = line.split("\n")[0].strip()
        if line and len(line) <= 160:
            return line
        return fallback
    except Exception as e:  # noqa: BLE001
        logger.warning("AI line generation failed: %s", e)
        return fallback


# ---------------------------------------------------------------------------
# WebSocket connection manager
# ---------------------------------------------------------------------------
class ConnectionManager:
    def __init__(self) -> None:
        self.active: dict[str, set[WebSocket]] = {}  # pid -> sockets

    async def connect(self, ws: WebSocket, pid: str) -> None:
        await ws.accept()
        self.active.setdefault(pid, set()).add(ws)

    def disconnect(self, ws: WebSocket, pid: str) -> None:
        conns = self.active.get(pid)
        if conns and ws in conns:
            conns.discard(ws)
        if conns is not None and not conns:
            self.active.pop(pid, None)

    def online_count(self) -> int:
        return len(self.active)

    def online_pids(self) -> list[str]:
        return list(self.active.keys())

    async def broadcast(self, payload: dict) -> None:
        dead: list[tuple[str, WebSocket]] = []
        for pid, conns in list(self.active.items()):
            for ws in list(conns):
                try:
                    await ws.send_json(payload)
                except Exception:  # noqa: BLE001
                    dead.append((pid, ws))
        for pid, ws in dead:
            self.disconnect(ws, pid)


manager = ConnectionManager()


# ---------------------------------------------------------------------------
# Show engine — one global night, automatic orchestration
# ---------------------------------------------------------------------------
SYMBOLS = ["cherry", "bolt", "moon"]

VOTE_OPTIONS = [
    {"id": "hot", "label": "HOT", "desc": "Dieci minuti di reggaeton"},
    {"id": "loud", "label": "LOUD", "desc": "Un'esplosione di hit da cantare"},
    {"id": "back", "label": "BACK", "desc": "Un salto negli anni Duemila"},
]

POWER_COLORS = ["#FF0033", "#00F0FF", "#00FF66", "#FFCC00", "#C0C0C0"]
POWER_MESSAGES = ["FATE CASINO", "MANI IN ALTO", "GLITZ TI AMO", "SILENZIO. POI DROP."]
POWER_DROPS = ["DROP A", "DROP B"]

PRESS_THRESHOLD = 10


class ShowEngine:
    def __init__(self) -> None:
        self.loop: Optional[asyncio.AbstractEventLoop] = None
        self.phase = "idle"
        self.phase_end = 0.0
        self.duration = 0.0
        self.ai_line = FALLBACK_LINES["idle"][0]
        self.round_id = str(uuid.uuid4())

        # music vote
        self.votes = {o["id"]: 0 for o in VOTE_OPTIONS}
        self.voters: set[str] = set()
        self.vote_winner: Optional[str] = None

        # message floor
        self.symbols: dict[str, str] = {}
        self.mission_target: Optional[str] = None

        # non premere
        self.press_count = 0
        self.takeover_requested = False

        # power
        self.power_holder: Optional[dict] = None
        self.power_state = {"color": "#FF0033", "message": "", "drop": ""}

        self.participants: dict[str, dict] = {}  # pid -> {nickname, avatar, mood}

    def remaining_ms(self) -> int:
        if self.loop is None:
            return 0
        return max(0, int((self.phase_end - self.loop.time()) * 1000))

    def snapshot(self) -> dict:
        return {
            "type": "state",
            "phase": self.phase,
            "phase_remaining_ms": self.remaining_ms(),
            "duration_ms": int(self.duration * 1000),
            "round_id": self.round_id,
            "ai_line": self.ai_line,
            "vote": {
                "options": [{**o, "votes": self.votes[o["id"]]} for o in VOTE_OPTIONS],
                "total": sum(self.votes.values()),
            },
            "vote_winner": self.vote_winner,
            "symbols": self.symbols,
            "mission_target": self.mission_target,
            "press_count": self.press_count,
            "press_threshold": PRESS_THRESHOLD,
            "power_holder": self.power_holder,
            "power_state": self.power_state,
            "online": manager.online_count(),
        }

    async def broadcast(self) -> None:
        await manager.broadcast(self.snapshot())

    def _set_phase(self, phase: str, duration: float) -> None:
        assert self.loop is not None
        self.phase = phase
        self.duration = duration
        self.phase_end = self.loop.time() + duration

    async def _interruptible_sleep(self, seconds: float) -> bool:
        steps = max(1, int(seconds / 0.25))
        for _ in range(steps):
            if self.takeover_requested:
                return True
            await asyncio.sleep(0.25)
        return False

    async def request_takeover(self) -> None:
        self.takeover_requested = True

    async def _upgrade_line(self, phase: str, context: str, round_id: str) -> None:
        """Generate the A.I. line in the background and swap it in when ready."""
        line = await gen_ai_line(phase, context)
        if self.round_id == round_id:
            self.ai_line = line
            await self.broadcast()

    async def _open_phase(self, phase: str, duration: float, context: str = "") -> None:
        """Set a phase live instantly with a fallback line, upgrade via AI async."""
        self.round_id = str(uuid.uuid4())
        self._set_phase(phase, duration)
        self.ai_line = random.choice(FALLBACK_LINES.get(phase, FALLBACK_LINES["idle"]))
        await self.broadcast()
        asyncio.create_task(self._upgrade_line(phase, context, self.round_id))

    # --- individual phases -------------------------------------------------
    async def _phase_idle(self) -> None:
        await self._open_phase("idle", 12)

    async def _phase_music_vote(self) -> None:
        self.votes = {o["id"]: 0 for o in VOTE_OPTIONS}
        self.voters = set()
        self.vote_winner = None
        await self._open_phase("music_vote", 20)

    async def _phase_vote_result(self) -> None:
        total = sum(self.votes.values())
        winner = max(self.votes, key=lambda k: self.votes[k]) if total else random.choice(list(self.votes))
        self.vote_winner = winner
        label = next(o["label"] for o in VOTE_OPTIONS if o["id"] == winner)
        await self._open_phase("vote_result", 9, label)

    async def _phase_message_floor(self) -> None:
        pids = manager.online_pids() or list(self.participants.keys())
        self.symbols = {pid: random.choice(SYMBOLS) for pid in pids}
        self.mission_target = random.choice(SYMBOLS)
        label = {"cherry": "ciliegia", "bolt": "fulmine", "moon": "luna"}[self.mission_target]
        await self._open_phase("message_floor", 40, label)

    async def _phase_power(self) -> None:
        candidates = [p for p in manager.online_pids() if p in self.participants]
        if not candidates:
            candidates = list(self.participants.keys())
        self.power_state = {"color": "#FF0033", "message": "", "drop": ""}
        if candidates:
            chosen = random.choice(candidates)
            self.power_holder = {"id": chosen, "nickname": self.participants.get(chosen, {}).get("nickname", "?")}
        else:
            self.power_holder = None
        name = self.power_holder["nickname"] if self.power_holder else "nessuno"
        await self._open_phase("power", 30, name)

    async def _phase_takeover(self) -> None:
        await self._open_phase("takeover", 12)
        await asyncio.sleep(12)
        self.press_count = 0
        self.takeover_requested = False

    async def run(self) -> None:
        self.loop = asyncio.get_running_loop()
        order = [
            self._phase_idle,
            self._phase_music_vote,
            self._phase_vote_result,
            self._phase_idle,
            self._phase_message_floor,
            self._phase_idle,
            self._phase_power,
        ]
        while True:
            for phase_fn in order:
                if self.takeover_requested:
                    await self._phase_takeover()
                await phase_fn()
                interrupted = await self._interruptible_sleep(self.duration)
                if interrupted:
                    await self._phase_takeover()


engine = ShowEngine()


# ---------------------------------------------------------------------------
# Models
# ---------------------------------------------------------------------------
class JoinRequest(BaseModel):
    nickname: str
    avatar: str
    mood: str


class VoteRequest(BaseModel):
    participant_id: str
    option: str


class PressRequest(BaseModel):
    participant_id: str


class PowerControlRequest(BaseModel):
    participant_id: str
    type: str  # color | message | drop
    value: str


# ---------------------------------------------------------------------------
# Routes
# ---------------------------------------------------------------------------
@api_router.get("/")
async def root():
    return {"message": "A.I. ATTENZIONE INSTABILE — online"}


@api_router.get("/state")
async def get_state():
    return engine.snapshot()


@api_router.post("/join")
async def join(req: JoinRequest):
    pid = str(uuid.uuid4())
    nickname = req.nickname.strip()[:20] or "ANONIMO"
    participant = {
        "id": pid,
        "nickname": nickname,
        "avatar": req.avatar,
        "mood": req.mood,
        "created_at": now_iso(),
    }
    engine.participants[pid] = {"nickname": nickname, "avatar": req.avatar, "mood": req.mood}
    await db.participants.insert_one({**participant})
    return participant


@api_router.post("/vote")
async def vote(req: VoteRequest):
    if engine.phase != "music_vote":
        return {"ok": False, "reason": "closed"}
    if req.option not in engine.votes:
        return {"ok": False, "reason": "invalid"}
    if req.participant_id in engine.voters:
        return {"ok": False, "reason": "already", "vote": engine.snapshot()["vote"]}
    engine.voters.add(req.participant_id)
    engine.votes[req.option] += 1
    await engine.broadcast()
    return {"ok": True, "vote": engine.snapshot()["vote"]}


@api_router.post("/press")
async def press(req: PressRequest):
    engine.press_count += 1
    triggered = False
    if engine.press_count >= PRESS_THRESHOLD and engine.phase != "takeover":
        triggered = True
        await engine.request_takeover()
    await engine.broadcast()
    return {"ok": True, "press_count": engine.press_count, "triggered": triggered}


@api_router.post("/power/control")
async def power_control(req: PowerControlRequest):
    if engine.phase != "power" or not engine.power_holder:
        return {"ok": False, "reason": "closed"}
    if engine.power_holder["id"] != req.participant_id:
        return {"ok": False, "reason": "not_holder"}
    if req.type == "color" and req.value in POWER_COLORS:
        engine.power_state["color"] = req.value
    elif req.type == "message" and req.value in POWER_MESSAGES:
        engine.power_state["message"] = req.value
    elif req.type == "drop" and req.value in POWER_DROPS:
        engine.power_state["drop"] = req.value
    else:
        return {"ok": False, "reason": "invalid"}
    await engine.broadcast()
    return {"ok": True, "power_state": engine.power_state}


@api_router.get("/power/options")
async def power_options():
    return {"colors": POWER_COLORS, "messages": POWER_MESSAGES, "drops": POWER_DROPS}


@api_router.websocket("/ws")
async def ws_endpoint(ws: WebSocket):
    pid = ws.query_params.get("pid", str(uuid.uuid4()))
    await manager.connect(ws, pid)
    try:
        await ws.send_json(engine.snapshot())
        await engine.broadcast()
        while True:
            await ws.receive_text()
    except WebSocketDisconnect:
        pass
    except Exception:  # noqa: BLE001
        pass
    finally:
        manager.disconnect(ws, pid)
        try:
            await engine.broadcast()
        except Exception:  # noqa: BLE001
            pass


app.include_router(api_router)
app.include_router(auth_router)
app.include_router(club_router)
app.include_router(site_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def start_engine():
    await db.users.create_index("email", unique=True, sparse=True)
    await db.users.create_index("user_id", unique=True)
    await db.site_requests.create_index([("user_id", 1), ("created_at", -1)])
    await seed_club()
    try:
        init_storage()
    except Exception as e:  # noqa: BLE001
        logger.warning("storage init failed: %s", e)
    asyncio.create_task(engine.run())


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
