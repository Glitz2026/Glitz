import { useState, useEffect } from "react";
import { X, MessageCircle, Loader2, Minus, Plus, Check } from "lucide-react";
import { WHATSAPP_NUMBER } from "../lib/constants";
import { api } from "../lib/api";
import { toast } from "sonner";

export default function ProductModal({ product, open, onClose }) {
    const [form, setForm] = useState({ name: "", phone: "", email: "", address: "", note: "" });
    const [size, setSize] = useState("");
    const [qty, setQty] = useState(1);
    const [shipping, setShipping] = useState("spedizione");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (open && product) {
            setSize(product.sizes ? product.sizes[2] : "");
            setQty(1);
            setShipping("spedizione");
        }
    }, [open, product]);

    if (!open || !product) return null;

    const total = product.price * qty;

    const submit = async (e) => {
        e.preventDefault();
        if (!form.name || !form.phone) {
            toast.error("Compila nome e telefono");
            return;
        }
        if (product.sizes && !size) {
            toast.error("Seleziona una taglia");
            return;
        }
        setLoading(true);
        try {
            // Best-effort save to backend (silently ignore if endpoint missing)
            await api.post("/orders", {
                product_id: product.id,
                product_name: product.name,
                unit_price: product.price,
                quantity: qty,
                size: size || null,
                total,
                name: form.name,
                phone: form.phone,
                email: form.email || null,
                address: shipping === "spedizione" ? form.address : null,
                shipping_method: shipping,
                note: form.note || null,
            }).catch(() => {});

            const lines = [
                `Ciao Glitz! Vorrei ordinare dallo shop:`,
                ``,
                `Prodotto: ${product.name}`,
                size && `Taglia: ${size}`,
                `Quantità: ${qty}`,
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
            onClose();
        } catch (err) {
            toast.error("Errore. Riprova.");
        } finally {
            setLoading(false);
        }
    };

    const input = "w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-lava transition";

    return (
        <div
            data-testid="product-modal"
            className="fixed inset-0 z-[80] bg-obsidian/95 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
            onClick={onClose}
        >
            <div
                className="glass-card rounded-2xl max-w-4xl w-full relative my-8 overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    data-testid="product-modal-close"
                    className="absolute top-4 right-4 z-10 text-white/70 hover:text-white bg-obsidian/60 rounded-full p-1.5"
                    aria-label="Chiudi"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="grid md:grid-cols-2">
                    {/* Image */}
                    <div className="aspect-square md:aspect-auto md:min-h-[520px] bg-obsidian relative">
                        <img src={product.image} alt={product.name} className="absolute inset-0 w-full h-full object-cover" />
                        {product.badge && (
                            <span className="absolute top-4 left-4 text-[10px] uppercase tracking-widest font-black bg-lava text-white px-2.5 py-1 rounded-full">
                                {product.badge}
                            </span>
                        )}
                    </div>

                    {/* Content */}
                    <div className="p-6 sm:p-8 max-h-[90vh] md:max-h-[80vh] overflow-y-auto">
                        <div className="text-[11px] uppercase tracking-widest text-lava font-bold mb-1">{product.subtitle}</div>
                        <h2 data-testid="product-modal-title" className="text-2xl sm:text-3xl font-black uppercase tracking-tight mb-3">{product.name}</h2>
                        <div className="flex items-baseline gap-3 mb-5">
                            <div className="text-3xl font-black">€ {product.price}</div>
                            <div className="text-xs uppercase tracking-widest text-white/50">{product.color}</div>
                        </div>

                        <p className="text-sm text-white/70 leading-relaxed mb-4">{product.description}</p>

                        <ul className="space-y-1.5 mb-5">
                            {product.details.map((d) => (
                                <li key={d} className="flex items-start gap-2 text-xs text-white/60">
                                    <Check className="w-3.5 h-3.5 text-lava mt-0.5 flex-shrink-0" /> {d}
                                </li>
                            ))}
                        </ul>

                        <form onSubmit={submit} className="space-y-3 pt-4 border-t border-white/10">
                            {product.sizes && (
                                <div>
                                    <label className="text-[11px] uppercase tracking-widest text-white/60 block mb-2">Taglia *</label>
                                    <div className="flex flex-wrap gap-2">
                                        {product.sizes.map((s) => (
                                            <button
                                                key={s}
                                                type="button"
                                                data-testid={`product-size-${s}`}
                                                onClick={() => setSize(s)}
                                                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold border transition ${size === s ? "bg-lava border-lava text-white" : "bg-white/5 border-white/15 text-white/70 hover:border-white/40"}`}
                                            >
                                                {s}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div>
                                <label className="text-[11px] uppercase tracking-widest text-white/60 block mb-2">Quantità</label>
                                <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-2 py-1">
                                    <button type="button" data-testid="product-qty-minus" onClick={() => setQty((q) => Math.max(1, q - 1))} className="p-2 text-white/70 hover:text-white"><Minus className="w-4 h-4" /></button>
                                    <span data-testid="product-qty-value" className="text-white font-bold w-6 text-center">{qty}</span>
                                    <button type="button" data-testid="product-qty-plus" onClick={() => setQty((q) => Math.min(20, q + 1))} className="p-2 text-white/70 hover:text-white"><Plus className="w-4 h-4" /></button>
                                </div>
                            </div>

                            <div>
                                <label className="text-[11px] uppercase tracking-widest text-white/60 block mb-2">Consegna</label>
                                <div className="flex gap-2">
                                    {[
                                        { v: "spedizione", l: "Spedizione" },
                                        { v: "ritiro", l: "Ritiro in club" },
                                    ].map((o) => (
                                        <button
                                            key={o.v}
                                            type="button"
                                            data-testid={`product-shipping-${o.v}`}
                                            onClick={() => setShipping(o.v)}
                                            className={`flex-1 px-3 py-2 rounded-lg text-xs font-bold border transition ${shipping === o.v ? "bg-lava border-lava text-white" : "bg-white/5 border-white/15 text-white/70 hover:border-white/40"}`}
                                        >
                                            {o.l}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                                <input data-testid="product-name" required placeholder="Nome e cognome *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={input} />
                                <input data-testid="product-phone" required type="tel" placeholder="Telefono *" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={input} />
                            </div>
                            <input data-testid="product-email" type="email" placeholder="Email (facoltativa)" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={input} />
                            {shipping === "spedizione" && (
                                <input data-testid="product-address" placeholder="Indirizzo di spedizione (Via, CAP, Città)" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className={input} />
                            )}

                            <div className="flex items-center justify-between pt-2 border-t border-white/10 pt-4">
                                <div>
                                    <div className="text-[11px] uppercase tracking-widest text-white/50">Totale</div>
                                    <div data-testid="product-total" className="text-2xl font-black text-white">€ {total}</div>
                                </div>
                                <button
                                    type="submit"
                                    data-testid="product-submit"
                                    disabled={loading}
                                    className="btn-lava !px-5 !py-3 disabled:opacity-50"
                                >
                                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <MessageCircle className="w-4 h-4" />}
                                    {loading ? "Invio..." : "Ordina via WhatsApp"}
                                </button>
                            </div>
                            <p className="text-[10px] text-white/40 text-center leading-relaxed">
                                Apriamo WhatsApp con l'ordine precompilato per confermare disponibilità e pagamento.
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
