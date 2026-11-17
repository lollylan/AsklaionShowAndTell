import { Etikett, F, KONTUR, Pfeil, Unterzeile, Zeichnung, Zeiger } from './bausteine';

/** Schuh von der Seite, Ferse links, Spitze rechts, Einstieg oben zwischen x = 170 und 330. */
const SCHUH =
  'M120 520 L620 520 C642 520 654 504 644 484 C624 442 562 422 482 402 L382 332 C370 312 352 302 330 302 L170 302 C150 302 140 314 140 332 L132 470 C128 496 120 506 120 520 Z';

/** Umriss des Fußes im Schuh, gestrichelt; Zehen enden vor der Schuhspitze. */
const FUSS_INNEN = 'M160 500 L560 500 C590 500 600 488 592 474 C574 450 520 434 470 418 L372 352';

/** Schuh mit Pfeil für das Austasten, Steinchen innen und Platz vor den Zehen. */
export default function DiabetischerFussSchuh() {
  return (
    <Zeichnung titel="Schuh von der Seite: Ein Pfeil zeigt, dass man vor dem Anziehen mit der Hand hineintastet; innen liegt ein Steinchen, und vor den Zehen ist genug Platz">
      <Etikett x={40} y={70}>
        Vor dem Anziehen
      </Etikett>
      <Unterzeile x={40} y={102}>
        innen mit der Hand austasten
      </Unterzeile>

      {/* Sohle und Schuh */}
      <rect x="112" y="516" width="540" height="32" rx="14" fill={F.tief} stroke={F.linie} strokeWidth="4" />
      <path d={SCHUH} fill={F.petrol} />
      <path d={SCHUH} {...KONTUR} />
      <path d="M170 302 Q250 330 330 302" {...KONTUR} stroke={F.leise} />
      <path d={FUSS_INNEN} fill="none" stroke={F.leise} strokeWidth="3" strokeDasharray="10 10" strokeLinecap="round" />

      {/* Austasten */}
      <Pfeil d="M250 140 L250 380 Q252 470 360 480" farbe={F.creme} breite={6} />

      {/* Steinchen */}
      <path d="M458 506 L470 490 L488 494 L494 508 Z" fill={F.kupfer} stroke={F.linie} strokeWidth="3" strokeLinejoin="round" />
      <Zeiger von={[560, 594]} nach={[476, 502]} />
      <Etikett x={690} y={626} anker="end" farbe={F.kupferHell}>
        Steinchen spürt man nicht
      </Etikett>

      {/* Platz vor den Zehen */}
      <Zeiger von={[600, 270]} nach={[618, 486]} />
      <Etikett x={420} y={250}>
        Platz für die Zehen
      </Etikett>

      <Unterzeile x={40} y={690}>
        Neue Schuhe am Nachmittag kaufen
      </Unterzeile>
    </Zeichnung>
  );
}
