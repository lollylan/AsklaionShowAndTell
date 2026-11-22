import { useCallback, useEffect, useRef, useState, type PointerEvent } from 'react';
import { Check, ChevronLeft, ChevronRight, LayoutList, Maximize, Minimize, X } from 'lucide-react';
import { LEERE_SITZUNG } from '../kern/sitzung';
import { modulZustand } from '../kern/register';
import { aktuellerSchluessel } from '../kern/verzeichnis';
import type { SitzungsZustand } from '../kern/typen';
import { BuehnenInhalt } from '../buehne/BuehnenInhalt';
import { blaettere, schlageAuf, type Thema } from './ablauf';

interface Props {
  themen: Thema[];
  sprache: string;
  /** Meldet, was länger als einen Augenblick zu sehen war (für den Handzettel). */
  beiGezeigt: (schluessel: string) => void;
  beiEnde: () => void;
}

interface Stand {
  themaNr: number;
  bildNr: number;
  zustand: SitzungsZustand;
}

/** Ab dieser Strecke (in Bildschirmpixeln) gilt eine Bewegung als Wischen. */
const WISCH_STRECKE = 56;

/**
 * Die Bühne im Tablet-Modus: füllt das Fenster, darunter eine Leiste zum Blättern.
 * Wischen nach links oder rechts, die Pfeiltasten und die Knöpfe blättern; auf einem
 * 3D-Modell dreht ein Finger und zwei Finger zoomen – dort wird nicht geblättert.
 */
export function Praesentation({ themen, sprache, beiGezeigt, beiEnde }: Props) {
  const [stand, setStand] = useState<Stand>(() => ({
    themaNr: 0,
    bildNr: 0,
    zustand: schlageAuf({ ...LEERE_SITZUNG, sprache }, themen[0], 0),
  }));
  const [uebersicht, setUebersicht] = useState(false);
  const [vollbild, setVollbild] = useState(Boolean(document.fullscreenElement));
  const { themaNr, bildNr, zustand } = stand;
  const thema = themen[themaNr];
  const amAnfang = themaNr === 0 && bildNr === 0;
  const amEnde = themaNr === themen.length - 1 && bildNr === thema.bilder.length - 1;

  const geheZu = useCallback(
    (zielThema: number, zielBild: number) =>
      setStand((alt) => {
        const neu = themen[zielThema];
        if (!neu?.bilder[zielBild]) return alt;
        if (zielThema === alt.themaNr && zielBild === alt.bildNr) return alt;
        return {
          themaNr: zielThema,
          bildNr: zielBild,
          zustand:
            zielThema === alt.themaNr
              ? blaettere(alt.zustand, neu, zielBild)
              : schlageAuf(alt.zustand, neu, zielBild),
        };
      }),
    [themen],
  );

  const weiter = useCallback(
    () =>
      setStand((alt) => {
        const hier = themen[alt.themaNr];
        if (alt.bildNr < hier.bilder.length - 1) {
          return { ...alt, bildNr: alt.bildNr + 1, zustand: blaettere(alt.zustand, hier, alt.bildNr + 1) };
        }
        const naechstes = themen[alt.themaNr + 1];
        if (!naechstes) return alt;
        return { themaNr: alt.themaNr + 1, bildNr: 0, zustand: schlageAuf(alt.zustand, naechstes, 0) };
      }),
    [themen],
  );

  const zurueck = useCallback(
    () =>
      setStand((alt) => {
        const hier = themen[alt.themaNr];
        if (alt.bildNr > 0) {
          return { ...alt, bildNr: alt.bildNr - 1, zustand: blaettere(alt.zustand, hier, alt.bildNr - 1) };
        }
        const voriges = themen[alt.themaNr - 1];
        if (!voriges) return alt;
        const letztes = voriges.bilder.length - 1;
        return {
          themaNr: alt.themaNr - 1,
          bildNr: letztes,
          zustand: schlageAuf(alt.zustand, voriges, letztes),
        };
      }),
    [themen],
  );

  // Die Bühne ändert den Zustand ihres Moduls selbst, etwa beim Drehen des 3D-Modells.
  const aendereModul = useCallback(
    (aenderung: object | ((alt: object) => object)) =>
      setStand((alt) => {
        const { modul } = themen[alt.themaNr];
        const bisher = modulZustand(alt.zustand, modul);
        const neu = typeof aenderung === 'function' ? aenderung(bisher) : { ...bisher, ...aenderung };
        return {
          ...alt,
          zustand: { ...alt.zustand, module: { ...alt.zustand.module, [modul.id]: neu } },
        };
      }),
    [themen],
  );

  const schalteVollbild = useCallback(() => {
    if (document.fullscreenElement) void document.exitFullscreen();
    else void document.documentElement.requestFullscreen().catch(() => {});
  }, []);

  useEffect(() => {
    const beiWechsel = () => setVollbild(Boolean(document.fullscreenElement));
    document.addEventListener('fullscreenchange', beiWechsel);
    return () => {
      document.removeEventListener('fullscreenchange', beiWechsel);
      if (document.fullscreenElement) void document.exitFullscreen();
    };
  }, []);

  // Tasten, noch bevor ein fokussiertes 3D-Modell sie bekommt: Blättern geht immer.
  useEffect(() => {
    const beiTaste = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      let getan = true;
      if (e.key === 'Escape') {
        if (uebersicht) setUebersicht(false);
        else beiEnde();
      } else if (e.key === 'ArrowRight' || e.key === 'PageDown') weiter();
      else if (e.key === 'ArrowLeft' || e.key === 'PageUp') zurueck();
      else if (e.key === 'Home') geheZu(0, 0);
      else if (e.key.toLowerCase() === 'f') schalteVollbild();
      else getan = false;
      if (getan) {
        e.preventDefault();
        e.stopPropagation();
      }
    };
    window.addEventListener('keydown', beiTaste, true);
    return () => window.removeEventListener('keydown', beiTaste, true);
  }, [uebersicht, weiter, zurueck, geheZu, beiEnde, schalteVollbild]);

  // Was länger als einen Augenblick zu sehen war, kommt auf den Handzettel.
  const schluessel = aktuellerSchluessel(zustand);
  useEffect(() => {
    if (!schluessel) return;
    const zeit = window.setTimeout(() => beiGezeigt(schluessel), 1500);
    return () => window.clearTimeout(zeit);
  }, [schluessel, beiGezeigt]);

  // ---------- Wischen ----------
  const wisch = useRef<{ id: number; x: number; y: number } | null>(null);
  const runter = (e: PointerEvent<HTMLDivElement>) => {
    const ziel = e.target as Element;
    // Auf einem bedienbaren 3D-Modell gehört die Geste dem Modell; ein zweiter Finger bricht ab.
    if (!e.isPrimary || e.button !== 0 || ziel.closest('[data-bedienbar="true"]')) {
      wisch.current = null;
      return;
    }
    wisch.current = { id: e.pointerId, x: e.clientX, y: e.clientY };
  };
  const hoch = (e: PointerEvent<HTMLDivElement>) => {
    const start = wisch.current;
    wisch.current = null;
    if (!start || start.id !== e.pointerId) return;
    const dx = e.clientX - start.x;
    const dy = e.clientY - start.y;
    if (Math.abs(dx) < WISCH_STRECKE || Math.abs(dx) < Math.abs(dy) * 1.5) return;
    if (dx < 0) weiter();
    else zurueck();
  };

  const bild = thema.bilder[bildNr];
  const ort =
    thema.bilder.length > 1
      ? `Bild ${bildNr + 1} von ${thema.bilder.length} · ${bild.titel}`
      : themen.length > 1
        ? `Thema ${themaNr + 1} von ${themen.length}`
        : thema.modul.titel;

  return (
    <div className="schau">
      <div
        className="schau__buehne"
        onPointerDown={runter}
        onPointerUp={hoch}
        onPointerCancel={() => {
          wisch.current = null;
        }}
      >
        <BuehnenInhalt zustand={zustand} vorschau={false} beiAenderung={aendereModul} />
      </div>

      {uebersicht && (
        <nav className="schau__uebersicht" aria-label="Alle Bilder">
          {themen.map((t, tn) => (
            <section key={t.schluessel}>
              <h2>
                <t.modul.symbol size={18} strokeWidth={1.75} aria-hidden="true" />
                {t.eintrag.titel}
              </h2>
              <ol>
                {t.bilder.map((b, bn) => (
                  <li key={bn}>
                    <button
                      type="button"
                      aria-current={tn === themaNr && bn === bildNr ? 'step' : undefined}
                      onClick={() => {
                        geheZu(tn, bn);
                        setUebersicht(false);
                      }}
                    >
                      {b.titel}
                    </button>
                  </li>
                ))}
              </ol>
            </section>
          ))}
        </nav>
      )}

      <footer className="schau__leiste">
        <ol className="schau__weg" aria-hidden="true">
          {themen.map((t, tn) => (
            <li key={t.schluessel} style={{ flexGrow: t.bilder.length }}>
              <span
                style={{
                  width: `${
                    tn < themaNr ? 100 : tn > themaNr ? 0 : ((bildNr + 1) / t.bilder.length) * 100
                  }%`,
                }}
              />
            </li>
          ))}
        </ol>

        <button type="button" className="schau__knopf schau__raus" onClick={beiEnde}>
          <X size={22} strokeWidth={1.75} aria-hidden="true" />
          <span>Zur Auswahl</span>
        </button>

        <button
          type="button"
          className="schau__knopf schau__pfeil"
          disabled={amAnfang}
          aria-label="Voriges Bild"
          onClick={zurueck}
        >
          <ChevronLeft size={26} strokeWidth={1.75} aria-hidden="true" />
        </button>

        <button
          type="button"
          className="schau__knopf schau__ort"
          aria-expanded={uebersicht}
          onClick={() => setUebersicht((o) => !o)}
        >
          <LayoutList size={20} strokeWidth={1.75} aria-hidden="true" />
          <span className="schau__orttext" role="status">
            <strong>{thema.eintrag.titel}</strong>
            <span>{ort}</span>
          </span>
        </button>

        {amEnde ? (
          <button type="button" className="schau__knopf schau__pfeil schau__fertig" onClick={beiEnde}>
            <Check size={22} strokeWidth={2} aria-hidden="true" />
            <span>Fertig</span>
          </button>
        ) : (
          <button
            type="button"
            className="schau__knopf schau__pfeil schau__vor"
            aria-label="Nächstes Bild"
            onClick={weiter}
          >
            <ChevronRight size={26} strokeWidth={1.75} aria-hidden="true" />
          </button>
        )}

        {document.fullscreenEnabled && (
          <button
            type="button"
            className="schau__knopf schau__vollbild"
            aria-label={vollbild ? 'Vollbild verlassen' : 'Vollbild'}
            onClick={schalteVollbild}
          >
            {vollbild ? (
              <Minimize size={20} strokeWidth={1.75} aria-hidden="true" />
            ) : (
              <Maximize size={20} strokeWidth={1.75} aria-hidden="true" />
            )}
          </button>
        )}
      </footer>
    </div>
  );
}
