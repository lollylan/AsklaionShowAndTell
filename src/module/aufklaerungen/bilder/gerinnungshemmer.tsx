import { Etikett, F, KONTUR, Unterzeile, Zeichnung } from './bausteine';

/** Waagschale an einem Ende des Balkens, Mitte x. */
function Schale({ x }: { x: number }) {
  return (
    <g>
      <path d={`M${x} 256 L${x - 55} 410 M${x} 256 L${x + 55} 410`} fill="none" stroke={F.leise} strokeWidth="3" strokeLinecap="round" />
      <path d={`M${x - 65} 410 L${x + 65} 410 Q${x + 55} 452 ${x} 452 Q${x - 55} 452 ${x - 65} 410 Z`} {...KONTUR} fill={F.petrol} />
    </g>
  );
}

/** Waage: auf der einen Seite das Gerinnsel, auf der anderen die Blutung. */
export default function Gerinnungshemmer() {
  return (
    <Zeichnung titel="Eine Waage im Gleichgewicht: links liegt ein Blutgerinnsel für Schlaganfall und Embolie, rechts ein Blutstropfen für Blutungen. Der Gerinnungshemmer in der Mitte wird für jeden abgewogen">
      <Etikett x={360} y={84} anker="middle">
        Schutz und Risiko abwägen
      </Etikett>
      <Unterzeile x={360} y={170} anker="middle" farbe={F.linie}>
        Gerinnungshemmer
      </Unterzeile>

      {/* Ständer */}
      <rect x="350" y="250" width="20" height="310" rx="6" {...KONTUR} fill={F.petrolDunkel} />
      <path d="M290 590 L430 590 L400 560 L320 560 Z" {...KONTUR} fill={F.petrol} />

      {/* Balken mit Schalen */}
      <rect x="170" y="244" width="380" height="12" rx="6" fill={F.petrolHell} stroke={F.linie} strokeWidth="3" />
      <Schale x={180} />
      <Schale x={540} />
      <circle cx="360" cy="250" r="14" {...KONTUR} fill={F.petrol} />

      {/* Tablette */}
      <rect x="325" y="196" width="70" height="30" rx="15" {...KONTUR} fill={F.petrolHell} />
      <path d="M360 196 L360 226" stroke={F.linie} strokeWidth="3" />

      {/* Gerinnsel */}
      <g fill={F.kupfer} stroke={F.linie} strokeWidth="3">
        <circle cx="160" cy="392" r="18" />
        <circle cx="204" cy="398" r="14" />
        <circle cx="188" cy="384" r="20" />
        <circle cx="176" cy="402" r="12" />
      </g>

      {/* Blutstropfen */}
      <path
        d="M540 318 C530 334 512 356 512 372 A28 28 0 0 0 568 372 C568 356 550 334 540 318 Z"
        {...KONTUR}
        fill={F.kupferHell}
      />

      <Etikett x={180} y={500} anker="middle">
        Gerinnsel
      </Etikett>
      <Unterzeile x={180} y={532} anker="middle">
        Schlaganfall, Embolie
      </Unterzeile>
      <Etikett x={540} y={500} anker="middle">
        Blutung
      </Etikett>
      <Unterzeile x={540} y={532} anker="middle">
        meist klein, selten schwer
      </Unterzeile>

      <Etikett x={360} y={650} anker="middle">
        Wir wägen beides für Sie ab
      </Etikett>
    </Zeichnung>
  );
}
