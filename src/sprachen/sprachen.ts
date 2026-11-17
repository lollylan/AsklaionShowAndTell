// Sprachen für Patientenbildschirm und Handzettel. Die Steuerung bleibt immer deutsch.
//
// Übersetzt wird über Wörterbücher (src/sprachen/texte/<code>/*.json): deutscher Text →
// Übersetzung. Was im Wörterbuch fehlt, erscheint auf Deutsch. Eine neue Sprache braucht nur
// einen Eintrag hier, eine Flagge in Flagge.tsx und einen Ordner unter texte/.
// Texte sammeln und Lücken finden: node werkzeuge/sammle_texte.mjs (siehe README).

export type FlaggenId =
  | 'de'
  | 'gb'
  | 'fr'
  | 'ru'
  | 'ua'
  | 'sy'
  | 'ir'
  | 'tr'
  | 'pl'
  | 'ro'
  | 'cn'
  | 'jp'
  | 'kr';

export interface Sprache {
  /** BCP-47-Code, landet als lang-Attribut im Dokument. */
  code: string;
  /** Name auf Deutsch, für die Steuerung. */
  name: string;
  /** Name in der Sprache selbst, damit Patienten ihre Sprache wiedererkennen. */
  eigen: string;
  richtung: 'ltr' | 'rtl';
  flagge: FlaggenId;
}

export const SPRACHEN: Sprache[] = [
  { code: 'de', name: 'Deutsch', eigen: 'Deutsch', richtung: 'ltr', flagge: 'de' },
  { code: 'en', name: 'Englisch', eigen: 'English', richtung: 'ltr', flagge: 'gb' },
  { code: 'fr', name: 'Französisch', eigen: 'Français', richtung: 'ltr', flagge: 'fr' },
  { code: 'tr', name: 'Türkisch', eigen: 'Türkçe', richtung: 'ltr', flagge: 'tr' },
  { code: 'ru', name: 'Russisch', eigen: 'Русский', richtung: 'ltr', flagge: 'ru' },
  { code: 'uk', name: 'Ukrainisch', eigen: 'Українська', richtung: 'ltr', flagge: 'ua' },
  { code: 'pl', name: 'Polnisch', eigen: 'Polski', richtung: 'ltr', flagge: 'pl' },
  { code: 'ro', name: 'Rumänisch', eigen: 'Română', richtung: 'ltr', flagge: 'ro' },
  { code: 'ar', name: 'Arabisch', eigen: 'العربية', richtung: 'rtl', flagge: 'sy' },
  { code: 'fa', name: 'Persisch (Farsi)', eigen: 'فارسی', richtung: 'rtl', flagge: 'ir' },
  { code: 'zh', name: 'Chinesisch', eigen: '中文', richtung: 'ltr', flagge: 'cn' },
  { code: 'ja', name: 'Japanisch', eigen: '日本語', richtung: 'ltr', flagge: 'jp' },
  { code: 'ko', name: 'Koreanisch', eigen: '한국어', richtung: 'ltr', flagge: 'kr' },
];

export const DEUTSCH = SPRACHEN[0];

export function findeSprache(code: string | null | undefined): Sprache {
  return SPRACHEN.find((s) => s.code === code) ?? DEUTSCH;
}

/** Schlüssel, unter dem das Arztfenster die Sprache für die Handzettel-Seite ablegt. */
export const sprachSpeicher = (raum: string) => `aufklaerung.sprache.${raum}`;
