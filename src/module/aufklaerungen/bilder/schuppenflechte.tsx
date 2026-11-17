import { Etikett, F, KONTUR, Unterzeile, Zeichnung } from './bausteine';

const BREITE = 270;
const BODEN = 560;
const PERIODE = 54;

interface Schnitt {
  x0: number;
  /** Oberkante der Haut (mit Hornschicht). */
  oben: number;
  /** Oberkante der lebenden Oberhaut, also Unterkante der Hornschicht. */
  oberhaut: number;
  /** Tiefe der Oberhaut zwischen den Zapfen. */
  flach: number;
  /** Wie weit die Zapfen der Oberhaut zusätzlich in die Tiefe reichen. */
  zapfen: number;
}

/** Oberhaut als Fläche: oben gerade, unten Zapfen, die in die Lederhaut ragen. */
function oberhautPfad({ x0, oberhaut, flach, zapfen }: Schnitt): string {
  let d = `M${x0} ${oberhaut} L${x0 + BREITE} ${oberhaut}`;
  for (let x = x0 + BREITE; x >= x0; x -= 3) {
    const u = (x - x0) / PERIODE;
    const s = (1 - Math.cos(2 * Math.PI * u)) / 2;
    d += ` L${x} ${(flach + zapfen * s).toFixed(1)}`;
  }
  return `${d} Z`;
}

/** Haargefäßschlinge, die von unten in die Lederhaut zwischen zwei Zapfen hochreicht. */
function schlinge(xc: number, spitze: number, fuss: number): string {
  return `M${xc - 7} ${fuss} L${xc - 7} ${spitze} A7 7 0 0 1 ${xc + 7} ${spitze} L${xc + 7} ${fuss}`;
}

/** Höhe des Gefäßgeflechts in der Lederhaut, aus dem die Schlingen nach oben steigen. */
const GEFLECHT = 500;

function Haut({ schnitt, krank }: { schnitt: Schnitt; krank: boolean }) {
  const { x0, oben, oberhaut, flach } = schnitt;
  const ober = oberhautPfad(schnitt);
  return (
    <g>
      {/* Lederhaut */}
      <rect x={x0} y={oben} width={BREITE} height={BODEN - oben} fill={F.petrolDunkel} />
      {/* Gefäße zwischen den Zapfen */}
      <line x1={x0 + 20} y1={krank ? GEFLECHT : 420} x2={x0 + BREITE - 20} y2={krank ? GEFLECHT : 420} stroke={krank ? F.kupfer : F.petrolHell} strokeWidth={krank ? 7 : 4} strokeLinecap="round" />
      {[1, 2, 3, 4].map((i) => (
        <path
          key={i}
          d={schlinge(x0 + i * PERIODE, flach + 18, krank ? GEFLECHT : 420)}
          fill="none"
          stroke={krank ? F.kupfer : F.petrolHell}
          strokeWidth={krank ? 7 : 4}
          strokeLinecap="round"
        />
      ))}
      {/* Oberhaut */}
      <path d={ober} fill={F.petrol} />
      {krank && <path d={ober} fill={F.kupfer} fillOpacity="0.8" />}
      <path d={ober} fill="none" stroke={F.leise} strokeWidth="2" strokeLinejoin="round" />
      {/* Hornschicht */}
      <rect
        x={x0}
        y={oben}
        width={BREITE}
        height={oberhaut - oben}
        fill={krank ? F.leise : F.petrolHell}
      />
      {krank &&
        [214, 228, 242].map((y) => (
          <line key={y} x1={x0 + 8} y1={y} x2={x0 + BREITE - 8} y2={y} stroke={F.creme} strokeWidth="2" strokeOpacity="0.7" />
        ))}
      <rect x={x0} y={oben} width={BREITE} height={BODEN - oben} {...KONTUR} />
    </g>
  );
}

/** Lose Schuppen auf der Oberfläche, als flache helle Plättchen. */
const SCHUPPEN: [number, number, number][] = [
  // Mitte x, y, Neigung
  [412, 186, -8],
  [452, 176, 6],
  [496, 188, -4],
  [540, 174, 10],
  [584, 186, -6],
  [626, 178, 4],
];

const GESUND: Schnitt = { x0: 60, oben: 248, oberhaut: 262, flach: 300, zapfen: 36 };
const KRANK: Schnitt = { x0: 390, oben: 200, oberhaut: 252, flach: 282, zapfen: 170 };

/** Hautschnitt gesund und bei Schuppenflechte nebeneinander. */
export default function Schuppenflechte() {
  return (
    <Zeichnung titel="Hautschnitt im Vergleich: Links gesunde Haut mit dünner Oberhaut. Rechts Haut bei Schuppenflechte: die Oberhaut ist viel dicker und reicht mit langen Zapfen in die Tiefe, die Blutgefäße darunter sind erweitert, obenauf liegen dicke silbrige Schuppen">
      <Etikett x={195} y={100} anker="middle">
        gesunde Haut
      </Etikett>
      <Etikett x={525} y={100} anker="middle" farbe={F.kupferHell}>
        Schuppenflechte
      </Etikett>

      <Haut schnitt={GESUND} krank={false} />
      <Haut schnitt={KRANK} krank />

      {SCHUPPEN.map(([x, y, w]) => (
        <path
          key={x}
          d={`M${x - 28} ${y + 10} Q${x} ${y - 14} ${x + 28} ${y + 8} Q${x} ${y + 2} ${x - 28} ${y + 10} Z`}
          transform={`rotate(${w} ${x} ${y})`}
          fill={F.creme}
          stroke={F.leise}
          strokeWidth="2"
          strokeLinejoin="round"
        />
      ))}

      <Unterzeile x={195} y={612} anker="middle">
        erneuert sich
      </Unterzeile>
      <Unterzeile x={195} y={642} anker="middle">
        in etwa vier Wochen
      </Unterzeile>
      <Unterzeile x={525} y={612} anker="middle">
        erneuert sich in Tagen:
      </Unterzeile>
      <Unterzeile x={525} y={642} anker="middle" farbe={F.kupferHell}>
        dick, rot, schuppig
      </Unterzeile>
    </Zeichnung>
  );
}
