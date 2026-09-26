import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { BackHeader } from "@/src/components/back-header";
import { IconPin } from "@/src/components/icons";
import { Lightbox } from "@/src/components/lightbox";
import { Chip, Empty, SectionTitle } from "@/src/components/ui";
import { MONO } from "@/src/lib/fonts";
import { siteImg, useContact, useMedia, useSettings } from "@/src/lib/site";
import { makeStyles, useTheme } from "@/src/theme";

const HERO_FALLBACK = "https://customer-assets-gfyr7b9c.emergentagent.net/job_glitz-nightclub/artifacts/9c0lj4wr_PHOTO-2025-09-16-12-45-38%202.jpg";

/** "Il Club": hero, stats, the five areas and the tabbed photo gallery from the site. */
export default function Club() {
  const styles = useStyles();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const settings = useSettings();
  const { address } = useContact();
  const s = settings.data;
  const zones: any[] = s?.about_zones ?? [];
  const groups: { id?: string; title: string; category: string }[] = s?.about_gallery_groups ?? [];

  const [picked, setTab] = useState<string | null>(null);
  const [lightbox, setLightbox] = useState<{ images: string[]; index: number } | null>(null);
  const tab = picked ?? groups[0]?.category ?? null;
  const media = useMedia(tab);
  const photos = (media.data ?? []).map((m) => siteImg(m.url)).filter(Boolean) as string[];

  const stats = [
    { v: s?.about_stat_1_value || "2000", l: s?.about_stat_1_label || "Posti all'aperto" },
    { v: s?.about_stat_2_value || "05", l: s?.about_stat_2_label || "Ambienti distinti" },
    { v: s?.about_stat_3_value || "180°", l: s?.about_stat_3_label || "Vista mare" },
  ];

  return (
    <View style={styles.root} testID="club-screen">
      <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom + 32 }} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <Image source={{ uri: siteImg(s?.about_hero_image_url) || HERO_FALLBACK }} style={styles.fill} contentFit="cover" />
          <LinearGradient colors={["rgba(0,0,0,0.2)", "rgba(0,0,0,0.75)", "#000000"]} style={styles.fill} />
          <View style={styles.backAbs}>
            <BackHeader />
          </View>
          <View style={styles.heroBody}>
            <Text style={styles.kicker}>{(s?.about_kicker || "Il Club").toUpperCase()}</Text>
            <Text style={styles.heroTitle}>
              {s?.about_hero_line1 || "Cinque Ambienti,"}
              {"\n"}
              <Text style={{ color: colors.brandPrimary }}>{s?.about_hero_line2 || "Una Sola Notte"}</Text>
            </Text>
            <Text style={styles.heroSub}>
              {s?.about_hero_subtitle ||
                "Affacciato su uno degli scorci più suggestivi della Calabria, il Glitz Club è un luogo esclusivo pensato per offrire esperienze di intrattenimento e relax uniche."}
            </Text>
          </View>
        </View>

        <View style={styles.pad}>
          <View style={styles.stats}>
            {stats.map((st) => (
              <View key={st.l} style={styles.stat}>
                <Text style={styles.statV}>{st.v}</Text>
                <Text style={styles.statL}>{st.l}</Text>
              </View>
            ))}
          </View>

          {zones.map((z, i) => {
            const img = siteImg(z.image);
            return (
              <View key={z.id || i} style={styles.zone} testID={`zone-${z.id || i}`}>
                <Pressable onPress={() => img && setLightbox({ images: [img], index: 0 })}>
                  <Image source={{ uri: img }} style={styles.zoneImg} contentFit="cover" />
                </Pressable>
                <View style={styles.zoneBody}>
                  <Text style={styles.zoneNum}>AMBIENTE {String(i + 1).padStart(2, "0")}</Text>
                  <Text style={styles.zoneTitle}>{z.title}</Text>
                  {z.subtitle ? <Text style={styles.zoneSub}>{z.subtitle}</Text> : null}
                  {z.description ? <Text style={styles.zoneDesc}>{z.description}</Text> : null}
                  {(Array.isArray(z.highlights) ? z.highlights : []).map((h: string) => (
                    <View key={h} style={styles.hl}>
                      <View style={styles.hlDot} />
                      <Text style={styles.hlText}>{h}</Text>
                    </View>
                  ))}
                </View>
              </View>
            );
          })}

          <View style={styles.location}>
            <View style={styles.locHead}>
              <IconPin color={colors.brandPrimary} size={16} />
              <Text style={styles.kicker}>LOCATION</Text>
            </View>
            <Text style={styles.locTitle}>{s?.about_location_title || address}</Text>
            <Text style={styles.zoneDesc}>{s?.about_location_body || "Un anfiteatro naturale, aperto sul Tirreno, incorniciato dall'Isola di Dino."}</Text>
          </View>

          <SectionTitle title={(s?.about_gallery_title || "Gallery").toUpperCase()} />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8, paddingBottom: 12 }}>
            {groups.map((g, gi) => (
              <Chip key={g.id || gi} label={g.title.toUpperCase()} active={tab === g.category} onPress={() => setTab(g.category)} testID={`gallery-tab-${gi}`} />
            ))}
          </ScrollView>
          {tab && !media.isLoading && photos.length === 0 ? <Empty text="Nessuna foto in questa sezione." /> : null}
          <View style={styles.grid}>
            {photos.map((u, i) => (
              <Pressable key={`${tab}-${i}`} style={styles.cell} onPress={() => setLightbox({ images: photos, index: i })}>
                <Image source={{ uri: u }} style={styles.cellImg} contentFit="cover" />
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>
      <Lightbox images={lightbox?.images ?? []} index={lightbox ? lightbox.index : null} onClose={() => setLightbox(null)} />
    </View>
  );
}

const useStyles = makeStyles((colors) => ({
  root: { flex: 1, backgroundColor: colors.surface },
  pad: { paddingHorizontal: 20 },
  fill: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0 },
  hero: { minHeight: 440 },
  backAbs: { position: "absolute", top: 0, left: 0, right: 0, zIndex: 2 },
  heroBody: { flex: 1, justifyContent: "flex-end", padding: 20, paddingTop: 140 },
  kicker: { color: colors.brandPrimary, fontSize: 11, letterSpacing: 4, fontWeight: "800", fontFamily: MONO },
  heroTitle: { color: colors.onSurface, fontSize: 32, fontWeight: "900", marginTop: 8, textTransform: "uppercase", lineHeight: 36 },
  heroSub: { color: colors.brandSecondary, fontSize: 14, lineHeight: 21, marginTop: 12 },
  stats: { flexDirection: "row", gap: 10, marginTop: 8 },
  stat: { flex: 1, backgroundColor: colors.surfaceSecondary, borderRadius: 16, borderWidth: 1, borderColor: colors.border, padding: 14, alignItems: "center" },
  statV: { color: colors.onSurface, fontSize: 24, fontWeight: "900", fontFamily: MONO },
  statL: { color: colors.muted, fontSize: 10, textAlign: "center", marginTop: 4, letterSpacing: 1 },
  zone: { marginTop: 22, backgroundColor: colors.surfaceSecondary, borderRadius: 20, borderWidth: 1, borderColor: colors.border, overflow: "hidden" },
  zoneImg: { width: "100%", aspectRatio: 16 / 10, backgroundColor: colors.surfaceTertiary },
  zoneBody: { padding: 16 },
  zoneNum: { color: colors.brandPrimary, fontSize: 10, letterSpacing: 2.5, fontWeight: "800", fontFamily: MONO },
  zoneTitle: { color: colors.onSurface, fontSize: 22, fontWeight: "900", marginTop: 4 },
  zoneSub: { color: colors.brandSecondary, fontSize: 14, marginTop: 4, fontWeight: "700" },
  zoneDesc: { color: colors.brandSecondary, fontSize: 14, lineHeight: 21, marginTop: 8 },
  hl: { flexDirection: "row", alignItems: "center", gap: 8, marginTop: 6 },
  hlDot: { width: 6, height: 6, borderRadius: 999, backgroundColor: colors.brandPrimary },
  hlText: { color: colors.onSurface, fontSize: 13 },
  location: { marginTop: 26, backgroundColor: colors.brandTertiary, borderRadius: 20, borderWidth: 1, borderColor: colors.borderStrong, padding: 18 },
  locHead: { flexDirection: "row", alignItems: "center", gap: 6 },
  locTitle: { color: colors.onSurface, fontSize: 18, fontWeight: "900", marginTop: 8 },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  cell: { width: "31.8%", aspectRatio: 1, borderRadius: 12, overflow: "hidden" },
  cellImg: { width: "100%", height: "100%", backgroundColor: colors.surfaceSecondary },
}));
