import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useQuery } from "@tanstack/react-query";

import { BackHeader } from "@/src/components/back-header";
import { apiGet } from "@/src/lib/api";
import { MONO } from "@/src/lib/fonts";
import { makeStyles, useTheme } from "@/src/theme";

const METHOD_LABEL: Record<string, string> = { contanti: "Contanti", pos: "POS" };

export default function StaffIncassi() {
  const styles = useStyles();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  const q = useQuery<any>({ queryKey: ["staff-incassi"], queryFn: () => apiGet("/api/staff/incassi"), refetchInterval: 5000 });
  const data = q.data;

  return (
    <View style={styles.root} testID="staff-incassi">
      <BackHeader title="INCASSI" />
      <ScrollView contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 32 }]} showsVerticalScrollIndicator={false}>
        {q.isLoading ? (
          <ActivityIndicator color={colors.brandPrimary} style={{ marginTop: 30 }} />
        ) : (
          <>
            <Text style={styles.date}>Serata del {data?.date}</Text>
            <View style={styles.totalCard}>
              <Text style={styles.totalLabel}>TOTALE INCASSATO</Text>
              <Text style={styles.totalValue}>€{(data?.totale ?? 0).toFixed(2)}</Text>
              <Text style={styles.totalSub}>{data?.count ?? 0} transazioni</Text>
            </View>

            <View style={styles.splitRow}>
              <View style={styles.splitCard}>
                <Text style={styles.splitLabel}>CONTANTI</Text>
                <Text style={styles.splitValue}>€{(data?.contanti ?? 0).toFixed(2)}</Text>
              </View>
              <View style={styles.splitCard}>
                <Text style={styles.splitLabel}>POS</Text>
                <Text style={styles.splitValue}>€{(data?.pos ?? 0).toFixed(2)}</Text>
              </View>
            </View>

            <Text style={styles.note}>
              Norma POS 2026: gli incassi POS devono combaciare con gli scontrini. Chiusura cassa con Gianluca.
            </Text>

            <Text style={styles.h}>TRANSAZIONI</Text>
            {(data?.payments ?? []).length === 0 ? (
              <Text style={styles.empty}>Nessun incasso registrato stasera.</Text>
            ) : (
              data.payments.map((p: any) => (
                <View key={p.id} testID={`pay-${p.id}`} style={styles.row}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.where}>{p.table || (p.bar ? `Ritiro · ${p.bar}` : "—")}</Text>
                    <Text style={styles.by}>{METHOD_LABEL[p.method] ?? p.method} · {p.by ?? ""}</Text>
                  </View>
                  <Text style={styles.amount}>€{Number(p.total).toFixed(2)}</Text>
                </View>
              ))
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
}

const useStyles = makeStyles((colors) => ({
  root: { flex: 1, backgroundColor: colors.surface },
  content: { paddingHorizontal: 20, paddingTop: 8 },
  date: { color: colors.muted, fontSize: 13, marginBottom: 14 },
  totalCard: { backgroundColor: colors.brandTertiary, borderRadius: 18, borderWidth: 1.5, borderColor: colors.borderStrong, padding: 20, alignItems: "center" },
  totalLabel: { color: colors.brandPrimary, fontSize: 11, letterSpacing: 3, fontWeight: "900", fontFamily: MONO },
  totalValue: { color: colors.onSurface, fontSize: 40, fontWeight: "900", marginTop: 8, fontFamily: MONO },
  totalSub: { color: colors.muted, fontSize: 12, marginTop: 6 },
  splitRow: { flexDirection: "row", gap: 12, marginTop: 12 },
  splitCard: { flex: 1, backgroundColor: colors.surfaceSecondary, borderRadius: 14, borderWidth: 1, borderColor: colors.border, padding: 16, alignItems: "center" },
  splitLabel: { color: colors.muted, fontSize: 11, letterSpacing: 2, fontWeight: "800", fontFamily: MONO },
  splitValue: { color: colors.onSurface, fontSize: 22, fontWeight: "900", marginTop: 6, fontFamily: MONO },
  note: { color: colors.muted, fontSize: 12, lineHeight: 18, marginTop: 16 },
  h: { color: colors.muted, fontSize: 12, letterSpacing: 3, fontWeight: "700", fontFamily: MONO, marginTop: 24, marginBottom: 12 },
  empty: { color: colors.muted, fontSize: 14 },
  row: { flexDirection: "row", alignItems: "center", backgroundColor: colors.surfaceSecondary, borderRadius: 12, borderWidth: 1, borderColor: colors.border, paddingHorizontal: 16, paddingVertical: 13, marginBottom: 10 },
  where: { color: colors.onSurface, fontSize: 14, fontWeight: "800" },
  by: { color: colors.muted, fontSize: 12, marginTop: 3 },
  amount: { color: colors.brandPrimary, fontSize: 16, fontWeight: "900", fontFamily: MONO },
}));
