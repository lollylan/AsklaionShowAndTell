import { Etikett, F, KONTUR, Unterzeile, Zeichnung, Zeiger } from './bausteine';

/** Fettpolster um die Bauchorgane als Kreise [x, y, r]. */
const FETT: [number, number, number][] = [
  [140, 400, 22],
  [190, 380, 20],
  [236, 404, 22],
  [118, 450, 18],
  [166, 446, 24],
  [218, 456, 22],
  [262, 452, 16],
  [146, 498, 18],
  [196, 500, 20],
  [242, 494, 16],
];

/** Oberkörper mit Bauchfett, daneben die BMI-Skala. */
export default function Adipositas() {
  return (
    <Zeichnung titel="Oberkörper von vorn mit Fettpolstern im Bauch, daneben eine BMI-Skala: unter 25 normal, 25 bis 30 Übergewicht, ab 30 Adipositas">
      <defs>
        <clipPath id="adipositas-skala">
          <rect x="380" y="80" width="50" height="500" rx="14" />
        </clipPath>
      </defs>

      {/* Kopf, Hals und Oberkörper mit rundem Bauch */}
      <circle cx="185" cy="100" r="46" {...KONTUR} fill={F.petrol} />
      <path d="M163 144 L163 182 M207 144 L207 182" {...KONTUR} />
      <path
        d="M120 180 L250 180 C290 185 300 210 298 250 C300 300 322 340 324 420 C326 500 300 560 270 600 L100 600 C70 560 44 500 46 420 C48 340 70 300 72 250 C70 210 80 185 120 180 Z"
        {...KONTUR}
        fill={F.petrol}
      />

      {/* Fett um die Bauchorgane */}
      <ellipse cx="190" cy="445" rx="108" ry="92" fill={F.kupfer} fillOpacity="0.45" />
      <g fill={F.kupfer} stroke={F.kupferHell} strokeWidth="3">
        {FETT.map(([x, y, r]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r={r} />
        ))}
      </g>

      <Zeiger von={[185, 634]} nach={[190, 520]} />
      <Etikett x={185} y={666} anker="middle" farbe={F.kupferHell}>
        Bauchfett
      </Etikett>

      {/* BMI-Skala */}
      <g clipPath="url(#adipositas-skala)">
        <rect x="380" y="80" width="50" height="180" fill={F.kupfer} />
        <rect x="380" y="260" width="50" height="140" fill={F.kupferHell} />
        <rect x="380" y="400" width="50" height="180" fill={F.petrolHell} />
      </g>
      <rect x="380" y="80" width="50" height="500" rx="14" {...KONTUR} />

      <Etikett x={405} y={56} anker="middle">
        BMI
      </Etikett>

      <Etikett x={450} y={165} farbe={F.kupferHell}>
        ab 30
      </Etikett>
      <Unterzeile x={450} y={197}>
        Adipositas
      </Unterzeile>

      <Etikett x={450} y={325}>
        25 bis 30
      </Etikett>
      <Unterzeile x={450} y={357}>
        Übergewicht
      </Unterzeile>

      <Etikett x={450} y={485}>
        unter 25
      </Etikett>
      <Unterzeile x={450} y={517}>
        Normalgewicht
      </Unterzeile>
    </Zeichnung>
  );
}
