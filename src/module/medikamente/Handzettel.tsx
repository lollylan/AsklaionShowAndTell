import { findeMedikament } from './daten';

/** Druckfassung eines Medikaments für den Handzettel. */
export function Handzettel({ id }: { id: string }) {
  const m = findeMedikament(id);
  if (!m) return null;

  return (
    <>
      <h3>
        {m.name}
        <small>{m.zusatz}</small>
      </h3>
      <p className="zettel__leise">Handelsnamen zum Beispiel: {m.handelsnamen.join(', ')}</p>

      <section>
        <h4>Wofür ist es?</h4>
        <ul>
          {m.wofuer.map((satz) => (
            <li key={satz}>{satz}</li>
          ))}
        </ul>
      </section>

      <section>
        <h4>So nehmen Sie es</h4>
        <ul>
          {m.merker.map((merker) => (
            <li key={merker.titel}>
              <strong>{merker.titel}</strong>
              {merker.text && ` – ${merker.text}`}
            </li>
          ))}
          {m.einnahme.map((satz) => (
            <li key={satz}>{satz}</li>
          ))}
        </ul>
      </section>

      <section>
        <h4>Mögliche Nebenwirkungen</h4>
        <ul>
          {m.nebenwirkungen.map((n) => (
            <li key={n.name}>
              <strong>{n.name}.</strong> {n.text}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h4>Darauf achten</h4>
        <ul>
          {m.achtung.map((satz) => (
            <li key={satz}>{satz}</li>
          ))}
        </ul>
      </section>

      {m.warnung && (
        <p className="zettel__warnung">
          <strong>Warnzeichen.</strong> {m.warnung}
        </p>
      )}
    </>
  );
}
