import { Etikett, F, KONTUR, Pfeil, Unterzeile, Zeichnung } from './bausteine';

/** Ein Gewichtsblock mit Griff; (x, y) ist die Mitte. */
function Gewicht({ x, y, text }: { x: number; y: number; text?: string }) {
  return (
    <g>
      <path d={`M${x - 22} ${y - 32} C${x - 22} ${y - 60} ${x + 22} ${y - 60} ${x + 22} ${y - 32}`} {...KONTUR} />
      <path
        d={`M${x - 52} ${y + 30} L${x - 40} ${y - 32} L${x + 40} ${y - 32} L${x + 52} ${y + 30} Z`}
        {...KONTUR}
        fill={F.kupferHell}
      />
      {text && (
        <Etikett x={x} y={y + 12} anker="middle" farbe={F.tief}>
          {text}
        </Etikett>
      )}
    </g>
  );
}

/** Jedes Kilo weniger Körpergewicht nimmt dem Knie beim Gehen etwa vier Kilo Last ab. */
export default function ArthroseSelbst() {
  return (
    <Zeichnung titel="Links ein Gewicht von einem Kilo weniger am Körper, ein Pfeil zeigt nach rechts auf vier gleich große Gewichte: so viel weniger Last trägt das Knie bei jedem Schritt">
      <Etikett x={360} y={80} anker="middle">
        Abnehmen entlastet das Knie
      </Etikett>

      {/* links: 1 kg */}
      <Gewicht x={170} y={420} text="1 kg" />
      <Etikett x={170} y={530} anker="middle">
        am Körper
      </Etikett>
      <Unterzeile x={170} y={564} anker="middle">
        weniger Gewicht
      </Unterzeile>

      <Pfeil d="M262 410 L360 410" farbe={F.linie} breite={6} />

      {/* rechts: vier Gewichte */}
      <Gewicht x={460} y={290} text="1 kg" />
      <Gewicht x={590} y={290} text="1 kg" />
      <Gewicht x={460} y={420} text="1 kg" />
      <Gewicht x={590} y={420} text="1 kg" />
      <Etikett x={525} y={530} anker="middle" farbe={F.kupferHell}>
        bis 4 kg im Knie
      </Etikett>
      <Unterzeile x={525} y={564} anker="middle">
        weniger Last bei jedem Schritt
      </Unterzeile>
    </Zeichnung>
  );
}
