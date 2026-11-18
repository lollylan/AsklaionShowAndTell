import '../../handzettel/handzettel.css';
import './lagerungsblatt.css';
import { useRef, useState } from 'react';
import { Download, LoaderCircle, Printer } from 'lucide-react';
import { dateiname, erzeugePdf, speichere } from '../../handzettel/pdf';
import { LOGO, MARKE } from '../../kern/marke';
import { MANOEVER, findeManoever, mitSeite, seitig, type Ohr } from './manoever';
import { ManoeverBild, ohrZeile, quellenzeile } from './ManoeverKarten';
import { findeKrankheit } from './daten';
import { BlattSprachwahl, useBlattSprache } from '../../sprachen/BlattSprache';

function ausAdresse(): { m: string; ohr: Ohr } {
  const p = new URLSearchParams(location.search);
  const m = findeManoever(p.get('m'))?.id ?? MANOEVER[0].id;
  return { m, ohr: p.get('ohr') === 'links' ? 'links' : 'rechts' };
}

/**
 * Übungsblatt zum Lagerungsschwindel (/lagerungsblatt?m=epley&ohr=rechts): ein Befreiungsmanöver
 * Schritt für Schritt mit Bild, für das betroffene Ohr. Gespeichert wird nichts.
 */
export function Lagerungsblatt({ raum }: { raum: string }) {
  const start = ausAdresse();
  const [id, setId] = useState(start.m);
  const [ohr, setOhr] = useState<Ohr>(start.ohr);
  const [notiz, setNotiz] = useState('');
  const [arbeit, setArbeit] = useState(false);
  const [meldung, setMeldung] = useState<{ text: string; fehler?: boolean } | null>(null);
  const blatt = useRef<HTMLElement>(null);
  const { sprache, waehle, fehlend, heute } = useBlattSprache(raum, blatt);
  const m = findeManoever(id) ?? MANOEVER[0];
  const zeile = ohrZeile(m, ohr);
  const warnung = findeKrankheit('lagerungsschwindel')?.warnung;

  const alsPdf = async () => {
    if (!blatt.current || arbeit) return;
    setArbeit(true);
    setMeldung(null);
    try {
      const pdf = await erzeugePdf(blatt.current);
      const name = dateiname().replace('Handzettel', 'Lagerungsschwindel');
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
      <aside className="zettelleiste lagerleiste" aria-label="Übungsblatt einstellen">
        <h1>Lagerungsschwindel</h1>

        <fieldset>
          <legend>Manöver</legend>
          <ul>
            {MANOEVER.map((x) => (
              <li key={x.id}>
                <label>
                  <input
                    type="radio"
                    name="manoever"
                    checked={id === x.id}
                    onChange={() => setId(x.id)}
                  />
                  <span>{x.name}</span>
                </label>
              </li>
            ))}
          </ul>
        </fieldset>

        {seitig(m) && (
          <fieldset>
            <legend>Betroffenes Ohr</legend>
            <ul>
              {(['rechts', 'links'] as const).map((o) => (
                <li key={o}>
                  <label>
                    <input
                      type="radio"
                      name="ohr"
                      checked={ohr === o}
                      onChange={() => setOhr(o)}
                    />
                    <span>{o === 'rechts' ? 'Rechtes Ohr' : 'Linkes Ohr'}</span>
                  </label>
                </li>
              ))}
            </ul>
          </fieldset>
        )}

        <BlattSprachwahl sprache={sprache} waehle={waehle} fehlend={fehlend} />

        <label className="zettelleiste__notiz">
          <span>
            Persönliche Notiz (wird mitgedruckt{sprache !== 'de' ? ', so wie geschrieben' : ''})
          </span>
          <textarea
            rows={4}
            value={notiz}
            placeholder="z. B. Bis Freitag dreimal täglich, dann Kontrolle"
            onChange={(e) => setNotiz(e.target.value)}
          />
        </label>

        <button type="button" className="zettelleiste__drucken" onClick={() => window.print()}>
          <Printer size={18} strokeWidth={1.75} aria-hidden="true" />
          Drucken
        </button>
        <div className="zettelleiste__weitere">
          <button type="button" disabled={arbeit} aria-busy={arbeit} onClick={alsPdf}>
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
          Im Druckdialog „Hintergrundgrafiken“ einschalten, sonst fehlen die Farbflächen.
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

        <h2 className="zettel__titel">Ihre Übung gegen Lagerungsschwindel</h2>
        <div className="lagerblatt__kopf">
          <h3>{m.name}</h3>
          {zeile && <p className="lagerblatt__ohr">{zeile}</p>}
        </div>
        <p className="zettel__leise">{m.wofuer}</p>

        {notiz.trim() !== '' && (
          <section className="zettel__notiz">
            <h3>Für Sie notiert</h3>
            <p data-nicht-uebersetzen="">{notiz}</p>
          </section>
        )}

        {m.ganz && (
          <div className="lagerblatt__gesamt">
            <ManoeverBild manoever={m} ohr={ohr} beschreibung={m.name} />
          </div>
        )}

        <ol className="lagerblatt__schritte" data-ganz={m.ganz ? 'true' : undefined}>
          {m.schritte.map((s, i) => (
            <li key={s.text} className="lagerschritt">
              <div className="lagerschritt__bild">
                {s.ausschnitt ? (
                  <ManoeverBild
                    manoever={m}
                    ohr={ohr}
                    ausschnitt={s.ausschnitt}
                    beschreibung={`Schritt ${i + 1}`}
                  />
                ) : (
                  <span aria-hidden="true">{i + 1}</span>
                )}
              </div>
              <div>
                <p className="lagerschritt__nr">Schritt {i + 1}</p>
                <p>{mitSeite(s.text, ohr)}</p>
                {s.halten && <p className="lagerschritt__halten">Halten: {s.halten}</p>}
              </div>
            </li>
          ))}
        </ol>

        <section className="lagerblatt__wie">
          <p>
            <strong>Wie oft:</strong> {m.wiederholen}
          </p>
          <p>{m.hinweis}</p>
          <p>
            Machen Sie die Übung auf dem Bett, nicht auf einer schmalen Liege. Stehen Sie danach
            langsam auf – beim ersten Mal am besten mit jemandem in der Nähe.
          </p>
        </section>

        {warnung && (
          <p className="zettel__warnung">
            <strong>Warnzeichen.</strong> {warnung}
          </p>
        )}

        <footer className="zettel__fuss">
          Grafik: {quellenzeile(m)}
          {m.grafik.quelle ? ` (${m.grafik.quelle})` : ''}.
          Hilft die Übung nach einer Woche nicht, melden Sie sich bitte bei uns.
        </footer>
      </main>
    </div>
  );
}
