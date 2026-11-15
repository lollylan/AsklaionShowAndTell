// Welcher Raum (Behandlungszimmer) ist dieses Fenster?
//
// Reihenfolge: ?raum=… in der Adresse → im Gerät gemerkt → „standard“.
// Ein Raum aus der Adresse wird im Gerät gemerkt, damit jeder Rechner nur
// einmal mit  …/?raum=zimmer-2  geöffnet werden muss.

export const STANDARD_RAUM = 'standard';
const SPEICHER_SCHLUESSEL = 'aufklaerung.raum';

/** Gleiche Regel wie normalisiereRaum in server/relay.mjs. */
export function normalisiereRaum(roh: unknown): string {
  const sauber = String(roh ?? '')
    .trim()
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 32)
    .replace(/-+$/g, '');
  return sauber || STANDARD_RAUM;
}

function liesGemerkt(): string | null {
  try {
    return localStorage.getItem(SPEICHER_SCHLUESSEL);
  } catch {
    return null;
  }
}

function merke(raum: string) {
  try {
    localStorage.setItem(SPEICHER_SCHLUESSEL, raum);
  } catch {
    // Privates Fenster o. Ä.: dann eben nur über die Adresse.
  }
}

export function bestimmeRaum(): string {
  const ausAdresse = new URLSearchParams(location.search).get('raum');
  if (ausAdresse !== null) {
    const raum = normalisiereRaum(ausAdresse);
    merke(raum);
    return raum;
  }
  return normalisiereRaum(liesGemerkt());
}

/** Lesbarer Name für die Anzeige: „zimmer-2“ → „Zimmer 2“. */
export function raumAnzeige(raum: string): string {
  const text = raum.replace(/-/g, ' ');
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/** Adresse eines Fensters im Raum, z. B. /buehne?raum=zimmer-2. */
export function raumAdresse(pfad: string, raum: string): string {
  return `${pfad}?raum=${encodeURIComponent(raum)}`;
}

/** Wechselt diesen Rechner in einen anderen Raum (lädt die Seite neu). */
export function wechsleRaum(roh: string) {
  const raum = normalisiereRaum(roh);
  merke(raum);
  const url = new URL(location.href);
  url.searchParams.set('raum', raum);
  location.assign(url.toString());
}
