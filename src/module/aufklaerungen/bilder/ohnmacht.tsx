import { Etikett, F, Fluss, Folge, KONTUR, Pfeil, Unterzeile, Zeichnung } from './bausteine';

/** Arm, Bein oder Hals als dicker Strich mit heller Kontur. */
function Glied({ von, nach, dicke }: { von: [number, number]; nach: [number, number]; dicke: number }) {
  const d = `M${von[0]} ${von[1]} L${nach[0]} ${nach[1]}`;
  return (
    <g fill="none" strokeLinecap="round">
      <path d={d} stroke={F.linie} strokeWidth={dicke + 8} />
      <path d={d} stroke={F.petrol} strokeWidth={dicke} />
    </g>
  );
}

/** Stehende Figur, bei der das Blut in die Beine sackt, und liegende Figur mit hochgelagerten Beinen. */
export default function Ohnmacht() {
  return (
    <Zeichnung titel="Links eine stehende Figur: Das Blut sackt in die Beine, der Kopf bekommt zu wenig. Rechts liegt die Figur mit hochgelagerten Beinen, das Blut fließt zum Kopf zurück">
      <Etikett x={360} y={84} anker="middle">
        Das Gehirn bekommt kurz zu wenig Blut
      </Etikett>

      <line x1="360" y1="170" x2="360" y2="560" stroke={F.leise} strokeWidth="2" strokeDasharray="6 12" strokeLinecap="round" />

      {/* Im Stehen */}
      <Glied von={[150, 258]} nach={[132, 380]} dicke={24} />
      <Glied von={[230, 258]} nach={[248, 380]} dicke={24} />
      <Glied von={[172, 400]} nach={[168, 552]} dicke={34} />
      <Glied von={[208, 400]} nach={[212, 552]} dicke={34} />
      <Glied von={[190, 214]} nach={[190, 240]} dicke={22} />
      <path d="M144 244 Q190 228 236 244 L230 410 Q190 420 150 410 Z" {...KONTUR} fill={F.petrol} />
      <circle cx="190" cy="186" r="40" {...KONTUR} fill={F.petrolDunkel} />
      <circle
        className="ohnmacht-mangel"
        cx="190"
        cy="186"
        r="54"
        fill="none"
        stroke={F.kupferHell}
        strokeWidth="3"
        strokeDasharray="6 9"
        strokeLinecap="round"
      />
      <Pfeil d="M110 430 L110 528" farbe={F.kupferHell} />
      <Pfeil d="M270 430 L270 528" farbe={F.kupferHell} />
      {/* Blut sackt in die Beine */}
      <Fluss d="M184 232 L184 400 L170 546" farbe={F.kupferHell} dauer={1.8} />
      <Fluss d="M196 232 L196 400 L210 546" farbe={F.kupferHell} dauer={1.8} />
      <line x1="100" y1="574" x2="280" y2="574" stroke={F.leise} strokeWidth="3" strokeLinecap="round" />

      {/* Im Liegen mit hochgelagerten Beinen */}
      {/* Beine gehen hoch, eine Unterlage stützt sie, dann fließt Blut zum Kopf. */}
      <Folge ab={2.2} von={0} dauer={0.6}>
        <rect x="626" y="458" width="62" height="62" rx="8" fill={F.petrolDunkel} stroke={F.leise} strokeWidth="3" />
      </Folge>
      <g className="ohnmacht-bein">
        <Glied von={[575, 478]} nach={[664, 430]} dicke={34} />
      </g>
      <Glied von={[440, 476]} nach={[458, 478]} dicke={22} />
      <rect x="452" y="452" width="130" height="52" rx="24" {...KONTUR} fill={F.petrol} />
      <circle cx="414" cy="474" r="34" {...KONTUR} fill={F.petrol} />
      <Folge ab={2.6} von={0} dauer={0.6}>
        <Pfeil d="M650 392 C590 366 500 378 450 422" farbe={F.linie} />
      </Folge>
      <Fluss d="M664 430 L575 478 L452 478 L420 474" ab={2.6} dauer={1.6} />
      <line x1="380" y1="522" x2="690" y2="522" stroke={F.leise} strokeWidth="3" strokeLinecap="round" />

      <Etikett x={190} y={626} anker="middle">
        Im Stehen
      </Etikett>
      <Unterzeile x={190} y={658} anker="middle">
        Blut sackt in die Beine
      </Unterzeile>
      <Etikett x={535} y={626} anker="middle">
        Hinlegen, Beine hoch
      </Etikett>
      <Unterzeile x={535} y={658} anker="middle">
        Blut fließt zum Kopf zurück
      </Unterzeile>
    </Zeichnung>
  );
}
