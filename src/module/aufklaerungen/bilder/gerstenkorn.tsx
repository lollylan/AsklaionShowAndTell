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

/** Stelle des Gerstenkorns am Unterlidrand. */
const KORN = aufKurve(UNTEN, 0.38);

/** Ein Auge von vorn mit einem Gerstenkorn am Wimpernrand des Unterlids. */
export default function Gerstenkorn() {
  const kx = KORN.x;
  const ky = KORN.y;
  return (
    <Zeichnung titel="Ein Auge von vorn: am Rand des Unterlids, direkt an der Wurzel der Wimpern, sitzt eine rote, geschwollene Beule mit einem gelblichen Eiterpunkt – ein Gerstenkorn">
      <defs>
        <clipPath id="gerstenkorn-lidspalte">
          <path d={LIDSPALTE} />
        </clipPath>
      </defs>

      <Etikett x={360} y={58} anker="middle" farbe={F.kupferHell}>
        Gerstenkorn
      </Etikett>
      <Unterzeile x={360} y={90} anker="middle">
        rot, geschwollen, schmerzhaft
      </Unterzeile>

      <g transform="translate(360 380)">
        {/* Augenbraue, Lidfalte oben, Falte unter dem Unterlid */}
        <path d="M-235 -205 C-130 -268 120 -270 240 -192" fill="none" stroke={F.leise} strokeWidth="12" strokeLinecap="round" opacity="0.7" />
        <path d="M-225 -40 C-130 -225 130 -225 225 -40" fill="none" stroke={F.leise} strokeWidth="4" strokeLinecap="round" />
        <path d="M-190 40 C-110 135 110 135 190 40" fill="none" stroke={F.leise} strokeWidth="4" strokeLinecap="round" />

        {/* Rötung rund um das Gerstenkorn */}
        <ellipse cx={kx} cy={ky + 22} rx="74" ry="52" fill={F.kupfer} opacity="0.75" />

        {/* Augapfel */}
        <path d={LIDSPALTE} fill={F.creme} />
        <g clipPath="url(#gerstenkorn-lidspalte)">
          <circle cx="0" cy="-6" r="72" fill={F.petrol} stroke={F.linie} strokeWidth="3" />
          <circle cx="0" cy="-6" r="30" fill={F.tief} />
          <circle cx="-20" cy="-26" r="11" fill={F.creme} />
        </g>
        <path d={LIDSPALTE} fill="none" stroke={F.linie} strokeWidth="4" strokeLinejoin="round" />

        {/* Gerstenkorn: geschwollene Beule am Lidrand */}
        <ellipse cx={kx} cy={ky + 22} rx="48" ry="34" fill={F.kupfer} stroke={F.linie} strokeWidth="4" />

        <g fill="none" stroke={F.linie} strokeWidth="3.5" strokeLinecap="round">
          {WIMPERN_OBEN.map((d) => (
            <path key={d} d={d} />
          ))}
          {WIMPERN_UNTEN.map((d) => (
            <path key={d} d={d} />
          ))}
        </g>

        {/* Eiterpunkt an der Wimpernwurzel */}
        <circle cx={kx} cy={ky + 12} r="14" fill={F.kupferHell} stroke={F.creme} strokeWidth="3" />
        <circle cx={kx - 3} cy={ky + 9} r="6" fill={F.creme} />
      </g>

      <Zeiger von={[520, 590]} nach={[360 + kx + 16, 380 + ky + 22]} />
      <Etikett x={520} y={624} anker="middle">
        Eiterpunkt
      </Etikett>

      <Zeiger von={[220, 590]} nach={[360 + kx - 52, 380 + ky + 2]} />
      <Etikett x={220} y={624} anker="middle">
        am Wimpernrand
      </Etikett>
    </Zeichnung>
  );
}
