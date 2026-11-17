import { Etikett, F, Pfeil, Unterzeile, Zeichnung } from './bausteine';

// Schuh und Sohlen von der Seite, Ferse links, Spitze rechts. Sohlen: Ferse bei x = 0, Unterkante y = 0.

/** Einlage von der Seite: Fersenschale, Wölbung unter dem Gewölbe, dünn zu den Zehen. */
const EINLAGE =
  'M2 -26 C6 -15 12 -12 30 -12 L90 -12 C130 -12 140 -38 175 -38 C210 -38 225 -12 260 -10 ' +
  'L396 -6 C402 -4 402 0 396 0 L20 0 C6 0 0 -8 2 -26 Z';

/** Flache Innensohle aus dem Schuh. */
const INNENSOHLE = 'M0 -12 L396 -9 C403 -7 403 0 396 0 L10 0 C2 0 0 -4 0 -12 Z';

const SCHUH =
  'M150 600 C146 560 146 510 150 470 C152 456 166 452 180 456 C230 470 280 480 330 476 ' +
  'C380 500 450 520 520 540 C580 556 612 576 608 600 C606 612 598 620 586 620 L164 620 ' +
  'C154 620 150 612 150 600 Z';

const X = 172;
const BODEN = 620;

export default function EinlagenSchuh() {
  return (
    <Zeichnung titel="Schuh von der Seite: die flache Innensohle wird nach oben herausgenommen und die angepasste Einlage an ihrer Stelle in den Schuh gelegt. Schuhe am besten mit Einlage anprobieren">
      {/* Schuh */}
      <path d={SCHUH} fill={F.petrolDunkel} stroke={F.linie} strokeWidth="4" strokeLinejoin="round" />
      <path d="M152 600 L607 600" stroke={F.linie} strokeWidth="3" strokeLinecap="round" />
      {/* Innenrand des Schafts: der Schuh ist oben offen */}
      <path d="M164 470 C176 462 190 464 204 470 C250 486 292 494 330 488" fill="none" stroke={F.leise} strokeWidth="3" strokeLinecap="round" />
      <path d="M360 492 L380 482 M392 504 L412 494 M424 514 L444 504" stroke={F.leise} strokeWidth="3" strokeLinecap="round" />
      {/* Platz der Einlage im Schuh */}
      <path d={EINLAGE} transform={`translate(${X} 594)`} fill="none" stroke={F.kupferHell} strokeWidth="3" strokeDasharray="7 7" strokeLinejoin="round" />

      {/* Innensohle heraus */}
      <path d={INNENSOHLE} transform={`translate(${X} 172)`} fill={F.petrolHell} stroke={F.linie} strokeWidth="4" strokeLinejoin="round" />
      <Pfeil d={`M118 ${BODEN - 70} L118 190`} farbe={F.linie} breite={5} />
      <Etikett x={370} y={118} anker="middle">
        Innensohle herausnehmen
      </Etikett>

      {/* Einlage hinein */}
      <path d={EINLAGE} transform={`translate(${X} 382)`} fill={F.kupfer} stroke={F.linie} strokeWidth="4" strokeLinejoin="round" />
      <Pfeil d="M640 346 L640 532" farbe={F.kupferHell} breite={5} />
      <Etikett x={370} y={290} anker="middle" farbe={F.kupferHell}>
        Einlage hinein
      </Etikett>

      <Unterzeile x={370} y={670} anker="middle" farbe={F.linie}>
        Schuhe mit Einlage anprobieren
      </Unterzeile>
    </Zeichnung>
  );
}
