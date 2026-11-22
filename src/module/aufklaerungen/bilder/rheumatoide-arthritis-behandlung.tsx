import { Etikett, F, Unterzeile, Zeichnung } from './bausteine';

const METHOTREXAT = 'M100 560 C380 560 400 240 660 230';
const KORTISON = 'M100 262 C250 272 350 520 500 556 L660 560';

const WOCHEN: [number, string, 'start' | 'middle' | 'end'][] = [
  [0, 'Beginn', 'start'],
  [6, '6 Wochen', 'middle'],
  [12, '12 Wochen', 'end'],
];

/** Kortison wirkt sofort und überbrückt die Wochen, bis Methotrexat seine volle Wirkung hat. */
export default function RheumatoideArthritisBehandlung() {
  return (
    <Zeichnung titel="Zwei Kurven über zwölf Wochen: Die Wirkung von Methotrexat steigt langsam an und ist nach einigen Wochen voll da; Kortison wirkt am Anfang stark und wird dann langsam weniger">
      <Etikett x={360} y={70} anker="middle">
        Wirkung der Medikamente
      </Etikett>

      <path d="M100 150 L100 590 L660 590" fill="none" stroke={F.leise} strokeWidth="3" strokeLinecap="round" />
      {WOCHEN.map(([w, t, a]) => {
        const x = 100 + (w * 560) / 12;
        return (
          <g key={w}>
            <line x1={x} y1="590" x2={x} y2="602" stroke={F.leise} strokeWidth="3" />
            <Unterzeile x={x} y={630} anker={a}>
              {t}
            </Unterzeile>
          </g>
        );
      })}

      <path d={KORTISON} fill="none" stroke={F.kupfer} strokeWidth="6" strokeDasharray="14 10" strokeLinecap="round" />
      <path d={METHOTREXAT} fill="none" stroke={F.linie} strokeWidth="7" strokeLinecap="round" />

      <Etikett x={120} y={200} farbe={F.kupferHell}>
        Kortison
      </Etikett>
      <Unterzeile x={120} y={232}>
        überbrückt den Anfang
      </Unterzeile>

      <Etikett x={660} y={400} anker="end">
        Methotrexat
      </Etikett>
      <Unterzeile x={660} y={432} anker="end">
        wirkt nach Wochen
      </Unterzeile>
    </Zeichnung>
  );
}
