import { Etikett, F, Unterzeile, Zeichnung } from './bausteine';

const MASS = 48; // Pixel je mmHg

/** Ein Balken: wie stark eine Maßnahme den oberen Wert ungefähr senkt. */
function Zeile({ y, titel, von, bis }: { y: number; titel: string; von: number; bis?: number }) {
  const ende = 40 + (bis ?? von) * MASS;
  return (
    <g>
      <Etikett x={40} y={y}>
        {titel}
      </Etikett>
      {bis && <rect x="40" y={y + 18} width={bis * MASS} height="36" rx="18" fill={F.petrol} stroke={F.petrolHell} strokeWidth="3" />}
      <rect x="40" y={y + 18} width={von * MASS} height="36" rx="18" fill={F.petrolHell} />
      <Etikett x={ende + 18} y={y + 46}>
        {bis ? `${von} bis ${bis}` : `etwa ${von}`}
      </Etikett>
    </g>
  );
}

/** Balken: Wie viel Bewegung, weniger Salz, Abnehmen und weniger Alkohol den Blutdruck senken. */
export default function BluthochdruckSenken() {
  return (
    <Zeichnung titel="Vier Balken zeigen, um wie viel der obere Blutdruckwert ungefähr sinkt: regelmäßige Bewegung 5 bis 8, Salz sparen etwa 5, fünf Kilo abnehmen etwa 5, wenig Alkohol etwa 4. Zusammen oft so viel wie eine Tablette">
      <Etikett x={40} y={58}>
        So viel sinkt der obere Wert
      </Etikett>
      <Unterzeile x={40} y={90}>
        ungefähr, in mmHg
      </Unterzeile>

      <Zeile y={160} titel="Regelmäßig bewegen" von={5} bis={8} />
      <Zeile y={270} titel="Salz sparen" von={5} />
      <Zeile y={380} titel="5 Kilo abnehmen" von={5} />
      <Zeile y={490} titel="Wenig Alkohol" von={4} />

      <line x1="40" y1="590" x2="680" y2="590" stroke={F.leise} strokeWidth="2" strokeLinecap="round" />
      <Etikett x={360} y={636} anker="middle" farbe={F.kupferHell}>
        Zusammen oft so viel wie eine Tablette
      </Etikett>
      <Unterzeile x={360} y={670} anker="middle">
        Jede Maßnahme hilft für sich
      </Unterzeile>
    </Zeichnung>
  );
}
