import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Check, MessageCircle, Loader2, Minus, Plus, CreditCard, ShoppingBag } from "lucide-react";
import Seo from "../components/Seo";
import SafeImage from "../components/SafeImage";
import { api } from "../lib/api";
import { useCart } from "../context/CartContext";
import { useLanguage } from "../context/LanguageContext";
import { useContact } from "../context/ContactContext";
import { toast } from "sonner";

export default function ProductDetail() {
    const { id } = useParams();
    const { addItem } = useCart();
    const { t } = useLanguage();
    const { whatsappNumber } = useContact();
    const [product, setProduct] = useState(null);
    const [notFound, setNotFound] = useState(false);
    const [activeImg, setActiveImg] = useState(0);
    const [size, setSize] = useState("");
    const [qty, setQty] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        api.get(`/products/${id}`).then((r) => {
            setProduct(r.data);
            if (r.data.sizes && r.data.sizes.length) setSize(r.data.sizes[Math.floor(r.data.sizes.length / 2)] || r.data.sizes[0]);
        }).catch(() => setNotFound(true));
    }, [id]);

    if (notFound) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-32 text-center">
                <h1 className="text-4xl font-black">Prodotto non trovato</h1>
                <Link to="/shop" className="text-lava underline mt-4 inline-block">Torna allo shop</Link>
            </div>
        );
    }
    if (!product) return <div className="max-w-4xl mx-auto px-4 py-32 text-center text-white/40">Caricamento...</div>;

    const gallery = (product.gallery && product.gallery.length ? product.gallery : [product.image]);
    const total = product.price * qty;

    const stripeCheckout = async () => {
        if (product.sizes && product.sizes.length && !size) { toast.error("Seleziona una taglia"); return; }
        setLoading(true);
        try {
            const r = await api.post("/payments/checkout", {
                lookup_key: product.slug,
                quantity: qty,
                origin_url: window.location.origin,
                metadata: { product_slug: product.slug, size: size || "" },
            });
            window.location.href = r.data.checkout_url;
        } catch {
            toast.error("Errore. Riprova o contattaci su WhatsApp.");
            setLoading(false);
        }
    };

    const addToCart = () => {
        if (product.sizes && product.sizes.length && !size) { toast.error("Seleziona una taglia"); return; }
        addItem(product, { size, quantity: qty });
        toast.success(`${product.name} aggiunto al carrello`);
    };

    const whatsappOrder = () => {
        const lines = [
            `Ciao Glitz! Vorrei ordinare:`,
            ``,
            `Prodotto: ${product.name}`,
            size && `Taglia: ${size}`,
            `Quantità: ${qty}`,
            `Totale: € ${total}`,
        ].filter(Boolean);
        const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(lines.join("\n"))}`;
        window.open(url, "_blank");
    };

    return (
        <div>
            <Seo title={`${product.name} — Glitz Shop`} description={product.description} />
            <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 pb-24">
                <Link to="/shop" data-testid="back-to-shop" className="inline-flex items-center gap-2 text-white/60 hover:text-white text-xs uppercase tracking-widest mb-8">
                    <ArrowLeft className="w-4 h-4" /> Torna allo shop
                </Link>

                <div className="grid gap-8 lg:gap-12 lg:grid-cols-2">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="space-y-3">
                        <div className="relative aspect-square rounded-2xl overflow-hidden bg-obsidian border border-white/5">
                            {product.badge && (
                                <span className="absolute top-4 left-4 z-10 text-[10px] uppercase tracking-widest font-black bg-lava text-white px-2.5 py-1 rounded-full">{product.badge}</span>
                            )}
                            <SafeImage
                                data-testid="product-main-image"
                                src={gallery[activeImg]}
                                alt={product.name}
                                className={`w-full h-full transition-opacity duration-500 ${product.slug === "gift-card" && activeImg === 0 ? "object-contain p-12 bg-black" : "object-cover"}`}
                            />
                        </div>
                        <div className="grid grid-cols-4 gap-3">
                            {gallery.map((g, i) => (
                                <button key={i} data-testid={`product-thumb-${i}`} onClick={() => setActiveImg(i)}
                                    className={`aspect-square rounded-xl overflow-hidden border transition ${activeImg === i ? "border-lava" : "border-white/10 hover:border-white/40"}`}>
                                    <SafeImage src={g} alt={`${product.name} ${i + 1}`} className={`w-full h-full ${product.slug === "gift-card" && i === 0 ? "object-contain p-2 bg-black" : "object-cover"}`} />
                                </button>
                            ))}
                        </div>
                    </motion.div>

                    <div className="space-y-6">
                        <div className="space-y-2">
                            <div className="text-[11px] uppercase tracking-widest text-lava font-bold">{product.subtitle}</div>
                            <h1 data-testid="product-detail-title" className="text-3xl sm:text-4xl font-black uppercase tracking-tight leading-tight">{product.name}</h1>
                            <div className="flex items-baseline gap-4">
                                <div className="text-4xl font-black">€ {product.price}</div>
                                <div className="text-xs uppercase tracking-widest text-white/50">{product.color}</div>
                            </div>
                        </div>
                        <p className="text-white/70 leading-relaxed">{product.description}</p>
                        <ul className="space-y-2 border-t border-white/10 pt-6">
                            {(product.details || []).map((d) => (
                                <li key={d} className="flex items-start gap-2 text-sm text-white/70">
                                    <Check className="w-4 h-4 text-lava mt-0.5 flex-shrink-0" /> {d}
                                </li>
                            ))}
                        </ul>
                        <div className="space-y-4 border-t border-white/10 pt-6">
                            {product.sizes && product.sizes.length > 0 && (
                                <div>
                                    <label className="text-[11px] uppercase tracking-widest text-white/60 block mb-2">{t("shop_size")} *</label>
                                    <div className="flex flex-wrap gap-2">
                                        {product.sizes.map((s) => (
                                            <button key={s} data-testid={`size-${s}`} onClick={() => setSize(s)}
                                                className={`px-4 py-2 rounded-lg text-sm font-bold border transition ${size === s ? "bg-lava border-lava text-white" : "bg-white/5 border-white/15 text-white/70 hover:border-white/40"}`}>
                                                {s}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                            <div>
                                <label className="text-[11px] uppercase tracking-widest text-white/60 block mb-2">{t("shop_quantity")}</label>
                                <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-2 py-1">
                                    <button data-testid="qty-minus" onClick={() => setQty((q) => Math.max(1, q - 1))} className="p-2 text-white/70 hover:text-white"><Minus className="w-4 h-4" /></button>
                                    <span data-testid="qty-value" className="text-white font-bold w-6 text-center">{qty}</span>
                                    <button data-testid="qty-plus" onClick={() => setQty((q) => Math.min(20, q + 1))} className="p-2 text-white/70 hover:text-white"><Plus className="w-4 h-4" /></button>
                                </div>
                            </div>
                            <div className="flex items-center justify-between border-t border-white/10 pt-4">
                                <div>
                                    <div className="text-[11px] uppercase tracking-widest text-white/50">{t("shop_total")}</div>
                                    <div data-testid="detail-total" className="text-3xl font-black">€ {total}</div>
                                </div>
                            </div>
                            <button data-testid="add-to-cart" onClick={addToCart} className="btn-lava w-full">
                                <ShoppingBag className="w-4 h-4" /> {t("shop_add_to_cart")}
                            </button>
                            <div className="grid gap-3 sm:grid-cols-2">
                                <button data-testid="checkout-stripe" onClick={stripeCheckout} disabled={loading} className="btn-ghost w-full disabled:opacity-50">
                                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <CreditCard className="w-4 h-4" />}
                                    {loading ? "Redirect a Stripe..." : t("shop_pay_card")}
                                </button>
                                <button data-testid="checkout-whatsapp" onClick={whatsappOrder} className="btn-ghost w-full">
                                    <MessageCircle className="w-4 h-4" /> {t("shop_order_whatsapp")}
                                </button>
                            </div>
                            <p className="text-[11px] text-white/40 text-center">Pagamento sicuro con Stripe. Spedizione 24-48h in Italia o ritiro in club.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
