import { Etikett, F, KONTUR, Pfeil, Unterzeile, Zeichnung, Zeiger } from './bausteine';

/** Magen unterhalb des Zwerchfells, Eingang oben bei x = 280. */
const MAGEN =
  'M264 300 C236 350 206 410 226 470 C246 528 352 540 380 470 C404 404 360 330 296 300 Z';

/** Druck im Bauch schiebt den Mageneingang durch die Zwerchfelllücke nach oben. */
export default function GleithernieUrsachen() {
  return (
    <Zeichnung titel="Bauchraum mit Magen, darüber das Zwerchfell mit einer Lücke: Druck von unten aus dem Bauch schiebt einen Teil des Magens durch die Lücke nach oben. Auslöser sind Übergewicht, Schwangerschaft, Pressen, Heben und langer Husten">
      {/* Bauchraum */}
      <path
        d="M80 320 Q270 280 460 320 L460 560 Q460 650 270 650 Q80 650 80 560 Z"
        fill={F.petrolDunkel}
      />

      {/* Speiseröhre */}
      <path d="M268 60 L268 240 M292 60 L292 240" {...KONTUR} />
      <rect x="270" y="60" width="20" height="180" fill={F.petrol} />

      {/* Magen */}
      <path d={MAGEN} {...KONTUR} fill={F.petrol} />

      {/* Zwerchfell mit Lücke */}
      <path d="M70 336 Q160 250 238 280" fill="none" stroke={F.petrolHell} strokeWidth="18" strokeLinecap="round" />
      <path d="M322 280 Q400 250 470 336" fill="none" stroke={F.petrolHell} strokeWidth="18" strokeLinecap="round" />

      {/* Hochgerutschter Magenteil */}
      <ellipse cx="280" cy="264" rx="40" ry="40" fill={F.kupfer} stroke={F.linie} strokeWidth="4" />

      {/* Druck aus dem Bauch */}
      <Pfeil d="M150 610 L196 530" farbe={F.kupferHell} breite={6} />
      <Pfeil d="M290 636 L290 556" farbe={F.kupferHell} breite={6} />
      <Pfeil d="M420 610 L384 530" farbe={F.kupferHell} breite={6} />

      <Zeiger von={[480, 210]} nach={[316, 252]} />
      <Etikett x={490} y={196}>
        Magen rutscht
      </Etikett>
      <Unterzeile x={490} y={226}>
        durch die Lücke
      </Unterzeile>

      <Etikett x={490} y={400} farbe={F.kupferHell}>
        Druck im Bauch
      </Etikett>
      <Unterzeile x={490} y={436}>
        Übergewicht
      </Unterzeile>
      <Unterzeile x={490} y={466}>
        Schwangerschaft
      </Unterzeile>
      <Unterzeile x={490} y={496}>
        Pressen, Heben
      </Unterzeile>
      <Unterzeile x={490} y={526}>
        langer Husten
      </Unterzeile>
    </Zeichnung>
  );
}
