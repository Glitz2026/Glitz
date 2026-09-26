import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { BackHeader } from "@/src/components/back-header";
import { Empty, Loading, PageIntro } from "@/src/components/ui";
import { MONO } from "@/src/lib/fonts";
import { formatItalianDate } from "@/src/lib/format";
import { siteImg, usePosts, useSettings } from "@/src/lib/site";
import { makeStyles } from "@/src/theme";

export default function News() {
  const styles = useStyles();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const posts = usePosts();
  const settings = useSettings();
  const s = settings.data;

  return (
    <View style={styles.root} testID="news-screen">
      <BackHeader title="NEWS" />
      <ScrollView contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 24 }]} showsVerticalScrollIndicator={false}>
        <PageIntro kicker={s?.blog_kicker || "Magazine"} title={s?.blog_title || "News & Stories"} body={s?.blog_description} />
        {posts.isLoading ? <Loading /> : null}
        {!posts.isLoading && !(posts.data ?? []).length ? <Empty text="Nessun articolo ancora pubblicato." /> : null}
        {(posts.data ?? []).map((p) => (
          <Pressable key={p.id} testID={`post-card-${p.slug}`} style={styles.card} onPress={() => router.push(`/news/${p.slug}`)}>
            <Image source={{ uri: siteImg(p.cover_url) }} style={styles.cover} contentFit="cover" />
            <View style={styles.body}>
              <View style={styles.meta}>
                {p.tags?.slice(0, 2).map((t) => (
                  <Text key={t} style={styles.tag}>#{t}</Text>
                ))}
                <Text style={styles.date}>{formatItalianDate(p.created_at)}</Text>
              </View>
              <Text style={styles.title}>{p.title}</Text>
              <Text style={styles.excerpt} numberOfLines={3}>{p.excerpt}</Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const useStyles = makeStyles((colors) => ({
  root: { flex: 1, backgroundColor: colors.surface },
  content: { paddingHorizontal: 20, paddingTop: 8 },
  card: { backgroundColor: colors.surfaceSecondary, borderRadius: 18, borderWidth: 1, borderColor: colors.border, overflow: "hidden", marginTop: 16 },
  cover: { width: "100%", aspectRatio: 16 / 9, backgroundColor: colors.surfaceTertiary },
  body: { padding: 16 },
  meta: { flexDirection: "row", flexWrap: "wrap", gap: 8, alignItems: "center" },
  tag: { color: colors.brandPrimary, fontSize: 11, fontWeight: "800" },
  date: { color: colors.muted, fontSize: 11, fontFamily: MONO },
  title: { color: colors.onSurface, fontSize: 19, fontWeight: "900", marginTop: 8 },
  excerpt: { color: colors.brandSecondary, fontSize: 14, lineHeight: 20, marginTop: 6 },
}));
