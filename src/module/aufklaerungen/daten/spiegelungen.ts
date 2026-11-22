import type { Krankheit } from './typen';

// Spiegelungen (Endoskopie): Magen, Darm, Lunge. Wie die übrigen Untersuchungen mit frei
// benannten Seiten: Was ist das, wozu, Vorbereitung, Ablauf, Proben, danach.
// Die Darmkrebs-Früherkennung selbst steht unter `darmkrebsvorsorge` (untersuchungen.ts);
// hier geht es um die Spiegelung als Untersuchung, egal aus welchem Grund.
// Zeiten zum Nüchternsein sind die üblichen; die Praxis oder Klinik, die spiegelt, gibt
// eigene Merkblätter mit – deren Angaben gelten.

export const SPIEGELUNGEN: Krankheit[] = [
  {
    id: 'magenspiegelung',
    name: 'Magenspiegelung',
    zusatz: 'Gastroskopie',
    gebiet: 'untersuchungen',
    suche:
      'magenspiegelung gastroskopie oegd oesophagogastroduodenoskopie endoskopie endoskop spiegelung magen speiseroehre zwoelffingerdarm duodenum schlauch schlucken schlafspritze propofol rachenspray gewebeprobe biopsie helicobacter nuechtern',
    seiten: [
      {
        id: 'was',
        titel: 'Was ist eine Magenspiegelung?',
        kurz: 'Was ist das',
        saetze: [
          'Ein dünner, biegsamer Schlauch mit einer kleinen Kamera an der Spitze wird über den Mund in die Speiseröhre, den Magen und den Zwölffingerdarm geschoben.',
          'Die Ärztin oder der Arzt sieht die Schleimhaut direkt auf dem Bildschirm, in Farbe und stark vergrößert.',
          'Über den Schlauch lassen sich auch winzige Gewebeproben nehmen, Blutungen stillen oder kleine Wucherungen entfernen.',
          'Die Untersuchung selbst dauert meist nur fünf bis zehn Minuten.',
        ],
      },
      {
        id: 'gruende',
        titel: 'Wann sie sinnvoll ist',
        kurz: 'Gründe',
        saetze: [
          'Bei Oberbauchschmerzen oder Sodbrennen, die trotz Behandlung über Wochen bleiben.',
          'Bei Beschwerden beim Schlucken, häufigem Erbrechen oder wenn man ohne Grund abnimmt.',
          'Bei Blutarmut durch Eisenmangel, schwarzem Stuhl oder Blut im Erbrochenen – dann oft sehr bald.',
          'Zur Kontrolle bekannter Befunde, etwa eines Magengeschwürs oder einer veränderten Schleimhaut in der Speiseröhre.',
        ],
      },
      {
        id: 'vorbereitung',
        titel: 'Vor der Untersuchung',
        kurz: 'Vorbereitung',
        bild: 'spiegelung-nuechtern',
        saetze: [
          'Der Magen muss leer sein. Bitte sechs Stunden vorher nichts mehr essen, nicht rauchen und kein Kaugummi kauen.',
          'Klares Wasser oder Tee ohne Milch dürfen Sie meist bis zwei Stunden vorher trinken. Ihre üblichen Tabletten nehmen Sie mit einem Schluck Wasser, wenn nichts anderes besprochen ist.',
          'Blutverdünner und Medikamente gegen Zucker besprechen Sie bitte vorher mit uns.',
          'Bekommen Sie eine Schlafspritze, brauchen Sie jemanden, der Sie abholt.',
        ],
      },
      {
        id: 'ablauf',
        titel: 'So läuft es ab',
        kurz: 'Ablauf',
        saetze: [
          'Sie liegen auf der linken Seite. Die meisten bekommen eine Schlafspritze in die Vene und schlafen die ganze Zeit. Ohne Schlafspritze wird der Rachen mit einem Spray betäubt.',
          'Ein Beißring zwischen den Zähnen schützt das Gerät. Der Schlauch wird über die Zunge geführt, und Sie schlucken ihn einmal – danach rutscht er von allein.',
          'Das Atmen geht ganz normal weiter, denn der Schlauch liegt in der Speiseröhre, nicht in der Luftröhre. Ein Fingerclip misst dabei den Sauerstoff.',
          'Etwas Luft entfaltet den Magen, damit man alles sieht. Das kann drücken und zum Aufstoßen führen – das ist harmlos.',
        ],
      },
      {
        id: 'proben',
        titel: 'Gewebeproben',
        kurz: 'Proben',
        bild: 'magenspiegelung-probe',
        saetze: [
          'Mit einer winzigen Zange durch den Schlauch werden kleine Stückchen Schleimhaut entnommen. Das spüren Sie nicht, denn die Schleimhaut hat keine Schmerznerven.',
          'Im Labor wird das Gewebe unter dem Mikroskop angesehen. So erkennt man Entzündungen, Veränderungen der Schleimhaut und das Magenbakterium Helicobacter.',
          'Das Ergebnis dauert einige Tage. Wir besprechen es mit Ihnen.',
          'Eine Probe heißt nicht, dass etwas Schlimmes vermutet wird. Sie gehört bei vielen Spiegelungen einfach dazu.',
        ],
      },
      {
        id: 'danach',
        titel: 'Nach der Untersuchung',
        kurz: 'Danach',
        bild: 'spiegelung-danach',
        saetze: [
          'Nach dem Rachenspray bitte erst essen und trinken, wenn das Gefühl im Hals zurück ist – meist nach ein bis zwei Stunden. Probieren Sie zuerst einen kleinen Schluck Wasser.',
          'Nach der Schlafspritze dürfen Sie bis zum nächsten Tag nicht Auto oder Rad fahren, keine Maschinen bedienen und nichts Wichtiges unterschreiben.',
          'Ein Kratzen im Hals und ein Blähgefühl sind normal und vergehen von selbst.',
          'Ernste Folgen wie eine Blutung oder eine Verletzung der Wand sind selten, etwas häufiger nach einer Behandlung während der Spiegelung.',
        ],
      },
    ],
    warnung:
      'Melden Sie sich sofort bei starken Schmerzen in Bauch, Brust oder Hals, bei Fieber, Luftnot, Bluterbrechen oder schwarzem Stuhl nach der Untersuchung.',
  },
  {
    id: 'darmspiegelung',
    name: 'Darmspiegelung',
    zusatz: 'Koloskopie',
    gebiet: 'untersuchungen',
    suche:
      'darmspiegelung koloskopie endoskopie endoskop spiegelung dickdarm enddarm blinddarm abfuehren abfuehrloesung abfuehrmittel darmreinigung vorbereitung klare fluessigkeit schlafspritze propofol polyp polypen polypektomie schlinge gewebeprobe biopsie blut im stuhl stuhltest positiv',
    seiten: [
      {
        id: 'was',
        titel: 'Was ist eine Darmspiegelung?',
        kurz: 'Was ist das',
        saetze: [
          'Ein dünner, biegsamer Schlauch mit Kamera wird durch den After in den Dickdarm geschoben – bis an dessen Anfang, wo der Dünndarm einmündet.',
          'Auf dem Rückweg wird die ganze Schleimhaut genau angesehen. Dabei können Polypen gleich entfernt und Gewebeproben genommen werden.',
          'Die Untersuchung dauert etwa 20 bis 30 Minuten. Die meisten bekommen eine Schlafspritze und merken davon nichts.',
          'Das Wichtigste für ein gutes Ergebnis ist die Vorbereitung: Nur in einem ganz sauberen Darm sieht man auch kleine Veränderungen.',
        ],
      },
      {
        id: 'gruende',
        titel: 'Wann sie sinnvoll ist',
        kurz: 'Gründe',
        saetze: [
          'Zur Darmkrebs-Vorsorge ab 50 Jahren und nach einem auffälligen Stuhltest.',
          'Bei Blut im Stuhl, bei einem Stuhlgang, der sich über Wochen verändert, oder bei Durchfall, der nicht aufhört.',
          'Bei Blutarmut ohne klaren Grund oder wenn man ungewollt abnimmt.',
          'Zur Kontrolle nach entfernten Polypen oder bei einer bekannten Darmentzündung wie Morbus Crohn oder Colitis ulcerosa.',
        ],
      },
      {
        id: 'vorbereitung',
        titel: 'Die Tage davor',
        kurz: 'Vorbereitung',
        bild: 'darmspiegelung-plan',
        saetze: [
          'Drei Tage vorher keine Körner, Kerne und kein Vollkorn mehr: kein Müsli, keine Leinsamen, keine Tomaten, Trauben oder Kiwis. Eisentabletten bitte schon eine Woche vorher weglassen.',
          'Am Tag davor gibt es morgens noch ein leichtes Frühstück, etwa Weißbrot oder Zwieback. Danach nur noch klare Flüssigkeit.',
          'Am Abend und am Morgen der Untersuchung trinken Sie je eine Portion Abführlösung, so wie auf Ihrem Merkblatt beschrieben.',
          'Blutverdünner, Medikamente gegen Zucker und die Pille besprechen Sie bitte vorher mit uns.',
        ],
      },
      {
        id: 'abfuehren',
        titel: 'Richtig abführen',
        kurz: 'Abführen',
        bild: 'darmspiegelung-sauber',
        saetze: [
          'Trinken Sie zur Abführlösung reichlich klare Flüssigkeit: Wasser, hellen Tee, klare Brühe oder Apfelsaft ohne Fruchtfleisch. Keine Milch und nichts Rotes.',
          'Gekühlt und mit Strohhalm schmeckt die Lösung weniger. Bleiben Sie in der Nähe einer Toilette.',
          'Der Darm ist sauber, wenn nur noch klare, gelbliche Flüssigkeit kommt – wie Urin. Ist sie noch trüb oder braun, trinken Sie weiter und sagen Bescheid.',
          'Bei Durchfall wirkt die Pille unsicher. Verhüten Sie bis zur nächsten Regel zusätzlich, zum Beispiel mit Kondom.',
        ],
      },
      {
        id: 'ablauf',
        titel: 'So läuft es ab',
        kurz: 'Ablauf',
        saetze: [
          'Sie liegen auf der linken Seite und bekommen meist eine Schlafspritze in die Vene. Ein Fingerclip misst dabei den Sauerstoff.',
          'Der Schlauch wird vorsichtig durch den After eingeführt. Etwas Luft oder Kohlendioxid entfaltet den Darm, damit man die Falten einsehen kann.',
          'Danach sind Blähungen normal. Lassen Sie die Luft ruhig abgehen; essen dürfen Sie gleich wieder.',
          'Nach der Schlafspritze dürfen Sie bis zum nächsten Tag nicht Auto fahren und nicht arbeiten. Bitte lassen Sie sich abholen.',
        ],
      },
      {
        id: 'polypen',
        titel: 'Polypen und Proben',
        kurz: 'Polypen',
        bild: 'darmspiegelung-schlinge',
        saetze: [
          'Polypen sind kleine Wucherungen der Schleimhaut. Sie werden gleich bei der Spiegelung mit einer feinen Drahtschlinge abgetragen. Das tut nicht weh.',
          'Aus manchen Polypen würde über Jahre Darmkrebs. Ist ein Polyp entfernt, kann aus ihm keiner mehr werden.',
          'Das Gewebe geht ins Labor. Danach richtet sich, wann die nächste Spiegelung nötig ist.',
          'Selten blutet es an der Stelle nach, auch noch bis zu zwei Wochen später. Eine Verletzung der Darmwand ist sehr selten.',
        ],
      },
    ],
    warnung:
      'Melden Sie sich sofort bei starken Bauchschmerzen, hartem, aufgeblähtem Bauch, Fieber oder mehr als nur etwas Blut aus dem After – auch noch bis zwei Wochen danach.',
  },
  {
    id: 'bronchoskopie',
    name: 'Lungenspiegelung',
    zusatz: 'Bronchoskopie',
    gebiet: 'untersuchungen',
    suche:
      'bronchoskopie lungenspiegelung endoskopie endoskop spiegelung lunge luftroehre bronchien trachea bronchoalveolaere lavage bal spuelung biopsie gewebeprobe ebus rundherd schatten blut im auswurf husten schlafspritze',
    seiten: [
      {
        id: 'was',
        titel: 'Was ist eine Lungenspiegelung?',
        kurz: 'Was ist das',
        saetze: [
          'Ein dünner, biegsamer Schlauch mit Kamera wird über die Nase oder den Mund in die Luftröhre und weiter in die Bronchien geschoben.',
          'So sieht man die Atemwege von innen, kann Schleim absaugen und Proben aus der Lunge nehmen.',
          'Der Schlauch ist dünner als ein Bleistift. Sie atmen an ihm vorbei weiter.',
          'Die Untersuchung dauert meist 15 bis 30 Minuten und wird in einer Lungenfacharztpraxis oder im Krankenhaus gemacht.',
        ],
      },
      {
        id: 'gruende',
        titel: 'Wann sie sinnvoll ist',
        kurz: 'Gründe',
        saetze: [
          'Wenn im Röntgen oder CT ein Schatten oder Knoten in der Lunge zu sehen ist, der geklärt werden muss.',
          'Bei Blut im Auswurf oder bei einem Husten, der über Wochen bleibt und keine andere Erklärung hat.',
          'Bei Lungenentzündungen, die immer wieder an derselben Stelle auftreten oder nicht heilen. Dann sucht man den Keim.',
          'Bei manchen Erkrankungen des Lungengewebes, um die Behandlung festzulegen.',
        ],
      },
      {
        id: 'vorbereitung',
        titel: 'Vor der Untersuchung',
        kurz: 'Vorbereitung',
        bild: 'spiegelung-nuechtern',
        saetze: [
          'Bitte sechs Stunden vorher nichts mehr essen. Klares Wasser meist bis zwei Stunden vorher. Am Tag der Untersuchung bitte nicht rauchen.',
          'Vorher werden oft Blutwerte zur Gerinnung bestimmt, manchmal auch die Lungenfunktion.',
          'Blutverdünner müssen manchmal einige Tage vorher pausiert werden. Das legen wir gemeinsam mit der spiegelnden Praxis fest, nie auf eigene Faust.',
          'Bringen Sie Ihre Medikamentenliste und vorhandene Röntgen- oder CT-Bilder mit, und lassen Sie sich abholen.',
        ],
      },
      {
        id: 'ablauf',
        titel: 'So läuft es ab',
        kurz: 'Ablauf',
        saetze: [
          'Sie bekommen eine Schlaf- oder Beruhigungsspritze in die Vene. Über eine kleine Nasenbrille gibt es Sauerstoff, ein Fingerclip misst ihn.',
          'Nase und Rachen werden mit einem Spray betäubt, die Atemwege mit Tropfen durch das Gerät. Kurzer Hustenreiz ist normal und lässt schnell nach.',
          'Das Gerät wird langsam vorgeschoben, bis in die Verzweigungen der Bronchien. Schmerzen haben Sie dabei nicht.',
          'Manchmal geschieht die Spiegelung mit einem starren Rohr in Narkose, etwa um etwas zu entfernen. Das wird dann eigens besprochen.',
        ],
      },
      {
        id: 'proben',
        titel: 'Proben aus der Lunge',
        kurz: 'Proben',
        bild: 'bronchoskopie-proben',
        saetze: [
          'Bei der Spülung wird etwas Kochsalzlösung in einen Lungenabschnitt gegeben und gleich wieder abgesaugt. Darin finden sich Keime und Zellen.',
          'Mit einer feinen Zange oder Bürste werden winzige Stückchen Gewebe entnommen.',
          'Mit einem Ultraschallkopf an der Spitze lassen sich auch Lymphknoten neben den Atemwegen gezielt anstechen.',
          'Die Ergebnisse brauchen einige Tage, Kulturen von Keimen manchmal mehrere Wochen.',
        ],
      },
      {
        id: 'danach',
        titel: 'Nach der Untersuchung',
        kurz: 'Danach',
        bild: 'spiegelung-danach',
        saetze: [
          'Etwa zwei Stunden nichts essen und trinken, bis der Rachen wieder fühlt – sonst verschluckt man sich leicht. Probieren Sie zuerst einen kleinen Schluck Wasser.',
          'Heiserkeit, Husten und etwas Blut im Auswurf nach einer Probe sind in den ersten Stunden normal. Nach einer Spülung kann am Abend leichtes Fieber kommen.',
          'Nach der Spritze bis zum nächsten Tag nicht Auto fahren, keine Maschinen bedienen und nichts Wichtiges unterschreiben.',
          'Selten fällt nach einer Probe aus dem Lungengewebe ein Teil der Lunge zusammen. Deshalb wird danach manchmal geröntgt.',
        ],
      },
    ],
    warnung:
      'Melden Sie sich sofort bei zunehmender Luftnot, Schmerzen in der Brust beim Atmen, mehr als ein paar Schlieren Blut im Auswurf oder Fieber über den nächsten Tag hinaus.',
  },
];
