import { Etikett, F, KONTUR, Unterzeile, Zeichnung } from './bausteine';

const LINKS = 60;
const TAG = 29;
/** x-Position eines Krankheitstags auf der Zeitachse. */
const x = (tag: number) => LINKS + (tag - 1) * TAG;

function Balken({ von, bis, y, farbe }: { von: number; bis: number; y: number; farbe: string }) {
  return <rect x={x(von)} y={y} width={x(bis) - x(von)} height="46" rx="23" fill={farbe} />;
}

/** Typischer Verlauf einer Erkältung über drei Wochen: Halsweh, Schnupfen, Husten. */
export default function Erkaeltung() {
  return (
    <Zeichnung titel="Zeitachse einer Erkältung: Halsschmerzen an den ersten drei Tagen, Schnupfen etwa vom zweiten bis zum achten Tag, Husten vom vierten Tag an bis zu drei Wochen, zum Ende hin schwächer">
      <Etikett x={360} y={84} anker="middle">
        So verläuft eine Erkältung
      </Etikett>
      <Unterzeile x={360} y={118} anker="middle">
        Ein Beschwerdebild löst das andere ab
      </Unterzeile>

      <Etikett x={x(1)} y={206}>
        Halsweh
      </Etikett>
      <Balken von={1} bis={4} y={220} farbe={F.kupfer} />

      <Etikett x={x(2)} y={316}>
        Schnupfen
      </Etikett>
      <Balken von={2} bis={9} y={330} farbe={F.kupferHell} />

      <Etikett x={x(4)} y={426}>
        Husten
      </Etikett>
      <Balken von={4} bis={15} y={440} farbe={F.petrolHell} />
      {/* klingt langsam ab */}
      <rect x={x(13)} y="440" width={x(22) - x(13)} height="46" rx="23" fill={F.petrolHell} fillOpacity="0.4" />

      {/* Zeitachse */}
      <path d={`M${x(1)} 540 L${x(22)} 540`} {...KONTUR} stroke={F.leise} strokeWidth={3} />
      {[1, 8, 15, 22].map((tag) => (
        <g key={tag}>
          <path d={`M${x(tag)} 530 L${x(tag)} 550`} {...KONTUR} stroke={F.leise} strokeWidth={3} />
          <Unterzeile x={x(tag)} y={582} anker={tag === 1 ? 'start' : tag === 22 ? 'end' : 'middle'}>
            {tag === 1 ? 'Tag 1' : `${(tag - 1) / 7} ${tag === 8 ? 'Woche' : 'Wochen'}`}
          </Unterzeile>
        </g>
      ))}

      <Etikett x={360} y={654} anker="middle">
        Es sind Viren – Antibiotika helfen nicht
      </Etikett>
    </Zeichnung>
  );
}
