// Krankheitsbilder an Fuß, Knie, Hüfte und Kreuz-Darmbein-Gelenk.
//
// Quellen für die Einstufung auf der Seite „Was hilft?“:
//  - AWMF S3-Leitlinie „Prävention und Therapie der Gonarthrose“ (187-050), DGOU, 2024/2025
//    https://register.awmf.org/assets/guidelines/187-050k_S3_Gonarthrose_2025-05.pdf
//  - AWMF S2k-Leitlinie „Koxarthrose“ (033-001), DGOOC, 2019 (abgelaufen, in Überarbeitung)
//    https://register.awmf.org/assets/guidelines/033-001l_S2k_Koxarthrose_2019-07_1-abgelaufen.pdf
//  - AWMF S3-Leitlinie „Indikationskriterien Hüfttotalendoprothese bei Coxarthrose“ (187-001), 2021
//    https://register.awmf.org/assets/guidelines/187-001l_S3_Indikationskriterien_H%C3%BCfttotalendoprothese_bei_Coxarthrose_2021-04.pdf
//  - NICE NG226 „Osteoarthritis in over 16s: diagnosis and management“, 2022
//    https://www.nice.org.uk/guidance/ng226
//  - Nationale VersorgungsLeitlinie Nicht-spezifischer Kreuzschmerz, 2. Auflage, 2017
//    https://www.leitlinien.de/themen/kreuzschmerz
//  - AWMF S3-Leitlinie „Radiofrequenz-Denervation der Facettengelenke und des ISG“ (151-004), 2024
//    https://register.awmf.org/de/leitlinien/detail/151-004
//  - Koc TA et al. „Heel Pain – Plantar Fasciitis: Revision 2023“, JOSPT 53(12), 2023
//    https://pubmed.ncbi.nlm.nih.gov/38037331/
//  - David JA et al. „Injected corticosteroids for treating plantar heel pain in adults“, Cochrane 2017
//    https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD009348.pub2/information
//  - Rasenberg N et al. „Efficacy of foot orthoses for the treatment of plantar heel pain“, BJSM 2018
//    https://bjsm.bmj.com/content/52/16/1040
//  - G-BA-Beschluss Extrakorporale Stoßwellentherapie beim Fersenschmerz, 2018
//    https://www.g-ba.de/presse/pressemitteilungen-meldungen/743/
//  - Chimenti RL et al. „Midportion Achilles Tendinopathy: Revision 2024“, JOSPT 54(12), 2024
//    https://doi.org/10.2519/jospt.2024.0302
//  - Ying J et al. „Conservative Treatments for Hallux Valgus: Network Meta-Analysis“, IJERPH 2021
//    https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8038851/

import type { Krankheitsbild } from './typen';

export const BEIN: Krankheitsbild[] = [
  {
    id: 'plantarfasziitis',
    name: 'Fersenschmerz',
    zusatz: 'Plantarfasziitis, Fersensporn',
    gebiet: 'fuss',
    suche: 'fersensporn plantarfasziitis fasciitis plantaris plantarfaszie fusssohle ferse anlaufschmerz',
    was: [
      'Unter der Fußsohle spannt sich eine kräftige Sehnenplatte von der Ferse bis zu den Zehen. Sie hält das Fußgewölbe.',
      'Wird sie überlastet, reizt sie sich dort, wo sie an der Ferse ansetzt.',
      'Typisch ist ein stechender Schmerz bei den ersten Schritten am Morgen oder nach dem Sitzen. Nach ein paar Schritten wird es oft besser.',
      'Nach langem Stehen oder Gehen kommt der Schmerz zurück.',
    ],
    modell: {
      region: 'fuss',
      struktur: 'plantarfaszie',
      blick: 'unten',
      saetze: [
        'Sie sehen die Sehnenplatte, die vom Fersenbein fächerförmig zu den Zehen zieht.',
        'Der Schmerz sitzt meist innen unten an der Ferse, genau an ihrem Ansatz.',
      ],
    },
    ursachen: [
      'Meist ist es zu viel Belastung auf einmal: viel Stehen, viel Gehen, mehr Sport, neue oder flache Schuhe.',
      'Eine verkürzte Wade und Übergewicht erhöhen den Zug an der Sehnenplatte.',
      'Der ständige Zug kann am Fersenbein einen kleinen Knochensporn wachsen lassen. Er ist Folge, nicht Ursache – viele Menschen haben einen Sporn ohne jeden Schmerz.',
      'Ein Röntgenbild brauchen wir deshalb meist nicht. Es ändert an der Behandlung nichts.',
    ],
    verlauf: 'Fast immer heilt es ohne Operation aus – oft dauert es aber 6 bis 12 Monate. Geduld und tägliches Dehnen lohnen sich.',
    therapien: [
      {
        name: 'Dehnübungen',
        text: 'Tägliches Dehnen von Fußsohle und Wade ist die wichtigste Behandlung und lindert den Schmerz auf Dauer.',
        evidenz: 'gut',
      },
      {
        name: 'Stoßwellen',
        text: 'Bei Beschwerden über mehr als 6 Monate helfen Stoßwellen vielen; dann zahlt sie die Kasse beim Orthopäden.',
        evidenz: 'gut',
      },
      {
        name: 'Einlagen und Fersenkissen',
        text: 'Weiche Fersenkissen oder einfache Einlagen können entlasten; teure Maßeinlagen sind nicht besser als fertige.',
        evidenz: 'moeglich',
      },
      {
        name: 'Tape und Nachtschiene',
        text: 'Ein Tape stützt für einige Tage, eine Nachtschiene hält die Sehnenplatte nachts gedehnt und mildert den Morgenschmerz.',
        evidenz: 'moeglich',
      },
      {
        name: 'Kortisonspritze',
        text: 'Lindert für einige Wochen, kann aber das Fettpolster der Ferse schwinden lassen oder die Sehnenplatte reißen lassen.',
        evidenz: 'moeglich',
      },
      {
        name: 'Schmerzmittel',
        text: 'Ibuprofen oder eine Schmerzsalbe dürfen für kurze Zeit helfen, heilen aber nichts.',
        evidenz: 'moeglich',
      },
    ],
    uebungen: ['fusssohle-dehnen', 'wade-dehnen-wand', 'fuss-rollen', 'fersen-heben-stufe'],
    alltag: [
      'Gehen Sie nicht barfuß auf hartem Boden. Tragen Sie Schuhe mit gut gedämpfter Ferse – auch zu Hause.',
      'Dehnen Sie die Fußsohle schon im Bett, bevor Sie morgens aufstehen.',
    ],
    warnung:
      'Plötzlicher Knall oder Riss unter der Fußsohle, starke Schwellung oder Bluterguss, Taubheit oder Kribbeln im Fuß, Schmerz auch nachts in Ruhe: bitte bald wiederkommen.',
  },

  {
    id: 'achillessehne',
    name: 'Achillessehnenschmerz',
    zusatz: 'Achillodynie, Achillessehnen-Tendinopathie',
    gebiet: 'fuss',
    suche: 'achillodynie achillessehne tendinopathie tendinitis ferse wade laufen',
    was: [
      'Die Achillessehne verbindet die Wadenmuskeln mit der Ferse. Sie ist die stärkste Sehne des Körpers.',
      'Bei Überlastung wird sie schmerzhaft, oft verdickt und druckempfindlich.',
      'Typisch ist eine Steifigkeit am Morgen und ein Schmerz zu Beginn der Belastung, der sich beim Warmlaufen bessert und danach wiederkommt.',
    ],
    modell: {
      region: 'fuss',
      struktur: 'achillessehne',
      blick: 'seite',
      fokus: ['achillessehne', 'fersenbein'],
      zoom: 1,
      saetze: [
        'Sie sehen die Sehne hinten zwischen Wadenmuskel und Fersenbein.',
        'Meist schmerzt sie zwei bis sechs Zentimeter über der Ferse, seltener direkt am Ansatz am Knochen.',
      ],
    },
    ursachen: [
      'Die Sehne bekommt mehr Last, als sie gewohnt ist – zum Beispiel durch mehr Laufen, Bergauf-Gehen oder Springen.',
      'Das Gewebe der Sehne baut sich dabei um und wird empfindlich. Eine echte Entzündung ist es meist nicht.',
      'Das Risiko steigt mit dem Alter, mit Übergewicht, Diabetes, hohen Blutfetten und bei manchen Antibiotika (Chinolonen).',
    ],
    verlauf: 'Mit regelmäßigem Krafttraining werden die meisten in 3 bis 6 Monaten deutlich besser. Die Sehne braucht Zeit, aber sie lässt sich trainieren.',
    therapien: [
      {
        name: 'Krafttraining für die Wade',
        text: 'Langsames Fersenheben, das sich Woche für Woche steigert, kräftigt die Sehne und ist die wichtigste Behandlung.',
        evidenz: 'gut',
      },
      {
        name: 'Belastung anpassen',
        text: 'Laufen und Springen vorübergehend reduzieren, aber nicht ganz ruhigstellen – leichter Schmerz bis 3 von 10 ist erlaubt.',
        evidenz: 'gut',
      },
      {
        name: 'Fersenkeil',
        text: 'Eine kleine Erhöhung im Schuh entlastet die Sehne vorübergehend, besonders wenn es direkt an der Ferse schmerzt.',
        evidenz: 'moeglich',
      },
      {
        name: 'Stoßwellen',
        text: 'Können zusätzlich zum Training helfen, wenn es nach Monaten nicht besser wird; meist müssen Sie sie selbst bezahlen.',
        evidenz: 'moeglich',
      },
      {
        name: 'Eigenblut-Spritze (PRP)',
        text: 'Hat in guten Studien nicht besser gewirkt als eine Scheinspritze und kostet Geld.',
        evidenz: 'abraten',
      },
      {
        name: 'Kortisonspritze',
        text: 'Wird an der Achillessehne nicht gegeben, weil sie die Sehne schwächt und reißen lassen kann.',
        evidenz: 'abraten',
      },
    ],
    uebungen: ['fersen-heben-stufe', 'wade-dehnen-wand'],
    alltag: [
      'Halten Sie das Training durch, auch wenn es leicht zieht. Wichtig ist, dass der Schmerz am nächsten Morgen nicht stärker ist.',
      'Steigern Sie Laufen oder Sport später nur langsam, etwa um ein Zehntel pro Woche.',
    ],
    warnung:
      'Ein plötzlicher Knall oder Schlag in der Ferse, danach Gehen nur noch mühsam und Zehenspitzenstand auf dem Bein unmöglich: Das kann ein Riss sein – bitte sofort kommen.',
  },

  {
    id: 'hallux-valgus',
    name: 'Ballenzeh',
    zusatz: 'Hallux valgus',
    gebiet: 'fuss',
    suche: 'hallux valgus ballen ballenzeh grosszehe schiefstand frostballen bunion',
    was: [
      'Die große Zehe weicht zu den anderen Zehen hin ab. Dafür tritt das Grundgelenk innen als Ballen hervor.',
      'Am Ballen drückt der Schuh. Die Haut kann sich röten und ein Schleimbeutel kann sich entzünden.',
      'Manchmal schiebt sich die große Zehe unter die zweite. Auch Schmerzen unter dem Vorfuß sind häufig.',
    ],
    modell: {
      region: 'fuss',
      struktur: 'mittelfuss',
      blick: 'oben',
      fokus: ['mittelfuss', 'zehen'],
      zoom: 1,
      saetze: [
        'Sie sehen die fünf Mittelfußknochen von oben.',
        'Beim Ballenzeh weicht der erste Mittelfußknochen nach innen ab, die Großzehe kippt nach außen. Dort, am Kopf des ersten Knochens, entsteht der Ballen.',
      ],
    },
    ursachen: [
      'Die Veranlagung spielt die größte Rolle. Oft haben schon Mutter oder Großmutter einen Ballenzeh.',
      'Frauen sind viel häufiger betroffen. Enge, spitze Schuhe und hohe Absätze verstärken die Fehlstellung.',
      'Ein Spreizfuß, bei dem der Vorfuß breiter wird, begünstigt den Schiefstand.',
    ],
    verlauf: 'Die Fehlstellung bildet sich nicht von selbst zurück. Viele Menschen kommen mit passenden Schuhen aber gut zurecht und brauchen nie eine Operation.',
    therapien: [
      {
        name: 'Weite, weiche Schuhe',
        text: 'Schuhe mit breitem Vorderteil und flachem Absatz nehmen den Druck vom Ballen und lindern den Schmerz.',
        evidenz: 'moeglich',
      },
      {
        name: 'Polster und Zehenspreizer',
        text: 'Ein Ballenpolster oder Zehenspreizer aus Silikon schützt die Haut und kann den Schmerz mildern.',
        evidenz: 'moeglich',
      },
      {
        name: 'Einlagen',
        text: 'Bei Schmerzen unter dem Vorfuß kann eine Einlage mit Pelotte entlasten; den Schiefstand korrigiert sie nicht.',
        evidenz: 'moeglich',
      },
      {
        name: 'Fußübungen',
        text: 'Übungen kräftigen die kleinen Fußmuskeln; ob sie den Schiefstand aufhalten, ist kaum untersucht.',
        evidenz: 'unklar',
      },
      {
        name: 'Nachtschiene',
        text: 'Zieht die Zehe nachts gerade, doch tagsüber kehrt die Fehlstellung zurück; ein dauerhafter Nutzen ist nicht belegt.',
        evidenz: 'unklar',
      },
      {
        name: 'Operation',
        text: 'Wenn trotz passender Schuhe der Schmerz bleibt, richtet eine Operation den Knochen gerade; danach braucht der Fuß etwa 6 Wochen Schonung.',
        evidenz: 'gut',
      },
    ],
    uebungen: ['grosszehe-spreizen', 'zehen-greifen'],
    alltag: [
      'Kaufen Sie Schuhe am Nachmittag, wenn der Fuß etwas dicker ist, und achten Sie auf Platz für die Zehen.',
      'Gehen Sie zu Hause öfter barfuß – das trainiert die Fußmuskeln.',
    ],
    warnung:
      'Ein plötzlich heißes, rotes, stark schmerzendes Großzehengelenk kann ein Gichtanfall oder eine Entzündung sein: bitte bald kommen. Bei Diabetes jede offene Stelle am Ballen sofort zeigen.',
  },

  {
    id: 'gonarthrose',
    name: 'Kniearthrose',
    zusatz: 'Gonarthrose',
    gebiet: 'knie-huefte',
    suche: 'gonarthrose arthrose knie kniegelenk verschleiss knorpel knieschmerz',
    was: [
      'Oberschenkel und Schienbein sind im Knie mit glattem Knorpel überzogen. Er federt ab und lässt das Gelenk gleiten.',
      'Bei Arthrose wird dieser Knorpel dünner und rauer. Der Knochen darunter reagiert, das Gelenk wird enger.',
      'Typisch sind Schmerzen beim Loslaufen, beim Treppensteigen und nach längerem Gehen. Das Knie ist morgens steif und kann anschwellen.',
    ],
    modell: {
      region: 'knie',
      struktur: 'innenmeniskus',
      blick: 'vorn',
      fokus: ['innenmeniskus', 'aussenmeniskus'],
      zoom: 0.9,
      saetze: [
        'Sie sehen das Knie von vorn. Der Knorpelbelag liegt hell auf dem Ende des Oberschenkels und auf dem Schienbein, dazwischen die Menisken als Puffer.',
        'Meist verschleißt zuerst die Innenseite, wo der Innenmeniskus liegt. Dort sitzt dann auch der Schmerz.',
      ],
    },
    ursachen: [
      'Arthrose entwickelt sich über viele Jahre. Alter und Veranlagung spielen die größte Rolle.',
      'Übergewicht belastet das Knie bei jedem Schritt mehrfach und fördert die Reizung im Gelenk.',
      'Auch alte Verletzungen an Meniskus oder Kreuzband und O-Beine erhöhen das Risiko.',
      'Das Röntgenbild sagt wenig darüber, wie stark die Beschwerden sind.',
    ],
    verlauf: 'Arthrose verläuft in Schüben, und viele Menschen haben über Jahre gute Phasen. Wer sich regelmäßig bewegt, hat weniger Schmerzen und bleibt beweglich.',
    therapien: [
      {
        name: 'Bewegung und Krafttraining',
        text: 'Gezielte Übungen für die Oberschenkelmuskeln lindern den Schmerz so gut wie Tabletten – anfangs kann es etwas mehr wehtun, das ist erlaubt.',
        evidenz: 'gut',
      },
      {
        name: 'Abnehmen bei Übergewicht',
        text: 'Jedes Kilo weniger entlastet das Knie spürbar und bremst den Verschleiß.',
        evidenz: 'gut',
      },
      {
        name: 'Schmerzmittel',
        text: 'Am besten als Salbe mit Diclofenac oder Ibuprofen; Tabletten nur kurz in schlechten Phasen, denn sie belasten Magen, Niere und Herz.',
        evidenz: 'gut',
      },
      {
        name: 'Kortisonspritze',
        text: 'Beruhigt ein gereiztes, geschwollenes Knie für 2 bis 10 Wochen; nicht zu oft wiederholen.',
        evidenz: 'moeglich',
      },
      {
        name: 'Hyaluronspritze',
        text: 'Nützt in Studien kaum mehr als eine Scheinspritze und muss selbst bezahlt werden.',
        evidenz: 'abraten',
      },
      {
        name: 'Gelenkspiegelung',
        text: 'Ein Ausspülen oder Glätten des Knorpels hilft bei Arthrose nicht besser als Übungen.',
        evidenz: 'abraten',
      },
      {
        name: 'Künstliches Kniegelenk',
        text: 'Wenn Schmerz und Einschränkung trotz allem nicht mehr erträglich sind, bringt ein neues Gelenk den meisten deutlich weniger Schmerz.',
        evidenz: 'gut',
      },
    ],
    uebungen: ['quadrizeps-anspannen', 'bein-strecken-sitz', 'aufstehen-stuhl', 'bruecke'],
    alltag: [
      'Bewegen Sie das Knie viel, aber ohne Stöße: Radfahren, Schwimmen, Gehen auf ebenem Weg.',
      'Bei einem dicken, warmen Knie hilft Kühlen, bei einem steifen Knie Wärme.',
    ],
    warnung:
      'Ein plötzlich heißes, rotes, stark geschwollenes Knie mit Fieber – besonders nach einer Spritze – ist ein Notfall: bitte sofort kommen. Auch eine pralle, schmerzhafte Wade gehört sofort untersucht.',
  },

  {
    id: 'coxarthrose',
    name: 'Hüftarthrose',
    zusatz: 'Coxarthrose',
    gebiet: 'knie-huefte',
    suche: 'coxarthrose koxarthrose arthrose hüfte hueftgelenk leistenschmerz verschleiss hueftkopf',
    was: [
      'Das Hüftgelenk ist ein Kugelgelenk: Der runde Hüftkopf dreht sich in der Pfanne des Beckens. Beide sind mit glattem Knorpel überzogen.',
      'Bei Arthrose wird der Knorpel dünner, das Gelenk wird enger und steifer.',
      'Der Schmerz sitzt meist in der Leiste und kann ins Knie ziehen. Typisch sind Anlaufschmerz und Mühe beim Schuhe- oder Strümpfeanziehen.',
    ],
    modell: {
      region: 'huefte',
      struktur: 'oberschenkel',
      blick: 'vorn',
      fokus: ['gelenkkapsel', 'gelenklippe'],
      zoom: 0.9,
      saetze: [
        'Sie sehen den Oberschenkelknochen mit seinem kugeligen Kopf, der in der Pfanne des Beckens sitzt.',
        'Zwischen Kopf und Pfanne liegt der Knorpel, der bei Arthrose schwindet. Gespürt wird das vor allem in der Leiste.',
      ],
    },
    ursachen: [
      'Arthrose entwickelt sich über viele Jahre. Alter und Veranlagung spielen die größte Rolle.',
      'Passen Hüftkopf und Pfanne von Geburt an nicht genau zueinander, verschleißt der Knorpel früher.',
      'Auch frühere Verletzungen, Übergewicht und schwere körperliche Arbeit begünstigen sie.',
      'Das Röntgenbild sagt wenig darüber, wie stark die Beschwerden sind.',
    ],
    verlauf: 'Viele Menschen kommen mit Bewegung und Übungen über Jahre gut zurecht. Wird es zu schlimm, hilft ein künstliches Hüftgelenk sehr zuverlässig.',
    therapien: [
      {
        name: 'Bewegung und Krafttraining',
        text: 'Übungen für Gesäß und Hüfte lindern den Schmerz und halten das Gelenk beweglich – das ist die wichtigste Behandlung.',
        evidenz: 'gut',
      },
      {
        name: 'Schmerztabletten',
        text: 'Ibuprofen oder Naproxen helfen in schlechten Phasen, aber nur kurz, weil sie Magen, Niere und Herz belasten.',
        evidenz: 'gut',
      },
      {
        name: 'Abnehmen bei Übergewicht',
        text: 'Weniger Gewicht entlastet die Hüfte; der Nutzen ist hier etwas kleiner als am Knie.',
        evidenz: 'moeglich',
      },
      {
        name: 'Gehstock',
        text: 'In der Hand auf der gesunden Seite entlastet er die kranke Hüfte spürbar.',
        evidenz: 'moeglich',
      },
      {
        name: 'Kortisonspritze',
        text: 'Kann die Hüfte für einige Wochen beruhigen; sie wird unter Ultraschall- oder Röntgensicht gesetzt.',
        evidenz: 'moeglich',
      },
      {
        name: 'Hyaluronspritze',
        text: 'Hat an der Hüfte keinen sicheren Nutzen gezeigt und muss selbst bezahlt werden.',
        evidenz: 'abraten',
      },
      {
        name: 'Künstliches Hüftgelenk',
        text: 'Bei starken Schmerzen trotz allem gehört es zu den erfolgreichsten Operationen überhaupt; die meisten gehen danach fast schmerzfrei.',
        evidenz: 'gut',
      },
    ],
    uebungen: ['seitlage-abspreizen', 'bruecke', 'hueftbeuger-dehnen', 'aufstehen-stuhl'],
    alltag: [
      'Radfahren und Schwimmen schonen die Hüfte und halten sie beweglich.',
      'Ein erhöhter Sitz und ein Strumpfanzieher erleichtern den Alltag, wenn das Beugen schwerfällt.',
    ],
    warnung:
      'Plötzliche starke Hüftschmerzen nach einem Sturz, wenn das Bein nicht mehr belastet werden kann: sofort kommen. Ebenso bei Fieber und heißer, schmerzhafter Hüfte oder bei neuen Schmerzen nachts in Ruhe.',
  },

  {
    id: 'isg-syndrom',
    name: 'Schmerz am Kreuz-Darmbein-Gelenk',
    zusatz: 'ISG-Syndrom, ISG-Blockade',
    gebiet: 'ruecken',
    suche: 'isg iliosakralgelenk isg-blockade isg-syndrom kreuzdarmbeingelenk kreuzschmerz gesäß ischias',
    was: [
      'Das Kreuz-Darmbein-Gelenk verbindet das Kreuzbein mit der Beckenschaufel – rechts und links je eines.',
      'Ist es gereizt, schmerzt es tief im Kreuz, meist auf einer Seite. Der Schmerz kann ins Gesäß und in die Leiste ziehen, selten bis zum Knie.',
      'Typisch ist Schmerz beim Aufstehen aus dem Sitzen, beim Treppensteigen oder beim Liegen auf der betroffenen Seite.',
    ],
    modell: {
      region: 'becken',
      struktur: 'isg',
      saetze: [
        'Sie sehen das Becken von hinten. Die Gelenke liegen links und rechts zwischen Kreuzbein und Beckenschaufel.',
        'Man spürt die Stelle über den beiden Grübchen oberhalb des Gesäßes.',
      ],
    },
    ursachen: [
      'Das Gelenk bewegt sich nur wenige Millimeter. Von einer „Blockade“ spricht man, wenn es gereizt ist und die Muskeln drumherum verspannen.',
      'Auslöser sind oft eine ungewohnte Bewegung, ein Fehltritt, einseitige Belastung oder langes Sitzen.',
      'In der Schwangerschaft und danach lockern sich die Bänder, deshalb trifft es dann viele Frauen.',
      'Gefährlich ist es fast nie. Röntgen oder MRT brauchen wir nur bei Warnzeichen.',
    ],
    verlauf: 'Meist wird es innerhalb weniger Tage bis Wochen deutlich besser. Wer in Bewegung bleibt, erholt sich schneller.',
    therapien: [
      {
        name: 'In Bewegung bleiben',
        text: 'Gehen und den Alltag weiterführen, so gut es geht, ist das Wichtigste – Bewegung lockert das Gelenk.',
        evidenz: 'gut',
      },
      {
        name: 'Übungen und Krankengymnastik',
        text: 'Dehnen und Kräftigen von Gesäß, Rumpf und Becken helfen, besonders wenn der Schmerz länger anhält oder wiederkommt.',
        evidenz: 'gut',
      },
      {
        name: 'Wärme',
        text: 'Eine Wärmflasche oder ein Wärmepflaster lockert die Muskeln und lindert den Schmerz.',
        evidenz: 'moeglich',
      },
      {
        name: 'Einrenken und Mobilisieren',
        text: 'Kann kurzfristig erleichtern, vor allem zusammen mit Übungen; es „springt“ dabei nichts wirklich zurück.',
        evidenz: 'moeglich',
      },
      {
        name: 'Schmerzmittel',
        text: 'Ibuprofen oder Naproxen dürfen für einige Tage helfen, damit Sie sich bewegen können.',
        evidenz: 'moeglich',
      },
      {
        name: 'Spritzen ins Gelenk, Verödung',
        text: 'Nur für wenige Menschen mit lange anhaltenden Schmerzen; der Nutzen ist umstritten.',
        evidenz: 'unklar',
      },
      {
        name: 'Bettruhe',
        text: 'Liegen verlängert die Beschwerden und schwächt die Muskeln.',
        evidenz: 'abraten',
      },
    ],
    uebungen: ['knie-zur-brust', 'piriformis-dehnen', 'becken-kippen', 'bruecke'],
    alltag: [
      'Stehen Sie beim Sitzen alle halbe Stunde kurz auf und gehen Sie ein paar Schritte.',
      'Beim Liegen auf der Seite entlastet ein Kissen zwischen den Knien das Becken.',
    ],
    warnung:
      'Taubheit am Gesäß oder im Schritt, Probleme beim Wasserlassen oder Stuhlgang, Lähmung im Bein: sofort ärztliche Hilfe. Bei Fieber, nach einem Unfall oder bei nächtlichem Kreuzschmerz mit langer Morgensteifigkeit bitte bald kommen.',
  },
];
