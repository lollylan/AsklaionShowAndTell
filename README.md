# Asklaion Show and Tell

Patientenaufklärung auf zwei Bildschirmen: An der Steuerung wählt die Ärztin oder der Arzt aus,
was der Patient auf seinem Bildschirm sieht – Zeichnungen, 3D-Modelle, Erklärtexte, Karten.

**Demo:** https://lollylan.github.io/AsklaionShowAndTell/

> **Wichtiger Hinweis:** Alle Inhalte – Texte, Zeichnungen, Zahlen und Empfehlungen – sind nach
> bestem Wissen und Gewissen erstellt, aber nicht in jedem Punkt fachlich geprüft und können
> Fehler enthalten. Sie dienen **nur zu Demonstrationszwecken**: um zu zeigen, wie die App
> funktioniert. Sie sind nicht zum Nachschlagen, zur Recherche oder als Grundlage für
> Behandlungsentscheidungen gedacht.
>
> **Wenn Ihnen ein Fehler auffällt, schreiben Sie mir bitte unbedingt:**
> [florian.rasche+asklaion@googlemail.com](mailto:florian.rasche+asklaion@googlemail.com)

## Zweck

Information und Aufklärung, keine Diagnose- oder Therapieempfehlung. Ersetzt nicht die ärztliche
Indikationsstellung.

Die App erhebt keine Befunde, wertet keine Patientendaten aus und schlägt keine Behandlung vor.
In der Reiseberatung ordnet sie keinem Land Impfungen oder eine Malariaprophylaxe zu; die Themen
werden von Hand gewählt. Altersangaben bei Impfungen und Vorsorge geben den öffentlichen
STIKO-Impfkalender und die Früherkennungsrichtlinien des G-BA vereinfacht wieder.

## Ausprobieren

1. Demo öffnen – das ist die Steuerung.
2. Rechts „Patientenbildschirm öffnen“ wählen und das neue Fenster auf einen zweiten Monitor
   ziehen (oder daneben stellen).
3. Links ein Modul wählen und etwas zeigen.

Die Demo läuft ohne Server. Steuerung und Patientenfenster müssen deshalb im selben Browser auf
demselben Rechner geöffnet sein. Gespeichert wird nichts außerhalb des Browsers. Bitte keine
echten Patientendaten eingeben.

## Was hier liegt

| Zweig | Inhalt |
| --- | --- |
| `main` | der Quelltext – zum Nachbauen und Anpassen |
| `gh-pages` | die fertig gebaute Demo, wie sie unter der Adresse oben läuft |

Der Quelltext ist die öffentliche Fassung einer Praxisanwendung. Was nicht veröffentlicht werden
darf, fehlt hier von vornherein und wird vor jeder Veröffentlichung automatisch geprüft:

- die Zuordnung von Impfungen und Malariaprophylaxe zu Ländern und Reisearten samt den Daten dazu,
- Verbreitungskarten, Packungsfotos und Fotos ohne freie Lizenz,
- Name, Logo und Abläufe der Praxis.

Die Symbol- und Übungsbilder wurden mit einem KI-Bildgenerator erzeugt. Quellen und Lizenzen
aller enthaltenen Bilder, Modelle und Daten stehen in der App unter „Quellen, Hinweise,
Impressum“ (`/info`). Die 3D-Modelle beruhen auf Z-Anatomy (CC BY-SA 4.0) und dem Human
Reference Atlas (CC BY 4.0); die daraus abgeleiteten Modelle stehen unter derselben Lizenz.

## Selbst bauen

Gebraucht wird Node.js ab Version 22.

```bash
npm install
```

```bash
npm run dev
```

Die Steuerung läuft dann unter `http://localhost:5173/`, der Patientenbildschirm unter
`http://localhost:5173/buehne`. Änderungen am Quelltext erscheinen sofort.

Es gibt zwei Arten, die App zu betreiben:

| | Mit Server | Ohne Server (wie die Demo) |
| --- | --- | --- |
| Bauen | `npm run build` → `dist/` | `npm run build:demo` → `dist-demo/` |
| Starten | `npm start` oder Doppelklick auf `Aufklaerung starten.cmd`, dann `http://localhost:4173/` | Ordner auf einen beliebigen Webspace legen |
| Abgleich der Fenster | WebSocket, auch zwischen Geräten (z. B. Tablet als Patientenbildschirm) | BroadcastChannel, nur im selben Browser |

Mit Server: `node server/start.mjs --netz` (oder `Aufklaerung Server.cmd`) öffnet die App für
andere Geräte im eigenen Netz; mehrere Zimmer trennt man über `?raum=zimmer-2` in der Adresse.
Der Server hat keine Anmeldung – er gehört in ein geschütztes Netz, nicht ins Internet.

Ohne Server: Die Demo erwartet den Unterpfad `/AsklaionShowAndTell/`. Für einen anderen Ort
`VITE_BASE` setzen, z. B. `VITE_BASE=/ npm run build:demo`; ansehen mit `npm run preview:demo`.

## Anpassen

- **Name, Logo, Begrüßung:** `src/kern/marke.ts`, das Bild dazu unter `public/`; Fenstertitel
  und Symbol in `index.html`. Der Name „Asklaion“ und das Asklaion-Zeichen sind von der
  MIT-Lizenz ausgenommen – eine eigene Fassung braucht einen eigenen Namen und ein eigenes Zeichen.
- **Impressum:** steht in `src/info/Info.tsx` und erscheint in der Fassung ohne Server. Wer eine
  eigene Fassung veröffentlicht, trägt dort die eigenen Angaben ein.
- **Neues Modul:** `src/module/_vorlage` kopieren und umbenennen (ohne Unterstrich), `id`,
  `titel` und `beschreibung` anpassen – es erscheint von selbst in der Leiste. Ein Modul besteht
  aus Zustand (reines JSON), Steuerung (Arztseite) und Bühne (Patientenseite, immer
  1920 × 1080 px). Schnittstelle: `src/kern/typen.ts`.
- **Inhalte:** Texte und Zeichnungen liegen je Modul unter `src/module/<modul>/`, Bilder und
  3D-Modelle unter `public/`.
- **Eigene Erweiterungen:** Liegt ein Ordner `src/privat/` vor, bindet die App ihn ein:
  `src/privat/marke.ts` ersetzt den Auftritt, `src/privat/module/<name>/index.ts` ist ein
  zusätzliches Modul. Im Build ohne Server (`build:demo`) bleibt dieser Ordner außen vor, ebenso
  die Pfade aus `werkzeuge/gesperrt.txt`. Fehlt ein dort genannter Bildordner – hier etwa die
  Packungsfotos unter `public/bilder/medikamente/` –, zeigt die App die Stelle ohne Bild.

Feste Pfade nie als `'/bilder/…'` schreiben, sondern über `datei()` und `seite()` aus
`src/kern/pfad.ts`, sonst bricht die App unter einem Unterpfad.

### Aufbau

```
server/               Abgleich der Fenster (WebSocket) und Start der fertigen App
src/kern/             Sitzungszustand, Modul-Schnittstelle, Modulregister, Pfade, Auftritt
src/arzt/             Steuerung
src/buehne/           Patientenbildschirm, Ruhebild, 1920 × 1080-Leinwand
src/handzettel/       Handzettel zum Mitgeben (Druck und PDF)
src/info/             Seite /info: Zweck, Quellen und Lizenzen
src/module/           ein Ordner je Modul
public/               Bilder und 3D-Modelle
werkzeuge/            Skripte, mit denen Modelle, Länderdaten und Bilder gebaut wurden
```

Übertragen werden nur Anzeigebefehle (welches Modul, welche Auswahl), keine Namen. Die Skripte
unter `werkzeuge/` braucht man nur, um Daten neu zu erzeugen; was sie voraussetzen (Blender,
Python mit Pillow), steht jeweils im Kopf der Datei.

## Lizenz

Der eigene Anteil – Anwendungscode, eigene Zeichnungen und Texte – steht unter der MIT-Lizenz.
Das gilt nicht für fremde Inhalte: Die 3D-Modelle stehen unter CC BY-SA 4.0, die Fotos und
Abbildungen unter der jeweils in der App genannten Lizenz, Schrift und Bibliotheken unter ihren
eigenen Lizenzen. Einzelheiten in [LICENSE](LICENSE).

## Impressum

Dr. Florian Rasche, Huttenstr. 6, 97072 Würzburg · florian.rasche+asklaion@googlemail.com ·
https://asklaion.de
