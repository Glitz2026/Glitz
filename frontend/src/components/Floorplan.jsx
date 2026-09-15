import { useState } from "react";
import { MapPin, Box, Square } from "lucide-react";
import BookingModal from "./BookingModal";

/**
 * Piantina Glitz Club — layout reale (40 tavoli, ID uguali al PDF ufficiale).
 * BACK THE STAGE: B0-B15 (16 tavoli, area sinistra alta+bassa)
 * RIVA DECK: R1-R16 (griglia 4x4 lato destro)
 * GLITZ BAR: G1-G8 (bar in basso a sinistra)
 * Isometric 3D via CSS perspective+rotateX (toggle 3D/2D).
 */

const ZONE = {
    STAGE: { label: "Back the Stage", color: "#FF3300" },
    RIVA: { label: "Riva Deck", color: "#00BFFF" },
    BAR: { label: "Glitz Bar", color: "#FFA500" },
};

// Coordinates match the real Glitz planimetria (viewBox 1080x1050)
const TABLES = [
    // BACK THE STAGE — top row (near stage back)
    { id: "B0", x: 155, y: 235, zone: "STAGE" },
    { id: "B2", x: 210, y: 235, zone: "STAGE" },
    { id: "B4", x: 265, y: 235, zone: "STAGE" },
    // Second row
    { id: "B1", x: 150, y: 295, zone: "STAGE" },
    { id: "B3", x: 205, y: 295, zone: "STAGE" },
    // Third
    { id: "B5", x: 145, y: 355, zone: "STAGE" },
    { id: "B6", x: 205, y: 360, zone: "STAGE" },
    { id: "B7", x: 150, y: 400, zone: "STAGE" },
    // Bottom cluster
    { id: "B8", x: 115, y: 600, zone: "STAGE" },
    { id: "B9", x: 175, y: 600, zone: "STAGE" },
    { id: "B10", x: 235, y: 600, zone: "STAGE" },
    { id: "B11", x: 280, y: 635, zone: "STAGE" },
    { id: "B12", x: 300, y: 670, zone: "STAGE" },
    { id: "B13", x: 350, y: 670, zone: "STAGE" },
    { id: "B14", x: 335, y: 695, zone: "STAGE" },
    { id: "B15", x: 115, y: 665, zone: "STAGE" },

    // RIVA DECK — 4x4 grid
    // Column 1
    { id: "R1", x: 525, y: 270, zone: "RIVA" },
    { id: "R2", x: 555, y: 335, zone: "RIVA" },
    { id: "R3", x: 555, y: 400, zone: "RIVA" },
    { id: "R4", x: 555, y: 465, zone: "RIVA" },
    // Column 2
    { id: "R5", x: 630, y: 270, zone: "RIVA" },
    { id: "R6", x: 630, y: 335, zone: "RIVA" },
    { id: "R7", x: 630, y: 400, zone: "RIVA" },
    { id: "R8", x: 635, y: 465, zone: "RIVA" },
    // Column 3
    { id: "R9", x: 735, y: 270, zone: "RIVA" },
    { id: "R10", x: 750, y: 335, zone: "RIVA" },
    { id: "R11", x: 750, y: 400, zone: "RIVA" },
    { id: "R12", x: 755, y: 465, zone: "RIVA" },
    // Column 4
    { id: "R13", x: 845, y: 270, zone: "RIVA" },
    { id: "R14", x: 860, y: 335, zone: "RIVA" },
    { id: "R15", x: 870, y: 400, zone: "RIVA" },
    { id: "R16", x: 885, y: 465, zone: "RIVA" },

    // GLITZ BAR — bottom-left
    { id: "G1", x: 155, y: 735, zone: "BAR" },
    { id: "G2", x: 220, y: 760, zone: "BAR" },
    { id: "G3", x: 155, y: 810, zone: "BAR" },
    { id: "G8", x: 320, y: 835, zone: "BAR" },
    { id: "G4", x: 220, y: 845, zone: "BAR" },
    { id: "G5", x: 200, y: 920, zone: "BAR" },
    { id: "G6", x: 265, y: 955, zone: "BAR" },
    { id: "G7", x: 320, y: 920, zone: "BAR" },
];

const CELL = 30;

export default function Floorplan({ eventTitle, eventId, reservedTables = {} }) {
    const [selected, setSelected] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [is3D, setIs3D] = useState(true);

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
                    <span className="overline-tag">Piantina Interattiva</span>
                    <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">Scegli il tuo tavolo</h2>
                    <p className="text-white/60 max-w-2xl flex items-start gap-2">
                        <MapPin className="w-4 h-4 mt-1 flex-shrink-0 text-lava" />
                        Piantina ufficiale del Glitz. Tocca un quadratino libero per prenotare. I tavoli grigi sono già assegnati.
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

            <div className={`plan-3d-wrap rounded-2xl overflow-visible border border-white/10 bg-obsidian p-8 sm:p-16 ${is3D ? "" : "flat"}`}>
                <div className="plan-3d-inner">
                    <svg
                        viewBox="0 0 1080 1050"
                        className="w-full h-auto"
                        role="img"
                        aria-label="Piantina Glitz Club"
                    >
                        <defs>
                            <filter id="tableShadow2">
                                <feDropShadow dx="0" dy="3" stdDeviation="2" floodOpacity="0.4" />
                            </filter>
                        </defs>

                        {/* BACK THE STAGE outer wall (irregular polygon following plan) */}
                        <path d="M 70 180 L 465 180 L 465 245 L 90 245 L 90 390 L 240 390 L 260 415 L 260 555 L 230 585 L 400 585 L 400 720 L 90 720 L 90 720 Z"
                              fill="none" stroke="#FFFFFF" strokeWidth="2" opacity="0.85" strokeLinejoin="round" />

                        {/* Curved wall between BACK STAGE and RIVA (like the plan) */}
                        <path d="M 465 245 Q 490 350 490 500 L 470 545 L 400 585"
                              fill="none" stroke="#FFFFFF" strokeWidth="2" opacity="0.75" />

                        {/* RIVA DECK outer wall */}
                        <path d="M 490 180 L 970 180 L 970 500 Q 970 540 930 545 L 500 545"
                              fill="none" stroke="#FFFFFF" strokeWidth="2" opacity="0.85" strokeLinejoin="round" />

                        {/* GLITZ BAR outer wall (bottom left) */}
                        <path d="M 90 720 L 400 720 L 400 990 L 90 990 Z"
                              fill="none" stroke="#FFFFFF" strokeWidth="2" opacity="0.85" strokeLinejoin="round" />

                        {/* Stage / DJ back (top wall of stage) */}
                        <rect x="70" y="150" width="930" height="30" fill="rgba(255,51,0,0.08)" stroke="#FF3300" strokeWidth="1.5" opacity="0.7" />

                        {/* Zone labels */}
                        <text x="200" y="500" textAnchor="middle" fill="#FFFFFF" fontSize="20" fontWeight="900" letterSpacing="4" opacity="0.9">BACK THE STAGE</text>
                        <text x="720" y="440" textAnchor="middle" fill="#FFFFFF" fontSize="22" fontWeight="900" letterSpacing="4" opacity="0.9">RIVA DECK</text>
                        <text x="245" y="885" textAnchor="middle" fill="#FFFFFF" fontSize="18" fontWeight="900" letterSpacing="3" opacity="0.9">GLITZ BAR</text>

                        {/* Bar counter (curved line) */}
                        <path d="M 100 775 Q 180 745 260 775 L 320 780" stroke="#FFA500" strokeWidth="2.5" fill="none" opacity="0.75" strokeLinecap="round" />

                        {/* Small deco: pool/console box outline */}
                        <rect x="70" y="760" width="45" height="45" fill="none" stroke="#00BFFF" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />

                        {/* Tables */}
                        {TABLES.map((t) => {
                            const status = reservedTables[t.id];
                            const isReserved = status === "reserved" || status === "booked";
                            const color = isReserved ? "rgba(255,255,255,0.15)" : ZONE[t.zone].color;
                            const stroke = isReserved ? "rgba(255,255,255,0.3)" : "#FFFFFF";
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
                                        strokeWidth="1.2"
                                        rx="3"
                                        filter="url(#tableShadow2)"
                                        className={isReserved ? "" : "hover:brightness-125"}
                                    />
                                    <text
                                        x={t.x}
                                        y={t.y + 4}
                                        textAnchor="middle"
                                        fill={isReserved ? "rgba(255,255,255,0.4)" : "#FFFFFF"}
                                        fontSize="10"
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
                Piantina ufficiale in scala. Passa il mouse sull'area per inclinare la vista, oppure "Vista 2D" per visualizzazione piatta.
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
