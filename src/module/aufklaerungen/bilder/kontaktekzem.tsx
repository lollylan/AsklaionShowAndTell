import { Etikett, F, KONTUR, Pfeil, Unterzeile, Zeichnung, Zeiger } from './bausteine';

const LINKS = 60;
const BREITE = 600;
const HOEHE = 170;

/** Lücken in der Schutzschicht (Mitte in x) beim Ekzem. */
const LUECKEN = [230, 470];

/** Ziegel der Hornschicht in drei versetzten Reihen: [x, y]. */
function ziegel(oben: number, mitLuecken: boolean): [number, number][] {
  const liste: [number, number][] = [];
  for (let reihe = 0; reihe < 3; reihe++) {
    const y = oben + 6 + reihe * 22;
    for (let x = LINKS - (reihe % 2) * 45; x < LINKS + BREITE; x += 96) {
      const mitte = x + 45;
      if (mitLuecken && LUECKEN.some((l) => Math.abs(mitte - l) < 50)) continue;
      liste.push([x, y]);
    }
  }
  return liste;
}

/** Hautausschnitt im Schnitt: oben die Hornschicht als Ziegelmauer, darunter Oberhaut und Lederhaut. */
function Haut({ oben, ekzem, id }: { oben: number; ekzem: boolean; id: string }) {
  return (
    <g>
      <defs>
        <clipPath id={id}>
          <rect x={LINKS} y={oben} width={BREITE} height={HOEHE} rx="18" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${id})`}>
        <rect x={LINKS} y={oben} width={BREITE} height="74" fill={F.tief} />
        <rect x={LINKS} y={oben + 74} width={BREITE} height="56" fill={F.petrol} />
        <rect x={LINKS} y={oben + 130} width={BREITE} height="40" fill={F.petrolDunkel} />
        {ekzem &&
          LUECKEN.map((l) => (
            <ellipse key={l} cx={l} cy={oben + 104} rx="78" ry="34" fill={F.kupfer} />
          ))}
        {ziegel(oben, ekzem).map(([x, y]) => (
          <rect key={`${x}-${y}`} x={x} y={y} width="90" height="18" rx="5" fill={F.petrolHell} />
        ))}
      </g>
      <rect x={LINKS} y={oben} width={BREITE} height={HOEHE} rx="18" {...KONTUR} />
    </g>
  );
}

/** Reizstoff als kleines Teilchen über der Haut. */
function Teilchen({ x, y }: { x: number; y: number }) {
  return <circle cx={x} cy={y} r="9" fill={F.creme} />;
}

/** Hornschicht als Ziegelmauer: gesund dicht, beim Ekzem mit Lücken, durch die Reizstoffe eindringen. */
export default function Kontaktekzem() {
  const oben1 = 160;
  const oben2 = 520;
  return (
    <Zeichnung titel="Zwei Hautausschnitte im Schnitt: Oben gesunde Haut, deren Schutzschicht wie eine dichte Ziegelmauer Reizstoffe abprallen lässt. Unten das Kontaktekzem: Die Schutzschicht hat Lücken, Reizstoffe dringen ein, darunter ist die Haut entzündet">
      {/* Gesunde Haut */}
      <Etikett x={LINKS} y={56}>
        Gesunde Haut
      </Etikett>
      <Unterzeile x={LINKS} y={86}>
        Schutzschicht hält Reizstoffe ab
      </Unterzeile>
      <Haut oben={oben1} ekzem={false} id="kontaktekzem-gesund" />
      {[220, 380, 540].map((x) => (
        <g key={x}>
          <Teilchen x={x - 34} y={112} />
          <Pfeil d={`M${x - 22} ${118} L${x} ${148} L${x + 22} ${118}`} farbe={F.leise} breite={4} />
        </g>
      ))}

      {/* Kontaktekzem */}
      <Etikett x={LINKS} y={416} farbe={F.kupferHell}>
        Kontaktekzem
      </Etikett>
      <Unterzeile x={LINKS} y={446}>
        Reizstoffe dringen durch Lücken ein
      </Unterzeile>
      <Haut oben={oben2} ekzem id="kontaktekzem-ekzem" />
      {LUECKEN.map((l) => (
        <g key={l}>
          <Teilchen x={l - 2} y={474} />
          <Pfeil d={`M${l - 2} ${490} L${l - 2} ${608}`} farbe={F.creme} breite={4} />
        </g>
      ))}

      <Etikett x={660} y={492} anker="end" farbe={F.kupferHell}>
        Entzündung
      </Etikett>
      <Zeiger von={[600, 502]} nach={[530, 618]} />
    </Zeichnung>
  );
}
