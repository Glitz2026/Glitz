import { useEffect, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api, API } from "../lib/api";
import { toast } from "sonner";
import { LogOut, Plus, Trash2, Edit, Upload, Calendar as CalIcon, FileText, HelpCircle, Image as ImgIcon, Settings as SettingsIcon, Video, Users, Phone, Mail as MailIcon, Check, PenLine, Euro, Ticket, CalendarDays, ArrowUp, ArrowDown, ShoppingBag, Download } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs";

function resolveMediaUrl(m) {
    if (!m.url) return "";
    if (m.url.startsWith("http")) return m.url;
    const base = process.env.REACT_APP_BACKEND_URL;
    return `${base}${m.url}`;
}

const emptyEvent = { title: "", date: "", lineup: "", description: "", poster_url: "", artist_photo_url: "", ticket_url: "https://www.ticketsms.it/", location: "Contrada Dino, San Nicola Arcella (CS)", published: true, floorplan_enabled: false, floorplan_image_url: "" };
const emptyPost = { title: "", slug: "", excerpt: "", cover_url: "", body: "", tags: "", published: true };
const emptyFaq = { question: "", answer: "", order: 0 };
const emptyProduct = { slug: "", name: "", subtitle: "", price: 0, image: "", gallery: [], description: "", details: [], color: "", badge: "", sizes: [], active: true, order: 99 };

// Preview card renderizzata inline sotto ogni sezione dei Contenuti — mostra come apparirà H1/kicker/descrizione con lo stato corrente (non ancora salvato)
function SectionPreview({ kicker, title, description, extra, url, label = "Anteprima live" }) {
    return (
        <div data-testid="section-preview" className="mt-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.03] p-5 space-y-2">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-emerald-400 font-black">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> {label}
                </div>
                {url && (
                    <a href={url} target="_blank" rel="noreferrer" className="text-[10px] uppercase tracking-widest text-white/60 hover:text-white underline">
                        Apri pagina →
                    </a>
                )}
            </div>
            {kicker && <div className="text-[10px] uppercase tracking-[0.35em] text-lava font-bold">{kicker}</div>}
            {title && <div className="text-2xl sm:text-3xl font-black uppercase tracking-tight leading-tight text-white whitespace-pre-line">{title}</div>}
            {description && <p className="text-sm text-white/60 leading-relaxed line-clamp-3">{description}</p>}
            {extra}
        </div>
    );
}

export default function AdminDashboard() {
    const nav = useNavigate();
    const [tab, setTab] = useState("events");
    const [events, setEvents] = useState([]);
    const [posts, setPosts] = useState([]);
    const [faqs, setFaqs] = useState([]);
    const [media, setMedia] = useState([]);
    const [mediaCategoryFilter, setMediaCategoryFilter] = useState("");
    const [editEvent, setEditEvent] = useState(null);
    const [editPost, setEditPost] = useState(null);
    const [editFaq, setEditFaq] = useState(null);
    const [settings, setSettings] = useState(null);
    const [savingSettings, setSavingSettings] = useState(false);
    const [bookings, setBookings] = useState([]);
    const [privateEvents, setPrivateEvents] = useState([]);
    const [stats, setStats] = useState(null);
    const [products, setProducts] = useState([]);
    const [editProduct, setEditProduct] = useState(null);
    const [subscribers, setSubscribers] = useState([]);
    const [dragTarget, setDragTarget] = useState(null); // { type: "table"|"label", id/zid }
    const [snapToGrid, setSnapToGrid] = useState(true);
    const [gridSize, setGridSize] = useState(10);
    const previewSvgRef = useRef(null);

    // Converte le coordinate del puntatore (clientX, clientY) in coordinate SVG del preview
    const clientToSvg = (clientX, clientY) => {
        const svg = previewSvgRef.current; if (!svg) return null;
        const pt = svg.createSVGPoint(); pt.x = clientX; pt.y = clientY;
        const ctm = svg.getScreenCTM(); if (!ctm) return null;
        const p = pt.matrixTransform(ctm.inverse());
        let x = p.x, y = p.y;
        if (snapToGrid && gridSize > 0) {
            x = Math.round(x / gridSize) * gridSize;
            y = Math.round(y / gridSize) * gridSize;
        } else {
            x = Math.round(x); y = Math.round(y);
        }
        return { x, y };
    };

    const email = localStorage.getItem("glitz_admin_email");

    const load = async () => {
        try {
            const [e, p, f, m, s, b, st] = await Promise.all([
                api.get("/events", { params: { published_only: false } }),
                api.get("/posts", { params: { published_only: false } }),
                api.get("/faqs"),
                api.get("/media"),
                api.get("/settings"),
                api.get("/admin/bookings"),
                api.get("/admin/stats"),
            ]);
            setEvents(e.data); setPosts(p.data); setFaqs(f.data); setMedia(m.data); setSettings(s.data); setBookings(b.data); setStats(st.data);
        } catch (err) {
            if (err?.response?.status === 401) { logout(); }
        }
    };

    const setBookingStatus = async (id, status) => {
        try {
            await api.patch(`/admin/bookings/${id}`, null, { params: { status } });
            toast.success("Aggiornato");
            load();
        } catch { toast.error("Errore"); }
    };

    useEffect(() => {
        if (!localStorage.getItem("glitz_admin_token")) { nav("/admin/login"); return; }
        api.get("/auth/me").then(load).catch(() => logout());
    }, []); // eslint-disable-line

    const logout = () => {
        localStorage.removeItem("glitz_admin_token");
        localStorage.removeItem("glitz_admin_email");
        nav("/admin/login");
    };

    // Events
    const saveEvent = async () => {
        try {
            const payload = {
                ...editEvent,
                lineup: typeof editEvent.lineup === "string" ? editEvent.lineup.split(",").map((s) => s.trim()).filter(Boolean) : editEvent.lineup,
                date: new Date(editEvent.date).toISOString(),
            };
            if (editEvent.id) await api.put(`/admin/events/${editEvent.id}`, payload);
            else await api.post("/admin/events", payload);
            toast.success("Evento salvato");
            setEditEvent(null); load();
        } catch (err) { toast.error("Errore salvataggio evento"); }
    };
    const delEvent = async (id) => { if (!window.confirm("Eliminare?")) return; await api.delete(`/admin/events/${id}`); toast.success("Eliminato"); load(); };

    // Posts
    const savePost = async () => {
        try {
            const payload = { ...editPost, tags: typeof editPost.tags === "string" ? editPost.tags.split(",").map((s) => s.trim()).filter(Boolean) : editPost.tags };
            if (editPost.id) await api.put(`/admin/posts/${editPost.id}`, payload);
            else await api.post("/admin/posts", payload);
            toast.success("Articolo salvato"); setEditPost(null); load();
        } catch (err) { toast.error("Errore"); }
    };
    const delPost = async (id) => { if (!window.confirm("Eliminare?")) return; await api.delete(`/admin/posts/${id}`); load(); };

    // FAQ
    const saveFaq = async () => {
        try {
            if (editFaq.id) await api.put(`/admin/faqs/${editFaq.id}`, editFaq);
            else await api.post("/admin/faqs", editFaq);
            toast.success("FAQ salvata"); setEditFaq(null); load();
        } catch (err) { toast.error("Errore"); }
    };
    const delFaq = async (id) => { if (!window.confirm("Eliminare?")) return; await api.delete(`/admin/faqs/${id}`); load(); };

    // Products
    const saveProduct = async () => {
        try {
            const payload = {
                ...editProduct,
                price: parseFloat(editProduct.price) || 0,
                order: parseInt(editProduct.order, 10) || 0,
                gallery: typeof editProduct.gallery === "string" ? editProduct.gallery.split(",").map((s) => s.trim()).filter(Boolean) : editProduct.gallery,
                details: typeof editProduct.details === "string" ? editProduct.details.split("\n").map((s) => s.trim()).filter(Boolean) : editProduct.details,
                sizes: typeof editProduct.sizes === "string" ? editProduct.sizes.split(",").map((s) => s.trim()).filter(Boolean) : editProduct.sizes,
                badge: editProduct.badge || null,
            };
            if (editProduct.id) await api.put(`/admin/products/${editProduct.id}`, payload);
            else await api.post("/admin/products", payload);
            toast.success("Prodotto salvato");
            setEditProduct(null);
            const r = await api.get("/products", { params: { active_only: false } });
            setProducts(r.data);
        } catch (err) { toast.error("Errore salvataggio prodotto"); }
    };
    const delProduct = async (id) => {
        if (!window.confirm("Eliminare prodotto?")) return;
        await api.delete(`/admin/products/${id}`);
        const r = await api.get("/products", { params: { active_only: false } });
        setProducts(r.data);
    };
    const exportSubscribersCsv = () => {
        const rows = ["email,created_at", ...subscribers.map((s) => `${s.email},${s.created_at}`)].join("\n");
        const blob = new Blob([rows], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url; a.download = "glitz-newsletter-subscribers.csv"; a.click();
        URL.revokeObjectURL(url);
    };

    // Media
    const uploadMedia = async (file, category = "gallery") => {
        try {
            const fd = new FormData();
            fd.append("file", file);
            fd.append("category", category);
            await api.post("/admin/media", fd, { headers: { "Content-Type": "multipart/form-data" } });
            toast.success("Media caricato"); load();
        } catch (err) { toast.error("Errore upload"); }
    };
    const delMedia = async (id) => { if (!window.confirm("Eliminare?")) return; await api.delete(`/admin/media/${id}`); load(); };
    const moveMedia = async (list, i, dir) => {
        const j = i + dir;
        if (j < 0 || j >= list.length) return;
        const reordered = [...list];
        [reordered[i], reordered[j]] = [reordered[j], reordered[i]];
        try {
            await api.post("/admin/media/reorder", { order: reordered.map((m) => m.id) });
            load();
        } catch { toast.error("Errore riordino"); }
    };

    // Settings
    const saveSettings = async () => {
        setSavingSettings(true);
        try {
            const payload = {
                hero_video_url: settings.hero_video_url || "",
                hero_image_url: settings.hero_image_url || "",
                logo_url: settings.logo_url || "",
                logo_dark_url: settings.logo_dark_url || "",
                planimetria_url: settings.planimetria_url || "",
                instagram_url: settings.instagram_url || "",
                instagram_posts: settings.instagram_posts || [],
                home_hero_line1: settings.home_hero_line1 || "",
                home_hero_line2: settings.home_hero_line2 || "",
                home_hero_subtitle: settings.home_hero_subtitle || "",
                home_opening_title: settings.home_opening_title || "",
                home_events_kicker: settings.home_events_kicker || "",
                home_events_title: settings.home_events_title || "",
                home_location_kicker: settings.home_location_kicker || "",
                home_location_title: settings.home_location_title || "",
                home_location_body: settings.home_location_body || "",
                home_faq_title: settings.home_faq_title || "",
                home_faq_intro: settings.home_faq_intro || "",
                home_gallery_preview_kicker: settings.home_gallery_preview_kicker || "",
                home_gallery_preview_title: settings.home_gallery_preview_title || "",
                about_kicker: settings.about_kicker || "",
                about_hero_line1: settings.about_hero_line1 || "",
                about_hero_line2: settings.about_hero_line2 || "",
                about_hero_image_url: settings.about_hero_image_url || "",
                about_hero_subtitle: settings.about_hero_subtitle || "",
                about_stat_1_value: settings.about_stat_1_value || "",
                about_stat_1_label: settings.about_stat_1_label || "",
                about_stat_2_value: settings.about_stat_2_value || "",
                about_stat_2_label: settings.about_stat_2_label || "",
                about_stat_3_value: settings.about_stat_3_value || "",
                about_stat_3_label: settings.about_stat_3_label || "",
                about_location_title: settings.about_location_title || "",
                about_location_body: settings.about_location_body || "",
                about_gallery_kicker: settings.about_gallery_kicker || "",
                about_gallery_title: settings.about_gallery_title || "",
                about_gallery_groups: (settings.about_gallery_groups || []).map((g) => ({
                    id: g.id || String(Math.random()).slice(2),
                    title: g.title || "",
                    category: g.category || "",
                })),
                contact_kicker: settings.contact_kicker || "",
                contact_title: settings.contact_title || "",
                contact_whatsapp_number: settings.contact_whatsapp_number || "",
                contact_whatsapp_display: settings.contact_whatsapp_display || "",
                contact_email: settings.contact_email || "",
                contact_instagram: settings.contact_instagram || "",
                contact_instagram_handle: settings.contact_instagram_handle || "",
                contact_address: settings.contact_address || "",
                contact_hours: settings.contact_hours || "",
                contact_map_embed_url: settings.contact_map_embed_url || "",
                floorplan_zones: (settings.floorplan_zones || []).map((z) => ({
                    id: z.id || "",
                    label: z.label || "",
                    color: z.color || "#E10600",
                    price_from: z.price_from || "",
                    min_spend: z.min_spend || "",
                    bottles: z.bottles || "",
                    description: z.description || "",
                })),
                floorplan_table_overrides: settings.floorplan_table_overrides || {},
                about_zones: (settings.about_zones || []).map((z) => ({
                    id: z.id || String(Math.random()).slice(2),
                    title: z.title || "",
                    subtitle: z.subtitle || "",
                    image: z.image || "",
                    description: z.description || "",
                    highlights: Array.isArray(z.highlights)
                        ? z.highlights
                        : String(z.highlights || "").split("\n").map((s) => s.trim()).filter(Boolean),
                })),
            };
            await api.put("/admin/settings", payload);
            toast.success("Impostazioni salvate");
        } catch (err) { toast.error("Errore salvataggio"); }
        finally { setSavingSettings(false); }
    };

    // Zone editor helpers (About page)
    const updateZone = (i, patch) => {
        const list = [...(settings.about_zones || [])];
        list[i] = { ...list[i], ...patch };
        setSettings({ ...settings, about_zones: list });
    };
    const moveZone = (i, dir) => {
        const list = [...(settings.about_zones || [])];
        const j = i + dir;
        if (j < 0 || j >= list.length) return;
        [list[i], list[j]] = [list[j], list[i]];
        setSettings({ ...settings, about_zones: list });
    };
    const removeZone = (i) => {
        const list = [...(settings.about_zones || [])];
        list.splice(i, 1);
        setSettings({ ...settings, about_zones: list });
    };
    const addZone = () => {
        const list = [...(settings.about_zones || [])];
        list.push({ id: `zone-${Date.now()}`, title: "Nuovo Ambiente", subtitle: "", image: "", description: "", highlights: [] });
        setSettings({ ...settings, about_zones: list });
    };
    const uploadZoneImage = async (i, file) => {
        try {
            const fd = new FormData();
            fd.append("file", file);
            fd.append("category", "about-zone");
            const r = await api.post("/admin/media", fd);
            updateZone(i, { image: r.data.url });
            toast.success("Foto caricata");
        } catch (err) { toast.error("Errore upload"); }
    };

    const uploadFor = async (file, target) => {
        try {
            const fd = new FormData();
            fd.append("file", file);
            fd.append("category", target === "hero_video_url" ? "hero-video" : "hero-image");
            const { data } = await api.post("/admin/media", fd, { headers: { "Content-Type": "multipart/form-data" } });
            const base = process.env.REACT_APP_BACKEND_URL;
            const url = data.url.startsWith("http") ? data.url : `${base}${data.url}`;
            setSettings((s) => ({ ...s, [target]: url }));
            toast.success("File caricato — clicca Salva per attivarlo");
        } catch (err) { toast.error("Errore upload"); }
    };

    const updateInstaPost = (i, key, value) => {
        setSettings((s) => {
            const posts = [...(s.instagram_posts || [])];
            posts[i] = { ...posts[i], [key]: value };
            return { ...s, instagram_posts: posts };
        });
    };

    const input = "w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2.5 text-white text-sm focus:outline-none focus:border-lava";

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
            <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight">Dashboard Admin</h1>
                    <p className="text-white/50 text-sm">{email}</p>
                </div>
                <div className="flex items-center gap-3">
                    <Link to="/" className="text-sm text-white/60 hover:text-white uppercase tracking-widest">Vai al sito</Link>
                    <button data-testid="admin-logout-btn" onClick={logout} className="btn-ghost !px-5 !py-2.5 !text-xs">
                        <LogOut className="w-4 h-4" /> Esci
                    </button>
                </div>
            </div>

            {/* ---------- Stats KPIs ---------- */}
            {stats && (
                <div data-testid="admin-stats" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                    <div className="glass-card rounded-2xl p-5 space-y-2">
                        <div className="flex items-center gap-2 text-white/50 text-[10px] uppercase tracking-widest">
                            <Euro className="w-4 h-4 text-lava" /> Ricavi totali
                        </div>
                        <div data-testid="stat-revenue-total" className="text-3xl font-black tracking-tight">
                            € {(stats.revenue_paid_cents / 100).toLocaleString("it-IT", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </div>
                        <div className="text-xs text-white/50">
                            € {(stats.revenue_week_cents / 100).toLocaleString("it-IT", { minimumFractionDigits: 0, maximumFractionDigits: 0 })} ultimi 7 giorni · {stats.orders_count} ordini
                        </div>
                    </div>

                    <div className="glass-card rounded-2xl p-5 space-y-2">
                        <div className="flex items-center gap-2 text-white/50 text-[10px] uppercase tracking-widest">
                            <Ticket className="w-4 h-4 text-lava" /> Prenotazioni settimana
                        </div>
                        <div data-testid="stat-bookings-week" className="text-3xl font-black tracking-tight">
                            {stats.bookings_week}
                        </div>
                        <div className="text-xs text-white/50">
                            {stats.bookings_pending} da confermare · {stats.bookings_total} totali
                        </div>
                    </div>

                    <div className="glass-card rounded-2xl p-5 space-y-2">
                        <div className="flex items-center gap-2 text-white/50 text-[10px] uppercase tracking-widest">
                            <Users className="w-4 h-4 text-lava" /> Eventi privati
                        </div>
                        <div data-testid="stat-private-new" className="text-3xl font-black tracking-tight">
                            {stats.private_new}
                        </div>
                        <div className="text-xs text-white/50">
                            nuove richieste su {stats.private_total} totali
                        </div>
                    </div>

                    <div className="glass-card rounded-2xl p-5 space-y-2">
                        <div className="flex items-center gap-2 text-white/50 text-[10px] uppercase tracking-widest">
                            <CalendarDays className="w-4 h-4 text-lava" /> Prossimo evento
                        </div>
                        {stats.next_event ? (
                            <>
                                <div data-testid="stat-next-event" className="text-base font-black tracking-tight leading-tight line-clamp-2">
                                    {stats.next_event.title}
                                </div>
                                <div className="text-xs text-white/50">
                                    {new Date(stats.next_event.date).toLocaleDateString("it-IT", { day: "2-digit", month: "short", year: "numeric" })} · <span className="text-lava font-bold">{stats.next_event.expected_guests}</span> ospiti attesi · {stats.next_event.tables_reserved} tavoli
                                </div>
                            </>
                        ) : (
                            <div className="text-white/40 text-sm">Nessun evento in programma</div>
                        )}
                    </div>
                </div>
            )}

            <Tabs value={tab} onValueChange={setTab}>
                <TabsList className="bg-surface border border-white/10 grid grid-cols-2 lg:grid-cols-10 h-auto p-1">
                    <TabsTrigger value="events" data-testid="tab-events" className="data-[state=active]:bg-lava data-[state=active]:text-white gap-2"><CalIcon className="w-4 h-4" /> Eventi</TabsTrigger>
                    <TabsTrigger value="posts" data-testid="tab-posts" className="data-[state=active]:bg-lava data-[state=active]:text-white gap-2"><FileText className="w-4 h-4" /> Blog</TabsTrigger>
                    <TabsTrigger value="faqs" data-testid="tab-faqs" className="data-[state=active]:bg-lava data-[state=active]:text-white gap-2"><HelpCircle className="w-4 h-4" /> FAQ</TabsTrigger>
                    <TabsTrigger value="media" data-testid="tab-media" className="data-[state=active]:bg-lava data-[state=active]:text-white gap-2"><ImgIcon className="w-4 h-4" /> Media</TabsTrigger>
                    <TabsTrigger value="products" data-testid="tab-products" onClick={() => api.get("/products", { params: { active_only: false } }).then((r) => setProducts(r.data)).catch(() => {})} className="data-[state=active]:bg-lava data-[state=active]:text-white gap-2"><ShoppingBag className="w-4 h-4" /> Prodotti</TabsTrigger>
                    <TabsTrigger value="bookings" data-testid="tab-bookings" className="data-[state=active]:bg-lava data-[state=active]:text-white gap-2"><Users className="w-4 h-4" /> Prenotazioni</TabsTrigger>
                    <TabsTrigger value="private" data-testid="tab-private" className="data-[state=active]:bg-lava data-[state=active]:text-white gap-2" onClick={() => api.get("/private-events").then((r) => setPrivateEvents(r.data)).catch(() => {})}>
                        <Users className="w-4 h-4" /> Eventi Privati
                    </TabsTrigger>
                    <TabsTrigger value="newsletter" data-testid="tab-newsletter" onClick={() => api.get("/admin/newsletter/subscribers").then((r) => setSubscribers(r.data)).catch(() => {})} className="data-[state=active]:bg-lava data-[state=active]:text-white gap-2"><MailIcon className="w-4 h-4" /> Newsletter</TabsTrigger>
                    <TabsTrigger value="content" data-testid="tab-content" className="data-[state=active]:bg-lava data-[state=active]:text-white gap-2"><PenLine className="w-4 h-4" /> Contenuti</TabsTrigger>
                    <TabsTrigger value="settings" data-testid="tab-settings" className="data-[state=active]:bg-lava data-[state=active]:text-white gap-2"><SettingsIcon className="w-4 h-4" /> Config</TabsTrigger>
                </TabsList>

                {/* EVENTS */}
                <TabsContent value="events" className="mt-6 space-y-4">
                    <button data-testid="new-event-btn" onClick={() => setEditEvent({ ...emptyEvent, date: new Date().toISOString().slice(0, 16) })} className="btn-lava !px-5 !py-2.5 !text-xs">
                        <Plus className="w-4 h-4" /> Nuovo Evento
                    </button>
                    <div className="grid gap-3">
                        {events.map((ev) => (
                            <div key={ev.id} className="glass-card rounded-xl p-4 flex items-center gap-4 flex-wrap">
                                {ev.poster_url && <img src={ev.poster_url} alt="" className="w-16 h-20 rounded object-cover" />}
                                <div className="flex-1 min-w-0">
                                    <div className="font-bold text-white truncate">{ev.title}</div>
                                    <div className="text-xs text-white/50">{new Date(ev.date).toLocaleString("it-IT")}</div>
                                    <div className="text-xs text-white/60 truncate">{ev.lineup?.join(", ")}</div>
                                </div>
                                <button onClick={() => setEditEvent({ ...ev, lineup: ev.lineup.join(", "), date: ev.date.slice(0, 16) })} className="p-2 text-white/70 hover:text-lava"><Edit className="w-4 h-4" /></button>
                                <button onClick={() => delEvent(ev.id)} className="p-2 text-white/70 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                            </div>
                        ))}
                    </div>
                    {editEvent && (
                        <div className="glass-card rounded-2xl p-6 space-y-3 mt-6">
                            <h3 className="font-bold text-lg">{editEvent.id ? "Modifica" : "Nuovo"} Evento</h3>
                            <input data-testid="event-title-input" className={input} placeholder="Titolo" value={editEvent.title} onChange={(e) => setEditEvent({ ...editEvent, title: e.target.value })} />
                            <input type="datetime-local" className={input} value={editEvent.date} onChange={(e) => setEditEvent({ ...editEvent, date: e.target.value })} />
                            <input className={input} placeholder="Line-up (virgole)" value={editEvent.lineup} onChange={(e) => setEditEvent({ ...editEvent, lineup: e.target.value })} />
                            {/* Poster copertina evento */}
                            <div className="rounded-xl border border-white/10 p-3 bg-black/30 space-y-2">
                                <label className="text-xs uppercase tracking-widest text-white/60 block">Foto copertina evento</label>
                                <div className="flex items-center gap-3">
                                    {editEvent.poster_url ? (
                                        <img src={editEvent.poster_url.startsWith("http") ? editEvent.poster_url : `${process.env.REACT_APP_BACKEND_URL}${editEvent.poster_url}`} alt="poster" className="w-20 h-24 rounded object-cover border border-white/10" />
                                    ) : (
                                        <div className="w-20 h-24 rounded border border-dashed border-white/15 flex items-center justify-center text-white/40 text-[10px]">Nessuna</div>
                                    )}
                                    <div className="flex-1 space-y-2">
                                        <input className={input} placeholder="Oppure incolla URL Poster" value={editEvent.poster_url} onChange={(e) => setEditEvent({ ...editEvent, poster_url: e.target.value })} />
                                        <label data-testid="upload-event-poster" className="btn-ghost !px-3 !py-1.5 !text-xs cursor-pointer inline-flex">
                                            <Upload className="w-3 h-3" /> Carica foto
                                            <input type="file" accept="image/*" className="hidden" onChange={async (e) => {
                                                const f = e.target.files?.[0]; if (!f) return;
                                                try {
                                                    const fd = new FormData();
                                                    fd.append("file", f);
                                                    fd.append("category", "event-poster");
                                                    const r = await api.post("/admin/media", fd);
                                                    setEditEvent({ ...editEvent, poster_url: r.data.url });
                                                    toast.success("Foto copertina caricata");
                                                } catch { toast.error("Errore upload"); }
                                            }} />
                                        </label>
                                    </div>
                                </div>
                            </div>
                            {/* Foto artista pulita per PosterFrame */}
                            <div className="rounded-xl border border-white/10 p-3 bg-black/30 space-y-2">
                                <label className="text-xs uppercase tracking-widest text-white/60 block">Foto artista (senza testo) — usata dal template poster</label>
                                <div className="flex items-center gap-3">
                                    {editEvent.artist_photo_url ? (
                                        <img src={editEvent.artist_photo_url.startsWith("http") ? editEvent.artist_photo_url : `${process.env.REACT_APP_BACKEND_URL}${editEvent.artist_photo_url}`} alt="artist" className="w-20 h-24 rounded object-cover border border-white/10" />
                                    ) : (
                                        <div className="w-20 h-24 rounded border border-dashed border-white/15 flex items-center justify-center text-white/40 text-[10px]">Nessuna</div>
                                    )}
                                    <div className="flex-1 space-y-2">
                                        <input className={input} placeholder="Oppure incolla URL foto artista" value={editEvent.artist_photo_url || ""} onChange={(e) => setEditEvent({ ...editEvent, artist_photo_url: e.target.value })} />
                                        <label data-testid="upload-event-artist" className="btn-ghost !px-3 !py-1.5 !text-xs cursor-pointer inline-flex">
                                            <Upload className="w-3 h-3" /> Carica foto artista
                                            <input type="file" accept="image/*" className="hidden" onChange={async (e) => {
                                                const f = e.target.files?.[0]; if (!f) return;
                                                try {
                                                    const fd = new FormData();
                                                    fd.append("file", f);
                                                    fd.append("category", "event-artist");
                                                    const r = await api.post("/admin/media", fd);
                                                    setEditEvent({ ...editEvent, artist_photo_url: r.data.url });
                                                    toast.success("Foto artista caricata");
                                                } catch { toast.error("Errore upload"); }
                                            }} />
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <input className={input} placeholder="URL TicketSms" value={editEvent.ticket_url} onChange={(e) => setEditEvent({ ...editEvent, ticket_url: e.target.value })} />
                            <textarea className={input} rows="4" placeholder="Descrizione" value={editEvent.description} onChange={(e) => setEditEvent({ ...editEvent, description: e.target.value })} />
                            <label className="flex items-center gap-2 text-sm text-white/70">
                                <input type="checkbox" checked={editEvent.floorplan_enabled} onChange={(e) => setEditEvent({ ...editEvent, floorplan_enabled: e.target.checked })} />
                                Piantina interattiva attiva per questo evento (Fase 2)
                            </label>
                            {editEvent.floorplan_enabled && (
                                <div className="rounded-xl border border-lava/30 bg-lava/5 p-3 space-y-2" data-testid="event-floorplan-custom">
                                    <label className="text-xs uppercase tracking-widest text-lava font-bold block">Piantina custom per questa serata (opzionale)</label>
                                    <p className="text-[11px] text-white/50">Lascia vuoto per usare la piantina di default. Utile per setup speciali (es. compleanni, matrimoni). Le zone e i tavoli restano gli stessi.</p>
                                    <div className="flex items-center gap-3">
                                        {editEvent.floorplan_image_url ? (
                                            <img src={editEvent.floorplan_image_url.startsWith("http") ? editEvent.floorplan_image_url : `${process.env.REACT_APP_BACKEND_URL}${editEvent.floorplan_image_url}`} alt="floorplan" className="w-20 h-20 rounded object-cover border border-white/10 bg-black" />
                                        ) : (
                                            <div className="w-20 h-20 rounded border border-dashed border-white/15 flex items-center justify-center text-white/40 text-[10px] bg-black">Default</div>
                                        )}
                                        <div className="flex-1 space-y-2">
                                            <input data-testid="event-floorplan-url" className={input} placeholder="Oppure incolla URL PNG piantina" value={editEvent.floorplan_image_url || ""} onChange={(e) => setEditEvent({ ...editEvent, floorplan_image_url: e.target.value })} />
                                            <div className="flex gap-2">
                                                <label data-testid="upload-event-floorplan" className="btn-ghost !px-3 !py-1.5 !text-xs cursor-pointer inline-flex">
                                                    <Upload className="w-3 h-3" /> Carica piantina
                                                    <input type="file" accept="image/*" className="hidden" onChange={async (e) => {
                                                        const f = e.target.files?.[0]; if (!f) return;
                                                        try {
                                                            const fd = new FormData();
                                                            fd.append("file", f);
                                                            fd.append("category", "event-floorplan");
                                                            const r = await api.post("/admin/media", fd);
                                                            setEditEvent({ ...editEvent, floorplan_image_url: r.data.url });
                                                            toast.success("Piantina caricata");
                                                        } catch { toast.error("Errore upload"); }
                                                    }} />
                                                </label>
                                                {editEvent.floorplan_image_url && (
                                                    <button type="button" onClick={() => setEditEvent({ ...editEvent, floorplan_image_url: "" })} className="btn-ghost !px-3 !py-1.5 !text-xs !text-lava">
                                                        <Trash2 className="w-3 h-3" /> Rimuovi
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <label className="flex items-center gap-2 text-sm text-white/70">
                                <input type="checkbox" checked={editEvent.published} onChange={(e) => setEditEvent({ ...editEvent, published: e.target.checked })} />
                                Pubblicato
                            </label>
                            <div className="flex gap-2">
                                <button data-testid="save-event-btn" onClick={saveEvent} className="btn-lava !text-xs !px-5 !py-2.5">Salva</button>
                                <button onClick={() => setEditEvent(null)} className="btn-ghost !text-xs !px-5 !py-2.5">Annulla</button>
                            </div>
                        </div>
                    )}
                </TabsContent>

                {/* POSTS */}
                <TabsContent value="posts" className="mt-6 space-y-4">
                    <button data-testid="new-post-btn" onClick={() => setEditPost(emptyPost)} className="btn-lava !px-5 !py-2.5 !text-xs">
                        <Plus className="w-4 h-4" /> Nuovo Articolo
                    </button>
                    <div className="grid gap-3">
                        {posts.map((p) => (
                            <div key={p.id} className="glass-card rounded-xl p-4 flex items-center gap-4 flex-wrap">
                                {p.cover_url && <img src={p.cover_url} alt="" className="w-20 h-14 rounded object-cover" />}
                                <div className="flex-1 min-w-0">
                                    <div className="font-bold text-white truncate">{p.title}</div>
                                    <div className="text-xs text-white/50">/{p.slug}</div>
                                </div>
                                <button onClick={() => setEditPost({ ...p, tags: p.tags.join(", ") })} className="p-2 text-white/70 hover:text-lava"><Edit className="w-4 h-4" /></button>
                                <button onClick={() => delPost(p.id)} className="p-2 text-white/70 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                            </div>
                        ))}
                    </div>
                    {editPost && (
                        <div className="glass-card rounded-2xl p-6 space-y-3 mt-6">
                            <h3 className="font-bold text-lg">{editPost.id ? "Modifica" : "Nuovo"} Articolo</h3>
                            <input data-testid="post-title-input" className={input} placeholder="Titolo" value={editPost.title} onChange={(e) => setEditPost({ ...editPost, title: e.target.value })} />
                            <input className={input} placeholder="Slug (url)" value={editPost.slug} onChange={(e) => setEditPost({ ...editPost, slug: e.target.value })} />
                            <input className={input} placeholder="Excerpt" value={editPost.excerpt} onChange={(e) => setEditPost({ ...editPost, excerpt: e.target.value })} />
                            <input className={input} placeholder="URL Cover" value={editPost.cover_url} onChange={(e) => setEditPost({ ...editPost, cover_url: e.target.value })} />
                            <input className={input} placeholder="Tag (virgole)" value={editPost.tags} onChange={(e) => setEditPost({ ...editPost, tags: e.target.value })} />
                            <textarea className={input} rows="10" placeholder="Corpo (markdown)" value={editPost.body} onChange={(e) => setEditPost({ ...editPost, body: e.target.value })} />
                            <div className="flex gap-2">
                                <button data-testid="save-post-btn" onClick={savePost} className="btn-lava !text-xs !px-5 !py-2.5">Salva</button>
                                <button onClick={() => setEditPost(null)} className="btn-ghost !text-xs !px-5 !py-2.5">Annulla</button>
                            </div>
                        </div>
                    )}
                </TabsContent>

                {/* FAQ */}
                <TabsContent value="faqs" className="mt-6 space-y-4">
                    <button data-testid="new-faq-btn" onClick={() => setEditFaq(emptyFaq)} className="btn-lava !px-5 !py-2.5 !text-xs">
                        <Plus className="w-4 h-4" /> Nuova FAQ
                    </button>
                    <div className="grid gap-3">
                        {faqs.map((f) => (
                            <div key={f.id} className="glass-card rounded-xl p-4 flex items-center gap-4">
                                <div className="flex-1">
                                    <div className="font-bold text-white">{f.question}</div>
                                    <div className="text-xs text-white/60 line-clamp-2">{f.answer}</div>
                                </div>
                                <button onClick={() => setEditFaq(f)} className="p-2 text-white/70 hover:text-lava"><Edit className="w-4 h-4" /></button>
                                <button onClick={() => delFaq(f.id)} className="p-2 text-white/70 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                            </div>
                        ))}
                    </div>
                    {editFaq && (
                        <div className="glass-card rounded-2xl p-6 space-y-3 mt-6">
                            <h3 className="font-bold text-lg">{editFaq.id ? "Modifica" : "Nuova"} FAQ</h3>
                            <input data-testid="faq-question-input" className={input} placeholder="Domanda" value={editFaq.question} onChange={(e) => setEditFaq({ ...editFaq, question: e.target.value })} />
                            <textarea className={input} rows="4" placeholder="Risposta" value={editFaq.answer} onChange={(e) => setEditFaq({ ...editFaq, answer: e.target.value })} />
                            <input type="number" className={input} placeholder="Ordine" value={editFaq.order} onChange={(e) => setEditFaq({ ...editFaq, order: parseInt(e.target.value) || 0 })} />
                            <div className="flex gap-2">
                                <button data-testid="save-faq-btn" onClick={saveFaq} className="btn-lava !text-xs !px-5 !py-2.5">Salva</button>
                                <button onClick={() => setEditFaq(null)} className="btn-ghost !text-xs !px-5 !py-2.5">Annulla</button>
                            </div>
                        </div>
                    )}
                </TabsContent>

                {/* MEDIA */}
                <TabsContent value="media" className="mt-6 space-y-4">
                    <div className="flex items-center gap-3 flex-wrap">
                        <label data-testid="upload-media-btn" className="btn-lava !px-5 !py-2.5 !text-xs cursor-pointer inline-flex">
                            <Upload className="w-4 h-4" /> Carica Foto
                            <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files[0] && uploadMedia(e.target.files[0], mediaCategoryFilter || "gallery-eventi")} />
                        </label>
                        <select
                            data-testid="media-category-filter"
                            value={mediaCategoryFilter}
                            onChange={(e) => setMediaCategoryFilter(e.target.value)}
                            className="bg-surface border border-white/15 rounded-lg px-3 py-2 text-xs text-white/80"
                        >
                            <option value="">Tutte le categorie</option>
                            {(settings?.about_gallery_groups || []).map((g) => (
                                <option key={g.id} value={g.category}>{g.title} ({g.category})</option>
                            ))}
                            <option value="event-poster">Event poster</option>
                            <option value="event-artist">Event artist</option>
                            <option value="assets">Assets/Logo</option>
                        </select>
                        {mediaCategoryFilter && (
                            <span className="text-xs text-white/50">Le frecce ↑↓ definiscono l'ordine (le prime 4 di ogni categoria appaiono in Home)</span>
                        )}
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
                        {(mediaCategoryFilter ? media.filter((m) => m.category === mediaCategoryFilter) : media).map((m, idx, arr) => (
                            <div key={m.id} data-testid={`media-tile-${m.id}`} className="relative group rounded-xl overflow-hidden border border-white/10">
                                <img src={resolveMediaUrl(m)} alt="" className="w-full aspect-square object-cover" />
                                {mediaCategoryFilter && (
                                    <div className="absolute top-2 left-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition">
                                        <button
                                            data-testid={`media-up-${m.id}`}
                                            disabled={idx === 0}
                                            onClick={() => moveMedia(arr, idx, -1)}
                                            className="p-1.5 bg-black/70 text-white rounded-full disabled:opacity-30"
                                            title="Sposta su"
                                        >
                                            <ArrowUp className="w-3.5 h-3.5" />
                                        </button>
                                        <button
                                            data-testid={`media-down-${m.id}`}
                                            disabled={idx === arr.length - 1}
                                            onClick={() => moveMedia(arr, idx, 1)}
                                            className="p-1.5 bg-black/70 text-white rounded-full disabled:opacity-30"
                                            title="Sposta giù"
                                        >
                                            <ArrowDown className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                )}
                                <select
                                    data-testid={`media-cat-${m.id}`}
                                    value={m.category || ""}
                                    onChange={async (e) => {
                                        try { await api.patch(`/admin/media/${m.id}`, { category: e.target.value }); toast.success("Categoria aggiornata"); load(); } catch { toast.error("Errore"); }
                                    }}
                                    className="absolute bottom-2 left-2 right-10 bg-black/70 border border-white/20 rounded px-2 py-1 text-[10px] text-white/90 opacity-0 group-hover:opacity-100 transition"
                                >
                                    {(settings?.about_gallery_groups || []).map((g) => (
                                        <option key={g.id} value={g.category}>{g.title}</option>
                                    ))}
                                    <option value="event-poster">Event poster</option>
                                    <option value="event-artist">Event artist</option>
                                    <option value="assets">Assets</option>
                                </select>
                                <button onClick={() => delMedia(m.id)} className="absolute top-2 right-2 p-2 bg-red-500/80 text-white rounded-full opacity-0 group-hover:opacity-100 transition">
                                    <Trash2 className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        ))}
                    </div>
                    {mediaCategoryFilter && media.filter((m) => m.category === mediaCategoryFilter).length === 0 && (
                        <p className="text-white/40 text-sm italic mt-4">Nessuna foto in questa categoria.</p>
                    )}
                </TabsContent>

                {/* CONTENT — Home copy editor */}
                <TabsContent value="content" className="mt-6 space-y-6" data-testid="tab-content-content">
                    {!settings && <p className="text-white/60">Caricamento...</p>}
                    {settings && (
                        <div className="space-y-6">
                            {/* Quick-jump sub-menu: ogni sezione dei Contenuti ha il suo bottone */}
                            <div data-testid="content-submenu" className="sticky top-0 z-10 -mx-4 sm:-mx-6 lg:-mx-8 bg-obsidian/95 backdrop-blur border-b border-white/10 px-4 sm:px-6 lg:px-8 py-3">
                                <div className="flex flex-wrap gap-2">
                                    {[
                                        { id: "csec-home", label: "Home" },
                                        { id: "csec-about", label: "Il Club" },
                                        { id: "csec-contact", label: "Contatti" },
                                        { id: "csec-floorplan", label: "Piantina" },
                                        { id: "csec-nav", label: "Menu" },
                                        { id: "csec-footer", label: "Footer" },
                                        { id: "csec-shop", label: "Shop" },
                                        { id: "csec-private", label: "Eventi Privati" },
                                        { id: "csec-titles", label: "Titoli sezioni" },
                                        { id: "csec-poster", label: "Poster & SEO" },
                                    ].map((s) => (
                                        <button
                                            key={s.id}
                                            type="button"
                                            data-testid={`csub-${s.id}`}
                                            onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth", block: "start" })}
                                            className="px-3 py-1.5 rounded-full text-xs uppercase tracking-widest font-bold bg-white/5 border border-white/10 text-white/70 hover:bg-lava hover:text-white hover:border-lava transition"
                                        >
                                            {s.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div id="csec-home" className="scroll-mt-28">
                            <div className="glass-card rounded-2xl p-6 space-y-4">
                                <div>
                                    <h3 className="font-bold text-lg">Titolo Hero — "BEYOND / THE NIGHT"</h3>
                                    <p className="text-xs text-white/50 mt-1">Modifica il grande titolo animato in home. <b className="text-lava">Riga 1</b> = "BEYOND" (font editorial bianco). <b className="text-lava">Riga 2</b> = "THE NIGHT" (colore lava). Puoi mettere qualsiasi testo.</p>
                                </div>
                                <div className="grid gap-3 sm:grid-cols-2">
                                    <div>
                                        <label className="text-[10px] uppercase tracking-widest text-white/50 block mb-1">Riga 1 (bianca)</label>
                                        <input data-testid="content-hero-line1" className={input} placeholder="BEYOND" value={settings.home_hero_line1 || ""} onChange={(e) => setSettings({ ...settings, home_hero_line1: e.target.value })} />
                                    </div>
                                    <div>
                                        <label className="text-[10px] uppercase tracking-widest text-white/50 block mb-1">Riga 2 (rossa lava)</label>
                                        <input data-testid="content-hero-line2" className={input} placeholder="THE NIGHT" value={settings.home_hero_line2 || ""} onChange={(e) => setSettings({ ...settings, home_hero_line2: e.target.value })} />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs uppercase tracking-widest text-white/60 block mb-2">Sottotitolo hero</label>
                                    <textarea data-testid="content-hero-subtitle" className={input} rows="3" value={settings.home_hero_subtitle || ""} onChange={(e) => setSettings({ ...settings, home_hero_subtitle: e.target.value })} />
                                </div>
                                <div>
                                    <label className="text-xs uppercase tracking-widest text-white/60 block mb-2">Testo sopra countdown (es. OPENING PARTY)</label>
                                    <input data-testid="content-opening-title" className={input} value={settings.home_opening_title || ""} onChange={(e) => setSettings({ ...settings, home_opening_title: e.target.value })} />
                                </div>
                            </div>

                            <div className="glass-card rounded-2xl p-6 space-y-4">
                                <h3 className="font-bold text-lg">Sezione "Prossimi Eventi"</h3>
                                <div className="grid gap-3 sm:grid-cols-2">
                                    <div>
                                        <label className="text-xs uppercase tracking-widest text-white/60 block mb-2">Kicker (piccolo, rosso)</label>
                                        <input data-testid="content-events-kicker" className={input} value={settings.home_events_kicker || ""} onChange={(e) => setSettings({ ...settings, home_events_kicker: e.target.value })} />
                                    </div>
                                    <div>
                                        <label className="text-xs uppercase tracking-widest text-white/60 block mb-2">Titolo sezione</label>
                                        <input data-testid="content-events-title" className={input} value={settings.home_events_title || ""} onChange={(e) => setSettings({ ...settings, home_events_title: e.target.value })} />
                                    </div>
                                </div>
                            </div>

                            <div className="glass-card rounded-2xl p-6 space-y-4">
                                <h3 className="font-bold text-lg">Sezione Location</h3>
                                <div className="grid gap-3 sm:grid-cols-2">
                                    <div>
                                        <label className="text-xs uppercase tracking-widest text-white/60 block mb-2">Kicker</label>
                                        <input data-testid="content-location-kicker" className={input} value={settings.home_location_kicker || ""} onChange={(e) => setSettings({ ...settings, home_location_kicker: e.target.value })} />
                                    </div>
                                    <div>
                                        <label className="text-xs uppercase tracking-widest text-white/60 block mb-2">Titolo (usa \n per andare a capo)</label>
                                        <input data-testid="content-location-title" className={input} value={settings.home_location_title || ""} onChange={(e) => setSettings({ ...settings, home_location_title: e.target.value })} />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs uppercase tracking-widest text-white/60 block mb-2">Descrizione</label>
                                    <textarea data-testid="content-location-body" className={input} rows="3" value={settings.home_location_body || ""} onChange={(e) => setSettings({ ...settings, home_location_body: e.target.value })} />
                                </div>
                            </div>

                            <div className="glass-card rounded-2xl p-6 space-y-4">
                                <h3 className="font-bold text-lg">Sezione FAQ (intro)</h3>
                                <div>
                                    <label className="text-xs uppercase tracking-widest text-white/60 block mb-2">Titolo (usa \n per andare a capo)</label>
                                    <input data-testid="content-faq-title" className={input} value={settings.home_faq_title || ""} onChange={(e) => setSettings({ ...settings, home_faq_title: e.target.value })} />
                                </div>
                                <div>
                                    <label className="text-xs uppercase tracking-widest text-white/60 block mb-2">Testo introduttivo</label>
                                    <textarea data-testid="content-faq-intro" className={input} rows="3" value={settings.home_faq_intro || ""} onChange={(e) => setSettings({ ...settings, home_faq_intro: e.target.value })} />
                                </div>
                            </div>

                            <div className="glass-card rounded-2xl p-6 space-y-4">
                                <h3 className="font-bold text-lg">Anteprima Gallery (Home)</h3>
                                <p className="text-xs text-white/50">Titolo e kicker sopra le 4 foto anteprima gallery in Home.</p>
                                <div className="grid gap-3 sm:grid-cols-2">
                                    <div>
                                        <label className="text-xs uppercase tracking-widest text-white/60 block mb-2">Kicker (piccolo, rosso)</label>
                                        <input data-testid="content-gallery-preview-kicker" className={input} placeholder="Lascia vuoto per usare il nome della prima sottosezione" value={settings.home_gallery_preview_kicker || ""} onChange={(e) => setSettings({ ...settings, home_gallery_preview_kicker: e.target.value })} />
                                    </div>
                                    <div>
                                        <label className="text-xs uppercase tracking-widest text-white/60 block mb-2">Titolo</label>
                                        <input data-testid="content-gallery-preview-title" className={input} placeholder="Uno sguardo dentro" value={settings.home_gallery_preview_title || ""} onChange={(e) => setSettings({ ...settings, home_gallery_preview_title: e.target.value })} />
                                    </div>
                                </div>
                            </div>

                            {/* ================ PAGINA IL CLUB ================ */}
                            </div>
                            <div id="csec-about" className="scroll-mt-28">
                            <div className="pt-6 border-t border-white/10 space-y-6" data-testid="about-editor">
                                <div>
                                    <h2 className="text-2xl font-black uppercase tracking-tight text-lava">Pagina "Il Club"</h2>
                                    <p className="text-xs text-white/50 mt-1">Testi, statistiche, ambienti (ordinabili) e location della pagina /il-club.</p>
                                </div>

                                <div className="glass-card rounded-2xl p-6 space-y-4">
                                    <h3 className="font-bold text-lg">Hero</h3>
                                    <div className="grid gap-3 sm:grid-cols-2">
                                        <div>
                                            <label className="text-xs uppercase tracking-widest text-white/60 block mb-2">Kicker</label>
                                            <input data-testid="about-kicker" className={input} value={settings.about_kicker || ""} onChange={(e) => setSettings({ ...settings, about_kicker: e.target.value })} />
                                        </div>
                                        <div>
                                            <label className="text-xs uppercase tracking-widest text-white/60 block mb-2">Immagine hero (URL)</label>
                                            <input data-testid="about-hero-image" className={input} value={settings.about_hero_image_url || ""} onChange={(e) => setSettings({ ...settings, about_hero_image_url: e.target.value })} />
                                        </div>
                                        <input data-testid="about-hero-line1" className={input} placeholder="Titolo riga 1" value={settings.about_hero_line1 || ""} onChange={(e) => setSettings({ ...settings, about_hero_line1: e.target.value })} />
                                        <input data-testid="about-hero-line2" className={input} placeholder="Titolo riga 2 (colorata)" value={settings.about_hero_line2 || ""} onChange={(e) => setSettings({ ...settings, about_hero_line2: e.target.value })} />
                                    </div>
                                    <div>
                                        <label className="text-xs uppercase tracking-widest text-white/60 block mb-2">Sottotitolo hero</label>
                                        <textarea data-testid="about-hero-subtitle" className={input} rows="3" value={settings.about_hero_subtitle || ""} onChange={(e) => setSettings({ ...settings, about_hero_subtitle: e.target.value })} />
                                    </div>
                                </div>

                                <div className="glass-card rounded-2xl p-6 space-y-4">
                                    <h3 className="font-bold text-lg">Statistiche (3 card)</h3>
                                    <div className="grid gap-3 sm:grid-cols-3">
                                        {[1, 2, 3].map((n) => (
                                            <div key={n} className="space-y-2 p-3 rounded-lg bg-black/20">
                                                <label className="text-xs uppercase tracking-widest text-white/60 block">Stat {n}</label>
                                                <input data-testid={`about-stat-${n}-value`} className={input} placeholder="Valore (es. 2000)" value={settings[`about_stat_${n}_value`] || ""} onChange={(e) => setSettings({ ...settings, [`about_stat_${n}_value`]: e.target.value })} />
                                                <input data-testid={`about-stat-${n}-label`} className={input} placeholder="Etichetta" value={settings[`about_stat_${n}_label`] || ""} onChange={(e) => setSettings({ ...settings, [`about_stat_${n}_label`]: e.target.value })} />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="glass-card rounded-2xl p-6 space-y-4" data-testid="about-zones-editor">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-bold text-lg">Ambienti (trascinabili)</h3>
                                        <button data-testid="add-zone-btn" onClick={addZone} className="btn-lava !px-3 !py-1.5 !text-xs">
                                            <Plus className="w-3 h-3" /> Aggiungi ambiente
                                        </button>
                                    </div>
                                    {(settings.about_zones || []).length === 0 && (
                                        <p className="text-white/50 text-sm">Nessun ambiente. Clicca "Aggiungi ambiente" per iniziare.</p>
                                    )}
                                    <div className="space-y-4">
                                        {(settings.about_zones || []).map((z, i) => {
                                            const highlightsStr = Array.isArray(z.highlights) ? z.highlights.join("\n") : (z.highlights || "");
                                            return (
                                                <div key={z.id || i} data-testid={`zone-editor-${i}`} className="rounded-xl border border-white/10 p-4 space-y-3 bg-black/30">
                                                    <div className="flex items-center justify-between gap-2">
                                                        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-lava font-bold">
                                                            Ambiente {String(i + 1).padStart(2, "0")}
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <button data-testid={`zone-up-${i}`} onClick={() => moveZone(i, -1)} disabled={i === 0} className="p-2 rounded-lg border border-white/10 hover:border-lava/50 disabled:opacity-30" title="Sposta su">
                                                                <ArrowUp className="w-4 h-4" />
                                                            </button>
                                                            <button data-testid={`zone-down-${i}`} onClick={() => moveZone(i, 1)} disabled={i === (settings.about_zones || []).length - 1} className="p-2 rounded-lg border border-white/10 hover:border-lava/50 disabled:opacity-30" title="Sposta giù">
                                                                <ArrowDown className="w-4 h-4" />
                                                            </button>
                                                            <button data-testid={`zone-del-${i}`} onClick={() => { if (window.confirm("Eliminare questo ambiente?")) removeZone(i); }} className="p-2 rounded-lg border border-white/10 hover:border-lava/50 text-lava" title="Elimina">
                                                                <Trash2 className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="grid gap-3 lg:grid-cols-[160px_1fr]">
                                                        <div className="space-y-2">
                                                            {z.image ? (
                                                                <img src={z.image.startsWith("http") ? z.image : `${process.env.REACT_APP_BACKEND_URL}${z.image}`} alt="preview" className="w-full aspect-[4/5] object-cover rounded-lg border border-white/10" />
                                                            ) : (
                                                                <div className="w-full aspect-[4/5] rounded-lg border border-dashed border-white/15 flex items-center justify-center text-white/40 text-xs">Nessuna foto</div>
                                                            )}
                                                            <label className="btn-ghost !text-xs !px-2 !py-1.5 cursor-pointer flex items-center justify-center gap-1 w-full">
                                                                <Upload className="w-3 h-3" /> Carica foto
                                                                <input data-testid={`zone-upload-${i}`} type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && uploadZoneImage(i, e.target.files[0])} />
                                                            </label>
                                                        </div>
                                                        <div className="space-y-2">
                                                            <div className="grid gap-2 sm:grid-cols-2">
                                                                <input data-testid={`zone-title-${i}`} className={input} placeholder="Titolo (es. Riva Deck)" value={z.title || ""} onChange={(e) => updateZone(i, { title: e.target.value })} />
                                                                <input data-testid={`zone-subtitle-${i}`} className={input} placeholder="Sottotitolo" value={z.subtitle || ""} onChange={(e) => updateZone(i, { subtitle: e.target.value })} />
                                                            </div>
                                                            <input data-testid={`zone-image-${i}`} className={input} placeholder="URL immagine (o usa Carica foto)" value={z.image || ""} onChange={(e) => updateZone(i, { image: e.target.value })} />
                                                            <textarea data-testid={`zone-description-${i}`} className={input} rows="3" placeholder="Descrizione" value={z.description || ""} onChange={(e) => updateZone(i, { description: e.target.value })} />
                                                            <textarea data-testid={`zone-highlights-${i}`} className={input} rows="3" placeholder={"Punti chiave (uno per riga)\nEs: Vista mare\nAccesso riservato"} value={highlightsStr} onChange={(e) => updateZone(i, { highlights: e.target.value.split("\n") })} />
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                <div className="glass-card rounded-2xl p-6 space-y-4">
                                    <h3 className="font-bold text-lg">Location (fondo pagina)</h3>
                                    <input data-testid="about-location-title" className={input} placeholder="Titolo indirizzo" value={settings.about_location_title || ""} onChange={(e) => setSettings({ ...settings, about_location_title: e.target.value })} />
                                    <textarea data-testid="about-location-body" className={input} rows="2" placeholder="Descrizione breve" value={settings.about_location_body || ""} onChange={(e) => setSettings({ ...settings, about_location_body: e.target.value })} />
                                </div>

                                <div className="glass-card rounded-2xl p-6 space-y-4">
                                    <h3 className="font-bold text-lg">Sezione Gallery (fondo pagina)</h3>
                                    <div className="grid gap-3 sm:grid-cols-2">
                                        <input data-testid="about-gallery-kicker" className={input} placeholder="Kicker" value={settings.about_gallery_kicker || ""} onChange={(e) => setSettings({ ...settings, about_gallery_kicker: e.target.value })} />
                                        <input data-testid="about-gallery-title" className={input} placeholder="Titolo" value={settings.about_gallery_title || ""} onChange={(e) => setSettings({ ...settings, about_gallery_title: e.target.value })} />
                                    </div>
                                    <div className="pt-3 border-t border-white/10 space-y-3">
                                        <div className="flex items-center justify-between">
                                            <h4 className="font-bold text-sm">Sottosezioni della gallery</h4>
                                            <button
                                                data-testid="add-gallery-group-btn"
                                                onClick={() => {
                                                    const list = [...(settings.about_gallery_groups || [])];
                                                    list.push({ id: `grp-${Date.now()}`, title: "Nuova sezione", category: `gallery-${Date.now()}` });
                                                    setSettings({ ...settings, about_gallery_groups: list });
                                                }}
                                                className="btn-lava !px-3 !py-1.5 !text-xs"
                                            >
                                                <Plus className="w-3 h-3" /> Aggiungi
                                            </button>
                                        </div>
                                        <p className="text-xs text-white/50">Ogni sottosezione è una categoria: carica le foto nel tab <b>Media</b> selezionando la stessa categoria (es. <code className="text-lava">gallery-eventi</code>).</p>
                                        <div className="space-y-2">
                                            {(settings.about_gallery_groups || []).map((g, i) => (
                                                <div key={g.id || i} data-testid={`gallery-group-editor-${i}`} className="rounded-xl border border-white/10 p-3 bg-black/30 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                                                    <span className="text-[10px] uppercase tracking-widest text-lava font-bold sm:w-16">#{i + 1}</span>
                                                    <input
                                                        data-testid={`gallery-group-title-${i}`}
                                                        className={input}
                                                        placeholder="Titolo (es. Eventi & Pubblico)"
                                                        value={g.title || ""}
                                                        onChange={(e) => {
                                                            const list = [...(settings.about_gallery_groups || [])];
                                                            list[i] = { ...list[i], title: e.target.value };
                                                            setSettings({ ...settings, about_gallery_groups: list });
                                                        }}
                                                    />
                                                    <input
                                                        data-testid={`gallery-group-category-${i}`}
                                                        className={input}
                                                        placeholder="Categoria slug (es. gallery-eventi)"
                                                        value={g.category || ""}
                                                        onChange={(e) => {
                                                            const list = [...(settings.about_gallery_groups || [])];
                                                            list[i] = { ...list[i], category: e.target.value };
                                                            setSettings({ ...settings, about_gallery_groups: list });
                                                        }}
                                                    />
                                                    <div className="flex gap-1">
                                                        <button data-testid={`gallery-group-up-${i}`} disabled={i === 0} onClick={() => {
                                                            const list = [...(settings.about_gallery_groups || [])];
                                                            [list[i - 1], list[i]] = [list[i], list[i - 1]];
                                                            setSettings({ ...settings, about_gallery_groups: list });
                                                        }} className="p-2 rounded-lg border border-white/10 hover:border-lava/50 disabled:opacity-30">
                                                            <ArrowUp className="w-4 h-4" />
                                                        </button>
                                                        <button data-testid={`gallery-group-down-${i}`} disabled={i === (settings.about_gallery_groups || []).length - 1} onClick={() => {
                                                            const list = [...(settings.about_gallery_groups || [])];
                                                            [list[i + 1], list[i]] = [list[i], list[i + 1]];
                                                            setSettings({ ...settings, about_gallery_groups: list });
                                                        }} className="p-2 rounded-lg border border-white/10 hover:border-lava/50 disabled:opacity-30">
                                                            <ArrowDown className="w-4 h-4" />
                                                        </button>
                                                        <button data-testid={`gallery-group-del-${i}`} onClick={() => {
                                                            if (!window.confirm("Eliminare questa sottosezione?")) return;
                                                            const list = [...(settings.about_gallery_groups || [])];
                                                            list.splice(i, 1);
                                                            setSettings({ ...settings, about_gallery_groups: list });
                                                        }} className="p-2 rounded-lg border border-white/10 hover:border-lava/50 text-lava">
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* ================ PAGINA CONTATTI ================ */}
                            </div>
                            <div id="csec-contact" className="scroll-mt-28">
                            <div className="pt-6 border-t border-white/10 space-y-6" data-testid="contact-editor">
                                <div>
                                    <h2 className="text-2xl font-black uppercase tracking-tight text-lava">Pagina "Contatti"</h2>
                                    <p className="text-xs text-white/50 mt-1">WhatsApp, email, indirizzo, orari e mappa Google della pagina /contatti.</p>
                                </div>

                                <div className="glass-card rounded-2xl p-6 space-y-4">
                                    <h3 className="font-bold text-lg">Titolo pagina</h3>
                                    <div className="grid gap-3 sm:grid-cols-2">
                                        <input data-testid="contact-kicker" className={input} placeholder="Kicker (es. Contatti)" value={settings.contact_kicker || ""} onChange={(e) => setSettings({ ...settings, contact_kicker: e.target.value })} />
                                        <input data-testid="contact-title-input" className={input} placeholder="Titolo (es. Scrivici)" value={settings.contact_title || ""} onChange={(e) => setSettings({ ...settings, contact_title: e.target.value })} />
                                    </div>
                                </div>

                                <div className="glass-card rounded-2xl p-6 space-y-4">
                                    <h3 className="font-bold text-lg">Canali</h3>
                                    <div className="grid gap-3 sm:grid-cols-2">
                                        <div>
                                            <label className="text-xs uppercase tracking-widest text-white/60 block mb-2">WhatsApp numero (solo cifre, con prefisso: 39...)</label>
                                            <input data-testid="contact-wa-number" className={input} placeholder="393444289232" value={settings.contact_whatsapp_number || ""} onChange={(e) => setSettings({ ...settings, contact_whatsapp_number: e.target.value })} />
                                        </div>
                                        <div>
                                            <label className="text-xs uppercase tracking-widest text-white/60 block mb-2">WhatsApp visualizzato</label>
                                            <input data-testid="contact-wa-display" className={input} placeholder="344 4289232" value={settings.contact_whatsapp_display || ""} onChange={(e) => setSettings({ ...settings, contact_whatsapp_display: e.target.value })} />
                                        </div>
                                        <div>
                                            <label className="text-xs uppercase tracking-widest text-white/60 block mb-2">Email</label>
                                            <input data-testid="contact-email-input" className={input} placeholder="glitzclubofficial@gmail.com" value={settings.contact_email || ""} onChange={(e) => setSettings({ ...settings, contact_email: e.target.value })} />
                                        </div>
                                        <div>
                                            <label className="text-xs uppercase tracking-widest text-white/60 block mb-2">Instagram URL</label>
                                            <input data-testid="contact-ig-url" className={input} placeholder="https://instagram.com/..." value={settings.contact_instagram || ""} onChange={(e) => setSettings({ ...settings, contact_instagram: e.target.value })} />
                                        </div>
                                        <div>
                                            <label className="text-xs uppercase tracking-widest text-white/60 block mb-2">Instagram handle mostrato</label>
                                            <input data-testid="contact-ig-handle" className={input} placeholder="@glitzclubofficial" value={settings.contact_instagram_handle || ""} onChange={(e) => setSettings({ ...settings, contact_instagram_handle: e.target.value })} />
                                        </div>
                                    </div>
                                </div>

                                <div className="glass-card rounded-2xl p-6 space-y-4">
                                    <h3 className="font-bold text-lg">Indirizzo e orari</h3>
                                    <input data-testid="contact-address-input" className={input} placeholder="Contrada Dino, San Nicola Arcella (CS), 87020" value={settings.contact_address || ""} onChange={(e) => setSettings({ ...settings, contact_address: e.target.value })} />
                                    <div>
                                        <label className="text-xs uppercase tracking-widest text-white/60 block mb-2">Orari (puoi andare a capo)</label>
                                        <textarea data-testid="contact-hours-input" className={input} rows="3" placeholder={"Aperto solo la sera, dal giovedì alla domenica\nGiugno – Settembre · 22:00 – 05:00"} value={settings.contact_hours || ""} onChange={(e) => setSettings({ ...settings, contact_hours: e.target.value })} />
                                    </div>
                                </div>

                                <div className="glass-card rounded-2xl p-6 space-y-3">
                                    <h3 className="font-bold text-lg">Mappa Google</h3>
                                    <p className="text-xs text-white/50">URL <b>embed</b> di Google Maps (deve contenere <code>output=embed</code> o essere un embed link).</p>
                                    <input data-testid="contact-map-input" className={input} placeholder="https://www.google.com/maps?q=...&output=embed" value={settings.contact_map_embed_url || ""} onChange={(e) => setSettings({ ...settings, contact_map_embed_url: e.target.value })} />
                                    {settings.contact_map_embed_url && (
                                        <div className="rounded-xl overflow-hidden border border-white/10 mt-3 aspect-video">
                                            <iframe title="Anteprima mappa" src={settings.contact_map_embed_url} className="w-full h-full border-0" loading="lazy" />
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* ================ FLOORPLAN — Prezzi & Bottiglie ================ */}
                            </div>
                            <div id="csec-floorplan" className="scroll-mt-28">
                            <div className="pt-6 border-t border-white/10 space-y-6" data-testid="floorplan-editor">
                                <div>
                                    <h2 className="text-2xl font-black uppercase tracking-tight text-lava">Piantina — Prezzi & Bottiglie</h2>
                                    <p className="text-xs text-white/50 mt-1">Testi e prezzi mostrati sotto la piantina "Scegli il tuo tavolo" e nel modale di prenotazione per ogni zona.</p>
                                </div>

                                {/* Anteprima live piantina */}
                                <div data-testid="floorplan-live-preview" className="glass-card rounded-2xl p-4">
                                    <div className="text-xs uppercase tracking-widest text-white/60 mb-2">Anteprima live</div>
                                    <svg viewBox="0 0 1254 1254" className="w-full max-w-[420px] h-auto block rounded-lg" style={{ background: "#0a0a0a" }}>
                                        {(() => {
                                            const zoneMap = {};
                                            (settings.floorplan_zones || []).forEach((z) => { if (z.id) zoneMap[z.id] = z; });
                                            // Zone bounding rectangles (approximate)
                                            const boxes = [
                                                { id: "STAGE", x: 40, y: 130, w: 520, h: 680 },
                                                { id: "RIVA", x: 580, y: 190, w: 660, h: 380 },
                                                { id: "BAR", x: 90, y: 790, w: 430, h: 320 },
                                            ];
                                            return boxes.map((b) => {
                                                const z = zoneMap[b.id] || {};
                                                const color = z.color || "#666";
                                                return (
                                                    <g key={b.id}>
                                                        <rect x={b.x} y={b.y} width={b.w} height={b.h} rx="20" fill={`${color}30`} stroke={color} strokeWidth="4" />
                                                        <text x={b.x + b.w / 2} y={b.y + b.h / 2 - 15} textAnchor="middle" fill="#fff" fontSize="42" fontWeight="900">{z.label || b.id}</text>
                                                        {z.price_from && (
                                                            <text x={b.x + b.w / 2} y={b.y + b.h / 2 + 30} textAnchor="middle" fill={color} fontSize="34" fontWeight="700">Da {z.price_from}</text>
                                                        )}
                                                    </g>
                                                );
                                            });
                                        })()}
                                    </svg>
                                </div>

                                <div className="space-y-3">
                                    {["STAGE", "RIVA", "BAR"].map((zid) => {
                                        const list = settings.floorplan_zones || [];
                                        const idx0 = list.findIndex((z) => z.id === zid);
                                        const z = idx0 >= 0 ? list[idx0] : { id: zid, label: zid, color: "#E10600", price_from: "", min_spend: "", bottles: "", description: "" };
                                        const setField = (patch) => {
                                            const next = [...(settings.floorplan_zones || [])];
                                            const idx = next.findIndex((x) => x.id === zid);
                                            if (idx < 0) next.push({ ...z, ...patch });
                                            else next[idx] = { ...next[idx], ...patch };
                                            setSettings({ ...settings, floorplan_zones: next });
                                        };
                                        const saveZone = async () => {
                                            try {
                                                await api.put("/admin/settings", { floorplan_zones: settings.floorplan_zones });
                                                toast.success(`Zona ${z.label} salvata`);
                                            } catch { toast.error("Errore salvataggio zona"); }
                                        };
                                        // Riva table overrides
                                        const RIVA_IDS = ["R1","R2","R3","R4","R5","R6","R7","R8","R9","R10","R11","R12","R13","R14","R15","R16"];
                                        const tos = settings.floorplan_table_overrides || {};
                                        const setTableOverride = (tid, patch) => {
                                            const next = { ...(settings.floorplan_table_overrides || {}) };
                                            next[tid] = { ...(next[tid] || {}), ...patch };
                                            setSettings({ ...settings, floorplan_table_overrides: next });
                                        };
                                        const saveOverrides = async () => {
                                            try {
                                                await api.put("/admin/settings", { floorplan_table_overrides: settings.floorplan_table_overrides });
                                                toast.success("Prezzi tavoli Riva salvati");
                                            } catch { toast.error("Errore salvataggio"); }
                                        };
                                        return (
                                            <div key={zid} data-testid={`floorplan-zone-${zid}`} className="glass-card rounded-2xl p-5 space-y-3 border-l-4" style={{ borderLeftColor: z.color || "#E10600" }}>
                                                <div className="flex items-center justify-between gap-3">
                                                    <div className="text-sm font-black uppercase tracking-wide text-white">{z.label || zid}</div>
                                                    <button data-testid={`save-zone-${zid}`} onClick={saveZone} className="btn-lava !px-3 !py-1.5 !text-xs">
                                                        <Check className="w-3 h-3" /> Salva zona
                                                    </button>
                                                </div>
                                                <div className="grid gap-3 sm:grid-cols-3">
                                                    <input data-testid={`floorplan-${zid}-label`} className={input} placeholder="Nome zona" value={z.label || ""} onChange={(e) => setField({ label: e.target.value })} />
                                                    <input data-testid={`floorplan-${zid}-color`} type="color" className={`${input} h-11`} value={z.color || "#E10600"} onChange={(e) => setField({ color: e.target.value })} />
                                                    <input data-testid={`floorplan-${zid}-price`} className={input} placeholder="Prezzo da (es. € 400)" value={z.price_from || ""} onChange={(e) => setField({ price_from: e.target.value })} />
                                                </div>
                                                <div className="grid gap-3 sm:grid-cols-2">
                                                    <input data-testid={`floorplan-${zid}-min`} className={input} placeholder="Consumazione minima" value={z.min_spend || ""} onChange={(e) => setField({ min_spend: e.target.value })} />
                                                    <input data-testid={`floorplan-${zid}-bottles`} className={input} placeholder="Bottiglie incluse" value={z.bottles || ""} onChange={(e) => setField({ bottles: e.target.value })} />
                                                </div>
                                                <textarea data-testid={`floorplan-${zid}-desc`} rows="2" className={input} placeholder="Descrizione breve" value={z.description || ""} onChange={(e) => setField({ description: e.target.value })} />

                                                {zid === "RIVA" && (
                                                    <div className="pt-4 mt-3 border-t border-white/10 space-y-3" data-testid="riva-table-overrides">
                                                        <div className="flex items-center justify-between">
                                                            <div className="text-xs uppercase tracking-widest text-lava font-bold">Prezzo per singolo tavolo Riva Deck</div>
                                                            <button data-testid="save-riva-overrides" onClick={saveOverrides} className="btn-lava !px-3 !py-1.5 !text-xs">
                                                                <Check className="w-3 h-3" /> Salva prezzi tavoli
                                                            </button>
                                                        </div>
                                                        <p className="text-[10px] text-white/50">Lascia vuoto per usare il prezzo di zona. Compila solo i tavoli premium (es. R1-R4 vista mare).</p>
                                                        <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
                                                            {RIVA_IDS.map((tid) => {
                                                                const ov = tos[tid] || {};
                                                                return (
                                                                    <div key={tid} className="rounded-lg border border-white/10 bg-black/30 p-2 space-y-1">
                                                                        <div className="text-[10px] uppercase tracking-widest text-white/50 font-bold">Tavolo {tid}</div>
                                                                        <input data-testid={`riva-${tid}-price`} className={`${input} !py-1.5 !text-xs`} placeholder="Prezzo" value={ov.price_from || ""} onChange={(e) => setTableOverride(tid, { price_from: e.target.value })} />
                                                                        <input data-testid={`riva-${tid}-bottles`} className={`${input} !py-1.5 !text-xs`} placeholder="Bottiglie" value={ov.bottles || ""} onChange={(e) => setTableOverride(tid, { bottles: e.target.value })} />
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                                {/* ============ EDITOR PIANTINA v2 (label + tavoli + zone extra) ============ */}
                                <div className="glass-card rounded-2xl p-5 space-y-4" data-testid="floorplan-editor-v2">
                                    <div className="flex items-center justify-between flex-wrap gap-2">
                                        <h3 className="font-bold text-lg">Etichette privé & Tavoli</h3>
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <label data-testid="snap-toggle" className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border cursor-pointer text-xs font-semibold transition ${snapToGrid ? "border-emerald-400/60 bg-emerald-400/10 text-emerald-300" : "border-white/15 bg-white/5 text-white/60 hover:text-white"}`}>
                                                <input type="checkbox" className="hidden" checked={snapToGrid} onChange={(e) => setSnapToGrid(e.target.checked)} data-testid="snap-checkbox" />
                                                <span className={`w-3 h-3 rounded-sm border ${snapToGrid ? "bg-emerald-400 border-emerald-400" : "border-white/40"}`} />
                                                Snap griglia
                                            </label>
                                            <select data-testid="snap-size" value={gridSize} onChange={(e) => setGridSize(parseInt(e.target.value, 10) || 10)} disabled={!snapToGrid} className={`text-xs rounded-lg border px-2 py-1.5 font-semibold ${snapToGrid ? "border-emerald-400/40 bg-black/40 text-emerald-300" : "border-white/10 bg-white/5 text-white/30"}`}>
                                                <option value={5}>5 px</option>
                                                <option value={10}>10 px</option>
                                                <option value={20}>20 px</option>
                                                <option value={25}>25 px</option>
                                                <option value={50}>50 px</option>
                                            </select>
                                            <button data-testid="save-floorplan-v2" onClick={async () => {
                                                try {
                                                    await api.put("/admin/settings", {
                                                        floorplan_anchors: settings.floorplan_anchors || {},
                                                        floorplan_tables: settings.floorplan_tables || [],
                                                        floorplan_extra_zones: settings.floorplan_extra_zones || [],
                                                    });
                                                    toast.success("Piantina salvata");
                                                } catch { toast.error("Errore salvataggio"); }
                                            }} className="btn-lava !px-3 !py-1.5 !text-xs"><Check className="w-3 h-3" /> Salva</button>
                                        </div>
                                    </div>
                                    <p className="text-[11px] text-white/50">Coordinate riferite alla PNG 1254×1254. Con lo <b className="text-emerald-400">Snap griglia</b> attivo, tavoli ed etichette si allineano automaticamente ai multipli di {gridSize}px durante il drag.</p>

                                    {/* PREVIEW LIVE PIANTINA */}
                                    {(() => {
                                        const anchorsMap = settings.floorplan_anchors || {};
                                        const extras = settings.floorplan_extra_zones || [];
                                        const tables = (settings.floorplan_tables && settings.floorplan_tables.length) ? settings.floorplan_tables : [
                                            {id:"B0",x:78,y:193,zone:"STAGE"},{id:"B2",x:170,y:193,zone:"STAGE"},{id:"B4",x:263,y:193,zone:"STAGE"},{id:"B1",x:105,y:260,zone:"STAGE"},{id:"B3",x:206,y:260,zone:"STAGE"},{id:"B5",x:90,y:345,zone:"STAGE"},{id:"B6",x:200,y:345,zone:"STAGE"},{id:"B7",x:90,y:413,zone:"STAGE"},{id:"B8",x:75,y:625,zone:"STAGE"},{id:"B9",x:161,y:625,zone:"STAGE"},{id:"B10",x:248,y:625,zone:"STAGE"},{id:"B11",x:324,y:696,zone:"STAGE"},{id:"B12",x:399,y:716,zone:"STAGE"},{id:"B13",x:477,y:740,zone:"STAGE"},{id:"B14",x:389,y:769,zone:"STAGE"},{id:"B15",x:81,y:746,zone:"STAGE"},
                                            {id:"R1",x:606,y:235,zone:"RIVA"},{id:"R5",x:747,y:238,zone:"RIVA"},{id:"R9",x:904,y:237,zone:"RIVA"},{id:"R13",x:1072,y:237,zone:"RIVA"},{id:"R2",x:617,y:316,zone:"RIVA"},{id:"R6",x:762,y:316,zone:"RIVA"},{id:"R10",x:915,y:316,zone:"RIVA"},{id:"R14",x:1083,y:316,zone:"RIVA"},{id:"R3",x:633,y:417,zone:"RIVA"},{id:"R7",x:771,y:440,zone:"RIVA"},{id:"R11",x:933,y:440,zone:"RIVA"},{id:"R15",x:1096,y:440,zone:"RIVA"},{id:"R4",x:645,y:506,zone:"RIVA"},{id:"R8",x:792,y:514,zone:"RIVA"},{id:"R12",x:955,y:515,zone:"RIVA"},{id:"R16",x:1112,y:512,zone:"RIVA"},
                                            {id:"G1",x:135,y:819,zone:"BAR"},{id:"G2",x:212,y:861,zone:"BAR"},{id:"G3",x:144,y:913,zone:"BAR"},{id:"G8",x:379,y:939,zone:"BAR"},{id:"G4",x:176,y:977,zone:"BAR"},{id:"G5",x:160,y:1035,zone:"BAR"},{id:"G7",x:370,y:1036,zone:"BAR"},{id:"G6",x:262,y:1069,zone:"BAR"},
                                        ];
                                        const defAnchors = { STAGE: { cover_x: 85, cover_y: 660, cover_w: 210, cover_h: 40, label_x: 190, label_y: 686, font_size: 18 }, RIVA: { cover_x: 842, cover_y: 360, cover_w: 165, cover_h: 40, label_x: 924, label_y: 388, font_size: 20 }, BAR: { cover_x: 205, cover_y: 940, cover_w: 145, cover_h: 40, label_x: 278, label_y: 967, font_size: 20 } };
                                        const zoneColors = { STAGE: "#E10600", RIVA: "#22D3EE", BAR: "#F59E0B" };
                                        const zoneLabels = { STAGE: "BACK THE STAGE", RIVA: "RIVA DECK", BAR: "GLITZ BAR" };
                                        const allZoneIds = ["STAGE", "RIVA", "BAR", ...extras.map((z) => z.id)];
                                        return (
                                            <div className="rounded-lg border border-emerald-500/20 bg-black/50 p-3">
                                                <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-emerald-400 font-black mb-2">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Preview live piantina
                                                </div>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 1254 1254"
                                                    preserveAspectRatio="xMidYMid meet"
                                                    className="w-full max-w-[600px] mx-auto block bg-obsidian select-none"
                                                    style={{ aspectRatio: "1 / 1", touchAction: "none" }}
                                                    ref={previewSvgRef}
                                                    onPointerMove={(e) => {
                                                        if (!dragTarget) return;
                                                        const p = clientToSvg(e.clientX, e.clientY); if (!p) return;
                                                        if (dragTarget.type === "table") {
                                                            const list = [...(settings.floorplan_tables || [])];
                                                            const i = list.findIndex((t) => t.id === dragTarget.id);
                                                            if (i < 0) {
                                                                // popola con default poi trova
                                                                return;
                                                            }
                                                            list[i] = { ...list[i], x: p.x, y: p.y };
                                                            setSettings({ ...settings, floorplan_tables: list });
                                                        } else if (dragTarget.type === "label") {
                                                            const anchors = { ...(settings.floorplan_anchors || {}) };
                                                            const zid = dragTarget.id;
                                                            const defaults = { STAGE: { cover_x: 85, cover_y: 660, cover_w: 210, cover_h: 40, label_x: 190, label_y: 686, font_size: 18 }, RIVA: { cover_x: 842, cover_y: 360, cover_w: 165, cover_h: 40, label_x: 924, label_y: 388, font_size: 20 }, BAR: { cover_x: 205, cover_y: 940, cover_w: 145, cover_h: 40, label_x: 278, label_y: 967, font_size: 20 } };
                                                            const cur = { ...(defaults[zid] || { cover_x: 500, cover_y: 500, cover_w: 150, cover_h: 40, label_x: 575, label_y: 528, font_size: 20 }), ...(anchors[zid] || {}) };
                                                            const dx = p.x - cur.label_x; const dy = p.y - cur.label_y;
                                                            anchors[zid] = { ...cur, label_x: p.x, label_y: p.y, cover_x: cur.cover_x + dx, cover_y: cur.cover_y + dy };
                                                            setSettings({ ...settings, floorplan_anchors: anchors });
                                                        }
                                                    }}
                                                    onPointerUp={() => setDragTarget(null)}
                                                    onPointerLeave={() => setDragTarget(null)}
                                                    data-testid="fp-live-preview"
                                                >
                                                    <defs>
                                                        <pattern id="fp-snap-grid" x="0" y="0" width={gridSize} height={gridSize} patternUnits="userSpaceOnUse">
                                                            <path d={`M ${gridSize} 0 L 0 0 0 ${gridSize}`} fill="none" stroke="#10b981" strokeOpacity="0.28" strokeWidth="0.7" />
                                                        </pattern>
                                                        <pattern id="fp-snap-grid-major" x="0" y="0" width={gridSize * 10} height={gridSize * 10} patternUnits="userSpaceOnUse">
                                                            <rect width={gridSize * 10} height={gridSize * 10} fill="url(#fp-snap-grid)" />
                                                            <path d={`M ${gridSize * 10} 0 L 0 0 0 ${gridSize * 10}`} fill="none" stroke="#10b981" strokeOpacity="0.55" strokeWidth="1" />
                                                        </pattern>
                                                    </defs>
                                                    <image xmlns="http://www.w3.org/2000/svg" href="/floorplan-official.png" xlinkHref="/floorplan-official.png" x="0" y="0" width="1254" height="1254" preserveAspectRatio="xMidYMid meet" />
                                                    {snapToGrid && (
                                                        <rect data-testid="fp-grid-overlay" x="0" y="0" width="1254" height="1254" fill="url(#fp-snap-grid-major)" pointerEvents="none" />
                                                    )}
                                                    {allZoneIds.map((zid) => {
                                                        const a = { ...(defAnchors[zid] || { cover_x: 500, cover_y: 500, cover_w: 150, cover_h: 40, label_x: 575, label_y: 528, font_size: 20 }), ...(anchorsMap[zid] || {}) };
                                                        const extra = extras.find((e) => e.id === zid);
                                                        const color = zoneColors[zid] || (extra && extra.color) || "#8B5CF6";
                                                        const label = zoneLabels[zid] || (extra && extra.label) || zid;
                                                        const isDragging = dragTarget && dragTarget.type === "label" && dragTarget.id === zid;
                                                        return (
                                                            <g key={zid} onPointerDown={(e) => { e.stopPropagation(); e.currentTarget.setPointerCapture(e.pointerId); setDragTarget({ type: "label", id: zid }); }} style={{ cursor: "grab" }} data-testid={`fp-preview-label-${zid}`}>
                                                                <rect x={a.cover_x} y={a.cover_y} width={a.cover_w} height={a.cover_h} fill="#0a0a0a" />
                                                                <rect x={a.cover_x} y={a.cover_y} width={a.cover_w} height={a.cover_h} rx="8" fill={`${color}${isDragging ? "44" : "22"}`} stroke={color} strokeWidth={isDragging ? 4 : 2} />
                                                                <text x={a.label_x} y={a.label_y} textAnchor="middle" fill={color} fontSize={a.font_size} fontWeight="900" letterSpacing="2" pointerEvents="none">{label.toUpperCase()}</text>
                                                            </g>
                                                        );
                                                    })}
                                                    {tables.map((t) => {
                                                        const color = zoneColors[t.zone] || "#8B5CF6";
                                                        const isDragging = dragTarget && dragTarget.type === "table" && dragTarget.id === t.id;
                                                        return (
                                                            <g key={t.id} onPointerDown={(e) => {
                                                                e.stopPropagation();
                                                                e.currentTarget.setPointerCapture(e.pointerId);
                                                                // Se floorplan_tables è vuoto, popola con default per permettere il drag
                                                                if (!(settings.floorplan_tables && settings.floorplan_tables.length)) {
                                                                    setSettings({ ...settings, floorplan_tables: tables });
                                                                }
                                                                setDragTarget({ type: "table", id: t.id });
                                                            }} style={{ cursor: "grab" }} data-testid={`fp-preview-table-${t.id}`}>
                                                                <rect x={t.x - 23} y={t.y - 21} width="46" height="42" rx="4" fill={isDragging ? `${color}33` : "none"} stroke={color} strokeWidth={isDragging ? 4 : 2} />
                                                                <text x={t.x} y={t.y + 7} textAnchor="middle" fill="#fff" fontSize="18" fontWeight="900" pointerEvents="none">{t.id}</text>
                                                            </g>
                                                        );
                                                    })}
                                                </svg>
                                                <p className="text-[10px] text-white/40 text-center mt-2"><b className="text-emerald-400">Drag & drop</b> attivo — trascina tavoli o etichette con il mouse per riposizionarli{snapToGrid ? <>, allineati alla griglia da <b className="text-emerald-400">{gridSize}px</b></> : ""}, poi clicca "Salva".</p>
                                            </div>
                                        );
                                    })()}

                                    {/* Anchors editor */}
                                    <div className="space-y-2">
                                        <div className="text-xs uppercase tracking-widest text-lava font-bold">Posizione etichette (label pulsante)</div>
                                        {["STAGE", "RIVA", "BAR", ...((settings.floorplan_extra_zones || []).map((z) => z.id))].map((zid) => {
                                            const anchors = settings.floorplan_anchors || {};
                                            const defaults = { STAGE: { cover_x: 85, cover_y: 660, cover_w: 210, cover_h: 40, label_x: 190, label_y: 686, font_size: 18 }, RIVA: { cover_x: 842, cover_y: 360, cover_w: 165, cover_h: 40, label_x: 924, label_y: 388, font_size: 20 }, BAR: { cover_x: 205, cover_y: 940, cover_w: 145, cover_h: 40, label_x: 278, label_y: 967, font_size: 20 } };
                                            const a = { ...(defaults[zid] || { cover_x: 500, cover_y: 500, cover_w: 150, cover_h: 40, label_x: 575, label_y: 528, font_size: 20 }), ...(anchors[zid] || {}) };
                                            const setAField = (patch) => setSettings({ ...settings, floorplan_anchors: { ...(settings.floorplan_anchors || {}), [zid]: { ...a, ...patch } } });
                                            return (
                                                <div key={zid} className="rounded-lg border border-white/10 bg-black/30 p-3 space-y-2">
                                                    <div className="text-xs font-bold text-white">{zid}</div>
                                                    <div className="grid gap-2 grid-cols-2 sm:grid-cols-7">
                                                        <input data-testid={`fa-${zid}-cx`} type="number" className={`${input} !py-1.5 !text-xs`} placeholder="cover_x" value={a.cover_x} onChange={(e) => setAField({ cover_x: parseInt(e.target.value) || 0 })} />
                                                        <input data-testid={`fa-${zid}-cy`} type="number" className={`${input} !py-1.5 !text-xs`} placeholder="cover_y" value={a.cover_y} onChange={(e) => setAField({ cover_y: parseInt(e.target.value) || 0 })} />
                                                        <input data-testid={`fa-${zid}-cw`} type="number" className={`${input} !py-1.5 !text-xs`} placeholder="cover_w" value={a.cover_w} onChange={(e) => setAField({ cover_w: parseInt(e.target.value) || 0 })} />
                                                        <input data-testid={`fa-${zid}-ch`} type="number" className={`${input} !py-1.5 !text-xs`} placeholder="cover_h" value={a.cover_h} onChange={(e) => setAField({ cover_h: parseInt(e.target.value) || 0 })} />
                                                        <input data-testid={`fa-${zid}-lx`} type="number" className={`${input} !py-1.5 !text-xs`} placeholder="label_x" value={a.label_x} onChange={(e) => setAField({ label_x: parseInt(e.target.value) || 0 })} />
                                                        <input data-testid={`fa-${zid}-ly`} type="number" className={`${input} !py-1.5 !text-xs`} placeholder="label_y" value={a.label_y} onChange={(e) => setAField({ label_y: parseInt(e.target.value) || 0 })} />
                                                        <input data-testid={`fa-${zid}-fs`} type="number" className={`${input} !py-1.5 !text-xs`} placeholder="font" value={a.font_size} onChange={(e) => setAField({ font_size: parseInt(e.target.value) || 20 })} />
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {/* Extra zones */}
                                    <div className="space-y-2 pt-3 border-t border-white/10">
                                        <div className="flex items-center justify-between">
                                            <div className="text-xs uppercase tracking-widest text-lava font-bold">Zone extra (oltre STAGE/RIVA/BAR)</div>
                                            <button type="button" onClick={() => setSettings({ ...settings, floorplan_extra_zones: [...(settings.floorplan_extra_zones || []), { id: `Z${(settings.floorplan_extra_zones || []).length + 1}`, label: "Nuova Zona", color: "#8B5CF6", cover_x: 500, cover_y: 500, cover_w: 150, cover_h: 40, label_x: 575, label_y: 528, font_size: 20 }] })} className="btn-ghost !text-xs"><Plus className="w-3 h-3" /> Aggiungi zona</button>
                                        </div>
                                        {(settings.floorplan_extra_zones || []).map((z, i) => (
                                            <div key={i} className="rounded-lg border border-white/10 bg-black/30 p-3 space-y-2">
                                                <div className="grid gap-2 sm:grid-cols-[80px_1fr_80px_40px]">
                                                    <input className={`${input} !py-1.5 !text-xs`} placeholder="id" value={z.id || ""} onChange={(e) => { const l = [...settings.floorplan_extra_zones]; l[i] = { ...l[i], id: e.target.value }; setSettings({ ...settings, floorplan_extra_zones: l }); }} />
                                                    <input className={`${input} !py-1.5 !text-xs`} placeholder="label" value={z.label || ""} onChange={(e) => { const l = [...settings.floorplan_extra_zones]; l[i] = { ...l[i], label: e.target.value }; setSettings({ ...settings, floorplan_extra_zones: l }); }} />
                                                    <input type="color" className={`${input} !py-1 !h-8`} value={z.color || "#8B5CF6"} onChange={(e) => { const l = [...settings.floorplan_extra_zones]; l[i] = { ...l[i], color: e.target.value }; setSettings({ ...settings, floorplan_extra_zones: l }); }} />
                                                    <button type="button" onClick={() => { const l = [...settings.floorplan_extra_zones]; l.splice(i, 1); setSettings({ ...settings, floorplan_extra_zones: l }); }} className="btn-ghost !px-2 !py-1 !text-xs !text-lava"><Trash2 className="w-3 h-3" /></button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Tables editor (full) */}
                                    <div className="space-y-2 pt-3 border-t border-white/10">
                                        <div className="flex items-center justify-between">
                                            <div className="text-xs uppercase tracking-widest text-lava font-bold">Tavoli — sposta / aggiungi / rimuovi</div>
                                            <div className="flex gap-2">
                                                <button type="button" onClick={() => {
                                                    // Popola con tavoli default se lista vuota
                                                    if ((settings.floorplan_tables || []).length === 0) {
                                                        const defaults = [
                                                            {id:"B0",x:78,y:193,zone:"STAGE"},{id:"B2",x:170,y:193,zone:"STAGE"},{id:"B4",x:263,y:193,zone:"STAGE"},{id:"B1",x:105,y:260,zone:"STAGE"},{id:"B3",x:206,y:260,zone:"STAGE"},{id:"B5",x:90,y:345,zone:"STAGE"},{id:"B6",x:200,y:345,zone:"STAGE"},{id:"B7",x:90,y:413,zone:"STAGE"},{id:"B8",x:75,y:625,zone:"STAGE"},{id:"B9",x:161,y:625,zone:"STAGE"},{id:"B10",x:248,y:625,zone:"STAGE"},{id:"B11",x:324,y:696,zone:"STAGE"},{id:"B12",x:399,y:716,zone:"STAGE"},{id:"B13",x:477,y:740,zone:"STAGE"},{id:"B14",x:389,y:769,zone:"STAGE"},{id:"B15",x:81,y:746,zone:"STAGE"},
                                                            {id:"R1",x:606,y:235,zone:"RIVA"},{id:"R5",x:747,y:238,zone:"RIVA"},{id:"R9",x:904,y:237,zone:"RIVA"},{id:"R13",x:1072,y:237,zone:"RIVA"},{id:"R2",x:617,y:316,zone:"RIVA"},{id:"R6",x:762,y:316,zone:"RIVA"},{id:"R10",x:915,y:316,zone:"RIVA"},{id:"R14",x:1083,y:316,zone:"RIVA"},{id:"R3",x:633,y:417,zone:"RIVA"},{id:"R7",x:771,y:440,zone:"RIVA"},{id:"R11",x:933,y:440,zone:"RIVA"},{id:"R15",x:1096,y:440,zone:"RIVA"},{id:"R4",x:645,y:506,zone:"RIVA"},{id:"R8",x:792,y:514,zone:"RIVA"},{id:"R12",x:955,y:515,zone:"RIVA"},{id:"R16",x:1112,y:512,zone:"RIVA"},
                                                            {id:"G1",x:135,y:819,zone:"BAR"},{id:"G2",x:212,y:861,zone:"BAR"},{id:"G3",x:144,y:913,zone:"BAR"},{id:"G8",x:379,y:939,zone:"BAR"},{id:"G4",x:176,y:977,zone:"BAR"},{id:"G5",x:160,y:1035,zone:"BAR"},{id:"G7",x:370,y:1036,zone:"BAR"},{id:"G6",x:262,y:1069,zone:"BAR"},
                                                        ];
                                                        setSettings({ ...settings, floorplan_tables: defaults });
                                                        toast.success("Tavoli di default importati — modificali qui sotto");
                                                    }
                                                }} className="btn-ghost !text-xs">Importa default</button>
                                                <button type="button" onClick={() => {
                                                    const l = [...(settings.floorplan_tables || [])];
                                                    l.push({ id: `T${l.length + 1}`, x: 600, y: 600, zone: "STAGE" });
                                                    setSettings({ ...settings, floorplan_tables: l });
                                                }} className="btn-ghost !text-xs"><Plus className="w-3 h-3" /> Aggiungi tavolo</button>
                                            </div>
                                        </div>
                                        <p className="text-[10px] text-white/40">Lascia vuoto per usare i tavoli hard-coded di default. Se popoli la lista, sostituisce tutti i tavoli.</p>
                                        <div className="max-h-72 overflow-y-auto space-y-1 pr-2">
                                            {(settings.floorplan_tables || []).map((t, i) => (
                                                <div key={i} className="grid gap-2 grid-cols-[70px_70px_70px_1fr_40px] items-center">
                                                    <input className={`${input} !py-1 !text-xs`} placeholder="ID" value={t.id || ""} onChange={(e) => { const l = [...settings.floorplan_tables]; l[i] = { ...l[i], id: e.target.value }; setSettings({ ...settings, floorplan_tables: l }); }} />
                                                    <input type="number" className={`${input} !py-1 !text-xs`} placeholder="x" value={t.x || 0} onChange={(e) => { const l = [...settings.floorplan_tables]; l[i] = { ...l[i], x: parseInt(e.target.value) || 0 }; setSettings({ ...settings, floorplan_tables: l }); }} />
                                                    <input type="number" className={`${input} !py-1 !text-xs`} placeholder="y" value={t.y || 0} onChange={(e) => { const l = [...settings.floorplan_tables]; l[i] = { ...l[i], y: parseInt(e.target.value) || 0 }; setSettings({ ...settings, floorplan_tables: l }); }} />
                                                    <select className={`${input} !py-1 !text-xs`} value={t.zone || "STAGE"} onChange={(e) => { const l = [...settings.floorplan_tables]; l[i] = { ...l[i], zone: e.target.value }; setSettings({ ...settings, floorplan_tables: l }); }}>
                                                        {["STAGE","RIVA","BAR", ...((settings.floorplan_extra_zones || []).map(z => z.id))].map((zid) => <option key={zid} value={zid} className="bg-obsidian">{zid}</option>)}
                                                    </select>
                                                    <button type="button" onClick={() => { const l = [...settings.floorplan_tables]; l.splice(i, 1); setSettings({ ...settings, floorplan_tables: l }); }} className="btn-ghost !px-1.5 !py-1 !text-xs !text-lava"><Trash2 className="w-3 h-3" /></button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            </div>
                            <details id="csec-nav" className="glass-card rounded-2xl p-6 space-y-4 scroll-mt-28" open>
                                <summary className="cursor-pointer font-bold text-lg">Menu di navigazione</summary>
                                <p className="text-xs text-white/50">Rinomina, nascondi o riordina le voci del menu. Non aggiungere voci nuove: il routing è fisso.</p>
                                <div className="space-y-2">
                                    {(settings.nav_items || []).map((n, i) => (
                                        <div key={i} className="flex items-center gap-2">
                                            <span className="text-xs text-white/40 w-32 truncate">{n.to}</span>
                                            <input data-testid={`nav-label-${i}`} className={`${input} !py-2 flex-1`} placeholder="Etichetta" value={n.label || ""} onChange={(e) => {
                                                const list = [...settings.nav_items]; list[i] = { ...list[i], label: e.target.value };
                                                setSettings({ ...settings, nav_items: list });
                                            }} />
                                            <label className="flex items-center gap-1.5 text-xs text-white/60">
                                                <input type="checkbox" checked={!n.hidden} onChange={(e) => {
                                                    const list = [...settings.nav_items]; list[i] = { ...list[i], hidden: !e.target.checked };
                                                    setSettings({ ...settings, nav_items: list });
                                                }} /> Visibile
                                            </label>
                                            <button type="button" onClick={() => {
                                                if (i === 0) return;
                                                const list = [...settings.nav_items];
                                                [list[i - 1], list[i]] = [list[i], list[i - 1]];
                                                setSettings({ ...settings, nav_items: list });
                                            }} className="btn-ghost !px-2 !py-1 !text-xs"><ArrowUp className="w-3 h-3" /></button>
                                            <button type="button" onClick={() => {
                                                if (i === (settings.nav_items || []).length - 1) return;
                                                const list = [...settings.nav_items];
                                                [list[i + 1], list[i]] = [list[i], list[i + 1]];
                                                setSettings({ ...settings, nav_items: list });
                                            }} className="btn-ghost !px-2 !py-1 !text-xs"><ArrowDown className="w-3 h-3" /></button>
                                        </div>
                                    ))}
                                </div>
                                <SectionPreview
                                    label="Anteprima Navbar"
                                    extra={
                                        <div className="flex flex-wrap gap-x-4 gap-y-2 pt-2">
                                            {(settings.nav_items || []).filter((n) => !n.hidden).map((n, i) => (
                                                <span key={i} className="text-xs uppercase tracking-widest text-white/80 font-bold hover:text-lava cursor-default">{n.label}</span>
                                            ))}
                                        </div>
                                    }
                                />
                            </details>

                            <details id="csec-footer" className="glass-card rounded-2xl p-6 space-y-4 scroll-mt-28" open>
                                <summary className="cursor-pointer font-bold text-lg">Footer</summary>
                                <div className="grid gap-3 sm:grid-cols-2">
                                    <input data-testid="footer-contact-title" className={input} placeholder="Titolo Contatti" value={settings.footer_contact_title || ""} onChange={(e) => setSettings({ ...settings, footer_contact_title: e.target.value })} />
                                    <input data-testid="footer-social-title" className={input} placeholder="Titolo Social" value={settings.footer_social_title || ""} onChange={(e) => setSettings({ ...settings, footer_social_title: e.target.value })} />
                                </div>
                                <textarea data-testid="footer-tagline" className={input} rows="2" placeholder="Tagline sotto i social (opzionale)" value={settings.footer_tagline || ""} onChange={(e) => setSettings({ ...settings, footer_tagline: e.target.value })} />
                                <input data-testid="footer-copyright" className={input} placeholder="Testo copyright (senza anno)" value={settings.footer_copyright || ""} onChange={(e) => setSettings({ ...settings, footer_copyright: e.target.value })} />
                                <SectionPreview
                                    label="Anteprima footer"
                                    extra={
                                        <div className="grid gap-4 sm:grid-cols-2 pt-3">
                                            <div>
                                                <div className="text-[10px] uppercase tracking-widest text-lava font-black mb-1">{settings.footer_contact_title}</div>
                                                <div className="text-xs text-white/70">glitzclubofficial@gmail.com<br/>344 4289232</div>
                                            </div>
                                            <div>
                                                <div className="text-[10px] uppercase tracking-widest text-lava font-black mb-1">{settings.footer_social_title}</div>
                                                {settings.footer_tagline && <p className="text-[11px] text-white/50 leading-relaxed">{settings.footer_tagline}</p>}
                                            </div>
                                            <div className="col-span-full text-center text-[10px] text-white/40 pt-2 border-t border-white/5">© {new Date().getFullYear()} {settings.footer_copyright}</div>
                                        </div>
                                    }
                                />
                            </details>

                            <details id="csec-shop" className="glass-card rounded-2xl p-6 space-y-4 scroll-mt-28" open>
                                <summary className="cursor-pointer font-bold text-lg">Pagina Shop</summary>
                                <div className="grid gap-3 sm:grid-cols-2">
                                    <input data-testid="shop-kicker" className={input} placeholder="Kicker" value={settings.shop_kicker || ""} onChange={(e) => setSettings({ ...settings, shop_kicker: e.target.value })} />
                                    <input data-testid="shop-title" className={input} placeholder="Titolo" value={settings.shop_title || ""} onChange={(e) => setSettings({ ...settings, shop_title: e.target.value })} />
                                </div>
                                <textarea data-testid="shop-description" className={input} rows="3" placeholder="Descrizione" value={settings.shop_description || ""} onChange={(e) => setSettings({ ...settings, shop_description: e.target.value })} />
                                <input data-testid="shop-chips" className={input} placeholder="Chips (separate da virgola)" value={(settings.shop_chips || []).join(", ")} onChange={(e) => setSettings({ ...settings, shop_chips: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })} />
                                <div className="grid gap-3 sm:grid-cols-2">
                                    <input data-testid="shop-howto-kicker" className={input} placeholder="Kicker come ordinare" value={settings.shop_howto_kicker || ""} onChange={(e) => setSettings({ ...settings, shop_howto_kicker: e.target.value })} />
                                    <input data-testid="shop-howto-title" className={input} placeholder="Titolo come ordinare" value={settings.shop_howto_title || ""} onChange={(e) => setSettings({ ...settings, shop_howto_title: e.target.value })} />
                                </div>
                                <div className="space-y-2">
                                    {(settings.shop_howto_steps || []).map((s, i) => (
                                        <div key={i} className="grid gap-2 sm:grid-cols-[70px_1fr_2fr]">
                                            <input className={`${input} !py-2`} placeholder="Nr" value={s.n || ""} onChange={(e) => { const l = [...settings.shop_howto_steps]; l[i] = { ...l[i], n: e.target.value }; setSettings({ ...settings, shop_howto_steps: l }); }} />
                                            <input className={`${input} !py-2`} placeholder="Titolo step" value={s.title || ""} onChange={(e) => { const l = [...settings.shop_howto_steps]; l[i] = { ...l[i], title: e.target.value }; setSettings({ ...settings, shop_howto_steps: l }); }} />
                                            <input className={`${input} !py-2`} placeholder="Descrizione" value={s.body || ""} onChange={(e) => { const l = [...settings.shop_howto_steps]; l[i] = { ...l[i], body: e.target.value }; setSettings({ ...settings, shop_howto_steps: l }); }} />
                                        </div>
                                    ))}
                                </div>
                                <SectionPreview
                                    url="/shop"
                                    kicker={settings.shop_kicker}
                                    title={settings.shop_title}
                                    description={settings.shop_description}
                                    extra={(settings.shop_chips || []).length > 0 && (
                                        <div className="flex flex-wrap gap-2 pt-2">
                                            {(settings.shop_chips || []).map((c, i) => (
                                                <span key={i} className="text-[10px] uppercase tracking-widest text-white/60 border border-white/15 rounded-full px-2.5 py-1">{c}</span>
                                            ))}
                                        </div>
                                    )}
                                />
                            </details>

                            <details id="csec-private" className="glass-card rounded-2xl p-6 space-y-4 scroll-mt-28" open>
                                <summary className="cursor-pointer font-bold text-lg">Pagina Eventi Privati</summary>
                                <div className="grid gap-3 sm:grid-cols-3">
                                    <input data-testid="private-kicker" className={input} placeholder="Kicker" value={settings.private_kicker || ""} onChange={(e) => setSettings({ ...settings, private_kicker: e.target.value })} />
                                    <input data-testid="private-line1" className={input} placeholder="Titolo riga 1" value={settings.private_hero_line1 || ""} onChange={(e) => setSettings({ ...settings, private_hero_line1: e.target.value })} />
                                    <input data-testid="private-line2" className={input} placeholder="Titolo riga 2 (colorato)" value={settings.private_hero_line2 || ""} onChange={(e) => setSettings({ ...settings, private_hero_line2: e.target.value })} />
                                </div>
                                <textarea data-testid="private-subtitle" className={input} rows="3" placeholder="Sottotitolo" value={settings.private_hero_subtitle || ""} onChange={(e) => setSettings({ ...settings, private_hero_subtitle: e.target.value })} />
                                <div>
                                    <label className="text-xs uppercase tracking-widest text-white/60 block mb-2">Aree selezionabili (id · label · sottotitolo · icona: sparkles/mappin/users/wine/calendar)</label>
                                    {(settings.private_areas || []).map((a, i) => (
                                        <div key={i} className="grid gap-2 sm:grid-cols-[100px_120px_1fr_110px_50px] mb-2 items-center">
                                            <input className={`${input} !py-2 !text-xs`} placeholder="id" value={a.id || ""} onChange={(e) => { const l = [...settings.private_areas]; l[i] = { ...l[i], id: e.target.value }; setSettings({ ...settings, private_areas: l }); }} />
                                            <input className={`${input} !py-2 !text-xs`} placeholder="label" value={a.label || ""} onChange={(e) => { const l = [...settings.private_areas]; l[i] = { ...l[i], label: e.target.value }; setSettings({ ...settings, private_areas: l }); }} />
                                            <input className={`${input} !py-2 !text-xs`} placeholder="sottotitolo" value={a.subtitle || ""} onChange={(e) => { const l = [...settings.private_areas]; l[i] = { ...l[i], subtitle: e.target.value }; setSettings({ ...settings, private_areas: l }); }} />
                                            <select className={`${input} !py-2 !text-xs`} value={a.icon || "sparkles"} onChange={(e) => { const l = [...settings.private_areas]; l[i] = { ...l[i], icon: e.target.value }; setSettings({ ...settings, private_areas: l }); }}>
                                                {["sparkles","mappin","users","wine","calendar"].map((ic) => <option key={ic} value={ic} className="bg-obsidian">{ic}</option>)}
                                            </select>
                                            <button type="button" onClick={() => { const l = [...settings.private_areas]; l.splice(i, 1); setSettings({ ...settings, private_areas: l }); }} className="btn-ghost !px-2 !py-1 !text-xs !text-lava"><Trash2 className="w-3 h-3" /></button>
                                        </div>
                                    ))}
                                    <button type="button" onClick={() => setSettings({ ...settings, private_areas: [...(settings.private_areas || []), { id: "new", label: "Nuova area", subtitle: "", icon: "sparkles" }] })} className="btn-ghost !text-xs"><Plus className="w-3 h-3" /> Aggiungi area</button>
                                </div>
                                <div>
                                    <label className="text-xs uppercase tracking-widest text-white/60 block mb-2">Occasioni (una per riga)</label>
                                    <textarea className={input} rows="4" value={(settings.private_occasions || []).join("\n")} onChange={(e) => setSettings({ ...settings, private_occasions: e.target.value.split("\n").map((s) => s.trim()).filter(Boolean) })} />
                                </div>
                                <div>
                                    <label className="text-xs uppercase tracking-widest text-white/60 block mb-2">Perché noi (3 blocchi)</label>
                                    {(settings.private_why_us || []).map((w, i) => (
                                        <div key={i} className="grid gap-2 sm:grid-cols-[50px_1fr_2fr] mb-2">
                                            <input className={`${input} !py-2 !text-xs`} placeholder="Nr" value={w.n || ""} onChange={(e) => { const l = [...settings.private_why_us]; l[i] = { ...l[i], n: e.target.value }; setSettings({ ...settings, private_why_us: l }); }} />
                                            <input className={`${input} !py-2 !text-xs`} placeholder="Titolo" value={w.title || ""} onChange={(e) => { const l = [...settings.private_why_us]; l[i] = { ...l[i], title: e.target.value }; setSettings({ ...settings, private_why_us: l }); }} />
                                            <input className={`${input} !py-2 !text-xs`} placeholder="Descrizione" value={w.body || ""} onChange={(e) => { const l = [...settings.private_why_us]; l[i] = { ...l[i], body: e.target.value }; setSettings({ ...settings, private_why_us: l }); }} />
                                        </div>
                                    ))}
                                </div>
                                <div className="grid gap-3 sm:grid-cols-2">
                                    <input className={input} placeholder="Titolo conferma invio" value={settings.private_success_title || ""} onChange={(e) => setSettings({ ...settings, private_success_title: e.target.value })} />
                                    <input className={input} placeholder="Testo conferma invio" value={settings.private_success_body || ""} onChange={(e) => setSettings({ ...settings, private_success_body: e.target.value })} />
                                </div>
                                <SectionPreview
                                    url="/prenota-evento"
                                    kicker={settings.private_kicker}
                                    title={`${settings.private_hero_line1 || ""} ${settings.private_hero_line2 || ""}`.trim()}
                                    description={settings.private_hero_subtitle}
                                    extra={(settings.private_areas || []).length > 0 && (
                                        <div className="flex flex-wrap gap-2 pt-3">
                                            {(settings.private_areas || []).map((a) => (
                                                <span key={a.id} className="text-[10px] uppercase tracking-widest text-white/70 border border-white/15 bg-white/5 rounded-lg px-2.5 py-1">{a.label}</span>
                                            ))}
                                        </div>
                                    )}
                                />
                            </details>

                            <details id="csec-titles" className="glass-card rounded-2xl p-6 space-y-4 scroll-mt-28" open>
                                <summary className="cursor-pointer font-bold text-lg">Titoli sezioni (Blog / Gallery / Eventi passati / Eventi)</summary>
                                <div className="grid gap-3 sm:grid-cols-3">
                                    <input className={input} placeholder="Blog kicker" value={settings.blog_kicker || ""} onChange={(e) => setSettings({ ...settings, blog_kicker: e.target.value })} />
                                    <input className={input} placeholder="Blog titolo" value={settings.blog_title || ""} onChange={(e) => setSettings({ ...settings, blog_title: e.target.value })} />
                                    <input className={input} placeholder="Blog descrizione (opz.)" value={settings.blog_description || ""} onChange={(e) => setSettings({ ...settings, blog_description: e.target.value })} />
                                </div>
                                <div className="grid gap-3 sm:grid-cols-3">
                                    <input className={input} placeholder="Gallery kicker" value={settings.gallery_kicker || ""} onChange={(e) => setSettings({ ...settings, gallery_kicker: e.target.value })} />
                                    <input className={input} placeholder="Gallery titolo" value={settings.gallery_page_title || ""} onChange={(e) => setSettings({ ...settings, gallery_page_title: e.target.value })} />
                                    <input className={input} placeholder="Gallery descrizione" value={settings.gallery_description || ""} onChange={(e) => setSettings({ ...settings, gallery_description: e.target.value })} />
                                </div>
                                <div className="grid gap-3 sm:grid-cols-3">
                                    <input className={input} placeholder="Past events kicker" value={settings.past_kicker || ""} onChange={(e) => setSettings({ ...settings, past_kicker: e.target.value })} />
                                    <input className={input} placeholder="Past events titolo" value={settings.past_title || ""} onChange={(e) => setSettings({ ...settings, past_title: e.target.value })} />
                                    <input className={input} placeholder="Past events descrizione" value={settings.past_description || ""} onChange={(e) => setSettings({ ...settings, past_description: e.target.value })} />
                                </div>
                                <div className="grid gap-3 sm:grid-cols-3">
                                    <input className={input} placeholder="Eventi kicker" value={settings.events_kicker || ""} onChange={(e) => setSettings({ ...settings, events_kicker: e.target.value })} />
                                    <input className={input} placeholder="Eventi titolo" value={settings.events_title || ""} onChange={(e) => setSettings({ ...settings, events_title: e.target.value })} />
                                    <input className={input} placeholder="Messaggio vuoto" value={settings.events_empty || ""} onChange={(e) => setSettings({ ...settings, events_empty: e.target.value })} />
                                </div>
                                <div className="mt-4 pt-4 border-t border-white/10">
                                    <div className="text-[10px] uppercase tracking-widest text-lava font-bold mb-2">Gallery strip — Eventi Prossimi</div>
                                    <div className="grid gap-3 sm:grid-cols-3">
                                        <input data-testid="events-gallery-kicker" className={input} placeholder="Kicker (es. Momenti)" value={settings.events_gallery_kicker || ""} onChange={(e) => setSettings({ ...settings, events_gallery_kicker: e.target.value })} />
                                        <input data-testid="events-gallery-title" className={input} placeholder="Titolo" value={settings.events_gallery_title || ""} onChange={(e) => setSettings({ ...settings, events_gallery_title: e.target.value })} />
                                        <input data-testid="events-gallery-description" className={input} placeholder="Descrizione (opz.)" value={settings.events_gallery_description || ""} onChange={(e) => setSettings({ ...settings, events_gallery_description: e.target.value })} />
                                    </div>
                                </div>
                                <div className="mt-4 pt-4 border-t border-white/10">
                                    <div className="text-[10px] uppercase tracking-widest text-lava font-bold mb-2">Gallery strip — Eventi Passati</div>
                                    <div className="grid gap-3 sm:grid-cols-3">
                                        <input data-testid="past-gallery-kicker" className={input} placeholder="Kicker (es. Flashback)" value={settings.past_gallery_kicker || ""} onChange={(e) => setSettings({ ...settings, past_gallery_kicker: e.target.value })} />
                                        <input data-testid="past-gallery-title" className={input} placeholder="Titolo" value={settings.past_gallery_title || ""} onChange={(e) => setSettings({ ...settings, past_gallery_title: e.target.value })} />
                                        <input data-testid="past-gallery-description" className={input} placeholder="Descrizione (opz.)" value={settings.past_gallery_description || ""} onChange={(e) => setSettings({ ...settings, past_gallery_description: e.target.value })} />
                                    </div>
                                    <p className="text-[10px] text-white/40 mt-2">Le strip usano le foto della categoria <b className="text-lava">gallery</b> del media manager. Carica foto lì per popolarle.</p>
                                </div>
                                <div className="grid gap-3 md:grid-cols-2 pt-2">
                                    <SectionPreview label="Anteprima Blog" url="/news" kicker={settings.blog_kicker} title={settings.blog_title} description={settings.blog_description} />
                                    <SectionPreview label="Anteprima Gallery" url="/gallery" kicker={settings.gallery_kicker} title={settings.gallery_page_title} description={settings.gallery_description} />
                                    <SectionPreview label="Anteprima Eventi Passati" url="/eventi/passati" kicker={settings.past_kicker} title={settings.past_title} description={settings.past_description} />
                                    <SectionPreview label="Anteprima Eventi" url="/eventi" kicker={settings.events_kicker} title={settings.events_title} description={settings.events_empty} />
                                </div>
                            </details>

                            <details id="csec-poster" className="glass-card rounded-2xl p-6 space-y-4 scroll-mt-28" open>
                                <summary className="cursor-pointer font-bold text-lg">Poster & SEO</summary>
                                <div className="grid gap-3 sm:grid-cols-3">
                                    <input className={input} placeholder="Poster: nome club (es. GLITZ)" value={settings.poster_club_name || ""} onChange={(e) => setSettings({ ...settings, poster_club_name: e.target.value })} />
                                    <input className={input} placeholder="Poster: label (CLUB)" value={settings.poster_club_label || ""} onChange={(e) => setSettings({ ...settings, poster_club_label: e.target.value })} />
                                    <input className={input} placeholder="Poster: location" value={settings.poster_location || ""} onChange={(e) => setSettings({ ...settings, poster_location: e.target.value })} />
                                </div>
                                <input className={input} placeholder="Poster: sponsors (virgola)" value={(settings.poster_sponsors || []).join(", ")} onChange={(e) => setSettings({ ...settings, poster_sponsors: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })} />
                                <div className="grid gap-3 sm:grid-cols-2">
                                    <input className={input} placeholder="SEO: nome sito" value={settings.seo_site_name || ""} onChange={(e) => setSettings({ ...settings, seo_site_name: e.target.value })} />
                                    <input className={input} placeholder="SEO: titolo di default" value={settings.seo_default_title || ""} onChange={(e) => setSettings({ ...settings, seo_default_title: e.target.value })} />
                                </div>
                                <textarea className={input} rows="2" placeholder="SEO: descrizione di default" value={settings.seo_default_description || ""} onChange={(e) => setSettings({ ...settings, seo_default_description: e.target.value })} />
                                <input className={input} placeholder="SEO: og:image URL" value={settings.seo_default_og_image || ""} onChange={(e) => setSettings({ ...settings, seo_default_og_image: e.target.value })} />
                                <div className="grid gap-3 md:grid-cols-2 pt-2">
                                    <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.03] p-5 space-y-2" data-testid="poster-preview">
                                        <div className="text-[10px] uppercase tracking-widest text-emerald-400 font-black flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Anteprima poster
                                        </div>
                                        <div className="aspect-[4/5] rounded-xl bg-black overflow-hidden relative flex items-center justify-center text-center p-6">
                                            <div className="absolute top-3 left-3 text-[8px] uppercase tracking-widest text-white font-black">{settings.poster_club_name}<div className="text-[6px] text-lava tracking-[0.3em]">{settings.poster_club_label}</div></div>
                                            <div className="absolute top-3 right-3 text-[7px] uppercase tracking-widest text-white/60">{settings.poster_location}</div>
                                            <div className="text-white text-2xl font-black uppercase leading-tight">DAMANTE<br/><span className="text-lava">OPENING</span></div>
                                            <div className="absolute bottom-3 left-3 right-3 text-[7px] uppercase tracking-widest text-white/40 flex flex-wrap justify-center gap-1">
                                                {(settings.poster_sponsors || []).map((s, i) => <span key={i}>· {s}</span>)}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.03] p-5 space-y-2" data-testid="seo-preview">
                                        <div className="text-[10px] uppercase tracking-widest text-emerald-400 font-black flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Anteprima Google SERP
                                        </div>
                                        <div className="rounded-lg bg-white/5 p-3 space-y-1 font-sans">
                                            <div className="text-[10px] text-white/40">glitzclub.it › /</div>
                                            <div className="text-base text-blue-300 font-medium leading-tight">{settings.seo_default_title || settings.seo_site_name}</div>
                                            <p className="text-[11px] text-white/60 line-clamp-2 leading-relaxed">{settings.seo_default_description}</p>
                                        </div>
                                    </div>
                                </div>
                            </details>

                            <button
                                data-testid="save-content-btn"
                                onClick={saveSettings}
                                disabled={savingSettings}
                                className="btn-lava disabled:opacity-50"
                            >
                                {savingSettings ? "Salvataggio..." : "Salva Contenuti"}
                            </button>
                        </div>
                    )}
                </TabsContent>

                {/* PRODUCTS */}
                <TabsContent value="products" className="mt-6 space-y-4">
                    <button data-testid="new-product-btn" onClick={() => setEditProduct({ ...emptyProduct })} className="btn-lava !px-5 !py-2.5 !text-xs">
                        <Plus className="w-4 h-4" /> Nuovo Prodotto
                    </button>
                    <div className="grid gap-3">
                        {products.map((p) => (
                            <div key={p.id} data-testid={`product-row-${p.slug}`} className="glass-card rounded-xl p-4 flex items-center justify-between gap-4">
                                <div className="flex items-center gap-4 min-w-0">
                                    {p.image && <img src={p.image} alt={p.name} className="w-14 h-14 rounded-lg object-cover flex-shrink-0" />}
                                    <div className="min-w-0">
                                        <div className="font-bold truncate">{p.name} {!p.active && <span className="text-xs text-white/40 ml-2">(nascosto)</span>}</div>
                                        <div className="text-xs text-white/50 truncate">{p.subtitle} · € {p.price} · /{p.slug}</div>
                                    </div>
                                </div>
                                <div className="flex gap-2 flex-shrink-0">
                                    <button data-testid={`edit-product-${p.slug}`} onClick={() => setEditProduct({ ...p, gallery: (p.gallery || []).join(", "), details: (p.details || []).join("\n"), sizes: (p.sizes || []).join(", ") })} className="btn-ghost !px-3 !py-1.5 !text-xs"><Edit className="w-3 h-3" /></button>
                                    <button data-testid={`del-product-${p.slug}`} onClick={() => delProduct(p.id)} className="btn-ghost !px-3 !py-1.5 !text-xs !text-lava"><Trash2 className="w-3 h-3" /></button>
                                </div>
                            </div>
                        ))}
                        {!products.length && <p className="text-white/50 text-sm">Nessun prodotto. Clicca "Nuovo Prodotto".</p>}
                    </div>
                    {editProduct && (
                        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 overflow-y-auto" onClick={() => setEditProduct(null)}>
                            <div className="bg-obsidian border border-white/10 rounded-2xl p-6 max-w-2xl w-full space-y-3 my-8" onClick={(e) => e.stopPropagation()}>
                                <h3 className="text-xl font-bold">{editProduct.id ? "Modifica" : "Nuovo"} Prodotto</h3>
                                <div className="grid gap-3 sm:grid-cols-2">
                                    <input data-testid="pf-slug" className={input} placeholder="slug (es. tshirt-vibes)" value={editProduct.slug} onChange={(e) => setEditProduct({ ...editProduct, slug: e.target.value })} />
                                    <input data-testid="pf-name" className={input} placeholder="Nome" value={editProduct.name} onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })} />
                                </div>
                                <input data-testid="pf-subtitle" className={input} placeholder="Sottotitolo" value={editProduct.subtitle} onChange={(e) => setEditProduct({ ...editProduct, subtitle: e.target.value })} />
                                <div className="grid gap-3 sm:grid-cols-3">
                                    <input data-testid="pf-price" type="number" step="0.01" className={input} placeholder="Prezzo €" value={editProduct.price} onChange={(e) => setEditProduct({ ...editProduct, price: e.target.value })} />
                                    <input data-testid="pf-color" className={input} placeholder="Colore/variante" value={editProduct.color} onChange={(e) => setEditProduct({ ...editProduct, color: e.target.value })} />
                                    <input data-testid="pf-badge" className={input} placeholder="Badge (opzionale)" value={editProduct.badge || ""} onChange={(e) => setEditProduct({ ...editProduct, badge: e.target.value })} />
                                </div>
                                <input data-testid="pf-image" className={input} placeholder="URL immagine principale" value={editProduct.image} onChange={(e) => setEditProduct({ ...editProduct, image: e.target.value })} />
                                <div className="flex items-center gap-3 -mt-2">
                                    {editProduct.image ? (
                                        <img src={editProduct.image.startsWith("http") ? editProduct.image : `${process.env.REACT_APP_BACKEND_URL}${editProduct.image}`} alt="preview" className="w-16 h-16 rounded object-cover border border-white/10" />
                                    ) : (
                                        <div className="w-16 h-16 rounded border border-dashed border-white/15 flex items-center justify-center text-white/40 text-[10px]">Nessuna</div>
                                    )}
                                    <label data-testid="upload-product-image" className="btn-ghost !px-3 !py-1.5 !text-xs cursor-pointer inline-flex">
                                        <Upload className="w-3 h-3" /> Carica immagine
                                        <input type="file" accept="image/*" className="hidden" onChange={async (e) => {
                                            const f = e.target.files?.[0]; if (!f) return;
                                            try {
                                                const fd = new FormData();
                                                fd.append("file", f);
                                                fd.append("category", "products");
                                                const r = await api.post("/admin/media", fd);
                                                setEditProduct({ ...editProduct, image: r.data.url });
                                                toast.success("Immagine caricata");
                                            } catch { toast.error("Errore upload"); }
                                        }} />
                                    </label>
                                </div>
                                <textarea data-testid="pf-gallery" className={input} rows={2} placeholder="Gallery (URL separati da virgola)" value={editProduct.gallery} onChange={(e) => setEditProduct({ ...editProduct, gallery: e.target.value })} />
                                <div className="flex items-start gap-2 -mt-2 flex-wrap">
                                    <label data-testid="upload-product-gallery" className="btn-ghost !px-3 !py-1.5 !text-xs cursor-pointer inline-flex">
                                        <Upload className="w-3 h-3" /> Aggiungi a gallery
                                        <input type="file" accept="image/*" multiple className="hidden" onChange={async (e) => {
                                            const files = Array.from(e.target.files || []); if (!files.length) return;
                                            try {
                                                const urls = [];
                                                for (const f of files) {
                                                    const fd = new FormData();
                                                    fd.append("file", f);
                                                    fd.append("category", "products");
                                                    const r = await api.post("/admin/media", fd);
                                                    urls.push(r.data.url);
                                                }
                                                const existing = typeof editProduct.gallery === "string" ? editProduct.gallery.split(",").map((s) => s.trim()).filter(Boolean) : (editProduct.gallery || []);
                                                setEditProduct({ ...editProduct, gallery: [...existing, ...urls].join(", ") });
                                                toast.success(`${urls.length} foto caricata/e`);
                                            } catch { toast.error("Errore upload"); }
                                        }} />
                                    </label>
                                    {typeof editProduct.gallery === "string" && editProduct.gallery && editProduct.gallery.split(",").map((u, i) => u.trim() && (
                                        <div key={i} className="relative group">
                                            <img src={u.trim().startsWith("http") ? u.trim() : `${process.env.REACT_APP_BACKEND_URL}${u.trim()}`} alt="" className="w-12 h-12 rounded object-cover border border-white/10" />
                                            <button type="button" onClick={() => {
                                                const list = editProduct.gallery.split(",").map((s) => s.trim()).filter((_, j) => j !== i);
                                                setEditProduct({ ...editProduct, gallery: list.join(", ") });
                                            }} className="absolute -top-1 -right-1 w-4 h-4 bg-lava rounded-full text-white text-[10px] opacity-0 group-hover:opacity-100 transition">×</button>
                                        </div>
                                    ))}
                                </div>
                                <textarea data-testid="pf-description" className={input} rows={4} placeholder="Descrizione" value={editProduct.description} onChange={(e) => setEditProduct({ ...editProduct, description: e.target.value })} />
                                <textarea data-testid="pf-details" className={input} rows={4} placeholder="Dettagli (uno per riga)" value={editProduct.details} onChange={(e) => setEditProduct({ ...editProduct, details: e.target.value })} />
                                <input data-testid="pf-sizes" className={input} placeholder="Taglie (es. XS,S,M,L,XL) — vuoto se non serve" value={editProduct.sizes} onChange={(e) => setEditProduct({ ...editProduct, sizes: e.target.value })} />
                                <div className="grid gap-3 sm:grid-cols-2">
                                    <input data-testid="pf-order" type="number" className={input} placeholder="Ordine (0=primo)" value={editProduct.order} onChange={(e) => setEditProduct({ ...editProduct, order: e.target.value })} />
                                    <label className="flex items-center gap-2 text-sm text-white/70">
                                        <input type="checkbox" checked={editProduct.active} onChange={(e) => setEditProduct({ ...editProduct, active: e.target.checked })} /> Attivo (visibile nello shop)
                                    </label>
                                </div>
                                <div className="flex gap-2 justify-end pt-3 border-t border-white/10">
                                    <button onClick={() => setEditProduct(null)} className="btn-ghost !text-xs">Annulla</button>
                                    <button data-testid="save-product-btn" onClick={saveProduct} className="btn-lava !text-xs">Salva</button>
                                </div>
                            </div>
                        </div>
                    )}
                </TabsContent>

                {/* NEWSLETTER */}
                <TabsContent value="newsletter" className="mt-6 space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-bold text-lg">Iscritti newsletter</h3>
                            <p className="text-xs text-white/50">Totale: {subscribers.length} iscritti</p>
                        </div>
                        <button data-testid="export-newsletter-csv" onClick={exportSubscribersCsv} disabled={!subscribers.length} className="btn-ghost !text-xs disabled:opacity-40">
                            <Download className="w-3 h-3" /> Esporta CSV
                        </button>
                    </div>
                    <div className="glass-card rounded-2xl overflow-hidden">
                        <div className="max-h-[600px] overflow-y-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-white/5 sticky top-0">
                                    <tr>
                                        <th className="text-left px-4 py-2 text-xs uppercase text-white/60">Email</th>
                                        <th className="text-left px-4 py-2 text-xs uppercase text-white/60">Iscritto il</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {subscribers.map((s) => (
                                        <tr key={s.id || s.email} className="border-t border-white/5">
                                            <td className="px-4 py-2 text-white/90">{s.email}</td>
                                            <td className="px-4 py-2 text-white/50 text-xs">{s.created_at?.slice(0, 16).replace("T", " ")}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {!subscribers.length && <p className="text-white/50 text-sm p-4">Nessun iscritto ancora.</p>}
                        </div>
                    </div>
                </TabsContent>

                {/* SETTINGS */}
                <TabsContent value="settings" className="mt-6 space-y-6">
                    {!settings && <p className="text-white/60">Caricamento...</p>}
                    {settings && (
                        <div className="space-y-8">
                            {/* Hero video */}
                            <section className="glass-card rounded-2xl p-6 space-y-4">
                                <h3 className="font-bold text-lg flex items-center gap-2"><Video className="w-5 h-5 text-lava" /> Hero Video</h3>
                                <p className="text-sm text-white/60">Vimeo, YouTube (URL diretto MP4) o file uploadato. Se usi Vimeo assicurati che sia pubblico o "Anyone with the link" e con embed abilitato.</p>
                                <input
                                    data-testid="settings-hero-video-url"
                                    className={input}
                                    placeholder="URL video (Vimeo o .mp4 diretto)"
                                    value={settings.hero_video_url || ""}
                                    onChange={(e) => setSettings({ ...settings, hero_video_url: e.target.value })}
                                />
                                <label data-testid="settings-hero-video-upload" className="btn-ghost !text-xs !px-4 !py-2 cursor-pointer inline-flex">
                                    <Upload className="w-4 h-4" /> Carica video
                                    <input type="file" accept="video/*" className="hidden" onChange={(e) => e.target.files[0] && uploadFor(e.target.files[0], "hero_video_url")} />
                                </label>
                            </section>

                            {/* Planimetria */}
                            <section className="glass-card rounded-2xl p-6 space-y-4">
                                <h3 className="font-bold text-lg">Planimetria Ufficiale</h3>
                                <p className="text-sm text-white/60">Immagine PNG della piantina usata per la selezione tavoli.</p>
                                <input
                                    className={input}
                                    placeholder="URL planimetria"
                                    value={settings.planimetria_url || ""}
                                    onChange={(e) => setSettings({ ...settings, planimetria_url: e.target.value })}
                                />
                                <label className="btn-ghost !text-xs !px-4 !py-2 cursor-pointer inline-flex">
                                    <Upload className="w-4 h-4" /> Carica planimetria
                                    <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files[0] && uploadFor(e.target.files[0], "planimetria_url")} />
                                </label>
                                {settings.planimetria_url && (
                                    <img src={settings.planimetria_url.startsWith('http')?settings.planimetria_url:`${process.env.REACT_APP_BACKEND_URL}${settings.planimetria_url}`} alt="planimetria" className="w-full max-w-2xl rounded-lg border border-white/10 bg-white" />
                                )}
                            </section>

                            {/* Hero image fallback */}
                            <section className="glass-card rounded-2xl p-6 space-y-4">
                                <h3 className="font-bold text-lg flex items-center gap-2"><ImgIcon className="w-5 h-5 text-lava" /> Hero Image (fallback)</h3>
                                <input
                                    data-testid="settings-hero-image-url"
                                    className={input}
                                    placeholder="URL immagine hero"
                                    value={settings.hero_image_url || ""}
                                    onChange={(e) => setSettings({ ...settings, hero_image_url: e.target.value })}
                                />
                                <label className="btn-ghost !text-xs !px-4 !py-2 cursor-pointer inline-flex">
                                    <Upload className="w-4 h-4" /> Carica immagine
                                    <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files[0] && uploadFor(e.target.files[0], "hero_image_url")} />
                                </label>
                            </section>

                            {/* Logo */}
                            <section className="glass-card rounded-2xl p-6 space-y-4">
                                <h3 className="font-bold text-lg">Logo Glitz (bianco su trasparente)</h3>
                                <input
                                    data-testid="settings-logo-url"
                                    className={input}
                                    placeholder="URL logo"
                                    value={settings.logo_url || ""}
                                    onChange={(e) => setSettings({ ...settings, logo_url: e.target.value })}
                                />
                                <label className="btn-ghost !text-xs !px-4 !py-2 cursor-pointer inline-flex">
                                    <Upload className="w-4 h-4" /> Carica logo
                                    <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files[0] && uploadFor(e.target.files[0], "logo_url")} />
                                </label>
                                {settings.logo_url && (
                                    <div className="bg-obsidian p-6 rounded-lg inline-block">
                                        <img src={settings.logo_url.startsWith('http')?settings.logo_url:`${process.env.REACT_APP_BACKEND_URL}${settings.logo_url}`} alt="logo" className="h-16" />
                                    </div>
                                )}
                            </section>

                            {/* Instagram */}
                            <section className="glass-card rounded-2xl p-6 space-y-4">
                                <h3 className="font-bold text-lg">Instagram Feed (6 post home)</h3>
                                <input
                                    className={input}
                                    placeholder="URL profilo Instagram"
                                    value={settings.instagram_url || ""}
                                    onChange={(e) => setSettings({ ...settings, instagram_url: e.target.value })}
                                />
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    {(settings.instagram_posts || []).slice(0, 6).map((p, i) => (
                                        <div key={i} className="space-y-2 border border-white/10 rounded-lg p-3">
                                            <img src={p.image} alt="" className="w-full aspect-square object-cover rounded" />
                                            <input className={input} placeholder="Image URL" value={p.image} onChange={(e) => updateInstaPost(i, "image", e.target.value)} />
                                            <input className={input} placeholder="Post URL" value={p.url} onChange={(e) => updateInstaPost(i, "url", e.target.value)} />
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <button
                                data-testid="save-settings-btn"
                                onClick={saveSettings}
                                disabled={savingSettings}
                                className="btn-lava disabled:opacity-50"
                            >
                                {savingSettings ? "Salvataggio..." : "Salva Impostazioni"}
                            </button>
                        </div>
                    )}
                </TabsContent>

                {/* BOOKINGS */}
                <TabsContent value="bookings" className="mt-6 space-y-3">
                    <div className="flex items-center justify-between">
                        <h3 className="font-bold text-lg">Richieste Tavoli</h3>
                        <span className="text-sm text-white/60">{bookings.length} totali</span>
                    </div>
                    {bookings.length === 0 && <p className="text-white/50">Ancora nessuna richiesta.</p>}
                    <div className="grid gap-3">
                        {bookings.map((b) => (
                            <div key={b.id} data-testid={`booking-row-${b.id}`} className="glass-card rounded-xl p-4">
                                <div className="flex flex-wrap items-start gap-4">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <span className="font-bold text-white">{b.name}</span>
                                            <span className={`text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full ${b.status === "confirmed" ? "bg-green-500/20 text-green-400" : b.status === "cancelled" ? "bg-red-500/20 text-red-400" : "bg-yellow-500/20 text-yellow-400"}`}>
                                                {b.status || "pending"}
                                            </span>
                                        </div>
                                        <div className="text-xs text-white/50 mt-1 flex flex-wrap gap-3">
                                            <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {b.phone}</span>
                                            {b.email && <span className="flex items-center gap-1"><MailIcon className="w-3 h-3" /> {b.email}</span>}
                                            <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {b.guests}</span>
                                        </div>
                                        <div className="text-xs text-white/70 mt-2">
                                            {b.event_title && <><span className="text-white/40">Serata:</span> {b.event_title}<br/></>}
                                            {b.table_number && <><span className="text-white/40">Tavolo:</span> #{b.table_number} ({b.zone})<br/></>}
                                            {b.note && <><span className="text-white/40">Note:</span> {b.note}</>}
                                        </div>
                                        <div className="text-[10px] text-white/40 mt-1">{new Date(b.created_at).toLocaleString("it-IT")}</div>
                                    </div>
                                    <div className="flex gap-1.5">
                                        <button onClick={() => setBookingStatus(b.id, "confirmed")} data-testid={`booking-confirm-${b.id}`} className="p-2 text-green-400 hover:bg-green-500/20 rounded" title="Conferma"><Check className="w-4 h-4" /></button>
                                        <button onClick={() => setBookingStatus(b.id, "cancelled")} className="p-2 text-red-400 hover:bg-red-500/20 rounded" title="Rifiuta"><Trash2 className="w-4 h-4" /></button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </TabsContent>

                {/* PRIVATE EVENTS */}
                <TabsContent value="private" className="mt-6 space-y-3" data-testid="tab-content-private">
                    <div className="flex items-center justify-between">
                        <h3 className="font-bold text-lg">Richieste Eventi Privati</h3>
                        <span className="text-sm text-white/60">{privateEvents.length} totali</span>
                    </div>
                    {privateEvents.length === 0 && <p className="text-white/50">Ancora nessuna richiesta.</p>}
                    <div className="grid gap-3">
                        {privateEvents.map((pe) => {
                            const setPeStatus = async (status) => {
                                await api.patch(`/private-events/${pe.id}`, { status });
                                setPrivateEvents((prev) => prev.map((x) => x.id === pe.id ? { ...x, status } : x));
                                toast.success(`Richiesta segnata come ${status}`);
                            };
                            const areaLabel = { full: "Tutto il club", "riva-deck": "Riva Deck", "back-stage": "Back the Stage", "glitz-bar": "Glitz Bar", custom: "Da concordare" }[pe.area] || pe.area;
                            return (
                                <div key={pe.id} data-testid={`private-row-${pe.id}`} className="glass-card rounded-xl p-4">
                                    <div className="flex flex-wrap items-start gap-4">
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <span className="font-bold text-white">{pe.name}</span>
                                                <span className={`text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full ${pe.status === "contacted" ? "bg-blue-500/20 text-blue-400" : pe.status === "won" ? "bg-green-500/20 text-green-400" : pe.status === "archived" ? "bg-white/10 text-white/50" : "bg-yellow-500/20 text-yellow-400"}`}>
                                                    {pe.status || "new"}
                                                </span>
                                                <span className="text-[10px] uppercase tracking-widest bg-lava/20 text-lava px-2 py-0.5 rounded-full">
                                                    {areaLabel}
                                                </span>
                                            </div>
                                            <div className="text-xs text-white/50 mt-1 flex flex-wrap gap-3">
                                                <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> <a href={`tel:${pe.phone}`} className="hover:text-white">{pe.phone}</a></span>
                                                <span className="flex items-center gap-1"><MailIcon className="w-3 h-3" /> <a href={`mailto:${pe.email}`} className="hover:text-white">{pe.email}</a></span>
                                                <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {pe.guests} ospiti</span>
                                                <span className="flex items-center gap-1"><CalIcon className="w-3 h-3" /> {pe.event_date}</span>
                                            </div>
                                            <div className="text-xs text-white/70 mt-2 space-y-0.5">
                                                <div><span className="text-white/40">Occasione:</span> {pe.occasion}</div>
                                                {pe.budget && <div><span className="text-white/40">Budget:</span> {pe.budget}</div>}
                                                {pe.message && <div className="text-white/60 italic pt-1 border-l-2 border-lava pl-2 mt-1">{pe.message}</div>}
                                            </div>
                                            <div className="text-[10px] text-white/40 mt-2">Ricevuta il {new Date(pe.created_at).toLocaleString("it-IT")}</div>
                                        </div>
                                        <div className="flex gap-1.5 flex-wrap">
                                            <a href={`https://wa.me/${pe.phone.replace(/\D/g, "")}?text=${encodeURIComponent(`Ciao ${pe.name}, ti scrivo dal Glitz Club per la tua richiesta evento privato del ${pe.event_date}.`)}`} target="_blank" rel="noreferrer" className="px-2.5 py-1.5 text-xs bg-green-500/20 text-green-400 rounded hover:bg-green-500/30" title="Contatta su WhatsApp">WhatsApp</a>
                                            <button onClick={() => setPeStatus("contacted")} data-testid={`pe-contacted-${pe.id}`} className="p-2 text-blue-400 hover:bg-blue-500/20 rounded" title="Contattato"><MailIcon className="w-4 h-4" /></button>
                                            <button onClick={() => setPeStatus("won")} data-testid={`pe-won-${pe.id}`} className="p-2 text-green-400 hover:bg-green-500/20 rounded" title="Confermato"><Check className="w-4 h-4" /></button>
                                            <button onClick={() => setPeStatus("archived")} className="p-2 text-white/40 hover:bg-white/10 rounded" title="Archivia"><Trash2 className="w-4 h-4" /></button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
