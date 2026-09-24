import * as Haptics from "expo-haptics";
import { useState } from "react";
import { Platform, Pressable, Text, View } from "react-native";

import { makeStyles } from "@/src/theme";
import { useShow } from "@/src/lib/show-context";

/** The mysterious, always-present "NON PREMERE" button. */
export function NonPremere() {
  const styles = useStyles();
  const { pressButton, show } = useShow();
  const [busy, setBusy] = useState(false);

  const disabled = show?.phase === "takeover";

  const handlePress = async () => {
    if (disabled || busy) return;
    setBusy(true);
    if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    await pressButton();
    setBusy(false);
  };

  return (
    <View style={styles.wrap} pointerEvents="box-none">
      <Pressable
        testID="non-premere-button"
        onPress={handlePress}
        disabled={disabled}
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
          disabled && styles.buttonDisabled,
        ]}
      >
        <Text style={styles.text}>NON PREMERE</Text>
      </Pressable>
    </View>
  );
}

const useStyles = makeStyles((colors) => ({
  wrap: { alignItems: "center" },
  button: {
    paddingHorizontal: 26,
    paddingVertical: 14,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: colors.brandSecondary,
    backgroundColor: "#0A0A0A",
    flexDirection: "row",
    alignItems: "center",
    shadowColor: colors.brandSecondary,
    shadowOpacity: 0.5,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 0 },
  },
  buttonPressed: {
    backgroundColor: colors.brandTertiary,
    borderColor: colors.brandPrimary,
    transform: [{ scale: 0.96 }],
  },
  buttonDisabled: { opacity: 0.3 },
  text: {
    color: colors.brandSecondary,
    fontSize: 15,
    fontWeight: "900",
    letterSpacing: 3,
  },
}));
