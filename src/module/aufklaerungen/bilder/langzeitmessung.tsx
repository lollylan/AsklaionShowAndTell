import { Etikett, F, KONTUR, Unterzeile, Zeichnung, Zeiger } from './bausteine';

const RUMPF = 'M220 200 Q300 185 380 200 Q420 210 425 260 L410 560 L190 560 L175 260 Q180 210 220 200 Z';

/** Elektroden auf der Brust; jede hat ein Kabel zum EKG-Rekorder. */
const ELEKTRODEN: [number, number][] = [
  [250, 260],
  [350, 260],
  [300, 320],
  [255, 380],
  [345, 380],
];

/** Arm als Röhre mit Kontur: erst breit in Linienfarbe, darüber schmaler in Petrol. */
function Arm({ d }: { d: string }) {
  return (
    <g>
      <path d={d} fill="none" stroke={F.linie} strokeWidth="54" strokeLinecap="round" />
      <path d={d} fill="none" stroke={F.petrol} strokeWidth="46" strokeLinecap="round" />
    </g>
  );
}

/** Oberkörper mit Elektroden fürs Langzeit-EKG, Blutdruckmanschette am Arm und zwei Rekordern am Gürtel. */
export default function Langzeitmessung() {
  return (
    <Zeichnung titel="Oberkörper von vorn: Elektroden auf der Brust mit Kabeln zu einem kleinen EKG-Rekorder, eine Blutdruckmanschette am Oberarm mit Schlauch zum Messgerät, beide Geräte am Gürtel">
      <Arm d="M180 240 L140 470" />
      <Arm d="M420 240 L460 470" />

      {/* Hals, Kopf, Rumpf */}
      <path d="M282 160 L282 196 M318 160 L318 196" {...KONTUR} />
      <circle cx="300" cy="120" r="52" fill={F.petrol} stroke={F.linie} strokeWidth="4" />
      <path d={RUMPF} fill={F.petrol} />
      <path d={RUMPF} {...KONTUR} />

      {/* Kabel zum EKG-Rekorder */}
      {ELEKTRODEN.map(([x, y]) => (
        <path
          key={`k-${x}-${y}`}
          d={`M${x} ${y} Q${(x + 242) / 2 - 12} ${(y + 470) / 2} 242 470`}
          fill="none"
          stroke={F.leise}
          strokeWidth="3"
          strokeLinecap="round"
        />
      ))}
      {ELEKTRODEN.map(([x, y]) => (
        <circle key={`e-${x}-${y}`} cx={x} cy={y} r="11" fill={F.creme} stroke={F.linie} strokeWidth="3" />
      ))}

      {/* Blutdruckmanschette mit Schlauch */}
      <path d="M424 348 C392 384 378 420 372 470" fill="none" stroke={F.linie} strokeWidth="5" strokeLinecap="round" />
      <rect
        x="-34"
        y="-40"
        width="68"
        height="80"
        rx="10"
        transform="translate(432 310) rotate(-10)"
        fill={F.kupfer}
        stroke={F.kupferHell}
        strokeWidth="4"
      />

      {/* Rekorder am Gürtel */}
      <rect x="200" y="470" width="86" height="64" rx="10" fill={F.petrolDunkel} stroke={F.linie} strokeWidth="4" />
      <rect x="322" y="470" width="86" height="64" rx="10" fill={F.petrolDunkel} stroke={F.linie} strokeWidth="4" />
      <circle cx="243" cy="502" r="8" fill={F.leise} />
      <circle cx="365" cy="502" r="8" fill={F.leise} />

      <Zeiger von={[196, 68]} nach={[250, 260]} />
      <Etikett x={40} y={66}>
        Elektroden
      </Etikett>
      <Unterzeile x={40} y={98}>
        auf der Brust
      </Unterzeile>

      <Zeiger von={[500, 292]} nach={[462, 302]} />
      <Etikett x={510} y={300}>
        Manschette
      </Etikett>
      <Unterzeile x={510} y={332}>
        pumpt sich auf
      </Unterzeile>

      <Etikett x={304} y={620} anker="middle">
        Rekorder am Gürtel
      </Etikett>
      <Unterzeile x={304} y={652} anker="middle">
        zeichnen 24 Stunden auf
      </Unterzeile>
    </Zeichnung>
  );
}
