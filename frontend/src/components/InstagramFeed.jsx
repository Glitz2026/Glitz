import { Instagram, ArrowUpRight } from "lucide-react";

export default function InstagramFeed({ posts = [], profileUrl = "https://instagram.com/glitzclubofficial" }) {
    if (!posts?.length) return null;

    return (
        <section data-testid="instagram-feed-section" className="py-24 px-4 sm:px-6 max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
                <div className="space-y-3">
                    <span className="overline-tag inline-flex items-center gap-2">
                        <Instagram className="w-3.5 h-3.5" /> @glitzclubofficial
                    </span>
                    <h2 className="section-title">Follow the Vibe</h2>
                    <p className="text-white/60 max-w-xl">Le notti in tempo reale: reel, stories, dietro le quinte e ospiti sui nostri canali.</p>
                </div>
                <a
                    href={profileUrl}
                    target="_blank"
                    rel="noreferrer"
                    data-testid="instagram-follow-btn"
                    className="btn-ghost !text-xs"
                >
                    <Instagram className="w-4 h-4" /> Segui su Instagram
                </a>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {posts.slice(0, 6).map((p, i) => (
                    <a
                        key={i}
                        href={p.url || profileUrl}
                        target="_blank"
                        rel="noreferrer"
                        data-testid={`instagram-post-${i}`}
                        className="group relative aspect-square overflow-hidden rounded-xl border border-white/10 hover:border-lava/60 transition"
                    >
                        <img
                            src={p.image}
                            alt={`Post Instagram ${i + 1}`}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-lava/60 to-sunset-pink/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                            <ArrowUpRight className="w-8 h-8 text-white" />
                        </div>
                    </a>
                ))}
            </div>
        </section>
    );
}
