import { Etikett, F, Fluss, Pfeil, Unterzeile, Zeichnung } from './bausteine';

/** Längsschnitt durch ein Blutgefäß: oben normaler Druck, unten hoher Druck. */
export default function Bluthochdruck() {
  return (
    <Zeichnung titel="Zwei Blutgefäße im Längsschnitt: bei normalem Druck drückt das Blut sanft gegen eine dünne Wand, bei hohem Druck kräftig gegen eine verdickte Wand">
      {/* Normaler Druck: dünne Wand, wenige kurze Pfeile */}
      <rect x="40" y="140" width="640" height="126" fill={F.petrolDunkel} />
      <rect x="40" y="126" width="640" height="14" fill={F.petrolHell} />
      <rect x="40" y="266" width="640" height="14" fill={F.petrolHell} />
      {[126, 140, 266, 280].map((y) => (
        <line key={y} x1="40" y1={y} x2="680" y2={y} stroke={F.linie} strokeWidth="4" strokeLinecap="round" />
      ))}
      <Pfeil d="M64 203 L140 203" farbe={F.leise} breite={5} />
      <Fluss d="M160 203 L680 203" farbe={F.leise} breite={6} dauer={1.2} />
      {[250, 400, 550].map((x) => (
        <g key={x}>
          <g className="bluthochdruck-normal-auf">
            <Pfeil d={`M${x} 190 L${x} 162`} breite={4} />
          </g>
          <g className="bluthochdruck-normal-ab">
            <Pfeil d={`M${x} 216 L${x} 244`} breite={4} />
          </g>
        </g>
      ))}

      {/* Hoher Druck: dicke Wand, viele kräftige Pfeile */}
      <rect x="40" y="444" width="640" height="116" fill={F.petrolDunkel} />
      <rect x="40" y="416" width="640" height="28" fill={F.kupfer} />
      <rect x="40" y="560" width="640" height="28" fill={F.kupfer} />
      {[416, 444, 560, 588].map((y) => (
        <line key={y} x1="40" y1={y} x2="680" y2={y} stroke={F.linie} strokeWidth="4" strokeLinecap="round" />
      ))}
      <Pfeil d="M64 502 L140 502" farbe={F.leise} breite={5} />
      <Fluss d="M160 502 L680 502" farbe={F.leise} breite={6} dauer={1.2} />
      {[220, 320, 420, 520, 620].map((x) => (
        <g key={x}>
          <g className="bluthochdruck-hoch-auf">
            <Pfeil d={`M${x} 491 L${x} 458`} farbe={F.kupferHell} breite={7} />
          </g>
          <g className="bluthochdruck-hoch-ab">
            <Pfeil d={`M${x} 513 L${x} 546`} farbe={F.kupferHell} breite={7} />
          </g>
        </g>
      ))}

      <Etikett x={40} y={62}>
        Normaler Druck
      </Etikett>
      <Unterzeile x={40} y={94}>
        Das Blut drückt sanft gegen die Wand
      </Unterzeile>

      <Etikett x={40} y={356} farbe={F.kupferHell}>
        Hoher Druck
      </Etikett>
      <Unterzeile x={40} y={388}>
        Die Wand wird dick und starr
      </Unterzeile>

      <Etikett x={360} y={646} anker="middle">
        Auf Dauer nehmen Schaden:
      </Etikett>
      <Unterzeile x={360} y={680} anker="middle">
        Herz, Gehirn, Nieren und Augen
      </Unterzeile>
    </Zeichnung>
  );
}
