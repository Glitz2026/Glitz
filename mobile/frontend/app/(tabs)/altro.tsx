import { Image } from "expo-image";
import { useRouter, type Href } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
  IconArchive,
  IconBag,
  IconChat,
  IconChevron,
  IconGift,
  IconHelp,
  IconImage,
  IconNews,
  IconPin,
  IconSOS,
  IconSofa,
  IconSpark,
  IconTicket,
  IconUser,
  IconUsers,
} from "@/src/components/icons";
import { SITE_ORIGIN, mediaUrl } from "@/src/lib/api";
import { useAuth } from "@/src/lib/auth-context";
import { useCart } from "@/src/lib/cart-context";
import { MONO } from "@/src/lib/fonts";
import { openWhatsApp, useContact } from "@/src/lib/site";
import { makeStyles, useTheme } from "@/src/theme";

type Row = { label: string; sub?: string; Icon: (p: { color: string; size?: number }) => React.JSX.Element; href?: Href; onPress?: () => void; testID: string };

export default function Altro() {
  const styles = useStyles();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { user } = useAuth();
  const { count } = useCart();
  const contact = useContact();

  const groups: { title: string; rows: Row[] }[] = [
    {
      title: "LA TUA SERATA",
      rows: [
        { label: "I miei biglietti", sub: "QR d'ingresso", Icon: IconTicket, href: "/biglietti", testID: "menu-biglietti" },
        { label: "Prenota un tavolo", sub: "Piantina 2D e club in 3D", Icon: IconSofa, href: "/prenota", testID: "menu-prenota" },
        { label: "Amici", sub: "Gruppi e codici invito", Icon: IconUsers, href: "/amici", testID: "menu-amici" },
        { label: "Aiuto", sub: "SOS e sicurezza", Icon: IconSOS, href: "/aiuto", testID: "menu-aiuto" },
      ],
    },
    {
      title: "IL GLITZ",
      rows: [
        { label: "Il Club", sub: "Ambienti e foto", Icon: IconSpark, href: "/club", testID: "menu-club" },
        { label: "Gallery", Icon: IconImage, href: "/gallery", testID: "menu-gallery" },
        { label: "News", Icon: IconNews, href: "/news", testID: "menu-news" },
        { label: "Eventi passati", Icon: IconArchive, href: "/eventi-passati", testID: "menu-passati" },
        { label: "Domande frequenti", Icon: IconHelp, href: "/faq", testID: "menu-faq" },
      ],
    },
    {
      title: "SHOP",
      rows: [
        { label: "Shop ufficiale", sub: "Merchandise e gift card", Icon: IconBag, href: "/shop", testID: "menu-shop" },
        { label: `Carrello${count ? ` (${count})` : ""}`, Icon: IconBag, href: "/carrello", testID: "menu-carrello" },
      ],
    },
    {
      title: "CONTATTI",
      rows: [
        { label: "Eventi privati", sub: "Compleanni, aziende, esclusive", Icon: IconGift, href: "/eventi-privati", testID: "menu-privati" },
        { label: "Contatti e mappa", sub: contact.address, Icon: IconPin, href: "/contatti", testID: "menu-contatti" },
        {
          label: "Scrivici su WhatsApp",
          sub: contact.whatsappDisplay,
          Icon: IconChat,
          onPress: () => openWhatsApp(contact.whatsappNumber, "Ciao Glitz, avrei un'informazione da chiedere."),
          testID: "menu-whatsapp",
        },
      ],
    },
    {
      title: "ACCOUNT",
      rows: [
        { label: "Profilo e richieste", sub: "Prenotazioni, ordini, pagamenti", Icon: IconUser, href: "/profile", testID: "menu-profilo" },
        { label: "Area staff", sub: "Pannello admin del sito", Icon: IconSpark, onPress: () => WebBrowser.openBrowserAsync(`${SITE_ORIGIN}/admin`), testID: "menu-admin" },
      ],
    },
  ];

  return (
    <View style={styles.root} testID="altro-screen">
      <ScrollView contentContainerStyle={[styles.content, { paddingTop: insets.top + 16, paddingBottom: insets.bottom + 24 }]} showsVerticalScrollIndicator={false}>
        <Pressable style={styles.profile} onPress={() => router.push("/profile")}>
          <View style={styles.avatar}>
            {user?.photo_url ? (
              <Image source={{ uri: mediaUrl(user.photo_url) }} style={styles.avatarImg} contentFit="cover" />
            ) : (
              <Text style={styles.avatarText}>{(user?.name?.[0] ?? "G").toUpperCase()}</Text>
            )}
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.name}>{user?.name ?? "Ospite"}</Text>
            <Text style={styles.email}>{user?.email ?? "Modifica profilo"}</Text>
          </View>
          <IconChevron color={colors.muted} />
        </Pressable>

        {groups.map((g) => (
          <View key={g.title}>
            <Text style={styles.group}>{g.title}</Text>
            <View style={styles.card}>
              {g.rows.map((r, i) => (
                <Pressable
                  key={r.testID}
                  testID={r.testID}
                  style={({ pressed }) => [styles.row, i > 0 && styles.rowBorder, pressed && { opacity: 0.7 }]}
                  onPress={() => (r.href ? router.push(r.href) : r.onPress?.())}
                >
                  <View style={styles.rowIcon}>
                    <r.Icon color={colors.brandPrimary} size={20} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.rowLabel}>{r.label}</Text>
                    {r.sub ? <Text style={styles.rowSub} numberOfLines={1}>{r.sub}</Text> : null}
                  </View>
                  <IconChevron color={colors.muted} />
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
  content: { paddingHorizontal: 20 },
  profile: { flexDirection: "row", alignItems: "center", gap: 14, backgroundColor: colors.surfaceSecondary, borderRadius: 20, borderWidth: 1, borderColor: colors.border, padding: 14 },
  avatar: { width: 54, height: 54, borderRadius: 999, backgroundColor: colors.brandTertiary, alignItems: "center", justifyContent: "center", overflow: "hidden", borderWidth: 1.5, borderColor: colors.borderStrong },
  avatarImg: { width: "100%", height: "100%" },
  avatarText: { color: colors.brandPrimary, fontSize: 22, fontWeight: "900" },
  name: { color: colors.onSurface, fontSize: 18, fontWeight: "900" },
  email: { color: colors.muted, fontSize: 13, marginTop: 2 },
  group: { color: colors.muted, fontSize: 11, letterSpacing: 3, fontWeight: "800", fontFamily: MONO, marginTop: 24, marginBottom: 10 },
  card: { backgroundColor: colors.surfaceSecondary, borderRadius: 18, borderWidth: 1, borderColor: colors.border, overflow: "hidden" },
  row: { flexDirection: "row", alignItems: "center", gap: 12, paddingHorizontal: 14, paddingVertical: 13 },
  rowBorder: { borderTopWidth: 1, borderTopColor: colors.divider },
  rowIcon: { width: 38, height: 38, borderRadius: 12, backgroundColor: colors.surface, alignItems: "center", justifyContent: "center" },
  rowLabel: { color: colors.onSurface, fontSize: 15, fontWeight: "800" },
  rowSub: { color: colors.muted, fontSize: 12, marginTop: 2 },
}));
