"""Popola la programmazione ufficiale Glitz 2027: pulisce gli eventi esistenti e inserisce i 10 nuovi."""
import os, requests, json
from pathlib import Path
from dotenv import load_dotenv

load_dotenv(Path(__file__).parent / ".env")

# Try both prod and local
API = os.environ.get("PUBLIC_API") or "http://localhost:8001"

# Login
r = requests.post(f"{API}/api/auth/login", json={"email": "jalucas@hotmail.it", "password": "GlitzAdmin2026!"})
r.raise_for_status()
TOKEN = r.json()["token"]
H = {"Authorization": f"Bearer {TOKEN}", "Content-Type": "application/json"}

# Fetch existing and delete all
existing = requests.get(f"{API}/api/events").json()
print(f"Deleting {len(existing)} existing events...")
for e in existing:
    d = requests.delete(f"{API}/api/admin/events/{e['id']}", headers=H)
    print(f"  del {e['title']} → {d.status_code}")

# Frontend origin for posters
FRONTEND = "https://glitz-nightclub.preview.emergentagent.com"

EVENTS = [
    {
        "slug": "opening-damante",
        "title": "DAMANTE — Opening Season 2027",
        "date": "2027-06-26T22:00:00+02:00",
        "lineup": ["Andrea Damante", "Resident DJs Glitz"],
        "description": (
            "L'estate del Glitz si apre con una delle figure più iconiche della scena italiana: **Andrea Damante**. "
            "Un opening cinematografico che segna l'inizio della stagione 2027 sul Belvedere di Praia a Mare. "
            "Fuochi d'artificio sul mare, arco LED acceso al tramonto, dress code black-tie casual e prevendite già esaurite da settimane. "
            "Damante porterà in consolle il suo signature sound: house melodica, drop caldi e i suoi cavalli di battaglia da Ibiza a Miami. "
            "Preparati per la notte con cui il Glitz alza il sipario sull'estate italiana più attesa dell'anno."
        ),
        "location": "Contrada Dino, San Nicola Arcella (CS)",
        "ticket_url": "https://www.ticketsms.it/glitz-club",
        "floorplan_enabled": True,
    },
    {
        "slug": "giada-brince",
        "title": "GIADA BRINCE — Melodic Techno Night",
        "date": "2027-07-03T22:00:00+02:00",
        "lineup": ["Giada Brince", "Support: Loris Tramontana"],
        "description": (
            "**Giada Brince** sbarca al Glitz con un set immersivo di melodic techno che unisce eleganza e potenza. "
            "Una delle voci femminili più forti dell'underground italiano, Giada trasformerà l'arco del Glitz in un tempio ipnotico "
            "con synth atmosferici, kick profondi e drop cinematografici. "
            "Ambientazione dark, luci rosse e viola, foschia bassa sul deck: il tramonto lascia spazio a una notte da vivere fino all'alba."
        ),
        "location": "Contrada Dino, San Nicola Arcella (CS)",
        "ticket_url": "https://www.ticketsms.it/glitz-club",
        "floorplan_enabled": True,
    },
    {
        "slug": "raul-dumitras",
        "title": "RAUL DUMITRAS — Tech House Session",
        "date": "2027-07-10T22:00:00+02:00",
        "lineup": ["Raul Dumitras", "Warm-up: Riccardo Lena"],
        "description": (
            "**Raul Dumitras** porta al Glitz un set di tech house raw e groove che ha conquistato Amnesia, Hï e le migliori pistole d'Europa. "
            "Bassi profondi, percussioni tribali e drop chirurgici: la firma sonora di uno dei DJ più richiesti della scena underground italiana. "
            "Serata dedicata a chi ama il ritmo puro, senza compromessi. Consolle a filo pista, arco LED programmato dal light designer del club."
        ),
        "location": "Contrada Dino, San Nicola Arcella (CS)",
        "ticket_url": "https://www.ticketsms.it/glitz-club",
        "floorplan_enabled": True,
    },
    {
        "slug": "format-nostro",
        "title": "FORMAT NOSTRO — Italian House Movement",
        "date": "2027-07-17T22:00:00+02:00",
        "lineup": ["Format Nostro Collective", "Guest Special TBA"],
        "description": (
            "Il collettivo **Format Nostro** sbarca per la prima volta al Glitz. "
            "Il format che sta ridefinendo la scena house italiana con serate sold out da Milano a Napoli porta la sua energia sul Belvedere. "
            "Warm sunset tones, tribal drums, italo-house nostalgia con una punta di groove contemporaneo. "
            "Serata pensata per ballare fino al tramonto seguente, con un roster di DJ che si passano il testimone senza soluzione di continuità."
        ),
        "location": "Contrada Dino, San Nicola Arcella (CS)",
        "ticket_url": "https://www.ticketsms.it/glitz-club",
        "floorplan_enabled": True,
    },
    {
        "slug": "mamacita-luglio",
        "title": "MAMACITA — Reggaeton Party",
        "date": "2027-07-24T22:00:00+02:00",
        "lineup": ["Mamacita DJs", "Reggaeton Latin Show"],
        "description": (
            "**MAMACITA** arriva al Glitz con la party series reggaeton più famosa d'Italia. "
            "Dress code: perreo intenso, pink neon lights, tropical vibes e i tormentoni latini che stanno spaccando le classifiche mondiali. "
            "Balli caldi, tequila fredda, animazione live e ballerini. Una notte che trasforma il Glitz in una spiaggia caraibica sul Tirreno. "
            "Mamacita è la serata che ha portato Bad Bunny, J Balvin e Rauw Alejandro nelle playlist di ogni festa: preparati a cantare ogni parola."
        ),
        "location": "Contrada Dino, San Nicola Arcella (CS)",
        "ticket_url": "https://www.ticketsms.it/glitz-club",
        "floorplan_enabled": True,
    },
    {
        "slug": "ludwig",
        "title": "LUDWIG — House & Disco Show",
        "date": "2027-08-06T22:00:00+02:00",
        "lineup": ["Ludwig", "Resident: Marco Cavax"],
        "description": (
            "**Ludwig** al Glitz: un viaggio tra disco-house glamour, groove funky e melodie che ti restano addosso per giorni. "
            "L'estetica retro-futurista incontra il tramonto sul mare: paillettes d'oro, luci ambra, fumo basso e drop pensati per essere ballati con eleganza. "
            "Una delle serate più \"da vestirsi bene\" della stagione — cappotti leggeri, occhiali da sera anche a mezzanotte, cocktail nel bicchiere giusto."
        ),
        "location": "Contrada Dino, San Nicola Arcella (CS)",
        "ticket_url": "https://www.ticketsms.it/glitz-club",
        "floorplan_enabled": True,
    },
    {
        "slug": "pagante-ferragosto",
        "title": "PAGANTE — Ferragosto Special",
        "date": "2027-08-14T22:00:00+02:00",
        "lineup": ["Il Pagante", "Live Show & DJ Set"],
        "description": (
            "**IL PAGANTE FERRAGOSTO**. La serata più iconica del calendario Glitz. "
            "Il collettivo che ha fatto la storia del pop-club italiano prende possesso del Belvedere per la notte di Ferragosto 2027. "
            "Live show, hit dei loro album, cori corali, meme in loop e la festa più pop che l'estate italiana possa regalare. "
            "Fuochi d'artificio a mezzanotte, brindisi collettivo, dress code kitsch libero. "
            "È la serata che tutti vogliono raccontare: preparati a cantare 'Entro in pista' fino alle 5 del mattino."
        ),
        "location": "Contrada Dino, San Nicola Arcella (CS)",
        "ticket_url": "https://www.ticketsms.it/glitz-club",
        "floorplan_enabled": True,
    },
    {
        "slug": "peggy-gou",
        "title": "PEGGY GOU — International Headliner",
        "date": "2027-08-21T22:00:00+02:00",
        "lineup": ["Peggy Gou", "Opening: Angelica Nova"],
        "description": (
            "**PEGGY GOU** al Glitz. L'headliner internazionale della stagione. "
            "La regina globale del clubbing arriva a Praia a Mare dopo i suoi sold out a Ibiza, Coachella e Tokyo. "
            "Un set di house profonda, K-house iconica, groove ipnotico e i suoi hit più cantati — da \"It Goes Like Nanana\" a \"I Believe In Love Again\". "
            "Ingressi contingentati, area VIP privé sold out da mesi. È la notte che segnerà l'estate italiana 2027 e che ricorderai per sempre."
        ),
        "location": "Contrada Dino, San Nicola Arcella (CS)",
        "ticket_url": "https://www.ticketsms.it/glitz-club",
        "floorplan_enabled": True,
    },
    {
        "slug": "gue",
        "title": "GUÈ — Live in Concert",
        "date": "2027-08-27T22:00:00+02:00",
        "lineup": ["Guè", "DJ Harsh"],
        "description": (
            "**GUÈ LIVE AL GLITZ**. Il concerto evento della stagione. "
            "Uno degli MC più influenti del rap italiano porta il suo repertorio al Belvedere: da Club Dogo agli ultimi album solisti, "
            "una scaletta pensata per far cantare 2000 persone sotto le stelle. "
            "Palco frontale, luci rosse e cromate, backing DJ set post-live fino al mattino. "
            "Una serata che unisce cultura hip-hop, luxury club e vista mare: il format che solo il Glitz può offrire."
        ),
        "location": "Contrada Dino, San Nicola Arcella (CS)",
        "ticket_url": "https://www.ticketsms.it/glitz-club",
        "floorplan_enabled": True,
    },
    {
        "slug": "mamacita-closing",
        "title": "MAMACITA — Closing Party 2027",
        "date": "2027-08-28T22:00:00+02:00",
        "lineup": ["Mamacita DJs", "Special Guest & Fireworks"],
        "description": (
            "**MAMACITA CLOSING 2027**. L'ultima notte della stagione. "
            "La party series reggaeton più amata d'Italia chiude l'estate con lo show più caldo dell'anno: perreo intenso, fuochi d'artificio all'alba, "
            "brindisi finale in pista, guest surprise e i migliori tormentoni latini della stagione. "
            "Chi c'era racconterà per sempre di essere stato all'ultimo Mamacita dell'estate 2027. "
            "Prevendite in esaurimento: chiudiamo il sipario con la festa che il Glitz merita."
        ),
        "location": "Contrada Dino, San Nicola Arcella (CS)",
        "ticket_url": "https://www.ticketsms.it/glitz-club",
        "floorplan_enabled": True,
    },
]

print(f"\nCreating {len(EVENTS)} events...")
for e in EVENTS:
    payload = {
        "title": e["title"],
        "date": e["date"],
        "lineup": e["lineup"],
        "description": e["description"],
        "poster_url": f"{FRONTEND}/events/{e['slug']}.png",
        "gallery": [],
        "ticket_url": e["ticket_url"],
        "location": e["location"],
        "published": True,
        "floorplan_enabled": e.get("floorplan_enabled", False),
        "reserved_tables": {},
    }
    r = requests.post(f"{API}/api/admin/events", headers=H, json=payload)
    if r.ok:
        print(f"  ✓ {e['title']} → {r.json()['id']}")
    else:
        print(f"  ✗ {e['title']} → {r.status_code} {r.text[:200]}")

print("\n=== FINAL EVENTS ===")
for e in requests.get(f"{API}/api/events").json():
    print(f"  {e['title']} — {e['date']}")
