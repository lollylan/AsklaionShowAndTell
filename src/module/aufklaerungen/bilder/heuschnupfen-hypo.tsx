import { Etikett, F, KONTUR, Unterzeile, Zeichnung } from './bausteine';

const LINKS = 70;
const JAHR = 200;
const BODEN = 470;
/** Beschwerden in der Pollenzeit, Jahr für Jahr weniger. */
const HOEHEN = [230, 150, 80];

/** Hyposensibilisierung über drei Jahre: Beschwerden in der Pollenzeit nehmen ab. */
export default function HeuschnupfenHypo() {
  return (
    <Zeichnung titel="Drei Jahre nebeneinander. In jedem Jahr ein Hügel für die Beschwerden in der Pollenzeit, von Jahr zu Jahr niedriger. Darunter ein durchgehendes Band: Spritzen oder Tabletten über drei Jahre">
      <Etikett x={360} y={60} anker="middle">
        Hyposensibilisierung
      </Etikett>
      <Unterzeile x={360} y={94} anker="middle">
        Der Körper gewöhnt sich an die Pollen
      </Unterzeile>

      <Unterzeile x={LINKS} y={190}>
        Beschwerden in der Pollenzeit
      </Unterzeile>
      {HOEHEN.map((h, i) => {
        const mitte = LINKS + i * JAHR + JAHR / 2;
        const d = `M${mitte - 80} ${BODEN} C${mitte - 40} ${BODEN} ${mitte - 30} ${BODEN - h} ${mitte} ${BODEN - h} C${mitte + 30} ${BODEN - h} ${mitte + 40} ${BODEN} ${mitte + 80} ${BODEN}`;
        return (
          <g key={h}>
            <path d={`${d} Z`} fill={F.kupfer} fillOpacity="0.45" />
            <path d={d} fill="none" stroke={F.kupferHell} strokeWidth="5" strokeLinecap="round" />
            <Etikett x={mitte} y={BODEN + 40} anker="middle">
              {`Jahr ${i + 1}`}
            </Etikett>
          </g>
        );
      })}
      <path d={`M${LINKS} ${BODEN} L${LINKS + 3 * JAHR} ${BODEN}`} {...KONTUR} stroke={F.leise} strokeWidth={3} />

      {/* Behandlung läuft durch */}
      <rect x={LINKS} y={550} width={3 * JAHR} height="46" rx="23" fill={F.petrolHell} />
      <Unterzeile x={360} y={580} anker="middle" farbe={F.linie}>
        Spritzen oder Tabletten, drei Jahre lang
      </Unterzeile>
      <Unterzeile x={360} y={650} anker="middle">
        Als Einzige behandelt sie die Ursache
      </Unterzeile>
    </Zeichnung>
  );
}
