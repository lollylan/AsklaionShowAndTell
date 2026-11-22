import { Etikett, F, Folge, Pfeil, Unterzeile, Zeichnung } from './bausteine';

/** Lage der Bakterien in einer Schale, bezogen auf deren Mitte: [x, y, Drehwinkel]. */
const LAGE: [number, number, number][] = [
  [-38, -50, 20],
  [18, -56, -30],
  [50, -18, 70],
  [-8, -14, -10],
  [-52, 8, 80],
  [26, 22, 15],
  [-24, 46, -40],
  [36, 56, 35],
  [-56, -24, -60],
  [2, 66, 0],
];

/** Indizes der Bakterien, die das Antibiotikum überleben. */
const RESISTENT = new Set([3, 7]);

function Keim({ resistent }: { resistent: boolean }) {
  return (
    <rect
      x="-17"
      y="-8"
      width="34"
      height="16"
      rx="8"
      fill={resistent ? F.kupfer : F.petrolHell}
      stroke={resistent ? F.kupferHell : F.linie}
      strokeWidth="2.5"
    />
  );
}

/** Schale mit Bakterien. art: vorher (gemischt), danach (nur Resistente), später (alle resistent). */
function Schale({ x, art }: { x: number; art: 'vorher' | 'danach' | 'spaeter' }) {
  return (
    <g transform={`translate(${x} 330)`}>
      <circle cx="0" cy="0" r="92" fill={F.petrolDunkel} stroke={F.linie} strokeWidth="4" />
      {LAGE.map(([dx, dy, w], i) => {
        const resistent = art === 'spaeter' || RESISTENT.has(i);
        const keim = (
          <g transform={`translate(${dx} ${dy}) rotate(${w})`}>
            <Keim resistent={resistent} />
          </g>
        );
        // Danach: Die empfindlichen sind ruhend weg; in Bewegung sind sie erst da und vergehen.
        if (art === 'danach' && !resistent) {
          return (
            <g key={`${dx}-${dy}`} className="antibiotika-resistenz-weg" opacity="0">
              {keim}
            </g>
          );
        }
        // Später: Die Resistenten vermehren sich, ein Keim nach dem anderen kommt dazu.
        if (art === 'spaeter') {
          const rang = RESISTENT.has(i) ? 0 : 1 + i * 0.5;
          return (
            <Folge key={`${dx}-${dy}`} ab={3.4 + rang * 0.3} von={0} dauer={0.5}>
              {keim}
            </Folge>
          );
        }
        return <g key={`${dx}-${dy}`}>{keim}</g>;
      })}
    </g>
  );
}

/** Kleine Tablette über einem Pfeil. */
function Tablette({ x }: { x: number }) {
  return (
    <g transform={`translate(${x} 270)`}>
      <rect x="-24" y="-11" width="48" height="22" rx="11" fill={F.creme} stroke={F.linie} strokeWidth="3" />
      <path d="M0 -11 L-13 -11 A11 11 0 0 0 -13 11 L0 11 Z" fill={F.petrolHell} />
    </g>
  );
}

/** Drei Schalen nebeneinander: Ein Antibiotikum lässt nur die resistenten Bakterien übrig, die sich vermehren. */
export default function AntibiotikaResistenz() {
  return (
    <Zeichnung titel="Drei Schalen mit Bakterien: vorher wenige resistente unter vielen empfindlichen, nach dem Antibiotikum nur noch die resistenten, später haben sich die resistenten vermehrt">
      <Etikett x={360} y={90} anker="middle">
        So entstehen Resistenzen
      </Etikett>

      <Schale x={120} art="vorher" />
      <Schale x={360} art="danach" />
      <Schale x={600} art="spaeter" />

      <Folge ab={0.6} von={0} dauer={0.7}>
        <Tablette x={240} />
      </Folge>
      <Pfeil d="M218 330 L258 330" farbe={F.leise} />
      <Pfeil d="M458 330 L498 330" farbe={F.leise} />

      <Etikett x={120} y={472} anker="middle">
        Vorher
      </Etikett>
      <Etikett x={360} y={472} anker="middle">
        Danach
      </Etikett>
      <Etikett x={600} y={472} anker="middle" farbe={F.kupferHell}>
        Später
      </Etikett>

      {/* Zeichenerklärung */}
      <rect x="150" y="582" width="34" height="16" rx="8" fill={F.petrolHell} stroke={F.linie} strokeWidth="2.5" />
      <Unterzeile x={196} y={598}>
        empfindlich
      </Unterzeile>
      <rect x="400" y="582" width="34" height="16" rx="8" fill={F.kupfer} stroke={F.kupferHell} strokeWidth="2.5" />
      <Unterzeile x={446} y={598} farbe={F.kupferHell}>
        resistent
      </Unterzeile>
    </Zeichnung>
  );
}
