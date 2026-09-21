import { useEffect, useState } from "react";
import { MapPin, Wine, CircleDollarSign, Maximize2, X } from "lucide-react";
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
    const [selected, setSelected] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [hoveredId, setHoveredId] = useState(null);
    const [zonesData, setZonesData] = useState({});
    const [tableOverrides, setTableOverrides] = useState({});
    const [fullscreen, setFullscreen] = useState(false);
    const [activeZone, setActiveZone] = useState(null);
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
    const TABLES_LIST = customTables || TABLES;

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

                {/* Zone info cards con prezzi & bottiglie — cliccabili per evidenziare la zona in piantina */}
                <div data-testid="floorplan-zone-cards" className="grid gap-3 sm:grid-cols-3 mb-6">
                    {["STAGE", "RIVA", "BAR"].map((zid) => {
                        const z = getZone(zid);
                        const isActive = activeZone === zid;
                        return (
                            <button
                                type="button"
                                key={zid}
                                data-testid={`floorplan-zone-card-${zid}`}
                                aria-pressed={isActive}
                                onClick={() => setActiveZone(isActive ? null : zid)}
                                className={`text-left glass-card rounded-xl p-4 space-y-2 border-l-4 transition-all duration-200 hover:-translate-y-[2px] focus:outline-none focus-visible:ring-2 focus-visible:ring-lava ${isActive ? "ring-2 ring-offset-2 ring-offset-obsidian shadow-[0_0_25px_rgba(255,255,255,0.15)]" : "hover:bg-white/[0.04]"}`}
                                style={{ borderLeftColor: z.color, boxShadow: isActive ? `0 0 0 2px ${z.color}, 0 0 30px ${z.color}55` : undefined }}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="text-sm font-black uppercase tracking-wide text-white">{z.label}</div>
                                    <span className={`w-3 h-3 rounded-sm ${isActive ? "animate-pulse" : ""}`} style={{ background: z.color }} />
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
                                <div className={`text-[10px] uppercase tracking-[0.25em] font-bold pt-1 transition-opacity ${isActive ? "opacity-100" : "opacity-40"}`} style={{ color: z.color }}>
                                    {isActive ? "Zona evidenziata · Tocca per deselezionare" : "Tocca per evidenziare in piantina"}
                                </div>
                            </button>
                        );
                    })}
                </div>

                <div data-testid="floorplan-legend" className="flex items-center gap-3 mb-4 flex-wrap text-xs uppercase tracking-widest text-white/60">
                    <span className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-sm inline-block bg-red-500/40 border border-red-500" /> Prenotato
                    </span>
                    <button
                        data-testid="floorplan-fullscreen-btn"
                        onClick={() => setFullscreen(true)}
                        className="lg:hidden ml-auto inline-flex items-center gap-2 px-4 py-2 rounded-full bg-lava text-white text-xs font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(225,6,0,0.35)] hover:bg-lava-hover transition"
                    >
                        <Maximize2 className="w-4 h-4" /> Vedi a schermo intero
                    </button>
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
                        <image href={floorplanUrl} x="0" y="0" width="1254" height="1254" preserveAspectRatio="xMidYMid meet" />
                        {/* Copertura scritte originali della PNG + label cliccabili delle zone */}
                        {ZONE_IDS.map((zid) => {
                            const a = ANCHORS[zid];
                            const z = getZone(zid);
                            const isActive = activeZone === zid;
                            return (
                                <g key={`zone-label-${zid}`} data-testid={`floorplan-zone-label-${zid}`} onClick={() => setActiveZone(isActive ? null : zid)} style={{ cursor: "pointer" }}>
                                    <rect x={a.cover_x} y={a.cover_y} width={a.cover_w} height={a.cover_h} fill="#0a0a0a" />
                                    <rect x={a.cover_x} y={a.cover_y} width={a.cover_w} height={a.cover_h} rx="8" fill={isActive ? `${z.color}22` : "transparent"} stroke={z.color} strokeWidth={isActive ? 2.5 : 1.5} style={{ transition: "fill 0.2s, stroke-width 0.2s" }} />
                                    <text x={a.label_x} y={a.label_y} textAnchor="middle" fill={z.color} fontSize={a.font_size} fontWeight="900" letterSpacing="2" style={{ textTransform: "uppercase" }}>{(z.label || zid).toUpperCase()}</text>
                                </g>
                            );
                        })}
                        {TABLES_LIST.map((t) => {
                            const status = reservedTables[t.id];
                            const isReserved = status === "reserved" || status === "booked";
                            const isHover = hoveredId === t.id && !isReserved;
                            const zoneColor = getZone(t.zone).color;
                            const isZoneActive = activeZone === t.zone && !isReserved;
                            const isPulsing = pulseId === t.id;
                            const showOutline = isReserved || isHover || isZoneActive || isPulsing;
                            let stroke = "transparent";
                            let strokeWidth = 0;
                            if (isReserved) { stroke = "#E10600"; strokeWidth = 2; }
                            else if (isHover) { stroke = zoneColor; strokeWidth = 2.5; }
                            else if (isZoneActive) { stroke = zoneColor; strokeWidth = 2; }
                            // Quando pulsing (tavolo appena selezionato dentro una zona attiva) raddoppia il contorno
                            if (isPulsing) { stroke = zoneColor; strokeWidth = isZoneActive ? 5 : 4; }
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
                                    {/* Hit-box invisibile per facilitare il tap */}
                                    <rect
                                        x={t.x - CELL_W / 2}
                                        y={t.y - CELL_H / 2}
                                        width={CELL_W}
                                        height={CELL_H}
                                        fill="transparent"
                                    />
                                    {/* Contorno visibile: solo attorno al quadrato del tavolo, nessuna illuminazione del testo */}
                                    {showOutline && (
                                        <rect
                                            x={t.x - LABEL_W / 2}
                                            y={t.y - LABEL_H / 2}
                                            width={LABEL_W}
                                            height={LABEL_H}
                                            rx="4"
                                            fill="none"
                                            stroke={stroke}
                                            strokeWidth={strokeWidth}
                                            style={{ transition: "stroke 0.15s" }}
                                            pointerEvents="none"
                                        >
                                            {isPulsing && (
                                                <>
                                                    <animate attributeName="stroke-width" values="2;6;2" dur="0.38s" repeatCount="1" />
                                                    <animate attributeName="width" values={`${LABEL_W};${LABEL_W * 2};${LABEL_W}`} dur="0.38s" repeatCount="1" />
                                                    <animate attributeName="height" values={`${LABEL_H};${LABEL_H * 2};${LABEL_H}`} dur="0.38s" repeatCount="1" />
                                                    <animate attributeName="x" values={`${t.x - LABEL_W / 2};${t.x - LABEL_W};${t.x - LABEL_W / 2}`} dur="0.38s" repeatCount="1" />
                                                    <animate attributeName="y" values={`${t.y - LABEL_H / 2};${t.y - LABEL_H};${t.y - LABEL_H / 2}`} dur="0.38s" repeatCount="1" />
                                                </>
                                            )}
                                        </rect>
                                    )}
                                    {isReserved && (
                                        <text x={t.x} y={t.y + 7} textAnchor="middle" fill="#E10600" fontSize="22" fontWeight="900" pointerEvents="none">×</text>
                                    )}
                                </g>
                            );
                        })}
                        {/* Tooltip on hover */}
                        {hoveredId && (() => {
                            const t = TABLES_LIST.find((x) => x.id === hoveredId);
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
                zone={selectedInfo?.label || ""}
                zoneInfo={selectedInfo}
            />

            {/* Fullscreen mobile floorplan overlay */}
            {fullscreen && (
                <div
                    data-testid="floorplan-fullscreen"
                    className="fixed inset-0 z-[70] bg-obsidian overflow-auto"
                >
                    <div className="sticky top-0 z-[71] flex items-center justify-between px-4 py-3 bg-obsidian/95 backdrop-blur border-b border-white/10">
                        <div>
                            <div className="text-[10px] uppercase tracking-[0.3em] text-lava font-bold">Piantina</div>
                            <div className="text-sm font-black uppercase text-white">Scegli il tuo tavolo</div>
                        </div>
                        <button
                            data-testid="floorplan-fullscreen-close"
                            onClick={() => setFullscreen(false)}
                            className="w-10 h-10 rounded-full bg-white/10 hover:bg-lava text-white flex items-center justify-center"
                            aria-label="Chiudi"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="p-2">
                        <svg
                            viewBox="0 0 1254 1254"
                            className="w-full h-auto block"
                            style={{ minWidth: "150vw", maxWidth: "none" }}
                            preserveAspectRatio="xMidYMid meet"
                        >
                            <image href={floorplanUrl} x="0" y="0" width="1254" height="1254" preserveAspectRatio="xMidYMid meet" />
                            {/* Copertura scritte + label cliccabili anche in fullscreen */}
                            {ZONE_IDS.map((zid) => {
                                const a = ANCHORS[zid];
                                const z = getZone(zid);
                                const isActive = activeZone === zid;
                                return (
                                    <g key={`fs-zone-label-${zid}`} data-testid={`fs-zone-label-${zid}`} onClick={() => setActiveZone(isActive ? null : zid)} style={{ cursor: "pointer" }}>
                                        <rect x={a.cover_x} y={a.cover_y} width={a.cover_w} height={a.cover_h} fill="#0a0a0a" />
                                        <rect x={a.cover_x} y={a.cover_y} width={a.cover_w} height={a.cover_h} rx="8" fill={isActive ? `${z.color}22` : "transparent"} stroke={z.color} strokeWidth={isActive ? 2.5 : 1.5} />
                                        <text x={a.label_x} y={a.label_y} textAnchor="middle" fill={z.color} fontSize={a.font_size} fontWeight="900" letterSpacing="2">{(z.label || zid).toUpperCase()}</text>
                                    </g>
                                );
                            })}
                            {TABLES_LIST.map((t) => {
                                const status = reservedTables[t.id];
                                const isReserved = status === "reserved" || status === "booked";
                                const zoneColor = getZone(t.zone).color;
                                const isZoneActive = activeZone === t.zone && !isReserved;
                                const isPulsing = pulseId === t.id;
                                const stroke = isReserved ? "#E10600" : zoneColor;
                                const strokeWidth = isZoneActive ? 2 : 2;
                                return (
                                    <g
                                        key={t.id}
                                        data-testid={`fs-table-${t.id}`}
                                        onClick={() => {
                                            if (isReserved) return;
                                            setPulseId(t.id);
                                            setTimeout(() => {
                                                setSelected(t);
                                                setModalOpen(true);
                                                setFullscreen(false);
                                                setPulseId(null);
                                            }, 380);
                                        }}
                                        style={{ cursor: isReserved ? "not-allowed" : "pointer" }}
                                    >
                                        {/* Hit-box invisibile ingrandita per touch */}
                                        <rect x={t.x - CELL_W / 2 - 6} y={t.y - CELL_H / 2 - 6} width={CELL_W + 12} height={CELL_H + 12} fill="transparent" />
                                        {/* Contorno visibile: solo attorno al quadrato del tavolo */}
                                        <rect
                                            x={t.x - LABEL_W / 2}
                                            y={t.y - LABEL_H / 2}
                                            width={LABEL_W}
                                            height={LABEL_H}
                                            rx="4"
                                            fill="none"
                                            stroke={stroke}
                                            strokeWidth={strokeWidth}
                                            pointerEvents="none"
                                        >
                                            {isPulsing && (
                                                <>
                                                    <animate attributeName="stroke-width" values={`${strokeWidth};${strokeWidth * 3};${strokeWidth}`} dur="0.38s" repeatCount="1" />
                                                    <animate attributeName="width" values={`${LABEL_W};${LABEL_W * 2};${LABEL_W}`} dur="0.38s" repeatCount="1" />
                                                    <animate attributeName="height" values={`${LABEL_H};${LABEL_H * 2};${LABEL_H}`} dur="0.38s" repeatCount="1" />
                                                    <animate attributeName="x" values={`${t.x - LABEL_W / 2};${t.x - LABEL_W};${t.x - LABEL_W / 2}`} dur="0.38s" repeatCount="1" />
                                                    <animate attributeName="y" values={`${t.y - LABEL_H / 2};${t.y - LABEL_H};${t.y - LABEL_H / 2}`} dur="0.38s" repeatCount="1" />
                                                </>
                                            )}
                                        </rect>
                                        {isReserved && (
                                            <text x={t.x} y={t.y + 7} textAnchor="middle" fill="#E10600" fontSize="22" fontWeight="900" pointerEvents="none">×</text>
                                        )}
                                    </g>
                                );
                            })}
                        </svg>
                        <p className="text-center text-white/60 text-xs mt-4 px-4 pb-6">
                            Scorri orizzontalmente per vedere tutte le zone. Tocca un tavolo libero per prenotare.
                        </p>
                    </div>
                </div>
            )}
        </section>
    );
}
