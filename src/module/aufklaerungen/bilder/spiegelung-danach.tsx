import { Etikett, F, Folge, KONTUR, Unterzeile, Zeichnung } from './bausteine';

/** Nach einer Spiegelung über den Mund oder die Nase: erst trinken, wenn der Hals fühlt; nicht fahren; abholen lassen. */
export default function SpiegelungDanach() {
  return (
    <Zeichnung titel="Drei Regeln nach der Spiegelung: ein Glas Wasser und eine Uhr – erst nach ein bis zwei Stunden einen kleinen Schluck probieren; ein durchgestrichenes Auto – bis zum nächsten Tag nicht fahren; zwei Menschen – sich abholen lassen">
      {/* 1. Erst trinken, wenn der Hals wieder fühlt */}
      <Folge ab={0.4} von={0}>
        <g transform="translate(70 60)">
          <path d="M20 30 L30 150 L90 150 L100 30 Z" {...KONTUR} fill={F.petrolDunkel} />
          <path d="M26 80 L32 146 L88 146 L94 80 Z" fill={F.petrolHell} />
          <circle cx="150" cy="80" r="40" {...KONTUR} fill={F.petrolDunkel} />
          <path d="M150 80 L150 52" stroke={F.linie} strokeWidth="5" strokeLinecap="round" />
          <path className="spiegelung-danach-zeiger" d="M150 80 L172 92" stroke={F.kupferHell} strokeWidth="5" strokeLinecap="round" />
          <circle cx="150" cy="80" r="5" fill={F.linie} />
        </g>
        <Etikett x={290} y={110}>
          Erst trinken, wenn der
        </Etikett>
        <Etikett x={290} y={142}>
          Hals wieder fühlt
        </Etikett>
        <Unterzeile x={290} y={176}>
          nach 1–2 Std., kleiner Schluck zuerst
        </Unterzeile>
      </Folge>

      {/* 2. Nicht fahren */}
      <Folge ab={1.8} von={0}>
        <g transform="translate(60 290)">
          <path
            d="M10 90 L10 60 Q12 46 30 44 L52 14 Q58 6 70 6 L140 6 Q152 6 158 14 L184 44 Q206 46 210 62 L210 90 Z"
            {...KONTUR}
            fill={F.petrolDunkel}
          />
          <path d="M62 20 L56 44 L104 44 L104 20 Z M116 20 L116 44 L166 44 L150 20 Z" fill={F.petrolHell} />
          <circle cx="54" cy="94" r="20" {...KONTUR} fill={F.tief} />
          <circle cx="166" cy="94" r="20" {...KONTUR} fill={F.tief} />
          <path d="M0 -10 L220 130" stroke={F.kupfer} strokeWidth="10" strokeLinecap="round" />
        </g>
        <Etikett x={310} y={348}>
          Bis morgen nicht fahren
        </Etikett>
        <Unterzeile x={310} y={382}>
          nach der Schlafspritze
        </Unterzeile>
      </Folge>

      {/* 3. Abholen lassen */}
      <Folge ab={3.2} von={0}>
        <g transform="translate(70 500)">
          <circle cx="50" cy="30" r="24" {...KONTUR} fill={F.petrolHell} />
          <path d="M10 150 L10 100 Q10 64 50 64 Q90 64 90 100 L90 150" {...KONTUR} fill={F.petrolHell} />
          <circle cx="150" cy="38" r="22" {...KONTUR} fill={F.petrol} />
          <path d="M112 150 L112 104 Q112 70 150 70 Q188 70 188 104 L188 150" {...KONTUR} fill={F.petrol} />
          <path d="M84 110 Q100 120 118 112" {...KONTUR} />
        </g>
        <Etikett x={310} y={560}>
          Abholen lassen
        </Etikett>
        <Unterzeile x={310} y={594}>
          nichts Wichtiges unterschreiben
        </Unterzeile>
      </Folge>
    </Zeichnung>
  );
}
