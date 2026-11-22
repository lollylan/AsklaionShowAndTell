import { Etikett, F, KONTUR, Unterzeile, Zeichnung, Zeiger } from './bausteine';

const MONATE = ['Sep', 'Okt', 'Nov', 'Dez', 'Jan', 'Feb', 'Mär', 'Apr'];
const LINKS = 70;
const BREITE = 580 / MONATE.length;
/** x-Position am Monatsanfang (0 = September). */
const x = (monat: number) => LINKS + monat * BREITE;
const BODEN = 470;

const WELLE = `M${x(2)} ${BODEN} C${x(3.2)} ${BODEN} ${x(4)} 230 ${x(4.9)} 230 C${x(5.8)} 230 ${x(6.4)} ${BODEN} ${x(7.6)} ${BODEN}`;

/** Spritze als einfaches Symbol. */
function Spritze({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g transform={`translate(${cx} ${cy}) rotate(-35)`}>
      <rect x="-40" y="-13" width="70" height="26" rx="5" {...KONTUR} fill={F.creme} />
      <rect x="-40" y="-13" width="34" height="26" rx="5" fill={F.kupferHell} />
      <path d="M30 0 L62 0 M-40 0 L-58 0 M-58 -14 L-58 14" {...KONTUR} />
    </g>
  );
}

/** Impfung im Herbst, bevor die Welle im Winter kommt. */
export default function GrippeCovidImpfung() {
  return (
    <Zeichnung titel="Zeitleiste von September bis April. Die Grippe- und Coronawelle steigt meist ab Dezember an und erreicht im Januar und Februar ihren Gipfel. Die Impfung im Oktober und November kommt rechtzeitig davor; beide Impfungen können am selben Termin gegeben werden">
      <Etikett x={360} y={60} anker="middle">
        Impfen, bevor die Welle kommt
      </Etikett>
      <Unterzeile x={360} y={94} anker="middle">
        Grippe und Corona am selben Termin möglich
      </Unterzeile>

      {/* Impfzeit */}
      <rect x={x(1)} y={180} width={x(3) - x(1)} height={BODEN - 180} fill={F.petrolHell} fillOpacity="0.35" />
      <Spritze cx={(x(1) + x(3)) / 2} cy={240} />

      {/* Welle */}
      <path d={`${WELLE} Z`} fill={F.kupfer} fillOpacity="0.45" />
      <path d={WELLE} fill="none" stroke={F.kupferHell} strokeWidth="5" strokeLinecap="round" />

      {/* Monate */}
      <path d={`M${x(0)} ${BODEN} L${x(8)} ${BODEN}`} {...KONTUR} stroke={F.leise} strokeWidth={3} />
      {MONATE.map((m, i) => (
        <Unterzeile key={m} x={x(i) + BREITE / 2} y={BODEN + 34} anker="middle">
          {m}
        </Unterzeile>
      ))}

      <Zeiger von={[190, 585]} nach={[x(2), 470]} />
      <Etikett x={40} y={610}>
        Impfung im Herbst
      </Etikett>
      <Unterzeile x={40} y={642}>
        Schutz steht nach etwa 2 Wochen
      </Unterzeile>

      <Zeiger von={[520, 585]} nach={[x(4.9), 300]} />
      <Etikett x={690} y={610} anker="end" farbe={F.kupferHell}>
        Die Welle
      </Etikett>
      <Unterzeile x={690} y={642} anker="end">
        meist im Winter
      </Unterzeile>
    </Zeichnung>
  );
}
