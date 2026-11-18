import { Etikett, F, Pfeil, Unterzeile, Zeichnung } from './bausteine';

type Punkt = [number, number];

/** Geschlossenes Auge, Mitte (0, 0): die Lidkante als nach unten gebogene Linie. */
const LIDKANTE: [Punkt, Punkt, Punkt, Punkt] = [[-130, 0], [-70, 34], [70, 34], [130, 0]];
const LIDKANTE_D = 'M-130 0 C-70 34 70 34 130 0';

function aufKurve([a, b, c, d]: [Punkt, Punkt, Punkt, Punkt], t: number) {
  const u = 1 - t;
  const x = u * u * u * a[0] + 3 * u * u * t * b[0] + 3 * u * t * t * c[0] + t * t * t * d[0];
  const y = u * u * u * a[1] + 3 * u * u * t * b[1] + 3 * u * t * t * c[1] + t * t * t * d[1];
  const dx = 3 * u * u * (b[0] - a[0]) + 6 * u * t * (c[0] - b[0]) + 3 * t * t * (d[0] - c[0]);
  const dy = 3 * u * u * (b[1] - a[1]) + 6 * u * t * (c[1] - b[1]) + 3 * t * t * (d[1] - c[1]);
  const l = Math.hypot(dx, dy);
  return { x, y, tx: dx / l, ty: dy / l };
}

/** Wimpern hängen vom geschlossenen Lid nach unten. */
const WIMPERN: string[] = [];
for (let i = 0; i < 11; i++) {
  const t = 0.12 + (0.76 * i) / 10;
  const { x, y, tx, ty } = aufKurve(LIDKANTE, t);
  const nx = -ty;
  const ny = tx;
  const seite = x < 0 ? -1 : 1;
  WIMPERN.push(
    `M${x.toFixed(1)} ${y.toFixed(1)} Q${(x + nx * 12).toFixed(1)} ${(y + ny * 12).toFixed(1)} ${(x + nx * 20 + seite * 7).toFixed(1)} ${(y + ny * 20 - 3).toFixed(1)}`,
  );
}

function GeschlossenesAuge() {
  return (
    <g>
      <path d="M-130 0 C-90 -66 90 -66 130 0" fill="none" stroke={F.leise} strokeWidth="4" strokeLinecap="round" />
      <path d="M-96 52 C-50 80 50 80 96 52" fill="none" stroke={F.leise} strokeWidth="4" strokeLinecap="round" />
      <path d={LIDKANTE_D} fill="none" stroke={F.linie} strokeWidth="4" strokeLinecap="round" />
      <g fill="none" stroke={F.linie} strokeWidth="3.5" strokeLinecap="round">
        {WIMPERN.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
    </g>
  );
}

/** Wärmewelle, steigt nach oben. */
function Welle({ x, y }: { x: number; y: number }) {
  return (
    <path
      d={`M${x} ${y} q-9 -10 0 -20 q9 -10 0 -20`}
      fill="none"
      stroke={F.kupferHell}
      strokeWidth="5"
      strokeLinecap="round"
    />
  );
}

/** Drei Schritte der Lidrandpflege untereinander: Wärme, Massage, Reinigen. */
export default function Lidrandpflege() {
  return (
    <Zeichnung titel="Drei Schritte der Lidrandpflege untereinander: erstens ein warmer Waschlappen auf dem geschlossenen Auge, zweitens mit dem Finger das Oberlid nach unten und das Unterlid nach oben zum Wimpernrand streichen, drittens den Lidrand mit einem Wattestäbchen sanft säubern">
      {/* Trennlinien zwischen den Schritten */}
      <path d="M40 240 H680 M40 480 H680" stroke={F.leise} strokeWidth="2" strokeLinecap="round" opacity="0.4" />

      {/* 1 Wärme: Waschlappen auf dem geschlossenen Auge */}
      <g transform="translate(200 136)">
        <GeschlossenesAuge />
        <rect x="-150" y="-46" width="300" height="96" rx="20" fill={F.petrolHell} opacity="0.9" stroke={F.linie} strokeWidth="4" />
        <path d="M-120 -16 H120 M-120 16 H120" stroke={F.leise} strokeWidth="3" strokeLinecap="round" strokeDasharray="2 10" />
        <Welle x={-70} y={-62} />
        <Welle x={0} y={-62} />
        <Welle x={70} y={-62} />
      </g>
      <Etikett x={410} y={112}>
        1 Wärme
      </Etikett>
      <Unterzeile x={410} y={146}>
        warmer Waschlappen
      </Unterzeile>
      <Unterzeile x={410} y={176}>
        5–10 Minuten
      </Unterzeile>

      {/* 2 Massage: zum Wimpernrand streichen */}
      <g transform="translate(200 370)">
        <GeschlossenesAuge />
        <Pfeil d="M-70 -84 L-70 -34" farbe={F.kupferHell} breite={5} />
        <Pfeil d="M0 -90 L0 -38" farbe={F.kupferHell} breite={5} />
        <Pfeil d="M-50 100 L-50 58" farbe={F.kupferHell} breite={5} />
        <Pfeil d="M30 100 L30 58" farbe={F.kupferHell} breite={5} />
        {/* Finger auf dem Oberlid */}
        <g transform="translate(84 -30) rotate(50)">
          <path d="M-23 -128 V-10 A23 23 0 0 0 23 -10 V-128" fill={F.creme} stroke={F.linie} strokeWidth="4" strokeLinejoin="round" />
          <rect x="-13" y="-36" width="26" height="28" rx="10" fill="none" stroke={F.leise} strokeWidth="3" />
          <path d="M-14 -84 Q0 -78 14 -84" fill="none" stroke={F.leise} strokeWidth="3" strokeLinecap="round" />
        </g>
      </g>
      <Etikett x={410} y={352}>
        2 Massage
      </Etikett>
      <Unterzeile x={410} y={386}>
        zum Wimpernrand streichen
      </Unterzeile>

      {/* 3 Reinigen: Wattestäbchen am Lidrand */}
      <g transform="translate(200 594)">
        <GeschlossenesAuge />
        <g transform="translate(36 34) rotate(34)">
          <line x1="20" y1="0" x2="124" y2="0" stroke={F.linie} strokeWidth="6" strokeLinecap="round" />
          <ellipse cx="6" cy="0" rx="24" ry="13" fill={F.creme} stroke={F.linie} strokeWidth="3" />
        </g>
      </g>
      <Etikett x={410} y={584}>
        3 Reinigen
      </Etikett>
      <Unterzeile x={410} y={618}>
        Lidrand sanft säubern
      </Unterzeile>
    </Zeichnung>
  );
}
