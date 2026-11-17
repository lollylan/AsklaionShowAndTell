import { Etikett, F, Unterzeile, Zeichnung } from './bausteine';

const ZETTEL = [60, 160, 260, 360, 460, 560];

/** Zeitleiste: sechs Wochen Lohn vom Arbeitgeber, ab Woche 7 Krankengeld; darunter Krankschreibungen ohne Lücke. */
export default function KrankschreibungGeld() {
  return (
    <Zeichnung titel="Zeitleiste der Krankschreibung: In den ersten sechs Wochen zahlt der Arbeitgeber den Lohn weiter, ab der siebten Woche zahlt die Krankenkasse Krankengeld, höchstens 78 Wochen. Darunter reihen sich die Krankschreibungen ohne Lücke aneinander">
      <Unterzeile x={60} y={150} farbe={F.linie}>
        Woche 1 bis 6
      </Unterzeile>
      <Unterzeile x={320} y={150} farbe={F.linie}>
        ab Woche 7
      </Unterzeile>

      <rect x={60} y={176} width={250} height={90} rx="14" fill={F.petrol} stroke={F.linie} strokeWidth="4" />
      <path
        d="M320 176 L620 176 L670 221 L620 266 L320 266 Z"
        fill={F.petrolHell}
        stroke={F.linie}
        strokeWidth="4"
        strokeLinejoin="round"
      />

      <Etikett x={60} y={318}>
        Arbeitgeber
      </Etikett>
      <Etikett x={320} y={318}>
        Krankenkasse
      </Etikett>
      <Unterzeile x={320} y={352}>
        Krankengeld, bis 78 Wochen
      </Unterzeile>

      {/* Krankschreibungen, Kante an Kante; die Stöße in Kupfer */}
      {ZETTEL.map((x, i) => (
        <g key={x}>
          <rect x={x} y={440} width={100} height={120} rx="8" fill={F.petrolDunkel} stroke={F.linie} strokeWidth="4" />
          <line x1={x + 20} y1={476} x2={x + 80} y2={476} stroke={F.leise} strokeWidth="4" strokeLinecap="round" />
          <line x1={x + 20} y1={500} x2={x + 66} y2={500} stroke={F.leise} strokeWidth="4" strokeLinecap="round" />
          {i > 0 && <circle cx={x} cy={530} r="9" fill={F.kupfer} stroke={F.linie} strokeWidth="3" />}
        </g>
      ))}
      <Etikett x={60} y={620} farbe={F.kupferHell}>
        Verlängerung ohne Lücke
      </Etikett>
    </Zeichnung>
  );
}
