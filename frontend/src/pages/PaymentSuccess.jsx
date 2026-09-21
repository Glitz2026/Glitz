import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { CheckCircle2, Loader2, XCircle, MessageCircle } from "lucide-react";
import { api } from "../lib/api";

export default function PaymentSuccess() {
    const [params] = useSearchParams();
    const sessionId = params.get("session_id");
    const [status, setStatus] = useState("polling"); // polling | paid | failed | timeout
    const [attempts, setAttempts] = useState(0);

    useEffect(() => {
        if (!sessionId) {
            setStatus("failed");
            return;
        }
        if (status !== "polling") return;
        if (attempts >= 8) {
            setStatus("timeout");
            return;
        }
        const t = setTimeout(async () => {
            try {
                const r = await api.get(`/payments/status/${sessionId}`);
                if (r.data.payment_status === "paid") setStatus("paid");
                else if (["failed", "expired"].includes(r.data.payment_status)) setStatus("failed");
                else setAttempts((a) => a + 1);
            } catch {
                setAttempts((a) => a + 1);
            }
        }, attempts === 0 ? 500 : 2000);
        return () => clearTimeout(t);
    }, [sessionId, attempts, status]);

    return (
        <div className="min-h-[60vh] max-w-xl mx-auto px-4 py-16 flex flex-col items-center justify-center text-center">
            {status === "polling" && (
                <>
                    <Loader2 className="w-14 h-14 text-lava animate-spin mb-6" />
                    <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight mb-3">Confermiamo il pagamento...</h1>
                    <p className="text-white/60">Un secondo, stiamo verificando con Stripe.</p>
                </>
            )}
            {status === "paid" && (
                <>
                    <CheckCircle2 className="w-16 h-16 text-emerald-400 mb-6" />
                    <h1 data-testid="payment-success-title" className="text-3xl sm:text-4xl font-black uppercase tracking-tight mb-3">Ordine confermato!</h1>
                    <p className="text-white/70 max-w-md mb-8">
                        Grazie! Il tuo ordine è stato registrato. Ti manderemo una email di conferma con i dettagli di spedizione entro 24h.
                    </p>
                    <div className="flex gap-3">
                        <Link to="/shop" className="btn-lava">Continua lo shopping</Link>
                        <a href="https://wa.me/393444289232?text=Ciao%20Glitz%2C%20ho%20appena%20completato%20un%20ordine!" target="_blank" rel="noreferrer" className="btn-ghost">
                            <MessageCircle className="w-4 h-4" /> WhatsApp
                        </a>
                    </div>
                </>
            )}
            {status === "failed" && (
                <>
                    <XCircle className="w-16 h-16 text-lava mb-6" />
                    <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight mb-3">Pagamento non riuscito</h1>
                    <p className="text-white/60 max-w-md mb-8">Qualcosa è andato storto. Riprova o scrivici su WhatsApp.</p>
                    <Link to="/shop" className="btn-lava">Torna allo shop</Link>
                </>
            )}
            {status === "timeout" && (
                <>
                    <Loader2 className="w-14 h-14 text-lava/50 mb-6" />
                    <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight mb-3">Ci vuole un attimo...</h1>
                    <p className="text-white/60 max-w-md mb-8">
                        La conferma sta arrivando. Riceverai una email a breve. Per sicurezza scrivici su WhatsApp.
                    </p>
                    <a href="https://wa.me/393444289232?text=Ciao%20Glitz%2C%20ho%20appena%20completato%20un%20ordine%20ma%20non%20ho%20ricevuto%20conferma." target="_blank" rel="noreferrer" className="btn-lava">
                        <MessageCircle className="w-4 h-4" /> Contattaci
                    </a>
                </>
            )}
        </div>
    );
}
