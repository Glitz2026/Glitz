"""Idempotent Stripe catalog setup for Glitz Shop."""
import os
import stripe
from dotenv import load_dotenv
from pathlib import Path

load_dotenv(Path(__file__).parent / ".env")
stripe.api_key = os.environ["STRIPE_SECRET_KEY"]

# EUR amounts in cents; physical goods use txcd_99999999
CATALOG = [
    {"eid": "beach-towel",  "name": "Beach Towel Glitz",       "tax_code": "txcd_99999999",
     "prices": [{"lookup_key": "beach-towel",  "amount": 4500, "currency": "eur"}]},
    {"eid": "paper-fan",    "name": "Ventaglio Glitz",         "tax_code": "txcd_99999999",
     "prices": [{"lookup_key": "paper-fan",    "amount": 1500, "currency": "eur"}]},
    {"eid": "lip-balm",     "name": "Lip Balm Glitz",          "tax_code": "txcd_99999999",
     "prices": [{"lookup_key": "lip-balm",     "amount": 1200, "currency": "eur"}]},
    {"eid": "tshirt-vibes", "name": "T-Shirt Glitz Vibes",     "tax_code": "txcd_99999999",
     "prices": [{"lookup_key": "tshirt-vibes", "amount": 5500, "currency": "eur"}]},
    {"eid": "beach-bag",    "name": "Beach Bag Glitz",         "tax_code": "txcd_99999999",
     "prices": [{"lookup_key": "beach-bag",    "amount": 6500, "currency": "eur"}]},
    {"eid": "gift-card",    "name": "Gift Card Glitz",         "tax_code": "txcd_99999999",
     "prices": [{"lookup_key": "gift-card",    "amount": 5000, "currency": "eur"}]},
]


def get_or_create_product(entry):
    for p in stripe.Product.list(active=True, limit=100).auto_paging_iter():
        if p.to_dict().get("metadata", {}).get("emergent_product_id") == entry["eid"]:
            return p
    return stripe.Product.create(
        name=entry["name"],
        tax_code=entry.get("tax_code"),
        metadata={"managed_by": "emergent", "emergent_product_id": entry["eid"]},
    )


def upsert_price(product, p):
    existing = stripe.Price.list(lookup_keys=[p["lookup_key"]], active=True, limit=1).data
    if existing and (existing[0].unit_amount != p["amount"] or existing[0].currency != p["currency"]):
        stripe.Price.modify(existing[0].id, active=False)
        existing = []
    if not existing:
        stripe.Price.create(
            product=product.id,
            unit_amount=p["amount"],
            currency=p["currency"],
            lookup_key=p["lookup_key"],
            transfer_lookup_key=True,
        )
        print(f"  + Price {p['lookup_key']} €{p['amount']/100}")
    else:
        print(f"  = Price {p['lookup_key']} already OK")


if __name__ == "__main__":
    print(f"Stripe account: {stripe.Account.retrieve().id}")
    for entry in CATALOG:
        product = get_or_create_product(entry)
        print(f"Product: {entry['name']} ({product.id})")
        for pr in entry["prices"]:
            upsert_price(product, pr)
    print("\n✅ Catalog ready.")
