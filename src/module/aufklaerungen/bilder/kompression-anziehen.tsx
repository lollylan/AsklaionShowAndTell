import { Etikett, F, Pfeil, Unterzeile, Zeichnung } from './bausteine';
import { BEIN_RAND, StrumpfBein } from './kompression';

const S = 0.58;
const OBEN = 120;

/** Verschiebung, damit das Bein (Mitte bei x 332 in Beinkoordinaten) bei cx steht. */
const lage = (cx: number) => `translate(${cx - S * 332} ${OBEN}) scale(${S})`;
/** Beinkoordinate in Bildkoordinate. */
const bx = (cx: number, x: number) => cx - S * 332 + S * x;
const by = (y: number) => OBEN + S * y;

const SCHRITTE = [
  { titel: 'Bis zur Ferse', zeilen: ['auf links stülpen'], x: 125 },
  { titel: 'Fuß hinein,', zeilen: ['Ferse sitzt'], x: 360 },
  { titel: 'Nach oben', zeilen: ['schieben,', 'nicht ziehen'], x: 595 },
];

export default function KompressionAnziehen() {
  const [a, b, c] = SCHRITTE.map((s) => s.x);
  return (
    <Zeichnung titel="Kompressionsstrumpf anziehen in drei Schritten: Strumpf bis zur Ferse auf links stülpen, mit dem Fuß hineinschlüpfen bis die Ferse sitzt, dann den Strumpf Stück für Stück nach oben schieben">
      {SCHRITTE.map((s, i) => (
        <g key={s.titel}>
          <circle cx={s.x} cy={74} r="30" fill={F.petrol} stroke={F.linie} strokeWidth="4" />
          <text x={s.x} y={85} textAnchor="middle" fontSize="30" fontWeight="700" fill={F.linie}>
            {i + 1}
          </text>
          <Etikett x={s.x} y={562} anker="middle">
            {s.titel}
          </Etikett>
          {s.zeilen.map((z, k) => (
            <Unterzeile key={z} x={s.x} y={594 + k * 28} anker="middle" farbe={F.linie}>
              {z}
            </Unterzeile>
          ))}
        </g>
      ))}

      {/* 1: nur der Strumpf, der Schaft ist bis zur Ferse umgestülpt */}
      <g transform={lage(a)}>
        <defs>
          <clipPath id="kompression-anziehen-schaft">
            <rect x="0" y="190" width="720" height="332" />
          </clipPath>
        </defs>
        <g clipPath="url(#kompression-anziehen-schaft)">
          <path d={BEIN_RAND} fill="none" stroke={F.leise} strokeWidth="3" strokeDasharray="4 10" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        </g>
        <StrumpfBein id="kompression-anziehen-1" ab={540} rolle={540} nurStrumpf />
      </g>
      <Pfeil d={`M${bx(a, 245)} ${by(240)} L${bx(a, 245)} ${by(470)}`} farbe={F.leise} breite={5} />

      {/* 2: Fuß im Strumpf, Ferse sitzt */}
      <g transform={lage(b)}>
        <StrumpfBein id="kompression-anziehen-2" ab={540} rolle={538} />
        <circle cx="250" cy="612" r="40" fill="none" stroke={F.kupferHell} strokeWidth="4" vectorEffect="non-scaling-stroke" />
      </g>

      {/* 3: Strumpf Stück für Stück nach oben geschoben */}
      <g transform={lage(c)}>
        <StrumpfBein id="kompression-anziehen-3" ab={330} rolle={330} />
      </g>
      <Pfeil d={`M${bx(c, 380)} ${by(470)} L${bx(c, 380)} ${by(230)}`} farbe={F.linie} breite={6} />
    </Zeichnung>
  );
}
