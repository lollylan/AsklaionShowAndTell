import type { ReactNode } from 'react';
import { Etikett, F, KONTUR, Pfeil, Unterzeile, Zeichnung } from './bausteine';

const R = 52;

function Station({ x, y, children }: { x: number; y: number; children: ReactNode }) {
  return (
    <g>
      <circle cx={x} cy={y} r={R} {...KONTUR} fill={F.petrol} />
      {children}
    </g>
  );
}

/** Teufelskreis der Angst: Herzrasen – Gedanke an Gefahr – Angst steigt – Stresshormone – mehr Herzrasen. */
export default function Angststoerung() {
  return (
    <Zeichnung titel="Teufelskreis der Angst mit vier Stationen im Kreis: Herzrasen, der Gedanke an Gefahr, die Angst steigt, Stresshormone werden ausgeschüttet und verstärken das Herzrasen">
      {/* Pfeile im Uhrzeigersinn */}
      <Pfeil d="M266 200 L448 200" />
      <Pfeil d="M520 266 L520 398" />
      <Pfeil d="M454 470 L272 470" />
      <Pfeil d="M200 404 L200 272" />

      {/* Herzrasen: Herz */}
      <Station x={200} y={200}>
        <path
          d="M200 230 C162 206 160 172 180 166 C192 162 200 172 200 180 C200 172 208 162 220 166 C240 172 238 206 200 230 Z"
          fill={F.kupferHell}
          stroke={F.linie}
          strokeWidth="3"
          strokeLinejoin="round"
        />
      </Station>

      {/* Gedanke: Gefahr – Denkblase mit Ausrufezeichen */}
      <Station x={520} y={200}>
        <ellipse cx="526" cy="190" rx="30" ry="23" fill={F.creme} />
        <circle cx="500" cy="222" r="6" fill={F.creme} />
        <circle cx="490" cy="234" r="4" fill={F.creme} />
        <line x1="526" y1="177" x2="526" y2="194" stroke={F.kupfer} strokeWidth="6" strokeLinecap="round" />
        <circle cx="526" cy="205" r="4" fill={F.kupfer} />
      </Station>

      {/* Angst steigt: wachsende Balken */}
      <Station x={520} y={470}>
        <rect x="492" y="478" width="14" height="16" rx="3" fill={F.leise} />
        <rect x="513" y="463" width="14" height="31" rx="3" fill={F.kupferHell} />
        <rect x="534" y="446" width="14" height="48" rx="3" fill={F.kupfer} />
      </Station>

      {/* Stresshormone: Blitz */}
      <Station x={200} y={470}>
        <path
          d="M210 436 L186 474 L202 474 L192 504 L218 462 L202 462 Z"
          fill={F.kupferHell}
          stroke={F.linie}
          strokeWidth="3"
          strokeLinejoin="round"
        />
      </Station>

      <Etikett x={200} y={122} anker="middle">
        Herzrasen
      </Etikett>
      <Etikett x={520} y={122} anker="middle">
        Gedanke: Gefahr!
      </Etikett>
      <Etikett x={520} y={570} anker="middle">
        Angst steigt
      </Etikett>
      <Etikett x={200} y={570} anker="middle">
        Stresshormone
      </Etikett>

      <Etikett x={360} y={344} anker="middle" farbe={F.kupferHell}>
        Teufelskreis
      </Etikett>

      <Unterzeile x={360} y={660} anker="middle">
        Wer den Kreis kennt, kann ihn durchbrechen
      </Unterzeile>
    </Zeichnung>
  );
}
