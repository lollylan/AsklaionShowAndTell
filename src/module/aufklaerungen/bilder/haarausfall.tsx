import { Etikett, F, Haar, KopfVonOben, Unterzeile, Zeichnung } from './bausteine';

/** Kahle Stellen beim anlagebedingten Haarausfall des Mannes: beide Schläfen und der Hinterkopf. */
export function KahlBeimMann() {
  return (
    <g fill={F.kupferHell}>
      <ellipse cx="-44" cy="-66" rx="24" ry="34" transform="rotate(24 -44 -66)" />
      <ellipse cx="44" cy="-66" rx="24" ry="34" transform="rotate(-24 44 -66)" />
      <circle cx="0" cy="38" r="29" />
    </g>
  );
}

/** Runde, scharf begrenzte kahle Stellen. */
export function KahleFlecken() {
  return (
    <g fill={F.kupferHell} stroke={F.linie} strokeWidth="2.5">
      <circle cx="-30" cy="-22" r="23" />
      <circle cx="36" cy="30" r="17" />
      <circle cx="-10" cy="58" r="12" />
    </g>
  );
}

/** Drei Köpfe von oben: Die Verteilung des Haarausfalls weist auf die Ursache. */
export default function Haarausfall() {
  return (
    <Zeichnung titel="Drei Köpfe von oben mit unterschiedlichem Haarausfall: kahle Schläfen und Hinterkopf, runde kahle Flecken, und gleichmäßig dünnes Haar am ganzen Kopf">
      <Etikett x={360} y={96} anker="middle">
        Wo fehlen die Haare?
      </Etikett>
      <Unterzeile x={360} y={130} anker="middle">
        Das Muster weist auf die Ursache
      </Unterzeile>

      <g transform="translate(128 320)">
        <KopfVonOben>
          <Haar />
          <KahlBeimMann />
        </KopfVonOben>
      </g>
      <g transform="translate(360 320)">
        <KopfVonOben>
          <Haar />
          <KahleFlecken />
        </KopfVonOben>
      </g>
      <g transform="translate(592 320)">
        <KopfVonOben>
          <Haar licht />
        </KopfVonOben>
      </g>

      <Etikett x={128} y={482} anker="middle">
        An Stirn, Scheitel
      </Etikett>
      <Unterzeile x={128} y={514} anker="middle">
        meist Veranlagung
      </Unterzeile>
      <Etikett x={360} y={482} anker="middle">
        Runde Flecken
      </Etikett>
      <Unterzeile x={360} y={514} anker="middle">
        Abwehrsystem
      </Unterzeile>
      <Etikett x={592} y={482} anker="middle">
        Überall dünner
      </Etikett>
      <Unterzeile x={592} y={514} anker="middle">
        Eisen, Schilddrüse,
      </Unterzeile>
      <Unterzeile x={592} y={542} anker="middle">
        Belastung
      </Unterzeile>

      <Unterzeile x={360} y={640} anker="middle">
        Bis zu 100 Haare am Tag zu verlieren ist normal
      </Unterzeile>
    </Zeichnung>
  );
}
