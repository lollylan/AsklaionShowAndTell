import type { ReactNode } from 'react';
import { Etikett, F, Folge, KONTUR, Pfeil, Unterzeile, Zeichnung } from './bausteine';

const KX = 110;
const TX = 196;
const ZEILEN = [150, 360, 570];

/** Runde Station mit Zeichen; `wichtig` hebt die letzte Station in Kupfer hervor. */
function Station({ y, wichtig = false, children }: { y: number; wichtig?: boolean; children: ReactNode }) {
  return (
    <g>
      <circle cx={KX} cy={y} r="64" {...KONTUR} stroke={wichtig ? F.kupfer : F.linie} strokeWidth={wichtig ? 6 : 4} fill={F.petrolDunkel} />
      <g transform={`translate(${KX} ${y})`}>{children}</g>
    </g>
  );
}

/** Weg zur Diagnose und Behandlung einer ADHS bei Erwachsenen in drei Stationen. */
export default function AdhsWeg() {
  return (
    <Zeichnung titel="Weg in drei Stationen von oben nach unten: zuerst die Hausarztpraxis, die körperliche Ursachen prüft und überweist; dann Psychiater oder Psychotherapeut, die die Diagnose mit Gesprächen, Fragebögen und Fragen zur Kindheit stellen; zuletzt, hervorgehoben, Psychiater oder Neurologe, die Medikamente einstellen und verordnen">
      {/* 1 Hausarztpraxis: Haus mit Kreuz */}
      <Folge ab={0.6}>
        <Station y={ZEILEN[0]}>
          <path d="M-32 -2 L0 -30 L32 -2 L32 30 L-32 30 Z" {...KONTUR} strokeWidth="3" fill={F.petrol} />
          <path d="M0 -2 L0 22 M-12 10 L12 10" fill="none" stroke={F.linie} strokeWidth="6" strokeLinecap="round" />
        </Station>
        <Etikett x={TX} y={ZEILEN[0] - 8}>
          Hausarztpraxis
        </Etikett>
        <Unterzeile x={TX} y={ZEILEN[0] + 26}>
          körperliche Ursachen prüfen, Überweisung
        </Unterzeile>
      </Folge>

      <Folge ab={1.3}>
        <Pfeil d={`M${KX} ${ZEILEN[0] + 80} L${KX} ${ZEILEN[1] - 84}`} farbe={F.leise} />
      </Folge>

      {/* 2 Diagnose: Sprechblase und Fragebogen */}
      <Folge ab={1.8}>
        <Station y={ZEILEN[1]}>
          <path d="M-40 -30 L4 -30 Q10 -30 10 -24 L10 -2 Q10 4 4 4 L-22 4 L-32 14 L-30 4 L-40 4 Q-46 4 -46 -2 L-46 -24 Q-46 -30 -40 -30 Z" {...KONTUR} strokeWidth="3" fill={F.petrol} />
          <rect x="4" y="-8" width="38" height="46" rx="4" {...KONTUR} strokeWidth="3" fill={F.petrolDunkel} />
          <path d="M12 4 L34 4 M12 16 L34 16 M12 28 L26 28" fill="none" stroke={F.leise} strokeWidth="3" strokeLinecap="round" />
        </Station>
        <Etikett x={TX} y={ZEILEN[1] - 8}>
          Psychiater oder Psychotherapeut
        </Etikett>
        <Unterzeile x={TX} y={ZEILEN[1] + 26}>
          Diagnose: Gespräche, Fragebögen, Kindheit
        </Unterzeile>
      </Folge>

      <Folge ab={2.5}>
        <Pfeil d={`M${KX} ${ZEILEN[1] + 80} L${KX} ${ZEILEN[2] - 84}`} farbe={F.leise} />
      </Folge>

      {/* 3 Medikamente: Rezept und Tablette */}
      <Folge ab={3.0}>
        <Station y={ZEILEN[2]} wichtig>
          <rect x="-36" y="-32" width="44" height="56" rx="4" {...KONTUR} strokeWidth="3" fill={F.petrol} />
          <path d="M-28 -20 L0 -20 M-28 -8 L0 -8 M-28 4 L-10 4" fill="none" stroke={F.linie} strokeWidth="3" strokeLinecap="round" />
          <g transform="translate(20 20) rotate(-35)">
            <rect x="-24" y="-11" width="48" height="22" rx="11" fill={F.kupferHell} stroke={F.linie} strokeWidth="3" />
            <line x1="0" y1="-11" x2="0" y2="11" stroke={F.linie} strokeWidth="3" />
          </g>
        </Station>
        <Etikett x={TX} y={ZEILEN[2] - 8} farbe={F.kupferHell}>
          Psychiater oder Neurologe
        </Etikett>
        <Unterzeile x={TX} y={ZEILEN[2] + 26}>
          Medikamente einstellen und verordnen
        </Unterzeile>
      </Folge>
    </Zeichnung>
  );
}
