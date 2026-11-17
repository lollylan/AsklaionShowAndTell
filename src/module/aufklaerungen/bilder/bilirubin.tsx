import { Etikett, F, KONTUR, Pfeil, Unterzeile, Zeichnung } from './bausteine';

/** Rote Blutkörperchen als Scheiben mit heller Delle. */
const BLUTKOERPERCHEN: [number, number][] = [
  [86, 150],
  [150, 128],
  [130, 200],
];

const MILZ =
  'M310 150 C310 112 350 98 392 110 C432 122 448 160 432 196 C418 228 372 238 340 220 C352 200 352 184 330 182 C314 180 310 166 310 150 Z';

const LEBER =
  'M498 150 C510 110 600 100 660 112 C700 120 708 150 698 180 C686 214 640 240 596 248 C556 254 510 236 500 206 C494 188 494 168 498 150 Z';

/** Dickdarm als Rahmen, offen nach unten. */
const DARM = 'M240 540 L240 384 Q240 360 264 360 L456 360 Q480 360 480 384 L480 540';

/** Weg des Bilirubins: altes Blut, Milz, Leber, Galle, Darm – und was bei einem Stau passiert. */
export default function Bilirubin() {
  return (
    <Zeichnung titel="Weg des Bilirubins: Alte rote Blutkörperchen werden in der Milz abgebaut, die Leber gibt das Bilirubin in die Galle, mit der Galle gelangt es in den Darm und färbt den Stuhl braun. Staut sich die Galle, bleibt Bilirubin im Blut und Augen und Haut werden gelb.">
      {/* Altes Blut */}
      {BLUTKOERPERCHEN.map(([x, y]) => (
        <g key={x}>
          <circle cx={x} cy={y} r="32" fill={F.kupfer} stroke={F.linie} strokeWidth="4" />
          <circle cx={x} cy={y} r="13" fill={F.kupferHell} />
        </g>
      ))}
      <Pfeil d="M200 166 L290 166" />

      {/* Milz */}
      <path d={MILZ} fill={F.petrol} />
      <path d={MILZ} {...KONTUR} />
      <Pfeil d="M456 166 L486 166" />

      {/* Leber */}
      <path d={LEBER} fill={F.petrol} />
      <path d={LEBER} {...KONTUR} />
      <Etikett x={600} y={186} anker="middle">
        Leber
      </Etikett>

      {/* Galle fließt in den Darm, mit Engstelle als möglichem Stau */}
      <Pfeil d="M600 262 C600 320 560 350 500 380" farbe={F.leise} breite={6} />
      <line x1="566" y1="306" x2="612" y2="334" stroke={F.kupfer} strokeWidth="8" strokeLinecap="round" />
      <Unterzeile x={622} y={312}>
        Galle
      </Unterzeile>

      {/* Darm */}
      <path d={DARM} fill="none" stroke={F.linie} strokeWidth="44" strokeLinecap="round" strokeLinejoin="round" />
      <path d={DARM} fill="none" stroke={F.petrolHell} strokeWidth="36" strokeLinecap="round" strokeLinejoin="round" />
      <Etikett x={360} y={452} anker="middle">
        Darm
      </Etikett>
      <Unterzeile x={360} y={486} anker="middle">
        Stuhl wird braun
      </Unterzeile>

      {/* Beschriftung erste Reihe */}
      <Etikett x={124} y={276} anker="middle">
        Altes Blut
      </Etikett>
      <Unterzeile x={124} y={308} anker="middle">
        wird zerlegt
      </Unterzeile>
      <Etikett x={376} y={276} anker="middle">
        Milz
      </Etikett>
      <Unterzeile x={376} y={308} anker="middle">
        macht Bilirubin
      </Unterzeile>

      {/* Gelbsucht bei Stau */}
      <g transform="translate(112 640)">
        <path d="M-64 0 Q0 -44 64 0 Q0 44 -64 0 Z" fill={F.kupferHell} stroke={F.linie} strokeWidth="4" strokeLinejoin="round" />
        <circle cx="0" cy="0" r="20" fill={F.petrol} stroke={F.linie} strokeWidth="3" />
        <circle cx="0" cy="0" r="8" fill={F.tief} />
      </g>
      <Etikett x={204} y={630} farbe={F.kupferHell}>
        Stau: Gelbsucht
      </Etikett>
      <Unterzeile x={204} y={662}>
        Bilirubin bleibt im Blut, Augen werden gelb
      </Unterzeile>
    </Zeichnung>
  );
}
