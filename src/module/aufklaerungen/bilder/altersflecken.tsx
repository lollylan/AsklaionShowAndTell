import { Etikett, F, Unterzeile, Zeichnung } from './bausteine';

/** Geschlossene, weich gerundete Form um (cx, cy); radius(w) gibt den Abstand je Winkel. */
function form(cx: number, cy: number, radius: (w: number) => number, schritte = 48): string {
  const p = Array.from({ length: schritte }, (_, i) => {
    const w = (i / schritte) * Math.PI * 2;
    const r = radius(w);
    return [cx + Math.cos(w) * r, cy + Math.sin(w) * r * 0.85];
  });
  const mitte = (a: number[], b: number[]) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
  const start = mitte(p[schritte - 1], p[0]);
  let d = `M${start[0].toFixed(1)} ${start[1].toFixed(1)}`;
  for (let i = 0; i < schritte; i++) {
    const m = mitte(p[i], p[(i + 1) % schritte]);
    d += ` Q${p[i][0].toFixed(1)} ${p[i][1].toFixed(1)} ${m[0].toFixed(1)} ${m[1].toFixed(1)}`;
  }
  return `${d} Z`;
}

/** Linke Kante der drei gleich großen Felder. */
const FELDER = [30, 260, 490];
const BREITE = 200;
const mitteX = (i: number) => FELDER[i] + BREITE / 2;

/** Aufsicht: Hautfeld von oben. */
const AUF_OBEN = 130;
const AUF_HOEHE = 190;
const AUF_MITTE = AUF_OBEN + AUF_HOEHE / 2;

/** Seitenansicht: Haut im Schnitt, Oberfläche auf dieser Höhe. */
const HAUT = 400;
const HAUT_TIEFE = 60;

/** Gedämpftes Hellbraun für den Altersfleck. */
const BRAUN_HELL = { fill: F.kupfer, fillOpacity: 0.45 };
/** Kräftigeres Braun für die Alterswarze. */
const BRAUN = { fill: F.kupfer, fillOpacity: 0.8 };

/** Raue Kuppe der Alterswarze im Schnitt: kleine Zacken auf einem flachen Bogen. */
function kuppe(cx: number): string {
  const breite = 120;
  const links = cx - breite / 2;
  let d = `M${links} ${HAUT}`;
  const schritte = 14;
  for (let i = 1; i < schritte; i++) {
    const t = i / schritte;
    const x = links + t * breite;
    const hoehe = 46 * Math.pow(Math.sin(Math.PI * t), 0.6);
    const zacke = i % 2 === 0 ? 0 : 7;
    d += ` L${x.toFixed(1)} ${(HAUT - hoehe - zacke).toFixed(1)}`;
  }
  return `${d} L${links + breite} ${HAUT} Z`;
}

/** Drei Hautflecken im Vergleich, oben von oben gesehen, darunter von der Seite. */
export default function Altersflecken() {
  return (
    <Zeichnung titel="Drei Hautflecken nebeneinander, oben von oben, darunter von der Seite gesehen: der Altersfleck ist flach und gleichmäßig hellbraun mit glattem Rand, die Alterswarze sitzt erhaben und rau wie aufgeklebt auf der Haut, der dritte Fleck ist mehrfarbig mit unscharfem, zackigem Rand und sollte gezeigt werden">
      {/* Namen über den Feldern */}
      <Etikett x={mitteX(0)} y={100} anker="middle">
        Altersfleck
      </Etikett>
      <Etikett x={mitteX(1)} y={100} anker="middle">
        Alterswarze
      </Etikett>
      <Etikett x={mitteX(2)} y={100} anker="middle" farbe={F.kupferHell}>
        Bitte zeigen
      </Etikett>

      {/* Hautfelder von oben */}
      {FELDER.map((x, i) => (
        <rect
          key={x}
          x={x}
          y={AUF_OBEN}
          width={BREITE}
          height={AUF_HOEHE}
          rx="18"
          fill={F.creme}
          stroke={i === 2 ? F.kupfer : F.linie}
          strokeWidth="4"
        />
      ))}

      {/* 1: Altersfleck – flach, eine Farbe, glatter ovaler Rand */}
      <ellipse cx={mitteX(0)} cy={AUF_MITTE} rx="60" ry="42" {...BRAUN_HELL} />

      {/* 2: Alterswarze – Schatten deutet an, dass sie erhaben ist, Risse zeigen die raue Oberfläche */}
      <ellipse cx={mitteX(1) + 6} cy={AUF_MITTE + 8} rx="58" ry="44" fill={F.tief} fillOpacity="0.25" />
      <ellipse cx={mitteX(1)} cy={AUF_MITTE} rx="58" ry="44" {...BRAUN} stroke={F.tief} strokeOpacity="0.5" strokeWidth="3" />
      <g stroke={F.tief} strokeOpacity="0.55" strokeWidth="3" strokeLinecap="round" fill="none">
        <path d={`M${mitteX(1) - 34} ${AUF_MITTE - 16} l14 6 l10 -8 l12 6`} />
        <path d={`M${mitteX(1) - 20} ${AUF_MITTE + 14} l12 -6 l12 8 l14 -4`} />
        <path d={`M${mitteX(1) + 14} ${AUF_MITTE - 28} l8 12 l12 -2`} />
        <path d={`M${mitteX(1) - 44} ${AUF_MITTE + 4} l10 2`} />
        <path d={`M${mitteX(1) + 26} ${AUF_MITTE + 10} l10 10`} />
      </g>

      {/* 3: auffälliger Fleck – unscharfer Saum, zackiger Rand, mehrere Farben */}
      <path
        d={form(mitteX(2), AUF_MITTE, (w) => 66 + 7 * Math.sin(7 * w) + 5 * Math.cos(11 * w) + 8 * Math.sin(2 * w + 1), 96)}
        fill={F.kupfer}
        fillOpacity="0.35"
      />
      <path
        d={form(mitteX(2), AUF_MITTE, (w) => 56 + 7 * Math.sin(7 * w) + 5 * Math.cos(11 * w) + 8 * Math.sin(2 * w + 1), 96)}
        fill={F.kupfer}
      />
      <path d={form(mitteX(2) - 16, AUF_MITTE - 6, (w) => 24 + 5 * Math.sin(5 * w))} fill={F.tief} />
      <path d={form(mitteX(2) + 22, AUF_MITTE + 14, (w) => 14 + 3 * Math.cos(4 * w))} fill={F.petrolDunkel} />
      <path d={form(mitteX(2) + 20, AUF_MITTE - 20, (w) => 11 + 2 * Math.sin(3 * w))} fill={F.kupferHell} />

      {/* Seitenansicht: Haut im Schnitt */}
      {FELDER.map((x) => (
        <g key={x}>
          <rect x={x} y={HAUT} width={BREITE} height={HAUT_TIEFE} rx="6" fill={F.creme} />
          <line x1={x} y1={HAUT} x2={x + BREITE} y2={HAUT} stroke={F.leise} strokeWidth="4" strokeLinecap="round" />
        </g>
      ))}

      {/* 1: liegt flach in der Haut */}
      <rect x={mitteX(0) - 60} y={HAUT} width="120" height="9" rx="4" {...BRAUN_HELL} />

      {/* 2: sitzt erhaben und rau obendrauf */}
      <path d={kuppe(mitteX(1))} {...BRAUN} stroke={F.linie} strokeWidth="3" strokeLinejoin="round" />

      {/* 3: unregelmäßig, reicht ungleichmäßig in die Tiefe */}
      <path
        d={`M${mitteX(2) - 62} ${HAUT} L${mitteX(2) + 60} ${HAUT} L${mitteX(2) + 50} ${HAUT + 14} L${mitteX(2) + 30} ${HAUT + 10} L${mitteX(2) + 18} ${HAUT + 34} L${mitteX(2) - 4} ${HAUT + 22} L${mitteX(2) - 22} ${HAUT + 40} L${mitteX(2) - 36} ${HAUT + 16} L${mitteX(2) - 54} ${HAUT + 12} Z`}
        fill={F.kupfer}
        stroke={F.tief}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d={`M${mitteX(2) - 18} ${HAUT} L${mitteX(2) + 20} ${HAUT} L${mitteX(2) + 10} ${HAUT + 20} L${mitteX(2) - 4} ${HAUT + 14} L${mitteX(2) - 14} ${HAUT + 26} Z`}
        fill={F.tief}
      />

      {/* Kennzeichen */}
      <Unterzeile x={mitteX(0)} y={510} anker="middle">
        flach, eine Farbe
      </Unterzeile>
      <Unterzeile x={mitteX(1)} y={510} anker="middle">
        erhaben, rau
      </Unterzeile>
      <Unterzeile x={mitteX(2)} y={510} anker="middle" farbe={F.kupferHell}>
        mehrere Farben,
      </Unterzeile>
      <Unterzeile x={mitteX(2)} y={538} anker="middle" farbe={F.kupferHell}>
        unscharfer Rand
      </Unterzeile>

      <Unterzeile x={360} y={640} anker="middle">
        oben von oben gesehen, darunter von der Seite
      </Unterzeile>
    </Zeichnung>
  );
}
