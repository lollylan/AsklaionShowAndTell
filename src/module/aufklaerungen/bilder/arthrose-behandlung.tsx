import { Etikett, F, KONTUR, Unterzeile, Zeichnung } from './bausteine';

/** Stufen der Arthrose-Behandlung: breite Basis Bewegung, darüber Schmerzmittel, oben das künstliche Gelenk. */
export default function ArthroseBehandlung() {
  return (
    <Zeichnung titel="Treppe der Behandlung: unten breit Bewegung und Übungen als Grundlage, darüber Schmerzmittel in schlechten Phasen, ganz oben schmal ein künstliches Gelenk, wenn nichts anderes mehr hilft">
      <Etikett x={360} y={80} anker="middle">
        Die Behandlung baut aufeinander auf
      </Etikett>
      <Unterzeile x={360} y={116} anker="middle">
        von unten nach oben
      </Unterzeile>

      {/* oben: künstliches Gelenk */}
      <rect x="230" y="178" width="260" height="124" rx="14" {...KONTUR} fill={F.kupfer} />
      <Etikett x={360} y={234} anker="middle" farbe={F.tief}>
        Neues Gelenk
      </Etikett>
      <Unterzeile x={360} y={268} anker="middle" farbe={F.tief}>
        wenn nichts mehr hilft
      </Unterzeile>

      {/* Mitte: Schmerzmittel */}
      <rect x="140" y="320" width="440" height="124" rx="14" {...KONTUR} fill={F.petrolHell} />
      <Etikett x={360} y={376} anker="middle">
        Schmerzmittel
      </Etikett>
      <Unterzeile x={360} y={410} anker="middle" farbe={F.linie}>
        in schlechten Phasen, Salbe oder kurz
      </Unterzeile>

      {/* unten: Bewegung */}
      <rect x="50" y="462" width="620" height="150" rx="14" {...KONTUR} fill={F.petrol} />
      <Etikett x={360} y={526} anker="middle">
        Bewegung und Übungen
      </Etikett>
      <Unterzeile x={360} y={562} anker="middle" farbe={F.linie}>
        die Grundlage – jeden Tag
      </Unterzeile>
    </Zeichnung>
  );
}
