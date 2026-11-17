import { Etikett, F, KONTUR, Pfeil, Unterzeile, Zeichnung } from './bausteine';

/** Becken von vorn: Blase, Harnröhre und der Beckenboden als Hängematte – angespannt gehoben. */
export default function Harninkontinenz() {
  const boden = 'M230 466 Q360 500 490 466';
  const locker = 'M230 466 Q360 548 490 466';
  return (
    <Zeichnung titel="Becken von vorn mit Blase und Harnröhre. Der Beckenboden spannt sich wie eine Hängematte darunter; beim Anspannen zieht er nach innen oben und verschließt die Harnröhre besser, danach wird er wieder locker gelassen">
      {/* Beckenknochen */}
      <path d="M128 130 C96 270 140 400 230 466" {...KONTUR} stroke={F.leise} strokeWidth="6" />
      <path d="M592 130 C624 270 580 400 490 466" {...KONTUR} stroke={F.leise} strokeWidth="6" />

      {/* Harnröhre */}
      <path d="M350 330 L350 576 M370 330 L370 576" stroke={F.linie} strokeWidth="4" strokeLinecap="round" />

      {/* Blase */}
      <path
        d="M360 176 C424 176 452 220 448 260 C444 300 400 318 374 330 L346 330 C320 318 276 300 272 260 C268 220 296 176 360 176 Z"
        fill={F.petrolHell}
        stroke={F.linie}
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <Etikett x={360} y={266} anker="middle">
        Blase
      </Etikett>

      {/* Beckenboden: locker (gestrichelt) und angespannt */}
      <path d={locker} fill="none" stroke={F.leise} strokeWidth="4" strokeDasharray="4 12" strokeLinecap="round" />
      <path d={boden} fill="none" stroke={F.linie} strokeWidth="22" strokeLinecap="round" />
      <path d={boden} fill="none" stroke={F.kupfer} strokeWidth="14" strokeLinecap="round" />
      <circle cx="230" cy="466" r="12" fill={F.leise} />
      <circle cx="490" cy="466" r="12" fill={F.leise} />

      <Pfeil d="M290 606 L290 540" farbe={F.kupferHell} />
      <Pfeil d="M430 606 L430 540" farbe={F.kupferHell} />

      <Etikett x={334} y={404} anker="end">
        Harnröhre
      </Etikett>
      <Etikett x={470} y={566} farbe={F.kupferHell}>
        Beckenboden
      </Etikett>

      <Etikett x={360} y={656} anker="middle">
        Anspannen: nach innen oben ziehen
      </Etikett>
      <Unterzeile x={360} y={690} anker="middle">
        einige Sekunden halten, dann locker lassen
      </Unterzeile>
    </Zeichnung>
  );
}
