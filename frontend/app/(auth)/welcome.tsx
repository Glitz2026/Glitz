import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Pulse } from "@/src/components/pulse";
import { IMAGES } from "@/src/lib/constants";
import { MONO } from "@/src/lib/fonts";
import { useAuth } from "@/src/lib/auth-context";
import { makeStyles } from "@/src/theme";

export default function Welcome() {
  const styles = useStyles();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { googleLogin } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const handleGoogle = async () => {
    setError(null);
    try {
      await googleLogin();
    } catch {
      setError("Accesso Google non riuscito. Riprova.");
    }
  };

  return (
    <View style={styles.root} testID="welcome-screen">
      <Image source={{ uri: IMAGES.idle }} style={styles.bg} contentFit="cover" transition={400} />
      <LinearGradient colors={["rgba(0,0,0,0.5)", "rgba(0,0,0,0.9)", "#000000"]} style={styles.bg} />

      <View style={[styles.content, { paddingTop: insets.top + 40, paddingBottom: insets.bottom + 28 }]}>
        <View style={styles.brandRow}>
          <Pulse style={styles.dot} min={0.35} max={1} duration={900} />
          <Image
            source={require("../../assets/images/glitz-logo.png")}
            style={styles.logo}
            contentFit="contain"
          />
        </View>
        <Text style={styles.title}>A.I.{"\n"}ATTENZIONE{"\n"}INSTABILE</Text>
        <Text style={styles.tag}>
          La tua serata al Glitz, dall'ingresso al ritorno a casa. E quando parte A.I., il telefono
          diventa il telecomando della notte.
        </Text>

        <View style={styles.actions}>
          <Pressable testID="go-register" style={styles.primary} onPress={() => router.push("/(auth)/register")}>
            <Text style={styles.primaryText}>CREA ACCOUNT</Text>
          </Pressable>
          <Pressable testID="go-login" style={styles.secondary} onPress={() => router.push("/(auth)/login")}>
            <Text style={styles.secondaryText}>ACCEDI</Text>
          </Pressable>
          <Pressable testID="google-login" style={styles.ghost} onPress={handleGoogle}>
            <Text style={styles.ghostText}>Continua con Google</Text>
          </Pressable>
          <Pressable testID="go-phone" style={styles.ghost} onPress={() => router.push("/(auth)/phone")}>
            <Text style={styles.ghostMuted}>Entra con il numero di telefono</Text>
          </Pressable>
        </View>
        {error ? <Text style={styles.error}>{error}</Text> : null}
      </View>
    </View>
  );
}

const useStyles = makeStyles((colors) => ({
  root: { flex: 1, backgroundColor: colors.surface },
  bg: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0 },
  content: { flex: 1, paddingHorizontal: 24, justifyContent: "flex-end" },
  brandRow: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 8 },
  dot: { width: 10, height: 10, borderRadius: 999, backgroundColor: colors.brandPrimary },
  logo: { width: 120, height: 40 },
  kicker: { color: colors.brandSecondary, fontSize: 14, letterSpacing: 6, fontWeight: "800", fontFamily: MONO },
  title: { color: colors.onSurface, fontSize: 46, fontWeight: "900", lineHeight: 48, letterSpacing: 1 },
  tag: { color: colors.brandSecondary, fontSize: 14, lineHeight: 21, marginTop: 16, marginBottom: 28 },
  actions: { gap: 12 },
  primary: {
    backgroundColor: colors.brandPrimary,
    borderRadius: 16,
    paddingVertical: 17,
    alignItems: "center",
    shadowColor: colors.brandPrimary,
    shadowOpacity: 0.5,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 0 },
  },
  primaryText: { color: colors.onBrandPrimary, fontSize: 16, fontWeight: "900", letterSpacing: 2 },
  secondary: {
    borderWidth: 1.5,
    borderColor: colors.borderStrong,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
  },
  secondaryText: { color: colors.onSurface, fontSize: 16, fontWeight: "800", letterSpacing: 2 },
  ghost: { paddingVertical: 10, alignItems: "center" },
  ghostText: { color: colors.onSurface, fontSize: 14, fontWeight: "600" },
  ghostMuted: { color: colors.muted, fontSize: 13 },
  error: { color: colors.error, fontSize: 13, marginTop: 12, textAlign: "center" },
}));
