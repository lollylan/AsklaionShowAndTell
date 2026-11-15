import { Etikett, F, KONTUR, Pfeil, Unterzeile, Zeichnung } from './bausteine';

/** Leber von vorn, Mittelpunkt (0, 0), etwa 300 breit; großer Lappen links im Bild. */
const LEBER =
  'M-150 -40 C-150 -92 -60 -96 20 -86 C90 -78 150 -70 150 -44 C150 -18 100 12 40 40 ' +
  'C-20 70 -80 96 -118 82 C-148 68 -150 22 -150 -40 Z';

/** Fetttröpfchen in der Leber [x, y, r]. */
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
  [-10, 30, 11],
  [-8, -72, 9],
];

function Leber({ fett }: { fett: boolean }) {
  return (
    <g>
      <path d={LEBER} fill={F.petrol} />
      {fett && (
        <g clipPath="url(#fettleber-form)" fill={F.kupferHell} stroke={F.kupfer} strokeWidth="3">
          {TROPFEN.map(([tx, ty, r]) => (
            <circle key={`${tx}-${ty}`} cx={tx} cy={ty} r={r} />
          ))}
        </g>
      )}
      <path d={LEBER} {...KONTUR} />
    </g>
  );
}

/** Gesunde Leber und Fettleber nebeneinander; Abnehmen führt zurück. */
export default function Fettleber() {
  return (
    <Zeichnung titel="Links eine gesunde Leber, rechts eine Fettleber voller Fetttröpfchen; ein Pfeil vom kranken zum gesunden Organ zeigt, dass Abnehmen das Fett schwinden lässt">
      <defs>
        <clipPath id="fettleber-form">
          <path d={LEBER} />
        </clipPath>
      </defs>

      <g transform="translate(184 310)">
        <Leber fett={false} />
      </g>
      <g transform="translate(536 310)">
        <Leber fett />
      </g>

      <Etikett x={184} y={120} anker="middle">
        Gesunde Leber
      </Etikett>
      <Etikett x={536} y={120} anker="middle" farbe={F.kupferHell}>
        Fettleber
      </Etikett>
      <Unterzeile x={536} y={152} anker="middle">
        Fett in den Leberzellen
      </Unterzeile>

      <Pfeil d="M520 460 C470 540 250 540 200 460" farbe={F.petrolHell} breite={7} />
      <Etikett x={360} y={600} anker="middle">
        Abnehmen
      </Etikett>
      <Unterzeile x={360} y={634} anker="middle">
        lässt das Fett wieder schwinden
      </Unterzeile>
    </Zeichnung>
  );
}
