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
  [A + 'diabetes-typ-2', W + 'hba1c', W + 'nuechternzucker', M + 'metformin', M + 'empagliflozin', M + 'sitagliptin', M + 'semaglutid', M + 'insulin-glargin', P + 'dmp', A + 'blutzucker-messen', A + 'insulin-spritzen'],
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
  [A + 'reflux', M + 'pantoprazol', M + 'omeprazol', M + 'magaldrat', K + 'bauchorgane', A + 'gleithernie'],
  [A + 'gastritis', M + 'pantoprazol', M + 'omeprazol', M + 'magaldrat', M + 'ibuprofen', M + 'diclofenac', A + 'reflux', K + 'bauchorgane'],
  [A + 'gleithernie', A + 'reflux', M + 'pantoprazol', K + 'bauchorgane'],
  [A + 'hernie', K + 'bauchorgane', P + 'notfall'],
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

  // Kur, Reha und Hilfsmittel
  [A + 'kur-oder-reha', A + 'kurantrag', P + 'reha-antrag', A + 'wiedereingliederung'],
  [A + 'kurantrag', A + 'kur-oder-reha', P + 'reha-antrag'],
  [A + 'tens', A + 'rueckenschmerzen', A + 'arthrose', O + 'gonarthrose', O + 'hws-syndrom', O + 'tennisellenbogen', P + 'hilfsmittel'],
  [A + 'iontophorese', P + 'hilfsmittel'],
  [A + 'kompression', A + 'krampfadern', A + 'thrombose', A + 'geschwollene-beine', P + 'hilfsmittel'],
  [A + 'inhalieren', A + 'asthma', A + 'copd', M + 'salbutamol', M + 'budesonid-formoterol', A + 'lungenfunktion'],
  [A + 'gehhilfen', A + 'arthrose', O + 'gonarthrose', O + 'coxarthrose', O + 'spinalkanalstenose', P + 'hilfsmittel'],
  [A + 'blutdruck-messen', A + 'bluthochdruck', W + 'blutdruck', A + 'langzeitmessung'],
  [P + 'hilfsmittel', A + 'kompression', A + 'gehhilfen', A + 'tens', A + 'iontophorese', A + 'bandagen', A + 'einlagen', A + 'inkontinenz'],
  [A + 'bandagen', O + 'karpaltunnel', O + 'gonarthrose', A + 'arthrose', P + 'hilfsmittel'],
  [A + 'einlagen', O + 'plantarfasziitis', O + 'hallux-valgus', A + 'diabetes-typ-2', A + 'polyneuropathie', K + 'fuss', P + 'hilfsmittel'],
  [A + 'inkontinenz', A + 'harnwegsinfekt', A + 'prostatavergroesserung', P + 'hilfsmittel'],
  [A + 'blutzucker-messen', A + 'insulin-spritzen', A + 'diabetes-typ-2', W + 'hba1c', W + 'nuechternzucker'],
  [A + 'insulin-spritzen', A + 'blutzucker-messen', A + 'diabetes-typ-2', M + 'insulin-glargin', P + 'dmp'],

  // Laborwerte im Einzelnen
  [A + 'leberwerte', A + 'blutwerte', A + 'fettleber', A + 'gallensteine', A + 'ultraschall', K + 'bauchorgane'],
  [A + 'nierenwerte', A + 'blutwerte', A + 'nierenschwaeche', W + 'egfr', M + 'ibuprofen', M + 'empagliflozin'],
  [A + 'blutfette', A + 'blutwerte', A + 'cholesterin', W + 'ldl', M + 'atorvastatin', M + 'simvastatin', A + 'khk'],

  // Vorsorgedokumente und Palliativ
  [A + 'patientenverfuegung', A + 'vorsorgevollmacht', A + 'palliativversorgung'],
  [A + 'palliativversorgung', A + 'symptomlinderung', A + 'pflegegrad', M + 'tilidin', M + 'metamizol'],

  // Neu am 17.11.2026: Herz und Kreislauf
  [A + 'ohnmacht', A + 'schwindel', A + 'bluthochdruck', A + 'ekg', A + 'langzeitmessung', A + 'kompression', K + 'herz'],
  [A + 'brustschmerz', A + 'khk', K + 'herz', K + 'brustorgane', M + 'ass', A + 'ekg', A + 'thrombose', A + 'reflux', A + 'angststoerung', A + 'luftnot', P + 'notfall'],
  [A + 'gerinnungshemmer', M + 'apixaban', M + 'rivaroxaban', M + 'edoxaban', M + 'phenprocoumon', M + 'ibuprofen', M + 'diclofenac', M + 'paracetamol', M + 'metamizol', M + 'pantoprazol', A + 'vorhofflimmern', A + 'thrombose', A + 'subduralhaematom'],

  // Neu: Stoffwechsel
  [A + 'praediabetes', A + 'diabetes-typ-2', W + 'hba1c', W + 'nuechternzucker', A + 'adipositas', W + 'bmi'],
  [A + 'diabetischer-fuss', A + 'diabetes-typ-2', A + 'polyneuropathie', A + 'pavk', A + 'einlagen', K + 'fuss', P + 'dmp', P + 'hilfsmittel'],
  [A + 'schilddruesenueberfunktion', A + 'schilddruesenknoten', A + 'schilddruesenunterfunktion', W + 'tsh', M + 'bisoprolol', A + 'vorhofflimmern', A + 'ultraschall'],
  [A + 'vitamin-d-mangel', M + 'vitamin-d', A + 'osteoporose', A + 'nierenschwaeche'],
  [A + 'vitamin-b12-mangel', M + 'metformin', M + 'pantoprazol', M + 'omeprazol', A + 'gastritis', A + 'polyneuropathie', A + 'vergesslichkeit', A + 'muedigkeit', A + 'blutwerte'],

  // Neu: Infekte
  [A + 'antibiotika', M + 'amoxicillin', M + 'cefuroxim', M + 'fosfomycin', A + 'halsschmerzen', A + 'bronchitis', A + 'harnwegsinfekt'],
  [A + 'lungenentzuendung', K + 'brustorgane', M + 'amoxicillin', I + 'pneumokokken', I + 'grippe', I + 'covid-19', I + 'rsv', A + 'bronchitis', A + 'antibiotika'],
  [A + 'bindehautentzuendung', A + 'heuschnupfen', A + 'erkaeltung'],
  [A + 'scharlach', A + 'halsschmerzen', M + 'amoxicillin', M + 'ibuprofen', M + 'paracetamol', A + 'antibiotika'],

  // Neu: Rheuma
  [A + 'rheumatoide-arthritis', K + 'hand', M + 'prednisolon', M + 'ibuprofen', M + 'pantoprazol', A + 'rauchstopp', A + 'arthrose', A + 'osteoporose'],
  [A + 'polymyalgia-rheumatica', M + 'prednisolon', M + 'vitamin-d', M + 'alendronsaeure', A + 'osteoporose', K + 'huefte', A + 'kopfschmerz'],
  [A + 'fibromyalgie', A + 'schlafstoerung', A + 'muedigkeit', A + 'depression', A + 'rueckenschmerzen', A + 'tens'],

  // Neu: Seele und Älter werden
  [A + 'burnout', A + 'depression', A + 'muedigkeit', A + 'schlafstoerung', M + 'sertralin', P + 'wiedereingliederung'],
  [A + 'alkohol', A + 'fettleber', A + 'leberwerte', A + 'depression', A + 'schlafstoerung', A + 'rauchstopp'],
  [A + 'trauer', A + 'depression', A + 'schlafstoerung', M + 'mirtazapin', A + 'palliativversorgung'],
  [A + 'stuerze', A + 'osteoporose', A + 'gehhilfen', A + 'schwindel', A + 'viele-medikamente', M + 'vitamin-d', M + 'zopiclon'],
  [A + 'viele-medikamente', A + 'stuerze', A + 'nierenschwaeche', M + 'ibuprofen', M + 'zopiclon', A + 'demenz'],
  [A + 'schwerhoerigkeit', K + 'ohr', A + 'demenz', A + 'mittelohrentzuendung', A + 'schwindel'],

  // Neu: Haut
  [A + 'neurodermitis', A + 'heuschnupfen', A + 'asthma', A + 'kontaktekzem', M + 'prednisolon'],
  [A + 'schuppenflechte', A + 'rheumatoide-arthritis', A + 'bluthochdruck', A + 'adipositas', A + 'depression', A + 'rauchstopp'],
  [A + 'akne', A + 'rosazea'],
  [A + 'rosazea', A + 'akne'],
  [A + 'nesselsucht', A + 'heuschnupfen', M + 'prednisolon', M + 'ramipril', P + 'notfall'],
  [A + 'kontaktekzem', A + 'neurodermitis', M + 'prednisolon', K + 'hand'],
  [A + 'weisser-hautkrebs', A + 'melanom', V + 'hautkrebs'],
  [A + 'gerstenkorn', A + 'lidknoten', A + 'hagelkorn', A + 'bindehautentzuendung', A + 'rosazea'],
  [A + 'hagelkorn', A + 'lidknoten', A + 'gerstenkorn', A + 'rosazea'],
  [A + 'altersflecken', A + 'melanom', A + 'weisser-hautkrebs', V + 'hautkrebs'],
  [A + 'vitaminwerte', A + 'vitamin-d-mangel', A + 'vitamin-b12-mangel', A + 'blutwerte', M + 'vitamin-d', A + 'osteoporose', M + 'metformin', A + 'polyneuropathie'],
  [A + 'warzen', A + 'fusspilz', A + 'diabetes-typ-2', K + 'fuss'],
  [A + 'lippenherpes', A + 'guertelrose'],
  [A + 'wunden', I + 'tetanus', P + 'notfall', M + 'ibuprofen', M + 'paracetamol'],

  // Geschlechtskrankheiten
  [A + 'sti-test', A + 'chlamydien', A + 'tripper', A + 'syphilis', A + 'hiv', A + 'genitalherpes', A + 'feigwarzen', V + 'chlamydien'],
  [A + 'chlamydien', A + 'sti-test', A + 'tripper', V + 'chlamydien', A + 'antibiotika', K + 'weiblich', K + 'maennlich'],
  [A + 'tripper', A + 'sti-test', A + 'chlamydien', A + 'antibiotika', K + 'maennlich'],
  [A + 'syphilis', A + 'sti-test', A + 'hiv', A + 'antibiotika'],
  [A + 'hiv', A + 'sti-test', A + 'syphilis', I + 'hepatitis-b', V + 'hepatitis', P + 'notfall'],
  [A + 'genitalherpes', A + 'sti-test', A + 'lippenherpes'],
  [A + 'feigwarzen', A + 'sti-test', A + 'warzen', I + 'hpv', V + 'gebaermutterhals'],

  // Neu: Blase, Arbeit, Gesundheitswesen
  [A + 'erektionsstoerung', K + 'maennlich', A + 'khk', A + 'bluthochdruck', A + 'diabetes-typ-2', A + 'rauchstopp'],
  [A + 'harninkontinenz', A + 'inkontinenz', K + 'becken', K + 'weiblich', K + 'maennlich', A + 'prostatavergroesserung', A + 'harnwegsinfekt'],
  [A + 'krankschreibung', A + 'wiedereingliederung', P + 'wiedereingliederung'],
  [A + 'notruf-oder-bereitschaftsdienst', P + 'notfall', A + 'brustschmerz', A + 'schlaganfall', A + 'khk'],
  [A + 'ueberweisung', P + 'hausarztmodell'],
  [A + 'igel', A + 'psa', V + 'prostata'],

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
