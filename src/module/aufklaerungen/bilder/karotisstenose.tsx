import {
  Etikett,
  F,
  Fluss,
  KONTUR,
  Pfeil,
  Unterzeile,
  Zeichnung,
  Zeiger,
} from "./bausteine";

/** Kopf und Hals im Profil, Gesicht nach links (wird verkleinert eingesetzt). */
const KOPF =
  "M300 610 C298 540 292 480 300 440 C340 400 345 300 330 230 C310 120 230 70 165 80 C100 90 65 150 70 205 L66 235 C60 250 45 270 42 285 C50 295 62 297 70 300 C68 312 64 320 68 330 C64 340 66 350 72 357 C72 372 78 388 95 395 C130 400 165 405 180 410 C175 470 170 540 165 610 Z";

const NICHT_SKALIEREN = { vectorEffect: "non-scaling-stroke" } as const;

/** Halsschlagader im Längsschnitt: unten gemeinsam, links der äußere Ast, rechts der innere. */
const LICHTUNG =
  "M425 600 L425 470 C425 430 400 400 385 360 L365 230 L420 230 L435 345 C440 375 458 392 475 395 C490 392 497 372 500 345 L510 230 L560 230 L565 345 C563 410 525 440 505 470 L505 600 Z";
const WAENDE = [
  "M425 600 L425 470 C425 430 400 400 385 360 L365 230",
  "M420 230 L435 345 C440 375 458 392 475 395 C490 392 497 372 500 345 L510 230",
  "M560 230 L565 345 C563 410 525 440 505 470 L505 600",
];
/** Ablagerung an der Hinterwand am Anfang des inneren Asts – dünn und voll ausgebildet. */
const ABLAGERUNG_DUENN =
  "M505 525 L505 470 C525 440 563 410 565 345 L564 312 C557 322 552 340 550 365 C545 410 525 445 505 500 Z";
const ABLAGERUNG =
  "M505 525 L505 470 C525 440 563 410 565 345 L564 312 C549 324 530 342 525 372 C521 410 515 450 505 525 Z";

/** Kopf im Profil mit Halsschlagader und ihren Ästen; daneben die Gabelung vergrößert. */
export default function Karotisstenose() {
  return (
    <Zeichnung titel="Kopf und Hals von der Seite: Die Halsschlagader teilt sich am Hals in einen inneren Ast zum Gehirn und einen äußeren Ast zum Gesicht. Vergrößert daneben die Gabelung im Längsschnitt: Am Anfang des inneren Asts engt eine Ablagerung das Gefäß ein">
      {/* Kopf, verkleinert; Striche bleiben trotzdem gleich dick. */}
      <g transform="translate(10 114) scale(0.8)">
        <path d={KOPF} fill={F.petrol} />
        {/* Umriss ohne Unterkante, der Hals läuft unten aus */}
        <path d={KOPF.replace(" Z", "")} {...KONTUR} {...NICHT_SKALIEREN} />
        {/* Gehirn */}
        <ellipse
          cx="205"
          cy="162"
          rx="104"
          ry="68"
          fill={F.petrolDunkel}
          stroke={F.leise}
          strokeWidth="3"
          {...NICHT_SKALIEREN}
        />
        {/* Unterkiefer und Ohr */}
        <path
          d="M100 394 C150 395 190 392 212 380 C226 360 232 335 236 305"
          fill="none"
          stroke={F.leise}
          strokeWidth="3"
          strokeLinecap="round"
          {...NICHT_SKALIEREN}
        />
        <ellipse
          cx="278"
          cy="262"
          rx="16"
          ry="28"
          {...KONTUR}
          {...NICHT_SKALIEREN}
          fill={F.petrol}
        />
        <path
          d="M95 226 L118 226"
          stroke={F.linie}
          strokeWidth="4"
          strokeLinecap="round"
          {...NICHT_SKALIEREN}
        />

        {/* Halsschlagader mit äußerem Ast (Gesicht) und innerem Ast (Gehirn) */}
        <g
          fill="none"
          stroke={F.creme}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M213 610 L213 432" strokeWidth="9" {...NICHT_SKALIEREN} />
          <path
            d="M213 434 C200 414 184 398 168 382 C150 372 130 362 110 350"
            strokeWidth="6"
            {...NICHT_SKALIEREN}
          />
          <path
            d="M176 390 C190 362 198 336 200 310"
            strokeWidth="5"
            {...NICHT_SKALIEREN}
          />
          <path
            d="M215 432 C228 400 240 360 238 320 C236 290 232 268 226 248"
            strokeWidth="8"
            {...NICHT_SKALIEREN}
          />
          <path
            d="M226 248 C200 222 172 200 145 186 M226 248 C242 218 268 196 296 182 M226 248 C222 212 216 176 210 134"
            strokeWidth="5"
            {...NICHT_SKALIEREN}
          />
        </g>
        <ellipse
          cx="222"
          cy="420"
          rx="7"
          ry="12"
          transform="rotate(25 222 420)"
          fill={F.kupfer}
        />
      </g>

      {/* Lupe auf die Gabelung */}
      <circle
        cx="184"
        cy="454"
        r="30"
        fill="none"
        stroke={F.kupferHell}
        strokeWidth="4"
      />
      <line
        x1="214"
        y1="458"
        x2="418"
        y2="500"
        stroke={F.kupferHell}
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Gabelung vergrößert */}
      <path d={LICHTUNG} fill={F.petrolDunkel} />
      <path d={ABLAGERUNG_DUENN} fill={F.kupfer} />
      {/* In Bewegung wird die Ablagerung langsam dicker (bewegung.css). */}
      <g className="karotisstenose-ablagerung">
        <path d={ABLAGERUNG} fill={F.kupfer} />
      </g>
      {WAENDE.map((d) => (
        <path key={d} d={d} {...KONTUR} />
      ))}

      {/* Blut: im äußeren Ast frei, im inneren hinter der Engstelle nur dünn und langsam. */}
      <Fluss
        d="M465 600 L465 470 C462 430 420 400 410 350 L393 235"
        farbe={F.creme}
        breite={7}
        dauer={1.2}
      />
      <Fluss
        d="M470 600 L470 480 C474 440 500 420 510 395"
        farbe={F.creme}
        breite={7}
        dauer={1.2}
      />
      <Fluss
        d="M512 390 C516 360 528 330 535 235"
        farbe={F.creme}
        breite={4}
        dauer={2.6}
      />
      <Pfeil d="M392 220 L384 182" />
      <Pfeil d="M535 220 L537 182" />

      <Etikett x={440} y={120} anker="end">
        zum Gesicht
      </Etikett>
      <Unterzeile x={440} y={150} anker="end">
        äußerer Ast
      </Unterzeile>
      <Etikett x={490} y={120}>
        zum Gehirn
      </Etikett>
      <Unterzeile x={490} y={150}>
        innerer Ast
      </Unterzeile>

      <Zeiger von={[585, 448]} nach={[509, 382]} />
      <Etikett x={700} y={476} anker="end">
        Engstelle
      </Etikett>

      <Zeiger von={[598, 612]} nach={[515, 492]} />
      <Etikett x={690} y={642} anker="end" farbe={F.kupferHell}>
        Ablagerung
      </Etikett>
      <Unterzeile x={690} y={672} anker="end">
        macht das Gefäß eng
      </Unterzeile>

      <Zeiger von={[120, 632]} nach={[180, 568]} />
      <Etikett x={40} y={662}>
        Halsschlagader
      </Etikett>
      <Unterzeile x={40} y={692}>
        teilt sich am Hals
      </Unterzeile>
    </Zeichnung>
  );
}
