import { Etikett, F, KONTUR, Unterzeile, Zeichnung, Zeiger } from './bausteine';

// Ein regelmäßiger Herzschlag, 160 px breit: Vorhofwelle, Zacke, Erholungswelle.
const SCHLAG = 'h20 q15 -22 30 0 h12 l6 8 l10 -90 l10 100 l6 -18 h14 q20 -34 40 0 h12 ';
// Zittrige Grundlinie (20 px) und Zacke mit Erholungswelle (62 px) beim Flimmern.
const ZITTERN = 'q5 -14 10 0 q5 14 10 0 ';
const ZACKE = 'l5 8 l9 -90 l9 100 l5 -18 h6 q14 -24 28 0 ';

const NORMAL = 'M40 195 ' + SCHLAG.repeat(4);
const FLIMMERN =
  'M40 450 ' +
  ZITTERN.repeat(2) +
  ZACKE +
  ZITTERN +
  ZACKE +
  ZITTERN.repeat(4) +
  ZACKE +
  ZITTERN.repeat(2) +
  ZACKE +
  ZITTERN.repeat(5) +
  ZACKE +
  ZITTERN.repeat(2) +
  'q5 -14 10 0';

const HERZ =
  'M120 572 C108 540 62 536 48 568 C34 602 70 640 120 690 C170 640 206 602 192 568 C178 536 132 540 120 572 Z';

/** Zwei Herzstromkurven: regelmäßig und bei Vorhofflimmern; darunter das Herz mit markierten Vorhöfen. */
export default function Vorhofflimmern() {
  return (
    <Zeichnung titel="Zwei Herzstromkurven: oben ein gleichmäßiger Herzschlag, unten Vorhofflimmern mit unregelmäßigen Abständen und zittriger Grundlinie; darunter ein Herz mit hervorgehobenen Vorhöfen">
      {/* Normaler Herzschlag */}
      <path d={NORMAL} {...KONTUR} />
      {[118, 278, 438, 598].map((x) => (
        <line key={x} x1={x} y1="228" x2={x} y2="244" stroke={F.leise} strokeWidth="4" strokeLinecap="round" />
      ))}

      {/* Vorhofflimmern */}
      <path d={FLIMMERN} {...KONTUR} stroke={F.kupferHell} />
      {[94, 176, 318, 420, 582].map((x) => (
        <line key={x} x1={x} y1="484" x2={x} y2="500" stroke={F.kupfer} strokeWidth="4" strokeLinecap="round" />
      ))}

      {/* Kleines Herz: Vorhöfe oben in Kupfer, Kammern unten */}
      <clipPath id="vorhofflimmern-clip">
        <path d={HERZ} />
      </clipPath>
      <path d={HERZ} fill={F.petrol} />
      <g clipPath="url(#vorhofflimmern-clip)">
        <rect x="30" y="530" width="180" height="68" fill={F.kupfer} />
        <line x1="30" y1="598" x2="210" y2="598" stroke={F.linie} strokeWidth="4" />
      </g>
      <path d={HERZ} {...KONTUR} />

      <Etikett x={40} y={56}>
        Normaler Herzschlag
      </Etikett>
      <Unterzeile x={40} y={86}>
        Gleichmäßig, Schlag auf Schlag
      </Unterzeile>

      <Etikett x={40} y={304} farbe={F.kupferHell}>
        Vorhofflimmern
      </Etikett>
      <Unterzeile x={40} y={334}>
        Unregelmäßig, oft zu schnell
      </Unterzeile>

      <Zeiger von={[246, 584]} nach={[168, 574]} />
      <Etikett x={256} y={592}>
        Vorhöfe zucken ungeordnet
      </Etikett>
      <Unterzeile x={256} y={626}>
        Hier können sich Gerinnsel bilden
      </Unterzeile>
      <Unterzeile x={256} y={656}>
        – Gefahr eines Schlaganfalls
      </Unterzeile>
    </Zeichnung>
  );
}
