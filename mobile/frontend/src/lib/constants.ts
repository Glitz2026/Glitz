// Static content for A.I. — ATTENZIONE INSTABILE.

export const AVATARS = ["♠", "♥", "◆", "★", "✦", "☾", "⚡", "☠", "♛", "✕", "∞", "◐"];

export type Mood = { id: string; label: string; desc: string };

export const MOODS: Mood[] = [
  { id: "ballare", label: "BALLARE", desc: "Solo musica e pista." },
  { id: "conoscere", label: "CONOSCERE", desc: "Voglio incontrare gente." },
  { id: "casino", label: "FARE CASINO", desc: "Alzare il caos." },
];

export const SYMBOL_GLYPH: Record<string, string> = {
  cherry: "🍒",
  bolt: "⚡",
  moon: "🌙",
};

export const SYMBOL_LABEL: Record<string, string> = {
  cherry: "CILIEGIA",
  bolt: "FULMINE",
  moon: "LUNA",
};

export const IMAGES = {
  idle: "https://images.unsplash.com/photo-1545128485-c400e7702796?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMjh8MHwxfHNlYXJjaHwxfHxyZWQlMjBuZW9uJTIwbmlnaHRjbHViJTIwbGlnaHRzJTIwZGFya3xlbnwwfHx8fDE3ODk2NjI2NzN8MA&ixlib=rb-4.1.0&q=85",
  glitch: "https://images.unsplash.com/photo-1559999831-7deaf136d4a9?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODl8MHwxfHNlYXJjaHwyfHxhYnN0cmFjdCUyMHJlZCUyMGdsaXRjaCUyMGFydCUyMGRhcmt8ZW58MHx8fHwxNzg5NjYyNjczfDA&ixlib=rb-4.1.0&q=85",
};


// Must match the backend allow-lists exactly.
export const POWER_COLORS = ["#FF0033", "#00F0FF", "#00FF66", "#FFCC00", "#C0C0C0"];
export const POWER_MESSAGES = ["FATE CASINO", "MANI IN ALTO", "GLITZ TI AMO", "SILENZIO. POI DROP."];
export const POWER_DROPS = ["DROP A", "DROP B"];