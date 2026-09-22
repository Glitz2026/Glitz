import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { X, MapPin } from "lucide-react";
import Seo from "../components/Seo";
import SafeImage from "../components/SafeImage";
import { api } from "../lib/api";
import { ADDRESS } from "../lib/constants";

const HERO_FALLBACK = "https://customer-assets-gfyr7b9c.emergentagent.net/job_glitz-nightclub/artifacts/9c0lj4wr_PHOTO-2025-09-16-12-45-38%202.jpg";

function resolveUrl(u) {
    if (!u) return "";
    if (u.startsWith("http")) return u;
    return `${process.env.REACT_APP_BACKEND_URL}${u}`;
}

export default function About() {
    const [lightbox, setLightbox] = useState(null);
    const [galleryByCat, setGalleryByCat] = useState({});
    const [settings, setSettings] = useState(null);
    const [activeTab, setActiveTab] = useState(null);

    useEffect(() => {
        api.get("/settings").then((r) => setSettings(r.data)).catch(() => {});
    }, []);

    useEffect(() => {
        if (!settings) return;
        const groups = settings.about_gallery_groups || [];
        if (!activeTab && groups.length) setActiveTab(groups[0].category);
        Promise.all(
            groups.map((g) => api.get("/media", { params: { category: g.category } }).then((r) => [g.category, r.data]).catch(() => [g.category, []]))
        ).then((pairs) => {
            const obj = {};
            for (const [k, v] of pairs) obj[k] = v;
            setGalleryByCat(obj);
        });
    }, [settings]); // eslint-disable-line

    const hero = resolveUrl(settings?.about_hero_image_url) || HERO_FALLBACK;
    const zones = (settings?.about_zones && settings.about_zones.length ? settings.about_zones : []);
    const groups = settings?.about_gallery_groups || [];
    const activeItems = (galleryByCat[activeTab] || []).map((m) => resolveUrl(m.url)).filter(Boolean);

    return (
        <div>
            <Seo
                title="Il Club — Ambienti & Zone"
                description="Le zone del Glitz Club: arco iconico, terrazza tavoli, sea view sunset deck, pool & chill area. Un club all'aperto con vista sull'Isola di Dino a San Nicola Arcella."
            />

            {/* HERO */}
            <section className="relative min-h-[80vh] overflow-hidden">
                <SafeImage src={hero} alt="Glitz Club panoramica al tramonto" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/60 to-obsidian/30" />
                <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-24 pb-24 flex flex-col justify-end min-h-[80vh]">
                    <span className="overline-tag">{settings?.about_kicker || "Il Club"}</span>
                    <h1 data-testid="about-title" className="section-title mt-4 max-w-4xl">
                        {settings?.about_hero_line1 || "Cinque Ambienti,"}<br />
                        <span className="bg-gradient-to-r from-lava to-sunset-pink bg-clip-text text-transparent">{settings?.about_hero_line2 || "Una Sola Notte"}</span>
                    </h1>
                    <p className="mt-6 max-w-2xl text-lg text-white/70 leading-relaxed">
                        {settings?.about_hero_subtitle || "Affacciato su uno degli scorci più suggestivi della Calabria, il Glitz Club è un luogo esclusivo pensato per offrire esperienze di intrattenimento e relax uniche."}
                    </p>
                </div>
            </section>

            {/* Stats */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 grid sm:grid-cols-3 gap-6">
                <div className="glass-card rounded-xl p-6 text-center">
                    <div className="text-5xl font-black text-lava">{settings?.about_stat_1_value || "2000"}</div>
                    <div className="text-xs uppercase tracking-widest text-white/60 mt-2">{settings?.about_stat_1_label || "Posti all'aperto"}</div>
                </div>
                <div className="glass-card rounded-xl p-6 text-center">
                    <div className="text-5xl font-black text-lava">{settings?.about_stat_2_value || "05"}</div>
                    <div className="text-xs uppercase tracking-widest text-white/60 mt-2">{settings?.about_stat_2_label || "Ambienti distinti"}</div>
                </div>
                <div className="glass-card rounded-xl p-6 text-center">
                    <div className="text-5xl font-black text-lava">{settings?.about_stat_3_value || "180°"}</div>
                    <div className="text-xs uppercase tracking-widest text-white/60 mt-2">{settings?.about_stat_3_label || "Vista mare"}</div>
                </div>
            </section>

            {/* Zones */}
            <section data-testid="zones-section" className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-24">
                {zones.map((z, i) => {
                    const reverse = i % 2 === 1;
                    const zImage = resolveUrl(z.image);
                    const highlights = Array.isArray(z.highlights) ? z.highlights : [];
                    return (
                        <motion.div
                            key={z.id || i}
                            data-testid={`zone-${z.id || i}`}
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
                                <p className="text-white/70 leading-relaxed text-base whitespace-pre-line">{z.description}</p>
                                <ul className="space-y-2 pt-2">
                                    {highlights.map((h) => (
                                        <li key={h} className="flex items-center gap-3 text-sm text-white/80">
                                            <span className="w-1.5 h-1.5 rounded-full bg-lava" /> {h}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="relative aspect-[3/4] lg:aspect-[4/5] rounded-2xl overflow-hidden group cursor-pointer border border-white/5" onClick={() => setLightbox(zImage)}>
                                <SafeImage src={zImage} alt={z.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
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
                <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight mt-4 mb-3">{settings?.about_location_title || ADDRESS}</h2>
                <p className="text-white/60 max-w-xl mx-auto">{settings?.about_location_body || "Un anfiteatro naturale, aperto sul Tirreno, incorniciato dall'Isola di Dino."}</p>
            </section>

            {/* Gallery with tabs (subsections) */}
            <section data-testid="zones-gallery" className="max-w-7xl mx-auto px-4 sm:px-6 pb-24">
                <div className="mb-6 space-y-3">
                    <span className="overline-tag">{settings?.about_gallery_kicker || "Le Foto Più Belle"}</span>
                    <h2 className="section-title">{settings?.about_gallery_title || "Gallery"}</h2>
                </div>

                {/* Tab pills row */}
                {groups.length > 0 && (
                    <div data-testid="gallery-tabs" className="flex flex-wrap gap-2 sm:gap-3 mb-8 border-b border-white/10 pb-4">
                        {groups.map((g, gi) => {
                            const count = (galleryByCat[g.category] || []).length;
                            const active = activeTab === g.category;
                            return (
                                <button
                                    key={g.id || gi}
                                    data-testid={`gallery-tab-${g.id || gi}`}
                                    onClick={() => setActiveTab(g.category)}
                                    className={`px-4 py-2 rounded-full text-xs sm:text-sm uppercase tracking-widest font-semibold transition border ${
                                        active
                                            ? "bg-lava text-white border-lava shadow-[0_0_20px_rgba(225,6,0,0.35)]"
                                            : "bg-transparent text-white/70 border-white/15 hover:border-white/40 hover:text-white"
                                    }`}
                                >
                                    {g.title} <span className={`ml-2 text-[10px] font-normal ${active ? "text-white/80" : "text-white/40"}`}>{count}</span>
                                </button>
                            );
                        })}
                    </div>
                )}

                {/* Active tab content */}
                <motion.div
                    key={activeTab || "empty"}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                    data-testid="gallery-active-content"
                >
                    {activeItems.length === 0 ? (
                        <p className="text-white/40 text-sm italic py-12 text-center">Nessuna foto in questa sezione. Le puoi caricare dall'area admin.</p>
                    ) : (
                        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
                            {activeItems.map((url, i) => (
                                <button
                                    key={`${activeTab}-${i}`}
                                    onClick={() => setLightbox(url)}
                                    data-testid={`gallery-item-${i}`}
                                    className="masonry-item group relative block w-full overflow-hidden rounded-xl border border-white/5 hover:border-lava/40 transition mb-4"
                                >
                                    <SafeImage src={url} alt="" loading="lazy" className="w-full h-auto min-h-[160px] group-hover:scale-105 transition-transform duration-500" />
                                </button>
                            ))}
                        </div>
                    )}
                </motion.div>
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
