import { useState } from "react";
import { MapPin } from "lucide-react";
import BookingModal from "./BookingModal";

/**
 * Piantina Glitz Club — schema 2D piatto identico al PDF ufficiale.
 * Solo linee bianche sottili sui perimetri dei privé (Back the Stage, Riva Deck, Glitz Bar).
 * 40 hotspot cliccabili (B0-B15, R1-R16, G1-G8) nelle posizioni ufficiali.
 */

const ZONE = {
    STAGE: { label: "Back the Stage", color: "#FF3300" },
    RIVA: { label: "Riva Deck", color: "#00BFFF" },
    BAR: { label: "Glitz Bar", color: "#FFA500" },
};

const TABLES = [
    // BACK THE STAGE — top cluster
    { id: "B0", x: 218, y: 244, zone: "STAGE" },
    { id: "B2", x: 296, y: 244, zone: "STAGE" },
    { id: "B4", x: 371, y: 244, zone: "STAGE" },
    { id: "B1", x: 213, y: 306, zone: "STAGE" },
    { id: "B3", x: 288, y: 306, zone: "STAGE" },
    { id: "B5", x: 208, y: 370, zone: "STAGE" },
    { id: "B6", x: 288, y: 370, zone: "STAGE" },
    { id: "B7", x: 213, y: 414, zone: "STAGE" },
    // BACK THE STAGE — bottom cluster
    { id: "B8", x: 172, y: 620, zone: "STAGE" },
    { id: "B9", x: 246, y: 620, zone: "STAGE" },
    { id: "B10", x: 318, y: 620, zone: "STAGE" },
    { id: "B11", x: 373, y: 658, zone: "STAGE" },
    { id: "B12", x: 393, y: 693, zone: "STAGE" },
    { id: "B13", x: 456, y: 693, zone: "STAGE" },
    { id: "B14", x: 438, y: 717, zone: "STAGE" },
    { id: "B15", x: 172, y: 687, zone: "STAGE" },

    // RIVA DECK — 4×4 grid
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

    const openBooking = (t) => {
        const status = reservedTables[t.id];
        if (status === "reserved" || status === "booked") return;
        setSelected(t);
        setModalOpen(true);
    };

    return (
        <section data-testid="floorplan-section" className="my-16">
            <div className="mb-6 space-y-3">
                <span className="overline-tag">Piantina Ufficiale</span>
                <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">Scegli il tuo tavolo</h2>
                <p className="text-white/60 max-w-2xl flex items-start gap-2">
                    <MapPin className="w-4 h-4 mt-1 flex-shrink-0 text-lava" />
                    Schema ufficiale dei privé del Glitz. Tocca un tavolo libero per prenotare. I tavoli grigi sono già assegnati.
                </p>
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
                data-testid="floorplan-wrap"
                className="rounded-2xl overflow-hidden border border-white/10 bg-obsidian p-6 sm:p-10"
            >
                <svg
                    viewBox="0 0 1300 1050"
                    className="w-full h-auto"
                    role="img"
                    aria-label="Piantina Glitz Club"
                    preserveAspectRatio="xMidYMid meet"
                >
                    <defs>
                        <filter id="tableShadow">
                            <feDropShadow dx="0" dy="2" stdDeviation="1.5" floodOpacity="0.5" />
                        </filter>
                    </defs>

                    {/* ================= BACK THE STAGE (linee ufficiali PDF) ================= */}
                    <path
                        d="
                            M 120 220
                            L 540 165
                            L 545 245
                            L 560 245
                            L 560 285
                            L 545 285
                            L 545 360
                            L 560 360
                            L 560 400
                            L 545 400
                            L 545 445
                            L 560 445
                            L 560 480
                            L 545 480
                            L 545 545
                            L 505 545
                            L 505 755
                            L 130 755
                            Z
                        "
                        fill="none"
                        stroke="#FFFFFF"
                        strokeWidth="1.8"
                        strokeLinejoin="round"
                        opacity="0.95"
                    />
                    {/* Palco / DJ booth (curva a D ufficiale) */}
                    <path
                        d="M 250 555 Q 250 470 340 460 Q 430 470 430 555 Z"
                        fill="none"
                        stroke="#FFFFFF"
                        strokeWidth="1.5"
                        opacity="0.9"
                    />
                    <rect x="315" y="490" width="60" height="34" fill="none" stroke="#FFFFFF" strokeWidth="1.2" opacity="0.85" />
                    <text x="345" y="512" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="700" letterSpacing="3" opacity="0.7">DJ</text>

                    {/* ================= GLITZ BAR (linee ufficiali PDF - forma a L) ================= */}
                    <path
                        d="
                            M 65 780
                            L 130 780
                            L 130 720
                            L 210 720
                            L 210 780
                            L 505 780
                            L 505 1015
                            L 175 1015
                            L 175 990
                            L 105 990
                            L 105 890
                            L 65 890
                            Z
                        "
                        fill="none"
                        stroke="#FFFFFF"
                        strokeWidth="1.8"
                        strokeLinejoin="round"
                        opacity="0.95"
                    />
                    {/* Bancone bar */}
                    <rect x="130" y="740" width="80" height="35" fill="none" stroke="#FFFFFF" strokeWidth="1" opacity="0.7" />

                    {/* ================= RIVA DECK (linee ufficiali PDF) ================= */}
                    <path
                        d="
                            M 610 240
                            L 610 220
                            L 1215 220
                            L 1215 465
                            Q 1215 528 1152 528
                            L 745 528
                            L 728 550
                            L 610 550
                            Z
                        "
                        fill="none"
                        stroke="#FFFFFF"
                        strokeWidth="1.8"
                        strokeLinejoin="round"
                        opacity="0.95"
                    />
                    {/* Bancone RIVA in alto con 6 divisioni */}
                    <line x1="625" y1="255" x2="1185" y2="255" stroke="#FFFFFF" strokeWidth="1" opacity="0.75" />
                    <line x1="625" y1="285" x2="1185" y2="285" stroke="#FFFFFF" strokeWidth="1" opacity="0.75" />
                    {[720, 815, 910, 1005, 1100].map((x, i) => (
                        <line key={i} x1={x} y1="255" x2={x} y2="285" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.6" />
                    ))}
                    {/* Notch scala in alto-destra */}
                    <path d="M 1185 220 L 1185 260 L 1215 260" fill="none" stroke="#FFFFFF" strokeWidth="1.4" opacity="0.85" />

                    {/* ================= ZONE LABELS ================= */}
                    <text x="325" y="200" textAnchor="middle" fill="#FF3300" fontSize="15" fontWeight="900" letterSpacing="4" opacity="0.9">
                        BACK THE STAGE
                    </text>
                    <text x="905" y="410" textAnchor="middle" fill="#00BFFF" fontSize="16" fontWeight="900" letterSpacing="5" opacity="0.85">
                        RIVA DECK
                    </text>
                    <text x="315" y="905" textAnchor="middle" fill="#FFA500" fontSize="15" fontWeight="900" letterSpacing="4" opacity="0.9">
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
                                    filter="url(#tableShadow)"
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

            <p className="mt-4 text-[11px] text-white/40 italic">
                Schema ufficiale del Glitz Club. Le posizioni dei tavoli possono variare per singolo evento.
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
