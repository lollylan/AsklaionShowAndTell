import { Etikett, F, KONTUR, Pfeil, Unterzeile, Zeichnung, Zeiger } from './bausteine';

const RUMPF =
  'M326 120 L326 150 C326 168 262 174 215 190 C178 203 166 230 170 262 C176 320 205 365 212 425 C216 465 207 500 202 530 L518 530 C513 500 504 465 508 425 C515 365 544 320 550 262 C554 230 542 203 505 190 C458 174 394 168 394 150 L394 120';

/** Verlauf des Nervs von der Wirbelsäule zur Flanke. */
const NERV = 'M360 372 C410 372 460 392 498 422';
const BAND = 'M360 372 C410 372 460 392 530 446';

const BLAESCHEN: [number, number, number][] = [
  [390, 360, 7],
  [410, 390, 8],
  [428, 371, 8],
  [446, 402, 7],
  [464, 387, 9],
  [478, 421, 7],
  [491, 404, 8],
];

/** Rücken von hinten: Das Virus wandert an einem Nerv entlang zu einer Körperseite. */
export default function Guertelrose() {
  return (
    <Zeichnung titel="Oberkörper von hinten: Von der Wirbelsäule zieht ein Nerv zu einer Körperseite, entlang davon ein Band aus Bläschen">
      <clipPath id="guertelrose-clip">
        <path d={RUMPF} />
      </clipPath>

      {/* Rumpf und Kopf */}
      <path d={RUMPF} {...KONTUR} fill={F.petrol} />
      <ellipse cx="360" cy="82" rx="44" ry="52" {...KONTUR} fill={F.petrol} />

      {/* Schulterblätter als Andeutung */}
      <path
        d="M290 232 C270 262 272 300 296 320 M430 232 C450 262 448 300 424 320"
        fill="none"
        stroke={F.leise}
        strokeWidth="3"
        strokeLinecap="round"
        strokeOpacity="0.6"
      />

      {/* Wirbelsäule */}
      <line x1="360" y1="166" x2="360" y2="520" stroke={F.leise} strokeWidth="12" strokeDasharray="14 8" />

      {/* Gerötetes Hautband, nur auf einer Seite */}
      <g clipPath="url(#guertelrose-clip)">
        <path d={BAND} fill="none" stroke={F.kupfer} strokeWidth="56" strokeOpacity="0.4" />
      </g>

      {/* Nerv mit Laufrichtung des Virus */}
      <Pfeil d={NERV} farbe={F.kupferHell} breite={5} />
      <circle cx="360" cy="372" r="10" fill={F.kupfer} stroke={F.kupferHell} strokeWidth="3" />

      {/* Bläschen */}
      {BLAESCHEN.map(([x, y, r]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r={r} fill={F.kupferHell} stroke={F.kupfer} strokeWidth="2" />
      ))}

      <Zeiger von={[160, 572]} nach={[376, 380]} />
      <Etikett x={40} y={602}>
        Virus wandert
      </Etikett>
      <Etikett x={40} y={634}>
        am Nerv entlang
      </Etikett>

      <Zeiger von={[540, 572]} nach={[484, 436]} />
      <Etikett x={690} y={602} anker="end" farbe={F.kupferHell}>
        Bläschen und Schmerz,
      </Etikett>
      <Unterzeile x={690} y={634} anker="end">
        nur auf einer Seite
      </Unterzeile>
    </Zeichnung>
  );
}
