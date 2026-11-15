import { Pill } from 'lucide-react';
import { definiereModul } from '../../kern/typen';
import { Steuerung } from './Steuerung';
import { Buehne } from './Buehne';
import { Handzettel } from './Handzettel';
import { MEDIKAMENTE } from './daten';

export interface MedikamentenZustand {
  /** Medikament, das der Patient gerade sieht – oder null für die Startseite. */
  thema: string | null;
  /** Aufgeschlagene Seite, 0 bis 3 (siehe SEITEN). */
  seite: number;
}

export default definiereModul<MedikamentenZustand>({
  id: 'medikamente',
  titel: 'Medikamente',
  beschreibung:
    'Häufige Medikamente erklären: wofür sie sind, wie man sie einnimmt, mögliche Nebenwirkungen und worauf zu achten ist.',
  symbol: Pill,
  reihenfolge: 40,
  startZustand: { thema: null, seite: 0 },
  Steuerung,
  Buehne,
  verzeichnis: {
    art: 'Medikament',
    eintraege: MEDIKAMENTE.map((m) => ({
      id: m.id,
      titel: m.name,
      zusatz: m.handelsnamen.slice(0, 2).join(', '),
      begriffe: `${m.zusatz} ${m.handelsnamen.join(' ')} ${m.suche ?? ''}`,
    })),
    aktuell: (zustand) => zustand.thema,
    oeffne: (id) => ({ thema: id, seite: 0 }),
    Handzettel,
  },
});
