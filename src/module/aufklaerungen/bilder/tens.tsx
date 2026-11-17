import { Etikett, F, KONTUR, Unterzeile, Zeichnung, Zeiger } from './bausteine';
import { Elektrode, Impuls, Kabel } from './tens-teile';

/** TENS-Gerät mit zwei Kanälen, je ein Kabel zu zwei Klebe-Elektroden. */
export default function Tens() {
  return (
    <Zeichnung titel="Ein kleines TENS-Gerät mit Anzeige und Plus- und Minus-Tasten; zwei Kabel führen zu vier Klebe-Elektroden, die sanfte Stromimpulse an die Haut geben">
      {/* Kabel, Kanal 1 und Kanal 2 */}
      <Kabel d="M254 330 C340 330 400 150 540 150 M540 150 L470 207 M540 150 L610 207" />
      <Kabel d="M254 430 C340 430 420 390 540 390 M540 390 L470 447 M540 390 L610 447" />
      <circle cx="540" cy="150" r="7" fill={F.leise} />
      <circle cx="540" cy="390" r="7" fill={F.leise} />

      {/* Gerät */}
      <rect x="70" y="220" width="180" height="320" rx="32" {...KONTUR} fill={F.petrolDunkel} />
      <rect x="96" y="250" width="128" height="88" rx="12" fill={F.tief} stroke={F.leise} strokeWidth="3" />
      <Impuls x={112} y={294} breite={96} hoehe={30} />
      {/* Minus- und Plus-Taste */}
      <circle cx="122" cy="400" r="26" {...KONTUR} fill={F.petrol} />
      <path d="M110 400 L134 400" {...KONTUR} />
      <circle cx="198" cy="400" r="26" {...KONTUR} fill={F.petrol} />
      <path d="M186 400 L210 400 M198 388 L198 412" {...KONTUR} />
      {/* Kanalbuchsen rechts */}
      <rect x="244" y="318" width="16" height="24" rx="4" fill={F.leise} />
      <rect x="244" y="418" width="16" height="24" rx="4" fill={F.leise} />
      <circle cx="160" cy="490" r="10" fill={F.petrolHell} stroke={F.linie} strokeWidth="3" />

      {/* Elektroden */}
      <Elektrode x={470} y={230} groesse={54} />
      <Elektrode x={610} y={230} groesse={54} />
      <Elektrode x={470} y={470} groesse={54} />
      <Elektrode x={610} y={470} groesse={54} />

      {/* Kribbeln zwischen den Elektroden */}
      <Impuls x={510} y={230} breite={60} hoehe={22} />
      <Etikett x={540} y={305} anker="middle" farbe={F.kupferHell}>
        sanfte Stromimpulse
      </Etikett>

      <Etikett x={160} y={600} anker="middle">
        TENS-Gerät
      </Etikett>

      <Zeiger von={[330, 512]} nach={[352, 418]} />
      <Etikett x={330} y={545} anker="middle">
        Kabel
      </Etikett>

      <Zeiger von={[600, 568]} nach={[610, 494]} />
      <Etikett x={690} y={600} anker="end">
        Elektroden
      </Etikett>
      <Unterzeile x={690} y={632} anker="end">
        kleben auf der Haut
      </Unterzeile>
    </Zeichnung>
  );
}
