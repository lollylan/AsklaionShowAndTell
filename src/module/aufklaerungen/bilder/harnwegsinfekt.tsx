import { Etikett, F, KONTUR, Pfeil, Unterzeile, Zeichnung, Zeiger } from './bausteine';

/** Bakterien als kleine Stäbchen: [x, y, Drehwinkel]. */
const STAEBCHEN_BLASE: [number, number, number][] = [
  [315, 460, 20],
  [352, 440, -30],
  [396, 456, 60],
  [422, 492, 10],
  [336, 506, -50],
  [376, 496, 30],
  [402, 532, -20],
  [346, 540, 70],
  [298, 498, 80],
];

const STAEBCHEN_ROEHRE: [number, number, number][] = [
  [360, 604, 90],
  [360, 630, 90],
];

function Staebchen({ liste }: { liste: [number, number, number][] }) {
  return (
    <g stroke={F.kupferHell} strokeWidth="6" strokeLinecap="round">
      {liste.map(([x, y, w]) => (
        <line key={`${x}-${y}`} x1={-6} y1={0} x2={6} y2={0} transform={`translate(${x} ${y}) rotate(${w})`} />
      ))}
    </g>
  );
}

/** Linke Niere mit Harnleiter; die rechte entsteht durch Spiegeln. */
function NiereMitHarnleiter() {
  const harnleiter = 'M218 202 C262 214 280 280 290 340 C296 380 300 405 306 428';
  return (
    <g>
      <path
        d="M215 120 C160 100 120 150 125 210 C130 270 175 300 215 280 C240 268 235 235 220 215 C210 200 212 185 222 170 C238 148 240 130 215 120 Z"
        {...KONTUR}
        fill={F.petrol}
      />
      <path
        d="M214 200 C196 190 184 176 180 160 M214 200 C194 200 178 206 168 216 M214 200 C202 216 194 234 192 250"
        fill="none"
        stroke={F.leise}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path d={harnleiter} fill="none" stroke={F.linie} strokeWidth="14" strokeLinecap="round" />
      <path d={harnleiter} fill="none" stroke={F.petrolHell} strokeWidth="6" strokeLinecap="round" />
    </g>
  );
}

/** Harnwege von vorn: Bakterien steigen über die Harnröhre in die Blase auf. */
export default function Harnwegsinfekt() {
  return (
    <Zeichnung titel="Harnwege von vorn mit zwei Nieren, Harnleitern, Blase und Harnröhre: Bakterien steigen durch die Harnröhre auf, die Blase ist entzündet">
      <NiereMitHarnleiter />
      <g transform="translate(720 0) scale(-1 1)">
        <NiereMitHarnleiter />
      </g>

      {/* Harnröhre */}
      <line x1="360" y1="570" x2="360" y2="648" stroke={F.linie} strokeWidth="20" strokeLinecap="round" />
      <line x1="360" y1="570" x2="360" y2="648" stroke={F.tief} strokeWidth="12" strokeLinecap="round" />

      {/* Blase mit entzündeter Wand */}
      <path
        d="M360 400 C440 400 470 450 465 500 C460 550 410 575 360 575 C310 575 260 550 255 500 C250 450 280 400 360 400 Z"
        fill={F.tief}
        stroke={F.kupfer}
        strokeWidth="18"
        strokeLinejoin="round"
      />
      <Staebchen liste={STAEBCHEN_BLASE} />
      <Staebchen liste={STAEBCHEN_ROEHRE} />

      <Pfeil d="M398 664 L398 602" farbe={F.kupfer} breite={6} />

      <Etikett x={180} y={80} anker="middle">
        Niere
      </Etikett>

      <Zeiger von={[200, 341]} nach={[288, 330]} />
      <Etikett x={40} y={350}>
        Harnleiter
      </Etikett>

      <Etikett x={492} y={482} farbe={F.kupferHell}>
        Blase
      </Etikett>
      <Etikett x={492} y={514} farbe={F.kupferHell}>
        entzündet
      </Etikett>

      <Unterzeile x={334} y={634} anker="end">
        Harnröhre
      </Unterzeile>

      <Etikett x={422} y={628} farbe={F.kupferHell}>
        Bakterien
      </Etikett>
      <Etikett x={422} y={660} farbe={F.kupferHell}>
        steigen auf
      </Etikett>
    </Zeichnung>
  );
}
