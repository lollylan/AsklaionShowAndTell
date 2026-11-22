// In welcher Form läuft die App auf diesem Gerät?
//
//   pc      Steuerung hier, Patientenbildschirm in einem zweiten Fenster (src/arzt, src/buehne)
//   tablet  ein Bildschirm für alles: Themen wählen, dann zeigen und durchwischen (src/tablet)
//
// Reihenfolge: ?modus=… in der Adresse → im Gerät gemerkt → Geräte mit Finger- statt
// Mausbedienung starten im Tablet-Modus. Die Wahl wird im Gerät gemerkt.

export type Modus = 'pc' | 'tablet';

const SPEICHER_SCHLUESSEL = 'aufklaerung.modus';

const gueltig = (roh: string | null): Modus | null =>
  roh === 'pc' || roh === 'tablet' ? roh : null;

function merke(modus: Modus) {
  try {
    localStorage.setItem(SPEICHER_SCHLUESSEL, modus);
  } catch {
    // Privates Fenster o. Ä.: dann gilt die Wahl nur bis zum Schließen.
  }
}

function liesGemerkt(): Modus | null {
  try {
    return gueltig(localStorage.getItem(SPEICHER_SCHLUESSEL));
  } catch {
    return null;
  }
}

export function bestimmeModus(): Modus {
  const url = new URL(location.href);
  const ausAdresse = gueltig(url.searchParams.get('modus'));
  if (ausAdresse) {
    merke(ausAdresse);
    // Aus der Adresse nehmen, damit ein späterer Wechsel nicht daran hängen bleibt.
    url.searchParams.delete('modus');
    history.replaceState(null, '', url);
    return ausAdresse;
  }
  const gemerkt = liesGemerkt();
  if (gemerkt) return gemerkt;
  const nurFinger =
    window.matchMedia('(pointer: coarse)').matches && !window.matchMedia('(any-pointer: fine)').matches;
  return nurFinger ? 'tablet' : 'pc';
}

/** Merkt den Modus und lädt die Startseite neu (jeder Modus hat seine eigene Sitzung). */
export function wechsleModus(modus: Modus, startseite: string) {
  merke(modus);
  location.assign(startseite);
}
