/**
 * PosterFrame — Template locandina in stile Glitz Club ufficiale.
 * Compone sopra la foto artista: marmo nero, logo GLITZ CLUB, data (SABATO + gg mese),
 * mirror ghost sui lati, nome artista in stampatello, opening lineup, sponsor.
 *
 * Props:
 *   artistPhoto: URL foto artista (portrait recommended)
 *   artistName: es. "DAMANTE"
 *   dateDay: es. "12"
 *   dateMonth: es. "AGOSTO"
 *   dayLabel: es. "SABATO" | "VENERDÌ"
 *   time: es. "23.30"
 *   opening: es. "PATER G | WONIK | MAURO MILANO"
 *   accent: "red" | "purple" | "blue" (rim light + date color)
 */

const ACCENTS = {
    red: { rim: "rgba(225,6,0,0.35)", date: "text-lava" },
    purple: { rim: "rgba(138,43,226,0.35)", date: "text-purple-300" },
    blue: { rim: "rgba(0,191,255,0.35)", date: "text-sky-300" },
    warm: { rim: "rgba(255,140,80,0.28)", date: "text-orange-200" },
    neutral: { rim: "rgba(255,255,255,0.15)", date: "text-white" },
};

export default function PosterFrame({
    artistPhoto,
    artistName = "ARTIST",
    dateDay = "01",
    dateMonth = "LUGLIO",
    dayLabel = "SABATO",
    time = "23.30",
    location = "SAN NICOLA ARCELLA",
    opening,
    accent = "neutral",
    small = false,
}) {
    const A = ACCENTS[accent] || ACCENTS.neutral;
    return (
        <div
            data-testid="poster-frame"
            className="relative aspect-[4/5] w-full overflow-hidden rounded-lg bg-black select-none"
            style={{
                backgroundImage:
                    "radial-gradient(120% 90% at 50% 50%, #1a1a1a 0%, #0a0a0a 55%, #000 100%)",
            }}
        >
            {/* Marble scratch/noise texture */}
            <div
                className="absolute inset-0 opacity-40 mix-blend-screen pointer-events-none"
                style={{
                    backgroundImage:
                        "url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22400%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%223%22/><feColorMatrix values=%220 0 0 0 0.9  0 0 0 0 0.9  0 0 0 0 0.95  0 0 0 0.35 0%22/></filter><rect width=%22400%22 height=%22400%22 filter=%22url(%23n)%22/></svg>')",
                }}
            />
            {/* Marble cracks */}
            <div
                className="absolute inset-0 opacity-25 mix-blend-screen pointer-events-none"
                style={{
                    backgroundImage:
                        "linear-gradient(120deg, transparent 40%, rgba(255,255,255,0.06) 42%, transparent 44%), linear-gradient(-30deg, transparent 60%, rgba(255,255,255,0.04) 61%, transparent 63%)",
                }}
            />

            {/* Rim light glow (accent color) */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: `radial-gradient(60% 40% at 50% 55%, ${A.rim} 0%, transparent 70%)`,
                }}
            />

            {/* Mirror ghost sides */}
            {artistPhoto && (
                <>
                    <div className="absolute inset-y-[8%] left-[-8%] w-[40%] opacity-30 blur-[2px] mix-blend-screen">
                        <img
                            src={artistPhoto}
                            alt=""
                            className="w-full h-full object-cover"
                            style={{ transform: "scaleX(-1)", filter: "brightness(0.7)" }}
                        />
                    </div>
                    <div className="absolute inset-y-[8%] right-[-8%] w-[40%] opacity-30 blur-[2px] mix-blend-screen">
                        <img
                            src={artistPhoto}
                            alt=""
                            className="w-full h-full object-cover"
                            style={{ filter: "brightness(0.7)" }}
                        />
                    </div>
                </>
            )}

            {/* Main artist center */}
            {artistPhoto && (
                <div className="absolute inset-x-[18%] inset-y-[16%] w-[64%] h-[68%]">
                    <img
                        src={artistPhoto}
                        alt={artistName}
                        className="w-full h-full object-cover"
                        style={{
                            maskImage: "linear-gradient(180deg, transparent 0%, black 12%, black 85%, transparent 100%)",
                            WebkitMaskImage: "linear-gradient(180deg, transparent 0%, black 12%, black 85%, transparent 100%)",
                        }}
                    />
                </div>
            )}

            {/* TOP: Glitz Club logo (SVG text approx) */}
            <div className="absolute top-[4%] left-0 right-0 text-center">
                <div
                    className="inline-block font-editorial text-white text-[8%] leading-none"
                    style={{ fontWeight: 300, letterSpacing: "0.12em", fontSize: small ? "1.5rem" : "2rem" }}
                >
                    GLITZ
                </div>
                <div
                    className="text-white/70"
                    style={{ fontSize: small ? "0.5rem" : "0.65rem", letterSpacing: "0.4em", marginTop: "2px" }}
                >
                    CLUB
                </div>
            </div>

            {/* DATE block */}
            <div className="absolute top-[18%] left-0 right-0 text-center px-6">
                <div className="text-white text-[10px] sm:text-xs font-black uppercase tracking-[0.35em]">{dayLabel}</div>
                <div className={`font-black uppercase leading-[0.95] tracking-tight ${A.date}`} style={{ fontSize: small ? "1.75rem" : "2.5rem" }}>
                    {dateDay} {dateMonth}
                </div>
                <div className="text-white/80 text-[9px] sm:text-[10px] uppercase tracking-[0.25em] mt-1.5 flex items-center justify-center gap-3">
                    <span>{location}</span>
                    <span className="opacity-40">·</span>
                    <span>{time} P.M.</span>
                </div>
            </div>

            {/* BOTTOM: Artist name */}
            <div className="absolute bottom-[13%] left-0 right-0 text-center px-3">
                <div
                    className="text-white font-black uppercase leading-[0.9] tracking-[-0.02em] italic"
                    style={{ fontSize: small ? "2.2rem" : "3.2rem", fontStyle: "italic", textShadow: "0 4px 30px rgba(0,0,0,0.6)" }}
                >
                    {artistName}
                </div>
                {opening && (
                    <div className="mt-2.5">
                        <div className="text-white/80 text-[9px] sm:text-[10px] uppercase tracking-[0.35em] font-black">OPENING</div>
                        <div className="text-white text-[10px] sm:text-xs uppercase tracking-widest mt-0.5 font-semibold">{opening}</div>
                    </div>
                )}
            </div>

            {/* Sponsor bar */}
            <div className="absolute bottom-[3%] left-0 right-0 flex items-center justify-center gap-2 sm:gap-3 text-white/55 uppercase" style={{ fontSize: small ? "6px" : "8px", letterSpacing: "0.15em" }}>
                <span>TicketSms</span>
                <span className="opacity-40">·</span>
                <span>Organics by Red Bull</span>
                <span className="opacity-40">·</span>
                <span>Campari</span>
                <span className="opacity-40">·</span>
                <span>Bulldog Gin</span>
            </div>

            {/* Fine grain overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-30 mix-blend-overlay" style={{
                background: "repeating-linear-gradient(0deg, rgba(255,255,255,0.02) 0 1px, transparent 1px 3px)",
            }} />
        </div>
    );
}
