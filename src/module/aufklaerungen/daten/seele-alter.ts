import type { Krankheit } from './typen';

// Seelische Belastungen (Gebiet „Kopf, Nerven und Seele“) und Themen rund ums
// Älterwerden (Gebiet „Älter werden“). Orientiert an S3-Leitlinie
// alkoholbezogene Störungen, DEGAM-Leitlinie Multimedikation und den
// Empfehlungen zur Sturzprävention (DEGAM/DGG), Stand 2026.

export const SEELE_ALTER: Krankheit[] = [
  {
    id: 'burnout',
    name: 'Burnout und Erschöpfung',
    zusatz: 'Erschöpfungssyndrom',
    gebiet: 'kopf',
    suche: 'burn-out ausgebrannt erschoepfung erschoepft ueberlastung stress arbeit pflege angehoerige',
    was: [
      'Burnout beschreibt einen Zustand tiefer Erschöpfung nach langer Überlastung – oft im Beruf, aber auch bei der Pflege von Angehörigen.',
      'Typisch sind das Gefühl, leer und ausgebrannt zu sein, innerer Abstand zur Arbeit und das Gefühl, nichts mehr zu schaffen.',
      'Der Körper meldet sich mit schlechtem Schlaf, Kopf- oder Rückenschmerzen und häufigen Infekten.',
      'Der Unterschied zur Depression: Beim Burnout hilft Erholung meist noch. Ist auch im Urlaub und in der Freizeit die Freude verloren, steckt oft eine Depression dahinter.',
    ],
    ursachen: [
      'Meist steht eine lange Belastung dahinter, ohne dass genug Erholung folgt: hoher Druck, wenig Einfluss, fehlende Anerkennung, Konflikte.',
      'Es trifft oft Menschen, die viel von sich verlangen und schwer Nein sagen können.',
      'Beruf, Familie und Pflege zusammen können jeden an die Grenze bringen. Das ist kein persönliches Versagen.',
      'Wir prüfen auch, ob eine körperliche Ursache mitspielt, etwa Blutarmut, die Schilddrüse oder nächtliche Atemaussetzer.',
    ],
    behandlung: [
      'Am Anfang steht ein ausführliches Gespräch: Was belastet Sie, was gibt Ihnen Kraft?',
      'Manchmal braucht es eine Auszeit mit Krankschreibung, um überhaupt wieder zur Ruhe zu kommen.',
      'Psychotherapie hilft, belastende Muster zu erkennen und zu verändern. Liegt eine Depression vor, kommen auch Medikamente infrage.',
      'Die Rückkehr in den Beruf gelingt oft gut in Stufen. Auch eine Reha kann sinnvoll sein.',
    ],
    selbst: [
      'Planen Sie Pausen und Erholung fest ein – so verbindlich wie einen Termin.',
      'Bewegung, ausreichend Schlaf und Zeit mit Menschen, die Ihnen guttun, füllen den Akku wieder.',
      'Üben Sie, Grenzen zu setzen und Aufgaben abzugeben.',
      'Alkohol und Schlafmittel helfen nur kurz und machen die Erschöpfung auf Dauer schlimmer.',
    ],
    warnung:
      'Wenn nichts mehr Freude macht oder Sie daran denken, sich etwas anzutun: Bitte sprechen Sie uns sofort an. Rund um die Uhr hilft die Telefonseelsorge 0800 111 0 111, im Notfall die 112.',
  },
  {
    id: 'alkohol',
    name: 'Alkohol: Wie viel ist zu viel?',
    zusatz: 'Riskanter Konsum und Abhängigkeit',
    gebiet: 'kopf',
    suche: 'alkohol trinken alkoholkonsum sucht abhaengigkeit alkoholismus entzug standardglas bier wein',
    was: [
      'Alkohol gehört für viele Menschen zum Alltag. Ein Maß ganz ohne Risiko gibt es aber nicht – je weniger, desto besser.',
      'Ein Standardglas ist ein kleines Bier, ein kleines Glas Wein oder ein Schnaps. Riskant wird es, wenn Frauen regelmäßig mehr als ein und Männer mehr als zwei Standardgläser am Tag trinken.',
      'Auch viel auf einmal, etwa auf Feiern, ist riskant.',
      'Bei einer Abhängigkeit ist das Verlangen stark, die Menge lässt sich schwer steuern, und ohne Alkohol kommen Zittern, Schwitzen oder Unruhe.',
    ],
    ursachen: [
      'Alkohol schadet vielen Organen: Leber, Bauchspeicheldrüse, Herz und Nerven. Er erhöht den Blutdruck und das Risiko für mehrere Krebsarten.',
      'Er stört den Schlaf, drückt auf die Stimmung und verursacht Stürze und Unfälle. Mit vielen Medikamenten verträgt er sich nicht.',
      'Eine Abhängigkeit entwickelt sich meist schleichend über Jahre, oft wenn Alkohol gegen Stress, Sorgen oder Schlafprobleme helfen soll.',
      'Veranlagung spielt mit. Abhängigkeit ist eine Krankheit, keine Charakterschwäche.',
    ],
    behandlung: [
      'Wir sprechen offen und ohne Vorwurf über Ihre Trinkmengen. Ein kurzer Fragebogen und Blutwerte geben zusätzliche Hinweise.',
      'Oft ist schon viel gewonnen, wenn Sie weniger trinken. Wir können gemeinsam ein Ziel festlegen und begleiten Sie dabei.',
      'Bei einer Abhängigkeit ist ein ärztlich begleiteter Entzug wichtig, oft im Krankenhaus. Medikamente lindern die Entzugszeichen.',
      'Danach helfen Suchtberatung, Entwöhnungsbehandlung, Selbsthilfegruppen und Medikamente, die das Verlangen dämpfen.',
    ],
    selbst: [
      'Schreiben Sie zwei Wochen lang auf, wann und wie viel Sie trinken. Das schafft Klarheit.',
      'Legen Sie mehrere Tage pro Woche ohne Alkohol fest. Kleinere Gläser, Wasser dazwischen und alkoholfreie Getränke helfen.',
      'Überlegen Sie, in welchen Situationen Sie trinken und was Ihnen dort stattdessen guttun könnte.',
      'Sie müssen das nicht allein schaffen: Suchtberatungsstellen und Selbsthilfegruppen sind kostenlos.',
    ],
    warnung:
      'Wer täglich trinkt und morgens zittert oder schwitzt, sollte nicht plötzlich allein aufhören: Ein kalter Entzug kann Krampfanfälle und ein lebensgefährliches Delir auslösen. Bei Krampfanfall, Verwirrtheit oder Halluzinationen: 112. In seelischer Not hilft die Telefonseelsorge 0800 111 0 111.',
  },
  {
    id: 'trauer',
    name: 'Trauer',
    zusatz: 'Wenn ein Mensch fehlt',
    gebiet: 'kopf',
    suche: 'trauer trauern verlust tod todesfall verstorben witwe witwer trauerstoerung anhaltende trauer',
    was: [
      'Trauer ist die natürliche Antwort auf einen Verlust – meist auf den Tod eines nahestehenden Menschen, manchmal auch auf eine Trennung oder den Verlust der Gesundheit.',
      'Trauer ist keine Krankheit. Schmerz, Sehnsucht, Leere, Wut, Schuldgefühle und auch Erleichterung – all das darf sein.',
      'Oft reagiert auch der Körper: mit Schlafstörungen, wenig Appetit, Erschöpfung und Konzentrationsproblemen.',
      'Trauer kommt in Wellen. An Jahrestagen oder Festen kann sie wieder stark werden. Einen festen Zeitplan gibt es nicht.',
    ],
    ursachen: [
      'Je enger die Bindung war, desto tiefer ist meist die Trauer.',
      'Besonders schwer kann es sein nach einem plötzlichen Tod, nach einem Suizid, beim Tod eines Kindes oder nach einer langen Zeit der Pflege.',
      'Wer allein ist oder schon früher seelisch erkrankt war, braucht oft mehr Unterstützung.',
      'Bleiben Sehnsucht und Schmerz auch nach mehr als einem halben Jahr so stark, dass der Alltag kaum gelingt, sprechen Fachleute von einer anhaltenden Trauerstörung. Auch eine Depression kann sich entwickeln.',
    ],
    behandlung: [
      'Normale Trauer braucht keine Behandlung, sondern Zeit und Menschen, die da sind.',
      'Wir sind gern für Sie da – für ein Gespräch und wenn der Körper Beschwerden macht.',
      'Hospizvereine, Trauergruppen und Kirchengemeinden bieten Trauerbegleitung an, auch für Angehörige nach langer Pflege.',
      'Bei einer anhaltenden Trauerstörung oder Depression hilft eine Psychotherapie. Beruhigungsmittel nehmen die Trauer nicht weg.',
    ],
    selbst: [
      'Erlauben Sie sich zu trauern, auf Ihre eigene Weise und in Ihrem Tempo.',
      'Erinnerungen dürfen bleiben: Fotos, Briefe, ein Besuch am Grab, eigene kleine Rituale.',
      'Achten Sie auf Essen, Schlaf, Bewegung und einen gewissen Tagesablauf. Nehmen Sie Hilfe an.',
      'Schieben Sie große Entscheidungen, etwa einen Umzug, wenn möglich auf.',
    ],
    warnung:
      'Wenn Sie dem verstorbenen Menschen nachfolgen möchten oder daran denken, sich etwas anzutun: Bitte sprechen Sie uns sofort an. Rund um die Uhr hilft die Telefonseelsorge 0800 111 0 111, im Notfall die 112.',
  },
  {
    id: 'stuerze',
    name: 'Stürze vermeiden',
    zusatz: 'Sturzvorbeugung im Alter',
    gebiet: 'alter',
    suche: 'sturz stuerzen sturzgefahr sturzprophylaxe gleichgewicht hueftprotektor hausnotruf stolperfallen',
    was: [
      'Mit dem Alter werden Stürze häufiger: Etwa jeder Dritte über 65 stürzt mindestens einmal im Jahr.',
      'Viele Stürze gehen glimpflich aus. Manche führen aber zu Knochenbrüchen, besonders an Hüfte und Handgelenk.',
      'Nach einem Sturz kommt oft die Angst vor dem nächsten. Wer sich deshalb weniger bewegt, wird schwächer und stürzt leichter.',
      'Viele Stürze lassen sich vermeiden – mit Training, einer sicheren Wohnung und passenden Medikamenten.',
    ],
    ursachen: [
      'Häufig sind schwache Beinmuskeln, ein unsicheres Gleichgewicht und ein langsamer Gang.',
      'Manche Medikamente erhöhen das Risiko: Schlaf- und Beruhigungsmittel, Mittel gegen Depression, Blutdrucksenker und Wassertabletten. Je mehr Medikamente, desto größer die Gefahr.',
      'Schlechtes Sehen, Schwindel beim Aufstehen, taube Füße, Vergesslichkeit und nächtliche Toilettengänge spielen ebenfalls mit.',
      'Dazu kommen Stolperfallen in der Wohnung. Bei Knochenschwund sind die Folgen eines Sturzes schwerer.',
    ],
    behandlung: [
      'Wir schätzen Ihr Sturzrisiko ein: mit Fragen, einem kurzen Gehtest und Blutdruckmessen im Stehen.',
      'Am wirksamsten ist ein Training für Kraft und Gleichgewicht – in der Physiotherapie oder in Kursen zur Sturzvorbeugung.',
      'Wir gehen Ihre Medikamente durch und lassen weg, was mehr schadet als nützt. Augen und Füße werden mit untersucht.',
      'Bei Knochenschwund behandeln wir die Knochen. Gehstock, Rollator, Hüftprotektor und Hausnotruf geben zusätzliche Sicherheit.',
    ],
    selbst: [
      'Beseitigen Sie Stolperfallen: Teppichkanten, Kabel, Schwellen. Sorgen Sie für gutes Licht und ein Nachtlicht zum Bad.',
      'Haltegriffe im Bad und rutschfeste Matten helfen. Tragen Sie feste Schuhe statt Pantoffeln.',
      'Stehen Sie langsam auf: erst kurz sitzen, dann stehen, dann gehen.',
      'Üben Sie täglich ein paar Minuten Kraft und Gleichgewicht. Tragen Sie ein Telefon oder den Notrufknopf bei sich.',
    ],
    warnung:
      'Bitte erzählen Sie uns von jedem Sturz. Sofort ärztlich abklären oder 112: wenn Sie nach dem Sturz nicht auftreten können oder die Hüfte schmerzt, nach einem Schlag auf den Kopf (besonders mit Blutverdünnern) und wenn Sie vor dem Sturz bewusstlos waren.',
  },
  {
    id: 'viele-medikamente',
    name: 'Viele Medikamente gleichzeitig',
    zusatz: 'Multimedikation',
    gebiet: 'alter',
    suche: 'polypharmazie multimedikation medikationsplan wechselwirkungen nebenwirkungen tabletten brown bag tablettenbox',
    was: [
      'Wer mehrere Krankheiten hat, nimmt oft viele Medikamente. Ab etwa fünf dauerhaft eingenommenen Mitteln spricht man von Multimedikation.',
      'Jedes Medikament kann für sich sinnvoll sein. Zusammen können sie sich aber gegenseitig verstärken oder abschwächen.',
      'Mögliche Folgen sind Schwindel, Müdigkeit, Verwirrtheit, Stürze, Appetitlosigkeit oder Verstopfung. Das wird leicht für Zeichen des Alters gehalten.',
      'Das Ziel heißt deshalb: so viel wie nötig, so wenig wie möglich.',
    ],
    ursachen: [
      'Oft verschreiben mehrere Ärztinnen und Ärzte, ohne voneinander zu wissen.',
      'Auch selbst gekaufte Mittel zählen mit: Schmerzmittel, Schlafmittel, pflanzliche Mittel und Nahrungsergänzungen.',
      'Im Alter arbeiten Nieren und Leber langsamer. Medikamente bleiben länger im Körper und wirken stärker.',
      'Manchmal wird eine Nebenwirkung mit einem weiteren Medikament behandelt, statt die Ursache zu erkennen.',
    ],
    behandlung: [
      'Wir gehen regelmäßig alle Ihre Medikamente gemeinsam durch: Ist jedes noch nötig, passt die Dosis, vertragen sie sich?',
      'Bringen Sie dafür alles in einer Tüte mit – Tabletten, Tropfen, Sprays, Salben und Gekauftes.',
      'Was nicht mehr nötig ist, setzen wir ab – manches langsam und in Schritten.',
      'Wer mindestens drei Medikamente dauerhaft nimmt, hat Anspruch auf einen Medikationsplan. Er kann auch in der elektronischen Patientenakte stehen.',
    ],
    selbst: [
      'Tragen Sie Ihren Medikationsplan immer bei sich und zeigen Sie ihn jeder Ärztin, jedem Arzt, in der Apotheke und im Krankenhaus.',
      'Setzen Sie kein Medikament ohne Rücksprache ab – manche dürfen nicht plötzlich weggelassen werden.',
      'Fragen Sie vor jedem gekauften Mittel in der Apotheke oder bei uns nach.',
      'Eine Tablettenbox für die Woche hilft, nichts zu vergessen und nichts doppelt zu nehmen.',
    ],
    warnung:
      'Plötzliche Verwirrtheit, starke Benommenheit, Stürze, Ohnmacht oder Blutungen nach einer Änderung der Medikamente: Bitte melden Sie sich sofort, im Notfall 112.',
  },
  {
    id: 'schwerhoerigkeit',
    name: 'Schwerhörigkeit',
    zusatz: 'Altersschwerhörigkeit',
    gebiet: 'alter',
    suche: 'schwerhoerig hoeren hoerverlust hoergeraet hoertest presbyakusis ohrenschmalz cerumen tinnitus',
    was: [
      'Bei vielen Menschen lässt das Hören mit dem Alter langsam nach, meist auf beiden Ohren.',
      'Zuerst gehen die hohen Töne verloren. Laute wie s, f und sch klingen undeutlich – Sprache wird schwer verständlich, besonders wenn es laut ist.',
      'Oft bemerken es Angehörige zuerst, etwa weil der Fernseher immer lauter läuft.',
      'Manchmal kommt ein Ohrgeräusch hinzu, ein Pfeifen oder Rauschen.',
    ],
    ursachen: [
      'Bei der Altersschwerhörigkeit nutzen sich die feinen Sinneszellen in der Hörschnecke ab. Sie wachsen nicht nach.',
      'Lärm im Beruf oder in der Freizeit, Veranlagung, Rauchen, Diabetes und manche Medikamente beschleunigen das.',
      'Manche Ursachen sind leicht zu beheben, zum Beispiel ein Pfropf aus Ohrenschmalz oder Flüssigkeit hinter dem Trommelfell.',
      'Unbehandelt führt Schwerhörigkeit oft zu Rückzug und Einsamkeit. Sie erhöht auch das Risiko für eine Demenz.',
    ],
    behandlung: [
      'Wir schauen zuerst ins Ohr. Einen Pfropf aus Ohrenschmalz können wir meist ausspülen.',
      'Den genauen Hörtest macht die HNO-Praxis. Sie verordnet bei Bedarf ein Hörgerät.',
      'Die Hörakustik passt das Gerät an, Sie können es vorher zur Probe tragen. Die Krankenkasse übernimmt ein gutes Grundgerät, teurere Geräte kosten Aufpreis.',
      'Das Gehirn braucht einige Wochen, um sich an das neue Hören zu gewöhnen. Bei sehr starker Schwerhörigkeit gibt es ein Implantat.',
    ],
    selbst: [
      'Tragen Sie das Hörgerät jeden Tag, den ganzen Tag – nur so gewöhnt sich das Gehirn daran.',
      'Keine Wattestäbchen in den Gehörgang: Sie schieben das Ohrenschmalz nach innen. Ein paar Tropfen Öl weichen es auf.',
      'Schützen Sie Ihre Ohren vor Lärm.',
      'Bitten Sie andere, Sie anzusehen und deutlich, nicht lauter zu sprechen. Für den Fernseher gibt es Funkkopfhörer.',
    ],
    warnung:
      'Plötzlich schlechteres Hören auf einem Ohr, Hörverlust mit Drehschwindel, Ohrenschmerzen oder Ausfluss aus dem Ohr: bitte rasch ärztlich abklären lassen.',
  },
];
