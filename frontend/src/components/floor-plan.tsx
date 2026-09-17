import { Pressable, Text, View } from "react-native";

import { MONO } from "@/src/lib/fonts";
import { makeStyles, useTheme } from "@/src/theme";

export type Table = {
  id: string;
  name: string;
  area: string;
  seats: number;
  price: number;
  bottles: number;
  available: boolean;
  x: number;
  y: number;
};

type Props = {
  tables: Table[];
  selectedId: string | null;
  onSelect: (t: Table) => void;
};

/** Stylised interactive floor plan of the Glitz: tap a table to pick it. */
export function FloorPlan({ tables, selectedId, onSelect }: Props) {
  const styles = useStyles();
  const { colors } = useTheme();

  return (
    <View style={styles.wrap} testID="floor-plan">
      <View style={styles.stageBar}>
        <Text style={styles.stageText}>CONSOLLE · ARCO A LED</Text>
      </View>

      <View style={styles.plan}>
        {tables.map((t) => {
          const active = selectedId === t.id;
          return (
            <Pressable
              key={t.id}
              testID={`plan-table-${t.id}`}
              onPress={() => onSelect(t)}
              style={[
                styles.table,
                { left: `${t.x}%`, top: `${t.y}%` },
                !t.available && styles.tableOff,
                active && styles.tableActive,
              ]}
            >
              <Text style={[styles.tableName, active && styles.tableNameActive]} numberOfLines={1}>
                {t.name}
              </Text>
              <Text style={[styles.tableSeats, active && styles.tableNameActive]}>
                {t.available ? `${t.seats}p` : "OCC"}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.seaBar}>
        <Text style={styles.seaText}>MARE · ISOLA DI DINO</Text>
      </View>
    </View>
  );
}

const useStyles = makeStyles((colors) => ({
  wrap: {
    backgroundColor: colors.surfaceSecondary,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: "hidden",
  },
  stageBar: { backgroundColor: colors.brandTertiary, paddingVertical: 8, alignItems: "center" },
  stageText: { color: colors.brandPrimary, fontSize: 11, letterSpacing: 3, fontWeight: "800", fontFamily: MONO },
  plan: { height: 320, position: "relative" },
  table: {
    position: "absolute",
    width: 76,
    marginLeft: -38,
    marginTop: -24,
    height: 48,
    borderRadius: 12,
    backgroundColor: colors.surfaceTertiary,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  tableOff: { opacity: 0.4 },
  tableActive: {
    borderColor: colors.brandPrimary,
    backgroundColor: colors.brandPrimary,
    shadowColor: colors.brandPrimary,
    shadowOpacity: 0.8,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 0 },
  },
  tableName: { color: colors.onSurface, fontSize: 11, fontWeight: "800", letterSpacing: 0.5 },
  tableNameActive: { color: colors.onBrandPrimary },
  tableSeats: { color: colors.muted, fontSize: 10, fontFamily: MONO, marginTop: 2 },
  seaBar: { backgroundColor: colors.surfaceTertiary, paddingVertical: 8, alignItems: "center" },
  seaText: { color: colors.muted, fontSize: 11, letterSpacing: 3, fontWeight: "700", fontFamily: MONO },
}));
