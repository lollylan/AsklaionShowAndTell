// Länderdaten der Reiseimpfberatung.
//
// daten/laender.json (Namen, Codes, Karte, Klima) und src/privat/reiseimpfung/fach.json
// (Empfehlungsfelder aus den STIKO/DTG-Ländertabellen und der DTG-Malariatabelle) erzeugt
// werkzeuge/baue_reisedaten.py aus den Originalquellen – nicht von Hand bearbeiten.
// Die Empfehlungsfelder gibt es nur in der Praxisfassung; sonst bleiben sie leer.

import roh from './daten/laender.json';
import { PRIVAT } from './privat';
import type { Land, LandFach } from './typen';

export type { Land, Malaria, MalariaGebiet } from './typen';

type Grunddaten = Omit<Land, keyof LandFach>;

interface Datei {
  quellen: { klima: string };
  laender: Grunddaten[];
}

const datei = roh as unknown as Datei;

const OHNE_FACH: LandFach = {
  pflicht: [],
  alle: [],
  risiko: [],
  regional: [],
  hinweise: [],
  malaria: null,
};

export const QUELLEN = {
  klima: datei.quellen.klima,
  impfungen: PRIVAT?.quellen.impfungen ?? '',
  malaria: PRIVAT?.quellen.malaria ?? '',
};

export const LAENDER: Land[] = datei.laender.map((land) => ({
  ...land,
  ...OHNE_FACH,
  ...PRIVAT?.fach[land.iso3],
}));

const nachIso3 = new Map(LAENDER.map((land) => [land.iso3, land]));

export const findeLand = (iso3: string | null | undefined) =>
  iso3 ? nachIso3.get(iso3) : undefined;

export const istLand = (land: Land | undefined): land is Land => Boolean(land);
