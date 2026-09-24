// Floor-plan data ported from the site's Floorplan.jsx: the official 1254×1254
// piantina with the 40 table codes (B0–B15, R1–R16, G1–G8). Zones, prices,
// anchors and table positions can all be overridden from the site admin
// (settings.floorplan_*), exactly like on the website.
import type { Settings } from "@/src/lib/site";

export type BottleLine = { name: string; price: string };

export type ZoneInfo = {
  id?: string;
  label: string;
  color: string;
  price_from?: string;
  min_spend?: string;
  bottles?: string;
  description?: string;
  bottle_menu?: BottleLine[];
};

export type PlanTable = { id: string; x: number; y: number; zone: string };

export type Anchor = { cover_x: number; cover_y: number; cover_w: number; cover_h: number; label_x: number; label_y: number; font_size: number };

export const PLAN_SIZE = 1254;
export const CELL_W = 54;
export const CELL_H = 40;
export const LABEL_W = 46;
export const LABEL_H = 42;

export const DEFAULT_ZONES: Record<string, ZoneInfo> = {
  SEAVIEW: {
    label: "Seat View",
    color: "#FFFFFF",
    price_from: "€ 150",
    bottles: "Consumazione dedicata, bottiglia su richiesta",
    description: "Sedute panoramiche e salottini sul prato affacciati sul mare. Ideali per aperitivo e dopo cena.",
    bottle_menu: [{ name: "Prosecco", price: "€ 70" }, { name: "Absolut", price: "€ 130" }],
  },
  PRATO_BACK: {
    label: "Prato Back the Stage",
    color: "#FFFFFF",
    price_from: "€ 150",
    bottles: "Consumazione dedicata, bottiglia su richiesta",
    description: "Salottini sul prato, vicino alla pista e alla consolle, comodi e informali.",
    bottle_menu: [{ name: "Prosecco", price: "€ 70" }, { name: "Absolut", price: "€ 130" }],
  },
  STAGE: {
    label: "Back the Stage",
    color: "#E10600",
    price_from: "€ 400",
    bottles: "1 bottiglia inclusa",
    bottle_menu: [
      { name: "Grey Goose", price: "€ 180" },
      { name: "Belvedere", price: "€ 190" },
      { name: "Moët & Chandon", price: "€ 160" },
      { name: "Dom Pérignon", price: "€ 350" },
    ],
  },
  RIVA: {
    label: "Riva Deck",
    color: "#00BFFF",
    price_from: "€ 300",
    bottles: "1 bottiglia inclusa",
    bottle_menu: [{ name: "Absolut", price: "€ 130" }, { name: "Grey Goose", price: "€ 180" }, { name: "Prosecco", price: "€ 70" }],
  },
  BAR: {
    label: "Glitz Bar",
    color: "#FFA500",
    price_from: "€ 200",
    bottles: "Consumazione dedicata",
    bottle_menu: [{ name: "Cocktail signature", price: "€ 12" }, { name: "Superalcolico premium", price: "€ 10" }],
  },
};

export const ZONE_CARD_ORDER = ["STAGE", "RIVA", "BAR", "SEAVIEW", "PRATO_BACK"];

export const DEFAULT_TABLES: PlanTable[] = [
  // BACK THE STAGE
  { id: "B0", x: 78, y: 193, zone: "STAGE" }, { id: "B2", x: 170, y: 193, zone: "STAGE" }, { id: "B4", x: 263, y: 193, zone: "STAGE" },
  { id: "B1", x: 105, y: 260, zone: "STAGE" }, { id: "B3", x: 206, y: 260, zone: "STAGE" },
  { id: "B5", x: 90, y: 345, zone: "STAGE" }, { id: "B6", x: 200, y: 345, zone: "STAGE" }, { id: "B7", x: 90, y: 413, zone: "STAGE" },
  { id: "B8", x: 75, y: 625, zone: "STAGE" }, { id: "B9", x: 161, y: 625, zone: "STAGE" }, { id: "B10", x: 248, y: 625, zone: "STAGE" },
  { id: "B11", x: 324, y: 696, zone: "STAGE" }, { id: "B12", x: 399, y: 716, zone: "STAGE" }, { id: "B13", x: 477, y: 740, zone: "STAGE" },
  { id: "B14", x: 389, y: 769, zone: "STAGE" }, { id: "B15", x: 81, y: 746, zone: "STAGE" },
  // RIVA DECK
  { id: "R1", x: 606, y: 235, zone: "RIVA" }, { id: "R5", x: 747, y: 238, zone: "RIVA" }, { id: "R9", x: 904, y: 237, zone: "RIVA" }, { id: "R13", x: 1072, y: 237, zone: "RIVA" },
  { id: "R2", x: 617, y: 316, zone: "RIVA" }, { id: "R6", x: 762, y: 316, zone: "RIVA" }, { id: "R10", x: 915, y: 316, zone: "RIVA" }, { id: "R14", x: 1083, y: 316, zone: "RIVA" },
  { id: "R3", x: 633, y: 417, zone: "RIVA" }, { id: "R7", x: 771, y: 440, zone: "RIVA" }, { id: "R11", x: 933, y: 440, zone: "RIVA" }, { id: "R15", x: 1096, y: 440, zone: "RIVA" },
  { id: "R4", x: 645, y: 506, zone: "RIVA" }, { id: "R8", x: 792, y: 514, zone: "RIVA" }, { id: "R12", x: 955, y: 515, zone: "RIVA" }, { id: "R16", x: 1112, y: 512, zone: "RIVA" },
  // GLITZ BAR
  { id: "G1", x: 135, y: 819, zone: "BAR" }, { id: "G2", x: 212, y: 861, zone: "BAR" }, { id: "G3", x: 144, y: 913, zone: "BAR" },
  { id: "G8", x: 379, y: 939, zone: "BAR" }, { id: "G4", x: 176, y: 977, zone: "BAR" }, { id: "G5", x: 160, y: 1035, zone: "BAR" },
  { id: "G7", x: 370, y: 1036, zone: "BAR" }, { id: "G6", x: 262, y: 1069, zone: "BAR" },
];

export const DEFAULT_ANCHORS: Record<string, Anchor> = {
  STAGE: { cover_x: 85, cover_y: 660, cover_w: 210, cover_h: 40, label_x: 190, label_y: 686, font_size: 18 },
  RIVA: { cover_x: 842, cover_y: 360, cover_w: 165, cover_h: 40, label_x: 924, label_y: 388, font_size: 20 },
  BAR: { cover_x: 205, cover_y: 940, cover_w: 145, cover_h: 40, label_x: 278, label_y: 967, font_size: 20 },
};

// The 3D model also exposes the lawn tables, which have no position on the 2D plan.
export const MODEL_ZONES: Record<string, string> = { STAGE: "back", RIVA: "riva", BAR: "glitzbar", SEAVIEW: "seaview", PRATO_BACK: "prato-back" };
export const LAWN_TABLES: PlanTable[] = [
  ...Array.from({ length: 11 }, (_, i) => ({ id: `SV${i + 1}`, zone: "SEAVIEW", x: NaN, y: NaN })),
  ...Array.from({ length: 10 }, (_, i) => ({ id: `PB${i + 1}`, zone: "PRATO_BACK", x: NaN, y: NaN })),
];

export function isReserved(status: string | undefined) {
  return status === "reserved" || status === "booked";
}

/** Resolve zones, anchors, tables and per-table prices from the site settings. */
export function resolvePlan(settings: Settings | undefined) {
  const zonesData: Record<string, ZoneInfo> = {};
  (settings?.floorplan_zones || []).forEach((z: ZoneInfo) => {
    if (z?.id) zonesData[z.id] = z;
  });
  const overrides: Record<string, Partial<ZoneInfo>> = settings?.floorplan_table_overrides || {};
  const customAnchors = settings?.floorplan_anchors;
  const anchors: Record<string, Anchor & Partial<ZoneInfo>> = {
    ...DEFAULT_ANCHORS,
    ...(customAnchors && typeof customAnchors === "object" && Object.keys(customAnchors).length ? customAnchors : {}),
  };
  const extraZones: (Anchor & ZoneInfo & { id: string })[] = Array.isArray(settings?.floorplan_extra_zones) ? settings!.floorplan_extra_zones : [];
  extraZones.forEach((z) => {
    if (z.id && !anchors[z.id]) anchors[z.id] = z;
  });
  const customTables: PlanTable[] | null = Array.isArray(settings?.floorplan_tables) && settings!.floorplan_tables.length ? settings!.floorplan_tables : null;
  const tables = customTables || [...DEFAULT_TABLES, ...LAWN_TABLES];

  const getZone = (id: string): ZoneInfo => {
    const extra = extraZones.find((z) => z.id === id);
    const base: ZoneInfo = DEFAULT_ZONES[id] ?? { label: extra?.label || id, color: extra?.color || "#FFFFFF" };
    return { ...base, ...(zonesData[id] || {}) };
  };
  const getTableInfo = (t: PlanTable): ZoneInfo => {
    const zone = getZone(t.zone);
    const o = overrides[t.id] || {};
    return {
      ...zone,
      ...(o.price_from ? { price_from: o.price_from } : {}),
      ...(o.min_spend ? { min_spend: o.min_spend } : {}),
      ...(o.bottles ? { bottles: o.bottles } : {}),
    };
  };
  return { anchors, tables, getZone, getTableInfo };
}
