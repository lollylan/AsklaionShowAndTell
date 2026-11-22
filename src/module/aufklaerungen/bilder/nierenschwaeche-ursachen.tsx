import { Etikett, F, KONTUR, Pfeil, Unterzeile, Zeichnung } from './bausteine';

/** Schlingen des Gefäßknäuels relativ zur Mitte [x, y]. */
const SCHLINGEN: [number, number][] = [
  [0, -36],
  [34, -12],
  [24, 30],
  [-22, 32],
  [-36, -10],
  [0, 0],
];

/** Ein Filterkörperchen der Niere: feines Gefäßknäuel in einer Kapsel. */
function Knaeuel({ cx, krank }: { cx: number; krank: boolean }) {
  const cy = 330;
  return (
    <g>
      {/* Zu- und abführendes Gefäß */}
      <path d={`M${cx - 26} ${cy - 172} L${cx - 14} ${cy - 60}`} stroke={F.linie} strokeWidth="22" strokeLinecap="round" />
      <path d={`M${cx - 26} ${cy - 172} L${cx - 14} ${cy - 60}`} stroke={F.petrolHell} strokeWidth="14" strokeLinecap="round" />
      <path d={`M${cx + 26} ${cy - 172} L${cx + 14} ${cy - 60}`} stroke={F.linie} strokeWidth="18" strokeLinecap="round" />
      <path d={`M${cx + 26} ${cy - 172} L${cx + 14} ${cy - 60}`} stroke={F.petrolHell} strokeWidth="10" strokeLinecap="round" />

      {/* Kapsel */}
      <circle cx={cx} cy={cy} r="104" {...KONTUR} fill={F.petrolDunkel} />

      {/* Schlingen */}
      {SCHLINGEN.map(([x, y], i) => (
        <circle
          key={`${x}-${y}`}
          cx={cx + x}
          cy={cy + y}
          r="26"
          fill="none"
          stroke={krank ? (i % 2 === 0 ? F.kupfer : F.kupferHell) : F.petrolHell}
          strokeWidth={krank ? 15 : 8}
          strokeOpacity={krank && i === 3 ? 0.45 : 1}
        />
      ))}
    </g>
  );
}

/** Diabetes und Bluthochdruck schädigen die feinen Filtergefäße der Niere. */
export default function NierenschwaecheUrsachen() {
  return (
    <Zeichnung titel="Zwei stark vergrößerte Filterkörperchen der Niere: links ein gesundes, feines Gefäßknäuel, rechts ein durch Diabetes und Bluthochdruck verdicktes und vernarbtes Knäuel">
      <Etikett x={190} y={80} anker="middle">
        Gesund
      </Etikett>
      <Unterzeile x={190} y={110} anker="middle">
        feine Gefäße filtern gut
      </Unterzeile>
      <Etikett x={530} y={80} anker="middle" farbe={F.kupferHell}>
        Geschädigt
      </Etikett>
      <Unterzeile x={530} y={110} anker="middle">
        verdickt und vernarbt
      </Unterzeile>

      <Knaeuel cx={190} krank={false} />
      <Knaeuel cx={530} krank />

      <Pfeil d="M530 560 L530 458" farbe={F.kupferHell} breite={6} />
      <Etikett x={530} y={600} anker="middle">
        Diabetes und
      </Etikett>
      <Etikett x={530} y={632} anker="middle">
        Bluthochdruck
      </Etikett>

      <Unterzeile x={190} y={520} anker="middle">
        Filterkörperchen,
      </Unterzeile>
      <Unterzeile x={190} y={548} anker="middle">
        stark vergrößert
      </Unterzeile>
    </Zeichnung>
  );
}
