import { Etikett, F, KONTUR, Unterzeile, Zeichnung } from './bausteine';

const LINKS = 70;
const TAG = 56;
/** x-Position der Tage 1 bis 7; danach folgt der Abschnitt in Wochen. */
const x = (tag: number) => LINKS + (tag - 1) * TAG;
const WOCHE_START = x(7) + 50;
const WOCHE_ENDE = 660;

/** Verlauf: Antibiotikum etwa fünf Tage, Kontrolle nach zwei bis drei Tagen, Erholung über Wochen. */
export default function LungenentzuendungVerlauf() {
  return (
    <Zeichnung titel="Zeitleiste: Das Antibiotikum läuft etwa fünf Tage. Nach zwei bis drei Tagen gibt es eine Kontrolle, bis dahin sollte es spürbar besser gehen. Husten und Erschöpfung können danach noch einige Wochen bleiben">
      <Etikett x={360} y={60} anker="middle">
        So geht es weiter
      </Etikett>

      {/* Antibiotikum */}
      <Etikett x={x(1)} y={180}>
        Antibiotikum
      </Etikett>
      <rect x={x(1)} y={196} width={x(6) - x(1)} height="46" rx="23" fill={F.petrolHell} />
      <Unterzeile x={x(6) + 12} y={228}>
        meist 5 Tage
      </Unterzeile>

      {/* Kontrolle */}
      <rect x={x(2.5) - 4} y={260} width="8" height="100" rx="4" fill={F.kupfer} />
      <Etikett x={x(2.5) + 20} y={310} farbe={F.kupferHell}>
        Kontrolle nach 2 bis 3 Tagen
      </Etikett>
      <Unterzeile x={x(2.5) + 20} y={342}>
        Bis dahin spürbar besser?
      </Unterzeile>

      {/* Erholung */}
      <Etikett x={x(4)} y={400}>
        Husten, Erschöpfung
      </Etikett>
      <rect x={x(1)} y={416} width={WOCHE_ENDE - x(1)} height="46" rx="23" fill={F.petrol} fillOpacity="0.5" />
      <rect x={x(1)} y={416} width={x(7) - x(1)} height="46" rx="23" fill={F.petrol} />

      {/* Zeitachse mit Bruch */}
      <path d={`M${x(1)} 520 L${x(7) + 16} 520 M${WOCHE_START - 16} 520 L${WOCHE_ENDE} 520`} {...KONTUR} stroke={F.leise} strokeWidth={3} />
      <path d={`M${x(7) + 22} 534 L${x(7) + 34} 506 M${x(7) + 34} 534 L${x(7) + 46} 506`} {...KONTUR} stroke={F.leise} strokeWidth={3} />
      {[1, 3, 5, 7].map((t) => (
        <Unterzeile key={t} x={x(t)} y={556} anker={t === 1 ? 'start' : 'middle'}>
          {`Tag ${t}`}
        </Unterzeile>
      ))}
      <Unterzeile x={WOCHE_ENDE} y={556} anker="end">
        einige Wochen
      </Unterzeile>

      <Unterzeile x={360} y={640} anker="middle">
        Belastung danach langsam steigern
      </Unterzeile>
    </Zeichnung>
  );
}
