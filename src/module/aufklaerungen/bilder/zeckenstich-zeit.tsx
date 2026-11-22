import { Etikett, F, KONTUR, Unterzeile, Zeichnung } from './bausteine';

const LINKS = 80;
const RECHTS = 660;
const BODEN = 480;
const OBEN = 200;
/** x-Position nach Stunden (0 bis 48). */
const x = (stunden: number) => LINKS + (stunden / 48) * (RECHTS - LINKS);

const BORRELIEN = `M${x(0)} ${BODEN - 4} C${x(10)} ${BODEN - 4} ${x(16)} ${BODEN - 20} ${x(24)} ${BODEN - 110} S${x(40)} ${OBEN + 20} ${x(48)} ${OBEN + 10}`;

/** Wie schnell die Erreger übergehen: FSME sofort, Borrelien erst nach Stunden. */
export default function ZeckenstichZeit() {
  return (
    <Zeichnung titel="Diagramm über zwei Tage nach dem Stich. Das FSME-Virus geht sofort über, als gleichbleibendes Band von Anfang an. Die Kurve für Borrelien bleibt in den ersten Stunden niedrig und steigt dann mit jeder Stunde Saugen an">
      <Etikett x={360} y={60} anker="middle">
        Je früher die Zecke raus ist, desto besser
      </Etikett>
      <Unterzeile x={LINKS + 12} y={OBEN - 30}>
        Risiko einer Übertragung
      </Unterzeile>

      {/* FSME: sofort */}
      <rect x={x(0)} y={BODEN - 150} width={x(48) - x(0)} height="30" rx="15" fill={F.petrolHell} fillOpacity="0.6" />
      <Unterzeile x={x(1)} y={BODEN - 128} farbe={F.linie}>
        FSME
      </Unterzeile>
      {/* Borrelien: steigend */}
      <path d={BORRELIEN} fill="none" stroke={F.kupferHell} strokeWidth="6" strokeLinecap="round" />

      <path d={`M${LINKS} ${OBEN - 10} L${LINKS} ${BODEN} L${RECHTS + 20} ${BODEN}`} {...KONTUR} stroke={F.leise} strokeWidth={3} />
      {[
        [0, 'Stich'],
        [24, '1 Tag'],
        [48, '2 Tage'],
      ].map(([h, text]) => (
        <Unterzeile key={text} x={x(h as number)} y={BODEN + 34} anker={h === 0 ? 'start' : h === 48 ? 'end' : 'middle'}>
          {text}
        </Unterzeile>
      ))}

      <Etikett x={40} y={590}>
        FSME-Virus
      </Etikett>
      <Unterzeile x={40} y={622}>
        geht sofort über – Schutz
      </Unterzeile>
      <Unterzeile x={40} y={652}>
        gibt nur die Impfung
      </Unterzeile>

      <Etikett x={690} y={590} anker="end" farbe={F.kupferHell}>
        Borrelien
      </Etikett>
      <Unterzeile x={690} y={622} anker="end">
        erst nach Stunden,
      </Unterzeile>
      <Unterzeile x={690} y={652} anker="end">
        dann immer mehr
      </Unterzeile>
    </Zeichnung>
  );
}
