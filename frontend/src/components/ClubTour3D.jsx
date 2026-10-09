import { useState } from "react";
import { Box } from "lucide-react";

// Tour 3D del club in home: stessa mappa della prenotazione tavoli, in modalità "tour"
// (bar, privé, palco e servizi). Si carica solo al tocco: il modello pesa ~1,6 MB e,
// una volta attivo, cattura i gesti di scorrimento.
export default function ClubTour3D() {
    const [active, setActive] = useState(false);
    const [loaded, setLoaded] = useState(false);

    return (
        <section data-testid="club-3d-section" className="py-24 px-4 sm:px-6 max-w-7xl mx-auto">
            <div className="space-y-3 mb-10">
                <span className="overline-tag">Mappa 3D</span>
                <h2 className="section-title">Esplora<br /><span className="text-lava">Il Club</span></h2>
                <p className="text-white/70 text-lg leading-relaxed max-w-2xl">
                    Ruota e ingrandisci il Glitz: trova i bar, i privé, il palco, la pista e i servizi prima ancora di arrivare.
                </p>
            </div>
            <div className="relative w-full rounded-2xl overflow-hidden border border-white/10 bg-black h-[70vh] min-h-[420px] max-h-[760px]">
                {active ? (
                    <>
                        {!loaded && (
                            <p role="status" className="absolute inset-0 grid place-items-center text-sm uppercase tracking-widest text-white/70">
                                Caricamento del club in 3D…
                            </p>
                        )}
                        <iframe
                            src="/glitz-interattivo.html?embedded=1&tour=1&v=21"
                            title="Mappa 3D del Glitz Club: bar, privé e servizi"
                            onLoad={() => setLoaded(true)}
                            className="relative w-full h-full"
                        />
                    </>
                ) : (
                    <button
                        type="button"
                        data-testid="club-3d-start"
                        onClick={() => setActive(true)}
                        className="group absolute inset-0 w-full h-full"
                    >
                        <img src="/club-3d-poster.jpg" alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-[1.02] transition duration-700" />
                        <span className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-obsidian/30 to-transparent" />
                        <span className="btn-lava">
                            <Box className="w-4 h-4" /> Esplora il club in 3D
                        </span>
                    </button>
                )}
            </div>
        </section>
    );
}
