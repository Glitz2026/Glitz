import { useEffect, useState } from "react";
import { MapPin, Wine, CircleDollarSign } from "lucide-react";
import BookingModal from "./BookingModal";
import { api } from "../lib/api";

/**
 * Piantina Glitz Club — usa l'immagine ufficiale come sfondo, con hotspot cliccabili
 * trasparenti nelle posizioni pixel-perfect rilevate automaticamente sull'immagine (1254×1254 px).
 * Zone info (prezzi, bottiglie) sono editabili da admin -> Contenuti -> Floorplan.
 */

const DEFAULT_ZONES = {
    STAGE: { label: "Back the Stage", color: "#E10600", price_from: "€ 400", bottles: "1 bottiglia inclusa" },
    RIVA: { label: "Riva Deck", color: "#00BFFF", price_from: "€ 300", bottles: "1 bottiglia inclusa" },
    BAR: { label: "Glitz Bar", color: "#FFA500", price_from: "€ 200", bottles: "Consumazione dedicata" },
};

const TABLES = [
    // BACK THE STAGE
    { id: "B0", x: 78, y: 193, zone: "STAGE" }, { id: "B2", x: 170, y: 193, zone: "STAGE" }, { id: "B4", x: 263, y: 193, zone: "STAGE" },
    { id: "B1", x: 105, y: 260, zone: "STAGE" }, { id: "B3", x: 206, y: 260, zone: "STAGE" },
    { id: "B5", x: 90, y: 345, zone: "STAGE" }, { id: "B6", x: 200, y: 345, zone: "STAGE" }, { id: "B7", x: 90, y: 413, zone: "STAGE" },
    { id: "B8", x: 75, y: 625, zone: "STAGE" }, { id: "B9", x: 161, y: 625, zone: "STAGE" }, { id: "B10", x: 248, y: 625, zone: "STAGE" },
    { id: "B11", x: 324, y: 696, zone: "STAGE" }, { id: "B12", x: 399, y: 716, zone: "STAGE" }, { id: "B13", x: 477, y: 740, zone: "STAGE" },
    { id: "B14", x: 389, y: 769, zone: "STAGE" }, { id: "B15", x: 81, y: 746, zone: "STAGE" },
    // RIVA DECK
    { id: "R1", x: 606, y: 235, zone: "RIVA" }, { id: "R5", x: 747, y: 238, zone: "RIVA" }, { id: "R9", x: 904, y: 237, zone: "RIVA" }, { id: "R13", x: 1072, y: 237, zone: "RIVA" },
    { id: "R2", x: 617, y: 316, zone: "RIVA" }, { id: "R6", x: 762, y: 316, zone: "RIVA" }, { id: "R10", x: 915, y: 316, zone: "RIVA" }, { id: "R14", x: 1083, y: 316, zone: "RIVA" },
    { id: "R3", x: 633, y: 417, zone: "RIVA" }, { id: "R7", x: 771, y: 440, zone: "RIVA" }, { id: "R11", x: 933, y: 440, zone: "RIVA" }, { id: "R15", x: 1096, y: 440, zone: "RIVA" },
    { id: "R4", x: 645, y: 506, zone: "RIVA" }, { id: "R8", x: 792, y: 514, zone: "RIVA" }, { id: "R12", x: 955, y: 515, zone: "RIVA" }, { id: "R16", x: 1112, y: 512, zone: "RIVA" },
    // GLITZ BAR
    { id: "G1", x: 135, y: 819, zone: "BAR" }, { id: "G2", x: 212, y: 861, zone: "BAR" }, { id: "G3", x: 144, y: 913, zone: "BAR" },
    { id: "G8", x: 379, y: 939, zone: "BAR" }, { id: "G4", x: 176, y: 977, zone: "BAR" }, { id: "G5", x: 160, y: 1035, zone: "BAR" },
    { id: "G7", x: 370, y: 1036, zone: "BAR" }, { id: "G6", x: 262, y: 1069, zone: "BAR" },
];

const CELL_W = 54;
const CELL_H = 40;
const FLOORPLAN_URL = "/floorplan-official.png";

export default function Floorplan({ eventTitle, eventId, reservedTables = {} }) {
    const [selected, setSelected] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [hoveredId, setHoveredId] = useState(null);
    const [zonesData, setZonesData] = useState({});

    useEffect(() => {
        api.get("/settings").then((r) => {
            const list = r.data?.floorplan_zones || [];
            const map = {};
            list.forEach((z) => { if (z?.id) map[z.id] = z; });
            setZonesData(map);
        }).catch(() => {});
    }, []);

    const getZone = (id) => ({ ...DEFAULT_ZONES[id], ...(zonesData[id] || {}) });

    const openBooking = (t) => {
        const status = reservedTables[t.id];
        if (status === "reserved" || status === "booked") return;
        setSelected(t);
        setModalOpen(true);
    };

    const selectedZone = selected ? getZone(selected.zone) : null;

    return (
        <section data-testid="floorplan-section" className="my-16 -mx-4 sm:-mx-6 lg:-mx-16 xl:-mx-32">
            <div className="max-w-[1600px] mx-auto px-4 sm:px-6">
                <div className="mb-6 space-y-3">
                    <span className="overline-tag">Piantina Ufficiale</span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight">Scegli il tuo tavolo</h2>
                    <p className="text-white/60 max-w-2xl flex items-start gap-2">
                        <MapPin className="w-4 h-4 mt-1 flex-shrink-0 text-lava" />
                        Piantina ufficiale del Glitz Club. Tocca un tavolo libero per prenotare. I tavoli grigi sono già assegnati.
                    </p>
                </div>

                {/* Zone info cards con prezzi & bottiglie */}
                <div data-testid="floorplan-zone-cards" className="grid gap-3 sm:grid-cols-3 mb-6">
                    {["STAGE", "RIVA", "BAR"].map((zid) => {
                        const z = getZone(zid);
                        return (
                            <div key={zid} data-testid={`floorplan-zone-card-${zid}`} className="glass-card rounded-xl p-4 space-y-2 border-l-4" style={{ borderLeftColor: z.color }}>
                                <div className="flex items-center justify-between">
                                    <div className="text-sm font-black uppercase tracking-wide text-white">{z.label}</div>
                                    <span className="w-3 h-3 rounded-sm" style={{ background: z.color }} />
                                </div>
                                {z.price_from && (
                                    <div className="flex items-center gap-2 text-xs text-white/80">
                                        <CircleDollarSign className="w-3.5 h-3.5 text-lava" />
                                        <span className="font-bold">Da {z.price_from}</span>
                                        {z.min_spend && <span className="text-white/50">· {z.min_spend}</span>}
                                    </div>
                                )}
                                {z.bottles && (
                                    <div className="flex items-center gap-2 text-xs text-white/70">
                                        <Wine className="w-3.5 h-3.5 text-lava" /> {z.bottles}
                                    </div>
                                )}
                                {z.description && <p className="text-[11px] text-white/50 pt-1 leading-relaxed">{z.description}</p>}
                            </div>
                        );
                    })}
                </div>

                <div data-testid="floorplan-legend" className="flex items-center gap-3 mb-4 flex-wrap text-xs uppercase tracking-widest text-white/60">
                    <span className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-sm inline-block bg-red-500/40 border border-red-500" /> Prenotato
                    </span>
                </div>

                <div
                    data-testid="floorplan-wrap"
                    className="rounded-2xl overflow-hidden border border-white/10 bg-obsidian p-4 sm:p-6"
                >
                    <svg
                        viewBox="0 0 1254 1254"
                        className="w-full h-auto block"
                        role="img"
                        aria-label="Piantina Glitz Club"
                        preserveAspectRatio="xMidYMid meet"
                    >
                        <image href={FLOORPLAN_URL} x="0" y="0" width="1254" height="1254" preserveAspectRatio="xMidYMid meet" />
                        {TABLES.map((t) => {
                            const status = reservedTables[t.id];
                            const isReserved = status === "reserved" || status === "booked";
                            const isHover = hoveredId === t.id && !isReserved;
                            const zoneColor = getZone(t.zone).color;
                            let fill = "transparent", stroke = "transparent", strokeWidth = 0;
                            if (isReserved) {
                                fill = "rgba(225,6,0,0.28)";
                                stroke = "#E10600";
                                strokeWidth = 1.5;
                            } else if (isHover) {
                                fill = `${zoneColor}44`;
                                stroke = zoneColor;
                                strokeWidth = 2.5;
                            }
                            return (
                                <g
                                    key={t.id}
                                    data-testid={`floorplan-table-${t.id}`}
                                    data-status={isReserved ? "reserved" : "available"}
                                    onClick={() => openBooking(t)}
                                    onMouseEnter={() => setHoveredId(t.id)}
                                    onMouseLeave={() => setHoveredId(null)}
                                    className={isReserved ? "cursor-not-allowed" : "cursor-pointer"}
                                >
                                    <rect
                                        x={t.x - CELL_W / 2}
                                        y={t.y - CELL_H / 2}
                                        width={CELL_W}
                                        height={CELL_H}
                                        rx="4"
                                        fill={fill}
                                        stroke={stroke}
                                        strokeWidth={strokeWidth}
                                        style={{ transition: "fill 0.15s, stroke 0.15s" }}
                                    />
                                    {isReserved && (
                                        <text x={t.x} y={t.y + 4} textAnchor="middle" fill="#E10600" fontSize="14" fontWeight="900">×</text>
                                    )}
                                </g>
                            );
                        })}
                        {/* Tooltip on hover */}
                        {hoveredId && (() => {
                            const t = TABLES.find((x) => x.id === hoveredId);
                            if (!t) return null;
                            const zoneLabel = getZone(t.zone).label;
                            return (
                                <g pointerEvents="none">
                                    <rect x={t.x - 60} y={t.y - CELL_H / 2 - 44} width="120" height="34" rx="6" fill="#0a0a0a" stroke={getZone(t.zone).color} strokeWidth="1.5" />
                                    <text x={t.x} y={t.y - CELL_H / 2 - 27} textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="800">Tavolo {t.id}</text>
                                    <text x={t.x} y={t.y - CELL_H / 2 - 15} textAnchor="middle" fill={getZone(t.zone).color} fontSize="9" fontWeight="700" letterSpacing="1.5">{zoneLabel.toUpperCase()}</text>
                                </g>
                            );
                        })()}
                    </svg>
                </div>

                <p className="mt-4 text-[11px] text-white/40 italic text-center">
                    Piantina ufficiale del Glitz Club. Le posizioni dei tavoli possono variare per singolo evento.
                </p>
            </div>

            <BookingModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                eventTitle={eventTitle}
                eventId={eventId}
                tableNumber={selected?.id}
                zone={selectedZone?.label || ""}
                zoneInfo={selectedZone}
            />
        </section>
    );
}
