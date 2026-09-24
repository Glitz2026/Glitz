import Animated, { FadeIn } from "react-native-reanimated";
import { Text, View } from "react-native";

import { Pulse } from "@/src/components/pulse";
import { MONO } from "@/src/lib/fonts";
import { makeStyles } from "@/src/theme";

type Props = { line: string; online: number };

/** The A.I. stage presence: a pulsing red core and its current line. */
export function AIPresence({ line, online }: Props) {
  const styles = useStyles();
  return (
    <View style={styles.wrap}>
      <View style={styles.row}>
        <View style={styles.badge}>
          <Pulse style={styles.core} min={0.3} max={1} duration={850} />
          <Text style={styles.badgeText}>A.I.</Text>
        </View>
        <View style={styles.onlineWrap}>
          <View style={styles.onlineDot} />
          <Text style={styles.onlineText} testID="online-count">
            {online} in pista
          </Text>
        </View>
      </View>
      <Animated.Text
        key={line}
        entering={FadeIn.duration(400)}
        style={styles.line}
        testID="ai-line"
      >
        «{line}»
      </Animated.Text>
    </View>
  );
}

const useStyles = makeStyles((colors) => ({
  wrap: { gap: 14 },
  row: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  badge: { flexDirection: "row", alignItems: "center", gap: 8 },
  core: {
    width: 14,
    height: 14,
    borderRadius: 999,
    backgroundColor: colors.brandPrimary,
    shadowColor: colors.brandPrimary,
    shadowOpacity: 1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
  },
  badgeText: {
    color: colors.brandPrimary,
    fontSize: 15,
    fontWeight: "900",
    letterSpacing: 5,
    fontFamily: MONO,
  },
  onlineWrap: { flexDirection: "row", alignItems: "center", gap: 6 },
  onlineDot: { width: 7, height: 7, borderRadius: 999, backgroundColor: colors.success },
  onlineText: { color: colors.muted, fontSize: 12, fontFamily: MONO, letterSpacing: 1 },
  line: {
    color: colors.onSurface,
    fontSize: 20,
    fontWeight: "800",
    lineHeight: 27,
    letterSpacing: 0.3,
  },
}));
