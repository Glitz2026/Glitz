import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";
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

import { apiGet, apiPatch, apiPost, setAuthToken } from "@/src/lib/api";
import { storage } from "@/src/utils/storage";

WebBrowser.maybeCompleteAuthSession();

const TOKEN_KEY = "glitz.token";
const AUTH_ORIGIN = "https://auth.emergentagent.com/";

export type User = {
  user_id: string;
  name: string;
  email: string | null;
  photo_url: string | null;
  date_of_birth: string | null;
  instagram: string | null;
  provider: string;
};

type RegisterInput = {
  name: string;
  email: string;
  password: string;
  date_of_birth?: string | null;
  instagram?: string | null;
  photo_url?: string | null;
};

type AuthValue = {
  user: User | null;
  loading: boolean;
  register: (input: RegisterInput) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  googleLogin: () => Promise<void>;
  updateProfile: (patch: Partial<RegisterInput>) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthValue | null>(null);

function extractSessionId(url: string): string | null {
  const m = url.match(/[?#&]session_id=([^&#]+)/);
  return m ? decodeURIComponent(m[1]) : null;
}

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const exchanged = useRef<Set<string>>(new Set());

  const persist = useCallback(async (token: string, u: User) => {
    setAuthToken(token);
    await storage.secureSet(TOKEN_KEY, token);
    setUser(u);
  }, []);

  const exchangeSession = useCallback(
    async (sessionId: string) => {
      if (exchanged.current.has(sessionId)) return;
      exchanged.current.add(sessionId);
      const res = await apiPost("/api/auth/session", { session_id: sessionId });
      await persist(res.token, res.user);
    },
    [persist],
  );

  // Bootstrap: web google callback first, then stored token.
  useEffect(() => {
    (async () => {
      try {
        if (Platform.OS === "web" && typeof window !== "undefined") {
          const sid =
            extractSessionId(window.location.hash || "") ||
            extractSessionId(window.location.search || "");
          if (sid) {
            await exchangeSession(sid);
            const url = new URL(window.location.href);
            url.hash = "";
            url.searchParams.delete("session_id");
            window.history.replaceState(window.history.state, "", url.toString());
            setLoading(false);
            return;
          }
        }
        const token = await storage.secureGet<string | null>(TOKEN_KEY, null);
        if (token) {
          setAuthToken(token);
          const me = await apiGet("/api/auth/me");
          setUser(me.user);
        }
      } catch {
        setAuthToken(null);
        await storage.secureRemove(TOKEN_KEY);
        setUser(null);
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const register = useCallback(
    async (input: RegisterInput) => {
      const res = await apiPost("/api/auth/register", input);
      await persist(res.token, res.user);
    },
    [persist],
  );

  const login = useCallback(
    async (email: string, password: string) => {
      const res = await apiPost("/api/auth/login", { email, password });
      await persist(res.token, res.user);
    },
    [persist],
  );

  const googleLogin = useCallback(async () => {
    if (Platform.OS === "web" && typeof window !== "undefined") {
      const redirect = window.location.origin + "/";
      window.location.href = `${AUTH_ORIGIN}?redirect=${encodeURIComponent(redirect)}`;
      return;
    }
    const redirect = Linking.createURL("");
    const authUrl = `${AUTH_ORIGIN}?redirect=${encodeURIComponent(redirect)}`;
    let captured: string | null = null;
    const sub = Linking.addEventListener("url", (e) => {
      const sid = extractSessionId(e.url);
      if (sid) captured = sid;
    });
    try {
      const result = await WebBrowser.openAuthSessionAsync(authUrl, redirect);
      let sid: string | null = null;
      if (result.type === "success" && result.url) sid = extractSessionId(result.url);
      if (!sid) sid = captured;
      if (!sid) {
        const initial = await Linking.getInitialURL();
        if (initial) sid = extractSessionId(initial);
      }
      if (sid) await exchangeSession(sid);
    } finally {
      sub.remove();
    }
  }, [exchangeSession]);

  const updateProfile = useCallback(async (patch: Partial<RegisterInput>) => {
    const res = await apiPatch("/api/auth/profile", patch);
    setUser(res.user);
  }, []);

  const logout = useCallback(async () => {
    setAuthToken(null);
    await storage.secureRemove(TOKEN_KEY);
    setUser(null);
  }, []);

  const value = useMemo<AuthValue>(
    () => ({ user, loading, register, login, googleLogin, updateProfile, logout }),
    [user, loading, register, login, googleLogin, updateProfile, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
