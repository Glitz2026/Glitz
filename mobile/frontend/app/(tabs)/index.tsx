import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter, type Href } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { useCallback, useState } from "react";
import { Linking, Pressable, RefreshControl, ScrollView, Text, View } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import {
  IconBag,
  IconCalendar,
  IconChat,
  IconChevron,
  IconImage,
  IconInstagram,
  IconMail,
  IconMusic,
  IconPin,
  IconSOS,
  IconSofa,
  IconSpark,
  IconTicket,
  IconUsers,
} from "@/src/components/icons";
import { NewsletterCard } from "@/src/components/newsletter-card";
import { Countdown, SectionTitle } from "@/src/components/ui";
import { apiGet, mediaUrl } from "@/src/lib/api";
import { useAuth } from "@/src/lib/auth-context";
import { useCart } from "@/src/lib/cart-context";
import { MONO } from "@/src/lib/fonts";
import { formatDay, formatEventDate } from "@/src/lib/format";
import { openWhatsApp, siteImg, useContact, useFaqs, useMedia, usePosts, useProducts, useSettings, useSiteEvents, useUpcoming } from "@/src/lib/site";
import { makeStyles, useTheme } from "@/src/theme";

type Action = { key: string; label: string; href: Href; Icon: (p: { color: string; size?: number }) => React.JSX.Element; hot?: boolean };

const ACTIONS: Action[] = [
  { key: "eventi", label: "Eventi", href: "/eventi", Icon: IconCalendar },
  { key: "tavoli", label: "Tavoli", href: "/prenota", Icon: IconSofa },
  { key: "biglietti", label: "Biglietti", href: "/biglietti", Icon: IconTicket },
  { key: "shop", label: "Shop", href: "/shop", Icon: IconBag },
  { key: "amici", label: "Amici", href: "/amici", Icon: IconUsers },
  { key: "aiuto", label: "Aiuto", href: "/aiuto", Icon: IconSOS, hot: true },
  { key: "gallery", label: "Gallery", href: "/gallery", Icon: IconImage },
  { key: "club", label: "Il Club", href: "/club", Icon: IconSpark },
];

function greeting() {
  const h = new Date().getHours();
  if (h >= 5 && h < 13) return "BUONGIORNO";
  if (h >= 13 && h < 18) return "BUON POMERIGGIO";
  return "BUONASERA";
}

export default function Home() {
  const styles = useStyles();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const qc = useQueryClient();
  const { user } = useAuth();
  const { count } = useCart();
  const contact = useContact();

  const settings = useSettings();
  const upcoming = useUpcoming();
  const events = useSiteEvents();
  const products = useProducts();
  const posts = usePosts();
  const faqs = useFaqs();
  const firstGroup = settings.data?.about_gallery_groups?.[0]?.category;
  const gallery = useMedia(firstGroup);
  const night = useQuery({ queryKey: ["my-night"], queryFn: () => apiGet("/api/my-night") });

  const [refreshing, setRefreshing] = useState(false);
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await Promise.all([qc.invalidateQueries({ queryKey: ["site"] }), qc.invalidateQueries({ queryKey: ["my-night"] })]);
    setRefreshing(false);
  }, [qc]);

  const next = upcoming.data;
  const nextTicket = night.data?.next_ticket;
  const zones: any[] = settings.data?.about_zones ?? [];
  const s = settings.data;

  return (
    <View style={styles.root} testID="home-screen">
      <View style={[styles.topBar, { paddingTop: insets.top + 8 }]}>
        <Image source={require("../../assets/images/glitz-logo.png")} style={styles.logo} contentFit="contain" />
        <View style={styles.topActions}>
          <Pressable testID="open-cart" style={styles.iconBtn} onPress={() => router.push("/carrello")}>
            <IconBag color={colors.onSurface} size={20} />
            {count > 0 ? (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{count}</Text>
              </View>
            ) : null}
          </Pressable>
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
        contentContainerStyle={{ paddingBottom: insets.bottom + 32 }}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.brandPrimary} />}
      >
        <View style={styles.pad}>
          <Text style={styles.kicker}>{greeting()}</Text>
          <Text style={styles.hi}>{user?.name?.split(" ")[0] ?? "Ospite"}</Text>
          <Text style={styles.tagline}>{s?.home_hero_line1 || "BEYOND"} {s?.home_hero_line2 || "THE NIGHT"}</Text>
        </View>

        {/* Next night */}
        {next ? (
          <Pressable testID="home-hero" style={styles.hero} onPress={() => router.push(`/event/${next.id}`)}>
            <Image source={{ uri: siteImg(next.poster_url) }} style={styles.fill} contentFit="cover" transition={300} />
            <LinearGradient colors={["rgba(0,0,0,0.05)", "rgba(0,0,0,0.7)", "rgba(0,0,0,0.97)"]} style={styles.fill} />
            <View style={styles.heroBody}>
              <View style={styles.pill}>
                <Text style={styles.pillText}>{(s?.home_opening_title || "PROSSIMA SERATA").toUpperCase()}</Text>
              </View>
              <Text style={styles.heroTitle} numberOfLines={2}>{next.title}</Text>
              <Text style={styles.heroDate}>{formatEventDate(next.date)}</Text>
              <View style={{ marginTop: 12 }}>
                <Countdown targetIso={next.date} compact />
              </View>
              <View style={styles.heroActions}>
                {next.ticket_url ? (
                  <Pressable testID="hero-ticket" style={styles.heroBtn} onPress={() => WebBrowser.openBrowserAsync(next.ticket_url!)}>
                    <IconTicket color={colors.onBrandPrimary} size={16} />
                    <Text style={styles.heroBtnText}>BIGLIETTI</Text>
                  </Pressable>
                ) : null}
                <Pressable testID="hero-table" style={styles.heroBtnGhost} onPress={() => router.push({ pathname: "/event/[id]", params: { id: next.id, tavoli: "1" } })}>
                  <IconSofa color={colors.onSurface} size={16} />
                  <Text style={styles.heroBtnGhostText}>TAVOLO</Text>
                </Pressable>
              </View>
            </View>
          </Pressable>
        ) : null}

        {/* Pass */}
        {nextTicket ? (
          <Pressable testID="home-pass" style={styles.pass} onPress={() => router.push("/biglietti")}>
            <View style={styles.passQr}>
              <QRCode value={nextTicket.code} size={58} color="#000000" backgroundColor="#FFFFFF" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.passKicker}>IL TUO PASS</Text>
              <Text style={styles.passTitle} numberOfLines={1}>{nextTicket.event_title}</Text>
              <Text style={styles.passMeta}>{formatEventDate(nextTicket.event_date)} · {nextTicket.formula_label}</Text>
            </View>
            <IconChevron color={colors.muted} />
          </Pressable>
        ) : null}

        {/* Quick actions */}
        <View style={styles.grid}>
          {ACTIONS.map((a) => (
            <Pressable key={a.key} testID={`quick-${a.key}`} style={styles.tile} onPress={() => router.push(a.href)}>
              <View style={[styles.tileIcon, a.hot && styles.tileIconHot]}>
                <a.Icon color={a.hot ? colors.onBrandPrimary : colors.brandPrimary} size={24} />
              </View>
              <Text style={styles.tileText} numberOfLines={1}>{a.label}</Text>
            </Pressable>
          ))}
        </View>

        {/* Upcoming events */}
        <View style={styles.pad}>
          <SectionTitle title={(s?.home_events_title || "Prossimi eventi").toUpperCase()} action="Tutti" onAction={() => router.push("/eventi")} />
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.rail}>
          {(events.data ?? []).map((ev) => (
            <Pressable key={ev.id} testID={`home-event-${ev.id}`} style={styles.poster} onPress={() => router.push(`/event/${ev.id}`)}>
              <Image source={{ uri: siteImg(ev.poster_url) }} style={styles.fill} contentFit="cover" />
              <LinearGradient colors={["transparent", "rgba(0,0,0,0.92)"]} style={styles.fill} />
              <View style={styles.posterDate}>
                <Text style={styles.posterDateText}>{formatDay(ev.date)}</Text>
              </View>
              <Text style={styles.posterTitle} numberOfLines={2}>{(ev.title || "").split("—")[0].trim()}</Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* Table service */}
        <View style={styles.pad}>
          <Pressable testID="home-ordina" style={styles.banner} onPress={() => router.push("/ordina")}>
            <View style={styles.bannerIcon}>
              <IconMusic color={colors.brandPrimary} size={24} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.bannerTitle}>Sei già al Glitz?</Text>
              <Text style={styles.bannerBody}>Ordina dal tavolo e chiama il cameriere in un tocco.</Text>
            </View>
            <IconChevron color={colors.brandPrimary} />
          </Pressable>
        </View>

        {/* Shop */}
        {(products.data ?? []).length ? (
          <>
            <View style={styles.pad}>
              <SectionTitle title="SHOP UFFICIALE" action="Vai allo shop" onAction={() => router.push("/shop")} />
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.rail}>
              {(products.data ?? []).map((p) => (
                <Pressable key={p.id} testID={`home-product-${p.slug}`} style={styles.product} onPress={() => router.push(`/shop/${p.slug}`)}>
                  <Image source={{ uri: siteImg(p.image) }} style={styles.productImg} contentFit={p.slug === "gift-card" ? "contain" : "cover"} />
                  {p.badge ? (
                    <View style={styles.productBadge}>
                      <Text style={styles.productBadgeText}>{p.badge}</Text>
                    </View>
                  ) : null}
                  <View style={styles.productBody}>
                    <Text style={styles.productName} numberOfLines={1}>{p.name}</Text>
                    <Text style={styles.productPrice}>€ {p.price}</Text>
                  </View>
                </Pressable>
              ))}
            </ScrollView>
          </>
        ) : null}

        {/* Club areas */}
        {zones.length ? (
          <>
            <View style={styles.pad}>
              <SectionTitle title="GLI AMBIENTI" action="Il Club" onAction={() => router.push("/club")} />
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.rail}>
              {zones.map((z, i) => (
                <Pressable key={z.id || i} style={styles.zone} onPress={() => router.push("/club")}>
                  <Image source={{ uri: siteImg(z.image) }} style={styles.fill} contentFit="cover" />
                  <LinearGradient colors={["transparent", "rgba(0,0,0,0.9)"]} style={styles.fill} />
                  <Text style={styles.zoneNum}>AMBIENTE {String(i + 1).padStart(2, "0")}</Text>
                  <Text style={styles.zoneTitle} numberOfLines={1}>{z.title}</Text>
                  {z.subtitle ? <Text style={styles.zoneSub} numberOfLines={1}>{z.subtitle}</Text> : null}
                </Pressable>
              ))}
            </ScrollView>
          </>
        ) : null}

        <View style={styles.pad}>
          {/* News */}
          {(posts.data ?? []).length ? (
            <>
              <SectionTitle title="NEWS" action="Tutte" onAction={() => router.push("/news")} />
              {(posts.data ?? []).slice(0, 3).map((p) => (
                <Pressable key={p.id} style={styles.news} onPress={() => router.push(`/news/${p.slug}`)}>
                  <Image source={{ uri: siteImg(p.cover_url) }} style={styles.newsImg} contentFit="cover" />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.newsTitle} numberOfLines={2}>{p.title}</Text>
                    <Text style={styles.newsExcerpt} numberOfLines={2}>{p.excerpt}</Text>
                  </View>
                </Pressable>
              ))}
            </>
          ) : null}

          {/* Gallery */}
          {(gallery.data ?? []).length ? (
            <>
              <SectionTitle title={(s?.home_gallery_preview_title || "Uno sguardo dentro").toUpperCase()} action="Gallery" onAction={() => router.push("/gallery")} />
              <View style={styles.galleryGrid}>
                {(gallery.data ?? []).slice(0, 4).map((m) => (
                  <Pressable key={m.id} style={styles.galleryCell} onPress={() => router.push("/gallery")}>
                    <Image source={{ uri: siteImg(m.url) }} style={styles.galleryImg} contentFit="cover" />
                  </Pressable>
                ))}
              </View>
            </>
          ) : null}

          {/* FAQ */}
          {(faqs.data ?? []).length ? (
            <>
              <SectionTitle title="INFO RAPIDE" action="Tutte le FAQ" onAction={() => router.push("/faq")} />
              {(faqs.data ?? []).slice(0, 4).map((f) => {
                const open = openFaq === f.id;
                return (
                  <Pressable key={f.id} style={styles.faq} onPress={() => setOpenFaq(open ? null : f.id)}>
                    <View style={styles.faqHead}>
                      <Text style={styles.faqQ}>{f.question}</Text>
                      <Text style={styles.faqSign}>{open ? "–" : "+"}</Text>
                    </View>
                    {open ? <Text style={styles.faqA}>{f.answer}</Text> : null}
                  </Pressable>
                );
              })}
            </>
          ) : null}

          <SectionTitle title="RESTA NEL GIRO" />
          <NewsletterCard />

          <View style={styles.social}>
            <Pressable style={styles.socialBtn} onPress={() => Linking.openURL(contact.instagram)}>
              <IconInstagram color={colors.onSurface} size={22} />
            </Pressable>
            <Pressable style={styles.socialBtn} onPress={() => Linking.openURL(contact.tiktok)}>
              <IconMusic color={colors.onSurface} size={22} />
            </Pressable>
            <Pressable style={styles.socialBtn} onPress={() => openWhatsApp(contact.whatsappNumber, "Ciao Glitz, avrei un'informazione da chiedere.")}>
              <IconChat color={colors.onSurface} size={22} />
            </Pressable>
            <Pressable style={styles.socialBtn} onPress={() => Linking.openURL(`mailto:${contact.email}`)}>
              <IconMail color={colors.onSurface} size={22} />
            </Pressable>
          </View>
          <Pressable style={styles.address} onPress={() => router.push("/contatti")}>
            <IconPin color={colors.muted} size={15} />
            <Text style={styles.addressText}>{contact.address}</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const useStyles = makeStyles((colors) => ({
  root: { flex: 1, backgroundColor: colors.surface },
  pad: { paddingHorizontal: 20 },
  fill: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0 },
  topBar: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, paddingBottom: 10 },
  logo: { width: 96, height: 30 },
  topActions: { flexDirection: "row", alignItems: "center", gap: 10 },
  iconBtn: { width: 42, height: 42, borderRadius: 999, backgroundColor: colors.surfaceSecondary, borderWidth: 1, borderColor: colors.border, alignItems: "center", justifyContent: "center" },
  badge: { position: "absolute", top: -3, right: -3, minWidth: 18, height: 18, borderRadius: 999, backgroundColor: colors.brandPrimary, alignItems: "center", justifyContent: "center", paddingHorizontal: 4 },
  badgeText: { color: colors.onBrandPrimary, fontSize: 10, fontWeight: "900" },
  avatar: { width: 42, height: 42, borderRadius: 999, backgroundColor: colors.brandTertiary, alignItems: "center", justifyContent: "center", overflow: "hidden", borderWidth: 1, borderColor: colors.border },
  avatarImg: { width: "100%", height: "100%" },
  avatarText: { color: colors.brandPrimary, fontSize: 17, fontWeight: "900" },
  kicker: { color: colors.brandPrimary, fontSize: 11, letterSpacing: 4, fontWeight: "800", fontFamily: MONO, marginTop: 6 },
  hi: { color: colors.onSurface, fontSize: 30, fontWeight: "900", marginTop: 2 },
  tagline: { color: colors.muted, fontSize: 12, letterSpacing: 3, fontFamily: MONO, marginTop: 2, marginBottom: 16 },
  hero: { marginHorizontal: 20, height: 400, borderRadius: 24, overflow: "hidden", borderWidth: 1.5, borderColor: colors.borderStrong, backgroundColor: colors.surfaceSecondary },
  heroBody: { flex: 1, justifyContent: "flex-end", padding: 18 },
  pill: { alignSelf: "flex-start", backgroundColor: colors.brandPrimary, borderRadius: 999, paddingHorizontal: 10, paddingVertical: 5, marginBottom: 10 },
  pillText: { color: colors.onBrandPrimary, fontSize: 10, fontWeight: "900", letterSpacing: 1.5 },
  heroTitle: { color: colors.onSurface, fontSize: 26, fontWeight: "900", textTransform: "uppercase" },
  heroDate: { color: colors.brandSecondary, fontSize: 12, fontFamily: MONO, marginTop: 6 },
  heroActions: { flexDirection: "row", gap: 10, marginTop: 16 },
  heroBtn: { flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, backgroundColor: colors.brandPrimary, borderRadius: 14, paddingVertical: 13 },
  heroBtnText: { color: colors.onBrandPrimary, fontSize: 13, fontWeight: "900", letterSpacing: 1.5 },
  heroBtnGhost: { flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, backgroundColor: "rgba(255,255,255,0.08)", borderWidth: 1, borderColor: "rgba(255,255,255,0.25)", borderRadius: 14, paddingVertical: 13 },
  heroBtnGhostText: { color: colors.onSurface, fontSize: 13, fontWeight: "900", letterSpacing: 1.5 },
  pass: { marginHorizontal: 20, marginTop: 14, flexDirection: "row", alignItems: "center", gap: 14, backgroundColor: colors.surfaceSecondary, borderRadius: 18, borderWidth: 1, borderColor: colors.border, padding: 12 },
  passQr: { backgroundColor: "#FFFFFF", borderRadius: 10, padding: 6 },
  passKicker: { color: colors.brandPrimary, fontSize: 10, letterSpacing: 2.5, fontWeight: "800", fontFamily: MONO },
  passTitle: { color: colors.onSurface, fontSize: 15, fontWeight: "900", marginTop: 3 },
  passMeta: { color: colors.muted, fontSize: 11, fontFamily: MONO, marginTop: 3 },
  grid: { flexDirection: "row", flexWrap: "wrap", paddingHorizontal: 12, marginTop: 22, rowGap: 16 },
  tile: { width: "25%", alignItems: "center", gap: 8 },
  tileIcon: { width: 58, height: 58, borderRadius: 18, backgroundColor: colors.surfaceSecondary, borderWidth: 1, borderColor: colors.border, alignItems: "center", justifyContent: "center" },
  tileIconHot: { backgroundColor: colors.brandPrimary, borderColor: colors.brandPrimary },
  tileText: { color: colors.onSurface, fontSize: 12, fontWeight: "700" },
  rail: { gap: 12, paddingHorizontal: 20 },
  poster: { width: 150, height: 214, borderRadius: 18, overflow: "hidden", backgroundColor: colors.surfaceSecondary, borderWidth: 1, borderColor: colors.border, justifyContent: "flex-end", padding: 12 },
  posterDate: { position: "absolute", top: 10, left: 10, backgroundColor: "rgba(0,0,0,0.7)", borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4, borderWidth: 1, borderColor: colors.borderStrong },
  posterDateText: { color: colors.onSurface, fontSize: 11, fontWeight: "900", fontFamily: MONO },
  posterTitle: { color: colors.onSurface, fontSize: 15, fontWeight: "900", textTransform: "uppercase" },
  banner: { marginTop: 24, flexDirection: "row", alignItems: "center", gap: 14, backgroundColor: colors.brandTertiary, borderRadius: 18, borderWidth: 1, borderColor: colors.borderStrong, padding: 16 },
  bannerIcon: { width: 46, height: 46, borderRadius: 14, backgroundColor: colors.surface, alignItems: "center", justifyContent: "center" },
  bannerTitle: { color: colors.onSurface, fontSize: 16, fontWeight: "900" },
  bannerBody: { color: colors.onBrandTertiary, fontSize: 13, marginTop: 3 },
  product: { width: 156, borderRadius: 18, overflow: "hidden", backgroundColor: colors.surfaceSecondary, borderWidth: 1, borderColor: colors.border },
  productImg: { width: "100%", height: 170, backgroundColor: "#000000" },
  productBadge: { position: "absolute", top: 10, left: 10, backgroundColor: colors.brandPrimary, borderRadius: 999, paddingHorizontal: 8, paddingVertical: 3 },
  productBadgeText: { color: colors.onBrandPrimary, fontSize: 9, fontWeight: "900", letterSpacing: 1 },
  productBody: { padding: 12 },
  productName: { color: colors.onSurface, fontSize: 13, fontWeight: "800", textTransform: "uppercase" },
  productPrice: { color: colors.brandPrimary, fontSize: 15, fontWeight: "900", marginTop: 4, fontFamily: MONO },
  zone: { width: 240, height: 150, borderRadius: 18, overflow: "hidden", backgroundColor: colors.surfaceSecondary, justifyContent: "flex-end", padding: 14 },
  zoneNum: { color: colors.brandPrimary, fontSize: 10, letterSpacing: 2, fontWeight: "800", fontFamily: MONO },
  zoneTitle: { color: colors.onSurface, fontSize: 17, fontWeight: "900", marginTop: 3 },
  zoneSub: { color: colors.brandSecondary, fontSize: 12, marginTop: 2 },
  news: { flexDirection: "row", gap: 12, alignItems: "center", backgroundColor: colors.surfaceSecondary, borderRadius: 16, borderWidth: 1, borderColor: colors.border, padding: 10, marginBottom: 10 },
  newsImg: { width: 76, height: 76, borderRadius: 12, backgroundColor: colors.surfaceTertiary },
  newsTitle: { color: colors.onSurface, fontSize: 14, fontWeight: "800" },
  newsExcerpt: { color: colors.muted, fontSize: 12, marginTop: 4, lineHeight: 17 },
  galleryGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  galleryCell: { width: "48.5%", aspectRatio: 1, borderRadius: 14, overflow: "hidden" },
  galleryImg: { width: "100%", height: "100%", backgroundColor: colors.surfaceSecondary },
  faq: { backgroundColor: colors.surfaceSecondary, borderRadius: 14, borderWidth: 1, borderColor: colors.border, padding: 14, marginBottom: 8 },
  faqHead: { flexDirection: "row", alignItems: "center", gap: 10 },
  faqQ: { flex: 1, color: colors.onSurface, fontSize: 14, fontWeight: "800" },
  faqSign: { color: colors.brandPrimary, fontSize: 20, fontWeight: "900" },
  faqA: { color: colors.brandSecondary, fontSize: 13, lineHeight: 20, marginTop: 10 },
  social: { flexDirection: "row", justifyContent: "center", gap: 14, marginTop: 28 },
  socialBtn: { width: 50, height: 50, borderRadius: 999, backgroundColor: colors.surfaceSecondary, borderWidth: 1, borderColor: colors.border, alignItems: "center", justifyContent: "center" },
  address: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6, marginTop: 14 },
  addressText: { color: colors.muted, fontSize: 12 },
}));
