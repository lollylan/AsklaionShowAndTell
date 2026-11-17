import { Etikett, F, KONTUR, Unterzeile, Zeichnung, Zeiger } from './bausteine';

const BODEN = 560;

/** Zimmer im Schnitt mit Lampe, Teppich, Kabel und Badewanne mit Haltegriff. */
export default function Stuerze() {
  return (
    <Zeichnung titel="Ein Zimmer im Schnitt: helle Lampe, ein Teppich mit hochstehender Kante und ein Kabel auf dem Boden als Stolperfallen, ein Haltegriff an der Wand über der Badewanne">
      {/* Wände und Boden */}
      <path d={`M60 170 L60 ${BODEN} M660 170 L660 ${BODEN}`} fill="none" stroke={F.leise} strokeWidth="3" strokeLinecap="round" />
      <line x1="40" y1={BODEN} x2="680" y2={BODEN} stroke={F.linie} strokeWidth="4" strokeLinecap="round" />

      {/* Lampe mit Lichtkegel */}
      <path d="M172 234 L228 234 L300 552 L100 552 Z" fill={F.leise} opacity="0.14" />
      <line x1="200" y1="170" x2="200" y2="202" stroke={F.linie} strokeWidth="4" strokeLinecap="round" />
      <path d="M168 234 L232 234 L216 202 L184 202 Z" {...KONTUR} fill={F.petrolHell} />

      {/* Teppich mit hochstehender Kante */}
      <rect x="106" y="544" width="176" height="16" rx="4" fill={F.petrol} stroke={F.linie} strokeWidth="3" />
      <path d="M280 550 Q304 550 304 530 Q304 516 292 518" fill="none" stroke={F.kupfer} strokeWidth="8" strokeLinecap="round" />

      {/* Steckdose und Kabel quer über den Boden */}
      <rect x="338" y="488" width="30" height="26" rx="5" fill={F.creme} stroke={F.linie} strokeWidth="3" />
      <path
        d="M353 512 C353 548 378 556 400 553 C428 549 440 538 458 548 C472 556 478 558 494 555"
        fill="none"
        stroke={F.kupfer}
        strokeWidth="5"
        strokeLinecap="round"
      />

      {/* Badewanne mit Haltegriff */}
      <path d="M510 470 L650 470 L650 520 Q650 556 616 556 L544 556 Q510 556 510 520 Z" {...KONTUR} fill={F.petrolDunkel} />
      <rect x="606" y="364" width="18" height="86" rx="9" fill={F.petrolHell} stroke={F.linie} strokeWidth="4" />
      <path d="M624 374 L656 374 M624 440 L656 440" fill="none" stroke={F.linie} strokeWidth="4" strokeLinecap="round" />

      <Etikett x={360} y={70} anker="middle">
        Stolperfallen beseitigen
      </Etikett>
      <Unterzeile x={360} y={104} anker="middle">
        die Wohnung sicher machen
      </Unterzeile>

      <Etikett x={250} y={226}>
        Gutes Licht
      </Etikett>

      <Zeiger von={[580, 404]} nach={[602, 404]} />
      <Etikett x={570} y={412} anker="end">
        Haltegriffe
      </Etikett>

      <Zeiger von={[262, 598]} nach={[300, 526]} />
      <Etikett x={230} y={626} anker="middle" farbe={F.kupferHell}>
        Teppichkanten
      </Etikett>

      <Zeiger von={[420, 598]} nach={[420, 552]} />
      <Etikett x={430} y={626} anker="middle" farbe={F.kupferHell}>
        Kabel
      </Etikett>
    </Zeichnung>
  );
}
