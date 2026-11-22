import { Etikett, F, Fluss, Pfeil, Unterzeile, Zeichnung } from './bausteine';
import { InhalierKopf, MUND, Spray, Wirkstoff } from './inhalieren';

const KOPF_X = 440;
const KOPF_Y = 170;
const S = 0.8;
const MUND_X = KOPF_X + MUND[0] * S;
const MUND_Y = KOPF_Y + MUND[1] * S;

/** Kammer der Inhalierhilfe: hinten weit, zum Mundstück hin schmaler. */
const KAMMER =
  `M180 ${MUND_Y - 72} C300 ${MUND_Y - 78} 380 ${MUND_Y - 52} 420 ${MUND_Y - 22} L420 ${MUND_Y + 22} ` +
  `C380 ${MUND_Y + 52} 300 ${MUND_Y + 78} 180 ${MUND_Y + 72} C150 ${MUND_Y + 70} 140 ${MUND_Y + 40} 140 ${MUND_Y} ` +
  `C140 ${MUND_Y - 40} 150 ${MUND_Y - 70} 180 ${MUND_Y - 72} Z`;

const WOLKE: [number, number][] = [
  [180, -30], [196, 14], [214, -46], [226, 34], [240, -8], [258, -40], [270, 22],
  [292, -14], [306, 30], [322, -30], [344, 6], [366, -14], [386, 12], [204, 44],
].map(([x, y]) => [x, MUND_Y + y] as [number, number]);

const LUNGE: [number, number][] = [
  [142, 434], [118, 470], [98, 452], [128, 506], [218, 434], [242, 470], [262, 452], [232, 506],
];

/** Kopf im Profil mit Inhalierhilfe vor dem Mund, das Spray steckt hinten in der Kammer. */
export default function InhalierenSpacer() {
  return (
    <Zeichnung titel="Ein Kopf von der Seite, die Lippen umschließen das Mundstück einer länglichen Inhalierhilfe; hinten steckt das Spray, in der Kammer schwebt der Sprühstoß und wird mit vier bis fünf ruhigen Atemzügen eingeatmet">
      {/* Mundstück zuerst, damit die Lippen davor liegen */}
      <rect x={430} y={MUND_Y - 14} width={MUND_X + 10 - 430} height={28} rx="8" fill={F.leise} stroke={F.linie} strokeWidth="4" />
      <g transform={`translate(${KOPF_X} ${KOPF_Y}) scale(${S})`}>
        <InhalierKopf rumpf>
          <Pfeil d="M96 222 C140 214 172 218 184 238 C194 256 184 300 181 380" farbe={F.kupferHell} breite={7} />
          <Fluss d="M70 224 L96 222 C140 214 172 218 184 238 C194 256 184 300 181 400" farbe={F.kupfer} breite={8} dauer={0.9} klasse="inhalieren-spacer-atem" />
          {/* Mit jedem Atemzug kommt mehr Wirkstoff in der Lunge an. */}
          <g className="inhalieren-spacer-lunge">
            <Wirkstoff punkte={LUNGE} />
          </g>
        </InhalierKopf>
      </g>

      <g transform="translate(20 0)">
        <path d={KAMMER} fill={F.tief} stroke={F.linie} strokeWidth="4" strokeLinejoin="round" />
        {/* Ein Sprühstoß füllt die Kammer, mit jedem Atemzug wird die Wolke dünner. */}
        <g className="inhalieren-spacer-wolke">
          <Wirkstoff punkte={WOLKE} r={8} />
        </g>
        <Fluss d={`M190 ${MUND_Y} L${MUND_X - 20} ${MUND_Y}`} farbe={F.kupfer} breite={8} dauer={0.9} klasse="inhalieren-spacer-atem" />
        <g className="inhalieren-spacer-druck">
          <Spray x={150} y={MUND_Y} />
        </g>
      </g>

      <Etikett x={98} y={MUND_Y - 200} anker="middle">
        Spray
      </Etikett>

      <Etikett x={290} y={MUND_Y + 128} anker="middle">
        Inhalierhilfe (Spacer)
      </Etikett>
      <Unterzeile x={290} y={MUND_Y + 160} anker="middle">
        mehr Wirkstoff in der Lunge
      </Unterzeile>

      <Etikett x={300} y={MUND_Y - 120} anker="middle" farbe={F.kupferHell}>
        4–5 ruhige Atemzüge
      </Etikett>

    </Zeichnung>
  );
}
