import { Etikett, F, Unterzeile, Zeichnung } from './bausteine';

/** Sitzungen pro Woche als Punkte: am Anfang 3–4, danach 1–2 zum Halten. */
const WOCHEN = [4, 3, 2, 1, 2, 1, 2, 1];
const ANFANG = 2;

const X0 = 96;
const SPALTE = 76;
const BODEN = 480;
const STUFE = 56;

export default function IontophoresePlan() {
  const mitte = (von: number, bis: number) => X0 + ((von + bis) / 2) * SPALTE;
  return (
    <Zeichnung titel="Beispielplan: in den ersten zwei Wochen drei bis vier Sitzungen pro Woche, danach ein bis zwei Sitzungen pro Woche, um das Ergebnis zu halten; jede Sitzung dauert 10 bis 20 Minuten">
      <Etikett x={40} y={70}>
        Sitzungen pro Woche
      </Etikett>
      <Unterzeile x={40} y={102}>
        ein Beispiel
      </Unterzeile>

      {/* Klammern über den Phasen */}
      <path d={`M${X0 - 26} 262 L${X0 - 26} 248 L${X0 + SPALTE + 26} 248 L${X0 + SPALTE + 26} 262`} fill="none" stroke={F.kupferHell} strokeWidth="3" />
      <Etikett x={mitte(0, 1)} y={196} anker="middle" farbe={F.kupferHell}>
        Anfang
      </Etikett>
      <Unterzeile x={mitte(0, 1)} y={228} anker="middle" farbe={F.linie}>
        3–4 pro Woche
      </Unterzeile>

      <path
        d={`M${X0 + ANFANG * SPALTE - 26} 262 L${X0 + ANFANG * SPALTE - 26} 248 L${X0 + 7 * SPALTE + 26} 248 L${X0 + 7 * SPALTE + 26} 262`}
        fill="none"
        stroke={F.leise}
        strokeWidth="3"
      />
      <Etikett x={mitte(ANFANG, 7)} y={196} anker="middle">
        Danach zum Halten
      </Etikett>
      <Unterzeile x={mitte(ANFANG, 7)} y={228} anker="middle" farbe={F.linie}>
        1–2 pro Woche
      </Unterzeile>

      {WOCHEN.map((n, i) => {
        const x = X0 + i * SPALTE;
        return (
          <g key={i}>
            {Array.from({ length: n }, (_, k) => (
              <circle
                key={k}
                cx={x}
                cy={BODEN - k * STUFE}
                r="22"
                fill={i < ANFANG ? F.kupfer : F.petrolHell}
                stroke={F.linie}
                strokeWidth="3"
              />
            ))}
            <Unterzeile x={x} y={BODEN + 62} anker="middle" farbe={F.linie}>
              {String(i + 1)}
            </Unterzeile>
          </g>
        );
      })}
      <line x1={X0 - 40} y1={BODEN + 32} x2={X0 + 7 * SPALTE + 40} y2={BODEN + 32} stroke={F.leise} strokeWidth="3" strokeLinecap="round" />
      <Unterzeile x={360} y={BODEN + 96} anker="middle">
        Woche
      </Unterzeile>

      <Etikett x={360} y={668} anker="middle">
        Jede Sitzung 10 bis 20 Minuten
      </Etikett>
    </Zeichnung>
  );
}
