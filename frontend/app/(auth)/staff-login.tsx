import { useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useQuery } from "@tanstack/react-query";

import { BackHeader } from "@/src/components/back-header";
import { apiGet } from "@/src/lib/api";
import { MONO } from "@/src/lib/fonts";
import { useAuth } from "@/src/lib/auth-context";
import { makeStyles, useTheme } from "@/src/theme";

type Dept = { id: string; label: string; color?: string; members: { name: string; email: string }[] };

export default function StaffLogin() {
  const styles = useStyles();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { login } = useAuth();

  const dir = useQuery<{ departments: Dept[] }>({ queryKey: ["staff-directory"], queryFn: () => apiGet("/api/staff/directory") });

  const [deptId, setDeptId] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const departments = dir.data?.departments ?? [];
  const dept = departments.find((d) => d.id === deptId) ?? null;

  const submit = async () => {
    if (!email) return;
    setError(null);
    setBusy(true);
    try {
      await login(email, password);
      router.replace("/staff");
    } catch (e: any) {
      setError(e?.data?.detail || "Password non valida");
      setBusy(false);
    }
  };

  return (
    <View style={styles.root} testID="staff-login-screen">
      <BackHeader />
      <KeyboardAwareScrollView
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 40 }]}
        bottomOffset={24}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.kicker}>AREA RISERVATA</Text>
        <Text style={styles.title}>Accesso Staff</Text>

        {dir.isLoading ? (
          <ActivityIndicator color={colors.brandPrimary} style={{ marginTop: 30 }} />
        ) : (
          <>
            {/* Step 1 — reparto */}
            <Text style={styles.step}>1 · SCEGLI IL REPARTO</Text>
            <View style={styles.chipsWrap}>
              {departments.map((d) => (
                <Pressable
                  key={d.id}
                  testID={`dept-${d.id}`}
                  onPress={() => {
                    setDeptId(d.id);
                    setEmail(null);
                    setName(null);
                    setError(null);
                  }}
                  style={[styles.chip, deptId === d.id && styles.chipOn]}
                >
                  <Text style={[styles.chipText, deptId === d.id && styles.chipTextOn]}>{d.label}</Text>
                </Pressable>
              ))}
            </View>

            {/* Step 2 — nome */}
            {dept ? (
              <>
                <Text style={styles.step}>2 · CHI SEI?</Text>
                <ScrollView style={styles.memberBox} nestedScrollEnabled showsVerticalScrollIndicator={false}>
                  {dept.members.map((m) => (
                    <Pressable
                      key={m.email}
                      testID={`member-${m.email}`}
                      onPress={() => {
                        setEmail(m.email);
                        setName(m.name);
                        setError(null);
                      }}
                      style={[styles.memberRow, email === m.email && styles.memberRowOn]}
                    >
                      <Text style={[styles.memberText, email === m.email && styles.memberTextOn]}>{m.name}</Text>
                      {email === m.email ? <Text style={styles.check}>✓</Text> : null}
                    </Pressable>
                  ))}
                </ScrollView>
              </>
            ) : null}

            {/* Step 3 — password */}
            {email ? (
              <>
                <Text style={styles.step}>3 · PASSWORD</Text>
                <Text style={styles.who}>{name}</Text>
                <TextInput
                  testID="staff-password"
                  value={password}
                  onChangeText={setPassword}
                  placeholder="••••••"
                  placeholderTextColor={colors.muted}
                  style={styles.input}
                  secureTextEntry
                  autoFocus
                  onSubmitEditing={submit}
                />
                {error ? <Text style={styles.error} testID="staff-login-error">{error}</Text> : null}
                <Pressable testID="staff-login-submit" style={styles.primary} onPress={submit} disabled={busy}>
                  {busy ? <ActivityIndicator color={colors.onBrandPrimary} /> : <Text style={styles.primaryText}>ENTRA</Text>}
                </Pressable>
              </>
            ) : null}
          </>
        )}
      </KeyboardAwareScrollView>
    </View>
  );
}

const useStyles = makeStyles((colors) => ({
  root: { flex: 1, backgroundColor: colors.surface },
  content: { paddingHorizontal: 24, paddingTop: 8 },
  kicker: { color: colors.brandPrimary, fontSize: 12, letterSpacing: 5, fontWeight: "800", fontFamily: MONO },
  title: { color: colors.onSurface, fontSize: 38, fontWeight: "900", marginTop: 8, letterSpacing: 1 },
  step: { color: colors.muted, fontSize: 12, letterSpacing: 3, fontWeight: "700", fontFamily: MONO, marginTop: 28, marginBottom: 14 },
  chipsWrap: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  chip: { borderWidth: 1.5, borderColor: colors.border, borderRadius: 999, paddingHorizontal: 16, paddingVertical: 11, backgroundColor: colors.surfaceSecondary },
  chipOn: { backgroundColor: colors.brandPrimary, borderColor: colors.brandPrimary },
  chipText: { color: colors.onSurface, fontSize: 14, fontWeight: "800" },
  chipTextOn: { color: colors.onBrandPrimary },
  memberBox: { maxHeight: 260, borderWidth: 1, borderColor: colors.border, borderRadius: 14, backgroundColor: colors.surfaceSecondary },
  memberRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16, paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: colors.divider },
  memberRowOn: { backgroundColor: colors.brandTertiary },
  memberText: { color: colors.onSurface, fontSize: 16, fontWeight: "700" },
  memberTextOn: { color: colors.brandPrimary },
  check: { color: colors.brandPrimary, fontSize: 18, fontWeight: "900" },
  who: { color: colors.brandSecondary, fontSize: 15, fontWeight: "800", marginBottom: 12 },
  input: { backgroundColor: colors.surfaceTertiary, borderWidth: 1, borderColor: colors.border, borderRadius: 12, paddingHorizontal: 16, paddingVertical: 15, color: colors.onSurface, fontSize: 16 },
  error: { color: colors.error, fontSize: 13, marginTop: 16 },
  primary: { marginTop: 24, backgroundColor: colors.brandPrimary, borderRadius: 16, paddingVertical: 17, alignItems: "center" },
  primaryText: { color: colors.onBrandPrimary, fontSize: 16, fontWeight: "900", letterSpacing: 2 },
}));
