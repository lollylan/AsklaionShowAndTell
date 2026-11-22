import { Etikett, F, KONTUR, Pfeil, Unterzeile, Zeichnung } from './bausteine';

/** Einfache Person: Kopf und Oberkörper, Mitte unten bei (x, y). */
function Person({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle cx="0" cy="-118" r="28" {...KONTUR} fill={F.petrol} />
      <path d="M-50 0 L-50 -40 C-50 -70 -30 -82 0 -82 C30 -82 50 -70 50 -40 L50 0 Z" {...KONTUR} fill={F.petrol} />
    </g>
  );
}

/** Vier kleine Bilder: Hände waschen, in die Armbeuge husten, Abstand halten, lüften. */
export default function ErkaeltungSchutz() {
  return (
    <Zeichnung titel="Vier kleine Bilder: zwei Hände unter Wassertropfen, ein Kopf hustet in die Armbeuge, zwei Menschen mit Abstand, ein geöffnetes Fenster mit frischer Luft">
      <Etikett x={360} y={56} anker="middle">
        So stecken Sie niemanden an
      </Etikett>

      {/* Hände waschen: Wasserhahn, Wasser, zwei Hände */}
      <g>
        <path d="M110 130 L190 130 L190 160" {...KONTUR} strokeWidth={14} stroke={F.leise} />
        <path d="M180 176 L180 222 M196 186 L196 214" stroke={F.petrolHell} strokeWidth="5" strokeLinecap="round" strokeDasharray="10 8" />
        <g transform="rotate(-24 160 262)">
          <ellipse cx="160" cy="262" rx="30" ry="48" {...KONTUR} fill={F.creme} />
          <path d="M148 226 L148 250 M160 222 L160 250 M172 226 L172 250" stroke={F.leise} strokeWidth="3" strokeLinecap="round" />
        </g>
        <g transform="rotate(24 212 262)">
          <ellipse cx="212" cy="262" rx="30" ry="48" {...KONTUR} fill={F.creme} />
          <path d="M200 226 L200 250 M212 222 L212 250 M224 226 L224 250" stroke={F.leise} strokeWidth="3" strokeLinecap="round" />
        </g>
        <Etikett x={180} y={350} anker="middle">
          Hände waschen
        </Etikett>
      </g>

      {/* In die Armbeuge husten: Mensch im Profil, Ellenbeuge vor dem Mund */}
      <g>
        <path d="M500 310 L500 290 C500 262 524 250 560 250 C596 250 620 262 620 290 L620 310 Z" {...KONTUR} fill={F.petrol} />
        <circle cx="566" cy="196" r="40" {...KONTUR} fill={F.petrol} />
        <path d="M528 182 L512 198 L527 204" {...KONTUR} fill={F.petrol} />
        <path d="M598 274 L496 214 L540 140" {...KONTUR} strokeWidth={28} stroke={F.linie} />
        <path d="M598 274 L496 214 L540 140" {...KONTUR} strokeWidth={20} stroke={F.petrolHell} />
        <Etikett x={560} y={350} anker="middle">
          In die Armbeuge
        </Etikett>
      </g>

      {/* Abstand halten */}
      <g>
        <Person x={110} y={600} />
        <Person x={250} y={600} />
        <Pfeil d="M146 470 L214 470" farbe={F.kupferHell} breite={4} />
        <Pfeil d="M214 470 L146 470" farbe={F.kupferHell} breite={4} />
        <Etikett x={180} y={650} anker="middle">
          Abstand halten
        </Etikett>
      </g>

      {/* Lüften */}
      <g>
        <rect x="470" y="420" width="120" height="180" {...KONTUR} fill={F.tief} />
        <path d="M470 420 L420 450 L420 630 L470 600" {...KONTUR} fill={F.petrol} />
        <path d="M530 420 L530 600" {...KONTUR} strokeWidth={3} stroke={F.leise} />
        <Pfeil d="M610 470 q20 -10 40 0 q20 10 40 0" farbe={F.leise} breite={4} />
        <Pfeil d="M610 530 q20 -10 40 0 q20 10 40 0" farbe={F.leise} breite={4} />
        <Etikett x={540} y={650} anker="middle">
          Lüften
        </Etikett>
      </g>

      <Unterzeile x={360} y={696} anker="middle">
        Viren gehen über Tröpfchen und Hände weiter
      </Unterzeile>
    </Zeichnung>
  );
}
