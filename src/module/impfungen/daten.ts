// Erklärkarten zu den Standardimpfungen in Patientensprache, angelehnt an den
// STIKO-Impfkalender. Die Texte sind bewusst vereinfacht und ersetzen nicht die
// individuelle Beratung – bitte vor dem Einsatz gegenlesen und anpassen.

export type GruppeId = 'saeugling' | 'kind' | 'jugend' | 'erwachsen' | 'senior' | 'schwanger';

export interface Gruppe {
  id: GruppeId;
  name: string;
  /** Kurzer Zusatz für die Steuerung. */
  alter: string;
  /** Überschrift auf dem Patientenbildschirm. */
  titel: string;
  /** Vorschlag: diese Impfungen werden beim Wählen der Gruppe angehakt. */
  vorschlag: string[];
}

export interface Schritt {
  wann: string;
  was: string;
  /** Für welche Gruppen dieser Schritt gilt. Ohne Angabe: für alle. */
  gruppen?: GruppeId[];
}

export interface Impfung {
  id: string;
  name: string;
  /** Ausgeschriebener oder gebräuchlicher Zweitname, falls hilfreich. */
  zusatz?: string;
  /** Eine Zeile für die Übersicht. */
  kurz: string;
  /** „Worum geht es?“ – zwei bis drei Sätze. */
  was: string[];
  schema: Schritt[];
  /** Ein Satz unter dem Impfschema. */
  hinweis?: string;
  /** Pfad unter public/. */
  bild: string;
  bildtext: string;
}

export const GRUPPEN: Gruppe[] = [
  {
    id: 'saeugling',
    name: 'Säuglinge und Kleinkinder',
    alter: 'bis 2 Jahre',
    titel: 'Impfungen im ersten Lebensjahr',
    vorschlag: [
      'tetanus',
      'diphtherie',
      'keuchhusten',
      'hib',
      'polio',
      'hepatitis-b',
      'pneumokokken',
      'rotaviren',
      'meningokokken-b',
      'meningokokken-c',
      'masern',
      'mumps',
      'roeteln',
      'windpocken',
      'rsv',
    ],
  },
  {
    id: 'kind',
    name: 'Kinder',
    alter: '2 bis 8 Jahre',
    titel: 'Impfungen im Kindesalter',
    vorschlag: ['tetanus', 'diphtherie', 'keuchhusten'],
  },
  {
    id: 'jugend',
    name: 'Jugendliche',
    alter: '9 bis 17 Jahre',
    titel: 'Impfungen für Jugendliche',
    vorschlag: ['tetanus', 'diphtherie', 'keuchhusten', 'polio', 'hpv'],
  },
  {
    id: 'erwachsen',
    name: 'Erwachsene',
    alter: '18 bis 59 Jahre',
    titel: 'Impfungen für Erwachsene',
    vorschlag: ['tetanus', 'diphtherie', 'keuchhusten', 'masern'],
  },
  {
    id: 'senior',
    name: 'Ab 60 Jahren',
    alter: 'Senioren',
    titel: 'Impfungen ab 60 Jahren',
    vorschlag: [
      'tetanus',
      'diphtherie',
      'keuchhusten',
      'pneumokokken',
      'grippe',
      'guertelrose',
      'covid-19',
      'rsv',
    ],
  },
  {
    id: 'schwanger',
    name: 'Schwangerschaft',
    alter: 'und Kinderwunsch',
    titel: 'Impfungen in der Schwangerschaft',
    vorschlag: ['keuchhusten', 'grippe', 'covid-19'],
  },
];

const SECHSFACH = '2, 4 und 11 Monate';

const liste: Impfung[] = [
  {
    id: 'tetanus',
    name: 'Tetanus',
    zusatz: 'Wundstarrkrampf',
    kurz: 'Gefährliche Krämpfe, ausgelöst über kleine Wunden',
    was: [
      'Tetanus-Bakterien leben in Erde und Staub. Schon eine kleine Wunde reicht, damit sie in den Körper gelangen.',
      'Ihr Gift führt zu schmerzhaften Muskelkrämpfen bis hin zur Atemlähmung.',
      'Auch wer Tetanus überstanden hat, ist danach nicht geschützt – nur die Impfung schützt.',
    ],
    schema: [
      { wann: SECHSFACH, was: 'Grundimmunisierung, meist als Sechsfachimpfung', gruppen: ['saeugling'] },
      { wann: '5 bis 6 Jahre', was: 'Erste Auffrischung', gruppen: ['kind'] },
      { wann: '9 bis 16 Jahre', was: 'Zweite Auffrischung', gruppen: ['jugend'] },
      { wann: 'Alle 10 Jahre', was: 'Auffrischung, zusammen mit Diphtherie', gruppen: ['erwachsen', 'senior'] },
      {
        wann: 'Nach einer Verletzung',
        was: 'Bei tiefen oder verschmutzten Wunden schon, wenn die letzte Impfung über 5 Jahre her ist',
        gruppen: ['erwachsen', 'senior'],
      },
    ],
    bild: '/bilder/impfungen/tetanus.jpg',
    bildtext: 'Gartenwerkzeug und Handschuhe auf dunkler Erde',
  },
  {
    id: 'diphtherie',
    name: 'Diphtherie',
    kurz: 'Schwere Halsentzündung, das Gift schädigt Herz und Nerven',
    was: [
      'Diphtherie ist eine Infektion von Hals und Rachen durch Bakterien, die über Tröpfchen übertragen werden.',
      'Das Gift der Bakterien kann die Atemwege zuschwellen lassen und Herz und Nerven schädigen.',
      'Bei uns ist sie dank der Impfung selten geworden. In anderen Ländern kommt sie noch vor.',
    ],
    schema: [
      { wann: SECHSFACH, was: 'Grundimmunisierung, meist als Sechsfachimpfung', gruppen: ['saeugling'] },
      { wann: '5 bis 6 Jahre', was: 'Erste Auffrischung', gruppen: ['kind'] },
      { wann: '9 bis 16 Jahre', was: 'Zweite Auffrischung', gruppen: ['jugend'] },
      { wann: 'Alle 10 Jahre', was: 'Auffrischung, zusammen mit Tetanus', gruppen: ['erwachsen', 'senior'] },
    ],
    bild: '/bilder/impfungen/diphtherie.jpg',
    bildtext: 'Spatel und kleine Lampe für die Untersuchung des Rachens',
  },
  {
    id: 'keuchhusten',
    name: 'Keuchhusten',
    zusatz: 'Pertussis',
    kurz: 'Wochenlanger Husten, für Säuglinge lebensgefährlich',
    was: [
      'Keuchhusten wird durch Bakterien ausgelöst und über Tröpfchen leicht übertragen.',
      'Typisch sind krampfartige Hustenanfälle, die viele Wochen anhalten können.',
      'Für Säuglinge ist er lebensgefährlich. Sie stecken sich oft bei Eltern, Geschwistern oder Großeltern an.',
    ],
    schema: [
      { wann: SECHSFACH, was: 'Grundimmunisierung, meist als Sechsfachimpfung', gruppen: ['saeugling'] },
      { wann: '5 bis 6 Jahre', was: 'Erste Auffrischung', gruppen: ['kind'] },
      { wann: '9 bis 16 Jahre', was: 'Zweite Auffrischung', gruppen: ['jugend'] },
      {
        wann: 'Einmal als Erwachsener',
        was: 'Zusammen mit der nächsten Tetanus-Auffrischung',
        gruppen: ['erwachsen', 'senior'],
      },
      {
        wann: 'Vor der Geburt eines Babys',
        was: 'Für Eltern, Geschwister und Großeltern, wenn die letzte Impfung über 10 Jahre her ist',
        gruppen: ['erwachsen', 'senior'],
      },
      {
        wann: 'In jeder Schwangerschaft',
        was: 'Zu Beginn des letzten Schwangerschaftsdrittels – das Baby ist dann von Geburt an geschützt',
        gruppen: ['schwanger'],
      },
    ],
    bild: '/bilder/impfungen/keuchhusten.jpg',
    bildtext: 'Neugeborenes schläft in einem Bettchen',
  },
  {
    id: 'polio',
    name: 'Polio',
    zusatz: 'Kinderlähmung',
    kurz: 'Virus, das bleibende Lähmungen auslösen kann',
    was: [
      'Polio wird durch ein Virus ausgelöst, das über Stuhl und verunreinigtes Wasser übertragen wird.',
      'Die meisten Infektionen verlaufen unbemerkt. Bei manchen Menschen kommt es aber zu bleibenden Lähmungen.',
      'In Europa gilt Polio als ausgerottet. In einigen Ländern gibt es sie noch.',
    ],
    schema: [
      { wann: SECHSFACH, was: 'Grundimmunisierung, meist als Sechsfachimpfung', gruppen: ['saeugling'] },
      { wann: '9 bis 16 Jahre', was: 'Eine Auffrischung', gruppen: ['jugend'] },
      {
        wann: 'Als Erwachsener',
        was: 'Nachholen, wenn die Grundimmunisierung fehlt – und vor Reisen in Risikogebiete',
        gruppen: ['erwachsen', 'senior'],
      },
    ],
    bild: '/bilder/krankheiten/polio.jpg',
    bildtext: 'Impfstoff-Fläschchen und Spritze neben einem Impfausweis',
  },
  {
    id: 'hib',
    name: 'Hib',
    zusatz: 'Haemophilus influenzae Typ b',
    kurz: 'Bakterium, gefährlich für Kinder unter fünf Jahren',
    was: [
      'Hib ist ein Bakterium, das über Tröpfchen übertragen wird. Mit der Grippe hat es trotz des Namens nichts zu tun.',
      'Bei kleinen Kindern kann es eine Hirnhautentzündung oder eine gefährliche Schwellung am Kehlkopf auslösen.',
    ],
    schema: [
      { wann: SECHSFACH, was: 'Grundimmunisierung, in der Sechsfachimpfung enthalten', gruppen: ['saeugling'] },
      { wann: 'Bis 4 Jahre', was: 'Fehlende Impfungen nachholen', gruppen: ['kind'] },
    ],
    bild: '/bilder/impfungen/hib.jpg',
    bildtext: 'Kleine Kinderhand hält ein Kuscheltier',
  },
  {
    id: 'hepatitis-b',
    name: 'Hepatitis B',
    kurz: 'Leberentzündung, kann chronisch werden',
    was: [
      'Hepatitis B ist eine Leberentzündung durch ein Virus, das über Blut und andere Körperflüssigkeiten übertragen wird.',
      'Je jünger man sich ansteckt, desto eher bleibt die Infektion dauerhaft – und kann die Leber über Jahre schädigen.',
    ],
    schema: [
      { wann: SECHSFACH, was: 'Grundimmunisierung, in der Sechsfachimpfung enthalten', gruppen: ['saeugling'] },
      { wann: 'Bis 17 Jahre', was: 'Fehlende Impfungen nachholen', gruppen: ['kind', 'jugend'] },
      {
        wann: 'Bei erhöhtem Risiko',
        was: 'Zum Beispiel bei Berufen im Gesundheitswesen, Lebererkrankungen oder Dialyse',
        gruppen: ['erwachsen', 'senior'],
      },
    ],
    bild: '/bilder/krankheiten/hepatitis-b.jpg',
    bildtext: 'Stilisierte Leber mit einem Blutstropfen',
  },
  {
    id: 'pneumokokken',
    name: 'Pneumokokken',
    kurz: 'Lungenentzündung, Hirnhautentzündung, Blutvergiftung',
    was: [
      'Pneumokokken sind Bakterien, die viele Menschen unbemerkt im Nasen-Rachen-Raum tragen.',
      'Sie können Lungenentzündung, Mittelohrentzündung, Hirnhautentzündung und Blutvergiftung auslösen.',
      'Gefährdet sind vor allem kleine Kinder, ältere Menschen und chronisch Kranke.',
    ],
    schema: [
      { wann: SECHSFACH, was: 'Drei Impfungen', gruppen: ['saeugling'] },
      {
        wann: 'Ab 60 Jahren',
        was: 'Eine Impfung, in der Regel ohne Auffrischung',
        gruppen: ['senior'],
      },
      {
        wann: 'Bei chronischen Erkrankungen',
        was: 'Schon in jüngerem Alter, etwa bei Herz-, Lungen- oder Nierenerkrankungen und Diabetes',
        gruppen: ['erwachsen'],
      },
    ],
    bild: '/bilder/impfungen/pneumokokken.jpg',
    bildtext: 'Stilisierte menschliche Lunge',
  },
  {
    id: 'rotaviren',
    name: 'Rotaviren',
    kurz: 'Schwerer Brechdurchfall bei Säuglingen',
    was: [
      'Rotaviren sind die häufigste Ursache für schweren Brechdurchfall bei Säuglingen und Kleinkindern.',
      'Sie sind sehr ansteckend. Kleine Kinder verlieren schnell viel Flüssigkeit und müssen dann oft ins Krankenhaus.',
    ],
    schema: [
      { wann: 'Ab 6 Wochen', was: 'Schluckimpfung – keine Spritze', gruppen: ['saeugling'] },
      {
        wann: 'Zwei oder drei Gaben',
        was: 'Je nach Impfstoff, im Abstand von mindestens vier Wochen',
        gruppen: ['saeugling'],
      },
      {
        wann: 'Bis 24 oder 32 Wochen',
        was: 'Abschließen – danach wird nicht mehr geimpft',
        gruppen: ['saeugling'],
      },
    ],
    bild: '/bilder/impfungen/rotaviren.jpg',
    bildtext: 'Babyfläschchen und Spucktuch auf einem Wickeltisch',
  },
  {
    id: 'meningokokken-b',
    name: 'Meningokokken B',
    kurz: 'Hirnhautentzündung und Blutvergiftung, der häufigste Typ',
    was: [
      'Meningokokken sind Bakterien, die über Tröpfchen übertragen werden.',
      'Sie können innerhalb weniger Stunden eine Hirnhautentzündung oder eine Blutvergiftung auslösen.',
      'Am häufigsten erkranken Säuglinge und Kleinkinder. In Deutschland ist Typ B der häufigste.',
    ],
    schema: [
      { wann: '2, 4 und 12 Monate', was: 'Drei Impfungen', gruppen: ['saeugling'] },
      { wann: 'Bis 4 Jahre', was: 'Fehlende Impfungen nachholen', gruppen: ['kind'] },
    ],
    bild: '/bilder/impfungen/meningokokken.jpg',
    bildtext: 'Kleinkind schläft geborgen auf dem Arm eines Elternteils',
  },
  {
    id: 'meningokokken-c',
    name: 'Meningokokken C',
    kurz: 'Hirnhautentzündung und Blutvergiftung',
    was: [
      'Meningokokken sind Bakterien, die über Tröpfchen übertragen werden.',
      'Sie können innerhalb weniger Stunden eine Hirnhautentzündung oder eine Blutvergiftung auslösen.',
      'Typ C ist seltener als Typ B, verläuft aber ebenso schwer.',
    ],
    schema: [
      { wann: '12 Monate', was: 'Eine Impfung', gruppen: ['saeugling'] },
      { wann: 'Bis 17 Jahre', was: 'Nachholen, falls sie fehlt', gruppen: ['kind', 'jugend'] },
    ],
    bild: '/bilder/impfungen/meningokokken.jpg',
    bildtext: 'Kleinkind schläft geborgen auf dem Arm eines Elternteils',
  },
  {
    id: 'masern',
    name: 'Masern',
    kurz: 'Extrem ansteckend, häufig mit Komplikationen',
    was: [
      'Masern werden durch ein Virus ausgelöst und sind extrem ansteckend – schon über die Luft im selben Raum.',
      'Typisch sind hohes Fieber und ein Ausschlag am ganzen Körper.',
      'Oft kommt es zu Komplikationen wie Lungen- oder Gehirnentzündung. Das Immunsystem bleibt danach monatelang geschwächt.',
    ],
    schema: [
      {
        wann: '11 und 15 Monate',
        was: 'Zwei Impfungen, zusammen mit Mumps und Röteln (MMR)',
        gruppen: ['saeugling'],
      },
      { wann: 'Kinder und Jugendliche', was: 'Fehlende Impfungen nachholen – zwei sind nötig', gruppen: ['kind', 'jugend'] },
      {
        wann: 'Nach 1970 geboren',
        was: 'Eine Impfung, wenn nicht schon zweimal geimpft oder unklar',
        gruppen: ['erwachsen'],
      },
    ],
    hinweis: 'Für Kita, Schule und Berufe im Gesundheitswesen ist ein Nachweis Pflicht.',
    bild: '/bilder/impfungen/masern.jpg',
    bildtext: 'Kinderarm mit feinem rotem Ausschlag, gehalten von einer erwachsenen Hand',
  },
  {
    id: 'mumps',
    name: 'Mumps',
    kurz: 'Geschwollene Wangen, Gefahr für Gehör und Hoden',
    was: [
      'Mumps ist eine Virusinfektion, die über Tröpfchen übertragen wird.',
      'Typisch ist eine schmerzhafte Schwellung der Ohrspeicheldrüsen – die „Hamsterbacken“.',
      'Mögliche Folgen sind Hirnhautentzündung, Hörschäden und bei Männern eine Hodenentzündung.',
    ],
    schema: [
      {
        wann: '11 und 15 Monate',
        was: 'Zwei Impfungen, zusammen mit Masern und Röteln (MMR)',
        gruppen: ['saeugling'],
      },
      { wann: 'Kinder und Jugendliche', was: 'Fehlende Impfungen nachholen – zwei sind nötig', gruppen: ['kind', 'jugend'] },
      {
        wann: 'Nach 1970 geboren',
        was: 'Eine Impfung bei Berufen in Gesundheitswesen, Kita oder Schule',
        gruppen: ['erwachsen'],
      },
    ],
    bild: '/bilder/impfungen/mumps.jpg',
    bildtext: 'Kindergesicht im Profil mit geschwollener Wange',
  },
  {
    id: 'roeteln',
    name: 'Röteln',
    kurz: 'Meist mild, in der Schwangerschaft gefährlich',
    was: [
      'Röteln werden durch ein Virus übertragen und verlaufen meist mild, mit Ausschlag und geschwollenen Lymphknoten.',
      'Gefährlich sind sie in der Schwangerschaft: Das ungeborene Kind kann schwere Fehlbildungen erleiden.',
    ],
    schema: [
      {
        wann: '11 und 15 Monate',
        was: 'Zwei Impfungen, zusammen mit Masern und Mumps (MMR)',
        gruppen: ['saeugling'],
      },
      { wann: 'Kinder und Jugendliche', was: 'Fehlende Impfungen nachholen – zwei sind nötig', gruppen: ['kind', 'jugend'] },
      {
        wann: 'Frauen mit Kinderwunsch',
        was: 'Insgesamt zwei Impfungen – vor einer Schwangerschaft',
        gruppen: ['erwachsen', 'schwanger'],
      },
      {
        wann: 'In der Schwangerschaft',
        was: 'Keine Impfung möglich, deshalb rechtzeitig vorher an den Schutz denken',
        gruppen: ['schwanger'],
      },
    ],
    bild: '/bilder/impfungen/roeteln.jpg',
    bildtext: 'Schwangere hält die Hände auf dem Bauch',
  },
  {
    id: 'windpocken',
    name: 'Windpocken',
    zusatz: 'Varizellen',
    kurz: 'Juckende Bläschen, bei Erwachsenen oft schwerer',
    was: [
      'Windpocken werden durch ein Virus ausgelöst und sind sehr ansteckend.',
      'Typisch ist ein juckender Ausschlag mit Bläschen am ganzen Körper.',
      'Bei Jugendlichen, Erwachsenen und Schwangeren verläuft die Krankheit oft schwerer. Das Virus bleibt im Körper und kann später eine Gürtelrose auslösen.',
    ],
    schema: [
      { wann: '11 und 15 Monate', was: 'Zwei Impfungen, oft zusammen mit MMR', gruppen: ['saeugling'] },
      {
        wann: 'Nicht geimpft, nie erkrankt',
        was: 'Zwei Impfungen nachholen',
        gruppen: ['kind', 'jugend'],
      },
      {
        wann: 'Frauen mit Kinderwunsch',
        was: 'Zwei Impfungen, wenn kein Schutz besteht – vor einer Schwangerschaft',
        gruppen: ['erwachsen', 'schwanger'],
      },
    ],
    bild: '/bilder/impfungen/windpocken.jpg',
    bildtext: 'Kinderrücken mit einzelnen Windpocken-Bläschen',
  },
  {
    id: 'hpv',
    name: 'HPV',
    zusatz: 'Humane Papillomviren',
    kurz: 'Schützt vor mehreren Krebsarten, für Mädchen und Jungen',
    was: [
      'HP-Viren werden beim Sex übertragen. Fast jeder Mensch steckt sich im Lauf des Lebens an.',
      'Meist heilt die Infektion unbemerkt aus. Manche Typen können aber Jahre später Krebs auslösen – am Gebärmutterhals, im Mund-Rachen-Raum, am After und an den Genitalien.',
      'Die Impfung wirkt am besten vor den ersten sexuellen Kontakten.',
    ],
    schema: [
      { wann: '9 bis 14 Jahre', was: 'Zwei Impfungen im Abstand von mindestens 5 Monaten', gruppen: ['jugend'] },
      { wann: 'Bis 17 Jahre', was: 'Nachholen – ab 15 Jahren drei Impfungen', gruppen: ['jugend'] },
    ],
    bild: '/bilder/impfungen/hpv.jpg',
    bildtext: 'Zwei Jugendliche von hinten auf einem Weg',
  },
  {
    id: 'grippe',
    name: 'Grippe',
    zusatz: 'Influenza',
    kurz: 'Mehr als eine Erkältung, jedes Jahr neu',
    was: [
      'Die echte Grippe ist mehr als eine Erkältung: plötzlich hohes Fieber, Kopf- und Gliederschmerzen, starkes Krankheitsgefühl.',
      'Sie kann zu einer Lungenentzündung führen und Herz- oder Lungenerkrankungen verschlechtern.',
      'Die Viren verändern sich ständig. Deshalb wird der Impfstoff jedes Jahr angepasst.',
    ],
    schema: [
      { wann: 'Jeden Herbst', was: 'Ab 60 Jahren, mit einem verstärkten Impfstoff', gruppen: ['senior'] },
      {
        wann: 'Jeden Herbst',
        was: 'Bei chronischen Erkrankungen und Berufen mit viel Kontakt zu anderen Menschen',
        gruppen: ['kind', 'jugend', 'erwachsen'],
      },
      {
        wann: 'Ab dem 4. Monat',
        was: 'Eine Impfung in der Schwangerschaft, bei Vorerkrankungen schon früher',
        gruppen: ['schwanger'],
      },
    ],
    hinweis: 'Am besten im Oktober oder November, vor Beginn der Grippewelle.',
    bild: '/bilder/impfungen/grippe.jpg',
    bildtext: 'Tasse Tee, Fieberthermometer und Taschentuch am Bett',
  },
  {
    id: 'guertelrose',
    name: 'Gürtelrose',
    zusatz: 'Herpes zoster',
    kurz: 'Schmerzhafter Ausschlag, oft lange Nervenschmerzen',
    was: [
      'Gürtelrose entsteht, wenn das Windpocken-Virus, das seit der Kindheit im Körper schlummert, wieder aktiv wird.',
      'Es kommt zu einem schmerzhaften Ausschlag, meist als Streifen an Brust, Bauch oder im Gesicht.',
      'Bei manchen bleiben die Nervenschmerzen über Monate oder Jahre. Mit dem Alter wird das häufiger.',
    ],
    schema: [
      { wann: 'Ab 60 Jahren', was: 'Zwei Impfungen im Abstand von 2 bis 6 Monaten', gruppen: ['senior'] },
      {
        wann: 'Ab 50 Jahren',
        was: 'Bei Grunderkrankungen oder geschwächtem Immunsystem',
        gruppen: ['erwachsen'],
      },
    ],
    hinweis: 'Auch wer schon eine Gürtelrose hatte, kann und sollte geimpft werden.',
    bild: '/bilder/impfungen/guertelrose.jpg',
    bildtext: 'Hand eines älteren Menschen an der Seite des Brustkorbs',
  },
  {
    id: 'covid-19',
    name: 'COVID-19',
    kurz: 'Für Ältere und chronisch Kranke weiter gefährlich',
    was: [
      'COVID-19 wird durch das Coronavirus ausgelöst und über Tröpfchen und die Luft übertragen.',
      'Bei den meisten verläuft es wie eine Erkältung. Ältere und chronisch Kranke können aber schwer erkranken.',
      'Das Virus verändert sich, die Impfstoffe werden regelmäßig angepasst.',
    ],
    schema: [
      { wann: 'Jeden Herbst', was: 'Ab 60 Jahren eine Auffrischung mit angepasstem Impfstoff', gruppen: ['senior'] },
      {
        wann: 'Grundschutz',
        was: 'Drei Kontakte durch Impfung oder Infektion, mindestens einer davon als Impfung',
        gruppen: ['erwachsen'],
      },
      {
        wann: 'Jeden Herbst',
        was: 'Auffrischung bei Grunderkrankungen und Berufen in Pflege und Medizin',
        gruppen: ['erwachsen'],
      },
      {
        wann: 'In der Schwangerschaft',
        was: 'Eine Impfung, wenn der Grundschutz fehlt',
        gruppen: ['schwanger'],
      },
    ],
    bild: '/bilder/impfungen/covid-19.jpg',
    bildtext: 'Stilisiertes Coronavirus',
  },
  {
    id: 'rsv',
    name: 'RSV',
    zusatz: 'Respiratorisches Synzytial-Virus',
    kurz: 'Schwere Atemwegsinfekte bei Säuglingen und Älteren',
    was: [
      'RSV verursacht Atemwegsinfekte, vor allem im Herbst und Winter.',
      'Für Säuglinge ist es der häufigste Grund, mit Atemnot ins Krankenhaus zu müssen.',
      'Auch ältere Menschen können schwer erkranken, besonders mit Herz- oder Lungenerkrankungen.',
    ],
    schema: [
      {
        wann: 'Vor der ersten RSV-Saison',
        was: 'Einmal Antikörper als Spritze – sie schützen sofort für den ganzen Winter',
        gruppen: ['saeugling'],
      },
      { wann: 'Ab 75 Jahren', was: 'Eine Impfung, am besten im Spätsommer oder Herbst', gruppen: ['senior'] },
      { wann: '60 bis 74 Jahre', was: 'Eine Impfung bei schweren Grunderkrankungen', gruppen: ['senior'] },
    ],
    bild: '/bilder/impfungen/rsv.jpg',
    bildtext: 'Großeltern halten ein schlafendes Baby',
  },
  {
    id: 'fsme',
    name: 'FSME',
    zusatz: 'Frühsommer-Meningoenzephalitis',
    kurz: 'Durch Zecken, die Region Würzburg ist Risikogebiet',
    was: [
      'FSME ist eine Hirnhaut- oder Gehirnentzündung durch ein Virus, das Zecken übertragen.',
      'Die Region Würzburg gehört zu den FSME-Risikogebieten.',
      'Nach grippeähnlichen Beschwerden kann es zu Lähmungen und bleibenden Schäden kommen. Mit dem Alter verläuft die Krankheit schwerer.',
    ],
    schema: [
      { wann: 'Erste und zweite Impfung', was: 'Im Abstand von 1 bis 3 Monaten, am besten im Winter' },
      { wann: 'Dritte Impfung', was: 'Je nach Impfstoff 5 bis 12 Monate nach der zweiten' },
      { wann: 'Auffrischung', was: 'Nach 3 Jahren, danach alle 5 Jahre – ab 50 oder 60 Jahren alle 3 Jahre' },
    ],
    hinweis: 'Möglich ab einem Jahr. Nach jedem Aufenthalt im Grünen den Körper nach Zecken absuchen.',
    bild: '/bilder/krankheiten/fsme.jpg',
    bildtext: 'Zecke auf einem Grashalm',
  },
];

const nachId = new Map(liste.map((i) => [i.id, i]));

export const IMPFUNGEN = liste;
export const findeImpfung = (id: string | null | undefined) => (id ? nachId.get(id) : undefined);
export const findeGruppe = (id: string | null | undefined) => GRUPPEN.find((g) => g.id === id);

/** Schritte des Impfschemas, die für die gewählte Gruppe gelten – sonst alle. */
export function schemaFuer(impfung: Impfung, gruppe: GruppeId | null): Schritt[] {
  if (!gruppe) return impfung.schema;
  const passend = impfung.schema.filter((s) => !s.gruppen || s.gruppen.includes(gruppe));
  return passend.length > 0 ? passend : impfung.schema;
}

/** Ein kurzer Zeitpunkt für die Übersicht, z. B. „Alle 10 Jahre“. */
export function zeitpunktFuer(impfung: Impfung, gruppe: GruppeId | null): string | null {
  if (!gruppe) return null;
  const s = impfung.schema.find((s) => !s.gruppen || s.gruppen.includes(gruppe));
  return s?.wann ?? null;
}
