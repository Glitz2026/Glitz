"""Staff Panel backend tests — RBAC, order routing, waiter/SOS/tickets,
team management, tasks, payslips, change-password.

Uses the deployed public base URL (EXPO_PUBLIC_BACKEND_URL). Direzione seed
account is expected to exist (glitzadmin2026). A fresh guest is registered per
run for guest-side flows.
"""
import os
import uuid
import time

import pytest
import requests

BASE = os.environ.get("EXPO_PUBLIC_BACKEND_URL", "").rstrip("/") or None
if not BASE:
    with open("/app/frontend/.env") as f:
        for line in f:
            if line.startswith("EXPO_PUBLIC_BACKEND_URL="):
                BASE = line.split("=", 1)[1].strip().strip('"').rstrip("/")

DIRE = ("direzione@glitz.staff", "glitzadmin2026")
CAM = ("mara.lagatta@glitz.staff", "glitz2026")
CAMBUSA = ("christian.giuseppe.pisciotta@glitz.staff", "glitz2026")
BAR = ("desiree.filardi@glitz.staff", "glitz2026")
RUNNER = ("raffaele.pio.nicodemo@glitz.staff", "glitz2026")
CASSA = ("daniele.cirasuolo@glitz.staff", "glitz2026")


def _login(email, pwd):
    r = requests.post(f"{BASE}/api/auth/login", json={"email": email, "password": pwd}, timeout=20)
    assert r.status_code == 200, f"login {email} -> {r.status_code} {r.text[:200]}"
    return r.json()["token"]


def _h(tok):
    return {"Authorization": f"Bearer {tok}", "Content-Type": "application/json"}


def _register_guest():
    email = f"guest_{uuid.uuid4().hex[:8]}@glitz.test"
    r = requests.post(f"{BASE}/api/auth/register",
                      json={"email": email, "password": "secret1", "name": "Guest T"}, timeout=20)
    assert r.status_code == 200, f"register -> {r.status_code} {r.text[:200]}"
    return r.json()["token"], email


# ---------------------------------------------------------------------------
# Session-scoped tokens
# ---------------------------------------------------------------------------
@pytest.fixture(scope="module")
def tokens():
    t = {
        "direzione": _login(*DIRE),
        "cameriere": _login(*CAM),
        "cambusa":   _login(*CAMBUSA),
        "barman":    _login(*BAR),
        "runner":    _login(*RUNNER),
        "cassa":     _login(*CASSA),
    }
    t["guest"], t["guest_email"] = _register_guest()
    return t


# ---------------------------------------------------------------------------
# RBAC
# ---------------------------------------------------------------------------
class TestRBAC:
    def test_no_token_401(self):
        r = requests.get(f"{BASE}/api/staff/board", timeout=10)
        assert r.status_code == 401

    def test_guest_403_on_staff(self, tokens):
        r = requests.get(f"{BASE}/api/staff/board", headers=_h(tokens["guest"]), timeout=10)
        assert r.status_code == 403

    def test_guest_403_on_me(self, tokens):
        r = requests.get(f"{BASE}/api/staff/me", headers=_h(tokens["guest"]), timeout=10)
        assert r.status_code == 403

    def test_non_direzione_403_members(self, tokens):
        r = requests.get(f"{BASE}/api/staff/members", headers=_h(tokens["cameriere"]), timeout=10)
        assert r.status_code == 403

    def test_non_direzione_403_payslips_all(self, tokens):
        r = requests.get(f"{BASE}/api/staff/payslips/all", headers=_h(tokens["cameriere"]), timeout=10)
        assert r.status_code == 403

    def test_direzione_200_members(self, tokens):
        r = requests.get(f"{BASE}/api/staff/members", headers=_h(tokens["direzione"]), timeout=10)
        assert r.status_code == 200
        data = r.json()
        assert "members" in data and "grouped" in data
        assert "direzione" in data["grouped"]


# ---------------------------------------------------------------------------
# Order routing — bottle to table (Cambusa → Camerieri → Cassieri)
# ---------------------------------------------------------------------------
class TestOrderBottle:
    def test_full_bottle_pipeline(self, tokens):
        guest = tokens["guest"]
        payload = {
            "items": [{"id": "m-05", "name": "Vodka premium", "price": 120, "qty": 1}],
            "zone": "Tavolo R4 · Riva Deck",
            "mode": "table",
        }
        r = requests.post(f"{BASE}/api/orders", headers=_h(guest), json=payload, timeout=15)
        assert r.status_code == 200, r.text
        order = r.json()["order"]
        assert order["status"] == "received"
        oid = order["id"]

        # Cambusa board should have this ticket
        r = requests.get(f"{BASE}/api/staff/board", headers=_h(tokens["cambusa"]), timeout=10)
        assert r.status_code == 200
        tickets = r.json()["tickets"]
        mine = [t for t in tickets if t.get("source_id") == oid]
        assert mine, "bottle ticket not on cambusa board"
        assert mine[0]["route"] == ["cambusa", "camerieri", "cassieri"]
        assert mine[0]["department"] == "cambusa"
        ticket_id = mine[0]["id"]

        # Cameriere cannot complete a ticket at cambusa (403)
        r = requests.post(f"{BASE}/api/staff/tickets/{ticket_id}/complete",
                          headers=_h(tokens["cameriere"]), timeout=10)
        assert r.status_code == 403

        # Cambusa completes → advances to camerieri
        r = requests.post(f"{BASE}/api/staff/tickets/{ticket_id}/complete",
                          headers=_h(tokens["cambusa"]), timeout=10)
        assert r.status_code == 200
        assert r.json()["ticket"]["department"] == "camerieri"

        # Guest sees on_the_way
        r = requests.get(f"{BASE}/api/orders", headers=_h(guest), timeout=10)
        my = [o for o in r.json()["orders"] if o["id"] == oid][0]
        assert my["status"] == "on_the_way"

        # Cameriere completes → advances to cassieri
        r = requests.post(f"{BASE}/api/staff/tickets/{ticket_id}/complete",
                          headers=_h(tokens["cameriere"]), timeout=10)
        assert r.status_code == 200
        assert r.json()["ticket"]["department"] == "cassieri"

        r = requests.get(f"{BASE}/api/orders", headers=_h(guest), timeout=10)
        my = [o for o in r.json()["orders"] if o["id"] == oid][0]
        assert my["status"] == "delivered"

        # Cassa completes → done → completed
        r = requests.post(f"{BASE}/api/staff/tickets/{ticket_id}/complete",
                          headers=_h(tokens["cassa"]), timeout=10)
        assert r.status_code == 200
        assert r.json()["ticket"]["status"] == "done"

        r = requests.get(f"{BASE}/api/orders", headers=_h(guest), timeout=10)
        my = [o for o in r.json()["orders"] if o["id"] == oid][0]
        assert my["status"] == "completed"


# ---------------------------------------------------------------------------
# Pickup order route (Barman → Cassieri)
# ---------------------------------------------------------------------------
class TestPickup:
    def test_pickup_route_and_ready(self, tokens):
        payload = {
            "items": [{"id": "m-01", "name": "Glitz Spritz", "price": 12, "qty": 1}],
            "mode": "pickup",
            "bar": "Bar centrale",
        }
        r = requests.post(f"{BASE}/api/orders", headers=_h(tokens["guest"]), json=payload, timeout=15)
        assert r.status_code == 200
        oid = r.json()["order"]["id"]

        r = requests.get(f"{BASE}/api/staff/board", headers=_h(tokens["barman"]), timeout=10)
        mine = [t for t in r.json()["tickets"] if t.get("source_id") == oid]
        assert mine and mine[0]["route"] == ["barman", "cassieri"]
        tid = mine[0]["id"]

        r = requests.post(f"{BASE}/api/staff/tickets/{tid}/complete",
                          headers=_h(tokens["barman"]), timeout=10)
        assert r.status_code == 200

        r = requests.get(f"{BASE}/api/orders", headers=_h(tokens["guest"]), timeout=10)
        my = [o for o in r.json()["orders"] if o["id"] == oid][0]
        assert my["status"] == "ready"

    def test_pickup_requires_no_zone(self, tokens):
        # mode=table with no zone → 400
        r = requests.post(f"{BASE}/api/orders", headers=_h(tokens["guest"]), json={
            "items": [{"id": "m-01", "name": "Glitz Spritz", "price": 12, "qty": 1}],
            "mode": "table",
        }, timeout=10)
        assert r.status_code == 400


# ---------------------------------------------------------------------------
# Drink-to-table (Barman → Camerieri → Cassieri)
# ---------------------------------------------------------------------------
class TestDrinkToTable:
    def test_drink_route(self, tokens):
        payload = {
            "items": [{"id": "m-01", "name": "Glitz Spritz", "price": 12, "qty": 2}],
            "zone": "RIVA 1",
            "mode": "table",
        }
        r = requests.post(f"{BASE}/api/orders", headers=_h(tokens["guest"]), json=payload, timeout=15)
        assert r.status_code == 200
        oid = r.json()["order"]["id"]

        r = requests.get(f"{BASE}/api/staff/board", headers=_h(tokens["barman"]), timeout=10)
        mine = [t for t in r.json()["tickets"] if t.get("source_id") == oid]
        assert mine and mine[0]["route"] == ["barman", "camerieri", "cassieri"]


# ---------------------------------------------------------------------------
# Waiter calls
# ---------------------------------------------------------------------------
class TestWaiterCalls:
    def test_ghiaccio_goes_to_runner(self, tokens):
        r = requests.post(f"{BASE}/api/waiter-calls", headers=_h(tokens["guest"]),
                          json={"type": "ghiaccio", "zone": "RIVA 1"}, timeout=10)
        assert r.status_code == 200
        call_id = r.json()["call"]["id"]
        assert r.json()["call"]["status"] == "sent"

        rb = requests.get(f"{BASE}/api/staff/board", headers=_h(tokens["runner"]), timeout=10).json()
        mine = [t for t in rb["tickets"] if t.get("source_id") == call_id]
        assert mine and mine[0]["route"] == ["runner"]
        tid = mine[0]["id"]

        # Runner takes
        r = requests.post(f"{BASE}/api/staff/tickets/{tid}/take",
                          headers=_h(tokens["runner"]), timeout=10)
        assert r.status_code == 200

        # Guest sees taken_in_charge
        r = requests.get(f"{BASE}/api/waiter-calls", headers=_h(tokens["guest"]), timeout=10)
        c = [c for c in r.json()["calls"] if c["id"] == call_id][0]
        assert c["status"] == "taken_in_charge"

    def test_assistenza_goes_to_camerieri(self, tokens):
        r = requests.post(f"{BASE}/api/waiter-calls", headers=_h(tokens["guest"]),
                          json={"type": "assistenza", "zone": "RIVA 1"}, timeout=10)
        assert r.status_code == 200
        cid = r.json()["call"]["id"]
        rb = requests.get(f"{BASE}/api/staff/board", headers=_h(tokens["cameriere"]), timeout=10).json()
        mine = [t for t in rb["tickets"] if t.get("source_id") == cid]
        assert mine and mine[0]["route"] == ["camerieri"]


# ---------------------------------------------------------------------------
# SOS - direzione + all staff boards
# ---------------------------------------------------------------------------
class TestSOS:
    def test_sos_visible_everywhere(self, tokens):
        r = requests.post(f"{BASE}/api/help", headers=_h(tokens["guest"]),
                          json={"type": "assistenza_urgente", "zone": "RIVA 1"}, timeout=10)
        assert r.status_code == 200
        sid = r.json()["request"]["id"]

        for who in ("direzione", "barman", "cameriere"):
            rb = requests.get(f"{BASE}/api/staff/board", headers=_h(tokens[who]), timeout=10).json()
            mine = [t for t in rb["tickets"] if t.get("source_id") == sid]
            assert mine, f"SOS should appear on {who} board"
            assert mine[0]["kind"] == "sos"


# ---------------------------------------------------------------------------
# Team CRUD (Direzione)
# ---------------------------------------------------------------------------
class TestTeamCRUD:
    def test_full_crud(self, tokens):
        dtok = tokens["direzione"]
        unique = uuid.uuid4().hex[:6]
        email = f"test_staff_{unique}@glitz.staff"

        # invalid department -> 400
        r = requests.post(f"{BASE}/api/staff/members", headers=_h(dtok), json={
            "name": "TEST X", "email": email, "password": "abcdef", "department": "chef"
        }, timeout=10)
        assert r.status_code == 400

        # create
        r = requests.post(f"{BASE}/api/staff/members", headers=_h(dtok), json={
            "name": f"TEST_{unique}", "email": email, "password": "abcdef",
            "department": "camerieri", "phone": "+39 111 222 3333"
        }, timeout=10)
        assert r.status_code == 200, r.text
        member = r.json()["member"]
        uid = member["user_id"]

        # duplicate email -> 409
        r = requests.post(f"{BASE}/api/staff/members", headers=_h(dtok), json={
            "name": "Dup", "email": email, "password": "abcdef", "department": "camerieri"
        }, timeout=10)
        assert r.status_code == 409

        # patch: change dept + toggle active + edit name
        r = requests.patch(f"{BASE}/api/staff/members/{uid}", headers=_h(dtok), json={
            "department": "runner", "is_active": False, "name": f"TEST_{unique}_2"
        }, timeout=10)
        assert r.status_code == 200
        m = r.json()["member"]
        assert m["department"] == "runner"
        assert m["is_active"] is False
        assert m["name"].endswith("_2")

        # reset password
        r = requests.post(f"{BASE}/api/staff/members/{uid}/password", headers=_h(dtok),
                          json={"new_password": "newpass1"}, timeout=10)
        assert r.status_code == 200

        # re-activate then login with new password
        requests.patch(f"{BASE}/api/staff/members/{uid}", headers=_h(dtok),
                       json={"is_active": True}, timeout=10)
        r = requests.post(f"{BASE}/api/auth/login",
                         json={"email": email, "password": "newpass1"}, timeout=10)
        assert r.status_code == 200

        # delete
        r = requests.delete(f"{BASE}/api/staff/members/{uid}", headers=_h(dtok), timeout=10)
        assert r.status_code == 200

        # confirm deletion
        r = requests.post(f"{BASE}/api/auth/login",
                         json={"email": email, "password": "newpass1"}, timeout=10)
        assert r.status_code in (401, 404, 400)

    def test_cannot_delete_self(self, tokens):
        # find direzione user id
        r = requests.get(f"{BASE}/api/staff/me", headers=_h(tokens["direzione"]), timeout=10).json()
        uid = r["user"]["user_id"]
        r = requests.delete(f"{BASE}/api/staff/members/{uid}",
                            headers=_h(tokens["direzione"]), timeout=10)
        assert r.status_code == 400

    def test_cannot_delete_direzione(self, tokens):
        # Ensure another direzione exists briefly? We just try to delete self (above)
        # and rely on delete_one filter `department != 'direzione'`. Create a temp
        # direzione just to prove the guard.
        dtok = tokens["direzione"]
        unique = uuid.uuid4().hex[:6]
        email = f"dir2_{unique}@glitz.staff"
        r = requests.post(f"{BASE}/api/staff/members", headers=_h(dtok), json={
            "name": "TEST_DIR2", "email": email, "password": "abcdef",
            "department": "direzione"
        }, timeout=10)
        assert r.status_code == 200
        uid = r.json()["member"]["user_id"]
        r = requests.delete(f"{BASE}/api/staff/members/{uid}", headers=_h(dtok), timeout=10)
        assert r.status_code == 404  # cannot delete direzione
        # cleanup: move to camerieri then delete
        requests.patch(f"{BASE}/api/staff/members/{uid}", headers=_h(dtok),
                       json={"department": "camerieri"}, timeout=10)
        requests.delete(f"{BASE}/api/staff/members/{uid}", headers=_h(dtok), timeout=10)


# ---------------------------------------------------------------------------
# Tasks
# ---------------------------------------------------------------------------
class TestTasks:
    def test_get_and_toggle(self, tokens):
        r = requests.get(f"{BASE}/api/staff/tasks", headers=_h(tokens["barman"]), timeout=10)
        assert r.status_code == 200
        data = r.json()
        assert data["department"]["id"] == "barman"
        assert "prima" in data["tasks"]
        assert "per_tutti" in data
        r = requests.post(f"{BASE}/api/staff/tasks/toggle", headers=_h(tokens["barman"]),
                          json={"phase": "prima", "index": 0, "done": True}, timeout=10)
        assert r.status_code == 200
        assert r.json()["done"].get("prima:0") is True

        # Persist verification
        r = requests.get(f"{BASE}/api/staff/tasks", headers=_h(tokens["barman"]), timeout=10)
        assert r.json()["done"].get("prima:0") is True

        # untoggle
        requests.post(f"{BASE}/api/staff/tasks/toggle", headers=_h(tokens["barman"]),
                      json={"phase": "prima", "index": 0, "done": False}, timeout=10)


# ---------------------------------------------------------------------------
# Change own password
# ---------------------------------------------------------------------------
class TestChangePassword:
    def test_change_and_login(self, tokens):
        dtok = tokens["direzione"]
        unique = uuid.uuid4().hex[:6]
        email = f"cp_{unique}@glitz.staff"
        r = requests.post(f"{BASE}/api/staff/members", headers=_h(dtok), json={
            "name": "TEST_CP", "email": email, "password": "oldpass1",
            "department": "camerieri"
        }, timeout=10)
        assert r.status_code == 200
        uid = r.json()["member"]["user_id"]

        # login as new user
        r = requests.post(f"{BASE}/api/auth/login",
                         json={"email": email, "password": "oldpass1"}, timeout=10)
        assert r.status_code == 200
        tok = r.json()["token"]

        # verify must_change_password true
        r = requests.get(f"{BASE}/api/staff/me", headers=_h(tok), timeout=10)
        assert r.json()["user"]["must_change_password"] is True

        # change
        r = requests.post(f"{BASE}/api/staff/change-password", headers=_h(tok),
                          json={"new_password": "brandnew1"}, timeout=10)
        assert r.status_code == 200

        # login with new password
        r = requests.post(f"{BASE}/api/auth/login",
                         json={"email": email, "password": "brandnew1"}, timeout=10)
        assert r.status_code == 200
        newtok = r.json()["token"]
        r = requests.get(f"{BASE}/api/staff/me", headers=_h(newtok), timeout=10)
        assert r.json()["user"]["must_change_password"] is False

        # old pwd rejected
        r = requests.post(f"{BASE}/api/auth/login",
                         json={"email": email, "password": "oldpass1"}, timeout=10)
        assert r.status_code in (400, 401)

        # cleanup
        requests.delete(f"{BASE}/api/staff/members/{uid}", headers=_h(dtok), timeout=10)


# ---------------------------------------------------------------------------
# Payslips
# ---------------------------------------------------------------------------
class TestPayslips:
    def test_assign_and_scope(self, tokens):
        dtok = tokens["direzione"]
        # pick barman as target
        me = requests.get(f"{BASE}/api/staff/me", headers=_h(tokens["barman"]), timeout=10).json()
        bar_uid = me["user"]["user_id"]

        month = f"TEST_Mese_{uuid.uuid4().hex[:4]}"
        r = requests.post(f"{BASE}/api/staff/payslips", headers=_h(dtok), json={
            "user_id": bar_uid,
            "month": month,
            "url": "https://example.com/test.pdf",
        }, timeout=10)
        assert r.status_code == 200
        pid = r.json()["payslip"]["id"]

        # barman sees only their own
        r = requests.get(f"{BASE}/api/staff/payslips", headers=_h(tokens["barman"]), timeout=10)
        assert r.status_code == 200
        mine = r.json()["payslips"]
        assert any(p["id"] == pid for p in mine)

        # cameriere doesn't see it
        r = requests.get(f"{BASE}/api/staff/payslips", headers=_h(tokens["cameriere"]), timeout=10)
        cam = r.json()["payslips"]
        assert not any(p["id"] == pid for p in cam)

        # direzione all + monthly_docs
        r = requests.get(f"{BASE}/api/staff/payslips/all", headers=_h(dtok), timeout=10)
        assert r.status_code == 200
        d = r.json()
        assert "monthly_docs" in d and len(d["monthly_docs"]) >= 1
        assert any(p["id"] == pid for p in d["payslips"])

        # cleanup
        requests.delete(f"{BASE}/api/staff/payslips/{pid}", headers=_h(dtok), timeout=10)
