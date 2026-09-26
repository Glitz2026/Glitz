import { Image } from "expo-image";
import { Platform, View } from "react-native";
import Svg, { G, Rect, Text as SvgText } from "react-native-svg";

import { CELL_H, CELL_W, LABEL_H, LABEL_W, PLAN_SIZE, isReserved, type Anchor, type PlanTable, type ZoneInfo } from "@/src/lib/floorplan";

type Props = {
  width: number;
  tables: PlanTable[];
  anchors: Record<string, Anchor & Partial<ZoneInfo>>;
  getZone: (id: string) => ZoneInfo;
  reserved?: Record<string, string>;
  activeZone?: string | null;
  selectedId?: string | null;
  imageUri?: string;
  onZone?: (id: string) => void;
  onSelect: (t: PlanTable) => void;
  /** Bigger invisible hit boxes for the fullscreen view. */
  large?: boolean;
};

const SELECTED = "#FF0033";
// SVG text defaults to a serif face in browsers.
const LABEL_FONT = Platform.OS === "web" ? "Arial, Helvetica, sans-serif" : undefined;

/** The official Glitz piantina with tappable tables, as on the website's 2D view. */
export function GlitzPlan({ width, tables, anchors, getZone, reserved = {}, activeZone, selectedId, imageUri, onZone, onSelect, large }: Props) {
  const pad = large ? 6 : 0;
  return (
    <View style={{ width, height: width, backgroundColor: "#0a0a0a" }} testID="glitz-plan">
      <Image
        source={imageUri ? { uri: imageUri } : require("../../assets/images/floorplan-official.png")}
        style={{ position: "absolute", top: 0, left: 0, width, height: width }}
        contentFit="contain"
      />
      <Svg width={width} height={width} viewBox={`0 0 ${PLAN_SIZE} ${PLAN_SIZE}`} style={{ position: "absolute", top: 0, left: 0 }}>
        {Object.keys(anchors).map((zid) => {
          const a = anchors[zid];
          if (!Number.isFinite(a.cover_x)) return null;
          const z = getZone(zid);
          const active = activeZone === zid;
          return (
            <G key={`zone-${zid}`} onPress={() => onZone?.(zid)}>
              <Rect x={a.cover_x} y={a.cover_y} width={a.cover_w} height={a.cover_h} fill="#0a0a0a" />
              <Rect
                x={a.cover_x}
                y={a.cover_y}
                width={a.cover_w}
                height={a.cover_h}
                rx={8}
                fill={active ? `${z.color}33` : "transparent"}
                stroke={z.color}
                strokeWidth={active ? 3 : 1.5}
              />
              <SvgText x={a.label_x} y={a.label_y} textAnchor="middle" fill={z.color} fontSize={a.font_size} fontWeight="900" letterSpacing={2} fontFamily={LABEL_FONT}>
                {(z.label || zid).toUpperCase()}
              </SvgText>
            </G>
          );
        })}
        {tables
          .filter((t) => Number.isFinite(t.x) && Number.isFinite(t.y))
          .map((t) => {
            const booked = isReserved(reserved[t.id]);
            const zoneColor = getZone(t.zone).color;
            const selected = selectedId === t.id;
            const zoneOn = activeZone === t.zone && !booked;
            let stroke = "transparent";
            let strokeWidth = 0;
            if (booked) {
              stroke = "#E10600";
              strokeWidth = 2;
            } else if (selected) {
              stroke = SELECTED;
              strokeWidth = 6;
            } else if (zoneOn) {
              stroke = zoneColor;
              strokeWidth = 4;
            } else if (large) {
              stroke = zoneColor;
              strokeWidth = 2;
            }
            return (
              <G key={t.id} onPress={() => !booked && onSelect(t)}>
                <Rect x={t.x - CELL_W / 2 - pad} y={t.y - CELL_H / 2 - pad} width={CELL_W + pad * 2} height={CELL_H + pad * 2} fill="rgba(0,0,0,0.01)" />
                <Rect
                  x={t.x - LABEL_W / 2}
                  y={t.y - LABEL_H / 2}
                  width={LABEL_W}
                  height={LABEL_H}
                  rx={4}
                  fill={selected ? "rgba(255,0,51,0.35)" : "none"}
                  stroke={stroke}
                  strokeWidth={strokeWidth}
                />
                {booked ? (
                  <SvgText x={t.x} y={t.y + 8} textAnchor="middle" fill="#E10600" fontSize={26} fontWeight="900" fontFamily={LABEL_FONT}>
                    ×
                  </SvgText>
                ) : null}
              </G>
            );
          })}
      </Svg>
    </View>
  );
}
