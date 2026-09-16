import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api, API } from "../lib/api";
import { toast } from "sonner";
import { LogOut, Plus, Trash2, Edit, Upload, Calendar as CalIcon, FileText, HelpCircle, Image as ImgIcon, Settings as SettingsIcon, Video, Users, Phone, Mail as MailIcon, Check, PenLine, Euro, Ticket, CalendarDays, ArrowUp, ArrowDown } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs";

function resolveMediaUrl(m) {
    if (!m.url) return "";
    if (m.url.startsWith("http")) return m.url;
    const base = process.env.REACT_APP_BACKEND_URL;
    return `${base}${m.url}`;
}

const emptyEvent = { title: "", date: "", lineup: "", description: "", poster_url: "", artist_photo_url: "", ticket_url: "https://www.ticketsms.it/", location: "Contrada Dino, San Nicola Arcella (CS)", published: true, floorplan_enabled: false };
const emptyPost = { title: "", slug: "", excerpt: "", cover_url: "", body: "", tags: "", published: true };
const emptyFaq = { question: "", answer: "", order: 0 };

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
                <TabsList className="bg-surface border border-white/10 grid grid-cols-2 lg:grid-cols-8 h-auto p-1">
                    <TabsTrigger value="events" data-testid="tab-events" className="data-[state=active]:bg-lava data-[state=active]:text-white gap-2"><CalIcon className="w-4 h-4" /> Eventi</TabsTrigger>
                    <TabsTrigger value="posts" data-testid="tab-posts" className="data-[state=active]:bg-lava data-[state=active]:text-white gap-2"><FileText className="w-4 h-4" /> Blog</TabsTrigger>
                    <TabsTrigger value="faqs" data-testid="tab-faqs" className="data-[state=active]:bg-lava data-[state=active]:text-white gap-2"><HelpCircle className="w-4 h-4" /> FAQ</TabsTrigger>
                    <TabsTrigger value="media" data-testid="tab-media" className="data-[state=active]:bg-lava data-[state=active]:text-white gap-2"><ImgIcon className="w-4 h-4" /> Media</TabsTrigger>
                    <TabsTrigger value="bookings" data-testid="tab-bookings" className="data-[state=active]:bg-lava data-[state=active]:text-white gap-2"><Users className="w-4 h-4" /> Prenotazioni</TabsTrigger>
                    <TabsTrigger value="private" data-testid="tab-private" className="data-[state=active]:bg-lava data-[state=active]:text-white gap-2" onClick={() => api.get("/private-events").then((r) => setPrivateEvents(r.data)).catch(() => {})}>
                        <Users className="w-4 h-4" /> Eventi Privati
                    </TabsTrigger>
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
                            <div className="glass-card rounded-2xl p-6 space-y-4">
                                <div>
                                    <h3 className="font-bold text-lg">Titolo Hero (2 righe)</h3>
                                    <p className="text-xs text-white/50 mt-1">La prima riga (es. BEYOND) usa il font editorial bianco. La seconda (es. THE NIGHT) usa il colore lava.</p>
                                </div>
                                <div className="grid gap-3 sm:grid-cols-2">
                                    <input data-testid="content-hero-line1" className={input} placeholder="Riga 1" value={settings.home_hero_line1 || ""} onChange={(e) => setSettings({ ...settings, home_hero_line1: e.target.value })} />
                                    <input data-testid="content-hero-line2" className={input} placeholder="Riga 2" value={settings.home_hero_line2 || ""} onChange={(e) => setSettings({ ...settings, home_hero_line2: e.target.value })} />
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
