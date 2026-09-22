import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X, Instagram, MessageCircle, Mail, MapPin, LogIn, LogOut, User, Shield, ShoppingBag } from "lucide-react";
import { WHATSAPP_DISPLAY, EMAIL, INSTAGRAM, TIKTOK, ADDRESS, whatsappInfoLink } from "../lib/constants";
import { api } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useLanguage } from "../context/LanguageContext";
import Newsletter from "./Newsletter";

function resolveUrl(url) {
    if (!url) return "";
    if (url.startsWith("http")) return url;
    return `${process.env.REACT_APP_BACKEND_URL}${url}`;
}

const DEFAULT_NAV = [
    { to: "/", key: "nav_home" },
    { to: "/eventi", key: "nav_events" },
    { to: "/il-club", key: "nav_club" },
    { to: "/eventi/passati", key: "nav_archive" },
    { to: "/news", key: "nav_news" },
    { to: "/shop", key: "nav_shop" },
    { to: "/prenota-evento", key: "nav_private" },
    { to: "/contatti", key: "nav_contact" },
];

export default function Layout({ children }) {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [logoUrl, setLogoUrl] = useState("");
    const [settings, setSettings] = useState({});
    const loc = useLocation();
    const { user, logout } = useAuth();
    const { count: cartCount, setOpen: setCartOpen } = useCart();
    const { lang, setLang, t } = useLanguage();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll);
        api.get("/settings").then((r) => {
            setLogoUrl(resolveUrl(r.data?.logo_url || ""));
            setSettings(r.data || {});
        }).catch(() => {});
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => { setOpen(false); window.scrollTo(0, 0); }, [loc.pathname]);

    const NAV = (settings.nav_items && settings.nav_items.length
        ? settings.nav_items
        : DEFAULT_NAV.map((n) => ({ ...n, label: t(n.key) }))
    ).filter((n) => !n.hidden);

    return (
        <div className="min-h-screen bg-obsidian text-white">
            <header
                data-testid="site-header"
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-obsidian/85 backdrop-blur-xl border-b border-white/5" : "bg-transparent"}`}
            >
                <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-4">
                    <Link to="/" data-testid="site-logo-link" className="flex items-center gap-2 group">
                        {logoUrl ? (
                            <img src={logoUrl} alt="Glitz Club" className="h-14 sm:h-16 w-auto object-contain -my-2" />
                        ) : (
                            <>
                                <span className="text-2xl font-black tracking-[0.2em] font-display bg-gradient-to-r from-white via-lava to-sunset-pink bg-clip-text text-transparent group-hover:text-glow-lava transition">
                                    GLITZ
                                </span>
                                <span className="text-[10px] uppercase tracking-widest text-white/50 hidden sm:inline">Club Calabria</span>
                            </>
                        )}
                    </Link>
                    <nav className="hidden lg:flex items-center gap-8">
                        {NAV.map((n) => (
                            <NavLink
                                key={n.to}
                                to={n.to}
                                data-testid={`nav-${n.label.toLowerCase().replace(/\s/g, "-")}`}
                                className={({ isActive }) =>
                                    `text-sm uppercase tracking-widest font-semibold transition ${isActive ? "text-lava" : "text-white/70 hover:text-white"}`
                                }
                            >
                                {n.label}
                            </NavLink>
                        ))}
                        <span className="h-4 w-px bg-white/15" aria-hidden />
                        {user ? (
                            <div className="flex items-center gap-4">
                                <Link
                                    to="/account"
                                    data-testid="header-account-btn"
                                    className="flex items-center gap-2 text-sm uppercase tracking-widest font-semibold text-white/80 hover:text-white transition"
                                >
                                    {user.picture ? (
                                        <img src={user.picture} alt={user.name} className="w-6 h-6 rounded-full" />
                                    ) : (
                                        <User className="w-4 h-4" />
                                    )}
                                    <span className="max-w-[120px] truncate">{(user.name || user.email).split(" ")[0]}</span>
                                </Link>
                                {user.is_admin && (
                                    <Link
                                        to="/admin"
                                        data-testid="header-admin-dash"
                                        className="flex items-center gap-1 text-sm uppercase tracking-widest font-semibold text-white/70 hover:text-lava transition"
                                    >
                                        <Shield className="w-4 h-4" /> Admin
                                    </Link>
                                )}
                                <button
                                    onClick={logout}
                                    data-testid="header-logout-btn"
                                    className="flex items-center gap-1 text-sm uppercase tracking-widest font-semibold text-lava hover:text-lava/80 transition"
                                >
                                    <LogOut className="w-4 h-4" /> {t("header_logout")}
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-4">
                                <Link
                                    to="/accedi"
                                    data-testid="header-login-btn"
                                    className="flex items-center gap-2 text-sm uppercase tracking-widest font-semibold text-lava hover:text-lava/80 transition"
                                >
                                    <LogIn className="w-4 h-4" /> {t("header_login")}
                                </Link>
                                <Link
                                    to="/admin/login"
                                    data-testid="header-admin-link"
                                    className="flex items-center gap-1 text-sm uppercase tracking-widest font-semibold text-white/60 hover:text-white transition"
                                >
                                    <Shield className="w-4 h-4" /> {t("header_admin")}
                                </Link>
                            </div>
                        )}
                        <button
                            onClick={() => setLang(lang === "it" ? "en" : "it")}
                            data-testid="lang-toggle"
                            aria-label="Cambia lingua / Change language"
                            className="flex items-center gap-1 text-xs font-black tracking-widest text-white/50 hover:text-white border border-white/15 rounded-full px-2.5 py-1 transition"
                        >
                            {lang === "it" ? "EN" : "IT"}
                        </button>
                    </nav>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setCartOpen(true)}
                            data-testid="header-cart-btn"
                            aria-label="Carrello"
                            className="relative p-2 text-white/80 hover:text-white"
                        >
                            <ShoppingBag className="w-5 h-5" />
                            {cartCount > 0 && (
                                <span data-testid="header-cart-count" className="absolute -top-1 -right-1 bg-lava text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </button>
                        <a
                            href={whatsappInfoLink()}
                            target="_blank"
                            rel="noreferrer"
                            data-testid="header-whatsapp-btn"
                            className="hidden sm:inline-flex btn-lava !px-5 !py-2.5 !text-xs"
                        >
                            <MessageCircle className="w-4 h-4" /> WhatsApp
                        </a>
                        <button
                            data-testid="mobile-menu-toggle"
                            onClick={() => setOpen((o) => !o)}
                            className="lg:hidden p-2 text-white"
                            aria-label="Menu"
                        >
                            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
                {open && (
                    <div className="lg:hidden bg-obsidian/95 backdrop-blur-xl border-t border-white/10">
                        <nav className="flex flex-col p-6 gap-4">
                            {NAV.map((n) => (
                                <NavLink
                                    key={n.to}
                                    to={n.to}
                                    data-testid={`mobile-nav-${n.label.toLowerCase().replace(/\s/g, "-")}`}
                                    className={({ isActive }) =>
                                        `text-lg uppercase tracking-widest font-semibold transition ${isActive ? "text-lava" : "text-white/80"}`
                                    }
                                >
                                    {n.label}
                                </NavLink>
                            ))}
                            {user ? (
                                <>
                                    <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-3">
                                        {user.picture ? (
                                            <img src={user.picture} alt={user.name} className="w-8 h-8 rounded-full" />
                                        ) : (
                                            <User className="w-5 h-5 text-white/70" />
                                        )}
                                        <span className="text-sm uppercase tracking-widest text-white/80 font-semibold truncate">
                                            {(user.name || user.email).split(" ")[0]}
                                        </span>
                                    </div>
                                    <Link to="/account" data-testid="mobile-account" className="text-lg uppercase tracking-widest font-semibold text-white/80 flex items-center gap-2">
                                        <User className="w-4 h-4" /> Il mio account
                                    </Link>
                                    {user.is_admin && (
                                        <Link to="/admin" data-testid="mobile-admin-dash" className="text-lg uppercase tracking-widest font-semibold text-white/80 flex items-center gap-2">
                                            <Shield className="w-4 h-4" /> Dashboard Admin
                                        </Link>
                                    )}
                                    <button
                                        onClick={logout}
                                        data-testid="mobile-logout"
                                        className="text-lg uppercase tracking-widest font-semibold text-lava flex items-center gap-2 text-left"
                                    >
                                        <LogOut className="w-4 h-4" /> {t("header_logout")}
                                    </button>
                                </>
                            ) : (
                                <div className="mt-4 pt-4 border-t border-white/10 flex flex-col gap-4">
                                    <Link
                                        to="/accedi"
                                        data-testid="mobile-login"
                                        className="text-lg uppercase tracking-widest font-semibold text-lava flex items-center gap-2"
                                    >
                                        <LogIn className="w-4 h-4" /> {t("header_login")}
                                    </Link>
                                    <Link
                                        to="/admin/login"
                                        data-testid="mobile-admin-link"
                                        className="text-lg uppercase tracking-widest font-semibold text-white/60 flex items-center gap-2"
                                    >
                                        <Shield className="w-4 h-4" /> {t("header_admin")}
                                    </Link>
                                </div>
                            )}
                            <button
                                onClick={() => setLang(lang === "it" ? "en" : "it")}
                                data-testid="mobile-lang-toggle"
                                className="mt-2 self-start flex items-center gap-1 text-xs font-black tracking-widest text-white/50 hover:text-white border border-white/15 rounded-full px-3 py-1.5 transition"
                            >
                                {lang === "it" ? "English" : "Italiano"}
                            </button>
                        </nav>
                    </div>
                )}
            </header>

            <main className="pt-20">{children}</main>

            <footer data-testid="site-footer" className="mt-24 border-t border-white/10 bg-surface/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 grid gap-16 md:grid-cols-4">
                    <div className="md:col-span-2 space-y-8">
                        {logoUrl ? (
                            <img src={logoUrl} alt="Glitz Club" className="h-14 w-auto object-contain" />
                        ) : (
                            <div className="text-3xl font-black tracking-[0.2em] font-display bg-gradient-to-r from-white via-lava to-sunset-pink bg-clip-text text-transparent">
                                GLITZ
                            </div>
                        )}
                        <Newsletter />
                    </div>
                    <div className="space-y-3 text-sm">
                        <h4 className="uppercase tracking-widest text-lava text-xs font-bold">{settings.footer_contact_title || "Contatti"}</h4>
                        <Link to="/#faq" data-testid="footer-faq-link" className="block text-white/70 hover:text-white transition">FAQ</Link>
                        <a href={`mailto:${EMAIL}`} data-testid="footer-email" className="flex items-center gap-2 text-white/70 hover:text-white transition">
                            <Mail className="w-4 h-4" /> {EMAIL}
                        </a>
                        <a href={whatsappInfoLink()} target="_blank" rel="noreferrer" data-testid="footer-whatsapp" className="flex items-center gap-2 text-white/70 hover:text-white transition">
                            <MessageCircle className="w-4 h-4" /> {WHATSAPP_DISPLAY}
                        </a>
                        <p className="flex items-start gap-2 text-white/70">
                            <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" /> {ADDRESS}
                        </p>
                    </div>
                    <div className="space-y-3 text-sm">
                        <h4 className="uppercase tracking-widest text-lava text-xs font-bold">{settings.footer_social_title || "Social"}</h4>
                        <div className="flex items-center gap-3">
                            <a href={INSTAGRAM} target="_blank" rel="noreferrer" aria-label="Instagram" data-testid="footer-instagram" className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/70 hover:text-white hover:border-lava transition">
                                <Instagram className="w-4 h-4" />
                            </a>
                            <a href={TIKTOK} target="_blank" rel="noreferrer" aria-label="TikTok" data-testid="footer-tiktok" className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/70 hover:text-white hover:border-lava transition">
                                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden><path d="M19.5 6.5a5.9 5.9 0 0 1-4-1.5V15a5 5 0 1 1-5-5v3a2 2 0 1 0 2 2V2h3a4 4 0 0 0 4 4v.5z"/></svg>
                            </a>
                        </div>
                        {settings.footer_tagline && (
                            <p className="text-white/50 text-xs pt-2 leading-relaxed">{settings.footer_tagline}</p>
                        )}
                    </div>
                </div>
                <div className="border-t border-white/5 py-6 text-center text-xs text-white/40">
                    © {new Date().getFullYear()} {settings.footer_copyright || "Glitz Club — Contrada Dino, San Nicola Arcella. Tutti i diritti riservati."}
                </div>
            </footer>
        </div>
    );
}
