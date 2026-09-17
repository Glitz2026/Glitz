import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { apiGet, apiPost } from "@/src/lib/api";
import { MONO } from "@/src/lib/fonts";
import { formatEventDate } from "@/src/lib/format";
import { makeStyles } from "@/src/theme";

const TYPES = [
  { id: "disagio", label: "Mi sento a disagio con una persona" },
  { id: "sanitario", label: "Ho bisogno di assistenza sanitaria" },
  { id: "persi", label: "Ho perso i miei amici" },
  { id: "responsabile", label: "Voglio parlare con un responsabile" },
];
const ZONES = ["PISTA", "PRIVÉ", "BAR", "INGRESSO", "BAGNI"];

export default function Aiuto() {
  const styles = useStyles();
  const insets = useSafeAreaInsets();
  const qc = useQueryClient();

  const [type, setType] = useState<string | null>(null);
  const [zone, setZone] = useState<string | null>(null);

  const requests = useQuery({ queryKey: ["help"], queryFn: () => apiGet("/api/help") });

  const sendMut = useMutation({
    mutationFn: () => apiPost("/api/help", { type, zone }),
    onSuccess: () => {
      setType(null);
      setZone(null);
      qc.invalidateQueries({ queryKey: ["help"] });
    },
  });

  const reqList = requests.data?.requests ?? [];

  return (
    <View style={styles.root} testID="aiuto-screen">
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <Text style={styles.kicker}>SICUREZZA & BENESSERE</Text>
        <Text style={styles.title}>Aiuto</Text>
      </View>
      <ScrollView contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 24 }]} showsVerticalScrollIndicator={false}>
        <View style={styles.sosCard}>
          <Text style={styles.sosTitle}>HO BISOGNO DI AIUTO</Text>
          <Text style={styles.sosSub}>Scegli il motivo. Lo staff riceve la richiesta.</Text>
          {TYPES.map((t) => {
            const active = type === t.id;
            return (
              <Pressable
                key={t.id}
                testID={`help-type-${t.id}`}
                style={[styles.typeBtn, active && styles.typeBtnActive]}
                onPress={() => setType(t.id)}
              >
                <Text style={[styles.typeText, active && styles.typeTextActive]}>{t.label}</Text>
              </Pressable>
            );
          })}

          {type ? (
            <>
              <Text style={styles.zoneLabel}>DOVE SEI?</Text>
              <View style={styles.zoneRow}>
                {ZONES.map((z) => {
                  const active = zone === z;
                  return (
                    <Pressable
                      key={z}
                      testID={`help-zone-${z}`}
                      style={[styles.zoneChip, active && styles.zoneChipActive]}
                      onPress={() => setZone(z)}
                    >
                      <Text style={[styles.zoneChipText, active && styles.zoneChipTextActive]}>{z}</Text>
                    </Pressable>
                  );
                })}
              </View>
              <Pressable
                testID="help-send"
                style={[styles.sendBtn, !zone && styles.dim]}
                onPress={() => zone && sendMut.mutate()}
                disabled={!zone || sendMut.isPending}
              >
                <Text style={styles.sendText}>INVIA RICHIESTA</Text>
              </Pressable>
            </>
          ) : null}
        </View>

        <View style={styles.info}>
          <Text style={styles.infoText}>• Acqua gratuita disponibile a tutti i bar.</Text>
          <Text style={styles.infoText}>• Punto assistenza segnalato vicino all'ingresso.</Text>
          <Text style={styles.infoText}>• Al tavolo puoi chiamare il cameriere per acqua, ghiaccio o mixer.</Text>
        </View>

        <Text style={styles.section}>LE MIE RICHIESTE</Text>
        {reqList.length === 0 ? (
          <Text style={styles.empty}>Nessuna richiesta inviata.</Text>
        ) : (
          reqList.map((r: any) => (
            <View key={r.id} testID={`help-req-${r.id}`} style={styles.reqCard}>
              <Text style={styles.reqType}>{TYPES.find((t) => t.id === r.type)?.label ?? r.type}</Text>
              <Text style={styles.reqMeta}>{r.zone ?? "—"} · {formatEventDate(r.created_at)}</Text>
              <View style={styles.statusPill}>
                <Text style={styles.statusText}>RICEVUTA</Text>
              </View>
            </View>
          ))
        )}
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
  sosCard: { backgroundColor: colors.surfaceSecondary, borderRadius: 18, borderWidth: 1.5, borderColor: colors.borderStrong, padding: 18 },
  sosTitle: { color: colors.brandPrimary, fontSize: 16, fontWeight: "900", letterSpacing: 2 },
  sosSub: { color: colors.muted, fontSize: 13, marginTop: 6, marginBottom: 14 },
  typeBtn: { backgroundColor: colors.surfaceTertiary, borderWidth: 1, borderColor: colors.border, borderRadius: 12, padding: 15, marginBottom: 10 },
  typeBtnActive: { borderColor: colors.borderStrong, backgroundColor: colors.brandTertiary },
  typeText: { color: colors.onSurface, fontSize: 14, fontWeight: "700" },
  typeTextActive: { color: colors.brandPrimary },
  zoneLabel: { color: colors.muted, fontSize: 12, letterSpacing: 2, fontWeight: "700", fontFamily: MONO, marginTop: 8, marginBottom: 10 },
  zoneRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  zoneChip: { borderWidth: 1, borderColor: colors.border, borderRadius: 999, paddingHorizontal: 14, paddingVertical: 8 },
  zoneChipActive: { borderColor: colors.brandPrimary, backgroundColor: colors.brandPrimary },
  zoneChipText: { color: colors.onSurface, fontSize: 12, fontWeight: "800", letterSpacing: 1 },
  zoneChipTextActive: { color: colors.onBrandPrimary },
  sendBtn: { marginTop: 16, backgroundColor: colors.brandPrimary, borderRadius: 12, paddingVertical: 15, alignItems: "center" },
  sendText: { color: colors.onBrandPrimary, fontSize: 15, fontWeight: "900", letterSpacing: 2 },
  dim: { opacity: 0.4 },
  info: { marginTop: 18, gap: 8 },
  infoText: { color: colors.brandSecondary, fontSize: 13, lineHeight: 19 },
  section: { color: colors.muted, fontSize: 12, letterSpacing: 3, fontWeight: "700", fontFamily: MONO, marginTop: 28, marginBottom: 14 },
  empty: { color: colors.muted, fontSize: 14 },
  reqCard: { backgroundColor: colors.surfaceSecondary, borderRadius: 14, borderWidth: 1, borderColor: colors.border, padding: 16, marginBottom: 10 },
  reqType: { color: colors.onSurface, fontSize: 14, fontWeight: "800" },
  reqMeta: { color: colors.muted, fontSize: 12, marginTop: 4, fontFamily: MONO },
  statusPill: { alignSelf: "flex-start", marginTop: 10, backgroundColor: colors.success, borderRadius: 999, paddingHorizontal: 10, paddingVertical: 4 },
  statusText: { color: colors.onSuccess, fontSize: 10, fontWeight: "900", letterSpacing: 1 },
}));
