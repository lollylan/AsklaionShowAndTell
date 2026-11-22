import { Etikett, F, Unterzeile, Zeichnung } from './bausteine';

const BEWEGUNG = 'M100 180 C200 300 260 480 400 530 C484 560 580 556 660 556';
const BETTRUHE = 'M100 180 C220 220 320 330 420 400 C520 460 600 480 660 490';

const WOCHEN: [number, string][] = [
  [1, '1 Woche'],
  [3, '3 Wochen'],
  [6, '6 Wochen'],
];

/** Verlauf des Schmerzes: Wer in Bewegung bleibt, wird schneller besser als mit Bettruhe. */
export default function RueckenschmerzenBehandlung() {
  return (
    <Zeichnung titel="Zwei Kurven über sechs Wochen: Der Schmerz sinkt schnell, wenn man in Bewegung bleibt, und langsamer bei Bettruhe">
      <Etikett x={360} y={70} anker="middle">
        Bewegung bringt schneller Besserung
      </Etikett>

      {/* Achsen */}
      <path d="M100 150 L100 590 L660 590" fill="none" stroke={F.leise} strokeWidth="3" strokeLinecap="round" />
      <Unterzeile x={116} y={160}>
        starker Schmerz
      </Unterzeile>
      {WOCHEN.map(([w, t]) => {
        const x = 100 + (w * 560) / 6;
        return (
          <g key={w}>
            <line x1={x} y1="590" x2={x} y2="602" stroke={F.leise} strokeWidth="3" />
            <Unterzeile x={x} y={630} anker={w === 6 ? 'end' : 'middle'}>
              {t}
            </Unterzeile>
          </g>
        );
      })}

      <path d={BETTRUHE} fill="none" stroke={F.kupfer} strokeWidth="6" strokeDasharray="14 10" strokeLinecap="round" />
      <path d={BEWEGUNG} fill="none" stroke={F.linie} strokeWidth="7" strokeLinecap="round" />

      <Etikett x={470} y={372} farbe={F.kupferHell}>
        Bettruhe
      </Etikett>
      <Etikett x={120} y={545}>
        in Bewegung
      </Etikett>
    </Zeichnung>
  );
}
