import { useMemo, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { FloorPlan, type Table } from "@/src/components/floor-plan";
import { LogoHeader } from "@/src/components/logo-header";
import { apiGet, apiPost } from "@/src/lib/api";
import { MONO } from "@/src/lib/fonts";
import { makeStyles, useTheme } from "@/src/theme";

const WAITER = [
  { id: "acqua", label: "Acqua" },
  { id: "ghiaccio", label: "Ghiaccio" },
  { id: "mixer", label: "Mixer" },
  { id: "nuovo_ordine", label: "Nuovo ordine" },
  { id: "pulizia", label: "Pulizia" },
  { id: "assistenza", label: "Assistenza" },
];
const CALL_LABEL: Record<string, string> = Object.fromEntries(WAITER.map((w) => [w.id, w.label]));
const ORDER_STATUS: Record<string, { label: string; tone: "warn" | "info" | "ok" }> = {
  received: { label: "RICEVUTO", tone: "warn" },
  preparing: { label: "IN PREPARAZIONE", tone: "info" },
  ready: { label: "PRONTO", tone: "ok" },
};

export default function Ordina() {
  const styles = useStyles();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const qc = useQueryClient();

  const [table, setTable] = useState<Table | null>(null);
  const [cart, setCart] = useState<Record<string, number>>({});
  const zone = table?.name ?? null;

  const menu = useQuery({ queryKey: ["menu"], queryFn: () => apiGet("/api/menu") });
  const zones = useQuery({ queryKey: ["zones"], queryFn: () => apiGet("/api/tables/zones") });
  const orders = useQuery({ queryKey: ["orders"], queryFn: () => apiGet("/api/orders"), refetchInterval: 5000 });
  const calls = useQuery({ queryKey: ["waiter-calls"], queryFn: () => apiGet("/api/waiter-calls"), refetchInterval: 5000 });

  const callMut = useMutation({
    mutationFn: (type: string) => apiPost("/api/waiter-calls", { type, zone }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["waiter-calls"] }),
  });
  const orderMut = useMutation({
    mutationFn: (items: any[]) => apiPost("/api/orders", { items, zone }),
    onSuccess: () => {
      setCart({});
      qc.invalidateQueries({ queryKey: ["orders"] });
    },
  });

  const categories = menu.data?.menu ?? [];
  const itemIndex = useMemo(() => {
    const idx: Record<string, any> = {};
    categories.forEach((c: any) => c.items.forEach((it: any) => (idx[it.id] = it)));
    return idx;
  }, [categories]);

  const cartItems = Object.entries(cart)
    .filter(([, q]) => q > 0)
    .map(([id, q]) => ({ id, name: itemIndex[id]?.name, price: itemIndex[id]?.price, qty: q }));
  const cartCount = cartItems.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cartItems.reduce((s, i) => s + (i.price ?? 0) * i.qty, 0);

  const setQty = (id: string, delta: number) =>
    setCart((c) => ({ ...c, [id]: Math.max(0, (c[id] ?? 0) + delta) }));

  const orderList = orders.data?.orders ?? [];
  const callList = calls.data?.calls ?? [];
  const zoneList: Table[] = zones.data?.zones ?? [];
  const needTable = !table;

  return (
    <View style={styles.root} testID="ordina-screen">
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <LogoHeader />
        <Text style={styles.kicker}>SERVIZIO AL TAVOLO</Text>
        <Text style={styles.title}>Ordina</Text>
      </View>

      <ScrollView
        contentContainerStyle={[styles.content, { paddingBottom: (cartCount > 0 ? 96 : 24) + insets.bottom }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Piantina tavoli */}
        <Text style={styles.section}>IL TUO TAVOLO · PIANTINA</Text>
        <FloorPlan tables={zoneList} selectedId={table?.id ?? null} onSelect={setTable} />
        <View style={[styles.selBanner, table ? styles.selBannerOk : null]}>
          <Text style={styles.selText}>
            {table ? `Sei al ${table.name} · ${table.area}` : "Tocca il tuo tavolo sulla piantina"}
          </Text>
        </View>

        {/* Chiama il cameriere */}
        <Text style={styles.section}>CHIAMA IL CAMERIERE</Text>
        <View style={[styles.waiterGrid, needTable && styles.disabled]}>
          {WAITER.map((w) => (
            <Pressable
              key={w.id}
              testID={`waiter-${w.id}`}
              style={styles.waiterBtn}
              disabled={needTable}
              onPress={() => callMut.mutate(w.id)}
            >
              <Text style={styles.waiterText}>{w.label}</Text>
            </Pressable>
          ))}
        </View>
        {callList.length > 0 ? (
          <View style={styles.callList}>
            {callList.slice(0, 3).map((c: any) => (
              <View key={c.id} testID={`call-${c.id}`} style={styles.callRow}>
                <Text style={styles.callName}>{CALL_LABEL[c.type] ?? c.type} · {c.zone ?? "—"}</Text>
                <View style={[styles.statusPill, c.status === "taken_in_charge" ? styles.pillOk : styles.pillWarn]}>
                  <Text style={styles.statusText}>{c.status === "taken_in_charge" ? "PRESA IN CARICO" : "INVIATA"}</Text>
                </View>
              </View>
            ))}
          </View>
        ) : null}

        {/* Menu */}
        <Text style={styles.section}>MENU</Text>
        {categories.map((cat: any) => (
          <View key={cat.category} style={styles.cat}>
            <Text style={styles.catTitle}>{cat.category}</Text>
            {cat.items.map((it: any) => {
              const q = cart[it.id] ?? 0;
              return (
                <View key={it.id} testID={`menu-item-${it.id}`} style={styles.item}>
                  <View style={styles.itemLeft}>
                    <Text style={styles.itemName}>{it.name}</Text>
                    <Text style={styles.itemDesc}>{it.desc}</Text>
                    {!it.alcoholic ? <Text style={styles.analc}>ANALCOLICO</Text> : null}
                    <Text style={styles.price}>€{it.price}</Text>
                  </View>
                  <View style={styles.stepper}>
                    <Pressable testID={`minus-${it.id}`} style={styles.stepBtn} onPress={() => setQty(it.id, -1)} disabled={q === 0}>
                      <Text style={[styles.stepSign, q === 0 && styles.stepDim]}>–</Text>
                    </Pressable>
                    <Text style={styles.qty}>{q}</Text>
                    <Pressable testID={`plus-${it.id}`} style={styles.stepBtnAdd} onPress={() => setQty(it.id, 1)}>
                      <Text style={styles.stepSignAdd}>+</Text>
                    </Pressable>
                  </View>
                </View>
              );
            })}
          </View>
        ))}

        {/* Orders */}
        <Text style={styles.section}>I MIEI ORDINI</Text>
        {orderList.length === 0 ? (
          <Text style={styles.empty}>Nessun ordine ancora. Aggiungi qualcosa dal menu.</Text>
        ) : (
          orderList.map((o: any) => {
            const st = ORDER_STATUS[o.status] ?? ORDER_STATUS.received;
            return (
              <View key={o.id} testID={`order-${o.id}`} style={styles.order}>
                <View style={styles.orderTop}>
                  <Text style={styles.orderItems} numberOfLines={2}>
                    {o.items.map((i: any) => `${i.qty}× ${i.name}`).join(", ")}
                  </Text>
                  <Text style={styles.orderTotal}>€{o.total}</Text>
                </View>
                <View style={styles.orderBottom}>
                  <Text style={styles.orderZone}>{o.zone ?? "—"}</Text>
                  <View style={[styles.statusPill, st.tone === "ok" ? styles.pillOk : st.tone === "info" ? styles.pillInfo : styles.pillWarn]}>
                    <Text style={styles.statusText}>{st.label}</Text>
                  </View>
                </View>
              </View>
            );
          })
        )}
      </ScrollView>

      {cartCount > 0 ? (
        <View style={[styles.cartBar, { bottom: 16 }]} testID="cart-bar">
          <View style={{ flex: 1 }}>
            <Text style={styles.cartCount} numberOfLines={1}>
              {cartCount} articoli · {zone ?? "nessun tavolo"}
            </Text>
            <Text style={styles.cartTotal}>€{cartTotal.toFixed(2)}</Text>
          </View>
          <Pressable
            testID="submit-order"
            style={[styles.cartBtn, needTable && styles.disabled]}
            onPress={() => !needTable && orderMut.mutate(cartItems)}
            disabled={orderMut.isPending || needTable}
          >
            <Text style={styles.cartBtnText}>{needTable ? "TAVOLO?" : "ORDINA"}</Text>
          </Pressable>
        </View>
      ) : null}
    </View>
  );
}

const useStyles = makeStyles((colors) => ({
  root: { flex: 1, backgroundColor: colors.surface },
  header: { paddingHorizontal: 20, paddingBottom: 14 },
  kicker: { color: colors.brandPrimary, fontSize: 11, letterSpacing: 4, fontWeight: "800", fontFamily: MONO },
  title: { color: colors.onSurface, fontSize: 30, fontWeight: "900", marginTop: 4 },
  content: { paddingHorizontal: 20 },
  section: { color: colors.muted, fontSize: 12, letterSpacing: 3, fontWeight: "700", fontFamily: MONO, marginTop: 24, marginBottom: 14 },
  selBanner: { marginTop: 12, borderRadius: 12, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surfaceTertiary, paddingHorizontal: 14, paddingVertical: 12 },
  selBannerOk: { borderColor: colors.brandPrimary, backgroundColor: colors.brandTertiary },
  selText: { color: colors.onSurface, fontSize: 13, fontWeight: "700" },
  disabled: { opacity: 0.4 },
  chipRow: { gap: 10, paddingRight: 8 },
  chip: { flexShrink: 0, height: 36, paddingHorizontal: 16, borderRadius: 999, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surfaceSecondary, alignItems: "center", justifyContent: "center" },
  chipActive: { borderColor: colors.brandPrimary, backgroundColor: colors.brandPrimary },
  chipText: { color: colors.onSurface, fontSize: 12, fontWeight: "800", letterSpacing: 1 },
  chipTextActive: { color: colors.onBrandPrimary },
  waiterGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  waiterBtn: { borderWidth: 1, borderColor: colors.borderStrong, borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14, backgroundColor: colors.surfaceSecondary },
  waiterText: { color: colors.onSurface, fontSize: 14, fontWeight: "800", letterSpacing: 1 },
  callList: { marginTop: 14, gap: 8 },
  callRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", backgroundColor: colors.surfaceSecondary, borderRadius: 12, borderWidth: 1, borderColor: colors.border, paddingHorizontal: 14, paddingVertical: 12 },
  callName: { color: colors.onSurface, fontSize: 13, fontWeight: "700", flex: 1 },
  cat: { marginTop: 6, marginBottom: 8 },
  catTitle: { color: colors.brandSecondary, fontSize: 12, letterSpacing: 3, fontWeight: "800", fontFamily: MONO, marginBottom: 12, marginTop: 8 },
  item: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", backgroundColor: colors.surfaceSecondary, borderRadius: 14, borderWidth: 1, borderColor: colors.border, padding: 16, marginBottom: 10 },
  itemLeft: { flex: 1, paddingRight: 12 },
  itemName: { color: colors.onSurface, fontSize: 16, fontWeight: "800" },
  itemDesc: { color: colors.muted, fontSize: 13, marginTop: 3 },
  analc: { color: colors.success, fontSize: 10, letterSpacing: 2, fontWeight: "800", marginTop: 6, fontFamily: MONO },
  price: { color: colors.brandPrimary, fontSize: 16, fontWeight: "900", fontFamily: MONO, marginTop: 8 },
  stepper: { flexDirection: "row", alignItems: "center", gap: 10 },
  stepBtn: { width: 34, height: 34, borderRadius: 999, borderWidth: 1, borderColor: colors.border, alignItems: "center", justifyContent: "center", backgroundColor: colors.surfaceTertiary },
  stepBtnAdd: { width: 34, height: 34, borderRadius: 999, alignItems: "center", justifyContent: "center", backgroundColor: colors.brandPrimary },
  stepSign: { color: colors.onSurface, fontSize: 20, fontWeight: "900" },
  stepDim: { color: colors.muted },
  stepSignAdd: { color: colors.onBrandPrimary, fontSize: 20, fontWeight: "900" },
  qty: { color: colors.onSurface, fontSize: 16, fontWeight: "900", minWidth: 18, textAlign: "center", fontFamily: MONO },
  empty: { color: colors.muted, fontSize: 14 },
  order: { backgroundColor: colors.surfaceSecondary, borderRadius: 14, borderWidth: 1, borderColor: colors.border, padding: 16, marginBottom: 10 },
  orderTop: { flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", gap: 12 },
  orderItems: { color: colors.onSurface, fontSize: 14, fontWeight: "700", flex: 1 },
  orderTotal: { color: colors.brandPrimary, fontSize: 16, fontWeight: "900", fontFamily: MONO },
  orderBottom: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 12 },
  orderZone: { color: colors.muted, fontSize: 12, fontFamily: MONO },
  statusPill: { borderRadius: 999, paddingHorizontal: 10, paddingVertical: 4 },
  pillWarn: { backgroundColor: colors.warning },
  pillInfo: { backgroundColor: colors.info },
  pillOk: { backgroundColor: colors.success },
  statusText: { color: "#000000", fontSize: 10, fontWeight: "900", letterSpacing: 1 },
  cartBar: {
    position: "absolute",
    left: 16,
    right: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.surfaceTertiary,
    borderWidth: 1.5,
    borderColor: colors.borderStrong,
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 14,
    shadowColor: colors.brandPrimary,
    shadowOpacity: 0.5,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 0 },
  },
  cartCount: { color: colors.muted, fontSize: 12, fontFamily: MONO },
  cartTotal: { color: colors.onSurface, fontSize: 20, fontWeight: "900", marginTop: 2 },
  cartBtn: { backgroundColor: colors.brandPrimary, borderRadius: 12, paddingHorizontal: 26, paddingVertical: 14 },
  cartBtnText: { color: colors.onBrandPrimary, fontSize: 15, fontWeight: "900", letterSpacing: 2 },
}));
