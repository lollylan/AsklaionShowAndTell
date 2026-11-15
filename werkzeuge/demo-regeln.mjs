// Gemeinsame Regeln für die öffentliche Demo: was gesperrt ist und welche Bildlizenzen
// veröffentlicht werden dürfen. Genutzt von vite.config.ts und werkzeuge/pruefe_demo.mjs.

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

export const WURZEL = fileURLToPath(new URL('..', import.meta.url)).replace(/\\/g, '/').replace(/\/$/, '');

/** Zeilen aus gesperrt.txt, getrennt nach Quelltext (src/…) und Dateien (ohne „public/“). */
export function liesGesperrt() {
  const zeilen = readFileSync(new URL('./gesperrt.txt', import.meta.url), 'utf8')
    .split(/\r?\n/)
    .map((z) => z.trim())
    .filter((z) => z && !z.startsWith('#'));
  return {
    quelltext: zeilen.filter((z) => z.startsWith('src/')),
    dateien: zeilen.filter((z) => z.startsWith('public/')).map((z) => z.slice('public/'.length)),
  };
}

/**
 * Lizenzen, unter denen ein fremdes Bild öffentlich gezeigt werden darf: CC0, gemeinfrei,
 * CC BY und CC BY-SA (jede Version, auch Länderfassungen). Als Text, weil die App dieselbe
 * Regel über „define“ bekommt.
 */
export const LIZENZ_ERLAUBT = '^(CC0|Public [Dd]omain|CC BY(-SA)? \\d)';

/** Bild mit Lizenzangabe aus steckbriefe.json / bildgebung.json: darf es in die Demo? */
export function bildErlaubt(bild) {
  const lizenz = String(bild?.lizenz ?? '');
  if (!new RegExp(LIZENZ_ERLAUBT).test(lizenz)) return false;
  // Namensnennung ist bei CC BY und CC BY-SA Pflicht – ohne Urheber geht es nicht.
  return /^(CC0|Public [Dd]omain)/.test(lizenz) || Boolean(String(bild?.urheber ?? '').trim());
}
