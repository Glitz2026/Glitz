import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { useMutation } from "@tanstack/react-query";

import { apiPost } from "@/src/lib/api";
import { useAuth } from "@/src/lib/auth-context";
import { errorMessage } from "@/src/lib/site";
import { makeStyles, useTheme } from "@/src/theme";

/** The site's newsletter signup, pre-filled with the account email. */
export function NewsletterCard() {
  const styles = useStyles();
  const { colors } = useTheme();
  const { user } = useAuth();
  const [email, setEmail] = useState(user?.email ?? "");
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const mut = useMutation({
    mutationFn: () => apiPost("/api/site/newsletter", { email: email.trim() }),
    onSuccess: (data: any) =>
      setMsg({ ok: true, text: data?.status === "already_subscribed" ? "Sei già iscritto alla newsletter." : "Iscrizione confermata. Benvenuto al Glitz." }),
    onError: (e) => setMsg({ ok: false, text: errorMessage(e, "Email non valida. Riprova.") }),
  });

  return (
    <View style={styles.card} testID="newsletter-card">
      <Text style={styles.title}>Newsletter</Text>
      <Text style={styles.body}>Line-up, prevendite e serate speciali prima di tutti.</Text>
      <View style={styles.row}>
        <TextInput
          testID="newsletter-email"
          value={email}
          onChangeText={setEmail}
          placeholder="La tua email"
          placeholderTextColor={colors.muted}
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
        />
        <Pressable testID="newsletter-submit" style={[styles.btn, mut.isPending && { opacity: 0.5 }]} disabled={mut.isPending || !email.trim()} onPress={() => mut.mutate()}>
          <Text style={styles.btnText}>{mut.isPending ? "…" : "ISCRIVITI"}</Text>
        </Pressable>
      </View>
      {msg ? <Text style={[styles.msg, { color: msg.ok ? colors.success : colors.error }]}>{msg.text}</Text> : null}
    </View>
  );
}

const useStyles = makeStyles((colors) => ({
  card: { backgroundColor: colors.surfaceSecondary, borderRadius: 18, borderWidth: 1, borderColor: colors.border, padding: 16 },
  title: { color: colors.onSurface, fontSize: 18, fontWeight: "900" },
  body: { color: colors.muted, fontSize: 13, marginTop: 4 },
  row: { flexDirection: "row", gap: 8, marginTop: 12 },
  input: { flex: 1, backgroundColor: colors.surfaceTertiary, borderWidth: 1, borderColor: colors.border, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12, color: colors.onSurface, fontSize: 15 },
  btn: { backgroundColor: colors.brandPrimary, borderRadius: 12, paddingHorizontal: 16, justifyContent: "center" },
  btnText: { color: colors.onBrandPrimary, fontSize: 12, fontWeight: "900", letterSpacing: 1.5 },
  msg: { fontSize: 13, marginTop: 10 },
}));
