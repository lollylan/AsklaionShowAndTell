// Steckbrief, Städte und Reisetipps je Land.
// steckbriefe.json erzeugt werkzeuge/baue_laenderinfo.mjs aus Wikidata, Weltbank, Commons und
// Natural Earth (nicht von Hand bearbeiten). reisetipps.json ist von Hand geschrieben,
// auf Grundlage der deutschen Wikivoyage (siehe werkzeuge/quellen/tipps/AUFTRAG.md).

import steckbriefDatei from './daten/steckbriefe.json';
import tippDatei from './daten/reisetipps.json';
import { IST_DEMO, bildErlaubt, datei as pfadZu } from '../../kern/pfad';

export interface Wahrzeichen {
  name: string | null;
  bild: string;
  breite: number;
  hoehe: number;
  urheber: string;
  lizenz: string;
  quelle: string;
}

export interface Ort {
  name: string;
  lon: number;
  lat: number;
  pop: number;
  haupt: boolean;
}

export interface Steckbrief {
  hauptstadt: string | null;
  einwohner: number | null;
  einwohnerJahr: number | null;
  flaeche: number | null;
  sprachen: string[];
  waehrungen: string[];
  stecker: string[];
  linksverkehr: boolean | null;
  flagge: string | null;
  wahrzeichen: Wahrzeichen[];
  orte: Ort[];
}

export type TippArt =
  | 'sonne'
  | 'diebstahl'
  | 'wasser'
  | 'essen'
  | 'verkehr'
  | 'kleidung'
  | 'gesetz'
  | 'natur'
  | 'tiere'
  | 'geld'
  | 'gesundheit'
  | 'hoehe'
  | 'meer'
  | 'strom'
  | 'kultur'
  | 'sicherheit';

export interface Tipp {
  art: TippArt;
  text: string;
}

const steckbriefe = steckbriefDatei as unknown as {
  quellen: Record<string, string>;
  laender: Record<string, Steckbrief>;
};
const tipps = tippDatei as unknown as {
  quelle: string;
  laender: Record<string, Tipp[]>;
};

export const STECKBRIEF_QUELLEN = steckbriefe.quellen;
export const TIPP_QUELLE = tipps.quelle;

// Die öffentliche Demo zeigt nur Fotos mit veröffentlichbarer Lizenz (siehe kern/pfad.ts).
if (IST_DEMO) {
  for (const land of Object.values(steckbriefe.laender)) {
    land.wahrzeichen = land.wahrzeichen.filter(bildErlaubt);
  }
}

export const steckbriefVon = (iso3: string): Steckbrief | undefined => steckbriefe.laender[iso3];

/** Alle Länder mit Steckbrief – für die Quellenseite. */
export const ALLE_STECKBRIEFE = steckbriefe.laender;

export const flaggePfad = (datei: string) => pfadZu(`/bilder/laender/flaggen/${datei}`);
export const wahrzeichenPfad = (datei: string) => pfadZu(`/bilder/laender/wahrzeichen/${datei}`);

// ---------- Zahlen in Patientensprache ----------

const zahl = (wert: number, stellen = 0) =>
  wert.toLocaleString('de-DE', { minimumFractionDigits: stellen, maximumFractionDigits: stellen });

/** 71 619 863 → „71,6 Millionen“, 54 900 → „54.900“. */
export function einwohnerText(wert: number): string {
  if (wert >= 1e9) return `${zahl(wert / 1e9, 2)} Milliarden`;
  if (wert >= 1e8) return `${zahl(wert / 1e6)} Millionen`;
  if (wert >= 1e6) return `${zahl(wert / 1e6, 1)} Millionen`;
  if (wert >= 1e4) return zahl(Math.round(wert / 100) * 100);
  return zahl(wert);
}

export function flaecheText(wert: number): string {
  if (wert >= 100) return `${zahl(Math.round(wert))} km²`;
  if (wert >= 1) return `${zahl(wert, 1)} km²`;
  return `${zahl(wert, 2)} km²`;
}

// Vergleichsflächen (Statistisches Bundesamt, Stand 2023) – bekannte Größen aus Sicht der Praxis.
const VERGLEICH: Array<[string, number]> = [
  ['Deutschland', 357_588],
  ['Bayern', 70_542],
  ['Hessen', 21_116],
  ['das Saarland', 2_570],
  ['die Stadt Würzburg', 87.6],
];

/** „etwa 1,4-mal so groß wie Deutschland“, „etwa so groß wie Hessen“. */
export function groessenVergleich(flaeche: number): string {
  const [name, ref] = VERGLEICH.find(([, f]) => flaeche >= f * 0.85) ?? VERGLEICH[VERGLEICH.length - 1];
  const faktor = flaeche / ref;
  if (faktor < 0.85) return 'kleiner als die Stadt Würzburg';
  if (faktor < 1.2) return `etwa so groß wie ${name}`;
  if (faktor < 3) return `etwa ${zahl(faktor, 1)}-mal so groß wie ${name}`;
  const gerundet = faktor < 10 ? Math.round(faktor) : Math.round(faktor / 5) * 5;
  return `etwa ${zahl(gerundet)}-mal so groß wie ${name}`;
}

/** Sprachen zum Vorlesen: bis drei nennen, sonst „12 Amtssprachen, u. a. …“. */
export function sprachenText(sprachen: string[]): string {
  // Englisch zuerst nennen – für Reisende die wichtigste Auskunft.
  const sauber = sprachen
    .map((s) => s.replace(/^britisches /, ''))
    .sort((a, b) => Number(b === 'Englisch') - Number(a === 'Englisch'));
  if (sauber.length <= 3) return sauber.join(', ');
  return `${sauber.length} Amtssprachen, u. a. ${sauber.slice(0, 3).join(', ')}`;
}

/** Passt ein deutscher Stecker (Typ C oder F) in die Steckdosen des Landes? */
export function steckerPasst(stecker: string[]): boolean | null {
  if (stecker.length === 0) return null;
  return stecker.some((s) => /Schuko|Eurostecker|Typ C|Typ E|Typ F/.test(s));
}

/** Steckertypen als Buchstaben: „Stecker-Typ G“, „Stecker BS 1363“ → „G“. */
export function steckerBuchstaben(stecker: string[]): string[] {
  const buchstabe = (s: string) =>
    /BS 1363/.test(s) ? 'G' : /Schuko/.test(s) ? 'F' : /Eurostecker/.test(s) ? 'C' : /SN 441011/.test(s) ? 'J' : /IEC 60906-1/.test(s) ? 'N' : (s.match(/Typ ([A-Z])/)?.[1] ?? null);
  return [...new Set(stecker.map(buchstabe).filter((b): b is string => Boolean(b)))].sort();
}

/**
 * Tipps für die Bühne: die von Hand geschriebenen, dazu zwei aus den Daten abgeleitete
 * (Stecker, Linksverkehr), sofern das Land dort von Deutschland abweicht.
 */
export function tippsFuer(iso3: string): Tipp[] {
  const liste = [...(tipps.laender[iso3] ?? [])];
  const s = steckbriefVon(iso3);
  if (s) {
    const hatStrom = liste.some((t) => t.art === 'strom');
    const hatVerkehr = liste.some((t) => t.art === 'verkehr' && /links/i.test(t.text));
    if (!hatStrom && steckerPasst(s.stecker) === false) {
      const typen = steckerBuchstaben(s.stecker);
      liste.push({
        art: 'strom',
        text: `Deutsche Stecker passen meist nicht${typen.length ? ` (Steckdosen Typ ${typen.join('/')})` : ''}. Einen Reiseadapter mitnehmen.`,
      });
    }
    if (!hatVerkehr && s.linksverkehr) {
      liste.push({ art: 'verkehr', text: 'Es herrscht Linksverkehr. Beim Überqueren der Straße zuerst nach rechts schauen.' });
    }
  }
  return liste;
}
