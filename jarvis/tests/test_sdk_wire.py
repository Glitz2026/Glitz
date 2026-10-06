"""Prova il vero client Anthropic con un server simulato: richiesta inviata e risposta in streaming."""

import asyncio
import json

import anthropic
import httpx2

from agent import Jarvis, new_conversation
from fakes import make_settings
from store import Store


def sse(*events: dict) -> bytes:
    return "".join(f"event: {e['type']}\ndata: {json.dumps(e)}\n\n" for e in events).encode()


def streamed_message(blocks: list[tuple[dict, list[dict]]], stop_reason: str) -> bytes:
    events = [{"type": "message_start", "message": {
        "id": "msg_1", "type": "message", "role": "assistant", "model": "claude-opus-5-5", "content": [],
        "stop_reason": None, "stop_sequence": None, "usage": {"input_tokens": 10, "output_tokens": 1}}}]
    for index, (start, deltas) in enumerate(blocks):
        events.append({"type": "content_block_start", "index": index, "content_block": start})
        events += [{"type": "content_block_delta", "index": index, "delta": d} for d in deltas]
        events.append({"type": "content_block_stop", "index": index})
    events += [
        {"type": "message_delta", "delta": {"stop_reason": stop_reason, "stop_sequence": None}, "usage": {"output_tokens": 20}},
        {"type": "message_stop"},
    ]
    return sse(*events)


def test_real_sdk_request_and_stream(tmp_path):
    settings = make_settings(tmp_path)
    store = Store(settings.data_dir)
    requests = []
    replies = [
        streamed_message([
            ({"type": "thinking", "thinking": "", "signature": ""}, [{"type": "signature_delta", "signature": "sig_1"}]),
            ({"type": "tool_use", "id": "toolu_1", "name": "save_note", "input": {}},
             [{"type": "input_json_delta", "partial_json": '{"title": "Spesa", '},
              {"type": "input_json_delta", "partial_json": '"content": "latte e uova"}'}]),
        ], "tool_use"),
        streamed_message([({"type": "text", "text": ""}, [{"type": "text_delta", "text": "Nota salvata."}])], "end_turn"),
    ]

    def handler(request: httpx2.Request) -> httpx2.Response:
        requests.append(request)
        return httpx2.Response(200, headers={"content-type": "text/event-stream"}, content=replies.pop(0))

    client = anthropic.AsyncAnthropic(
        api_key="test", max_retries=0,
        http_client=anthropic.DefaultAsyncHttpxClient(transport=httpx2.MockTransport(handler)),
    )
    conversation = new_conversation(settings, store)

    async def collect():
        return [e async for e in Jarvis(client, settings, store).reply(conversation, "Salva la lista della spesa")]

    events = asyncio.run(collect())

    assert [e["type"] for e in events] == ["status", "changed", "text", "done"]
    assert store.notes()[0]["content"] == "latte e uova"

    first, second = (json.loads(r.content) for r in requests)
    assert requests[0].url.path == "/v1/messages"
    assert requests[0].headers["anthropic-beta"] == "server-side-fallback-2026-07-01"
    assert first["stream"] is True
    assert first["fallbacks"] == "default"
    assert first["output_config"] == {"effort": "low"}
    assert first["cache_control"] == {"type": "ephemeral"}
    assert first["tools"] == conversation["tools"]
    assert second["messages"][1] == {"role": "assistant", "content": [
        {"type": "thinking", "thinking": "", "signature": "sig_1"},
        {"type": "tool_use", "id": "toolu_1", "name": "save_note",
         "input": {"title": "Spesa", "content": "latte e uova"}},
    ]}
    assert second["messages"][2]["content"][0]["type"] == "tool_result"
