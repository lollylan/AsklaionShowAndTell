import { Etikett, F, KONTUR, Zeichnung, Zeiger } from './bausteine';
import { Elektrode, KOERPER, Schmerzzone } from './tens-teile';

/** Bein von vorn, vom Oberschenkel bis zum Schienbein; Mitte bei x = 380. */
const BEIN =
  'M262 20 C264 120 276 220 290 300 C300 340 288 370 294 410 C298 450 290 490 296 530 ' +
  'C304 600 324 650 330 700 L432 700 C438 650 462 600 468 530 C474 490 464 450 468 410 ' +
  'C474 370 460 340 470 300 C484 220 496 120 498 20 Z';

const KNIE_X = 380;
const KNIE_Y = 382;

/** Knie von vorn mit vier Elektroden rund um die Kniescheibe. */
export default function TensKnie() {
  return (
    <Zeichnung titel="Knie von vorn mit Oberschenkel und Schienbein: vier Elektroden kleben rund um die Kniescheibe, zwei oberhalb und zwei unterhalb, die schmerzende Stelle liegt dazwischen">
      <clipPath id="tens-knie-bein">
        <path d={BEIN} />
      </clipPath>

      <path d={BEIN} {...KOERPER} />
      <g clipPath="url(#tens-knie-bein)">
        <Schmerzzone cx={KNIE_X} cy={KNIE_Y} rx={130} ry={130} />
      </g>

      {/* Schienbeinkante als Andeutung */}
      <path d="M384 480 C380 560 380 630 378 700" fill="none" stroke={F.leise} strokeWidth="3" strokeLinecap="round" strokeOpacity="0.6" />

      {/* Kniescheibe */}
      <ellipse cx={KNIE_X} cy={KNIE_Y} rx="46" ry="54" {...KONTUR} fill={F.petrolHell} />

      {/* Elektroden: oben innen und außen, unten innen und außen */}
      <Elektrode x={KNIE_X - 64} y={KNIE_Y - 100} drehung={-6} />
      <Elektrode x={KNIE_X + 64} y={KNIE_Y - 100} drehung={6} />
      <Elektrode x={KNIE_X - 56} y={KNIE_Y + 102} drehung={6} />
      <Elektrode x={KNIE_X + 56} y={KNIE_Y + 102} drehung={-6} />

      <Zeiger von={[220, 392]} nach={[KNIE_X - 30, KNIE_Y + 8]} />
      <Etikett x={40} y={400}>
        Kniescheibe
      </Etikett>

      <Zeiger von={[560, 566]} nach={[KNIE_X + 66, KNIE_Y + 110]} />
      <Etikett x={690} y={600} anker="end" farbe={F.kupferHell}>
        Elektroden
      </Etikett>
      <Etikett x={690} y={634} anker="end" farbe={F.kupferHell}>
        rund ums Knie
      </Etikett>
    </Zeichnung>
  );
}
