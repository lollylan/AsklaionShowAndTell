import { Etikett, F, KONTUR, Pfeil, Unterzeile, Zeichnung } from './bausteine';

const HAUT = 260;
const SPALTEN = [130, 360, 590];

/** Hautstück mit Warze; `flach` = oberste Schicht schon abgetragen. */
function Hautstueck({ x, flach = false }: { x: number; flach?: boolean }) {
  const h = flach ? 10 : 30;
  return (
    <g>
      <rect x={x - 90} y={HAUT} width="180" height="70" rx="10" fill={F.petrolDunkel} stroke={F.linie} strokeWidth="4" />
      <rect x={x - 88} y={HAUT + 2} width="176" height="16" fill={F.petrolHell} />
      <path
        d={`M${x - 36} ${HAUT + 4} L${x - 30} ${HAUT - h} L${x - 20} ${HAUT - h + 10} L${x - 10} ${HAUT - h - 4} L${x} ${HAUT - h + 8} L${x + 10} ${HAUT - h - 4} L${x + 20} ${HAUT - h + 10} L${x + 30} ${HAUT - h} L${x + 36} ${HAUT + 4} Q${x + 30} ${HAUT + 40} ${x} ${HAUT + 44} Q${x - 30} ${HAUT + 40} ${x - 36} ${HAUT + 4} Z`}
        fill={F.kupfer}
        stroke={F.kupferHell}
        strokeWidth="3"
        strokeLinejoin="round"
      />
    </g>
  );
}

/** Warzen selbst behandeln: einweichen, Lösung auftragen, abtragen – über Wochen wiederholen. */
export default function WarzenSelbst() {
  const [a, b, c] = SPALTEN;
  return (
    <Zeichnung titel="Drei Schritte, die sich über viele Wochen wiederholen: Warze zehn Minuten in warmem Wasser einweichen, die Lösung nur auf die Warze geben und den Rand mit Creme schützen, dann die oberste Schicht mit einer eigenen Feile abtragen">
      {/* 1 Einweichen */}
      <rect x={a - 90} y={HAUT - 80} width="180" height="100" fill={F.petrolHell} fillOpacity="0.35" />
      {[HAUT - 60, HAUT - 34].map((y) => (
        <path key={y} d={`M${a - 76} ${y} q19 -12 38 0 t38 0 t38 0 t38 0`} fill="none" stroke={F.linie} strokeWidth="3" strokeLinecap="round" />
      ))}
      <Hautstueck x={a} />

      {/* 2 Auftragen: Rand mit Creme geschützt */}
      <Hautstueck x={b} />
      <path d={`M${b - 76} ${HAUT} L${b - 38} ${HAUT} M${b + 38} ${HAUT} L${b + 76} ${HAUT}`} stroke={F.creme} strokeWidth="12" strokeLinecap="round" />
      <path d={`M${b + 6} ${HAUT - 130} L${b + 6} ${HAUT - 84} L${b} ${HAUT - 68} L${b - 6} ${HAUT - 84} L${b - 6} ${HAUT - 130} Z`} {...KONTUR} fill={F.petrolHell} />
      <path d={`M${b} ${HAUT - 60} q-6 10 0 14 q6 -4 0 -14 Z`} fill={F.kupferHell} />

      {/* 3 Abtragen mit Feile */}
      <Hautstueck x={c} flach />
      <rect x={c - 70} y={HAUT - 66} width="140" height="22" rx="6" transform={`rotate(-12 ${c} ${HAUT - 55})`} {...KONTUR} fill={F.leise} />
      {[-50, -18, 22, 46].map((d) => (
        <circle key={d} cx={c + d} cy={HAUT - 18 - Math.abs(d) / 6} r="4" fill={F.kupferHell} />
      ))}

      <Pfeil d={`M${a + 100} ${HAUT + 35} L${b - 100} ${HAUT + 35}`} farbe={F.leise} breite={4} />
      <Pfeil d={`M${b + 100} ${HAUT + 35} L${c - 100} ${HAUT + 35}`} farbe={F.leise} breite={4} />

      <Etikett x={a} y={HAUT + 110} anker="middle">
        Einweichen
      </Etikett>
      <Unterzeile x={a} y={HAUT + 140} anker="middle">
        10 Minuten
      </Unterzeile>
      <Unterzeile x={a} y={HAUT + 166} anker="middle">
        warmes Wasser
      </Unterzeile>
      <Etikett x={b} y={HAUT + 110} anker="middle">
        Auftragen
      </Etikett>
      <Unterzeile x={b} y={HAUT + 140} anker="middle">
        nur auf die Warze,
      </Unterzeile>
      <Unterzeile x={b} y={HAUT + 166} anker="middle">
        Rand mit Creme
      </Unterzeile>
      <Etikett x={c} y={HAUT + 110} anker="middle">
        Abtragen
      </Etikett>
      <Unterzeile x={c} y={HAUT + 140} anker="middle">
        oberste Schicht,
      </Unterzeile>
      <Unterzeile x={c} y={HAUT + 166} anker="middle">
        eigene Feile
      </Unterzeile>

      <Pfeil d={`M${c} ${HAUT + 190} Q${c} 500 ${c - 50} 500 L${a + 50} 500 Q${a} 500 ${a} ${HAUT + 192}`} farbe={F.kupferHell} breite={4} />
      <Etikett x={360} y={560} anker="middle" farbe={F.kupferHell}>
        Wiederholen, viele Wochen
      </Etikett>
      <Unterzeile x={360} y={594} anker="middle">
        danach Hände waschen
      </Unterzeile>
    </Zeichnung>
  );
}
