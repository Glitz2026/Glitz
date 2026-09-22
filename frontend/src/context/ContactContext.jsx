import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../lib/api";
import { WHATSAPP_NUMBER, WHATSAPP_DISPLAY, EMAIL, INSTAGRAM, TIKTOK, ADDRESS } from "../lib/constants";

const DEFAULTS = {
    whatsappNumber: WHATSAPP_NUMBER,
    whatsappDisplay: WHATSAPP_DISPLAY,
    email: EMAIL,
    instagram: INSTAGRAM,
    tiktok: TIKTOK,
    address: ADDRESS,
};

const ContactCtx = createContext(DEFAULTS);

// Single source of truth for contact info shown across the site (header, footer,
// booking/order WhatsApp links...). Reads the same settings.contact_* fields the
// admin panel already edits on /contatti, so changing a number or email there
// actually updates it everywhere instead of only on the Contact page.
export function ContactProvider({ children }) {
    const [contact, setContact] = useState(DEFAULTS);

    useEffect(() => {
        api.get("/settings").then((r) => {
            const s = r.data || {};
            setContact({
                whatsappNumber: s.contact_whatsapp_number || DEFAULTS.whatsappNumber,
                whatsappDisplay: s.contact_whatsapp_display || DEFAULTS.whatsappDisplay,
                email: s.contact_email || DEFAULTS.email,
                instagram: s.contact_instagram || DEFAULTS.instagram,
                tiktok: DEFAULTS.tiktok,
                address: s.contact_address || DEFAULTS.address,
            });
        }).catch(() => {});
    }, []);

    return <ContactCtx.Provider value={contact}>{children}</ContactCtx.Provider>;
}

export function useContact() {
    return useContext(ContactCtx);
}
