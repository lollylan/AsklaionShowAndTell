import { Etikett, F, KONTUR, Unterzeile, Zeichnung, Zeiger } from '../../aufklaerungen/bilder/bausteine';

/** Unterschenkel und Fuß von der Seite, Zehen nach rechts, Wade links. Oben offen. */
const HAUT =
  'M40 0 C12 90 14 175 50 250 C62 290 58 340 52 380 C40 410 30 440 40 465 C48 485 70 492 100 492 L290 492 C312 492 322 480 318 466 C314 452 300 448 280 446 C240 440 220 420 200 395 C185 370 180 340 180 300 L180 0';
const SCHIENBEIN = 'M126 0 L128 330 C122 362 134 380 158 380 C176 380 182 362 170 336 L168 0';
const WADENMUSKEL = 'M44 6 C22 90 26 170 66 236 C80 258 92 266 98 268 C108 226 116 150 114 6 Z';
const SEHNE = 'M98 255 C94 320 86 372 80 430';
const SPRUNGBEIN = 'M118 392 C122 372 170 368 188 384 C196 396 192 410 180 414 L128 414 C118 410 116 400 118 392 Z';
const FERSENBEIN =
  'M58 434 C62 412 100 404 140 412 C165 416 180 422 190 432 C196 452 186 472 160 477 L90 480 C64 480 54 462 58 434 Z';
const MITTELFUSS = 'M190 404 C224 420 256 438 284 454 C298 462 294 476 280 475 C248 470 214 460 186 448 Z';

function Bein({ krank = false }: { krank?: boolean }) {
  return (
    <g>
      <path d={HAUT} {...KONTUR} fill={F.petrol} />
      <path d={SCHIENBEIN} {...KONTUR} fill={F.creme} />
      <path d={WADENMUSKEL} {...KONTUR} fill={F.petrolHell} />
      {[SPRUNGBEIN, FERSENBEIN, MITTELFUSS].map((d) => (
        <path key={d} d={d} {...KONTUR} fill={F.creme} />
      ))}
      <path d={SEHNE} {...KONTUR} strokeWidth="22" />
      <path d={SEHNE} {...KONTUR} stroke={F.creme} strokeWidth="14" />
      {krank && (
        <path
          d="M90 322 C113 342 111 388 84 410 C62 388 64 344 90 322 Z"
          fill={F.kupfer}
          stroke={F.kupferHell}
          strokeWidth="4"
          strokeLinejoin="round"
        />
      )}
    </g>
  );
}

/** Unterschenkel zweimal von der Seite: links gesunde Achillessehne, rechts spindelförmig verdickt. */
export default function Achillessehne() {
  return (
    <Zeichnung titel="Unterschenkel und Ferse zweimal von der Seite: links gesund mit schlanker Achillessehne vom Wadenmuskel zum Fersenbein, rechts mit spindelförmig verdickter Sehne einige Zentimeter über der Ferse">
      <g transform="translate(30 150) scale(0.85)">
        <Bein />
      </g>
      <g transform="translate(420 150) scale(0.85)">
        <Bein krank />
      </g>

      <Etikett x={150} y={66} anker="middle">
        Gesund
      </Etikett>
      <Unterzeile x={150} y={98} anker="middle">
        Sehne schlank und glatt
      </Unterzeile>
      <Etikett x={556} y={66} anker="middle" farbe={F.kupferHell}>
        Achillessehne gereizt
      </Etikett>
      <Unterzeile x={556} y={98} anker="middle">
        verdickt, 2–6 cm über der Ferse
      </Unterzeile>

      <Zeiger von={[392, 260]} nach={[450, 260]} />
      <Etikett x={382} y={269} anker="end">
        Wadenmuskel
      </Etikett>
      <Zeiger von={[412, 380]} nach={[498, 380]} />
      <Etikett x={402} y={389} anker="end">
        Achillessehne
      </Etikett>
      <Zeiger von={[432, 462]} nach={[492, 462]} />
      <Etikett x={422} y={471} anker="end" farbe={F.kupferHell}>
        verdickt
      </Etikett>

      <Zeiger von={[110, 640]} nach={[96, 548]} />
      <Etikett x={40} y={670}>
        Fersenbein
      </Etikett>
    </Zeichnung>
  );
}
