import { Etikett, F, Fluss, KONTUR, Pfeil, Unterzeile, Zeichnung } from './bausteine';

/** Arm oder Bein als dicker Strich mit heller Kontur. */
function Glied({ d, dicke, farbe = F.petrol }: { d: string; dicke: number; farbe?: string }) {
  return (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} stroke={F.linie} strokeWidth={dicke + 8} />
      <path d={d} stroke={farbe} strokeWidth={dicke} />
    </g>
  );
}

/** Rumpf und Kopf einer stehenden Figur von vorn, Mitte x. */
function Oberkoerper({ x }: { x: number }) {
  return (
    <g>
      <path d={`M${x - 46} 234 Q${x} 220 ${x + 46} 234 L${x + 40} 400 Q${x} 410 ${x - 40} 400 Z`} {...KONTUR} fill={F.petrol} />
      <circle cx={x} cy="180" r="40" {...KONTUR} fill={F.petrol} />
    </g>
  );
}

/** Gegenmanöver bei Vorboten: Beine überkreuzen und anspannen, Hände verhaken und auseinanderziehen. */
export default function OhnmachtGegenmanoever() {
  return (
    <Zeichnung titel="Zwei stehende Figuren. Links sind die Beine überkreuzt und fest angespannt. Rechts sind die Hände vor der Brust ineinander verhakt und ziehen kräftig auseinander. Beides drückt Blut zum Kopf">
      <Etikett x={360} y={58} anker="middle">
        Bei Vorboten: kräftig anspannen
      </Etikett>
      <Unterzeile x={360} y={90} anker="middle">
        das hebt den Blutdruck, wenn Hinlegen nicht geht
      </Unterzeile>

      {/* Links: Beine überkreuzt und angespannt */}
      <Glied d="M146 246 L122 390" dicke={22} />
      <Glied d="M214 246 L238 390" dicke={22} />
      <g className="ohnmacht-gegenmanoever-beine-form">
        <Glied d="M166 400 L214 580" dicke={34} farbe={F.petrolHell} />
        <Glied d="M196 400 L148 580" dicke={34} farbe={F.petrolHell} />
      </g>
      <Oberkoerper x={180} />
      {/* Im Rhythmus: anspannen, halten, lösen. Beim Anspannen steigt Blut zum Kopf. */}
      <Fluss d="M180 392 L180 160" farbe={F.kupferHell} dauer={1} klasse="ohnmacht-gegenmanoever-blut" />
      <g className="ohnmacht-gegenmanoever-rein-links">
        <Pfeil d="M96 490 L132 490" farbe={F.kupferHell} breite={4} />
      </g>
      <g className="ohnmacht-gegenmanoever-rein-rechts">
        <Pfeil d="M264 490 L228 490" farbe={F.kupferHell} breite={4} />
      </g>

      {/* Rechts: Hände verhakt, ziehen auseinander */}
      <Glied d="M520 400 L516 580" dicke={34} />
      <Glied d="M560 400 L564 580" dicke={34} />
      <Oberkoerper x={540} />
      <Fluss d="M540 392 L540 160" farbe={F.kupferHell} dauer={1} klasse="ohnmacht-gegenmanoever-blut" />
      <g className="ohnmacht-gegenmanoever-zug-links">
        <Glied d="M500 250 L470 330 L520 318" dicke={22} farbe={F.petrolHell} />
        <circle cx="526" cy="318" r="16" {...KONTUR} fill={F.petrolHell} />
      </g>
      <g className="ohnmacht-gegenmanoever-zug-rechts">
        <Glied d="M580 250 L610 330 L560 318" dicke={22} farbe={F.petrolHell} />
        <circle cx="554" cy="318" r="16" {...KONTUR} fill={F.petrolHell} />
      </g>
      <g className="ohnmacht-gegenmanoever-raus-links">
        <Pfeil d="M440 330 L404 330" farbe={F.kupferHell} breite={4} />
      </g>
      <g className="ohnmacht-gegenmanoever-raus-rechts">
        <Pfeil d="M640 330 L676 330" farbe={F.kupferHell} breite={4} />
      </g>

      <line x1="80" y1="600" x2="640" y2="600" stroke={F.leise} strokeWidth="3" strokeLinecap="round" />

      <Etikett x={180} y={648} anker="middle">
        Beine kreuzen
      </Etikett>
      <Unterzeile x={180} y={680} anker="middle">
        und fest anspannen
      </Unterzeile>
      <Etikett x={540} y={648} anker="middle">
        Hände verhaken
      </Etikett>
      <Unterzeile x={540} y={680} anker="middle">
        und kräftig ziehen
      </Unterzeile>
    </Zeichnung>
  );
}
