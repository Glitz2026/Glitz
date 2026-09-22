import { useState } from "react";
import { X, Minus, Plus, Trash2, MessageCircle, Loader2, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "../context/CartContext";
import { useLanguage } from "../context/LanguageContext";
import { api } from "../lib/api";
import { WHATSAPP_NUMBER } from "../lib/constants";

export default function CartDrawer() {
    const { items, updateQuantity, removeItem, clear, count, total, open, setOpen } = useCart();
    const { t } = useLanguage();
    const [form, setForm] = useState({ name: "", phone: "", email: "", address: "", note: "" });
    const [shipping, setShipping] = useState("spedizione");
    const [loading, setLoading] = useState(false);

    if (!open) return null;

    const input = "w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2.5 text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-lava transition";

    const submit = async (e) => {
        e.preventDefault();
        if (items.length === 0) { toast.error("Il carrello è vuoto"); return; }
        if (!form.name || !form.phone) { toast.error("Compila nome e telefono"); return; }
        setLoading(true);
        try {
            const payload = {
                items: items.map((it) => ({
                    product_id: it.product_id,
                    product_name: it.product_name,
                    unit_price: it.unit_price,
                    quantity: it.quantity,
                    size: it.size || null,
                })),
                total,
                name: form.name,
                phone: form.phone,
                email: form.email || null,
                address: shipping === "spedizione" ? form.address : null,
                shipping_method: shipping,
                note: form.note || null,
            };
            try {
                await api.post("/orders", payload);
            } catch {
                // Il messaggio WhatsApp resta la conferma primaria: avvisiamo ma non blocchiamo l'ordine.
                toast.warning("Ordine inviato su WhatsApp, ma non salvato sul gestionale. Lo staff lo riceverà comunque via chat.");
            }

            const lines = [
                `Ciao Glitz! Vorrei ordinare dallo shop:`,
                ``,
                ...items.map((it) => `${it.quantity}× ${it.product_name}${it.size ? ` (${it.size})` : ""} — € ${it.unit_price} cad.`),
                ``,
                `Totale: € ${total}`,
                `Consegna: ${shipping === "spedizione" ? "Spedizione a domicilio" : "Ritiro in club"}`,
                ``,
                `Nome: ${form.name}`,
                `Telefono: ${form.phone}`,
                form.email && `Email: ${form.email}`,
                shipping === "spedizione" && form.address && `Indirizzo: ${form.address}`,
                form.note && `Note: ${form.note}`,
            ].filter(Boolean);
            const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
            window.open(url, "_blank");
            toast.success("Apriamo WhatsApp per confermare l'ordine");
            clear();
            setForm({ name: "", phone: "", email: "", address: "", note: "" });
            setOpen(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            data-testid="cart-drawer"
            className="fixed inset-0 z-[90] bg-obsidian/80 backdrop-blur-sm flex justify-end"
            onClick={() => setOpen(false)}
        >
            <div
                className="w-full sm:w-[420px] h-full bg-surface border-l border-white/10 flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
                    <div className="flex items-center gap-2 font-black uppercase tracking-tight">
                        <ShoppingBag className="w-5 h-5 text-lava" /> {t("cart_title")} {count > 0 && <span className="text-lava">({count})</span>}
                    </div>
                    <button onClick={() => setOpen(false)} data-testid="cart-close" aria-label="Chiudi" className="text-white/60 hover:text-white">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
                    {items.length === 0 ? (
                        <p className="text-white/50 text-sm text-center py-12">{t("cart_empty")}</p>
                    ) : items.map((it) => (
                        <div key={`${it.product_id}::${it.size || ""}`} data-testid={`cart-item-${it.product_id}`} className="flex gap-3">
                            {it.image && <img src={it.image} alt={it.product_name} className="w-16 h-16 rounded-lg object-cover bg-obsidian flex-shrink-0" />}
                            <div className="flex-1 min-w-0">
                                <div className="text-sm font-bold text-white truncate">{it.product_name}</div>
                                {it.size && <div className="text-[11px] text-white/50">{t("shop_size")} {it.size}</div>}
                                <div className="flex items-center justify-between mt-1.5">
                                    <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-1.5 py-0.5">
                                        <button type="button" onClick={() => updateQuantity(it.product_id, it.size, it.quantity - 1)} className="p-1 text-white/70 hover:text-white" aria-label="Diminuisci"><Minus className="w-3.5 h-3.5" /></button>
                                        <span className="text-xs font-bold w-5 text-center">{it.quantity}</span>
                                        <button type="button" onClick={() => updateQuantity(it.product_id, it.size, it.quantity + 1)} className="p-1 text-white/70 hover:text-white" aria-label="Aumenta"><Plus className="w-3.5 h-3.5" /></button>
                                    </div>
                                    <span className="text-sm font-bold text-white">€ {it.unit_price * it.quantity}</span>
                                </div>
                            </div>
                            <button type="button" onClick={() => removeItem(it.product_id, it.size)} data-testid={`cart-remove-${it.product_id}`} className="text-white/40 hover:text-red-400 self-start" aria-label="Rimuovi">
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>

                {items.length > 0 && (
                    <form onSubmit={submit} className="border-t border-white/10 px-5 py-4 space-y-3">
                        <div className="flex items-center justify-between text-lg font-black">
                            <span>{t("shop_total")}</span>
                            <span data-testid="cart-total">€ {total}</span>
                        </div>
                        <div className="flex gap-2">
                            {[{ v: "spedizione", l: t("shop_shipping") }, { v: "ritiro", l: t("shop_pickup") }].map((o) => (
                                <button key={o.v} type="button" onClick={() => setShipping(o.v)}
                                    className={`flex-1 px-3 py-2 rounded-lg text-xs font-bold border transition ${shipping === o.v ? "bg-lava border-lava text-white" : "bg-white/5 border-white/15 text-white/70 hover:border-white/40"}`}>
                                    {o.l}
                                </button>
                            ))}
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <input data-testid="cart-name" required placeholder={`${t("cart_name")} *`} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={input} />
                            <input data-testid="cart-phone" required type="tel" placeholder={`${t("cart_phone")} *`} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={input} />
                        </div>
                        <input data-testid="cart-email" type="email" placeholder={t("cart_email")} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={input} />
                        {shipping === "spedizione" && (
                            <input data-testid="cart-address" placeholder={t("cart_address")} value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className={input} />
                        )}
                        <button type="submit" data-testid="cart-submit" disabled={loading} className="btn-lava w-full disabled:opacity-50">
                            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <MessageCircle className="w-4 h-4" />}
                            {loading ? t("cart_sending") : t("cart_submit")}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}
