import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Ticket, MessageCircle, MapPin, Calendar, ArrowLeft, Users } from "lucide-react";
import { api } from "../lib/api";
import { whatsappTableLink, formatItalianDateTime } from "../lib/constants";
import Countdown from "../components/Countdown";
import Seo from "../components/Seo";

export default function EventDetail() {
    const { id } = useParams();
    const [ev, setEv] = useState(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        api.get(`/events/${id}`).then((r) => setEv(r.data)).catch(() => setError(true));
    }, [id]);

    if (error) return <div className="max-w-4xl mx-auto px-4 py-32 text-center text-white/60">Evento non trovato. <Link to="/eventi" className="text-lava underline">Torna agli eventi</Link></div>;
    if (!ev) return <div className="max-w-4xl mx-auto px-4 py-32 text-center text-white/40">Caricamento...</div>;

    const schema = {
        "@context": "https://schema.org",
        "@type": "Event",
        name: ev.title,
        startDate: ev.date,
        eventStatus: "https://schema.org/EventScheduled",
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        location: { "@type": "Place", name: "Glitz Club", address: ev.location },
        image: ev.poster_url,
        description: ev.description,
        performer: (ev.lineup || []).map((n) => ({ "@type": "PerformingGroup", name: n })),
        offers: ev.ticket_url ? { "@type": "Offer", url: ev.ticket_url, availability: "https://schema.org/InStock" } : undefined,
    };

    return (
        <div>
            <Seo title={ev.title} description={ev.description?.slice(0, 155)} schema={schema} />
            <div className="relative min-h-[70vh] overflow-hidden">
                <img src={ev.poster_url} alt={ev.title} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/80 to-obsidian/40" />
                <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pt-12 pb-24">
                    <Link to="/eventi" data-testid="back-to-events" className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm uppercase tracking-widest mb-8">
                        <ArrowLeft className="w-4 h-4" /> Tutti gli eventi
                    </Link>
                    <div className="space-y-6 max-w-3xl">
                        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-lava font-bold">
                            <Calendar className="w-3.5 h-3.5" /> {formatItalianDateTime(ev.date)}
                        </div>
                        <h1 data-testid="event-title" className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-none text-white text-glow-lava">
                            {ev.title}
                        </h1>
                        <div className="flex items-center gap-2 text-white/70">
                            <MapPin className="w-4 h-4" /> {ev.location}
                        </div>
                        <div className="pt-4">
                            <Countdown targetIso={ev.date} testIdPrefix="event-countdown" />
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            {ev.ticket_url && (
                                <a href={ev.ticket_url} target="_blank" rel="noreferrer" data-testid="event-ticket-btn" className="btn-lava">
                                    <Ticket className="w-4 h-4" /> Acquista Biglietto
                                </a>
                            )}
                            <a href={whatsappTableLink(ev.title)} target="_blank" rel="noreferrer" data-testid="event-table-btn" className="btn-ghost">
                                <MessageCircle className="w-4 h-4" /> Prenota Tavolo
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 grid gap-12 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-6">
                    <h2 className="text-2xl font-bold uppercase tracking-tight">La Serata</h2>
                    <p className="text-white/70 leading-relaxed whitespace-pre-line">{ev.description}</p>
                </div>
                <aside className="space-y-6">
                    <div className="glass-card rounded-2xl p-6 space-y-4">
                        <h3 className="text-xs uppercase tracking-widest text-lava font-bold flex items-center gap-2">
                            <Users className="w-4 h-4" /> Line-up
                        </h3>
                        <ul className="space-y-2">
                            {ev.lineup?.map((name) => (
                                <li key={name} className="text-white font-semibold">{name}</li>
                            ))}
                        </ul>
                    </div>
                </aside>
            </div>
        </div>
    );
}
