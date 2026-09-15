import Seo from "../components/Seo";
import { ADDRESS } from "../lib/constants";

export default function About() {
    return (
        <div>
            <Seo title="Il Club" description="La storia del Glitz Club, il tempio all'aperto delle notti calabresi. 2000 posti, arco iconico a LED, vista sull'Isola di Dino." />
            <section className="relative min-h-[60vh] overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1692688197926-08d634e6db6f?crop=entropy&cs=srgb&fm=jpg&q=85&w=2000"
                    alt="Drone tramonto San Nicola Arcella"
                    className="absolute inset-0 w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/60 to-transparent" />
                <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-24">
                    <span className="overline-tag">Il Club</span>
                    <h1 data-testid="about-title" className="section-title mt-4">Duemila posti<br />sotto le stelle</h1>
                </div>
            </section>

            <section className="max-w-4xl mx-auto px-4 sm:px-6 py-16 space-y-8">
                <p className="text-xl text-white/80 leading-relaxed">
                    Il Glitz Club è nato con un'idea semplice: portare in Calabria la magia dei grandi club balearici. All'aperto, sul mare, con una produzione visiva e sonora al livello dei migliori festival internazionali.
                </p>
                <div className="grid sm:grid-cols-3 gap-6 py-4">
                    <div className="glass-card rounded-xl p-6 text-center">
                        <div className="text-5xl font-black text-lava">2000</div>
                        <div className="text-xs uppercase tracking-widest text-white/60 mt-2">Posti all'aperto</div>
                    </div>
                    <div className="glass-card rounded-xl p-6 text-center">
                        <div className="text-5xl font-black text-lava">24</div>
                        <div className="text-xs uppercase tracking-widest text-white/60 mt-2">Fari motorizzati</div>
                    </div>
                    <div className="glass-card rounded-xl p-6 text-center">
                        <div className="text-5xl font-black text-lava">01</div>
                        <div className="text-xs uppercase tracking-widest text-white/60 mt-2">Arco iconico LED</div>
                    </div>
                </div>
                <h2 className="text-2xl font-bold uppercase tracking-tight">La location</h2>
                <p className="text-white/70 leading-relaxed">
                    {ADDRESS}. Un anfiteatro naturale affacciato sull'Isola di Dino, dove ogni tramonto è uno spettacolo e ogni notte si trasforma in un racconto cinematografico. Il nostro arco iconico a LED è diventato negli anni il simbolo delle estati del sud Italia.
                </p>
                <h2 className="text-2xl font-bold uppercase tracking-tight">L'esperienza</h2>
                <p className="text-white/70 leading-relaxed">
                    Line-up curata, sistema audio d+b, laser mapping, ospiti internazionali. Ma soprattutto — persone. Il Glitz è un rito collettivo, un punto d'incontro che unisce turisti e locals nella stessa unica notte.
                </p>
            </section>
        </div>
    );
}
