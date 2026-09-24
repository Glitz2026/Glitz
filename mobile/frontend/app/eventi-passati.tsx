import { Image } from "expo-image";
import * as WebBrowser from "expo-web-browser";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useQuery } from "@tanstack/react-query";

import { BackHeader } from "@/src/components/back-header";
import { Empty, Loading, PageIntro } from "@/src/components/ui";
import { MONO } from "@/src/lib/fonts";
import { formatItalianDate } from "@/src/lib/format";
import { siteGet, siteImg, useSettings } from "@/src/lib/site";
import { makeStyles } from "@/src/theme";

type Past = { id: string; title: string; date: string; poster_url: string; ticket_url?: string };

export default function EventiPassati() {
  const styles = useStyles();
  const insets = useSafeAreaInsets();
  const settings = useSettings();
  const past = useQuery<Past[]>({ queryKey: ["site", "past-events"], queryFn: () => siteGet("/past-events") });
  const s = settings.data;

  const byYear: Record<string, Past[]> = {};
  (past.data ?? []).forEach((e) => {
    const y = (e.date || "").slice(0, 4);
    (byYear[y] = byYear[y] || []).push(e);
  });
  const years = Object.keys(byYear).sort((a, b) => b.localeCompare(a));

  return (
    <View style={styles.root} testID="past-events-screen">
      <BackHeader title="ARCHIVIO" />
      <ScrollView contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 24 }]} showsVerticalScrollIndicator={false}>
        <PageIntro
          kicker={s?.past_kicker || "Archivio"}
          title={s?.past_title || "Eventi passati"}
          body={s?.past_description || "Tutte le serate che hanno segnato la storia del Glitz. Ospiti, DJ set, party series — dal 2025 in poi."}
        />
        {past.isLoading ? <Loading /> : null}
        {!past.isLoading && years.length === 0 ? <Empty text="Archivio in arrivo." /> : null}
        {years.map((y) => (
          <View key={y}>
            <View style={styles.yearRow}>
              <Text style={styles.year}>{y}</Text>
              <Text style={styles.count}>{byYear[y].length} serate</Text>
            </View>
            <View style={styles.grid}>
              {byYear[y].map((ev) => (
                <Pressable key={ev.id} style={styles.card} onPress={() => ev.ticket_url && WebBrowser.openBrowserAsync(ev.ticket_url)}>
                  <Image source={{ uri: siteImg(ev.poster_url) }} style={styles.img} contentFit="cover" />
                  <View style={styles.body}>
                    <Text style={styles.date}>{formatItalianDate(ev.date)}</Text>
                    <Text style={styles.title} numberOfLines={2}>{ev.title}</Text>
                  </View>
                </Pressable>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const useStyles = makeStyles((colors) => ({
  root: { flex: 1, backgroundColor: colors.surface },
  content: { paddingHorizontal: 20, paddingTop: 8 },
  yearRow: { flexDirection: "row", alignItems: "baseline", justifyContent: "space-between", marginTop: 26, marginBottom: 12 },
  year: { color: colors.onSurface, fontSize: 32, fontWeight: "900" },
  count: { color: colors.muted, fontSize: 12, fontFamily: MONO },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  card: { width: "47.5%", borderRadius: 16, overflow: "hidden", backgroundColor: colors.surfaceSecondary, borderWidth: 1, borderColor: colors.border },
  img: { width: "100%", aspectRatio: 0.8, backgroundColor: colors.surfaceTertiary },
  body: { padding: 10 },
  date: { color: colors.brandPrimary, fontSize: 10, fontFamily: MONO, fontWeight: "700" },
  title: { color: colors.onSurface, fontSize: 13, fontWeight: "800", marginTop: 4 },
}));
