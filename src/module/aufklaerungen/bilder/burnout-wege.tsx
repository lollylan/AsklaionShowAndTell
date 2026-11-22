import { Etikett, F, Unterzeile, Zeichnung } from './bausteine';

const X = 100;
const SCHRITTE: { y: number; titel: string; zeile: string }[] = [
  { y: 130, titel: 'Gespräch', zeile: 'Was belastet, was gibt Kraft?' },
  { y: 260, titel: 'Auszeit', zeile: 'wenn nötig mit Krankschreibung' },
  { y: 390, titel: 'Psychotherapie', zeile: 'belastende Muster ändern' },
  { y: 520, titel: 'Rückkehr in Stufen', zeile: 'Stunden langsam steigern' },
];

/** Der Weg aus dem Burnout in vier Schritten, zuletzt die stufenweise Rückkehr. */
export default function BurnoutWege() {
  return (
    <Zeichnung titel="Der Weg aus der Erschöpfung in vier Schritten untereinander: Gespräch, Auszeit, Psychotherapie und Rückkehr in den Beruf in Stufen, dargestellt als langsam wachsende Balken">
      <line x1={X} y1={130} x2={X} y2={520} stroke={F.leise} strokeWidth="5" strokeLinecap="round" />
      {SCHRITTE.map((s, i) => (
        <g key={s.titel}>
          <circle cx={X} cy={s.y} r="22" fill={i === 3 ? F.kupfer : F.petrolHell} stroke={F.linie} strokeWidth="4" />
          <Etikett x={X + 50} y={s.y - 4} farbe={i === 3 ? F.kupferHell : F.linie}>
            {s.titel}
          </Etikett>
          <Unterzeile x={X + 50} y={s.y + 28}>
            {s.zeile}
          </Unterzeile>
        </g>
      ))}

      {/* Stufenweise Rückkehr: Arbeitsstunden wachsen */}
      {[2, 4, 6, 8].map((h, i) => (
        <rect
          key={h}
          x={500 + i * 46}
          y={560 - h * 14}
          width="36"
          height={h * 14}
          rx="5"
          fill={i === 3 ? F.petrolHell : F.petrol}
          stroke={F.linie}
          strokeWidth="3"
        />
      ))}
      <line x1="490" y1="562" x2="690" y2="562" stroke={F.linie} strokeWidth="4" strokeLinecap="round" />
      <Unterzeile x={590} y={596} anker="middle">
        Stunden pro Tag
      </Unterzeile>

      <Unterzeile x={360} y={668} anker="middle">
        Auch eine Reha kann sinnvoll sein
      </Unterzeile>
    </Zeichnung>
  );
}
