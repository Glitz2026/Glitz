import { useEffect, useRef, useState } from "react";
import { MapPin, Box, Square } from "lucide-react";
import BookingModal from "./BookingModal";

/**
 * Piantina Glitz Club — versione SVG pulita.
 * Nessun PNG di sfondo. Solo linee ufficiali dei perimetri dei privé
 * (Back the Stage, Riva Deck, Glitz Bar) + arco iconico Glitz + DJ booth.
 * 40 hotspot cliccabili (B0-B15, R1-R16, G1-G8) nelle posizioni reali del PDF ufficiale.
 * Wrapper 3D isometrico con reveal cinematografico al primo scroll.
 */

const ZONE = {
    STAGE: { label: "Back the Stage", color: "#FF3300" },
    RIVA: { label: "Riva Deck", color: "#00BFFF" },
    BAR: { label: "Glitz Bar", color: "#FFA500" },
};

// Posizioni originali del PDF ufficiale (viewBox 1300x1050) — invariate
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

export default function Floorplan({ eventTitle, eventId, reservedTables = {} }) {
    const [selected, setSelected] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [is3D, setIs3D] = useState(false);
    const [revealed, setRevealed] = useState(false);
    const wrapRef = useRef(null);

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
                        Perimetri ufficiali dei privé del Glitz. Tocca un tavolo libero per prenotare. I tavoli grigi sono già assegnati.
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
                            <filter id="tableShadow3">
                                <feDropShadow dx="0" dy="3" stdDeviation="2" floodOpacity="0.5" />
                            </filter>
                            <linearGradient id="archGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#FF3300" stopOpacity="0.9" />
                                <stop offset="50%" stopColor="#FF6633" stopOpacity="1" />
                                <stop offset="100%" stopColor="#FF3300" stopOpacity="0.9" />
                            </linearGradient>
                        </defs>

                        {/* ================= PRIVÉ PERIMETERS ================= */}

                        {/* Privé Back the Stage — TOP cluster */}
                        <path
                            d="M 160 200 L 420 200 L 420 460 L 160 460 Z"
                            fill="rgba(255,51,0,0.04)"
                            stroke="#FFFFFF"
                            strokeWidth="1.8"
                            strokeLinejoin="round"
                            opacity="0.85"
                        />
                        {/* Privé Back the Stage — BOTTOM cluster (irregular) */}
                        <path
                            d="M 130 580 L 360 580 L 400 620 L 490 660 L 490 745 L 130 745 Z"
                            fill="rgba(255,51,0,0.04)"
                            stroke="#FFFFFF"
                            strokeWidth="1.8"
                            strokeLinejoin="round"
                            opacity="0.85"
                        />

                        {/* Privé Riva Deck — 4x4 grid perimeter */}
                        <path
                            d="M 620 235 L 1180 235 Q 1200 235 1200 260 L 1200 520 L 620 520 Z"
                            fill="rgba(0,191,255,0.04)"
                            stroke="#FFFFFF"
                            strokeWidth="1.8"
                            strokeLinejoin="round"
                            opacity="0.85"
                        />
                        {/* Riva vertical divider hints (4 columns) */}
                        <line x1="740" y1="245" x2="740" y2="510" stroke="#FFFFFF" strokeWidth="0.6" strokeDasharray="4 6" opacity="0.35" />
                        <line x1="875" y1="245" x2="875" y2="510" stroke="#FFFFFF" strokeWidth="0.6" strokeDasharray="4 6" opacity="0.35" />
                        <line x1="1015" y1="245" x2="1015" y2="510" stroke="#FFFFFF" strokeWidth="0.6" strokeDasharray="4 6" opacity="0.35" />

                        {/* Privé Glitz Bar — bottom-left */}
                        <path
                            d="M 170 720 L 460 720 L 460 1010 L 170 1010 Z"
                            fill="rgba(255,165,0,0.04)"
                            stroke="#FFFFFF"
                            strokeWidth="1.8"
                            strokeLinejoin="round"
                            opacity="0.85"
                        />
                        {/* Bar counter (curved line) */}
                        <path
                            d="M 190 770 Q 300 745 430 780"
                            stroke="#FFA500"
                            strokeWidth="2.5"
                            fill="none"
                            opacity="0.7"
                            strokeLinecap="round"
                        />

                        {/* ================= ARCO ICONICO GLITZ ================= */}
                        {/* Central above stage area */}
                        <path
                            d="M 500 190 Q 720 90 940 190"
                            stroke="url(#archGrad)"
                            strokeWidth="4"
                            fill="none"
                            strokeLinecap="round"
                            opacity="0.95"
                        />
                        <path
                            d="M 520 195 Q 720 108 920 195"
                            stroke="#FF6633"
                            strokeWidth="1.5"
                            fill="none"
                            opacity="0.6"
                        />
                        <text
                            x="720"
                            y="160"
                            textAnchor="middle"
                            fill="#FFFFFF"
                            fontSize="18"
                            fontWeight="900"
                            letterSpacing="10"
                            opacity="0.95"
                        >
                            GLITZ
                        </text>

                        {/* ================= DJ BOOTH ================= */}
                        <rect
                            x="670"
                            y="185"
                            width="100"
                            height="34"
                            fill="rgba(255,51,0,0.1)"
                            stroke="#FF3300"
                            strokeWidth="2"
                            rx="3"
                        />
                        <text
                            x="720"
                            y="207"
                            textAnchor="middle"
                            fill="#FF3300"
                            fontSize="12"
                            fontWeight="800"
                            letterSpacing="4"
                        >
                            DJ BOOTH
                        </text>

                        {/* ================= ZONE LABELS ================= */}
                        <text x="290" y="185" textAnchor="middle" fill="#FF3300" fontSize="14" fontWeight="900" letterSpacing="3" opacity="0.9">
                            BACK THE STAGE
                        </text>
                        <text x="290" y="570" textAnchor="middle" fill="#FF3300" fontSize="12" fontWeight="900" letterSpacing="2" opacity="0.75">
                            BACK THE STAGE · PRIVÉ 2
                        </text>
                        <text x="910" y="225" textAnchor="middle" fill="#00BFFF" fontSize="14" fontWeight="900" letterSpacing="3" opacity="0.9">
                            RIVA DECK
                        </text>
                        <text x="315" y="710" textAnchor="middle" fill="#FFA500" fontSize="14" fontWeight="900" letterSpacing="3" opacity="0.9">
                            GLITZ BAR
                        </text>

                        {/* ================= TABLES ================= */}
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
                Perimetri ufficiali dei privé del Glitz. Le posizioni dei tavoli possono variare per singolo evento.
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
