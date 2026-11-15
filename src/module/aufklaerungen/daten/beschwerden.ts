import type { Krankheit } from './typen';

// Beschwerden, hinter denen verschiedene Ursachen stecken können. Statt der vier festen
// Seiten gibt es hier eine Seite je Ursache; `bild` nennt die Zeichnung der Seite.

export const BESCHWERDEN: Krankheit[] = [
  {
    id: 'haarausfall',
    name: 'Haarausfall',
    zusatz: 'Alopezie, Effluvium',
    gebiet: 'beschwerden',
    suche:
      'haare haarverlust glatze geheimratsecken androgenetisch alopecia areata kreisrund telogen effluvium diffus ferritin eisen tsh schilddruese minoxidil finasterid',
    seiten: [
      {
        id: 'ueberblick',
        titel: 'Haarausfall: Was ist normal?',
        kurz: 'Überblick',
        saetze: [
          'Bis zu 100 Haare am Tag zu verlieren ist normal – jedes Haar fällt irgendwann aus und wächst neu.',
          'Von Haarausfall sprechen wir, wenn über Wochen deutlich mehr ausgeht oder die Haare sichtbar lichter werden.',
          'Entscheidend ist das Muster: an bestimmten Stellen, in runden Flecken oder gleichmäßig am ganzen Kopf.',
          'Dazu schauen wir auf zwei Blutwerte: Eisenspeicher und Schilddrüse. Das sind die häufigsten Ursachen, die sich einfach beheben lassen.',
        ],
      },
      {
        id: 'erblich',
        titel: 'Anlagebedingter Haarausfall',
        kurz: 'Anlagebedingt',
        bild: 'haarausfall-erblich',
        saetze: [
          'Die häufigste Form, in der Fachsprache androgenetischer Haarausfall. Sie betrifft im Lauf des Lebens die meisten Männer und viele Frauen.',
          'Die Haarwurzeln reagieren ererbt empfindlich auf männliche Hormone. Von Mal zu Mal wächst das Haar dünner und kürzer nach.',
          'Bei Männern beginnt es an den Geheimratsecken und am Hinterkopf. Bei Frauen wird der Scheitel lichter.',
          'Aufhalten lässt es sich mit Minoxidil zum Auftragen, bei Männern auch mit Finasterid-Tabletten. Die Wirkung zeigt sich erst nach Monaten und hält nur an, solange man behandelt. Die Kasse übernimmt die Kosten nicht.',
        ],
      },
      {
        id: 'kreisrund',
        titel: 'Kreisrunder Haarausfall',
        kurz: 'Kreisrund',
        bild: 'haarausfall-kreisrund',
        saetze: [
          'Plötzlich entstehen eine oder mehrere runde, völlig kahle Stellen – meist am Kopf, manchmal im Bart oder an den Augenbrauen. Der Fachbegriff ist Alopecia areata.',
          'Das Abwehrsystem greift irrtümlich die eigenen Haarwurzeln an. Die Wurzeln bleiben erhalten, sie ruhen nur.',
          'Die Haut ist glatt und gesund, sie juckt und schuppt nicht. Ansteckend ist es nicht.',
          'Bei vielen wachsen die Haare innerhalb eines Jahres von selbst nach. Kortison zum Auftragen kann helfen; bei ausgedehntem Befall behandelt die Hautarztpraxis.',
        ],
      },
      {
        id: 'eisen',
        titel: 'Eisenmangel und Blutarmut',
        kurz: 'Eisenmangel',
        bild: 'eisenmangel',
        saetze: [
          'Haarwurzeln gehören zu den Zellen, die sich am schnellsten teilen – sie brauchen viel Eisen.',
          'Sind die Eisenspeicher leer, spart der Körper zuerst an den Haaren: Sie fallen gleichmäßig am ganzen Kopf aus. Das kann schon beginnen, bevor eine Blutarmut entsteht.',
          'Wir bestimmen das Blutbild und den Speicherwert Ferritin. Häufige Gründe für einen Mangel sind starke Regelblutungen, fleischarme Ernährung oder ein unbemerkter Blutverlust im Darm.',
          'Eisentabletten füllen die Speicher über drei bis sechs Monate auf. So lange brauchen auch die Haare, bis sie sichtbar nachwachsen.',
        ],
      },
      {
        id: 'schilddruese',
        titel: 'Schilddrüse',
        kurz: 'Schilddrüse',
        bild: 'schilddruesenunterfunktion',
        saetze: [
          'Die Schilddrüse gibt den Takt für den Stoffwechsel vor – auch für die Haarwurzeln.',
          'Bei einer Unterfunktion werden die Haare trocken und stumpf und fallen am ganzen Kopf aus. Oft kommen Müdigkeit, Frieren und Gewichtszunahme dazu.',
          'Auch eine Überfunktion lässt Haare ausgehen: Sie werden fein und weich, dazu Herzklopfen, Schwitzen und Unruhe.',
          'Als Suchtest genügt ein Blutwert, das TSH. Ist die Schilddrüse wieder richtig eingestellt, erholen sich die Haare innerhalb einiger Monate.',
        ],
      },
      {
        id: 'telogen',
        titel: 'Haarausfall nach Belastung',
        kurz: 'Nach Belastung',
        bild: 'haarzyklus',
        saetze: [
          'Jedes Haar wächst zwei bis sechs Jahre, ruht etwa drei Monate und fällt dann aus. Normalerweise ruht nur jedes zehnte Haar.',
          'Eine starke Belastung schickt viele Haare zugleich in die Ruhe: hohes Fieber, eine Operation, eine Geburt, eine strenge Diät oder großer Stress. Fachbegriff: telogenes Effluvium.',
          'Zwei bis vier Monate später fallen sie alle auf einmal aus – der Auslöser ist dann oft schon vergessen.',
          'Die Wurzeln sind unbeschädigt. Meist wächst alles innerhalb von sechs bis neun Monaten von selbst nach.',
        ],
      },
    ],
    warnung:
      'Bitte zeigen: gerötete, schuppende oder vernarbte kahle Stellen, Schmerzen oder starker Juckreiz.',
  },
  {
    id: 'muedigkeit',
    name: 'Müdigkeit',
    zusatz: 'Abgeschlagenheit, Erschöpfung',
    gebiet: 'beschwerden',
    suche:
      'muede erschoepft schlapp antriebslos fatigue abgeschlagen schlaf schlafhygiene schlafapnoe schnarchen tsh schilddruese eisen ferritin depression burnout stress psyche',
    seiten: [
      {
        id: 'ueberblick',
        titel: 'Müdigkeit: Was steckt dahinter?',
        kurz: 'Überblick',
        saetze: [
          'Müde ist jeder einmal. Abklären sollte man es, wenn die Erschöpfung über Wochen anhält und Schlaf sie nicht bessert.',
          'Meist kommen mehrere Dinge zusammen: zu wenig oder schlechter Schlaf, Belastung, wenig Bewegung – seltener steckt eine einzelne Krankheit dahinter.',
          'Wir gehen der Reihe nach vor: Gespräch, Untersuchung und wenige gezielte Blutwerte. Das klärt die wichtigen körperlichen Ursachen.',
          'Auch Medikamente, Alkohol und ein Infekt, der noch nachwirkt, können müde machen.',
        ],
      },
      {
        id: 'schilddruese',
        titel: 'Schilddrüse',
        kurz: 'Schilddrüse',
        bild: 'schilddruesenunterfunktion',
        saetze: [
          'Arbeitet die Schilddrüse zu langsam, läuft der ganze Körper auf Sparflamme: müde, antriebslos, verlangsamt.',
          'Typisch sind dazu Frieren, trockene Haut, Verstopfung und Gewichtszunahme.',
          'Auch eine Überfunktion erschöpft: Der Körper läuft auf Hochtouren, man schläft schlecht und ist trotzdem zittrig und unruhig.',
          'Der Blutwert TSH zeigt beides zuverlässig. Eine Unterfunktion wird mit einer Hormontablette am Morgen ausgeglichen.',
        ],
      },
      {
        id: 'eisen',
        titel: 'Eisenmangel',
        kurz: 'Eisenmangel',
        bild: 'eisenmangel',
        saetze: [
          'Eisen steckt im roten Blutfarbstoff, der den Sauerstoff trägt. Fehlt es, kommt weniger Sauerstoff bei Muskeln und Gehirn an.',
          'Die Folge: müde, blass, schnell außer Atem. Konzentration und Leistung lassen nach.',
          'Besonders häufig betroffen sind Frauen mit starker Regelblutung, Schwangere und Menschen, die wenig oder kein Fleisch essen.',
          'Wir messen das Blutbild und den Eisenspeicher Ferritin. Bei einem Mangel suchen wir die Ursache und füllen die Speicher mit Eisentabletten auf.',
        ],
      },
      {
        id: 'schlafapnoe',
        titel: 'Atemaussetzer im Schlaf',
        kurz: 'Schlafapnoe',
        bild: 'schlafapnoe',
        saetze: [
          'Bei der Schlafapnoe fällt im Schlaf der Rachen zusammen. Die Atmung setzt immer wieder für Sekunden aus.',
          'Jeder Aussetzer endet mit einer kurzen Weckreaktion. Man merkt sie nicht – aber der Schlaf erholt nicht mehr.',
          'Hinweise sind lautes Schnarchen, beobachtete Atempausen, Kopfschmerz am Morgen und Einnicken am Tag, etwa beim Lesen oder am Steuer.',
          'Abklären lässt sich das mit einem kleinen Messgerät für eine Nacht zu Hause. Behandelt wird meist mit einer Atemmaske; auch Abnehmen hilft.',
        ],
      },
      {
        id: 'schlafhygiene',
        titel: 'Besser schlafen',
        kurz: 'Schlafhygiene',
        bild: 'schlafhygiene',
        saetze: [
          'Feste Zeiten: jeden Tag zur gleichen Zeit aufstehen, auch am Wochenende. Das stellt die innere Uhr.',
          'Das Bett ist nur zum Schlafen da. Wer länger als eine halbe Stunde wach liegt, steht besser auf und legt sich erst wieder hin, wenn er müde ist.',
          'Abends herunterfahren: Bildschirme eine Stunde vorher aus, das Schlafzimmer dunkel, ruhig und kühl.',
          'Kaffee nur bis zum frühen Nachmittag. Alkohol macht schläfrig, zerstückelt aber den Schlaf. Bewegung am Tag hilft – nur nicht direkt vor dem Zubettgehen.',
        ],
      },
      {
        id: 'psyche',
        titel: 'Seelische Ursachen',
        kurz: 'Psyche',
        bild: 'depression',
        saetze: [
          'Anhaltende Erschöpfung ist eines der häufigsten Zeichen einer Depression – oft deutlicher als die gedrückte Stimmung.',
          'Dazu passt: keine Freude mehr an Dingen, die sonst guttun, Grübeln, frühes Erwachen, Antrieb und Konzentration lassen nach.',
          'Auch Dauerstress, Sorgen und Überlastung in Beruf oder Familie zehren – der Körper kommt nicht mehr zur Ruhe.',
          'Das ist keine Schwäche und gut behandelbar: mit Gesprächen, Psychotherapie, Bewegung und bei Bedarf Medikamenten.',
        ],
      },
    ],
    warnung:
      'Bitte rasch melden bei ungewolltem Gewichtsverlust, Fieber, Nachtschweiß, Luftnot oder Brustschmerz – und wenn Gedanken an den Tod kommen.',
  },
  {
    id: 'unvertraeglichkeiten',
    name: 'Unverträglichkeiten',
    zusatz: 'von Nahrungsmitteln',
    gebiet: 'beschwerden',
    suche:
      'nahrungsmittelunvertraeglichkeit lebensmittel intoleranz auslassversuch eliminationsdiaet gluten zoeliakie weizen histamin fruktose fructose fruchtzucker laktose lactose milchzucker blaehungen',
    seiten: [
      {
        id: 'ueberblick',
        titel: 'Wenn Essen Beschwerden macht',
        kurz: 'Überblick',
        saetze: [
          'Blähungen, Bauchschmerzen, Durchfall oder Völlegefühl nach dem Essen sind häufig. Oft steckt ein einzelner Bestandteil der Nahrung dahinter, den der Darm schlecht verarbeitet.',
          'Eine Unverträglichkeit ist keine Allergie: Kleine Mengen werden meist vertragen, und gefährlich wird es nicht.',
          'Die vier häufigsten Auslöser sind Gluten, Histamin, Fruchtzucker und Milchzucker.',
          'Bluttests auf Unverträglichkeiten aus dem Internet (IgG-Tests) sagen nichts aus. Am zuverlässigsten ist der Auslassversuch.',
        ],
      },
      {
        id: 'auslassversuch',
        titel: 'Der Auslassversuch',
        kurz: 'Auslassversuch',
        saetze: [
          'Führen Sie zuerst zwei Wochen ein Tagebuch: Was haben Sie gegessen, wann kamen welche Beschwerden?',
          'Lassen Sie dann einen Verdächtigen zwei bis vier Wochen konsequent weg. Immer nur einen – sonst wissen Sie nicht, was geholfen hat.',
          'Wird es deutlich besser, folgt die Gegenprobe: Essen Sie das Lebensmittel wieder. Kommen die Beschwerden zurück, ist der Auslöser gefunden.',
          'Ändert sich nichts, war es das nicht. Essen Sie wieder normal und testen Sie den nächsten Kandidaten.',
        ],
      },
      {
        id: 'gluten',
        titel: 'Gluten',
        kurz: 'Gluten',
        saetze: [
          'Gluten ist das Klebereiweiß in Weizen, Dinkel, Roggen und Gerste.',
          'Viel Gluten: Brot, Brötchen, Nudeln, Pizza, Kuchen, Müsli, Paniertes, Bier – versteckt auch in Soßen und Fertiggerichten. Glutenfrei: Reis, Mais, Kartoffeln, Hirse, Buchweizen.',
          'Wichtig: Bevor Sie Gluten weglassen, schließen wir mit einem Bluttest die Zöliakie aus – dabei schädigt Gluten die Darmschleimhaut. Der Test stimmt nur, solange Sie Gluten essen.',
          'Ist der Test unauffällig und es geht Ihnen ohne Gluten trotzdem besser, reicht es oft, weniger davon zu essen.',
        ],
      },
      {
        id: 'histamin',
        titel: 'Histamin',
        kurz: 'Histamin',
        saetze: [
          'Histamin steckt in vielen Lebensmitteln und wird normalerweise im Darm abgebaut. Gelingt das nicht ausreichend, wirkt es im ganzen Körper.',
          'Die Beschwerden sind vielfältig: rotes Gesicht, Juckreiz, Kopfschmerzen, laufende Nase, Herzklopfen, Bauchkrämpfe, Durchfall – oft schon während des Essens.',
          'Viel Histamin entsteht durch Reifen und Gären: Rotwein, Sekt, lang gereifter Käse, Salami, Schinken, Sauerkraut, Fischkonserven, Räucherfisch. Auch Tomaten, Spinat und Erdbeeren.',
          'Frisch ist besser als gelagert oder aufgewärmt. Einen sicheren Test gibt es nicht – hier zählt allein der Auslassversuch.',
        ],
      },
      {
        id: 'fruktose',
        titel: 'Fruchtzucker (Fruktose)',
        kurz: 'Fruktose',
        saetze: [
          'Der Dünndarm kann nur eine begrenzte Menge Fruchtzucker aufnehmen. Der Rest wird im Dickdarm vergoren: Blähungen, Bauchschmerzen, weicher Stuhl.',
          'Viel Fruktose: Äpfel, Birnen, Mango, Weintrauben, Trockenobst, Fruchtsäfte, Smoothies, Honig, Agavendicksaft – dazu Limonaden und Süßes mit Fruktosesirup.',
          'Zuckeraustauschstoffe wie Sorbit verstärken die Beschwerden: zuckerfreie Kaugummis und Bonbons.',
          'Besser verträglich: Bananen, Beeren, Zitrusfrüchte – und Obst in kleinen Portionen zu einer Mahlzeit. Ein Atemtest kann die Diagnose sichern.',
        ],
      },
      {
        id: 'laktose',
        titel: 'Milchzucker (Laktose)',
        kurz: 'Laktose',
        saetze: [
          'Dem Dünndarm fehlt das Enzym, das Milchzucker spaltet. Bakterien im Dickdarm vergären ihn: Blähungen, Krämpfe, Durchfall.',
          'Viel Laktose: Milch, Sahne, Eis, Quark, Frischkäse, Pudding, Milchschokolade – versteckt in Fertiggerichten und Backwaren.',
          'Gut verträglich: gereifter Käse wie Gouda oder Parmesan, Butter und laktosefreie Milchprodukte.',
          'Kleine Mengen vertragen die meisten. Laktase-Tabletten helfen auswärts; ein Atemtest sichert die Diagnose.',
        ],
      },
    ],
    warnung:
      'Bitte abklären lassen: ungewollter Gewichtsverlust, Blut im Stuhl oder nächtlicher Durchfall.',
  },
  {
    id: 'schwindel',
    name: 'Schwindel',
    zusatz: 'Drehschwindel, Benommenheit',
    gebiet: 'beschwerden',
    suche:
      'vertigo drehschwindel schwankschwindel benommen benommenheit gleichgewicht lagerungsschwindel bppv otolithen kristalle lagerungsmanoever kreislauf blutdruck orthostase aufstehen neuritis vestibularis menière innenohr funktionell phobisch sturz',
    seiten: [
      {
        id: 'ueberblick',
        titel: 'Schwindel: Was steckt dahinter?',
        kurz: 'Überblick',
        saetze: [
          'Schwindel ist häufig und meist harmlos. Hinter dem Wort verbergen sich aber ganz verschiedene Gefühle.',
          'Dreht sich alles wie im Karussell? Schwankt der Boden wie auf einem Schiff? Oder wird Ihnen schwarz vor Augen?',
          'Wichtig ist auch, wann er kommt: bei Kopfbewegungen, beim Aufstehen, in bestimmten Situationen oder ohne erkennbaren Anlass.',
          'Ihre Schilderung führt oft schon zur Ursache. Dazu kommen Blutdruck, Puls, ein Blick auf die Augenbewegungen und ein Lagerungstest.',
        ],
      },
      {
        id: 'lagerung',
        titel: 'Lagerungsschwindel',
        kurz: 'Lagerung',
        bild: 'lagerungsschwindel',
        saetze: [
          'Die häufigste Ursache für Drehschwindel. Er kommt in kurzen, heftigen Anfällen beim Hinlegen, Umdrehen im Bett, Bücken oder Hochschauen.',
          'Im Gleichgewichtsorgan des Innenohrs haben sich winzige Kristalle gelöst. Bei Kopfbewegungen rollen sie durch einen Bogengang und täuschen eine Drehung vor.',
          'Ein Anfall dauert unter einer Minute, oft ist Ihnen dabei übel. Gefährlich ist das nicht.',
          'Mit einem gezielten Lagerungsmanöver bringen wir die Kristalle aus dem Bogengang heraus – oft ist der Schwindel danach weg. Die Übung können Sie zu Hause wiederholen.',
        ],
      },
      {
        id: 'kreislauf',
        titel: 'Kreislauf und Blutdruck',
        kurz: 'Kreislauf',
        saetze: [
          'Kommt kurz zu wenig Blut im Gehirn an, wird Ihnen schummrig oder schwarz vor Augen – meist beim schnellen Aufstehen.',
          'Häufige Gründe: zu wenig getrunken, Hitze, langes Stehen, ein Infekt oder Blutdrucktabletten, die zu stark wirken.',
          'Wir messen den Blutdruck im Liegen und nach dem Aufstehen, fühlen den Puls und schreiben bei Bedarf ein EKG. So finden wir auch Herzrhythmusstörungen.',
          'Was hilft: genug trinken, langsam aufstehen, erst kurz auf der Bettkante sitzen. Wird es schwarz vor Augen, sofort hinsetzen oder hinlegen.',
        ],
      },
      {
        id: 'innenohr',
        titel: 'Innenohr und Gleichgewichtsnerv',
        kurz: 'Innenohr',
        bild: 'lagerungsschwindel',
        saetze: [
          'Fällt der Gleichgewichtsnerv einer Seite plötzlich aus, dreht sich tagelang alles, mit Übelkeit und Erbrechen. Fachbegriff: Neuritis vestibularis.',
          'Das Gehirn lernt, den Ausfall auszugleichen. Dabei hilft vor allem Bewegung: so früh wie möglich aufstehen und Gleichgewichtsübungen machen.',
          'Mittel gegen Schwindel und Übelkeit helfen in den ersten Tagen, aber nur kurz – auf Dauer bremsen sie das Ausgleichen.',
          'Kommen Drehschwindel-Anfälle immer wieder mit Ohrgeräusch, Druck im Ohr und schlechterem Hören, kann ein Morbus Menière dahinterstecken. Das klärt die HNO-Praxis.',
        ],
      },
      {
        id: 'medikamente',
        titel: 'Medikamente und Alter',
        kurz: 'Medikamente',
        saetze: [
          'Viele Medikamente können schwindelig machen: Blutdrucksenker, Wassertabletten, Schlaf- und Beruhigungsmittel, Mittel gegen Depression oder Krampfanfälle.',
          'Je mehr Tabletten zusammenkommen, desto höher das Risiko. Bringen Sie deshalb alle Medikamente mit, auch die selbst gekauften.',
          'Im Alter kommt oft vieles zusammen: Augen und Gehör lassen nach, das Gefühl in den Füßen wird schwächer, die Muskeln weniger kräftig.',
          'Dann hilft kein einzelnes Mittel, sondern vieles zusammen: Medikamente prüfen, Brille anpassen, Kraft und Gleichgewicht trainieren, Stolperfallen beseitigen.',
        ],
      },
      {
        id: 'psyche',
        titel: 'Seelisch bedingter Schwindel',
        kurz: 'Psyche',
        saetze: [
          'Oft finden wir keine Störung in Ohr oder Kreislauf – und der Schwindel ist trotzdem echt.',
          'Typisch ist ein dauerndes Schwanken, etwa in Menschenmengen oder beim Einkaufen. Ablenkung bessert es.',
          'Oft beginnt es nach einem echten Schwindelanfall: Man achtet ständig auf das Gleichgewicht, und das hält den Schwindel wach.',
          'Gut helfen Bewegung, Gleichgewichtstraining und bei Angst eine Psychotherapie.',
        ],
      },
    ],
    warnung:
      'Sofort 112 bei plötzlichem Schwindel mit Doppelbildern, Sprach- oder Schluckstörung, Lähmung, Taubheit, Gangunsicherheit, heftigem Kopfschmerz, Brustschmerz oder Ohnmacht.',
  },
  {
    id: 'kopfschmerz',
    name: 'Kopfschmerz',
    zusatz: 'Spannungskopfschmerz, Migräne',
    gebiet: 'beschwerden',
    suche:
      'kopfschmerzen kopfweh spannungskopfschmerz migraene schmerzmittelkopfschmerz medikamentenuebergebrauch 10-20-regel ibuprofen paracetamol ass triptan pfefferminzoel nacken augen brille blutdruck kopfschmerztagebuch',
    seiten: [
      {
        id: 'ueberblick',
        titel: 'Kopfschmerzen: Was steckt dahinter?',
        kurz: 'Überblick',
        saetze: [
          'Fast jeder hat ab und zu Kopfschmerzen. Meist ist der Kopfschmerz selbst die Krankheit, ohne gefährliche Ursache dahinter.',
          'Am häufigsten sind Spannungskopfschmerz und Migräne. Sie unterscheiden sich in Ort, Art und Begleitzeichen.',
          'Seltener ist Kopfschmerz die Folge von etwas anderem: einem Infekt, sehr hohem Blutdruck, dem Nacken, den Augen oder zu vielen Schmerzmitteln.',
          'Am wichtigsten ist Ihre Schilderung: Wo, wie, wie oft, wie lange? Dazu kommen Untersuchung und Blutdruck. Ein MRT-Bild ist nur selten nötig.',
        ],
      },
      {
        id: 'spannung',
        titel: 'Spannungskopfschmerz',
        kurz: 'Spannung',
        saetze: [
          'Die häufigste Form. Der Schmerz ist drückend oder ziehend, auf beiden Seiten, wie ein zu enges Band oder ein Helm.',
          'Er ist leicht bis mittelstark – meist können Sie weiterarbeiten. Bewegung verschlimmert ihn nicht, Übelkeit fehlt meist.',
          'Auslöser sind oft Stress, wenig Schlaf, zu wenig Trinken, langes Sitzen am Bildschirm und verspannte Nackenmuskeln.',
          'Gegen den einzelnen Anfall helfen Pfefferminzöl auf Stirn und Schläfen, Ibuprofen, ASS oder Paracetamol. Vorbeugend wirken Ausdauersport und Entspannungsübungen.',
        ],
      },
      {
        id: 'migraene',
        titel: 'Migräne',
        kurz: 'Migräne',
        bild: 'migraene',
        saetze: [
          'Migräne kommt in Attacken von vier Stunden bis drei Tagen. Der Schmerz pocht, oft auf einer Seite, und wird bei Bewegung schlimmer.',
          'Dazu kommen Übelkeit und Empfindlichkeit gegen Licht und Lärm. Manche sehen vorher Flimmern oder Zickzacklinien, die Aura.',
          'Früh genommen helfen Schmerzmittel und ein Mittel gegen Übelkeit, bei starken Attacken spezielle Migränemittel, die Triptane.',
          'Bei häufigen Attacken gibt es Tabletten zur Vorbeugung. Mehr dazu zeigen wir Ihnen beim Thema Migräne.',
        ],
      },
      {
        id: 'schmerzmittel',
        titel: 'Kopfschmerz durch Schmerzmittel',
        kurz: 'Schmerzmittel',
        bild: 'kopfschmerz-schmerzmittel',
        saetze: [
          'Wer sehr oft Schmerzmittel nimmt, bekommt davon selbst Kopfschmerzen. Das Gehirn wird empfindlicher, der Schmerz kommt immer öfter – und man greift wieder zur Tablette.',
          'Merken Sie sich die 10-20-Regel: an höchstens zehn Tagen im Monat Schmerz- oder Migränemittel, an mindestens zwanzig Tagen keine.',
          'Der Ausweg ist eine Pause: Die Mittel werden einige Wochen weggelassen. In den ersten Tagen wird der Kopfschmerz oft stärker, danach deutlich besser.',
          'Wir begleiten Sie dabei und beginnen bei Bedarf eine Behandlung zur Vorbeugung. Das Kopfschmerztagebuch zeigt, wie oft Sie wirklich Tabletten nehmen.',
        ],
      },
      {
        id: 'weitere',
        titel: 'Nacken, Augen, Blutdruck',
        kurz: 'Weitere Gründe',
        saetze: [
          'Verspannte Nacken- und Schultermuskeln können Schmerzen vom Hinterkopf nach vorn ziehen lassen. Hier helfen Bewegung, Wärme und Kräftigung.',
          'Eine unpassende Brille, langes Lesen oder Bildschirmarbeit strengen die Augen an. Ein Sehtest beim Augenoptiker oder in der Augenarztpraxis klärt das.',
          'Bluthochdruck macht selten Kopfschmerzen, meist erst bei sehr hohen Werten. Wir messen trotzdem nach – das gehört zur Abklärung.',
          'Auch Schnarchen mit Atemaussetzern, zu wenig Trinken, Alkohol oder ein plötzlicher Verzicht auf Kaffee können Kopfschmerz auslösen.',
        ],
      },
      {
        id: 'tagebuch',
        titel: 'Das Kopfschmerztagebuch',
        kurz: 'Tagebuch',
        saetze: [
          'Notieren Sie vier Wochen lang jeden Tag mit Kopfschmerz.',
          'Wann, wie lange und wie stark? Wo genau, und wie fühlt er sich an?',
          'Was haben Sie genommen, und hat es geholfen? Was ging voraus?',
          'So erkennen wir die Art des Kopfschmerzes, seine Auslöser und wie oft Sie Tabletten brauchen.',
        ],
      },
    ],
    warnung:
      'Sofort 112: schlagartig heftigster Kopfschmerz, Fieber mit steifem Nacken, Lähmung, Sprach- oder Sehstörung, Verwirrtheit. Bald melden: neuer Kopfschmerz ab 50 oder ganz anders als sonst.',
  },
  {
    id: 'chronischer-husten',
    name: 'Chronischer Husten',
    zusatz: 'länger als acht Wochen',
    gebiet: 'beschwerden',
    suche:
      'husten dauerhusten reizhusten hustenreiz raeuspern postnasal drip schleim nebenhoehlen sinusitis asthma hustenvariante reflux sodbrennen ace-hemmer ramipril enalapril sartan rauchen raucherhusten copd lungenfunktion roentgen',
    seiten: [
      {
        id: 'ueberblick',
        titel: 'Husten, der nicht weggeht',
        kurz: 'Überblick',
        saetze: [
          'Nach einer Erkältung kann Husten bis zu acht Wochen dauern – das ist normal. Hält er länger an, sprechen wir von chronischem Husten und suchen die Ursache.',
          'Am häufigsten stecken dahinter: Rauchen, Schleim aus Nase und Nebenhöhlen, Asthma, aufsteigende Magensäure oder ein Blutdruckmittel.',
          'Oft kommen zwei Ursachen zusammen. Dann wird der Husten erst besser, wenn beide behandelt sind.',
          'Zur Abklärung gehören Gespräch, Abhören, eine Lungenfunktionsprüfung und meist ein Röntgenbild der Lunge.',
        ],
      },
      {
        id: 'asthma',
        titel: 'Asthma',
        kurz: 'Asthma',
        bild: 'asthma',
        saetze: [
          'Asthma kann sich allein als Husten zeigen – ganz ohne Pfeifen oder Atemnot.',
          'Typisch ist trockener Husten nachts und früh am Morgen, bei kalter Luft, Anstrengung oder Lachen, nach Kontakt mit Pollen, Tieren oder Staub.',
          'Die Bronchien sind überempfindlich und verengen sich schnell. Das zeigt die Lungenfunktionsprüfung, manchmal erst mit einem Reiztest.',
          'Ein Kortisonspray zum Inhalieren beruhigt die Bronchien. Wird der Husten damit nach einigen Wochen besser, bestätigt das die Diagnose.',
        ],
      },
      {
        id: 'nase',
        titel: 'Nase und Nebenhöhlen',
        kurz: 'Nase',
        saetze: [
          'Bei Dauerschnupfen, Allergie oder entzündeten Nebenhöhlen läuft Schleim hinten in den Rachen. Dort reizt er und löst Husten aus.',
          'Typisch sind ständiges Räuspern, das Gefühl von Schleim im Hals, eine verstopfte Nase und Husten vor allem im Liegen.',
          'Behandelt wird die Nase: mit Nasenspülungen mit Salzwasser, einem Kortison-Nasenspray und bei Allergie mit Mitteln gegen die Allergie.',
          'Abschwellende Nasensprays bitte nur wenige Tage nehmen – auf Dauer schädigen sie die Schleimhaut.',
        ],
      },
      {
        id: 'reflux',
        titel: 'Aufsteigende Magensäure',
        kurz: 'Reflux',
        bild: 'reflux',
        saetze: [
          'Steigt Magensaft in die Speiseröhre zurück, kann das über Nerven Hustenreiz auslösen. Manchmal gelangen kleine Mengen bis an den Kehlkopf.',
          'Hinweise sind Sodbrennen, saures Aufstoßen, Heiserkeit und Husten nach dem Essen oder im Liegen.',
          'Das hilft: abends früh und leicht essen, das Kopfende des Bettes höher stellen, weniger Alkohol und Kaffee, nicht rauchen, bei Übergewicht abnehmen.',
          'Säureblocker helfen gegen den Husten nur, wenn auch Sodbrennen oder saures Aufstoßen besteht. Dann versuchen wir es einige Wochen damit.',
        ],
      },
      {
        id: 'medikamente',
        titel: 'Husten durch Medikamente',
        kurz: 'Medikamente',
        saetze: [
          'Blutdruckmittel aus der Gruppe der ACE-Hemmer lösen bei etwa jedem Zehnten einen trockenen Reizhusten aus. Ihre Namen enden auf -pril, etwa Ramipril oder Enalapril.',
          'Der Husten kann wenige Tage, aber auch Monate nach dem Beginn der Einnahme anfangen.',
          'Setzen Sie das Mittel bitte nicht selbst ab. Wir tauschen es gegen ein ähnlich wirksames, das keinen Husten macht, zum Beispiel ein Sartan.',
          'Danach klingt der Husten meist innerhalb von vier Wochen ab, manchmal dauert es bis zu drei Monate.',
        ],
      },
      {
        id: 'rauchen',
        titel: 'Rauchen und COPD',
        kurz: 'Rauchen',
        bild: 'copd',
        saetze: [
          'Rauchen ist die häufigste Ursache für Dauerhusten. Die Bronchien bilden mehr Schleim, der morgens abgehustet wird.',
          'Daraus kann eine COPD werden: Die Bronchien bleiben dauerhaft eng. Das zeigt die Lungenfunktionsprüfung.',
          'Nach dem Rauchstopp lässt der Husten oft innerhalb weniger Wochen nach. Wir helfen Ihnen dabei.',
          'Verändert sich Ihr gewohnter Raucherhusten, sagen Sie es uns bitte.',
        ],
      },
    ],
    warnung:
      'Bitte rasch melden: Blut im Auswurf, Luftnot, Fieber, Nachtschweiß, ungewollter Gewichtsverlust oder Heiserkeit über drei Wochen.',
  },
];
