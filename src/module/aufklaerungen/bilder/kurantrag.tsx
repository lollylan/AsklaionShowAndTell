import { Etikett, F, Unterzeile, Zeichnung } from './bausteine';

/** Die Schritte des Kurantrags, untereinander; der letzte verzweigt in den Widerspruch. */
const SCHRITTE = [
  { titel: 'Gespräch in der Praxis', zeile: 'Beschwerden und Ziel der Kur' },
  { titel: 'Ärztliches Formular', zeile: 'wir begründen, warum es nötig ist' },
  { titel: 'Antrag an die Krankenkasse', zeile: 'mit Wunschklinik' },
  { titel: 'Bescheid', zeile: 'meist nach einigen Wochen' },
];

const X = 80;
const OBEN = 90;
const ABSTAND = 128;

export default function Kurantrag() {
  const letzte = OBEN + (SCHRITTE.length - 1) * ABSTAND;
  return (
    <Zeichnung titel="Vier Schritte zum Kurantrag: Gespräch in der Praxis, ärztliches Formular, Antrag an die Krankenkasse, Bescheid. Bei Ablehnung Widerspruch innerhalb eines Monats">
      <line x1={X} y1={OBEN} x2={X} y2={letzte} stroke={F.leise} strokeWidth="6" strokeLinecap="round" />
      {SCHRITTE.map((s, i) => {
        const y = OBEN + i * ABSTAND;
        return (
          <g key={s.titel}>
            <circle cx={X} cy={y} r="32" fill={i === SCHRITTE.length - 1 ? F.petrolHell : F.petrol} stroke={F.linie} strokeWidth="4" />
            <text x={X} y={y + 11} textAnchor="middle" fontSize="30" fontWeight="700" fill={F.linie}>
              {i + 1}
            </text>
            <Etikett x={X + 60} y={y - 2}>
              {s.titel}
            </Etikett>
            <Unterzeile x={X + 60} y={y + 28}>
              {s.zeile}
            </Unterzeile>
          </g>
        );
      })}

      {/* Abzweig: abgelehnt → Widerspruch */}
      <path
        d={`M${X} ${letzte + 32} L${X} ${letzte + 92} L${X + 50} ${letzte + 92}`}
        fill="none"
        stroke={F.kupfer}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="2 12"
      />
      <rect x={X + 56} y={letzte + 58} width={540} height={110} rx="16" fill="none" stroke={F.kupfer} strokeWidth="4" />
      <Etikett x={X + 80} y={letzte + 100} farbe={F.kupferHell}>
        Abgelehnt? Widerspruch!
      </Etikett>
      <Unterzeile x={X + 80} y={letzte + 134} farbe={F.linie}>
        innerhalb eines Monats, wir helfen mit
      </Unterzeile>
      <Unterzeile x={X + 80} y={letzte + 160} farbe={F.linie}>
        einer ärztlichen Stellungnahme
      </Unterzeile>
    </Zeichnung>
  );
}
