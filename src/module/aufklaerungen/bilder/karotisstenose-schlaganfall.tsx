import {
  Etikett,
  F,
  KONTUR,
  Pfeil,
  Unterzeile,
  Zeichnung,
  Zeiger,
} from "./bausteine";

/** Kopf und Hals im Profil, Gesicht nach links (wie in karotisstenose.tsx). */
const KOPF =
  "M300 610 C298 540 292 480 300 440 C340 400 345 300 330 230 C310 120 230 70 165 80 C100 90 65 150 70 205 L66 235 C60 250 45 270 42 285 C50 295 62 297 70 300 C68 312 64 320 68 330 C64 340 66 350 72 357 C72 372 78 388 95 395 C130 400 165 405 180 410 C175 470 170 540 165 610 Z";

const GEFAESS = {
  fill: "none",
  stroke: F.creme,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

/** Weg eines Gerinnsels von der Engstelle der Halsschlagader in ein Hirngefäß. */
export default function KarotisstenoseSchlaganfall() {
  return (
    <Zeichnung titel="Kopf und Hals von der Seite: An der Engstelle der Halsschlagader löst sich ein Gerinnsel, wird mit dem Blut die innere Halsschlagader hinauf ins Gehirn geschwemmt und verstopft dort ein kleines Gefäß. Der Hirnbereich dahinter bekommt kein Blut mehr – ein Schlaganfall oder eine TIA">
      <defs>
        <clipPath id="karotisstenose-schlaganfall-gehirn-clip">
          <ellipse cx="205" cy="162" rx="104" ry="68" />
        </clipPath>
      </defs>
      <g transform="translate(10 40)">
        <path d={KOPF} fill={F.petrol} />
        <path d={KOPF.replace(" Z", "")} {...KONTUR} />
        <path
          d="M100 394 C150 395 190 392 212 380 C226 360 232 335 236 305"
          fill="none"
          stroke={F.leise}
          strokeWidth="3"
          strokeLinecap="round"
        />
        <ellipse
          cx="278"
          cy="262"
          rx="16"
          ry="28"
          {...KONTUR}
          fill={F.petrol}
        />
        <path
          d="M95 226 L118 226"
          stroke={F.linie}
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* Gehirn */}
        <ellipse
          cx="205"
          cy="162"
          rx="104"
          ry="68"
          fill={F.petrolDunkel}
          stroke={F.leise}
          strokeWidth="3"
        />
        <g
          fill="none"
          stroke={F.leise}
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.7"
        >
          <path d="M130 140 C150 128 165 150 185 138" />
          <path d="M230 120 C250 110 262 132 282 124" />
          <path d="M150 200 C170 190 182 212 200 202" />
        </g>
        {/* In Bewegung färbt sich der Bereich erst, wenn das Gerinnsel ankommt (bewegung.css). */}
        <g className="karotisstenose-schlaganfall-bereich">
          <circle
            cx="288"
            cy="166"
            r="62"
            fill={F.kupfer}
            fillOpacity="0.55"
            clipPath="url(#karotisstenose-schlaganfall-gehirn-clip)"
          />
        </g>

        {/* Halsschlagader, äußerer Ast zum Gesicht, innerer Ast ins Gehirn */}
        <path d="M213 610 L213 432" {...GEFAESS} strokeWidth="11" />
        <path
          d="M213 434 C200 414 184 398 168 382 C150 372 130 362 110 350"
          {...GEFAESS}
          strokeWidth="7"
        />
        <path
          d="M176 390 C190 362 198 336 200 310"
          {...GEFAESS}
          strokeWidth="6"
        />
        <path
          d="M215 432 C228 400 240 360 238 320 C236 290 232 268 226 248"
          {...GEFAESS}
          strokeWidth="9"
        />
        <path
          d="M226 248 C200 222 172 200 145 186 M226 248 C222 212 216 176 210 134 M226 248 C232 236 240 228 250 222"
          {...GEFAESS}
          strokeWidth="5"
        />
        {/* Hinter dem Gerinnsel kommt kein Blut mehr an */}
        <path
          d="M262 214 C272 204 284 194 296 182"
          fill="none"
          stroke={F.leise}
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="8 10"
        />

        {/* Engstelle mit Ablagerung */}
        <ellipse
          cx="223"
          cy="418"
          rx="9"
          ry="16"
          transform="rotate(25 223 418)"
          fill={F.kupfer}
          stroke={F.linie}
          strokeWidth="3"
        />

        {/* Weg des Gerinnsels */}
        <Pfeil
          d="M250 408 C262 370 263 330 254 288"
          farbe={F.kupferHell}
          breite={4}
        />
        {/* In Bewegung löst sich das Gerinnsel an der Engstelle und wandert ins Gehirn. */}
        <g className="karotisstenose-schlaganfall-gerinnsel-form">
          <circle
            cx="252"
            cy="220"
            r="10"
            fill={F.kupfer}
            stroke={F.kupferHell}
            strokeWidth="3"
          />
        </g>
      </g>

      <Zeiger von={[372, 96]} nach={[300, 210]} />
      <Etikett x={384} y={92} farbe={F.kupferHell}>
        Schlaganfall oder TIA
      </Etikett>
      <Unterzeile x={384} y={122}>
        dahinter fehlt Blut
      </Unterzeile>

      <Zeiger von={[372, 262]} nach={[276, 260]} />
      <Etikett x={384} y={258}>
        Bleibt stecken
      </Etikett>
      <Unterzeile x={384} y={288}>
        verstopft ein Hirngefäß
      </Unterzeile>

      <Zeiger von={[372, 380]} nach={[272, 370]} />
      <Etikett x={384} y={376}>
        Wird fortgeschwemmt
      </Etikett>
      <Unterzeile x={384} y={406}>
        die Halsschlagader hinauf
      </Unterzeile>

      <Zeiger von={[372, 500]} nach={[244, 462]} />
      <Etikett x={384} y={496}>
        Gerinnsel löst sich
      </Etikett>
      <Unterzeile x={384} y={526}>
        an der Engstelle
      </Unterzeile>

      <Unterzeile x={360} y={696} anker="middle">
        TIA: Beschwerden vergehen wieder – trotzdem 112
      </Unterzeile>
    </Zeichnung>
  );
}
