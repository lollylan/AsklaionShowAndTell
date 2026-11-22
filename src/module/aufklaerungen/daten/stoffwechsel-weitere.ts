import type { Krankheit } from './typen';

// Weitere Themen im Gebiet Stoffwechsel: Vorstufe des Diabetes, Fußkomplikationen,
// Schilddrüsenüberfunktion und zwei häufige Vitaminmängel. Abgegrenzt von Diabetes Typ 2,
// Polyneuropathie, Schilddrüsenunterfunktion, Hashimoto und Schilddrüsenknoten (daten/stoffwechsel.ts).

export const STOFFWECHSEL_WEITERE: Krankheit[] = [
  {
    id: 'praediabetes',
    name: 'Prädiabetes',
    zusatz: 'Vorstufe des Diabetes',
    gebiet: 'stoffwechsel',
    bilder: { behandlung: 'praediabetes-risiko' },
    suche:
      'praediabetes vorstufe diabetes grenzwertig zucker blutzucker hba1c langzeitzucker nuechternzucker gestoerte glukosetoleranz igt ifg zuckerbelastungstest ogtt insulinresistenz lebensstil abnehmen bewegung check-up',
    was: [
      'Bei einem Prädiabetes ist der Blutzucker höher als normal, aber noch nicht so hoch wie bei Diabetes.',
      'Man erkennt ihn am Langzeitzucker HbA1c zwischen 5,7 und 6,4 Prozent oder an einem Nüchternzucker zwischen 100 und 125 mg/dl.',
      'Beschwerden macht das nicht. Meist fällt es bei einer Blutabnahme auf, etwa beim Check-up.',
      'Prädiabetes ist noch keine Krankheit, aber ein deutliches Warnsignal – und die beste Zeit, um gegenzusteuern.',
    ],
    ursachen: [
      'Die Körperzellen sprechen schlechter auf Insulin an. Die Bauchspeicheldrüse muss mehr davon bilden, damit der Zucker im Rahmen bleibt.',
      'Das Risiko steigt mit Übergewicht am Bauch, wenig Bewegung, höherem Alter und wenn Eltern oder Geschwister Diabetes haben.',
      'Auch ein früherer Schwangerschaftsdiabetes, Bluthochdruck, erhöhte Blutfette und Rauchen gehören dazu.',
      'Ohne Änderung entwickeln viele über die Jahre einen Typ-2-Diabetes. Schon die Vorstufe belastet Herz und Gefäße.',
    ],
    behandlung: [
      'Die wichtigste Behandlung sind Bewegung, ausgewogenes Essen und – bei Übergewicht – eine maßvolle Gewichtsabnahme.',
      'In großen Studien hat das das Risiko für Diabetes etwa halbiert. Bei manchen kehren die Werte ganz in den Normalbereich zurück.',
      'Tabletten gegen Zucker sind in dieser Phase meist nicht nötig.',
      'Wir kontrollieren den Langzeitzucker etwa einmal im Jahr und achten auch auf Blutdruck und Blutfette.',
    ],
    selbst: [
      'Bewegen Sie sich mindestens zweieinhalb Stunden pro Woche, zum Beispiel an fünf Tagen je eine halbe Stunde zügig gehen.',
      'Bei Übergewicht wirken schon fünf bis sieben Prozent weniger Gewicht deutlich – bei 90 Kilo also etwa fünf Kilo.',
      'Lassen Sie gesüßte Getränke weg. Essen Sie mehr Gemüse, Hülsenfrüchte und Vollkorn, weniger Weißmehl und Süßes.',
      'Hören Sie auf zu rauchen. Auch genug Schlaf tut dem Zuckerstoffwechsel gut.',
    ],
    warnung:
      'Starker Durst, häufiges Wasserlassen oder ungewollter Gewichtsverlust können zeigen, dass schon ein Diabetes entstanden ist. Dann bitte bald melden.',
  },
  {
    id: 'diabetischer-fuss',
    name: 'Diabetischer Fuß',
    zusatz: 'Diabetisches Fußsyndrom',
    gebiet: 'stoffwechsel',
    suche:
      'diabetischer fuss diabetisches fusssyndrom dfs fussulkus ulkus ulcus wunde druckstelle blase hornhaut neuropathie polyneuropathie durchblutung pavk fusspulse fusskontrolle fussuntersuchung stimmgabel monofilament podologie medizinische fusspflege nagelpflege diabetesschuhe schutzschuh einlagen charcot fuss amputation dmp diabetes',
    seiten: [
      {
        id: 'was',
        titel: 'Was ist das?',
        kurz: 'Die Krankheit',
        saetze: [
          'Diabetes kann über Jahre die Nerven und die Adern in den Beinen schädigen. Am stärksten betroffen sind die Füße.',
          'Spürt der Fuß weniger, bemerkt man Druckstellen, Blasen oder kleine Verletzungen nicht. Ist er schlecht durchblutet, heilen sie zudem langsam.',
          'So kann aus einer Kleinigkeit eine tiefe, hartnäckige Wunde werden. Das nennt man diabetisches Fußsyndrom.',
          'Die gute Nachricht: Die meisten dieser Wunden lassen sich verhindern – durch tägliches Ansehen, gute Pflege und passende Schuhe.',
        ],
      },
      {
        id: 'ursachen',
        titel: 'Nerven und Durchblutung',
        kurz: 'Ursachen',
        saetze: [
          'Dauerhaft hoher Zucker schädigt die feinen Nerven. Zuerst lässt das Gefühl an Zehen und Fußsohlen nach, oft mit Kribbeln oder Brennen – mehr dazu unter Polyneuropathie.',
          'Die Füße schwitzen weniger, die Haut wird trocken und rissig. Die Fußform kann sich verändern, dadurch entstehen neue Druckstellen.',
          'Verengte Beinadern bringen weniger Blut in den Fuß. Rauchen verstärkt das erheblich.',
          'Das Risiko ist höher, wenn Sie schon einmal eine Fußwunde hatten, schlecht sehen oder nicht gut an Ihre Füße herankommen.',
        ],
      },
      {
        id: 'ansehen',
        titel: 'Füße täglich ansehen',
        kurz: 'Ansehen',
        bild: 'diabetischer-fuss-kontrolle',
        saetze: [
          'Sehen Sie sich Ihre Füße jeden Abend an: Sohle, Ferse, Zehen und die Zwischenräume.',
          'Achten Sie auf Rötungen, Blasen, Risse, dunkle Flecken unter der Hornhaut und Stellen, die warm oder geschwollen sind.',
          'Für die Sohle hilft ein Spiegel. Sehen Sie schlecht oder kommen Sie nicht gut heran, bitten Sie einen Angehörigen.',
          'Verlassen Sie sich nicht auf Schmerzen: Ist das Gefühl gestört, tut auch eine Wunde nicht weh.',
        ],
      },
      {
        id: 'kontrolle',
        titel: 'Kontrolle in der Praxis',
        kurz: 'Untersuchung',
        saetze: [
          'Wir untersuchen Ihre Füße mindestens einmal im Jahr. Bei erhöhtem Risiko öfter, je nach Befund alle paar Monate.',
          'Mit einer Stimmgabel und einem feinen Nylonfaden prüfen wir, wie gut Sie fühlen. Dazu tasten wir die Fußpulse.',
          'Wir sehen uns auch Haut, Nägel, Fußform, Schuhe und Strümpfe an.',
          'Sind die Füße gefährdet, können wir medizinische Fußpflege (Podologie) verordnen. Bei einer Wunde arbeiten wir mit einer spezialisierten Fußambulanz zusammen.',
        ],
      },
      {
        id: 'pflege',
        titel: 'Füße richtig pflegen',
        kurz: 'Pflege',
        saetze: [
          'Waschen Sie die Füße täglich kurz in lauwarmem Wasser. Prüfen Sie die Temperatur mit dem Thermometer oder dem Ellenbogen, nicht mit dem Fuß.',
          'Trocknen Sie die Zehenzwischenräume gut ab. Trockene Haut mit einer harnstoffhaltigen Creme pflegen, aber nicht zwischen den Zehen.',
          'Nägel gerade feilen statt schneiden. Hornhaut nur mit Bimsstein oder Feile – keine Hornhauthobel, Scheren oder Hühneraugenpflaster.',
          'Keine Wärmflasche, kein Heizkissen, kein heißes Fußbad: Verbrennungen bemerkt man sonst nicht.',
        ],
      },
      {
        id: 'schuhe',
        titel: 'Passende Schuhe',
        kurz: 'Schuhe',
        bild: 'diabetischer-fuss-schuh',
        saetze: [
          'Gehen Sie nie barfuß, auch nicht in der Wohnung.',
          'Schuhe sollten weich sein und vorn genug Platz haben. Kaufen Sie sie am Nachmittag, dann sind die Füße etwas dicker.',
          'Tasten Sie jeden Schuh vor dem Anziehen innen aus. Socken ohne drückende Nähte, täglich frisch.',
          'Bei Nervenschäden oder verformten Füßen gibt es Schutzschuhe und angepasste Einlagen auf Rezept.',
        ],
      },
    ],
    warnung:
      'Eine offene Stelle, Rötung, Schwellung oder ein warmer, dicker Fuß – auch ohne Schmerzen – bitte am selben Tag zeigen.',
  },
  {
    id: 'schilddruesenueberfunktion',
    name: 'Schilddrüsenüberfunktion',
    zusatz: 'Hyperthyreose, oft durch Morbus Basedow',
    gebiet: 'stoffwechsel',
    bilder: { behandlung: 'schilddruesenueberfunktion-wege' },
    suche:
      'hyperthyreose ueberfunktion schilddruese morbus basedow graves autoimmun trak antikoerper autonomie heisser knoten tsh ft3 ft4 thyreostatika thiamazol carbimazol betablocker propranolol radiojod radiojodtherapie operation thyreoidektomie endokrine orbitopathie augen herzrasen vorhofflimmern kontrastmittel jod',
    was: [
      'Bei einer Überfunktion bildet die Schilddrüse zu viel Hormon. Der Körper läuft wie auf Hochtouren.',
      'Typisch sind Herzrasen, innere Unruhe, Zittern, Schwitzen, Gewichtsverlust trotz Appetit, Durchfall und schlechter Schlaf.',
      'Bei älteren Menschen sind die Zeichen oft schwächer. Manchmal fallen nur Kraftlosigkeit oder ein unregelmäßiger Herzschlag auf.',
      'Erkannt wird die Überfunktion am Blut: Das TSH ist erniedrigt, die Schilddrüsenhormone sind meist erhöht.',
    ],
    ursachen: [
      'Häufig ist der Morbus Basedow: Abwehrstoffe des Körpers treiben die Schilddrüse an. Dabei können auch die Augen betroffen sein – sie treten hervor, brennen oder tränen.',
      'Die andere häufige Ursache sind heiße Knoten, die von sich aus zu viel Hormon bilden. Sie kommen eher im höheren Alter vor.',
      'Viel Jod, etwa aus Kontrastmittel bei CT oder Herzkatheter, kann eine Überfunktion auslösen. Seltener stecken eine Entzündung oder zu viele Schilddrüsentabletten dahinter.',
      'Unbehandelt belastet die Überfunktion Herz und Knochen. Sehr selten entgleist sie lebensbedrohlich.',
    ],
    behandlung: [
      'Tabletten, die die Hormonbildung bremsen (Thyreostatika wie Thiamazol), bringen die Werte meist in einigen Wochen in Ordnung. Gegen Herzrasen hilft anfangs ein Betablocker.',
      'Beim Morbus Basedow nehmen Sie die Tabletten meist ein bis eineinhalb Jahre. Danach heilt die Krankheit bei einem Teil aus, bei vielen kommt sie aber zurück.',
      'Heiße Knoten und ein wiederkehrender Basedow werden dauerhaft behandelt: mit Radiojod – einer Kapsel, die nur in der Schilddrüse wirkt, für einige Tage auf einer Spezialstation – oder mit einer Operation.',
      'Danach bildet die Schilddrüse oft zu wenig Hormon. Dann ersetzen wir es als Tablette – das ist einfach und gut verträglich.',
    ],
    selbst: [
      'Nehmen Sie die Tabletten regelmäßig und kommen Sie zu den Blutkontrollen, anfangs alle paar Wochen.',
      'Sagen Sie vor jedem CT oder Herzkatheter mit Kontrastmittel Bescheid. Meiden Sie Jodtabletten, Algen und Seetang.',
      'Beim Basedow: Hören Sie auf zu rauchen. Rauchen verschlechtert die Augen und macht Rückfälle wahrscheinlicher.',
      'Wenn Sie schwanger werden möchten, sprechen Sie uns vorher an – Behandlung und Medikamente müssen dann angepasst werden.',
    ],
    warnung:
      'Unter Thiamazol oder Carbimazol: Bei Fieber, Halsschmerzen oder wunden Stellen im Mund sofort melden – dann muss am selben Tag das Blutbild kontrolliert werden.',
  },
  {
    id: 'vitamin-d-mangel',
    name: 'Vitamin-D-Mangel',
    zusatz: 'Wann testen, wann ergänzen?',
    gebiet: 'stoffwechsel',
    bilder: { behandlung: 'vitamin-d-mangel-dosis' },
    suche:
      'vitamin d vitamin d3 colecalciferol cholecalciferol 25-oh-vitamin-d calcidiol spiegel bluttest mangel sonne winter knochen osteoporose osteomalazie rachitis nahrungsergaenzung tropfen tabletten ueberdosierung kalzium hyperkalzaemie',
    was: [
      'Vitamin D braucht der Körper vor allem für feste Knochen: Es hilft, Kalzium aus der Nahrung aufzunehmen.',
      'Den größten Teil bildet die Haut selbst, wenn Sonne darauf scheint. Über das Essen kommt nur wenig dazu, etwa aus fettem Fisch und Eiern.',
      'Ein leichter Mangel macht meist keine Beschwerden. Ein ausgeprägter Mangel kann zu Knochenschmerzen, Muskelschwäche und weichen Knochen führen.',
      'Im Winter sind die Werte bei vielen Menschen niedriger. Das allein ist noch keine Krankheit.',
    ],
    ursachen: [
      'In Deutschland bildet die Haut nur etwa von März bis Oktober genug Vitamin D. Im Winter zehrt der Körper vom Vorrat aus dem Sommer.',
      'Ein Mangel droht vor allem, wenn man kaum nach draußen kommt – etwa bei Pflegebedürftigkeit –, bei dunkler Haut oder wenn die Haut fast immer bedeckt ist.',
      'Auch höheres Alter, starkes Übergewicht, Nieren- und Lebererkrankungen, Darmkrankheiten und manche Medikamente, etwa gegen Krampfanfälle, senken den Spiegel.',
      'Säuglinge bekommen im ersten Lebensjahr routinemäßig Vitamin D.',
    ],
    behandlung: [
      'Ein Bluttest ist sinnvoll bei Osteoporose, Knochenschmerzen, Nierenschwäche, Darmkrankheiten mit gestörter Aufnahme oder bestimmten Medikamenten.',
      'Einen Suchtest bei Gesunden ohne Risiko empfehlen wir nicht. Die Kasse bezahlt ihn dann nicht, und er ändert selten etwas.',
      'Bei einem echten Mangel oder hohem Risiko ergänzen wir Vitamin D, meist 800 bis 1000 Einheiten am Tag oder eine entsprechende Wochendosis.',
      'Für Gesunde mit normalem Spiegel haben Vitamin-D-Tabletten keinen nachgewiesenen Nutzen gegen Herzkrankheiten, Krebs oder Infekte.',
    ],
    selbst: [
      'Gehen Sie von Frühling bis Herbst regelmäßig nach draußen. Gesicht, Hände und Arme für einige Minuten bis eine knappe halbe Stunde in der Sonne reichen meist – je nach Hauttyp.',
      'Vermeiden Sie Sonnenbrand: Er erhöht das Hautkrebsrisiko und bringt nicht mehr Vitamin D.',
      'Fetter Fisch wie Hering, Makrele oder Lachs ein- bis zweimal pro Woche trägt etwas bei.',
      'Nehmen Sie keine hoch dosierten Präparate auf eigene Faust. Dauerhaft mehr als 4000 Einheiten am Tag können zu viel Kalzium im Blut verursachen und Nieren und Herz schaden.',
    ],
    warnung:
      'Übelkeit, starker Durst, viel Wasserlassen oder Verwirrtheit unter hoch dosiertem Vitamin D können eine Überdosierung bedeuten. Dann das Präparat absetzen und bald melden.',
  },
  {
    id: 'vitamin-b12-mangel',
    name: 'Vitamin-B12-Mangel',
    zusatz: 'Cobalamin-Mangel',
    gebiet: 'stoffwechsel',
    bilder: { behandlung: 'vitamin-b12-mangel-wege' },
    suche:
      'vitamin b12 b-12 cobalamin cyanocobalamin hydroxocobalamin mangel holo-tc holotranscobalamin methylmalonsaeure mma perniziose anaemie perniziosa intrinsic factor autoimmungastritis typ a blutarmut makrozytaer metformin pantoprazol omeprazol ppi saeureblocker magenschutz vegan vegetarisch kribbeln taubheit gangunsicherheit spritze tabletten',
    was: [
      'Vitamin B12 braucht der Körper für die Blutbildung und für gesunde Nerven.',
      'In der Leber liegt ein großer Vorrat. Ein Mangel entwickelt sich deshalb langsam, oft über Jahre.',
      'Typisch sind Müdigkeit, Blässe und Blutarmut, Kribbeln oder Taubheit in Händen und Füßen, ein unsicherer Gang, Gedächtnisprobleme oder eine brennende Zunge.',
      'Erkannt wird der Mangel am Blut. Liegt der Wert im Graubereich, hilft ein zusätzlicher Test (Holo-TC oder Methylmalonsäure).',
    ],
    ursachen: [
      'B12 steckt fast nur in tierischen Lebensmitteln. Wer vegan lebt, bekommt ohne Ergänzung zu wenig.',
      'Für die Aufnahme braucht der Körper Magensäure und einen Stoff aus der Magenschleimhaut. Im Alter, bei einer Magenschleimhautentzündung vom Typ A oder nach einer Magenoperation fehlt das oft.',
      'Auch Darmkrankheiten wie Morbus Crohn stören die Aufnahme.',
      'Medikamente senken den Spiegel, wenn man sie lange nimmt: vor allem Metformin gegen Diabetes und Magenschutz-Tabletten wie Pantoprazol oder Omeprazol.',
      'Unbehandelt können Nervenschäden bleiben. Darum lohnt es sich, einen Mangel früh zu erkennen.',
    ],
    behandlung: [
      'Fehlt B12, ersetzen wir es – als Spritze in den Muskel oder als hoch dosierte Tablette.',
      'Hoch dosierte Tabletten wirken auch, wenn die Aufnahme über den Magen gestört ist, denn ein kleiner Teil gelangt immer ins Blut. Sie müssen sie aber täglich nehmen.',
      'Bei Nervenbeschwerden oder schwerem Mangel beginnen wir meist mit Spritzen: anfangs in kurzen Abständen, später etwa alle ein bis drei Monate.',
      'Lässt sich die Ursache nicht beheben, ist die Behandlung dauerhaft nötig. Die Blutwerte bessern sich in Wochen, die Nerven brauchen länger.',
    ],
    selbst: [
      'Wenn Sie vegan leben: Nehmen Sie immer ein B12-Präparat. In Schwangerschaft und Stillzeit ist das besonders wichtig.',
      'Nehmen Sie seit Jahren Metformin oder Magenschutz-Tabletten, sprechen Sie uns auf eine Kontrolle an. Setzen Sie die Medikamente nicht selbst ab.',
      'Nehmen Sie die Tabletten regelmäßig und halten Sie die Spritzentermine ein – auch wenn Sie sich längst wieder gut fühlen.',
      'Zu viel B12 ist kaum möglich: Was der Körper nicht braucht, scheidet er aus.',
    ],
    warnung:
      'Zunehmende Taubheit, ein unsicherer Gang oder neue Gedächtnisprobleme bitte bald abklären lassen – je früher behandelt wird, desto besser erholen sich die Nerven.',
  },
];
