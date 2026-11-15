// Hautnerven: welches Hautgebiet ein bestimmter Nerv versorgt (sensible Innervation).
// Schematisch nach den gängigen Atlasdarstellungen; die Gebiete schwanken individuell und
// überlappen an den Rändern. Koordinaten siehe koerper.ts.

import { HALS_VORN, OHR_KIEFER, SCHULTERKAPPE, V1, V2, V3 } from './dermatome';
import { eck, linieVorn, oval, streifen, type Gebiet, type Karte } from './koerper';

const OBEN_VORN = 212;
const UNTEN_VORN = 505;
const OBEN_HINTEN = 196;
const UNTEN_HINTEN = 438;

/** Medianus und Radialis teilen sich den Handrücken: die Fingerkuppen gehören dem Mittelnerv. */
const RADIALIS_HAND = eck([180, 545], [260, 545], [260, 592], [203, 600], [203, 622], [180, 622]);
const MEDIANUS_RUECKEN = eck([180, 622], [203, 622], [203, 600], [260, 592], [260, 700], [180, 700]);

const WADENBEIN =
  'Der Wadenbeinnerv läuft unterhalb des Knies außen ganz flach um das Wadenbeinköpfchen. Übereinandergeschlagene Beine, ein Gips oder starkes Abnehmen können ihn dort abdrücken – dann wird es hier taub und der Fuß lässt sich schlecht anheben (Steppergang).';

const GEBIETE: Gebiet[] = [
  // ---------- Kopf und Hals ----------
  {
    id: 'trigeminus-1',
    name: 'Drillingsnerv, Stirnast',
    kurz: 'V1',
    fach: 'N. ophthalmicus (V1)',
    gruppe: 'kopf',
    vorn: V1,
    marke: { vorn: [18, 30] },
    wo: 'Stirn, Oberlid, Nasenrücken bis zur Nasenspitze und die Kopfhaut bis zum Scheitel.',
    typisch:
      'Gürtelrose an der Stirn kann das Auge mitbetreffen. Bläschen an der Nasenspitze sind ein Warnzeichen – dann bald zum Augenarzt.',
  },
  {
    id: 'trigeminus-2',
    name: 'Drillingsnerv, Oberkieferast',
    kurz: 'V2',
    fach: 'N. maxillaris (V2)',
    gruppe: 'kopf',
    vorn: V2,
    marke: { vorn: [24, 70] },
    wo: 'Wange, Unterlid, Oberlippe, Nasenflügel und die oberen Zähne.',
    typisch:
      'Trigeminusneuralgie: blitzartige, sehr heftige Schmerzattacken von Sekunden, oft ausgelöst durch Kauen, Sprechen oder Berühren.',
  },
  {
    id: 'trigeminus-3',
    name: 'Drillingsnerv, Unterkieferast',
    kurz: 'V3',
    fach: 'N. mandibularis (V3)',
    gruppe: 'kopf',
    vorn: V3,
    marke: { vorn: [16, 110] },
    wo: 'Unterlippe, Kinn, Unterkiefer, die Schläfe vor dem Ohr und die unteren Zähne.',
    typisch:
      'Auch hier kann eine Trigeminusneuralgie sitzen. Taubheit an Unterlippe und Kinn kommt nach Eingriffen an den unteren Zähnen vor.',
  },
  {
    id: 'occipitalis-major',
    name: 'Großer Hinterhauptnerv',
    kurz: 'Hinterhaupt',
    fach: 'N. occipitalis major',
    gruppe: 'kopf',
    hinten: [{ teil: 'kopf', d: eck([-1, -5], [80, -5], [80, 20], [24, 20], [24, 118], [-1, 118]) }],
    marke: { hinten: [12, 60] },
    wo: 'Hinterkopf bis zum Scheitel.',
    typisch:
      'Okzipitalneuralgie: einschießende Schmerzen vom Nacken über den Hinterkopf. Der Austrittspunkt am Hinterkopf ist druckempfindlich.',
  },
  {
    id: 'occipitalis-minor',
    name: 'Kleiner Hinterhauptnerv',
    kurz: 'klein. Hinterh.',
    fach: 'N. occipitalis minor',
    gruppe: 'kopf',
    hinten: [{ teil: 'kopf', d: eck([24, 20], [80, 20], [80, 82], [24, 82]) }],
    marke: { hinten: [38, 46] },
    wo: 'Kopfhaut seitlich am Hinterkopf, hinter und über dem Ohr.',
    typisch: 'Kann wie der große Hinterhauptnerv einschießende Schmerzen machen.',
  },
  {
    id: 'auricularis-magnus',
    name: 'Großer Ohrnerv',
    kurz: 'Ohrnerv',
    fach: 'N. auricularis magnus',
    gruppe: 'kopf',
    vorn: OHR_KIEFER,
    hinten: [{ teil: 'kopf', d: eck([24, 82], [80, 82], [80, 118], [24, 118]) }],
    marke: { vorn: [50, 64], hinten: [40, 98] },
    wo: 'Ohrläppchen, Haut hinter dem Ohr und am Kieferwinkel.',
    typisch: 'Taubheit am Ohrläppchen nach Operationen an der Ohrspeicheldrüse oder am Hals.',
  },
  {
    id: 'transversus-colli',
    name: 'Querer Halsnerv',
    kurz: 'Halsnerv',
    fach: 'N. transversus colli',
    gruppe: 'kopf',
    vorn: HALS_VORN,
    marke: { vorn: [12, 141] },
    wo: 'Vorderseite und Seite des Halses.',
    typisch:
      'Taubheit am Hals nach Operationen, etwa an Schilddrüse oder Halsschlagader – meist harmlos und oft rückläufig.',
  },
  {
    id: 'supraclaviculares',
    name: 'Schlüsselbeinnerven',
    kurz: 'Schlüsselbein',
    fach: 'Nn. supraclaviculares',
    gruppe: 'kopf',
    vorn: [
      {
        teil: 'kopf',
        d: eck([-1, 150], [80, 150], [110, 165], [140, 178], [150, 192], ...[...linieVorn(OBEN_VORN)].reverse()),
      },
      {
        teil: 'rumpf',
        d: eck([-1, 150], [80, 150], [110, 165], [140, 178], [150, 192], ...[...linieVorn(OBEN_VORN)].reverse()),
      },
      SCHULTERKAPPE,
    ],
    hinten: [
      {
        teil: 'rumpf',
        d: eck([40, 150], [80, 150], [110, 165], [140, 178], [150, 192], [150, 212], [60, 202], [40, 200]),
      },
      SCHULTERKAPPE,
    ],
    marke: { vorn: [50, 186], hinten: [70, 186] },
    wo: 'Unterer Hals, Schulterhöhe und die Haut unter dem Schlüsselbein.',
    typisch: 'Taubheit unter dem Schlüsselbein nach einem Schlüsselbeinbruch oder dessen Operation.',
  },

  // ---------- Rumpf ----------
  {
    id: 'intercostales',
    name: 'Zwischenrippennerven',
    kurz: 'Zwischenrippen',
    fach: 'Nn. intercostales',
    gruppe: 'rumpf',
    vorn: [{ teil: 'rumpf', d: streifen(linieVorn(OBEN_VORN), linieVorn(UNTEN_VORN)) }],
    hinten: [
      {
        teil: 'rumpf',
        d: eck(
          [40, OBEN_HINTEN + 4],
          [60, OBEN_HINTEN + 6],
          [150, OBEN_HINTEN + 16],
          [150, UNTEN_HINTEN + 16],
          [60, UNTEN_HINTEN + 6],
          [40, UNTEN_HINTEN + 4],
        ),
      },
    ],
    marke: { vorn: [40, 360], hinten: [68, 320] },
    wo: 'Brust und Bauch in gürtelförmigen Streifen – jeder der zwölf Nerven versorgt einen Streifen.',
    typisch:
      'Gürtelrose. Interkostalneuralgie: stechender, gürtelförmiger Schmerz, oft beim Atmen stärker, z. B. nach Rippenbruch oder Operation am Brustkorb.',
  },
  {
    id: 'rami-dorsales',
    name: 'Hintere Rückennerven',
    kurz: 'Rückenäste',
    fach: 'Rami dorsales der Spinalnerven',
    gruppe: 'rumpf',
    hinten: [
      { teil: 'kopf', d: eck([-1, 118], [80, 118], [80, 152], [-1, 152]) },
      { teil: 'rumpf', d: eck([-1, 118], [80, 118], [80, 150], [40, 160], [40, 470], [-1, 466]) },
    ],
    marke: { hinten: [20, 300] },
    wo: 'Nacken und ein Streifen neben der Wirbelsäule bis zur Lende.',
    typisch:
      'Notalgia paraesthetica: ein juckender, manchmal brennender Fleck neben dem Schulterblatt, oft bräunlich verfärbt vom vielen Kratzen.',
  },
  {
    id: 'leistennerven',
    name: 'Leistennerven',
    kurz: 'Leiste',
    fach: 'N. iliohypogastricus, N. ilioinguinalis, N. genitofemoralis',
    gruppe: 'rumpf',
    vorn: [
      {
        teil: 'rumpf',
        d: streifen(linieVorn(UNTEN_VORN), [
          [-1, 600],
          [150, 600],
        ]),
      },
      { teil: 'bein', d: eck([-1, 540], [120, 470], [72, 545], [14, 590], [-1, 590]) },
    ],
    marke: { vorn: [36, 524] },
    wo: 'Unterbauch, Leiste, oberer Innenschenkel und äußeres Genital.',
    typisch: 'Brennende Schmerzen oder Taubheit in der Leiste nach einer Leistenbruch-Operation oder einem Kaiserschnitt.',
  },
  {
    id: 'clunium',
    name: 'Gesäßnerven',
    kurz: 'Gesäß',
    fach: 'Nn. clunium',
    gruppe: 'rumpf',
    hinten: [
      {
        teil: 'rumpf',
        d:
          eck([-1, 466], [40, 470], [40, UNTEN_HINTEN + 4], [60, UNTEN_HINTEN + 6], [150, UNTEN_HINTEN + 16], [150, 640], [-1, 640]) +
          ' ' +
          oval(0, 566, 18),
      },
    ],
    marke: { hinten: [64, 520] },
    wo: 'Die Haut des Gesäßes.',
    typisch:
      'Ein eingeklemmter oberer Gesäßnerv am Beckenkamm kann Kreuzschmerzen machen, die einem Bandscheibenproblem ähneln.',
  },
  {
    id: 'pudendus',
    name: 'Schamnerv',
    kurz: 'Schamnerv',
    fach: 'N. pudendus',
    gruppe: 'rumpf',
    hinten: [{ teil: 'rumpf', d: oval(0, 566, 18) }],
    marke: { hinten: [0, 571] },
    wo: 'Rund um den After, Damm und Genitalbereich.',
    typisch:
      'Pudendusneuralgie: Schmerzen vor allem im Sitzen, z. B. nach viel Radfahren; im Stehen und Liegen besser.',
  },

  // ---------- Arm ----------
  {
    id: 'axillaris',
    name: 'Achselnerv',
    kurz: 'Achsel',
    fach: 'N. axillaris',
    gruppe: 'arm',
    vorn: [{ teil: 'arm', d: eck([126, 205], [170, 200], [170, 295], [138, 295]) }],
    hinten: [{ teil: 'arm', d: eck([112, 200], [170, 200], [170, 300], [115, 300]) }],
    marke: { vorn: [141, 250], hinten: [133, 250] },
    wo: 'Eine handtellergroße Fläche außen am Oberarm, über dem Schultermuskel.',
    typisch:
      'Nach Auskugeln der Schulter oder einem Oberarmbruch: Taubheit genau hier und Schwäche beim seitlichen Anheben des Arms.',
  },
  {
    id: 'radialis',
    name: 'Speichennerv',
    kurz: 'Speiche',
    fach: 'N. radialis',
    gruppe: 'arm',
    vorn: [{ teil: 'arm', d: eck([138, 295], [170, 295], [230, 382], [153, 382]) }],
    hinten: [
      { teil: 'arm', d: eck([115, 300], [200, 300], [200, 382], [161, 382], [147, 382]) },
      { teil: 'arm', d: eck([147, 382], [161, 382], [190, 543], [175, 543]) },
      { teil: 'arm', d: RADIALIS_HAND },
    ],
    marke: { vorn: [151, 338], hinten: [192, 575] },
    schild: { hinten: [214, 682] },
    wo: 'Rückseite von Ober- und Unterarm und der Handrücken auf der Daumenseite.',
    typisch:
      '„Parkbanklähmung“: Druck am Oberarm, etwa im tiefen Schlaf mit dem Arm über einer Lehne. Die Hand hängt herab (Fallhand), der Handrücken am Daumen ist taub. Erholt sich meist in Wochen.',
  },
  {
    id: 'musculocutaneus',
    name: 'Muskel-Haut-Nerv',
    kurz: 'Muskel-Haut',
    fach: 'N. musculocutaneus (N. cutaneus antebrachii lateralis)',
    gruppe: 'arm',
    vorn: [{ teil: 'arm', d: eck([153, 382], [260, 382], [260, 545], [183, 545]) }],
    hinten: [{ teil: 'arm', d: eck([161, 382], [260, 382], [260, 545], [190, 543]) }],
    marke: { vorn: [176, 460], hinten: [183, 470] },
    wo: 'Daumenseite des Unterarms.',
    typisch: 'Selten betroffen, z. B. nach schwerem Tragen mit gebeugtem Arm oder einer Blutabnahme in der Ellenbeuge.',
  },
  {
    id: 'cutanei-mediales',
    name: 'Hautnerven der Arminnenseite',
    kurz: 'Arminnenseite',
    fach: 'N. cutaneus brachii medialis, N. cutaneus antebrachii medialis',
    gruppe: 'arm',
    vorn: [{ teil: 'arm', d: eck([60, 205], [112, 200], [126, 205], [138, 295], [153, 382], [183, 545], [60, 548]) }],
    hinten: [{ teil: 'arm', d: eck([60, 230], [104, 230], [115, 300], [147, 382], [175, 543], [170, 548], [60, 548]) }],
    marke: { vorn: [146, 420], hinten: [148, 425] },
    wo: 'Innenseite von Ober- und Unterarm.',
    typisch: 'Selten betroffen, z. B. nach einer Blutabnahme oder Operation an der Innenseite des Ellenbogens.',
  },
  {
    id: 'medianus',
    name: 'Mittelnerv',
    kurz: 'Mittelnerv',
    fach: 'N. medianus',
    gruppe: 'arm',
    vorn: [{ teil: 'arm', d: eck([180, 548], [260, 548], [260, 700], [180, 700]) }],
    hinten: [{ teil: 'arm', d: MEDIANUS_RUECKEN }],
    marke: { vorn: [194, 590], hinten: [192, 640] },
    schild: { vorn: [214, 682], hinten: [214, 710] },
    wo: 'Handfläche auf der Daumenseite: Daumen, Zeige-, Mittel- und halber Ringfinger; auf dem Handrücken nur die Fingerkuppen.',
    typisch:
      'Karpaltunnelsyndrom: Kribbeln und Einschlafen der Finger, oft nachts – Ausschütteln hilft. Später wird der Daumenballen schwächer.',
  },
  {
    id: 'ulnaris',
    name: 'Ellennerv',
    kurz: 'Ellennerv',
    fach: 'N. ulnaris',
    gruppe: 'arm',
    vorn: [{ teil: 'arm', d: eck([60, 548], [180, 548], [180, 700], [60, 700]) }],
    hinten: [{ teil: 'arm', d: eck([60, 548], [170, 548], [175, 543], [180, 545], [180, 700], [60, 700]) }],
    marke: { vorn: [174, 590], hinten: [174, 590] },
    schild: { vorn: [214, 710], hinten: [214, 738] },
    wo: 'Kleinfinger, halber Ringfinger und die Kleinfingerseite der Hand, vorn und hinten.',
    typisch:
      'Druck am Ellenbogen („Musikantenknochen“), etwa beim Aufstützen oder wenn der Arm lange gebeugt ist: Kribbeln in Ring- und Kleinfinger, später ungeschickte Hand.',
  },

  // ---------- Bein ----------
  {
    id: 'cutaneus-femoris-lateralis',
    name: 'Seitlicher Oberschenkelhautnerv',
    kurz: 'Oberschenkel außen',
    fach: 'N. cutaneus femoris lateralis',
    gruppe: 'bein',
    vorn: [{ teil: 'bein', d: eck([72, 545], [120, 470], [150, 470], [150, 700], [85, 690], [62, 600]) }],
    hinten: [{ teil: 'bein', d: eck([85, 540], [150, 540], [150, 700], [88, 695]) }],
    marke: { vorn: [86, 610], hinten: [94, 620] },
    wo: 'Außenseite des Oberschenkels.',
    typisch:
      'Meralgia paraesthetica: Brennen und Taubheit außen am Oberschenkel, z. B. durch enge Hosen oder Gürtel, Übergewicht oder Schwangerschaft. Keine Lähmung – der Nerv versorgt nur Haut.',
  },
  {
    id: 'femoralis',
    name: 'Oberschenkelnerv',
    kurz: 'Oberschenkel',
    fach: 'N. femoralis',
    gruppe: 'bein',
    vorn: [
      {
        teil: 'bein',
        d: eck([14, 590], [72, 545], [62, 600], [85, 690], [150, 700], [150, 738], [30, 738], [34, 720], [34, 630]),
      },
    ],
    marke: { vorn: [56, 650] },
    wo: 'Vorderseite des Oberschenkels bis zum Knie.',
    typisch:
      'Selten, z. B. nach Hüftoperation oder einem Bluterguss in der Leiste: Schwäche beim Strecken des Knies, Treppensteigen fällt schwer.',
  },
  {
    id: 'obturatorius',
    name: 'Hüftlochnerv',
    kurz: 'Hüftloch',
    fach: 'N. obturatorius',
    gruppe: 'bein',
    vorn: [{ teil: 'bein', d: eck([-1, 590], [14, 590], [34, 630], [34, 720], [30, 738], [-1, 738]) }],
    hinten: [{ teil: 'bein', d: eck([-1, 560], [30, 575], [30, 740], [-1, 740]) }],
    marke: { vorn: [28, 680], hinten: [24, 680] },
    wo: 'Ein Fleck an der Innenseite des Oberschenkels.',
    typisch: 'Selten: Schmerz innen am Oberschenkel und Schwäche beim Heranziehen des Beins, z. B. nach einer Geburt oder Beckenoperation.',
  },
  {
    id: 'saphenus',
    name: 'Rosennerv',
    kurz: 'Rosennerv',
    fach: 'N. saphenus',
    gruppe: 'bein',
    vorn: [{ teil: 'bein', d: eck([-1, 738], [62, 738], [52, 800], [48, 925], [36, 960], [34, 1010], [-1, 1010]) }],
    hinten: [{ teil: 'bein', d: eck([-1, 740], [30, 740], [30, 780], [42, 780], [42, 925], [-1, 925]) }],
    marke: { vorn: [38, 845], hinten: [36, 850] },
    wo: 'Innenseite von Knie und Unterschenkel bis zum inneren Fußrand.',
    typisch: 'Taubheit innen am Unterschenkel nach einer Knie- oder Krampfaderoperation – meist harmlos.',
  },
  {
    id: 'cutaneus-femoris-posterior',
    name: 'Hinterer Oberschenkelhautnerv',
    kurz: 'Oberschenkel hinten',
    fach: 'N. cutaneus femoris posterior',
    gruppe: 'bein',
    hinten: [{ teil: 'bein', d: eck([30, 540], [85, 540], [88, 695], [150, 700], [150, 780], [30, 780]) }],
    marke: { hinten: [56, 660] },
    wo: 'Rückseite des Oberschenkels bis in die Kniekehle.',
    typisch: 'Selten; Taubheit an der Oberschenkelrückseite, z. B. nach langem Sitzen auf harter Unterlage.',
  },
  {
    id: 'cutaneus-surae-lateralis',
    name: 'Wadenbeinnerv, Wadenast',
    kurz: 'Wade außen',
    fach: 'N. cutaneus surae lateralis (aus dem N. fibularis communis)',
    gruppe: 'bein',
    vorn: [{ teil: 'bein', d: eck([52, 800], [62, 738], [150, 738], [150, 800]) }],
    hinten: [{ teil: 'bein', d: eck([64, 780], [150, 780], [150, 870], [64, 870]) }],
    marke: { vorn: [76, 770], hinten: [74, 825] },
    wo: 'Außenseite der oberen Wade.',
    typisch: WADENBEIN,
  },
  {
    id: 'fibularis-superficialis',
    name: 'Oberflächlicher Wadenbeinnerv',
    kurz: 'Fußrücken',
    fach: 'N. fibularis (peroneus) superficialis',
    gruppe: 'bein',
    vorn: [
      {
        teil: 'bein',
        d: eck(
          [52, 800], [150, 800], [150, 925], [68, 935], [72, 1010], [50, 1010], [50, 970], [36, 970],
          [36, 960], [48, 925],
        ),
      },
    ],
    marke: { vorn: [66, 880] },
    wo: 'Untere Außenseite des Unterschenkels und der Fußrücken.',
    typisch: WADENBEIN + ' Allein betroffen auch nach Umknicken des Fußes.',
  },
  {
    id: 'fibularis-profundus',
    name: 'Tiefer Wadenbeinnerv',
    kurz: '1. Zehenzwischenraum',
    fach: 'N. fibularis (peroneus) profundus',
    gruppe: 'bein',
    vorn: [{ teil: 'bein', d: eck([36, 970], [50, 970], [50, 1010], [34, 1010]) }],
    marke: { vorn: [43, 990] },
    schild: { vorn: [20, 1030] },
    wo: 'Nur die Haut zwischen Großzehe und zweiter Zehe.',
    typisch:
      'Taubheit genau hier spricht für den tiefen Ast, z. B. bei zu engem Schuh über dem Fußrücken – oft mit Schwäche beim Anheben von Fuß und Zehen.',
  },
  {
    id: 'suralis',
    name: 'Wadennerv',
    kurz: 'Wadennerv',
    fach: 'N. suralis',
    gruppe: 'bein',
    vorn: [{ teil: 'bein', d: eck([68, 935], [150, 925], [150, 1010], [72, 1010]) }],
    hinten: [
      {
        teil: 'bein',
        d: eck([42, 780], [64, 780], [64, 870], [150, 870], [150, 1010], [68, 1010], [66, 930], [42, 925]),
      },
    ],
    marke: { vorn: [76, 972], hinten: [56, 900] },
    wo: 'Hintere untere Wade, Außenknöchel und Außenkante des Fußes bis zur Kleinzehe.',
    typisch:
      'Taubheit nach einer Achillessehnen- oder Krampfaderoperation möglich. Bei Nervenschäden durch Zucker (Polyneuropathie) wird dieser Nerv oft gemessen.',
  },
  {
    id: 'tibialis',
    name: 'Schienbeinnerv',
    kurz: 'Fußsohle',
    fach: 'N. tibialis mit Nn. plantares',
    gruppe: 'bein',
    hinten: [{ teil: 'bein', d: eck([-1, 925], [42, 925], [66, 930], [68, 1010], [-1, 1010]) }],
    marke: { hinten: [48, 972] },
    wo: 'Fußsohle und Ferse.',
    typisch:
      'Tarsaltunnelsyndrom: Brennen und Kribbeln der Fußsohle durch eine Engstelle hinter dem Innenknöchel. Bei Zuckerkrankheit beginnt die Taubheit dagegen meist beidseits an Zehen und Sohle.',
  },
];

export const HAUTNERVEN: Karte = {
  id: 'hautnerven',
  name: 'Hautnerven',
  fach: 'Versorgungsgebiete der Nerven',
  einleitung:
    'Jeder Nerv versorgt ein festes Stück Haut. Ist er eingeengt oder gereizt, kribbelt, brennt oder schläft genau dieses Gebiet ein.',
  alleBeschriften: false,
  gruppen: [
    { id: 'kopf', name: 'Kopf und Hals', toene: ['#9a8ac4', '#5aa6a0', '#b4a7d6', '#80c2bb'] },
    { id: 'rumpf', name: 'Rumpf', toene: ['#d4895e', '#c2a35a', '#e6ae8a', '#b8766a'] },
    { id: 'arm', name: 'Arm und Hand', toene: ['#d8b55a', '#6f95c8', '#e6a06a', '#7fae6a'] },
    { id: 'bein', name: 'Bein und Fuß', toene: ['#7fae6a', '#6f95c8', '#d8b55a', '#b48ac4'] },
  ],
  gebiete: GEBIETE,
};
