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

/** Behandlung je nach Ausmaß: Cremes, Licht, dann Tabletten oder Spritzen. */
export default function SchuppenflechteStufen() {
  return (
    <Zeichnung titel="Behandlung je nach Ausmaß in drei Stufen: bei wenigen Stellen Creme oder Gel, bei vielen Stellen Lichttherapie, reicht das nicht, Tabletten oder Spritzen">
      <Etikett x={360} y={86} anker="middle">
        Behandlung nach Ausmaß
      </Etikett>
      <Unterzeile x={360} y={118} anker="middle">
        dicke Schuppen vorher mit Salbe lösen
      </Unterzeile>

      <Stufe y={196} breite={440} titel="Reicht das nicht:" zeile="Tabletten oder Spritzen" />
      <Stufe y={326} breite={540} titel="Viele Stellen: Lichttherapie" zeile="meist beim Hautarzt" />
      <Stufe y={456} breite={640} titel="Wenige Stellen: Creme oder Gel" zeile="Kortison mit Vitamin-D-Abkömmling" basis />

      <Unterzeile x={360} y={630} anker="middle">
        Tägliche Pflege gehört immer dazu
      </Unterzeile>
    </Zeichnung>
  );
}
