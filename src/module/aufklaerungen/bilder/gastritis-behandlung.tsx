import { Etikett, F, KONTUR, Unterzeile, Zeichnung } from './bausteine';

const X = 100;

/** Ablauf, wenn Helicobacter gefunden wird: Test, Behandlung, warten, Kontrolle. */
export default function GastritisBehandlung() {
  return (
    <Zeichnung titel="Ablauf bei Helicobacter in vier Schritten: Test, dann 10 bis 14 Tage Säureblocker und Antibiotika, danach mindestens vier Wochen warten, dann ein neuer Test, ob der Keim weg ist">
      {/* Verbindungen: durchgezogen, das Warten gestrichelt */}
      <path d={`M${X} 110 L${X} 410`} {...KONTUR} stroke={F.leise} />
      <path
        d={`M${X} 410 L${X} 580`}
        fill="none"
        stroke={F.leise}
        strokeWidth="4"
        strokeDasharray="4 12"
        strokeLinecap="round"
      />

      {/* 1 Test: Röhrchen */}
      <circle cx={X} cy={110} r="38" {...KONTUR} fill={F.petrolDunkel} />
      <path d={`M${X - 9} 88 L${X - 9} 124 A9 9 0 0 0 ${X + 9} 124 L${X + 9} 88`} {...KONTUR} strokeWidth={3} />
      <path d={`M${X - 14} 88 L${X + 14} 88`} {...KONTUR} strokeWidth={3} />

      {/* 2 Tabletten */}
      <circle cx={X} cy={260} r="38" fill={F.kupfer} stroke={F.kupferHell} strokeWidth="4" />
      <g transform={`rotate(-35 ${X} 260)`}>
        <rect x={X - 22} y={250} width="44" height="20" rx="10" fill={F.linie} />
        <path d={`M${X} 250 L${X - 12} 250 A10 10 0 0 0 ${X - 12} 270 L${X} 270 Z`} fill={F.petrolHell} />
      </g>

      {/* 3 Warten: Uhr */}
      <circle cx={X} cy={410} r="38" {...KONTUR} fill={F.petrolDunkel} />
      <path d={`M${X} 410 L${X} 386 M${X} 410 L${X + 18} 420`} {...KONTUR} strokeWidth={3} />

      {/* 4 Kontrolle: Haken */}
      <circle cx={X} cy={580} r="38" {...KONTUR} fill={F.petrolHell} />
      <path d={`M${X - 16} 580 L${X - 4} 594 L${X + 18} 566`} {...KONTUR} strokeWidth={6} />

      <Etikett x={170} y={104}>
        Test auf Helicobacter
      </Etikett>
      <Unterzeile x={170} y={136}>
        Atem- oder Stuhltest, Magenspiegelung
      </Unterzeile>

      <Etikett x={170} y={254} farbe={F.kupferHell}>
        10 bis 14 Tage Tabletten
      </Etikett>
      <Unterzeile x={170} y={286}>
        Säureblocker und Antibiotika
      </Unterzeile>

      <Etikett x={170} y={404}>
        Mindestens 4 Wochen warten
      </Etikett>
      <Unterzeile x={170} y={436}>
        sonst ist der neue Test nicht sicher
      </Unterzeile>

      <Etikett x={170} y={574}>
        Neuer Test
      </Etikett>
      <Unterzeile x={170} y={606}>
        Ist der Keim weg?
      </Unterzeile>
    </Zeichnung>
  );
}
