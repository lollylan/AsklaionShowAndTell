import { Etikett, F, KONTUR, Unterzeile, Zeichnung } from './bausteine';

/** Zeitachse: drei Wochen von x = 60 bis x = 660. */
const X0 = 60;
const PRO_TAG = 600 / 21;
const HAUT = 340;

const tagX = (tag: number) => X0 + tag * PRO_TAG;

/** Knoten als Wölbung über der Haut. */
function Knoten({ tag, r }: { tag: number; r: number }) {
  const x = tagX(tag);
  return (
    <path
      d={`M${x - r} ${HAUT} A${r} ${r} 0 0 1 ${x + r} ${HAUT} Z`}
      fill={F.kupfer}
      stroke={F.kupferHell}
      strokeWidth="3"
      strokeLinejoin="round"
    />
  );
}

/** Verlauf: Der Knoten heilt in ein bis drei Wochen ab; in den ersten Tagen ist ein kleiner Schnitt möglich. */
export default function AnalvenenthromboseBehandlung() {
  return (
    <Zeichnung titel="Zeitleiste über drei Wochen: Der Knoten am After wird von Woche zu Woche kleiner und heilt meist von selbst ab. In den ersten ein bis drei Tagen kann ein kleiner Schnitt sofort Erleichterung bringen">
      <Etikett x={40} y={80}>
        Heilt meist von selbst ab
      </Etikett>
      <Unterzeile x={40} y={112}>
        der Knoten wird Woche für Woche kleiner
      </Unterzeile>

      {/* Hautlinie mit kleiner werdendem Knoten */}
      <line x1="40" y1={HAUT} x2="680" y2={HAUT} {...KONTUR} />
      <Knoten tag={1.5} r={42} />
      <Knoten tag={7} r={30} />
      <Knoten tag={14} r={17} />
      <Knoten tag={20.2} r={7} />

      {/* Achse */}
      <line x1={X0} y1="410" x2={tagX(21)} y2="410" stroke={F.leise} strokeWidth="3" strokeLinecap="round" />
      {[0, 7, 14, 21].map((t) => (
        <line key={t} x1={tagX(t)} y1="400" x2={tagX(t)} y2="420" stroke={F.leise} strokeWidth="3" strokeLinecap="round" />
      ))}
      <Unterzeile x={tagX(0)} y={452} anker="start">
        Beginn
      </Unterzeile>
      <Unterzeile x={tagX(7)} y={452} anker="middle">
        1 Woche
      </Unterzeile>
      <Unterzeile x={tagX(14)} y={452} anker="middle">
        2 Wochen
      </Unterzeile>
      <Unterzeile x={tagX(21)} y={452} anker="end">
        3 Wochen
      </Unterzeile>

      {/* Die ersten drei Tage */}
      <rect x={tagX(0)} y="396" width={3 * PRO_TAG} height="28" rx="14" fill={F.kupfer} opacity="0.85" />

      <Etikett x={40} y={540} farbe={F.kupferHell}>
        In den ersten 1 bis 3 Tagen:
      </Etikett>
      <Unterzeile x={40} y={572}>
        Ein kleiner Schnitt bringt sofort Erleichterung.
      </Unterzeile>
      <Unterzeile x={40} y={636} farbe={F.linie}>
        Sonst helfen Schmerzmittel, Salbe und Sitzbäder.
      </Unterzeile>
    </Zeichnung>
  );
}
