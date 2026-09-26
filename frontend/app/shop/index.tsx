import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { BackHeader } from "@/src/components/back-header";
import { IconBag, IconChat } from "@/src/components/icons";
import { GhostButton, Loading, PageIntro, SectionTitle } from "@/src/components/ui";
import { useCart } from "@/src/lib/cart-context";
import { MONO } from "@/src/lib/fonts";
import { openWhatsApp, siteImg, useContact, useProducts, useSettings } from "@/src/lib/site";
import { makeStyles, useTheme } from "@/src/theme";

const DEFAULT_STEPS = [
  { n: "01", title: "Scegli il prodotto", body: "Apri la pagina prodotto, seleziona taglia e quantità." },
  { n: "02", title: "Paga con Stripe", body: "Checkout sicuro con carta di credito. O ordina via WhatsApp." },
  { n: "03", title: "Ricevi o ritira", body: "Spedizione 24-48h in Italia o ritiro in club." },
];

export default function Shop() {
  const styles = useStyles();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const products = useProducts();
  const settings = useSettings();
  const { count } = useCart();
  const { whatsappNumber } = useContact();
  const s = settings.data ?? {};
  const chips: string[] = s.shop_chips?.length ? s.shop_chips : ["Stripe checkout", "Spedizione 24-48h", "Ritiro in club"];
  const steps: { n: string; title: string; body: string }[] = s.shop_howto_steps?.length ? s.shop_howto_steps : DEFAULT_STEPS;

  return (
    <View style={styles.root} testID="shop-screen">
      <BackHeader title="SHOP" />
      <ScrollView contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 100 }]} showsVerticalScrollIndicator={false}>
        <PageIntro
          kicker={s.shop_kicker || "Capsule Collection 2027"}
          title={s.shop_title || "Glitz Shop"}
          body={s.shop_description || "Il merchandise ufficiale del Glitz Club — pensato per l'estate, il mare e le tue serate."}
        />
        <View style={styles.chips}>
          {chips.map((c) => (
            <Text key={c} style={styles.chip}>{c.toUpperCase()}</Text>
          ))}
        </View>

        {products.isLoading ? <Loading /> : null}
        <View style={styles.grid}>
          {(products.data ?? []).map((p) => (
            <Pressable key={p.id} testID={`product-card-${p.slug}`} style={styles.card} onPress={() => router.push(`/shop/${p.slug}`)}>
              <Image source={{ uri: siteImg(p.image) }} style={styles.img} contentFit={p.slug === "gift-card" ? "contain" : "cover"} />
              {p.badge ? (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{p.badge}</Text>
                </View>
              ) : null}
              <View style={styles.body}>
                {p.subtitle ? <Text style={styles.sub} numberOfLines={1}>{p.subtitle}</Text> : null}
                <Text style={styles.name} numberOfLines={2}>{p.name}</Text>
                <Text style={styles.price}>€ {p.price}</Text>
              </View>
            </Pressable>
          ))}
        </View>

        <SectionTitle title={(s.shop_howto_title || "3 step. Fatta.").toUpperCase()} />
        {steps.map((st) => (
          <View key={st.n} style={styles.step}>
            <Text style={styles.stepN}>{st.n}</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.stepTitle}>{st.title}</Text>
              <Text style={styles.stepBody}>{st.body}</Text>
            </View>
          </View>
        ))}
        <GhostButton
          label="INFO VIA WHATSAPP"
          icon={<IconChat color={colors.onSurface} size={18} />}
          onPress={() => openWhatsApp(whatsappNumber, "Ciao Glitz! Avrei una domanda sullo shop.")}
          style={{ marginTop: 12 }}
        />
      </ScrollView>

      {count > 0 ? (
        <Pressable testID="shop-cart-bar" style={[styles.cartBar, { bottom: insets.bottom + 14 }]} onPress={() => router.push("/carrello")}>
          <IconBag color={colors.onBrandPrimary} size={20} />
          <Text style={styles.cartText}>VAI AL CARRELLO · {count}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const useStyles = makeStyles((colors) => ({
  root: { flex: 1, backgroundColor: colors.surface },
  content: { paddingHorizontal: 20, paddingTop: 8 },
  chips: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 6, marginBottom: 18 },
  chip: { color: colors.muted, fontSize: 10, letterSpacing: 1.5, borderWidth: 1, borderColor: colors.border, borderRadius: 999, paddingHorizontal: 10, paddingVertical: 6, overflow: "hidden" },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  card: { width: "47.8%", borderRadius: 18, overflow: "hidden", backgroundColor: colors.surfaceSecondary, borderWidth: 1, borderColor: colors.border },
  img: { width: "100%", aspectRatio: 0.85, backgroundColor: "#000000" },
  badge: { position: "absolute", top: 10, left: 10, backgroundColor: colors.brandPrimary, borderRadius: 999, paddingHorizontal: 8, paddingVertical: 3 },
  badgeText: { color: colors.onBrandPrimary, fontSize: 9, fontWeight: "900", letterSpacing: 1 },
  body: { padding: 12 },
  sub: { color: colors.muted, fontSize: 10, letterSpacing: 1, textTransform: "uppercase" },
  name: { color: colors.onSurface, fontSize: 14, fontWeight: "900", marginTop: 3, textTransform: "uppercase" },
  price: { color: colors.brandPrimary, fontSize: 17, fontWeight: "900", marginTop: 6, fontFamily: MONO },
  step: { flexDirection: "row", gap: 14, marginBottom: 14 },
  stepN: { color: colors.brandPrimary, fontSize: 26, fontWeight: "900" },
  stepTitle: { color: colors.onSurface, fontSize: 15, fontWeight: "800", textTransform: "uppercase" },
  stepBody: { color: colors.brandSecondary, fontSize: 13, lineHeight: 19, marginTop: 3 },
  cartBar: { position: "absolute", left: 20, right: 20, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 10, backgroundColor: colors.brandPrimary, borderRadius: 18, paddingVertical: 16 },
  cartText: { color: colors.onBrandPrimary, fontSize: 14, fontWeight: "900", letterSpacing: 1.5 },
}));
