import { Etikett, F, KONTUR, Unterzeile, Zeichnung, Zeiger } from './bausteine';

const SOHLE =
  'M215 630 C170 630 150 595 155 545 C160 490 175 450 170 400 C165 340 140 290 150 230 C158 185 200 165 255 168 C310 171 345 190 345 240 C345 300 320 350 318 410 C316 470 330 530 318 585 C310 620 270 630 215 630 Z';

/** Zehen: Mittelpunkt und Halbachsen, große Zehe links. */
const ZEHEN: [number, number, number, number][] = [
  [186, 132, 30, 36],
  [242, 118, 20, 25],
  [284, 124, 18, 22],
  [320, 140, 16, 20],
  [350, 166, 13, 17],
];

/** Stelle, die man ansehen soll: gestrichelter Ring. */
function Ring({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  return <circle cx={cx} cy={cy} r={r} fill="none" stroke={F.kupferHell} strokeWidth="4" strokeDasharray="10 8" />;
}

/** Fußsohle von unten mit den Stellen für die tägliche Kontrolle, daneben ein Handspiegel. */
export default function DiabetischerFussKontrolle() {
  return (
    <Zeichnung titel="Fußsohle von unten mit markierten Stellen, die man täglich ansehen soll: zwischen den Zehen, am Fußballen und an der Ferse; daneben ein Handspiegel, mit dem man die Sohle sieht">
      <Etikett x={40} y={60}>
        Jeden Abend ansehen
      </Etikett>

      {ZEHEN.map(([cx, cy, rx, ry]) => (
        <ellipse key={cx} cx={cx} cy={cy} rx={rx} ry={ry} fill={F.petrol} stroke={F.linie} strokeWidth="4" />
      ))}
      <path d={SOHLE} fill={F.petrol} />
      <path d={SOHLE} {...KONTUR} />

      <Ring cx={214} cy={158} r={22} />
      <Ring cx={240} cy={240} r={44} />
      <Ring cx={238} cy={574} r={40} />

      <Zeiger von={[412, 112]} nach={[226, 150]} />
      <Etikett x={420} y={120}>
        Zwischen den Zehen
      </Etikett>

      <Zeiger von={[412, 242]} nach={[284, 242]} />
      <Etikett x={420} y={250}>
        Fußballen
      </Etikett>

      <Zeiger von={[412, 572]} nach={[278, 574]} />
      <Etikett x={420} y={580}>
        Ferse
      </Etikett>

      {/* Handspiegel */}
      <path d="M580 446 L626 516" fill="none" stroke={F.linie} strokeWidth="14" strokeLinecap="round" />
      <circle cx="540" cy="390" r="62" fill={F.tief} stroke={F.linie} strokeWidth="4" />
      <path d="M508 362 Q520 344 540 340" fill="none" stroke={F.leise} strokeWidth="4" strokeLinecap="round" />
      <Etikett x={470} y={500} anker="middle">
        Spiegel
      </Etikett>
      <Unterzeile x={470} y={532} anker="middle">
        zeigt die Sohle
      </Unterzeile>
    </Zeichnung>
  );
}
