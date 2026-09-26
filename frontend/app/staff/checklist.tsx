import { ScrollView, Text, View, Pressable, ActivityIndicator } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { BackHeader } from "@/src/components/back-header";
import { apiGet, apiPost } from "@/src/lib/api";
import { MONO } from "@/src/lib/fonts";
import { makeStyles, useTheme } from "@/src/theme";

const PHASES: { key: string; label: string }[] = [
  { key: "prima", label: "PRIMA DELL'EVENTO" },
  { key: "durante", label: "DURANTE L'EVENTO" },
  { key: "dopo", label: "DOPO L'EVENTO" },
];

export default function StaffChecklist() {
  const styles = useStyles();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const qc = useQueryClient();

  const q = useQuery<any>({ queryKey: ["staff-tasks"], queryFn: () => apiGet("/api/staff/tasks") });
  const toggle = useMutation({
    mutationFn: (v: { phase: string; index: number; done: boolean }) => apiPost("/api/staff/tasks/toggle", v),
    onSuccess: (data) => qc.setQueryData(["staff-tasks"], (old: any) => ({ ...old, done: data.done })),
  });

  const data = q.data;
  const done: Record<string, boolean> = data?.done ?? {};

  return (
    <View style={styles.root} testID="staff-checklist">
      <BackHeader title="COMPITI" />
      <ScrollView contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 32 }]} showsVerticalScrollIndicator={false}>
        {q.isLoading ? (
          <ActivityIndicator color={colors.brandPrimary} style={{ marginTop: 30 }} />
        ) : (
          <>
            <Text style={styles.dept}>{data?.department?.label}</Text>
            {data?.tasks?.mission ? (
              <View style={styles.mission}>
                <Text style={styles.missionLabel}>MISSION</Text>
                <Text style={styles.missionText}>{data.tasks.mission}</Text>
              </View>
            ) : null}

            {PHASES.map((ph) => {
              const list: string[] = data?.tasks?.[ph.key] ?? [];
              if (list.length === 0) return null;
              return (
                <View key={ph.key}>
                  <Text style={styles.phase}>{ph.label}</Text>
                  {list.map((task, i) => {
                    const key = `${ph.key}:${i}`;
                    const checked = !!done[key];
                    return (
                      <Pressable
                        key={key}
                        testID={`task-${ph.key}-${i}`}
                        style={styles.taskRow}
                        onPress={() => toggle.mutate({ phase: ph.key, index: i, done: !checked })}
                      >
                        <View style={[styles.box, checked && styles.boxOn]}>
                          {checked ? <Text style={styles.boxTick}>✓</Text> : null}
                        </View>
                        <Text style={[styles.taskText, checked && styles.taskDone]}>{task}</Text>
                      </Pressable>
                    );
                  })}
                </View>
              );
            })}

            {data?.per_tutti ? (
              <View style={styles.note}>
                <Text style={styles.noteLabel}>PER TUTTI</Text>
                <Text style={styles.noteText}>{data.per_tutti.note}</Text>
              </View>
            ) : null}
          </>
        )}
      </ScrollView>
    </View>
  );
}

const useStyles = makeStyles((colors) => ({
  root: { flex: 1, backgroundColor: colors.surface },
  content: { paddingHorizontal: 20, paddingTop: 8 },
  dept: { color: colors.onSurface, fontSize: 26, fontWeight: "900", marginBottom: 12 },
  mission: { backgroundColor: colors.brandTertiary, borderRadius: 12, borderWidth: 1, borderColor: colors.borderStrong, padding: 14, marginBottom: 8 },
  missionLabel: { color: colors.brandPrimary, fontSize: 10, letterSpacing: 3, fontWeight: "900", fontFamily: MONO, marginBottom: 6 },
  missionText: { color: colors.onSurface, fontSize: 14, lineHeight: 20, fontWeight: "600" },
  phase: { color: colors.muted, fontSize: 12, letterSpacing: 3, fontWeight: "700", fontFamily: MONO, marginTop: 24, marginBottom: 12 },
  taskRow: { flexDirection: "row", alignItems: "center", gap: 12, backgroundColor: colors.surfaceSecondary, borderRadius: 12, borderWidth: 1, borderColor: colors.border, paddingHorizontal: 14, paddingVertical: 13, marginBottom: 8 },
  box: { width: 26, height: 26, borderRadius: 8, borderWidth: 1.5, borderColor: colors.borderStrong, alignItems: "center", justifyContent: "center" },
  boxOn: { backgroundColor: colors.success, borderColor: colors.success },
  boxTick: { color: "#000000", fontSize: 16, fontWeight: "900" },
  taskText: { color: colors.onSurface, fontSize: 14, fontWeight: "600", flex: 1 },
  taskDone: { color: colors.muted, textDecorationLine: "line-through" },
  note: { marginTop: 26, backgroundColor: colors.surfaceTertiary, borderRadius: 12, borderWidth: 1, borderColor: colors.border, padding: 14 },
  noteLabel: { color: colors.muted, fontSize: 10, letterSpacing: 3, fontWeight: "900", fontFamily: MONO, marginBottom: 6 },
  noteText: { color: colors.brandSecondary, fontSize: 13, lineHeight: 20 },
}));
