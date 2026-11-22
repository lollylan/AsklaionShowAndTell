import { Etikett, F, KONTUR, Pfeil, Unterzeile, Zeichnung } from './bausteine';

type Grad = 1 | 2 | 3 | 4;

const OBEN = 170;
const UNTEN = 360;

/** Analkanal im Schema mit Hämorrhoide an der rechten Wand, je nach Grad innen oder außen. */
function Kanal({ cx, grad }: { cx: number; grad: Grad }) {
  return (
    <g>
      {/* Wände und Haut am Ausgang */}
      <path
        d={`M${cx - 30} ${OBEN} L${cx - 30} ${UNTEN} Q${cx - 34} ${UNTEN + 22} ${cx - 58} ${UNTEN + 24}`}
        {...KONTUR}
      />
      <path
        d={`M${cx + 30} ${OBEN} L${cx + 30} ${UNTEN} Q${cx + 34} ${UNTEN + 22} ${cx + 58} ${UNTEN + 24}`}
        {...KONTUR}
      />

      {grad === 1 && <ellipse cx={cx + 16} cy={260} rx="14" ry="26" fill={F.kupfer} stroke={F.kupferHell} strokeWidth="3" />}

      {grad === 2 && (
        <g>
          <ellipse cx={cx + 12} cy={290} rx="18" ry="34" fill={F.kupfer} stroke={F.kupferHell} strokeWidth="3" />
          <ellipse
            cx={cx + 8}
            cy={UNTEN + 44}
            rx="22"
            ry="18"
            fill="none"
            stroke={F.kupferHell}
            strokeWidth="3"
            strokeDasharray="5 6"
          />
          <Pfeil d={`M${cx - 20} ${UNTEN + 30} L${cx - 20} ${UNTEN - 50}`} farbe={F.linie} breite={4} />
        </g>
      )}

      {grad === 3 && (
        <g>
          <ellipse cx={cx + 8} cy={UNTEN + 40} rx="24" ry="22" fill={F.kupfer} stroke={F.kupferHell} strokeWidth="3" />
          <Pfeil d={`M${cx - 20} ${UNTEN + 30} L${cx - 20} ${UNTEN - 50}`} farbe={F.leise} breite={4} />
        </g>
      )}

      {grad === 4 && <ellipse cx={cx + 8} cy={UNTEN + 44} rx="34" ry="28" fill={F.kupfer} stroke={F.kupferHell} strokeWidth="3" />}
    </g>
  );
}

const GRADE: { grad: Grad; cx: number; name: string; text: string }[] = [
  { grad: 1, cx: 105, name: 'Grad I', text: 'bleibt innen' },
  { grad: 2, cx: 275, name: 'Grad II', text: 'geht zurück' },
  { grad: 3, cx: 445, name: 'Grad III', text: 'zurückschieben' },
  { grad: 4, cx: 615, name: 'Grad IV', text: 'bleibt draußen' },
];

/** Die vier Grade der Hämorrhoiden und welche Behandlung zu welchem Grad passt. */
export default function HaemorrhoidenBehandlung() {
  return (
    <Zeichnung titel="Die vier Grade der Hämorrhoiden im Schema: Grad I bleibt innen, Grad II fällt beim Pressen vor und geht von selbst zurück, Grad III muss man zurückschieben, Grad IV bleibt draußen. Bei Grad I und II hilft ein Gummiband oder Veröden, bei Grad III und IV ist eine Operation möglich">
      {GRADE.map(({ grad, cx, name, text }) => (
        <g key={grad}>
          <Etikett x={cx} y={130} anker="middle">
            {name}
          </Etikett>
          <Kanal cx={cx} grad={grad} />
          <Unterzeile x={cx} y={452} anker="middle">
            {text}
          </Unterzeile>
        </g>
      ))}

      {/* Zuordnung der Behandlung */}
      <path d="M44 492 L44 506 L336 506 L336 492" fill="none" stroke={F.petrolHell} strokeWidth="4" strokeLinecap="round" />
      <path d="M384 492 L384 506 L676 506 L676 492" fill="none" stroke={F.kupferHell} strokeWidth="4" strokeLinecap="round" />

      <Etikett x={190} y={556} anker="middle">
        Gummiband
      </Etikett>
      <Unterzeile x={190} y={588} anker="middle">
        oder Veröden
      </Unterzeile>
      <Etikett x={530} y={556} anker="middle" farbe={F.kupferHell}>
        Operation
      </Etikett>
      <Unterzeile x={530} y={588} anker="middle">
        ist möglich
      </Unterzeile>

      <Unterzeile x={360} y={660} anker="middle" farbe={F.linie}>
        Für alle Grade: weicher, regelmäßiger Stuhlgang
      </Unterzeile>
    </Zeichnung>
  );
}
