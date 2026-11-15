import { Etikett, F, KONTUR, Pfeil, Unterzeile, Zeichnung, Zeiger } from './bausteine';

type Punkt = [number, number];

/** Lage der Filterkörperchen in der Niere (relativ zur Nierenmitte). */
const FILTER: Punkt[] = [
  [-38, -58],
  [8, -62],
  [-48, -8],
  [-8, -2],
  [-38, 46],
  [8, 56],
];

/** Abfallstoffe als Punkte, relativ zur Mitte des jeweiligen Tropfens. */
const VIELE: Punkt[] = [
  [-14, -12],
  [8, -16],
  [18, 4],
  [-2, 2],
  [-16, 12],
  [6, 18],
];
const FAST_ALLE: Punkt[] = [
  [-14, -12],
  [8, -16],
  [18, 4],
  [-16, 12],
  [6, 18],
];
const EINER: Punkt[] = [[2, 4]];

function Abfall({ cx, cy, punkte }: { cx: number; cy: number; punkte: Punkt[] }) {
  return (
    <g fill={F.kupferHell}>
      {punkte.map(([dx, dy]) => (
        <circle key={`${dx}-${dy}`} cx={cx + dx} cy={cy + dy} r="6" />
      ))}
    </g>
  );
}

/** Eine Hälfte: Blut kommt von oben, die Niere trennt in Blut (links) und Urin (rechts). */
function Filterbild({ cx, vernarbt }: { cx: number; vernarbt: number[] }) {
  const krank = vernarbt.length > 0;
  const ux = cx + 80;
  return (
    <g>
      {/* Blut fließt hinein */}
      <circle cx={cx} cy={146} r="36" {...KONTUR} fill={F.petrolDunkel} />
      <Abfall cx={cx} cy={146} punkte={VIELE} />
      <Pfeil d={`M${cx} 190 L${cx} 230`} breite={5} />

      {/* Niere */}
      <g transform={`translate(${cx} 347)`}>
        <path
          d="M20 -100 C-40 -125 -85 -70 -80 0 C-75 75 -30 120 25 100 C60 88 62 55 45 30 C32 12 32 -12 45 -30 C62 -55 58 -85 20 -100 Z"
          {...KONTUR}
          fill={F.petrol}
        />
        {FILTER.map(([x, y], i) =>
          vernarbt.includes(i) ? (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="12"
              fill={F.kupfer}
              stroke={F.kupferHell}
              strokeWidth="3"
              strokeDasharray="4 5"
            />
          ) : (
            <circle key={i} cx={x} cy={y} r="15" fill={F.petrolHell} stroke={F.linie} strokeWidth="3" />
          ),
        )}
      </g>

      {/* Blut fließt heraus */}
      <Pfeil d={`M${cx - 38} 460 L${cx - 64} 506`} breite={5} />
      <circle cx={cx - 80} cy={556} r="36" {...KONTUR} fill={F.petrolDunkel} />
      <Abfall cx={cx - 80} cy={556} punkte={krank ? FAST_ALLE : []} />

      {/* Urin */}
      <Pfeil d={`M${cx + 38} 460 L${cx + 62} 500`} farbe={F.leise} breite={5} />
      <path
        d={`M${ux} 518 C${ux + 12} 536 ${ux + 34} 550 ${ux + 34} 570 A34 34 0 0 1 ${ux - 34} 570 C${ux - 34} 550 ${ux - 12} 536 ${ux} 518 Z`}
        {...KONTUR}
        stroke={F.leise}
        fill={F.tief}
      />
      <Abfall cx={ux} cy={572} punkte={krank ? EINER : VIELE} />

      <Unterzeile x={cx - 80} y={636} anker="middle">
        Blut
      </Unterzeile>
      <Unterzeile x={ux} y={636} anker="middle">
        Urin
      </Unterzeile>
    </g>
  );
}

/** Die Niere als Filter: gesund und bei chronischer Nierenschwäche. */
export default function Nierenschwaeche() {
  return (
    <Zeichnung titel="Die Niere als Filter: Die gesunde Niere leitet Abfallstoffe aus dem Blut in den Urin, bei der schwachen Niere sind Filter vernarbt und die Abfallstoffe bleiben im Blut">
      <Filterbild cx={190} vernarbt={[]} />
      <Filterbild cx={530} vernarbt={[0, 2, 4, 5]} />

      <Etikett x={190} y={52} anker="middle">
        Gesunde Niere
      </Etikett>
      <Unterzeile x={190} y={84} anker="middle">
        filtert das Blut
      </Unterzeile>
      <Etikett x={530} y={52} anker="middle" farbe={F.kupferHell}>
        Schwache Niere
      </Etikett>
      <Unterzeile x={530} y={84} anker="middle">
        Abfallstoffe bleiben im Blut
      </Unterzeile>

      <Zeiger von={[398, 339]} nach={[482, 339]} />
      <Unterzeile x={392} y={346} anker="end">
        vernarbt
      </Unterzeile>

      {/* Legende */}
      <circle cx="288" cy="678" r="7" fill={F.kupferHell} />
      <Unterzeile x={304} y={686}>
        Abfallstoffe
      </Unterzeile>
    </Zeichnung>
  );
}
