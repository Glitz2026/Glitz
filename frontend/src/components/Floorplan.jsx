import { useEffect, useRef, useState } from "react";
import { MapPin, Box, Square } from "lucide-react";
import { api } from "../lib/api";
import BookingModal from "./BookingModal";

/**
 * Piantina Glitz Club — versione definitiva.
 * Sfondo: PNG ufficiale della planimetria (linee reali del club).
 * Overlay: 40 hotspot cliccabili (B0-B15, R1-R16, G1-G8) posizionati
 * sui tavoli del PDF ufficiale. Wrapper 3D isometrico con reveal cinematografico.
 */

const ZONE = {
    STAGE: { label: "Back the Stage", color: "#FF3300" },
    RIVA: { label: "Riva Deck", color: "#00BFFF" },
    BAR: { label: "Glitz Bar", color: "#FFA500" },
};

// Positions in the same coord system as the planimetria PNG (native ~1568x1101, using viewBox 1568x1101)
// Coords derived from the annotated PDF.
const TABLES = [
    // BACK THE STAGE (top-left cluster)
    { id: "B0", x: 218, y: 244, zone: "STAGE" },
    { id: "B2", x: 296, y: 244, zone: "STAGE" },
    { id: "B4", x: 371, y: 244, zone: "STAGE" },
    { id: "B1", x: 213, y: 306, zone: "STAGE" },
    { id: "B3", x: 288, y: 306, zone: "STAGE" },
    { id: "B5", x: 208, y: 370, zone: "STAGE" },
    { id: "B6", x: 288, y: 370, zone: "STAGE" },
    { id: "B7", x: 213, y: 414, zone: "STAGE" },
    // Bottom cluster of BACK STAGE
    { id: "B8", x: 172, y: 620, zone: "STAGE" },
    { id: "B9", x: 246, y: 620, zone: "STAGE" },
    { id: "B10", x: 318, y: 620, zone: "STAGE" },
    { id: "B11", x: 373, y: 658, zone: "STAGE" },
    { id: "B12", x: 393, y: 693, zone: "STAGE" },
    { id: "B13", x: 456, y: 693, zone: "STAGE" },
    { id: "B14", x: 438, y: 717, zone: "STAGE" },
    { id: "B15", x: 172, y: 687, zone: "STAGE" },

    // RIVA DECK — 4 columns × 4 rows
    { id: "R1", x: 664, y: 280, zone: "RIVA" },
    { id: "R2", x: 700, y: 348, zone: "RIVA" },
    { id: "R3", x: 700, y: 414, zone: "RIVA" },
    { id: "R4", x: 700, y: 478, zone: "RIVA" },
    { id: "R5", x: 796, y: 280, zone: "RIVA" },
    { id: "R6", x: 800, y: 348, zone: "RIVA" },
    { id: "R7", x: 800, y: 414, zone: "RIVA" },
    { id: "R8", x: 810, y: 478, zone: "RIVA" },
    { id: "R9", x: 930, y: 280, zone: "RIVA" },
    { id: "R10", x: 942, y: 348, zone: "RIVA" },
    { id: "R11", x: 950, y: 414, zone: "RIVA" },
    { id: "R12", x: 960, y: 478, zone: "RIVA" },
    { id: "R13", x: 1074, y: 280, zone: "RIVA" },
    { id: "R14", x: 1094, y: 348, zone: "RIVA" },
    { id: "R15", x: 1108, y: 414, zone: "RIVA" },
    { id: "R16", x: 1130, y: 478, zone: "RIVA" },

    // GLITZ BAR — bottom-left
    { id: "G1", x: 218, y: 756, zone: "BAR" },
    { id: "G2", x: 296, y: 782, zone: "BAR" },
    { id: "G3", x: 218, y: 834, zone: "BAR" },
    { id: "G8", x: 410, y: 862, zone: "BAR" },
    { id: "G4", x: 296, y: 872, zone: "BAR" },
    { id: "G5", x: 268, y: 944, zone: "BAR" },
    { id: "G6", x: 348, y: 982, zone: "BAR" },
    { id: "G7", x: 410, y: 944, zone: "BAR" },
];

const CELL = 38;

function resolvePlan(url) {
    if (!url) return "";
    if (url.startsWith("http")) return url;
    return `${process.env.REACT_APP_BACKEND_URL}${url}`;
}

export default function Floorplan({ eventTitle, eventId, reservedTables = {} }) {
    const [planUrl, setPlanUrl] = useState("");
    const [selected, setSelected] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [is3D, setIs3D] = useState(false);
    const [revealed, setRevealed] = useState(false);
    const wrapRef = useRef(null);

    useEffect(() => {
        api.get("/settings").then((r) => setPlanUrl(resolvePlan(r.data?.planimetria_url))).catch(() => {});
    }, []);

    useEffect(() => {
        if (revealed || !wrapRef.current) return;
        const el = wrapRef.current;
        const obs = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) {
                        setTimeout(() => {
                            setIs3D(true);
                            setRevealed(true);
                        }, 250);
                        obs.disconnect();
                    }
                });
            },
            { threshold: 0.3 }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, [revealed]);

    const openBooking = (t) => {
        const status = reservedTables[t.id];
        if (status === "reserved" || status === "booked") return;
        setSelected(t);
        setModalOpen(true);
    };

    return (
        <section data-testid="floorplan-section" className="my-16">
            <div className="mb-6 flex items-end justify-between flex-wrap gap-4">
                <div className="space-y-3">
                    <span className="overline-tag">Piantina Ufficiale</span>
                    <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">Scegli il tuo tavolo</h2>
                    <p className="text-white/60 max-w-2xl flex items-start gap-2">
                        <MapPin className="w-4 h-4 mt-1 flex-shrink-0 text-lava" />
                        Planimetria in scala del Glitz. Tocca un tavolo libero per prenotare. I tavoli grigi sono già assegnati.
                    </p>
                </div>
                <button
                    data-testid="floorplan-3d-toggle"
                    onClick={() => setIs3D((v) => !v)}
                    className="btn-ghost !text-xs !px-4 !py-2"
                >
                    {is3D ? <Square className="w-4 h-4" /> : <Box className="w-4 h-4" />}
                    {is3D ? "Vista 2D" : "Vista 3D"}
                </button>
            </div>

            <div data-testid="floorplan-legend" className="flex flex-wrap gap-4 mb-6">
                {Object.entries(ZONE).map(([k, z]) => (
                    <div key={k} className="flex items-center gap-2 text-xs uppercase tracking-widest text-white/70">
                        <span className="w-3 h-3 rounded-sm inline-block" style={{ background: z.color }} />
                        {z.label}
                    </div>
                ))}
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-white/40 ml-auto">
                    <span className="w-3 h-3 rounded-sm inline-block bg-white/20" />
                    Prenotato
                </div>
            </div>

            <div
                ref={wrapRef}
                data-testid="floorplan-3d-wrap"
                className={`plan-3d-wrap plan-reveal ${revealed ? "revealed" : ""} rounded-2xl overflow-visible border border-white/10 bg-obsidian p-6 sm:p-14 ${is3D ? "" : "flat"}`}
            >
                <div className="plan-3d-inner">
                    <svg
                        viewBox="0 0 1300 1050"
                        className="w-full h-auto"
                        role="img"
                        aria-label="Piantina Glitz Club"
                        preserveAspectRatio="xMidYMid meet"
                    >
                        <defs>
                            <filter id="planTint">
                                <feColorMatrix type="matrix" values="
                                    -1 0 0 0 1
                                    0 -1 0 0 1
                                    0 0 -1 0 1
                                    0 0 0 0.85 0" />
                            </filter>
                            <filter id="tableShadow3">
                                <feDropShadow dx="0" dy="3" stdDeviation="2" floodOpacity="0.5" />
                            </filter>
                        </defs>

                        {/* Official planimetria PNG — inverted colors for dark theme */}
                        {planUrl && (
                            <image
                                href={planUrl}
                                x="0"
                                y="0"
                                width="1300"
                                height="1050"
                                preserveAspectRatio="xMidYMid meet"
                                filter="url(#planTint)"
                                opacity="0.9"
                            />
                        )}

                        {/* Zone labels overlay */}
                        <text x="215" y="150" textAnchor="middle" fill="#FF3300" fontSize="16" fontWeight="900" letterSpacing="3" opacity="0.85">BACK THE STAGE</text>
                        <text x="890" y="150" textAnchor="middle" fill="#00BFFF" fontSize="16" fontWeight="900" letterSpacing="3" opacity="0.85">RIVA DECK</text>
                        <text x="290" y="1030" textAnchor="middle" fill="#FFA500" fontSize="16" fontWeight="900" letterSpacing="3" opacity="0.85">GLITZ BAR</text>

                        {/* Tables */}
                        {TABLES.map((t) => {
                            const status = reservedTables[t.id];
                            const isReserved = status === "reserved" || status === "booked";
                            const color = isReserved ? "rgba(255,255,255,0.2)" : ZONE[t.zone].color;
                            const stroke = isReserved ? "rgba(255,255,255,0.4)" : "#FFFFFF";
                            return (
                                <g
                                    key={t.id}
                                    onClick={() => openBooking(t)}
                                    data-testid={`floorplan-table-${t.id}`}
                                    data-status={isReserved ? "reserved" : "available"}
                                    className={isReserved ? "cursor-not-allowed opacity-70" : "cursor-pointer"}
                                >
                                    <rect
                                        x={t.x - CELL / 2}
                                        y={t.y - CELL / 2}
                                        width={CELL}
                                        height={CELL}
                                        fill={color}
                                        stroke={stroke}
                                        strokeWidth="1.5"
                                        rx="4"
                                        filter="url(#tableShadow3)"
                                        className={isReserved ? "" : "hover:brightness-125"}
                                    />
                                    <text
                                        x={t.x}
                                        y={t.y + 5}
                                        textAnchor="middle"
                                        fill={isReserved ? "rgba(255,255,255,0.5)" : "#FFFFFF"}
                                        fontSize="12"
                                        fontWeight="900"
                                        pointerEvents="none"
                                        style={{ userSelect: "none" }}
                                    >
                                        {t.id}
                                    </text>
                                </g>
                            );
                        })}
                    </svg>
                </div>
            </div>

            <p className="mt-4 text-[11px] text-white/40 italic">
                Planimetria ufficiale in scala 1:200. Le posizioni dei tavoli possono variare per singolo evento.
            </p>

            <BookingModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                eventTitle={eventTitle}
                eventId={eventId}
                tableNumber={selected?.id}
                zone={selected ? ZONE[selected.zone].label : ""}
            />
        </section>
    );
}
