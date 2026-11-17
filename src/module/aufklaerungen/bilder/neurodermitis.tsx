import { Etikett, F, Pfeil, Unterzeile, Zeichnung } from './bausteine';

const LINKS = 60;
const RECHTS = 660;

/** Bei Neurodermitis fehlende Steine, als „Reihe-Spalte“. Sie bilden zwei Lücken quer durch die Mauer. */
const LUECKEN = new Set(['0-1', '1-2', '2-1', '0-4', '1-5', '2-4']);

/** Wassertropfen um (x, y). */
function tropfen(x: number, y: number, s = 1): string {
  return `M${x} ${y - 12 * s} C${x + 9 * s} ${y} ${x + 9 * s} ${y + 10 * s} ${x} ${y + 10 * s} C${x - 9 * s} ${y + 10 * s} ${x - 9 * s} ${y} ${x} ${y - 12 * s} Z`;
}

/**
 * Hautausschnitt: oben die Hornschicht als Ziegelmauer (Zellen = Steine, Hautfett = Mörtel),
 * darunter die lebende Haut. y0 ist die Oberkante der Mauer.
 */
function Haut({ y0, krank }: { y0: number; krank: boolean }) {
  const clipId = krank ? 'neurodermitis-krank' : 'neurodermitis-gesund';
  const steine = [];
  for (let reihe = 0; reihe < 3; reihe++) {
    for (let spalte = 0; spalte < 7; spalte++) {
      if (krank && LUECKEN.has(`${reihe}-${spalte}`)) continue;
      const x = LINKS - (reihe % 2 ? 50 : 0) + spalte * 100;
      const breite = krank ? 82 : 96;
      steine.push(
        <rect
          key={`${reihe}-${spalte}`}
          x={x + (100 - breite) / 2}
          y={y0 + reihe * 30}
          width={breite}
          height={26}
          rx={4}
          fill={F.petrolHell}
          stroke={F.linie}
          strokeWidth="3"
        />,
      );
    }
  }
  const unten = y0 + 160;
  return (
    <g>
      <defs>
        <clipPath id={clipId}>
          <rect x={LINKS} y={y0 - 4} width={RECHTS - LINKS} height={170} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>
        {/* Mörtel zwischen den Steinen: bei gesunder Haut dicht */}
        {!krank && <rect x={LINKS} y={y0} width={RECHTS - LINKS} height={86} fill={F.petrolDunkel} />}
        {steine}
        {/* lebende Haut */}
        <rect x={LINKS} y={y0 + 90} width={RECHTS - LINKS} height={70} fill={F.petrol} />
        {krank && <rect x={LINKS} y={y0 + 90} width={RECHTS - LINKS} height={70} fill={F.kupfer} fillOpacity="0.8" />}
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
          <ellipse
            key={i}
            cx={LINKS + 30 + i * 60}
            cy={y0 + 125 + (i % 2 ? 10 : -10)}
            rx="18"
            ry="11"
            fill={F.petrolDunkel}
            fillOpacity="0.7"
          />
        ))}
      </g>
      <line x1={LINKS} y1={y0 + 88} x2={RECHTS} y2={y0 + 88} stroke={F.linie} strokeWidth="3" />
      {/* Umriss ohne Oberkante, damit die Lücken offen bleiben */}
      <path
        d={`M${LINKS} ${y0} L${LINKS} ${unten} L${RECHTS} ${unten} L${RECHTS} ${y0}`}
        fill="none"
        stroke={F.linie}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  );
}

/** Hautschutzschicht im Vergleich: oben dicht wie eine Mauer, unten bei Neurodermitis mit Lücken. */
export default function Neurodermitis() {
  return (
    <Zeichnung titel="Hautschutzschicht im Vergleich: Oben gesunde Haut, deren oberste Schicht dicht wie eine Ziegelmauer ist und das Wasser hält. Unten Haut bei Neurodermitis mit Lücken in der Mauer: Wasser entweicht nach außen, Reizstoffe dringen ein, die Haut darunter ist entzündet">
      {/* Gesunde Haut */}
      <Etikett x={LINKS} y={56}>
        gesunde Haut
      </Etikett>
      <Haut y0={80} krank={false} />
      <g fill={F.leise}>
        <path d={tropfen(150, 206, 0.9)} />
        <path d={tropfen(330, 214, 0.9)} />
        <path d={tropfen(510, 206, 0.9)} />
      </g>
      <Unterzeile x={LINKS} y={276}>
        dicht wie eine Mauer: das Wasser bleibt drin
      </Unterzeile>

      {/* Neurodermitis */}
      <Etikett x={LINKS} y={330} farbe={F.kupferHell}>
        Neurodermitis
      </Etikett>
      <Haut y0={470} krank />

      {/* Wasser geht verloren */}
      <Unterzeile x={LINKS} y={372}>
        Wasser geht verloren
      </Unterzeile>
      <Pfeil d="M225 590 L225 400" farbe={F.leise} />
      <g fill={F.leise}>
        <path d={tropfen(186, 424, 0.8)} />
        <path d={tropfen(264, 440, 0.7)} />
      </g>

      {/* Reizstoffe dringen ein */}
      <Unterzeile x={RECHTS} y={372} anker="end">
        Reizstoffe dringen ein
      </Unterzeile>
      <g fill={F.kupferHell}>
        <circle cx="500" cy="404" r="7" />
        <circle cx="568" cy="400" r="6" />
        <circle cx="580" cy="436" r="5" />
        <circle cx="490" cy="440" r="5" />
      </g>
      <Pfeil d="M533 396 L533 568" farbe={F.kupferHell} />

      <Unterzeile x={LINKS} y={668}>
        darunter: Haut trocken, gereizt, juckt
      </Unterzeile>
    </Zeichnung>
  );
}
