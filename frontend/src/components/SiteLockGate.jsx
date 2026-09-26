import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Lock, Loader2 } from "lucide-react";
import { api } from "../lib/api";

const STORAGE_KEY = "glitz_site_unlock_v1";

// Path escluse dal gate: admin e login devono restare accessibili
const BYPASS_PREFIXES = ["/admin", "/accedi", "/auth/callback"];

export default function SiteLockGate({ children }) {
    const location = useLocation();
    const [status, setStatus] = useState(null); // {locked, title, subtitle, message}
    const [unlocked, setUnlocked] = useState(
        typeof window !== "undefined" && window.localStorage.getItem(STORAGE_KEY) === "1"
    );
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        api.get("/site-lock/status")
            .then((r) => setStatus(r.data))
            .catch(() => setStatus({ locked: false }));
    }, []);

    const bypass = BYPASS_PREFIXES.some((p) => location.pathname.startsWith(p));

    // Ancora caricando lo status → mostra fondo nero
    if (!status) return <div className="min-h-screen bg-obsidian" />;

    // Gate non attivo o utente su path bypass → mostra il sito
    if (!status.locked || unlocked || bypass) return children;

    async function submit(e) {
        e.preventDefault();
        setError("");
        setSubmitting(true);
        try {
            await api.post("/site-lock/unlock", { password });
            window.localStorage.setItem(STORAGE_KEY, "1");
            setUnlocked(true);
        } catch (err) {
            setError(err?.response?.data?.detail || "Password errata");
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div data-testid="site-lock-gate" className="fixed inset-0 z-[999] bg-obsidian flex items-center justify-center px-6">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-b from-black via-obsidian to-black" />
                <div className="absolute inset-0 opacity-30" style={{ background: "radial-gradient(circle at center, rgba(225,6,0,0.35), transparent 60%)" }} />
            </div>
            <div className="relative w-full max-w-md text-center space-y-8">
                <div className="inline-flex items-center gap-2 text-lava text-xs uppercase tracking-[0.4em] font-bold">
                    <Lock className="w-3.5 h-3.5" /> Accesso riservato
                </div>
                <div className="space-y-3">
                    <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight leading-none text-white">{status.title || "Sito in Costruzione"}</h1>
                    <p className="text-white/60 leading-relaxed">{status.subtitle}</p>
                </div>
                <p className="text-sm text-white/50">{status.message}</p>
                <form onSubmit={submit} className="space-y-3 pt-4">
                    <input
                        data-testid="site-lock-password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        autoFocus
                        className="w-full bg-white/[0.06] border border-white/15 rounded-full px-5 py-3 text-white text-center placeholder:text-white/30 focus:outline-none focus:border-lava transition"
                    />
                    <button
                        type="submit"
                        data-testid="site-lock-submit"
                        disabled={submitting || password.length === 0}
                        className="btn-lava w-full disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        {submitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Verifica...</> : "Entra"}
                    </button>
                    {error && <p data-testid="site-lock-error" className="text-lava text-xs mt-2">{error}</p>}
                </form>
                <p className="text-[10px] uppercase tracking-widest text-white/25 pt-6">Glitz Club · San Nicola Arcella</p>
            </div>
        </div>
    );
}
