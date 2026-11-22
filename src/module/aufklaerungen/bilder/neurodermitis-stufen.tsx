import { Etikett, F, Unterzeile, Zeichnung } from './bausteine';

/** Eine Stufe des Plans als Balken, mittig bei x = 360. */
function Stufe({ y, breite, titel, zeile, basis = false }: { y: number; breite: number; titel: string; zeile: string; basis?: boolean }) {
  return (
    <g>
      <rect
        x={360 - breite / 2}
        y={y}
        width={breite}
        height="96"
        rx="14"
        fill={basis ? F.petrol : F.petrolDunkel}
        stroke={basis ? F.kupferHell : F.linie}
        strokeWidth="4"
      />
      <Etikett x={360} y={y + 42} anker="middle" farbe={basis ? F.kupferHell : F.linie}>
        {titel}
      </Etikett>
      <Unterzeile x={360} y={y + 74} anker="middle">
        {zeile}
      </Unterzeile>
    </g>
  );
}

/** Stufenplan: Pflege als Grundlage, darauf Kortison im Schub, Vorbeugen, weitere Mittel. */
export default function NeurodermitisStufen() {
  return (
    <Zeichnung titel="Stufenplan der Behandlung: unten als Grundlage die tägliche rückfettende Pflege, darüber Kortisoncreme im Schub, dann vorbeugendes Eincremen zweimal pro Woche, oben Lichttherapie, Spritzen oder Tabletten">
      <Etikett x={360} y={70} anker="middle">
        Behandlung in Stufen
      </Etikett>
      <Unterzeile x={360} y={102} anker="middle">
        jede Stufe baut auf der unteren auf
      </Unterzeile>

      <Stufe y={170} breite={400} titel="Reicht das nicht:" zeile="Licht, Spritzen oder Tabletten" />
      <Stufe y={286} breite={480} titel="Vorbeugen: 2 × pro Woche" zeile="Creme auf die bekannten Stellen" />
      <Stufe y={402} breite={560} titel="Im Schub: Kortisoncreme" zeile="Gesicht und Lider: kortisonfrei" />
      <Stufe y={518} breite={640} titel="Jeden Tag: rückfettende Pflege" zeile="auch wenn die Haut gut aussieht" basis />
    </Zeichnung>
  );
}
