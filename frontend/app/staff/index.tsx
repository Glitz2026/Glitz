import { useRouter } from "expo-router";
import { ScrollView, Text, View, Pressable, ActivityIndicator, RefreshControl } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { apiGet, apiPost } from "@/src/lib/api";
import { useAuth } from "@/src/lib/auth-context";
import { MONO } from "@/src/lib/fonts";
import { useStaffBoard, type StaffMe, type StaffTicket } from "@/src/lib/staff";
import { makeStyles, useTheme } from "@/src/theme";

const DEPT_SHORT: Record<string, string> = {
  cambusa: "Cambusa",
  barman: "Bar",
  camerieri: "Camerieri",
  runner: "Runner",
  cassieri: "Cassa",
  direzione: "Direzione",
};

function completeLabel(t: StaffTicket): string {
  if (t.kind === "waiter") return "FATTO";
  if (t.kind === "sos") return "GESTITO";
  if (t.department === "cambusa" || t.department === "barman") return "PRONTO";
  if (t.department === "camerieri") return "CONSEGNATO";
  if (t.department === "cassieri") return "INCASSATO";
  return "COMPLETA";
}

export default function StaffBoard() {
  const styles = useStyles();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const qc = useQueryClient();
  const { user, logout } = useAuth();

  const me = useQuery<StaffMe>({ queryKey: ["staff-me"], queryFn: () => apiGet("/api/staff/me") });
  const board = useStaffBoard();
  const isDir = me.data?.is_direzione ?? false;

  const takeMut = useMutation({
    mutationFn: (id: string) => apiPost(`/api/staff/tickets/${id}/take`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["staff-board"] }),
  });
  const doneMut = useMutation({
    mutationFn: (id: string) => apiPost(`/api/staff/tickets/${id}/complete`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["staff-board"] }),
  });

  const tickets = board.data?.tickets ?? [];
  const sos = tickets.filter((t) => t.kind === "sos");
  const work = tickets.filter((t) => t.kind !== "sos");

  const renderTicket = (t: StaffTicket) => {
    const busy = takeMut.isPending || doneMut.isPending;
    return (
      <View key={t.id} testID={`ticket-${t.id}`} style={[styles.card, t.kind === "sos" && styles.cardSos]}>
        <View style={styles.cardTop}>
          <Text style={[styles.kind, t.kind === "sos" && styles.kindSos]}>{t.kind_label.toUpperCase()}</Text>
          {isDir ? (
            <View style={styles.deptTag}>
              <Text style={styles.deptTagText}>{DEPT_SHORT[t.department] ?? t.department}</Text>
            </View>
          ) : (
            <View style={[styles.statusPill, t.status === "in_progress" ? styles.pillInfo : styles.pillWarn]}>
              <Text style={styles.pillText}>{t.status === "in_progress" ? "IN CORSO" : "NUOVO"}</Text>
            </View>
          )}
        </View>

        {t.table ? <Text style={styles.where}>📍 {t.table}</Text> : null}
        {t.bar ? <Text style={styles.where}>🍸 {t.bar}</Text> : null}

        {t.items.length > 0 ? (
          <View style={styles.items}>
            {t.items.map((it) => (
              <Text key={it.id} style={styles.itemLine}>
                {it.qty}× {it.name}
              </Text>
            ))}
            <Text style={styles.total}>€{t.total.toFixed(2)}</Text>
          </View>
        ) : null}
        {t.reason ? <Text style={styles.reason}>Richiesta: {t.reason}</Text> : null}
        {t.note ? <Text style={styles.reason}>Nota: {t.note}</Text> : null}
        {t.guest_name ? <Text style={styles.guest}>Cliente: {t.guest_name}</Text> : null}

        {t.route.length > 1 ? (
          <View style={styles.routeRow}>
            {t.route.map((d, i) => (
              <Text key={d} style={[styles.routeStep, i === t.stage && styles.routeStepActive, i < t.stage && styles.routeStepDone]}>
                {DEPT_SHORT[d]}
                {i < t.route.length - 1 ? "  ›  " : ""}
              </Text>
            ))}
          </View>
        ) : null}

        <View style={styles.actions}>
          {t.status === "pending" ? (
            <Pressable
              testID={`take-${t.id}`}
              style={[styles.actBtn, styles.actGhost]}
              disabled={busy}
              onPress={() => takeMut.mutate(t.id)}
            >
              <Text style={styles.actGhostText}>PRESA IN CARICO</Text>
            </Pressable>
          ) : null}
          <Pressable
            testID={`done-${t.id}`}
            style={[styles.actBtn, styles.actPrimary]}
            disabled={busy}
            onPress={() => doneMut.mutate(t.id)}
          >
            <Text style={styles.actPrimaryText}>{completeLabel(t)}</Text>
          </Pressable>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.root} testID="staff-board">
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.kicker}>PANNELLO STAFF</Text>
            <Text style={styles.dept}>{me.data?.department.label ?? "…"}</Text>
            <Text style={styles.who}>{user?.name}</Text>
          </View>
          <Pressable testID="staff-logout" style={styles.logout} onPress={() => logout()} hitSlop={8}>
            <Text style={styles.logoutText}>ESCI</Text>
          </Pressable>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
          <Pressable testID="nav-compiti" style={styles.chip} onPress={() => router.push("/staff/checklist")}>
            <Text style={styles.chipText}>Compiti</Text>
          </Pressable>
          <Pressable testID="nav-cedolini" style={styles.chip} onPress={() => router.push("/staff/payslips")}>
            <Text style={styles.chipText}>Cedolini</Text>
          </Pressable>
          {isDir ? (
            <Pressable testID="nav-team" style={styles.chip} onPress={() => router.push("/staff/team")}>
              <Text style={styles.chipText}>Gestisci staff</Text>
            </Pressable>
          ) : null}
          <Pressable testID="nav-password" style={styles.chip} onPress={() => router.push("/staff/password")}>
            <Text style={styles.chipText}>Password</Text>
          </Pressable>
        </ScrollView>
      </View>

      <ScrollView
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 32 }]}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={board.isFetching} onRefresh={() => board.refetch()} tintColor={colors.brandPrimary} />}
      >
        {me.data?.user.must_change_password ? (
          <Pressable style={styles.warnBanner} onPress={() => router.push("/staff/password")}>
            <Text style={styles.warnText}>Cambia la password di default. Tocca qui.</Text>
          </Pressable>
        ) : null}

        {sos.length > 0 ? (
          <View style={styles.sosBlock}>
            <Text style={styles.sosTitle}>🚨 RICHIESTE SOS</Text>
            {sos.map(renderTicket)}
          </View>
        ) : null}

        <Text style={styles.section}>
          {isDir ? "TUTTI I TICKET ATTIVI" : "DA GESTIRE"} · {work.length}
        </Text>
        {board.isLoading ? (
          <ActivityIndicator color={colors.brandPrimary} style={{ marginTop: 20 }} />
        ) : work.length === 0 ? (
          <Text style={styles.empty}>Nessun ticket in attesa. La board si aggiorna in tempo reale.</Text>
        ) : (
          work.map(renderTicket)
        )}
      </ScrollView>
    </View>
  );
}

const useStyles = makeStyles((colors) => ({
  root: { flex: 1, backgroundColor: colors.surface },
  header: { paddingHorizontal: 20, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: colors.border, backgroundColor: colors.surfaceSecondary },
  headerTop: { flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between" },
  kicker: { color: colors.brandPrimary, fontSize: 10, letterSpacing: 3, fontWeight: "800", fontFamily: MONO },
  dept: { color: colors.onSurface, fontSize: 24, fontWeight: "900", marginTop: 4 },
  who: { color: colors.muted, fontSize: 13, marginTop: 2 },
  logout: { borderWidth: 1, borderColor: colors.border, borderRadius: 10, paddingHorizontal: 14, paddingVertical: 8 },
  logoutText: { color: colors.onSurface, fontSize: 12, fontWeight: "800", letterSpacing: 1 },
  chips: { gap: 8, paddingTop: 14, paddingRight: 8 },
  chip: { borderWidth: 1, borderColor: colors.borderStrong, borderRadius: 999, paddingHorizontal: 14, paddingVertical: 8, backgroundColor: colors.surfaceTertiary },
  chipText: { color: colors.onSurface, fontSize: 13, fontWeight: "800" },
  content: { paddingHorizontal: 20, paddingTop: 16 },
  warnBanner: { backgroundColor: colors.brandTertiary, borderWidth: 1, borderColor: colors.borderStrong, borderRadius: 12, padding: 12, marginBottom: 12 },
  warnText: { color: colors.onSurface, fontSize: 13, fontWeight: "700" },
  section: { color: colors.muted, fontSize: 12, letterSpacing: 3, fontWeight: "700", fontFamily: MONO, marginTop: 8, marginBottom: 14 },
  empty: { color: colors.muted, fontSize: 14 },
  sosBlock: { marginBottom: 8 },
  sosTitle: { color: colors.error, fontSize: 13, fontWeight: "900", letterSpacing: 2, marginBottom: 10 },
  card: { backgroundColor: colors.surfaceSecondary, borderRadius: 16, borderWidth: 1, borderColor: colors.border, padding: 16, marginBottom: 12 },
  cardSos: { borderColor: colors.error, backgroundColor: colors.brandTertiary },
  cardTop: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 8 },
  kind: { color: colors.onSurface, fontSize: 14, fontWeight: "900", letterSpacing: 1, flex: 1, paddingRight: 8 },
  kindSos: { color: colors.error },
  deptTag: { backgroundColor: colors.surfaceTertiary, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4, borderWidth: 1, borderColor: colors.borderStrong },
  deptTagText: { color: colors.brandPrimary, fontSize: 11, fontWeight: "900", letterSpacing: 1 },
  where: { color: colors.brandSecondary, fontSize: 14, fontWeight: "700", marginTop: 2 },
  items: { marginTop: 10, backgroundColor: colors.surfaceTertiary, borderRadius: 10, padding: 12 },
  itemLine: { color: colors.onSurface, fontSize: 14, fontWeight: "700", marginBottom: 2 },
  total: { color: colors.brandPrimary, fontSize: 16, fontWeight: "900", fontFamily: MONO, marginTop: 6 },
  reason: { color: colors.onSurface, fontSize: 14, fontWeight: "700", marginTop: 8 },
  guest: { color: colors.muted, fontSize: 12, marginTop: 6 },
  routeRow: { flexDirection: "row", flexWrap: "wrap", marginTop: 12 },
  routeStep: { color: colors.muted, fontSize: 11, fontWeight: "800", fontFamily: MONO },
  routeStepActive: { color: colors.brandPrimary },
  routeStepDone: { color: colors.success },
  actions: { flexDirection: "row", gap: 10, marginTop: 14 },
  actBtn: { flex: 1, borderRadius: 12, paddingVertical: 13, alignItems: "center" },
  actGhost: { borderWidth: 1.5, borderColor: colors.border, backgroundColor: colors.surfaceTertiary },
  actGhostText: { color: colors.onSurface, fontSize: 12, fontWeight: "900", letterSpacing: 1 },
  actPrimary: { backgroundColor: colors.brandPrimary },
  actPrimaryText: { color: colors.onBrandPrimary, fontSize: 13, fontWeight: "900", letterSpacing: 1 },
  statusPill: { borderRadius: 999, paddingHorizontal: 10, paddingVertical: 4 },
  pillWarn: { backgroundColor: colors.warning },
  pillInfo: { backgroundColor: colors.info },
  pillText: { color: "#000000", fontSize: 10, fontWeight: "900", letterSpacing: 1 },
}));
