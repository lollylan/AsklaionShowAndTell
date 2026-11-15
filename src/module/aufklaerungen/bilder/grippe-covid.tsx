import { Etikett, F, KONTUR, Unterzeile, Zeichnung } from './bausteine';

const LINKS = 80;
const TAG = 58;
/** x-Position eines Tages nach Krankheitsbeginn. */
const x = (tag: number) => LINKS + tag * TAG;
const ACHSE = 440;

/** Fieberverlauf: Grippe schlagartig, Erkältung schleichend – und das kurze Zeitfenster für Mittel gegen Viren. */
export default function GrippeCovid() {
  return (
    <Zeichnung titel="Fieberkurven über zehn Tage: Die Grippe beginnt schlagartig mit hohem Fieber, eine Erkältung langsam und mit wenig Fieber. Darunter zwei Balken: Mittel gegen Viren wirken bei Grippe nur in den ersten zwei, bei COVID-19 in den ersten fünf Tagen">
      <Etikett x={360} y={66} anker="middle">
        Grippe beginnt schlagartig
      </Etikett>
      <Unterzeile x={360} y={98} anker="middle">
        COVID-19 verläuft sehr unterschiedlich
      </Unterzeile>

      {/* Erkältung zum Vergleich */}
      <path
        d={`M${x(0)} ${ACHSE} C160 438 220 395 290 388 C370 382 430 420 520 438 L${x(10)} ${ACHSE}`}
        {...KONTUR}
        stroke={F.leise}
        strokeDasharray="10 12"
      />
      {/* Grippe */}
      <path
        d={`M${x(0)} ${ACHSE} C105 440 125 250 165 240 C235 230 265 262 305 290 C365 330 405 410 465 432 C525 442 600 440 ${x(10)} ${ACHSE}`}
        {...KONTUR}
        stroke={F.kupfer}
        strokeWidth={7}
      />

      <Etikett x={200} y={206} farbe={F.kupferHell}>
        Grippe: plötzlich hohes Fieber
      </Etikett>
      <Unterzeile x={x(10)} y={418} anker="end">
        Erkältung
      </Unterzeile>

      {/* Zeitachse */}
      <path d={`M${x(0)} ${ACHSE} L${x(10)} ${ACHSE}`} {...KONTUR} stroke={F.leise} strokeWidth={3} />
      {[0, 2, 5, 10].map((tag) => (
        <g key={tag}>
          <path d={`M${x(tag)} ${ACHSE - 10} L${x(tag)} ${ACHSE + 10}`} {...KONTUR} stroke={F.leise} strokeWidth={3} />
          <Unterzeile x={x(tag)} y={ACHSE + 38} anker={tag === 0 ? 'start' : tag === 10 ? 'end' : 'middle'}>
            {tag === 0 ? 'Beginn' : `${tag} Tage`}
          </Unterzeile>
        </g>
      ))}

      {/* Zeitfenster für Mittel gegen Viren */}
      <Unterzeile x={x(0)} y={530}>
        Mittel gegen Viren bei hohem Risiko – Beginn bis:
      </Unterzeile>
      <rect x={x(0)} y="552" width={x(2) - x(0)} height="40" rx="20" fill={F.kupfer} />
      <Etikett x={x(2) + 20} y={581}>
        Grippe
      </Etikett>
      <rect x={x(0)} y="612" width={x(5) - x(0)} height="40" rx="20" fill={F.kupferHell} />
      <Etikett x={x(5) + 20} y={641}>
        COVID-19
      </Etikett>
    </Zeichnung>
  );
}
