import { Etikett, F, Unterzeile, Zeichnung } from './bausteine';

const MITTE: [number, number] = [360, 262];
const RADIUS = 150;

/** Punkt auf der 24-Stunden-Uhr: 0 Uhr steht oben, die Uhr läuft im Uhrzeigersinn. */
function ort(stunde: number, radius = RADIUS): [number, number] {
  const winkel = (stunde / 24) * 2 * Math.PI;
  return [MITTE[0] + radius * Math.sin(winkel), MITTE[1] - radius * Math.cos(winkel)];
}

function Marke({ stunde, farbe }: { stunde: number; farbe: string }) {
  const [x, y] = ort(stunde);
  return <circle cx={x} cy={y} r="15" fill={farbe} stroke={F.linie} strokeWidth="4" />;
}

function Zeile({ y, farbe, titel, text }: { y: number; farbe: string; titel: string; text: string }) {
  return (
    <g>
      <circle cx="86" cy={y - 9} r="13" fill={farbe} stroke={F.linie} strokeWidth="3" />
      <Etikett x={116} y={y}>
        {titel}
      </Etikett>
      <Unterzeile x={116} y={y + 30}>
        {text}
      </Unterzeile>
    </g>
  );
}

/** Der Tag als 24-Stunden-Uhr mit fester Schlafenszeit, letztem Kaffee und Bildschirm-Aus. */
export default function Schlafhygiene() {
  const [ax, ay] = ort(23);
  const [bx, by] = ort(7);
  return (
    <Zeichnung titel="Eine 24-Stunden-Uhr: Der Schlaf liegt als fester Bogen von 23 bis 7 Uhr, markiert sind der letzte Kaffee am frühen Nachmittag und das Ausschalten der Bildschirme eine Stunde vor dem Zubettgehen">
      <circle cx={MITTE[0]} cy={MITTE[1]} r={RADIUS} fill="none" stroke={F.petrolDunkel} strokeWidth="30" />
      <path
        d={`M${ax} ${ay} A${RADIUS} ${RADIUS} 0 0 1 ${bx} ${by}`}
        fill="none"
        stroke={F.petrolHell}
        strokeWidth="30"
        strokeLinecap="round"
      />

      {[0, 6, 12, 18].map((stunde) => {
        const [x, y] = ort(stunde, RADIUS - 44);
        return (
          <text key={stunde} x={x} y={y + 8} textAnchor="middle" fontSize="22" fill={F.leise}>
            {stunde}
          </text>
        );
      })}

      {/* Mond in der Mitte */}
      <path
        d="M372 216 A50 50 0 1 0 408 290 A40 40 0 1 1 372 216 Z"
        fill={F.creme}
        stroke={F.linie}
        strokeWidth="3"
        strokeLinejoin="round"
      />

      <Marke stunde={14} farbe={F.kupfer} />
      <Marke stunde={22} farbe={F.kupferHell} />
      <Marke stunde={7} farbe={F.creme} />

      <Unterzeile x={ort(14, RADIUS + 34)[0]} y={ort(14, RADIUS + 34)[1] + 14} anker="end">
        14 Uhr
      </Unterzeile>
      <Unterzeile x={ort(22, RADIUS + 34)[0]} y={ort(22, RADIUS + 34)[1]} anker="end">
        22 Uhr
      </Unterzeile>
      <Unterzeile x={ort(7, RADIUS + 34)[0]} y={ort(7, RADIUS + 34)[1] + 10}>
        7 Uhr
      </Unterzeile>

      <Zeile y={512} farbe={F.creme} titel="Jeden Tag gleich aufstehen" text="auch am Wochenende" />
      <Zeile y={586} farbe={F.kupferHell} titel="Bildschirme aus" text="eine Stunde vor dem Schlafen" />
      <Zeile y={660} farbe={F.kupfer} titel="Letzter Kaffee" text="am frühen Nachmittag" />
    </Zeichnung>
  );
}
