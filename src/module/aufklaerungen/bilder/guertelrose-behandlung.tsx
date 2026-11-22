import { Etikett, F, KONTUR, Unterzeile, Zeichnung } from './bausteine';

const X0 = 60;
const BREITE = 108;
const ABSTAND = 12;
const Y0 = 300;
const HOEHE = 120;

/** Tabletten gegen das Virus wirken am besten, wenn sie in den ersten drei Tagen beginnen. */
export default function GuertelroseBehandlung() {
  return (
    <Zeichnung titel="Fünf Tage nebeneinander ab Beginn des Ausschlags: Die ersten drei Tage sind hervorgehoben, dann wirken die Tabletten gegen das Virus am besten; Tag vier und fünf sind blass">
      <Etikett x={360} y={80} anker="middle">
        Früh mit den Tabletten beginnen
      </Etikett>

      {/* Klammer über Tag 1–3 */}
      <path
        d={`M${X0} 262 L${X0} 244 L${X0 + 3 * BREITE + 2 * ABSTAND} 244 L${X0 + 3 * BREITE + 2 * ABSTAND} 262`}
        {...KONTUR}
        strokeWidth="3"
      />
      <Etikett x={X0 + (3 * BREITE + 2 * ABSTAND) / 2} y={220} anker="middle">
        beste Wirkung
      </Etikett>

      {[1, 2, 3, 4, 5].map((tag, i) => {
        const x = X0 + i * (BREITE + ABSTAND);
        const frueh = tag <= 3;
        return (
          <g key={tag}>
            <rect
              x={x}
              y={Y0}
              width={BREITE}
              height={HOEHE}
              rx="14"
              {...KONTUR}
              strokeWidth="3"
              stroke={frueh ? F.linie : F.leise}
              strokeDasharray={frueh ? undefined : '8 8'}
              fill={frueh ? F.petrolHell : 'none'}
            />
            <Etikett x={x + BREITE / 2} y={Y0 + 72} anker="middle" farbe={frueh ? F.linie : F.leise}>
              {`Tag ${tag}`}
            </Etikett>
          </g>
        );
      })}

      {/* Beginn des Ausschlags */}
      <path d={`M${X0} 446 L${X0 - 14} 474 L${X0 + 14} 474 Z`} fill={F.kupfer} />
      <Etikett x={X0 - 14} y={512} farbe={F.kupferHell}>
        Ausschlag beginnt
      </Etikett>

      <Unterzeile x={660} y={474} anker="end">
        später wirkt es weniger
      </Unterzeile>

      <Unterzeile x={360} y={620} anker="middle">
        Gegen die Schmerzen gibt es zusätzlich früh Schmerzmittel
      </Unterzeile>
    </Zeichnung>
  );
}
