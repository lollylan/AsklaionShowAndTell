import { DERMATOME } from './dermatome';
import { HAUTNERVEN } from './hautnerven';
import type { Karte } from './koerper';

export type { Karte, Gebiet, Seite } from './koerper';

export const KARTEN: Karte[] = [DERMATOME, HAUTNERVEN];

export type KartenId = Karte['id'];

export function findeKarte(id: string | null | undefined): Karte | undefined {
  return KARTEN.find((k) => k.id === id);
}

export const QUELLE_KARTEN =
  'Schematische Zeichnung nach gängigen Dermatom- und Nervenkarten; die Grenzen sind bei jedem Menschen etwas anders und überlappen.';
