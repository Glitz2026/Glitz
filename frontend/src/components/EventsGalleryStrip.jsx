import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { api } from "../lib/api";

/**
 * Strip gallery riutilizzabile: mostra 8 foto random dalla categoria "gallery"
 * con fallback ai gruppi about_gallery_groups del settings.
 */
export default function EventsGalleryStrip({ kicker, title, description, testIdPrefix = "events-gallery" }) {
    const [items, setItems] = useState([]);

    useEffect(() => {
        api.get("/media", { params: { category: "gallery" } })
            .then((r) => {
                const list = r.data || [];
                if (list.length === 0) {
                    // fallback: prova con about_zones o about gallery groups
                    api.get("/settings").then((s) => {
                        const firstGroup = s.data?.about_gallery_groups?.[0]?.category;
                        if (!firstGroup) return;
                        api.get("/media", { params: { category: firstGroup } })
                            .then((r2) => setItems((r2.data || []).slice(0, 8)))
                            .catch(() => {});
                    }).catch(() => {});
                } else {
                    setItems(list.slice(0, 8));
                }
            })
            .catch(() => {});
    }, []);

    if (items.length === 0) return null;

    return (
        <section data-testid={`${testIdPrefix}-section`} className="mt-20 pt-16 border-t border-white/10">
            <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
                <div className="space-y-3">
                    {kicker && <span className="overline-tag">{kicker}</span>}
                    <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white leading-tight">{title}</h2>
                    {description && <p className="text-white/60 max-w-2xl">{description}</p>}
                </div>
                <Link to="/il-club" data-testid={`${testIdPrefix}-cta`} className="inline-flex items-center gap-2 text-sm uppercase tracking-widest font-semibold text-lava hover:text-lava-hover">
                    Vedi tutta la gallery <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
            <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
                {items.map((m, i) => {
                    const url = m.url?.startsWith("http") ? m.url : `${process.env.REACT_APP_BACKEND_URL}${m.url}`;
                    return (
                        <Link
                            key={m.id || i}
                            to="/il-club"
                            data-testid={`${testIdPrefix}-item-${i}`}
                            className="group relative block aspect-square rounded-xl overflow-hidden border border-white/5 hover:border-lava/40 transition"
                        >
                            <img
                                src={url}
                                alt={m.caption || "Glitz Club momento"}
                                loading="lazy"
                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition" />
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}
