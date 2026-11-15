import { CalendarCheck } from 'lucide-react';
import { definiereModul } from '../../kern/typen';
import { UNTERSUCHUNGEN, type Geschlecht } from './daten';
import { Steuerung } from './Steuerung';
import { Buehne } from './Buehne';
import { Handzettel } from './Handzettel';

export interface VorsorgeZustand {
  geschlecht: Geschlecht | null;
  /** Alter in vollendeten Lebensjahren. */
  alter: number | null;
  /** Patient nimmt am Hausarztprogramm teil: Check-up ab 35 alle zwei statt drei Jahre. */
  hausarztmodell: boolean;
  /** Untersuchung, deren Erklärkarte der Patient gerade sieht. */
  thema: string | null;
}

export default definiereModul<VorsorgeZustand>({
  id: 'vorsorge',
  titel: 'Vorsorge',
  beschreibung:
    'Früherkennung nach Alter und Geschlecht: was jetzt ansteht, was später dazukommt, jede Untersuchung erklärt.',
  symbol: CalendarCheck,
  reihenfolge: 25,
  startZustand: { geschlecht: null, alter: null, hausarztmodell: false, thema: null },
  Steuerung,
  Buehne,
  verzeichnis: {
    art: 'Vorsorge',
    eintraege: UNTERSUCHUNGEN.map((u) => ({
      id: u.id,
      titel: u.name,
      zusatz: u.zusatz,
      begriffe: u.begriffe,
    })),
    aktuell: (zustand) => zustand.thema,
    oeffne: (id, alt) => ({ ...alt, thema: id }),
    Handzettel,
  },
});
