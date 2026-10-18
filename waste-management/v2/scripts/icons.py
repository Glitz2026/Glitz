"""Pittogrammi lineari coerenti (24×24, tratto 1.4, colore corrente)."""

P = {
    # destinazioni d'uso detergenza
    'pavimenti': '<path d="M14 3l-5 13"/><path d="M5.5 15.5h7l1.5 5H4z"/><path d="M3 21h18"/>',
    'vetri': '<rect x="3" y="4" width="11" height="16" rx="1"/><path d="M8.5 4v16M3 12h11"/><path d="M17 9h3v3l-1 8h-2l-1-8z"/><path d="M18.5 9V6h-2"/>',
    'cucina': '<path d="M3 12h13a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4z"/><path d="M16 12h5"/><path d="M8 9c0-1.5 1.5-1.5 1.5-3S8 4.5 8 3M12 9c0-1.5 1.5-1.5 1.5-3S12 4.5 12 3"/><path d="M5 20h11"/>',
    'incrostazioni': '<path d="M12 3s5 6 5 10a5 5 0 0 1-10 0c0-4 5-10 5-10z"/><path d="M10 14l2 2 3-4"/>',
    'stoviglie': '<circle cx="9" cy="13" r="6"/><circle cx="9" cy="13" r="3"/><path d="M18 3v7a2 2 0 0 1-2 2M18 12v9M20 3v5M16 3v5"/>',
    'bagno': '<path d="M5 11h14v2a6 6 0 0 1-6 6h-2a6 6 0 0 1-6-6z"/><path d="M7 11V5a2 2 0 0 1 4 0"/><path d="M8 19l-1 2M16 19l1 2"/>',
    'lavanderia': '<rect x="4" y="3" width="16" height="18" rx="2"/><circle cx="12" cy="13" r="4.5"/><path d="M7 6.5h2M14 6.5h3"/>',
    'lavamani': '<path d="M9 7V4h4l2 2"/><path d="M8 7h6v3H8z"/><path d="M5 16c2-1 3-3 5-3h6a2 2 0 0 1 0 4h-3"/><path d="M4 20h10l6-3"/>',
    'ambienti': '<path d="M3 8h11a3 3 0 1 0-3-3"/><path d="M3 12h16a3 3 0 1 1-3 3"/><path d="M3 16h8"/>',
    'accessori': '<path d="M4 6l10-2 6 4-2 12-12 1z"/><path d="M8 9l8-1M8 13l7-1M8 17l6-1"/>',
    # attività
    'ristorazione': '<path d="M7 3v8M5 3v5a2 2 0 0 0 4 0V3M7 11v10"/><path d="M17 21V3c-2 1-3 4-3 7h3"/>',
    'bar': '<path d="M5 8h11v6a5 5 0 0 1-5 5h-1a5 5 0 0 1-5-5z"/><path d="M16 10h1.5a2.5 2.5 0 0 1 0 5H16"/><path d="M8 3v2M11 3v2M14 3v2"/>',
    'gelaterie': '<path d="M8 11l4 10 4-10"/><path d="M7 11a5 5 0 0 1 10 0z"/><path d="M9.5 6.5a3 3 0 0 1 5 0"/>',
    'hotel': '<path d="M3 18V7M3 14h18v4M21 14v-2a3 3 0 0 0-3-3h-7v5"/><circle cx="7" cy="11" r="2"/>',
    'balneari': '<path d="M12 4v17"/><path d="M3 11a9 7 0 0 1 18 0z"/><path d="M4 21h16"/>',
    'negozi': '<path d="M5 8h14l-1 13H6z"/><path d="M9 10V6a3 3 0 0 1 6 0v4"/>',
    'pulizia': '<path d="M5 9h14l-2 12H7z"/><path d="M8 9a4 4 0 0 1 8 0"/><path d="M9 13h6"/>',
    'estetici': '<path d="M12 4c2 3 2 6 0 9-2-3-2-6 0-9z"/><path d="M12 13c3-3 6-3 8-2-1 4-5 5-8 2zM12 13c-3-3-6-3-8-2 1 4 5 5 8 2z"/><path d="M12 13v7"/>',
    'medici': '<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M12 8v8M8 12h8"/>',
    'officine': '<path d="M14.5 6.5a4 4 0 0 0-5.3 5.3L4 17v3h3l5.2-5.2a4 4 0 0 0 5.3-5.3l-2.5 2.5-2.3-.7-.7-2.3z"/>',
    # varie
    'brush': '<path d="M14 4l6 6-8 8H6v-6z"/><path d="M11 7l6 6"/>',
    'phone': '<path d="M5 4h4l1.5 4.5-2 1.5a11 11 0 0 0 5.5 5.5l1.5-2L20 15v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>',
    'insta': '<rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17" cy="7" r=".8" fill="currentColor"/>',
    'pin': '<path d="M12 21s-7-6.5-7-12a7 7 0 0 1 14 0c0 5.5-7 12-7 12z"/><circle cx="12" cy="9" r="2.5"/>',
    'box': '<path d="M3 7l9-4 9 4v10l-9 4-9-4z"/><path d="M3 7l9 4 9-4M12 11v10"/>',
    'cup': '<path d="M6 6h12l-1.5 15h-9z"/><path d="M5 6h14V4H5z"/>',
    'bag': '<path d="M5 8h14l-1 13H6z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>',
    'napkin': '<path d="M4 4h16v16H4z"/><path d="M4 4l16 16"/>',
}


def icon(name, size='100%', stroke=1.4):
    return (f'<svg viewBox="0 0 24 24" width="{size}" height="{size}" fill="none" stroke="currentColor" stroke-width="{stroke}" '
            f'stroke-linecap="round" stroke-linejoin="round">{P[name]}</svg>')
