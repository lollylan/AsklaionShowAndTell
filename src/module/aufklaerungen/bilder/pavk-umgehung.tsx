import { Etikett, F, Fluss, KONTUR, Pfeil, Unterzeile, Zeichnung } from './bausteine';

/** Beinschlagader von oben nach unten mit Engstelle; x = Mitte des Gefäßes. */
function Schlagader({ x }: { x: number }) {
  return (
    <g>
      <rect x={x - 24} y="140" width="48" height="460" fill={F.petrolDunkel} />
      <path d={`M${x - 24} 320 Q${x + 4} 370 ${x - 24} 420 Z`} fill={F.kupfer} />
      <path d={`M${x + 24} 320 Q${x - 4} 370 ${x + 24} 420 Z`} fill={F.kupfer} />
      <path d={`M${x - 24} 140 L${x - 24} 600 M${x + 24} 140 L${x + 24} 600`} {...KONTUR} />
    </g>
  );
}

/** Vorher und nach Gehtraining: Um die Engstelle wachsen Umgehungsgefäße. */
export default function PavkUmgehung() {
  return (
    <Zeichnung titel="Zwei Beinschlagadern mit derselben Engstelle. Links kommt unterhalb nur wenig Blut an. Rechts sind nach Gehtraining feine Umgehungsgefäße um die Engstelle gewachsen, und mehr Blut erreicht die Wade">
      <Etikett x={190} y={58} anker="middle">
        Vorher
      </Etikett>
      <Unterzeile x={190} y={90} anker="middle">
        Engstelle bremst das Blut
      </Unterzeile>
      <Etikett x={530} y={58} anker="middle" farbe={F.kupferHell}>
        Nach Gehtraining
      </Etikett>
      <Unterzeile x={530} y={90} anker="middle">
        Umgehungen wachsen
      </Unterzeile>

      {/* Links: nur die Engstelle */}
      <Schlagader x={190} />
      <Pfeil d="M190 160 L190 290" farbe={F.petrolHell} breite={6} />
      <Fluss d="M190 150 L190 330" farbe={F.linie} breite={8} dauer={1.2} />
      <Fluss d="M190 430 L190 590" farbe={F.linie} breite={8} dauer={3.6} ab={1.8} />
      <path d="M190 450 L190 580" stroke={F.petrolHell} strokeWidth="4" strokeDasharray="4 14" strokeLinecap="round" />

      {/* Rechts: Umgehungsgefäße */}
      <g className="pavk-umgehung-wachsen" fill="none" stroke={F.petrolHell} strokeWidth="7" strokeLinecap="round">
        <path d="M506 270 C446 300 440 440 506 476" pathLength={1} />
        <path d="M554 250 C630 290 630 450 554 492" pathLength={1} />
        <path d="M506 300 C478 340 478 400 506 440" strokeWidth="5" pathLength={1} />
      </g>
      <g className="pavk-umgehung-umgehungsfluss">
        <Fluss d="M506 270 C446 300 440 440 506 476" farbe={F.linie} breite={7} dauer={1.2} />
        <Fluss d="M554 250 C630 290 630 450 554 492" farbe={F.linie} breite={7} dauer={1.2} ab={0.6} />
      </g>
      <Schlagader x={530} />
      <Pfeil d="M530 160 L530 290" farbe={F.petrolHell} breite={6} />
      <Pfeil d="M530 450 L530 580" farbe={F.petrolHell} breite={6} />
      <Fluss d="M530 150 L530 330" farbe={F.linie} breite={8} dauer={1.2} />
      <g className="pavk-umgehung-umgehungsfluss">
        <Fluss d="M530 430 L530 590" farbe={F.linie} breite={8} dauer={1.2} />
      </g>

      <Etikett x={360} y={660} anker="middle">
        Täglich gehen, über Monate dranbleiben
      </Etikett>
    </Zeichnung>
  );
}
