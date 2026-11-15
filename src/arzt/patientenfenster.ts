// Öffnet den Patientenbildschirm als eigenes Fenster – wenn der Browser es
// erlaubt, gleich auf dem zweiten Monitor.

import { raumAdresse } from '../kern/raum';
import { seite } from '../kern/pfad';

interface BildschirmInfo {
  availLeft: number;
  availTop: number;
  availWidth: number;
  availHeight: number;
}

interface BildschirmDetails {
  currentScreen: BildschirmInfo;
  screens: BildschirmInfo[];
}

type FensterMitBildschirmen = Window & {
  getScreenDetails?: () => Promise<BildschirmDetails>;
};

const FENSTERNAME = 'aufklaerung-buehne';

/** Liefert false, wenn der Browser das Fenster blockiert hat (Pop-up-Blocker). */
export async function oeffnePatientenfenster(raum: string): Promise<boolean> {
  let merkmale = 'popup,width=1280,height=720';

  try {
    // Chrome/Edge fragen hier einmalig nach der Berechtigung „Fensterverwaltung“.
    const details = await (window as FensterMitBildschirmen).getScreenDetails?.();
    const zweiter = details?.screens.find((s) => s !== details.currentScreen);
    if (zweiter) {
      merkmale =
        `popup,left=${zweiter.availLeft},top=${zweiter.availTop},` +
        `width=${zweiter.availWidth},height=${zweiter.availHeight}`;
    }
  } catch {
    // Berechtigung abgelehnt oder nicht unterstützt: normales Fenster öffnen.
  }

  const fenster = window.open(raumAdresse(seite('/buehne'), raum), FENSTERNAME, merkmale);
  fenster?.focus();
  return Boolean(fenster);
}
