import * as DocumentPicker from "expo-document-picker";
import * as Linking from "expo-linking";
import { useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { BackHeader } from "@/src/components/back-header";
import { apiDelete, apiGet, apiPost, apiUpload, mediaUrl } from "@/src/lib/api";
import { MONO } from "@/src/lib/fonts";
import type { StaffMe } from "@/src/lib/staff";
import { makeStyles, useTheme } from "@/src/theme";

function openDoc(url: string) {
  const full = url.startsWith("http") ? url : mediaUrl(url);
  if (full) Linking.openURL(full);
}

export default function StaffPayslips() {
  const styles = useStyles();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const qc = useQueryClient();

  const me = useQuery<StaffMe>({ queryKey: ["staff-me"], queryFn: () => apiGet("/api/staff/me") });
  const isDir = me.data?.is_direzione ?? false;

  const mine = useQuery<any>({ queryKey: ["payslips-mine"], queryFn: () => apiGet("/api/staff/payslips"), enabled: !isDir || !me.data });
  const all = useQuery<any>({ queryKey: ["payslips-all"], queryFn: () => apiGet("/api/staff/payslips/all"), enabled: isDir });
  const members = useQuery<any>({ queryKey: ["staff-members"], queryFn: () => apiGet("/api/staff/members"), enabled: isDir });

  const [pickUser, setPickUser] = useState<string | null>(null);
  const [month, setMonth] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const assignMut = useMutation({
    mutationFn: (v: { user_id: string; month: string; url: string }) => apiPost("/api/staff/payslips", v),
    onSuccess: () => {
      setMsg("Cedolino assegnato.");
      setMonth("");
      qc.invalidateQueries({ queryKey: ["payslips-all"] });
    },
    onError: (e: any) => setMsg(e?.data?.detail || "Errore"),
  });
  const delMut = useMutation({
    mutationFn: (id: string) => apiDelete(`/api/staff/payslips/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["payslips-all"] }),
  });

  const uploadAndAssign = async () => {
    setMsg(null);
    if (!pickUser) { setMsg("Seleziona un dipendente."); return; }
    if (!month.trim()) { setMsg("Indica il mese."); return; }
    try {
      const res = await DocumentPicker.getDocumentAsync({ type: ["application/pdf", "image/*"], copyToCacheDirectory: true });
      if (res.canceled || !res.assets?.[0]) return;
      setBusy(true);
      const asset = res.assets[0];
      const up = await apiUpload("/api/staff/upload", asset.uri, asset.name || "cedolino.pdf", asset.mimeType || "application/pdf");
      await assignMut.mutateAsync({ user_id: pickUser, month: month.trim(), url: up.url });
    } catch (e: any) {
      setMsg(e?.data?.detail || "Caricamento non riuscito");
    } finally {
      setBusy(false);
    }
  };

  const memberList: any[] = members.data?.members ?? [];
  const nameOf = (uid: string) => memberList.find((m) => m.user_id === uid)?.name ?? "";

  return (
    <View style={styles.root} testID="staff-payslips">
      <BackHeader title="CEDOLINI" />
      <ScrollView contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 32 }]} showsVerticalScrollIndicator={false}>
        {me.isLoading ? <ActivityIndicator color={colors.brandPrimary} style={{ marginTop: 24 }} /> : null}

        {!isDir ? (
          <>
            <Text style={styles.h}>I MIEI CEDOLINI</Text>
            {mine.isLoading ? (
              <ActivityIndicator color={colors.brandPrimary} style={{ marginTop: 16 }} />
            ) : (mine.data?.payslips ?? []).length === 0 ? (
              <Text style={styles.empty}>Nessun cedolino disponibile. Verrà caricato dalla Direzione.</Text>
            ) : (
              mine.data.payslips.map((p: any) => (
                <Pressable key={p.id} testID={`payslip-${p.id}`} style={styles.row} onPress={() => openDoc(p.url)}>
                  <Text style={styles.month}>{p.month}</Text>
                  <Text style={styles.open}>APRI PDF ›</Text>
                </Pressable>
              ))
            )}
          </>
        ) : (
          <>
            <Text style={styles.h}>ASSEGNA CEDOLINO A UN DIPENDENTE</Text>
            <Text style={styles.lab}>DIPENDENTE</Text>
            <View style={styles.chipsWrap}>
              {memberList.map((m) => (
                <Pressable key={m.user_id} testID={`pick-${m.user_id}`} onPress={() => setPickUser(m.user_id)} style={[styles.chip, pickUser === m.user_id && styles.chipOn]}>
                  <Text style={[styles.chipText, pickUser === m.user_id && styles.chipTextOn]}>{m.name}</Text>
                </Pressable>
              ))}
            </View>
            <Text style={styles.lab}>MESE</Text>
            <TextInput testID="ps-month" value={month} onChangeText={setMonth} style={styles.input} placeholder="es. Giugno 2026" placeholderTextColor={colors.muted} />
            {msg ? <Text style={styles.msg}>{msg}</Text> : null}
            <Pressable testID="ps-upload" style={styles.saveBtn} disabled={busy} onPress={uploadAndAssign}>
              <Text style={styles.saveText}>{busy ? "CARICAMENTO…" : "CARICA PDF E ASSEGNA"}</Text>
            </Pressable>

            <Text style={styles.h}>DOCUMENTI MENSILI COMPLETI</Text>
            {(all.data?.monthly_docs ?? []).map((d: any) => (
              <Pressable key={d.month} testID={`monthly-${d.month}`} style={styles.row} onPress={() => openDoc(d.url)}>
                <Text style={styles.month}>{d.month}</Text>
                <Text style={styles.open}>APRI PDF ›</Text>
              </Pressable>
            ))}

            <Text style={styles.h}>CEDOLINI ASSEGNATI</Text>
            {(all.data?.payslips ?? []).length === 0 ? (
              <Text style={styles.empty}>Nessun cedolino assegnato ai singoli dipendenti.</Text>
            ) : (
              all.data.payslips.map((p: any) => (
                <View key={p.id} style={styles.assignedRow}>
                  <Pressable style={{ flex: 1 }} onPress={() => openDoc(p.url)}>
                    <Text style={styles.month}>{p.staff_name || nameOf(p.user_id)}</Text>
                    <Text style={styles.sub}>{p.month} · APRI ›</Text>
                  </Pressable>
                  <Pressable testID={`del-ps-${p.id}`} style={styles.delBtn} onPress={() => delMut.mutate(p.id)}>
                    <Text style={styles.delText}>×</Text>
                  </Pressable>
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
  h: { color: colors.muted, fontSize: 12, letterSpacing: 3, fontWeight: "700", fontFamily: MONO, marginTop: 24, marginBottom: 12 },
  empty: { color: colors.muted, fontSize: 14 },
  lab: { color: colors.muted, fontSize: 11, letterSpacing: 2, fontWeight: "700", fontFamily: MONO, marginTop: 14, marginBottom: 8 },
  input: { backgroundColor: colors.surfaceTertiary, borderWidth: 1, borderColor: colors.border, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12, color: colors.onSurface, fontSize: 15 },
  chipsWrap: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  chip: { borderWidth: 1, borderColor: colors.border, borderRadius: 999, paddingHorizontal: 12, paddingVertical: 7, backgroundColor: colors.surfaceTertiary },
  chipOn: { backgroundColor: colors.brandPrimary, borderColor: colors.brandPrimary },
  chipText: { color: colors.brandSecondary, fontSize: 12, fontWeight: "800" },
  chipTextOn: { color: colors.onBrandPrimary },
  msg: { color: colors.brandPrimary, fontSize: 13, marginTop: 12 },
  saveBtn: { backgroundColor: colors.brandPrimary, borderRadius: 12, paddingVertical: 14, alignItems: "center", marginTop: 16 },
  saveText: { color: colors.onBrandPrimary, fontSize: 14, fontWeight: "900", letterSpacing: 1 },
  row: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", backgroundColor: colors.surfaceSecondary, borderRadius: 12, borderWidth: 1, borderColor: colors.border, paddingHorizontal: 16, paddingVertical: 15, marginBottom: 10 },
  month: { color: colors.onSurface, fontSize: 15, fontWeight: "800" },
  open: { color: colors.brandPrimary, fontSize: 12, fontWeight: "900", letterSpacing: 1 },
  assignedRow: { flexDirection: "row", alignItems: "center", backgroundColor: colors.surfaceSecondary, borderRadius: 12, borderWidth: 1, borderColor: colors.border, paddingHorizontal: 16, paddingVertical: 13, marginBottom: 10 },
  sub: { color: colors.muted, fontSize: 12, marginTop: 3 },
  delBtn: { width: 34, height: 34, borderRadius: 999, alignItems: "center", justifyContent: "center", backgroundColor: colors.brandTertiary, borderWidth: 1, borderColor: colors.borderStrong },
  delText: { color: colors.brandPrimary, fontSize: 20, fontWeight: "900" },
}));
