import { useEffect, useState } from "react";
import { MapPin, Wine, CircleDollarSign, Maximize2, X, Plus, Minus } from "lucide-react";
import { LAWN_TABLES } from "./floorplanBridge";
import Floorplan3D from "./Floorplan3D";
import BookingModal from "./BookingModal";
import { api } from "../lib/api";

/**
 * Piantina Glitz Club — usa l'immagine ufficiale come sfondo, con hotspot cliccabili
 * trasparenti nelle posizioni pixel-perfect rilevate automaticamente sull'immagine (1254×1254 px).
 * Zone info (prezzi, bottiglie) sono editabili da admin -> Contenuti -> Floorplan.
 */

const DEFAULT_ZONES = {
    SEAVIEW: { label: "Seat View", color: "#FFFFFF", description: "Sedute panoramiche e salottini sul prato. Condizioni su richiesta." },
    PRATO_BACK: { label: "Prato Back the Stage", color: "#FFFFFF", description: "Salottini sul prato. Condizioni su richiesta." },
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

const CELL_W = 54; // hit-box tap area (invisibile)
const CELL_H = 40;
const LABEL_W = 46; // contorno visibile, corrispondente al quadratino della PNG con la lettera/numero del tavolo
const LABEL_H = 42;
const FLOORPLAN_URL = "/floorplan-official.png";

const DEFAULT_ANCHORS = {
    STAGE: { cover_x: 85, cover_y: 660, cover_w: 210, cover_h: 40, label_x: 190, label_y: 686, font_size: 18 },
    RIVA: { cover_x: 842, cover_y: 360, cover_w: 165, cover_h: 40, label_x: 924, label_y: 388, font_size: 20 },
    BAR: { cover_x: 205, cover_y: 940, cover_w: 145, cover_h: 40, label_x: 278, label_y: 967, font_size: 20 },
};

// Rimosso il polygon della zona: quando è attiva, si illuminano solo i contorni dei tavoli.



export default function Floorplan({ eventTitle, eventId, reservedTables = {}, customImageUrl = "" }) {
    const [view, setView] = useState("3d");
    const [settingsReady, setSettingsReady] = useState(false);
    const [selected, setSelected] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [hoveredId, setHoveredId] = useState(null);
    const [zonesData, setZonesData] = useState({});
    const [tableOverrides, setTableOverrides] = useState({});
    const [fullscreen, setFullscreen] = useState(false);
    const [activeZone, setActiveZone] = useState(null);
    const [expandedZone, setExpandedZone] = useState(null);
    const [pulseId, setPulseId] = useState(null); // id del tavolo appena cliccato per animazione
    const [customAnchors, setCustomAnchors] = useState(null);
    const [customTables, setCustomTables] = useState(null);
    const [extraZones, setExtraZones] = useState([]); // zone extra oltre le 3 default

    const floorplanUrl = customImageUrl
        ? (customImageUrl.startsWith("http") ? customImageUrl : `${process.env.REACT_APP_BACKEND_URL}${customImageUrl}`)
        : FLOORPLAN_URL;

    useEffect(() => {
        api.get("/settings").then((r) => {
            const list = r.data?.floorplan_zones || [];
            const map = {};
            list.forEach((z) => { if (z?.id) map[z.id] = z; });
            setZonesData(map);
            setSettingsReady(true);
            setTableOverrides(r.data?.floorplan_table_overrides || {});
            const anchors = r.data?.floorplan_anchors;
            if (anchors && typeof anchors === "object" && Object.keys(anchors).length) setCustomAnchors(anchors);
            const t = r.data?.floorplan_tables;
            if (Array.isArray(t) && t.length) setCustomTables(t);
            const ez = r.data?.floorplan_extra_zones;
            if (Array.isArray(ez) && ez.length) setExtraZones(ez);
        }).catch(() => {});
    }, []);

    // Anchor risolti (default + override admin + zone extra)
    const ANCHORS = { ...DEFAULT_ANCHORS, ...(customAnchors || {}) };
    extraZones.forEach((z) => { if (z.id && !ANCHORS[z.id]) ANCHORS[z.id] = z; });
    const ZONE_IDS = Object.keys(ANCHORS);
    const TABLES_LIST = customTables || [...TABLES, ...LAWN_TABLES];

    const getZone = (id) => ({ ...DEFAULT_ZONES[id], ...(zonesData[id] || {}) });

    const openBooking = (t) => {
        const status = reservedTables[t.id];
        if (status === "reserved" || status === "booked") return;
        // Animazione pulse sul contorno del tavolo, poi apre il modale
        setPulseId(t.id);
        setTimeout(() => {
            setSelected(t);
            setModalOpen(true);
            setPulseId(null);
        }, 380);
    };

    const getTableInfo = (t) => {
        const zone = getZone(t.zone);
        const override = tableOverrides[t.id] || {};
        return {
            ...zone,
            ...(override.price_from ? { price_from: override.price_from } : {}),
            ...(override.min_spend ? { min_spend: override.min_spend } : {}),
            ...(override.bottles ? { bottles: override.bottles } : {}),
        };
    };

    const selectedInfo = selected ? getTableInfo(selected) : null;

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

                <Floorplan3D
                    eventId={eventId}
                    tables={TABLES_LIST}
                    reservedTables={reservedTables}
                    getTableInfo={getTableInfo}
                    activeZone={activeZone}
                    ready={settingsReady}
                    onSelect={(t) => { setSelected(t); setModalOpen(true); }}
                    onFallback={() => {}}
                />

                {/* Zone info compatte su UNA RIGA — nome + prezzo, "+" apre dettagli */}
                <div data-testid="floorplan-zone-cards" className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 mb-3">
                    {["STAGE", "RIVA", "BAR", "SEAVIEW", "PRATO_BACK"].map((zid) => {
                        const z = getZone(zid);
                        const isActive = activeZone === zid;
                        const isExpanded = expandedZone === zid;
                        return (
                            <div
                                key={zid}
                                data-testid={`floorplan-zone-card-${zid}`}
                                className={`relative flex items-center justify-between gap-1 rounded-lg px-2.5 py-2 border-l-[3px] transition-all cursor-pointer ${isActive ? "bg-white/10 shadow-[0_0_18px_rgba(255,255,255,0.15)]" : "bg-white/[0.03] hover:bg-white/[0.06]"}`}
                                style={{ borderLeftColor: z.color, boxShadow: isActive ? `inset 0 0 0 1px ${z.color}88, 0 0 18px ${z.color}44` : undefined }}
                                onClick={() => setActiveZone(isActive ? null : zid)}
                                role="button"
                                aria-pressed={isActive}
                            >
                                <div className="min-w-0 flex-1">
                                    <div className="text-[11px] font-black uppercase tracking-wide text-white truncate leading-tight">{z.label}</div>
                                    {z.price_from && (
                                        <div className="text-[10px] font-bold text-white/70 truncate">Da {z.price_from}</div>
                                    )}
                                </div>
                                <button
                                    type="button"
                                    data-testid={`floorplan-zone-info-${zid}`}
                                    aria-expanded={isExpanded}
                                    aria-label={isExpanded ? `Chiudi info ${z.label}` : `Info ${z.label}`}
                                    onClick={(e) => { e.stopPropagation(); setExpandedZone(isExpanded ? null : zid); }}
                                    className={`w-7 h-7 flex-shrink-0 rounded-full flex items-center justify-center transition ${isExpanded ? "bg-lava text-white" : "bg-white/10 text-white/80 hover:bg-white/20"}`}
                                >
                                    {isExpanded ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                                </button>
                            </div>
                        );
                    })}
                </div>

                {/* Pannello dettagli — appare quando l'utente preme "+" su una zona */}
                {expandedZone && (() => {
                    const z = getZone(expandedZone);
                    return (
                        <div data-testid={`floorplan-zone-detail-${expandedZone}`} className="glass-card rounded-xl p-5 mb-6 border-l-4 space-y-3 animate-in fade-in slide-in-from-top-2" style={{ borderLeftColor: z.color }}>
                            <div className="flex items-start justify-between gap-3">
                                <div>
                                    <div className="text-xs uppercase tracking-[0.3em] font-bold" style={{ color: z.color }}>Dettagli zona</div>
                                    <div className="text-xl font-black uppercase mt-1">{z.label}</div>
                                </div>
                                <button onClick={() => setExpandedZone(null)} data-testid="floorplan-zone-detail-close" className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center" aria-label="Chiudi">
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                            {z.price_from && (
                                <div className="flex items-center gap-2 text-sm text-white/90">
                                    <CircleDollarSign className="w-4 h-4 text-lava" />
                                    <span className="font-bold">Da {z.price_from}</span>
                                    {z.min_spend && <span className="text-white/60">· {z.min_spend}</span>}
                                </div>
                            )}
                            {z.bottles && (
                                <div className="flex items-center gap-2 text-sm text-white/80">
                                    <Wine className="w-4 h-4 text-lava" /> {z.bottles}
                                </div>
                            )}
                            {z.description && <p className="text-sm text-white/60 leading-relaxed">{z.description}</p>}
                            <button
                                onClick={() => { setActiveZone(expandedZone); }}
                                data-testid="floorplan-zone-detail-highlight"
                                className="btn-ghost !text-xs !py-1.5"
                            >
                                Evidenzia in piantina 3D
                            </button>
                        </div>
                    );
                })()}

                <div data-testid="floorplan-legend" className="flex items-center gap-3 mb-4 flex-wrap text-xs uppercase tracking-widest text-white/60">
                    <span className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-sm inline-block bg-red-500/40 border border-red-500" /> Prenotato
                    </span>
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
                zone={selectedInfo?.label || ""}
                zoneInfo={selectedInfo}
            />
        </section>
    );
}
