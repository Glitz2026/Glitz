"""Test partial-update behavior on PUT /api/admin/settings and full-payload regression."""
import os
import requests
import pytest

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL").rstrip("/")
ADMIN_EMAIL = "jalucas@hotmail.it"
ADMIN_PASS = "GlitzAdmin2026!"


@pytest.fixture(scope="module")
def admin_token():
    r = requests.post(f"{BASE_URL}/api/auth/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASS}, timeout=15)
    assert r.status_code == 200, r.text
    return r.json()["token"]


@pytest.fixture(scope="module")
def auth_headers(admin_token):
    return {"Authorization": f"Bearer {admin_token}", "Content-Type": "application/json"}


def get_settings():
    r = requests.get(f"{BASE_URL}/api/settings", timeout=15)
    assert r.status_code == 200, r.text
    return r.json()


def test_partial_put_does_not_wipe_zones_and_groups(auth_headers):
    before = get_settings()
    zones_before = before.get("about_zones", [])
    groups_before = before.get("about_gallery_groups", [])
    hero_before = before.get("home_hero_line1", "")
    assert len(zones_before) > 0, "about_zones should be seeded"
    assert len(groups_before) > 0, "about_gallery_groups should be seeded"

    # Partial PUT: only home_hero_line1
    r = requests.put(
        f"{BASE_URL}/api/admin/settings",
        json={"home_hero_line1": "BEYOND"},
        headers=auth_headers,
        timeout=15,
    )
    assert r.status_code == 200, r.text

    after = get_settings()
    assert after.get("home_hero_line1") == "BEYOND"
    assert len(after.get("about_zones", [])) == len(zones_before), "about_zones was wiped by partial PUT"
    assert len(after.get("about_gallery_groups", [])) == len(groups_before), "about_gallery_groups was wiped by partial PUT"

    # Restore original hero
    requests.put(
        f"{BASE_URL}/api/admin/settings",
        json={"home_hero_line1": hero_before},
        headers=auth_headers,
        timeout=15,
    )


def test_full_payload_put_persists_reorder_and_append(auth_headers):
    before = get_settings()
    zones = list(before.get("about_zones", []))
    groups = list(before.get("about_gallery_groups", []))
    contact_email_before = before.get("contact_email", "info@glitzclub.it")
    assert len(zones) >= 2 and len(groups) >= 1

    # Reorder zones (swap first two)
    reordered_zones = [zones[1], zones[0]] + zones[2:]
    # Append a gallery group
    new_group = {"title": "TEST_Group", "category": "gallery-eventi"}
    new_groups = groups + [new_group]
    new_email = "TEST_contact@glitzclub.it"

    payload = {
        "home_hero_line1": before.get("home_hero_line1", ""),
        "home_hero_line2": before.get("home_hero_line2", ""),
        "about_zones": reordered_zones,
        "about_gallery_groups": new_groups,
        "contact_email": new_email,
    }
    r = requests.put(f"{BASE_URL}/api/admin/settings", json=payload, headers=auth_headers, timeout=15)
    assert r.status_code == 200, r.text

    after = get_settings()
    assert after["about_zones"][0].get("title") == zones[1].get("title"), "reorder not persisted"
    assert len(after["about_gallery_groups"]) == len(groups) + 1
    assert after["about_gallery_groups"][-1]["title"] == "TEST_Group"
    assert after["contact_email"] == new_email

    # Restore
    restore = {
        "about_zones": zones,
        "about_gallery_groups": groups,
        "contact_email": contact_email_before,
    }
    requests.put(f"{BASE_URL}/api/admin/settings", json=restore, headers=auth_headers, timeout=15)
    final = get_settings()
    assert len(final["about_gallery_groups"]) == len(groups)
    assert final["contact_email"] == contact_email_before
