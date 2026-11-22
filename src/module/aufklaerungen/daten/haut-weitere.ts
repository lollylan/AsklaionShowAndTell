import type { Krankheit } from './typen';

// Haut, weitere Themen: Kontaktekzem, weißer Hautkrebs mit Vorstufe, Warzen,
// Lippenherpes und die Erstversorgung von Wunden und Verbrennungen (eigene Seiten).

export const HAUT_WEITERE: Krankheit[] = [
  {
    id: 'kontaktekzem',
    name: 'Kontaktekzem',
    zusatz: 'Allergisch und irritativ, Handekzem',
    gebiet: 'haut',
    bilder: { behandlung: 'kontaktekzem-pflastertest' },
    suche:
      'kontaktekzem kontaktdermatitis kontaktallergie ekzem handekzem abnutzungsekzem irritativ toxisch allergisch nickel nickelallergie modeschmuck jeansknopf duftstoffe konservierungsstoffe gummi latex handschuhe chromat zement haarfarbe ppd feuchtarbeit epikutantest pflastertest allergietest hautschutz hautpflege kortison kortisoncreme berufskrankheit hautarztverfahren hautarztbericht',
    was: [
      'Ein Ekzem ist eine Entzündung der obersten Hautschichten. Die Haut wird rot, juckt, schuppt, bekommt kleine Bläschen oder Risse.',
      'Beim Kontaktekzem kommt die Entzündung von etwas, das die Haut berührt hat. Es sitzt deshalb genau dort, wo der Kontakt war.',
      'Am häufigsten sind die Hände betroffen (Handekzem). Typisch sind auch der Bauch unter dem Jeansknopf, die Ohrläppchen oder das Handgelenk unter der Uhr.',
      'Ein Kontaktekzem ist nicht ansteckend.',
    ],
    ursachen: [
      'Häufiger ist das irritative Ekzem: Viel Wasser, Seife, Putzmittel oder Lösungsmittel nutzen die Schutzschicht der Haut ab. Betroffen sind oft Menschen in Pflege, Friseurhandwerk, Reinigung, Küche oder mit kleinen Kindern.',
      'Beim allergischen Ekzem reagiert die Abwehr auf einen bestimmten Stoff, oft erst ein bis drei Tage nach dem Kontakt. Häufige Auslöser sind Nickel, Duft- und Konservierungsstoffe, Zusätze in Gummihandschuhen, Haarfarbe und Zement.',
      'Eine Neurodermitis macht die Haut empfindlicher für beides.',
      'Bleibt der Auslöser, wird das Ekzem oft dauerhaft. Durch die Risse können außerdem Bakterien eindringen.',
    ],
    behandlung: [
      'Am wichtigsten ist, den Auslöser zu finden und zu meiden. Bei Verdacht auf eine Allergie macht die Hautärztin oder der Hautarzt einen Pflastertest (Epikutantest): Testpflaster bleiben zwei Tage auf dem Rücken, abgelesen wird danach mehrmals.',
      'Gegen die Entzündung hilft eine Kortisoncreme für kurze Zeit, meist ein bis zwei Wochen. Danach langsam ausschleichen.',
      'Rückfettende Pflege gehört immer dazu, auch wenn die Haut wieder gut aussieht.',
      'Hält ein Handekzem trotzdem an, gibt es beim Hautarzt weitere Möglichkeiten, etwa Lichttherapie oder spezielle Cremes und Tabletten. Kommt es von der Arbeit, kann der Hautarzt ein Hautarztverfahren der Berufsgenossenschaft einleiten.',
    ],
    selbst: [
      'Waschen Sie die Hände nur, wenn nötig, mit lauwarmem Wasser und milder Waschlotion, und trocknen Sie sie gut ab, auch zwischen den Fingern.',
      'Cremen Sie die Hände mehrmals täglich ein, besonders nach dem Waschen und vor dem Schlafen.',
      'Tragen Sie bei Nass- und Putzarbeit Schutzhandschuhe, darunter dünne Baumwollhandschuhe, und nur so lange wie nötig. Legen Sie dabei Ringe ab.',
      'Bei Nickelallergie: Jeansknöpfe und Gürtelschnallen abkleben oder überziehen, Schmuck nur nickelfrei.',
    ],
    warnung:
      'Bitte rasch in die Praxis, wenn das Ekzem nässt, gelbe Krusten bildet, schmerzt oder Fieber dazukommt. Schwellen Gesicht oder Lippen an oder bekommen Sie Atemnot: 112.',
  },
  {
    id: 'weisser-hautkrebs',
    name: 'Weißer Hautkrebs',
    zusatz: 'Basalzellkrebs, Stachelzellkrebs, aktinische Keratose',
    gebiet: 'haut',
    bilder: { behandlung: 'weisser-hautkrebs-behandlung' },
    suche:
      'weisser hautkrebs weißer hautkrebs heller hautkrebs basalzellkarzinom basaliom bzk basalzellkrebs plattenepithelkarzinom spinaliom spinozelluläres karzinom pek stachelzellkrebs aktinische keratose ak lichtschwiele vorstufe sonnenschaden sonnenterrassen glatze kopfhaut unterlippe cheilitis actinica uv berufskrankheit 5103 kryotherapie vereisung photodynamische therapie pdt imiquimod fluorouracil 5-fu mohs operation hautkrebsscreening früherkennung organtransplantation',
    was: [
      'Weißer Hautkrebs ist die häufigste Krebsart überhaupt. Er wächst meist langsam und streut nur selten in andere Organe – deshalb ist er fast immer heilbar.',
      'Die Vorstufe heißt aktinische Keratose: raue, schuppige, oft rötliche Stellen, die sich wie Sandpapier anfühlen. Man fühlt sie oft besser, als man sie sieht.',
      'Der Basalzellkrebs ist ein glasig glänzendes Knötchen mit feinen Äderchen, das manchmal in der Mitte einsinkt, blutet oder nicht abheilt.',
      'Der Stachelzellkrebs ist ein raues, krustiges Knötchen, das wächst und oft schmerzt. Er entsteht meist aus einer aktinischen Keratose.',
    ],
    ursachen: [
      'Hauptursache ist UV-Licht, das sich über das ganze Leben in der Haut aufsummiert. Deshalb trifft er vor allem ältere Menschen.',
      'Typische Stellen sind die „Sonnenterrassen“: Stirn, Nase, Ohren, Glatze, Unterlippe und Handrücken.',
      'Ein höheres Risiko haben Menschen mit heller Haut, mit viel Arbeit oder Freizeit im Freien und mit geschwächter Abwehr, etwa nach einer Organtransplantation.',
      'Wer lange im Freien gearbeitet hat, kann weißen Hautkrebs und viele aktinische Keratosen als Berufskrankheit melden lassen.',
      'Unbehandelt kann der Basalzellkrebs in die Tiefe wachsen und Knorpel oder Knochen zerstören. Der Stachelzellkrebs kann selten auch streuen.',
    ],
    behandlung: [
      'Einzelne aktinische Keratosen werden oft vereist. Bei vielen nebeneinander behandelt man die ganze Fläche, etwa mit einer Creme über einige Wochen oder mit einer Lichtbehandlung (photodynamische Therapie).',
      'Ein Basalzell- oder Stachelzellkrebs wird meist in örtlicher Betäubung herausgeschnitten. Unter dem Mikroskop wird geprüft, ob er ganz entfernt ist; sonst wird nachgeschnitten.',
      'Sehr flache Basalzellkrebse lassen sich manchmal auch mit Creme oder Licht behandeln. Ist eine Operation nicht möglich, hilft eine Bestrahlung, bei fortgeschrittenem Krebs auch Medikamente.',
      'Wer einmal weißen Hautkrebs hatte, bekommt öfter einen neuen. Deshalb sind regelmäßige Kontrollen beim Hautarzt wichtig.',
    ],
    selbst: [
      'Schützen Sie sich vor der Sonne: Mittagssonne meiden, Hut mit breiter Krempe, Kleidung und auf freie Haut Sonnencreme mit hohem Lichtschutzfaktor – auch bei der Arbeit draußen.',
      'Denken Sie an Ohren, Glatze und Lippen; für die Lippen gibt es Pflegestifte mit Lichtschutz.',
      'Ab 35 Jahren zahlt die Krankenkasse alle zwei Jahre das Hautkrebs-Screening. Tasten Sie zwischendurch selbst nach rauen Stellen.',
    ],
    warnung:
      'Zeigen Sie uns bald jede Stelle, die blutet und nach vier Wochen nicht abgeheilt ist, ein Knötchen, das wächst, oder eine raue Stelle, die dicker wird oder schmerzt.',
  },
  {
    id: 'warzen',
    name: 'Warzen',
    zusatz: 'Gewöhnliche Warzen, Dornwarzen, Dellwarzen',
    gebiet: 'haut',
    bilder: { selbst: 'warzen-selbst' },
    suche:
      'warzen warze verrucae verruca vulgaris gewöhnliche warze stachelwarze dornwarze verruca plantaris fußsohle hühnerauge clavus dellwarzen molluscum contagiosum hpv humane papillomviren viren salicylsäure warzenpflaster vereisung kryotherapie stickstoff ameisensäure fluorouracil kürettage laser schwimmbad kinder',
    was: [
      'Warzen sind gutartige Wucherungen der obersten Hautschicht. Sie kommen von Viren, meist von humanen Papillomviren (HPV).',
      'Gewöhnliche Warzen sitzen oft an Händen und Fingern. Sie sind hautfarben, hart und haben eine raue, zerklüftete Oberfläche.',
      'Dornwarzen sitzen an der Fußsohle. Das Körpergewicht drückt sie nach innen, deshalb tun sie beim Gehen oft weh. Kleine schwarze Punkte darin sind geronnene Äderchen – so unterscheidet man sie vom Hühnerauge.',
      'Dellwarzen kommen von einem anderen Virus. Es sind kleine, glatte, glänzende Knötchen mit einer Delle in der Mitte, vor allem bei Kindern.',
    ],
    ursachen: [
      'Die Viren werden über kleinste Risse in der Haut übertragen, direkt von Haut zu Haut oder über Böden, Handtücher und Gegenstände.',
      'Feuchte, aufgeweichte Haut, etwa im Schwimmbad, in der Dusche oder in Sportschuhen, macht es den Viren leicht.',
      'Kinder bekommen besonders oft Warzen, Dellwarzen auch bei Neurodermitis. Bei geschwächter Abwehr treten sie häufiger und hartnäckiger auf.',
      'Durch Kratzen und Aufknibbeln verteilt man die Viren und bekommt neue Warzen.',
    ],
    behandlung: [
      'Viele Warzen verschwinden von selbst, bei Kindern oft innerhalb von ein bis zwei Jahren. Abwarten ist deshalb erlaubt, wenn sie nicht stören.',
      'Am besten untersucht ist Salicylsäure als Lösung oder Pflaster. Sie weicht die Hornhaut auf; die oberste Schicht tragen Sie regelmäßig ab. Das braucht Geduld, oft viele Wochen.',
      'Wir können Warzen auch vereisen, meist mehrmals im Abstand von zwei bis drei Wochen. Andere Lösungen, etwa mit Ameisensäure, sind ebenfalls möglich.',
      'Herausschneiden empfehlen wir nicht, weil Narben bleiben und die Warze oft wiederkommt. Dellwarzen heilen meist von selbst; sonst können sie ausgekratzt oder mit einer Lösung behandelt werden.',
    ],
    selbst: [
      'Kratzen und knibbeln Sie nicht an Warzen. Nutzen Sie Feile oder Bimsstein nur für die Warze und waschen Sie danach die Hände.',
      'Tragen Sie in Schwimmbad, Sauna und Umkleide Badeschuhe.',
      'Benutzen Sie ein eigenes Handtuch und halten Sie die Füße trocken.',
      'Weichen Sie die Warze vor dem Abtragen etwa zehn Minuten in warmem Wasser ein. Die Haut um die Warze schützen Sie mit Creme oder Pflaster.',
    ],
    warnung:
      'Bei Diabetes oder Durchblutungsstörungen behandeln Sie Warzen am Fuß bitte nicht selbst. Wächst eine Stelle schnell, blutet sie oder verändert sie sich, zeigen Sie sie uns.',
  },
  {
    id: 'lippenherpes',
    name: 'Lippenherpes',
    zusatz: 'Herpes labialis',
    gebiet: 'haut',
    bilder: { ursachen: 'lippenherpes-nervenknoten' },
    suche:
      'lippenherpes herpes labialis herpes simplex hsv hsv-1 fieberbläschen fieberblasen bläschen lippe mundwinkel kalte wunde aciclovir penciclovir valaciclovir herpescreme herpespflaster zinkpaste mundfäule stomatitis aphthosa rückfall ansteckend küssen neugeborene säugling eczema herpeticatum neurodermitis herpes auge keratitis',
    was: [
      'Lippenherpes sind kleine, schmerzhafte Bläschen an oder um die Lippe, oft in einer Gruppe. Sie kommen vom Herpes-simplex-Virus.',
      'Meist kündigt es sich an: Die Stelle kribbelt, spannt oder brennt. Dann entstehen Bläschen, die platzen, nässen und verkrusten.',
      'Nach etwa ein bis zwei Wochen ist alles ohne Narbe abgeheilt.',
      'Ansteckend ist vor allem die Flüssigkeit in den Bläschen – so lange, bis die Kruste abgefallen ist.',
    ],
    ursachen: [
      'Die meisten Menschen stecken sich schon als Kind an. Danach bleibt das Virus lebenslang im Körper und ruht in einem Nervenknoten im Gesicht.',
      'Bestimmte Auslöser wecken es wieder auf: Fieber und Infekte, starke Sonne, Stress, Erschöpfung, die Regelblutung oder eine Verletzung der Lippe.',
      'Übertragen wird es über Küsse, gemeinsame Gläser, Besteck oder Handtücher.',
      'Gefährlich kann es für Neugeborene, für Menschen mit Neurodermitis und mit geschwächter Abwehr werden. Gelangt das Virus ins Auge, kann es die Hornhaut schädigen.',
    ],
    behandlung: [
      'Meist reicht eine Creme gegen das Virus, zum Beispiel mit Aciclovir. Sie hilft am besten, wenn Sie schon beim ersten Kribbeln beginnen und mehrmals täglich auftragen.',
      'Herpespflaster decken die Bläschen ab, schützen vor dem Weitergeben und lassen sich gut überschminken. Zinkpaste trocknet die Bläschen aus.',
      'Bei schweren Verläufen, sehr häufigen Rückfällen oder geschwächter Abwehr gibt es Tabletten gegen das Virus. Auch sie wirken am besten, wenn man früh beginnt.',
      'Wer sehr oft Herpes hat, kann mit uns besprechen, die Tabletten bei den ersten Zeichen griffbereit zu haben.',
    ],
    selbst: [
      'Fassen Sie die Bläschen nicht an und stechen Sie sie nicht auf. Tragen Sie Creme mit einem Wattestäbchen auf und waschen Sie danach die Hände.',
      'Solange Bläschen oder Krusten da sind: nicht küssen – vor allem keine Babys –, eigenes Glas und Handtuch.',
      'Fassen Sie sich danach nicht in die Augen. Kontaktlinsen nur mit frisch gewaschenen Händen einsetzen.',
      'Wenn Sonne bei Ihnen Herpes auslöst, schützen Sie die Lippen mit einem Lippenstift mit hohem Lichtschutzfaktor.',
    ],
    warnung:
      'Sofort in die Praxis bei Bläschen nahe am Auge oder einem roten, schmerzenden Auge, bei Bläschen, die sich auf ekzemkranker Haut ausbreiten, oder wenn ein Säugling betroffen ist.',
  },
  {
    id: 'wunden',
    name: 'Wunden und Verbrennungen',
    zusatz: 'Erstversorgung und Tetanus-Schutz',
    gebiet: 'haut',
    suche:
      'wunde wunden wundversorgung erste hilfe schürfwunde schuerfwunde abschürfung schnittwunde schnitt platzwunde riss nähen naht kleben klammern pflaster verband blutung bisswunde hundebiss katzenbiss verbrennung verbrühung brandwunde brandblase grad verbrennungsgrad kühlen wundinfektion entzündung eiter blutvergiftung lymphangitis wundheilung fäden ziehen tetanus wundstarrkrampf auffrischung impfung td tdap immunglobulin impfpass',
    seiten: [
      {
        id: 'was',
        titel: 'Was zuerst tun?',
        kurz: 'Erste Hilfe',
        saetze: [
          'Die meisten kleinen Wunden können Sie selbst versorgen. Waschen Sie sich vorher die Hände.',
          'Blutet es, drücken Sie ein sauberes Tuch oder eine Kompresse einige Minuten fest auf die Wunde und halten Sie den Körperteil hoch.',
          'Spülen Sie Schmutz unter fließendem Leitungswasser aus. Ein Wunddesinfektionsmittel aus der Apotheke ist möglich; Alkohol, Puder und Hausmittel gehören nicht in die Wunde.',
          'Decken Sie die Wunde dann mit einem Pflaster oder einem sauberen Verband ab, und prüfen Sie Ihren Tetanus-Schutz.',
        ],
      },
      {
        id: 'schuerfwunde',
        titel: 'Schürfwunde',
        kurz: 'Schürfwunde',
        saetze: [
          'Bei einer Schürfwunde ist nur die oberste Hautschicht abgerieben. Sie blutet wenig, brennt aber stark.',
          'Wichtig ist, Sand und Schmutz gründlich auszuspülen. Bleibt Dreck in der Haut, kann er als dunkle Stelle für immer sichtbar bleiben – dann kommen Sie bitte in die Praxis.',
          'Unter einem Wundpflaster, das die Wunde feucht hält, heilt sie schneller und mit weniger Narbe als an der Luft.',
          'Großflächige Schürfwunden, etwa nach einem Fahrradsturz, sehen wir uns gern an.',
        ],
      },
      {
        id: 'schnittwunde',
        titel: 'Schnitt- und Platzwunde',
        kurz: 'Schnitt',
        saetze: [
          'Kleine, glatte Schnitte, deren Ränder von selbst aneinanderliegen, heilen mit einem Pflaster oder Klammerpflaster.',
          'Genäht oder geklebt werden sollte eine Wunde, die klafft, tief ist, stark blutet, im Gesicht oder über einem Gelenk liegt. Kommen Sie damit möglichst rasch, am besten innerhalb weniger Stunden.',
          'Lässt sich danach ein Finger nicht mehr richtig bewegen oder ist er taub, kann eine Sehne oder ein Nerv verletzt sein.',
          'Bisswunden von Tieren oder Menschen sehen oft harmlos aus, entzünden sich aber leicht. Mit ihnen kommen Sie bitte immer zu uns.',
        ],
      },
      {
        id: 'verbrennung',
        titel: 'Verbrennung und Verbrühung',
        kurz: 'Verbrennung',
        bild: 'wunden-verbrennung',
        saetze: [
          'Halten Sie die Stelle sofort etwa zehn Minuten unter kühles, nicht eiskaltes Leitungswasser. Große Flächen und kleine Kinder nicht lange kühlen, sondern warm halten.',
          'Grad 1 ist gerötet und schmerzt wie ein Sonnenbrand. Es heilt in einigen Tagen von selbst.',
          'Bei Grad 2 entstehen Blasen. Stechen Sie sie nicht auf und decken Sie sie locker ab – kein Eis, keine Butter, kein Mehl.',
          'Zum Arzt bei Blasen größer als Ihre Handfläche, an Gesicht, Händen, Füßen oder Genitalien, nach Strom oder Chemikalien und bei Kindern. Weiße, lederartige Haut, die kaum schmerzt, gehört ins Krankenhaus.',
        ],
      },
      {
        id: 'heilung',
        titel: 'Heilen lassen und Entzündung erkennen',
        kurz: 'Heilung',
        saetze: [
          'Am Anfang ist der Wundrand leicht gerötet und etwas geschwollen. Das gehört zur Heilung und wird nach zwei, drei Tagen besser.',
          'Wechseln Sie das Pflaster, wenn es nass oder schmutzig ist. Wann Sie mit einer Naht duschen dürfen und wann die Fäden gezogen werden, sagen wir Ihnen.',
          'Eine Entzündung erkennen Sie daran, dass Schmerz, Rötung und Schwellung wieder zunehmen, die Wunde pocht, warm wird oder eitert.',
          'Neue Narben bleiben einige Monate empfindlich. Schützen Sie sie in dieser Zeit vor Sonne.',
        ],
      },
      {
        id: 'tetanus',
        titel: 'Tetanus-Schutz',
        kurz: 'Tetanus',
        bild: 'wunden-tetanus',
        saetze: [
          'Tetanus-Erreger leben in Erde und Staub und können über jede Wunde eindringen. Die Krankheit macht schwere Muskelkrämpfe und ist lebensgefährlich.',
          'Erwachsene frischen die Impfung alle zehn Jahre auf. Bei einer tiefen, verschmutzten Wunde, einem Biss oder einer Verbrennung schon, wenn die letzte Impfung mehr als fünf Jahre her ist.',
          'Fehlt die Grundimpfung oder wissen Sie es nicht, impfen wir und geben bei Bedarf zusätzlich schützende Antikörper. Bringen Sie Ihren Impfpass mit.',
        ],
      },
    ],
    warnung:
      'Sofort kommen bei roten Streifen von der Wunde weg, Fieber oder sich ausbreitender Rötung. 112 bei starker Blutung, die nicht steht, großen Verbrennungen oder Atemnot nach Rauch.',
  },
];
