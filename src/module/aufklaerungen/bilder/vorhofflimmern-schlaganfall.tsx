import { Etikett, F, KONTUR, Pfeil, Unterzeile, Zeichnung, Zeiger } from './bausteine';

const HERZ =
  'M0 -14 C-6 -30 -34 -30 -34 -6 C-34 14 -12 26 0 40 C12 26 34 14 34 -6 C34 -30 6 -30 0 -14 Z';

/** Weg eines Gerinnsels vom flimmernden Vorhof ins Gehirn. */
export default function VorhofflimmernSchlaganfall() {
  return (
    <Zeichnung titel="Oberkörper mit Herz und Kopf: Im flimmernden Vorhof bildet sich ein Gerinnsel, es wird über die Halsschlagader ins Gehirn geschwemmt und verstopft dort ein Gefäß – ein Schlaganfall">
      {/* Rumpf, Hals, Kopf */}
      <path d="M90 300 Q210 272 330 300 L322 660 L98 660 Z" {...KONTUR} fill={F.petrol} />
      <rect x="186" y="232" width="48" height="56" {...KONTUR} fill={F.petrol} />
      <circle cx="210" cy="140" r="98" {...KONTUR} fill={F.petrol} />

      {/* Gehirn mit unterversorgtem Bereich */}
      <path
        d="M140 140 C128 88 172 62 210 68 C250 62 294 88 282 140 C272 160 150 160 140 140 Z"
        fill={F.petrolDunkel}
        stroke={F.leise}
        strokeWidth="3"
      />
      {/* In Bewegung erscheint die Verstopfung erst, wenn das Gerinnsel ankommt (bewegung.css). */}
      <g className="vorhofflimmern-schlaganfall-gehirn">
        <circle cx="252" cy="112" r="30" fill={F.kupfer} fillOpacity="0.45" />
        <circle cx="244" cy="124" r="10" fill={F.kupfer} stroke={F.kupferHell} strokeWidth="3" />
      </g>

      {/* Herz, Vorhöfe oben, Gerinnsel im Vorhof */}
      <clipPath id="vorhofflimmern-schlaganfall-clip">
        <path d={HERZ} transform="translate(210 480) scale(2.4)" />
      </clipPath>
      <path d={HERZ} transform="translate(210 480) scale(2.4)" fill={F.petrolDunkel} />
      <g clipPath="url(#vorhofflimmern-schlaganfall-clip)">
        <rect x="100" y="380" width="220" height="92" fill={F.petrolHell} />
        <line x1="100" y1="472" x2="320" y2="472" stroke={F.linie} strokeWidth="4" />
      </g>
      <path d={HERZ} transform="translate(210 480) scale(2.4)" {...KONTUR} />

      {/* Weg durch die Halsschlagader */}
      <Pfeil d="M244 428 C262 340 226 290 238 160" farbe={F.kupferHell} breite={4} />
      {/* In Bewegung entsteht das Gerinnsel, wandert die Halsschlagader hinauf und bildet sich neu. */}
      <g className="vorhofflimmern-schlaganfall-gerinnsel-form">
        <circle cx="244" cy="446" r="13" fill={F.kupfer} stroke={F.kupferHell} strokeWidth="3" />
      </g>

      <Zeiger von={[388, 104]} nach={[262, 116]} />
      <Etikett x={400} y={100} farbe={F.kupferHell}>
        Schlaganfall
      </Etikett>
      <Unterzeile x={400} y={130}>
        Gefäß im Gehirn verstopft
      </Unterzeile>

      <Zeiger von={[388, 300]} nach={[246, 300]} />
      <Etikett x={400} y={296}>
        Wird fortgeschwemmt
      </Etikett>
      <Unterzeile x={400} y={326}>
        über die Halsschlagader
      </Unterzeile>

      <Zeiger von={[388, 430]} nach={[256, 446]} />
      <Etikett x={400} y={426}>
        Gerinnsel im Herzen
      </Etikett>
      <Unterzeile x={400} y={456}>
        Im Vorhof staut sich Blut
      </Unterzeile>

      <Etikett x={400} y={600}>
        Davor schützt
      </Etikett>
      <Unterzeile x={400} y={630}>
        der Gerinnungshemmer
      </Unterzeile>
    </Zeichnung>
  );
}
