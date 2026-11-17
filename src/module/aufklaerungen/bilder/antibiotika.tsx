import { Etikett, F, Pfeil, Unterzeile, Zeichnung } from './bausteine';

/** Lage der Bakterien und Viren im jeweiligen Feld, bezogen auf dessen Mitte: [x, y, Drehwinkel]. */
const ERREGER: [number, number, number][] = [
  [-70, -70, 20],
  [20, -90, -30],
  [80, -30, 60],
  [-30, -10, -10],
  [-90, 30, 70],
  [40, 40, 10],
  [-40, 85, -40],
  [70, 100, 30],
];

/** Tablette, waagerecht, Mitte (0, 0). */
function Kapsel() {
  return (
    <g>
      <path d="M0 -22 L-33 -22 A22 22 0 0 0 -33 22 L0 22 Z" fill={F.petrolHell} />
      <path d="M0 -22 L33 -22 A22 22 0 0 1 33 22 L0 22 Z" fill={F.creme} />
      <rect x="-55" y="-22" width="110" height="44" rx="22" fill="none" stroke={F.linie} strokeWidth="4" />
    </g>
  );
}

/** Stäbchenbakterium; aufgelöst nur noch als gestrichelter Umriss. */
function Bakterium({ aufgeloest }: { aufgeloest: boolean }) {
  if (aufgeloest) {
    return (
      <rect
        x="-28"
        y="-13"
        width="56"
        height="26"
        rx="13"
        fill="none"
        stroke={F.leise}
        strokeWidth="3"
        strokeDasharray="7 9"
        strokeLinecap="round"
      />
    );
  }
  return <rect x="-28" y="-13" width="56" height="26" rx="13" fill={F.kupfer} stroke={F.kupferHell} strokeWidth="3" />;
}

const STACHELN = [0, 45, 90, 135, 180, 225, 270, 315];

/** Virus als Kugel mit Stacheln. */
function Virus() {
  return (
    <g>
      {STACHELN.map((w) => (
        <g key={w} transform={`rotate(${w})`}>
          <line x1="0" y1="-18" x2="0" y2="-28" stroke={F.kupferHell} strokeWidth="3" strokeLinecap="round" />
          <circle cx="0" cy="-30" r="4" fill={F.kupferHell} />
        </g>
      ))}
      <circle cx="0" cy="0" r="19" fill={F.kupfer} stroke={F.kupferHell} strokeWidth="3" />
    </g>
  );
}

/** Links Bakterien, die das Antibiotikum auflöst; rechts Viren, die unberührt bleiben. */
export default function Antibiotika() {
  return (
    <Zeichnung titel="Links wirkt ein Antibiotikum gegen Bakterien, die sich auflösen; rechts bleiben Viren trotz Antibiotikum unverändert">
      <line x1="360" y1="150" x2="360" y2="600" stroke={F.leise} strokeWidth="2" strokeDasharray="4 10" strokeLinecap="round" />

      {[185, 535].map((x) => (
        <g key={x}>
          <g transform={`translate(${x} 200)`}>
            <Kapsel />
          </g>
          <Pfeil d={`M${x} 242 L${x} 300`} farbe={F.leise} />
        </g>
      ))}

      <g transform="translate(185 450)">
        {ERREGER.map(([dx, dy, w]) => (
          <g key={`b-${dx}-${dy}`} transform={`translate(${dx} ${dy}) rotate(${w})`}>
            <Bakterium aufgeloest />
          </g>
        ))}
      </g>
      <g transform="translate(535 450)">
        {ERREGER.map(([dx, dy]) => (
          <g key={`v-${dx}-${dy}`} transform={`translate(${dx} ${dy})`}>
            <Virus />
          </g>
        ))}
      </g>

      <Etikett x={185} y={80} anker="middle">
        Bakterien
      </Etikett>
      <Unterzeile x={185} y={112} anker="middle">
        Antibiotikum wirkt
      </Unterzeile>
      <Etikett x={535} y={80} anker="middle" farbe={F.kupferHell}>
        Viren
      </Etikett>
      <Unterzeile x={535} y={112} anker="middle" farbe={F.kupferHell}>
        Antibiotikum wirkt nicht
      </Unterzeile>

      <Unterzeile x={360} y={672} anker="middle">
        Erkältungen kommen fast immer von Viren
      </Unterzeile>
    </Zeichnung>
  );
}
