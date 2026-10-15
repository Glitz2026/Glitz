"""Modello consumi e ordini per il pitch a C.D. Gest Srl.

Listino del festival indicato da GLITZ (prezzi al pubblico, IVA inclusa).
Paniere per fasce di pubblico su 8 ore di permanenza; a 6 ore le bevande
scalano in proporzione, il cibo resta uguale. Una fascia non beve alcol
(minorenni, astemi, chi guida).
Ordini a C.D. Gest = pezzi venduti × costo d'acquisto indicativo per prodotto
(IVA esclusa), da sostituire con i listini reali di C.D. Gest.
"""
import json, sys

PREZZI = {"birra": 8, "coca": 5, "acqua": 3, "panino": 8, "panino_completo": 10, "cocktail": 10, "premium": 15}

# costo d'acquisto indicativo per pezzo, IVA esclusa
COSTI = {
    "birra": 2.00,            # Birra Cala 33 cl
    "cocktail": 1.60,         # 4 cl di distillato, mixer, ghiaccio e guarnizione
    "premium": 2.80,          # 4 cl di distillato premium, mixer, ghiaccio
    "coca": 0.60,             # Coca-Cola 33 cl
    "acqua": 0.25,            # acqua 50 cl
    "panino": 2.00,
    "panino_completo": 2.80,
}
BEVANDE = {"birra", "coca", "acqua", "cocktail", "premium"}
ALCOLICI = {"birra", "cocktail", "premium"}

# quota di pubblico e consumi a testa in 8 ore
FASCE = {
    "senza_alcol": {"quota": 0.15, "birra": 0, "cocktail": 0, "premium": 0, "coca": 1, "acqua": 2, "panino": 1, "panino_completo": 0},
    "leggeri": {"quota": 0.30, "birra": 1, "cocktail": 1, "premium": 0, "coca": 1, "acqua": 2, "panino": 1, "panino_completo": 0},
    "regolari": {"quota": 0.40, "birra": 2, "cocktail": 2, "premium": 0, "coca": 1, "acqua": 2, "panino": 0, "panino_completo": 1},
    "alto_spendenti": {"quota": 0.15, "birra": 3, "cocktail": 2, "premium": 2, "coca": 1, "acqua": 3, "panino": 0, "panino_completo": 1},
}
PAGANTI = [20000, 25000, 30000]
ORE = [6, 8]
FATTURATO_ANNUO = 58_944_443  # bilancio 2024, fatturatoitalia.it
LITRI_BIRRA = 0.33       # birra da 33 cl
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
        per_fascia[nome] = {"persone": n, "spesa_testa": spesa(p), "spesa": n * spesa(p),
                            "alcolici": n * sum(q for x, q in p.items() if x in ALCOLICI)}
    lordo = sum(PREZZI[x] * q for x, q in vol.items())
    ordini = {x: vol[x] * COSTI[x] for x in vol}
    alcolici = sum(v["alcolici"] for v in per_fascia.values())
    cocktail = vol["cocktail"] + vol["premium"]
    return {
        "paganti": paganti, "ore": ore,
        "volumi": {k: round(v) for k, v in vol.items()},
        "birre": round(vol["birra"]), "litri_birra": round(vol["birra"] * LITRI_BIRRA),
        "cocktail": round(cocktail), "bottiglie_distillati": round(cocktail * CL_DISTILLATO / BOTTIGLIA_CL),
        "bibite": round(vol["coca"]), "acqua": round(vol["acqua"]),
        "panini": round(vol["panino"] + vol["panino_completo"]),
        "alcolici_testa": round(alcolici / paganti, 3),
        "spesa_lorda": round(lordo), "spesa_testa": round(lordo / paganti, 2),
        "ordini_cdgest": round(sum(ordini.values())), "ordini_birra_cala": round(ordini["birra"]),
        "ordini_per_prodotto": {k: round(v) for k, v in ordini.items()},
        "giornate_fatturato": round(sum(ordini.values()) / (FATTURATO_ANNUO / 365), 2),
        "fasce": {k: {"persone": round(v["persone"]), "spesa_testa": round(v["spesa_testa"], 2),
                      "quota_spesa": round(v["spesa"] / lordo, 3), "quota_alcolici": round(v["alcolici"] / alcolici, 3)}
                  for k, v in per_fascia.items()},
    }


if __name__ == "__main__":
    out = [scenario(p, h) for p in PAGANTI for h in ORE]
    json.dump(out, sys.stdout, ensure_ascii=False, indent=1)
