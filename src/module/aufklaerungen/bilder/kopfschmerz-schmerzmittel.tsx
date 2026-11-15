import { Etikett, F, KONTUR, Pfeil, Unterzeile, Zeichnung } from './bausteine';

/** Tage eines Monats (0–29), an denen eine Tablette erlaubt ist – höchstens zehn. */
const TABLETTENTAGE = new Set([1, 4, 7, 9, 12, 15, 18, 21, 24, 27]);

/** Teufelskreis aus Kopfschmerz und Tabletten, darunter die 10-20-Regel als Monatskalender. */
export default function KopfschmerzSchmerzmittel() {
  return (
    <Zeichnung titel="Ein Kreislauf aus Kopfschmerz und Tablette, der Schmerz kommt dadurch öfter; darunter ein Monat mit höchstens zehn Tablettentagen">
      <Etikett x={360} y={56} anker="middle">
        Ein Teufelskreis
      </Etikett>

      {/* Kopf mit Schmerzherd */}
      <g transform="translate(190 236)">
        <ellipse cx="0" cy="0" rx="62" ry="74" {...KONTUR} fill={F.petrol} />
        <circle cx="26" cy="-26" r="20" fill={F.kupfer} />
        <circle cx="26" cy="-26" r="8" fill={F.kupferHell} />
        <path d="M-30 4 L-12 4 M12 4 L30 4" {...KONTUR} />
        <path d="M-16 40 Q0 34 16 40" {...KONTUR} />
      </g>

      {/* Tablette */}
      <g transform="translate(530 236) rotate(-30)">
        <path d="M0 -28 L-42 -28 A28 28 0 0 0 -42 28 L0 28 Z" fill={F.petrolHell} />
        <path d="M0 -28 L42 -28 A28 28 0 0 1 42 28 L0 28 Z" fill={F.creme} />
        <rect x="-70" y="-28" width="140" height="56" rx="28" {...KONTUR} />
      </g>

      <Pfeil d="M270 176 Q360 120 446 176" />
      <Unterzeile x={360} y={116} anker="middle">
        Tablette nehmen
      </Unterzeile>

      <Pfeil d="M446 300 Q360 356 270 300" farbe={F.kupferHell} />
      <Etikett x={360} y={384} anker="middle" farbe={F.kupferHell}>
        Schmerz kommt öfter
      </Etikett>

      {/* Ein Monat: 30 Tage, höchstens 10 mit Tablette */}
      <Etikett x={360} y={462} anker="middle">
        Die 10-20-Regel
      </Etikett>
      {Array.from({ length: 30 }, (_, tag) => (
        <rect
          key={tag}
          x={135 + (tag % 10) * 46}
          y={488 + Math.floor(tag / 10) * 46}
          width="36"
          height="36"
          rx="6"
          fill={TABLETTENTAGE.has(tag) ? F.kupferHell : F.petrol}
        />
      ))}
      <Unterzeile x={360} y={652} anker="middle">
        Höchstens 10 Tage im Monat Schmerzmittel,
      </Unterzeile>
      <Unterzeile x={360} y={682} anker="middle">
        mindestens 20 Tage ohne
      </Unterzeile>
    </Zeichnung>
  );
}
