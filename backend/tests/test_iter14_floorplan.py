import os
import requests
import pytest

BASE = os.environ.get("REACT_APP_BACKEND_URL", "https://glitz-nightclub.preview.emergentagent.com").rstrip("/")
ADMIN_EMAIL = "jalucas@hotmail.it"
ADMIN_PW = "GlitzAdmin2026!"


@pytest.fixture(scope="module")
def token():
    r = requests.post(f"{BASE}/api/auth/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PW}, timeout=30)
    assert r.status_code == 200, r.text
    return r.json()["token"]


@pytest.fixture(scope="module")
def hdr(token):
    return {"Authorization": f"Bearer {token}"}


def test_settings_floorplan_zones_defaults():
    r = requests.get(f"{BASE}/api/settings", timeout=30)
    assert r.status_code == 200
    zones = r.json().get("floorplan_zones", [])
    assert isinstance(zones, list)
    assert len(zones) == 3, f"expected 3, got {len(zones)}: {zones}"
    ids = {z["id"] for z in zones}
    assert ids == {"STAGE", "RIVA", "BAR"}, ids
    for z in zones:
        for k in ("id", "label", "color", "price_from", "min_spend", "bottles", "description"):
            assert k in z, f"missing key {k} in {z}"
        assert z["label"], f"empty label {z}"
        assert z["color"], f"empty color {z}"
        assert z["price_from"], f"empty price_from {z}"
        assert z["bottles"], f"empty bottles {z}"
        assert z["description"], f"empty description {z}"


def _get_zones():
    return {z["id"]: z for z in requests.get(f"{BASE}/api/settings", timeout=30).json().get("floorplan_zones", [])}


def test_partial_put_floorplan_zones_replaces_and_restore(hdr):
    original = _get_zones()
    assert set(original) == {"STAGE", "RIVA", "BAR"}

    # Full array replace with just STAGE modified plus other two identical entries
    new_stage = {
        "id": "STAGE",
        "label": "Back the Stage",
        "color": "#E10600",
        "price_from": "€ 500",
        "bottles": "2 bottiglie",
        "description": "nuovo",
        "min_spend": "",
    }
    payload_zones = [new_stage, original["RIVA"], original["BAR"]]
    r = requests.put(f"{BASE}/api/admin/settings", json={"floorplan_zones": payload_zones}, headers=hdr, timeout=30)
    assert r.status_code == 200, r.text

    z2 = _get_zones()
    assert z2["STAGE"]["price_from"] == "€ 500"
    assert z2["STAGE"]["description"] == "nuovo"
    assert z2["STAGE"]["bottles"] == "2 bottiglie"
    # RIVA / BAR untouched
    assert z2["RIVA"]["price_from"] == original["RIVA"]["price_from"]
    assert z2["BAR"]["price_from"] == original["BAR"]["price_from"]

    # Restore
    restore = [original["STAGE"], original["RIVA"], original["BAR"]]
    r = requests.put(f"{BASE}/api/admin/settings", json={"floorplan_zones": restore}, headers=hdr, timeout=30)
    assert r.status_code == 200
    z3 = _get_zones()
    assert z3["STAGE"]["price_from"] == original["STAGE"]["price_from"]
    assert z3["STAGE"]["description"] == original["STAGE"]["description"]


def test_regression_events_and_upcoming():
    r = requests.get(f"{BASE}/api/events", timeout=30)
    assert r.status_code == 200
    events = r.json()
    assert len(events) >= 1
    assert any(e.get("floorplan_enabled") for e in events)
