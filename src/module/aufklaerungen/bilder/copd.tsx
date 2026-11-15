import { Etikett, F, KONTUR, Pfeil, Unterzeile, Zeichnung, Zeiger } from './bausteine';

/** Gesunde Lungenbläschen: kleine pralle Kugeln als Traube am Ende des Bronchus. */
const BLAESCHEN: [number, number][] = [
  [490, 106],
  [550, 106],
  [610, 106],
  [460, 158],
  [520, 158],
  [580, 158],
  [460, 262],
  [520, 262],
  [580, 262],
  [490, 314],
  [550, 314],
  [610, 314],
  [550, 210],
  [610, 210],
  [490, 210],
];

/** Bronchus mit Lungenbläschen: oben gesund, unten bei COPD. */
export default function Copd() {
  return (
    <Zeichnung titel="Bronchus mit Lungenbläschen im Vergleich: gesund mit offenem Bronchus und vielen kleinen Bläschen, bei COPD mit verengtem, verschleimtem Bronchus und wenigen großen, schlaffen Blasen">
      {/* Gesund: offener Bronchus von links, Bläschentraube rechts */}
      <path d="M40 210 L490 210" fill="none" stroke={F.linie} strokeWidth="64" />
      <path d="M40 210 L490 210" fill="none" stroke={F.petrolHell} strokeWidth="56" />
      <path d="M40 210 L490 210" fill="none" stroke={F.linie} strokeWidth="40" />
      <path d="M40 210 L490 210" fill="none" stroke={F.tief} strokeWidth="32" />
      <Pfeil d="M70 210 L410 210" />
      {BLAESCHEN.map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="32" fill={F.petrol} stroke={F.linie} strokeWidth="4" />
      ))}

      {/* COPD: dicke Wand, enge Öffnung, Schleim */}
      <path d="M40 530 L480 530" fill="none" stroke={F.linie} strokeWidth="64" />
      <path d="M40 530 L480 530" fill="none" stroke={F.kupfer} strokeWidth="56" />
      <path d="M40 530 L480 530" fill="none" stroke={F.linie} strokeWidth="22" />
      <path d="M40 530 L480 530" fill="none" stroke={F.tief} strokeWidth="14" />
      <path
        d="M80 530 C105 523 125 537 150 530 C175 523 195 537 220 530 M270 530 C295 523 315 537 340 530 C355 526 370 534 385 530"
        fill="none"
        stroke={F.creme}
        strokeWidth="7"
        strokeLinecap="round"
      />

      {/* Wenige große, schlaffe Blasen statt vieler kleiner */}
      <ellipse cx="592" cy="476" rx="66" ry="60" fill={F.petrol} fillOpacity="0.55" stroke={F.kupferHell} strokeWidth="4" />
      <ellipse cx="586" cy="598" rx="64" ry="56" fill={F.petrol} fillOpacity="0.55" stroke={F.kupferHell} strokeWidth="4" />
      <ellipse cx="480" cy="530" rx="70" ry="62" fill={F.petrol} stroke={F.kupferHell} strokeWidth="4" />
      {/* Reste der zerstörten Trennwände */}
      <path
        d="M452 498 q16 8 10 26 M500 548 q-4 18 12 26 M606 446 q-14 12 -4 28 M570 500 q14 -2 22 10 M566 584 q16 4 16 22 M612 606 q-12 8 -6 22"
        {...KONTUR}
        stroke={F.kupferHell}
        strokeWidth="3"
      />

      <Etikett x={40} y={90}>
        Gesund
      </Etikett>
      <Unterzeile x={40} y={122}>
        weite Bronchien, viele Bläschen
      </Unterzeile>

      <Etikett x={690} y={396} anker="end">
        Lungenbläschen zerstört
      </Etikett>
      <Zeiger von={[606, 410]} nach={[600, 440]} />

      <Etikett x={40} y={450} farbe={F.kupferHell}>
        Bei COPD
      </Etikett>

      <Zeiger von={[150, 588]} nach={[150, 552]} />
      <Etikett x={40} y={618}>
        Bronchien verengt
      </Etikett>
      <Unterzeile x={40} y={650}>
        und verschleimt
      </Unterzeile>
    </Zeichnung>
  );
}
