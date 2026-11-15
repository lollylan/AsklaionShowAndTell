import { Etikett, F, KONTUR, Pfeil, Unterzeile, Zeichnung, Zeiger } from '../../aufklaerungen/bilder/bausteine';

/** Oberarmknochen von links, unten breit mit dem äußeren Knochenvorsprung oben. */
const OBERARM =
  'M20 130 L250 130 C274 130 290 114 310 100 C324 90 342 94 344 108 C350 120 352 134 352 150 C352 168 350 180 344 190 C338 204 320 206 308 196 C290 184 274 170 250 170 L20 170 Z';

/** Speiche (oben, Daumenseite) und Elle (unten). */
const SPEICHE =
  'M358 110 L382 110 L384 120 C400 124 420 124 440 124 L690 114 L690 146 L440 144 C420 144 400 140 384 140 L382 148 L358 148 Z';
const ELLE = 'M354 162 C354 152 366 152 374 156 L440 160 L690 154 L690 184 L440 182 L374 190 C362 196 354 186 354 162 Z';

/** Sehnenursprung am Knochenvorsprung und Muskelbauch der Strecker. */
const SEHNE = 'M334 100 C356 94 386 90 414 84 L414 104 C388 104 362 106 338 110 Z';
const SEHNE_DICK = 'M330 96 C354 84 386 80 414 78 L414 108 C388 110 362 114 336 116 Z';
const MUSKEL =
  'M410 84 C470 58 550 60 610 86 L690 100 L690 106 L610 106 C550 114 470 114 410 104 Z';

function Arm({ krank }: { krank: boolean }) {
  return (
    <>
      <path d={MUSKEL} {...KONTUR} fill={F.petrol} />
      <path d={ELLE} {...KONTUR} fill={F.creme} />
      <path d={SPEICHE} {...KONTUR} fill={F.creme} />
      <path d={OBERARM} {...KONTUR} fill={F.creme} />
      <path d={krank ? SEHNE_DICK : SEHNE} {...KONTUR} fill={krank ? F.kupfer : F.petrolHell} />
    </>
  );
}

/** Ellenbogen von vorn, Daumenseite oben: Strecker entspringen am äußeren Knochenvorsprung. */
export default function Tennisellenbogen() {
  return (
    <Zeichnung titel="Rechter Ellenbogen zweimal, Daumenseite oben: oben gesund, die Streckmuskeln des Unterarms setzen mit einer schlanken Sehne am äußeren Knochenvorsprung an; unten beim Tennisellenbogen ist dieser Sehnenansatz verdickt und gereizt, beim Greifen zieht der Muskel daran">
      {/* Gesund */}
      <g transform="translate(0 40)">
        <Arm krank={false} />
        <Zeiger von={[300, 50]} nach={[324, 94]} />
        <Etikett x={290} y={44} anker="end">
          Knochenvorsprung
        </Etikett>
        <Zeiger von={[560, 50]} nach={[560, 72]} />
        <Etikett x={560} y={40} anker="middle">
          Streckmuskeln
        </Etikett>
        <Etikett x={30} y={240}>
          Gesund
        </Etikett>
        <Unterzeile x={150} y={240}>
          Sehne sitzt fest und ruhig am Knochen
        </Unterzeile>
      </g>

      {/* Tennisellenbogen */}
      <g transform="translate(0 370)">
        <Arm krank />
        <path d="M312 82 L294 70 M322 66 L312 50 M340 62 L338 44" {...KONTUR} stroke={F.kupferHell} />
        <Pfeil d="M450 86 L566 86" farbe={F.linie} />
        <Zeiger von={[376, 40]} nach={[384, 86]} />
        <Etikett x={390} y={34} farbe={F.kupferHell}>
          Sehnenansatz gereizt
        </Etikett>
        <Etikett x={30} y={240} farbe={F.kupferHell}>
          Tennisellenbogen
        </Etikett>
        <Unterzeile x={292} y={240}>
          Schmerz beim Greifen und Heben
        </Unterzeile>
      </g>
    </Zeichnung>
  );
}
