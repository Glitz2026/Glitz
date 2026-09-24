import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Linking, Platform, Pressable, Text, TextInput, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { MONO } from "@/src/lib/fonts";
import { apiUpload } from "@/src/lib/api";
import { useAuth } from "@/src/lib/auth-context";
import { makeStyles, useTheme } from "@/src/theme";

export default function Register() {
  const styles = useStyles();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { register, updateProfile } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");
  const [instagram, setInstagram] = useState("");
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const pickPhoto = async () => {
    if (Platform.OS !== "web") {
      let perm = await ImagePicker.getMediaLibraryPermissionsAsync();
      if (perm.status !== "granted") perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (perm.status !== "granted") {
        if (!perm.canAskAgain) {
          setError("Permesso foto negato. Aprilo dalle Impostazioni.");
          Linking.openSettings();
        }
        return;
      }
    }
    const res = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ["images"], quality: 0.7 });
    if (!res.canceled && res.assets?.[0]) setPhotoUri(res.assets[0].uri);
  };

  const submit = async () => {
    if (name.trim().length < 2 || !email.includes("@") || password.length < 6) {
      setError("Nome, email valida e password (min 6) richiesti.");
      return;
    }
    setError(null);
    setBusy(true);
    try {
      await register({
        name: name.trim(),
        email: email.trim(),
        password,
        date_of_birth: dob.trim() || null,
        instagram: instagram.trim() || null,
      });
      if (photoUri) {
        try {
          const up = await apiUpload("/api/upload", photoUri);
          await updateProfile({ photo_url: up.url });
        } catch {
          // photo optional — ignore failures
        }
      }
      router.replace("/(tabs)");
    } catch (e: any) {
      setError(e?.data?.detail || "Registrazione non riuscita");
      setBusy(false);
    }
  };

  return (
    <View style={styles.root} testID="register-screen">
      <KeyboardAwareScrollView
        contentContainerStyle={[styles.content, { paddingTop: insets.top + 24, paddingBottom: insets.bottom + 40 }]}
        bottomOffset={24}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.kicker}>ENTRA NEL GLITZ</Text>
        <Text style={styles.title}>Crea account</Text>

        <Pressable testID="register-photo" style={styles.photo} onPress={pickPhoto}>
          {photoUri ? (
            <Image source={{ uri: photoUri }} style={styles.photoImg} contentFit="cover" />
          ) : (
            <Text style={styles.photoText}>+ Foto{"\n"}(facoltativa)</Text>
          )}
        </Pressable>

        <Text style={styles.label}>NOME</Text>
        <TextInput testID="register-name" value={name} onChangeText={setName} placeholder="Il tuo nome" placeholderTextColor={colors.muted} style={styles.input} />
        <Text style={styles.label}>EMAIL</Text>
        <TextInput testID="register-email" value={email} onChangeText={setEmail} placeholder="tu@email.it" placeholderTextColor={colors.muted} style={styles.input} autoCapitalize="none" keyboardType="email-address" />
        <Text style={styles.label}>PASSWORD</Text>
        <TextInput testID="register-password" value={password} onChangeText={setPassword} placeholder="min 6 caratteri" placeholderTextColor={colors.muted} style={styles.input} secureTextEntry />
        <Text style={styles.label}>DATA DI NASCITA (facoltativa)</Text>
        <TextInput testID="register-dob" value={dob} onChangeText={setDob} placeholder="GG/MM/AAAA" placeholderTextColor={colors.muted} style={styles.input} />
        <Text style={styles.label}>INSTAGRAM (facoltativo)</Text>
        <TextInput testID="register-instagram" value={instagram} onChangeText={setInstagram} placeholder="@iltuoprofilo" placeholderTextColor={colors.muted} style={styles.input} autoCapitalize="none" />

        {error ? <Text style={styles.error} testID="register-error">{error}</Text> : null}

        <Pressable testID="register-submit" style={styles.primary} onPress={submit} disabled={busy}>
          {busy ? <ActivityIndicator color={colors.onBrandPrimary} /> : <Text style={styles.primaryText}>CREA ACCOUNT</Text>}
        </Pressable>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Hai già un account? </Text>
          <Link href="/(auth)/login" style={styles.footerLink}>Accedi</Link>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

const useStyles = makeStyles((colors) => ({
  root: { flex: 1, backgroundColor: colors.surface },
  content: { paddingHorizontal: 24 },
  kicker: { color: colors.brandPrimary, fontSize: 12, letterSpacing: 5, fontWeight: "800", fontFamily: MONO },
  title: { color: colors.onSurface, fontSize: 38, fontWeight: "900", marginTop: 8, letterSpacing: 1 },
  photo: {
    width: 96,
    height: 96,
    borderRadius: 999,
    backgroundColor: colors.surfaceTertiary,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    overflow: "hidden",
  },
  photoImg: { width: "100%", height: "100%" },
  photoText: { color: colors.muted, fontSize: 12, textAlign: "center", fontFamily: MONO },
  label: { color: colors.muted, fontSize: 12, letterSpacing: 3, fontWeight: "700", marginTop: 20, marginBottom: 10, fontFamily: MONO },
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
  primary: { marginTop: 28, backgroundColor: colors.brandPrimary, borderRadius: 16, paddingVertical: 17, alignItems: "center" },
  primaryText: { color: colors.onBrandPrimary, fontSize: 16, fontWeight: "900", letterSpacing: 2 },
  footer: { flexDirection: "row", justifyContent: "center", marginTop: 20 },
  footerText: { color: colors.muted, fontSize: 14 },
  footerLink: { color: colors.brandPrimary, fontSize: 14, fontWeight: "800" },
}));
