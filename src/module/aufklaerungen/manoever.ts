// Befreiungsmanöver beim gutartigen Lagerungsschwindel: Schritte mit Bild für die Karten auf der
// Bühne und das Übungsblatt (/lagerungsblatt).
//
// Die Bilder sind freie Grafiken von Wikimedia Commons, umgefärbt mit
// werkzeuge/faerbe_manoever.py (liegen unter public/bilder/aufklaerungen/manoever/<datei>).
// Ein Schritt zeigt einen Ausschnitt daraus (`ausschnitt` in den Koordinaten der SVG-Datei).
//
// Seitenwahl: Die Grafik zeigt das Manöver für das Ohr `gezeichnetFuer`. Für das andere Ohr wird
// sie gespiegelt; in den Texten stehen {b} für die betroffene und {g} für die gesunde Seite
// („rechts“/„links“), {be}/{ge} für „rechte“/„linke“.

export type Ohr = 'rechts' | 'links';

export interface Grafik {
  datei: string;
  /** Größe der SVG-Fläche (viewBox), für den ganzen Ausschnitt. */
  flaeche: [number, number, number, number];
  urheber: string;
  lizenz: string;
  /** Seite auf Wikimedia Commons; fehlt bei eigenen Zeichnungen. */
  quelle?: string;
}

export interface Schritt {
  text: string;
  /** Wie lange die Stellung gehalten wird, kurz. */
  halten?: string;
  /** Ausschnitt [x, y, Breite, Höhe] aus der Grafik; ohne Angabe gibt es kein eigenes Bild. */
  ausschnitt?: [number, number, number, number];
}

export interface Manoever {
  id: string;
  name: string;
  /** Wofür, ein Satz. */
  wofuer: string;
  grafik: Grafik;
  /** Für welches Ohr die Grafik gezeichnet ist; ohne Angabe gilt sie für beide Seiten. */
  gezeichnetFuer?: Ohr;
  /** Die Grafik lässt sich nicht in Schritte zerlegen: ganz zeigen, Schritte daneben als Liste. */
  ganz?: boolean;
  schritte: Schritt[];
  /** Wie oft wiederholen. */
  wiederholen: string;
  /** Hinweis für zu Hause. */
  hinweis: string;
}

const EPLEY: Grafik = {
  datei: 'epley.svg',
  flaeche: [0, 0, 605, 482.178],
  urheber: 'C mamais',
  lizenz: 'CC BY-SA 3.0, umgefärbt',
  quelle: 'https://commons.wikimedia.org/wiki/File:Epley.svg',
};

const LEMPERT: Grafik = {
  datei: 'barbecue.svg',
  flaeche: [0, 0, 1000, 1000],
  urheber: 'Hariadhi',
  lizenz: 'CC BY-SA 4.0, umgefärbt',
  quelle: 'https://commons.wikimedia.org/wiki/File:Lampert_Maneuver_hariadhi.svg',
};

// Eigene Zeichnung (public/bilder/aufklaerungen/manoever/semont.svg, von Hand geschrieben, nicht
// von faerbe_manoever.py erzeugt): vier Felder à 400 × 300, gezeichnet für das rechte Ohr.
const SEMONT: Grafik = {
  datei: 'semont.svg',
  flaeche: [0, 0, 1600, 300],
  urheber: 'Eigene Zeichnung',
  lizenz: 'für diese App',
};

const BRANDT: Grafik = {
  datei: 'brandt-daroff.svg',
  flaeche: [52.734375, 167.96875, 890.625, 742.1875],
  urheber: 'Hariadhi',
  lizenz: 'CC BY-SA 4.0, umgefärbt',
  quelle: 'https://commons.wikimedia.org/wiki/File:Semont_maneuver_hariadhi.svg',
};

export const MANOEVER: Manoever[] = [
  {
    id: 'epley',
    name: 'Epley-Manöver',
    wofuer: 'Für den hinteren Bogengang – die häufigste Form. Auch zu Hause gut machbar.',
    grafik: EPLEY,
    gezeichnetFuer: 'links',
    schritte: [
      {
        text: 'Aufrecht aufs Bett setzen, Beine lang. Das Kissen so legen, dass es beim Zurücklegen unter den Schultern liegt. Kopf 45° nach {b} drehen.',
        ausschnitt: [222, 15, 156, 118],
      },
      {
        text: 'Zügig zurücklegen. Der Kopf bleibt nach {b} gedreht und hängt etwas nach hinten.',
        halten: '30–60 Sekunden',
        ausschnitt: [370, 203, 184, 76],
      },
      {
        text: 'Kopf langsam um 90° nach {g} drehen, ohne ihn anzuheben.',
        halten: '30–60 Sekunden',
        ausschnitt: [370, 381, 184, 76],
      },
      {
        text: 'Auf die {ge} Seite rollen und den Kopf mitdrehen, bis die Nase schräg zum Boden zeigt.',
        halten: '30–60 Sekunden',
        ausschnitt: [14, 372, 184, 76],
      },
      {
        text: 'Langsam über die {ge} Seite aufsetzen, das Kinn leicht zur Brust. Kurz sitzen bleiben.',
        ausschnitt: [42, 160, 156, 118],
      },
    ],
    wiederholen: 'Dreimal hintereinander, morgens, mittags und abends – bis Sie einen Tag lang keinen Schwindel mehr haben.',
    hinweis: 'Jede Stellung so lange halten, bis der Schwindel vorbei ist, mindestens 30 Sekunden. Dreht es sich dabei, ist das ein gutes Zeichen: Die Kristalle bewegen sich.',
  },
  {
    id: 'semont',
    name: 'Sémont-Manöver',
    wofuer: 'Für den hinteren Bogengang, so wirksam wie Epley. Gut, wenn der Kopf nicht nach hinten überstreckt werden soll.',
    grafik: SEMONT,
    gezeichnetFuer: 'rechts',
    schritte: [
      {
        text: 'In die Mitte der Bettkante setzen, Beine hängen. Kopf 45° nach {g} drehen.',
        ausschnitt: [0, 0, 400, 300],
      },
      {
        text: 'Zügig auf die {be} Seite legen. Der Kopf bleibt gedreht, das Gesicht schaut schräg nach oben.',
        halten: '1 Minute',
        ausschnitt: [400, 0, 400, 300],
      },
      {
        text: 'In einem schnellen Schwung auf die {ge} Seite. Der Kopf bleibt gedreht, die Nase zeigt jetzt zur Matratze.',
        halten: '1 Minute',
        ausschnitt: [800, 0, 400, 300],
      },
      {
        text: 'Langsam aufsetzen, Kopf gerade. Kurz sitzen bleiben.',
        ausschnitt: [1200, 0, 400, 300],
      },
    ],
    wiederholen: 'Dreimal hintereinander, morgens, mittags und abends – bis Sie einen Tag lang keinen Schwindel mehr haben.',
    hinweis: 'Der Schwung in Schritt 3 muss zügig sein, ohne Pause im Sitzen; der Kopf dreht dabei nicht mit. Beim ersten Mal setzt sich am besten jemand neben Sie.',
  },
  {
    id: 'barbecue',
    name: 'Barbecue-Rotation',
    wofuer: 'Für den seitlichen Bogengang. Meist machen wir sie gemeinsam in der Praxis.',
    grafik: LEMPERT,
    gezeichnetFuer: 'rechts',
    schritte: [
      {
        text: 'Auf den Rücken legen, Kopf leicht erhöht.',
        ausschnitt: [70, 110, 290, 230],
      },
      {
        text: 'Kopf um 90° nach {g} drehen, dann den Körper auf die {ge} Seite nachrollen.',
        halten: 'je 30–60 Sekunden',
        ausschnitt: [640, 20, 290, 320],
      },
      {
        text: 'In Vierteldrehungen weiter in dieselbe Richtung: auf den Bauch, dann auf die {be} Seite.',
        halten: 'je 30–60 Sekunden',
        ausschnitt: [70, 600, 290, 330],
      },
      {
        text: 'Zurück auf den Rücken drehen und langsam aufsetzen.',
        ausschnitt: [640, 690, 290, 250],
      },
    ],
    wiederholen: 'Einmal reicht oft. Bleibt Schwindel, wiederholen wir es oder Sie machen es nach Anleitung zu Hause.',
    hinweis: 'Welche Seite betroffen ist, ist beim seitlichen Bogengang schwerer zu erkennen – die Richtung legen wir in der Praxis fest.',
  },
  {
    id: 'brandt-daroff',
    name: 'Brandt-Daroff-Übung',
    wofuer: 'Übung für zu Hause, wenn ein Rest Schwindel bleibt oder die Seite unklar ist. Wirkt langsamer als die Manöver.',
    grafik: BRANDT,
    ganz: true,
    schritte: [
      {
        text: 'In die Mitte der Bettkante setzen, Beine hängen. Kopf 45° nach links drehen.',
      },
      {
        text: 'Zügig auf die rechte Seite legen. Der Kopf bleibt gedreht, das Gesicht schaut schräg nach oben.',
        halten: '30 Sekunden',
      },
      {
        text: 'Aufsetzen, Kopf gerade.',
        halten: '30 Sekunden',
      },
      {
        text: 'Kopf 45° nach rechts drehen und zügig auf die linke Seite legen, danach wieder aufsetzen.',
        halten: 'je 30 Sekunden',
      },
    ],
    wiederholen: 'Fünfmal zu jeder Seite, dreimal am Tag, etwa zwei Wochen lang.',
    hinweis: 'Der Schwindel bei der Übung lässt von Tag zu Tag nach – das Gleichgewichtsorgan gewöhnt sich.',
  },
];

export function findeManoever(id: string | null | undefined): Manoever | undefined {
  return MANOEVER.find((m) => m.id === id);
}

/** Setzt die Seite in einen Text ein. */
export function mitSeite(text: string, ohr: Ohr): string {
  const g: Ohr = ohr === 'rechts' ? 'links' : 'rechts';
  return text
    .replaceAll('{be}', ohr === 'rechts' ? 'rechte' : 'linke')
    .replaceAll('{ge}', g === 'rechts' ? 'rechte' : 'linke')
    .replaceAll('{b}', ohr)
    .replaceAll('{g}', g);
}

/** Ob die Grafik für dieses Ohr gespiegelt werden muss. */
export function gespiegelt(m: Manoever, ohr: Ohr): boolean {
  return m.gezeichnetFuer !== undefined && m.gezeichnetFuer !== ohr;
}

/** Ob das Manöver je nach Ohr anders aussieht (dann gibt es die Seitenwahl). */
export function seitig(m: Manoever): boolean {
  return m.gezeichnetFuer !== undefined;
}
