import './steuerung.css';
import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, MonitorPlay, Search } from 'lucide-react';
import type { SteuerungProps } from '../../kern/typen';
import type { AufklaerungsZustand } from './index';
import {
  GEBIETE,
  KRANKHEITEN,
  bildgebungVon,
  findeKrankheit,
  hinweisTitel,
  seitenVon,
  sucheKrankheiten,
} from './daten';
import { seite as appSeite } from '../../kern/pfad';

export function Steuerung({ zustand, aendern }: SteuerungProps<AufklaerungsZustand>) {
  const [frage, setFrage] = useState('');
  const offen = findeKrankheit(zustand.thema);
  const seiten = offen ? seitenVon(offen) : [];
  const anzahl = seiten.length;
  const seite = Math.min(Math.max(zustand.seite, 0), Math.max(anzahl - 1, 0));
  const treffer = sucheKrankheiten(frage);

  const waehle = (id: string) =>
    aendern(zustand.thema === id ? { thema: null, seite: 0 } : { thema: id, seite: 0 });

  // Pfeiltasten blättern, solange nicht gerade im Suchfeld getippt wird.
  useEffect(() => {
    if (!offen) return;
    const taste = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.altKey || e.ctrlKey || e.metaKey) return;
      if (e.key === 'ArrowRight')
        aendern((alt) => ({ ...alt, seite: Math.min(alt.seite + 1, anzahl - 1) }));
      if (e.key === 'ArrowLeft') aendern((alt) => ({ ...alt, seite: Math.max(alt.seite - 1, 0) }));
    };
    window.addEventListener('keydown', taste);
    return () => window.removeEventListener('keydown', taste);
  }, [offen, anzahl, aendern]);

  return (
    <div className="aufk">
      {offen && (
        <section className="aufk__pult" aria-labelledby="aufk-pult">
          <p className="aufk__laeuft" role="status">
            <MonitorPlay size={18} strokeWidth={1.75} aria-hidden="true" />
            <span id="aufk-pult">
              Der Patient sieht <strong>{offen.name}</strong>, Seite {seite + 1} von{' '}
              {anzahl}.
            </span>
            <button
              type="button"
              className="knopf"
              onClick={() => aendern({ thema: null, seite: 0 })}
            >
              Schließen
            </button>
          </p>

          <div className="aufk__seiten">
            <button
              type="button"
              className="knopf aufk__pfeil"
              disabled={seite === 0}
              aria-label="Vorige Seite"
              onClick={() => aendern({ seite: seite - 1 })}
            >
              <ChevronLeft size={18} strokeWidth={1.75} aria-hidden="true" />
            </button>
            {seiten.map((s, i) => (
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
              disabled={seite === anzahl - 1}
              onClick={() => aendern({ seite: seite + 1 })}
            >
              Weiter
              <ChevronRight size={18} strokeWidth={1.75} aria-hidden="true" />
            </button>
          </div>

          <div className="aufk__spickzettel">
            <h3>{seiten[seite].titel}</h3>
            <ul>
              {seiten[seite].saetze.map((satz) => (
                <li key={satz}>{satz}</li>
              ))}
            </ul>
            {seiten[seite].art === 'bild' && (
              <p className="aufk__bildquellen">
                {bildgebungVon(offen.id)?.aufnahmen.map((a) => (
                  <span key={a.datei}>
                    {a.titel}:{' '}
                    <a href={a.quelle} target="_blank" rel="noreferrer">
                      {a.urheber}, {a.lizenz}
                    </a>
                  </span>
                ))}
              </p>
            )}
            {seite === anzahl - 1 && offen.warnung && (
              <p>
                <strong>{hinweisTitel(offen)}</strong> {offen.warnung}
              </p>
            )}
          </div>
          <p className="aufk__hilfe">Die Pfeiltasten ← → blättern ebenfalls.</p>
        </section>
      )}

      <section aria-labelledby="aufk-wahl">
        <h2 id="aufk-wahl">Thema wählen</h2>
        <label className="aufk__suche">
          <Search size={18} strokeWidth={1.75} aria-hidden="true" />
          <span className="nur-vorlesen">Thema suchen</span>
          <input
            type="search"
            value={frage}
            placeholder="Suchen, z. B. Zucker, COPD oder Müdigkeit"
            onChange={(e) => setFrage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && treffer.length === 1) waehle(treffer[0].id);
            }}
          />
        </label>

        {treffer.length === 0 && (
          <p className="aufk__leer">
            Zu „{frage}“ gibt es noch keine Aufklärung. Vorhanden sind {KRANKHEITEN.length}{' '}
            Themen – die Suche findet auch Fachbegriffe.
          </p>
        )}

        {GEBIETE.map((gebiet) => {
          const liste = treffer.filter((k) => k.gebiet === gebiet.id);
          if (liste.length === 0) return null;
          return (
            <div key={gebiet.id} className="aufk__gebiet">
              <h3>{gebiet.name}</h3>
              <ul>
                {liste.map((k) => (
                  <li key={k.id}>
                    <button
                      type="button"
                      className="aufk__thema"
                      aria-pressed={zustand.thema === k.id}
                      onClick={() => waehle(k.id)}
                    >
                      <strong>{k.name}</strong>
                      {k.zusatz && <span>{k.zusatz}</span>}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </section>

      <footer className="aufk__quellen">
        <p>
          <strong>Grundlage.</strong> Eigene Texte in Patientensprache, orientiert an den
          hausärztlichen Leitlinien (DEGAM, Nationale VersorgungsLeitlinien). Sie ersetzen nicht
          das Gespräch; alle Texte und Zeichnungen stehen zum Gegenlesen unter{' '}
          <a href={appSeite('/korrektur')} target="_blank" rel="noreferrer">
            /korrektur
          </a>
          .
        </p>
      </footer>
    </div>
  );
}
