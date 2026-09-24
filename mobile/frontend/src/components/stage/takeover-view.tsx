import { Image } from "expo-image";
import * as Haptics from "expo-haptics";
import { useEffect } from "react";
import { Platform, Text, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

import { IMAGES } from "@/src/lib/constants";
import { MONO } from "@/src/lib/fonts";
import { makeStyles } from "@/src/theme";

/** Glitch takeover — the stage "breaks" after too many presses. */
export function TakeoverView() {
  const styles = useStyles();
  const flash = useSharedValue(0);
  const shift = useSharedValue(0);

  useEffect(() => {
    flash.value = withRepeat(withTiming(1, { duration: 140, easing: Easing.linear }), -1, true);
    shift.value = withRepeat(
      withSequence(
        withTiming(-6, { duration: 90 }),
        withTiming(6, { duration: 90 }),
        withTiming(0, { duration: 90 }),
      ),
      -1,
      false,
    );
    let count = 0;
    const id = setInterval(() => {
      if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      count += 1;
      if (count > 12) clearInterval(id);
    }, 300);
    return () => clearInterval(id);
  }, [flash, shift]);

  const redStyle = useAnimatedStyle(() => ({ opacity: flash.value }));
  const textStyle = useAnimatedStyle(() => ({ transform: [{ translateX: shift.value }] }));

  return (
    <View style={styles.wrap} testID="takeover-view">
      <Image source={{ uri: IMAGES.glitch }} style={styles.bg} contentFit="cover" />
      <Animated.View style={[styles.redFlash, redStyle]} />
      <View style={styles.center}>
        <Text style={styles.kicker}>SYSTEM FAILURE</Text>
        <Animated.Text style={[styles.big, textStyle]}>AVETE{"\n"}ROTTO{"\n"}TUTTO</Animated.Text>
        <Text style={styles.sub}>A.I. ha perso il controllo. Colpa vostra.</Text>
      </View>
    </View>
  );
}

const useStyles = makeStyles((colors) => ({
  wrap: { flex: 1, alignItems: "center", justifyContent: "center", overflow: "hidden" },
  bg: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0 },
  redFlash: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.surfaceInverse,
  },
  center: { alignItems: "center", paddingHorizontal: 20 },
  kicker: {
    color: colors.onSurface,
    fontSize: 14,
    letterSpacing: 6,
    fontWeight: "800",
    fontFamily: MONO,
    marginBottom: 16,
  },
  big: {
    color: colors.onSurface,
    fontSize: 56,
    fontWeight: "900",
    textAlign: "center",
    letterSpacing: 3,
    lineHeight: 58,
  },
  sub: { color: colors.onSurface, fontSize: 14, marginTop: 20, fontFamily: MONO },
}));
