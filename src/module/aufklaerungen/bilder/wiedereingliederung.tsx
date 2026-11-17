import { Etikett, F, Unterzeile, Zeichnung } from './bausteine';

/** Stufenplan: Arbeitsstunden pro Tag steigen in Stufen bis zur vollen Arbeit; die Krankschreibung läuft durchgehend mit. */
const STUFEN = [
  { stunden: 2, text: '2 Std.' },
  { stunden: 4, text: '4 Std.' },
  { stunden: 6, text: '6 Std.' },
];

const LINKS = 90;
const BODEN = 470;
const BREITE = 130;
const PRO_STUNDE = 38;

export default function Wiedereingliederung() {
  const vollX = LINKS + STUFEN.length * BREITE + 20;
  return (
    <Zeichnung titel="Stufenplan der Wiedereingliederung: erst zwei, dann vier, dann sechs Stunden am Tag, danach wieder voll arbeiten; die Krankschreibung läuft bis zum Ende der Stufen ohne Lücke mit">
      <Etikett x={40} y={62}>
        Stunden pro Tag
      </Etikett>
      <Unterzeile x={40} y={94}>
        Beispiel: alle zwei Wochen eine Stufe mehr
      </Unterzeile>

      {/* Grundlinie */}
      <line x1={LINKS - 20} y1={BODEN} x2={680} y2={BODEN} stroke={F.leise} strokeWidth="3" strokeLinecap="round" />

      {/* Stufen */}
      {STUFEN.map((s, i) => {
        const x = LINKS + i * BREITE;
        const h = s.stunden * PRO_STUNDE;
        return (
          <g key={s.text}>
            <rect
              x={x}
              y={BODEN - h}
              width={BREITE - 14}
              height={h}
              rx="8"
              fill={i === 0 ? F.petrolDunkel : i === 1 ? F.petrol : F.petrolHell}
              stroke={F.linie}
              strokeWidth="4"
            />
            <Etikett x={x + (BREITE - 14) / 2} y={BODEN - h - 16} anker="middle">
              {s.text}
            </Etikett>
          </g>
        );
      })}

      {/* Volle Arbeit */}
      <rect
        x={vollX}
        y={BODEN - 8 * PRO_STUNDE}
        width={150}
        height={8 * PRO_STUNDE}
        rx="8"
        fill={F.kupfer}
        stroke={F.linie}
        strokeWidth="4"
      />
      <Etikett x={vollX + 75} y={BODEN - 8 * PRO_STUNDE - 46} anker="middle" farbe={F.kupferHell}>
        Wieder voll
      </Etikett>
      <Unterzeile x={vollX + 75} y={BODEN - 8 * PRO_STUNDE - 16} anker="middle">
        z. B. 8 Std.
      </Unterzeile>

      {/* Krankschreibung läuft durchgehend */}
      <rect x={LINKS} y={BODEN + 34} width={STUFEN.length * BREITE - 14} height={30} rx="15" fill={F.kupferHell} />
      <Etikett x={LINKS} y={BODEN + 112}>
        Durchgehend krankgeschrieben
      </Etikett>
      <Unterzeile x={LINKS} y={BODEN + 144}>
        meist mit Krankengeld – ohne Lücke
      </Unterzeile>
      <Unterzeile x={vollX + 75} y={BODEN + 56} anker="middle">
        danach wieder
      </Unterzeile>
      <Unterzeile x={vollX + 75} y={BODEN + 82} anker="middle">
        arbeitsfähig
      </Unterzeile>
    </Zeichnung>
  );
}
