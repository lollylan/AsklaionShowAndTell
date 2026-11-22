import { Etikett, F, KONTUR, Pfeil, Unterzeile, Zeichnung } from './bausteine';

/** Vene senkrecht mit Gerinnsel der Größe rx × ry; das Blut fließt nach oben. */
function Vene({ x, rx, ry }: { x: number; rx: number; ry: number }) {
  return (
    <g>
      <rect x={x - 50} y="130" width="100" height="320" fill={F.petrolDunkel} />
      <ellipse cx={x - 50 + rx} cy="290" rx={rx} ry={ry} fill={F.kupfer} stroke={F.linie} strokeWidth="3" />
      <path d={`M${x - 50} 130 L${x - 50} 450 M${x + 50} 130 L${x + 50} 450`} {...KONTUR} />
    </g>
  );
}

/** Zeitverlauf: Unter dem Gerinnungshemmer baut der Körper das Gerinnsel nach und nach ab. */
export default function ThromboseBehandlung() {
  return (
    <Zeichnung titel="Drei Bilder einer Beinvene: am Anfang füllt das Gerinnsel sie fast aus, nach einigen Wochen ist es kleiner, nach drei Monaten ist nur noch ein kleiner Rest an der Wand. Darunter ein Balken: Gerinnungshemmer mindestens drei Monate">
      <Etikett x={360} y={64} anker="middle">
        Der Körper baut das Gerinnsel ab
      </Etikett>

      <Vene x={130} rx={44} ry={110} />
      <Vene x={360} rx={28} ry={66} />
      <Vene x={590} rx={9} ry={24} />
      <Pfeil d="M376 430 L376 360" farbe={F.linie} breite={4} />
      <Pfeil d="M600 430 L600 160" farbe={F.linie} breite={4} />

      <Etikett x={130} y={500} anker="middle" farbe={F.kupferHell}>
        Am Anfang
      </Etikett>
      <Etikett x={360} y={500} anker="middle">
        Nach Wochen
      </Etikett>
      <Etikett x={590} y={500} anker="middle">
        Nach 3 Monaten
      </Etikett>

      <rect x="40" y="556" width="640" height="34" rx="17" fill={F.petrolHell} />
      <Unterzeile x={360} y={581} anker="middle" farbe={F.tief}>
        Gerinnungshemmer jeden Tag
      </Unterzeile>
      <Unterzeile x={360} y={640} anker="middle">
        mindestens drei Monate, manchmal länger
      </Unterzeile>
    </Zeichnung>
  );
}
