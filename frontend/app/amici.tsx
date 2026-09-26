import { useState } from "react";
import { ActivityIndicator, Pressable, Text, TextInput, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { BackHeader } from "@/src/components/back-header";
import { apiGet, apiPost } from "@/src/lib/api";
import { MONO } from "@/src/lib/fonts";
import { makeStyles, useTheme } from "@/src/theme";

export default function Amici() {
  const styles = useStyles();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const qc = useQueryClient();

  const [name, setName] = useState("");
  const [code, setCode] = useState("");

  const groups = useQuery({ queryKey: ["groups"], queryFn: () => apiGet("/api/groups") });

  const createMut = useMutation({
    mutationFn: () => apiPost("/api/groups", { name }),
    onSuccess: () => {
      setName("");
      qc.invalidateQueries({ queryKey: ["groups"] });
    },
  });
  const joinMut = useMutation({
    mutationFn: () => apiPost("/api/groups/join", { code }),
    onSuccess: () => {
      setCode("");
      qc.invalidateQueries({ queryKey: ["groups"] });
    },
  });

  const groupList = groups.data?.groups ?? [];

  return (
    <View style={styles.root} testID="amici-screen">
      <BackHeader />
      <View style={styles.header}>
        <Text style={styles.kicker}>CHI VIENE CON ME</Text>
        <Text style={styles.title}>Amici</Text>
      </View>
      <KeyboardAwareScrollView
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 24 }]}
        bottomOffset={24}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <Text style={styles.cardLabel}>CREA UN GRUPPO PRIVATO</Text>
          <TextInput
            testID="group-name-input"
            value={name}
            onChangeText={setName}
            placeholder="Nome del gruppo"
            placeholderTextColor={colors.muted}
            style={styles.input}
          />
          <Pressable
            testID="create-group"
            style={[styles.primary, name.trim().length < 2 && styles.dim]}
            onPress={() => name.trim().length >= 2 && createMut.mutate()}
            disabled={createMut.isPending}
          >
            {createMut.isPending ? <ActivityIndicator color={colors.onBrandPrimary} /> : <Text style={styles.primaryText}>CREA GRUPPO</Text>}
          </Pressable>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardLabel}>UNISCITI CON UN CODICE</Text>
          <TextInput
            testID="join-code-input"
            value={code}
            onChangeText={(t) => setCode(t.toUpperCase())}
            placeholder="ES. A1B2C3"
            placeholderTextColor={colors.muted}
            style={styles.input}
            autoCapitalize="characters"
          />
          <Pressable
            testID="join-group"
            style={[styles.secondary, code.trim().length < 4 && styles.dim]}
            onPress={() => code.trim().length >= 4 && joinMut.mutate()}
            disabled={joinMut.isPending}
          >
            <Text style={styles.secondaryText}>UNISCITI</Text>
          </Pressable>
          {joinMut.isError ? <Text style={styles.err}>Codice non valido.</Text> : null}
        </View>

        <Text style={styles.section}>I MIEI GRUPPI</Text>
        {groupList.length === 0 ? (
          <Text style={styles.empty}>Nessun gruppo. Creane uno e invita gli amici.</Text>
        ) : (
          groupList.map((g: any) => (
            <View key={g.id} testID={`group-${g.id}`} style={styles.group}>
              <View style={styles.groupTop}>
                <Text style={styles.groupName}>{g.name}</Text>
                <View style={styles.codePill}>
                  <Text style={styles.codeText}>{g.invite_code}</Text>
                </View>
              </View>
              <Text style={styles.membersLabel}>{g.members.length} partecipanti</Text>
              <View style={styles.avatars}>
                {g.members.map((m: any) => (
                  <View key={m.user_id} style={styles.memberDot}>
                    <Text style={styles.memberInitial}>{(m.name?.[0] ?? "?").toUpperCase()}</Text>
                  </View>
                ))}
              </View>
            </View>
          ))
        )}
      </KeyboardAwareScrollView>
    </View>
  );
}

const useStyles = makeStyles((colors) => ({
  root: { flex: 1, backgroundColor: colors.surface },
  header: { paddingHorizontal: 20, paddingBottom: 14 },
  kicker: { color: colors.brandPrimary, fontSize: 11, letterSpacing: 4, fontWeight: "800", fontFamily: MONO },
  title: { color: colors.onSurface, fontSize: 30, fontWeight: "900", marginTop: 4 },
  content: { paddingHorizontal: 20 },
  card: { backgroundColor: colors.surfaceSecondary, borderRadius: 16, borderWidth: 1, borderColor: colors.border, padding: 16, marginBottom: 14 },
  cardLabel: { color: colors.muted, fontSize: 12, letterSpacing: 2, fontWeight: "700", fontFamily: MONO, marginBottom: 12 },
  input: { backgroundColor: colors.surfaceTertiary, borderWidth: 1, borderColor: colors.border, borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14, color: colors.onSurface, fontSize: 16 },
  primary: { marginTop: 12, backgroundColor: colors.brandPrimary, borderRadius: 12, paddingVertical: 15, alignItems: "center" },
  primaryText: { color: colors.onBrandPrimary, fontSize: 15, fontWeight: "900", letterSpacing: 2 },
  secondary: { marginTop: 12, borderWidth: 1.5, borderColor: colors.borderStrong, borderRadius: 12, paddingVertical: 14, alignItems: "center" },
  secondaryText: { color: colors.onSurface, fontSize: 15, fontWeight: "800", letterSpacing: 2 },
  dim: { opacity: 0.4 },
  err: { color: colors.error, fontSize: 13, marginTop: 10 },
  section: { color: colors.muted, fontSize: 12, letterSpacing: 3, fontWeight: "700", fontFamily: MONO, marginTop: 14, marginBottom: 14 },
  empty: { color: colors.muted, fontSize: 14 },
  group: { backgroundColor: colors.surfaceSecondary, borderRadius: 16, borderWidth: 1, borderColor: colors.border, padding: 16, marginBottom: 12 },
  groupTop: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  groupName: { color: colors.onSurface, fontSize: 18, fontWeight: "800", flex: 1 },
  codePill: { backgroundColor: colors.brandTertiary, borderRadius: 999, paddingHorizontal: 12, paddingVertical: 6 },
  codeText: { color: colors.brandPrimary, fontSize: 13, fontWeight: "900", letterSpacing: 2, fontFamily: MONO },
  membersLabel: { color: colors.muted, fontSize: 12, marginTop: 10, fontFamily: MONO },
  avatars: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 10 },
  memberDot: { width: 36, height: 36, borderRadius: 999, backgroundColor: colors.surfaceTertiary, borderWidth: 1, borderColor: colors.border, alignItems: "center", justifyContent: "center" },
  memberInitial: { color: colors.onSurface, fontSize: 14, fontWeight: "800" },
}));
