// Aktuelle Ausbrüche (WHO/ECDC, von Hand zusammengestellt) und Links ins CRM Handbuch Reisemedizin.
// daten/ausbrueche.json wird von Hand gepflegt, daten/crm.json erzeugt werkzeuge/baue_crm_links.py.
// Die Kartenbilder selbst gibt es nur in der Praxisfassung (siehe privat.ts).

import ausbruecheRoh from './daten/ausbrueche.json';
import crmRoh from './daten/crm.json';
import { datei, gibtEs } from '../../kern/pfad';
import { PRIVAT } from './privat';
import type { CrmLink } from './typen';

export type { CrmLink } from './typen';

export interface Ausbruch {
  id: string;
  krankheit: string;
  /** hoch = Reiseplanung betroffen, mittel = beachten, info = zur Kenntnis. */
  ernst: 'hoch' | 'mittel' | 'info';
  laender: string[];
  text: string;
  /** ISO-Datum der Meldung. */
  datum: string;
  quelle: 'WHO' | 'ECDC';
  url: string;
}

interface AusbruchDatei {
  stand: string;
  quellen: string;
  meldungen: Ausbruch[];
}

interface CrmLand {
  kapitel?: string;
  malaria?: string;
  karte?: string;
  regionen?: Array<{ name: string; karte: string }>;
}

interface CrmDatei {
  quelle: string;
  basis: string;
  laender: Record<string, CrmLand>;
}

const ausbrueche = ausbruecheRoh as unknown as AusbruchDatei;
const crm = crmRoh as unknown as CrmDatei;

export const AUSBRUCH_STAND = ausbrueche.stand;
export const AUSBRUCH_QUELLEN = ausbrueche.quellen;
export const CRM_QUELLE = crm.quelle;

const RANG = { hoch: 0, mittel: 1, info: 2 } as const;

/** Meldungen zu einem Land, wichtigste und neueste zuerst. */
export const ausbruecheFuer = (iso3: string): Ausbruch[] =>
  ausbrueche.meldungen
    .filter((m) => m.laender.includes(iso3))
    .sort((a, b) => RANG[a.ernst] - RANG[b.ernst] || b.datum.localeCompare(a.datum));

/** true, wenn für das Land eine Meldung vorliegt, die die Beratung ändern kann. */
export const hatWichtigenAusbruch = (iso3: string) =>
  ausbruecheFuer(iso3).some((m) => m.ernst !== 'info');

export const datumKurz = (iso: string) => {
  const [j, m, t] = iso.split('-');
  return `${t}.${m}.${j}`;
};

const kartenBild = (abschnitt: string) => {
  const pfad = PRIVAT?.kartenBilder[abschnitt];
  return pfad && gibtEs(pfad) ? datei(pfad) : undefined;
};

const crmUrl = (abschnitt: string) => crm.basis + abschnitt;

/** Links ins CRM: Länderkapitel, Malaria-Abschnitt und Malariakarten (auch für Teilregionen). */
export function crmLinksFuer(iso3: string): { kapitel?: string; malaria?: string; karten: CrmLink[] } {
  const land = crm.laender[iso3];
  if (!land) return { karten: [] };
  const karten: CrmLink[] = [];
  if (land.karte) karten.push({ name: 'Ganzes Land', url: crmUrl(land.karte), bild: kartenBild(land.karte) });
  for (const r of land.regionen ?? [])
    karten.push({ name: r.name, url: crmUrl(r.karte), bild: kartenBild(r.karte) });
  return {
    kapitel: land.kapitel && crmUrl(land.kapitel),
    malaria: land.malaria && crmUrl(land.malaria),
    karten,
  };
}

/** Malariakarten mit lokalem Bild – für die Bühnenseite „Malariagebiete“. */
export const malariakartenFuer = (iso3: string) => crmLinksFuer(iso3).karten.filter((k) => k.bild);
