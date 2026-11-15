// Dermatome: das Hautfeld jeder Nervenwurzel. Schematisch nach den gängigen Dermatomkarten
// (Foerster, Keegan/Garrett); die Grenzen schwanken von Mensch zu Mensch und überlappen.
// Koordinaten siehe koerper.ts.

import {
  eck,
  linieHinten,
  linieVorn,
  oval,
  streifen,
  type Flaeche,
  type Gebiet,
  type Karte,
} from './koerper';

// ---------- Gesicht (Drillingsnerv), auch von den Hautnerven benutzt ----------

export const V1: Flaeche[] = [
  {
    teil: 'kopf',
    d: eck([-1, -5], [80, -5], [70, 30], [50, 34], [42, 44], [34, 50], [14, 52], [8, 58], [5, 72], [-1, 72]),
  },
];
export const V2: Flaeche[] = [
  {
    teil: 'kopf',
    d: eck([-1, 72], [5, 72], [8, 58], [14, 52], [34, 50], [42, 44], [44, 66], [36, 84], [18, 92], [-1, 92]),
  },
];
export const V3: Flaeche[] = [
  {
    teil: 'kopf',
    d: eck(
      [-1, 92], [18, 92], [36, 84], [44, 66], [42, 44], [50, 34], [70, 30], [80, 44], [45, 48],
      [45, 98], [30, 116], [18, 124], [-1, 128],
    ),
  },
];
/** Ohr und Kieferwinkel. */
export const OHR_KIEFER: Flaeche[] = [
  { teil: 'kopf', d: eck([45, 48], [80, 44], [80, 130], [30, 130], [30, 116], [45, 98]) },
];
/** Vorderer Hals. */
export const HALS_VORN: Flaeche[] = [
  { teil: 'kopf', d: eck([-1, 128], [18, 124], [30, 116], [30, 130], [80, 130], [80, 150], [-1, 150]) },
];
/** Schulterkappe, die oben auf dem Arm liegt. */
export const SCHULTERKAPPE: Flaeche = {
  teil: 'arm',
  d: eck([90, 160], [170, 160], [150, 192], [106, 197], [90, 197]),
};

const C4_OBEN: [number, number][] = [
  [-1, 150],
  [80, 150],
  [110, 165],
  [140, 178],
  [150, 192],
];

// ---------- Grenzen der Rumpfstreifen (y an der Mittellinie) ----------

/** Vorn: C4/T2, T2/T3 … T12/L1. T4 liegt auf Höhe der Brustwarzen, T10 am Nabel. */
const VORN = [212, 240, 262, 288, 312, 336, 360, 384, 408, 450, 478, 505];
/** Hinten: C4/T2 … T12/L1, dann L1/L2, L2/L3, L3/Kreuzbein. */
const HINTEN = [196, 218, 240, 262, 284, 306, 328, 350, 372, 394, 416, 438, 462, 488, 515];

function rumpfVorn(i: number): Flaeche {
  return { teil: 'rumpf', d: streifen(linieVorn(VORN[i]), linieVorn(VORN[i + 1])) };
}
function rumpfHinten(i: number): Flaeche {
  return { teil: 'rumpf', d: streifen(linieHinten(HINTEN[i]), linieHinten(HINTEN[i + 1])) };
}

const GUERTELROSE =
  'Gürtelrose: brennende Schmerzen und Bläschen in genau so einem Streifen, nur auf einer Körperseite. Auch eine gereizte Nervenwurzel an der Brustwirbelsäule kann gürtelförmig ausstrahlen.';

const BRUST: { wo: string }[] = [
  { wo: 'Innenseite des Oberarms, Achsel und ein Streifen oben an der Brust.' },
  { wo: 'Streifen um den Brustkorb, knapp über den Brustwarzen.' },
  { wo: 'Streifen um den Brustkorb auf Höhe der Brustwarzen.' },
  { wo: 'Streifen um den Brustkorb knapp unter den Brustwarzen.' },
  { wo: 'Streifen um den Brustkorb bis zum unteren Ende des Brustbeins.' },
  { wo: 'Streifen vom Rücken zum Oberbauch, unter dem Brustbein.' },
  { wo: 'Streifen vom Rücken zum Oberbauch.' },
  { wo: 'Streifen vom Rücken zum Bauch, über dem Nabel.' },
  { wo: 'Streifen vom Rücken zum Bauch auf Höhe des Nabels.' },
  { wo: 'Streifen vom Rücken zum Unterbauch, unter dem Nabel.' },
  { wo: 'Streifen vom Rücken zum Unterbauch, knapp über der Leiste.' },
];

const BRUSTSTREIFEN: Gebiet[] = BRUST.map(({ wo }, i) => {
  const n = i + 2;
  const mitteVorn = (VORN[i] + VORN[i + 1]) / 2;
  const mitteHinten = (HINTEN[i] + HINTEN[i + 1]) / 2;
  const gebiet: Gebiet = {
    id: `T${n}`,
    name: `T${n}`,
    fach: `${n}. Brustnervenwurzel`,
    gruppe: 'rumpf',
    vorn: [rumpfVorn(i)],
    hinten: [rumpfHinten(i)],
    marke: { vorn: [34, mitteVorn - 3], hinten: [34, mitteHinten + 3] },
    wo,
    typisch: GUERTELROSE,
  };
  return gebiet;
});

// T2 reicht vorn und hinten bis an die Innenseite des Oberarms.
const T2_ARM: Flaeche = { teil: 'arm', d: eck([60, 197], [106, 197], [148, 355], [60, 355]) };
BRUSTSTREIFEN[0].vorn!.push(T2_ARM);
BRUSTSTREIFEN[0].hinten!.push(T2_ARM);

// ---------- Arm ----------
// Vorn die Handfläche, hinten der Handrücken; der Daumen liegt jeweils außen.

const C5_ARM = eck([106, 197], [150, 192], [230, 250], [230, 382], [153, 382]);
const T1_VORN = eck([60, 355], [148, 355], [153, 382], [168, 470], [60, 470]);
const C8_VORN = eck([60, 470], [168, 470], [183, 543], [184.5, 600], [184.5, 700], [60, 700]);
const C7_VORN = eck([183, 543], [190, 543], [193, 600], [193, 700], [184.5, 700], [184.5, 600]);
const C6_VORN = eck([153, 382], [260, 382], [260, 700], [193, 700], [193, 600], [190, 543], [183, 543]);
// Hinten zieht C7 als Streifen über die Mitte des Unterarms.
const T1_HINTEN = eck([60, 355], [148, 355], [153, 382], [147, 400], [161.7, 470], [60, 470]);
const C8_HINTEN = eck([60, 470], [161.7, 470], [177, 543], [183, 543], [184.5, 600], [184.5, 700], [60, 700]);
const C7_HINTEN = eck(
  [153, 382], [159, 400], [189, 543], [190, 543], [193, 600], [193, 700], [184.5, 700],
  [184.5, 600], [183, 543], [177, 543], [147, 400],
);
const C6_HINTEN = eck(
  [153, 382], [260, 382], [260, 700], [193, 700], [193, 600], [190, 543], [189, 543], [159, 400],
);

// ---------- Bein ----------

const L1_BEIN = eck([-1, 540], [120, 460], [150, 470], [150, 505], [6, 590], [-1, 590]);
const L2_VORN = eck([-1, 590], [6, 590], [150, 505], [150, 600], [-1, 680]);
const L3_VORN = eck([-1, 680], [150, 600], [150, 705], [-1, 750]);
const L4_VORN = eck([-1, 750], [66, 728], [58, 800], [50, 925], [36, 960], [34, 1010], [-1, 1010]);
const L5_VORN = eck(
  [66, 728], [150, 705], [150, 905], [64, 915], [70, 960], [72, 1010], [34, 1010], [36, 960],
  [50, 925], [58, 800],
);
const S1_VORN = eck([64, 915], [150, 905], [150, 1010], [72, 1010], [70, 960]);

// Hinten: Oberschenkel innen L3, Mitte S2, außen L2/L3; Wade innen L4, Mitte S2, außen L5;
// unten Ferse und Sohle (S1, innen L5 und L4).
const L2_HINTEN = eck([62, 530], [150, 530], [150, 640], [62, 650]);
const L3_HINTEN = [
  eck([-1, 560], [30, 560], [30, 745], [-1, 745]),
  eck([62, 650], [150, 640], [150, 745], [62, 745]),
];
const S2_BEIN = eck([30, 540], [62, 540], [62, 745], [58, 745], [58, 870], [40, 870], [40, 745], [30, 745]);
const L4_HINTEN = eck([-1, 745], [40, 745], [40, 925], [38, 935], [38, 1010], [-1, 1010]);
const L5_HINTEN = [
  eck([58, 745], [150, 745], [150, 860], [58, 870]),
  eck([38, 935], [48, 935], [48, 1010], [38, 1010]),
];
const S1_HINTEN = eck([40, 870], [58, 870], [150, 860], [150, 1010], [48, 1010], [48, 935], [38, 935], [40, 925]);

// ---------- Kreuzbein und After: Ringe um den After (Mitte bei y 566) ----------

const AFTER: [number, number] = [0, 566];
// Unteres Gesäß S2; seitlich, über dem großen Rollhügel, läuft L2 vom Oberschenkel herauf.
const S2_GESAESS = eck([-1, 515], [60, 521], [85, 524], [85, 640], [-1, 640]) + ' ' + oval(0, 560, 45, 44);
const L2_HUEFTE = eck([85, 524], [150, 531], [150, 640], [85, 640]);
const S3 = oval(0, 560, 45, 44) + ' ' + oval(...AFTER, 22);
const S4 = oval(...AFTER, 22) + ' ' + oval(...AFTER, 10);
const S5 = oval(...AFTER, 10);

const KAUDA =
  'Taubheit in der „Reithosen“-Gegend, dazu Probleme beim Wasserlassen oder Stuhlgang, ist ein Notfall (Kauda-Syndrom) – dann sofort ins Krankenhaus.';

const GEBIETE: Gebiet[] = [
  {
    id: 'V1',
    name: 'V1',
    kurz: 'V1',
    fach: 'Stirnast des Drillingsnervs (N. ophthalmicus)',
    gruppe: 'gesicht',
    vorn: V1,
    marke: { vorn: [18, 30] },
    wo: 'Stirn, Oberlid, Nasenrücken bis zur Nasenspitze und die Kopfhaut bis zum Scheitel.',
    typisch:
      'Gürtelrose an der Stirn kann das Auge mitbetreffen. Bläschen an der Nasenspitze sind ein Warnzeichen – dann bald zum Augenarzt.',
  },
  {
    id: 'V2',
    name: 'V2',
    fach: 'Oberkieferast des Drillingsnervs (N. maxillaris)',
    gruppe: 'gesicht',
    vorn: V2,
    marke: { vorn: [24, 70] },
    wo: 'Wange, Unterlid, Oberlippe, Nasenflügel und die oberen Zähne.',
    typisch:
      'Trigeminusneuralgie: blitzartige, sehr heftige Schmerzattacken von Sekunden, oft ausgelöst durch Kauen, Sprechen oder Berühren.',
  },
  {
    id: 'V3',
    name: 'V3',
    fach: 'Unterkieferast des Drillingsnervs (N. mandibularis)',
    gruppe: 'gesicht',
    vorn: V3,
    marke: { vorn: [16, 110] },
    wo: 'Unterlippe, Kinn, Unterkiefer, die Schläfe vor dem Ohr und die unteren Zähne.',
    typisch:
      'Auch hier kann eine Trigeminusneuralgie sitzen. Taubheit an Unterlippe und Kinn kommt nach Eingriffen an den unteren Zähnen vor.',
  },
  {
    id: 'C2',
    name: 'C2',
    fach: '2. Halsnervenwurzel',
    gruppe: 'hals',
    vorn: OHR_KIEFER,
    hinten: [{ teil: 'kopf', d: eck([-1, -5], [80, -5], [80, 110], [-1, 110]) }],
    marke: { vorn: [50, 64], hinten: [22, 56] },
    wo: 'Hinterkopf bis zum Scheitel, Ohr und Kieferwinkel.',
    typisch:
      'Schmerzen, die vom Nacken in den Hinterkopf ziehen, kommen oft aus der oberen Halswirbelsäule und ihren Muskeln.',
  },
  {
    id: 'C3',
    name: 'C3',
    fach: '3. Halsnervenwurzel',
    gruppe: 'hals',
    vorn: HALS_VORN,
    hinten: [{ teil: 'kopf', d: eck([-1, 110], [80, 110], [80, 150], [-1, 150]) }],
    marke: { vorn: [12, 141], hinten: [12, 132] },
    wo: 'Hals und Nacken.',
    typisch: 'Selten allein betroffen. Nackenschmerzen kommen meist von verspannten Muskeln.',
  },
  {
    id: 'C4',
    name: 'C4',
    fach: '4. Halsnervenwurzel',
    gruppe: 'hals',
    vorn: [
      { teil: 'kopf', d: eck(...C4_OBEN, ...[...linieVorn(VORN[0])].reverse()) },
      { teil: 'rumpf', d: eck(...C4_OBEN, ...[...linieVorn(VORN[0])].reverse()) },
      SCHULTERKAPPE,
    ],
    hinten: [
      { teil: 'kopf', d: eck(...C4_OBEN, ...[...linieHinten(HINTEN[0])].reverse()) },
      { teil: 'rumpf', d: eck(...C4_OBEN, ...[...linieHinten(HINTEN[0])].reverse()) },
      SCHULTERKAPPE,
    ],
    marke: { vorn: [50, 186], hinten: [50, 182] },
    wo: 'Unterer Hals, Schulterhöhe und ein Streifen unter dem Schlüsselbein.',
    typisch:
      'Schmerz auf der Schulterhöhe kann auch vom Zwerchfell kommen, das aus denselben Wurzeln versorgt wird – etwa bei Gallenblase oder Milz.',
  },
  {
    id: 'C5',
    name: 'C5',
    fach: '5. Halsnervenwurzel',
    gruppe: 'arm',
    vorn: [{ teil: 'arm', d: C5_ARM }],
    hinten: [{ teil: 'arm', d: C5_ARM }],
    marke: { vorn: [139, 285], hinten: [139, 285] },
    wo: 'Außenseite des Oberarms über dem Schultermuskel bis zum Ellenbogen.',
    typisch:
      'Bandscheibenvorfall zwischen 4. und 5. Halswirbel (selten): Schmerz außen am Oberarm, Schwäche beim seitlichen Anheben des Arms.',
  },
  {
    id: 'C6',
    name: 'C6',
    fach: '6. Halsnervenwurzel',
    gruppe: 'arm',
    vorn: [{ teil: 'arm', d: C6_VORN }],
    hinten: [{ teil: 'arm', d: C6_HINTEN }],
    marke: { vorn: [176, 455], hinten: [181, 455] },
    wo: 'Daumenseite des Unterarms, Daumen und Zeigefinger.',
    typisch:
      'Bandscheibenvorfall zwischen 5. und 6. Halswirbel: Kribbeln bis in den Daumen, Schwäche beim Beugen im Ellenbogen, abgeschwächter Bizepsreflex.',
  },
  {
    id: 'C7',
    name: 'C7',
    fach: '7. Halsnervenwurzel',
    gruppe: 'arm',
    vorn: [{ teil: 'arm', d: C7_VORN }],
    hinten: [{ teil: 'arm', d: C7_HINTEN }],
    marke: { vorn: [189, 628], hinten: [189, 628] },
    schild: { vorn: [214, 682], hinten: [214, 682] },
    wo: 'Mittelfinger, Mitte von Handfläche und Handrücken, hinten ein Streifen über den Unterarm.',
    typisch:
      'Die häufigste Wurzel am Hals: Bandscheibenvorfall zwischen 6. und 7. Halswirbel. Kribbeln im Mittelfinger, Schwäche beim Strecken des Arms, abgeschwächter Trizepsreflex.',
  },
  {
    id: 'C8',
    name: 'C8',
    fach: '8. Halsnervenwurzel',
    gruppe: 'arm',
    vorn: [{ teil: 'arm', d: C8_VORN }],
    hinten: [{ teil: 'arm', d: C8_HINTEN }],
    marke: { vorn: [176, 580], hinten: [176, 580] },
    schild: { vorn: [214, 708], hinten: [214, 708] },
    wo: 'Ring- und Kleinfinger, Kleinfingerseite von Hand und unterem Unterarm.',
    typisch:
      'Bandscheibenvorfall zwischen 7. Hals- und 1. Brustwirbel; Schwäche der kleinen Handmuskeln. Ganz ähnlich fühlt es sich an, wenn der Ellennerv am Ellenbogen gedrückt wird.',
  },
  {
    id: 'T1',
    name: 'T1',
    fach: '1. Brustnervenwurzel',
    gruppe: 'arm',
    vorn: [{ teil: 'arm', d: T1_VORN }],
    hinten: [{ teil: 'arm', d: T1_HINTEN }],
    marke: { vorn: [151, 424], hinten: [149, 424] },
    wo: 'Innenseite des Unterarms bis zum Ellenbogen.',
    typisch: 'Selten allein betroffen.',
  },
  ...BRUSTSTREIFEN,
  {
    id: 'L1',
    name: 'L1',
    fach: '1. Lendennervenwurzel',
    gruppe: 'bein',
    vorn: [
      {
        teil: 'rumpf',
        d: streifen(linieVorn(VORN[11]), [
          [-1, 600],
          [150, 600],
        ]),
      },
      { teil: 'bein', d: L1_BEIN },
    ],
    hinten: [{ teil: 'rumpf', d: streifen(linieHinten(HINTEN[11]), linieHinten(HINTEN[12])) }],
    marke: { vorn: [36, 520], hinten: [34, 453] },
    wo: 'Leiste und ein schmaler Streifen oben am Oberschenkel; hinten ein Streifen über dem Gesäß.',
    typisch:
      'Selten von der Wirbelsäule. Schmerzen in der Leiste haben häufiger andere Gründe, etwa Hüfte oder Leistenbruch.',
  },
  {
    id: 'L2',
    name: 'L2',
    fach: '2. Lendennervenwurzel',
    gruppe: 'bein',
    vorn: [{ teil: 'bein', d: L2_VORN }],
    hinten: [
      { teil: 'rumpf', d: streifen(linieHinten(HINTEN[12]), linieHinten(HINTEN[13])) },
      { teil: 'rumpf', d: L2_HUEFTE },
      { teil: 'bein', d: L2_HINTEN },
    ],
    marke: { vorn: [70, 595], hinten: [86, 600] },
    wo: 'Vorderseite des oberen Oberschenkels, schräg nach innen laufend; hinten über dem Gesäß.',
    typisch: 'Bandscheibenvorfälle so weit oben an der Lendenwirbelsäule sind selten.',
  },
  {
    id: 'L3',
    name: 'L3',
    fach: '3. Lendennervenwurzel',
    gruppe: 'bein',
    vorn: [{ teil: 'bein', d: L3_VORN }],
    hinten: [
      { teil: 'rumpf', d: streifen(linieHinten(HINTEN[13]), linieHinten(HINTEN[14])) },
      ...L3_HINTEN.map((d) => ({ teil: 'bein' as const, d })),
    ],
    marke: { vorn: [52, 690], hinten: [90, 700] },
    wo: 'Vorderseite des Oberschenkels bis zur Innenseite des Knies.',
    typisch:
      'Bandscheibenvorfall an der oberen Lendenwirbelsäule: Schmerz vorn am Oberschenkel, Schwäche beim Strecken des Knies, abgeschwächter Kniesehnenreflex.',
  },
  {
    id: 'L4',
    name: 'L4',
    fach: '4. Lendennervenwurzel',
    gruppe: 'bein',
    vorn: [{ teil: 'bein', d: L4_VORN }],
    hinten: [{ teil: 'bein', d: L4_HINTEN }],
    marke: { vorn: [38, 845], hinten: [34, 830] },
    wo: 'Knie und Innenseite des Unterschenkels bis zum inneren Knöchel und Fußrand.',
    typisch:
      'Bandscheibenvorfall zwischen 3. und 4. Lendenwirbel: Schwäche beim Strecken des Knies, abgeschwächter Kniesehnenreflex.',
  },
  {
    id: 'L5',
    name: 'L5',
    fach: '5. Lendennervenwurzel',
    gruppe: 'bein',
    vorn: [{ teil: 'bein', d: L5_VORN }],
    hinten: L5_HINTEN.map((d) => ({ teil: 'bein' as const, d })),
    marke: { vorn: [68, 850], hinten: [72, 800] },
    wo: 'Außenseite des Unterschenkels, Fußrücken und Großzehe.',
    typisch:
      'Sehr häufig: Bandscheibenvorfall zwischen 4. und 5. Lendenwirbel. Schwäche beim Anheben von Großzehe und Fuß – der Fersengang fällt schwer.',
  },
  {
    id: 'S1',
    name: 'S1',
    fach: '1. Kreuzbeinnervenwurzel',
    gruppe: 'kreuz',
    vorn: [{ teil: 'bein', d: S1_VORN }],
    hinten: [{ teil: 'bein', d: S1_HINTEN }],
    marke: { vorn: [76, 972], hinten: [62, 972] },
    wo: 'Untere Wade, Ferse, Fußsohle, Außenkante des Fußes und Kleinzehe.',
    typisch:
      'Sehr häufig: Bandscheibenvorfall zwischen 5. Lendenwirbel und Kreuzbein. Der Zehenspitzengang fällt schwer, der Achillessehnenreflex ist abgeschwächt.',
  },
  {
    id: 'S2',
    name: 'S2',
    fach: '2. Kreuzbeinnervenwurzel',
    gruppe: 'kreuz',
    hinten: [
      { teil: 'rumpf', d: S2_GESAESS },
      { teil: 'bein', d: S2_BEIN },
    ],
    marke: { hinten: [46, 690] },
    wo: 'Rückseite von Oberschenkel und Wade, unteres Gesäß.',
    typisch: 'Meist zusammen mit S1 betroffen.',
  },
  {
    id: 'S3',
    name: 'S3',
    fach: '3. Kreuzbeinnervenwurzel',
    gruppe: 'kreuz',
    hinten: [{ teil: 'rumpf', d: S3 }],
    marke: { hinten: [32, 540] },
    wo: 'Innere Hälfte des Gesäßes, rund um die Gesäßspalte.',
    typisch: KAUDA,
  },
  {
    id: 'S4',
    name: 'S4',
    fach: '4. Kreuzbeinnervenwurzel',
    gruppe: 'kreuz',
    hinten: [{ teil: 'rumpf', d: S4 }],
    marke: { hinten: [16, 556] },
    wo: 'Ring um den After und der Damm.',
    typisch: KAUDA,
  },
  {
    id: 'S5',
    name: 'S5',
    fach: '5. Kreuzbeinnervenwurzel',
    gruppe: 'kreuz',
    hinten: [{ teil: 'rumpf', d: S5 }],
    marke: { hinten: [0, 570] },
    wo: 'Die Haut direkt am After.',
    typisch: KAUDA,
  },
];

export const DERMATOME: Karte = {
  id: 'dermatome',
  name: 'Dermatome',
  fach: 'Hautfelder der Nervenwurzeln',
  einleitung:
    'Aus jedem Abschnitt der Wirbelsäule tritt eine Nervenwurzel aus. Jede versorgt einen eigenen Streifen Haut. Wo es kribbelt, brennt oder taub ist, verrät, welche Wurzel gereizt ist.',
  alleBeschriften: true,
  gruppen: [
    { id: 'gesicht', name: 'Gesicht (Drillingsnerv)', toene: ['#9a8ac4', '#b4a7d6', '#8373b0'] },
    { id: 'hals', name: 'Hals (C2–C4)', toene: ['#5aa6a0', '#80c2bb', '#468f89'] },
    { id: 'arm', name: 'Arm (C5–T1)', toene: ['#d8b55a', '#ead08c', '#c09a3c'] },
    { id: 'rumpf', name: 'Rumpf (T2–T12)', toene: ['#d4895e', '#e6ae8a', '#bd7148'] },
    { id: 'bein', name: 'Bein (L1–L5)', toene: ['#7fae6a', '#a2c98f', '#68965a'] },
    { id: 'kreuz', name: 'Kreuzbein (S1–S5)', toene: ['#6f95c8', '#95b4dc', '#5a7fb3'] },
  ],
  gebiete: GEBIETE,
};
