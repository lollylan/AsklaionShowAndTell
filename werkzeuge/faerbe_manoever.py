"""Lädt die freien Grafiken der Befreiungsmanöver beim Lagerungsschwindel von Wikimedia Commons
und färbt sie in die Farben der App um (Petrol, Kupfer, Creme).

    python -I werkzeuge/faerbe_manoever.py          # nur fehlende
    python -I werkzeuge/faerbe_manoever.py --neu    # alle neu bauen

Ergebnis: public/bilder/aufklaerungen/manoever/<id>.svg. Urheber und Lizenz stehen in
src/module/aufklaerungen/manoever.ts. Beide Lizenzen (CC BY-SA) verlangen Namensnennung und
Weitergabe der Bearbeitung unter gleicher Lizenz; die Bearbeitung ist nur die Umfärbung und das
Entfernen der Buchstaben A–I.
"""

import re
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
import json
from pathlib import Path

WURZEL = Path(__file__).resolve().parent.parent
ZIEL = WURZEL / "public" / "bilder" / "aufklaerungen" / "manoever"
API = "https://commons.wikimedia.org/w/api.php"
KOPF = {"User-Agent": "AufklaerungPraxisApp/1.0 (bildersuche)"}

# Farben der App (siehe src/module/aufklaerungen/bilder/bausteine.tsx)
LINIE = "#1d3a42"  # Konturen auf hellem Grund
PETROL = "#03758f"
PETROL_DUNKEL = "#025669"
PETROL_ZART = "#d3e8ed"
KUPFER = "#d4713f"
HAUT = "#ecd2c0"

# Hariadhi zeichnet mit festen Farben; jede wird auf eine App-Farbe gelegt.
HARIADHI = {
    "#2E0700": LINIE,  # Kontur
    "#601D15": LINIE,  # Schattierung der Haut (halbtransparent)
    "#BC8579": HAUT,
    "#737F5E": PETROL,  # Hemd
    "#3D82A8": PETROL_DUNKEL,  # Hose
    "#F96262": KUPFER,  # Pfeile
    "#FC545D": KUPFER,
    "#93B9CE": "#a9cbd3",  # Liege von oben
    "#206191": PETROL_DUNKEL,
    "#B5B5B5": "#c9dde2",  # Liege von vorn
    "#918A8A": "#8fb3bd",
    "#7A6F6F": "#5f8792",
    "#C9C9C9": "#dbe9ec",
}

GRAFIKEN = {
    # Epley-Manöver für das linke Ohr, fünf Stellungen im Kreis (wird für rechts gespiegelt).
    "epley": ("File:Epley.svg", "mamais"),
    # Barbecue-Rotation (Lempert) von oben gesehen, neun Stellungen.
    "barbecue": ("File:Lampert Maneuver hariadhi.svg", "hariadhi"),
    # Auf Commons als „Semont maneuver“ benannt, laut Beschreibung aber Brandt-Daroff-Übungen.
    "brandt-daroff": ("File:Semont maneuver hariadhi.svg", "hariadhi"),
}


def hole(url: str) -> bytes:
    """Lädt eine URL; bei 429 (zu viele Anfragen) mit wachsender Pause erneut."""
    for versuch in range(6):
        try:
            with urllib.request.urlopen(urllib.request.Request(url, headers=KOPF), timeout=60) as a:
                return a.read()
        except urllib.error.HTTPError as fehler:
            if fehler.code != 429:
                raise
            time.sleep(20 * (versuch + 1))
    raise RuntimeError(f"Commons antwortet dauerhaft mit 429: {url}")


def original(titel: str) -> str:
    abfrage = urllib.parse.urlencode(
        {"action": "query", "titles": titel, "prop": "imageinfo", "iiprop": "url", "format": "json"}
    )
    seiten = json.loads(hole(f"{API}?{abfrage}"))["query"]["pages"]
    return next(iter(seiten.values()))["imageinfo"][0]["url"]


def faerbe_mamais(svg: str) -> str:
    # Ungefärbte Flächen sind schwarz (Konturen, Haare, Pfeile), der Rest weiß (Körper).
    # Eine weiße Fläche über das ganze Blatt (beginnt bei 9,11) ist der Hintergrund: weglassen.
    svg = re.sub(r'fill="#FFFFFF"(\s+d="M9\.077,11\.836)', r'fill="none"\1', svg)
    svg = svg.replace('fill="#FFFFFF"', f'fill="{PETROL_ZART}"')
    return re.sub(r"<svg\b", f'<svg fill="{LINIE}"', svg, count=1)


def faerbe_hariadhi(svg: str) -> str:
    for alt, neu in HARIADHI.items():
        svg = re.sub(re.escape(alt), neu, svg, flags=re.I)
    # Ohne eigene Farbe (Haare) wäre es schwarz.
    svg = re.sub(r"<svg\b", f'<svg fill="{LINIE}"', svg, count=1)
    # Buchstaben unter den Teilbildern entfernen: gespiegelt wären sie unlesbar.
    return re.sub(r"<text\b[^>]*>.*?</text>", "", svg, flags=re.S)


def main() -> None:
    neu = "--neu" in sys.argv
    ZIEL.mkdir(parents=True, exist_ok=True)
    for name, (titel, stil) in GRAFIKEN.items():
        datei = ZIEL / f"{name}.svg"
        if datei.exists() and not neu:
            continue
        roh = hole(original(titel)).decode("utf-8")
        fertig = faerbe_mamais(roh) if stil == "mamais" else faerbe_hariadhi(roh)
        datei.write_text(fertig, encoding="utf-8")
        print(f"{datei.relative_to(WURZEL)}  <-  {titel}")
        time.sleep(3)


if __name__ == "__main__":
    main()
