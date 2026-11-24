import { Etikett, F, KONTUR, Unterzeile, Zeichnung } from './bausteine';

/** x-Position eines INR-Werts auf der Skala von 1 bis 5. */
const x = (wert: number) => 80 + (wert - 1) * 140;

const OBEN = 380;
const HOEHE = 50;

/** INR-Skala von 1 bis 5 mit dem Zielbereich 2 bis 3 bei Marcumar. */
export default function GerinnungshemmerInr() {
  return (
    <Zeichnung spiegelbar titel="Skala des INR-Werts von 1 bis 5: ohne Gerinnungshemmer etwa 1, unter Marcumar meist Ziel 2 bis 3. Darunter droht ein Gerinnsel, darüber eine Blutung">
      <defs>
        <clipPath id="gerinnungshemmer-inr-balken">
          <rect x={x(1)} y={OBEN} width={x(5) - x(1)} height={HOEHE} rx={HOEHE / 2} />
        </clipPath>
      </defs>

      <Etikett x={360} y={150} anker="middle">
        Der INR-Wert bei Marcumar
      </Etikett>
      <Unterzeile x={360} y={184} anker="middle">
        ohne Gerinnungshemmer etwa 1
      </Unterzeile>

      {/* Balken */}
      <g clipPath="url(#gerinnungshemmer-inr-balken)">
        <rect x={x(1)} y={OBEN} width={x(2) - x(1)} height={HOEHE} fill={F.petrolDunkel} />
        <rect x={x(2)} y={OBEN} width={x(3) - x(2)} height={HOEHE} fill={F.petrolHell} />
        <rect x={x(3)} y={OBEN} width={x(4) - x(3)} height={HOEHE} fill={F.kupferHell} />
        <rect x={x(4)} y={OBEN} width={x(5) - x(4)} height={HOEHE} fill={F.kupfer} />
      </g>
      <rect x={x(1)} y={OBEN} width={x(5) - x(1)} height={HOEHE} rx={HOEHE / 2} {...KONTUR} />

      {/* Zielbereich */}
      <path d={`M${x(2)} 362 L${x(2)} 346 L${x(3)} 346 L${x(3)} 362`} {...KONTUR} />
      <Etikett x={(x(2) + x(3)) / 2} y={320} anker="middle">
        Ziel meist 2 bis 3
      </Etikett>

      {/* Zahlen */}
      {[1, 2, 3, 4, 5].map((wert) => (
        <g key={wert}>
          <line x1={x(wert)} y1={OBEN + HOEHE + 6} x2={x(wert)} y2={OBEN + HOEHE + 16} stroke={F.leise} strokeWidth="3" strokeLinecap="round" />
          <Unterzeile x={x(wert)} y={474} anker="middle">
            {wert}
          </Unterzeile>
        </g>
      ))}

      <Etikett x={x(1)} y={550}>
        Gerinnsel-Gefahr
      </Etikett>
      <Unterzeile x={x(1)} y={582}>
        Schutz zu gering
      </Unterzeile>
      <Etikett x={x(5)} y={550} anker="end" farbe={F.kupferHell}>
        Blutungs-Gefahr
      </Etikett>
      <Unterzeile x={x(5)} y={582} anker="end">
        Blut zu dünn
      </Unterzeile>
    </Zeichnung>
  );
}
