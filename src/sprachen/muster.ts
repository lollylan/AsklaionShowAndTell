// Zusammengesetzte Texte (Schablonen): Manche Texte baut die App erst beim Zeichnen zusammen,
// z. B. „71,6 Millionen“, „etwa 3-mal so groß wie Bayern“ oder „Paschto, Dari“. Sie stehen so
// nicht im Wörterbuch. Im Wörterbuch stehen stattdessen Schablonen mit {0}, {1} …
// („{0} Millionen“ → „{0} million“); hier werden sie erkannt und gefüllt:
//   - Zahlen in deutscher Schreibweise werden in die Schreibweise der Zielsprache gebracht
//     (immer mit Ziffern 0–9, auch für Arabisch und Persisch),
//   - Wörter werden selbst nachgeschlagen (auch Listen mit Komma),
//   - Kurzes ohne Wörter (Steckertypen „G/D“) bleibt, wie es ist.
// In der Zielschablone außerdem:
//   {0*100}   Zahl vorher mal 100 (Chinesisch/Japanisch/Koreanisch zählen in 万/億: 71,6 Mio. = 7160万)
//   [0:one=раз;few=раза;many=раз;other=раза]   Wort nach der Pluralregel der Sprache für Lücke 0
// Lässt sich ein Teil nicht übersetzen, gilt die Schablone als nicht getroffen – der Text bleibt
// dann ganz deutsch statt halb übersetzt.

export interface Muster {
  re: RegExp;
  /** Zielschablone mit {0}, {1} … */
  ziel: string;
  /** Nummer der Lücke je Fanggruppe (die Reihenfolge darf in der Übersetzung wechseln). */
  luecken: number[];
}

const LUECKE = /\{(\d)\}/g;

export const istMuster = (schluessel: string) => /\{\d\}/.test(schluessel);

const maskiere = (s: string) => s.replace(/[.*+?^$()|[\]\\{}]/g, '\\$&');

export function baueMuster(de: string, ziel: string): Muster {
  const luecken: number[] = [];
  let quelle = '';
  let rest = 0;
  for (const t of de.matchAll(LUECKE)) {
    quelle += maskiere(de.slice(rest, t.index)) + '(.+?)';
    luecken.push(Number(t[1]));
    rest = t.index! + t[0].length;
  }
  quelle += maskiere(de.slice(rest));
  return { re: new RegExp(`^${quelle}$`), ziel, luecken };
}

/** Deutsche Zahl („71,6“, „54.900“) → Wert und Nachkommastellen; null, wenn es keine ist. */
function leseZahl(text: string): { wert: number; stellen: number } | null {
  if (!/^[−-]?\d{1,3}(\.\d{3})*(,\d+)?$|^[−-]?\d+(,\d+)?$/.test(text)) return null;
  return {
    wert: Number(text.replace(/\./g, '').replace(',', '.').replace('−', '-')),
    stellen: text.split(',')[1]?.length ?? 0,
  };
}

function schreibeZahl(z: { wert: number; stellen: number }, code: string, mal = 1): string {
  const stellen = Math.max(0, z.stellen - Math.round(Math.log10(mal)));
  return (z.wert * mal).toLocaleString(`${code}-u-nu-latn`, {
    minimumFractionDigits: stellen,
    maximumFractionDigits: stellen,
    useGrouping: mal === 1,
  });
}

const ZIEL = /\{(\d)(?:\*(\d+))?\}|\[(\d):([^\]]+)\]/g;

const LISTENZEICHEN: Record<string, string> = { zh: '、', ja: '、', ar: '، ', fa: '، ' };
const HAT_WORT = /[A-Za-zÄÖÜäöüß]{3,}/;

type Nachschlagen = (text: string) => string | undefined;

/** Liste mit Komma („Paschto, Dari“), wenn jedes Glied bekannt ist. */
export function liste(text: string, code: string, schlage: Nachschlagen): string | undefined {
  if (!text.includes(', ')) return undefined;
  const teile = text.split(', ');
  if (teile.some((t) => t.length > 60)) return undefined;
  const fertig = teile.map((t) => schlage(t) ?? (HAT_WORT.test(t) ? undefined : t));
  if (fertig.some((t) => t === undefined)) return undefined;
  return fertig.join(LISTENZEICHEN[code] ?? ', ');
}

/** Füllt die erste passende Schablone; undefined, wenn keine ganz aufgeht. */
export function fuelleMuster(
  text: string,
  code: string,
  muster: Muster[],
  schlage: Nachschlagen,
): string | undefined {
  for (const m of muster) {
    const treffer = text.match(m.re);
    if (!treffer) continue;
    const werte: string[] = [];
    const zahlen: ({ wert: number; stellen: number } | null)[] = [];
    let geht = true;
    m.luecken.forEach((nr, i) => {
      const teil = treffer[i + 1];
      zahlen[nr] = leseZahl(teil);
      const neu = zahlen[nr] ? teil : schlage(teil) ?? liste(teil, code, schlage) ?? (HAT_WORT.test(teil) ? undefined : teil);
      if (neu === undefined) geht = false;
      else werte[nr] = neu;
    });
    if (!geht) continue;
    return m.ziel.replace(ZIEL, (_, nr?: string, mal?: string, pnr?: string, formen?: string) => {
      if (pnr !== undefined) {
        const z = zahlen[Number(pnr)];
        const wahl = Object.fromEntries(formen!.split(';').map((f) => f.split('=') as [string, string]));
        const regel = z
          ? new Intl.PluralRules(code, { minimumFractionDigits: z.stellen }).select(z.wert)
          : 'other';
        return wahl[regel] ?? wahl.other ?? '';
      }
      const z = zahlen[Number(nr)];
      return z ? schreibeZahl(z, code, Number(mal ?? 1)) : (werte[Number(nr)] ?? '');
    });
  }
  return undefined;
}
