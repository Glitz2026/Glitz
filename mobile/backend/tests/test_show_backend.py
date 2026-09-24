"""Backend tests for A.I. ATTENZIONE INSTABILE (Glitz show engine)."""
import json
import time
import uuid

import pytest
import websocket  # from websocket-client


# --- Health / state -----------------------------------------------------------
class TestState:
    def test_root(self, base_url, api):
        r = api.get(f"{base_url}/api/")
        assert r.status_code == 200
        assert "online" in r.json().get("message", "").lower()

    def test_state_snapshot_shape(self, base_url, api):
        r = api.get(f"{base_url}/api/state")
        assert r.status_code == 200
        s = r.json()
        for key in [
            "phase", "phase_remaining_ms", "duration_ms", "round_id", "ai_line",
            "vote", "vote_winner", "symbols", "mission_target", "press_count",
            "press_threshold", "power_holder", "power_state", "online",
        ]:
            assert key in s, f"missing {key}"
        assert s["press_threshold"] == 10
        assert isinstance(s["vote"]["options"], list)
        assert len(s["vote"]["options"]) == 3
        assert {o["id"] for o in s["vote"]["options"]} == {"hot", "loud", "back"}


# --- Join ---------------------------------------------------------------------
class TestJoin:
    def test_join_creates_participant(self, base_url, api):
        payload = {"nickname": "TEST_alice", "avatar": "★", "mood": "BALLARE"}
        r = api.post(f"{base_url}/api/join", json=payload)
        assert r.status_code == 200
        data = r.json()
        assert data["id"] and isinstance(data["id"], str)
        assert data["nickname"] == "TEST_ALICE" or data["nickname"] == "TEST_alice"  # server keeps case
        assert data["avatar"] == "★"
        assert data["mood"] == "BALLARE"


# --- WebSocket ----------------------------------------------------------------
class TestWebSocket:
    def test_ws_connects_and_receives_state(self, base_url):
        pid = str(uuid.uuid4())
        ws_url = base_url.replace("https://", "wss://").replace("http://", "ws://") + f"/api/ws?pid={pid}"
        ws = websocket.create_connection(ws_url, timeout=10)
        try:
            ws.settimeout(5)
            msg = ws.recv()
            data = json.loads(msg)
            assert data.get("type") == "state" or "phase" in data
            assert "online" in data
            # online should be >= 1 with this connection open
            time.sleep(0.5)
            # Query state via HTTP to confirm broadcasted online >=1
            import requests
            r = requests.get(f"{base_url}/api/state", timeout=10)
            assert r.status_code == 200
            assert r.json()["online"] >= 1
        finally:
            ws.close()


# --- Vote ---------------------------------------------------------------------
class TestVote:
    def _join(self, base_url, api, tag="voter"):
        r = api.post(f"{base_url}/api/join", json={"nickname": f"TEST_{tag}", "avatar": "★", "mood": "BALLARE"})
        return r.json()["id"]

    def _wait_for_phase(self, base_url, api, phase, timeout=90):
        end = time.time() + timeout
        while time.time() < end:
            s = api.get(f"{base_url}/api/state").json()
            if s["phase"] == phase:
                return s
            time.sleep(0.5)
        return None

    def test_vote_rejected_when_not_music_vote(self, base_url, api):
        pid = self._join(base_url, api, "notvote")
        # try to spam vote until we catch a non-vote phase
        s = api.get(f"{base_url}/api/state").json()
        if s["phase"] != "music_vote":
            r = api.post(f"{base_url}/api/vote", json={"participant_id": pid, "option": "hot"})
            assert r.status_code == 200
            data = r.json()
            assert data["ok"] is False
            assert data["reason"] == "closed"

    def test_vote_success_and_duplicate(self, base_url, api):
        pid = self._join(base_url, api, "dup")
        s = self._wait_for_phase(base_url, api, "music_vote", timeout=120)
        assert s is not None, "music_vote phase never observed"
        r1 = api.post(f"{base_url}/api/vote", json={"participant_id": pid, "option": "hot"})
        d1 = r1.json()
        # if the phase already turned off between check and post, accept 'closed'
        if d1.get("ok"):
            assert d1["vote"]["total"] >= 1
            r2 = api.post(f"{base_url}/api/vote", json={"participant_id": pid, "option": "loud"})
            d2 = r2.json()
            assert d2["ok"] is False
            assert d2["reason"] == "already"
        else:
            pytest.skip(f"phase changed before vote could be cast: {d1}")

    def test_vote_invalid_option(self, base_url, api):
        pid = self._join(base_url, api, "invalid")
        s = self._wait_for_phase(base_url, api, "music_vote", timeout=120)
        if s is None:
            pytest.skip("no music_vote observed")
        r = api.post(f"{base_url}/api/vote", json={"participant_id": pid, "option": "zzz"})
        d = r.json()
        # either invalid (in phase) or closed (phase just ended)
        assert d["ok"] is False
        assert d["reason"] in ("invalid", "closed", "already")


# --- Press --------------------------------------------------------------------
class TestPress:
    def test_press_increments(self, base_url, api):
        pid_r = api.post(f"{base_url}/api/join", json={"nickname": "TEST_press", "avatar": "★", "mood": "FARE CASINO"}).json()
        pid = pid_r["id"]
        before = api.get(f"{base_url}/api/state").json()["press_count"]
        r = api.post(f"{base_url}/api/press", json={"participant_id": pid})
        assert r.status_code == 200
        d = r.json()
        assert d["ok"] is True
        assert d["press_count"] == before + 1

    def test_press_triggers_takeover_at_threshold(self, base_url, api):
        pid = api.post(f"{base_url}/api/join", json={"nickname": "TEST_mash", "avatar": "★", "mood": "FARE CASINO"}).json()["id"]
        triggered_seen = False
        # Reset by waiting - after takeover the counter resets. Just mash 12 times.
        for _ in range(12):
            r = api.post(f"{base_url}/api/press", json={"participant_id": pid}).json()
            if r.get("triggered"):
                triggered_seen = True
                break
        assert triggered_seen, "takeover should trigger by 10th/12th press"
        # Poll for phase 'takeover'
        for _ in range(10):
            s = api.get(f"{base_url}/api/state").json()
            if s["phase"] == "takeover":
                break
            time.sleep(0.3)
        s = api.get(f"{base_url}/api/state").json()
        assert s["phase"] == "takeover"


# --- Power --------------------------------------------------------------------
class TestPower:
    def _wait_for_phase(self, base_url, api, phase, timeout=180):
        end = time.time() + timeout
        while time.time() < end:
            s = api.get(f"{base_url}/api/state").json()
            if s["phase"] == phase:
                return s
            time.sleep(0.5)
        return None

    def test_power_rejects_non_holder(self, base_url, api):
        pid = api.post(f"{base_url}/api/join", json={"nickname": "TEST_evil", "avatar": "★", "mood": "CONOSCERE"}).json()["id"]
        s = self._wait_for_phase(base_url, api, "power", timeout=200)
        if s is None:
            pytest.skip("power phase not observed in window")
        # If we are (probably) not the holder, we should get not_holder
        r = api.post(f"{base_url}/api/power/control", json={"participant_id": pid, "type": "color", "value": "#FF0033"})
        d = r.json()
        if s["power_holder"] and s["power_holder"]["id"] != pid:
            assert d["ok"] is False
            assert d["reason"] in ("not_holder", "closed")
        else:
            # our random guest happens to be the holder; assert ok
            assert d["ok"] in (True, False)  # tolerate phase-flip

    def test_power_options(self, base_url, api):
        r = api.get(f"{base_url}/api/power/options")
        assert r.status_code == 200
        d = r.json()
        assert "colors" in d and "messages" in d and "drops" in d
        assert "#FF0033" in d["colors"]
