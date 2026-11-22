import { Etikett, F, KONTUR, Pfeil, Unterzeile, Zeichnung } from './bausteine';

/** Ein Trinkglas, unten schmaler, mit Wasser gefüllt. */
function Glas({ x }: { x: number }) {
  return (
    <g>
      <path d={`M${x - 20.5} 176 L${x - 17} 236 L${x + 17} 236 L${x + 20.5} 176 Z`} fill={F.petrolHell} />
      <path d={`M${x - 24} 146 L${x - 18} 238 L${x + 18} 238 L${x + 24} 146`} {...KONTUR} strokeWidth={3} />
    </g>
  );
}

/** Zwei Hilfen: genug trinken und von vorn nach hinten wischen. */
export default function HarnwegsinfektSelbst() {
  return (
    <Zeichnung titel="Oben acht Gläser Wasser, zusammen etwa zwei Liter am Tag. Unten ein Pfeil von vorn nach hinten: beim Abwischen von der Harnröhre weg zum After hin wischen">
      <Etikett x={360} y={90} anker="middle">
        Etwa zwei Liter am Tag trinken
      </Etikett>
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <Glas key={i} x={98 + i * 75} />
      ))}
      <Unterzeile x={360} y={290} anker="middle">
        acht Gläser – und oft zur Toilette gehen
      </Unterzeile>

      <line
        x1="40"
        y1="340"
        x2="680"
        y2="340"
        stroke={F.leise}
        strokeWidth="2"
        strokeDasharray="4 8"
        strokeLinecap="round"
      />

      <Etikett x={360} y={410} anker="middle">
        Von vorn nach hinten wischen
      </Etikett>

      {/* Harnröhre vorn, After hinten, schematisch */}
      <circle cx="210" cy="510" r="14" fill={F.petrolHell} stroke={F.linie} strokeWidth="4" />
      <circle cx="510" cy="510" r="22" fill={F.kupfer} stroke={F.kupferHell} strokeWidth="4" />
      <Pfeil d="M190 468 C300 444 420 444 540 468" farbe={F.linie} breite={6} />

      <Unterzeile x={210} y={570} anker="middle" farbe={F.linie}>
        vorn: Harnröhre
      </Unterzeile>
      <Unterzeile x={510} y={570} anker="middle" farbe={F.linie}>
        hinten: After
      </Unterzeile>
      <Unterzeile x={360} y={650} anker="middle">
        So gelangen keine Darmbakterien nach vorn
      </Unterzeile>
    </Zeichnung>
  );
}
