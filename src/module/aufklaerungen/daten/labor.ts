import type { Krankheit } from './typen';

// Laborwerte im Einzelnen: Leber, Niere, Blutfette. Die Übersicht „Blutwerte verstehen“
// (untersuchungen.ts) hat je Wert nur eine Seite; hier geht es tiefer. Normalwerte sind
// grobe Richtwerte – jedes Labor hat eigene Grenzen, die auf dem Befund stehen.

export const LABOR: Krankheit[] = [
  {
    id: 'leberwerte',
    name: 'Leberwerte verstehen',
    zusatz: 'GOT, GPT, GGT, AP, Bilirubin',
    gebiet: 'untersuchungen',
    suche:
      'leberwerte leberenzyme transaminasen got gpt ast alt asat alat ggt gamma-gt gammagt ygt alkalische phosphatase ap bilirubin gelbsucht ikterus gilbert meulengracht albumin quick inr gerinnung cholinesterase che fettleber alkohol hepatitis leberentzuendung gallenstau labor blutwerte',
    seiten: [
      {
        id: 'ueberblick',
        titel: 'Was Leberwerte zeigen',
        kurz: 'Überblick',
        saetze: [
          'Mit „Leberwerten“ sind drei Gruppen gemeint. GOT und GPT kommen aus den Leberzellen: Sie steigen, wenn Zellen gereizt oder geschädigt sind.',
          'GGT und AP sitzen an den Gallengängen. Sie steigen vor allem, wenn die Galle nicht gut abfließt – oder durch Alkohol und Medikamente.',
          'Albumin, Gerinnung und Cholinesterase zeigen, was die Leber noch leistet. Sie werden erst bei einer schweren Leberkrankheit auffällig.',
          'Erhöhte Werte sind häufig und meist harmlos. Erst das Muster zusammen mit Ultraschall und Vorgeschichte ergibt ein Bild.',
        ],
      },
      {
        id: 'got-gpt',
        titel: 'GPT und GOT',
        kurz: 'GPT und GOT',
        saetze: [
          'Die GPT (auch ALT) steckt fast nur in der Leber. Sie ist der beste Wert für gereizte Leberzellen. Grob normal: Frauen unter 35, Männer unter 50 U/l, je nach Labor.',
          'Die GOT (auch AST) steckt auch in Muskeln und im Herzen. Nach hartem Training oder einer Muskelverletzung kann sie steigen, obwohl die Leber gesund ist. Die Grenzen sind ähnlich wie bei der GPT.',
          'Meist ist die GPT höher als die GOT, etwa bei einer Fettleber. Liegt die GOT deutlich darüber, denken wir eher an Alkohol oder eine vernarbte Leber.',
          'Ein Anstieg auf das Doppelte ist häufig und oft vorübergehend. Werte über dem Zehnfachen deuten auf eine akute Leberentzündung, etwa durch Viren oder Medikamente.',
        ],
      },
      {
        id: 'ggt',
        titel: 'Gamma-GT (GGT)',
        kurz: 'GGT',
        saetze: [
          'Die GGT ist der empfindlichste Leberwert – sie reagiert schon auf kleine Reize. Grob normal: Frauen unter 40, Männer unter 60 U/l, je nach Labor.',
          'Sie steigt durch Alkohol, auch durch regelmäßige kleine Mengen, durch eine Fettleber und durch manche Medikamente, etwa gegen Krampfanfälle.',
          'Staut sich die Galle, steigt die GGT zusammen mit der AP.',
          'Ist nur die GGT leicht erhöht und alles andere normal, ist das meist harmlos. Ein paar Wochen ohne Alkohol zeigen oft schon, woher sie kommt.',
        ],
      },
      {
        id: 'ap-bilirubin',
        titel: 'AP und Bilirubin',
        kurz: 'AP, Bilirubin',
        bild: 'bilirubin',
        saetze: [
          'Die alkalische Phosphatase (AP) steigt, wenn die Galle nicht abfließt, etwa durch einen Gallenstein. Sie kommt aber auch aus den Knochen – bei Kindern im Wachstum und nach Knochenbrüchen ist sie normal erhöht.',
          'Bilirubin entsteht, wenn alte rote Blutkörperchen abgebaut werden. Die Leber gibt es in die Galle, und es färbt den Stuhl braun. Grob normal ist das Gesamt-Bilirubin unter 1,2 mg/dl.',
          'Staut es sich, werden Augen und Haut gelb, der Urin dunkel und der Stuhl hell – das muss rasch abgeklärt werden.',
          'Häufig und harmlos ist das Gilbert-Meulengracht-Syndrom: Etwa jeder Zwanzigste baut Bilirubin etwas langsamer ab. Beim Fasten oder bei Infekten steigt es leicht, sonst passiert nichts.',
        ],
      },
      {
        id: 'leistung',
        titel: 'Was die Leber noch schafft',
        kurz: 'Leistung',
        saetze: [
          'Die Leber stellt wichtige Eiweiße her. Diese Werte zeigen nicht Reizung, sondern Leistung – sie sinken erst, wenn ein großer Teil der Leber nicht mehr arbeitet.',
          'Albumin ist das häufigste Eiweiß im Blut und hält das Wasser in den Adern. Ist es zu niedrig, schwellen Beine und Bauch an.',
          'Quick und INR zeigen, wie gut das Blut gerinnt, denn die Gerinnungsstoffe kommen aus der Leber. Wer Gerinnungshemmer wie Marcumar nimmt, hat absichtlich veränderte Werte.',
          'Auch die Cholinesterase sinkt, wenn die Leber schwächer wird. Zusammen helfen diese Werte, eine Leberzirrhose einzuschätzen.',
        ],
      },
      {
        id: 'vorgehen',
        titel: 'Wenn Werte erhöht sind',
        kurz: 'Was tun',
        saetze: [
          'Leicht erhöhte Werte kontrollieren wir meist nach einigen Wochen. Bis dahin hilft eine Pause ohne Alkohol.',
          'Wir gehen Ihre Medikamente, Schmerzmittel und Nahrungsergänzungen durch – auch pflanzliche Mittel können die Leber reizen.',
          'Bleiben die Werte erhöht, folgen ein Ultraschall und ein Bluttest auf Hepatitis-Viren, manchmal auf Eisen und weitere Ursachen.',
          'Am häufigsten steckt eine Fettleber dahinter. Dann senkt Abnehmen die Werte am besten.',
        ],
      },
    ],
    warnung:
      'Ein einzelner erhöhter Leberwert ist häufig und kein Grund zur Sorge. Gelbe Augen, dunkler Urin oder heller Stuhl gehören aber rasch abgeklärt.',
  },
  {
    id: 'nierenwerte',
    name: 'Nierenwerte verstehen',
    zusatz: 'Kreatinin, eGFR, Albumin im Urin',
    gebiet: 'untersuchungen',
    suche:
      'nierenwerte nierenfunktion niere kreatinin creatinin egfr gfr glomerulaere filtrationsrate ckd-epi nierenleistung nierenschwaeche niereninsuffizienz albumin eiweiss urin mikroalbuminurie albuminurie albumin-kreatinin-quotient uacr cystatin harnstoff kalium kontrastmittel schmerzmittel ibuprofen diclofenac sglt2 labor blutwerte',
    seiten: [
      {
        id: 'ueberblick',
        titel: 'Was die Nieren leisten',
        kurz: 'Überblick',
        saetze: [
          'Die Nieren filtern jeden Tag das gesamte Blut viele Male. Abfallstoffe und überschüssiges Wasser gehen in den Urin, Wertvolles wie Eiweiß bleibt im Blut.',
          'Zwei Fragen sind wichtig: Wie viel filtern die Nieren noch? Das zeigen Kreatinin und eGFR im Blut.',
          'Und ist der Filter dicht? Das zeigt das Eiweiß Albumin im Urin.',
          'Beide zusammen sagen mehr als jeder Wert allein – und der Verlauf mehr als eine einzelne Messung.',
        ],
      },
      {
        id: 'kreatinin',
        titel: 'Kreatinin',
        kurz: 'Kreatinin',
        saetze: [
          'Kreatinin ist ein Abfallstoff der Muskeln. Er entsteht gleichmäßig und wird fast nur über die Nieren ausgeschieden. Grob normal: Frauen bis 0,9, Männer bis 1,2 mg/dl, je nach Labor.',
          'Wer viele Muskeln hat, hat mehr Kreatinin. Auch viel Fleisch am Vortag, harter Sport und Kreatin-Pulver treiben den Wert hoch – ohne dass die Niere krank ist.',
          'Bei sehr schlanken und älteren Menschen ist der Wert oft niedrig und täuscht eine gute Niere vor.',
          'Kreatinin steigt erst spät: Oft hat die Niere schon fast die Hälfte ihrer Leistung verloren, bevor der Wert über die Grenze klettert. Deshalb rechnen wir die eGFR aus.',
        ],
      },
      {
        id: 'egfr',
        titel: 'Die eGFR',
        kurz: 'eGFR',
        bild: 'egfr-stufen',
        saetze: [
          'Die eGFR schätzt, wie viel Blut die Nieren pro Minute filtern. Das Labor berechnet sie aus Kreatinin, Alter und Geschlecht, meist mit der CKD-EPI-Formel. Die Einheit ml/min/1,73 m² rechnet auf eine mittlere Körpergröße um.',
          'Ab 90 ist normal, 60 bis 89 leicht eingeschränkt – im Alter ist das oft noch normal. Von 45 bis 59 ist die Leistung mäßig, von 30 bis 44 deutlich eingeschränkt.',
          'Unter 30 ist die Niere stark geschwächt, unter 15 versagt sie; dann kommen Dialyse oder Transplantation in Frage.',
          'Erst wenn die eGFR über drei Monate unter 60 liegt, sprechen wir von einer chronischen Nierenschwäche.',
        ],
      },
      {
        id: 'albumin',
        titel: 'Eiweiß im Urin',
        kurz: 'Urin-Albumin',
        saetze: [
          'Ein gesunder Nierenfilter hält das Eiweiß Albumin im Blut. Schon kleine Mengen im Urin zeigen, dass der Filter undicht wird – oft Jahre, bevor die eGFR sinkt.',
          'Gemessen wird im Morgenurin, als Verhältnis von Albumin zu Kreatinin. Normal ist unter 30 mg/g; 30 bis 300 ist mäßig, darüber stark erhöht.',
          'Besonders bei Diabetes und Bluthochdruck prüfen wir das einmal im Jahr. Eiweiß im Urin heißt auch: höheres Risiko für Herz und Gefäße.',
          'Sport, Fieber, ein Harnwegsinfekt oder die Regelblutung erhöhen den Wert kurzfristig. Deshalb zählt erst ein erhöhter Wert in zwei von drei Proben.',
        ],
      },
      {
        id: 'weitere',
        titel: 'Weitere Nierenwerte',
        kurz: 'Weitere Werte',
        saetze: [
          'Cystatin C ist ein zweiter Filterwert, der nicht von den Muskeln abhängt. Wir nutzen ihn, wenn Kreatinin täuschen könnte, etwa bei sehr muskulösen, sehr schlanken oder älteren Menschen.',
          'Harnstoff steigt durch viel Eiweiß im Essen und durch zu wenig Trinken. Allein sagt er wenig über die Niere.',
          'Kalium, grob 3,5 bis 5,0 mmol/l, muss die Niere ausscheiden. Manche Blutdruckmittel und eine schwache Niere erhöhen es – zu viel stört den Herzrhythmus.',
          'Ist Kalium unerwartet hoch, war es oft nur das Röhrchen: Langes Stehen oder Pumpen mit der Faust bei der Blutabnahme setzt Kalium aus den Blutzellen frei. Dann messen wir neu.',
        ],
      },
      {
        id: 'schuetzen',
        titel: 'Die Nieren schützen',
        kurz: 'Schützen',
        saetze: [
          'Am meisten schützt ein gut eingestellter Blutdruck und Blutzucker.',
          'Schmerzmittel wie Ibuprofen, Diclofenac oder Naproxen nicht dauerhaft nehmen. Normal nach Durst trinken, etwa anderthalb Liter.',
          'Bei schwächerer Niere passen wir die Dosis vieler Medikamente an. Bitte vor Röntgen oder CT mit Kontrastmittel Bescheid sagen.',
          'Manche Medikamente schützen die Niere zusätzlich, etwa bestimmte Blutdruckmittel oder sogenannte SGLT2-Hemmer. Ob sie für Sie passen, besprechen wir.',
        ],
      },
    ],
    warnung:
      'Wichtiger als ein einzelner Wert ist der Verlauf – zusammen mit dem Eiweiß im Urin. Bei jedem neuen Arzt und Medikament sagen: „Meine Nieren sind schwächer.“',
  },
  {
    id: 'blutfette',
    name: 'Blutfette verstehen',
    zusatz: 'LDL, HDL, Triglyzeride, Lp(a)',
    gebiet: 'untersuchungen',
    suche:
      'blutfette lipide fettwerte cholesterin gesamtcholesterin ldl hdl triglyzeride triglyceride lipoprotein a lpa lp(a) hypercholesterinaemie fettstoffwechsel statin ezetimib pcsk9 bempedoinsaeure omega-3 fisch herzinfarkt schlaganfall arteriosklerose labor blutwerte',
    seiten: [
      {
        id: 'ueberblick',
        titel: 'Fett im Blut braucht Taxis',
        kurz: 'Überblick',
        saetze: [
          'Cholesterin ist lebenswichtig: Der Körper baut daraus Zellwände, Hormone und Gallensaft. Den größten Teil stellt die Leber selbst her.',
          'Fett löst sich nicht im Blut. Es fährt deshalb in kleinen Eiweiß-Taxis, den Lipoproteinen.',
          'Das LDL bringt Cholesterin von der Leber in den Körper – zu viel davon lagert sich in den Gefäßwänden ab. Das HDL holt überschüssiges Cholesterin zurück zur Leber.',
          'Das Gesamtcholesterin allein sagt deshalb wenig. Wichtig ist, in welchen Taxis es fährt.',
        ],
      },
      {
        id: 'ldl',
        titel: 'LDL – das Cholesterin, das sich ablagert',
        kurz: 'LDL',
        saetze: [
          'Je mehr LDL über die Jahre im Blut ist, desto mehr lagert sich in den Schlagadern ab. Das ist der wichtigste Blutfettwert.',
          'Einen festen Normwert gibt es nicht – das Ziel hängt von Ihrem Risiko ab. Bei Gesunden grob unter 115 mg/dl, bei mäßigem Risiko unter 100, bei hohem unter 70.',
          'Nach Herzinfarkt oder Schlaganfall und bei sehr hohem Risiko gilt unter 55. Zu niedrig gibt es beim LDL nicht.',
          'Liegt das LDL über 190, ist es oft erblich. Dann schauen wir auch auf Eltern, Geschwister und Kinder.',
        ],
      },
      {
        id: 'hdl',
        titel: 'HDL – die Müllabfuhr',
        kurz: 'HDL',
        saetze: [
          'Das HDL sammelt überschüssiges Cholesterin ein und bringt es zur Leber zurück. Ein höherer Wert ist meist günstig: grob über 40 mg/dl bei Männern, über 50 bei Frauen.',
          'Niedrig ist das HDL oft bei Übergewicht, Bewegungsmangel, Rauchen und Diabetes.',
          'Bewegung, Rauchstopp und Abnehmen heben es an. Medikamente, die nur das HDL steigern, haben in Studien nicht vor Herzinfarkt geschützt.',
          'Ein hohes HDL gleicht ein hohes LDL nicht aus. Behandelt wird nach dem LDL.',
        ],
      },
      {
        id: 'triglyzeride',
        titel: 'Triglyzeride',
        kurz: 'Triglyzeride',
        saetze: [
          'Triglyzeride sind die Fette, mit denen der Körper Energie speichert. Grob normal ist nüchtern unter 150 mg/dl.',
          'Sie steigen durch Zucker, Weißmehl und Alkohol, durch Bauchfett und Diabetes – und stark nach dem Essen. Deshalb messen wir sie am besten nüchtern.',
          'Erhöhte Werte gehören oft zu Fettleber, Übergewicht und Diabetes-Vorstufe. Sie zeigen, dass der Stoffwechsel überlastet ist.',
          'Sehr hohe Werte, etwa über 1000 mg/dl, können eine Entzündung der Bauchspeicheldrüse auslösen und werden rasch behandelt.',
        ],
      },
      {
        id: 'lpa',
        titel: 'Lipoprotein(a)',
        kurz: 'Lp(a)',
        saetze: [
          'Lp(a) ist ein besonderes Cholesterin-Taxi, das die Gefäße stärker schädigt. Wie viel man davon hat, ist fast ganz vererbt.',
          'Etwa jeder Fünfte hat einen erhöhten Wert, grob über 50 mg/dl oder 105 nmol/l, je nach Labor. Das erhöht das Risiko für Herzinfarkt und Schlaganfall.',
          'Weil der Wert sich kaum ändert, genügt es, ihn einmal im Leben zu messen.',
          'Ernährung, Sport und Statine verändern Lp(a) kaum. Ist es erhöht, senken wir das LDL umso gründlicher. Neue Medikamente werden erprobt.',
        ],
      },
      {
        id: 'aendern',
        titel: 'So verändern Sie die Werte',
        kurz: 'Verändern',
        bild: 'blutfette-aendern',
        saetze: [
          'LDL senken: weniger Wurst, fettes Fleisch, Butter und Frittiertes, mehr Ballaststoffe aus Gemüse, Hafer und Hülsenfrüchten. Das senkt das LDL meist um 10 bis 15 Prozent.',
          'Reicht das nicht, senkt ein Statin das LDL um 30 bis 50 Prozent. Dazu kommen bei Bedarf Ezetimib und weitere Mittel.',
          'HDL heben: Bewegung, Rauchstopp, Abnehmen.',
          'Triglyzeride senken: Zucker, Weißmehl und Alkohol weglassen, abnehmen, zweimal pro Woche fetten Fisch essen.',
        ],
      },
    ],
    warnung:
      'Entscheidend ist Ihr Gesamtrisiko, nicht ein einzelner Wert. Ein Cholesterinsenker wirkt nur, solange Sie ihn nehmen.',
  },
];
