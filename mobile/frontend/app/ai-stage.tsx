import { Redirect, useRouter } from "expo-router";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AIPresence } from "@/src/components/stage/ai-presence";
import { IdleView } from "@/src/components/stage/idle-view";
import { MessageView } from "@/src/components/stage/message-view";
import { NonPremere } from "@/src/components/stage/non-premere";
import { PowerView } from "@/src/components/stage/power-view";
import { ResultView } from "@/src/components/stage/result-view";
import { TakeoverView } from "@/src/components/stage/takeover-view";
import { VoteView } from "@/src/components/stage/vote-view";
import { MOODS } from "@/src/lib/constants";
import { MONO } from "@/src/lib/fonts";
import { useShow } from "@/src/lib/show-context";
import { makeStyles, useTheme } from "@/src/theme";

export default function Stage() {
  const styles = useStyles();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { participant, loadingParticipant, show } = useShow();

  if (loadingParticipant) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator color={colors.brandPrimary} size="large" />
      </View>
    );
  }
  if (!participant?.id) return <Redirect href="/ai-enter" />;

  const moodLabel = MOODS.find((m) => m.id === participant.mood)?.label ?? participant.mood;

  // Takeover takes over the whole screen.
  if (show?.phase === "takeover") {
    return (
      <View style={styles.root} testID="stage-screen">
        <TakeoverView />
      </View>
    );
  }

  const renderPhase = () => {
    if (!show) {
      return (
        <View style={styles.connecting} testID="stage-connecting">
          <ActivityIndicator color={colors.brandPrimary} />
          <Text style={styles.connectingText}>Connessione al Glitz…</Text>
        </View>
      );
    }
    switch (show.phase) {
      case "music_vote":
        return <VoteView />;
      case "vote_result":
        return <ResultView />;
      case "message_floor":
        return <MessageView />;
      case "power":
        return <PowerView />;
      case "idle":
      default:
        return <IdleView />;
    }
  };

  return (
    <View style={styles.root} testID="stage-screen">
      <View style={[styles.header, { paddingTop: insets.top + 14 }]}>
        <AIPresence line={show?.ai_line ?? "Ti chiamo io. Tu balla."} online={show?.online ?? 1} />
        <View style={styles.chipRow}>
          <View style={styles.profileChip}>
            <View style={styles.avatarBubble}>
              <Text style={styles.avatarGlyph}>{participant.avatar}</Text>
            </View>
            <View style={styles.profileText}>
              <Text style={styles.profileName} testID="profile-nickname">
                {participant.nickname}
              </Text>
              <Text style={styles.profileMood}>{moodLabel}</Text>
            </View>
          </View>
          <Pressable testID="exit-ai" style={styles.exitBtn} onPress={() => router.replace("/(tabs)/ai")}>
            <Text style={styles.exitText}>ESCI</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.center}>{renderPhase()}</View>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
        <NonPremere />
      </View>
    </View>
  );
}

const useStyles = makeStyles((colors) => ({
  root: { flex: 1, backgroundColor: colors.surface },
  loader: { flex: 1, backgroundColor: colors.surface, alignItems: "center", justifyContent: "center" },
  header: { paddingHorizontal: 20, paddingBottom: 14, gap: 14 },
  chipRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  exitBtn: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: colors.surfaceSecondary,
  },
  exitText: { color: colors.brandSecondary, fontSize: 12, fontWeight: "800", letterSpacing: 2 },
  profileChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    alignSelf: "flex-start",
    backgroundColor: colors.surfaceSecondary,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 999,
    paddingRight: 16,
    paddingLeft: 4,
    paddingVertical: 4,
  },
  avatarBubble: {
    width: 34,
    height: 34,
    borderRadius: 999,
    backgroundColor: colors.brandTertiary,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarGlyph: { color: colors.brandPrimary, fontSize: 18 },
  profileText: { flexDirection: "row", alignItems: "center", gap: 8 },
  profileName: { color: colors.onSurface, fontSize: 13, fontWeight: "800", letterSpacing: 1 },
  profileMood: { color: colors.muted, fontSize: 11, fontFamily: MONO, letterSpacing: 1 },
  center: { flex: 1, paddingHorizontal: 20, justifyContent: "center" },
  footer: { paddingHorizontal: 20, paddingTop: 8 },
  connecting: { alignItems: "center", gap: 12 },
  connectingText: { color: colors.muted, fontSize: 14, fontFamily: MONO },
}));
