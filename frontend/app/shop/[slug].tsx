import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { useState } from "react";
import { Pressable, ScrollView, Text, View, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { BackHeader } from "@/src/components/back-header";
import { IconBag, IconChat, IconCheck, IconTicket } from "@/src/components/icons";
import { GhostButton, Loading, Notice, PrimaryButton, Stepper } from "@/src/components/ui";
import { apiGet, apiPost } from "@/src/lib/api";
import { useCart } from "@/src/lib/cart-context";
import { MONO } from "@/src/lib/fonts";
import { errorMessage, openWhatsApp, siteGet, siteImg, useContact, type Product } from "@/src/lib/site";
import { makeStyles, useTheme } from "@/src/theme";

export default function ProductDetail() {
  const styles = useStyles();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const qc = useQueryClient();
  const { width } = useWindowDimensions();
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const { addItem } = useCart();
  const { whatsappNumber } = useContact();

  const product = useQuery<Product>({ queryKey: ["site", "product", slug], queryFn: () => siteGet(`/products/${slug}`) });
  const p = product.data;

  const [active, setActive] = useState(0);
  const [pickedSize, setSize] = useState("");
  const [qty, setQty] = useState(1);
  const [notice, setNotice] = useState<{ tone: "ok" | "error" | "info"; text: string } | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);

  const payment = useQuery({
    queryKey: ["site", "payment", sessionId],
    queryFn: () => apiGet(`/api/site/payments/${sessionId}`),
    enabled: !!sessionId,
    refetchInterval: (q) => ((q.state.data as any)?.payment_status === "paid" ? false : 4000),
  });

  const checkout = useMutation({
    mutationFn: () => apiPost("/api/site/checkout", { slug: p!.slug, quantity: qty, size: size || null }),
    onSuccess: async (data: any) => {
      setSessionId(data.session_id);
      qc.invalidateQueries({ queryKey: ["site", "my"] });
      await WebBrowser.openBrowserAsync(data.checkout_url);
      qc.invalidateQueries({ queryKey: ["site", "payment", data.session_id] });
    },
    onError: (e) => setNotice({ tone: "error", text: errorMessage(e, "Errore. Riprova o contattaci su WhatsApp.") }),
  });

  if (product.isError) {
    return (
      <View style={styles.root}>
        <BackHeader title="SHOP" />
        <Text style={styles.missing}>Prodotto non trovato.</Text>
      </View>
    );
  }
  if (!p) {
    return (
      <View style={styles.root}>
        <BackHeader title="SHOP" />
        <Loading />
      </View>
    );
  }

  // Middle size preselected, as on the site.
  const size = pickedSize || (p.sizes?.length ? p.sizes[Math.floor(p.sizes.length / 2)] || p.sizes[0] : "");
  const gallery = p.gallery?.length ? p.gallery : [p.image];
  const total = p.price * qty;
  const needsSize = !!p.sizes?.length && !size;
  const paid = (payment.data as any)?.payment_status === "paid";

  const addToCart = () => {
    if (needsSize) return setNotice({ tone: "error", text: "Seleziona una taglia" });
    addItem(p, { size, quantity: qty });
    setNotice({ tone: "ok", text: `${p.name} aggiunto al carrello` });
  };

  const whatsappOrder = () => {
    const lines = ["Ciao Glitz! Vorrei ordinare:", "", `Prodotto: ${p.name}`, size && `Taglia: ${size}`, `Quantità: ${qty}`, `Totale: € ${total}`].filter(Boolean);
    openWhatsApp(whatsappNumber, lines.join("\n"));
  };

  return (
    <View style={styles.root} testID="product-screen">
      <BackHeader title="SHOP" />
      <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom + 32 }} showsVerticalScrollIndicator={false}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(e) => setActive(Math.round(e.nativeEvent.contentOffset.x / width))}
        >
          {gallery.map((g, i) => (
            <Image
              key={i}
              source={{ uri: siteImg(g) }}
              style={{ width, height: width, backgroundColor: "#000000" }}
              contentFit={p.slug === "gift-card" && i === 0 ? "contain" : "cover"}
            />
          ))}
        </ScrollView>
        {gallery.length > 1 ? (
          <View style={styles.dots}>
            {gallery.map((_, i) => (
              <View key={i} style={[styles.dot, i === active && styles.dotActive]} />
            ))}
          </View>
        ) : null}

        <View style={styles.body}>
          {p.subtitle ? <Text style={styles.kicker}>{p.subtitle.toUpperCase()}</Text> : null}
          <Text style={styles.title}>{p.name}</Text>
          <View style={styles.priceRow}>
            <Text style={styles.price}>€ {p.price}</Text>
            {p.color ? <Text style={styles.color}>{p.color.toUpperCase()}</Text> : null}
          </View>
          {p.description ? <Text style={styles.desc}>{p.description}</Text> : null}
          {(p.details ?? []).map((d) => (
            <View key={d} style={styles.detail}>
              <IconCheck color={colors.brandPrimary} size={16} />
              <Text style={styles.detailText}>{d}</Text>
            </View>
          ))}

          {p.sizes?.length ? (
            <>
              <Text style={styles.label}>TAGLIA *</Text>
              <View style={styles.sizes}>
                {p.sizes.map((sz) => (
                  <Pressable key={sz} testID={`size-${sz}`} style={[styles.size, size === sz && styles.sizeActive]} onPress={() => setSize(sz)}>
                    <Text style={[styles.sizeText, size === sz && styles.sizeTextActive]}>{sz}</Text>
                  </Pressable>
                ))}
              </View>
            </>
          ) : null}

          <View style={styles.qtyRow}>
            <View>
              <Text style={styles.label}>QUANTITÀ</Text>
              <Stepper value={qty} onChange={setQty} testID="qty" />
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <Text style={styles.label}>TOTALE</Text>
              <Text style={styles.total} testID="detail-total">€ {total}</Text>
            </View>
          </View>

          {notice ? <Notice tone={notice.tone} text={notice.text} /> : null}
          {sessionId ? (
            <Notice
              tone={paid ? "ok" : "info"}
              text={paid ? "Pagamento completato! Riceverai la conferma via email." : "In attesa del pagamento su Stripe… Torna qui quando hai finito."}
            />
          ) : null}

          <PrimaryButton testID="add-to-cart" label="AGGIUNGI AL CARRELLO" icon={<IconBag color={colors.onBrandPrimary} size={18} />} onPress={addToCart} style={{ marginTop: 18 }} />
          <View style={styles.row2}>
            <GhostButton
              testID="checkout-stripe"
              label={checkout.isPending ? "…" : "PAGA CON CARTA"}
              icon={<IconTicket color={colors.onSurface} size={16} />}
              disabled={checkout.isPending}
              onPress={() => {
                if (needsSize) return setNotice({ tone: "error", text: "Seleziona una taglia" });
                setNotice(null);
                checkout.mutate();
              }}
              style={{ flex: 1 }}
            />
            <GhostButton testID="checkout-whatsapp" label="WHATSAPP" icon={<IconChat color={colors.onSurface} size={16} />} onPress={whatsappOrder} style={{ flex: 1 }} />
          </View>
          <Text style={styles.small}>Pagamento sicuro con Stripe. Spedizione 24-48h in Italia o ritiro in club.</Text>
          <GhostButton label="VAI AL CARRELLO" onPress={() => router.push("/carrello")} style={{ marginTop: 10 }} />
        </View>
      </ScrollView>
    </View>
  );
}

const useStyles = makeStyles((colors) => ({
  root: { flex: 1, backgroundColor: colors.surface },
  missing: { color: colors.muted, fontSize: 15, textAlign: "center", marginTop: 60 },
  dots: { flexDirection: "row", justifyContent: "center", gap: 6, marginTop: 10 },
  dot: { width: 6, height: 6, borderRadius: 999, backgroundColor: colors.divider },
  dotActive: { backgroundColor: colors.brandPrimary, width: 18 },
  body: { paddingHorizontal: 20, paddingTop: 16 },
  kicker: { color: colors.brandPrimary, fontSize: 11, letterSpacing: 2, fontWeight: "800" },
  title: { color: colors.onSurface, fontSize: 28, fontWeight: "900", marginTop: 4, textTransform: "uppercase" },
  priceRow: { flexDirection: "row", alignItems: "baseline", gap: 12, marginTop: 8 },
  price: { color: colors.onSurface, fontSize: 30, fontWeight: "900", fontFamily: MONO },
  color: { color: colors.muted, fontSize: 11, letterSpacing: 1.5 },
  desc: { color: colors.brandSecondary, fontSize: 15, lineHeight: 22, marginTop: 12 },
  detail: { flexDirection: "row", gap: 8, marginTop: 8, alignItems: "flex-start" },
  detailText: { color: colors.brandSecondary, fontSize: 13, flex: 1, lineHeight: 19 },
  label: { color: colors.muted, fontSize: 11, letterSpacing: 2.5, fontWeight: "700", fontFamily: MONO, marginTop: 20, marginBottom: 10 },
  sizes: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  size: { minWidth: 48, borderRadius: 10, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surfaceSecondary, paddingHorizontal: 14, paddingVertical: 10, alignItems: "center" },
  sizeActive: { backgroundColor: colors.brandPrimary, borderColor: colors.brandPrimary },
  sizeText: { color: colors.brandSecondary, fontSize: 14, fontWeight: "800" },
  sizeTextActive: { color: colors.onBrandPrimary },
  qtyRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end" },
  total: { color: colors.onSurface, fontSize: 26, fontWeight: "900", fontFamily: MONO },
  row2: { flexDirection: "row", gap: 10, marginTop: 10 },
  small: { color: colors.muted, fontSize: 11, textAlign: "center", marginTop: 12 },
}));
