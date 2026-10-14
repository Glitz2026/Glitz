"""Modello consumi e ordini per il pitch a C.d. Gest Srl.

Listino indicato da GLITZ. Paniere per fasce di pubblico su 8 ore; a 6 ore
le bevande scalano in proporzione, il cibo resta uguale.
Ordini a C.d. Gest = costo prodotti e ingredienti al 32% delle vendite nette
IVA 10% (ipotesi del piano economico GLITZ del 20/09/2026).
"""
import json, sys

PREZZI = {"birra": 8, "coca": 5, "acqua": 3, "panino": 8, "panino_completo": 10, "cocktail": 10, "premium": 15}
BEVANDE = {"birra", "coca", "acqua", "cocktail", "premium"}

# quota di pubblico e consumi a testa in 8 ore
FASCE = {
    "leggeri": {"quota": 0.40, "birra": 1, "cocktail": 1, "premium": 0, "coca": 1, "acqua": 2, "panino": 1, "panino_completo": 0},
    "regolari": {"quota": 0.45, "birra": 2, "cocktail": 2, "premium": 0, "coca": 1, "acqua": 2, "panino": 0, "panino_completo": 1},
    "forti": {"quota": 0.15, "birra": 3, "cocktail": 2, "premium": 2, "coca": 1, "acqua": 3, "panino": 0, "panino_completo": 1},
}
PAGANTI = [20000, 25000, 30000]
ORE = [6, 8]
IVA = 0.10
QUOTA_PRODOTTI = 0.32
FATTURATO_ANNUO = 58_944_443  # bilancio 2024, fatturatoitalia.it
LITRI_BIRRA = 0.33       # lattina da 33 cl
CL_DISTILLATO = 4        # cl per cocktail
BOTTIGLIA_CL = 70


def paniere(fascia, ore):
    k = ore / 8
    return {p: (q * k if p in BEVANDE else q) for p, q in fascia.items() if p != "quota"}


def spesa(p):
    return sum(PREZZI[x] * q for x, q in p.items())


def scenario(paganti, ore):
    vol = {x: 0.0 for x in PREZZI}
    per_fascia = {}
    for nome, f in FASCE.items():
        p = paniere(f, ore)
        n = paganti * f["quota"]
        for x, q in p.items():
            vol[x] += n * q
        per_fascia[nome] = {"persone": n, "spesa_testa": spesa(p), "spesa": n * spesa(p)}
    lordo = sum(PREZZI[x] * q for x, q in vol.items())
    netto = lordo / (1 + IVA)
    ordini = netto * QUOTA_PRODOTTI
    birra_ordini = vol["birra"] * PREZZI["birra"] / (1 + IVA) * QUOTA_PRODOTTI
    cocktail = vol["cocktail"] + vol["premium"]
    return {
        "paganti": paganti, "ore": ore,
        "volumi": {k: round(v) for k, v in vol.items()},
        "birre": round(vol["birra"]), "litri_birra": round(vol["birra"] * LITRI_BIRRA),
        "cocktail": round(cocktail), "bottiglie_distillati": round(cocktail * CL_DISTILLATO / BOTTIGLIA_CL),
        "bibite": round(vol["coca"]), "acqua": round(vol["acqua"]),
        "panini": round(vol["panino"] + vol["panino_completo"]),
        "spesa_lorda": round(lordo), "spesa_testa": round(lordo / paganti, 2),
        "ordini_cdgest": round(ordini), "ordini_birra_cala": round(birra_ordini),
        "giornate_fatturato": round(ordini / (FATTURATO_ANNUO / 365), 2),
        "fasce": {k: {"persone": round(v["persone"]), "spesa_testa": round(v["spesa_testa"], 2), "quota_spesa": round(v["spesa"] / lordo, 3)} for k, v in per_fascia.items()},
    }


if __name__ == "__main__":
    out = [scenario(p, h) for p in PAGANTI for h in ORE]
    json.dump(out, sys.stdout, ensure_ascii=False, indent=1)
