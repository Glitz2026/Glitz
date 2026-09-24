import { Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { BackHeader } from "@/src/components/back-header";
import { apiGet, apiPost } from "@/src/lib/api";
import { MONO } from "@/src/lib/fonts";
import { formatEventDate } from "@/src/lib/format";
import { makeStyles } from "@/src/theme";

export default function Tables() {
  const styles = useStyles();
  const insets = useSafeAreaInsets();
  const qc = useQueryClient();

  const zones = useQuery({ queryKey: ["zones"], queryFn: () => apiGet("/api/tables/zones") });
  const requests = useQuery({ queryKey: ["table-requests"], queryFn: () => apiGet("/api/table-requests") });

  const requestMut = useMutation({
    mutationFn: (zoneId: string) => apiPost("/api/table-requests", { zone_id: zoneId, people: 4 }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["table-requests"] }),
  });

  const zoneList = zones.data?.zones ?? [];
  const reqList = requests.data?.requests ?? [];

  return (
    <View style={styles.root} testID="tables-screen">
      <BackHeader title="TAVOLI" />
      <ScrollView contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 24 }]} showsVerticalScrollIndicator={false}>
        <Text style={styles.intro}>Scegli una zona e invia la richiesta. Lo staff conferma disponibilità e prezzo.</Text>

        {zoneList.map((z: any) => (
          <View key={z.id} testID={`zone-${z.id}`} style={styles.zone}>
            <View style={styles.zoneTop}>
              <Text style={styles.zoneName}>{z.name}</Text>
              <Text style={styles.zonePrice}>€{z.price}</Text>
            </View>
            <Text style={styles.zoneMeta}>{z.area} · {z.seats} posti · {z.bottles} bottiglie</Text>
            <Pressable
              testID={`request-${z.id}`}
              style={[styles.reqBtn, !z.available && styles.reqBtnOff]}
              onPress={() => z.available && requestMut.mutate(z.id)}
              disabled={!z.available || requestMut.isPending}
            >
              <Text style={[styles.reqBtnText, !z.available && styles.reqBtnTextOff]}>
                {z.available ? "RICHIEDI TAVOLO" : "NON DISPONIBILE"}
              </Text>
            </Pressable>
          </View>
        ))}

        <Text style={styles.section}>LE MIE RICHIESTE</Text>
        {reqList.length === 0 ? (
          <Text style={styles.empty}>Nessuna richiesta ancora.</Text>
        ) : (
          reqList.map((r: any) => (
            <View key={r.id} testID={`table-req-${r.id}`} style={styles.reqCard}>
              <View style={{ flex: 1 }}>
                <Text style={styles.reqName}>{r.zone_name}</Text>
                <Text style={styles.reqMeta}>{r.people} persone · {formatEventDate(r.created_at)}</Text>
              </View>
              <View style={styles.pendingPill}>
                <Text style={styles.pendingText}>IN ATTESA</Text>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const useStyles = makeStyles((colors) => ({
  root: { flex: 1, backgroundColor: colors.surface },
  content: { paddingHorizontal: 20, paddingTop: 8 },
  intro: { color: colors.brandSecondary, fontSize: 14, lineHeight: 21, marginBottom: 18 },
  zone: { backgroundColor: colors.surfaceSecondary, borderRadius: 16, borderWidth: 1, borderColor: colors.border, padding: 16, marginBottom: 14 },
  zoneTop: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  zoneName: { color: colors.onSurface, fontSize: 18, fontWeight: "900", letterSpacing: 1 },
  zonePrice: { color: colors.brandPrimary, fontSize: 18, fontWeight: "900", fontFamily: MONO },
  zoneMeta: { color: colors.muted, fontSize: 13, marginTop: 6, fontFamily: MONO },
  reqBtn: { marginTop: 14, backgroundColor: colors.brandPrimary, borderRadius: 12, paddingVertical: 14, alignItems: "center" },
  reqBtnOff: { backgroundColor: colors.surfaceTertiary, borderWidth: 1, borderColor: colors.border },
  reqBtnText: { color: colors.onBrandPrimary, fontSize: 14, fontWeight: "900", letterSpacing: 2 },
  reqBtnTextOff: { color: colors.muted },
  section: { color: colors.muted, fontSize: 12, letterSpacing: 3, fontWeight: "700", fontFamily: MONO, marginTop: 24, marginBottom: 14 },
  empty: { color: colors.muted, fontSize: 14 },
  reqCard: { flexDirection: "row", alignItems: "center", backgroundColor: colors.surfaceSecondary, borderRadius: 14, borderWidth: 1, borderColor: colors.border, padding: 16, marginBottom: 10 },
  reqName: { color: colors.onSurface, fontSize: 16, fontWeight: "800" },
  reqMeta: { color: colors.muted, fontSize: 12, marginTop: 4, fontFamily: MONO },
  pendingPill: { backgroundColor: colors.warning, borderRadius: 999, paddingHorizontal: 10, paddingVertical: 4 },
  pendingText: { color: colors.onWarning, fontSize: 10, fontWeight: "900", letterSpacing: 1 },
}));
