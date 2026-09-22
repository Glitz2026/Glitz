import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { api } from "../lib/api";

const AuthCtx = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const checkAuth = useCallback(async () => {
        try {
            const r = await api.get("/auth/user", { withCredentials: true });
            setUser(r.data);
        } catch {
            setUser(null);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        // CRITICAL: If returning from OAuth callback, skip the /me check.
        // AuthCallback will exchange the session_id and establish the session first.
        if (window.location.hash?.includes("session_id=")) {
            setLoading(false);
            return;
        }
        checkAuth();
    }, [checkAuth]);

    const logout = async () => {
        try { await api.post("/auth/logout", {}, { withCredentials: true }); } catch {}
        setUser(null);
    };

    const loginWithGoogle = () => {
        // REMINDER: DO NOT HARDCODE THE URL, OR ADD ANY FALLBACKS OR REDIRECT URLS, THIS BREAKS THE AUTH
        const redirectUrl = window.location.origin + "/account";
        window.location.href = `https://auth.emergentagent.com/?redirect=${encodeURIComponent(redirectUrl)}`;
    };

    const registerWithPassword = async ({ name, email, password }) => {
        const r = await api.post("/auth/password/register", { name, email, password }, { withCredentials: true });
        setUser(r.data.user);
        return r.data.user;
    };

    const loginWithPassword = async ({ email, password }) => {
        const r = await api.post("/auth/password/login", { email, password }, { withCredentials: true });
        setUser(r.data.user);
        return r.data.user;
    };

    return (
        <AuthCtx.Provider value={{ user, loading, setUser, loginWithGoogle, registerWithPassword, loginWithPassword, logout, refresh: checkAuth }}>
            {children}
        </AuthCtx.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthCtx);
    if (!ctx) throw new Error("useAuth must be inside AuthProvider");
    return ctx;
}
