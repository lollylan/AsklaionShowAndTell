import { Etikett, F, KONTUR, Unterzeile, Zeichnung } from './bausteine';

/** Der Auslassversuch als Verlaufskurve: Beschwerden gehen beim Weglassen zurück und kehren bei der Gegenprobe wieder. */
export default function Unvertraeglichkeiten() {
  return (
    <Zeichnung titel="Verlaufskurve der Beschwerden beim Auslassversuch: bei gewohnter Ernährung hoch, in den zwei bis vier Wochen des Weglassens niedrig, bei der Gegenprobe mit dem Lebensmittel wieder hoch">
      <Etikett x={360} y={84} anker="middle">
        Der Auslassversuch
      </Etikett>
      <Unterzeile x={360} y={118} anker="middle">
        zeigt, welches Lebensmittel Sie nicht vertragen
      </Unterzeile>

      {/* Die Zeit des Weglassens als Feld */}
      <rect x="236" y="190" width="230" height="290" rx="14" fill={F.petrolDunkel} />

      {/* Achsen */}
      <path d="M60 190 L60 480 L666 480" {...KONTUR} stroke={F.leise} strokeWidth={3} />
      <Unterzeile x={72} y={212}>
        Beschwerden
      </Unterzeile>

      {/* Verlauf der Beschwerden */}
      <path
        d="M60 262 C110 246 150 276 196 258 C232 246 250 262 270 320 C292 396 316 428 356 432 C400 436 430 430 462 430 C486 430 500 396 516 328 C532 264 556 250 596 262 C626 270 646 254 666 258"
        fill="none"
        stroke={F.kupfer}
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <Etikett x={148} y={526} anker="middle">
        Wie gewohnt
      </Etikett>
      <Unterzeile x={148} y={558} anker="middle">
        Tagebuch führen
      </Unterzeile>
      <Etikett x={351} y={526} anker="middle">
        Weglassen
      </Etikett>
      <Unterzeile x={351} y={558} anker="middle">
        2 bis 4 Wochen
      </Unterzeile>
      <Etikett x={566} y={526} anker="middle" farbe={F.kupferHell}>
        Wieder essen
      </Etikett>
      <Unterzeile x={566} y={558} anker="middle">
        die Gegenprobe
      </Unterzeile>

      <Etikett x={360} y={640} anker="middle">
        Immer nur ein Lebensmittel auf einmal testen
      </Etikett>
    </Zeichnung>
  );
}
