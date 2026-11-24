import { Etikett, F, Unterzeile, Zeichnung } from './bausteine';

interface Stufe {
  name: string;
  farbe: string;
  /** Schriftfarbe des Namens */
  schrift: string;
}

/** Von wenig zu viel, als Treppe gezeichnet; alle Stufen gleich breit (nicht maßstäblich). */
const STUFEN: Stufe[] = [
  { name: 'Mangel', farbe: F.kupfer, schrift: F.kupferHell },
  { name: 'knapp', farbe: F.kupferHell, schrift: F.linie },
  { name: 'ausreichend', farbe: F.petrol, schrift: F.linie },
  { name: 'kein Vorteil', farbe: F.petrolDunkel, schrift: F.leise },
  { name: 'zu viel', farbe: F.kupfer, schrift: F.kupferHell },
];

/** Grenzen zwischen den Stufen: ng/ml und nmol/l. */
const GRENZEN: [string, string][] = [
  ['12', '30'],
  ['20', '50'],
  ['50', '125'],
  ['100', '250'],
];

const LINKS = 35;
const BREITE = 130;
const BODEN = 560;
const HOEHE = (i: number) => 80 + i * 60;
const AUSREICHEND = 2;

/** Vitamin-D-Spiegel (25-OH-D) als Treppe: jede Stufe ein Bereich, die mittlere ist das Ziel. */
export default function VitaminDStufen() {
  return (
    <Zeichnung spiegelbar titel="Vitamin D im Blut als Treppe mit fünf gleich breiten Stufen: unter 12 ng/ml (30 nmol/l) Mangel, 12 bis 20 knapp, 20 bis 50 ausreichend und das Ziel, über 50 kein zusätzlicher Vorteil, über 100 ng/ml (250 nmol/l) zu viel">
      <Etikett x={360} y={76} anker="middle">
        Vitamin D im Blut
      </Etikett>

      {STUFEN.map((s, i) => {
        const x = LINKS + i * BREITE;
        const oben = BODEN - HOEHE(i);
        const ziel = i === AUSREICHEND;
        return (
          <g key={s.name}>
            <rect
              x={x + 3}
              y={oben}
              width={BREITE - 6}
              height={HOEHE(i)}
              rx="10"
              fill={s.farbe}
              stroke={F.linie}
              strokeWidth={ziel ? 6 : 3}
            />
          </g>
        );
      })}

      {/* Namen erst nach allen Stufen zeichnen, damit keine Stufe sie verdeckt */}
      {STUFEN.map((s, i) => (
        <Etikett
          key={s.name}
          x={LINKS + i * BREITE + BREITE / 2 - (s.name.length > 8 ? 18 : 0)}
          y={BODEN - HOEHE(i) - 20}
          anker="middle"
          farbe={s.schrift}
        >
          {s.name}
        </Etikett>
      ))}

      {/* Haken in der Zielstufe */}
      <path
        className="zeichnung__aufrecht"
        d={`M${LINKS + AUSREICHEND * BREITE + 38} ${BODEN - 70} l20 20 l34 -42`}
        fill="none"
        stroke={F.creme}
        strokeWidth="9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Grenzwerte unter den Stufenkanten */}
      {GRENZEN.map(([ng, nmol], i) => {
        const x = LINKS + (i + 1) * BREITE;
        return (
          <g key={ng}>
            <line x1={x} y1={BODEN + 6} x2={x} y2={BODEN + 20} stroke={F.linie} strokeWidth="3" strokeLinecap="round" />
            <Etikett x={x} y={BODEN + 50} anker="middle">
              {ng}
            </Etikett>
            <Unterzeile x={x} y={BODEN + 78} anker="middle">
              {nmol}
            </Unterzeile>
          </g>
        );
      })}

      <Unterzeile x={360} y={692} anker="middle">
        ng/ml (darunter nmol/l)
      </Unterzeile>
    </Zeichnung>
  );
}
