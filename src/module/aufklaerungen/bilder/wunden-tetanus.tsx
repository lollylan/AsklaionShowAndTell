import { Etikett, F, KONTUR, Unterzeile, Zeichnung } from './bausteine';

const X0 = 60; // letzte Impfung
const PRO_JAHR = 50;
const X_ENDE = 660; // zwölf Jahre
const HOEHE = 44;

const jahr = (j: number) => X0 + j * PRO_JAHR;

/** Balken: bis `ab` Jahre geschützt (petrol), danach auffrischen (kupfer). */
function Balken({ y, ab, id }: { y: number; ab: number; id: string }) {
  return (
    <g>
      <defs>
        <clipPath id={id}>
          <rect x={X0} y={y} width={X_ENDE - X0} height={HOEHE} rx={HOEHE / 2} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${id})`}>
        <rect x={X0} y={y} width={jahr(ab) - X0} height={HOEHE} fill={F.petrol} />
        <rect x={jahr(ab)} y={y} width={X_ENDE - jahr(ab)} height={HOEHE} fill={F.kupfer} />
      </g>
      <rect x={X0} y={y} width={X_ENDE - X0} height={HOEHE} rx={HOEHE / 2} {...KONTUR} />
    </g>
  );
}

/** Zeitleiste ab der letzten Tetanus-Impfung: wann bei einer Verletzung aufgefrischt wird. */
export default function WundenTetanus() {
  const achse = 480;
  return (
    <Zeichnung titel="Zeitleiste ab der letzten Tetanus-Impfung. Bei einer kleinen, sauberen Wunde wird aufgefrischt, wenn die Impfung mehr als zehn Jahre her ist. Bei einer tiefen oder schmutzigen Wunde schon nach mehr als fünf Jahren">
      <Etikett x={X0} y={150}>
        kleine, saubere Wunde
      </Etikett>
      <Balken y={176} ab={10} id="wunden-tetanus-sauber" />

      <Etikett x={X0} y={330}>
        tiefe, schmutzige Wunde
      </Etikett>
      <Balken y={356} ab={5} id="wunden-tetanus-schmutzig" />

      {/* Hilfslinien bei 5 und 10 Jahren */}
      {[5, 10].map((j) =>
        [
          [166, 230],
          [346, achse],
        ].map(([y1, y2]) => (
          <line key={`${j}-${y1}`} x1={jahr(j)} y1={y1} x2={jahr(j)} y2={y2} stroke={F.leise} strokeWidth="2" strokeDasharray="8 8" />
        )),
      )}

      {/* Zeitachse */}
      <line x1={X0} y1={achse} x2={X_ENDE} y2={achse} {...KONTUR} />
      {[0, 5, 10].map((j) => (
        <line key={j} x1={jahr(j)} y1={achse - 12} x2={jahr(j)} y2={achse + 12} {...KONTUR} />
      ))}
      <Unterzeile x={X0} y={achse + 44}>
        letzte Impfung
      </Unterzeile>
      <Unterzeile x={jahr(5)} y={achse + 44} anker="middle">
        5 Jahre
      </Unterzeile>
      <Unterzeile x={jahr(10)} y={achse + 44} anker="middle">
        10 Jahre
      </Unterzeile>

      {/* Erklärung der Farbe */}
      <rect x={X0} y={612} width="48" height="30" rx="15" fill={F.kupfer} stroke={F.linie} strokeWidth="3" />
      <Etikett x={X0 + 64} y={636} farbe={F.kupferHell}>
        Impfung auffrischen
      </Etikett>
    </Zeichnung>
  );
}
