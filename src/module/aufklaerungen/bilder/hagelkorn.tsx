import { Etikett, F, Unterzeile, Zeichnung, Zeiger } from './bausteine';

type Punkt = [number, number];

/** Lidspalte des offenen Auges, Mitte (0, 0): oben das Oberlid, unten das Unterlid. */
const OBEN: [Punkt, Punkt, Punkt, Punkt] = [[-220, 0], [-130, -125], [130, -125], [220, 0]];
const UNTEN: [Punkt, Punkt, Punkt, Punkt] = [[220, 0], [130, 105], [-130, 105], [-220, 0]];
const LIDSPALTE = 'M-220 0 C-130 -125 130 -125 220 0 C130 105 -130 105 -220 0 Z';

/** Punkt und Richtung auf einer kubischen Kurve. */
function aufKurve([a, b, c, d]: [Punkt, Punkt, Punkt, Punkt], t: number) {
  const u = 1 - t;
  const x = u * u * u * a[0] + 3 * u * u * t * b[0] + 3 * u * t * t * c[0] + t * t * t * d[0];
  const y = u * u * u * a[1] + 3 * u * u * t * b[1] + 3 * u * t * t * c[1] + t * t * t * d[1];
  const dx = 3 * u * u * (b[0] - a[0]) + 6 * u * t * (c[0] - b[0]) + 3 * t * t * (d[0] - c[0]);
  const dy = 3 * u * u * (b[1] - a[1]) + 6 * u * t * (c[1] - b[1]) + 3 * t * t * (d[1] - c[1]);
  const l = Math.hypot(dx, dy);
  return { x, y, tx: dx / l, ty: dy / l };
}

/** Wimpern entlang einer Lidkante, nach außen gebogen. */
function wimpern(kurve: [Punkt, Punkt, Punkt, Punkt], laenge: number, anzahl: number) {
  const striche: string[] = [];
  for (let i = 0; i < anzahl; i++) {
    const t = 0.1 + (0.8 * i) / (anzahl - 1);
    const { x, y, tx, ty } = aufKurve(kurve, t);
    // Normale zeigt vom Auge weg (Kurven laufen so, dass links von der Laufrichtung außen ist).
    const nx = ty;
    const ny = -tx;
    const ex = x + nx * laenge;
    const ey = y + ny * laenge;
    const seite = x < 0 ? -1 : 1;
    striche.push(
      `M${x.toFixed(1)} ${y.toFixed(1)} Q${(x + nx * laenge * 0.6).toFixed(1)} ${(y + ny * laenge * 0.6).toFixed(1)} ${(ex + seite * laenge * 0.35).toFixed(1)} ${(ey).toFixed(1)}`,
    );
  }
  return striche;
}

const WIMPERN_OBEN = wimpern(OBEN, 30, 15);
const WIMPERN_UNTEN = wimpern(UNTEN, 16, 13);

/** Stelle des Hagelkorns: im Oberlid, ein Stück über dem Lidrand. */
const KNOTEN: Punkt = [-50, -164];

/** Ein Auge von vorn mit einem Hagelkorn im Oberlid. */
export default function Hagelkorn() {
  const [kx, ky] = KNOTEN;
  return (
    <Zeichnung titel="Ein Auge von vorn: im Oberlid, ein Stück oberhalb des Wimpernrands, wölbt sich ein runder, fester Knoten ohne Rötung – ein Hagelkorn">
      <defs>
        <clipPath id="hagelkorn-lidspalte">
          <path d={LIDSPALTE} />
        </clipPath>
      </defs>

      <Unterzeile x={360} y={56} anker="middle" farbe={F.linie}>
        im Lid, etwas vom Rand entfernt
      </Unterzeile>

      <g transform="translate(360 400)">
        {/* Augenbraue, Lidfalte oben, Falte unter dem Unterlid */}
        <path d="M-235 -235 C-130 -298 120 -300 240 -222" fill="none" stroke={F.leise} strokeWidth="12" strokeLinecap="round" opacity="0.7" />
        <path d="M-225 -40 C-130 -262 130 -262 225 -40" fill="none" stroke={F.leise} strokeWidth="4" strokeLinecap="round" />
        <path d="M-190 40 C-110 135 110 135 190 40" fill="none" stroke={F.leise} strokeWidth="4" strokeLinecap="round" />

        {/* Augapfel */}
        <path d={LIDSPALTE} fill={F.creme} />
        <g clipPath="url(#hagelkorn-lidspalte)">
          <circle cx="0" cy="-6" r="72" fill={F.petrol} stroke={F.linie} strokeWidth="3" />
          <circle cx="0" cy="-6" r="30" fill={F.tief} />
          <circle cx="-20" cy="-26" r="11" fill={F.creme} />
        </g>
        <path d={LIDSPALTE} fill="none" stroke={F.linie} strokeWidth="4" strokeLinejoin="round" />

        <g fill="none" stroke={F.linie} strokeWidth="3.5" strokeLinecap="round">
          {WIMPERN_OBEN.map((d) => (
            <path key={d} d={d} />
          ))}
          {WIMPERN_UNTEN.map((d) => (
            <path key={d} d={d} />
          ))}
        </g>

        {/* Hagelkorn: runde, feste Wölbung im Lid, nicht gerötet */}
        <ellipse cx={kx + 3} cy={ky + 6} rx="39" ry="36" fill={F.tief} opacity="0.5" />
        <circle cx={kx} cy={ky} r="36" fill={F.petrolHell} stroke={F.linie} strokeWidth="4" />
        <path d={`M${kx - 23} ${ky - 6} A25 25 0 0 1 ${kx - 4} ${ky - 25}`} fill="none" stroke={F.creme} strokeWidth="5" strokeLinecap="round" />
      </g>

      <Zeiger von={[360, 70]} nach={[360 + kx + 4, 400 + ky - 36]} />

      <Etikett x={360} y={636} anker="middle" farbe={F.kupferHell}>
        Hagelkorn
      </Etikett>
      <Unterzeile x={360} y={670} anker="middle">
        fest, kaum schmerzhaft
      </Unterzeile>
    </Zeichnung>
  );
}
