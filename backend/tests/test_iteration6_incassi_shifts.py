"""Iteration 6 backend tests: payment methods at cassa, incassi reconciliation,
and shift check-in/check-out + roster.
"""
import os
import time
import uuid
import requests
import pytest

BASE = os.environ.get("EXPO_PUBLIC_BACKEND_URL", "https://chaos-choice.preview.emergentagent.com").rstrip("/")

DIREZIONE = ("direzione@glitz.staff", "glitzadmin2026")
BARMAN = ("desiree.filardi@glitz.staff", "glitz2026")
CAMBUSA = ("christian.giuseppe.pisciotta@glitz.staff", "glitz2026")
CASSIERE = ("daniele.cirasuolo@glitz.staff", "glitz2026")


def login(email: str, password: str) -> str:
    r = requests.post(f"{BASE}/api/auth/login", json={"email": email, "password": password}, timeout=15)
    assert r.status_code == 200, f"login failed for {email}: {r.status_code} {r.text}"
    return r.json()["token"]


def h(token: str) -> dict:
    return {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}


def register_guest() -> str:
    email = f"guest_{uuid.uuid4().hex[:8]}@glitz.test"
    r = requests.post(
        f"{BASE}/api/auth/register",
        json={"email": email, "password": "secret1", "name": "Guest Test"},
        timeout=15,
    )
    assert r.status_code == 200, r.text
    return r.json()["token"]


# ---------- shift endpoints ----------
class TestShifts:
    def test_shift_checkin_then_me_on_duty(self):
        tok = login(*DIREZIONE)
        # ensure clean state (checkout first ignoring errors)
        requests.post(f"{BASE}/api/staff/shift/checkout", headers=h(tok), timeout=10)
        r = requests.post(f"{BASE}/api/staff/shift/checkin", headers=h(tok), timeout=10)
        assert r.status_code == 200, r.text
        assert r.json()["on_duty"] is True

        me = requests.get(f"{BASE}/api/staff/shift/me", headers=h(tok), timeout=10)
        assert me.status_code == 200
        body = me.json()
        assert body["on_duty"] is True
        assert body["shift"]["check_in"] and body["shift"]["check_out"] is None

    def test_shift_checkout_flips_on_duty(self):
        tok = login(*BARMAN)
        requests.post(f"{BASE}/api/staff/shift/checkin", headers=h(tok), timeout=10)
        r = requests.post(f"{BASE}/api/staff/shift/checkout", headers=h(tok), timeout=10)
        assert r.status_code == 200
        assert r.json()["on_duty"] is False

        me = requests.get(f"{BASE}/api/staff/shift/me", headers=h(tok), timeout=10)
        assert me.status_code == 200
        assert me.json()["on_duty"] is False

    def test_shifts_roster_direzione_only(self):
        dir_tok = login(*DIREZIONE)
        # make sure direzione is on duty
        requests.post(f"{BASE}/api/staff/shift/checkin", headers=h(dir_tok), timeout=10)

        r = requests.get(f"{BASE}/api/staff/shifts", headers=h(dir_tok), timeout=10)
        assert r.status_code == 200
        data = r.json()
        assert "count" in data and "grouped" in data and "on_duty" in data
        assert data["count"] >= 1
        # direzione group should include current user
        assert any(s.get("department") == "direzione" for s in data["on_duty"])

        # cambusa (non-direzione) → 403
        cambusa_tok = login(*CAMBUSA)
        r2 = requests.get(f"{BASE}/api/staff/shifts", headers=h(cambusa_tok), timeout=10)
        assert r2.status_code == 403, r2.text


# ---------- payment / incassi ----------
class TestPaymentIncassi:
    def _create_pickup_order_and_advance_to_cassa(self):
        gtok = register_guest()
        menu = requests.get(f"{BASE}/api/menu", headers=h(gtok), timeout=10).json()
        cats = menu.get("menu") if isinstance(menu, dict) else menu
        first = cats[0]["items"][0]  # first item of SIGNATURE
        payload = {
            "items": [{"id": first["id"], "name": first["name"], "price": first["price"], "qty": 1}],
            "mode": "pickup",
            "bar": "Bar centrale",
        }
        r = requests.post(f"{BASE}/api/orders", headers=h(gtok), json=payload, timeout=15)
        assert r.status_code == 200, r.text
        order = r.json().get("order", r.json())
        # find the corresponding staff ticket via barman board
        btok = login(*BARMAN)
        board = requests.get(f"{BASE}/api/staff/board", headers=h(btok), timeout=10).json()
        ticket = next((t for t in board["tickets"] if t.get("source_id") == order["id"]), None)
        assert ticket, "barman board should show the new pickup order"
        # complete at barman → goes to cassieri
        r = requests.post(f"{BASE}/api/staff/tickets/{ticket['id']}/complete", headers=h(btok), timeout=10)
        assert r.status_code == 200, r.text
        assert r.json()["ticket"]["department"] == "cassieri"
        return ticket["id"]

    def test_complete_at_cassa_with_contanti_records_payment(self):
        tid = self._create_pickup_order_and_advance_to_cassa()
        dtok = login(*DIREZIONE)
        # snapshot incassi.contanti before
        pre = requests.get(f"{BASE}/api/staff/incassi", headers=h(dtok), timeout=10).json()
        pre_contanti = pre["contanti"]
        pre_count = pre["count"]

        r = requests.post(
            f"{BASE}/api/staff/tickets/{tid}/complete",
            headers=h(dtok),
            json={"payment_method": "contanti"},
            timeout=10,
        )
        assert r.status_code == 200, r.text
        t = r.json()["ticket"]
        assert t["status"] == "done"

        post = requests.get(f"{BASE}/api/staff/incassi", headers=h(dtok), timeout=10).json()
        assert post["count"] == pre_count + 1
        # payment recorded, contanti increased by ticket total (>0)
        assert post["contanti"] > pre_contanti
        # and the last recorded payment references our ticket
        assert any(p["ticket_id"] == tid and p["method"] == "contanti" for p in post["payments"])

    def test_complete_at_cassa_with_pos_records_payment(self):
        tid = self._create_pickup_order_and_advance_to_cassa()
        dtok = login(*DIREZIONE)
        pre = requests.get(f"{BASE}/api/staff/incassi", headers=h(dtok), timeout=10).json()
        pre_pos = pre["pos"]
        r = requests.post(
            f"{BASE}/api/staff/tickets/{tid}/complete",
            headers=h(dtok),
            json={"payment_method": "pos"},
            timeout=10,
        )
        assert r.status_code == 200
        post = requests.get(f"{BASE}/api/staff/incassi", headers=h(dtok), timeout=10).json()
        assert post["pos"] > pre_pos
        assert any(p["ticket_id"] == tid and p["method"] == "pos" for p in post["payments"])

    def test_double_complete_returns_400(self):
        tid = self._create_pickup_order_and_advance_to_cassa()
        dtok = login(*DIREZIONE)
        r1 = requests.post(
            f"{BASE}/api/staff/tickets/{tid}/complete",
            headers=h(dtok),
            json={"payment_method": "pos"},
            timeout=10,
        )
        assert r1.status_code == 200
        r2 = requests.post(
            f"{BASE}/api/staff/tickets/{tid}/complete",
            headers=h(dtok),
            json={"payment_method": "pos"},
            timeout=10,
        )
        assert r2.status_code == 400, r2.text

    def test_incassi_returns_totals_fields(self):
        dtok = login(*DIREZIONE)
        r = requests.get(f"{BASE}/api/staff/incassi", headers=h(dtok), timeout=10)
        assert r.status_code == 200
        data = r.json()
        for k in ("date", "totale", "contanti", "pos", "count", "payments"):
            assert k in data
        assert isinstance(data["payments"], list)
        # totale == contanti + pos (within rounding)
        assert round(data["totale"] - (data["contanti"] + data["pos"]), 2) == 0.0

    def test_incassi_forbidden_for_cambusa(self):
        ctok = login(*CAMBUSA)
        r = requests.get(f"{BASE}/api/staff/incassi", headers=h(ctok), timeout=10)
        assert r.status_code == 403, r.text

    def test_incassi_ok_for_cassiere(self):
        ctok = login(*CASSIERE)
        r = requests.get(f"{BASE}/api/staff/incassi", headers=h(ctok), timeout=10)
        assert r.status_code == 200


# ---------- regression: non-payment complete still works ----------
class TestNonPaymentComplete:
    def test_waiter_call_take_complete(self):
        gtok = register_guest()
        r = requests.post(
            f"{BASE}/api/waiter-calls",
            headers=h(gtok),
            json={"type": "acqua", "zone": "Tavolo A1 · Zona 1"},
            timeout=10,
        )
        assert r.status_code == 200, r.text
        # runner should see it
        # login as direzione to find & complete (has cross-dept access)
        dtok = login(*DIREZIONE)
        board = requests.get(f"{BASE}/api/staff/board", headers=h(dtok), timeout=10).json()
        wt = next(
            (t for t in board["tickets"] if t["kind"] == "waiter" and t["department"] == "runner"),
            None,
        )
        assert wt, "runner should have the waiter call ticket"
        r = requests.post(f"{BASE}/api/staff/tickets/{wt['id']}/complete", headers=h(dtok), timeout=10)
        assert r.status_code == 200
        assert r.json()["ticket"]["status"] == "done"
