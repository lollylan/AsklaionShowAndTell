import { useId } from "react";
import { datei } from "../../kern/pfad";
import {
  gespiegelt,
  mitSeite,
  seitig,
  type Manoever,
  type Ohr,
} from "./manoever";

/** Ein Ausschnitt der Manövergrafik, für das andere Ohr gespiegelt. */
export function ManoeverBild({
  manoever,
  ohr,
  ausschnitt,
  beschreibung,
}: {
  manoever: Manoever;
  ohr: Ohr;
  ausschnitt?: [number, number, number, number];
  beschreibung: string;
}) {
  const [fx, fy, fb, fh] = manoever.grafik.flaeche;
  const [x, y, b, h] = ausschnitt ?? manoever.grafik.flaeche;
  const spiegel = gespiegelt(manoever, ohr);
  // Ohne Zuschnitt zeigt das Bild bei anderem Seitenverhältnis Teile der Nachbarstellungen.
  const schnitt = useId();
  return (
    <svg
      className="manoeverbild"
      viewBox={`${x} ${y} ${b} ${h}`}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label={beschreibung}
    >
      <clipPath id={schnitt}>
        <rect x={x} y={y} width={b} height={h} />
      </clipPath>
      <g
        clipPath={`url(#${schnitt})`}
        transform={
          spiegel ? `translate(${2 * x + b} 0) scale(-1 1)` : undefined
        }
      >
        <image
          href={datei(
            `/bilder/aufklaerungen/manoever/${manoever.grafik.datei}`,
          )}
          x={fx}
          y={fy}
          width={fb}
          height={fh}
        />
      </g>
    </svg>
  );
}

/** Überschrift für die Seite: „für das rechte Ohr“ oder nichts, wenn es beidseitig ist. */
export function ohrZeile(m: Manoever, ohr: Ohr): string | null {
  return seitig(m)
    ? ohr === "rechts"
      ? "Betroffen: rechtes Ohr"
      : "Betroffen: linkes Ohr"
    : null;
}

/** Die Schritte als Karten nebeneinander – für die Bühne. */
export function ManoeverKarten({
  manoever,
  ohr,
}: {
  manoever: Manoever;
  ohr: Ohr;
}) {
  const zeile = ohrZeile(manoever, ohr);
  return (
    <div className="manoever" key={`${manoever.id}-${ohr}`}>
      <header className="manoever__kopf">
        <h3>{manoever.name}</h3>
        {zeile && <p className="manoever__ohr">{zeile}</p>}
        <p className="manoever__wofuer">{manoever.wofuer}</p>
      </header>
      {manoever.ganz ? (
        <div className="manoever__ganz">
          <div className="manoever__gesamtbild">
            <ManoeverBild
              manoever={manoever}
              ohr={ohr}
              beschreibung={manoever.name}
            />
          </div>
          <ol className="manoever__liste">
            {manoever.schritte.map((s, i) => (
              <li key={s.text} style={{ animationDelay: `${120 + i * 110}ms` }}>
                <span className="manoever__nr" aria-hidden="true">
                  {i + 1}
                </span>
                <div>
                  <p>{mitSeite(s.text, ohr)}</p>
                  {s.halten && (
                    <p className="manoeverkarte__halten">{s.halten}</p>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      ) : (
        <ol
          className="manoever__schritte"
          style={{
            gridTemplateColumns: `repeat(${manoever.schritte.length}, minmax(0, 1fr))`,
          }}
        >
          {manoever.schritte.map((s, i) => (
            <li
              key={s.text}
              className="manoeverkarte"
              style={{ animationDelay: `${120 + i * 110}ms` }}
            >
              <div className="manoeverkarte__bild">
                {s.ausschnitt ? (
                  <ManoeverBild
                    manoever={manoever}
                    ohr={ohr}
                    ausschnitt={s.ausschnitt}
                    beschreibung={`Schritt ${i + 1}`}
                  />
                ) : (
                  <span className="manoeverkarte__ohnebild" aria-hidden="true">
                    {i + 1}
                  </span>
                )}
              </div>
              <p className="manoeverkarte__nr">Schritt {i + 1}</p>
              <p className="manoeverkarte__text">{mitSeite(s.text, ohr)}</p>
              {s.halten && <p className="manoeverkarte__halten">{s.halten}</p>}
            </li>
          ))}
        </ol>
      )}
      <p className="manoever__wiederholen">
        <strong>Wie oft:</strong> {manoever.wiederholen}
      </p>
      <p className="manoever__quelle">
        Grafik: {quellenzeile(manoever)}
      </p>
    </div>
  );
}

/** „C mamais, CC BY-SA 3.0, umgefärbt, Wikimedia Commons“ oder „Eigene Zeichnung“. */
export function quellenzeile(m: Manoever): string {
  const g = m.grafik;
  return g.quelle ? `${g.urheber}, ${g.lizenz}, Wikimedia Commons` : g.urheber;
}
