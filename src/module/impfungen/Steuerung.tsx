import './steuerung.css';
import { ChevronLeft, ChevronRight, LayoutGrid, MonitorPlay } from 'lucide-react';
import type { SteuerungProps } from '../../kern/typen';
import type { ImpfZustand } from './index';
import { GRUPPEN, IMPFUNGEN, findeImpfung, schemaFuer, type GruppeId } from './daten';
import { Merkblaetter } from './Merkblaetter';
import { FAKTENBLATT } from './merkblatt-links';

const reihenfolge = (ids: string[]) =>
  IMPFUNGEN.filter((i) => ids.includes(i.id)).map((i) => i.id);

export function Steuerung({ zustand, aendern }: SteuerungProps<ImpfZustand>) {
  const { gruppe, auswahl, thema } = zustand;
  const offen = findeImpfung(thema);

  // Eine Gruppe wählen ersetzt die Auswahl durch ihren Vorschlag.
  const waehleGruppe = (id: GruppeId) =>
    gruppe === id
      ? aendern({ gruppe: null })
      : aendern({
          gruppe: id,
          auswahl: reihenfolge(GRUPPEN.find((g) => g.id === id)?.vorschlag ?? []),
          thema: null,
        });

  const schalte = (id: string, an: boolean) =>
    aendern((alt) => ({
      ...alt,
      auswahl: an ? reihenfolge([...alt.auswahl, id]) : alt.auswahl.filter((a) => a !== id),
    }));

  const erklaere = (id: string | null) => aendern({ thema: thema === id ? null : id });

  // Vor und zurück durch die angehakten Impfungen.
  const stelle = thema ? auswahl.indexOf(thema) : -1;
  const naechste = auswahl[stelle + 1];
  const vorige = stelle > 0 ? auswahl[stelle - 1] : undefined;

  return (
    <div className="impf">
      <section aria-labelledby="impf-gruppe">
        <h2 id="impf-gruppe">Alter und Lebenslage</h2>
        <ul className="impf__gruppen">
          {GRUPPEN.map((g) => (
            <li key={g.id}>
              <button
                type="button"
                className="impf__gruppe"
                aria-pressed={gruppe === g.id}
                onClick={() => waehleGruppe(g.id)}
              >
                <strong>{g.name}</strong>
                <span>{g.alter}</span>
              </button>
            </li>
          ))}
        </ul>
        <p className="impf__hilfe">
          Die Gruppe hakt die Impfungen an, die der STIKO-Impfkalender für dieses Alter vorsieht,
          und zeigt auf den Karten nur das zugehörige Schema. Ob eine Impfung im Einzelfall
          ansteht, klärt der Blick in den Impfpass.
        </p>
      </section>

      <section aria-labelledby="impf-liste">
        <h2 id="impf-liste">Impfungen</h2>

        {offen && (
          <p className="laeuft" role="status">
            <MonitorPlay size={18} strokeWidth={1.75} aria-hidden="true" />
            <span>
              Der Patient sieht gerade die Erklärung zu <strong>{offen.name}</strong>.
            </span>
            <button type="button" className="knopf" onClick={() => erklaere(null)}>
              Erklärung schließen
            </button>
          </p>
        )}

        <div className="impf__schritte">
          <button
            type="button"
            className="knopf"
            disabled={!vorige}
            onClick={() => vorige && aendern({ thema: vorige })}
          >
            <ChevronLeft size={18} strokeWidth={1.75} aria-hidden="true" />
            Zurück
          </button>
          <button
            type="button"
            className="knopf knopf--haupt"
            disabled={!naechste}
            onClick={() => naechste && aendern({ thema: naechste })}
          >
            {stelle === -1 ? 'Erste Impfung erklären' : 'Nächste Impfung'}
            <ChevronRight size={18} strokeWidth={1.75} aria-hidden="true" />
          </button>
          <button
            type="button"
            className="knopf"
            disabled={thema === null}
            onClick={() => erklaere(null)}
          >
            <LayoutGrid size={18} strokeWidth={1.75} aria-hidden="true" />
            Übersicht zeigen
          </button>
        </div>

        <p className="impf__hilfe">Haken = erscheint in der Übersicht beim Patienten.</p>
        <ul className="impf__liste">
          {IMPFUNGEN.map((impfung) => {
            const an = auswahl.includes(impfung.id);
            const schritt = schemaFuer(impfung, gruppe)[0];
            return (
              <li key={impfung.id} className="impf__zeile" data-an={an}>
                <div>
                  <label className="impf__haken">
                    <input
                      type="checkbox"
                      checked={an}
                      onChange={(e) => schalte(impfung.id, e.target.checked)}
                    />
                    <span className="impf__name">{impfung.name}</span>
                  </label>
                  <Merkblaetter id={impfung.id} />
                </div>
                <span className="impf__wann">{gruppe ? schritt.wann : impfung.zusatz}</span>
                <button
                  type="button"
                  className="knopf impf__knopf"
                  aria-pressed={thema === impfung.id}
                  onClick={() => erklaere(impfung.id)}
                >
                  {thema === impfung.id ? 'Wird erklärt' : 'Erklären'}
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      <footer className="impf__quellen">
        <p>
          <strong>Grundlage.</strong> Impfkalender der STIKO, vereinfacht für die Anzeige.
          Indikations- und Berufsimpfungen sind nur angedeutet; Abstände und Impfstoffwahl bitte
          im Einzelfall prüfen.
        </p>
        <p>
          <strong>Faktenblätter.</strong> RKI „Kurz &amp; Knapp“ zum Ausdrucken, nicht für jede
          Impfung vorhanden. Außerdem:{' '}
          <a href={FAKTENBLATT.schwangerschaft.url} target="_blank" rel="noopener noreferrer">
            {FAKTENBLATT.schwangerschaft.titel}
          </a>
          ,{' '}
          <a href={FAKTENBLATT.kontraindikationen.url} target="_blank" rel="noopener noreferrer">
            {FAKTENBLATT.kontraindikationen.titel}
          </a>
          .
        </p>
      </footer>
    </div>
  );
}
