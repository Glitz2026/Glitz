import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, Calendar } from "lucide-react";
import { api } from "../lib/api";
import Seo from "../components/Seo";

function formatPast(iso) {
    try {
        const d = new Date(iso);
        return d.toLocaleDateString("it-IT", { day: "2-digit", month: "long", year: "numeric" });
    } catch { return iso; }
}

export default function PastEvents() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get("/past-events")
            .then((r) => setEvents(r.data))
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    // Group by year
    const byYear = events.reduce((acc, e) => {
        const y = (e.date || "").slice(0, 4);
        (acc[y] = acc[y] || []).push(e);
        return acc;
    }, {});
    const years = Object.keys(byYear).sort((a, b) => b.localeCompare(a));

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
            <Seo title="Eventi Passati" description="L'archivio delle serate al Glitz Club: Ludwig, Mamacita, Damante, Ludovica Pagani, Goodboys, Cristian Marchi e tanti altri ospiti internazionali." />

            <Link to="/eventi" data-testid="back-to-events" className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm uppercase tracking-widest mb-6">
                <ArrowLeft className="w-4 h-4" /> Prossimi eventi
            </Link>

            <div className="mb-12 space-y-3">
                <span className="overline-tag">Archivio</span>
                <h1 className="section-title">Eventi Passati</h1>
                <p className="text-white/60 max-w-2xl">
                    Tutte le serate che hanno segnato la storia del Glitz. Ospiti, DJ set, party series — dal 2025 in poi.
                </p>
            </div>

            {loading && <p className="text-white/50">Caricamento...</p>}

            {!loading && years.map((y) => (
                <section key={y} data-testid={`past-year-${y}`} className="mb-14">
                    <div className="flex items-center gap-4 mb-6">
                        <h2 className="text-4xl sm:text-5xl font-black text-white tabular-nums">{y}</h2>
                        <div className="flex-1 h-px bg-gradient-to-r from-lava/60 to-transparent" />
                        <span className="text-xs uppercase tracking-widest text-white/50">{byYear[y].length} serate</span>
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {byYear[y].map((ev, i) => (
                            <a
                                key={ev.id}
                                href={ev.ticket_url}
                                target="_blank"
                                rel="noreferrer"
                                data-testid={`past-event-${i}`}
                                className="group relative block overflow-hidden rounded-2xl bg-surface border border-white/10 hover:border-lava/50 transition"
                            >
                                <div className="aspect-square overflow-hidden">
                                    <img
                                        src={ev.poster_url}
                                        alt={ev.title}
                                        loading="lazy"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent" />
                                </div>
                                <div className="absolute top-3 left-3 bg-obsidian/80 backdrop-blur text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-widest flex items-center gap-1.5">
                                    <Calendar className="w-3 h-3" /> {formatPast(ev.date)}
                                </div>
                                <div className="p-4 space-y-1">
                                    <h3 className="text-base font-bold text-white leading-tight line-clamp-2">{ev.title}</h3>
                                    <div className="inline-flex items-center gap-1.5 text-xs text-lava font-semibold uppercase tracking-widest">
                                        TicketSms <ExternalLink className="w-3 h-3" />
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                </section>
            ))}
        </div>
    );
}
