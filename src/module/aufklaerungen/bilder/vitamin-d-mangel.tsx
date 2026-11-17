import { Etikett, F, KONTUR, Pfeil, Unterzeile, Zeichnung } from './bausteine';

const STRAHLEN = Array.from({ length: 8 }, (_, i) => (i * Math.PI) / 4);

/** Monate Januar bis Dezember; März (2) bis Oktober (9) bildet die Haut genug Vitamin D. */
const MONATE = Array.from({ length: 12 }, (_, i) => i);
const SOMMER = (i: number) => i >= 2 && i <= 9;
const BOX = 48;
const ABSTAND = 54;
const links = (i: number) => 40 + i * ABSTAND;

/** Sonne auf der Haut bildet Vitamin D; darunter das Jahr mit Sommer- und Wintermonaten. */
export default function VitaminDMangel() {
  return (
    <Zeichnung titel="Die Sonne scheint auf die Haut, im Schnitt gezeigt; die Haut bildet Vitamin D; darunter ein Band mit zwölf Monaten: von März bis Oktober bildet die Haut genug, im Winter kaum, dann zehrt der Körper vom Vorrat">
      {/* Sonne */}
      <g transform="translate(130 170)">
        {STRAHLEN.map((w) => (
          <line
            key={w}
            x1={Math.cos(w) * 66}
            y1={Math.sin(w) * 66}
            x2={Math.cos(w) * 90}
            y2={Math.sin(w) * 90}
            stroke={F.kupferHell}
            strokeWidth="6"
            strokeLinecap="round"
          />
        ))}
        <circle r="52" fill={F.kupferHell} stroke={F.linie} strokeWidth="4" />
      </g>

      {/* Haut im Schnitt: oben die Hautoberfläche, darunter eine helle Schicht, in der Vitamin D entsteht */}
      <path d="M330 244 Q420 226 510 244 T690 244 L690 310 L330 310 Z" fill={F.petrol} />
      <path d="M330 244 Q420 226 510 244 T690 244 L690 262 Q600 280 510 262 Q420 244 330 262 Z" fill={F.petrolHell} />
      <path d="M330 244 Q420 226 510 244 T690 244" {...KONTUR} />

      <Pfeil d="M222 196 L316 236" farbe={F.kupferHell} />
      <Pfeil d="M210 250 L316 270" farbe={F.kupferHell} />

      <Etikett x={330} y={100}>
        Sonne auf der Haut
      </Etikett>
      <Unterzeile x={330} y={134}>
        Der Körper bildet Vitamin D
      </Unterzeile>

      {/* Jahr */}
      <Etikett x={(links(2) + links(9) + BOX) / 2} y={430} anker="middle">
        März bis Oktober
      </Etikett>
      {MONATE.map((i) => (
        <rect
          key={i}
          x={links(i)}
          y="456"
          width={BOX}
          height="72"
          rx="10"
          fill={SOMMER(i) ? F.petrolHell : F.tief}
          stroke={SOMMER(i) ? F.linie : F.leise}
          strokeWidth="3"
        />
      ))}
      <Unterzeile x={links(0) + BOX / 2} y={562} anker="middle">
        Jan
      </Unterzeile>
      <Unterzeile x={links(11) + BOX / 2} y={562} anker="middle">
        Dez
      </Unterzeile>
      <Unterzeile x={360} y={630} anker="middle" farbe={F.linie}>
        Im Winter zehrt der Körper vom Vorrat
      </Unterzeile>
    </Zeichnung>
  );
}
