export const WHATSAPP_NUMBER = "393444289232";
export const WHATSAPP_DISPLAY = "344 4289232";
export const INSTAGRAM = "https://instagram.com/glitzclubofficial";
export const TIKTOK = "https://tiktok.com/@glitzclubofficial";
export const EMAIL = "glitzclubofficial@gmail.com";
export const ADDRESS = "Contrada Dino, San Nicola Arcella (CS), 87020";
export const ADDRESS_SHORT = "San Nicola Arcella (CS)";

export function whatsappTableLink(eventTitle) {
    const msg = encodeURIComponent(
        `Ciao Glitz! Vorrei prenotare un tavolo${eventTitle ? ` per la serata: ${eventTitle}` : ""}. Nome: `
    );
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
}

export function whatsappInfoLink() {
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Ciao Glitz, avrei un'informazione da chiedere.")}`;
}

export function formatItalianDate(iso) {
    if (!iso) return "";
    try {
        const d = new Date(iso);
        return d.toLocaleDateString("it-IT", { day: "2-digit", month: "long", year: "numeric" });
    } catch { return iso; }
}

export function formatItalianDateTime(iso) {
    if (!iso) return "";
    try {
        const d = new Date(iso);
        return d.toLocaleDateString("it-IT", { day: "2-digit", month: "short", year: "numeric" }) +
            " • " + d.toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit" });
    } catch { return iso; }
}
