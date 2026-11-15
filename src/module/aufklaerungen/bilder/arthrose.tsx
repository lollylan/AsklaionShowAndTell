import { Etikett, F, KONTUR, Unterzeile, Zeichnung, Zeiger } from './bausteine';

const OBERSCHENKEL =
  'M100 0 L100 110 C100 160 30 160 30 210 C30 255 250 255 250 210 C250 160 180 160 180 110 L180 0 Z';

/** Gelenk von vorn: oben Oberschenkelknochen, unten Schienbein, dazwischen Knorpel und Gelenkspalt. */
export default function Arthrose() {
  return (
    <Zeichnung titel="Ein Gelenk zweimal von vorn: links gesund mit dicker glatter Knorpelschicht und weitem Gelenkspalt, rechts bei Arthrose mit abgenutztem Knorpel, engem Spalt und Knochenzacken">
      {/* Gesund */}
      <g transform="translate(50 124)">
        <path d={OBERSCHENKEL} {...KONTUR} fill={F.creme} />
        <path
          d="M40 320 C40 306 240 306 240 320 C240 376 180 376 180 436 L180 460 L100 460 L100 436 C100 376 40 376 40 320 Z"
          {...KONTUR}
          fill={F.creme}
        />
        <path d="M32 222 C34 268 246 268 248 222" {...KONTUR} strokeWidth="22" />
        <path d="M32 222 C34 268 246 268 248 222" {...KONTUR} stroke={F.petrolHell} strokeWidth="16" />
        <path d="M42 310 C44 294 236 294 238 310" {...KONTUR} strokeWidth="22" />
        <path d="M42 310 C44 294 236 294 238 310" {...KONTUR} stroke={F.petrolHell} strokeWidth="16" />
      </g>

      {/* Arthrose: Schienbein sitzt höher, der Spalt ist fast weg */}
      <g transform="translate(384 124)">
        <path d={OBERSCHENKEL} {...KONTUR} fill={F.creme} />
        <path
          d="M40 278 C40 264 240 264 240 278 C240 334 180 334 180 394 L180 460 L100 460 L100 394 C100 334 40 334 40 278 Z"
          {...KONTUR}
          fill={F.creme}
        />
        {/* Knochenzacken am Gelenkrand */}
        <path d="M34 190 C16 196 6 210 12 220 C20 224 30 226 37 232 Z" {...KONTUR} fill={F.creme} stroke={F.kupfer} />
        <path d="M246 190 C264 196 274 210 268 220 C260 224 250 226 243 232 Z" {...KONTUR} fill={F.creme} stroke={F.kupfer} />
        {/* Knorpelreste: dünn und lückenhaft */}
        <path
          d="M32 216 C34 262 246 262 248 216"
          {...KONTUR}
          stroke={F.kupfer}
          strokeWidth="7"
          strokeDasharray="30 18"
        />
        <path
          d="M42 270 C44 258 236 258 238 270"
          {...KONTUR}
          stroke={F.kupfer}
          strokeWidth="7"
          strokeDasharray="30 18"
        />
      </g>

      <Etikett x={190} y={66} anker="middle">
        Gesund
      </Etikett>
      <Unterzeile x={190} y={98} anker="middle">
        Glatter Knorpel schützt
      </Unterzeile>
      <Etikett x={524} y={66} anker="middle" farbe={F.kupferHell}>
        Arthrose
      </Etikett>
      <Unterzeile x={524} y={98} anker="middle">
        Knochen reibt auf Knochen
      </Unterzeile>

      {/* Zeiger laufen außen an den Knochen vorbei */}
      <Zeiger von={[58, 604]} nach={[80, 350]} />
      <Etikett x={40} y={640}>
        Knorpel
      </Etikett>
      <Zeiger von={[676, 604]} nach={[628, 392]} />
      <Etikett x={690} y={640} anker="end">
        Knorpel abgenutzt
      </Etikett>
    </Zeichnung>
  );
}
