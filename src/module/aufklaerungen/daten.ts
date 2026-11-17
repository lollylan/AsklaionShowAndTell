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
import { VERFUEGUNGEN } from './daten/verfuegungen';
import { HAUT } from './daten/haut';
import { AFTER } from './daten/after';
import { LABOR } from './daten/labor';
import { VERLETZUNGEN } from './daten/verletzungen';
import { ARBEIT } from './daten/arbeit';
import { KUR } from './daten/kur';
import { MAGEN_BAUCHWAND } from './daten/magen-bauchwand';

export { GEBIETE, SEITEN } from './daten/typen';
export type { Blattseite, GebietId, Krankheit, SeiteId } from './daten/typen';

const gruppen: Krankheit[][] = [
  HERZ,
  STOFFWECHSEL,
  LUNGE,
  INFEKTE,
  BEWEGUNG,
  BAUCH,
  MAGEN_BAUCHWAND,
  AFTER,
  KOPF,
  VERLETZUNGEN,
  HAUT,
  BESCHWERDEN,
  BESCHWERDEN_WEITERE,
  ARBEIT,
  KUR,
  UNTERSUCHUNGEN,
  LABOR,
  VERFUEGUNGEN,
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
    krankheit.gebiet === 'kur'
    ?'Wichtig.'
    : 'Warnzeichen.';
}

// Echte Bilder (Ultraschall, Röntgen, Fotos …) von Wikimedia Commons, geladen mit
// werkzeuge/lade_bildgebung.py --modul aufklaerungen; Bilder unter public/bilder/aufklaerungen/.
// `nach`: id der Seite, hinter der die Bildseite steht (Standard: hinter der ersten).
const BILDGEBUNG = bildgebungRoh as unknown as Record<string, Bildgebung & { nach?: string }>;

export function bildgebungVon(id: string): (Bildgebung & { nach?: string }) | undefined {
  return BILDGEBUNG[id];
}

/**
 * Die Seiten einer Krankheit in der Reihenfolge, in der geblättert wird. Gibt es echte Bilder,
 * folgt auf die erste Seite (oder die Seite `nach`) „So sieht es im Bild aus“.
 */
export function seitenVon(krankheit: Krankheit): Blattseite[] {
  const seiten = textseitenVon(krankheit);
  const gebung = bildgebungVon(krankheit.id);
  if (!gebung) return seiten;
  const bildseite: Blattseite = {
    id: 'im-bild',
    titel: 'So sieht es im Bild aus',
    kurz: 'Im Bild',
    saetze: gebung.saetze,
    art: 'bild',
  };
  const stelle = Math.max(seiten.findIndex((s) => s.id === gebung.nach), 0) + 1;
  return [...seiten.slice(0, stelle), bildseite, ...seiten.slice(stelle)];
}
