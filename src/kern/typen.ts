import type { ComponentType } from 'react';
import type { LucideIcon } from 'lucide-react';

/**
 * Alles, was beide Bildschirme gemeinsam wissen müssen.
 * Wird bei jeder Änderung komplett vom Arztfenster an die Bühne geschickt
 * und muss deshalb reines JSON sein (keine Funktionen, keine Klassen).
 */
export interface SitzungsZustand {
  /** id des Moduls, das gerade gezeigt wird – oder null für das Ruhebild. */
  aktivesModul: string | null;
  /** Zustand je Modul, abgelegt unter der Modul-id. */
  module: Record<string, unknown>;
  /** true: Der Patient sieht das Ruhebild, egal was der Arzt gerade vorbereitet. */
  verdeckt: boolean;
  /**
   * Was der Patient in dieser Sitzung gesehen hat, als Schlüssel „modul:eintrag“ in der
   * Reihenfolge des Zeigens. Daraus entsteht der Handzettel.
   */
  gezeigt: string[];
  /** Leuchtpunkt auf der Bühne, als Anteile der 1920 × 1080-Fläche (0 bis 1) – oder null. */
  zeiger: { x: number; y: number } | null;
}

/** Was die Steuerung eines Moduls (Arztseite) bekommt. */
export interface SteuerungProps<Z> {
  zustand: Z;
  /** Zustand ändern: entweder Teilobjekt zum Einmischen oder Funktion alt → neu. */
  aendern: (aenderung: Partial<Z> | ((alt: Z) => Z)) => void;
}

/** Was die Bühne eines Moduls (Patientenseite) bekommt. */
export interface BuehneProps<Z> {
  zustand: Z;
  /**
   * true, wenn die Bühne nur als kleine Vorschau im Arztfenster läuft.
   * Aufwendige Effekte (3D, Video) dürfen dann sparsamer rechnen.
   */
  vorschau: boolean;
}

/** Ein Eintrag, den die Suche über alle Module findet (Krankheit, Medikament, Region …). */
export interface VerzeichnisEintrag {
  /** Eindeutig innerhalb des Moduls. */
  id: string;
  titel: string;
  /** Zweitname oder Fachbegriff, steht klein neben dem Titel. */
  zusatz?: string;
  /** Weitere Suchwörter. */
  begriffe?: string;
}

/**
 * Macht die Inhalte eines Moduls von außen erreichbar: für die Suche über alle Module,
 * die Querverweise („Passt dazu“) und den Handzettel.
 */
export interface Verzeichnis<Z> {
  /** Wie ein Eintrag heißt, z. B. „Medikament“ – steht in der Trefferliste. */
  art: string;
  eintraege: VerzeichnisEintrag[];
  /**
   * id des Eintrags, den der Patient gerade sieht, oder null. Hinter einem „@“ darf ein
   * Zusatz stehen, den nur der Handzettel braucht (z. B. der eingegebene Wert: „ldl@132“).
   */
  aktuell: (zustand: Z) => string | null;
  /** Zustand, bei dem dieser Eintrag aufgeschlagen ist. */
  oeffne: (id: string, alt: Z) => Z;
  /**
   * Druckfassung eines Eintrags für den Handzettel (helles Papier, A4). Bekommt die id so,
   * wie `aktuell` sie geliefert hat. Ohne diese Komponente erscheint das Modul dort nicht.
   */
  Handzettel?: ComponentType<{ id: string }>;
}

/**
 * Ein Aufklärungsmodul. Die Bühne ist immer 1920 × 1080 Pixel groß und wird
 * als Ganzes auf den Patientenbildschirm skaliert – Maße in px sind also
 * auf jedem Bildschirm gleich.
 */
export interface Modul<Z extends object> {
  /** Eindeutig, nur Kleinbuchstaben und Bindestriche. Nachträglich nicht ändern. */
  id: string;
  titel: string;
  /** Ein Satz für die Modulübersicht. */
  beschreibung: string;
  symbol: LucideIcon;
  /** Position in der Modulliste, kleiner = weiter oben (Standard 100). */
  reihenfolge?: number;
  /** Zustand zu Beginn einer Sitzung. */
  startZustand: Z;
  Steuerung: ComponentType<SteuerungProps<Z>>;
  Buehne: ComponentType<BuehneProps<Z>>;
  /** Für Suche, Querverweise und Handzettel – siehe Verzeichnis. */
  verzeichnis?: Verzeichnis<Z>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type BeliebigesModul = Modul<any>;

/** Hilfsfunktion, damit TypeScript den Zustandstyp eines Moduls durchreicht. */
export function definiereModul<Z extends object>(modul: Modul<Z>): Modul<Z> {
  return modul;
}
