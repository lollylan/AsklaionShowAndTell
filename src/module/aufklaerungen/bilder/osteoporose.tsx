import { Etikett, F, Unterzeile, Zeichnung, Zeiger } from './bausteine';

/** Mittelpunkte der Hohlräume: Wabenmuster rund um (0,0), 19 Stück. */
const WABEN: [number, number][] = [];
for (let j = -2; j <= 2; j++) {
  for (let i = -3; i <= 3; i++) {
    const x = i * 56 + (j % 2 !== 0 ? 28 : 0);
    const y = j * 48.5;
    if (Math.hypot(x, y) <= 113) WABEN.push([x, y]);
  }
}

/** Gebrochene Bälkchen bei Osteoporose: je zwei Hohlräume fließen zusammen. */
const BRUECHE: [number, number][] = [
  [0, 0],
  [-84, -48.5],
  [28, 48.5],
];

/** Lupenblick ins Knocheninnere: heller Knochen mit dunklen Hohlräumen. */
function Lupe({ cx, cy, krank }: { cx: number; cy: number; krank: boolean }) {
  return (
    <g transform={`translate(${cx} ${cy})`}>
      <circle r="150" fill={F.creme} stroke={krank ? F.kupfer : F.linie} strokeWidth={krank ? 6 : 4} />
      {WABEN.map(([x, y]) => (
        <circle key={`${x}/${y}`} cx={x} cy={y} r={krank ? 24 : 15} fill={F.tief} />
      ))}
      {krank &&
        BRUECHE.map(([x, y]) => (
          <g key={`${x}/${y}`}>
            <line x1={x} y1={y} x2={x + 56} y2={y} stroke={F.tief} strokeWidth="34" strokeLinecap="round" />
            {/* Stümpfe des gebrochenen Bälkchens */}
            <line x1={x + 28} y1={y - 19} x2={x + 28} y2={y - 9} stroke={F.kupfer} strokeWidth="6" strokeLinecap="round" />
            <line x1={x + 28} y1={y + 19} x2={x + 28} y2={y + 9} stroke={F.kupfer} strokeWidth="6" strokeLinecap="round" />
          </g>
        ))}
    </g>
  );
}

/** Blick ins Knocheninnere: links dichtes Gerüst, rechts dünn und lückenhaft. */
export default function Osteoporose() {
  return (
    <Zeichnung titel="Blick ins Innere eines Knochens: links ein dichtes Gerüst mit kleinen Poren, rechts bei Osteoporose dünne, teils gebrochene Bälkchen mit großen Hohlräumen">
      <Lupe cx={185} cy={320} krank={false} />
      <Lupe cx={535} cy={320} krank />

      <Etikett x={185} y={66} anker="middle">
        Gesunder Knochen
      </Etikett>
      <Unterzeile x={185} y={98} anker="middle">
        Dichtes, festes Gerüst
      </Unterzeile>
      <Etikett x={535} y={66} anker="middle" farbe={F.kupferHell}>
        Osteoporose
      </Etikett>
      <Unterzeile x={535} y={98} anker="middle">
        Dünnes Gerüst mit Lücken
      </Unterzeile>

      <Zeiger von={[120, 532]} nach={[181, 420]} />
      <Etikett x={40} y={560}>
        Kleine Poren
      </Etikett>
      <Zeiger von={[600, 532]} nach={[540, 420]} />
      <Etikett x={690} y={560} anker="end">
        Große Hohlräume
      </Etikett>

      <Unterzeile x={360} y={640} anker="middle">
        Der Knochen bricht leichter
      </Unterzeile>
    </Zeichnung>
  );
}
