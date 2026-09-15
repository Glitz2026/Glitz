import { useEffect, useState, useRef } from "react";
import { MapPin } from "lucide-react";
import { api } from "../lib/api";
import BookingModal from "./BookingModal";

// Table hotspots positioned as % relative to the planimetria image (viewBox 1568x1101 approx)
// Zones mapped to the real Glitz plan:
// - Privé 3 (upper-left inside): tables around dance floor area
// - Privé 3 (center): main private booth cluster
// - Privé 3 (lower-left outdoor): garden booths
// - Main Bar area & Gin xp / pool: chill lounge
const TABLES = [
    // Upper-left Privé (near stage arch)
    { id: "A1", x: 14, y: 22, zone: "Privé Stage" },
    { id: "A2", x: 20, y: 22, zone: "Privé Stage" },
    { id: "A3", x: 14, y: 30, zone: "Privé Stage" },
    { id: "A4", x: 20, y: 30, zone: "Privé Stage" },
    { id: "A5", x: 14, y: 38, zone: "Privé Stage" },
    { id: "A6", x: 20, y: 38, zone: "Privé Stage" },
    // Central Privé (large area right of dance floor)
    { id: "B1", x: 36, y: 20, zone: "Privé Centrale" },
    { id: "B2", x: 42, y: 20, zone: "Privé Centrale" },
    { id: "B3", x: 48, y: 20, zone: "Privé Centrale" },
    { id: "B4", x: 36, y: 27, zone: "Privé Centrale" },
    { id: "B5", x: 42, y: 27, zone: "Privé Centrale" },
    { id: "B6", x: 48, y: 27, zone: "Privé Centrale" },
    { id: "B7", x: 36, y: 34, zone: "Privé Centrale" },
    { id: "B8", x: 42, y: 34, zone: "Privé Centrale" },
    { id: "B9", x: 48, y: 34, zone: "Privé Centrale" },
    { id: "B10", x: 36, y: 41, zone: "Privé Centrale" },
    { id: "B11", x: 42, y: 41, zone: "Privé Centrale" },
    { id: "B12", x: 48, y: 41, zone: "Privé Centrale" },
    // Lower-left Privé outdoor (garden)
    { id: "C1", x: 22, y: 56, zone: "Privé Garden" },
    { id: "C2", x: 28, y: 56, zone: "Privé Garden" },
    { id: "C3", x: 22, y: 62, zone: "Privé Garden" },
    { id: "C4", x: 28, y: 62, zone: "Privé Garden" },
    // Main Bar hi-tops
    { id: "D1", x: 60, y: 48, zone: "Main Bar" },
    { id: "D2", x: 60, y: 54, zone: "Main Bar" },
    // Gin XP / pool lounge (right, outdoor)
    { id: "E1", x: 76, y: 40, zone: "Gin XP • Pool" },
    { id: "E2", x: 82, y: 40, zone: "Gin XP • Pool" },
    { id: "E3", x: 76, y: 48, zone: "Gin XP • Pool" },
    { id: "E4", x: 82, y: 48, zone: "Gin XP • Pool" },
];

const ZONE_COLORS = {
    "Privé Stage": "#FF3300",
    "Privé Centrale": "#8A2BE2",
    "Privé Garden": "#E0115F",
    "Main Bar": "#FFA500",
    "Gin XP • Pool": "#00BFFF",
};

function resolvePlan(url) {
    if (!url) return "";
    if (url.startsWith("http")) return url;
    return `${process.env.REACT_APP_BACKEND_URL}${url}`;
}

export default function Floorplan({ eventTitle, eventId }) {
    const [planUrl, setPlanUrl] = useState("");
    const [selected, setSelected] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        api.get("/settings").then((r) => setPlanUrl(resolvePlan(r.data?.planimetria_url))).catch(() => {});
    }, []);

    const openBooking = (t) => {
        setSelected(t);
        setModalOpen(true);
    };

    return (
        <section data-testid="floorplan-section" className="my-16">
            <div className="mb-8 space-y-3">
                <span className="overline-tag">Piantina Ufficiale</span>
                <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">Scegli il tuo tavolo</h2>
                <p className="text-white/60 max-w-2xl flex items-start gap-2">
                    <MapPin className="w-4 h-4 mt-1 flex-shrink-0 text-lava" />
                    Planimetria reale del Glitz Club. Tocca un tavolo per aprire il form di prenotazione — inviamo direttamente su WhatsApp.
                </p>
            </div>

            {/* Legend */}
            <div data-testid="floorplan-legend" className="flex flex-wrap gap-4 mb-6">
                {Object.entries(ZONE_COLORS).map(([name, color]) => (
                    <div key={name} className="flex items-center gap-2 text-xs uppercase tracking-widest text-white/70">
                        <span className="w-3 h-3 rounded-full inline-block" style={{ background: color }} />
                        {name}
                    </div>
                ))}
            </div>

            <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-white">
                {planUrl && (
                    <img
                        src={planUrl}
                        alt="Planimetria Glitz Club"
                        className="w-full h-auto block select-none"
                        draggable="false"
                    />
                )}
                {!planUrl && (
                    <div className="w-full aspect-[3/2] bg-surface flex items-center justify-center text-white/40">
                        Caricamento planimetria...
                    </div>
                )}
                {planUrl && TABLES.map((t) => (
                    <button
                        key={t.id}
                        data-testid={`floorplan-table-${t.id}`}
                        onClick={() => openBooking(t)}
                        className="absolute rounded-full flex items-center justify-center text-white font-black text-[9px] sm:text-[11px] shadow-lg hover:scale-110 active:scale-95 transition-transform ring-2 ring-white/90"
                        style={{
                            left: `${t.x}%`,
                            top: `${t.y}%`,
                            transform: "translate(-50%, -50%)",
                            background: ZONE_COLORS[t.zone],
                            width: "clamp(24px, 2.6vw, 38px)",
                            height: "clamp(24px, 2.6vw, 38px)",
                            boxShadow: `0 0 0 4px ${ZONE_COLORS[t.zone]}22, 0 4px 14px rgba(0,0,0,0.35)`,
                        }}
                        aria-label={`Tavolo ${t.id} in ${t.zone}`}
                    >
                        {t.id}
                    </button>
                ))}
            </div>

            <p className="mt-4 text-[11px] text-white/40 italic">
                Layout tavoli indicativo, disponibilità confermata dallo staff. Piantina di sicurezza ufficiale del locale, scala 1:200.
            </p>

            <BookingModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                eventTitle={eventTitle}
                eventId={eventId}
                tableNumber={selected?.id}
                zone={selected?.zone}
            />
        </section>
    );
}
