import { Etikett, F, Unterzeile, Zeichnung, Zeiger } from './bausteine';
import { Rumpf } from './hernie';

const MASS = 1.15;

/** Narbenbruch von vorn: unter einer alten Bauchschnitt-Narbe hat die Bauchwand nachgegeben. */
export default function Narbenbruch() {
  return (
    <Zeichnung titel="Bauch von vorn mit einer alten Operationsnarbe in der Mitte unterhalb des Nabels: unter der Narbe ist die Naht der Bauchwand auseinandergewichen, dort wölbt sich der Bauch breit vor">
      <clipPath id="narbenbruch-flaeche">
        <rect x="0" y="0" width="720" height="720" />
      </clipPath>
      <g clipPath="url(#narbenbruch-flaeche)">
        <g transform={`translate(360 -141) scale(${MASS}) translate(-360 0)`}>
          <Rumpf strich={4 / MASS} />
        </g>
      </g>

      {/* Breite Vorwölbung unter der Narbe */}
      <ellipse cx="360" cy="392" rx="92" ry="76" fill={F.kupfer} stroke={F.kupferHell} strokeWidth="4" />
      {/* Auseinandergewichene Ränder der Bauchwand darunter */}
      <g fill="none" stroke={F.kupferHell} strokeWidth="3" strokeDasharray="8 7" strokeLinecap="round">
        <path d="M352 326 C318 352 312 432 352 458" />
        <path d="M368 326 C402 352 408 432 368 458" />
      </g>

      {/* Alte OP-Narbe mit Stichen */}
      <path d="M360 290 L360 500" fill="none" stroke={F.linie} strokeWidth="5" strokeLinecap="round" />
      <g stroke={F.linie} strokeWidth="3" strokeLinecap="round">
        {[304, 334, 364, 394, 424, 454, 484].map((y) => (
          <line key={y} x1="348" y1={y} x2="372" y2={y} />
        ))}
      </g>

      <Etikett x={20} y={240}>
        Alte OP-Narbe
      </Etikett>
      <Zeiger von={[180, 254]} nach={[354, 300]} />

      <Etikett x={700} y={400} anker="end" farbe={F.kupferHell}>
        Vorwölbung
      </Etikett>
      <Zeiger von={[524, 392]} nach={[452, 392]} />

      <Unterzeile x={360} y={672} anker="middle">
        Die Naht hat nachgegeben
      </Unterzeile>
    </Zeichnung>
  );
}
