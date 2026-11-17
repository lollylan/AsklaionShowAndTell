import { Etikett, F, KONTUR, Pfeil, Unterzeile, Zeichnung } from './bausteine';

// Fuß von der Innenseite, Ferse links, Zehen rechts, Boden bei y = 0. Gewölbe unter x ≈ 190.

/** Fußsohle von der Ferse bis zu den Zehen, h = Höhe des Gewölbes. */
const sohle = (h: number) => `L90 0 C140 0 150 ${-h} 190 ${-h} C230 ${-h} 240 0 275 0 L330 0`;

/** Umriss von Unterschenkel und Fuß, oben offen. */
export const fussRand = (h: number) =>
  'M40 -230 C42 -170 36 -120 30 -80 C26 -50 2 -46 4 -20 C6 -4 20 0 40 0 ' +
  sohle(h) +
  ' C360 0 380 2 396 -2 C412 -6 410 -24 394 -26 C370 -30 350 -36 320 -48 ' +
  'C270 -68 220 -90 190 -110 C170 -124 156 -150 150 -180 L146 -230';

const GESUND = 34;

function Fuss({ h }: { h: number }) {
  return (
    <g>
      <path d={`${fussRand(h)} Z`} fill={F.petrol} />
      <path d={fussRand(h)} {...KONTUR} />
      {/* Innenknöchel und Großzehennagel */}
      <ellipse cx="110" cy="-122" rx="16" ry="14" fill="none" stroke={F.leise} strokeWidth="3" />
      <path d="M380 -27 C390 -28 398 -26 402 -20" fill="none" stroke={F.leise} strokeWidth="3" strokeLinecap="round" />
    </g>
  );
}

const DICKE = 14;

/** Einlage unter dem Fuß, oben genau an der Sohle mit gesundem Gewölbe. */
const EINLAGE =
  `M24 0 L384 0 L384 ${-DICKE + 2} C384 ${-DICKE} 380 ${-DICKE} 372 ${-DICKE} L275 ${-DICKE} ` +
  `C240 ${-DICKE} 230 ${-GESUND - DICKE} 190 ${-GESUND - DICKE} C150 ${-GESUND - DICKE} 140 ${-DICKE} 90 ${-DICKE} ` +
  `L36 ${-DICKE} C28 ${-DICKE} 24 ${-DICKE + 4} 24 0 Z`;

const LINKS = 250;

function Boden({ y }: { y: number }) {
  return <line x1={LINKS - 20} y1={y + 2} x2={LINKS + 430} y2={y + 2} stroke={F.leise} strokeWidth="3" strokeLinecap="round" />;
}

export default function Einlagen() {
  const oben = 288;
  const unten = 606;
  return (
    <Zeichnung titel="Fuß von der Innenseite im Vergleich: oben ohne Einlage ist das Fußgewölbe abgesunken, unten stützt eine Einlage das Gewölbe von unten">
      {/* ohne Einlage */}
      <Boden y={oben} />
      <g transform={`translate(${LINKS} ${oben})`}>
        <Fuss h={8} />
        <path d={`M90 0 C140 0 150 ${-GESUND} 190 ${-GESUND} C230 ${-GESUND} 240 0 275 0`} fill="none" stroke={F.leise} strokeWidth="3" strokeDasharray="6 8" strokeLinecap="round" />
        <Pfeil d="M190 -50 L190 -20" farbe={F.kupferHell} breite={4} />
      </g>
      <Etikett x={40} y={130}>
        ohne Einlage
      </Etikett>
      <Unterzeile x={LINKS + 190} y={oben + 36} anker="middle" farbe={F.kupferHell}>
        Gewölbe abgesunken
      </Unterzeile>

      {/* mit Einlage */}
      <Boden y={unten} />
      <g transform={`translate(${LINKS} ${unten})`}>
        <path d={EINLAGE} fill={F.kupfer} stroke={F.linie} strokeWidth="3" strokeLinejoin="round" />
        <g transform={`translate(0 ${-DICKE})`}>
          <Fuss h={GESUND} />
        </g>
        <Pfeil d="M190 -4 L190 -30" farbe={F.linie} breite={4} />
      </g>
      <Etikett x={40} y={448}>
        mit Einlage
      </Etikett>
      <Unterzeile x={LINKS + 190} y={unten + 36} anker="middle" farbe={F.linie}>
        Gewölbe gestützt
      </Unterzeile>
    </Zeichnung>
  );
}
