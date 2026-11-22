import { Etikett, F, KONTUR, Unterzeile, Zeichnung } from './bausteine';

const LINKS = 100;
const RECHTS = 640;
const BODEN = 500;

const FRUEHER = `M${LINKS} 220 L${RECHTS} 220`;
const IM_ALTER = `M${LINKS} 232 L380 236 C450 244 520 330 ${RECHTS} 440`;

/** Hörkurve: Im Alter gehen zuerst die hohen Töne verloren. */
export default function SchwerhoerigkeitToene() {
  return (
    <Zeichnung titel="Hörkurve von tiefen zu hohen Tönen: Früher hört man alle Töne gleich gut. Im Alter fällt die Kurve bei den hohen Tönen ab. Dort liegen Laute wie s, f und sch, deshalb klingt Sprache undeutlich">
      {/* Verlorener Bereich */}
      <path d={`${IM_ALTER} L${RECHTS} 220 L380 220 Z`} fill={F.kupfer} fillOpacity="0.75" />

      {/* Achsen */}
      <path d={`M${LINKS} 150 L${LINKS} ${BODEN} L${RECHTS + 20} ${BODEN}`} {...KONTUR} stroke={F.leise} strokeWidth={3} />
      <Unterzeile x={LINKS - 10} y={138}>
        gut hören
      </Unterzeile>

      <path d={FRUEHER} fill="none" stroke={F.leise} strokeWidth="4" strokeDasharray="12 10" strokeLinecap="round" />
      <path d={IM_ALTER} {...KONTUR} strokeWidth={6} />

      <Unterzeile x={LINKS + 16} y={206}>
        früher
      </Unterzeile>
      <Etikett x={LINKS + 16} y={280}>
        im Alter
      </Etikett>

      <Etikett x={560} y={300} anker="middle" farbe={F.creme}>
        fehlt
      </Etikett>

      <Unterzeile x={LINKS} y={BODEN + 40}>
        tiefe Töne
      </Unterzeile>
      <Unterzeile x={RECHTS} y={BODEN + 40} anker="end">
        hohe Töne: s, f, sch
      </Unterzeile>

      <Etikett x={360} y={620} anker="middle">
        Sprache klingt undeutlich
      </Etikett>
      <Unterzeile x={360} y={652} anker="middle">
        besonders, wenn es laut ist
      </Unterzeile>
    </Zeichnung>
  );
}
