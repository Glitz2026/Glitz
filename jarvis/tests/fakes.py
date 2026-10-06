"""Finto client Anthropic per provare Jarvis senza chiamare l'API."""

import copy
from pathlib import Path
from types import SimpleNamespace

from anthropic.types.beta import BetaMessage

from config import Settings


def make_settings(data_dir: Path, **overrides) -> Settings:
    values = dict(
        api_key_configured=True, model="claude-opus-5-5", effort="low", max_tokens=32000,
        timezone="Europe/Rome", city=None, country="IT", web=True, user_name="Tony",
        password=None, data_dir=data_dir,
    )
    values.update(overrides)
    return Settings(**values)


def message(content: list[dict], stop_reason: str = "end_turn") -> BetaMessage:
    return BetaMessage.model_validate({
        "id": "msg_test", "type": "message", "role": "assistant", "model": "claude-opus-5-5",
        "content": content, "stop_reason": stop_reason, "stop_sequence": None,
        "usage": {"input_tokens": 10, "output_tokens": 10},
    })


class FakeStream:
    def __init__(self, reply):
        self.reply = reply

    async def __aenter__(self):
        if isinstance(self.reply, Exception):
            raise self.reply
        return self

    async def __aexit__(self, *exc_info):
        return False

    def __aiter__(self):
        return self._events()

    async def _events(self):
        for block in self.reply.content:
            if block.type == "text":
                yield SimpleNamespace(type="text", text=block.text)
            else:
                yield SimpleNamespace(type="content_block_start", content_block=block)

    async def get_final_message(self):
        return self.reply


class FakeMessages:
    def __init__(self, replies):
        self.replies = list(replies)
        self.calls: list[dict] = []

    def stream(self, **kwargs):
        self.calls.append(copy.deepcopy(kwargs))
        return FakeStream(self.replies.pop(0))


class FakeClient:
    def __init__(self, replies):
        self.beta = SimpleNamespace(messages=FakeMessages(replies))

    @property
    def calls(self) -> list[dict]:
        return self.beta.messages.calls
