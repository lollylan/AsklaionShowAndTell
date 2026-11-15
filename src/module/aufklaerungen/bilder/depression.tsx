import { Etikett, F, KONTUR, Pfeil, Unterzeile, Zeichnung, Zeiger } from './bausteine';

type Punkt = [number, number];

/** Andockstellen auf der empfangenden Zelle (x relativ zur Mitte). */
const ANDOCK = [-54, -18, 18, 54];

/** Botenstoffe, x relativ zur Mitte der Kontaktstelle. */
const VORRAT_VIEL: Punkt[] = [
  [-55, 285],
  [-20, 283],
  [15, 285],
  [50, 283],
  [-62, 308],
  [-32, 310],
  [0, 308],
  [32, 310],
  [62, 308],
];
const SPALT_VIEL: Punkt[] = [
  [-66, 350],
  [-30, 348],
  [6, 351],
  [44, 348],
  [-46, 364],
  [-8, 365],
  [28, 364],
  [-54, 379],
  [-18, 379],
  [18, 379],
  [54, 379],
];
const VORRAT_WENIG: Punkt[] = [
  [-30, 288],
  [25, 304],
  [-55, 310],
];
const SPALT_WENIG: Punkt[] = [
  [-40, 354],
  [20, 362],
  [54, 379],
];

function Kontaktstelle({ cx, wenig }: { cx: number; wenig: boolean }) {
  const farbe = wenig ? F.kupferHell : F.creme;
  const punkte = wenig ? [...VORRAT_WENIG, ...SPALT_WENIG] : [...VORRAT_VIEL, ...SPALT_VIEL];
  return (
    <g transform={`translate(${cx} 0)`}>
      {/* Sendende Nervenzelle: Faser mit Endknopf */}
      <path
        d="M-25 130 L-25 200 C-25 245 -85 250 -85 300 C-85 325 -65 335 -45 335 L45 335 C65 335 85 325 85 300 C85 250 25 245 25 200 L25 130"
        {...KONTUR}
        fill={F.petrol}
      />

      {/* Empfangende Nervenzelle */}
      <path
        d="M-90 530 L-90 420 C-90 403 -78 395 -62 395 L62 395 C78 395 90 403 90 420 L90 530"
        {...KONTUR}
        fill={F.petrolDunkel}
      />
      {ANDOCK.map((x) => (
        <path
          key={x}
          d={`M${x - 10} 387 L${x - 10} 395 M${x + 10} 387 L${x + 10} 395`}
          fill="none"
          stroke={F.linie}
          strokeWidth="4"
          strokeLinecap="round"
        />
      ))}

      {punkte.map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="6" fill={farbe} />
      ))}

      {/* Signal, das weiterläuft */}
      {wenig ? (
        <Pfeil d="M0 432 L0 468" farbe={F.kupfer} breite={3} />
      ) : (
        <Pfeil d="M0 428 L0 500" farbe={F.linie} breite={7} />
      )}
    </g>
  );
}

/** Kontaktstelle zweier Nervenzellen: ausgeglichen und bei Depression. */
export default function Depression() {
  return (
    <Zeichnung titel="Kontaktstelle zweier Nervenzellen im Gehirn: ausgeglichen mit vielen Botenstoffen und starkem Signal, bei Depression mit zu wenigen Botenstoffen und schwachem Signal">
      <Kontaktstelle cx={175} wenig={false} />
      <Kontaktstelle cx={545} wenig />

      <Etikett x={175} y={60} anker="middle">
        Ausgeglichen
      </Etikett>
      <Unterzeile x={175} y={92} anker="middle">
        viele Botenstoffe
      </Unterzeile>
      <Etikett x={545} y={60} anker="middle" farbe={F.kupferHell}>
        Bei Depression
      </Etikett>
      <Unterzeile x={545} y={92} anker="middle">
        zu wenige Botenstoffe
      </Unterzeile>

      {/* Erklärungen in der Mitte zwischen beiden Bildern */}
      <Zeiger von={[290, 208]} nach={[192, 175]} />
      <Zeiger von={[430, 208]} nach={[528, 175]} />
      <Unterzeile x={360} y={216} anker="middle">
        Nervenzelle
      </Unterzeile>

      <Zeiger von={[276, 365]} nach={[248, 365]} />
      <Zeiger von={[444, 365]} nach={[472, 365]} />
      <Unterzeile x={360} y={372} anker="middle">
        Kontaktstelle
      </Unterzeile>

      <Etikett x={360} y={612} anker="middle">
        Botenstoffe im Gehirn
      </Etikett>
      <Etikett x={360} y={646} anker="middle">
        sind aus dem Gleichgewicht
      </Etikett>
    </Zeichnung>
  );
}
