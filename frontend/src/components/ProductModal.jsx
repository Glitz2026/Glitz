import { useState, useEffect } from "react";
import { X, Minus, Plus, Check, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useLanguage } from "../context/LanguageContext";
import { toast } from "sonner";

export default function ProductModal({ product, open, onClose }) {
    const { addItem } = useCart();
    const { t } = useLanguage();
    const [size, setSize] = useState("");
    const [qty, setQty] = useState(1);

    useEffect(() => {
        if (open && product) {
            setSize(product.sizes ? product.sizes[2] : "");
            setQty(1);
        }
    }, [open, product]);

    if (!open || !product) return null;

    const total = product.price * qty;

    const submit = (e) => {
        e.preventDefault();
        if (product.sizes && !size) {
            toast.error("Seleziona una taglia");
            return;
        }
        addItem(product, { size, quantity: qty });
        toast.success(`${product.name} aggiunto al carrello`);
        onClose();
    };

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
                                    <label className="text-[11px] uppercase tracking-widest text-white/60 block mb-2">{t("shop_size")} *</label>
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
                                <label className="text-[11px] uppercase tracking-widest text-white/60 block mb-2">{t("shop_quantity")}</label>
                                <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-2 py-1">
                                    <button type="button" data-testid="product-qty-minus" onClick={() => setQty((q) => Math.max(1, q - 1))} className="p-2 text-white/70 hover:text-white"><Minus className="w-4 h-4" /></button>
                                    <span data-testid="product-qty-value" className="text-white font-bold w-6 text-center">{qty}</span>
                                    <button type="button" data-testid="product-qty-plus" onClick={() => setQty((q) => Math.min(20, q + 1))} className="p-2 text-white/70 hover:text-white"><Plus className="w-4 h-4" /></button>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-2 border-t border-white/10 pt-4">
                                <div>
                                    <div className="text-[11px] uppercase tracking-widest text-white/50">{t("shop_total")}</div>
                                    <div data-testid="product-total" className="text-2xl font-black text-white">€ {total}</div>
                                </div>
                                <button
                                    type="submit"
                                    data-testid="product-submit"
                                    className="btn-lava !px-5 !py-3"
                                >
                                    <ShoppingBag className="w-4 h-4" /> {t("shop_add_to_cart")}
                                </button>
                            </div>
                            <p className="text-[10px] text-white/40 text-center leading-relaxed">
                                {t("shop_cart_checkout_note")}
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
