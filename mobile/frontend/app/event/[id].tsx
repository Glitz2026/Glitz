import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { BackHeader } from "@/src/components/back-header";
import { apiGet, apiPost, coverUrl } from "@/src/lib/api";
import { MONO } from "@/src/lib/fonts";
import { formatEventDate } from "@/src/lib/format";
import { makeStyles, useTheme } from "@/src/theme";

export default function EventDetail() {
  const styles = useStyles();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const qc = useQueryClient();
  const { id } = useLocalSearchParams<{ id: string }>();

  const [selected, setSelected] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const event = useQuery({ queryKey: ["event", id], queryFn: () => apiGet(`/api/events/${id}`) });
  const ev = event.data?.event;

  const buyMut = useMutation({
    mutationFn: () => apiPost("/api/tickets", { event_id: id, formula_id: selected }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["tickets"] });
      qc.invalidateQueries({ queryKey: ["my-night"] });
      setDone(true);
    },
  });

  if (!ev) {
    return (
      <View style={styles.root} testID="event-screen">
        <BackHeader />
        <View style={styles.loading}>
          <ActivityIndicator color={colors.brandPrimary} />
        </View>
      </View>
    );
  }

  if (done) {
    return (
      <View style={styles.root} testID="event-screen">
        <BackHeader title="BIGLIETTO PRESO" />
        <View style={styles.doneWrap}>
          <Text style={styles.doneTitle}>Sei dentro.</Text>
          <Text style={styles.doneSub}>Il tuo biglietto con QR è in "La mia serata".</Text>
          <Pressable testID="go-serata" style={styles.primary} onPress={() => router.replace("/(tabs)")}>
            <Text style={styles.primaryText}>VAI ALLA MIA SERATA</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.root} testID="event-screen">
      <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom + 24 }} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <Image source={{ uri: coverUrl(ev.cover) }} style={styles.heroBg} contentFit="cover" />
          <LinearGradient colors={["rgba(0,0,0,0.2)", "rgba(0,0,0,0.85)", "#000000"]} style={styles.heroBg} />
          <View style={styles.backAbs}>
            <BackHeader />
          </View>
          <View style={styles.heroInfo}>
            <Text style={styles.date}>{formatEventDate(ev.date)}</Text>
            <Text style={styles.title}>{ev.title}</Text>
            <Text style={styles.guest}>{ev.guest} · {ev.genre}</Text>
          </View>
        </View>

        <View style={styles.body}>
          <Text style={styles.desc}>{ev.description}</Text>

          <Text style={styles.section}>SCEGLI LA FORMULA</Text>
          {ev.formulas.map((f: any) => {
            const active = selected === f.id;
            return (
              <Pressable
                key={f.id}
                testID={`formula-${f.id}`}
                style={[styles.formula, active && styles.formulaActive]}
                onPress={() => setSelected(f.id)}
              >
                <View style={{ flex: 1 }}>
                  <Text style={[styles.formulaLabel, active && styles.formulaLabelActive]}>{f.label}</Text>
                  <Text style={styles.formulaIncludes}>{f.includes}</Text>
                </View>
                <Text style={[styles.formulaPrice, active && styles.formulaLabelActive]}>€{f.price}</Text>
              </Pressable>
            );
          })}

          <Pressable
            testID="buy-ticket"
            style={[styles.primary, !selected && styles.dim]}
            onPress={() => selected && buyMut.mutate()}
            disabled={!selected || buyMut.isPending}
          >
            {buyMut.isPending ? (
              <ActivityIndicator color={colors.onBrandPrimary} />
            ) : (
              <Text style={styles.primaryText}>PRENDI IL BIGLIETTO</Text>
            )}
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const useStyles = makeStyles((colors) => ({
  root: { flex: 1, backgroundColor: colors.surface },
  loading: { flex: 1, alignItems: "center", justifyContent: "center" },
  hero: { height: 360 },
  heroBg: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0 },
  backAbs: { position: "absolute", top: 0, left: 0, right: 0 },
  heroInfo: { flex: 1, justifyContent: "flex-end", paddingHorizontal: 20, paddingBottom: 18 },
  date: { color: colors.brandPrimary, fontSize: 12, fontWeight: "700", fontFamily: MONO, letterSpacing: 1 },
  title: { color: colors.onSurface, fontSize: 30, fontWeight: "900", marginTop: 6 },
  guest: { color: colors.brandSecondary, fontSize: 14, marginTop: 6 },
  body: { paddingHorizontal: 20, marginTop: 6 },
  desc: { color: colors.brandSecondary, fontSize: 15, lineHeight: 22 },
  section: { color: colors.muted, fontSize: 12, letterSpacing: 3, fontWeight: "700", fontFamily: MONO, marginTop: 26, marginBottom: 14 },
  formula: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surfaceSecondary,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
  },
  formulaActive: { borderColor: colors.borderStrong, backgroundColor: colors.brandTertiary },
  formulaLabel: { color: colors.onSurface, fontSize: 18, fontWeight: "900", letterSpacing: 1 },
  formulaLabelActive: { color: colors.brandPrimary },
  formulaIncludes: { color: colors.muted, fontSize: 13, marginTop: 4 },
  formulaPrice: { color: colors.onSurface, fontSize: 20, fontWeight: "900", fontFamily: MONO },
  primary: { marginTop: 16, backgroundColor: colors.brandPrimary, borderRadius: 16, paddingVertical: 17, alignItems: "center" },
  primaryText: { color: colors.onBrandPrimary, fontSize: 16, fontWeight: "900", letterSpacing: 2 },
  dim: { opacity: 0.4 },
  doneWrap: { flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 30, gap: 12 },
  doneTitle: { color: colors.brandPrimary, fontSize: 40, fontWeight: "900" },
  doneSub: { color: colors.brandSecondary, fontSize: 15, textAlign: "center", marginBottom: 16 },
}));
