import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, ArrowRight } from "lucide-react";
import { api } from "../lib/api";
import { formatItalianDateTime } from "../lib/constants";
import Seo from "../components/Seo";

export default function Events() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        api.get("/events").then((r) => setEvents(r.data)).catch(() => {});
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
            <Seo title="Eventi" description="Line-up completa della stagione al Glitz Club San Nicola Arcella. Serate, DJ ospiti, biglietti online." />
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
                <div className="space-y-3">
                    <span className="overline-tag">Line-up 2027</span>
                    <h1 className="section-title">Eventi & Serate</h1>
                </div>
                <Link to="/eventi/passati" data-testid="past-events-link" className="btn-ghost !text-xs">
                    Eventi Passati
                </Link>
            </div>
            {events.length === 0 && (
                <p className="text-white/60">Nessun evento in calendario al momento. Torna presto.</p>
            )}
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {events.map((ev, i) => (
                    <Link
                        key={ev.id}
                        to={`/eventi/${ev.id}`}
                        data-testid={`events-card-${i}`}
                        className="group relative block overflow-hidden rounded-2xl bg-surface border border-white/10 hover:border-lava/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,51,0,0.25)]"
                    >
                        <div className="aspect-[4/5] w-full overflow-hidden relative">
                            <img src={ev.poster_url} alt={ev.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/50 to-transparent" />
                        </div>
                        <div className="absolute top-4 left-4 bg-lava text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-widest flex items-center gap-1.5">
                            <Calendar className="w-3 h-3" /> {formatItalianDateTime(ev.date).split(" • ")[0]}
                        </div>
                        <div className="absolute inset-x-0 bottom-0 p-6 space-y-2">
                            <h3 className="text-xl font-bold text-white leading-tight">{ev.title}</h3>
                            <p className="text-white/70 text-sm line-clamp-2">{ev.lineup?.join(" • ")}</p>
                            <div className="pt-3 inline-flex items-center gap-2 text-lava text-xs font-bold uppercase tracking-widest">
                                Dettagli <ArrowRight className="w-3.5 h-3.5" />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
