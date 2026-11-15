import { useId } from 'react';
import { LINIEN, TEILE, type Ansicht, type Gebiet, type Karte, type Seite, type Teil } from './koerper';

/** Kräftige Farben für ausgewählte Gebiete, in der Reihenfolge der Auswahl. */
export const WAHLFARBEN = ['#f08a4b', '#ffd166', '#6fd3c4', '#f27ba0', '#a6dc74', '#b9a2f5', '#7cc4f5'];

const KOERPER = '#1a5867';
const UMRISS = '#8fbcc6';

const ANSICHTEN: { ansicht: Ansicht; cx: number; titel: string }[] = [
  { ansicht: 'vorn', cx: 250, titel: 'Von vorn' },
  { ansicht: 'hinten', cx: 750, titel: 'Von hinten' },
];

const TEIL_NAMEN: Teil[] = ['bein', 'rumpf', 'arm', 'kopf'];

/** Die rechte Körperseite liegt von vorn gesehen links im Bild, von hinten rechts. */
function spiegel(ansicht: Ansicht, seite: 'rechts' | 'links'): 1 | -1 {
  return (ansicht === 'vorn') === (seite === 'rechts') ? -1 : 1;
}

/** Farbe für „alle zeigen“: Nachbarn in einer Gruppe wechseln den Ton. */
export function grundfarbe(karte: Karte, gebiet: Gebiet): string {
  const gruppe = karte.gruppen.find((g) => g.id === gebiet.gruppe);
  if (!gruppe) return '#888';
  const nr = karte.gebiete.filter((g) => g.gruppe === gebiet.gruppe).indexOf(gebiet);
  return gruppe.toene[nr % gruppe.toene.length];
}

export function wahlfarbe(gewaehlt: string[], id: string): string | undefined {
  const i = gewaehlt.indexOf(id);
  return i < 0 ? undefined : WAHLFARBEN[i % WAHLFARBEN.length];
}

interface Props {
  karte: Karte;
  gewaehlt: string[];
  seite: Seite;
  /** Alle Gebiete farbig zeigen (ausgewählte kräftig, die übrigen blasser). */
  alle: boolean;
  /** Klick auf ein Gebiet (nur in der Steuerung). */
  beiKlick?: (id: string) => void;
  /** Kleine Vorschau: Beschriftung nur für ausgewählte Gebiete. */
  klein?: boolean;
}

export function Koerperkarte({ karte, gewaehlt, seite, alle, beiKlick, klein }: Props) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const clip = (ansicht: Ansicht, teil: Teil) => `url(#${uid}-${ansicht}-${teil})`;
  const hatWahl = gewaehlt.length > 0;

  const seitenFuer = (gebiet: Gebiet): ('rechts' | 'links')[] => {
    if (!gewaehlt.includes(gebiet.id) || seite === 'beide') return ['rechts', 'links'];
    return [seite];
  };

  const fuellung = (gebiet: Gebiet, s: 'rechts' | 'links'): { farbe: string; deckung: number } | null => {
    const stark = wahlfarbe(gewaehlt, gebiet.id);
    if (stark && (seite === 'beide' || seite === s)) return { farbe: stark, deckung: 1 };
    if (alle) return { farbe: grundfarbe(karte, gebiet), deckung: hatWahl ? 0.32 : 0.92 };
    return null;
  };

  // Beschriftung: ausgewählte Gebiete, sonst (bei „alle“) jedes Gebiet – auf einer Seite.
  const beschriftet = hatWahl
    ? karte.gebiete.filter((g) => gewaehlt.includes(g.id))
    : alle && !klein && karte.alleBeschriften
      ? karte.gebiete
      : [];
  const labelSeite: 'rechts' | 'links' = seite === 'links' ? 'links' : 'rechts';

  return (
    <svg
      className="hautkarte"
      viewBox="0 -70 1000 1120"
      role="img"
      aria-label={`${karte.name}, Körper von vorn und von hinten`}
      data-bedienbar={beiKlick ? 'true' : undefined}
    >
      <defs>
        {ANSICHTEN.map(({ ansicht }) =>
          TEIL_NAMEN.map((teil) => (
            <clipPath key={`${ansicht}-${teil}`} id={`${uid}-${ansicht}-${teil}`}>
              {TEILE[ansicht][teil].map((d, i) => (
                <path key={i} d={d} />
              ))}
            </clipPath>
          )),
        )}
      </defs>

      {ANSICHTEN.map(({ ansicht, cx, titel }) => (
        <g key={ansicht} transform={`translate(${cx} 0)`}>
          <text className="hautkarte__titel" x={0} y={-34} textAnchor="middle">
            {titel}
          </text>

          {/* Umriss: erst alle Teile dick umrandet, dann darüber gefüllt – so bleibt nur der Außenrand. */}
          {(['rechts', 'links'] as const).map((s) => (
            <g key={`rand-${s}`} transform={`scale(${spiegel(ansicht, s)} 1)`}>
              {TEIL_NAMEN.flatMap((teil) =>
                TEILE[ansicht][teil].map((d, i) => (
                  <path key={`${teil}-${i}`} d={d} fill="none" stroke={UMRISS} strokeWidth={5} strokeLinejoin="round" />
                )),
              )}
            </g>
          ))}
          {(['rechts', 'links'] as const).map((s) => (
            <g key={`flaeche-${s}`} transform={`scale(${spiegel(ansicht, s)} 1)`}>
              {TEIL_NAMEN.flatMap((teil) =>
                TEILE[ansicht][teil].map((d, i) => <path key={`${teil}-${i}`} d={d} fill={KOERPER} />),
              )}
            </g>
          ))}

          {/* Gebiete */}
          {(['rechts', 'links'] as const).map((s) => (
            <g key={`gebiete-${s}`} transform={`scale(${spiegel(ansicht, s)} 1)`}>
              {karte.gebiete.map((gebiet) => {
                const flaechen = gebiet[ansicht];
                if (!flaechen) return null;
                const f = fuellung(gebiet, s);
                if (!f && !beiKlick) return null;
                return (
                  <g
                    key={gebiet.id}
                    className="hautkarte__gebiet"
                    data-gewaehlt={gewaehlt.includes(gebiet.id) && seitenFuer(gebiet).includes(s)}
                    onClick={beiKlick ? () => beiKlick(gebiet.id) : undefined}
                  >
                    {beiKlick && <title>{`${gebiet.name} – ${gebiet.fach}`}</title>}
                    {flaechen.map((fl, i) => (
                      <path
                        key={i}
                        d={fl.d}
                        clipPath={clip(ansicht, fl.teil)}
                        fillRule="evenodd"
                        fill={f ? f.farbe : 'rgba(0,0,0,0)'}
                        fillOpacity={f ? f.deckung : 1}
                      />
                    ))}
                  </g>
                );
              })}
            </g>
          ))}

          {/* Feine Grenzlinien aller Gebiete und Orientierungslinien (Finger, Zehen) */}
          {(['rechts', 'links'] as const).map((s) => (
            <g
              key={`linien-${s}`}
              transform={`scale(${spiegel(ansicht, s)} 1)`}
              className="hautkarte__linien"
              pointerEvents="none"
            >
              {karte.gebiete.flatMap((gebiet) =>
                (gebiet[ansicht] ?? []).map((fl, i) => (
                  <path
                    key={`${gebiet.id}-${i}`}
                    d={fl.d}
                    clipPath={clip(ansicht, fl.teil)}
                    fill="none"
                    stroke="#eef6f7"
                    strokeOpacity={0.16}
                    strokeWidth={1}
                  />
                )),
              )}
              <path d={LINIEN[ansicht]} fill="none" stroke={UMRISS} strokeOpacity={0.6} strokeWidth={1.4} />
            </g>
          ))}

          {/* Beschriftung, nicht gespiegelt */}
          <g pointerEvents="none">
            {beschriftet.map((gebiet) => {
              const punkt = gebiet.marke?.[ansicht];
              if (!punkt || !gebiet[ansicht]) return null;
              const sx = spiegel(ansicht, labelSeite);
              const schild = gebiet.schild?.[ansicht];
              const [lx, ly] = schild ?? punkt;
              return (
                <g key={gebiet.id}>
                  {schild && (
                    <>
                      <line
                        className="hautkarte__leine"
                        x1={sx * punkt[0]}
                        y1={punkt[1]}
                        x2={sx * lx}
                        y2={ly}
                      />
                      <circle className="hautkarte__leine-punkt" cx={sx * punkt[0]} cy={punkt[1]} r={3.5} />
                    </>
                  )}
                  <text
                    className="hautkarte__marke"
                    data-stark={hatWahl}
                    x={sx * lx}
                    y={ly}
                    // Seitlich abgesetzte Schilder laufen zur Körpermitte hin, nicht in die Nachbarfigur.
                    textAnchor={schild && Math.abs(lx) > 150 ? (sx * lx > 0 ? 'end' : 'start') : 'middle'}
                    dominantBaseline="middle"
                  >
                    {gebiet.kurz ?? gebiet.name}
                  </text>
                </g>
              );
            })}
          </g>

          <text className="hautkarte__seite" x={-150} y={1035} textAnchor="middle">
            {ansicht === 'vorn' ? 'rechts' : 'links'}
          </text>
          <text className="hautkarte__seite" x={150} y={1035} textAnchor="middle">
            {ansicht === 'vorn' ? 'links' : 'rechts'}
          </text>
        </g>
      ))}
    </svg>
  );
}
