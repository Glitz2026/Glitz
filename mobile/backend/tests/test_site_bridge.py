"""Offline tests for the website bridge (/api/site/*): the site API is mocked
with respx and Mongo with mongomock-motor, so no server or database is needed.

Run: pytest tests/test_site_bridge.py  (needs respx and mongomock-motor)
"""
import json
import os
import sys
from pathlib import Path

os.environ.setdefault("MONGO_URL", "mongodb://localhost:27017")
os.environ.setdefault("DB_NAME", "glitz_test")
sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

import httpx  # noqa: E402
import pytest  # noqa: E402

respx = pytest.importorskip("respx")
AsyncMongoMockClient = pytest.importorskip("mongomock_motor").AsyncMongoMockClient
from fastapi import FastAPI  # noqa: E402
from fastapi.testclient import TestClient  # noqa: E402

import site_bridge  # noqa: E402

API = site_bridge.SITE_API

DAMANTE = {"id": "opening-damante", "title": "DAMANTE — Opening Season 2027", "date": "2027-06-26T22:00:00+02:00", "lineup": ["Andrea Damante"]}
GUE = {"id": "gue", "title": "GUÈ — Live in Concert", "date": "2027-08-27T22:00:00+02:00", "lineup": ["Guè"]}


@pytest.fixture()
def client(monkeypatch):
    monkeypatch.setattr(site_bridge, "db", AsyncMongoMockClient()["glitz_test"])
    site_bridge._cache.clear()
    app = FastAPI()
    app.include_router(site_bridge.router)
    user = {"user_id": "user_a"}
    app.dependency_overrides[site_bridge.get_current_user] = lambda: user
    c = TestClient(app)
    c.user = user
    return c


@respx.mock
def test_events_carry_app_ticket_formulas_by_date(client):
    respx.get(f"{API}/events").mock(return_value=httpx.Response(200, json=[DAMANTE, GUE]))
    events = client.get("/api/site/events").json()
    damante, gue = events
    assert damante["app_event_id"] == "ev-damante"
    assert [f["id"] for f in damante["formulas"]] == ["std", "drink"]
    assert gue["app_event_id"] is None and gue["formulas"] == []


@respx.mock
def test_app_event_id_opens_matching_site_night(client):
    respx.get(f"{API}/events").mock(return_value=httpx.Response(200, json=[DAMANTE, GUE]))
    detail = respx.get(f"{API}/events/opening-damante").mock(return_value=httpx.Response(200, json={**DAMANTE, "reserved_tables": {"R5": "reserved"}}))
    ev = client.get("/api/site/events/ev-damante").json()
    assert detail.called
    assert ev["id"] == "opening-damante" and ev["reserved_tables"] == {"R5": "reserved"}


@respx.mock
def test_booking_forwards_guest_ip_and_is_listed_for_the_user(client):
    route = respx.post(f"{API}/bookings").mock(return_value=httpx.Response(200, json={"id": "bk1", "status": "pending"}))
    body = {"name": "Mario", "phone": "3331234567", "guests": 4, "event_id": "opening-damante", "table_number": "R5", "zone": "Riva Deck"}
    r = client.post("/api/site/bookings", json=body, headers={"X-Forwarded-For": "5.6.7.8, 10.0.0.1"})
    assert r.status_code == 200
    sent = route.calls.last.request
    assert sent.headers["x-forwarded-for"] == "5.6.7.8"
    mine = client.get("/api/site/my").json()["requests"]
    assert len(mine) == 1 and mine[0]["kind"] == "booking" and mine[0]["site_id"] == "bk1"
    assert mine[0]["payload"]["table_number"] == "R5"


@respx.mock
def test_site_errors_keep_status_and_message(client):
    respx.post(f"{API}/bookings").mock(return_value=httpx.Response(429, json={"detail": "Troppe richieste. Riprova tra qualche minuto."}))
    r = client.post("/api/site/bookings", json={"name": "Mario", "phone": "3331234567"})
    assert r.status_code == 429 and r.json()["detail"].startswith("Troppe richieste")
    assert client.get("/api/site/my").json()["requests"] == []


@respx.mock
def test_unreachable_site_is_a_502(client):
    respx.get(f"{API}/settings").mock(side_effect=httpx.ConnectError("down"))
    r = client.get("/api/site/settings")
    assert r.status_code == 502


@respx.mock
def test_shop_order_total_is_computed_server_side(client):
    route = respx.post(f"{API}/orders").mock(return_value=httpx.Response(200, json={"id": "o1", "status": "pending"}))
    body = {
        "items": [{"product_id": "p1", "product_name": "Telo", "unit_price": 35, "quantity": 2, "size": None}],
        "name": "Mario",
        "phone": "3331234567",
        "shipping_method": "ritiro",
    }
    assert client.post("/api/site/orders", json=body).status_code == 200
    assert json.loads(route.calls.last.request.content)["total"] == 70


@respx.mock
def test_checkout_returns_to_the_site_and_status_is_owner_only(client):
    checkout = respx.post(f"{API}/payments/checkout").mock(
        return_value=httpx.Response(200, json={"checkout_url": "https://checkout.stripe.com/x", "session_id": "cs_1"})
    )
    respx.get(f"{API}/payments/status/cs_1").mock(return_value=httpx.Response(200, json={"session_id": "cs_1", "status": "completed", "payment_status": "paid"}))
    r = client.post("/api/site/checkout", json={"slug": "telo-mare", "quantity": 1, "size": "M"})
    assert r.json()["session_id"] == "cs_1"
    sent = json.loads(checkout.calls.last.request.content)
    assert sent["lookup_key"] == "telo-mare" and sent["origin_url"] == site_bridge.SITE_URL
    assert sent["metadata"]["app_user_id"] == "user_a"

    assert client.get("/api/site/payments/cs_1").json()["payment_status"] == "paid"
    mine = client.get("/api/site/my").json()["requests"]
    assert mine[0]["kind"] == "payment" and mine[0]["status"] == "paid"

    client.user["user_id"] = "user_b"
    assert client.get("/api/site/payments/cs_1").status_code == 404


@respx.mock
def test_asset_only_serves_site_images(client):
    assert client.get("/api/site/asset", params={"p": "//evil.com/x.png"}).status_code == 400
    assert client.get("/api/site/asset", params={"p": "/../etc/passwd"}).status_code == 400
    respx.get(f"{site_bridge.SITE_URL}/index.html").mock(return_value=httpx.Response(200, text="<html>", headers={"Content-Type": "text/html"}))
    assert client.get("/api/site/asset", params={"p": "/index.html"}).status_code == 404
    respx.get(f"{site_bridge.SITE_URL}/events/gue.png").mock(return_value=httpx.Response(200, content=b"\x89PNG", headers={"Content-Type": "image/png"}))
    r = client.get("/api/site/asset", params={"p": "/events/gue.png"})
    assert r.status_code == 200 and r.content == b"\x89PNG"
