// Medikamentenaufklärungen in Patientensprache. Die Texte sind bewusst
// vereinfacht und ersetzen weder das Gespräch noch den Beipackzettel – bitte vor
// dem Einsatz gegenlesen und anpassen (Übersicht: /korrektur-medikamente).

import { GEBIETE, type Medikament } from './daten/typen';
import { HERZ } from './daten/herz';
import { MAGEN, STOFFWECHSEL } from './daten/stoffwechsel';
import { INFEKT, LUNGE, SCHMERZ, SEELE, WEITERE } from './daten/weitere';
import packungen from './packungen.json';
import { datei, gibtEs } from '../../kern/pfad';

export { GEBIETE, SEITEN } from './daten/typen';
export type { GebietId, Medikament, Merker, Nebenwirkung, SeiteId } from './daten/typen';

const gruppen: Medikament[][] = [HERZ, STOFFWECHSEL, MAGEN, SCHMERZ, LUNGE, INFEKT, SEELE, WEITERE];

const rang = new Map(GEBIETE.map((g, i) => [g.id, i]));

/** Alle Medikamente, nach Gebiet und darin in der Reihenfolge der Dateien. */
export const MEDIKAMENTE: Medikament[] = gruppen
  .flat()
  .sort((a, b) => (rang.get(a.gebiet) ?? 0) - (rang.get(b.gebiet) ?? 0));

const nachId = new Map(MEDIKAMENTE.map((m) => [m.id, m]));

export function findeMedikament(id: string | null): Medikament | undefined {
  return id ? nachId.get(id) : undefined;
}

/**
 * Packungsfoto zu einem Medikament: Pfad unter public/ und Name des abgebildeten
 * Präparats. Beides kommt aus werkzeuge/lade_packungen.mjs; ohne Eintrag gibt es
 * kein Foto.
 */
export function findePackung(id: string): { bild: string; name: string } | undefined {
  const name = (packungen as Record<string, string>)[id];
  const bild = `/bilder/medikamente/${id}.jpg`;
  return name && gibtEs(bild) ? { bild: datei(bild), name } : undefined;
}

const glatt = (s: string) =>
  s
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss');

/** Suche über Wirkstoff, Gruppe, Handelsnamen und Suchwörter; Umlaute und Großschreibung egal. */
export function sucheMedikamente(frage: string): Medikament[] {
  const teile = glatt(frage).split(/\s+/).filter(Boolean);
  if (teile.length === 0) return MEDIKAMENTE;
  return MEDIKAMENTE.filter((m) => {
    const heu = glatt(`${m.name} ${m.zusatz} ${m.handelsnamen.join(' ')} ${m.suche ?? ''}`);
    return teile.every((t) => heu.includes(t));
  });
}
