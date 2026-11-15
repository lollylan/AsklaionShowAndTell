import { Etikett, F, Unterzeile, Zeichnung, Zeiger } from './bausteine';

type Punkt = [number, number];

/** Nervenzellen, relativ zur Kreismitte. */
const ZELLEN: Punkt[] = [
  [0, -100],
  [-75, -65],
  [70, -60],
  [-110, 10],
  [-25, -15],
  [45, 5],
  [110, 30],
  [-65, 75],
  [15, 85],
  [80, 95],
];

/** Verbindungen zwischen den Zellen (Nummern aus ZELLEN). */
const VERBINDUNGEN: Punkt[] = [
  [0, 1],
  [0, 2],
  [0, 4],
  [1, 3],
  [1, 4],
  [2, 4],
  [2, 5],
  [2, 6],
  [3, 4],
  [3, 7],
  [4, 5],
  [4, 7],
  [4, 8],
  [5, 6],
  [5, 8],
  [5, 9],
  [6, 9],
  [7, 8],
  [8, 9],
];

/** Bei Demenz abgestorbene Zellen und eine zusätzlich gerissene Verbindung. */
const TOT = [1, 5, 6, 8];
const GERISSEN = '4-7';

function Netz({ cx, cy, krank }: { cx: number; cy: number; krank: boolean }) {
  const istTot = (i: number) => krank && TOT.includes(i);
  const verloren = (a: number, b: number) => krank && (istTot(a) || istTot(b) || `${a}-${b}` === GERISSEN);
  return (
    <g transform={`translate(${cx} ${cy})`}>
      <circle cx="0" cy="0" r="155" fill={F.petrolDunkel} stroke={F.leise} strokeWidth="3" />
      {VERBINDUNGEN.map(([a, b]) =>
        verloren(a, b) ? (
          <line
            key={`${a}-${b}`}
            x1={ZELLEN[a][0]}
            y1={ZELLEN[a][1]}
            x2={ZELLEN[b][0]}
            y2={ZELLEN[b][1]}
            stroke={F.kupfer}
            strokeWidth="2.5"
            strokeDasharray="3 9"
            strokeLinecap="round"
          />
        ) : (
          <line
            key={`${a}-${b}`}
            x1={ZELLEN[a][0]}
            y1={ZELLEN[a][1]}
            x2={ZELLEN[b][0]}
            y2={ZELLEN[b][1]}
            stroke={F.linie}
            strokeWidth="4"
            strokeLinecap="round"
          />
        ),
      )}
      {ZELLEN.map(([x, y], i) =>
        istTot(i) ? (
          <circle
            key={i}
            cx={x}
            cy={y}
            r="11"
            fill={F.petrolDunkel}
            stroke={F.kupfer}
            strokeWidth="3"
            strokeDasharray="4 4"
          />
        ) : (
          <circle key={i} cx={x} cy={y} r="13" fill={F.petrolHell} stroke={F.linie} strokeWidth="3" />
        ),
      )}
    </g>
  );
}

/** Netz der Nervenzellen: gesund dicht verbunden, bei Demenz ausgedünnt. */
export default function Demenz() {
  return (
    <Zeichnung titel="Zwei Netze aus Nervenzellen: gesund mit vielen dicht verbundenen Zellen, bei Demenz mit abgestorbenen Zellen und abgerissenen Verbindungen">
      <Netz cx={190} cy={310} krank={false} />
      <Netz cx={530} cy={310} krank />

      <Etikett x={190} y={70} anker="middle">
        Gesund
      </Etikett>
      <Unterzeile x={190} y={102} anker="middle">
        dicht vernetzt
      </Unterzeile>
      <Etikett x={530} y={70} anker="middle" farbe={F.kupferHell}>
        Bei Demenz
      </Etikett>
      <Unterzeile x={530} y={102} anker="middle">
        Verbindungen reißen ab
      </Unterzeile>

      <Zeiger von={[150, 512]} nach={[128, 400]} />
      <Etikett x={40} y={542}>
        Nervenzelle
      </Etikett>

      <Zeiger von={[562, 512]} nach={[547, 408]} />
      <Etikett x={690} y={542} anker="end" farbe={F.kupferHell}>
        Zelle abgestorben
      </Etikett>

      <Unterzeile x={360} y={630} anker="middle" farbe={F.linie}>
        Nervenzellen und ihre Verbindungen gehen verloren
      </Unterzeile>
    </Zeichnung>
  );
}
