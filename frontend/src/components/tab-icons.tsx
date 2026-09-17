import Svg, { Circle, Line, Path, Polygon } from "react-native-svg";

type Props = { color: string; size?: number };

export function IconSerata({ color, size = 24 }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"
        stroke={color}
        strokeWidth={2}
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function IconOrdina({ color, size = 24 }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Polygon points="4,4 20,4 12,13" stroke={color} strokeWidth={2} strokeLinejoin="round" />
      <Line x1={12} y1={13} x2={12} y2={20} stroke={color} strokeWidth={2} strokeLinecap="round" />
      <Line x1={8} y1={20} x2={16} y2={20} stroke={color} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}

export function IconAI({ color, size = 24 }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 2c.6 4.2 3.8 7.4 8 8-4.2.6-7.4 3.8-8 8-.6-4.2-3.8-7.4-8-8 4.2-.6 7.4-3.8 8-8z"
        stroke={color}
        strokeWidth={1.8}
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function IconAmici({ color, size = 24 }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={9} cy={8} r={3.2} stroke={color} strokeWidth={2} />
      <Path d="M3.5 20c0-3.2 2.5-5.5 5.5-5.5s5.5 2.3 5.5 5.5" stroke={color} strokeWidth={2} strokeLinecap="round" />
      <Circle cx={17} cy={7} r={2.6} stroke={color} strokeWidth={2} />
      <Path d="M16 14.6c2.7.4 4.5 2.6 4.5 5.4" stroke={color} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}

export function IconAiuto({ color, size = 24 }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={12} r={9} stroke={color} strokeWidth={2} />
      <Circle cx={12} cy={12} r={3.4} stroke={color} strokeWidth={2} />
      <Line x1={12} y1={3} x2={12} y2={8.6} stroke={color} strokeWidth={2} />
      <Line x1={12} y1={15.4} x2={12} y2={21} stroke={color} strokeWidth={2} />
      <Line x1={3} y1={12} x2={8.6} y2={12} stroke={color} strokeWidth={2} />
      <Line x1={15.4} y1={12} x2={21} y2={12} stroke={color} strokeWidth={2} />
    </Svg>
  );
}
