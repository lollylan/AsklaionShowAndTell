import { Etikett, F, KONTUR, Unterzeile, Zeichnung } from './bausteine';

const LINKS = 70;
const TAG = 140;
/** x-Position am Beginn eines Behandlungstags (1 bis 5). */
const x = (tag: number) => LINKS + (tag - 1) * TAG;
const ENDE = 660;

/** Ab dem zweiten Behandlungstag wieder in Kita oder Schule – wenn keine Krankheitszeichen mehr. */
export default function ScharlachKita() {
  return (
    <Zeichnung titel="Zeitleiste ab Beginn des Antibiotikums. Ansteckend ist man etwa bis zum ersten Behandlungstag, an diesem Tag bleibt das Kind zu Hause. Ab dem zweiten Behandlungstag ist Kita oder Schule wieder erlaubt, wenn keine Krankheitszeichen mehr da sind. Das Antibiotikum läuft weiter, so lange wie besprochen">
      <Etikett x={360} y={60} anker="middle">
        Wann wieder in Kita oder Schule?
      </Etikett>

      <Etikett x={LINKS} y={160}>
        Antibiotikum
      </Etikett>
      <rect x={x(1)} y={176} width={ENDE - x(1)} height="44" rx="22" fill={F.petrolHell} />
      <Unterzeile x={ENDE - 20} y={206} anker="end" farbe={F.tief}>
        so lange wie besprochen
      </Unterzeile>

      <Etikett x={LINKS} y={290} farbe={F.kupferHell}>
        Ansteckend
      </Etikett>
      <rect x={x(1)} y={306} width={TAG} height="44" rx="22" fill={F.kupfer} />

      <Etikett x={LINKS} y={420}>
        Kita, Schule
      </Etikett>
      <rect x={x(1)} y={436} width={TAG - 8} height="44" rx="22" fill="none" stroke={F.kupfer} strokeWidth="4" />
      <Unterzeile x={x(1) + TAG / 2 - 4} y={466} anker="middle" farbe={F.linie}>
        zu Hause
      </Unterzeile>
      <rect x={x(2)} y={436} width={ENDE - x(2)} height="44" rx="22" fill={F.petrol} />
      <Unterzeile x={(x(2) + ENDE) / 2} y={466} anker="middle" farbe={F.linie}>
        wieder erlaubt
      </Unterzeile>

      <path d={`M${x(1)} 530 L${ENDE} 530`} {...KONTUR} stroke={F.leise} strokeWidth={3} />
      {[1, 2, 3, 4].map((t) => (
        <Unterzeile key={t} x={x(t) + TAG / 2} y={566} anker="middle">
          {`Tag ${t}`}
        </Unterzeile>
      ))}

      <Unterzeile x={360} y={630} anker="middle" farbe={F.linie}>
        Nur ohne Krankheitszeichen, ein Attest braucht es nicht
      </Unterzeile>
      <Unterzeile x={360} y={662} anker="middle">
        Bitte die Einrichtung informieren
      </Unterzeile>
    </Zeichnung>
  );
}
