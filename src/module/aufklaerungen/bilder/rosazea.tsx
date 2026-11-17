import { Etikett, F, KONTUR, Unterzeile, Zeichnung, Zeiger } from './bausteine';

/** Gerötete Flächen im Gesicht: cx, cy, rx, ry. */
const ROETUNG: [number, number, number, number][] = [
  [190, 452, 62, 46],
  [350, 452, 62, 46],
  [270, 420, 36, 60],
  [270, 262, 64, 32],
  [270, 566, 46, 22],
];

/** Knötchen und Eiterpickel auf der rechten Wange (im Bild rechts). */
const PICKEL: [number, number][] = [
  [372, 486],
  [394, 470],
  [356, 504],
  [388, 500],
];

/** Gesicht von vorn mit Rötung in der Gesichtsmitte, feinen Äderchen und Pickelchen. */
export default function Rosazea() {
  return (
    <Zeichnung titel="Gesicht von vorn: Wangen, Nase, Stirnmitte und Kinn sind gerötet. Auf einer Wange feine rote Äderchen und kleine Knötchen und Eiterpickel. Die Augen können mitbetroffen sein">
      <defs>
        <radialGradient id="rosazea-roete">
          <stop offset="0" stopColor={F.kupfer} stopOpacity="0.85" />
          <stop offset="0.6" stopColor={F.kupfer} stopOpacity="0.55" />
          <stop offset="1" stopColor={F.kupfer} stopOpacity="0" />
        </radialGradient>
        <clipPath id="rosazea-gesicht">
          <ellipse cx="270" cy="390" rx="165" ry="215" />
        </clipPath>
      </defs>

      {/* Hals */}
      <path d="M205 560 L198 700 M335 560 L342 700" {...KONTUR} />
      <path d="M205 560 L198 700 L342 700 L335 560 Z" fill={F.petrol} />

      {/* Ohren */}
      <ellipse cx="106" cy="400" rx="20" ry="42" fill={F.petrol} stroke={F.linie} strokeWidth="4" />
      <ellipse cx="434" cy="400" rx="20" ry="42" fill={F.petrol} stroke={F.linie} strokeWidth="4" />

      {/* Gesicht */}
      <ellipse cx="270" cy="390" rx="165" ry="215" fill={F.petrol} />
      <g clipPath="url(#rosazea-gesicht)">
        {ROETUNG.map(([cx, cy, rx, ry]) => (
          <ellipse key={`${cx}-${cy}`} cx={cx} cy={cy} rx={rx} ry={ry} fill="url(#rosazea-roete)" />
        ))}
      </g>
      <ellipse cx="270" cy="390" rx="165" ry="215" {...KONTUR} />

      {/* Haar */}
      <path
        d="M106 372 C92 214 170 158 270 158 C370 158 448 214 434 372 C420 290 380 230 270 228 C160 230 120 290 106 372 Z"
        fill={F.petrolDunkel}
        stroke={F.linie}
        strokeWidth="4"
        strokeLinejoin="round"
      />

      {/* Augenbrauen und Augen */}
      <path d="M168 304 Q205 286 240 300 M300 300 Q335 286 372 304" fill="none" stroke={F.leise} strokeWidth="5" strokeLinecap="round" />
      {[205, 335].map((x) => (
        <g key={x}>
          <path d={`M${x - 34} 340 Q${x} 316 ${x + 34} 340 Q${x} 360 ${x - 34} 340 Z`} fill={F.creme} stroke={F.linie} strokeWidth="3" strokeLinejoin="round" />
          <circle cx={x} cy={339} r="10" fill={F.petrolDunkel} />
        </g>
      ))}
      {/* gereizter Lidrand rechts */}
      <path d="M303 348 Q335 362 367 344" fill="none" stroke={F.kupferHell} strokeWidth="3" strokeLinecap="round" />

      {/* Nase und Mund */}
      <path d="M266 344 C262 384 250 420 248 440 C256 452 284 452 292 440" fill="none" stroke={F.linie} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M228 510 Q270 534 312 510" fill="none" stroke={F.linie} strokeWidth="4" strokeLinecap="round" />

      {/* Feine Äderchen auf der rechten Wange und am Nasenflügel */}
      <g fill="none" stroke={F.kupferHell} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M336 426 L356 432 L372 424 L388 430" />
        <path d="M356 432 L362 448" />
        <path d="M340 446 L360 452 L380 446" />
        <path d="M296 424 L306 432 L304 444" />
      </g>

      {/* Knötchen und Eiterpickel */}
      {PICKEL.map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <circle cx={x} cy={y} r="8" fill={F.kupfer} stroke={F.kupferHell} strokeWidth="2" />
          <circle cx={x} cy={y} r="3" fill={F.creme} />
        </g>
      ))}

      {/* Beschriftung rechts */}
      <Etikett x={468} y={150} farbe={F.kupferHell}>
        Rötung
      </Etikett>
      <Unterzeile x={468} y={180}>
        Wangen, Nase, Stirn
      </Unterzeile>
      <Zeiger von={[460, 194]} nach={[318, 258]} />

      <Etikett x={468} y={290}>
        Augen
      </Etikett>
      <Unterzeile x={468} y={320}>
        trocken, brennen
      </Unterzeile>
      <Zeiger von={[460, 300]} nach={[358, 346]} />

      <Etikett x={468} y={478} farbe={F.kupferHell}>
        feine Äderchen
      </Etikett>
      <Zeiger von={[460, 470]} nach={[388, 446]} />

      <Etikett x={468} y={566} farbe={F.kupferHell}>
        Knötchen
      </Etikett>
      <Unterzeile x={468} y={596}>
        und Eiterpickel
      </Unterzeile>
      <Zeiger von={[460, 558]} nach={[396, 506]} />
    </Zeichnung>
  );
}
