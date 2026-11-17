import { Etikett, F, Pfeil, Unterzeile, Zeichnung, Zeiger } from './bausteine';

/** Oberkörper von hinten: Rücken mit rechtem Arm als eine Fläche, der Arm liegt vorne. */
const KOERPER =
  'M-10 722 L-10 270 C30 252 66 250 120 246 L214 242 C264 240 290 272 290 326 L296 580 L300 722 Z';
const ARM = 'M164 400 C162 320 180 250 214 242 C264 240 290 272 290 326 L296 580 L300 722 L178 722 L170 580 Z';

export default function BlutzuckerSensor() {
  return (
    <Zeichnung titel="Oberkörper von hinten: auf der Rückseite des Oberarms klebt ein runder Sensor, der rund um die Uhr misst; daneben ein Handy, das den Wert 118 mit einem Trendpfeil und einer kleinen Verlaufskurve zeigt">
      {/* Kopf und Hals von hinten */}
      <rect x="44" y="196" width="56" height="70" fill={F.petrolDunkel} stroke={F.linie} strokeWidth="4" />
      <ellipse cx="72" cy="168" rx="48" ry="56" fill={F.petrolDunkel} stroke={F.linie} strokeWidth="4" />

      {/* Rücken und Arm */}
      <path d={KOERPER} fill={F.petrolDunkel} stroke={F.linie} strokeWidth="4" strokeLinejoin="round" />
      <path d={ARM} fill={F.petrol} stroke={F.linie} strokeWidth="4" strokeLinejoin="round" />
      <path d="M214 580 Q236 590 262 582" fill="none" stroke={F.leise} strokeWidth="3" strokeLinecap="round" />

      {/* Sensor */}
      <circle cx="234" cy="390" r="36" fill={F.kupfer} stroke={F.linie} strokeWidth="4" />
      <circle cx="234" cy="390" r="14" fill={F.kupferHell} />

      {/* Funk zum Handy */}
      <g fill="none" stroke={F.leise} strokeWidth="4" strokeLinecap="round">
        <path d="M318 362 A28 28 0 0 1 318 402" />
        <path d="M340 346 A50 50 0 0 1 340 418" />
        <path d="M362 330 A72 72 0 0 1 362 434" />
      </g>

      {/* Handy */}
      <rect x="400" y="200" width="200" height="360" rx="28" fill={F.petrolDunkel} stroke={F.linie} strokeWidth="4" />
      <rect x="416" y="236" width="168" height="288" rx="10" fill={F.tief} />
      <text x="470" y="330" textAnchor="middle" fontSize="60" fontWeight="700" fill={F.linie}>
        118
      </text>
      <text x="470" y="360" textAnchor="middle" fontSize="20" fill={F.leise}>
        mg/dl
      </text>
      <Pfeil d="M532 322 L564 290" farbe={F.kupfer} breite={7} />
      <rect x="428" y="420" width="144" height="52" fill={F.petrol} opacity="0.6" />
      <path d="M430 480 C450 470 462 410 484 430 C504 448 516 470 536 448 C548 434 556 420 566 412" fill="none" stroke={F.petrolHell} strokeWidth="4" strokeLinecap="round" />
      <circle cx="566" cy="412" r="6" fill={F.kupferHell} />

      {/* Beschriftungen */}
      <Etikett x={40} y={60} farbe={F.kupferHell}>
        Sensor am Oberarm
      </Etikett>
      <Unterzeile x={40} y={92}>
        misst rund um die Uhr
      </Unterzeile>
      <Zeiger von={[300, 104]} nach={[246, 366]} />

      <Etikett x={690} y={150} anker="end">
        Trendpfeil
      </Etikett>
      <Zeiger von={[620, 162]} nach={[556, 298]} />

      <Etikett x={500} y={610} anker="middle">
        Handy liest ab
      </Etikett>
    </Zeichnung>
  );
}
