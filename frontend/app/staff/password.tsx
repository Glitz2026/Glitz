import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { BackHeader } from "@/src/components/back-header";
import { apiPost } from "@/src/lib/api";
import { MONO } from "@/src/lib/fonts";
import { makeStyles, useTheme } from "@/src/theme";

export default function StaffPassword() {
  const styles = useStyles();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const qc = useQueryClient();

  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [err, setErr] = useState<string | null>(null);

  const mut = useMutation({
    mutationFn: () => apiPost("/api/staff/change-password", { new_password: pw }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["staff-me"] });
      router.back();
    },
    onError: (e: any) => setErr(e?.data?.detail || "Errore"),
  });

  const submit = () => {
    setErr(null);
    if (pw.length < 6) { setErr("Minimo 6 caratteri."); return; }
    if (pw !== pw2) { setErr("Le password non coincidono."); return; }
    mut.mutate();
  };

  return (
    <View style={styles.root} testID="staff-password">
      <BackHeader title="CAMBIA PASSWORD" />
      <View style={[styles.content, { paddingBottom: insets.bottom + 32 }]}>
        <Text style={styles.lab}>NUOVA PASSWORD</Text>
        <TextInput testID="pw1" value={pw} onChangeText={setPw} secureTextEntry style={styles.input} placeholder="••••••" placeholderTextColor={colors.muted} />
        <Text style={styles.lab}>CONFERMA PASSWORD</Text>
        <TextInput testID="pw2" value={pw2} onChangeText={setPw2} secureTextEntry style={styles.input} placeholder="••••••" placeholderTextColor={colors.muted} />
        {err ? <Text style={styles.err}>{err}</Text> : null}
        <Pressable testID="pw-submit" style={styles.btn} disabled={mut.isPending} onPress={submit}>
          <Text style={styles.btnText}>{mut.isPending ? "…" : "SALVA"}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const useStyles = makeStyles((colors) => ({
  root: { flex: 1, backgroundColor: colors.surface },
  content: { paddingHorizontal: 20, paddingTop: 12 },
  lab: { color: colors.muted, fontSize: 11, letterSpacing: 2, fontWeight: "700", fontFamily: MONO, marginTop: 18, marginBottom: 8 },
  input: { backgroundColor: colors.surfaceTertiary, borderWidth: 1, borderColor: colors.border, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 13, color: colors.onSurface, fontSize: 16 },
  err: { color: colors.error, fontSize: 13, marginTop: 14 },
  btn: { backgroundColor: colors.brandPrimary, borderRadius: 14, paddingVertical: 16, alignItems: "center", marginTop: 24 },
  btnText: { color: colors.onBrandPrimary, fontSize: 15, fontWeight: "900", letterSpacing: 2 },
}));
