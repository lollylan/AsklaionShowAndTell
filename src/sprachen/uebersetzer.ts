import { useEffect, useLayoutEffect, useState, type RefObject } from 'react';
import { findeSprache } from './sprachen';
import { seitenSaetze } from './seiten';
import { baueMuster, fuelleMuster, istMuster, liste, type Muster } from './muster';

// Übersetzt einen fertig gezeichneten Bereich (Bühne, Handzettel) über das Wörterbuch der
// gewählten Sprache. Gearbeitet wird am DOM: Jeder Textknoten, dessen Text (ohne Rand-
// Leerzeichen) im Wörterbuch steht, bekommt die Übersetzung; alles andere bleibt deutsch.
// So müssen die Module selbst nichts von Sprachen wissen, und auch die Beschriftungen der
// SVG-Zeichnungen werden erfasst. Ändert React einen Text, merkt das der MutationObserver und
// übersetzt neu; beim Zurückschalten auf Deutsch wird der Originaltext wiederhergestellt.

export type Woerterbuch = Map<string, string>;

// Praxis-eigene Texte (aus src/privat) haben ihre Übersetzungen in src/privat/sprachen – so
// gelangen sie nicht in Demo und öffentlichen Quelltext. Dort fehlen die Dateien oder sind leer.
const dateien = {
  ...import.meta.glob<Record<string, string> | undefined>('./texte/*/*.json', { import: 'default' }),
  ...import.meta.glob<Record<string, string> | undefined>('../privat/sprachen/*/*.json', {
    import: 'default',
  }),
};
const sprachVon = (pfad: string) => pfad.split('/').at(-2);
const geladen = new Map<string, Promise<Woerterbuch>>();
/** Schablonen mit {0} … je Wörterbuch (siehe muster.ts). */
const musterVon = new WeakMap<Woerterbuch, { code: string; muster: Muster[] }>();

/** Lädt alle Wörterbuchteile einer Sprache (texte/<code>/*.json) und führt sie zusammen. */
export function ladeWoerterbuch(code: string): Promise<Woerterbuch> {
  let auftrag = geladen.get(code);
  if (!auftrag) {
    const teile = Object.entries(dateien)
      .filter(([pfad]) => sprachVon(pfad) === code)
      .sort(([a], [b]) => a.localeCompare(b));
    auftrag = Promise.all(teile.map(([, lade]) => lade())).then((alle) => {
      const wb: Woerterbuch = new Map();
      const muster: [string, Muster][] = [];
      for (const teil of alle)
        for (const [de, ueb] of Object.entries(teil ?? {}))
          if (typeof ueb === 'string' && ueb.trim()) {
            if (istMuster(de)) {
              muster.push([de, baueMuster(glaette(de), ueb)]);
              continue;
            }
            wb.set(glaette(de), ueb);
            // Schablonen mit Seite (Lagerungsmanöver): fertige Sätze für beide Ohren dazu.
            for (const [satz, fertig] of seitenSaetze(code, de, ueb)) wb.set(glaette(satz), fertig);
          }
      // Längere Schablonen zuerst: „etwa so groß wie {0}“ vor „{0} – {1}“.
      muster.sort(([a], [b]) => b.replace(/\{\d\}/g, '').length - a.replace(/\{\d\}/g, '').length);
      musterVon.set(wb, { code, muster: muster.map(([, m]) => m) });
      return wb;
    });
    geladen.set(code, auftrag);
  }
  return auftrag;
}

/**
 * Schlägt einen (geglätteten) Text nach: wörtlich, sonst als Liste mit Komma, sonst über die
 * Schablonen. undefined, wenn nichts passt.
 */
export function schlageNach(wb: Woerterbuch, kern: string): string | undefined {
  const direkt = wb.get(kern);
  if (direkt !== undefined) return direkt;
  const m = musterVon.get(wb);
  if (!m) return undefined;
  const schlage = (t: string) => wb.get(glaette(t));
  return liste(kern, m.code, schlage) ?? fuelleMuster(kern, m.code, m.muster, schlage);
}

/** Schlüsselform: Leerraum zusammengezogen, ohne Rand – so wie React JSX-Text ausgibt. */
export const glaette = (s: string) => s.replace(/\s+/g, ' ').trim();

/** Wörterbuch einer Sprache als Hook; null, solange es lädt, und für Deutsch. */
export function useWoerterbuch(code: string): Woerterbuch | null {
  const [stand, setStand] = useState<{ code: string; wb: Woerterbuch } | null>(null);
  useEffect(() => {
    if (code === 'de') return;
    let aktiv = true;
    void ladeWoerterbuch(code).then((wb) => aktiv && setStand({ code, wb }));
    return () => {
      aktiv = false;
    };
  }, [code]);
  return code !== 'de' && stand?.code === code ? stand.wb : null;
}

const ATTRIBUTE = ['alt', 'title', 'aria-label', 'placeholder'];
/** Text, der nach Sprache aussieht (nicht nur Zahlen, Einheiten, Zeichen). */
const IST_TEXT = /[A-Za-zÄÖÜäöüß]{3,}/;

interface Merker {
  original: string;
  gesetzt: string;
}

/**
 * Übersetzt den Bereich unter `ref` in die Sprache `code` und hält ihn übersetzt.
 * Liefert die Texte, die im Wörterbuch fehlen (sie stehen weiter auf Deutsch).
 */
export function useUebersetzung(ref: RefObject<HTMLElement>, code: string): string[] {
  const wb = useWoerterbuch(code);
  const [fehlend, setFehlend] = useState<string[]>([]);

  useLayoutEffect(() => {
    const wurzel = ref.current;
    if (!wurzel) return;
    const sprache = findeSprache(code);
    wurzel.lang = sprache.code;
    wurzel.dataset.richtung = sprache.richtung;

    const texte = new Map<Text, Merker>();
    const attribute = new Map<Element, Map<string, Merker>>();
    const luecken = new Set<string>();
    let meldung = 0;

    const melde = () => {
      if (meldung) return;
      meldung = requestAnimationFrame(() => {
        meldung = 0;
        // Nur, was noch im Bereich hängt (React entfernt Knoten beim Blättern).
        const offen = new Set<string>();
        texte.forEach((m, knoten) => {
          if (knoten.isConnected && m.gesetzt === m.original && luecken.has(glaette(m.original)))
            offen.add(glaette(m.original));
        });
        setFehlend((alt) => {
          const neu = [...offen];
          return alt.length === neu.length && alt.every((t, i) => t === neu[i]) ? alt : neu;
        });
      });
    };

    const uebersetze = (original: string): string => {
      if (!wb) return original;
      const kern = glaette(original);
      if (!kern) return original;
      const ueb = schlageNach(wb, kern);
      if (ueb === undefined) {
        if (IST_TEXT.test(kern)) luecken.add(kern);
        return original;
      }
      const vorn = original.match(/^\s*/)![0];
      const hinten = original.match(/\s*$/)![0];
      return vorn + ueb + hinten;
    };

    const ausgenommen = (el: Element | null) =>
      Boolean(el?.closest('[data-nicht-uebersetzen], script, style, textarea, input'));

    const bearbeiteText = (knoten: Text) => {
      if (ausgenommen(knoten.parentElement)) return;
      const jetzt = knoten.nodeValue ?? '';
      const alt = texte.get(knoten);
      if (alt && jetzt === alt.gesetzt) return; // unsere eigene Änderung
      const neu = uebersetze(jetzt);
      texte.set(knoten, { original: jetzt, gesetzt: neu });
      if (neu !== jetzt) knoten.nodeValue = neu;
    };

    const bearbeiteAttribute = (el: Element) => {
      if (ausgenommen(el)) return;
      for (const name of ATTRIBUTE) {
        const jetzt = el.getAttribute(name);
        if (jetzt === null) continue;
        let merker = attribute.get(el);
        const alt = merker?.get(name);
        if (alt && jetzt === alt.gesetzt) continue;
        const neu = uebersetze(jetzt);
        if (!merker) attribute.set(el, (merker = new Map()));
        merker.set(name, { original: jetzt, gesetzt: neu });
        if (neu !== jetzt) el.setAttribute(name, neu);
      }
    };

    const durchlaufe = (start: Node) => {
      if (start.nodeType === Node.TEXT_NODE) return bearbeiteText(start as Text);
      if (start.nodeType !== Node.ELEMENT_NODE) return;
      bearbeiteAttribute(start as Element);
      const gang = document.createTreeWalker(start, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT);
      for (let k = gang.nextNode(); k; k = gang.nextNode()) {
        if (k.nodeType === Node.TEXT_NODE) bearbeiteText(k as Text);
        else bearbeiteAttribute(k as Element);
      }
    };

    // Deutsch (oder Wörterbuch lädt noch): nichts zu tun – React zeigt die Originaltexte.
    if (!wb) {
      setFehlend([]);
      return;
    }

    durchlaufe(wurzel);
    melde();

    const beobachter = new MutationObserver((aenderungen) => {
      for (const a of aenderungen) {
        if (a.type === 'characterData') bearbeiteText(a.target as Text);
        else if (a.type === 'attributes') bearbeiteAttribute(a.target as Element);
        else a.addedNodes.forEach(durchlaufe);
      }
      melde();
    });
    beobachter.observe(wurzel, {
      subtree: true,
      childList: true,
      characterData: true,
      attributes: true,
      attributeFilter: ATTRIBUTE,
    });

    return () => {
      beobachter.disconnect();
      cancelAnimationFrame(meldung);
      // Zurück zum Original, damit die nächste Sprache (oder Deutsch) sauber aufsetzt.
      texte.forEach((m, knoten) => {
        if (knoten.isConnected && knoten.nodeValue === m.gesetzt) knoten.nodeValue = m.original;
      });
      attribute.forEach((merker, el) =>
        merker.forEach((m, name) => {
          if (el.isConnected && el.getAttribute(name) === m.gesetzt) el.setAttribute(name, m.original);
        }),
      );
    };
  }, [ref, code, wb]);

  // Für die Entwicklung: fehlende Texte im Browser abrufbar (window.fehlendeUebersetzungen()).
  useEffect(() => {
    if (!import.meta.env.DEV) return;
    const w = window as unknown as { fehlendeUebersetzungen?: () => string[] };
    w.fehlendeUebersetzungen = () => fehlend;
  }, [fehlend]);

  return fehlend;
}
