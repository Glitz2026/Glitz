import { useState } from "react";
import { X, MessageCircle, Send, Loader2 } from "lucide-react";
import { api } from "../lib/api";
import { WHATSAPP_NUMBER } from "../lib/constants";
import { toast } from "sonner";

export default function BookingModal({
    open,
    onClose,
    eventTitle = "",
    eventId = "",
    tableNumber = "",
    zone = "",
}) {
    const [form, setForm] = useState({ name: "", phone: "", email: "", guests: 2, note: "" });
    const [loading, setLoading] = useState(false);

    if (!open) return null;

    const submit = async (e) => {
        e.preventDefault();
        if (!form.name || !form.phone) {
            toast.error("Compila nome e telefono");
            return;
        }
        setLoading(true);
        try {
            await api.post("/bookings", {
                ...form,
                guests: Number(form.guests) || 2,
                email: form.email || null,
                event_id: eventId || null,
                event_title: eventTitle || null,
                table_number: tableNumber || null,
                zone: zone || null,
            });
            toast.success("Richiesta inviata! Ti confermiamo su WhatsApp");

            const msgLines = [
                `Ciao Glitz! Sono ${form.name}, vorrei prenotare un tavolo.`,
                eventTitle && `Serata: ${eventTitle}`,
                tableNumber && `Tavolo: #${tableNumber} (${zone})`,
                `Ospiti: ${form.guests}`,
                `Telefono: ${form.phone}`,
                form.note && `Note: ${form.note}`,
            ].filter(Boolean);
            const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msgLines.join("\n"))}`;
            window.open(url, "_blank");
            onClose();
            setForm({ name: "", phone: "", email: "", guests: 2, note: "" });
        } catch (err) {
            toast.error("Errore. Riprova.");
        } finally {
            setLoading(false);
        }
    };

    const input = "w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-lava transition";

    return (
        <div
            data-testid="booking-modal"
            className="fixed inset-0 z-[80] bg-obsidian/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={onClose}
        >
            <div
                className="glass-card rounded-2xl p-6 sm:p-8 max-w-lg w-full relative max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    data-testid="booking-modal-close"
                    className="absolute top-4 right-4 text-white/60 hover:text-white"
                    aria-label="Chiudi"
                >
                    <X className="w-6 h-6" />
                </button>

                <div className="space-y-2 mb-6">
                    <div className="text-xs uppercase tracking-widest text-lava font-bold">Prenota Tavolo</div>
                    <h3 className="text-2xl sm:text-3xl font-black">
                        {tableNumber ? `Tavolo #${tableNumber}` : "Richiesta Tavolo"}
                    </h3>
                    {eventTitle && <p className="text-white/60 text-sm">Serata: <span className="text-white">{eventTitle}</span></p>}
                    {zone && <p className="text-white/60 text-sm">Zona: <span className="text-white">{zone}</span></p>}
                </div>

                <form onSubmit={submit} className="space-y-3">
                    <div>
                        <label className="text-xs uppercase tracking-widest text-white/60 block mb-1.5">Nome e Cognome *</label>
                        <input
                            data-testid="booking-name"
                            type="text"
                            required
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className={input}
                            placeholder="Mario Rossi"
                        />
                    </div>
                    <div>
                        <label className="text-xs uppercase tracking-widest text-white/60 block mb-1.5">Telefono / WhatsApp *</label>
                        <input
                            data-testid="booking-phone"
                            type="tel"
                            required
                            value={form.phone}
                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                            className={input}
                            placeholder="+39 333 1234567"
                        />
                    </div>
                    <div>
                        <label className="text-xs uppercase tracking-widest text-white/60 block mb-1.5">Email (facoltativa)</label>
                        <input
                            data-testid="booking-email"
                            type="email"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            className={input}
                            placeholder="mario@email.it"
                        />
                    </div>
                    <div>
                        <label className="text-xs uppercase tracking-widest text-white/60 block mb-1.5">Ospiti</label>
                        <input
                            data-testid="booking-guests"
                            type="number"
                            min="1"
                            max="30"
                            value={form.guests}
                            onChange={(e) => setForm({ ...form, guests: e.target.value })}
                            className={input}
                        />
                    </div>
                    <div>
                        <label className="text-xs uppercase tracking-widest text-white/60 block mb-1.5">Note (facoltative)</label>
                        <textarea
                            data-testid="booking-note"
                            rows="3"
                            value={form.note}
                            onChange={(e) => setForm({ ...form, note: e.target.value })}
                            className={input}
                            placeholder="Compleanno, allergie, richieste particolari..."
                        />
                    </div>
                    <button
                        type="submit"
                        data-testid="booking-submit"
                        disabled={loading}
                        className="btn-lava w-full disabled:opacity-50 mt-2"
                    >
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <MessageCircle className="w-4 h-4" />}
                        {loading ? "Invio..." : "Invia richiesta + WhatsApp"}
                    </button>
                    <p className="text-[11px] text-white/40 text-center leading-relaxed">
                        Salviamo la richiesta e apriamo WhatsApp per conferma diretta. Nessuno spam.
                    </p>
                </form>
            </div>
        </div>
    );
}
