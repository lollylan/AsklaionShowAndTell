// Aufbau der Medikamentenaufklärungen. Jedes Medikament hat vier Seiten, die der
// Arzt nacheinander zeigt. Die Texte stehen nach Gebiet sortiert in den Dateien
// dieses Ordners; ein neues Medikament ist ein weiterer Eintrag dort. Das
// Packungsfoto holt werkzeuge/lade_packungen.mjs (siehe README).

import type { SymbolId } from '../symbole';

export type GebietId =
  | 'herz'
  | 'stoffwechsel'
  | 'magen'
  | 'schmerz'
  | 'lunge'
  | 'infekt'
  | 'seele'
  | 'weitere';

export const GEBIETE: { id: GebietId; name: string }[] = [
  { id: 'herz', name: 'Herz, Blutdruck und Blutverdünnung' },
  { id: 'stoffwechsel', name: 'Zucker, Schilddrüse und Stoffwechsel' },
  { id: 'magen', name: 'Magen und Darm' },
  { id: 'schmerz', name: 'Schmerz und Entzündung' },
  { id: 'lunge', name: 'Lunge' },
  { id: 'infekt', name: 'Infekte' },
  { id: 'seele', name: 'Seele, Schlaf und Nerven' },
  { id: 'weitere', name: 'Weitere' },
];

export type SeiteId = 'wofuer' | 'einnahme' | 'nebenwirkungen' | 'achtung';

export const SEITEN: { id: SeiteId; titel: string; kurz: string }[] = [
  { id: 'wofuer', titel: 'Wofür ist es?', kurz: 'Wofür' },
  { id: 'einnahme', titel: 'So nehmen Sie es', kurz: 'Einnahme' },
  { id: 'nebenwirkungen', titel: 'Mögliche Nebenwirkungen', kurz: 'Nebenwirkungen' },
  { id: 'achtung', titel: 'Darauf achten', kurz: 'Darauf achten' },
];

/** Großer Merkpunkt auf der Einnahme-Seite: Symbol, Schlagzeile, optional ein Zusatz. */
export interface Merker {
  symbol: SymbolId;
  titel: string;
  text?: string;
}

export interface Nebenwirkung {
  symbol: SymbolId;
  /** Zwei, drei Wörter – so wie der Patient es nennen würde. */
  name: string;
  /** Ein kurzer Satz: wie es sich zeigt oder was man tun kann. */
  text: string;
}

export interface Medikament {
  /** Nur Kleinbuchstaben und Bindestriche; so heißt auch das Packungsfoto. */
  id: string;
  /** Wirkstoff. */
  name: string;
  /** Wirkstoffgruppe in Patientensprache, z. B. „Blutdrucksenker (ACE-Hemmer)“. */
  zusatz: string;
  gebiet: GebietId;
  /** Die gängigsten Handelsnamen, Original zuerst. */
  handelsnamen: string[];
  /** Darreichungsform für die Ersatzpackung, z. B. „Tablette“. */
  form: string;
  /** Weitere Suchwörter für die Steuerung. */
  suche?: string;
  /** Wozu es dient und wie es wirkt – zwei bis drei Sätze. */
  wofuer: string[];
  /** Genau zwei Merkpunkte: wann und wie. */
  merker: [Merker, Merker];
  /** Weitere Einnahmehinweise – zwei bis drei Sätze. */
  einnahme: string[];
  /** Die häufigsten oder wichtigsten Nebenwirkungen, drei bis vier. */
  nebenwirkungen: Nebenwirkung[];
  /** Wechselwirkungen, Pausen, Kontrollen – zwei bis drei Sätze. */
  achtung: string[];
  /** Warnzeichen: steht hervorgehoben auf der letzten Seite. */
  warnung?: string;
}
