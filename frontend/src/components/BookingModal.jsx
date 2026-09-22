import { useState } from "react";
import { X, MessageCircle, Send, Loader2, Wine, CircleDollarSign } from "lucide-react";
import { api } from "../lib/api";
import { WHATSAPP_NUMBER } from "../lib/constants";
import { useLanguage } from "../context/LanguageContext";
import { toast } from "sonner";

export default function BookingModal({
    open,
    onClose,
    eventTitle = "",
    eventId = "",
    tableNumber = "",
    zone = "",
    zoneInfo = null,
}) {
    const { t } = useLanguage();
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
                    <div className="text-xs uppercase tracking-widest text-lava font-bold">{t("booking_title")}</div>
                    <h3 className="text-2xl sm:text-3xl font-black">
                        {tableNumber ? `${t("booking_table")} #${tableNumber}` : t("booking_request_title")}
                    </h3>
                    {eventTitle && <p className="text-white/60 text-sm">{t("booking_night")}: <span className="text-white">{eventTitle}</span></p>}
                    {zone && <p className="text-white/60 text-sm">{t("booking_zone")}: <span className="text-white">{zone}</span></p>}
                </div>

                {zoneInfo && (zoneInfo.price_from || zoneInfo.bottles || zoneInfo.description) && (
                    <div data-testid="booking-zone-info" className="rounded-xl border border-white/10 bg-black/30 p-4 mb-5 space-y-2">
                        {zoneInfo.price_from && (
                            <div className="flex items-center gap-2 text-sm text-white/90">
                                <CircleDollarSign className="w-4 h-4 text-lava" />
                                <span className="font-bold">{t("floorplan_from")} {zoneInfo.price_from}</span>
                                {zoneInfo.min_spend && <span className="text-white/50 text-xs">· {zoneInfo.min_spend}</span>}
                            </div>
                        )}
                        {zoneInfo.bottles && (
                            <div className="flex items-center gap-2 text-sm text-white/80">
                                <Wine className="w-4 h-4 text-lava" /> {zoneInfo.bottles}
                            </div>
                        )}
                        {zoneInfo.description && (
                            <p className="text-xs text-white/50 leading-relaxed pt-1">{zoneInfo.description}</p>
                        )}
                        {zoneInfo.bottle_menu?.length > 0 && (
                            <div data-testid="booking-zone-bottle-menu" className="pt-2 mt-1 border-t border-white/10 space-y-1">
                                <div className="text-[10px] uppercase tracking-widest text-white/40">{t("floorplan_bottle_menu")}</div>
                                {zoneInfo.bottle_menu.map((bm, i) => (
                                    <div key={i} className="flex items-center justify-between text-xs text-white/70">
                                        <span>{bm.name}</span>
                                        <span className="font-bold text-white">{bm.price}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                <form onSubmit={submit} className="space-y-3">
                    <div>
                        <label className="text-xs uppercase tracking-widest text-white/60 block mb-1.5">{t("booking_name")} *</label>
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
                        <label className="text-xs uppercase tracking-widest text-white/60 block mb-1.5">{t("booking_phone")} *</label>
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
                        <label className="text-xs uppercase tracking-widest text-white/60 block mb-1.5">{t("booking_email")}</label>
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
                        <label className="text-xs uppercase tracking-widest text-white/60 block mb-1.5">{t("booking_guests")}</label>
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
                        <label className="text-xs uppercase tracking-widest text-white/60 block mb-1.5">{t("booking_note")}</label>
                        <textarea
                            data-testid="booking-note"
                            rows="3"
                            value={form.note}
                            onChange={(e) => setForm({ ...form, note: e.target.value })}
                            className={input}
                            placeholder={t("booking_note_placeholder")}
                        />
                    </div>
                    <button
                        type="submit"
                        data-testid="booking-submit"
                        disabled={loading}
                        className="btn-lava w-full disabled:opacity-50 mt-2"
                    >
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <MessageCircle className="w-4 h-4" />}
                        {loading ? t("booking_sending") : t("booking_submit")}
                    </button>
                    <p className="text-[11px] text-white/40 text-center leading-relaxed">
                        {t("booking_disclaimer")}
                    </p>
                </form>
            </div>
        </div>
    );
}
