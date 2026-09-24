import Animated, { ZoomIn } from "react-native-reanimated";
import { Text, View } from "react-native";

import { MONO } from "@/src/lib/fonts";
import { useShow } from "@/src/lib/show-context";
import { makeStyles } from "@/src/theme";

/** Announces the winning music scenario. */
export function ResultView() {
  const styles = useStyles();
  const { show } = useShow();
  if (!show) return null;

  const winner = show.vote.options.find((o) => o.id === show.vote_winner) ?? show.vote.options[0];

  return (
    <View style={styles.wrap} testID="result-view">
      <Text style={styles.kicker}>HA VINTO LA PISTA</Text>
      <Animated.View entering={ZoomIn.duration(450)} style={styles.card}>
        <Text style={styles.label} testID="result-winner">
          {winner.label}
        </Text>
        <Text style={styles.desc}>{winner.desc}</Text>
        <View style={styles.divider} />
        <Text style={styles.votes}>{winner.votes} voti · countdown avviato</Text>
      </Animated.View>
    </View>
  );
}

const useStyles = makeStyles((colors) => ({
  wrap: { flex: 1, alignItems: "center", justifyContent: "center", gap: 20, paddingHorizontal: 12 },
  kicker: { color: colors.muted, fontSize: 13, letterSpacing: 5, fontWeight: "800", fontFamily: MONO },
  card: {
    width: "100%",
    alignItems: "center",
    backgroundColor: colors.surfaceSecondary,
    borderWidth: 2,
    borderColor: colors.borderStrong,
    borderRadius: 22,
    paddingVertical: 40,
    paddingHorizontal: 20,
    shadowColor: colors.brandPrimary,
    shadowOpacity: 0.6,
    shadowRadius: 30,
    shadowOffset: { width: 0, height: 0 },
  },
  label: { color: colors.brandPrimary, fontSize: 68, fontWeight: "900", letterSpacing: 3 },
  desc: { color: colors.onSurface, fontSize: 16, marginTop: 8, textAlign: "center" },
  divider: { height: 1, alignSelf: "stretch", backgroundColor: colors.divider, marginVertical: 22 },
  votes: { color: colors.brandSecondary, fontSize: 13, fontFamily: MONO, letterSpacing: 1 },
}));
