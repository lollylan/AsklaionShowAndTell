// Für den Handzettel reisen Wert und Ziel hinter dem „@“ der Eintrags-id mit:
// „blutdruck@148/92~140“. Ohne vollständigen Wert bleibt es bei der bloßen id.

import { findeMessgroesse, liesZahl } from './daten';

interface Eingabe {
  groesse: string | null;
  eingaben: Record<string, string[]>;
  ziel: Record<string, string | null>;
}

export function verpacke(zustand: Eingabe): string | null {
  const groesse = findeMessgroesse(zustand.groesse);
  if (!groesse) return null;
  const eingaben = zustand.eingaben[groesse.id] ?? [];
  const werte = groesse.teile.map((_, i) => liesZahl(eingaben[i]));
  if (werte.some((w) => w === null)) return groesse.id;
  return `${groesse.id}@${werte.join('/')}~${zustand.ziel[groesse.id] ?? ''}`;
}

export function entpacke(id: string): { groesse: string; eingaben: string[]; ziel: string | null } {
  const [groesse, rest = ''] = id.split('@');
  const [werte = '', ziel = ''] = rest.split('~');
  return { groesse, eingaben: werte ? werte.split('/') : [], ziel: ziel || null };
}
