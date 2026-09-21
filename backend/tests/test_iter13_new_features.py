"""Iteration 13 backend tests: artist_photo_url, home_gallery_preview_*, media reorder + patch."""
import os
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://glitz-nightclub.preview.emergentagent.com").rstrip("/")
ADMIN_EMAIL = "jalucas@hotmail.it"
ADMIN_PASSWORD = "GlitzAdmin2026!"


@pytest.fixture(scope="module")
def token():
    r = requests.post(f"{BASE_URL}/api/auth/login",
                      json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD}, timeout=15)
    assert r.status_code == 200, r.text
    return r.json()["token"]


@pytest.fixture(scope="module")
def auth_headers(token):
    return {"Authorization": f"Bearer {token}"}


# ---- Event artist_photo_url ----
class TestEventArtistPhoto:
    def test_create_event_with_artist_photo(self, auth_headers):
        payload = {
            "title": "TEST_iter13_event",
            "date": "2027-08-01T22:00:00Z",
            "description": "test",
            "poster_url": "https://example.com/poster.jpg",
            "artist_photo_url": "https://example.com/artist.jpg",
            "published": True,
        }
        r = requests.post(f"{BASE_URL}/api/admin/events", json=payload, headers=auth_headers, timeout=15)
        assert r.status_code in (200, 201), r.text
        data = r.json()
        assert data["artist_photo_url"] == "https://example.com/artist.jpg"
        assert data["poster_url"] == "https://example.com/poster.jpg"
        assert "id" in data
        eid = data["id"]

        # GET /api/events reflects it
        g = requests.get(f"{BASE_URL}/api/events", timeout=15)
        assert g.status_code == 200
        found = [e for e in g.json() if e["id"] == eid]
        assert len(found) == 1
        assert found[0]["artist_photo_url"] == "https://example.com/artist.jpg"

        # cleanup
        d = requests.delete(f"{BASE_URL}/api/admin/events/{eid}", headers=auth_headers, timeout=15)
        assert d.status_code == 200


# ---- Settings home_gallery_preview_* ----
class TestSettingsGalleryPreview:
    def test_get_settings_has_defaults(self):
        r = requests.get(f"{BASE_URL}/api/settings", timeout=15)
        assert r.status_code == 200
        d = r.json()
        assert "home_gallery_preview_kicker" in d
        assert "home_gallery_preview_title" in d
        # default title
        assert d["home_gallery_preview_title"] in ("Uno sguardo dentro", d["home_gallery_preview_title"])

    def test_partial_put_updates_title_and_restores(self, auth_headers):
        # capture original
        cur = requests.get(f"{BASE_URL}/api/settings", timeout=15).json()
        original_title = cur.get("home_gallery_preview_title", "Uno sguardo dentro")
        original_kicker = cur.get("home_gallery_preview_kicker", "")

        # partial update
        r = requests.put(f"{BASE_URL}/api/admin/settings",
                         json={"home_gallery_preview_title": "TEST_iter13_Title",
                               "home_gallery_preview_kicker": "TEST_iter13_Kicker"},
                         headers=auth_headers, timeout=15)
        assert r.status_code == 200, r.text

        g = requests.get(f"{BASE_URL}/api/settings", timeout=15).json()
        assert g["home_gallery_preview_title"] == "TEST_iter13_Title"
        assert g["home_gallery_preview_kicker"] == "TEST_iter13_Kicker"

        # Also ensure critical fields (about_zones, about_gallery_groups) not wiped
        assert isinstance(g.get("about_zones", []), list)
        assert isinstance(g.get("about_gallery_groups", []), list)

        # restore
        rr = requests.put(f"{BASE_URL}/api/admin/settings",
                          json={"home_gallery_preview_title": original_title,
                                "home_gallery_preview_kicker": original_kicker},
                          headers=auth_headers, timeout=15)
        assert rr.status_code == 200


# ---- Media reorder + patch category ----
class TestMediaReorderAndPatch:
    def test_reorder_and_patch(self, auth_headers):
        # get some existing media
        r = requests.get(f"{BASE_URL}/api/media?category=gallery-eventi", timeout=15)
        assert r.status_code == 200, r.text
        items = r.json()
        if len(items) < 2:
            pytest.skip("Not enough media in gallery-eventi to test reorder")

        ids = [m["id"] for m in items]  # ALL items to avoid ordering ambiguity with unset 'order'
        # reverse
        reversed_ids = list(reversed(ids))
        rr = requests.post(f"{BASE_URL}/api/admin/media/reorder",
                           json={"order": reversed_ids}, headers=auth_headers, timeout=15)
        assert rr.status_code == 200, rr.text
        assert rr.json()["reordered"] == len(reversed_ids)

        # verify order in GET
        g = requests.get(f"{BASE_URL}/api/media?category=gallery-eventi", timeout=15).json()
        # first N returned should match reversed_ids order (since order asc)
        got_head = [m["id"] for m in g[:len(reversed_ids)]]
        assert got_head == reversed_ids, f"Expected {reversed_ids}, got {got_head}"

        # restore original order
        requests.post(f"{BASE_URL}/api/admin/media/reorder",
                      json={"order": ids}, headers=auth_headers, timeout=15)

    def test_patch_category(self, auth_headers):
        r = requests.get(f"{BASE_URL}/api/media?category=gallery-eventi", timeout=15).json()
        if not r:
            pytest.skip("no media")
        target = r[-1]  # last item, less impactful
        mid = target["id"]
        orig_cat = target["category"]

        # move to gallery-dettagli
        p = requests.patch(f"{BASE_URL}/api/admin/media/{mid}",
                           json={"category": "gallery-dettagli"},
                           headers=auth_headers, timeout=15)
        assert p.status_code == 200, p.text

        # verify
        g = requests.get(f"{BASE_URL}/api/media?category=gallery-dettagli", timeout=15).json()
        assert any(m["id"] == mid for m in g)

        # restore
        pr = requests.patch(f"{BASE_URL}/api/admin/media/{mid}",
                            json={"category": orig_cat}, headers=auth_headers, timeout=15)
        assert pr.status_code == 200

    def test_patch_requires_admin(self):
        r = requests.patch(f"{BASE_URL}/api/admin/media/fake-id", json={"category": "x"}, timeout=15)
        assert r.status_code in (401, 403)

    def test_reorder_requires_admin(self):
        r = requests.post(f"{BASE_URL}/api/admin/media/reorder", json={"order": []}, timeout=15)
        assert r.status_code in (401, 403)

    def test_reorder_invalid_body(self, auth_headers):
        r = requests.post(f"{BASE_URL}/api/admin/media/reorder",
                          json={"order": "notalist"}, headers=auth_headers, timeout=15)
        assert r.status_code == 400
