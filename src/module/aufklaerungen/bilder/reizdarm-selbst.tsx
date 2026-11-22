import { Etikett, F, KONTUR, Unterzeile, Zeichnung } from './bausteine';

/** Einträge im Tagebuch: Tag, Essen, Stärke der Beschwerden (0 bis 1). */
const ZEILEN: [string, string, number][] = [
  ['Mo', 'Brötchen, Kaffee', 0.15],
  ['Di', 'Linsensuppe', 0.85],
  ['Mi', 'Reis mit Gemüse', 0.1],
  ['Do', 'Zwiebelkuchen', 0.8],
];

/** Ein Bauch-Tagebuch: Was habe ich gegessen, wie ging es dem Bauch? */
export default function ReizdarmSelbst() {
  return (
    <Zeichnung titel="Eine Seite aus einem Bauch-Tagebuch mit vier Tagen: was gegessen wurde und wie stark die Beschwerden waren. Nach einigen Wochen zeigt sich ein Muster">
      {/* Seite mit Spiralbindung */}
      <rect x="80" y="70" width="560" height="460" rx="18" {...KONTUR} fill={F.petrolDunkel} />
      {[140, 220, 300, 380, 460, 540].map((x) => (
        <circle key={x} cx={x} cy="70" r="11" fill={F.tief} stroke={F.linie} strokeWidth="3" />
      ))}

      <Etikett x={110} y={150}>
        Tag
      </Etikett>
      <Etikett x={200} y={150}>
        Essen
      </Etikett>
      <Etikett x={436} y={150}>
        Beschwerden
      </Etikett>
      <line x1="100" y1="172" x2="620" y2="172" stroke={F.linie} strokeWidth="3" />
      <line x1="180" y1="120" x2="180" y2="510" stroke={F.leise} strokeWidth="2" />
      <line x1="420" y1="120" x2="420" y2="510" stroke={F.leise} strokeWidth="2" />

      {ZEILEN.map(([tag, essen, staerke], i) => {
        const y = 224 + i * 84;
        const stark = staerke > 0.5;
        return (
          <g key={tag}>
            {i > 0 && (
              <line x1="100" y1={y - 42} x2="620" y2={y - 42} stroke={F.leise} strokeWidth="1.5" strokeOpacity="0.5" />
            )}
            <Unterzeile x={110} y={y + 8} farbe={F.linie}>
              {tag}
            </Unterzeile>
            <Unterzeile x={200} y={y + 8} farbe={F.linie}>
              {essen}
            </Unterzeile>
            <rect
              x="440"
              y={y - 13}
              width={Math.max(40, Math.round(160 * staerke))}
              height="26"
              rx="13"
              fill={stark ? F.kupfer : F.petrolHell}
            />
          </g>
        );
      })}

      <Etikett x={360} y={606} anker="middle">
        Nach einigen Wochen zeigt sich ein Muster
      </Etikett>
      <Unterzeile x={360} y={640} anker="middle">
        Was tut Ihrem Bauch gut, was nicht?
      </Unterzeile>
    </Zeichnung>
  );
}
