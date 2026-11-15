// Welche Themen stehen in der Liste „Schutz und Impfungen“ – und welche sieht der Patient?
//
// Praxisfassung: der Vorschlag aus Land und Reiseart (src/privat/reiseimpfung/logik.ts), den
// der Arzt je Zeile ändern kann. Öffentliche Fassung: der ganze Katalog ohne Vorauswahl und
// ohne Bezug zum Land; gezeigt wird nur, was von Hand angehakt ist.

import { KRANKHEITEN } from './krankheiten';
import { PRIVAT } from './privat';
import type { Empfehlung, Land } from './typen';

/** true, wenn diese Fassung selbst nichts vorschlägt. */
export const NUR_VON_HAND = PRIVAT === null;

export function eintraegeFuer(
  land: Land | null | undefined,
  ziele: Land[],
  stile: string[],
  manuell: Record<string, boolean>,
): Empfehlung[] {
  if (PRIVAT) {
    return land
      ? PRIVAT.empfehlungenFuer(land, stile, manuell)
      : PRIVAT.empfehlungenGesamt(ziele, stile, manuell);
  }
  return KRANKHEITEN.map((k) => ({ id: k.id, grund: k.kurz, zeigen: manuell[k.id] ?? false }));
}
