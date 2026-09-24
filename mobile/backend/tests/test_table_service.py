"""Tests for the table-service feature: waiter calls, orders, expanded BOTTIGLIE menu.

These tests exercise the newly added endpoints in club.py:
- POST /api/waiter-calls, GET /api/waiter-calls
- POST /api/orders, GET /api/orders
- GET /api/menu now includes an expanded BOTTIGLIE category (Vodka, Champagne, Gin, Rum, Tequila, Prosecco)
- All new endpoints require Bearer auth (401 without)
"""
import uuid
import time
import pytest


def _register(api, base_url):
    email = f"tabl_{uuid.uuid4().hex[:10]}@glitz.test"
    r = api.post(f"{base_url}/api/auth/register", json={
        "email": email,
        "password": "secret1",
        "name": "TEST_TableService",
    })
    assert r.status_code == 200, r.text
    tok = r.json()["token"]
    api.headers.update({"Authorization": f"Bearer {tok}"})
    return email, tok


# --- Auth gating (401 without token) ---------------------------------------
class TestAuthGating:
    def test_waiter_calls_requires_auth(self, api, base_url):
        r = api.post(f"{base_url}/api/waiter-calls", json={"type": "acqua"})
        assert r.status_code == 401
        r2 = api.get(f"{base_url}/api/waiter-calls")
        assert r2.status_code == 401

    def test_orders_requires_auth(self, api, base_url):
        r = api.post(f"{base_url}/api/orders", json={"items": [], "zone": "TAVOLO"})
        assert r.status_code == 401
        r2 = api.get(f"{base_url}/api/orders")
        assert r2.status_code == 401


# --- Menu / BOTTIGLIE expansion --------------------------------------------
class TestMenu:
    def test_menu_has_expanded_bottiglie(self, api, base_url):
        _register(api, base_url)
        r = api.get(f"{base_url}/api/menu")
        assert r.status_code == 200
        data = r.json()
        cats = {c["category"]: c for c in data["menu"]}
        assert "BOTTIGLIE" in cats, "BOTTIGLIE category missing"
        names = {i["name"].lower() for i in cats["BOTTIGLIE"]["items"]}
        for expected in ["vodka", "champagne", "gin", "rum", "tequila", "prosecco"]:
            assert any(expected in n for n in names), f"missing {expected} in BOTTIGLIE"
        # each item must have id, name, price
        for it in cats["BOTTIGLIE"]["items"]:
            assert "id" in it and "name" in it and "price" in it


# --- Waiter calls ----------------------------------------------------------
class TestWaiterCalls:
    def test_invalid_type_returns_400(self, api, base_url):
        _register(api, base_url)
        r = api.post(f"{base_url}/api/waiter-calls", json={"type": "NON_ESISTE", "zone": "TAVOLO"})
        assert r.status_code == 400

    def test_create_and_list_call(self, api, base_url):
        _register(api, base_url)
        r = api.post(f"{base_url}/api/waiter-calls", json={"type": "acqua", "zone": "TAVOLO"})
        assert r.status_code == 200, r.text
        call = r.json()["call"]
        assert call["type"] == "acqua"
        assert call["zone"] == "TAVOLO"
        assert call["status"] == "sent"
        assert "id" in call and "created_at" in call

        r2 = api.get(f"{base_url}/api/waiter-calls")
        assert r2.status_code == 200
        lst = r2.json()["calls"]
        assert any(c["id"] == call["id"] for c in lst)
        mine = next(c for c in lst if c["id"] == call["id"])
        assert mine["status"] == "sent"

    def test_all_valid_types_accepted(self, api, base_url):
        _register(api, base_url)
        for t in ["acqua", "ghiaccio", "mixer", "nuovo_ordine", "pulizia", "assistenza"]:
            r = api.post(f"{base_url}/api/waiter-calls", json={"type": t, "zone": "PRIVÉ"})
            assert r.status_code == 200, f"{t} failed: {r.text}"
            assert r.json()["call"]["type"] == t

    def test_call_status_advances_after_12s(self, api, base_url):
        """Status auto-advances from 'sent' to 'taken_in_charge' after ~12s."""
        _register(api, base_url)
        r = api.post(f"{base_url}/api/waiter-calls", json={"type": "assistenza", "zone": "BAR"})
        cid = r.json()["call"]["id"]
        time.sleep(13)
        r2 = api.get(f"{base_url}/api/waiter-calls")
        mine = next(c for c in r2.json()["calls"] if c["id"] == cid)
        assert mine["status"] == "taken_in_charge", f"expected taken_in_charge, got {mine['status']}"


# --- Orders ----------------------------------------------------------------
class TestOrders:
    def test_empty_cart_rejected(self, api, base_url):
        _register(api, base_url)
        r = api.post(f"{base_url}/api/orders", json={"items": [], "zone": "TAVOLO"})
        assert r.status_code == 400
        # also items with all qty==0 should be rejected
        r2 = api.post(f"{base_url}/api/orders", json={
            "items": [{"id": "m-01", "name": "Glitz Spritz", "price": 12, "qty": 0}],
            "zone": "TAVOLO",
        })
        assert r2.status_code == 400

    def test_create_order_computes_total_and_persists(self, api, base_url):
        _register(api, base_url)
        payload = {
            "items": [
                {"id": "m-01", "name": "Glitz Spritz", "price": 12, "qty": 2},
                {"id": "m-06", "name": "Champagne", "price": 160, "qty": 1},
            ],
            "zone": "PRIVÉ",
        }
        r = api.post(f"{base_url}/api/orders", json=payload)
        assert r.status_code == 200, r.text
        order = r.json()["order"]
        assert order["total"] == 12 * 2 + 160
        assert order["zone"] == "PRIVÉ"
        assert order["status"] == "received"
        assert len(order["items"]) == 2

        # GET verifies persistence
        r2 = api.get(f"{base_url}/api/orders")
        assert r2.status_code == 200
        lst = r2.json()["orders"]
        mine = next((o for o in lst if o["id"] == order["id"]), None)
        assert mine is not None
        assert mine["total"] == order["total"]
        assert mine["status"] == "received"

    def test_order_isolation_per_user(self, api, base_url):
        # user A
        _register(api, base_url)
        rA = api.post(f"{base_url}/api/orders", json={
            "items": [{"id": "m-04", "name": "Acqua premium", "price": 4, "qty": 1}],
            "zone": "TAVOLO",
        })
        assert rA.status_code == 200
        oidA = rA.json()["order"]["id"]
        # switch to user B — new session-like header override
        api.headers.pop("Authorization", None)
        _register(api, base_url)
        rB = api.get(f"{base_url}/api/orders")
        ids = [o["id"] for o in rB.json()["orders"]]
        assert oidA not in ids, "orders leaked across users"


# --- Field trimming / rounding ---------------------------------------------
class TestOrderTotals:
    def test_total_is_rounded_to_two_decimals(self, api, base_url):
        _register(api, base_url)
        r = api.post(f"{base_url}/api/orders", json={
            "items": [{"id": "x", "name": "X", "price": 3.335, "qty": 3}],
            "zone": "BAR",
        })
        assert r.status_code == 200
        # 3.335 * 3 = 10.005 -> rounded to 10.01 or 10.0 depending on banker's rounding; just assert 2-decimal safe
        total = r.json()["order"]["total"]
        assert isinstance(total, (int, float))
        assert round(total, 2) == total
