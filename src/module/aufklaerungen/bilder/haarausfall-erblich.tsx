import { Etikett, F, Haar, KopfVonOben, Unterzeile, Zeichnung } from './bausteine';
import { KahlBeimMann } from './haarausfall';

/** Anlagebedingter Haarausfall: beim Mann Schläfen und Hinterkopf, bei der Frau der Scheitel. */
export default function HaarausfallErblich() {
  return (
    <Zeichnung titel="Zwei Köpfe von oben: beim Mann sind die Schläfen und der Hinterkopf kahl, bei der Frau ist das Haar entlang des Scheitels gelichtet">
      <Etikett x={190} y={84} anker="middle">
        Bei Männern
      </Etikett>
      <Unterzeile x={190} y={116} anker="middle">
        Schläfen und Hinterkopf
      </Unterzeile>
      <Etikett x={530} y={84} anker="middle">
        Bei Frauen
      </Etikett>
      <Unterzeile x={530} y={116} anker="middle">
        der Scheitel wird lichter
      </Unterzeile>

      <g transform="translate(190 344) scale(1.5)">
        <KopfVonOben>
          <Haar />
          <KahlBeimMann />
        </KopfVonOben>
      </g>
      <g transform="translate(530 344) scale(1.5)">
        <KopfVonOben>
          <Haar />
          {/* breiter werdender Mittelscheitel, vorn bleibt ein Saum stehen */}
          <path
            d="M-4 -66 C-20 -40 -24 14 -8 54 Q0 66 8 54 C24 14 20 -40 4 -66 Q0 -70 -4 -66 Z"
            fill={F.kupferHell}
          />
          <path
            d="M-16 -30 L-34 -22 M-18 -4 L-38 6 M-15 24 L-32 36 M16 -30 L34 -22 M18 -4 L38 6 M15 24 L32 36"
            stroke={F.kupferHell}
            strokeWidth="5"
            strokeLinecap="round"
          />
        </KopfVonOben>
      </g>

      <Etikett x={360} y={590} anker="middle">
        Das Haar wächst von Mal zu Mal feiner nach
      </Etikett>
      <Unterzeile x={360} y={626} anker="middle">
        Die Empfindlichkeit der Haarwurzeln ist vererbt
      </Unterzeile>
    </Zeichnung>
  );
}
