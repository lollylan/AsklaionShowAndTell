// Gemeinsame Bausteine für die Schemazeichnungen der Aufklärungen.
//
// Jede Zeichnung ist eine eigene Datei in diesem Ordner, heißt wie die id der
// Krankheit (z. B. asthma.tsx) und exportiert als default eine Komponente ohne
// Props. Sie wird von selbst gefunden (siehe index.ts).
//
// Regeln, damit alle Zeichnungen wie aus einer Hand aussehen:
//   - Fläche immer 720 × 720, dunkler Petrol-Hintergrund kommt von der Bühne
//     (kein eigenes Hintergrund-Rechteck zeichnen).
//   - Konturen: F.linie, Strichstärke 4, runde Enden. Nebensächliches F.leise.
//   - Gesundes Gewebe in Petroltönen (F.petrol, F.petrolHell), das Kranke oder
//     Wichtige in Kupfer (F.kupfer, F.kupferHell). Kupfer sparsam.
//   - Beschriftung nur über <Etikett> (26 px) und <Unterzeile> (22 px), auf
//     Deutsch in Patientensprache, höchstens etwa sechs Beschriftungen.
//   - Vergleich „gesund / erkrankt“ nebeneinander oder übereinander, gleiche
//     Größe, gleiche Blickrichtung.

import type { CSSProperties, ReactNode } from 'react';

export const F = {
  linie: '#eef6f7',
  leise: '#a9cbd3',
  petrolHell: '#2a93ab',
  petrol: '#03758f',
  petrolDunkel: '#025669',
  tief: '#012c37',
  kupfer: '#d4713f',
  kupferHell: '#f3b48f',
  creme: '#fdf8f5',
} as const;

/** Strich-Voreinstellung für Konturen. Mit {...KONTUR} auf path, circle usw. */
export const KONTUR = {
  fill: 'none',
  stroke: F.linie,
  strokeWidth: 4,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const;

type Punkt = [number, number];

/** Rahmen jeder Zeichnung. titel = ein Satz, der das Bild für Vorleseprogramme beschreibt. */
export function Zeichnung({ titel, children }: { titel: string; children: ReactNode }) {
  return (
    <svg className="zeichnung" viewBox="0 0 720 720" role="img" aria-label={titel}>
      <defs>
        <marker
          id="pfeilspitze"
          viewBox="0 0 12 12"
          refX="9"
          refY="6"
          markerWidth="5"
          markerHeight="5"
          orient="auto-start-reverse"
        >
          <path d="M1 1 L11 6 L1 11 Z" fill="context-stroke" />
        </marker>
      </defs>
      {children}
    </svg>
  );
}

interface TextProps {
  x: number;
  y: number;
  /** Ausrichtung am Punkt: links (Standard), mitte oder rechts. */
  anker?: 'start' | 'middle' | 'end';
  farbe?: string;
  children: ReactNode;
}

/** Beschriftung, 26 px fett. */
export function Etikett({ x, y, anker = 'start', farbe = F.linie, children }: TextProps) {
  return (
    <text x={x} y={y} textAnchor={anker} fontSize="26" fontWeight="700" fill={farbe}>
      {children}
    </text>
  );
}

/** Zweite Zeile oder leise Erläuterung, 22 px. */
export function Unterzeile({ x, y, anker = 'start', farbe = F.leise, children }: TextProps) {
  return (
    <text x={x} y={y} textAnchor={anker} fontSize="22" fill={farbe}>
      {children}
    </text>
  );
}

/** Dünne Hinweislinie von einer Beschriftung (von) zu einer Stelle im Bild (nach, mit Punkt). */
export function Zeiger({ von, nach }: { von: Punkt; nach: Punkt }) {
  return (
    <g>
      <line
        x1={von[0]}
        y1={von[1]}
        x2={nach[0]}
        y2={nach[1]}
        stroke={F.leise}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx={nach[0]} cy={nach[1]} r="5" fill={F.leise} />
    </g>
  );
}

/** Pfeil entlang eines Pfades (d) – für Blutfluss, Luftstrom, Druck. */
export function Pfeil({
  d,
  farbe = F.linie,
  breite = 5,
}: {
  d: string;
  farbe?: string;
  breite?: number;
}) {
  return (
    <path
      d={d}
      fill="none"
      stroke={farbe}
      strokeWidth={breite}
      strokeLinecap="round"
      strokeLinejoin="round"
      markerEnd="url(#pfeilspitze)"
    />
  );
}

// ---------- Bewegung ----------
//
// Einige Zeichnungen bewegen sich auf dem Patientenbildschirm (CSS in bewegung.css).
// Grundregel: Das ruhende SVG ist der Endzustand. Die Bewegung läuft nur unter
// .aufkblatt__bild am Bildschirm und ohne „Bewegung reduzieren“; Druck, Handzettel,
// /korrektur und zeige_svg.mjs zeigen dasselbe Bild ohne Bewegung. Bewegt werden nur
// Formen und Gruppen, nie Textinhalte (sonst greift die Übersetzung nicht).
// Eigene Keyframes und Klassen einer Zeichnung tragen ihren Dateinamen als Präfix.

/**
 * Blendet eine Gruppe nach `ab` Sekunden ein (von `von` auf volle Deckkraft) und lässt sie
 * stehen. Für Abläufe in Reihenfolge: Stationen eines Kreislaufs, Schritte, der Ausweg zuletzt.
 */
export function Folge({
  ab,
  von = 0.18,
  dauer = 0.8,
  children,
}: {
  ab: number;
  von?: number;
  dauer?: number;
  children: ReactNode;
}) {
  const stil = { '--zb-ab': `${ab}s`, '--zb-von': von, '--zb-dauer': `${dauer}s` } as CSSProperties;
  return (
    <g className="zb-folge" style={stil}>
      {children}
    </g>
  );
}

/**
 * Kleine Punkte, die entlang eines Pfades wandern – Blut, Luft. Nur in Bewegung sichtbar;
 * ruhend bleibt der gezeichnete Pfeil darunter allein stehen. `klasse` legt eine Gruppe
 * darum, etwa um den Fluss nur in einer Phase zu zeigen.
 */
export function Fluss({
  d,
  farbe = F.linie,
  breite = 7,
  dauer = 1.4,
  ab = 0,
  klasse,
}: {
  d: string;
  farbe?: string;
  breite?: number;
  /** Sekunden, bis ein Punkt seinen Abstand zum nächsten zurückgelegt hat. */
  dauer?: number;
  ab?: number;
  klasse?: string;
}) {
  const stil = { '--zb-dauer': `${dauer}s`, '--zb-ab': `${ab}s` } as CSSProperties;
  return (
    <g className={klasse}>
      <path
        className="zb-fluss"
        d={d}
        fill="none"
        stroke={farbe}
        strokeWidth={breite}
        strokeLinecap="round"
        opacity="0"
        style={stil}
      />
    </g>
  );
}

/**
 * Ein Strich, der sich in Bewegung vom Anfang zum Ende zeichnet – der Weg eines Virus, eine
 * wachsende Umgehung. Ruhend steht er vollständig da.
 */
export function Wachsen({
  d,
  farbe = F.linie,
  breite = 5,
  dauer = 1.4,
  ab = 0,
  kappe = 'round',
}: {
  d: string;
  farbe?: string;
  breite?: number;
  dauer?: number;
  ab?: number;
  /** 'butt' für breite Bögen, die eine Tortenstück-Fläche füllen (Uhr). */
  kappe?: 'round' | 'butt';
}) {
  const stil = { '--zb-dauer': `${dauer}s`, '--zb-ab': `${ab}s` } as CSSProperties;
  return (
    <path
      className="zb-wachsen"
      d={d}
      pathLength={1}
      fill="none"
      stroke={farbe}
      strokeWidth={breite}
      strokeLinecap={kappe}
      style={stil}
    />
  );
}

/**
 * Kopf von oben, Nase zeigt nach oben im Bild. Mittelpunkt ist (0, 0), 190 breit und 215 hoch –
 * mit transform an die gewünschte Stelle schieben. `children` liegen auf der Kopfhaut und werden
 * auf die behaarte Fläche beschnitten (Haare, kahle Stellen).
 */
export function KopfVonOben({ children }: { children?: ReactNode }) {
  return (
    <g>
      <defs>
        <clipPath id="haarflaeche">
          <ellipse cx="0" cy="8" rx="79" ry="88" />
        </clipPath>
      </defs>
      <ellipse cx="-86" cy="10" rx="10" ry="20" fill={F.creme} stroke={F.linie} strokeWidth="4" />
      <ellipse cx="86" cy="10" rx="10" ry="20" fill={F.creme} stroke={F.linie} strokeWidth="4" />
      <path d="M-13 -92 Q0 -118 13 -92 Z" fill={F.creme} stroke={F.linie} strokeWidth="4" strokeLinejoin="round" />
      <ellipse cx="0" cy="0" rx="84" ry="98" fill={F.creme} stroke={F.linie} strokeWidth="4" />
      <g clipPath="url(#haarflaeche)">{children}</g>
    </g>
  );
}

/** Lücken im Haar, versetzt über die ganze Kopfhaut verteilt. */
const LUECKEN: [number, number][] = [];
for (let reihe = 0; reihe < 9; reihe++) {
  for (let spalte = 0; spalte < 8; spalte++) {
    LUECKEN.push([-78 + spalte * 22 + (reihe % 2) * 11, -74 + reihe * 20]);
  }
}

/** Haar für <KopfVonOben>; mit `licht` scheint überall die Kopfhaut durch. */
export function Haar({ licht = false }: { licht?: boolean }) {
  return (
    <>
      <ellipse cx="0" cy="8" rx="79" ry="88" fill={F.petrolHell} />
      {licht && (
        <g fill={F.kupferHell}>
          {LUECKEN.map(([x, y]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="5.5" />
          ))}
        </g>
      )}
    </>
  );
}
