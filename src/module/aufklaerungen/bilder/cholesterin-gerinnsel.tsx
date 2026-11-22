import { Etikett, F, Fluss, Folge, KONTUR, Pfeil, Unterzeile, Zeichnung, Zeiger } from './bausteine';

/** Schlagader im Längsschnitt: Wand oben und unten, dazwischen das Blut. */
function Ader({ oben }: { oben: number }) {
  return (
    <g>
      <rect x="40" y={oben} width="640" height="160" fill={F.tief} />
      <rect x="40" y={oben - 26} width="640" height="26" fill={F.petrolHell} />
      <rect x="40" y={oben + 160} width="640" height="26" fill={F.petrolHell} />
      <path d={`M40 ${oben - 26} L680 ${oben - 26} M40 ${oben} L680 ${oben}`} {...KONTUR} strokeWidth={3} />
      <path d={`M40 ${oben + 160} L680 ${oben + 160} M40 ${oben + 186} L680 ${oben + 186}`} {...KONTUR} strokeWidth={3} />
    </g>
  );
}

/** Wie aus einer Ablagerung ein Herzinfarkt wird: Sie reißt auf, ein Gerinnsel verschließt die Ader. */
export default function CholesterinGerinnsel() {
  const o1 = 130;
  const o2 = 400;
  return (
    <Zeichnung titel="Zwei Schlagadern im Längsschnitt. Oben eine Ablagerung in der Wand, an der das Blut noch vorbeifließt. Unten ist die Ablagerung aufgerissen, ein Gerinnsel verschließt die Ader – so entstehen Herzinfarkt und Schlaganfall">
      <Etikett x={40} y={74}>
        Ablagerung in der Aderwand
      </Etikett>
      <Ader oben={o1} />
      <path d={`M210 ${o1 + 160} Q360 ${o1 + 60} 510 ${o1 + 160} Z`} fill={F.kupfer} />
      <Pfeil d={`M70 ${o1 + 50} L640 ${o1 + 50}`} farbe={F.linie} breite={4} />
      <Fluss d={`M60 ${o1 + 20} L670 ${o1 + 20}`} farbe={F.petrolHell} breite={8} dauer={0.9} />
      <Fluss d={`M60 ${o1 + 82} L670 ${o1 + 82}`} farbe={F.petrolHell} breite={8} dauer={0.9} ab={0.45} />

      <Etikett x={40} y={344} farbe={F.kupferHell}>
        Sie reißt auf
      </Etikett>
      <Ader oben={o2} />
      <path d={`M210 ${o2 + 160} Q360 ${o2 + 60} 510 ${o2 + 160} Z`} fill={F.kupfer} />
      {/* Riss in der Kappe */}
      <Folge ab={1.4} von={0}>
        <path d={`M352 ${o2 + 112} L362 ${o2 + 134} L350 ${o2 + 150}`} fill="none" stroke={F.tief} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      </Folge>
      {/* Gerinnsel füllt die Ader */}
      <g className="cholesterin-gerinnsel-pfropf-form">
        <path
          d={`M300 ${o2} Q290 ${o2 + 60} 318 ${o2 + 112} Q360 ${o2 + 96} 404 ${o2 + 112} Q430 ${o2 + 60} 420 ${o2} Z`}
          fill={F.kupferHell}
        />
      </g>
      <Pfeil d={`M70 ${o2 + 50} L262 ${o2 + 50}`} farbe={F.linie} breite={4} />
      <Fluss d={`M60 ${o2 + 20} L284 ${o2 + 20}`} farbe={F.petrolHell} breite={8} dauer={1.6} />
      <Fluss d={`M60 ${o2 + 82} L282 ${o2 + 82}`} farbe={F.petrolHell} breite={8} dauer={1.6} ab={0.8} />

      <Folge ab={3.6} von={0}>
        <Etikett x={40} y={650}>
          Ein Gerinnsel verschließt die Ader
        </Etikett>
        <Unterzeile x={40} y={680}>
          Herzinfarkt oder Schlaganfall
        </Unterzeile>
        <Zeiger von={[480, 628]} nach={[400, 470]} />
      </Folge>
    </Zeichnung>
  );
}
