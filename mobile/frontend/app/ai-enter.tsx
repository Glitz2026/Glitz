import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Redirect, useRouter } from "expo-router";
import * as Haptics from "expo-haptics";
import { useState } from "react";
import { ActivityIndicator, Platform, Pressable, Text, TextInput, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Pulse } from "@/src/components/pulse";
import { AVATARS, IMAGES, MOODS } from "@/src/lib/constants";
import { MONO } from "@/src/lib/fonts";
import { useShow } from "@/src/lib/show-context";
import { makeStyles, useTheme } from "@/src/theme";

export default function Onboarding() {
  const { participant, loadingParticipant, join } = useShow();
  const styles = useStyles();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const [nickname, setNickname] = useState("");
  const [avatar, setAvatar] = useState<string | null>(null);
  const [mood, setMood] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (loadingParticipant) {
    return (
      <View style={styles.loader} testID="onboarding-loading">
        <ActivityIndicator color={colors.brandPrimary} size="large" />
      </View>
    );
  }

  if (participant?.id) return <Redirect href="/ai-stage" />;

  const canSubmit = nickname.trim().length >= 2 && !!avatar && !!mood;

  const handleEnter = async () => {
    if (!canSubmit) {
      setError("Nickname, avatar e mood: scegli tutto.");
      return;
    }
    setError(null);
    setSubmitting(true);
    if (Platform.OS !== "web") Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    try {
      await join(nickname.trim(), avatar!, mood!);
      router.replace("/ai-stage");
    } catch {
      setError("Il club non risponde. Riprova.");
      setSubmitting(false);
    }
  };

  return (
    <View style={styles.root} testID="onboarding-screen">
      <Image source={{ uri: IMAGES.idle }} style={styles.bgImage} contentFit="cover" transition={400} />
      <LinearGradient
        colors={["rgba(0,0,0,0.65)", "rgba(0,0,0,0.92)", "#000000"]}
        style={styles.bgOverlay}
      />

      <KeyboardAwareScrollView
        style={styles.flex}
        contentContainerStyle={[
          styles.content,
          { paddingTop: insets.top + 28, paddingBottom: insets.bottom + 40 },
        ]}
        bottomOffset={24}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Pressable testID="ai-enter-back" style={styles.backLink} onPress={() => router.replace("/(tabs)/ai")}>
          <Text style={styles.backLinkText}>‹ Torna</Text>
        </Pressable>
        <View style={styles.brandRow}>
          <Pulse style={styles.brandDot} min={0.35} max={1} duration={900} />
          <Text style={styles.brandKicker}>A.I.</Text>
        </View>
        <Text style={styles.title} testID="onboarding-title">
          ATTENZIONE{"\n"}INSTABILE
        </Text>
        <Text style={styles.tagline}>
          Ti hanno sempre detto di mettere via il telefono. Al Glitz, stanotte, ti servirà per
          cambiare quello che succede.
        </Text>

        <Text style={styles.label}>IL TUO NICKNAME</Text>
        <TextInput
          testID="nickname-input"
          value={nickname}
          onChangeText={setNickname}
          placeholder="Come ti chiami stanotte?"
          placeholderTextColor={colors.muted}
          style={styles.input}
          maxLength={20}
          autoCapitalize="characters"
          returnKeyType="done"
        />

        <Text style={styles.label}>SCEGLI UN AVATAR</Text>
        <View style={styles.avatarGrid}>
          {AVATARS.map((glyph) => {
            const active = avatar === glyph;
            return (
              <Pressable
                key={glyph}
                testID={`avatar-${glyph}`}
                onPress={() => {
                  setAvatar(glyph);
                  if (Platform.OS !== "web") Haptics.selectionAsync();
                }}
                style={[styles.avatarCell, active && styles.avatarCellActive]}
              >
                <Text style={[styles.avatarGlyph, active && styles.avatarGlyphActive]}>{glyph}</Text>
              </Pressable>
            );
          })}
        </View>

        <Text style={styles.label}>QUAL È IL TUO MOOD</Text>
        <View style={styles.moodCol}>
          {MOODS.map((m) => {
            const active = mood === m.id;
            return (
              <Pressable
                key={m.id}
                testID={`mood-${m.id}`}
                onPress={() => {
                  setMood(m.id);
                  if (Platform.OS !== "web") Haptics.selectionAsync();
                }}
                style={[styles.moodCard, active && styles.moodCardActive]}
              >
                <Text style={[styles.moodLabel, active && styles.moodLabelActive]}>{m.label}</Text>
                <Text style={styles.moodDesc}>{m.desc}</Text>
              </Pressable>
            );
          })}
        </View>

        {error ? (
          <Text style={styles.error} testID="onboarding-error">
            {error}
          </Text>
        ) : null}

        <Pressable
          testID="enter-button"
          onPress={handleEnter}
          disabled={submitting}
          style={({ pressed }) => [
            styles.cta,
            !canSubmit && styles.ctaDim,
            pressed && styles.ctaPressed,
          ]}
        >
          {submitting ? (
            <ActivityIndicator color={colors.onBrandPrimary} />
          ) : (
            <Text style={styles.ctaText}>ENTRA NEL GLITZ</Text>
          )}
        </Pressable>
      </KeyboardAwareScrollView>
    </View>
  );
}

const useStyles = makeStyles((colors) => ({
  flex: { flex: 1 },
  root: { flex: 1, backgroundColor: colors.surface },
  loader: { flex: 1, backgroundColor: colors.surface, alignItems: "center", justifyContent: "center" },
  bgImage: { position: "absolute", top: 0, left: 0, right: 0, height: 360 },
  bgOverlay: { position: "absolute", top: 0, left: 0, right: 0, height: 360 },
  content: { paddingHorizontal: 24 },
  backLink: { alignSelf: "flex-start", paddingVertical: 8, marginBottom: 6 },
  backLinkText: { color: colors.brandSecondary, fontSize: 15, fontWeight: "700" },
  brandRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  brandDot: {
    width: 12,
    height: 12,
    borderRadius: 999,
    backgroundColor: colors.brandPrimary,
  },
  brandKicker: {
    color: colors.brandPrimary,
    fontSize: 16,
    fontWeight: "900",
    letterSpacing: 6,
    fontFamily: MONO,
  },
  title: {
    color: colors.onSurface,
    fontSize: 44,
    fontWeight: "900",
    letterSpacing: 1,
    marginTop: 12,
    lineHeight: 46,
  },
  tagline: { color: colors.brandSecondary, fontSize: 14, lineHeight: 21, marginTop: 16, marginBottom: 8 },
  label: {
    color: colors.muted,
    fontSize: 12,
    letterSpacing: 3,
    fontWeight: "700",
    marginTop: 28,
    marginBottom: 12,
    fontFamily: MONO,
  },
  input: {
    backgroundColor: colors.surfaceTertiary,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    color: colors.onSurface,
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 1,
  },
  avatarGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  avatarCell: {
    width: 58,
    height: 58,
    borderRadius: 14,
    backgroundColor: colors.surfaceTertiary,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarCellActive: {
    borderColor: colors.borderStrong,
    backgroundColor: colors.brandTertiary,
    shadowColor: colors.brandPrimary,
    shadowOpacity: 0.9,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 0 },
  },
  avatarGlyph: { color: colors.brandSecondary, fontSize: 26 },
  avatarGlyphActive: { color: colors.brandPrimary },
  moodCol: { gap: 12 },
  moodCard: {
    backgroundColor: colors.surfaceSecondary,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 18,
  },
  moodCardActive: {
    borderColor: colors.borderStrong,
    backgroundColor: colors.brandTertiary,
    shadowColor: colors.brandPrimary,
    shadowOpacity: 0.8,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 0 },
  },
  moodLabel: { color: colors.onSurface, fontSize: 22, fontWeight: "900", letterSpacing: 2 },
  moodLabelActive: { color: colors.brandPrimary },
  moodDesc: { color: colors.muted, fontSize: 13, marginTop: 4 },
  error: { color: colors.error, fontSize: 13, marginTop: 20, fontWeight: "600" },
  cta: {
    marginTop: 28,
    backgroundColor: colors.brandPrimary,
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: "center",
    shadowColor: colors.brandPrimary,
    shadowOpacity: 0.6,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 0 },
  },
  ctaDim: { opacity: 0.4 },
  ctaPressed: { opacity: 0.85 },
  ctaText: { color: colors.onBrandPrimary, fontSize: 18, fontWeight: "900", letterSpacing: 2 },
}));
