// Aufbau des Moduls „Orthopädie“.
//
// Ein Krankheitsbild hat bis zu sechs Seiten, die der Arzt nacheinander zeigt:
//   1. Was ist das?      – Vergleich gesund / erkrankt (Zeichnung ../bilder/<id>.tsx)
//   2. Im Modell         – drehbares 3D-Modell aus dem Modul Anatomie, eine Struktur leuchtet
//   3. Im Bild           – Röntgen-/MRT-Bild von Wikimedia Commons (nur wenn vorhanden,
//                          siehe ../bildgebung.json)
//   4. Ursachen          – wie es entsteht, was das Risiko erhöht
//   5. Was hilft?        – Behandlungen mit Einstufung, wie gut sie belegt sind
//   6. Übungen           – Übungen aus dem Katalog (../uebungen), dazu das Warnzeichen
//
// Texte stehen nach Körperregion sortiert in den Dateien dieses Ordners.

export type GebietId = 'fuss' | 'knie-huefte' | 'schulter-arm' | 'hand' | 'ruecken';

export const GEBIETE: { id: GebietId; name: string }[] = [
  { id: 'fuss', name: 'Fuß und Ferse' },
  { id: 'knie-huefte', name: 'Knie und Hüfte' },
  { id: 'schulter-arm', name: 'Schulter und Ellenbogen' },
  { id: 'hand', name: 'Hand' },
  { id: 'ruecken', name: 'Rücken und Nacken' },
];

/**
 * Wie gut eine Behandlung belegt ist – grob nach Leitlinienlage (AWMF/DEGAM, NICE, Cochrane):
 *  - gut:      in Studien klar wirksam, von Leitlinien empfohlen
 *  - moeglich: kann helfen, Belege schwächer oder Nutzen klein; Versuch lohnt sich
 *  - unklar:   kaum oder widersprüchlich untersucht
 *  - abraten:  nutzt nicht oder schadet eher; Leitlinien raten ab
 */
export type Evidenz = 'gut' | 'moeglich' | 'unklar' | 'abraten';

export const EVIDENZ: Record<Evidenz, { name: string; kurz: string }> = {
  gut: { name: 'Gut belegt', kurz: 'gut belegt' },
  moeglich: { name: 'Kann helfen', kurz: 'kann helfen' },
  unklar: { name: 'Wenig untersucht', kurz: 'wenig untersucht' },
  abraten: { name: 'Eher nicht', kurz: 'eher nicht' },
};

export interface Therapie {
  /** Kurz, z. B. „Dehnübungen“, „Stoßwellen“, „Kortisonspritze“. */
  name: string;
  /** Ein Satz in Patientensprache: was es ist und was man davon erwarten kann. */
  text: string;
  evidenz: Evidenz;
}

/** Regionen des Anatomie-Moduls, deren 3D-Modell hier gezeigt werden kann. */
export type ModellRegion =
  | 'fuss'
  | 'knie'
  | 'huefte'
  | 'hand'
  | 'schulter'
  | 'ellenbogen'
  | 'lws'
  | 'hws'
  | 'becken';

export type ModellBlick =
  | 'vorn'
  | 'seite'
  | 'hinten'
  | 'innen'
  | 'schraeg'
  | 'schraegLinks'
  | 'oben'
  | 'unten';

export interface ModellAnsicht {
  region: ModellRegion;
  /** id einer Struktur dieser Region (siehe src/module/anatomie/daten). */
  struktur: string;
  /** Blickrichtung; ohne Angabe die der Struktur. */
  blick?: ModellBlick;
  /** Strukturen, die den Bildausschnitt bestimmen; ohne Angabe die ganze Region. */
  fokus?: string[];
  /** Strukturen, die ausgeblendet werden, weil sie den Blick verstellen. */
  aus?: string[];
  /** Vergrößerung, Standard 1.2. */
  zoom?: number;
  /** Zwei bis drei Sätze: was man im Modell sieht und wo genau es wehtut. */
  saetze: string[];
}

export interface Krankheitsbild {
  /** Nur Kleinbuchstaben und Bindestriche; so heißt auch die Zeichnung. */
  id: string;
  /** Name in Patientensprache, z. B. „Fersenschmerz“. */
  name: string;
  /** Fachbegriff(e), z. B. „Plantarfasziitis, Fersensporn“. */
  zusatz?: string;
  gebiet: GebietId;
  /** Weitere Suchwörter (Fachbegriffe, Abkürzungen, Umgangssprache). */
  suche?: string;
  /** Seite „Was ist das?“: drei bis vier Sätze, woran man es merkt. */
  was: string[];
  modell: ModellAnsicht;
  /** Seite „Ursachen“: drei bis vier Sätze. */
  ursachen: string[];
  /** Seite „Was hilft?“: vier bis sieben Behandlungen, die gut belegten zuerst. */
  therapien: Therapie[];
  /** Ein Satz über dem Therapieblock, z. B. „Meist bessert es sich in 6–12 Monaten von selbst.“ */
  verlauf: string;
  /** ids aus dem Übungskatalog, zwei bis vier Stück, wichtigste zuerst. */
  uebungen: string[];
  /** Ein bis zwei kurze Alltagstipps, stehen über den Übungen. */
  alltag: string[];
  /** Warnzeichen: wann sofort oder bald wiederkommen. Steht hervorgehoben auf der letzten Seite. */
  warnung: string;
}

/** Eine Übung zum Mitgeben. */
export interface Uebung {
  /** Nur Kleinbuchstaben und Bindestriche; so heißt auch die Figur (../figuren/<id>.tsx). */
  id: string;
  /** Kurz, z. B. „Wade dehnen an der Wand“. */
  name: string;
  /** Wofür, ein kurzer Satz: „Dehnt Wade und Sehnenplatte der Fußsohle.“ */
  ziel: string;
  /** Ausgangsstellung, ein Satz. */
  ausgang: string;
  /** Zwei bis vier Schritte, je ein kurzer Satz. */
  schritte: string[];
  /** Wie oft, z. B. „3 × 30 Sekunden halten, 2-mal täglich“. */
  dosis: string;
  /** Worauf achten, ein Satz (optional). */
  achtung?: string;
}

export type SeitenArt = 'was' | 'modell' | 'bild' | 'ursachen' | 'hilft' | 'uebungen';

export const SEITEN: { id: SeitenArt; titel: string; kurz: string }[] = [
  { id: 'was', titel: 'Was ist das?', kurz: 'Was ist das?' },
  { id: 'modell', titel: 'Wo genau?', kurz: 'Im Modell' },
  { id: 'bild', titel: 'So sieht es im Bild aus', kurz: 'Im Bild' },
  { id: 'ursachen', titel: 'Wie entsteht das?', kurz: 'Ursachen' },
  { id: 'hilft', titel: 'Was hilft?', kurz: 'Was hilft?' },
  { id: 'uebungen', titel: 'Das können Sie selbst tun', kurz: 'Übungen' },
];

export type { Aufnahme, Bildgebung } from '../../../buehne/Aufnahmen';
