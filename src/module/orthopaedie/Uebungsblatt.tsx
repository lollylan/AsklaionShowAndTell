import '../../handzettel/handzettel.css';
import './druck.css';
import './uebungsblatt.css';
import { useRef, useState } from 'react';
import { Download, LoaderCircle, Printer } from 'lucide-react';
import { dateiname, erzeugePdf, speichere } from '../../handzettel/pdf';
import { GEBIETE, KRANKHEITSBILDER, UEBUNGEN, findeUebung, type Uebung } from './daten';
import { DruckUebung } from './Handzettel';
import { LOGO, MARKE } from '../../kern/marke';
import { BlattSprachwahl, useBlattSprache } from '../../sprachen/BlattSprache';

function ausAdresse(): string[] {
  const roh = new URLSearchParams(location.search).get('u') ?? '';
  return roh
    .split(',')
    .map((s) => s.trim())
    .filter((id) => findeUebung(id));
}

/** Übungen nach dem Gebiet, in dem sie zuerst vorkommen; übrige am Ende. */
function gruppiert(): { name: string; liste: Uebung[] }[] {
  const vergeben = new Set<string>();
  const gruppen = GEBIETE.map((g) => {
    const liste: Uebung[] = [];
    for (const k of KRANKHEITSBILDER.filter((k) => k.gebiet === g.id)) {
      for (const id of k.uebungen) {
        const u = findeUebung(id);
        if (u && !vergeben.has(u.id)) {
          vergeben.add(u.id);
          liste.push(u);
        }
      }
    }
    return { name: g.name, liste };
  });
  const rest = UEBUNGEN.filter((u) => !vergeben.has(u.id));
  if (rest.length) gruppen.push({ name: 'Weitere', liste: rest });
  return gruppen.filter((g) => g.liste.length > 0);
}

/**
 * Übungsblatt zum Mitgeben (/uebungsblatt?u=id,id): frei zusammengestellte Übungen mit Bild,
 * Schritten und Dosierung. Links auswählen und eine Notiz ergänzen, rechts das A4-Blatt.
 * Gespeichert wird nichts.
 */
export function Uebungsblatt({ raum }: { raum: string }) {
  const [gewaehlt, setGewaehlt] = useState<string[]>(ausAdresse);
  const [notiz, setNotiz] = useState('');
  const [arbeit, setArbeit] = useState(false);
  const [meldung, setMeldung] = useState<{ text: string; fehler?: boolean } | null>(null);
  const blatt = useRef<HTMLElement>(null);
  const { sprache, waehle, fehlend, heute } = useBlattSprache(raum, blatt);
  const gruppen = gruppiert();
  const liste = gewaehlt.map(findeUebung).filter((u): u is Uebung => Boolean(u));

  const schalte = (id: string, an: boolean) =>
    setGewaehlt((alt) => (an ? [...alt, id] : alt.filter((g) => g !== id)));

  const alsPdf = async () => {
    if (!blatt.current || arbeit) return;
    setArbeit(true);
    setMeldung(null);
    try {
      const pdf = await erzeugePdf(blatt.current);
      const name = dateiname().replace('Handzettel', 'Uebungsblatt');
      speichere(pdf, name);
      setMeldung({ text: `Gespeichert als ${name} im Download-Ordner.` });
    } catch {
      setMeldung({ text: 'Das PDF ließ sich nicht erstellen. Bitte erneut versuchen.', fehler: true });
    } finally {
      setArbeit(false);
    }
  };

  return (
    <div className="zettelseite">
      <aside className="zettelleiste blattleiste" aria-label="Übungsblatt zusammenstellen">
        <h1>Übungsblatt</h1>
        <p>Welche Übungen sollen aufs Blatt? Die Reihenfolge folgt der Auswahl.</p>
        {gruppen.map((g) => (
          <fieldset key={g.name} className="blattleiste__gruppe">
            <legend>{g.name}</legend>
            <ul>
              {g.liste.map((u) => (
                <li key={u.id}>
                  <label>
                    <input
                      type="checkbox"
                      checked={gewaehlt.includes(u.id)}
                      onChange={(e) => schalte(u.id, e.target.checked)}
                    />
                    <span>{u.name}</span>
                  </label>
                </li>
              ))}
            </ul>
          </fieldset>
        ))}

        <BlattSprachwahl sprache={sprache} waehle={waehle} fehlend={fehlend} />

        <label className="zettelleiste__notiz">
          <span>
            Persönliche Notiz (wird mitgedruckt{sprache !== 'de' ? ', so wie geschrieben' : ''})
          </span>
          <textarea
            rows={4}
            value={notiz}
            placeholder="z. B. Jeden Morgen vor dem Aufstehen, Kontrolle in sechs Wochen"
            onChange={(e) => setNotiz(e.target.value)}
          />
        </label>

        <button
          type="button"
          className="zettelleiste__drucken"
          disabled={liste.length === 0}
          onClick={() => window.print()}
        >
          <Printer size={18} strokeWidth={1.75} aria-hidden="true" />
          Drucken
        </button>
        <div className="zettelleiste__weitere">
          <button
            type="button"
            disabled={liste.length === 0 || arbeit}
            aria-busy={arbeit}
            onClick={alsPdf}
          >
            {arbeit ? (
              <LoaderCircle className="zettelleiste__dreht" size={18} strokeWidth={1.75} aria-hidden="true" />
            ) : (
              <Download size={18} strokeWidth={1.75} aria-hidden="true" />
            )}
            Als PDF speichern
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
          Im Druckdialog „Hintergrundgrafiken“ einschalten, sonst fehlen die Bilder.
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

        <h2 className="zettel__titel">Ihre Übungen für zu Hause</h2>
        <p className="blatt__regel">
          Regelmäßig ist wichtiger als viel. Leichtes Ziehen oder Anstrengung ist in Ordnung –
          stechender oder zunehmender Schmerz nicht. Dann die Übung kleiner machen oder weglassen
          und uns Bescheid geben.
        </p>

        {notiz.trim() !== '' && (
          <section className="zettel__notiz">
            <h3>Für Sie notiert</h3>
            <p data-nicht-uebersetzen="">{notiz}</p>
          </section>
        )}

        {liste.length === 0 ? (
          <p className="blatt__leer">Links Übungen auswählen.</p>
        ) : (
          <div className="blatt__liste">
            {liste.map((u) => (
              <DruckUebung key={u.id} uebung={u} />
            ))}
          </div>
        )}

        <footer className="zettel__fuss">
          Die Übungen ersetzen keine Krankengymnastik, wenn diese verordnet ist. Werden die
          Beschwerden stärker, kommen Taubheit oder Lähmungen dazu, melden Sie sich bitte bei uns.
        </footer>
      </main>
    </div>
  );
}
