"""Iteration 4 regression tests: real Glitz seed data (events, tables w/ x,y, club-info)
and that waiter-calls / orders / tickets still require Bearer auth."""
import os
import uuid

import pytest
import requests


BASE_URL = os.environ.get("EXPO_PUBLIC_BACKEND_URL")
if not BASE_URL:
    with open("/app/frontend/.env") as f:
        for line in f:
            if line.startswith("EXPO_PUBLIC_BACKEND_URL="):
                BASE_URL = line.split("=", 1)[1].strip()
BASE_URL = BASE_URL.rstrip("/")

SEED_EVENTS = ["ev-damante", "ev-giada", "ev-raul"]
SITE = "https://glitz-nightclub.preview.emergentagent.com"


@pytest.fixture(scope="module")
def auth_headers():
    email = f"iter4_{uuid.uuid4().hex[:10]}@glitz.test"
    r = requests.post(
        f"{BASE_URL}/api/auth/register",
        json={"email": email, "password": "secret1", "name": "Iter4"},
        timeout=30,
    )
    assert r.status_code in (200, 201), r.text
    tok = r.json().get("token") or r.json().get("access_token")
    assert tok, r.json()
    return {"Authorization": f"Bearer {tok}", "Content-Type": "application/json"}


# --- Events ---------------------------------------------------------------
class TestEvents:
    def test_events_list_has_only_three_seed(self, auth_headers):
        r = requests.get(f"{BASE_URL}/api/events", headers=auth_headers, timeout=30)
        assert r.status_code == 200, r.text
        events = r.json()["events"]
        ids = [e["id"] for e in events]
        assert ids == SEED_EVENTS or sorted(ids) == sorted(SEED_EVENTS), ids
        assert len(events) == 3

    def test_events_have_real_titles_and_covers(self, auth_headers):
        r = requests.get(f"{BASE_URL}/api/events", headers=auth_headers, timeout=30)
        events = {e["id"]: e for e in r.json()["events"]}
        assert "DAMANTE" in events["ev-damante"]["title"]
        assert "GIADA BRINCE" in events["ev-giada"]["title"]
        assert "RAUL DUMITRAS" in events["ev-raul"]["title"]
        for e in events.values():
            assert e["cover"].startswith(SITE), e["cover"]
            assert e["date"].startswith("2027-")
            assert isinstance(e["formulas"], list) and len(e["formulas"]) >= 1

    @pytest.mark.parametrize("ev_id", SEED_EVENTS)
    def test_event_by_id(self, ev_id, auth_headers):
        r = requests.get(f"{BASE_URL}/api/events/{ev_id}", headers=auth_headers, timeout=30)
        assert r.status_code == 200
        ev = r.json()["event"]
        assert ev["id"] == ev_id
        assert ev["cover"].startswith(SITE)

    def test_event_by_id_404(self, auth_headers):
        r = requests.get(f"{BASE_URL}/api/events/does-not-exist", headers=auth_headers, timeout=30)
        assert r.status_code == 404


# --- Tables ---------------------------------------------------------------
class TestZones:
    def test_zones_shape(self, auth_headers):
        r = requests.get(f"{BASE_URL}/api/tables/zones", headers=auth_headers, timeout=30)
        assert r.status_code == 200
        zones = r.json()["zones"]
        assert len(zones) == 8
        # All zones must carry piantina coords + core fields
        keys = {"id", "name", "area", "seats", "price", "bottles", "available", "x", "y"}
        for z in zones:
            assert keys.issubset(z.keys()), z
            assert 0 <= z["x"] <= 100
            assert 0 <= z["y"] <= 100

    def test_arco2_unavailable(self, auth_headers):
        r = requests.get(f"{BASE_URL}/api/tables/zones", headers=auth_headers, timeout=30)
        zones = {z["id"]: z for z in r.json()["zones"]}
        assert zones["z-arco-2"]["available"] is False
        # other tables should be available
        assert zones["z-riva-1"]["available"] is True


# --- Club info ------------------------------------------------------------
class TestClubInfo:
    def test_club_info(self, auth_headers):
        r = requests.get(f"{BASE_URL}/api/club-info", headers=auth_headers, timeout=30)
        assert r.status_code == 200, r.text
        c = r.json()["club"]
        assert c["name"] == "GLITZ CLUB"
        assert "San Nicola Arcella" in c["address"]
        assert c["instagram"]
        assert isinstance(c["areas"], list) and len(c["areas"]) >= 4


# --- Tickets (buy real event) --------------------------------------------
class TestTickets:
    def test_buy_ticket_for_real_event(self, auth_headers):
        r = requests.post(
            f"{BASE_URL}/api/tickets",
            headers=auth_headers,
            json={"event_id": "ev-damante", "formula_id": "std"},
            timeout=30,
        )
        assert r.status_code == 200, r.text
        tk = r.json()["ticket"]
        assert tk["event_id"] == "ev-damante"
        assert tk["code"].startswith("GLITZ-")
        assert tk["price"] == 25
        assert tk["event_cover"].startswith(SITE)

        # GET /api/tickets contains it
        r2 = requests.get(f"{BASE_URL}/api/tickets", headers=auth_headers, timeout=30)
        assert r2.status_code == 200
        codes = [t["code"] for t in r2.json()["tickets"]]
        assert tk["code"] in codes

        # my-night surfaces it as next_ticket (2027 future)
        r3 = requests.get(f"{BASE_URL}/api/my-night", headers=auth_headers, timeout=30)
        assert r3.status_code == 200
        nxt = r3.json()["next_ticket"]
        assert nxt and nxt["event_id"] in SEED_EVENTS


# --- Waiter calls / Orders auth-gating -----------------------------------
class TestServiceAuth:
    def test_waiter_call_requires_bearer(self):
        r = requests.post(f"{BASE_URL}/api/waiter-calls", json={"type": "acqua", "zone": "RIVA 1"}, timeout=30)
        assert r.status_code in (401, 403)

    def test_order_requires_bearer(self):
        r = requests.post(
            f"{BASE_URL}/api/orders",
            json={"items": [{"id": "m-01", "name": "Glitz Spritz", "price": 12, "qty": 1}], "zone": "RIVA 1"},
            timeout=30,
        )
        assert r.status_code in (401, 403)

    def test_waiter_call_and_order_success(self, auth_headers):
        # waiter call with a real table name from the plan
        r = requests.post(
            f"{BASE_URL}/api/waiter-calls",
            headers=auth_headers,
            json={"type": "acqua", "zone": "RIVA 1"},
            timeout=30,
        )
        assert r.status_code == 200, r.text
        assert r.json()["call"]["zone"] == "RIVA 1"

        # order with a real table zone
        r2 = requests.post(
            f"{BASE_URL}/api/orders",
            headers=auth_headers,
            json={
                "items": [{"id": "m-01", "name": "Glitz Spritz", "price": 12, "qty": 2}],
                "zone": "RIVA 1",
            },
            timeout=30,
        )
        assert r2.status_code == 200, r2.text
        o = r2.json()["order"]
        assert o["zone"] == "RIVA 1"
        assert o["total"] == 24.0

        # GET verifies persistence
        r3 = requests.get(f"{BASE_URL}/api/orders", headers=auth_headers, timeout=30)
        assert r3.status_code == 200
        zones = [x["zone"] for x in r3.json()["orders"]]
        assert "RIVA 1" in zones
