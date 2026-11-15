// Unter welchem Namen und Zeichen die App auftritt.
//
// Praxisfassung: src/privat/marke.ts (Praxislogo und -name). Öffentliche Demo: „Asklaion Show
// and Tell“ – dort fehlt src/privat/ (werkzeuge/gesperrt.txt).

import { datei } from './pfad';

export interface Marke {
  /** Steht auf Ruhebild, Handzettel und Übungsblatt. */
  name: string;
  /** Zeile unter dem Namen. */
  zusatz: string;
  /** Zeile unter dem Namen nur auf dem Ruhebild; fehlt sie, steht dort `zusatz`. */
  ruhezeile?: string;
  /** Kleine dritte Zeile auf dem Ruhebild. */
  weitere: string[];
  /** Pfad unter public/. */
  logo: string;
  /** Name der App in Fenstertitel und Seitenleiste. */
  app: string;
  /** Wie die Steuerung das Ruhebild beschreibt („… sieht der Patient …“). */
  ruhebild: string;
  pdfTitel: string;
  mailBetreff: string;
  mailText: string;
}

const ASKLAION: Marke = {
  name: 'Asklaion Show and Tell',
  zusatz: 'Patientenaufklärung auf zwei Bildschirmen',
  ruhezeile: 'Schön, dass Sie da sind.',
  weitere: [],
  logo: '/asklaion.png',
  app: 'Show and Tell',
  ruhebild: 'das Ruhebild',
  pdfTitel: 'Handzettel – Asklaion Show and Tell',
  mailBetreff: 'Ihr Handzettel zum Nachlesen',
  mailText:
    'Guten Tag,\n\nim Anhang finden Sie den Handzettel zu unserem heutigen Gespräch zum Nachlesen.\n\nMit freundlichen Grüßen',
};

const dateien = import.meta.glob<{ default: Marke | null }>('../privat/marke.ts', { eager: true });

export const MARKE: Marke = Object.values(dateien)[0]?.default ?? ASKLAION;

export const LOGO = datei(MARKE.logo);

/** Zweckbestimmung der öffentlichen Fassung – steht in App, Handzettel und README. */
export const ZWECK =
  'Information und Aufklärung, keine Diagnose- oder Therapieempfehlung. Ersetzt nicht die ärztliche Indikationsstellung.';
