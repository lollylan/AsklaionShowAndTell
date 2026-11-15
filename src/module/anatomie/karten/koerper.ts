// Körperkarten: Umriss von vorn und von hinten, darauf Hautfelder (Dermatome, Hautnerven).
//
// Koordinaten gelten für EINE Körperhälfte, die rechte des Patienten: x ist der Abstand von der
// Mittellinie nach außen, y läuft vom Scheitel (0) bis zur Fußsohle (1000). Die linke Seite und
// die Ansicht von hinten entstehen durch Spiegeln. Jede Fläche gehört zu einem Körperteil und
// wird an dessen Umriss abgeschnitten – Flächen dürfen also großzügig über den Rand ragen.
// Gezeichnet ist die anatomische Grundstellung: Arme leicht abgespreizt, Handflächen nach vorn.

export type Ansicht = 'vorn' | 'hinten';
export type Teil = 'kopf' | 'rumpf' | 'arm' | 'bein';
export type Seite = 'beide' | 'rechts' | 'links';

/** Eine Teilfläche: Pfad in Hälften-Koordinaten, abgeschnitten am Umriss von `teil`. */
export interface Flaeche {
  teil: Teil;
  d: string;
}

export interface Gebiet {
  id: string;
  /** Kurzname, steht auch als Beschriftung im Bild (z. B. „L5“ oder „Mittelnerv“). */
  name: string;
  /** Fachbegriff, klein unter dem Namen. */
  fach: string;
  gruppe: string;
  vorn?: Flaeche[];
  hinten?: Flaeche[];
  /** Wo die Beschriftung sitzt, je Ansicht (Hälften-Koordinaten). */
  marke?: Partial<Record<Ansicht, [number, number]>>;
  /**
   * Wo die Beschriftung stattdessen steht, wenn am Gebiet kein Platz ist (z. B. an der Hand);
   * eine kurze Linie führt dann zur `marke`.
   */
  schild?: Partial<Record<Ansicht, [number, number]>>;
  /** Kürzere Beschriftung im Bild, wenn der Name zu lang ist. */
  kurz?: string;
  wo: string;
  typisch: string;
}

export interface Gruppe {
  id: string;
  name: string;
  /** Farbtöne für „alle zeigen“; Nachbarn bekommen abwechselnd verschiedene. */
  toene: string[];
}

export interface Karte {
  id: 'dermatome' | 'hautnerven';
  name: string;
  fach: string;
  einleitung: string;
  /** Bei „alle zeigen“ ohne Auswahl jedes Gebiet beschriften (nur bei kurzen Namen sinnvoll). */
  alleBeschriften: boolean;
  gruppen: Gruppe[];
  gebiete: Gebiet[];
}

// ---------- Hilfen zum Zeichnen ----------

type Punkt = [number, number];

/** Vieleck aus Punkten. x = 0 wird leicht über die Mitte gezogen, damit keine Naht bleibt. */
export function eck(...punkte: Punkt[]): string {
  return (
    punkte
      .map(([x, y], i) => `${i ? 'L' : 'M'}${x <= 0 ? -2 : x},${y}`)
      .join(' ') + ' Z'
  );
}

/** Ellipse als Pfad (für Ringe mit Loch: mehrere Pfade aneinanderhängen, gefüllt wird evenodd). */
export function oval(cx: number, cy: number, rx: number, ry = rx): string {
  return `M${cx - rx},${cy} a${rx},${ry} 0 1,0 ${2 * rx},0 a${rx},${ry} 0 1,0 ${-2 * rx},0 Z`;
}

/** Grenzlinie eines Rumpfstreifens. Vorn fallen die Streifen zur Mitte hin ab, hinten steigen sie. */
export function linieVorn(y: number): Punkt[] {
  return [
    [-1, y],
    [60, y - 6],
    [150, y - 18],
  ];
}

export function linieHinten(y: number): Punkt[] {
  return [
    [-1, y],
    [60, y + 6],
    [150, y + 16],
  ];
}

/** Streifen zwischen zwei Grenzlinien. */
export function streifen(oben: Punkt[], unten: Punkt[]): string {
  return eck(...oben, ...[...unten].reverse());
}

// ---------- Der Umriss ----------

const KOPF = [
  // Schädel und Gesicht
  'M-0.6,0 C27,0 48,20 49,52 C50,78 44,96 38,106 C32,116 20,124 -0.6,127 Z',
  // Ohr
  'M44,48 C54,43 58,60 55,72 C54,80 50,83 45,80 Z',
  // Hals
  'M-0.6,110 L25,110 C26,135 28,150 36,170 L-0.6,174 Z',
];

const RUMPF_OBEN =
  'M-0.6,158 L34,160 C55,163 80,168 102,178 L100,210 L96,250 C96,280 94,300 90,330 ' +
  'C86,360 82,390 82,420 C84,445 92,470 100,490';

const RUMPF: Record<Ansicht, string[]> = {
  // Vorn endet der Rumpf an der Leiste.
  vorn: [RUMPF_OBEN + ' L6,555 L-0.6,556 Z'],
  // Hinten gehört das Gesäß dazu, bis zur Gesäßfalte.
  hinten: [RUMPF_OBEN + ' C106,510 107,535 104,560 C80,585 40,590 6,578 L-0.6,576 Z'],
};

const ARM = [
  'M100,176 C110,176 124,184 132,198 C138,212 140,228 140,245 L170,380 L186,450 L197,540 ' +
    // Daumen
    'L205,558 L215,580 L222,600 Q224,611 217,611 Q212,611 210,604 L203,588 ' +
    // Zeige-, Mittel-, Ring- und Kleinfinger
    'L202,600 L201.5,646 Q201.5,651 197.25,651 Q193,651 193,647 ' +
    'L193,653 Q193,658 188.75,658 Q184.5,658 184.5,653 ' +
    'L184.5,648 Q184.5,653 180.25,653 Q176,653 176,648 ' +
    'L176,632 Q176,637 172,637 Q168,637 168,632 ' +
    'L168,602 L170,545 L150,460 L136,385 L110,300 L96,250 L100,210 Z',
];

const BEIN_LANG =
  'C104,580 100,600 98,620 C92,660 86,690 82,720 C84,750 86,775 84,800 C80,850 70,890 64,925';
const BEIN_INNEN =
  'C34,880 26,840 26,800 C24,770 23,745 24,720 C22,680 20,650 14,620 C10,595 6,575 6,555';

const BEIN: Record<Ansicht, string[]> = {
  // Von vorn: Fußrücken mit Zehen.
  vorn: [
    'M100,490 C106,510 108,530 106,545 ' +
      BEIN_LANG +
      ' C70,940 76,958 79,975 Q83,988 76,991 L72,990 Q70,996 64,995 L60,995 Q58,999 53,998 ' +
      'Q49,1000 45,999 Q38,1002 32,998 Q28,994 29,985 C30,970 32,950 38,925 ' +
      BEIN_INNEN +
      ' Z',
  ],
  // Von hinten: Ferse und Sohle, wie auf Zehenspitzen.
  hinten: [
    'M104,560 ' +
      BEIN_LANG +
      ' C70,945 74,965 76,985 Q76,1003 58,1003 L44,1003 Q30,1003 30,990 C30,965 33,945 38,925 ' +
      BEIN_INNEN +
      ' L6,578 C40,590 80,585 104,560 Z',
  ],
};

export const TEILE: Record<Ansicht, Record<Teil, string[]>> = {
  vorn: { kopf: KOPF, rumpf: RUMPF.vorn, arm: ARM, bein: BEIN.vorn },
  hinten: { kopf: KOPF, rumpf: RUMPF.hinten, arm: ARM, bein: BEIN.hinten },
};

/** Feine Linien zur Orientierung: Finger, Zehen, Nabel, Gesäßspalte. */
export const LINIEN: Record<Ansicht, string> = {
  vorn:
    'M193,604 L193,646 M184.5,604 L184.5,648 M176,604 L176,632 M203,590 L206,600 ' +
    'M44,978 L44,998 M53,982 L53,997 M60,984 L60,994 M67,982 L67,993 ' +
    'M-0.6,440 m-3,0 a3,3 0 1,0 6,0 a3,3 0 1,0 -6,0',
  hinten:
    'M193,604 L193,646 M184.5,604 L184.5,648 M176,604 L176,632 M203,590 L206,600 ' +
    'M0,520 L0,574',
};
