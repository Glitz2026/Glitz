import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, Ticket, ShoppingBag, Shield, Loader2 } from "lucide-react";
import { api } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import { formatItalianDateTime } from "../lib/constants";
import Seo from "../components/Seo";

export default function Account() {
    const { user, loading, logout } = useAuth();
    const navigate = useNavigate();
    const [bookings, setBookings] = useState([]);
    const [orders, setOrders] = useState([]);
    const [loadingData, setLoadingData] = useState(true);

    useEffect(() => {
        if (loading) return;
        if (!user) {
            navigate("/", { replace: true });
            return;
        }
        (async () => {
            try {
                const [b, o] = await Promise.all([
                    api.get("/auth/my/bookings", { withCredentials: true }),
                    api.get("/auth/my/orders", { withCredentials: true }),
                ]);
                setBookings(b.data);
                setOrders(o.data);
            } finally {
                setLoadingData(false);
            }
        })();
    }, [user, loading, navigate]);

    if (loading || !user) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <Loader2 className="w-10 h-10 animate-spin text-lava" />
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
            <Seo title="Il mio account — Glitz Club" description="Le tue prenotazioni tavoli e i tuoi ordini shop." />

            <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
                <div className="flex items-center gap-4">
                    {user.picture && (
                        <img src={user.picture} alt={user.name} className="w-16 h-16 rounded-full border-2 border-lava" />
                    )}
                    <div>
                        <div className="text-[11px] uppercase tracking-widest text-lava font-bold">Ciao</div>
                        <h1 data-testid="account-name" className="text-3xl sm:text-4xl font-black uppercase tracking-tight">{user.name || user.email}</h1>
                        <div className="text-sm text-white/50">{user.email}</div>
                    </div>
                </div>
                <div className="flex gap-2">
                    {user.is_admin && (
                        <button data-testid="admin-link" onClick={() => navigate("/admin")} className="btn-ghost !text-xs">
                            <Shield className="w-4 h-4" /> Admin
                        </button>
                    )}
                    <button data-testid="logout-btn" onClick={async () => { await logout(); navigate("/"); }} className="btn-ghost !text-xs">
                        <LogOut className="w-4 h-4" /> Esci
                    </button>
                </div>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
                {/* Bookings */}
                <section data-testid="my-bookings" className="space-y-4">
                    <div className="flex items-center gap-3">
                        <Ticket className="w-5 h-5 text-lava" />
                        <h2 className="text-xl font-black uppercase tracking-tight">Le tue prenotazioni tavolo</h2>
                    </div>
                    {loadingData && <Loader2 className="w-6 h-6 animate-spin text-white/40" />}
                    {!loadingData && bookings.length === 0 && (
                        <p className="text-sm text-white/50">Nessuna prenotazione ancora. <a href="/eventi" className="text-lava underline">Scegli un evento →</a></p>
                    )}
                    <div className="space-y-3">
                        {bookings.map((b) => (
                            <div key={b.id} className="p-4 rounded-xl bg-surface/60 border border-white/10">
                                <div className="flex items-baseline justify-between gap-2">
                                    <div className="font-bold uppercase tracking-tight">Tavolo {b.table_id}</div>
                                    <span className="text-[10px] uppercase tracking-widest text-lava">{b.status}</span>
                                </div>
                                <div className="text-xs text-white/60 mt-1">{formatItalianDateTime(b.created_at)}</div>
                                {b.zone && <div className="text-[11px] uppercase tracking-widest text-white/40 mt-1">{b.zone}</div>}
                            </div>
                        ))}
                    </div>
                </section>

                {/* Orders */}
                <section data-testid="my-orders" className="space-y-4">
                    <div className="flex items-center gap-3">
                        <ShoppingBag className="w-5 h-5 text-lava" />
                        <h2 className="text-xl font-black uppercase tracking-tight">I tuoi ordini shop</h2>
                    </div>
                    {loadingData && <Loader2 className="w-6 h-6 animate-spin text-white/40" />}
                    {!loadingData && orders.length === 0 && (
                        <p className="text-sm text-white/50">Nessun ordine ancora. <a href="/shop" className="text-lava underline">Vai allo shop →</a></p>
                    )}
                    <div className="space-y-3">
                        {orders.map((o, i) => (
                            <div key={i} className="p-4 rounded-xl bg-surface/60 border border-white/10">
                                <div className="flex items-baseline justify-between gap-2">
                                    <div className="font-bold uppercase tracking-tight">{o.lookup_key || o.metadata?.product_id || "Ordine"}</div>
                                    <span className="text-[10px] uppercase tracking-widest text-lava">{o.payment_status}</span>
                                </div>
                                <div className="text-xs text-white/60 mt-1">{formatItalianDateTime(o.created_at)} · € {(o.amount || 0) / 100}</div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
