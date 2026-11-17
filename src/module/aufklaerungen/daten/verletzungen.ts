import type { Krankheit } from './typen';

// Vertebragener Schwindel, zweizeitige Milzruptur, Subduralhämatom.

export const VERLETZUNGEN: Krankheit[] = [
  {
    id: 'vertebragener-schwindel',
    name: 'Schwindel von der Halswirbelsäule',
    zusatz: 'Vertebragener oder zervikogener Schwindel',
    gebiet: 'kopf',
    suche:
      'zervikogener schwindel vertebragener schwindel hws halswirbelsaeule nacken nackenschmerz verspannung schleudertrauma propriozeption schwankschwindel benommenheit bildschirmarbeit',
    was: [
      'Manche Menschen fühlen sich unsicher, schwankend oder benommen – zusammen mit Nackenschmerzen und verspannten Schultern. Ein Karussell-Drehschwindel ist das meist nicht.',
      'Oft wird es schlimmer bei bestimmten Kopfbewegungen oder wenn Sie lange in derselben Haltung sitzen.',
      'Ehrlich gesagt: Unter Fachleuten ist dieser Schwindel umstritten. Wir nennen ihn erst, wenn andere Ursachen ausgeschlossen sind.',
      'Dazu prüfen wir Lagerungsschwindel, Innenohr, Kreislauf und die Blutgefäße am Hals. Ein Röntgenbild ist meist nicht nötig.',
    ],
    ursachen: [
      'Muskeln und Gelenke im Nacken melden dem Gehirn ständig, wie der Kopf steht. Diese Meldungen gleicht das Gehirn mit Innenohr und Augen ab.',
      'Sind die Nackenmuskeln verspannt oder gereizt, kommen widersprüchliche Meldungen an. Das kann sich wie Schwanken anfühlen.',
      'Auslöser sind häufig ein Schleudertrauma, lange Bildschirmarbeit, Dauerverspannung oder Verschleiß der Halswirbelsäule.',
      'Wichtig: Nackenschmerz und Schwindel nach einem Unfall oder Einrenken können selten auch von einem Einriss in einer Halsschlagader kommen. Das muss sofort abgeklärt werden.',
    ],
    behandlung: [
      'Am besten hilft Physiotherapie: den Nacken lockern und kräftigen, die Haltung verbessern, dazu Übungen für Augen und Kopf und Gleichgewichtstraining.',
      'Sanfte manuelle Therapie kann gut tun. Ruckartiges Einrenken der Halswirbelsäule sollte dabei vermieden werden.',
      'Wärme und regelmäßige Bewegung lösen Verspannungen. Schmerzmittel helfen kurzzeitig über schlechte Tage.',
      'Eine Halskrause ist nicht sinnvoll – Schonung macht den Nacken eher steifer.',
    ],
    selbst: [
      'Machen Sie am Bildschirm regelmäßig kurze Pausen und bewegen Sie dabei Kopf und Schultern.',
      'Stellen Sie den Bildschirm so ein, dass die Oberkante etwa auf Augenhöhe liegt.',
      'Lockern Sie den Nacken mehrmals am Tag: Schultern kreisen, Kopf langsam drehen und neigen.',
      'Bleiben Sie in Bewegung, etwa mit Spazierengehen, Schwimmen oder Radfahren.',
    ],
    warnung:
      'Plötzlich heftiger Nacken- oder Kopfschmerz mit Schwindel, Doppelbilder, Sprach- oder Schluckstörung, Lähmung, Taubheit oder unsicherer Gang: sofort 112.',
  },
  {
    id: 'milzruptur',
    name: 'Zweizeitige Milzruptur',
    zusatz: 'Milzriss, der sich erst später zeigt',
    gebiet: 'bauch',
    suche:
      'milzriss milzruptur milz bauchtrauma stumpfes bauchtrauma innere blutung kapselhaematom splenektomie milzentfernung kehr zeichen schulterschmerz pfeiffersches druesenfieber mononukleose sportpause',
    was: [
      'Die Milz liegt im linken Oberbauch, geschützt unter den unteren Rippen. Sie ist sehr gut durchblutet.',
      'Bei einem Schlag auf den Bauch kann sie einreißen. Manchmal hält zunächst ihre feste Hülle, die Kapsel, und darunter sammelt sich ein Bluterguss.',
      'Tage später, selten erst nach Wochen, kann die Kapsel plötzlich reißen. Dann blutet es in den Bauch – oft nach einer Zeit, in der es Ihnen gut ging.',
      'Zeichen sind Schmerzen links oben im Bauch, Schmerzen in der linken Schulter, Blässe, Schwindel, Herzrasen bis zum Kreislaufkollaps.',
    ],
    ursachen: [
      'Auslöser ist ein stumpfer Schlag auf den Bauch: ein Sturz, der Fahrradlenker, ein Stoß beim Sport, eine Prellung der linken Rippen oder ein Verkehrsunfall.',
      'Am größten ist die Gefahr in den ersten ein bis zwei Wochen nach dem Unfall.',
      'Eine vergrößerte Milz reißt leichter, zum Beispiel beim Pfeifferschen Drüsenfieber. Dann bitte etwa drei bis vier Wochen keinen Sport – genau nach ärztlichem Rat.',
      'Wer Blutverdünner nimmt, blutet stärker und länger.',
    ],
    behandlung: [
      'Mit Ultraschall und meist einer Computertomographie sehen wir, wie groß der Riss und die Blutung sind.',
      'Oft geht es ohne Operation: Sie bleiben im Krankenhaus, halten Bettruhe und werden regelmäßig kontrolliert.',
      'Blutet es weiter, kann ein Radiologe das blutende Gefäß über einen Katheter verschließen. Bei starker Blutung wird operiert und die Milz manchmal entfernt.',
      'Ohne Milz wehrt der Körper manche Bakterien schlechter ab. Dann sind Impfungen wichtig – gegen Pneumokokken, Meningokokken, Hib und jährlich gegen Grippe – und Fieber muss immer ernst genommen werden.',
    ],
    selbst: [
      'Achten Sie nach einem Schlag auf den Bauch in den folgenden Wochen auf die Warnzeichen – auch wenn es Ihnen zuerst gut geht.',
      'Schonen Sie sich und machen Sie keinen Kontaktsport, bis Sie ärztlich freigegeben sind.',
      'Bleiben Sie in den ersten Tagen nicht allein, damit jemand im Notfall Hilfe holen kann.',
      'Ohne Milz: Impfausweis aktuell halten und bei Fieber sofort ärztlich melden.',
    ],
    warnung:
      'Schmerzen links oben im Bauch oder in der linken Schulter, Schwindel, Ohnmacht, Blässe oder Herzrasen nach einem Sturz oder Unfall – auch Tage später: sofort 112.',
  },
  {
    id: 'subduralhaematom',
    name: 'Subdurales Hämatom',
    zusatz: 'Blutung unter der harten Hirnhaut',
    gebiet: 'kopf',
    suche:
      'subduralhaematom subdurales haematom sdh chronisches subduralhaematom hirnblutung brueckenvenen sturz kopfverletzung blutverduenner bohrloch trepanation verwirrtheit',
    seiten: [
      {
        id: 'was',
        titel: 'Was ist das?',
        kurz: 'Die Krankheit',
        saetze: [
          'Zwischen Gehirn und Schädel liegt die harte Hirnhaut. Blutet es darunter, drückt der Bluterguss auf das Gehirn.',
          'Nach einem schweren Unfall kann das schnell gehen: Man ist sofort benommen oder bewusstlos. Das ist ein Notfall und wird gleich operiert.',
          'Häufiger bei älteren Menschen ist die langsame Form: Nach einem oft harmlosen Sturz sammelt sich das Blut über Wochen.',
          'Dann kommen schleichend Kopfschmerz, Verwirrtheit, Wesensänderung, Gangunsicherheit oder Schwäche einer Seite. Das wird leicht mit Demenz oder Schlaganfall verwechselt.',
        ],
      },
      {
        id: 'ursachen',
        titel: 'Ursachen und Risiken',
        kurz: 'Ursachen und Risiken',
        bild: 'subduralhaematom-alter',
        saetze: [
          'Zwischen Gehirn und harter Hirnhaut ziehen feine Venen, die Brückenvenen. Bei einem Stoß kann eine davon reißen.',
          'Im Alter wird das Gehirn etwas kleiner. Dadurch ist mehr Platz, und die Brückenvenen sind gespannt – sie reißen schon bei kleinen Stürzen.',
          'Blutverdünner wie ASS oder Gerinnungshemmer, viel Alkohol und häufige Stürze erhöhen das Risiko deutlich.',
          'Mit einer Computertomographie des Kopfes sehen wir die Blutung sicher.',
        ],
      },
      {
        id: 'behandlung',
        titel: 'So wird behandelt',
        kurz: 'Behandlung',
        saetze: [
          'Eine kleine Blutung ohne Beschwerden kann man beobachten. Sie wird mit einem Kontroll-CT überprüft und oft vom Körper abgebaut.',
          'Blutverdünner werden meist für eine Zeit pausiert – aber nur nach Rücksprache, nie auf eigene Faust.',
          'Drückt die Blutung, wird über ein kleines Bohrloch im Schädel das Blut abgelassen, oft mit einem Schlauch für einige Tage. Das ist ein kleiner Eingriff mit guten Erfolgen.',
          'Die Blutung kann wiederkommen. Neuer ist ein Verfahren, bei dem ein Katheter das versorgende Gefäß der Hirnhaut verschließt – das wird noch genauer erforscht.',
        ],
      },
      {
        id: 'selbst',
        titel: 'Das können Sie selbst tun',
        kurz: 'Selbst tun',
        saetze: [
          'Beugen Sie Stürzen vor: Stolperfallen beseitigen, gutes Licht, feste Schuhe, Kraft- und Gleichgewichtstraining.',
          'Wenn Sie Blutverdünner nehmen und sich den Kopf stoßen, stellen Sie sich bitte ärztlich vor. Oft ist ein CT sinnvoll.',
          'Angehörige: Achten Sie in den Wochen nach einem Sturz auf Veränderungen – neue Kopfschmerzen, Verwirrtheit, Schwäche oder ein anderes Wesen.',
        ],
      },
    ],
    warnung:
      'Nach einer Kopfverletzung zunehmende Kopfschmerzen, Erbrechen, Schläfrigkeit, Verwirrtheit, Lähmung, ungleich große Pupillen oder ein Krampfanfall: sofort 112.',
  },
];
