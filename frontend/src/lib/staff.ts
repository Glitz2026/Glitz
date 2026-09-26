import * as Haptics from "expo-haptics";
import { useEffect, useRef } from "react";
import { Platform } from "react-native";
import { useQuery } from "@tanstack/react-query";

import { apiGet } from "@/src/lib/api";

export type StaffTicket = {
  id: string;
  kind: "order" | "waiter" | "sos";
  kind_label: string;
  dept_label: string;
  department: string;
  status: "pending" | "in_progress" | "done";
  table: string | null;
  items: { id: string; name: string; price: number; qty: number }[];
  total: number;
  reason: string | null;
  mode: string;
  bar: string | null;
  note: string | null;
  route: string[];
  stage: number;
  guest_name: string | null;
  is_mine: boolean;
  history: { department: string; action: string; by: string; at: string }[];
  created_at: string;
};

export type StaffMe = {
  user: { user_id: string; name: string; department: string; must_change_password?: boolean };
  department: { id: string; label: string; color: string };
  is_direzione: boolean;
};

/** Short attention beep (web) so staff notice a new ticket even not looking. */
function beep() {
  if (Platform.OS !== "web" || typeof window === "undefined") return;
  try {
    const Ctx = (window as any).AudioContext || (window as any).webkitAudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = "square";
    osc.frequency.value = 880;
    gain.gain.setValueAtTime(0.06, ctx.currentTime);
    osc.start();
    osc.frequency.setValueAtTime(1320, ctx.currentTime + 0.12);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.28);
    osc.stop(ctx.currentTime + 0.3);
    setTimeout(() => ctx.close?.(), 500);
  } catch {
    // ignore
  }
}

function notify() {
  if (Platform.OS === "web") {
    beep();
  } else {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
  }
}

/** Poll the department board; fire a notification when new tickets arrive. */
export function useStaffBoard() {
  const q = useQuery<{ tickets: StaffTicket[]; count: number }>({
    queryKey: ["staff-board"],
    queryFn: () => apiGet("/api/staff/board"),
    refetchInterval: 3000,
  });

  const knownRef = useRef<Set<string> | null>(null);
  const lastNewRef = useRef<string | null>(null);

  useEffect(() => {
    const tickets = q.data?.tickets ?? [];
    const ids = new Set(tickets.map((t) => t.id));
    if (knownRef.current === null) {
      knownRef.current = ids; // first load: baseline, don't beep
      return;
    }
    const fresh = tickets.filter((t) => !knownRef.current!.has(t.id));
    knownRef.current = ids;
    if (fresh.length > 0) {
      lastNewRef.current = fresh[fresh.length - 1].id;
      notify();
    }
  }, [q.data]);

  return q;
}
