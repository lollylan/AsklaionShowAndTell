import type { Krankheit } from './typen';

// Haut: entzündliche Hautkrankheiten – Neurodermitis, Schuppenflechte, Akne, Rosazea
// und Nesselsucht.

export const HAUT_ENTZUENDLICH: Krankheit[] = [
  {
    id: 'neurodermitis',
    name: 'Neurodermitis',
    zusatz: 'Atopische Dermatitis, atopisches Ekzem',
    gebiet: 'haut',
    suche:
      'neurodermitis atopische dermatitis atopisches ekzem endogenes ekzem ekzem juckreiz trockene haut hautbarriere atopie heuschnupfen asthma allergie basispflege rückfettung rueckfettung kortison kortisoncreme glukokortikoid tacrolimus pimecrolimus calcineurin proaktiv lichttherapie uv biologika dupilumab tralokinumab lebrikizumab jak-hemmer ciclosporin staphylokokken ekzema herpeticatum milchschorf beugen kniekehle ellenbeuge',
    was: [
      'Neurodermitis ist eine Entzündung der Haut, die in Schüben kommt und geht. Sie ist nicht ansteckend.',
      'Die Haut ist trocken, gerötet und juckt stark. Durch das Kratzen wird sie mit der Zeit dicker und rau.',
      'Bei Kindern sind oft Gesicht, Ellenbeugen und Kniekehlen betroffen, bei Erwachsenen auch Hals, Hände und Augenlider.',
      'Viele Kinder haben als Jugendliche kaum noch Beschwerden. Bei manchen bleibt die Neigung ein Leben lang.',
    ],
    ursachen: [
      'Die Schutzschicht der Haut ist von Natur aus schwächer. Sie hält das Wasser schlecht und lässt Reizstoffe leichter hinein.',
      'Dazu reagiert die Abwehr der Haut zu stark. Die Neigung wird oft vererbt, häufig zusammen mit Heuschnupfen oder Asthma.',
      'Schübe auslösen können zum Beispiel Wolle, Schwitzen, trockene Heizungsluft, Stress, Infekte oder bei manchen bestimmte Allergien.',
      'Aufgekratzte Haut entzündet sich leichter mit Bakterien oder Viren. Der Juckreiz stört oft den Schlaf.',
    ],
    behandlung: [
      'Die Grundlage ist eine tägliche rückfettende Pflege, auch dann, wenn die Haut gerade gut aussieht.',
      'Im Schub hilft eine Kortisoncreme in passender Stärke. Richtig angewendet ist sie sicher; wir sagen Ihnen, wie lange und wie oft.',
      'Für empfindliche Stellen wie Gesicht und Augenlider gibt es kortisonfreie Cremes. Kommen Schübe oft, beugt man vor: die Creme zweimal pro Woche auf die bekannten Stellen.',
      'Reicht das nicht, kommen eine Lichttherapie oder moderne Spritzen und Tabletten infrage. Das plant meist die Hautärztin oder der Hautarzt mit.',
    ],
    selbst: [
      'Cremen Sie sich mindestens einmal täglich ein, am besten direkt nach dem Duschen.',
      'Duschen Sie kurz und lauwarm und nehmen Sie milde, seifenfreie Waschmittel.',
      'Tragen Sie weiche Baumwolle statt Wolle. Halten Sie die Fingernägel kurz; kühlen oder drücken statt kratzen.',
      'Lassen Sie Nahrungsmittel nicht auf Verdacht weg. Eine Diät hilft nur bei einer nachgewiesenen Allergie.',
    ],
    warnung:
      'Bilden sich plötzlich viele schmerzhafte Bläschen oder kleine runde Wunden, oft mit Fieber, kommen Sie noch am selben Tag. Das kann eine gefährliche Virusinfektion der Haut sein.',
  },
  {
    id: 'schuppenflechte',
    name: 'Schuppenflechte',
    zusatz: 'Psoriasis',
    gebiet: 'haut',
    suche:
      'schuppenflechte psoriasis psoriasis vulgaris plaque plaques schuppen silbrig ellenbogen knie kopfhaut nagel tüpfelnägel tuepfelnaegel psoriasis-arthritis psoriasisarthritis gelenke autoimmun calcipotriol vitamin d kortison salicylsäure salicylsaeure lichttherapie uvb methotrexat mtx fumarsäure fumarsaeure apremilast biologika köbner koebner',
    was: [
      'Die Schuppenflechte ist eine Entzündung der Haut, die meist ein Leben lang in Schüben verläuft. Sie ist nicht ansteckend.',
      'Typisch sind scharf begrenzte, rote, leicht erhabene Flecken mit silbrig-weißen Schuppen. Manchmal jucken sie.',
      'Häufige Stellen sind Ellenbogen, Knie, Kopfhaut, der Bereich am Steiß und der Bauchnabel. Auch die Nägel können kleine Dellen bekommen.',
      'Bei einem Teil der Betroffenen entzünden sich mit der Zeit auch Gelenke. Das nennt man Psoriasis-Arthritis.',
    ],
    ursachen: [
      'Die Abwehr des Körpers ist fehlgesteuert und regt die Haut an, sich viel zu schnell zu erneuern. So stauen sich Hautzellen zu dicken Schuppen.',
      'Die Neigung wird oft vererbt. Ausgelöst wird ein Schub zum Beispiel durch Infekte wie eine Mandelentzündung, Stress, Verletzungen der Haut oder einige Medikamente.',
      'Rauchen, viel Alkohol und Übergewicht machen die Schuppenflechte stärker.',
      'Wer eine ausgeprägte Schuppenflechte hat, hat öfter auch Bluthochdruck, Diabetes, Herzkrankheiten oder eine Depression. Darauf achten wir mit.',
    ],
    behandlung: [
      'Bei wenigen Stellen reichen meist Cremes oder Gele: oft eine Mischung aus Kortison und einem Abkömmling von Vitamin D.',
      'Dicke Schuppen löst man vorher mit einer Salbe, zum Beispiel mit Salicylsäure. Für die Kopfhaut gibt es Lösungen und Schaum.',
      'Bei vielen Stellen hilft eine Lichttherapie. Reicht das nicht, gibt es Tabletten und moderne Spritzen, die die fehlgesteuerte Abwehr gezielt dämpfen.',
      'Diese Behandlung beginnt meist bei der Hautärztin oder beim Hautarzt. Sie wirkt heute bei den meisten sehr gut.',
    ],
    selbst: [
      'Pflegen Sie die Haut täglich mit einer rückfettenden Creme, das lindert Spannung und Juckreiz.',
      'Rauchstopp, wenig Alkohol und – falls nötig – Abnehmen verbessern die Haut spürbar.',
      'Kratzen Sie Schuppen nicht ab und schützen Sie die Haut vor Verletzungen.',
      'Sagen Sie uns, wenn Gelenke schmerzen, morgens steif oder geschwollen sind, oder ein ganzer Finger dick wird.',
    ],
    warnung:
      'Wird die Haut am ganzen Körper rot, kommen Fieber, Schüttelfrost oder viele Eiterbläschen dazu, kommen Sie sofort. Geschwollene, schmerzende Gelenke bitte bald abklären.',
  },
  {
    id: 'akne',
    name: 'Akne',
    zusatz: 'Acne vulgaris',
    gebiet: 'haut',
    suche:
      'akne acne vulgaris pickel mitesser komedonen pusteln papeln knoten talg talgdrüse talgdruese pubertät pubertaet narben benzoylperoxid adapalen tretinoin retinoid azelainsäure azelainsaeure clindamycin doxycyclin minocyclin isotretinoin antibabypille pille hormone spätakne spaetakne',
    was: [
      'Akne ist eine Entzündung der Talgdrüsen und Haarwurzeln der Haut. Sie betrifft vor allem Gesicht, Brust und Rücken.',
      'Am Anfang verstopfen die Poren. So entstehen Mitesser, offene mit dunkler Spitze oder geschlossene als kleine helle Knötchen.',
      'Entzünden sie sich, werden daraus rote Pickel und Eiterpickel, bei schwerer Akne auch tiefe, schmerzhafte Knoten.',
      'Die meisten Jugendlichen haben irgendwann Akne. Manche bekommen sie erst oder noch einmal als Erwachsene.',
    ],
    ursachen: [
      'In der Pubertät regen Hormone die Talgdrüsen an. Gleichzeitig verhornt der Ausgang der Pore stärker und verstopft.',
      'Im gestauten Talg vermehren sich Bakterien, die ohnehin auf der Haut leben. Das löst die Entzündung aus.',
      'Die Neigung liegt oft in der Familie. Mangelnde Hygiene ist keine Ursache. Fettige Kosmetik, manche Medikamente und Rauchen können Akne verstärken.',
      'Tiefe Pickel und Knoten können Narben hinterlassen. Deshalb lohnt es sich, früh zu behandeln.',
    ],
    behandlung: [
      'Bei leichter Akne helfen Cremes oder Gele, die die Poren öffnen und Bakterien hemmen, zum Beispiel mit Benzoylperoxid, Adapalen oder Azelainsäure.',
      'Sie wirken langsam: Rechnen Sie mit sechs bis acht Wochen, bis Sie eine Besserung sehen. Am Anfang kann die Haut brennen und schuppen.',
      'Bei stärkerer Akne kommt für einige Monate eine Antibiotika-Tablette dazu, immer zusammen mit einer Creme. Für Frauen kann eine bestimmte Pille helfen.',
      'Bei schwerer Akne gibt es Isotretinoin als Tablette. Es wirkt sehr gut, darf aber auf keinen Fall in der Schwangerschaft genommen werden – dann ist eine sichere Verhütung Pflicht.',
    ],
    selbst: [
      'Waschen Sie das Gesicht morgens und abends mit einem milden Reinigungsmittel. Zu häufiges oder scharfes Waschen reizt.',
      'Drücken Sie Pickel nicht aus. Das verschlimmert die Entzündung und kann Narben machen.',
      'Nehmen Sie leichte Pflege und Make-up, auf denen „nicht komedogen“ steht. Während der Behandlung ist Sonnenschutz wichtig.',
      'Halten Sie durch: Die Behandlung braucht Wochen, und eine Pflege danach verhindert, dass die Akne zurückkommt.',
    ],
    warnung:
      'Bitte bald melden bei großen, schmerzhaften Knoten, Narben oder wenn die Akne Sie seelisch stark belastet. Unter Isotretinoin bei Stimmungstief oder Verdacht auf Schwangerschaft sofort.',
  },
  {
    id: 'rosazea',
    name: 'Rosazea',
    zusatz: 'Kupferfinne, Couperose',
    gebiet: 'haut',
    suche:
      'rosazea rosacea kupferfinne couperose gesichtsrötung gesichtsroetung rotes gesicht flush erröten erroeten äderchen aederchen teleangiektasien papeln pusteln rhinophym knollennase augen okuläre rosazea demodex milben metronidazol azelainsäure azelainsaeure ivermectin brimonidin oxymetazolin doxycyclin isotretinoin laser',
    was: [
      'Die Rosazea ist eine Entzündung der Gesichtshaut, die meist ab dem mittleren Lebensalter beginnt und in Schüben verläuft.',
      'Wangen, Nase, Stirn und Kinn werden rot, anfangs nur zeitweise, später oft dauerhaft. Dazu kommen feine sichtbare Äderchen.',
      'Viele bekommen kleine rote Knötchen und Eiterpickel. Anders als bei Akne gibt es dabei keine Mitesser.',
      'Bei manchen brennen oder jucken die Augen, oder die Augenlider sind entzündet. Selten wird die Nase dick und knollig.',
    ],
    ursachen: [
      'Warum die Rosazea entsteht, ist nicht ganz geklärt. Die Blutgefäße im Gesicht reagieren zu stark, und die Abwehr der Haut ist überempfindlich.',
      'Winzige Milben, die bei jedem Menschen in der Haut leben, kommen bei Rosazea oft vermehrt vor und können die Entzündung anfachen.',
      'Häufige Auslöser sind Sonne, Hitze, Kälte, heiße Getränke, scharfes Essen, Alkohol und Stress.',
      'Auch eine Kortisoncreme im Gesicht kann eine Rosazea auslösen oder verschlimmern.',
    ],
    behandlung: [
      'Gegen Knötchen und Eiterpickel helfen Cremes oder Gele, zum Beispiel mit Ivermectin, Metronidazol oder Azelainsäure – angewendet über Wochen.',
      'Bei stärkerer Entzündung kommt für einige Monate eine niedrig dosierte Tablette Doxycyclin dazu.',
      'Gegen die Rötung gibt es ein Gel, das die Äderchen für einige Stunden enger stellt. Sichtbare Äderchen lassen sich beim Hautarzt mit Laser oder Licht behandeln.',
      'Die Rosazea lässt sich gut beruhigen, aber nicht heilen. Viele brauchen danach eine Creme dauerhaft oder in Abständen.',
    ],
    selbst: [
      'Führen Sie eine Weile Buch, wann Ihr Gesicht aufblüht. So erkennen Sie Ihre eigenen Auslöser.',
      'Schützen Sie das Gesicht täglich vor Sonne, am besten mit einer leichten Creme mit hohem Lichtschutz.',
      'Reinigen Sie mild mit lauwarmem Wasser. Verzichten Sie auf Peelings, alkoholhaltige Gesichtswasser und fettige Salben.',
      'Nehmen Sie keine Kortisoncreme fürs Gesicht ohne ärztlichen Rat.',
    ],
    warnung:
      'Werden die Augen rot und schmerzhaft, sind sie lichtempfindlich oder sehen Sie schlechter, lassen Sie das noch am selben Tag augenärztlich ansehen.',
  },
  {
    id: 'nesselsucht',
    name: 'Nesselsucht',
    zusatz: 'Urtikaria',
    gebiet: 'haut',
    suche:
      'nesselsucht urtikaria urticaria nesselausschlag quaddeln quaddel juckreiz histamin mastzellen angioödem angiooedem quincke-ödem quincke schwellung lippen augenlider akut chronisch spontan induzierbar kälte druck wärme dermographismus antihistaminikum antihistaminika cetirizin loratadin desloratadin fexofenadin bilastin omalizumab ciclosporin kortison allergie anaphylaxie adrenalin ace-hemmer',
    was: [
      'Bei Nesselsucht entstehen plötzlich Quaddeln: erhabene, juckende Schwellungen der Haut mit rotem Rand, wie nach einer Berührung mit Brennnesseln.',
      'Die einzelne Quaddel verschwindet nach Stunden, meist innerhalb eines Tages, ohne Spuren. Dafür tauchen an anderen Stellen neue auf.',
      'Manchmal schwellen auch tiefere Hautschichten an, zum Beispiel Lippen, Augenlider oder Hände. Das spannt eher, als dass es juckt.',
      'Meist ist die Nesselsucht nach Tagen bis wenigen Wochen vorbei. Dauert sie länger als sechs Wochen, spricht man von einer chronischen Nesselsucht.',
    ],
    ursachen: [
      'Bestimmte Abwehrzellen der Haut, die Mastzellen, schütten Histamin aus. Das macht die Gefäße undicht, Wasser tritt ins Gewebe und es juckt.',
      'Die kurze Nesselsucht kommt oft mit oder nach einem Infekt, manchmal durch Medikamente wie Schmerzmittel oder Antibiotika, seltener durch Nahrungsmittel.',
      'Bei der chronischen Form findet man meist keinen äußeren Auslöser. Oft richtet sich die eigene Abwehr gegen die Mastzellen. Bei manchen lösen Druck, Kälte, Wärme oder Reiben die Quaddeln aus.',
      'Schwellungen ohne Quaddeln können auch von Blutdruckmitteln wie ACE-Hemmern kommen. Das sollten wir wissen.',
    ],
    behandlung: [
      'Die wichtigsten Medikamente sind Antihistaminika, die nicht müde machen, zum Beispiel Cetirizin oder Loratadin. Bei chronischer Nesselsucht nimmt man sie täglich, nicht nur bei Bedarf.',
      'Reicht die übliche Menge nicht, kann sie nach ärztlicher Anweisung erhöht werden.',
      'Bei einem starken Schub geben wir für wenige Tage Kortison.',
      'Hilft das alles nicht, gibt es eine Spritze, die die Mastzellen beruhigt. Sie wird meist bei der Hautärztin oder beim Hautarzt begonnen.',
    ],
    selbst: [
      'Kühlen lindert den Juckreiz. Tragen Sie lockere Kleidung und vermeiden Sie heißes Duschen.',
      'Schreiben Sie auf, wann Quaddeln kommen und was Sie davor gegessen, getan oder eingenommen haben. Fotos helfen uns bei der Beurteilung.',
      'Schmerzmittel wie Ibuprofen, Diclofenac oder ASS können die Nesselsucht verstärken. Bei Bedarf ist Paracetamol meist besser verträglich.',
      'Haben Sie ein Notfallset mit Adrenalin bekommen, tragen Sie es immer bei sich.',
    ],
    warnung:
      'Schwillt die Zunge oder der Hals an, haben Sie Atemnot, Schluckbeschwerden oder wird Ihnen schwindelig: sofort 112 rufen.',
  },
];
