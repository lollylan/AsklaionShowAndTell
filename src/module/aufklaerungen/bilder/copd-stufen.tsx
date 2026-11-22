import { Etikett, F, KONTUR, Unterzeile, Zeichnung } from './bausteine';
import { Spray } from './asthma-sprays';

/** Sauerstoff-Flasche als einfaches Symbol. */
function Flasche({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M-8 -50 L-8 -64 L8 -64 L8 -50" {...KONTUR} />
      <rect x="-24" y="-50" width="48" height="96" rx="18" {...KONTUR} fill={F.petrol} />
      <Unterzeile x={0} y={8} anker="middle" farbe={F.linie}>
        O₂
      </Unterzeile>
    </g>
  );
}

const STUFEN = [
  { x: 60, oben: 450, titel: 'Erweiterer', unter: 'Spray, jeden Tag', farbe: F.petrolHell },
  { x: 260, oben: 350, titel: '+ Kortison', unter: 'bei Schüben', farbe: F.petrol },
  { x: 460, oben: 250, titel: '+ Sauerstoff', unter: 'wenn schwer', farbe: F.petrolDunkel },
];

/** Stufenplan: Grundlage für alle, darüber je nach Schwere mehr Behandlung. */
export default function CopdStufen() {
  return (
    <Zeichnung titel="Treppe mit drei Stufen auf einem breiten Sockel. Sockel für alle: Rauchstopp, Bewegung, Impfungen, Lungensport. Erste Stufe: erweiterndes Spray jeden Tag. Zweite Stufe: dazu Kortisonspray bei Schüben. Dritte Stufe: dazu Sauerstoff bei schwerer COPD">
      <Etikett x={360} y={70} anker="middle">
        Behandlung in Stufen
      </Etikett>
      <Unterzeile x={360} y={104} anker="middle">
        Je schwerer die COPD, desto mehr kommt dazu
      </Unterzeile>

      {STUFEN.map((s, i) => (
        <g key={s.titel}>
          <rect x={s.x} y={s.oben} width="200" height={556 - s.oben} fill={s.farbe} stroke={F.linie} strokeWidth="4" />
          <Etikett x={s.x + 100} y={s.oben - 46} anker="middle">
            {s.titel}
          </Etikett>
          <Unterzeile x={s.x + 100} y={s.oben - 16} anker="middle">
            {s.unter}
          </Unterzeile>
          {i < 2 ? (
            <Spray x={s.x + 112} y={s.oben + 64} farbe={F.creme} groesse={0.8} />
          ) : (
            <Flasche x={s.x + 100} y={s.oben + 110} />
          )}
        </g>
      ))}

      {/* Sockel für alle */}
      <rect x="40" y="556" width="640" height="96" rx="14" fill={F.kupfer} stroke={F.linie} strokeWidth="4" />
      <Etikett x={360} y={596} anker="middle">
        Für alle: Rauchstopp, Bewegung,
      </Etikett>
      <Etikett x={360} y={630} anker="middle">
        Impfungen, Lungensport
      </Etikett>
    </Zeichnung>
  );
}
