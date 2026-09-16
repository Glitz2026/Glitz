import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { X, MapPin } from "lucide-react";
import Seo from "../components/Seo";
import { api } from "../lib/api";
import { ADDRESS } from "../lib/constants";

const ASSETS = "https://customer-assets-gfyr7b9c.emergentagent.net/job_glitz-nightclub/artifacts";

// Zones with real Glitz Club photos (user-provided)
const ZONES = [
    {
        id: "arco",
        title: "L'Arco Iconico",
        subtitle: "Il simbolo del Glitz",
        image: `${ASSETS}/tzd5z52p_PHOTO-2025-09-16-12-45-38.jpg`,
        description: "L'arco scenografico a LED che incornicia la consolle è il simbolo del club. Un'architettura che si accende dal tramonto e trasforma la pista in un anfiteatro naturale affacciato sull'Isola di Dino. Al centro dell'arco: il DJ booth, con vista mare a 180°.",
        highlights: ["Vista Isola di Dino", "Consolle DJ centrale", "Lighting LED pixel mapped"],
    },
    {
        id: "backthestage",
        title: "Back the Stage",
        subtitle: "I privé dietro la consolle",
        image: `${ASSETS}/tzd5z52p_PHOTO-2025-09-16-12-45-38.jpg`,
        description: "L'area più esclusiva del Glitz: i privé dietro la consolle, a filo pista. Vista diretta sul DJ booth, servizio bottiglia premium e accesso riservato. È qui che si vive la serata da dentro il cuore del party, con la musica che ti arriva addosso e la pista sotto gli occhi.",
        highlights: ["Vista frontale sul DJ", "Accesso riservato", "Servizio bottiglia premium"],
    },
    {
        id: "riva-deck",
        title: "Riva Deck",
        subtitle: "Il cuore lounge del club",
        image: `${ASSETS}/6lina1we_PHOTO-2025-09-16-12-45-39.jpg`,
        description: "Il Riva Deck ospita tavoli premium e lettini vista pista. LED al pavimento, servizio bottiglia, atmosfera raccolta. È qui che si vivono le serate più esclusive: dai tavoli VIP prima fila fino ai gruppi che vogliono ballare senza rinunciare al comfort.",
        highlights: ["Tavoli VIP prima fila", "Lettini lounge", "Servizio bottiglia dedicato"],
    },
    {
        id: "seaview",
        title: "Sea View",
        subtitle: "Il tramonto sulla Calabria",
        image: `${ASSETS}/ppzjzi3q_PHOTO-2025-09-16-12-45-39%202.jpg`,
        description: "La zona vista mare è dove ogni serata inizia. Il sole tramonta dietro le montagne, i primi laser illuminano la baia, l'aperitivo scivola nel party. È il momento più fotografato del Glitz — non a caso questo scorcio è diventato il volto del club sui social.",
        highlights: ["Tramonto sull'Isola di Dino", "Aperitivo & sunset session", "Fotografia panoramica"],
    },
    {
        id: "artist-area",
        title: "Artist Area",
        subtitle: "L'area riservata agli artisti",
        image: `${ASSETS}/97nlxf8c_PHOTO-2025-09-16-12-45-38%203.jpg`,
        description: "Lo spazio dedicato agli artisti in line-up: dressing room, area relax privata e ingresso riservato. È qui che passano tutti i grandi nomi del calendario — da chi apre la serata alle superstar internazionali che chiudono l'alba.",
        highlights: ["Dressing room privata", "Ingresso riservato", "Zona meet & greet"],
    },
];

const HERO = `${ASSETS}/9c0lj4wr_PHOTO-2025-09-16-12-45-38%202.jpg`;
const GALLERY_TSMS = [
    "https://d9x0j4yxg9m18.cloudfront.net/venue/5388ae92-425d-4037-8928-728162e874bf.jpg",
    "https://d9x0j4yxg9m18.cloudfront.net/venue/5df9a781-c11c-4b9b-b878-9bfbaece973f.jpg",
    "https://d9x0j4yxg9m18.cloudfront.net/venue/70f48107-962b-4856-830c-c1218214d439.jpg",
    "https://d9x0j4yxg9m18.cloudfront.net/venue/ea24537a-04a2-4b75-9bbc-113b70a910df.jpg",
    "https://d9x0j4yxg9m18.cloudfront.net/venue/0c690deb-6505-487d-a7d4-d057d949677b.jpg",
];

export default function About() {
    const [lightbox, setLightbox] = useState(null);
    const [dbMedia, setDbMedia] = useState([]);

    useEffect(() => {
        api.get("/media", { params: { category: "gallery" } })
            .then((r) => setDbMedia(r.data || []))
            .catch(() => {});
    }, []);

    const resolveUrl = (m) => {
        if (!m.url) return "";
        if (m.url.startsWith("http")) return m.url;
        return `${process.env.REACT_APP_BACKEND_URL}${m.url}`;
    };

    // Final gallery: user's own + TicketSMS + any admin uploads
    const gallery = [
        HERO,
        ...ZONES.map((z) => z.image),
        ...GALLERY_TSMS,
        ...dbMedia.map(resolveUrl).filter(Boolean),
    ];

    return (
        <div>
            <Seo
                title="Il Club — Ambienti & Zone"
                description="Le zone del Glitz Club: arco iconico, terrazza tavoli, sea view sunset deck, pool & chill area. Un club all'aperto con vista sull'Isola di Dino a San Nicola Arcella."
            />

            {/* HERO */}
            <section className="relative min-h-[80vh] overflow-hidden">
                <img src={HERO} alt="Glitz Club panoramica al tramonto" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/60 to-obsidian/30" />
                <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-24 pb-24 flex flex-col justify-end min-h-[80vh]">
                    <span className="overline-tag">Il Club</span>
                    <h1 data-testid="about-title" className="section-title mt-4 max-w-4xl">
                        Cinque Ambienti,<br />
                        <span className="bg-gradient-to-r from-lava to-sunset-pink bg-clip-text text-transparent">Una Sola Notte</span>
                    </h1>
                    <p className="mt-6 max-w-2xl text-lg text-white/70 leading-relaxed">
                        Affacciato su uno degli scorci più suggestivi della Calabria, il Glitz Club è un luogo esclusivo pensato per offrire esperienze di intrattenimento e relax uniche. Musica, atmosfera e bellezza si incontrano per dare vita a serate irripetibili.
                    </p>
                </div>
            </section>

            {/* Stats */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 grid sm:grid-cols-3 gap-6">
                <div className="glass-card rounded-xl p-6 text-center">
                    <div className="text-5xl font-black text-lava">2000</div>
                    <div className="text-xs uppercase tracking-widest text-white/60 mt-2">Posti all'aperto</div>
                </div>
                <div className="glass-card rounded-xl p-6 text-center">
                    <div className="text-5xl font-black text-lava">05</div>
                    <div className="text-xs uppercase tracking-widest text-white/60 mt-2">Ambienti distinti</div>
                </div>
                <div className="glass-card rounded-xl p-6 text-center">
                    <div className="text-5xl font-black text-lava">180°</div>
                    <div className="text-xs uppercase tracking-widest text-white/60 mt-2">Vista mare</div>
                </div>
            </section>

            {/* Zones */}
            <section data-testid="zones-section" className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-24">
                {ZONES.map((z, i) => {
                    const reverse = i % 2 === 1;
                    return (
                        <motion.div
                            key={z.id}
                            data-testid={`zone-${z.id}`}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6 }}
                            className={`grid gap-8 lg:grid-cols-2 items-center ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}
                        >
                            <div className="space-y-4">
                                <div className="text-xs uppercase tracking-[0.3em] text-lava font-bold">
                                    Ambiente {String(i + 1).padStart(2, "0")}
                                </div>
                                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white leading-none">{z.title}</h2>
                                <p className="text-lava text-sm uppercase tracking-widest font-semibold">{z.subtitle}</p>
                                <p className="text-white/70 leading-relaxed text-base">{z.description}</p>
                                <ul className="space-y-2 pt-2">
                                    {z.highlights.map((h) => (
                                        <li key={h} className="flex items-center gap-3 text-sm text-white/80">
                                            <span className="w-1.5 h-1.5 rounded-full bg-lava" /> {h}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="relative aspect-[3/4] lg:aspect-[4/5] rounded-2xl overflow-hidden group cursor-pointer" onClick={() => setLightbox(z.image)}>
                                <img src={z.image} alt={z.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/50 via-transparent to-transparent" />
                            </div>
                        </motion.div>
                    );
                })}
            </section>

            {/* Location */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20 text-center">
                <div className="inline-flex items-center gap-2 text-lava text-xs uppercase tracking-[0.3em] font-bold">
                    <MapPin className="w-4 h-4" /> Location
                </div>
                <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight mt-4 mb-3">{ADDRESS}</h2>
                <p className="text-white/60 max-w-xl mx-auto">Un anfiteatro naturale, aperto sul Tirreno, incorniciato dall'Isola di Dino.</p>
            </section>

            {/* Final gallery */}
            <section data-testid="zones-gallery" className="max-w-7xl mx-auto px-4 sm:px-6 pb-24">
                <div className="mb-8 space-y-3">
                    <span className="overline-tag">Le Foto Più Belle</span>
                    <h2 className="section-title">Gallery</h2>
                </div>
                <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
                    {gallery.map((url, i) => (
                        <button
                            key={i}
                            onClick={() => setLightbox(url)}
                            data-testid={`zones-gallery-item-${i}`}
                            className="masonry-item group relative block w-full overflow-hidden rounded-xl border border-white/5 hover:border-lava/40 transition"
                        >
                            <img src={url} alt="" loading="lazy" className="w-full h-auto group-hover:scale-105 transition-transform duration-500" />
                        </button>
                    ))}
                </div>
            </section>

            {lightbox && (
                <div
                    data-testid="zones-lightbox"
                    className="fixed inset-0 z-[60] bg-obsidian/95 backdrop-blur-md flex items-center justify-center p-4"
                    onClick={() => setLightbox(null)}
                >
                    <button
                        onClick={() => setLightbox(null)}
                        className="absolute top-6 right-6 text-white hover:text-lava"
                        aria-label="Chiudi"
                    >
                        <X className="w-8 h-8" />
                    </button>
                    <img src={lightbox} alt="" className="max-w-full max-h-[90vh] rounded-lg object-contain" onClick={(e) => e.stopPropagation()} />
                </div>
            )}
        </div>
    );
}
