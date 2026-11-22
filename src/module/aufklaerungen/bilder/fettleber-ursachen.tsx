import { Etikett, F, KONTUR, Pfeil, Unterzeile, Zeichnung } from './bausteine';

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

/** Knoten und Narben der vernarbten Leber. */
const KNOTEN: [number, number][] = [
  [-110, -40],
  [-70, -50],
  [-30, -50],
  [10, -54],
  [50, -50],
  [90, -46],
  [-110, 0],
  [-70, -10],
  [-30, -12],
  [10, -14],
  [50, -10],
  [-90, 40],
  [-50, 30],
  [-10, 24],
];

type Stufe = 'fett' | 'entzuendet' | 'vernarbt';

function Leber({ x, stufe }: { x: number; stufe: Stufe }) {
  const s = stufe === 'vernarbt' ? 0.56 : 0.66;
  return (
    <g transform={`translate(${x} 290) scale(${s})`}>
      <path d={LEBER} fill={stufe === 'vernarbt' ? F.petrolDunkel : F.petrol} />
      <g clipPath="url(#fettleber-ursachen-form)">
        {stufe === 'entzuendet' && <path d={LEBER} fill={F.kupfer} opacity="0.45" />}
        {stufe !== 'vernarbt' &&
          TROPFEN.map(([tx, ty, r]) => (
            <circle key={`${tx}-${ty}`} cx={tx} cy={ty} r={r} fill={F.kupferHell} stroke={F.kupfer} strokeWidth="3" />
          ))}
        {stufe === 'vernarbt' &&
          KNOTEN.map(([tx, ty]) => (
            <circle
              key={`${tx}-${ty}`}
              cx={tx}
              cy={ty}
              r="17"
              fill={F.petrol}
              stroke={F.leise}
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />
          ))}
      </g>
      <path
        d={LEBER}
        {...KONTUR}
        stroke={stufe === 'fett' ? F.linie : F.kupferHell}
        vectorEffect="non-scaling-stroke"
      />
    </g>
  );
}

/** Was aus einer Fettleber werden kann: Entzündung und Vernarbung über Jahre. */
export default function FettleberUrsachen() {
  return (
    <Zeichnung titel="Drei Lebern nebeneinander: Fettleber, dann bei manchen eine entzündete Fettleber, über Jahre eine kleine, vernarbte und knotige Leber. Oben die Auslöser: Übergewicht, gesüßte Getränke, Alkohol">
      <defs>
        <clipPath id="fettleber-ursachen-form">
          <path d={LEBER} />
        </clipPath>
      </defs>

      <Etikett x={360} y={86} anker="middle">
        Übergewicht, Süßgetränke, Alkohol
      </Etikett>
      <Pfeil d="M140 110 L140 210" farbe={F.leise} />

      <Leber x={125} stufe="fett" />
      <Leber x={360} stufe="entzuendet" />
      <Leber x={595} stufe="vernarbt" />

      <Pfeil d="M228 300 L262 300" farbe={F.leise} />
      <Pfeil d="M462 300 L496 300" farbe={F.leise} />

      <Etikett x={125} y={430} anker="middle">
        Fettleber
      </Etikett>
      <Unterzeile x={125} y={462} anker="middle">
        sehr häufig
      </Unterzeile>
      <Etikett x={360} y={430} anker="middle" farbe={F.kupferHell}>
        Entzündung
      </Etikett>
      <Unterzeile x={360} y={462} anker="middle">
        bei manchen
      </Unterzeile>
      <Etikett x={595} y={430} anker="middle" farbe={F.kupferHell}>
        Vernarbung
      </Etikett>
      <Unterzeile x={595} y={462} anker="middle">
        über Jahre, bis
      </Unterzeile>
      <Unterzeile x={595} y={490} anker="middle">
        zur Zirrhose
      </Unterzeile>

      <Unterzeile x={360} y={630} anker="middle" farbe={F.linie}>
        Früh erkannt, bildet sich die Fettleber zurück
      </Unterzeile>
    </Zeichnung>
  );
}
