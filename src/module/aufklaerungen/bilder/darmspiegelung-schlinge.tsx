import { Etikett, F, KONTUR, Unterzeile, Zeichnung, Zeiger } from './bausteine';

const SCHLEIMHAUT =
  'M0 572 C120 548 240 548 360 564 C480 580 600 580 720 556 L720 720 L0 720 Z';

/**
 * Polyp abtragen: Die Schlinge kommt aus dem Endoskop, legt sich geöffnet über den Polypen,
 * zieht sich am Stiel zu und hebt ihn ab. Ruhend: Polyp in der Schlinge, an der Wand bleibt
 * eine kleine flache Stelle.
 */
export default function DarmspiegelungSchlinge() {
  return (
    <Zeichnung titel="Nahansicht der Darmwand mit einem gestielten Polypen. Aus dem Endoskop kommt eine Drahtschlinge, legt sich über den Polypen, zieht sich am Stiel zu und hebt ihn ab. An der Wand bleibt eine kleine flache Stelle">
      <path d={SCHLEIMHAUT} fill={F.petrol} />
      <path d="M0 572 C120 548 240 548 360 564 C480 580 600 580 720 556" {...KONTUR} />
      <path d="M0 632 C140 616 280 622 420 636 C540 648 640 636 720 624" fill="none" stroke={F.petrolHell} strokeWidth="4" strokeLinecap="round" />

      {/* Stelle, an der der Polyp saß */}
      <ellipse className="darmspiegelung-schlinge-stelle" cx="392" cy="568" rx="14" ry="5" fill={F.kupfer} />
      {/* Stiel – in Bewegung zuerst da, ruhend schon entfernt */}
      <path className="darmspiegelung-schlinge-stiel" d="M384 570 L386 528 L398 528 L400 570 Z" fill={F.kupfer} opacity="0" />

      {/* Kopf des Polypen, ruhend schon angehoben */}
      <g className="darmspiegelung-schlinge-polyp">
        <circle cx="392" cy="380" r="36" fill={F.kupfer} stroke={F.kupferHell} strokeWidth="4" />
        <path d="M386 414 L388 424 L396 424 L398 414 Z" fill={F.kupfer} />
      </g>

      {/* Schlinge am Draht (hinter dem Endoskop, damit sie aus dem Kanal kommt) */}
      <g className="darmspiegelung-schlinge-draht">
        <line x1="392" y1="-60" x2="392" y2="414" stroke={F.leise} strokeWidth="6" strokeLinecap="round" />
        <g className="darmspiegelung-schlinge-ring-form">
          <ellipse cx="392" cy="420" rx="14" ry="6" fill="none" stroke={F.linie} strokeWidth="4" />
        </g>
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

      <Etikett x={470} y={300}>
        Schlinge
      </Etikett>
      <Unterzeile x={470} y={332}>
        zieht sich am Stiel zu
      </Unterzeile>
      <Zeiger von={[464, 320]} nach={[406, 418]} />

      <Etikett x={290} y={370} anker="end" farbe={F.kupferHell}>
        Polyp
      </Etikett>
      <Unterzeile x={290} y={402} anker="end">
        geht ins Labor
      </Unterzeile>

      <Etikett x={360} y={676} anker="middle">
        Darmschleimhaut
      </Etikett>
      <Unterzeile x={360} y={708} anker="middle">
        das Abtragen tut nicht weh
      </Unterzeile>
    </Zeichnung>
  );
}
