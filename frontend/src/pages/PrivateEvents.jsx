import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Users, Calendar, Wine, Loader2, CheckCircle2, MapPin } from "lucide-react";
import { api } from "../lib/api";
import { toast } from "sonner";
import Seo from "../components/Seo";

const ICON_MAP = { sparkles: Sparkles, mappin: MapPin, users: Users, wine: Wine, calendar: Calendar };

const DEFAULT_AREAS = [
    { id: "full", label: "Tutto il club", subtitle: "Fino a 2000 persone · esclusiva totale", icon: "sparkles" },
    { id: "riva-deck", label: "Riva Deck", subtitle: "Fino a 200 persone · vista mare", icon: "mappin" },
    { id: "back-stage", label: "Back the Stage", subtitle: "Fino a 300 persone · privé filo pista", icon: "users" },
    { id: "glitz-bar", label: "Glitz Bar", subtitle: "Fino a 150 persone · zona lounge", icon: "wine" },
    { id: "custom", label: "Da concordare", subtitle: "Setup su misura per il tuo evento", icon: "calendar" },
];
const DEFAULT_OCCASIONS = ["Compleanno", "Addio al celibato/nubilato", "Matrimonio / after-party", "Aziendale / corporate", "Lancio prodotto", "Cena privata", "Altro"];
const DEFAULT_WHY_US = [
    { n: "01", title: "Location cinematografica", body: "Open-air sul Belvedere con vista Isola di Dino. Arco LED iconico, tramonto sul Tirreno." },
    { n: "02", title: "Macchina già rodata", body: "Event manager dedicato, staff formato, sound & light system professionale, catering partner premium." },
    { n: "03", title: "Flessibilità totale", body: "Da 50 a 2000 ospiti. Una zona, più zone o tutto il club in esclusiva. Personalizziamo tutto." },
];

export default function PrivateEvents() {
    const [settings, setSettings] = useState({});
    const [area, setArea] = useState("full");
    const [form, setForm] = useState({
        name: "", email: "", phone: "", event_date: "", guests: "", occasion: "Compleanno", budget: "", message: "",
    });
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);

    useEffect(() => {
        api.get("/settings").then((r) => setSettings(r.data || {})).catch(() => {});
    }, []);

    const AREA_OPTIONS = settings.private_areas && settings.private_areas.length ? settings.private_areas : DEFAULT_AREAS;
    const OCCASION_OPTIONS = settings.private_occasions && settings.private_occasions.length ? settings.private_occasions : DEFAULT_OCCASIONS;
    const WHY_US = settings.private_why_us && settings.private_why_us.length ? settings.private_why_us : DEFAULT_WHY_US;

    // Ensure first area is default selection
    useEffect(() => {
        if (AREA_OPTIONS.length && !AREA_OPTIONS.find((a) => a.id === area)) {
            setArea(AREA_OPTIONS[0].id);
        }
        if (OCCASION_OPTIONS.length && !OCCASION_OPTIONS.includes(form.occasion)) {
            setForm((f) => ({ ...f, occasion: OCCASION_OPTIONS[0] }));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [settings]);

    const submit = async (e) => {
        e.preventDefault();
        if (!form.name || !form.email || !form.phone || !form.event_date || !form.guests) {
            toast.error("Compila i campi obbligatori");
            return;
        }
        setLoading(true);
        try {
            await api.post("/private-events", { area, ...form, guests: parseInt(form.guests, 10) });
            setSent(true);
            toast.success("Richiesta inviata! Ti risponderemo entro 24h.");
        } catch {
            toast.error("Errore invio. Scrivici su WhatsApp.");
        } finally {
            setLoading(false);
        }
    };

    const input = "w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-lava transition";
    const heroWords = (settings.private_hero_line2 || "Evento");

    return (
        <div>
            <Seo title="Prenota il tuo Evento — Glitz Club" description={settings.private_hero_subtitle || "Eventi privati al Glitz Club: matrimoni, compleanni, aziendali, lanci prodotto."} />

            <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-12">
                <div className="space-y-4">
                    <span className="overline-tag">{settings.private_kicker || "Eventi Privati"}</span>
                    <h1 data-testid="private-title" className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-none">
                        {settings.private_hero_line1 || "Prenota il tuo"} <span className="bg-gradient-to-r from-lava to-sunset-pink bg-clip-text text-transparent">{heroWords}</span>
                    </h1>
                    <p className="text-white/60 max-w-2xl text-base sm:text-lg leading-relaxed">
                        {settings.private_hero_subtitle || "Il Glitz Club apre le sue quattro zone per il tuo evento privato."}
                    </p>
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-8">
                <h2 className="text-sm uppercase tracking-widest text-white/60 font-bold mb-4">Scegli l'area</h2>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                    {AREA_OPTIONS.map((a) => {
                        const Icon = ICON_MAP[a.icon] || Sparkles;
                        const active = area === a.id;
                        return (
                            <button
                                key={a.id}
                                data-testid={`area-${a.id}`}
                                onClick={() => setArea(a.id)}
                                className={`text-left p-4 rounded-2xl border transition ${active ? "border-lava bg-lava/10" : "border-white/10 bg-surface/40 hover:border-white/30"}`}
                            >
                                <Icon className={`w-5 h-5 mb-2 ${active ? "text-lava" : "text-white/70"}`} />
                                <div className="font-black uppercase tracking-tight text-sm">{a.label}</div>
                                <div className="text-[11px] text-white/50 mt-1 leading-relaxed">{a.subtitle}</div>
                            </button>
                        );
                    })}
                </div>
            </section>

            <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-24">
                {sent ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        className="glass-card rounded-2xl p-10 text-center space-y-4"
                    >
                        <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto" />
                        <h2 data-testid="private-success" className="text-2xl sm:text-3xl font-black uppercase tracking-tight">{settings.private_success_title || "Richiesta ricevuta!"}</h2>
                        <p className="text-white/70 max-w-md mx-auto">
                            {settings.private_success_body || "Il nostro event manager ti risponderà entro 24h con disponibilità, preventivo dettagliato e possibilità di sopralluogo."}
                        </p>
                        <a href="https://wa.me/393444289232?text=Ciao%20Glitz%2C%20ho%20appena%20inviato%20una%20richiesta%20per%20un%20evento%20privato." target="_blank" rel="noreferrer" className="btn-lava inline-flex">
                            Contattaci ora su WhatsApp
                        </a>
                    </motion.div>
                ) : (
                    <form onSubmit={submit} data-testid="private-form" className="glass-card rounded-2xl p-6 sm:p-10 space-y-5">
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div>
                                <label className="text-[11px] uppercase tracking-widest text-white/60 block mb-1.5">Nome e cognome *</label>
                                <input data-testid="pe-name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={input} />
                            </div>
                            <div>
                                <label className="text-[11px] uppercase tracking-widest text-white/60 block mb-1.5">Telefono *</label>
                                <input data-testid="pe-phone" required type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={input} />
                            </div>
                        </div>
                        <div>
                            <label className="text-[11px] uppercase tracking-widest text-white/60 block mb-1.5">Email *</label>
                            <input data-testid="pe-email" required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={input} />
                        </div>
                        <div className="grid gap-4 sm:grid-cols-3">
                            <div>
                                <label className="text-[11px] uppercase tracking-widest text-white/60 block mb-1.5">Data evento *</label>
                                <input data-testid="pe-date" required type="date" value={form.event_date} onChange={(e) => setForm({ ...form, event_date: e.target.value })} className={input} />
                            </div>
                            <div>
                                <label className="text-[11px] uppercase tracking-widest text-white/60 block mb-1.5">Numero ospiti *</label>
                                <input data-testid="pe-guests" required type="number" min="20" max="2000" value={form.guests} onChange={(e) => setForm({ ...form, guests: e.target.value })} placeholder="es. 150" className={input} />
                            </div>
                            <div>
                                <label className="text-[11px] uppercase tracking-widest text-white/60 block mb-1.5">Occasione</label>
                                <select data-testid="pe-occasion" value={form.occasion} onChange={(e) => setForm({ ...form, occasion: e.target.value })} className={input}>
                                    {OCCASION_OPTIONS.map((o) => <option key={o} value={o} className="bg-obsidian">{o}</option>)}
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="text-[11px] uppercase tracking-widest text-white/60 block mb-1.5">Budget indicativo</label>
                            <input data-testid="pe-budget" value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} placeholder="es. € 15.000 - 30.000" className={input} />
                        </div>
                        <div>
                            <label className="text-[11px] uppercase tracking-widest text-white/60 block mb-1.5">Descrivi il tuo evento</label>
                            <textarea data-testid="pe-message" rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Racconta cosa immagini: mood, timing, servizi (dj, catering, decorazioni, fotografo)…" className={input} />
                        </div>
                        <div className="flex items-center justify-between pt-4 border-t border-white/10">
                            <div className="text-xs text-white/50">
                                Ti risponderemo entro <span className="text-white font-bold">24h</span>
                            </div>
                            <button data-testid="pe-submit" type="submit" disabled={loading} className="btn-lava disabled:opacity-50">
                                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                                {loading ? "Invio…" : "Invia richiesta"}
                            </button>
                        </div>
                    </form>
                )}
            </section>

            <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-24">
                <div className="grid gap-6 sm:grid-cols-3">
                    {WHY_US.map((s) => (
                        <div key={s.n} className="space-y-2">
                            <div className="text-lava font-black text-3xl">{s.n}</div>
                            <div className="font-bold uppercase tracking-tight">{s.title}</div>
                            <p className="text-sm text-white/60 leading-relaxed">{s.body}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
