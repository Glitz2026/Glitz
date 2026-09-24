import { useRouter } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useQuery } from "@tanstack/react-query";

import { BackHeader } from "@/src/components/back-header";
import { Empty, GhostButton, Loading } from "@/src/components/ui";
import { apiGet } from "@/src/lib/api";
import { MONO } from "@/src/lib/fonts";
import { formatEventDate } from "@/src/lib/format";
import { makeStyles } from "@/src/theme";

/** Wallet of the QR tickets bought in the app. */
export default function Biglietti() {
  const styles = useStyles();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const tickets = useQuery({ queryKey: ["tickets"], queryFn: () => apiGet("/api/tickets") });
  const list = tickets.data?.tickets ?? [];

  return (
    <View style={styles.root} testID="biglietti-screen">
      <BackHeader title="I MIEI BIGLIETTI" />
      <ScrollView contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 24 }]} showsVerticalScrollIndicator={false}>
        {tickets.isLoading ? <Loading /> : null}
        {!tickets.isLoading && list.length === 0 ? (
          <>
            <Empty text="Nessun biglietto. Scegli una serata e prendi il tuo ingresso." />
            <GhostButton label="VAI AGLI EVENTI" onPress={() => router.push("/eventi")} style={{ marginTop: 12 }} />
          </>
        ) : null}
        {list.map((tk: any) => (
          <View key={tk.id} testID={`ticket-${tk.id}`} style={styles.ticket}>
            <View style={styles.top}>
              <Text style={styles.kicker}>GLITZ CLUB · INGRESSO</Text>
              <Text style={styles.title}>{tk.event_title}</Text>
              <Text style={styles.date}>{formatEventDate(tk.event_date)}</Text>
            </View>
            <View style={styles.cut}>
              <View style={[styles.notch, { left: -12 }]} />
              <View style={styles.dash} />
              <View style={[styles.notch, { right: -12 }]} />
            </View>
            <View style={styles.bottom}>
              <View style={styles.qr}>
                <QRCode value={tk.code} size={150} color="#000000" backgroundColor="#FFFFFF" />
              </View>
              <Text style={styles.code}>{tk.code}</Text>
              <Text style={styles.formula}>{tk.formula_label} · €{tk.price}</Text>
              <Text style={styles.hint}>{"Mostra il QR all'ingresso"}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const useStyles = makeStyles((colors) => ({
  root: { flex: 1, backgroundColor: colors.surface },
  content: { paddingHorizontal: 20, paddingTop: 8 },
  ticket: { backgroundColor: colors.surfaceSecondary, borderRadius: 22, borderWidth: 1.5, borderColor: colors.borderStrong, marginBottom: 18, overflow: "hidden" },
  top: { padding: 18 },
  kicker: { color: colors.brandPrimary, fontSize: 10, letterSpacing: 3, fontWeight: "800", fontFamily: MONO },
  title: { color: colors.onSurface, fontSize: 20, fontWeight: "900", marginTop: 6 },
  date: { color: colors.brandSecondary, fontSize: 12, fontFamily: MONO, marginTop: 6 },
  cut: { height: 24, justifyContent: "center" },
  notch: { position: "absolute", width: 24, height: 24, borderRadius: 999, backgroundColor: colors.surface },
  dash: { marginHorizontal: 18, borderTopWidth: 1.5, borderStyle: "dashed", borderColor: colors.border },
  bottom: { alignItems: "center", padding: 18, gap: 6 },
  qr: { backgroundColor: "#FFFFFF", borderRadius: 14, padding: 12 },
  code: { color: colors.brandPrimary, fontSize: 18, fontWeight: "900", letterSpacing: 2, fontFamily: MONO, marginTop: 8 },
  formula: { color: colors.onSurface, fontSize: 13, fontWeight: "700" },
  hint: { color: colors.muted, fontSize: 11 },
}));
