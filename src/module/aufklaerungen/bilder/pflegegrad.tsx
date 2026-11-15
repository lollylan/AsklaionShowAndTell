import { Etikett, F, KONTUR, Pfeil, Unterzeile, Zeichnung } from './bausteine';

const BODEN = 560;
const BREITE = 104;
const FARBEN = [F.petrolDunkel, F.petrolDunkel, F.petrol, F.petrol, F.petrolHell];

/** Linke Kante und Höhe von Stufe i (0 bis 4). */
function stufe(i: number) {
  return { x: 82 + i * 114, hoehe: 90 + i * 72 };
}

/** Fünf ansteigende Stufen für die Pflegegrade 1 bis 5. */
export default function Pflegegrad() {
  return (
    <Zeichnung titel="Fünf ansteigende Stufen, beschriftet mit den Pflegegraden 1 bis 5, von geringer bis schwerster Einschränkung der Selbstständigkeit. Ein Pfeil darüber zeigt: Je mehr Hilfe nötig ist, desto höher der Pflegegrad">
      {[0, 1, 2, 3, 4].map((i) => {
        const { x, hoehe } = stufe(i);
        return (
          <g key={i}>
            <rect x={x} y={BODEN - hoehe} width={BREITE} height={hoehe} rx="6" {...KONTUR} fill={FARBEN[i]} />
            <Etikett x={x + BREITE / 2} y={BODEN - hoehe + 44} anker="middle">
              {i + 1}
            </Etikett>
          </g>
        );
      })}
      <line x1="60" y1={BODEN} x2="660" y2={BODEN} stroke={F.leise} strokeWidth="4" strokeLinecap="round" />

      <Pfeil d="M110 400 L590 118" farbe={F.kupfer} breite={6} />

      <Etikett x={82} y={92}>
        Je mehr Hilfe nötig ist,
      </Etikett>
      <Etikett x={82} y={126}>
        desto höher der Pflegegrad
      </Etikett>

      <Unterzeile x={134} y={600} anker="middle">
        gering
      </Unterzeile>
      <Unterzeile x={590} y={600} anker="middle">
        am schwersten
      </Unterzeile>
      <Unterzeile x={360} y={660} anker="middle" farbe={F.linie}>
        Es zählt, wie selbstständig Sie im Alltag sind
      </Unterzeile>
    </Zeichnung>
  );
}
