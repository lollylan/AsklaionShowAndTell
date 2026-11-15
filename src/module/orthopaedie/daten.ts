// Alles, was Steuerung, Bühne, Handzettel und Übungsblatt aus den Daten brauchen.

import { BEIN } from './daten/bein';
import { ARM_RUECKEN } from './daten/arm-ruecken';
import { UEBUNGEN_BEIN } from './uebungen/bein-ruecken';
import { UEBUNGEN_ARM } from './uebungen/arm-hand';
import bildgebungRoh from './bildgebung.json';
import {
  GEBIETE,
  SEITEN,
  type Bildgebung,
  type Krankheitsbild,
  type SeitenArt,
  type Uebung,
} from './daten/typen';

export * from './daten/typen';

export const KRANKHEITSBILDER: Krankheitsbild[] = [...BEIN, ...ARM_RUECKEN];
export const UEBUNGEN: Uebung[] = [...UEBUNGEN_BEIN, ...UEBUNGEN_ARM];

const BILDGEBUNG = bildgebungRoh as unknown as Record<string, Bildgebung>;

export function findeKrankheitsbild(id: string | null): Krankheitsbild | undefined {
  return id ? KRANKHEITSBILDER.find((k) => k.id === id) : undefined;
}

export function findeUebung(id: string | null): Uebung | undefined {
  return id ? UEBUNGEN.find((u) => u.id === id) : undefined;
}

export function bildgebungVon(id: string): Bildgebung | undefined {
  const b = BILDGEBUNG[id];
  return b && b.aufnahmen.length > 0 ? b : undefined;
}

/** Die Seiten eines Krankheitsbilds in der Reihenfolge des Blätterns („Im Bild“ nur, wenn es eins gibt). */
export function seitenVon(k: Krankheitsbild): { id: SeitenArt; titel: string; kurz: string }[] {
  return SEITEN.filter((s) => s.id !== 'bild' || bildgebungVon(k.id));
}

/** Übungen eines Krankheitsbilds, unbekannte ids fallen weg (und werden gemeldet). */
export function uebungenVon(k: Krankheitsbild): Uebung[] {
  return k.uebungen.map(findeUebung).filter((u): u is Uebung => Boolean(u));
}

if (import.meta.env?.DEV) {
  for (const k of KRANKHEITSBILDER) {
    const fehlt = k.uebungen.filter((id) => !findeUebung(id));
    if (fehlt.length) console.warn(`Orthopädie ${k.id}: Übungen fehlen im Katalog:`, fehlt);
  }
}

const glatt = (s: string) =>
  s.toLowerCase().replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss');

export function sucheKrankheitsbilder(frage: string): Krankheitsbild[] {
  const teile = glatt(frage).split(/\s+/).filter(Boolean);
  if (teile.length === 0) return KRANKHEITSBILDER;
  return KRANKHEITSBILDER.filter((k) => {
    const heu = glatt(
      `${k.name} ${k.zusatz ?? ''} ${k.suche ?? ''} ${GEBIETE.find((g) => g.id === k.gebiet)?.name ?? ''}`,
    );
    return teile.every((t) => heu.includes(t));
  });
}

export function sucheUebungen(frage: string): Uebung[] {
  const teile = glatt(frage).split(/\s+/).filter(Boolean);
  if (teile.length === 0) return UEBUNGEN;
  return UEBUNGEN.filter((u) => {
    const heu = glatt(`${u.name} ${u.ziel}`);
    return teile.every((t) => heu.includes(t));
  });
}
