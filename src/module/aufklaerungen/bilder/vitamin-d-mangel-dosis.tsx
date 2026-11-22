import { Etikett, F, KONTUR, Unterzeile, Zeichnung, Zeiger } from './bausteine';

const LINKS = 60;
const RECHTS = 660;
const OBEN = 300;
const HOEHE = 60;
/** Einheiten am Tag → x, Skala bis 5000. */
const x = (ie: number) => LINKS + (ie / 5000) * (RECHTS - LINKS);

/** Tagesdosis Vitamin D: üblich 800 bis 1000 Einheiten, dauerhaft über 4000 zu viel. */
export default function VitaminDMangelDosis() {
  return (
    <Zeichnung titel="Skala der Vitamin-D-Menge pro Tag von 0 bis 5000 Einheiten. Üblich bei Mangel oder hohem Risiko sind 800 bis 1000 Einheiten. Dauerhaft mehr als 4000 Einheiten am Tag sind zu viel">
      <Etikett x={40} y={66}>
        Vitamin D am Tag
      </Etikett>
      <Unterzeile x={40} y={96}>
        in Einheiten (IE)
      </Unterzeile>

      {/* Skala */}
      <rect x={LINKS} y={OBEN} width={RECHTS - LINKS} height={HOEHE} rx="12" fill={F.petrolDunkel} />
      <rect x={x(800)} y={OBEN} width={x(1000) - x(800)} height={HOEHE} fill={F.petrolHell} />
      <path
        d={`M${x(4000)} ${OBEN} L${RECHTS - 12} ${OBEN} A12 12 0 0 1 ${RECHTS} ${OBEN + 12} L${RECHTS} ${OBEN + HOEHE - 12} A12 12 0 0 1 ${RECHTS - 12} ${OBEN + HOEHE} L${x(4000)} ${OBEN + HOEHE} Z`}
        fill={F.kupfer}
      />
      <rect x={LINKS} y={OBEN} width={RECHTS - LINKS} height={HOEHE} rx="12" {...KONTUR} strokeWidth={3} />

      {[0, 1000, 2000, 3000, 4000, 5000].map((ie) => (
        <g key={ie}>
          <path d={`M${x(ie)} ${OBEN + HOEHE} L${x(ie)} ${OBEN + HOEHE + 12}`} stroke={F.leise} strokeWidth="2" />
          <Unterzeile x={x(ie)} y={OBEN + HOEHE + 40} anker="middle">
            {String(ie)}
          </Unterzeile>
        </g>
      ))}

      {/* Übliche Dosis */}
      <Etikett x={LINKS} y={190}>
        800 bis 1000
      </Etikett>
      <Unterzeile x={LINKS} y={220}>
        übliche Dosis bei Mangel
      </Unterzeile>
      <Zeiger von={[x(900), 234]} nach={[x(900), OBEN + 20]} />

      {/* Zu viel */}
      <Etikett x={RECHTS} y={500} anker="end" farbe={F.kupferHell}>
        Dauerhaft über 4000
      </Etikett>
      <Unterzeile x={RECHTS} y={530} anker="end">
        zu viel Kalzium im Blut möglich
      </Unterzeile>
      <Zeiger von={[x(4500), 470]} nach={[x(4500), OBEN + 40]} />

      <Etikett x={40} y={640}>
        Mehr bringt nicht mehr Schutz
      </Etikett>
      <Unterzeile x={40} y={672}>
        Hoch dosiert nur nach Rücksprache
      </Unterzeile>
    </Zeichnung>
  );
}
