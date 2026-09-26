import { Image } from "expo-image";
import { useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { BackHeader } from "@/src/components/back-header";
import { Lightbox } from "@/src/components/lightbox";
import { Empty, Loading, PageIntro } from "@/src/components/ui";
import { siteImg, useMedia, useSettings } from "@/src/lib/site";
import { makeStyles } from "@/src/theme";

export default function Gallery() {
  const styles = useStyles();
  const insets = useSafeAreaInsets();
  const settings = useSettings();
  const media = useMedia("gallery");
  const [open, setOpen] = useState<number | null>(null);
  const s = settings.data;
  const urls = (media.data ?? []).map((m) => siteImg(m.url)).filter(Boolean) as string[];

  return (
    <View style={styles.root} testID="gallery-screen">
      <BackHeader title="GALLERY" />
      <ScrollView contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 24 }]} showsVerticalScrollIndicator={false}>
        <PageIntro kicker={s?.gallery_kicker || "Momenti"} title={s?.gallery_page_title || "Gallery"} body={s?.gallery_description} />
        {media.isLoading ? <Loading /> : null}
        {!media.isLoading && urls.length === 0 ? <Empty text="Nessuna foto ancora." /> : null}
        <View style={styles.grid}>
          {urls.map((u, i) => (
            <Pressable key={i} testID={`gallery-item-${i}`} style={[styles.cell, i % 5 === 0 && styles.cellWide]} onPress={() => setOpen(i)}>
              <Image source={{ uri: u }} style={styles.img} contentFit="cover" transition={200} />
            </Pressable>
          ))}
        </View>
      </ScrollView>
      <Lightbox images={urls} index={open} onClose={() => setOpen(null)} />
    </View>
  );
}

const useStyles = makeStyles((colors) => ({
  root: { flex: 1, backgroundColor: colors.surface },
  content: { paddingHorizontal: 20, paddingTop: 8 },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 16 },
  cell: { width: "48.8%", aspectRatio: 1, borderRadius: 14, overflow: "hidden" },
  cellWide: { width: "100%", aspectRatio: 16 / 10 },
  img: { width: "100%", height: "100%", backgroundColor: colors.surfaceSecondary },
}));
