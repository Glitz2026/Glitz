import { Linking, Text, View } from "react-native";

import { SITE_ORIGIN } from "@/src/lib/api";
import type { PlanTable, ZoneInfo } from "@/src/lib/floorplan";
import { makeStyles } from "@/src/theme";

type Props = {
  tables: PlanTable[];
  reserved: Record<string, string>;
  getTableInfo: (t: PlanTable) => ZoneInfo;
  activeZone: string | null;
  ready: boolean;
  onSelect: (t: PlanTable) => void;
  onFallback: () => void;
};

/** In the browser build the 3D map lives on another origin, so it can't talk to
 *  the app: offer it in a new tab and keep booking on the 2D plan. */
export function Plan3D({ onFallback }: Props) {
  const styles = useStyles();
  return (
    <View style={styles.box} testID="plan-3d">
      <Text style={styles.text}>{"Nell'app per telefono il club si esplora in 3D. Dal browser puoi aprire la mappa 3D del sito e prenotare dalla piantina 2D."}</Text>
      <Text style={styles.link} onPress={() => Linking.openURL(`${SITE_ORIGIN}/glitz-interattivo.html`)}>Apri la mappa 3D</Text>
      <Text style={styles.link} onPress={onFallback}>Usa la piantina 2D</Text>
    </View>
  );
}

const useStyles = makeStyles((colors) => ({
  box: { borderRadius: 18, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surfaceSecondary, padding: 20, gap: 12 },
  text: { color: colors.brandSecondary, fontSize: 14, lineHeight: 20 },
  link: { color: colors.brandPrimary, fontSize: 14, fontWeight: "800" },
}));
