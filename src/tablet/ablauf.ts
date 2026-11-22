// Was der Tablet-Modus zeigt: eine Liste von Themen (Schlüssel „modul:eintrag“), jedes mit
// seinen Bildern. Hier steht, wie aus Thema und Bildnummer der Zustand der Bühne wird.

import { modulZustand } from '../kern/register';
import { findeFundstelle, zerlege, type Fundstelle } from '../kern/verzeichnis';
import type { Schritt, SitzungsZustand } from '../kern/typen';

export interface Thema extends Fundstelle {
  /** Mindestens ein Bild. */
  bilder: Schritt<object>[];
  /** Zustand des Moduls mit den Eingaben aus der Vorgabe (z. B. Messwert) – sonst der Startzustand. */
  start?: object;
}

export function themaVon(schluessel: string, start?: object): Thema | null {
  const fund = findeFundstelle(schluessel);
  if (!fund) return null;
  const bilder = fund.modul.verzeichnis?.schritte?.(fund.eintrag.id) ?? [];
  return {
    ...fund,
    start,
    bilder: bilder.length > 0 ? bilder : [{ titel: fund.eintrag.titel, setze: (alt) => alt }],
  };
}

/** Schlägt ein Thema frisch auf (ohne Reste vom vorigen) und stellt das gewünschte Bild ein. */
export function schlageAuf(sitzung: SitzungsZustand, thema: Thema, bildNr: number): SitzungsZustand {
  const { modul } = thema;
  const offen = modul.verzeichnis!.oeffne(
    zerlege(thema.schluessel).eintragId,
    thema.start ?? modul.startZustand,
  );
  return {
    ...sitzung,
    aktivesModul: modul.id,
    verdeckt: false,
    zeiger: null,
    module: { ...sitzung.module, [modul.id]: thema.bilder[bildNr].setze(offen) },
  };
}

/** Anderes Bild desselben Themas: Der Zustand bleibt, wie er ist (z. B. die Blickrichtung). */
export function blaettere(sitzung: SitzungsZustand, thema: Thema, bildNr: number): SitzungsZustand {
  const { modul } = thema;
  return {
    ...sitzung,
    module: {
      ...sitzung.module,
      [modul.id]: thema.bilder[bildNr].setze(modulZustand(sitzung, modul)),
    },
  };
}
