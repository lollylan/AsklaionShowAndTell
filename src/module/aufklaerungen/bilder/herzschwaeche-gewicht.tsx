import { Etikett, F, Unterzeile, Zeichnung, Zeiger } from './bausteine';

const TAGE = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
const KILO = [78.0, 78.2, 77.9, 78.1, 79.0, 79.9, 80.6];

const x = (i: number) => 140 + i * 82;
const y = (kg: number) => 540 - (kg - 77) * 80;

const linie = (von: number, bis: number) =>
  KILO.slice(von, bis + 1)
    .map((kg, j) => `${j === 0 ? 'M' : 'L'}${x(von + j)} ${y(kg)}`)
    .join(' ');

/** Gewichtstagebuch über eine Woche: gleichbleibend, dann rasche Zunahme durch Wasser. */
export default function HerzschwaecheGewicht() {
  return (
    <Zeichnung titel="Gewichtskurve über eine Woche: von Montag bis Donnerstag gleich um 78 Kilo, dann steigt sie in drei Tagen um mehr als 2 Kilo an – ein Zeichen, dass sich Wasser sammelt">
      <Etikett x={40} y={58}>
        Jeden Morgen wiegen
      </Etikett>
      <Unterzeile x={40} y={90}>
        nach der Toilette, vor dem Frühstück
      </Unterzeile>

      {/* Hilfslinien */}
      {[78, 80].map((kg) => (
        <g key={kg}>
          <line x1="120" y1={y(kg)} x2="680" y2={y(kg)} stroke={F.leise} strokeWidth="2" strokeOpacity="0.4" strokeDasharray="4 8" />
          <Unterzeile x={40} y={y(kg) + 8}>
            {`${kg} kg`}
          </Unterzeile>
        </g>
      ))}

      {/* Kurve: ruhig, dann steil */}
      <path d={linie(0, 3)} fill="none" stroke={F.petrolHell} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      <path d={linie(3, 6)} fill="none" stroke={F.kupfer} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      {KILO.map((kg, i) => (
        <circle key={TAGE[i]} cx={x(i)} cy={y(kg)} r="10" fill={i > 3 ? F.kupfer : F.petrolHell} stroke={F.linie} strokeWidth="3" />
      ))}
      {TAGE.map((t, i) => (
        <Unterzeile key={t} x={x(i)} y={596} anker="middle">
          {t}
        </Unterzeile>
      ))}

      <Zeiger von={[520, 200]} nach={[x(5) + 4, y(KILO[5]) - 16]} />
      <Etikett x={180} y={170} farbe={F.kupferHell}>
        Mehr als 2 Kilo in 3 Tagen
      </Etikett>
      <Unterzeile x={180} y={200}>
        Wasser sammelt sich
      </Unterzeile>

      <Etikett x={360} y={664} anker="middle">
        Dann bitte gleich bei uns melden
      </Etikett>
    </Zeichnung>
  );
}
