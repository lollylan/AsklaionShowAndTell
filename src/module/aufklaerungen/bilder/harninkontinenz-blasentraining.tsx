import { Etikett, F, Unterzeile, Zeichnung } from './bausteine';

const START = 120;
const ENDE = 660;
/** x-Position nach Stunden ab 8 Uhr (0 bis 6). */
const hx = (h: number) => START + (h / 6) * (ENDE - START);

const ZEILEN: { y: number; titel: string; zeile: string; abstand: number }[] = [
  { y: 210, titel: 'Am Anfang', zeile: 'zum Beispiel jede Stunde', abstand: 1 },
  { y: 360, titel: 'Nach einigen Wochen', zeile: 'alle anderthalb Stunden', abstand: 1.5 },
  { y: 510, titel: 'Ziel', zeile: 'alle drei bis vier Stunden', abstand: 3 },
];

/** Blasentraining: Abstände zwischen den Toilettengängen werden Schritt für Schritt länger. */
export default function HarninkontinenzBlasentraining() {
  return (
    <Zeichnung titel="Blasentraining auf drei Zeitleisten von 8 bis 14 Uhr: Am Anfang geht man etwa jede Stunde zur Toilette, nach einigen Wochen alle anderthalb Stunden, das Ziel sind drei bis vier Stunden">
      <Etikett x={360} y={60} anker="middle">
        Blasentraining
      </Etikett>
      <Unterzeile x={360} y={92} anker="middle">
        den Toilettengang Schritt für Schritt hinausschieben
      </Unterzeile>

      {ZEILEN.map((z, i) => {
        const gaenge: number[] = [];
        for (let h = 0; h <= 6.001; h += z.abstand) gaenge.push(h);
        return (
          <g key={z.titel}>
            <Etikett x={START} y={z.y - 44} farbe={i === 2 ? F.kupferHell : F.linie}>
              {z.titel}
            </Etikett>
            <Unterzeile x={ENDE} y={z.y - 44} anker="end">
              {z.zeile}
            </Unterzeile>
            <line x1={START} y1={z.y} x2={ENDE} y2={z.y} stroke={F.leise} strokeWidth="4" strokeLinecap="round" />
            {gaenge.slice(1).map((h, k) => (
              <path
                key={h}
                d={`M${hx(gaenge[k]) + 16} ${z.y} Q${(hx(gaenge[k]) + hx(h)) / 2} ${z.y - 30} ${hx(h) - 16} ${z.y}`}
                fill="none"
                stroke={F.petrolHell}
                strokeWidth="4"
                strokeLinecap="round"
              />
            ))}
            {gaenge.map((h) => (
              <circle key={h} cx={hx(h)} cy={z.y} r="12" fill={F.kupfer} stroke={F.linie} strokeWidth="3" />
            ))}
          </g>
        );
      })}

      <Unterzeile x={START} y={570} anker="middle">
        8 Uhr
      </Unterzeile>
      <Unterzeile x={hx(3)} y={570} anker="middle">
        11 Uhr
      </Unterzeile>
      <Unterzeile x={ENDE} y={570} anker="middle">
        14 Uhr
      </Unterzeile>
      <Unterzeile x={360} y={650} anker="middle">
        Punkt: Toilettengang
      </Unterzeile>
    </Zeichnung>
  );
}
