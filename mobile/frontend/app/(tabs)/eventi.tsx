import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { Pressable, RefreshControl, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useQueryClient } from "@tanstack/react-query";

import { IconArchive, IconSofa } from "@/src/components/icons";
import { Empty, Loading, PageIntro } from "@/src/components/ui";
import { MONO } from "@/src/lib/fonts";
import { siteImg, useSettings, useSiteEvents, type SiteEvent } from "@/src/lib/site";
import { makeStyles, useTheme } from "@/src/theme";

const MESI = ["GENNAIO", "FEBBRAIO", "MARZO", "APRILE", "MAGGIO", "GIUGNO", "LUGLIO", "AGOSTO", "SETTEMBRE", "OTTOBRE", "NOVEMBRE", "DICEMBRE"];
const GIORNI = ["DOM", "LUN", "MAR", "MER", "GIO", "VEN", "SAB"];

// Same poster wording as the site's Events page (artist name, then support acts).
function posterInfo(ev: SiteEvent) {
  const d = new Date(ev.date);
  return {
    day: String(d.getDate()).padStart(2, "0"),
    weekday: GIORNI[d.getDay()],
    month: MESI[d.getMonth()],
    artist: (ev.title || "").split("—")[0].trim().toUpperCase(),
    support: ev.lineup && ev.lineup.length > 1 ? ev.lineup.slice(1, 4).join(" · ") : (ev.title || "").split("—")[1]?.trim() ?? "",
  };
}

export default function Eventi() {
  const styles = useStyles();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const qc = useQueryClient();
  const settings = useSettings();
  const events = useSiteEvents();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await qc.invalidateQueries({ queryKey: ["site", "events"] });
    setRefreshing(false);
  }, [qc]);

  const list = events.data ?? [];
  const byMonth: { month: string; items: SiteEvent[] }[] = [];
  list.forEach((ev) => {
    const m = posterInfo(ev).month;
    const last = byMonth[byMonth.length - 1];
    if (last && last.month === m) last.items.push(ev);
    else byMonth.push({ month: m, items: [ev] });
  });

  return (
    <View style={styles.root} testID="eventi-screen">
      <ScrollView
        contentContainerStyle={[styles.content, { paddingTop: insets.top + 16, paddingBottom: insets.bottom + 24 }]}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.brandPrimary} />}
      >
        <PageIntro kicker={settings.data?.events_kicker || "Line-up 2027"} title={settings.data?.events_title || "Eventi 2027"} />
        <Pressable testID="past-events-link" style={styles.pastBtn} onPress={() => router.push("/eventi-passati")}>
          <IconArchive color={colors.brandSecondary} size={16} />
          <Text style={styles.pastText}>EVENTI PASSATI</Text>
        </Pressable>

        {events.isLoading ? <Loading /> : null}
        {!events.isLoading && list.length === 0 ? <Empty text={settings.data?.events_empty || "Nessun evento in calendario al momento. Torna presto."} /> : null}

        {byMonth.map((g) => (
          <View key={g.month}>
            <Text style={styles.month}>{g.month}</Text>
            {g.items.map((ev) => {
              const p = posterInfo(ev);
              return (
                <Pressable key={ev.id} testID={`events-card-${ev.id}`} style={styles.card} onPress={() => router.push(`/event/${ev.id}`)}>
                  <Image source={{ uri: siteImg(ev.poster_url) }} style={styles.fill} contentFit="cover" transition={250} />
                  <LinearGradient colors={["rgba(0,0,0,0.05)", "rgba(0,0,0,0.55)", "rgba(0,0,0,0.95)"]} style={styles.fill} />
                  <View style={styles.dateBox}>
                    <Text style={styles.dateWeek}>{p.weekday}</Text>
                    <Text style={styles.dateDay}>{p.day}</Text>
                  </View>
                  <View style={styles.cardBody}>
                    <Text style={styles.artist} numberOfLines={2}>{p.artist}</Text>
                    {p.support ? <Text style={styles.support} numberOfLines={1}>{p.support}</Text> : null}
                    {ev.floorplan_enabled ? (
                      <Pressable
                        style={styles.tableBtn}
                        onPress={() => router.push({ pathname: "/event/[id]", params: { id: ev.id, tavoli: "1" } })}
                      >
                        <IconSofa color={colors.onBrandPrimary} size={14} />
                        <Text style={styles.tableText}>PRENOTA TAVOLO</Text>
                      </Pressable>
                    ) : null}
                  </View>
                </Pressable>
              );
            })}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const useStyles = makeStyles((colors) => ({
  root: { flex: 1, backgroundColor: colors.surface },
  content: { paddingHorizontal: 20 },
  fill: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0 },
  pastBtn: { alignSelf: "flex-start", flexDirection: "row", alignItems: "center", gap: 8, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surfaceSecondary, borderRadius: 999, paddingHorizontal: 14, paddingVertical: 8, marginTop: 8 },
  pastText: { color: colors.brandSecondary, fontSize: 11, fontWeight: "800", letterSpacing: 1.5 },
  month: { color: colors.muted, fontSize: 12, letterSpacing: 4, fontWeight: "800", fontFamily: MONO, marginTop: 26, marginBottom: 12 },
  card: { height: 280, borderRadius: 22, overflow: "hidden", backgroundColor: colors.surfaceSecondary, borderWidth: 1, borderColor: colors.border, marginBottom: 14, justifyContent: "flex-end" },
  dateBox: { position: "absolute", top: 14, left: 14, backgroundColor: "rgba(0,0,0,0.72)", borderWidth: 1, borderColor: colors.borderStrong, borderRadius: 14, paddingHorizontal: 12, paddingVertical: 8, alignItems: "center" },
  dateWeek: { color: colors.brandPrimary, fontSize: 10, fontWeight: "900", letterSpacing: 1.5, fontFamily: MONO },
  dateDay: { color: colors.onSurface, fontSize: 24, fontWeight: "900", fontFamily: MONO },
  cardBody: { padding: 16 },
  artist: { color: colors.onSurface, fontSize: 26, fontWeight: "900" },
  support: { color: colors.brandSecondary, fontSize: 12, marginTop: 4, letterSpacing: 1 },
  tableBtn: { alignSelf: "flex-start", flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: colors.brandPrimary, borderRadius: 999, paddingHorizontal: 12, paddingVertical: 7, marginTop: 12 },
  tableText: { color: colors.onBrandPrimary, fontSize: 11, fontWeight: "900", letterSpacing: 1.2 },
}));
