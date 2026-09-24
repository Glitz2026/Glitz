import { Image } from "expo-image";
import { View } from "react-native";

import { makeStyles } from "@/src/theme";

/** Centered GLITZ wordmark, used at the top of the main screens. */
export function LogoHeader() {
  const styles = useStyles();
  return (
    <View style={styles.wrap} testID="logo-header">
      <Image
        source={require("../../assets/images/glitz-logo.png")}
        style={styles.logo}
        contentFit="contain"
      />
    </View>
  );
}

const useStyles = makeStyles(() => ({
  wrap: { alignItems: "center", justifyContent: "center", paddingBottom: 4 },
  logo: { width: 108, height: 34 },
}));
