"""Staff panel: departments, order routing, live board, task checklists,
team management (Direzione) and payslips (cedolini).

The guest side (club.py) calls `create_ticket` whenever a guest places an
order, calls a waiter or triggers an SOS. Each ticket carries a `route`: an
ordered pipeline of departments (es. bottiglia al tavolo → Cambusa → Camerieri
→ Cassa). When one department completes its stage the ticket advances to the
next department, whose board picks it up.
"""

import unicodedata
import uuid
from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException
from fastapi.concurrency import run_in_threadpool
from pydantic import BaseModel, Field

from core import (
    APP_NAME,
    DEPARTMENTS,
    STAFF_DEPARTMENTS,
    db,
    get_object,
    hash_password,
    new_user_id,
    now_iso,
    put_object,
    require_direzione,
    require_staff,
    sanitize_user,
)

router = APIRouter(prefix="/api/staff")

DEFAULT_STAFF_PASSWORD = "glitz2026"
DEFAULT_ADMIN_PASSWORD = "glitzadmin2026"

# Bottle items (BOTTIGLIE menu category) start their journey in Cambusa.
BOTTLE_IDS = {"m-05", "m-06", "m-07", "m-08", "m-09", "m-10"}

# Waiter-call reasons handled by the Runner/Barback; the rest go to Camerieri.
RUNNER_REASONS = {"acqua", "ghiaccio", "mixer", "pulizia"}


# ---------------------------------------------------------------------------
# Task checklists (from the real Glitz "PROCEDURE OPERATIVE STAFF 2026" docs)
# ---------------------------------------------------------------------------
PER_TUTTI = {
    "mission": "Consegnare un club perfetto all'apertura, gestirlo al meglio, riconsegnarlo perfetto alla chiusura.",
    "note": "L'errore dichiarato si risolve, l'errore nascosto diventa un problema per tutti. Ogni incasso e movimento va registrato correttamente.",
}

TASKS: dict[str, dict] = {
    "cambusa": {
        "mission": "Nessun bar deve restare senza prodotto durante il servizio. Tutte le differenze di magazzino vanno giustificate.",
        "prima": [
            "Ricezione merce e verifica quantità",
            "Controllo danneggiamenti e registrazione entrate",
            "Sistemazione magazzino e riempimento frigoriferi",
            "Conteggio bicchieri e bottiglie premium",
            "Preparazione rifornimenti per ogni punto bar",
        ],
        "durante": [
            "Controllo continuo delle scorte",
            "Rifornimento tempestivo dei bar",
            "Segnalazione anomalie",
            "Registrazione uscite straordinarie",
        ],
        "dopo": [
            "Conteggio bottiglie e bicchieri residui",
            "Verifica consumi",
            "Pulizia magazzino, riordino celle e frigoriferi",
            "Report finale consumi",
        ],
    },
    "barman": {
        "mission": "Ogni prodotto servito deve corrispondere a un incasso registrato.",
        "prima": [
            "Postazione pulita e frigoriferi carichi",
            "Ghiaccio disponibile e bicchieri pronti",
            "Cassa verificata e test attrezzature",
        ],
        "durante": [
            "Velocità di servizio e controllo qualità drink",
            "Nessuna bottiglia lasciata aperta inutilmente",
            "Nessuna consumazione non registrata",
            "Segnalazione immediata anomalie",
        ],
        "dopo": [
            "Conteggio bottiglie aperte",
            "Pulizia completa banco e riordino frigoriferi",
            "Smaltimento rifiuti e verifica attrezzature",
        ],
    },
    "camerieri": {
        "mission": "Il cliente deve sentirsi seguito e valorizzato.",
        "prima": [
            "Tavoli puliti e divanerie perfette",
            "Menù e listini aggiornati",
            "Conoscenza delle offerte in cambusa",
            "Nessuna lanterna sui tavoli",
        ],
        "durante": [
            "Accoglienza immediata e controllo tavoli ogni 5-10 min",
            "Non lasciare il privé scoperto senza un collega",
            "Proposta bottiglia successiva prima che il tavolo resti senza bere",
            "Sconti solo a chi ha consumato, sempre annotati",
            "Gestione rapida richieste clienti",
        ],
        "dopo": [
            "Pulizia tavoli e riordino privé/aree comuni",
            "Segnalazione oggetti smarriti",
            "Copertura impianti audio dei propri privé",
            "Verifica finale sala",
        ],
    },
    "runner": {
        "mission": "Il personale di vendita non deve perdere tempo a cercare materiali. Nessun bicchiere in giro.",
        "prima": [
            "Carico ghiaccio e bicchieri",
            "Verifica scorte",
            "Aiuto agli altri reparti",
        ],
        "durante": [
            "Supporto continuo ai bar e rifornimenti rapidi",
            "Controllo bagni ogni 10 min se possibile",
            "Raccolta vetro vuoto",
            "Trasporto bottiglie ai tavoli e supporto in cambusa",
            "Pulizia aree operative",
        ],
        "dopo": [
            "Riordino depositi e smaltimento rifiuti",
            "Copertura impianti luci/audio",
            "Lavaggio attrezzature e preparazione giorno successivo",
        ],
    },
    "cassieri": {
        "mission": "Ogni incasso deve essere tracciato e riconciliabile. Ogni differenza va spiegata (norma POS 2026).",
        "prima": [
            "Verifica fondo cassa e POS",
            "Controllo collegamento elettrico e montaggio postazione",
            "Segnare tavoli per check ingressi e scrivere segnaposto",
        ],
        "durante": [
            "Emissione immediata scontrino ad ogni pagamento elettronico approvato",
            "Verifica corretta registrazione di ogni vendita",
            "Controllo movimenti POS e segnalazione anomalie",
        ],
        "dopo": [
            "Chiusura cassa e pulizia bancone",
            "Conteggio contanti con Gianluca",
            "Verifica corrispondenza e consegna report",
            "Foto conteggio finale e ricarica POS",
        ],
    },
    "direzione": {
        "mission": "Supervisione di tutti i reparti, gestione staff e chiusura serata.",
        "prima": ["Verifica prontezza di tutti i reparti", "Briefing squadra"],
        "durante": ["Monitoraggio board ordini/chiamate/SOS", "Gestione emergenze"],
        "dopo": ["Conteggio finale con i cassieri", "Report serata"],
    },
}

# Full monthly payslip PDFs (Villa Sandra S.r.l.) — Direzione only.
MONTHLY_DOCS = [
    {"month": "Giugno 2026", "url": "https://customer-assets-v7afamib.emergentagent.net/job_chaos-choice/artifacts/hp21c7lp_Cedolini%20Giugno.PDF"},
    {"month": "Luglio 2026", "url": "https://customer-assets-v7afamib.emergentagent.net/job_chaos-choice/artifacts/24qipiu4_Cedolini%20Luglio.PDF"},
    {"month": "Agosto 2026", "url": "https://customer-assets-v7afamib.emergentagent.net/job_chaos-choice/artifacts/4nt06kpc_Cedolini%20Agosto.PDF"},
]


# ---------------------------------------------------------------------------
# Seed real staff (idempotent — never overwrites Direzione edits/passwords)
# ---------------------------------------------------------------------------
def _slug_email(name: str) -> str:
    ascii_name = unicodedata.normalize("NFKD", name).encode("ascii", "ignore").decode()
    parts = [p for p in ascii_name.lower().replace("'", " ").split() if p]
    return ".".join(parts) + "@glitz.staff"


# name, department, phone
SEED_STAFF = [
    ("Gianluca (Direzione)", "direzione", "", "direzione@glitz.staff", DEFAULT_ADMIN_PASSWORD),
    ("Mara Lagatta", "camerieri", "+39 388 183 1488", None, None),
    ("Giulia Esposito", "camerieri", "+39 320 448 1781", None, None),
    ("Simone Pistorino", "camerieri", "+39 351 905 4148", None, None),
    ("Lorenzo Longo", "camerieri", "+39 347 974 8089", None, None),
    ("Francesco Riccetti", "camerieri", "+39 331 783 2968", None, None),
    ("Giada Belmonte", "camerieri", "+39 327 913 4379", None, None),
    ("Antonio Errico", "camerieri", "+39 329 307 4056", None, None),
    ("Hajoubi Omaima", "camerieri", "+39 327 165 6133", None, None),
    ("Giulia Pandolfi", "camerieri", "+39 347 306 5056", None, None),
    ("Mattia Cauteruccio", "camerieri", "+39 327 286 5646", None, None),
    ("Daniele Cirasuolo", "cassieri", "+39 340 675 5189", None, None),
    ("Alessia Sciuto", "cassieri", "+39 340 997 0636", None, None),
    ("Rosario Lapetina", "cassieri", "+39 342 514 2882", None, None),
    ("Giorgia Baldinelli", "cassieri", "+39 347 387 8521", None, None),
    ("Simona Alberti", "cassieri", "+39 340 950 0474", None, None),
    ("Christian Giuseppe Pisciotta", "cambusa", "", None, None),
    ("Raffaele Pio Nicodemo", "runner", "", None, None),
    ("Desirée Filardi", "barman", "", None, None),
]


async def seed_staff() -> None:
    for name, dept, phone, email_override, pwd_override in SEED_STAFF:
        email = (email_override or _slug_email(name)).lower()
        password = pwd_override or DEFAULT_STAFF_PASSWORD
        await db.users.update_one(
            {"email": email},
            {
                "$setOnInsert": {
                    "user_id": new_user_id(),
                    "name": name,
                    "email": email,
                    "phone": phone or None,
                    "password_hash": hash_password(password),
                    "role": "staff",
                    "department": dept,
                    "is_active": True,
                    "must_change_password": True,
                    "provider": "staff",
                    "photo_url": None,
                    "date_of_birth": None,
                    "instagram": None,
                    "created_at": now_iso(),
                }
            },
            upsert=True,
        )


# ---------------------------------------------------------------------------
# Ticket creation & routing (called from club.py)
# ---------------------------------------------------------------------------
def compute_route(kind: str, items: list | None, mode: str, reason: str | None) -> list[str]:
    if kind == "waiter":
        return ["runner"] if reason in RUNNER_REASONS else ["camerieri"]
    if kind == "sos":
        return ["direzione"]
    if kind == "order":
        if mode == "pickup":
            return ["barman", "cassieri"]
        has_bottle = any((i.get("id") in BOTTLE_IDS) for i in (items or []))
        prep = "cambusa" if has_bottle else "barman"
        return [prep, "camerieri", "cassieri"]
    return ["direzione"]


async def create_ticket(
    *,
    kind: str,
    user: dict,
    table: str | None = None,
    items: list | None = None,
    total: float = 0.0,
    reason: str | None = None,
    mode: str = "table",
    bar: str | None = None,
    note: str | None = None,
    source_id: str | None = None,
) -> dict:
    route = compute_route(kind, items, mode, reason)
    ticket = {
        "id": f"st-{uuid.uuid4().hex[:10]}",
        "kind": kind,
        "source_id": source_id,
        "user_id": user["user_id"],
        "guest_name": user.get("name"),
        "table": table,
        "items": items or [],
        "total": round(total, 2),
        "reason": reason,
        "mode": mode,
        "bar": bar,
        "note": note,
        "route": route,
        "stage": 0,
        "department": route[0],
        "status": "pending",
        "history": [],
        "created_at": now_iso(),
        "updated_at": now_iso(),
    }
    await db.staff_tickets.insert_one({**ticket})
    ticket.pop("_id", None)
    return ticket


def guest_status_from_ticket(ticket: dict | None) -> str | None:
    """Map an internal ticket pipeline to a guest-facing order status."""
    if not ticket:
        return None
    status = ticket["status"]
    stage = ticket["stage"]
    route = ticket["route"]
    dept = route[stage] if stage < len(route) else None
    if status == "done":
        return "completed"
    if ticket.get("mode") == "pickup":
        if stage == 0:
            return "preparing" if status == "in_progress" else "received"
        return "ready"  # barman done → ready to collect at the counter
    # table order pipeline: prep → camerieri → cassieri
    if stage == 0:
        return "preparing" if status == "in_progress" else "received"
    if dept == "camerieri":
        return "on_the_way"
    if dept == "cassieri":
        return "delivered"
    return "received"


def call_status_from_ticket(ticket: dict | None) -> str:
    if not ticket:
        return "sent"
    return "taken_in_charge" if ticket["status"] in ("in_progress", "done") else "sent"


def _clean(doc: dict) -> dict:
    doc.pop("_id", None)
    return doc


# ---------------------------------------------------------------------------
# Staff profile & departments
# ---------------------------------------------------------------------------
@router.get("/me")
async def staff_me(current=Depends(require_staff)):
    dept = current.get("department")
    return {
        "user": sanitize_user(current),
        "department": {"id": dept, **DEPARTMENTS.get(dept, {})},
        "is_direzione": dept == "direzione",
    }


@router.get("/departments")
async def departments(current=Depends(require_staff)):
    return {"departments": [{"id": k, **v} for k, v in DEPARTMENTS.items()]}


@router.get("/directory")
async def directory():
    """Public: reparti + membri (nome/email) so the staff login screen can offer
    a reparto → nome picker instead of typing an email. Password still required."""
    members = await db.users.find(
        {"role": "staff"}, {"_id": 0, "name": 1, "email": 1, "department": 1}
    ).sort("name", 1).to_list(500)
    out = []
    for k, v in DEPARTMENTS.items():
        ms = [{"name": m["name"], "email": m["email"]} for m in members if m.get("department") == k]
        if ms:
            out.append({"id": k, "label": v["label"], "color": v.get("color"), "members": ms})
    return {"departments": out}


# ---------------------------------------------------------------------------
# Live board
# ---------------------------------------------------------------------------
def _kind_label(t: dict) -> str:
    if t["kind"] == "order":
        return "Ritiro al bancone" if t.get("mode") == "pickup" else "Ordine al tavolo"
    if t["kind"] == "waiter":
        return "Chiamata cameriere"
    if t["kind"] == "sos":
        return "SOS / Aiuto"
    return t["kind"]


@router.get("/board")
async def board(current=Depends(require_staff)):
    dept = current["department"]
    is_dir = dept == "direzione"
    if is_dir:
        cur = db.staff_tickets.find({"status": {"$ne": "done"}}, {"_id": 0})
    else:
        cur = db.staff_tickets.find(
            {"$or": [{"department": dept, "status": {"$ne": "done"}}, {"kind": "sos", "status": {"$ne": "done"}}]},
            {"_id": 0},
        )
    tickets = await cur.sort("created_at", 1).to_list(200)
    for t in tickets:
        t["kind_label"] = _kind_label(t)
        t["dept_label"] = DEPARTMENTS.get(t["department"], {}).get("label", t["department"])
        t["is_mine"] = is_dir or t["department"] == dept
    return {"tickets": tickets, "count": len([t for t in tickets if t["is_mine"]])}


class TicketAction(BaseModel):
    pass


async def _get_ticket_for_action(ticket_id: str, current: dict) -> dict:
    t = await db.staff_tickets.find_one({"id": ticket_id})
    if not t:
        raise HTTPException(status_code=404, detail="Ticket non trovato")
    if t.get("status") == "done":
        raise HTTPException(status_code=400, detail="Ticket già completato")
    if current["department"] != "direzione" and t["department"] != current["department"]:
        raise HTTPException(status_code=403, detail="Non è un ticket del tuo reparto")
    return t


@router.post("/tickets/{ticket_id}/take")
async def take_ticket(ticket_id: str, current=Depends(require_staff)):
    t = await _get_ticket_for_action(ticket_id, current)
    entry = {"department": t["department"], "action": "presa in carico", "by": current.get("name"), "at": now_iso()}
    await db.staff_tickets.update_one(
        {"id": ticket_id},
        {"$set": {"status": "in_progress", "updated_at": now_iso()}, "$push": {"history": entry}},
    )
    t = await db.staff_tickets.find_one({"id": ticket_id}, {"_id": 0})
    return {"ticket": t}


class CompleteReq(BaseModel):
    payment_method: str | None = None  # "contanti" | "pos" (only at cassieri stage for orders)


PAYMENT_METHODS = {"contanti", "pos"}


@router.post("/tickets/{ticket_id}/complete")
async def complete_ticket(ticket_id: str, req: CompleteReq | None = None, current=Depends(require_staff)):
    t = await _get_ticket_for_action(ticket_id, current)
    route = t["route"]
    stage = t["stage"]
    is_last = stage >= len(route) - 1
    entry = {"department": t["department"], "action": "completato", "by": current.get("name"), "at": now_iso()}

    # Record the payment when the cassa closes an order (fiscal reconciliation).
    if is_last and t["department"] == "cassieri" and t["kind"] == "order":
        method = (req.payment_method if req else None) or "pos"
        if method not in PAYMENT_METHODS:
            raise HTTPException(status_code=400, detail="Metodo di pagamento non valido")
        payment = {
            "id": f"pay-{uuid.uuid4().hex[:10]}",
            "ticket_id": t["id"],
            "table": t.get("table"),
            "mode": t.get("mode"),
            "bar": t.get("bar"),
            "total": t.get("total", 0.0),
            "method": method,
            "by": current.get("name"),
            "date": _today(),
            "created_at": now_iso(),
        }
        await db.payments.insert_one({**payment})
        entry["payment_method"] = method

    if not is_last:
        next_stage = stage + 1
        updates = {"stage": next_stage, "department": route[next_stage], "status": "pending", "updated_at": now_iso()}
    else:
        updates = {"status": "done", "updated_at": now_iso()}
    await db.staff_tickets.update_one({"id": ticket_id}, {"$set": updates, "$push": {"history": entry}})
    t = await db.staff_tickets.find_one({"id": ticket_id}, {"_id": 0})
    return {"ticket": t}


# ---------------------------------------------------------------------------
# Incassi — cash/POS reconciliation (Cassieri & Direzione)
# ---------------------------------------------------------------------------
async def _require_cassa(current: dict = Depends(require_staff)) -> dict:
    if current.get("department") not in ("cassieri", "direzione"):
        raise HTTPException(status_code=403, detail="Riservato a Cassieri e Direzione")
    return current


@router.get("/incassi")
async def incassi(current=Depends(_require_cassa)):
    date = _today()
    payments = await db.payments.find({"date": date}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    contanti = round(sum(p["total"] for p in payments if p["method"] == "contanti"), 2)
    pos = round(sum(p["total"] for p in payments if p["method"] == "pos"), 2)
    return {
        "date": date,
        "totale": round(contanti + pos, 2),
        "contanti": contanti,
        "pos": pos,
        "count": len(payments),
        "payments": payments,
    }


# ---------------------------------------------------------------------------
# Task checklists (shared per department per date)
# ---------------------------------------------------------------------------
def _today() -> str:
    return datetime.now(timezone.utc).strftime("%Y-%m-%d")


@router.get("/tasks")
async def tasks(current=Depends(require_staff)):
    dept = current["department"]
    date = _today()
    state = await db.staff_checklist.find_one({"department": dept, "date": date}, {"_id": 0})
    return {
        "department": {"id": dept, **DEPARTMENTS.get(dept, {})},
        "per_tutti": PER_TUTTI,
        "tasks": TASKS.get(dept, {}),
        "done": (state or {}).get("done", {}),
        "date": date,
    }


class ToggleReq(BaseModel):
    phase: str
    index: int
    done: bool


@router.post("/tasks/toggle")
async def toggle_task(req: ToggleReq, current=Depends(require_staff)):
    dept = current["department"]
    date = _today()
    key = f"{req.phase}:{req.index}"
    await db.staff_checklist.update_one(
        {"department": dept, "date": date},
        {"$set": {f"done.{key}": req.done, "updated_at": now_iso()}},
        upsert=True,
    )
    state = await db.staff_checklist.find_one({"department": dept, "date": date}, {"_id": 0})
    return {"done": (state or {}).get("done", {})}


# ---------------------------------------------------------------------------
# Shifts / presenze (timbratura entrata-uscita)
# ---------------------------------------------------------------------------
@router.get("/shift/me")
async def my_shift(current=Depends(require_staff)):
    date = _today()
    shift = await db.shifts.find_one(
        {"user_id": current["user_id"], "date": date, "check_out": None}, {"_id": 0}
    )
    return {"on_duty": bool(shift), "shift": shift}


@router.post("/shift/checkin")
async def shift_checkin(current=Depends(require_staff)):
    date = _today()
    existing = await db.shifts.find_one({"user_id": current["user_id"], "date": date, "check_out": None})
    if existing:
        existing.pop("_id", None)
        return {"on_duty": True, "shift": existing}
    shift = {
        "id": f"sh-{uuid.uuid4().hex[:10]}",
        "user_id": current["user_id"],
        "name": current.get("name"),
        "department": current.get("department"),
        "date": date,
        "check_in": now_iso(),
        "check_out": None,
    }
    await db.shifts.insert_one({**shift})
    shift.pop("_id", None)
    return {"on_duty": True, "shift": shift}


@router.post("/shift/checkout")
async def shift_checkout(current=Depends(require_staff)):
    date = _today()
    await db.shifts.update_one(
        {"user_id": current["user_id"], "date": date, "check_out": None},
        {"$set": {"check_out": now_iso()}},
    )
    return {"on_duty": False}


@router.get("/shifts")
async def shifts_roster(current=Depends(require_direzione)):
    date = _today()
    open_shifts = await db.shifts.find({"date": date, "check_out": None}, {"_id": 0}).to_list(500)
    grouped: dict[str, list] = {k: [] for k in DEPARTMENTS}
    for s in open_shifts:
        grouped.setdefault(s.get("department", "direzione"), []).append(s)
    return {"date": date, "on_duty": open_shifts, "count": len(open_shifts), "grouped": grouped}



# ---------------------------------------------------------------------------
# Team management (Direzione)
# ---------------------------------------------------------------------------
class StaffCreate(BaseModel):
    name: str = Field(min_length=1, max_length=60)
    email: str
    password: str = Field(min_length=6)
    department: str
    phone: str | None = None


class StaffEdit(BaseModel):
    name: str | None = None
    email: str | None = None
    department: str | None = None
    phone: str | None = None
    is_active: bool | None = None


class PasswordReset(BaseModel):
    new_password: str = Field(min_length=6)


def _public_staff(u: dict) -> dict:
    return {
        "user_id": u.get("user_id"),
        "name": u.get("name"),
        "email": u.get("email"),
        "phone": u.get("phone"),
        "department": u.get("department"),
        "is_active": u.get("is_active", True),
        "must_change_password": bool(u.get("must_change_password", False)),
    }


@router.get("/members")
async def list_members(department: str | None = None, admin=Depends(require_direzione)):
    q: dict = {"role": "staff"}
    if department:
        if department not in DEPARTMENTS:
            raise HTTPException(status_code=400, detail="Reparto non valido")
        q["department"] = department
    members = await db.users.find(q, {"_id": 0}).sort("name", 1).to_list(500)
    grouped: dict[str, list] = {k: [] for k in DEPARTMENTS}
    for m in members:
        grouped.setdefault(m.get("department", "direzione"), []).append(_public_staff(m))
    return {"members": [_public_staff(m) for m in members], "grouped": grouped}


@router.post("/members")
async def create_member(req: StaffCreate, admin=Depends(require_direzione)):
    if req.department not in DEPARTMENTS:
        raise HTTPException(status_code=400, detail="Reparto non valido")
    email = req.email.strip().lower()
    if "@" not in email:
        raise HTTPException(status_code=400, detail="Email non valida")
    if await db.users.find_one({"email": email}):
        raise HTTPException(status_code=409, detail="Email già usata")
    user = {
        "user_id": new_user_id(),
        "name": req.name.strip(),
        "email": email,
        "phone": (req.phone or "").strip() or None,
        "password_hash": hash_password(req.password),
        "role": "staff",
        "department": req.department,
        "is_active": True,
        "must_change_password": True,
        "provider": "staff",
        "photo_url": None,
        "date_of_birth": None,
        "instagram": None,
        "created_at": now_iso(),
    }
    await db.users.insert_one(user)
    return {"member": _public_staff(user)}


@router.patch("/members/{user_id}")
async def edit_member(user_id: str, req: StaffEdit, admin=Depends(require_direzione)):
    target = await db.users.find_one({"user_id": user_id, "role": "staff"})
    if not target:
        raise HTTPException(status_code=404, detail="Membro non trovato")
    updates: dict = {}
    if req.name is not None:
        updates["name"] = req.name.strip()
    if req.email is not None:
        email = req.email.strip().lower()
        if "@" not in email:
            raise HTTPException(status_code=400, detail="Email non valida")
        clash = await db.users.find_one({"email": email, "user_id": {"$ne": user_id}})
        if clash:
            raise HTTPException(status_code=409, detail="Email già usata")
        updates["email"] = email
    if req.department is not None:
        if req.department not in DEPARTMENTS:
            raise HTTPException(status_code=400, detail="Reparto non valido")
        updates["department"] = req.department
    if req.phone is not None:
        updates["phone"] = req.phone.strip() or None
    if req.is_active is not None:
        updates["is_active"] = req.is_active
    if updates:
        await db.users.update_one({"user_id": user_id}, {"$set": updates})
    target = await db.users.find_one({"user_id": user_id}, {"_id": 0})
    return {"member": _public_staff(target)}


@router.post("/members/{user_id}/password")
async def reset_member_password(user_id: str, req: PasswordReset, admin=Depends(require_direzione)):
    res = await db.users.update_one(
        {"user_id": user_id, "role": "staff"},
        {"$set": {"password_hash": hash_password(req.new_password), "must_change_password": True}},
    )
    if res.matched_count != 1:
        raise HTTPException(status_code=404, detail="Membro non trovato")
    return {"ok": True}


@router.delete("/members/{user_id}")
async def delete_member(user_id: str, admin=Depends(require_direzione)):
    if user_id == admin["user_id"]:
        raise HTTPException(status_code=400, detail="Non puoi eliminare te stesso")
    res = await db.users.delete_one({"user_id": user_id, "role": "staff", "department": {"$ne": "direzione"}})
    if res.deleted_count != 1:
        raise HTTPException(status_code=404, detail="Membro non trovato o non eliminabile")
    return {"ok": True}


# --- Change own password (any staff) ---------------------------------------
class ChangePasswordReq(BaseModel):
    new_password: str = Field(min_length=6)


@router.post("/change-password")
async def change_own_password(req: ChangePasswordReq, current=Depends(require_staff)):
    await db.users.update_one(
        {"user_id": current["user_id"]},
        {"$set": {"password_hash": hash_password(req.new_password), "must_change_password": False}},
    )
    return {"ok": True}


# ---------------------------------------------------------------------------
# Payslips (cedolini)
# ---------------------------------------------------------------------------
class PayslipIn(BaseModel):
    user_id: str
    month: str = Field(min_length=1, max_length=40)
    url: str = Field(min_length=1)


@router.get("/payslips")
async def my_payslips(current=Depends(require_staff)):
    docs = await db.payslips.find({"user_id": current["user_id"]}, {"_id": 0}).sort("created_at", -1).to_list(100)
    return {"payslips": docs}


@router.get("/payslips/all")
async def all_payslips(admin=Depends(require_direzione)):
    docs = await db.payslips.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    return {"payslips": docs, "monthly_docs": MONTHLY_DOCS}


@router.post("/payslips")
async def assign_payslip(req: PayslipIn, admin=Depends(require_direzione)):
    target = await db.users.find_one({"user_id": req.user_id, "role": "staff"}, {"_id": 0})
    if not target:
        raise HTTPException(status_code=404, detail="Membro non trovato")
    doc = {
        "id": f"cd-{uuid.uuid4().hex[:10]}",
        "user_id": req.user_id,
        "staff_name": target.get("name"),
        "month": req.month.strip(),
        "url": req.url.strip(),
        "created_at": now_iso(),
    }
    await db.payslips.insert_one({**doc})
    doc.pop("_id", None)
    return {"payslip": doc}


@router.delete("/payslips/{payslip_id}")
async def delete_payslip(payslip_id: str, admin=Depends(require_direzione)):
    res = await db.payslips.delete_one({"id": payslip_id})
    if res.deleted_count != 1:
        raise HTTPException(status_code=404, detail="Cedolino non trovato")
    return {"ok": True}


# --- Upload a payslip PDF/image to object storage (Direzione) ---------------
from fastapi import UploadFile  # noqa: E402


@router.post("/upload")
async def upload_doc(file: UploadFile, admin=Depends(require_direzione)):
    data = await file.read()
    ext = (file.filename or "doc.pdf").rsplit(".", 1)[-1].lower()
    if ext not in ("pdf", "jpg", "jpeg", "png", "webp"):
        ext = "pdf"
    ct = file.content_type or "application/pdf"
    path = f"{APP_NAME}/cedolini/{uuid.uuid4().hex}.{ext}"
    await run_in_threadpool(put_object, path, data, ct)
    return {"url": f"/api/staff/files/{path}", "path": path}


@router.get("/files/{path:path}")
async def staff_files(path: str):
    from fastapi import Response

    try:
        content, ct = await run_in_threadpool(get_object, path)
    except Exception:
        raise HTTPException(status_code=404, detail="File non trovato")
    return Response(content=content, media_type=ct)
