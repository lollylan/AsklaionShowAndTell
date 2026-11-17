import { Etikett, F, KONTUR, Pfeil, Unterzeile, Zeichnung, Zeiger } from './bausteine';

/** Ein kleiner Lieferwagen, der nach rechts (oder mit links nach links) fährt, mit Cholesterin als Ladung. */
function Wagen({
  x,
  y,
  farbe,
  ladung,
  links = false,
}: {
  x: number;
  y: number;
  farbe: string;
  ladung: number;
  links?: boolean;
}) {
  return (
    <g transform={`translate(${x} ${y})${links ? ' scale(-1 1)' : ''}`}>
      {/* Laderaum */}
      <rect x="-56" y="-30" width="70" height="44" rx="6" fill={farbe} stroke={F.linie} strokeWidth="3" />
      {/* Fahrerhaus */}
      <path d="M14 -16 L36 -16 L50 0 L50 14 L14 14 Z" fill={farbe} stroke={F.linie} strokeWidth="3" strokeLinejoin="round" />
      <path d="M20 -10 L34 -10 L42 0 L20 0 Z" fill={F.tief} />
      {/* Räder */}
      <circle cx="-34" cy="16" r="9" fill={F.tief} stroke={F.linie} strokeWidth="3" />
      <circle cx="30" cy="16" r="9" fill={F.tief} stroke={F.linie} strokeWidth="3" />
      {/* Ladung */}
      {Array.from({ length: ladung }, (_, i) => (
        <circle key={i} cx={-42 + i * 14} cy="-8" r="6" fill={F.kupferHell} />
      ))}
    </g>
  );
}

/** Untere Gefäßwand mit Ablagerung, die in die Ader hineinragt. */
const WAND_UNTEN =
  'M30 420 L150 420 C180 420 190 372 240 366 C290 360 320 380 340 420 L460 420 L460 470 L30 470 Z';

const LEBER =
  'M520 230 C540 190 630 180 680 196 C706 206 708 240 696 270 C680 310 630 340 580 344 C546 346 520 320 514 290 C510 270 512 248 520 230 Z';

/** Längsschnitt einer Schlagader: LDL-Lieferwagen bringen Cholesterin in die Wand, HDL bringt es zur Leber. */
export default function Blutfette() {
  return (
    <Zeichnung titel="Längsschnitt einer Schlagader. LDL fährt wie ein Lieferwagen Cholesterin in die Gefäßwand, wo es sich ablagert. HDL holt wie eine Müllabfuhr Cholesterin ab und bringt es zur Leber.">
      <g transform="translate(0 40)">
      {/* Ader */}
      <rect x="30" y="200" width="430" height="220" fill={F.tief} />
      <rect x="30" y="160" width="430" height="40" fill={F.petrol} />
      <line x1="30" y1="200" x2="460" y2="200" {...KONTUR} />
      <path d={WAND_UNTEN} fill={F.petrol} />
      {/* Ablagerung in der Wand */}
      <path
        d="M160 420 C186 414 196 380 240 376 C284 372 312 390 330 420 Z"
        fill={F.kupfer}
        stroke={F.kupferHell}
        strokeWidth="3"
      />
      <path d="M30 420 L150 420 C180 420 190 372 240 366 C290 360 320 380 340 420 L460 420" {...KONTUR} />

      {/* LDL bringt Cholesterin in die Wand */}
      <Wagen x={104} y={330} farbe={F.kupfer} ladung={4} />
      <Pfeil d="M170 330 C200 330 214 344 222 360" farbe={F.kupferHell} breite={4} />

      {/* HDL holt Cholesterin ab und fährt zur Leber */}
      <Wagen x={330} y={258} farbe={F.petrolHell} ladung={3} />
      <Pfeil d="M292 366 L292 300" farbe={F.leise} breite={3} />
      <Pfeil d="M400 254 C450 254 480 260 506 270" farbe={F.leise} breite={5} />

      {/* Leber */}
      <path d={LEBER} fill={F.petrol} />
      <path d={LEBER} {...KONTUR} />
      <Etikett x={608} y={274} anker="middle">
        Leber
      </Etikett>

      {/* Beschriftung */}
      <Etikett x={30} y={70}>
        HDL – die Müllabfuhr
      </Etikett>
      <Unterzeile x={30} y={102}>
        holt Cholesterin ab und bringt es zur Leber
      </Unterzeile>
      <Zeiger von={[300, 116]} nach={[316, 226]} />

      <Etikett x={30} y={540}>
        LDL – der Lieferwagen
      </Etikett>
      <Unterzeile x={30} y={572}>
        bringt Cholesterin in die Gefäßwand
      </Unterzeile>
      <Zeiger von={[100, 518]} nach={[100, 352]} />

      <Etikett x={690} y={420} anker="end" farbe={F.kupferHell}>
        Ablagerung
      </Etikett>
      <Unterzeile x={690} y={452} anker="end">
        macht die Ader eng
      </Unterzeile>
      <Zeiger von={[526, 412]} nach={[290, 400]} />

      <Unterzeile x={444} y={452} anker="end">
        Gefäßwand
      </Unterzeile>
      </g>
    </Zeichnung>
  );
}
