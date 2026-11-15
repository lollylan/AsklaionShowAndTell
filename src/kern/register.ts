import type { BeliebigesModul, SitzungsZustand } from './typen';

// Jeder Ordner unter src/module/ mit einer index.ts(x) ist automatisch ein Modul.
// Ordner, die mit einem Unterstrich beginnen (z. B. _vorlage), werden übersprungen.
// Unter src/privat/module/ liegen Module, die nur die Praxisfassung hat; in der öffentlichen
// Demo sind diese Dateien leer (siehe werkzeuge/gesperrt.txt).
const dateien = import.meta.glob<{ default: BeliebigesModul | null }>(
  [
    '../module/*/index.ts',
    '../module/*/index.tsx',
    '!../module/_*/**',
    '../privat/module/*/index.ts',
    '../privat/module/*/index.tsx',
  ],
  { eager: true },
);

export const alleModule: BeliebigesModul[] = Object.entries(dateien)
  .map(([pfad, datei]) => {
    if (datei.default === null) return null;
    if (!datei.default?.id) {
      console.error(`Modul ${pfad} hat keinen gültigen "export default definiereModul(…)".`);
    }
    return datei.default;
  })
  .filter((modul): modul is BeliebigesModul => Boolean(modul))
  .sort(
    (a, b) =>
      (a.reihenfolge ?? 100) - (b.reihenfolge ?? 100) || a.titel.localeCompare(b.titel, 'de'),
  );

const nachId = new Map<string, BeliebigesModul>();
for (const modul of alleModule) {
  if (nachId.has(modul.id)) {
    console.error(`Die Modul-id "${modul.id}" ist doppelt vergeben.`);
  }
  nachId.set(modul.id, modul);
}

export function findeModul(id: string | null): BeliebigesModul | undefined {
  return id ? nachId.get(id) : undefined;
}

/** Zustand eines Moduls lesen; fehlende Felder werden aus dem Startzustand ergänzt. */
export function modulZustand(sitzung: SitzungsZustand, modul: BeliebigesModul): object {
  const gespeichert = sitzung.module[modul.id];
  return gespeichert && typeof gespeichert === 'object'
    ? { ...modul.startZustand, ...gespeichert }
    : modul.startZustand;
}
