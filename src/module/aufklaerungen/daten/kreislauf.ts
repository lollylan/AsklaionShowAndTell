import type { Krankheit } from './typen';

// Kreislauf: Ohnmacht und niedriger Blutdruck, Brustschmerz (mit Herzinfarkt-Warnzeichen) und
// Gerinnungshemmer im Alltag. Orientiert an DEGAM-Leitlinie Brustschmerz und ESC/DGK
// (Synkope, Vorhofflimmern, Lungenembolie), Stand 2026.

export const KREISLAUF: Krankheit[] = [
  {
    id: 'ohnmacht',
    name: 'Ohnmacht und niedriger Blutdruck',
    zusatz: 'Synkope, Kreislaufkollaps',
    gebiet: 'herz',
    suche:
      'synkope kollaps kreislaufkollaps umkippen bewusstlos ohnmaechtig schwarz vor augen hypotonie niedriger blutdruck orthostatisch orthostase aufstehen vasovagal reflexsynkope schellong stehtest kipptisch gegenmanoever',
    was: [
      'Bei einer Ohnmacht bekommt das Gehirn für kurze Zeit zu wenig Blut. Man wird für Sekunden bewusstlos, sackt zusammen und wacht von selbst rasch wieder auf.',
      'Oft gehen Vorboten voraus: Schwarzwerden vor Augen, Schwitzen, Übelkeit, Blässe und weiche Knie.',
      'Ein niedriger Blutdruck ohne Beschwerden ist dagegen keine Krankheit. Er schont sogar die Gefäße.',
      'Zum Problem wird er erst, wenn er Schwindel oder Ohnmachten macht, etwa beim Aufstehen.',
    ],
    ursachen: [
      'Am häufigsten ist eine harmlose Reflex-Ohnmacht: Nach langem Stehen, bei Hitze, Schmerz, Schreck oder beim Anblick von Blut sacken Puls und Blutdruck kurz ab.',
      'Beim schnellen Aufstehen versackt das Blut in den Beinen. Das trifft vor allem ältere Menschen, bei wenig Trinken, Infekten, Alkohol und bei Blutdrucksenkern oder Wassertabletten.',
      'Selten steckt das Herz dahinter, etwa eine Rhythmusstörung oder eine enge Herzklappe. Darauf deuten eine Ohnmacht bei Belastung oder im Liegen, ohne Vorboten oder mit Herzrasen.',
      'Gefährlich ist eine Ohnmacht vor allem durch Stürze und Verletzungen.',
    ],
    behandlung: [
      'Jede erste Ohnmacht klären wir ab: Wir fragen genau nach dem Hergang, messen den Blutdruck im Liegen und im Stehen und schreiben ein EKG.',
      'Je nach Verdacht folgen ein Langzeit-EKG, ein Ultraschall des Herzens oder Blutwerte.',
      'Bei der harmlosen Form helfen Wissen und Verhalten am meisten. Wir prüfen auch Ihre Medikamente und passen Blutdrucksenker oder Wassertabletten an.',
      'Ob und wann Sie wieder Auto fahren dürfen, hängt von der Ursache ab. Das besprechen wir mit Ihnen.',
    ],
    selbst: [
      'Spüren Sie Vorboten, legen Sie sich sofort hin und lagern Sie die Beine hoch. Geht das nicht, setzen Sie sich und senken den Kopf.',
      'Gegenmanöver helfen: Beine überkreuzen und fest anspannen, Fäuste ballen oder die Hände ineinander verhaken und kräftig auseinanderziehen.',
      'Stehen Sie langsam auf: erst kurz sitzen, die Füße bewegen, dann aufstehen.',
      'Trinken Sie über den Tag verteilt genug – wenn wir nichts anderes besprochen haben, etwa zwei Liter. Mehr Salz oder Kompressionsstrümpfe nur nach Rücksprache.',
    ],
    warnung:
      'Ohnmacht bei Belastung oder im Liegen, mit Brustschmerz, Herzrasen oder Luftnot, oder jemand wacht nicht rasch wieder auf: sofort 112.',
  },
  {
    id: 'brustschmerz',
    name: 'Brustschmerz',
    zusatz: 'Schmerzen oder Druck in der Brust',
    gebiet: 'beschwerden',
    suche:
      'brustschmerzen thoraxschmerz brustenge engegefuehl druck auf der brust herzschmerzen stiche herzstechen herzinfarkt infarkt angina pectoris khk lungenembolie pneumothorax rippenfell perikarditis herzbeutel aortendissektion brustwandsyndrom rippen interkostal muskeln wirbel sodbrennen reflux speiseroehre panik angst 112',
    seiten: [
      {
        id: 'ueberblick',
        titel: 'Brustschmerz: Was steckt dahinter?',
        kurz: 'Überblick',
        bild: 'brustschmerz',
        saetze: [
          'In der Brust liegen Herz, Lunge, Speiseröhre, Rippen und Muskeln eng beieinander. Alle können Schmerzen machen, die sich ähnlich anfühlen.',
          'Am häufigsten kommen die Schmerzen von Muskeln und Rippen und sind harmlos. Das Herz steckt seltener dahinter, ist aber das Wichtigste.',
          'Deshalb denken wir zuerst an das Herz: Wir fragen genau nach, untersuchen Sie, schreiben ein EKG und bestimmen manchmal einen Herzwert im Blut.',
          'Starker oder neuer Brustschmerz, der nicht vergeht: nicht abwarten, sondern 112 rufen.',
        ],
      },
      {
        id: 'herzinfarkt',
        titel: 'Herzinfarkt erkennen',
        kurz: 'Herzinfarkt',
        bild: 'herzinfarkt-zeichen',
        saetze: [
          'Typisch ist ein starker Druck, eine Enge oder ein Brennen hinter dem Brustbein, das länger als fünf Minuten anhält.',
          'Der Schmerz kann in Arme, Hals, Kiefer, Rücken oder Oberbauch ausstrahlen. Oft kommen kalter Schweiß, Übelkeit, Luftnot und Angst dazu.',
          'Frauen, ältere Menschen und Menschen mit Diabetes haben oft weniger typische Zeichen: nur Luftnot, Übelkeit, Druck im Oberbauch oder große Schwäche.',
          'Rufen Sie sofort 112. Fahren Sie nicht selbst, und kommen Sie nicht erst in die Praxis – jede Minute zählt für den Herzmuskel.',
          'Bis Hilfe kommt: hinsetzen, enge Kleidung öffnen, die Tür entriegeln und nicht allein bleiben.',
        ],
      },
      {
        id: 'herz',
        titel: 'Das Herz und die große Schlagader',
        kurz: 'Herz',
        bild: 'khk',
        saetze: [
          'Bei verengten Herzkranzgefäßen kommt der Druck in der Brust bei Belastung, etwa beim Treppensteigen oder in der Kälte. In Ruhe vergeht er nach wenigen Minuten.',
          'Kommen die Beschwerden neu, häufiger, schon bei kleiner Belastung oder in Ruhe, droht ein Herzinfarkt. Dann noch am selben Tag abklären, bei starken Beschwerden 112.',
          'Eine Entzündung des Herzbeutels, oft nach einem Infekt, sticht und wird im Liegen schlimmer und im Vorbeugen besser.',
          'Selten reißt die Wand der großen Schlagader ein. Das macht einen plötzlichen, heftigen Schmerz, der oft in den Rücken zieht – ein Notfall.',
        ],
      },
      {
        id: 'lunge',
        titel: 'Lunge und Lungenembolie',
        kurz: 'Lunge',
        bild: 'thrombose',
        saetze: [
          'Bei einer Lungenembolie verstopft ein Blutgerinnsel, meist aus einer Beinvene, ein Gefäß in der Lunge.',
          'Zeichen sind plötzliche Luftnot, Schmerzen beim Atmen, Herzrasen, manchmal Bluthusten. Oft ging ein dickes Bein, eine Operation oder eine lange Reise voraus. Das ist ein Notfall.',
          'Eine Lungen- oder Rippenfellentzündung schmerzt beim tiefen Einatmen und Husten, meist mit Fieber.',
          'Fällt ein Lungenflügel zusammen, sticht es plötzlich auf einer Seite, dazu kommt Luftnot. Das trifft öfter junge, schlanke Menschen und Raucher.',
        ],
      },
      {
        id: 'brustwand',
        titel: 'Rippen, Muskeln und Wirbel',
        kurz: 'Rippen',
        bild: 'brustwand',
        saetze: [
          'Die häufigste Ursache sind verspannte Muskeln, gereizte Rippenansätze am Brustbein oder eine blockierte Brustwirbelsäule.',
          'Typisch: Der Schmerz sitzt an einer Stelle, lässt sich mit dem Finger auslösen und ändert sich beim Drehen, Bücken oder tiefen Atmen.',
          'Oft gehen Husten, ungewohnte Arbeit, Sport oder eine schlechte Haltung voraus. Auch eine Gürtelrose kann schon vor den Bläschen brennen.',
          'Wärme, Bewegung und Dehnen helfen, kurzzeitig auch ein Schmerzmittel. Meist vergeht es in einigen Tagen bis Wochen.',
        ],
      },
      {
        id: 'speiseroehre-seele',
        titel: 'Speiseröhre, Magen und Seele',
        kurz: 'Magen, Seele',
        bild: 'reflux',
        saetze: [
          'Steigt Magensäure in die Speiseröhre, brennt es hinter dem Brustbein – oft nach dem Essen, im Liegen oder beim Bücken.',
          'Auch ein Krampf der Speiseröhre kann sich wie ein Herzschmerz anfühlen.',
          'Bei Angst und Panik spüren viele Enge, Herzrasen und Kribbeln. Die Beschwerden sind echt, aber ungefährlich.',
          'An Magen oder Seele denken wir erst, wenn das Herz untersucht ist.',
        ],
      },
    ],
    warnung:
      'Sofort 112: Druck oder Enge in der Brust länger als fünf Minuten, Brustschmerz in Ruhe, mit Luftnot, kaltem Schweiß oder Übelkeit, plötzliche Atemnot oder heftiger Schmerz, der in den Rücken zieht. Nicht selbst fahren.',
  },
  {
    id: 'gerinnungshemmer',
    name: 'Gerinnungshemmer im Alltag',
    zusatz: 'Blutverdünner: DOAK und Marcumar',
    gebiet: 'herz',
    suche:
      'blutverduenner blutverduennung antikoagulation antikoagulanz doak noak apixaban eliquis rivaroxaban xarelto edoxaban lixiana dabigatran pradaxa phenprocoumon marcumar falithrom vitamin-k-antagonist cumarin inr quick gerinnung blutung blaue flecken ausweis zahnarzt operation pause bridging heparin schmerzmittel ibuprofen diclofenac ass johanniskraut',
    seiten: [
      {
        id: 'ueberblick',
        titel: 'Wofür ein Gerinnungshemmer?',
        kurz: 'Überblick',
        bild: 'gerinnungshemmer',
        saetze: [
          'Gerinnungshemmer – oft Blutverdünner genannt – verhindern, dass sich in Herz und Adern Blutgerinnsel bilden.',
          'Sie schützen vor Schlaganfall bei Vorhofflimmern und vor neuen Gerinnseln nach Thrombose oder Lungenembolie. Manche brauchen sie wegen einer künstlichen Herzklappe.',
          'Am häufigsten sind die neueren Mittel, kurz DOAK: Eliquis, Xarelto, Lixiana und Pradaxa. Sie wirken in fester Dosis, Kontrollen der Gerinnung braucht es nicht.',
          'Das ältere Marcumar wirkt über Vitamin K und muss regelmäßig mit dem INR-Wert kontrolliert werden.',
          'Jeder Gerinnungshemmer erhöht die Neigung zu bluten. Der Schutz überwiegt aber deutlich, wenn wir ihn verordnen.',
        ],
      },
      {
        id: 'einnahme',
        titel: 'Richtig einnehmen',
        kurz: 'Einnahme',
        saetze: [
          'Nehmen Sie die Tabletten jeden Tag zur gleichen Zeit. Die DOAK wirken nur etwa einen Tag – schon eine vergessene Dosis lässt den Schutz sinken.',
          'Eliquis und Pradaxa nimmt man zweimal am Tag, Xarelto und Lixiana einmal. Xarelto in höherer Dosis gehört zu einer Mahlzeit.',
          'Vergessen? Bei zweimal täglich können Sie die Dosis bis etwa sechs Stunden später nachholen, bei einmal täglich bis etwa zwölf Stunden. Sonst lassen Sie sie aus – nie die doppelte Menge nehmen.',
          'Setzen Sie den Gerinnungshemmer nie von sich aus ab, auch nicht bei blauen Flecken. Sprechen Sie vorher mit uns.',
        ],
      },
      {
        id: 'marcumar',
        titel: 'Marcumar und der INR-Wert',
        kurz: 'Marcumar',
        bild: 'gerinnungshemmer-inr',
        saetze: [
          'Bei Marcumar zeigt der INR-Wert, wie dünn das Blut ist. Ohne Gerinnungshemmer liegt er bei etwa 1, das Ziel ist meist 2 bis 3.',
          'Ist der Wert zu niedrig, schützt Marcumar nicht genug. Ist er zu hoch, steigt die Blutungsgefahr.',
          'Vitamin K steckt vor allem in grünem Gemüse. Sie müssen nicht darauf verzichten – essen Sie es aber gleichmäßig, nicht mal viel und mal gar nicht.',
          'Infekte, Durchfall, Alkohol und neue Medikamente verschieben den Wert. Dann kontrollieren wir früher. Manche messen den INR auch selbst zu Hause.',
        ],
      },
      {
        id: 'medikamente',
        titel: 'Schmerzmittel und andere Medikamente',
        kurz: 'Medikamente',
        saetze: [
          'Schmerzmittel wie Ibuprofen, Diclofenac oder Naproxen und ASS erhöhen zusammen mit einem Gerinnungshemmer die Blutungsgefahr, vor allem im Magen.',
          'Besser geeignet sind meist Paracetamol oder Metamizol. Fragen Sie uns, bevor Sie länger ein Schmerzmittel nehmen.',
          'ASS nehmen Sie nur zusätzlich, wenn wir es ausdrücklich verordnet haben, etwa nach einem Stent.',
          'Auch Antibiotika, manche Herzmittel und Johanniskraut verändern die Wirkung. Sagen Sie bei jedem neuen Rezept und in der Apotheke, dass Sie einen Gerinnungshemmer nehmen.',
        ],
      },
      {
        id: 'eingriffe',
        titel: 'Vor Eingriffen und unterwegs',
        kurz: 'Eingriffe',
        saetze: [
          'Sagen Sie vor jeder Operation, Darm- oder Magenspiegelung, Spritze in Gelenk oder Rücken und beim Zahnarzt rechtzeitig Bescheid.',
          'Ob und wie lange Sie pausieren, legen die Ärzte für jeden Eingriff fest. Bei den DOAK reichen oft ein bis zwei Tage, bei Marcumar dauert es länger.',
          'Kleine Eingriffe beim Zahnarzt oder an der Haut gehen oft ohne Pause.',
          'Tragen Sie Ihren Ausweis für Gerinnungshemmer und Ihren Medikamentenplan immer bei sich. Nehmen Sie auf Reisen genug Tabletten im Handgepäck mit.',
        ],
      },
      {
        id: 'blutung',
        titel: 'Blutungszeichen',
        kurz: 'Blutungen',
        saetze: [
          'Leichtes Zahnfleisch- oder Nasenbluten und mehr blaue Flecken sind häufig. Kommt es oft, melden Sie sich.',
          'Achten Sie auf roten oder braunen Urin, schwarzen oder blutigen Stuhl und Blut beim Husten oder Erbrechen.',
          'Nach einem Sturz auf den Kopf: noch am selben Tag ärztlich abklären lassen.',
        ],
      },
    ],
    warnung:
      'Sofort 112: Blutung, die nicht steht, Bluterbrechen oder schwarzer Stuhl mit Schwäche, nach Kopfverletzung Kopfschmerz, Erbrechen oder Benommenheit, plötzliche Lähmung oder Sprachstörung.',
  },
];
