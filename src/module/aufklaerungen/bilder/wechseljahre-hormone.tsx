import { Etikett, F, KONTUR, Pfeil, Unterzeile, Zeichnung } from './bausteine';

const LEBER = 'M250 214 Q256 168 316 164 Q384 160 410 184 Q418 204 396 228 Q356 274 306 282 Q256 288 250 252 Z';

/** Ader im Querschnitt als Ziel: das Blut. */
function Blut({ y }: { y: number }) {
  return (
    <g>
      <circle cx="610" cy={y} r="46" {...KONTUR} fill={F.petrolHell} />
      <circle cx="610" cy={y} r="28" fill={F.tief} />
    </g>
  );
}

/** Hormone als Tablette über die Leber oder als Pflaster und Gel direkt über die Haut. */
export default function WechseljahreHormone() {
  return (
    <Zeichnung titel="Zwei Wege der Hormone ins Blut. Oben die Tablette: Sie geht erst durch die Leber, das Thromboserisiko ist etwas höher. Unten Pflaster oder Gel: Das Hormon geht über die Haut direkt ins Blut, das Thromboserisiko ist geringer. Mit Gebärmutter gehört immer ein Gestagen dazu">
      {/* Tablette */}
      <Etikett x={40} y={86}>
        Tablette
      </Etikett>
      <g transform="translate(110 224) rotate(-30)">
        <rect x="-40" y="-18" width="80" height="36" rx="18" {...KONTUR} strokeWidth={3} fill={F.petrolHell} />
      </g>
      <Pfeil d="M162 224 L236 224" farbe={F.linie} breite={5} />
      <path d={LEBER} {...KONTUR} fill={F.petrol} />
      <Unterzeile x={330} y={316} anker="middle">
        erst durch die Leber
      </Unterzeile>
      <Pfeil d="M424 224 L548 224" farbe={F.linie} breite={5} />
      <Blut y={224} />
      <Unterzeile x={680} y={86} anker="end" farbe={F.kupferHell}>
        etwas mehr Thrombosen
      </Unterzeile>

      {/* Pflaster oder Gel */}
      <Etikett x={40} y={392}>
        Pflaster oder Gel
      </Etikett>
      <path d="M40 520 L330 520" {...KONTUR} stroke={F.leise} />
      <rect x="70" y="474" width="110" height="46" rx="10" {...KONTUR} strokeWidth={3} fill={F.creme} />
      <rect x="96" y="486" width="58" height="22" rx="4" fill={F.petrolHell} />
      <Unterzeile x={40} y={556}>
        Haut
      </Unterzeile>
      <Pfeil d="M190 497 L548 497" farbe={F.linie} breite={5} />
      <Unterzeile x={360} y={474} anker="middle">
        direkt ins Blut
      </Unterzeile>
      <Blut y={497} />
      <Unterzeile x={680} y={392} anker="end">
        weniger Thrombosen
      </Unterzeile>

      <Unterzeile x={610} y={584} anker="middle">
        Blut
      </Unterzeile>

      <Etikett x={40} y={648}>
        Mit Gebärmutter immer mit Gestagen
      </Etikett>
      <Unterzeile x={40} y={680}>
        Es schützt die Schleimhaut der Gebärmutter
      </Unterzeile>
    </Zeichnung>
  );
}
