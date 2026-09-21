import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { api } from "../lib/api";
import { useAuth } from "../context/AuthContext";

export default function AuthCallback() {
    const location = useLocation();
    const navigate = useNavigate();
    const { setUser } = useAuth();
    const hasProcessed = useRef(false);

    useEffect(() => {
        if (hasProcessed.current) return;
        hasProcessed.current = true;

        const hash = location.hash || window.location.hash;
        const match = hash.match(/session_id=([^&]+)/);
        if (!match) {
            navigate("/", { replace: true });
            return;
        }
        const sessionId = match[1];
        // Clear the fragment from URL
        window.history.replaceState({}, "", window.location.pathname);

        (async () => {
            try {
                const r = await api.post("/auth/google/session", { session_id: sessionId }, { withCredentials: true });
                setUser(r.data.user);
                navigate("/account", { replace: true, state: { user: r.data.user } });
            } catch {
                navigate("/?auth_error=1", { replace: true });
            }
        })();
    }, [location.hash, navigate, setUser]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-obsidian">
            <Loader2 className="w-14 h-14 text-lava animate-spin mb-6" />
            <p className="text-white/60 text-sm uppercase tracking-widest">Login in corso…</p>
        </div>
    );
}
