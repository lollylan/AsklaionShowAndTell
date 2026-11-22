import { Etikett, F, KONTUR, Unterzeile, Zeichnung } from './bausteine';

const LINKS = 100;
const RECHTS = 660;
const OBEN = 190;
const UNTEN = 520;

const x = (monat: number) => LINKS + (monat / 12) * (RECHTS - LINKS);
/** Harnsäure in mg/dl, Achse von 3 bis 11. */
const y = (wert: number) => UNTEN - ((wert - 3) / 8) * (UNTEN - OBEN);

const VERLAUF: [number, number][] = [
  [0, 9.6],
  [1.5, 9.1],
  [2, 8.4],
  [3.5, 8.0],
  [4, 7.2],
  [5.5, 6.8],
  [6, 5.8],
  [8, 5.4],
  [12, 5.2],
];

/** Harnsäure senken: Dosis langsam steigern bis unter den Zielwert, anfangs noch Anfälle möglich. */
export default function GichtBehandlung() {
  const linie = VERLAUF.map(([m, w], i) => `${i ? 'L' : 'M'}${x(m)} ${y(w)}`).join(' ');
  return (
    <Zeichnung titel="Verlauf der Harnsäure im Blut über ein Jahr mit Allopurinol: Die Dosis wird in Stufen gesteigert, die Harnsäure sinkt unter den Zielwert von 6 mg/dl. In den ersten Monaten sind noch Gichtanfälle möglich">
      <Etikett x={40} y={66}>
        Harnsäure im Blut
      </Etikett>
      <Unterzeile x={40} y={96}>
        Dosis in Stufen steigern
      </Unterzeile>

      {/* Zielbereich */}
      <rect x={LINKS} y={y(6)} width={RECHTS - LINKS} height={UNTEN - y(6)} fill={F.petrolHell} opacity="0.25" />
      <path d={`M${LINKS} ${y(6)} L${RECHTS} ${y(6)}`} stroke={F.linie} strokeWidth="3" strokeDasharray="10 8" />
      <Etikett x={LINKS + 20} y={y(6) + 44}>
        Ziel: unter 6 mg/dl
      </Etikett>

      {/* Achsen */}
      <path d={`M${LINKS} ${OBEN - 20} L${LINKS} ${UNTEN} L${RECHTS} ${UNTEN}`} {...KONTUR} stroke={F.leise} strokeWidth={3} />
      {[0, 3, 6, 9, 12].map((m) => (
        <Unterzeile key={m} x={x(m)} y={UNTEN + 32} anker="middle">
          {String(m)}
        </Unterzeile>
      ))}
      <Unterzeile x={RECHTS} y={UNTEN + 62} anker="end">
        Monate
      </Unterzeile>

      <path d={linie} {...KONTUR} strokeWidth={6} />

      {/* Anfälle in den ersten Monaten */}
      {[1, 3.2].map((m) => (
        <g key={m} transform={`translate(${x(m)} 150)`}>
          <path d="M-6 -22 L6 -22 L0 -4 L10 -4 L-8 22 L-3 4 L-12 4 Z" fill={F.kupfer} />
        </g>
      ))}
      <Unterzeile x={x(3.2) + 30} y={158} farbe={F.kupferHell}>
        anfangs noch Anfälle möglich
      </Unterzeile>

      <Etikett x={40} y={652}>
        Nicht absetzen
      </Etikett>
      <Unterzeile x={40} y={682}>
        Der Schutz wirkt erst mit der Zeit
      </Unterzeile>
    </Zeichnung>
  );
}
