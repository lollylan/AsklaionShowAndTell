import { Etikett, F, Pfeil, Unterzeile, Zeichnung } from './bausteine';

/** Kasten mit mittiger Beschriftung. */
function Stelle({ x, y, text, farbe }: { x: number; y: number; text: string; farbe: string }) {
  return (
    <g>
      <rect x={x} y={y} width={250} height={100} rx="18" fill={farbe} stroke={F.linie} strokeWidth="4" />
      <Etikett x={x + 125} y={y + 59} anker="middle">
        {text}
      </Etikett>
    </g>
  );
}

/** Weg der elektronischen Krankschreibung: Praxis → Krankenkasse, Arbeitgeber ruft ab; Sie melden sich selbst. */
export default function Krankschreibung() {
  return (
    <Zeichnung titel="Weg der elektronischen Krankschreibung: Die Praxis schickt sie elektronisch an die Krankenkasse, der Arbeitgeber ruft sie dort ab. Krankmelden müssen Sie sich beim Arbeitgeber trotzdem selbst">
      <Stelle x={40} y={130} text="Praxis" farbe={F.petrol} />
      <Stelle x={430} y={130} text="Krankenkasse" farbe={F.petrolDunkel} />
      <Stelle x={430} y={440} text="Arbeitgeber" farbe={F.petrolDunkel} />

      {/* Praxis → Kasse */}
      <Pfeil d="M304 180 L414 180" farbe={F.petrolHell} />
      <Unterzeile x={360} y={276} anker="middle" farbe={F.linie}>
        elektronisch
      </Unterzeile>

      {/* Kasse → Arbeitgeber (Abruf) */}
      <Pfeil d="M555 246 L555 424" farbe={F.petrolHell} />
      <Unterzeile x={574} y={344} farbe={F.linie}>
        ruft ab
      </Unterzeile>

      {/* Sie */}
      <circle cx="160" cy="430" r="32" fill={F.creme} stroke={F.linie} strokeWidth="4" />
      <path
        d="M100 548 C100 490 124 474 160 474 C196 474 220 490 220 548 Z"
        fill={F.petrolHell}
        stroke={F.linie}
        strokeWidth="4"
        strokeLinejoin="round"
      />

      {/* Sie → Arbeitgeber */}
      <Pfeil d="M240 490 L414 490" farbe={F.kupfer} />
      <Etikett x={40} y={624} farbe={F.kupferHell}>
        Sie melden sich krank
      </Etikett>
      <Unterzeile x={40} y={658} farbe={F.linie}>
        am ersten Tag, vor Arbeitsbeginn
      </Unterzeile>
    </Zeichnung>
  );
}
