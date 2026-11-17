import { Etikett, F, Unterzeile, Zeichnung, Zeiger } from './bausteine';
import { Elektrode, KOERPER, Schmerzzone } from './tens-teile';

/** Rumpf von hinten, von den Schulterblättern bis zum Gesäß; Mitte bei x = 450. */
const RUMPF =
  'M300 40 C298 140 322 250 336 330 C340 380 320 430 304 490 C300 540 304 580 318 612 ' +
  'L582 612 C596 580 600 540 596 490 C580 430 560 380 564 330 C578 250 602 140 600 40 Z';

const MITTE = 450;

/** Untere Rücken von hinten mit vier Elektroden neben der Lendenwirbelsäule. */
export default function TensRuecken() {
  return (
    <Zeichnung titel="Unterer Rücken von hinten: Links und rechts neben der Lendenwirbelsäule kleben je zwei Elektroden, etwa zwei Finger breit neben der Wirbelsäule, die schmerzende Stelle liegt dazwischen">
      <clipPath id="tens-ruecken-rumpf">
        <path d={RUMPF} />
      </clipPath>

      <path d={RUMPF} {...KOERPER} />
      <g clipPath="url(#tens-ruecken-rumpf)">
        <Schmerzzone cx={MITTE} cy={420} rx={140} ry={110} />
      </g>

      {/* Schulterblätter und Gesäßfalte als Andeutung */}
      <path
        d="M370 60 C342 100 344 150 376 176 M530 60 C558 100 556 150 524 176 M450 540 L450 612"
        fill="none"
        stroke={F.leise}
        strokeWidth="3"
        strokeLinecap="round"
        strokeOpacity="0.6"
      />

      {/* Wirbelsäule */}
      <line x1={MITTE} y1="40" x2={MITTE} y2="530" stroke={F.leise} strokeWidth="12" strokeDasharray="14 8" />

      {/* Elektroden, zwei Finger breit neben der Wirbelsäule */}
      <Elektrode x={MITTE - 62} y={372} />
      <Elektrode x={MITTE + 62} y={372} />
      <Elektrode x={MITTE - 62} y={470} />
      <Elektrode x={MITTE + 62} y={470} />

      <Zeiger von={[200, 264]} nach={[MITTE, 318]} />
      <Etikett x={30} y={250}>
        Lendenwirbelsäule
      </Etikett>

      <Etikett x={440} y={660} anker="middle" farbe={F.kupferHell}>
        Elektroden neben der Wirbelsäule
      </Etikett>
      <Unterzeile x={440} y={692} anker="middle">
        nicht direkt auf den Knochen
      </Unterzeile>
    </Zeichnung>
  );
}
