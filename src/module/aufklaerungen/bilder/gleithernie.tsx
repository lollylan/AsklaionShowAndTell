import { Etikett, F, KONTUR, Unterzeile, Zeichnung, Zeiger } from './bausteine';

/** Höhe des Zwerchfells in beiden Bildern. */
const ZF = 300;

/** Speiseröhre und Magen, Mittelpunkt der Speiseröhre bei x = 0; Mageneingang unter dem Zwerchfell. */
const GESUND =
  'M-22 80 L-22 350 C-40 420 -30 500 30 540 C90 580 150 540 140 470 ' +
  'C132 410 100 360 60 350 C45 346 30 345 22 340 L22 80 Z';

/** Wie GESUND, aber Mageneingang und oberer Magenteil sind durch die Lücke nach oben gerutscht. */
const HERNIE =
  'M-22 80 L-22 200 C-55 212 -62 270 -34 300 C-50 400 -30 500 30 540 ' +
  'C90 580 150 540 140 470 C132 410 100 340 34 300 C62 270 55 212 22 200 L22 80 Z';

function Zwerchfell({ luecke }: { luecke: number }) {
  // Zwei leicht gewölbte Muskelstreifen, dazwischen die Lücke für die Speiseröhre.
  const band = { fill: 'none', stroke: F.petrolHell, strokeWidth: 22, strokeLinecap: 'round' } as const;
  return (
    <g>
      <path d={`M-150 ${ZF + 26} Q${-80 - luecke} ${ZF - 6} ${-luecke - 10} ${ZF}`} {...band} />
      <path d={`M${luecke + 10} ${ZF} Q${90 + luecke} ${ZF - 6} 160 ${ZF + 26}`} {...band} />
    </g>
  );
}

/** Gesund und Gleithernie nebeneinander: Teil des Magens rutscht durch die Zwerchfelllücke in den Brustkorb. */
export default function Gleithernie() {
  return (
    <Zeichnung titel="Links gesund: der Magen liegt ganz unter dem Zwerchfell. Rechts Gleithernie: die Lücke im Zwerchfell ist weit, Mageneingang und oberer Magenteil sind nach oben in den Brustkorb gerutscht">
      <clipPath id="gleithernie-oben">
        <rect x="-200" y="203" width="400" height={ZF - 203} />
      </clipPath>

      <Etikett x={190} y={50} anker="middle">
        Gesund
      </Etikett>
      <Etikett x={530} y={50} anker="middle" farbe={F.kupferHell}>
        Gleithernie
      </Etikett>

      <g transform="translate(190 0)">
        <path d={GESUND} fill={F.petrol} />
        <path d={GESUND} {...KONTUR} />
        <Zwerchfell luecke={24} />
        <Etikett x={50} y={478} anker="middle">
          Magen
        </Etikett>
      </g>

      <g transform="translate(530 0)">
        <path d={HERNIE} fill={F.petrol} />
        <path d={HERNIE} fill={F.kupfer} clipPath="url(#gleithernie-oben)" />
        <path d={HERNIE} {...KONTUR} />
        <Zwerchfell luecke={36} />
        <Etikett x={50} y={478} anker="middle">
          Magen
        </Etikett>
      </g>

      {/* Speiseröhre benennen, oben links zwischen den Bildern */}
      <Zeiger von={[262, 132]} nach={[212, 132]} />
      <Etikett x={272} y={140}>
        Speiseröhre
      </Etikett>

      {/* Gerutschter Magenteil */}
      <Zeiger von={[606, 190]} nach={[572, 236]} />
      <Etikett x={700} y={160} anker="end" farbe={F.kupferHell}>
        Magenteil
      </Etikett>
      <Unterzeile x={700} y={190} anker="end">
        im Brustkorb
      </Unterzeile>

      <Unterzeile x={30} y={262}>
        Brustkorb
      </Unterzeile>
      <Unterzeile x={30} y={372}>
        Bauch
      </Unterzeile>

      <Zeiger von={[120, 612]} nach={[120, 326]} />
      <Etikett x={30} y={650}>
        Zwerchfell
      </Etikett>
    </Zeichnung>
  );
}
