import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useCallback } from "react";
import { Pressable, RefreshControl, ScrollView, Text, View } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { apiGet, coverUrl, mediaUrl } from "@/src/lib/api";
import { LogoHeader } from "@/src/components/logo-header";
import { MONO } from "@/src/lib/fonts";
import { formatEventDate } from "@/src/lib/format";
import { useAuth } from "@/src/lib/auth-context";
import { makeStyles, useTheme } from "@/src/theme";

export default function Serata() {
  const styles = useStyles();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { user } = useAuth();
  const qc = useQueryClient();

  const night = useQuery({ queryKey: ["my-night"], queryFn: () => apiGet("/api/my-night") });
  const events = useQuery({ queryKey: ["events"], queryFn: () => apiGet("/api/events") });
  const tickets = useQuery({ queryKey: ["tickets"], queryFn: () => apiGet("/api/tickets") });

  const refreshing = night.isFetching && !night.isLoading;
  const onRefresh = useCallback(() => {
    qc.invalidateQueries({ queryKey: ["my-night"] });
    qc.invalidateQueries({ queryKey: ["events"] });
    qc.invalidateQueries({ queryKey: ["tickets"] });
  }, [qc]);

  const nextTicket = night.data?.next_ticket;
  const eventList = events.data?.events ?? [];
  const ticketList = tickets.data?.tickets ?? [];

  return (
    <View style={styles.root} testID="serata-screen">
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <LogoHeader />
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.kicker}>LA MIA SERATA</Text>
            <Text style={styles.hi}>Ciao, {user?.name?.split(" ")[0] ?? "ospite"}</Text>
          </View>
          <Pressable testID="open-profile" style={styles.avatar} onPress={() => router.push("/profile")}>
            {user?.photo_url ? (
              <Image source={{ uri: mediaUrl(user.photo_url) }} style={styles.avatarImg} contentFit="cover" />
            ) : (
              <Text style={styles.avatarText}>{(user?.name?.[0] ?? "G").toUpperCase()}</Text>
            )}
          </Pressable>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 24 }]}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.brandPrimary} />}
      >
        {/* Hero */}
        <Pressable
          testID="night-hero"
          style={styles.hero}
          onPress={() => (nextTicket ? router.push(`/event/${nextTicket.event_id}`) : router.push("/events"))}
        >
          {nextTicket ? (
            <>
              <Text style={styles.heroKicker}>IL TUO PROSSIMO INGRESSO</Text>
              <Text style={styles.heroTitle}>{nextTicket.event_title}</Text>
              <Text style={styles.heroDate}>{formatEventDate(nextTicket.event_date)}</Text>
              <View style={styles.heroPill}>
                <Text style={styles.heroPillText}>{nextTicket.formula_label} · biglietto attivo</Text>
              </View>
            </>
          ) : (
            <>
              <Text style={styles.heroKicker}>NESSUN BIGLIETTO ANCORA</Text>
              <Text style={styles.heroTitle}>Scegli la tua serata</Text>
              <Text style={styles.heroDate}>Sfoglia gli eventi e prendi il biglietto</Text>
              <View style={styles.heroPill}>
                <Text style={styles.heroPillText}>Vai agli eventi →</Text>
              </View>
            </>
          )}
        </Pressable>

        {/* Quick actions */}
        <View style={styles.quickRow}>
          <Pressable testID="quick-events" style={styles.quick} onPress={() => router.push("/events")}>
            <Text style={styles.quickText}>Eventi</Text>
          </Pressable>
          <Pressable testID="quick-tables" style={styles.quick} onPress={() => router.push("/tables")}>
            <Text style={styles.quickText}>Tavoli</Text>
          </Pressable>
        </View>

        {/* Upcoming events */}
        <Text style={styles.section}>PROSSIMI EVENTI</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.eventsRow}>
          {eventList.map((ev: any) => (
            <Pressable key={ev.id} testID={`event-${ev.id}`} style={styles.eventCard} onPress={() => router.push(`/event/${ev.id}`)}>
              <Image source={{ uri: coverUrl(ev.cover) }} style={styles.eventCover} contentFit="cover" />
              <View style={styles.eventBody}>
                <Text style={styles.eventDate}>{formatEventDate(ev.date)}</Text>
                <Text style={styles.eventTitle} numberOfLines={2}>{ev.title}</Text>
                <Text style={styles.eventPrice}>da €{ev.price_from}</Text>
              </View>
            </Pressable>
          ))}
        </ScrollView>

        {/* Tickets with QR */}
        <Text style={styles.section}>I MIEI BIGLIETTI</Text>
        {ticketList.length === 0 ? (
          <Text style={styles.empty}>Nessun biglietto. Prendine uno dagli eventi.</Text>
        ) : (
          ticketList.map((tk: any) => (
            <View key={tk.id} testID={`ticket-${tk.id}`} style={styles.ticket}>
              <View style={styles.qrBox}>
                <QRCode value={tk.code} size={92} color="#000000" backgroundColor="#FFFFFF" />
              </View>
              <View style={styles.ticketInfo}>
                <Text style={styles.ticketTitle} numberOfLines={2}>{tk.event_title}</Text>
                <Text style={styles.ticketDate}>{formatEventDate(tk.event_date)}</Text>
                <Text style={styles.ticketCode}>{tk.code}</Text>
                <Text style={styles.ticketFormula}>{tk.formula_label}</Text>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const useStyles = makeStyles((colors) => ({
  root: { flex: 1, backgroundColor: colors.surface },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 14,
    gap: 10,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  kicker: { color: colors.brandPrimary, fontSize: 11, letterSpacing: 4, fontWeight: "800", fontFamily: MONO },
  hi: { color: colors.onSurface, fontSize: 26, fontWeight: "900", marginTop: 4 },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 999,
    backgroundColor: colors.brandTertiary,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: colors.border,
  },
  avatarImg: { width: "100%", height: "100%" },
  avatarText: { color: colors.brandPrimary, fontSize: 18, fontWeight: "900" },
  content: { paddingHorizontal: 20, paddingTop: 4 },
  hero: {
    backgroundColor: colors.surfaceSecondary,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: colors.borderStrong,
    padding: 20,
    shadowColor: colors.brandPrimary,
    shadowOpacity: 0.35,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 0 },
  },
  heroKicker: { color: colors.muted, fontSize: 11, letterSpacing: 3, fontWeight: "700", fontFamily: MONO },
  heroTitle: { color: colors.onSurface, fontSize: 24, fontWeight: "900", marginTop: 8 },
  heroDate: { color: colors.brandSecondary, fontSize: 13, marginTop: 6, fontFamily: MONO },
  heroPill: { alignSelf: "flex-start", marginTop: 14, backgroundColor: colors.brandPrimary, borderRadius: 999, paddingHorizontal: 14, paddingVertical: 8 },
  heroPillText: { color: colors.onBrandPrimary, fontSize: 12, fontWeight: "800", letterSpacing: 1 },
  quickRow: { flexDirection: "row", gap: 12, marginTop: 14 },
  quick: {
    flex: 1,
    backgroundColor: colors.surfaceTertiary,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    paddingVertical: 18,
    alignItems: "center",
  },
  quickText: { color: colors.onSurface, fontSize: 15, fontWeight: "800", letterSpacing: 1 },
  section: { color: colors.muted, fontSize: 12, letterSpacing: 3, fontWeight: "700", fontFamily: MONO, marginTop: 28, marginBottom: 14 },
  eventsRow: { gap: 14, paddingRight: 8 },
  eventCard: { width: 220, backgroundColor: colors.surfaceSecondary, borderRadius: 16, borderWidth: 1, borderColor: colors.border, overflow: "hidden" },
  eventCover: { width: "100%", height: 120 },
  eventBody: { padding: 14 },
  eventDate: { color: colors.brandPrimary, fontSize: 11, fontWeight: "700", fontFamily: MONO, letterSpacing: 1 },
  eventTitle: { color: colors.onSurface, fontSize: 16, fontWeight: "800", marginTop: 6 },
  eventPrice: { color: colors.brandSecondary, fontSize: 13, marginTop: 8, fontFamily: MONO },
  empty: { color: colors.muted, fontSize: 14 },
  ticket: {
    flexDirection: "row",
    gap: 14,
    backgroundColor: colors.surfaceSecondary,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
    marginBottom: 12,
    alignItems: "center",
  },
  qrBox: { backgroundColor: "#FFFFFF", borderRadius: 10, padding: 8 },
  ticketInfo: { flex: 1 },
  ticketTitle: { color: colors.onSurface, fontSize: 16, fontWeight: "800" },
  ticketDate: { color: colors.brandSecondary, fontSize: 12, marginTop: 4, fontFamily: MONO },
  ticketCode: { color: colors.brandPrimary, fontSize: 15, fontWeight: "900", marginTop: 8, letterSpacing: 1, fontFamily: MONO },
  ticketFormula: { color: colors.muted, fontSize: 12, marginTop: 2 },
}));
