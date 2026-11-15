import { Etikett, F, Pfeil, Unterzeile, Zeichnung } from './bausteine';

/** Schilddrüse als Schmetterling, Mittelpunkt etwa bei (230, 340). */
const SCHILDDRUESE =
  'M230 340 C222 336 214 322 204 306 C190 290 172 300 172 330 C172 365 186 392 204 392 ' +
  'C218 392 222 372 230 368 C238 372 242 392 256 392 C274 392 288 365 288 330 ' +
  'C288 300 270 290 256 306 C246 322 238 336 230 340 Z';

/** Entzündungsherde in der Drüse (gleiches Koordinatensystem wie SCHILDDRUESE). */
const HERDE: [number, number][] = [
  [194, 318],
  [212, 350],
  [196, 374],
  [264, 318],
  [250, 350],
  [266, 374],
  [184, 344],
  [276, 344],
];

/** Abwehrzellen rund um die große Drüse: Mittelpunkt und Pfeilende. */
const ZELLEN: { x: number; y: number; pfeil: string }[] = [
  { x: 170, y: 150, pfeil: 'M192 168 L232 196' },
  { x: 560, y: 150, pfeil: 'M538 168 L494 198' },
  { x: 130, y: 320, pfeil: 'M154 318 L212 314' },
  { x: 600, y: 320, pfeil: 'M576 318 L516 314' },
];

function Druese({
  x,
  y,
  massstab,
  herde,
}: {
  x: number;
  y: number;
  massstab: number;
  herde: boolean;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${massstab}) translate(-230 -340)`}>
      <path
        d={SCHILDDRUESE}
        fill={F.petrolHell}
        stroke={F.linie}
        strokeWidth="4"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
      {herde && (
        <g fill={F.kupfer}>
          {HERDE.map(([hx, hy]) => (
            <circle key={`${hx}-${hy}`} cx={hx} cy={hy} r="6" />
          ))}
        </g>
      )}
    </g>
  );
}

/** Das Abwehrsystem greift die Schilddrüse an; über Jahre wird sie kleiner und bildet zu wenig Hormon. */
export default function Hashimoto() {
  return (
    <Zeichnung titel="Große Schilddrüse mit Entzündungsherden, auf die Abwehrzellen von allen Seiten zielen; darunter drei kleine Schilddrüsen, die über die Jahre von normal über entzündet zu verkleinert werden">
      <Etikett x={360} y={60} anker="middle" farbe={F.kupferHell}>
        Abwehrzellen greifen die Schilddrüse an
      </Etikett>

      <Druese x={364} y={260} massstab={2.2} herde />

      <g>
        {ZELLEN.map((z) => (
          <g key={`${z.x}-${z.y}`}>
            <circle cx={z.x} cy={z.y} r="20" fill={F.tief} stroke={F.kupferHell} strokeWidth="4" />
            <circle cx={z.x} cy={z.y} r="8" fill={F.kupferHell} />
            <Pfeil d={z.pfeil} farbe={F.kupferHell} breite={4} />
          </g>
        ))}
      </g>

      <Etikett x={364} y={420} anker="middle">
        Schilddrüse
      </Etikett>

      {/* Verlauf über die Jahre */}
      <path d="M60 476 L660 476" fill="none" stroke={F.leise} strokeWidth="2" strokeDasharray="6 8" />
      <Druese x={140} y={560} massstab={0.62} herde={false} />
      <Pfeil d="M196 560 L284 560" farbe={F.leise} breite={4} />
      <Druese x={360} y={560} massstab={0.62} herde />
      <Pfeil d="M416 560 L522 560" farbe={F.leise} breite={4} />
      <Druese x={580} y={560} massstab={0.42} herde={false} />

      <Unterzeile x={140} y={640} anker="middle">
        anfangs normal
      </Unterzeile>
      <Unterzeile x={360} y={640} anker="middle">
        über viele Jahre
      </Unterzeile>
      <Unterzeile x={580} y={640} anker="middle" farbe={F.kupferHell}>
        zu wenig Hormon
      </Unterzeile>
    </Zeichnung>
  );
}
