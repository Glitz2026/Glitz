import { Linking, Platform, Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { BackHeader } from "@/src/components/back-header";
import { IconChat, IconChevron, IconClock, IconInstagram, IconMail, IconMusic, IconPin } from "@/src/components/icons";
import { PageIntro, PrimaryButton } from "@/src/components/ui";
import { MONO } from "@/src/lib/fonts";
import { openWhatsApp, useContact, useSettings } from "@/src/lib/site";
import { makeStyles, useTheme } from "@/src/theme";

export default function Contatti() {
  const styles = useStyles();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const settings = useSettings();
  const c = useContact();

  const openMaps = () => {
    const q = encodeURIComponent(c.address);
    const url = Platform.OS === "ios" ? `http://maps.apple.com/?q=${q}` : `https://www.google.com/maps/search/?api=1&query=${q}`;
    Linking.openURL(url);
  };

  const rows = [
    { key: "whatsapp", label: "WhatsApp", value: c.whatsappDisplay, Icon: IconChat, onPress: () => openWhatsApp(c.whatsappNumber, "Ciao Glitz, avrei un'informazione da chiedere.") },
    { key: "email", label: "Email", value: c.email, Icon: IconMail, onPress: () => Linking.openURL(`mailto:${c.email}`) },
    { key: "instagram", label: "Instagram", value: c.instagramHandle, Icon: IconInstagram, onPress: () => Linking.openURL(c.instagram) },
    { key: "tiktok", label: "TikTok", value: "@glitzclubofficial", Icon: IconMusic, onPress: () => Linking.openURL(c.tiktok) },
    { key: "address", label: "Indirizzo", value: c.address, Icon: IconPin, onPress: openMaps },
  ];

  return (
    <View style={styles.root} testID="contatti-screen">
      <BackHeader title="CONTATTI" />
      <ScrollView contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 24 }]} showsVerticalScrollIndicator={false}>
        <PageIntro kicker={settings.data?.contact_kicker || "Contatti"} title={settings.data?.contact_title || "Scrivici"} />
        {rows.map((r) => (
          <Pressable key={r.key} testID={`contact-${r.key}`} style={styles.row} onPress={r.onPress}>
            <View style={styles.icon}>
              <r.Icon color={colors.brandPrimary} size={22} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>{r.label.toUpperCase()}</Text>
              <Text style={styles.value}>{r.value}</Text>
            </View>
            <IconChevron color={colors.muted} />
          </Pressable>
        ))}
        <View style={styles.row}>
          <View style={styles.icon}>
            <IconClock color={colors.brandPrimary} size={22} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>ORARI</Text>
            <Text style={styles.value}>{c.hours}</Text>
          </View>
        </View>
        <PrimaryButton label="APRI IN MAPPE" icon={<IconPin color={colors.onBrandPrimary} size={18} />} onPress={openMaps} style={{ marginTop: 18 }} />
      </ScrollView>
    </View>
  );
}

const useStyles = makeStyles((colors) => ({
  root: { flex: 1, backgroundColor: colors.surface },
  content: { paddingHorizontal: 20, paddingTop: 8 },
  row: { flexDirection: "row", alignItems: "center", gap: 14, backgroundColor: colors.surfaceSecondary, borderRadius: 16, borderWidth: 1, borderColor: colors.border, padding: 14, marginTop: 12 },
  icon: { width: 46, height: 46, borderRadius: 14, backgroundColor: colors.surface, alignItems: "center", justifyContent: "center" },
  label: { color: colors.muted, fontSize: 10, letterSpacing: 2, fontWeight: "800", fontFamily: MONO },
  value: { color: colors.onSurface, fontSize: 15, fontWeight: "700", marginTop: 3, lineHeight: 21 },
}));
