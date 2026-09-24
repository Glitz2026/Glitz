"""Backend tests for Glitz companion app: auth + club endpoints."""
import time
import uuid

import pytest
import requests


# ---------------------------------------------------------------------------
# Helpers / fixtures
# ---------------------------------------------------------------------------
def _rand_email() -> str:
    return f"TEST_{uuid.uuid4().hex[:10]}@glitz.test"


@pytest.fixture(scope="module")
def user_ctx(base_url):
    """Register a unique user once per module and yield {token,user,email,password}."""
    email = _rand_email()
    password = "secret1"
    r = requests.post(
        f"{base_url}/api/auth/register",
        json={"name": "TEST User", "email": email, "password": password},
        timeout=20,
    )
    assert r.status_code == 200, f"register failed: {r.status_code} {r.text}"
    data = r.json()
    assert "token" in data and "user" in data
    return {"token": data["token"], "user": data["user"], "email": email, "password": password}


@pytest.fixture()
def auth_headers(user_ctx):
    return {"Authorization": f"Bearer {user_ctx['token']}", "Content-Type": "application/json"}


# ---------------------------------------------------------------------------
# Auth: register / login / me / duplicate / unauth
# ---------------------------------------------------------------------------
class TestAuth:
    def test_register_returns_token_and_user(self, base_url):
        email = _rand_email()
        r = requests.post(
            f"{base_url}/api/auth/register",
            json={"name": "TEST X", "email": email, "password": "secret1"},
            timeout=20,
        )
        assert r.status_code == 200
        data = r.json()
        assert data["token"]
        assert data["user"]["email"] == email.lower()
        assert data["user"]["provider"] == "email"
        assert data["user"]["user_id"].startswith("user_")

    def test_register_duplicate_email_409(self, base_url, user_ctx):
        r = requests.post(
            f"{base_url}/api/auth/register",
            json={"name": "TEST dup", "email": user_ctx["email"], "password": "secret1"},
            timeout=20,
        )
        assert r.status_code == 409

    def test_register_bad_password_400(self, base_url):
        r = requests.post(
            f"{base_url}/api/auth/register",
            json={"name": "X", "email": _rand_email(), "password": "123"},
            timeout=20,
        )
        assert r.status_code == 400

    def test_login_success(self, base_url, user_ctx):
        r = requests.post(
            f"{base_url}/api/auth/login",
            json={"email": user_ctx["email"], "password": user_ctx["password"]},
            timeout=20,
        )
        assert r.status_code == 200
        assert r.json()["token"]

    def test_login_wrong_password_401(self, base_url, user_ctx):
        r = requests.post(
            f"{base_url}/api/auth/login",
            json={"email": user_ctx["email"], "password": "wrong-pass"},
            timeout=20,
        )
        assert r.status_code == 401

    def test_me_with_token(self, base_url, auth_headers, user_ctx):
        r = requests.get(f"{base_url}/api/auth/me", headers=auth_headers, timeout=20)
        assert r.status_code == 200
        assert r.json()["user"]["email"] == user_ctx["email"].lower()

    def test_me_without_token_401(self, base_url):
        r = requests.get(f"{base_url}/api/auth/me", timeout=20)
        assert r.status_code == 401

    def test_me_bad_token_401(self, base_url):
        r = requests.get(
            f"{base_url}/api/auth/me",
            headers={"Authorization": "Bearer garbage.token.here"},
            timeout=20,
        )
        assert r.status_code == 401

    def test_profile_patch(self, base_url, auth_headers):
        r = requests.patch(
            f"{base_url}/api/auth/profile",
            json={"instagram": "@test_glitz", "name": "TEST Updated"},
            headers=auth_headers,
            timeout=20,
        )
        assert r.status_code == 200
        u = r.json()["user"]
        assert u["instagram"] == "@test_glitz"
        assert u["name"] == "TEST Updated"
        # verify persistence with GET
        r2 = requests.get(f"{base_url}/api/auth/me", headers=auth_headers, timeout=20)
        assert r2.json()["user"]["instagram"] == "@test_glitz"


# ---------------------------------------------------------------------------
# Phone OTP guarded
# ---------------------------------------------------------------------------
class TestPhoneOtp:
    def test_phone_status_not_configured(self, base_url):
        r = requests.get(f"{base_url}/api/auth/phone/status", timeout=20)
        assert r.status_code == 200
        assert r.json() == {"configured": False}

    def test_phone_send_503(self, base_url):
        r = requests.post(
            f"{base_url}/api/auth/phone/send",
            json={"phone_number": "+390000000000"},
            timeout=20,
        )
        assert r.status_code == 503


# ---------------------------------------------------------------------------
# Auth gating on club endpoints
# ---------------------------------------------------------------------------
class TestAuthGating:
    @pytest.mark.parametrize(
        "path",
        [
            "/api/events",
            "/api/events/ev-01",
            "/api/menu",
            "/api/tables/zones",
            "/api/my-night",
            "/api/tickets",
            "/api/table-requests",
            "/api/groups",
            "/api/help",
        ],
    )
    def test_endpoint_requires_auth(self, base_url, path):
        r = requests.get(f"{base_url}{path}", timeout=20)
        assert r.status_code == 401, f"{path} did not require auth: {r.status_code}"


# ---------------------------------------------------------------------------
# Events
# ---------------------------------------------------------------------------
class TestEvents:
    def test_list_events(self, base_url, auth_headers):
        r = requests.get(f"{base_url}/api/events", headers=auth_headers, timeout=20)
        assert r.status_code == 200
        evs = r.json()["events"]
        assert isinstance(evs, list) and len(evs) >= 1
        e = evs[0]
        for k in ("id", "title", "date", "cover", "price_from", "formulas"):
            assert k in e
        assert isinstance(e["formulas"], list) and len(e["formulas"]) >= 1

    def test_get_event(self, base_url, auth_headers):
        r = requests.get(f"{base_url}/api/events/ev-01", headers=auth_headers, timeout=20)
        assert r.status_code == 200
        assert r.json()["event"]["id"] == "ev-01"

    def test_get_event_404(self, base_url, auth_headers):
        r = requests.get(f"{base_url}/api/events/does-not-exist", headers=auth_headers, timeout=20)
        assert r.status_code == 404


# ---------------------------------------------------------------------------
# Menu / Tables
# ---------------------------------------------------------------------------
class TestMenuTables:
    def test_menu(self, base_url, auth_headers):
        r = requests.get(f"{base_url}/api/menu", headers=auth_headers, timeout=20)
        assert r.status_code == 200
        m = r.json()["menu"]
        assert len(m) >= 1 and "items" in m[0]

    def test_zones(self, base_url, auth_headers):
        r = requests.get(f"{base_url}/api/tables/zones", headers=auth_headers, timeout=20)
        assert r.status_code == 200
        zones = r.json()["zones"]
        assert any(z["id"] == "z-venere" for z in zones)


# ---------------------------------------------------------------------------
# Tickets — create + GET verify
# ---------------------------------------------------------------------------
class TestTickets:
    def test_buy_ticket_and_persists(self, base_url, auth_headers):
        r = requests.post(
            f"{base_url}/api/tickets",
            json={"event_id": "ev-01", "formula_id": "std"},
            headers=auth_headers,
            timeout=20,
        )
        assert r.status_code == 200
        tk = r.json()["ticket"]
        assert tk["code"].startswith("GLITZ-")
        assert tk["event_id"] == "ev-01"
        assert tk["price"] == 20
        assert tk["status"] == "active"
        # GET verify
        r2 = requests.get(f"{base_url}/api/tickets", headers=auth_headers, timeout=20)
        assert r2.status_code == 200
        codes = [t["code"] for t in r2.json()["tickets"]]
        assert tk["code"] in codes

    def test_buy_ticket_invalid_formula(self, base_url, auth_headers):
        r = requests.post(
            f"{base_url}/api/tickets",
            json={"event_id": "ev-01", "formula_id": "nope"},
            headers=auth_headers,
            timeout=20,
        )
        assert r.status_code == 400

    def test_my_night_next_ticket_populated(self, base_url, auth_headers):
        r = requests.get(f"{base_url}/api/my-night", headers=auth_headers, timeout=20)
        assert r.status_code == 200
        data = r.json()
        assert data["next_ticket"] is not None
        assert data["next_ticket"]["event_id"] == "ev-01"


# ---------------------------------------------------------------------------
# Tables requests
# ---------------------------------------------------------------------------
class TestTableRequests:
    def test_create_table_request(self, base_url, auth_headers):
        r = requests.post(
            f"{base_url}/api/table-requests",
            json={"zone_id": "z-venere", "people": 6, "occasion": "TEST"},
            headers=auth_headers,
            timeout=20,
        )
        assert r.status_code == 200
        tr = r.json()["request"]
        assert tr["status"] == "pending"
        assert tr["zone_name"] == "TAVOLO VENERE"
        # GET verify
        r2 = requests.get(f"{base_url}/api/table-requests", headers=auth_headers, timeout=20)
        assert r2.status_code == 200
        assert any(x["id"] == tr["id"] for x in r2.json()["requests"])

    def test_create_table_bad_zone_404(self, base_url, auth_headers):
        r = requests.post(
            f"{base_url}/api/table-requests",
            json={"zone_id": "z-none", "people": 2},
            headers=auth_headers,
            timeout=20,
        )
        assert r.status_code == 404


# ---------------------------------------------------------------------------
# Groups
# ---------------------------------------------------------------------------
class TestGroups:
    def test_create_and_join_group(self, base_url, auth_headers):
        r = requests.post(
            f"{base_url}/api/groups",
            json={"name": "TEST Crew"},
            headers=auth_headers,
            timeout=20,
        )
        assert r.status_code == 200
        g = r.json()["group"]
        assert g["invite_code"] and len(g["invite_code"]) == 6
        assert any(m["organizer"] for m in g["members"])

        # Create a second user and join via code
        email2 = _rand_email()
        r2 = requests.post(
            f"{base_url}/api/auth/register",
            json={"name": "TEST Buddy", "email": email2, "password": "secret1"},
            timeout=20,
        )
        assert r2.status_code == 200
        token2 = r2.json()["token"]
        h2 = {"Authorization": f"Bearer {token2}", "Content-Type": "application/json"}
        rj = requests.post(
            f"{base_url}/api/groups/join",
            json={"code": g["invite_code"]},
            headers=h2,
            timeout=20,
        )
        assert rj.status_code == 200
        members = rj.json()["group"]["members"]
        assert len(members) == 2

        # buddy sees group in listing
        rl = requests.get(f"{base_url}/api/groups", headers=h2, timeout=20)
        assert rl.status_code == 200
        assert any(x["id"] == g["id"] for x in rl.json()["groups"])

    def test_join_bad_code_404(self, base_url, auth_headers):
        r = requests.post(
            f"{base_url}/api/groups/join",
            json={"code": "ZZZZZZ"},
            headers=auth_headers,
            timeout=20,
        )
        assert r.status_code == 404


# ---------------------------------------------------------------------------
# Help
# ---------------------------------------------------------------------------
class TestHelp:
    def test_create_help(self, base_url, auth_headers):
        r = requests.post(
            f"{base_url}/api/help",
            json={"type": "waiter", "zone": "pista", "note": "TEST"},
            headers=auth_headers,
            timeout=20,
        )
        assert r.status_code == 200
        h = r.json()["request"]
        assert h["status"] == "received"
        # GET verify
        r2 = requests.get(f"{base_url}/api/help", headers=auth_headers, timeout=20)
        assert r2.status_code == 200
        assert any(x["id"] == h["id"] for x in r2.json()["requests"])


# ---------------------------------------------------------------------------
# A.I. legacy show still works
# ---------------------------------------------------------------------------
class TestShowStillWorks:
    def test_state(self, base_url):
        r = requests.get(f"{base_url}/api/state", timeout=20)
        assert r.status_code == 200
        s = r.json()
        assert "phase" in s and s["press_threshold"] == 10

    def test_press(self, base_url):
        # join to get pid
        j = requests.post(
            f"{base_url}/api/join",
            json={"nickname": "TEST_press2", "avatar": "★", "mood": "FARE CASINO"},
            timeout=20,
        ).json()
        pid = j["id"]
        r = requests.post(f"{base_url}/api/press", json={"participant_id": pid}, timeout=20)
        assert r.status_code == 200
        assert r.json()["ok"] is True
