import type { Krankheit } from './typen';

export const LUNGE: Krankheit[] = [
  {
    id: 'asthma',
    name: 'Asthma',
    zusatz: 'Asthma bronchiale',
    gebiet: 'lunge',
    was: [
      'Bei Asthma sind die Atemwege dauerhaft entzündet und reagieren überempfindlich.',
      'Auf bestimmte Reize hin verengen sie sich: Die Muskeln verkrampfen, die Schleimhaut schwillt an, zäher Schleim bildet sich.',
      'Typisch sind Anfälle von Luftnot, pfeifende Atmung, Engegefühl in der Brust und Husten – oft nachts oder früh am Morgen.',
      'Zwischen den Anfällen können Sie völlig beschwerdefrei sein.',
    ],
    ursachen: [
      'Häufig steckt eine Allergie dahinter, etwa gegen Pollen, Hausstaubmilben oder Tierhaare.',
      'Auch Infekte, kalte Luft, Anstrengung, Rauch oder manche Schmerzmittel können Anfälle auslösen.',
      'Die Veranlagung liegt oft in der Familie – zusammen mit Heuschnupfen oder Neurodermitis.',
      'Unbehandelt kann die Lunge auf Dauer Schaden nehmen, und schwere Anfälle können gefährlich werden.',
    ],
    behandlung: [
      'Die wichtigste Behandlung ist ein Kortisonspray zum Einatmen. Es dämpft die Entzündung und wirkt nur, wenn Sie es regelmäßig nehmen.',
      'Dazu kommt ein Spray, das die Atemwege rasch erweitert – für den Bedarf oder fest kombiniert.',
      'Eingeatmetes Kortison wirkt fast nur in der Lunge. Spülen Sie danach den Mund aus, dann sind Nebenwirkungen selten.',
      'Ziel ist, dass Sie im Alltag und beim Sport keine Beschwerden haben.',
    ],
    selbst: [
      'Lassen Sie sich die Inhalation zeigen und üben Sie sie – die richtige Technik entscheidet über die Wirkung.',
      'Meiden Sie Ihre Auslöser, soweit es geht, und rauchen Sie nicht.',
      'Bewegung und Sport sind ausdrücklich erwünscht.',
      'Ein schriftlicher Plan hilft: Was tue ich, wenn die Beschwerden zunehmen?',
    ],
    warnung:
      'Hilft das Notfallspray nicht, fällt das Sprechen schwer oder werden die Lippen bläulich: sofort 112 anrufen.',
  },
  {
    id: 'copd',
    name: 'COPD',
    zusatz: 'Chronisch verengte Atemwege, „Raucherlunge“',
    gebiet: 'lunge',
    suche: 'raucherlunge emphysem chronische bronchitis',
    was: [
      'COPD ist eine dauerhafte Erkrankung der Lunge: Die Bronchien sind entzündet und verengt.',
      'Oft sind zusätzlich Lungenbläschen zerstört. Dann fehlt Fläche, über die Sauerstoff ins Blut gelangt.',
      'Typisch sind Husten, Auswurf und Atemnot – erst bei Belastung, später auch in Ruhe.',
      'Die Schäden bilden sich nicht zurück. Das Fortschreiten lässt sich aber deutlich bremsen.',
    ],
    ursachen: [
      'Die mit Abstand häufigste Ursache ist das Rauchen, auch das jahrelange Mitrauchen.',
      'Seltener sind Stäube und Dämpfe am Arbeitsplatz oder eine angeborene Veranlagung der Grund.',
      'Infekte können die Krankheit schubweise verschlechtern. Jeder Schub kostet Lungenfunktion.',
      'Auf Dauer werden auch Herz, Muskeln und Knochen belastet.',
    ],
    behandlung: [
      'Sprays zum Einatmen erweitern die Bronchien und erleichtern das Atmen. Sie werden täglich angewendet.',
      'Bei häufigen Schüben kann ein Kortisonspray dazukommen.',
      'Impfungen gegen Grippe, Pneumokokken, Corona und RSV schützen vor gefährlichen Infekten.',
      'Lungensport und Reha verbessern Ausdauer und Luftnot nachweislich. Bei schwerer COPD hilft Sauerstoff.',
    ],
    selbst: [
      'Der Rauchstopp ist die wirksamste Behandlung überhaupt – in jedem Stadium. Wir unterstützen Sie dabei.',
      'Bleiben Sie in Bewegung, auch wenn Sie dabei außer Atem kommen. Schonung schwächt die Muskeln.',
      'Üben Sie die Inhalation und atmen Sie bei Luftnot gegen die locker geschlossenen Lippen aus.',
      'Achten Sie auf Ihr Gewicht: Ungewollte Abnahme bitte ansprechen.',
    ],
    warnung:
      'Deutlich mehr Luftnot, mehr oder verfärbter Auswurf, Fieber: bitte am selben Tag melden. Bei schwerer Atemnot 112.',
  },
  {
    id: 'schlafapnoe',
    name: 'Schlafapnoe',
    zusatz: 'Atemaussetzer im Schlaf',
    gebiet: 'lunge',
    suche: 'schnarchen osas cpap',
    was: [
      'Bei der Schlafapnoe setzt die Atmung im Schlaf immer wieder für Sekunden aus.',
      'Die Muskeln im Rachen erschlaffen, der Atemweg fällt zusammen. Das Gehirn schlägt Alarm, und Sie wachen kurz auf – meist ohne es zu merken.',
      'Der Schlaf ist dadurch nicht erholsam. Typisch sind lautes Schnarchen, Atempausen und starke Müdigkeit am Tag.',
      'Viele Betroffene erfahren es erst von ihrem Partner oder ihrer Partnerin.',
    ],
    ursachen: [
      'Der wichtigste Risikofaktor ist Übergewicht, vor allem am Hals.',
      'Alkohol am Abend, Schlafmittel und das Schlafen in Rückenlage verstärken die Aussetzer.',
      'Auch ein enger Rachen, große Mandeln oder ein zurückliegender Unterkiefer spielen eine Rolle.',
      'Unbehandelt steigt das Risiko für Bluthochdruck, Herzrhythmusstörungen, Herzinfarkt und Schlaganfall – und für Unfälle durch Sekundenschlaf.',
    ],
    behandlung: [
      'Zuerst messen wir den Schlaf mit einem kleinen Gerät zu Hause, bei Bedarf im Schlaflabor.',
      'Am wirksamsten ist eine Atemmaske für die Nacht: Ein sanfter Luftstrom hält den Atemweg offen.',
      'Bei leichteren Formen hilft eine Zahnschiene, die den Unterkiefer etwas nach vorn hält.',
      'Schon wenige Kilo weniger können die Aussetzer deutlich verringern.',
    ],
    selbst: [
      'Nehmen Sie ab, wenn Sie übergewichtig sind – das behandelt die Ursache.',
      'Verzichten Sie abends auf Alkohol und Schlafmittel.',
      'Schlafen Sie in Seitenlage statt auf dem Rücken.',
      'Tragen Sie die Maske jede Nacht. Die Gewöhnung dauert meist einige Wochen, dann lohnt es sich.',
    ],
    warnung:
      'Wer am Steuer mit dem Schlaf kämpft, darf nicht fahren, bis die Behandlung wirkt.',
  },
  {
    id: 'erkaeltung',
    name: 'Erkältung',
    zusatz: 'grippaler Infekt',
    gebiet: 'lunge',
    suche: 'schnupfen husten halsschmerzen infekt atemwege viren grippal rhinitis bronchitis symptomatisch',
    was: [
      'Eine Erkältung ist eine Infektion der oberen Atemwege durch Viren – es gibt über 200 verschiedene.',
      'Typisch ist der Ablauf: erst Halskratzen, dann Schnupfen, zuletzt Husten. Dazu leichtes Fieber, Kopf- und Gliederschmerzen.',
      'Nach etwa einer Woche ist das Schlimmste vorbei. Der Husten kann zwei bis drei Wochen bleiben.',
      'Erwachsene trifft es zwei- bis viermal im Jahr, Kinder deutlich öfter. Das ist normal.',
    ],
    ursachen: [
      'Die Viren werden über Tröpfchen und über die Hände weitergegeben.',
      'Kälte allein macht nicht krank. Im Winter sitzen wir aber enger zusammen, und trockene Heizungsluft macht die Schleimhäute anfälliger.',
      'Antibiotika wirken nur gegen Bakterien, nicht gegen Viren. Bei einer Erkältung helfen sie nicht, haben aber Nebenwirkungen.',
      'Auch gelber oder grüner Schleim ist kein Zeichen für Bakterien – er gehört zum normalen Verlauf.',
    ],
    behandlung: [
      'Die Erkältung heilt von selbst. Behandelt werden nur die Beschwerden: Das verkürzt sie nicht, macht sie aber erträglicher.',
      'Gegen Schmerzen und Fieber: Paracetamol oder Ibuprofen.',
      'Gegen die verstopfte Nase: abschwellendes Nasenspray, höchstens eine Woche lang. Salzwasser-Spray oder eine Nasenspülung gehen unbegrenzt.',
      'Gegen Halsweh: Lutschtabletten und warme Getränke. Hustensaft und Schleimlöser wirken wenig – wenn sie guttun, schaden sie nicht.',
    ],
    selbst: [
      'Schonen Sie sich ein paar Tage und schlafen Sie viel. Sport erst wieder, wenn Sie fieberfrei sind.',
      'Trinken Sie ausreichend, am besten Warmes. Honig lindert den Hustenreiz.',
      'Hände waschen, in die Armbeuge husten, Abstand halten – so stecken Sie niemanden an.',
      'Lüften Sie regelmäßig und verzichten Sie aufs Rauchen.',
    ],
    warnung:
      'Bitte melden bei Fieber über 39 °C oder länger als drei Tage, Luftnot, Schmerzen beim Atmen, starken Ohr- oder Stirnschmerzen – oder wenn es nach einer Besserung wieder schlechter wird.',
  },
  {
    id: 'rauchstopp',
    name: 'Rauchstopp',
    zusatz: 'Mit dem Rauchen aufhören',
    gebiet: 'lunge',
    suche: 'rauchen nichtraucher aufhoeren tabak zigarette nikotin entwoehnung nikotinersatz nikotinpflaster kaugummi vareniclin e-zigarette rauchfrei',
    was: [
      'Tabakrauch enthält Tausende Schadstoffe, darunter viele, die Krebs auslösen.',
      'Er schädigt die Gefäße im ganzen Körper. Herzinfarkt, Schlaganfall und Durchblutungsstörungen der Beine sind die Folge.',
      'In der Lunge entstehen COPD und Lungenkrebs. Auch Krebs in Mund, Hals, Blase und vielen anderen Organen wird häufiger.',
      'Rauchende verlieren im Schnitt etwa zehn Lebensjahre. Wer aufhört, gewinnt viel davon zurück – in jedem Alter.',
    ],
    ursachen: [
      'Nikotin macht schnell abhängig. Es erreicht das Gehirn in Sekunden und setzt dort Glücksbotenstoffe frei.',
      'Fehlt es, kommt der Entzug: Unruhe, Gereiztheit, schlechte Konzentration und starkes Verlangen. Nach zwei bis vier Wochen lässt das deutlich nach.',
      'Dazu kommt die Gewohnheit: Die Zigarette gehört zum Kaffee, zur Pause, zum Ärger.',
      'Die meisten brauchen mehrere Anläufe. Ein Rückfall ist kein Versagen, sondern ein Schritt auf dem Weg.',
    ],
    behandlung: [
      'Mit Unterstützung gelingt der Rauchstopp deutlich häufiger als allein.',
      'Nikotinersatz lindert den Entzug: ein Pflaster für den ganzen Tag, dazu Kaugummi, Lutschtablette oder Spray bei plötzlichem Verlangen.',
      'Vareniclin ist eine Tablette, die das Verlangen dämpft und das Rauchen weniger befriedigend macht. Man nimmt sie etwa zwölf Wochen lang.',
      'Kurse und Telefonberatung helfen zusätzlich, etwa die kostenlose Rauchfrei-Beratung unter 0800 8 31 31 31.',
    ],
    selbst: [
      'Legen Sie einen Rauchstopp-Tag in den nächsten zwei Wochen fest und hören Sie an diesem Tag ganz auf.',
      'Räumen Sie vorher Zigaretten, Feuerzeuge und Aschenbecher weg. Erzählen Sie Familie und Kollegen davon.',
      'Überlegen Sie, wann Sie sonst rauchen, und planen Sie Ersatz: ein paar Schritte gehen, ein Glas Wasser, ein Kaugummi.',
      'Das Verlangen vergeht meist nach wenigen Minuten. Legen Sie das gesparte Geld für eine Belohnung zur Seite.',
    ],
    warnung:
      'Unter Vareniclin bei Stimmungstief oder dunklen Gedanken bitte sofort melden. Wer Clozapin, Olanzapin oder Theophyllin nimmt: vor dem Rauchstopp Bescheid sagen.',
  },
];
