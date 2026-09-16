"""Genera 10 locandine Glitz Club 2027 con Nano Banana (Gemini) in parallelo."""
import asyncio
import base64
import os
from pathlib import Path
from dotenv import load_dotenv
from emergentintegrations.llm.chat import LlmChat, UserMessage

load_dotenv(Path(__file__).parent / ".env")
KEY = os.environ["EMERGENT_LLM_KEY"]
OUT_DIR = Path("/app/frontend/public/events")
OUT_DIR.mkdir(parents=True, exist_ok=True)

BASE_STYLE = (
    "Cinematic open-air nightclub event poster. Dark moody Mediterranean sunset over the sea, "
    "silhouette of an iconic Glitz Club open-air venue with a curved LED arch above the DJ booth. "
    "Neon accents of lava red, sunset orange and deep purple. Editorial luxury typography. "
    "Vertical 4:5 portrait aspect ratio. Deep blacks, cinematic film grain, high contrast. "
    "No people visible. Coastal architecture, Praia a Mare Calabria vibe. Minimal, moody, expensive."
)

def poster_prompt(title: str, subtitle: str, date_txt: str, vibe: str) -> str:
    return (
        f"{BASE_STYLE} Additional vibe: {vibe}. "
        f"Text overlay (must be crisp and readable): top small caps 'GLITZ CLUB · SUMMER 2027', "
        f"large bold uppercase headline '{title}', below smaller subtitle '{subtitle}', "
        f"and bottom-right date '{date_txt}'. "
        f"Location tag 'PRAIA A MARE · CS'."
    )

EVENTS = [
    ("opening-damante",   "DAMANTE",       "Opening Season 2027",         "SAB 26 GIUGNO",  "grand opening, fireworks over the sea, celebratory red-carpet neon aura, iconic italian house DJ energy"),
    ("giada-brince",      "GIADA BRINCE",  "Melodic Techno Night",        "SAB 03 LUGLIO",  "hypnotic melodic techno, deep purple mist, female headliner powerful stage presence"),
    ("raul-dumitras",     "RAUL DUMITRAS", "Tech House Session",          "SAB 10 LUGLIO",  "raw underground tech house, industrial concrete + sunset, warehouse-club fusion"),
    ("format-nostro",     "FORMAT NOSTRO", "Italian House Movement",      "SAB 17 LUGLIO",  "italian house collective, warm sunset tones, group energy, tribal drums"),
    ("mamacita-luglio",   "MAMACITA",      "Reggaeton Party Series",      "SAB 24 LUGLIO",  "reggaeton tropical vibe, pink and hot magenta neon, palm trees, latin party energy, MAMACITA logo aesthetic"),
    ("ludwig",            "LUDWIG",        "House & Disco Show",          "VEN 06 AGOSTO",  "disco-house glamour, gold and champagne accents, glitter mist, retro-futurist"),
    ("pagante-ferragosto","PAGANTE",       "Ferragosto Special",          "SAB 14 AGOSTO",  "ferragosto festive party, pop-culture kitsch, playful multicolor neon, Italian summer meme aesthetic, party pop"),
    ("peggy-gou",         "PEGGY GOU",     "International Headliner",     "SAB 21 AGOSTO",  "international superstar DJ, futuristic minimalist, K-pop meets club culture, chrome and cobalt blue accents"),
    ("gue",               "GUÈ",           "Live in Concert",             "VEN 27 AGOSTO",  "italian rap concert, spotlight cone, smoke, chrome silver + red neon, urban gritty luxurious"),
    ("mamacita-closing",  "MAMACITA",      "Closing Party 2027",          "SAB 28 AGOSTO",  "grand closing reggaeton finale, fireworks + magenta pink + palm tree silhouettes, MAMACITA logo aesthetic, farewell energy"),
]

async def gen_one(slug: str, title: str, subtitle: str, date_txt: str, vibe: str):
    prompt = poster_prompt(title, subtitle, date_txt, vibe)
    print(f"[start] {slug}")
    chat = LlmChat(api_key=KEY, session_id=f"glitz-{slug}", system_message="You are a cinematic poster designer.")
    chat.with_model("gemini", "gemini-3.1-flash-image-preview").with_params(modalities=["image", "text"])
    try:
        _text, images = await chat.send_message_multimodal_response(UserMessage(text=prompt))
        if not images:
            print(f"[FAIL] {slug} — no image returned")
            return slug, None
        img = images[0]
        out = OUT_DIR / f"{slug}.png"
        out.write_bytes(base64.b64decode(img["data"]))
        print(f"[done]  {slug} → {out} ({out.stat().st_size} bytes)")
        return slug, f"/events/{slug}.png"
    except Exception as e:
        print(f"[FAIL]  {slug} — {e}")
        return slug, None

async def main():
    results = await asyncio.gather(*[gen_one(*e) for e in EVENTS])
    print("\n=== SUMMARY ===")
    for slug, url in results:
        print(f"  {slug}: {url}")

if __name__ == "__main__":
    asyncio.run(main())
