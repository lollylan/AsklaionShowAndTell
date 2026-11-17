import { Etikett, F, KONTUR, Pfeil, Unterzeile, Zeichnung } from './bausteine';
import { InhalierKopf, MUND, Spray } from './inhalieren';

/** Vier Felder im 2×2-Raster, je mit Nummer, Überschrift und kurzer Zeile. */
const FELDER = [
  { x: 0, y: 0, titel: 'Schütteln', zeile: 'Kappe ab' },
  { x: 360, y: 0, titel: 'Ausatmen', zeile: 'nicht ins Gerät' },
  { x: 0, y: 360, titel: 'Einatmen, drücken', zeile: 'langsam und tief' },
  { x: 360, y: 360, titel: 'Luft anhalten', zeile: '5–10 Sekunden' },
];

const KLEIN = 0.62;

export default function InhalierenSpray() {
  return (
    <Zeichnung titel="Das Spray in vier Schritten: schütteln, neben dem Gerät ausatmen, Mundstück mit den Lippen umschließen und langsam einatmen und dabei drücken, dann fünf bis zehn Sekunden die Luft anhalten">
      {FELDER.map((f, i) => (
        <g key={f.titel}>
          <circle cx={f.x + 46} cy={f.y + 52} r="28" fill={i === 2 ? F.petrolHell : F.petrol} stroke={F.linie} strokeWidth="4" />
          <text x={f.x + 46} y={f.y + 62} textAnchor="middle" fontSize="28" fontWeight="700" fill={F.linie}>
            {i + 1}
          </text>
          <Etikett x={f.x + 88} y={f.y + 50}>
            {f.titel}
          </Etikett>
          <Unterzeile x={f.x + 88} y={f.y + 80}>
            {f.zeile}
          </Unterzeile>
        </g>
      ))}

      {/* Trennlinien zwischen den Feldern */}
      <path d="M360 130 L360 330 M360 470 L360 690 M40 360 L680 360" stroke={F.leise} strokeWidth="2" strokeDasharray="2 10" strokeLinecap="round" />

      {/* 1 Schütteln */}
      <Spray x={214} y={276} />
      <path
        d="M96 170 C76 200 76 250 96 280"
        fill="none"
        stroke={F.linie}
        strokeWidth="5"
        strokeLinecap="round"
        markerStart="url(#pfeilspitze)"
        markerEnd="url(#pfeilspitze)"
      />
      <path
        d="M254 170 C274 200 274 250 254 280"
        fill="none"
        stroke={F.linie}
        strokeWidth="5"
        strokeLinecap="round"
        markerStart="url(#pfeilspitze)"
        markerEnd="url(#pfeilspitze)"
      />

      {/* 2 Ausatmen, vom Gerät weg */}
      <g transform={`translate(520 112) scale(${KLEIN})`}>
        <InhalierKopf />
      </g>
      <Pfeil d={`M${520 + MUND[0] * KLEIN - 14} ${112 + MUND[1] * KLEIN + 4} C 500 270 470 290 430 300`} farbe={F.leise} breite={6} />

      {/* 3 Mundstück umschließen, langsam einatmen und drücken */}
      <g transform={`translate(160 472) scale(${KLEIN})`}>
        <InhalierKopf>
          <Pfeil d="M96 222 C140 214 172 218 184 238 C194 256 186 290 183 318" farbe={F.kupferHell} breite={8} />
        </InhalierKopf>
        <Spray x={MUND[0] + 14} y={MUND[1]} finger />
      </g>

      {/* 4 Luft anhalten: Mund zu, Stoppuhr */}
      <g transform={`translate(530 472) scale(${KLEIN})`}>
        <InhalierKopf mundZu />
      </g>
      <g transform="translate(450 592)">
        <rect x="-10" y="-74" width="20" height="16" rx="4" fill={F.leise} />
        <circle cx="0" cy="0" r="58" {...KONTUR} fill={F.petrolDunkel} />
        <path d="M0 0 L0 -46 A46 46 0 0 1 40 23 Z" fill={F.kupfer} stroke={F.kupferHell} strokeWidth="3" strokeLinejoin="round" />
        <circle cx="0" cy="0" r="6" fill={F.linie} />
      </g>
    </Zeichnung>
  );
}
