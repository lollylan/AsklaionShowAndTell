import { Etikett, F, Unterzeile, Zeichnung } from './bausteine';

const LINKS = 240;
const MONAT = 37;
/** x-Position im Jahr; 0 = Anfang Januar, 12 = Ende Dezember. */
const x = (monat: number) => LINKS + monat * MONAT;
const MONATE = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];

/** Pollen: Name, Zeile (y), Flugzeit gesamt [von, bis] und Hauptzeit [von, bis] in Monaten. */
const POLLEN: [string, number, [number, number], [number, number]][] = [
  ['Hasel, Erle', 170, [0, 3.6], [1, 3]],
  ['Birke', 260, [2.5, 5], [3, 4.4]],
  ['Gräser', 350, [4, 8], [4.5, 7]],
  ['Kräuter', 440, [6.4, 9.7], [7, 8.7]],
];

/** Pollenflugkalender: wann im Jahr welche Pollen typischerweise fliegen. */
export default function Heuschnupfen() {
  return (
    <Zeichnung titel="Pollenflugkalender über das Jahr: Hasel und Erle von Januar bis März, Birke im April, Gräser von Mai bis Juli, Kräuter wie Beifuß und Ambrosia im Spätsommer">
      <Etikett x={360} y={66} anker="middle">
        Wann welche Pollen fliegen
      </Etikett>
      <Unterzeile x={360} y={98} anker="middle">
        Hell: Flugzeit, kräftig: stärkste Belastung
      </Unterzeile>

      {/* Monatsraster */}
      {MONATE.map((m, i) => (
        <g key={i}>
          <line x1={x(i)} y1="150" x2={x(i)} y2="510" stroke={F.petrolDunkel} strokeWidth="2" />
          <Unterzeile x={x(i + 0.5)} y={548} anker="middle">
            {m}
          </Unterzeile>
        </g>
      ))}
      <line x1={x(12)} y1="150" x2={x(12)} y2="510" stroke={F.petrolDunkel} strokeWidth="2" />

      {POLLEN.map(([name, y, [von, bis], [hauptVon, hauptBis]]) => (
        <g key={name}>
          <Etikett x={40} y={y + 30}>
            {name}
          </Etikett>
          <rect x={x(von)} y={y} width={x(bis) - x(von)} height="44" rx="22" fill={F.kupferHell} fillOpacity="0.5" />
          <rect x={x(hauptVon)} y={y} width={x(hauptBis) - x(hauptVon)} height="44" rx="22" fill={F.kupfer} />
        </g>
      ))}

      <Unterzeile x={360} y={620} anker="middle">
        Je nach Wetter einige Wochen früher oder später
      </Unterzeile>
      <Unterzeile x={360} y={656} anker="middle">
        Kräuter: zum Beispiel Beifuß und Ambrosia
      </Unterzeile>
    </Zeichnung>
  );
}
