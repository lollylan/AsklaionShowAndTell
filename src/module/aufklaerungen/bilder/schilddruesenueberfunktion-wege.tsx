import { Etikett, F, KONTUR, Pfeil, Unterzeile, Zeichnung } from './bausteine';

/** Kleine Schilddrüse, Mitte bei (x, y). */
function Druese({ x, y, fuellung, gestrichelt = false }: { x: number; y: number; fuellung: string; gestrichelt?: boolean }) {
  return (
    <path
      transform={`translate(${x} ${y})`}
      d="M0 -6 C-12 -22 -18 -50 -34 -50 C-58 -50 -64 -22 -64 0 C-64 36 -50 50 -32 50 C-14 50 -6 38 0 34 C6 38 14 50 32 50 C50 50 64 36 64 0 C64 -22 58 -50 34 -50 C18 -50 12 -22 0 -6 Z"
      {...KONTUR}
      fill={fuellung}
      strokeDasharray={gestrichelt ? '8 10' : undefined}
    />
  );
}

/** Drei Wege bei Überfunktion: Tabletten, Radiojod, Operation – danach oft Hormon als Tablette. */
export default function SchilddruesenueberfunktionWege() {
  return (
    <Zeichnung titel="Drei Wege der Behandlung einer Überfunktion: Tabletten bremsen die Hormonbildung, Radiojod als Kapsel wirkt nur in der Schilddrüse, bei der Operation wird die Schilddrüse ganz oder teilweise entfernt. Nach Radiojod und Operation fehlt oft Hormon, das dann als Tablette ersetzt wird">
      {/* Tabletten */}
      <Druese x={130} y={200} fuellung={F.kupfer} />
      <circle cx="98" cy="300" r="16" {...KONTUR} strokeWidth={3} fill={F.petrolHell} />
      <circle cx="140" cy="300" r="16" {...KONTUR} strokeWidth={3} fill={F.petrolHell} />
      <Etikett x={130} y={370} anker="middle">
        Tabletten
      </Etikett>
      <Unterzeile x={130} y={400} anker="middle">
        bremsen die Bildung
      </Unterzeile>

      {/* Radiojod */}
      <Druese x={360} y={200} fuellung={F.petrol} />
      {[
        [334, 196],
        [386, 196],
        [326, 226],
        [394, 226],
      ].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="8" fill={F.kupferHell} />
      ))}
      <g transform="translate(360 300) rotate(-30)">
        <rect x="-30" y="-14" width="60" height="28" rx="14" {...KONTUR} strokeWidth={3} fill={F.kupferHell} />
      </g>
      <Etikett x={360} y={370} anker="middle">
        Radiojod
      </Etikett>
      <Unterzeile x={360} y={400} anker="middle">
        wirkt nur dort
      </Unterzeile>

      {/* Operation */}
      <Druese x={590} y={200} fuellung="none" gestrichelt />
      <Etikett x={590} y={370} anker="middle">
        Operation
      </Etikett>
      <Unterzeile x={590} y={400} anker="middle">
        ganz oder teilweise
      </Unterzeile>

      <Pfeil d="M360 420 L400 504" farbe={F.leise} breite={4} />
      <Pfeil d="M590 420 L520 504" farbe={F.leise} breite={4} />

      <Etikett x={460} y={552} anker="middle">
        Danach fehlt oft Hormon
      </Etikett>
      <Unterzeile x={460} y={582} anker="middle">
        dann eine Tablette, gut verträglich
      </Unterzeile>

      <Unterzeile x={40} y={470}>
        Basedow: meist
      </Unterzeile>
      <Unterzeile x={40} y={496}>
        1 bis 1½ Jahre
      </Unterzeile>
    </Zeichnung>
  );
}
