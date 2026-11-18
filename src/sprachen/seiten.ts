// Seitenangaben in den Lagerungsmanövern (aufklaerungen/manoever.ts): Die Texte stehen dort als
// Schablonen mit {b}/{g} („nach rechts“) und {be}/{ge} („die rechte Seite“) für betroffene und
// gesunde Seite; die App setzt erst beim Zeichnen „rechts“ oder „links“ ein. Im Wörterbuch stehen
// die Schablonen samt übersetzter Schablone. Hier wird daraus für beide Ohren der fertige Satz:
// deutscher Satz → Satz in der Zielsprache, mit dem Seitenwort, das die Grammatik dort verlangt.

type Ohr = 'rechts' | 'links';
type Platz = 'b' | 'g' | 'be' | 'ge';

interface Seitenwoerter {
  /** Richtung, eingesetzt für {b}/{g} – rechts zuerst, dann links. */
  richtung: [string, string];
  /** Seite, eingesetzt für {be}/{ge}. */
  seite: [string, string];
  /** Sonderfälle vor dem Einsetzen, z. B. ein anderer Fall nach einer Präposition. */
  sonder?: [RegExp, [string, string]][];
}

const WOERTER: Record<string, Seitenwoerter> = {
  en: { richtung: ['right', 'left'], seite: ['right', 'left'] },
  fr: { richtung: ['la droite', 'la gauche'], seite: ['droit', 'gauche'] },
  tr: { richtung: ['sağa', 'sola'], seite: ['sağ', 'sol'] },
  ru: { richtung: ['вправо', 'влево'], seite: ['правый', 'левый'] },
  uk: { richtung: ['праворуч', 'ліворуч'], seite: ['правий', 'лівий'] },
  pl: {
    richtung: ['prawo', 'lewo'],
    seite: ['prawy', 'lewy'],
    // „na … boku“ (Lage, Miejscownik) statt „na … bok“ (Richtung, Biernik).
    sonder: [[/\{(?:be|ge)\} boku/g, ['prawym boku', 'lewym boku']]],
  },
  ro: { richtung: ['dreapta', 'stânga'], seite: ['dreaptă', 'stângă'] },
  ar: { richtung: ['اليمين', 'اليسار'], seite: ['الأيمن', 'الأيسر'] },
  fa: { richtung: ['راست', 'چپ'], seite: ['راست', 'چپ'] },
  zh: { richtung: ['右', '左'], seite: ['右', '左'] },
  ja: { richtung: ['右', '左'], seite: ['右', '左'] },
  ko: {
    richtung: ['오른쪽', '왼쪽'],
    seite: ['오른', '왼'],
    // „오른쪽“ wird zusammengeschrieben.
    sonder: [[/\{(?:be|ge)\} 쪽/g, ['오른쪽', '왼쪽']]],
  },
};

const PLATZ = /\{(b|g|be|ge)\}/;

/** Ob ein Text Seitenplatzhalter enthält. */
export const hatSeite = (text: string) => PLATZ.test(text);

const gegen = (ohr: Ohr): Ohr => (ohr === 'rechts' ? 'links' : 'rechts');

/** Gleiche Regel wie mitSeite in aufklaerungen/manoever.ts. */
function deutsch(text: string, ohr: Ohr): string {
  const g = gegen(ohr);
  return text
    .replaceAll('{be}', ohr === 'rechts' ? 'rechte' : 'linke')
    .replaceAll('{ge}', g === 'rechts' ? 'rechte' : 'linke')
    .replaceAll('{b}', ohr)
    .replaceAll('{g}', g);
}

function fremd(text: string, code: string, w: Seitenwoerter, ohr: Ohr): string {
  const nr = (seite: Ohr) => (seite === 'rechts' ? 0 : 1);
  const welche = (platz: Platz) => (platz.startsWith('b') ? ohr : gegen(ohr));
  let s = text;
  for (const [muster, formen] of w.sonder ?? [])
    s = s.replace(muster, (treffer) => {
      const platz = treffer.match(PLATZ)![1] as Platz;
      return formen[nr(welche(platz))];
    });
  return s.replace(new RegExp(PLATZ, 'g'), (_, platz: Platz, stelle: number) => {
    const wort = (platz.length === 1 ? w.richtung : w.seite)[nr(welche(platz))];
    // Am Satzanfang groß (tr „Sağ tarafınıza…“).
    const anfang = stelle === 0 || /[.!?:]\s*$/.test(s.slice(0, stelle));
    return anfang ? wort.charAt(0).toLocaleUpperCase(code) + wort.slice(1) : wort;
  });
}

/**
 * Fertige Sätze für beide Ohren aus einer Schablone und ihrer Übersetzung; leer, wenn für die
 * Sprache keine Seitenwörter hinterlegt sind (dann bleibt der Satz deutsch).
 */
export function seitenSaetze(code: string, schablone: string, uebersetzt: string): [string, string][] {
  const w = WOERTER[code];
  if (!w || !hatSeite(uebersetzt)) return [];
  return (['rechts', 'links'] as const).map((ohr) => [deutsch(schablone, ohr), fremd(uebersetzt, code, w, ohr)]);
}
