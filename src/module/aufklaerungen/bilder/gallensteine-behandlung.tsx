import { Etikett, F, KONTUR, Pfeil, Unterzeile, Zeichnung, Zeiger } from './bausteine';

/** Leber von vorn wie in fettleber.tsx, großer Lappen links im Bild. */
const LEBER =
  'M-150 -40 C-150 -92 -60 -96 20 -86 C90 -78 150 -70 150 -44 C150 -18 100 12 40 40 ' +
  'C-20 70 -80 96 -118 82 C-148 68 -150 22 -150 -40 Z';

/** Schlüssellochschnitte am Bauch [x, y]. */
const SCHNITTE: [number, number][] = [
  [180, 384],
  [180, 238],
  [124, 270],
  [118, 322],
];

/** Gallenblase per Schlüssellochoperation entfernt: vier kleine Schnitte, danach fließt die Galle direkt. */
export default function GallensteineBehandlung() {
  return (
    <Zeichnung titel="Links ein Bauch von vorn mit vier kleinen Schnitten der Schlüssellochoperation. Rechts Leber und Darm nach der Operation: Die Gallenblase fehlt, die Galle fließt durch den Gallengang direkt in den Darm">
      {/* Linke Hälfte: Bauch mit kleinen Schnitten */}
      <path
        d="M96 150 C76 270 84 400 104 560 L256 560 C276 400 284 270 264 150 C230 132 130 132 96 150 Z"
        {...KONTUR}
        fill={F.petrol}
      />
      <path d="M100 180 C150 214 210 214 260 180" fill="none" stroke={F.leise} strokeWidth="3" strokeOpacity="0.6" strokeLinecap="round" />
      <circle cx="180" cy="410" r="6" fill={F.leise} />
      {SCHNITTE.map(([x, y]) => (
        <path key={`${x}-${y}`} d={`M${x - 13} ${y} L${x + 13} ${y}`} stroke={F.kupferHell} strokeWidth="7" strokeLinecap="round" />
      ))}

      <Etikett x={180} y={96} anker="middle">
        Schlüsselloch-OP
      </Etikett>
      <Unterzeile x={180} y={608} anker="middle">
        vier kleine Schnitte
      </Unterzeile>

      <line x1="360" y1="80" x2="360" y2="640" stroke={F.leise} strokeWidth="2" strokeDasharray="4 8" strokeLinecap="round" />

      {/* Rechte Hälfte: Leber, Gallengang, Darm – ohne Gallenblase */}
      <path
        d="M690 440 C600 440 560 452 540 470 C520 488 520 520 540 540 C560 560 600 566 690 566"
        fill="none"
        stroke={F.linie}
        strokeWidth="56"
        strokeLinecap="round"
      />
      <path
        d="M690 440 C600 440 560 452 540 470 C520 488 520 520 540 540 C560 560 600 566 690 566"
        fill="none"
        stroke={F.petrol}
        strokeWidth="48"
        strokeLinecap="round"
      />
      <g transform="translate(540 240) scale(0.92)">
        <path d={LEBER} {...KONTUR} fill={F.petrol} vectorEffect="non-scaling-stroke" />
      </g>

      {/* Ehemalige Lage der Gallenblase */}
      <ellipse
        cx="474"
        cy="330"
        rx="30"
        ry="46"
        transform="rotate(-30 474 330)"
        fill="none"
        stroke={F.leise}
        strokeWidth="3"
        strokeDasharray="6 7"
      />

      {/* Gallengang mit Fluss */}
      <path d="M548 270 L548 456" stroke={F.linie} strokeWidth="20" strokeLinecap="round" />
      <path d="M548 270 L548 456" stroke={F.petrolHell} strokeWidth="12" strokeLinecap="round" />
      <Pfeil d="M590 300 L590 410" farbe={F.petrolHell} />

      <Etikett x={530} y={96} anker="middle">
        Danach
      </Etikett>
      <Zeiger von={[430, 420]} nach={[468, 344]} />
      <Unterzeile x={384} y={448}>
        Gallenblase
      </Unterzeile>
      <Unterzeile x={384} y={474}>
        fehlt
      </Unterzeile>

      <Etikett x={530} y={630} anker="middle">
        Galle fließt direkt
      </Etikett>
      <Unterzeile x={530} y={662} anker="middle">
        von der Leber in den Darm
      </Unterzeile>
    </Zeichnung>
  );
}
