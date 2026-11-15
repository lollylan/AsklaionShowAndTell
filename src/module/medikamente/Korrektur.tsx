import '../aufklaerungen/korrektur.css';
import './korrektur.css';
import { GEBIETE, MEDIKAMENTE, SEITEN, findePackung } from './daten';
import { Spickzettel } from './Steuerung';
import { Sinnbild } from './symbole';

/** Alle Medikamente untereinander – zum Gegenlesen (/korrektur-medikamente). */
export function Korrektur() {
  return (
    <main className="korrektur medikorrektur">
      <header>
        <h1>Medikamente zum Gegenlesen</h1>
        <p>
          {MEDIKAMENTE.length} Medikamente mit Beispielpackung und allen vier Seiten. Die Texte
          stehen in <code>src/module/medikamente/daten/</code>, die Suchbegriffe für die Fotos in{' '}
          <code>werkzeuge/packungen.json</code>.
        </p>
        <nav aria-label="Medikamente">
          {MEDIKAMENTE.map((m) => (
            <a key={m.id} href={`#${m.id}`}>
              {m.name}
            </a>
          ))}
        </nav>
      </header>

      {MEDIKAMENTE.map((m) => {
        const packung = findePackung(m.id);
        return (
          <article key={m.id} id={m.id}>
            <div className="medikorrektur__bild">
              {packung ? (
                <img src={packung.bild} alt={`Packung ${packung.name}`} loading="lazy" />
              ) : (
                <p>Noch kein Foto</p>
              )}
              {packung && <p>{packung.name}</p>}
            </div>
            <div className="korrektur__text">
              <h2>{m.name}</h2>
              <p className="korrektur__zusatz">
                {[m.zusatz, GEBIETE.find((g) => g.id === m.gebiet)?.name].join(' · ')}
              </p>
              <p className="medikorrektur__namen">{m.handelsnamen.join(', ')}</p>
              <p className="medikorrektur__zeichen">
                {[...m.merker, ...m.nebenwirkungen].map((z, i) => (
                  <span key={i} title={'titel' in z ? z.titel : z.name}>
                    <Sinnbild id={z.symbol} size={26} />
                  </span>
                ))}
              </p>
              <div className="korrektur__seiten">
                {SEITEN.map((s) => (
                  <section key={s.id}>
                    <h3>{s.titel}</h3>
                    <Spickzettel medikament={m} seite={s.id} />
                  </section>
                ))}
              </div>
            </div>
          </article>
        );
      })}
    </main>
  );
}
