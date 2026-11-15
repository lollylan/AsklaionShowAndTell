# Auftrag: Reisetipps je Land

Für die Reiseimpfberatung einer Hausarztpraxis in Würzburg (Patientenbildschirm, Folie „Gut zu
wissen für <Land>“). Der Arzt zeigt sie Patienten, die bald verreisen.

## Was gesucht ist

Je Land **3 bis 5 kurze, gut gemeinte Hinweise**, die man einem Reisenden mitgeben würde –
praktisch, konkret, landestypisch. Beispiele für die Art Hinweis:

- Thailand: Sonnencreme aus Deutschland mitnehmen – vor Ort enthalten viele Cremes Bleichmittel.
- Brasilien: Einen zweiten Geldbeutel mit wenig Bargeld und ein altes Zweithandy dabeihaben, die man bei einem Überfall abgeben kann.
- Leitungswasser nicht trinken, auch nicht zum Zähneputzen; Eiswürfel meiden.
- Schultern und Knie bedecken, wenn man Tempel besucht.
- In großer Höhe die ersten Tage langsam machen und viel trinken.
- Straßenhunden aus dem Weg gehen.

## Was NICHT hinein gehört

- Impfungen und Malaria-Prophylaxe (stehen auf einer eigenen Folie).
- Steckdosen/Adapter und Linksverkehr (ergänzt das Programm automatisch aus Wikidata).
- Telefonnummern, Botschaften, Visa, Einreise- und Zollbestimmungen, Krisenvorsorgeliste.
- Tagespolitik, Reisewarnungen im Wortlaut, Wertungen über das Land.
- Allgemeinplätze ohne Bezug zum Land („Reiseapotheke mitnehmen“), außer es ist dort besonders wichtig.

## Quelle

Lies für jedes Land den Artikel der **deutschen Wikivoyage** mit WebFetch, z. B.
`https://de.wikivoyage.org/wiki/Thailand` – besonders die Abschnitte Sicherheit, Gesundheit,
Regeln und Respekt, Praktische Hinweise, Klima, Küche. Fehlt der deutsche Artikel oder ist er dünn,
nimm die englische Wikivoyage (`https://en.wikivoyage.org/wiki/<Name>`, Abschnitte Stay safe,
Stay healthy, Respect). Nicht das Auswärtige Amt abrufen (der Server sperrt automatische Abrufe).
Die Tipps müssen zur Quelle passen; Allgemeinwissen nur, wenn es unstrittig und eindeutig auf
das Land zutrifft (z. B. Höhe in Bolivien, Haie/Quallen wo bekannt). Nichts erfinden. Für winzige
Gebiete ohne eigene Tipps lieber 3 solide Hinweise als 5 gestreckte.

## Sprache

- Deutsch, Patientensprache, Sie-Form oder kurze Aufforderung („Leitungswasser nicht trinken.“).
- Höchstens **130 Zeichen** je Tipp, ein bis zwei Sätze. Keine Abkürzungen, keine Emojis, keine
  Klammerwüsten. Eigene Formulierungen, keine Sätze aus der Quelle abschreiben.
- Wichtigstes zuerst.

## Kategorie je Tipp (Feld `art`, bestimmt das Sinnbild)

`sonne` · `diebstahl` · `wasser` (Trinkwasser) · `essen` · `verkehr` · `kleidung` · `gesetz`
(Gesetze, Strafen, Drogen, Fotoverbote) · `natur` (Unwetter, Regenzeit, Erdbeben, Vulkane) ·
`tiere` (Hunde, Affen, Schlangen, Quallen) · `geld` · `gesundheit` · `hoehe` · `meer`
(Strömung, Baden) · `kultur` (Kleidung in Tempeln, Gesten, Ramadan, Trinkgeld) · `sicherheit`
(Gegenden meiden, nachts, Taxis) · `strom` nur, wenn es um Stromausfälle geht.

## Ausgabe

Schreibe eine JSON-Datei (UTF-8) an den Pfad aus deinem Auftrag, Form:

```json
{
  "THA": [
    { "art": "sonne", "text": "Sonnencreme aus Deutschland mitnehmen: Viele Cremes vor Ort enthalten Bleichmittel." },
    { "art": "wasser", "text": "Nur Wasser aus verschlossenen Flaschen trinken." }
  ]
}
```

Schlüssel sind die dreistelligen Ländercodes aus deiner Liste. Jedes Land muss vorkommen. Prüfe
am Ende, dass die Datei gültiges JSON ist (z. B. mit `python -c "import json;json.load(open(...,encoding='utf8'))"`)
und nenne in deiner Antwort nur: wie viele Länder, welche ohne Wikivoyage-Artikel waren, und
Unsicherheiten, die der Arzt prüfen sollte.
