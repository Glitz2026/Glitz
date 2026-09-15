import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Ticket, MessageCircle, ChevronDown, MapPin, Calendar, ArrowRight, Sparkles } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";
import { api } from "../lib/api";
import { formatItalianDateTime, ADDRESS_SHORT } from "../lib/constants";
import Countdown from "../components/Countdown";
import Seo from "../components/Seo";
import InstagramFeed from "../components/InstagramFeed";
import BookingModal from "../components/BookingModal";

const HERO_IMG_FALLBACK = "https://images.unsplash.com/photo-1705807672710-ee0d72e84b78?crop=entropy&cs=srgb&fm=jpg&q=85&w=2000";
const DRONE_IMG = "https://images.unsplash.com/photo-1692688197926-08d634e6db6f?crop=entropy&cs=srgb&fm=jpg&q=85&w=2000";

function vimeoEmbedUrl(url) {
    if (!url) return null;
    const m = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
    if (!m) return null;
    return `https://player.vimeo.com/video/${m[1]}?background=1&autoplay=1&muted=1&loop=1&byline=0&title=0&controls=0`;
}

export default function Home() {
    const [upcoming, setUpcoming] = useState(null);
    const [faqs, setFaqs] = useState([]);
    const [posts, setPosts] = useState([]);
    const [events, setEvents] = useState([]);
    const [settings, setSettings] = useState(null);
    const [bookingOpen, setBookingOpen] = useState(false);

    useEffect(() => {
        api.get("/events/upcoming").then((r) => setUpcoming(r.data)).catch(() => {});
        api.get("/faqs").then((r) => setFaqs(r.data)).catch(() => {});
        api.get("/posts").then((r) => setPosts(r.data.slice(0, 3))).catch(() => {});
        api.get("/events").then((r) => setEvents(r.data.slice(0, 3))).catch(() => {});
        api.get("/settings").then((r) => setSettings(r.data)).catch(() => {});
    }, []);

    const heroVideoUrl = settings?.hero_video_url;
    const rawHero = settings?.hero_image_url || HERO_IMG_FALLBACK;
    const heroImage = rawHero.startsWith("http") ? rawHero : `${process.env.REACT_APP_BACKEND_URL}${rawHero}`;
    const instaPosts = settings?.instagram_posts || [];
    const vimeoUrl = vimeoEmbedUrl(heroVideoUrl);
    const directVideo = heroVideoUrl && !vimeoUrl ? heroVideoUrl : null;

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
    };

    const nightClubSchema = {
        "@context": "https://schema.org",
        "@type": "NightClub",
        name: "Glitz Club",
        image: heroImage,
        address: { "@type": "PostalAddress", streetAddress: "Contrada Dino", addressLocality: "San Nicola Arcella", postalCode: "87020", addressRegion: "CS", addressCountry: "IT" },
        telephone: "+393444289232",
        url: "https://glitzclub.it",
    };

    return (
        <div>
            <Seo
                title="Il Tempio delle Notti Calabresi"
                description="Glitz Club — 2000 posti all'aperto a San Nicola Arcella, sulla costa tirrenica. Vista mare, arco a LED, laser e i più grandi DJ internazionali."
                schema={{ "@context": "https://schema.org", "@graph": [nightClubSchema, faqs.length ? faqSchema : null].filter(Boolean) }}
            />

            {/* HERO */}
            <section data-testid="hero-section" className="relative min-h-[95vh] w-full overflow-hidden flex items-center justify-center grain-overlay bg-cinema">
                <div className="absolute inset-0 z-0">
                    {vimeoUrl ? (
                        <div className="absolute inset-0 w-full h-full">
                            <iframe
                                data-testid="hero-vimeo"
                                src={vimeoUrl}
                                title="Glitz aftermovie"
                                className="absolute top-1/2 left-1/2 w-[177.77vh] h-[56.25vw] min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                                frameBorder="0"
                                allow="autoplay; fullscreen; picture-in-picture"
                                allowFullScreen
                            />
                            <div className="absolute inset-0 bg-obsidian/40" />
                        </div>
                    ) : directVideo ? (
                        <video
                            data-testid="hero-video"
                            src={directVideo}
                            autoPlay
                            muted
                            loop
                            playsInline
                            poster={heroImage}
                            className="w-full h-full object-cover opacity-70"
                        />
                    ) : (
                        <img src={heroImage} alt="Glitz Club arco LED laser" className="w-full h-full object-cover opacity-60" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/70 to-obsidian/40" />
                    <div className="laser-line" />
                </div>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center gap-6 py-24"
                >
                    <span className="overline-tag">
                        <Sparkles className="w-3.5 h-3.5" /> Glitz Club • {ADDRESS_SHORT}
                    </span>
                    <h1 data-testid="hero-title" className="text-5xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tight leading-[0.9] text-white text-glow-lava">
                        Il Tempio<br />
                        <span className="bg-gradient-to-r from-lava via-sunset-pink to-sunset-purple bg-clip-text text-transparent">delle Notti</span><br />
                        Calabresi
                    </h1>
                    <p className="max-w-2xl text-base sm:text-lg text-white/70 leading-relaxed">
                        Duemila posti all'aperto, l'arco a LED più iconico del sud Italia, i laser e la vista sull'Isola di Dino.
                        La stagione 2027 sta per iniziare.
                    </p>

                    {upcoming && (
                        <div data-testid="hero-upcoming" className="mt-4 flex flex-col items-center gap-4">
                            <div className="text-xs uppercase tracking-[0.3em] text-white/60">Prossimo evento</div>
                            <div className="text-xl sm:text-2xl font-bold text-white">{upcoming.title}</div>
                            <Countdown targetIso={upcoming.date} testIdPrefix="hero-countdown" />
                        </div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-4 mt-6">
                        {upcoming?.ticket_url ? (
                            <a href={upcoming.ticket_url} target="_blank" rel="noreferrer" data-testid="hero-ticket-btn" className="btn-lava">
                                <Ticket className="w-4 h-4" /> Biglietti
                            </a>
                        ) : (
                            <Link to="/eventi" data-testid="hero-events-btn" className="btn-lava">
                                <Ticket className="w-4 h-4" /> Vedi Eventi
                            </Link>
                        )}
                    <button onClick={() => setBookingOpen(true)} data-testid="hero-table-btn" className="btn-ghost">
                            <MessageCircle className="w-4 h-4" /> Prenota Tavolo
                        </button>
                    </div>
                </motion.div>
                <button
                    onClick={() => document.querySelector("[data-testid=upcoming-events-section]")?.scrollIntoView({ behavior: "smooth" })}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce text-white/60 hover:text-white transition"
                    aria-label="Scorri"
                    data-testid="hero-scroll-down"
                >
                    <ChevronDown className="w-8 h-8" />
                </button>
            </section>

            {/* Next Events */}
            <section data-testid="upcoming-events-section" className="py-24 px-4 sm:px-6 max-w-7xl mx-auto">
                <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
                    <div className="space-y-3">
                        <span className="overline-tag">Stagione 2026</span>
                        <h2 className="section-title">Prossime Serate</h2>
                    </div>
                    <Link to="/eventi" data-testid="see-all-events-link" className="inline-flex items-center gap-2 text-sm uppercase tracking-widest font-semibold text-lava hover:text-lava-hover">
                        Tutti gli eventi <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {events.map((ev, i) => (
                        <motion.div
                            key={ev.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            data-testid={`event-card-${i}`}
                        >
                            <Link to={`/eventi/${ev.id}`} className="group relative block overflow-hidden rounded-2xl bg-surface border border-white/10 hover:border-lava/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,51,0,0.25)]">
                                <div className="aspect-[4/5] w-full overflow-hidden">
                                    <img src={ev.poster_url} alt={ev.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent" />
                                </div>
                                <div className="absolute top-4 left-4 bg-lava text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-widest flex items-center gap-1.5">
                                    <Calendar className="w-3 h-3" /> {formatItalianDateTime(ev.date).split(" • ")[0]}
                                </div>
                                <div className="absolute inset-x-0 bottom-0 p-6 space-y-2">
                                    <h3 className="text-xl font-bold text-white leading-tight">{ev.title}</h3>
                                    <p className="text-white/70 text-sm line-clamp-1">{ev.lineup?.join(" • ")}</p>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Location */}
            <section data-testid="location-section" className="relative py-24 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img src={DRONE_IMG} alt="Vista drone tramonto San Nicola Arcella" className="w-full h-full object-cover opacity-40" />
                    <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/80 to-obsidian/40" />
                </div>
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <span className="overline-tag">Location</span>
                        <h2 className="section-title">Sul Mare<br />della Calabria</h2>
                        <p className="text-white/70 text-lg leading-relaxed max-w-xl">
                            Contrada Dino, San Nicola Arcella. Un club all'aperto affacciato sull'omonima Isola di Dino, dove il tramonto tirrenico incontra le luci laser e i bassi profondi.
                        </p>
                        <div className="flex items-center gap-2 text-white/70">
                            <MapPin className="w-5 h-5 text-lava" /> Contrada Dino, 87020 San Nicola Arcella (CS)
                        </div>
                        <Link to="/il-club" data-testid="about-cta" className="btn-ghost mt-4">
                            Scopri il Club <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                    <div className="hidden lg:block" />
                </div>
            </section>

            {/* Blog highlights */}
            {posts.length > 0 && (
                <section data-testid="blog-highlights-section" className="py-24 px-4 sm:px-6 max-w-7xl mx-auto">
                    <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
                        <div className="space-y-3">
                            <span className="overline-tag">Ultime News</span>
                            <h2 className="section-title">Dal Magazine</h2>
                        </div>
                        <Link to="/news" data-testid="see-all-posts-link" className="inline-flex items-center gap-2 text-sm uppercase tracking-widest font-semibold text-lava hover:text-lava-hover">
                            Tutti gli articoli <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                    <div className="grid gap-8 md:grid-cols-3">
                        {posts.map((p, i) => (
                            <Link
                                key={p.id}
                                to={`/news/${p.slug}`}
                                data-testid={`blog-card-${i}`}
                                className="group block rounded-2xl overflow-hidden bg-surface border border-white/10 hover:border-lava/40 transition"
                            >
                                <div className="aspect-video overflow-hidden">
                                    <img src={p.cover_url} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                </div>
                                <div className="p-6 space-y-3">
                                    <div className="flex flex-wrap gap-2">
                                        {p.tags?.slice(0, 2).map((t) => (
                                            <span key={t} className="text-[10px] uppercase tracking-widest text-lava font-semibold">#{t}</span>
                                        ))}
                                    </div>
                                    <h3 className="text-xl font-bold text-white group-hover:text-lava transition line-clamp-2">{p.title}</h3>
                                    <p className="text-white/60 text-sm line-clamp-2">{p.excerpt}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            )}

            {/* Instagram feed */}
            <InstagramFeed posts={instaPosts} profileUrl={settings?.instagram_url} />

            {/* FAQ - just before footer (GEO/AEO optimized with schema.org) */}
            <section id="faq" data-testid="faq-section" className="py-24 px-4 sm:px-6 max-w-5xl mx-auto">
                <div className="mb-12 flex flex-col gap-3">
                    <span className="overline-tag">Domande Frequenti</span>
                    <h2 className="section-title">Info Rapide<br />sul Glitz</h2>
                    <p className="text-white/60 max-w-2xl">
                        Tutto quello che devi sapere per vivere la miglior notte della tua estate. Location, orari, biglietti, tavoli.
                    </p>
                </div>
                <Accordion type="single" collapsible className="space-y-4">
                    {faqs.map((f, i) => (
                        <AccordionItem
                            key={f.id}
                            value={f.id}
                            data-testid={`faq-item-${i}`}
                            className="border border-white/10 rounded-xl bg-surface overflow-hidden hover:border-white/20 transition data-[state=open]:border-lava/40"
                        >
                            <AccordionTrigger className="px-6 py-5 text-left text-base sm:text-lg font-bold text-white hover:text-lava hover:no-underline">
                                {f.question}
                            </AccordionTrigger>
                            <AccordionContent className="px-6 pb-6 text-white/70 text-sm sm:text-base leading-relaxed">
                                {f.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </section>

            <BookingModal
                open={bookingOpen}
                onClose={() => setBookingOpen(false)}
                eventTitle={upcoming?.title || ""}
                eventId={upcoming?.id || ""}
            />
        </div>
    );
}
