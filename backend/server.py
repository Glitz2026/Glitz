from fastapi import FastAPI, APIRouter, HTTPException, Depends, UploadFile, File, Header, Query
from fastapi.responses import Response, PlainTextResponse
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import re
import ipaddress
import logging
import uuid
import bcrypt
import jwt
import httpx
import requests
from pathlib import Path
from html import escape
from html.parser import HTMLParser
from urllib.parse import urlparse
from pydantic import BaseModel, Field, EmailStr, ConfigDict
from typing import List, Optional
from datetime import datetime, timezone, timedelta


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# ---------- Config ----------
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

JWT_SECRET = os.environ['JWT_SECRET']
JWT_ALGORITHM = os.environ.get('JWT_ALGORITHM', 'HS256')
JWT_EXPIRE_HOURS = int(os.environ.get('JWT_EXPIRE_HOURS', 168))
ADMIN_EMAIL = os.environ['ADMIN_EMAIL']
ADMIN_PASSWORD = os.environ['ADMIN_PASSWORD']

# Email
EMAIL_BASE_URL = "https://integrations.emergentagent.com"
EMAIL_KEY = os.environ['EMERGENT_EMAIL_KEY']
EMAIL_FROM_NAME = os.environ['EMAIL_FROM_NAME']
EMAIL_REPLY_TO = os.environ.get('EMAIL_REPLY_TO')

# Storage
STORAGE_BASE = (os.environ.get("INTEGRATION_PROXY_URL") or "").strip() or "https://integrations.emergentagent.com"
STORAGE_URL = STORAGE_BASE.rstrip("/") + "/objstore/api/v1/storage"
EMERGENT_KEY = os.environ.get("EMERGENT_LLM_KEY")
APP_NAME = os.environ.get("APP_NAME", "glitzclub")
_storage_key = None


def init_storage(force: bool = False):
    global _storage_key
    if _storage_key and not force:
        return _storage_key
    try:
        resp = requests.post(f"{STORAGE_URL}/init", json={"emergent_key": EMERGENT_KEY}, timeout=30)
        resp.raise_for_status()
        _storage_key = resp.json()["storage_key"]
        return _storage_key
    except Exception as e:
        logging.error(f"Storage init failed: {e}")
        return None


def put_object(path: str, data: bytes, content_type: str) -> dict:
    key = init_storage()
    if not key:
        raise HTTPException(status_code=503, detail="Storage not available")
    resp = requests.put(
        f"{STORAGE_URL}/objects/{path}",
        headers={"X-Storage-Key": key, "Content-Type": content_type},
        data=data, timeout=120
    )
    if resp.status_code == 404:
        # Key may have gone dead - refresh once
        key = init_storage(force=True)
        resp = requests.put(
            f"{STORAGE_URL}/objects/{path}",
            headers={"X-Storage-Key": key, "Content-Type": content_type},
            data=data, timeout=120
        )
    resp.raise_for_status()
    return resp.json()


def get_object(path: str) -> tuple[bytes, str]:
    key = init_storage()
    resp = requests.get(f"{STORAGE_URL}/objects/{path}", headers={"X-Storage-Key": key}, timeout=60)
    if resp.status_code == 404:
        key = init_storage(force=True)
        resp = requests.get(f"{STORAGE_URL}/objects/{path}", headers={"X-Storage-Key": key}, timeout=60)
    resp.raise_for_status()
    return resp.content, resp.headers.get("Content-Type", "application/octet-stream")


# ---------- Email Guardrails ----------
_SHORTENERS = ("bit.ly", "tinyurl.com", "t.co", "is.gd", "cutt.ly", "goo.gl", "rebrand.ly")
_CRED_ASK = ("reply with your password", "reply with the code", "send your password", "cvv",
             "send us your password", "enter your password below", "confirm your card number",
             "your full card number", "seed phrase", "recovery phrase", "verify your card",
             "social security number", "confirm your bank details")
_HOSTISH = re.compile(r"\b(?:https?://)?((?:[a-z0-9-]+\.)+[a-z]{2,})", re.I)


def _host_ok(host: str) -> bool:
    if not host or "xn--" in host:
        return False
    try:
        ipaddress.ip_address(host)
        return False
    except ValueError:
        pass
    return not any(host == s or host.endswith("." + s) for s in _SHORTENERS)


def _same_site(shown: str, real: str) -> bool:
    return shown == real or real.endswith("." + shown) or shown.endswith("." + real)


class _EmailScan(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tags, self.urls, self.anchors = set(), [], []
        self._href, self._text = None, []
    def handle_starttag(self, tag, attrs):
        self.tags.add(tag.lower())
        self.urls += [v for k, v in attrs if k.lower() in ("href", "src") and v]
        if tag.lower() == "a":
            self._href = dict((k.lower(), v) for k, v in attrs).get("href")
            self._text = []
    def handle_data(self, data):
        if self._href is not None:
            self._text.append(data)
    def handle_endtag(self, tag):
        if tag.lower() == "a" and self._href is not None:
            self.anchors.append((self._href, "".join(self._text)))
            self._href, self._text = None, []


def _assert_safe_email(subject: str, html: str) -> None:
    scan = _EmailScan(); scan.feed(html)
    if scan.tags & {"form", "input", "textarea", "select"}:
        raise ValueError("No forms or input fields in email (G2)")
    body = f"{subject}\n{html}".lower()
    for p in _CRED_ASK:
        if p in body:
            raise ValueError(f"Email asks for credentials: {p!r} (G2)")
    for url in scan.urls:
        low = url.strip().lower()
        if low.startswith(("mailto:", "tel:", "cid:", "#")):
            continue
        if not low.startswith("https://"):
            raise ValueError(f"Email links/assets must be https: {url!r} (G3)")
        host = urlparse(low).hostname or ""
        if not _host_ok(host) or urlparse(low).username is not None:
            raise ValueError(f"Bad URL: {url!r} (G3)")
    for href, text in scan.anchors:
        real = urlparse(href.strip().lower()).hostname or ""
        if not real:
            continue
        for m in _HOSTISH.finditer(text):
            if not _same_site(m.group(1).lower(), real):
                raise ValueError(f"Anchor {m.group(1)!r} ≠ real host {real!r} (G3)")


async def send_email(*, to: str, subject: str, html: str) -> Optional[str]:
    _assert_safe_email(subject, html)
    payload = {"to": [to], "subject": subject, "html": html, "from_name": EMAIL_FROM_NAME}
    if EMAIL_REPLY_TO:
        payload["contact_email"] = EMAIL_REPLY_TO
    try:
        async with httpx.AsyncClient(timeout=30) as c:
            resp = await c.post(f"{EMAIL_BASE_URL}/api/v1/email/send",
                                headers={"X-Email-Key": EMAIL_KEY}, json=payload)
        resp.raise_for_status()
        return resp.json().get("id")
    except Exception as e:
        logging.error(f"Email send error: {e}")
        return None


# ---------- Auth ----------
security = HTTPBearer()


def hash_password(pw: str) -> str:
    return bcrypt.hashpw(pw.encode(), bcrypt.gensalt()).decode()


def verify_password(pw: str, hashed: str) -> bool:
    try:
        return bcrypt.checkpw(pw.encode(), hashed.encode())
    except Exception:
        return False


def create_token(email: str) -> str:
    payload = {
        "sub": email,
        "exp": datetime.now(timezone.utc) + timedelta(hours=JWT_EXPIRE_HOURS),
        "iat": datetime.now(timezone.utc),
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)


async def get_admin(creds: HTTPAuthorizationCredentials = Depends(security)):
    try:
        payload = jwt.decode(creds.credentials, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        email = payload.get("sub")
        if not email:
            raise HTTPException(status_code=401, detail="Invalid token")
        user = await db.admins.find_one({"email": email}, {"_id": 0})
        if not user:
            raise HTTPException(status_code=401, detail="Admin not found")
        return user
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid token")


# ---------- Models ----------
class LoginIn(BaseModel):
    email: EmailStr
    password: str


class EventIn(BaseModel):
    title: str
    date: str  # ISO
    lineup: List[str] = []
    description: str = ""
    poster_url: str = ""
    gallery: List[str] = []
    ticket_url: str = ""
    location: str = "Contrada Dino, San Nicola Arcella (CS)"
    published: bool = True
    floorplan_enabled: bool = False


class EventOut(EventIn):
    id: str
    created_at: str


class PostIn(BaseModel):
    title: str
    slug: str
    excerpt: str = ""
    cover_url: str = ""
    body: str
    tags: List[str] = []
    published: bool = True


class PostOut(PostIn):
    id: str
    created_at: str


class FAQIn(BaseModel):
    question: str
    answer: str
    order: int = 0


class FAQOut(FAQIn):
    id: str


class MediaOut(BaseModel):
    id: str
    url: str
    filename: str
    content_type: str
    size: int
    category: str = "gallery"
    caption: str = ""
    event_id: Optional[str] = None
    created_at: str


class NewsletterIn(BaseModel):
    email: EmailStr


class SettingsIn(BaseModel):
    hero_video_url: str = ""
    hero_image_url: str = ""
    logo_url: str = ""
    logo_dark_url: str = ""
    instagram_url: str = "https://instagram.com/glitzclubofficial"
    instagram_posts: List[dict] = []


class TableRequestIn(BaseModel):
    event_id: str
    table_number: int
    name: str
    guests: int = 2
    phone: str = ""


# ---------- App ----------
app = FastAPI()
api = APIRouter(prefix="/api")


@api.get("/")
async def root():
    return {"status": "ok", "app": "Glitz Club API"}


# --- Settings ---
DEFAULT_SETTINGS = {
    "id": "main",
    "hero_video_url": "",
    "hero_image_url": "https://customer-assets-gfyr7b9c.emergentagent.net/job_glitz-nightclub/artifacts/9c0lj4wr_PHOTO-2025-09-16-12-45-38%202.jpg",
    "logo_url": "https://d2fa23zcjd5klo.cloudfront.net/logo/venue/f451dc94-c58d-450f-938f-3ec98a0c1e73.jpg",
    "logo_dark_url": "",
    "instagram_url": "https://instagram.com/glitzclubofficial",
    "instagram_posts": [
        {"image": "https://customer-assets-gfyr7b9c.emergentagent.net/job_glitz-nightclub/artifacts/6lina1we_PHOTO-2025-09-16-12-45-39.jpg", "url": "https://instagram.com/glitzclubofficial"},
        {"image": "https://customer-assets-gfyr7b9c.emergentagent.net/job_glitz-nightclub/artifacts/ppzjzi3q_PHOTO-2025-09-16-12-45-39%202.jpg", "url": "https://instagram.com/glitzclubofficial"},
        {"image": "https://customer-assets-gfyr7b9c.emergentagent.net/job_glitz-nightclub/artifacts/tzd5z52p_PHOTO-2025-09-16-12-45-38.jpg", "url": "https://instagram.com/glitzclubofficial"},
        {"image": "https://customer-assets-gfyr7b9c.emergentagent.net/job_glitz-nightclub/artifacts/97nlxf8c_PHOTO-2025-09-16-12-45-38%203.jpg", "url": "https://instagram.com/glitzclubofficial"},
        {"image": "https://customer-assets-gfyr7b9c.emergentagent.net/job_glitz-nightclub/artifacts/9c0lj4wr_PHOTO-2025-09-16-12-45-38%202.jpg", "url": "https://instagram.com/glitzclubofficial"},
        {"image": "https://d9x0j4yxg9m18.cloudfront.net/venue/5388ae92-425d-4037-8928-728162e874bf.jpg", "url": "https://instagram.com/glitzclubofficial"},
    ],
}


# Past events (from ticketsms.it/it/location/glitz-club)
PAST_EVENT_SEED = [
    {"title": "Ludwig", "date": "2026-08-08", "poster": "https://d2fa23zcjd5klo.cloudfront.net/square/event/84f2f095-7e2f-4adf-9f95-1b3f38d86ed6.jpg", "url": "https://www.ticketsms.it/event/Ludwig-San-Nicola-Arcella-Glitz-Club-08-08-2026"},
    {"title": "Mamacita", "date": "2026-08-01", "poster": "https://d2fa23zcjd5klo.cloudfront.net/square/event/57cacddc-406d-4602-8427-f946907a1e08.jpg", "url": "https://www.ticketsms.it/event/Mamacita-San-Nicola-Arcella-Glitz-Club-01-08-2026"},
    {"title": "Thalab", "date": "2026-07-25", "poster": "https://d2fa23zcjd5klo.cloudfront.net/square/event/6c514d8e-b3ee-4636-afc7-226de8cf873c.jpg", "url": "https://www.ticketsms.it/event/Thalab-San-Nicola-Arcella-Glitz-Club-25-07-2026"},
    {"title": "Ladies Night", "date": "2026-07-18", "poster": "https://d2fa23zcjd5klo.cloudfront.net/square/event/0282df7f-b0e9-4452-82dd-d5d00d9d58b2.jpg", "url": "https://www.ticketsms.it/event/Ladies-Night-San-Nicola-Arcella-Glitz-Club-18-07-2026"},
    {"title": "James Carter", "date": "2026-07-11", "poster": "https://d2fa23zcjd5klo.cloudfront.net/square/event/621efd94-7b73-4305-a45b-537004ae8b61.jpg", "url": "https://www.ticketsms.it/event/James-Carter-San-Nicola-Arcella-Glitz-Club-11-07-2026"},
    {"title": "Black Party with Wonik", "date": "2026-07-04", "poster": "https://d2fa23zcjd5klo.cloudfront.net/square/event/71bc6a43-379d-4531-a338-423f8ab8ad7d.jpg", "url": "https://www.ticketsms.it/event/Black-Party-With-Wonik-San-Nicola-Arcella-Glitz-Club-04-07-2026"},
    {"title": "Cristian Marchi — Opening Party", "date": "2026-06-27", "poster": "https://d2fa23zcjd5klo.cloudfront.net/square/event/1d0446c1-d438-4fc9-b0de-32c4826229a0.jpg", "url": "https://www.ticketsms.it/event/Cristian-Marchi-Opening-Party-San-Nicola-Arcella-Glitz-Club-27-06-2026"},
    {"title": "Ludovica Pagani", "date": "2025-08-23", "poster": "https://d2fa23zcjd5klo.cloudfront.net/square/event/eec8f70a-143e-4ccf-9860-066f9b5b842a.jpg", "url": "https://www.ticketsms.it/event/Ludovica-Pagani-San-Nicola-Arcella-Glitz-Club-23-08-2025"},
    {"title": "Timeless with Wonik", "date": "2025-08-16", "poster": "https://d2fa23zcjd5klo.cloudfront.net/square/event/2b854da4-9857-46f3-abe0-65ae5aee4941.jpg", "url": "https://www.ticketsms.it/event/Timeless-With-Wonik-San-Nicola-Arcella-Glitz-Club-16-08-2025"},
    {"title": "Damante", "date": "2025-08-11", "poster": "https://d2fa23zcjd5klo.cloudfront.net/square/event/a56e8657-249c-420d-88fa-fc5d92cf3b39.jpg", "url": "https://www.ticketsms.it/event/Damante-San-Nicola-Arcella-Glitz-Club-11-08-2025"},
    {"title": "Goodboys", "date": "2025-08-02", "poster": "https://d2fa23zcjd5klo.cloudfront.net/square/event/b873b391-57e7-493f-8d5c-3870299d13ee.jpg", "url": "https://www.ticketsms.it/event/Cristian-Marchi-San-Nicola-Arcella-Glitz-Club-02-08-2025"},
    {"title": "Georgia Mos", "date": "2025-07-26", "poster": "https://d2fa23zcjd5klo.cloudfront.net/square/event/12cdebfa-7c10-485b-8ff0-1bae8d47bcf6.jpg", "url": "https://www.ticketsms.it/event/HYQYxdKl"},
    {"title": "Asia Nardi", "date": "2025-07-12", "poster": "https://d2fa23zcjd5klo.cloudfront.net/square/event/9d004cee-5b07-46d2-ae2a-b7220e6f00af.jpg", "url": "https://www.ticketsms.it/event/Asia-Nardi-San-Nicola-Arcella-Glitz-Club-12-07-2025"},
]


@api.get("/settings")
async def get_settings():
    s = await db.settings.find_one({"id": "main"}, {"_id": 0})
    return s or DEFAULT_SETTINGS


@api.get("/past-events")
async def list_past_events():
    return await db.past_events.find({}, {"_id": 0}).sort("date", -1).to_list(1000)


@api.put("/admin/settings")
async def update_settings(data: SettingsIn, admin=Depends(get_admin)):
    doc = data.model_dump()
    doc["id"] = "main"
    await db.settings.update_one({"id": "main"}, {"$set": doc}, upsert=True)
    return doc


# --- Table reservations (floorplan) ---
@api.post("/table-requests")
async def create_table_request(data: TableRequestIn):
    ev = await db.events.find_one({"id": data.event_id, "floorplan_enabled": True})
    if not ev:
        raise HTTPException(status_code=400, detail="Piantina non attiva per questo evento")
    doc = data.model_dump()
    doc["id"] = str(uuid.uuid4())
    doc["event_title"] = ev["title"]
    doc["status"] = "pending"
    doc["created_at"] = datetime.now(timezone.utc).isoformat()
    await db.table_requests.insert_one(doc)
    doc.pop("_id", None)
    return doc


@api.get("/admin/table-requests")
async def list_table_requests(admin=Depends(get_admin)):
    return await db.table_requests.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)


# --- SEO: sitemap + robots ---
@api.get("/sitemap.xml", response_class=Response)
async def sitemap():
    base = "https://glitzclub.it"
    events = await db.events.find({"published": True}, {"_id": 0, "id": 1}).to_list(1000)
    posts = await db.posts.find({"published": True}, {"_id": 0, "slug": 1, "created_at": 1}).to_list(1000)
    urls = [(f"{base}/", "daily", "1.0"),
            (f"{base}/eventi", "daily", "0.9"),
            (f"{base}/news", "weekly", "0.7"),
            (f"{base}/gallery", "weekly", "0.6"),
            (f"{base}/il-club", "monthly", "0.6"),
            (f"{base}/contatti", "monthly", "0.5")]
    for e in events:
        urls.append((f"{base}/eventi/{e['id']}", "weekly", "0.8"))
    for p in posts:
        urls.append((f"{base}/news/{p['slug']}", "monthly", "0.7"))
    xml = ['<?xml version="1.0" encoding="UTF-8"?>',
           '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
    for loc, freq, prio in urls:
        xml.append(f"  <url><loc>{loc}</loc><changefreq>{freq}</changefreq><priority>{prio}</priority></url>")
    xml.append("</urlset>")
    return Response(content="\n".join(xml), media_type="application/xml")


@api.get("/robots.txt", response_class=PlainTextResponse)
async def robots():
    return "User-agent: *\nAllow: /\n\nSitemap: https://glitzclub.it/api/sitemap.xml\n"


# --- Auth ---
@api.post("/auth/login")
async def login(data: LoginIn):
    user = await db.admins.find_one({"email": data.email})
    if not user or not verify_password(data.password, user["password_hash"]):
        raise HTTPException(status_code=401, detail="Credenziali non valide")
    token = create_token(data.email)
    return {"token": token, "email": data.email}


@api.get("/auth/me")
async def me(admin=Depends(get_admin)):
    return {"email": admin["email"]}


# --- Events (public) ---
@api.get("/events", response_model=List[EventOut])
async def list_events(published_only: bool = True):
    q = {"published": True} if published_only else {}
    items = await db.events.find(q, {"_id": 0}).sort("date", 1).to_list(1000)
    return items


@api.get("/events/upcoming", response_model=Optional[EventOut])
async def upcoming_event():
    now = datetime.now(timezone.utc).isoformat()
    item = await db.events.find_one({"published": True, "date": {"$gte": now}}, {"_id": 0}, sort=[("date", 1)])
    return item


@api.get("/events/{event_id}", response_model=EventOut)
async def get_event(event_id: str):
    ev = await db.events.find_one({"id": event_id}, {"_id": 0})
    if not ev:
        raise HTTPException(status_code=404, detail="Evento non trovato")
    return ev


# --- Events (admin) ---
@api.post("/admin/events", response_model=EventOut)
async def create_event(data: EventIn, admin=Depends(get_admin)):
    doc = data.model_dump()
    doc["id"] = str(uuid.uuid4())
    doc["created_at"] = datetime.now(timezone.utc).isoformat()
    await db.events.insert_one(doc)
    doc.pop("_id", None)
    return doc


@api.put("/admin/events/{event_id}", response_model=EventOut)
async def update_event(event_id: str, data: EventIn, admin=Depends(get_admin)):
    upd = data.model_dump()
    res = await db.events.find_one_and_update(
        {"id": event_id}, {"$set": upd},
        return_document=True, projection={"_id": 0}
    )
    if not res:
        raise HTTPException(status_code=404, detail="Evento non trovato")
    return res


@api.delete("/admin/events/{event_id}")
async def delete_event(event_id: str, admin=Depends(get_admin)):
    r = await db.events.delete_one({"id": event_id})
    return {"deleted": r.deleted_count}


# --- Blog (public) ---
@api.get("/posts", response_model=List[PostOut])
async def list_posts(published_only: bool = True):
    q = {"published": True} if published_only else {}
    items = await db.posts.find(q, {"_id": 0}).sort("created_at", -1).to_list(1000)
    return items


@api.get("/posts/{slug}", response_model=PostOut)
async def get_post(slug: str):
    p = await db.posts.find_one({"slug": slug}, {"_id": 0})
    if not p:
        raise HTTPException(status_code=404, detail="Articolo non trovato")
    return p


# --- Blog (admin) ---
@api.post("/admin/posts", response_model=PostOut)
async def create_post(data: PostIn, admin=Depends(get_admin)):
    doc = data.model_dump()
    doc["id"] = str(uuid.uuid4())
    doc["created_at"] = datetime.now(timezone.utc).isoformat()
    await db.posts.insert_one(doc)
    doc.pop("_id", None)
    return doc


@api.put("/admin/posts/{post_id}", response_model=PostOut)
async def update_post(post_id: str, data: PostIn, admin=Depends(get_admin)):
    res = await db.posts.find_one_and_update(
        {"id": post_id}, {"$set": data.model_dump()},
        return_document=True, projection={"_id": 0}
    )
    if not res:
        raise HTTPException(status_code=404, detail="Articolo non trovato")
    return res


@api.delete("/admin/posts/{post_id}")
async def delete_post(post_id: str, admin=Depends(get_admin)):
    r = await db.posts.delete_one({"id": post_id})
    return {"deleted": r.deleted_count}


# --- FAQ ---
@api.get("/faqs", response_model=List[FAQOut])
async def list_faqs():
    return await db.faqs.find({}, {"_id": 0}).sort("order", 1).to_list(1000)


@api.post("/admin/faqs", response_model=FAQOut)
async def create_faq(data: FAQIn, admin=Depends(get_admin)):
    doc = data.model_dump()
    doc["id"] = str(uuid.uuid4())
    await db.faqs.insert_one(doc)
    doc.pop("_id", None)
    return doc


@api.put("/admin/faqs/{faq_id}", response_model=FAQOut)
async def update_faq(faq_id: str, data: FAQIn, admin=Depends(get_admin)):
    res = await db.faqs.find_one_and_update(
        {"id": faq_id}, {"$set": data.model_dump()},
        return_document=True, projection={"_id": 0}
    )
    if not res:
        raise HTTPException(status_code=404, detail="FAQ non trovata")
    return res


@api.delete("/admin/faqs/{faq_id}")
async def delete_faq(faq_id: str, admin=Depends(get_admin)):
    r = await db.faqs.delete_one({"id": faq_id})
    return {"deleted": r.deleted_count}


# --- Media / Gallery ---
@api.get("/media", response_model=List[MediaOut])
async def list_media(category: Optional[str] = None, event_id: Optional[str] = None):
    q = {"is_deleted": False}
    if category:
        q["category"] = category
    if event_id:
        q["event_id"] = event_id
    return await db.media.find(q, {"_id": 0}).sort("created_at", -1).to_list(1000)


@api.post("/admin/media", response_model=MediaOut)
async def upload_media(
    file: UploadFile = File(...),
    category: str = "gallery",
    caption: str = "",
    event_id: Optional[str] = None,
    admin=Depends(get_admin),
):
    ext = (file.filename or "bin").rsplit(".", 1)[-1].lower() if "." in (file.filename or "") else "bin"
    file_id = str(uuid.uuid4())
    path = f"{APP_NAME}/media/{file_id}.{ext}"
    data = await file.read()
    result = put_object(path, data, file.content_type or "application/octet-stream")
    doc = {
        "id": file_id,
        "storage_path": result["path"],
        "url": f"/api/files/{result['path']}",
        "filename": file.filename or f"{file_id}.{ext}",
        "content_type": file.content_type or "application/octet-stream",
        "size": result.get("size", len(data)),
        "category": category,
        "caption": caption,
        "event_id": event_id,
        "is_deleted": False,
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    await db.media.insert_one(doc)
    doc.pop("_id", None)
    return doc


@api.delete("/admin/media/{media_id}")
async def delete_media(media_id: str, admin=Depends(get_admin)):
    r = await db.media.update_one({"id": media_id}, {"$set": {"is_deleted": True}})
    return {"deleted": r.modified_count}


@api.get("/files/{path:path}")
async def download_file(path: str):
    record = await db.media.find_one({"storage_path": path, "is_deleted": False})
    if not record:
        raise HTTPException(status_code=404, detail="File non trovato")
    data, ct = get_object(path)
    return Response(content=data, media_type=record.get("content_type", ct),
                    headers={"Cache-Control": "public, max-age=86400"})


# --- Newsletter ---
@api.post("/newsletter/subscribe")
async def newsletter_subscribe(data: NewsletterIn):
    existing = await db.newsletter.find_one({"email": data.email})
    if existing:
        return {"status": "already_subscribed"}
    doc = {
        "id": str(uuid.uuid4()),
        "email": data.email,
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    await db.newsletter.insert_one(doc)

    # Send welcome email (fire and forget)
    html = (
        '<table role="presentation" width="100%" style="background:#070609;color:#ffffff">'
        '<tr><td style="padding:32px;font-family:Arial,sans-serif;max-width:600px">'
        '<h1 style="color:#FF3300;font-size:28px;margin:0 0 16px 0;letter-spacing:1px">GLITZ CLUB</h1>'
        f'<p style="font-size:16px;line-height:1.6">Ciao, benvenuto nel mondo di {escape(EMAIL_FROM_NAME)}.</p>'
        '<p style="font-size:16px;line-height:1.6">Ti sei iscritto alla nostra newsletter. '
        'Riceverai in anteprima line-up, ospiti e aperture della stagione a Contrada Dino, San Nicola Arcella.</p>'
        '<p style="font-size:12px;color:#888;margin-top:32px">'
        f'Inviato da {escape(EMAIL_FROM_NAME)}. Se non ti sei iscritto tu, ignora questa email.'
        '</p></td></tr></table>'
    )
    await send_email(to=data.email, subject="Benvenuto al Glitz Club", html=html)
    return {"status": "subscribed"}


# --- Seed / Startup ---
FAQ_SEED = [
    ("Dove si trova il Glitz Club?", "Il Glitz si trova in Contrada Dino, San Nicola Arcella (CS), sulla costa tirrenica calabrese, con vista sull'Isola di Dino."),
    ("Qual è l'età minima per entrare?", "L'accesso è consentito ai maggiorenni (18+). È richiesto un documento d'identità valido all'ingresso."),
    ("Esiste un dress code?", "Sì. Dress code smart & elegante. È gradito uno stile curato: sneakers pulite, abiti in ordine. Vietate infradito, canottiere e capi tecnici da spiaggia."),
    ("Dove posso comprare i biglietti?", "I biglietti si acquistano online tramite TicketSms, cliccando sul pulsante Biglietti nella pagina evento. Alcune serate sono con lista in cassa."),
    ("Come prenoto un tavolo VIP?", "Le prenotazioni tavoli si effettuano via WhatsApp al numero 344 4289232. Verrà confermata disponibilità, posizione e minimo di spesa."),
    ("Quali sono gli orari?", "Le serate iniziano dopo il tramonto, in genere dalle 23:00, e proseguono fino all'alba. Consultare la pagina evento per orari specifici."),
    ("Il club è all'aperto o al chiuso?", "Glitz è un club all'aperto da 2000 posti con vista mare, arco iconico a LED e sistemi laser dedicati."),
    ("C'è un parcheggio disponibile?", "Sono disponibili aree di sosta nelle immediate vicinanze. Consigliato arrivare in anticipo o utilizzare navette private per le grandi serate."),
    ("Accettate pagamenti con carta?", "Sì, ai bar e alle casse tavoli si accettano tutte le principali carte di credito e debito, contactless e pagamenti da smartphone."),
    ("Cosa succede in caso di maltempo?", "Le serate si svolgono regolarmente. In casi eccezionali di allerta meteo, la comunicazione ufficiale sarà pubblicata sui canali social @glitzclubofficial."),
]

EVENT_SEED = [
    {
        "title": "Opening Season 2027 — Pyramid Night",
        "date": "2027-06-19T21:00:00+00:00",
        "lineup": ["Solomun", "Marco Carola", "Anfisa Letyago"],
        "description": "L'attesa apertura di stagione al Glitz. Tre headliners di caratura internazionale sotto l'arco a LED, dal tramonto sul mare all'alba tirrenica. Line-up totalmente house & techno.",
        "poster": "https://images.unsplash.com/photo-1602167098991-7cdbfeb0f8d9?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
        "floorplan_enabled": True,
    },
    {
        "title": "Sunset Sessions — Deep House Edition",
        "date": "2027-07-17T20:00:00+00:00",
        "lineup": ["Black Coffee", "The Blessed Madonna", "Local Guest"],
        "description": "Il rito del tramonto sul mare della Calabria. Deep house, afro, melodic. Un long set che accompagna dal cielo arancione fino ai laser rossi della notte.",
        "poster": "https://images.unsplash.com/photo-1563841930606-67e2bce48b78?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
        "floorplan_enabled": False,
    },
    {
        "title": "Glitz Anniversary — 6 Anni di Fuoco",
        "date": "2027-08-14T21:30:00+00:00",
        "lineup": ["Tale Of Us", "Adam Beyer", "Amelie Lens", "Special Guest TBA"],
        "description": "Il compleanno più atteso della costa. Sei anni di serate leggendarie celebrati con una line-up esplosiva, produzione visiva spettacolare e fuochi pirotecnici alla mezzanotte.",
        "poster": "https://images.unsplash.com/photo-1619229725920-ac8b63b0631a?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
        "floorplan_enabled": True,
    },
]

POST_SEED = [
    {
        "title": "Glitz apre la stagione 2026: cosa aspettarsi",
        "slug": "opening-stagione-2026",
        "excerpt": "L'estate calabrese ha una nuova capitale. Ecco tutte le novità della stagione: nuovo arco a LED, laser di ultima generazione e una line-up internazionale.",
        "cover": "https://images.unsplash.com/photo-1705807672710-ee0d72e84b78?crop=entropy&cs=srgb&fm=jpg&q=85&w=1400",
        "body": "## Una stagione da record\n\nDopo mesi di lavori, il Glitz torna più forte che mai. Il nuovo arco a LED è stato interamente rimappato con un sistema pixel-per-pixel che risponde in tempo reale al DJ set.\n\n### Le novità\n\n- Sistema laser potenziato con 24 fari motorizzati\n- Nuovo layout tavoli VIP con vista mare panoramica\n- Bar centrale ampliato per un servizio più rapido\n\n## Line-up 2026\n\nPassano da Contrada Dino nomi che hanno fatto la storia della club culture: Solomun, Marco Carola, Tale Of Us, Amelie Lens. Ogni serata è pensata come un viaggio dal tramonto all'alba.",
        "tags": ["stagione", "news", "location"],
    },
    {
        "title": "Come arrivare al Glitz: guida rapida",
        "slug": "come-arrivare-al-glitz",
        "excerpt": "Contrada Dino, San Nicola Arcella. Strade, parcheggi, navette e i consigli per non perdere l'opening act.",
        "cover": "https://images.unsplash.com/photo-1692688178673-07b356303af5?crop=entropy&cs=srgb&fm=jpg&q=85&w=1400",
        "body": "## Auto\n\nUscita A2 Frascineto, poi SS534 e SS18 in direzione San Nicola Arcella. Il club è ben segnalato negli ultimi chilometri.\n\n## Treno\n\nStazione più vicina: Scalea. Da lì taxi o navetta dedicata nei giorni di grande evento.\n\n## Parcheggio\n\nAree di sosta ampie a pochi metri dall'ingresso. Consigliato arrivare entro le 23:30 per evitare code.",
        "tags": ["guida", "info"],
    },
    {
        "title": "Dietro le quinte: come si costruisce una notte al Glitz",
        "slug": "dietro-le-quinte",
        "excerpt": "Dalle 6 del mattino all'alba successiva. La giornata dello staff che fa girare 2000 persone sotto le stelle.",
        "cover": "https://images.unsplash.com/photo-1619286627925-634cddbafcbf?crop=entropy&cs=srgb&fm=jpg&q=85&w=1400",
        "body": "## Alba: il sopralluogo\n\nAlle prime luci il team tecnico è già sul posto. Si controllano linee elettriche, subwoofer, monitor DJ.\n\n## Pomeriggio: prove luci\n\nIl light designer testa la sincronia tra laser, LED dell'arco e strobo. Ogni traccia di ogni set ha una scena preparata.\n\n## Notte: si accende tutto\n\nAlle 23 si aprono i cancelli. Da quel momento sono ore di adrenalina pura, ogni movimento è coreografato per far esplodere la pista.",
        "tags": ["backstage", "storia"],
    },
]

GALLERY_SEED = [
    "https://images.unsplash.com/photo-1602167098991-7cdbfeb0f8d9?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
    "https://images.unsplash.com/photo-1563841930606-67e2bce48b78?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
    "https://images.unsplash.com/photo-1619229725920-ac8b63b0631a?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
    "https://images.unsplash.com/photo-1619286627925-634cddbafcbf?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
    "https://images.unsplash.com/photo-1705807672710-ee0d72e84b78?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
    "https://images.unsplash.com/photo-1692688197926-08d634e6db6f?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
    "https://images.unsplash.com/photo-1692688178673-07b356303af5?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
    "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
    "https://images.unsplash.com/photo-1571266028243-e4bb35f0dc37?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
]


@app.on_event("startup")
async def startup():
    logging.basicConfig(level=logging.INFO)
    # init storage (non-blocking on failure)
    init_storage()

    # Seed admin
    admin = await db.admins.find_one({"email": ADMIN_EMAIL})
    if not admin:
        await db.admins.insert_one({
            "id": str(uuid.uuid4()),
            "email": ADMIN_EMAIL,
            "password_hash": hash_password(ADMIN_PASSWORD),
            "created_at": datetime.now(timezone.utc).isoformat(),
        })
        logging.info(f"Seeded admin: {ADMIN_EMAIL}")

    # Seed FAQs
    if await db.faqs.count_documents({}) == 0:
        for i, (q, a) in enumerate(FAQ_SEED):
            await db.faqs.insert_one({"id": str(uuid.uuid4()), "question": q, "answer": a, "order": i})
        logging.info("Seeded FAQs")

    # Reseed Events with fixed 2027 dates (wipe any previous seed)
    await db.events.delete_many({"date": {"$lt": "2027-01-01"}})
    if await db.events.count_documents({}) == 0:
        now_iso = datetime.now(timezone.utc).isoformat()
        for e in EVENT_SEED:
            await db.events.insert_one({
                "id": str(uuid.uuid4()),
                "title": e["title"],
                "date": e["date"],
                "lineup": e["lineup"],
                "description": e["description"],
                "poster_url": e["poster"],
                "gallery": [],
                "ticket_url": "https://www.ticketsms.it/it/location/glitz-club",
                "location": "Contrada Dino, San Nicola Arcella (CS)",
                "published": True,
                "floorplan_enabled": e.get("floorplan_enabled", False),
                "created_at": now_iso,
            })
        logging.info("Seeded events (2027)")

    # Seed Settings (or refresh if defaults missing)
    existing = await db.settings.find_one({"id": "main"})
    if not existing:
        await db.settings.insert_one(DEFAULT_SETTINGS.copy())
        logging.info("Seeded settings")
    else:
        # Backfill logo + hero image if empty (real Glitz assets)
        patch = {}
        if not existing.get("logo_url"):
            patch["logo_url"] = DEFAULT_SETTINGS["logo_url"]
        if not existing.get("hero_image_url") or "unsplash" in (existing.get("hero_image_url") or ""):
            patch["hero_image_url"] = DEFAULT_SETTINGS["hero_image_url"]
        if not existing.get("instagram_posts") or any("unsplash" in (p.get("image","")) for p in existing.get("instagram_posts", [])):
            patch["instagram_posts"] = DEFAULT_SETTINGS["instagram_posts"]
        if patch:
            await db.settings.update_one({"id": "main"}, {"$set": patch})
            logging.info(f"Patched settings: {list(patch.keys())}")

    # Seed Past Events
    if await db.past_events.count_documents({}) == 0:
        for pe in PAST_EVENT_SEED:
            await db.past_events.insert_one({
                "id": str(uuid.uuid4()),
                "title": pe["title"],
                "date": pe["date"],
                "poster_url": pe["poster"],
                "ticket_url": pe["url"],
                "location": "Glitz Club, San Nicola Arcella (CS)",
            })
        logging.info("Seeded past events")

    # Refresh ticket_url for seeded 2027 events to Glitz TicketSMS venue page
    await db.events.update_many(
        {"ticket_url": {"$in": ["https://www.ticketsms.it/", ""]}},
        {"$set": {"ticket_url": "https://www.ticketsms.it/it/location/glitz-club"}}
    )

    # Seed Posts
    if await db.posts.count_documents({}) == 0:
        for p in POST_SEED:
            await db.posts.insert_one({
                "id": str(uuid.uuid4()),
                "title": p["title"],
                "slug": p["slug"],
                "excerpt": p["excerpt"],
                "cover_url": p["cover"],
                "body": p["body"],
                "tags": p["tags"],
                "published": True,
                "created_at": datetime.now(timezone.utc).isoformat(),
            })
        logging.info("Seeded posts")

    # Seed Gallery (external URLs, no upload)
    if await db.media.count_documents({}) == 0:
        for i, url in enumerate(GALLERY_SEED):
            await db.media.insert_one({
                "id": str(uuid.uuid4()),
                "storage_path": "",
                "url": url,
                "filename": f"seed-{i}.jpg",
                "content_type": "image/jpeg",
                "size": 0,
                "category": "gallery",
                "caption": "",
                "event_id": None,
                "is_deleted": False,
                "created_at": datetime.now(timezone.utc).isoformat(),
            })
        logging.info("Seeded gallery")


@app.on_event("shutdown")
async def shutdown():
    client.close()


app.include_router(api)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)
