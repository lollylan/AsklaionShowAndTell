import { Etikett, F, Unterzeile, Zeichnung } from './bausteine';

const ZUNGE =
  'M-115 -150 L115 -150 C132 -40 124 70 74 135 C42 172 -42 172 -74 135 C-124 70 -132 -40 -115 -150 Z';

/** Geschmackspapillen als Punkte, versetzt über die Zunge: [x, y]. */
const PAPILLEN: [number, number][] = [];
for (let reihe = 0; reihe < 11; reihe++) {
  for (let spalte = 0; spalte < 9; spalte++) {
    PAPILLEN.push([-104 + spalte * 26 + (reihe % 2) * 13, -132 + reihe * 27]);
  }
}

/** Zunge von vorn, Mitte (0, 0); belegt = weißer Belag, sonst himbeerrot. */
function Zunge({ belegt }: { belegt: boolean }) {
  return (
    <g>
      <path d={ZUNGE} fill={belegt ? F.creme : F.kupfer} />
      <g clipPath="url(#scharlach-zunge)" fill={belegt ? F.kupfer : F.kupferHell}>
        {PAPILLEN.map(([x, y], i) =>
          belegt && i % 3 !== 0 ? null : <circle key={`${x}-${y}`} cx={x} cy={y} r={belegt ? 4 : 6.5} />,
        )}
      </g>
      <path d="M0 -140 L0 70" stroke={belegt ? F.leise : F.kupferHell} strokeWidth="4" strokeLinecap="round" />
      <path d={ZUNGE} fill="none" stroke={F.linie} strokeWidth="4" strokeLinejoin="round" />
      {/* Oberlippe als Abschluss oben */}
      <path d="M-150 -150 C-80 -176 80 -176 150 -150" fill="none" stroke={F.linie} strokeWidth="4" strokeLinecap="round" />
    </g>
  );
}

/** Zunge bei Scharlach: erst weiß belegt, nach einigen Tagen himbeerrot. */
export default function Scharlach() {
  return (
    <Zeichnung titel="Zwei Zungen bei Scharlach: links in den ersten Tagen weiß belegt mit roten Pünktchen, rechts einige Tage später himbeerrot mit hervortretenden Papillen">
      <defs>
        <clipPath id="scharlach-zunge">
          <path d={ZUNGE} />
        </clipPath>
      </defs>

      <g transform="translate(185 380)">
        <Zunge belegt />
      </g>
      <g transform="translate(535 380)">
        <Zunge belegt={false} />
      </g>

      <Etikett x={185} y={110} anker="middle">
        Erste Tage
      </Etikett>
      <Unterzeile x={185} y={142} anker="middle">
        weiß belegt
      </Unterzeile>
      <Etikett x={535} y={110} anker="middle" farbe={F.kupferHell}>
        Himbeerzunge
      </Etikett>
      <Unterzeile x={535} y={142} anker="middle">
        nach einigen Tagen
      </Unterzeile>

      <Unterzeile x={360} y={640} anker="middle">
        Dazu kommt ein feiner, rauer Ausschlag
      </Unterzeile>
    </Zeichnung>
  );
}
