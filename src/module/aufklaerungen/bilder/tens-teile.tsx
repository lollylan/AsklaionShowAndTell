// Gemeinsame Teile für die TENS-Zeichnungen (tens*.tsx).
// Bewusst ohne default-Export: index.ts registriert sonst diese Datei als eigene Zeichnung.

import { F, KONTUR } from './bausteine';

/** Haut und Körper: gleiche Füllung und Kontur in allen Körperansichten. */
export const KOERPER = { ...KONTUR, fill: F.petrol } as const;

/** Klebe-Elektrode als abgerundetes Quadrat in Kupfer, Mittelpunkt (x, y). */
export function Elektrode({ x, y, groesse = 46, drehung = 0 }: { x: number; y: number; groesse?: number; drehung?: number }) {
  const h = groesse / 2;
  const innen = groesse * 0.32;
  return (
    <g transform={`translate(${x} ${y}) rotate(${drehung})`}>
      <rect x={-h} y={-h} width={groesse} height={groesse} rx={groesse * 0.24} fill={F.kupfer} stroke={F.linie} strokeWidth="4" />
      <rect x={-innen} y={-innen} width={innen * 2} height={innen * 2} rx={innen * 0.4} fill="none" stroke={F.kupferHell} strokeWidth="3" />
      <circle cx="0" cy="0" r="4" fill={F.linie} />
    </g>
  );
}

/** Weicher Kupferschein über der schmerzenden Stelle. */
export function Schmerzzone({ cx, cy, rx, ry }: { cx: number; cy: number; rx: number; ry: number }) {
  return (
    <g fill={F.kupfer}>
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fillOpacity="0.18" />
      <ellipse cx={cx} cy={cy} rx={rx * 0.72} ry={ry * 0.72} fillOpacity="0.22" />
      <ellipse cx={cx} cy={cy} rx={rx * 0.42} ry={ry * 0.42} fillOpacity="0.3" />
    </g>
  );
}

/** Dünnes Kabel entlang eines Pfades. */
export function Kabel({ d }: { d: string }) {
  return <path d={d} fill="none" stroke={F.leise} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />;
}

/** Zickzack für die Stromimpulse, links beginnend bei (x, y), breite gesamt. */
export function Impuls({ x, y, breite = 90, hoehe = 22, farbe = F.kupferHell }: { x: number; y: number; breite?: number; hoehe?: number; farbe?: string }) {
  const schritte = 6;
  const s = breite / schritte;
  let d = `M${x} ${y}`;
  for (let i = 1; i <= schritte; i++) {
    const dy = i === schritte ? 0 : i % 2 ? -hoehe / 2 : hoehe / 2;
    d += ` L${x + i * s} ${y + dy}`;
  }
  return <path d={d} fill="none" stroke={farbe} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />;
}

/** Verbotszone: Kupferkreis mit Kreuz. */
export function Verbot({ cx, cy, r = 30 }: { cx: number; cy: number; r?: number }) {
  const k = r * 0.5;
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={F.kupfer} fillOpacity="0.35" stroke={F.kupfer} strokeWidth="5" />
      <path
        d={`M${cx - k} ${cy - k} L${cx + k} ${cy + k} M${cx + k} ${cy - k} L${cx - k} ${cy + k}`}
        stroke={F.kupferHell}
        strokeWidth="6"
        strokeLinecap="round"
      />
    </g>
  );
}

/** Haken für „richtig“. */
export function Haken({ x, y, groesse = 30, farbe = F.linie }: { x: number; y: number; groesse?: number; farbe?: string }) {
  const g = groesse / 2;
  return (
    <path
      d={`M${x - g} ${y} L${x - g * 0.3} ${y + g * 0.7} L${x + g} ${y - g * 0.7}`}
      fill="none"
      stroke={farbe}
      strokeWidth="6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  );
}
