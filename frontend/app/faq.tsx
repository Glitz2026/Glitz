import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { BackHeader } from "@/src/components/back-header";
import { Loading, PageIntro } from "@/src/components/ui";
import { useFaqs, useSettings } from "@/src/lib/site";
import { makeStyles } from "@/src/theme";

export default function Faq() {
  const styles = useStyles();
  const insets = useSafeAreaInsets();
  const faqs = useFaqs();
  const settings = useSettings();
  const [open, setOpen] = useState<string | null>(null);

  return (
    <View style={styles.root} testID="faq-screen">
      <BackHeader title="FAQ" />
      <ScrollView contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 24 }]} showsVerticalScrollIndicator={false}>
        <PageIntro
          kicker="Domande frequenti"
          title={(settings.data?.home_faq_title || "Info rapide sul Glitz").replace("\n", " ")}
          body={settings.data?.home_faq_intro || "Tutto quello che devi sapere per vivere la miglior notte della tua estate. Location, orari, biglietti, tavoli."}
        />
        {faqs.isLoading ? <Loading /> : null}
        {(faqs.data ?? []).map((f, i) => {
          const isOpen = open === f.id;
          return (
            <Pressable key={f.id} testID={`faq-item-${i}`} style={[styles.item, isOpen && styles.itemOpen]} onPress={() => setOpen(isOpen ? null : f.id)}>
              <View style={styles.head}>
                <Text style={styles.q}>{f.question}</Text>
                <Text style={styles.sign}>{isOpen ? "–" : "+"}</Text>
              </View>
              {isOpen ? <Text style={styles.a}>{f.answer}</Text> : null}
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

const useStyles = makeStyles((colors) => ({
  root: { flex: 1, backgroundColor: colors.surface },
  content: { paddingHorizontal: 20, paddingTop: 8 },
  item: { backgroundColor: colors.surfaceSecondary, borderRadius: 16, borderWidth: 1, borderColor: colors.border, padding: 16, marginTop: 10 },
  itemOpen: { borderColor: colors.borderStrong },
  head: { flexDirection: "row", alignItems: "center", gap: 10 },
  q: { flex: 1, color: colors.onSurface, fontSize: 15, fontWeight: "800" },
  sign: { color: colors.brandPrimary, fontSize: 22, fontWeight: "900" },
  a: { color: colors.brandSecondary, fontSize: 14, lineHeight: 21, marginTop: 10 },
}));
