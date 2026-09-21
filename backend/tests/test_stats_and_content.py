"""Backend tests for /api/admin/stats and home_* settings round-trip (iteration 4)."""
import os
import pytest
import requests

BASE = os.environ.get("REACT_APP_BACKEND_URL", "https://glitz-nightclub.preview.emergentagent.com").rstrip("/")
API = f"{BASE}/api"
ADMIN_EMAIL = "jalucas@hotmail.it"
ADMIN_PASSWORD = "GlitzAdmin2026!"

HOME_KEYS = [
    "home_hero_line1", "home_hero_line2", "home_hero_subtitle",
    "home_opening_title", "home_events_kicker", "home_events_title",
    "home_location_kicker", "home_location_title", "home_location_body",
    "home_faq_title", "home_faq_intro",
]


@pytest.fixture(scope="module")
def token():
    r = requests.post(f"{API}/auth/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD}, timeout=15)
    assert r.status_code == 200, r.text
    return r.json()["token"]


@pytest.fixture(scope="module")
def auth_headers(token):
    return {"Authorization": f"Bearer {token}"}


# --- /api/admin/stats ---
def test_stats_requires_auth():
    r = requests.get(f"{API}/admin/stats", timeout=15)
    assert r.status_code in (401, 403)


def test_stats_shape(auth_headers):
    r = requests.get(f"{API}/admin/stats", headers=auth_headers, timeout=15)
    assert r.status_code == 200, r.text
    d = r.json()
    for k in ("revenue_paid_cents", "revenue_week_cents", "orders_count",
              "bookings_total", "bookings_week", "bookings_pending",
              "private_total", "private_new"):
        assert k in d, f"missing key: {k}"
        assert isinstance(d[k], int), f"{k} not int: {type(d[k])}"
    assert "next_event" in d
    ne = d["next_event"]
    assert ne is None or isinstance(ne, dict)
    if ne:
        for k in ("id", "title", "date", "expected_guests", "tables_reserved"):
            assert k in ne, f"next_event missing {k}"


# --- Home_* settings ---
def test_settings_has_home_keys():
    r = requests.get(f"{API}/settings", timeout=15)
    assert r.status_code == 200
    d = r.json()
    for k in HOME_KEYS:
        assert k in d, f"missing settings key: {k}"


def test_settings_roundtrip_home_hero_line1(auth_headers):
    # snapshot current settings
    orig = requests.get(f"{API}/settings", timeout=15).json()
    original_val = orig.get("home_hero_line1", "BEYOND")

    # build full SettingsIn body (echo all keys)
    body = dict(orig)
    body.pop("_id", None)
    test_val = "QATEST_BEYOND"
    body["home_hero_line1"] = test_val

    r = requests.put(f"{API}/admin/settings", json=body, headers=auth_headers, timeout=20)
    assert r.status_code == 200, r.text

    # verify persisted
    r2 = requests.get(f"{API}/settings", timeout=15)
    assert r2.status_code == 200
    assert r2.json().get("home_hero_line1") == test_val

    # restore
    body["home_hero_line1"] = original_val
    r3 = requests.put(f"{API}/admin/settings", json=body, headers=auth_headers, timeout=20)
    assert r3.status_code == 200
    r4 = requests.get(f"{API}/settings", timeout=15)
    assert r4.json().get("home_hero_line1") == original_val
