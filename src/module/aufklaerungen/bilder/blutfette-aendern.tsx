import { Etikett, F, Unterzeile, Zeichnung } from './bausteine';

interface Spalte {
  x: number;
  name: string;
  hoch: boolean;
  hebel: [string, string];
}

const SPALTEN: Spalte[] = [
  { x: 136, name: 'LDL', hoch: false, hebel: ['weniger Wurst, Butter', 'Statin: −30 bis 50 %'] },
  { x: 366, name: 'HDL', hoch: true, hebel: ['Rauchstopp', 'Ausdauersport'] },
  { x: 590, name: 'Triglyzeride', hoch: false, hebel: ['weniger Zucker', 'kein Alkohol'] },
];

const OBEN = 150;
const UNTEN = 400;

/** Dicker Blockpfeil zwischen OBEN und UNTEN, nach oben oder unten. */
function Blockpfeil({ x, hoch }: { x: number; hoch: boolean }) {
  const schaft = 30;
  const kopf = 70;
  const kopfHoehe = 90;
  const d = hoch
    ? `M${x} ${OBEN} L${x + kopf} ${OBEN + kopfHoehe} L${x + schaft} ${OBEN + kopfHoehe} L${x + schaft} ${UNTEN} L${x - schaft} ${UNTEN} L${x - schaft} ${OBEN + kopfHoehe} L${x - kopf} ${OBEN + kopfHoehe} Z`
    : `M${x} ${UNTEN} L${x + kopf} ${UNTEN - kopfHoehe} L${x + schaft} ${UNTEN - kopfHoehe} L${x + schaft} ${OBEN} L${x - schaft} ${OBEN} L${x - schaft} ${UNTEN - kopfHoehe} L${x - kopf} ${UNTEN - kopfHoehe} Z`;
  return (
    <path d={d} fill={hoch ? F.petrolHell : F.petrol} stroke={F.linie} strokeWidth="4" strokeLinejoin="round" />
  );
}

/** Drei Blutfettwerte und je zwei Hebel, sie in die richtige Richtung zu bewegen. */
export default function BlutfetteAendern() {
  return (
    <Zeichnung titel="Drei Spalten: LDL senken mit weniger Wurst und Butter und mit einem Statin, HDL heben mit Rauchstopp und Ausdauersport, Triglyzeride senken mit weniger Zucker und ohne Alkohol. Bewegung und Abnehmen helfen bei allen dreien.">
      {SPALTEN.map((s) => (
        <g key={s.name}>
          <Etikett x={s.x} y={110} anker="middle">
            {s.name}
          </Etikett>
          <Blockpfeil x={s.x} hoch={s.hoch} />
          <Unterzeile x={s.x} y={456} anker="middle" farbe={F.linie}>
            {s.hebel[0]}
          </Unterzeile>
          <Unterzeile x={s.x} y={490} anker="middle" farbe={F.linie}>
            {s.hebel[1]}
          </Unterzeile>
        </g>
      ))}

      <line x1="60" y1="550" x2="660" y2="550" stroke={F.leise} strokeWidth="2" />
      <Etikett x={360} y={606} anker="middle" farbe={F.kupferHell}>
        Hilft bei allen dreien:
      </Etikett>
      <Etikett x={360} y={644} anker="middle">
        Bewegung und Abnehmen
      </Etikett>
    </Zeichnung>
  );
}
