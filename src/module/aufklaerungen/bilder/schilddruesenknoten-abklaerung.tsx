import { Etikett, F, KONTUR, Pfeil, Unterzeile, Zeichnung } from './bausteine';

interface KastenProps {
  x: number;
  y: number;
  breite: number;
  titel: string;
  zeile: string;
  fuellung?: string;
}

function Kasten({ x, y, breite, titel, zeile, fuellung = F.petrol }: KastenProps) {
  return (
    <g>
      <rect x={x} y={y} width={breite} height="104" rx="16" {...KONTUR} fill={fuellung} />
      <Etikett x={x + breite / 2} y={y + 46} anker="middle">
        {titel}
      </Etikett>
      <Unterzeile x={x + breite / 2} y={y + 78} anker="middle" farbe={F.linie}>
        {zeile}
      </Unterzeile>
    </g>
  );
}

/** Ablauf der Abklärung eines Schilddrüsenknotens. */
export default function SchilddruesenknotenAbklaerung() {
  return (
    <Zeichnung titel="Ablauf der Abklärung: Zuerst Ultraschall und Blutwert TSH. Ist das TSH niedrig, folgt eine Szintigrafie. Sieht ein Knoten ab etwa einem Zentimeter auffällig aus, wird er mit einer feinen Nadel punktiert. Meist reichen danach Kontrollen">
      <Kasten x={150} y={60} breite={420} titel="Ultraschall und TSH" zeile="Größe, Form, Rand, Durchblutung" />

      <Pfeil d="M250 172 L170 262" farbe={F.leise} breite={4} />
      <Pfeil d="M470 172 L550 262" farbe={F.leise} breite={4} />
      <Pfeil d="M360 172 L360 462" farbe={F.linie} breite={5} />

      <Kasten x={30} y={272} breite={290} titel="Szintigrafie" zeile="wenn TSH niedrig" fuellung={F.petrolDunkel} />
      <Kasten x={400} y={272} breite={290} titel="Feine Nadel" zeile="wenn auffällig, ab 1 cm" fuellung={F.petrolDunkel} />

      <Pfeil d="M175 384 L280 462" farbe={F.leise} breite={4} />
      <Pfeil d="M545 384 L440 462" farbe={F.leise} breite={4} />

      <Kasten x={110} y={472} breite={500} titel="Meist reichen Kontrollen" zeile="Behandlung nur, wenn nötig" fuellung={F.petrolHell} />

      <Unterzeile x={360} y={650} anker="middle">
        Über 95 von 100 Knoten sind gutartig
      </Unterzeile>
    </Zeichnung>
  );
}
