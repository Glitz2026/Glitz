import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { ScrollView, Text, View, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useQuery } from "@tanstack/react-query";

import { BackHeader } from "@/src/components/back-header";
import { apiGet, coverUrl } from "@/src/lib/api";
import { MONO } from "@/src/lib/fonts";
import { formatEventDate } from "@/src/lib/format";
import { makeStyles } from "@/src/theme";

export default function Events() {
  const styles = useStyles();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const events = useQuery({ queryKey: ["events"], queryFn: () => apiGet("/api/events") });
  const list = events.data?.events ?? [];

  return (
    <View style={styles.root} testID="events-screen">
      <BackHeader title="EVENTI" />
      <ScrollView contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 24 }]} showsVerticalScrollIndicator={false}>
        {list.map((ev: any) => (
          <Pressable key={ev.id} testID={`events-item-${ev.id}`} style={styles.card} onPress={() => router.push(`/event/${ev.id}`)}>
            <Image source={{ uri: coverUrl(ev.cover) }} style={styles.cover} contentFit="cover" />
            <View style={styles.body}>
              <Text style={styles.date}>{formatEventDate(ev.date)}</Text>
              <Text style={styles.title}>{ev.title}</Text>
              <Text style={styles.guest}>{ev.guest}</Text>
              <View style={styles.footer}>
                <Text style={styles.genre}>{ev.genre}</Text>
                <Text style={styles.price}>da €{ev.price_from}</Text>
              </View>
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
  card: { backgroundColor: colors.surfaceSecondary, borderRadius: 18, borderWidth: 1, borderColor: colors.border, overflow: "hidden", marginBottom: 16 },
  cover: { width: "100%", height: 170 },
  body: { padding: 16 },
  date: { color: colors.brandPrimary, fontSize: 12, fontWeight: "700", fontFamily: MONO, letterSpacing: 1 },
  title: { color: colors.onSurface, fontSize: 20, fontWeight: "900", marginTop: 6 },
  guest: { color: colors.brandSecondary, fontSize: 13, marginTop: 4 },
  footer: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 12 },
  genre: { color: colors.muted, fontSize: 12, fontFamily: MONO },
  price: { color: colors.onSurface, fontSize: 15, fontWeight: "900", fontFamily: MONO },
}));
