"""Final retest: media gallery-eventi returns >=4 and partial PUT preserves nested arrays."""
import os
import requests
import pytest

BASE = os.environ.get("REACT_APP_BACKEND_URL", "https://glitz-nightclub.preview.emergentagent.com").rstrip("/")
ADMIN_EMAIL = "jalucas@hotmail.it"
ADMIN_PASS = "GlitzAdmin2026!"


@pytest.fixture(scope="module")
def token():
    r = requests.post(f"{BASE}/api/auth/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASS}, timeout=15)
    assert r.status_code == 200, r.text
    return r.json().get("token") or r.json().get("access_token")


def test_media_gallery_eventi_returns_at_least_4():
    r = requests.get(f"{BASE}/api/media", params={"category": "gallery-eventi"}, timeout=15)
    assert r.status_code == 200, r.text
    data = r.json()
    assert isinstance(data, list)
    assert len(data) >= 4, f"expected >=4 gallery-eventi media, got {len(data)}"
    for item in data[:4]:
        assert "url" in item and item["url"]


def test_media_gallery_location_and_dettagli():
    for cat in ["gallery-location", "gallery-dettagli"]:
        r = requests.get(f"{BASE}/api/media", params={"category": cat}, timeout=15)
        assert r.status_code == 200
        assert len(r.json()) >= 3, f"{cat} count too low"


def test_partial_put_settings_preserves_nested(token):
    hdr = {"Authorization": f"Bearer {token}"}
    # snapshot
    before = requests.get(f"{BASE}/api/settings", timeout=15).json()
    zones_before = before.get("about_zones", [])
    groups_before = before.get("about_gallery_groups", [])
    hero_before = before.get("home_hero_line1")
    assert len(zones_before) >= 5
    assert len(groups_before) >= 3

    # partial PUT
    r = requests.put(f"{BASE}/api/admin/settings", json={"home_hero_line1": "BEYOND"}, headers=hdr, timeout=15)
    assert r.status_code == 200, r.text

    after = requests.get(f"{BASE}/api/settings", timeout=15).json()
    assert after.get("home_hero_line1") == "BEYOND"
    assert len(after.get("about_zones", [])) == len(zones_before), "zones wiped by partial PUT!"
    assert len(after.get("about_gallery_groups", [])) == len(groups_before), "groups wiped by partial PUT!"

    # restore
    requests.put(f"{BASE}/api/admin/settings", json={"home_hero_line1": hero_before}, headers=hdr, timeout=15)
