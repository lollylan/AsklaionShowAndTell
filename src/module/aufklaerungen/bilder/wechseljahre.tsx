import { Etikett, F, KONTUR, Unterzeile, Zeichnung } from './bausteine';

/** Lebensalter 40 bis 60 auf der x-Achse: 29 px je Jahr ab x = 80. */
const x = (alter: number) => 80 + (alter - 40) * 29;

/** Östrogenspiegel: erst gleichmäßig, dann schwankend, dann dauerhaft niedrig. */
const KURVE =
  'M80 190 C130 184 170 194 200 190 C220 180 235 225 250 200 C265 168 280 250 295 214 ' +
  'C310 182 325 280 345 248 C365 222 380 338 402 338 C432 344 452 424 490 442 ' +
  'C540 458 600 458 660 458';

/** Verlauf des Östrogens zwischen 40 und 60 Jahren mit den Wechseljahren als Abschnitt. */
export default function Wechseljahre() {
  return (
    <Zeichnung titel="Kurve des Östrogenspiegels zwischen 40 und 60 Jahren: erst gleichmäßig hoch, in den Wechseljahren schwankend und dann dauerhaft niedrig, die letzte Regelblutung mit etwa 51 Jahren ist markiert">
      {/* Abschnitt der Wechseljahre */}
      <rect x={x(45)} y="100" width={x(55) - x(45)} height="400" fill={F.kupfer} fillOpacity="0.18" />
      <Etikett x={x(50)} y={76} anker="middle" farbe={F.kupferHell}>
        Wechseljahre
      </Etikett>

      {/* Letzte Regelblutung */}
      <path
        d={`M${x(51)} 110 L${x(51)} 500`}
        fill="none"
        stroke={F.leise}
        strokeWidth="3"
        strokeDasharray="8 8"
      />
      <Unterzeile x={x(51) + 12} y={140}>
        letzte Regel
      </Unterzeile>

      {/* Achsen */}
      <path d="M80 110 L80 500 L670 500" {...KONTUR} stroke={F.leise} />
      {[40, 50, 60].map((a) => (
        <g key={a}>
          <path d={`M${x(a)} 500 L${x(a)} 514`} {...KONTUR} stroke={F.leise} />
          <Unterzeile x={x(a)} y={544} anker="middle">
            {a}
          </Unterzeile>
        </g>
      ))}

      {/* Östrogen */}
      <path d={KURVE} {...KONTUR} stroke={F.petrolHell} strokeWidth="8" />
      <Etikett x={96} y={160}>
        Östrogen
      </Etikett>

      <Unterzeile x={360} y={580} anker="middle">
        Lebensalter in Jahren
      </Unterzeile>

      <Etikett x={40} y={648}>
        Typisch: Hitzewallungen, Schwitzen,
      </Etikett>
      <Etikett x={40} y={684}>
        schlechter Schlaf
      </Etikett>
    </Zeichnung>
  );
}
