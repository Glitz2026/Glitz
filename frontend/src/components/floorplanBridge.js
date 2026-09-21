export const MODEL_ZONES = { STAGE: "back", RIVA: "riva", BAR: "glitzbar" };

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
