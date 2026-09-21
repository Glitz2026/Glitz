"""Backend tests for bookings + settings (iteration 2)."""
import os
import pytest
import requests

BASE = os.environ.get("REACT_APP_BACKEND_URL", "https://glitz-nightclub.preview.emergentagent.com").rstrip("/")
API = f"{BASE}/api"
ADMIN_EMAIL = "jalucas@hotmail.it"
ADMIN_PASSWORD = "GlitzAdmin2026!"


@pytest.fixture(scope="module")
def token():
    r = requests.post(f"{API}/auth/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD}, timeout=15)
    assert r.status_code == 200, r.text
    return r.json()["token"]


@pytest.fixture(scope="module")
def auth_headers(token):
    return {"Authorization": f"Bearer {token}"}


# --- Settings ---
def test_settings_populated():
    r = requests.get(f"{API}/settings", timeout=15)
    assert r.status_code == 200
    data = r.json()
    for k in ("logo_url", "planimetria_url", "hero_video_url"):
        assert data.get(k), f"settings.{k} is empty"


# --- Past events ---
def test_past_events():
    r = requests.get(f"{API}/past-events", timeout=15)
    assert r.status_code == 200
    assert isinstance(r.json(), list)
    assert len(r.json()) > 0


# --- Bookings ---
def test_create_booking_no_auth():
    payload = {
        "name": "TEST_QA",
        "phone": "+39 333 1111111",
        "guests": 4,
        "table_number": "B5",
        "zone": "pista",
        "note": "test note",
    }
    r = requests.post(f"{API}/bookings", json=payload, timeout=30)
    assert r.status_code == 200, r.text
    body = r.json()
    assert body["name"] == "TEST_QA"
    assert body["status"] == "pending"
    assert "id" in body
    assert "_id" not in body
    pytest.booking_id = body["id"]


def test_admin_bookings_requires_auth():
    r = requests.get(f"{API}/admin/bookings", timeout=15)
    assert r.status_code in (401, 403)


def test_admin_bookings_list(auth_headers):
    r = requests.get(f"{API}/admin/bookings", headers=auth_headers, timeout=15)
    assert r.status_code == 200
    data = r.json()
    assert isinstance(data, list)
    ids = [b["id"] for b in data]
    assert getattr(pytest, "booking_id", None) in ids


def test_admin_booking_status_update(auth_headers):
    bid = getattr(pytest, "booking_id", None)
    assert bid
    r = requests.patch(f"{API}/admin/bookings/{bid}?status=confirmed", headers=auth_headers, timeout=15)
    assert r.status_code == 200
    assert r.json().get("updated") == 1
    # Verify persistence
    r2 = requests.get(f"{API}/admin/bookings", headers=auth_headers, timeout=15)
    match = [b for b in r2.json() if b["id"] == bid]
    assert match and match[0]["status"] == "confirmed"
