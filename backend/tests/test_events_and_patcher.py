"""Tests for startup patcher (about_* backfill) + admin event lifecycle + settings preservation."""
import os
import requests
import pytest

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://glitz-nightclub.preview.emergentagent.com").rstrip("/")
ADMIN_EMAIL = "jalucas@hotmail.it"
ADMIN_PASSWORD = "GlitzAdmin2026!"
LOGO_URL = "/api/files/glitzclub/media/8a518ef8-8f55-4a6f-81dc-13b0aa194cb8.png"


@pytest.fixture(scope="module")
def token():
    r = requests.post(f"{BASE_URL}/api/auth/login",
                      json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD}, timeout=15)
    assert r.status_code == 200, f"Login failed: {r.status_code} {r.text}"
    tok = r.json().get("token") or r.json().get("access_token")
    assert tok
    return tok


@pytest.fixture(scope="module")
def auth_headers(token):
    return {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}


# --- Startup patcher / settings backfill ---
class TestSettingsBackfill:
    def test_settings_has_about_zones(self):
        r = requests.get(f"{BASE_URL}/api/settings", timeout=15)
        assert r.status_code == 200
        data = r.json()
        zones = data.get("about_zones")
        assert isinstance(zones, list), f"about_zones not list: {type(zones)}"
        assert len(zones) >= 5, f"about_zones has {len(zones)} items, need >=5"
        for z in zones:
            for k in ("id", "title", "subtitle", "image", "description", "highlights"):
                assert k in z, f"zone missing key {k}: {z}"
            assert isinstance(z["highlights"], list)

    def test_about_keys_present(self):
        r = requests.get(f"{BASE_URL}/api/settings", timeout=15)
        data = r.json()
        required = [
            "about_kicker", "about_hero_line1", "about_hero_line2", "about_hero_subtitle",
            "about_hero_image_url",
            "about_stat_1_value", "about_stat_1_label",
            "about_stat_2_value", "about_stat_2_label",
            "about_stat_3_value", "about_stat_3_label",
            "about_location_title", "about_location_body",
            "about_gallery_kicker", "about_gallery_title",
        ]
        missing = [k for k in required if not data.get(k)]
        assert not missing, f"Missing/empty about_* keys: {missing}"

    def test_logo_url_present(self):
        r = requests.get(f"{BASE_URL}/api/settings", timeout=15)
        assert r.json().get("logo_url"), "logo_url missing from settings"

    def test_logo_file_serves(self):
        r = requests.get(f"{BASE_URL}{LOGO_URL}", timeout=15)
        assert r.status_code == 200
        assert "image" in r.headers.get("content-type", "")


# --- Admin event lifecycle ---
class TestEventLifecycle:
    created_id = None

    def test_full_event_crud(self, auth_headers):
        # Create
        payload = {
            "title": "TEST_Event_Playwright",
            "date": "2026-12-31",
            "description": "test event created by automated test",
        }
        r = requests.post(f"{BASE_URL}/api/admin/events", json=payload, headers=auth_headers, timeout=15)
        assert r.status_code in (200, 201), f"Create failed: {r.status_code} {r.text}"
        body = r.json()
        event_id = body.get("id") or body.get("_id")
        assert event_id, f"No id returned: {body}"

        # Verify in public GET /api/events
        r2 = requests.get(f"{BASE_URL}/api/events", timeout=15)
        assert r2.status_code == 200
        titles = [e.get("title") for e in r2.json()]
        assert "TEST_Event_Playwright" in titles, f"Event not in public list: {titles}"

        # PUT full body
        put_payload = {
            "title": "TEST_Event_Playwright_Updated",
            "date": "2026-12-31",
            "description": "updated",
            "published": True,
        }
        r3 = requests.put(f"{BASE_URL}/api/admin/events/{event_id}",
                          json=put_payload, headers=auth_headers, timeout=15)
        assert r3.status_code == 200, f"PUT failed: {r3.status_code} {r3.text}"

        # Delete
        r4 = requests.delete(f"{BASE_URL}/api/admin/events/{event_id}", headers=auth_headers, timeout=15)
        assert r4.status_code in (200, 204), f"Delete failed: {r4.status_code} {r4.text}"

        # Verify gone
        r5 = requests.get(f"{BASE_URL}/api/events", timeout=15)
        titles2 = [e.get("title") for e in r5.json()]
        assert "TEST_Event_Playwright_Updated" not in titles2


# --- Settings PUT preserves logo ---
class TestSettingsPreservesLogo:
    def test_put_settings_keeps_logo(self, auth_headers):
        # Get current
        r = requests.get(f"{BASE_URL}/api/settings", timeout=15)
        current = r.json()
        original_logo = current.get("logo_url")
        assert original_logo

        # PUT with a minor benign change (or same values)
        payload = dict(current)
        # remove non-writable fields if present
        payload.pop("_id", None)
        payload.pop("id", None)

        r2 = requests.put(f"{BASE_URL}/api/admin/settings", json=payload, headers=auth_headers, timeout=15)
        assert r2.status_code in (200, 201), f"PUT settings failed: {r2.status_code} {r2.text}"

        # Verify logo still present
        r3 = requests.get(f"{BASE_URL}/api/settings", timeout=15)
        assert r3.json().get("logo_url") == original_logo, "logo_url changed after PUT"
