"""Rigenera le 10 locandine Glitz 2027 con silhouette artisti + arco Glitz reale come reference.
Cambi: FORMAT NOSTRO → A.I. — Attenzione Instabile; PEGGY GOU → BOB SINCLAR."""
import asyncio, base64, os
from pathlib import Path
from dotenv import load_dotenv
from emergentintegrations.llm.chat import LlmChat, UserMessage, ImageContent

load_dotenv(Path(__file__).parent / ".env")
KEY = os.environ["EMERGENT_LLM_KEY"]
OUT_DIR = Path("/app/frontend/public/events")
OUT_DIR.mkdir(parents=True, exist_ok=True)

# Foto reale Glitz con l'arco (vista aerea al tramonto) — riferimento veritiero
REF_IMAGE = Path("/app/backend/refs/arch_ref.jpg")
with open(REF_IMAGE, "rb") as f:
    REF_B64 = base64.b64encode(f.read()).decode()

BASE_STYLE = (
    "Cinematic Italian open-air nightclub event poster. Vertical 4:5 portrait aspect ratio. "
    "CRUCIAL: use the ACTUAL Glitz Club venue from the reference photo — the arched LED stage structure, "
    "the open-air deck, the Tyrrhenian sea, Isola di Dino island silhouette in the distance, Praia a Mare coastline. "
    "FOREGROUND: full-body DARK SILHOUETTE of the artist(s) shown from behind or side profile, "
    "backlit with warm rim light, NO facial features visible, hair and posture only. "
    "Deep cinematic sunset sky in lava red, sunset orange and deep purple gradients. "
    "Editorial luxury typography, minimalist. Deep blacks, cinematic film grain, high contrast. "
    "Absolutely realistic Italian summer club atmosphere — no fantasy elements, no fictional architecture."
)

def prompt(name, subtitle, date_txt, silhouette_desc):
    return (
        f"{BASE_STYLE} "
        f"Artist silhouette detail: {silhouette_desc}. "
        f"Text overlay MUST be crisp and readable: top small caps 'GLITZ CLUB · SUMMER 2027', "
        f"large bold uppercase headline '{name}', subtitle in serif italic '{subtitle}', "
        f"bottom-right date badge '{date_txt}', location tag 'PRAIA A MARE · CS'. "
        f"Preserve the Glitz Club architecture and coastal geography from the reference photo."
    )

EVENTS = [
    ("opening-damante",    "DAMANTE",       "Opening Season 2027",       "SAB 26 GIUGNO",
     "male DJ silhouette from behind, medium athletic build, short dark hair, hands raised over the DJ booth, celebrating the opening"),
    ("giada-brince",       "GIADA BRINCE",  "Melodic Techno Night",      "SAB 03 LUGLIO",
     "female DJ silhouette from behind, long straight hair falling past shoulders, hands on the mixer, slim silhouette against purple mist"),
    ("raul-dumitras",      "RAUL DUMITRAS", "Tech House Session",        "SAB 10 LUGLIO",
     "male DJ silhouette in profile, tall lean build, concentrated head-down posture, hands on the CDJs"),
    ("ai-attenzione",      "A.I.",          "Attenzione Instabile",      "SAB 17 LUGLIO",
     "silhouettes of a duo/trio DJ collective side by side behind the booth, dynamic body language, collective energy"),
    ("mamacita-luglio",    "MAMACITA",      "Reggaeton Party",           "SAB 24 LUGLIO",
     "silhouette of a female performer with long wavy hair dancing/singing at the mic, tropical palm fronds framing the scene, magenta neon rim light"),
    ("ludwig",             "LUDWIG",        "House & Disco Show",        "VEN 06 AGOSTO",
     "male DJ silhouette from behind, elegant posture, one hand on the mixer, disco-glam vibe with warm gold rim light"),
    ("pagante-ferragosto", "PAGANTE",       "Ferragosto Special",        "SAB 14 AGOSTO",
     "silhouettes of three party performers side by side, playful poses, pop-culture group energy, festive Ferragosto vibe with fireworks in the sky"),
    ("bob-sinclar",        "BOB SINCLAR",   "International Headliner",   "SAB 21 AGOSTO",
     "iconic male DJ silhouette from behind wearing a fedora hat and headphones around his neck, one arm raised triumphantly, French house legend pose"),
    ("gue",                "GUÈ",           "Live in Concert",           "VEN 27 AGOSTO",
     "male rapper silhouette side-profile at center stage holding a microphone close to the mouth, dropped shoulder pose, spotlight cone illuminating him from above"),
    ("mamacita-closing",   "MAMACITA",      "Closing Party 2027",        "SAB 28 AGOSTO",
     "silhouette of a female performer with arms wide open in celebration, palm fronds framing, magenta pink fireworks in the sky, closing farewell energy"),
]

async def gen_one(slug, name, subtitle, date_txt, silh):
    print(f"[start] {slug}")
    chat = LlmChat(api_key=KEY, session_id=f"glitz-v2-{slug}",
                   system_message="You are a cinematic Italian club poster designer using real venue photo references.")
    chat.with_model("gemini", "gemini-3.1-flash-image-preview").with_params(modalities=["image", "text"])
    try:
        msg = UserMessage(text=prompt(name, subtitle, date_txt, silh), file_contents=[ImageContent(REF_B64)])
        _text, images = await chat.send_message_multimodal_response(msg)
        if not images:
            print(f"[FAIL] {slug} — no image")
            return slug, None
        out = OUT_DIR / f"{slug}.png"
        out.write_bytes(base64.b64decode(images[0]["data"]))
        print(f"[done]  {slug} → {out.stat().st_size} bytes")
        return slug, f"/events/{slug}.png"
    except Exception as e:
        print(f"[FAIL] {slug} — {e}")
        return slug, None

async def main():
    results = await asyncio.gather(*[gen_one(*e) for e in EVENTS])
    print("\n=== SUMMARY ===")
    for slug, url in results:
        print(f"  {slug}: {url}")

if __name__ == "__main__":
    asyncio.run(main())
