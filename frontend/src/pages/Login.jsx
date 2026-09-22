import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { LogIn, Loader2, Mail } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "../context/AuthContext";
import Seo from "../components/Seo";

export default function Login() {
    const { loginWithGoogle, loginWithPassword, registerWithPassword } = useAuth();
    const navigate = useNavigate();
    const [mode, setMode] = useState("login"); // "login" | "register"
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [loading, setLoading] = useState(false);

    const input = "w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-lava transition";

    const submit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (mode === "register") {
                if (form.password.length < 8) {
                    toast.error("La password deve avere almeno 8 caratteri");
                    setLoading(false);
                    return;
                }
                await registerWithPassword(form);
            } else {
                await loginWithPassword(form);
            }
            navigate("/account");
        } catch (err) {
            const detail = err?.response?.data?.detail;
            toast.error(detail || "Errore. Controlla i dati e riprova.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
            <Seo title="Accedi — Glitz Club" description="Accedi o crea un account Glitz Club per gestire prenotazioni e ordini." />
            <div className="glass-card rounded-2xl p-8 max-w-md w-full space-y-6">
                <div className="text-center space-y-1">
                    <div className="text-xs uppercase tracking-widest text-lava font-bold">Area riservata</div>
                    <h1 className="text-2xl font-black uppercase tracking-tight">{mode === "login" ? "Accedi" : "Crea account"}</h1>
                </div>

                <button
                    type="button"
                    onClick={loginWithGoogle}
                    data-testid="login-google-btn"
                    className="btn-lava w-full"
                >
                    <LogIn className="w-4 h-4" /> Continua con Google
                </button>

                <div className="flex items-center gap-3 text-[11px] uppercase tracking-widest text-white/40">
                    <div className="flex-1 h-px bg-white/10" /> oppure <div className="flex-1 h-px bg-white/10" />
                </div>

                <form onSubmit={submit} className="space-y-3">
                    {mode === "register" && (
                        <input
                            data-testid="login-name"
                            required
                            placeholder="Nome e cognome"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className={input}
                        />
                    )}
                    <input
                        data-testid="login-email"
                        required
                        type="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className={input}
                    />
                    <input
                        data-testid="login-password"
                        required
                        type="password"
                        minLength={mode === "register" ? 8 : undefined}
                        placeholder={mode === "register" ? "Password (min. 8 caratteri)" : "Password"}
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                        className={input}
                    />
                    <button type="submit" data-testid="login-submit" disabled={loading} className="btn-ghost w-full disabled:opacity-50">
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Mail className="w-4 h-4" />}
                        {loading ? "Attendi..." : mode === "login" ? "Accedi con email" : "Crea account"}
                    </button>
                </form>

                <p className="text-center text-xs text-white/50">
                    {mode === "login" ? (
                        <>Non hai un account? <button type="button" onClick={() => setMode("register")} className="text-lava underline">Registrati</button></>
                    ) : (
                        <>Hai già un account? <button type="button" onClick={() => setMode("login")} className="text-lava underline">Accedi</button></>
                    )}
                </p>
                <p className="text-center text-[11px] text-white/30">
                    <Link to="/" className="hover:text-white/60">← Torna al sito</Link>
                </p>
            </div>
        </div>
    );
}
