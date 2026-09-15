import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ShoppingBag, MessageCircle } from "lucide-react";
import Seo from "../components/Seo";

const ASSETS = "https://customer-assets-gfyr7b9c.emergentagent.net/job_glitz-nightclub/artifacts";

// Ambient / lifestyle photos già in uso nell'app (riusate come contest gallery)
const AMBIENT = {
    arch: `${ASSETS}/tzd5z52p_PHOTO-2025-09-16-12-45-38.jpg`,
    terrace: `${ASSETS}/6lina1we_PHOTO-2025-09-16-12-45-39.jpg`,
    seaview: `${ASSETS}/ppzjzi3q_PHOTO-2025-09-16-12-45-39%202.jpg`,
    pool: `${ASSETS}/97nlxf8c_PHOTO-2025-09-16-12-45-38%203.jpg`,
    hero: `${ASSETS}/9c0lj4wr_PHOTO-2025-09-16-12-45-38%202.jpg`,
    detail1: `${ASSETS}/xsttrroy_PHOTO-2025-09-16-12-45-38%204.jpg`,
    detail2: `${ASSETS}/26s9g2vp_PHOTO-2025-09-16-12-45-39%202.jpg`,
    detail3: `${ASSETS}/1kevf5m4_PHOTO-2025-09-16-12-54-45.jpg`,
    detail4: `${ASSETS}/dpisg1l4_PHOTO-2025-09-16-13-07-48.jpg`,
    detail5: `${ASSETS}/d6h58zck_PHOTO-2025-09-16-19-11-42.webp`,
};

// Prodotti ufficiali Glitz Club
export const PRODUCTS = [
    {
        id: "gift-card",
        name: "Gift Card Glitz",
        subtitle: "Buono regalo digitale €50",
        price: 50,
        image: "/glitz-logo-black.png",
        gallery: [
            "/glitz-logo-black.png",
            AMBIENT.hero,
            AMBIENT.arch,
            AMBIENT.seaview,
        ],
        description: "Il regalo perfetto per chi ama il Glitz. Buono digitale del valore di €50 utilizzabile su tutto lo shop e i tavoli durante le serate. Consegnato via email in PDF con codice univoco entro 5 minuti.",
        details: ["Valore €50", "Consegna via email in 5 min", "Codice univoco a PDF", "Valido 12 mesi", "Utilizzabile online e in club"],
        color: "Digitale",
        badge: "Ideale come regalo",
    },
    {
        id: "beach-towel",
        name: "Beach Towel Glitz",
        subtitle: "Telo mare nero oversize",
        price: 45,
        image: `${ASSETS}/tgeqp1vr_IMG_5513.webp`,
        gallery: [
            `${ASSETS}/tgeqp1vr_IMG_5513.webp`,
            AMBIENT.seaview,
            AMBIENT.hero,
            AMBIENT.detail5,
        ],
        description: "Telo mare oversize in cotone spugna 100%. Logo Glitz Club in bianco stampato sul retro. Perfetto per la spiaggia, la piscina o come cape al tramonto.",
        details: ["100% cotone spugna 400gsm", "Formato 90×180 cm", "Logo bianco stampato", "Lavabile a 30°", "Made in Portugal"],
        color: "Nero",
        badge: "Bestseller",
    },
    {
        id: "paper-fan",
        name: "Ventaglio Glitz",
        subtitle: "Ventaglio in carta e bambù",
        price: 15,
        image: `${ASSETS}/91p089k4_IMG_8679.webp`,
        gallery: [
            `${ASSETS}/91p089k4_IMG_8679.webp`,
            `${ASSETS}/qdkmd1ir_b5e6a2ee-7a76-43f3-bb62-de43dc8d7909.webp`,
            AMBIENT.terrace,
            AMBIENT.detail1,
        ],
        description: "Ventaglio pieghevole in carta e bambù, incisione laser Glitz sul manico. Essenziale per le serate estive più calde.",
        details: ["Manico in legno di bambù", "Carta pieghevole avorio", "Incisione laser", "Lunghezza aperto 42 cm", "Custodia inclusa"],
        color: "Avorio / Bambù",
        badge: null,
    },
    {
        id: "lip-balm",
        name: "Lip Balm Glitz",
        subtitle: "Balsamo labbra idratante",
        price: 12,
        image: `${ASSETS}/qdkmd1ir_b5e6a2ee-7a76-43f3-bb62-de43dc8d7909.webp`,
        gallery: [
            `${ASSETS}/qdkmd1ir_b5e6a2ee-7a76-43f3-bb62-de43dc8d7909.webp`,
            AMBIENT.detail3,
            AMBIENT.pool,
            AMBIENT.detail4,
        ],
        description: "Balsamo labbra nutriente al burro di karité e vitamina E. Confezione nera minimal con logo Glitz. Idrata e ripara le labbra dopo sole e salsedine.",
        details: ["Burro di karité + Vit. E", "Formato tascabile 4.5g", "Cruelty free", "Vegano certificato", "Made in Italy"],
        color: "Nero",
        badge: "Nuovo",
    },
    {
        id: "tshirt-vibes",
        name: "T-Shirt Glitz Vibes Only",
        subtitle: "T-shirt oversize bianca",
        price: 55,
        image: `${ASSETS}/okhlpgww_4e29f9e2-0a06-4857-b78f-29a811aee8bc.webp`,
        gallery: [
            `${ASSETS}/okhlpgww_4e29f9e2-0a06-4857-b78f-29a811aee8bc.webp`,
            AMBIENT.arch,
            AMBIENT.detail2,
            AMBIENT.hero,
        ],
        description: "T-shirt oversize in cotone pesante 240g/m². Logo GLITZ Room piccolo sul fronte + stampa circolare GLITZ VIBES ONLY rossa sul retro. Vestibilità unisex.",
        details: ["100% cotone pesante 240g", "Vestibilità oversize unisex", "Stampa serigrafica", "Taglie XS-XXL", "Made in Portugal"],
        color: "Bianco / Rosso",
        badge: "Limited",
        sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    },
    {
        id: "beach-bag",
        name: "Beach Bag Glitz",
        subtitle: "Borsa mare in canvas",
        price: 65,
        image: `${ASSETS}/sfw9hba6_9df1fbf9-7ffd-44ed-9ff1-d7a27d206760.webp`,
        gallery: [
            `${ASSETS}/sfw9hba6_9df1fbf9-7ffd-44ed-9ff1-d7a27d206760.webp`,
            AMBIENT.seaview,
            AMBIENT.detail4,
            AMBIENT.pool,
        ],
        description: "Borsa mare grande in canvas naturale con manici neri. Logo Glitz Club ricamato sul fronte. Capiente, resistente e minimal — pensata per portarti tutto il beach essentials.",
        details: ["Canvas naturale 340g/m²", "Manici in cotone rinforzati", "Logo ricamato", "Formato 48×36×14 cm", "Interno con tasca zip"],
        color: "Ecru / Nero",
        badge: null,
    },
];

export default function Shop() {
    return (
        <div>
            <Seo
                title="Shop — Merchandise Ufficiale Glitz Club"
                description="La capsule collection ufficiale del Glitz Club: teli mare, t-shirt, borse, ventagli, lip balm e gift card. Pagamento sicuro con Stripe, spedizione in tutta Italia."
            />

            <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-12">
                <div className="space-y-4">
                    <span className="overline-tag">Capsule Collection 2027</span>
                    <h1 data-testid="shop-title" className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-none">
                        Glitz <span className="bg-gradient-to-r from-lava via-sunset-pink to-sunset-purple bg-clip-text text-transparent">Shop</span>
                    </h1>
                    <p className="text-white/60 max-w-2xl text-base sm:text-lg leading-relaxed">
                        Il merchandise ufficiale del Glitz Club — pensato per l'estate, il mare e le tue serate. Pagamento sicuro con carta, spedizione in tutta Italia.
                    </p>
                    <div className="flex flex-wrap gap-3 pt-2">
                        <span className="text-xs uppercase tracking-widest text-white/50 border border-white/15 rounded-full px-3 py-1.5">Stripe checkout</span>
                        <span className="text-xs uppercase tracking-widest text-white/50 border border-white/15 rounded-full px-3 py-1.5">Spedizione 24-48h</span>
                        <span className="text-xs uppercase tracking-widest text-white/50 border border-white/15 rounded-full px-3 py-1.5">Ritiro in club</span>
                    </div>
                </div>
            </section>

            <section data-testid="shop-grid" className="max-w-7xl mx-auto px-4 sm:px-6 pb-24">
                <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {PRODUCTS.map((p, i) => (
                        <motion.div
                            key={p.id}
                            data-testid={`product-card-${p.id}`}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ duration: 0.5, delay: i * 0.05 }}
                        >
                            <Link
                                to={`/shop/${p.id}`}
                                className="group block relative rounded-2xl overflow-hidden bg-surface/40 border border-white/5 hover:border-lava/40 transition duration-500"
                            >
                                {p.badge && (
                                    <span className="absolute top-4 left-4 z-10 text-[10px] uppercase tracking-widest font-black bg-lava text-white px-2.5 py-1 rounded-full">
                                        {p.badge}
                                    </span>
                                )}
                                <div className="aspect-[4/5] overflow-hidden bg-obsidian">
                                    <img
                                        src={p.image}
                                        alt={p.name}
                                        loading="lazy"
                                        className={`w-full h-full group-hover:scale-105 transition-transform duration-700 ${p.id === "gift-card" ? "object-contain p-8 bg-black" : "object-cover"}`}
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
                        </motion.div>
                    ))}
                </div>
            </section>

            <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-24">
                <div className="glass-card rounded-2xl p-8 sm:p-12 space-y-6">
                    <div className="space-y-3 max-w-2xl">
                        <span className="overline-tag">Come Ordinare</span>
                        <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">3 step. Fatta.</h2>
                    </div>
                    <div className="grid gap-6 sm:grid-cols-3">
                        {[
                            { n: "01", title: "Scegli il prodotto", body: "Apri la pagina prodotto, seleziona taglia e quantità." },
                            { n: "02", title: "Paga con Stripe", body: "Checkout sicuro con carta di credito. O ordina via WhatsApp." },
                            { n: "03", title: "Ricevi o ritira", body: "Spedizione 24-48h in Italia o ritiro in club." },
                        ].map((s) => (
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
        </div>
    );
}
