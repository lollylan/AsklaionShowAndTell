import { Etikett, F, Unterzeile, Zeichnung } from './bausteine';

const OBEN = 100;
const UNTEN = 640;
const MIN = 40;
const MAX = 300;
/** Höhe im Bild zu einem Blutzuckerwert in mg/dl. */
const y = (wert: number) => UNTEN - ((wert - MIN) * (UNTEN - OBEN)) / (MAX - MIN);

const X = 200;
const BREITE = 80;

const ZONEN: { von: number; bis: number; farbe: string }[] = [
  { von: MIN, bis: 70, farbe: F.kupfer },
  { von: 70, bis: 80, farbe: F.petrolDunkel },
  { von: 80, bis: 130, farbe: F.petrolHell },
  { von: 130, bis: 180, farbe: F.petrol },
  { von: 180, bis: 250, farbe: F.petrolDunkel },
  { von: 250, bis: MAX, farbe: F.kupferHell },
];

const MARKEN = [70, 130, 180, 250];

const mitte = (a: number, b: number) => (y(a) + y(b)) / 2;

export default function BlutzuckerWerte() {
  return (
    <Zeichnung titel="Senkrechte Skala in mg/dl wie ein Thermometer: unter 70 Unterzucker, 80 bis 130 gut vor dem Essen, bis 180 zwei Stunden nach dem Essen, über 250 zu hoch und melden">
      <defs>
        <clipPath id="blutzucker-werte-roehre">
          <rect x={X} y={OBEN} width={BREITE} height={UNTEN - OBEN} rx={BREITE / 2} />
        </clipPath>
      </defs>

      <Unterzeile x={X + BREITE / 2} y={OBEN - 22} anker="middle">
        mg/dl
      </Unterzeile>

      <g clipPath="url(#blutzucker-werte-roehre)">
        {ZONEN.map((z) => (
          <rect key={z.von} x={X} y={y(z.bis)} width={BREITE} height={y(z.von) - y(z.bis)} fill={z.farbe} />
        ))}
      </g>
      <rect x={X} y={OBEN} width={BREITE} height={UNTEN - OBEN} rx={BREITE / 2} fill="none" stroke={F.linie} strokeWidth="4" />

      {MARKEN.map((m) => (
        <g key={m}>
          <line x1={X - 22} y1={y(m)} x2={X + BREITE} y2={y(m)} stroke={F.linie} strokeWidth="3" strokeLinecap="round" />
          <text x={X - 32} y={y(m) + 9} textAnchor="end" fontSize="26" fontWeight="700" fill={F.linie}>
            {m}
          </text>
        </g>
      ))}

      <Etikett x={320} y={mitte(250, MAX) + 9} farbe={F.kupferHell}>
        zu hoch: melden
      </Etikett>
      <Etikett x={320} y={mitte(130, 180) + 9}>
        2 Std. nach dem Essen
      </Etikett>
      <Etikett x={320} y={mitte(80, 130) + 9}>
        gut vor dem Essen
      </Etikett>
      <Etikett x={320} y={mitte(MIN, 70) + 9} farbe={F.kupferHell}>
        Unterzucker
      </Etikett>

      <Unterzeile x={360} y={696} anker="middle">
        Ihr Ziel legen wir gemeinsam fest
      </Unterzeile>
    </Zeichnung>
  );
}
