"""Backend tests for iteration 7: contact_* settings and about_gallery_groups."""
import os
import copy
import pytest
import requests

BASE = (os.environ.get("REACT_APP_BACKEND_URL") or "https://glitz-nightclub.preview.emergentagent.com").rstrip("/")
API = f"{BASE}/api"
ADMIN_EMAIL = "jalucas@hotmail.it"
ADMIN_PASSWORD = "GlitzAdmin2026!"


@pytest.fixture(scope="module")
def auth_headers():
    r = requests.post(f"{API}/auth/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD}, timeout=15)
    assert r.status_code == 200, r.text
    return {"Authorization": f"Bearer {r.json()['token']}"}


# --- Contact settings defaults ---
def test_settings_has_contact_defaults():
    r = requests.get(f"{API}/settings", timeout=15)
    assert r.status_code == 200
    d = r.json()
    assert d.get("contact_kicker") == "Contatti"
    assert d.get("contact_title") == "Scrivici"
    assert d.get("contact_whatsapp_number") == "393444289232"
    assert d.get("contact_whatsapp_display") == "344 4289232"
    assert d.get("contact_email") == "glitzclubofficial@gmail.com"
    assert d.get("contact_instagram") == "https://instagram.com/glitzclubofficial"
    assert d.get("contact_instagram_handle") == "@glitzclubofficial"
    assert d.get("contact_address"), "contact_address empty"
    hours = d.get("contact_hours", "")
    assert hours and "\n" in hours, f"contact_hours must be non-empty with newline: {hours!r}"
    map_url = d.get("contact_map_embed_url", "")
    assert "google.com/maps" in map_url and "output=embed" in map_url, f"bad map url {map_url!r}"


def test_settings_has_gallery_groups_defaults():
    r = requests.get(f"{API}/settings", timeout=15)
    d = r.json()
    groups = d.get("about_gallery_groups")
    assert isinstance(groups, list) and len(groups) == 3, f"expected 3 groups, got {groups}"
    titles = [g.get("title") for g in groups]
    cats = [g.get("category") for g in groups]
    assert titles == ["Eventi & Pubblico", "Location", "Dettagli"], titles
    assert cats == ["gallery-eventi", "gallery-location", "gallery-dettagli"], cats


# --- Roundtrip PUT /api/admin/settings ---
def test_settings_roundtrip(auth_headers):
    # Get current
    original = requests.get(f"{API}/settings", timeout=15).json()
    orig_email = original.get("contact_email")
    orig_groups = copy.deepcopy(original.get("about_gallery_groups"))

    # Update
    payload = {
        "contact_email": "test@example.com",
        "about_gallery_groups": [
            {"title": "A", "category": "gallery-a"},
            {"title": "B", "category": "gallery-b"},
        ],
    }
    r = requests.put(f"{API}/admin/settings", json=payload, headers=auth_headers, timeout=15)
    assert r.status_code == 200, r.text

    # Verify
    after = requests.get(f"{API}/settings", timeout=15).json()
    assert after.get("contact_email") == "test@example.com"
    ag = after.get("about_gallery_groups")
    assert len(ag) == 2
    assert ag[0]["title"] == "A" and ag[0]["category"] == "gallery-a"
    assert ag[1]["title"] == "B" and ag[1]["category"] == "gallery-b"

    # Restore
    restore = {"contact_email": orig_email, "about_gallery_groups": orig_groups}
    r2 = requests.put(f"{API}/admin/settings", json=restore, headers=auth_headers, timeout=15)
    assert r2.status_code == 200
    check = requests.get(f"{API}/settings", timeout=15).json()
    assert check.get("contact_email") == orig_email
    assert check.get("about_gallery_groups") == orig_groups


# --- Media endpoint filter works ---
def test_media_category_filter():
    for cat in ("gallery-eventi", "gallery-location", "gallery-dettagli"):
        r = requests.get(f"{API}/media", params={"category": cat}, timeout=15)
        assert r.status_code == 200
        assert isinstance(r.json(), list)
