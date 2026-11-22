import { Etikett, F, KONTUR, Unterzeile, Zeichnung, Zeiger } from './bausteine';

/** Rechte Fußsohle von unten, Zehen oben. */
const SOHLE =
  'M300 210 C340 190 420 196 440 240 C458 280 440 330 430 380 C420 430 432 480 430 530 C428 600 390 650 340 650 C290 650 260 610 262 550 C264 490 284 450 280 400 C276 340 256 300 262 260 C266 236 280 220 300 210 Z';

const ZEHEN: [number, number, number][] = [
  [302, 160, 30],
  [356, 150, 21],
  [398, 160, 18],
  [432, 180, 15],
  [458, 208, 13],
];

/** Tägliche Fußkontrolle: Zehenzwischenräume, Ballen, Ferse. */
export default function PolyneuropathieSelbst() {
  return (
    <Zeichnung titel="Fußsohle von unten mit den Stellen, die man jeden Tag ansehen sollte: zwischen den Zehen, am Ballen und an der Ferse; eine kleine Wunde am Ballen fällt sonst nicht auf">
      <Etikett x={360} y={60} anker="middle">
        Jeden Tag die Füße ansehen
      </Etikett>
      <Unterzeile x={360} y={94} anker="middle">
        auch die Sohle – mit einem Spiegel
      </Unterzeile>

      <path d={SOHLE} {...KONTUR} fill={F.petrol} />
      {ZEHEN.map(([x, y, r]) => (
        <ellipse key={x} cx={x} cy={y} rx={r} ry={r * 1.2} {...KONTUR} fill={F.petrol} />
      ))}

      {/* Kontrollstellen */}
      <ellipse cx="370" cy="268" rx="62" ry="40" fill="none" stroke={F.leise} strokeWidth="3" strokeDasharray="6 6" />
      <ellipse cx="346" cy="592" rx="56" ry="44" fill="none" stroke={F.leise} strokeWidth="3" strokeDasharray="6 6" />
      {/* kleine Wunde am Ballen */}
      <circle cx="330" cy="258" r="11" fill={F.kupfer} stroke={F.kupferHell} strokeWidth="3" />

      <Zeiger von={[180, 170]} nach={[330, 190]} />
      <Etikett x={40} y={180}>
        zwischen
      </Etikett>
      <Etikett x={40} y={212}>
        den Zehen
      </Etikett>

      <Zeiger von={[252, 322]} nach={[324, 266]} />
      <Etikett x={40} y={330} farbe={F.kupferHell}>
        kleine Wunde?
      </Etikett>
      <Unterzeile x={40} y={362}>
        gleich zu uns
      </Unterzeile>

      <Zeiger von={[530, 300]} nach={[420, 282]} />
      <Etikett x={540} y={310}>
        Ballen
      </Etikett>

      <Zeiger von={[530, 592]} nach={[402, 592]} />
      <Etikett x={540} y={600}>
        Ferse
      </Etikett>
    </Zeichnung>
  );
}
