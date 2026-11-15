// Erklärkarten in Patientensprache. Die Texte sind bewusst allgemein gehalten
// und ersetzen nicht die individuelle Beratung – bitte vor dem Einsatz
// gegenlesen und nach eigenem Stil anpassen.

import { datei, gibtEs } from '../../kern/pfad';

export interface Krankheit {
  id: string;
  name: string;
  /** Eine Zeile für Listen auf dem Patientenbildschirm. */
  kurz: string;
  /** „Worum geht es?“ – zwei bis drei Sätze. */
  was: string[];
  /** „So schützen Sie sich“ – zwei bis drei Sätze. */
  schutz: string[];
  /** Beschreibung des Symbolbilds (für Screenreader und als Ersatz, wenn das Bild fehlt). */
  bildtext: string;
}

const liste: Krankheit[] = [
  {
    id: 'malaria',
    name: 'Malaria',
    kurz: 'Mückenschutz, je nach Gebiet Tabletten',
    was: [
      'Malaria wird durch den Stich bestimmter Mücken übertragen – vor allem abends und nachts.',
      'Sie beginnt meist mit Fieber und fühlt sich an wie eine Grippe. Das kann eine Woche nach dem Stich sein, aber auch erst Monate später.',
      'Unbehandelt kann Malaria lebensgefährlich werden. Früh erkannt ist sie gut behandelbar.',
    ],
    schutz: [
      'Mückenstiche vermeiden: lange, helle Kleidung, Mückenmittel auf die Haut, unter einem Moskitonetz schlafen.',
      'Je nach Reisegebiet Tabletten zur Vorbeugung – vor, während und nach der Reise.',
      'Fieber während oder nach der Reise: sofort zum Arzt und die Reise erwähnen.',
    ],
    bildtext: 'Anopheles-Mücke auf der Haut',
  },
  {
    id: 'hepatitis-a',
    name: 'Hepatitis A',
    kurz: 'Leberentzündung durch Essen und Wasser',
    was: [
      'Hepatitis A ist eine Leberentzündung durch ein Virus.',
      'Man steckt sich über verunreinigtes Wasser, Eiswürfel oder rohe Speisen an – zum Beispiel Salat oder Meeresfrüchte.',
      'Typisch sind Übelkeit, Müdigkeit und gelbe Haut. Die Krankheit heilt meist aus, kann aber viele Wochen dauern.',
    ],
    schutz: [
      'Die Impfung ist gut verträglich und schützt zuverlässig.',
      'Eine Spritze schützt für die Reise, eine zweite nach frühestens sechs Monaten für viele Jahre.',
      'Zusätzlich gilt: gekocht, geschält oder verzichten.',
    ],
    bildtext: 'Rohe Speisen und ein Glas Wasser mit Eis',
  },
  {
    id: 'hepatitis-b',
    name: 'Hepatitis B',
    kurz: 'Leberentzündung durch Blut und Körperflüssigkeiten',
    was: [
      'Hepatitis B ist eine Leberentzündung durch ein Virus.',
      'Übertragen wird sie über Blut und Körperflüssigkeiten: ungeschützter Sex, Tätowierungen, Piercings oder medizinische Eingriffe bei schlechter Hygiene.',
      'Die Infektion kann chronisch werden und die Leber dauerhaft schädigen.',
    ],
    schutz: [
      'Die Impfung besteht aus mehreren Spritzen. Viele Jüngere sind seit der Kindheit geimpft – das prüfen wir im Impfpass.',
      'Kondome benutzen.',
      'Auf Tätowierungen, Piercings und vermeidbare Eingriffe im Reiseland verzichten.',
    ],
    bildtext: 'Stilisierte Leber mit einem Blutstropfen',
  },
  {
    id: 'typhus',
    name: 'Typhus',
    kurz: 'Fieberhafte Infektion durch Essen und Wasser',
    was: [
      'Typhus wird durch Bakterien ausgelöst, die über verunreinigtes Wasser und Lebensmittel aufgenommen werden.',
      'Typisch ist hohes Fieber über mehrere Tage, dazu Kopf- und Bauchschmerzen.',
      'Typhus wird mit Antibiotika behandelt. In manchen Ländern wirken aber nicht mehr alle Mittel.',
    ],
    schutz: [
      'Es gibt eine Impfung als Spritze oder als Schluckimpfung.',
      'Die Impfung schützt gut, aber nicht vollständig.',
      'Deshalb bleibt wichtig: nur abgekochtes oder original verschlossenes Wasser, Essen frisch gekocht.',
    ],
    bildtext: 'Wasser läuft aus einem Hahn in ein Glas',
  },
  {
    id: 'tollwut',
    name: 'Tollwut',
    kurz: 'Übertragung durch Tierbisse, vor allem Hunde',
    was: [
      'Tollwut wird durch Bisse, Kratzer oder Speichel infizierter Tiere übertragen – meist Hunde, auch Katzen, Affen und Fledermäuse.',
      'Bricht die Krankheit aus, verläuft sie tödlich.',
      'Nach einem Biss muss deshalb sofort behandelt werden. In vielen Ländern sind die nötigen Medikamente schwer zu bekommen.',
    ],
    schutz: [
      'Tiere nicht anfassen und nicht füttern – auch wenn sie zutraulich wirken.',
      'Die Impfung vor der Reise macht die Behandlung nach einem Biss einfacher und sicherer.',
      'Nach jedem Biss: Wunde 15 Minuten mit Wasser und Seife waschen, desinfizieren, sofort zum Arzt – auch wenn Sie geimpft sind.',
    ],
    bildtext: 'Straßenhund auf einer staubigen Dorfstraße',
  },
  {
    id: 'gelbfieber',
    name: 'Gelbfieber',
    kurz: 'Durch Mücken übertragen, teils Impfnachweis nötig',
    was: [
      'Gelbfieber wird in Teilen Afrikas und Südamerikas durch tagaktive Mücken übertragen.',
      'Es beginnt mit Fieber. In schweren Fällen kommt es zu Leberschäden und Blutungen.',
      'Manche Länder verlangen bei der Einreise einen Impfnachweis.',
    ],
    schutz: [
      'Eine einzige Impfung schützt in der Regel lebenslang.',
      'Sie wird nur in zugelassenen Gelbfieber-Impfstellen gegeben und muss spätestens zehn Tage vor der Einreise erfolgen.',
      'Zusätzlich: Mückenschutz auch tagsüber.',
    ],
    bildtext: 'Tropischer Regenwald an einem Fluss',
  },
  {
    id: 'japanische-enzephalitis',
    name: 'Japanische Enzephalitis',
    kurz: 'Durch Mücken übertragen, vor allem auf dem Land',
    was: [
      'Die Japanische Enzephalitis wird in Asien durch Mücken übertragen, die abends und nachts stechen.',
      'Das Risiko ist vor allem in ländlichen Gebieten erhöht, etwa bei Reisfeldern und Schweinehaltung.',
      'Meist bleibt die Infektion unbemerkt. Selten kommt es zu einer schweren Gehirnentzündung.',
    ],
    schutz: [
      'Die Impfung besteht aus zwei Spritzen vor der Reise.',
      'Mückenschutz in der Dämmerung und nachts: lange Kleidung, Mückenmittel, Moskitonetz.',
    ],
    bildtext: 'Reisfelder in der Abenddämmerung',
  },
  {
    id: 'meningokokken',
    name: 'Meningokokken',
    kurz: 'Hirnhautentzündung bei engem Kontakt zu Menschen',
    was: [
      'Meningokokken sind Bakterien, die beim Husten, Niesen und bei engem Kontakt übertragen werden.',
      'Sie können innerhalb von Stunden eine Hirnhautentzündung oder Blutvergiftung auslösen.',
      'Das Risiko ist erhöht bei engem Kontakt zur Bevölkerung, bei Menschenansammlungen und in bestimmten Regionen Afrikas.',
    ],
    schutz: [
      'Eine Impfung schützt vor den wichtigsten Typen (A, C, W und Y).',
      'Für die Pilgerreise nach Mekka ist der Impfnachweis vorgeschrieben.',
    ],
    bildtext: 'Viele Menschen dicht beieinander',
  },
  {
    id: 'chikungunya',
    name: 'Chikungunya',
    kurz: 'Fieber und Gelenkschmerzen durch Mückenstiche',
    was: [
      'Chikungunya wird durch tagaktive Mücken übertragen.',
      'Typisch sind Fieber und starke Gelenkschmerzen, die Wochen bis Monate anhalten können.',
      'Die Krankheit ist selten gefährlich, kann aber sehr langwierig sein.',
    ],
    schutz: [
      'Am wichtigsten ist konsequenter Mückenschutz – auch tagsüber.',
      'Eine Impfung kommt für bestimmte Reisende infrage, etwa bei Ausbrüchen im Reiseland. Das besprechen wir individuell.',
    ],
    bildtext: 'Hände halten ein schmerzendes Handgelenk',
  },
  {
    id: 'dengue',
    name: 'Dengue-Fieber',
    kurz: 'Fieber durch tagaktive Mücken, auch in Städten',
    was: [
      'Dengue wird durch Mücken übertragen, die tagsüber stechen – auch in Städten.',
      'Typisch sind hohes Fieber, Kopf- und Gliederschmerzen, manchmal ein Hautausschlag.',
      'Meist ist die Krankheit nach etwa einer Woche überstanden. Eine zweite Infektion kann schwerer verlaufen.',
    ],
    schutz: [
      'Mückenschutz den ganzen Tag: Mückenmittel und bedeckende Kleidung.',
      'Die Impfung wird derzeit nur empfohlen, wenn Sie schon einmal nachgewiesen Dengue hatten.',
      'Bei Fieber im Reiseland: Paracetamol statt ASS oder Ibuprofen, und ärztlich abklären lassen.',
    ],
    bildtext: 'Mücke mit weiß gestreiften Beinen auf einem Blatt',
  },
  {
    id: 'fsme',
    name: 'FSME',
    kurz: 'Durch Zecken übertragene Hirnhautentzündung',
    was: [
      'FSME wird durch Zeckenstiche übertragen – in Teilen Europas und Asiens.',
      'Sie beginnt wie eine Grippe. Bei einem Teil der Erkrankten folgt eine Entzündung von Hirnhaut oder Gehirn.',
    ],
    schutz: [
      'Die Impfung besteht aus drei Spritzen und wird regelmäßig aufgefrischt.',
      'In der Natur: lange Kleidung, Zeckenmittel und abends den Körper absuchen.',
    ],
    bildtext: 'Zecke an der Spitze eines Grashalms',
  },
  {
    id: 'polio',
    name: 'Polio (Kinderlähmung)',
    kurz: 'Impfschutz prüfen und bei Bedarf auffrischen',
    was: [
      'Polio wird über verunreinigtes Wasser und über die Hände übertragen.',
      'Die Krankheit kommt nur noch in wenigen Ländern vor, kann aber bleibende Lähmungen verursachen.',
    ],
    schutz: [
      'Die meisten Menschen sind als Kind geimpft. Vor manchen Reisen ist eine Auffrischung sinnvoll.',
      'Einige Länder verlangen nach längerem Aufenthalt einen Impfnachweis bei der Ausreise.',
    ],
    bildtext: 'Impfstoff-Fläschchen und Impfausweis',
  },
  {
    id: 'cholera',
    name: 'Cholera',
    kurz: 'Schwerer Durchfall durch verunreinigtes Wasser',
    was: [
      'Cholera ist eine Durchfallerkrankung durch Bakterien in verunreinigtem Wasser.',
      'Für Touristen ist das Risiko sehr gering, wenn sie auf sauberes Wasser und Essen achten.',
    ],
    schutz: [
      'Nur abgekochtes oder original verschlossenes Wasser trinken.',
      'Eine Schluckimpfung gibt es für besondere Einsätze, etwa in Ausbruchsgebieten.',
    ],
    bildtext: 'Handpumpe mit trübem Wasser',
  },
  {
    id: 'standard',
    name: 'Standardimpfungen',
    kurz: 'Tetanus, Diphtherie, Masern und weitere',
    was: [
      'Eine Reise ist ein guter Anlass, den Impfpass durchzusehen.',
      'Dazu gehören Tetanus, Diphtherie, Keuchhusten, Polio und Masern – je nach Alter auch Grippe, Pneumokokken und COVID-19.',
      'Manche dieser Krankheiten sind in Reiseländern deutlich häufiger als bei uns.',
    ],
    schutz: [
      'Bringen Sie Ihren Impfpass mit – fehlende Impfungen holen wir nach.',
      'Am besten vier bis sechs Wochen vor der Abreise.',
    ],
    bildtext: 'Gelber Impfausweis neben einem Stethoskop',
  },
  {
    id: 'muecken',
    name: 'Mückenschutz',
    kurz: 'Kleidung, Mückenmittel, Moskitonetz',
    was: [
      'Mücken übertragen mehrere Krankheiten, gegen die es keine oder nur eingeschränkt Impfungen gibt – zum Beispiel Dengue, Chikungunya und Malaria.',
      'Manche Mücken stechen tagsüber, andere in der Dämmerung und nachts.',
    ],
    schutz: [
      'Lange, helle Kleidung tragen.',
      'Mückenmittel mit DEET oder Icaridin auf die freie Haut – nach dem Sonnenschutz auftragen.',
      'Unter einem Moskitonetz oder in klimatisierten Räumen schlafen.',
    ],
    bildtext: 'Bett mit Moskitonetz',
  },
  {
    id: 'durchfall',
    name: 'Essen und Trinken',
    kurz: 'Gekocht, geschält oder verzichten',
    was: [
      'Reisedurchfall ist die häufigste Erkrankung auf Fernreisen.',
      'Meist ist er harmlos und nach wenigen Tagen vorbei – lästig ist er trotzdem.',
    ],
    schutz: [
      'Wasser nur abgekocht oder aus original verschlossenen Flaschen, keine Eiswürfel.',
      'Essen frisch gekocht und heiß, Obst selbst schälen.',
      'Bei Durchfall viel trinken. Bei Fieber, Blut im Stuhl oder mehr als drei Tagen Dauer zum Arzt.',
    ],
    bildtext: 'Wasserflasche, geschälte Banane und frisch gekochtes Essen',
  },
];

const nachId = new Map(liste.map((k) => [k.id, k]));

export const KRANKHEITEN = liste;
export const findeKrankheit = (id: string | null | undefined) => (id ? nachId.get(id) : undefined);

/** Themen, die der Arzt unabhängig vom Land zeigen kann. */
export const WEITERE_THEMEN = ['standard', 'muecken', 'durchfall', 'cholera'];

/** Symbolbild einer Krankheit – oder null, wenn diese Fassung die Bilder nicht ausliefert. */
export const bildPfad = (id: string) => {
  const pfad = `/bilder/krankheiten/${id}.jpg`;
  return gibtEs(pfad) ? datei(pfad) : null;
};
