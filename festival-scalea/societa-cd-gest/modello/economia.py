"""Conto economico della società del festival (50% Villa Sandra, 50% C.D. Gest).

Criteri del business plan GLITZ del 20/09/2026, scalati a 20.000, 25.000 e
30.000 paganti; consumi ai chioschi e forniture C.D. Gest da modello.py
(8 ore di permanenza). Importi in euro, al netto dell'IVA recuperabile,
prima delle imposte sul reddito.
"""
import json, math, sys
from modello import scenario as consumi

BIGLIETTO = 69.0              # prezzo medio lordo, solo ingresso
DIVISORE_BASE = 1.38          # IVA 22% + ISI 16% sulla stessa base (business plan)
DIVISORE_CONCERTO = 1.10      # alternativa: concerto dal vivo, IVA 10%
ARTISTI = 300_000             # line-up tutto compreso (cachet, oneri, viaggi, ospitalità)
SPONSOR = 100_000             # obiettivo sponsor cash del business plan, non firmato
IVA_CHIOSCHI = 1.10
COSTI_CHIOSCHI = 0.16 + 0.07 + 0.05   # personale, attrezzature e consumabili, pagamenti cali e scarti (sul netto)


def moduli(p):
    return max(0, math.ceil((p - 10_000) / 2_500))


def conto(p, divisore=DIVISORE_BASE, artisti=ARTISTI, sponsor=SPONSOR, ore=8):
    k = (p - 20_000) / 5_000          # passi da 5.000 oltre i 20.000
    c = consumi(p, ore)
    # chioschi: incassi dei gestori, utile diviso a metà
    lordo_chioschi = c["spesa_lorda"]
    netto_chioschi = lordo_chioschi / IVA_CHIOSCHI
    utile_chioschi = netto_chioschi - c["ordini_cdgest"] - COSTI_CHIOSCHI * netto_chioschi
    quota_chioschi = 0.5 * utile_chioschi

    ticket_lordi = BIGLIETTO * p
    ticket_netti = ticket_lordi / divisore

    costi = {
        "artisti": artisti,
        "produzione": 99_000 * (1 + 0.10 * k),
        "area": 72_000 * (1 + 0.10 * k),
        "sicurezza_servizi": 77_600 + 18_500 * moduli(p),
        "gestione": 37_400 + 3_000 * k,
        "marketing_coperture": 23_000 + 2.0 * p,
    }
    operativi = sum(costi.values())
    variabili = {
        "riserva": 0.10 * operativi,
        "diritti": 0.10 * ticket_lordi + 15_000,
        "fee_ticketing": 0.03 * ticket_lordi,
        "promoter": 0.30 * p * 5.0,
        "attivazioni_sponsor": 0.08 * sponsor,
        "fondo_fiscale": 0.16 * (sponsor + quota_chioschi),
    }
    ricavi = ticket_netti + quota_chioschi + sponsor
    totale_costi = operativi + sum(variabili.values())
    risultato = ricavi - totale_costi

    # cassa prima dell'evento (criterio del business plan, nessun anticipo dalla biglietteria)
    fabbisogno = (0.80 * operativi + variabili["riserva"] + 30_000 + 70_000 * p / 15_000
                  + 20_000 + variabili["attivazioni_sponsor"] - 0.75 * sponsor)
    return {
        "paganti": p, "ore": ore, "divisore": divisore, "artisti": artisti, "sponsor": sponsor,
        "ticket_lordi": round(ticket_lordi), "ticket_netti": round(ticket_netti),
        "imposte_ticket": round(ticket_lordi - ticket_netti),
        "chioschi_lordo": round(lordo_chioschi), "chioschi_netto": round(netto_chioschi),
        "chioschi_prodotti": c["ordini_cdgest"], "chioschi_altri_costi": round(COSTI_CHIOSCHI * netto_chioschi),
        "chioschi_utile": round(utile_chioschi), "quota_chioschi": round(quota_chioschi),
        "ricavi": round(ricavi),
        "costi": {k2: round(v) for k2, v in costi.items()}, "operativi": round(operativi),
        "variabili": {k2: round(v) for k2, v in variabili.items()},
        "totale_costi": round(totale_costi), "risultato": round(risultato),
        "quota_socio": round(risultato / 2),
        "ordini_cdgest": c["ordini_cdgest"], "ordini_birra_cala": c["ordini_birra_cala"],
        "fabbisogno": round(fabbisogno), "fabbisogno_socio": round(fabbisogno / 2),
    }


def pareggio(**kw):
    for p in range(5_000, 40_001, 50):
        if conto(p, **kw)["risultato"] >= 0:
            return p
    return None


if __name__ == "__main__":
    out = {
        "base": [conto(p) for p in (20_000, 25_000, 30_000)],
        "concerto_iva10": [conto(p, divisore=DIVISORE_CONCERTO) for p in (20_000, 25_000, 30_000)],
        "artisti_250": [conto(p, artisti=250_000) for p in (20_000, 25_000, 30_000)],
        "senza_sponsor": [conto(p, sponsor=0) for p in (20_000, 25_000, 30_000)],
        "permanenza_6_ore": [conto(p, ore=6) for p in (20_000, 25_000, 30_000)],
        "pareggio": {"base": pareggio(), "concerto_iva10": pareggio(divisore=DIVISORE_CONCERTO),
                     "senza_sponsor": pareggio(sponsor=0), "permanenza_6_ore": pareggio(ore=6)},
    }
    json.dump(out, sys.stdout, ensure_ascii=False, indent=1)
