import { Etikett, F, Pfeil, Unterzeile, Zeichnung } from './bausteine';

/** Geschlossene, weich gerundete Form um (cx, cy); radius(w) gibt den Abstand je Winkel. */
function form(cx: number, cy: number, radius: (w: number) => number, schritte = 36): string {
  const p = Array.from({ length: schritte }, (_, i) => {
    const w = (i / schritte) * Math.PI * 2;
    const r = radius(w);
    return [cx + Math.cos(w) * r, cy + Math.sin(w) * r];
  });
  const mitte = (a: number[], b: number[]) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
  const start = mitte(p[schritte - 1], p[0]);
  let d = `M${start[0].toFixed(1)} ${start[1].toFixed(1)}`;
  for (let i = 0; i < schritte; i++) {
    const m = mitte(p[i], p[(i + 1) % schritte]);
    d += ` Q${p[i][0].toFixed(1)} ${p[i][1].toFixed(1)} ${m[0].toFixed(1)} ${m[1].toFixed(1)}`;
  }
  return `${d} Z`;
}

const HARMLOS = { fill: F.petrolHell, stroke: F.linie, strokeWidth: 3 };
const AUFFAELLIG = { fill: F.kupfer, stroke: F.linie, strokeWidth: 3, strokeLinejoin: 'round' as const };

const XH = 400; // Spalte harmlos
const XA = 590; // Spalte auffällig
const ZEILEN = [150, 266, 382, 498, 614];

/** ABCDE-Regel: je Zeile links ein harmloses Muttermal (rund, gleichmäßig), rechts ein auffälliges. */
export default function MelanomAbcde() {
  const [ya, yb, yc, yd, ye] = ZEILEN;
  return (
    <Zeichnung titel="ABCDE-Regel: In fünf Zeilen steht links ein harmloses rundes, gleichmäßiges Muttermal, rechts ein auffälliges – ungleichmäßig geformt, unscharf begrenzt, mehrfarbig, groß und sich verändernd">
      <Etikett x={XH} y={66} anker="middle">
        harmlos
      </Etikett>
      <Etikett x={XA} y={66} anker="middle" farbe={F.kupferHell}>
        auffällig
      </Etikett>

      {/* Trennlinien zwischen den Zeilen */}
      {ZEILEN.slice(1).map((y) => (
        <line key={y} x1="40" y1={y - 58} x2="680" y2={y - 58} stroke={F.leise} strokeWidth="1.5" strokeOpacity="0.4" />
      ))}

      {/* Buchstaben und Stichwort */}
      {[
        ['A', 'Asymmetrie'],
        ['B', 'Begrenzung'],
        ['C', 'Colorit'],
        ['D', 'Durchmesser'],
        ['E', 'Entwicklung'],
      ].map(([b, wort], i) => (
        <g key={b}>
          <text x="40" y={ZEILEN[i] + 15} fontSize="44" fontWeight="700" fill={F.kupferHell}>
            {b}
          </text>
          <Etikett x={88} y={ZEILEN[i] + 9}>
            {wort}
          </Etikett>
        </g>
      ))}

      {/* A: rund gegen ungleich */}
      <circle cx={XH} cy={ya} r="32" {...HARMLOS} />
      <path d={form(XA, ya, (w) => 34 + 14 * Math.cos(w) + 6 * Math.sin(2 * w))} {...AUFFAELLIG} />

      {/* B: glatter gegen ausgefranster Rand */}
      <circle cx={XH} cy={yb} r="32" {...HARMLOS} />
      <path
        d={form(XA, yb, (w) => 36 + 4 * Math.sin(9 * w) + 3 * Math.cos(14 * w) + 3 * Math.sin(2 * w), 72)}
        fill={F.kupfer}
        fillOpacity="0.5"
      />
      <path d={form(XA, yb, (w) => 29 + 4 * Math.sin(9 * w) + 3 * Math.cos(14 * w) + 3 * Math.sin(2 * w), 72)} {...AUFFAELLIG} />

      {/* C: eine Farbe gegen mehrere */}
      <circle cx={XH} cy={yc} r="32" {...HARMLOS} />
      <path d={form(XA, yc, (w) => 38 + 5 * Math.sin(3 * w))} {...AUFFAELLIG} />
      <path d={form(XA - 12, yc - 8, (w) => 14 + 3 * Math.sin(4 * w))} fill={F.tief} />
      <path d={form(XA + 16, yc + 10, (w) => 11 + 2 * Math.cos(3 * w))} fill={F.kupferHell} />
      <circle cx={XA + 14} cy={yc - 18} r="6" fill={F.leise} />

      {/* D: klein gegen groß */}
      <circle cx={XH} cy={yd} r="20" {...HARMLOS} />
      <circle cx={XA} cy={yd} r="44" {...AUFFAELLIG} />
      <Unterzeile x={88} y={yd + 40}>
        größer als 5 mm
      </Unterzeile>

      {/* E: bleibt gleich gegen wächst und verändert sich */}
      <circle cx={XH} cy={ye} r="28" {...HARMLOS} />
      <path d={form(XA, ye, (w) => 40 + 6 * Math.sin(3 * w + 1))} {...AUFFAELLIG} />
      <circle cx={XA} cy={ye} r="22" fill="none" stroke={F.creme} strokeWidth="3" strokeDasharray="6 6" />
      <Pfeil d={`M${XA + 50} ${ye - 30} L${XA + 70} ${ye - 46}`} farbe={F.kupferHell} breite={4} />
      <Pfeil d={`M${XA + 50} ${ye + 30} L${XA + 70} ${ye + 46}`} farbe={F.kupferHell} breite={4} />
    </Zeichnung>
  );
}
