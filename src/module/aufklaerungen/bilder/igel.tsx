import { Etikett, F, Unterzeile, Zeichnung } from './bausteine';

/** Drei Häkchen vor dem Ja zu einer Selbstzahlerleistung. */
const PUNKTE = [
  { titel: 'Nutzen erfragen', zeile: 'Was bringt es mir, was nicht?' },
  { titel: 'Bedenkzeit nehmen', zeile: 'nicht sofort entscheiden' },
  { titel: 'Schriftlicher Vertrag', zeile: 'mit Preis, vor der Leistung' },
];

const X = 70;
const OBEN = 190;
const ABSTAND = 190;

export default function Igel() {
  return (
    <Zeichnung titel="Drei Punkte vor einer Selbstzahlerleistung: den Nutzen erfragen, sich Bedenkzeit nehmen und einen schriftlichen Vertrag mit Preis abschließen, bevor die Leistung erbracht wird">
      {PUNKTE.map((p, i) => {
        const y = OBEN + i * ABSTAND;
        const letzter = i === PUNKTE.length - 1;
        return (
          <g key={p.titel}>
            <rect x={X} y={y - 40} width={80} height={80} rx="14" fill={F.petrol} stroke={F.linie} strokeWidth="4" />
            <path
              d={`M${X + 18} ${y + 2} L${X + 34} ${y + 20} L${X + 64} ${y - 20}`}
              fill="none"
              stroke={letzter ? F.kupferHell : F.linie}
              strokeWidth="8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Etikett x={X + 112} y={y - 4} farbe={letzter ? F.kupferHell : F.linie}>
              {p.titel}
            </Etikett>
            <Unterzeile x={X + 112} y={y + 28}>
              {p.zeile}
            </Unterzeile>
          </g>
        );
      })}
    </Zeichnung>
  );
}
