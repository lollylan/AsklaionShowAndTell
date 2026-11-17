import { Etikett, F, Unterzeile, Zeichnung, Zeiger } from './bausteine';
import { Wanne } from './iontophorese';

/** Rechte Fußsohle von oben, Zehen nach oben, großer Zeh links; Mitte bei (0, 0). */
function Fuss() {
  const zehen: [number, number, number][] = [
    [-30, -122, 17],
    [-4, -132, 11],
    [16, -128, 10],
    [32, -118, 9],
    [45, -104, 8],
  ];
  return (
    <g fill={F.creme} stroke={F.linie} strokeWidth="3">
      <path d="M-8 -108 C32 -112 56 -80 52 -30 C48 20 40 70 36 100 C32 132 -36 132 -38 100 C-42 60 -54 10 -50 -40 C-47 -86 -36 -106 -8 -108 Z" />
      {zehen.map(([x, y, r]) => (
        <circle key={x} cx={x} cy={y} r={r} />
      ))}
    </g>
  );
}

/** Links Füße in zwei Wannen, rechts eine Schwammtasche in der Achsel. */
export default function IontophoreseFuesse() {
  return (
    <Zeichnung titel="Links: beide Fußsohlen liegen flach in je einer Wanne mit Leitungswasser. Rechts: Oberkörper mit erhobenem Arm, in der Achsel steckt eine feuchte Schwammtasche mit Elektrode">
      <Etikett x={175} y={70} anker="middle">
        Füße
      </Etikett>
      <g transform="translate(105 340)">
        <Wanne breite={130} hoehe={340} pol="+" />
        <g transform="translate(0 20) scale(-1 1)">
          <Fuss />
        </g>
      </g>
      <g transform="translate(250 340)">
        <Wanne breite={130} hoehe={340} pol="−" />
        <g transform="translate(0 20)">
          <Fuss />
        </g>
      </g>
      <Unterzeile x={175} y={560} anker="middle">
        Sohlen flach ins Wasser
      </Unterzeile>

      <line x1={360} y1={60} x2={360} y2={660} stroke={F.petrolHell} strokeWidth="2" />

      <Etikett x={400} y={70}>
        Achseln
      </Etikett>
      {/* Oberkörper von vorn, linker Arm (im Bild rechts) erhoben */}
      <circle cx={510} cy={185} r={46} fill={F.petrol} stroke={F.linie} strokeWidth="4" />
      <path
        d="M478 240 L542 240 Q568 232 578 200 L588 90 Q590 62 616 62 Q644 62 644 90 L648 214 Q648 286 614 310 Q598 334 598 384 L600 600 L430 600 Q426 450 436 310 Q442 250 478 240 Z"
        fill={F.petrol}
        stroke={F.linie}
        strokeWidth="4"
        strokeLinejoin="round"
      />
      {/* Schwammtasche */}
      <g transform="translate(612 330) rotate(-18)">
        <rect x={-24} y={-44} width={48} height={88} rx="16" fill={F.kupferHell} stroke={F.kupfer} strokeWidth="4" />
        {[-24, -6, 12, 30].map((y) => (
          <g key={y} fill={F.kupfer}>
            <circle cx={-8} cy={y} r="4" />
            <circle cx={8} cy={y + 8} r="4" />
          </g>
        ))}
      </g>
      <path d="M630 372 C650 430 660 480 640 520" fill="none" stroke={F.leise} strokeWidth="5" strokeLinecap="round" />

      <Zeiger von={[640, 590]} nach={[620, 360]} />
      <Etikett x={690} y={630} anker="end" farbe={F.kupferHell}>
        Schwammtasche
      </Etikett>
      <Unterzeile x={690} y={660} anker="end">
        feucht in die Achsel
      </Unterzeile>
    </Zeichnung>
  );
}
