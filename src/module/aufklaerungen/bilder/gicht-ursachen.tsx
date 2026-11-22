import { Etikett, F, KONTUR, Pfeil, Unterzeile, Zeichnung, Zeiger } from './bausteine';

const NADELN: [number, number, number][] = [
  [268, 470, 30],
  [300, 488, -20],
  [336, 474, 60],
  [372, 492, 10],
  [410, 478, -50],
  [446, 490, 35],
  [318, 446, -60],
  [390, 450, 75],
];

/** Harnsäure wie in einem Becken: Zufluss aus dem Essen, Abfluss über die Nieren zu gering. */
export default function GichtUrsachen() {
  return (
    <Zeichnung titel="Ein Becken steht für die Harnsäure im Blut. Von oben fließt Harnsäure aus Fleisch, Innereien, Bier und süßen Getränken zu. Unten fließt über die Nieren zu wenig ab. Das Becken steht über der Grenze, am Boden bilden sich nadelförmige Kristalle">
      {/* Zufluss */}
      <Pfeil d="M90 170 Q220 170 262 268" farbe={F.linie} breite={8} />
      <Etikett x={40} y={86}>
        Aus dem Essen
      </Etikett>
      <Unterzeile x={40} y={116}>
        Fleisch, Innereien, Bier, Limo
      </Unterzeile>

      {/* Becken mit Harnsäure */}
      <path d="M232 320 L240 512 Q360 536 480 512 L488 320 Z" fill={F.petrol} />
      <path d="M226 232 L240 512 Q360 536 480 512 L494 232" {...KONTUR} />
      <path d="M232 320 L488 320" stroke={F.petrolHell} strokeWidth="4" />
      <path d="M236 390 L484 390" stroke={F.linie} strokeWidth="3" strokeDasharray="10 8" />
      <Unterzeile x={296} y={380} farbe={F.linie}>
        Grenze
      </Unterzeile>
      <Etikett x={404} y={210} anker="middle">
        Harnsäure im Blut
      </Etikett>

      {/* Kristalle am Boden */}
      {NADELN.map(([x, y, w]) => (
        <path
          key={`${x}-${y}`}
          d={`M${x - 14} ${y} L${x + 14} ${y}`}
          transform={`rotate(${w} ${x} ${y})`}
          stroke={F.kupferHell}
          strokeWidth="4"
          strokeLinecap="round"
        />
      ))}

      {/* Abfluss über die Niere, zu schwach */}
      <path d="M470 500 Q540 520 574 560" stroke={F.leise} strokeWidth="3" fill="none" strokeLinecap="round" />
      <path
        d="M610 546 C580 540 560 566 564 596 C568 626 600 640 622 624 C632 616 628 604 618 598 C608 592 608 578 620 572 C634 564 632 550 610 546 Z"
        {...KONTUR}
        strokeWidth={3}
        fill={F.petrolHell}
      />
      <Pfeil d="M596 636 L596 668" farbe={F.leise} breite={3} />

      <Etikett x={40} y={600} farbe={F.kupferHell}>
        Zu viel bildet Kristalle
      </Etikett>
      <Zeiger von={[200, 576]} nach={[290, 486]} />

      <Etikett x={680} y={470} anker="end">
        Nieren
      </Etikett>
      <Unterzeile x={680} y={498} anker="end">
        scheiden zu
      </Unterzeile>
      <Unterzeile x={680} y={524} anker="end">
        wenig aus
      </Unterzeile>
    </Zeichnung>
  );
}
