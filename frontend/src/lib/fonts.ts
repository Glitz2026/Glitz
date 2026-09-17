import { Platform } from "react-native";

// Digital / stage feel without shipping font files: monospace for timers &
// labels, heavy system weight for display.
export const MONO = Platform.select({ ios: "Menlo", android: "monospace", default: "monospace" }) as string;
