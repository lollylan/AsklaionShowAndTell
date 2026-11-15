import './steuerung.css';
import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Info, LayoutGrid, MonitorPlay } from 'lucide-react';
import type { SteuerungProps } from '../../kern/typen';
import type { VorsorgeZustand } from './index';
import {
  MAX_ALTER,
  MIN_ALTER,
  SCHNELLWAHL,
  UNTERSUCHUNGEN,
  altersText,
  anstehend,
  findeUntersuchung,
  intervallText,
  passtZu,
  stufeFuer,
  type Geschlecht,
  type Untersuchung,
} from './daten';

const GESCHLECHTER: { id: Geschlecht; name: string }[] = [
  { id: 'frau', name: 'Frau' },
  { id: 'mann', name: 'Mann' },
];

/** Was in der Zeile neben dem Namen steht – und ob die Untersuchung jetzt ansteht. */
function lage(u: Untersuchung, zustand: VorsorgeZustand): { text: string; an: boolean } {
  const { geschlecht, alter, hausarztmodell } = zustand;
  if (!passtZu(u, geschlecht)) {
    return { text: u.fuer === 'frau' ? 'nur für Frauen' : 'nur für Männer', an: false };
  }
  if (alter === null) {
    const text = u.stufen
      .map((s) => `${altersText(s)} ${intervallText(s, hausarztmodell)}`)
      .join(', ');
    return { text, an: false };
  }
  const stufe = stufeFuer(u, alter);
  if (stufe) return { text: intervallText(stufe, hausarztmodell), an: true };
  const naechste = u.stufen.find((s) => s.von > alter);
  if (naechste) return { text: `erst ab ${naechste.von} Jahren`, an: false };
  return { text: `nur bis ${u.stufen[u.stufen.length - 1].bis} Jahre`, an: false };
}

export function Steuerung({ zustand, aendern }: SteuerungProps<VorsorgeZustand>) {
  const { geschlecht, alter, hausarztmodell, thema } = zustand;
  const offen = findeUntersuchung(thema);

  // Das Zahlenfeld darf Zwischenstände halten („5“ auf dem Weg zu „52“).
  const [eingabe, setEingabe] = useState(alter === null ? '' : String(alter));
  useEffect(() => {
    setEingabe((alt) => (Number(alt) === alter ? alt : alter === null ? '' : String(alter)));
  }, [alter]);

  const setzeAlter = (wert: number | null) => aendern({ alter: wert, thema: null });

  const tippe = (text: string) => {
    setEingabe(text);
    const zahl = Number(text);
    if (text.trim() === '') setzeAlter(null);
    else if (Number.isInteger(zahl) && zahl >= MIN_ALTER && zahl <= MAX_ALTER) setzeAlter(zahl);
  };

  const eingabeUngueltig = eingabe.trim() !== '' && Number(eingabe) !== alter;

  const erklaere = (id: string | null) => aendern({ thema: thema === id ? null : id });

  // Vor und zurück durch die Untersuchungen, die jetzt anstehen.
  const reihe = anstehend(geschlecht, alter).map((a) => a.untersuchung.id);
  const stelle = thema ? reihe.indexOf(thema) : -1;
  const naechste = reihe[stelle + 1];
  const vorige = stelle > 0 ? reihe[stelle - 1] : undefined;

  return (
    <div className="vors">
      <section aria-labelledby="vors-patient">
        <h2 id="vors-patient">Patient</h2>

        <div className="vors__feld" role="group" aria-labelledby="vors-geschlecht">
          <span className="vors__marke" id="vors-geschlecht">
            Geschlecht
          </span>
          <div className="vors__wahl">
            {GESCHLECHTER.map((g) => (
              <button
                key={g.id}
                type="button"
                className="knopf vors__wahlknopf"
                aria-pressed={geschlecht === g.id}
                onClick={() =>
                  aendern({ geschlecht: geschlecht === g.id ? null : g.id, thema: null })
                }
              >
                {g.name}
              </button>
            ))}
          </div>
        </div>

        <div className="vors__feld" role="group" aria-labelledby="vors-alter">
          <span className="vors__marke" id="vors-alter">
            Alter
          </span>
          <div className="vors__wahl">
            {SCHNELLWAHL.map((jahre) => (
              <button
                key={jahre}
                type="button"
                className="knopf vors__alterknopf"
                aria-pressed={alter === jahre}
                onClick={() => setzeAlter(alter === jahre ? null : jahre)}
              >
                {jahre}
              </button>
            ))}
            <label className="vors__genau">
              <span>genau</span>
              <input
                type="number"
                inputMode="numeric"
                min={MIN_ALTER}
                max={MAX_ALTER}
                step={1}
                value={eingabe}
                aria-invalid={eingabeUngueltig}
                aria-describedby="vors-alter-hilfe"
                onChange={(e) => tippe(e.target.value)}
              />
              <span>Jahre</span>
            </label>
          </div>
          <p className="vors__hilfe" id="vors-alter-hilfe" data-fehler={eingabeUngueltig}>
            {eingabeUngueltig
              ? `Bitte ein Alter zwischen ${MIN_ALTER} und ${MAX_ALTER} Jahren eingeben.`
              : 'Das Programm gilt für Erwachsene in der gesetzlichen Krankenversicherung.'}
          </p>
        </div>

        <label className="vors__haken">
          <input
            type="checkbox"
            checked={hausarztmodell}
            onChange={(e) => aendern({ hausarztmodell: e.target.checked })}
          />
          <span>
            Nimmt am Hausarztprogramm teil <small>Check-up ab 35 alle zwei statt drei Jahre</small>
          </span>
        </label>

        {alter !== null && geschlecht === null && (
          <p className="meldung">
            <Info size={18} strokeWidth={1.75} aria-hidden="true" />
            <span>
              Ohne Geschlecht sieht der Patient nur die Untersuchungen, die für alle gelten.
            </span>
          </p>
        )}
      </section>

      <section aria-labelledby="vors-liste">
        <h2 id="vors-liste">Untersuchungen</h2>

        {offen && (
          <p className="vors__laeuft" role="status">
            <MonitorPlay size={18} strokeWidth={1.75} aria-hidden="true" />
            <span>
              Der Patient sieht gerade die Erklärung zu <strong>{offen.name}</strong>.
            </span>
            <button type="button" className="knopf" onClick={() => erklaere(null)}>
              Erklärung schließen
            </button>
          </p>
        )}

        <div className="vors__schritte">
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
            {stelle === -1 ? 'Erste Untersuchung erklären' : 'Nächste Untersuchung'}
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

        <p className="vors__hilfe">
          {alter === null
            ? 'Mit dem Alter erscheint beim Patienten die Übersicht. Erklären geht jederzeit.'
            : 'Hervorgehoben = steht in diesem Alter an und erscheint beim Patienten unter „Jetzt für Sie“.'}
        </p>
        <ul className="vors__liste">
          {UNTERSUCHUNGEN.map((u) => {
            const { text, an } = lage(u, zustand);
            return (
              <li key={u.id} className="vors__zeile" data-an={an}>
                <span className="vors__name">{u.name}</span>
                <span className="vors__wann">
                  {text}
                  <span className="vors__wer">{u.wer}</span>
                </span>
                <button
                  type="button"
                  className="knopf vors__knopf"
                  aria-pressed={thema === u.id}
                  onClick={() => erklaere(u.id)}
                >
                  {thema === u.id ? 'Wird erklärt' : 'Erklären'}
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      <footer className="vors__quellen">
        <p>
          <strong>Grundlage.</strong> Früherkennungs-Richtlinien des Gemeinsamen Bundesausschusses
          für gesetzlich Versicherte, vereinfacht für die Anzeige. Bei familiärer Belastung oder
          Beschwerden gelten andere Wege. Zahnvorsorge und Impfungen erscheinen beim Patienten nur
          als Verweis – für Impfungen gibt es das Modul „Standardimpfungen“.
        </p>
      </footer>
    </div>
  );
}
