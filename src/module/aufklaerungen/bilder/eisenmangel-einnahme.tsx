import { Etikett, F, KONTUR, Unterzeile, Zeichnung } from './bausteine';

const TAGE = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];

/** Eisentabletten richtig einnehmen: was hilft, was hemmt, jeden zweiten Tag. */
export default function EisenmangelEinnahme() {
  return (
    <Zeichnung titel="Eisen richtig einnehmen. Links: mit Wasser oder Saft, Vitamin C aus einer Orange hilft bei der Aufnahme. Rechts: Kaffee, Tee und Milch hemmen die Aufnahme, zwei Stunden Abstand halten. Unten eine Woche mit einer Tablette an jedem zweiten Tag">
      {/* Was hilft: Glas Wasser und Orange */}
      <path d="M112 150 L122 300 L182 300 L192 150 Z" {...KONTUR} />
      <path d="M116 200 L188 200 L182 300 L122 300 Z" fill={F.petrolHell} opacity="0.7" />
      <circle cx="262" cy="258" r="44" {...KONTUR} fill={F.kupferHell} />
      <circle cx="262" cy="258" r="30" fill="none" stroke={F.kupfer} strokeWidth="3" />
      {[0, 60, 120].map((w) => (
        <path key={w} d="M262 228 L262 288" transform={`rotate(${w} 262 258)`} stroke={F.kupfer} strokeWidth="3" />
      ))}
      <Etikett x={190} y={380} anker="middle">
        Wasser oder Saft
      </Etikett>
      <Unterzeile x={190} y={410} anker="middle">
        Vitamin C hilft
      </Unterzeile>

      <path d="M360 140 L360 420" stroke={F.leise} strokeWidth="2" strokeDasharray="6 8" />

      {/* Was hemmt: Tasse und Milch */}
      <path d="M440 210 L452 300 Q480 312 508 300 L520 210 Z" {...KONTUR} fill={F.petrolDunkel} />
      <path d="M520 228 Q552 232 546 258 Q540 280 514 280" {...KONTUR} strokeWidth={3} />
      <path d="M468 190 Q460 172 470 156 M494 190 Q486 172 496 156" {...KONTUR} strokeWidth={3} stroke={F.leise} />
      <path d="M580 186 L604 160 L644 160 L644 300 L580 300 Z" {...KONTUR} fill={F.creme} />
      <path d="M604 160 L604 186 L580 186" {...KONTUR} strokeWidth={3} stroke={F.leise} />
      <Etikett x={540} y={380} anker="middle" farbe={F.kupferHell}>
        Kaffee, Tee, Milch
      </Etikett>
      <Unterzeile x={540} y={410} anker="middle">
        2 Stunden Abstand
      </Unterzeile>

      {/* Jeden zweiten Tag */}
      {TAGE.map((tag, i) => {
        const x = 72 + i * 84;
        return (
          <g key={tag}>
            <rect x={x} y="480" width="68" height="76" rx="12" {...KONTUR} strokeWidth={3} fill={F.petrolDunkel} />
            <Unterzeile x={x + 34} y={508} anker="middle" farbe={F.linie}>
              {tag}
            </Unterzeile>
            {i % 2 === 0 && <circle cx={x + 34} cy="534" r="12" fill={F.kupfer} />}
          </g>
        );
      })}
      <Etikett x={360} y={620} anker="middle">
        Jeden zweiten Tag geht auch
      </Etikett>
      <Unterzeile x={360} y={650} anker="middle">
        wirkt ähnlich gut, schont den Magen
      </Unterzeile>
    </Zeichnung>
  );
}
