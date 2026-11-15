import './druck.css';
import { EVIDENZ, findeKrankheitsbild, findeUebung, uebungenVon, type Evidenz, type Uebung } from './daten';
import { UEBUNG } from './index';
import { findeZeichnung } from './bilder';
import { findeFigur } from './figuren';

const STUFEN: Evidenz[] = ['gut', 'moeglich', 'unklar', 'abraten'];

/** Eine Übung auf Papier: Bild links, Schritte rechts. Auch fürs Übungsblatt. */
export function DruckUebung({ uebung }: { uebung: Uebung }) {
  const Figur = findeFigur(uebung.id);
  return (
    <section className="druckuebung">
      <div className="druckuebung__figur">{Figur && <Figur />}</div>
      <div>
        <h4>{uebung.name}</h4>
        <p className="zettel__leise">{uebung.ziel}</p>
        <ol>
          <li>{uebung.ausgang}</li>
          {uebung.schritte.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ol>
        <p className="druckuebung__dosis">{uebung.dosis}</p>
        {uebung.achtung && <p className="zettel__leise">{uebung.achtung}</p>}
      </div>
    </section>
  );
}

/** Druckfassung für den Handzettel: Krankheitsbild mit Zeichnung, Behandlungen, Übungen – oder eine Übung. */
export function Handzettel({ id }: { id: string }) {
  if (id.startsWith(UEBUNG)) {
    const u = findeUebung(id.slice(UEBUNG.length));
    if (!u) return null;
    return (
      <>
        <h3>
          {u.name}
          <small>Übung</small>
        </h3>
        <DruckUebung uebung={u} />
      </>
    );
  }

  const bild = findeKrankheitsbild(id);
  if (!bild) return null;
  const Zeichnung = findeZeichnung(bild.id);

  return (
    <>
      <h3>
        {bild.name}
        {bild.zusatz && <small>{bild.zusatz}</small>}
      </h3>
      <div className="zettel__spalten" data-bild={Boolean(Zeichnung)}>
        {Zeichnung && (
          <div className="zettel__bild">
            <Zeichnung />
          </div>
        )}
        <div>
          <section>
            <h4>Was ist das?</h4>
            <ul>
              {bild.was.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </section>
          <section>
            <h4>Was hilft?</h4>
            <p>{bild.verlauf}</p>
            <dl className="druckhilft">
              {STUFEN.map((stufe) => {
                const liste = bild.therapien.filter((t) => t.evidenz === stufe);
                if (liste.length === 0) return null;
                return (
                  <div key={stufe} data-evidenz={stufe}>
                    <dt>{EVIDENZ[stufe].name}</dt>
                    <dd>
                      {liste.map((t) => (
                        <span key={t.name}>
                          <strong>{t.name}:</strong> {t.text}
                        </span>
                      ))}
                    </dd>
                  </div>
                );
              })}
            </dl>
          </section>
        </div>
      </div>

      <h4>Übungen für zu Hause</h4>
      {bild.alltag.length > 0 && (
        <ul>
          {bild.alltag.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      )}
      {uebungenVon(bild).map((u) => (
        <DruckUebung key={u.id} uebung={u} />
      ))}

      <p className="zettel__warnung">
        <strong>Warnzeichen.</strong> {bild.warnung}
      </p>
    </>
  );
}
