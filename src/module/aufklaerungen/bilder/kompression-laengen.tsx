import { Etikett, F, KONTUR, Unterzeile, Zeichnung } from './bausteine';

type P = [number, number];

/** Glatte Kurve (Catmull-Rom) durch die Punkte, ohne Anfangs-M; beginnt am ersten Punkt. */
function glatt(p: P[]): string {
  let d = '';
  for (let i = 0; i < p.length - 1; i++) {
    const a = p[i - 1] ?? p[i];
    const b = p[i];
    const c = p[i + 1];
    const e = p[i + 2] ?? c;
    const c1: P = [b[0] + (c[0] - a[0]) / 6, b[1] + (c[1] - a[1]) / 6];
    const c2: P = [c[0] - (e[0] - b[0]) / 6, c[1] - (e[1] - b[1]) / 6];
    d += ` C${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${c[0]} ${c[1]}`;
  }
  return d;
}

/** Breite eines Beins (halbe Breite) von der Leiste (y 130) bis zur Sohle (y 585). */
const PROFIL: P[] = [
  [130, 38],
  [200, 35],
  [290, 28],
  [330, 23],
  [362, 25],
  [410, 27],
  [480, 18],
  [530, 11],
  [556, 14],
  [576, 16],
];
const MITTE = 42;
const SOHLE = 585;

/** Unterkörper von vorn: Taille bei y 0, Mitte bei x 0, Füße bei y 585. */
const aussenRechts: P[] = [[56, 0], [74, 50], [80, 100], ...PROFIL.map(([y, w]): P => [MITTE + w, y])];
const innenRechts: P[] = [...PROFIL.map(([y, w]): P => [MITTE - w, y])].reverse();
const KOERPER =
  'M-56 0 L56 0' +
  glatt(aussenRechts) +
  ` C${MITTE + 16} ${SOHLE + 8} ${MITTE - 16} ${SOHLE + 8} ${MITTE - 16} 576` +
  glatt(innenRechts) +
  ` Q0 114 ${-(MITTE - 38)} 130` +
  glatt(innenRechts.map(([x, y]): P => [-x, y]).reverse()) +
  ` C${-MITTE + 16} ${SOHLE + 8} ${-MITTE - 16} ${SOHLE + 8} ${-MITTE - 16} 576` +
  glatt(aussenRechts.map(([x, y]): P => [-x, y]).reverse()) +
  ' Z';

const BEINE = [
  { titel: 'bis unters Knie', zeile: 'reicht meistens', ab: 352, x: 125 },
  { titel: 'Oberschenkel', zeile: 'bis zur Leiste', ab: 158, x: 360 },
  { titel: 'Strumpfhose', zeile: 'mit Bund', ab: 0, x: 595 },
];

export default function KompressionLaengen() {
  return (
    <Zeichnung titel="Drei Längen von Kompressionsstrümpfen an Beinen von vorn: bis unters Knie, bis zum Oberschenkel und als Strumpfhose bis zur Taille; meist reicht Kompressionsklasse 1 oder 2">
      {BEINE.map((b, i) => {
        const id = `kompression-laengen-${i}`;
        return (
          <g key={b.titel}>
            <g transform={`translate(${b.x} 44) scale(0.9)`}>
              <defs>
                <clipPath id={id}>
                  <path d={KOERPER} />
                </clipPath>
              </defs>
              <path d={KOERPER} fill={F.petrol} />
              <g clipPath={`url(#${id})`}>
                <rect x="-100" y={b.ab} width="200" height={SOHLE + 20 - b.ab} fill={F.kupfer} />
                <rect x="-100" y={b.ab} width="200" height="18" fill={F.kupferHell} />
                <line x1="-100" y1={b.ab} x2="100" y2={b.ab} stroke={F.linie} strokeWidth="3" vectorEffect="non-scaling-stroke" />
                <line x1="-100" y1={b.ab + 18} x2="100" y2={b.ab + 18} stroke={F.linie} strokeWidth="2" vectorEffect="non-scaling-stroke" />
              </g>
              {/* Kniescheiben angedeutet */}
              {[-MITTE, MITTE].map((x) => (
                <path key={x} d={`M${x - 12} 318 C${x - 8} 304 ${x + 8} 304 ${x + 12} 318`} fill="none" stroke={F.leise} strokeWidth="3" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
              ))}
              <path d={KOERPER} {...KONTUR} vectorEffect="non-scaling-stroke" />
            </g>
            <Etikett x={b.x} y={616} anker="middle" farbe={F.kupferHell}>
              {b.titel}
            </Etikett>
            <Unterzeile x={b.x} y={646} anker="middle" farbe={F.linie}>
              {b.zeile}
            </Unterzeile>
          </g>
        );
      })}
      <Unterzeile x={360} y={696} anker="middle">
        Stärke: meist reicht Klasse 1 oder 2
      </Unterzeile>
    </Zeichnung>
  );
}
