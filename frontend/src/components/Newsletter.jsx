import { useState } from "react";
import { api } from "../lib/api";
import { toast } from "sonner";

export default function Newsletter() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const submit = async (e) => {
        e.preventDefault();
        if (!email) return;
        setLoading(true);
        try {
            const { data } = await api.post("/newsletter/subscribe", { email });
            if (data.status === "already_subscribed") {
                toast.info("Sei già iscritto alla newsletter.");
            } else {
                toast.success("Iscrizione confermata. Benvenuto al Glitz.");
            }
            setEmail("");
        } catch (err) {
            toast.error("Errore. Riprova.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={submit} data-testid="newsletter-form" className="flex flex-col sm:flex-row gap-2 max-w-md">
            <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="La tua email"
                data-testid="newsletter-email-input"
                className="flex-1 rounded-full bg-white/5 border border-white/10 px-5 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-lava transition"
            />
            <button
                type="submit"
                disabled={loading}
                data-testid="newsletter-submit-btn"
                className="btn-lava !px-6 !py-3 !text-xs disabled:opacity-50"
            >
                {loading ? "..." : "Iscriviti"}
            </button>
        </form>
    );
}
