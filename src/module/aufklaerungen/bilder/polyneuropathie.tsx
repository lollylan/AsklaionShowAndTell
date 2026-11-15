import { Etikett, F, KONTUR, Unterzeile, Zeichnung } from './bausteine';

/** Unterschenkel und Fuß von vorn, Mitte bei x = 0. */
const BEIN =
  'M-36 150 C-33 300 -26 420 -22 520 C-40 560 -54 588 -48 612 L48 612 C52 588 40 560 26 520 C30 420 35 300 38 150';

const BEINE = [120, 250];

/** Nervenfaser mit Hülle; geschädigt mit Lücken in Hülle und Faser. */
function Nerv({ y, geschaedigt }: { y: number; geschaedigt: boolean }) {
  const huellen = geschaedigt ? [390, 612] : [390, 464, 538, 612];
  const hoehe = geschaedigt ? 26 : 40;
  return (
    <g>
      {huellen.map((x) => (
        <rect
          key={x}
          x={x}
          y={y - hoehe / 2}
          width="62"
          height={hoehe}
          rx={hoehe / 2}
          fill={F.petrolHell}
          stroke={F.linie}
          strokeWidth="3"
        />
      ))}
      <line
        x1="380"
        y1={y}
        x2="690"
        y2={y}
        stroke={geschaedigt ? F.kupfer : F.creme}
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray={geschaedigt ? '34 22' : undefined}
      />
    </g>
  );
}

/** Beide Unterschenkel mit strumpfförmig betroffenen Füßen, daneben gesunde und geschädigte Nervenfaser. */
export default function Polyneuropathie() {
  return (
    <Zeichnung titel="Beide Unterschenkel von vorn, die Füße bis zur Wade sind wie ein Strumpf betroffen; daneben eine gesunde Nervenfaser mit geschlossener Hülle und eine geschädigte mit Lücken">
      <defs>
        <clipPath id="polyneuropathie-beine">
          {BEINE.map((x) => (
            <path key={x} d={`${BEIN} Z`} transform={`translate(${x} 0)`} />
          ))}
        </clipPath>
      </defs>

      {BEINE.map((x) => (
        <path key={x} d={`${BEIN} Z`} transform={`translate(${x} 0)`} fill={F.petrol} />
      ))}
      <rect x="40" y="440" width="300" height="180" fill={F.kupfer} fillOpacity="0.75" clipPath="url(#polyneuropathie-beine)" />
      {BEINE.map((x) => (
        <path key={x} d={BEIN} transform={`translate(${x} 0)`} {...KONTUR} />
      ))}
      {BEINE.map((x) => (
        <path key={x} d="M-48 612 L48 612" transform={`translate(${x} 0)`} {...KONTUR} />
      ))}

      <Etikett x={40} y={70} farbe={F.kupferHell}>
        Beginnt an den Füßen
      </Etikett>
      <Unterzeile x={40} y={102}>
        Kribbeln, Brennen, taubes Gefühl
      </Unterzeile>

      <Etikett x={380} y={250}>
        Gesunder Nerv
      </Etikett>
      <Nerv y={310} geschaedigt={false} />

      <Etikett x={380} y={440} farbe={F.kupferHell}>
        Geschädigter Nerv
      </Etikett>
      <Nerv y={500} geschaedigt />
      <Unterzeile x={380} y={566}>
        Signale kommen schlecht an
      </Unterzeile>
    </Zeichnung>
  );
}
