import { Etikett, F, Fluss, KONTUR, Pfeil, Unterzeile, Zeichnung, Zeiger } from './bausteine';

/** Arm, Bein oder Rumpf als dicker Strich mit heller Kontur. */
function Glied({ d, dicke, farbe = F.petrol }: { d: string; dicke: number; farbe?: string }) {
  return (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} stroke={F.linie} strokeWidth={dicke + 8} />
      <path d={d} stroke={farbe} strokeWidth={dicke} />
    </g>
  );
}

/** Sitzende Figur auf einer Reise: Füße wippen, ab und zu aufstehen, genug trinken. */
export default function ThromboseFuesse() {
  return (
    <Zeichnung titel="Sitzende Figur von der Seite: Der Fuß wippt auf und ab, die Wadenmuskeln pumpen dabei das Blut in den Venen nach oben. Daneben: ab und zu aufstehen und herumgehen, genug Wasser trinken">
      {/* Sitz */}
      <path d="M96 190 L96 440 L300 440" fill="none" stroke={F.leise} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="200" y1="440" x2="200" y2="600" stroke={F.leise} strokeWidth="6" strokeLinecap="round" />
      <line x1="60" y1="606" x2="560" y2="606" stroke={F.leise} strokeWidth="3" strokeLinecap="round" />

      {/* Figur */}
      <Glied d="M160 260 L156 392" dicke={66} />
      <Glied d="M186 404 L372 410" dicke={48} />
      <Glied d="M372 410 L384 566" dicke={38} />
      <g className="thrombose-fuesse-fuss">
        <Glied d="M384 580 L452 588" dicke={22} />
      </g>
      <Glied d="M170 276 L214 362 L280 380" dicke={22} />
      <circle cx="166" cy="186" r="42" {...KONTUR} fill={F.petrol} />

      {/* Wade und Blutstrom */}
      <g className="thrombose-fuesse-wade-form">
        <ellipse cx="366" cy="478" rx="12" ry="44" fill={F.petrolHell} />
      </g>
      <Pfeil d="M390 540 L384 440" farbe={F.linie} breite={4} />
      <Fluss d="M390 540 L385 452" farbe={F.kupferHell} breite={8} dauer={0.8} />

      {/* Fußbewegung auf und ab */}
      <path
        d="M482 590 C510 572 510 534 482 514"
        fill="none"
        stroke={F.kupferHell}
        strokeWidth="4"
        strokeLinecap="round"
        markerStart="url(#pfeilspitze)"
        markerEnd="url(#pfeilspitze)"
      />

      <Zeiger von={[500, 450]} nach={[372, 470]} />
      <Etikett x={510} y={446}>
        Füße wippen
      </Etikett>
      <Unterzeile x={510} y={476}>
        die Wade pumpt
      </Unterzeile>

      <Etikett x={400} y={110}>
        Ab und zu aufstehen
      </Etikett>
      <Unterzeile x={400} y={140}>
        und ein paar Schritte gehen
      </Unterzeile>

      {/* Glas Wasser */}
      <path d="M610 230 L622 310 L662 310 L674 230 Z" fill="none" stroke={F.linie} strokeWidth="4" strokeLinejoin="round" />
      <path d="M614 258 L622 310 L662 310 L670 258 Z" fill={F.petrolHell} />
      <Etikett x={400} y={262}>
        Genug trinken
      </Etikett>
      <Unterzeile x={400} y={292}>
        Wasser statt Alkohol
      </Unterzeile>

      <Etikett x={360} y={680} anker="middle">
        Langes Sitzen: Beine in Bewegung halten
      </Etikett>
    </Zeichnung>
  );
}
