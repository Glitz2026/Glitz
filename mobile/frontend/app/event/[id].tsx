import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { useRef, useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { BackHeader } from "@/src/components/back-header";
import { BookingSheet } from "@/src/components/booking-sheet";
import { IconPin, IconSofa, IconTicket } from "@/src/components/icons";
import { TablePicker } from "@/src/components/table-picker";
import { Countdown, GhostButton, Notice, PrimaryButton, SectionTitle } from "@/src/components/ui";
import { apiPost } from "@/src/lib/api";
import { MONO } from "@/src/lib/fonts";
import { formatEventDate } from "@/src/lib/format";
import { errorMessage, siteGet, siteImg, type SiteEvent } from "@/src/lib/site";
import { makeStyles, useTheme } from "@/src/theme";

export default function EventDetail() {
  const styles = useStyles();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const qc = useQueryClient();
  const { id, tavoli } = useLocalSearchParams<{ id: string; tavoli?: string }>();

  const scroll = useRef<ScrollView>(null);
  const [pickerY, setPickerY] = useState<number | null>(null);
  const [formula, setFormula] = useState<string | null>(null);
  const [ticketDone, setTicketDone] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);

  const event = useQuery<SiteEvent>({
    queryKey: ["site", "event", id],
    queryFn: () => siteGet(`/events/${id}`),
    refetchInterval: 30_000,
  });
  const ev = event.data;

  const buyMut = useMutation({
    mutationFn: () => apiPost("/api/tickets", { event_id: ev?.app_event_id, formula_id: formula }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["tickets"] });
      qc.invalidateQueries({ queryKey: ["my-night"] });
      setTicketDone(true);
    },
  });

  const goToTables = () => {
    if (ev?.floorplan_enabled && pickerY != null) scroll.current?.scrollTo({ y: pickerY - 20, animated: true });
    else setBookingOpen(true);
  };

  if (event.isError) {
    return (
      <View style={styles.root}>
        <BackHeader title="EVENTO" />
        <View style={styles.center}>
          <Text style={styles.muted}>Evento non trovato.</Text>
        </View>
      </View>
    );
  }
  if (!ev) {
    return (
      <View style={styles.root} testID="event-screen">
        <BackHeader />
        <View style={styles.center}>
          <ActivityIndicator color={colors.brandPrimary} />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.root} testID="event-screen">
      <ScrollView ref={scroll} contentContainerStyle={{ paddingBottom: insets.bottom + 32 }} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <Image source={{ uri: siteImg(ev.poster_url) }} style={styles.fill} contentFit="cover" />
          <LinearGradient colors={["rgba(0,0,0,0.25)", "rgba(0,0,0,0.8)", "#000000"]} style={styles.fill} />
          <View style={styles.backAbs}>
            <BackHeader />
          </View>
          <View style={styles.heroInfo}>
            <Text style={styles.date}>{formatEventDate(ev.date)}</Text>
            <Text style={styles.title}>{ev.title}</Text>
            {ev.location ? (
              <View style={styles.locRow}>
                <IconPin color={colors.brandSecondary} size={15} />
                <Text style={styles.loc}>{ev.location}</Text>
              </View>
            ) : null}
            <View style={{ marginTop: 16 }}>
              <Countdown targetIso={ev.date} />
            </View>
          </View>
        </View>

        <View style={styles.body}>
          <View style={styles.actions}>
            {ev.ticket_url ? (
              <PrimaryButton
                testID="event-ticket-btn"
                label="BIGLIETTI"
                icon={<IconTicket color={colors.onBrandPrimary} size={18} />}
                onPress={() => WebBrowser.openBrowserAsync(ev.ticket_url!)}
                style={{ flex: 1 }}
              />
            ) : null}
            <GhostButton
              testID="event-table-btn"
              label="PRENOTA TAVOLO"
              icon={<IconSofa color={colors.onSurface} size={18} />}
              onPress={goToTables}
              style={{ flex: 1 }}
            />
          </View>

          {ev.description ? (
            <>
              <SectionTitle title="LA SERATA" />
              <Text style={styles.desc}>{ev.description}</Text>
            </>
          ) : null}

          {ev.lineup?.length ? (
            <>
              <SectionTitle title="LINE-UP" />
              <View style={styles.lineup}>
                {ev.lineup.map((n) => (
                  <Text key={n} style={styles.lineupName}>{n}</Text>
                ))}
              </View>
            </>
          ) : null}

          {ev.formulas?.length && ev.app_event_id ? (
            <>
              <SectionTitle title="BIGLIETTO CON QR NELL'APP" />
              {ticketDone ? (
                <View style={styles.doneBox}>
                  <Text style={styles.doneTitle}>Sei dentro.</Text>
                  <Text style={styles.muted}>Il biglietto con QR è nel tuo wallet.</Text>
                  <PrimaryButton label="APRI I MIEI BIGLIETTI" onPress={() => router.push("/biglietti")} style={{ marginTop: 14 }} />
                </View>
              ) : (
                <>
                  {ev.formulas.map((f) => {
                    const active = formula === f.id;
                    return (
                      <Pressable key={f.id} testID={`formula-${f.id}`} style={[styles.formula, active && styles.formulaActive]} onPress={() => setFormula(f.id)}>
                        <View style={{ flex: 1 }}>
                          <Text style={[styles.formulaLabel, active && styles.accent]}>{f.label}</Text>
                          <Text style={styles.muted}>{f.includes}</Text>
                        </View>
                        <Text style={[styles.formulaPrice, active && styles.accent]}>€{f.price}</Text>
                      </Pressable>
                    );
                  })}
                  {buyMut.isError ? <Notice tone="error" text={errorMessage(buyMut.error)} /> : null}
                  <PrimaryButton testID="buy-ticket" label="PRENDI IL BIGLIETTO" onPress={() => buyMut.mutate()} disabled={!formula} loading={buyMut.isPending} style={{ marginTop: 6 }} />
                </>
              )}
            </>
          ) : null}

          <View onLayout={(e) => {
            const y = e.nativeEvent.layout.y;
            setPickerY(y);
            if (tavoli && pickerY == null) setTimeout(() => scroll.current?.scrollTo({ y: y - 20, animated: true }), 350);
          }}>
            {ev.floorplan_enabled ? (
              <>
                <SectionTitle title="SCEGLI IL TUO TAVOLO" />
                <TablePicker eventId={ev.id} eventTitle={ev.title} reserved={ev.reserved_tables || {}} customImageUrl={ev.floorplan_image_url} />
              </>
            ) : (
              <>
                <SectionTitle title="TAVOLI" />
                <Text style={styles.desc}>Per questa serata la piantina non è ancora aperta: invia una richiesta e lo staff ti propone il tavolo migliore.</Text>
                <GhostButton label="RICHIEDI UN TAVOLO" onPress={() => setBookingOpen(true)} style={{ marginTop: 14 }} />
              </>
            )}
          </View>
        </View>
      </ScrollView>

      <BookingSheet open={bookingOpen} onClose={() => setBookingOpen(false)} eventId={ev.id} eventTitle={ev.title} />
    </View>
  );
}

const useStyles = makeStyles((colors) => ({
  root: { flex: 1, backgroundColor: colors.surface },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  hero: { minHeight: 460 },
  fill: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0 },
  backAbs: { position: "absolute", top: 0, left: 0, right: 0, zIndex: 2 },
  heroInfo: { flex: 1, justifyContent: "flex-end", paddingHorizontal: 20, paddingTop: 140, paddingBottom: 20 },
  date: { color: colors.brandPrimary, fontSize: 12, fontWeight: "800", fontFamily: MONO, letterSpacing: 1 },
  title: { color: colors.onSurface, fontSize: 32, fontWeight: "900", marginTop: 8, textTransform: "uppercase" },
  locRow: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: 8 },
  loc: { color: colors.brandSecondary, fontSize: 13 },
  body: { paddingHorizontal: 20 },
  actions: { flexDirection: "row", gap: 12, marginTop: 8 },
  desc: { color: colors.brandSecondary, fontSize: 15, lineHeight: 23 },
  lineup: { backgroundColor: colors.surfaceSecondary, borderRadius: 16, borderWidth: 1, borderColor: colors.border, padding: 16, gap: 8 },
  lineupName: { color: colors.onSurface, fontSize: 16, fontWeight: "800" },
  formula: { flexDirection: "row", alignItems: "center", backgroundColor: colors.surfaceSecondary, borderWidth: 1.5, borderColor: colors.border, borderRadius: 14, padding: 16, marginBottom: 10 },
  formulaActive: { borderColor: colors.borderStrong, backgroundColor: colors.brandTertiary },
  formulaLabel: { color: colors.onSurface, fontSize: 17, fontWeight: "900", letterSpacing: 1 },
  formulaPrice: { color: colors.onSurface, fontSize: 20, fontWeight: "900", fontFamily: MONO },
  accent: { color: colors.brandPrimary },
  muted: { color: colors.muted, fontSize: 13, marginTop: 4 },
  doneBox: { backgroundColor: colors.surfaceSecondary, borderRadius: 16, borderWidth: 1.5, borderColor: colors.borderStrong, padding: 18 },
  doneTitle: { color: colors.brandPrimary, fontSize: 28, fontWeight: "900" },
}));
