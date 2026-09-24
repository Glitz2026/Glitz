import { useState } from "react";
import { Modal, Pressable, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { IconClose } from "@/src/components/icons";
import { Field, Notice, PrimaryButton } from "@/src/components/ui";
import { apiPost } from "@/src/lib/api";
import { useAuth } from "@/src/lib/auth-context";
import type { ZoneInfo } from "@/src/lib/floorplan";
import { MONO } from "@/src/lib/fonts";
import { errorMessage, openWhatsApp, useContact } from "@/src/lib/site";
import { makeStyles, useTheme } from "@/src/theme";

type Props = {
  open: boolean;
  onClose: () => void;
  eventId?: string;
  eventTitle?: string;
  tableNumber?: string;
  zone?: string;
  zoneInfo?: ZoneInfo | null;
};

/** Table request, same fields and flow as the site's BookingModal: saved on the
 *  site (table marked reserved) then confirmed by the staff on WhatsApp. */
export function BookingSheet(props: Props) {
  const styles = useStyles();
  const insets = useSafeAreaInsets();
  return (
    <Modal visible={props.open} animationType="slide" transparent onRequestClose={props.onClose}>
      <View style={styles.backdrop}>
        <View style={[styles.sheet, { paddingBottom: insets.bottom + 16 }]} testID="booking-sheet">
          {/* Mounted per opening so every request starts from a clean form. */}
          {props.open ? <SheetBody {...props} /> : null}
        </View>
      </View>
    </Modal>
  );
}

function SheetBody({ onClose, eventId, eventTitle, tableNumber, zone, zoneInfo }: Props) {
  const styles = useStyles();
  const { colors } = useTheme();
  const { user } = useAuth();
  const { whatsappNumber } = useContact();
  const qc = useQueryClient();

  const [form, setForm] = useState(() => ({ name: user?.name ?? "", phone: "", email: user?.email ?? "", guests: "2", note: "" }));
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const mut = useMutation({
    mutationFn: () =>
      apiPost("/api/site/bookings", {
        name: form.name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim() || null,
        guests: Number(form.guests) || 2,
        note: form.note.trim(),
        event_id: eventId || null,
        event_title: eventTitle || null,
        table_number: tableNumber || null,
        zone: zone || null,
      }),
    onSuccess: () => {
      setDone(true);
      qc.invalidateQueries({ queryKey: ["site", "event", eventId] });
      qc.invalidateQueries({ queryKey: ["site", "my"] });
      const lines = [
        `Ciao Glitz! Sono ${form.name.trim()}, vorrei prenotare un tavolo.`,
        eventTitle && `Serata: ${eventTitle}`,
        tableNumber && `Tavolo: #${tableNumber} (${zone})`,
        `Ospiti: ${form.guests}`,
        `Telefono: ${form.phone.trim()}`,
        form.note.trim() && `Note: ${form.note.trim()}`,
      ].filter(Boolean);
      openWhatsApp(whatsappNumber, lines.join("\n"));
    },
    onError: (e) => setError(errorMessage(e)),
  });

  const submit = () => {
    setError(null);
    if (!form.name.trim() || form.phone.trim().length < 5) {
      setError("Compila nome e telefono");
      return;
    }
    mut.mutate();
  };

  return (
    <>
          <View style={styles.handle} />
          <View style={styles.head}>
            <View style={{ flex: 1 }}>
              <Text style={styles.kicker}>PRENOTAZIONE</Text>
              <Text style={styles.title}>{tableNumber ? `Tavolo #${tableNumber}` : "Richiedi un tavolo"}</Text>
              {eventTitle ? <Text style={styles.meta}>Serata: {eventTitle}</Text> : null}
              {zone ? <Text style={styles.meta}>Zona: {zone}</Text> : null}
            </View>
            <Pressable onPress={onClose} style={styles.close} hitSlop={10} testID="booking-close">
              <IconClose color={colors.onSurface} size={20} />
            </Pressable>
          </View>

          <KeyboardAwareScrollView bottomOffset={24} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
            {done ? (
              <View style={styles.done}>
                <Text style={styles.doneTitle}>Richiesta inviata!</Text>
                <Text style={styles.doneBody}>Il nostro staff ti ricontatterà su WhatsApp per confermare disponibilità, posizione e minimo di spesa. La trovi anche nel tuo profilo.</Text>
                <PrimaryButton label="CHIUDI" onPress={onClose} style={{ marginTop: 18 }} />
              </View>
            ) : (
              <>
                {zoneInfo && (zoneInfo.price_from || zoneInfo.bottles || zoneInfo.description) ? (
                  <View style={styles.info}>
                    {zoneInfo.price_from ? (
                      <Text style={styles.infoPrice}>
                        Da {zoneInfo.price_from}
                        {zoneInfo.min_spend ? <Text style={styles.infoMuted}> · {zoneInfo.min_spend}</Text> : null}
                      </Text>
                    ) : null}
                    {zoneInfo.bottles ? <Text style={styles.infoLine}>{zoneInfo.bottles}</Text> : null}
                    {zoneInfo.description ? <Text style={styles.infoMuted}>{zoneInfo.description}</Text> : null}
                    {zoneInfo.bottle_menu?.length ? (
                      <View style={styles.bottles}>
                        <Text style={styles.bottlesTitle}>MENU BOTTIGLIE</Text>
                        {zoneInfo.bottle_menu.map((b, i) => (
                          <View key={i} style={styles.bottleRow}>
                            <Text style={styles.bottleName}>{b.name}</Text>
                            <Text style={styles.bottlePrice}>{b.price}</Text>
                          </View>
                        ))}
                      </View>
                    ) : null}
                  </View>
                ) : null}

                <Field testID="booking-name" label="Nome" required value={form.name} onChangeText={(v) => setForm({ ...form, name: v })} placeholder="Mario Rossi" />
                <Field testID="booking-phone" label="Telefono" required value={form.phone} onChangeText={(v) => setForm({ ...form, phone: v })} placeholder="+39 333 1234567" keyboardType="phone-pad" />
                <Field testID="booking-email" label="Email" value={form.email} onChangeText={(v) => setForm({ ...form, email: v })} placeholder="mario@email.it" keyboardType="email-address" autoCapitalize="none" />
                <Field testID="booking-guests" label="Ospiti" value={form.guests} onChangeText={(v) => setForm({ ...form, guests: v.replace(/[^0-9]/g, "") })} keyboardType="number-pad" />
                <Field testID="booking-note" label="Note" value={form.note} onChangeText={(v) => setForm({ ...form, note: v })} placeholder="Compleanno, richieste particolari…" multiline />
                {error ? <Notice tone="error" text={error} /> : null}
                <PrimaryButton testID="booking-submit" label="INVIA RICHIESTA" onPress={submit} loading={mut.isPending} style={{ marginTop: 18 }} />
                <Text style={styles.disclaimer}>La richiesta non è una conferma: lo staff ti ricontatta su WhatsApp per confermare.</Text>
              </>
            )}
          </KeyboardAwareScrollView>
    </>
  );
}

const useStyles = makeStyles((colors) => ({
  backdrop: { flex: 1, backgroundColor: "rgba(0,0,0,0.75)", justifyContent: "flex-end" },
  sheet: { maxHeight: "92%", backgroundColor: colors.surfaceSecondary, borderTopLeftRadius: 26, borderTopRightRadius: 26, borderWidth: 1, borderColor: colors.border, paddingHorizontal: 20, paddingTop: 10 },
  handle: { alignSelf: "center", width: 42, height: 5, borderRadius: 999, backgroundColor: colors.divider, marginBottom: 12 },
  head: { flexDirection: "row", alignItems: "flex-start", gap: 12, marginBottom: 6 },
  kicker: { color: colors.brandPrimary, fontSize: 11, letterSpacing: 3, fontWeight: "800", fontFamily: MONO },
  title: { color: colors.onSurface, fontSize: 24, fontWeight: "900", marginTop: 4 },
  meta: { color: colors.brandSecondary, fontSize: 13, marginTop: 4 },
  close: { width: 38, height: 38, borderRadius: 999, backgroundColor: colors.surfaceTertiary, alignItems: "center", justifyContent: "center" },
  info: { marginTop: 12, borderRadius: 14, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface, padding: 14, gap: 6 },
  infoPrice: { color: colors.onSurface, fontSize: 16, fontWeight: "900" },
  infoLine: { color: colors.brandSecondary, fontSize: 13 },
  infoMuted: { color: colors.muted, fontSize: 12, lineHeight: 18 },
  bottles: { marginTop: 6, paddingTop: 8, borderTopWidth: 1, borderTopColor: colors.divider, gap: 4 },
  bottlesTitle: { color: colors.muted, fontSize: 10, letterSpacing: 2, fontFamily: MONO, marginBottom: 2 },
  bottleRow: { flexDirection: "row", justifyContent: "space-between" },
  bottleName: { color: colors.brandSecondary, fontSize: 13 },
  bottlePrice: { color: colors.onSurface, fontSize: 13, fontWeight: "800" },
  disclaimer: { color: colors.muted, fontSize: 11, textAlign: "center", marginTop: 12, marginBottom: 8, lineHeight: 16 },
  done: { paddingVertical: 24 },
  doneTitle: { color: colors.brandPrimary, fontSize: 30, fontWeight: "900" },
  doneBody: { color: colors.brandSecondary, fontSize: 15, lineHeight: 22, marginTop: 10 },
}));
