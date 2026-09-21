import { Link } from "react-router-dom";
import { XCircle } from "lucide-react";

export default function PaymentCancel() {
    return (
        <div className="min-h-[60vh] max-w-xl mx-auto px-4 py-16 flex flex-col items-center justify-center text-center">
            <XCircle className="w-16 h-16 text-white/40 mb-6" />
            <h1 data-testid="payment-cancel-title" className="text-3xl sm:text-4xl font-black uppercase tracking-tight mb-3">Pagamento annullato</h1>
            <p className="text-white/60 max-w-md mb-8">
                Nessun addebito è stato effettuato. Torna allo shop quando vuoi.
            </p>
            <Link to="/shop" className="btn-lava">Torna allo shop</Link>
        </div>
    );
}
