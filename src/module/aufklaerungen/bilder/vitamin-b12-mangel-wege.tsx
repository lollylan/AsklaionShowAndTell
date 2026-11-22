import { Etikett, F, KONTUR, Pfeil, Unterzeile, Zeichnung } from './bausteine';

/** Zwei Wege, B12 zu ersetzen: Spritze in den Muskel oder hoch dosierte Tablette. */
export default function VitaminB12MangelWege() {
  return (
    <Zeichnung titel="Zwei Wege, Vitamin B12 zu ersetzen. Links die Spritze in den Muskel: Das Vitamin gelangt direkt ins Blut, später reicht eine Spritze alle ein bis drei Monate. Rechts die hoch dosierte Tablette: Auch ohne den Stoff aus dem Magen gelangt ein kleiner Teil durch die Darmwand ins Blut, sie muss täglich genommen werden">
      {/* Spritze */}
      <Etikett x={40} y={66}>
        Spritze
      </Etikett>
      <Unterzeile x={40} y={96}>
        in den Muskel
      </Unterzeile>
      <g transform="translate(170 232) rotate(-35)">
        <rect x="-16" y="-80" width="32" height="110" rx="6" {...KONTUR} strokeWidth={3} fill={F.creme} />
        <rect x="-12" y="-30" width="24" height="56" fill={F.kupferHell} />
        <path d="M0 30 L0 74" stroke={F.linie} strokeWidth="3" strokeLinecap="round" />
        <path d="M0 -80 L0 -104 M-16 -104 L16 -104" {...KONTUR} strokeWidth={3} />
      </g>
      {/* Muskel */}
      <rect x="60" y="300" width="250" height="110" rx="40" {...KONTUR} fill={F.petrol} />
      <path d="M90 330 L280 330 M90 355 L280 355 M90 380 L280 380" stroke={F.petrolHell} strokeWidth="3" strokeLinecap="round" />
      <Unterzeile x={185} y={440} anker="middle">
        Muskel
      </Unterzeile>
      <Pfeil d="M185 452 L185 520" farbe={F.linie} breite={7} />

      {/* Tablette */}
      <Etikett x={680} y={66} anker="end">
        Tablette
      </Etikett>
      <Unterzeile x={680} y={96} anker="end">
        hoch dosiert, täglich
      </Unterzeile>
      <circle cx="540" cy="190" r="26" {...KONTUR} strokeWidth={3} fill={F.kupferHell} />
      <Pfeil d="M540 224 L540 290" farbe={F.linie} breite={5} />
      {/* Darm im Schnitt */}
      <rect x="410" y="300" width="250" height="110" rx="40" {...KONTUR} fill={F.petrol} />
      {[450, 490, 530, 570, 610].map((xx) => (
        <circle key={xx} cx={xx} cy="355" r="9" fill={F.kupferHell} />
      ))}
      <Unterzeile x={535} y={440} anker="middle">
        Darm
      </Unterzeile>
      <Pfeil d="M535 452 L535 520" farbe={F.linie} breite={3} />
      <Unterzeile x={560} y={494}>
        kleiner Teil
      </Unterzeile>

      {/* Blut */}
      <rect x="40" y="532" width="640" height="56" rx="28" {...KONTUR} fill={F.tief} />
      <Etikett x={360} y={570} anker="middle">
        Blut
      </Etikett>

      <Etikett x={40} y={650}>
        Beide Wege wirken
      </Etikett>
      <Unterzeile x={40} y={680}>
        Die Nerven brauchen länger als das Blut
      </Unterzeile>
    </Zeichnung>
  );
}
