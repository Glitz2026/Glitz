import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../lib/api";
import Seo from "../components/Seo";

const MESI = ["GENNAIO", "FEBBRAIO", "MARZO", "APRILE", "MAGGIO", "GIUGNO", "LUGLIO", "AGOSTO", "SETTEMBRE", "OTTOBRE", "NOVEMBRE", "DICEMBRE"];
const GIORNI = ["DOMENICA", "LUNEDÌ", "MARTEDÌ", "MERCOLEDÌ", "GIOVEDÌ", "VENERDÌ", "SABATO"];

// Accento per artista (rim light + colore data)
const ACCENT_BY_ID = {
    "opening-damante": "neutral",
    "giada-brince": "purple",
    "raul-dumitras": "warm",
    "ai-attenzione": "red",
    "mamacita-luglio": "red",
    "ludwig": "neutral",
    "pagante-ferragosto": "warm",
    "bob-sinclar": "blue",
    "gue": "red",
    "mamacita-closing": "red",
};

function derivePoster(ev) {
    const d = new Date(ev.date);
    const artistName = (ev.title || "").split("—")[0].trim().toUpperCase();
    const opening = ev.lineup && ev.lineup.length > 1 ? ev.lineup.slice(1).join(" | ").toUpperCase() : "PATER G | WONIK | MAURO MILANO";
    // Match by slug from poster_url
    const slug = (ev.poster_url || "").split("/").pop().replace(".png", "");
    const accent = ACCENT_BY_ID[slug] || "neutral";
    return {
        artistPhoto: ev.artist_photo_url || ev.poster_url,
        artistName,
        dateDay: String(d.getDate()).padStart(2, "0"),
        dateMonth: MESI[d.getMonth()],
        dayLabel: GIORNI[d.getDay()],
        time: "23.30",
        opening,
        accent,
    };
}

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
                    <h1 className="section-title">EVENTI 2027</h1>
                </div>
                <div className="flex items-center gap-2">
                    <Link to="/eventi/passati" data-testid="past-events-link" className="btn-ghost !text-xs">
                        Eventi Passati
                    </Link>
                </div>
            </div>
            {events.length === 0 && (
                <p className="text-white/60">Nessun evento in calendario al momento. Torna presto.</p>
            )}
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {events.map((ev, i) => {
                    const p = derivePoster(ev);
                    return (
                        <Link
                            key={ev.id}
                            to={`/eventi/${ev.id}`}
                            data-testid={`events-card-${i}`}
                            className="group relative block overflow-hidden rounded-2xl bg-surface border border-white/10 hover:border-lava/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(225,6,0,0.25)]"
                        >
                            <div className="aspect-[4/5] w-full overflow-hidden relative">
                                <img src={ev.poster_url} alt={ev.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent" />
                            </div>
                            <div className="absolute inset-x-0 bottom-0 p-6 space-y-1">
                                <div className="text-[10px] uppercase tracking-widest text-lava font-black">{p.dayLabel} {p.dateDay} {p.dateMonth}</div>
                                <h3 className="text-2xl font-black text-white leading-tight uppercase tracking-tight">{p.artistName}</h3>
                                <p className="text-white/60 text-xs uppercase tracking-widest">{p.opening.split(" | ").slice(0, 3).join(" · ")}</p>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
