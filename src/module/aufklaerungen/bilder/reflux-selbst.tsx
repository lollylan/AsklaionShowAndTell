import { Etikett, F, KONTUR, Unterzeile, Zeichnung, Zeiger } from './bausteine';

/** Bett von der Seite: Kopfende auf Klötzen höher, darauf ein schlafender Mensch. */
export default function RefluxSelbst() {
  return (
    <Zeichnung titel="Bett von der Seite: Das Kopfende steht auf Klötzen höher, ein Mensch schläft darauf mit erhöhtem Oberkörper. Darunter eine Uhr: letzte Mahlzeit drei Stunden vor dem Schlafen">
      {/* Boden */}
      <line x1="60" y1="520" x2="680" y2="520" stroke={F.leise} strokeWidth="3" strokeLinecap="round" />

      {/* Kopf- und Fußteil */}
      <path d="M112 190 L112 440" {...KONTUR} strokeWidth={14} />
      <path d="M628 290 L628 520" {...KONTUR} strokeWidth={14} />

      {/* Beine des Bettes, am Kopfende auf einem Klotz */}
      <path d="M140 350 L140 444 M600 422 L600 520" {...KONTUR} strokeWidth={10} />
      <rect x="104" y="444" width="72" height="76" rx="6" fill={F.kupfer} stroke={F.kupferHell} strokeWidth="4" />

      {/* Matratze, schräg */}
      <path d="M120 290 L620 370 L620 420 L120 340 Z" {...KONTUR} fill={F.petrolDunkel} />

      {/* Kissen */}
      <ellipse cx="185" cy="286" rx="58" ry="18" transform="rotate(9 185 286)" {...KONTUR} fill={F.creme} />

      {/* Schlafender Mensch: Körper als Rolle, Kopf auf dem Kissen */}
      <path d="M262 266 L560 314" stroke={F.linie} strokeWidth="78" strokeLinecap="round" />
      <path d="M262 266 L560 314" stroke={F.petrolHell} strokeWidth="70" strokeLinecap="round" />
      <circle cx="196" cy="236" r="34" {...KONTUR} fill={F.petrolHell} />

      <Etikett x={200} y={474}>
        Kopfende höher stellen
      </Etikett>
      <Unterzeile x={200} y={506}>
        zum Beispiel mit Klötzen
      </Unterzeile>

      <Zeiger von={[560, 126]} nach={[440, 296]} />
      <Etikett x={690} y={100} anker="end">
        Auf der linken Seite
      </Etikett>

      {/* Uhr */}
      <circle cx="96" cy="616" r="40" {...KONTUR} fill={F.petrolDunkel} />
      <path d="M96 616 L96 586 M96 616 L120 630" {...KONTUR} />
      <Etikett x={160} y={608}>
        Letzte Mahlzeit
      </Etikett>
      <Unterzeile x={160} y={640}>
        drei Stunden vor dem Schlafen
      </Unterzeile>
    </Zeichnung>
  );
}
