import { Etikett, F, KONTUR, Unterzeile, Zeichnung, Zeiger } from './bausteine';

const OBEN = 220;

/** Herausschneiden mit Sicherheitsabstand, danach Prüfung des Randes unter dem Mikroskop. */
export default function WeisserHautkrebsBehandlung() {
  return (
    <Zeichnung titel="Haut im Schnitt mit einem Knötchen aus Krebszellen. Eine gestrichelte Linie zeigt den Schnitt mit etwas Abstand rundherum. Darunter eine Lupe: Unter dem Mikroskop wird geprüft, ob der Rand frei ist">
      <Etikett x={360} y={70} anker="middle">
        Herausschneiden
      </Etikett>
      <Unterzeile x={360} y={102} anker="middle">
        in örtlicher Betäubung
      </Unterzeile>

      {/* Hautschichten */}
      <rect x="60" y={OBEN} width="600" height="26" fill={F.petrolHell} />
      <rect x="60" y={OBEN + 26} width="600" height="110" fill={F.petrol} />
      <rect x="60" y={OBEN + 136} width="600" height="70" fill={F.petrolDunkel} />
      <path d={`M60 ${OBEN} L290 ${OBEN} M430 ${OBEN} L660 ${OBEN}`} {...KONTUR} />

      {/* Krebs: glasiges Knötchen, wächst in die Tiefe */}
      <path
        d={`M290 ${OBEN} C292 ${OBEN - 34} 320 ${OBEN - 44} 360 ${OBEN - 44} C400 ${OBEN - 44} 428 ${OBEN - 34} 430 ${OBEN} C432 ${OBEN + 50} 410 ${OBEN + 92} 384 ${OBEN + 98} C366 ${OBEN + 104} 348 ${OBEN + 102} 334 ${OBEN + 96} C306 ${OBEN + 84} 288 ${OBEN + 50} 290 ${OBEN} Z`}
        fill={F.kupfer}
        stroke={F.kupferHell}
        strokeWidth="4"
      />
      <path d={`M330 ${OBEN - 26} q12 -8 22 0 M370 ${OBEN - 30} q10 6 20 -2`} fill="none" stroke={F.kupferHell} strokeWidth="3" strokeLinecap="round" />

      {/* Schnittlinie mit Abstand */}
      <path
        d={`M240 ${OBEN - 6} L250 ${OBEN + 110} Q256 ${OBEN + 148} 300 ${OBEN + 150} L420 ${OBEN + 150} Q464 ${OBEN + 148} 470 ${OBEN + 110} L480 ${OBEN - 6}`}
        fill="none"
        stroke={F.linie}
        strokeWidth="4"
        strokeDasharray="12 10"
        strokeLinecap="round"
      />

      <Zeiger von={[160, 150]} nach={[310, 196]} />
      <Etikett x={40} y={156}>
        Krebs
      </Etikett>

      <Zeiger von={[600, 188]} nach={[476, 262]} />
      <Etikett x={680} y={142} anker="end">
        Schnitt mit
      </Etikett>
      <Etikett x={680} y={172} anker="end">
        etwas Abstand
      </Etikett>

      {/* Lupe */}
      <circle cx="140" cy="560" r="62" fill={F.petrolDunkel} stroke={F.linie} strokeWidth="5" />
      <path d="M184 604 L232 652" stroke={F.linie} strokeWidth="14" strokeLinecap="round" />
      <path d="M96 548 Q100 590 140 592 Q180 590 184 548 Z" fill={F.petrol} stroke={F.leise} strokeWidth="2" />
      <ellipse cx="140" cy="556" rx="18" ry="16" fill={F.kupfer} />

      <Etikett x={250} y={540}>
        Unter dem Mikroskop:
      </Etikett>
      <Unterzeile x={250} y={574}>
        Ist der Rand frei? Sonst wird
      </Unterzeile>
      <Unterzeile x={250} y={602}>
        nachgeschnitten.
      </Unterzeile>
    </Zeichnung>
  );
}
