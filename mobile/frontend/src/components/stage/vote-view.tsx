import * as Haptics from "expo-haptics";
import { useEffect } from "react";
import { Platform, Pressable, Text, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

import { MONO } from "@/src/lib/fonts";
import { useRemaining, useShow, type VoteOption } from "@/src/lib/show-context";
import { makeStyles, useTheme } from "@/src/theme";

function VoteBar({
  option,
  total,
  selected,
  locked,
  onPress,
}: {
  option: VoteOption;
  total: number;
  selected: boolean;
  locked: boolean;
  onPress: () => void;
}) {
  const styles = useStyles();
  const pct = total > 0 ? (option.votes / total) * 100 : 0;
  const w = useSharedValue(0);

  useEffect(() => {
    w.value = withTiming(pct, { duration: 450 });
  }, [pct, w]);

  const fillStyle = useAnimatedStyle(() => ({ width: `${w.value}%` }));

  return (
    <Pressable
      testID={`vote-${option.id}`}
      onPress={onPress}
      disabled={locked}
      style={({ pressed }) => [styles.bar, selected && styles.barSelected, pressed && styles.barPressed]}
    >
      <Animated.View style={[styles.fill, selected && styles.fillSelected, fillStyle]} />
      <View style={styles.barContent}>
        <View style={styles.barLeft}>
          <Text style={styles.barLabel}>{option.label}</Text>
          <Text style={styles.barDesc}>{option.desc}</Text>
        </View>
        <Text style={styles.barVotes} testID={`vote-count-${option.id}`}>
          {option.votes}
        </Text>
      </View>
    </Pressable>
  );
}

export function VoteView() {
  const styles = useStyles();
  const { colors } = useTheme();
  const { show, myVote, castVote } = useShow();
  const remaining = useRemaining(show);
  const secs = Math.ceil(remaining / 1000);

  if (!show) return null;
  const locked = !!myVote;

  const handleVote = (id: string) => {
    if (locked) return;
    if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    castVote(id);
  };

  return (
    <View style={styles.wrap} testID="vote-view">
      <Text style={styles.kicker}>LA PISTA DECIDE</Text>
      <Text style={[styles.timer, secs <= 5 && { color: colors.brandPrimary }]} testID="vote-timer">
        {String(Math.max(0, secs)).padStart(2, "0")}
      </Text>
      <View style={styles.bars}>
        {show.vote.options.map((o) => (
          <VoteBar
            key={o.id}
            option={o}
            total={show.vote.total}
            selected={myVote === o.id}
            locked={locked}
            onPress={() => handleVote(o.id)}
          />
        ))}
      </View>
      <Text style={styles.hint}>
        {locked ? "Voto registrato. Guarda la pista decidere." : "Tocca il tuo scenario."}
      </Text>
    </View>
  );
}

const useStyles = makeStyles((colors) => ({
  wrap: { gap: 14, alignItems: "center" },
  kicker: { color: colors.muted, fontSize: 12, letterSpacing: 4, fontWeight: "700", fontFamily: MONO },
  timer: {
    color: colors.onSurface,
    fontSize: 72,
    fontWeight: "900",
    fontFamily: MONO,
    letterSpacing: 2,
    lineHeight: 78,
  },
  bars: { width: "100%", gap: 12, marginTop: 4 },
  bar: {
    height: 86,
    borderRadius: 16,
    backgroundColor: colors.surfaceSecondary,
    borderWidth: 1.5,
    borderColor: colors.border,
    overflow: "hidden",
    justifyContent: "center",
  },
  barSelected: { borderColor: colors.borderStrong },
  barPressed: { opacity: 0.9 },
  fill: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: colors.brandTertiary,
  },
  fillSelected: { backgroundColor: colors.brandPrimary },
  barContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
  },
  barLeft: { flex: 1, paddingRight: 12 },
  barLabel: { color: colors.onSurface, fontSize: 26, fontWeight: "900", letterSpacing: 2 },
  barDesc: { color: colors.brandSecondary, fontSize: 12, marginTop: 2 },
  barVotes: { color: colors.onSurface, fontSize: 30, fontWeight: "900", fontFamily: MONO },
  hint: { color: colors.muted, fontSize: 13, marginTop: 6 },
}));
