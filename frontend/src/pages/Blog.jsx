import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../lib/api";
import { formatItalianDate } from "../lib/constants";
import Seo from "../components/Seo";

export default function Blog() {
    const [posts, setPosts] = useState([]);
    const [settings, setSettings] = useState({});

    useEffect(() => {
        api.get("/posts").then((r) => setPosts(r.data)).catch(() => {});
        api.get("/settings").then((r) => setSettings(r.data || {})).catch(() => {});
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
            <Seo title={settings.blog_title || "News"} description={settings.blog_description || "Storie, guide, dietro le quinte e recap eventi del Glitz Club."} />
            <div className="mb-12 space-y-3">
                <span className="overline-tag">{settings.blog_kicker || "Magazine"}</span>
                <h1 className="section-title">{settings.blog_title || "News & Stories"}</h1>
                {settings.blog_description && <p className="text-white/60 max-w-2xl">{settings.blog_description}</p>}
            </div>
            {posts.length === 0 && <p className="text-white/60">Nessun articolo ancora pubblicato.</p>}
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((p, i) => (
                    <Link
                        key={p.id}
                        to={`/news/${p.slug}`}
                        data-testid={`post-card-${i}`}
                        className="group block rounded-2xl overflow-hidden bg-surface border border-white/10 hover:border-lava/40 transition"
                    >
                        <div className="aspect-video overflow-hidden">
                            <img src={p.cover_url} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                        <div className="p-6 space-y-3">
                            <div className="flex justify-between items-center">
                                <div className="flex flex-wrap gap-2">
                                    {p.tags?.slice(0, 2).map((t) => (
                                        <span key={t} className="text-[10px] uppercase tracking-widest text-lava font-semibold">#{t}</span>
                                    ))}
                                </div>
                                <span className="text-[10px] text-white/40 uppercase tracking-widest">{formatItalianDate(p.created_at)}</span>
                            </div>
                            <h3 className="text-xl font-bold text-white group-hover:text-lava transition line-clamp-2">{p.title}</h3>
                            <p className="text-white/60 text-sm line-clamp-3">{p.excerpt}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
