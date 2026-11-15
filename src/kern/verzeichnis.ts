// Alles, was Module über ihr `verzeichnis` nach außen geben, an einer Stelle:
// Suche über alle Module, Sprung zu einem Eintrag, Schlüssel für Verlauf und Handzettel.

import { alleModule, findeModul, modulZustand } from './register';
import type { BeliebigesModul, SitzungsZustand, VerzeichnisEintrag } from './typen';

/** Ein Eintrag samt Modul. Der Schlüssel „modul:eintrag“ ist überall die Adresse. */
export interface Fundstelle {
  schluessel: string;
  modul: BeliebigesModul;
  eintrag: VerzeichnisEintrag;
}

export const schluesselVon = (modulId: string, eintragId: string) => `${modulId}:${eintragId}`;

/** Schlüssel ohne den Zusatz hinter „@“ (siehe Verzeichnis.aktuell). */
export const stammVon = (schluessel: string) => schluessel.split('@')[0];

/** Zerlegt „modul:eintrag@zusatz“. */
export function zerlege(schluessel: string): { modulId: string; eintragId: string; voll: string } {
  const trenner = schluessel.indexOf(':');
  const modulId = schluessel.slice(0, trenner);
  const voll = schluessel.slice(trenner + 1);
  return { modulId, eintragId: voll.split('@')[0], voll };
}

const glatt = (s: string) =>
  s
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss');

interface Karteikarte extends Fundstelle {
  titelGlatt: string;
  heu: string;
}

const KARTEI: Karteikarte[] = alleModule.flatMap((modul) =>
  (modul.verzeichnis?.eintraege ?? []).map((eintrag) => ({
    schluessel: schluesselVon(modul.id, eintrag.id),
    modul,
    eintrag,
    titelGlatt: glatt(eintrag.titel),
    heu: glatt(`${eintrag.titel} ${eintrag.zusatz ?? ''} ${eintrag.begriffe ?? ''}`),
  })),
);

const nachSchluessel = new Map<string, Fundstelle>(KARTEI.map((k) => [k.schluessel, k]));

export function findeFundstelle(schluessel: string): Fundstelle | undefined {
  return nachSchluessel.get(stammVon(schluessel));
}

/**
 * Suche über alle Module. Jedes Wort der Frage muss vorkommen; Treffer im Titel stehen vor
 * Treffern in Zusatz und Suchwörtern, Titelanfänge ganz oben.
 */
export function sucheUeberall(frage: string, hoechstens = 12): Fundstelle[] {
  const teile = glatt(frage).split(/\s+/).filter(Boolean);
  if (teile.length === 0) return [];
  const gewertet: Array<[number, Karteikarte]> = [];
  for (const karte of KARTEI) {
    if (!teile.every((t) => karte.heu.includes(t))) continue;
    const rang = karte.titelGlatt.startsWith(teile[0])
      ? 0
      : teile.every((t) => karte.titelGlatt.includes(t))
        ? 1
        : 2;
    gewertet.push([rang, karte]);
  }
  return gewertet
    .sort((a, b) => a[0] - b[0])
    .slice(0, hoechstens)
    .map(([, karte]) => karte);
}

/** Schlüssel dessen, was der Patient gerade sieht – oder null (Ruhebild, Startseite eines Moduls). */
export function aktuellerSchluessel(sitzung: SitzungsZustand): string | null {
  if (sitzung.verdeckt) return null;
  const modul = findeModul(sitzung.aktivesModul);
  const id = modul?.verzeichnis?.aktuell(modulZustand(sitzung, modul));
  return modul && id ? schluesselVon(modul.id, id) : null;
}

/** Sitzungszustand, bei dem der Eintrag aufgeschlagen ist. */
export function springeZu(sitzung: SitzungsZustand, schluessel: string): SitzungsZustand {
  const { modulId, eintragId } = zerlege(schluessel);
  const modul = findeModul(modulId);
  if (!modul?.verzeichnis) return sitzung;
  const neu = modul.verzeichnis.oeffne(eintragId, modulZustand(sitzung, modul));
  return {
    ...sitzung,
    aktivesModul: modul.id,
    zeiger: null,
    module: { ...sitzung.module, [modul.id]: neu },
  };
}
