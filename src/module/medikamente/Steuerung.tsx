import './steuerung.css';
import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, MonitorPlay, Search } from 'lucide-react';
import type { SteuerungProps } from '../../kern/typen';
import type { MedikamentenZustand } from './index';
import {
  GEBIETE,
  MEDIKAMENTE,
  SEITEN,
  findeMedikament,
  sucheMedikamente,
  type Medikament,
  type SeiteId,
} from './daten';
import { seite as appSeite } from '../../kern/pfad';

const LETZTE = SEITEN.length - 1;

export function Steuerung({ zustand, aendern }: SteuerungProps<MedikamentenZustand>) {
  const [frage, setFrage] = useState('');
  const offen = findeMedikament(zustand.thema);
  const seite = Math.min(Math.max(zustand.seite, 0), LETZTE);
  const treffer = sucheMedikamente(frage);

  const waehle = (id: string) =>
    aendern(zustand.thema === id ? { thema: null, seite: 0 } : { thema: id, seite: 0 });

  // Pfeiltasten blättern, solange nicht gerade im Suchfeld getippt wird.
  useEffect(() => {
    if (!offen) return;
    const taste = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.altKey || e.ctrlKey || e.metaKey) return;
      if (e.key === 'ArrowRight')
        aendern((alt) => ({ ...alt, seite: Math.min(alt.seite + 1, LETZTE) }));
      if (e.key === 'ArrowLeft') aendern((alt) => ({ ...alt, seite: Math.max(alt.seite - 1, 0) }));
    };
    window.addEventListener('keydown', taste);
    return () => window.removeEventListener('keydown', taste);
  }, [offen, aendern]);

  return (
    <div className="medi">
      {offen && (
        <section className="medi__pult" aria-labelledby="medi-pult">
          <p className="medi__laeuft" role="status">
            <MonitorPlay size={18} strokeWidth={1.75} aria-hidden="true" />
            <span id="medi-pult">
              Der Patient sieht <strong>{offen.name}</strong>, Seite {seite + 1} von{' '}
              {SEITEN.length}.
            </span>
            <button
              type="button"
              className="knopf"
              onClick={() => aendern({ thema: null, seite: 0 })}
            >
              Schließen
            </button>
          </p>

          <div className="medi__seiten">
            <button
              type="button"
              className="knopf medi__pfeil"
              disabled={seite === 0}
              aria-label="Vorige Seite"
              onClick={() => aendern({ seite: seite - 1 })}
            >
              <ChevronLeft size={18} strokeWidth={1.75} aria-hidden="true" />
            </button>
            {SEITEN.map((s, i) => (
              <button
                key={s.id}
                type="button"
                className="knopf"
                aria-pressed={seite === i}
                onClick={() => aendern({ seite: i })}
              >
                {s.kurz}
              </button>
            ))}
            <button
              type="button"
              className="knopf knopf--haupt"
              disabled={seite === LETZTE}
              onClick={() => aendern({ seite: seite + 1 })}
            >
              Weiter
              <ChevronRight size={18} strokeWidth={1.75} aria-hidden="true" />
            </button>
          </div>

          <div className="medi__spickzettel">
            <h3>{SEITEN[seite].titel}</h3>
            <Spickzettel medikament={offen} seite={SEITEN[seite].id} />
          </div>
          <p className="medi__hilfe">Die Pfeiltasten ← → blättern ebenfalls.</p>
        </section>
      )}

      <section aria-labelledby="medi-wahl">
        <h2 id="medi-wahl">Medikament wählen</h2>
        <label className="medi__suche">
          <Search size={18} strokeWidth={1.75} aria-hidden="true" />
          <span className="nur-vorlesen">Medikament suchen</span>
          <input
            type="search"
            value={frage}
            placeholder="Wirkstoff oder Handelsname, z. B. Pantozol"
            onChange={(e) => setFrage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && treffer.length === 1) waehle(treffer[0].id);
            }}
          />
        </label>

        {treffer.length === 0 && (
          <p className="medi__leer">
            Zu „{frage}“ gibt es noch keine Erklärung. Vorhanden sind {MEDIKAMENTE.length}{' '}
            Medikamente – die Suche findet Wirkstoffe, Handelsnamen und Wirkstoffgruppen.
          </p>
        )}

        {GEBIETE.map((gebiet) => {
          const liste = treffer.filter((m) => m.gebiet === gebiet.id);
          if (liste.length === 0) return null;
          return (
            <div key={gebiet.id} className="medi__gebiet">
              <h3>{gebiet.name}</h3>
              <ul>
                {liste.map((m) => (
                  <li key={m.id}>
                    <button
                      type="button"
                      className="medi__thema"
                      aria-pressed={zustand.thema === m.id}
                      onClick={() => waehle(m.id)}
                    >
                      <strong>{m.name}</strong>
                      <span>{m.handelsnamen.slice(0, 2).join(', ')}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </section>

      <footer className="medi__quellen">
        <p>
          <strong>Grundlage.</strong> Eigene Texte in Patientensprache, orientiert an den
          Fachinformationen. Sie ersetzen weder das Gespräch noch den Beipackzettel; alle Texte
          stehen zum Gegenlesen unter{' '}
          <a href={appSeite('/korrektur-medikamente')} target="_blank" rel="noreferrer">
            /korrektur-medikamente
          </a>
          . Die Packungsfotos sind Beispiele und nur für die Anzeige in der Praxis gedacht.
        </p>
      </footer>
    </div>
  );
}

/** Der Text der aktuellen Seite als Gedächtnisstütze für den Arzt. */
export function Spickzettel({ medikament, seite }: { medikament: Medikament; seite: SeiteId }) {
  if (seite === 'einnahme') {
    return (
      <ul>
        {medikament.merker.map((m) => (
          <li key={m.titel}>
            <strong>{m.titel}</strong>
            {m.text && ` – ${m.text}`}
          </li>
        ))}
        {medikament.einnahme.map((satz) => (
          <li key={satz}>{satz}</li>
        ))}
      </ul>
    );
  }

  if (seite === 'nebenwirkungen') {
    return (
      <ul>
        {medikament.nebenwirkungen.map((n) => (
          <li key={n.name}>
            <strong>{n.name}.</strong> {n.text}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <>
      <ul>
        {medikament[seite].map((satz) => (
          <li key={satz}>{satz}</li>
        ))}
      </ul>
      {seite === 'achtung' && medikament.warnung && (
        <p>
          <strong>Warnzeichen.</strong> {medikament.warnung}
        </p>
      )}
    </>
  );
}
