import type { Krankheit } from './typen';

// Arbeit und Krankschreibung: stufenweise Wiedereingliederung (Hamburger Modell).
// Der praxiseigene Ablauf (Plan, Genehmigung, Krankschreibung) steht zusätzlich unter
// Praxisabläufe → Wiedereingliederung.

export const ARBEIT: Krankheit[] = [
  {
    id: 'wiedereingliederung',
    name: 'Stufenweise Wiedereingliederung',
    zusatz: 'Hamburger Modell',
    gebiet: 'arbeit',
    suche:
      'wiedereingliederung hamburger modell stufenweise arbeitsaufnahme rueckkehr arbeit beruf arbeitsunfaehig krankschreibung au krankengeld uebergangsgeld rentenversicherung reha muster 20 stufenplan bem betriebliches eingliederungsmanagement arbeitgeber krankenkasse',
    seiten: [
      {
        id: 'was',
        titel: 'Was ist eine Wiedereingliederung?',
        kurz: 'Was ist das?',
        saetze: [
          'Nach einer langen Krankheit gleich wieder voll zu arbeiten, ist oft zu viel. Bei der Wiedereingliederung steigen Sie mit wenigen Stunden ein und steigern sich Schritt für Schritt.',
          'So gewöhnen sich Körper und Kopf wieder an die Arbeit, und Sie merken früh, was schon geht und was noch nicht.',
          'Sie dauert meist sechs Wochen bis einige Monate – je nachdem, wie schnell es vorangeht.',
          'Die Teilnahme ist freiwillig, für Sie und für Ihren Arbeitgeber.',
        ],
      },
      {
        id: 'wer',
        titel: 'Für wen ist das?',
        kurz: 'Für wen?',
        saetze: [
          'Für alle, die längere Zeit krankgeschrieben waren und ihre bisherige Arbeit nach und nach wieder schaffen können – etwa nach Operation, Herzinfarkt, Krebs, Depression oder Burnout.',
          'Voraussetzung ist, dass wir ärztlich davon ausgehen, dass Ihre Belastbarkeit Schritt für Schritt wieder steigt.',
          'Waren Sie in einem Jahr länger als sechs Wochen krank, muss Ihr Arbeitgeber Ihnen ein Gespräch zur Rückkehr anbieten (betriebliches Eingliederungsmanagement). Dort ist die Wiedereingliederung oft ein Thema.',
          'Mit einer Schwerbehinderung haben Sie in der Regel einen Anspruch darauf.',
        ],
      },
      {
        id: 'plan',
        titel: 'Der Stufenplan',
        kurz: 'Stufenplan',
        saetze: [
          'Gemeinsam legen wir fest, mit wie vielen Stunden Sie beginnen und wann es mehr wird – zum Beispiel je zwei Wochen zwei, vier und sechs Stunden am Tag, dann wieder voll.',
          'Den Plan schreiben wir auf ein eigenes Formular. Darin steht auch, was Sie noch nicht tun sollten, etwa schweres Heben oder Nachtschicht.',
          'Ihr Arbeitgeber und Ihre Krankenkasse müssen zustimmen. Planen Sie dafür etwa eine Woche Vorlauf ein.',
          'Der Plan ist nicht in Stein gemeißelt: Geht es schneller oder langsamer, passen wir ihn an.',
        ],
      },
      {
        id: 'geld',
        titel: 'Krankschreibung und Geld',
        kurz: 'Krankengeld',
        saetze: [
          'Während der ganzen Wiedereingliederung gelten Sie weiter als arbeitsunfähig und bleiben krankgeschrieben – ohne Lücke.',
          'In dieser Zeit bekommen Sie meist weiter Krankengeld von der Krankenkasse. Ihr Arbeitgeber muss keinen Lohn zahlen, darf es aber freiwillig.',
          'Die Wochen zählen zur Höchstdauer des Krankengelds mit. Wer schon lange krank ist, sollte das mit der Kasse klären.',
          'Urlaub nehmen können Sie während der Wiedereingliederung nicht, weil Sie offiziell krankgeschrieben sind.',
        ],
      },
      {
        id: 'reha',
        titel: 'Nach einer Reha',
        kurz: 'Nach der Reha',
        saetze: [
          'Oft schlägt schon die Reha-Klinik eine Wiedereingliederung vor und bereitet den Plan vor.',
          'Beginnt sie kurz nach der Reha, in der Regel innerhalb von vier Wochen, ist meist die Rentenversicherung zuständig. Dann gibt es Übergangsgeld statt Krankengeld.',
          'Sprechen Sie Ihren Arbeitgeber am besten schon während der Reha an, damit der Start nicht verzögert wird.',
        ],
      },
      {
        id: 'tipps',
        titel: 'Damit es gut klappt',
        kurz: 'Tipps',
        saetze: [
          'Fangen Sie lieber etwas zu langsam an als zu schnell. Ein Rückschlag kostet mehr Zeit als eine Woche länger auf einer Stufe.',
          'Sprechen Sie mit Ihrer Führungskraft ab, welche Aufgaben Sie zuerst übernehmen.',
          'Merken Sie, dass es zu viel wird, melden Sie sich bei uns. Eine Wiedereingliederung lässt sich jederzeit anpassen oder abbrechen.',
        ],
      },
    ],
    warnung:
      'Die Krankschreibung muss bis zum letzten Tag der Wiedereingliederung lückenlos weiterlaufen – sonst kann das Krankengeld wegfallen.',
  },
];
