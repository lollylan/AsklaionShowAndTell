import { Etikett, F, KONTUR, Pfeil, Unterzeile, Zeichnung, Zeiger } from './bausteine';

/** Linke obere Ecke der drei Leberzellen; die mittlere ist undicht. */
const ZELLEN = [60, 185, 310];
const ZELLE_Y = 250;
const ZELLE = 105;

/** Enzyme (GOT, GPT) im Blutgefäß. */
const ENZYME: [number, number][] = [
  [262, 168],
  [300, 152],
  [338, 172],
  [392, 156],
  [452, 170],
];

/** GGT und AP an der Wand des Gallengangs. */
const WANDENZYME = [420, 470, 520, 570];

/** Ausschnitt aus der Leber: Blutgefäß, Leberzellen und Gallengang – wo die Leberwerte entstehen. */
export default function Leberwerte() {
  return (
    <Zeichnung titel="Ausschnitt aus der Leber: oben ein Blutgefäß, in der Mitte Leberzellen, unten ein Gallengang. Aus einer undichten Leberzelle treten GOT und GPT ins Blut, GGT und AP sitzen am Gallengang, Bilirubin wandert aus dem Blut durch die Leberzelle in die Galle.">
      <g transform="translate(0 40)">
      {/* Blutgefäß */}
      <rect x="40" y="130" width="640" height="70" fill={F.petrolDunkel} />
      <line x1="40" y1="130" x2="680" y2="130" {...KONTUR} />
      <line x1="40" y1="200" x2="680" y2="200" {...KONTUR} />
      {ENZYME.map(([x, y]) => (
        <circle key={x} cx={x} cy={y} r="7" fill={F.kupferHell} />
      ))}
      <Unterzeile x={56} y={173}>
        Blut
      </Unterzeile>

      {/* Leberzellen */}
      {ZELLEN.map((x, i) => {
        const undicht = i === 1;
        return (
          <g key={x}>
            <rect
              x={x}
              y={ZELLE_Y}
              width={ZELLE}
              height={ZELLE}
              rx="18"
              fill={undicht ? F.kupfer : F.petrol}
              stroke={undicht ? F.kupferHell : F.linie}
              strokeWidth="4"
              strokeDasharray={undicht ? '10 8' : undefined}
            />
            <circle
              cx={x + ZELLE / 2}
              cy={ZELLE_Y + ZELLE / 2}
              r="16"
              fill={undicht ? F.kupferHell : F.petrolHell}
            />
          </g>
        );
      })}
      {/* Enzyme treten aus der undichten Zelle ins Blut */}
      <circle cx="222" cy="232" r="7" fill={F.kupferHell} />
      <Pfeil d="M262 244 L262 212" farbe={F.kupferHell} />

      {/* Gallengang */}
      <rect x="40" y="440" width="560" height="56" fill={F.tief} />
      <line x1="40" y1="440" x2="600" y2="440" {...KONTUR} />
      <line x1="40" y1="496" x2="600" y2="496" {...KONTUR} />
      {WANDENZYME.map((x) => (
        <g key={x}>
          <circle cx={x} cy="440" r="8" fill={F.kupfer} stroke={F.kupferHell} strokeWidth="2" />
          <circle cx={x + 20} cy="496" r="8" fill={F.kupfer} stroke={F.kupferHell} strokeWidth="2" />
        </g>
      ))}
      <Unterzeile x={140} y={476}>
        Gallengang
      </Unterzeile>
      <Pfeil d="M612 468 L680 468" farbe={F.leise} />

      {/* Weg des Bilirubins: aus dem Blut durch die Zelle in die Galle */}
      <path
        d="M86 186 L86 452"
        fill="none"
        stroke={F.creme}
        strokeWidth="5"
        strokeDasharray="10 9"
        strokeLinecap="round"
        markerEnd="url(#pfeilspitze)"
      />

      {/* Beschriftung */}
      <Etikett x={680} y={58} anker="end">
        GOT, GPT
      </Etikett>
      <Unterzeile x={680} y={90} anker="end">
        aus geschädigten Zellen ins Blut
      </Unterzeile>
      <Zeiger von={[500, 100]} nach={[452, 160]} />

      <Etikett x={450} y={296}>
        Leberzellen
      </Etikett>
      <Unterzeile x={450} y={328}>
        die mittlere ist undicht
      </Unterzeile>

      <Etikett x={40} y={572}>
        Bilirubin
      </Etikett>
      <Unterzeile x={40} y={604}>
        vom Blut in die Galle
      </Unterzeile>
      <Zeiger von={[86, 548]} nach={[86, 470]} />

      <Etikett x={680} y={572} anker="end">
        GGT, AP
      </Etikett>
      <Unterzeile x={680} y={604} anker="end">
        am Gallengang
      </Unterzeile>
      <Zeiger von={[560, 548]} nach={[540, 504]} />

      <Unterzeile x={680} y={430} anker="end">
        zum Darm
      </Unterzeile>
      </g>
    </Zeichnung>
  );
}
