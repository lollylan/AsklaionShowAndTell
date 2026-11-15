import { Etikett, F, KONTUR, Pfeil, Unterzeile, Zeichnung, Zeiger } from './bausteine';

const BLASE = 'M250 170 C250 100 470 100 470 170 C470 260 420 310 360 315 C300 310 250 260 250 170 Z';

/** PSA-Teilchen im Blutgefäß rechts. */
const IM_BLUT: [number, number][] = [
  [583, 210],
  [592, 300],
  [578, 400],
  [590, 480],
  [582, 570],
];

/** Harnblase und Prostata von vorn; die Prostata gibt PSA ins Blut ab. */
export default function Psa() {
  return (
    <Zeichnung titel="Harnblase und darunter die Prostata, durch die die Harnröhre läuft; aus der Prostata gelangt PSA in ein Blutgefäß und lässt sich dort messen">
      {/* Blutgefäß */}
      <rect x="555" y="120" width="60" height="530" fill={F.petrolDunkel} />
      <path d="M555 120 L555 650 M615 120 L615 650" {...KONTUR} />
      {IM_BLUT.map(([x, y]) => (
        <circle key={y} cx={x} cy={y} r="7" fill={F.kupferHell} />
      ))}

      {/* Blase, Prostata, Harnröhre */}
      <path d={BLASE} fill={F.petrol} />
      <path d={BLASE} {...KONTUR} />
      <ellipse cx="360" cy="380" rx="85" ry="62" fill={F.kupfer} stroke={F.kupferHell} strokeWidth="4" />
      <path d="M360 312 L360 600" fill="none" stroke={F.creme} strokeWidth="12" strokeLinecap="round" />

      {/* PSA tritt aus */}
      <circle cx="470" cy="372" r="7" fill={F.kupferHell} />
      <circle cx="500" cy="392" r="7" fill={F.kupferHell} />
      <Pfeil d="M462 410 L540 410" farbe={F.kupferHell} />

      <Zeiger von={[178, 168]} nach={[256, 190]} />
      <Etikett x={40} y={176}>
        Harnblase
      </Etikett>

      <Zeiger von={[166, 382]} nach={[280, 382]} />
      <Etikett x={40} y={390} farbe={F.kupferHell}>
        Prostata
      </Etikett>
      <Unterzeile x={40} y={422}>
        bildet das PSA
      </Unterzeile>

      <Zeiger von={[178, 552]} nach={[354, 540]} />
      <Etikett x={40} y={560}>
        Harnröhre
      </Etikett>

      <Etikett x={585} y={92} anker="middle">
        Blutgefäß
      </Etikett>
      <Unterzeile x={585} y={690} anker="middle">
        PSA gelangt ins Blut
      </Unterzeile>
    </Zeichnung>
  );
}
