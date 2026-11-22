import { Etikett, F, KONTUR, Unterzeile, Zeichnung } from './bausteine';

const ACHSE = 330;

/** Klammer über bzw. unter der Zeitachse mit Beschriftung in der Mitte. */
function Klammer({ von, bis, y, text }: { von: number; bis: number; y: number; text: string }) {
  const r = y < ACHSE ? 14 : -14;
  return (
    <g>
      <path d={`M${von} ${y + r} L${von} ${y} L${bis} ${y} L${bis} ${y + r}`} {...KONTUR} stroke={F.leise} strokeWidth={3} />
      <Etikett x={(von + bis) / 2} y={y < ACHSE ? y - 14 : y + 34} anker="middle">
        {text}
      </Etikett>
    </g>
  );
}

/** Einnahme der Schilddrüsentablette: nüchtern, eine halbe Stunde vor dem Frühstück, Abstand zu Eisen und Kalzium. */
export default function SchilddruesenunterfunktionEinnahme() {
  return (
    <Zeichnung titel="Zeitstrahl für den Morgen: zuerst die Schilddrüsentablette nüchtern mit Wasser, eine halbe Stunde später das Frühstück, Eisen-, Kalzium- und Magnesiumpräparate erst mindestens zwei Stunden nach der Tablette">
      <Etikett x={40} y={66}>
        Am Morgen
      </Etikett>
      <Unterzeile x={40} y={96}>
        Die Tablette braucht einen leeren Magen
      </Unterzeile>

      {/* Zeitachse */}
      <path d={`M60 ${ACHSE} L680 ${ACHSE}`} {...KONTUR} stroke={F.leise} />

      {/* Tablette mit Wasserglas */}
      <g transform={`translate(110 ${ACHSE - 60}) rotate(-30)`}>
        <rect x="-30" y="-14" width="60" height="28" rx="14" {...KONTUR} strokeWidth={3} fill={F.kupfer} />
      </g>
      <path d={`M146 ${ACHSE - 92} L152 ${ACHSE - 22} L184 ${ACHSE - 22} L190 ${ACHSE - 92} Z`} {...KONTUR} strokeWidth={3} />
      <path d={`M150 ${ACHSE - 62} L186 ${ACHSE - 62}`} stroke={F.petrolHell} strokeWidth="3" />
      <circle cx="130" cy={ACHSE} r="10" fill={F.kupfer} />

      {/* Frühstück */}
      <ellipse cx="300" cy={ACHSE - 48} rx="46" ry="14" {...KONTUR} strokeWidth={3} fill={F.petrol} />
      <path d={`M276 ${ACHSE - 62} Q300 ${ACHSE - 96} 324 ${ACHSE - 62}`} {...KONTUR} strokeWidth={3} fill={F.petrolHell} />
      <circle cx="300" cy={ACHSE} r="10" fill={F.linie} />

      {/* Eisen, Kalzium, Magnesium */}
      <circle cx="584" cy={ACHSE - 52} r="20" {...KONTUR} strokeWidth={3} fill={F.petrolHell} />
      <circle cx="630" cy={ACHSE - 52} r="20" {...KONTUR} strokeWidth={3} fill={F.petrolHell} />
      <circle cx="608" cy={ACHSE} r="10" fill={F.linie} />

      <Klammer von={130} bis={300} y={ACHSE - 130} text="½ Stunde" />
      <Klammer von={130} bis={608} y={ACHSE + 60} text="mindestens 2 Stunden" />

      <Etikett x={40} y={500} farbe={F.kupferHell}>
        Tablette
      </Etikett>
      <Unterzeile x={40} y={528}>
        nüchtern, mit Wasser
      </Unterzeile>
      <Etikett x={300} y={500}>
        Frühstück
      </Etikett>
      <Unterzeile x={300} y={528}>
        auch Kaffee
      </Unterzeile>
      <Etikett x={680} y={500} anker="end">
        Eisen, Kalzium
      </Etikett>
      <Unterzeile x={680} y={528} anker="end">
        oder Magnesium
      </Unterzeile>

      <Unterzeile x={40} y={640}>
        Jeden Tag gleich – dann wirkt die Dosis verlässlich
      </Unterzeile>
    </Zeichnung>
  );
}
