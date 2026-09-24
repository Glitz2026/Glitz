import * as Haptics from "expo-haptics";
import { Platform, Pressable, ScrollView, Text, View } from "react-native";

import { POWER_COLORS, POWER_DROPS, POWER_MESSAGES } from "@/src/lib/constants";
import { MONO } from "@/src/lib/fonts";
import { useRemaining, useShow } from "@/src/lib/show-context";
import { makeStyles, useTheme } from "@/src/theme";

export function PowerView() {
  const styles = useStyles();
  const { colors } = useTheme();
  const { show, participant, powerControl } = useShow();
  const remaining = useRemaining(show);
  const secs = Math.ceil(remaining / 1000);

  if (!show || !participant) return null;

  const holder = show.power_holder;
  const isHolder = holder?.id === participant.id;
  const ps = show.power_state;

  const tap = (type: "color" | "message" | "drop", value: string) => {
    if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
    powerControl(type, value);
  };

  const timer = (
    <Text style={[styles.timer, secs <= 8 && { color: colors.brandPrimary }]} testID="power-timer">
      {String(Math.max(0, secs)).padStart(2, "0")}s
    </Text>
  );

  if (!isHolder) {
    // Spectator: the club reacts to the chosen one.
    return (
      <View style={[styles.wrap, { justifyContent: "center" }]} testID="power-spectator">
        <Text style={styles.kicker}>CONTROLLO CEDUTO A</Text>
        <Text style={styles.holderName}>{holder ? holder.nickname : "IN ATTESA"}</Text>
        <View style={[styles.reactOrb, { backgroundColor: ps.color, shadowColor: ps.color }]} />
        {ps.message ? <Text style={styles.reactMsg}>{ps.message}</Text> : null}
        {ps.drop ? <Text style={styles.reactDrop}>{ps.drop} INBOUND</Text> : null}
        {timer}
      </View>
    );
  }

  // Holder: the control panel.
  return (
    <ScrollView
      style={styles.flex}
      contentContainerStyle={styles.panel}
      showsVerticalScrollIndicator={false}
      testID="power-panel"
    >
      <Text style={styles.kickerRed}>IL GLITZ È TUO</Text>
      {timer}

      <Text style={styles.section}>COLORE DEL CLUB</Text>
      <View style={styles.colorRow}>
        {POWER_COLORS.map((c) => (
          <Pressable
            key={c}
            testID={`power-color-${c}`}
            onPress={() => tap("color", c)}
            style={[
              styles.colorDot,
              { backgroundColor: c },
              ps.color === c && styles.colorDotActive,
            ]}
          />
        ))}
      </View>

      <Text style={styles.section}>MESSAGGIO SUL PALCO</Text>
      <View style={styles.msgCol}>
        {POWER_MESSAGES.map((m) => {
          const active = ps.message === m;
          return (
            <Pressable
              key={m}
              testID={`power-message-${m}`}
              onPress={() => tap("message", m)}
              style={[styles.msgChip, active && styles.msgChipActive]}
            >
              <Text style={[styles.msgText, active && styles.msgTextActive]}>{m}</Text>
            </Pressable>
          );
        })}
      </View>

      <Text style={styles.section}>SCEGLI IL DROP</Text>
      <View style={styles.dropRow}>
        {POWER_DROPS.map((d) => {
          const active = ps.drop === d;
          return (
            <Pressable
              key={d}
              testID={`power-drop-${d}`}
              onPress={() => tap("drop", d)}
              style={[styles.dropBtn, active && styles.dropBtnActive]}
            >
              <Text style={[styles.dropText, active && styles.dropTextActive]}>{d}</Text>
            </Pressable>
          );
        })}
      </View>
    </ScrollView>
  );
}

const useStyles = makeStyles((colors) => ({
  flex: { flex: 1, alignSelf: "stretch" },
  wrap: { flex: 1, alignItems: "center", gap: 14 },
  panel: { alignItems: "center", gap: 12, paddingBottom: 20 },
  kicker: { color: colors.muted, fontSize: 13, letterSpacing: 5, fontWeight: "800", fontFamily: MONO },
  kickerRed: { color: colors.brandPrimary, fontSize: 18, letterSpacing: 4, fontWeight: "900", fontFamily: MONO },
  holderName: { color: colors.onSurface, fontSize: 52, fontWeight: "900", letterSpacing: 2, textAlign: "center" },
  reactOrb: {
    width: 140,
    height: 140,
    borderRadius: 999,
    marginVertical: 20,
    shadowOpacity: 0.9,
    shadowRadius: 40,
    shadowOffset: { width: 0, height: 0 },
  },
  reactMsg: { color: colors.onSurface, fontSize: 28, fontWeight: "900", letterSpacing: 1 },
  reactDrop: { color: colors.brandPrimary, fontSize: 15, fontFamily: MONO, letterSpacing: 2, marginTop: 4 },
  timer: { color: colors.onSurface, fontSize: 40, fontWeight: "900", fontFamily: MONO, marginTop: 6 },
  section: {
    color: colors.muted,
    fontSize: 11,
    letterSpacing: 3,
    fontWeight: "700",
    fontFamily: MONO,
    marginTop: 18,
    alignSelf: "flex-start",
  },
  colorRow: { flexDirection: "row", gap: 14, alignSelf: "flex-start" },
  colorDot: { width: 48, height: 48, borderRadius: 999, borderWidth: 2, borderColor: "transparent" },
  colorDotActive: { borderColor: "#FFFFFF", transform: [{ scale: 1.12 }] },
  msgCol: { alignSelf: "stretch", gap: 10 },
  msgChip: {
    backgroundColor: colors.surfaceSecondary,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  msgChipActive: { borderColor: colors.borderStrong, backgroundColor: colors.brandTertiary },
  msgText: { color: colors.onSurface, fontSize: 16, fontWeight: "800", letterSpacing: 1 },
  msgTextActive: { color: colors.brandPrimary },
  dropRow: { flexDirection: "row", gap: 12, alignSelf: "stretch" },
  dropBtn: {
    flex: 1,
    backgroundColor: colors.surfaceSecondary,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 14,
    paddingVertical: 22,
    alignItems: "center",
  },
  dropBtnActive: {
    borderColor: colors.borderStrong,
    backgroundColor: colors.brandPrimary,
  },
  dropText: { color: colors.onSurface, fontSize: 18, fontWeight: "900", letterSpacing: 2 },
  dropTextActive: { color: colors.onBrandPrimary },
}));
