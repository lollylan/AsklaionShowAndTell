import { useMemo, useState, type Dispatch, type SetStateAction } from 'react';
import { Vorgabe } from './Vorgabe';
import {
  ArrowDown,
  ArrowUp,
  Check,
  ChevronUp,
  Info,
  MonitorSmartphone,
  Play,
  Plus,
  Printer,
  RotateCcw,
  Search,
  SlidersHorizontal,
  Tablet,
  X,
} from 'lucide-react';
import { alleModule } from '../kern/register';
import { findeFundstelle, schluesselVon, sucheUeberall, type Fundstelle } from '../kern/verzeichnis';
import { LOGO, MARKE, ZWECK } from '../kern/marke';
import { IST_DEMO, seite } from '../kern/pfad';
import { wechsleModus } from '../kern/modus';
import { Sprachwahl } from '../sprachen/Sprachwahl';
import type { Thema } from './ablauf';

const MODULE = alleModule.filter((m) => (m.verzeichnis?.eintraege.length ?? 0) > 0);

interface Props {
  raum: string;
  ablauf: Thema[];
  setAblauf: Dispatch<SetStateAction<string[]>>;
  sprache: string;
  setSprache: (code: string) => void;
  gezeigt: string[];
  /** Eingaben vor dem Zeigen, je Thema (siehe TabletAnsicht). */
  vorgaben: Record<string, object>;
  setVorgabe: (schluessel: string, zustand: object) => void;
  /** Zeigt sofort; `mit` sind Eingaben, die noch nicht in `vorgaben` stehen. */
  beiStart: (schluessel: string[], mit?: Record<string, object>) => void;
  beiNeu: () => void;
}

/** Auswahl im Tablet-Modus: links alle Themen, rechts der Ablauf aus den angehakten. */
export function Auswahl({
  raum,
  ablauf,
  setAblauf,
  sprache,
  setSprache,
  gezeigt,
  vorgaben,
  setVorgabe,
  beiStart,
  beiNeu,
}: Props) {
  const [frage, setFrage] = useState('');
  const [modulId, setModulId] = useState(
    (MODULE.find((m) => m.id === 'aufklaerungen') ?? MODULE[0])?.id ?? '',
  );
  const [ablaufOffen, setAblaufOffen] = useState(false);
  const sucht = frage.trim() !== '';
  /** Thema, dessen Eingaben gerade abgefragt werden, und wozu. */
  const [fragt, setFragt] = useState<{
    fund: Fundstelle;
    zweck: 'zeigen' | 'ablauf' | 'aendern';
  } | null>(null);

  const liste: Fundstelle[] = useMemo(() => {
    if (sucht) return sucheUeberall(frage, 60);
    const modul = MODULE.find((m) => m.id === modulId);
    return (modul?.verzeichnis?.eintraege ?? [])
      .map((e) => findeFundstelle(schluesselVon(modul!.id, e.id)))
      .filter((f): f is Fundstelle => Boolean(f));
  }, [sucht, frage, modulId]);

  const stelleImAblauf = (schluessel: string) => ablauf.findIndex((t) => t.schluessel === schluessel);
  const schalte = (schluessel: string) =>
    setAblauf((alt) =>
      alt.includes(schluessel) ? alt.filter((s) => s !== schluessel) : [...alt, schluessel],
    );
  const schiebe = (nr: number, um: -1 | 1) =>
    setAblauf((alt) => {
      const ziel = nr + um;
      if (ziel < 0 || ziel >= alt.length) return alt;
      const neu = [...alt];
      [neu[nr], neu[ziel]] = [neu[ziel], neu[nr]];
      return neu;
    });

  const druckbar = gezeigt.filter((s) => findeFundstelle(s)?.modul.verzeichnis?.Handzettel).length;
  const bilder = ablauf.reduce((summe, t) => summe + t.bilder.length, 0);

  return (
    <div className="tab">
      <header className="tab__kopf">
        <img src={LOGO} alt="" className="tab__logo" />
        <span className="tab__marke">{MARKE.app}</span>

        <div className="tab__modus" role="group" aria-label="Darstellung auf diesem Gerät">
          <button type="button" onClick={() => wechsleModus('pc', seite('/'))}>
            <MonitorSmartphone size={18} strokeWidth={1.75} aria-hidden="true" />
            Zwei Bildschirme
          </button>
          <button type="button" aria-pressed="true">
            <Tablet size={18} strokeWidth={1.75} aria-hidden="true" />
            Tablet
          </button>
        </div>

        <a className="tab__info" href={seite('/info')} target="_blank" rel="noreferrer">
          <Info size={18} strokeWidth={1.75} aria-hidden="true" />
          <span>{IST_DEMO ? 'Quellen, Hinweise, Impressum' : 'Quellen und Lizenzen'}</span>
        </a>
      </header>

      <main className="tab__wahl">
        <h1>Was möchten Sie zeigen?</h1>
        <p className="tab__anleitung">
          Ein Thema antippen zeigt es sofort. Das Plus davor legt es in den Ablauf, wenn Sie mehrere
          Themen nacheinander zeigen möchten.
        </p>

        <label className="tab__suche">
          <Search size={20} strokeWidth={1.75} aria-hidden="true" />
          <span className="nur-vorlesen">In allen Bereichen suchen</span>
          <input
            type="search"
            value={frage}
            autoComplete="off"
            spellCheck={false}
            placeholder="Suchen: Krankheit, Medikament, Organ, Wert …"
            onChange={(e) => setFrage(e.target.value)}
          />
        </label>

        {!sucht && (
          <div className="tab__bereiche" role="group" aria-label="Bereich">
            {MODULE.map((m) => (
              <button
                key={m.id}
                type="button"
                className="tab__bereich"
                aria-pressed={m.id === modulId}
                onClick={() => setModulId(m.id)}
              >
                <m.symbol size={18} strokeWidth={1.75} aria-hidden="true" />
                {m.titel}
              </button>
            ))}
          </div>
        )}

        {liste.length === 0 ? (
          <p className="tab__leer">
            Nichts gefunden zu „{frage.trim()}“. Die Suche kennt auch Fachbegriffe und Handelsnamen.
          </p>
        ) : (
          <ul className="tab__themen">
            {liste.map((f) => {
              const stelle = stelleImAblauf(f.schluessel);
              const drin = stelle >= 0;
              return (
                <li key={f.schluessel} className="tab__thema" data-drin={drin}>
                  <button
                    type="button"
                    className="tab__haken"
                    aria-pressed={drin}
                    aria-label={
                      drin
                        ? `${f.eintrag.titel} aus dem Ablauf nehmen`
                        : `${f.eintrag.titel} in den Ablauf legen`
                    }
                    onClick={() =>
                      !drin && f.modul.verzeichnis?.Vorgabe
                        ? setFragt({ fund: f, zweck: 'ablauf' })
                        : schalte(f.schluessel)
                    }
                  >
                    {drin ? (
                      <Check size={20} strokeWidth={2.25} aria-hidden="true" />
                    ) : (
                      <Plus size={20} strokeWidth={1.75} aria-hidden="true" />
                    )}
                  </button>
                  <button
                    type="button"
                    className="tab__zeigen"
                    onClick={() =>
                      f.modul.verzeichnis?.Vorgabe
                        ? setFragt({ fund: f, zweck: 'zeigen' })
                        : beiStart([f.schluessel])
                    }
                  >
                    <span className="tab__titel">
                      <strong>{f.eintrag.titel}</strong>
                      <span>
                        {sucht
                          ? [f.modul.verzeichnis?.art, f.eintrag.zusatz].filter(Boolean).join(' · ')
                          : f.eintrag.zusatz}
                      </span>
                    </span>
                    <Play size={18} strokeWidth={1.75} aria-hidden="true" />
                  </button>
                </li>
              );
            })}
          </ul>
        )}

        {IST_DEMO && <p className="tab__zweck">{ZWECK}</p>}
      </main>

      <aside className="tab__seite" aria-label="Ablauf und Einstellungen" data-offen={ablaufOffen}>
        <button
          type="button"
          className="tab__griff"
          aria-expanded={ablaufOffen}
          onClick={() => setAblaufOffen((o) => !o)}
        >
          <span>
            <strong>Ablauf</strong>
            {ablauf.length === 0
              ? 'noch leer'
              : `${ablauf.length} ${ablauf.length === 1 ? 'Thema' : 'Themen'}, ${bilder} Bilder`}
          </span>
          <ChevronUp size={20} strokeWidth={1.75} aria-hidden="true" />
        </button>

        <div className="tab__seiteninhalt">
          <section aria-labelledby="tab-ablauf">
            <h2 id="tab-ablauf">Ablauf</h2>
            {ablauf.length === 0 ? (
              <p className="tab__hinweis">
                Noch nichts angehakt. Themen mit dem Plus hier hineinlegen, dann laufen sie in
                dieser Reihenfolge nacheinander.
              </p>
            ) : (
              <ol className="tab__reihe">
                {ablauf.map((t, i) => (
                  <li key={t.schluessel}>
                    <span className="tab__nr" aria-hidden="true">
                      {i + 1}
                    </span>
                    <span className="tab__titel">
                      <strong>{t.eintrag.titel}</strong>
                      <span>
                        {(t.start && t.modul.verzeichnis?.vorgabeText?.(t.eintrag.id, t.start)) ||
                          `${t.modul.titel} · ${t.bilder.length === 1 ? '1 Bild' : `${t.bilder.length} Bilder`}`}
                      </span>
                    </span>
                    {t.modul.verzeichnis?.Vorgabe && (
                      <button
                        type="button"
                        className="tab__klein"
                        aria-label={`Wert zu ${t.eintrag.titel} ändern`}
                        onClick={() => setFragt({ fund: t, zweck: 'aendern' })}
                      >
                        <SlidersHorizontal size={18} strokeWidth={1.75} aria-hidden="true" />
                      </button>
                    )}
                    <button
                      type="button"
                      className="tab__klein"
                      disabled={i === 0}
                      aria-label={`${t.eintrag.titel} nach vorn`}
                      onClick={() => schiebe(i, -1)}
                    >
                      <ArrowUp size={18} strokeWidth={1.75} aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      className="tab__klein"
                      disabled={i === ablauf.length - 1}
                      aria-label={`${t.eintrag.titel} nach hinten`}
                      onClick={() => schiebe(i, 1)}
                    >
                      <ArrowDown size={18} strokeWidth={1.75} aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      className="tab__klein"
                      aria-label={`${t.eintrag.titel} aus dem Ablauf nehmen`}
                      onClick={() => schalte(t.schluessel)}
                    >
                      <X size={18} strokeWidth={1.75} aria-hidden="true" />
                    </button>
                  </li>
                ))}
              </ol>
            )}
          </section>

          <Sprachwahl code={sprache} beiWahl={setSprache} beschriftung="Sprache für den Patienten" />
          {IST_DEMO && sprache !== 'de' && (
            <p className="tab__hinweis">
              Die Übersetzungen sind maschinell erstellt und nicht gegengelesen. Was noch fehlt,
              erscheint auf Deutsch.
            </p>
          )}

          <div className="tab__weiteres">
            {druckbar > 0 && (
              <button
                type="button"
                className="knopf"
                onClick={() =>
                  window.open(
                    `${seite('/handzettel')}?raum=${encodeURIComponent(raum)}`,
                    'aufklaerung-handzettel',
                  )
                }
              >
                <Printer size={18} strokeWidth={1.75} aria-hidden="true" />
                Handzettel zum Gezeigten
              </button>
            )}
            {(ablauf.length > 0 || gezeigt.length > 0 || sprache !== 'de') && (
              <button type="button" className="knopf" onClick={beiNeu}>
                <RotateCcw size={18} strokeWidth={1.75} aria-hidden="true" />
                Neue Sitzung
              </button>
            )}
          </div>
        </div>

        <button
          type="button"
          className="knopf knopf--haupt tab__start"
          disabled={ablauf.length === 0}
          onClick={() => beiStart(ablauf.map((t) => t.schluessel))}
        >
          <Play size={18} strokeWidth={1.75} aria-hidden="true" />
          Ablauf zeigen
        </button>
      </aside>

      {fragt && (
        <Vorgabe
          key={fragt.fund.schluessel}
          fund={fragt.fund}
          bisher={vorgaben[fragt.fund.schluessel]}
          zweck={fragt.zweck}
          beiAbbruch={() => setFragt(null)}
          beiFertig={(zustand) => {
            const { schluessel } = fragt.fund;
            setVorgabe(schluessel, zustand);
            if (fragt.zweck === 'ablauf') schalte(schluessel);
            setFragt(null);
            if (fragt.zweck === 'zeigen') beiStart([schluessel], { [schluessel]: zustand });
          }}
        />
      )}
    </div>
  );
}
