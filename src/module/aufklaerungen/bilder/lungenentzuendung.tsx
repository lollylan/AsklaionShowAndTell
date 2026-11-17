import { Etikett, F, KONTUR, Unterzeile, Zeichnung, Zeiger } from './bausteine';

const LUNGE_LINKS =
  'M330 200 C280 190 200 240 170 330 C140 420 140 520 170 580 C200 612 280 602 330 570 C345 480 345 300 330 200 Z';
const LUNGE_RECHTS =
  'M390 200 C440 190 520 240 550 330 C580 420 580 520 550 580 C520 612 440 602 390 570 C375 480 375 300 390 200 Z';

/** Luftröhre und große Bronchien, zart gezeichnet. */
const ATEMWEGE = [
  'M360 130 L360 290',
  'M360 290 C340 310 310 320 290 345',
  'M360 290 C380 310 410 320 430 345',
  'M290 345 C270 380 250 410 230 450',
  'M290 345 C285 400 280 460 270 520',
  'M430 345 C450 380 470 410 490 450',
  'M430 345 C435 400 440 460 450 520',
];

/** Gefüllte Lungenbläschen im entzündeten Bereich: [x, y]. */
const HERDE: [number, number][] = [];
for (let reihe = 0; reihe < 6; reihe++) {
  for (let spalte = 0; spalte < 8; spalte++) {
    HERDE.push([150 + spalte * 26 + (reihe % 2) * 13, 440 + reihe * 26]);
  }
}

/** Lunge von vorn: Ein Lungenabschnitt unten ist entzündet und mit Flüssigkeit gefüllt. */
export default function Lungenentzuendung() {
  return (
    <Zeichnung titel="Lunge von vorn: Im unteren Teil eines Lungenflügels ist das Lungengewebe entzündet und die Lungenbläschen sind mit Flüssigkeit gefüllt, der Rest der Lunge ist luftgefüllt und gesund">
      <defs>
        <clipPath id="lungenentzuendung-fluegel">
          <path d={LUNGE_LINKS} />
        </clipPath>
      </defs>

      <path d={LUNGE_LINKS} fill={F.petrol} />
      <path d={LUNGE_RECHTS} fill={F.petrol} />

      <g clipPath="url(#lungenentzuendung-fluegel)">
        <path d="M120 430 C200 400 300 410 360 440 L360 640 L120 640 Z" fill={F.kupfer} />
        <g fill={F.kupferHell}>
          {HERDE.map(([x, y]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="7" />
          ))}
        </g>
      </g>

      <path d={LUNGE_LINKS} {...KONTUR} />
      <path d={LUNGE_RECHTS} {...KONTUR} />

      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        {ATEMWEGE.map((d) => (
          <path key={`w-${d}`} d={d} stroke={F.linie} strokeWidth="14" />
        ))}
        {ATEMWEGE.map((d) => (
          <path key={`i-${d}`} d={d} stroke={F.tief} strokeWidth="6" />
        ))}
      </g>

      <Etikett x={360} y={66} anker="middle">
        Lungenentzündung
      </Etikett>
      <Unterzeile x={360} y={98} anker="middle">
        Entzündet ist das Lungengewebe selbst
      </Unterzeile>

      <Zeiger von={[150, 614]} nach={[205, 520]} />
      <Etikett x={30} y={644} farbe={F.kupferHell}>
        Entzündeter Bereich
      </Etikett>
      <Unterzeile x={30} y={676}>
        Bläschen voller Flüssigkeit
      </Unterzeile>

      <Zeiger von={[580, 614]} nach={[520, 400]} />
      <Etikett x={690} y={644} anker="end">
        Gesunde Lunge
      </Etikett>
      <Unterzeile x={690} y={676} anker="end">
        mit Luft gefüllt
      </Unterzeile>
    </Zeichnung>
  );
}
