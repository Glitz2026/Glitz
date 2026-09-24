import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Linking, Platform, Pressable, Text, TextInput, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { BackHeader } from "@/src/components/back-header";
import { apiUpload, mediaUrl } from "@/src/lib/api";
import { MONO } from "@/src/lib/fonts";
import { useAuth } from "@/src/lib/auth-context";
import { makeStyles, useTheme } from "@/src/theme";

export default function Profile() {
  const styles = useStyles();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { user, updateProfile, logout } = useAuth();

  const [name, setName] = useState(user?.name ?? "");
  const [instagram, setInstagram] = useState(user?.instagram ?? "");
  const [saved, setSaved] = useState(false);
  const [busy, setBusy] = useState(false);

  const changePhoto = async () => {
    if (Platform.OS !== "web") {
      let perm = await ImagePicker.getMediaLibraryPermissionsAsync();
      if (perm.status !== "granted") perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (perm.status !== "granted") {
        if (!perm.canAskAgain) Linking.openSettings();
        return;
      }
    }
    const res = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ["images"], quality: 0.7 });
    if (!res.canceled && res.assets?.[0]) {
      setBusy(true);
      try {
        const up = await apiUpload("/api/upload", res.assets[0].uri);
        await updateProfile({ photo_url: up.url });
      } catch {
        // ignore
      }
      setBusy(false);
    }
  };

  const save = async () => {
    setBusy(true);
    setSaved(false);
    try {
      await updateProfile({ name: name.trim(), instagram: instagram.trim() || null });
      setSaved(true);
    } catch {
      // ignore
    }
    setBusy(false);
  };

  const doLogout = async () => {
    await logout();
    router.replace("/(auth)/welcome");
  };

  return (
    <View style={styles.root} testID="profile-screen">
      <BackHeader title="PROFILO" />
      <KeyboardAwareScrollView
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 24 }]}
        bottomOffset={24}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.top}>
          <Pressable testID="change-photo" style={styles.photo} onPress={changePhoto}>
            {user?.photo_url ? (
              <Image source={{ uri: mediaUrl(user.photo_url) }} style={styles.photoImg} contentFit="cover" />
            ) : (
              <Text style={styles.photoInitial}>{(user?.name?.[0] ?? "G").toUpperCase()}</Text>
            )}
            {busy ? (
              <View style={styles.photoOverlay}>
                <ActivityIndicator color={colors.onBrandPrimary} />
              </View>
            ) : null}
          </Pressable>
          <Text style={styles.email}>{user?.email ?? user?.provider}</Text>
          <Text style={styles.changeHint}>Tocca per cambiare foto</Text>
        </View>

        <Text style={styles.label}>NOME</Text>
        <TextInput testID="profile-name" value={name} onChangeText={setName} style={styles.input} placeholderTextColor={colors.muted} />
        <Text style={styles.label}>INSTAGRAM</Text>
        <TextInput testID="profile-instagram" value={instagram} onChangeText={setInstagram} placeholder="@iltuoprofilo" placeholderTextColor={colors.muted} style={styles.input} autoCapitalize="none" />

        {saved ? <Text style={styles.saved}>Profilo aggiornato.</Text> : null}

        <Pressable testID="save-profile" style={styles.primary} onPress={save} disabled={busy}>
          <Text style={styles.primaryText}>SALVA</Text>
        </Pressable>
        <Pressable testID="logout" style={styles.logout} onPress={doLogout}>
          <Text style={styles.logoutText}>ESCI</Text>
        </Pressable>
      </KeyboardAwareScrollView>
    </View>
  );
}

const useStyles = makeStyles((colors) => ({
  root: { flex: 1, backgroundColor: colors.surface },
  content: { paddingHorizontal: 24, paddingTop: 8 },
  top: { alignItems: "center", marginBottom: 12 },
  photo: {
    width: 110,
    height: 110,
    borderRadius: 999,
    backgroundColor: colors.brandTertiary,
    borderWidth: 1.5,
    borderColor: colors.borderStrong,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  photoImg: { width: "100%", height: "100%" },
  photoInitial: { color: colors.brandPrimary, fontSize: 44, fontWeight: "900" },
  photoOverlay: { ...({ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 } as const), alignItems: "center", justifyContent: "center", backgroundColor: "rgba(0,0,0,0.5)" },
  email: { color: colors.onSurface, fontSize: 15, fontWeight: "700", marginTop: 14 },
  changeHint: { color: colors.muted, fontSize: 12, marginTop: 4 },
  label: { color: colors.muted, fontSize: 12, letterSpacing: 3, fontWeight: "700", fontFamily: MONO, marginTop: 24, marginBottom: 10 },
  input: { backgroundColor: colors.surfaceTertiary, borderWidth: 1, borderColor: colors.border, borderRadius: 12, paddingHorizontal: 16, paddingVertical: 15, color: colors.onSurface, fontSize: 16 },
  saved: { color: colors.success, fontSize: 13, marginTop: 16 },
  primary: { marginTop: 28, backgroundColor: colors.brandPrimary, borderRadius: 16, paddingVertical: 16, alignItems: "center" },
  primaryText: { color: colors.onBrandPrimary, fontSize: 16, fontWeight: "900", letterSpacing: 2 },
  logout: { marginTop: 14, borderWidth: 1.5, borderColor: colors.border, borderRadius: 16, paddingVertical: 15, alignItems: "center" },
  logoutText: { color: colors.brandSecondary, fontSize: 15, fontWeight: "800", letterSpacing: 2 },
}));
