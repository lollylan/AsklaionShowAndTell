// Bausteine für Nahansichten (Hand, Kopf, Oberkörper von vorn) zu den Arm-, Hand- und
// Nackenübungen. Gleiche Winkel wie in figur.tsx: 0 = nach unten, 90 = nach rechts,
// 180 = nach oben, -90 = nach links. Kein default-Export: das hier ist keine Übung.

import type { ReactNode } from 'react';
import { F, richtung } from './figur';

export type Punkt = [number, number];

/** Dunkle Kontur, die Finger und Glieder voneinander trennt. */
export const RAND = F.petrolDunkel;

export function weiter(p: Punkt, grad: number, laenge: number): Punkt {
  const [dx, dy] = richtung(grad);
  return [p[0] + dx * laenge, p[1] + dy * laenge];
}

/** Winkel (Konvention oben) von a nach b. */
export function winkel(a: Punkt, b: Punkt): number {
  return (Math.atan2(b[0] - a[0], b[1] - a[1]) * 180) / Math.PI;
}

/** Punkte einer Gliederkette ab `start` mit je einem absoluten Winkel und einer Länge. */
export function kette(start: Punkt, winkelListe: number[], laengen: number[]): Punkt[] {
  const punkte: Punkt[] = [start];
  winkelListe.forEach((w, i) => punkte.push(weiter(punkte[i], w, laengen[i])));
  return punkte;
}

/**
 * Zwei-Glieder-Kette (Arm) so beugen, dass ihr Ende bei `ziel` liegt.
 * knick = 1 oder -1 wählt die Seite, zu der das Mittelgelenk ausweicht.
 * Liefert [Winkel oben, Winkel unten] wie für <Figur pose.arme>.
 */
export function beugeZu(start: Punkt, ziel: Punkt, l1: number, l2: number, knick: 1 | -1 = 1): [number, number] {
  const d = Math.min(Math.hypot(ziel[0] - start[0], ziel[1] - start[1]), l1 + l2 - 0.01);
  const basis = winkel(start, ziel);
  const a = (Math.acos((l1 * l1 + d * d - l2 * l2) / (2 * l1 * d)) * 180) / Math.PI;
  const oben = basis + knick * a;
  const mitte = weiter(start, oben, l1);
  return [oben, winkel(mitte, ziel)];
}

const pfad = (punkte: Punkt[]) => punkte.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' ');

/**
 * Abgerundete Glieder (Finger, Daumen, Arm) als dicke Linie mit dunkler Kontur.
 * `geist` = blass, für die Ausgangsstellung.
 */
export function Glieder({
  punkte,
  breite,
  farbe = F.creme,
  geist = false,
  kontur = true,
}: {
  punkte: Punkt[];
  breite: number;
  farbe?: string;
  geist?: boolean;
  kontur?: boolean;
}) {
  const d = pfad(punkte);
  const gemeinsam = { d, fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round' } as const;
  if (geist) {
    return <path {...gemeinsam} stroke={F.petrolHell} strokeWidth={breite} opacity={0.6} />;
  }
  return (
    <g>
      {kontur && <path {...gemeinsam} stroke={RAND} strokeWidth={breite + 8} />}
      <path {...gemeinsam} stroke={farbe} strokeWidth={breite} />
    </g>
  );
}

/** Fläche (Handteller, Rumpf) in Creme mit dunkler Kontur – oder blass als Geist. */
export function Flaeche({ d, geist = false, farbe = F.creme }: { d: string; geist?: boolean; farbe?: string }) {
  if (geist) return <path d={d} fill={F.petrolHell} opacity={0.6} />;
  return <path d={d} fill={farbe} stroke={RAND} strokeWidth={4} strokeLinejoin="round" />;
}

/** Kurze Gelenkfalte quer über ein Glied bei Punkt p, Glied zeigt in Richtung `grad`. */
export function Falte({ p, grad, laenge = 10 }: { p: Punkt; grad: number; laenge?: number }) {
  const a = weiter(p, grad + 90, laenge / 2);
  const b = weiter(p, grad - 90, laenge / 2);
  return <line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={F.leise} strokeWidth={3} strokeLinecap="round" />;
}

/** Kupfern leuchtende Zone als weiche Ellipse (für Nahansichten). */
export function Glut({ x, y, rx, ry, drehung = 0 }: { x: number; y: number; rx: number; ry: number; drehung?: number }) {
  return (
    <ellipse
      cx={x}
      cy={y}
      rx={rx}
      ry={ry}
      fill={F.kupfer}
      opacity={0.85}
      transform={drehung ? `rotate(${drehung} ${x} ${y})` : undefined}
    />
  );
}

/** Tisch von der Seite: Platte bei y, von x1 bis x2, mit zwei Beinen bis zum Boden. */
export function Tisch({ x1, x2, y, boden = 470, beine = true }: { x1: number; x2: number; y: number; boden?: number; beine?: boolean }) {
  return (
    <g stroke={F.leise} strokeLinecap="round" fill="none">
      <rect x={x1} y={y} width={x2 - x1} height={14} rx={5} fill={F.petrolDunkel} strokeWidth={4} />
      {beine && (
        <>
          <line x1={x1 + 22} y1={y + 14} x2={x1 + 22} y2={boden} strokeWidth={4} />
          <line x1={x2 - 22} y1={y + 14} x2={x2 - 22} y2={boden} strokeWidth={4} />
        </>
      )}
    </g>
  );
}

/**
 * Kopf und Schultern von vorn. Halsansatz bei (x, y); `neigung` kippt den Kopf um den Halsansatz
 * (positiv = Kopf zur rechten Bildseite). `schulterL/R` heben (negativ) oder senken (positiv)
 * die Schultern in px. children liegen über dem Rumpf (z. B. betonte Zonen).
 */
export function KopfVorn({ x, y, neigung = 0, geist = false, glut }: { x: number; y: number; neigung?: number; geist?: boolean; glut?: ReactNode }) {
  const farbe = geist ? F.petrolHell : F.creme;
  const rand = geist ? 'none' : RAND;
  return (
    <g transform={`rotate(${neigung} ${x} ${y})`} opacity={geist ? 0.6 : 1}>
      <rect x={x - 26} y={y - 70} width={52} height={78} rx={14} fill={farbe} stroke={rand} strokeWidth={4} />
      {glut}
      <ellipse cx={x - 66} cy={y - 128} rx={13} ry={22} fill={farbe} stroke={rand} strokeWidth={4} />
      <ellipse cx={x + 66} cy={y - 128} rx={13} ry={22} fill={farbe} stroke={rand} strokeWidth={4} />
      <ellipse cx={x} cy={y - 132} rx={64} ry={78} fill={farbe} stroke={rand} strokeWidth={4} />
      {!geist && (
        <g stroke={F.leise} strokeWidth={4} strokeLinecap="round" fill="none">
          <circle cx={x - 23} cy={y - 140} r={3} fill={F.leise} />
          <circle cx={x + 23} cy={y - 140} r={3} fill={F.leise} />
          <path d={`M${x} ${y - 132} L${x - 6} ${y - 108} L${x + 4} ${y - 106}`} />
          <path d={`M${x - 16} ${y - 86} Q${x} ${y - 78} ${x + 16} ${y - 86}`} />
        </g>
      )}
    </g>
  );
}

/** Daumen- und Fingerstellung für <HandFlach>: je Finger [Grund-, Mittel-, Endglied] als Beugung in Grad. */
export interface FlachHaltung {
  /** Beugung Zeige-, Mittel-, Ring-, Kleinfinger (je drei Werte); Standard gestreckt. */
  finger?: [number, number, number][];
  /** Spreizung je Finger in Grad (positiv = zur Daumenseite). */
  spreiz?: number[];
  /** Absolute Richtung der Daumenglieder im Handbild (180 = nach oben), drei Werte. */
  daumen?: [number, number, number];
}

const FINGER_BASIS: Punkt[] = [
  [24, -82], // Zeigefinger
  [8, -86],
  [-8, -84],
  [-23, -78], // Kleinfinger
];
const FINGER_GLIEDER: [number, number, number][] = [
  [34, 22, 18],
  [38, 25, 19],
  [35, 24, 18],
  [28, 18, 16],
];

/**
 * Offene Hand von vorn (Handrücken oder Handfläche), Handgelenk bei (0, 0), Finger nach oben,
 * Daumen rechts. Mit transform drehen/spiegeln.
 */
export function HandFlach({ haltung = {}, geist = false, kontur = true }: { haltung?: FlachHaltung; geist?: boolean; kontur?: boolean }) {
  const spreiz = haltung.spreiz ?? [6, 1, -4, -9];
  const finger = FINGER_BASIS.map((basis, i) => {
    const [g, m, e] = haltung.finger?.[i] ?? [0, 0, 0];
    const w0 = 180 - spreiz[i];
    // Beugen zeigt in dieser Ansicht nach unten über die Handfläche: Glieder werden kürzer gezeichnet.
    const k = (b: number) => Math.cos((b * Math.PI) / 180);
    const [l1, l2, l3] = FINGER_GLIEDER[i];
    return kette(basis, [w0, w0, w0], [l1 * k(g), l2 * k(g + m), l3 * k(g + m + e)]);
  });
  const daumen = kette([34, -30], haltung.daumen ?? [146, 162, 172], [28, 24, 20]);
  return (
    <g>
      {finger.map((punkte, i) => (
        <Glieder key={i} punkte={punkte} breite={i === 3 ? 15 : 17} geist={geist} kontur={kontur} />
      ))}
      <Glieder punkte={daumen} breite={20} geist={geist} kontur={kontur} />
      <Flaeche d="M-30 0 L-34 -60 Q-34 -84 -16 -80 L18 -82 Q34 -84 36 -66 L38 -52 Q50 -30 40 -10 L30 0 Z" geist={geist} />
    </g>
  );
}
