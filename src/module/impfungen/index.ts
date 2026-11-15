import { Syringe } from 'lucide-react';
import { definiereModul } from '../../kern/typen';
import { IMPFUNGEN, type GruppeId } from './daten';
import { Steuerung } from './Steuerung';
import { Buehne } from './Buehne';
import { Handzettel } from './Handzettel';

export interface ImpfZustand {
  /** Altersgruppe oder Lebenslage – bestimmt Vorschlag und gezeigtes Impfschema. */
  gruppe: GruppeId | null;
  /** Impfungen, die der Patient in der Übersicht sieht (in Reihenfolge der Liste). */
  auswahl: string[];
  /** Impfung, deren Erklärkarte der Patient gerade sieht. */
  thema: string | null;
}

export default definiereModul<ImpfZustand>({
  id: 'impfungen',
  titel: 'Standardimpfungen',
  beschreibung: 'Impfungen nach Alter und Lebenslage zeigen, Krankheit und Impfschema erklären.',
  symbol: Syringe,
  reihenfolge: 20,
  startZustand: { gruppe: null, auswahl: [], thema: null },
  Steuerung,
  Buehne,
  verzeichnis: {
    art: 'Impfung',
    eintraege: IMPFUNGEN.map((i) => ({
      id: i.id,
      titel: i.name,
      zusatz: i.zusatz ?? 'Impfung',
      begriffe: `impfung impfen ${i.kurz}`,
    })),
    aktuell: (zustand) => zustand.thema,
    oeffne: (id, alt) => ({
      ...alt,
      auswahl: alt.auswahl.includes(id) ? alt.auswahl : [...alt.auswahl, id],
      thema: id,
    }),
    Handzettel,
  },
});
