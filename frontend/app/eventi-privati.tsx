import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { BackHeader } from "@/src/components/back-header";
import { Chip, Field, GhostButton, Notice, PageIntro, PrimaryButton, SectionTitle } from "@/src/components/ui";
import { apiPost } from "@/src/lib/api";
import { useAuth } from "@/src/lib/auth-context";
import { MONO } from "@/src/lib/fonts";
import { errorMessage, openWhatsApp, useContact, useSettings } from "@/src/lib/site";
import { makeStyles } from "@/src/theme";

const DEFAULT_AREAS = [
  { id: "full", label: "Tutto il club", subtitle: "Fino a 2000 persone · esclusiva totale" },
  { id: "riva-deck", label: "Riva Deck", subtitle: "Fino a 200 persone · vista mare" },
  { id: "back-stage", label: "Back the Stage", subtitle: "Fino a 300 persone · privé filo pista" },
  { id: "glitz-bar", label: "Glitz Bar", subtitle: "Fino a 150 persone · zona lounge" },
  { id: "custom", label: "Da concordare", subtitle: "Setup su misura per il tuo evento" },
];
const DEFAULT_OCCASIONS = ["Compleanno", "Addio al celibato/nubilato", "Matrimonio / after-party", "Aziendale / corporate", "Lancio prodotto", "Cena privata", "Altro"];
const DEFAULT_WHY_US = [
  { n: "01", title: "Location cinematografica", body: "Open-air sul Belvedere con vista Isola di Dino. Arco LED iconico, tramonto sul Tirreno." },
  { n: "02", title: "Macchina già rodata", body: "Event manager dedicato, staff formato, sound & light system professionale, catering partner premium." },
  { n: "03", title: "Flessibilità totale", body: "Da 50 a 2000 ospiti. Una zona, più zone o tutto il club in esclusiva. Personalizziamo tutto." },
];

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

export default function EventiPrivati() {
  const styles = useStyles();
  const insets = useSafeAreaInsets();
  const qc = useQueryClient();
  const { user } = useAuth();
  const { whatsappNumber } = useContact();
  const settings = useSettings();
  const s = settings.data ?? {};
  const areas: { id: string; label: string; subtitle: string }[] = s.private_areas?.length ? s.private_areas : DEFAULT_AREAS;
  const occasions: string[] = s.private_occasions?.length ? s.private_occasions : DEFAULT_OCCASIONS;
  const whyUs: { n: string; title: string; body: string }[] = s.private_why_us?.length ? s.private_why_us : DEFAULT_WHY_US;

  const [pickedArea, setArea] = useState<string | null>(null);
  const [form, setForm] = useState(() => ({ name: user?.name ?? "", email: user?.email ?? "", phone: "", event_date: "", guests: "", occasion: "", budget: "", message: "" }));
  const [error, setError] = useState<string | null>(null);
  // Admin-edited lists can change under us: fall back to the first valid option.
  const area = areas.find((a) => a.id === pickedArea) ? pickedArea! : areas[0]?.id;
  const occasion = occasions.includes(form.occasion) ? form.occasion : occasions[0];

  const mut = useMutation({
    mutationFn: () =>
      apiPost("/api/site/private-events", {
        area,
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        event_date: form.event_date.trim(),
        guests: parseInt(form.guests, 10),
        occasion,
        budget: form.budget.trim() || null,
        message: form.message.trim() || null,
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["site", "my"] }),
    onError: (e) => setError(errorMessage(e, "Errore invio. Scrivici su WhatsApp.")),
  });

  const submit = () => {
    setError(null);
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim() || !form.event_date.trim() || !form.guests) {
      return setError("Compila i campi obbligatori");
    }
    if (!DATE_RE.test(form.event_date.trim())) return setError("Data nel formato AAAA-MM-GG (es. 2027-07-18)");
    mut.mutate();
  };

  if (mut.isSuccess) {
    return (
      <View style={styles.root}>
        <BackHeader title="EVENTI PRIVATI" />
        <View style={styles.done} testID="private-success">
          <Text style={styles.doneTitle}>{s.private_success_title || "Richiesta ricevuta!"}</Text>
          <Text style={styles.doneBody}>
            {s.private_success_body || "Il nostro event manager ti risponderà entro 24h con disponibilità, preventivo dettagliato e possibilità di sopralluogo."}
          </Text>
          <GhostButton
            label="CONTATTACI ORA SU WHATSAPP"
            onPress={() => openWhatsApp(whatsappNumber, "Ciao Glitz, ho appena inviato una richiesta per un evento privato.")}
            style={{ marginTop: 20 }}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.root} testID="private-screen">
      <BackHeader title="EVENTI PRIVATI" />
      <KeyboardAwareScrollView contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 24 }]} bottomOffset={24} keyboardShouldPersistTaps="handled">
        <PageIntro
          kicker={s.private_kicker || "Eventi privati"}
          title={`${s.private_hero_line1 || "Prenota il tuo"} ${s.private_hero_line2 || "Evento"}`}
          body={s.private_hero_subtitle || "Il Glitz Club apre le sue zone per il tuo evento privato."}
        />

        <SectionTitle title="SCEGLI L'AREA" />
        {areas.map((a) => (
          <Pressable key={a.id} testID={`area-${a.id}`} style={[styles.area, area === a.id && styles.areaActive]} onPress={() => setArea(a.id)}>
            <Text style={[styles.areaLabel, area === a.id && styles.accent]}>{a.label}</Text>
            <Text style={styles.areaSub}>{a.subtitle}</Text>
          </Pressable>
        ))}

        <SectionTitle title="I TUOI DATI" />
        <Field testID="pe-name" label="Nome e cognome" required value={form.name} onChangeText={(v) => setForm({ ...form, name: v })} />
        <Field testID="pe-phone" label="Telefono" required value={form.phone} onChangeText={(v) => setForm({ ...form, phone: v })} keyboardType="phone-pad" />
        <Field testID="pe-email" label="Email" required value={form.email} onChangeText={(v) => setForm({ ...form, email: v })} keyboardType="email-address" autoCapitalize="none" />
        <Field testID="pe-date" label="Data evento" required value={form.event_date} onChangeText={(v) => setForm({ ...form, event_date: v })} placeholder="AAAA-MM-GG" />
        <Field testID="pe-guests" label="Numero ospiti" required value={form.guests} onChangeText={(v) => setForm({ ...form, guests: v.replace(/[^0-9]/g, "") })} keyboardType="number-pad" placeholder="es. 150" />

        <Text style={styles.label}>OCCASIONE</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
          {occasions.map((o) => (
            <Chip key={o} label={o} active={occasion === o} onPress={() => setForm({ ...form, occasion: o })} />
          ))}
        </ScrollView>

        <Field testID="pe-budget" label="Budget indicativo" value={form.budget} onChangeText={(v) => setForm({ ...form, budget: v })} placeholder="es. € 15.000 - 30.000" />
        <Field
          testID="pe-message"
          label="Descrivi il tuo evento"
          value={form.message}
          onChangeText={(v) => setForm({ ...form, message: v })}
          placeholder="Mood, timing, servizi (dj, catering, decorazioni, fotografo)…"
          multiline
        />
        {error ? <Notice tone="error" text={error} /> : null}
        <PrimaryButton testID="pe-submit" label="INVIA RICHIESTA" onPress={submit} loading={mut.isPending} style={{ marginTop: 20 }} />
        <Text style={styles.small}>Ti risponderemo entro 24h.</Text>

        <SectionTitle title="PERCHÉ IL GLITZ" />
        {whyUs.map((w) => (
          <View key={w.n} style={styles.why}>
            <Text style={styles.whyN}>{w.n}</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.whyTitle}>{w.title}</Text>
              <Text style={styles.whyBody}>{w.body}</Text>
            </View>
          </View>
        ))}
      </KeyboardAwareScrollView>
    </View>
  );
}

const useStyles = makeStyles((colors) => ({
  root: { flex: 1, backgroundColor: colors.surface },
  content: { paddingHorizontal: 20, paddingTop: 8 },
  area: { backgroundColor: colors.surfaceSecondary, borderRadius: 14, borderWidth: 1.5, borderColor: colors.border, padding: 14, marginBottom: 10 },
  areaActive: { borderColor: colors.borderStrong, backgroundColor: colors.brandTertiary },
  areaLabel: { color: colors.onSurface, fontSize: 16, fontWeight: "900" },
  areaSub: { color: colors.muted, fontSize: 12, marginTop: 3 },
  accent: { color: colors.brandPrimary },
  label: { color: colors.muted, fontSize: 11, letterSpacing: 2.5, fontWeight: "700", fontFamily: MONO, marginTop: 14, marginBottom: 8 },
  small: { color: colors.muted, fontSize: 12, textAlign: "center", marginTop: 10 },
  why: { flexDirection: "row", gap: 14, marginBottom: 14 },
  whyN: { color: colors.brandPrimary, fontSize: 26, fontWeight: "900" },
  whyTitle: { color: colors.onSurface, fontSize: 15, fontWeight: "800", textTransform: "uppercase" },
  whyBody: { color: colors.brandSecondary, fontSize: 13, lineHeight: 19, marginTop: 3 },
  done: { flex: 1, justifyContent: "center", paddingHorizontal: 24 },
  doneTitle: { color: colors.brandPrimary, fontSize: 34, fontWeight: "900" },
  doneBody: { color: colors.brandSecondary, fontSize: 15, lineHeight: 22, marginTop: 12 },
}));
