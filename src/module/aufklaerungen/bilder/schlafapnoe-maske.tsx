import { Etikett, F, Fluss, KONTUR, Pfeil, Unterzeile, Zeichnung, Zeiger } from './bausteine';

/** Kopf im Profil, Blick nach links (wie in schlafapnoe.tsx). */
const KOPF =
  'M150 420 L150 348 C130 338 120 334 104 332 C76 334 58 318 60 292 C56 284 50 276 52 268 ' +
  'L64 256 L50 244 C48 232 56 224 58 216 L30 206 C40 186 56 168 62 150 ' +
  'C54 110 66 70 100 46 C150 10 240 24 268 84 C296 150 286 250 250 300 L250 420 Z';
const ATEMWEG = 'M66 198 C115 184 170 180 195 205 C212 225 205 300 205 420';

/** Schlafender Kopf mit Nasenmaske; ein Luftstrom aus dem Gerät hält den Rachen offen. */
export default function SchlafapnoeMaske() {
  return (
    <Zeichnung titel="Kopf eines Schlafenden im Schnitt von der Seite mit einer Maske über der Nase. Ein Schlauch führt zu einem kleinen Gerät, das sanft Luft hineinpustet. Der Luftstrom hält den Rachen offen, die Zunge fällt nicht zurück">
      <Etikett x={360} y={60} anker="middle">
        Atemmaske für die Nacht
      </Etikett>
      <Unterzeile x={360} y={94} anker="middle">
        Ein sanfter Luftstrom hält den Atemweg offen
      </Unterzeile>

      <g transform="translate(330 140) scale(1.2)">
        <path d={KOPF} {...KONTUR} fill={F.petrolDunkel} />
        <path d="M96 150 q13 9 26 0" {...KONTUR} stroke={F.leise} />
        <path d={ATEMWEG} fill="none" stroke={F.linie} strokeWidth="30" />
        <path d={ATEMWEG} fill="none" stroke={F.tief} strokeWidth="22" />
        <path d="M76 236 L150 233" fill="none" stroke={F.creme} strokeWidth="8" strokeLinecap="round" />
        {/* Zunge bleibt vorn */}
        <path
          d="M78 268 C100 246 160 246 175 274 C185 296 170 314 140 316 C110 318 86 306 78 268 Z"
          fill={F.petrolHell}
          stroke={F.linie}
          strokeWidth="4"
          strokeLinejoin="round"
        />
        <Pfeil d="M44 204 L66 198 C115 184 170 180 195 205 C212 225 205 300 205 392" farbe={F.kupferHell} />
        <Fluss d="M30 206 L66 198 C115 184 170 180 195 205 C212 225 205 300 205 410" farbe={F.kupferHell} breite={6} dauer={1.2} />
        {/* Nasenmaske */}
        <path
          d="M58 160 C30 170 10 196 14 222 C18 236 40 240 62 236 Z"
          fill={F.petrolHell}
          fillOpacity="0.55"
          stroke={F.creme}
          strokeWidth="5"
          strokeLinejoin="round"
        />
      </g>

      {/* Schlauch zum Gerät */}
      <path d="M350 408 C290 420 200 430 180 520" fill="none" stroke={F.linie} strokeWidth="22" strokeLinecap="round" />
      <path d="M350 408 C290 420 200 430 180 520" fill="none" stroke={F.petrolHell} strokeWidth="14" strokeLinecap="round" />
      {/* Luft strömt vom Gerät durch den Schlauch zur Maske. */}
      <Fluss d="M180 520 C200 430 290 420 350 408" farbe={F.kupferHell} breite={6} dauer={1.2} />
      <rect x="90" y="520" width="180" height="90" rx="20" {...KONTUR} fill={F.petrol} />
      <circle cx="140" cy="565" r="18" fill="none" stroke={F.leise} strokeWidth="4" />
      <path d="M180 552 L240 552 M180 578 L224 578" stroke={F.leise} strokeWidth="4" strokeLinecap="round" />
      <Etikett x={180} y={650} anker="middle">
        Gerät
      </Etikett>
      <Unterzeile x={180} y={680} anker="middle">
        leise, am Bett
      </Unterzeile>

      <Zeiger von={[220, 250]} nach={[358, 372]} />
      <Etikett x={40} y={220}>
        Maske
      </Etikett>
      <Unterzeile x={40} y={250}>
        über der Nase
      </Unterzeile>

      <Zeiger von={[470, 650]} nach={[576, 600]} />
      <Etikett x={690} y={680} anker="end" farbe={F.kupferHell}>
        Rachen bleibt offen
      </Etikett>
    </Zeichnung>
  );
}
