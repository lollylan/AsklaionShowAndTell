// Gemeinsame Typen der Reiseimpfberatung – für den öffentlichen Teil und für die
// Praxis-Erweiterung unter src/privat/reiseimpfung/.

import type { ComponentType } from 'react';

export interface MalariaGebiet {
  /** z. B. „Hohes Risiko“, „Malariafrei“ – leer, wenn die Quelle keine Stufe nennt. */
  stufe: string;
  /** DTG-Kürzel: P, P*, EP, NSB, Keine … */
  prophylaxe: string;
  saison: string;
}

export interface Malaria {
  /**
   * hoch     = vorbeugende Medikamente im ganzen Land
   * regional = vorbeugende Medikamente in Teilgebieten oder saisonal
   * gering   = Mückenschutz, ggf. Notfallmedikament
   * minimal  = gelistet, aber keine spezifische Prophylaxe
   */
  stufe: 'hoch' | 'regional' | 'gering' | 'minimal';
  gebiete: MalariaGebiet[];
}

/** Was aus den Empfehlungstabellen (STIKO/DTG) stammt. Nur in der Praxisfassung gefüllt. */
export interface LandFach {
  /** Nachweispflichten laut WHO, wörtlich aus der STIKO-Tabelle. */
  pflicht: string[];
  /** Impfungen für alle Reisenden (Krankheits-ids). */
  alle: string[];
  /** Zusätzliche Impfungen bei besonderem Risiko auf der Reise. */
  risiko: string[];
  /** Impfungen, die nur für Teile des Landes gelten (Gelbfieber*). */
  regional: string[];
  /** Anmerkungen aus der STIKO-Ländertabelle, wörtlich. */
  hinweise: string[];
  malaria: Malaria | null;
}

export interface Land extends LandFach {
  iso3: string;
  iso2: string;
  /** Numerischer ISO-Code = id im Kartensatz (world-atlas). */
  num: string;
  name: string;
  territorium: boolean;
  /** true, wenn der Kartensatz einen eigenen Umriss hat. */
  karte: boolean;
  /** [Länge, Breite] für Gebiete ohne eigenen Umriss. */
  punkt: [number, number] | null;
  /** Monatsmittel im Landesdurchschnitt 1991–2020: Temperatur °C, Niederschlag mm. */
  klima?: { t: number[]; n: number[] };
}

export interface Reisestil {
  id: string;
  name: string;
  beschreibung: string;
}

/**
 * alle     = laut STIKO/DTG für alle Reisenden in dieses Land
 * reiseart = wegen der gewählten Reiseart vorgeschlagen
 * moeglich = in der Ländertabelle genannt, hängt vom individuellen Risiko ab
 */
export type Stufe = 'alle' | 'reiseart' | 'moeglich';

/** Eine Zeile der Liste „Schutz und Impfungen“. */
export interface Empfehlung {
  /** Krankheits-id, siehe krankheiten.ts */
  id: string;
  /** Fehlt in der öffentlichen Fassung: dort wählt der Arzt von Hand, ohne Einstufung. */
  stufe?: Stufe;
  /** Kurze Begründung in Patientensprache. */
  grund: string;
  /** Erscheint auf dem Patientenbildschirm. */
  zeigen: boolean;
}

export interface CrmLink {
  name: string;
  url: string;
  /** Pfad zum lokal gespeicherten Kartenbild, falls geladen. */
  bild?: string;
}

/**
 * Was die Praxisfassung zusätzlich mitbringt (src/privat/reiseimpfung/index.ts): die
 * Empfehlungsdaten je Land, der automatische Vorschlag und die Malariakarten. Die öffentliche
 * Fassung hat nichts davon und lässt die Themen von Hand wählen.
 */
export interface ReisePrivat {
  quellen: { impfungen: string; malaria: string };
  fach: Record<string, LandFach>;
  /** Abschnitt der Malariakarte im CRM-Handbuch → Pfad des Kartenbilds unter public/. */
  kartenBilder: Record<string, string>;
  REISESTILE: Reisestil[];
  empfehlungenFuer: (land: Land, stile: string[], manuell: Record<string, boolean>) => Empfehlung[];
  empfehlungenGesamt: (laender: Land[], stile: string[], manuell: Record<string, boolean>) => Empfehlung[];
  nachweisAusDeutschland: (land: Land) => string | null;
  /** Arztseite: Nachweispflicht, Anmerkungen der Ländertabelle, Malariatabelle, Kartenwahl. */
  Fachteil: ComponentType<{
    land: Land;
    karten: CrmLink[];
    karteNr: number;
    karteAufBuehne: boolean;
    zeigeKarte: (nr: number) => void;
  }>;
  /** Bühnenseite „Malariagebiete“ mit der Karte des Landes. */
  MalariaSeite: ComponentType<{ land: Land; karten: CrmLink[]; nummer: number }>;
}
