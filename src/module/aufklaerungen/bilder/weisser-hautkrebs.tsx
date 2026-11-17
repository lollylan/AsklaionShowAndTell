import { Etikett, F, KONTUR, Unterzeile, Zeichnung } from './bausteine';

const LX = 380; // Mitte der Lupen
const LR = 80; // Radius der Lupen
const ZEILEN = [150, 360, 570];
const TX = 480; // Beginn der Beschriftung

/** Raue Stelle: unregelmäßiger Fleck mit kleinen Schuppen. */
function Vorstufe({ y }: { y: number }) {
  return (
    <g>
      <path
        d={`M${LX - 44} ${y - 6} C${LX - 40} ${y - 34} ${LX - 6} ${y - 40} ${LX + 18} ${y - 30} C${LX + 46} ${y - 20} ${LX + 50} ${y + 12} ${LX + 30} ${y + 28} C${LX + 8} ${y + 44} ${LX - 30} ${y + 36} ${LX - 42} ${y + 16} Z`}
        fill={F.kupfer}
      />
      <g fill="none" stroke={F.creme} strokeWidth="3" strokeLinecap="round">
        {[
          [-24, -14],
          [4, -20],
          [24, -4],
          [-18, 10],
          [10, 16],
          [-2, -2],
        ].map(([dx, dy]) => (
          <path key={`${dx}-${dy}`} d={`M${LX + dx - 7} ${y + dy} l7 -5 l7 5`} />
        ))}
      </g>
    </g>
  );
}

/** Glasig glänzendes Knötchen mit feinen Äderchen. */
function Basalzellkrebs({ y }: { y: number }) {
  return (
    <g>
      <circle cx={LX} cy={y} r="38" fill={F.kupferHell} stroke={F.creme} strokeWidth="4" />
      <path d={`M${LX - 22} ${y - 20} A30 30 0 0 1 ${LX + 6} ${y - 30}`} fill="none" stroke={F.creme} strokeWidth="5" strokeLinecap="round" />
      <g fill="none" stroke={F.kupfer} strokeWidth="3" strokeLinecap="round">
        <path d={`M${LX - 26} ${y + 6} Q${LX - 10} ${y - 2} ${LX + 4} ${y + 10} M${LX - 10} ${y - 1} l-4 -12`} />
        <path d={`M${LX + 26} ${y - 6} Q${LX + 14} ${y + 12} ${LX + 18} ${y + 26} M${LX + 17} ${y + 10} l10 4`} />
      </g>
    </g>
  );
}

/** Raues, krustiges Knötchen. */
function Stachelzellkrebs({ y }: { y: number }) {
  return (
    <g>
      <path
        d={`M${LX - 44} ${y + 8} C${LX - 46} ${y - 26} ${LX - 18} ${y - 44} ${LX + 8} ${y - 40} C${LX + 40} ${y - 36} ${LX + 50} ${y - 6} ${LX + 42} ${y + 18} C${LX + 34} ${y + 42} ${LX - 30} ${y + 44} ${LX - 44} ${y + 8} Z`}
        fill={F.kupfer}
        stroke={F.kupferHell}
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path
        d={`M${LX - 22} ${y - 4} L${LX - 10} ${y - 20} L${LX + 6} ${y - 14} L${LX + 22} ${y - 22} L${LX + 26} ${y} L${LX + 10} ${y + 14} L${LX - 14} ${y + 12} Z`}
        fill={F.kupferHell}
        stroke={F.creme}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path d={`M${LX - 8} ${y - 8} l10 6 l8 -8 M${LX - 4} ${y + 6} l12 -2`} fill="none" stroke={F.kupfer} strokeWidth="3" strokeLinecap="round" />
    </g>
  );
}

/** Kopf von vorn mit Flecken an den Sonnenstellen, rechts drei Lupen: Vorstufe, Basalzellkrebs, Stachelzellkrebs. */
export default function WeisserHautkrebs() {
  const hx = 170;
  const hy = 380;
  const formen = [Vorstufe, Basalzellkrebs, Stachelzellkrebs];
  return (
    <Zeichnung titel="Kopf von vorn mit Flecken an Glatze, Stirn, Nase, Ohr und Unterlippe, den Stellen mit viel Sonne. Daneben drei vergrößerte Hautstellen: die Vorstufe als raue, schuppige Rötung, der Basalzellkrebs als glasiges Knötchen mit Äderchen, der Stachelzellkrebs als krustiges Knötchen">
      <defs>
        <clipPath id="weisser-hautkrebs-lupen">
          {ZEILEN.map((y) => (
            <circle key={y} cx={LX} cy={y} r={LR} />
          ))}
        </clipPath>
      </defs>

      {/* Sonne */}
      <circle cx="70" cy="110" r="28" fill="none" stroke={F.kupferHell} strokeWidth="4" />
      <g stroke={F.kupferHell} strokeWidth="4" strokeLinecap="round">
        {Array.from({ length: 8 }, (_, i) => {
          const w = (i / 8) * Math.PI * 2;
          return (
            <line
              key={i}
              x1={70 + Math.cos(w) * 40}
              y1={110 + Math.sin(w) * 40}
              x2={70 + Math.cos(w) * 54}
              y2={110 + Math.sin(w) * 54}
            />
          );
        })}
      </g>

      {/* Hals und Kopf */}
      <path d={`M${hx - 50} ${hy + 120} L${hx - 54} ${hy + 230} M${hx + 50} ${hy + 120} L${hx + 54} ${hy + 230}`} {...KONTUR} />
      <ellipse cx={hx - 104} cy={hy} rx="18" ry="34" fill={F.petrol} stroke={F.linie} strokeWidth="4" />
      <ellipse cx={hx + 104} cy={hy} rx="18" ry="34" fill={F.petrol} stroke={F.linie} strokeWidth="4" />
      <ellipse cx={hx} cy={hy} rx="100" ry="135" fill={F.petrol} stroke={F.linie} strokeWidth="4" />

      {/* Gesicht */}
      <path d={`M${hx - 52} ${hy - 12} q14 -10 28 0 M${hx + 24} ${hy - 12} q14 -10 28 0`} {...KONTUR} strokeWidth="3" />
      <path d={`M${hx} ${hy - 10} L${hx + 12} ${hy + 40} Q${hx} ${hy + 48} ${hx - 10} ${hy + 42}`} {...KONTUR} strokeWidth="3" />
      <path d={`M${hx - 34} ${hy + 76} Q${hx} ${hy + 66} ${hx + 34} ${hy + 76} Q${hx} ${hy + 96} ${hx - 34} ${hy + 76} Z`} fill={F.petrolHell} stroke={F.linie} strokeWidth="3" strokeLinejoin="round" />

      {/* Sonnenstellen */}
      <g fill={F.kupfer}>
        <ellipse cx={hx - 20} cy={hy - 118} rx="16" ry="9" />
        <ellipse cx={hx + 26} cy={hy - 106} rx="11" ry="7" />
        <ellipse cx={hx - 46} cy={hy - 62} rx="12" ry="8" />
        <circle cx={hx + 8} cy={hy + 34} r="8" />
        <circle cx={hx + 104} cy={hy - 10} r="7" />
        <ellipse cx={hx + 16} cy={hy + 84} rx="9" ry="5" />
      </g>

      {/* Lupen */}
      <g clipPath="url(#weisser-hautkrebs-lupen)">
        {ZEILEN.map((y) => (
          <circle key={y} cx={LX} cy={y} r={LR} fill={F.petrolHell} />
        ))}
      </g>
      {formen.map((Form, i) => (
        <Form key={ZEILEN[i]} y={ZEILEN[i]} />
      ))}
      {ZEILEN.map((y) => (
        <circle key={y} cx={LX} cy={y} r={LR} {...KONTUR} />
      ))}

      <Etikett x={TX} y={ZEILEN[0] - 6} farbe={F.kupferHell}>
        Vorstufe
      </Etikett>
      <Unterzeile x={TX} y={ZEILEN[0] + 26}>
        rau wie Sandpapier
      </Unterzeile>
      <Etikett x={TX} y={ZEILEN[1] - 6} farbe={F.kupferHell}>
        Basalzellkrebs
      </Etikett>
      <Unterzeile x={TX} y={ZEILEN[1] + 26}>
        glasiges Knötchen
      </Unterzeile>
      <Etikett x={TX} y={ZEILEN[2] - 6} farbe={F.kupferHell}>
        Stachelzellkrebs
      </Etikett>
      <Unterzeile x={TX} y={ZEILEN[2] + 26}>
        krustig, wächst
      </Unterzeile>
    </Zeichnung>
  );
}
