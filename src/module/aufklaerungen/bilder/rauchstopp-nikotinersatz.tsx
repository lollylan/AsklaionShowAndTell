import { Etikett, F, KONTUR, Unterzeile, Zeichnung, Zeiger } from './bausteine';

const LINKS = 80;
const RECHTS = 660;
const BODEN = 500;
/** x-Position einer Uhrzeit (7 bis 22 Uhr). */
const x = (uhr: number) => LINKS + ((uhr - 7) / 15) * (RECHTS - LINKS);

/** Kleiner Hügel für einen Kaugummi oder Sprühstoß. */
function huegel(uhr: number) {
  const m = x(uhr);
  return `M${m - 34} 380 C${m - 18} 380 ${m - 12} 300 ${m} 300 C${m + 12} 300 ${m + 18} 380 ${m + 34} 380`;
}

const VERLANGEN = [10, 14.5, 19];

/** Nikotinspiegel über den Tag: Pflaster als gleichmäßiger Sockel, Kurzmittel als kleine Hügel. */
export default function RauchstoppNikotinersatz() {
  return (
    <Zeichnung titel="Nikotin im Blut über einen Tag: Das Pflaster gibt gleichmäßig von morgens bis abends eine Grundmenge ab. Bei plötzlichem Verlangen kommen Kaugummi, Lutschtablette oder Spray als kleine Spitzen dazu">
      <Etikett x={360} y={64} anker="middle">
        Nikotinersatz über den Tag
      </Etikett>
      <Unterzeile x={360} y={98} anker="middle">
        Lindert den Entzug – ohne Teer und Rauch
      </Unterzeile>

      {/* Pflaster: gleichmäßiger Sockel */}
      <rect x={x(7)} y={380} width={x(22) - x(7)} height={BODEN - 380} fill={F.petrolHell} />
      {VERLANGEN.map((u) => (
        <path key={u} d={`${huegel(u)} Z`} fill={F.kupferHell} stroke={F.kupfer} strokeWidth="3" />
      ))}

      {/* Achsen */}
      <path d={`M${LINKS} 200 L${LINKS} ${BODEN} L${RECHTS + 20} ${BODEN}`} {...KONTUR} stroke={F.leise} strokeWidth={3} />
      <Unterzeile x={LINKS + 12} y={200}>
        Nikotin im Blut
      </Unterzeile>
      {[
        [7, 'morgens'],
        [14.5, 'mittags'],
        [22, 'abends'],
      ].map(([u, text]) => (
        <Unterzeile key={text} x={x(u as number)} y={BODEN + 32} anker={u === 7 ? 'start' : u === 22 ? 'end' : 'middle'}>
          {text}
        </Unterzeile>
      ))}

      <Zeiger von={[200, 600]} nach={[x(12), 450]} />
      <Etikett x={40} y={630}>
        Pflaster
      </Etikett>
      <Unterzeile x={40} y={660}>
        den ganzen Tag gleichmäßig
      </Unterzeile>

      <Zeiger von={[520, 600]} nach={[x(19), 320]} />
      <Etikett x={690} y={630} anker="end" farbe={F.kupferHell}>
        Kaugummi, Spray
      </Etikett>
      <Unterzeile x={690} y={660} anker="end">
        bei plötzlichem Verlangen
      </Unterzeile>
    </Zeichnung>
  );
}
