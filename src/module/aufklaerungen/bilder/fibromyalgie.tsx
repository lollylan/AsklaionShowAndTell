import { Etikett, F, Unterzeile, Zeichnung, Zeiger } from './bausteine';
import { aufStrecke, Koerper, KOERPER_ARME, KOERPER_BEINE } from './polymyalgia-rheumatica';

/** Schmerzstellen auf dem Rumpf (werden auf den Rumpf beschnitten). */
const RUMPF_STELLEN: [number, number][] = [
  [196, 222],
  [304, 222],
  [218, 300],
  [282, 300],
  [208, 418],
  [292, 418],
];

/** Schmerzstellen auf Armen und Beinen als Anteil entlang der Strecke. */
const GLIED_STELLEN: [number, number][] = [
  ...[0.35, 0.78].flatMap((a) => KOERPER_ARME.map((s) => aufStrecke(s, a))),
  ...[0.4, 0.85].flatMap((a) => KOERPER_BEINE.map((s) => aufStrecke(s, a))),
];

/** Körper von vorn mit vielen Schmerzstellen auf beiden Seiten, am Kopf „lauter gestellt“. */
export default function Fibromyalgie() {
  const knie = aufStrecke(KOERPER_BEINE[1], 0.6);
  return (
    <Zeichnung titel="Körper von vorn mit vielen verteilten Schmerzstellen auf beiden Seiten, oben und unten; neben dem Kopf Bögen wie bei einem lauter gestellten Ton; die Gelenke sind gesund">
      <Koerper
        praefix="fibromyalgie"
        rumpf={
          <g fill={F.kupfer} fillOpacity="0.8">
            {RUMPF_STELLEN.map(([x, y]) => (
              <circle key={`${x}/${y}`} cx={x} cy={y} r="22" />
            ))}
          </g>
        }
        kopf={
          <g fill="none" stroke={F.kupferHell} strokeWidth="5" strokeLinecap="round">
            <path d="M304 89 A62 62 0 0 1 304 151" />
            <path d="M321 79 A82 82 0 0 1 321 161" />
          </g>
        }
        oben={
          <g>
            <g fill={F.kupfer} fillOpacity="0.8">
              <circle cx="250" cy="190" r="15" />
              {GLIED_STELLEN.map(([x, y]) => (
                <circle key={`${x}/${y}`} cx={x} cy={y} r="20" />
              ))}
            </g>
            {KOERPER_BEINE.map((s) => {
              const [x, y] = aufStrecke(s, 0.6);
              return <circle key={s[0]} cx={x} cy={y} r="17" fill="none" stroke={F.leise} strokeWidth="3" />;
            })}
          </g>
        }
      />

      <Zeiger von={[396, 112]} nach={[336, 120]} />
      <Etikett x={404} y={112} farbe={F.kupferHell}>
        Schmerz zu laut
      </Etikett>
      <Unterzeile x={404} y={144}>
        Nerven verstärken ihn
      </Unterzeile>

      <Zeiger von={[396, 300]} nach={[352, 306]} />
      <Etikett x={404} y={300} farbe={F.kupferHell}>
        Viele Stellen
      </Etikett>
      <Unterzeile x={404} y={332}>
        oben, unten, beidseits
      </Unterzeile>

      <Zeiger von={[396, 568]} nach={[knie[0] + 17, knie[1]]} />
      <Etikett x={404} y={568}>
        Gelenke gesund
      </Etikett>
      <Unterzeile x={404} y={600}>
        nicht entzündet
      </Unterzeile>
    </Zeichnung>
  );
}
