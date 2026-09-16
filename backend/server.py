from fastapi import FastAPI, APIRouter, HTTPException, Depends, UploadFile, File, Header, Query, Request
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
    artist_photo_url: str = ""
    gallery: List[str] = []
    ticket_url: str = ""
    location: str = "Contrada Dino, San Nicola Arcella (CS)"
    published: bool = True
    floorplan_enabled: bool = False
    reserved_tables: dict = {}


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
    planimetria_url: str = ""
    instagram_url: str = "https://instagram.com/glitzclubofficial"
    instagram_posts: List[dict] = []
    # --- Editable homepage copy ---
    home_hero_line1: str = "BEYOND"
    home_hero_line2: str = "THE NIGHT"
    home_hero_subtitle: str = "Duemila posti all'aperto, l'arco a LED più iconico del sud Italia, i laser e la vista sull'Isola di Dino. La stagione 2027 sta per iniziare."
    home_opening_title: str = "OPENING PARTY"
    home_events_kicker: str = "Stagione 2027"
    home_events_title: str = "Prossimi Eventi"
    home_location_kicker: str = "Location"
    home_location_title: str = "Sul Mare\ndella Calabria"
    home_location_body: str = "Contrada Dino, San Nicola Arcella. Un club all'aperto affacciato sull'omonima Isola di Dino, dove il tramonto tirrenico incontra le luci laser e i bassi profondi."
    home_faq_title: str = "Info Rapide\nsul Glitz"
    home_faq_intro: str = "Tutto quello che devi sapere per vivere la miglior notte della tua estate. Location, orari, biglietti, tavoli."
    home_gallery_preview_kicker: str = ""
    home_gallery_preview_title: str = "Uno sguardo dentro"
    # --- Editable "Il Club" (About) page ---
    about_kicker: str = "Il Club"
    about_hero_line1: str = "Cinque Ambienti,"
    about_hero_line2: str = "Una Sola Notte"
    about_hero_image_url: str = ""
    about_hero_subtitle: str = "Affacciato su uno degli scorci più suggestivi della Calabria, il Glitz Club è un luogo esclusivo pensato per offrire esperienze di intrattenimento e relax uniche. Musica, atmosfera e bellezza si incontrano per dare vita a serate irripetibili."
    about_stat_1_value: str = "2000"
    about_stat_1_label: str = "Posti all'aperto"
    about_stat_2_value: str = "05"
    about_stat_2_label: str = "Ambienti distinti"
    about_stat_3_value: str = "180°"
    about_stat_3_label: str = "Vista mare"
    about_location_title: str = "Contrada Dino, 87020 San Nicola Arcella (CS)"
    about_location_body: str = "Un anfiteatro naturale, aperto sul Tirreno, incorniciato dall'Isola di Dino."
    about_gallery_kicker: str = "Le Foto Più Belle"
    about_gallery_title: str = "Gallery"
    about_gallery_groups: List[dict] = []
    about_zones: List[dict] = []
    # --- Editable Contact page ---
    contact_kicker: str = "Contatti"
    contact_title: str = "Scrivici"
    contact_whatsapp_number: str = "393444289232"
    contact_whatsapp_display: str = "344 4289232"
    contact_email: str = "glitzclubofficial@gmail.com"
    contact_instagram: str = "https://instagram.com/glitzclubofficial"
    contact_instagram_handle: str = "@glitzclubofficial"
    contact_address: str = "Contrada Dino, San Nicola Arcella (CS), 87020"
    contact_hours: str = "Aperto solo la sera, dal giovedì alla domenica\nGiugno – Settembre · 22:00 – 05:00"
    contact_map_embed_url: str = "https://www.google.com/maps?q=San+Nicola+Arcella+Contrada+Dino&output=embed"


class BookingIn(BaseModel):
    name: str
    phone: str
    email: Optional[EmailStr] = None
    guests: int = 2
    event_id: Optional[str] = None
    event_title: Optional[str] = None
    table_number: Optional[str] = None
    zone: Optional[str] = None
    note: str = ""


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
    "hero_video_url": "https://vimeo.com/1226986309",
    "hero_image_url": "https://customer-assets-gfyr7b9c.emergentagent.net/job_glitz-nightclub/artifacts/9c0lj4wr_PHOTO-2025-09-16-12-45-38%202.jpg",
    "logo_url": "/api/files/glitzclub/media/8a518ef8-8f55-4a6f-81dc-13b0aa194cb8.png",
    "logo_dark_url": "/api/files/glitzclub/media/8afacd8d-3864-4424-a1cb-b16e285e0c15.png",
    "planimetria_url": "/api/files/glitzclub/media/f645c928-2e46-4771-a6e7-819818a6377d.png",
    "instagram_url": "https://instagram.com/glitzclubofficial",
    "instagram_posts": [
        {"image": "https://customer-assets-gfyr7b9c.emergentagent.net/job_glitz-nightclub/artifacts/6lina1we_PHOTO-2025-09-16-12-45-39.jpg", "url": "https://instagram.com/glitzclubofficial"},
        {"image": "https://customer-assets-gfyr7b9c.emergentagent.net/job_glitz-nightclub/artifacts/ppzjzi3q_PHOTO-2025-09-16-12-45-39%202.jpg", "url": "https://instagram.com/glitzclubofficial"},
        {"image": "https://customer-assets-gfyr7b9c.emergentagent.net/job_glitz-nightclub/artifacts/tzd5z52p_PHOTO-2025-09-16-12-45-38.jpg", "url": "https://instagram.com/glitzclubofficial"},
        {"image": "https://customer-assets-gfyr7b9c.emergentagent.net/job_glitz-nightclub/artifacts/97nlxf8c_PHOTO-2025-09-16-12-45-38%203.jpg", "url": "https://instagram.com/glitzclubofficial"},
        {"image": "https://customer-assets-gfyr7b9c.emergentagent.net/job_glitz-nightclub/artifacts/9c0lj4wr_PHOTO-2025-09-16-12-45-38%202.jpg", "url": "https://instagram.com/glitzclubofficial"},
        {"image": "https://d9x0j4yxg9m18.cloudfront.net/venue/5388ae92-425d-4037-8928-728162e874bf.jpg", "url": "https://instagram.com/glitzclubofficial"},
    ],
    # Editable homepage copy
    "home_hero_line1": "BEYOND",
    "home_hero_line2": "THE NIGHT",
    "home_hero_subtitle": "Duemila posti all'aperto, l'arco a LED più iconico del sud Italia, i laser e la vista sull'Isola di Dino. La stagione 2027 sta per iniziare.",
    "home_opening_title": "OPENING PARTY",
    "home_events_kicker": "Stagione 2027",
    "home_events_title": "Prossimi Eventi",
    "home_location_kicker": "Location",
    "home_location_title": "Sul Mare\ndella Calabria",
    "home_location_body": "Contrada Dino, San Nicola Arcella. Un club all'aperto affacciato sull'omonima Isola di Dino, dove il tramonto tirrenico incontra le luci laser e i bassi profondi.",
    "home_faq_title": "Info Rapide\nsul Glitz",
    "home_faq_intro": "Tutto quello che devi sapere per vivere la miglior notte della tua estate. Location, orari, biglietti, tavoli.",
    "home_gallery_preview_kicker": "",
    "home_gallery_preview_title": "Uno sguardo dentro",
    # About / Il Club
    "about_kicker": "Il Club",
    "about_hero_line1": "Cinque Ambienti,",
    "about_hero_line2": "Una Sola Notte",
    "about_hero_image_url": "https://customer-assets-gfyr7b9c.emergentagent.net/job_glitz-nightclub/artifacts/9c0lj4wr_PHOTO-2025-09-16-12-45-38%202.jpg",
    "about_hero_subtitle": "Affacciato su uno degli scorci più suggestivi della Calabria, il Glitz Club è un luogo esclusivo pensato per offrire esperienze di intrattenimento e relax uniche. Musica, atmosfera e bellezza si incontrano per dare vita a serate irripetibili.",
    "about_stat_1_value": "2000",
    "about_stat_1_label": "Posti all'aperto",
    "about_stat_2_value": "05",
    "about_stat_2_label": "Ambienti distinti",
    "about_stat_3_value": "180°",
    "about_stat_3_label": "Vista mare",
    "about_location_title": "Contrada Dino, 87020 San Nicola Arcella (CS)",
    "about_location_body": "Un anfiteatro naturale, aperto sul Tirreno, incorniciato dall'Isola di Dino.",
    "about_gallery_kicker": "Le Foto Più Belle",
    "about_gallery_title": "Gallery",
    "about_gallery_groups": [
        {"id": "eventi-pubblico", "title": "Eventi & Pubblico", "category": "gallery-eventi"},
        {"id": "location", "title": "Location", "category": "gallery-location"},
        {"id": "dettagli", "title": "Dettagli", "category": "gallery-dettagli"},
    ],
    # Contatti
    "contact_kicker": "Contatti",
    "contact_title": "Scrivici",
    "contact_whatsapp_number": "393444289232",
    "contact_whatsapp_display": "344 4289232",
    "contact_email": "glitzclubofficial@gmail.com",
    "contact_instagram": "https://instagram.com/glitzclubofficial",
    "contact_instagram_handle": "@glitzclubofficial",
    "contact_address": "Contrada Dino, San Nicola Arcella (CS), 87020",
    "contact_hours": "Aperto solo la sera, dal giovedì alla domenica\nGiugno – Settembre · 22:00 – 05:00",
    "contact_map_embed_url": "https://www.google.com/maps?q=San+Nicola+Arcella+Contrada+Dino&output=embed",
    "about_zones": [
        {
            "id": "arco",
            "title": "L'Arco Iconico",
            "subtitle": "Il simbolo del Glitz",
            "image": "https://customer-assets-gfyr7b9c.emergentagent.net/job_glitz-nightclub/artifacts/tzd5z52p_PHOTO-2025-09-16-12-45-38.jpg",
            "description": "L'arco scenografico a LED che incornicia la consolle è il simbolo del club. Un'architettura che si accende dal tramonto e trasforma la pista in un anfiteatro naturale affacciato sull'Isola di Dino. Al centro dell'arco: il DJ booth, con vista mare a 180°.",
            "highlights": ["Vista Isola di Dino", "Consolle DJ centrale", "Lighting LED pixel mapped"],
        },
        {
            "id": "backthestage",
            "title": "Back the Stage",
            "subtitle": "I privé dietro la consolle",
            "image": "https://customer-assets-gfyr7b9c.emergentagent.net/job_glitz-nightclub/artifacts/tzd5z52p_PHOTO-2025-09-16-12-45-38.jpg",
            "description": "L'area più esclusiva del Glitz: i privé dietro la consolle, a filo pista. Vista diretta sul DJ booth, servizio bottiglia premium e accesso riservato. È qui che si vive la serata da dentro il cuore del party, con la musica che ti arriva addosso e la pista sotto gli occhi.",
            "highlights": ["Vista frontale sul DJ", "Accesso riservato", "Servizio bottiglia premium"],
        },
        {
            "id": "riva-deck",
            "title": "Riva Deck",
            "subtitle": "Il cuore lounge del club",
            "image": "https://customer-assets-gfyr7b9c.emergentagent.net/job_glitz-nightclub/artifacts/6lina1we_PHOTO-2025-09-16-12-45-39.jpg",
            "description": "Il Riva Deck ospita tavoli premium e lettini vista pista. LED al pavimento, servizio bottiglia, atmosfera raccolta. È qui che si vivono le serate più esclusive: dai tavoli VIP prima fila fino ai gruppi che vogliono ballare senza rinunciare al comfort.",
            "highlights": ["Tavoli VIP prima fila", "Lettini lounge", "Servizio bottiglia dedicato"],
        },
        {
            "id": "seaview",
            "title": "Sea View",
            "subtitle": "Il tramonto sulla Calabria",
            "image": "https://customer-assets-gfyr7b9c.emergentagent.net/job_glitz-nightclub/artifacts/ppzjzi3q_PHOTO-2025-09-16-12-45-39%202.jpg",
            "description": "La zona vista mare è dove ogni serata inizia. Il sole tramonta dietro le montagne, i primi laser illuminano la baia, l'aperitivo scivola nel party. È il momento più fotografato del Glitz — non a caso questo scorcio è diventato il volto del club sui social.",
            "highlights": ["Tramonto sull'Isola di Dino", "Aperitivo & sunset session", "Fotografia panoramica"],
        },
        {
            "id": "artist-area",
            "title": "Artist Area",
            "subtitle": "L'area riservata agli artisti",
            "image": "/artist-area/main.jpg",
            "description": "Lo spazio dedicato agli artisti in line-up: dressing room, area relax privata con piscina panoramica affacciata sull'Isola di Dino e ingresso riservato. È qui che passano tutti i grandi nomi del calendario — da chi apre la serata alle superstar internazionali che chiudono l'alba.",
            "highlights": ["Piscina panoramica vista mare", "Dressing room privata", "Ingresso riservato"],
        },
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
async def update_settings(request: Request, admin=Depends(get_admin)):
    # Partial-update: only the keys the client actually sends are written.
    # Validates the payload against SettingsIn (drops unknown keys, coerces types).
    body = await request.json()
    if not isinstance(body, dict):
        raise HTTPException(status_code=400, detail="Invalid body")
    allowed = set(SettingsIn.model_fields.keys())
    patch = {k: v for k, v in body.items() if k in allowed}
    if not patch:
        raise HTTPException(status_code=400, detail="Nessun campo aggiornabile")
    patch["id"] = "main"
    await db.settings.update_one({"id": "main"}, {"$set": patch}, upsert=True)
    return await db.settings.find_one({"id": "main"}, {"_id": 0})


@api.get("/admin/stats")
async def admin_stats(admin=Depends(get_admin)):
    now = datetime.now(timezone.utc)
    week_ago_iso = (now - timedelta(days=7)).isoformat()

    # Revenue — paid Stripe transactions
    revenue_cur = db.payment_transactions.aggregate([
        {"$match": {"payment_status": "paid"}},
        {"$group": {"_id": None, "total": {"$sum": "$amount"}, "count": {"$sum": 1}}},
    ])
    revenue_docs = await revenue_cur.to_list(1)
    revenue_total_cents = int(revenue_docs[0]["total"]) if revenue_docs else 0
    orders_count = int(revenue_docs[0]["count"]) if revenue_docs else 0

    revenue_week_cur = db.payment_transactions.aggregate([
        {"$match": {"payment_status": "paid", "created_at": {"$gte": week_ago_iso}}},
        {"$group": {"_id": None, "total": {"$sum": "$amount"}}},
    ])
    revenue_week_docs = await revenue_week_cur.to_list(1)
    revenue_week_cents = int(revenue_week_docs[0]["total"]) if revenue_week_docs else 0

    # Bookings (table reservations)
    bookings_total = await db.bookings.count_documents({})
    bookings_week = await db.bookings.count_documents({"created_at": {"$gte": week_ago_iso}})
    bookings_pending = await db.bookings.count_documents({"status": "pending"})

    # Private-event inquiries
    private_total = await db.private_events.count_documents({})
    private_new = await db.private_events.count_documents({"status": "new"})

    # Next event
    next_event = await db.events.find_one(
        {"date": {"$gte": now.isoformat()}, "published": True},
        {"_id": 0},
        sort=[("date", 1)],
    )
    expected_guests = 0
    tables_reserved = 0
    if next_event:
        confirmed = await db.bookings.find(
            {"event_id": next_event["id"], "status": {"$in": ["pending", "confirmed"]}},
            {"_id": 0, "guests": 1, "status": 1},
        ).to_list(1000)
        tables_reserved = len(confirmed)
        expected_guests = sum(int(b.get("guests") or 0) for b in confirmed)

    return {
        "revenue_paid_cents": revenue_total_cents,
        "revenue_week_cents": revenue_week_cents,
        "orders_count": orders_count,
        "bookings_total": bookings_total,
        "bookings_week": bookings_week,
        "bookings_pending": bookings_pending,
        "private_total": private_total,
        "private_new": private_new,
        "next_event": (
            {
                "id": next_event["id"],
                "title": next_event["title"],
                "date": next_event["date"],
                "expected_guests": expected_guests,
                "tables_reserved": tables_reserved,
            }
            if next_event
            else None
        ),
    }


# --- Table reservations (floorplan) ---
@api.post("/bookings")
async def create_booking(data: BookingIn):
    doc = data.model_dump()
    doc["id"] = str(uuid.uuid4())
    doc["status"] = "pending"
    doc["created_at"] = datetime.now(timezone.utc).isoformat()
    await db.bookings.insert_one(doc)
    doc.pop("_id", None)

    # Mark table as reserved for that event
    if data.event_id and data.table_number:
        await db.events.update_one(
            {"id": data.event_id},
            {"$set": {f"reserved_tables.{data.table_number}": "reserved"}}
        )

    # Send confirmation email if provided
    if data.email:
        table_line = f"<strong>Tavolo:</strong> {escape(data.table_number)} ({escape(data.zone or '')})<br>" if data.table_number else ""
        event_line = f"<strong>Serata:</strong> {escape(data.event_title or '')}<br>" if data.event_title else ""
        html = (
            '<table role="presentation" width="100%" style="background:#070609;color:#ffffff">'
            '<tr><td style="padding:32px;font-family:Arial,sans-serif;max-width:600px">'
            '<h1 style="color:#FF3300;font-size:28px;margin:0 0 16px 0;letter-spacing:1px">GLITZ CLUB</h1>'
            f'<p style="font-size:16px;line-height:1.6">Ciao {escape(data.name)}, abbiamo ricevuto la tua richiesta di prenotazione.</p>'
            '<div style="background:rgba(255,51,0,0.08);border-left:3px solid #FF3300;padding:16px;margin:24px 0;font-size:14px;line-height:1.8">'
            f'{event_line}{table_line}'
            f'<strong>Ospiti:</strong> {data.guests}<br>'
            f'<strong>Telefono:</strong> {escape(data.phone)}'
            '</div>'
            '<p style="font-size:14px;line-height:1.6">Il nostro staff ti ricontatterà a breve su WhatsApp per confermare disponibilità, posizione e minimo di spesa.</p>'
            '<p style="font-size:12px;color:#888;margin-top:32px">Glitz Club — Contrada Dino, San Nicola Arcella (CS)</p>'
            '</td></tr></table>'
        )
        await send_email(to=data.email, subject="Richiesta prenotazione ricevuta — Glitz Club", html=html)

    return doc


@api.get("/admin/bookings")
async def list_bookings(admin=Depends(get_admin)):
    return await db.bookings.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)


@api.patch("/admin/bookings/{booking_id}")
async def update_booking_status(booking_id: str, status: str = Query(...), admin=Depends(get_admin)):
    r = await db.bookings.update_one({"id": booking_id}, {"$set": {"status": status}})
    return {"updated": r.modified_count}


# --- Legacy table reservations (floorplan) ---
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


# --- Cron: reminder emails 3h before event ---
WEBHOOK_CRON_SECRET = os.environ.get("WEBHOOK_CRON_SECRET", "")


async def _process_reminders():
    """Find bookings whose event starts in ~3h and send reminder emails."""
    now = datetime.now(timezone.utc)
    window_start = now + timedelta(hours=2, minutes=45)
    window_end = now + timedelta(hours=3, minutes=15)

    # Find events in the 3h window
    events = await db.events.find({
        "date": {"$gte": window_start.isoformat(), "$lte": window_end.isoformat()},
        "published": True,
    }, {"_id": 0}).to_list(50)

    if not events:
        return {"sent": 0, "events_in_window": 0}

    sent = 0
    for ev in events:
        # Bookings for this event that haven't been reminded and have email
        bookings = await db.bookings.find({
            "event_id": ev["id"],
            "email": {"$ne": None, "$exists": True, "$not": {"$eq": ""}},
            "reminded_at": {"$exists": False},
            "status": {"$ne": "cancelled"},
        }).to_list(500)

        for b in bookings:
            table_line = f"<strong>Tavolo:</strong> {escape(str(b.get('table_number','')))} ({escape(b.get('zone','') or '')})<br>" if b.get("table_number") else ""
            html = (
                '<table role="presentation" width="100%" style="background:#070609;color:#ffffff">'
                '<tr><td style="padding:32px;font-family:Arial,sans-serif;max-width:600px">'
                '<h1 style="color:#FF3300;font-size:28px;margin:0 0 8px 0;letter-spacing:1px">GLITZ CLUB</h1>'
                '<p style="font-size:11px;text-transform:uppercase;letter-spacing:3px;color:#FF3300;margin:0 0 24px 0">Reminder — Tra 3 ore la serata</p>'
                f'<p style="font-size:16px;line-height:1.6">Ciao {escape(b.get("name",""))}, ci vediamo stanotte al Glitz.</p>'
                '<div style="background:rgba(255,51,0,0.08);border-left:3px solid #FF3300;padding:16px;margin:24px 0;font-size:14px;line-height:1.8">'
                f'<strong>Serata:</strong> {escape(ev.get("title","") or "")}<br>'
                f'{table_line}'
                f'<strong>Ospiti:</strong> {b.get("guests",2)}<br>'
                f'<strong>Location:</strong> Contrada Dino, San Nicola Arcella (CS)'
                '</div>'
                '<p style="font-size:14px;line-height:1.6"><strong>Info utili:</strong><br>'
                '• Parcheggio gratuito in Contrada Dino, arrivo consigliato prima dell\'apertura<br>'
                '• Dress code smart & elegante<br>'
                '• Documento d\'identità obbligatorio all\'ingresso<br>'
                '• Domande last minute? WhatsApp: 344 4289232</p>'
                '<p style="font-size:12px;color:#888;margin-top:32px">Glitz Club — Contrada Dino, San Nicola Arcella (CS)</p>'
                '</td></tr></table>'
            )
            eid = await send_email(
                to=b["email"],
                subject=f"⏰ Tra 3 ore al Glitz — {ev.get('title','')}",
                html=html,
            )
            await db.bookings.update_one(
                {"id": b["id"]},
                {"$set": {"reminded_at": datetime.now(timezone.utc).isoformat(),
                          "reminder_email_id": eid}}
            )
            sent += 1

    return {"sent": sent, "events_in_window": len(events)}


@api.post("/cron/reminders")
async def cron_reminders(authorization: Optional[str] = Header(None)):
    # Cron endpoints must ack 2xx immediately; enqueue/background the actual work.
    import secrets as _s
    if not WEBHOOK_CRON_SECRET:
        raise HTTPException(status_code=500, detail="cron secret not set")
    expected = f"Bearer {WEBHOOK_CRON_SECRET}"
    if not authorization or not _s.compare_digest(authorization, expected):
        raise HTTPException(status_code=401, detail="Unauthorized")
    import asyncio
    asyncio.create_task(_process_reminders())
    return {"ok": True, "queued": True}


@api.post("/admin/cron/reminders/run")
async def admin_run_reminders(admin=Depends(get_admin)):
    """Manual trigger for testing (admin only)."""
    result = await _process_reminders()
    return result


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
    return await db.media.find(q, {"_id": 0}).sort([("order", 1), ("created_at", -1)]).to_list(1000)


@api.post("/admin/media/reorder")
async def reorder_media(body: dict, admin=Depends(get_admin)):
    """Body: {order: [media_id_1, media_id_2, ...]} — assigns index as 'order' field."""
    ids = body.get("order") or []
    if not isinstance(ids, list):
        raise HTTPException(status_code=400, detail="order deve essere una lista")
    for idx, mid in enumerate(ids):
        await db.media.update_one({"id": mid}, {"$set": {"order": idx}})
    return {"reordered": len(ids)}


@api.patch("/admin/media/{media_id}")
async def update_media(media_id: str, body: dict, admin=Depends(get_admin)):
    """Update mutable media fields: category, caption."""
    patch = {}
    if "category" in body:
        patch["category"] = str(body["category"]).strip()
    if "caption" in body:
        patch["caption"] = str(body["caption"])
    if not patch:
        raise HTTPException(status_code=400, detail="Nessun campo aggiornabile")
    r = await db.media.update_one({"id": media_id}, {"$set": patch})
    if r.matched_count == 0:
        raise HTTPException(status_code=404, detail="Foto non trovata")
    return {"updated": 1}


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
        # Backfill / upgrade fields to newest defaults where safe
        patch = {}
        for key in ("logo_url", "logo_dark_url", "planimetria_url", "hero_video_url", "hero_image_url"):
            current = existing.get(key)
            default = DEFAULT_SETTINGS.get(key)
            # Replace if empty OR still pointing at unsplash/ticketsms cloudfront (old placeholders)
            if not current or "unsplash" in (current or "") or "cloudfront" in (current or ""):
                if default:
                    patch[key] = default
        if not existing.get("instagram_posts") or any("unsplash" in (p.get("image","")) for p in existing.get("instagram_posts", [])):
            patch["instagram_posts"] = DEFAULT_SETTINGS["instagram_posts"]
        # Backfill any newly-added copy/content keys that don't exist yet in the doc
        for key, default in DEFAULT_SETTINGS.items():
            if key.startswith("home_") or key.startswith("about_") or key.startswith("contact_"):
                if existing.get(key) in (None, "", []):
                    patch[key] = default
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


# ================= STRIPE PAYMENTS =================
import stripe

stripe.api_key = os.environ.get("STRIPE_SECRET_KEY") or "sk_test_emergent"
STRIPE_WEBHOOK_SECRET = os.environ.get("STRIPE_WEBHOOK_SECRET", "")

payments = APIRouter(prefix="/api/payments", tags=["payments"])


class CheckoutRequest(BaseModel):
    lookup_key: str
    quantity: int = Field(1, ge=1, le=100)
    origin_url: str
    metadata: Optional[dict] = None


@payments.post("/checkout")
async def create_checkout(req: CheckoutRequest):
    prices = stripe.Price.list(lookup_keys=[req.lookup_key], active=True, limit=1).data
    if not prices:
        raise HTTPException(500, f"Price not found: {req.lookup_key}")
    price = prices[0]
    meta = {"lookup_key": req.lookup_key, **(req.metadata or {})}
    session = stripe.checkout.Session.create(
        line_items=[{"price": price.id, "quantity": req.quantity}],
        mode="payment",
        success_url=f"{req.origin_url}/payment/success?session_id={{CHECKOUT_SESSION_ID}}",
        cancel_url=f"{req.origin_url}/payment/cancel",
        automatic_tax={"enabled": True},
        billing_address_collection="required",
        shipping_address_collection={"allowed_countries": ["IT", "FR", "DE", "ES", "AT", "CH", "BE", "NL"]},
        metadata=meta,
    )
    await db["payment_transactions"].insert_one({
        "session_id": session.id,
        "lookup_key": req.lookup_key,
        "quantity": req.quantity,
        "amount": (price.unit_amount or 0) * req.quantity,
        "currency": price.currency,
        "status": "initiated",
        "payment_status": "pending",
        "metadata": meta,
        "created_at": datetime.now(timezone.utc).isoformat(),
        "updated_at": datetime.now(timezone.utc).isoformat(),
    })
    return {"checkout_url": session.url, "session_id": session.id}


@payments.get("/status/{session_id}")
async def get_payment_status(session_id: str):
    record = await db["payment_transactions"].find_one({"session_id": session_id})
    if not record:
        raise HTTPException(404, "Transaction not found")
    if record.get("payment_status") != "paid":
        try:
            s = stripe.checkout.Session.retrieve(session_id)
            if s.payment_status == "paid" or s.status == "complete":
                await db["payment_transactions"].update_one(
                    {"session_id": session_id, "payment_status": {"$ne": "paid"}},
                    {"$set": {
                        "status": "completed",
                        "payment_status": "paid",
                        "stripe_payment_intent_id": s.payment_intent,
                        "updated_at": datetime.now(timezone.utc).isoformat(),
                    }},
                )
                record = await db["payment_transactions"].find_one({"session_id": session_id})
        except stripe.error.StripeError:
            pass
    return {
        "session_id": record["session_id"],
        "status": record["status"],
        "payment_status": record["payment_status"],
    }


stripe_router = APIRouter(prefix="/api/stripe", tags=["stripe"])


@stripe_router.post("/webhook")
async def stripe_webhook(request):
    from fastapi import Request as _R
    return await _stripe_webhook_impl(request)


from fastapi import Request as _FastRequest


async def _stripe_webhook_impl(request: _FastRequest):
    payload = await request.body()
    sig = request.headers.get("stripe-signature", "")
    try:
        event = stripe.Webhook.construct_event(payload, sig, STRIPE_WEBHOOK_SECRET)
    except stripe.error.SignatureVerificationError:
        raise HTTPException(400, "Invalid signature")
    obj, t = event["data"]["object"], event["type"]
    now = datetime.now(timezone.utc).isoformat()
    if t == "checkout.session.completed":
        await db["payment_transactions"].update_one(
            {"session_id": obj["id"], "payment_status": {"$ne": "paid"}},
            {"$set": {
                "status": "completed",
                "payment_status": obj.get("payment_status", "paid"),
                "stripe_payment_intent_id": obj.get("payment_intent"),
                "customer_email": (obj.get("customer_details") or {}).get("email"),
                "updated_at": now,
            }},
        )
    elif t == "checkout.session.async_payment_failed":
        await db["payment_transactions"].update_one({"session_id": obj["id"]},
            {"$set": {"status": "failed", "payment_status": "failed", "updated_at": now}})
    elif t == "checkout.session.expired":
        await db["payment_transactions"].update_one({"session_id": obj["id"]},
            {"$set": {"status": "expired", "payment_status": "expired", "updated_at": now}})
    return {"status": "ok"}


app.include_router(payments)
app.include_router(stripe_router)


app.include_router(api)

# ================= GOOGLE AUTH (Emergent-managed) =================
from fastapi import Request, Response as FastResponse, Cookie
import httpx as _httpx_auth

auth_router = APIRouter(prefix="/api/auth", tags=["auth"])
SESSION_DAYS = 7
OWNER_EMAIL = "jalucas@hotmail.it"


class SessionIn(BaseModel):
    session_id: str


async def _get_current_user(session_token: Optional[str]):
    if not session_token:
        return None
    session = await db.user_sessions.find_one({"session_token": session_token}, {"_id": 0})
    if not session:
        return None
    expires_at = session["expires_at"]
    if isinstance(expires_at, str):
        expires_at = datetime.fromisoformat(expires_at)
    if expires_at.tzinfo is None:
        expires_at = expires_at.replace(tzinfo=timezone.utc)
    if expires_at < datetime.now(timezone.utc):
        await db.user_sessions.delete_one({"session_token": session_token})
        return None
    user = await db.users.find_one({"user_id": session["user_id"]}, {"_id": 0})
    return user


async def get_optional_user(request: Request):
    token = request.cookies.get("session_token")
    if not token:
        auth = request.headers.get("authorization", "")
        if auth.lower().startswith("bearer "):
            token = auth[7:]
    return await _get_current_user(token)


async def require_user(request: Request):
    user = await get_optional_user(request)
    if not user:
        raise HTTPException(401, "Not authenticated")
    return user


@auth_router.post("/google/session")
async def google_session(body: SessionIn, response: FastResponse):
    # Exchange session_id with Emergent Auth
    async with _httpx_auth.AsyncClient(timeout=15) as c:
        r = await c.get(
            "https://demobackend.emergentagent.com/auth/v1/env/oauth/session-data",
            headers={"X-Session-ID": body.session_id},
        )
    if r.status_code != 200:
        raise HTTPException(401, "Invalid session")
    data = r.json()
    email = data["email"]
    now = datetime.now(timezone.utc)

    user = await db.users.find_one({"email": email}, {"_id": 0})
    if not user:
        user_id = f"user_{uuid.uuid4().hex[:12]}"
        user = {
            "user_id": user_id,
            "email": email,
            "name": data.get("name", ""),
            "picture": data.get("picture", ""),
            "is_admin": email.lower() == OWNER_EMAIL.lower(),
            "created_at": now.isoformat(),
        }
        await db.users.insert_one(user)
        user = {k: v for k, v in user.items() if k != "_id"}
    else:
        await db.users.update_one(
            {"user_id": user["user_id"]},
            {"$set": {"name": data.get("name", user.get("name", "")),
                      "picture": data.get("picture", user.get("picture", "")),
                      "last_login_at": now.isoformat()}},
        )

    session_token = data["session_token"]
    await db.user_sessions.insert_one({
        "user_id": user["user_id"],
        "session_token": session_token,
        "expires_at": (now + timedelta(days=SESSION_DAYS)).isoformat(),
        "created_at": now.isoformat(),
    })
    response.set_cookie(
        key="session_token",
        value=session_token,
        max_age=SESSION_DAYS * 24 * 60 * 60,
        httponly=True,
        secure=True,
        samesite="none",
        path="/",
    )
    return {"user": user}


@auth_router.get("/user")
async def current_user(request: Request):
    user = await get_optional_user(request)
    if not user:
        raise HTTPException(401, "Not authenticated")
    return user


@auth_router.post("/logout")
async def logout(request: Request, response: FastResponse):
    token = request.cookies.get("session_token")
    if token:
        await db.user_sessions.delete_one({"session_token": token})
    response.delete_cookie("session_token", path="/", samesite="none", secure=True)
    return {"ok": True}


@auth_router.get("/my/bookings")
async def my_bookings(user=Depends(require_user)):
    docs = await db.bookings.find({"email": user["email"]}, {"_id": 0}).sort("created_at", -1).to_list(200)
    return docs


@auth_router.get("/my/orders")
async def my_orders(user=Depends(require_user)):
    docs = await db.payment_transactions.find(
        {"customer_email": user["email"]}, {"_id": 0}
    ).sort("created_at", -1).to_list(200)
    return docs


app.include_router(auth_router)


# ================= PRIVATE EVENT INQUIRIES =================
private_router = APIRouter(prefix="/api/private-events", tags=["private-events"])


class PrivateEventIn(BaseModel):
    area: str
    name: str
    email: EmailStr
    phone: str
    event_date: str
    guests: int = Field(ge=1, le=2500)
    occasion: str
    budget: Optional[str] = None
    message: Optional[str] = None


@private_router.post("")
async def create_private_event(body: PrivateEventIn):
    doc = {
        "id": str(uuid.uuid4()),
        **body.model_dump(),
        "status": "new",
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    await db.private_events.insert_one(doc)
    # Notification email to admin (best-effort)
    try:
        html = (
            f"<h2>Nuova richiesta evento privato</h2>"
            f"<p><b>Da:</b> {escape(body.name)} — {escape(body.email)} · {escape(body.phone)}</p>"
            f"<p><b>Data:</b> {escape(body.event_date)} · <b>Ospiti:</b> {body.guests} · <b>Zona:</b> {escape(body.area)}</p>"
            f"<p><b>Occasione:</b> {escape(body.occasion)}</p>"
            f"<p><b>Budget:</b> {escape(body.budget or '—')}</p>"
            f"<p><b>Messaggio:</b><br/>{escape(body.message or '—')}</p>"
        )
        await send_email(to=ADMIN_EMAIL, subject=f"Evento privato — {body.name} ({body.guests} ospiti)", html=html)
    except Exception as e:
        logging.error(f"private event notification failed: {e}")
    return {"ok": True, "id": doc["id"]}


@private_router.get("")
async def list_private_events(admin=Depends(get_admin)):
    docs = await db.private_events.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    return docs


app.include_router(private_router)


@private_router.patch("/{event_id}")
async def update_private_event(event_id: str, body: dict, admin=Depends(get_admin)):
    allowed = {k: body[k] for k in ("status", "notes") if k in body}
    if not allowed:
        raise HTTPException(400, "No valid fields")
    r = await db.private_events.update_one({"id": event_id}, {"$set": allowed})
    if r.matched_count == 0:
        raise HTTPException(404, "Not found")
    return {"ok": True}

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=[o.strip() for o in os.environ.get('CORS_ORIGINS', '').split(',') if o.strip()] or ["*"],
    allow_origin_regex=os.environ.get('CORS_ORIGIN_REGEX') or None,
    allow_methods=["*"],
    allow_headers=["*"],
)
