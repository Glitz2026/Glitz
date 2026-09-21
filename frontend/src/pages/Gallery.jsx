import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { api, API } from "../lib/api";
import Seo from "../components/Seo";

function resolveUrl(m) {
    if (!m.url) return "";
    if (m.url.startsWith("http")) return m.url;
    // Backend path served under /api/files/...
    const base = process.env.REACT_APP_BACKEND_URL;
    return `${base}${m.url}`;
}

export default function Gallery() {
    const [items, setItems] = useState([]);
    const [selected, setSelected] = useState(null);
    const [settings, setSettings] = useState({});

    useEffect(() => {
        api.get("/media", { params: { category: "gallery" } }).then((r) => setItems(r.data)).catch(() => {});
        api.get("/settings").then((r) => setSettings(r.data || {})).catch(() => {});
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
            <Seo title={settings.gallery_page_title || "Gallery"} description={settings.gallery_description || "Foto delle serate al Glitz Club: DJ, folla, arco a LED, tramonti sul mare della Calabria."} />
            <div className="mb-12 space-y-3">
                <span className="overline-tag">{settings.gallery_kicker || "Momenti"}</span>
                <h1 className="section-title">{settings.gallery_page_title || "Gallery"}</h1>
                {settings.gallery_description && <p className="text-white/60 max-w-2xl">{settings.gallery_description}</p>}
            </div>
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
                {items.map((m, i) => (
                    <button
                        key={m.id}
                        data-testid={`gallery-item-${i}`}
                        onClick={() => setSelected(m)}
                        className="masonry-item group relative block w-full overflow-hidden rounded-xl border border-white/5 hover:border-lava/40 transition"
                    >
                        <img src={resolveUrl(m)} alt={m.caption || "Glitz gallery"} loading="lazy" className="w-full h-auto group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-obsidian/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition" />
                    </button>
                ))}
            </div>

            {selected && (
                <div
                    data-testid="lightbox-overlay"
                    className="fixed inset-0 z-[60] bg-obsidian/95 backdrop-blur-md flex items-center justify-center p-4"
                    onClick={() => setSelected(null)}
                >
                    <button
                        data-testid="lightbox-close"
                        onClick={() => setSelected(null)}
                        className="absolute top-6 right-6 text-white hover:text-lava transition"
                        aria-label="Chiudi"
                    >
                        <X className="w-8 h-8" />
                    </button>
                    <img
                        src={resolveUrl(selected)}
                        alt={selected.caption || "Glitz"}
                        className="max-w-full max-h-[90vh] rounded-lg object-contain"
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}
        </div>
    );
}
