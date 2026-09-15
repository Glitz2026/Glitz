import { useState } from "react";
import { MapPin } from "lucide-react";
import BookingModal from "./BookingModal";

/**
 * Piantina Glitz Club — schema 2D piatto identico ai PDF ufficiali.
 * Perimetri ricalcati dai PDF ufficiali (Back the Stage + Glitz Bar + Riva Deck).
 * 40 tavoli distribuiti simmetricamente nelle 3 zone.
 * viewBox: 1800 x 1100
 */

const ZONE = {
    STAGE: { label: "Back the Stage", color: "#FF3300" },
    RIVA: { label: "Riva Deck", color: "#00BFFF" },
    BAR: { label: "Glitz Bar", color: "#FFA500" },
};

// ============ TAVOLI SIMMETRICI ============
// BACK THE STAGE: 16 tavoli, disposizione simmetrica attorno al palco
//   Sopra il palco: 2 file × 4 tavoli (B0-B7)
//   Sotto il palco: 2 file × 4 tavoli (B8-B15)
// GLITZ BAR: 8 tavoli in griglia 2×4 simmetrica (G1-G8)
// RIVA DECK: 16 tavoli in griglia 4×4 simmetrica (R1-R16)
const TABLES = [
    // BACK THE STAGE — sopra il palco (2×4)
    { id: "B0", x: 200, y: 220, zone: "STAGE" },
    { id: "B1", x: 320, y: 220, zone: "STAGE" },
    { id: "B2", x: 440, y: 220, zone: "STAGE" },
    { id: "B3", x: 560, y: 220, zone: "STAGE" },
    { id: "B4", x: 200, y: 320, zone: "STAGE" },
    { id: "B5", x: 320, y: 320, zone: "STAGE" },
    { id: "B6", x: 440, y: 320, zone: "STAGE" },
    { id: "B7", x: 560, y: 320, zone: "STAGE" },
    // BACK THE STAGE — sotto il palco (2×4)
    { id: "B8", x: 200, y: 640, zone: "STAGE" },
    { id: "B9", x: 320, y: 640, zone: "STAGE" },
    { id: "B10", x: 440, y: 640, zone: "STAGE" },
    { id: "B11", x: 560, y: 640, zone: "STAGE" },
    { id: "B12", x: 200, y: 740, zone: "STAGE" },
    { id: "B13", x: 320, y: 740, zone: "STAGE" },
    { id: "B14", x: 440, y: 740, zone: "STAGE" },
    { id: "B15", x: 560, y: 740, zone: "STAGE" },

    // GLITZ BAR — 2×4 griglia simmetrica
    { id: "G1", x: 200, y: 920, zone: "BAR" },
    { id: "G2", x: 320, y: 920, zone: "BAR" },
    { id: "G3", x: 440, y: 920, zone: "BAR" },
    { id: "G4", x: 560, y: 920, zone: "BAR" },
    { id: "G5", x: 200, y: 1020, zone: "BAR" },
    { id: "G6", x: 320, y: 1020, zone: "BAR" },
    { id: "G7", x: 440, y: 1020, zone: "BAR" },
    { id: "G8", x: 560, y: 1020, zone: "BAR" },

    // RIVA DECK — 4×4 griglia simmetrica
    { id: "R1", x: 900, y: 300, zone: "RIVA" },
    { id: "R2", x: 1050, y: 300, zone: "RIVA" },
    { id: "R3", x: 1200, y: 300, zone: "RIVA" },
    { id: "R4", x: 1350, y: 300, zone: "RIVA" },
    { id: "R5", x: 900, y: 420, zone: "RIVA" },
    { id: "R6", x: 1050, y: 420, zone: "RIVA" },
    { id: "R7", x: 1200, y: 420, zone: "RIVA" },
    { id: "R8", x: 1350, y: 420, zone: "RIVA" },
    { id: "R9", x: 900, y: 540, zone: "RIVA" },
    { id: "R10", x: 1050, y: 540, zone: "RIVA" },
    { id: "R11", x: 1200, y: 540, zone: "RIVA" },
    { id: "R12", x: 1350, y: 540, zone: "RIVA" },
    { id: "R13", x: 900, y: 660, zone: "RIVA" },
    { id: "R14", x: 1050, y: 660, zone: "RIVA" },
    { id: "R15", x: 1200, y: 660, zone: "RIVA" },
    { id: "R16", x: 1350, y: 660, zone: "RIVA" },
];

const CELL = 46;

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
                className="rounded-2xl overflow-hidden border border-white/10 bg-obsidian p-4 sm:p-8"
            >
                <svg
                    viewBox="0 0 1800 1150"
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

                    {/* ================= BACK THE STAGE ================= */}
                    {/* Perimetro ufficiale: tetto inclinato in alto, 3 notch scale sul lato destro, palco/DJ a D al centro */}
                    <path
                        d="
                            M 120 180
                            L 640 120
                            L 645 200
                            L 665 200
                            L 665 240
                            L 645 240
                            L 645 340
                            L 665 340
                            L 665 380
                            L 645 380
                            L 645 460
                            L 665 460
                            L 665 500
                            L 645 500
                            L 645 820
                            L 120 820
                            Z
                        "
                        fill="none"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        strokeLinejoin="round"
                        opacity="0.95"
                    />
                    {/* Palco / DJ booth — curva D ufficiale al centro */}
                    <path
                        d="M 260 570 
                           Q 260 440 380 425 
                           Q 500 440 500 570 Z"
                        fill="none"
                        stroke="#FFFFFF"
                        strokeWidth="1.6"
                        opacity="0.9"
                    />
                    <rect x="345" y="465" width="70" height="42" fill="none" stroke="#FFFFFF" strokeWidth="1.3" opacity="0.85" />
                    <text x="380" y="491" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="700" letterSpacing="3" opacity="0.7">DJ</text>

                    {/* ================= GLITZ BAR ================= */}
                    {/* Forma a L con piccola stanza superiore + corridoio + area tavoli */}
                    <path
                        d="
                            M 120 850
                            L 645 850
                            L 645 1100
                            L 180 1100
                            L 180 1075
                            L 120 1075
                            Z
                        "
                        fill="none"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        strokeLinejoin="round"
                        opacity="0.95"
                    />
                    {/* Bancone bar */}
                    <rect x="140" y="865" width="90" height="30" fill="none" stroke="#FFFFFF" strokeWidth="1.2" opacity="0.7" />
                    <text x="185" y="884" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="700" letterSpacing="2" opacity="0.6">BAR</text>

                    {/* ================= RIVA DECK ================= */}
                    {/* Trapezio con lato SX inclinato, bancone in alto con 6 divisioni, angolo DX arrotondato */}
                    <path
                        d="
                            M 830 220
                            L 830 205
                            L 1590 205
                            L 1590 600
                            Q 1590 720 1470 720
                            L 1050 720
                            L 1015 750
                            L 830 750
                            Z
                        "
                        fill="none"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        strokeLinejoin="round"
                        opacity="0.95"
                    />
                    {/* Bancone RIVA in alto con 6 divisioni rettangolari */}
                    <line x1="845" y1="230" x2="1575" y2="230" stroke="#FFFFFF" strokeWidth="1.2" opacity="0.85" />
                    <line x1="845" y1="255" x2="1575" y2="255" stroke="#FFFFFF" strokeWidth="1.2" opacity="0.85" />
                    {[970, 1090, 1210, 1330, 1450].map((x, i) => (
                        <line key={i} x1={x} y1="230" x2={x} y2="255" stroke="#FFFFFF" strokeWidth="1" opacity="0.75" />
                    ))}
                    {/* Notch scala in alto-destra */}
                    <path d="M 1575 205 L 1575 235 L 1590 235" fill="none" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.9" />

                    {/* ================= ZONE LABELS ================= */}
                    <text x="385" y="155" textAnchor="middle" fill="#FF3300" fontSize="17" fontWeight="900" letterSpacing="5" opacity="0.9">
                        BACK THE STAGE
                    </text>
                    <text x="1180" y="493" textAnchor="middle" fill="#00BFFF" fontSize="18" fontWeight="900" letterSpacing="6" opacity="0.5">
                        RIVA DECK
                    </text>
                    <text x="500" y="1075" textAnchor="middle" fill="#FFA500" fontSize="16" fontWeight="900" letterSpacing="5" opacity="0.9">
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
                                    rx="5"
                                    filter="url(#tableShadow)"
                                    className={isReserved ? "" : "hover:brightness-125"}
                                />
                                <text
                                    x={t.x}
                                    y={t.y + 6}
                                    textAnchor="middle"
                                    fill={isReserved ? "rgba(255,255,255,0.5)" : "#FFFFFF"}
                                    fontSize="14"
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
