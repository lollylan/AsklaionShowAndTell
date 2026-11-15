import { Etikett, F, Haar, KONTUR, KopfVonOben, Unterzeile, Zeichnung } from './bausteine';
import { KahleFlecken } from './haarausfall';

/** Haar mit Wurzel im Lupenfeld; ohne `schaft` ruht die Wurzel nur. */
function Wurzel({ x, schaft }: { x: number; schaft: boolean }) {
  return (
    <g>
      {schaft && (
        <path d={`M${x} 214 L${x} 356`} stroke={F.petrolHell} strokeWidth="9" strokeLinecap="round" />
      )}
      <path
        d={`M${x - 11} 300 L${x - 11} 352 Q${x} 376 ${x + 11} 352 L${x + 11} 300`}
        {...KONTUR}
        strokeWidth={3}
        stroke={schaft ? F.leise : F.kupferHell}
      />
      <circle cx={x} cy="356" r="8" fill={schaft ? F.petrolHell : F.kupfer} />
    </g>
  );
}

/** Kreisrunder Haarausfall: Kopf mit kahlen Flecken, daneben vergrößert die ruhenden Wurzeln. */
export default function HaarausfallKreisrund() {
  return (
    <Zeichnung titel="Kopf von oben mit drei runden kahlen Stellen; daneben vergrößert die Haut einer solchen Stelle, in der die Haarwurzeln noch vorhanden sind, aber kein Haar bilden">
      <Etikett x={210} y={84} anker="middle">
        Runde, kahle Stellen
      </Etikett>
      <Unterzeile x={210} y={116} anker="middle">
        die Haut ist glatt und gesund
      </Unterzeile>

      <g transform="translate(210 340) scale(1.6)">
        <KopfVonOben>
          <Haar />
          <KahleFlecken />
        </KopfVonOben>
      </g>

      {/* Lupe auf eine kahle Stelle */}
      <path d="M182 304 L458 262 M186 330 L470 400" stroke={F.leise} strokeWidth="2" strokeDasharray="6 8" />
      <circle cx="560" cy="306" r="112" fill={F.tief} stroke={F.linie} strokeWidth="4" />
      {/* Haut: Oberfläche und darunterliegende Schicht */}
      <path d="M452 292 L668 292" stroke={F.kupferHell} strokeWidth="6" strokeLinecap="round" />
      <Wurzel x={490} schaft />
      <Wurzel x={537} schaft={false} />
      <Wurzel x={584} schaft={false} />
      <Wurzel x={631} schaft />

      <Etikett x={560} y={160} anker="middle" farbe={F.kupferHell}>
        Wurzeln ruhen
      </Etikett>

      <Etikett x={360} y={596} anker="middle">
        Die Haarwurzeln bleiben erhalten
      </Etikett>
      <Unterzeile x={360} y={632} anker="middle">
        Oft wachsen die Haare von selbst wieder nach
      </Unterzeile>
    </Zeichnung>
  );
}
