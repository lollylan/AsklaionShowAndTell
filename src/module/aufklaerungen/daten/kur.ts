import type { Krankheit } from './typen';

// Kur, Reha und Hilfsmittel: Unterschied Kur und Reha, der Kurantrag, das TENS-Gerät.
// Den praxiseigenen Ablauf des Reha-Antrags zeigt zusätzlich Praxisabläufe → Reha-Antrag.

export const KUR: Krankheit[] = [
  {
    id: 'kur-oder-reha',
    name: 'Kur oder Reha?',
    zusatz: 'Vorsorge und Rehabilitation',
    gebiet: 'kur',
    suche:
      'kur reha rehabilitation vorsorge vorsorgekur badekur kurort mutter kind kur vater kind kur muettergenesungswerk anschlussheilbehandlung ahb anschlussreha rentenversicherung krankenkasse unfallversicherung rv fit praevention pflegende angehoerige zuzahlung unterschied',
    seiten: [
      {
        id: 'unterschied',
        titel: 'Der Unterschied in einem Satz',
        kurz: 'Unterschied',
        bild: 'kur-oder-reha',
        saetze: [
          'Eine Kur soll verhindern, dass Sie krank werden oder eine Krankheit schlimmer wird. Fachlich heißt sie „Vorsorge“.',
          'Eine Reha hilft, wenn die Krankheit schon da ist und Sie im Beruf oder im Alltag deutlich einschränkt.',
          'Beide dauern meist drei Wochen und finden ambulant oder in einer Klinik statt.',
          'Welche passt, besprechen wir gemeinsam – das entscheidet auch, wer bezahlt und wo der Antrag hingeht.',
        ],
      },
      {
        id: 'kur',
        titel: 'Die Kur: vorbeugen',
        kurz: 'Kur',
        bild: 'kur-oder-reha',
        saetze: [
          'Eine Kur kommt in Frage, wenn Ihre Gesundheit geschwächt ist – etwa durch dauernde Erschöpfung, Rückenbeschwerden oder viel Belastung –, aber noch keine schwere Krankheit daraus geworden ist.',
          'Bei der ambulanten Kur fahren Sie in einen Kurort. Die Kasse zahlt die Anwendungen und die ärztliche Betreuung und gibt einen Zuschuss für Unterkunft und Essen.',
          'Reicht das nicht, ist eine Kur in einer Klinik möglich. Dann zahlt die Kasse fast alles.',
          'Eine Kur in der Klinik gibt es in der Regel höchstens alle vier Jahre.',
        ],
      },
      {
        id: 'familie',
        titel: 'Kur für Mütter, Väter und Pflegende',
        kurz: 'Mutter-Kind',
        bild: 'kur-oder-reha',
        saetze: [
          'Mütter und Väter, die durch Familie und Beruf erschöpft sind, haben Anspruch auf eine eigene Kur – allein oder mit Kind.',
          'Dafür müssen Sie vorher nichts ambulant ausprobiert haben.',
          'Auch wer einen Angehörigen pflegt, kann eine Kur oder Reha in einer Klinik bekommen. Die Pflege zu Hause lässt sich für diese Zeit organisieren.',
          'Beratungsstellen, etwa des Müttergenesungswerks, helfen kostenlos beim Antrag und bei der Wahl der Klinik.',
        ],
      },
      {
        id: 'reha',
        titel: 'Die Reha: wieder fit werden',
        kurz: 'Reha',
        bild: 'kur-oder-reha',
        saetze: [
          'Eine Reha soll Ihnen helfen, nach einer Krankheit wieder zu arbeiten und selbstständig zu leben – etwa nach Herzinfarkt, Krebs, einer Gelenk-OP, bei Depression oder starken Rückenschmerzen.',
          'Direkt nach einem Krankenhausaufenthalt organisiert meist das Krankenhaus die Anschlussreha.',
          'Sind Sie berufstätig, zahlt meist die Rentenversicherung, in Rente die Krankenkasse, nach einem Arbeitsunfall die Unfallversicherung.',
          'Für Berufstätige gibt es außerdem „RV Fit“: ein kostenloses Vorbeuge-Programm der Rentenversicherung neben der Arbeit.',
        ],
      },
      {
        id: 'geld',
        titel: 'Kosten und Arbeit',
        kurz: 'Kosten',
        saetze: [
          'Für eine Kur oder Reha in der Klinik zahlen Erwachsene meist zehn Euro pro Tag dazu, für eine begrenzte Zahl von Tagen. Mit kleinem Einkommen fällt das oft weg.',
          'Für eine bewilligte Kur oder Reha müssen Sie keinen Urlaub nehmen. Ihr Arbeitgeber zahlt den Lohn weiter wie bei einer Krankheit.',
          'Bei einer ambulanten Kur im Kurort klären Sie das am besten vorher mit Ihrem Arbeitgeber.',
          'Haben Sie Kinder unter zwölf Jahren, kann für die Zeit eine Haushaltshilfe bezahlt werden.',
        ],
      },
    ],
    warnung:
      'Kur und Reha müssen vorher beantragt und bewilligt sein. Fahren Sie nicht los, bevor Sie den Bescheid haben.',
  },
  {
    id: 'kurantrag',
    name: 'Der Kurantrag',
    zusatz: 'Vorsorgekur beantragen',
    gebiet: 'kur',
    suche:
      'kurantrag kur antrag beantragen vorsorge vorsorgekur badekur mutter kind kur krankenkasse formular verordnung bescheid ablehnung abgelehnt widerspruch wunschklinik klinik waehlen medizinischer dienst gutachten',
    seiten: [
      {
        id: 'wann',
        titel: 'Lohnt sich ein Antrag?',
        kurz: 'Wann?',
        bild: 'kurantrag',
        saetze: [
          'Ein Antrag hat gute Aussichten, wenn Ihre Gesundheit deutlich gefährdet ist und die Behandlung am Wohnort nicht mehr reicht.',
          'Hilfreich ist, wenn schon etwas versucht wurde: Krankengymnastik, Kurse, Gespräche, Medikamente.',
          'Überlegen Sie vorher: Was belastet Sie? Was soll nach der Kur besser sein? Das gehört in den Antrag.',
        ],
      },
      {
        id: 'antrag',
        titel: 'So läuft der Antrag',
        kurz: 'Antrag',
        bild: 'kurantrag',
        saetze: [
          'Zuerst sprechen wir in der Praxis über Ihre Beschwerden und Ihr Ziel.',
          'Wir füllen das ärztliche Formular aus und beschreiben, warum die Kur nötig ist.',
          'Den Antrag schicken Sie an Ihre Krankenkasse. Viele Kassen haben dafür einen eigenen Vordruck – fragen Sie dort nach.',
          'Für eine Mutter-Kind-Kur gibt es eigene Formulare; die Beratungsstellen helfen beim Ausfüllen.',
        ],
      },
      {
        id: 'klinik',
        titel: 'Ihre Wunschklinik',
        kurz: 'Klinik',
        bild: 'kurantrag',
        saetze: [
          'Sie dürfen eine Klinik vorschlagen. Nennen Sie sie gleich im Antrag und schreiben Sie kurz, warum sie zu Ihnen passt.',
          'Die Kasse berücksichtigt berechtigte Wünsche. Ist Ihre Wunschklinik teurer, kann ein Teil der Mehrkosten bei Ihnen bleiben.',
          'Achten Sie darauf, dass die Klinik zu Ihren Beschwerden passt – etwa Rücken, Erschöpfung oder Atemwege.',
        ],
      },
      {
        id: 'bescheid',
        titel: 'Bescheid und Widerspruch',
        kurz: 'Bescheid',
        bild: 'kurantrag',
        saetze: [
          'Die Kasse prüft den Antrag, oft zusammen mit dem Medizinischen Dienst. Der Bescheid kommt meist nach einigen Wochen.',
          'Ablehnungen sind häufig, oft mit der Begründung, die Behandlung am Wohnort reiche aus.',
          'Dann lohnt sich ein Widerspruch. Er muss innerhalb eines Monats schriftlich bei der Kasse sein.',
          'Wir unterstützen Sie mit einer ärztlichen Stellungnahme. Viele Widersprüche haben Erfolg.',
        ],
      },
      {
        id: 'vorbereiten',
        titel: 'Gut vorbereitet losfahren',
        kurz: 'Vorbereiten',
        saetze: [
          'Nehmen Sie Ihren Medikamentenplan, wichtige Befunde und ausreichend Medikamente für die ganze Zeit mit.',
          'Packen Sie Sport- und Badesachen und bequeme Schuhe ein.',
          'Klären Sie früh, wer sich zu Hause um Kinder, Angehörige oder Haustiere kümmert.',
          'Überlegen Sie schon in der Kur, was Sie danach zu Hause weitermachen wollen.',
        ],
      },
    ],
    warnung:
      'Gegen eine Ablehnung haben Sie einen Monat Zeit für den Widerspruch, ab Erhalt des Bescheids.',
  },
  {
    id: 'tens',
    name: 'TENS-Gerät',
    zusatz: 'Schmerzbehandlung mit Reizstrom',
    gebiet: 'kur',
    suche:
      'tens reizstrom elektrotherapie transkutane elektrische nervenstimulation schmerzgeraet stromgeraet elektroden schmerzen rueckenschmerzen nacken schulter knie arthrose regelschmerzen tennisarm hilfsmittel leihgeraet',
    seiten: [
      {
        id: 'was',
        titel: 'Was ist ein TENS-Gerät?',
        kurz: 'Was ist das?',
        bild: 'tens',
        saetze: [
          'Ein TENS-Gerät ist ein kleines Gerät mit Batterie. Über Klebe-Elektroden schickt es sanfte Stromimpulse durch die Haut.',
          'Sie spüren ein Kribbeln. Es überdeckt die Schmerzsignale auf ihrem Weg zum Gehirn, und der Körper schüttet eigene schmerzlindernde Stoffe aus.',
          'Das Gerät heilt nichts, es kann aber Schmerzen lindern – oft solange es läuft und eine Weile danach.',
          'Es hilft nicht jedem. Bei länger anhaltenden Schmerzen können wir ein Gerät verordnen; die Kasse stellt oft zuerst ein Leihgerät zum Ausprobieren.',
        ],
      },
      {
        id: 'anwendung',
        titel: 'So wenden Sie es an',
        kurz: 'Anwendung',
        bild: 'tens-anwendung',
        saetze: [
          'Kleben Sie die Elektroden auf saubere, trockene Haut ohne Creme, so dass die Schmerzstelle dazwischen liegt – mit mindestens drei Zentimetern Abstand.',
          'Erst kleben, dann einschalten. Drehen Sie die Stärke hoch, bis es kräftig, aber angenehm kribbelt. Wird das Kribbeln schwächer, regeln Sie etwas nach.',
          'Für den Anfang eignet sich ein Programm mit hoher Frequenz, etwa 80 bis 100 Hertz. Eine Sitzung dauert 20 bis 30 Minuten, gern mehrmals am Tag.',
          'Zum Schluss erst ausschalten, dann die Elektroden abziehen und auf die Folie zurückkleben.',
        ],
      },
      {
        id: 'ruecken',
        titel: 'Am unteren Rücken',
        kurz: 'Rücken',
        bild: 'tens-ruecken',
        saetze: [
          'Bei Kreuzschmerzen kleben Sie je zwei Elektroden links und rechts neben die Wirbelsäule, etwa zwei Finger breit daneben.',
          'Die schmerzende Stelle liegt zwischen den vier Elektroden.',
          'Nicht direkt auf die Wirbelsäule kleben.',
          'Am besten bleiben Sie dabei in Bewegung – TENS kann helfen, wieder aktiv zu werden.',
        ],
      },
      {
        id: 'nacken',
        titel: 'Nacken und Schulter',
        kurz: 'Nacken',
        bild: 'tens-nacken',
        saetze: [
          'Bei Nackenschmerzen kleben Sie je eine Elektrode links und rechts neben die Halswirbelsäule, unterhalb des Haaransatzes.',
          'Ziehen die Schmerzen in die Schulter, kommen die beiden anderen Elektroden auf den Schultermuskel der schmerzenden Seite.',
          'Niemals vorn oder seitlich am Hals kleben.',
        ],
      },
      {
        id: 'knie',
        titel: 'Am Knie',
        kurz: 'Knie',
        bild: 'tens-knie',
        saetze: [
          'Bei Knieschmerzen, etwa durch Arthrose, kleben Sie vier Elektroden rund um die Kniescheibe: zwei darüber, zwei darunter, je innen und außen.',
          'Das Knie dabei leicht gebeugt halten, dann sitzen die Elektroden auch beim Gehen gut.',
          'Ergänzen Sie TENS mit Ihren Übungen – die Bewegung bleibt das Wichtigste.',
        ],
      },
      {
        id: 'weitere',
        titel: 'Weitere Stellen',
        kurz: 'Weitere',
        bild: 'tens-weitere',
        saetze: [
          'Am Ellenbogen, etwa beim Tennisarm: zwei Elektroden ober- und unterhalb der schmerzenden Stelle an der Außenseite.',
          'Bei Regelschmerzen: zwei Elektroden auf den Unterbauch oder auf den unteren Rücken.',
          'An der Hüfte: zwei Elektroden an der Außenseite über und unter der schmerzenden Stelle.',
          'Grundsätzlich gilt überall: Schmerzstelle zwischen die Elektroden.',
        ],
      },
      {
        id: 'nicht',
        titel: 'Wann Sie es nicht benutzen',
        kurz: 'Wann nicht',
        bild: 'tens-verbote',
        saetze: [
          'Mit Herzschrittmacher oder Defibrillator nur nach Rücksprache mit Ihrer Kardiologie.',
          'Nie vorn am Hals, am Kopf, an den Augen oder quer über den Brustkorb.',
          'Nicht auf verletzte oder gereizte Haut, nicht auf Stellen ohne Gefühl, nicht in der Schwangerschaft am Bauch.',
          'Nicht beim Autofahren, im Bad oder im Schlaf. Neue, unklare Schmerzen lassen Sie zuerst abklären.',
        ],
      },
    ],
    warnung:
      'Wird die Haut unter den Elektroden rot oder brennt sie, machen Sie eine Pause und kleben Sie beim nächsten Mal etwas daneben.',
  },
  {
    id: 'iontophorese',
    name: 'Leitungswasser-Iontophorese',
    zusatz: 'Behandlung gegen starkes Schwitzen',
    gebiet: 'kur',
    suche:
      'iontophorese leitungswasser leitungswasseriontophorese schwitzen hyperhidrose schweiss schweisshaende schweissfuesse achseln achselschweiss gleichstrom wanne wasserbad aluminiumchlorid antitranspirant botox botulinumtoxin hilfsmittel leihgeraet',
    seiten: [
      {
        id: 'was',
        titel: 'Was ist eine Iontophorese?',
        kurz: 'Was ist das?',
        bild: 'iontophorese',
        saetze: [
          'Sie legen Hände oder Füße in zwei flache Wannen mit ganz normalem Leitungswasser. Ein kleines Gerät schickt einen schwachen Gleichstrom durch das Wasser und die Haut.',
          'Danach schwitzen die behandelten Stellen für einige Tage bis Wochen deutlich weniger. Vermutlich bremst der Strom die Ausgänge der Schweißdrüsen vorübergehend.',
          'Die Behandlung kommt ohne Medikamente aus, ist gut verträglich und lässt sich zu Hause machen.',
          'Am besten wirkt sie an Händen und Füßen.',
        ],
      },
      {
        id: 'wer',
        titel: 'Für wen ist das?',
        kurz: 'Für wen?',
        bild: 'iontophorese-stufen',
        saetze: [
          'Für alle, die an Händen oder Füßen so stark schwitzen, dass es Alltag oder Arbeit stört (Hyperhidrose).',
          'Zuerst probieren wir ein starkes Antitranspirant mit Aluminiumchlorid, abends auf die trockene Haut. Reicht das nicht, ist die Iontophorese der nächste Schritt.',
          'Hilft auch sie nicht genug, kommen Spritzen mit Botulinumtoxin, Cremes oder Tabletten gegen das Schwitzen in Frage.',
          'Schwitzen Sie plötzlich neu, vor allem nachts oder am ganzen Körper, suchen wir zuerst nach der Ursache.',
        ],
      },
      {
        id: 'anwendung',
        titel: 'So wenden Sie es an',
        kurz: 'Anwendung',
        bild: 'iontophorese',
        saetze: [
          'Füllen Sie die Wannen mit Leitungswasser, bis Handflächen oder Fußsohlen gut bedeckt sind. Ringe und Schmuck vorher abnehmen.',
          'Kleine Risse und Schnitte mit etwas Vaseline abdecken – dort brennt der Strom sonst.',
          'Erst Hände ins Wasser, dann einschalten und den Strom langsam hochdrehen, bis es deutlich, aber nicht schmerzhaft kribbelt. Während der Behandlung die Hände im Wasser lassen.',
          'Zum Schluss den Strom herunterdrehen und ausschalten, erst dann herausnehmen. Viele Geräte wechseln die Stromrichtung zur Hälfte der Zeit von selbst.',
        ],
      },
      {
        id: 'fuesse',
        titel: 'Füße und Achseln',
        kurz: 'Füße, Achseln',
        bild: 'iontophorese-fuesse',
        saetze: [
          'Für die Füße stellen Sie die Wannen auf den Boden und setzen sich bequem davor. Die Fußsohlen liegen flach im Wasser.',
          'Für die Achseln gibt es feuchte Schwammtaschen mit einer Elektrode, die Sie unter die Arme klemmen.',
          'An den Achseln wirkt die Iontophorese oft schwächer und ist umständlicher. Dort helfen eher Spritzen mit Botulinumtoxin.',
        ],
      },
      {
        id: 'plan',
        titel: 'Wie oft und wie lange?',
        kurz: 'Wie oft?',
        bild: 'iontophorese-plan',
        saetze: [
          'Am Anfang behandeln Sie drei- bis viermal pro Woche, jedes Mal 10 bis 20 Minuten.',
          'Nach etwa zwei Wochen lässt das Schwitzen meist deutlich nach.',
          'Danach genügen oft ein bis zwei Sitzungen pro Woche, um das Ergebnis zu halten. Den passenden Abstand finden Sie selbst heraus.',
          'Hören Sie ganz auf, kommt das Schwitzen nach einigen Wochen zurück.',
        ],
      },
      {
        id: 'kasse',
        titel: 'Rezept und wann nicht',
        kurz: 'Wann nicht',
        saetze: [
          'Hilft ein Antitranspirant nicht, können wir ein Gerät verordnen. Oft gibt es zuerst ein Leihgerät zum Ausprobieren.',
          'Nicht anwenden mit Herzschrittmacher, in der Schwangerschaft und bei Metall im Stromweg, etwa einer Platte im Arm oder einem künstlichen Gelenk.',
          'Kribbeln, Rötung und trockene Haut sind häufig und harmlos. Eine fettende Creme danach hilft.',
        ],
      },
    ],
    warnung:
      'Brennt es stark oder entstehen kleine Bläschen, drehen Sie den Strom sofort herunter und machen eine Pause.',
  },
  {
    id: 'kompression',
    name: 'Kompressionsstrümpfe',
    zusatz: 'Anziehen, Pflege, Rezept',
    gebiet: 'kur',
    suche:
      'kompressionsstruempfe kompressionsstrumpf stuetzstruempfe kompression mks kompressionsklasse kkl anziehhilfe anziehen sanitaetshaus anmessen krampfadern venenschwaeche thrombose lymphoedem geschwollene beine wasser in den beinen schwangerschaft hilfsmittel rezept',
    seiten: [
      {
        id: 'wofuer',
        titel: 'Wofür sind Kompressionsstrümpfe?',
        kurz: 'Wofür?',
        bild: 'kompression',
        saetze: [
          'Ein Kompressionsstrumpf drückt von außen auf das Bein – am Knöchel am stärksten, nach oben hin weniger. So fließt das Blut in den Venen leichter zum Herzen zurück.',
          'Das lindert schwere, geschwollene Beine und schützt die Haut.',
          'Wir verordnen sie bei Krampfadern und Venenschwäche, nach einer Thrombose, bei Lymphödem und manchmal in der Schwangerschaft.',
          'Sie wirken nur, solange Sie sie tragen – deshalb jeden Tag, vom Aufstehen bis zum Abend.',
        ],
      },
      {
        id: 'anmessen',
        titel: 'Stärke und Anmessen',
        kurz: 'Anmessen',
        bild: 'kompression-laengen',
        saetze: [
          'Es gibt verschiedene Stärken, die Kompressionsklassen. Meist reicht Klasse 1 oder 2. Auf dem Rezept steht auch die Länge: bis unters Knie, bis zum Oberschenkel oder als Strumpfhose.',
          'Für die meisten genügt ein Strumpf bis unters Knie.',
          'Im Sanitätshaus wird Ihr Bein genau vermessen. Gehen Sie dafür morgens hin, wenn die Beine noch nicht geschwollen sind.',
          'Ein gut sitzender Strumpf drückt gleichmäßig, rutscht nicht und schnürt nirgends ein.',
        ],
      },
      {
        id: 'anziehen',
        titel: 'So ziehen Sie sie an',
        kurz: 'Anziehen',
        bild: 'kompression-anziehen',
        saetze: [
          'Ziehen Sie die Strümpfe morgens gleich nach dem Aufstehen an, bevor die Beine anschwellen.',
          'Stülpen Sie den Strumpf bis zur Ferse auf links. Schlüpfen Sie mit dem Fuß hinein, bis die Ferse richtig sitzt.',
          'Dann den Strumpf Stück für Stück nach oben schieben, nicht ziehen. Falten glatt streichen.',
          'Gummihandschuhe mit Noppen helfen beim Greifen. Fällt es schwer, gibt es Anziehhilfen – die können wir auch verordnen.',
        ],
      },
      {
        id: 'pflege',
        titel: 'Pflege und Haut',
        kurz: 'Pflege',
        saetze: [
          'Waschen Sie die Strümpfe am besten täglich, im Feinwaschgang bei 30 bis 40 Grad, ohne Weichspüler. Nicht auf der Heizung trocknen.',
          'Deshalb gibt es zwei Paar: eins tragen, eins waschen.',
          'Cremen Sie die Beine abends ein, nicht morgens – fettige Creme greift das Gewebe an, und der Strumpf rutscht schlechter darüber.',
          'Nach etwa sechs Monaten lässt der Druck nach. Dann gibt es ein neues Rezept.',
        ],
      },
      {
        id: 'nicht',
        titel: 'Wann nicht?',
        kurz: 'Wann nicht',
        saetze: [
          'Bei starken Durchblutungsstörungen der Beinarterien dürfen Sie keine Kompression tragen. Das prüfen wir vorher.',
          'Auch bei einer schweren Herzschwäche mit viel Wasser in der Lunge und bei offenen, entzündeten Wunden am Bein klären wir das erst.',
          'Mit Diabetes und Taubheit an den Füßen schauen Sie öfter nach Druckstellen.',
        ],
      },
    ],
    warnung:
      'Werden die Zehen taub, kalt, weiß oder blau oder schmerzt der Strumpf stark: sofort ausziehen und uns Bescheid geben.',
  },
  {
    id: 'inhalieren',
    name: 'Richtig inhalieren',
    zusatz: 'Spray, Inhalierhilfe, Pulver',
    gebiet: 'kur',
    suche:
      'inhalieren inhalation inhalationstechnik dosieraerosol spray asthmaspray notfallspray spacer inhalierhilfe vorschaltkammer pulverinhalator diskus turbohaler ellipta asthma copd kortison mundsoor salbutamol budesonid formoterol',
    seiten: [
      {
        id: 'warum',
        titel: 'Warum die Technik so wichtig ist',
        kurz: 'Warum?',
        bild: 'inhalieren',
        saetze: [
          'Das Medikament soll tief in die Bronchien. Bei falscher Technik landet es im Mund und Rachen – und hilft kaum.',
          'Fehler beim Inhalieren sind sehr häufig, auch nach Jahren. Deshalb schauen wir uns Ihre Technik immer wieder an.',
          'Es gibt zwei Arten von Geräten: Sprays und Pulver. Sie brauchen eine ganz unterschiedliche Atmung.',
        ],
      },
      {
        id: 'spray',
        titel: 'Das Spray (Dosieraerosol)',
        kurz: 'Spray',
        bild: 'inhalieren-spray',
        saetze: [
          'Kappe ab, kräftig schütteln. Aufrecht hinsetzen oder stehen und ruhig ausatmen – nicht in das Gerät.',
          'Mundstück mit den Lippen fest umschließen. Langsam und tief einatmen und gleich am Anfang einmal drücken.',
          'Luft fünf bis zehn Sekunden anhalten, dann langsam durch die Nase ausatmen.',
          'Brauchen Sie zwei Hübe, warten Sie dazwischen etwa eine halbe Minute.',
        ],
      },
      {
        id: 'spacer',
        titel: 'Mit Inhalierhilfe (Spacer)',
        kurz: 'Spacer',
        bild: 'inhalieren-spacer',
        saetze: [
          'Die Inhalierhilfe ist eine Kammer, die vor das Spray kommt. Sie fängt den Sprühstoß auf, sodass Sie in Ruhe einatmen können.',
          'So gelangt deutlich mehr Wirkstoff in die Lunge und weniger in den Mund. Sie ist besonders gut für Kinder, Ältere und bei Atemnot.',
          'Einen Hub in die Kammer sprühen, dann vier- bis fünfmal ruhig ein- und ausatmen. Für jeden Hub neu.',
          'Einmal pro Woche mit Spülwasser waschen und an der Luft trocknen lassen, nicht abreiben.',
        ],
      },
      {
        id: 'pulver',
        titel: 'Der Pulverinhalator',
        kurz: 'Pulver',
        bild: 'inhalieren-pulver',
        saetze: [
          'Beim Pulver ist es umgekehrt: Hier zählt ein schneller, kräftiger und tiefer Atemzug, damit sich das Pulver löst.',
          'Gerät nach Anleitung laden, dabei nicht schütteln und nicht hineinpusten – feuchte Atemluft verklebt das Pulver.',
          'Erst neben dem Gerät ausatmen, dann Mundstück umschließen und kräftig einatmen. Fünf bis zehn Sekunden Luft anhalten.',
          'Sie spüren oder schmecken das Pulver oft kaum. Das ist normal; das Zählwerk zeigt, ob eine Dosis abgegeben wurde.',
        ],
      },
      {
        id: 'danach',
        titel: 'Danach und im Alltag',
        kurz: 'Danach',
        saetze: [
          'Nach einem Kortison-Spray den Mund ausspülen oder etwas essen. Das schützt vor Pilz im Mund und Heiserkeit.',
          'Achten Sie auf das Zählwerk und besorgen Sie rechtzeitig ein neues Gerät.',
          'Bringen Sie Ihre Inhalatoren zu den Kontrollterminen mit. Dann prüfen wir die Technik gemeinsam.',
          'Brauchen Sie Ihr Notfallspray öfter als zweimal pro Woche, sprechen Sie uns an.',
        ],
      },
    ],
    warnung:
      'Hilft das Notfallspray nicht, können Sie kaum noch sprechen oder werden die Lippen blau: sofort 112.',
  },
  {
    id: 'gehhilfen',
    name: 'Gehstock und Rollator',
    zusatz: 'Gehhilfen richtig nutzen',
    gebiet: 'kur',
    suche:
      'gehhilfe gehhilfen gehstock stock unterarmgehstuetze kruecke kruecken rollator gehwagen hoehe einstellen treppe sturz sturzgefahr sturzvorbeugung arthrose huefte knie gangunsicherheit hilfsmittel rezept',
    seiten: [
      {
        id: 'welche',
        titel: 'Welche Gehhilfe passt?',
        kurz: 'Welche?',
        bild: 'gehhilfen',
        saetze: [
          'Ein Gehstock entlastet ein schmerzendes Bein etwas und gibt Sicherheit.',
          'Unterarmgehstützen nehmen mehr Gewicht ab, etwa nach einer Operation an Hüfte, Knie oder Fuß.',
          'Ein Rollator hilft, wenn Sie unsicher gehen, schnell erschöpft sind oder unterwegs eine Pause brauchen. Er hat Bremsen und einen Sitz.',
          'Welche Gehhilfe zu Ihnen passt, besprechen wir gemeinsam.',
        ],
      },
      {
        id: 'hoehe',
        titel: 'Die richtige Höhe',
        kurz: 'Höhe',
        bild: 'gehstock-hoehe',
        saetze: [
          'Stellen Sie sich aufrecht hin, in Ihren normalen Schuhen, und lassen Sie die Arme locker hängen.',
          'Der Griff gehört auf die Höhe Ihres Handgelenks. Dann ist der Ellenbogen beim Aufstützen leicht gebeugt.',
          'Ist die Gehhilfe zu hoch, ziehen Sie die Schulter hoch. Ist sie zu niedrig, gehen Sie gebückt.',
          'Beim Rollator gilt dasselbe für beide Griffe.',
        ],
      },
      {
        id: 'seite',
        titel: 'Auf welcher Seite?',
        kurz: 'Seite',
        bild: 'gehstock-seite',
        saetze: [
          'Den Gehstock halten Sie in der Hand der gesunden Seite – auch wenn sich das zuerst falsch anfühlt.',
          'Stock und krankes Bein setzen Sie gleichzeitig nach vorn. Dann folgt das gesunde Bein.',
          'So verteilt sich das Gewicht wie beim normalen Gehen, und Sie hinken weniger.',
        ],
      },
      {
        id: 'treppe',
        titel: 'Treppen',
        kurz: 'Treppe',
        bild: 'gehstock-treppe',
        saetze: [
          'Merksatz: Das Gesunde geht hinauf, das Kranke geht hinab.',
          'Treppauf setzen Sie zuerst das gesunde Bein auf die nächste Stufe, dann folgen krankes Bein und Stock.',
          'Treppab stellen Sie zuerst Stock und krankes Bein eine Stufe tiefer, dann folgt das gesunde.',
          'Halten Sie sich wenn möglich zusätzlich am Geländer fest.',
        ],
      },
      {
        id: 'rollator',
        titel: 'Mit dem Rollator',
        kurz: 'Rollator',
        bild: 'rollator',
        saetze: [
          'Gehen Sie aufrecht im Rollator, nicht weit dahinter. Die Hinterräder sind etwa auf Höhe Ihrer Füße.',
          'Bevor Sie sich setzen oder aufstehen, immer beide Bremsen feststellen.',
          'Den Rollator nicht zum Hochziehen benutzen – stützen Sie sich beim Aufstehen an der Armlehne ab.',
          'Bordsteine nehmen Sie mit der Kipphilfe: mit dem Fuß drauftreten, Vorderräder anheben.',
        ],
      },
      {
        id: 'rezept',
        titel: 'Rezept und Sicherheit zu Hause',
        kurz: 'Rezept',
        saetze: [
          'Gehhilfen können wir verordnen. Sie bekommen sie im Sanitätshaus, das sie auch richtig einstellt.',
          'Stolperfallen zu Hause beseitigen: lose Teppiche, Kabel, schlechtes Licht. Nachts hilft ein kleines Licht auf dem Weg zum Bad.',
          'Gleichgewicht und Kraft lassen sich trainieren – auch im Alter. Fragen Sie nach Übungen oder Kursen zur Sturzvorbeugung.',
        ],
      },
    ],
    warnung:
      'Sind Sie gestürzt oder fühlen sich beim Gehen zunehmend unsicher, sprechen Sie uns an. Viele Ursachen lassen sich behandeln.',
  },
  {
    id: 'bandagen',
    name: 'Bandagen und Orthesen',
    zusatz: 'Stützen für Gelenke und Rücken',
    gebiet: 'kur',
    suche:
      'bandage bandagen orthese orthesen schiene knieorthese kniebandage sprunggelenk umknicken baenderriss aircast handgelenk handgelenksschiene nachtschiene karpaltunnel rueckenbandage lendenbandage epicondylitis spange hilfsmittel rezept sanitaetshaus',
    seiten: [
      {
        id: 'unterschied',
        titel: 'Bandage oder Orthese?',
        kurz: 'Unterschied',
        bild: 'bandage-orthese',
        saetze: [
          'Eine Bandage ist aus festem, elastischem Stoff. Sie drückt sanft auf das Gelenk, wärmt und gibt ein sichereres Gefühl.',
          'Eine Orthese ist fester, mit Schienen, Kunststoff oder Gelenken. Sie stützt, führt oder bremst eine Bewegung.',
          'Welche Sie brauchen, hängt davon ab, wie viel Halt das Gelenk braucht.',
        ],
      },
      {
        id: 'wo',
        titel: 'Wo sie helfen',
        kurz: 'Wo?',
        bild: 'orthesen-stellen',
        saetze: [
          'Am Sprunggelenk nach dem Umknicken, damit die Bänder in Ruhe heilen.',
          'Am Knie bei Arthrose oder nach einer Bandverletzung.',
          'Am Handgelenk, etwa nachts beim Karpaltunnelsyndrom.',
          'Am Rücken nur selten und kurz – Bewegung hilft dem Rücken meist mehr als eine Stütze.',
        ],
      },
      {
        id: 'sprunggelenk',
        titel: 'Nach dem Umknicken',
        kurz: 'Sprunggelenk',
        bild: 'sprunggelenk-orthese',
        saetze: [
          'Ist am Sprunggelenk ein Band gerissen, tragen Sie meist für etwa sechs Wochen eine Schiene mit festen Seitenteilen.',
          'Sie verhindert, dass der Fuß wieder umknickt, lässt ihn aber nach oben und unten bewegen. So dürfen Sie früh auftreten und gehen.',
          'Tragen Sie die Schiene im Schuh, tagsüber und bei jeder Belastung.',
          'Danach helfen Gleichgewichtsübungen, damit Sie nicht wieder umknicken.',
        ],
      },
      {
        id: 'handgelenk',
        titel: 'Schiene für das Handgelenk',
        kurz: 'Handgelenk',
        bild: 'handgelenk-schiene',
        saetze: [
          'Beim Karpaltunnelsyndrom schlafen die Finger oft nachts ein, weil das Handgelenk im Schlaf abknickt.',
          'Eine Schiene hält es nachts gerade. Das entlastet den Nerv, und die Beschwerden lassen bei vielen nach.',
          'Tagsüber brauchen Sie die Schiene meist nicht.',
        ],
      },
      {
        id: 'tragen',
        titel: 'Richtig tragen',
        kurz: 'Tragen',
        bild: 'bandage-orthese',
        saetze: [
          'Tragen Sie Bandagen vor allem bei Belastung, etwa beim Sport oder längeren Wegen – nicht rund um die Uhr. Sonst gewöhnen sich die Muskeln das Arbeiten ab.',
          'Machen Sie Ihre Übungen trotzdem weiter. Die Stütze ersetzt keine Kraft.',
          'Sie dürfen nicht einschnüren und keine Druckstellen machen. Das Sanitätshaus passt sie an.',
          'Waschen Sie Bandagen nach Anleitung, meist von Hand oder im Feinwaschgang.',
        ],
      },
    ],
    warnung:
      'Werden Finger oder Zehen taub, kalt oder blau, oder schwillt es unterhalb der Stütze an: lockern und uns Bescheid geben.',
  },
  {
    id: 'einlagen',
    name: 'Schuheinlagen',
    zusatz: 'Einlagen richtig nutzen',
    gebiet: 'kur',
    suche:
      'einlagen schuheinlagen orthopaedische einlagen senkfuss spreizfuss plattfuss knickfuss hohlfuss fersensporn plantarfasziitis fersenkissen diabetes diabetischer fuss weichbettung beinlaenge fussschmerzen hilfsmittel rezept sanitaetshaus orthopaedieschuhtechnik',
    seiten: [
      {
        id: 'wofuer',
        titel: 'Wofür sind Einlagen?',
        kurz: 'Wofür?',
        bild: 'einlagen',
        saetze: [
          'Einlagen werden nach Ihrem Fuß angefertigt. Sie stützen das Fußgewölbe, verteilen den Druck besser und entlasten schmerzende Stellen.',
          'Sie helfen etwa bei Senk- und Spreizfuß, bei Fersenschmerzen, bei Fußschmerzen durch Arthrose und bei unterschiedlich langen Beinen.',
          'Bei Diabetes mit Gefühlsstörungen schützen weiche Einlagen die Füße vor Druckstellen.',
        ],
      },
      {
        id: 'arten',
        titel: 'Stützen, betten, entlasten',
        kurz: 'Arten',
        bild: 'einlagen-arten',
        saetze: [
          'Stützende Einlagen heben ein abgesunkenes Gewölbe etwas an.',
          'Bettende Einlagen sind weich und formen den ganzen Fuß nach. Sie verteilen den Druck, etwa bei Diabetes oder Rheuma.',
          'Entlastende Einlagen haben Polster oder Aussparungen genau unter der schmerzenden Stelle, etwa unter der Ferse oder dem Vorfuß.',
        ],
      },
      {
        id: 'schuhe',
        titel: 'Einlagen und Schuhe',
        kurz: 'Schuhe',
        bild: 'einlagen-schuh',
        saetze: [
          'Einlagen brauchen Platz. Am besten passen Schuhe mit herausnehmbarer Innensohle; die Einlage kommt an deren Stelle.',
          'Nehmen Sie die Einlagen zum Schuhkauf mit und probieren Sie die Schuhe mit Einlage an.',
          'Gewöhnen Sie sich langsam daran: anfangs einige Stunden am Tag, dann länger. Nach ein bis zwei Wochen sollten sie angenehm sein.',
          'Drücken sie danach noch, lassen Sie sie im Sanitätshaus oder beim Orthopädieschuhmacher nacharbeiten.',
        ],
      },
      {
        id: 'selbst',
        titel: 'Das können Sie selbst tun',
        kurz: 'Selbst tun',
        saetze: [
          'Einlagen stützen, aber sie trainieren nicht. Gehen Sie zu Hause oft barfuß und machen Sie Fußgymnastik: Zehen krallen, Handtuch greifen, auf einem Bein stehen.',
          'Haben Sie Diabetes, schauen Sie Ihre Füße jeden Abend an – auch zwischen den Zehen.',
          'Nach etwa einem Jahr sind Einlagen oft abgenutzt. Dann gibt es ein neues Rezept, das wir oder die Orthopädie ausstellen.',
        ],
      },
    ],
    warnung:
      'Blasen, Rötungen oder offene Stellen an den Füßen bitte zeigen – bei Diabetes sofort, auch wenn es nicht wehtut.',
  },
  {
    id: 'inkontinenz',
    name: 'Hilfen bei Blasenschwäche',
    zusatz: 'Inkontinenzhilfen',
    gebiet: 'kur',
    suche:
      'inkontinenz harninkontinenz blasenschwaeche urinverlust einlagen vorlagen pants windeln inkontinenzslip netzhose bettschutz kondomurinal urinal belastungsinkontinenz dranginkontinenz beckenboden beckenbodentraining hautpflege saugstaerke lieferung hilfsmittel rezept zuzahlung',
    seiten: [
      {
        id: 'abklaeren',
        titel: 'Zuerst die Ursache',
        kurz: 'Ursache',
        bild: 'inkontinenz-arten',
        saetze: [
          'Ungewollter Urinverlust ist häufig und kein Grund, sich zu schämen. Oft lässt er sich bessern.',
          'Geht beim Husten, Lachen oder Heben Urin ab, ist meist der Beckenboden zu schwach. Kommt der Harndrang plötzlich und so stark, dass Sie es nicht mehr zur Toilette schaffen, ist die Blase überaktiv.',
          'Auch ein Harnwegsinfekt, eine vergrößerte Prostata oder Medikamente können dahinterstecken. Das klären wir zuerst.',
        ],
      },
      {
        id: 'hilfen',
        titel: 'Welche Hilfen gibt es?',
        kurz: 'Hilfen',
        bild: 'inkontinenz-hilfen',
        saetze: [
          'Einlagen und Vorlagen kommen in die normale Unterwäsche oder in eine Netzhose.',
          'Pants sehen aus wie Unterwäsche und lassen sich hoch- und runterziehen – gut für alle, die selbst zur Toilette gehen.',
          'Für Männer gibt es Kondom-Urinale, die den Urin in einen Beutel am Bein leiten.',
          'Für das Bett gibt es saugende Unterlagen.',
        ],
      },
      {
        id: 'saugstaerke',
        titel: 'Die passende Saugstärke',
        kurz: 'Saugstärke',
        bild: 'inkontinenz-tropfen',
        saetze: [
          'Auf den Packungen zeigen Tropfen, wie viel ein Produkt aufnimmt. Wählen Sie so viel wie nötig, nicht so viel wie möglich.',
          'Tagsüber reicht oft eine dünnere Einlage, nachts eine stärkere.',
          'Wechseln Sie, bevor die Vorlage voll ist. Das schont die Haut und verhindert Geruch.',
        ],
      },
      {
        id: 'haut',
        titel: 'Die Haut schützen',
        kurz: 'Haut',
        bild: 'inkontinenz-hilfen',
        saetze: [
          'Reinigen Sie die Haut beim Wechseln mit lauwarmem Wasser oder einer milden Waschlotion ohne Seife. Sanft abtupfen, nicht reiben.',
          'Eine dünne Schicht Hautschutzcreme hilft gegen Rötungen. Zu viel Creme verstopft die Vorlage.',
          'Kein Puder, kein Babyöl – das reizt eher.',
        ],
      },
      {
        id: 'rezept',
        titel: 'Rezept und Lieferung',
        kurz: 'Rezept',
        bild: 'inkontinenz-hilfen',
        saetze: [
          'Wir verordnen Inkontinenzhilfen meist für längere Zeit, etwa für ein Jahr. Ein Vertragspartner Ihrer Kasse liefert sie dann regelmäßig nach Hause.',
          'Sie zahlen höchstens zehn Euro im Monat dazu.',
          'Die Kasse muss Ihnen ausreichende Produkte ohne Aufpreis anbieten. Bietet man Ihnen nur Ware mit Aufzahlung an, fragen Sie bei der Kasse nach.',
        ],
      },
      {
        id: 'selbst',
        titel: 'Das können Sie selbst tun',
        kurz: 'Selbst tun',
        bild: 'inkontinenz-arten',
        saetze: [
          'Trinken Sie trotzdem genug, etwa anderthalb Liter am Tag. Zu wenig Flüssigkeit reizt die Blase eher.',
          'Beckenbodentraining hilft vielen, besonders bei Urinverlust beim Husten. Es gibt dafür Krankengymnastik auf Rezept.',
          'Feste Toilettenzeiten und Abnehmen bei Übergewicht entlasten die Blase.',
        ],
      },
    ],
    warnung:
      'Brennen beim Wasserlassen, Fieber, Blut im Urin oder ein plötzlich neuer Urinverlust: bitte zeitnah abklären lassen.',
  },
];
