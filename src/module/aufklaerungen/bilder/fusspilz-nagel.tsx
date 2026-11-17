import { Etikett, F, KONTUR, Pfeil, Unterzeile, Zeichnung, Zeiger } from './bausteine';

/** Großer Zeh von oben, Mitte bei x = 0. Unten offen, dort geht er in den Fuß über. */
const ZEH = 'M-95 540 L-95 300 C-95 170 95 170 95 300 L95 540';
/** Nagelplatte, vorderer (freier) Rand oben. */
const NAGEL = 'M-66 248 C-60 212 60 212 66 248 L70 400 C70 424 -70 424 -70 400 Z';
/** Verdickter, krümeliger Rand des Pilznagels. */
const KRUEMEL: [number, number, number][] = [
  [-50, 226, 7],
  [-28, 220, 6],
  [-4, 218, 8],
  [22, 220, 6],
  [46, 226, 7],
  [-38, 240, 5],
  [10, 236, 5],
  [34, 242, 5],
];

/** Zwei große Zehen von oben: links gesunder Nagel, rechts gelblich verdickter Pilznagel. */
export default function FusspilzNagel() {
  return (
    <Zeichnung titel="Zwei große Zehen von oben: links ein gesunder, glatter Nagel, rechts ein Nagel mit Nagelpilz, gelblich, verdickt und vom vorderen Rand her krümelig">
      {/* Gesunder Zeh */}
      <g transform="translate(170 0)">
        <path d={ZEH} {...KONTUR} fill={F.petrol} />
        <path d={NAGEL} fill={F.petrolHell} stroke={F.linie} strokeWidth="3" strokeLinejoin="round" />
        <path d="M-60 392 C-30 380 30 380 60 392" fill="none" stroke={F.leise} strokeWidth="3" strokeLinecap="round" />
      </g>

      {/* Zeh mit Nagelpilz */}
      <g transform="translate(450 0)">
        <path d={ZEH} {...KONTUR} fill={F.petrol} />
        <path d={NAGEL} fill={F.kupferHell} stroke={F.linie} strokeWidth="3" strokeLinejoin="round" />
        {/* Pilz wächst vom vorderen Rand nach hinten */}
        <path d="M-66 248 C-60 212 60 212 66 248 L67 300 C40 320 10 290 -10 330 C-30 300 -50 320 -67 300 Z" fill={F.kupfer} />
        <g stroke={F.kupfer} strokeWidth="4" strokeLinecap="round">
          <line x1="-36" y1="320" x2="-38" y2="372" />
          <line x1="24" y1="316" x2="26" y2="356" />
        </g>
        {KRUEMEL.map(([x, y, r]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r={r} fill={F.kupferHell} stroke={F.kupfer} strokeWidth="2" />
        ))}
      </g>

      <Etikett x={170} y={80} anker="middle">
        Gesunder Nagel
      </Etikett>
      <Unterzeile x={170} y={112} anker="middle">
        glatt und klar
      </Unterzeile>

      <Etikett x={450} y={80} anker="middle" farbe={F.kupferHell}>
        Nagelpilz
      </Etikett>
      <Unterzeile x={450} y={112} anker="middle">
        gelblich, dick, brüchig
      </Unterzeile>

      <Zeiger von={[586, 232]} nach={[502, 230]} />
      <Unterzeile x={690} y={238} anker="end">
        beginnt
      </Unterzeile>
      <Unterzeile x={690} y={266} anker="end">
        meist am
      </Unterzeile>
      <Unterzeile x={690} y={294} anker="end">
        vorderen
      </Unterzeile>
      <Unterzeile x={690} y={322} anker="end">
        Rand
      </Unterzeile>

      {/* Wachstum des Nagels */}
      <Pfeil d="M170 500 L170 440" farbe={F.leise} breite={4} />
      <Unterzeile x={40} y={610}>
        Der Nagel wächst nach vorn:
      </Unterzeile>
      <Unterzeile x={40} y={640}>
        etwa ein Jahr, bis er erneuert ist
      </Unterzeile>
    </Zeichnung>
  );
}
