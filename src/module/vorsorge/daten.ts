// Gesetzliche Früherkennungsuntersuchungen für Erwachsene (gesetzliche Krankenversicherung),
// vereinfacht für die Anzeige. Altersgrenzen und Abstände folgen den Richtlinien des
// Gemeinsamen Bundesausschusses nach bestem Wissen – bitte vor dem Einsatz gegenlesen.

export type Geschlecht = 'frau' | 'mann';

/** Ein Altersabschnitt mit eigenem Abstand. */
export interface Stufe {
  /** Ab diesem Alter (vollendete Lebensjahre). */
  von: number;
  /** Bis einschließlich diesem Alter. Ohne Angabe: ohne obere Grenze. */
  bis?: number;
  /** Abstand in Patientensprache, z. B. „alle zwei Jahre“. */
  intervall: string;
  /** Abstand für Teilnehmer am Hausarztprogramm dieser Praxis, falls abweichend. */
  intervallHausarztmodell?: string;
  /** Name in der Spalte „Später kommt dazu“, wenn die Stufe nur den Abstand ändert. */
  spaeterName?: string;
}

export interface Untersuchung {
  id: string;
  name: string;
  /** Amtlicher oder gebräuchlicher Zweitname. */
  zusatz?: string;
  fuer: Geschlecht | 'alle';
  /** Wo die Untersuchung stattfindet. */
  wer: string;
  stufen: Stufe[];
  /** Erklärung in Patientensprache: was passiert, wozu, was man wissen sollte. */
  was: string[];
  /** Ein Satz unter der Erklärung. */
  hinweis?: string;
  /** Weitere Suchwörter. */
  begriffe: string;
}

export const MIN_ALTER = 18;
export const MAX_ALTER = 99;
export const SCHNELLWAHL = [20, 30, 35, 45, 50, 55, 65, 75];

export const UNTERSUCHUNGEN: Untersuchung[] = [
  {
    id: 'check-up',
    name: 'Check-up',
    zusatz: 'Gesundheitsuntersuchung',
    fuer: 'alle',
    wer: 'Hausarztpraxis',
    stufen: [
      { von: 18, bis: 34, intervall: 'einmalig' },
      {
        von: 35,
        intervall: 'alle drei Jahre',
        intervallHausarztmodell: 'alle zwei Jahre',
      },
    ],
    was: [
      'Wir sprechen über Ihre Vorgeschichte und Ihre Lebensumstände, untersuchen Sie körperlich und messen den Blutdruck.',
      'Ab 35 Jahren kommen Blutwerte (Blutzucker, Blutfette) und eine Urinprobe dazu.',
      'So fallen Bluthochdruck, Diabetes und Risiken für Herz und Gefäße auf, bevor sie Beschwerden machen.',
      'Bringen Sie Ihren Impfpass mit – den schauen wir dabei gleich mit an.',
    ],
    hinweis:
      'Wenn Sie an unserem Hausarztprogramm teilnehmen, ist der Check-up ab 35 Jahren alle zwei Jahre möglich.',
    begriffe: 'Gesundheits-Check Check-up 35 Vorsorgeuntersuchung Blutwerte Cholesterin Blutzucker',
  },
  {
    id: 'hepatitis',
    name: 'Hepatitis-Test',
    zusatz: 'Bluttest auf Hepatitis B und C',
    fuer: 'alle',
    wer: 'Hausarztpraxis, beim Check-up',
    stufen: [{ von: 35, intervall: 'einmalig' }],
    was: [
      'Beim Check-up wird einmal im Leben zusätzlich Blut auf Hepatitis B und Hepatitis C untersucht.',
      'Beide Leberentzündungen verlaufen oft jahrelang, ohne dass man etwas merkt.',
      'Früh erkannt lassen sie sich gut behandeln, bevor die Leber Schaden nimmt.',
    ],
    begriffe: 'Hepatitis B C Leber Leberentzündung Screening HBV HCV',
  },
  {
    id: 'hautkrebs',
    name: 'Hautkrebs-Screening',
    fuer: 'alle',
    wer: 'Hausarztpraxis oder Hautarztpraxis',
    stufen: [{ von: 35, intervall: 'alle zwei Jahre' }],
    was: [
      'Die gesamte Haut wird angeschaut – vom Kopf bis zu den Fußsohlen, auch Kopfhaut und Hautfalten.',
      'Gesucht wird nach schwarzem und hellem Hautkrebs und nach Vorstufen.',
      'Die Untersuchung tut nicht weh und dauert nur wenige Minuten.',
      'Kommen Sie bitte ohne Make-up und ohne Nagellack.',
    ],
    begriffe: 'Hautkrebs Melanom Muttermal Leberfleck Hautcheck Hautarzt',
  },
  {
    id: 'darmkrebs',
    name: 'Darmkrebs-Früherkennung',
    zusatz: 'Stuhltest oder Darmspiegelung',
    fuer: 'alle',
    wer: 'Stuhltest: Hausarztpraxis · Darmspiegelung: Magen-Darm-Praxis',
    stufen: [{ von: 50, intervall: 'Stuhltest alle zwei Jahre oder Spiegelung' }],
    was: [
      'Sie haben die Wahl: alle zwei Jahre ein Stuhltest oder eine Darmspiegelung – diese zweimal im Abstand von zehn Jahren.',
      'Der Stuhltest sucht nach nicht sichtbarem Blut; die Probe nehmen Sie zu Hause. Ist er auffällig, folgt eine Darmspiegelung.',
      'Bei der Darmspiegelung können Vorstufen (Polypen) sofort entfernt werden – so entsteht Darmkrebs oft gar nicht erst.',
      'Gibt es Darmkrebs in Ihrer Familie, sprechen Sie uns bitte schon früher an.',
    ],
    begriffe: 'Darmkrebs Koloskopie Darmspiegelung Stuhltest iFOBT Blut im Stuhl Polypen',
  },
  {
    id: 'bauchaorta',
    name: 'Bauchschlagader-Ultraschall',
    zusatz: 'Früherkennung eines Bauchaortenaneurysmas',
    fuer: 'mann',
    wer: 'Hausarztpraxis',
    stufen: [{ von: 65, intervall: 'einmalig' }],
    was: [
      'Mit Ultraschall wird einmal gemessen, wie weit die große Bauchschlagader ist.',
      'Eine Aussackung (Aneurysma) macht lange keine Beschwerden, kann aber gefährlich werden, wenn sie reißt.',
      'Die Untersuchung ist schmerzfrei und dauert wenige Minuten.',
      'Ist die Schlagader erweitert, wird sie regelmäßig kontrolliert oder rechtzeitig behandelt.',
    ],
    begriffe: 'Bauchaortenaneurysma Aorta Aneurysma Ultraschall Sonographie Bauchschlagader BAA',
  },
  {
    id: 'gebaermutterhals',
    name: 'Gebärmutterhals-Abstrich',
    zusatz: 'Früherkennung von Gebärmutterhalskrebs',
    fuer: 'frau',
    wer: 'Frauenarztpraxis',
    stufen: [
      { von: 20, bis: 34, intervall: 'jährlich' },
      {
        von: 35,
        intervall: 'alle drei Jahre, mit HPV-Test',
        spaeterName: 'Abstrich mit HPV-Test',
      },
    ],
    was: [
      'Bei der frauenärztlichen Untersuchung wird ein Abstrich vom Gebärmutterhals genommen und auf veränderte Zellen untersucht.',
      'Ab 35 Jahren wird der Abstrich alle drei Jahre zusätzlich auf HP-Viren getestet, die den Krebs auslösen können.',
      'Vorstufen werden so erkannt und behandelt, lange bevor Krebs entsteht.',
      'Die jährliche frauenärztliche Untersuchung bleibt Ihnen unabhängig davon erhalten.',
    ],
    begriffe: 'Gebärmutterhalskrebs Zervix Pap-Abstrich Pap-Test HPV Ko-Test Krebsvorsorge Frauenarzt',
  },
  {
    id: 'chlamydien',
    name: 'Chlamydien-Test',
    fuer: 'frau',
    wer: 'Frauenarztpraxis',
    stufen: [{ von: 18, bis: 24, intervall: 'jährlich' }],
    was: [
      'Für den Test genügt eine Urinprobe.',
      'Chlamydien werden beim Sex übertragen und machen meist keine Beschwerden.',
      'Unbehandelt können sie die Eileiter schädigen und zu Unfruchtbarkeit führen.',
      'Die Infektion lässt sich mit einem Antibiotikum gut behandeln.',
    ],
    begriffe: 'Chlamydien Geschlechtskrankheit STI Urintest junge Frauen',
  },
  {
    id: 'brust-tasten',
    name: 'Brust-Tastuntersuchung',
    fuer: 'frau',
    wer: 'Frauenarztpraxis',
    stufen: [{ von: 30, intervall: 'jährlich' }],
    was: [
      'Die Ärztin oder der Arzt tastet beide Brüste und die Lymphknoten in den Achselhöhlen ab.',
      'So sollen Knoten und andere Veränderungen früh auffallen.',
      'Sie bekommen dabei gezeigt, wie Sie Ihre Brust selbst regelmäßig abtasten können.',
    ],
    begriffe: 'Brustkrebs Brust abtasten Tastuntersuchung Knoten Frauenarzt',
  },
  {
    id: 'mammographie',
    name: 'Mammographie-Screening',
    zusatz: 'Röntgenuntersuchung der Brust',
    fuer: 'frau',
    wer: 'Screening-Einheit, mit schriftlicher Einladung',
    stufen: [{ von: 50, bis: 75, intervall: 'alle zwei Jahre' }],
    was: [
      'Sie erhalten alle zwei Jahre eine schriftliche Einladung mit einem Terminvorschlag.',
      'Beide Brüste werden geröntgt; zwei Fachärzte beurteilen die Aufnahmen unabhängig voneinander.',
      'So wird Brustkrebs entdeckt, bevor er zu tasten ist.',
      'Das Zusammendrücken der Brust ist kurz unangenehm; das Ergebnis kommt nach einigen Tagen per Post.',
    ],
    begriffe: 'Mammographie Mammografie Brustkrebs Screening Röntgen Brust Einladung',
  },
  {
    id: 'prostata',
    name: 'Prostata-Früherkennung',
    zusatz: 'Untersuchung von Prostata und Genitale',
    fuer: 'mann',
    wer: 'Hausarztpraxis oder urologische Praxis',
    stufen: [{ von: 45, intervall: 'jährlich' }],
    was: [
      'Nach einem kurzen Gespräch werden das äußere Genitale und die Lymphknoten in der Leiste untersucht.',
      'Die Prostata wird mit dem Finger vom Enddarm aus abgetastet – das ist unangenehm, dauert aber nur Sekunden.',
      'Ziel ist, Veränderungen der Prostata früh zu bemerken.',
      'Der PSA-Bluttest gehört nicht zum Kassenprogramm; ob er für Sie sinnvoll ist, besprechen wir gern mit Ihnen.',
    ],
    begriffe: 'Prostata Prostatakrebs PSA Tastuntersuchung Urologe Männer Krebsvorsorge',
  },
];

export const findeUntersuchung = (id: string | null | undefined) =>
  UNTERSUCHUNGEN.find((u) => u.id === id);

export const begrenzeAlter = (alter: number) =>
  Math.min(MAX_ALTER, Math.max(MIN_ALTER, Math.round(alter)));

/** Gilt die Untersuchung für dieses Geschlecht? Ohne Angabe nur die gemeinsamen. */
export const passtZu = (u: Untersuchung, geschlecht: Geschlecht | null) =>
  u.fuer === 'alle' || u.fuer === geschlecht;

export const stufeFuer = (u: Untersuchung, alter: number | null) =>
  alter === null
    ? undefined
    : u.stufen.find((s) => alter >= s.von && (s.bis === undefined || alter <= s.bis));

export const intervallText = (stufe: Stufe, hausarztmodell: boolean) =>
  (hausarztmodell && stufe.intervallHausarztmodell) || stufe.intervall;

/** „20 bis 34 Jahre“, „ab 35 Jahren“, „bis 24 Jahre“. */
export function altersText(stufe: Stufe) {
  if (stufe.bis === undefined) return `ab ${stufe.von} Jahren`;
  if (stufe.von <= MIN_ALTER) return `bis ${stufe.bis} Jahre`;
  return `${stufe.von} bis ${stufe.bis} Jahre`;
}

export interface Anstehend {
  untersuchung: Untersuchung;
  stufe: Stufe;
}

/** Was in diesem Alter ansteht, in Reihenfolge der Liste. */
export function anstehend(geschlecht: Geschlecht | null, alter: number | null): Anstehend[] {
  return UNTERSUCHUNGEN.flatMap((untersuchung) => {
    const stufe = passtZu(untersuchung, geschlecht) ? stufeFuer(untersuchung, alter) : undefined;
    return stufe ? [{ untersuchung, stufe }] : [];
  });
}

export interface Spaeter {
  ab: number;
  namen: string[];
}

/**
 * Was in späteren Jahren beginnt oder sich ändert, nach Alter gebündelt. Stufen mit eigenem
 * Abstand im Hausarztmodell stehen mit Abstand da, z. B. „Check-up alle drei Jahre“.
 */
export function spaeter(
  geschlecht: Geschlecht | null,
  alter: number,
  hausarztmodell = false,
): Spaeter[] {
  const nachAlter = new Map<number, string[]>();
  for (const u of UNTERSUCHUNGEN) {
    if (!passtZu(u, geschlecht)) continue;
    for (const stufe of u.stufen) {
      if (stufe.von <= alter) continue;
      const namen = nachAlter.get(stufe.von) ?? [];
      namen.push(
        stufe.intervallHausarztmodell
          ? `${u.name} ${intervallText(stufe, hausarztmodell)}`
          : (stufe.spaeterName ?? u.name),
      );
      nachAlter.set(stufe.von, namen);
    }
  }
  return [...nachAlter.entries()].sort((a, b) => a[0] - b[0]).map(([ab, namen]) => ({ ab, namen }));
}

/** Lebensjahre, in denen für dieses Geschlecht etwas beginnt – die Marken der Zeitachse. */
export function marken(geschlecht: Geschlecht | null): number[] {
  const alle = UNTERSUCHUNGEN.filter((u) => passtZu(u, geschlecht)).flatMap((u) =>
    u.stufen.map((s) => s.von),
  );
  return [...new Set(alle)].filter((a) => a > MIN_ALTER).sort((a, b) => a - b);
}
