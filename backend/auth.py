import os

import httpx
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel

from core import (
    create_token,
    db,
    get_current_user,
    hash_password,
    new_user_id,
    now_iso,
    sanitize_user,
    verify_password,
)

router = APIRouter(prefix="/api/auth")

EMERGENT_SESSION_URL = "https://demobackend.emergentagent.com/auth/v1/env/oauth/session-data"


class RegisterReq(BaseModel):
    name: str
    email: str
    password: str
    date_of_birth: str | None = None
    instagram: str | None = None
    photo_url: str | None = None


class LoginReq(BaseModel):
    email: str
    password: str


class SessionReq(BaseModel):
    session_id: str


class ProfileUpdate(BaseModel):
    name: str | None = None
    date_of_birth: str | None = None
    instagram: str | None = None
    photo_url: str | None = None


class PhoneSendReq(BaseModel):
    phone_number: str


class PhoneVerifyReq(BaseModel):
    phone_number: str
    code: str


@router.post("/register")
async def register(req: RegisterReq):
    email = req.email.strip().lower()
    if "@" not in email or len(req.password) < 6:
        raise HTTPException(status_code=400, detail="Email valida e password (min 6) richieste")
    existing = await db.users.find_one({"email": email})
    if existing:
        raise HTTPException(status_code=409, detail="Email già registrata")
    user = {
        "user_id": new_user_id(),
        "name": req.name.strip()[:40] or "Ospite",
        "email": email,
        "password_hash": hash_password(req.password),
        "date_of_birth": req.date_of_birth,
        "instagram": req.instagram,
        "photo_url": req.photo_url,
        "provider": "email",
        "created_at": now_iso(),
    }
    await db.users.insert_one(user)
    return {"token": create_token(user["user_id"]), "user": sanitize_user(user)}


@router.post("/login")
async def login(req: LoginReq):
    email = req.email.strip().lower()
    user = await db.users.find_one({"email": email})
    if not user or not user.get("password_hash") or not verify_password(req.password, user["password_hash"]):
        raise HTTPException(status_code=401, detail="Credenziali non valide")
    return {"token": create_token(user["user_id"]), "user": sanitize_user(user)}


@router.post("/session")
async def google_session(req: SessionReq):
    """Exchange an Emergent Google session_id for our own JWT."""
    async with httpx.AsyncClient(timeout=20) as http:
        resp = await http.get(EMERGENT_SESSION_URL, headers={"X-Session-ID": req.session_id})
    if resp.status_code != 200:
        raise HTTPException(status_code=401, detail="Sessione Google non valida")
    data = resp.json()
    email = (data.get("email") or "").strip().lower()
    if not email:
        raise HTTPException(status_code=401, detail="Email mancante")
    user = await db.users.find_one({"email": email})
    if not user:
        user = {
            "user_id": new_user_id(),
            "name": data.get("name") or email.split("@")[0],
            "email": email,
            "password_hash": None,
            "date_of_birth": None,
            "instagram": None,
            "photo_url": data.get("picture"),
            "provider": "google",
            "created_at": now_iso(),
        }
        await db.users.insert_one(user)
    return {"token": create_token(user["user_id"]), "user": sanitize_user(user)}


@router.get("/me")
async def me(current=Depends(get_current_user)):
    return {"user": sanitize_user(current)}


@router.patch("/profile")
async def update_profile(req: ProfileUpdate, current=Depends(get_current_user)):
    updates = {k: v for k, v in req.model_dump().items() if v is not None}
    if updates:
        await db.users.update_one({"user_id": current["user_id"]}, {"$set": updates})
    user = await db.users.find_one({"user_id": current["user_id"]}, {"_id": 0})
    return {"user": sanitize_user(user)}


# --- Phone OTP (Twilio) — guarded until credentials are configured ---------
def _twilio_ready() -> bool:
    return all(
        os.environ.get(k)
        for k in ("TWILIO_ACCOUNT_SID", "TWILIO_AUTH_TOKEN", "TWILIO_VERIFY_SERVICE_SID")
    )


@router.get("/phone/status")
async def phone_status():
    return {"configured": _twilio_ready()}


@router.post("/phone/send")
async def phone_send(req: PhoneSendReq):
    if not _twilio_ready():
        raise HTTPException(status_code=503, detail="Login via telefono non ancora attivo")
    from twilio.rest import Client  # noqa: PLC0415

    tw = Client(os.environ["TWILIO_ACCOUNT_SID"], os.environ["TWILIO_AUTH_TOKEN"])
    v = tw.verify.services(os.environ["TWILIO_VERIFY_SERVICE_SID"]).verifications.create(
        to=req.phone_number, channel="sms"
    )
    return {"status": v.status}


@router.post("/phone/verify")
async def phone_verify(req: PhoneVerifyReq):
    if not _twilio_ready():
        raise HTTPException(status_code=503, detail="Login via telefono non ancora attivo")
    from twilio.rest import Client  # noqa: PLC0415

    tw = Client(os.environ["TWILIO_ACCOUNT_SID"], os.environ["TWILIO_AUTH_TOKEN"])
    check = tw.verify.services(os.environ["TWILIO_VERIFY_SERVICE_SID"]).verification_checks.create(
        to=req.phone_number, code=req.code
    )
    if check.status != "approved":
        raise HTTPException(status_code=401, detail="Codice non valido")
    phone = req.phone_number
    user = await db.users.find_one({"phone": phone})
    if not user:
        user = {
            "user_id": new_user_id(),
            "name": "Ospite",
            "email": None,
            "phone": phone,
            "password_hash": None,
            "provider": "phone",
            "photo_url": None,
            "date_of_birth": None,
            "instagram": None,
            "created_at": now_iso(),
        }
        await db.users.insert_one(user)
    return {"token": create_token(user["user_id"]), "user": sanitize_user(user)}
