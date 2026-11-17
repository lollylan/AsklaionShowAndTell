import { Etikett, F, Pfeil, Unterzeile, Zeichnung } from './bausteine';
import { Tropfen } from './inkontinenz-tropfen';

/** Blase als runde Form mit Auslass nach unten; (cx, cy) = Mitte. */
function Blase({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g>
      <path
        d={`M${cx - 10} ${cy + 66} L${cx - 10} ${cy + 118} M${cx + 10} ${cy + 66} L${cx + 10} ${cy + 118}`}
        stroke={F.linie}
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d={`M${cx} ${cy - 84} C${cx + 64} ${cy - 84} ${cx + 92} ${cy - 40} ${cx + 88} ${cy} C${cx + 84} ${cy + 40} ${cx + 40} ${cy + 58} ${cx + 14} ${cy + 70} L${cx - 14} ${cy + 70} C${cx - 40} ${cy + 58} ${cx - 84} ${cy + 40} ${cx - 88} ${cy} C${cx - 92} ${cy - 40} ${cx - 64} ${cy - 84} ${cx} ${cy - 84} Z`}
        fill={F.petrolHell}
        stroke={F.linie}
        strokeWidth="4"
        strokeLinejoin="round"
      />
    </g>
  );
}

/** Beckenboden als Hängematte unter der Blase; `durchhang` = wie tief die Mitte hängt. */
function Beckenboden({ cx, y, durchhang, farbe }: { cx: number; y: number; durchhang: number; farbe: string }) {
  const d = `M${cx - 130} ${y} Q${cx} ${y + 2 * durchhang} ${cx + 130} ${y}`;
  return (
    <g>
      <path d={d} fill="none" stroke={F.linie} strokeWidth="22" strokeLinecap="round" />
      <path d={d} fill="none" stroke={farbe} strokeWidth="14" strokeLinecap="round" />
      <circle cx={cx - 130} cy={y} r="12" fill={F.leise} />
      <circle cx={cx + 130} cy={y} r="12" fill={F.leise} />
    </g>
  );
}

/** Blitz als Zeichen für plötzlichen, starken Harndrang. */
function Blitz({ x, y }: { x: number; y: number }) {
  return (
    <path
      d={`M${x + 10} ${y - 50} L${x - 22} ${y + 6} L${x - 2} ${y + 6} L${x - 12} ${y + 50} L${x + 24} ${y - 12} L${x + 3} ${y - 12} Z`}
      fill={F.kupfer}
      stroke={F.linie}
      strokeWidth="3"
      strokeLinejoin="round"
    />
  );
}

const CY = 270;

export default function InkontinenzArten() {
  return (
    <Zeichnung titel="Zwei Arten von Blasenschwäche: Belastung, bei der beim Husten, Lachen oder Heben Urin abgeht, weil der Beckenboden zu schwach ist, und Drang, bei dem der Harndrang plötzlich und sehr stark kommt, weil die Blase überaktiv ist">
      <line x1="360" y1="70" x2="360" y2="640" stroke={F.leise} strokeWidth="2" strokeDasharray="4 10" strokeLinecap="round" />

      {/* Belastung: Druck von oben, schwacher Beckenboden hängt durch, Tropfen */}
      <Pfeil d="M120 92 L130 160" farbe={F.leise} />
      <Pfeil d="M180 82 L180 154" farbe={F.leise} />
      <Pfeil d="M240 92 L230 160" farbe={F.leise} />
      <Blase cx={180} cy={CY} />
      <Beckenboden cx={180} y={CY + 80} durchhang={34} farbe={F.kupfer} />
      <Tropfen x={180} y={CY + 170} r={10} />
      <Tropfen x={156} y={CY + 216} r={9} />
      <Tropfen x={204} y={CY + 222} r={9} />

      {/* Drang: Blase mit Blitz, Beckenboden normal */}
      <g stroke={F.kupferHell} strokeWidth="4" fill="none" strokeLinecap="round">
        <path d="M430 220 Q420 250 430 280" />
        <path d="M412 204 Q396 250 412 296" />
        <path d="M650 220 Q660 250 650 280" />
        <path d="M668 204 Q684 250 668 296" />
      </g>
      <Blase cx={540} cy={CY} />
      <Blitz x={540} y={CY - 8} />
      <Beckenboden cx={540} y={CY + 80} durchhang={10} farbe={F.petrolHell} />

      <Etikett x={180} y={560} anker="middle">
        Belastung
      </Etikett>
      <Unterzeile x={180} y={592} anker="middle" farbe={F.linie}>
        beim Husten, Lachen, Heben
      </Unterzeile>
      <Unterzeile x={180} y={622} anker="middle">
        Beckenboden zu schwach
      </Unterzeile>

      <Etikett x={540} y={560} anker="middle">
        Drang
      </Etikett>
      <Unterzeile x={540} y={592} anker="middle" farbe={F.linie}>
        plötzlich, sehr stark
      </Unterzeile>
      <Unterzeile x={540} y={622} anker="middle">
        Blase überaktiv
      </Unterzeile>
    </Zeichnung>
  );
}
