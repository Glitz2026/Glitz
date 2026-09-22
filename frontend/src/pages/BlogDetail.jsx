import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { api } from "../lib/api";
import { formatItalianDate } from "../lib/constants";
import Seo from "../components/Seo";
import SafeImage from "../components/SafeImage";

function renderMarkdown(md) {
    // Ultra-simple markdown renderer for headings/paragraphs/lists
    const lines = md.split("\n");
    const out = [];
    let i = 0;
    while (i < lines.length) {
        const line = lines[i];
        if (line.startsWith("## ")) { out.push(<h2 key={i} className="text-2xl sm:text-3xl font-bold text-white mt-10 mb-4">{line.slice(3)}</h2>); i++; }
        else if (line.startsWith("### ")) { out.push(<h3 key={i} className="text-xl font-bold text-white mt-8 mb-3">{line.slice(4)}</h3>); i++; }
        else if (line.startsWith("- ")) {
            const items = [];
            while (i < lines.length && lines[i].startsWith("- ")) { items.push(lines[i].slice(2)); i++; }
            out.push(<ul key={`u${i}`} className="list-disc list-inside text-white/70 space-y-2 my-4">{items.map((x, k) => <li key={k}>{x}</li>)}</ul>);
        } else if (line.trim() === "") { i++; }
        else { out.push(<p key={i} className="text-white/70 leading-relaxed my-4">{line}</p>); i++; }
    }
    return out;
}

export default function BlogDetail() {
    const { slug } = useParams();
    const [p, setP] = useState(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        api.get(`/posts/${slug}`).then((r) => setP(r.data)).catch(() => setError(true));
    }, [slug]);

    if (error) return <div className="max-w-4xl mx-auto px-4 py-32 text-center text-white/60">Articolo non trovato. <Link to="/news" className="text-lava underline">News</Link></div>;
    if (!p) return <div className="max-w-4xl mx-auto px-4 py-32 text-center text-white/40">Caricamento...</div>;

    const schema = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: p.title,
        image: p.cover_url,
        datePublished: p.created_at,
        author: { "@type": "Organization", name: "Glitz Club" },
    };

    return (
        <article className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
            <Seo title={p.title} description={p.excerpt} schema={schema} />
            <Link to="/news" data-testid="back-to-news" className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm uppercase tracking-widest mb-8">
                <ArrowLeft className="w-4 h-4" /> Tutti gli articoli
            </Link>
            <div className="space-y-4 mb-8">
                <div className="text-xs uppercase tracking-widest text-lava">{formatItalianDate(p.created_at)}</div>
                <h1 data-testid="post-title" className="text-4xl sm:text-5xl font-black uppercase tracking-tight leading-tight">{p.title}</h1>
                <p className="text-lg text-white/70">{p.excerpt}</p>
            </div>
            {p.cover_url && (
                <SafeImage src={p.cover_url} alt={p.title} className="w-full rounded-2xl aspect-video object-cover mb-8" />
            )}
            <div className="prose prose-invert">{renderMarkdown(p.body || "")}</div>
        </article>
    );
}
