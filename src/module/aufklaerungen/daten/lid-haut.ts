import type { Krankheit } from './typen';

// Knoten am Augenlid (Gerstenkorn, Hagelkorn und der Vergleich der beiden) und Altersflecken.
// Die Lidknoten stehen bei der Haut, weil es um Drüsen der Lidhaut geht; die Bindehaut-
// entzündung bleibt bei den Infekten.

export const LID_HAUT: Krankheit[] = [
  {
    id: 'gerstenkorn',
    name: 'Gerstenkorn',
    zusatz: 'Hordeolum',
    gebiet: 'haut',
    suche:
      'gerstenkorn hordeolum hordeolum externum internum stye lid augenlid lidrand wimpern knoten beule eiter entzuendung staphylokokken lidranddruese zeis moll blepharitis augensalbe waerme auge',
    was: [
      'Ein Gerstenkorn ist eine eitrige Entzündung einer kleinen Drüse am Augenlid. Meist stecken Bakterien von der eigenen Haut dahinter.',
      'Innerhalb von ein, zwei Tagen wird eine Stelle am Lidrand rot, schwillt an und tut weh. Oft zeigt sich nach einigen Tagen ein gelber Eiterpunkt.',
      'Sitzt es außen am Wimpernrand, sieht man es gut. Sitzt es innen im Lid, schwillt das ganze Lid an.',
      'Ein Gerstenkorn ist harmlos und heilt meist von selbst in etwa einer Woche.',
    ],
    ursachen: [
      'Am Lidrand sitzen viele kleine Drüsen. Verstopft eine, vermehren sich darin Bakterien – meist Staphylokokken, die auf jeder Haut leben.',
      'Häufiger trifft es Menschen mit entzündeten Lidrändern, mit Rosazea oder Diabetes und alle, die sich oft die Augen reiben.',
      'Auch alte Schminke und Kontaktlinsen, die nicht sauber sind, begünstigen es.',
      'Ein Gerstenkorn steckt kaum an. Trotzdem eigene Handtücher benutzen.',
    ],
    behandlung: [
      'Meist reichen Wärme und Geduld: Das Gerstenkorn öffnet sich von selbst, der Eiter fließt ab, und es heilt.',
      'Bei starker Entzündung verschreiben wir eine Augensalbe oder Augentropfen mit Antibiotikum. Tabletten sind nur nötig, wenn sich die Entzündung auf das Lid oder die Umgebung ausbreitet.',
      'Heilt es nach zwei Wochen nicht ab oder kommt es immer wieder, schicken wir Sie zur Augenärztin oder zum Augenarzt. Dort kann es mit einem kleinen Schnitt geöffnet werden.',
    ],
    selbst: [
      'Mehrmals täglich 5 bis 10 Minuten etwas Warmes auflegen, etwa einen sauberen, warmen Waschlappen. Das lindert und hilft, dass es sich öffnet.',
      'Nicht ausdrücken oder aufstechen – sonst können sich die Bakterien im Lid ausbreiten.',
      'Bis es abgeheilt ist: keine Schminke am Auge, keine Kontaktlinsen, Hände waschen vor jedem Berühren.',
      'Kommen Gerstenkörner öfter, hilft tägliche Lidrandpflege.',
    ],
    warnung:
      'Wird das ganze Lid rot, heiß und dick, oder kommen Fieber, Schmerzen hinter dem Auge oder schlechteres Sehen dazu: bitte noch am selben Tag ärztlich ansehen lassen.',
  },
  {
    id: 'hagelkorn',
    name: 'Hagelkorn',
    zusatz: 'Chalazion',
    gebiet: 'haut',
    suche:
      'hagelkorn chalazion chalazium meibom meibomdruese talgdruese lid augenlid knoten kugel fettstau lidplatte tarsus blepharitis lidrandpflege waerme massage ausschaben operation kortison auge',
    was: [
      'Ein Hagelkorn ist ein fester, runder Knoten im Augenlid. Er entsteht, wenn eine Talgdrüse im Lid verstopft und sich ihr Fett staut.',
      'Es wächst langsam über Tage bis Wochen, meist etwas vom Lidrand entfernt. Typisch: Es tut kaum weh und ist nicht stark gerötet.',
      'Es kann erbsengroß werden. Ein großes Hagelkorn drückt manchmal auf das Auge, dann sieht man etwas verschwommen.',
      'Es ist keine Infektion und steckt nicht an. Viele Hagelkörner verschwinden von selbst – das dauert aber oft Wochen bis Monate.',
    ],
    ursachen: [
      'Im Lid liegen lange Talgdrüsen, die Meibom-Drüsen. Sie geben Fett in die Tränen, damit diese nicht zu schnell verdunsten.',
      'Ist der Ausgang einer Drüse verstopft, staut sich das Fett. Der Körper kapselt es ab – so entsteht ein kleiner, fester Knoten.',
      'Häufiger trifft es Menschen mit entzündeten Lidrändern, Rosazea oder fettiger Haut. Manchmal bleibt nach einem Gerstenkorn ein Hagelkorn zurück.',
      'Kommt ein Knoten immer wieder an derselben Stelle, untersuchen wir ihn genauer, um einen sehr seltenen Tumor nicht zu übersehen.',
    ],
    behandlung: [
      'Zuerst behandeln wir mit Wärme und Massage über einige Wochen. Antibiotika helfen nicht, weil keine Bakterien dahinterstecken.',
      'Bleibt das Hagelkorn länger als etwa zwei Monate oder stört es, kann die Augenärztin oder der Augenarzt es entfernen.',
      'Das ist ein kleiner Eingriff mit örtlicher Betäubung: Das Lid wird umgeklappt und der Knoten von innen geöffnet und ausgeschabt. Außen bleibt meist keine Narbe.',
      'Manchmal ist auch eine Spritze mit Kortison in den Knoten möglich.',
    ],
    selbst: [
      'Zwei- bis viermal täglich 10 Minuten Wärme auflegen, etwa einen warmen Waschlappen oder eine Wärmebrille aus der Apotheke. Die Wärme macht das gestaute Fett weich.',
      'Danach das Lid mit sauberem Finger sanft in Richtung Lidrand massieren.',
      'Nicht ausdrücken – das Fett liegt tief im Lid und kommt so nicht heraus.',
      'Gegen neue Hagelkörner hilft tägliche Lidrandpflege.',
    ],
    warnung:
      'Wächst ein Knoten schnell, blutet er, fallen dort Wimpern aus oder kommt er nach der Entfernung wieder: bitte zur Augenärztin oder zum Augenarzt.',
  },
  {
    id: 'lidknoten',
    name: 'Gerstenkorn oder Hagelkorn?',
    zusatz: 'Knoten am Augenlid unterscheiden',
    gebiet: 'haut',
    suche:
      'gerstenkorn hagelkorn unterschied vergleich hordeolum chalazion lid augenlid knoten beule lidrand lidrandpflege waerme massage blepharitis auge',
    seiten: [
      {
        id: 'ueberblick',
        titel: 'Zwei Knoten am Lid',
        kurz: 'Überblick',
        saetze: [
          'Gerstenkorn und Hagelkorn sind beide kleine Knoten am Augenlid. Sie werden oft verwechselt, sind aber verschieden.',
          'Das Gerstenkorn ist eine Entzündung durch Bakterien: Es kommt rasch, ist rot und tut weh.',
          'Das Hagelkorn ist ein Fettstau ohne Bakterien: Es wächst langsam, ist fest und tut kaum weh.',
          'Beide sind harmlos und sehr häufig.',
        ],
      },
      {
        id: 'unterschiede',
        titel: 'Woran man sie unterscheidet',
        kurz: 'Unterschiede',
        saetze: [
          'Beginn: Das Gerstenkorn entsteht in ein bis zwei Tagen, das Hagelkorn über Wochen.',
          'Schmerz: Das Gerstenkorn drückt und pocht, das Hagelkorn tut meist nicht weh.',
          'Ort: Das Gerstenkorn sitzt meist direkt am Wimpernrand, oft mit gelbem Eiterpunkt. Das Hagelkorn liegt etwas weiter im Lid und fühlt sich an wie ein kleines Kügelchen.',
          'Verlauf: Das Gerstenkorn heilt meist in einer Woche, das Hagelkorn kann Monate bleiben.',
        ],
      },
      {
        id: 'behandlung',
        titel: 'Was hilft',
        kurz: 'Behandlung',
        saetze: [
          'Bei beiden hilft Wärme: mehrmals täglich 5 bis 10 Minuten einen warmen, sauberen Waschlappen auflegen.',
          'Beim Gerstenkorn kann bei starker Entzündung eine Augensalbe mit Antibiotikum helfen. Beim Hagelkorn helfen Antibiotika nicht, dafür sanfte Massage nach der Wärme.',
          'Ist ein Hagelkorn nach etwa zwei Monaten nicht weg, kann die Augenärztin oder der Augenarzt es in einem kleinen Eingriff entfernen.',
          'Bei beiden gilt: nicht ausdrücken, keine Schminke und keine Kontaktlinsen, bis es abgeheilt ist.',
        ],
      },
      {
        id: 'vorbeugen',
        titel: 'Lidrandpflege',
        kurz: 'Vorbeugen',
        bild: 'lidrandpflege',
        saetze: [
          'Wer öfter Gerstenkörner oder Hagelkörner hat, hat oft entzündete Lidränder. Dann hilft tägliche Pflege über Wochen.',
          'Wärme: morgens und abends die geschlossenen Augen 5 bis 10 Minuten warm halten.',
          'Massage: mit sauberem Finger das Oberlid nach unten, das Unterlid nach oben zum Wimpernrand streichen.',
          'Reinigen: den Lidrand mit einem feuchten Wattestäbchen oder einem Lidpflegetuch sanft säubern.',
        ],
      },
    ],
    warnung:
      'Rotes, heißes, dickes Lid mit Fieber, Schmerzen hinter dem Auge oder schlechterem Sehen: bitte noch am selben Tag ärztlich ansehen lassen.',
  },
  {
    id: 'altersflecken',
    name: 'Altersflecken',
    zusatz: 'Lentigo solaris',
    gebiet: 'haut',
    suche:
      'altersflecken pigmentflecken sonnenflecken leberflecken lentigo solaris senilis lentigines hautflecken braune flecken handruecken seborrhoische keratose alterswarze hautalterung uv sonne hautkrebs melanom lentigo maligna laser vereisen kryotherapie bleichcreme sonnenschutz',
    was: [
      'Altersflecken sind flache, hell- bis mittelbraune Flecken auf der Haut. Sie heißen auch Sonnenflecken oder Pigmentflecken.',
      'Sie entstehen dort, wo die Haut über Jahre viel Sonne abbekommen hat: auf Handrücken, Unterarmen, Gesicht, Dekolleté und Schultern.',
      'Typisch sind eine gleichmäßige Farbe, ein glatter Rand und eine Größe von wenigen Millimetern bis etwa zwei Zentimetern. Sie jucken nicht und tun nicht weh.',
      'Altersflecken sind harmlos und werden nicht zu Hautkrebs.',
    ],
    ursachen: [
      'UV-Licht regt über die Jahre die Farbzellen der Haut an. An manchen Stellen bilden sie dauerhaft mehr Farbstoff – so entsteht ein Fleck.',
      'Sie beginnen oft ab etwa 40 und werden mit dem Alter mehr. Wer helle Haut hat und viel in der Sonne war, etwa bei der Arbeit oder im Solarium, hat mehr davon.',
      'Ähnlich, aber leicht erhaben, rau und wie aufgeklebt ist die Alterswarze. Auch sie ist harmlos.',
      'Schwarzer Hautkrebs kann am Anfang ähnlich aussehen. Er hat aber oft mehrere Farben, einen unscharfen Rand und verändert sich.',
    ],
    behandlung: [
      'Eine Behandlung ist nicht nötig. Wer sich an den Flecken stört, kann sie aufhellen oder entfernen lassen – das ist eine Schönheitsbehandlung, die man selbst bezahlt.',
      'Möglich sind Vereisen, Laser oder spezielle Bleichcremes, meist in der Hautarztpraxis.',
      'Vorher muss sicher sein, dass der Fleck harmlos ist. Deshalb zuerst ansehen lassen, am besten mit dem Auflichtmikroskop.',
      'Ohne Sonnenschutz kommen behandelte Flecken oft wieder.',
    ],
    selbst: [
      'Täglicher Sonnenschutz verhindert neue Flecken und lässt vorhandene nicht dunkler werden: hoher Lichtschutzfaktor, Hut und Kleidung, Mittagssonne meiden.',
      'Kein Solarium.',
      'Sehen Sie Ihre Flecken alle paar Monate an. Fotos mit dem Handy helfen, Veränderungen zu erkennen.',
      'Ab 35 zahlt die Krankenkasse alle zwei Jahre eine Hautkrebs-Vorsorge.',
    ],
    warnung:
      'Ein Fleck, der wächst, mehrere Farben oder einen unscharfen Rand bekommt, juckt, blutet oder anders aussieht als die anderen: bitte zeigen.',
  },
];
