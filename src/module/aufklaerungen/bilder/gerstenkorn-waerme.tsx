import { Etikett, F, KONTUR, Pfeil, Unterzeile, Zeichnung } from './bausteine';

/** Warmer Waschlappen auf das geschlossene Auge; nicht ausdrücken. */
export default function GerstenkornWaerme() {
  return (
    <Zeichnung titel="Ein warmer, sauberer Waschlappen wird auf das geschlossene Auge mit dem Gerstenkorn gelegt, fünf bis zehn Minuten, mehrmals am Tag. Nicht ausdrücken">
      {/* Dampf */}
      {[230, 290, 350].map((x) => (
        <path key={x} d={`M${x} 140 q-12 -16 0 -32 q12 -16 0 -32`} fill="none" stroke={F.leise} strokeWidth="4" strokeLinecap="round" />
      ))}

      {/* Waschlappen */}
      <rect x="150" y="160" width="280" height="110" rx="18" {...KONTUR} fill={F.creme} />
      <rect x="166" y="176" width="248" height="78" rx="10" fill="none" stroke={F.leise} strokeWidth="3" strokeDasharray="8 8" />
      <Pfeil d="M290 290 L290 340" farbe={F.leise} />

      {/* Braue und geschlossenes Auge */}
      <path d="M160 382 Q290 342 420 382" fill="none" stroke={F.leise} strokeWidth="10" strokeLinecap="round" />
      <path d="M150 440 Q290 520 430 440" {...KONTUR} strokeWidth={5} />
      {[180, 210, 240, 270, 300, 330, 360, 390].map((x) => {
        const t = (x - 150) / 280;
        const y = 440 + 4 * t * (1 - t) * 40;
        return <line key={x} x1={x} y1={y} x2={x - 4} y2={y + 22} stroke={F.linie} strokeWidth="3" strokeLinecap="round" />;
      })}
      <ellipse cx="346" cy="474" rx="26" ry="18" fill={F.kupfer} stroke={F.kupferHell} strokeWidth="3" />

      <Etikett x={470} y={190}>
        Warm auflegen
      </Etikett>
      <Unterzeile x={470} y={222}>
        5 bis 10 Minuten,
      </Unterzeile>
      <Unterzeile x={470} y={248}>
        mehrmals am Tag
      </Unterzeile>

      <Etikett x={360} y={600} anker="middle" farbe={F.kupferHell}>
        Nicht ausdrücken
      </Etikett>
      <Unterzeile x={360} y={634} anker="middle">
        sonst breiten sich die Bakterien im Lid aus
      </Unterzeile>
    </Zeichnung>
  );
}
