import { Etikett, F, KONTUR, Unterzeile, Zeichnung, Zeiger } from './bausteine';

/** Tropfenform mit Spitze oben, Mittelpunkt des Bauchs bei (x, y). */
function tropfen(x: number, y: number, r: number) {
  return `M${x} ${y - r * 2.1} C${x + r * 0.5} ${y - r * 1.2} ${x + r} ${y - r * 0.6} ${x + r} ${y} A${r} ${r} 0 0 1 ${x - r} ${y} C${x - r} ${y - r * 0.6} ${x - r * 0.5} ${y - r * 1.2} ${x} ${y - r * 2.1} Z`;
}

/** Haut um den After, schematisch als Kreis: gerötet, nässend, juckend – darunter häufige Auslöser. */
export default function Analekzem() {
  return (
    <Zeichnung titel="Schema der Haut rund um den After: ein geröteter, nässender Ring, der juckt; darunter häufige Auslöser: feuchte Tücher, Salben mit Duftstoffen und Feuchtigkeit">
      {/* Hautfläche */}
      <circle cx="360" cy="250" r="165" fill={F.petrol} stroke={F.linie} strokeWidth="4" />
      {/* gerötete Haut rund um den After */}
      <path
        d="M360 140 C410 136 452 160 466 206 C480 250 470 300 440 330 C410 362 352 370 310 352 C266 334 244 292 250 246 C256 196 300 144 360 140 Z"
        fill={F.kupfer}
        opacity="0.95"
      />
      <path
        d="M360 140 C410 136 452 160 466 206 C480 250 470 300 440 330 C410 362 352 370 310 352 C266 334 244 292 250 246 C256 196 300 144 360 140 Z"
        fill="none"
        stroke={F.kupferHell}
        strokeWidth="3"
        strokeDasharray="10 8"
      />
      {/* After: kleine Öffnung mit Fältchen */}
      <circle cx="360" cy="252" r="12" fill={F.petrolDunkel} stroke={F.creme} strokeWidth="3" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((w) => (
        <line
          key={w}
          x1="360"
          y1="235"
          x2="360"
          y2="227"
          transform={`rotate(${w} 360 252)`}
          stroke={F.linie}
          strokeWidth="3"
          strokeLinecap="round"
        />
      ))}
      {/* nässt: kleine Tropfen auf der Haut */}
      {[
        [300, 230],
        [420, 300],
        [330, 322],
        [432, 214],
      ].map(([x, y]) => (
        <path key={`${x}-${y}`} d={tropfen(x, y, 8)} fill={F.kupferHell} />
      ))}
      {/* Juckreiz: Zickzack-Striche */}
      {[0, 24, 48].map((d) => (
        <path
          key={d}
          d={`M${548 + d * 0.3} ${110 + d} l12 -10 l12 10 l12 -10 l12 10`}
          {...KONTUR}
          stroke={F.kupferHell}
          strokeWidth="4"
        />
      ))}

      <Etikett x={30} y={70}>
        Gerötete Haut
      </Etikett>
      <Unterzeile x={30} y={100}>
        rund um den After,
      </Unterzeile>
      <Unterzeile x={30} y={126}>
        nässt und brennt
      </Unterzeile>
      <Zeiger von={[150, 140]} nach={[268, 220]} />

      <Etikett x={700} y={70} anker="end" farbe={F.kupferHell}>
        Juckreiz
      </Etikett>

      {/* Auslöser */}
      <line x1="60" y1="470" x2="660" y2="470" stroke={F.leise} strokeWidth="2" strokeDasharray="4 8" />
      <Etikett x={360} y={510} anker="middle">
        Häufige Auslöser
      </Etikett>

      {/* Feuchttücher: Packung mit herausschauendem Tuch */}
      <path
        d="M126 574 L136 536 C150 546 166 530 180 542 L192 574"
        fill={F.creme}
        stroke={F.linie}
        strokeWidth="3"
      />
      <rect
        x="100"
        y="570"
        width="116"
        height="62"
        rx="12"
        fill={F.petrolHell}
        stroke={F.linie}
        strokeWidth="4"
      />
      <path d={tropfen(196, 606, 7)} fill={F.kupferHell} />
      <Unterzeile x={158} y={672} anker="middle" farbe={F.linie}>
        Feuchttücher
      </Unterzeile>

      {/* Salbe: Tube mit Kappe */}
      <path
        d="M300 568 L404 576 L404 618 L300 626 Z"
        fill={F.petrolHell}
        stroke={F.linie}
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <rect
        x="290"
        y="562"
        width="12"
        height="70"
        rx="3"
        fill={F.petrolHell}
        stroke={F.linie}
        strokeWidth="4"
      />
      <rect x="404" y="584" width="26" height="26" rx="5" fill={F.creme} stroke={F.linie} strokeWidth="3" />
      <Unterzeile x={360} y={672} anker="middle" farbe={F.linie}>
        Salben, Duftstoffe
      </Unterzeile>

      {/* Feuchtigkeit: Tropfen */}
      <path d={tropfen(540, 612, 16)} fill={F.petrolHell} stroke={F.linie} strokeWidth="3" />
      <path d={tropfen(584, 598, 12)} fill={F.petrolHell} stroke={F.linie} strokeWidth="3" />
      <path d={tropfen(614, 622, 9)} fill={F.petrolHell} stroke={F.linie} strokeWidth="3" />
      <Unterzeile x={572} y={672} anker="middle" farbe={F.linie}>
        Nässe, Schweiß
      </Unterzeile>
    </Zeichnung>
  );
}
