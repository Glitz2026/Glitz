import Svg, { Circle, Line, Path, Polyline, Rect } from "react-native-svg";

type Props = { color: string; size?: number };

// Line icons for the home grid, tab bar and lists. Same 24px grid and stroke
// language as tab-icons.tsx.
function Base({ size = 24, children }: { size?: number; children: React.ReactNode }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {children}
    </Svg>
  );
}

const s = (color: string) => ({ stroke: color, strokeWidth: 1.9, strokeLinecap: "round" as const, strokeLinejoin: "round" as const });

export function IconHome({ color, size }: Props) {
  return (
    <Base size={size}>
      <Path d="M3 10.5 12 3l9 7.5" {...s(color)} />
      <Path d="M5 9.5V21h5v-6h4v6h5V9.5" {...s(color)} />
    </Base>
  );
}

export function IconCalendar({ color, size }: Props) {
  return (
    <Base size={size}>
      <Rect x={3} y={5} width={18} height={16} rx={3} {...s(color)} />
      <Line x1={3} y1={10} x2={21} y2={10} {...s(color)} />
      <Line x1={8} y1={3} x2={8} y2={7} {...s(color)} />
      <Line x1={16} y1={3} x2={16} y2={7} {...s(color)} />
    </Base>
  );
}

export function IconSofa({ color, size }: Props) {
  return (
    <Base size={size}>
      <Path d="M5 11V8a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v3" {...s(color)} />
      <Path d="M3 13a2 2 0 0 1 4 0v2h10v-2a2 2 0 0 1 4 0v5H3z" {...s(color)} />
      <Line x1={6} y1={18} x2={6} y2={21} {...s(color)} />
      <Line x1={18} y1={18} x2={18} y2={21} {...s(color)} />
    </Base>
  );
}

export function IconTicket({ color, size }: Props) {
  return (
    <Base size={size}>
      <Path d="M3 8a2 2 0 0 0 2-2h14a2 2 0 0 0 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 0-2 2H5a2 2 0 0 0-2-2v-2a2 2 0 0 0 0-4z" {...s(color)} />
      <Line x1={14} y1={6} x2={14} y2={18} strokeDasharray="2 2" {...s(color)} />
    </Base>
  );
}

export function IconBag({ color, size }: Props) {
  return (
    <Base size={size}>
      <Path d="M5 8h14l-1 13H6z" {...s(color)} />
      <Path d="M9 8V6a3 3 0 0 1 6 0v2" {...s(color)} />
    </Base>
  );
}

export function IconGlass({ color, size }: Props) {
  return (
    <Base size={size}>
      <Path d="M4 4h16l-8 9z" {...s(color)} />
      <Line x1={12} y1={13} x2={12} y2={20} {...s(color)} />
      <Line x1={8} y1={20} x2={16} y2={20} {...s(color)} />
    </Base>
  );
}

export function IconSpark({ color, size }: Props) {
  return (
    <Base size={size}>
      <Path d="M12 2c.6 4.2 3.8 7.4 8 8-4.2.6-7.4 3.8-8 8-.6-4.2-3.8-7.4-8-8 4.2-.6 7.4-3.8 8-8z" {...s(color)} />
    </Base>
  );
}

export function IconUsers({ color, size }: Props) {
  return (
    <Base size={size}>
      <Circle cx={9} cy={8} r={3.2} {...s(color)} />
      <Path d="M3.5 20c0-3.2 2.5-5.5 5.5-5.5s5.5 2.3 5.5 5.5" {...s(color)} />
      <Circle cx={17} cy={7} r={2.6} {...s(color)} />
      <Path d="M16 14.6c2.7.4 4.5 2.6 4.5 5.4" {...s(color)} />
    </Base>
  );
}

export function IconSOS({ color, size }: Props) {
  return (
    <Base size={size}>
      <Circle cx={12} cy={12} r={9} {...s(color)} />
      <Circle cx={12} cy={12} r={3.4} {...s(color)} />
      <Line x1={12} y1={3} x2={12} y2={8.6} {...s(color)} />
      <Line x1={12} y1={15.4} x2={12} y2={21} {...s(color)} />
      <Line x1={3} y1={12} x2={8.6} y2={12} {...s(color)} />
      <Line x1={15.4} y1={12} x2={21} y2={12} {...s(color)} />
    </Base>
  );
}

export function IconImage({ color, size }: Props) {
  return (
    <Base size={size}>
      <Rect x={3} y={4} width={18} height={16} rx={3} {...s(color)} />
      <Circle cx={9} cy={10} r={1.8} {...s(color)} />
      <Path d="m21 16-5-5-9 9" {...s(color)} />
    </Base>
  );
}

export function IconNews({ color, size }: Props) {
  return (
    <Base size={size}>
      <Path d="M4 5h13v14a2 2 0 0 0 2 2H6a2 2 0 0 1-2-2z" {...s(color)} />
      <Path d="M17 9h3v10a2 2 0 0 1-2 2" {...s(color)} />
      <Line x1={8} y1={9} x2={13} y2={9} {...s(color)} />
      <Line x1={8} y1={13} x2={13} y2={13} {...s(color)} />
      <Line x1={8} y1={17} x2={11} y2={17} {...s(color)} />
    </Base>
  );
}

export function IconPin({ color, size }: Props) {
  return (
    <Base size={size}>
      <Path d="M12 21s-7-6.1-7-11.5a7 7 0 0 1 14 0C19 14.9 12 21 12 21z" {...s(color)} />
      <Circle cx={12} cy={9.5} r={2.5} {...s(color)} />
    </Base>
  );
}

export function IconChat({ color, size }: Props) {
  return (
    <Base size={size}>
      <Path d="M20 11.5a8 8 0 0 1-11.8 7L4 20l1.4-4A8 8 0 1 1 20 11.5z" {...s(color)} />
    </Base>
  );
}

export function IconGift({ color, size }: Props) {
  return (
    <Base size={size}>
      <Rect x={3} y={8} width={18} height={4} rx={1} {...s(color)} />
      <Path d="M5 12v9h14v-9" {...s(color)} />
      <Line x1={12} y1={8} x2={12} y2={21} {...s(color)} />
      <Path d="M12 8S10.5 3 8 3.5 7 8 12 8zM12 8s1.5-5 4-4.5S17 8 12 8z" {...s(color)} />
    </Base>
  );
}

export function IconArchive({ color, size }: Props) {
  return (
    <Base size={size}>
      <Rect x={3} y={4} width={18} height={5} rx={1} {...s(color)} />
      <Path d="M5 9v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V9" {...s(color)} />
      <Line x1={10} y1={13} x2={14} y2={13} {...s(color)} />
    </Base>
  );
}

export function IconHelp({ color, size }: Props) {
  return (
    <Base size={size}>
      <Circle cx={12} cy={12} r={9} {...s(color)} />
      <Path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .8-1 1.5V14" {...s(color)} />
      <Line x1={12} y1={17.5} x2={12} y2={17.6} {...s(color)} />
    </Base>
  );
}

export function IconMail({ color, size }: Props) {
  return (
    <Base size={size}>
      <Rect x={3} y={5} width={18} height={14} rx={3} {...s(color)} />
      <Path d="m4 7 8 6 8-6" {...s(color)} />
    </Base>
  );
}

export function IconClock({ color, size }: Props) {
  return (
    <Base size={size}>
      <Circle cx={12} cy={12} r={9} {...s(color)} />
      <Polyline points="12,7 12,12 15,14" {...s(color)} />
    </Base>
  );
}

export function IconInstagram({ color, size }: Props) {
  return (
    <Base size={size}>
      <Rect x={3} y={3} width={18} height={18} rx={5} {...s(color)} />
      <Circle cx={12} cy={12} r={4} {...s(color)} />
      <Line x1={17.5} y1={6.5} x2={17.5} y2={6.6} {...s(color)} />
    </Base>
  );
}

export function IconMusic({ color, size }: Props) {
  return (
    <Base size={size}>
      <Path d="M9 18V5l11-2v13" {...s(color)} />
      <Circle cx={6} cy={18} r={3} {...s(color)} />
      <Circle cx={17} cy={16} r={3} {...s(color)} />
    </Base>
  );
}

export function IconGrid({ color, size }: Props) {
  return (
    <Base size={size}>
      <Rect x={3} y={3} width={7.5} height={7.5} rx={2} {...s(color)} />
      <Rect x={13.5} y={3} width={7.5} height={7.5} rx={2} {...s(color)} />
      <Rect x={3} y={13.5} width={7.5} height={7.5} rx={2} {...s(color)} />
      <Rect x={13.5} y={13.5} width={7.5} height={7.5} rx={2} {...s(color)} />
    </Base>
  );
}

export function IconUser({ color, size }: Props) {
  return (
    <Base size={size}>
      <Circle cx={12} cy={8} r={4} {...s(color)} />
      <Path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" {...s(color)} />
    </Base>
  );
}

export function IconChevron({ color, size = 18 }: Props) {
  return (
    <Base size={size}>
      <Path d="m9 5 7 7-7 7" {...s(color)} />
    </Base>
  );
}

export function IconClose({ color, size }: Props) {
  return (
    <Base size={size}>
      <Line x1={6} y1={6} x2={18} y2={18} {...s(color)} />
      <Line x1={18} y1={6} x2={6} y2={18} {...s(color)} />
    </Base>
  );
}

export function IconCheck({ color, size }: Props) {
  return (
    <Base size={size}>
      <Path d="m5 12.5 4.5 4.5L19 7.5" {...s(color)} />
    </Base>
  );
}

export function IconExpand({ color, size }: Props) {
  return (
    <Base size={size}>
      <Path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" {...s(color)} />
    </Base>
  );
}
