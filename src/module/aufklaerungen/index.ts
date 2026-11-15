import { BookOpenText } from 'lucide-react';
import { definiereModul } from '../../kern/typen';
import { Steuerung } from './Steuerung';
import { Buehne } from './Buehne';
import { Handzettel } from './Handzettel';
import { GEBIETE, KRANKHEITEN } from './daten';
import type { Ohr } from './manoever';

export interface AufklaerungsZustand {
  /** Krankheit, die der Patient gerade sieht – oder null für die Startseite. */
  thema: string | null;
  /** Aufgeschlagene Seite, ab 0 (siehe seitenVon). */
  seite: number;
  /** Betroffenes Ohr für die Befreiungsmanöver beim Lagerungsschwindel; Standard rechts. */
  ohr?: Ohr;
}

export default definiereModul<AufklaerungsZustand>({
  id: 'aufklaerungen',
  titel: 'Aufklärungen',
  beschreibung:
    'Krankheiten, Beschwerden, Untersuchungen und Vorsorgedokumente erklären: was dahintersteckt, was getan wird und was man selbst tun kann.',
  symbol: BookOpenText,
  reihenfolge: 30,
  startZustand: { thema: null, seite: 0 },
  Steuerung,
  Buehne,
  verzeichnis: {
    art: 'Aufklärung',
    eintraege: KRANKHEITEN.map((k) => ({
      id: k.id,
      titel: k.name,
      zusatz: k.zusatz,
      begriffe: `${k.suche ?? ''} ${GEBIETE.find((g) => g.id === k.gebiet)?.name ?? ''}`,
    })),
    aktuell: (zustand) => zustand.thema,
    oeffne: (id) => ({ thema: id, seite: 0 }),
    Handzettel,
  },
});
