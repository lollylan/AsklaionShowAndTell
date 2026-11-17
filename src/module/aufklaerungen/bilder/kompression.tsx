import { Etikett, F, KONTUR, Pfeil, Zeichnung } from './bausteine';

/**
 * Unterschenkel von der Seite, vom Knie bis zum Fuß, Zehen zeigen nach rechts.
 * Waden-Rückseite links, Schienbein rechts. Rahmen etwa x 145–520, y 110–650.
 */
export const BEIN_RAND =
  'M200 110 C160 220 145 310 180 410 C200 470 230 505 228 560 C222 600 212 640 236 650 ' +
  'L505 650 C528 650 534 624 514 612 C450 585 380 560 330 535 C305 520 300 500 302 470 ' +
  'C306 380 314 250 312 110';

/** Hinterer und vorderer Beinrand auf einer Höhe y (grob, für die Strumpfrolle). */
const RAENDER: [number, number, number][] = [
  [110, 200, 312],
  [200, 170, 312],
  [260, 160, 310],
  [330, 157, 308],
  [400, 176, 305],
  [470, 205, 302],
  [520, 222, 314],
  [540, 226, 340],
];

function raender(y: number): [number, number] {
  for (let i = 1; i < RAENDER.length; i++) {
    const [y1, h1, v1] = RAENDER[i];
    const [y0, h0, v0] = RAENDER[i - 1];
    if (y <= y1) {
      const t = (y - y0) / (y1 - y0);
      return [h0 + (h1 - h0) * t, v0 + (v1 - v0) * t];
    }
  }
  const l = RAENDER[RAENDER.length - 1];
  return [l[1], l[2]];
}

/** Zusammengerollter Strumpfrand quer über dem Bein auf Höhe y. */
function Rolle({ y }: { y: number }) {
  const [h, v] = raender(y);
  const x = h - 12;
  const b = v - h + 24;
  return (
    <g>
      <rect x={x} y={y - 18} width={b} height={36} rx={18} fill={F.kupfer} stroke={F.linie} strokeWidth="4" vectorEffect="non-scaling-stroke" />
      <path d={`M${x + 16} ${y - 5} L${x + b - 16} ${y - 5} M${x + 16} ${y + 7} L${x + b - 16} ${y + 7}`} stroke={F.kupferHell} strokeWidth="3" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
    </g>
  );
}

/**
 * Unterschenkel mit Kompressionsstrumpf, auch für die Anzieh-Schritte.
 * ab = Höhe, ab der der Strumpf das Bein bedeckt; rolle = Höhe des aufgerollten Rands;
 * nurStrumpf = nur der Strumpf ohne Bein (umgestülpt bis zur Ferse).
 */
export function StrumpfBein({
  id,
  ab,
  rolle,
  nurStrumpf = false,
  rand = false,
}: {
  id: string;
  ab: number;
  rolle?: number;
  nurStrumpf?: boolean;
  rand?: boolean;
}) {
  const strich = { ...KONTUR, vectorEffect: 'non-scaling-stroke' } as const;
  return (
    <g>
      <defs>
        <clipPath id={`${id}-bein`}>
          <path d={`${BEIN_RAND} Z`} />
        </clipPath>
        <clipPath id={`${id}-strumpf`}>
          <rect x="0" y={ab} width="720" height="720" />
        </clipPath>
      </defs>
      {!nurStrumpf && <path d={`${BEIN_RAND} Z`} fill={F.petrol} />}
      <g clipPath={`url(#${id}-bein)`}>
        <g clipPath={`url(#${id}-strumpf)`}>
          <rect x="100" y={ab} width="500" height={700 - ab} fill={F.kupfer} />
          {Array.from({ length: 14 }, (_, i) => ab + 36 + i * 40)
            .filter((y) => y < 640)
            .map((y) => (
              <line key={y} x1="100" y1={y} x2="600" y2={y + 8} stroke={F.kupferHell} strokeWidth="2" strokeOpacity="0.35" />
            ))}
          {rand && <rect x="100" y={ab} width="500" height="24" fill={F.kupferHell} />}
        </g>
      </g>
      <g clipPath={nurStrumpf ? `url(#${id}-strumpf)` : undefined}>
        <path d={BEIN_RAND} {...strich} />
      </g>
      {rand && (
        <path
          d={`M${raender(ab)[0]} ${ab} L${raender(ab)[1]} ${ab} M${raender(ab + 24)[0]} ${ab + 24} L${raender(ab + 24)[1]} ${ab + 24}`}
          stroke={F.linie}
          strokeWidth="3"
          vectorEffect="non-scaling-stroke"
        />
      )}
      {rolle !== undefined && <Rolle y={rolle} />}
    </g>
  );
}

export default function Kompression() {
  return (
    <Zeichnung titel="Unterschenkel von der Seite mit Kompressionsstrumpf bis unters Knie: der Strumpf drückt am Knöchel am stärksten und nach oben hin weniger, so fließt das Blut leichter zum Herzen zurück">
      <StrumpfBein id="kompression" ab={190} rand />

      {/* Druckpfeile: am Knöchel groß, nach oben kleiner */}
      <Pfeil d="M118 262 L146 262" farbe={F.linie} breite={3} />
      <Pfeil d="M354 262 L328 262" farbe={F.linie} breite={3} />
      <Pfeil d="M100 392 L158 392" farbe={F.linie} breite={5} />
      <Pfeil d="M378 392 L324 392" farbe={F.linie} breite={5} />
      <Pfeil d="M96 512 L190 512" farbe={F.kupferHell} breite={7} />
      <Pfeil d="M410 492 L322 492" farbe={F.kupferHell} breite={7} />

      {/* Blut fließt nach oben */}
      <Pfeil d="M262 600 C252 490 232 390 240 250" farbe={F.linie} breite={6} />

      <Etikett x={40} y={62}>
        Kompressionsstrumpf
      </Etikett>
      <Etikett x={380} y={150}>
        Blut fließt leichter
      </Etikett>
      <Etikett x={380} y={182}>
        zum Herzen
      </Etikett>
      <Etikett x={380} y={272}>
        nach oben weniger
      </Etikett>
      <Etikett x={430} y={480} farbe={F.kupferHell}>
        am Knöchel
      </Etikett>
      <Etikett x={430} y={512} farbe={F.kupferHell}>
        am stärksten
      </Etikett>
    </Zeichnung>
  );
}
