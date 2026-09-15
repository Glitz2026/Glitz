import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../lib/api";
import { toast } from "sonner";
import { Lock } from "lucide-react";

export default function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const nav = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await api.post("/auth/login", { email, password });
            localStorage.setItem("glitz_admin_token", data.token);
            localStorage.setItem("glitz_admin_email", data.email);
            toast.success("Accesso effettuato");
            nav("/admin");
        } catch (err) {
            toast.error(err?.response?.data?.detail || "Credenziali non valide");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
            <div className="w-full max-w-md">
                <div className="glass-card rounded-2xl p-8 space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-lava/20 flex items-center justify-center">
                            <Lock className="w-6 h-6 text-lava" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold uppercase tracking-tight">Area Admin</h1>
                            <p className="text-xs text-white/50 uppercase tracking-widest">Glitz Club</p>
                        </div>
                    </div>
                    <form onSubmit={submit} className="space-y-4">
                        <div>
                            <label className="text-xs uppercase tracking-widest text-white/60 block mb-2">Email</label>
                            <input
                                data-testid="admin-email-input"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-lava"
                            />
                        </div>
                        <div>
                            <label className="text-xs uppercase tracking-widest text-white/60 block mb-2">Password</label>
                            <input
                                data-testid="admin-password-input"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-lava"
                            />
                        </div>
                        <button
                            type="submit"
                            data-testid="admin-login-btn"
                            disabled={loading}
                            className="btn-lava w-full disabled:opacity-50"
                        >
                            {loading ? "..." : "Accedi"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
