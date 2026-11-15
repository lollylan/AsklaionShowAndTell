import { Etikett, F, KONTUR, Pfeil, Unterzeile, Zeichnung, Zeiger } from '../../aufklaerungen/bilder/bausteine';

/** Fuß von der Seite, Ferse links, Zehen rechts. Oben offen (Unterschenkel läuft aus dem Bild). */
const FUSS =
  'M95 40 L95 160 C92 195 70 205 70 235 C70 266 96 280 132 280 L540 280 C582 280 616 276 630 262 C642 248 634 228 612 224 C580 218 545 212 510 202 C430 180 330 146 262 112 C225 94 205 70 205 40';

const SCHIENBEIN = 'M128 40 L128 132 C128 146 140 152 158 152 C176 152 188 146 188 132 L188 40';
const SPRUNGBEIN =
  'M130 158 C134 136 200 128 224 144 C242 156 248 174 238 186 C220 192 172 190 142 186 C130 180 127 168 130 158 Z';
const FERSENBEIN =
  'M92 210 C95 184 126 176 162 184 C192 190 220 194 240 202 C254 214 250 236 234 244 C212 252 182 254 152 255 C114 257 90 240 92 210 Z';
const FUSSWURZEL =
  'M238 152 C264 142 302 147 324 162 C332 177 328 197 314 204 C292 207 264 200 246 192 C234 182 232 164 238 152 Z';
const MITTELFUSS =
  'M322 172 C384 190 450 208 500 224 C522 230 530 250 516 258 C500 262 488 256 466 250 C416 236 360 218 314 202 Z';
const GRUNDGLIED =
  'M530 238 C548 232 568 232 580 237 C589 244 586 255 575 257 C560 259 546 259 532 257 C524 251 524 243 530 238 Z';
const ENDGLIED =
  'M590 239 C601 235 612 237 618 243 C622 251 616 257 606 258 L592 257 C585 251 585 245 590 239 Z';

/** Sehnenplatte der Fußsohle: vom Fersenbein bis unter die Zehenballen. */
const SEHNENPLATTE = 'M170 255 C240 263 330 265 430 263 C480 262 515 259 540 257';

function Fuss({ krank = false }: { krank?: boolean }) {
  return (
    <g>
      <path d={FUSS} {...KONTUR} fill={F.petrol} />
      <path d={SCHIENBEIN} {...KONTUR} fill={F.creme} />
      {[SPRUNGBEIN, FERSENBEIN, FUSSWURZEL, MITTELFUSS, GRUNDGLIED, ENDGLIED].map((d) => (
        <path key={d} d={d} {...KONTUR} fill={F.creme} />
      ))}
      <circle cx="512" cy="244" r="16" {...KONTUR} fill={F.creme} />

      <path d={SEHNENPLATTE} {...KONTUR} strokeWidth="16" />
      <path d={SEHNENPLATTE} {...KONTUR} stroke={F.petrolHell} strokeWidth="10" />

      {krank && (
        <>
          {/* gereizter, verdickter Ansatz am Fersenbein */}
          <path d="M166 255 C190 258 216 261 250 263" {...KONTUR} strokeWidth="24" />
          <path d="M166 255 C190 258 216 261 250 263" {...KONTUR} stroke={F.kupfer} strokeWidth="18" />
          {/* kleiner Knochensporn nach vorn */}
          <path d="M176 240 L250 252 L180 257 Z" fill={F.creme} stroke={F.kupferHell} strokeWidth="3" strokeLinejoin="round" />
        </>
      )}
    </g>
  );
}

/** Fuß zweimal von der Seite: oben gesund, unten mit gereiztem Ansatz der Sehnenplatte an der Ferse. */
export default function Plantarfasziitis() {
  return (
    <Zeichnung titel="Fuß zweimal von der Seite: oben gesund mit der Sehnenplatte der Fußsohle von der Ferse bis zu den Zehenballen, unten bei Plantarfasziitis mit verdicktem, gereiztem Ansatz am Fersenbein und kleinem Knochensporn">
      <g transform="translate(30 0)">
        <Fuss />
      </g>
      <g transform="translate(30 350)">
        <Fuss krank />
      </g>

      <Etikett x={690} y={110} anker="end">
        Gesund
      </Etikett>
      <Unterzeile x={690} y={142} anker="end">
        Sehnenplatte spannt das Gewölbe
      </Unterzeile>
      <Zeiger von={[390, 300]} nach={[390, 265]} />
      <Etikett x={390} y={328} anker="middle">
        Sehnenplatte der Fußsohle
      </Etikett>

      <Etikett x={690} y={460} anker="end" farbe={F.kupferHell}>
        Plantarfasziitis
      </Etikett>
      <Unterzeile x={690} y={492} anker="end">
        Ansatz an der Ferse gereizt
      </Unterzeile>

      <Pfeil d="M500 658 L262 658" farbe={F.kupferHell} breite={4} />
      <Unterzeile x={380} y={692} anker="middle">
        Zug bei jedem Schritt
      </Unterzeile>
      <Zeiger von={[100, 664]} nach={[276, 601]} />
      <Etikett x={30} y={692} farbe={F.kupferHell}>
        Fersensporn
      </Etikett>
    </Zeichnung>
  );
}
