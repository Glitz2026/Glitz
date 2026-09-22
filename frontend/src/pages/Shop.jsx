import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ShoppingBag, MessageCircle, Plus } from "lucide-react";
import Seo from "../components/Seo";
import { api } from "../lib/api";
import ProductModal from "../components/ProductModal";

export default function Shop() {
    const [products, setProducts] = useState([]);
    const [settings, setSettings] = useState({});
    const [quickAddProduct, setQuickAddProduct] = useState(null);

    useEffect(() => {
        api.get("/products").then((r) => setProducts(r.data)).catch(() => {});
        api.get("/settings").then((r) => setSettings(r.data || {})).catch(() => {});
    }, []);

    const chips = settings.shop_chips && settings.shop_chips.length ? settings.shop_chips : ["Stripe checkout", "Spedizione 24-48h", "Ritiro in club"];
    const steps = settings.shop_howto_steps && settings.shop_howto_steps.length ? settings.shop_howto_steps : [
        { n: "01", title: "Scegli il prodotto", body: "Apri la pagina prodotto, seleziona taglia e quantità." },
        { n: "02", title: "Paga con Stripe", body: "Checkout sicuro con carta di credito. O ordina via WhatsApp." },
        { n: "03", title: "Ricevi o ritira", body: "Spedizione 24-48h in Italia o ritiro in club." },
    ];

    const title = settings.shop_title || "Glitz Shop";
    const titleWords = title.split(" ");
    const lastWord = titleWords.pop();

    return (
        <div>
            <Seo
                title={`${title} — Merchandise Ufficiale Glitz Club`}
                description={settings.shop_description || "La capsule collection ufficiale del Glitz Club: teli mare, t-shirt, borse, ventagli, lip balm e gift card. Pagamento sicuro con Stripe, spedizione in tutta Italia."}
            />

            <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-12">
                <div className="space-y-4">
                    <span className="overline-tag">{settings.shop_kicker || "Capsule Collection 2027"}</span>
                    <h1 data-testid="shop-title" className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-none">
                        {titleWords.length > 0 && <>{titleWords.join(" ")} </>}
                        <span className="bg-gradient-to-r from-lava to-sunset-pink bg-clip-text text-transparent">{lastWord}</span>
                    </h1>
                    <p className="text-white/60 max-w-2xl text-base sm:text-lg leading-relaxed">
                        {settings.shop_description || "Il merchandise ufficiale del Glitz Club — pensato per l'estate, il mare e le tue serate. Pagamento sicuro con carta, spedizione in tutta Italia."}
                    </p>
                    <div className="flex flex-wrap gap-3 pt-2">
                        {chips.map((c) => (
                            <span key={c} className="text-xs uppercase tracking-widest text-white/50 border border-white/15 rounded-full px-3 py-1.5">{c}</span>
                        ))}
                    </div>
                </div>
            </section>

            <section data-testid="shop-grid" className="max-w-7xl mx-auto px-4 sm:px-6 pb-24">
                <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {products.map((p, i) => (
                        <motion.div
                            key={p.id}
                            data-testid={`product-card-${p.slug}`}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ duration: 0.5, delay: i * 0.05 }}
                        >
                            <div className="group relative rounded-2xl overflow-hidden bg-surface/40 border border-white/5 hover:border-lava/40 transition duration-500">
                                {p.badge && (
                                    <span className="absolute top-4 left-4 z-10 text-[10px] uppercase tracking-widest font-black bg-lava text-white px-2.5 py-1 rounded-full">
                                        {p.badge}
                                    </span>
                                )}
                                <button
                                    type="button"
                                    data-testid={`product-quick-add-${p.slug}`}
                                    onClick={() => setQuickAddProduct(p)}
                                    aria-label={`Aggiungi ${p.name} al carrello`}
                                    className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-obsidian/70 hover:bg-lava text-white flex items-center justify-center transition"
                                >
                                    <Plus className="w-4 h-4" />
                                </button>
                                <Link to={`/shop/${p.slug}`} className="block">
                                <div className="aspect-[4/5] overflow-hidden bg-obsidian">
                                    <img
                                        src={p.image}
                                        alt={p.name}
                                        loading="lazy"
                                        className={`w-full h-full group-hover:scale-105 transition-transform duration-700 ${p.slug === "gift-card" ? "object-contain p-8 bg-black" : "object-cover"}`}
                                    />
                                </div>
                                <div className="p-5 space-y-2">
                                    <div className="text-[11px] uppercase tracking-widest text-white/40">{p.subtitle}</div>
                                    <h3 className="text-lg font-black uppercase tracking-tight text-white group-hover:text-lava transition">{p.name}</h3>
                                    <div className="flex items-center justify-between pt-2">
                                        <div className="text-2xl font-black text-white">€ {p.price}</div>
                                        <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-lava font-bold">
                                            <ShoppingBag className="w-3.5 h-3.5" /> Vedi
                                        </div>
                                    </div>
                                </div>
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-24">
                <div className="glass-card rounded-2xl p-8 sm:p-12 space-y-6">
                    <div className="space-y-3 max-w-2xl">
                        <span className="overline-tag">{settings.shop_howto_kicker || "Come Ordinare"}</span>
                        <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">{settings.shop_howto_title || "3 step. Fatta."}</h2>
                    </div>
                    <div className="grid gap-6 sm:grid-cols-3">
                        {steps.map((s) => (
                            <div key={s.n} className="space-y-2">
                                <div className="text-lava font-black text-3xl">{s.n}</div>
                                <div className="font-bold uppercase tracking-tight">{s.title}</div>
                                <p className="text-sm text-white/60 leading-relaxed">{s.body}</p>
                            </div>
                        ))}
                    </div>
                    <a
                        href="https://wa.me/393444289232?text=Ciao%20Glitz!%20Avrei%20una%20domanda%20sullo%20shop."
                        target="_blank"
                        rel="noreferrer"
                        data-testid="shop-whatsapp-info"
                        className="btn-ghost !text-xs !px-5 !py-3 inline-flex"
                    >
                        <MessageCircle className="w-4 h-4" /> Info via WhatsApp
                    </a>
                </div>
            </section>

            <ProductModal product={quickAddProduct} open={!!quickAddProduct} onClose={() => setQuickAddProduct(null)} />
        </div>
    );
}
