import { Etikett, F, KONTUR, Unterzeile, Zeichnung } from './bausteine';

/** Blutdruck im Liegen und nach dem Aufstehen: stabil oder deutlich absackend. */
export default function OhnmachtStehtest() {
  return (
    <Zeichnung titel="Blutdruckkurve beim Stehtest: Erst wird im Liegen gemessen, dann nach dem Aufstehen. Eine Kurve bleibt nach kurzem Knick stabil, die andere fällt beim Stehen deutlich ab">
      <Etikett x={40} y={58}>
        Blutdruck im Liegen und im Stehen
      </Etikett>
      <Unterzeile x={40} y={90}>
        Wir messen mehrmals, einige Minuten lang
      </Unterzeile>

      {/* Liegende Figur */}
      <circle cx="132" cy="188" r="20" {...KONTUR} fill={F.petrol} />
      <rect x="156" y="174" width="130" height="30" rx="15" {...KONTUR} fill={F.petrol} />
      <line x1="100" y1="220" x2="300" y2="220" stroke={F.leise} strokeWidth="3" strokeLinecap="round" />

      {/* Stehende Figur */}
      <circle cx="505" cy="128" r="18" {...KONTUR} fill={F.petrol} />
      <rect x="490" y="152" width="30" height="72" rx="15" {...KONTUR} fill={F.petrol} />
      <line x1="440" y1="230" x2="570" y2="230" stroke={F.leise} strokeWidth="3" strokeLinecap="round" />

      {/* Achsen und Aufstehen */}
      <line x1="80" y1="260" x2="80" y2="530" stroke={F.leise} strokeWidth="3" strokeLinecap="round" />
      <line x1="80" y1="530" x2="680" y2="530" stroke={F.leise} strokeWidth="3" strokeLinecap="round" />
      <line x1="330" y1="250" x2="330" y2="530" stroke={F.leise} strokeWidth="2" strokeDasharray="6 10" strokeLinecap="round" />

      {/* Kurven */}
      <path d="M330 330 C350 330 362 360 384 358 C420 354 460 332 680 330" fill="none" stroke={F.petrolHell} strokeWidth="6" strokeLinecap="round" />
      <path d="M330 330 C372 330 390 450 440 460 L680 470" fill="none" stroke={F.kupfer} strokeWidth="6" strokeLinecap="round" />
      <path d="M80 330 L330 330" fill="none" stroke={F.linie} strokeWidth="6" strokeLinecap="round" />

      <Unterzeile x={680} y={312} anker="end" farbe={F.linie}>
        bleibt stabil
      </Unterzeile>
      <Unterzeile x={680} y={504} anker="end" farbe={F.kupferHell}>
        sackt deutlich ab
      </Unterzeile>

      <Etikett x={205} y={572} anker="middle">
        Liegen
      </Etikett>
      <Etikett x={505} y={572} anker="middle">
        Stehen
      </Etikett>

      <Unterzeile x={360} y={652} anker="middle">
        Dazu ein EKG, je nach Verdacht weitere Untersuchungen
      </Unterzeile>
    </Zeichnung>
  );
}
