import { PersonStanding } from 'lucide-react';
import { definiereModul } from '../../kern/typen';
import { Steuerung } from './Steuerung';
import { Buehne } from './Buehne';
import { BEREICHE, BLICKE, REGIONEN, findeRegion } from './daten';
import { KARTEN, findeKarte, type KartenId, type Seite } from './karten';
import type { Haltung } from './karten/Haut3D';

export interface AnatomieZustand {
  /** Gewählte Region (Schulter, Herz, Ohr …) – oder null für die Startseite. */
  region: string | null;
  /** Struktur, die gerade hervorgehoben und erklärt wird. */
  struktur: string | null;
  /** Ausgeblendete Strukturen (ids). */
  aus: string[];
  /** Blickrichtung auf das Modell, im Bogenmaß. */
  drehY: number;
  neigX: number;
  /** 1 = ganze Region im Bild, größer = näher. */
  zoom: number;
  /** Statt einer Region eine Körperkarte: Dermatome oder Hautnerven. */
  karte?: KartenId | null;
  /** Ausgewählte Gebiete der Karte, in der Reihenfolge der Auswahl (bestimmt die Farbe). */
  gebiete?: string[];
  /** Auf welcher Körperseite die Auswahl gezeigt wird. */
  seite?: Seite;
  /** Alle Gebiete der Karte farbig zeigen. */
  alle?: boolean;
  /** Karte flach (vorn und hinten) oder am drehbaren 3D-Körper. */
  darstellung?: 'flach' | 'raum';
  /** Armhaltung des 3D-Körpers. */
  haltung?: Haltung;
}

export default definiereModul<AnatomieZustand>({
  id: 'anatomie',
  titel: 'Anatomie',
  beschreibung:
    'Gelenke und Organe am drehbaren 3D-Modell zeigen: wo etwas liegt, wozu es da ist und was dort krank sein kann.',
  symbol: PersonStanding,
  reihenfolge: 35,
  startZustand: {
    region: null,
    struktur: null,
    aus: [],
    drehY: 0,
    neigX: 0.1,
    zoom: 1,
    karte: null,
    gebiete: [],
    seite: 'beide',
    alle: true,
    darstellung: 'flach',
    haltung: 'grund',
  },
  Steuerung,
  Buehne,
  verzeichnis: {
    art: '3D-Modell',
    eintraege: [
      ...REGIONEN.map((r) => ({
        id: r.id,
        titel: r.name,
        zusatz: BEREICHE.find((b) => b.id === (r.bereich ?? 'bewegung'))?.name,
        begriffe: `anatomie modell ${r.strukturen.map((st) => `${st.name} ${st.fach}`).join(' ')}`,
      })),
      ...KARTEN.map((k) => ({
        id: k.id,
        titel: k.name,
        zusatz: k.fach,
        begriffe: `haut nerven innervation sensibel taubheit kribbeln ${k.gebiete
          .map((g) => `${g.name} ${g.fach}`)
          .join(' ')}`,
      })),
    ],
    aktuell: (zustand) => zustand.karte ?? zustand.region,
    oeffne: (id, alt) => {
      const karte = findeKarte(id);
      if (karte) {
        if (alt.karte === karte.id) return alt;
        return { ...alt, region: null, struktur: null, karte: karte.id, gebiete: [], seite: 'beide', alle: true };
      }
      const region = findeRegion(id);
      if (!region || alt.region === id) return alt;
      const blick = BLICKE[region.startBlick];
      return {
        ...alt,
        karte: null,
        region: id,
        struktur: null,
        aus: region.zuBeginnAus ?? [],
        drehY: blick.drehY,
        neigX: blick.neigX,
        zoom: region.startZoom ?? 1,
      };
    },
  },
});
