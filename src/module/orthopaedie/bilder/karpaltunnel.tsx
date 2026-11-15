import { Etikett, F, KONTUR, Unterzeile, Zeichnung, Zeiger } from '../../aufklaerungen/bilder/bausteine';

/** Handwurzelknochen im Querschnitt, Hohlhand oben, Daumenseite rechts. Sie bilden den Boden des Tunnels. */
const KNOCHEN = [
  'M40 150 C34 120 40 96 56 92 C70 90 74 110 78 130 C92 150 120 170 118 196 C114 222 70 226 52 210 C40 198 42 176 40 150 Z',
  'M126 214 C126 192 150 186 176 186 C204 186 226 194 226 216 C226 242 200 254 176 254 C148 254 126 240 126 214 Z',
  'M232 208 C232 190 252 182 270 182 C290 182 306 192 306 210 C306 230 290 240 270 240 C250 240 232 228 232 208 Z',
  'M300 190 C312 160 330 122 346 102 C358 92 372 104 370 124 C368 150 378 180 370 204 C358 230 314 232 300 214 Z',
];

type Kreis = [number, number];

/** Neun Beugesehnen: gesund schlank, erkrankt geschwollen. */
const SEHNEN_GESUND: Kreis[] = [
  [112, 124], [148, 120], [184, 120], [220, 122],
  [128, 158], [164, 156], [200, 156], [236, 158], [278, 160],
];
const SEHNEN_ENG: Kreis[] = [
  [110, 138], [148, 136], [186, 136], [224, 138],
  [126, 174], [164, 174], [202, 174], [240, 172], [280, 168],
];

/** Hohlhand mit Fingern von oben, Daumen rechts. `kribbeln` färbt das Gebiet des Mittelnervs. */
function Hand({ kribbeln }: { kribbeln: boolean }) {
  const teile = [
    { x: 551, y: 150, b: 24, h: 66, nerv: false },
    { x: 579, y: 128, b: 26, h: 88, nerv: false },
    { x: 609, y: 120, b: 26, h: 96, nerv: true },
    { x: 639, y: 130, b: 26, h: 86, nerv: true },
  ];
  const daumen = 'M660 236 C676 226 690 204 700 184 C706 172 722 178 716 192 C708 214 696 240 676 262 Z';
  const handteller = 'M548 200 L668 200 L668 262 C668 290 640 304 608 304 C574 304 548 290 548 262 Z';
  return (
    <g>
      {/* Erst die Umrisse breit, dann die Flächen darüber: so verschmelzen Finger und Handteller. */}
      {teile.map((t) => (
        <rect key={t.x} x={t.x} y={t.y} width={t.b} height={t.h + 60} rx={t.b / 2} fill="none" stroke={F.linie} strokeWidth="8" />
      ))}
      <path d={daumen} fill="none" stroke={F.linie} strokeWidth="8" strokeLinejoin="round" />
      <path d={handteller} fill="none" stroke={F.linie} strokeWidth="8" strokeLinejoin="round" />
      {teile.map((t) => (
        <rect key={t.x} x={t.x} y={t.y} width={t.b} height={t.h + 60} rx={t.b / 2} fill={kribbeln && t.nerv ? F.kupfer : F.petrol} />
      ))}
      <path d={daumen} fill={kribbeln ? F.kupfer : F.petrol} />
      <path d={handteller} fill={F.petrol} />
      {kribbeln && (
        <clipPath id="karpaltunnel-ringfinger">
          <rect x="592" y="100" width="14" height="140" />
        </clipPath>
      )}
      {kribbeln && (
        <rect x="579" y="128" width="26" height="100" rx="13" fill={F.kupfer} clipPath="url(#karpaltunnel-ringfinger)" />
      )}
    </g>
  );
}

function Querschnitt({ eng }: { eng: boolean }) {
  const sehnen = eng ? SEHNEN_ENG : SEHNEN_GESUND;
  const band = eng ? 'M58 104 C120 100 290 100 350 108' : 'M58 100 C110 52 300 52 350 104';
  return (
    <g>
      {KNOCHEN.map((d) => (
        <path key={d} d={d} {...KONTUR} fill={F.creme} />
      ))}
      {sehnen.map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r={eng ? 18 : 15} fill={F.petrolHell} stroke={F.linie} strokeWidth="3" />
      ))}
      {eng ? (
        <ellipse cx="300" cy="134" rx="30" ry="9" fill={F.kupfer} stroke={F.linie} strokeWidth="3" />
      ) : (
        <g>
          <ellipse cx="300" cy="122" rx="26" ry="18" fill={F.creme} stroke={F.linie} strokeWidth="3" />
          <circle cx="290" cy="118" r="5" fill={F.petrolHell} />
          <circle cx="308" cy="116" r="5" fill={F.petrolHell} />
          <circle cx="300" cy="129" r="5" fill={F.petrolHell} />
        </g>
      )}
      <path d={band} {...KONTUR} strokeWidth={eng ? 40 : 26} />
      <path d={band} {...KONTUR} stroke={F.petrol} strokeWidth={eng ? 32 : 18} />
    </g>
  );
}

/** Handgelenk im Querschnitt: Knochen als Boden, Karpalband als Dach, darin Sehnen und Mittelnerv. */
export default function Karpaltunnel() {
  return (
    <Zeichnung titel="Handgelenk zweimal im Querschnitt: oben gesund, unter dem Karpalband haben Beugesehnen und Mittelnerv viel Platz; unten beim Karpaltunnelsyndrom ist das Band verdickt, die Sehnen geschwollen und der Mittelnerv flach gedrückt. Daneben je eine Hand, unten kribbeln Daumen, Zeige-, Mittel- und halber Ringfinger">
      {/* Gesund */}
      <g transform="translate(0 10)">
        <g transform="translate(0 50)">
          <Querschnitt eng={false} />
        </g>
        <Hand kribbeln={false} />
        <Etikett x={20} y={40}>
          Karpalband
        </Etikett>
        <Zeiger von={[100, 48]} nach={[120, 110]} />
        <Etikett x={194} y={40}>
          Sehnen
        </Etikett>
        <Zeiger von={[224, 48]} nach={[220, 156]} />
        <Etikett x={322} y={40}>
          Mittelnerv
        </Etikett>
        <Zeiger von={[346, 48]} nach={[314, 160]} />
        <Etikett x={490} y={40}>
          Gesund
        </Etikett>
        <Unterzeile x={490} y={72}>
          Viel Platz im Tunnel
        </Unterzeile>
      </g>

      {/* Karpaltunnelsyndrom */}
      <g transform="translate(0 370)">
        <g transform="translate(0 50)">
          <Querschnitt eng />
        </g>
        <Hand kribbeln />
        <Etikett x={190} y={40} farbe={F.kupferHell}>
          Nerv gequetscht
        </Etikett>
        <Zeiger von={[330, 48]} nach={[318, 182]} />
        <Etikett x={490} y={40} farbe={F.kupferHell}>
          Karpaltunnel
        </Etikett>
        <Unterzeile x={490} y={72}>
          Eng, Finger kribbeln
        </Unterzeile>
      </g>
    </Zeichnung>
  );
}
