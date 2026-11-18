import './handzettel.css';
import { useEffect, useRef, useState } from 'react';
import { Download, LoaderCircle, Mail, Printer } from 'lucide-react';
import { findeFundstelle, zerlege } from '../kern/verzeichnis';
import { handzettelSpeicher } from '../arzt/Verlauf';
import { dateiname, erzeugePdf, speichere, versende } from './pdf';
import { LOGO, MARKE, ZWECK } from '../kern/marke';
import { IST_DEMO } from '../kern/pfad';
import { BlattSprachwahl, useBlattSprache } from '../sprachen/BlattSprache';

function liesListe(raum: string): string[] {
  try {
    const roh = JSON.parse(localStorage.getItem(handzettelSpeicher(raum)) ?? '[]');
    return Array.isArray(roh) ? roh.filter((s): s is string => typeof s === 'string') : [];
  } catch {
    return [];
  }
}

/**
 * Der Handzettel zum Mitgeben (/handzettel): alles, was in der Sitzung gezeigt wurde, als
 * A4-Blatt im Praxis-Design. Oben eine Leiste zum Abwählen und für eine persönliche Notiz –
 * sie wird nicht mitgedruckt. Gespeichert wird hier nichts.
 */
export function Handzettel({ raum }: { raum: string }) {
  const [liste, setListe] = useState(() => liesListe(raum));
  const [aus, setAus] = useState<string[]>([]);
  const [notiz, setNotiz] = useState('');
  const blatt = useRef<HTMLElement>(null);
  const [arbeit, setArbeit] = useState<'pdf' | 'mail' | null>(null);
  const [meldung, setMeldung] = useState<{ text: string; fehler?: boolean } | null>(null);
  const { sprache, waehle, fehlend, heute } = useBlattSprache(raum, blatt);

  const alsPdf = async (wohin: 'pdf' | 'mail') => {
    if (!blatt.current || arbeit) return;
    setArbeit(wohin);
    setMeldung(null);
    try {
      const pdf = await erzeugePdf(blatt.current);
      const name = dateiname();
      if (wohin === 'pdf') {
        speichere(pdf, name);
        setMeldung({ text: `Gespeichert als ${name} im Download-Ordner.` });
      } else {
        const weg = await versende(pdf, name);
        if (weg === 'von-hand')
          setMeldung({
            text: `${name} liegt im Download-Ordner. Bitte im Mailprogramm als Anhang hinzufügen.`,
          });
      }
    } catch {
      setMeldung({ text: 'Das PDF ließ sich nicht erstellen. Bitte erneut versuchen.', fehler: true });
    } finally {
      setArbeit(null);
    }
  };

  // Zeigt der Arzt nach dem Öffnen noch etwas, kommt es von selbst dazu.
  useEffect(() => {
    const beiAenderung = (e: StorageEvent) => {
      if (e.key === handzettelSpeicher(raum)) setListe(liesListe(raum));
    };
    window.addEventListener('storage', beiAenderung);
    return () => window.removeEventListener('storage', beiAenderung);
  }, [raum]);

  const eintraege = liste
    .map((schluessel) => ({ schluessel, fund: findeFundstelle(schluessel) }))
    .filter((e) => e.fund?.modul.verzeichnis?.Handzettel);
  const gewaehlt = eintraege.filter((e) => !aus.includes(e.schluessel));
  const leer = gewaehlt.length === 0 && notiz.trim() === '';

  return (
    <div className="zettelseite">
      <aside className="zettelleiste" aria-label="Handzettel zusammenstellen">
        <h1>Handzettel</h1>
        {eintraege.length === 0 ? (
          <p className="zettelleiste__leer">
            In dieser Sitzung wurde noch nichts gezeigt, das sich drucken lässt. Zeigen Sie dem
            Patienten ein Thema – es erscheint hier von selbst.
          </p>
        ) : (
          <>
            <p>Was soll auf das Blatt?</p>
            <ul>
              {eintraege.map(({ schluessel, fund }) => (
                <li key={schluessel}>
                  <label>
                    <input
                      type="checkbox"
                      checked={!aus.includes(schluessel)}
                      onChange={(e) =>
                        setAus((alt) =>
                          e.target.checked
                            ? alt.filter((a) => a !== schluessel)
                            : [...alt, schluessel],
                        )
                      }
                    />
                    <span>
                      {fund!.eintrag.titel}
                      <small>{fund!.modul.verzeichnis!.art}</small>
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          </>
        )}

        <BlattSprachwahl sprache={sprache} waehle={waehle} fehlend={fehlend} />

        <label className="zettelleiste__notiz">
          <span>
            Persönliche Notiz (wird mitgedruckt{sprache !== 'de' ? ', so wie geschrieben' : ''})
          </span>
          <textarea
            rows={4}
            value={notiz}
            placeholder="z. B. Kontrolle in vier Wochen, Blutdruck-Tagebuch mitbringen"
            onChange={(e) => setNotiz(e.target.value)}
          />
        </label>

        <button
          type="button"
          className="zettelleiste__drucken"
          disabled={leer}
          onClick={() => window.print()}
        >
          <Printer size={18} strokeWidth={1.75} aria-hidden="true" />
          Drucken
        </button>
        <div className="zettelleiste__weitere">
          <button
            type="button"
            disabled={leer || arbeit !== null}
            aria-busy={arbeit === 'pdf'}
            onClick={() => alsPdf('pdf')}
          >
            {arbeit === 'pdf' ? (
              <LoaderCircle className="zettelleiste__dreht" size={18} strokeWidth={1.75} aria-hidden="true" />
            ) : (
              <Download size={18} strokeWidth={1.75} aria-hidden="true" />
            )}
            Als PDF speichern
          </button>
          <button
            type="button"
            disabled={leer || arbeit !== null}
            aria-busy={arbeit === 'mail'}
            onClick={() => alsPdf('mail')}
          >
            {arbeit === 'mail' ? (
              <LoaderCircle className="zettelleiste__dreht" size={18} strokeWidth={1.75} aria-hidden="true" />
            ) : (
              <Mail size={18} strokeWidth={1.75} aria-hidden="true" />
            )}
            Per E-Mail senden
          </button>
        </div>
        <p
          className="zettelleiste__meldung"
          role="status"
          data-fehler={meldung?.fehler ? 'true' : undefined}
        >
          {meldung?.text}
        </p>
        <p className="zettelleiste__hinweis">
          Die Notiz bleibt nur in diesem Fenster und im erzeugten PDF; sie wird nirgends sonst gespeichert.
        </p>
      </aside>

      <main className="zettel" ref={blatt} data-sprachraum="">
        <header className="zettel__kopf">
          <img src={LOGO} alt="" />
          <div>
            <p className="zettel__praxis">{MARKE.name}</p>
            <p>{MARKE.zusatz}</p>
          </div>
          <p className="zettel__datum" data-nicht-uebersetzen="">{heute}</p>
        </header>

        <h2 className="zettel__titel">Zum Nachlesen: Das haben wir heute besprochen</h2>

        {notiz.trim() !== '' && (
          <section className="zettel__notiz">
            <h3>Für Sie notiert</h3>
            <p data-nicht-uebersetzen="">{notiz}</p>
          </section>
        )}

        {gewaehlt.map(({ schluessel, fund }) => {
          const Fassung = fund!.modul.verzeichnis!.Handzettel!;
          return (
            <article key={schluessel} className="zettel__eintrag">
              <Fassung id={zerlege(schluessel).voll} />
            </article>
          );
        })}

        <footer className="zettel__fuss">
          Dieses Blatt fasst unser Gespräch zusammen und ersetzt es nicht. Wenn etwas unklar ist
          oder sich Ihr Befinden verschlechtert, melden Sie sich bitte bei uns. Im Notfall: 112.
          {IST_DEMO && <span className="zettel__zweck">{ZWECK}</span>}
        </footer>
      </main>
    </div>
  );
}
