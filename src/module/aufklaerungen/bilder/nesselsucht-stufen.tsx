import { Etikett, F, Unterzeile, Zeichnung } from './bausteine';

/** Eine Stufe des Plans als Balken, mittig bei x = 360. */
function Stufe({ y, breite, titel, zeile, basis = false }: { y: number; breite: number; titel: string; zeile: string; basis?: boolean }) {
  return (
    <g>
      <rect
        x={360 - breite / 2}
        y={y}
        width={breite}
        height="104"
        rx="14"
        fill={basis ? F.petrol : F.petrolDunkel}
        stroke={F.linie}
        strokeWidth="4"
      />
      <Etikett x={360} y={y + 46} anker="middle">
        {titel}
      </Etikett>
      <Unterzeile x={360} y={y + 80} anker="middle">
        {zeile}
      </Unterzeile>
    </g>
  );
}

/** Stufen der Behandlung bei Nesselsucht. */
export default function NesselsuchtStufen() {
  return (
    <Zeichnung titel="Behandlung in drei Stufen: zuerst täglich ein Antihistaminikum, reicht das nicht, nach ärztlicher Anweisung mehr davon, dann eine Spritze beim Hautarzt. Bei starkem Schub zusätzlich wenige Tage Kortison">
      <Etikett x={360} y={86} anker="middle">
        Behandlung in Stufen
      </Etikett>

      <Stufe y={170} breite={460} titel="Dann: eine Spritze" zeile="beruhigt die Mastzellen, beim Hautarzt" />
      <Stufe y={300} breite={560} titel="Reicht das nicht: mehr davon" zeile="nur nach ärztlicher Anweisung" />
      <Stufe y={430} breite={640} titel="Antihistaminikum, täglich" zeile="macht nicht müde, z. B. Cetirizin" basis />

      <Etikett x={360} y={612} anker="middle" farbe={F.kupferHell}>
        Bei starkem Schub
      </Etikett>
      <Unterzeile x={360} y={644} anker="middle">
        für wenige Tage Kortison dazu
      </Unterzeile>
    </Zeichnung>
  );
}
