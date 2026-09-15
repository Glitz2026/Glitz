import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X, Instagram, MessageCircle, Mail, MapPin } from "lucide-react";
import { WHATSAPP_DISPLAY, EMAIL, INSTAGRAM, TIKTOK, ADDRESS, whatsappInfoLink } from "../lib/constants";
import { api } from "../lib/api";
import Newsletter from "./Newsletter";

function resolveUrl(url) {
    if (!url) return "";
    if (url.startsWith("http")) return url;
    return `${process.env.REACT_APP_BACKEND_URL}${url}`;
}

const NAV = [
    { to: "/", label: "Home" },
    { to: "/eventi", label: "Eventi" },
    { to: "/il-club", label: "Il Club" },
    { to: "/eventi/passati", label: "Archivio" },
    { to: "/news", label: "News" },
    { to: "/contatti", label: "Contatti" },
];

export default function Layout({ children }) {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [logoUrl, setLogoUrl] = useState("");
    const loc = useLocation();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll);
        api.get("/settings").then((r) => setLogoUrl(resolveUrl(r.data?.logo_url || ""))).catch(() => {});
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => { setOpen(false); window.scrollTo(0, 0); }, [loc.pathname]);

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
                    </nav>
                    <div className="flex items-center gap-3">
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
                        </nav>
                    </div>
                )}
            </header>

            <main className="pt-20">{children}</main>

            <footer data-testid="site-footer" className="mt-24 border-t border-white/10 bg-surface/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 grid gap-12 md:grid-cols-4">
                    <div className="md:col-span-2 space-y-4">
                        {logoUrl ? (
                            <img src={logoUrl} alt="Glitz Club" className="h-12 w-auto object-contain" />
                        ) : (
                            <div className="text-3xl font-black tracking-[0.2em] font-display bg-gradient-to-r from-white via-lava to-sunset-pink bg-clip-text text-transparent">
                                GLITZ
                            </div>
                        )}
                        <p className="text-white/60 max-w-md leading-relaxed">
                            Il club all'aperto sulla costa tirrenica calabrese. 2000 posti, vista mare, l'arco iconico e le notti più magiche del sud Italia.
                        </p>
                        <Newsletter />
                    </div>
                    <div className="space-y-3 text-sm">
                        <h4 className="uppercase tracking-widest text-lava text-xs font-bold">Contatti</h4>
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
                        <h4 className="uppercase tracking-widest text-lava text-xs font-bold">Social</h4>
                        <a href={INSTAGRAM} target="_blank" rel="noreferrer" data-testid="footer-instagram" className="flex items-center gap-2 text-white/70 hover:text-white transition">
                            <Instagram className="w-4 h-4" /> @glitzclubofficial
                        </a>
                        <a href={TIKTOK} target="_blank" rel="noreferrer" data-testid="footer-tiktok" className="text-white/70 hover:text-white transition block">
                            TikTok
                        </a>
                        <Link to="/admin/login" data-testid="footer-admin-link" className="text-white/40 hover:text-white/70 transition block text-xs mt-6">
                            Area Riservata
                        </Link>
                    </div>
                </div>
                <div className="border-t border-white/5 py-6 text-center text-xs text-white/40">
                    © {new Date().getFullYear()} Glitz Club — Contrada Dino, San Nicola Arcella. Tutti i diritti riservati.
                </div>
            </footer>
        </div>
    );
}
