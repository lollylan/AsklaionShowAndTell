import { Etikett, F, KONTUR, Pfeil, Unterzeile, Zeichnung, Zeiger } from './bausteine';

const LEBER =
  'M100 210 C120 150 260 130 400 140 C520 148 620 170 630 220 C640 270 560 330 470 370 C400 400 330 420 270 410 C190 395 110 330 100 270 Z';

/** Enzyme im Blutgefäß, als kleine Punkte. */
const ENZYME: [number, number][] = [
  [120, 545],
  [210, 556],
  [360, 540],
  [470, 552],
  [580, 542],
];

/** Leber mit gereizten Zellen, aus denen Enzyme ins Blut übertreten. */
export default function BlutwerteLeber() {
  return (
    <Zeichnung titel="Leber mit einigen gereizten Leberzellen; aus ihnen gelangen Enzyme in ein Blutgefäß darunter, wo sie als erhöhte Leberwerte messbar sind">
      <path d={LEBER} fill={F.petrol} />
      <path d={LEBER} {...KONTUR} />

      {/* Gereizte Zellen und austretende Enzyme */}
      <circle cx="300" cy="270" r="24" fill={F.kupfer} stroke={F.kupferHell} strokeWidth="3" />
      <circle cx="346" cy="250" r="22" fill={F.kupfer} stroke={F.kupferHell} strokeWidth="3" />
      <circle cx="338" cy="300" r="22" fill={F.kupfer} stroke={F.kupferHell} strokeWidth="3" />
      <circle cx="305" cy="336" r="7" fill={F.kupferHell} />
      <circle cx="296" cy="368" r="7" fill={F.kupferHell} />
      <Pfeil d="M300 396 L300 494" farbe={F.kupferHell} />

      {/* Blutgefäß */}
      <rect x="40" y="510" width="640" height="70" fill={F.petrolDunkel} />
      <line x1="40" y1="510" x2="680" y2="510" {...KONTUR} />
      <line x1="40" y1="580" x2="680" y2="580" {...KONTUR} />
      {ENZYME.map(([x, y]) => (
        <circle key={x} cx={x} cy={y} r="7" fill={F.kupferHell} />
      ))}

      <Etikett x={130} y={262}>
        Leber
      </Etikett>

      <Etikett x={690} y={70} anker="end">
        Gereizte Leberzellen
      </Etikett>
      <Unterzeile x={690} y={102} anker="end">
        z. B. durch Fett oder Alkohol
      </Unterzeile>
      <Zeiger von={[420, 124]} nach={[352, 246]} />

      <Etikett x={340} y={470}>
        Enzyme gelangen ins Blut
      </Etikett>
      <Unterzeile x={360} y={632} anker="middle">
        GOT, GPT und GGT steigen an
      </Unterzeile>
    </Zeichnung>
  );
}
