import { findeImpfung } from './daten';

/** Druckfassung einer Impfung für den Handzettel. */
export function Handzettel({ id }: { id: string }) {
  const impfung = findeImpfung(id);
  if (!impfung) return null;

  return (
    <>
      <h3>
        Impfung: {impfung.name}
        {impfung.zusatz && <small>{impfung.zusatz}</small>}
      </h3>
      <ul>
        {impfung.was.map((satz) => (
          <li key={satz}>{satz}</li>
        ))}
      </ul>
      <section>
        <h4>Impfschema</h4>
        <ul>
          {impfung.schema.map((schritt) => (
            <li key={`${schritt.wann}-${schritt.was}`}>
              <strong>{schritt.wann}:</strong> {schritt.was}
            </li>
          ))}
        </ul>
        {impfung.hinweis && <p>{impfung.hinweis}</p>}
      </section>
    </>
  );
}
