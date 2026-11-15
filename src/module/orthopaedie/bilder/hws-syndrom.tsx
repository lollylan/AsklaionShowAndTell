import { Etikett, F, KONTUR, Pfeil, Unterzeile, Zeichnung, Zeiger } from '../../aufklaerungen/bilder/bausteine';

/** Kopf im Profil, Gesicht nach links; Ursprung etwa in der Kopfmitte. */
const KOPF =
  'M10 -86 C58 -86 86 -50 84 -6 C82 32 68 58 44 72 C20 84 -20 82 -42 72 C-52 66 -56 56 -56 46 C-60 42 -62 34 -58 30 C-64 26 -64 20 -60 18 L-78 12 C-80 8 -76 2 -72 -6 C-68 -14 -66 -22 -66 -32 C-66 -60 -40 -86 10 -86 Z';

interface Haltung {
  /** Lage und Neigung des Kopfes. */
  kopf: string;
  /** Hals und Oberkörper als Fläche (unten offen) … */
  rumpf: string;
  /** … und dieselben Umrisse ohne Unterkante. */
  umriss: string;
  /** Halswirbel: Mitte und Drehung. */
  wirbel: [number, number, number][];
  /** Nackenmuskeln als Mittellinie. */
  muskel: string;
}

const AUFRECHT: Haltung = {
  kopf: 'translate(150 140)',
  rumpf:
    'M206 190 C218 250 228 296 254 318 C274 334 284 356 288 400 L292 520 L84 520 C84 440 92 364 112 326 C122 304 124 270 122 206 Z',
  umriss:
    'M206 190 C218 250 228 296 254 318 C274 334 284 356 288 400 L292 520 M84 520 C84 440 92 364 112 326 C122 304 124 270 122 206',
  wirbel: [
    [170, 210, 0],
    [164, 236, -6],
    [162, 262, -4],
    [163, 288, 2],
    [167, 314, 8],
    [174, 340, 14],
    [184, 366, 20],
    [196, 392, 24],
  ],
  muskel: 'M204 190 C208 240 218 284 242 314 C256 330 266 346 274 372',
};

const VORGEBEUGT: Haltung = {
  kopf: 'translate(96 196) rotate(-28)',
  rumpf:
    'M160 226 C190 262 222 296 250 318 C272 334 284 356 288 400 L292 520 L84 520 C84 440 92 364 106 334 C112 316 108 296 100 276 Z',
  umriss:
    'M160 226 C190 262 222 296 250 318 C272 334 284 356 288 400 L292 520 M84 520 C84 440 92 364 106 334 C112 316 108 296 100 276',
  wirbel: [
    [128, 246, 36],
    [142, 266, 38],
    [156, 286, 38],
    [168, 306, 36],
    [178, 328, 32],
    [186, 350, 28],
    [192, 372, 24],
    [198, 394, 22],
  ],
  muskel: 'M164 218 C196 252 226 284 248 312 C260 330 266 346 272 372',
};

function Figur({ h, verspannt }: { h: Haltung; verspannt: boolean }) {
  return (
    <g>
      <path d={h.rumpf} fill={F.tief} />
      <path d={h.muskel} {...KONTUR} strokeWidth="28" />
      <path d={h.muskel} {...KONTUR} stroke={verspannt ? F.kupfer : F.petrolHell} strokeWidth="22" />
      {h.wirbel.map(([x, y, w]) => (
        <g key={y} transform={`translate(${x} ${y}) rotate(${w})`}>
          <path d="M8 -6 L26 -2 L26 4 L8 6 Z" {...KONTUR} strokeWidth="3" fill={F.creme} />
          <rect x="-16" y="-10" width="30" height="20" rx="6" {...KONTUR} strokeWidth="3" fill={F.creme} />
        </g>
      ))}
      <path d={h.umriss} {...KONTUR} />
      <g transform={h.kopf}>
        <path d={KOPF} {...KONTUR} fill={F.tief} />
        <ellipse cx="22" cy="6" rx="11" ry="17" fill="none" stroke={F.leise} strokeWidth="3" />
        <circle cx="-46" cy="-16" r="4" fill={F.linie} />
      </g>
    </g>
  );
}

/** Nacken von der Seite: aufrechte Haltung gegenüber vorgeschobenem Kopf mit verspannten Nackenmuskeln. */
export default function HwsSyndrom() {
  return (
    <Zeichnung titel="Kopf, Hals und Schultern zweimal von der Seite: links aufrecht, der Kopf ruht über den Schultern und die Halswirbelsäule ist leicht geschwungen; rechts ist der Kopf beim Blick aufs Handy weit nach vorn geschoben, die Nackenmuskeln sind gedehnt und verspannt, der Kopf zieht nach vorn">
      <g transform="translate(40 110)">
        <Figur h={AUFRECHT} verspannt={false} />
      </g>
      <g transform="translate(380 110)">
        <Figur h={VORGEBEUGT} verspannt />
        {/* Handy vor dem Gesicht und der Zug des Kopfes nach vorn unten */}
        <rect x="18" y="300" width="22" height="40" rx="5" transform="rotate(-30 29 320)" fill={F.petrolDunkel} stroke={F.linie} strokeWidth="3" />
        <path d="M50 192 L30 300" stroke={F.leise} strokeWidth="2" strokeDasharray="6 8" />
        <Pfeil d="M150 74 C110 70 70 90 46 124" farbe={F.kupferHell} />
      </g>

      <Etikett x={190} y={66} anker="middle">
        Gesund
      </Etikett>
      <Unterzeile x={190} y={98} anker="middle">
        Kopf über den Schultern
      </Unterzeile>
      <Etikett x={530} y={66} anker="middle" farbe={F.kupferHell}>
        HWS-Syndrom
      </Etikett>
      <Unterzeile x={530} y={98} anker="middle">
        Kopf weit vorgeschoben
      </Unterzeile>

      <Zeiger von={[150, 646]} nach={[232, 504]} />
      <Etikett x={40} y={670}>
        Halswirbel
      </Etikett>
      <Zeiger von={[306, 674]} nach={[312, 484]} />
      <Etikett x={350} y={702} anker="end">
        Nackenmuskeln
      </Etikett>
      <Zeiger von={[646, 674]} nach={[640, 470]} />
      <Etikett x={700} y={702} anker="end" farbe={F.kupferHell}>
        Muskeln unter Zug
      </Etikett>
    </Zeichnung>
  );
}
