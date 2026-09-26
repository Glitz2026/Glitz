import { useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Pressable, Text, TextInput, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { BackHeader } from "@/src/components/back-header";
import { MONO } from "@/src/lib/fonts";
import { useAuth } from "@/src/lib/auth-context";
import { makeStyles, useTheme } from "@/src/theme";

export default function StaffLogin() {
  const styles = useStyles();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async () => {
    setError(null);
    setBusy(true);
    try {
      await login(email.trim(), password);
      router.replace("/staff");
    } catch (e: any) {
      setError(e?.data?.detail || "Credenziali non valide");
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
        <Text style={styles.sub}>Entra con l'account del tuo reparto.</Text>

        <Text style={styles.label}>EMAIL</Text>
        <TextInput
          testID="staff-email"
          value={email}
          onChangeText={setEmail}
          placeholder="nome@glitz.staff"
          placeholderTextColor={colors.muted}
          style={styles.input}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <Text style={styles.label}>PASSWORD</Text>
        <TextInput
          testID="staff-password"
          value={password}
          onChangeText={setPassword}
          placeholder="••••••"
          placeholderTextColor={colors.muted}
          style={styles.input}
          secureTextEntry
        />

        {error ? <Text style={styles.error} testID="staff-login-error">{error}</Text> : null}

        <Pressable testID="staff-login-submit" style={styles.primary} onPress={submit} disabled={busy}>
          {busy ? <ActivityIndicator color={colors.onBrandPrimary} /> : <Text style={styles.primaryText}>ENTRA</Text>}
        </Pressable>
      </KeyboardAwareScrollView>
    </View>
  );
}

const useStyles = makeStyles((colors) => ({
  root: { flex: 1, backgroundColor: colors.surface },
  content: { paddingHorizontal: 24, paddingTop: 8 },
  kicker: { color: colors.brandPrimary, fontSize: 12, letterSpacing: 5, fontWeight: "800", fontFamily: MONO },
  title: { color: colors.onSurface, fontSize: 38, fontWeight: "900", marginTop: 8, letterSpacing: 1 },
  sub: { color: colors.muted, fontSize: 14, marginTop: 8 },
  label: { color: colors.muted, fontSize: 12, letterSpacing: 3, fontWeight: "700", marginTop: 24, marginBottom: 10, fontFamily: MONO },
  input: { backgroundColor: colors.surfaceTertiary, borderWidth: 1, borderColor: colors.border, borderRadius: 12, paddingHorizontal: 16, paddingVertical: 15, color: colors.onSurface, fontSize: 16 },
  error: { color: colors.error, fontSize: 13, marginTop: 16 },
  primary: { marginTop: 28, backgroundColor: colors.brandPrimary, borderRadius: 16, paddingVertical: 17, alignItems: "center" },
  primaryText: { color: colors.onBrandPrimary, fontSize: 16, fontWeight: "900", letterSpacing: 2 },
}));
