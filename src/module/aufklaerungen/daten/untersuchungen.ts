import type { Krankheit } from './typen';

// Untersuchungen und Befunde: Was wird gemessen, wie läuft es ab, was bedeutet das
// Ergebnis. Statt der vier festen Krankheitsseiten gibt es frei benannte Seiten.
// Normbereiche stehen nur grob da – sie hängen vom Labor und von der Person ab.

export const UNTERSUCHUNGEN: Krankheit[] = [
  {
    id: 'blutwerte',
    name: 'Blutwerte verstehen',
    zusatz: 'Laborwerte',
    gebiet: 'untersuchungen',
    suche:
      'labor blutabnahme blutbild hb haemoglobin leukozyten thrombozyten kreatinin egfr niere leberwerte got gpt ggt ast alt tsh schilddruese zucker nuechternzucker hba1c blutfette cholesterin ldl hdl triglyzeride normwert',
    seiten: [
      {
        id: 'blutbild',
        titel: 'Das Blutbild',
        kurz: 'Blutbild',
        saetze: [
          'Das Blutbild zählt die drei Sorten Blutzellen. Der rote Blutfarbstoff Hämoglobin (Hb) trägt den Sauerstoff – grob normal sind 12 bis 16 g/dl bei Frauen und 13 bis 17 bei Männern, je nach Labor.',
          'Zu wenig Hb heißt Blutarmut: müde, blass, schnell außer Atem. Häufige Gründe sind Eisenmangel und Blutverlust, etwa durch starke Regelblutungen oder unbemerkt im Darm.',
          'Die weißen Blutkörperchen (Leukozyten, grob 4.000 bis 10.000 pro Mikroliter) wehren Keime ab. Sie steigen bei Infekten, aber auch durch Kortison, Rauchen oder Stress.',
          'Die Blutplättchen (Thrombozyten, grob 150.000 bis 400.000) dichten Wunden ab. Verklumpen sie im Röhrchen, zählt das Gerät manchmal zu wenige – dann messen wir neu.',
        ],
      },
      {
        id: 'niere',
        titel: 'Nierenwerte',
        kurz: 'Niere',
        bild: 'nierenschwaeche',
        saetze: [
          'Die Nieren filtern Abfallstoffe aus dem Blut. Einer davon ist Kreatinin aus den Muskeln: Filtern die Nieren schlechter, steigt er an.',
          'Aus Kreatinin, Alter und Geschlecht wird die eGFR berechnet – wie viel Blut die Nieren pro Minute reinigen. Über 90 gilt als normal; liegt sie über Monate unter 60, ist die Niere geschwächt.',
          'Mit dem Alter sinkt die eGFR langsam. Ein leicht verminderter Wert ist dann oft normal, zählt aber für die Dosis vieler Medikamente.',
          'Verfälscht wird der Wert durch viel Fleisch am Vortag, harten Sport, viel Muskelmasse, Kreatin-Pulver oder zu wenig Trinken. Einen einzelnen Ausreißer kontrollieren wir deshalb nach.',
        ],
      },
      {
        id: 'leber',
        titel: 'Leberwerte',
        kurz: 'Leber',
        bild: 'blutwerte-leber',
        saetze: [
          'GOT, GPT und GGT sind Enzyme aus den Leberzellen. Werden die Zellen gereizt, gelangt mehr davon ins Blut. Die Obergrenzen liegen grob bei 35 bis 60 U/l, je nach Wert, Labor und Geschlecht.',
          'Leicht erhöhte Werte kommen meist von einer Fettleber durch Übergewicht, Zucker oder Alkohol. Seltener stecken Gallensteine, eine Leberentzündung durch Viren oder Medikamente dahinter.',
          'Die GGT steigt besonders durch Alkohol und manche Medikamente. Die GOT steckt auch in Muskeln und kann nach hartem Sport erhöht sein.',
          'Ein erhöhter Wert heißt nicht automatisch, dass die Leber krank ist. Wir kontrollieren nach einigen Wochen und machen bei Bedarf einen Ultraschall.',
        ],
      },
      {
        id: 'schilddruese',
        titel: 'Schilddrüsenwert TSH',
        kurz: 'Schilddrüse',
        bild: 'schilddruesenunterfunktion',
        saetze: [
          'Das TSH ist ein Steuerhormon aus der Hirnanhangdrüse. Es treibt die Schilddrüse an – ähnlich wie ein Thermostat die Heizung.',
          'Arbeitet die Schilddrüse zu wenig, steigt das TSH: Der Körper drückt aufs Gas. Bei einer Überfunktion sinkt es. Grob normal sind 0,4 bis 4 mU/l, je nach Labor; im Alter etwas höher.',
          'Ist das TSH auffällig, bestimmen wir die eigentlichen Schilddrüsenhormone und manchmal Antikörper. Leichte Abweichungen kontrollieren wir oft erst einmal.',
          'Verfälscht wird der Wert durch Biotin, das in vielen Haar- und Nagelpräparaten steckt – bitte einige Tage vorher pausieren. Auch schwere Krankheit und manche Medikamente verändern ihn.',
        ],
      },
      {
        id: 'zucker',
        titel: 'Blutzucker und HbA1c',
        kurz: 'Zucker',
        bild: 'diabetes-typ-2',
        saetze: [
          'Der Nüchternzucker zeigt den Zucker im Augenblick, nach mindestens acht Stunden ohne Essen. Normal ist unter 100 mg/dl; ab 126 mg/dl an zwei Tagen liegt ein Diabetes vor.',
          'Das HbA1c ist das Zuckergedächtnis: Es zeigt den Mittelwert der letzten zwei bis drei Monate. Unter 5,7 % ist normal, ab 6,5 % liegt ein Diabetes vor, dazwischen eine Vorstufe.',
          'Vor dem Nüchternzucker nur Wasser oder ungesüßten Tee trinken. Schon gesüßter Kaffee verfälscht ihn; auch Kortison, ein Infekt oder Stress treiben ihn hoch.',
          'Für das HbA1c müssen Sie nicht nüchtern sein. Falsch hoch oder niedrig sein kann es bei Eisenmangel, Blutarmut, Nierenschwäche oder nach einem Blutverlust.',
        ],
      },
      {
        id: 'blutfette',
        titel: 'Blutfette',
        kurz: 'Blutfette',
        bild: 'cholesterin',
        saetze: [
          'Das LDL ist das „schlechte“ Cholesterin: Zu viel davon lagert sich in den Gefäßwänden ab. Das HDL ist das „gute“ – es bringt Cholesterin zurück zur Leber.',
          'Einen festen Normwert fürs LDL gibt es nicht; das Ziel hängt vom Gesamtrisiko ab. Bei Gesunden grob unter 115 mg/dl, nach Herzinfarkt oder Schlaganfall unter 55.',
          'Triglyzeride sind Fette aus der Nahrung, grob normal unter 150 mg/dl. Sie steigen durch Zucker, Alkohol und Übergewicht – und stark nach dem Essen, deshalb messen wir sie am besten nüchtern.',
          'Ein sehr hohes LDL kann erblich sein. Dann hilft Ernährung allein wenig, und wir schauen auch auf die Familie.',
        ],
      },
    ],
  },
  {
    id: 'ekg',
    name: 'EKG',
    zusatz: 'Elektrokardiogramm',
    gebiet: 'untersuchungen',
    suche:
      'elektrokardiogramm herzstromkurve ruhe-ekg belastungs-ekg ergometrie fahrrad herzrhythmus rhythmusstoerung p-welle qrs t-welle herzinfarkt',
    seiten: [
      {
        id: 'was',
        titel: 'Was ist ein EKG?',
        kurz: 'Was ist das',
        saetze: [
          'Bei jedem Schlag erzeugt das Herz einen winzigen elektrischen Strom. Das EKG misst ihn über Elektroden auf der Haut und schreibt ihn als Kurve auf.',
          'Die Untersuchung tut nicht weh und ist ungefährlich: Es fließt kein Strom in den Körper, es wird nur gemessen.',
          'Das EKG zeigt, wie schnell und wie regelmäßig das Herz schlägt und wie der Strom durch den Herzmuskel läuft.',
          'Wir machen es bei Herzklopfen, Brustschmerz, Luftnot oder Schwindel, vor Operationen und bei manchen Medikamenten.',
        ],
      },
      {
        id: 'ablauf',
        titel: 'So läuft es ab',
        kurz: 'Ablauf',
        saetze: [
          'Sie machen den Oberkörper frei und legen sich bequem hin. Bitte vorher keine Körperlotion auf die Brust.',
          'An Armen und Beinen kommen vier Elektroden an, auf die Brust sechs weitere – als Klebepunkte oder kleine Saugnäpfe.',
          'Dann bitte ruhig liegen, normal atmen und nicht sprechen: Jede Muskelbewegung stört die Kurve.',
          'Die Aufzeichnung selbst dauert nur wenige Sekunden. Mit Anlegen ist alles in etwa zehn Minuten erledigt.',
        ],
      },
      {
        id: 'kurve',
        titel: 'Was die Kurve zeigt',
        kurz: 'Die Kurve',
        saetze: [
          'Jeder Herzschlag ergibt dieselbe Form. Die kleine P-Welle zeigt, wie die Vorhöfe erregt werden.',
          'Die hohe, spitze Zacke (QRS) ist der Strom, der die Herzkammern zusammenziehen lässt. Die T-Welle danach zeigt, wie sich die Kammern wieder erholen.',
          'Daraus lesen wir den Puls, den Rhythmus, Rhythmusstörungen wie Vorhofflimmern und Hinweise auf einen Herzinfarkt oder einen verdickten Herzmuskel.',
          'Auch Salze im Blut wie Kalium und manche Medikamente verändern die Kurve.',
        ],
      },
      {
        id: 'grenzen',
        titel: 'Was das EKG nicht zeigt',
        kurz: 'Grenzen',
        saetze: [
          'Das EKG ist eine Momentaufnahme von wenigen Sekunden. Herzstolpern, das nur ab und zu kommt, wird oft verpasst – dafür gibt es das Langzeit-EKG.',
          'Verengte Herzkranzgefäße sieht man in Ruhe häufig nicht. Ein normales EKG schließt eine Herzkrankheit deshalb nicht aus.',
          'Herzklappen, Pumpkraft und Größe der Herzkammern zeigt der Herzultraschall besser.',
          'Umgekehrt sind kleine Auffälligkeiten oft harmlos. Viel sagt der Vergleich mit einem älteren EKG – bringen Sie frühere Befunde gerne mit.',
        ],
      },
      {
        id: 'belastung',
        titel: 'Das Belastungs-EKG',
        kurz: 'Belastung',
        saetze: [
          'Manche Probleme zeigen sich erst, wenn das Herz arbeiten muss. Beim Belastungs-EKG treten Sie auf einem Fahrrad, und der Widerstand steigt alle paar Minuten.',
          'Dabei messen wir laufend EKG und Blutdruck. Sie treten, bis Sie erschöpft sind, der Zielpuls erreicht ist oder wir abbrechen.',
          'Bitte bequeme Kleidung und Turnschuhe mitbringen und vorher nur leicht essen. Ob Sie Medikamente wie Betablocker an dem Tag weglassen, besprechen wir vorher.',
          'Das Risiko ist gering: Eine Ärztin oder ein Arzt ist dabei, Notfallausrüstung steht bereit.',
        ],
      },
    ],
    warnung: 'Brustschmerz, Druck auf der Brust oder plötzliche Luftnot: nicht auf einen Termin warten – Notruf 112.',
  },
  {
    id: 'langzeitmessung',
    name: 'Langzeit-EKG und Langzeit-Blutdruck',
    zusatz: 'Holter-EKG, ABDM',
    gebiet: 'untersuchungen',
    suche:
      'langzeit-ekg 24-stunden-ekg holter langzeitblutdruck 24-stunden-blutdruck abdm langzeit-rr manschette rekorder tagebuch protokoll herzstolpern weisskittel',
    seiten: [
      {
        id: 'wozu',
        titel: 'Wozu eine Langzeitmessung?',
        kurz: 'Wozu',
        saetze: [
          'Herz und Blutdruck verhalten sich im Alltag anders als im Sprechzimmer. Eine Langzeitmessung zeichnet einen ganzen Tag und die Nacht auf.',
          'Das Langzeit-EKG läuft meist 24 Stunden. Es findet Herzstolpern, Aussetzer, zu schnellen oder zu langsamen Puls und Vorhofflimmern, das nur ab und zu auftritt.',
          'Die Langzeit-Blutdruckmessung zeigt, ob der Blutdruck wirklich zu hoch ist. Manche haben nur in der Praxis hohe Werte – aus Aufregung.',
          'Auch die Nacht ist wichtig: Normalerweise sinkt der Blutdruck im Schlaf deutlich ab.',
        ],
      },
      {
        id: 'anlegen',
        titel: 'So wird angelegt',
        kurz: 'Anlegen',
        saetze: [
          'Für das Langzeit-EKG kleben wir einige Elektroden auf die Brust. Die Kabel führen zu einem kleinen Rekorder am Gürtel oder um den Hals.',
          'Für den Blutdruck bekommen Sie eine Manschette um den Oberarm, meist am nicht schreibenden Arm. Sie pumpt sich tagsüber etwa alle 15 bis 30 Minuten auf, nachts seltener.',
          'Bitte tragen Sie ein weites Hemd oder eine Bluse, damit alles gut darunter passt.',
          'Das Anlegen dauert etwa zehn Minuten. Am nächsten Tag zur gleichen Zeit nehmen wir alles wieder ab.',
        ],
      },
      {
        id: 'tagebuch',
        titel: 'Das Tagebuch',
        kurz: 'Tagebuch',
        saetze: [
          'Sie bekommen ein kurzes Protokoll. Schreiben Sie mit Uhrzeit hinein, was Sie tun: aufstehen, Arbeit, Treppe, Sport, Essen, Medikamente, zu Bett gehen.',
          'Besonders wichtig sind Beschwerden: Herzklopfen, Stolpern, Schwindel oder Druck auf der Brust – mit genauer Uhrzeit.',
          'Viele Rekorder haben eine Taste für solche Momente. Drücken Sie sie, wenn Sie etwas spüren.',
          'So sehen wir später, ob Ihre Beschwerden zu einer Veränderung in der Aufzeichnung passen.',
        ],
      },
      {
        id: 'beachten',
        titel: 'Was Sie beachten sollten',
        kurz: 'Beachten',
        saetze: [
          'Leben Sie den Tag so normal wie möglich – wir wollen Ihren echten Alltag sehen. Arbeit, Spaziergänge und Treppensteigen sind ausdrücklich erwünscht.',
          'Nicht duschen, baden oder schwimmen, solange die Geräte angelegt sind. Elektroden und Rekorder dürfen nicht nass werden.',
          'Pumpt die Manschette, lassen Sie den Arm locker hängen und halten still; im Gehen kurz stehen bleiben. Rutscht sie, schieben Sie sie wieder zurecht.',
          'Löst sich eine Elektrode, drücken Sie sie wieder fest. Eine Heizdecke bitte nachts ausschalten.',
        ],
      },
      {
        id: 'auswertung',
        titel: 'Die Auswertung',
        kurz: 'Auswertung',
        saetze: [
          'Der Rekorder speichert über 100.000 Herzschläge. Ein Computer sortiert sie vor, wir sehen uns die auffälligen Stellen genau an.',
          'Einzelne Extraschläge hat fast jeder Gesunde. Wichtig ist, wie oft sie kommen, ob Pausen oder Vorhofflimmern auftreten und ob sie zu Ihren Beschwerden passen.',
          'Beim Blutdruck zählt der Mittelwert: Tagsüber gelten Werte ab etwa 135/85 als erhöht, im Mittel über 24 Stunden ab 130/80.',
          'Das Ergebnis besprechen wir in einem eigenen Termin einige Tage später.',
        ],
      },
    ],
    warnung: 'Ohnmacht, Brustschmerz oder starke Luftnot während der Messung: sofort 112 – nicht auf die Auswertung warten.',
  },
  {
    id: 'lungenfunktion',
    name: 'Lungenfunktion',
    zusatz: 'Spirometrie',
    gebiet: 'untersuchungen',
    suche:
      'spirometrie lufu lungenfunktionstest fev1 vitalkapazitaet tiffeneau fluss-volumen-kurve asthma copd bronchospasmolyse reversibilitaet spray salbutamol pusten',
    seiten: [
      {
        id: 'wozu',
        titel: 'Wozu eine Lungenfunktion?',
        kurz: 'Wozu',
        saetze: [
          'Die Lungenfunktion – Fachwort Spirometrie – misst, wie viel Luft Sie ausatmen können und wie schnell.',
          'Sie hilft, Asthma und COPD zu erkennen und voneinander zu unterscheiden. Und sie zeigt, ob eine Behandlung wirkt.',
          'Wir machen sie bei länger anhaltendem Husten, Luftnot oder pfeifender Atmung, und bei Raucherinnen und Rauchern.',
          'Die Messung ist ungefährlich und dauert etwa eine Viertelstunde.',
        ],
      },
      {
        id: 'ablauf',
        titel: 'So läuft es ab: kräftig mitmachen',
        kurz: 'Ablauf',
        saetze: [
          'Sie sitzen aufrecht, eine Klammer verschließt die Nase. Sie atmen nur durch ein Mundstück, die Lippen fest darum.',
          'Nach ein paar ruhigen Atemzügen atmen Sie so tief ein wie möglich. Dann stoßen Sie die Luft mit aller Kraft aus – und pusten weiter, bis wirklich nichts mehr kommt.',
          'Das Ergebnis hängt ganz von Ihrem Mitmachen ab. Wir feuern Sie an und wiederholen den Versuch zwei- bis dreimal.',
          'Vorher bitte nicht rauchen, nicht schwer essen und keine enge Kleidung. Ob Sie Ihr Spray an dem Tag weglassen sollen, sagen wir Ihnen vorher.',
        ],
      },
      {
        id: 'kurve',
        titel: 'Was die Kurve zeigt',
        kurz: 'Die Kurve',
        saetze: [
          'Die Kurve zeigt, wie schnell die Luft beim kräftigen Ausatmen herausströmt. Bei gesunder Lunge steigt sie steil an und fällt dann fast gerade ab.',
          'Zwei Werte sind besonders wichtig: die Luftmenge in der ersten Sekunde (FEV1) und die gesamte ausgeatmete Menge (Vitalkapazität).',
          'Sind die Atemwege eng wie bei Asthma oder COPD, kommt die Luft langsamer heraus. Die Kurve hängt durch, und in der ersten Sekunde schafft man weniger als 70 Prozent der Gesamtmenge.',
          'Verglichen wird mit Normwerten für Ihr Alter, Ihre Größe und Ihr Geschlecht.',
        ],
      },
      {
        id: 'spray',
        titel: 'Der Test mit Spray',
        kurz: 'Mit Spray',
        saetze: [
          'Ist die Kurve auffällig, folgt oft ein zweiter Durchgang: Sie inhalieren ein Spray, das die Atemwege weit stellt. Nach etwa 15 Minuten messen wir erneut.',
          'Wird es deutlich besser, spricht das für Asthma. Bleiben die Atemwege eng, eher für COPD.',
          'Das Spray kann kurz Herzklopfen oder leichtes Zittern machen. Das vergeht rasch.',
          'Für die Diagnose zählt das Gesamtbild aus Beschwerden, Untersuchung und Messung.',
        ],
      },
    ],
  },
  {
    id: 'ultraschall',
    name: 'Ultraschall',
    zusatz: 'Sonografie',
    gebiet: 'untersuchungen',
    suche:
      'sonografie sonographie sono schall bauch abdomen nuechtern leber galle gallensteine niere schilddruese knoten halsschlagader carotis doppler bauchschlagader aorta aneurysma herzultraschall echo',
    seiten: [
      {
        id: 'prinzip',
        titel: 'Wie Ultraschall funktioniert',
        kurz: 'So geht es',
        saetze: [
          'Der Schallkopf sendet Schallwellen, die zu hoch sind, um sie zu hören. Die Organe werfen sie zurück wie ein Echo, und daraus entsteht ein Bild.',
          'Ultraschall ist ungefährlich: keine Strahlung, keine Spritze, keine Schmerzen. Er kann beliebig oft wiederholt werden, auch in der Schwangerschaft.',
          'Das Gel auf der Haut sorgt dafür, dass keine Luft zwischen Schallkopf und Haut ist. Es ist etwas kühl und lässt sich einfach abwischen.',
          'Das Bild entsteht sofort: Wir sehen Organe, die sich bewegen, und Blut, das fließt.',
        ],
      },
      {
        id: 'bauch',
        titel: 'Ultraschall des Bauches',
        kurz: 'Bauch',
        saetze: [
          'Wir sehen Leber, Gallenblase, Bauchspeicheldrüse, Milz, Nieren, Harnblase und die große Bauchschlagader.',
          'Bitte kommen Sie nüchtern: sechs Stunden vorher nichts essen, nicht rauchen, kein Kaugummi. Wasser und ungesüßter Tee sind erlaubt.',
          'Nach dem Essen zieht sich die Gallenblase zusammen, und Luft im Darm verdeckt die Sicht. Für die Harnblase ist es gut, wenn sie etwas gefüllt ist.',
          'Häufige Befunde sind eine Fettleber, Gallensteine, Zysten oder Nierensteine.',
        ],
      },
      {
        id: 'schilddruese',
        titel: 'Ultraschall der Schilddrüse',
        kurz: 'Schilddrüse',
        saetze: [
          'Die Schilddrüse liegt direkt unter der Haut am Hals und ist im Ultraschall sehr gut zu sehen.',
          'Wir messen ihre Größe und sehen Knoten, Zysten oder Zeichen einer Entzündung.',
          'Knoten sind sehr häufig, gerade mit zunehmendem Alter. Fast alle sind gutartig; manche kontrollieren wir in Abständen.',
          'Vorbereitung braucht es keine. Sie liegen mit leicht überstrecktem Kopf, die Untersuchung dauert nur wenige Minuten.',
        ],
      },
      {
        id: 'gefaesse',
        titel: 'Gefäße und Herz',
        kurz: 'Gefäße, Herz',
        saetze: [
          'An den Halsschlagadern sehen wir Ablagerungen und Verengungen, die das Risiko für einen Schlaganfall erhöhen.',
          'Mit dem Doppler, einer besonderen Einstellung, wird der Blutfluss farbig sichtbar. So finden wir auch Gerinnsel in den Beinvenen.',
          'Männer ab 65 haben einmal Anspruch auf einen Ultraschall der Bauchschlagader, um eine gefährliche Erweiterung früh zu finden.',
          'Der Herzultraschall zeigt Pumpkraft, Herzklappen und Herzwände. Ihn macht meist die Kardiologie.',
        ],
      },
      {
        id: 'grenzen',
        titel: 'Grenzen des Ultraschalls',
        kurz: 'Grenzen',
        saetze: [
          'Schall dringt nicht durch Luft und Knochen. Darm, Lunge und Gehirn sieht man deshalb kaum.',
          'Bei viel Bauchfett oder vielen Blähungen wird das Bild unscharf.',
          'Manchmal braucht es danach ein CT oder eine MRT, um einen Befund genauer zu klären.',
          'Nicht jeder Zufallsbefund ist krank: Kleine Zysten in Leber oder Niere sind häufig und meist harmlos.',
        ],
      },
    ],
  },
  {
    id: 'psa',
    name: 'PSA-Wert',
    zusatz: 'Prostatakrebs-Früherkennung',
    gebiet: 'untersuchungen',
    suche:
      'psa prostataspezifisches antigen prostata prostatakrebs frueherkennung vorsorge igel selbstzahler urologie mrt biopsie aktive ueberwachung ueberdiagnose',
    seiten: [
      {
        id: 'was',
        titel: 'Was ist der PSA-Wert?',
        kurz: 'Was ist das',
        saetze: [
          'PSA heißt prostataspezifisches Antigen. Es ist ein Eiweiß, das die Prostata bildet; ein kleiner Teil gelangt ins Blut.',
          'Ein erhöhter Wert kann auf Prostatakrebs hinweisen. Häufiger steckt aber eine gutartige Vergrößerung oder eine Entzündung der Prostata dahinter.',
          'Einen festen Grenzwert gibt es nicht. Grob gilt ein Wert ab 3 ng/ml als abklärungsbedürftig – je nach Alter, Verlauf und Labor.',
          'Der PSA-Test ist ein Suchtest. Eine Diagnose stellt er nicht.',
        ],
      },
      {
        id: 'nutzen',
        titel: 'Was die Früherkennung bringt',
        kurz: 'Nutzen',
        saetze: [
          'Mit dem PSA-Test lässt sich Prostatakrebs früher finden, oft lange bevor er Beschwerden macht.',
          'Große Studien zeigen: Von 1.000 Männern, die über viele Jahre regelmäßig testen, werden etwa ein bis drei vor dem Tod durch Prostatakrebs bewahrt.',
          'Auch fortgeschrittene Tumore mit Absiedlungen werden seltener.',
          'Wie lange man insgesamt lebt, ändert der Test nach heutigem Wissen kaum.',
        ],
      },
      {
        id: 'risiken',
        titel: 'Was dagegen spricht',
        kurz: 'Risiken',
        saetze: [
          'Viele ältere Männer haben langsam wachsende Tumore, die ihnen zeitlebens nie geschadet hätten. Der Test findet auch sie – das nennt man Überdiagnose.',
          'Fehlalarme sind häufig: Der Wert ist erhöht, aber es ist kein Krebs. Das macht Sorgen und weitere Untersuchungen nötig.',
          'Eine Operation oder Bestrahlung kann zu Inkontinenz und Erektionsstörungen führen.',
          'Ob Sie den Test möchten, entscheiden wir gemeinsam. Als Vorsorge ohne Beschwerden ist er eine Selbstzahlerleistung (IGeL); bei Beschwerden oder Verdacht zahlt die Kasse.',
        ],
      },
      {
        id: 'verfaelschung',
        titel: 'Was den Wert verfälscht',
        kurz: 'Verfälschung',
        saetze: [
          'Druck auf die Prostata lässt den Wert kurzfristig steigen: Radfahren, Reiten, ein Samenerguss, eine Tastuntersuchung oder ein Blasenkatheter.',
          'Verzichten Sie deshalb zwei Tage vor der Blutabnahme auf Radfahren und Samenerguss.',
          'Eine Entzündung von Prostata oder Blase kann den Wert für Wochen deutlich erhöhen.',
          'Medikamente gegen eine vergrößerte Prostata wie Finasterid senken ihn etwa auf die Hälfte – das berücksichtigen wir beim Lesen.',
        ],
      },
      {
        id: 'erhoeht',
        titel: 'Wenn der Wert erhöht ist',
        kurz: 'Wie weiter',
        saetze: [
          'Ein einzelner erhöhter Wert ist noch kein Krebs. Zuerst messen wir nach einigen Wochen erneut, unter gleichen Bedingungen.',
          'Bleibt er erhöht, geht es zur Urologie. Dort folgen meist eine Tastuntersuchung und eine MRT der Prostata.',
          'Zeigt die MRT eine verdächtige Stelle, wird dort gezielt eine Gewebeprobe entnommen. Erst sie sichert die Diagnose.',
          'Bei einem kleinen, wenig aggressiven Tumor reicht oft regelmäßiges Beobachten statt Operation – die aktive Überwachung.',
        ],
      },
    ],
    warnung: 'Bitte bald kommen bei Blut im Urin oder Sperma, neuen Problemen beim Wasserlassen oder Knochenschmerzen.',
  },
  {
    id: 'darmkrebsvorsorge',
    name: 'Stuhltest und Darmspiegelung',
    zusatz: 'Darmkrebs-Früherkennung',
    gebiet: 'untersuchungen',
    suche:
      'darmkrebs vorsorge frueherkennung stuhltest ifobt fit okkultes blut haemoccult darmspiegelung koloskopie polyp polypen abfuehren abfuehrmittel schlafspritze',
    seiten: [
      {
        id: 'ueberblick',
        titel: 'Darmkrebs früh erkennen',
        kurz: 'Überblick',
        saetze: [
          'Darmkrebs entsteht meist über viele Jahre aus zunächst gutartigen Wucherungen der Schleimhaut, den Polypen.',
          'Werden Polypen früh gefunden und entfernt, kann daraus kein Krebs mehr werden. Kaum ein anderer Krebs lässt sich so gut verhindern.',
          'Zwei Wege gibt es: einen Stuhltest auf unsichtbares Blut oder gleich die Darmspiegelung.',
          'Am Anfang macht Darmkrebs keine Beschwerden. Deshalb lohnt die Vorsorge gerade dann, wenn man sich gesund fühlt.',
        ],
      },
      {
        id: 'anspruch',
        titel: 'Was Ihnen zusteht',
        kurz: 'Wie oft',
        saetze: [
          'Frauen und Männer haben ab 50 Jahren denselben Anspruch auf Darmkrebs-Früherkennung. Die Kasse bezahlt.',
          'Sie wählen: alle zwei Jahre einen Stuhltest – oder zwei Darmspiegelungen im Abstand von zehn Jahren.',
          'Nach einer unauffälligen Darmspiegelung braucht es in den zehn Jahren danach keinen Stuhltest.',
          'Hatten Eltern oder Geschwister Darmkrebs, ist eine frühere Vorsorge sinnvoll – sprechen Sie uns an.',
        ],
      },
      {
        id: 'stuhltest',
        titel: 'Der Stuhltest',
        kurz: 'Stuhltest',
        saetze: [
          'Der immunologische Stuhltest sucht nach Blut im Stuhl, das man mit bloßem Auge nicht sieht. Polypen und Tumore bluten oft unbemerkt.',
          'Sie nehmen zu Hause mit dem Stäbchen eine kleine Probe, indem Sie an mehreren Stellen in den Stuhl stechen. Eine Diät ist nicht nötig.',
          'Das Röhrchen bringen Sie am besten am selben oder nächsten Tag in die Praxis.',
          'Ist der Test positiv, ist eine Darmspiegelung nötig – auch wenn meist etwas Harmloses dahintersteckt.',
        ],
      },
      {
        id: 'vorbereitung',
        titel: 'Vor der Darmspiegelung',
        kurz: 'Vorbereitung',
        saetze: [
          'Damit man alles sieht, muss der Darm ganz leer sein. Einige Tage vorher bitte keine Körner, Kerne und kein Vollkorn – also kein Müsli, keine Tomaten, Trauben oder Kiwis.',
          'Am Tag davor gibt es nur noch ein leichtes Frühstück, danach nur klare Flüssigkeit.',
          'Am Abend vorher und am Morgen trinken Sie eine Abführlösung und dazu viel klare Flüssigkeit. Bleiben Sie in der Nähe einer Toilette.',
          'Der Darm ist sauber, wenn nur noch klare, gelbliche Flüssigkeit kommt. Blutverdünner, Eisen- und Zuckermedikamente besprechen Sie bitte vorher mit uns.',
        ],
      },
      {
        id: 'ablauf',
        titel: 'Die Darmspiegelung',
        kurz: 'Ablauf',
        saetze: [
          'Die meisten bekommen eine Schlafspritze und merken von der Untersuchung nichts. Sie dauert etwa 20 bis 30 Minuten.',
          'Ein dünner, biegsamer Schlauch mit Kamera wird durch den After bis zum Anfang des Dickdarms geschoben. Etwas Luft entfaltet den Darm, damit man alles sieht.',
          'Nach der Schlafspritze dürfen Sie den Rest des Tages nicht Auto fahren und nicht arbeiten. Bitte lassen Sie sich abholen.',
          'Blutungen oder eine Verletzung der Darmwand sind selten, etwas häufiger nach dem Entfernen großer Polypen.',
        ],
      },
      {
        id: 'polypen',
        titel: 'Polypen',
        kurz: 'Polypen',
        saetze: [
          'Polypen sind kleine Wucherungen der Darmschleimhaut. Sie sind häufig und anfangs gutartig; manche werden über Jahre zu Krebs.',
          'Bei der Spiegelung werden sie gleich mit einer kleinen Schlinge entfernt. Das tut nicht weh.',
          'Das Gewebe wird im Labor untersucht. Davon hängt ab, wann die nächste Spiegelung nötig ist – manchmal schon nach drei bis fünf Jahren.',
          'Ist der Darm unauffällig, reicht die nächste Spiegelung nach zehn Jahren.',
        ],
      },
    ],
    warnung: 'Blut im Stuhl nie auf Hämorrhoiden schieben – immer abklären lassen. Ebenso einen Stuhlgang, der sich über Wochen verändert.',
  },  {
    id: 'blutdruck-messen',
    name: 'Blutdruck zu Hause messen',
    zusatz: 'Selbstmessung',
    gebiet: 'untersuchungen',
    suche:
      'blutdruck messen selbstmessung blutdruckmessgeraet oberarm handgelenk manschette blutdrucktagebuch blutdruckpass hausmessung bluthochdruck hypertonie 135 85 messwerte protokoll',
    seiten: [
      {
        id: 'warum',
        titel: 'Warum zu Hause messen?',
        kurz: 'Warum?',
        bild: 'blutdruck-messen',
        saetze: [
          'In der Praxis ist der Blutdruck oft höher als im Alltag – allein durch die Aufregung.',
          'Messungen zu Hause zeigen besser, wie Ihr Blutdruck wirklich ist, und ob die Tabletten wirken.',
          'Am genauesten sind Geräte für den Oberarm. Achten Sie auf ein geprüftes Gerät, etwa mit dem Siegel der Hochdruckliga.',
          'Die Manschette muss zum Arm passen. Bei sehr kräftigem Oberarm gibt es größere.',
        ],
      },
      {
        id: 'richtig',
        titel: 'So messen Sie richtig',
        kurz: 'Richtig messen',
        bild: 'blutdruck-messen',
        saetze: [
          'Setzen Sie sich bequem an einen Tisch, Rücken angelehnt, Füße flach auf dem Boden, Beine nicht übereinander.',
          'Fünf Minuten ruhig sitzen, nicht sprechen. Davor eine halbe Stunde kein Kaffee, keine Zigarette, kein Sport.',
          'Die Manschette sitzt auf der nackten Haut, zwei Finger breit über der Ellenbeuge, auf Höhe des Herzens. Der Arm liegt locker auf dem Tisch.',
          'Zweimal messen, mit einer Minute Pause dazwischen, und beide Werte aufschreiben.',
        ],
      },
      {
        id: 'wann',
        titel: 'Wann und wie oft?',
        kurz: 'Wann?',
        bild: 'blutdruck-plan',
        saetze: [
          'Morgens vor dem Frühstück und vor den Tabletten, abends vor dem Abendessen.',
          'Vor einem Termin bei uns messen Sie so eine Woche lang, jeden Tag morgens und abends.',
          'Ist der Blutdruck gut eingestellt, reichen danach einige Messungen pro Woche oder Monat.',
          'Schreiben Sie die Werte in ein Tagebuch oder nutzen Sie den Speicher des Geräts, und bringen Sie beides mit.',
        ],
      },
      {
        id: 'werte',
        titel: 'Was die Werte bedeuten',
        kurz: 'Werte',
        bild: 'blutdruck-plan',
        saetze: [
          'Zu Hause gilt ein Blutdruck ab 135 zu 85 als erhöht – die Grenze liegt etwas niedriger als in der Praxis.',
          'Entscheidend ist der Durchschnitt über mehrere Tage, nicht ein einzelner Ausreißer.',
          'Ihr persönliches Ziel besprechen wir gemeinsam.',
          'Messen Sie nicht ständig. Häufiges Messen bei jeder Unruhe treibt den Druck eher hoch.',
        ],
      },
    ],
    warnung:
      'Über 180 zu 110 mit Brustschmerz, Atemnot, Lähmung, Sprach- oder Sehstörung: sofort 112. Ohne Beschwerden: eine halbe Stunde ruhen, erneut messen und uns anrufen.',
  },
  {
    id: 'blutzucker-messen',
    name: 'Blutzucker selbst messen',
    zusatz: 'Messgerät und Sensor',
    gebiet: 'untersuchungen',
    suche:
      'blutzucker messen blutzuckermessgeraet teststreifen lanzette stechhilfe fingerkuppe zucker glukose diabetes insulin unterzucker hypoglykaemie ueberzucker sensor cgm libre dexcom tagebuch mg/dl',
    seiten: [
      {
        id: 'wann',
        titel: 'Wann ist Messen sinnvoll?',
        kurz: 'Wann?',
        bild: 'blutzucker-messen',
        saetze: [
          'Wer Insulin spritzt, misst regelmäßig – vor allem vor den Mahlzeiten und vor dem Schlafen. Danach richtet sich die Dosis.',
          'Mit Tabletten, die keinen Unterzucker machen, ist tägliches Messen meist nicht nötig. Dort zeigt der HbA1c-Wert alle paar Monate, wie es läuft.',
          'Zusätzlich messen Sie, wenn Sie sich unwohl fühlen, bei Infekten und vor dem Autofahren, wenn Sie Insulin nehmen.',
        ],
      },
      {
        id: 'messen',
        titel: 'So messen Sie',
        kurz: 'Messen',
        bild: 'blutzucker-messen',
        saetze: [
          'Hände mit warmem Wasser waschen und gut abtrocknen. Zuckerreste an den Fingern verfälschen den Wert.',
          'Seitlich in die Fingerkuppe stechen, nicht in die Mitte. Daumen und Zeigefinger besser schonen.',
          'Den Tropfen sanft herausmassieren, nicht fest quetschen, und an den Teststreifen halten.',
          'Wert aufschreiben oder im Gerät speichern, Stechstelle wechseln.',
        ],
      },
      {
        id: 'werte',
        titel: 'Was die Werte bedeuten',
        kurz: 'Werte',
        bild: 'blutzucker-werte',
        saetze: [
          'Vor dem Essen liegt ein guter Wert für viele bei etwa 80 bis 130 mg/dl, zwei Stunden nach dem Essen unter 180.',
          'Unter 70 mg/dl ist ein Unterzucker. Dann sofort handeln.',
          'Liegen die Werte mehrmals über 250, melden Sie sich bei uns.',
          'Ihre persönlichen Zielwerte legen wir gemeinsam fest – im Alter oft etwas höher.',
        ],
      },
      {
        id: 'unterzucker',
        titel: 'Bei Unterzucker',
        kurz: 'Unterzucker',
        bild: 'unterzucker',
        saetze: [
          'Zeichen sind Zittern, Schwitzen, Herzklopfen, Heißhunger, Unruhe oder Verwirrtheit.',
          'Essen oder trinken Sie sofort schnellen Zucker: vier Plättchen Traubenzucker oder ein Glas Saft oder Cola, nicht light.',
          'Nach 15 Minuten nachmessen. Ist der Wert noch unter 70, das Gleiche noch einmal.',
          'Danach etwas Langsames essen, etwa ein Brot. Tragen Sie immer Traubenzucker bei sich.',
        ],
      },
      {
        id: 'sensor',
        titel: 'Messen mit Sensor',
        kurz: 'Sensor',
        bild: 'blutzucker-sensor',
        saetze: [
          'Ein Sensor am Oberarm misst den Zucker rund um die Uhr. Sie lesen ihn mit dem Handy oder einem Lesegerät ab – ohne Stechen.',
          'Er zeigt auch, ob der Zucker gerade steigt oder fällt, und kann bei Unterzucker warnen.',
          'Die Kasse zahlt ihn meist, wenn Sie mehrmals täglich Insulin spritzen. Er wird alle ein bis zwei Wochen gewechselt.',
        ],
      },
    ],
    warnung:
      'Ist jemand mit Unterzucker nicht mehr ansprechbar, nichts in den Mund geben, in die stabile Seitenlage bringen und 112 rufen.',
  },
];
