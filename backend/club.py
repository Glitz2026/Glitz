import uuid
from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException, Response, UploadFile
from fastapi.concurrency import run_in_threadpool
from pydantic import BaseModel

from core import APP_NAME, db, get_current_user, get_object, now_iso, put_object

router = APIRouter(prefix="/api")

# Reused club imagery (dark nightclub tones).
_IMG_A = "https://images.unsplash.com/photo-1545128485-c400e7702796?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMjh8MHwxfHNlYXJjaHwxfHxyZWQlMjBuZW9uJTIwbmlnaHRjbHViJTIwbGlnaHRzJTIwZGFya3xlbnwwfHx8fDE3ODk2NjI2NzN8MA&ixlib=rb-4.1.0&q=85"
_IMG_B = "https://images.unsplash.com/photo-1559999831-7deaf136d4a9?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODl8MHwxfHNlYXJjaHwyfHxhYnN0cmFjdCUyMHJlZCUyMGdsaXRjaCUyMGFydCUyMGRhcmt8ZW58MHx8fHwxNzg5NjYyNjczfDA&ixlib=rb-4.1.0&q=85"

SEED_EVENTS = [
    {
        "id": "ev-01",
        "title": "GLITZ x A.I. — OPENING NIGHT",
        "date": "2026-06-27T23:00:00",
        "guest": "DJ VELVETA · live set",
        "genre": "House / Reggaeton",
        "cover": _IMG_A,
        "price_from": 20,
        "description": "La notte in cui il club ti riconosce. A.I. accende voto musicale, NON PREMERE e IL POTERE.",
        "formulas": [
            {"id": "std", "label": "Ingresso", "price": 20, "includes": "Accesso pista"},
            {"id": "drink", "label": "Ingresso + Drink", "price": 30, "includes": "Accesso + 1 consumazione"},
        ],
    },
    {
        "id": "ev-02",
        "title": "CHAOS — REGGAETON EDITION",
        "date": "2026-07-04T23:30:00",
        "guest": "GALA b2b NINA",
        "genre": "Reggaeton / Latin",
        "cover": _IMG_B,
        "price_from": 25,
        "description": "Dieci minuti di reggaeton non bastano mai. Sfide tra tavoli e dediche live.",
        "formulas": [
            {"id": "std", "label": "Ingresso", "price": 25, "includes": "Accesso pista"},
            {"id": "drink", "label": "Ingresso + Drink", "price": 35, "includes": "Accesso + 1 consumazione"},
        ],
    },
    {
        "id": "ev-03",
        "title": "BACK TO 2000",
        "date": "2026-07-11T23:00:00",
        "guest": "GIGI D'AGOSTINO tribute",
        "genre": "2000s / Dance",
        "cover": _IMG_A,
        "price_from": 20,
        "description": "Un salto negli anni Duemila. Le hit che canti a memoria, luci e visual coordinati.",
        "formulas": [
            {"id": "std", "label": "Ingresso", "price": 20, "includes": "Accesso pista"},
            {"id": "drink", "label": "Ingresso + Drink", "price": 30, "includes": "Accesso + 1 consumazione"},
        ],
    },
]

SEED_ZONES = [
    {"id": "z-venere", "name": "TAVOLO VENERE", "area": "Privé centrale", "seats": 8, "price": 400, "bottles": 2, "available": True},
    {"id": "z-chaos", "name": "TAVOLO CHAOS", "area": "Balconata pista", "seats": 6, "price": 300, "bottles": 1, "available": True},
    {"id": "z-luna", "name": "TAVOLO LUNA", "area": "Angolo lounge", "seats": 10, "price": 550, "bottles": 3, "available": True},
    {"id": "z-nova", "name": "TAVOLO NOVA", "area": "Fronte consolle", "seats": 4, "price": 250, "bottles": 1, "available": False},
]

SEED_MENU = [
    {
        "category": "SIGNATURE",
        "items": [
            {"id": "m-01", "name": "Glitz Spritz", "price": 12, "desc": "Bitter rosso, bollicine, agrumi", "alcoholic": True},
            {"id": "m-02", "name": "Neon Sour", "price": 13, "desc": "Gin, lime, sciroppo acido", "alcoholic": True},
        ],
    },
    {
        "category": "ANALCOLICI",
        "items": [
            {"id": "m-03", "name": "Cherry Zero", "price": 7, "desc": "Ciliegia, soda, lime", "alcoholic": False},
            {"id": "m-04", "name": "Acqua premium", "price": 4, "desc": "Naturale o frizzante", "alcoholic": False},
        ],
    },
    {
        "category": "BOTTIGLIE",
        "items": [
            {"id": "m-05", "name": "Vodka premium", "price": 120, "desc": "Con mixer inclusi", "alcoholic": True},
            {"id": "m-06", "name": "Champagne", "price": 160, "desc": "Brut, secchiello e ghiaccio", "alcoholic": True},
            {"id": "m-07", "name": "Gin premium", "price": 130, "desc": "Con toniche e guarnizioni", "alcoholic": True},
            {"id": "m-08", "name": "Rum invecchiato", "price": 125, "desc": "Con mixer e agrumi", "alcoholic": True},
            {"id": "m-09", "name": "Tequila reposado", "price": 140, "desc": "Con lime e sale", "alcoholic": True},
            {"id": "m-10", "name": "Prosecco", "price": 90, "desc": "Secchiello e ghiaccio", "alcoholic": True},
        ],
    },
]


async def seed_club() -> None:
    if await db.events.count_documents({}) == 0:
        await db.events.insert_many([{**e} for e in SEED_EVENTS])


def _clean(doc: dict) -> dict:
    doc.pop("_id", None)
    return doc


# --- Events ----------------------------------------------------------------
@router.get("/events")
async def list_events(current=Depends(get_current_user)):
    events = await db.events.find({}, {"_id": 0}).sort("date", 1).to_list(100)
    return {"events": events}


@router.get("/events/{event_id}")
async def get_event(event_id: str, current=Depends(get_current_user)):
    ev = await db.events.find_one({"id": event_id}, {"_id": 0})
    if not ev:
        raise HTTPException(status_code=404, detail="Evento non trovato")
    return {"event": ev}


# --- Tickets ---------------------------------------------------------------
class BuyTicketReq(BaseModel):
    event_id: str
    formula_id: str


@router.post("/tickets")
async def buy_ticket(req: BuyTicketReq, current=Depends(get_current_user)):
    ev = await db.events.find_one({"id": req.event_id}, {"_id": 0})
    if not ev:
        raise HTTPException(status_code=404, detail="Evento non trovato")
    formula = next((f for f in ev["formulas"] if f["id"] == req.formula_id), None)
    if not formula:
        raise HTTPException(status_code=400, detail="Formula non valida")
    code = f"GLITZ-{uuid.uuid4().hex[:8].upper()}"
    ticket = {
        "id": f"tk-{uuid.uuid4().hex[:10]}",
        "user_id": current["user_id"],
        "event_id": ev["id"],
        "event_title": ev["title"],
        "event_date": ev["date"],
        "event_cover": ev["cover"],
        "formula_label": formula["label"],
        "price": formula["price"],
        "code": code,
        "status": "active",
        "created_at": now_iso(),
    }
    await db.tickets.insert_one({**ticket})
    return {"ticket": ticket}


@router.get("/tickets")
async def my_tickets(current=Depends(get_current_user)):
    tickets = await db.tickets.find({"user_id": current["user_id"]}, {"_id": 0}).sort("created_at", -1).to_list(100)
    return {"tickets": tickets}


# --- Tables ----------------------------------------------------------------
class TableReq(BaseModel):
    zone_id: str
    event_id: str | None = None
    people: int = 4
    occasion: str | None = None
    note: str | None = None


@router.get("/tables/zones")
async def zones(current=Depends(get_current_user)):
    return {"zones": SEED_ZONES}


@router.post("/table-requests")
async def create_table_request(req: TableReq, current=Depends(get_current_user)):
    zone = next((z for z in SEED_ZONES if z["id"] == req.zone_id), None)
    if not zone:
        raise HTTPException(status_code=404, detail="Tavolo non trovato")
    tr = {
        "id": f"tr-{uuid.uuid4().hex[:10]}",
        "user_id": current["user_id"],
        "zone_id": zone["id"],
        "zone_name": zone["name"],
        "event_id": req.event_id,
        "people": req.people,
        "occasion": req.occasion,
        "note": req.note,
        "status": "pending",
        "created_at": now_iso(),
    }
    await db.table_requests.insert_one({**tr})
    return {"request": tr}


@router.get("/table-requests")
async def my_table_requests(current=Depends(get_current_user)):
    reqs = await db.table_requests.find({"user_id": current["user_id"]}, {"_id": 0}).sort("created_at", -1).to_list(100)
    return {"requests": reqs}


# --- Menu ------------------------------------------------------------------
@router.get("/menu")
async def menu(current=Depends(get_current_user)):
    return {"menu": SEED_MENU}


# --- Friends / groups ------------------------------------------------------
class CreateGroupReq(BaseModel):
    name: str
    event_id: str | None = None


class JoinGroupReq(BaseModel):
    code: str


def _member(current: dict, organizer: bool = False) -> dict:
    return {
        "user_id": current["user_id"],
        "name": current.get("name"),
        "photo_url": current.get("photo_url"),
        "organizer": organizer,
    }


@router.post("/groups")
async def create_group(req: CreateGroupReq, current=Depends(get_current_user)):
    group = {
        "id": f"gr-{uuid.uuid4().hex[:10]}",
        "name": req.name.strip()[:40] or "Il mio gruppo",
        "event_id": req.event_id,
        "invite_code": uuid.uuid4().hex[:6].upper(),
        "members": [_member(current, organizer=True)],
        "created_at": now_iso(),
    }
    await db.groups.insert_one({**group})
    return {"group": group}


@router.post("/groups/join")
async def join_group(req: JoinGroupReq, current=Depends(get_current_user)):
    group = await db.groups.find_one({"invite_code": req.code.strip().upper()}, {"_id": 0})
    if not group:
        raise HTTPException(status_code=404, detail="Codice non valido")
    if not any(m["user_id"] == current["user_id"] for m in group["members"]):
        group["members"].append(_member(current))
        await db.groups.update_one({"id": group["id"]}, {"$set": {"members": group["members"]}})
    return {"group": group}


@router.get("/groups")
async def my_groups(current=Depends(get_current_user)):
    groups = await db.groups.find(
        {"members.user_id": current["user_id"]}, {"_id": 0}
    ).sort("created_at", -1).to_list(50)
    return {"groups": groups}


# --- Help ------------------------------------------------------------------
class HelpReq(BaseModel):
    type: str
    zone: str | None = None
    note: str | None = None


@router.post("/help")
async def create_help(req: HelpReq, current=Depends(get_current_user)):
    h = {
        "id": f"hp-{uuid.uuid4().hex[:10]}",
        "user_id": current["user_id"],
        "type": req.type,
        "zone": req.zone,
        "note": req.note,
        "status": "received",
        "created_at": now_iso(),
    }
    await db.help_requests.insert_one({**h})
    return {"request": h}


@router.get("/help")
async def my_help(current=Depends(get_current_user)):
    reqs = await db.help_requests.find({"user_id": current["user_id"]}, {"_id": 0}).sort("created_at", -1).to_list(50)
    return {"requests": reqs}


# --- La mia serata (aggregate) --------------------------------------------
@router.get("/my-night")
async def my_night(current=Depends(get_current_user)):
    tickets = await db.tickets.find({"user_id": current["user_id"]}, {"_id": 0}).sort("event_date", 1).to_list(100)
    now = datetime.now(timezone.utc).isoformat()
    upcoming = [t for t in tickets if t["event_date"] >= now[:19]]
    next_ticket = upcoming[0] if upcoming else (tickets[0] if tickets else None)
    table = await db.table_requests.find_one({"user_id": current["user_id"]}, {"_id": 0}, sort=[("created_at", -1)])
    group = await db.groups.find_one({"members.user_id": current["user_id"]}, {"_id": 0}, sort=[("created_at", -1)])
    return {"next_ticket": next_ticket, "table": table, "group": group, "spend": 0}


# --- Waiter calls & orders (table service) --------------------------------
def _elapsed_seconds(iso: str) -> float:
    try:
        t = datetime.fromisoformat(iso)
        if t.tzinfo is None:
            t = t.replace(tzinfo=timezone.utc)
        return (datetime.now(timezone.utc) - t).total_seconds()
    except Exception:
        return 0.0


def _order_status(created_at: str) -> str:
    e = _elapsed_seconds(created_at)
    if e < 25:
        return "received"
    if e < 75:
        return "preparing"
    return "ready"


def _call_status(created_at: str) -> str:
    return "sent" if _elapsed_seconds(created_at) < 12 else "taken_in_charge"


WAITER_TYPES = ["acqua", "ghiaccio", "mixer", "nuovo_ordine", "pulizia", "assistenza"]


class WaiterCallReq(BaseModel):
    type: str
    zone: str | None = None


@router.post("/waiter-calls")
async def create_waiter_call(req: WaiterCallReq, current=Depends(get_current_user)):
    if req.type not in WAITER_TYPES:
        raise HTTPException(status_code=400, detail="Tipo non valido")
    call = {
        "id": f"wc-{uuid.uuid4().hex[:10]}",
        "user_id": current["user_id"],
        "type": req.type,
        "zone": req.zone,
        "created_at": now_iso(),
    }
    await db.waiter_calls.insert_one({**call})
    return {"call": {**call, "status": _call_status(call["created_at"])}}


@router.get("/waiter-calls")
async def my_waiter_calls(current=Depends(get_current_user)):
    calls = await db.waiter_calls.find({"user_id": current["user_id"]}, {"_id": 0}).sort("created_at", -1).to_list(50)
    for c in calls:
        c["status"] = _call_status(c["created_at"])
    return {"calls": calls}


class OrderItem(BaseModel):
    id: str
    name: str
    price: float
    qty: int


class CreateOrderReq(BaseModel):
    items: list[OrderItem]
    zone: str | None = None


@router.post("/orders")
async def create_order(req: CreateOrderReq, current=Depends(get_current_user)):
    items = [i.model_dump() for i in req.items if i.qty > 0]
    if not items:
        raise HTTPException(status_code=400, detail="Carrello vuoto")
    total = round(sum(i["price"] * i["qty"] for i in items), 2)
    order = {
        "id": f"or-{uuid.uuid4().hex[:10]}",
        "user_id": current["user_id"],
        "items": items,
        "total": total,
        "zone": req.zone,
        "created_at": now_iso(),
    }
    await db.orders.insert_one({**order})
    return {"order": {**order, "status": _order_status(order["created_at"])}}


@router.get("/orders")
async def my_orders(current=Depends(get_current_user)):
    orders = await db.orders.find({"user_id": current["user_id"]}, {"_id": 0}).sort("created_at", -1).to_list(50)
    for o in orders:
        o["status"] = _order_status(o["created_at"])
    return {"orders": orders}


# --- Media (profile photos) ------------------------------------------------
@router.post("/upload")
async def upload(file: UploadFile, current=Depends(get_current_user)):
    data = await file.read()
    ext = (file.filename or "img.jpg").rsplit(".", 1)[-1].lower()
    if ext not in ("jpg", "jpeg", "png", "webp", "heic"):
        ext = "jpg"
    ct = file.content_type or "image/jpeg"
    path = f"{APP_NAME}/uploads/{current['user_id']}/{uuid.uuid4().hex}.{ext}"
    await run_in_threadpool(put_object, path, data, ct)
    return {"url": f"/api/files/{path}", "path": path}


@router.get("/files/{path:path}")
async def files(path: str):
    try:
        content, ct = await run_in_threadpool(get_object, path)
    except Exception:
        raise HTTPException(status_code=404, detail="File non trovato")
    return Response(content=content, media_type=ct)
