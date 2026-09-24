import { useEffect } from "react";
import { ViewStyle } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

type Props = {
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
  /** min/max opacity of the pulse */
  min?: number;
  max?: number;
  /** duration of one half cycle in ms */
  duration?: number;
  /** also scale between 1 and this value */
  scaleTo?: number;
};

/** A soft breathing pulse used across the stage for neon / A.I. presence. */
export function Pulse({ children, style, min = 0.55, max = 1, duration = 1100, scaleTo }: Props) {
  const p = useSharedValue(min);

  useEffect(() => {
    p.value = withRepeat(withTiming(max, { duration, easing: Easing.inOut(Easing.ease) }), -1, true);
  }, [p, max, duration]);

  const animatedStyle = useAnimatedStyle(() => {
    const t = (p.value - min) / (max - min || 1);
    return {
      opacity: p.value,
      transform: scaleTo ? [{ scale: 1 + t * (scaleTo - 1) }] : undefined,
    };
  });

  return <Animated.View style={[style, animatedStyle]}>{children}</Animated.View>;
}
