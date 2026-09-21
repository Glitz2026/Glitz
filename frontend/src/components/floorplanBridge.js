export const MODEL_ZONES = { STAGE: "back", RIVA: "riva", BAR: "glitzbar", SEAVIEW: "seaview", PRATO_BACK: "prato-back" };

export function isTableAvailable(status) {
    return status == null || status === "available";
}

// Send every model table, including removed tables, so stale availability cannot survive.
export function makeInventory(modelTables, tables, reserved, getInfo, ready) {
    return modelTables.map((model) => {
        const table = tables.find((t) => t.id === model.id && MODEL_ZONES[t.zone] === model.zoneId);
        const info = table ? getInfo(table) : {};
        const rawStatus = reserved[model.id];
        return {
            id: model.id,
            status: !ready || !table ? "unavailable" : isTableAvailable(rawStatus) ? "available" : "soldout",
            priceLabel: info.min_spend || (info.price_from ? `Da ${info.price_from}` : "Prezzo su richiesta"),
            minSpend: null,
            capacity: null,
        };
    });
}

export const LAWN_TABLES = [
    ...Array.from({ length: 11 }, (_, i) => ({ id: `SV${i + 1}`, zone: "SEAVIEW" })),
    ...Array.from({ length: 10 }, (_, i) => ({ id: `PB${i + 1}`, zone: "PRATO_BACK" })),
];
