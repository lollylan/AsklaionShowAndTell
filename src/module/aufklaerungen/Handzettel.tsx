import { findeKrankheit, hinweisTitel, seitenVon } from './daten';
import { findeZeichnung } from './bilder';

/** Druckfassung einer Aufklärung für den Handzettel: Zeichnung, alle Seiten, Warnzeichen. */
export function Handzettel({ id }: { id: string }) {
  const krankheit = findeKrankheit(id);
  if (!krankheit) return null;
  const Bild = findeZeichnung(krankheit.id);

  return (
    <>
      <h3>
        {krankheit.name}
        {krankheit.zusatz && <small>{krankheit.zusatz}</small>}
      </h3>
      <div className="zettel__spalten" data-bild={Boolean(Bild)}>
        {Bild && (
          <div className="zettel__bild">
            <Bild />
          </div>
        )}
        <div>
          {seitenVon(krankheit)
            .filter((seite) => seite.art !== 'bild')
            .map((seite) => (
            <section key={seite.id}>
              <h4>{seite.titel}</h4>
              <ul>
                {seite.saetze.map((satz) => (
                  <li key={satz}>{satz}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
      {krankheit.warnung && (
        <p className="zettel__warnung">
          <strong>{hinweisTitel(krankheit)}</strong> {krankheit.warnung}
        </p>
      )}
    </>
  );
}
