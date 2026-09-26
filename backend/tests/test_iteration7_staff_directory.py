"""Iteration 7 — Staff login reparto→nome picker.
Backend contract:
 - GET /api/staff/directory is PUBLIC (no auth header) and returns
   {departments:[{id,label,color,members:[{name,email}]}]}
 - Must include the 6 seeded departments with the expected counts.
 - Login still uses the existing JWT /api/auth/login endpoint.
"""

import os
import uuid

import pytest
import requests

BASE_URL = os.environ.get("EXPO_PUBLIC_BACKEND_URL", "").rstrip("/") or \
           os.environ.get("EXPO_BACKEND_URL", "").rstrip("/")
assert BASE_URL, "EXPO_PUBLIC_BACKEND_URL must be set"

EXPECTED_COUNTS = {
    "direzione": 1,
    "camerieri": 11,   # 10 seeded + 1 UI TEST left by prior iterations (>=11 acceptable)
    "cassieri": 5,
    "cambusa": 1,
    "barman": 1,
    "runner": 1,
}


@pytest.fixture(scope="module")
def api():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ---------- Directory endpoint (public) ----------
class TestStaffDirectory:
    def test_directory_no_auth_returns_200(self, api):
        r = api.get(f"{BASE_URL}/api/staff/directory")
        assert r.status_code == 200, r.text

    def test_directory_shape(self, api):
        data = api.get(f"{BASE_URL}/api/staff/directory").json()
        assert "departments" in data and isinstance(data["departments"], list)
        for dept in data["departments"]:
            assert set(dept.keys()) >= {"id", "label", "members"}
            for m in dept["members"]:
                assert set(m.keys()) == {"name", "email"}
                assert m["email"].endswith("@glitz.staff") or "@" in m["email"]

    def test_directory_department_counts(self, api):
        data = api.get(f"{BASE_URL}/api/staff/directory").json()
        by_id = {d["id"]: d for d in data["departments"]}
        for dept_id, expected in EXPECTED_COUNTS.items():
            assert dept_id in by_id, f"missing {dept_id}"
            got = len(by_id[dept_id]["members"])
            # allow >= for camerieri (test leftovers). Others must match exactly.
            if dept_id == "camerieri":
                assert got >= expected, f"{dept_id} has {got} < {expected}"
            else:
                assert got == expected, f"{dept_id} has {got} (expected {expected})"

    def test_directory_members_sorted(self, api):
        data = api.get(f"{BASE_URL}/api/staff/directory").json()
        for d in data["departments"]:
            names = [m["name"] for m in d["members"]]
            assert names == sorted(names), f"members not sorted in {d['id']}"

    def test_directory_does_not_leak_password_or_id(self, api):
        data = api.get(f"{BASE_URL}/api/staff/directory").json()
        raw = api.get(f"{BASE_URL}/api/staff/directory").text
        assert "password" not in raw.lower()
        assert "_id" not in raw
        for d in data["departments"]:
            for m in d["members"]:
                assert "password_hash" not in m
                assert "user_id" not in m


# ---------- Login end-to-end using picked emails ----------
class TestStaffLoginFromDirectory:
    @pytest.mark.parametrize(
        "email,password,expected_dept",
        [
            ("direzione@glitz.staff", "glitzadmin2026", "direzione"),
            ("mara.lagatta@glitz.staff", "glitz2026", "camerieri"),
            ("christian.giuseppe.pisciotta@glitz.staff", "glitz2026", "cambusa"),
        ],
    )
    def test_login_success(self, api, email, password, expected_dept):
        r = api.post(f"{BASE_URL}/api/auth/login", json={"email": email, "password": password})
        assert r.status_code == 200, r.text
        data = r.json()
        assert "token" in data
        assert data["user"]["role"] == "staff"
        assert data["user"]["department"] == expected_dept

    def test_login_wrong_password(self, api):
        r = api.post(
            f"{BASE_URL}/api/auth/login",
            json={"email": "mara.lagatta@glitz.staff", "password": "wrong"},
        )
        assert r.status_code in (400, 401), r.status_code

    def test_login_then_staff_me(self, api):
        tok = api.post(
            f"{BASE_URL}/api/auth/login",
            json={"email": "direzione@glitz.staff", "password": "glitzadmin2026"},
        ).json()["token"]
        me = api.get(f"{BASE_URL}/api/staff/me", headers={"Authorization": f"Bearer {tok}"})
        assert me.status_code == 200
        body = me.json()
        assert body["is_direzione"] is True
        assert body["department"]["id"] == "direzione"


# ---------- Guest regression: register → login → cannot reach staff ----------
class TestGuestRegression:
    def test_guest_register_login_no_staff(self, api):
        email = f"iter7_{uuid.uuid4().hex[:8]}@glitz.test"
        reg = api.post(
            f"{BASE_URL}/api/auth/register",
            json={"name": "Iter7 Guest", "email": email, "password": "secret1"},
        )
        assert reg.status_code in (200, 201), reg.text
        tok = reg.json()["token"]
        me = api.get(f"{BASE_URL}/api/auth/me", headers={"Authorization": f"Bearer {tok}"})
        assert me.status_code == 200
        assert me.json()["user"]["role"] != "staff"
        # Guest bearer cannot reach a staff-only endpoint
        board = api.get(f"{BASE_URL}/api/staff/board", headers={"Authorization": f"Bearer {tok}"})
        assert board.status_code == 403
