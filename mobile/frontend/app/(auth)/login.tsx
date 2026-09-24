import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Pressable, Text, TextInput, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { MONO } from "@/src/lib/fonts";
import { useAuth } from "@/src/lib/auth-context";
import { makeStyles, useTheme } from "@/src/theme";

export default function Login() {
  const styles = useStyles();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { login, googleLogin } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async () => {
    setError(null);
    setBusy(true);
    try {
      await login(email.trim(), password);
      router.replace("/(tabs)");
    } catch (e: any) {
      setError(e?.data?.detail || "Credenziali non valide");
      setBusy(false);
    }
  };

  return (
    <View style={styles.root} testID="login-screen">
      <KeyboardAwareScrollView
        contentContainerStyle={[styles.content, { paddingTop: insets.top + 24, paddingBottom: insets.bottom + 40 }]}
        bottomOffset={24}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.kicker}>BENTORNATO</Text>
        <Text style={styles.title}>Accedi</Text>

        <Text style={styles.label}>EMAIL</Text>
        <TextInput
          testID="login-email"
          value={email}
          onChangeText={setEmail}
          placeholder="tu@email.it"
          placeholderTextColor={colors.muted}
          style={styles.input}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <Text style={styles.label}>PASSWORD</Text>
        <TextInput
          testID="login-password"
          value={password}
          onChangeText={setPassword}
          placeholder="••••••"
          placeholderTextColor={colors.muted}
          style={styles.input}
          secureTextEntry
        />

        {error ? <Text style={styles.error} testID="login-error">{error}</Text> : null}

        <Pressable testID="login-submit" style={styles.primary} onPress={submit} disabled={busy}>
          {busy ? <ActivityIndicator color={colors.onBrandPrimary} /> : <Text style={styles.primaryText}>ACCEDI</Text>}
        </Pressable>
        <Pressable testID="login-google" style={styles.ghost} onPress={() => googleLogin()}>
          <Text style={styles.ghostText}>Continua con Google</Text>
        </Pressable>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Non hai un account? </Text>
          <Link href="/(auth)/register" style={styles.footerLink}>
            Crea account
          </Link>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

const useStyles = makeStyles((colors) => ({
  root: { flex: 1, backgroundColor: colors.surface },
  content: { paddingHorizontal: 24 },
  kicker: { color: colors.brandPrimary, fontSize: 12, letterSpacing: 5, fontWeight: "800", fontFamily: MONO },
  title: { color: colors.onSurface, fontSize: 40, fontWeight: "900", marginTop: 8, letterSpacing: 1 },
  label: { color: colors.muted, fontSize: 12, letterSpacing: 3, fontWeight: "700", marginTop: 24, marginBottom: 10, fontFamily: MONO },
  input: {
    backgroundColor: colors.surfaceTertiary,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 15,
    color: colors.onSurface,
    fontSize: 16,
  },
  error: { color: colors.error, fontSize: 13, marginTop: 16 },
  primary: {
    marginTop: 28,
    backgroundColor: colors.brandPrimary,
    borderRadius: 16,
    paddingVertical: 17,
    alignItems: "center",
  },
  primaryText: { color: colors.onBrandPrimary, fontSize: 16, fontWeight: "900", letterSpacing: 2 },
  ghost: { paddingVertical: 14, alignItems: "center", marginTop: 4 },
  ghostText: { color: colors.onSurface, fontSize: 14, fontWeight: "600" },
  footer: { flexDirection: "row", justifyContent: "center", marginTop: 20 },
  footerText: { color: colors.muted, fontSize: 14 },
  footerLink: { color: colors.brandPrimary, fontSize: 14, fontWeight: "800" },
}));
