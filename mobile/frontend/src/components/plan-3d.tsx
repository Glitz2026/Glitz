import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { WebView, type WebViewMessageEvent } from "react-native-webview";

import { SITE_ORIGIN } from "@/src/lib/api";
import { MODEL_ZONES, isReserved, type PlanTable, type ZoneInfo } from "@/src/lib/floorplan";
import { makeStyles, useTheme } from "@/src/theme";

type Props = {
  tables: PlanTable[];
  reserved: Record<string, string>;
  getTableInfo: (t: PlanTable) => ZoneInfo;
  activeZone: string | null;
  ready: boolean;
  onSelect: (t: PlanTable) => void;
  onFallback: () => void;
};

// Wires the site's 3D map (GlitzMap API in glitz-interattivo.html) to the app.
const BRIDGE = `(function(){
  function post(m){ window.ReactNativeWebView.postMessage(JSON.stringify(m)); }
  var tries = 0;
  (function wait(){
    var map = window.GlitzMap;
    if (map && map.setBookingHandler) {
      window.__glitzApp = map;
      map.setBookingHandler(function(sel){ post({ type: 'select', tableId: sel && (sel.tableId || sel.id), zoneId: sel && sel.zoneId }); });
      post({ type: 'ready', tables: map.getTables().map(function(t){ return { id: t.id, zoneId: t.zoneId }; }) });
    } else if (tries++ < 150) { setTimeout(wait, 200); } else { post({ type: 'failed' }); }
  })();
})(); true;`;

/** Interactive 3D club (the website's WebGL model) with live availability. */
export function Plan3D({ tables, reserved, getTableInfo, activeZone, ready, onSelect, onFallback }: Props) {
  const styles = useStyles();
  const { colors } = useTheme();
  const web = useRef<WebView>(null);
  const [modelTables, setModelTables] = useState<{ id: string; zoneId: string }[] | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!modelTables) return;
    const inventory = modelTables.map((m) => {
      const t = tables.find((x) => x.id === m.id && MODEL_ZONES[x.zone] === m.zoneId);
      const info = t ? getTableInfo(t) : ({} as ZoneInfo);
      return {
        id: m.id,
        status: !ready || !t ? "unavailable" : isReserved(reserved[m.id]) ? "soldout" : "available",
        priceLabel: info.min_spend || (info.price_from ? `Da ${info.price_from}` : "Prezzo su richiesta"),
        minSpend: null,
        capacity: null,
      };
    });
    web.current?.injectJavaScript(`window.__glitzApp && window.__glitzApp.setInventory(${JSON.stringify(inventory)}); true;`);
  }, [modelTables, tables, reserved, getTableInfo, ready]);

  useEffect(() => {
    if (!modelTables) return;
    const zone = activeZone ? MODEL_ZONES[activeZone] : null;
    web.current?.injectJavaScript(
      zone ? `window.__glitzApp && window.__glitzApp.selectZone(${JSON.stringify(zone)}); true;` : `window.__glitzApp && window.__glitzApp.reset(); true;`,
    );
  }, [modelTables, activeZone]);

  const onMessage = (e: WebViewMessageEvent) => {
    let msg: any;
    try {
      msg = JSON.parse(e.nativeEvent.data);
    } catch {
      return;
    }
    if (msg.type === "ready") setModelTables(msg.tables);
    else if (msg.type === "failed") setFailed(true);
    else if (msg.type === "select") {
      const t = tables.find((x) => x.id === msg.tableId && MODEL_ZONES[x.zone] === msg.zoneId);
      if (t && !isReserved(reserved[t.id])) onSelect(t);
    }
  };

  if (failed) {
    return (
      <View style={styles.box}>
        <Text style={styles.text}>La vista 3D non è disponibile su questo dispositivo.</Text>
        <Text style={styles.link} onPress={onFallback}>Usa la piantina 2D</Text>
      </View>
    );
  }

  return (
    <View style={styles.frame} testID="plan-3d">
      <WebView
        ref={web}
        source={{ uri: `${SITE_ORIGIN}/glitz-interattivo.html?embedded=1&v=20` }}
        injectedJavaScript={BRIDGE}
        onMessage={onMessage}
        onError={() => setFailed(true)}
        javaScriptEnabled
        style={styles.web}
      />
      {!modelTables ? (
        <View style={styles.loading} pointerEvents="none">
          <ActivityIndicator color={colors.brandPrimary} />
          <Text style={styles.text}>Caricamento del club in 3D…</Text>
        </View>
      ) : null}
    </View>
  );
}

const useStyles = makeStyles((colors) => ({
  frame: { height: 520, borderRadius: 18, overflow: "hidden", borderWidth: 1, borderColor: colors.border, backgroundColor: "#0a0a0a" },
  web: { flex: 1, backgroundColor: "#0a0a0a" },
  loading: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, alignItems: "center", justifyContent: "center", gap: 10 },
  box: { borderRadius: 18, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surfaceSecondary, padding: 20, gap: 10 },
  text: { color: colors.brandSecondary, fontSize: 14 },
  link: { color: colors.brandPrimary, fontSize: 14, fontWeight: "800" },
}));
