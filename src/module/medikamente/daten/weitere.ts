import type { Medikament } from './typen';

const MAGENBLUTUNG =
  'Schwarzer Stuhl, Bluterbrechen oder starke Magenschmerzen: nicht weiternehmen und sofort ärztliche Hilfe holen.';

const ALLERGIE =
  'Atemnot, Schwellung im Gesicht oder am Hals, Ausschlag am ganzen Körper: nicht weiternehmen und sofort den Notruf 112 wählen.';

export const SCHMERZ: Medikament[] = [
  {
    id: 'ibuprofen',
    name: 'Ibuprofen',
    zusatz: 'Schmerz- und Entzündungshemmer',
    gebiet: 'schmerz',
    handelsnamen: ['Nurofen', 'Dolormin', 'Ibuflam', 'IbuHexal', 'Ibu-ratiopharm'],
    form: 'Filmtablette',
    suche: 'nsar antirheumatikum schmerzmittel fieber entzuendung naproxen',
    wofuer: [
      'Ibuprofen hemmt Botenstoffe, die Schmerz, Entzündung und Fieber auslösen.',
      'Es hilft gut bei Schmerzen an Gelenken, Muskeln und Zähnen, bei Kopf- und Regelschmerzen.',
      'Es ist für kurze Zeit gedacht – so wenig und so kurz wie möglich.',
    ],
    merker: [
      { symbol: 'mehrmals', titel: 'Bis zu dreimal täglich', text: 'mit mindestens sechs Stunden Abstand' },
      { symbol: 'essen', titel: 'Zum Essen', text: 'mit einem Glas Wasser – das schont den Magen' },
    ],
    einnahme: [
      'Ohne ärztlichen Rat höchstens 1200 mg am Tag und nicht länger als vier Tage.',
      'Die Wirkung setzt nach etwa einer halben Stunde ein.',
    ],
    nebenwirkungen: [
      { symbol: 'magen', name: 'Magenbeschwerden', text: 'Sodbrennen, Magendruck, Übelkeit. Auf Dauer drohen Geschwüre.' },
      { symbol: 'blutdruck', name: 'Blutdruck steigt', text: 'Der Körper hält Wasser zurück, die Knöchel können anschwellen.' },
      { symbol: 'niere', name: 'Nieren leiden', text: 'Vor allem bei wenig Trinken, im Alter und mit Blutdruckmitteln.' },
    ],
    achtung: [
      'Nicht mit Blutverdünnern, bei Nieren- oder Herzschwäche oder nach einem Magengeschwür – außer wir haben es besprochen.',
      'Nicht mit anderen Schmerzmitteln derselben Gruppe mischen, etwa Diclofenac oder Naproxen.',
      'In den letzten drei Monaten der Schwangerschaft verboten, davor nur nach Rücksprache.',
    ],
    warnung: MAGENBLUTUNG,
  },
  {
    id: 'diclofenac',
    name: 'Diclofenac',
    zusatz: 'Schmerz- und Entzündungshemmer',
    gebiet: 'schmerz',
    handelsnamen: ['Voltaren', 'Diclac', 'Diclofenac-ratiopharm', 'Diclo 1A Pharma'],
    form: 'Tablette oder Kapsel',
    suche: 'nsar antirheumatikum schmerzmittel gelenk arthrose entzuendung voltaren gel salbe',
    wofuer: [
      'Diclofenac hemmt Botenstoffe, die Schmerz und Entzündung auslösen.',
      'Es wirkt stark bei entzündeten und geschwollenen Gelenken, bei Gicht und bei Rückenschmerzen.',
      'Es ist für kurze Zeit gedacht – so wenig und so kurz wie möglich.',
    ],
    merker: [
      { symbol: 'mehrmals', titel: 'Ein- bis dreimal täglich', text: 'so wie es auf Ihrem Plan steht' },
      { symbol: 'essen', titel: 'Zum Essen', text: 'unzerkaut mit einem Glas Wasser' },
    ],
    einnahme: [
      'Retardtabletten wirken länger und werden nur ein- bis zweimal am Tag genommen.',
      'Als Gel auf der Haut gelangt nur wenig Wirkstoff ins Blut. Das ist deutlich besser verträglich.',
    ],
    nebenwirkungen: [
      { symbol: 'magen', name: 'Magenbeschwerden', text: 'Sodbrennen, Magendruck, Übelkeit. Auf Dauer drohen Geschwüre.' },
      { symbol: 'blutdruck', name: 'Blutdruck steigt', text: 'Der Körper hält Wasser zurück, die Knöchel können anschwellen.' },
      { symbol: 'niere', name: 'Nieren leiden', text: 'Vor allem bei wenig Trinken, im Alter und mit Blutdruckmitteln.' },
      { symbol: 'puls', name: 'Herz und Gefäße', text: 'Bei längerer Einnahme steigt das Risiko für Herzinfarkt und Schlaganfall.' },
    ],
    achtung: [
      'Nicht bei Herzkrankheiten, nach Schlaganfall, bei Nierenschwäche oder mit Blutverdünnern – außer wir haben es besprochen.',
      'Nicht mit anderen Schmerzmitteln derselben Gruppe mischen, etwa Ibuprofen oder Naproxen.',
      'In den letzten drei Monaten der Schwangerschaft verboten.',
    ],
    warnung: MAGENBLUTUNG,
  },
  {
    id: 'metamizol',
    name: 'Metamizol',
    zusatz: 'Starkes Schmerzmittel (Novaminsulfon)',
    gebiet: 'schmerz',
    handelsnamen: ['Novalgin', 'Novaminsulfon-ratiopharm', 'Novaminsulfon Lichtenstein', 'Berlosin'],
    form: 'Tropfen oder Tablette',
    suche: 'novaminsulfon novalgin schmerzmittel kolik fieber tropfen',
    wofuer: [
      'Metamizol lindert starke Schmerzen und senkt hohes Fieber.',
      'Es löst zusätzlich Krämpfe, etwa bei Koliken von Galle, Niere oder Darm.',
      'Es schont Magen und Nieren mehr als Ibuprofen oder Diclofenac.',
    ],
    merker: [
      { symbol: 'mehrmals', titel: 'Bis zu viermal täglich', text: 'mit mindestens sechs Stunden Abstand' },
      { symbol: 'essen', titel: 'Mit oder ohne Essen', text: 'Tropfen in etwas Wasser' },
    ],
    einnahme: [
      'Die Wirkung setzt nach 30 bis 60 Minuten ein und hält etwa vier Stunden.',
      'Halten Sie sich an die Zahl der Tropfen oder Tabletten, die auf Ihrem Plan steht.',
      'Der Urin kann sich rötlich färben. Das ist harmlos.',
    ],
    nebenwirkungen: [
      { symbol: 'blutdruck', name: 'Blutdruckabfall', text: 'Schwindel und Schwäche, vor allem bei Fieber oder wenig Trinken.' },
      { symbol: 'haut', name: 'Hautausschlag', text: 'Zeichen einer Allergie. Nicht weiternehmen und melden.' },
      { symbol: 'fieber', name: 'Mangel an Abwehrzellen', text: 'Sehr selten, aber gefährlich. Die Warnzeichen stehen auf der nächsten Seite.' },
    ],
    achtung: [
      'Sehr selten zerstört Metamizol die weißen Blutkörperchen. Das kann auch noch Tage nach der letzten Einnahme auftreten.',
      'Bei Verdacht machen wir sofort ein Blutbild. Gehen Sie damit nicht erst nach dem Wochenende zum Arzt.',
    ],
    warnung: 'Fieber, Schüttelfrost, Halsschmerzen oder wunde Stellen im Mund: Metamizol sofort absetzen und noch am selben Tag das Blutbild kontrollieren lassen.',
  },
  {
    id: 'paracetamol',
    name: 'Paracetamol',
    zusatz: 'Schmerz- und Fiebermittel',
    gebiet: 'schmerz',
    handelsnamen: ['ben-u-ron', 'Paracetamol-ratiopharm', 'Paracetamol AL', 'Paracetamol 1A Pharma'],
    form: 'Tablette',
    suche: 'schmerzmittel fieber kopfschmerz acetaminophen',
    wofuer: [
      'Paracetamol lindert leichte bis mäßige Schmerzen und senkt Fieber.',
      'Es wirkt nicht gegen Entzündungen, schont dafür Magen, Nieren und Herz.',
      'Es passt auch zu Blutverdünnern und ist in der Schwangerschaft das Mittel der ersten Wahl.',
    ],
    merker: [
      { symbol: 'mehrmals', titel: 'Bis zu viermal täglich', text: 'mit mindestens sechs Stunden Abstand' },
      { symbol: 'essen', titel: 'Mit oder ohne Essen', text: 'mit einem Glas Wasser' },
    ],
    einnahme: [
      'Erwachsene nehmen 500 bis 1000 mg pro Einnahme, höchstens 4000 mg am Tag.',
      'Bei geringem Körpergewicht, im hohen Alter und bei Leberkrankheiten gilt eine niedrigere Grenze.',
      'Ohne ärztlichen Rat nicht länger als drei bis vier Tage.',
    ],
    nebenwirkungen: [
      { symbol: 'labor', name: 'Leberschaden bei Überdosis', text: 'Die Grenze zur schädlichen Menge ist schmal. Nie mehr nehmen als empfohlen.' },
      { symbol: 'haut', name: 'Hautausschlag', text: 'Selten, als Zeichen einer Allergie.' },
    ],
    achtung: [
      'In richtiger Dosis ist Paracetamol sehr gut verträglich.',
      'Viele Erkältungs- und Kombinationsmittel enthalten ebenfalls Paracetamol. Zählen Sie alles zusammen.',
      'Kein Alkohol dazu – beides belastet die Leber.',
    ],
    warnung: 'Zu viel genommen? Sofort in die Notaufnahme, auch wenn Sie sich gut fühlen. Die Leber schmerzt erst nach Tagen.',
  },
  {
    id: 'tilidin',
    name: 'Tilidin mit Naloxon',
    zusatz: 'Starkes Schmerzmittel (Opioid)',
    gebiet: 'schmerz',
    handelsnamen: ['Valoron N retard', 'Tilidin-ratiopharm plus', 'Tilidin AL comp', 'Tilidin comp Stada'],
    form: 'Retardtablette',
    suche: 'opioid opiat schmerzmittel tramadol oxycodon tapentadol palexia btm retard',
    wofuer: [
      'Tilidin dämpft die Weiterleitung von Schmerzen in Rückenmark und Gehirn.',
      'Sie bekommen es bei starken Schmerzen, wenn einfache Schmerzmittel nicht reichen.',
      'Das beigemischte Naloxon soll einen Missbrauch verhindern. Auf die Schmerzwirkung hat es keinen Einfluss.',
    ],
    merker: [
      { symbol: 'mehrmals', titel: 'Zweimal täglich', text: 'morgens und abends, im Abstand von zwölf Stunden' },
      { symbol: 'tablette', titel: 'Unzerkaut schlucken', text: 'nicht teilen, nicht zermörsern' },
    ],
    einnahme: [
      'Nehmen Sie die Retardtablette nach der Uhr, nicht erst wenn der Schmerz stark ist. So bleibt der Spiegel gleichmäßig.',
      'Zerkaut gibt die Tablette den ganzen Wirkstoff auf einmal frei – das ist gefährlich.',
      'Wir legen ein Ziel und einen Zeitraum fest und prüfen regelmäßig, ob Sie es noch brauchen.',
    ],
    nebenwirkungen: [
      { symbol: 'uebelkeit', name: 'Übelkeit', text: 'Häufig in der ersten Woche, lässt dann nach.' },
      { symbol: 'schwindel', name: 'Schwindel und Benommenheit', text: 'Vor allem zu Beginn. Vorsicht beim Aufstehen – Sturzgefahr.' },
      { symbol: 'muede', name: 'Müdigkeit', text: 'Konzentration und Reaktion sind langsamer.' },
      { symbol: 'darm', name: 'Verstopfung', text: 'Trinken Sie genug. Bei Bedarf gibt es ein Abführmittel dazu.' },
    ],
    achtung: [
      'Kein Alkohol, keine Schlaf- oder Beruhigungsmittel dazu. Zusammen können sie die Atmung lähmen.',
      'In den ersten Wochen und nach jeder Dosisänderung nicht Auto fahren.',
      'Der Körper gewöhnt sich daran. Nie plötzlich absetzen, wir verringern die Dosis schrittweise.',
    ],
    warnung: 'Starke Schläfrigkeit, flache oder langsame Atmung, nicht mehr richtig weckbar: Notruf 112.',
  },
  {
    id: 'prednisolon',
    name: 'Prednisolon',
    zusatz: 'Kortison',
    gebiet: 'schmerz',
    handelsnamen: ['Decortin H', 'Prednisolon-ratiopharm', 'Prednisolon Galen', 'Prednisolon Jenapharm'],
    form: 'Tablette',
    suche: 'kortison cortison glukokortikoid steroid prednison entzuendung rheuma asthma allergie polymyalgie',
    wofuer: [
      'Prednisolon ist dem körpereigenen Kortisol nachgebaut. Es bremst Entzündungen und überschießende Abwehrreaktionen sehr wirksam.',
      'Es hilft bei Asthma und COPD, die sich verschlechtern, bei Rheuma, schweren Allergien und vielen weiteren Entzündungen.',
      'Wenige Tage sind in der Regel unproblematisch. Auf lange Sicht zählt die kleinste Dosis, die wirkt.',
    ],
    merker: [
      { symbol: 'morgens', titel: 'Morgens bis 8 Uhr', text: 'die ganze Tagesdosis auf einmal' },
      { symbol: 'essen', titel: 'Zum oder nach dem Frühstück', text: 'mit einem Glas Wasser' },
    ],
    einnahme: [
      'Morgens bildet der Körper selbst am meisten Kortisol. Dann stört die Tablette den eigenen Rhythmus am wenigsten.',
      'Halten Sie sich genau an den Plan, vor allem wenn die Dosis schrittweise sinkt.',
    ],
    nebenwirkungen: [
      { symbol: 'abends', name: 'Unruhe und schlechter Schlaf', text: 'Auch Stimmungsschwankungen, vor allem bei höherer Dosis.' },
      { symbol: 'gewicht', name: 'Appetit und Gewicht', text: 'Mehr Hunger. Bei langer Einnahme Wasser im Gewebe und ein rundes Gesicht.' },
      { symbol: 'unterzucker', name: 'Blutzucker steigt', text: 'Bei Diabetes bitte öfter messen.' },
      { symbol: 'knochen', name: 'Knochen und Haut', text: 'Über Monate werden Knochen brüchiger und die Haut dünner.' },
    ],
    achtung: [
      'Nach mehr als zwei bis drei Wochen nie plötzlich absetzen. Die Nebenniere muss ihre eigene Produktion erst wieder aufnehmen.',
      'Schmerzmittel wie Ibuprofen oder Diclofenac zusammen mit Kortison greifen den Magen an.',
      'Bei langer Einnahme schützen wir die Knochen mit Vitamin D und kontrollieren Augen, Zucker und Blutdruck.',
    ],
    warnung: 'Fieber oder ein schwerer Infekt unter längerer Kortison-Einnahme: bitte am selben Tag melden und die Tabletten nicht weglassen.',
  },
];

export const LUNGE: Medikament[] = [
  {
    id: 'salbutamol',
    name: 'Salbutamol',
    zusatz: 'Notfallspray – erweitert die Bronchien',
    gebiet: 'lunge',
    handelsnamen: ['SalbuHexal', 'Sultanol', 'Salbutamol-ratiopharm', 'Ventolin'],
    form: 'Dosieraerosol',
    suche: 'asthma copd notfallspray bedarfsspray saba betamimetikum atemnot inhalator dosieraerosol',
    wofuer: [
      'Salbutamol entspannt die Muskeln um die Bronchien. Die Atemwege werden innerhalb weniger Minuten weiter.',
      'Es hilft bei akuter Atemnot, pfeifender Atmung und Engegefühl in der Brust.',
      'Die Wirkung hält etwa vier Stunden. Gegen die Entzündung der Bronchien wirkt es nicht.',
    ],
    merker: [
      { symbol: 'bedarf', titel: 'Nur bei Bedarf', text: 'ein bis zwei Hübe bei Atemnot' },
      { symbol: 'inhalieren', titel: 'Langsam und tief einatmen', text: 'dann zehn Sekunden die Luft anhalten' },
    ],
    einnahme: [
      'Schütteln, Kappe ab, ganz ausatmen. Mundstück fest mit den Lippen umschließen, beim Einatmen auslösen.',
      'Mit einer Inhalierhilfe (Spacer) kommt deutlich mehr Wirkstoff in der Lunge an.',
      'Tragen Sie das Spray immer bei sich und achten Sie auf das Zählwerk oder das Verfallsdatum.',
    ],
    nebenwirkungen: [
      { symbol: 'zittern', name: 'Zittern', text: 'Feines Zittern der Hände, vergeht nach kurzer Zeit.' },
      { symbol: 'herzklopfen', name: 'Herzklopfen', text: 'Schneller Puls und innere Unruhe.' },
      { symbol: 'kopfschmerz', name: 'Kopfschmerzen', text: 'Gelegentlich.' },
    ],
    achtung: [
      'Brauchen Sie das Spray öfter als zweimal pro Woche, ist das Asthma nicht gut eingestellt. Dann melden Sie sich bitte.',
      'Es ersetzt nicht das tägliche Spray mit Kortison.',
    ],
    warnung: 'Das Spray hilft nicht oder nur wenige Minuten, Sie können kaum sprechen, die Lippen werden blau: Notruf 112.',
  },
  {
    id: 'budesonid-formoterol',
    name: 'Budesonid mit Formoterol',
    zusatz: 'Dauerspray mit Kortison',
    gebiet: 'lunge',
    handelsnamen: ['Symbicort', 'DuoResp Spiromax', 'Bufori', 'Foster (Beclometason)'],
    form: 'Pulverinhalator',
    suche: 'asthma copd ics laba kortisonspray inhalator turbohaler foster beclometason viani',
    wofuer: [
      'Das Spray enthält zwei Wirkstoffe. Das Kortison beruhigt die Entzündung in den Bronchien, Formoterol hält sie zwölf Stunden weit.',
      'Regelmäßig genommen beugt es Anfällen vor und schützt vor Verschlechterungen.',
      'Das Kortison wirkt fast nur in der Lunge. Im übrigen Körper kommt sehr wenig an.',
    ],
    merker: [
      { symbol: 'mehrmals', titel: 'Jeden Tag, morgens und abends', text: 'auch wenn es Ihnen gut geht' },
      { symbol: 'wasser', titel: 'Danach den Mund ausspülen', text: 'oder Zähne putzen oder etwas essen' },
    ],
    einnahme: [
      'Beim Pulverinhalator zuerst ausatmen, dann kräftig und tief einatmen und zehn Sekunden die Luft anhalten.',
      'Das Kortison braucht ein bis zwei Wochen, bis es voll wirkt.',
      'Zeigen Sie uns einmal im Jahr, wie Sie inhalieren. Kleine Fehler schleichen sich leicht ein.',
    ],
    nebenwirkungen: [
      { symbol: 'stimme', name: 'Heiserkeit', text: 'Belegte, raue Stimme. Mundspülen beugt vor.' },
      { symbol: 'keim', name: 'Pilz im Mund', text: 'Weißer Belag auf Zunge und Wangen. Gut behandelbar.' },
      { symbol: 'zittern', name: 'Zittern und Herzklopfen', text: 'Gelegentlich, vor allem zu Beginn.' },
    ],
    achtung: [
      'Setzen Sie das Spray nicht ab, wenn es Ihnen besser geht. Die Entzündung kommt sonst zurück.',
      'Manche nehmen dasselbe Spray auch bei Bedarf. Ob das für Sie gilt, steht auf Ihrem Plan.',
    ],
    warnung: 'Zunehmende Atemnot, obwohl Sie mehr sprühen, oder nächtliches Aufwachen mit Luftnot: bitte am selben Tag melden.',
  },
  {
    id: 'tiotropium',
    name: 'Tiotropium',
    zusatz: 'Dauerspray – hält die Bronchien weit',
    gebiet: 'lunge',
    handelsnamen: ['Spiriva', 'Spiriva Respimat', 'Braltus', 'Spiolto (mit Olodaterol)'],
    form: 'Inhalator',
    suche: 'copd lama anticholinergikum respimat handihaler inhalator spiolto',
    wofuer: [
      'Tiotropium entspannt die Muskeln um die Bronchien und hält die Atemwege einen ganzen Tag lang weit.',
      'Bei COPD bekommen Sie damit besser Luft und sind belastbarer. Es gibt weniger Verschlechterungen.',
      'Es wirkt langsam und ist kein Notfallspray.',
    ],
    merker: [
      { symbol: 'uhr', titel: 'Einmal täglich', text: 'immer zur gleichen Zeit' },
      { symbol: 'inhalieren', titel: 'Langsam und tief einatmen', text: 'dann zehn Sekunden die Luft anhalten' },
    ],
    einnahme: [
      'Beim Respimat sind es zwei Hübe direkt nacheinander, beim Pulverinhalator eine Kapsel.',
      'Die Kapseln sind nur zum Inhalieren da – nicht schlucken.',
      'Zeigen Sie uns einmal im Jahr, wie Sie inhalieren.',
    ],
    nebenwirkungen: [
      { symbol: 'wasser', name: 'Trockener Mund', text: 'Häufigste Nebenwirkung. Trinken und zuckerfreie Bonbons helfen.' },
      { symbol: 'darm', name: 'Verstopfung', text: 'Gelegentlich.' },
      { symbol: 'wasserlassen', name: 'Erschwertes Wasserlassen', text: 'Vor allem bei Männern mit vergrößerter Prostata.' },
    ],
    achtung: [
      'Das Spray oder Pulver darf nicht in die Augen gelangen. Bei grünem Star kann der Augendruck steigen.',
      'Für akute Atemnot brauchen Sie zusätzlich Ihr Notfallspray.',
    ],
    warnung: 'Augenschmerzen, verschwommenes Sehen mit farbigen Ringen oder gar kein Wasserlassen mehr: sofort ärztliche Hilfe holen.',
  },
];

export const INFEKT: Medikament[] = [
  {
    id: 'amoxicillin',
    name: 'Amoxicillin',
    zusatz: 'Antibiotikum (Penicillin)',
    gebiet: 'infekt',
    handelsnamen: ['Amoxi 1A Pharma', 'Amoxicillin-ratiopharm', 'AmoxiHexal', 'Amoxicillin AL'],
    form: 'Filmtablette',
    suche: 'antibiotikum penicillin amoxiclav clavulansaeure augmentan mandelentzuendung lungenentzuendung',
    wofuer: [
      'Amoxicillin tötet Bakterien ab, indem es den Aufbau ihrer Zellwand stört.',
      'Sie bekommen es bei bakteriellen Infektionen, etwa an Lunge, Mandeln, Ohren oder Nebenhöhlen.',
      'Gegen Viren – also gegen Erkältung und Grippe – wirkt es nicht.',
    ],
    merker: [
      { symbol: 'mehrmals', titel: 'Dreimal täglich', text: 'etwa alle acht Stunden' },
      { symbol: 'essen', titel: 'Mit oder ohne Essen', text: 'zu Beginn einer Mahlzeit ist es besser verträglich' },
    ],
    einnahme: [
      'Nehmen Sie es so viele Tage, wie verordnet – nicht kürzer und nicht länger.',
      'Vergessen? Gleich nachholen und die übrigen Einnahmen des Tages gleichmäßig verteilen.',
      'Nach zwei bis drei Tagen sollte es Ihnen besser gehen. Sonst bitte melden.',
    ],
    nebenwirkungen: [
      { symbol: 'durchfall', name: 'Durchfall', text: 'Weicher Stuhl ist häufig, weil auch Darmbakterien getroffen werden.' },
      { symbol: 'uebelkeit', name: 'Übelkeit', text: 'Zum Essen genommen meist besser.' },
      { symbol: 'haut', name: 'Hautausschlag', text: 'Kann eine Allergie sein. Nicht weiternehmen und melden.' },
      { symbol: 'keim', name: 'Pilzinfektion', text: 'Im Mund oder in der Scheide, gut behandelbar.' },
    ],
    achtung: [
      'Sagen Sie uns, wenn Sie schon einmal auf Penicillin reagiert haben.',
      'Bei Erbrechen oder Durchfall wirkt die Pille unsicherer. Verhüten Sie bis zur nächsten Blutung zusätzlich.',
      'Reste nicht aufheben und nicht an andere weitergeben.',
    ],
    warnung: ALLERGIE,
  },
  {
    id: 'cefuroxim',
    name: 'Cefuroxim',
    zusatz: 'Antibiotikum (Cephalosporin)',
    gebiet: 'infekt',
    handelsnamen: ['Elobact', 'Cefuroxim-ratiopharm', 'CefuHexal', 'Cefurax', 'Cefuroxim Heumann'],
    form: 'Filmtablette',
    suche: 'antibiotikum cephalosporin cefuroximaxetil harnwegsinfekt atemwege haut',
    wofuer: [
      'Cefuroxim tötet Bakterien ab, indem es den Aufbau ihrer Zellwand stört.',
      'Sie bekommen es bei bakteriellen Infektionen der Atemwege, der Haut oder der Harnwege.',
      'Gegen Viren – also gegen Erkältung und Grippe – wirkt es nicht.',
    ],
    merker: [
      { symbol: 'mehrmals', titel: 'Zweimal täglich', text: 'morgens und abends' },
      { symbol: 'essen', titel: 'Direkt nach dem Essen', text: 'nur so wird genug Wirkstoff aufgenommen' },
    ],
    einnahme: [
      'Schlucken Sie die Tablette unzerkaut. Sie schmeckt sehr bitter.',
      'Nehmen Sie es so viele Tage, wie verordnet – nicht kürzer und nicht länger.',
      'Nach zwei bis drei Tagen sollte es Ihnen besser gehen. Sonst bitte melden.',
    ],
    nebenwirkungen: [
      { symbol: 'durchfall', name: 'Durchfall', text: 'Weicher Stuhl ist häufig, weil auch Darmbakterien getroffen werden.' },
      { symbol: 'uebelkeit', name: 'Übelkeit', text: 'Auch Bauchschmerzen, gelegentlich.' },
      { symbol: 'haut', name: 'Hautausschlag', text: 'Kann eine Allergie sein. Nicht weiternehmen und melden.' },
      { symbol: 'keim', name: 'Pilzinfektion', text: 'Im Mund oder in der Scheide, gut behandelbar.' },
    ],
    achtung: [
      'Sagen Sie uns, wenn Sie schon einmal auf Penicillin oder ein anderes Antibiotikum reagiert haben.',
      'Magenmittel gegen Säure mindern die Aufnahme. Sprechen Sie uns an, wenn Sie welche nehmen.',
    ],
    warnung: ALLERGIE,
  },
  {
    id: 'fosfomycin',
    name: 'Fosfomycin',
    zusatz: 'Antibiotikum für die Blase – einmalig',
    gebiet: 'infekt',
    handelsnamen: ['Monuril', 'Fosfomycin Aristo', 'Fosfuro', 'Fosfomycin AL'],
    form: 'Granulat im Beutel',
    suche: 'antibiotikum blasenentzuendung harnwegsinfekt zystitis hwi pivmecillinam nitrofurantoin',
    wofuer: [
      'Fosfomycin tötet die Bakterien ab, die eine Blasenentzündung auslösen.',
      'Es sammelt sich im Urin und wirkt dort zwei bis drei Tage lang. Deshalb genügt ein einziger Beutel.',
    ],
    merker: [
      { symbol: 'abends', titel: 'Einmalig, abends vor dem Schlafen', text: 'nachdem Sie die Blase entleert haben' },
      { symbol: 'nuechtern', titel: 'Zwei Stunden nach dem Essen', text: 'in einem Glas Wasser auflösen und gleich trinken' },
    ],
    einnahme: [
      'So bleibt der Wirkstoff über Nacht lange in der Blase.',
      'Trinken Sie an den folgenden Tagen reichlich.',
      'Die Beschwerden lassen nach zwei bis drei Tagen nach, nicht sofort.',
    ],
    nebenwirkungen: [
      { symbol: 'durchfall', name: 'Durchfall', text: 'Häufig, meist nur für einen Tag.' },
      { symbol: 'uebelkeit', name: 'Übelkeit', text: 'Gelegentlich, auch Bauchgrummeln.' },
      { symbol: 'kopfschmerz', name: 'Kopfschmerzen', text: 'Gelegentlich, auch Schwindel.' },
    ],
    achtung: [
      'Kommen die Beschwerden nach drei Tagen nicht zur Ruhe oder kehren sie bald wieder, untersuchen wir den Urin genauer.',
      'Mittel gegen Übelkeit mit Metoclopramid schwächen die Wirkung.',
    ],
    warnung: 'Fieber, Schüttelfrost oder Schmerzen in der Flanke: bitte am selben Tag melden – dann ist die Niere beteiligt.',
  },
];

export const SEELE: Medikament[] = [
  {
    id: 'sertralin',
    name: 'Sertralin',
    zusatz: 'Antidepressivum (SSRI)',
    gebiet: 'seele',
    handelsnamen: ['Zoloft', 'Sertralin-ratiopharm', 'Sertralin 1A Pharma', 'Sertralin Aurobindo'],
    form: 'Filmtablette',
    suche: 'ssri antidepressivum depression angst panik zwang serotonin',
    wofuer: [
      'Sertralin erhöht die Wirkung des Botenstoffs Serotonin im Gehirn.',
      'Stimmung und Antrieb bessern sich, Ängste und Grübeln lassen nach.',
      'Es macht nicht abhängig und verändert nicht die Persönlichkeit.',
    ],
    merker: [
      { symbol: 'morgens', titel: 'Einmal täglich morgens' },
      { symbol: 'essen', titel: 'Mit oder ohne Essen', text: 'mit einem Glas Wasser' },
    ],
    einnahme: [
      'Die Wirkung kommt langsam, nach zwei bis vier Wochen. Die Nebenwirkungen kommen früher und gehen meist wieder.',
      'Bitte halten Sie die ersten Wochen durch und melden Sie sich, wenn es schwerfällt.',
      'Nach der Besserung nehmen Sie es noch mindestens sechs Monate weiter. Das schützt vor einem Rückfall.',
    ],
    nebenwirkungen: [
      { symbol: 'uebelkeit', name: 'Übelkeit', text: 'In den ersten ein bis zwei Wochen, auch weicher Stuhl.' },
      { symbol: 'zittern', name: 'Innere Unruhe', text: 'Nervosität und schlechter Schlaf zu Beginn.' },
      { symbol: 'schwitzen', name: 'Schwitzen', text: 'Vor allem nachts.' },
      { symbol: 'puls', name: 'Weniger Lust', text: 'Die Sexualität kann gedämpft sein. Sprechen Sie es ruhig an.' },
    ],
    achtung: [
      'Nie plötzlich absetzen, sonst drohen Schwindel, Unruhe und Stromschlag-Gefühle. Wir schleichen es über Wochen aus.',
      'Kein Johanniskraut dazu. Schmerzmittel wie Ibuprofen erhöhen zusammen das Blutungsrisiko.',
      'Alkohol möglichst meiden.',
    ],
    warnung: 'Gedanken, sich etwas anzutun, oder starke Unruhe in den ersten Wochen: bitte sofort melden – bei uns, beim ärztlichen Notdienst 116 117 oder unter 112.',
  },
  {
    id: 'citalopram',
    name: 'Citalopram',
    zusatz: 'Antidepressivum (SSRI) – wie Escitalopram',
    gebiet: 'seele',
    handelsnamen: ['Cipramil', 'Citalopram-ratiopharm', 'Citalopram AL', 'Cipralex (Escitalopram)'],
    form: 'Filmtablette',
    suche: 'ssri antidepressivum depression angst panik escitalopram cipralex serotonin',
    wofuer: [
      'Citalopram erhöht die Wirkung des Botenstoffs Serotonin im Gehirn.',
      'Stimmung und Antrieb bessern sich, Ängste und Grübeln lassen nach.',
      'Es macht nicht abhängig und verändert nicht die Persönlichkeit.',
    ],
    merker: [
      { symbol: 'morgens', titel: 'Einmal täglich morgens' },
      { symbol: 'essen', titel: 'Mit oder ohne Essen', text: 'mit einem Glas Wasser' },
    ],
    einnahme: [
      'Die Wirkung kommt langsam, nach zwei bis vier Wochen. Die Nebenwirkungen kommen früher und gehen meist wieder.',
      'Bitte halten Sie die ersten Wochen durch und melden Sie sich, wenn es schwerfällt.',
      'Nach der Besserung nehmen Sie es noch mindestens sechs Monate weiter. Das schützt vor einem Rückfall.',
    ],
    nebenwirkungen: [
      { symbol: 'uebelkeit', name: 'Übelkeit', text: 'In den ersten ein bis zwei Wochen.' },
      { symbol: 'zittern', name: 'Innere Unruhe', text: 'Nervosität und schlechter Schlaf zu Beginn.' },
      { symbol: 'schwitzen', name: 'Schwitzen', text: 'Vor allem nachts, auch ein trockener Mund.' },
      { symbol: 'puls', name: 'Weniger Lust', text: 'Die Sexualität kann gedämpft sein. Sprechen Sie es ruhig an.' },
    ],
    achtung: [
      'Citalopram kann den Herzrhythmus beeinflussen. Vor Beginn und bei höherer Dosis schreiben wir ein EKG.',
      'Nie plötzlich absetzen. Wir schleichen es über Wochen aus.',
      'Kein Johanniskraut dazu. Schmerzmittel wie Ibuprofen erhöhen zusammen das Blutungsrisiko.',
    ],
    warnung: 'Gedanken, sich etwas anzutun, starke Unruhe, Herzrasen oder Ohnmacht: bitte sofort melden – bei uns, beim ärztlichen Notdienst 116 117 oder unter 112.',
  },
  {
    id: 'mirtazapin',
    name: 'Mirtazapin',
    zusatz: 'Antidepressivum, das den Schlaf fördert',
    gebiet: 'seele',
    handelsnamen: ['Remergil', 'Mirtazapin-ratiopharm', 'Mirtazapin Stada', 'Mirtazapin AL'],
    form: 'Filmtablette oder Schmelztablette',
    suche: 'antidepressivum depression schlafstoerung schlaf appetit',
    wofuer: [
      'Mirtazapin verstärkt die Botenstoffe Serotonin und Noradrenalin im Gehirn.',
      'Es hebt die Stimmung und hilft vom ersten Abend an beim Ein- und Durchschlafen.',
      'Es macht nicht abhängig.',
    ],
    merker: [
      { symbol: 'bett', titel: 'Einmal täglich abends', text: 'kurz vor dem Schlafengehen' },
      { symbol: 'essen', titel: 'Mit oder ohne Essen', text: 'Schmelztabletten auf der Zunge zergehen lassen' },
    ],
    einnahme: [
      'Der Schlaf bessert sich sofort, die Stimmung nach zwei bis vier Wochen.',
      'Nach der Besserung nehmen Sie es noch mindestens sechs Monate weiter. Das schützt vor einem Rückfall.',
    ],
    nebenwirkungen: [
      { symbol: 'muede', name: 'Müdigkeit am Morgen', text: 'Vor allem in den ersten Tagen. Bessert sich meist.' },
      { symbol: 'gewicht', name: 'Appetit und Gewicht', text: 'Mehr Hunger, vor allem auf Süßes. Viele nehmen einige Kilo zu.' },
      { symbol: 'wasser', name: 'Trockener Mund', text: 'Häufig.' },
      { symbol: 'schwindel', name: 'Schwindel', text: 'Beim Aufstehen, vor allem nachts. Vorsicht beim Gang zur Toilette.' },
    ],
    achtung: [
      'Kein Alkohol dazu – er verstärkt die Müdigkeit.',
      'In den ersten Tagen nicht Auto fahren, bis Sie wissen, wie Sie reagieren.',
      'Nie plötzlich absetzen. Wir schleichen es aus.',
    ],
    warnung: 'Fieber, Halsschmerzen und wunde Stellen im Mund (sehr selten fehlen Abwehrzellen) oder Gedanken, sich etwas anzutun: bitte sofort melden.',
  },
  {
    id: 'zopiclon',
    name: 'Zopiclon',
    zusatz: 'Schlafmittel',
    gebiet: 'seele',
    handelsnamen: ['Ximovan', 'Zopiclon-ratiopharm', 'Zopiclon AL', 'Zopiclon Stada', 'Zolpidem (Stilnox)'],
    form: 'Filmtablette',
    suche: 'schlafmittel schlaftablette hypnotikum z substanz zolpidem stilnox benzodiazepin schlafstoerung',
    wofuer: [
      'Zopiclon dämpft die Wachzentren im Gehirn. Sie schlafen schneller ein und wachen seltener auf.',
      'Es ist eine Hilfe für kurze Zeit, etwa in einer Krise – höchstens zwei bis vier Wochen.',
      'Die Ursache der Schlafstörung behandelt es nicht.',
    ],
    merker: [
      { symbol: 'bett', titel: 'Direkt vor dem Schlafengehen', text: 'erst wenn Sie im Bett sind' },
      { symbol: 'uhr', titel: 'Nur mit sieben Stunden Zeit', text: 'nicht mitten in der Nacht nachnehmen' },
    ],
    einnahme: [
      'Am besten nicht jede Nacht, sondern nur wenn es nötig ist.',
      'Nehmen Sie die kleinste Menge, die hilft. Oft reicht eine halbe Tablette.',
    ],
    nebenwirkungen: [
      { symbol: 'essen', name: 'Bitterer Geschmack', text: 'Sehr häufig, auch noch am nächsten Morgen. Harmlos.' },
      { symbol: 'muede', name: 'Benommenheit am Morgen', text: 'Konzentration und Reaktion sind langsamer.' },
      { symbol: 'sturz', name: 'Sturzgefahr', text: 'Nachts unsicherer Gang, besonders im Alter.' },
      { symbol: 'gewoehnung', name: 'Gewöhnung', text: 'Nach wenigen Wochen wirkt es schwächer, und ohne schlafen Sie schlechter.' },
    ],
    achtung: [
      'Kein Alkohol und keine anderen Beruhigungsmittel dazu.',
      'Am nächsten Morgen kann die Fahrtüchtigkeit noch eingeschränkt sein.',
      'Nach längerer Einnahme schrittweise absetzen. Die ersten Nächte ohne sind schlechter, das legt sich.',
    ],
  },
  {
    id: 'pregabalin',
    name: 'Pregabalin',
    zusatz: 'Mittel gegen Nervenschmerzen',
    gebiet: 'seele',
    handelsnamen: ['Lyrica', 'Pregabalin-ratiopharm', 'Pregabalin AL', 'Pregabador', 'Pregabin'],
    form: 'Hartkapsel',
    suche: 'nervenschmerz neuropathie polyneuropathie guertelrose angst gabapentin neurontin',
    wofuer: [
      'Pregabalin beruhigt überaktive Nerven. Brennen, Kribbeln und einschießende Schmerzen lassen nach.',
      'Es hilft bei Nervenschmerzen, etwa durch Diabetes oder nach einer Gürtelrose, und bei Angststörungen.',
      'Gegen gewöhnliche Schmerzen an Gelenken oder Muskeln wirkt es nicht.',
    ],
    merker: [
      { symbol: 'mehrmals', titel: 'Zweimal täglich', text: 'morgens und abends' },
      { symbol: 'essen', titel: 'Mit oder ohne Essen', text: 'die Kapsel im Ganzen mit Wasser' },
    ],
    einnahme: [
      'Wir beginnen mit einer kleinen Dosis am Abend und steigern über Wochen.',
      'Die Wirkung zeigt sich nach ein bis zwei Wochen.',
    ],
    nebenwirkungen: [
      { symbol: 'schwindel', name: 'Schwindel', text: 'Häufig zu Beginn und nach jeder Steigerung. Sturzgefahr.' },
      { symbol: 'muede', name: 'Müdigkeit', text: 'Benommenheit und Konzentrationsschwäche.' },
      { symbol: 'gewicht', name: 'Gewichtszunahme', text: 'Durch mehr Appetit.' },
      { symbol: 'bein', name: 'Geschwollene Beine', text: 'Wasser in Knöcheln und Unterschenkeln.' },
    ],
    achtung: [
      'Kein Alkohol dazu. Zusammen mit starken Schmerzmitteln oder Beruhigungsmitteln kann die Atmung flacher werden.',
      'Nicht Auto fahren, solange Sie schwindlig oder müde sind.',
      'Pregabalin kann abhängig machen. Nie plötzlich absetzen, wir schleichen es aus.',
    ],
    warnung: 'Verschwommenes Sehen, starke Benommenheit oder flache Atmung: bitte am selben Tag melden, im Zweifel 112.',
  },
];

export const WEITERE: Medikament[] = [
  {
    id: 'tamsulosin',
    name: 'Tamsulosin',
    zusatz: 'Prostatamittel',
    gebiet: 'weitere',
    handelsnamen: ['Alna Ocas', 'Omnic Ocas', 'Tamsulosin-ratiopharm', 'Tamsulosin Basics', 'Tadin'],
    form: 'Retardkapsel',
    suche: 'prostata bph alphablocker wasserlassen harnstrahl prostatavergroesserung',
    wofuer: [
      'Tamsulosin entspannt die Muskeln an Prostata und Blasenausgang.',
      'Der Urin fließt leichter, der Strahl wird kräftiger, und Sie müssen nachts seltener aufstehen.',
      'Die Prostata wird dadurch nicht kleiner. Die Wirkung hält, solange Sie es nehmen.',
    ],
    merker: [
      { symbol: 'morgens', titel: 'Einmal täglich', text: 'immer nach derselben Mahlzeit' },
      { symbol: 'essen', titel: 'Nach dem Frühstück', text: 'die Kapsel im Ganzen mit Wasser' },
    ],
    einnahme: [
      'Die Wirkung spüren Sie nach wenigen Tagen, voll nach zwei bis vier Wochen.',
      'Nicht zerkauen oder öffnen – die Kapsel gibt den Wirkstoff langsam ab.',
    ],
    nebenwirkungen: [
      { symbol: 'schwindel', name: 'Schwindel beim Aufstehen', text: 'Stehen Sie langsam auf, besonders nachts und zu Beginn.' },
      { symbol: 'wasserlassen', name: 'Weniger Samenerguss', text: 'Der Samen gelangt in die Blase. Das ist harmlos und geht nach dem Absetzen zurück.' },
      { symbol: 'kopfschmerz', name: 'Kopfschmerzen', text: 'Gelegentlich, auch eine verstopfte Nase.' },
    ],
    achtung: [
      'Sagen Sie dem Augenarzt vor einer Operation am grauen Star, dass Sie Tamsulosin nehmen oder genommen haben.',
      'Zusammen mit Blutdruckmitteln oder Potenzmitteln kann der Blutdruck stärker abfallen.',
    ],
    warnung: 'Sie können gar kein Wasser mehr lassen, haben Fieber oder Blut im Urin: bitte sofort ärztlich melden.',
  },
  {
    id: 'eisen',
    name: 'Eisentabletten',
    zusatz: 'Eisen(II)-Präparat',
    gebiet: 'weitere',
    handelsnamen: ['ferro sanol duodenal', 'Eisentabletten-ratiopharm', 'Ferrum Hausmann', 'Tardyferon'],
    form: 'Kapsel',
    suche: 'eisenmangel anaemie blutarmut ferritin eisensulfat eisenglycinsulfat haemoglobin',
    wofuer: [
      'Eisen ist der Baustein des roten Blutfarbstoffs, der den Sauerstoff transportiert.',
      'Die Tabletten füllen die leeren Eisenspeicher wieder auf. Müdigkeit, Blässe und Luftnot bessern sich.',
      'Das dauert: Die Behandlung läuft meist über drei bis sechs Monate.',
    ],
    merker: [
      { symbol: 'morgens', titel: 'Einmal täglich oder jeden zweiten Tag', text: 'jeden zweiten Tag ist oft besser verträglich' },
      { symbol: 'nuechtern', titel: 'Nüchtern, 30 bis 60 Minuten vor dem Essen', text: 'mit Wasser oder einem Glas Orangensaft' },
    ],
    einnahme: [
      'Vitamin C verbessert die Aufnahme. Kaffee, schwarzer Tee, Milch und Vollkorn hemmen sie.',
      'Wenn der Magen es nüchtern nicht verträgt, nehmen Sie es zum Essen. Das ist besser als gar nicht.',
    ],
    nebenwirkungen: [
      { symbol: 'durchfall', name: 'Schwarzer Stuhl', text: 'Kommt bei allen vor und ist harmlos.' },
      { symbol: 'magen', name: 'Magendruck und Übelkeit', text: 'Häufig. Dann zum Essen nehmen oder das Präparat wechseln.' },
      { symbol: 'darm', name: 'Verstopfung', text: 'Oder Durchfall. Trinken Sie reichlich.' },
    ],
    achtung: [
      'Halten Sie zwei bis vier Stunden Abstand zu L-Thyroxin, manchen Antibiotika und Magenmitteln.',
      'Bewahren Sie die Tabletten kindersicher auf. Für kleine Kinder sind schon wenige gefährlich.',
      'Nach acht bis zwölf Wochen kontrollieren wir die Blutwerte.',
    ],
  },
];
