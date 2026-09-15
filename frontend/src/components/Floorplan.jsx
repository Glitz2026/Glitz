import { useState } from "react";
import { X, MapPin, MessageCircle, Users } from "lucide-react";
import { WHATSAPP_NUMBER } from "../lib/constants";

// Table layout: id, cx, cy (SVG coords), r (radius), zone, seats
const TABLES = [
    // Front stage (VIP / Premium)
    { id: 1, cx: 250, cy: 200, r: 22, zone: "VIP Stage", seats: 8 },
    { id: 2, cx: 350, cy: 200, r: 22, zone: "VIP Stage", seats: 8 },
    { id: 3, cx: 450, cy: 200, r: 22, zone: "VIP Stage", seats: 8 },
    { id: 4, cx: 550, cy: 200, r: 22, zone: "VIP Stage", seats: 8 },
    { id: 5, cx: 650, cy: 200, r: 22, zone: "VIP Stage", seats: 8 },
    // Ring 2
    { id: 6, cx: 180, cy: 290, r: 20, zone: "Premium", seats: 6 },
    { id: 7, cx: 720, cy: 290, r: 20, zone: "Premium", seats: 6 },
    { id: 8, cx: 250, cy: 340, r: 20, zone: "Premium", seats: 6 },
    { id: 9, cx: 350, cy: 340, r: 20, zone: "Premium", seats: 6 },
    { id: 10, cx: 450, cy: 340, r: 20, zone: "Premium", seats: 6 },
    { id: 11, cx: 550, cy: 340, r: 20, zone: "Premium", seats: 6 },
    { id: 12, cx: 650, cy: 340, r: 20, zone: "Premium", seats: 6 },
    // Sea view
    { id: 13, cx: 150, cy: 440, r: 18, zone: "Sea View", seats: 4 },
    { id: 14, cx: 250, cy: 470, r: 18, zone: "Sea View", seats: 4 },
    { id: 15, cx: 350, cy: 485, r: 18, zone: "Sea View", seats: 4 },
    { id: 16, cx: 450, cy: 490, r: 18, zone: "Sea View", seats: 4 },
    { id: 17, cx: 550, cy: 485, r: 18, zone: "Sea View", seats: 4 },
    { id: 18, cx: 650, cy: 470, r: 18, zone: "Sea View", seats: 4 },
    { id: 19, cx: 750, cy: 440, r: 18, zone: "Sea View", seats: 4 },
];

const ZONE_STYLES = {
    "VIP Stage": { fill: "#FF3300", stroke: "#FFD1C4", label: "VIP" },
    "Premium": { fill: "#8A2BE2", stroke: "#E7CFFF", label: "PRM" },
    "Sea View": { fill: "#E0115F", stroke: "#FFC8DE", label: "SEA" },
};

export default function Floorplan({ eventTitle, eventId }) {
    const [selected, setSelected] = useState(null);

    const openWhatsApp = (table) => {
        const msg = encodeURIComponent(
            `Ciao Glitz! Vorrei prenotare il Tavolo #${table.id} (${table.zone}, ${table.seats} posti) per la serata "${eventTitle}". Nome: `
        );
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
    };

    return (
        <section data-testid="floorplan-section" className="my-16">
            <div className="mb-8 space-y-3">
                <span className="overline-tag">Piantina Tavoli</span>
                <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">Scegli il tuo tavolo</h2>
                <p className="text-white/60 max-w-2xl">
                    Tocca un tavolo per richiederlo su WhatsApp. Ti confermiamo disponibilità e minimo di spesa in tempo reale.
                </p>
            </div>

            {/* Legend */}
            <div data-testid="floorplan-legend" className="flex flex-wrap gap-4 mb-6">
                {Object.entries(ZONE_STYLES).map(([name, s]) => (
                    <div key={name} className="flex items-center gap-2 text-xs uppercase tracking-widest text-white/70">
                        <span className="w-3 h-3 rounded-full inline-block" style={{ background: s.fill }} />
                        {name}
                    </div>
                ))}
            </div>

            <div className="glass-card rounded-2xl p-4 sm:p-6 overflow-hidden">
                <svg
                    viewBox="0 0 900 600"
                    className="w-full h-auto"
                    role="img"
                    aria-label="Piantina Glitz Club"
                >
                    <defs>
                        <radialGradient id="stageGlow" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="#FF3300" stopOpacity="0.6" />
                            <stop offset="100%" stopColor="#FF3300" stopOpacity="0" />
                        </radialGradient>
                        <linearGradient id="seaGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#0F0D15" />
                            <stop offset="100%" stopColor="#1a0e2e" />
                        </linearGradient>
                    </defs>

                    {/* Background */}
                    <rect width="900" height="600" fill="url(#seaGrad)" rx="12" />

                    {/* Sea */}
                    <text x="450" y="560" textAnchor="middle" fill="#4a3b5c" fontSize="12" letterSpacing="8" fontWeight="600">
                        MARE TIRRENO • ISOLA DI DINO
                    </text>

                    {/* Stage arc (iconic LED arch) */}
                    <ellipse cx="450" cy="140" rx="240" ry="30" fill="url(#stageGlow)" />
                    <path d="M 210 140 A 240 100 0 0 1 690 140" stroke="#FF3300" strokeWidth="4" fill="none" strokeLinecap="round" />
                    <path d="M 220 140 A 230 90 0 0 1 680 140" stroke="#FF5522" strokeWidth="2" fill="none" opacity="0.5" />
                    <text x="450" y="115" textAnchor="middle" fill="#FFFFFF" fontSize="14" letterSpacing="6" fontWeight="700">
                        MAIN STAGE
                    </text>

                    {/* Dance floor */}
                    <rect x="260" y="240" width="380" height="30" rx="4" fill="rgba(255,51,0,0.08)" stroke="rgba(255,51,0,0.3)" strokeDasharray="4 4" />
                    <text x="450" y="260" textAnchor="middle" fill="#FF3300" fontSize="10" letterSpacing="4" fontWeight="700">
                        DANCE FLOOR
                    </text>

                    {/* Tables */}
                    {TABLES.map((t) => {
                        const s = ZONE_STYLES[t.zone];
                        return (
                            <g
                                key={t.id}
                                onClick={() => setSelected(t)}
                                data-testid={`floorplan-table-${t.id}`}
                                className="cursor-pointer transition-all"
                                style={{ transformOrigin: `${t.cx}px ${t.cy}px` }}
                            >
                                <circle cx={t.cx} cy={t.cy} r={t.r + 6} fill={s.fill} opacity="0.15" className="hover:opacity-30 transition-opacity" />
                                <circle
                                    cx={t.cx}
                                    cy={t.cy}
                                    r={t.r}
                                    fill={s.fill}
                                    stroke={s.stroke}
                                    strokeWidth="2"
                                    className="hover:brightness-125"
                                />
                                <text x={t.cx} y={t.cy + 5} textAnchor="middle" fill="#FFFFFF" fontSize="14" fontWeight="900" pointerEvents="none">
                                    {t.id}
                                </text>
                            </g>
                        );
                    })}
                </svg>
            </div>

            {selected && (
                <div
                    data-testid="floorplan-modal"
                    className="fixed inset-0 z-[70] bg-obsidian/90 backdrop-blur-md flex items-center justify-center p-4"
                    onClick={() => setSelected(null)}
                >
                    <div
                        className="glass-card rounded-2xl p-8 max-w-md w-full relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setSelected(null)}
                            data-testid="floorplan-modal-close"
                            className="absolute top-4 right-4 text-white/60 hover:text-white"
                            aria-label="Chiudi"
                        >
                            <X className="w-6 h-6" />
                        </button>
                        <div className="space-y-4">
                            <div className="text-xs uppercase tracking-widest text-lava font-bold">{selected.zone}</div>
                            <h3 className="text-3xl font-black">Tavolo #{selected.id}</h3>
                            <div className="flex items-center gap-4 text-white/70 text-sm">
                                <span className="flex items-center gap-1.5"><Users className="w-4 h-4" /> {selected.seats} posti</span>
                                <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {selected.zone}</span>
                            </div>
                            <p className="text-white/60 text-sm">
                                Al click ti apriamo WhatsApp con il messaggio pronto: conferma nome, numero di ospiti e riceverai minimo di spesa e conferma.
                            </p>
                            <button
                                data-testid="floorplan-request-whatsapp"
                                onClick={() => openWhatsApp(selected)}
                                className="btn-lava w-full"
                            >
                                <MessageCircle className="w-4 h-4" /> Richiedi su WhatsApp
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
