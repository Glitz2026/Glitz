import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { BackHeader } from "@/src/components/back-header";
import { IconChat, IconClose } from "@/src/components/icons";
import { Chip, Empty, Field, GhostButton, Notice, PrimaryButton, Stepper } from "@/src/components/ui";
import { apiPost } from "@/src/lib/api";
import { useAuth } from "@/src/lib/auth-context";
import { useCart } from "@/src/lib/cart-context";
import { MONO } from "@/src/lib/fonts";
import { openWhatsApp, siteImg, useContact } from "@/src/lib/site";
import { makeStyles, useTheme } from "@/src/theme";

/** Shop cart checkout: saved on the site's order list, confirmed on WhatsApp (as on the website). */
export default function Carrello() {
  const styles = useStyles();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const qc = useQueryClient();
  const { user } = useAuth();
  const { items, total, count, updateQuantity, removeItem, clear } = useCart();
  const { whatsappNumber } = useContact();

  const [form, setForm] = useState(() => ({ name: user?.name ?? "", phone: "", email: user?.email ?? "", address: "", note: "" }));
  const [shipping, setShipping] = useState<"spedizione" | "ritiro">("spedizione");
  const [notice, setNotice] = useState<{ tone: "ok" | "error" | "info"; text: string } | null>(null);

  const order = useMutation({
    mutationFn: () =>
      apiPost("/api/site/orders", {
        items: items.map((it) => ({ product_id: it.product_id, product_name: it.product_name, unit_price: it.unit_price, quantity: it.quantity, size: it.size })),
        name: form.name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim() || null,
        address: shipping === "spedizione" ? form.address.trim() || null : null,
        shipping_method: shipping,
        note: form.note.trim() || null,
      }),
  });

  const submit = async () => {
    setNotice(null);
    if (!form.name.trim() || form.phone.trim().length < 5) return setNotice({ tone: "error", text: "Compila nome e telefono" });
    const lines = [
      "Ciao Glitz! Vorrei ordinare dallo shop:",
      "",
      ...items.map((it) => `${it.quantity}× ${it.product_name}${it.size ? ` (${it.size})` : ""} — € ${it.unit_price} cad.`),
      "",
      `Totale: € ${total}`,
      `Consegna: ${shipping === "spedizione" ? "Spedizione a domicilio" : "Ritiro in club"}`,
      "",
      `Nome: ${form.name.trim()}`,
      `Telefono: ${form.phone.trim()}`,
      form.email.trim() && `Email: ${form.email.trim()}`,
      shipping === "spedizione" && form.address.trim() && `Indirizzo: ${form.address.trim()}`,
      form.note.trim() && `Note: ${form.note.trim()}`,
    ].filter(Boolean);
    let saved = true;
    try {
      await order.mutateAsync();
      qc.invalidateQueries({ queryKey: ["site", "my"] });
    } catch {
      // WhatsApp stays the primary confirmation, as on the site.
      saved = false;
    }
    await openWhatsApp(whatsappNumber, lines.join("\n"));
    clear();
    setNotice(
      saved
        ? { tone: "ok", text: "Ordine inviato! Conferma su WhatsApp e lo trovi nel tuo profilo." }
        : { tone: "info", text: "Ordine inviato su WhatsApp, ma non salvato sul gestionale. Lo staff lo riceverà comunque via chat." },
    );
  };

  return (
    <View style={styles.root} testID="cart-screen">
      <BackHeader title={`CARRELLO${count ? ` (${count})` : ""}`} />
      <KeyboardAwareScrollView contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 24 }]} bottomOffset={24} keyboardShouldPersistTaps="handled">
        {notice ? <Notice tone={notice.tone} text={notice.text} /> : null}
        {items.length === 0 ? (
          <>
            <Empty text="Il carrello è vuoto." />
            <GhostButton label="VAI ALLO SHOP" onPress={() => router.replace("/shop")} style={{ marginTop: 12 }} />
          </>
        ) : (
          <>
            {items.map((it) => (
              <View key={`${it.product_id}::${it.size || ""}`} testID={`cart-item-${it.product_id}`} style={styles.item}>
                <Image source={{ uri: siteImg(it.image) }} style={styles.thumb} contentFit="cover" />
                <View style={{ flex: 1 }}>
                  <Text style={styles.name} numberOfLines={1}>{it.product_name}</Text>
                  {it.size ? <Text style={styles.size}>Taglia {it.size}</Text> : null}
                  <View style={styles.itemRow}>
                    <Stepper value={it.quantity} min={0} onChange={(q) => updateQuantity(it.product_id, it.size, q)} />
                    <Text style={styles.linePrice}>€ {it.unit_price * it.quantity}</Text>
                  </View>
                </View>
                <Pressable onPress={() => removeItem(it.product_id, it.size)} hitSlop={10} testID={`cart-remove-${it.product_id}`}>
                  <IconClose color={colors.muted} size={18} />
                </Pressable>
              </View>
            ))}

            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>TOTALE</Text>
              <Text style={styles.total} testID="cart-total">€ {total}</Text>
            </View>

            <View style={styles.shipRow}>
              <Chip label="SPEDIZIONE" active={shipping === "spedizione"} onPress={() => setShipping("spedizione")} />
              <Chip label="RITIRO IN CLUB" active={shipping === "ritiro"} onPress={() => setShipping("ritiro")} />
            </View>

            <Field testID="cart-name" label="Nome" required value={form.name} onChangeText={(v) => setForm({ ...form, name: v })} />
            <Field testID="cart-phone" label="Telefono" required value={form.phone} onChangeText={(v) => setForm({ ...form, phone: v })} keyboardType="phone-pad" />
            <Field testID="cart-email" label="Email" value={form.email} onChangeText={(v) => setForm({ ...form, email: v })} keyboardType="email-address" autoCapitalize="none" />
            {shipping === "spedizione" ? (
              <Field testID="cart-address" label="Indirizzo di spedizione" value={form.address} onChangeText={(v) => setForm({ ...form, address: v })} />
            ) : null}
            <Field label="Note" value={form.note} onChangeText={(v) => setForm({ ...form, note: v })} multiline />

            <PrimaryButton
              testID="cart-submit"
              label="ORDINA VIA WHATSAPP"
              icon={<IconChat color={colors.onBrandPrimary} size={18} />}
              onPress={submit}
              loading={order.isPending}
              style={{ marginTop: 20 }}
            />
            <Text style={styles.small}>{'Preferisci pagare con carta? Apri il prodotto e scegli "Paga con carta" (Stripe).'}</Text>
          </>
        )}
      </KeyboardAwareScrollView>
    </View>
  );
}

const useStyles = makeStyles((colors) => ({
  root: { flex: 1, backgroundColor: colors.surface },
  content: { paddingHorizontal: 20, paddingTop: 8 },
  item: { flexDirection: "row", gap: 12, alignItems: "center", backgroundColor: colors.surfaceSecondary, borderRadius: 16, borderWidth: 1, borderColor: colors.border, padding: 10, marginTop: 10 },
  thumb: { width: 70, height: 70, borderRadius: 12, backgroundColor: "#000000" },
  name: { color: colors.onSurface, fontSize: 14, fontWeight: "900", textTransform: "uppercase" },
  size: { color: colors.muted, fontSize: 12, marginTop: 2 },
  itemRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 8 },
  linePrice: { color: colors.onSurface, fontSize: 15, fontWeight: "900", fontFamily: MONO },
  totalRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 20, paddingTop: 16, borderTopWidth: 1, borderTopColor: colors.divider },
  totalLabel: { color: colors.muted, fontSize: 12, letterSpacing: 3, fontWeight: "800", fontFamily: MONO },
  total: { color: colors.onSurface, fontSize: 26, fontWeight: "900", fontFamily: MONO },
  shipRow: { flexDirection: "row", gap: 10, marginTop: 16 },
  small: { color: colors.muted, fontSize: 11, textAlign: "center", marginTop: 12, lineHeight: 16 },
}));
