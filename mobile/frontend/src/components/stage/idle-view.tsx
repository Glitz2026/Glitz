import { BlurView } from "expo-blur";
import { Image } from "expo-image";
import { Text, View } from "react-native";

import { Pulse } from "@/src/components/pulse";
import { IMAGES } from "@/src/lib/constants";
import { MONO } from "@/src/lib/fonts";
import { makeStyles } from "@/src/theme";

/** Passive wait state — "Ti chiamo io. Tu balla." */
export function IdleView() {
  const styles = useStyles();
  return (
    <View style={styles.wrap} testID="idle-view">
      <Image source={{ uri: IMAGES.idle }} style={styles.bg} contentFit="cover" transition={500} />
      <BlurView intensity={70} tint="dark" style={styles.blur} />
      <View style={styles.overlay} />
      <Pulse style={styles.center} min={0.45} max={1} duration={1300}>
        <Text style={styles.kicker}>IN ATTESA</Text>
        <Text style={styles.mantra}>Ti chiamo io.{"\n"}Tu balla.</Text>
      </Pulse>
    </View>
  );
}

const useStyles = makeStyles((colors) => ({
  wrap: { flex: 1, alignItems: "center", justifyContent: "center", overflow: "hidden" },
  bg: { ...StyleSheetAbsolute() },
  blur: { ...StyleSheetAbsolute() },
  overlay: { ...StyleSheetAbsolute(), backgroundColor: "rgba(0,0,0,0.55)" },
  center: { alignItems: "center", paddingHorizontal: 24 },
  kicker: {
    color: colors.brandPrimary,
    fontSize: 13,
    letterSpacing: 6,
    fontWeight: "800",
    fontFamily: MONO,
    marginBottom: 16,
  },
  mantra: {
    color: colors.onSurface,
    fontSize: 40,
    fontWeight: "900",
    textAlign: "center",
    lineHeight: 46,
    letterSpacing: 1,
  },
}));

function StyleSheetAbsolute() {
  return { position: "absolute" as const, top: 0, left: 0, right: 0, bottom: 0 };
}
