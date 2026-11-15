"""Lädt die echten Bilder (Röntgen, MRT, Ultraschall, Fotos …) der Module Orthopädie und
Aufklärungen von Wikimedia Commons.

Die Liste der Commons-Dateien mit Zuschnitt steht in werkzeuge/quellen/bildgebung.json
(Orthopädie) bzw. werkzeuge/quellen/bildgebung-aufklaerungen.json, die Bilder landen in
public/bilder/<modul>/<id>-<n>.jpg. Urheber und Lizenz stehen in
src/module/<modul>/bildgebung.json (der Lauf gibt sie zur Kontrolle mit aus).

    python -I werkzeuge/lade_bildgebung.py                         # Orthopädie, nur fehlende
    python -I werkzeuge/lade_bildgebung.py --modul aufklaerungen   # Aufklärungen
    python -I werkzeuge/lade_bildgebung.py --neu                   # alle neu bauen

Zuschnitt: [links, oben, rechts, unten] als Anteil des Originalbildes (0 bis 1).
Röntgen, MRT und Ultraschall werden in Graustufen gespeichert; "farbe": true behält die Farben
(Fotos, Endoskopie, Doppler).
Kleine Bilder werden auf mindestens MIN_SEITE vergrößert, große auf MAX_SEITE verkleinert.
Benötigt Pillow.
"""

import io
import json
import re
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

from PIL import Image, ImageOps

WURZEL = Path(__file__).resolve().parent.parent
MODULE = {
    "orthopaedie": WURZEL / "werkzeuge" / "quellen" / "bildgebung.json",
    "aufklaerungen": WURZEL / "werkzeuge" / "quellen" / "bildgebung-aufklaerungen.json",
}
ZIEL = WURZEL / "public" / "bilder" / "orthopaedie"
API = "https://commons.wikimedia.org/w/api.php"
KOPF = {"User-Agent": "AufklaerungPraxisApp/1.0 (bildersuche)"}
MAX_SEITE = 1400
MIN_SEITE = 900
# Commons liefert Vorschaubilder nur in diesen Breiten aus; Originale sind stark gedrosselt.
BREITEN = [250, 330, 500, 960, 1280, 1920]


def hole(url: str) -> bytes:
    """Lädt eine URL; bei 429 (zu viele Anfragen) mit wachsender Pause erneut."""
    for versuch in range(6):
        try:
            anfrage = urllib.request.Request(url, headers=KOPF)
            with urllib.request.urlopen(anfrage, timeout=60) as antwort:
                return antwort.read()
        except urllib.error.HTTPError as fehler:
            if fehler.code != 429:
                raise
            time.sleep(20 * (versuch + 1))
    raise RuntimeError(f"Commons antwortet dauerhaft mit 429: {url}")


def info(datei: str, breite: int | None = None) -> dict:
    parameter = {
        "action": "query",
        "prop": "imageinfo",
        "iiprop": "url|size|extmetadata",
        "titles": "File:" + datei,
        "format": "json",
    }
    if breite:
        parameter["iiurlwidth"] = str(breite)
    daten = json.loads(hole(API + "?" + urllib.parse.urlencode(parameter)))
    seite = next(iter(daten["query"]["pages"].values()))
    if "imageinfo" not in seite:
        raise RuntimeError(f"Datei nicht gefunden: {datei}")
    return seite["imageinfo"][0]


def ohne_html(text: str) -> str:
    return re.sub(r"\s+", " ", re.sub(r"<[^>]+>", "", text)).strip()


def baue(eintrag: dict) -> None:
    ii = info(eintrag["datei"])
    meta = ii.get("extmetadata", {})
    lizenz = ohne_html(meta.get("LicenseShortName", {}).get("value", "?"))
    urheber = ohne_html(meta.get("Artist", {}).get("value", "?"))
    # Größte Standardbreite, die nicht über dem Original liegt; kleine Bilder (< 960 px) im Original.
    if ii["width"] >= 960:
        breite = max(b for b in BREITEN if b <= ii["width"])
        time.sleep(2)
        url = info(eintrag["datei"], breite)["thumburl"]
    else:
        url = ii["url"]
    time.sleep(4)
    bild = Image.open(io.BytesIO(hole(url)))
    bild = ImageOps.exif_transpose(bild).convert("RGB" if eintrag.get("farbe") else "L")

    breite, hoehe = bild.size
    l, o, r, u = eintrag.get("zuschnitt", [0, 0, 1, 1])
    bild = bild.crop((round(l * breite), round(o * hoehe), round(r * breite), round(u * hoehe)))
    if eintrag.get("autokontrast"):
        bild = ImageOps.autocontrast(bild, cutoff=0.5)
    if eintrag.get("spiegeln"):
        # Seitenverkehrt, damit ein Bildpaar in dieselbe Richtung schaut.
        bild = ImageOps.mirror(bild)

    laengste = max(bild.size)
    faktor = min(MAX_SEITE / laengste, 1.0) if laengste > MIN_SEITE else MIN_SEITE / laengste
    if faktor != 1.0:
        bild = bild.resize(
            (round(bild.width * faktor), round(bild.height * faktor)), Image.Resampling.LANCZOS
        )

    ziel = ZIEL / eintrag["ziel"]
    bild.save(ziel, "JPEG", quality=85, optimize=True, progressive=True)
    print(f"{eintrag['ziel']}: {bild.width}×{bild.height}  {lizenz}  {urheber}")


def main() -> int:
    global ZIEL
    neu = "--neu" in sys.argv
    modul = sys.argv[sys.argv.index("--modul") + 1] if "--modul" in sys.argv else "orthopaedie"
    ZIEL = WURZEL / "public" / "bilder" / modul
    ZIEL.mkdir(parents=True, exist_ok=True)
    eintraege = json.loads(MODULE[modul].read_text(encoding="utf-8"))
    for eintrag in eintraege:
        if not neu and (ZIEL / eintrag["ziel"]).exists():
            continue
        baue(eintrag)
        time.sleep(6)
    return 0


if __name__ == "__main__":
    sys.stdout.reconfigure(encoding="utf-8")
    sys.exit(main())
