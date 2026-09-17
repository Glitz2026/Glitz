import { ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useQuery } from "@tanstack/react-query";

import { apiGet } from "@/src/lib/api";
import { MONO } from "@/src/lib/fonts";
import { makeStyles } from "@/src/theme";

export default function Ordina() {
  const styles = useStyles();
  const insets = useSafeAreaInsets();
  const menu = useQuery({ queryKey: ["menu"], queryFn: () => apiGet("/api/menu") });
  const categories = menu.data?.menu ?? [];

  return (
    <View style={styles.root} testID="ordina-screen">
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <Text style={styles.kicker}>BAR & TAVOLI</Text>
        <Text style={styles.title}>Ordina</Text>
      </View>
      <ScrollView contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 24 }]} showsVerticalScrollIndicator={false}>
        <View style={styles.banner}>
          <Text style={styles.bannerText}>
            Ordina e ritira arriva a breve. Per ora sfoglia il menu: al tavolo chiama il cameriere dal
            tab Aiuto.
          </Text>
        </View>

        {categories.map((cat: any) => (
          <View key={cat.category} style={styles.cat}>
            <Text style={styles.catTitle}>{cat.category}</Text>
            {cat.items.map((it: any) => (
              <View key={it.id} testID={`menu-item-${it.id}`} style={styles.item}>
                <View style={styles.itemLeft}>
                  <Text style={styles.itemName}>{it.name}</Text>
                  <Text style={styles.itemDesc}>{it.desc}</Text>
                  {!it.alcoholic ? <Text style={styles.analc}>ANALCOLICO</Text> : null}
                </View>
                <Text style={styles.price}>€{it.price}</Text>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const useStyles = makeStyles((colors) => ({
  root: { flex: 1, backgroundColor: colors.surface },
  header: { paddingHorizontal: 20, paddingBottom: 14 },
  kicker: { color: colors.brandPrimary, fontSize: 11, letterSpacing: 4, fontWeight: "800", fontFamily: MONO },
  title: { color: colors.onSurface, fontSize: 30, fontWeight: "900", marginTop: 4 },
  content: { paddingHorizontal: 20 },
  banner: { backgroundColor: colors.brandTertiary, borderRadius: 14, padding: 16, borderWidth: 1, borderColor: colors.border },
  bannerText: { color: colors.brandSecondary, fontSize: 13, lineHeight: 20 },
  cat: { marginTop: 24 },
  catTitle: { color: colors.muted, fontSize: 12, letterSpacing: 3, fontWeight: "700", fontFamily: MONO, marginBottom: 12 },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.surfaceSecondary,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    marginBottom: 10,
  },
  itemLeft: { flex: 1, paddingRight: 12 },
  itemName: { color: colors.onSurface, fontSize: 16, fontWeight: "800" },
  itemDesc: { color: colors.muted, fontSize: 13, marginTop: 3 },
  analc: { color: colors.success, fontSize: 10, letterSpacing: 2, fontWeight: "800", marginTop: 6, fontFamily: MONO },
  price: { color: colors.brandPrimary, fontSize: 18, fontWeight: "900", fontFamily: MONO },
}));
