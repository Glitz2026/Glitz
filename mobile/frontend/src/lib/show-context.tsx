import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PropsWithChildren,
} from "react";
import { Platform } from "react-native";

import { storage } from "@/src/utils/storage";

const ENV_BASE = process.env.EXPO_PUBLIC_BACKEND_URL as string;
// On web the page and the API share an origin behind the ingress, so use
// same-origin relative requests (avoids cross-origin blocks between the
// tunnel host and the canonical preview host). Native uses the env URL.
const isWeb = Platform.OS === "web";
const HTTP_BASE = isWeb ? "" : ENV_BASE;

function wsBase(): string {
  if (isWeb && typeof window !== "undefined") {
    return window.location.origin.replace(/^http/, "ws");
  }
  return ENV_BASE.replace(/^http/, "ws");
}

const PARTICIPANT_KEY = "glitz.participant";

export type Participant = {
  id: string;
  nickname: string;
  avatar: string;
  mood: string;
};

export type VoteOption = { id: string; label: string; desc: string; votes: number };

export type ShowState = {
  phase: "idle" | "music_vote" | "vote_result" | "message_floor" | "power" | "takeover";
  phase_remaining_ms: number;
  duration_ms: number;
  round_id: string;
  ai_line: string;
  vote: { options: VoteOption[]; total: number };
  vote_winner: string | null;
  symbols: Record<string, string>;
  mission_target: string | null;
  press_count: number;
  press_threshold: number;
  power_holder: { id: string; nickname: string } | null;
  power_state: { color: string; message: string; drop: string };
  online: number;
};

type ShowContextValue = {
  participant: Participant | null;
  loadingParticipant: boolean;
  connected: boolean;
  show: ShowState | null;
  myVote: string | null;
  join: (nickname: string, avatar: string, mood: string) => Promise<Participant>;
  castVote: (option: string) => Promise<void>;
  pressButton: () => Promise<{ triggered: boolean }>;
  powerControl: (type: "color" | "message" | "drop", value: string) => Promise<void>;
};

const ShowContext = createContext<ShowContextValue | null>(null);

export function ShowProvider({ children }: PropsWithChildren) {
  const [participant, setParticipant] = useState<Participant | null>(null);
  const [loadingParticipant, setLoadingParticipant] = useState(true);
  const [show, setShow] = useState<ShowState | null>(null);
  const [connected, setConnected] = useState(false);
  const [myVote, setMyVote] = useState<string | null>(null);

  const wsRef = useRef<WebSocket | null>(null);
  const mountedRef = useRef(true);
  const reconnectRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const heartbeatRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const voteRoundRef = useRef<string | null>(null);

  // reset my vote when a new voting round starts
  useEffect(() => {
    if (show?.phase === "music_vote" && show.round_id !== voteRoundRef.current) {
      voteRoundRef.current = show.round_id;
      setMyVote(null);
    }
  }, [show?.phase, show?.round_id]);

  useEffect(() => {
    (async () => {
      const stored = await storage.getItem<Participant | null>(PARTICIPANT_KEY, null);
      if (stored && (stored as Participant).id) setParticipant(stored as Participant);
      setLoadingParticipant(false);
    })();
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const fetchState = useCallback(async () => {
    try {
      const res = await fetch(`${HTTP_BASE}/api/state`);
      const data = (await res.json()) as ShowState;
      if (mountedRef.current) setShow(data);
    } catch {
      // ignore
    }
  }, []);

  const connect = useCallback(
    (pid: string) => {
      if (wsRef.current) {
        try {
          wsRef.current.close();
        } catch {
          // ignore
        }
      }
      const wsUrl = `${wsBase()}/api/ws?pid=${encodeURIComponent(pid)}`;
      let ws: WebSocket;
      try {
        ws = new WebSocket(wsUrl);
      } catch {
        return;
      }
      wsRef.current = ws;

      ws.onopen = () => {
        if (!mountedRef.current) return;
        setConnected(true);
        if (heartbeatRef.current) clearInterval(heartbeatRef.current);
        heartbeatRef.current = setInterval(() => {
          try {
            ws.send("ping");
          } catch {
            // ignore
          }
        }, 20000);
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data as string) as ShowState;
          if (mountedRef.current) setShow(data);
        } catch {
          // ignore
        }
      };

      ws.onclose = () => {
        if (!mountedRef.current) return;
        setConnected(false);
        if (heartbeatRef.current) clearInterval(heartbeatRef.current);
        if (reconnectRef.current) clearTimeout(reconnectRef.current);
        reconnectRef.current = setTimeout(() => connect(pid), 1800);
      };

      ws.onerror = () => {
        try {
          ws.close();
        } catch {
          // ignore
        }
      };
    },
    [],
  );

  // connect once we have a participant
  useEffect(() => {
    if (!participant?.id) return;
    connect(participant.id);
    fetchState();
    // polling fallback if the socket is not open
    pollRef.current = setInterval(() => {
      if (wsRef.current?.readyState !== WebSocket.OPEN) fetchState();
    }, 2500);

    return () => {
      if (reconnectRef.current) clearTimeout(reconnectRef.current);
      if (heartbeatRef.current) clearInterval(heartbeatRef.current);
      if (pollRef.current) clearInterval(pollRef.current);
      if (wsRef.current) {
        try {
          wsRef.current.close();
        } catch {
          // ignore
        }
      }
    };
  }, [participant?.id, connect, fetchState]);

  const join = useCallback(async (nickname: string, avatar: string, mood: string) => {
    const res = await fetch(`${HTTP_BASE}/api/join`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nickname, avatar, mood }),
    });
    const data = (await res.json()) as Participant;
    await storage.setItem(PARTICIPANT_KEY, data);
    setParticipant(data);
    return data;
  }, []);

  const castVote = useCallback(
    async (option: string) => {
      if (!participant) return;
      setMyVote(option); // optimistic
      try {
        await fetch(`${HTTP_BASE}/api/vote`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ participant_id: participant.id, option }),
        });
      } catch {
        // ignore
      }
    },
    [participant],
  );

  const pressButton = useCallback(async () => {
    if (!participant) return { triggered: false };
    try {
      const res = await fetch(`${HTTP_BASE}/api/press`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ participant_id: participant.id }),
      });
      const data = await res.json();
      return { triggered: Boolean(data?.triggered) };
    } catch {
      return { triggered: false };
    }
  }, [participant]);

  const powerControl = useCallback(
    async (type: "color" | "message" | "drop", value: string) => {
      if (!participant) return;
      try {
        await fetch(`${HTTP_BASE}/api/power/control`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ participant_id: participant.id, type, value }),
        });
      } catch {
        // ignore
      }
    },
    [participant],
  );

  const value = useMemo<ShowContextValue>(
    () => ({
      participant,
      loadingParticipant,
      connected,
      show,
      myVote,
      join,
      castVote,
      pressButton,
      powerControl,
    }),
    [participant, loadingParticipant, connected, show, myVote, join, castVote, pressButton, powerControl],
  );

  return <ShowContext.Provider value={value}>{children}</ShowContext.Provider>;
}

export function useShow() {
  const ctx = useContext(ShowContext);
  if (!ctx) throw new Error("useShow must be used within ShowProvider");
  return ctx;
}

/** Local, smooth countdown that resyncs on every server broadcast. */
export function useRemaining(show: ShowState | null): number {
  const [ms, setMs] = useState(show?.phase_remaining_ms ?? 0);
  const endRef = useRef(0);

  useEffect(() => {
    endRef.current = Date.now() + (show?.phase_remaining_ms ?? 0);
    setMs(show?.phase_remaining_ms ?? 0);
  }, [show?.phase, show?.round_id, show?.phase_remaining_ms]);

  useEffect(() => {
    const id = setInterval(() => setMs(Math.max(0, endRef.current - Date.now())), 100);
    return () => clearInterval(id);
  }, []);

  return ms;
}
