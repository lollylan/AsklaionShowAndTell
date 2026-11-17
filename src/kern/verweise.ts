// Querverweise zwischen den Modulen („Passt dazu“ in der Steuerung).
//
// Jede Zeile ist eine Gruppe von Einträgen, die zusammengehören; wer einen davon zeigt,
// bekommt die anderen angeboten. Ein Eintrag heißt „modul:id“, so wie in den Daten des
// Moduls. Schlüssel, die es (noch) nicht gibt, werden übergangen und in der Konsole gemeldet.

import { findeFundstelle, stammVon, type Fundstelle } from './verzeichnis';

const A = 'aufklaerungen:';
const M = 'medikamente:';
const K = 'anatomie:';
const W = 'werte:';
const I = 'impfungen:';
const V = 'vorsorge:';
const P = 'ablaeufe:';
const O = 'orthopaedie:';

const GRUPPEN: string[][] = [
  // Herz und Gefäße
  [A + 'bluthochdruck', W + 'blutdruck', M + 'ramipril', M + 'candesartan', M + 'amlodipin', M + 'hct', A + 'langzeitmessung'],
  [A + 'khk', K + 'herz', M + 'ass', M + 'atorvastatin', M + 'bisoprolol', A + 'ekg', W + 'ldl', P + 'dmp'],
  [A + 'vorhofflimmern', K + 'herz', M + 'apixaban', M + 'rivaroxaban', M + 'edoxaban', M + 'bisoprolol', A + 'ekg', A + 'langzeitmessung'],
  [A + 'herzschwaeche', K + 'herz', M + 'empagliflozin', M + 'torasemid', M + 'ramipril', M + 'bisoprolol', A + 'geschwollene-beine', A + 'luftnot'],
  [A + 'schlaganfall', K + 'gehirn', A + 'vorhofflimmern', A + 'bluthochdruck', M + 'ass', M + 'clopidogrel', P + 'notfall'],
  [A + 'cholesterin', W + 'ldl', M + 'atorvastatin', M + 'simvastatin', A + 'blutwerte'],
  [A + 'thrombose', A + 'krampfadern', A + 'geschwollene-beine', M + 'apixaban', M + 'rivaroxaban'],
  [A + 'pavk', M + 'ass', M + 'clopidogrel', M + 'atorvastatin', A + 'rauchstopp'],

  // Stoffwechsel
  [A + 'diabetes-typ-2', W + 'hba1c', W + 'nuechternzucker', M + 'metformin', M + 'empagliflozin', M + 'sitagliptin', M + 'semaglutid', M + 'insulin-glargin', P + 'dmp'],
  [A + 'adipositas', W + 'bmi', M + 'semaglutid', M + 'wegovy-tablette', A + 'fettleber', A + 'schlafapnoe'],
  [A + 'schilddruesenunterfunktion', A + 'hashimoto', A + 'schilddruesenknoten', W + 'tsh', M + 'l-thyroxin', A + 'ultraschall'],
  [A + 'gicht', M + 'allopurinol', K + 'fuss'],
  [A + 'eisenmangel', M + 'eisen', A + 'blutwerte', A + 'muedigkeit'],
  [A + 'osteoporose', M + 'alendronsaeure', M + 'vitamin-d', K + 'lws'],
  [A + 'nierenschwaeche', W + 'egfr', M + 'empagliflozin', A + 'blutwerte', K + 'bauchorgane'],
  [A + 'fettleber', A + 'blutwerte', A + 'ultraschall', K + 'bauchorgane'],

  // Lunge und Infekte
  [A + 'asthma', M + 'salbutamol', M + 'budesonid-formoterol', A + 'lungenfunktion', A + 'heuschnupfen', P + 'dmp'],
  [A + 'copd', M + 'tiotropium', M + 'salbutamol', A + 'lungenfunktion', A + 'rauchstopp', K + 'brustorgane', P + 'dmp'],
  [A + 'chronischer-husten', A + 'asthma', A + 'reflux', A + 'copd', M + 'ramipril'],
  [A + 'luftnot', A + 'herzschwaeche', A + 'copd', A + 'asthma', A + 'eisenmangel', A + 'lungenfunktion'],
  [A + 'erkaeltung', A + 'bronchitis', A + 'nasennebenhoehlen', A + 'halsschmerzen', M + 'ibuprofen', M + 'paracetamol'],
  [A + 'grippe-covid', I + 'grippe', I + 'covid-19', M + 'paracetamol'],
  [A + 'mittelohrentzuendung', K + 'ohr', M + 'ibuprofen', M + 'amoxicillin'],
  [A + 'halsschmerzen', M + 'ibuprofen', M + 'amoxicillin'],
  [A + 'zeckenstich', I + 'fsme', M + 'amoxicillin'],
  [A + 'harnwegsinfekt', M + 'fosfomycin', K + 'weiblich'],
  [A + 'guertelrose', I + 'guertelrose', M + 'pregabalin', K + 'dermatome'],
  [A + 'schlafapnoe', A + 'muedigkeit', A + 'adipositas'],

  // Bauch
  [A + 'reflux', M + 'pantoprazol', M + 'omeprazol', K + 'bauchorgane'],
  [A + 'reizdarm', A + 'unvertraeglichkeiten', M + 'macrogol'],
  [A + 'gallensteine', A + 'ultraschall', K + 'bauchorgane'],
  [A + 'nierensteine', A + 'ultraschall', M + 'metamizol', M + 'tamsulosin'],
  [A + 'prostatavergroesserung', M + 'tamsulosin', A + 'psa', K + 'maennlich', V + 'prostata'],
  [A + 'darmkrebsvorsorge', V + 'darmkrebs', K + 'bauchorgane'],

  // Bewegung
  [A + 'arthrose', K + 'knie', K + 'huefte', M + 'ibuprofen', M + 'diclofenac'],
  [A + 'rueckenschmerzen', K + 'lws', K + 'hws', K + 'dermatome', M + 'ibuprofen', M + 'metamizol', P + 'reha-antrag', O + 'bandscheibenvorfall', O + 'isg-syndrom'],

  // Orthopädie
  [O + 'plantarfasziitis', O + 'achillessehne', K + 'fuss', M + 'ibuprofen'],
  [O + 'hallux-valgus', K + 'fuss'],
  [O + 'gonarthrose', A + 'arthrose', K + 'knie', M + 'ibuprofen', M + 'diclofenac', W + 'bmi'],
  [O + 'coxarthrose', A + 'arthrose', K + 'huefte', M + 'ibuprofen', M + 'diclofenac'],
  [O + 'rhizarthrose', A + 'arthrose', K + 'hand', M + 'diclofenac'],
  [O + 'karpaltunnel', K + 'hand', K + 'hautnerven', A + 'polyneuropathie'],
  [O + 'rotatorenmanschette', O + 'frozen-shoulder', K + 'schulter', M + 'ibuprofen'],
  [O + 'tennisellenbogen', K + 'ellenbogen', M + 'diclofenac'],
  [O + 'bandscheibenvorfall', O + 'spinalkanalstenose', K + 'lws', K + 'dermatome', M + 'ibuprofen', M + 'metamizol'],
  [O + 'isg-syndrom', K + 'becken', A + 'rueckenschmerzen'],
  [O + 'hws-syndrom', K + 'hws', A + 'kopfschmerz', M + 'ibuprofen'],

  // Kopf, Nerven, Seele
  [A + 'depression', M + 'sertralin', M + 'citalopram', M + 'mirtazapin', A + 'muedigkeit', P + 'wiedereingliederung'],
  [A + 'angststoerung', M + 'sertralin', M + 'citalopram', A + 'luftnot'],
  [A + 'schlafstoerung', M + 'zopiclon', M + 'mirtazapin', A + 'muedigkeit', A + 'schlafapnoe'],
  [A + 'polyneuropathie', M + 'pregabalin', A + 'diabetes-typ-2', K + 'hautnerven'],
  [A + 'migraene', A + 'kopfschmerz', M + 'ibuprofen'],
  [A + 'demenz', A + 'vergesslichkeit', K + 'gehirn', A + 'vorsorgevollmacht', A + 'pflegegrad'],
  [A + 'schwindel', K + 'ohr', A + 'bluthochdruck'],
  [A + 'vertebragener-schwindel', A + 'schwindel', A + 'lagerungsschwindel', K + 'hws', O + 'hws-syndrom'],
  [A + 'subduralhaematom', K + 'gehirn', A + 'vergesslichkeit', A + 'demenz', M + 'apixaban', M + 'ass', P + 'notfall'],
  [A + 'milzruptur', K + 'bauchorgane', A + 'ultraschall', P + 'notfall'],

  // Haut und After
  [A + 'fusspilz', A + 'diabetes-typ-2', K + 'fuss'],
  [A + 'melanom', V + 'hautkrebs'],
  [A + 'after-vergleich', A + 'haemorrhoiden', A + 'analvenenthrombose', A + 'analekzem', A + 'darmkrebsvorsorge'],
  [A + 'haemorrhoiden', A + 'analvenenthrombose', A + 'after-vergleich', M + 'macrogol', A + 'darmkrebsvorsorge'],
  [A + 'analvenenthrombose', A + 'haemorrhoiden', A + 'after-vergleich', M + 'ibuprofen'],
  [A + 'analekzem', A + 'haemorrhoiden', A + 'after-vergleich'],

  // Arbeit
  [A + 'wiedereingliederung', P + 'wiedereingliederung', P + 'reha-antrag', A + 'depression'],

  // Laborwerte im Einzelnen
  [A + 'leberwerte', A + 'blutwerte', A + 'fettleber', A + 'gallensteine', A + 'ultraschall', K + 'bauchorgane'],
  [A + 'nierenwerte', A + 'blutwerte', A + 'nierenschwaeche', W + 'egfr', M + 'ibuprofen', M + 'empagliflozin'],
  [A + 'blutfette', A + 'blutwerte', A + 'cholesterin', W + 'ldl', M + 'atorvastatin', M + 'simvastatin', A + 'khk'],

  // Vorsorgedokumente und Palliativ
  [A + 'patientenverfuegung', A + 'vorsorgevollmacht', A + 'palliativversorgung'],
  [A + 'palliativversorgung', A + 'symptomlinderung', A + 'pflegegrad', M + 'tilidin', M + 'metamizol'],

  // Abläufe
  [P + 'check-up', A + 'blutwerte', V + 'check-up', W + 'blutdruck', W + 'ldl'],
  [P + 'e-rezept', P + 'rezeptbestellung', P + 'epa'],
];

const verwandte = new Map<string, string[]>();
const unbekannt = new Set<string>();

for (const gruppe of GRUPPEN) {
  const gueltig = gruppe.filter((s) => {
    if (findeFundstelle(s)) return true;
    unbekannt.add(s);
    return false;
  });
  for (const s of gueltig) {
    const liste = verwandte.get(s) ?? [];
    for (const anderer of gueltig) {
      if (anderer !== s && !liste.includes(anderer)) liste.push(anderer);
    }
    verwandte.set(s, liste);
  }
}

if (import.meta.env.DEV && unbekannt.size > 0) {
  console.warn('Querverweise ohne Ziel (kern/verweise.ts):', [...unbekannt].join(', '));
}

/** Was zu einem Eintrag passt – höchstens `hoechstens` Stück, in der Reihenfolge der Gruppen. */
export function verwandteVon(schluessel: string | null, hoechstens = 8): Fundstelle[] {
  if (!schluessel) return [];
  return (verwandte.get(stammVon(schluessel)) ?? [])
    .map(findeFundstelle)
    .filter((f): f is Fundstelle => Boolean(f))
    .slice(0, hoechstens);
}
