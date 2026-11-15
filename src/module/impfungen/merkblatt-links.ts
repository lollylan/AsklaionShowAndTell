// RKI-Faktenblätter „Kurz & Knapp“ zum Ausdrucken, nur für den Arzt-Bildschirm.
// Die Aufklärungsmerkblätter des RKI gibt es auf Deutsch nur mit „MUSTER“-Aufdruck,
// deshalb die Faktenblätter. Quelle, Stand 15.11.2026:
// https://www.rki.de/DE/Themen/Infektionskrankheiten/Impfen/Informationsmaterialien/Faktenblaetter-zum-Impfen/faktenblaetter-zum-impfen-node.html
// Die Links stehen ohne „&v=…“, damit sie auf die jeweils aktuelle Fassung zeigen.

export interface Merkblatt {
  /** Kurzer Name für den Link. */
  titel: string;
  url: string;
}

export const FAKTENBLAETTER_SEITE =
  'https://www.rki.de/DE/Themen/Infektionskrankheiten/Impfen/Informationsmaterialien/Faktenblaetter-zum-Impfen/faktenblaetter-zum-impfen-node.html';

const BASIS =
  'https://www.rki.de/DE/Themen/Infektionskrankheiten/Impfen/Informationsmaterialien/Faktenblaetter-zum-Impfen/';

const pdf = (titel: string, datei: string): Merkblatt => ({
  titel,
  url: `${BASIS}${datei}?__blob=publicationFile`,
});

export const FAKTENBLATT = {
  sechsfach: pdf('6-fach (Säuglinge)', 'Sechsfach-Impfung.pdf'),
  pneumo: pdf('Pneumokokken', 'Pneumokokken.pdf'),
  meningo: pdf('Meningokokken', 'Meningokokken.pdf'),
  masern: pdf('Masern', 'Masern.pdf'),
  hpv: pdf('HPV', 'HPV.pdf'),
  grippe: pdf('Grippe', 'Influenza.pdf'),
  zoster: pdf('Gürtelrose', 'Zoster.pdf'),
  covid: pdf('COVID-19', 'COVID-19.pdf'),
  rsvAeltere: pdf('RSV ab 60', 'RSV-Impfung-Aeltere-Menschen.pdf'),
  rsvProphylaxe: pdf('RSV Säuglinge', 'RSV-Prophylaxe.pdf'),
  fsme: pdf('FSME', 'FSME.pdf'),
  schwangerschaft: pdf('Impfungen in der Schwangerschaft', 'Schwangerschaft.pdf'),
  kontraindikationen: pdf('Falsche und richtige Kontraindikationen', 'Kontraindikationen.pdf'),
};

const F = FAKTENBLATT;

/** Faktenblätter je Impfung; die Schlüssel sind die IDs aus beiden Impfmodulen. */
const JE_IMPFUNG: Record<string, Merkblatt[]> = {
  // Standardimpfungen
  tetanus: [F.sechsfach],
  diphtherie: [F.sechsfach],
  keuchhusten: [F.sechsfach],
  polio: [F.sechsfach],
  hib: [F.sechsfach],
  'hepatitis-b': [F.sechsfach],
  pneumokokken: [F.pneumo],
  'meningokokken-b': [F.meningo],
  'meningokokken-c': [F.meningo],
  masern: [F.masern],
  hpv: [F.hpv],
  grippe: [F.grippe],
  guertelrose: [F.zoster],
  'covid-19': [F.covid],
  rsv: [F.rsvAeltere, F.rsvProphylaxe],
  fsme: [F.fsme],
  // Reiseimpfungen, eigene Schlüssel: Für Reisende passt das 6-fach-Blatt nicht.
  'reise:meningokokken': [F.meningo],
  'reise:fsme': [F.fsme],
};

export const merkblaetterFuer = (id: string): Merkblatt[] => JE_IMPFUNG[id] ?? [];
