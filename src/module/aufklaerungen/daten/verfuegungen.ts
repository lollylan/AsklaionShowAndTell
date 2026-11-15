import type { Krankheit } from './typen';

// Vorsorgedokumente und Palliativversorgung. Wie bei den Beschwerden frei benannte
// Seiten; Seiten ohne `bild` zeigen die Hauptzeichnung unter ../bilder/<id>.tsx.
// Rechtslage Deutschland, nur sinngemäß – keine Rechtsberatung.

export const VERFUEGUNGEN: Krankheit[] = [
  {
    id: 'patientenverfuegung',
    name: 'Patientenverfügung',
    zusatz: 'Behandlungswünsche für den Ernstfall',
    gebiet: 'verfuegungen',
    suche:
      'patientenverfuegung verfuegung vorsorge behandlungswunsch wiederbelebung reanimation beatmung sonde ernaehrung dialyse koma demenz lebensende apparatemedizin',
    seiten: [
      {
        id: 'wozu',
        titel: 'Wozu eine Patientenverfügung?',
        kurz: 'Wozu',
        saetze: [
          'In einer Patientenverfügung legen Sie fest, welche Behandlung Sie wünschen – für den Fall, dass Sie selbst nicht mehr entscheiden oder sich äußern können.',
          'Das kann nach einem Unfall, einem schweren Schlaganfall, im Koma oder bei weit fortgeschrittener Demenz sein – in jedem Alter.',
          'Passen Ihre Festlegungen auf die Lage, sind Ärztinnen und Ärzte daran gebunden.',
          'Sie nehmen damit auch Ihren Angehörigen eine schwere Last ab: Niemand muss raten, was Sie gewollt hätten.',
        ],
      },
      {
        id: 'situationen',
        titel: 'Für welche Situationen?',
        kurz: 'Situationen',
        saetze: [
          'Allgemeine Sätze wie „keine Apparatemedizin“ helfen im Ernstfall kaum. Beschreiben Sie möglichst genau, für welche Lage Ihre Wünsche gelten.',
          'Typische Situationen sind: Sie liegen im Sterben. Sie sind unheilbar krank im Endstadium. Ihr Gehirn ist schwer und wohl dauerhaft geschädigt. Eine Demenz ist weit fortgeschritten.',
          'Schreiben Sie auch auf, was Ihnen im Leben wichtig ist und was das Leben für Sie lebenswert macht.',
          'Das hilft, Ihren Willen auch in Lagen zu verstehen, an die beim Schreiben niemand gedacht hat.',
        ],
      },
      {
        id: 'massnahmen',
        titel: 'Welche Maßnahmen?',
        kurz: 'Maßnahmen',
        saetze: [
          'Für jede Situation legen Sie fest, was geschehen soll – und was nicht.',
          'Dazu gehören Wiederbelebung, künstliche Beatmung, künstliche Ernährung über eine Sonde, Dialyse, Antibiotika und die Einweisung ins Krankenhaus.',
          'Sie können eine Maßnahme ausdrücklich wünschen, ablehnen oder nur so lange wünschen, wie Aussicht auf Besserung besteht.',
          'Linderung von Schmerzen, Atemnot und Angst sowie gute Pflege bekommen Sie immer – auch wenn Sie lebensverlängernde Maßnahmen ablehnen.',
        ],
      },
      {
        id: 'erstellen',
        titel: 'So erstellen Sie sie',
        kurz: 'Erstellen',
        saetze: [
          'Die Patientenverfügung muss schriftlich sein und von Ihnen unterschrieben werden. Ein Notar ist nicht nötig.',
          'Gute Vorlagen gibt es zum Beispiel vom Bundesjustizministerium und vom Bayerischen Justizministerium. Kreuzen Sie nicht nur an, sondern ergänzen Sie in eigenen Worten.',
          'Sprechen Sie mit uns darüber: Wir erklären die Begriffe und was die Maßnahmen für Sie bedeuten würden. Auf Wunsch bestätigen wir, dass Sie dabei klar entscheiden konnten.',
          'Sie können die Verfügung jederzeit ändern oder widerrufen – auch mündlich.',
        ],
      },
      {
        id: 'aufbewahren',
        titel: 'Aufbewahren und aktuell halten',
        kurz: 'Aufbewahren',
        saetze: [
          'Bewahren Sie das Original zu Hause an einem Ort auf, den Ihre Angehörigen kennen. Eine Kopie bekommt Ihre Vertrauensperson, eine weitere unsere Praxis für Ihre Akte.',
          'Ein Hinweiskärtchen im Geldbeutel sagt im Notfall, dass es eine Verfügung gibt und wo sie liegt.',
          'Lesen Sie sie alle ein bis zwei Jahre und nach jeder schweren Erkrankung durch. Ein neues Datum mit Unterschrift zeigt, dass sie noch gilt.',
          'Am stärksten ist sie zusammen mit einer Vorsorgevollmacht: Dann gibt es jemanden, der für Ihren Willen eintritt.',
        ],
      },
    ],
    warnung: 'Sprechen Sie mit Ihren Angehörigen über Ihre Wünsche – ein Papier ersetzt das Gespräch nicht.',
  },
  {
    id: 'vorsorgevollmacht',
    name: 'Vorsorgevollmacht und Betreuungsverfügung',
    zusatz: 'Wer für Sie entscheiden darf',
    gebiet: 'verfuegungen',
    suche:
      'vorsorgevollmacht vollmacht betreuungsverfuegung betreuung betreuer betreuungsgericht notvertretung ehegatten ehepartner vorsorgeregister bundesnotarkammer notar bank kontovollmacht angehoerige vertretung',
    seiten: [
      {
        id: 'wer',
        titel: 'Wer entscheidet, wenn Sie es nicht können?',
        kurz: 'Wer entscheidet',
        saetze: [
          'Viele glauben, Ehepartner oder Kinder dürften automatisch für sie entscheiden. Das stimmt nicht.',
          'Ohne Vollmacht dürfen erwachsene Kinder, Eltern oder Lebensgefährten weder über Behandlungen entscheiden noch Verträge unterschreiben oder Ihre Bankgeschäfte erledigen.',
          'Dann bestellt das Betreuungsgericht eine rechtliche Betreuerin oder einen Betreuer. Das kann ein Angehöriger sein, aber auch eine fremde Person.',
          'Mit einer Vorsorgevollmacht bestimmen Sie selbst, wer Sie vertritt.',
        ],
      },
      {
        id: 'ehepartner',
        titel: 'Notvertretung durch den Ehepartner',
        kurz: 'Ehepartner',
        saetze: [
          'Seit 2023 dürfen sich Eheleute in einem gesundheitlichen Notfall gegenseitig vertreten, auch ohne Vollmacht. Das gilt ebenso für eingetragene Lebenspartner.',
          'Dieses Notvertretungsrecht ist eng begrenzt: nur für Fragen der Gesundheit, etwa Untersuchungen, Behandlungen und Verträge mit Klinik oder Reha – und höchstens sechs Monate.',
          'Es gilt nicht, wenn das Paar getrennt lebt, wenn jemand anderes eine Vollmacht hat oder wenn Sie widersprochen haben.',
          'Für Geld, Wohnung und Behörden – und für alles nach den sechs Monaten – braucht es weiterhin eine Vollmacht oder eine Betreuung.',
        ],
      },
      {
        id: 'vollmacht',
        titel: 'Die Vorsorgevollmacht',
        kurz: 'Vollmacht',
        saetze: [
          'Mit der Vorsorgevollmacht berechtigen Sie eine Person Ihres Vertrauens, für Sie zu handeln, wenn Sie es selbst nicht mehr können.',
          'Sie bestimmen die Bereiche: Gesundheit und Pflege, Wohnung, Behörden, Post, Geld und Vermögen.',
          'Ob die Person auch in lebensgefährliche Eingriffe einwilligen oder über Unterbringung und Bettgitter entscheiden darf, muss ausdrücklich darin stehen.',
          'Die Vollmacht beruht ganz auf Vertrauen: Ein Gericht kontrolliert die bevollmächtigte Person nicht. Sie können auch eine zweite Person als Ersatz benennen.',
        ],
      },
      {
        id: 'betreuung',
        titel: 'Die Betreuungsverfügung',
        kurz: 'Betreuung',
        saetze: [
          'Wer niemandem eine umfassende Vollmacht geben möchte, kann eine Betreuungsverfügung schreiben.',
          'Darin legen Sie fest, wen das Gericht als Betreuer bestellen soll – oder wen auf keinen Fall – und wie Sie leben möchten.',
          'Das Gericht folgt Ihren Wünschen, prüft aber die Eignung und beaufsichtigt den Betreuer. Das schützt, ist aber langsamer und aufwendiger als eine Vollmacht.',
          'Beides lässt sich verbinden: Die Betreuungsverfügung greift dann, falls die Vollmacht einmal nicht ausreicht.',
        ],
      },
      {
        id: 'praktisch',
        titel: 'Register, Bank und Notar',
        kurz: 'Praktisches',
        saetze: [
          'Im Zentralen Vorsorgeregister der Bundesnotarkammer können Sie Ihre Vollmacht für eine kleine einmalige Gebühr eintragen lassen.',
          'Gerichte und im Notfall auch Ärztinnen und Ärzte können dort nachsehen, ob es eine Vollmacht gibt und wer sie hat.',
          'Viele Banken verlangen eine eigene Konto- und Depotvollmacht. Klären Sie das rechtzeitig mit Ihrer Bank.',
          'Gehört Ihnen Haus oder Wohnung, lassen Sie die Vollmacht besser beim Notar erstellen. Unterschriften beglaubigt auch die Betreuungsstelle von Stadt oder Landkreis.',
        ],
      },
    ],
    warnung:
      'Wir beraten Sie medizinisch, nicht rechtlich. Bei Vermögen, Immobilien oder Streit in der Familie helfen Notar oder Anwalt.',
  },
  {
    id: 'palliativversorgung',
    name: 'Palliativversorgung',
    zusatz: 'Begleitung bei unheilbarer Krankheit',
    gebiet: 'verfuegungen',
    suche:
      'palliativ palliativmedizin sapv aapv palliativteam hospiz hospizdienst hospizverein palliativstation lebensende sterben sterbebegleitung angehoerige pflegezeit trauer',
    seiten: [
      {
        id: 'bedeutung',
        titel: 'Was heißt palliativ?',
        kurz: 'Was heißt das',
        saetze: [
          'Palliativ kommt vom lateinischen Wort für Mantel: Die Behandlung legt sich schützend um den Menschen, wenn eine Krankheit nicht mehr heilbar ist.',
          'Palliativ heißt nicht, dass man nichts mehr tut. Wir tun sehr viel – nur mit einem anderen Ziel: nicht mehr Heilung, sondern die bestmögliche Lebensqualität.',
          'Im Mittelpunkt stehen die Linderung von Beschwerden, Ihre Wünsche und die Zeit, die Ihnen wichtig ist.',
          'Palliativversorgung kann früh beginnen, auch neben einer Krebstherapie oder bei schwerer Herz- oder Lungenschwäche – nicht erst in den letzten Tagen.',
        ],
      },
      {
        id: 'hausarzt',
        titel: 'Begleitung durch die Hausarztpraxis',
        kurz: 'Hausarzt',
        saetze: [
          'Die meisten Menschen werden in ihrer letzten Lebensphase von ihrer Hausarztpraxis begleitet, oft gemeinsam mit einem Pflegedienst.',
          'Wir machen Hausbesuche, lindern Beschwerden, verordnen Medikamente, Hilfsmittel und Pflege und sprechen mit Ihnen und Ihren Angehörigen.',
          'Wir besprechen vorausschauend, was kommen kann und was Sie dann möchten – zum Beispiel, ob Sie zu Hause bleiben oder ins Krankenhaus wollen.',
          'Für diese Begleitung haben wir eine besondere Weiterbildung in Palliativmedizin.',
        ],
      },
      {
        id: 'sapv',
        titel: 'Das Palliativteam (SAPV)',
        kurz: 'SAPV-Team',
        saetze: [
          'Werden die Beschwerden sehr belastend oder schwer zu lindern, kommt ein spezialisiertes Palliativteam dazu. SAPV heißt spezialisierte ambulante Palliativversorgung.',
          'Im Team arbeiten Palliativärzte und Palliativpflegekräfte. Sie kommen nach Hause oder ins Pflegeheim und sind rund um die Uhr erreichbar, auch nachts und am Wochenende.',
          'Wir oder die Klinik verordnen die SAPV, die Krankenkasse übernimmt die Kosten.',
          'Das Team arbeitet eng mit uns zusammen – wir bleiben Ihre Hausarztpraxis.',
        ],
      },
      {
        id: 'hospiz',
        titel: 'Hospizdienst, Hospiz und Palliativstation',
        kurz: 'Hospiz',
        saetze: [
          'Ehrenamtliche des ambulanten Hospizdienstes besuchen Sie zu Hause. Sie haben Zeit zum Reden und Zuhören und entlasten Ihre Familie. Das ist kostenlos.',
          'Ein stationäres Hospiz ist ein kleines Haus mit wenigen Zimmern für die letzte Lebenszeit, wenn es zu Hause nicht mehr geht. Für Sie entstehen dort keine Kosten.',
          'Die Palliativstation im Krankenhaus hilft in Krisen, etwa wenn sich Beschwerden zu Hause nicht lindern lassen.',
          'Ziel ist dort meist, danach wieder nach Hause oder in ein Hospiz zu gehen.',
        ],
      },
      {
        id: 'angehoerige',
        titel: 'Hilfe für Angehörige',
        kurz: 'Angehörige',
        saetze: [
          'Angehörige tragen viel. Es ist richtig, sich Hilfe zu holen und auf die eigenen Kräfte zu achten.',
          'Ein Pflegedienst, ein Pflegegrad, Hilfsmittel wie ein Pflegebett und die Hospizhelfer entlasten.',
          'Berufstätige können sich für die Begleitung eines sterbenden Angehörigen ganz oder teilweise freistellen lassen. Auskunft geben Arbeitgeber und Pflegekasse.',
          'Auch nach dem Tod sind Sie nicht allein: Hospizvereine bieten Trauerbegleitung an.',
        ],
      },
    ],
    warnung: 'Fragen Sie früh nach Unterstützung – nicht erst, wenn es zu Hause nicht mehr geht.',
  },
  {
    id: 'symptomlinderung',
    name: 'Beschwerden am Lebensende lindern',
    zusatz: 'Symptomkontrolle in der Palliativmedizin',
    gebiet: 'verfuegungen',
    suche:
      'symptomkontrolle palliativ schmerz schmerzen morphin opioid opiat atemnot luftnot uebelkeit erbrechen unruhe angst delir essen trinken durst mundpflege bedarfsmedikation notfallplan krisenplan sedierung',
    seiten: [
      {
        id: 'schmerz',
        titel: 'Schmerzen',
        kurz: 'Schmerz',
        saetze: [
          'Schmerzen am Lebensende lassen sich fast immer gut lindern. Die Mittel gibt es nach festem Zeitplan und zusätzlich bei Bedarf, wenn der Schmerz durchbricht.',
          'Morphin und verwandte Mittel sind dabei die wichtigsten Helfer. Richtig dosiert machen sie nicht süchtig und verkürzen das Leben nicht.',
          'Anfangs kann man müde sein oder leichte Übelkeit haben – das legt sich meist nach wenigen Tagen. Gegen Verstopfung braucht es von Anfang an ein Abführmittel.',
          'Es gibt sie als Tabletten, Tropfen, Pflaster oder über eine kleine Pumpe unter die Haut, wenn das Schlucken schwerfällt.',
        ],
      },
      {
        id: 'atemnot',
        titel: 'Atemnot',
        kurz: 'Atemnot',
        saetze: [
          'Atemnot macht Angst – und Angst verstärkt die Atemnot. Diesen Kreis kann man durchbrechen.',
          'Hilfreich sind ein aufrechter Oberkörper, ein offenes Fenster und ein kühler Luftzug im Gesicht, etwa von einem kleinen Handventilator.',
          'Morphin in niedriger Dosis lindert Atemnot sehr wirksam. Sauerstoff hilft nur, wenn der Sauerstoffwert im Blut tatsächlich zu niedrig ist.',
          'Gegen die Angst hilft zusätzlich ein beruhigendes Mittel, das unter der Zunge zergeht.',
        ],
      },
      {
        id: 'unruhe',
        titel: 'Übelkeit, Unruhe und Angst',
        kurz: 'Übelkeit, Angst',
        saetze: [
          'Gegen Übelkeit gibt es gut wirksame Mittel, auch als Zäpfchen oder Spritze unter die Haut. Wir suchen zugleich nach der Ursache, etwa Verstopfung oder Nebenwirkungen.',
          'Unruhe und Verwirrtheit sind am Lebensende häufig. Oft helfen vertraute Menschen, ruhiges Licht und ein Blick auf Schmerzen, eine volle Blase oder Durst.',
          'Angst und Sorgen dürfen ausgesprochen werden. Gespräche, Seelsorge und bei Bedarf beruhigende Medikamente helfen.',
          'Lassen sich Beschwerden anders nicht mehr lindern, kann man den Schlaf gezielt vertiefen. Das besprechen wir immer gemeinsam mit Ihnen und Ihren Angehörigen.',
        ],
      },
      {
        id: 'essen',
        titel: 'Essen und Trinken am Lebensende',
        kurz: 'Essen, Trinken',
        saetze: [
          'Am Lebensende lassen Hunger und Durst von selbst nach. Der Körper braucht weniger und kann Nahrung nicht mehr gut verarbeiten.',
          'Das gehört zum natürlichen Sterben: Niemand verhungert oder verdurstet dabei.',
          'Künstliche Ernährung oder Infusionen belasten jetzt oft mehr, als sie helfen – etwa mit Wasser in der Lunge oder geschwollenen Beinen.',
          'Gegen das Durstgefühl hilft ein feuchter Mund: kleine Schlucke, Eisstückchen, Mundpflege mit dem Lieblingsgetränk. Essen darf, wer mag – was schmeckt, ist erlaubt.',
        ],
      },
      {
        id: 'notfallplan',
        titel: 'Bedarfsmedikamente und Notfallplan',
        kurz: 'Notfallplan',
        saetze: [
          'Für Krisen legen wir Bedarfsmedikamente bereit, die zu Hause griffbereit liegen – gegen Schmerz, Atemnot, Übelkeit und Unruhe.',
          'Ein schriftlicher Plan sagt Angehörigen und Pflegedienst, wann welches Mittel in welcher Menge gegeben werden darf.',
          'Dort steht auch, wen man in einer Krise zuerst anruft und welche Maßnahmen Sie nicht mehr wünschen.',
          'Ist niemand erreichbar, ist der Notruf nicht falsch. Legen Sie dann Notfallplan und Patientenverfügung bereit.',
        ],
      },
    ],
    warnung: 'In einer Krise zuerst das Palliativteam oder uns anrufen – die Nummern stehen im Notfallplan.',
  },
  {
    id: 'pflegegrad',
    name: 'Pflegegrad beantragen',
    zusatz: 'Leistungen der Pflegeversicherung',
    gebiet: 'verfuegungen',
    suche:
      'pflegegrad pflegestufe pflegekasse pflegeversicherung antrag begutachtung medizinischer dienst mdk md medicproof gutachten pflegetagebuch pflegegeld pflegedienst sachleistung entlastungsbetrag kurzzeitpflege verhinderungspflege tagespflege widerspruch hoeherstufung pflegestuetzpunkt pflegeberatung',
    seiten: [
      {
        id: 'wann',
        titel: 'Wann lohnt sich ein Antrag?',
        kurz: 'Wann',
        saetze: [
          'Ein Pflegegrad kommt infrage, wenn Sie im Alltag dauerhaft Hilfe brauchen – voraussichtlich für mindestens sechs Monate.',
          'Etwa beim Waschen, Anziehen, Essen, Aufstehen und Gehen, beim Einnehmen der Medikamente oder weil das Gedächtnis nachlässt.',
          'Es zählt nicht die Diagnose, sondern wie selbstständig Sie im Alltag noch sind.',
          'Auch wer nur wenig Unterstützung braucht, kann schon Leistungen bekommen. Ein Antrag schadet nicht.',
        ],
      },
      {
        id: 'antrag',
        titel: 'Der Antrag',
        kurz: 'Antrag',
        saetze: [
          'Den Antrag stellen Sie bei Ihrer Pflegekasse – sie gehört zu Ihrer Krankenkasse. Ein Anruf genügt, das Formular kommt dann per Post.',
          'Leistungen gibt es ab dem Monat, in dem Sie den Antrag gestellt haben. Darum lieber früh anrufen und das Datum notieren.',
          'Angehörige können den Antrag für Sie stellen, wenn Sie sie dazu bevollmächtigen.',
          'Die Kasse entscheidet in der Regel innerhalb von fünf Wochen. In einer Palliativsituation geht es deutlich schneller.',
        ],
      },
      {
        id: 'begutachtung',
        titel: 'Die Begutachtung',
        kurz: 'Begutachtung',
        saetze: [
          'Eine Gutachterin oder ein Gutachter des Medizinischen Dienstes besucht Sie zu Hause, bei Privatversicherten von Medicproof. Manchmal findet das Gespräch am Telefon statt.',
          'Geprüft wird, was Sie selbst noch können: sich bewegen, sich versorgen, sich zurechtfinden, mit Krankheit und Medikamenten umgehen und den Tag gestalten.',
          'Führen Sie vorher ein bis zwei Wochen ein Pflegetagebuch: Wobei brauchen Sie Hilfe, wie oft und wie lange?',
          'Zeigen Sie sich nicht besser, als es ist. Eine vertraute Person sollte dabei sein; legen Sie Arztbriefe und Medikamentenplan bereit.',
        ],
      },
      {
        id: 'grade',
        titel: 'Die Pflegegrade',
        kurz: 'Pflegegrade',
        saetze: [
          'Es gibt fünf Pflegegrade: von 1 für geringe bis 5 für schwerste Einschränkungen der Selbstständigkeit.',
          'Ab Pflegegrad 2 gibt es Pflegegeld, wenn Angehörige pflegen, oder Sachleistungen für einen Pflegedienst – beides lässt sich kombinieren.',
          'Dazu kommen ein Entlastungsbetrag für Hilfe im Alltag, Tages-, Kurzzeit- und Verhinderungspflege, Pflegehilfsmittel und Zuschüsse für den Umbau der Wohnung.',
          'Die Beträge ändern sich regelmäßig – die aktuellen nennt Ihnen die Pflegekasse.',
        ],
      },
      {
        id: 'beratung',
        titel: 'Widerspruch und Beratung',
        kurz: 'Beratung',
        saetze: [
          'Sind Sie mit dem Bescheid nicht einverstanden, können Sie innerhalb eines Monats Widerspruch einlegen. Fordern Sie das Gutachten an und schreiben Sie, was nicht berücksichtigt wurde.',
          'Wird es später schlechter, stellen Sie einen Antrag auf Höherstufung.',
          'Kostenlose, unabhängige Beratung bekommen Sie beim Pflegestützpunkt – auch in Würzburg – und bei der Pflegeberatung Ihrer Pflegekasse.',
          'Gern unterstützen wir Sie mit Befunden und einer ärztlichen Stellungnahme.',
        ],
      },
    ],
    warnung: 'Notieren Sie, wann Sie den Antrag gestellt haben – ab diesem Monat zählen die Leistungen.',
  },
];
