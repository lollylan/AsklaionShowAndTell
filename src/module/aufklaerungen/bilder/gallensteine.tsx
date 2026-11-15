import { Etikett, F, KONTUR, Unterzeile, Zeichnung, Zeiger } from './bausteine';

/** Gallensteine in der Gallenblase [x, y, r]; der letzte klemmt im Ausgang. */
const STEINE: [number, number, number][] = [
  [238, 432, 20],
  [276, 420, 15],
  [252, 396, 13],
  [216, 404, 12],
  [306, 322, 11],
];

/** Gang als Röhre: helle Kontur, darin der Gallenfluss. */
function Gang({ d, breite }: { d: string; breite: number }) {
  return (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} stroke={F.linie} strokeWidth={breite + 8} />
      <path d={d} stroke={F.petrolHell} strokeWidth={breite} />
    </g>
  );
}

/** Leber, Gallenblase mit Steinen, Gallengang und Zwölffingerdarm von vorn. */
export default function Gallensteine() {
  return (
    <Zeichnung titel="Leber mit der Gallenblase darunter; in der Gallenblase liegen mehrere Steine, einer klemmt im Ausgang; der Gallengang führt zum Dünndarm">
      {/* Zwölffingerdarm als C-förmige Schlinge */}
      <path
        d="M600 440 C480 440 430 470 430 540 C430 610 480 640 600 640"
        fill="none"
        stroke={F.linie}
        strokeWidth="56"
        strokeLinecap="round"
      />
      <path
        d="M600 440 C480 440 430 470 430 540 C430 610 480 640 600 640"
        fill="none"
        stroke={F.petrol}
        strokeWidth="48"
        strokeLinecap="round"
      />

      {/* Gallengang und Gang aus der Gallenblase */}
      <Gang d="M382 240 C388 330 402 430 428 530" breite={10} />
      <Gang d="M318 318 C340 330 362 318 386 300" breite={8} />

      {/* Leber */}
      <path
        d="M60 120 C60 70 200 50 360 60 C480 68 620 80 640 120 C650 150 560 190 460 230 C380 262 300 300 220 300 C130 300 60 220 60 120 Z"
        {...KONTUR}
        fill={F.petrol}
      />

      {/* Gallenblase */}
      <path
        d="M304 300 C334 302 344 332 332 362 C320 420 300 470 250 470 C200 470 186 420 200 382 C214 342 262 298 304 300 Z"
        {...KONTUR}
        fill={F.petrolHell}
      />
      <g fill={F.kupfer} stroke={F.kupferHell} strokeWidth="3">
        {STEINE.map(([x, y, r]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r={r} />
        ))}
      </g>

      <Etikett x={420} y={160} anker="middle">
        Leber
      </Etikett>

      <Zeiger von={[200, 338]} nach={[226, 374]} />
      <Etikett x={40} y={346}>
        Gallenblase
      </Etikett>

      <Zeiger von={[250, 508]} nach={[246, 446]} />
      <Etikett x={250} y={540} anker="middle" farbe={F.kupferHell}>
        Gallensteine
      </Etikett>

      <Zeiger von={[464, 336]} nach={[395, 352]} />
      <Unterzeile x={472} y={344}>
        Gallengang
      </Unterzeile>

      <Unterzeile x={600} y={548}>
        Darm
      </Unterzeile>

      <Unterzeile x={360} y={696} anker="middle">
        Klemmt ein Stein im Ausgang, kommt die Kolik.
      </Unterzeile>
    </Zeichnung>
  );
}
