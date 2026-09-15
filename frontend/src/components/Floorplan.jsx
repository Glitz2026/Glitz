import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import { api } from "../lib/api";
import BookingModal from "./BookingModal";

/**
 * Interactive floorplan combining the 4 zones of Glitz Club:
 *   - BACK THE STAGE / DJ Booth
 *   - PISTA (dance floor)
 *   - TAVOLI A CONSUMO
 *   - GLITZ BAR
 *   - RIVA DECK
 *
 * Layout is a clean line drawing (viewBox 1000x1500) with lots of
 * square hotspots that the owner can remove via visual editor.
 */

const ZONE = {
    STAGE: { label: "Back the Stage", color: "#FF3300" },
    CONSUMO: { label: "Tavoli a Consumo", color: "#8A2BE2" },
    BAR: { label: "Glitz Bar", color: "#FFA500" },
    RIVA: { label: "Riva Deck", color: "#00BFFF" },
};

// 60+ square table hotspots placed across the 4 zones.
// User will remove unused ones via edit later.
const TABLES = [
    // ---- BACK THE STAGE (top wings, around DJ) ----
    { id: "S1", x: 285, y: 160, zone: "STAGE" },
    { id: "S2", x: 335, y: 160, zone: "STAGE" },
    { id: "S3", x: 385, y: 160, zone: "STAGE" },
    { id: "S4", x: 615, y: 160, zone: "STAGE" },
    { id: "S5", x: 665, y: 160, zone: "STAGE" },
    { id: "S6", x: 715, y: 160, zone: "STAGE" },
    { id: "S7", x: 240, y: 220, zone: "STAGE" },
    { id: "S8", x: 760, y: 220, zone: "STAGE" },

    // ---- TAVOLI A CONSUMO (main lounge grid, matches drone 2x3-4) ----
    // Two long rows of tables/beds
    { id: "T1", x: 350, y: 560, zone: "CONSUMO" },
    { id: "T2", x: 420, y: 560, zone: "CONSUMO" },
    { id: "T3", x: 490, y: 560, zone: "CONSUMO" },
    { id: "T4", x: 560, y: 560, zone: "CONSUMO" },
    { id: "T5", x: 630, y: 560, zone: "CONSUMO" },
    { id: "T6", x: 350, y: 640, zone: "CONSUMO" },
    { id: "T7", x: 420, y: 640, zone: "CONSUMO" },
    { id: "T8", x: 490, y: 640, zone: "CONSUMO" },
    { id: "T9", x: 560, y: 640, zone: "CONSUMO" },
    { id: "T10", x: 630, y: 640, zone: "CONSUMO" },
    { id: "T11", x: 350, y: 720, zone: "CONSUMO" },
    { id: "T12", x: 420, y: 720, zone: "CONSUMO" },
    { id: "T13", x: 490, y: 720, zone: "CONSUMO" },
    { id: "T14", x: 560, y: 720, zone: "CONSUMO" },
    { id: "T15", x: 630, y: 720, zone: "CONSUMO" },
    { id: "T16", x: 350, y: 800, zone: "CONSUMO" },
    { id: "T17", x: 420, y: 800, zone: "CONSUMO" },
    { id: "T18", x: 490, y: 800, zone: "CONSUMO" },
    { id: "T19", x: 560, y: 800, zone: "CONSUMO" },
    { id: "T20", x: 630, y: 800, zone: "CONSUMO" },
    // Perimeter tables around lounge
    { id: "T21", x: 275, y: 580, zone: "CONSUMO" },
    { id: "T22", x: 275, y: 660, zone: "CONSUMO" },
    { id: "T23", x: 275, y: 740, zone: "CONSUMO" },
    { id: "T24", x: 275, y: 820, zone: "CONSUMO" },
    { id: "T25", x: 715, y: 580, zone: "CONSUMO" },
    { id: "T26", x: 715, y: 660, zone: "CONSUMO" },
    { id: "T27", x: 715, y: 740, zone: "CONSUMO" },
    { id: "T28", x: 715, y: 820, zone: "CONSUMO" },

    // ---- GLITZ BAR (lower-left, along counter) ----
    { id: "B1", x: 120, y: 1040, zone: "BAR" },
    { id: "B2", x: 180, y: 1040, zone: "BAR" },
    { id: "B3", x: 240, y: 1040, zone: "BAR" },
    { id: "B4", x: 300, y: 1040, zone: "BAR" },
    { id: "B5", x: 360, y: 1040, zone: "BAR" },
    { id: "B6", x: 420, y: 1040, zone: "BAR" },
    { id: "B7", x: 120, y: 1110, zone: "BAR" },
    { id: "B8", x: 180, y: 1110, zone: "BAR" },
    { id: "B9", x: 240, y: 1110, zone: "BAR" },
    { id: "B10", x: 300, y: 1110, zone: "BAR" },
    { id: "B11", x: 360, y: 1110, zone: "BAR" },
    { id: "B12", x: 420, y: 1110, zone: "BAR" },

    // ---- RIVA DECK (lower-right, long linear strip) ----
    { id: "R1", x: 590, y: 1040, zone: "RIVA" },
    { id: "R2", x: 640, y: 1040, zone: "RIVA" },
    { id: "R3", x: 690, y: 1040, zone: "RIVA" },
    { id: "R4", x: 740, y: 1040, zone: "RIVA" },
    { id: "R5", x: 790, y: 1040, zone: "RIVA" },
    { id: "R6", x: 840, y: 1040, zone: "RIVA" },
    { id: "R7", x: 890, y: 1040, zone: "RIVA" },
    { id: "R8", x: 590, y: 1120, zone: "RIVA" },
    { id: "R9", x: 640, y: 1120, zone: "RIVA" },
    { id: "R10", x: 690, y: 1120, zone: "RIVA" },
    { id: "R11", x: 740, y: 1120, zone: "RIVA" },
    { id: "R12", x: 790, y: 1120, zone: "RIVA" },
    { id: "R13", x: 840, y: 1120, zone: "RIVA" },
    { id: "R14", x: 890, y: 1120, zone: "RIVA" },
];

const CELL = 42;

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
            <div className="mb-8 space-y-3">
                <span className="overline-tag">Piantina Interattiva</span>
                <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">Scegli il tuo tavolo</h2>
                <p className="text-white/60 max-w-2xl flex items-start gap-2">
                    <MapPin className="w-4 h-4 mt-1 flex-shrink-0 text-lava" />
                    Piantina ufficiale delle 4 zone del Glitz. Tocca un quadratino libero per aprire il form. I tavoli grigi sono già prenotati.
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

            <div className="rounded-2xl overflow-hidden border border-white/10 bg-obsidian p-4">
                <svg
                    viewBox="0 0 1000 1300"
                    className="w-full h-auto"
                    role="img"
                    aria-label="Piantina Glitz Club"
                >
                    {/* Outer wall (club perimeter) */}
                    <rect x="80" y="80" width="840" height="1160" fill="none" stroke="#FFFFFF" strokeWidth="3" rx="8" />

                    {/* Back the Stage area (top) */}
                    <line x1="80" y1="300" x2="920" y2="300" stroke="#FFFFFF" strokeWidth="1.5" />
                    <text x="500" y="115" textAnchor="middle" fill="#FFFFFF" fontSize="26" fontWeight="900" letterSpacing="4">BACK THE STAGE</text>

                    {/* Stage truss */}
                    <rect x="440" y="140" width="120" height="10" fill="#FFFFFF" opacity="0.85" />
                    <line x1="500" y1="150" x2="500" y2="180" stroke="#FFFFFF" strokeWidth="2" />
                    {/* DJ booth */}
                    <rect x="465" y="180" width="70" height="34" fill="none" stroke="#FF3300" strokeWidth="2" rx="2" />
                    <text x="500" y="202" textAnchor="middle" fill="#FF3300" fontSize="11" fontWeight="700" letterSpacing="2">DJ</text>
                    {/* GLITZ arch (curved) */}
                    <path d="M 320 260 Q 500 200 680 260" stroke="#FF3300" strokeWidth="3" fill="none" strokeLinecap="round" />
                    <path d="M 335 255 Q 500 208 665 255" stroke="#FF5522" strokeWidth="1.5" fill="none" opacity="0.55" />
                    <text x="500" y="248" textAnchor="middle" fill="#FFFFFF" fontSize="13" fontWeight="900" letterSpacing="6">GLITZ</text>

                    {/* Dance floor (semi-circle) */}
                    <path d="M 220 300 A 280 240 0 0 0 780 300 L 780 480 L 220 480 Z" fill="rgba(255,51,0,0.06)" stroke="rgba(255,51,0,0.35)" strokeWidth="1.5" strokeDasharray="6 4" />
                    <text x="500" y="410" textAnchor="middle" fill="#FF3300" fontSize="14" fontWeight="800" letterSpacing="6">DANCE FLOOR</text>

                    {/* Divider before TAVOLI */}
                    <line x1="220" y1="520" x2="780" y2="520" stroke="#FFFFFF" strokeWidth="1" opacity="0.4" />

                    {/* TAVOLI A CONSUMO label */}
                    <text x="500" y="545" textAnchor="middle" fill="#FFFFFF" fontSize="18" fontWeight="900" letterSpacing="3">TAVOLI A CONSUMO</text>
                    <rect x="230" y="555" width="540" height="325" fill="none" stroke="#FFFFFF" strokeWidth="1" opacity="0.4" rx="4" />

                    {/* Divider before Bar/Riva */}
                    <line x1="80" y1="960" x2="920" y2="960" stroke="#FFFFFF" strokeWidth="1" opacity="0.4" />
                    <line x1="500" y1="960" x2="500" y2="1200" stroke="#FFFFFF" strokeWidth="1" opacity="0.4" />

                    {/* GLITZ BAR label */}
                    <text x="290" y="990" textAnchor="middle" fill="#FFFFFF" fontSize="17" fontWeight="900" letterSpacing="3">GLITZ BAR</text>
                    {/* Bar counter (curved line) */}
                    <path d="M 100 1010 Q 290 985 470 1010" stroke="#FFA500" strokeWidth="3" fill="none" strokeLinecap="round" />

                    {/* RIVA DECK label */}
                    <text x="740" y="990" textAnchor="middle" fill="#FFFFFF" fontSize="17" fontWeight="900" letterSpacing="3">RIVA DECK</text>
                    {/* Riva perimeter */}
                    <line x1="520" y1="1010" x2="900" y2="1010" stroke="#00BFFF" strokeWidth="1" opacity="0.7" />
                    <line x1="520" y1="1190" x2="900" y2="1190" stroke="#00BFFF" strokeWidth="1" opacity="0.7" />

                    {/* Bottom sea label */}
                    <text x="500" y="1230" textAnchor="middle" fill="#4a3b5c" fontSize="11" letterSpacing="8" fontWeight="600">
                        MARE TIRRENO • ISOLA DI DINO
                    </text>

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
                                style={{ transformOrigin: `${t.x}px ${t.y}px` }}
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
                                    className={isReserved ? "" : "hover:brightness-125"}
                                />
                                <text
                                    x={t.x}
                                    y={t.y + 4}
                                    textAnchor="middle"
                                    fill={isReserved ? "rgba(255,255,255,0.4)" : "#FFFFFF"}
                                    fontSize="11"
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
                Piantina schematica basata sui layout ufficiali delle 4 zone Glitz. Le posizioni indicative dei tavoli possono variare per singolo evento.
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
