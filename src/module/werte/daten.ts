// Messwerte, die sich auf einer Skala einordnen lassen. Der Arzt tippt den Wert des
// Patienten ein, die Bühne zeigt ihn zwischen den Bereichen. Gespeichert wird nichts –
// der Wert lebt nur in der laufenden Sitzung und verschwindet mit „Neue Sitzung“.
//
// Die Grenzen sind Richtwerte nach den gängigen Leitlinien (ESC/ESH, NVL, KDIGO, WHO) und
// je nach Labor und Person etwas verschieden – bitte gegenlesen.

/** Farbton eines Bereichs: von „in Ordnung“ bis „deutlich außerhalb“. */
export type Ton = 'niedrig' | 'gut' | 'grenze' | 'hoch' | 'sehrhoch';

export interface Bereich {
  /** Obere Grenze (ausschließlich). Der letzte Bereich reicht bis zum Ende der Skala. */
  bis: number;
  name: string;
  ton: Ton;
}

/** Eine Zahl, die eingetippt wird, mit eigener Skala (Blutdruck hat zwei davon). */
export interface Teilwert {
  id: string;
  /** Beschriftung des Eingabefelds und der Skala, z. B. „Oberer Wert“. */
  name: string;
  /** Anfang und Ende der gezeichneten Skala. */
  von: number;
  ende: number;
  /** Nachkommastellen bei der Anzeige. */
  stellen: number;
  bereiche: Bereich[];
}

/** Persönliches Ziel, das der Arzt wählen kann; erscheint als Marke auf der Skala. */
export interface Ziel {
  id: string;
  /** Für den Knopf beim Arzt, z. B. „hohes Risiko“. */
  name: string;
  /** Für die Bühne, z. B. „unter 70“. */
  text: string;
  /** Grenze je Teilwert, in der Reihenfolge von `teile`. */
  grenzen: number[];
  /** 'unter': Wert soll darunter liegen; 'ueber': darüber. */
  richtung: 'unter' | 'ueber';
}

export interface Messgroesse {
  id: string;
  name: string;
  /** Fachbegriff oder Erläuterung. */
  zusatz: string;
  einheit: string;
  /** Überschrift auf der Bühne, z. B. „Ihr Blutdruck“. */
  titel: string;
  teile: Teilwert[];
  ziele?: Ziel[];
  /**
   * true: Die Bereiche ergeben sich allein aus dem gewählten Ziel (LDL) –
   * `bereiche` nennt dann nur die Stufen ober- und unterhalb.
   */
  nurZiel?: boolean;
  /** Zwei, drei Sätze in Patientensprache: was der Wert sagt. */
  saetze: string[];
  begriffe: string;
}

export const MESSGROESSEN: Messgroesse[] = [
  {
    id: 'blutdruck',
    name: 'Blutdruck',
    zusatz: 'in der Praxis gemessen',
    einheit: 'mmHg',
    titel: 'Ihr Blutdruck',
    teile: [
      {
        id: 'sys',
        name: 'Oberer Wert',
        von: 90,
        ende: 200,
        stellen: 0,
        bereiche: [
          { bis: 120, name: 'optimal', ton: 'gut' },
          { bis: 130, name: 'normal', ton: 'gut' },
          { bis: 140, name: 'hochnormal', ton: 'grenze' },
          { bis: 160, name: 'leicht erhöht', ton: 'hoch' },
          { bis: 180, name: 'deutlich erhöht', ton: 'hoch' },
          { bis: 200, name: 'stark erhöht', ton: 'sehrhoch' },
        ],
      },
      {
        id: 'dia',
        name: 'Unterer Wert',
        von: 50,
        ende: 120,
        stellen: 0,
        bereiche: [
          { bis: 80, name: 'optimal', ton: 'gut' },
          { bis: 85, name: 'normal', ton: 'gut' },
          { bis: 90, name: 'hochnormal', ton: 'grenze' },
          { bis: 100, name: 'leicht erhöht', ton: 'hoch' },
          { bis: 110, name: 'deutlich erhöht', ton: 'hoch' },
          { bis: 120, name: 'stark erhöht', ton: 'sehrhoch' },
        ],
      },
    ],
    ziele: [
      { id: '140', name: 'unter 140/90', text: 'unter 140 zu 90', grenzen: [140, 90], richtung: 'unter' },
      { id: '130', name: 'unter 130/80', text: 'unter 130 zu 80', grenzen: [130, 80], richtung: 'unter' },
      { id: '135', name: 'zu Hause: unter 135/85', text: 'zu Hause unter 135 zu 85', grenzen: [135, 85], richtung: 'unter' },
    ],
    saetze: [
      'Der obere Wert ist der Druck, wenn das Herz pumpt. Der untere ist der Druck, wenn es sich wieder füllt.',
      'Eine einzelne Messung sagt wenig. Entscheidend ist, wo Ihre Werte über Tage und Wochen liegen.',
      'Zu Hause sind die Werte meist etwas niedriger als in der Praxis.',
    ],
    begriffe: 'rr hypertonie bluthochdruck systolisch diastolisch messen',
  },
  {
    id: 'ldl',
    name: 'LDL-Cholesterin',
    zusatz: 'das „schlechte“ Cholesterin',
    einheit: 'mg/dl',
    titel: 'Ihr LDL-Cholesterin',
    nurZiel: true,
    teile: [
      {
        id: 'ldl',
        name: 'LDL',
        von: 20,
        ende: 250,
        stellen: 0,
        bereiche: [
          { bis: 190, name: 'über dem Ziel', ton: 'hoch' },
          { bis: 250, name: 'sehr hoch', ton: 'sehrhoch' },
        ],
      },
    ],
    ziele: [
      { id: '116', name: 'niedriges Risiko', text: 'unter 116', grenzen: [116], richtung: 'unter' },
      { id: '100', name: 'mäßiges Risiko', text: 'unter 100', grenzen: [100], richtung: 'unter' },
      { id: '70', name: 'hohes Risiko', text: 'unter 70', grenzen: [70], richtung: 'unter' },
      { id: '55', name: 'sehr hohes Risiko', text: 'unter 55', grenzen: [55], richtung: 'unter' },
    ],
    saetze: [
      'LDL-Cholesterin lagert sich in den Gefäßwänden ab. Je höher der Wert über die Jahre, desto größer das Risiko für Herzinfarkt und Schlaganfall.',
      'Welcher Wert für Sie gut ist, hängt von Ihrem persönlichen Risiko ab: Wer schon einen Herzinfarkt hatte oder Diabetes hat, braucht einen niedrigeren Wert.',
      'Es gibt kein „zu niedrig“ – der Körper kommt mit sehr wenig LDL aus.',
    ],
    begriffe: 'cholesterin blutfette lipide statin fettstoffwechsel',
  },
  {
    id: 'hba1c',
    name: 'HbA1c',
    zusatz: 'Langzeit-Blutzucker',
    einheit: '%',
    titel: 'Ihr Langzeit-Blutzucker',
    teile: [
      {
        id: 'hba1c',
        name: 'HbA1c',
        von: 4.5,
        ende: 11,
        stellen: 1,
        bereiche: [
          { bis: 5.7, name: 'normal', ton: 'gut' },
          { bis: 6.5, name: 'Vorstufe', ton: 'grenze' },
          { bis: 7.5, name: 'Diabetes: Zielbereich', ton: 'grenze' },
          { bis: 8.5, name: 'erhöht', ton: 'hoch' },
          { bis: 11, name: 'deutlich erhöht', ton: 'sehrhoch' },
        ],
      },
    ],
    ziele: [
      { id: '7.0', name: 'unter 7,0', text: 'unter 7,0', grenzen: [7], richtung: 'unter' },
      { id: '7.5', name: 'unter 7,5', text: 'unter 7,5', grenzen: [7.5], richtung: 'unter' },
      { id: '8.0', name: 'unter 8,0', text: 'unter 8,0', grenzen: [8], richtung: 'unter' },
      { id: '8.5', name: 'unter 8,5', text: 'unter 8,5', grenzen: [8.5], richtung: 'unter' },
    ],
    saetze: [
      'Der HbA1c zeigt, wie hoch Ihr Blutzucker im Schnitt der letzten zwei bis drei Monate war – das „Zuckergedächtnis“ des Blutes.',
      'Ab 6,5 Prozent sprechen wir von Diabetes. Zwischen 5,7 und 6,4 liegt die Vorstufe.',
      'Bei Diabetes legen wir gemeinsam ein persönliches Ziel fest, meist zwischen 6,5 und 7,5 – im höheren Alter darf es mehr sein.',
    ],
    begriffe: 'zucker diabetes langzeitzucker blutzucker glykohaemoglobin',
  },
  {
    id: 'nuechternzucker',
    name: 'Nüchternzucker',
    zusatz: 'Blutzucker nach acht Stunden ohne Essen',
    einheit: 'mg/dl',
    titel: 'Ihr Nüchtern-Blutzucker',
    teile: [
      {
        id: 'zucker',
        name: 'Nüchternzucker',
        von: 50,
        ende: 220,
        stellen: 0,
        bereiche: [
          { bis: 70, name: 'zu niedrig', ton: 'niedrig' },
          { bis: 100, name: 'normal', ton: 'gut' },
          { bis: 126, name: 'grenzwertig', ton: 'grenze' },
          { bis: 220, name: 'Diabetes-Bereich', ton: 'hoch' },
        ],
      },
    ],
    saetze: [
      'Gemessen wird morgens, nachdem Sie mindestens acht Stunden nichts gegessen und nur Wasser getrunken haben.',
      'Ein einzelner erhöhter Wert ist noch keine Diagnose. Wir messen ein zweites Mal oder bestimmen den Langzeitwert.',
    ],
    begriffe: 'blutzucker glukose glucose diabetes nuechtern',
  },
  {
    id: 'egfr',
    name: 'Nierenleistung',
    zusatz: 'eGFR',
    einheit: 'ml/min',
    titel: 'Ihre Nierenleistung',
    teile: [
      {
        id: 'egfr',
        name: 'eGFR',
        von: 0,
        ende: 120,
        stellen: 0,
        bereiche: [
          { bis: 15, name: 'Nierenversagen', ton: 'sehrhoch' },
          { bis: 30, name: 'stark eingeschränkt', ton: 'sehrhoch' },
          { bis: 45, name: 'deutlich eingeschränkt', ton: 'hoch' },
          { bis: 60, name: 'mäßig eingeschränkt', ton: 'grenze' },
          { bis: 90, name: 'leicht eingeschränkt', ton: 'gut' },
          { bis: 120, name: 'normal', ton: 'gut' },
        ],
      },
    ],
    saetze: [
      'Der Wert schätzt, wie viel Blut Ihre Nieren pro Minute reinigen. Er wird aus dem Kreatinin im Blut berechnet.',
      'Mit dem Alter nimmt die Nierenleistung langsam ab. Werte zwischen 60 und 90 sind bei Älteren oft normal.',
      'Wichtiger als ein einzelner Wert ist der Verlauf über Monate – und ob Eiweiß im Urin ist.',
    ],
    begriffe: 'niere kreatinin gfr niereninsuffizienz nierenschwaeche nierenwert',
  },
  {
    id: 'bmi',
    name: 'BMI',
    zusatz: 'Körpergewicht im Verhältnis zur Größe',
    einheit: 'kg/m²',
    titel: 'Ihr Body-Mass-Index',
    teile: [
      {
        id: 'bmi',
        name: 'BMI',
        von: 15,
        ende: 50,
        stellen: 1,
        bereiche: [
          { bis: 18.5, name: 'Untergewicht', ton: 'niedrig' },
          { bis: 25, name: 'Normalgewicht', ton: 'gut' },
          { bis: 30, name: 'Übergewicht', ton: 'grenze' },
          { bis: 35, name: 'Adipositas Grad 1', ton: 'hoch' },
          { bis: 40, name: 'Adipositas Grad 2', ton: 'hoch' },
          { bis: 50, name: 'Adipositas Grad 3', ton: 'sehrhoch' },
        ],
      },
    ],
    saetze: [
      'Der BMI setzt Ihr Gewicht ins Verhältnis zur Körpergröße. Er ist ein grober Anhalt, kein Urteil.',
      'Muskeln, Körperbau und Alter berücksichtigt er nicht. Deshalb messen wir zusätzlich den Bauchumfang.',
      'Schon fünf bis zehn Prozent weniger Gewicht bessern Blutdruck, Zucker und Gelenkbeschwerden spürbar.',
    ],
    begriffe: 'gewicht uebergewicht adipositas body mass index abnehmen',
  },
  {
    id: 'tsh',
    name: 'TSH',
    zusatz: 'Steuerhormon der Schilddrüse',
    einheit: 'mU/l',
    titel: 'Ihr Schilddrüsenwert',
    teile: [
      {
        id: 'tsh',
        name: 'TSH',
        von: 0,
        ende: 20,
        stellen: 2,
        bereiche: [
          { bis: 0.4, name: 'zu niedrig', ton: 'niedrig' },
          { bis: 4, name: 'normal', ton: 'gut' },
          { bis: 10, name: 'leicht erhöht', ton: 'grenze' },
          { bis: 20, name: 'deutlich erhöht', ton: 'hoch' },
        ],
      },
    ],
    saetze: [
      'TSH kommt aus der Hirnanhangdrüse und treibt die Schilddrüse an. Es verhält sich wie ein Gaspedal.',
      'Ein hoher Wert heißt: Die Schilddrüse arbeitet zu schwach und wird stärker angetrieben. Ein niedriger Wert spricht für zu viel Schilddrüsenhormon.',
      'Leicht erhöhte Werte ohne Beschwerden kontrollieren wir oft erst einmal, bevor wir behandeln.',
    ],
    begriffe: 'schilddruese thyreotropin unterfunktion ueberfunktion hypothyreose l-thyroxin',
  },
];

const nachId = new Map(MESSGROESSEN.map((m) => [m.id, m]));

export const findeMessgroesse = (id: string | null | undefined) => (id ? nachId.get(id) : undefined);

/** „7,2“ oder „7.2“ → 7.2; leere oder unsinnige Eingaben → null. */
export function liesZahl(eingabe: string | undefined): number | null {
  if (!eingabe) return null;
  const zahl = Number(eingabe.trim().replace(',', '.'));
  return Number.isFinite(zahl) && zahl > 0 ? zahl : null;
}

export function zeigeZahl(wert: number, stellen: number): string {
  return wert.toLocaleString('de-DE', {
    minimumFractionDigits: stellen,
    maximumFractionDigits: stellen,
  });
}

/**
 * Die Bereiche eines Teilwerts, wie sie gezeichnet werden. Bei Größen, die sich nur am Ziel
 * messen (LDL), kommt davor der Bereich „im Ziel“.
 */
export function bereicheVon(groesse: Messgroesse, nr: number, ziel: Ziel | undefined): Bereich[] {
  const teil = groesse.teile[nr];
  if (!groesse.nurZiel) return teil.bereiche;
  if (!ziel) return [{ bis: teil.ende, name: 'Ziel wählen', ton: 'grenze' }];
  return [{ bis: ziel.grenzen[nr], name: 'im Ziel', ton: 'gut' }, ...teil.bereiche];
}

export function bereichFuer(bereiche: Bereich[], wert: number): Bereich {
  return bereiche.find((b) => wert < b.bis) ?? bereiche[bereiche.length - 1];
}

/**
 * Lage eines Werts auf der Skala, 0 bis 1. Alle Bereiche sind gleich breit gezeichnet,
 * damit auch schmale Bereiche lesbar beschriftet werden können; innerhalb eines Bereichs
 * wird gleichmäßig eingeteilt.
 */
export function lageAufSkala(teil: Teilwert, bereiche: Bereich[], wert: number): number {
  const w = Math.min(Math.max(wert, teil.von), teil.ende);
  let unten = teil.von;
  for (let i = 0; i < bereiche.length; i++) {
    const oben = bereiche[i].bis;
    if (w < oben || i === bereiche.length - 1) {
      const anteil = oben > unten ? (w - unten) / (oben - unten) : 0;
      return (i + Math.min(Math.max(anteil, 0), 1)) / bereiche.length;
    }
    unten = oben;
  }
  return 1;
}

/** Der schlechteste Bereich über alle Teilwerte – das Gesamturteil (Blutdruck: 150/80 → „leicht erhöht“). */
const RANG: Record<Ton, number> = { gut: 0, grenze: 1, niedrig: 2, hoch: 3, sehrhoch: 4 };

export interface Einordnung {
  /** Gelesene Werte je Teilwert; null, solange nichts Gültiges eingetippt ist. */
  werte: (number | null)[];
  /** true, wenn alle Teilwerte da sind. */
  vollstaendig: boolean;
  ziel: Ziel | undefined;
  /** Bereich je Teilwert. */
  bereiche: (Bereich | null)[];
  /** Gesamturteil. */
  urteil: Bereich | null;
  /** Ziel erreicht? null ohne Ziel oder ohne Wert. */
  imZiel: boolean | null;
}

export function ordneEin(
  groesse: Messgroesse,
  eingaben: string[] | undefined,
  zielId: string | null | undefined,
): Einordnung {
  const ziel = groesse.ziele?.find((z) => z.id === zielId);
  const werte = groesse.teile.map((_, i) => liesZahl(eingaben?.[i]));
  const vollstaendig = werte.every((w) => w !== null);
  const bereiche = werte.map((w, i) =>
    w === null ? null : bereichFuer(bereicheVon(groesse, i, ziel), w),
  );
  let urteil: Bereich | null = null;
  if (vollstaendig) {
    for (const b of bereiche) {
      if (b && (!urteil || RANG[b.ton] > RANG[urteil.ton])) urteil = b;
    }
  }
  const imZiel =
    ziel && vollstaendig
      ? werte.every((w, i) =>
          ziel.richtung === 'unter' ? w! < ziel.grenzen[i] : w! > ziel.grenzen[i],
        )
      : null;
  return { werte, vollstaendig, ziel, bereiche, urteil, imZiel };
}

/** „148/92“ bzw. „7,2“ – so steht der Wert groß auf der Bühne. */
export function werteText(groesse: Messgroesse, werte: (number | null)[]): string {
  return werte
    .map((w, i) => (w === null ? '–' : zeigeZahl(w, groesse.teile[i].stellen)))
    .join(' / ');
}
