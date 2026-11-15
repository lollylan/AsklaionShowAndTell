import { Etikett, F, KONTUR, Unterzeile, Zeichnung, Zeiger } from './bausteine';

const LUNGE_LINKS =
  'M330 200 C280 190 200 240 170 330 C140 420 140 520 170 580 C200 612 280 602 330 570 C345 480 345 300 330 200 Z';
const LUNGE_RECHTS =
  'M390 200 C440 190 520 240 550 330 C580 420 580 520 550 580 C520 612 440 602 390 570 C375 480 375 300 390 200 Z';

/** Atemwege als Röhren: [Pfad, Wandbreite, Innenbreite]. */
const ATEMWEGE: [string, number, number][] = [
  ['M360 130 L360 290', 32, 14],
  ['M360 290 C340 310 310 320 290 345', 24, 10],
  ['M360 290 C380 310 410 320 430 345', 24, 10],
  ['M290 345 C270 380 250 410 230 450', 16, 6],
  ['M290 345 C285 400 280 460 270 520', 16, 6],
  ['M290 345 C260 350 230 330 212 300', 16, 6],
  ['M430 345 C450 380 470 410 490 450', 16, 6],
  ['M430 345 C435 400 440 460 450 520', 16, 6],
  ['M430 345 C460 350 490 330 508 300', 16, 6],
];

/** Lunge von vorn: Luftröhre und Bronchien entzündet, das Lungengewebe selbst bleibt frei. */
export default function Bronchitis() {
  return (
    <Zeichnung titel="Lunge von vorn: Luftröhre und Bronchien sind entzündet und hervorgehoben, das Lungengewebe drumherum ist frei – anders als bei einer Lungenentzündung">
      <path d={LUNGE_LINKS} {...KONTUR} fill={F.petrol} />
      <path d={LUNGE_RECHTS} {...KONTUR} fill={F.petrol} />

      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        {ATEMWEGE.map(([d, wand]) => (
          <path key={`w-${d}`} d={d} stroke={F.kupfer} strokeWidth={wand} />
        ))}
        {ATEMWEGE.map(([d, , innen]) => (
          <path key={`i-${d}`} d={d} stroke={F.tief} strokeWidth={innen} />
        ))}
      </g>

      <Etikett x={360} y={66} anker="middle">
        Akute Bronchitis
      </Etikett>
      <Unterzeile x={360} y={98} anker="middle">
        Entzündet sind die Atemwege
      </Unterzeile>

      <Zeiger von={[180, 614]} nach={[271, 505]} />
      <Etikett x={30} y={644} farbe={F.kupferHell}>
        Bronchien entzündet
      </Etikett>
      <Unterzeile x={30} y={676}>
        daher der Husten
      </Unterzeile>

      <Zeiger von={[560, 614]} nach={[532, 470]} />
      <Etikett x={690} y={644} anker="end">
        Lungengewebe frei
      </Etikett>
      <Unterzeile x={690} y={676} anker="end">
        anders als bei Lungenentzündung
      </Unterzeile>
    </Zeichnung>
  );
}
