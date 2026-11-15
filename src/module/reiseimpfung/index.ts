import { Globe } from 'lucide-react';
import { definiereModul } from '../../kern/typen';
import { Steuerung } from './Steuerung';
import { Buehne } from './Buehne';
import { LAENDER } from './daten';
import type { Seite } from './Laenderseiten';
import { Handzettel, verpacke } from './Handzettel';

export interface ReiseZustand {
  /** Gewählte Reiseziele als ISO-3-Codes, in Reihenfolge der Route. */
  ziele: string[];
  /** Land, das gerade besprochen wird – null zeigt die Übersicht der ganzen Reise. */
  aktiv: string | null;
  /** Gewählte Reisearten (ids aus logik.ts). */
  stile: string[];
  /** Vom Arzt von Hand ein- oder ausgeblendete Einträge (Krankheits-id → zeigen). */
  manuell: Record<string, boolean>;
  /** Krankheit, deren Erklärkarte der Patient gerade sieht. */
  thema: string | null;
  /** Seite zum aktiven Land: Impfungen (Globus), Steckbrief, Karte, Reisetipps, Klima. */
  seite?: Seite;
  /** Welche Malariakarte gezeigt wird (Index in malariakartenFuer, 0 = ganzes Land bzw. erste Region). */
  malariakarte?: number;
}

export default definiereModul<ReiseZustand>({
  id: 'reiseimpfung',
  titel: 'Reiseimpfberatung',
  beschreibung:
    'Reiseziele und Reiseart wählen, Länder einzeln durchgehen und Krankheiten erklären.',
  symbol: Globe,
  reihenfolge: 10,
  startZustand: { ziele: [], aktiv: null, stile: [], manuell: {}, thema: null, seite: 'impfungen' },
  Steuerung,
  Buehne,
  verzeichnis: {
    art: 'Reiseziel',
    eintraege: LAENDER.map((land) => ({
      id: land.iso3,
      titel: land.name,
      zusatz: 'Reiseimpfberatung',
      begriffe: `reise impfung malaria ${land.iso2} ${land.iso3}`,
    })),
    aktuell: (zustand) =>
      zustand.aktiv ? verpacke(zustand.aktiv, zustand.stile, zustand.manuell) : null,
    oeffne: (id, alt) => ({
      ...alt,
      ziele: alt.ziele.includes(id) ? alt.ziele : [...alt.ziele, id],
      aktiv: id,
      thema: null,
      seite: 'impfungen',
    }),
    Handzettel,
  },
});
