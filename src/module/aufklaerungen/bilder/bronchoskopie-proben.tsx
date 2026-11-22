import { Etikett, F, Fluss, Pfeil, Unterzeile, Zeichnung, Zeiger } from './bausteine';

/** Bronchus von schräg oben nach rechts unten, verzweigt sich zu den Lungenbläschen. */
const BRONCHUS = 'M-120 50 L380 400';
const AESTE = ['M380 400 C430 430 480 440 540 430', 'M380 400 C410 450 430 500 450 560', 'M380 400 C440 470 500 520 560 560'];
const TRAUBEN: [number, number][] = [
  [560, 426],
  [590, 404],
  [596, 448],
  [452, 584],
  [430, 612],
  [478, 616],
  [580, 574],
  [612, 556],
  [606, 604],
];

/** Lungenspülung: Kochsalzlösung strömt aus dem Bronchoskop zu den Lungenbläschen und wird wieder abgesaugt. */
export default function BronchoskopieProben() {
  return (
    <Zeichnung titel="Nahansicht eines Bronchus, der sich zu den Lungenbläschen verzweigt. Das Bronchoskop steckt im Bronchus. Kochsalzlösung strömt zu den Lungenbläschen und wird gleich wieder abgesaugt; darin finden sich Keime und Zellen">
      <defs>
        <clipPath id="bronchoskopie-proben-rahmen">
          <rect x="0" y="0" width="720" height="720" />
        </clipPath>
      </defs>
      <g clipPath="url(#bronchoskopie-proben-rahmen)">
      {/* Bronchus und Äste: Kontur, dann Luft */}
      <g fill="none" stroke={F.linie} strokeLinecap="round">
        <path d={BRONCHUS} strokeWidth="128" />
        {AESTE.map((d) => (
          <path key={d} d={d} strokeWidth="44" />
        ))}
      </g>
      <g fill={F.petrolHell} stroke={F.linie} strokeWidth="4">
        {TRAUBEN.map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="24" />
        ))}
      </g>
      <g fill="none" stroke={F.tief} strokeLinecap="round">
        <path d={BRONCHUS} strokeWidth="118" />
        {AESTE.map((d) => (
          <path key={d} d={d} strokeWidth="34" />
        ))}
      </g>

      {/* Bronchoskop */}
      <path d="M-130 40 L290 334" fill="none" stroke={F.linie} strokeWidth="64" strokeLinecap="butt" />
      <path d="M-130 40 L290 334" fill="none" stroke={F.petrolDunkel} strokeWidth="56" strokeLinecap="butt" />
      <circle cx="292" cy="336" r="10" fill={F.creme} />
      </g>

      {/* Hin: Kochsalzlösung; zurück: abgesaugt */}
      <Pfeil d="M304 330 C340 354 370 380 400 410 C440 452 480 494 528 528" farbe={F.creme} breite={5} />
      <Pfeil d="M440 540 C424 488 400 444 372 414 C350 392 326 374 302 358" farbe={F.kupferHell} breite={5} />
      <Fluss d="M304 330 C340 354 370 380 400 410 C440 452 480 494 528 528" farbe={F.creme} breite={8} dauer={1.6} ab={0.4} />
      <Fluss d="M440 540 C424 488 400 444 372 414 C350 392 326 374 302 358" farbe={F.kupferHell} breite={8} dauer={1.6} ab={2} />

      <Etikett x={700} y={70} anker="end">
        Spülen und absaugen
      </Etikett>
      <Unterzeile x={700} y={104} anker="end">
        darin: Keime und Zellen
      </Unterzeile>

      <Etikett x={460} y={250} farbe={F.creme}>
        Kochsalzlösung
      </Etikett>
      <Zeiger von={[540, 262]} nach={[452, 460]} />

      <Etikett x={40} y={420}>
        Bronchoskop
      </Etikett>
      <Zeiger von={[110, 392]} nach={[150, 246]} />

      <Etikett x={30} y={640}>
        Lungenbläschen
      </Etikett>
      <Zeiger von={[250, 630]} nach={[404, 612]} />
    </Zeichnung>
  );
}
