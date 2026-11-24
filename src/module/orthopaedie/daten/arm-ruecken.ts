// Krankheitsbilder Schulter, Ellenbogen, Hand, Rücken und Nacken.
//
// Quellen für die Einstufung auf der Seite „Was hilft?“ (Stand der Recherche: November 2026):
// - AWMF S2e-Leitlinie Subakromiales Impingement, Reg.-Nr. 033-056, 2021
//   https://register.awmf.org/de/leitlinien/detail/033-056
// - AWMF S2e-Leitlinie Rotatorenmanschette, Reg.-Nr. 033-041, 2017 (abgelaufen, in Überarbeitung)
//   https://register.awmf.org/assets/guidelines/033-041l_S2e_Rotatorenmanschette_2017-04_01-abgelaufen_01.pdf
// - Beard et al.: Arthroscopic subacromial decompression (CSAW), Lancet 2018
//   https://doi.org/10.1016/S0140-6736(17)32457-1
// - Paavola et al.: Subacromial decompression vs diagnostic arthroscopy (FIMPACT), BMJ 2018
//   https://doi.org/10.1136/bmj.k2860
// - Vandvik et al.: Subacromial decompression surgery for adults with shoulder pain, BMJ Rapid Recommendation 2019
//   https://doi.org/10.1136/bmj.l294
// - Rangan et al.: Management of frozen shoulder (UK FROST), Lancet 2020
//   https://doi.org/10.1016/S0140-6736(20)31965-6
// - Poku et al.: Efficacy of hydrodilatation in frozen shoulder, Br Med Bull 2023
//   https://pubmed.ncbi.nlm.nih.gov/37496207/
// - AWMF S2k-Leitlinie Epicondylopathia radialis humeri, Reg.-Nr. 033-019, 2019
//   https://register.awmf.org/assets/guidelines/033-019l_S2k_Epicondylopathia_radialis_humeri_2019-09_01.pdf
// - Coombes et al.: Corticosteroid injection and physiotherapy for lateral epicondylalgia, JAMA 2013
//   https://doi.org/10.1001/jama.2013.708
// - Kroslak & Murrell: Surgical treatment of lateral epicondylitis – placebo-controlled trial, Am J Sports Med 2018
//   https://doi.org/10.1177/0363546517753385
// - EULAR recommendations for the management of hand osteoarthritis, 2018 update
//   https://doi.org/10.1136/annrheumdis-2018-213826
// - NICE NG226 Osteoarthritis in over 16s: diagnosis and management, 2022
//   https://www.nice.org.uk/guidance/ng226
// - Karanasios et al.: Exercise-based interventions in thumb CMC osteoarthritis, Healthcare 2024
//   https://www.ncbi.nlm.nih.gov/pmc/articles/PMC11049805/
// - AWMF S3-Leitlinie Diagnostik und Therapie des Karpaltunnelsyndroms, Reg.-Nr. 005-003, 2022
//   https://register.awmf.org/de/leitlinien/detail/005-003
// - IQWiG gesundheitsinformation.de: Karpaltunnelsyndrom – Handgelenksschienen und Bewegung, 2023
//   https://www.gesundheitsinformation.de/handgelenksschienen-und-bewegung.html
// - Nationale VersorgungsLeitlinie Nicht-spezifischer Kreuzschmerz, 2. Auflage, 2017 (nvl-007)
//   https://www.leitlinien.de/themen/kreuzschmerz
// - AWMF S2k-Leitlinie Lumbale Radikulopathie (DGN), Reg.-Nr. 030-058, 2018
//   https://register.awmf.org/de/leitlinien/detail/030-058
// - AWMF S2k-Leitlinie Spezifischer Kreuzschmerz (DGOU), Reg.-Nr. 187-059, 2024
//   https://register.awmf.org/assets/guidelines/187-059l_S2k_Spezifischer-Kreuzschmerz_2024-08.pdf
// - NICE NG59 Low back pain and sciatica in over 16s, 2016 (aktualisiert 2020)
//   https://www.nice.org.uk/guidance/ng59
// - Mathieson et al.: Trial of pregabalin for acute and chronic sciatica, NEJM 2017
//   https://doi.org/10.1056/NEJMoa1614292
// - Zaina et al.: Surgical versus non-surgical treatment for lumbar spinal stenosis, Cochrane 2016
//   https://doi.org/10.1002/14651858.CD010264.pub2
// - Friedly et al.: Epidural glucocorticoid injections for spinal stenosis, NEJM 2014
//   https://doi.org/10.1056/NEJMoa1313265
// - Delitto et al.: Surgery versus nonsurgical treatment of lumbar spinal stenosis, Ann Intern Med 2015
//   https://doi.org/10.7326/M14-1420
// - DEGAM S3-Leitlinie Nackenschmerzen, Reg.-Nr. 053-007, 2025
//   https://register.awmf.org/assets/guidelines/053-007l_S3_Nackenschmerzen_2025-08.pdf

import type { Krankheitsbild } from './typen';

export const ARM_RUECKEN: Krankheitsbild[] = [
  // ───────────────────────────── Schulter und Ellenbogen ─────────────────────────────
  {
    id: 'rotatorenmanschette',
    name: 'Schulterschmerz beim Armheben',
    zusatz: 'Impingement, Rotatorenmanschette',
    gebiet: 'schulter-arm',
    suche:
      'impingement engpass schulter rotatorenmanschette supraspinatus schleimbeutel bursitis subakromial saps kalkschulter tendinitis calcarea sehnenriss',
    was: [
      'Der Schmerz sitzt außen an der Schulter und zieht oft in den Oberarm.',
      'Typisch ist er, wenn Sie den Arm seitlich anheben oder über Kopf arbeiten. Dazwischen gibt es oft einen besonders schmerzhaften Bereich.',
      'Viele können nachts nicht auf der kranken Seite liegen.',
      'Die Schulter lässt sich aber meist noch gut bewegen, wenn jemand anders den Arm führt.',
    ],
    modell: {
      region: 'schulter',
      struktur: 'supraspinatus',
      saetze: [
        'Die leuchtende Sehne zieht oben über den Oberarmkopf, direkt unter dem knöchernen Schulterdach.',
        'Zwischen Sehne und Schulterdach liegt ein Schleimbeutel, der wie ein Gleitkissen wirkt.',
        'Sind Sehne oder Schleimbeutel gereizt, wird es dort beim Armheben eng und schmerzhaft.',
      ],
    },
    ursachen: [
      'Die Sehnen der Schulter tragen viel Last und werden mit dem Alter weniger belastbar.',
      'Häufige Arbeit über Kopf oder ein plötzliches Mehr an Training kann sie überlasten.',
      'Manchmal lagert sich Kalk in der Sehne ab. Das kann sehr heftig wehtun, löst sich aber oft von selbst wieder auf.',
      'Kleine Risse in der Sehne haben ab 50 Jahren viele Menschen ohne Beschwerden. Ein Bild allein erklärt den Schmerz deshalb nicht.',
    ],
    verlauf:
      'Mit gezielten Übungen bessert sich der Schmerz bei den meisten innerhalb von drei bis sechs Monaten deutlich.',
    therapien: [
      {
        name: 'Gezielte Übungen',
        text: 'Kräftigungsübungen für Schulter und Schulterblatt, zu Hause oder mit Krankengymnastik, sind die wichtigste Behandlung.',
        evidenz: 'gut',
      },
      {
        name: 'Schmerzmittel für kurze Zeit',
        text: 'Ibuprofen oder ähnliche Mittel für einige Tage lindern den Schmerz, damit Sie üben und schlafen können.',
        evidenz: 'moeglich',
      },
      {
        name: 'Kortisonspritze',
        text: 'Eine Spritze unter das Schulterdach lindert den Schmerz für einige Wochen, heilt die Sehne aber nicht.',
        evidenz: 'moeglich',
      },
      {
        name: 'Stoßwellen bei Kalkschulter',
        text: 'Bei Kalk in der Sehne können Stoßwellen den Schmerz lindern; meist müssen Sie sie selbst bezahlen.',
        evidenz: 'moeglich',
      },
      {
        name: 'Akupunktur',
        text: 'Einzelne Studien zeigen einen kleinen Nutzen, die Ergebnisse sind aber uneinheitlich.',
        evidenz: 'unklar',
      },
      {
        name: 'OP zur Erweiterung',
        text: 'Das Abtragen von Knochen am Schulterdach hilft in Studien nicht besser als eine Schein-OP oder Übungen.',
        evidenz: 'abraten',
      },
    ],
    uebungen: ['pendeln', 'aussendrehen-band', 'schulterblaetter-zusammen'],
    alltag: [
      'Arbeiten Sie möglichst unterhalb der Schulterhöhe und holen Sie Dinge mit einer Leiter statt mit gestrecktem Arm.',
      'Ganz schonen sollten Sie die Schulter nicht: Bewegung im schmerzarmen Bereich ist ausdrücklich erlaubt.',
    ],
    warnung:
      'Können Sie nach einem Sturz oder Ruck den Arm plötzlich nicht mehr heben, kommen Sie bitte innerhalb weniger Tage – ein frischer Sehnenriss wird früh besser versorgt. Bei Fieber mit roter, heißer Schulter sofort.',
  },
  {
    id: 'frozen-shoulder',
    name: 'Schultersteife',
    zusatz: 'Frozen Shoulder, Schultersteife',
    gebiet: 'schulter-arm',
    suche: 'frozen shoulder schultersteife kapsulitis adhaesiva capsulitis eingefrorene schulter',
    was: [
      'Die Schulter wird ohne erkennbaren Grund schmerzhaft und dann zunehmend steif.',
      'Anfangs stehen starke Schmerzen im Vordergrund, auch nachts in Ruhe.',
      'Später lässt der Schmerz nach, aber der Arm lässt sich kaum noch nach außen drehen oder anheben – auch nicht, wenn jemand anders hilft.',
      'Am Ende taut die Schulter langsam wieder auf und wird wieder beweglicher.',
    ],
    modell: {
      region: 'schulter',
      struktur: 'gelenkkapsel',
      saetze: [
        'Die leuchtende Hülle ist die Gelenkkapsel. Sie umschließt den Oberarmkopf wie ein weiter Sack.',
        'Bei der Schultersteife entzündet sich die Kapsel, verdickt und schrumpft.',
        'Dadurch wird das Gelenk eng, und jede Bewegung bis an die Grenze tut weh.',
      ],
    },
    ursachen: [
      'Warum sich die Kapsel entzündet, ist meist unklar.',
      'Am häufigsten trifft es Menschen zwischen 40 und 60 Jahren, Frauen etwas öfter.',
      'Diabetes und Schilddrüsenerkrankungen erhöhen das Risiko deutlich.',
      'Manchmal beginnt es nach einer Verletzung oder wenn die Schulter längere Zeit ruhiggestellt war.',
    ],
    verlauf:
      'Die Schultersteife heilt fast immer von selbst aus, braucht aber Geduld: meist ein bis zwei, manchmal drei Jahre.',
    therapien: [
      {
        name: 'Kortisonspritze ins Gelenk',
        text: 'Früh gegeben lindert sie den Schmerz über Wochen bis wenige Monate und erleichtert die Bewegung.',
        evidenz: 'gut',
      },
      {
        name: 'Krankengymnastik und Übungen',
        text: 'Sanfte Übungen im schmerzarmen Bereich erhalten die Beweglichkeit, am besten zusammen mit der Spritze.',
        evidenz: 'moeglich',
      },
      {
        name: 'Schmerzmittel',
        text: 'Ibuprofen oder ähnliche Mittel helfen in der schmerzhaften Phase, vor allem zum Schlafen.',
        evidenz: 'moeglich',
      },
      {
        name: 'Gelenkaufdehnung mit Flüssigkeit',
        text: 'Dabei wird die Kapsel mit Kochsalz und Kortison aufgedehnt; das kann kurzfristig mehr bringen als die Spritze allein.',
        evidenz: 'moeglich',
      },
      {
        name: 'Narkose-Mobilisation oder OP',
        text: 'Für sehr hartnäckige Fälle; in einer großen Studie nicht besser als Krankengymnastik mit Spritze, aber mit mehr Risiken.',
        evidenz: 'unklar',
      },
      {
        name: 'Kräftiges Dehnen gegen den Schmerz',
        text: 'Gewaltsames Dehnen reizt die entzündete Kapsel und verlängert die schmerzhafte Phase eher.',
        evidenz: 'abraten',
      },
    ],
    uebungen: ['pendeln', 'wand-hochwandern', 'aussendrehen-band'],
    alltag: [
      'Üben Sie täglich, aber nur bis zu einem leichten Ziehen – Schmerz ist hier kein Zeichen für Fortschritt.',
      'Ein Kissen unter dem Arm hilft vielen, nachts besser zu liegen.',
    ],
    warnung:
      'Bei Fieber, einer roten, heißen Schulter oder Schmerzen nach einem Sturz kommen Sie bitte sofort. Strahlt der Schmerz mit Atemnot oder Druck in der Brust in Schulter oder Arm, rufen Sie die 112.',
  },
  {
    id: 'tennisellenbogen',
    name: 'Tennisellenbogen',
    zusatz: 'Epicondylitis humeri radialis',
    gebiet: 'schulter-arm',
    suche: 'tennisarm tennisellenbogen epicondylitis epikondylitis lateralis epicondylopathie mausarm ellenbogen aussen',
    was: [
      'Der Schmerz sitzt außen am Ellenbogen, an einem kleinen Knochenvorsprung.',
      'Er tritt auf, wenn Sie greifen, heben oder das Handgelenk anspannen – zum Beispiel beim Händeschütteln, Tragen einer Tasse oder Auswringen.',
      'Oft strahlt er in den Unterarm aus, und die Griffkraft lässt nach.',
      'Mit Tennis hat es meist nichts zu tun: Die meisten Betroffenen spielen gar kein Tennis.',
    ],
    modell: {
      region: 'ellenbogen',
      struktur: 'strecker',
      saetze: [
        'Die leuchtenden Muskeln strecken Hand und Finger. Sie entspringen gemeinsam außen am Ellenbogen.',
        'Genau an diesem Ursprung ist die Sehne überlastet – dort tut es weh, wenn man drückt.',
      ],
    },
    ursachen: [
      'Die Sehne der Streckmuskeln wird durch viele gleichförmige Griff- und Drehbewegungen überlastet.',
      'Typisch sind Arbeit mit Werkzeug, viel Maus und Tastatur, Gartenarbeit oder Umzüge.',
      'Am häufigsten trifft es Menschen zwischen 35 und 55 Jahren.',
      'Die Sehne ist dabei weniger entzündet als vielmehr in ihrem Aufbau gestört. Sie braucht Zeit und dosierte Belastung, um sich zu erholen.',
    ],
    verlauf:
      'Bei etwa neun von zehn Menschen klingt der Tennisellenbogen innerhalb eines Jahres von selbst ab.',
    therapien: [
      {
        name: 'Belastung anpassen',
        text: 'Auslösende Tätigkeiten reduzieren, ohne den Arm ganz zu schonen – das ist die Grundlage jeder Behandlung.',
        evidenz: 'gut',
      },
      {
        name: 'Kräftigungsübungen',
        text: 'Langsames Kräftigen der Streckmuskeln, zu Hause oder mit Krankengymnastik, kann die Erholung unterstützen.',
        evidenz: 'moeglich',
      },
      {
        name: 'Schmerzgel',
        text: 'Ein Gel mit Diclofenac oder Ibuprofen lindert den Schmerz für einige Wochen, mit wenig Nebenwirkungen.',
        evidenz: 'moeglich',
      },
      {
        name: 'Spange oder Bandage',
        text: 'Eine Spange am Unterarm entlastet manche bei der Arbeit; gut untersucht ist das nicht.',
        evidenz: 'unklar',
      },
      {
        name: 'Stoßwellen, Eigenblut, PRP',
        text: 'Diese meist selbst zu zahlenden Verfahren sind in Studien nicht klar besser als Abwarten.',
        evidenz: 'unklar',
      },
      {
        name: 'Kortisonspritze',
        text: 'Sie hilft nur wenige Wochen; nach einem Jahr geht es den Gespritzten im Schnitt schlechter, Rückfälle sind häufiger.',
        evidenz: 'abraten',
      },
      {
        name: 'Operation',
        text: 'Nur in seltenen Ausnahmen; in einer Studie war die OP nicht besser als ein Scheineingriff.',
        evidenz: 'abraten',
      },
    ],
    uebungen: ['handgelenk-absenken', 'unterarm-dehnen'],
    alltag: [
      'Greifen Sie Dinge mit der Handfläche nach oben, wie beim Tragen eines Tabletts – das schont die Sehne.',
      'Machen Sie bei Arbeit am Computer oder mit Werkzeug regelmäßig kurze Pausen.',
    ],
    warnung:
      'Ist der Ellenbogen nach einem Sturz geschwollen oder lässt er sich nicht mehr strecken, kommen Sie bitte sofort. Bei Fieber, Rötung und Überwärmung ebenfalls.',
  },

  // ───────────────────────────── Hand ─────────────────────────────
  {
    id: 'rhizarthrose',
    name: 'Daumensattelgelenk-Arthrose',
    zusatz: 'Rhizarthrose',
    gebiet: 'hand',
    suche: 'rhizarthrose daumensattelgelenk daumenarthrose fingerarthrose handarthrose daumen',
    was: [
      'Der Schmerz sitzt an der Daumenwurzel, dort wo der Daumen in das Handgelenk übergeht.',
      'Er tritt beim kräftigen Greifen auf: Glas aufdrehen, Schlüssel drehen, Wäsche auswringen, einen Knopf schließen.',
      'Mit der Zeit kann das Gelenk anschwellen und sich eine kleine Stufe an der Daumenwurzel bilden.',
      'Die Kraft im Spitzgriff lässt nach, und Dinge fallen leichter aus der Hand.',
    ],
    modell: {
      region: 'hand',
      struktur: 'vieleckbein',
      fokus: ['vieleckbein', 'mittelhand', 'kahnbein'],
      zoom: 1,
      saetze: [
        'Das leuchtende Knöchelchen in der Handwurzel bildet mit dem ersten Mittelhandknochen das Daumensattelgelenk.',
        'Es ist wie ein Reitsattel geformt und macht den Daumen so beweglich.',
        'Bei der Arthrose wird der Knorpel dort dünn, und das Gelenk wird locker und schmerzhaft.',
      ],
    },
    ursachen: [
      'Die Arthrose am Daumen ist sehr häufig, vor allem bei Frauen nach den Wechseljahren.',
      'Veranlagung spielt eine große Rolle – oft haben auch Mutter oder Großmutter krumme Finger.',
      'Das Gelenk trägt bei jedem Griff viel Kraft. Lockere Bänder oder frühere Verletzungen beschleunigen den Verschleiß.',
      'Wie stark es wehtut, passt oft nicht zum Röntgenbild.',
    ],
    verlauf:
      'Die Beschwerden kommen und gehen in Schüben; bei vielen werden sie mit den Jahren ruhiger, auch wenn das Gelenk steifer wird.',
    therapien: [
      {
        name: 'Daumenorthese',
        text: 'Eine Schiene für die Daumenwurzel, vor allem nachts oder bei schwerer Arbeit, lindert bei vielen den Schmerz über Monate.',
        evidenz: 'gut',
      },
      {
        name: 'Übungen und Gelenkschutz',
        text: 'Übungen für die Daumenmuskeln und Hilfen im Alltag, oft mit Ergotherapie, verbessern Schmerz und Griff etwas.',
        evidenz: 'moeglich',
      },
      {
        name: 'Schmerzgel',
        text: 'Ein Gel mit Diclofenac oder Ibuprofen ist an der Hand gut verträglich und hilft vielen in Schmerzphasen.',
        evidenz: 'moeglich',
      },
      {
        name: 'Schmerzmittel als Tablette',
        text: 'Ibuprofen oder ähnliche Mittel nur für kurze Zeit, wenn Gel und Schiene nicht reichen.',
        evidenz: 'moeglich',
      },
      {
        name: 'Operation',
        text: 'Bei starken Schmerzen trotz allem wird das kleine Vieleckbein entfernt; die meisten sind danach deutlich schmerzärmer.',
        evidenz: 'moeglich',
      },
      {
        name: 'Kortisonspritze',
        text: 'Sie kann kurz lindern, war in Studien aber nicht klar besser als eine Scheinspritze.',
        evidenz: 'unklar',
      },
      {
        name: 'Hyaluronspritze',
        text: 'Diese meist selbst zu zahlende Spritze bringt nach heutigem Wissen keinen echten Vorteil.',
        evidenz: 'abraten',
      },
    ],
    uebungen: ['daumen-o-form', 'daumen-oeffnen'],
    alltag: [
      'Nutzen Sie Hilfen mit dickem Griff: Glasöffner, Schlüsselhilfe, dickere Stifte und Besteck.',
      'Wärme, etwa ein Handbad, lockert steife Finger am Morgen.',
    ],
    warnung:
      'Ist das Gelenk plötzlich rot, heiß und stark geschwollen, oder haben Sie nach einem Sturz starke Schmerzen am Daumen, kommen Sie bitte zeitnah.',
  },
  {
    id: 'karpaltunnel',
    name: 'Karpaltunnelsyndrom',
    zusatz: 'eingeengter Mittelnerv',
    gebiet: 'hand',
    suche: 'karpaltunnel karpaltunnelsyndrom kts cts medianus mittelnerv eingeschlafene finger kribbeln hand nachts',
    was: [
      'Daumen, Zeige- und Mittelfinger kribbeln oder schlafen ein – typischerweise nachts oder früh am Morgen.',
      'Viele wachen davon auf und schütteln die Hand aus, bis es besser wird.',
      'Tagsüber tritt es beim Halten von Handy, Zeitung oder Lenkrad auf.',
      'Später können die Finger dauerhaft taub sein und das Greifen ungeschickt werden.',
    ],
    modell: {
      region: 'hand',
      struktur: 'mittelnerv',
      saetze: [
        'Der leuchtende Nerv versorgt Daumen, Zeige- und Mittelfinger mit Gefühl.',
        'Am Handgelenk läuft er durch einen engen Kanal aus Handwurzelknochen, darüber spannt sich ein festes Band wie ein Dach.',
        'Wird es in diesem Tunnel zu eng, drückt es auf den Nerv.',
      ],
    },
    ursachen: [
      'Oft ist der Tunnel von Natur aus eng, und die Sehnen darin schwellen etwas an.',
      'Häufiger betroffen sind Frauen, Schwangere und Menschen mit Diabetes, Übergewicht, Schilddrüsenunterfunktion oder Rheuma.',
      'Viel Arbeit mit gebeugtem Handgelenk oder vibrierenden Werkzeugen kann es verstärken.',
      'Eine Messung der Nervenleitung beim Neurologen zeigt, wie stark der Nerv schon betroffen ist.',
    ],
    verlauf:
      'Leichte Beschwerden bessern sich oft mit einer Nachtschiene; ist der Nerv stark eingeengt, hilft die kleine Operation sehr zuverlässig.',
    therapien: [
      {
        name: 'Schiene in der Nacht',
        text: 'Sie hält das Handgelenk gerade und entlastet den Nerv; bei leichten Beschwerden ist das der erste Schritt.',
        evidenz: 'gut',
      },
      {
        name: 'Kortisonspritze',
        text: 'Eine Spritze in den Tunnel lindert die Beschwerden meist für einige Wochen bis Monate.',
        evidenz: 'gut',
      },
      {
        name: 'Operation',
        text: 'Das Band über dem Tunnel wird durchtrennt – ein kurzer, ambulanter Eingriff, der auf Dauer am sichersten hilft.',
        evidenz: 'gut',
      },
      {
        name: 'Gleitübungen',
        text: 'Übungen für Sehnen und Nerv schaden nicht und tun manchen gut; der Nutzen ist kaum untersucht.',
        evidenz: 'unklar',
      },
      {
        name: 'Ultraschall, Laser, Magnetfeld',
        text: 'Diese Geräte-Behandlungen haben keinen sicheren Nutzen gezeigt.',
        evidenz: 'unklar',
      },
      {
        name: 'Tabletten und Vitamin B6',
        text: 'Schmerzmittel, Entwässerungstabletten und Vitamine helfen dem eingeengten Nerv nicht.',
        evidenz: 'abraten',
      },
    ],
    uebungen: ['sehnengleiten', 'nervengleiten'],
    alltag: [
      'Vermeiden Sie es, das Handgelenk lange stark zu beugen – auch beim Schlafen nicht unter das Kissen legen.',
      'Machen Sie bei Handarbeit, Computer oder Werkzeug regelmäßig Pausen und schütteln Sie die Hände locker aus.',
    ],
    warnung:
      'Wird der Daumenballen schmaler, ist ein Finger dauerhaft taub oder fallen Ihnen Dinge aus der Hand, kommen Sie bitte bald – dann sollte der Nerv rasch entlastet werden.',
  },

  // ───────────────────────────── Rücken und Nacken ─────────────────────────────
  {
    id: 'bandscheibenvorfall',
    name: 'Bandscheibenvorfall',
    zusatz: 'lumbal, Ischias',
    gebiet: 'ruecken',
    suche:
      'bandscheibenvorfall bandscheibe prolaps diskusprolaps ischias ischialgie lumboischialgie radikulopathie nervenwurzel lws beinschmerz',
    was: [
      'Der Schmerz zieht vom Rücken oder Gesäß in ein Bein, oft bis unter das Knie oder in den Fuß.',
      'Der Beinschmerz ist meist stärker als der Rückenschmerz und fühlt sich brennend oder elektrisierend an.',
      'Kribbeln oder Taubheit an Bein oder Fuß sind häufig, manchmal auch eine leichte Schwäche.',
      'Husten, Niesen oder langes Sitzen können den Schmerz verstärken.',
    ],
    modell: {
      region: 'lws',
      struktur: 'gallertkern',
      fokus: ['lendenwirbel', 'bandscheiben'],
      aus: ['becken', 'psoas', 'quadratus'],
      zoom: 1,
      saetze: [
        'Zwischen den Wirbeln liegen die Bandscheiben, wie Stoßdämpfer mit einem weichen Kern in der Mitte.',
        'Reißt der feste Ring außen ein, kann der leuchtende Kern nach hinten austreten.',
        'Dort drückt er auf eine Nervenwurzel und reizt sie – deshalb strahlt der Schmerz ins Bein aus.',
      ],
    },
    ursachen: [
      'Bandscheiben verlieren mit den Jahren Wasser und Elastizität. Ein Vorfall ist meist Folge dieses natürlichen Alterns, nicht einer falschen Bewegung.',
      'Am häufigsten trifft es Menschen zwischen 30 und 50 Jahren.',
      'Veranlagung, Rauchen, Übergewicht und schweres Heben erhöhen das Risiko.',
      'Ein MRT brauchen wir nur bei Lähmungen, Warnzeichen oder wenn eine Operation in Frage kommt. Vorwölbungen der Bandscheibe haben auch viele Menschen ohne Schmerzen.',
    ],
    verlauf:
      'Bei den meisten bessert sich der Schmerz innerhalb von 6 bis 12 Wochen deutlich – der Körper baut das ausgetretene Gewebe oft von selbst ab.',
    therapien: [
      {
        name: 'In Bewegung bleiben',
        text: 'Gehen und der normale Alltag, soweit es der Schmerz erlaubt, fördern die Heilung.',
        evidenz: 'gut',
      },
      {
        name: 'Schmerzmittel für kurze Zeit',
        text: 'Ibuprofen oder ähnliche Mittel nehmen die Spitze des Schmerzes, damit Sie sich bewegen können; der Effekt ist eher klein.',
        evidenz: 'moeglich',
      },
      {
        name: 'Bewegungstherapie',
        text: 'Krankengymnastik zeigt Ihnen Übungen und Haltungen, die das Bein entlasten.',
        evidenz: 'moeglich',
      },
      {
        name: 'Spritze an die Nervenwurzel',
        text: 'Bei starkem Beinschmerz kann eine gezielte Kortisonspritze den Schmerz für einige Wochen lindern.',
        evidenz: 'moeglich',
      },
      {
        name: 'Operation',
        text: 'Sie nimmt den Beinschmerz schneller, nach einem Jahr geht es Operierten und Nicht-Operierten aber ähnlich gut; nötig ist sie bei Lähmungen.',
        evidenz: 'moeglich',
      },
      {
        name: 'Opioide und Mittel gegen Nervenschmerz',
        text: 'Starke Schmerzmittel und Mittel wie Pregabalin helfen beim Ischias kaum, machen aber oft müde und schwindelig.',
        evidenz: 'abraten',
      },
      {
        name: 'Bettruhe',
        text: 'Liegen verzögert die Besserung und schwächt die Muskeln.',
        evidenz: 'abraten',
      },
    ],
    uebungen: ['bauchlage-aufstuetzen', 'becken-kippen', 'vierfuessler-diagonal'],
    alltag: [
      'Machen Sie das Aufstützen in Bauchlage nur, wenn der Beinschmerz dabei gleich bleibt oder sich in Richtung Rücken zurückzieht – zieht er weiter ins Bein, lassen Sie die Übung weg.',
      'Stehen Sie beim Sitzen alle 20 bis 30 Minuten kurz auf und gehen Sie ein paar Schritte.',
    ],
    warnung:
      'Taubheit im Schritt, am Gesäß oder an der Innenseite der Oberschenkel, Probleme beim Wasserlassen oder Stuhlgang: sofort in die Notaufnahme. Bitte ebenfalls sofort kommen bei zunehmender Lähmung des Beins oder Fußes, bei Fieber oder nach einem Unfall.',
  },
  {
    id: 'spinalkanalstenose',
    name: 'Enger Wirbelkanal',
    zusatz: 'Spinalkanalstenose',
    gebiet: 'ruecken',
    suche: 'spinalkanalstenose lumbale stenose enger wirbelkanal claudicatio spinalis schaufensterkrankheit rücken beine',
    was: [
      'Nach einigen Minuten Gehen oder Stehen werden die Beine schwer, schmerzen, kribbeln oder werden taub.',
      'Hinsetzen oder Vornüberbeugen bringt rasch Erleichterung, etwa beim Abstützen auf einen Einkaufswagen.',
      'Radfahren und Bergaufgehen gehen oft erstaunlich gut, Bergabgehen schlechter.',
      'Die Gehstrecke wird mit der Zeit kürzer.',
    ],
    modell: {
      region: 'lws',
      struktur: 'nervenfasern',
      fokus: ['lendenwirbel', 'bandscheiben'],
      aus: ['becken', 'psoas', 'quadratus'],
      zoom: 1,
      saetze: [
        'Die leuchtenden Nervenfasern laufen im Wirbelkanal hinunter zu den Beinen.',
        'Hinten begrenzen die gelben Bänder den Kanal; sie werden mit dem Alter dicker.',
        'Zusammen mit Knochenanbauten und vorgewölbten Bandscheiben wird der Kanal eng – im Stehen enger als im Sitzen.',
      ],
    },
    ursachen: [
      'Die Einengung entsteht über viele Jahre durch Verschleiß der Wirbelsäule.',
      'Betroffen sind meist Menschen über 60 Jahre.',
      'Beim aufrechten Stehen wird der Kanal enger, beim Vorbeugen und Sitzen weiter – deshalb hilft das Hinsetzen.',
      'Viele ältere Menschen haben im MRT einen engen Kanal ohne Beschwerden. Entscheidend ist, wie stark Sie eingeschränkt sind.',
    ],
    verlauf:
      'Bei den meisten bleiben die Beschwerden über Jahre gleich oder bessern sich sogar; eine rasche Verschlechterung ist selten.',
    therapien: [
      {
        name: 'Bewegungstherapie',
        text: 'Übungen für Bauch, Rücken und Beweglichkeit sowie Radfahren halten Sie mobil; in Studien ähnlich wirksam wie eine OP.',
        evidenz: 'gut',
      },
      {
        name: 'Schmerzmittel für kurze Zeit',
        text: 'Ibuprofen oder ähnliche Mittel in schlechten Phasen; auf Dauer wegen Magen, Niere und Herz mit Vorsicht.',
        evidenz: 'moeglich',
      },
      {
        name: 'Operation zur Erweiterung',
        text: 'Bei stark verkürzter Gehstrecke kann die Erweiterung des Kanals helfen; ob sie auf Dauer mehr bringt als Bewegungstherapie, ist offen.',
        evidenz: 'moeglich',
      },
      {
        name: 'Zusätzliche Versteifung',
        text: 'Ohne instabile Wirbelsäule bringt eine Versteifung zusätzlich zur Erweiterung meist keinen Vorteil.',
        evidenz: 'abraten',
      },
      {
        name: 'Kortisonspritze in den Wirbelkanal',
        text: 'Sie hilft bei engem Wirbelkanal in Studien nicht besser als eine Spritze ohne Kortison.',
        evidenz: 'abraten',
      },
      {
        name: 'Mittel gegen Nervenschmerz',
        text: 'Pregabalin oder Gabapentin verlängern die Gehstrecke nicht sicher und haben häufig Nebenwirkungen.',
        evidenz: 'abraten',
      },
    ],
    uebungen: ['knie-zur-brust', 'becken-kippen', 'katze-kuh'],
    alltag: [
      'Radfahren, auch auf dem Heimtrainer, geht meist gut und hält die Beine fit.',
      'Machen Sie beim Gehen rechtzeitig Pausen im Sitzen oder Vorbeugen; ein Rollator kann die Gehstrecke deutlich verlängern.',
    ],
    warnung:
      'Taubheit im Schritt oder am Gesäß, Probleme beim Wasserlassen oder Stuhlgang: sofort in die Notaufnahme. Bitte ebenfalls rasch kommen bei zunehmender Schwäche der Beine oder häufigen Stürzen.',
  },
  {
    id: 'wirbelgleiten',
    name: 'Wirbelgleiten',
    zusatz: 'Spondylolisthese, Spondylolyse',
    gebiet: 'ruecken',
    suche:
      'wirbelgleiten spondylolisthese spondylolisthesis spondylolyse gleitwirbel olisthese instabilitaet lendenwirbelsaeule l5 s1 l4 meyerding versteifung spondylodese rückenschmerzen',
    was: [
      'Ein Wirbel ist gegenüber dem darunterliegenden nach vorn verrutscht, meist der unterste Lendenwirbel über dem Kreuzbein oder der vierte über dem fünften.',
      'Viele merken davon nichts; es fällt zufällig im Röntgen auf.',
      'Wenn Beschwerden kommen, sind es meist Kreuzschmerzen, die bei Belastung, langem Stehen und im Hohlkreuz zunehmen.',
      'Drückt der verschobene Wirbel auf Nerven, können Schmerzen, Kribbeln oder Schwäche in die Beine ziehen.',
    ],
    modell: {
      region: 'lws',
      struktur: 'lendenwirbel',
      blick: 'seite',
      fokus: ['lendenwirbel', 'kreuzbein'],
      aus: ['becken', 'psoas', 'quadratus'],
      zoom: 1,
      saetze: [
        'Die Lendenwirbel stehen normalerweise wie Bauklötze sauber übereinander.',
        'Beim Wirbelgleiten rutscht meist der unterste Wirbel auf dem Kreuzbein ein Stück nach vorn – es entsteht eine Stufe.',
        'Dahinter laufen im Wirbelkanal die Nerven zu den Beinen. Sie können an der Stufe eingeengt werden.',
      ],
    },
    ursachen: [
      'Bei jungen Menschen liegt meist eine Lücke im knöchernen Wirbelbogen zugrunde (Spondylolyse). Sie entsteht oft schon in der Jugend, häufiger bei Sportarten mit viel Hohlkreuz wie Turnen, Speerwurf oder Ballett.',
      'Im Alter lockern sich Bandscheiben und kleine Wirbelgelenke durch Verschleiß, und der Wirbel kann ohne Bogenlücke nach vorn gleiten. Frauen sind häufiger betroffen.',
      'Meist ist die Verschiebung gering und nimmt bei Erwachsenen kaum noch zu.',
      'Wie stark es verschoben ist, sagt wenig über die Schmerzen. Entscheidend sind die Beschwerden.',
    ],
    verlauf:
      'Die meisten kommen ohne Operation gut zurecht; mit gezieltem Training werden die Beschwerden oft deutlich besser.',
    therapien: [
      {
        name: 'Rumpfstabilisierendes Training',
        text: 'Physiotherapie und eigene Übungen für tiefe Bauch- und Rückenmuskeln stützen die Wirbelsäule wie ein inneres Korsett.',
        evidenz: 'gut',
      },
      {
        name: 'Aktiv bleiben',
        text: 'Gehen, Radfahren und Schwimmen sind meist gut möglich; Bettruhe schadet eher.',
        evidenz: 'gut',
      },
      {
        name: 'Schmerzmittel für kurze Zeit',
        text: 'Ibuprofen oder ähnliche Mittel in schlechten Phasen, damit Sie in Bewegung bleiben.',
        evidenz: 'moeglich',
      },
      {
        name: 'Stützmieder',
        text: 'Kann in akuten Phasen kurz entlasten; dauerhaft getragen schwächt es die Muskeln.',
        evidenz: 'unklar',
      },
      {
        name: 'Spritzen an Nerven oder Gelenke',
        text: 'Können bei ausstrahlenden Schmerzen vorübergehend lindern; der Nutzen ist wenig untersucht.',
        evidenz: 'unklar',
      },
      {
        name: 'Operation mit Versteifung',
        text: 'Bei starken Schmerzen trotz monatelanger Behandlung, bei Nervenausfällen oder zunehmendem Gleiten wird der Abschnitt mit Schrauben stabilisiert, oft mit Erweiterung des Kanals.',
        evidenz: 'moeglich',
      },
    ],
    uebungen: ['becken-kippen', 'vierfuessler-diagonal', 'knie-zur-brust'],
    alltag: [
      'Meiden Sie starkes Hohlkreuz und Überstrecken nach hinten; heben Sie Lasten nah am Körper.',
      'Übungen, die den Rücken nach hinten durchbiegen (z. B. Aufstützen in Bauchlage), sind beim Wirbelgleiten meist ungünstig.',
    ],
    warnung:
      'Taubheit im Schritt oder am Gesäß, Probleme beim Wasserlassen oder Stuhlgang: sofort in die Notaufnahme. Bitte rasch kommen bei zunehmender Schwäche oder Taubheit in den Beinen.',
  },
  {
    id: 'hws-syndrom',
    name: 'Nackenschmerzen',
    zusatz: 'HWS-Syndrom',
    gebiet: 'ruecken',
    suche: 'nackenschmerzen hws syndrom halswirbelsäule verspannung nacken steifer hals schiefhals zervikal',
    was: [
      'Der Nacken ist schmerzhaft verspannt, der Kopf lässt sich schlechter drehen oder neigen.',
      'Der Schmerz kann in Hinterkopf, Schultern oder zwischen die Schulterblätter ziehen.',
      'Oft kommt dazu ein Spannungskopfschmerz.',
      'In den allermeisten Fällen steckt keine gefährliche Ursache dahinter.',
    ],
    modell: {
      region: 'hws',
      struktur: 'nackenstrecker',
      saetze: [
        'Die leuchtenden Muskeln halten und bewegen den Kopf – mehrere Kilo, den ganzen Tag lang.',
        'Bei Nackenschmerzen sind sie verspannt und druckempfindlich, oft auf beiden Seiten.',
      ],
    },
    ursachen: [
      'Meist spielen Muskeln, Bänder und kleine Wirbelgelenke zusammen: verspannt, überlastet oder zu wenig bewegt.',
      'Langes Arbeiten am Bildschirm oder Handy mit vorgeschobenem Kopf, Zugluft und eine ungünstige Schlafposition können es auslösen.',
      'Stress und Anspannung verstärken die Schmerzen und lassen sie länger anhalten.',
      'Verschleißzeichen im Röntgen haben auch viele Menschen ohne Beschwerden. Ein Bild brauchen wir nur bei Warnzeichen.',
    ],
    verlauf:
      'Die meisten Nackenschmerzen bessern sich innerhalb weniger Wochen; sie können wiederkommen, sind dann aber ebenso harmlos.',
    therapien: [
      {
        name: 'Aktiv bleiben und üben',
        text: 'Den Kopf normal bewegen und regelmäßig Nacken und Schultern trainieren hilft am besten, auch gegen Rückfälle.',
        evidenz: 'gut',
      },
      {
        name: 'Wärme',
        text: 'Wärmflasche, Kirschkernkissen oder eine warme Dusche lockern verspannte Muskeln.',
        evidenz: 'moeglich',
      },
      {
        name: 'Manuelle Therapie',
        text: 'Mobilisation durch Physiotherapie kann zusätzlich zu Übungen helfen, allein bringt sie wenig.',
        evidenz: 'moeglich',
      },
      {
        name: 'Akupunktur',
        text: 'Bei länger anhaltenden Schmerzen kann sie zusätzlich etwas lindern.',
        evidenz: 'moeglich',
      },
      {
        name: 'Schmerzmittel für kurze Zeit',
        text: 'Ibuprofen oder ähnliche Mittel für wenige Tage, damit Sie in Bewegung bleiben können.',
        evidenz: 'moeglich',
      },
      {
        name: 'Massage allein',
        text: 'Tut gut, wirkt aber nur kurz; ohne eigene Übungen hält der Effekt nicht an.',
        evidenz: 'unklar',
      },
      {
        name: 'Halskrause und Muskelentspanner',
        text: 'Ruhigstellen schwächt die Muskeln, und Muskelentspanner machen müde und können abhängig machen.',
        evidenz: 'abraten',
      },
    ],
    uebungen: ['kinn-zurueck', 'nacken-seitdehnen', 'schulterblaetter-zusammen'],
    alltag: [
      'Stellen Sie den Bildschirm auf Augenhöhe und halten Sie das Handy höher statt den Kopf zu senken.',
      'Stehen Sie bei Schreibtischarbeit jede halbe Stunde kurz auf und kreisen Sie die Schultern.',
    ],
    warnung:
      'Plötzlich stärkster Kopfschmerz, Lähmung oder Gefühlsstörung in Armen oder Beinen, unsicherer Gang, Fieber mit steifem Nacken oder Nackenschmerz nach einem Unfall: sofort in die Notaufnahme oder 112.',
  },
];
