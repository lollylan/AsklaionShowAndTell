import { Etikett, F, KONTUR, Unterzeile, Zeichnung, Zeiger } from './bausteine';

/** Zeile auf dem Blatt: Kästchen (optional angekreuzt) und Schreiblinie bis ende. */
function Zeile({ y, ende, haken }: { y: number; ende: number; haken: boolean }) {
  return (
    <g>
      <rect x="100" y={y - 12} width="24" height="24" rx="4" {...KONTUR} strokeWidth="3" />
      {haken && (
        <path
          d={`M105 ${y} L111 ${y + 6} L120 ${y - 7}`}
          fill="none"
          stroke={F.linie}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
      <line x1="142" y1={y} x2={ende} y2={y} stroke={F.leise} strokeWidth="4" strokeLinecap="round" />
    </g>
  );
}

/** Ein ausgefülltes Blatt: Situationen, gewünschte Maßnahmen, Datum und Unterschrift. */
export default function Patientenverfuegung() {
  return (
    <Zeichnung titel="Ein Blatt Papier mit der Überschrift Patientenverfügung: oben angekreuzte Situationen, darunter angekreuzte Maßnahmen, unten Datum und eigenhändige Unterschrift">
      {/* Blatt mit umgeknickter Ecke */}
      <path d="M70 60 L340 60 L390 110 L390 660 L70 660 Z" {...KONTUR} fill={F.petrolDunkel} />
      <path d="M340 60 L340 110 L390 110" {...KONTUR} />

      <Etikett x={222} y={128} anker="middle">
        Patientenverfügung
      </Etikett>
      <line x1="100" y1="150" x2="344" y2="150" stroke={F.leise} strokeWidth="2" strokeLinecap="round" />

      {/* Situationen */}
      <Zeile y={200} ende={340} haken />
      <Zeile y={240} ende={310} haken={false} />
      <Zeile y={280} ende={350} haken />

      {/* Maßnahmen */}
      <line x1="100" y1="326" x2="344" y2="326" stroke={F.leise} strokeWidth="2" strokeLinecap="round" />
      <Zeile y={372} ende={330} haken />
      <Zeile y={412} ende={350} haken={false} />
      <Zeile y={452} ende={300} haken />
      <Zeile y={492} ende={340} haken />

      {/* Datum und Unterschrift */}
      <line x1="100" y1="610" x2="170" y2="610" stroke={F.leise} strokeWidth="4" strokeLinecap="round" />
      <line x1="200" y1="610" x2="360" y2="610" stroke={F.leise} strokeWidth="4" strokeLinecap="round" />
      <path
        d="M208 596 C218 560 232 560 230 588 C228 604 244 574 256 572 C266 571 258 598 270 594 C284 589 292 566 302 572 C312 578 300 600 316 594 C328 589 338 580 352 584"
        fill="none"
        stroke={F.kupfer}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <Zeiger von={[432, 240]} nach={[366, 240]} />
      <Etikett x={444} y={236}>
        Situationen
      </Etikett>
      <Unterzeile x={444} y={266}>
        wann sie gilt
      </Unterzeile>

      <Zeiger von={[432, 432]} nach={[366, 432]} />
      <Etikett x={444} y={428}>
        Maßnahmen
      </Etikett>
      <Unterzeile x={444} y={458}>
        was Sie wünschen
      </Unterzeile>

      <Zeiger von={[432, 590]} nach={[364, 588]} />
      <Etikett x={444} y={586}>
        Unterschrift
      </Etikett>
      <Unterzeile x={444} y={616}>
        mit Datum
      </Unterzeile>
    </Zeichnung>
  );
}
