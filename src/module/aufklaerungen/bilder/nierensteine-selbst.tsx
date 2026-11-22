import { Etikett, F, KONTUR, Unterzeile, Zeichnung } from './bausteine';

/** Ein kleines Trinkglas, Mitte x, Oberkante bei y. */
function Glas({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <path d={`M${x - 16} ${y + 24} L${x - 13} ${y + 72} L${x + 13} ${y + 72} L${x + 16} ${y + 24} Z`} fill={F.petrolHell} />
      <path d={`M${x - 19} ${y} L${x - 14} ${y + 74} L${x + 14} ${y + 74} L${x + 19} ${y}`} {...KONTUR} strokeWidth={3} />
    </g>
  );
}

/** Tropfen mit Spitze oben, Mitte des Bauchs bei (x, y). */
function Tropfen({ x, y, farbe }: { x: number; y: number; farbe: string }) {
  return (
    <path
      d={`M${x} ${y - 70} C${x + 22} ${y - 36} ${x + 44} ${y - 14} ${x + 44} ${y + 12} C${x + 44} ${y + 38} ${x + 24} ${y + 56} ${x} ${y + 56} C${x - 24} ${y + 56} ${x - 44} ${y + 38} ${x - 44} ${y + 12} C${x - 44} ${y - 14} ${x - 22} ${y - 36} ${x} ${y - 70} Z`}
      fill={farbe}
      stroke={F.linie}
      strokeWidth="4"
      strokeLinejoin="round"
    />
  );
}

/** Vorbeugen: über den Tag reichlich trinken, der Urin soll hell sein. */
export default function NierensteineSelbst() {
  return (
    <Zeichnung titel="Oben zehn Gläser über den Tag verteilt, zusammen etwa zweieinhalb Liter. Unten drei Tropfen Urin von hell bis dunkel: Heller Urin ist gut, dunkler Urin heißt mehr trinken">
      <Etikett x={360} y={80} anker="middle">
        Über den Tag verteilt trinken
      </Etikett>
      <Unterzeile x={360} y={112} anker="middle">
        etwa zweieinhalb bis drei Liter
      </Unterzeile>
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
        <Glas key={i} x={90 + i * 60} y={150} />
      ))}

      <line
        x1="40"
        y1="290"
        x2="680"
        y2="290"
        stroke={F.leise}
        strokeWidth="2"
        strokeDasharray="4 8"
        strokeLinecap="round"
      />

      <Etikett x={360} y={350} anker="middle">
        Der Urin sollte hell sein
      </Etikett>
      <Tropfen x={150} y={470} farbe={F.creme} />
      <Tropfen x={360} y={470} farbe={F.kupferHell} />
      <Tropfen x={570} y={470} farbe={F.kupfer} />

      <Etikett x={150} y={580} anker="middle">
        Hell
      </Etikett>
      <Unterzeile x={150} y={612} anker="middle">
        genug getrunken
      </Unterzeile>
      <Etikett x={360} y={580} anker="middle">
        Dunkler
      </Etikett>
      <Unterzeile x={360} y={612} anker="middle">
        mehr trinken
      </Unterzeile>
      <Etikett x={570} y={580} anker="middle" farbe={F.kupferHell}>
        Dunkel
      </Etikett>
      <Unterzeile x={570} y={612} anker="middle">
        viel zu wenig
      </Unterzeile>
    </Zeichnung>
  );
}
