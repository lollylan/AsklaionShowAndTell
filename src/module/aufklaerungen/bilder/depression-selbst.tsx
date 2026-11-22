import type { ReactNode } from 'react';
import { Etikett, F, Folge, KONTUR, Pfeil, Unterzeile, Zeichnung } from './bausteine';

/** Kreis-Knoten mit kleinem Zeichen in der Mitte. */
function Knoten({ x, y, children }: { x: number; y: number; children: ReactNode }) {
  return (
    <g>
      <circle cx={x} cy={y} r="54" {...KONTUR} fill={F.petrolDunkel} />
      <g transform={`translate(${x} ${y})`}>{children}</g>
    </g>
  );
}

/** In Bewegung: Beginn des Schritts i in Sekunden (Station, Pfeil, Station … und zuletzt der Ausweg). */
const TAKT = 0.75;
const ab = (i: number) => 0.7 + i * TAKT;

/** Teufelskreis aus Rückzug und gedrückter Stimmung – und wo man ihn durchbrechen kann. */
export default function DepressionSelbst() {
  return (
    <Zeichnung titel="Kreislauf aus drei Stationen: gedrückte Stimmung führt zu weniger Unternehmungen, dadurch erlebt man weniger Schönes, und die Stimmung sinkt weiter; ein Pfeil von unten zeigt den Ausweg: kleine Schritte, Bewegung, Kontakte">
      {/* In Bewegung läuft der Kreislauf reihum, der Ausweg von unten kommt zuletzt. */}
      {/* Stimmung gedrückt: traurige Linie */}
      <Folge ab={ab(0)}>
        <Knoten x={360} y={190}>
          <circle cx="-16" cy="-10" r="5" fill={F.linie} />
          <circle cx="16" cy="-10" r="5" fill={F.linie} />
          <path d="M-20 22 C-10 10 10 10 20 22" {...KONTUR} />
        </Knoten>
        <Etikett x={360} y={106} anker="middle">
          Stimmung gedrückt
        </Etikett>
      </Folge>

      <Folge ab={ab(1)}>
        <Pfeil d="M418 210 C490 240 540 300 556 356" farbe={F.leise} breite={5} />
      </Folge>
      {/* weniger tun: Pause */}
      <Folge ab={ab(2)}>
        <Knoten x={560} y={420}>
          <rect x="-18" y="-22" width="12" height="44" rx="3" fill={F.linie} />
          <rect x="6" y="-22" width="12" height="44" rx="3" fill={F.linie} />
        </Knoten>
        <Etikett x={560} y={508} anker="middle">
          weniger tun
        </Etikett>
      </Folge>

      <Folge ab={ab(3)}>
        <Pfeil d="M496 444 C440 470 280 470 226 444" farbe={F.leise} breite={5} />
      </Folge>
      {/* weniger Freude: blasser Stern */}
      <Folge ab={ab(4)}>
        <Knoten x={160} y={420}>
          <path
            d="M0 -26 L7 -8 L26 -8 L11 4 L17 23 L0 12 L-17 23 L-11 4 L-26 -8 L-7 -8 Z"
            fill="none"
            stroke={F.leise}
            strokeWidth="3"
            strokeDasharray="5 5"
            strokeLinejoin="round"
          />
        </Knoten>
        <Etikett x={160} y={508} anker="middle">
          weniger Freude
        </Etikett>
      </Folge>

      <Folge ab={ab(5)}>
        <Pfeil d="M164 356 C180 300 230 240 302 210" farbe={F.leise} breite={5} />
      </Folge>

      {/* Ausweg */}
      <Folge ab={ab(6) + 0.3} von={0} dauer={1.2}>
        <Pfeil d="M360 590 L360 482" farbe={F.kupfer} breite={7} />
        <Etikett x={360} y={630} anker="middle" farbe={F.kupferHell}>
          Hier ansetzen: kleine Schritte
        </Etikett>
        <Unterzeile x={360} y={664} anker="middle">
          Bewegung, Kontakte, etwas Angenehmes
        </Unterzeile>
      </Folge>
    </Zeichnung>
  );
}
