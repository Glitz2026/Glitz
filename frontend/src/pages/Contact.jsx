import { useEffect, useState } from "react";
import { MapPin, MessageCircle, Mail, Instagram, Clock } from "lucide-react";
import { api } from "../lib/api";
import Seo from "../components/Seo";

export default function Contact() {
    const [s, setS] = useState(null);
    useEffect(() => {
        api.get("/settings").then((r) => setS(r.data)).catch(() => {});
    }, []);

    const wa = s?.contact_whatsapp_number || "393444289232";
    const waDisplay = s?.contact_whatsapp_display || "344 4289232";
    const email = s?.contact_email || "glitzclubofficial@gmail.com";
    const instagram = s?.contact_instagram || "https://instagram.com/glitzclubofficial";
    const instaHandle = s?.contact_instagram_handle || "@glitzclubofficial";
    const address = s?.contact_address || "Contrada Dino, San Nicola Arcella (CS), 87020";
    const hours = s?.contact_hours || "Aperto solo la sera, dal giovedì alla domenica\nGiugno – Settembre · 22:00 – 05:00";
    const mapUrl = s?.contact_map_embed_url || "https://www.google.com/maps?q=San+Nicola+Arcella+Contrada+Dino&output=embed";
    const waLink = `https://wa.me/${wa}?text=${encodeURIComponent("Ciao Glitz, avrei un'informazione da chiedere.")}`;

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
            <Seo title="Contatti" description={`Glitz Club — Contatti. WhatsApp ${waDisplay}, email ${email}, ${address}.`} />
            <div className="mb-12 space-y-3 text-center">
                <span className="overline-tag">{s?.contact_kicker || "Contatti"}</span>
                <h1 data-testid="contact-title" className="section-title">{s?.contact_title || "Scrivici"}</h1>
            </div>
            <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
                <div className="space-y-6">
                    <a href={waLink} target="_blank" rel="noreferrer" data-testid="contact-whatsapp" className="glass-card rounded-2xl p-6 flex items-center gap-4 hover:border-lava/40 transition group">
                        <div className="w-12 h-12 rounded-full bg-lava/20 flex items-center justify-center group-hover:bg-lava/30">
                            <MessageCircle className="w-6 h-6 text-lava" />
                        </div>
                        <div>
                            <div className="text-xs uppercase tracking-widest text-white/50">WhatsApp</div>
                            <div className="text-lg font-bold text-white">{waDisplay}</div>
                        </div>
                    </a>
                    <a href={`mailto:${email}`} data-testid="contact-email" className="glass-card rounded-2xl p-6 flex items-center gap-4 hover:border-lava/40 transition group">
                        <div className="w-12 h-12 rounded-full bg-lava/20 flex items-center justify-center group-hover:bg-lava/30">
                            <Mail className="w-6 h-6 text-lava" />
                        </div>
                        <div>
                            <div className="text-xs uppercase tracking-widest text-white/50">Email</div>
                            <div className="text-lg font-bold text-white">{email}</div>
                        </div>
                    </a>
                    <a href={instagram} target="_blank" rel="noreferrer" data-testid="contact-instagram" className="glass-card rounded-2xl p-6 flex items-center gap-4 hover:border-lava/40 transition group">
                        <div className="w-12 h-12 rounded-full bg-lava/20 flex items-center justify-center group-hover:bg-lava/30">
                            <Instagram className="w-6 h-6 text-lava" />
                        </div>
                        <div>
                            <div className="text-xs uppercase tracking-widest text-white/50">Instagram / TikTok</div>
                            <div className="text-lg font-bold text-white">{instaHandle}</div>
                        </div>
                    </a>
                    <div data-testid="contact-hours" className="glass-card rounded-2xl p-6 flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-lava/20 flex items-center justify-center flex-shrink-0">
                            <Clock className="w-6 h-6 text-lava" />
                        </div>
                        <div>
                            <div className="text-xs uppercase tracking-widest text-white/50">Orari</div>
                            <div className="text-base text-white/90 whitespace-pre-line">{hours}</div>
                        </div>
                    </div>
                    <div data-testid="contact-address" className="glass-card rounded-2xl p-6 flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-lava/20 flex items-center justify-center flex-shrink-0">
                            <MapPin className="w-6 h-6 text-lava" />
                        </div>
                        <div>
                            <div className="text-xs uppercase tracking-widest text-white/50">Indirizzo</div>
                            <div className="text-lg font-bold text-white">{address}</div>
                        </div>
                    </div>
                </div>
                <div className="rounded-2xl overflow-hidden border border-white/10 min-h-[500px]">
                    <iframe
                        title="Mappa Glitz Club San Nicola Arcella"
                        data-testid="contact-map"
                        src={mapUrl}
                        className="w-full h-full min-h-[500px] border-0 grayscale contrast-125"
                        loading="lazy"
                        allowFullScreen
                    />
                </div>
            </div>
        </div>
    );
}
