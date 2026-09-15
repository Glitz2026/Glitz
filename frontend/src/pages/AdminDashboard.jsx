import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api, API } from "../lib/api";
import { toast } from "sonner";
import { LogOut, Plus, Trash2, Edit, Upload, Calendar as CalIcon, FileText, HelpCircle, Image as ImgIcon, Settings as SettingsIcon, Video } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs";

function resolveMediaUrl(m) {
    if (!m.url) return "";
    if (m.url.startsWith("http")) return m.url;
    const base = process.env.REACT_APP_BACKEND_URL;
    return `${base}${m.url}`;
}

const emptyEvent = { title: "", date: "", lineup: "", description: "", poster_url: "", ticket_url: "https://www.ticketsms.it/", location: "Contrada Dino, San Nicola Arcella (CS)", published: true, floorplan_enabled: false };
const emptyPost = { title: "", slug: "", excerpt: "", cover_url: "", body: "", tags: "", published: true };
const emptyFaq = { question: "", answer: "", order: 0 };

export default function AdminDashboard() {
    const nav = useNavigate();
    const [tab, setTab] = useState("events");
    const [events, setEvents] = useState([]);
    const [posts, setPosts] = useState([]);
    const [faqs, setFaqs] = useState([]);
    const [media, setMedia] = useState([]);
    const [editEvent, setEditEvent] = useState(null);
    const [editPost, setEditPost] = useState(null);
    const [editFaq, setEditFaq] = useState(null);
    const [settings, setSettings] = useState(null);
    const [savingSettings, setSavingSettings] = useState(false);

    const email = localStorage.getItem("glitz_admin_email");

    const load = async () => {
        try {
            const [e, p, f, m, s] = await Promise.all([
                api.get("/events", { params: { published_only: false } }),
                api.get("/posts", { params: { published_only: false } }),
                api.get("/faqs"),
                api.get("/media"),
                api.get("/settings"),
            ]);
            setEvents(e.data); setPosts(p.data); setFaqs(f.data); setMedia(m.data); setSettings(s.data);
        } catch (err) {
            if (err?.response?.status === 401) { logout(); }
        }
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

    // Settings
    const saveSettings = async () => {
        setSavingSettings(true);
        try {
            const payload = {
                hero_video_url: settings.hero_video_url || "",
                hero_image_url: settings.hero_image_url || "",
                logo_url: settings.logo_url || "",
                logo_dark_url: settings.logo_dark_url || "",
                instagram_url: settings.instagram_url || "",
                instagram_posts: settings.instagram_posts || [],
            };
            await api.put("/admin/settings", payload);
            toast.success("Impostazioni salvate");
        } catch (err) { toast.error("Errore salvataggio"); }
        finally { setSavingSettings(false); }
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

            <Tabs value={tab} onValueChange={setTab}>
                <TabsList className="bg-surface border border-white/10 grid grid-cols-2 lg:grid-cols-5 h-auto p-1">
                    <TabsTrigger value="events" data-testid="tab-events" className="data-[state=active]:bg-lava data-[state=active]:text-white gap-2"><CalIcon className="w-4 h-4" /> Eventi</TabsTrigger>
                    <TabsTrigger value="posts" data-testid="tab-posts" className="data-[state=active]:bg-lava data-[state=active]:text-white gap-2"><FileText className="w-4 h-4" /> Blog</TabsTrigger>
                    <TabsTrigger value="faqs" data-testid="tab-faqs" className="data-[state=active]:bg-lava data-[state=active]:text-white gap-2"><HelpCircle className="w-4 h-4" /> FAQ</TabsTrigger>
                    <TabsTrigger value="media" data-testid="tab-media" className="data-[state=active]:bg-lava data-[state=active]:text-white gap-2"><ImgIcon className="w-4 h-4" /> Media</TabsTrigger>
                    <TabsTrigger value="settings" data-testid="tab-settings" className="data-[state=active]:bg-lava data-[state=active]:text-white gap-2"><SettingsIcon className="w-4 h-4" /> Impostazioni</TabsTrigger>
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
                            <input className={input} placeholder="URL Poster" value={editEvent.poster_url} onChange={(e) => setEditEvent({ ...editEvent, poster_url: e.target.value })} />
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
                    <label data-testid="upload-media-btn" className="btn-lava !px-5 !py-2.5 !text-xs cursor-pointer inline-flex">
                        <Upload className="w-4 h-4" /> Carica Foto
                        <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files[0] && uploadMedia(e.target.files[0])} />
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
                        {media.map((m) => (
                            <div key={m.id} className="relative group rounded-xl overflow-hidden border border-white/10">
                                <img src={resolveMediaUrl(m)} alt="" className="w-full aspect-square object-cover" />
                                <button onClick={() => delMedia(m.id)} className="absolute top-2 right-2 p-2 bg-red-500/80 text-white rounded-full opacity-0 group-hover:opacity-100 transition">
                                    <Trash2 className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        ))}
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
                                <p className="text-sm text-white/60">Carica l'aftermovie (mp4/webm) o incolla un URL diretto. Verrà mostrato in loop, autoplay muted sulla home.</p>
                                <input
                                    data-testid="settings-hero-video-url"
                                    className={input}
                                    placeholder="URL video (es. https://.../aftermovie.mp4)"
                                    value={settings.hero_video_url || ""}
                                    onChange={(e) => setSettings({ ...settings, hero_video_url: e.target.value })}
                                />
                                <label data-testid="settings-hero-video-upload" className="btn-ghost !text-xs !px-4 !py-2 cursor-pointer inline-flex">
                                    <Upload className="w-4 h-4" /> Carica video
                                    <input type="file" accept="video/*" className="hidden" onChange={(e) => e.target.files[0] && uploadFor(e.target.files[0], "hero_video_url")} />
                                </label>
                                {settings.hero_video_url && (
                                    <video src={settings.hero_video_url} className="w-full max-w-md rounded-lg" controls muted />
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
                                {settings.hero_image_url && (
                                    <img src={settings.hero_image_url} alt="hero" className="w-full max-w-md rounded-lg" />
                                )}
                            </section>

                            {/* Logo */}
                            <section className="glass-card rounded-2xl p-6 space-y-4">
                                <h3 className="font-bold text-lg">Logo Glitz</h3>
                                <input
                                    data-testid="settings-logo-url"
                                    className={input}
                                    placeholder="URL logo (bianco su nero, preferibile PNG con trasparenza)"
                                    value={settings.logo_url || ""}
                                    onChange={(e) => setSettings({ ...settings, logo_url: e.target.value })}
                                />
                                <label className="btn-ghost !text-xs !px-4 !py-2 cursor-pointer inline-flex">
                                    <Upload className="w-4 h-4" /> Carica logo
                                    <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files[0] && uploadFor(e.target.files[0], "logo_url")} />
                                </label>
                                {settings.logo_url && (
                                    <div className="bg-obsidian p-6 rounded-lg inline-block">
                                        <img src={settings.logo_url} alt="logo" className="h-16" />
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
            </Tabs>
        </div>
    );
}
