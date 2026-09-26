import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { BackHeader } from "@/src/components/back-header";
import { BookingSheet } from "@/src/components/booking-sheet";
import { IconChevron } from "@/src/components/icons";
import { Empty, GhostButton, Loading, PageIntro, SectionTitle } from "@/src/components/ui";
import { MONO } from "@/src/lib/fonts";
import { formatEventDate } from "@/src/lib/format";
import { siteImg, useSiteEvents } from "@/src/lib/site";
import { makeStyles, useTheme } from "@/src/theme";

/** Entry point for table bookings: pick the night, then the table on its piantina. */
export default function Prenota() {
  const styles = useStyles();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const events = useSiteEvents();
  const [genericOpen, setGenericOpen] = useState(false);
  const list = events.data ?? [];

  return (
    <View style={styles.root} testID="prenota-screen">
      <BackHeader title="TAVOLI" />
      <ScrollView contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 24 }]} showsVerticalScrollIndicator={false}>
        <PageIntro kicker="Privé e salottini" title="Prenota un tavolo" body="Scegli la serata e poi il tuo tavolo sulla piantina ufficiale: Back the Stage, Riva Deck, Glitz Bar, Seat View e prato." />
        <SectionTitle title="SCEGLI LA SERATA" />
        {events.isLoading ? <Loading /> : null}
        {!events.isLoading && list.length === 0 ? <Empty text="Nessuna serata in calendario." /> : null}
        {list.map((ev) => (
          <Pressable
            key={ev.id}
            testID={`prenota-event-${ev.id}`}
            style={styles.row}
            onPress={() => router.push({ pathname: "/event/[id]", params: { id: ev.id, tavoli: "1" } })}
          >
            <Image source={{ uri: siteImg(ev.poster_url) }} style={styles.thumb} contentFit="cover" />
            <View style={{ flex: 1 }}>
              <Text style={styles.date}>{formatEventDate(ev.date)}</Text>
              <Text style={styles.title} numberOfLines={2}>{ev.title}</Text>
              <Text style={[styles.state, { color: ev.floorplan_enabled ? colors.success : colors.muted }]}>
                {ev.floorplan_enabled ? "PIANTINA APERTA" : "SU RICHIESTA"}
              </Text>
            </View>
            <IconChevron color={colors.muted} />
          </Pressable>
        ))}
        <GhostButton label="RICHIESTA SENZA SERATA" onPress={() => setGenericOpen(true)} style={{ marginTop: 16 }} />
      </ScrollView>
      <BookingSheet open={genericOpen} onClose={() => setGenericOpen(false)} />
    </View>
  );
}

const useStyles = makeStyles((colors) => ({
  root: { flex: 1, backgroundColor: colors.surface },
  content: { paddingHorizontal: 20, paddingTop: 8 },
  row: { flexDirection: "row", alignItems: "center", gap: 12, backgroundColor: colors.surfaceSecondary, borderRadius: 16, borderWidth: 1, borderColor: colors.border, padding: 10, marginBottom: 10 },
  thumb: { width: 64, height: 80, borderRadius: 10, backgroundColor: colors.surfaceTertiary },
  date: { color: colors.brandPrimary, fontSize: 11, fontWeight: "800", fontFamily: MONO },
  title: { color: colors.onSurface, fontSize: 15, fontWeight: "900", marginTop: 4 },
  state: { fontSize: 10, fontWeight: "900", letterSpacing: 1.5, marginTop: 6 },
}));
