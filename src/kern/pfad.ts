// Adressen relativ zum Ort, an dem die App liegt.
//
// In der Praxis liegt sie an der Wurzel (/), die öffentliche Demo auf GitHub Pages unter
// /<repo>/. Feste Pfade wie '/bilder/…' gehen deshalb immer durch datei(), Seiten wie
// '/buehne' durch seite().

declare const __GESPERRT__: string[];
declare const __LIZENZ_ERLAUBT__: string;

/** true im Build der öffentlichen Demo (VITE_DEMO=1). */
export const IST_DEMO = import.meta.env.VITE_DEMO === '1';

/** Endet immer auf „/“. */
const BASIS = import.meta.env.BASE_URL;

const ohneSchraegstrich = (pfad: string) => pfad.replace(/^\/+/, '');

/** Adresse einer Datei aus public/, z. B. datei('/bilder/laender/flaggen/THA.svg'). */
export const datei = (pfad: string) => BASIS + ohneSchraegstrich(pfad);

/** Adresse einer Seite der App, z. B. seite('/buehne'). */
export const seite = (pfad: string) => BASIS + ohneSchraegstrich(pfad);

/** Pfad des Fensters relativ zur App: „“ für die Steuerung, „/buehne“, „/handzettel“ … */
export function aktuelleSeite(): string {
  const pfad = location.pathname;
  const innen = pfad.startsWith(BASIS) ? pfad.slice(BASIS.length) : ohneSchraegstrich(pfad);
  return `/${innen}`.replace(/\/+$/, '');
}

/**
 * false, wenn die Datei in dieser Fassung fehlt (werkzeuge/gesperrt.txt). So fragt die App
 * gar nicht erst nach Bildern, die die Demo nicht ausliefert.
 */
export const gibtEs = (pfad: string) => {
  const sauber = ohneSchraegstrich(pfad);
  return !__GESPERRT__.some((g) => sauber === g || sauber.startsWith(g));
};

const LIZENZ_ERLAUBT = new RegExp(__LIZENZ_ERLAUBT__);

/** Darf ein fremdes Bild in dieser Fassung gezeigt werden? Gleiche Regel wie demo-regeln.mjs. */
export function bildErlaubt(bild: { lizenz?: string; urheber?: string }): boolean {
  if (!IST_DEMO) return true;
  const lizenz = bild.lizenz ?? '';
  if (!LIZENZ_ERLAUBT.test(lizenz)) return false;
  return /^(CC0|Public [Dd]omain)/.test(lizenz) || Boolean(bild.urheber?.trim());
}
