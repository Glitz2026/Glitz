import { Text, View } from "react-native";

import { Pulse } from "@/src/components/pulse";
import { SYMBOL_GLYPH, SYMBOL_LABEL } from "@/src/lib/constants";
import { MONO } from "@/src/lib/fonts";
import { useRemaining, useShow } from "@/src/lib/show-context";
import { makeStyles, useTheme } from "@/src/theme";

/** "Hai un messaggio dalla pista" — flash your symbol, find the others. */
export function MessageView() {
  const styles = useStyles();
  const { colors } = useTheme();
  const { show, participant } = useShow();
  const remaining = useRemaining(show);
  const secs = Math.ceil(remaining / 1000);

  if (!show || !participant) return null;

  const mySymbol = show.symbols[participant.id];
  const target = show.mission_target;
  const iAmTarget = mySymbol && target && mySymbol === target;

  return (
    <View style={styles.wrap} testID="message-view">
      <Text style={styles.kicker}>MESSAGGIO DALLA PISTA</Text>

      {mySymbol ? (
        <>
          <Pulse style={styles.glyphWrap} min={0.6} max={1} duration={1000}>
            <Text style={styles.glyph} testID="my-symbol">
              {SYMBOL_GLYPH[mySymbol]}
            </Text>
          </Pulse>
          <Text style={styles.symbolLabel}>IL TUO SIMBOLO · {SYMBOL_LABEL[mySymbol]}</Text>
        </>
      ) : (
        <Text style={styles.symbolLabel}>A.I. ti osserva. Nessun simbolo per te stavolta.</Text>
      )}

      <View style={styles.mission}>
        <Text style={styles.missionText}>
          A.I. cerca le{" "}
          <Text style={styles.missionTarget}>{target ? SYMBOL_LABEL[target] : "..."}</Text>
        </Text>
        <Text style={styles.missionSub}>
          {iAmTarget
            ? "Sei tu. Mostra lo schermo e trova gli altri."
            : "Mostra il simbolo, scansionatevi, sbloccate la sfida."}
        </Text>
      </View>

      <Text style={[styles.timer, secs <= 5 && { color: colors.brandPrimary }]} testID="message-timer">
        {String(Math.max(0, secs)).padStart(2, "0")}s
      </Text>
    </View>
  );
}

const useStyles = makeStyles((colors) => ({
  wrap: { flex: 1, alignItems: "center", justifyContent: "center", gap: 16, paddingHorizontal: 16 },
  kicker: { color: colors.muted, fontSize: 12, letterSpacing: 5, fontWeight: "800", fontFamily: MONO },
  glyphWrap: {
    width: 180,
    height: 180,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.surfaceSecondary,
    borderWidth: 2,
    borderColor: colors.borderStrong,
    shadowColor: colors.brandPrimary,
    shadowOpacity: 0.7,
    shadowRadius: 30,
    shadowOffset: { width: 0, height: 0 },
  },
  glyph: { fontSize: 96 },
  symbolLabel: { color: colors.brandSecondary, fontSize: 13, letterSpacing: 2, fontFamily: MONO },
  mission: { alignItems: "center", gap: 6, marginTop: 4 },
  missionText: { color: colors.onSurface, fontSize: 22, fontWeight: "800", textAlign: "center" },
  missionTarget: { color: colors.brandPrimary, fontWeight: "900" },
  missionSub: { color: colors.muted, fontSize: 13, textAlign: "center", paddingHorizontal: 20 },
  timer: { color: colors.onSurface, fontSize: 40, fontWeight: "900", fontFamily: MONO, marginTop: 8 },
}));
