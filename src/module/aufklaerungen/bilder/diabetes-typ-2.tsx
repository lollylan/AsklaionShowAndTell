import { Etikett, F, KONTUR, Pfeil, Unterzeile, Zeichnung, Zeiger } from './bausteine';

/** Ein Zuckerteilchen als kleines Sechseck. */
function Zucker({ x, y, farbe }: { x: number; y: number; farbe: string }) {
  return (
    <polygon
      points="13,0 6.5,11.3 -6.5,11.3 -13,0 -6.5,-11.3 6.5,-11.3"
      transform={`translate(${x} ${y})`}
      fill={farbe}
    />
  );
}

/** Insulin als Schlüssel, Bart zeigt nach unten. */
function Schluessel({ transform }: { transform: string }) {
  return (
    <g transform={transform} fill="none" stroke={F.creme} strokeWidth="5" strokeLinecap="round">
      <circle cx="0" cy="0" r="10" />
      <path d="M0 10 L0 44 M0 28 L9 28 M0 37 L9 37" />
    </g>
  );
}

const BLUT_GESUND: [number, number][] = [
  [140, 160],
  [285, 150],
  [96, 202],
  [275, 204],
];
const ZELLE_GESUND: [number, number][] = [
  [215, 428],
  [130, 395],
  [285, 400],
  [140, 462],
  [275, 465],
];
const BLUT_KRANK: [number, number][] = [
  [70, 150],
  [120, 172],
  [170, 146],
  [220, 170],
  [270, 148],
  [312, 176],
  [90, 202],
  [150, 204],
  [216, 206],
  [262, 202],
];

/** Blutgefäß oben, Körperzelle mit Türchen unten. */
function Szene({ x, krank }: { x: number; krank: boolean }) {
  const zucker = krank ? F.kupfer : F.kupferHell;
  return (
    <g transform={`translate(${x} 0)`}>
      {/* Blutgefäß, unten mit Durchlass zur Zelle */}
      <rect x="40" y="120" width="290" height="110" fill={F.petrolHell} fillOpacity="0.25" />
      <path d="M40 120 L330 120 M40 230 L190 230 M240 230 L330 230" {...KONTUR} />

      {/* Körperzelle, Türchen oben zwischen x = 190 und 240 */}
      <path
        d="M240 310 L260 310 Q310 310 310 360 L310 500 Q310 550 260 550 L110 550 Q60 550 60 500 L60 360 Q60 310 110 310 L190 310"
        {...KONTUR}
        fill={F.petrol}
      />
      <path d="M190 296 L190 324 M240 296 L240 324" {...KONTUR} strokeWidth="6" />

      {/* Schloss neben dem Türchen */}
      <rect x="148" y="298" width="34" height="24" rx="6" fill={krank ? F.kupfer : F.creme} />

      {krank ? (
        <>
          <path d="M190 310 L240 310" {...KONTUR} stroke={F.kupfer} strokeWidth="8" />
          <Schluessel transform="translate(124 250) rotate(-30)" />
          {BLUT_KRANK.map(([zx, zy]) => (
            <Zucker key={`${zx}-${zy}`} x={zx} y={zy} farbe={zucker} />
          ))}
          <Zucker x={215} y={270} farbe={zucker} />
          <Zucker x={150} y={450} farbe={zucker} />
        </>
      ) : (
        <>
          <path d="M240 310 L266 284" {...KONTUR} strokeWidth="6" />
          <Schluessel transform="translate(165 256)" />
          {BLUT_GESUND.map(([zx, zy]) => (
            <Zucker key={`${zx}-${zy}`} x={zx} y={zy} farbe={zucker} />
          ))}
          {ZELLE_GESUND.map(([zx, zy]) => (
            <Zucker key={`${zx}-${zy}`} x={zx} y={zy} farbe={zucker} />
          ))}
          <Pfeil d="M215 200 L215 366" />
        </>
      )}
    </g>
  );
}

/** Zucker und Insulin: links öffnet Insulin die Zelle, rechts bleibt die Zelle zu. */
export default function DiabetesTyp2() {
  return (
    <Zeichnung titel="Blutgefäß und Körperzelle im Vergleich: Beim Gesunden öffnet Insulin die Zelle und der Zucker wandert hinein, bei Diabetes bleibt die Zelle verschlossen und der Zucker staut sich im Blut">
      <Szene x={0} krank={false} />
      <Szene x={350} krank />

      <Etikett x={185} y={56} anker="middle">
        Gesund
      </Etikett>
      <Unterzeile x={185} y={88} anker="middle">
        Insulin öffnet die Zelle
      </Unterzeile>
      <Etikett x={535} y={56} anker="middle" farbe={F.kupferHell}>
        Bei Diabetes
      </Etikett>
      <Unterzeile x={535} y={88} anker="middle">
        Zucker bleibt im Blut
      </Unterzeile>

      {/* Benennungen in der gesunden Szene */}
      <Unterzeile x={54} y={152}>
        Blut
      </Unterzeile>
      <Etikett x={40} y={283}>
        Insulin
      </Etikett>
      <Unterzeile x={185} y={528} anker="middle" farbe={F.linie}>
        Körperzelle
      </Unterzeile>

      <Zeiger von={[70, 582]} nach={[133, 474]} />
      <Etikett x={40} y={612}>
        Zucker
      </Etikett>

      <Zeiger von={[620, 582]} nach={[565, 318]} />
      <Etikett x={690} y={612} anker="end">
        Zelle reagiert kaum
      </Etikett>
      <Unterzeile x={690} y={644} anker="end">
        auf Insulin
      </Unterzeile>
    </Zeichnung>
  );
}
