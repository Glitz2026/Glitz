import { useState } from "react";
import { ScrollView, Text, View, Pressable, TextInput, ActivityIndicator, Alert, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { BackHeader } from "@/src/components/back-header";
import { apiDelete, apiGet, apiPatch, apiPost } from "@/src/lib/api";
import { MONO } from "@/src/lib/fonts";
import { makeStyles, useTheme } from "@/src/theme";

const DEPARTMENTS = [
  { id: "cambusa", label: "Cambusa" },
  { id: "barman", label: "Bar" },
  { id: "camerieri", label: "Camerieri" },
  { id: "runner", label: "Runner" },
  { id: "cassieri", label: "Cassieri" },
  { id: "direzione", label: "Direzione" },
];
const DLABEL: Record<string, string> = Object.fromEntries(DEPARTMENTS.map((d) => [d.id, d.label]));

function confirmDelete(name: string, onOk: () => void) {
  if (Platform.OS === "web") {
    // eslint-disable-next-line no-alert
    if (typeof window !== "undefined" && window.confirm(`Eliminare ${name}?`)) onOk();
    return;
  }
  Alert.alert("Elimina membro", `Eliminare ${name}?`, [
    { text: "Annulla", style: "cancel" },
    { text: "Elimina", style: "destructive", onPress: onOk },
  ]);
}

export default function StaffTeam() {
  const styles = useStyles();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const qc = useQueryClient();

  const q = useQuery<any>({ queryKey: ["staff-members"], queryFn: () => apiGet("/api/staff/members") });
  const [openId, setOpenId] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);

  // add form
  const [nName, setNName] = useState("");
  const [nEmail, setNEmail] = useState("");
  const [nPass, setNPass] = useState("");
  const [nPhone, setNPhone] = useState("");
  const [nDept, setNDept] = useState("camerieri");
  const [err, setErr] = useState<string | null>(null);

  const invalidate = () => qc.invalidateQueries({ queryKey: ["staff-members"] });

  const addMut = useMutation({
    mutationFn: () => apiPost("/api/staff/members", { name: nName.trim(), email: nEmail.trim(), password: nPass, phone: nPhone.trim() || null, department: nDept }),
    onSuccess: () => {
      setNName(""); setNEmail(""); setNPass(""); setNPhone(""); setShowAdd(false); setErr(null);
      invalidate();
    },
    onError: (e: any) => setErr(e?.data?.detail || "Errore"),
  });
  const editMut = useMutation({
    mutationFn: (v: { id: string; body: any }) => apiPatch(`/api/staff/members/${v.id}`, v.body),
    onSuccess: invalidate,
  });
  const delMut = useMutation({
    mutationFn: (id: string) => apiDelete(`/api/staff/members/${id}`),
    onSuccess: invalidate,
  });
  const resetMut = useMutation({
    mutationFn: (v: { id: string; pw: string }) => apiPost(`/api/staff/members/${v.id}/password`, { new_password: v.pw }),
  });

  const doDelete = (id: string, name: string) => confirmDelete(name, () => delMut.mutate(id));

  const grouped = q.data?.grouped ?? {};

  return (
    <View style={styles.root} testID="staff-team">
      <BackHeader title="GESTISCI STAFF" />
      <ScrollView contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 32 }]} showsVerticalScrollIndicator={false}>
        <Pressable testID="add-toggle" style={styles.addBar} onPress={() => setShowAdd((s) => !s)}>
          <Text style={styles.addBarText}>{showAdd ? "× Chiudi" : "+ Nuovo membro"}</Text>
        </Pressable>

        {showAdd ? (
          <View style={styles.addCard}>
            <Text style={styles.lab}>NOME</Text>
            <TextInput testID="add-name" value={nName} onChangeText={setNName} style={styles.input} placeholder="Nome Cognome" placeholderTextColor={colors.muted} />
            <Text style={styles.lab}>EMAIL</Text>
            <TextInput testID="add-email" value={nEmail} onChangeText={setNEmail} style={styles.input} autoCapitalize="none" keyboardType="email-address" placeholder="nome@glitz.staff" placeholderTextColor={colors.muted} />
            <Text style={styles.lab}>PASSWORD</Text>
            <TextInput testID="add-pass" value={nPass} onChangeText={setNPass} style={styles.input} placeholder="min 6 caratteri" placeholderTextColor={colors.muted} />
            <Text style={styles.lab}>TELEFONO (opz.)</Text>
            <TextInput testID="add-phone" value={nPhone} onChangeText={setNPhone} style={styles.input} keyboardType="phone-pad" placeholder="+39…" placeholderTextColor={colors.muted} />
            <Text style={styles.lab}>REPARTO</Text>
            <View style={styles.chipsWrap}>
              {DEPARTMENTS.map((d) => (
                <Pressable key={d.id} onPress={() => setNDept(d.id)} style={[styles.chip, nDept === d.id && styles.chipOn]}>
                  <Text style={[styles.chipText, nDept === d.id && styles.chipTextOn]}>{d.label}</Text>
                </Pressable>
              ))}
            </View>
            {err ? <Text style={styles.err}>{err}</Text> : null}
            <Pressable testID="add-submit" style={styles.saveBtn} disabled={addMut.isPending} onPress={() => addMut.mutate()}>
              <Text style={styles.saveText}>{addMut.isPending ? "…" : "CREA MEMBRO"}</Text>
            </Pressable>
          </View>
        ) : null}

        {q.isLoading ? <ActivityIndicator color={colors.brandPrimary} style={{ marginTop: 24 }} /> : null}

        {DEPARTMENTS.map((d) => {
          const list: any[] = grouped[d.id] ?? [];
          if (list.length === 0) return null;
          return (
            <View key={d.id}>
              <Text style={styles.deptHead}>{d.label.toUpperCase()} · {list.length}</Text>
              {list.map((m) => {
                const open = openId === m.user_id;
                return (
                  <View key={m.user_id} testID={`member-${m.user_id}`} style={styles.mCard}>
                    <Pressable style={styles.mTop} onPress={() => setOpenId(open ? null : m.user_id)}>
                      <View style={{ flex: 1 }}>
                        <Text style={[styles.mName, !m.is_active && styles.mInactive]}>{m.name}</Text>
                        <Text style={styles.mSub}>{m.email}{m.phone ? ` · ${m.phone}` : ""}</Text>
                      </View>
                      <Text style={styles.mChevron}>{open ? "▲" : "▼"}</Text>
                    </Pressable>

                    {open ? (
                      <View style={styles.mEdit}>
                        <Text style={styles.lab}>SPOSTA IN REPARTO</Text>
                        <View style={styles.chipsWrap}>
                          {DEPARTMENTS.map((dd) => (
                            <Pressable
                              key={dd.id}
                              testID={`move-${m.user_id}-${dd.id}`}
                              onPress={() => editMut.mutate({ id: m.user_id, body: { department: dd.id } })}
                              style={[styles.chip, m.department === dd.id && styles.chipOn]}
                            >
                              <Text style={[styles.chipText, m.department === dd.id && styles.chipTextOn]}>{dd.label}</Text>
                            </Pressable>
                          ))}
                        </View>
                        <View style={styles.editRow}>
                          <Pressable
                            testID={`active-${m.user_id}`}
                            style={[styles.smallBtn, m.is_active ? styles.smallOn : styles.smallOff]}
                            onPress={() => editMut.mutate({ id: m.user_id, body: { is_active: !m.is_active } })}
                          >
                            <Text style={styles.smallText}>{m.is_active ? "ATTIVO" : "DISATTIVO"}</Text>
                          </Pressable>
                          <Pressable
                            testID={`reset-${m.user_id}`}
                            style={[styles.smallBtn, styles.smallGhost]}
                            onPress={() => resetMut.mutate({ id: m.user_id, pw: "glitz2026" })}
                          >
                            <Text style={styles.smallTextGhost}>{resetMut.isPending ? "…" : "RESET PW"}</Text>
                          </Pressable>
                          {m.department !== "direzione" ? (
                            <Pressable testID={`del-${m.user_id}`} style={[styles.smallBtn, styles.smallDel]} onPress={() => doDelete(m.user_id, m.name)}>
                              <Text style={styles.smallTextDel}>ELIMINA</Text>
                            </Pressable>
                          ) : null}
                        </View>
                        <Text style={styles.hint}>Reset PW imposta la password a “glitz2026”.</Text>
                      </View>
                    ) : null}
                  </View>
                );
              })}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

// delete uses the shared apiDelete helper (bearer token attached automatically)

const useStyles = makeStyles((colors) => ({
  root: { flex: 1, backgroundColor: colors.surface },
  content: { paddingHorizontal: 20, paddingTop: 8 },
  addBar: { borderWidth: 1.5, borderColor: colors.borderStrong, borderRadius: 12, paddingVertical: 14, alignItems: "center", backgroundColor: colors.surfaceTertiary, marginBottom: 14 },
  addBarText: { color: colors.brandPrimary, fontSize: 14, fontWeight: "900", letterSpacing: 1 },
  addCard: { backgroundColor: colors.surfaceSecondary, borderRadius: 16, borderWidth: 1, borderColor: colors.border, padding: 16, marginBottom: 18 },
  lab: { color: colors.muted, fontSize: 11, letterSpacing: 2, fontWeight: "700", fontFamily: MONO, marginTop: 12, marginBottom: 8 },
  input: { backgroundColor: colors.surfaceTertiary, borderWidth: 1, borderColor: colors.border, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12, color: colors.onSurface, fontSize: 15 },
  chipsWrap: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  chip: { borderWidth: 1, borderColor: colors.border, borderRadius: 999, paddingHorizontal: 12, paddingVertical: 7, backgroundColor: colors.surfaceTertiary },
  chipOn: { backgroundColor: colors.brandPrimary, borderColor: colors.brandPrimary },
  chipText: { color: colors.brandSecondary, fontSize: 12, fontWeight: "800" },
  chipTextOn: { color: colors.onBrandPrimary },
  err: { color: colors.error, fontSize: 13, marginTop: 12 },
  saveBtn: { backgroundColor: colors.brandPrimary, borderRadius: 12, paddingVertical: 14, alignItems: "center", marginTop: 16 },
  saveText: { color: colors.onBrandPrimary, fontSize: 14, fontWeight: "900", letterSpacing: 1 },
  deptHead: { color: colors.muted, fontSize: 12, letterSpacing: 3, fontWeight: "700", fontFamily: MONO, marginTop: 20, marginBottom: 10 },
  mCard: { backgroundColor: colors.surfaceSecondary, borderRadius: 14, borderWidth: 1, borderColor: colors.border, marginBottom: 10, overflow: "hidden" },
  mTop: { flexDirection: "row", alignItems: "center", padding: 14 },
  mName: { color: colors.onSurface, fontSize: 15, fontWeight: "800" },
  mInactive: { color: colors.muted, textDecorationLine: "line-through" },
  mSub: { color: colors.muted, fontSize: 12, marginTop: 3 },
  mChevron: { color: colors.brandPrimary, fontSize: 12, fontWeight: "900", paddingLeft: 10 },
  mEdit: { paddingHorizontal: 14, paddingBottom: 14, borderTopWidth: 1, borderTopColor: colors.divider },
  editRow: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 14 },
  smallBtn: { borderRadius: 10, paddingHorizontal: 14, paddingVertical: 10 },
  smallOn: { backgroundColor: colors.success },
  smallOff: { backgroundColor: colors.muted },
  smallText: { color: "#000000", fontSize: 11, fontWeight: "900", letterSpacing: 1 },
  smallGhost: { borderWidth: 1.5, borderColor: colors.borderStrong, backgroundColor: colors.surfaceTertiary },
  smallTextGhost: { color: colors.brandPrimary, fontSize: 11, fontWeight: "900", letterSpacing: 1 },
  smallDel: { backgroundColor: colors.error },
  smallTextDel: { color: colors.onError, fontSize: 11, fontWeight: "900", letterSpacing: 1 },
  hint: { color: colors.muted, fontSize: 11, marginTop: 12 },
}));
