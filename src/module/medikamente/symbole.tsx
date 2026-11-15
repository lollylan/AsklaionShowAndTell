// Symbolsatz für Einnahmehinweise und Nebenwirkungen. Wo es bei Lucide ein
// treffendes Symbol gibt, wird es benutzt; der Rest ist im selben Raster
// (24 × 24, runde Linien) selbst gezeichnet, damit alles aus einer Hand wirkt.

import type { ComponentType, ReactNode } from 'react';
import {
  Activity,
  Baby,
  Ban,
  BatteryLow,
  Bean,
  BedDouble,
  BicepsFlexed,
  Bone,
  Bug,
  CalendarDays,
  Candy,
  CarFront,
  Citrus,
  Clock,
  Droplet,
  Droplets,
  Eye,
  FlaskConical,
  Gauge,
  GlassWater,
  Hand,
  HeartPulse,
  Hourglass,
  Milk,
  Moon,
  Pill,
  Repeat,
  Snowflake,
  Speech,
  Stethoscope,
  Sun,
  Sunrise,
  Syringe,
  Thermometer,
  ThermometerSun,
  Toilet,
  TriangleAlert,
  Utensils,
  UtensilsCrossed,
  Vibrate,
  Weight,
  Wind,
  Wine,
} from 'lucide-react';

interface SymbolProps {
  size?: number | string;
  strokeWidth?: number | string;
}

type Symbol = ComponentType<SymbolProps>;

function eigenes(inhalt: ReactNode): Symbol {
  return function Eigenes({ size = 24, strokeWidth = 1.75 }: SymbolProps) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {inhalt}
      </svg>
    );
  };
}

const Kopfschmerz = eigenes(
  <>
    <circle cx="12" cy="14.5" r="7.5" />
    <path d="M9.5 13h.01M14.5 13h.01" />
    <path d="M9.3 18.2c.7-1 1.7-1.5 2.7-1.5s2 .5 2.7 1.5" />
    <path d="M12 1.5V4M5 3l1.6 2.2M19 3l-1.6 2.2" />
  </>,
);

const Schwindel = eigenes(
  <path d="M12 12a1.5 1.5 0 0 1 1.5 1.5 3 3 0 0 1-3 3A4.5 4.5 0 0 1 6 12a6 6 0 0 1 6-6 7.5 7.5 0 0 1 7.5 7.5 9 9 0 0 1-4.2 7.6" />,
);

const Uebelkeit = eigenes(
  <>
    <circle cx="12" cy="12" r="9.5" />
    <path d="M8.5 9.5h.01M15.5 9.5h.01" />
    <path d="M7.5 15.5q1.1-1.4 2.25 0t2.25 0 2.25 0 2.25 0" />
  </>,
);

const Husten = eigenes(
  <>
    <circle cx="8" cy="12" r="5.5" />
    <path d="M6.5 10.5h.01" />
    <path d="M10 14.5h3.4" />
    <path d="M17 8.5l3.5-2M17.8 12H22M17 15.5l3.5 2" />
  </>,
);

const Haut = eigenes(
  <>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <path d="M8 8.5h.01M13 7.5h.01M16.5 11h.01M11 12h.01M7.5 14h.01M14 15.5h.01M10 17h.01M17 16.5h.01" />
  </>,
);

const Magen = eigenes(
  <path d="M9.5 2.5v4c0 2.6-4.5 3.2-4.5 8.3a5.2 5.2 0 0 0 5.2 5.2c5.3 0 9.3-3.3 9.3-8 0-2.6-1.6-4.3-3.6-4.3s-3 1.3-3-1.2v-4" />,
);

const Darm = eigenes(
  <path d="M5 4.5h12a2 2 0 0 1 0 4H7a2 2 0 0 0 0 4h10a2 2 0 0 1 0 4H9a2 2 0 0 0-2 2v1" />,
);

const Bein = eigenes(
  <>
    <path d="M8.5 2v10.5c0 2.2-3.5 3.6-3.5 6A2.5 2.5 0 0 0 7.5 21H18a2 2 0 0 0 2-2c0-2.3-5-2.2-5-5.5V2" />
    <path d="M2.5 9.5c1 1 1 2.5 0 3.5M21 6.5c-1 1-1 2.5 0 3.5" />
  </>,
);

export const SYMBOLE = {
  // Wann und wie
  morgens: Sunrise,
  abends: Moon,
  uhr: Clock,
  mehrmals: Repeat,
  woche: CalendarDays,
  bedarf: Hand,
  nuechtern: UtensilsCrossed,
  essen: Utensils,
  wasser: GlassWater,
  spritze: Syringe,
  inhalieren: Wind,
  tablette: Pill,
  bett: BedDouble,
  // Nebenwirkungen
  kopfschmerz: Kopfschmerz,
  schwindel: Schwindel,
  uebelkeit: Uebelkeit,
  husten: Husten,
  haut: Haut,
  magen: Magen,
  darm: Darm,
  bein: Bein,
  durchfall: Toilet,
  blutung: Droplet,
  muskel: BicepsFlexed,
  puls: HeartPulse,
  herzklopfen: Activity,
  kalt: Snowflake,
  wasserlassen: Droplets,
  gewicht: Weight,
  unterzucker: Candy,
  keim: Bug,
  stimme: Speech,
  zittern: Vibrate,
  muede: BatteryLow,
  blutdruck: Gauge,
  sonne: Sun,
  schwitzen: ThermometerSun,
  knochen: Bone,
  niere: Bean,
  labor: FlaskConical,
  gewoehnung: Hourglass,
  auge: Eye,
  fieber: Thermometer,
  sturz: TriangleAlert,
  // Darauf achten
  alkohol: Wine,
  auto: CarFront,
  schwanger: Baby,
  milch: Milk,
  grapefruit: Citrus,
  arzt: Stethoscope,
  nicht: Ban,
} satisfies Record<string, Symbol>;

export type SymbolId = keyof typeof SYMBOLE;

export function Sinnbild({ id, size, strokeWidth }: { id: SymbolId } & SymbolProps) {
  const Zeichen: Symbol = SYMBOLE[id];
  return <Zeichen size={size} strokeWidth={strokeWidth} />;
}
