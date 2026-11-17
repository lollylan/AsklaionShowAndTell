import type { Krankheit } from './typen';

// Haut: Pilzinfektionen und schwarzer Hautkrebs.

export const HAUT: Krankheit[] = [
  {
    id: 'fusspilz',
    name: 'Fußpilz und Hautpilz',
    zusatz: 'Tinea pedis, Tinea corporis',
    gebiet: 'haut',
    suche:
      'fusspilz fußpilz hautpilz pilz tinea pedis corporis mykose dermatophyten fadenpilze trichophyton zehenzwischenraum ringelflechte nagelpilz onychomykose clotrimazol terbinafin ciclopirox amorolfin nagellack itraconazol schwimmbad diabetes wundrose erysipel',
    seiten: [
      {
        id: 'was',
        titel: 'Was ist Fußpilz?',
        kurz: 'Fußpilz',
        saetze: [
          'Fußpilz ist eine sehr häufige Ansteckung der Haut mit Fadenpilzen (Dermatophyten). Etwa jeder Dritte hat ihn irgendwann.',
          'Meist beginnt er zwischen den Zehen, oft zwischen dem vierten und fünften Zeh.',
          'Die Haut ist dort weißlich aufgeweicht, schuppt, juckt und bekommt kleine Risse. Manchmal schuppt auch die ganze Fußsohle.',
          'Gefährlich ist Fußpilz nicht. Die Risse können aber Bakterien hereinlassen.',
        ],
      },
      {
        id: 'hautpilz',
        titel: 'Pilz auf der Haut am Körper',
        kurz: 'Hautpilz',
        saetze: [
          'Dieselben Pilze können auch die Haut an Rumpf, Armen, Beinen oder im Gesicht befallen.',
          'Typisch ist ein runder, roter Fleck mit schuppendem Rand. Die Mitte wird heller, und der Ring wächst langsam nach außen.',
          'Oft juckt er. Manchmal sind es mehrere Ringe, die zusammenwachsen.',
          'Ähnlich aussehen können Ekzeme oder eine Schuppenflechte. Im Zweifel nehmen wir ein paar Schuppen ab und lassen sie untersuchen.',
        ],
      },
      {
        id: 'ursachen',
        titel: 'Woher kommt der Pilz?',
        kurz: 'Ursachen',
        saetze: [
          'Pilze lieben es feucht und warm: in engen Schuhen, Sportsocken und zwischen schlecht abgetrockneten Zehen.',
          'Angesteckt wird man meist barfuß in Schwimmbad, Sauna, Umkleide oder Hotelzimmer, oft auch zu Hause in der Familie.',
          'Hautpilz am Körper kommt häufig von Haustieren wie Katzen, Meerschweinchen oder Kaninchen, auch von Kontaktsport.',
          'Leichter bekommen ihn Menschen mit Diabetes, schlechter Durchblutung der Beine, geschwächter Abwehr und ältere Menschen.',
        ],
      },
      {
        id: 'nagel',
        titel: 'Nagelpilz',
        kurz: 'Nagelpilz',
        bild: 'fusspilz-nagel',
        saetze: [
          'Bleibt Fußpilz lange bestehen, kann er in die Zehennägel wandern. Meist beginnt das am vorderen Rand des Nagels.',
          'Der Nagel wird gelblich, trüb, dick und brüchig. Darunter sammeln sich krümelige Reste.',
          'Nicht jeder verfärbte Nagel ist Pilz. Vor einer langen Behandlung lassen wir deshalb ein Stück Nagel untersuchen.',
          'Nagelpilz braucht Geduld: Ein Zehennagel wächst in etwa einem Jahr einmal ganz heraus.',
        ],
      },
      {
        id: 'behandlung',
        titel: 'So wird behandelt',
        kurz: 'Behandlung',
        saetze: [
          'Haut- und Fußpilz behandelt man mit einer Creme gegen Pilze, zum Beispiel mit Clotrimazol, Terbinafin oder Ciclopirox – meist ein bis vier Wochen lang.',
          'Wichtig: Cremen Sie noch ein bis zwei Wochen weiter, wenn die Haut schon gut aussieht. Sonst kommt der Pilz oft zurück.',
          'Bei leichtem Nagelpilz hilft ein spezieller Nagellack über viele Monate. Bei vielen Nägeln oder großen Hautflächen braucht es Tabletten, dann kontrollieren wir die Leberwerte.',
          'Eine Kortisoncreme allein hilft nicht gegen Pilz. Sie lindert kurz den Juckreiz, der Pilz breitet sich aber weiter aus.',
        ],
      },
      {
        id: 'selbst',
        titel: 'Das können Sie selbst tun',
        kurz: 'Selbst tun',
        saetze: [
          'Trocknen Sie nach dem Waschen die Zehenzwischenräume gut ab, notfalls mit dem Föhn auf kalter Stufe.',
          'Waschen Sie Socken und Handtücher bei 60 °C, wechseln Sie die Schuhe und lassen Sie sie gut trocknen.',
          'Tragen Sie in Schwimmbad und Sauna Badeschuhe. Haben andere in der Familie oder ein Haustier auch Pilz, sollten alle mitbehandelt werden.',
        ],
      },
    ],
    warnung:
      'Gerade bei Diabetes oder schlechter Durchblutung: Wird der Fuß rot, heiß und dick, breitet sich die Rötung aus, kommt Fieber dazu oder entsteht eine offene Wunde, kommen Sie noch am selben Tag. Das kann eine Wundrose sein.',
  },
  {
    id: 'melanom',
    name: 'Schwarzer Hautkrebs',
    zusatz: 'Melanom',
    gebiet: 'haut',
    suche:
      'melanom malignes melanom hautkrebs schwarzer hautkrebs muttermal leberfleck naevus pigmentzellen melanozyten abcde hässliches entlein hautkrebsscreening hautkrebs-screening früherkennung dermatoskop sonnenschutz sonnenbrand solarium uv tumordicke wächterlymphknoten sentinel immuntherapie',
    seiten: [
      {
        id: 'was',
        titel: 'Was ist schwarzer Hautkrebs?',
        kurz: 'Melanom',
        saetze: [
          'Das Melanom ist ein bösartiger Tumor der Pigmentzellen, also der Zellen, die der Haut ihre Farbe geben.',
          'Es entsteht meist als neuer dunkler Fleck, seltener aus einem Muttermal, das schon lange da war.',
          'Wächst es in die Tiefe, kann es früh über Lymphe und Blut in andere Organe streuen.',
          'Die gute Nachricht: Früh erkannt und entfernt, ist es in den allermeisten Fällen heilbar.',
        ],
      },
      {
        id: 'risiko',
        titel: 'Wer hat ein höheres Risiko?',
        kurz: 'Risiko',
        saetze: [
          'Der wichtigste Auslöser ist UV-Licht – vor allem Sonnenbrände in der Kindheit und Besuche im Solarium.',
          'Ein höheres Risiko haben Menschen mit heller Haut, roten oder blonden Haaren und solche, die leicht Sonnenbrand bekommen.',
          'Auch viele Muttermale (mehr als etwa 50) oder ungewöhnlich aussehende Muttermale erhöhen es.',
          'Dazu kommen ein Melanom in der Familie oder früher bei Ihnen selbst und eine geschwächte Abwehr, etwa durch Medikamente nach einer Organtransplantation.',
        ],
      },
      {
        id: 'abcde',
        titel: 'Die ABCDE-Regel',
        kurz: 'ABCDE',
        bild: 'melanom-abcde',
        saetze: [
          'A wie Asymmetrie: Der Fleck ist nicht gleichmäßig rund. B wie Begrenzung: Der Rand ist unscharf oder ausgefranst.',
          'C wie Colorit: mehrere Farbtöne, etwa braun, schwarz, rötlich oder grau. D wie Durchmesser: größer als etwa 5 Millimeter.',
          'E wie Entwicklung: Der Fleck verändert sich in Größe, Form oder Farbe, oder er wird erhaben.',
          'Achten Sie auch auf das „hässliche Entlein“: ein Muttermal, das ganz anders aussieht als alle anderen.',
        ],
      },
      {
        id: 'screening',
        titel: 'Hautkrebs-Screening',
        kurz: 'Screening',
        saetze: [
          'Ab 35 Jahren zahlt die gesetzliche Krankenkasse alle zwei Jahre eine Früherkennung. Manche Kassen zahlen sie schon früher.',
          'Dabei schauen wir die ganze Haut an, von der Kopfhaut bis zu den Zehenzwischenräumen, auch Stellen, die nie Sonne sehen.',
          'Das dauert etwa eine Viertelstunde und tut nicht weh. Bitte vorher keinen Nagellack und kein Make-up auftragen.',
          'Fällt uns etwas auf, schicken wir Sie zur Hautärztin oder zum Hautarzt. Dort wird der Fleck mit einem Auflichtmikroskop genauer angesehen.',
        ],
      },
      {
        id: 'behandlung',
        titel: 'So wird behandelt',
        kurz: 'Behandlung',
        saetze: [
          'Ein verdächtiger Fleck wird in örtlicher Betäubung herausgeschnitten und unter dem Mikroskop untersucht.',
          'Ist es ein Melanom, wird mit etwas Sicherheitsabstand nachgeschnitten. Wie weit, hängt von der Tumordicke ab, also davon, wie tief es gewachsen ist.',
          'Ab etwa einem Millimeter Dicke wird meist auch der erste Lymphknoten untersucht, den die Lymphe erreicht (Wächterlymphknoten).',
          'Hat der Krebs gestreut, helfen heute Immuntherapien und gezielte Medikamente viel besser als früher. Danach folgen regelmäßige Nachsorgetermine.',
        ],
      },
      {
        id: 'selbst',
        titel: 'Sonnenschutz und Selbstuntersuchung',
        kurz: 'Selbst tun',
        saetze: [
          'Meiden Sie die Mittagssonne. Kleidung, Hut und Sonnenbrille schützen besser als Creme; auf freie Haut Sonnencreme mit hohem Lichtschutzfaktor.',
          'Schützen Sie Kinder besonders gut vor Sonnenbrand, und verzichten Sie aufs Solarium.',
          'Sehen Sie sich alle paar Monate selbst an, mit Spiegel oder mit Hilfe Ihres Partners. Fotos helfen, Veränderungen zu erkennen.',
        ],
      },
    ],
    warnung:
      'Bitte bald in die Praxis, wenn sich ein Muttermal verändert, blutet oder juckt, ein neuer dunkler Fleck auftaucht oder unter einem Nagel ein dunkler Streifen oder Fleck entsteht.',
  },
];
