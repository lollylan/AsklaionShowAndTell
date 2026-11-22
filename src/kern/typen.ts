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
  /**
   * Sprache für Bühne und Handzettel (Code aus src/sprachen/sprachen.ts). Fehlt bei älteren
   * Ständen; dann gilt Deutsch. Die Steuerung bleibt immer deutsch.
   */
  sprache?: string;
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
  /**
   * Nur gesetzt, wenn die Bühne selbst bedient wird (Tablet-Modus, src/tablet): Dann darf
   * die Bühne ihren Zustand ändern, etwa das 3D-Modell mit dem Finger drehen und zoomen.
   */
  aendern?: (aenderung: Partial<Z> | ((alt: Z) => Z)) => void;
}

/** Ein Bild, das man im Tablet-Modus zu einem Eintrag durchblättert. */
export interface Schritt<Z> {
  /** Kurzname für die Bildliste, z. B. „Behandlung“ oder der Name einer Struktur. */
  titel: string;
  /** Stellt dieses Bild ein; bekommt den Zustand, wie er gerade ist (Blickrichtung bleibt so). */
  setze: (alt: Z) => Z;
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
   * Die Bilder eines Eintrags in der Reihenfolge, in der man sie im Tablet-Modus durchwischt.
   * Fehlt die Funktion, hat der Eintrag genau ein Bild (das, was `oeffne` zeigt).
   */
  schritte?: (id: string) => Schritt<Z>[];
  /**
   * Eingaben, die der Tablet-Modus vor dem Zeigen abfragt (z. B. der Messwert des Patienten).
   * Bekommt den Zustand mit aufgeschlagenem Eintrag; was hier geändert wird, gilt beim Zeigen.
   */
  Vorgabe?: ComponentType<SteuerungProps<Z> & { id: string }>;
  /** Die Eingaben aus `Vorgabe` in einer Zeile, z. B. „148/92 mmHg, Ziel unter 140“ – oder null. */
  vorgabeText?: (id: string, zustand: Z) => string | null;
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
