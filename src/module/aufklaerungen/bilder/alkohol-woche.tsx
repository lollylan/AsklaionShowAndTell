import { Etikett, F, KONTUR, Unterzeile, Zeichnung } from './bausteine';

const TAGE = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
const FREI = new Set(['Mo', 'Di', 'Do']);
const OBEN = 230;

/** Wasserglas (frei) oder kleines Weinglas. */
function Glas({ x, frei }: { x: number; frei: boolean }) {
  const y = OBEN + 60;
  if (frei) {
    return (
      <g>
        <path d={`M${x - 16} ${y - 30} L${x + 16} ${y - 30} L${x + 12} ${y + 28} L${x - 12} ${y + 28} Z`} {...KONTUR} strokeWidth={3} />
        <path d={`M${x - 14} ${y - 10} L${x + 14} ${y - 10} L${x + 12} ${y + 26} L${x - 12} ${y + 26} Z`} fill={F.leise} fillOpacity="0.6" />
      </g>
    );
  }
  return (
    <g>
      <path d={`M${x - 16} ${y - 32} L${x + 16} ${y - 32} C${x + 17} ${y - 8} ${x + 10} ${y} ${x} ${y + 1} C${x - 10} ${y} ${x - 17} ${y - 8} ${x - 16} ${y - 32} Z`} {...KONTUR} strokeWidth={3} />
      <path d={`M${x} ${y + 1} L${x} ${y + 24} M${x - 12} ${y + 26} L${x + 12} ${y + 26}`} {...KONTUR} strokeWidth={3} />
    </g>
  );
}

/** Eine Woche mit festen alkoholfreien Tagen. */
export default function AlkoholWoche() {
  return (
    <Zeichnung titel="Eine Woche von Montag bis Sonntag, drei Tage sind fest als alkoholfreie Tage markiert. Darunter Hilfen: kleinere Gläser, Wasser dazwischen, alkoholfreie Getränke">
      <Etikett x={360} y={110} anker="middle">
        Alkoholfreie Tage fest einplanen
      </Etikett>
      <Unterzeile x={360} y={142} anker="middle">
        mehrere Tage pro Woche
      </Unterzeile>

      {TAGE.map((t, i) => {
        const x = 40 + i * 92;
        const frei = FREI.has(t);
        return (
          <g key={t}>
            <rect
              x={x}
              y={OBEN}
              width="80"
              height="120"
              rx="12"
              fill={frei ? F.petrolHell : F.petrolDunkel}
              stroke={frei ? F.kupferHell : F.leise}
              strokeWidth={frei ? 5 : 3}
            />
            <Unterzeile x={x + 40} y={OBEN - 14} anker="middle" farbe={F.linie}>
              {t}
            </Unterzeile>
            <Glas x={x + 40} frei={frei} />
            {frei && (
              <Unterzeile x={x + 40} y={OBEN + 154} anker="middle" farbe={F.kupferHell}>
                frei
              </Unterzeile>
            )}
          </g>
        );
      })}

      <Etikett x={360} y={500} anker="middle">
        Das hilft auch:
      </Etikett>
      <Unterzeile x={360} y={536} anker="middle">
        kleinere Gläser, Wasser dazwischen,
      </Unterzeile>
      <Unterzeile x={360} y={564} anker="middle">
        alkoholfreie Getränke
      </Unterzeile>
    </Zeichnung>
  );
}
