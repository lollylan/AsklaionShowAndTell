// Aufklärungstexte zu häufigen Krankheiten der Hausarztpraxis in Patientensprache.
// Die Texte sind bewusst vereinfacht und ersetzen nicht das Gespräch – bitte vor
// dem Einsatz gegenlesen und nach eigenem Stil anpassen (Übersicht: /korrektur).

import { GEBIETE, textseitenVon, type Blattseite, type Krankheit } from './daten/typen';
import type { Bildgebung } from '../../buehne/Aufnahmen';
import bildgebungRoh from './bildgebung.json';
import { HERZ } from './daten/herz';
import { STOFFWECHSEL } from './daten/stoffwechsel';
import { LUNGE } from './daten/lunge';
import { BEWEGUNG } from './daten/bewegung';
import { BAUCH } from './daten/bauch';
import { KOPF } from './daten/kopf';
import { BESCHWERDEN } from './daten/beschwerden';
import { BESCHWERDEN_WEITERE } from './daten/beschwerden-weitere';
import { INFEKTE } from './daten/infekte';
import { UNTERSUCHUNGEN } from './daten/untersuchungen';
import { SPIEGELUNGEN } from './daten/spiegelungen';
import { VERFUEGUNGEN } from './daten/verfuegungen';
import { HAUT } from './daten/haut';
import { AFTER } from './daten/after';
import { LABOR } from './daten/labor';
import { VERLETZUNGEN } from './daten/verletzungen';
import { ARBEIT } from './daten/arbeit';
import { KUR } from './daten/kur';
import { MAGEN_BAUCHWAND } from './daten/magen-bauchwand';
import { HAUT_ENTZUENDLICH } from './daten/haut-entzuendlich';
import { HAUT_WEITERE } from './daten/haut-weitere';
import { INFEKTE_WEITERE } from './daten/infekte-weitere';
import { KREISLAUF } from './daten/kreislauf';
import { RHEUMA } from './daten/rheuma';
import { SEELE_ALTER } from './daten/seele-alter';
import { STOFFWECHSEL_WEITERE } from './daten/stoffwechsel-weitere';
import { VERSORGUNG } from './daten/versorgung';
import { LID_HAUT } from './daten/lid-haut';
import { GESCHLECHTSKRANKHEITEN } from './daten/geschlechtskrankheiten';

export { GEBIETE, SEITEN } from './daten/typen';
export type { Blattseite, GebietId, Krankheit, SeiteId } from './daten/typen';

const gruppen: Krankheit[][] = [
  HERZ,
  KREISLAUF,
  STOFFWECHSEL,
  STOFFWECHSEL_WEITERE,
  LUNGE,
  INFEKTE,
  INFEKTE_WEITERE,
  GESCHLECHTSKRANKHEITEN,
  BEWEGUNG,
  RHEUMA,
  BAUCH,
  MAGEN_BAUCHWAND,
  AFTER,
  KOPF,
  SEELE_ALTER,
  VERLETZUNGEN,
  HAUT,
  HAUT_ENTZUENDLICH,
  HAUT_WEITERE,
  LID_HAUT,
  BESCHWERDEN,
  BESCHWERDEN_WEITERE,
  ARBEIT,
  KUR,
  UNTERSUCHUNGEN,
  SPIEGELUNGEN,
  LABOR,
  VERFUEGUNGEN,
  VERSORGUNG,
];

const rang = new Map(GEBIETE.map((g, i) => [g.id, i]));

/** Alle Krankheiten, nach Gebiet und darin in der Reihenfolge der Dateien. */
export const KRANKHEITEN: Krankheit[] = gruppen
  .flat()
  .sort((a, b) => (rang.get(a.gebiet) ?? 0) - (rang.get(b.gebiet) ?? 0));

const nachId = new Map(KRANKHEITEN.map((k) => [k.id, k]));

export function findeKrankheit(id: string | null): Krankheit | undefined {
  return id ? nachId.get(id) : undefined;
}

const glatt = (s: string) =>
  s
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss');

/** Suche über Name, Zweitname und Suchwörter; Umlaute und Großschreibung egal. */
export function sucheKrankheiten(frage: string): Krankheit[] {
  const teile = glatt(frage).split(/\s+/).filter(Boolean);
  if (teile.length === 0) return KRANKHEITEN;
  return KRANKHEITEN.filter((k) => {
    const heu = glatt(`${k.name} ${k.zusatz ?? ''} ${k.suche ?? ''}`);
    return teile.every((t) => heu.includes(t));
  });
}

/**
 * Überschrift des hervorgehobenen Hinweises auf der letzten Seite: bei Krankheiten und
 * Beschwerden sind es Warnzeichen, bei Untersuchungen und Vorsorgedokumenten ein Merksatz.
 */
export function hinweisTitel(krankheit: Krankheit): string {
  return krankheit.gebiet === 'untersuchungen' ||
    krankheit.gebiet === 'verfuegungen' ||
    krankheit.gebiet === 'arbeit' ||
    krankheit.gebiet === 'kur' ||
    krankheit.gebiet === 'versorgung'
    ? 'Wichtig.'
    : 'Warnzeichen.';
}

// Echte Bilder (Ultraschall, Röntgen, Fotos …) von Wikimedia Commons, geladen mit
// werkzeuge/lade_bildgebung.py --modul aufklaerungen; Bilder unter public/bilder/aufklaerungen/.
// `nach`: id der Seite, hinter der die Bildseite steht (Standard: hinter der ersten).
// Eine Krankheit kann mehrere Bildseiten haben: weitere Einträge heißen `<id>--<name>` und
// bringen eigene `titel` und `kurz` mit (z. B. wunden--verbrennung hinter „Verbrennung“).
type Bildeintrag = Bildgebung & { nach?: string; titel?: string; kurz?: string };
const BILDGEBUNG = bildgebungRoh as unknown as Record<string, Bildeintrag>;

/** Bildeintrag zu einem Schlüssel (id der Krankheit oder `<id>--<name>`). */
export function bildgebungVon(schluessel: string): Bildeintrag | undefined {
  return BILDGEBUNG[schluessel];
}

/** Alle Bildeinträge einer Krankheit: zuerst der unter ihrer id, dann `<id>--…`. */
export function bildgebungenVon(id: string): [string, Bildeintrag][] {
  return Object.entries(BILDGEBUNG).filter(([k]) => k === id || k.startsWith(`${id}--`));
}

/**
 * Die Seiten einer Krankheit in der Reihenfolge, in der geblättert wird. Gibt es echte Bilder,
 * folgt auf die erste Seite (oder die Seite `nach`) „So sieht es im Bild aus“.
 */
export function seitenVon(krankheit: Krankheit): Blattseite[] {
  let seiten = textseitenVon(krankheit);
  for (const [schluessel, gebung] of bildgebungenVon(krankheit.id)) {
    const bildseite: Blattseite = {
      id: schluessel === krankheit.id ? 'im-bild' : `im-bild-${schluessel.split('--')[1]}`,
      titel: gebung.titel ?? 'So sieht es im Bild aus',
      kurz: gebung.kurz ?? 'Im Bild',
      saetze: gebung.saetze,
      art: 'bild',
      gebung: schluessel,
    };
    const stelle = Math.max(seiten.findIndex((s) => s.id === gebung.nach), 0) + 1;
    seiten = [...seiten.slice(0, stelle), bildseite, ...seiten.slice(stelle)];
  }
  return seiten;
}
