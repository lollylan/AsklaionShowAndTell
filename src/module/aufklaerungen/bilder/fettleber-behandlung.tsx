import { Etikett, F, KONTUR, Unterzeile, Zeichnung } from './bausteine';

/** Leber wie in fettleber.tsx, Mittelpunkt (0, 0), etwa 300 breit. */
const LEBER =
  'M-150 -40 C-150 -92 -60 -96 20 -86 C90 -78 150 -70 150 -44 C150 -18 100 12 40 40 ' +
  'C-20 70 -80 96 -118 82 C-148 68 -150 22 -150 -40 Z';

const TROPFEN: [number, number, number][] = [
  [-112, -40, 18],
  [-70, -62, 14],
  [-28, -26, 20],
  [14, -58, 15],
  [60, -52, 13],
  [108, -46, 12],
  [-122, 18, 15],
  [-78, 6, 17],
  [-44, 44, 14],
  [18, 6, 16],
  [66, -10, 13],
  [-96, 60, 11],
];

/** Leber mit `anzahl` Fetttröpfchen, Mittelpunkt (x, y). */
function Leber({ x, y, nur }: { x: number; y: number; nur: (i: number) => boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(0.6)`}>
      <path d={LEBER} fill={F.petrol} />
      <g clipPath="url(#fettleber-behandlung-form)">
        {TROPFEN.filter((_, i) => nur(i)).map(([tx, ty, r]) => (
          <circle key={`${tx}-${ty}`} cx={tx} cy={ty} r={r} fill={F.kupferHell} stroke={F.kupfer} strokeWidth="3" />
        ))}
      </g>
      <path d={LEBER} {...KONTUR} vectorEffect="non-scaling-stroke" />
    </g>
  );
}

/** Stufen beim Abnehmen: ab fünf Prozent weniger Leberfett, ab zehn Prozent heilt beginnende Vernarbung. */
export default function FettleberBehandlung() {
  return (
    <Zeichnung titel="Eine Treppe nach unten für das Körpergewicht: Heute viel Fett in der Leber, fünf Prozent weniger Gewicht verringern das Leberfett, zehn Prozent weniger lassen sogar beginnende Narben zurückgehen">
      <defs>
        <clipPath id="fettleber-behandlung-form">
          <path d={LEBER} />
        </clipPath>
      </defs>

      <Etikett x={40} y={80}>
        Abnehmen hilft der Leber
      </Etikett>
      <Unterzeile x={40} y={112}>
        langsam, etwa ein halbes Kilo pro Woche
      </Unterzeile>

      {/* Treppe: das Gewicht sinkt */}
      <path d="M40 300 L260 300 L260 370 L480 370 L480 440 L680 440 L680 490 L40 490 Z" fill={F.petrolDunkel} />
      <path d="M40 300 L260 300 L260 370 L480 370 L480 440 L680 440" {...KONTUR} />

      <Leber x={150} y={236} nur={() => true} />
      <Leber x={370} y={306} nur={(i) => i % 3 === 0} />
      <Leber x={580} y={376} nur={() => false} />

      <Etikett x={150} y={546} anker="middle">
        Heute
      </Etikett>
      <Unterzeile x={150} y={578} anker="middle">
        viel Leberfett
      </Unterzeile>
      <Etikett x={370} y={546} anker="middle">
        – 5 %
      </Etikett>
      <Unterzeile x={370} y={578} anker="middle">
        weniger Leberfett
      </Unterzeile>
      <Etikett x={580} y={546} anker="middle">
        – 10 %
      </Etikett>
      <Unterzeile x={580} y={578} anker="middle">
        auch beginnende
      </Unterzeile>
      <Unterzeile x={580} y={606} anker="middle">
        Narben gehen zurück
      </Unterzeile>
    </Zeichnung>
  );
}
