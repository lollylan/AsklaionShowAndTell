import type { Krankheit } from './typen';

// Weitere Beschwerden mit einer Seite je möglicher Ursache (Aufbau wie in beschwerden.ts).

export const BESCHWERDEN_WEITERE: Krankheit[] = [
  {
    id: 'luftnot',
    name: 'Luftnot',
    zusatz: 'Atemnot, Kurzatmigkeit',
    gebiet: 'beschwerden',
    suche:
      'atemnot dyspnoe kurzatmig ausser atem treppensteigen herzschwaeche herzinsuffizienz asthma copd lunge lungenfunktion spirometrie blutarmut anaemie eisen kondition trainingsmangel uebergewicht angst panik hyperventilation',
    seiten: [
      {
        id: 'ueberblick',
        titel: 'Luftnot: Woher kommt sie?',
        kurz: 'Überblick',
        saetze: [
          'Beim Treppensteigen oder beim Sport schneller zu atmen ist normal. Abklären sollte man Luftnot, die neu ist, zunimmt oder schon bei leichter Belastung kommt.',
          'Der Sauerstoff hat einen weiten Weg: Die Lunge nimmt ihn auf, das Blut trägt ihn, das Herz pumpt ihn zu den Muskeln. Jede Station kann schwächeln.',
          'Am häufigsten stecken Herz oder Lunge dahinter, seltener eine Blutarmut. Auch fehlende Kondition, Übergewicht und Angst spielen eine große Rolle.',
          'Wir hören Herz und Lunge ab, messen den Sauerstoff im Blut und machen je nach Verdacht ein EKG, einen Lungenfunktionstest und Blutwerte.',
        ],
      },
      {
        id: 'herz',
        titel: 'Das Herz',
        kurz: 'Herz',
        bild: 'herzschwaeche',
        saetze: [
          'Pumpt das Herz zu schwach, staut sich das Blut in die Lunge zurück. Sie wird schwer und nimmt schlechter Sauerstoff auf.',
          'Typisch sind Luftnot beim Treppensteigen, Atemnot im flachen Liegen – nachts hilft ein zusätzliches Kissen –, dicke Knöchel und eine rasche Gewichtszunahme.',
          'Auch verengte Herzkranzgefäße oder ein unregelmäßiger Herzschlag wie Vorhofflimmern können sich als Luftnot zeigen, manchmal statt eines Brustschmerzes.',
          'Wir schreiben ein EKG und bestimmen einen Herzwert im Blut (NT-proBNP). Ein Ultraschall des Herzens sichert die Diagnose.',
        ],
      },
      {
        id: 'lunge',
        titel: 'Die Lunge: Asthma und COPD',
        kurz: 'Lunge',
        bild: 'copd',
        saetze: [
          'Bei Asthma verengen sich die Bronchien anfallsweise: pfeifende Atmung, Husten, Engegefühl – oft nachts, früh am Morgen, bei Infekten, Kälte oder Allergie.',
          'Die COPD betrifft vor allem Menschen ab 40, die rauchen oder geraucht haben. Die Luftnot nimmt über Jahre langsam zu, dazu kommt Husten mit Auswurf am Morgen.',
          'Ein Lungenfunktionstest hier in der Praxis zeigt, ob und wie stark die Bronchien verengt sind.',
          'Beides wird mit Sprays zum Inhalieren behandelt. Bei COPD ist der Rauchstopp das Wichtigste – dabei unterstützen wir Sie.',
        ],
      },
      {
        id: 'blutarmut',
        titel: 'Blutarmut',
        kurz: 'Blutarmut',
        bild: 'eisenmangel',
        saetze: [
          'Bei einer Blutarmut fehlt roter Blutfarbstoff, der den Sauerstoff trägt. Das Herz muss schneller pumpen, um das auszugleichen.',
          'Man ist schnell außer Atem, hat bei Belastung Herzklopfen, ist blass und müde.',
          'Häufigster Grund ist ein Eisenmangel durch Blutverlust, etwa bei starker Regelblutung oder unbemerkt im Darm. Seltener fehlen Vitamin B12 oder Folsäure.',
          'Das Blutbild zeigt die Blutarmut. Dann suchen wir die Ursache und gleichen den Mangel aus.',
        ],
      },
      {
        id: 'kondition',
        titel: 'Kondition und Gewicht',
        kurz: 'Kondition',
        saetze: [
          'Wer sich wenig bewegt, kommt schneller außer Atem: Untrainierte Muskeln brauchen für die gleiche Arbeit mehr Sauerstoff.',
          'Übergewicht verstärkt das. Der Körper muss mehr tragen, und der Bauch drückt von unten gegen die Lunge.',
          'Ob es wirklich nur die Kondition ist, sagen wir erst, wenn Herz und Lunge untersucht sind.',
          'Dann hilft Training am besten: Gehen, Radfahren, Schwimmen – langsam steigern, bis Sie leicht außer Atem sind, aber noch sprechen können. Jedes Kilo weniger erleichtert das Atmen.',
        ],
      },
      {
        id: 'angst',
        titel: 'Angst und schnelles Atmen',
        kurz: 'Angst',
        saetze: [
          'Bei Angst, Aufregung oder Stress atmet man schneller und tiefer, ohne es zu merken. Das heißt Hyperventilation.',
          'Trotzdem fühlt es sich an, als bekäme man zu wenig Luft. Dazu kommen Kribbeln um den Mund und in den Händen, Schwindel und Herzrasen.',
          'Das ist unangenehm, aber ungefährlich und geht von selbst vorbei. Atmen Sie langsam durch die Nase ein und länger aus.',
          'Daran denken wir erst, wenn Herz und Lunge gesund sind. Kommt es öfter, hilft eine Psychotherapie.',
        ],
      },
    ],
    warnung:
      'Sofort 112: plötzliche starke Luftnot, Brustschmerz, blaue Lippen, kaum Sprechen möglich oder Blut beim Husten.',
  },
  {
    id: 'geschwollene-beine',
    name: 'Geschwollene Beine',
    zusatz: 'Wasser in den Beinen, Ödeme',
    gebiet: 'beschwerden',
    suche:
      'oedem oedeme beinoedem dicke beine knoechel wasser schwellung venen krampfadern venenschwaeche herzschwaeche niere leber eiweiss albumin amlodipin calciumantagonist medikamente lymphoedem lipoedem thrombose einseitig',
    seiten: [
      {
        id: 'ueberblick',
        titel: 'Geschwollene Beine: Was ist wichtig?',
        kurz: 'Überblick',
        saetze: [
          'Abends etwas dickere Knöchel nach langem Stehen, Sitzen oder bei Hitze sind häufig und meist harmlos.',
          'Entscheidend ist: Sind beide Beine dick oder nur eines? Kam es langsam oder plötzlich? Bleibt eine Delle, wenn man mit dem Finger drückt?',
          'Schwellen beide Beine langsam an, stecken meist Venen, Herz, Niere, Leber oder Medikamente dahinter.',
          'Wir tasten die Beine ab, bestimmen Blutwerte für Herz, Niere, Leber und Eiweiß, prüfen den Urin und schauen bei Bedarf mit Ultraschall auf die Venen.',
        ],
      },
      {
        id: 'venen',
        titel: 'Schwache Venen',
        kurz: 'Venen',
        bild: 'venenschwaeche',
        saetze: [
          'Die Venen bringen das Blut aus den Beinen zurück zum Herzen. Kleine Klappen sorgen dafür, dass es nicht zurückfließt.',
          'Leiern die Venen aus, schließen die Klappen nicht mehr. Das Blut versackt in den Beinen, Wasser tritt ins Gewebe.',
          'Zeichen sind Krampfadern, schwere Beine am Abend, Schwellung an den Knöcheln und später bräunliche Flecken an der Haut.',
          'Viel Gehen pumpt das Blut mit der Wadenmuskulatur nach oben. Beine hochlegen und Kompressionsstrümpfe helfen; Krampfadern lassen sich auch behandeln.',
        ],
      },
      {
        id: 'herz',
        titel: 'Das Herz',
        kurz: 'Herz',
        bild: 'herzschwaeche',
        saetze: [
          'Pumpt das Herz zu schwach, staut sich das Blut bis in die Beine zurück. Beide Knöchel und Unterschenkel schwellen an, Druck hinterlässt eine Delle.',
          'Oft kommen Luftnot bei Belastung und nächtliches Wasserlassen dazu.',
          'Wiegen Sie sich täglich. Nehmen Sie mehr als ein Kilo an einem Tag oder zwei Kilo in drei Tagen zu, sammelt sich Wasser – bitte melden.',
          'EKG, ein Herzwert im Blut und ein Ultraschall des Herzens klären das. Wassertabletten und herzstärkende Medikamente helfen gut.',
        ],
      },
      {
        id: 'niere-leber',
        titel: 'Niere, Leber und Eiweiß',
        kurz: 'Niere, Leber',
        bild: 'nierenschwaeche',
        saetze: [
          'Eiweiß im Blut hält das Wasser in den Adern. Fehlt es, tritt Wasser ins Gewebe – an den Beinen, morgens auch an den Augenlidern.',
          'Eine kranke Niere kann Eiweiß mit dem Urin verlieren; der Urin schäumt dann oft. Eine schwache Niere scheidet außerdem zu wenig Salz und Wasser aus.',
          'Eine kranke Leber bildet zu wenig Eiweiß, dann sammelt sich Wasser in Beinen und Bauch.',
          'Blutwerte für Niere, Leber und Eiweiß und ein Urintest zeigen, ob eine dieser Ursachen vorliegt.',
        ],
      },
      {
        id: 'medikamente',
        titel: 'Medikamente',
        kurz: 'Medikamente',
        saetze: [
          'Manche Blutdrucksenker lassen die Knöchel anschwellen, vor allem Amlodipin und verwandte Mittel. Das ist häufig, harmlos und hängt von der Dosis ab.',
          'Wassertabletten helfen dagegen kaum. Besser ist eine kleinere Dosis oder ein anderer Blutdrucksenker.',
          'Auch Schmerzmittel wie Ibuprofen und Diclofenac, Kortison, Hormone sowie einige Mittel gegen Nervenschmerzen und Diabetes halten Wasser im Körper.',
          'Bitte setzen Sie nichts eigenmächtig ab. Wir gehen Ihren Medikamentenplan gemeinsam durch.',
        ],
      },
      {
        id: 'lymphe-fett',
        titel: 'Lymphödem und Lipödem',
        kurz: 'Lymphe, Fett',
        saetze: [
          'Die Lymphbahnen leiten Gewebewasser ab. Sind sie geschädigt, etwa nach Operation, Bestrahlung oder Wundrose, entsteht ein Lymphödem.',
          'Typisch sind dicke Zehen und ein dicker Fußrücken. Hilfe: Lymphdrainage, Kompression, gute Hautpflege.',
          'Beim Lipödem, fast nur bei Frauen, ist das Fett an beiden Beinen vermehrt. Die Füße bleiben schlank.',
          'Die Beine sind druckempfindlich und bekommen leicht blaue Flecken. Kompression und Bewegung lindern.',
        ],
      },
    ],
    warnung:
      'Ein Bein plötzlich dick, warm und schmerzhaft: noch heute abklären (Thrombose?). Dazu Luftnot oder Brustschmerz: 112.',
  },
  {
    id: 'vergesslichkeit',
    name: 'Vergesslichkeit',
    zusatz: 'Gedächtnisstörung',
    gebiet: 'beschwerden',
    suche:
      'vergesslich gedaechtnis gedaechtnisstoerung konzentration merkfaehigkeit demenz alzheimer depression pseudodemenz stress schilddruese tsh vitamin b12 medikamente alkohol schlafmittel beruhigungsmittel hoeren schwerhoerigkeit hoergeraet sehen schlaf',
    seiten: [
      {
        id: 'ueberblick',
        titel: 'Vergesslichkeit: Was ist normal?',
        kurz: 'Überblick',
        saetze: [
          'Einen Namen vergessen, den Schlüssel verlegen, im Zimmer stehen und nicht mehr wissen, was man wollte – das kennt jeder, in jedem Alter.',
          'Mit den Jahren braucht das Gedächtnis etwas länger. Das ist normal, solange es später wieder einfällt und der Alltag gelingt.',
          'Abklären sollten wir es, wenn es deutlich mehr wird, wenn es Angehörigen auffällt oder wenn Dinge im Alltag nicht mehr klappen.',
          'Oft steckt eine behandelbare Ursache dahinter. Wir sprechen miteinander, machen einen kurzen Gedächtnistest und bestimmen einige Blutwerte.',
        ],
      },
      {
        id: 'demenz',
        titel: 'Demenz',
        kurz: 'Demenz',
        bild: 'demenz',
        saetze: [
          'Bei einer Demenz gehen Nervenzellen im Gehirn verloren – am häufigsten durch die Alzheimer-Krankheit oder durch Durchblutungsstörungen.',
          'Anfangs fällt vor allem Neues schwer: gerade Gesagtes, Termine, wo etwas liegt. Erinnerungen von früher bleiben lange erhalten.',
          'Es nimmt langsam über Monate und Jahre zu. Oft bemerken es die Angehörigen eher als die Betroffenen selbst.',
          'Von einer Demenz sprechen wir erst, wenn behandelbare Ursachen ausgeschlossen sind. Dazu gibt es ein eigenes Kapitel.',
        ],
      },
      {
        id: 'psyche',
        titel: 'Depression und Stress',
        kurz: 'Psyche',
        bild: 'depression',
        saetze: [
          'Eine Depression kann sich wie eine Demenz anfühlen: Konzentration und Gedächtnis lassen deutlich nach.',
          'Im Alter ist das besonders häufig. Es wird leicht übersehen, weil die Vergesslichkeit mehr auffällt als die gedrückte Stimmung.',
          'Auch Dauerstress, Sorgen, Trauer und Überlastung belegen den Kopf – für Neues bleibt dann kein Platz.',
          'Die gute Nachricht: Wird die Depression behandelt, erholt sich auch das Gedächtnis.',
        ],
      },
      {
        id: 'mangel',
        titel: 'Schilddrüse und Vitamin B12',
        kurz: 'Schilddrüse, B12',
        bild: 'schilddruesenunterfunktion',
        saetze: [
          'Arbeitet die Schilddrüse zu langsam, wird auch das Denken langsam: müde, antriebslos, vergesslich.',
          'Vitamin B12 brauchen die Nerven. Ein Mangel macht vergesslich, oft kommen Kribbeln in den Füßen und ein unsicherer Gang dazu.',
          'Häufig betroffen sind ältere Menschen, wer sich vegan ernährt, wer am Magen operiert wurde oder lange Metformin oder Magenschutz einnimmt.',
          'Beides zeigt ein Bluttest. Ein Mangel lässt sich mit Tabletten oder Spritzen gut ausgleichen.',
        ],
      },
      {
        id: 'medikamente',
        titel: 'Medikamente und Alkohol',
        kurz: 'Medikamente',
        saetze: [
          'Manche Medikamente dämpfen das Gedächtnis: Schlaf- und Beruhigungsmittel, starke Schmerzmittel und manche Mittel gegen Blasenschwäche, Allergie oder Übelkeit.',
          'Das Risiko steigt mit dem Alter und mit der Zahl der Tabletten. Wir gehen Ihren Medikamentenplan gemeinsam durch.',
          'Alkohol schadet den Nervenzellen schon in Mengen, die vielen normal vorkommen. Wer täglich trinkt, merkt das oft zuerst am Gedächtnis.',
          'Bitte setzen Sie nichts eigenmächtig ab. Manche Mittel müssen langsam ausgeschlichen werden.',
        ],
      },
      {
        id: 'sinne-schlaf',
        titel: 'Hören, Sehen und Schlaf',
        kurz: 'Hören, Schlaf',
        saetze: [
          'Wer schlecht hört, bekommt vieles gar nicht erst mit – und kann es sich deshalb nicht merken.',
          'Schwerhörigkeit erhöht das Risiko für eine Demenz. Ein Hörgerät entlastet das Gehirn.',
          'Auch eine passende Brille hilft, im Alltag aufmerksam zu bleiben.',
          'Im Schlaf ordnet das Gehirn das Erlebte. Zu wenig Schlaf oder Atemaussetzer machen vergesslich.',
        ],
      },
    ],
    warnung:
      'Plötzliche Verwirrtheit ist ein Notfall: sofort ärztlich abklären. Mit Lähmung, Sprach- oder Sehstörung: 112.',
  },
];
