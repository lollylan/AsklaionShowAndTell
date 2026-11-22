import { Etikett, F, KONTUR, Unterzeile, Zeichnung, Zeiger } from './bausteine';

const SCHLEIMHAUT =
  'M0 540 C90 510 180 510 270 532 C340 549 420 552 480 530 C560 500 640 505 720 530 L720 720 L0 720 Z';

/** Gewebeprobe: Aus dem Endoskop kommt eine winzige Zange, schnappt zu und hebt ein Stückchen ab. */
export default function MagenspiegelungProbe() {
  return (
    <Zeichnung titel="Nahansicht der Magenschleimhaut. Aus dem Ende des Endoskops kommt eine winzige Zange, öffnet sich, schnappt an der Schleimhaut zu und hebt ein Stückchen Gewebe ab, kleiner als ein Reiskorn">
      {/* Schleimhaut mit Falten */}
      <path d={SCHLEIMHAUT} fill={F.petrol} />
      <path
        d="M0 540 C90 510 180 510 270 532 C340 549 420 552 480 530 C560 500 640 505 720 530"
        {...KONTUR}
      />
      <path d="M0 600 C120 580 240 590 360 604 C480 618 600 600 720 590" fill="none" stroke={F.petrolHell} strokeWidth="4" strokeLinecap="round" />

      {/* Stelle der Probe */}
      <ellipse className="magenspiegelung-probe-stelle" cx="392" cy="546" rx="11" ry="5" fill={F.kupfer} />

      {/* Zange (hinter dem Endoskop, damit sie aus dem Kanal kommt) */}
      <g className="magenspiegelung-probe-zange">
        <line x1="392" y1="-40" x2="392" y2="470" stroke={F.leise} strokeWidth="7" strokeLinecap="round" />
        <path className="magenspiegelung-probe-backe-links" d="M392 466 C376 472 374 500 392 510 Z" fill={F.linie} />
        <path className="magenspiegelung-probe-backe-rechts" d="M392 466 C408 472 410 500 392 510 Z" fill={F.linie} />
        <circle className="magenspiegelung-probe-stueck" cx="392" cy="512" r="7" fill={F.kupfer} />
      </g>

      {/* Ende des Endoskops */}
      <path d="M295 -10 L295 200 L425 200 L425 -10 Z" fill={F.petrolDunkel} />
      <path d="M295 -10 L295 200 M425 200 L425 -10" {...KONTUR} />
      <ellipse cx="360" cy="200" rx="65" ry="20" fill={F.tief} stroke={F.linie} strokeWidth="4" />
      <circle cx="330" cy="200" r="9" fill={F.petrolHell} stroke={F.leise} strokeWidth="3" />
      <ellipse cx="362" cy="194" rx="8" ry="4" fill={F.creme} />
      <ellipse cx="392" cy="206" rx="9" ry="4" fill="#000" opacity="0.6" />

      <Etikett x={270} y={70} anker="end">
        Endoskop
      </Etikett>
      <Unterzeile x={270} y={102} anker="end">
        Ende mit Kamera
      </Unterzeile>

      <Etikett x={450} y={340}>
        Zange
      </Etikett>
      <Zeiger von={[444, 332]} nach={[398, 400]} />

      <Etikett x={450} y={448} farbe={F.kupferHell}>
        Winzige Probe
      </Etikett>
      <Unterzeile x={450} y={480}>
        kleiner als ein Reiskorn
      </Unterzeile>
      <Zeiger von={[444, 452]} nach={[402, 508]} />

      <Etikett x={360} y={656} anker="middle">
        Magenschleimhaut
      </Etikett>
      <Unterzeile x={360} y={690} anker="middle">
        hat keine Schmerznerven
      </Unterzeile>
    </Zeichnung>
  );
}
