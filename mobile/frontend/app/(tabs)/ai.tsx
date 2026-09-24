import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Pulse } from "@/src/components/pulse";
import { IMAGES } from "@/src/lib/constants";
import { MONO } from "@/src/lib/fonts";
import { useShow } from "@/src/lib/show-context";
import { makeStyles } from "@/src/theme";

const FEATURES = [
  { title: "VOTO MUSICALE", desc: "20 secondi per decidere cosa suona: HOT, LOUD o BACK." },
  { title: "NON PREMERE", desc: "Il pulsante proibito. Premete abbastanza e il palco si guasta." },
  { title: "IL POTERE", desc: "Uno di voi comanda il club per 30 secondi. Colore, messaggio, drop." },
  { title: "MESSAGGIO DALLA PISTA", desc: "Ricevi un simbolo e trova le altre lune nella pista." },
];

export default function AITab() {
  const styles = useStyles();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { show } = useShow();

  return (
    <View style={styles.root} testID="ai-tab-screen">
      <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom + 24 }} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <Image source={{ uri: IMAGES.glitch }} style={styles.heroBg} contentFit="cover" />
          <LinearGradient colors={["rgba(0,0,0,0.35)", "rgba(0,0,0,0.85)", "#000000"]} style={styles.heroBg} />
          <View style={[styles.heroContent, { paddingTop: insets.top + 24 }]}>
            <View style={styles.liveRow}>
              <Pulse style={styles.liveDot} min={0.3} max={1} duration={800} />
              <Text style={styles.liveText}>SHOW ATTIVO · {show?.online ?? 0} in pista</Text>
            </View>
            <Text style={styles.title}>A.I.{"\n"}ATTENZIONE{"\n"}INSTABILE</Text>
            <Text style={styles.sub}>Il telefono diventa il telecomando della serata.</Text>
          </View>
        </View>

        <View style={styles.body}>
          <Pressable testID="enter-ai" style={styles.enter} onPress={() => router.push("/ai-enter")}>
            <Text style={styles.enterText}>ENTRA IN A.I.</Text>
          </Pressable>
          <Text style={styles.enterHint}>Scegli nickname, avatar e mood. A.I. ti chiama lei.</Text>

          <Text style={styles.section}>COSA PUÒ SUCCEDERE</Text>
          {FEATURES.map((f) => (
            <View key={f.title} style={styles.card}>
              <Text style={styles.cardTitle}>{f.title}</Text>
              <Text style={styles.cardDesc}>{f.desc}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const useStyles = makeStyles((colors) => ({
  root: { flex: 1, backgroundColor: colors.surface },
  hero: { height: 320 },
  heroBg: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0 },
  heroContent: { flex: 1, paddingHorizontal: 20, justifyContent: "flex-end", paddingBottom: 20 },
  liveRow: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 10 },
  liveDot: { width: 9, height: 9, borderRadius: 999, backgroundColor: colors.brandPrimary },
  liveText: { color: colors.brandSecondary, fontSize: 11, letterSpacing: 2, fontWeight: "800", fontFamily: MONO },
  title: { color: colors.onSurface, fontSize: 38, fontWeight: "900", lineHeight: 40, letterSpacing: 1 },
  sub: { color: colors.brandSecondary, fontSize: 14, marginTop: 12 },
  body: { paddingHorizontal: 20, marginTop: 4 },
  enter: {
    backgroundColor: colors.brandPrimary,
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: "center",
    shadowColor: colors.brandPrimary,
    shadowOpacity: 0.6,
    shadowRadius: 22,
    shadowOffset: { width: 0, height: 0 },
  },
  enterText: { color: colors.onBrandPrimary, fontSize: 18, fontWeight: "900", letterSpacing: 3 },
  enterHint: { color: colors.muted, fontSize: 13, textAlign: "center", marginTop: 12 },
  section: { color: colors.muted, fontSize: 12, letterSpacing: 3, fontWeight: "700", fontFamily: MONO, marginTop: 28, marginBottom: 14 },
  card: { backgroundColor: colors.surfaceSecondary, borderRadius: 14, borderWidth: 1, borderColor: colors.border, padding: 16, marginBottom: 12 },
  cardTitle: { color: colors.brandPrimary, fontSize: 15, fontWeight: "900", letterSpacing: 2 },
  cardDesc: { color: colors.brandSecondary, fontSize: 13, marginTop: 6, lineHeight: 19 },
}));
