import type { Krankheit } from './typen';

// Die häufigsten sexuell übertragbaren Infektionen (STI) und der Test darauf. Die Krankheiten
// stehen bei den Infekten, der Test mit Multiplex-PCR-Abstrich, Bluttest und Zeitfenstern bei den
// Untersuchungen. Trichomonaden und Mycoplasma genitalium haben keinen eigenen Eintrag, sondern
// eine Seite im Test, weil sie fast nur über den Multiplex-Abstrich auffallen.
// Stand der Therapieangaben: Leitlinien der DSTIG/AWMF; Dosierungen bewusst nicht im Text.

export const GESCHLECHTSKRANKHEITEN: Krankheit[] = [
  {
    id: 'chlamydien',
    name: 'Chlamydien',
    zusatz: 'Chlamydia trachomatis',
    gebiet: 'infekte',
    suche:
      'chlamydien chlamydia trachomatis geschlechtskrankheit geschlechtskrankheiten sti std sexuell übertragbar ausfluss brennen wasserlassen harnröhrenentzündung urethritis zervizitis eileiterentzündung pid unfruchtbarkeit eileiterschwangerschaft nebenhodenentzündung doxycyclin azithromycin screening urintest pcr abstrich partner',
    was: [
      'Chlamydien sind Bakterien, die beim Sex übertragen werden. Sie sind die häufigste Geschlechtskrankheit durch Bakterien, besonders bei jungen Menschen.',
      'Meist merkt man nichts davon. Wenn doch, dann Brennen beim Wasserlassen, Ausfluss, Blutungen nach dem Sex oder zwischen den Perioden oder Schmerzen im Unterbauch.',
      'Chlamydien können auch im Rachen, im After oder im Auge sitzen.',
      'Nachweisen lassen sie sich mit einem Abstrich oder einer Urinprobe, die im Labor mit einer PCR untersucht wird.',
    ],
    ursachen: [
      'Übertragen werden Chlamydien beim Scheiden-, Anal- und Oralsex, auch ohne Samenerguss. Eine Mutter kann sie bei der Geburt an ihr Kind weitergeben.',
      'Das Risiko steigt mit neuen oder mehreren Partnern und Sex ohne Kondom.',
      'Unbehandelt können Chlamydien bei Frauen in Gebärmutter und Eileiter aufsteigen. Das kann zu Unfruchtbarkeit, Eileiterschwangerschaft und langen Unterleibsschmerzen führen.',
      'Bei Männern kann sich der Nebenhoden entzünden.',
    ],
    behandlung: [
      'Chlamydien heilen mit einem Antibiotikum aus, meist Doxycyclin für eine Woche. In der Schwangerschaft gibt es ein anderes Mittel.',
      'Ihre Sexualpartner der letzten zwei Monate sollten sich ebenfalls testen und behandeln lassen – auch ohne Beschwerden. Sonst stecken Sie sich gleich wieder an.',
      'Nach etwa drei Monaten empfehlen wir einen neuen Test, weil Ansteckungen häufig wiederkommen.',
    ],
    selbst: [
      'Kein Sex, bis Sie und Ihre Partner die Behandlung abgeschlossen haben und eine Woche vergangen ist.',
      'Kondome schützen gut vor Chlamydien.',
      'Frauen bis 25 Jahre können sich einmal im Jahr kostenlos auf Chlamydien testen lassen, mit einer Urinprobe.',
      'Bei neuen Partnern lohnt sich ein Test, auch wenn Sie nichts merken.',
    ],
    warnung:
      'Starke Schmerzen im Unterbauch, Fieber, Schmerzen beim Sex oder ein geschwollener, schmerzhafter Hoden: bitte noch am selben Tag melden.',
  },
  {
    id: 'tripper',
    name: 'Tripper',
    zusatz: 'Gonorrhö',
    gebiet: 'infekte',
    suche:
      'tripper gonorrhö gonorrhoe gonorrhea gonokokken neisseria gonorrhoeae geschlechtskrankheit geschlechtskrankheiten sti std sexuell übertragbar eitriger ausfluss brennen wasserlassen harnröhre rachen after ceftriaxon spritze resistenz kultur pcr abstrich partner',
    was: [
      'Tripper ist eine Geschlechtskrankheit durch Bakterien, die Gonokokken. Er gehört zu den häufigsten Geschlechtskrankheiten.',
      'Männer haben meist zwei bis sieben Tage nach der Ansteckung starkes Brennen beim Wasserlassen und eitrigen Ausfluss aus der Harnröhre.',
      'Frauen merken oft wenig, manchmal etwas mehr Ausfluss oder Brennen. Im Rachen und im After macht Tripper meist gar keine Beschwerden.',
      'Nachgewiesen wird er mit einem Abstrich, bei Männern aus der Harnröhre oder mit einer Urinprobe.',
    ],
    ursachen: [
      'Gonokokken werden beim Scheiden-, Anal- und Oralsex übertragen. Ungeschützter Oralsex ist ein häufiger Weg.',
      'Das Risiko steigt mit neuen oder mehreren Partnern und Sex ohne Kondom.',
      'Unbehandelt kann Tripper bei Frauen die Eileiter schädigen und unfruchtbar machen, bei Männern den Nebenhoden entzünden. Selten breiten sich die Bakterien im Körper aus, etwa in Gelenke.',
      'Gonokokken werden zunehmend unempfindlich gegen Antibiotika. Deshalb ist die richtige Behandlung wichtig.',
    ],
    behandlung: [
      'Meist reicht eine einzige Spritze mit dem Antibiotikum Ceftriaxon in den Muskel.',
      'Vorher nehmen wir oft einen zusätzlichen Abstrich, damit das Labor prüfen kann, welche Antibiotika wirken.',
      'Etwa zwei Wochen nach der Behandlung kontrollieren wir mit einem neuen Abstrich, ob die Bakterien weg sind.',
      'Ihre Sexualpartner der letzten zwei Monate sollten sich testen und behandeln lassen.',
    ],
    selbst: [
      'Kein Sex, bis Sie und Ihre Partner behandelt sind und eine Woche vergangen ist.',
      'Kondome schützen beim Scheiden- und Analsex. Auch Oralsex kann Tripper übertragen.',
      'Wer oft wechselnde Partner hat, sollte sich regelmäßig testen lassen – mit Abstrichen auch aus Rachen und After, je nachdem, welchen Sex Sie haben.',
    ],
    warnung:
      'Fieber, starke Unterbauchschmerzen, ein geschwollener Hoden, Gelenkschmerzen oder Hautausschlag: bitte noch am selben Tag melden.',
  },
  {
    id: 'syphilis',
    name: 'Syphilis',
    zusatz: 'Lues',
    gebiet: 'infekte',
    suche:
      'syphilis lues harter schanker ulcus durum geschwür treponema pallidum geschlechtskrankheit geschlechtskrankheiten sti std sexuell übertragbar ausschlag handflächen fußsohlen lymphknoten neurosyphilis schwangerschaft penicillin spritze bluttest tpha tppa vdrl meldepflicht',
    was: [
      'Syphilis ist eine Geschlechtskrankheit durch Bakterien. Sie verläuft in Stufen, die man leicht übersieht.',
      'Etwa drei Wochen nach der Ansteckung entsteht an der Stelle ein schmerzloses Geschwür, an Penis, Scheide, After oder im Mund. Es heilt nach einigen Wochen von selbst ab.',
      'Wochen später können ein Ausschlag – auch an Handflächen und Fußsohlen –, Fieber, Abgeschlagenheit und geschwollene Lymphknoten folgen. Auch das geht von selbst vorbei.',
      'Danach ruht die Krankheit oft jahrelang unbemerkt. Ein Bluttest zeigt, ob man sie hat oder hatte.',
    ],
    ursachen: [
      'Übertragen wird Syphilis beim Sex über den direkten Kontakt mit dem Geschwür oder dem Ausschlag, auch beim Oralsex.',
      'In der Schwangerschaft kann sie auf das Kind übergehen. Deshalb wird jede Schwangere darauf getestet.',
      'Unbehandelt kann sie nach Jahren Herz, Blutgefäße, Nerven und Gehirn schwer schädigen.',
      'Die Zahl der Fälle in Deutschland ist in den letzten Jahren gestiegen. Eine überstandene Syphilis schützt nicht vor einer neuen Ansteckung.',
    ],
    behandlung: [
      'Syphilis wird mit Penicillin behandelt, in einer Spritze in den Gesäßmuskel. Im frühen Stadium reicht meist eine einzige, später sind es drei im Abstand von einer Woche.',
      'Am Tag der ersten Spritze kann für einige Stunden Fieber mit Gliederschmerzen auftreten. Das ist harmlos und eine Reaktion auf die absterbenden Bakterien.',
      'Mit Bluttests nach 3, 6 und 12 Monaten prüfen wir, ob die Behandlung gewirkt hat.',
      'Syphilis ist meldepflichtig. Ihr Name wird dabei nicht weitergegeben.',
    ],
    selbst: [
      'Ihre Sexualpartner sollten sich ebenfalls testen und behandeln lassen – je nach Stadium die der letzten drei Monate bis zwei Jahre.',
      'Kein Sex, bis die Behandlung abgeschlossen ist und alle Hautstellen abgeheilt sind.',
      'Kondome senken das Risiko, schützen aber nicht vollständig, weil Geschwüre auch außerhalb liegen können.',
      'Bei wechselnden Partnern: regelmäßig Blut auf Syphilis testen lassen.',
    ],
    warnung:
      'Plötzliche Seh- oder Hörstörungen, starke Kopfschmerzen oder Lähmungen nach einer Syphilis-Ansteckung: sofort ärztlich abklären lassen.',
  },
  {
    id: 'hiv',
    name: 'HIV',
    zusatz: 'Humanes Immunschwäche-Virus',
    gebiet: 'infekte',
    suche:
      'hiv aids humanes immundefizienz immunschwäche virus geschlechtskrankheit geschlechtskrankheiten sti std sexuell übertragbar hiv-test suchtest kombitest selbsttest schnelltest antiretrovirale therapie art viruslast nachweisgrenze n=n u=u prep pep postexpositionsprophylaxe präexpositionsprophylaxe kondom nadel spritzen',
    was: [
      'HIV ist ein Virus, das die Abwehrkräfte schwächt. Es bleibt lebenslang im Körper.',
      'Einige Wochen nach der Ansteckung haben viele Menschen Beschwerden wie bei einer Grippe: Fieber, Halsschmerzen, Ausschlag, geschwollene Lymphknoten. Danach merkt man oft jahrelang nichts.',
      'Unbehandelt wird die Abwehr nach Jahren so schwach, dass schwere Infekte auftreten. Das nennt man Aids.',
      'Ob man HIV hat, zeigt nur ein Test. Der Labortest im Blut ist sechs Wochen nach einem Risiko sicher.',
    ],
    ursachen: [
      'HIV wird beim Sex ohne Kondom übertragen, über gemeinsam benutzte Spritzen und von der Mutter auf das Kind.',
      'Küssen, Umarmen, gemeinsames Geschirr, Toiletten oder Mückenstiche übertragen HIV nicht.',
      'Andere Geschlechtskrankheiten erhöhen das Risiko, sich anzustecken.',
      'Menschen mit HIV, die gut behandelt sind, übertragen das Virus beim Sex nicht.',
    ],
    behandlung: [
      'HIV ist heute gut behandelbar. Meist reicht eine Tablette am Tag, die das Virus unterdrückt.',
      'Mit der Behandlung haben Menschen mit HIV eine fast normale Lebenserwartung und können Kinder bekommen.',
      'Die Behandlung übernehmen Ärztinnen und Ärzte mit HIV-Schwerpunkt. Wir arbeiten mit ihnen zusammen.',
      'Je früher sie beginnt, desto besser bleibt die Abwehr erhalten. Deshalb ist der Test so wichtig.',
    ],
    selbst: [
      'Kondome schützen vor HIV.',
      'Wer ein hohes Risiko hat, kann vorbeugend Tabletten nehmen (PrEP). Die Krankenkasse bezahlt sie dann. Sprechen Sie uns an.',
      'Nach einem Risiko – etwa einem geplatzten Kondom – kann eine Notfall-Behandlung (PEP) die Ansteckung verhindern. Sie muss so früh wie möglich beginnen, spätestens nach 72 Stunden.',
      'Lassen Sie sich testen, wenn Sie ein Risiko hatten. Selbsttests aus der Apotheke sind zwölf Wochen nach dem Risiko sicher.',
    ],
    warnung:
      'Nach einem möglichen HIV-Kontakt zählt jede Stunde: sofort bei uns melden oder in die Notaufnahme einer Klinik – nicht bis zum nächsten Termin warten.',
  },
  {
    id: 'genitalherpes',
    name: 'Genitalherpes',
    zusatz: 'Herpes genitalis',
    gebiet: 'infekte',
    suche:
      'genitalherpes herpes genitalis hsv hsv-1 hsv-2 herpes simplex bläschen genital scheide penis after geschwür schmerzen brennen geschlechtskrankheit geschlechtskrankheiten sti std sexuell übertragbar rückfall aciclovir valaciclovir dauertherapie schwangerschaft geburt',
    was: [
      'Genitalherpes sind schmerzhafte Bläschen an Scheide, Penis, After oder Po. Sie platzen auf und hinterlassen kleine, wunde Stellen.',
      'Beim ersten Mal ist es oft heftig: mit Fieber, Brennen beim Wasserlassen und geschwollenen Lymphknoten in der Leiste. Es dauert zwei bis drei Wochen.',
      'Das Virus bleibt danach in den Nerven. Rückfälle sind meist schwächer und kürzer, oft kündigen sie sich mit Kribbeln an.',
      'Viele Menschen tragen das Virus, ohne es zu wissen.',
    ],
    ursachen: [
      'Auslöser ist das Herpes-simplex-Virus, dasselbe Virus oder ein naher Verwandter des Lippenherpes.',
      'Es wird über Haut- und Schleimhautkontakt übertragen, auch beim Oralsex. Ansteckend ist man vor allem, wenn Bläschen da sind, manchmal aber auch ohne.',
      'Rückfälle kommen häufiger bei Stress, Infekten, während der Periode oder nach Reibung.',
      'Wichtig ist Herpes am Ende der Schwangerschaft: Dann kann das Virus bei der Geburt auf das Kind übergehen.',
    ],
    behandlung: [
      'Tabletten gegen das Virus, etwa Aciclovir oder Valaciclovir, verkürzen die Beschwerden. Sie wirken am besten, wenn man früh damit beginnt.',
      'Heilen lässt sich Herpes nicht, aber gut in Schach halten.',
      'Bei sehr häufigen Rückfällen kann man die Tabletten auch dauerhaft niedrig dosiert nehmen. Das senkt auch das Risiko, den Partner anzustecken.',
      'Zur Sicherheit nehmen wir einen Abstrich aus einem Bläschen.',
    ],
    selbst: [
      'Kein Sex, solange Bläschen oder wunde Stellen da sind.',
      'Kondome senken das Risiko, schützen aber nicht vollständig.',
      'Lockere Baumwollwäsche, kühlende Umschläge und ein Schmerzmittel lindern. Brennt das Wasserlassen, hilft es, dabei in einer Wanne mit warmem Wasser zu sitzen.',
      'Wenn Sie schwanger sind und Herpes hatten, sagen Sie es Ihrer Frauenärztin oder Ihrem Frauenarzt.',
    ],
    warnung:
      'Sie können kein Wasser lassen, haben starke Kopfschmerzen mit Nackensteife, Fieber, oder Sie sind schwanger und bekommen Herpes: bitte sofort melden.',
  },
  {
    id: 'feigwarzen',
    name: 'Feigwarzen',
    zusatz: 'Genitalwarzen, Kondylome',
    gebiet: 'infekte',
    suche:
      'feigwarzen genitalwarzen kondylome condylomata acuminata hpv humane papillomviren hpv 6 11 warzen genital after geschlechtskrankheit geschlechtskrankheiten sti std sexuell übertragbar imiquimod podophyllotoxin grüntee sinecatechine vereisen laser hpv-impfung gebärmutterhalskrebs',
    was: [
      'Feigwarzen sind kleine, gutartige Warzen an Scheide, Penis, After oder in der Leiste. Sie können einzeln oder in Gruppen wachsen, manchmal wie ein kleiner Blumenkohl.',
      'Meist tun sie nicht weh. Manchmal jucken oder bluten sie etwas.',
      'Sie entstehen oft erst Wochen bis Monate nach der Ansteckung.',
      'Wir erkennen sie meist auf einen Blick.',
    ],
    ursachen: [
      'Auslöser sind bestimmte humane Papillomviren (HPV), fast immer die Typen 6 und 11. Sie werden über engen Haut- und Schleimhautkontakt übertragen.',
      'HPV ist sehr verbreitet: Die meisten Menschen stecken sich irgendwann an, ohne es zu merken.',
      'Feigwarzen selbst werden nicht zu Krebs. Andere HPV-Typen können aber Gebärmutterhalskrebs und Krebs an After, Penis oder im Rachen auslösen.',
      'Bei geschwächter Abwehr wachsen Feigwarzen stärker und kommen öfter wieder.',
    ],
    behandlung: [
      'Es gibt Cremes und Lösungen zum Auftragen zu Hause, etwa mit Imiquimod, Podophyllotoxin oder einem Grüntee-Extrakt. Sie brauchen meist mehrere Wochen.',
      'Wir können die Warzen auch vereisen. Größere Warzen werden in der Haut- oder Frauenarztpraxis abgetragen oder gelasert.',
      'Rückfälle sind häufig, auch nach guter Behandlung. Haben Sie Geduld.',
      'Warzen im After oder in der Harnröhre schauen wir uns genauer an oder überweisen dafür.',
    ],
    selbst: [
      'Die Mittel zum Auftragen nur auf die Warzen geben, nicht auf gesunde Haut. Nicht in der Schwangerschaft verwenden.',
      'Kondome senken das Risiko, schützen aber nicht vollständig.',
      'Die HPV-Impfung schützt vor Feigwarzen und vor Krebs durch HPV. Empfohlen ist sie für Mädchen und Jungen von 9 bis 14 Jahren, nachholen bis 17.',
      'Frauen: Gehen Sie regelmäßig zur Krebsvorsorge mit Abstrich vom Gebärmutterhals.',
    ],
    warnung:
      'Warzen, die schnell wachsen, bluten, hart werden oder sich verfärben: bitte zeitnah ansehen lassen.',
  },
  {
    id: 'sti-test',
    name: 'Test auf Geschlechtskrankheiten',
    zusatz: 'STI-Test, Multiplex-PCR-Abstrich',
    gebiet: 'untersuchungen',
    suche:
      'sti-test sti std test harnröhrenabstrich urethralabstrich urethra harnröhre geschlechtskrankheiten geschlechtskrankheit sexuell übertragbar multiplex pcr multiplex-pcr abstrich selbstabstrich urin erststrahlurin rachen after anal vaginal chlamydien gonokokken tripper trichomonaden mycoplasma genitalium mykoplasmen ureaplasmen ureaplasma mycoplasma hominis hiv syphilis hepatitis bluttest zeitfenster diagnostisches fenster kosten selbstzahler igel gesundheitsamt anonym partner',
    warnung:
      'Nach einem möglichen HIV-Kontakt nicht auf den Test warten: Eine Schutzbehandlung (PEP) wirkt nur, wenn sie innerhalb von 72 Stunden beginnt, am besten in den ersten 24. Dann sofort melden oder in die Notaufnahme.',
    seiten: [
      {
        id: 'wann',
        titel: 'Wann ein Test sinnvoll ist',
        kurz: 'Wann testen',
        saetze: [
          'Viele Geschlechtskrankheiten machen keine Beschwerden. Man kann sie haben und weitergeben, ohne es zu merken.',
          'Ein Test ist sinnvoll bei Beschwerden wie Ausfluss, Brennen beim Wasserlassen, Bläschen, Geschwüren oder Warzen im Genitalbereich.',
          'Auch ohne Beschwerden: wenn ein Partner eine Geschlechtskrankheit hat, nach Sex ohne Kondom mit einem neuen Partner oder vor einer neuen festen Beziehung.',
          'Wer oft wechselnde Partner hat, sollte sich regelmäßig testen lassen, etwa alle drei bis sechs Monate.',
          'Sie können offen mit uns sprechen. Alles bleibt unter uns, und Ihre Angaben helfen uns, die richtigen Tests auszuwählen.',
        ],
      },
      {
        id: 'multiplex',
        titel: 'Ein Abstrich, mehrere Erreger',
        kurz: 'Multiplex-PCR',
        bild: 'sti-multiplex',
        saetze: [
          'Beim Multiplex-PCR-Abstrich sucht das Labor in einer einzigen Probe gleichzeitig nach dem Erbgut mehrerer Erreger.',
          'Fast immer dabei sind Chlamydien, Gonokokken (Tripper), Trichomonaden und Mycoplasma genitalium. Je nach Labor auch Ureaplasmen, Mycoplasma hominis oder Herpesviren.',
          'Die PCR ist sehr empfindlich. Sie findet schon wenige Erreger, auch wenn Sie nichts merken.',
          'Das Ergebnis liegt meist nach zwei bis fünf Tagen vor.',
          'HIV, Syphilis und Hepatitis findet der Abstrich nicht. Dafür braucht es einen Bluttest.',
        ],
      },
      {
        id: 'abnahme',
        titel: 'So wird die Probe genommen',
        kurz: 'Probe nehmen',
        saetze: [
          'Frauen nehmen den Abstrich meist selbst: Das Stäbchen etwa 4 bis 5 Zentimeter in die Scheide schieben, einige Male drehen und ins Röhrchen stecken. Das ist genauso zuverlässig wie beim Arzt.',
          'Bei Männern nehmen wir einen Abstrich aus der Harnröhre: Ein dünnes Stäbchen wird etwa 2 Zentimeter tief eingeführt und gedreht. Das brennt kurz. Vorher mindestens eine Stunde kein Wasser lassen.',
          'Statt des Harnröhrenabstrichs geht bei Männern auch eine Urinprobe, und zwar die allererste Portion.',
          'Wer Oral- oder Analsex hat, braucht zusätzlich Abstriche aus dem Rachen und dem After. Dort sitzen Erreger oft, ohne Beschwerden zu machen, und eine Urinprobe findet sie nicht.',
          'Bei Bläschen oder einem Geschwür nehmen wir direkt davon einen Abstrich.',
          'Bitte vor dem Abstrich keine Scheidenzäpfchen oder Cremes verwenden und, wenn möglich, nicht während der Periode.',
        ],
      },
      {
        id: 'weitere-erreger',
        titel: 'Trichomonaden und Mykoplasmen',
        kurz: 'Weitere Erreger',
        saetze: [
          'Trichomonaden sind winzige Einzeller. Bei Frauen machen sie oft gelblich-grünen, schaumigen, riechenden Ausfluss und Juckreiz, Männer merken meist nichts. Ein Antibiotikum für eine Woche heilt sie, der Partner wird mitbehandelt.',
          'Mycoplasma genitalium sind Bakterien, die ähnliche Beschwerden machen wie Chlamydien. Viele sind schon unempfindlich gegen Antibiotika, deshalb wählen wir das Mittel nach einem Resistenztest aus.',
          'Ureaplasmen und Mycoplasma hominis leben bei vielen gesunden Menschen in der Scheide oder Harnröhre. Ohne Beschwerden behandeln wir sie nicht.',
          'Deshalb gilt: Nicht jeder Fund im Abstrich ist eine Krankheit. Wir besprechen mit Ihnen, was das Ergebnis bedeutet.',
        ],
      },
      {
        id: 'blut',
        titel: 'Der Bluttest',
        kurz: 'Bluttest',
        saetze: [
          'Im Blut suchen wir nach HIV, Syphilis und, wenn nötig, nach Hepatitis B und C.',
          'Für HIV nehmen wir einen Kombitest. Er findet Antikörper und einen Teil des Virus und ist sechs Wochen nach dem Risiko sicher.',
          'Der Syphilis-Test zeigt, ob man die Krankheit hat oder schon einmal hatte. Ein zweiter Wert zeigt, ob sie gerade aktiv ist.',
          'Gegen Hepatitis B kann man sich impfen lassen. Wir schauen mit Ihnen in den Impfpass.',
        ],
      },
      {
        id: 'zeitfenster',
        titel: 'Wann der Test sicher ist',
        kurz: 'Zeitfenster',
        bild: 'sti-zeitfenster',
        saetze: [
          'Nach einer Ansteckung dauert es eine Weile, bis ein Test sie findet. Ein zu früher Test kann falsch beruhigen.',
          'Chlamydien, Tripper und Trichomonaden findet die PCR etwa zwei Wochen nach dem Kontakt sicher.',
          'Der HIV-Labortest ist nach sechs Wochen sicher, ein HIV-Selbsttest nach zwölf Wochen.',
          'Syphilis zeigt sich im Blut nach etwa sechs Wochen. Hepatitis B und C können bis zu drei Monate brauchen.',
          'Haben Sie Beschwerden, testen wir sofort. Bei einem frühen Test ohne Befund wiederholen wir ihn, wenn das Zeitfenster vorbei ist.',
        ],
      },
      {
        id: 'ergebnis',
        titel: 'Wenn der Test positiv ist',
        kurz: 'Ergebnis',
        saetze: [
          'Fast alle Geschlechtskrankheiten durch Bakterien heilen mit einem Antibiotikum vollständig aus. HIV und Herpes lassen sich gut behandeln.',
          'Bitte informieren Sie Ihre Sexualpartner, damit sie sich auch testen und behandeln lassen. Sonst stecken Sie sich gegenseitig wieder an.',
          'Wer das nicht persönlich sagen möchte, kann es anonym tun, zum Beispiel über Internetseiten mit Benachrichtigungskarten.',
          'Bis Sie und Ihre Partner behandelt sind, bitte keinen Sex.',
          'Eine überstandene Geschlechtskrankheit schützt nicht vor der nächsten.',
        ],
      },
      {
        id: 'kosten',
        titel: 'Wer den Test bezahlt',
        kurz: 'Kosten',
        saetze: [
          'Bei Beschwerden, wenn ein Partner erkrankt ist, oder in der Schwangerschaft bezahlt die Krankenkasse den Test.',
          'Frauen bis 25 Jahre können sich einmal im Jahr kostenlos auf Chlamydien testen lassen.',
          'Wer die HIV-PrEP nimmt, wird regelmäßig auf Kosten der Kasse getestet.',
          'Ein Test ohne Beschwerden und ohne besonderen Anlass ist meist eine Selbstzahlerleistung.',
          'Bei uns kostet der Abstrich dann zwischen 100 und 180 Euro, je nachdem, worauf getestet wird. Was für Sie sinnvoll ist, besprechen wir vorher.',
          'Viele Gesundheitsämter und Beratungsstellen testen anonym und kostenlos oder günstig.',
        ],
      },
    ],
  },
];
