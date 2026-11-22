import { Etikett, F, KONTUR, Unterzeile, Zeichnung } from './bausteine';

/** Minuten Gehen pro Tag in den Wochen 1 bis 6. */
const MINUTEN = [10, 15, 15, 20, 25, 30];
const X0 = 90;
const BREITE = 70;
const ABSTAND = 30;
const BODEN = 560;
const PRO_MINUTE = 11;

/** Bewegung klein anfangen und Woche für Woche langsam steigern. */
export default function FibromyalgieSelbst() {
  return (
    <Zeichnung titel="Säulen für sechs Wochen: Man beginnt mit zehn Minuten Gehen am Tag und steigert sich langsam auf dreißig Minuten">
      <Etikett x={360} y={70} anker="middle">
        Klein anfangen, langsam steigern
      </Etikett>
      <Unterzeile x={360} y={106} anker="middle">
        Minuten Gehen am Tag
      </Unterzeile>

      {MINUTEN.map((m, i) => {
        const x = X0 + i * (BREITE + ABSTAND);
        const h = m * PRO_MINUTE;
        return (
          <g key={i}>
            <rect
              x={x}
              y={BODEN - h}
              width={BREITE}
              height={h}
              rx="10"
              {...KONTUR}
              strokeWidth="3"
              fill={i === 0 ? F.kupfer : F.petrolHell}
            />
            <Etikett x={x + BREITE / 2} y={BODEN - h - 16} anker="middle" farbe={i === 0 ? F.kupferHell : F.linie}>
              {String(m)}
            </Etikett>
            <Unterzeile x={x + BREITE / 2} y={BODEN + 34} anker="middle">
              {`${i + 1}.`}
            </Unterzeile>
          </g>
        );
      })}
      <line x1="70" y1={BODEN} x2="670" y2={BODEN} stroke={F.leise} strokeWidth="3" strokeLinecap="round" />
      <Unterzeile x={360} y={630} anker="middle">
        Woche
      </Unterzeile>

      <Etikett x={90} y={300}>
        Etwas mehr Schmerz
      </Etikett>
      <Unterzeile x={90} y={332}>
        am Anfang ist normal
      </Unterzeile>
    </Zeichnung>
  );
}
