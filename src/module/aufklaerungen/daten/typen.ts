// Aufbau der Aufklärungstexte. Jede Krankheit hat vier Seiten, die der Arzt
// nacheinander zeigt. Beschwerden wie Haarausfall oder Müdigkeit, bei denen es um
// mehrere mögliche Ursachen geht, haben stattdessen frei benannte Seiten (`seiten`). Die Texte stehen nach Gebiet sortiert in den Dateien
// dieses Ordners; eine neue Krankheit ist ein weiterer Eintrag dort plus
// (optional) eine Zeichnung unter ../bilder/<id>.tsx.

export type GebietId =
  | 'herz'
  | 'stoffwechsel'
  | 'lunge'
  | 'infekte'
  | 'bewegung'
  | 'bauch'
  | 'kopf'
  | 'beschwerden'
  | 'untersuchungen'
  | 'verfuegungen';

export const GEBIETE: { id: GebietId; name: string }[] = [
  { id: 'herz', name: 'Herz und Gefäße' },
  { id: 'stoffwechsel', name: 'Stoffwechsel und Hormone' },
  { id: 'lunge', name: 'Lunge und Atmung' },
  { id: 'infekte', name: 'Infekte und Allergien' },
  { id: 'bewegung', name: 'Knochen und Gelenke' },
  { id: 'bauch', name: 'Magen, Darm, Niere und Blase' },
  { id: 'kopf', name: 'Kopf, Nerven und Seele' },
  { id: 'beschwerden', name: 'Beschwerden abklären' },
  { id: 'untersuchungen', name: 'Untersuchungen und Befunde' },
  { id: 'verfuegungen', name: 'Vorsorgedokumente und Palliativversorgung' },
];

export type SeiteId = 'was' | 'ursachen' | 'behandlung' | 'selbst';

export const SEITEN: { id: SeiteId; titel: string; kurz: string }[] = [
  { id: 'was', titel: 'Was ist das?', kurz: 'Die Krankheit' },
  { id: 'ursachen', titel: 'Ursachen und Risiken', kurz: 'Ursachen und Risiken' },
  { id: 'behandlung', titel: 'So wird behandelt', kurz: 'Behandlung' },
  { id: 'selbst', titel: 'Das können Sie selbst tun', kurz: 'Selbst tun' },
];

/** Eine Seite, wie sie Bühne, Steuerung und Korrekturansicht zeigen. */
export interface Blattseite {
  id: string;
  /** Überschrift auf der Bühne. */
  titel: string;
  /** Kurzname für die Knöpfe der Steuerung und die Wegleiste unten auf der Bühne. */
  kurz: string;
  saetze: string[];
  /** id einer Zeichnung aus ../bilder, wenn diese Seite eine eigene hat. */
  bild?: string;
  /** 'bild': Seite mit echten Bildern aus ../bildgebung.json statt Zeichnung. */
  art?: 'bild';
}

interface Stamm {
  /** Nur Kleinbuchstaben und Bindestriche; so heißt auch die Zeichnung. */
  id: string;
  name: string;
  /** Fachbegriff oder gebräuchlicher Zweitname. */
  zusatz?: string;
  gebiet: GebietId;
  /** Weitere Suchwörter für die Steuerung (Fachbegriffe, Abkürzungen). */
  suche?: string;
  /** Warnzeichen: steht hervorgehoben auf der letzten Seite. */
  warnung?: string;
}

/** Eine Krankheit mit den vier festen Seiten. */
export interface Standardkrankheit extends Stamm {
  seiten?: undefined;
  /** Was die Krankheit ist und woran man sie merkt – drei bis vier Sätze. */
  was: string[];
  /** Wie sie entsteht, was das Risiko erhöht und was unbehandelt droht. */
  ursachen: string[];
  /** Therapiemöglichkeiten. */
  behandlung: string[];
  /** Was Patientinnen und Patienten selbst beitragen können. */
  selbst: string[];
}

/** Eine Beschwerde mit frei benannten Seiten, meist eine je möglicher Ursache. */
export interface Leitsymptom extends Stamm {
  seiten: Blattseite[];
}

export type Krankheit = Standardkrankheit | Leitsymptom;

/** Die geschriebenen Seiten einer Krankheit, ohne die Bildseite (siehe seitenVon in ../daten). */
export function textseitenVon(krankheit: Krankheit): Blattseite[] {
  if (krankheit.seiten) return krankheit.seiten;
  return SEITEN.map((s) => ({ ...s, saetze: krankheit[s.id] }));
}
