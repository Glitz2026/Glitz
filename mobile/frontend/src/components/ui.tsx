import { useEffect, useState, type ReactNode } from "react";
import { ActivityIndicator, Pressable, Text, TextInput, View, type TextInputProps, type ViewStyle } from "react-native";

import { IconChevron } from "@/src/components/icons";
import { MONO } from "@/src/lib/fonts";
import { makeStyles, useTheme } from "@/src/theme";

/** Section heading with an optional "see all" action, used across the app screens. */
export function SectionTitle({ title, action, onAction }: { title: string; action?: string; onAction?: () => void }) {
  const styles = useStyles();
  const { colors } = useTheme();
  return (
    <View style={styles.sectionRow}>
      <Text style={styles.section}>{title}</Text>
      {action && onAction ? (
        <Pressable onPress={onAction} hitSlop={8} style={styles.sectionAction}>
          <Text style={styles.sectionActionText}>{action}</Text>
          <IconChevron color={colors.brandPrimary} size={14} />
        </Pressable>
      ) : null}
    </View>
  );
}

export function PageIntro({ kicker, title, body }: { kicker?: string; title: string; body?: string }) {
  const styles = useStyles();
  return (
    <View style={styles.intro}>
      {kicker ? <Text style={styles.kicker}>{kicker.toUpperCase()}</Text> : null}
      <Text style={styles.pageTitle}>{title}</Text>
      {body ? <Text style={styles.body}>{body}</Text> : null}
    </View>
  );
}

export function PrimaryButton({
  label,
  onPress,
  loading,
  disabled,
  testID,
  icon,
  style,
}: {
  label: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  testID?: string;
  icon?: ReactNode;
  style?: ViewStyle;
}) {
  const styles = useStyles();
  const { colors } = useTheme();
  return (
    <Pressable
      testID={testID}
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [styles.primary, (disabled || loading) && styles.dim, pressed && styles.pressed, style]}
    >
      {loading ? (
        <ActivityIndicator color={colors.onBrandPrimary} />
      ) : (
        <View style={styles.btnRow}>
          {icon}
          <Text style={styles.primaryText}>{label}</Text>
        </View>
      )}
    </Pressable>
  );
}

export function GhostButton({
  label,
  onPress,
  testID,
  icon,
  style,
  disabled,
}: {
  label: string;
  onPress: () => void;
  testID?: string;
  icon?: ReactNode;
  style?: ViewStyle;
  disabled?: boolean;
}) {
  const styles = useStyles();
  return (
    <Pressable
      testID={testID}
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [styles.ghost, disabled && styles.dim, pressed && styles.pressed, style]}
    >
      <View style={styles.btnRow}>
        {icon}
        <Text style={styles.ghostText}>{label}</Text>
      </View>
    </Pressable>
  );
}

export function Field({ label, required, ...props }: TextInputProps & { label: string; required?: boolean }) {
  const styles = useStyles();
  const { colors } = useTheme();
  return (
    <View style={styles.field}>
      <Text style={styles.label}>
        {label.toUpperCase()}
        {required ? " *" : ""}
      </Text>
      <TextInput placeholderTextColor={colors.muted} {...props} style={[styles.input, props.multiline && styles.textarea, props.style]} />
    </View>
  );
}

export function Chip({ label, active, onPress, testID }: { label: string; active?: boolean; onPress?: () => void; testID?: string }) {
  const styles = useStyles();
  return (
    <Pressable testID={testID} onPress={onPress} style={[styles.chip, active && styles.chipActive]}>
      <Text style={[styles.chipText, active && styles.chipTextActive]}>{label}</Text>
    </Pressable>
  );
}

export function Notice({ tone = "info", text }: { tone?: "info" | "ok" | "error"; text: string }) {
  const styles = useStyles();
  return (
    <View style={[styles.notice, tone === "ok" && styles.noticeOk, tone === "error" && styles.noticeError]}>
      <Text style={[styles.noticeText, tone === "ok" && styles.noticeTextOk, tone === "error" && styles.noticeTextError]}>{text}</Text>
    </View>
  );
}

export function Empty({ text }: { text: string }) {
  const styles = useStyles();
  return <Text style={styles.empty}>{text}</Text>;
}

export function Loading() {
  const { colors } = useTheme();
  return (
    <View style={{ paddingVertical: 40, alignItems: "center" }}>
      <ActivityIndicator color={colors.brandPrimary} />
    </View>
  );
}

export function Stepper({ value, onChange, min = 1, max = 20, testID }: { value: number; onChange: (v: number) => void; min?: number; max?: number; testID?: string }) {
  const styles = useStyles();
  return (
    <View style={styles.stepper} testID={testID}>
      <Pressable style={styles.stepBtn} onPress={() => onChange(Math.max(min, value - 1))} hitSlop={6}>
        <Text style={styles.stepSign}>–</Text>
      </Pressable>
      <Text style={styles.stepValue}>{value}</Text>
      <Pressable style={[styles.stepBtn, styles.stepBtnAdd]} onPress={() => onChange(Math.min(max, value + 1))} hitSlop={6}>
        <Text style={styles.stepSignAdd}>+</Text>
      </Pressable>
    </View>
  );
}

// --- Countdown (same maths as the site's useCountdown) ---------------------
export function useCountdown(targetIso: string | null | undefined) {
  const [state, setState] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, done: false });
  useEffect(() => {
    if (!targetIso) return;
    const target = new Date(targetIso).getTime();
    const tick = () => {
      const diff = target - Date.now();
      if (diff <= 0) {
        setState({ days: 0, hours: 0, minutes: 0, seconds: 0, done: true });
        return;
      }
      setState({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
        done: false,
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetIso]);
  return state;
}

export function Countdown({ targetIso, compact }: { targetIso: string; compact?: boolean }) {
  const styles = useStyles();
  const c = useCountdown(targetIso);
  if (c.done) return <Text style={styles.live}>LIVE NOW</Text>;
  const cells = [
    { l: "GG", v: c.days },
    { l: "ORE", v: c.hours },
    { l: "MIN", v: c.minutes },
    { l: "SEC", v: c.seconds },
  ];
  return (
    <View style={styles.cdRow} testID="countdown">
      {cells.map((x) => (
        <View key={x.l} style={[styles.cdCell, compact && styles.cdCellCompact]}>
          <Text style={[styles.cdValue, compact && styles.cdValueCompact]}>{String(x.v).padStart(2, "0")}</Text>
          <Text style={styles.cdLabel}>{x.l}</Text>
        </View>
      ))}
    </View>
  );
}

/** Tiny markdown renderer, same rules as the site's BlogDetail (##, ###, - lists, paragraphs). */
export function Markdown({ text }: { text: string }) {
  const styles = useStyles();
  const lines = (text || "").split("\n");
  const out: ReactNode[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (line.startsWith("## ")) {
      out.push(<Text key={i} style={styles.mdH2}>{line.slice(3)}</Text>);
      i++;
    } else if (line.startsWith("### ")) {
      out.push(<Text key={i} style={styles.mdH3}>{line.slice(4)}</Text>);
      i++;
    } else if (line.startsWith("- ")) {
      const start = i;
      const items: string[] = [];
      while (i < lines.length && lines[i].startsWith("- ")) items.push(lines[i++].slice(2));
      out.push(
        <View key={`u${start}`} style={styles.mdList}>
          {items.map((x, k) => (
            <Text key={k} style={styles.mdLi}>•  {x}</Text>
          ))}
        </View>,
      );
    } else if (line.trim() === "") {
      i++;
    } else {
      out.push(<Text key={i} style={styles.mdP}>{line}</Text>);
      i++;
    }
  }
  return <View>{out}</View>;
}

const useStyles = makeStyles((colors) => ({
  sectionRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 28, marginBottom: 12 },
  section: { color: colors.muted, fontSize: 12, letterSpacing: 3, fontWeight: "700", fontFamily: MONO },
  sectionAction: { flexDirection: "row", alignItems: "center", gap: 2 },
  sectionActionText: { color: colors.brandPrimary, fontSize: 12, fontWeight: "800", letterSpacing: 1 },
  intro: { marginBottom: 8 },
  kicker: { color: colors.brandPrimary, fontSize: 11, letterSpacing: 4, fontWeight: "800", fontFamily: MONO },
  pageTitle: { color: colors.onSurface, fontSize: 30, fontWeight: "900", marginTop: 6, textTransform: "uppercase" },
  body: { color: colors.brandSecondary, fontSize: 14, lineHeight: 21, marginTop: 10 },
  primary: { backgroundColor: colors.brandPrimary, borderRadius: 16, paddingVertical: 16, paddingHorizontal: 18, alignItems: "center", justifyContent: "center" },
  primaryText: { color: colors.onBrandPrimary, fontSize: 15, fontWeight: "900", letterSpacing: 2 },
  ghost: { borderWidth: 1.5, borderColor: colors.border, backgroundColor: colors.surfaceSecondary, borderRadius: 16, paddingVertical: 15, paddingHorizontal: 18, alignItems: "center", justifyContent: "center" },
  ghostText: { color: colors.onSurface, fontSize: 14, fontWeight: "800", letterSpacing: 1.5 },
  btnRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  dim: { opacity: 0.45 },
  pressed: { opacity: 0.75, transform: [{ scale: 0.98 }] },
  field: { marginTop: 14 },
  label: { color: colors.muted, fontSize: 11, letterSpacing: 2.5, fontWeight: "700", fontFamily: MONO, marginBottom: 8 },
  input: { backgroundColor: colors.surfaceTertiary, borderWidth: 1, borderColor: colors.border, borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14, color: colors.onSurface, fontSize: 16 },
  textarea: { minHeight: 96, textAlignVertical: "top" },
  chip: { borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surfaceSecondary, borderRadius: 999, paddingHorizontal: 14, paddingVertical: 9 },
  chipActive: { backgroundColor: colors.brandPrimary, borderColor: colors.brandPrimary },
  chipText: { color: colors.brandSecondary, fontSize: 12, fontWeight: "800", letterSpacing: 1 },
  chipTextActive: { color: colors.onBrandPrimary },
  notice: { borderRadius: 12, padding: 14, marginTop: 14, backgroundColor: colors.surfaceTertiary, borderWidth: 1, borderColor: colors.border },
  noticeOk: { borderColor: colors.success },
  noticeError: { borderColor: colors.error },
  noticeText: { color: colors.brandSecondary, fontSize: 13, lineHeight: 19 },
  noticeTextOk: { color: colors.success },
  noticeTextError: { color: colors.error },
  empty: { color: colors.muted, fontSize: 14, paddingVertical: 8 },
  stepper: { flexDirection: "row", alignItems: "center", gap: 10 },
  stepBtn: { width: 36, height: 36, borderRadius: 999, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surfaceTertiary, alignItems: "center", justifyContent: "center" },
  stepBtnAdd: { backgroundColor: colors.brandPrimary, borderColor: colors.brandPrimary },
  stepSign: { color: colors.onSurface, fontSize: 18, fontWeight: "900" },
  stepSignAdd: { color: colors.onBrandPrimary, fontSize: 18, fontWeight: "900" },
  stepValue: { color: colors.onSurface, fontSize: 16, fontWeight: "900", minWidth: 22, textAlign: "center", fontFamily: MONO },
  live: { color: colors.brandPrimary, fontSize: 18, fontWeight: "900", letterSpacing: 3 },
  cdRow: { flexDirection: "row", gap: 8 },
  cdCell: { minWidth: 58, paddingVertical: 10, paddingHorizontal: 8, borderRadius: 12, backgroundColor: "rgba(0,0,0,0.55)", borderWidth: 1, borderColor: colors.border, alignItems: "center" },
  cdCellCompact: { minWidth: 46, paddingVertical: 7 },
  cdValue: { color: colors.onSurface, fontSize: 22, fontWeight: "900", fontFamily: MONO },
  cdValueCompact: { fontSize: 17 },
  cdLabel: { color: colors.brandPrimary, fontSize: 9, fontWeight: "800", letterSpacing: 1.5, marginTop: 2 },
  mdH2: { color: colors.onSurface, fontSize: 21, fontWeight: "900", marginTop: 22, marginBottom: 8 },
  mdH3: { color: colors.onSurface, fontSize: 17, fontWeight: "800", marginTop: 16, marginBottom: 6 },
  mdP: { color: colors.brandSecondary, fontSize: 15, lineHeight: 23, marginBottom: 12 },
  mdList: { marginBottom: 12, gap: 6 },
  mdLi: { color: colors.brandSecondary, fontSize: 15, lineHeight: 22 },
}));
