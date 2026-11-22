import { Bone } from 'lucide-react';
import { definiereModul } from '../../kern/typen';
import { Steuerung } from './Steuerung';
import { Buehne } from './Buehne';
import { Handzettel } from './Handzettel';
import { GEBIETE, KRANKHEITSBILDER, UEBUNGEN, findeKrankheitsbild, seitenVon } from './daten';

export interface Blicklage {
  drehY: number;
  neigX: number;
  zoom: number;
}

export interface OrthopaedieZustand {
  /** Krankheitsbild, das der Patient sieht – oder null. */
  thema: string | null;
  /** Aufgeschlagene Seite, ab 0 (siehe seitenVon). */
  seite: number;
  /** Groß gezeigte Übung (auf der Übungsseite oder allein aus dem Katalog) – oder null. */
  uebung: string | null;
  /** Blick auf das 3D-Modell; null = Startblick der Struktur. */
  blick: Blicklage | null;
  /** Für das Übungsblatt vorgemerkte Übungen. */
  blatt: string[];
}

/** Präfix der Übungen im Verzeichnis (Suche, Verlauf, Handzettel). */
export const UEBUNG = 'uebung-';

export default definiereModul<OrthopaedieZustand>({
  id: 'orthopaedie',
  titel: 'Orthopädie',
  beschreibung:
    'Häufige Gelenk- und Rückenbeschwerden: gesund und krank im Vergleich, am 3D-Modell und im Röntgenbild, was nachweislich hilft – und Übungen zum Mitgeben.',
  symbol: Bone,
  reihenfolge: 32,
  startZustand: { thema: null, seite: 0, uebung: null, blick: null, blatt: [] },
  Steuerung,
  Buehne,
  verzeichnis: {
    art: 'Orthopädie',
    eintraege: [
      ...KRANKHEITSBILDER.map((k) => ({
        id: k.id,
        titel: k.name,
        zusatz: k.zusatz,
        begriffe: `orthopaedie ${k.suche ?? ''} ${GEBIETE.find((g) => g.id === k.gebiet)?.name ?? ''}`,
      })),
      ...UEBUNGEN.map((u) => ({
        id: UEBUNG + u.id,
        titel: u.name,
        zusatz: 'Übung',
        begriffe: `uebung gymnastik dehnen kraeftigen ${u.ziel}`,
      })),
    ],
    aktuell: (z) => (z.uebung ? UEBUNG + z.uebung : z.thema),
    oeffne: (id, alt) =>
      id.startsWith(UEBUNG)
        ? { ...alt, thema: null, seite: 0, uebung: id.slice(UEBUNG.length), blick: null }
        : { ...alt, thema: id, seite: 0, uebung: null, blick: null },
    schritte: (id) => {
      const bild = findeKrankheitsbild(id);
      return (bild ? seitenVon(bild) : []).map((s, i) => ({
        titel: s.kurz,
        setze: (alt) => ({ ...alt, seite: i, uebung: null }),
      }));
    },
    Handzettel,
  },
});
