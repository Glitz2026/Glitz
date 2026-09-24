import { useMemo, useState } from "react";
import { Modal, Pressable, ScrollView, Text, View, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { BookingSheet } from "@/src/components/booking-sheet";
import { GlitzPlan } from "@/src/components/glitz-plan";
import { IconClose, IconExpand } from "@/src/components/icons";
import { Plan3D } from "@/src/components/plan-3d";
import { Chip } from "@/src/components/ui";
import { ZONE_CARD_ORDER, resolvePlan, type PlanTable } from "@/src/lib/floorplan";
import { MONO } from "@/src/lib/fonts";
import { siteImg, useSettings } from "@/src/lib/site";
import { makeStyles, useTheme } from "@/src/theme";

type Props = {
  eventId: string;
  eventTitle: string;
  reserved: Record<string, string>;
  customImageUrl?: string;
};

/** "Scegli il tuo tavolo": 3D/2D piantina, zone cards with prices and bottles, booking sheet. */
export function TablePicker({ eventId, eventTitle, reserved, customImageUrl }: Props) {
  const styles = useStyles();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const settings = useSettings();
  const plan = useMemo(() => resolvePlan(settings.data), [settings.data]);

  const [view, setView] = useState<"2d" | "3d">("2d");
  const [activeZone, setActiveZone] = useState<string | null>(null);
  const [selected, setSelected] = useState<PlanTable | null>(null);
  const [fullscreen, setFullscreen] = useState(false);

  const planWidth = Math.min(width, 720) - 40;
  const imageUri = customImageUrl ? siteImg(customImageUrl) : undefined;
  const toggleZone = (z: string) => setActiveZone((cur) => (cur === z ? null : z));
  const pick = (t: PlanTable) => {
    setFullscreen(false);
    setSelected(t);
  };
  const selectedInfo = selected ? plan.getTableInfo(selected) : null;

  return (
    <View testID="table-picker">
      <View style={styles.toggle}>
        <Chip label="PIANTINA 2D" active={view === "2d"} onPress={() => setView("2d")} testID="plan-2d" />
        <Chip label="CLUB IN 3D" active={view === "3d"} onPress={() => setView("3d")} testID="plan-3d-btn" />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.zones}>
        {ZONE_CARD_ORDER.map((zid) => {
          const z = plan.getZone(zid);
          const active = activeZone === zid;
          return (
            <Pressable
              key={zid}
              testID={`zone-card-${zid}`}
              onPress={() => toggleZone(zid)}
              style={[styles.zoneCard, { borderLeftColor: z.color }, active && { borderColor: z.color, backgroundColor: colors.surfaceTertiary }]}
            >
              <View style={styles.zoneTop}>
                <Text style={styles.zoneName}>{z.label}</Text>
                <View style={[styles.zoneDot, { backgroundColor: z.color }]} />
              </View>
              {z.price_from ? (
                <Text style={styles.zonePrice}>
                  Da {z.price_from}
                  {z.min_spend ? <Text style={styles.zoneMuted}> · {z.min_spend}</Text> : null}
                </Text>
              ) : null}
              {z.bottles ? <Text style={styles.zoneLine} numberOfLines={2}>{z.bottles}</Text> : null}
              {z.bottle_menu?.length ? (
                <View style={styles.bottleList}>
                  {z.bottle_menu.slice(0, 4).map((b, i) => (
                    <View key={i} style={styles.bottleRow}>
                      <Text style={styles.zoneMuted} numberOfLines={1}>{b.name}</Text>
                      <Text style={styles.bottlePrice}>{b.price}</Text>
                    </View>
                  ))}
                </View>
              ) : null}
              <Text style={[styles.zoneState, { color: z.color, opacity: active ? 1 : 0.5 }]}>{active ? "ZONA EVIDENZIATA" : "TOCCA PER EVIDENZIARE"}</Text>
            </Pressable>
          );
        })}
      </ScrollView>

      {view === "3d" ? (
        <Plan3D
          tables={plan.tables}
          reserved={reserved}
          getTableInfo={plan.getTableInfo}
          activeZone={activeZone}
          ready={!!settings.data}
          onSelect={pick}
          onFallback={() => setView("2d")}
        />
      ) : (
        <>
          <View style={styles.legend}>
            <View style={styles.legendItem}>
              <View style={styles.legendBooked} />
              <Text style={styles.legendText}>PRENOTATO</Text>
            </View>
            <Pressable style={styles.fsBtn} onPress={() => setFullscreen(true)} testID="plan-fullscreen">
              <IconExpand color={colors.onBrandPrimary} size={16} />
              <Text style={styles.fsText}>SCHERMO INTERO</Text>
            </Pressable>
          </View>
          <View style={styles.planWrap}>
            <GlitzPlan
              width={planWidth}
              tables={plan.tables}
              anchors={plan.anchors}
              getZone={plan.getZone}
              reserved={reserved}
              activeZone={activeZone}
              selectedId={selected?.id}
              imageUri={imageUri}
              onZone={toggleZone}
              onSelect={pick}
            />
          </View>
          <Text style={styles.hint}>Tocca un tavolo libero per inviare la richiesta. Prezzi e minimi sono confermati dallo staff.</Text>
        </>
      )}

      <Modal visible={fullscreen} animationType="fade" onRequestClose={() => setFullscreen(false)}>
        <View style={[styles.fs, { paddingTop: insets.top }]}>
          <View style={styles.fsHead}>
            <View>
              <Text style={styles.fsKicker}>PIANTINA A SCHERMO INTERO</Text>
              <Text style={styles.fsTitle}>SCEGLI IL TUO TAVOLO</Text>
            </View>
            <Pressable style={styles.fsClose} onPress={() => setFullscreen(false)} testID="plan-fullscreen-close">
              <IconClose color={colors.onSurface} size={20} />
            </Pressable>
          </View>
          <ScrollView maximumZoomScale={3} minimumZoomScale={1} contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}>
            <ScrollView horizontal maximumZoomScale={3} minimumZoomScale={1}>
              <GlitzPlan
                width={width * 1.8}
                tables={plan.tables}
                anchors={plan.anchors}
                getZone={plan.getZone}
                reserved={reserved}
                activeZone={activeZone}
                selectedId={selected?.id}
                imageUri={imageUri}
                onZone={toggleZone}
                onSelect={pick}
                large
              />
            </ScrollView>
            <Text style={styles.hint}>Scorri in orizzontale e verticale, poi tocca il tuo tavolo.</Text>
          </ScrollView>
        </View>
      </Modal>

      <BookingSheet
        open={!!selected}
        onClose={() => setSelected(null)}
        eventId={eventId}
        eventTitle={eventTitle}
        tableNumber={selected?.id}
        zone={selectedInfo?.label}
        zoneInfo={selectedInfo}
      />
    </View>
  );
}

const useStyles = makeStyles((colors) => ({
  toggle: { flexDirection: "row", gap: 10, marginBottom: 14 },
  zones: { gap: 12, paddingBottom: 14, paddingRight: 8 },
  zoneCard: { width: 200, borderRadius: 14, borderWidth: 1, borderColor: colors.border, borderLeftWidth: 4, backgroundColor: colors.surfaceSecondary, padding: 14, gap: 6 },
  zoneTop: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  zoneName: { color: colors.onSurface, fontSize: 14, fontWeight: "900", textTransform: "uppercase", flex: 1 },
  zoneDot: { width: 10, height: 10, borderRadius: 3 },
  zonePrice: { color: colors.onSurface, fontSize: 13, fontWeight: "800" },
  zoneLine: { color: colors.brandSecondary, fontSize: 12 },
  zoneMuted: { color: colors.muted, fontSize: 11, flexShrink: 1 },
  bottleList: { borderTopWidth: 1, borderTopColor: colors.divider, paddingTop: 6, gap: 2 },
  bottleRow: { flexDirection: "row", justifyContent: "space-between", gap: 6 },
  bottlePrice: { color: colors.brandSecondary, fontSize: 11, fontWeight: "800" },
  zoneState: { fontSize: 9, fontWeight: "900", letterSpacing: 1.5, marginTop: 2 },
  legend: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 10 },
  legendItem: { flexDirection: "row", alignItems: "center", gap: 8 },
  legendBooked: { width: 12, height: 12, borderRadius: 3, borderWidth: 1.5, borderColor: "#E10600", backgroundColor: "rgba(225,6,0,0.35)" },
  legendText: { color: colors.muted, fontSize: 11, letterSpacing: 2, fontFamily: MONO },
  fsBtn: { flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: colors.brandPrimary, borderRadius: 999, paddingHorizontal: 14, paddingVertical: 8 },
  fsText: { color: colors.onBrandPrimary, fontSize: 11, fontWeight: "900", letterSpacing: 1.5 },
  planWrap: { borderRadius: 18, overflow: "hidden", borderWidth: 1, borderColor: colors.border, alignSelf: "center" },
  hint: { color: colors.muted, fontSize: 12, textAlign: "center", marginTop: 12, paddingHorizontal: 16, lineHeight: 17 },
  fs: { flex: 1, backgroundColor: "#0a0a0a" },
  fsHead: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: colors.divider },
  fsKicker: { color: colors.brandPrimary, fontSize: 10, letterSpacing: 3, fontWeight: "800", fontFamily: MONO },
  fsTitle: { color: colors.onSurface, fontSize: 15, fontWeight: "900", marginTop: 2 },
  fsClose: { width: 40, height: 40, borderRadius: 999, backgroundColor: colors.surfaceTertiary, alignItems: "center", justifyContent: "center" },
}));
