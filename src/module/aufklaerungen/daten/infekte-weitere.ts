import type { Krankheit } from './typen';

export const INFEKTE_WEITERE: Krankheit[] = [
  {
    id: 'antibiotika',
    name: 'Antibiotika: Wann helfen sie?',
    zusatz: 'Viren oder Bakterien',
    gebiet: 'infekte',
    suche:
      'antibiotikum antibiose penicillin amoxicillin viren bakterien resistenz resistent multiresistent mrsa nebenwirkungen durchfall allergie einnahme reste rezept für später',
    warnung:
      'Ausschlag mit Schwellung im Gesicht, Atemnot oder Kreislaufproblemen: sofort 112. Starker, wässriger Durchfall oder keine Besserung nach zwei bis drei Tagen: bitte melden.',
    seiten: [
      {
        id: 'ueberblick',
        titel: 'Antibiotika: Was sie können',
        kurz: 'Überblick',
        saetze: [
          'Antibiotika sind Medikamente gegen Bakterien. Sie töten Bakterien ab oder hindern sie daran, sich zu vermehren.',
          'Gegen Viren wirken sie nicht. Die meisten Infekte der Atemwege – Schnupfen, Halsschmerzen, Husten, Bronchitis – werden aber von Viren ausgelöst.',
          'Bei schweren Infekten durch Bakterien, etwa einer Lungenentzündung oder einer Nierenbeckenentzündung, können Antibiotika Leben retten.',
          'Deshalb wägen wir jedes Mal ab: Hilft das Antibiotikum Ihnen wirklich – oder bringt es vor allem Nebenwirkungen?',
        ],
      },
      {
        id: 'viren-bakterien',
        titel: 'Viren oder Bakterien?',
        kurz: 'Viren oder Bakterien',
        bild: 'antibiotika',
        saetze: [
          'Ob Viren oder Bakterien dahinterstecken, zeigen meist der Verlauf und die Untersuchung.',
          'Gelber oder grüner Schleim beweist keine Bakterien. Die Farbe kommt von Abwehrzellen.',
          'Auch Fieber allein ist kein Grund für ein Antibiotikum. Es ist die normale Antwort des Körpers auf einen Infekt.',
          'Manchmal helfen ein Schnelltest, ein Urintest oder ein Entzündungswert im Blut bei der Entscheidung.',
          'Ist es unklar, bekommen Sie vielleicht ein Rezept für später. Lösen Sie es nur ein, wenn es nach zwei bis drei Tagen nicht besser wird.',
        ],
      },
      {
        id: 'resistenzen',
        titel: 'Resistenzen: Wenn Antibiotika nicht mehr wirken',
        kurz: 'Resistenzen',
        bild: 'antibiotika-resistenz',
        saetze: [
          'Bakterien können sich so verändern, dass ein Antibiotikum ihnen nichts mehr anhaben kann. Man nennt sie dann resistent.',
          'Jede Einnahme tötet die empfindlichen Bakterien ab. Übrig bleiben die widerstandsfähigen – auch im Darm und auf der Haut, nicht nur am Ort der Entzündung.',
          'Diese resistenten Keime vermehren sich und können an andere Menschen weitergegeben werden.',
          'Infekte mit resistenten Keimen sind schwer zu behandeln. Darum gehen wir sparsam mit Antibiotika um – für Sie und für alle anderen.',
        ],
      },
      {
        id: 'nebenwirkungen',
        titel: 'Nebenwirkungen',
        kurz: 'Nebenwirkungen',
        saetze: [
          'Antibiotika treffen auch die nützlichen Bakterien im Darm, im Mund und in der Scheide.',
          'Häufig sind deshalb Durchfall, Bauchschmerzen, Übelkeit und Pilzinfektionen im Mund oder in der Scheide.',
          'Auch Hautausschläge kommen vor. Nicht jeder Ausschlag ist eine echte Allergie – lassen Sie es abklären, sonst fallen gute Mittel für später weg.',
          'Selten, aber ernst ist ein schwerer, wässriger Durchfall während oder nach der Einnahme. Er braucht eine eigene Behandlung.',
          'Manche Antibiotika vertragen sich nicht mit anderen Medikamenten. Bei Erbrechen oder Durchfall wirkt auch die Pille nicht mehr sicher.',
        ],
      },
      {
        id: 'einnahme',
        titel: 'So nehmen Sie Antibiotika richtig ein',
        kurz: 'Richtig einnehmen',
        saetze: [
          'Nehmen Sie das Antibiotikum genau so, wie wir es besprochen haben: in der verordneten Menge und in gleichmäßigen Abständen.',
          'Ob vor, zum oder nach dem Essen, steht im Beipackzettel. Manche Mittel dürfen Sie nicht zusammen mit Milch, Kalzium oder Eisen einnehmen.',
          'Die Einnahme ist heute oft kürzer als früher. Halten Sie sich an die vereinbarte Zeit, auch wenn es Ihnen schon früher besser geht.',
          'Haben Sie eine Dosis vergessen, nehmen Sie sie, sobald es Ihnen einfällt. Ist die nächste schon fast fällig, lassen Sie die vergessene aus – nie doppelt nehmen.',
        ],
      },
      {
        id: 'reste',
        titel: 'Reste nicht aufheben',
        kurz: 'Reste',
        saetze: [
          'Heben Sie übrige Tabletten nicht für den nächsten Infekt auf, und geben Sie sie nicht an andere weiter.',
          'Reste gehören in den Restmüll, nicht in Toilette oder Waschbecken.',
          'Nehmen Sie ein Antibiotikum nie auf eigene Faust.',
        ],
      },
    ],
  },
  {
    id: 'lungenentzuendung',
    name: 'Lungenentzündung',
    zusatz: 'Ambulant erworbene Pneumonie',
    gebiet: 'lunge',
    suche:
      'pneumonie cap ambulant erworbene pneumonie lungenentzündung pneumokokken crb-65 röntgen thorax husten fieber atemnot auswurf',
    was: [
      'Bei einer Lungenentzündung ist das Lungengewebe selbst entzündet – die feinen Lungenbläschen, über die Sauerstoff ins Blut gelangt.',
      'Typisch sind Fieber, Husten, oft mit Auswurf, schnelleres Atmen oder Atemnot und ein deutliches Krankheitsgefühl. Manchmal schmerzt das Atmen.',
      'Ältere Menschen haben oft wenig Fieber. Bei ihnen fallen eher Verwirrtheit, Schwäche oder Stürze auf.',
      'Wir hören die Lunge ab und messen Atmung, Puls, Blutdruck und Sauerstoff. Oft bestätigt ein Röntgenbild die Diagnose.',
    ],
    ursachen: [
      'Meist sind Bakterien die Ursache, am häufigsten Pneumokokken. Auch Viren wie Grippe-, Corona- oder RS-Viren können eine Lungenentzündung auslösen.',
      'Oft geht ein gewöhnlicher Atemwegsinfekt voraus.',
      'Gefährdet sind ältere Menschen, kleine Kinder und Menschen mit Herz-, Lungen- oder Nierenkrankheiten, Diabetes oder geschwächter Abwehr. Auch Rauchen und Schluckstörungen erhöhen das Risiko.',
      'Eine Lungenentzündung ist eine ernste Erkrankung. Sie kann den Kreislauf schwer belasten und sich im ganzen Körper ausbreiten.',
    ],
    behandlung: [
      'Ob Sie zu Hause behandelt werden können, entscheiden wir anhand einfacher Messungen: Bewusstsein, Atemfrequenz, Blutdruck, Sauerstoff und Alter.',
      'Bei einer Lungenentzündung durch Bakterien bekommen Sie ein Antibiotikum, meist Amoxicillin, in der Regel für etwa fünf Tage.',
      'Nach zwei bis drei Tagen sehen wir uns wieder oder telefonieren. Bis dahin sollte es Ihnen spürbar besser gehen.',
      'Bei schwerem Verlauf, zu wenig Sauerstoff im Blut oder wenn die Versorgung zu Hause nicht gesichert ist, gehört die Behandlung ins Krankenhaus.',
    ],
    selbst: [
      'Schonen Sie sich, trinken Sie ausreichend und nehmen Sie das Antibiotikum wie besprochen. Gegen Fieber und Schmerzen helfen Paracetamol oder Ibuprofen.',
      'Husten und Erschöpfung können noch einige Wochen bleiben. Steigern Sie die Belastung langsam.',
      'Impfungen schützen: gegen Pneumokokken ab 60 Jahren und bei bestimmten Grunderkrankungen, gegen Grippe jeden Herbst, dazu je nach Alter und Gesundheit gegen Corona und RSV.',
      'Rauchen Sie nicht – das schützt die Lunge auch vor dem nächsten Infekt.',
    ],
    warnung:
      'Zunehmende Atemnot, Verwirrtheit, bläuliche Lippen, sehr schneller Atem oder Puls oder keine Besserung nach zwei bis drei Tagen Antibiotikum: sofort melden. Bei schwerer Atemnot 112.',
  },
  {
    id: 'bindehautentzuendung',
    name: 'Bindehautentzündung',
    zusatz: 'Konjunktivitis',
    gebiet: 'infekte',
    suche:
      'konjunktivitis rotes auge augenentzündung bindehaut adenoviren keratokonjunktivitis allergisch augentropfen verklebte augen pinkeye',
    was: [
      'Die Bindehaut ist eine dünne, durchsichtige Haut. Sie überzieht das Weiße im Auge und die Innenseite der Lider.',
      'Ist sie entzündet, wird das Auge rot. Es tränt, brennt, juckt oder fühlt sich an, als wäre Sand darin.',
      'Das Sehen bleibt dabei normal, und starke Schmerzen gehören nicht dazu.',
      'Die meisten Bindehautentzündungen heilen von selbst – oft in einer Woche, bei Viren manchmal erst nach zwei bis drei Wochen.',
    ],
    ursachen: [
      'Am häufigsten sind Viren. Das Auge ist wässrig-rot, oft erst auf einer Seite, dann auf beiden. Diese Form ist sehr ansteckend.',
      'Bei Bakterien ist das Sekret eher gelb und eitrig, morgens sind die Lider oft verklebt.',
      'Bei einer Allergie, etwa gegen Pollen, jucken und tränen meist beide Augen. Ansteckend ist das nicht.',
      'Auch Zugluft, Rauch, trockene Augen oder Kontaktlinsen können die Bindehaut reizen.',
    ],
    behandlung: [
      'Gegen Viren hilft kein Antibiotikum. Befeuchtende Augentropfen und kühle Umschläge lindern die Beschwerden.',
      'Auch eine Entzündung durch Bakterien heilt meist ohne Behandlung. Antibiotische Augentropfen können sie etwas verkürzen.',
      'Bei einer Allergie nehmen Augentropfen gegen Allergie rasch den Juckreiz.',
      'Bei Schmerzen, schlechterem Sehen, Lichtscheu oder bei Kontaktlinsen schauen wir genauer hin und überweisen Sie zum Augenarzt.',
    ],
    selbst: [
      'Waschen Sie oft die Hände und fassen Sie sich möglichst nicht an die Augen.',
      'Benutzen Sie eigene Handtücher und Waschlappen und wechseln Sie sie täglich.',
      'Reinigen Sie verklebte Lider mit einem sauberen, feuchten Tuch – für jedes Auge ein neues. Kontaktlinsen bleiben bis zur Abheilung draußen.',
      'Viele Kitas nehmen Kinder mit eitriger oder ansteckender Bindehautentzündung erst wieder auf, wenn das Auge abgeheilt ist. Fragen Sie dort nach.',
    ],
    warnung:
      'Starke Augenschmerzen, schlechteres Sehen, Lichtscheu, ein Fremdkörper oder eine Verletzung im Auge oder ein rotes Auge bei Kontaktlinsen: bitte am selben Tag melden. Bei Neugeborenen immer sofort.',
  },
  {
    id: 'scharlach',
    name: 'Scharlach',
    zusatz: 'Streptokokken-Angina mit Ausschlag',
    gebiet: 'infekte',
    suche:
      'scharlach streptokokken gruppe a gas himbeerzunge erdbeerzunge ausschlag angina tonsillitis penicillin kita schule wiederzulassung infektionsschutzgesetz ifsg',
    was: [
      'Scharlach ist eine Mandelentzündung durch bestimmte Bakterien, die Streptokokken der Gruppe A, zusammen mit einem typischen Ausschlag.',
      'Er beginnt plötzlich mit Halsschmerzen und Fieber, oft auch Kopf- und Bauchschmerzen. Kinder müssen manchmal erbrechen.',
      'Nach ein bis zwei Tagen zeigt sich ein feiner, rauer Ausschlag wie Sandpapier, oft zuerst in Leiste und Achseln. Die Haut um den Mund bleibt blass.',
      'Die Zunge ist erst weiß belegt, dann himbeerrot. Nach ein bis zwei Wochen schält sich oft die Haut an Händen und Füßen.',
      'Am häufigsten erkranken Kinder in Kita und Grundschule. Aber auch Erwachsene können Scharlach bekommen.',
    ],
    ursachen: [
      'Die Bakterien werden über Tröpfchen beim Husten, Niesen und Sprechen übertragen, seltener über Hände und Gegenstände.',
      'Zwischen Ansteckung und Erkrankung liegen meist nur ein bis drei Tage.',
      'Man kann mehrmals Scharlach bekommen, denn es gibt verschiedene Erregertypen. Eine Impfung gibt es nicht.',
      'Selten folgen Wochen später Entzündungen an Herz, Gelenken oder Nieren. Auch eitrige Entzündungen in der Nachbarschaft, etwa am Ohr, kommen vor.',
    ],
    behandlung: [
      'Ein Schnelltest aus dem Rachenabstrich kann die Streptokokken nachweisen.',
      'Scharlach wird mit einem Antibiotikum behandelt, meist mit Penicillin oder Amoxicillin. Bei einer Penicillin-Allergie gibt es andere Mittel.',
      'Nehmen Sie das Antibiotikum so lange wie besprochen, auch wenn es schon nach ein bis zwei Tagen deutlich besser geht.',
      'Etwa einen Tag nach Beginn der Behandlung ist man in der Regel nicht mehr ansteckend. Gegen Fieber und Halsschmerzen helfen Ibuprofen oder Paracetamol.',
    ],
    selbst: [
      'Scharlach fällt unter das Infektionsschutzgesetz: Ihr Kind darf nicht in Kita oder Schule, und Sie informieren die Einrichtung.',
      'Mit Antibiotikum ist der Besuch ab dem zweiten Behandlungstag wieder möglich, wenn Ihr Kind keine Krankheitszeichen mehr hat. Ein Attest ist dafür in der Regel nicht nötig.',
      'Das gilt genauso für Erwachsene, die in Kita, Schule oder ähnlichen Einrichtungen arbeiten.',
      'Geschwister ohne Beschwerden brauchen keine Behandlung. Waschen Sie oft die Hände und nutzen Sie eigene Gläser und eigenes Besteck.',
    ],
    warnung:
      'Ihr Kind trinkt kaum, ist sehr schläfrig oder hat Atemnot: sofort melden. Dunkler Urin, geschwollene Gelenke oder Wassereinlagerungen in den Wochen danach: bitte bald kommen.',
  },
];
