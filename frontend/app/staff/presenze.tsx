import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useQuery } from "@tanstack/react-query";

import { BackHeader } from "@/src/components/back-header";
import { apiGet } from "@/src/lib/api";
import { MONO } from "@/src/lib/fonts";
import { makeStyles, useTheme } from "@/src/theme";

const DEPTS = [
  { id: "cambusa", label: "Cambusa" },
  { id: "barman", label: "Bar" },
  { id: "camerieri", label: "Camerieri" },
  { id: "runner", label: "Runner" },
  { id: "cassieri", label: "Cassieri" },
  { id: "direzione", label: "Direzione" },
];

function hhmm(iso?: string | null) {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit" });
  } catch {
    return "";
  }
}

export default function StaffPresenze() {
  const styles = useStyles();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  const q = useQuery<any>({ queryKey: ["staff-shifts"], queryFn: () => apiGet("/api/staff/shifts"), refetchInterval: 5000 });
  const data = q.data;
  const grouped = data?.grouped ?? {};

  return (
    <View style={styles.root} testID="staff-presenze">
      <BackHeader title="PRESENZE" />
      <ScrollView contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 32 }]} showsVerticalScrollIndicator={false}>
        {q.isLoading ? (
          <ActivityIndicator color={colors.brandPrimary} style={{ marginTop: 30 }} />
        ) : (
          <>
            <View style={styles.totalCard}>
              <Text style={styles.totalLabel}>IN SERVIZIO ORA</Text>
              <Text style={styles.totalValue}>{data?.count ?? 0}</Text>
              <Text style={styles.totalSub}>Serata del {data?.date}</Text>
            </View>

            {(data?.count ?? 0) === 0 ? (
              <Text style={styles.empty}>Nessuno ha ancora timbrato l'entrata.</Text>
            ) : (
              DEPTS.map((d) => {
                const list: any[] = grouped[d.id] ?? [];
                if (list.length === 0) return null;
                return (
                  <View key={d.id}>
                    <Text style={styles.deptHead}>{d.label.toUpperCase()} · {list.length}</Text>
                    {list.map((s) => (
                      <View key={s.id} testID={`shift-${s.id}`} style={styles.row}>
                        <View style={styles.dot} />
                        <Text style={styles.name}>{s.name}</Text>
                        <Text style={styles.time}>dalle {hhmm(s.check_in)}</Text>
                      </View>
                    ))}
                  </View>
                );
              })
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
  totalCard: { backgroundColor: colors.brandTertiary, borderRadius: 18, borderWidth: 1.5, borderColor: colors.borderStrong, padding: 20, alignItems: "center", marginBottom: 8 },
  totalLabel: { color: colors.brandPrimary, fontSize: 11, letterSpacing: 3, fontWeight: "900", fontFamily: MONO },
  totalValue: { color: colors.onSurface, fontSize: 44, fontWeight: "900", marginTop: 6, fontFamily: MONO },
  totalSub: { color: colors.muted, fontSize: 12, marginTop: 6 },
  empty: { color: colors.muted, fontSize: 14, marginTop: 20 },
  deptHead: { color: colors.muted, fontSize: 12, letterSpacing: 3, fontWeight: "700", fontFamily: MONO, marginTop: 22, marginBottom: 10 },
  row: { flexDirection: "row", alignItems: "center", gap: 12, backgroundColor: colors.surfaceSecondary, borderRadius: 12, borderWidth: 1, borderColor: colors.border, paddingHorizontal: 16, paddingVertical: 13, marginBottom: 8 },
  dot: { width: 10, height: 10, borderRadius: 999, backgroundColor: colors.success },
  name: { color: colors.onSurface, fontSize: 15, fontWeight: "800", flex: 1 },
  time: { color: colors.muted, fontSize: 12, fontFamily: MONO },
}));
