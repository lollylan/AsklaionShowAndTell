import type { Krankheit } from './typen';

// Erektionsstörung und Harninkontinenz (Gebiet Bauch), die Krankschreibung (Arbeit) und
// Allgemeines rund ums Gesundheitswesen: 116117 oder 112, Überweisung, IGeL.
// Praxiseigene Abläufe (Notfall, Hausarztmodell, E-Rezept, ePA, DMP) stehen unter
// Praxisabläufe; hier bewusst allgemein, nicht praxisspezifisch.

export const VERSORGUNG: Krankheit[] = [
  {
    id: 'erektionsstoerung',
    name: 'Erektionsstörung',
    zusatz: 'Erektile Dysfunktion',
    gebiet: 'bauch',
    bilder: { behandlung: 'erektionsstoerung-tabletten' },
    suche:
      'erektionsstoerung erektile dysfunktion ed impotenz potenzstoerung potenz potenzmittel erektion steif glied penis sex sildenafil viagra tadalafil cialis vardenafil avanafil pde5 pde-5 hemmer testosteron nitrat nitro poppers gefaesse arteriosklerose herzinfarkt warnzeichen',
    was: [
      'Bei einer Erektionsstörung wird das Glied über längere Zeit nicht steif genug für befriedigenden Sex oder bleibt es nicht lange genug.',
      'Gelegentliche Aussetzer sind normal und kein Grund zur Sorge.',
      'Mit dem Alter wird sie häufiger – viele Männer über 60 kennen das.',
      'Eine Erektionsstörung lässt sich meist gut behandeln. Sprechen Sie uns ruhig darauf an.',
    ],
    ursachen: [
      'Für eine Erektion muss viel Blut in die Schwellkörper strömen. Dafür braucht es gesunde Gefäße, Nerven und Hormone.',
      'Die häufigste Ursache sind verengte Blutgefäße – durch Bluthochdruck, Diabetes, hohe Blutfette und Rauchen.',
      'Die Arterien im Glied sind sehr fein und werden oft einige Jahre vor den Herzkranzgefäßen eng. Eine Erektionsstörung kann deshalb ein frühes Warnzeichen für Herzinfarkt und Schlaganfall sein.',
      'Auch Medikamente, zu wenig Testosteron, eine Operation an der Prostata, Stress, Sorgen in der Partnerschaft oder eine Depression können dahinterstecken.',
    ],
    behandlung: [
      'Zuerst suchen wir die Ursache: im Gespräch, mit Blutdruck, Blutzucker und Blutfetten, bei Bedarf auch mit dem Testosteronwert. Oft lohnt sich ein Blick auf Herz und Gefäße.',
      'Meist helfen Tabletten wie Sildenafil oder Tadalafil. Sie verbessern den Blutfluss ins Glied, wirken aber nur, wenn Sie sexuell erregt sind.',
      'Sildenafil nehmen Sie etwa eine Stunde vorher, Tadalafil wirkt bis zu anderthalb Tage. Die Krankenkasse zahlt diese Tabletten nicht; Sie bekommen ein Privatrezept.',
      'Reichen Tabletten nicht, gibt es beim Urologen weitere Wege, etwa eine Spritze in den Schwellkörper, eine Vakuumpumpe oder sehr selten eine Prothese.',
      'Spielen Sorgen oder die Partnerschaft eine Rolle, hilft oft eine Paar- oder Sexualberatung.',
    ],
    selbst: [
      'Bewegen Sie sich regelmäßig – Ausdauersport tut den Gefäßen nachweislich gut.',
      'Hören Sie mit dem Rauchen auf, nehmen Sie bei Übergewicht ab und trinken Sie wenig Alkohol.',
      'Lassen Sie Blutdruck, Blutzucker und Blutfette gut einstellen.',
      'Haben Sie ein Medikament im Verdacht, setzen Sie es nicht selbst ab. Sprechen Sie mit uns – oft gibt es eine Alternative.',
      'Kaufen Sie Potenzmittel nicht ohne Rezept im Internet. Viele davon sind gefälscht.',
    ],
    warnung:
      'Potenzmittel nie zusammen mit Nitro-Spray, Nitrat-Tabletten oder „Poppers“ – der Blutdruck kann lebensgefährlich abfallen. Brustschmerz beim Sex: sofort 112. Eine Erektion, die länger als vier Stunden anhält, ist ein Notfall.',
  },
  {
    id: 'harninkontinenz',
    name: 'Harninkontinenz',
    zusatz: 'Blasenschwäche',
    gebiet: 'bauch',
    bilder: { was: 'inkontinenz-arten', behandlung: 'harninkontinenz-blasentraining' },
    suche:
      'harninkontinenz inkontinenz blasenschwaeche urinverlust ungewollter urinabgang tropfen belastungsinkontinenz stressinkontinenz dranginkontinenz ueberaktive blase reizblase oab mischinkontinenz beckenboden beckenbodentraining blasentraining blasentagebuch restharn trospium solifenacin mirabegron oestrogen band schlinge botox',
    was: [
      'Bei einer Harninkontinenz geht Urin ab, ohne dass Sie es wollen. Das betrifft sehr viele Frauen und Männer, vor allem mit zunehmendem Alter.',
      'Bei der Belastungsinkontinenz tropft Urin beim Husten, Niesen, Lachen oder Heben.',
      'Bei der Dranginkontinenz kommt der Harndrang plötzlich und so stark, dass Sie die Toilette nicht mehr rechtzeitig erreichen.',
      'Oft kommt beides zusammen vor, das heißt Mischinkontinenz. Blasenschwäche ist kein Schicksal: Meist lässt sie sich deutlich bessern.',
    ],
    ursachen: [
      'Ein schwacher Beckenboden ist die häufigste Ursache der Belastungsinkontinenz – etwa nach Geburten, in den Wechseljahren, bei Übergewicht oder bei Männern nach einer Prostata-Operation.',
      'Beim Drang ist die Blase überaktiv. Dahinter kann ein Harnwegsinfekt, eine vergrößerte Prostata, Diabetes oder eine Nervenkrankheit stecken; oft findet sich aber kein Auslöser.',
      'Verstopfung, Raucherhusten, harntreibende Tabletten, viel Kaffee oder Alkohol verstärken die Beschwerden.',
      'Unbehandelt ziehen sich viele Betroffene zurück. Häufige nächtliche Toilettengänge erhöhen im Alter das Sturzrisiko.',
    ],
    behandlung: [
      'Wir untersuchen den Urin, fragen nach Ihren Medikamenten und bitten Sie, zwei bis drei Tage ein Blasentagebuch zu führen. Mit Ultraschall sehen wir, ob Urin in der Blase zurückbleibt.',
      'Gegen die Belastungsinkontinenz hilft vor allem Beckenbodentraining unter Anleitung, das wir als Krankengymnastik verordnen. Rechnen Sie mit etwa drei Monaten, bis es deutlich wirkt.',
      'Gegen den Drang hilft Blasentraining: Sie schieben den Toilettengang Schritt für Schritt hinaus. Reicht das nicht, gibt es Tabletten, die die Blase beruhigen.',
      'Frauen nach den Wechseljahren hilft oft eine Hormoncreme für die Scheide.',
      'Helfen diese Schritte nicht, gibt es in der Urologie oder Frauenheilkunde kleine Operationen, etwa ein Band unter der Harnröhre, oder Spritzen in die Blasenwand.',
    ],
    selbst: [
      'Trainieren Sie Ihren Beckenboden täglich: anspannen, als wollten Sie Urin und Wind zurückhalten, einige Sekunden halten, dann bewusst locker lassen.',
      'Trinken Sie trotzdem genug, über den Tag verteilt etwa anderthalb Liter, abends etwas weniger. Zu wenig Trinken reizt die Blase.',
      'Gehen Sie nicht „auf Vorrat“ zur Toilette – das gewöhnt die Blase an kleine Mengen.',
      'Achten Sie auf weichen Stuhlgang, nehmen Sie bei Übergewicht ab und spannen Sie vor dem Husten oder Heben kurz den Beckenboden an.',
      'Einlagen und andere Hilfen zeigt das Thema „Hilfen bei Blasenschwäche“.',
    ],
    warnung:
      'Blut im Urin, Brennen mit Fieber, plötzlich gar kein Wasserlassen mehr oder neues Taubheitsgefühl am Gesäß und an den Innenseiten der Oberschenkel: bitte sofort melden.',
  },
  {
    id: 'krankschreibung',
    name: 'Krankschreibung',
    zusatz: 'Arbeitsunfähigkeitsbescheinigung (eAU)',
    gebiet: 'arbeit',
    suche:
      'krankschreibung krankmeldung arbeitsunfaehig arbeitsunfaehigkeit au eau elektronische arbeitsunfaehigkeitsbescheinigung gelber schein attest arbeitgeber krankenkasse abruf telefonische krankschreibung telefon video lohnfortzahlung entgeltfortzahlung krankengeld folgebescheinigung verlaengerung rueckwirkend arbeitsunfall wegeunfall berufsgenossenschaft d-arzt durchgangsarzt kind krank kinderkrankengeld kinderkrankentage',
    seiten: [
      {
        id: 'wann',
        titel: 'Ab wann brauche ich eine Krankschreibung?',
        kurz: 'Ab wann?',
        saetze: [
          'Können Sie wegen einer Krankheit nicht arbeiten, sagen Sie zuerst Ihrem Arbeitgeber Bescheid – am ersten Tag, möglichst vor Arbeitsbeginn.',
          'Dauert die Krankheit länger als drei Kalendertage, brauchen Sie spätestens am vierten Tag eine ärztliche Krankschreibung. Ihr Arbeitgeber darf sie auch früher verlangen; das steht oft im Arbeitsvertrag.',
          'Wir schreiben Sie krank, wenn Sie Ihre Arbeit wegen der Krankheit nicht machen können oder sie dadurch schlimmer würde. Es kommt also auch auf Ihren Beruf an.',
          'Rückwirkend krankschreiben dürfen wir nur ausnahmsweise und nur für wenige Tage. Kommen Sie deshalb rechtzeitig.',
        ],
      },
      {
        id: 'eau',
        titel: 'Die elektronische Krankschreibung',
        kurz: 'eAU',
        bild: 'krankschreibung',
        saetze: [
          'Die Krankschreibung schicken wir elektronisch an Ihre Krankenkasse. Ihr Arbeitgeber ruft sie dort selbst ab.',
          'Weiterleiten müssen Sie nichts. Ihrem Arbeitgeber Bescheid sagen müssen Sie trotzdem – sonst weiß er nicht, dass er abrufen soll.',
          'Die Diagnose sieht Ihr Arbeitgeber nicht, nur von wann bis wann Sie krankgeschrieben sind.',
          'Für Ihre Unterlagen bekommen Sie einen Ausdruck. Privat Versicherte bekommen die Bescheinigung weiter auf Papier und geben sie selbst ab.',
        ],
      },
      {
        id: 'telefon',
        titel: 'Krankschreibung per Telefon oder Video',
        kurz: 'Telefon',
        saetze: [
          'Kennen wir Sie aus der Praxis und sind die Beschwerden leicht, können wir Sie nach einem Telefonat für bis zu fünf Tage krankschreiben.',
          'Auch nach einer Videosprechstunde ist eine Krankschreibung möglich.',
          'Eine Verlängerung am Telefon geht in der Regel nur, wenn wir Sie vorher in der Praxis gesehen haben.',
          'Bei Fieber, starken Schmerzen, Luftnot oder wenn es nicht besser wird, wollen wir Sie sehen. Ob ein Telefonat reicht, entscheiden wir im Einzelfall.',
        ],
      },
      {
        id: 'krankengeld',
        titel: 'Lohn und Krankengeld',
        kurz: 'Krankengeld',
        bild: 'krankschreibung-geld',
        saetze: [
          'In den ersten sechs Wochen zahlt Ihr Arbeitgeber den Lohn weiter.',
          'Sind Sie wegen derselben Krankheit länger krank, zahlt ab der siebten Woche die Krankenkasse Krankengeld – etwa 70 Prozent vom Brutto, höchstens 90 Prozent vom Netto.',
          'Dafür muss die Krankschreibung ohne Lücke weiterlaufen. Die Verlängerung muss spätestens am nächsten Werktag nach dem letzten krankgeschriebenen Tag ausgestellt sein.',
          'Kommen Sie zur Verlängerung deshalb am besten schon am letzten Tag der Krankschreibung.',
          'Wegen derselben Krankheit gibt es Krankengeld höchstens 78 Wochen innerhalb von drei Jahren.',
        ],
      },
      {
        id: 'unfall',
        titel: 'Nach einem Arbeitsunfall',
        kurz: 'Arbeitsunfall',
        saetze: [
          'Ein Unfall bei der Arbeit oder auf dem direkten Weg dorthin und zurück ist ein Arbeitsunfall. Dann ist die Berufsgenossenschaft zuständig, nicht die Krankenkasse.',
          'Sagen Sie Ihrem Arbeitgeber sofort Bescheid und gehen Sie zu einem Durchgangsarzt, kurz D-Arzt. Das sind Unfallchirurgen oder Orthopäden mit besonderer Zulassung, oft auch in der Klinik.',
          'In der Hausarztpraxis dürfen wir Sie erstversorgen. Können Sie länger als am Unfalltag nicht arbeiten oder braucht es eine längere Behandlung, schicken wir Sie zum D-Arzt.',
          'Auch Kinder in Kita und Schule sowie Studierende sind auf diese Weise versichert.',
        ],
      },
      {
        id: 'kind',
        titel: 'Wenn Ihr Kind krank ist',
        kurz: 'Kind krank',
        saetze: [
          'Braucht Ihr krankes Kind Betreuung, können Sie zu Hause bleiben – in der Regel bei Kindern unter zwölf Jahren.',
          'Dafür brauchen Sie eine ärztliche Bescheinigung für Ihr Kind, meist vom Kinderarzt. Sind Sie und Ihr Kind gesetzlich versichert, zahlt die Krankenkasse Kinderkrankengeld.',
          'Die Zahl der Tage ist pro Kind und Jahr begrenzt; Alleinerziehende bekommen mehr. Wie viele es derzeit sind, sagt Ihnen Ihre Krankenkasse.',
        ],
      },
    ],
    warnung:
      'Melden Sie sich am ersten Tag bei Ihrem Arbeitgeber – die elektronische Krankschreibung ersetzt diese Meldung nicht. Für Krankengeld muss jede Verlängerung ohne Lücke anschließen.',
  },
  {
    id: 'notruf-oder-bereitschaftsdienst',
    name: '116117 oder 112?',
    zusatz: 'Bereitschaftsdienst, Notaufnahme, Rettungsdienst',
    gebiet: 'versorgung',
    suche:
      '116117 112 notruf notfall rettungsdienst rettungswagen notarzt bereitschaftsdienst aerztlicher bereitschaftsdienst kassenaerztlicher notdienst bereitschaftspraxis notaufnahme notfallambulanz krankenhaus wochenende nachts feiertag hausbesuch giftnotruf vergiftung giftinformationszentrum leitstelle apothekennotdienst zahnarzt notdienst',
    seiten: [
      {
        id: 'ueberblick',
        titel: 'Wer hilft wann?',
        kurz: 'Überblick',
        saetze: [
          'Zu den Sprechzeiten ist Ihre Hausarztpraxis die erste Anlaufstelle – auch bei plötzlichen Beschwerden.',
          'Ist die Praxis zu und kann es nicht bis zum nächsten Werktag warten, hilft der ärztliche Bereitschaftsdienst unter 116117.',
          'Bei Lebensgefahr rufen Sie sofort den Rettungsdienst unter 112 – Tag und Nacht.',
          'Beide Nummern sind kostenlos und funktionieren ohne Vorwahl, auch vom Handy. Die 112 gilt in ganz Europa.',
        ],
      },
      {
        id: 'notruf',
        titel: 'Die 112 bei Lebensgefahr',
        kurz: '112',
        saetze: [
          'Wählen Sie 112, wenn jemand in Lebensgefahr sein könnte. Lieber einmal zu oft als einmal zu wenig.',
          'Zum Beispiel bei Druck oder Schmerz in der Brust, plötzlicher Luftnot, Lähmung, hängendem Mundwinkel oder verwaschener Sprache, Bewusstlosigkeit, Krampfanfall, starker Blutung oder einem schweren Unfall.',
          'Der Rettungsdienst kommt, wenn nötig mit Notärztin oder Notarzt, und bringt Sie in ein passendes Krankenhaus.',
          'Fahren Sie bei Verdacht auf Herzinfarkt oder Schlaganfall nicht selbst und lassen Sie sich auch nicht fahren.',
        ],
      },
      {
        id: 'bereitschaft',
        titel: 'Die 116117, wenn es nicht warten kann',
        kurz: '116117',
        saetze: [
          'Der ärztliche Bereitschaftsdienst ist für Beschwerden da, mit denen Sie sonst in die Hausarztpraxis gehen würden – nachts, am Wochenende und an Feiertagen.',
          'Zum Beispiel bei hohem Fieber, Brennen beim Wasserlassen, starken Ohren- oder Halsschmerzen, Brechdurchfall oder Rückenschmerzen, die nicht besser werden.',
          'Am Telefon werden Sie nach Ihren Beschwerden gefragt und erfahren, wohin Sie gehen sollen – oft in eine Bereitschaftspraxis am Krankenhaus. Wer nicht kommen kann, bekommt einen Hausbesuch.',
          'Ist es doch ein Notfall, werden Sie direkt an die 112 weitergeleitet.',
        ],
      },
      {
        id: 'notaufnahme',
        titel: 'Die Notaufnahme im Krankenhaus',
        kurz: 'Notaufnahme',
        saetze: [
          'Die Notaufnahme ist für ernste Notfälle da, etwa nach einem Sturz mit Verdacht auf Knochenbruch oder bei sehr starken Bauchschmerzen.',
          'Dort wird nach Dringlichkeit behandelt, nicht nach Ankunft. Mit leichten Beschwerden warten Sie oft viele Stunden.',
          'An vielen Kliniken liegt die Bereitschaftspraxis direkt neben der Notaufnahme. Am Empfang wird entschieden, wo Sie richtig sind.',
          'Rufen Sie im Zweifel vorher die 116117 an. Dort erfahren Sie den richtigen Weg.',
        ],
      },
      {
        id: 'gift',
        titel: 'Vergiftung und andere Notdienste',
        kurz: 'Giftnotruf',
        saetze: [
          'Hat jemand etwas Giftiges geschluckt, etwa Tabletten, Putzmittel oder Pflanzenteile, berät der Giftnotruf rund um die Uhr. Für Bayern erreichen Sie ihn in München unter 089 19240.',
          'Halten Sie die Packung bereit und sagen Sie, was, wie viel und wann. Bei Kindern auch Alter und Gewicht. Lösen Sie kein Erbrechen aus.',
          'Bei Bewusstlosigkeit, Krampfanfall oder Luftnot rufen Sie sofort die 112.',
          'Für Zahnschmerzen gibt es einen eigenen zahnärztlichen Notdienst. Die nächste Notdienst-Apotheke steht an jeder Apothekentür.',
        ],
      },
      {
        id: 'anrufen',
        titel: 'So läuft der Notruf',
        kurz: 'Anrufen',
        bild: 'notruf-oder-bereitschaftsdienst',
        saetze: [
          'Sagen Sie zuerst, wo der Notfall ist: Ort, Straße, Hausnummer, Stockwerk.',
          'Dann, was passiert ist und wie viele Menschen betroffen sind.',
          'Legen Sie nicht auf. Die Leitstelle stellt Fragen und sagt Ihnen, was Sie bis zum Eintreffen tun können.',
          'Legen Sie Medikamentenplan und Versichertenkarte bereit und öffnen Sie, wenn möglich, die Haustür.',
        ],
      },
    ],
    warnung:
      'Im Zweifel die 112. Niemand macht Ihnen einen Vorwurf, wenn es sich als harmlos herausstellt.',
  },
  {
    id: 'ueberweisung',
    name: 'Überweisung und Facharzttermin',
    zusatz: 'Terminservicestelle 116117',
    gebiet: 'versorgung',
    suche:
      'ueberweisung ueberweisungsschein facharzt fachaerztin facharzttermin termin wartezeit terminservicestelle tss 116117 etermin dringlichkeitscode vermittlungscode code tsvg vier wochen psychotherapie sprechstunde akutbehandlung radiologie mrt ct roentgen hausarztprogramm quartal',
    seiten: [
      {
        id: 'wozu',
        titel: 'Wozu eine Überweisung?',
        kurz: 'Wozu?',
        saetze: [
          'Mit einer Überweisung schicken wir Sie mit einer klaren Frage zu einer Fachärztin oder einem Facharzt. Der Befund kommt danach zu uns zurück.',
          'So behalten wir den Überblick über Ihre Befunde und Medikamente, und doppelte Untersuchungen lassen sich vermeiden.',
          'Für manche Fachrichtungen geht es nur mit Überweisung, etwa Radiologie mit Röntgen, CT und MRT, Labor oder Nuklearmedizin.',
          'Sind Sie in einem Hausarztprogramm Ihrer Krankenkasse eingeschrieben, gehen Sie grundsätzlich mit Überweisung zum Facharzt.',
        ],
      },
      {
        id: 'direkt',
        titel: 'Ohne Überweisung',
        kurz: 'Direkt',
        saetze: [
          'Zur Augenärztin, zum Frauenarzt und zur Zahnärztin können Sie immer direkt gehen, ebenso in die Sprechstunde einer Psychotherapeutin.',
          'Auch die meisten anderen Fachärzte dürfen gesetzlich Versicherte ohne Überweisung aufsuchen.',
          'Wollen Sie einen Termin über die Terminservicestelle, brauchen Sie dafür aber meist eine Überweisung mit Dringlichkeitscode.',
          'Privat Versicherte brauchen keine Überweisung. Ein kurzer Brief mit der Frage hilft trotzdem.',
        ],
      },
      {
        id: 'code',
        titel: 'Der Dringlichkeitscode',
        kurz: 'Code',
        saetze: [
          'Muss eine Facharztuntersuchung bald sein, drucken wir einen Code auf die Überweisung, den Dringlichkeitscode.',
          'Mit diesem Code vermittelt Ihnen die Terminservicestelle einen Termin, in der Regel innerhalb von vier Wochen.',
          'Den Code gibt es nur, wenn es medizinisch eilt – nicht für Kontrollen, die gut einige Monate warten können.',
          'Bei akuten Beschwerden ist der Weg ein anderer: dann zu uns, zur 116117 oder bei Lebensgefahr zur 112.',
        ],
      },
      {
        id: 'tss',
        titel: 'Die Terminservicestelle',
        kurz: '116117',
        bild: 'ueberweisung',
        saetze: [
          'Die Terminservicestelle erreichen Sie unter der Telefonnummer 116117, im Internet unter 116117.de oder mit der App 116117.',
          'Halten Sie Versichertenkarte und Überweisung mit dem Code bereit, und melden Sie sich bald nach dem Arztbesuch.',
          'Sie bekommen einen Termin in zumutbarer Entfernung. Eine bestimmte Wunschpraxis oder Wunschzeit kann man Ihnen nicht versprechen.',
          'Auch Termine für die Sprechstunde bei einer Psychotherapeutin und, wenn nötig, eine rasche Akutbehandlung werden dort vermittelt.',
        ],
      },
      {
        id: 'tipps',
        titel: 'Gut vorbereitet zum Facharzt',
        kurz: 'Tipps',
        saetze: [
          'Nehmen Sie Überweisung, Versichertenkarte, Medikamentenplan und wichtige Vorbefunde mit.',
          'Schreiben Sie vorher auf, was Sie fragen möchten und seit wann die Beschwerden bestehen.',
          'Eine Überweisung gilt nicht unbegrenzt, meist nur im laufenden Quartal. Liegt Ihr Termin später, fragen Sie in der Facharztpraxis nach.',
          'Können Sie einen Termin nicht wahrnehmen, sagen Sie ihn rechtzeitig ab – andere warten darauf.',
        ],
      },
    ],
    warnung:
      'Wird es schlechter, während Sie auf den Facharzttermin warten, melden Sie sich bei uns – warten Sie nicht einfach ab.',
  },
  {
    id: 'igel',
    name: 'IGeL – Selbstzahlerleistungen',
    zusatz: 'Individuelle Gesundheitsleistungen',
    gebiet: 'versorgung',
    suche:
      'igel individuelle gesundheitsleistungen selbstzahler selbstzahlerleistung privatleistung privat zahlen kosten rechnung goae gebuehrenordnung vertrag bedenkzeit igel-monitor igelmonitor medizinischer dienst verbraucherzentrale krankenkasse zahlt nicht ultraschall eierstoecke augeninnendruck glaukom attest reiseimpfung',
    seiten: [
      {
        id: 'was',
        titel: 'Was sind IGeL?',
        kurz: 'Was ist das?',
        bild: 'igel',
        saetze: [
          'IGeL heißt „Individuelle Gesundheitsleistungen“. Das sind Untersuchungen und Behandlungen, die die gesetzliche Krankenkasse nicht bezahlt.',
          'Die Kasse zahlt alles, was medizinisch nötig ist und dessen Nutzen ausreichend belegt ist.',
          'Bei IGeL ist das anders: Entweder liegt keine Krankheit vor, die sie nötig macht, oder ihr Nutzen ist nicht ausreichend belegt.',
          'Die Kosten tragen Sie selbst.',
        ],
      },
      {
        id: 'beispiele',
        titel: 'Typische Beispiele',
        kurz: 'Beispiele',
        saetze: [
          'Manche Angebote sind sinnvoll, wenn sie zu Ihrer Lage passen – etwa eine Reiseimpfung, die Ihre Kasse nicht übernimmt, oder eine Untersuchung vor dem Tauchen.',
          'Auch Bescheinigungen für Sportverein, Führerschein oder Reiserücktritt zahlen Sie selbst.',
          'Bei anderen, etwa einem Ultraschall der Eierstöcke zur Krebsfrüherkennung oder dem Messen des Augeninnendrucks ohne Beschwerden, ist der Nutzen nicht belegt. Fehlalarme können unnötige Sorgen und Eingriffe nach sich ziehen.',
          'Gibt es einen konkreten Verdacht oder Beschwerden, zahlt die Kasse die nötige Untersuchung.',
        ],
      },
      {
        id: 'entscheiden',
        titel: 'Ohne Druck entscheiden',
        kurz: 'Entscheiden',
        bild: 'igel',
        saetze: [
          'Sie müssen sich nicht sofort entscheiden. Nehmen Sie sich Bedenkzeit, auch wenn das Angebot im Sprechzimmer kommt.',
          'Fragen Sie: Welchen Nutzen hat das für mich? Welche Risiken? Was passiert, wenn ich es nicht mache? Was kostet es?',
          'Ihre übrige Behandlung darf nicht davon abhängen, ob Sie eine Selbstzahlerleistung nehmen.',
          'Ein Nein ist völlig in Ordnung.',
        ],
      },
      {
        id: 'vertrag',
        titel: 'Vertrag und Rechnung',
        kurz: 'Vertrag',
        bild: 'igel',
        saetze: [
          'Vor einer IGeL muss die Praxis Sie über die Kosten informieren, und Sie schließen einen schriftlichen Vertrag.',
          'Darin steht, was gemacht wird, was es voraussichtlich kostet und dass die Kasse es nicht bezahlt.',
          'Abgerechnet wird nach der Gebührenordnung für Ärzte. Sie bekommen eine Rechnung, in der jede Leistung einzeln steht.',
          'Ohne vorherigen schriftlichen Vertrag kann die Praxis das Geld in der Regel nicht verlangen.',
        ],
      },
      {
        id: 'monitor',
        titel: 'Unabhängig informieren',
        kurz: 'IGeL-Monitor',
        saetze: [
          'Unabhängige Bewertungen vieler IGeL finden Sie im Internet unter igel-monitor.de.',
          'Dort prüft der Medizinische Dienst, ob Nutzen und Schaden belegt sind, und vergibt eine Bewertung von „positiv“ bis „negativ“.',
          'Viele bekannte Angebote schneiden dort mit „unklar“ oder schlechter ab.',
          'Auch Ihre Krankenkasse und die Verbraucherzentrale beraten Sie.',
        ],
      },
    ],
    warnung:
      'Lassen Sie sich nicht unter Druck setzen. Unterschreiben Sie erst, wenn Sie Nutzen und Kosten verstanden haben.',
  },
];
