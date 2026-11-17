import { Etikett, F, Unterzeile, Zeichnung, Zeiger } from './bausteine';
import { Darm, DARM_DICKE, MUSKEL_OBEN, MUSKEL_UNTEN, Wandschnitt } from './leistenbruch';

/** Lage des Netzes: zwischen Bauchfell und Muskelschicht, über der früheren Lücke. */
const NETZ = { x: 226, y: 236, breite: 268, hoehe: 20 };

/** Bauchfell, das sich über das Netz legt. */
const BAUCHFELL =
  'M30 250 L204 250 C218 250 218 230 232 230 L488 230 C502 230 502 250 516 250 L690 250';

/** Darm liegt wieder ganz im Bauchraum. */
const DARM = 'M70 150 C110 96 190 100 220 150 C246 196 300 200 340 168 C380 136 400 104 432 120';

/** Schnitt durch die Bauchwand nach der Operation: Lücke verschlossen, Kunststoffnetz dahinter. */
export default function HernieNetz() {
  const { x, y, breite, hoehe } = NETZ;
  return (
    <Zeichnung titel="Schnitt durch die Bauchwand nach der Bruch-Operation: die Lücke in der Muskelschicht ist verschlossen, dahinter liegt ein Kunststoffnetz, der Darm ist wieder im Bauch und die Haut ist glatt">
      <Wandschnitt id="hernie-netz" bauchfell={BAUCHFELL}>
        {/* Naht, wo früher die Lücke war */}
        <line x1="360" y1={MUSKEL_OBEN + 4} x2="360" y2={MUSKEL_UNTEN - 4} stroke={F.linie} strokeWidth="3" strokeDasharray="6 6" />
        <g stroke={F.leise} strokeWidth="3" strokeLinecap="round">
          {[276, 304].map((sy) => (
            <path key={sy} d={`M350 ${sy - 7} L370 ${sy + 7} M370 ${sy - 7} L350 ${sy + 7}`} />
          ))}
        </g>

        {/* Kunststoffnetz */}
        <clipPath id="hernie-netz-band">
          <rect x={x} y={y} width={breite} height={hoehe} rx="6" />
        </clipPath>
        <rect x={x} y={y} width={breite} height={hoehe} rx="6" fill={F.petrolDunkel} />
        <g clipPath="url(#hernie-netz-band)" stroke={F.leise} strokeWidth="2">
          {Array.from({ length: 26 }, (_, i) => x - 20 + i * 12).map((sx) => (
            <g key={sx}>
              <line x1={sx} y1={y} x2={sx + hoehe} y2={y + hoehe} />
              <line x1={sx + hoehe} y1={y} x2={sx} y2={y + hoehe} />
            </g>
          ))}
        </g>
        <rect x={x} y={y} width={breite} height={hoehe} rx="6" fill="none" stroke={F.linie} strokeWidth="3" />

        <Darm d={DARM} dicke={DARM_DICKE} />
      </Wandschnitt>

      <Etikett x={30} y={56}>
        Darm wieder im Bauch
      </Etikett>
      <Zeiger von={[130, 72]} nach={[150, 112]} />

      <Etikett x={700} y={150} anker="end">
        Kunststoffnetz
      </Etikett>
      <Unterzeile x={700} y={180} anker="end">
        hinter dem Muskel
      </Unterzeile>
      <Zeiger von={[560, 192]} nach={[480, 236]} />

      <Etikett x={360} y={470} anker="middle">
        Lücke verschlossen
      </Etikett>
      <Zeiger von={[360, 444]} nach={[360, 330]} />

      <Unterzeile x={360} y={660} anker="middle">
        Das Netz wächst ein und stärkt die Bauchwand
      </Unterzeile>
    </Zeichnung>
  );
}
