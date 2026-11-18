import { Etikett, F, KONTUR, Pfeil, Unterzeile, Zeichnung } from './bausteine';

const STRAHLEN = Array.from({ length: 8 }, (_, i) => (i * Math.PI) / 4 + Math.PI / 8);

/** Höhe der beiden Reihen. */
const D = 200;
const B = 520;

/** Knochen waagrecht um (cx, cy): Schaft mit je zwei runden Enden. */
function knochen(cx: number, cy: number): string {
  const a = cx - 40;
  const b = cx + 40;
  const r = 15;
  return `M${a} ${cy - 10} L${b} ${cy - 10} A${r} ${r} 0 1 1 ${b + 18} ${cy - 22} A${r} ${r} 0 1 1 ${b + 18} ${cy + 22} A${r} ${r} 0 1 1 ${b} ${cy + 10} L${a} ${cy + 10} A${r} ${r} 0 1 1 ${a - 18} ${cy + 22} A${r} ${r} 0 1 1 ${a - 18} ${cy - 22} A${r} ${r} 0 1 1 ${a} ${cy - 10} Z`;
}

/** Kapsel mit dem Namen des Vitamins. */
function Kapsel({ x, y, breite, children }: { x: number; y: number; breite: number; children: string }) {
  return (
    <g>
      <rect x={x} y={y - 36} width={breite} height="72" rx="36" fill={F.petrol} stroke={F.linie} strokeWidth="4" />
      <Etikett x={x + breite / 2} y={y + 9} anker="middle">
        {children}
      </Etikett>
    </g>
  );
}

/** Überblick: woher Vitamin D und Vitamin B12 kommen und wofür der Körper sie braucht. */
export default function Vitaminwerte() {
  return (
    <Zeichnung titel="Zwei Reihen: oben scheint die Sonne auf die Haut, die Haut bildet Vitamin D, und Vitamin D sorgt für feste Knochen und Muskeln; unten liefern Ei, Milch und Fisch Vitamin B12, das der Körper für die Blutbildung und die Nerven braucht">
      {/* ---------- Vitamin D ---------- */}
      <Unterzeile x={40} y={96}>
        Sonne auf der Haut
      </Unterzeile>

      {/* Sonne */}
      <g transform={`translate(78 ${D})`}>
        {STRAHLEN.map((w) => (
          <line
            key={w}
            x1={Math.cos(w) * 44}
            y1={Math.sin(w) * 44}
            x2={Math.cos(w) * 60}
            y2={Math.sin(w) * 60}
            stroke={F.kupferHell}
            strokeWidth="5"
            strokeLinecap="round"
          />
        ))}
        <circle r="34" fill={F.kupferHell} stroke={F.linie} strokeWidth="4" />
      </g>

      {/* Haut als kleines Stück im Schnitt */}
      <path d="M168 186 Q200 176 232 186 T296 186 L296 234 L168 234 Z" fill={F.kupferHell} stroke={F.leise} strokeWidth="3" strokeLinejoin="round" />
      <path d="M168 186 Q200 176 232 186 T296 186 L296 204 Q264 214 232 204 Q200 194 168 204 Z" fill={F.creme} />
      <path d="M168 186 Q200 176 232 186 T296 186" {...KONTUR} />
      <Pfeil d={`M144 ${D - 18} L162 ${D - 14}`} farbe={F.kupferHell} breite={4} />

      <Pfeil d={`M306 ${D} L336 ${D}`} />
      <Kapsel x={346} y={D} breite={164}>
        Vitamin D
      </Kapsel>
      <Pfeil d={`M518 ${D} L538 ${D}`} />

      {/* Knochen */}
      <path d={knochen(626, D)} fill={F.creme} stroke={F.leise} strokeWidth="4" strokeLinejoin="round" />
      <Unterzeile x={690} y={D + 82} anker="end">
        feste Knochen und Muskeln
      </Unterzeile>

      {/* Trennlinie */}
      <line x1="40" y1="350" x2="680" y2="350" stroke={F.leise} strokeWidth="2" strokeOpacity="0.5" strokeDasharray="2 10" strokeLinecap="round" />

      {/* ---------- Vitamin B12 ---------- */}
      <Unterzeile x={40} y={416}>
        tierische Lebensmittel
      </Unterzeile>

      {/* Ei */}
      <ellipse cx="62" cy={B} rx="22" ry="30" fill={F.creme} stroke={F.linie} strokeWidth="4" />
      {/* Milch */}
      <path
        d={`M102 ${B + 34} L102 ${B - 18} L112 ${B - 34} L136 ${B - 34} L146 ${B - 18} L146 ${B + 34} Z`}
        fill={F.creme}
        stroke={F.linie}
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path d={`M102 ${B - 18} L146 ${B - 18}`} stroke={F.leise} strokeWidth="3" />
      <rect x="110" y={B - 4} width="28" height="20" rx="4" fill={F.petrolHell} />
      {/* Fisch */}
      <path
        d={`M166 ${B} Q192 ${B - 26} 218 ${B} Q192 ${B + 26} 166 ${B} Z`}
        fill={F.petrolHell}
        stroke={F.linie}
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path d={`M216 ${B} L236 ${B - 16} L236 ${B + 16} Z`} fill={F.petrolHell} stroke={F.linie} strokeWidth="4" strokeLinejoin="round" />
      <circle cx="180" cy={B - 5} r="3.5" fill={F.tief} />

      <Pfeil d={`M250 ${B} L278 ${B}`} />
      <Kapsel x={288} y={B} breite={196}>
        Vitamin B12
      </Kapsel>
      <Pfeil d={`M494 ${B} L522 ${B}`} />

      {/* Blutkörperchen */}
      <circle cx="566" cy={B} r="30" fill={F.kupfer} stroke={F.linie} strokeWidth="4" />
      <circle cx="566" cy={B} r="12" fill="none" stroke={F.kupferHell} strokeWidth="4" />
      {/* Nervenfaser mit Verzweigung */}
      <path d={`M606 ${B} L676 ${B}`} {...KONTUR} stroke={F.creme} strokeWidth="5" />
      <path d={`M676 ${B} L692 ${B - 16} M676 ${B} L692 ${B + 16}`} {...KONTUR} stroke={F.creme} strokeWidth="4" />
      <rect x="614" y={B - 12} width="22" height="24" rx="11" fill={F.petrolHell} stroke={F.linie} strokeWidth="3" />
      <rect x="644" y={B - 12} width="22" height="24" rx="11" fill={F.petrolHell} stroke={F.linie} strokeWidth="3" />
      <Unterzeile x={690} y={B + 82} anker="end">
        Blutbildung und Nerven
      </Unterzeile>
    </Zeichnung>
  );
}
