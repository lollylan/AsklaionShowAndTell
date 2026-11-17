import { Etikett, F, Unterzeile, Zeichnung, Zeiger } from './bausteine';

/** Rechter Fuß von oben, Zehen leicht gespreizt. Großer Zeh links. */
const ZEHEN: [number, number, number, number, number][] = [
  // cx, cy, rx, ry, Drehung
  [170, 250, 40, 70, -6],
  [238, 246, 24, 56, 2],
  [285, 254, 22, 50, 10],
  [327, 274, 21, 44, 18],
  [364, 306, 19, 36, 30],
];

const SOHLE =
  'M128 320 C122 410 140 495 160 585 C172 648 206 678 250 678 C298 678 326 644 332 588 C338 514 360 448 382 392 C394 360 396 336 388 318 C340 278 180 278 128 320 Z';

function Fuss({ strich }: { strich: boolean }) {
  const props = strich
    ? { fill: F.petrol, stroke: F.linie, strokeWidth: 8, strokeLinejoin: 'round' as const }
    : { fill: F.petrol };
  return (
    <g>
      {ZEHEN.map(([cx, cy, rx, ry, w]) => (
        <ellipse key={cx} cx={cx} cy={cy} rx={rx} ry={ry} transform={`rotate(${w} ${cx} ${cy})`} {...props} />
      ))}
      <path d={SOHLE} {...props} />
    </g>
  );
}

/** Schuppen als kleine helle Bögen. */
const SCHUPPEN: [number, number][] = [
  [338, 294],
  [352, 308],
  [342, 318],
  [360, 322],
  [332, 308],
];

const RING_SCHUPPEN = Array.from({ length: 16 }, (_, i) => (i / 16) * Math.PI * 2);

/** Fuß von oben mit Pilz zwischen viertem und fünftem Zeh, daneben ein Hautpilz-Ring auf der Haut. */
export default function Fusspilz() {
  const ix = 560;
  const iy = 480;
  return (
    <Zeichnung titel="Fuß von oben: Zwischen viertem und fünftem Zeh ist die Haut weißlich, schuppig und rissig. Daneben ein Ausschnitt Haut am Körper mit rundem Pilzfleck: helle Mitte, roter schuppender Rand">
      {/* Fuß: erst mit dickem Rand, dann die Flächen darüber – so entsteht ein gemeinsamer Umriss */}
      <Fuss strich />
      <Fuss strich={false} />

      {/* Zehennägel */}
      {ZEHEN.map(([cx, cy, rx, ry, w]) => (
        <ellipse
          key={`n${cx}`}
          cx={cx}
          cy={cy - ry * 0.55}
          rx={rx * 0.55}
          ry={ry * 0.3}
          transform={`rotate(${w} ${cx} ${cy})`}
          fill={F.petrolHell}
          stroke={F.leise}
          strokeWidth="2"
        />
      ))}

      {/* Befallener Zwischenzehenraum, auf den Fuß beschnitten */}
      <defs>
        <clipPath id="fusspilz-fuss">
          {ZEHEN.map(([cx, cy, rx, ry, w]) => (
            <ellipse key={cx} cx={cx} cy={cy} rx={rx} ry={ry} transform={`rotate(${w} ${cx} ${cy})`} />
          ))}
          <path d={SOHLE} />
        </clipPath>
      </defs>
      <g clipPath="url(#fusspilz-fuss)">
        <ellipse cx="347" cy="300" rx="22" ry="36" transform="rotate(35 347 300)" fill={F.kupfer} />
        <ellipse cx="304" cy="282" rx="9" ry="17" transform="rotate(14 304 282)" fill={F.kupfer} />
      </g>
      <g fill="none" stroke={F.kupferHell} strokeWidth="3" strokeLinecap="round">
        {SCHUPPEN.map(([x, y]) => (
          <path key={`${x}-${y}`} d={`M${x - 6} ${y} Q${x} ${y - 6} ${x + 6} ${y}`} />
        ))}
      </g>
      <g stroke={F.tief} strokeWidth="3" strokeLinecap="round">
        <line x1="344" y1="286" x2="350" y2="302" />
        <line x1="354" y1="312" x2="362" y2="316" />
      </g>

      <Etikett x={440} y={150} farbe={F.kupferHell}>
        Fußpilz
      </Etikett>
      <Unterzeile x={440} y={182}>
        zwischen den Zehen:
      </Unterzeile>
      <Unterzeile x={440} y={210}>
        weißlich, schuppig, rissig
      </Unterzeile>
      <Zeiger von={[436, 226]} nach={[352, 298]} />

      {/* Ausschnitt: Haut am Körper mit Pilz-Ring */}
      <defs>
        <clipPath id="fusspilz-ausschnitt">
          <circle cx={ix} cy={iy} r="118" />
        </clipPath>
      </defs>
      <g clipPath="url(#fusspilz-ausschnitt)">
        <rect x={ix - 120} y={iy - 120} width="240" height="240" fill={F.petrolDunkel} />
        <circle cx={ix} cy={iy} r="66" fill={F.petrolHell} fillOpacity="0.7" />
        <circle cx={ix} cy={iy} r="66" fill="none" stroke={F.kupfer} strokeWidth="18" />
        <g fill="none" stroke={F.kupferHell} strokeWidth="3" strokeLinecap="round">
          {RING_SCHUPPEN.map((w) => {
            const x = ix + Math.cos(w) * 70;
            const y = iy + Math.sin(w) * 70;
            const dx = Math.cos(w + Math.PI / 2) * 7;
            const dy = Math.sin(w + Math.PI / 2) * 7;
            return <line key={w} x1={x - dx} y1={y - dy} x2={x + dx} y2={y + dy} />;
          })}
        </g>
      </g>
      <circle cx={ix} cy={iy} r="118" fill="none" stroke={F.linie} strokeWidth="4" />

      <Etikett x={ix} y={iy - 136} anker="middle" farbe={F.kupferHell}>
        Hautpilz am Körper
      </Etikett>
      <Unterzeile x={690} y={iy + 150} anker="end">
        Ring mit schuppendem Rand,
      </Unterzeile>
      <Unterzeile x={690} y={iy + 178} anker="end">
        die Mitte wird heller
      </Unterzeile>
    </Zeichnung>
  );
}
