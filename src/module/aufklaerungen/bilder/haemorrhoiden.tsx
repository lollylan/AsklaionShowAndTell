import type { ReactNode } from 'react';
import { Etikett, F, KONTUR, Pfeil, Unterzeile, Zeichnung, Zeiger } from './bausteine';

// Gemeinsamer Längsschnitt durch Enddarm und Analkanal, auch für analvenenthrombose.tsx und
// after-vergleich.tsx. Gezeichnet wird die linke Hälfte, die rechte entsteht durch Spiegeln an
// x = 360. Oben der Enddarm, unten die Öffnung nach außen; Höhe der Grenzlinie: GRENZE_Y.

/** Höhe der Grenzlinie (Linea dentata) im Analkanal. */
export const GRENZE_Y = 470;

/** Haut am After (linke Hälfte), für Rötung beim Ekzem. */
export const HAUT_LINKS = 'M318 520 C318 548 306 562 280 566 C225 574 168 574 132 556';

function Haelfte() {
  return (
    <g>
      {/* Gesäß und Weichteile um den Analkanal, unten die Haut */}
      <path
        d="M302 520 L302 350 C298 310 250 300 250 258 C200 285 140 320 118 382 C96 440 98 530 132 556 C168 574 225 574 280 566 C306 562 318 548 318 520 Z"
        fill={F.petrolDunkel}
        {...{ stroke: F.linie, strokeWidth: 4, strokeLinejoin: 'round' as const }}
      />
      {/* Wand von Enddarm und Analkanal */}
      <path
        d="M250 30 L290 30 L290 240 C290 285 316 300 318 345 L318 520 L302 520 L302 350 C298 310 250 300 250 258 Z"
        fill={F.petrol}
      />
      <path d="M250 30 L250 258" {...KONTUR} />
      <path d="M290 30 L290 240 C290 285 316 300 318 345 L318 522" {...KONTUR} />
      {/* Schließmuskel */}
      <path
        d="M300 346 L300 538 C282 550 258 548 248 530 L246 374 C252 352 276 340 300 346 Z"
        fill={F.petrolHell}
        stroke={F.linie}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {[380, 410, 440, 470, 500].map((y) => (
        <line
          key={y}
          x1="254"
          y1={y}
          x2="294"
          y2={y}
          stroke={F.petrol}
          strokeWidth="3"
          strokeLinecap="round"
        />
      ))}
      {/* Gefäßpolster in normaler Größe */}
      <path d="M318 362 C346 372 350 418 318 430 Z" fill={F.petrolHell} stroke={F.linie} strokeWidth="3" />
    </g>
  );
}

/**
 * Längsschnitt durch Enddarm und Analkanal mit Schließmuskel, Grenzlinie und normalen
 * Gefäßpolstern. `children` liegen obenauf (Krankes, Zeiger).
 */
export function Analschnitt({ children }: { children?: ReactNode }) {
  return (
    <g>
      <Haelfte />
      <g transform="translate(720 0) scale(-1 1)">
        <Haelfte />
      </g>
      {/* Grenzlinie (Linea dentata) */}
      <line
        x1="296"
        y1={GRENZE_Y}
        x2="424"
        y2={GRENZE_Y}
        stroke={F.linie}
        strokeWidth="3"
        strokeDasharray="6 7"
        strokeLinecap="round"
      />
      {children}
    </g>
  );
}

/** Vergrößertes Polster an der rechten Wand, oberhalb der Grenzlinie. */
export function GrossesPolsterRechts() {
  return (
    <path
      d="M402 346 C362 348 346 400 356 436 C364 456 390 456 402 446 Z"
      fill={F.kupfer}
      stroke={F.linie}
      strokeWidth="3"
      strokeLinejoin="round"
    />
  );
}

/** Enddarm im Längsschnitt: links ein normales Gefäßpolster, rechts eine vergrößerte Hämorrhoide, die nach außen vorfallen kann. */
export default function Haemorrhoiden() {
  return (
    <Zeichnung titel="Längsschnitt durch Enddarm und After: Gefäßpolster hat jeder Mensch, eine vergrößerte Hämorrhoide liegt innen oberhalb der Grenzlinie und kann nach außen vorfallen">
      <Analschnitt>
        <GrossesPolsterRechts />
        {/* kann vorfallen */}
        <Pfeil d="M384 462 C396 500 392 540 382 580" farbe={F.kupferHell} breite={4} />
        <ellipse
          cx="378"
          cy="620"
          rx="26"
          ry="18"
          fill="none"
          stroke={F.kupferHell}
          strokeWidth="3"
          strokeDasharray="7 6"
        />
      </Analschnitt>

      <Etikett x={30} y={56}>
        Enddarm
      </Etikett>
      <Zeiger von={[160, 48]} nach={[270, 110]} />

      <Etikett x={30} y={166}>
        Gefäßpolster
      </Etikett>
      <Unterzeile x={30} y={196}>
        hat jeder Mensch
      </Unterzeile>
      <Zeiger von={[120, 210]} nach={[334, 396]} />

      <Etikett x={700} y={56} anker="end" farbe={F.kupferHell}>
        Hämorrhoide
      </Etikett>
      <Unterzeile x={700} y={86} anker="end">
        vergrößertes Polster
      </Unterzeile>
      <Zeiger von={[600, 98]} nach={[372, 400]} />

      <Etikett x={700} y={196} anker="end">
        Grenzlinie
      </Etikett>
      <Unterzeile x={700} y={226} anker="end">
        darüber kaum
      </Unterzeile>
      <Unterzeile x={700} y={252} anker="end">
        Schmerzempfinden
      </Unterzeile>
      <Zeiger von={[610, 264]} nach={[410, GRENZE_Y]} />

      <Etikett x={30} y={640}>
        Schließmuskel
      </Etikett>
      <Zeiger von={[120, 612]} nach={[268, 500]} />

      <Etikett x={700} y={640} anker="end" farbe={F.kupferHell}>
        Vorfall nach außen
      </Etikett>
      <Unterzeile x={700} y={670} anker="end">
        Grad III und IV
      </Unterzeile>
    </Zeichnung>
  );
}
