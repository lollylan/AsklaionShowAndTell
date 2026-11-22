import type { Krankheit } from './typen';

// Magen und Bauchwand: Magenschleimhautentzündung, Zwerchfellbruch (axiale Gleithernie)
// und die Brüche der Bauchwand (Leiste, Nabel, Narbe) als ein Thema mit eigenen Seiten.

export const MAGEN_BAUCHWAND: Krankheit[] = [
  {
    id: 'gastritis',
    name: 'Magenschleimhautentzündung',
    zusatz: 'Gastritis',
    gebiet: 'bauch',
    bilder: { behandlung: 'gastritis-behandlung' },
    suche:
      'gastritis magen magenschmerzen oberbauch oberbauchschmerzen voellegefuehl uebelkeit helicobacter pylori eradikation atemtest magenspiegelung gastroskopie schmerzmittel nsar ibuprofen diclofenac ass magenschutz pantoprazol vitamin b12 typ a typ b typ c reizmagen dyspepsie',
    was: [
      'Bei einer Gastritis ist die Schleimhaut entzündet, die den Magen von innen auskleidet und ihn vor der eigenen Säure schützt.',
      'Typisch sind Druck oder Brennen im Oberbauch, Völlegefühl, Übelkeit und wenig Appetit – oft nach dem Essen.',
      'Eine plötzliche Gastritis klingt meist in Tagen ab. Eine dauerhafte macht oft gar keine Beschwerden und fällt erst bei einer Magenspiegelung auf.',
      'Nicht jeder Magenschmerz ist eine Entzündung: Häufig ist der Magen nur empfindlich, ohne dass man etwas sieht (Reizmagen).',
    ],
    ursachen: [
      'Häufigste Ursache einer dauerhaften Gastritis ist das Bakterium Helicobacter. Man steckt sich meist schon als Kind an.',
      'Schmerzmittel wie Ibuprofen, Diclofenac oder ASS, viel Alkohol und Rauchen greifen die Schleimhaut an.',
      'Selten richtet sich die eigene Abwehr gegen die Magenschleimhaut. Dann fehlt dem Körper mit der Zeit Vitamin B12.',
      'Unbehandelt kann ein Magengeschwür mit Blutung entstehen; eine Helicobacter-Gastritis erhöht über Jahre auch das Risiko für Magenkrebs.',
    ],
    behandlung: [
      'Zuerst lassen wir weg, was den Magen reizt, wenn möglich auch die Schmerzmittel.',
      'Säureblocker wie Pantoprazol beruhigen die Schleimhaut, meist für einige Wochen.',
      'Helicobacter finden wir mit einem Atem- oder Stuhltest oder bei der Magenspiegelung. Er wird mit einer Kombination aus Säureblocker und Antibiotika über 10 bis 14 Tage beseitigt.',
      'Ob das geklappt hat, prüfen wir frühestens vier Wochen danach mit einem neuen Test. Fehlt Vitamin B12, geben wir es als Spritze oder Tablette.',
    ],
    selbst: [
      'Nehmen Sie Schmerzmittel nur nach Rücksprache. Brauchen Sie sie dauerhaft, gehört oft ein Magenschutz dazu.',
      'Weniger Alkohol und Rauchstopp helfen der Schleimhaut, sich zu erholen.',
      'Essen Sie lieber mehrere kleine Mahlzeiten. Eine strenge Schonkost ist nicht nötig – lassen Sie weg, was Sie nicht vertragen.',
      'Vor einem Helicobacter-Test: zwei Wochen keine Säureblocker, vier Wochen keine Antibiotika.',
    ],
    warnung:
      'Erbrechen von Blut oder Kaffeesatz, schwarzer Stuhl, ungewollte Gewichtsabnahme, Schluckbeschwerden oder starke plötzliche Bauchschmerzen: bitte sofort melden.',
  },
  {
    id: 'gleithernie',
    name: 'Zwerchfellbruch',
    zusatz: 'Axiale Gleithernie',
    gebiet: 'bauch',
    bilder: { ursachen: 'gleithernie-ursachen' },
    suche:
      'gleithernie axiale hiatushernie hiatus hernie zwerchfellbruch zwerchfell zwerchfellluecke mageneingang kardia sodbrennen reflux magenspiegelung paraoesophageal fundoplicatio',
    was: [
      'Das Zwerchfell ist der große Atemmuskel zwischen Brust und Bauch. Die Speiseröhre läuft durch eine Lücke darin zum Magen.',
      'Bei einer Gleithernie ist diese Lücke etwas weit. Der Mageneingang und ein kleines Stück Magen rutschen nach oben in den Brustkorb – und wieder zurück.',
      'Das ist sehr häufig, besonders mit dem Alter. Meist merkt man nichts, und sie fällt zufällig bei einer Magenspiegelung auf.',
      'Wenn sie Beschwerden macht, dann vor allem Sodbrennen und saures Aufstoßen.',
    ],
    ursachen: [
      'Mit dem Alter wird das Bindegewebe nachgiebiger, die Lücke weitet sich.',
      'Übergewicht, eine Schwangerschaft, häufiges Pressen, schweres Heben und langer Husten erhöhen den Druck im Bauch.',
      'Weil der Verschluss am Mageneingang dann schlechter hält, fließt leichter Säure zurück in die Speiseröhre.',
      'Selten schiebt sich der Magen neben der Speiseröhre in den Brustkorb. Diese andere Form kann einklemmen und wird eher operiert.',
    ],
    behandlung: [
      'Ohne Beschwerden braucht eine Gleithernie keine Behandlung. Sie ist kein Grund zur Sorge.',
      'Bei Sodbrennen behandeln wir wie beim Reflux: mit Änderungen im Alltag und bei Bedarf mit Säureblockern.',
      'Eine Operation ist nur selten nötig – etwa wenn trotz Tabletten starke Beschwerden bleiben. Dabei wird die Lücke enger genäht und der Mageneingang verstärkt.',
    ],
    selbst: [
      'Nehmen Sie ab, wenn Sie übergewichtig sind – das entlastet am meisten.',
      'Essen Sie kleinere Portionen und die letzte Mahlzeit etwa drei Stunden vor dem Schlafen.',
      'Stellen Sie das Kopfende des Bettes höher und vermeiden Sie enge Gürtel.',
      'Sorgen Sie für weichen Stuhlgang, damit Sie nicht stark pressen müssen.',
    ],
    warnung:
      'Schluckbeschwerden, Erbrechen von Blut, schwarzer Stuhl oder ungewollte Gewichtsabnahme bitte rasch abklären. Bei plötzlichem starkem Schmerz in Brust oder Oberbauch: 112.',
  },
  {
    id: 'hernie',
    name: 'Bauchwandbruch',
    zusatz: 'Hernie: Leiste, Nabel, Narbe',
    gebiet: 'bauch',
    suche:
      'hernie bruch bauchwandbruch leistenbruch leistenhernie inguinalhernie schenkelbruch femoralhernie nabelbruch nabelhernie umbilikalhernie narbenbruch narbenhernie epigastrische hernie rektusdiastase bruchsack bruchpforte einklemmung inkarzeration netz lichtenstein tapp tep schluesselloch operation beule leiste',
    seiten: [
      {
        id: 'was',
        titel: 'Was ist ein Bruch?',
        kurz: 'Was ist das?',
        bild: 'hernie',
        saetze: [
          'Mit einem Knochenbruch hat das nichts zu tun: Bei einem Bauchwandbruch hat die Bauchwand eine Lücke oder Schwachstelle.',
          'Durch die Lücke stülpt sich das Bauchfell nach außen, wie ein kleiner Sack. Darin kann Bauchfett oder ein Stück Darm liegen.',
          'Sie sehen oder tasten eine weiche Beule. Beim Husten, Pressen und Stehen wird sie größer, im Liegen verschwindet sie oft.',
          'Typische Stellen sind die Leiste, der Nabel und alte Operationsnarben.',
        ],
      },
      {
        id: 'leiste',
        titel: 'Der Leistenbruch',
        kurz: 'Leiste',
        bild: 'leistenbruch',
        saetze: [
          'Der Leistenbruch ist der häufigste Bruch. Männer haben ihn viel öfter als Frauen, weil die Bauchwand dort von Geburt an eine Schwachstelle hat.',
          'Die Beule sitzt in der Leiste und kann bei Männern bis in den Hodensack reichen. Oft zieht oder drückt es beim Heben.',
          'Meist ertasten wir ihn beim Husten im Stehen; ein Ultraschall hilft bei Unklarheit.',
          'Bei Frauen ist es öfter ein Schenkelbruch knapp unterhalb der Leiste. Er klemmt eher ein; deshalb raten wir Frauen bald zur Operation.',
        ],
      },
      {
        id: 'nabel',
        titel: 'Der Nabelbruch',
        kurz: 'Nabel',
        bild: 'nabelbruch',
        saetze: [
          'Am Nabel ist die Bauchwand von Natur aus dünner. Dort kann sich eine kleine Beule vorwölben.',
          'Bei Babys ist ein Nabelbruch häufig und schließt sich in den ersten Lebensjahren meist von selbst.',
          'Bei Erwachsenen entsteht er oft durch Übergewicht, Schwangerschaft oder Wasser im Bauch – und bleibt dann.',
          'Ein kleiner Bruch ohne Beschwerden darf beobachtet werden. Wächst er oder schmerzt er, raten wir zur Operation.',
        ],
      },
      {
        id: 'narbe',
        titel: 'Der Narbenbruch',
        kurz: 'Narbe',
        bild: 'narbenbruch',
        saetze: [
          'Nach einer Bauchoperation kann die Naht in der Bauchwand nachgeben. Das passiert bei etwa jeder zehnten größeren Bauch-OP, manchmal erst nach Jahren.',
          'Ein Risiko sind Übergewicht, Rauchen, Diabetes und eine Wundinfektion nach der OP.',
          'Narbenbrüche werden mit der Zeit oft größer und sollten deshalb bald operiert werden.',
          'Kein Bruch ist die Rektusdiastase: Die geraden Bauchmuskeln weichen in der Mitte auseinander, ohne Lücke. Sie ist harmlos und lässt sich mit Training bessern.',
        ],
      },
      {
        id: 'behandlung',
        titel: 'So wird behandelt',
        kurz: 'Behandlung',
        bild: 'hernie-netz',
        saetze: [
          'Bei Erwachsenen schließt sich ein Bruch nicht von selbst. Dauerhaft hilft nur eine Operation.',
          'Bei Männern mit einem Leistenbruch ohne Beschwerden kann man auch abwarten. Viele lassen ihn später doch operieren.',
          'Bei der Operation wird der Inhalt zurückverlagert und die Lücke verschlossen, meist mit einem Kunststoffnetz verstärkt. Das Netz wächst ein und verhindert Rückfälle.',
          'Operiert wird mit einem kleinen Schnitt oder mit der Schlüssellochtechnik, oft ambulant oder mit einer Nacht im Krankenhaus. Ein Bruchband ersetzt die OP nicht.',
        ],
      },
      {
        id: 'danach',
        titel: 'Nach der Operation und selbst tun',
        kurz: 'Danach',
        bild: 'hernie-einklemmung',
        saetze: [
          'Nach einer Leistenbruch-OP dürfen Sie nach wenigen Tagen das tun, was nicht wehtut. Ab wann Sie schwer heben dürfen, sagt Ihnen das Operationsteam – nach großen Narbenbrüchen dauert es länger.',
          'Halten Sie den Stuhl weich und behandeln Sie langen Husten, damit Sie nicht stark pressen.',
          'Heben Sie aus den Beinen und atmen Sie dabei aus. Abnehmen und Rauchstopp senken das Risiko für einen neuen Bruch.',
        ],
      },
    ],
    warnung:
      'Wird die Beule plötzlich hart und schmerzhaft, lässt sie sich nicht mehr zurückdrücken oder kommen Übelkeit und Erbrechen dazu, ist der Bruch eingeklemmt. Dann sofort in die Notaufnahme oder 112.',
  },
];
