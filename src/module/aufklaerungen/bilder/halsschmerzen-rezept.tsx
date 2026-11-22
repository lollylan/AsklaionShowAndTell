import { Etikett, F, KONTUR, Pfeil, Unterzeile, Zeichnung } from './bausteine';

const LINKS = 90;
const SCHRITT = 135;
/** x-Position eines Tages (1 bis 5). */
const x = (tag: number) => LINKS + (tag - 1) * SCHRITT;

/** Rezept für später: erst abwarten, nur bei fehlender Besserung einlösen. */
export default function HalsschmerzenRezept() {
  return (
    <Zeichnung titel="Zeitleiste über fünf Tage: Am ersten Tag gibt es ein Rezept für später. Zwei bis drei Tage wird abgewartet. Geht es dann besser, bleibt das Rezept liegen. Wird es nicht besser, wird es eingelöst">
      <Etikett x={360} y={60} anker="middle">
        Das Rezept für später
      </Etikett>

      {/* Rezeptblatt */}
      <g transform={`translate(${x(1)} 170)`}>
        <rect x="-40" y="-56" width="80" height="104" rx="6" {...KONTUR} fill={F.creme} />
        <path d="M-24 -30 L24 -30 M-24 -10 L24 -10 M-24 10 L10 10" stroke={F.leise} strokeWidth="4" strokeLinecap="round" />
        <circle cx="18" cy="30" r="9" fill={F.kupfer} />
      </g>

      {/* Zeitachse */}
      <path d={`M${x(1)} 290 L${x(5)} 290`} {...KONTUR} stroke={F.leise} strokeWidth={3} />
      {[1, 2, 3, 4, 5].map((t) => (
        <g key={t}>
          <circle cx={x(t)} cy={290} r="8" fill={F.leise} />
          <Unterzeile x={x(t)} y={328} anker="middle">
            {`Tag ${t}`}
          </Unterzeile>
        </g>
      ))}
      {/* Abwarten */}
      <rect x={x(1) + 20} y={232} width={x(3) - x(1) - 40} height="34" rx="17" fill={F.petrolHell} fillOpacity="0.5" />
      <Unterzeile x={(x(1) + x(3)) / 2} y={256} anker="middle" farbe={F.linie}>
        2 bis 3 Tage abwarten
      </Unterzeile>

      {/* Entscheidung nach zwei bis drei Tagen */}
      <Pfeil d={`M${x(3)} 350 C${x(3)} 400 220 400 200 450`} farbe={F.leise} breite={4} />
      <Pfeil d={`M${x(3)} 350 C${x(3)} 400 520 400 530 450`} farbe={F.leise} breite={4} />

      <Etikett x={190} y={510} anker="middle">
        Besser?
      </Etikett>
      <Unterzeile x={190} y={546} anker="middle" farbe={F.linie}>
        Rezept bleibt liegen
      </Unterzeile>

      <Etikett x={530} y={510} anker="middle" farbe={F.kupferHell}>
        Nicht besser?
      </Etikett>
      <Unterzeile x={530} y={546} anker="middle" farbe={F.linie}>
        Rezept einlösen
      </Unterzeile>

      <Unterzeile x={360} y={650} anker="middle">
        Ein Antibiotikum dann bis zum Ende nehmen
      </Unterzeile>
    </Zeichnung>
  );
}
