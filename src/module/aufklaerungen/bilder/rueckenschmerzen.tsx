import { Etikett, F, KONTUR, Unterzeile, Zeichnung, Zeiger } from './bausteine';

/** Wirbelkörper: Mittelpunkt und Drehung, folgen der natürlichen Schwingung (Bauch links, Rücken rechts). */
const WIRBEL: [number, number, number][] = [
  [300, 150, 15.6],
  [272, 250, 11.3],
  [260, 350, 0],
  [272, 450, -11.3],
  [300, 550, -15.6],
];

const BANDSCHEIBEN: [number, number, number][] = [
  [286, 200, 13.5],
  [266, 300, 5.6],
  [266, 400, -5.6],
  [286, 500, -13.5],
];

/** Die beiden Rückenmuskel-Stränge hinter der Wirbelsäule. */
const MUSKELN = ['M512 110 C482 250 482 450 512 600', 'M562 110 C532 250 532 450 562 600'];

/** Lendenwirbelsäule von der Seite mit Rückenmuskeln, verspannter Bereich in Kupfer. */
export default function Rueckenschmerzen() {
  return (
    <Zeichnung titel="Lendenwirbelsäule von der Seite: fünf Wirbel mit Bandscheiben dazwischen, dahinter die Rückenmuskeln, ein Abschnitt der Muskeln ist verspannt">
      <g transform="translate(50 -30)">
        {/* Muskeln */}
        {MUSKELN.map((d) => (
          <g key={d}>
            <path d={d} {...KONTUR} strokeWidth="38" />
            <path d={d} {...KONTUR} stroke={F.petrol} strokeWidth="30" />
            <path
              d={d}
              fill="none"
              stroke={F.kupfer}
              strokeWidth="30"
              strokeDasharray="150 1000"
              strokeDashoffset="-290"
            />
          </g>
        ))}
        {/* Schmerz-Striche neben dem verspannten Bereich */}
        <path
          d="M572 428 L596 420 M574 450 L600 450 M572 472 L596 480"
          {...KONTUR}
          stroke={F.kupferHell}
        />

        {/* Bandscheiben zuerst, die Wirbel liegen darüber */}
        {BANDSCHEIBEN.map(([x, y, w]) => (
          <rect
            key={y}
            x="-54"
            y="-17"
            width="108"
            height="34"
            rx="15"
            transform={`translate(${x} ${y}) rotate(${w})`}
            fill={F.petrolHell}
            stroke={F.linie}
            strokeWidth="4"
          />
        ))}
        {WIRBEL.map(([x, y, w]) => (
          <g key={y} transform={`translate(${x} ${y}) rotate(${w})`}>
            {/* Dornfortsatz nach hinten */}
            <path
              d="M60 -14 L95 -10 C110 -8 150 6 165 22 C168 30 158 34 150 30 C130 20 100 14 60 14 Z"
              {...KONTUR}
              fill={F.creme}
            />
            <rect x="-60" y="-34" width="120" height="68" rx="14" {...KONTUR} fill={F.creme} />
          </g>
        ))}
      </g>

      <Zeiger von={[128, 208]} nach={[264, 208]} />
      <Etikett x={30} y={216}>
        Wirbel
      </Etikett>
      <Zeiger von={[202, 375]} nach={[268, 374]} />
      <Etikett x={30} y={383}>
        Bandscheibe
      </Etikett>

      <Zeiger von={[684, 612]} nach={[602, 470]} />
      <Etikett x={690} y={642} anker="end" farbe={F.kupferHell}>
        Muskeln verspannt
      </Etikett>

      <Unterzeile x={360} y={686} anker="middle">
        Meist harmlos – Bewegung hilft
      </Unterzeile>
    </Zeichnung>
  );
}
