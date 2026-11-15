import '../aufklaerungen/steuerung.css';
import '../anatomie/buehne.css';
import './steuerung.css';
import { useEffect, useState } from 'react';
import {
  Check,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Maximize2,
  MonitorPlay,
  Plus,
  RotateCcw,
  Search,
} from 'lucide-react';
import type { SteuerungProps } from '../../kern/typen';
import type { OrthopaedieZustand } from './index';
import {
  EVIDENZ,
  GEBIETE,
  KRANKHEITSBILDER,
  UEBUNGEN,
  bildgebungVon,
  findeKrankheitsbild,
  findeUebung,
  seitenVon,
  sucheKrankheitsbilder,
  sucheUebungen,
  uebungenVon,
  type Krankheitsbild,
  type Uebung,
} from './daten';
import { Belegmass, startBlick } from './Buehne';
import { findeRegion, findeStruktur } from '../anatomie/daten';
import Modell from '../anatomie/Modell';
import { seite } from '../../kern/pfad';

/** Öffnet das Übungsblatt mit den genannten Übungen in einem neuen Fenster. */
function oeffneBlatt(ids: string[]) {
  const suche = ids.length ? `?u=${ids.map(encodeURIComponent).join(',')}` : '';
  window.open(`${seite('/uebungsblatt')}${suche}`, '_blank', 'noopener');
}

export function Steuerung({ zustand, aendern }: SteuerungProps<OrthopaedieZustand>) {
  const [frage, setFrage] = useState('');
  const offen = findeKrankheitsbild(zustand.thema);
  const einzeln = !offen ? findeUebung(zustand.uebung) : undefined;
  const seiten = offen ? seitenVon(offen) : [];
  const anzahl = seiten.length;
  const seite = Math.min(Math.max(zustand.seite, 0), Math.max(anzahl - 1, 0));
  const treffer = sucheKrankheitsbilder(frage);
  const uebungsTreffer = sucheUebungen(frage);

  const waehle = (id: string) =>
    aendern((alt) =>
      alt.thema === id
        ? { ...alt, thema: null, seite: 0, uebung: null, blick: null }
        : { ...alt, thema: id, seite: 0, uebung: null, blick: null },
    );
  const blaettere = (nr: number) => aendern({ seite: nr, uebung: null });
  const merke = (id: string) =>
    aendern((alt) => ({
      ...alt,
      blatt: alt.blatt.includes(id) ? alt.blatt.filter((b) => b !== id) : [...alt.blatt, id],
    }));

  useEffect(() => {
    if (!offen) return;
    const taste = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.altKey || e.ctrlKey || e.metaKey) return;
      if (e.key === 'ArrowRight')
        aendern((alt) => ({ ...alt, uebung: null, seite: Math.min(alt.seite + 1, anzahl - 1) }));
      if (e.key === 'ArrowLeft')
        aendern((alt) => ({ ...alt, uebung: null, seite: Math.max(alt.seite - 1, 0) }));
    };
    window.addEventListener('keydown', taste);
    return () => window.removeEventListener('keydown', taste);
  }, [offen, anzahl, aendern]);

  return (
    <div className="aufk ortho">
      {offen && (
        <section className="aufk__pult" aria-labelledby="ortho-pult">
          <p className="aufk__laeuft" role="status">
            <MonitorPlay size={18} strokeWidth={1.75} aria-hidden="true" />
            <span id="ortho-pult">
              Der Patient sieht <strong>{offen.name}</strong>, {seiten[seite].kurz} ({seite + 1}{' '}
              von {anzahl}).
            </span>
            <button
              type="button"
              className="knopf"
              onClick={() => aendern({ thema: null, seite: 0, uebung: null, blick: null })}
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
              onClick={() => blaettere(seite - 1)}
            >
              <ChevronLeft size={18} strokeWidth={1.75} aria-hidden="true" />
            </button>
            {seiten.map((s, i) => (
              <button
                key={s.id}
                type="button"
                className="knopf"
                aria-pressed={seite === i}
                onClick={() => blaettere(i)}
              >
                {s.kurz}
              </button>
            ))}
            <button
              type="button"
              className="knopf knopf--haupt"
              disabled={seite === anzahl - 1}
              onClick={() => blaettere(seite + 1)}
            >
              Weiter
              <ChevronRight size={18} strokeWidth={1.75} aria-hidden="true" />
            </button>
          </div>

          <Spickzettel
            bild={offen}
            art={seiten[seite].id}
            zustand={zustand}
            aendern={aendern}
            merke={merke}
          />
          <p className="aufk__hilfe">Die Pfeiltasten ← → blättern ebenfalls.</p>
        </section>
      )}

      {einzeln && (
        <section className="aufk__pult" aria-labelledby="ortho-einzeln">
          <p className="aufk__laeuft" role="status">
            <MonitorPlay size={18} strokeWidth={1.75} aria-hidden="true" />
            <span id="ortho-einzeln">
              Der Patient sieht die Übung <strong>{einzeln.name}</strong>.
            </span>
            <button type="button" className="knopf" onClick={() => aendern({ uebung: null })}>
              Schließen
            </button>
          </p>
          <UebungZeile uebung={einzeln} zustand={zustand} aendern={aendern} merke={merke} />
        </section>
      )}

      <Blattleiste zustand={zustand} aendern={aendern} offen={offen} />

      <section aria-labelledby="ortho-wahl">
        <h2 id="ortho-wahl">Krankheitsbild wählen</h2>
        <label className="aufk__suche">
          <Search size={18} strokeWidth={1.75} aria-hidden="true" />
          <span className="nur-vorlesen">Krankheitsbild oder Übung suchen</span>
          <input
            type="search"
            value={frage}
            placeholder="Suchen, z. B. Ferse, Knie, Ischias oder Dehnen"
            onChange={(e) => setFrage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && treffer.length === 1) waehle(treffer[0].id);
            }}
          />
        </label>

        {treffer.length === 0 && uebungsTreffer.length === 0 && (
          <p className="aufk__leer">
            Zu „{frage}“ gibt es nichts. Vorhanden sind {KRANKHEITSBILDER.length} Krankheitsbilder
            und {UEBUNGEN.length} Übungen – die Suche findet auch Fachbegriffe.
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

      {uebungsTreffer.length > 0 && (
        <section aria-labelledby="ortho-katalog">
          <h2 id="ortho-katalog">Alle Übungen</h2>
          <p className="aufk__hilfe ortho__vorab">
            Einzeln groß zeigen oder fürs Übungsblatt vormerken – auch quer über mehrere
            Krankheitsbilder.
          </p>
          <ul className="ortho__katalog">
            {uebungsTreffer.map((u) => (
              <li key={u.id}>
                <UebungZeile uebung={u} zustand={zustand} aendern={aendern} merke={merke} kurz />
              </li>
            ))}
          </ul>
        </section>
      )}

      <footer className="aufk__quellen">
        <p>
          <strong>Grundlage.</strong> Eigene Texte in Patientensprache nach den Leitlinien der AWMF
          (DGOU, DGOOC, DEGAM), NICE und Cochrane-Übersichten; die Quellen stehen oben in
          <code> src/module/orthopaedie/daten/</code>. „Gut belegt“ heißt: in Studien klar wirksam
          und von Leitlinien empfohlen. 3D-Modell: Z-Anatomy, CC BY-SA 4.0. Röntgen- und MRT-Bilder
          von Wikimedia Commons, Urheber und Lizenz stehen am Bild.
        </p>
      </footer>
    </div>
  );
}

type Aendern = SteuerungProps<OrthopaedieZustand>['aendern'];

function Spickzettel({
  bild,
  art,
  zustand,
  aendern,
  merke,
}: {
  bild: Krankheitsbild;
  art: ReturnType<typeof seitenVon>[number]['id'];
  zustand: OrthopaedieZustand;
  aendern: Aendern;
  merke: (id: string) => void;
}) {
  if (art === 'was' || art === 'ursachen') {
    const saetze = art === 'was' ? bild.was : bild.ursachen;
    return (
      <div className="aufk__spickzettel">
        <h3>{art === 'was' ? 'Was ist das?' : 'Wie entsteht das?'}</h3>
        <ul>
          {saetze.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </div>
    );
  }

  if (art === 'modell') return <ModellPult bild={bild} zustand={zustand} aendern={aendern} />;

  if (art === 'bild') {
    const gebung = bildgebungVon(bild.id)!;
    return (
      <div className="aufk__spickzettel">
        <h3>So sieht es im Bild aus</h3>
        <ul>
          {gebung.saetze.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
        <p className="ortho__quellen">
          {gebung.aufnahmen.map((a) => (
            <span key={a.datei}>
              {a.titel}:{' '}
              <a href={a.quelle} target="_blank" rel="noreferrer">
                {a.urheber}, {a.lizenz}
              </a>
            </span>
          ))}
        </p>
      </div>
    );
  }

  if (art === 'hilft') {
    return (
      <div className="aufk__spickzettel">
        <h3>Was hilft?</h3>
        <p className="ortho__verlauf">{bild.verlauf}</p>
        <ul className="ortho__therapien">
          {bild.therapien.map((t) => (
            <li key={t.name} data-evidenz={t.evidenz}>
              <span className="ortho__stufe">
                <Belegmass evidenz={t.evidenz} />
                {EVIDENZ[t.evidenz].kurz}
              </span>
              <span>
                <strong>{t.name}.</strong> {t.text}
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  const liste = uebungenVon(bild);
  const alleGemerkt = liste.every((u) => zustand.blatt.includes(u.id));
  return (
    <div className="aufk__spickzettel">
      <h3>Übungen</h3>
      <p className="ortho__vorab">
        Antippen zeigt eine Übung groß mit allen Schritten; „Übersicht“ führt zurück.
      </p>
      <ul className="ortho__katalog ortho__katalog--eng">
        {liste.map((u) => (
          <li key={u.id}>
            <UebungZeile uebung={u} zustand={zustand} aendern={aendern} merke={merke} />
          </li>
        ))}
      </ul>
      <div className="ortho__reihe">
        <button
          type="button"
          className="knopf"
          disabled={!zustand.uebung}
          onClick={() => aendern({ uebung: null })}
        >
          Übersicht
        </button>
        <button
          type="button"
          className="knopf"
          disabled={alleGemerkt}
          onClick={() =>
            aendern((alt) => ({
              ...alt,
              blatt: [...new Set([...alt.blatt, ...liste.map((u) => u.id)])],
            }))
          }
        >
          <Plus size={16} strokeWidth={1.75} aria-hidden="true" />
          Alle vormerken
        </button>
      </div>
      <p>
        <strong>Warnzeichen.</strong> {bild.warnung}
      </p>
    </div>
  );
}

function ModellPult({
  bild,
  zustand,
  aendern,
}: {
  bild: Krankheitsbild;
  zustand: OrthopaedieZustand;
  aendern: Aendern;
}) {
  const region = findeRegion(bild.modell.region);
  const struktur = findeStruktur(region, bild.modell.struktur);
  const b = zustand.blick ?? startBlick(bild);
  return (
    <div className="aufk__spickzettel ortho__modell">
      <h3>Wo genau?</h3>
      <div className="ortho__modellreihe">
        <div className="ortho__flaeche">
          {region && (
            <Modell
              key={bild.id}
              fokus={bild.modell.fokus}
              region={region}
              struktur={struktur?.id ?? null}
              aus={bild.modell.aus ?? []}
              drehY={b.drehY}
              neigX={b.neigX}
              zoom={b.zoom}
              vorschau
              beiBlick={(lage) => aendern({ blick: lage })}
            />
          )}
        </div>
        <div>
          <ul>
            {bild.modell.saetze.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
          <p className="ortho__vorab">
            Im Bild ziehen dreht, das Mausrad zoomt; der Patient sieht dieselbe Ansicht.
            Hervorgehoben: {struktur?.name ?? bild.modell.struktur}.
          </p>
          <button
            type="button"
            className="knopf"
            disabled={!zustand.blick}
            onClick={() => aendern({ blick: null })}
          >
            <RotateCcw size={16} strokeWidth={1.75} aria-hidden="true" />
            Ansicht zurücksetzen
          </button>
        </div>
      </div>
    </div>
  );
}

function UebungZeile({
  uebung,
  zustand,
  aendern,
  merke,
  kurz = false,
}: {
  uebung: Uebung;
  zustand: OrthopaedieZustand;
  aendern: Aendern;
  merke: (id: string) => void;
  kurz?: boolean;
}) {
  const gross = zustand.uebung === uebung.id;
  const gemerkt = zustand.blatt.includes(uebung.id);
  return (
    <div className="ortho__uebung" data-gross={gross}>
      <button
        type="button"
        className="ortho__uebungsname"
        aria-pressed={gross}
        onClick={() =>
          aendern((alt) =>
            // Aus dem Katalog: Übung allein zeigen. Auf der Übungsseite: groß statt Übersicht.
            kurz && alt.thema
              ? { ...alt, thema: null, seite: 0, uebung: gross ? null : uebung.id, blick: null }
              : { ...alt, uebung: gross ? null : uebung.id },
          )
        }
      >
        <Maximize2 size={15} strokeWidth={1.75} aria-hidden="true" />
        <strong>{uebung.name}</strong>
        <span>{uebung.dosis}</span>
      </button>
      <button
        type="button"
        className="knopf ortho__merken"
        aria-pressed={gemerkt}
        onClick={() => merke(uebung.id)}
        title={gemerkt ? 'Vom Übungsblatt nehmen' : 'Fürs Übungsblatt vormerken'}
      >
        {gemerkt ? (
          <Check size={16} strokeWidth={2} aria-hidden="true" />
        ) : (
          <Plus size={16} strokeWidth={1.75} aria-hidden="true" />
        )}
        <span>{gemerkt ? 'Auf dem Blatt' : 'Aufs Blatt'}</span>
      </button>
      {gross && !kurz && (
        <ol className="ortho__schritte">
          <li>{uebung.ausgang}</li>
          {uebung.schritte.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ol>
      )}
    </div>
  );
}

function Blattleiste({
  zustand,
  aendern,
  offen,
}: {
  zustand: OrthopaedieZustand;
  aendern: Aendern;
  offen: Krankheitsbild | undefined;
}) {
  const gemerkt = zustand.blatt.map(findeUebung).filter((u): u is Uebung => Boolean(u));
  const vorschlag = offen ? uebungenVon(offen).map((u) => u.id) : [];
  const ids = gemerkt.length ? gemerkt.map((u) => u.id) : vorschlag;
  return (
    <section className="ortho__blatt" aria-labelledby="ortho-blatt">
      <ClipboardList size={20} strokeWidth={1.75} aria-hidden="true" />
      <div>
        <h2 id="ortho-blatt">Übungsblatt</h2>
        <p>
          {gemerkt.length
            ? `Vorgemerkt: ${gemerkt.map((u) => u.name).join(', ')}.`
            : offen
              ? `Noch nichts vorgemerkt – das Blatt nimmt dann die Übungen zu „${offen.name}“.`
              : 'Noch nichts vorgemerkt. Übungen mit „Aufs Blatt“ sammeln.'}
        </p>
      </div>
      {gemerkt.length > 0 && (
        <button type="button" className="knopf" onClick={() => aendern({ blatt: [] })}>
          Leeren
        </button>
      )}
      <button
        type="button"
        className="knopf knopf--haupt"
        onClick={() => oeffneBlatt(ids)}
      >
        Übungsblatt öffnen
      </button>
    </section>
  );
}
