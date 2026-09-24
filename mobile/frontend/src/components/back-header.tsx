import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";
import Svg, { Path } from "react-native-svg";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { MONO } from "@/src/lib/fonts";
import { makeStyles, useTheme } from "@/src/theme";

export function BackHeader({ title }: { title?: string }) {
  const styles = useStyles();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View style={[styles.row, { paddingTop: insets.top + 10 }]}>
      <Pressable testID="back-button" style={styles.btn} onPress={() => router.back()} hitSlop={10}>
        <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
          <Path d="M15 5l-7 7 7 7" stroke={colors.onSurface} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
        </Svg>
      </Pressable>
      {title ? <Text style={styles.title}>{title}</Text> : null}
    </View>
  );
}

const useStyles = makeStyles((colors) => ({
  row: { flexDirection: "row", alignItems: "center", gap: 10, paddingHorizontal: 16, paddingBottom: 8 },
  btn: {
    width: 40,
    height: 40,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.surfaceSecondary,
    borderWidth: 1,
    borderColor: colors.border,
  },
  title: { color: colors.onSurface, fontSize: 15, fontWeight: "800", letterSpacing: 2, fontFamily: MONO },
}));
