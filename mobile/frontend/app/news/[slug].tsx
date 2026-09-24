import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useQuery } from "@tanstack/react-query";

import { BackHeader } from "@/src/components/back-header";
import { Loading, Markdown } from "@/src/components/ui";
import { MONO } from "@/src/lib/fonts";
import { formatItalianDate } from "@/src/lib/format";
import { siteGet, siteImg, type Post } from "@/src/lib/site";
import { makeStyles } from "@/src/theme";

export default function PostDetail() {
  const styles = useStyles();
  const insets = useSafeAreaInsets();
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const post = useQuery<Post>({ queryKey: ["site", "post", slug], queryFn: () => siteGet(`/posts/${slug}`) });
  const p = post.data;

  return (
    <View style={styles.root} testID="post-screen">
      <BackHeader title="NEWS" />
      {post.isError ? <Text style={styles.missing}>Articolo non trovato.</Text> : null}
      {!p && !post.isError ? <Loading /> : null}
      {p ? (
        <ScrollView contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 32 }]} showsVerticalScrollIndicator={false}>
          <Text style={styles.date}>{formatItalianDate(p.created_at)}</Text>
          <Text style={styles.title}>{p.title}</Text>
          {p.excerpt ? <Text style={styles.excerpt}>{p.excerpt}</Text> : null}
          {p.cover_url ? <Image source={{ uri: siteImg(p.cover_url) }} style={styles.cover} contentFit="cover" /> : null}
          <Markdown text={p.body || ""} />
        </ScrollView>
      ) : null}
    </View>
  );
}

const useStyles = makeStyles((colors) => ({
  root: { flex: 1, backgroundColor: colors.surface },
  content: { paddingHorizontal: 20, paddingTop: 8 },
  missing: { color: colors.muted, textAlign: "center", marginTop: 60 },
  date: { color: colors.brandPrimary, fontSize: 11, fontFamily: MONO, fontWeight: "700", letterSpacing: 1 },
  title: { color: colors.onSurface, fontSize: 28, fontWeight: "900", marginTop: 8 },
  excerpt: { color: colors.brandSecondary, fontSize: 16, lineHeight: 23, marginTop: 10 },
  cover: { width: "100%", aspectRatio: 16 / 9, borderRadius: 18, marginVertical: 20, backgroundColor: colors.surfaceTertiary },
}));
