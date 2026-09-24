"""Bridge to the Glitz website API.

The website (frontend/ + backend/ at the repo root) owns the public club
content: events with the 40-table floor plan, shop + Stripe checkout, news,
gallery, club areas, contacts, private events and newsletter. The app reads
and writes the same data through this module so both stay in sync, and keeps
a per-user copy of what was submitted from the app ("Le mie richieste").
"""

import logging
import os
import time
import uuid
from typing import Any, Optional

import httpx
from fastapi import APIRouter, Depends, HTTPException, Request, Response
from pydantic import BaseModel, EmailStr, Field

from club import SEED_EVENTS
from core import db, get_current_user, now_iso

SITE_URL = os.environ.get("SITE_URL", "https://glitz-nightclub.preview.emergentagent.com").rstrip("/")
SITE_API = f"{SITE_URL}/api"

router = APIRouter(prefix="/api/site")
logger = logging.getLogger("glitz.site")

_cache: dict[str, tuple[float, Any]] = {}
CACHE_SECONDS = 60


def _client_ip(request: Optional[Request]) -> Optional[str]:
    if request is None:
        return None
    fwd = request.headers.get("x-forwarded-for")
    if fwd:
        return fwd.split(",")[0].strip()
    return request.client.host if request.client else None


def _error_detail(r: httpx.Response) -> str:
    try:
        data = r.json()
        if isinstance(data, dict) and data.get("detail"):
            return str(data["detail"])
    except ValueError:
        pass
    return "Richiesta non riuscita"


async def site_call(
    method: str,
    path: str,
    *,
    params: Optional[dict] = None,
    json: Optional[dict] = None,
    request: Optional[Request] = None,
    cache: bool = False,
) -> Any:
    key = f"{path}?{sorted((params or {}).items())}"
    if cache and method == "GET":
        hit = _cache.get(key)
        if hit and time.monotonic() - hit[0] < CACHE_SECONDS:
            return hit[1]
    headers = {}
    ip = _client_ip(request)
    if ip:
        # The site rate-limits per client IP: forward the guest's, not ours.
        headers["X-Forwarded-For"] = ip
    try:
        async with httpx.AsyncClient(timeout=25) as c:
            r = await c.request(method, f"{SITE_API}{path}", params=params, json=json, headers=headers)
    except httpx.HTTPError as e:
        logger.warning("site %s %s failed: %s", method, path, e)
        raise HTTPException(status_code=502, detail="Il sito del Glitz non è raggiungibile. Riprova tra poco.")
    if r.status_code >= 400:
        raise HTTPException(status_code=r.status_code, detail=_error_detail(r))
    data = r.json() if r.content else None
    if cache and method == "GET":
        _cache[key] = (time.monotonic(), data)
    return data


# --- Events: the site is the calendar; app ticket formulas ride along -------
_APP_EVENTS_BY_DAY = {e["date"][:10]: e for e in SEED_EVENTS}
_APP_EVENTS_BY_ID = {e["id"]: e for e in SEED_EVENTS}


def _enrich(ev: Optional[dict]) -> Optional[dict]:
    if not ev:
        return ev
    app_ev = _APP_EVENTS_BY_DAY.get((ev.get("date") or "")[:10])
    ev["app_event_id"] = app_ev["id"] if app_ev else None
    ev["formulas"] = app_ev["formulas"] if app_ev else []
    return ev


@router.get("/settings")
async def settings():
    return await site_call("GET", "/settings", cache=True)


@router.get("/events")
async def events():
    items = await site_call("GET", "/events", cache=True)
    return [_enrich(e) for e in items or []]


@router.get("/events/upcoming")
async def upcoming():
    return _enrich(await site_call("GET", "/events/upcoming", cache=True))


@router.get("/events/{event_id}")
async def event_detail(event_id: str):
    app_ev = _APP_EVENTS_BY_ID.get(event_id)
    if app_ev:
        # Tickets bought in the app point at app ids: open the matching site night.
        day = app_ev["date"][:10]
        items = await site_call("GET", "/events", cache=True)
        match = next((e for e in items or [] if (e.get("date") or "")[:10] == day), None)
        if not match:
            raise HTTPException(status_code=404, detail="Evento non trovato")
        event_id = match["id"]
    # Never cached: reserved tables must be live.
    return _enrich(await site_call("GET", f"/events/{event_id}"))


@router.get("/past-events")
async def past_events():
    return await site_call("GET", "/past-events", cache=True)


@router.get("/posts")
async def posts():
    return await site_call("GET", "/posts", cache=True)


@router.get("/posts/{slug}")
async def post(slug: str):
    return await site_call("GET", f"/posts/{slug}", cache=True)


@router.get("/media")
async def media(category: Optional[str] = None):
    return await site_call("GET", "/media", params={"category": category} if category else None, cache=True)


@router.get("/faqs")
async def faqs():
    return await site_call("GET", "/faqs", cache=True)


@router.get("/products")
async def products():
    return await site_call("GET", "/products", cache=True)


@router.get("/products/{slug}")
async def product(slug: str):
    return await site_call("GET", f"/products/{slug}", cache=True)


@router.get("/asset")
async def asset(p: str):
    """Serve a site-relative image (posters, uploads, floor plans) to the app."""
    if not p.startswith("/") or p.startswith("//") or ".." in p:
        raise HTTPException(status_code=400, detail="Percorso non valido")
    try:
        async with httpx.AsyncClient(timeout=25, follow_redirects=True) as c:
            r = await c.get(f"{SITE_URL}{p}")
    except httpx.HTTPError:
        raise HTTPException(status_code=502, detail="Immagine non raggiungibile")
    ct = r.headers.get("Content-Type", "")
    if r.status_code != 200 or not ct.startswith("image/"):
        raise HTTPException(status_code=404, detail="Immagine non trovata")
    return Response(content=r.content, media_type=ct, headers={"Cache-Control": "public, max-age=86400"})


# --- Writes: forwarded to the site, mirrored per user ----------------------
async def _mirror(collection: str, user: dict, kind: str, payload: dict, result: Any) -> dict:
    doc = {
        "id": f"sr-{uuid.uuid4().hex[:10]}",
        "user_id": user["user_id"],
        "kind": kind,
        "payload": payload,
        "site_id": (result or {}).get("id") if isinstance(result, dict) else None,
        "status": (result or {}).get("status", "pending") if isinstance(result, dict) else "pending",
        "created_at": now_iso(),
    }
    await db[collection].insert_one({**doc})
    return doc


class BookingIn(BaseModel):
    name: str = Field(min_length=1, max_length=80)
    phone: str = Field(min_length=5, max_length=30)
    email: Optional[EmailStr] = None
    guests: int = Field(default=2, ge=1, le=30)
    event_id: Optional[str] = None
    event_title: Optional[str] = None
    table_number: Optional[str] = None
    zone: Optional[str] = None
    note: str = Field(default="", max_length=500)


@router.post("/bookings")
async def create_booking(body: BookingIn, request: Request, current=Depends(get_current_user)):
    payload = body.model_dump()
    result = await site_call("POST", "/bookings", json=payload, request=request)
    await _mirror("site_requests", current, "booking", payload, result)
    return result


class ShopItem(BaseModel):
    product_id: str
    product_name: str
    unit_price: float = Field(ge=0)
    quantity: int = Field(ge=1, le=100)
    size: Optional[str] = None


class ShopOrderIn(BaseModel):
    items: list[ShopItem] = Field(min_length=1)
    name: str = Field(min_length=1, max_length=80)
    phone: str = Field(min_length=5, max_length=30)
    email: Optional[EmailStr] = None
    address: Optional[str] = None
    shipping_method: str = "spedizione"
    note: Optional[str] = None


@router.post("/orders")
async def create_shop_order(body: ShopOrderIn, request: Request, current=Depends(get_current_user)):
    payload = body.model_dump()
    payload["total"] = round(sum(i.unit_price * i.quantity for i in body.items), 2)
    result = await site_call("POST", "/orders", json=payload, request=request)
    await _mirror("site_requests", current, "shop_order", payload, result)
    return result


class CheckoutIn(BaseModel):
    slug: str
    quantity: int = Field(default=1, ge=1, le=20)
    size: Optional[str] = None


@router.post("/checkout")
async def checkout(body: CheckoutIn, request: Request, current=Depends(get_current_user)):
    result = await site_call(
        "POST",
        "/payments/checkout",
        json={
            "lookup_key": body.slug,
            "quantity": body.quantity,
            # Stripe returns to the site's own success/cancel pages.
            "origin_url": SITE_URL,
            "metadata": {"product_slug": body.slug, "size": body.size or "", "app_user_id": current["user_id"]},
        },
        request=request,
    )
    await _mirror("site_requests", current, "payment", {**body.model_dump(), "session_id": result.get("session_id")}, {"status": "initiated"})
    return result


@router.get("/payments/{session_id}")
async def payment_status(session_id: str, current=Depends(get_current_user)):
    owned = await db.site_requests.find_one(
        {"user_id": current["user_id"], "kind": "payment", "payload.session_id": session_id}, {"_id": 0}
    )
    if not owned:
        raise HTTPException(status_code=404, detail="Pagamento non trovato")
    status = await site_call("GET", f"/payments/status/{session_id}")
    new_status = "paid" if status.get("payment_status") == "paid" else status.get("status", "initiated")
    await db.site_requests.update_one({"id": owned["id"]}, {"$set": {"status": new_status}})
    return status


class PrivateEventIn(BaseModel):
    area: str
    name: str = Field(min_length=1, max_length=80)
    email: EmailStr
    phone: str = Field(min_length=5, max_length=30)
    event_date: str
    guests: int = Field(ge=1, le=2500)
    occasion: str
    budget: Optional[str] = None
    message: Optional[str] = None


@router.post("/private-events")
async def private_event(body: PrivateEventIn, request: Request, current=Depends(get_current_user)):
    payload = body.model_dump()
    result = await site_call("POST", "/private-events", json=payload, request=request)
    await _mirror("site_requests", current, "private_event", payload, {**(result or {}), "status": "new"})
    return result


class NewsletterIn(BaseModel):
    email: EmailStr


@router.post("/newsletter")
async def newsletter(body: NewsletterIn, request: Request):
    return await site_call("POST", "/newsletter/subscribe", json={"email": body.email}, request=request)


@router.get("/my")
async def my_requests(current=Depends(get_current_user)):
    docs = await db.site_requests.find({"user_id": current["user_id"]}, {"_id": 0}).sort("created_at", -1).to_list(200)
    return {"requests": docs}
