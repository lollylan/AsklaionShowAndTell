import './arzt.css';
import { useCallback, useEffect, useRef, useState, type PointerEvent } from 'react';
import { Eye, EyeOff, Home, Info, Languages, MonitorUp, MousePointerClick, RotateCcw, TriangleAlert } from 'lucide-react';
import { LEERE_SITZUNG, useSitzung, type Schnappschuss, type Sitzung } from '../kern/sitzung';
import { alleModule, findeModul, modulZustand } from '../kern/register';
import { Fehlergrenze } from '../kern/Fehlergrenze';
import type { BeliebigesModul } from '../kern/typen';
import { BuehnenInhalt } from '../buehne/BuehnenInhalt';
import { oeffnePatientenfenster } from './patientenfenster';
import { normalisiereRaum, raumAnzeige, wechsleRaum } from '../kern/raum';
import { aktuellerSchluessel, springeZu, stammVon } from '../kern/verzeichnis';
import { verwandteVon } from '../kern/verweise';
import { Suche } from './Suche';
import { Verlauf, handzettelSpeicher } from './Verlauf';
import { LOGO, MARKE, ZWECK } from '../kern/marke';
import { IST_DEMO, seite } from '../kern/pfad';
import { Sprachwahl } from '../sprachen/Sprachwahl';
import { findeSprache, sprachSpeicher } from '../sprachen/sprachen';

/** Das Arztfenster: Module wählen, steuern, sehen was der Patient sieht. */
export function ArztAnsicht({ sitzung }: { sitzung: Sitzung }) {
  const stand = useSitzung(sitzung);
  const { zustand } = stand;
  const modul = findeModul(zustand.aktivesModul);

  const waehleModul = (id: string | null) =>
    sitzung.aendere((alt) => (alt.aktivesModul === id ? alt : { ...alt, aktivesModul: id }));

  const springe = useCallback(
    (schluessel: string) => sitzung.aendere((alt) => springeZu(alt, schluessel)),
    [sitzung],
  );

  // Was der Patient länger als einen Augenblick sieht, kommt in den Verlauf (für den
  // Handzettel). Ein neuer Wert derselben Messgröße ersetzt den alten Eintrag.
  const schluessel = aktuellerSchluessel(zustand);
  useEffect(() => {
    if (!schluessel) return;
    const zeit = window.setTimeout(() => {
      sitzung.aendere((alt) => {
        if (alt.gezeigt.includes(schluessel)) return alt;
        const stamm = stammVon(schluessel);
        const stelle = alt.gezeigt.findIndex((g) => stammVon(g) === stamm);
        const gezeigt =
          stelle >= 0
            ? alt.gezeigt.map((g, i) => (i === stelle ? schluessel : g))
            : [...alt.gezeigt, schluessel];
        return { ...alt, gezeigt };
      });
    }, 1500);
    return () => window.clearTimeout(zeit);
  }, [schluessel, sitzung]);

  // Die Handzettel-Seite (eigenes Fenster) liest die Liste aus dem lokalen Speicher.
  useEffect(() => {
    try {
      localStorage.setItem(handzettelSpeicher(sitzung.raum), JSON.stringify(zustand.gezeigt));
    } catch {
      // Ohne Speicher gibt es keinen Handzettel; die Aufklärung selbst läuft weiter.
    }
  }, [zustand.gezeigt, sitzung.raum]);

  // Auch die Sprache: Der Handzettel erscheint in der Sprache, die der Patient gerade liest.
  const sprache = zustand.sprache ?? 'de';
  useEffect(() => {
    try {
      localStorage.setItem(sprachSpeicher(sitzung.raum), sprache);
    } catch {
      // Ohne Speicher startet der Handzettel auf Deutsch und lässt sich dort umstellen.
    }
  }, [sprache, sitzung.raum]);

  // Der Zeiger gehört zu dem Bild, auf das gezeigt wurde: Ändert sich das Bild, verschwindet er.
  const modulStand = zustand.aktivesModul ? zustand.module[zustand.aktivesModul] : undefined;
  useEffect(() => {
    sitzung.aendere((alt) => (alt.zeiger ? { ...alt, zeiger: null } : alt));
  }, [sitzung, zustand.aktivesModul, modulStand, zustand.verdeckt]);

  const schalteVerdeckt = useCallback(
    () => sitzung.aendere((alt) => ({ ...alt, verdeckt: !alt.verdeckt })),
    [sitzung],
  );

  // Taste B: Bühne verdecken / wieder zeigen (nicht, während man in ein Feld tippt).
  useEffect(() => {
    const beiTaste = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() !== 'b' || e.ctrlKey || e.metaKey || e.altKey) return;
      const ziel = e.target as HTMLElement | null;
      if (ziel?.closest('input, textarea, select, [contenteditable="true"]')) return;
      schalteVerdeckt();
    };
    window.addEventListener('keydown', beiTaste);
    return () => window.removeEventListener('keydown', beiTaste);
  }, [schalteVerdeckt]);

  return (
    <div className="arzt">
      <nav className="leiste" aria-label="Module">
        <div className="leiste__kopf">
          <img src={LOGO} alt="" className="leiste__logo" />
          <span className="leiste__titel">{MARKE.app}</span>
        </div>

        <ul className="leiste__liste">
          <li>
            <button
              type="button"
              className="leiste__eintrag"
              aria-current={zustand.aktivesModul === null ? 'page' : undefined}
              onClick={() => waehleModul(null)}
            >
              <Home size={18} strokeWidth={1.75} aria-hidden="true" />
              Übersicht
            </button>
          </li>
          {alleModule.map((m) => (
            <li key={m.id}>
              <button
                type="button"
                className="leiste__eintrag"
                aria-current={zustand.aktivesModul === m.id ? 'page' : undefined}
                onClick={() => waehleModul(m.id)}
              >
                <m.symbol size={18} strokeWidth={1.75} aria-hidden="true" />
                {m.titel}
              </button>
            </li>
          ))}
        </ul>

        <div className="leiste__fuss">
          <NeueSitzung beiBestaetigung={() => sitzung.aendere(() => ({ ...LEERE_SITZUNG }))} />
          {IST_DEMO && <p className="leiste__zweck">{ZWECK}</p>}
          <a className="leiste__info" href={seite('/info')} target="_blank" rel="noreferrer">
            <Info size={16} strokeWidth={1.75} aria-hidden="true" />
            {IST_DEMO ? 'Quellen, Hinweise, Impressum' : 'Quellen und Lizenzen'}
          </a>
        </div>
      </nav>

      <main className="arbeit">
        <Suche beiWahl={springe} />
        {modul ? (
          <ModulSteuerung
            key={modul.id}
            modul={modul}
            sitzung={sitzung}
            stand={stand}
            beiSprung={springe}
          />
        ) : (
          <Uebersicht beiWahl={waehleModul} />
        )}
      </main>

      <Monitor
        stand={stand}
        raum={sitzung.raum}
        beiVerdecken={schalteVerdeckt}
        beiSprache={(code) =>
          sitzung.aendere((alt) => ((alt.sprache ?? 'de') === code ? alt : { ...alt, sprache: code }))
        }
        beiZeiger={(zeiger) =>
          sitzung.aendere((alt) =>
            alt.zeiger === zeiger || (!alt.zeiger && !zeiger) ? alt : { ...alt, zeiger },
          )
        }
        beiSprung={springe}
        beiEntfernen={(weg) =>
          sitzung.aendere((alt) => ({ ...alt, gezeigt: alt.gezeigt.filter((g) => g !== weg) }))
        }
      />
    </div>
  );
}

function ModulSteuerung({
  modul,
  sitzung,
  stand,
  beiSprung,
}: {
  modul: BeliebigesModul;
  sitzung: Sitzung;
  stand: Schnappschuss;
  beiSprung: (schluessel: string) => void;
}) {
  // Querverweise auch dann zeigen, wenn die Bühne gerade verdeckt ist.
  const passend = verwandteVon(aktuellerSchluessel({ ...stand.zustand, verdeckt: false }));

  const aendern = useCallback(
    (aenderung: object | ((alt: object) => object)) =>
      sitzung.aendere((alt) => {
        const bisher = modulZustand(alt, modul);
        const neu =
          typeof aenderung === 'function' ? aenderung(bisher) : { ...bisher, ...aenderung };
        return { ...alt, module: { ...alt.module, [modul.id]: neu } };
      }),
    [sitzung, modul],
  );

  return (
    <>
      <header className="arbeit__kopf">
        <h1>{modul.titel}</h1>
        <p>{modul.beschreibung}</p>
      </header>
      {passend.length > 0 && (
        <nav className="passend" aria-label="Passt dazu">
          <span className="passend__titel">Passt dazu</span>
          <ul>
            {passend.map((f) => (
              <li key={f.schluessel}>
                <button
                  type="button"
                  className="passend__eintrag"
                  title={f.modul.verzeichnis?.art}
                  onClick={() => beiSprung(f.schluessel)}
                >
                  <f.modul.symbol size={16} strokeWidth={1.75} aria-hidden="true" />
                  {f.eintrag.titel}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}
      <Fehlergrenze
        ersatz={
          <p className="meldung" role="alert">
            <TriangleAlert size={18} strokeWidth={1.75} aria-hidden="true" />
            In diesem Modul ist ein Fehler aufgetreten. Der Patient sieht das Ruhebild. Seite neu
            laden (F5), um es erneut zu versuchen.
          </p>
        }
      >
        <modul.Steuerung zustand={modulZustand(stand.zustand, modul)} aendern={aendern} />
      </Fehlergrenze>
    </>
  );
}

function Uebersicht({ beiWahl }: { beiWahl: (id: string) => void }) {
  return (
    <>
      <header className="arbeit__kopf">
        <h1>Was möchten Sie zeigen?</h1>
        <p>
          Solange kein Modul gewählt ist, sieht der Patient {MARKE.ruhebild}.
        </p>
      </header>
      {alleModule.length === 0 ? (
        <p className="meldung">
          Noch keine Module vorhanden. Ein neues Modul entsteht als Ordner unter{' '}
          <code>src/module/</code> – siehe <code>src/module/_vorlage</code>.
        </p>
      ) : (
        <ul className="modulwahl">
          {alleModule.map((m) => (
            <li key={m.id}>
              <button type="button" className="modulwahl__eintrag" onClick={() => beiWahl(m.id)}>
                <m.symbol size={26} strokeWidth={1.5} aria-hidden="true" />
                <span>
                  <strong>{m.titel}</strong>
                  <span>{m.beschreibung}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

function Monitor({
  stand,
  raum,
  beiVerdecken,
  beiSprache,
  beiZeiger,
  beiSprung,
  beiEntfernen,
}: {
  stand: Schnappschuss;
  raum: string;
  beiVerdecken: () => void;
  beiSprache: (code: string) => void;
  beiZeiger: (zeiger: { x: number; y: number } | null) => void;
  beiSprung: (schluessel: string) => void;
  beiEntfernen: (schluessel: string) => void;
}) {
  const { zustand, praesenz, verbindung } = stand;
  const [blockiert, setBlockiert] = useState(false);
  const sprache = findeSprache(zustand.sprache);
  const [fehlend, setFehlend] = useState<string[]>([]);

  // Zeigen: In der Vorschau klicken oder ziehen setzt beim Patienten einen Leuchtpunkt.
  const zeigbar = !zustand.verdeckt && zustand.aktivesModul !== null;
  const zieht = useRef(false);
  const zeigeAuf = (e: PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const grenze = (n: number) => Math.round(Math.min(Math.max(n, 0), 1) * 1000) / 1000;
    beiZeiger({
      x: grenze((e.clientX - r.left) / r.width),
      y: grenze((e.clientY - r.top) / r.height),
    });
  };

  useEffect(() => {
    if (!zustand.zeiger) return;
    const beiTaste = (e: KeyboardEvent) => {
      if (e.key === 'Escape') beiZeiger(null);
    };
    window.addEventListener('keydown', beiTaste);
    return () => window.removeEventListener('keydown', beiTaste);
  }, [zustand.zeiger, beiZeiger]);

  const oeffne = async () => setBlockiert(!(await oeffnePatientenfenster(raum)));

  let lage: 'gut' | 'offen' | 'schlecht';
  let text: string;
  if (verbindung !== 'verbunden') {
    lage = 'schlecht';
    text =
      verbindung === 'verbindet'
        ? 'Verbindung wird aufgebaut …'
        : 'Keine Verbindung zum Programm – wird neu versucht';
  } else if (praesenz.buehne === 0) {
    lage = 'offen';
    text = 'Patientenbildschirm ist noch nicht geöffnet';
  } else {
    lage = 'gut';
    text =
      praesenz.buehne === 1
        ? 'Patientenbildschirm verbunden'
        : `${praesenz.buehne} Patientenbildschirme verbunden`;
  }

  return (
    <aside className="monitor" aria-label="Patientenbildschirm">
      <h2>Patientenbildschirm</h2>

      <RaumWahl raum={raum} />

      <Sprachwahl
        code={sprache.code}
        beiWahl={beiSprache}
        beschriftung="Sprache für Bildschirm und Handzettel"
      />

      <div
        className="monitor__bild"
        data-verdeckt={zustand.verdeckt}
        data-zeigbar={zeigbar}
        onPointerDown={(e) => {
          if (!zeigbar || e.button !== 0) return;
          e.currentTarget.setPointerCapture(e.pointerId);
          zieht.current = true;
          zeigeAuf(e);
        }}
        onPointerMove={(e) => {
          if (zieht.current) zeigeAuf(e);
        }}
        onPointerUp={() => {
          zieht.current = false;
        }}
        onPointerCancel={() => {
          zieht.current = false;
        }}
      >
        <BuehnenInhalt zustand={zustand} vorschau beiFehlend={setFehlend} />
      </div>
      <p className="monitor__unterzeile">
        {zustand.verdeckt
          ? 'Verdeckt – der Patient sieht das Ruhebild.'
          : zeigbar
            ? 'So sieht es der Patient gerade. Ins Bild klicken oder ziehen, um auf etwas zu zeigen.'
            : 'So sieht es der Patient gerade.'}
      </p>
      {sprache.code !== 'de' && !zustand.verdeckt && fehlend.length > 0 && (
        <p className="monitor__sprachluecke" role="status">
          <Languages size={16} strokeWidth={1.75} aria-hidden="true" />
          <span>
            {fehlend.length === 1
              ? `Ein Text auf diesem Bild fehlt noch auf ${sprache.name} und erscheint auf Deutsch.`
              : `${fehlend.length} Texte auf diesem Bild fehlen noch auf ${sprache.name} und erscheinen auf Deutsch.`}
          </span>
        </p>
      )}
      {IST_DEMO && sprache.code !== 'de' && (
        <p className="monitor__sprachluecke">
          <Languages size={16} strokeWidth={1.75} aria-hidden="true" />
          <span>
            Die Übersetzungen sind maschinell erstellt und nicht gegengelesen. Fehler bitte an{' '}
            <a href="mailto:florian.rasche+asklaion@googlemail.com">
              florian.rasche+asklaion@googlemail.com
            </a>
            .
          </span>
        </p>
      )}
      {zustand.zeiger && (
        <button type="button" className="monitor__zeiger-weg" onClick={() => beiZeiger(null)}>
          <MousePointerClick size={16} strokeWidth={1.75} aria-hidden="true" />
          Zeiger ausblenden
          <kbd>Esc</kbd>
        </button>
      )}

      <p className="status" data-lage={lage} role="status">
        <span className="status__punkt" aria-hidden="true" />
        {text}
      </p>

      <div className="monitor__knoepfe">
        <button
          type="button"
          className={praesenz.buehne === 0 ? 'knopf knopf--haupt' : 'knopf'}
          onClick={oeffne}
        >
          <MonitorUp size={18} strokeWidth={1.75} aria-hidden="true" />
          Patientenbildschirm öffnen
        </button>
        <button
          type="button"
          className="knopf"
          aria-pressed={zustand.verdeckt}
          onClick={beiVerdecken}
        >
          {zustand.verdeckt ? (
            <Eye size={18} strokeWidth={1.75} aria-hidden="true" />
          ) : (
            <EyeOff size={18} strokeWidth={1.75} aria-hidden="true" />
          )}
          {zustand.verdeckt ? 'Bühne wieder zeigen' : 'Bühne verdecken'}
          <kbd>B</kbd>
        </button>
      </div>

      {blockiert && (
        <p className="meldung" role="alert">
          <TriangleAlert size={18} strokeWidth={1.75} aria-hidden="true" />
          Der Browser hat das Fenster blockiert. Bitte Pop-ups für diese Seite erlauben und noch
          einmal klicken.
        </p>
      )}

      <Verlauf
        gezeigt={zustand.gezeigt}
        raum={raum}
        beiSprung={beiSprung}
        beiEntfernen={beiEntfernen}
      />

      <p className="monitor__tipp">
        Das Fenster auf den Patientenmonitor ziehen und dort einmal anklicken – dann füllt es den
        ganzen Bildschirm.
        {IST_DEMO &&
          ' In dieser Demo läuft der Abgleich ohne Server: Steuerung und Patientenfenster müssen im selben Browser auf demselben Rechner geöffnet sein. Ein Tablet oder zweiter Rechner als Patientenbildschirm geht nur in der installierten Fassung.'}
      </p>
    </aside>
  );
}

/**
 * Zeigt, welches Behandlungszimmer dieses Fenster steuert, und lässt es wechseln.
 * Jedes Zimmer hat eigene Steuerung und eigenen Patientenbildschirm.
 */
function RaumWahl({ raum }: { raum: string }) {
  const [bearbeiten, setBearbeiten] = useState(false);
  const [eingabe, setEingabe] = useState(raumAnzeige(raum));
  const feld = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (bearbeiten) feld.current?.select();
  }, [bearbeiten]);

  if (!bearbeiten) {
    return (
      <div className="raum">
        <span className="raum__name">
          Raum <strong>{raumAnzeige(raum)}</strong>
        </span>
        <button type="button" className="raum__wechsel" onClick={() => setBearbeiten(true)}>
          Wechseln
        </button>
      </div>
    );
  }

  const neu = normalisiereRaum(eingabe);
  return (
    <form
      className="raum raum--bearbeiten"
      onSubmit={(e) => {
        e.preventDefault();
        if (neu === raum) setBearbeiten(false);
        else wechsleRaum(neu);
      }}
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          setEingabe(raumAnzeige(raum));
          setBearbeiten(false);
        }
      }}
    >
      <label htmlFor="raum-eingabe">Name des Raums, z. B. Zimmer 2</label>
      <input
        id="raum-eingabe"
        ref={feld}
        value={eingabe}
        maxLength={40}
        autoComplete="off"
        spellCheck={false}
        onChange={(e) => setEingabe(e.target.value)}
      />
      <p className="raum__hinweis">
        Auf jedem Rechner einen eigenen Namen wählen. Der Patientenbildschirm folgt dem Raum.
      </p>
      <div className="raum__knoepfe">
        <button type="submit" className="knopf knopf--haupt">
          Übernehmen
        </button>
        <button
          type="button"
          className="knopf"
          onClick={() => {
            setEingabe(raumAnzeige(raum));
            setBearbeiten(false);
          }}
        >
          Abbrechen
        </button>
      </div>
    </form>
  );
}

/** Zurücksetzen mit zweitem Klick als Bestätigung – ohne Dialogfenster. */
function NeueSitzung({ beiBestaetigung }: { beiBestaetigung: () => void }) {
  const [scharf, setScharf] = useState(false);
  const zeit = useRef<number>();

  useEffect(() => () => window.clearTimeout(zeit.current), []);

  const klick = () => {
    window.clearTimeout(zeit.current);
    if (scharf) {
      setScharf(false);
      beiBestaetigung();
    } else {
      setScharf(true);
      zeit.current = window.setTimeout(() => setScharf(false), 4000);
    }
  };

  return (
    <button type="button" className="leiste__neu" data-scharf={scharf} onClick={klick}>
      <RotateCcw size={18} strokeWidth={1.75} aria-hidden="true" />
      <span aria-live="polite">{scharf ? 'Wirklich alles zurücksetzen?' : 'Neue Sitzung'}</span>
    </button>
  );
}
