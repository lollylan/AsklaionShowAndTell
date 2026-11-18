# Übersetzen für Patientenbildschirm und Handzettel

Die Steuerung bleibt deutsch. Bühne und Handzettel werden über Wörterbücher übersetzt:
`src/sprachen/texte/<code>/*.json`, je Datei ein Objekt `{ "deutscher Text": "Übersetzung" }`.
Die App führt alle Dateien einer Sprache zusammen; was fehlt, erscheint auf Deutsch, und die
Steuerung zeigt unter der Vorschau an, wie viele Texte des aktuellen Bilds noch fehlen.

## Ablauf

1. `node werkzeuge/sammle_texte.mjs` sammelt alle Texte (`src/sprachen/quelle.json`) und zeigt
   den Stand je Sprache.
2. `node werkzeuge/sammle_texte.mjs --offen en` (oder `--offen alle`) schreibt die fehlenden
   Texte als Arbeitspakete nach `werkzeuge/uebersetzung/offen/<code>/NNN-<bereich>.json`
   (nicht im Repo). Werte sind leer.
3. Jedes Paket wird übersetzt und unter demselben Namen nach `src/sprachen/texte/<code>/`
   gelegt – Pakete mit „privat“ im Namen (Texte aus `src/privat`) stattdessen nach
   `src/privat/sprachen/<code>/`, damit sie nicht in Demo und öffentlichen Quelltext geraten. Die Schlüssel bleiben **unverändert** (Zeichen für Zeichen), nur die Werte werden gefüllt.
4. Ländernamen kommen automatisch aus `i18n-iso-countries`:
   `node werkzeuge/sammle_texte.mjs --laender`.

## Regeln für die Übersetzung

- **Zielgruppe:** Patientinnen und Patienten einer Hausarztpraxis, oft ohne Vorwissen. Einfache,
  klare Alltagssprache wie im deutschen Text, kurze Sätze. Medizinisch genau: nichts weglassen,
  nichts hinzufügen, keine Zahlen, Grenzwerte, Dosierungen oder Zeitangaben ändern.
- **Anrede:** höflich-förmlich: Englisch „you“, Französisch „vous“, Russisch „Вы“, Ukrainisch
  „Ви“, Rumänisch „dumneavoastră“, Türkisch „siz“, Polnisch neutrale Höflichkeitsformen
  („Proszę…“, „Należy…“, unpersönlich) statt „Pan/Pani“, Chinesisch „您“, Japanisch です/ます-Form,
  Koreanisch höfliche 합니다/해요-Form, Arabisch einfaches Hocharabisch (فصحى), Persisch höflich
  mit „شما“.
- **Bruchstücke:** Manche Schlüssel sind Teile eines Satzes, die die App zusammensetzt (sie beginnen
  oder enden z. B. mit „, “, „:“, „(“, „–“ oder einem Leerzeichen-Wort wie „für“). Diese Ränder
  beibehalten und das Bruchstück so übersetzen, dass es an derselben Stelle passt.
- **Beschriftungen in Zeichnungen** (kurze Wörter wie „Herz“, „Niere“, „Normal“): ebenso kurz
  übersetzen, sie stehen in engen Feldern. Abkürzungen (mmHg, mg/dl, HbA1c, EKG → ECG usw.) im
  Zielland üblich schreiben; bei Unsicherheit die internationale Form.
- **Nicht übersetzen:** Praxis- und Personennamen (Name der Praxis, Asklaion Show and
  Tell), Markennamen von Medikamenten, Lizenzen (CC BY-SA …), Notrufnummer 112, 116 117.
  Deutsche Einrichtungen (Krankenkasse, Hausarztmodell, Rentenversicherung, Pflegegrad, ePA,
  E-Rezept) sinngemäß übersetzen und beim ersten Vorkommen den deutschen Begriff in Klammern
  ergänzen, z. B. „health insurance (Krankenkasse)“ – der Patient begegnet ihm auf Papieren.
- **Zahlen und Einheiten** wie im Original; Dezimalkomma nach Zielsprache (Englisch 1.5,
  Französisch 1,5 usw.). Zahlen nicht in andere Ziffernsysteme umschreiben (auch Arabisch und
  Persisch: westliche Ziffern 0–9 behalten, damit Werte mit den Befunden übereinstimmen).
- **Ausgabe:** gültiges JSON, UTF-8, dieselben Schlüssel in derselben Reihenfolge, jeder Wert
  gefüllt. Prüfen mit `node -e "JSON.parse(require('fs').readFileSync('<datei>','utf8'))"`.

## Schablonen für zusammengesetzte Texte

Texte, die die App erst beim Zeichnen zusammensetzt („71,6 Millionen“, „etwa 3-mal so groß wie
Bayern“, „Paschto, Dari“), stehen nicht wörtlich im Wörterbuch. Dafür gibt es Schablonen mit
`{0}`, `{1}` (Reisemodul: `texte/<code>/muster-reise.json`, Logik in `src/sprachen/muster.ts`).
Die Lücken werden gefüllt: deutsche Zahlen in Landesschreibweise, Wörter über das Wörterbuch,
Listen mit Komma Glied für Glied. Geht ein Teil nicht auf, bleibt der ganze Text deutsch.
In der Zielschablone zusätzlich: `{0*100}` (Zahl mal 100, für 万/億/만) und
`[0:one=…;few=…;many=…;other=…]` (Wort nach der Pluralregel der Sprache für Lücke 0).
Listen mit Komma aus lauter bekannten Gliedern werden auch ohne Schablone übersetzt.
