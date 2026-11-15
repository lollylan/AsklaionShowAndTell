import { Etikett, F, KONTUR, Unterzeile, Zeichnung, Zeiger } from '../../aufklaerungen/bilder/bausteine';

/* Lendenwirbel von oben, Bauch oben, Rücken unten. Mitte bei x = 170. */
const KOERPER =
  'M80 70 C80 30 120 14 170 14 C220 14 260 30 260 70 C260 104 230 118 200 116 C186 114 178 110 170 110 C162 110 154 114 140 116 C110 118 80 104 80 70 Z';
/** Wirbelbogen mit Querfortsätzen und Dornfortsatz; das Loch in der Mitte ist der Wirbelkanal. */
const BOGEN =
  'M112 108 L104 138 L58 140 C30 142 26 164 44 168 L100 172 C94 184 98 198 108 204 L150 236 L158 286 C160 296 180 296 182 286 L190 236 L232 204 C242 198 246 184 240 172 L296 168 C314 164 310 142 282 140 L236 138 L228 108 Z ' +
  'M124 114 C118 140 122 170 136 184 C150 196 190 196 204 184 C218 170 222 140 216 114 Z';

/** Nervenfasern im Duralsack. */
const FASERN: [number, number][] = [
  [-14, -10], [0, -12], [14, -10], [-18, 4], [-4, 2], [10, 2], [20, 8], [-10, 16], [6, 16],
];

function Wirbel({ eng }: { eng: boolean }) {
  const s = eng ? 0.55 : 1;
  return (
    <g>
      <path d={BOGEN} {...KONTUR} fill={F.creme} fillRule="evenodd" />
      <path d={KOERPER} {...KONTUR} fill={F.creme} />

      {eng ? (
        <>
          {/* Bandscheibe wölbt sich von vorn, Gelenke und gelbe Bänder von hinten */}
          <path d="M128 112 C136 140 204 140 212 112 Z" {...KONTUR} fill={F.kupfer} />
          <path d="M128 160 C134 186 154 194 170 194 C186 194 206 186 212 160" {...KONTUR} strokeWidth="26" />
          <path d="M128 160 C134 186 154 194 170 194 C186 194 206 186 212 160" {...KONTUR} stroke={F.kupfer} strokeWidth="18" />
          <circle cx="126" cy="146" r="13" {...KONTUR} fill={F.kupfer} />
          <circle cx="214" cy="146" r="13" {...KONTUR} fill={F.kupfer} />
        </>
      ) : (
        <path d="M134 176 C148 190 192 190 206 176" {...KONTUR} stroke={F.petrolHell} strokeWidth="6" />
      )}

      <g transform={`translate(170 ${eng ? 156 : 150}) scale(${s} ${eng ? 0.5 : 1})`}>
        <ellipse cx="0" cy="2" rx="36" ry="30" fill={F.leise} stroke={F.linie} strokeWidth={eng ? 6 : 3} />
        {FASERN.map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="4" fill={F.petrolDunkel} />
        ))}
      </g>
    </g>
  );
}

/** Wirbel im Querschnitt: weiter Kanal gegenüber eingeengtem Kanal. */
export default function Spinalkanalstenose() {
  return (
    <Zeichnung titel="Ein Lendenwirbel zweimal von oben: oben gesund mit weitem Wirbelkanal, in dem die Nerven Platz haben; unten bei der Spinalkanalstenose engen eine vorgewölbte Bandscheibe, verdickte Wirbelgelenke und verdickte Bänder den Kanal ein, die Nerven sind zusammengedrückt">
      <g transform="translate(40 14)">
        <Wirbel eng={false} />
        <Etikett x={360} y={50}>
          Gesund
        </Etikett>
        <Unterzeile x={360} y={82}>
          Weiter Kanal für die Nerven
        </Unterzeile>
        <Zeiger von={[354, 136]} nach={[262, 74]} />
        <Etikett x={360} y={144}>
          Wirbelkörper
        </Etikett>
        <Zeiger von={[354, 214]} nach={[198, 160]} />
        <Etikett x={360} y={222}>
          Nerven
        </Etikett>
      </g>

      <g transform="translate(40 380)">
        <Wirbel eng />
        <Etikett x={360} y={50} farbe={F.kupferHell}>
          Spinalkanalstenose
        </Etikett>
        <Unterzeile x={360} y={82}>
          Kanal eingeengt
        </Unterzeile>
        <Zeiger von={[354, 130]} nach={[204, 120]} />
        <Etikett x={360} y={138}>
          Bandscheibe
        </Etikett>
        <Zeiger von={[354, 196]} nach={[224, 150]} />
        <Etikett x={360} y={204}>
          Gelenke verdickt
        </Etikett>
        <Zeiger von={[354, 262]} nach={[204, 184]} />
        <Etikett x={360} y={270}>
          Bänder verdickt
        </Etikett>
      </g>
    </Zeichnung>
  );
}
