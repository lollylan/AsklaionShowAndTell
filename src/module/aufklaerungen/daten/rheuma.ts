import type { Krankheit } from './typen';

// Rheuma: entzündliches Gelenkrheuma (rheumatoide Arthritis), Muskelrheuma im Alter
// (Polymyalgia rheumatica, mit der Riesenzellarteriitis als Warnzeichen) und die
// Fibromyalgie als nicht entzündliche Schmerzkrankheit. Schulter, Tennisellenbogen,
// Karpaltunnel und Fersensporn stehen im Modul Orthopädie.

export const RHEUMA: Krankheit[] = [
  {
    id: 'rheumatoide-arthritis',
    name: 'Rheumatoide Arthritis',
    zusatz: 'Gelenkrheuma, chronische Polyarthritis',
    gebiet: 'bewegung',
    suche:
      'rheuma rheumatoide arthritis ra gelenkrheuma chronische polyarthritis cp polyarthritis autoimmun gelenkentzuendung synovitis fingergelenke handgelenk morgensteifigkeit rheumafaktor anti-ccp ccp-antikoerper acpa crp bsg blutsenkung rheumatologe methotrexat mtx folsaeure basistherapie dmards biologika jak-hemmer kortison prednisolon remission',
    bilder: {
      ursachen: 'rheumatoide-arthritis-ursachen',
      behandlung: 'rheumatoide-arthritis-behandlung',
      selbst: 'rheumatoide-arthritis-selbst',
    },
    was: [
      'Bei der rheumatoiden Arthritis richtet sich die eigene Abwehr gegen die Gelenke. Die dünne Haut, die das Gelenk von innen auskleidet, entzündet sich und schwillt an.',
      'Meist beginnt es an den kleinen Gelenken: an den Fingergrund- und Fingermittelgelenken, am Handgelenk oder an den Zehen – typischerweise auf beiden Seiten gleich.',
      'Die Gelenke sind geschwollen, warm und schmerzen. Morgens sind sie lange steif, oft länger als eine halbe Stunde.',
      'Viele fühlen sich zusätzlich müde und abgeschlagen. Die Krankheit verläuft in Schüben und bleibt ohne Behandlung bestehen.',
    ],
    ursachen: [
      'Warum die Abwehr sich gegen die Gelenke wendet, ist nicht genau bekannt. Die Veranlagung spielt eine Rolle, Frauen erkranken häufiger.',
      'Rauchen ist der wichtigste Auslöser, den man selbst beeinflussen kann. Es macht die Krankheit auch schwerer.',
      'Unbehandelt zerstört die Entzündung nach und nach Knorpel und Knochen. Die Gelenke verformen sich und werden steif.',
      'Die Entzündung betrifft den ganzen Körper: Sie erhöht auch das Risiko für Herzinfarkt und Schlaganfall.',
    ],
    behandlung: [
      'Je früher die Behandlung beginnt, desto besser lassen sich die Gelenke schützen. Deshalb überweisen wir Sie bei Verdacht rasch zum Rheumatologen.',
      'Blutwerte helfen bei der Diagnose: Entzündungswerte (CRP, Blutsenkung) und bestimmte Antikörper wie Rheumafaktor und Anti-CCP. Dazu kommen Ultraschall und Röntgen.',
      'Die Basis ist ein Medikament, das die Abwehr dämpft – meist Methotrexat, einmal pro Woche, mit Folsäure am Tag danach. Kortison überbrückt die ersten Wochen, bis es wirkt.',
      'Reicht das nicht, kommen weitere Mittel dazu, etwa Biologika als Spritze. Ziel ist, dass die Entzündung ganz zur Ruhe kommt. Dafür sind regelmäßige Kontrollen und Blutwerte nötig.',
    ],
    selbst: [
      'Hören Sie mit dem Rauchen auf – das wirkt fast wie ein zusätzliches Medikament.',
      'Bleiben Sie in Bewegung. Krankengymnastik und Funktionstraining halten die Gelenke beweglich, Ergotherapie zeigt gelenkschonende Griffe.',
      'Nehmen Sie Methotrexat immer am selben Wochentag und nie täglich. Trinken Sie dabei möglichst wenig Alkohol.',
      'Lassen Sie sich gegen Grippe, Pneumokokken, Corona und Gürtelrose impfen – am besten vor Beginn der Behandlung.',
    ],
    warnung:
      'Fieber oder ein Infekt unter Rheuma-Medikamenten, neue Luftnot oder trockener Husten, ein einzelnes plötzlich heißes Gelenk: bitte rasch melden.',
  },
  {
    id: 'polymyalgia-rheumatica',
    name: 'Polymyalgia rheumatica',
    zusatz: 'Muskelrheuma im Alter',
    gebiet: 'bewegung',
    suche:
      'polymyalgia rheumatica pmr polymyalgie muskelrheuma schulterguertel beckenguertel morgensteifigkeit crp bsg blutsenkung entzuendungswerte riesenzellarteriitis rza arteriitis temporalis horton schlaefenarterie kopfschmerz sehstoerung erblindung kortison prednisolon glukokortikoid methotrexat mtx tocilizumab',
    bilder: { behandlung: 'polymyalgia-rheumatica-behandlung' },
    was: [
      'Die Polymyalgia rheumatica ist eine entzündliche Rheumaerkrankung älterer Menschen. Sie beginnt fast nur nach dem 50. Lebensjahr, meist um das 70.',
      'Innerhalb von Tagen bis wenigen Wochen kommen starke Schmerzen und Steifigkeit in Schultern, Oberarmen und Nacken, oft auch an Hüften und Oberschenkeln – auf beiden Seiten.',
      'Morgens ist es am schlimmsten. Aufstehen, Anziehen oder die Arme heben fallen dann schwer.',
      'Dazu kommen oft Abgeschlagenheit, wenig Appetit, Gewichtsverlust oder leichtes Fieber. Die Muskeln selbst werden nicht geschädigt.',
    ],
    ursachen: [
      'Die Ursache ist nicht bekannt. Entzündet sind vor allem Schleimbeutel und Sehnenhüllen rund um Schultern und Hüften.',
      'Im Blut sind die Entzündungswerte (CRP, Blutsenkung) fast immer deutlich erhöht. Einen beweisenden Test gibt es nicht, deshalb schließen wir andere Ursachen aus.',
      'Eng verwandt ist eine Entzündung großer Schlagadern, die Riesenzellarteriitis. Sie befällt oft die Adern an der Schläfe und kann zu plötzlicher Erblindung führen.',
      'Sie tritt bei einem Teil der Betroffenen gemeinsam mit der Polymyalgie auf – daher ist es wichtig, ihre Warnzeichen zu kennen.',
    ],
    behandlung: [
      'Behandelt wird mit Kortison, zum Beispiel Prednisolon. Meist geht es schon nach wenigen Tagen deutlich besser.',
      'Danach verringern wir die Dosis langsam, Schritt für Schritt über viele Monate. Die Behandlung dauert oft ein Jahr oder länger.',
      'Kehren die Beschwerden beim Verringern zurück, erhöhen wir die Dosis wieder etwas. Bei häufigen Rückfällen hilft ein zusätzliches Medikament, das Kortison spart.',
      'Weil Kortison auf Dauer Knochen, Blutzucker und Blutdruck belastet, kontrollieren wir diese regelmäßig und schützen die Knochen, zum Beispiel mit Vitamin D.',
    ],
    selbst: [
      'Setzen Sie Kortison nie plötzlich ab und verringern Sie es nur nach Plan. Ein Kortison-Ausweis hilft im Notfall.',
      'Bleiben Sie in Bewegung und kräftigen Sie Ihre Muskeln – das wirkt dem Muskel- und Knochenabbau unter Kortison entgegen.',
      'Achten Sie auf wenig Zucker und Salz und auf Ihr Gewicht.',
      'Kommen beim Verringern Schmerzen oder Steifigkeit zurück, melden Sie sich, statt selbst die Dosis zu ändern.',
    ],
    warnung:
      'Neue Kopfschmerzen an den Schläfen, schmerzende Kopfhaut, Schmerzen beim Kauen oder Sehstörungen wie Doppelbilder, Schleier oder Sehverlust: sofort am selben Tag ärztlich vorstellen, bei Sehstörung über die Notaufnahme oder 112.',
  },
  {
    id: 'fibromyalgie',
    name: 'Fibromyalgie',
    zusatz: 'Chronischer Schmerz in vielen Körperregionen',
    gebiet: 'bewegung',
    suche:
      'fibromyalgie fibromyalgiesyndrom fms weichteilrheuma ganzkoerperschmerz chronische schmerzen schmerzen ueberall tender points schmerzverarbeitung erschoepfung nicht erholsamer schlaf konzentration fibro fog amitriptylin duloxetin ausdauertraining funktionstraining verhaltenstherapie multimodale schmerztherapie',
    bilder: { selbst: 'fibromyalgie-selbst' },
    was: [
      'Bei der Fibromyalgie bestehen seit mindestens drei Monaten Schmerzen in vielen Bereichen des Körpers: links und rechts, oben und unten und am Rücken.',
      'Dazu kommen fast immer große Müdigkeit, ein Schlaf, der nicht erholt, und oft Probleme mit Konzentration und Gedächtnis.',
      'Gelenke und Muskeln sind dabei nicht entzündet und nicht geschädigt. Blutwerte und Röntgenbilder sind unauffällig.',
      'Die Schmerzen sind trotzdem echt. Das Nervensystem verarbeitet Schmerzreize verstärkt – wie ein zu laut gestellter Lautstärkeregler.',
    ],
    ursachen: [
      'Die genaue Ursache ist nicht bekannt. Meist kommen mehrere Dinge zusammen: Veranlagung, anhaltender Stress, belastende Erlebnisse und schlechter Schlaf.',
      'Auch andere Schmerzkrankheiten, wenig Bewegung und seelische Belastung wie Angst oder Depression können die Beschwerden auslösen oder verstärken.',
      'Frauen sind häufiger betroffen. Die Fibromyalgie kann aber in jedem Alter und bei Männern auftreten.',
      'Sie ist nicht gefährlich und zerstört keine Gelenke. Sie kann den Alltag aber sehr belasten.',
    ],
    behandlung: [
      'Zuerst schließen wir andere Ursachen aus, zum Beispiel mit Blutwerten. Steht die Diagnose fest, sind weitere Untersuchungen meist nicht nötig.',
      'Am besten hilft regelmäßige, angepasste Bewegung: Ausdauertraining wie Gehen, Radfahren oder Wassergymnastik, dazu leichtes Krafttraining.',
      'Eine Psychotherapie hilft, mit Schmerz und Stress anders umzugehen. Bei starken Beschwerden gibt es Schmerzprogramme, in denen Ärzte, Therapeuten und Psychologen zusammenarbeiten.',
      'Medikamente spielen eine kleinere Rolle. Ein niedrig dosiertes Mittel aus der Gruppe der Antidepressiva kann Schmerz und Schlaf bessern. Starke Schmerzmittel und Kortison helfen nicht.',
    ],
    selbst: [
      'Fangen Sie klein an, zum Beispiel mit zehn Minuten Gehen am Tag, und steigern Sie langsam. Etwas mehr Schmerz am Anfang ist normal und kein Schaden.',
      'Wärme, Entspannung und ruhige Bewegungsformen wie Tai-Chi, Qigong oder Yoga tun vielen gut.',
      'Halten Sie feste Schlafzeiten ein und planen Sie Pausen, ohne sich ganz zu schonen.',
      'Der Austausch in einer Selbsthilfegruppe kann entlasten und Mut machen.',
    ],
    warnung:
      'Fieber, ungewollte Gewichtsabnahme, geschwollene Gelenke, Lähmungen oder ganz neue Schmerzen bitte abklären lassen. Bei Gedanken, nicht mehr leben zu wollen: sofort Hilfe holen.',
  },
];
