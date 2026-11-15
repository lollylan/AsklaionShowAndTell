import { Etikett, F, KONTUR, Unterzeile, Zeichnung } from './bausteine';

const LINKS = 130;
const RECHTS = 680;
/** Abstand der Schlaftiefen in px: 0 = wach, 3 = Tiefschlaf. */
const STUFE = 46;

/** Schlafverlauf als Stufen: [x, Tiefe] – ab x gilt diese Tiefe. */
type Verlauf = [number, number][];

const GESUND: Verlauf = [
  [LINKS, 0], [150, 1], [172, 2], [196, 3], [258, 2], [282, 1], [304, 2], [328, 3],
  [380, 2], [410, 1], [432, 0], [442, 1], [458, 2], [490, 3], [516, 2], [546, 1],
  [572, 2], [610, 1], [652, 0],
];

const GESTOERT: Verlauf = [
  [LINKS, 0], [272, 1], [292, 2], [334, 1], [352, 2], [380, 0], [452, 1], [472, 2],
  [520, 1], [540, 0],
];

function stufen(verlauf: Verlauf, oben: number) {
  return verlauf
    .map(([x, tiefe], i) => (i === 0 ? `M${x} ${oben + tiefe * STUFE}` : `H${x} V${oben + tiefe * STUFE}`))
    .join(' ') + ` H${RECHTS}`;
}

/** Wach-Abschnitte (Tiefe 0) als [von, bis]. */
function wachzeiten(verlauf: Verlauf): [number, number][] {
  return verlauf
    .map(([x, tiefe], i): [number, number] | null =>
      tiefe === 0 ? [x, verlauf[i + 1]?.[0] ?? RECHTS] : null,
    )
    .filter((z): z is [number, number] => z !== null);
}

function Nacht({ verlauf, oben, wachFarbe }: { verlauf: Verlauf; oben: number; wachFarbe: string }) {
  const linie = stufen(verlauf, oben);
  return (
    <g>
      {/* Schlaf als Fläche unter der Wach-Linie */}
      <path d={`${linie} V${oben} H${LINKS} Z`} fill={F.petrol} />
      <line x1={LINKS} y1={oben + 3 * STUFE} x2={RECHTS} y2={oben + 3 * STUFE} stroke={F.leise} strokeWidth="2" strokeDasharray="6 10" />
      <path d={linie} {...KONTUR} />
      {wachzeiten(verlauf).map(([von, bis]) => (
        <line key={von} x1={von} y1={oben} x2={bis} y2={oben} stroke={wachFarbe} strokeWidth="9" strokeLinecap="round" />
      ))}
    </g>
  );
}

/** Schlafverlauf einer Nacht: gesund in Wellen, bei Schlafstörung mit langem Wachliegen und frühem Erwachen. */
export default function Schlafstoerung() {
  return (
    <Zeichnung titel="Schlafverlauf zweier Nächte von 23 bis 7 Uhr: oben gesunder Schlaf in mehreren Wellen mit kurzem Aufwachen, unten bei Schlafstörung langes Wachliegen am Abend, langes Wachsein in der Nacht und frühes Erwachen">
      <Nacht verlauf={GESUND} oben={150} wachFarbe={F.linie} />
      <Nacht verlauf={GESTOERT} oben={460} wachFarbe={F.kupfer} />

      <Etikett x={40} y={74}>
        Gesunde Nacht
      </Etikett>
      <Unterzeile x={114} y={158} anker="end">
        wach
      </Unterzeile>

      <Etikett x={40} y={384} farbe={F.kupferHell}>
        Schlafstörung
      </Etikett>
      <Unterzeile x={40} y={416}>
        lange wach liegen, nachts wach, zu früh wach
      </Unterzeile>

      <Unterzeile x={LINKS} y={662} anker="middle">
        23 Uhr
      </Unterzeile>
      <Unterzeile x={RECHTS} y={662} anker="end">
        7 Uhr
      </Unterzeile>
    </Zeichnung>
  );
}
