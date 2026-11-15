import { Gauge } from 'lucide-react';
import { definiereModul } from '../../kern/typen';
import { Steuerung } from './Steuerung';
import { Buehne } from './Buehne';
import { Handzettel } from './Handzettel';
import { MESSGROESSEN } from './daten';
import { verpacke } from './paket';

export interface WerteZustand {
  /** Messgröße, die der Patient gerade sieht – oder null für die Startseite. */
  groesse: string | null;
  /** Eingetippte Werte je Messgröße, als Text wie getippt („7,2“), je Teilwert einer. */
  eingaben: Record<string, string[]>;
  /** Gewähltes persönliches Ziel je Messgröße (id aus `ziele`). */
  ziel: Record<string, string | null>;
}

export default definiereModul<WerteZustand>({
  id: 'werte',
  titel: 'Werte einordnen',
  beschreibung:
    'Einen Messwert des Patienten auf einer Skala zeigen: Blutdruck, Cholesterin, Zucker, Niere, Gewicht, Schilddrüse – mit persönlichem Ziel.',
  symbol: Gauge,
  reihenfolge: 45,
  startZustand: { groesse: null, eingaben: {}, ziel: {} },
  Steuerung,
  Buehne,
  verzeichnis: {
    art: 'Messwert',
    eintraege: MESSGROESSEN.map((m) => ({
      id: m.id,
      titel: m.name,
      zusatz: m.zusatz,
      begriffe: `wert skala einordnen ${m.begriffe}`,
    })),
    aktuell: verpacke,
    oeffne: (id, alt) => ({ ...alt, groesse: id }),
    Handzettel,
  },
});
