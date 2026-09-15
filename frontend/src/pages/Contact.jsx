import { MapPin, MessageCircle, Mail, Instagram } from "lucide-react";
import { WHATSAPP_DISPLAY, EMAIL, INSTAGRAM, TIKTOK, ADDRESS, whatsappInfoLink } from "../lib/constants";
import Seo from "../components/Seo";

export default function Contact() {
    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
            <Seo title="Contatti" description="Glitz Club — Contatti. WhatsApp 344 4289232, email glitzclubofficial@gmail.com, San Nicola Arcella (CS)." />
            <div className="mb-12 space-y-3">
                <span className="overline-tag">Contatti</span>
                <h1 className="section-title">Scrivici</h1>
            </div>
            <div className="grid lg:grid-cols-2 gap-12">
                <div className="space-y-6">
                    <a
                        href={whatsappInfoLink()}
                        target="_blank"
                        rel="noreferrer"
                        data-testid="contact-whatsapp"
                        className="glass-card rounded-2xl p-6 flex items-center gap-4 hover:border-lava/40 transition group"
                    >
                        <div className="w-12 h-12 rounded-full bg-lava/20 flex items-center justify-center group-hover:bg-lava/30">
                            <MessageCircle className="w-6 h-6 text-lava" />
                        </div>
                        <div>
                            <div className="text-xs uppercase tracking-widest text-white/50">WhatsApp</div>
                            <div className="text-lg font-bold text-white">{WHATSAPP_DISPLAY}</div>
                        </div>
                    </a>
                    <a
                        href={`mailto:${EMAIL}`}
                        data-testid="contact-email"
                        className="glass-card rounded-2xl p-6 flex items-center gap-4 hover:border-lava/40 transition group"
                    >
                        <div className="w-12 h-12 rounded-full bg-lava/20 flex items-center justify-center group-hover:bg-lava/30">
                            <Mail className="w-6 h-6 text-lava" />
                        </div>
                        <div>
                            <div className="text-xs uppercase tracking-widest text-white/50">Email</div>
                            <div className="text-lg font-bold text-white">{EMAIL}</div>
                        </div>
                    </a>
                    <a
                        href={INSTAGRAM}
                        target="_blank"
                        rel="noreferrer"
                        data-testid="contact-instagram"
                        className="glass-card rounded-2xl p-6 flex items-center gap-4 hover:border-lava/40 transition group"
                    >
                        <div className="w-12 h-12 rounded-full bg-lava/20 flex items-center justify-center group-hover:bg-lava/30">
                            <Instagram className="w-6 h-6 text-lava" />
                        </div>
                        <div>
                            <div className="text-xs uppercase tracking-widest text-white/50">Instagram / TikTok</div>
                            <div className="text-lg font-bold text-white">@glitzclubofficial</div>
                        </div>
                    </a>
                    <div className="glass-card rounded-2xl p-6 flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-lava/20 flex items-center justify-center flex-shrink-0">
                            <MapPin className="w-6 h-6 text-lava" />
                        </div>
                        <div>
                            <div className="text-xs uppercase tracking-widest text-white/50">Indirizzo</div>
                            <div className="text-lg font-bold text-white">{ADDRESS}</div>
                        </div>
                    </div>
                </div>
                <div className="rounded-2xl overflow-hidden border border-white/10 min-h-[500px]">
                    <iframe
                        title="Mappa Glitz Club San Nicola Arcella"
                        data-testid="contact-map"
                        src="https://www.google.com/maps?q=San+Nicola+Arcella+Contrada+Dino&output=embed"
                        className="w-full h-full min-h-[500px] border-0 grayscale contrast-125"
                        loading="lazy"
                        allowFullScreen
                    />
                </div>
            </div>
        </div>
    );
}
