import { createContext, useContext, useState, useCallback, useMemo } from "react";
import { STRINGS } from "../lib/i18n";

const LangCtx = createContext(null);
const STORAGE_KEY = "glitz_lang";

function loadLang() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved === "it" || saved === "en") return saved;
    } catch { /* ignore */ }
    return "it";
}

export function LanguageProvider({ children }) {
    const [lang, setLangState] = useState(loadLang);

    const setLang = useCallback((next) => {
        setLangState(next);
        try { localStorage.setItem(STORAGE_KEY, next); } catch { /* ignore */ }
    }, []);

    const t = useCallback((key) => STRINGS[lang]?.[key] ?? STRINGS.it[key] ?? key, [lang]);

    const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);

    return <LangCtx.Provider value={value}>{children}</LangCtx.Provider>;
}

export function useLanguage() {
    const ctx = useContext(LangCtx);
    if (!ctx) throw new Error("useLanguage must be inside LanguageProvider");
    return ctx;
}
