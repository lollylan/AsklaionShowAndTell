import type { Krankheit } from './typen';

export const BEWEGUNG: Krankheit[] = [
  {
    id: 'arthrose',
    name: 'Arthrose',
    zusatz: 'Gelenkverschleiß',
    gebiet: 'bewegung',
    suche: 'gelenkverschleiss gonarthrose coxarthrose knie huefte',
    bilder: { behandlung: 'arthrose-behandlung', selbst: 'arthrose-selbst' },
    was: [
      'Die Knochenenden im Gelenk sind mit glattem Knorpel überzogen. Er federt ab und lässt das Gelenk gleiten.',
      'Bei Arthrose wird dieser Knorpel dünner und rauer. Am Ende reibt Knochen auf Knochen.',
      'Typisch sind Schmerzen beim Loslaufen und bei Belastung, später auch in Ruhe und nachts.',
      'Das Gelenk wird steifer und kann anschwellen. Am häufigsten betroffen sind Knie, Hüfte und Finger.',
    ],
    ursachen: [
      'Arthrose entsteht meist über viele Jahre. Das Alter und die Veranlagung spielen die größte Rolle.',
      'Übergewicht belastet Knie und Hüfte besonders und fördert zusätzlich die Entzündung im Gelenk.',
      'Auch frühere Verletzungen, Fehlstellungen und einseitige schwere Belastung begünstigen sie.',
      'Wichtig: Das Röntgenbild sagt wenig darüber, wie stark die Beschwerden sind.',
    ],
    behandlung: [
      'Die wichtigste Behandlung ist Bewegung: Sie ernährt den Knorpel und kräftigt die Muskeln, die das Gelenk führen.',
      'Krankengymnastik zeigt Ihnen die passenden Übungen.',
      'Schmerzmittel helfen in schlechten Phasen – als Salbe oder für kurze Zeit als Tablette.',
      'Ein künstliches Gelenk kommt in Frage, wenn Schmerz und Einschränkung trotz allem nicht mehr erträglich sind.',
    ],
    selbst: [
      'Bewegen Sie das Gelenk viel und belasten Sie es wenig: Radfahren, Schwimmen, Gehen.',
      'Kräftigen Sie Ihre Muskeln regelmäßig – am besten mit festen Übungen zu Hause.',
      'Jedes Kilo weniger entlastet das Knie um ein Vielfaches.',
      'Wärme hilft bei steifen Gelenken, Kälte bei einem geschwollenen, überwärmten Gelenk.',
    ],
  },
  {
    id: 'osteoporose',
    name: 'Osteoporose',
    zusatz: 'Knochenschwund',
    gebiet: 'bewegung',
    suche: 'knochenschwund knochendichte dxa wirbelbruch schenkelhalsbruch',
    bilder: { ursachen: 'osteoporose-ursachen', behandlung: 'osteoporose-behandlung' },
    was: [
      'Knochen wird ein Leben lang auf- und abgebaut. Bei Osteoporose überwiegt der Abbau.',
      'Der Knochen verliert an Dichte, sein inneres Gerüst wird dünn und lückenhaft.',
      'Das tut nicht weh. Aber der Knochen bricht leichter – manchmal schon bei einem harmlosen Sturz.',
      'Typisch sind Brüche an Wirbeln, Hüfte und Handgelenk. Wer kleiner wird oder einen Rundrücken bekommt, kann Wirbelbrüche haben.',
    ],
    ursachen: [
      'Am häufigsten trifft es Frauen nach den Wechseljahren, weil das schützende Östrogen fehlt.',
      'Weitere Risiken: hohes Alter, Brüche in der Familie, Untergewicht, wenig Bewegung, Rauchen und viel Alkohol.',
      'Auch Kortison über längere Zeit und manche Krankheiten schwächen den Knochen.',
      'Ein Hüftbruch im Alter bedeutet oft den Verlust der Selbstständigkeit. Vorbeugen lohnt sich.',
    ],
    behandlung: [
      'Wir bestimmen Ihr Bruchrisiko – bei Bedarf mit einer Knochendichtemessung.',
      'Basis sind genug Kalzium über die Ernährung, Vitamin D und Bewegung.',
      'Ist das Risiko hoch, bremsen Medikamente den Knochenabbau: als Tablette einmal pro Woche oder als Spritze oder Infusion in größeren Abständen.',
      'Sie senken das Risiko für Brüche deutlich. Die Behandlung läuft meist über mehrere Jahre.',
    ],
    selbst: [
      'Belasten Sie Ihre Knochen: Gehen, Treppensteigen, Krafttraining. Knochen wächst mit der Belastung.',
      'Üben Sie Ihr Gleichgewicht und beseitigen Sie Stolperfallen zu Hause – die meisten Brüche entstehen beim Sturz.',
      'Kalziumreich sind Milchprodukte, grünes Gemüse und kalziumreiches Mineralwasser.',
      'Nicht rauchen, wenig Alkohol, und täglich an die frische Luft.',
    ],
    warnung:
      'Plötzliche starke Rückenschmerzen, auch ohne Sturz, können ein Wirbelbruch sein: bitte zeitnah untersuchen lassen.',
  },
  {
    id: 'rueckenschmerzen',
    name: 'Rückenschmerzen',
    zusatz: 'Kreuzschmerz, Hexenschuss',
    gebiet: 'bewegung',
    suche: 'kreuzschmerz lumbago hexenschuss ischias bandscheibe lws',
    bilder: { ursachen: 'rueckenschmerzen-ursachen', behandlung: 'rueckenschmerzen-behandlung' },
    was: [
      'Fast jeder Mensch hat irgendwann Rückenschmerzen. Meist sitzen sie im unteren Rücken.',
      'In den allermeisten Fällen steckt keine gefährliche Ursache dahinter – auch wenn der Schmerz heftig ist.',
      'Der Rücken ist stabil gebaut. Schmerz bedeutet hier fast nie, dass etwas kaputt ist.',
      'Bei den meisten bessert es sich innerhalb weniger Wochen deutlich.',
    ],
    ursachen: [
      'Meist spielen Muskeln, Bänder und kleine Gelenke zusammen: verspannt, überlastet oder zu wenig trainiert.',
      'Langes Sitzen, wenig Bewegung, Stress und Sorgen verstärken den Schmerz und lassen ihn länger anhalten.',
      'Ein Bandscheibenvorfall ist seltener. Er macht vor allem Schmerzen, die ins Bein ausstrahlen.',
      'Röntgen oder MRT brauchen wir nur bei Warnzeichen. Auffälligkeiten im Bild haben auch viele Gesunde.',
    ],
    behandlung: [
      'Das Wichtigste: in Bewegung bleiben und den Alltag so normal wie möglich weiterführen.',
      'Bettruhe schadet – sie verzögert die Besserung.',
      'Schmerzmittel dürfen für kurze Zeit helfen, damit Sie sich bewegen können. Wärme tut vielen gut.',
      'Halten die Schmerzen über Wochen an, helfen Bewegungstherapie und gezieltes Training.',
    ],
    selbst: [
      'Gehen Sie spazieren, auch wenn es zwickt. Bewegung, die den Schmerz nicht stark steigert, ist erlaubt.',
      'Wechseln Sie oft die Haltung: aufstehen, strecken, ein paar Schritte gehen.',
      'Kräftigen Sie auf Dauer Rumpf und Rücken – die Sportart ist egal, Hauptsache regelmäßig.',
      'Sorgen Sie für Ausgleich bei Stress. Auch der Kopf beeinflusst den Rücken.',
    ],
    warnung:
      'Lähmung im Bein, Taubheit am Gesäß oder im Schritt, Probleme mit Blase oder Darm: sofort ärztliche Hilfe. Auch bei Fieber oder nach einem Unfall bitte melden.',
  },
];
