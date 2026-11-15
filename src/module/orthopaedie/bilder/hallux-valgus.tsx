import { Etikett, F, KONTUR, Unterzeile, Zeichnung, Zeiger } from '../../aufklaerungen/bilder/bausteine';

type Knochen = [x1: number, y1: number, x2: number, y2: number, basis: number, schaft: number, kopf: number];

/** Röhrenknochen von (x1, y1) = Basis nach (x2, y2) = Kopf, mit runden Enden und schmalerem Schaft. */
function knochenPfad([x1, y1, x2, y2, basis, schaft, kopf]: Knochen) {
  const laenge = Math.hypot(x2 - x1, y2 - y1);
  const dx = (x2 - x1) / laenge;
  const dy = (y2 - y1) / laenge;
  const nx = -dy;
  const ny = dx;
  const p = (x: number, y: number) => `${x.toFixed(1)} ${y.toFixed(1)}`;
  const seite = (s: number) => [
    p(x1 + (nx * s * basis) / 2, y1 + (ny * s * basis) / 2),
    p(x1 + dx * laenge * 0.3 + (nx * s * schaft) / 2, y1 + dy * laenge * 0.3 + (ny * s * schaft) / 2),
    p(x2 - dx * laenge * 0.3 + (nx * s * schaft) / 2, y2 - dy * laenge * 0.3 + (ny * s * schaft) / 2),
    p(x2 + (nx * s * kopf) / 2, y2 + (ny * s * kopf) / 2),
  ];
  const [a0, a1, a2, a3] = seite(1);
  const [b0, b1, b2, b3] = seite(-1);
  return `M${a0} C${a1} ${a2} ${a3} A${kopf / 2} ${kopf / 2} 0 0 0 ${b3} C${b2} ${b1} ${b0} A${basis / 2} ${basis / 2} 0 0 0 ${a0} Z`;
}

/** Kleine Zehen 2 bis 5 mit Mittelfußknochen – in beiden Bildern gleich. */
const KLEINE_ZEHEN: Knochen[] = [
  [132, 440, 136, 250, 26, 16, 26],
  [137, 232, 139, 182, 18, 12, 16],
  [140, 168, 141, 144, 15, 11, 14],
  [141, 132, 142, 116, 13, 10, 12],
  [164, 440, 178, 258, 26, 16, 24],
  [180, 240, 184, 196, 17, 12, 15],
  [185, 183, 187, 162, 14, 10, 13],
  [188, 150, 189, 136, 12, 9, 11],
  [194, 440, 214, 268, 26, 16, 24],
  [217, 250, 223, 214, 16, 11, 14],
  [225, 202, 228, 184, 13, 9, 12],
  [229, 172, 231, 160, 11, 8, 10],
  [222, 440, 248, 284, 28, 16, 22],
  [252, 266, 260, 238, 15, 11, 13],
  [262, 226, 266, 210, 12, 9, 11],
  [267, 199, 269, 188, 10, 8, 9],
];

/** Weichteile des Vorfußes: Fläche und Zehen als dicke runde Striche, alles eine Farbe. */
function Haut({ grosszehe }: { grosszehe: string }) {
  return (
    <g fill={F.petrol} stroke={F.petrol} strokeLinecap="round" strokeLinejoin="round">
      <path d="M50 470 C46 400 44 330 50 266 C62 232 120 222 200 234 C250 242 286 264 292 300 L280 470 Z" strokeWidth="2" />
      <path d={grosszehe} fill="none" strokeWidth="58" />
      <path d="M137 250 L142 112" fill="none" strokeWidth="38" />
      <path d="M180 258 L189 132" fill="none" strokeWidth="36" />
      <path d="M216 268 L231 156" fill="none" strokeWidth="34" />
      <path d="M250 284 L269 184" fill="none" strokeWidth="30" />
    </g>
  );
}

function Vorfuss({ krank = false }: { krank?: boolean }) {
  const grosszehe: Knochen[] = krank
    ? [
        [96, 440, 54, 266, 38, 26, 42],
        [58, 244, 94, 176, 30, 22, 28],
        [102, 162, 120, 124, 26, 20, 22],
      ]
    : [
        [94, 440, 78, 262, 38, 26, 40],
        [76, 240, 72, 162, 30, 22, 28],
        [71, 146, 70, 100, 26, 20, 22],
      ];
  return (
    <g>
      <Haut grosszehe={krank ? 'M50 268 L94 176 L122 118' : 'M78 262 L72 162 L70 96'} />
      {krank && (
        /* Ballen: Weichteile und Knochen stehen innen vor */
        <ellipse cx="34" cy="266" rx="26" ry="34" fill={F.kupfer} stroke={F.kupferHell} strokeWidth="4" />
      )}
      {[...grosszehe, ...KLEINE_ZEHEN].map((k) => (
        <path key={k.join('-')} d={knochenPfad(k)} {...KONTUR} strokeWidth="3" fill={F.creme} />
      ))}
      {krank && (
        <g fill="none" stroke={F.kupferHell} strokeWidth="2.5" strokeDasharray="8 7" strokeLinecap="round">
          {/* Achsen zeigen den Knick im Großzehengrundgelenk */}
          <path d="M96 440 L36 192" />
          <path d="M42 272 L126 120" />
        </g>
      )}
    </g>
  );
}

/** Vorfuß (rechts) von oben, Knochen sichtbar: links gesund, rechts Hallux valgus. */
export default function HalluxValgus() {
  return (
    <Zeichnung titel="Vorfuß zweimal von oben mit den Knochen: links gesund mit gerader Großzehe, rechts Hallux valgus mit nach außen abgeknickter Großzehe, nach innen gekipptem Mittelfußknochen und vorstehendem Ballen">
      <g transform="translate(40 150)">
        <Vorfuss />
      </g>
      <g transform="translate(400 150)">
        <Vorfuss krank />
      </g>

      <Etikett x={190} y={66} anker="middle">
        Gesund
      </Etikett>
      <Unterzeile x={190} y={98} anker="middle">
        Großzehe steht gerade
      </Unterzeile>
      <Etikett x={545} y={66} anker="middle" farbe={F.kupferHell}>
        Hallux valgus
      </Etikett>
      <Unterzeile x={545} y={98} anker="middle">
        Großzehe knickt nach außen
      </Unterzeile>

      <Zeiger von={[56, 650]} nach={[126, 500]} />
      <Etikett x={30} y={680}>
        Mittelfußknochen
      </Etikett>
      <Zeiger von={[380, 650]} nach={[408, 418]} />
      <Etikett x={380} y={680} farbe={F.kupferHell}>
        Ballen
      </Etikett>
    </Zeichnung>
  );
}
