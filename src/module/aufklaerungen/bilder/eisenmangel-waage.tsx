import { Etikett, F, KONTUR, Unterzeile, Zeichnung } from './bausteine';

/** Blutstropfen, Spitze oben. */
function Tropfen({ x, y }: { x: number; y: number }) {
  return (
    <path
      d={`M${x} ${y - 22} C${x + 6} ${y - 10} ${x + 16} ${y} ${x + 16} ${y + 8} A16 16 0 0 1 ${x - 16} ${y + 8} C${x - 16} ${y} ${x - 6} ${y - 10} ${x} ${y - 22} Z`}
      fill={F.kupfer}
    />
  );
}

/** Waagschale an einem Ende des Balkens. */
function Schale({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <path d={`M${x} ${y - 90} L${x - 70} ${y} M${x} ${y - 90} L${x + 70} ${y}`} stroke={F.leise} strokeWidth="2" />
      <path d={`M${x - 80} ${y} Q${x} ${y + 50} ${x + 80} ${y} Z`} {...KONTUR} fill={F.petrol} />
    </g>
  );
}

/** Eisenmangel als Waage: Aufnahme auf der einen, Verlust und Mehrbedarf auf der anderen Seite. */
export default function EisenmangelWaage() {
  return (
    <Zeichnung titel="Eine Waage: Auf der leichten Seite liegt die Aufnahme von Eisen aus dem Essen über den Darm. Die schwere Seite mit Blutstropfen steht für Verlust und Mehrbedarf: Regelblutung, Blutungen in Magen oder Darm, Schwangerschaft und Wachstum">
      {/* Ständer */}
      <path d="M360 170 L360 600 M290 600 L430 600" {...KONTUR} />
      {/* Balken, rechts schwerer */}
      <path d="M150 130 L570 210" {...KONTUR} strokeWidth={6} />
      <circle cx="360" cy="170" r="12" fill={F.linie} />

      <Schale x={150} y={220} />
      <Schale x={570} y={300} />

      {/* Wenig Eisen links */}
      <circle cx="130" cy="210" r="10" fill={F.petrolHell} stroke={F.linie} strokeWidth="2" />
      <circle cx="160" cy="208" r="10" fill={F.petrolHell} stroke={F.linie} strokeWidth="2" />

      {/* Blutstropfen rechts */}
      <Tropfen x={532} y={276} />
      <Tropfen x={570} y={270} />
      <Tropfen x={608} y={276} />
      <Tropfen x={551} y={236} />
      <Tropfen x={589} y={236} />

      <Etikett x={160} y={330} anker="middle">
        Aufnahme
      </Etikett>
      <Unterzeile x={160} y={360} anker="middle">
        aus dem Essen
      </Unterzeile>
      <Unterzeile x={160} y={388} anker="middle">
        über den Darm
      </Unterzeile>

      <Etikett x={560} y={410} anker="middle" farbe={F.kupferHell}>
        Verlust und Bedarf
      </Etikett>
      <Unterzeile x={560} y={442} anker="middle">
        Regelblutung
      </Unterzeile>
      <Unterzeile x={560} y={470} anker="middle">
        Blutung in Magen, Darm
      </Unterzeile>
      <Unterzeile x={560} y={498} anker="middle">
        Schwangerschaft
      </Unterzeile>
      <Unterzeile x={560} y={526} anker="middle">
        Wachstum
      </Unterzeile>

      <Etikett x={360} y={662} anker="middle">
        Woher kommt der Mangel?
      </Etikett>
    </Zeichnung>
  );
}
