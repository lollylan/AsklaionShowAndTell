import type { ReactNode } from "react";

import {
  Etikett,
  F,
  Fluss,
  Folge,
  KONTUR,
  Unterzeile,
  Zeichnung,
} from "./bausteine";

/*
 * Gabelung der Halsschlagader im Längsschnitt (wie in karotisstenose.tsx): unten gemeinsam,
 * links der äußere Ast, rechts der innere Ast zum Gehirn. Gezeichnet um x = 465 und mit
 * transform in die beiden Hälften geschoben.
 */
const LICHTUNG =
  "M425 600 L425 470 C425 430 400 400 385 360 L365 230 L420 230 L435 345 C440 375 458 392 475 395 C490 392 497 372 500 345 L510 230 L560 230 L565 345 C563 410 525 440 505 470 L505 600 Z";
const WAND_AUSSEN = "M425 600 L425 470 C425 430 400 400 385 360 L365 230";
const WAND_MITTE =
  "M420 230 L435 345 C440 375 458 392 475 395 C490 392 497 372 500 345 L510 230";
const WAND_INNEN = "M560 230 L565 345 C563 410 525 440 505 470 L505 600";
const ABLAGERUNG =
  "M505 525 L505 470 C525 440 563 410 565 345 L564 312 C549 324 530 342 525 372 C521 410 515 450 505 525 Z";
const ABLAGERUNG_GEDRUECKT =
  "M505 525 L505 470 C525 440 563 410 565 345 L564 312 C557 322 552 340 550 365 C545 410 525 445 505 500 Z";
/** Der Teil der Wand, der bei der Operation geöffnet und wieder vernäht wird. */
const NAHT = "M562 290 L565 345 C563 410 525 440 505 470 L505 545";
const STENT =
  "M470 560 L470 470 C474 440 505 420 518 392 C526 370 533 330 535 250";
const FLUSS_AUSSEN = "M465 600 L465 470 C462 430 420 400 410 350 L393 235";
const FLUSS_INNEN =
  "M470 600 L470 470 C474 440 505 420 518 392 C526 370 533 330 535 235";

function Gabel({ children }: { children?: ReactNode }) {
  return (
    <>
      <path d={LICHTUNG} fill={F.petrolDunkel} />
      {children}
      <path d={WAND_AUSSEN} {...KONTUR} />
      <path d={WAND_MITTE} {...KONTUR} />
    </>
  );
}

/** Zwei Wege, die Engstelle zu beheben: links Operation, rechts Stent; darunter die Medikamente. */
export default function KarotisstenoseBehandlung() {
  return (
    <Zeichnung titel="Zwei Behandlungen der verengten Halsschlagader nebeneinander. Links die Operation: Das Gefäß wird geöffnet, die Ablagerung herausgeschält und die Stelle mit einem Flicken vernäht. Rechts der Stent: Ein feines Gitterröhrchen, über einen Katheter von der Leiste eingesetzt, hält die Engstelle offen. Darunter: Medikamente bekommen alle">
      <defs>
        <pattern
          id="karotisstenose-behandlung-gitter"
          width="18"
          height="18"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M0 0 L18 18 M18 0 L0 18"
            stroke={F.linie}
            strokeWidth="2.5"
          />
        </pattern>
      </defs>

      <Etikett x={190} y={60} anker="middle">
        Operation
      </Etikett>
      <Unterzeile x={190} y={92} anker="middle">
        Ablagerung wird ausgeschält
      </Unterzeile>
      <Etikett x={530} y={60} anker="middle">
        Stent
      </Etikett>
      <Unterzeile x={530} y={92} anker="middle">
        Katheter über die Leiste
      </Unterzeile>

      {/* Links: Operation */}
      <g transform="translate(-275 -80)">
        <Gabel>
          <g className="karotisstenose-behandlung-fluss">
            <Fluss d={FLUSS_AUSSEN} farbe={F.creme} breite={7} dauer={1.2} />
            <Fluss
              d={FLUSS_INNEN}
              farbe={F.creme}
              breite={7}
              dauer={1.2}
              ab={0.4}
            />
          </g>
        </Gabel>
        {/* Die geöffnete Wand wird mit einem Flicken vernäht. */}
        <Folge ab={3.6} von={0}>
          <path
            d={NAHT}
            fill="none"
            stroke={F.petrolHell}
            strokeWidth="14"
            strokeLinecap="round"
          />
          <path
            d={NAHT}
            fill="none"
            stroke={F.linie}
            strokeWidth="20"
            strokeDasharray="2.5 12"
          />
        </Folge>
        <path d={WAND_INNEN} {...KONTUR} />
        {/* Die herausgeschälte Ablagerung liegt neben dem Gefäß; in Bewegung wird sie herausgehoben. */}
        <g className="karotisstenose-behandlung-ausschaelen">
          <g transform="translate(78 40)">
            <path
              d={ABLAGERUNG}
              fill={F.kupfer}
              stroke={F.kupferHell}
              strokeWidth="3"
              strokeLinejoin="round"
            />
          </g>
        </g>
      </g>

      {/* Rechts: Stent */}
      <g transform="translate(65 -80)">
        <Gabel>
          <path d={ABLAGERUNG_GEDRUECKT} fill={F.kupfer} />
          {/* In Bewegung ist die Ablagerung erst dick und wird vom Stent an die Wand gedrückt. */}
          <g className="karotisstenose-behandlung-ablagerung" opacity="0">
            <path d={ABLAGERUNG} fill={F.kupfer} />
          </g>
          <path
            className="karotisstenose-behandlung-stent"
            d={STENT}
            fill="none"
            stroke="url(#karotisstenose-behandlung-gitter)"
            strokeWidth="40"
          />
          <g className="karotisstenose-behandlung-fluss">
            <Fluss d={FLUSS_AUSSEN} farbe={F.creme} breite={7} dauer={1.2} />
            <Fluss
              d={FLUSS_INNEN}
              farbe={F.creme}
              breite={7}
              dauer={1.2}
              ab={0.4}
            />
          </g>
        </Gabel>
        <path d={WAND_INNEN} {...KONTUR} />
      </g>

      <line
        x1="40"
        y1="580"
        x2="680"
        y2="580"
        stroke={F.leise}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Etikett x={360} y={634} anker="middle">
        Medikamente für alle
      </Etikett>
      <Unterzeile x={360} y={668} anker="middle">
        ASS, Cholesterinsenker, Blutdruck senken
      </Unterzeile>
    </Zeichnung>
  );
}
