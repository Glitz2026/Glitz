import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { MONO } from "@/src/lib/fonts";
import { apiPost } from "@/src/lib/api";
import { makeStyles, useTheme } from "@/src/theme";

export default function Phone() {
  const styles = useStyles();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  const sendCode = async () => {
    setMessage(null);
    try {
      await apiPost("/api/auth/phone/send", { phone_number: phone.trim() });
      setMessage("Codice inviato. Controlla gli SMS.");
    } catch (e: any) {
      setMessage(e?.data?.detail || "Login via telefono non ancora attivo.");
    }
  };

  return (
    <View style={styles.root} testID="phone-screen">
      <KeyboardAwareScrollView
        contentContainerStyle={[styles.content, { paddingTop: insets.top + 24, paddingBottom: insets.bottom + 40 }]}
        bottomOffset={24}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.kicker}>ACCESSO RAPIDO</Text>
        <Text style={styles.title}>Numero di telefono</Text>

        <View style={styles.badge}>
          <Text style={styles.badgeText}>IN ARRIVO</Text>
        </View>
        <Text style={styles.tag}>
          L'accesso con codice SMS sarà attivo a breve. Nel frattempo entra con email o Google.
        </Text>

        <Text style={styles.label}>NUMERO</Text>
        <TextInput
          testID="phone-input"
          value={phone}
          onChangeText={setPhone}
          placeholder="+39 333 1234567"
          placeholderTextColor={colors.muted}
          style={styles.input}
          keyboardType="phone-pad"
        />
        {message ? <Text style={styles.message} testID="phone-message">{message}</Text> : null}

        <Pressable testID="phone-send" style={styles.primary} onPress={sendCode}>
          <Text style={styles.primaryText}>INVIA CODICE</Text>
        </Pressable>
        <Pressable style={styles.ghost} onPress={() => router.replace("/(auth)/welcome")}>
          <Text style={styles.ghostText}>Torna indietro</Text>
        </Pressable>
      </KeyboardAwareScrollView>
    </View>
  );
}

const useStyles = makeStyles((colors) => ({
  root: { flex: 1, backgroundColor: colors.surface },
  content: { paddingHorizontal: 24 },
  kicker: { color: colors.brandPrimary, fontSize: 12, letterSpacing: 5, fontWeight: "800", fontFamily: MONO },
  title: { color: colors.onSurface, fontSize: 34, fontWeight: "900", marginTop: 8, letterSpacing: 1 },
  badge: { alignSelf: "flex-start", marginTop: 16, borderWidth: 1, borderColor: colors.borderStrong, borderRadius: 999, paddingHorizontal: 12, paddingVertical: 6 },
  badgeText: { color: colors.brandPrimary, fontSize: 11, letterSpacing: 3, fontWeight: "800", fontFamily: MONO },
  tag: { color: colors.brandSecondary, fontSize: 14, lineHeight: 21, marginTop: 12 },
  label: { color: colors.muted, fontSize: 12, letterSpacing: 3, fontWeight: "700", marginTop: 24, marginBottom: 10, fontFamily: MONO },
  input: { backgroundColor: colors.surfaceTertiary, borderWidth: 1, borderColor: colors.border, borderRadius: 12, paddingHorizontal: 16, paddingVertical: 15, color: colors.onSurface, fontSize: 16 },
  message: { color: colors.warning, fontSize: 13, marginTop: 16 },
  primary: { marginTop: 24, backgroundColor: colors.brandPrimary, borderRadius: 16, paddingVertical: 17, alignItems: "center" },
  primaryText: { color: colors.onBrandPrimary, fontSize: 16, fontWeight: "900", letterSpacing: 2 },
  ghost: { paddingVertical: 14, alignItems: "center" },
  ghostText: { color: colors.muted, fontSize: 14 },
}));
