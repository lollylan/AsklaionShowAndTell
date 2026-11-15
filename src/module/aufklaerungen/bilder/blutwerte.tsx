import { Etikett, F, Unterzeile, Zeichnung, Zeiger } from './bausteine';

/** Rote Blutkörperchen im Blickfeld (Mittelpunkt 215 / 360, Radius 185). */
const ROTE: [number, number][] = [
  [130, 250],
  [200, 230],
  [270, 250],
  [330, 300],
  [240, 300],
  [100, 320],
  [170, 310],
  [110, 400],
  [180, 440],
  [250, 380],
  [250, 460],
  [320, 460],
  [145, 495],
  [215, 515],
];

/** Blutplättchen, klein und unregelmäßig. */
const PLAETTCHEN: [number, number, number][] = [
  [290, 520, 20],
  [80, 460, -30],
  [380, 320, 10],
  [190, 375, 45],
  [90, 260, -10],
];

/** Blick ins Blut mit den drei Sorten Blutzellen, die das Blutbild zählt. */
export default function Blutwerte() {
  return (
    <Zeichnung titel="Blick ins Blut: viele rote Blutkörperchen, ein großes weißes Blutkörperchen und kleine Blutplättchen – die drei Zellsorten, die das Blutbild zählt">
      <circle cx="215" cy="360" r="185" fill={F.tief} stroke={F.linie} strokeWidth="4" />

      {ROTE.map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <circle cx={x} cy={y} r="26" fill={F.kupfer} stroke={F.kupferHell} strokeWidth="3" />
          <circle cx={x} cy={y} r="11" fill={F.kupferHell} fillOpacity="0.45" />
        </g>
      ))}

      {PLAETTCHEN.map(([x, y, w]) => (
        <ellipse
          key={`${x}-${y}`}
          cx={x}
          cy={y}
          rx="10"
          ry="6"
          transform={`rotate(${w} ${x} ${y})`}
          fill={F.petrolHell}
          stroke={F.linie}
          strokeWidth="2"
        />
      ))}

      {/* Weißes Blutkörperchen mit gelapptem Kern */}
      <circle cx="320" cy="380" r="40" fill={F.creme} stroke={F.linie} strokeWidth="3" />
      <path
        d="M298 372 C300 356 318 356 320 368 C322 356 342 358 342 374 C342 390 326 394 320 386 C314 396 296 390 298 372 Z"
        fill={F.petrol}
      />

      <Zeiger von={[424, 192]} nach={[330, 300]} />
      <Etikett x={700} y={200} anker="end">
        Rote Blutkörperchen
      </Etikett>
      <Unterzeile x={700} y={232} anker="end">
        tragen Sauerstoff (Hb)
      </Unterzeile>

      <Zeiger von={[408, 362]} nach={[358, 372]} />
      <Etikett x={700} y={370} anker="end">
        Weiße Blutkörperchen
      </Etikett>
      <Unterzeile x={700} y={402} anker="end">
        wehren Keime ab
      </Unterzeile>

      <Zeiger von={[508, 532]} nach={[292, 520]} />
      <Etikett x={700} y={540} anker="end">
        Blutplättchen
      </Etikett>
      <Unterzeile x={700} y={572} anker="end">
        dichten Wunden ab
      </Unterzeile>
    </Zeichnung>
  );
}
