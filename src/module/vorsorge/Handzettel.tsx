import './handzettel.css';
import { altersText, findeUntersuchung } from './daten';

/** Druckfassung einer Untersuchung. Schrift, Farben und Rahmen kommen vom Handzettel. */
export function Handzettel({ id }: { id: string }) {
  const untersuchung = findeUntersuchung(id.split('@')[0]);
  if (!untersuchung) return null;

  const wieOft = untersuchung.stufen
    .map(
      (s) =>
        `${altersText(s)}: ${s.intervall}` +
        (s.intervallHausarztmodell ? `, im Hausarztmodell ${s.intervallHausarztmodell}` : ''),
    )
    .join('; ');

  return (
    <div className="vorsorge-zettel">
      <h3>{untersuchung.name}</h3>
      <p>
        <strong>Wie oft:</strong> {wieOft}
      </p>
      <p>
        <strong>Wo:</strong> {untersuchung.wer}
      </p>
      <ul>
        {untersuchung.was.map((satz) => (
          <li key={satz}>{satz}</li>
        ))}
      </ul>
      {untersuchung.hinweis && <p>{untersuchung.hinweis}</p>}
    </div>
  );
}
