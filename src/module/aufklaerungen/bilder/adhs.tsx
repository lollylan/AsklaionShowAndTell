import type { ReactNode } from 'react';
import { Etikett, F, Folge, KONTUR, Unterzeile, Zeichnung } from './bausteine';

/** Runder Knoten mit kleinem Zeichen in der Mitte. */
function Knoten({ x, y, children }: { x: number; y: number; children: ReactNode }) {
  return (
    <g>
      <circle cx={x} cy={y} r="60" {...KONTUR} fill={F.petrolDunkel} />
      <g transform={`translate(${x} ${y})`}>{children}</g>
    </g>
  );
}

const LEISE_LINIE = { stroke: F.leise, strokeWidth: 3, strokeDasharray: '6 8', strokeLinecap: 'round' } as const;

/** Die drei Kernbereiche der ADHS um eine schlichte Figur: Aufmerksamkeit, Unruhe, Impulsivität. */
export default function Adhs() {
  return (
    <Zeichnung titel="Eine schlichte Figur in der Mitte, um sie herum die drei Kernbereiche der ADHS: links Aufmerksamkeit mit einem Pfeil, der am Ziel vorbeigeht, rechts innere Unruhe mit Zickzacklinien, unten Impulsivität mit einem Blitz; darunter der Hinweis, dass die Beschwerden meist schon seit der Kindheit bestehen">
      {/* Figur: Kopf und Schultern */}
      <path d="M262 410 C262 340 300 312 360 312 C420 312 458 340 458 410 Z" {...KONTUR} fill={F.petrol} />
      <circle cx="360" cy="222" r="74" {...KONTUR} fill={F.petrol} />

      {/* Aufmerksamkeit: Pfeil geht am Ziel vorbei */}
      <Folge ab={0.6}>
        <line x1="206" y1="176" x2="282" y2="204" {...LEISE_LINIE} />
        <Knoten x={140} y={150}>
          <circle cx="14" cy="8" r="24" {...KONTUR} strokeWidth="3" />
          <circle cx="14" cy="8" r="8" fill={F.linie} />
          <path d="M-38 36 C-36 6 -28 -22 -6 -36" fill="none" stroke={F.petrolHell} strokeWidth="5" strokeLinecap="round" markerEnd="url(#pfeilspitze)" />
        </Knoten>
        <Etikett x={140} y={252} anker="middle">
          Aufmerksamkeit
        </Etikett>
        <Unterzeile x={140} y={284} anker="middle">
          schnell abgelenkt
        </Unterzeile>
      </Folge>

      {/* Unruhe: Zickzack wie ein inneres Zittern */}
      <Folge ab={1.4}>
        <line x1="514" y1="176" x2="438" y2="204" {...LEISE_LINIE} />
        <Knoten x={580} y={150}>
          {[-22, 0, 22].map((dx) => (
            <path
              key={dx}
              d={`M${dx} -30 l-8 10 l16 10 l-16 10 l16 10 l-8 10`}
              fill="none"
              stroke={F.linie}
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}
        </Knoten>
        <Etikett x={580} y={252} anker="middle">
          Unruhe
        </Etikett>
        <Unterzeile x={580} y={284} anker="middle">
          innerlich getrieben
        </Unterzeile>
      </Folge>

      {/* Impulsivität: Blitz */}
      <Folge ab={2.2}>
        <line x1="360" y1="416" x2="360" y2="456" {...LEISE_LINIE} />
        <Knoten x={360} y={520}>
          <path d="M6 -34 L-18 6 L0 6 L-6 34 L18 -6 L0 -6 Z" fill={F.kupferHell} stroke={F.linie} strokeWidth="3" strokeLinejoin="round" />
        </Knoten>
        <Etikett x={360} y={614} anker="middle">
          Impulsivität
        </Etikett>
        <Unterzeile x={360} y={646} anker="middle">
          erst handeln, dann denken
        </Unterzeile>
      </Folge>

      <Folge ab={3.0}>
        <line x1="150" y1="692" x2="250" y2="692" stroke={F.leise} strokeWidth="2" strokeLinecap="round" />
        <line x1="470" y1="692" x2="570" y2="692" stroke={F.leise} strokeWidth="2" strokeLinecap="round" />
        <Unterzeile x={360} y={700} anker="middle" farbe={F.kupferHell}>
          seit der Kindheit
        </Unterzeile>
      </Folge>
    </Zeichnung>
  );
}
