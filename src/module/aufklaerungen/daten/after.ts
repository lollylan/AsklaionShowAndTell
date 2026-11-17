import type { Krankheit } from './typen';

// Beschwerden am After: Hämorrhoiden, Analvenenthrombose, Analekzem und ein Vergleich.

export const AFTER: Krankheit[] = [
  {
    id: 'haemorrhoiden',
    name: 'Hämorrhoiden',
    zusatz: 'Hämorrhoidalleiden',
    gebiet: 'bauch',
    suche:
      'hämorrhoidalleiden hamorrhoiden haemorrhoiden hämorrhoidalpolster after enddarm blut am papier blutung juckreiz nässen vorfall prolaps gummibandligatur ligatur verödung sklerosierung proktologe proktologie',
    was: [
      'Hämorrhoiden hat jeder Mensch: Es sind Gefäßpolster am Ende des Enddarms. Zusammen mit dem Schließmuskel halten sie den After dicht.',
      'Beschwerden machen sie erst, wenn sie sich vergrößern. Man unterscheidet vier Grade – von leicht vergrößert (Grad I) bis dauerhaft nach außen gefallen (Grad IV).',
      'Typisch ist hellrotes Blut auf dem Toilettenpapier oder auf dem Stuhl, dazu Jucken, Nässen oder ein Druckgefühl.',
      'Größere Hämorrhoiden treten beim Pressen nach außen. Anfangs gleiten sie von selbst zurück, später muss man sie zurückschieben.',
    ],
    ursachen: [
      'Starkes Pressen beim Stuhlgang staut das Blut in den Polstern – mit der Zeit dehnen sie sich aus.',
      'Das passiert vor allem bei Verstopfung und hartem Stuhl, bei wenig Ballaststoffen im Essen und wenn man zu wenig trinkt.',
      'Auch langes Sitzen auf der Toilette (etwa mit dem Handy), schweres Heben, Übergewicht und eine Schwangerschaft begünstigen sie.',
      'Wichtig: Blut im Stuhl kann auch andere Gründe haben, bis hin zu Darmkrebs. Deshalb klären wir jede Blutung ab – ab etwa 50 Jahren oder bei Warnzeichen mit einer Darmspiegelung.',
    ],
    behandlung: [
      'Am wichtigsten ist ein weicher, regelmäßiger Stuhlgang. Das allein bessert leichte Beschwerden oft schon deutlich.',
      'Salben und Zäpfchen lindern Jucken und Brennen, verkleinern die Hämorrhoiden aber nicht. Mittel mit Kortison nur kurz verwenden.',
      'Bei Grad I und II kann die proktologische Praxis (Fachleute für den Enddarm) die Polster mit einem Gummiband abbinden oder veröden. Das geht ohne Narkose und ist meist kaum schmerzhaft.',
      'Bei Grad III und IV, oder wenn das nicht hilft, ist eine Operation möglich.',
    ],
    selbst: [
      'Essen Sie ballaststoffreich (Vollkorn, Gemüse, Obst) und trinken Sie genug. Flohsamenschalen machen den Stuhl zusätzlich weich.',
      'Gehen Sie zur Toilette, wenn Sie müssen, pressen Sie nicht und bleiben Sie nur kurz sitzen – das Handy bleibt draußen.',
      'Reinigen Sie den After sanft mit klarem Wasser und tupfen Sie ihn trocken.',
      'Verzichten Sie auf feuchte Tücher mit Duft- und Konservierungsstoffen. Sie reizen die Haut und lösen oft ein Ekzem aus.',
    ],
    warnung:
      'Viel Blut, schwarzer Stuhl, Blut mit Gewichtsverlust oder veränderter Verdauung: bald in die Praxis. Fieber mit starken Schmerzen am After: am selben Tag.',
  },
  {
    id: 'analvenenthrombose',
    name: 'Analvenenthrombose',
    zusatz: 'Blutgerinnsel am After',
    gebiet: 'bauch',
    suche:
      'perianalthrombose perianalvenenthrombose analthrombose äußere hämorrhoide aeussere haemorrhoide knoten am after blauer knoten blutgerinnsel stichinzision inzision',
    was: [
      'Bei einer Analvenenthrombose bildet sich in einer kleinen Vene am Afterrand ein Blutgerinnsel.',
      'Plötzlich ist dort ein praller, bläulicher Knoten zu tasten, erbsen- bis kirschgroß. Er schmerzt oft stark, vor allem beim Sitzen und beim Stuhlgang.',
      'Oft wird er „äußere Hämorrhoide“ genannt. Das stimmt nicht: Hämorrhoiden liegen innen im Enddarm, die Thrombose außen unter der Haut.',
      'Sie ist harmlos und hat nichts mit einer Thrombose im Bein zu tun. Eine Lungenembolie droht nicht.',
    ],
    ursachen: [
      'Ausgelöst wird sie durch kurzen, starken Druck auf die Venen am After: Pressen beim Stuhlgang, schweres Heben, Husten oder Sport.',
      'Auch langes Sitzen, Verstopfung oder Durchfall, eine Schwangerschaft und die Geburt begünstigen sie.',
      'Sie trifft häufig jüngere, sonst gesunde Menschen.',
      'Manchmal platzt der Knoten auf und blutet etwas. Das sieht erschreckend aus, ist aber meist harmlos.',
    ],
    behandlung: [
      'Meist heilt der Knoten in ein bis drei Wochen von selbst ab. Der Körper baut das Gerinnsel ab; manchmal bleibt eine kleine, harmlose Hautfalte.',
      'Gegen die Schmerzen helfen Schmerzmittel wie Ibuprofen und eine betäubende Salbe. Lauwarme Sitzbäder tun vielen gut.',
      'Sind die Schmerzen in den ersten ein bis drei Tagen sehr stark, kann der Knoten in örtlicher Betäubung mit einem kleinen Schnitt geöffnet und das Gerinnsel entfernt werden.',
      'Das macht die chirurgische oder proktologische Praxis. Die Erleichterung kommt meist sofort.',
    ],
    selbst: [
      'Sorgen Sie für weichen Stuhl: Ballaststoffe, Flohsamenschalen und genug trinken.',
      'Pressen Sie nicht und sitzen Sie nicht lange; ein weiches Sitzkissen entlastet.',
      'Reinigen Sie den After nach dem Stuhlgang mit lauwarmem Wasser und tupfen Sie ihn trocken.',
      'Drücken Sie den Knoten nicht hinein und stechen Sie ihn nicht selbst auf.',
    ],
    warnung:
      'Fieber, zunehmende Rötung und pochender Schmerz (möglicher Abszess) oder eine starke Blutung: bitte am selben Tag in die Praxis.',
  },
  {
    id: 'analekzem',
    name: 'Analekzem',
    zusatz: 'Entzündete, juckende Haut am After',
    gebiet: 'bauch',
    suche:
      'pruritus ani juckreiz after jucken am po analjucken perianal dermatitis ekzem nässen kontaktallergie feuchttücher duftstoffe zinkpaste epikutantest',
    was: [
      'Bei einem Analekzem ist die Haut rund um den After entzündet.',
      'Sie ist gerötet, juckt und brennt, manchmal nässt sie oder reißt ein.',
      'Es ist die häufigste Ursache für Juckreiz am After.',
      'Das ist unangenehm, aber gut zu behandeln – vor allem, wenn man den Auslöser findet.',
    ],
    ursachen: [
      'Am häufigsten reizt Feuchtigkeit die Haut: Stuhlreste, Schweiß oder Schleim, etwa bei vergrößerten Hämorrhoiden oder Durchfall.',
      'Oft steckt eine Allergie dahinter – auf Duft- oder Konservierungsstoffe in feuchten Tüchern, Salben, Zäpfchen, Seifen oder Intimpflege.',
      'Menschen mit Neurodermitis bekommen ebenfalls häufiger ein Analekzem.',
      'Zu häufiges, gründliches Waschen mit Seife trocknet die Haut aus und macht es schlimmer.',
    ],
    behandlung: [
      'Wir behandeln den Grund mit, zum Beispiel vergrößerte Hämorrhoiden oder Durchfall.',
      'Die Haut muss trocken werden: Eine dünne Schicht Zinkpaste schützt und trocknet.',
      'Bei starker Entzündung hilft für wenige Tage eine schwache Kortisoncreme. Steckt ein Pilz dahinter, kommt ein Pilzmittel dazu.',
      'Kommt das Ekzem immer wieder, zeigt ein Allergietest auf der Haut, welcher Stoff es auslöst.',
    ],
    selbst: [
      'Reinigen Sie den After nur mit klarem, lauwarmem Wasser – ohne Seife und ohne feuchte Tücher.',
      'Tupfen Sie trocken statt zu reiben, und benutzen Sie weiches Papier ohne Duft und Farbe.',
      'Tragen Sie luftige Unterwäsche aus Baumwolle.',
      'Kratzen Sie nicht, auch wenn es schwerfällt – das reizt die Haut weiter.',
    ],
    warnung:
      'Blut im Stuhl, eine Wunde, die nicht abheilt, oder keine Besserung nach etwa vier Wochen: bitte noch einmal zeigen.',
  },
  {
    id: 'after-vergleich',
    name: 'Beschwerden am After: Was ist was?',
    zusatz: 'Knoten, Jucken, Blut am Papier',
    gebiet: 'bauch',
    suche:
      'after po enddarm hämorrhoiden haemorrhoiden analvenenthrombose analekzem analfissur fissur einriss feigwarzen jucken blut am papier knoten schmerzen stuhlgang proktoskopie tastuntersuchung',
    seiten: [
      {
        id: 'ueberblick',
        titel: 'Beschwerden am After',
        kurz: 'Überblick',
        saetze: [
          'Beschwerden am After sind sehr häufig – und vielen peinlich. Für uns gehören sie zum Alltag. Sprechen Sie sie ruhig an.',
          'Meist steckt etwas Harmloses dahinter: vergrößerte Hämorrhoiden, eine Analvenenthrombose, ein Analekzem oder ein kleiner Einriss (Analfissur).',
          'Seltener sind Feigwarzen, eine Entzündung oder eine Eiteransammlung.',
          'Ob es blutet, juckt, nässt oder schmerzt – und wann –, führt uns oft schon zur Ursache.',
        ],
      },
      {
        id: 'knoten',
        titel: 'Ein Knoten am After',
        kurz: 'Knoten',
        bild: 'analvenenthrombose',
        saetze: [
          'Hämorrhoiden liegen innen, oberhalb einer Grenzlinie im Analkanal. Dort gibt es kaum Schmerznerven: Sie bluten eher, als dass sie wehtun.',
          'Fallen sie vor, sind sie weich und lassen sich oft zurückschieben. Sie entstehen langsam über Monate und Jahre.',
          'Eine Analvenenthrombose sitzt außen am Afterrand unter der Haut. Sie kommt plötzlich, ist prall, bläulich und tut deutlich weh.',
          'Weiche Hautfalten am After (Marisken) sind harmlos, oft Reste einer früheren Thrombose. Einen harten Knoten, der nicht weggeht, schauen wir immer an.',
        ],
      },
      {
        id: 'jucken',
        titel: 'Jucken und Nässen',
        kurz: 'Jucken',
        bild: 'analekzem',
        saetze: [
          'Juckreiz am After kommt meist von einem Analekzem: Die Haut ist durch Feuchtigkeit oder Pflegemittel gereizt.',
          'Vergrößerte Hämorrhoiden lassen etwas Schleim austreten. Die Haut bleibt feucht – deshalb kommt beides oft zusammen.',
          'Auch Pilze, Madenwürmer (vor allem bei Kindern, nachts) oder Hautkrankheiten wie Schuppenflechte können jucken.',
          'Oft hilft schon: nur Wasser, trocken tupfen, keine feuchten Tücher, keine Seife.',
        ],
      },
      {
        id: 'blut',
        titel: 'Blut am Toilettenpapier',
        kurz: 'Blut',
        saetze: [
          'Hellrotes Blut auf dem Papier oder auf dem Stuhl kommt meist von Hämorrhoiden oder von einem kleinen Einriss.',
          'Ein Einriss (Analfissur) tut beim Stuhlgang und noch eine Weile danach stark weh, oft brennend oder stechend.',
          'Dunkles, mit dem Stuhl vermischtes Blut oder schwarzer Stuhl kommt eher von weiter oben, aus dem Darm oder dem Magen.',
          'Jede Blutung klären wir ab. Ab etwa 50 Jahren oder bei Warnzeichen gehört eine Darmspiegelung dazu, um Darmkrebs auszuschließen.',
        ],
      },
      {
        id: 'untersuchung',
        titel: 'So untersuchen wir',
        kurz: 'Untersuchung',
        saetze: [
          'Zuerst schauen wir uns den After an, meist in Seitenlage mit angezogenen Beinen.',
          'Dann tasten wir mit einem Handschuh und etwas Gleitgel den Enddarm ab. Das ist kurz unangenehm, tut aber nicht weh.',
          'Mit einem kleinen Rohr mit Licht (Proktoskop) sieht man die Hämorrhoiden direkt – ohne Vorbereitung und ohne Betäubung.',
          'Bei Bedarf überweisen wir in eine proktologische Praxis oder zur Darmspiegelung.',
        ],
      },
    ],
    warnung:
      'Viel Blut, schwarzer Stuhl, Fieber mit starken Schmerzen (Abszess) oder Blut mit Gewichtsverlust oder veränderter Verdauung: bitte rasch in die Praxis.',
  },
];
