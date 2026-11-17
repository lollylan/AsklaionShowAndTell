import { Etikett, F, Pfeil, Unterzeile, Zeichnung } from './bausteine';

type Punkt = [number, number];

const OBEN = 150;
const SIEB = 330;
const UNTEN = 500;
const BREITE = 264;

/** Kreatinin: kleine Punkte, relativ zur Mitte der Hälfte. */
const KREA_BLUT_GESUND: Punkt[] = [
  [-90, 200],
  [60, 190],
];
const KREA_URIN_GESUND: Punkt[] = [
  [-92, 400],
  [-48, 446],
  [-6, 392],
  [36, 450],
  [80, 404],
  [100, 462],
];
const KREA_BLUT_KRANK: Punkt[] = [
  [-100, 196],
  [-70, 274],
  [-24, 290],
  [16, 270],
  [56, 196],
  [92, 270],
  [104, 222],
  [-10, 184],
  [0, 232],
];
const KREA_URIN_KRANK: Punkt[] = [
  [-80, 420],
  [80, 450],
];

/** Albumin (Eiweiß): große Scheiben. */
const ALBUMIN_GESUND: Punkt[] = [
  [-50, 240],
  [10, 236],
  [80, 244],
];
const ALBUMIN_KRANK_BLUT: Punkt[] = [
  [-62, 232],
  [52, 238],
];
const ALBUMIN_KRANK_URIN: Punkt = [6, 440];

/** Lücken im Sieb (x relativ zur Mitte). */
const LOECHER = [-96, -58, -20, 20, 58, 96];

function Kreatinin({ cx, punkte }: { cx: number; punkte: Punkt[] }) {
  return (
    <g fill={F.kupferHell}>
      {punkte.map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={cx + x} cy={y} r="7" />
      ))}
    </g>
  );
}

function Albumin({ cx, punkte }: { cx: number; punkte: Punkt[] }) {
  return (
    <g>
      {punkte.map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={cx + x} cy={y} r="18" fill={F.creme} stroke={F.leise} strokeWidth="3" />
      ))}
    </g>
  );
}

/**
 * Eine Hälfte: Blut oben, Sieb in der Mitte, Urin unten.
 * zu = Löcher, die vernarbt sind; riss = Stelle, an der der Filter undicht ist.
 */
function Filter({ cx, zu = [], riss }: { cx: number; zu?: number[]; riss?: number }) {
  const links = cx - BREITE / 2;
  // Siebstücke zwischen den Löchern; an der Rissstelle fehlt ein breites Stück.
  const kanten = [-BREITE / 2, ...LOECHER, BREITE / 2];
  const stuecke: [number, number][] = [];
  for (let i = 0; i < kanten.length - 1; i++) {
    const a = kanten[i] + (i === 0 ? 0 : 8);
    const b = kanten[i + 1] - (i === kanten.length - 2 ? 0 : 8);
    // An der undichten Stelle fehlt das Sieb ganz.
    if (riss !== undefined && b > riss - 30 && a < riss + 30) {
      if (a < riss - 30) stuecke.push([a, riss - 30]);
      if (b > riss + 30) stuecke.push([riss + 30, b]);
    } else {
      stuecke.push([a, b]);
    }
  }
  return (
    <g>
      <rect x={links} y={OBEN} width={BREITE} height={SIEB - OBEN} rx="20" fill={F.petrolDunkel} />
      <rect x={links} y={SIEB} width={BREITE} height={UNTEN - SIEB} rx="20" fill={F.tief} />
      <rect
        x={links}
        y={OBEN}
        width={BREITE}
        height={UNTEN - OBEN}
        rx="20"
        fill="none"
        stroke={F.leise}
        strokeWidth="3"
      />

      {/* Sieb */}
      {stuecke.map(([a, b]) => (
        <line
          key={a}
          x1={cx + a}
          y1={SIEB}
          x2={cx + b}
          y2={SIEB}
          stroke={F.linie}
          strokeWidth="8"
          strokeLinecap="round"
        />
      ))}
      {zu.map((i) => (
        <circle key={i} cx={cx + LOECHER[i]} cy={SIEB} r="10" fill={F.kupfer} stroke={F.kupferHell} strokeWidth="2" />
      ))}
      {riss !== undefined && (
        <g>
          <line
            x1={cx + riss - 30}
            y1={SIEB - 14}
            x2={cx + riss - 30}
            y2={SIEB + 14}
            stroke={F.kupfer}
            strokeWidth="5"
            strokeLinecap="round"
          />
          <line
            x1={cx + riss + 30}
            y1={SIEB - 14}
            x2={cx + riss + 30}
            y2={SIEB + 14}
            stroke={F.kupfer}
            strokeWidth="5"
            strokeLinecap="round"
          />
        </g>
      )}
    </g>
  );
}

/** Der Nierenfilter als Sieb: gesund und geschädigt, mit Kreatinin und Albumin. */
export default function Nierenwerte() {
  const gesund = 180;
  const krank = 540;
  return (
    <Zeichnung titel="Der Nierenfilter als Sieb. Gesund: Kreatinin geht durch das Sieb in den Urin, das Eiweiß Albumin bleibt im Blut. Geschädigt: Viele Löcher sind vernarbt, Kreatinin staut sich im Blut, und durch eine undichte Stelle geht Albumin in den Urin verloren.">
      <Filter cx={gesund} />
      <Kreatinin cx={gesund} punkte={[...KREA_BLUT_GESUND, ...KREA_URIN_GESUND]} />
      <Albumin cx={gesund} punkte={ALBUMIN_GESUND} />
      <Pfeil d={`M${gesund - 20} 300 L${gesund - 20} 368`} farbe={F.kupferHell} breite={4} />
      <Pfeil d={`M${gesund + 60} 300 L${gesund + 60} 368`} farbe={F.kupferHell} breite={4} />

      <Filter cx={krank} zu={[0, 1, 4, 5]} riss={0} />
      <Kreatinin cx={krank} punkte={[...KREA_BLUT_KRANK, ...KREA_URIN_KRANK]} />
      <Albumin cx={krank} punkte={[...ALBUMIN_KRANK_BLUT, ALBUMIN_KRANK_URIN]} />
      <Pfeil d={`M${krank - 4} 290 L${krank + 4} 404`} farbe={F.creme} breite={4} />

      {/* Überschriften */}
      <Etikett x={gesund} y={70} anker="middle">
        Gesunder Filter
      </Etikett>
      <Unterzeile x={gesund} y={104} anker="middle">
        Kreatinin geht in den Urin
      </Unterzeile>
      <Etikett x={krank} y={70} anker="middle" farbe={F.kupferHell}>
        Geschädigter Filter
      </Etikett>
      <Unterzeile x={krank} y={104} anker="middle">
        Kreatinin staut sich im Blut
      </Unterzeile>

      {/* Blut und Urin zwischen den Hälften */}
      <Unterzeile x={360} y={248} anker="middle">
        Blut
      </Unterzeile>
      <Unterzeile x={360} y={424} anker="middle">
        Urin
      </Unterzeile>

      <Unterzeile x={krank} y={540} anker="middle" farbe={F.kupferHell}>
        Albumin im Urin
      </Unterzeile>

      {/* Legende */}
      <circle cx="150" cy="626" r="8" fill={F.kupferHell} />
      <Etikett x={170} y={635}>
        Kreatinin
      </Etikett>
      <circle cx="400" cy="626" r="18" fill={F.creme} stroke={F.leise} strokeWidth="3" />
      <Etikett x={430} y={635}>
        Albumin
      </Etikett>
      <Unterzeile x={430} y={665}>
        ein Eiweiß
      </Unterzeile>
    </Zeichnung>
  );
}
