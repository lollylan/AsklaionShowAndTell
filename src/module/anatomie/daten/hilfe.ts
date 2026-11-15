import type { Art, BlickId, Struktur } from '../daten';

/** Kurzschreibweise für eine Struktur, damit die Listen je Gelenk lesbar bleiben. */
export function s(
  id: string,
  name: string,
  fach: string,
  art: Art,
  gruppe: string,
  blick: BlickId,
  wo: string,
  wozu: string,
  beschwerden: string,
  durchsichtig?: string[] | 'alle',
): Struktur {
  return { id, name, fach, art, gruppe, blick, wo, wozu, beschwerden, durchsichtig };
}

/** Wie `s`, mit Zusätzen für Organe: eigene Farbe, Nachbarn, die stehen bleiben (`mit`). */
export function o(
  id: string,
  name: string,
  fach: string,
  art: Art,
  gruppe: string,
  blick: BlickId,
  wo: string,
  wozu: string,
  beschwerden: string,
  zusatz: Pick<Struktur, 'farbe' | 'mit' | 'durchsichtig'> = {},
): Struktur {
  return { id, name, fach, art, gruppe, blick, wo, wozu, beschwerden, ...zusatz };
}
