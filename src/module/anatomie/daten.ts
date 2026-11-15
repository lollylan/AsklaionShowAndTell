// Inhalte des Moduls „Anatomie“.
//
// Eine Region (Schulter, Herz, Ohr …) hat ein 3D-Modell (public/modelle/anatomie/<id>.glb) und
// eine Liste von Strukturen. Die id einer Struktur ist zugleich der Name des Objekts im Modell;
// welche Teile des Atlas dazugehören, steht in werkzeuge/anatomie.json.

export type Art =
  | 'knochen'
  | 'knorpel'
  | 'muskel'
  | 'band'
  | 'schleimbeutel'
  | 'nerv'
  | 'gefaess'
  | 'vene'
  /** Inneres Organ; die Farbe steht je Struktur in `farbe`. */
  | 'organ'
  /** Luft- oder flüssigkeitsgefüllter Raum, wird durchscheinend gezeigt. */
  | 'raum';

/** Blickrichtung: Drehung um die Hochachse und Neigung, beides im Bogenmaß. */
export interface Blick {
  drehY: number;
  neigX: number;
}

export const BLICKE = {
  vorn: { name: 'Von vorn', drehY: 0, neigX: 0.1 },
  seite: { name: 'Von der Seite', drehY: Math.PI / 2, neigX: 0.12 },
  hinten: { name: 'Von hinten', drehY: Math.PI, neigX: 0.12 },
  innen: { name: 'Von innen', drehY: -Math.PI / 2, neigX: 0.12 },
  schraeg: { name: 'Schräg von rechts', drehY: 0.7, neigX: 0.16 },
  schraegLinks: { name: 'Schräg von links', drehY: -0.7, neigX: 0.16 },
  oben: { name: 'Von oben', drehY: 2.85, neigX: 0.85 },
  unten: { name: 'Von unten', drehY: 0.5, neigX: -1.15 },
} satisfies Record<string, Blick & { name: string }>;

export type BlickId = keyof typeof BLICKE;

export interface Struktur {
  id: string;
  name: string;
  /** Fachbegriff, klein unter dem Namen. */
  fach: string;
  art: Art;
  gruppe: string;
  /** Aus dieser Richtung sieht man die Struktur am besten. */
  blick: BlickId;
  /**
   * Knochen, die beim Zeigen dieser Struktur durchscheinen müssen, weil sie sonst davorliegen –
   * oder 'alle', wenn die Struktur ganz im Inneren liegt.
   */
  durchsichtig?: string[] | 'alle';
  /** Strukturen, die beim Zeigen unverändert stehen bleiben, damit man die Lage erkennt. */
  mit?: string[];
  /** Eigene Farbe im Modell (sonst die Farbe der Art), z. B. '#d9a3a0'. */
  farbe?: string;
  /** Drei kurze Antworten in Patientensprache. */
  wo: string;
  wozu: string;
  beschwerden: string;
}

export interface Gruppe {
  id: string;
  name: string;
}

export type BereichId = 'bewegung' | 'organe';

export const BEREICHE: { id: BereichId; name: string }[] = [
  { id: 'bewegung', name: 'Gelenke und Knochen' },
  { id: 'organe', name: 'Organe' },
];

export interface Region {
  id: string;
  name: string;
  /** Unter welcher Überschrift die Region in der Steuerung steht (Standard: 'bewegung'). */
  bereich?: BereichId;
  /** Dritte Frage auf der Bühne (Standard: „Was kann wehtun?“). */
  frage?: string;
  /** Eigene Namen in der Farblegende, z. B. { band: 'Herzklappe' }. */
  legende?: Partial<Record<Art, string>>;
  /** Quellenzeile, wenn das Modell nicht aus Z-Anatomy stammt. */
  quelle?: string;
  /** Mit Artikel, für die Überschrift auf der Bühne. */
  titel: string;
  einleitung: string;
  /** Was das Modell zeigt, mit Artikel: „Gezeigt ist …“. */
  seite: string;
  startBlick: BlickId;
  /** Vergrößerung beim Öffnen (Standard 1). */
  startZoom?: number;
  /** Strukturen, die beim Öffnen ausgeblendet sind, weil sie sonst alles verdecken. */
  zuBeginnAus?: string[];
  /** Strukturen, die den Bildausschnitt bestimmen. */
  fokus: string[];
  gruppen: Gruppe[];
  strukturen: Struktur[];
}

import { ELLENBOGEN, HAND } from './daten/arm';
import { FUSS, HUEFTE, KNIE } from './daten/bein';
import { BWS, HWS, LWS, SCHAEDEL } from './daten/achse';
import { BECKEN, BRUSTKORB } from './daten/rumpf';
import { QUELLE } from './quellen';
import { GEHIRN, OHR } from './daten/kopf';
import { BRUSTORGANE, HERZ } from './daten/brust';
import { BAUCHORGANE, MAENNLICH, WEIBLICH } from './daten/bauch';

const SCHULTER: Region = {
  id: 'schulter',
  name: 'Schulter',
  titel: 'Die Schulter',
  einleitung:
    'Das beweglichste Gelenk des Körpers. Die Pfanne ist klein und flach – Halt geben vor allem Muskeln und Sehnen.',
  seite: 'die rechte Schulter',
  startBlick: 'vorn',
  fokus: ['schulterblatt', 'schluesselbein', 'gelenkkapsel', 'deltamuskel'],
  gruppen: [
    { id: 'knochen', name: 'Knochen' },
    { id: 'manschette', name: 'Rotatorenmanschette' },
    { id: 'muskeln', name: 'Weitere Muskeln' },
    { id: 'gelenk', name: 'Gelenk und Bänder' },
    { id: 'beutel', name: 'Schleimbeutel' },
  ],
  strukturen: [
    {
      id: 'schulterblatt',
      name: 'Schulterblatt',
      fach: 'Scapula',
      art: 'knochen',
      gruppe: 'knochen',
      blick: 'hinten',
      wo: 'Flacher, dreieckiger Knochen hinten am Brustkorb. Außen trägt er die Gelenkpfanne, oben das Schulterdach.',
      wozu: 'Er gleitet bei jeder Armbewegung auf dem Brustkorb mit und ist Ansatz für viele Muskeln.',
      beschwerden:
        'Schmerzen am Schulterblatt kommen meist von verspannten Muskeln, selten vom Knochen selbst.',
    },
    {
      id: 'schluesselbein',
      name: 'Schlüsselbein',
      fach: 'Clavicula',
      art: 'knochen',
      gruppe: 'knochen',
      blick: 'vorn',
      wo: 'Verläuft vorn vom Brustbein nach außen zum Schulterdach. Man kann es unter der Haut tasten.',
      wozu: 'Es stützt die Schulter nach außen ab – die einzige knöcherne Verbindung zwischen Arm und Rumpf.',
      beschwerden: 'Bricht bei Stürzen auf die Schulter oder den ausgestreckten Arm recht häufig.',
    },
    {
      id: 'oberarmknochen',
      name: 'Oberarmknochen',
      fach: 'Humerus',
      art: 'knochen',
      gruppe: 'knochen',
      blick: 'vorn',
      wo: 'Sein kugeliger Kopf liegt in der flachen Pfanne des Schulterblatts.',
      wozu: 'Kopf und Pfanne bilden das eigentliche Schultergelenk. An den Höckern neben dem Kopf setzen die Sehnen an.',
      beschwerden:
        'Verschleiß am Gelenkknorpel (Arthrose) oder ein Bruch am Oberarmkopf nach einem Sturz.',
    },

    {
      id: 'supraspinatus',
      name: 'Obergrätenmuskel',
      fach: 'Musculus supraspinatus',
      art: 'muskel',
      gruppe: 'manschette',
      blick: 'oben',
      wo: 'Liegt oben auf dem Schulterblatt. Seine Sehne zieht unter dem Schulterdach hindurch zum Oberarmkopf.',
      wozu: 'Er hebt den Arm zur Seite an und drückt den Oberarmkopf in die Pfanne.',
      beschwerden:
        'Unter dem Schulterdach ist es eng. Die Sehne kann dort gereizt werden, einklemmen oder einreißen – typisch ist Schmerz beim seitlichen Anheben.',
    },
    {
      id: 'infraspinatus',
      name: 'Untergräten\u00ADmuskel',
      fach: 'Musculus infraspinatus',
      art: 'muskel',
      gruppe: 'manschette',
      blick: 'hinten',
      wo: 'Bedeckt die Rückseite des Schulterblatts unterhalb der Schulterblattgräte.',
      wozu: 'Er dreht den Arm nach außen, zum Beispiel beim Haarekämmen.',
      beschwerden: 'Ist er geschädigt, fällt das Drehen des Arms nach außen schwer und schmerzt.',
    },
    {
      id: 'teres-minor',
      name: 'Kleiner Rundmuskel',
      fach: 'Musculus teres minor',
      art: 'muskel',
      gruppe: 'manschette',
      blick: 'hinten',
      wo: 'Schmaler Muskel am äußeren Rand des Schulterblatts, direkt unter dem Untergrätenmuskel.',
      wozu: 'Er hilft beim Drehen des Arms nach außen.',
      beschwerden: 'Macht allein selten Beschwerden, ist bei großen Sehnenrissen aber mitbetroffen.',
    },
    {
      id: 'subscapularis',
      name: 'Unterschulter\u00ADblattmuskel',
      fach: 'Musculus subscapularis',
      art: 'muskel',
      gruppe: 'manschette',
      blick: 'vorn',
      wo: 'Liegt auf der Vorderseite des Schulterblatts, zwischen Schulterblatt und Rippen.',
      wozu: 'Er dreht den Arm nach innen – etwa wenn Sie die Hand auf den Rücken legen.',
      beschwerden:
        'Bei einem Riss schmerzt die Schulter vorn, und die Hand lässt sich kaum hinter den Rücken führen.',
    },

    {
      id: 'deltamuskel',
      name: 'Deltamuskel',
      fach: 'Musculus deltoideus',
      art: 'muskel',
      gruppe: 'muskeln',
      blick: 'seite',
      wo: 'Liegt wie eine Kappe über der Schulter und gibt ihr die runde Form.',
      wozu: 'Der kräftigste Armheber: nach vorn, zur Seite und nach hinten.',
      beschwerden:
        'Schmerzen außen am Oberarm werden oft hier gespürt, kommen aber meist von den Sehnen darunter.',
    },
    {
      id: 'bizeps-lang',
      name: 'Lange Bizepssehne',
      fach: 'Musculus biceps brachii, Caput longum',
      art: 'muskel',
      gruppe: 'muskeln',
      blick: 'vorn',
      wo: 'Die Sehne läuft in einer Rinne vorn am Oberarmkopf und zieht durch das Gelenk bis zum Pfannenrand.',
      wozu: 'Der Bizeps beugt den Ellenbogen und dreht den Unterarm.',
      beschwerden:
        'Die Sehne kann sich in ihrer Rinne entzünden – dann schmerzt die Schulter vorn. Reißt sie, rutscht der Muskelbauch nach unten.',
    },
    {
      id: 'bizeps-kurz',
      name: 'Kurzer Bizepskopf',
      fach: 'Musculus biceps brachii, Caput breve',
      art: 'muskel',
      gruppe: 'muskeln',
      blick: 'vorn',
      wo: 'Entspringt am Rabenschnabelfortsatz, einem Knochenvorsprung vorn am Schulterblatt.',
      wozu: 'Beugt zusammen mit dem langen Kopf den Ellenbogen.',
      beschwerden: 'Macht selten Probleme.',
    },
    {
      id: 'trizeps',
      name: 'Trizeps',
      fach: 'Musculus triceps brachii',
      art: 'muskel',
      gruppe: 'muskeln',
      blick: 'hinten',
      wo: 'Liegt auf der Rückseite des Oberarms. Ein Teil entspringt unterhalb der Gelenkpfanne.',
      wozu: 'Er streckt den Ellenbogen.',
      beschwerden: 'An der Schulter selten beteiligt.',
    },
    {
      id: 'teres-major',
      name: 'Großer Rundmuskel',
      fach: 'Musculus teres major',
      art: 'muskel',
      gruppe: 'muskeln',
      blick: 'hinten',
      wo: 'Zieht von der unteren Spitze des Schulterblatts nach vorn zum Oberarm.',
      wozu: 'Er zieht den Arm an den Körper heran und dreht ihn nach innen.',
      beschwerden: 'Kann bei Überlastung verspannen, etwa nach Klimmzügen oder Rudern.',
    },
    {
      id: 'brustmuskel',
      name: 'Großer Brustmuskel',
      fach: 'Musculus pectoralis major',
      art: 'muskel',
      gruppe: 'muskeln',
      blick: 'vorn',
      wo: 'Fächerförmig vom Brustbein und Schlüsselbein zum Oberarm. Er bildet die vordere Achselfalte.',
      wozu: 'Er zieht den Arm vor den Körper und dreht ihn nach innen.',
      beschwerden: 'Ist er verkürzt, zieht er die Schulter nach vorn – das kann die Enge unter dem Schulterdach verstärken.',
    },
    {
      id: 'trapezmuskel',
      name: 'Trapezmuskel',
      fach: 'Musculus trapezius',
      art: 'muskel',
      gruppe: 'muskeln',
      blick: 'hinten',
      wo: 'Großer Muskel vom Hinterkopf über den Nacken bis zur Mitte des Rückens, außen am Schulterblatt angewachsen.',
      wozu: 'Er hebt die Schulter und führt das Schulterblatt.',
      beschwerden: 'Der klassische Ort für Nackenverspannungen.',
    },
    {
      id: 'latissimus',
      name: 'Breiter Rückenmuskel',
      fach: 'Musculus latissimus dorsi',
      art: 'muskel',
      gruppe: 'muskeln',
      blick: 'hinten',
      wo: 'Zieht vom unteren Rücken schräg nach oben zum Oberarm. Er bildet die hintere Achselfalte.',
      wozu: 'Er zieht den erhobenen Arm kräftig nach unten und hinten.',
      beschwerden: 'An der Schulter selten die Ursache von Beschwerden.',
    },

    {
      id: 'gelenkkapsel',
      name: 'Gelenkkapsel',
      fach: 'Capsula articularis',
      art: 'band',
      gruppe: 'gelenk',
      blick: 'vorn',
      wo: 'Umschließt das Schultergelenk wie ein weiter Schlauch.',
      wozu: 'Sie dichtet das Gelenk ab und ist bewusst weit, damit der Arm sich in alle Richtungen bewegen kann.',
      beschwerden:
        'Bei der Schultersteife („Frozen Shoulder“) entzündet sich die Kapsel und schrumpft – der Arm lässt sich kaum noch bewegen.',
    },
    {
      id: 'gelenklippe',
      name: 'Gelenklippe',
      fach: 'Labrum glenoidale',
      art: 'band',
      gruppe: 'gelenk',
      blick: 'seite',
      durchsichtig: ['oberarmknochen'],
      wo: 'Ein Ring aus Faserknorpel rund um den Rand der Gelenkpfanne.',
      wozu: 'Sie vergrößert und vertieft die flache Pfanne wie ein Dichtungsring.',
      beschwerden: 'Kann einreißen, wenn die Schulter auskugelt. Das Gelenk bleibt dann oft instabil.',
    },
    {
      id: 'schulterdach-band',
      name: 'Band des Schulterdachs',
      fach: 'Ligamentum coracoacromiale',
      art: 'band',
      gruppe: 'gelenk',
      blick: 'seite',
      wo: 'Spannt sich vom Rabenschnabelfortsatz zur Schulterhöhe.',
      wozu: 'Zusammen mit dem Knochen bildet es das Dach über dem Oberarmkopf.',
      beschwerden:
        'Unter diesem Dach wird es eng: Sehne und Schleimbeutel können einklemmen (Engpass-Syndrom).',
    },
    {
      id: 'schultereckgelenk',
      name: 'Schultereckgelenk',
      fach: 'Articulatio acromioclavicularis',
      art: 'band',
      gruppe: 'gelenk',
      blick: 'oben',
      wo: 'Kleines Gelenk zwischen dem äußeren Ende des Schlüsselbeins und der Schulterhöhe.',
      wozu: 'Es lässt das Schulterblatt gegen das Schlüsselbein mitdrehen.',
      beschwerden:
        'Verschleißt häufig und schmerzt dann oben auf der Schulter. Bei einem Sturz können die Bänder reißen.',
    },
    {
      id: 'rabenschnabel-baender',
      name: 'Haltebänder des Schlüsselbeins',
      fach: 'Ligamentum coracoclaviculare',
      art: 'band',
      gruppe: 'gelenk',
      blick: 'vorn',
      wo: 'Zwei kurze, kräftige Bänder vom Rabenschnabelfortsatz hinauf zum Schlüsselbein.',
      wozu: 'Sie halten das Schlüsselbein unten und tragen das Gewicht des Arms.',
      beschwerden:
        'Reißen sie bei einem Sturz auf die Schulter, steht das Schlüsselbein außen sichtbar hoch.',
    },

    {
      id: 'schleimbeutel',
      name: 'Schleimbeutel unter dem Schulterdach',
      fach: 'Bursa subacromialis',
      art: 'schleimbeutel',
      gruppe: 'beutel',
      blick: 'seite',
      wo: 'Ein flaches Gleitkissen zwischen Schulterdach und Sehnenkappe.',
      wozu: 'Er lässt die Sehnen beim Armheben reibungsarm unter dem Dach gleiten.',
      beschwerden:
        'Entzündet er sich, schwillt er an und wird eingeklemmt – oft mit starken Schmerzen in der Nacht.',
    },
  ],
};

export const REGIONEN: Region[] = [
  SCHULTER,
  ELLENBOGEN,
  HAND,
  HUEFTE,
  KNIE,
  FUSS,
  HWS,
  BWS,
  LWS,
  BRUSTKORB,
  BECKEN,
  SCHAEDEL,
  GEHIRN,
  OHR,
  BRUSTORGANE,
  HERZ,
  BAUCHORGANE,
  MAENNLICH,
  WEIBLICH,
];

export { QUELLE, QUELLE_HRA } from './quellen';

export const FRAGE_STANDARD = 'Was kann wehtun?';

export function quelleVon(region: Region): string {
  return region.quelle ?? QUELLE;
}

export function findeRegion(id: string | null): Region | undefined {
  return REGIONEN.find((g) => g.id === id);
}

export function findeStruktur(gelenk: Region | undefined, id: string | null): Struktur | undefined {
  return gelenk?.strukturen.find((s) => s.id === id);
}
