import './steuerung.css';
import { useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, LayoutGrid, MonitorPlay, Search, X } from 'lucide-react';
import type { SteuerungProps } from '../../kern/typen';
import type { ReiseZustand } from './index';
import { LAENDER, QUELLEN, findeLand, istLand, type Land } from './daten';
import { WEITERE_THEMEN, findeKrankheit } from './krankheiten';
import { Merkblaetter } from '../impfungen/Merkblaetter';
import { SEITEN, seitenFuer, type Seite } from './Laenderseiten';
import { steckbriefVon, tippsFuer } from './steckbriefe';
import {
  AUSBRUCH_QUELLEN,
  AUSBRUCH_STAND,
  CRM_QUELLE,
  ausbruecheFuer,
  crmLinksFuer,
  malariakartenFuer,
  datumKurz,
  hatWichtigenAusbruch,
  type Ausbruch,
} from './ausbrueche';
import { NUR_VON_HAND, eintraegeFuer } from './auswahl';
import { PRIVAT } from './privat';
import type { Empfehlung, Stufe } from './typen';

const normalisiere = (text: string) =>
  text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');

const STUFE_TEXT: Record<Stufe, string> = {
  alle: 'für alle Reisenden',
  reiseart: 'wegen Reiseart',
  moeglich: 'je nach Risiko',
};

export function Steuerung({ zustand, aendern }: SteuerungProps<ReiseZustand>) {
  const [suche, setSuche] = useState('');
  const { aktiv, stile, manuell, thema } = zustand;
  const ziele = useMemo(() => zustand.ziele.map(findeLand).filter(istLand), [zustand.ziele]);
  const aktivesLand = findeLand(aktiv);
  const stelle = aktivesLand ? ziele.indexOf(aktivesLand) : -1;

  const schalteLand = (iso3: string) =>
    aendern((alt) =>
      alt.ziele.includes(iso3)
        ? {
            ...alt,
            ziele: alt.ziele.filter((c) => c !== iso3),
            aktiv: alt.aktiv === iso3 ? null : alt.aktiv,
          }
        : { ...alt, ziele: [...alt.ziele, iso3] },
    );

  // Beim Wechsel des Landes schließt sich eine offene Erklärkarte; es geht mit den Impfungen los.
  const zeige = (iso3: string | null) =>
    aendern({ aktiv: iso3, thema: null, seite: 'impfungen', malariakarte: 0 });

  const seiten = aktivesLand ? seitenFuer(aktivesLand) : [];
  const seite: Seite = zustand.seite && seiten.includes(zustand.seite) ? zustand.seite : 'impfungen';
  const seitenNr = seiten.indexOf(seite);
  const blaettere = (seiteNeu: Seite) => aendern({ seite: seiteNeu, thema: null });

  // Pfeiltasten: Seiten des Landes blättern; nach der letzten Seite kommt das nächste Ziel.
  useEffect(() => {
    if (!aktivesLand) return;
    const taste = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.altKey || e.ctrlKey || e.metaKey) return;
      if (e.key === 'ArrowRight') {
        if (seitenNr < seiten.length - 1) blaettere(seiten[seitenNr + 1]);
        else if (stelle < ziele.length - 1) zeige(ziele[stelle + 1].iso3);
      } else if (e.key === 'ArrowLeft' && seitenNr > 0) blaettere(seiten[seitenNr - 1]);
      else return;
      e.preventDefault();
    };
    window.addEventListener('keydown', taste);
    return () => window.removeEventListener('keydown', taste);
  });

  const schalteStil = (id: string) =>
    aendern((alt) => ({
      ...alt,
      stile: alt.stile.includes(id) ? alt.stile.filter((s) => s !== id) : [...alt.stile, id],
    }));

  const erklaere = (id: string) => aendern({ thema: thema === id ? null : id });

  const gesucht = normalisiere(suche.trim());
  const treffer = gesucht
    ? LAENDER.filter((land) => normalisiere(land.name).includes(gesucht))
    : LAENDER;

  const empfehlungen = eintraegeFuer(aktivesLand, ziele, stile, manuell);
  const offenesThema = findeKrankheit(thema);

  return (
    <div className="reise">
{PRIVAT && (
        <section aria-labelledby="reise-art">
          <h2 id="reise-art">Reiseart</h2>
          <ul className="stile">
            {PRIVAT.REISESTILE.map((stil) => (
              <li key={stil.id}>
                <button
                  type="button"
                  className="stil"
                  aria-pressed={stile.includes(stil.id)}
                  onClick={() => schalteStil(stil.id)}
                >
                  <strong>{stil.name}</strong>
                  <span>{stil.beschreibung}</span>
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section aria-labelledby="reise-ziele">
        <h2 id="reise-ziele">Reiseziele</h2>

        {ziele.length > 0 && (
          <>
            <ol className="route">
              {ziele.map((land, i) => {
                const istAktiv = land === aktivesLand;
                return (
                  <li key={land.iso3} className="route__zeile" data-aktiv={istAktiv}>
                    <button
                      type="button"
                      className="route__land"
                      aria-pressed={istAktiv}
                      onClick={() => zeige(istAktiv ? null : land.iso3)}
                    >
                      <span className="route__nr">{i + 1}</span>
                      <span className="route__name">{land.name}</span>
                      {hatWichtigenAusbruch(land.iso3) && (
                        <span className="route__ausbruch">Ausbruch gemeldet</span>
                      )}
                      <span className="route__info">{istAktiv ? 'wird gezeigt' : 'zeigen'}</span>
                    </button>
                    <button
                      type="button"
                      className="route__weg"
                      aria-label={`${land.name} entfernen`}
                      onClick={() => schalteLand(land.iso3)}
                    >
                      <X size={18} strokeWidth={1.75} aria-hidden="true" />
                    </button>
                  </li>
                );
              })}
            </ol>

            {aktivesLand && (
              <div className="reise__seiten" role="group" aria-label={`Seiten zu ${aktivesLand.name}`}>
                {SEITEN.filter((x) => seiten.includes(x.id)).map((x) => (
                  <button
                    key={x.id}
                    type="button"
                    className="knopf"
                    aria-pressed={seite === x.id}
                    onClick={() => blaettere(x.id)}
                  >
                    {x.name}
                  </button>
                ))}
                <span className="reise__tastenhinweis">
                  <kbd>←</kbd> <kbd>→</kbd> blättern
                </span>
              </div>
            )}

            <div className="reise__schritte">
              <button
                type="button"
                className="knopf"
                disabled={stelle <= 0}
                onClick={() => zeige(ziele[stelle - 1].iso3)}
              >
                <ChevronLeft size={18} strokeWidth={1.75} aria-hidden="true" />
                Zurück
              </button>
              <button
                type="button"
                className="knopf knopf--haupt"
                disabled={stelle >= ziele.length - 1}
                onClick={() => zeige(ziele[stelle + 1].iso3)}
              >
                {stelle === -1 ? 'Erstes Ziel zeigen' : 'Nächstes Ziel'}
                <ChevronRight size={18} strokeWidth={1.75} aria-hidden="true" />
              </button>
              <button
                type="button"
                className="knopf"
                disabled={aktiv === null && thema === null}
                onClick={() => zeige(null)}
              >
                <LayoutGrid size={18} strokeWidth={1.75} aria-hidden="true" />
                Ganze Reise zeigen
              </button>
            </div>
          </>
        )}

        <label className="suchfeld">
          <span className="nur-vorlesen">Land suchen</span>
          <Search size={18} strokeWidth={1.75} aria-hidden="true" />
          <input
            type="search"
            placeholder="Land suchen und anklicken"
            value={suche}
            onChange={(e) => setSuche(e.target.value)}
            onKeyDown={(e) => {
              // Enter übernimmt den einzigen oder obersten Treffer.
              if (e.key === 'Enter' && gesucht && treffer.length > 0) {
                if (!zustand.ziele.includes(treffer[0].iso3)) schalteLand(treffer[0].iso3);
                setSuche('');
              }
            }}
          />
        </label>

        {treffer.length === 0 ? (
          <p className="reise__leer">Kein Land mit „{suche.trim()}“ gefunden.</p>
        ) : (
          <ul className="laenderliste" aria-label="Alle Länder">
            {treffer.map((land) => (
              <li key={land.iso3}>
                <button
                  type="button"
                  className="landknopf"
                  aria-pressed={zustand.ziele.includes(land.iso3)}
                  onClick={() => schalteLand(land.iso3)}
                >
                  {land.name}
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section aria-labelledby="reise-schutz">
        <h2 id="reise-schutz">
          {NUR_VON_HAND ? 'Themen für das Gespräch' : 'Schutz und Impfungen'}
          {!NUR_VON_HAND && (
            <span className="reise__bezug">
              {aktivesLand
                ? ` für ${aktivesLand.name}`
                : ziele.length > 0
                  ? ' für die ganze Reise'
                  : ''}
            </span>
          )}
        </h2>

        {offenesThema && (
          <p className="laeuft" role="status">
            <MonitorPlay size={18} strokeWidth={1.75} aria-hidden="true" />
            <span>
              Der Patient sieht gerade die Erklärung zu <strong>{offenesThema.name}</strong>.
            </span>
            <button type="button" className="knopf" onClick={() => aendern({ thema: null })}>
              Erklärung schließen
            </button>
          </p>
        )}

        {ziele.length === 0 && !NUR_VON_HAND ? (
          <p className="reise__leer">
            Sobald ein Reiseziel gewählt ist, steht hier der Vorschlag aus den STIKO/DTG-Tabellen.
          </p>
        ) : (
          <>
            <p className="reise__hilfe">
              {NUR_VON_HAND
                ? 'Haken = erscheint beim Patienten, sobald ein Reiseziel gezeigt wird. Diese Fassung schlägt nichts vor: Welche Impfung oder Vorbeugung für eine Reise infrage kommt, entscheiden Sie in der Beratung.'
                : 'Haken = erscheint beim Patienten. Der Vorschlag richtet sich nach Land und Reiseart und lässt sich je Zeile ändern.'}
            </p>
            <ul className="schutz">
              {empfehlungen.map((e) => (
                <Schutzzeile
                  key={e.id}
                  empfehlung={e}
                  offen={thema === e.id}
                  beiZeigen={(zeigen) =>
                    aendern((alt) => ({ ...alt, manuell: { ...alt.manuell, [e.id]: zeigen } }))
                  }
                  beiErklaeren={() => erklaere(e.id)}
                />
              ))}
            </ul>
          </>
        )}

        <h3 className="reise__zwischen">Weitere Themen erklären</h3>
        <div className="themen">
          {WEITERE_THEMEN.map((id) => (
            <button
              key={id}
              type="button"
              className="knopf"
              aria-pressed={thema === id}
              onClick={() => erklaere(id)}
            >
              {findeKrankheit(id)?.name}
            </button>
          ))}
        </div>
      </section>

      {aktivesLand && seite === 'tipps' && <TippSpicker iso3={aktivesLand.iso3} />}

      {NUR_VON_HAND && thema === 'malaria' && (
        <section className="fach" aria-labelledby="reise-malaria">
          <h2 id="reise-malaria">Malaria auf der Bühne</h2>
          <p>
            Der Patient sieht die allgemeine Erklärseite: Übertragung, Mückenschutz, Tabletten zur
            Vorbeugung oder für den Notfall, Fieber nach der Reise. Sie nennt keine Gebiete und
            keine Mittel. Ob und welche Prophylaxe passt, klären Sie mit den aktuellen
            DTG-Empfehlungen oder einer reisemedizinischen Fachquelle.
          </p>
        </section>
      )}

      {aktivesLand ? (
        <Fachhinweise
          land={aktivesLand}
          karteNr={zustand.malariakarte ?? 0}
          karteAufBuehne={seite === 'malaria'}
          zeigeKarte={(nr) => aendern({ seite: 'malaria', malariakarte: nr, thema: null })}
        />
      ) : (
        ziele.length > 0 && <AusbruecheDerReise ziele={ziele} />
      )}

      <footer className="reise__quellen">
        {PRIVAT ? (
          <>
            <p>
              <strong>Quellen.</strong> Impfungen: {QUELLEN.impfungen} (RKI, CC BY 4.0). Malaria:{' '}
              {QUELLEN.malaria}; hier nur Risikostufe und Prophylaxe-Kürzel, die Gebiete stehen in der
              DTG-Tabelle. Klima: {QUELLEN.klima}. Steckbrief: Wikidata, deutsche Wikipedia und
              Weltbank; Fotos von Wikimedia Commons (Urheber und Lizenz stehen am Bild); Städte und
              Karte: Natural Earth. Reisetipps: eigene Kurzfassung nach der deutschen Wikivoyage,
              Stand November 2026 – aktuelle Lage beim Auswärtigen Amt prüfen. Ausbrüche: {AUSBRUCH_QUELLEN}{' '}
              Malariakarten: Links ins {CRM_QUELLE}, Zugang über das eigene eRef-Konto.
            </p>
            <p>
              Die Zuordnung zur Reiseart ist eine Vereinfachung für die Anzeige. Einreisebestimmungen
              sind nicht enthalten; die Ausbrüche sind eine Momentaufnahme vom {AUSBRUCH_STAND}.
            </p>
          </>
        ) : (
          <>
            <p>
              <strong>Nur zur Aufklärung.</strong> Diese Fassung ordnet keinem Land Impfungen oder
              eine Malariaprophylaxe zu und ersetzt nicht die ärztliche Indikationsstellung.
              Einreisebestimmungen sind nicht enthalten; die Ausbrüche sind eine Momentaufnahme vom{' '}
              {AUSBRUCH_STAND}.
            </p>
            <p>
              <strong>Quellen.</strong> Erklärtexte: eigene Texte. Klima: {QUELLEN.klima}. Steckbrief:
              Wikidata, deutsche Wikipedia und Weltbank; Fotos von Wikimedia Commons (Urheber und
              Lizenz stehen am Bild); Städte und Karte: Natural Earth. Reisetipps: eigene Kurzfassung
              nach der deutschen Wikivoyage, Stand November 2026 – aktuelle Lage beim Auswärtigen Amt
              prüfen. Ausbrüche: {AUSBRUCH_QUELLEN} Links ins {CRM_QUELLE} öffnen sich nur mit eigenem
              eRef-Zugang.
            </p>
          </>
        )}
        <p>
          Faktenblätter: RKI „Kurz &amp; Knapp“ zum Ausdrucken, nur für Meningokokken und FSME
          vorhanden.
        </p>
      </footer>
    </div>
  );
}

function Schutzzeile({
  empfehlung,
  offen,
  beiZeigen,
  beiErklaeren,
}: {
  empfehlung: Empfehlung;
  offen: boolean;
  beiZeigen: (zeigen: boolean) => void;
  beiErklaeren: () => void;
}) {
  const krankheit = findeKrankheit(empfehlung.id);
  if (!krankheit) return null;
  return (
    <li className="schutz__zeile" data-stufe={empfehlung.stufe} data-zeigen={empfehlung.zeigen}>
      <div>
        <label className="schutz__haken">
          <input
            type="checkbox"
            checked={empfehlung.zeigen}
            onChange={(e) => beiZeigen(e.target.checked)}
          />
          <span className="schutz__name">{krankheit.name}</span>
        </label>
        <Merkblaetter id={`reise:${empfehlung.id}`} />
      </div>
      <span className="schutz__stufe">{empfehlung.stufe ? STUFE_TEXT[empfehlung.stufe] : ''}</span>
      <span className="schutz__grund">{empfehlung.grund}</span>
      <button type="button" className="knopf schutz__knopf" aria-pressed={offen} onClick={beiErklaeren}>
        {offen ? 'Wird erklärt' : 'Erklären'}
      </button>
    </li>
  );
}

/** Nur für den Arzt: Ausbrüche, Links ins CRM-Handbuch und – in der Praxisfassung – die Fachhinweise. */
function Fachhinweise({
  land,
  karteNr,
  karteAufBuehne,
  zeigeKarte,
}: {
  land: Land;
  karteNr: number;
  karteAufBuehne: boolean;
  zeigeKarte: (nr: number) => void;
}) {
  return (
    <section className="fach" aria-labelledby="reise-fach">
      <h2 id="reise-fach">{PRIVAT ? 'Fachhinweise' : 'Zum Nachschlagen'} zu {land.name}</h2>
      <p className="reise__hilfe">Nur auf diesem Bildschirm sichtbar.</p>

      <h3>Aktuelle Ausbrüche (WHO/ECDC, Stand {AUSBRUCH_STAND})</h3>
      <AusbruchListe meldungen={ausbruecheFuer(land.iso3)} />

      {PRIVAT && (
        <PRIVAT.Fachteil
          land={land}
          karten={malariakartenFuer(land.iso3)}
          karteNr={karteNr}
          karteAufBuehne={karteAufBuehne}
          zeigeKarte={zeigeKarte}
        />
      )}
      <CrmLinks iso3={land.iso3} />
    </section>
  );
}

function AusbruchListe({ meldungen }: { meldungen: Ausbruch[] }) {
  if (meldungen.length === 0) {
    return <p className="reise__hilfe">Keine aktuelle Meldung von WHO oder ECDC zu diesem Land.</p>;
  }
  return (
    <ul className="ausbrueche">
      {meldungen.map((m) => (
        <li key={m.id} className="ausbruch" data-ernst={m.ernst}>
          <p className="ausbruch__kopf">
            <strong>{m.krankheit}</strong>
            <span>
              {m.ernst === 'hoch' ? 'Reiseplanung betroffen' : m.ernst === 'mittel' ? 'beachten' : 'zur Kenntnis'}
            </span>
          </p>
          <p>{m.text}</p>
          <a className="ausbruch__quelle" href={m.url} target="_blank" rel="noreferrer">
            {m.quelle}, {datumKurz(m.datum)}
            <ExternalLink size={13} strokeWidth={1.75} aria-hidden="true" />
          </a>
        </li>
      ))}
    </ul>
  );
}

/** Ganze Reise: alle Meldungen zu den gewählten Zielen, je Meldung einmal. */
function AusbruecheDerReise({ ziele }: { ziele: Land[] }) {
  const gesehen = new Set<string>();
  const zeilen = ziele.flatMap((land) =>
    ausbruecheFuer(land.iso3)
      .filter((m) => !gesehen.has(m.id) && gesehen.add(m.id))
      .map((m) => ({ ...m, krankheit: `${land.name}: ${m.krankheit}` })),
  );
  return (
    <section className="fach" aria-labelledby="reise-ausbrueche">
      <h2 id="reise-ausbrueche">Aktuelle Ausbrüche auf der Reise</h2>
      <p className="reise__hilfe">
        WHO und ECDC, Stand {AUSBRUCH_STAND}. Nur auf diesem Bildschirm sichtbar.
      </p>
      <AusbruchListe meldungen={zeilen} />
    </section>
  );
}

/** Links ins CRM Handbuch Reisemedizin (eRef) – öffnen sich mit dem eigenen Zugang. */
function CrmLinks({ iso3 }: { iso3: string }) {
  const crm = crmLinksFuer(iso3);
  if (!crm.kapitel && crm.karten.length === 0) return null;
  return (
    <div className="crm">
      <span className="crm__titel">Im CRM-Handbuch öffnen:</span>
      {crm.karten.map((k) => (
        <a key={k.url} className="crm__link" href={k.url} target="_blank" rel="noreferrer">
          Malariakarte{crm.karten.length > 1 ? ` – ${k.name}` : ''}
          <ExternalLink size={13} strokeWidth={1.75} aria-hidden="true" />
        </a>
      ))}
      {crm.malaria && (
        <a className="crm__link" href={crm.malaria} target="_blank" rel="noreferrer">
          Malaria-Abschnitt
          <ExternalLink size={13} strokeWidth={1.75} aria-hidden="true" />
        </a>
      )}
      {crm.kapitel && (
        <a className="crm__link" href={crm.kapitel} target="_blank" rel="noreferrer">
          Länderkapitel
          <ExternalLink size={13} strokeWidth={1.75} aria-hidden="true" />
        </a>
      )}
    </div>
  );
}

/** Die Reisetipps als Spickzettel – so sieht man, was der Patient gerade liest. */
function TippSpicker({ iso3 }: { iso3: string }) {
  const tipps = tippsFuer(iso3);
  const s = steckbriefVon(iso3);
  return (
    <section className="fach" aria-labelledby="reise-tipps">
      <h2 id="reise-tipps">Reisetipps auf der Bühne</h2>
      <ul>
        {tipps.slice(0, 6).map((t) => (
          <li key={t.text}>{t.text}</li>
        ))}
      </ul>
      {tipps.length > 6 && <p className="reise__hilfe">Nur die ersten sechs passen auf die Seite.</p>}
      {s?.stecker.length ? <p className="reise__hilfe">Stecker laut Wikidata: {s.stecker.join(', ')}</p> : null}
    </section>
  );
}
