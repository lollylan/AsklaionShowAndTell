import './korrektur.css';
import { GEBIETE, KRANKHEITEN, bildgebungVon, hinweisTitel, seitenVon } from './daten';
import { findeManoever, mitSeite } from './manoever';
import { findeZeichnung } from './bilder';
import { datei } from '../../kern/pfad';

/** Alle Aufklärungen untereinander – zum Gegenlesen von Text und Zeichnung (/korrektur). */
export function Korrektur() {
  return (
    <main className="korrektur">
      <header>
        <h1>Aufklärungen zum Gegenlesen</h1>
        <p>
          {KRANKHEITEN.length} Krankheiten und Beschwerden mit Zeichnung und allen Seiten. Die Texte stehen in{' '}
          <code>src/module/aufklaerungen/daten/</code>, die Zeichnungen in{' '}
          <code>src/module/aufklaerungen/bilder/</code>.
        </p>
        <nav aria-label="Krankheiten">
          {KRANKHEITEN.map((k) => (
            <a key={k.id} href={`#${k.id}`}>
              {k.name}
            </a>
          ))}
        </nav>
      </header>

      {KRANKHEITEN.map((k) => {
        const Bild = findeZeichnung(k.id);
        const seiten = seitenVon(k);
        return (
          <article key={k.id} id={k.id}>
            <div className="korrektur__bild">
              {Bild ? <Bild /> : <p>Noch keine Zeichnung</p>}
            </div>
            <div className="korrektur__text">
              <h2>{k.name}</h2>
              <p className="korrektur__zusatz">
                {[k.zusatz, GEBIETE.find((g) => g.id === k.gebiet)?.name]
                  .filter(Boolean)
                  .join(' · ')}
              </p>
              <div className="korrektur__seiten">
                {seiten.map((s, i) => {
                  const Seitenbild = s.bild && s.bild !== k.id ? findeZeichnung(s.bild) : undefined;
                  return (
                  <section key={s.id}>
                    <h3>{s.titel}</h3>
                    {s.art === 'bild' && (
                      <div className="korrektur__aufnahmen">
                        {bildgebungVon(k.id)?.aufnahmen.map((a) => (
                          <figure key={a.datei}>
                            <img src={datei(`/bilder/aufklaerungen/${a.datei}`)} alt="" />
                            <figcaption>
                              <strong>
                                {a.titel} ({a.art})
                              </strong>
                              {a.marken?.length ? ` · Marken: ${a.marken.map((m) => m.text).join(', ')}` : ''}
                              {' · '}
                              <a href={a.quelle} target="_blank" rel="noreferrer">
                                {a.urheber}, {a.lizenz}
                              </a>
                            </figcaption>
                          </figure>
                        ))}
                      </div>
                    )}
                    {Seitenbild && (
                      <div className="korrektur__seitenbild">
                        <Seitenbild />
                      </div>
                    )}
                    <ul>
                      {s.saetze.map((satz) => (
                        <li key={satz}>{satz}</li>
                      ))}
                    </ul>
                    {s.manoever && <ManoeverText id={s.manoever} />}
                    {i === seiten.length - 1 && k.warnung && (
                      <p className="korrektur__warnung">
                        <strong>{hinweisTitel(k)}</strong> {k.warnung}
                      </p>
                    )}
                  </section>
                  );
                })}
              </div>
            </div>
          </article>
        );
      })}
    </main>
  );
}

/** Befreiungsmanöver zum Gegenlesen, für das rechte Ohr. */
function ManoeverText({ id }: { id: string }) {
  const m = findeManoever(id);
  if (!m) return null;
  return (
    <>
      <p>{m.wofuer} (Text für das rechte Ohr)</p>
      <ol>
        {m.schritte.map((schritt) => (
          <li key={schritt.text}>
            {mitSeite(schritt.text, 'rechts')}
            {schritt.halten && ` – ${schritt.halten}`}
          </li>
        ))}
      </ol>
      <p>
        <strong>Wie oft:</strong> {m.wiederholen} {m.hinweis}
      </p>
    </>
  );
}
